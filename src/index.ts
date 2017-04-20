import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SampleComponent } from './sample.component';
// import { SampleDirective } from './sample.directive';
// import { SamplePipe } from './sample.pipe';
// import { SampleService } from './sample.service';

import { Backend } from './model/backend';
import { TestAll } from './test/test.all';


// export * from './sample.component';
// export * from './sample.directive';
// export * from './sample.pipe';
// export * from './sample.service';

export { Backend } from './model/backend';
export { TestAll } from './test/test.all';


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
        Backend,
        TestAll
      ]
    };
  }
}
