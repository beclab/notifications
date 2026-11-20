jest.mock('@nats-io/transport-node', () => ({ connect: jest.fn() }));

import { TemplateList } from '../prisma/seeds';
import { TemplateService } from './template.service';
import { UsersService } from './UsersService';
import {
	DEVICE_INVENTORY_APP_ID,
	DEVICE_OFFLINE_TEMPLATE,
	DEVICE_ONLINE_TEMPLATE,
	deviceInventoryNotifications,
	isDeviceInventorySubscription
} from './device-inventory';

const subject = 'os.device.inventory.alice';
const bindings = [
	{ appOwner: 'alice', appName: 'Home Assistant' },
	{ appOwner: 'alice', appName: 'Home Assistant', workload: 'worker' },
	{ appOwner: 'alice', appName: 'MiGPT' },
	{ appOwner: 'bob', appName: 'Private app' }
];

function inventoryEvent(...changes: unknown[]) {
	return {
		schemaVersion: 1,
		topic: 'device.inventory.changed',
		node: 'node-a',
		changes
	};
}

const usb = {
	kind: 'device',
	type: 'device.serial',
	displayName: 'Zigbee adapter',
	bindings
};
const bluetooth = {
	...usb,
	type: 'device.bluetooth',
	displayName: 'Bluetooth'
};

it.each([
	[usb, 'removed', true, undefined, DEVICE_OFFLINE_TEMPLATE],
	[usb, 'added', undefined, true, DEVICE_ONLINE_TEMPLATE],
	[bluetooth, 'updated', true, false, DEVICE_OFFLINE_TEMPLATE],
	[bluetooth, 'updated', false, true, DEVICE_ONLINE_TEMPLATE]
])(
	'maps %j %s to the expected template for the affected user',
	(device, action, previous, current, templateId) => {
		const event = inventoryEvent({
			...device,
			action,
			previous: { online: previous },
			current: { online: current }
		});

		expect(deviceInventoryNotifications(subject, event)).toEqual([
			{
				user: 'alice',
				templateId,
				vars: {
					node: 'node-a',
					device: device.displayName,
					apps: ['Home Assistant', 'MiGPT']
				}
			}
		]);
	}
);

it('ignores inventory metadata, unsupported types, and devices without the recipient’s bindings', () => {
	const event = inventoryEvent(
		{ ...usb, kind: 'publisher', action: 'offline' },
		{
			...usb,
			action: 'updated',
			previous: { online: true },
			current: { online: true }
		},
		{ ...usb, action: 'removed', previous: { online: false } },
		{
			...usb,
			action: 'removed',
			previous: { online: true },
			bindings: [bindings[3]]
		},
		{ ...usb, type: 'storage', action: 'added', current: { online: true } },
		{ ...usb, action: 'added', current: { online: false } }
	);

	expect(deviceInventoryNotifications(subject, event)).toEqual([]);
	expect(
		deviceInventoryNotifications(
			'os.device.inventory.*',
			inventoryEvent({
				...usb,
				action: 'removed',
				previous: { online: true }
			})
		)
	).toEqual([]);
	expect(isDeviceInventorySubscription('os.device.inventory.*')).toBe(true);
	expect(isDeviceInventorySubscription(subject)).toBe(true);
	expect(isDeviceInventorySubscription('os.device.inventory.>')).toBe(false);
});

it('publishes through the standard notification subject after an invalid message', async () => {
	const findTemplate = jest
		.fn()
		.mockImplementation(async (appId, templateId) =>
			TemplateList.find(
				(template) =>
					template.appId === appId &&
					template.appTemplateId === templateId
			)
		);
	const publish = jest.fn();
	const subscribe = jest.fn().mockReturnValue({
		async *[Symbol.asyncIterator]() {
			yield { subject, string: () => '{' };
			yield {
				subject,
				string: () =>
					JSON.stringify(
						inventoryEvent({
							...bluetooth,
							displayName: '',
							resourceName: 'hci0',
							action: 'updated',
							previous: { online: false },
							current: { online: true }
						})
					)
			};
		}
	});
	const service = new UsersService({
		findTemplateByApplicationIDandApplicationTemplateId: findTemplate
	} as unknown as TemplateService);
	Object.assign(service, { natsClient: { subscribe, publish } });

	await service['watchDeviceInventory']('os.device.inventory.*');

	expect(findTemplate).toHaveBeenCalledWith(
		DEVICE_INVENTORY_APP_ID,
		DEVICE_ONLINE_TEMPLATE
	);
	expect(publish.mock.calls).toEqual([
		[
			'os.notification.alice',
			JSON.stringify({
				appId: DEVICE_INVENTORY_APP_ID,
				appTemplateId: DEVICE_ONLINE_TEMPLATE,
				payload: {
					vars: {
						node: 'node-a',
						device: 'hci0',
						apps: ['Home Assistant', 'MiGPT']
					}
				}
			})
		]
	]);
});

it.each([DEVICE_OFFLINE_TEMPLATE, DEVICE_ONLINE_TEMPLATE])(
	'seeds all seven languages and required variables for %s',
	(appTemplateId) => {
		const template = TemplateList.find(
			(entry) =>
				entry.appId === DEVICE_INVENTORY_APP_ID &&
				entry.appTemplateId === appTemplateId
		);
		expect(
			template.content.create.map((entry) => entry.language).sort()
		).toEqual([
			'de-DE',
			'en-US',
			'es-ES',
			'fr-FR',
			'it-IT',
			'ja-JP',
			'zh-CN'
		]);
		expect(template.defaultLanguage).toBe('en-US');
		for (const entry of template.content.create) {
			const placeholders = [...entry.body.matchAll(/{{(\w+)}}/g)]
				.map((match) => match[1])
				.sort();
			expect(placeholders).toEqual([...template.variables].sort());
		}
	}
);
