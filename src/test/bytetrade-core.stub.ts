// The published @bytetrade/core bundle contains an empty identifier
// (`var  = (autoFunc, ...) => ...`) and therefore cannot be parsed by Node.
// Tests map the package to this stub so modules that only need its enums and
// helpers remain importable.

export enum MessageTopic {
	PONG = 'pong',
	SIGN = 'sign',
	CANCEL_SIGN = 'cancel_sign',
	Data = 'data',
	Notification = 'notification'
}

export async function autoFuncWithRetry<T>(autoFunc: () => Promise<T>) {
	return autoFunc();
}

export function returnSucceed(data: any) {
	return { code: 0, data };
}

export function returnError(code: number, message: string) {
	return { code, message };
}
