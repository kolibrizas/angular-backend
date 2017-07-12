import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

import { Observable } from 'rxjs/Rx';
export * from './interface';
export * from './define';
import {
    _USER_CREATE, _USER_CREATE_RESPONSE,
    _USER_EDIT, _USER_EDIT_RESPONSE,
    _USER_DATA_RESPONSE,
    _USER_LOGIN, _USER_LOGIN_RESPONSE, _USER_LOGOUT, _USER_LOGOUT_RESPONSE,
    _USER_PASSWORD_CHANGE, _USER_PASSWORD_CHANGE_RESPONSE, _ID_O,
    _USER_PASSWORD_CHANGE_BY_ADMIN

} from './interface';
// import { KEY_SESSION_ID } from './defines';
@Injectable()
export class User extends Base {
    constructor( http: Http ) {
        super( http, 'user' );
    }




    /**
     *
     *
     * Gets user data from backend.
     *
     * @note User can only get his data. so, no need to get 'session_id' as parameter. Just get it from localStorage.
     *
     *
     * @code

        let req : USER_REGISTER_REQUEST_DATA = {
            id:         this.id,
            password:   this.password,
            name:       this.name,
            nickname:   this.nickname,
            email:      this.email,
            mobile:     this.mobile,
            landline:   this.landline,
            gender:     this.gender,
            birthday:   this.birthday,
            meta:       {
                type: this.type,
                classid: 'my-skype-id'
            }
        }
        //console.log(req);
        this.user.register( req, ( res: USER_REGISTER_RESPONSE_DATA ) => {
            //console.info('register success: ', res);
        },
        error => alert(error),
        () => //console.log('user registration complete') );

     * @endcode
     */

    data( id?: _ID_O ) : Observable<_USER_DATA_RESPONSE> {

        // if id is empty, it will get self data.
        // if ( id === void 0 ) id = this.info.id;
        if ( this.logged == false ) return this.error( -420, 'login-first-before-get-user-info');
        return super.data( id );
    }
    register( req: _USER_CREATE ) : Observable<_USER_CREATE_RESPONSE> {
        if ( req.id === void 0 || ! req.id ) return this.error( -4291, 'user-id-is-required-for-register' );
        if ( req.password === void 0  || ! req.password ) return this.error( -4292, 'password-is-required-for-register' );
        //if ( req.password === void 0 || req.password.length < 5 ) return this.error( -4292, 'password-is-required-and-must-be-at-least-5-characters-long-for-register' );
        req.route = 'register';
        return this.post( req )
        .map( ( res: any ) => {
            this.setSessionInfo( res );
            return res;
        });
        // user.register( ... ) . subscribe( ( re: _USER_CREATE_RESPONSE) => {} )
    }

    edit( req: _USER_EDIT ): Observable<_USER_EDIT_RESPONSE> {
      //console.log('edit::req', req);
        if ( this.logged == false ) return this.error( -421, 'login-first-before-edit');
        // if ( req['id'] !== void 0 ) return this.error( -422, 'id-has-passed-over-form-submission--user-cannot-edit-id') );
        if ( req['password'] !== void 0 ) return this.error( -423, 'password-has-passed-over-form-submission--user-cannot-edit-password-on-edit-form');
        return super.edit( req )
            .map( ( res: any ) => {
                //console.log('edit res: ', res );
                this.setSessionInfo( res );
                return res;
            });
    }

    login( req: _USER_LOGIN ): Observable<_USER_LOGIN_RESPONSE> {
        req.route = 'login';
        return this.post( req )
            .map( (res: any) => {
                this.setSessionInfo( res );
                return res;
            });
    }

    logout(): Observable<_USER_LOGOUT_RESPONSE>  {
        let req: _USER_LOGOUT = {
            route: 'logout'
        };
        let observable = this.post( req );
        this.deleteSessionInfo();
        return observable;
    }


    changePassword( req: _USER_PASSWORD_CHANGE ) : Observable<_USER_PASSWORD_CHANGE_RESPONSE> {
        req.route = 'change_password';
        return this.post( req )
        .map( (res: any) => {
            this.deleteSessionInfo();
            return res;
        });
    }

    adminChangeUserPassword( req: _USER_PASSWORD_CHANGE_BY_ADMIN ) : Observable<_USER_PASSWORD_CHANGE_RESPONSE> {
        req.route = 'admin_change_user_password';
        return this.post( req )
            .map( (res: any) => {
                return res;
            });
    }
}
