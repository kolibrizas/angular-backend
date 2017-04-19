import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

@Injectable()
export class Backend extends Base {
    constructor( http: Http ) {
        super( http, '' );
        console.log("Backend constructor:");
    }
}
