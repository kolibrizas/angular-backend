import { Injectable } from '@angular/core';
import { ERROR_TIMEOUT } from './../model/define';
import { Subject } from 'rxjs/Subject';

import {
    _RESPONSE, _LIST,
    _USER_CREATE, _USER_CREATE_RESPONSE,
    _USER_EDIT, _USER_EDIT_RESPONSE,
    _USER_LOGIN_RESPONSE, _USER_LOGOUT_RESPONSE,
    _META, _META_CREATE, _META_CREATE_RESPONSE, _META_DATA_RESPONSE, _META_LIST_RESPONSE, _DELETE_RESPONSE,
    _DELETE_REQUEST, _USER_LOGIN, _DATA_REQUEST, _CONFIG_CREATE, _CONFIG_RESPONSE
} from './../model/interface';
import * as d from './../model/define';



import { Backend } from './../model/backend';
import { Meta } from './../model/meta';
import { User } from './../model/user';
import { PostConfig } from './../model/post-config';


@Injectable()
export class TestAll {

    private count: number = 0;

    private postConfigForTest: string = null;
    //form = <_USER_CREATE> {};


    // new subscribes.

    // logout = new Subject();
    // register = new Subject();
    // login = new Subject();
    // userUpdate = new Subject();


    // old
    // session_id = new Subject<string>();
    // login_session_id = new Subject<string>();
    // update_session_id = new Subject<string>();
    // meta_session_id = new Subject<string>();


    constructor( 
        public backend: Backend,
        private meta: Meta,
        private user: User,
        private postConfig: PostConfig
    ) {
        //console.log("TestAll constructor:");

    }

    run() {

        this.testApi(); // api itself.
        this.testServer(); // basic server & backend protocol test.     
        this.doLogout( () => this.userRegisterGetUpdateLogout() ); // try logout first, then do register update logout

        //test for anonymous user or not logged user
        this.doLogout( () => {
            this.testMetaLogout();
            this.testPostConfigLogout();
        });

        this.doLogout( () => {

            let req: _USER_LOGIN = {
                id: 'admin',
                password: 'admin'
            };
            this.doLogin(req, ()=> {
                this.testPostConfigUserLoggedInByAdmin();
            })

        });

        this.doRegister( () => {
            this.testMetaLoggedIn(); //Test on Meta
            this.testPostConfigRandomUserLoggedIn();
        });



        // TODO TEST POST CONFIG AS ADMIN


            
            
            

        // this.logout.subscribe( () => this.doLogout() );
        //this.register.subscribe( callback => this.doRegister( callback ) );
        //this.login.subscribe( o => this.doLogin( o ) );
        //this.userUpdate.subscribe( session_id => this.doGetUserData( () => this.doUserUpdate() ) );

        // this.testLogout();

        //this.testUserRegister();
        //this.session_id.subscribe( id => this.testLogin() );
        // this.login_session_id.subscribe( session_id => this.testGetUserData( () => this.testUserUpdate() ) );
        //this.update_session_id.subscribe( x => this.logout.next() );

        

    }

    userRegisterGetUpdateLogout() {
        this.doRegister(
            ( req, res ) => this.doLogin( req, () => {
                this.doGetUserData( () => this.doUserUpdate( () => this.doLogout() ) );
            } )
        );
    }



    doLogout( callback? ) {
        //console.log("doLogout() begin");
        if ( this.user.logged ) {
            this.user.logout().subscribe( (res: _USER_LOGOUT_RESPONSE ) => {
                this.success("logout() : ", res);
                if ( callback ) callback( res );
            }, err => {
                this.error( err );
            });
        }
        else {
            if ( callback ) callback();
        }

    }


    doRegister( callback ) {
        let id = 'user' + (new Date).getMinutes() + Math.round( ( Math.random() * 100000) );
        let req: _USER_CREATE = {
            id: id,
            password: id,
            email: id + '@gmail.com',
            name: id,
            mobile: '09174678000',
            gender: 'M'
        };
        this.user.register( req ).subscribe( (res: _USER_CREATE_RESPONSE ) => {
            this.success("User registration:\n " + res.data.session_id );
            callback( req, res );
        }, error => {
            //console.log("ERROR: doRegister()");
            this.error( error );
        } );
    }


    doLogin( o, callback ) {
        this.user.login( { id: o.id, password: o.password } ).subscribe( ( res: _USER_LOGIN_RESPONSE ) => {
            this.success( "User Login:\n " + res.data.session_id );
            /// this.login_session_id.next(res.data.session_id);
            callback( res );
        }, error => {
            //console.log("doLogin() => login failed.");
            this.error( error );
        });
    }


    doGetUserData( callback ) {
        this.user.data().subscribe( ( res: any ) => {
            this.success( "User Get Data: ");
            //console.log(res['data']['user']);
            callback();
        }, error => {
            this.error( "getUserData() : error : " + error);
        });
    }

    doUserUpdate( callback ) {
        let record: _USER_EDIT = <_USER_EDIT>{};
        this.user.edit( record ).subscribe( (res: _USER_EDIT_RESPONSE ) => {
            this.success("userUpdate() : ", res);
            //this.update_session_id.next( res.data.session_id );
            // this.logout.next();
            callback( res );
        }, err => {
            this.error("userUpdate(): " + err);
        });
    }



    success( str, ...vars ) {
        this.count ++;
        //console.info(`[${this.count}] SUCCESS: ${str}`, vars);
    }


    getErrorString( err: Object ) {
        return this.backend.getErrorString( err );
    }

    /**
     * 
     * @param error
     * @param message 
     */
    error( error: Object, message = '' ) {
        this.count ++;
        let error_string = this.getErrorString( error );
        //console.error( `[${this.count}] ERROR: ${ message } - ${ error_string }` );
    }

    testApi() {
        //console.log('url:', this.backend.getBackendUrl() );

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
        //     //console.log(error);
        //     if ( this.backend.isInternalServerError( error ) ) this.success("Internal Server Error: " + this.backend.getErrorString(error) );
        //     else this.error(error, "This must be 500 - internal server error. but it is another error.");
        // });


        // setTimeout( () => {
        //     this.backend.scriptError().subscribe( re => {
        //         //console.log(re);
        //         this.error( re, "scriptError() - This should be script error. But success." );
        //     }, error => {
        //         //console.log( error );
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

        // expect: error
        this.backend.routeRequiredError().subscribe( re => {
            this.error( re, "Must be error");
        }, error => {
            this.success("Route required variable error: name is missing.");            
        });




    }

    // testUserRegister() {
    //     let id = 'user' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
    //     this.form.id = id;
    //     this.form.email = id + '@gmail.com';
    //     this.form.name = id;
    //     this.form.password = id;
    //     this.form.mobile = '09174678000';
    //     this.form.gender = 'M';


    //     this.user.register( this.form ).subscribe( (res: _USER_CREATE_RESPONSE ) => {
    //         this.success("User registration:\n " + res.data.session_id );
    //         this.session_id.next( res.data.session_id );
    //     }, error => {
    //         this.error( "user.register()" + error );
    //     } );
    // }


    // testLogin() {
    //     let sampleLoginData = {
    //         id: this.form.id,
    //         password: this.form.password
    //     };
    //     this.user.login( sampleLoginData ).subscribe( ( res: _USER_LOGIN_RESPONSE ) => {
    //         this.success( "User Login:\n " + res.data.session_id );
    //         this.login_session_id.next(res.data.session_id);
    //     }, error => {
    //         this.error( "user.login ::" + error );
    //     });
    // }

    // testGetUserData( callback ) {
    //     this.user.data().subscribe( ( res: any ) => {
    //         this.success( "User Get Data: ");
    //         //console.log(res['data']['user']);
    //         callback();
    //     }, error => {
    //         this.error( "getUserData() : error : " + error);
    //     });
    // }

    // testUserUpdate() {
    //     let record: _USER_EDIT = <_USER_EDIT>{};
    //     this.user.edit( record ).subscribe( (res: _USER_EDIT_RESPONSE ) => {
    //         this.success("userUpdate() : ", res);
    //         this.update_session_id.next( res.data.session_id );
    //     }, err => {
    //         this.error("userUpdate(): " + err);
    //     });
    // }

/*
    testLogout() {
        if ( this.user.logged ) {
            this.user.logout().subscribe( (res: _USER_LOGOUT_RESPONSE ) => {
                this.success("logout() : ", res);
            }, err => {
                this.error( err );
            });
        }
    }
*/


    testMetaLogout() {

        /**
         * Try to create a meta with logout.
         * expect: error
         */
        this.meta.create().subscribe( (res: _META_CREATE_RESPONSE) => {
            this.error( "should-be-error | this must be error" );
        }, err => {
            if ( err['code'] == d.ERROR_REQUIRED_INPUT_IS_MISSING ) {
                this.success("user logged out. no session id error.", this.backend.getErrorString( err ) );
            }
            else this.error( err );
        });

        //search test1,1
        this.meta.list( {where: 'model=?', bind: 'test' } ).subscribe( (res: _META_LIST_RESPONSE) => {
            //console.log('this.meta.list::anonymous', res );
            if(res.data.total == 0 ) this.success( '0 data for anonymous', res  );
            else this.error( res, '0 data for anonymous');
        }, err => {
            //console.log('this.meta.list::anonymous');
            this.error( err );
        });

    }



    testMetaLoggedIn() {



        // error test
        // expect: error
        this.meta.create().subscribe( ( res: _META_CREATE_RESPONSE) => {
            this.error( "should-be-error | this must be error" );
        }, err => {
            if ( err['code'] == d.ERROR_MODEL_IDX_IS_EMPTY ) {
                this.success("model-idx-is-empty");
            }
            else this.error( err );
        });

        // success test`
        // expect: success

        let meta_req: _META_CREATE = <_META_CREATE> {
            model: 'test1',
            model_idx: 1,
            code: 'oo'
        };
        this.meta.create( meta_req ).subscribe( (res: _META_CREATE_RESPONSE) => {
            this.success( 'this.meta.create( req ) test1 ', res );

            // this produce error because data is not part of the route for meta on backend
            // this.meta.data( res.data.meta.idx ).subscribe( ( res: _META_DATA_RESPONSE ) => {
            //     this.error( res );
            // }, err => {
            //     //console.log('this.meta.data::error', err);
            //     this.success('route-does-not-exists', err);
            // });

        }, err => this.error( err ) );



        meta_req['model'] = 'test2';
        this.meta.create( meta_req ).subscribe( (res: _META_CREATE_RESPONSE) => {
            this.success( 'this.meta.create( req ) for test2 ', res );
        }, err => this.error( err ) );

        //multi metas
        meta_req['model'] = 'test3';
        this.meta.create( meta_req ).subscribe( (res: _META_CREATE_RESPONSE) => {
            this.success( 'this.meta.create( req ) for test3 ', res );
        }, err => this.error( err ) );



        let meta_query: _LIST = <_LIST>{};
        //query is empty
        this.meta.list().subscribe( (res: _META_LIST_RESPONSE) => {
            //console.log('this.meta.list::empty', res);
            this.error( res );
        }, err => {
            //console.log('this.meta.list::empty');
            this.success('required-variable-is-missing where', err );
        });

        //error since binding is missing
        meta_query['where'] = 'model=? AND model_idx=?';
        this.meta.list( meta_query ).subscribe( ( res: _META_LIST_RESPONSE) => {
            //console.log('this.meta.list::where', res );
            this.error( res );
        }, err => {
            //console.log('this.meta.list::where');
            this.success('binding is missing', err );
        });


        //search test1,1
        meta_query['bind'] = 'test1,1';
        this.meta.list( meta_query ).subscribe( (res: _META_LIST_RESPONSE) => {
            //console.log('this.meta.list::where&bind', res );
            this.success('meta.list test1,1', res );
        }, err => {
            //console.log('this.meta.list::where&bind');
            this.error( err );
        });


        //search all test '%test%,1'
        meta_query['where'] = 'model LIKE ? AND model_idx=?';
        meta_query['bind'] = '%test%,1';
        this.meta.list( meta_query ).subscribe( (res: _META_LIST_RESPONSE) => {
            //console.log('this.meta.list::%test%', res );
            this.success('meta.list test1,1', res );
        }, err => {
            //console.log('this.meta.list::%test%');
            this.error( err );
        });

    }


    testPostConfigLogout() {
        //console.log("testPostConfigLogout");
        let id = 'postConfig-test-create' + (new Date).getMinutes() + Math.round( ( Math.random() * 100000) );
        let req: _DELETE_REQUEST = {
            id: id
        };
        this.postConfig.delete( req ).subscribe( (res: _DELETE_RESPONSE ) => {
            //console.log( "testPostConfigLogout::postConfig.delete::res ",  res );
            this.error(res);
        }, err => {
            //console.log( "testPostConfigLogout::postConfig.delete::err ", err );
            this.success('required-variable-is-missing session_id', this.getErrorString(err));
        });
    }

    testPostConfigRandomUserLoggedIn() {
        //console.log("testPostConfigLoggedIn");
        let id = 'postConfig-test-create' + (new Date).getMinutes() + Math.round( ( Math.random() * 100000) );
        let req: _DELETE_REQUEST = {
          id: id
        };
        this.postConfig.delete( req ).subscribe( (res: _DELETE_RESPONSE ) => {
            //console.log( "testPostConfigLoggedIn::postConfig.delete::res ",  res );
            this.error(res);
        }, err => {
            //console.log( "testPostConfigLoggedIn::postConfig.delete::err ", err );
            this.success('admin-permission-required', this.getErrorString(err));
        });
    }

    testPostConfigUserLoggedInByAdmin() {
        //check first if configdata exist. delete if exist or create if not
        //console.log("testPostConfigUserLoggedInByAdmin");
        this.postConfigForTest = 'postConfig-test-create' + (new Date).getMinutes() + Math.round( ( Math.random() * 100000) );

        this.postConfig.create().subscribe( (res: _CONFIG_RESPONSE)=> {
            //console.log("testPostConfigUserLoggedInByAdmin::postConfig.create::empty::res" , res);
            this.error(res, "this must be error. id is required")
        }, err => {
            //console.log("testPostConfigUserLoggedInByAdmin::postConfig.create::empty::err" , err);
            this.success("required id is missing " + this.getErrorString(err));
        });

        let config_req: _CONFIG_CREATE = {
            id: this.postConfigForTest,
            name: 'name_' + this.postConfigForTest,
            description: 'description_' + this.postConfigForTest
        };
        let config_idx;
        this.postConfig.create( config_req ).subscribe( (res: _CONFIG_RESPONSE)=> {
            //console.log("testPostConfigUserLoggedInByAdmin::postConfig.create::res" , res);
            if( res.code == 0) {
                this.success("post config created ", res);
                config_idx = res['data']['idx'];

                this.postConfig.data( this.postConfigForTest ).subscribe( (res: _CONFIG_RESPONSE) => {
                    //console.log( "testPostConfigUserLoggedInByAdmin::postConfig.data::res ",  res );
                    if( res.data.config.idx && res.data.config.idx == config_idx) {
                        this.success("get post config data by id ", res);
                    }
                    else {
                        this.error(res, "this should have the same post config " + res.data.config.idx );
                    }
                }, err => {
                    //console.log( "testPostConfigUserLoggedInByAdmin::postConfig.data::err ",  err );
                    this.error(err, 'error get postConfig' + config_idx);
                });

            }
            else {
                this.error( res, "this must should be code 0" )
            }
        }, err => {
            //console.log("testPostConfigUserLoggedInByAdmin::postConfig.create::err" , err);
            this.error(err);
        });


        let req: _DELETE_REQUEST = {
            id: this.postConfigForTest
        };
        this.postConfig.delete( req ).subscribe( (res: _DELETE_RESPONSE ) => {
            //console.log( "testPostConfigUserLoggedInByAdmin::postConfig.delete::res ",  res );
        }, err => {
            //console.log( "testPostConfigUserLoggedInByAdmin::postConfig.delete::err ", err );
        });
    }


}
