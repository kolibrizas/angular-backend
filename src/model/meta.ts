import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

export * from './interface';
export * from './define';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class Meta extends Base {
    constructor( http: Http ) {
        super( http, 'meta' );
    }
}


