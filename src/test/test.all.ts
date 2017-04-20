import { Injectable } from '@angular/core';
import { Backend } from './../model/backend';
import { ERROR_TIMEOUT } from './../model/define';


@Injectable()
export class TestAll {

    private count: number = 0;

    constructor( public backend: Backend ) {
        console.log("TestAll constructor:");

    }

    run() {
        this.apiTest(); // api itself.
        this.serverTest(); // basic server & backend protocol test.
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

    apiTest() {
        console.log('url:', this.backend.getBackendUrl() );

        this.backend.version().subscribe( res => {
            this.success(`version check: ${res['data'].version}`);
        }, err => {
            this.error("version error: ", this.getErrorString(err));
        });
    

    }

    serverTest() {
        

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
}
