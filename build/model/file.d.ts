import { Http } from '@angular/http';
import { Base } from './base';
import { Observable } from "rxjs";
export * from './interface';
export * from './define';
import { _UPLOAD, _UPLOAD_RESPONSE, _IMG_SRC } from "./interface";
import { ProgressService } from "../service/progress";
export declare type CALLBACK_NUMBER = (percentage: number) => void;
export declare class File extends Base {
    private progress;
    protected percentage: number;
    constructor(http: Http, progress: ProgressService);
    upload(req: _UPLOAD, file: any, callback?: CALLBACK_NUMBER): Observable<_UPLOAD_RESPONSE>;
    url(idx: number): string;
    src(option: _IMG_SRC): string;
    private uploadAnonymousPrimaryPhoto(file, callback?);
    private uploadUserPrimaryPhoto(file, callback?);
    uploadPrimaryPhoto(file: any, callback?: CALLBACK_NUMBER): Observable<_UPLOAD_RESPONSE>;
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
    uploadPostFile(file: any, callback?: CALLBACK_NUMBER): Observable<_UPLOAD_RESPONSE>;
}
