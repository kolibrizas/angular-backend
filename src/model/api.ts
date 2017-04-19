import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TimeoutError } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';



import {
    _RESPONSE, _SESSION_INFO, _USER_SESSION_RESPONSE
} from './interface';


import { URL_BACKEND_API, BACKEND_API_CONNECTION_TIMEOUT } from './config';


import {
    API_KEY_SESSION_INFO, ERROR_JSON_PARSE, ERROR_TIMEOUT,
    ERROR_NO_ERROR_CODE,
    RES_ERROR_DISCONNECTED
} from './define';


export class Api {
    private http: Http;
    constructor( http ) {
        this.http = http;
    }



  backendUrl() {
    if ( window['url_backend_api'] !== void 0 ) return window['url_backend_api'];
    else return "http://backend.sonub.com/index.php";
  }

    /**
     *
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     * @attension If there is error on json(), then 'error' callback will be called on subscribe.
     *      만약, json() 또는 JSON.parse() 에서 에러가 발생하면, subscribe() 을 에러 콜백이 호출된다.
     */
    get( url: string, option = {} ) : Observable<Response> {

        //return this.http.get( url )
        return this.processQuery( <any>this.http.get( url ), option );

    }

    version() {
        return this.get( this.backendUrl() + '?route=version');
    }



    protected processQuery( o: Observable<Response>, option = {} ) {
        let timeout = BACKEND_API_CONNECTION_TIMEOUT;
        if ( option['timeout'] !== void 0 ) timeout = option['timeout'];
        return o
            .timeout( timeout )
            .catch( err => {
                //console.log("catch() after .timeout()");
                //console.log(err);
                if ( err instanceof TimeoutError ) {
                    return Observable.throw( this.errorResponse( ERROR_TIMEOUT ) );
                }
                return Observable.throw( err );
            })
            .map( (e) => {
                ///
                // console.log('response body:', e['_body']); // debug. comment out to see errors from server.
                
                if ( e['_body'] == '' ) throw this.errorResponse( -408, 'response-is-empty.');
                if ( (<string>e['_body']).charAt(0) != '{' ) {
                    console.info("Maybe error");
                    console.log(e['_body']);
                }
                let re = e.json();
                if ( this.isError( re ) ) {
                    throw re;
                }
                else return re;
             } )
            .catch( err => {
                console.log('Api::processQuery(): caught an error: ', err);
                if ( err instanceof SyntaxError ) {
                    console.error(err); // debug
                    return Observable.throw( this.errorResponse( ERROR_JSON_PARSE )  ); // JSON 에러
                }
                else if ( err && err['code'] !== void 0 && err['code'] < 0 ) return Observable.throw( err ); // 프로그램 적 에러
                else if ( err['_body'] && err['_body']['total'] == 0 && err['_body']['type'] == 'error' ) {
                    return Observable.throw( RES_ERROR_DISCONNECTED );
                }
                else return Observable.throw( err );
            } );
    }




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
    isError( obj: any ) {
        if ( obj ) {
            if ( obj['code'] === void 0 ) return ERROR_NO_ERROR_CODE; // if obj.code not exist.
            if ( obj['code'] ) return obj['code']; // if obj.code is not 0.
        }
        return false;
    }

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
    errorResponse( error_code, error_message = '' ) : _RESPONSE {
        if ( error_message ) {
            return { code: error_code, message: error_message };
        }
        else {
            return {
                code: -999,
                message: error_code
            };
        }
    }


}