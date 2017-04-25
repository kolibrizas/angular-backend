import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { ProgressService } from "./progress";

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor(private service:ProgressService) {
    super();
  }

   build(): any {
     let xhr = super.build();

      // xhr.onprogress = (event) => {            
      //   this.service.downloadProgress.next(event);
      // };

      xhr.upload.onprogress = (event) => {
        if ( this.service )
          this.service.uploadProgress.next(event);
      };

      return <any>(xhr);
  }
}