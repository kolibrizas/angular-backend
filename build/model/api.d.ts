import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import { _RESPONSE, _SESSION_INFO, _USER_SESSION_RESPONSE } from './interface';
export declare class Api {
    http: Http;
    constructor(http: any);
    setBackendUrl(url: any): void;
    getBackendUrl(): any;
    /**
     *
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     * @attension If there is error on json(), then 'error' callback will be called on subscribe.
     *      만약, json() 또는 JSON.parse() 에서 에러가 발생하면, subscribe() 을 에러 콜백이 호출된다.
     */
    get(url: string, option?: {}): Observable<Response>;
    /**
     *
     *
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     */
    post(data: any, option?: {}): Observable<Response>;
    readonly requestOptions: RequestOptions;
    version(): Observable<Response>;
    errorCall(): Observable<Response>;
    successCall(): Observable<Response>;
    scriptError(): Observable<Response>;
    timeoutError(): Observable<Response>;
    internalServerError(): Observable<Response>;
    routeMethodError(): Observable<Response>;
    routeRequiredError(): Observable<Response>;
    protected processQuery(o: Observable<Response>, option?: {}): Observable<any>;
    /**
     *
     *
     *
     * @param code
     * @param message
     */
    protected error(code: any, message: any): ErrorObservable;
    /**
     *
     * @param error_code
     * @param error_message
     *
     * @code
     *      this.errorResponse( 'error-code' ); // Simply put error code
     *      this.errorResponse( -1234, 'error-message' ); // Error code with message. error code must be less than 0
     * @endcode
     *
     */
    errorResponse(error_code: any, error_message?: string): _RESPONSE;
    /**
     *
     */
    readonly logged: boolean;
    readonly admin: boolean;
    /**
 *
 * @param res - it can by any interface ( type ) as long as it has res.data.sessoin_id
 */
    protected setSessionInfo(res: _USER_SESSION_RESPONSE): void;
    getSessionId(): string;
    /**
     * this.info.id
     */
    readonly info: _SESSION_INFO;
    /**
     * Deletes 'login session information' from localStorage.
     */
    deleteSessionInfo(): void;
    /**
     * return true if the obj is error ( or error response )
     *
     *
     *
     * @param obj
     *      obj must be a form of "{ code: -123, message: 'error message'}"
     *      if 'code' does not exist, it is considered as an ERROR.
     *      if 'code' is less than 0, then it is an error.
     *
     *      { code: ... } 에서 code 값이 없거나 참의 값이면 에러로 간주한다.
     *
     * 참고로 internal sever error 의 경우에는 code 값이 없으로 '참'을 리턴한다.
     *
     * @return
     *      truthy value if the object is an error response.
     *      false if no error.
     * @code
     *
            if ( this.file.isError(err) ) return;

     * @endcode
     *
     */
    isError(obj: any): any;
    /**
     * Returns true if it is an internal server error response.
     *
     *
     * @param obj
     */
    isInternalServerError(obj: any): boolean;
    /**
     *
     * @param error
     */
    getErrorString(error: Object): string;
    /**
     *
     * This simply alerts error message on browser.
     *
     * @param error
     */
    alert(error: any): void;
    /**
     * Returns the body of POST method.
     *
     * @attention This addes 'module', 'submit'. If you don't needed just user http_build_query()
     *
     * @param params must be an object.
     */
    protected buildQuery(params: any): string;
    protected http_build_query(formdata: any, numericPrefix?: string, argSeparator?: string): string;
    protected urlencode(str: any): string;
    /**
     *
     * @deprecated This is in wrong place
     *
     * It gets 'YYYY-MM-DD' input value from form 'date' input and splits into 'birth_year', 'birth_month', 'birth_day'.
     *
     *
     * @param u - user form.
     */
    splitBirthdays(u: any): any;
    /**
     *
     * @deprecated This is in wrong place
     *
     */
    mk2c(d: any): any;
    /**
     *
     * @deprecated This is in wrong place
     *
     */
    composeBirthday(u: any): any;
}
