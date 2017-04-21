import { Injectable } from '@angular/core';
import { ERROR_TIMEOUT } from './../model/define';


import {
    _META, _META_CREATE, _META_CREATE_RESPONSE
} from './../model/interface';
import {
    ERROR_MODEL_IDX_IS_EMPTY, RES_ERROR_MODEL_IDX_EMPTY
} from './../model/define';
import { Backend } from './../model/backend';
import { Meta } from './../model/meta';


@Injectable()
export class TestAll {

    private count: number = 0;

    constructor( public backend: Backend, private meta: Meta ) {
        console.log("TestAll constructor:");

    }

    run() {
        this.testApi(); // api itself.
        this.testServer(); // basic server & backend protocol test.

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
                this.success('This should be timeout error. ' + this.backend.getErrorString( error ));
            }
            else this.error( error, "This is not timeout error. But another error");
        });



        // route error
        this.backend.routeMethodError().subscribe( re => {
            this.error( re, "Must be error");
        }, error => {
            this.success("Route Error");
            console.log( error );
        });

        this.backend.routeRequiredError().subscribe( re => {
            this.error( re, "Must be error");
        }, error => {
            this.success("Route required variable error: name is missing.");
            console.log( error );
            
        });



    }


    testMeta() {

        // error test
        // expect: error
        this.meta.create().subscribe( (res: _META_CREATE_RESPONSE) => {
            this.error( "shoud-be-error", "this must be error" );
        }, err => {
            if ( err['code'] == ERROR_MODEL_IDX_IS_EMPTY ) {
                this.success("model-idx-is-empty");
            }
            else this.error("this-must-be-model-idx-empty-error", '');
        });


        // success test
        // expect: success
        let req: _META_CREATE = {
            model: 'test',
            model_idx: 1,
            code: 'oo'
        };
        this.meta.create( req ).subscribe( (res: _META_CREATE_RESPONSE) => {
            this.success( req );
        }, err => this.error( err ) );
    }
}
