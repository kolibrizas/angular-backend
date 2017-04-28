import { Http } from '@angular/http';
import { Base } from './base';
import { Observable } from 'rxjs/Rx';
export * from './interface';
export * from './define';
import { _USER_CREATE, _USER_CREATE_RESPONSE, _USER_EDIT, _USER_EDIT_RESPONSE, _USER_DATA_RESPONSE, _USER_LOGIN, _USER_LOGIN_RESPONSE, _USER_LOGOUT_RESPONSE, _USER_PASSWORD_CHANGE, _USER_PASSWORD_CHANGE_RESPONSE } from './interface';
export declare class User extends Base {
    constructor(http: Http);
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
        console.log(req);
        this.user.register( req, ( res: USER_REGISTER_RESPONSE_DATA ) => {
            console.info('register success: ', res);
        },
        error => alert(error),
        () => console.log('user registration complete') );

     * @endcode
     */
    data(id?: any): Observable<_USER_DATA_RESPONSE>;
    register(req: _USER_CREATE): Observable<_USER_CREATE_RESPONSE>;
    edit(req: _USER_EDIT): Observable<_USER_EDIT_RESPONSE>;
    login(req: _USER_LOGIN): Observable<_USER_LOGIN_RESPONSE>;
    logout(): Observable<_USER_LOGOUT_RESPONSE>;
    changePassword(req: _USER_PASSWORD_CHANGE): Observable<_USER_PASSWORD_CHANGE_RESPONSE>;
}
