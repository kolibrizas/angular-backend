import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Base } from './base';
import { Observable } from "rxjs";
export * from './interface';
export * from './define';

import {
    _UPLOAD, _UPLOAD_RESPONSE, _IMG_SRC,
    _PRIMARY_PHOTO_UPLOAD,
    _ANONYMOUS_PRIMARY_PHOTO_UPLOAD,
 } from "./interface";
import {
  RES_ERROR_NO_FILE_SELECTED
} from './define';
import { ProgressService } from "../service/progress";

export type CALLBACK_NUMBER = (percentage: number) => void;

@Injectable()
export class File extends Base {
  protected percentage: number = 0;
  constructor(
    http: Http, private progress: ProgressService
  ) {
    super( http, 'file' );
  }


  upload( req: _UPLOAD, file: any, callback?: CALLBACK_NUMBER ) : Observable<_UPLOAD_RESPONSE> {
    
    
    if ( file === void 0 || file.name === void 0 ) {
      return Observable.throw( RES_ERROR_NO_FILE_SELECTED );
    }
    
    let session_id = this.getSessionId();
    let formData = new FormData();
    formData.append( 'userfile', file, file.name);
    formData.append( 'route', 'upload');
    if ( session_id ) formData.append( 'session_id' , session_id);
    if ( req['model'] ) formData.append( 'model', req.model );
    if ( req['model_idx'] ) formData.append( 'model_idx', req.model_idx );
    if ( req['code'] ) formData.append( 'code', req.code );
    if ( req['unique'] ) formData.append( 'unique', req.unique );
    if ( req['finish'] ) formData.append( 'finish', req.finish );
    

    console.log( file );
    console.log( formData ) ;
    let o: Observable<any> = this.http.post( this.getBackendUrl(), formData );




    let subscription = this.progress.uploadProgress.subscribe( res => {
      // console.log("progress: ", res);
      // console.log('total::', res.total, 'Loaded::', res.loaded);
      this.percentage = Math.round(res.loaded/res.total*100);
      // console.log('this.percentage::',this.percentage);
      // console.log(subscription);


      if ( callback ) callback( this.percentage );
      if ( this.percentage == 100 ) subscription.unsubscribe();


    });

    return this.processQuery( o );
  }


  url( idx: number ) : string {
    return this.fileUrl( idx );
  }

  src( option: _IMG_SRC ) {
    let url = this.url( option.idx );
    if ( option['width'] ) url += 'width=' + option.width;
    if ( option['height'] ) url += 'height=' + option.height;
    if ( option['quality'] ) url += 'quality=' + option.quality;
    if ( option['resize'] ) url += 'resize=' + option.resize;
    console.log('file.src() returns: ', url);
    return url;
  }



  //// User Primary Photo Upload

  private uploadAnonymousPrimaryPhoto( file: any, callback?: CALLBACK_NUMBER ) : Observable<_UPLOAD_RESPONSE > { 
    let req: _ANONYMOUS_PRIMARY_PHOTO_UPLOAD = {
      model: 'user',
      code: 'primary_photo'
    };
    return this.upload( req, file, callback );
  }
  private uploadUserPrimaryPhoto( file: any, callback?: CALLBACK_NUMBER ) : Observable<_UPLOAD_RESPONSE > {
    let req: _PRIMARY_PHOTO_UPLOAD = {
      model: 'user',
      model_idx: this.info.idx,
      code: 'primary_photo',
      unique: 'Y',
      finish: 'Y'
    };
    console.log("uploadUserPrimaryPhoto : ", req);
    return this.upload( req, file, callback );
  }
  
  uploadPrimaryPhoto( file, callback?: CALLBACK_NUMBER ) {
    console.log("uploadPrimaryPhoto: ");
    if ( this.logged ) return this.uploadUserPrimaryPhoto( file, callback );
    else return this.uploadAnonymousPrimaryPhoto( file, callback );
  }




  /**
   * 
   * File upload for post
   * 
   * 
   * @param file 
   * @param callback 
   * 
   * @code

    onChangeFile( _ ) {
        this.file.uploadPostFile( _.files[0], percentage => {
            console.log('percentage:', percentage);
        } ).subscribe( (res:_UPLOAD_RESPONSE) => {
            this.files.push( res.data );
            console.log('files: ', this.files);
        }, err => {
            console.log('err:', err);
            if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
            this.file.alert(err);
        });
    }

   * @endcode
   * 
   */
  uploadPostFile( file, callback?: CALLBACK_NUMBER ) : Observable<_UPLOAD_RESPONSE> {
    let req: _UPLOAD = {
      model: 'post_data',
      code: ''
    };
    return this.upload( req, file, callback );
  }
}
