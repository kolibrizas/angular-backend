import { Backend } from './../model/backend';
import { Meta } from './../model/meta';
import { User } from './../model/user';
export declare class TestAll {
    backend: Backend;
    private meta;
    private user;
    private count;
    constructor(backend: Backend, meta: Meta, user: User);
    run(): void;
    userRegisterGetUpdateLogout(): void;
    doLogout(callback?: any): void;
    doRegister(callback: any): void;
    doLogin(o: any, callback: any): void;
    doGetUserData(callback: any): void;
    doUserUpdate(callback: any): void;
    success(str: any, ...vars: any[]): void;
    getErrorString(err: Object): string;
    /**
     *
     * @param error
     * @param message
     */
    error(error: Object, message?: string): void;
    testApi(): void;
    testServer(): void;
    testMeta(): void;
}
