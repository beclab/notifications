export const STOP_REASON_DEFAULT_TEMPLATE = 'stopped_unknown_v3';

export const STOP_REASON_TEMPLATE: Record<string, string> = {
	StopByUser: 'stopped_by_user_v3',
	Evicted: 'stopped_evicted_v3',
	InitFailed: 'stopped_init_failed_v3',
	HamiUnschedulable: 'stopped_hami_unschedulable_v3',
	Unschedulable: 'stopped_unschedulable_v3',
	DiskPressure: 'stopped_disk_pressure_v3',
	SystemCPUPressure: 'stopped_system_cpu_pressure_v3',
	SystemMemoryPressure: 'stopped_system_memory_pressure_v3',
	K8sRequestCPUPressure: 'stopped_k8s_request_cpu_pressure_v3',
	K8sRequestMemoryPressure: 'stopped_k8s_request_memory_pressure_v3'
};

export function resolveStopReasonTemplateId(reason: string): string {
	return STOP_REASON_TEMPLATE[reason] || STOP_REASON_DEFAULT_TEMPLATE;
}
