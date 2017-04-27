import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { SampleComponent } from './sample.component';
// import { SampleDirective } from './sample.directive';
// import { SamplePipe } from './sample.pipe';
// import { SampleService } from './sample.service';

// export * from './sample.component';
// export * from './sample.directive';
// export * from './sample.pipe';
// export * from './sample.service';




import { TestAll } from './test/test.all';
export { TestAll } from './test/test.all';

import { Backend } from './model/backend';
export { Backend } from './model/backend';

import { Category } from './model/category';
export { Category } from './model/category';
import { File } from './model/file';
export { File } from './model/file';
import { Meta } from './model/meta';
export { Meta } from './model/meta';
import { PostComment } from './model/post-comment';
export { PostComment } from './model/post-comment';
import { PostConfig } from './model/post-config';
export { PostConfig } from './model/post-config';
import { PostData } from './model/post-data';
export { PostData } from './model/post-data';
import { User } from './model/user';
export { User } from './model/user';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    // SampleComponent,
    // SampleDirective,
    // SamplePipe
  ],
  exports: [
    // SampleComponent,
    // SampleDirective,
    // SamplePipe
  ]
})
export class AngularBackendModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularBackendModule,
      providers: [
        //SampleService
        TestAll,
        Backend,
        Meta,
        User
      ]
    };
  }
}