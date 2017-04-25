import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

export * from './interface';
export * from './define';

@Injectable()
export class PostConfig extends Base {
    constructor( http: Http ) {
        super( http, 'post_config' );
    }
}


