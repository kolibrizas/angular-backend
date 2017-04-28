import { Api } from './api';
import { _LIST, _DELETE_RESPONSE, _VOTE_RESPONSE, _REPORT_RESPONSE } from './interface';
import { Observable } from 'rxjs/Observable';
export declare class Base extends Api {
    taxonomy: any;
    constructor(http: any, taxonomy: any);
    /**
     *
     *
     *
     * @param req
     *
     * @code example code.
        this.config.list( {} ).subscribe( res => {
          
            console.log(res);
        }, err => {
            console.log(err);
        });
        
     *
     * @endcode
     *
     * @code
        this.config.list( {page: 2} ).subscribe( res => { } ); // get items of page no 2 of post_config
        this.user.list( { page: 2, limit: 3 } ).subscribe( res => { }); // get 2nd page of users. A pages has 3 users.
        this.config.list( { page: 1, limit: 3, where: 'id LIKE ?', bind: 'my%' } ).subscribe( res => { } ); // get upto 3 post_configs whose id begins with 'my'
        this.config.list( { limit: 1, where: 'id LIKE ?', bind: 'my%', order: 'idx DESC' } ).subscribe( res => {} ); // get the newly created post_config whose id begins with 'my'. only one data will be returned.
     * @endcode
     *
     */
    list(req?: _LIST): Observable<any>;
    create(req?: {}): Observable<any>;
    /**
     *
     *
     * @note It does forcing type match.
     * @param idx
     */
    delete(idx: any): Observable<_DELETE_RESPONSE>;
    edit(req?: {}): Observable<any>;
    data(idx: any): Observable<any>;
    vote(idx: number, choice?: string): Observable<_VOTE_RESPONSE>;
    report(idx: number): Observable<_REPORT_RESPONSE>;
    /**
     *
     * Common api.
     *
     * @param idx
     */
    fileUrl(idx: number): string;
}
