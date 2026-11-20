export const DEVICE_INVENTORY_APP_ID = 'system';
export const DEVICE_OFFLINE_TEMPLATE = 'hardware_device_offline_v1';
export const DEVICE_ONLINE_TEMPLATE = 'hardware_device_online_v1';

const DEVICE_TYPES = new Set([
	'device.serial',
	'device.audio',
	'device.video',
	'device.hid',
	'device.bluetooth'
]);
const USER_SUBJECT = /^os\.device\.inventory\.([^.*>\s]+)$/;

interface DeviceNotification {
	user: string;
	templateId: typeof DEVICE_OFFLINE_TEMPLATE | typeof DEVICE_ONLINE_TEMPLATE;
	vars: { node: string; device: string; apps: string[] };
}

export function isDeviceInventorySubscription(subject: string): boolean {
	return subject === 'os.device.inventory.*' || USER_SUBJECT.test(subject);
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}
}

function nonemptyText(value: unknown): string | undefined {
	return typeof value === 'string' ? value.trim() || undefined : undefined;
}

function stateTemplate(change: Record<string, unknown>) {
	const previous = asRecord(change.previous)?.online;
	const current = asRecord(change.current)?.online;
	switch (change.action) {
		case 'added':
			return current === true ? DEVICE_ONLINE_TEMPLATE : undefined;
		case 'removed':
			return previous === true ? DEVICE_OFFLINE_TEMPLATE : undefined;
		case 'updated':
			if (
				typeof previous === 'boolean' &&
				typeof current === 'boolean' &&
				previous !== current
			) {
				return current
					? DEVICE_ONLINE_TEMPLATE
					: DEVICE_OFFLINE_TEMPLATE;
			}
	}
}

export function deviceInventoryNotifications(
	subject: string,
	payload: unknown
): DeviceNotification[] {
	const user = USER_SUBJECT.exec(subject)?.[1];
	const event = asRecord(payload);
	const node = nonemptyText(event?.node);
	if (
		!user ||
		!node ||
		event?.schemaVersion !== 1 ||
		event.topic !== 'device.inventory.changed' ||
		!Array.isArray(event.changes)
	) {
		return [];
	}

	const notifications: DeviceNotification[] = [];
	for (const entry of event.changes) {
		const change = asRecord(entry);
		if (
			change?.kind !== 'device' ||
			typeof change.type !== 'string' ||
			!DEVICE_TYPES.has(change.type) ||
			!Array.isArray(change.bindings)
		) {
			continue;
		}

		const templateId = stateTemplate(change);
		const device =
			nonemptyText(change.displayName) ??
			nonemptyText(change.resourceName);
		if (!templateId || !device) continue;

		// Owner and admin subjects may include bindings for other users.
		const apps = new Set<string>();
		for (const entry of change.bindings) {
			const binding = asRecord(entry);
			if (binding?.appOwner !== user) continue;
			const appName = nonemptyText(binding.appName);
			if (appName) apps.add(appName);
		}
		if (apps.size) {
			notifications.push({
				user,
				templateId,
				vars: { node, device, apps: [...apps] }
			});
		}
	}
	return notifications;
}
