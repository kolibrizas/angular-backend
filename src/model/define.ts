export const ERROR_JSON_PARSE = 'json-parse-error--maybe-server-error--maybe-php-error';
export const ERROR_NO_ERROR_CODE = "no-error-code-on-isError()-is-considered-as-an-error";
export const ERROR_NO_INTERNET = 'You have no Internet. Or the Internet is very slow.';
export const ERROR_TIMEOUT = 'http-get-post-request-timeout';
export const ERROR_MC_IS_EMPTY = 'mc-is-empty';
export const ERROR_INTERNAL_SERVER_ERROR = 'internal-server-error';
export const ERROR_SESSION_ID_EXIST = 'error-session-id-must-not-be-submitted';
export const ERROR_USER_NOT_FOUND = -40108;
export const ERROR_WRONG_SESSION_ID = -401081;
export const ERROR_WRONG_SESSION_ID_NO_USER_DATA_BY_THAT_SESSION_ID = ERROR_WRONG_SESSION_ID;

export const API_KEY_SESSION_INFO = 'user-session-id';



/**
 * 
 *      N E W   E R R O R   RESPONSES
 * 
 * 
 */

export const ERROR_NO_FILE_SELECTED = -40010;
export const RES_ERROR_NO_FILE_SELECTED = { code: ERROR_NO_FILE_SELECTED, message: "no-file-selected-to-upload" };

export const ERROR_DISCONNECTED = -80011;
export const RES_ERROR_DISCONNECTED = { code: ERROR_DISCONNECTED, message: 'You have no internet. Please check if you are online.' };
