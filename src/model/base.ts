// import { Optional } from '@angular/core';
import { Api } from './api';
import { NO_OF_ITEMS_PER_PAGE } from './config';
import {
    _LIST,
    _DATA_REQUEST,
    _DELETE_REQUEST, _DELETE_RESPONSE,
    _VOTE_RESPONSE,
    _REPORT_RESPONSE
} from './interface';
import { Observable } from 'rxjs/Observable';
export class Base extends Api {
  constructor (
    http,
    public taxonomy ) {
    super(http);


  }


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
    list( req: _LIST = <_LIST> {} ) : Observable< any > {
        req['route'] = this.taxonomy + '.list';


        /**
         * @deprecated code. // Pagination helper.
         * 
         * To make it clear and easy understanding,
         * 
         */
        // if ( ! req['limit'] ) req.limit = NO_OF_ITEMS_PER_PAGE;
        // if ( req['page'] ) {
        //     let page = req['page'] > 0 ? req['page'] : 1;
        //     let limit = req.limit;
        //     req.from =  ( page - 1 ) * limit;
        //     delete( req.page );
        // }
        //

        // req.session_id = this.getSessionId();
        return this.post( req );
  }

  create(req = {}): Observable<any> {
    req['route'] = this.taxonomy + '.create';
    return this.post(req);
  }


  /**
   * 
   * 
   * @note It does forcing type match.
   * @param idx 
   */
  delete( idx: any ) : Observable<_DELETE_RESPONSE> {
    let req: _DELETE_REQUEST = {
      route: this.taxonomy + '.delete'
    }
    
    /// bug fix: if idx is numeric, then it is a number.
    let no = parseInt( idx );
    if ( Number.isInteger( no ) ) req.idx = idx;
    else req.id = idx;

    return <Observable<_DELETE_RESPONSE>><any>this.post(req);
  }

  edit( req = {} ): Observable<any> {
    req['route'] = this.taxonomy + '.edit';
    return this.post(req);
  }

  data( idx: any ) : Observable<any> {
    let req: _DATA_REQUEST = {
      route: this.taxonomy + '.data'
    };
    if ( idx ) {
      if ( ! isNaN( idx ) ) req.idx = idx;
      else req.id = idx;
    }
    return this.post( req );
  }


  vote( idx: number, choice: string = 'G' ) : Observable<_VOTE_RESPONSE> {
    let req = {
      route: this.taxonomy + '.vote',
      idx: idx,
      choice: choice
    };
    return <Observable<_VOTE_RESPONSE>><any>this.post( req );
  }


  report( idx: number ) : Observable<_REPORT_RESPONSE> {
    let req = {
      route: this.taxonomy + '.report',
      idx: idx
    };
    return <Observable<_REPORT_RESPONSE>><any>this.post( req );
  }




  /**
   * 
   * Common api.
   * 
   * @param idx 
   */  
  fileUrl( idx: number ) : string {
    return this.getBackendUrl() + '?route=download&idx='+idx;
  }

}
