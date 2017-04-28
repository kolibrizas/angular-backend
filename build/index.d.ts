import { ModuleWithProviders } from '@angular/core';
export { TestAll } from './test/test.all';
export { Backend } from './model/backend';
export { Category } from './model/category';
export { File } from './model/file';
export { Meta } from './model/meta';
export { PostComment } from './model/post-comment';
export { PostConfig } from './model/post-config';
export { PostData } from './model/post-data';
export { User } from './model/user';
export * from './model/interface';
export * from './model/define';
export * from './model/config';
export declare class AngularBackendModule {
    static forRoot(): ModuleWithProviders;
}
