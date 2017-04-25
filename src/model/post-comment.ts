import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';
import { Observable } from 'rxjs/Observable';

export * from './interface';
export * from './define';

import {
    _COMMENT_CREATE, _COMMENT_CREATE_RESPONSE
} from './interface';

@Injectable()
export class PostComment extends Base {
    constructor( http: Http ) {
        super( http, 'post_comment' );
    }

  create( req: _COMMENT_CREATE ): Observable<_COMMENT_CREATE_RESPONSE> {
    req['route'] = this.taxonomy + '.create';
    return <any>this.post(req);
  }
  
}
