import { Http } from '@angular/http';
import { Base } from './base';
import { Observable } from 'rxjs/Observable';
export * from './interface';
export * from './define';
import { _COMMENT_CREATE, _COMMENT_CREATE_RESPONSE } from './interface';
export declare class PostComment extends Base {
    constructor(http: Http);
    create(req: _COMMENT_CREATE): Observable<_COMMENT_CREATE_RESPONSE>;
}
