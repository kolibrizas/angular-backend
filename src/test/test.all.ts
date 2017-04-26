import { Injectable } from '@angular/core';
import { ERROR_TIMEOUT } from './../model/define';
import { Subject } from 'rxjs/Subject';

import {
    _RESPONSE,
    _USER_CREATE, _USER_CREATE_RESPONSE,
    _USER_EDIT, _USER_EDIT_RESPONSE,
    _USER_LOGIN_RESPONSE, _USER_LOGOUT_RESPONSE,
    _META, _META_CREATE, _META_CREATE_RESPONSE
} from './../model/interface';
import {
    ERROR_MODEL_IDX_IS_EMPTY, RES_ERROR_MODEL_IDX_EMPTY
} from './../model/define';



import { Backend } from './../model/backend';
import { Meta } from './../model/meta';
import { User } from './../model/user';


@Injectable()
export class TestAll {

    private count: number = 0;
    form = <_USER_CREATE> {};

    session_id = new Subject<string>();
    login_session_id = new Subject<string>();
    update_session_id = new Subject<string>();

    meta_session_id = new Subject<string>();


    constructor( 
        public backend: Backend,
        private meta: Meta,
        private user: User ) {
        console.log("TestAll constructor:");

    }

    run() {
        this.testApi(); // api itself.
        this.testServer(); // basic server & backend protocol test.

        this.testLogout()

        this.testUserRegister(); 
        this.session_id.subscribe( id => this.testLogin() );
        this.login_session_id.subscribe( session_id => this.testGetUserData( () => this.testUserUpdate() ) );
        this.update_session_id.subscribe( x => this.testLogout() );

        this.testMeta();

    }




    success( str, ...vars ) {
        this.count ++;
        console.info(`[${this.count}] SUCCESS: ${str}`, vars);
    }


    getErrorString( err ) {
        return this.backend.getErrorString( err );
    }

    error( error, message = '' ) {
        this.count ++;
        console.error( `[${this.count}] ERROR: ${message} - ${this.backend.getErrorString( error )}` );
    }

    testApi() {
        console.log('url:', this.backend.getBackendUrl() );

        this.backend.version().subscribe( res => {
            this.success(`version check: ${res['data'].version}`);
        }, err => {
            this.error("version error: ", this.getErrorString(err));
        });
    

    }

    testServer() {
        

        this.backend.successCall().subscribe( re => {
            this.success("Version: " + re['data']['version']);
        }, err => {
            this.error( err, "successCall Test: " );
        } );
        


        this.backend.errorCall().subscribe( re => {
            this.error(re, 'This should be an error. But success ' + this.backend.getErrorString( re ));
        }, ( error ) => {
            this.success("errorCall() : This is fake error. " + this.backend.getErrorString(error) );
        } );



        // this.backend.internalServerError().subscribe( re => {
        //     this.error("This must be 500 internal server error. but success");
        // }, error => {
        //     console.log(error);
        //     if ( this.backend.isInternalServerError( error ) ) this.success("Internal Server Error: " + this.backend.getErrorString(error) );
        //     else this.error(error, "This must be 500 - internal server error. but it is another error.");
        // });


        // setTimeout( () => {
        //     this.backend.scriptError().subscribe( re => {
        //         console.log(re);
        //         this.error( re, "scriptError() - This should be script error. But success." );
        //     }, error => {
        //         console.log( error );
        //         this.success( 'This should be script error. This is PHP script error.' );
        //     });
        // }, 100 );


        this.backend.timeoutError().subscribe( re => {
            this.error( re, "This should be timeout error. But success." );
        }, error => {
            if ( error.message == ERROR_TIMEOUT ) {
                this.success('This should be timeout error.' + this.backend.getErrorString( error ));
            }
            else {
              this.error( "This is not timeout error. But another error"+ error );
            } 
        });



        // route error
        this.backend.routeMethodError().subscribe( re => {
            this.error( re, "Must be error");
        }, error => {
            this.success("Route Error" + error);
        });

        this.backend.routeRequiredError().subscribe( re => {
            this.error( re, "Must be error");
        }, error => {
            this.success("Route required variable error: name is missing.");            
        });




    }

    testUserRegister() {
        let id = 'user' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
        this.form.id = id;
        this.form.email = id + '@gmail.com';
        this.form.name = id;
        this.form.password = id;
        this.form.mobile = '09174678000';
        this.form.gender = 'M';


        this.user.register( this.form ).subscribe( (res: _USER_CREATE_RESPONSE ) => {
            this.success("User registration:\n " + res.data.session_id );
            this.session_id.next( res.data.session_id );
        }, error => {
            this.error( "user.register()" + error );
        } );
    }


    testLogin() {
        let sampleLoginData = {
            id: this.form.id,
            password: this.form.password
        };
        this.user.login( sampleLoginData ).subscribe( ( res: _USER_LOGIN_RESPONSE ) => {
            this.success( "User Login:\n " + res.data.session_id );
            this.login_session_id.next(res.data.session_id);
        }, error => {
            this.error( "user.login ::" + error );
        });
    }

    testGetUserData( callback ) {
        this.user.data().subscribe( ( res: any ) => {
            this.success( "User Get Data: ");
            console.log(res['data']['user']);
            callback();
        }, error => {
            this.error( "getUserData() : error : " + error);
        });
    }

    testUserUpdate() {
        let record: _USER_EDIT = <_USER_EDIT>{};
        this.user.edit( record ).subscribe( (res: _USER_EDIT_RESPONSE ) => {
            this.success("userUpdate() : ", res);
            this.update_session_id.next( res.data.session_id );
        }, err => {
            this.error("userUpdate(): " + err);
        });
    }

    testLogout() {
        this.user.logout().subscribe( (res: _USER_LOGOUT_RESPONSE ) => {
            this.success("logout() : ", res);
        }, err => {
            this.error("logout(): " +  err );
        });
    }




    testMeta() {

        let id = 'user' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
        this.form.id = id;
        this.form.email = id + '@gmail.com';
        this.form.name = id;
        this.form.password = id;
        this.form.mobile = '09174678000';
        this.form.gender = 'M';


        this.user.register( this.form ).subscribe( (res: _USER_CREATE_RESPONSE ) => {
            this.success("Test Meta User registration:\n " + res.data.session_id );
            // error test
            // expect: error
            this.meta.create().subscribe( (res: _META_CREATE_RESPONSE) => {
                this.error( "shoud-be-error | this must be error" );
            }, err => {
                if ( err['code'] == ERROR_MODEL_IDX_IS_EMPTY ) {
                    this.success("model-idx-is-empty");
                }
                else this.error("this-must-be-model-idx-empty-error" + err);
            });


            // success test`
            // expect: success
            let req: _META_CREATE = {
                model: 'test',
                model_idx: 1,
                code: 'oo'
            };
            this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) => {
                this.success( 'this.meta.create( req ) ' + res );
            }, err => this.error('this.meta.create( req ) ' + err ) );            

        }, error => {
            this.error( 'TestMeta Registration Fail ' + error );
        } );

    this.testLogout()
    }
}
