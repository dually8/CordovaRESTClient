// Type definitions for Toast PhoneGap Plugin
// Project: https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin
// Definitions by: CJ Coffey <https://github.com/dually8>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface ToastOptions {
	withMessage: string;
	withDuration: string;
	withPosition: string;
	withAddPixelsY: number;
}

interface Toast {
	/**
	 * Show a toast
	 * @param  {string} message         The message you want to display
	 * @param  {string} duration        "short" for 2 seconds, "long" for 5 seconds
	 * @param  {string} position        The position you want. Valid input is "top", "center", and "bottom"
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	show(message: string, duration: string, position: string, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Show a toast given toast options
	 * @param  {ToastOptions} options         options for toast; See ToastOptions
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	showWithOptions(options: ToastOptions, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Show a short toast in the top position
	 * @param  {string} message         The message you want to display
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	showShortTop(message: string, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Show a short toast in the center position
	 * @param  {string} message         The message you want to display
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	showShortCenter(message: string, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Show a short toast in the bottom position
	 * @param  {string} message         The message you want to display
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	showShortBottom(message: string, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Show a long toast in the top position
	 * @param  {string} message         [description]
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	showLongTop(message: string, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Show a long toast in the center position
	 * @param  {string} message         The message you want to display
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	showLongCenter(message: string, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Show a long toast in the bottom position
	 * @param  {string} message         The message you want to display
	 * @param  {any}    successCallback Callback after successfully toast'd
	 * @param  {any}    errorCallback 	Callback after toast'd error
	 */
	showLongBottom(message: string, successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;

	/**
	 * Force hide a toast
	 * @param  {any}    successCallback Callback after successfully hidden
	 * @param  {any}    errorCallback 	Callback after error
	 */
	hide(successCallback?: (a: any) => any, errorCallback?: (e: any) => any): void;
}

interface Plugins {
  toast: Toast;
}
