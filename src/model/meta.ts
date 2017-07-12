import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';
import {Observable} from 'rxjs/Observable';

export * from './interface';
export * from './define';

@Injectable()
export class Meta extends Base {
    constructor( http: Http ) {
        super( http, 'meta' );
    }

    config( name?: string ): Observable<any> {
        let req = {
            route: this.taxonomy + '.config',
        };
        if ( name ) req['name'] = name;
        return this.post( req );
    }
}


