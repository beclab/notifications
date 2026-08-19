import {
	STOP_REASON_DEFAULT_TEMPLATE,
	STOP_REASON_TEMPLATE,
	resolveStopReasonTemplateId
} from './stop-reason';
import { TemplateList } from '../prisma/seeds';

const LANGUAGES = [
	'en-US',
	'zh-CN',
	'de-DE',
	'es-ES',
	'fr-FR',
	'it-IT',
	'ja-JP'
];

const NEW_REASONS: Record<string, string> = {
	Unschedulable: 'stopped_unschedulable_v3',
	DiskPressure: 'stopped_disk_pressure_v3',
	SystemCPUPressure: 'stopped_system_cpu_pressure_v3',
	SystemMemoryPressure: 'stopped_system_memory_pressure_v3',
	K8sRequestCPUPressure: 'stopped_k8s_request_cpu_pressure_v3',
	K8sRequestMemoryPressure: 'stopped_k8s_request_memory_pressure_v3'
};

function findMarketTemplate(appTemplateId: string) {
	return TemplateList.find(
		(t) => t.appId === 'market' && t.appTemplateId === appTemplateId
	);
}

describe('app stop reasons', () => {
	describe('reason to template id mapping', () => {
		it.each(Object.entries(NEW_REASONS))(
			'maps %s to %s',
			(reason, expected) => {
				expect(resolveStopReasonTemplateId(reason)).toEqual(expected);
			}
		);

		it('falls back to the unknown template for an unmapped reason', () => {
			expect(resolveStopReasonTemplateId('SomethingElse')).toEqual(
				STOP_REASON_DEFAULT_TEMPLATE
			);
			expect(resolveStopReasonTemplateId('')).toEqual(
				STOP_REASON_DEFAULT_TEMPLATE
			);
		});

		it('maps every reason to a distinct template id', () => {
			const ids = Object.values(STOP_REASON_TEMPLATE);
			expect(new Set(ids).size).toEqual(ids.length);
		});
	});

	// A reason whose template is missing from the seeds is silently dropped by
	// UsersService.natsClientPublish, so the mapping and the seeds must agree.
	describe('seeded templates', () => {
		const templateIds = [
			...Object.values(STOP_REASON_TEMPLATE),
			STOP_REASON_DEFAULT_TEMPLATE
		];

		it.each(templateIds)('%s exists under the market app', (id) => {
			expect(findMarketTemplate(id)).toBeDefined();
		});

		it.each(templateIds)('%s has all supported languages', (id) => {
			const contents = findMarketTemplate(id).content.create;
			expect(contents.map((c) => c.language).sort()).toEqual(
				[...LANGUAGES].sort()
			);
		});

		it.each(templateIds)(
			'%s renders the title variable in every language',
			(id) => {
				const template = findMarketTemplate(id);
				expect(template.variables).toEqual(['title']);
				for (const content of template.content.create) {
					expect(content.title.length).toBeGreaterThan(0);
					expect(content.body).toContain('{{title}}');
				}
			}
		);
	});
});
