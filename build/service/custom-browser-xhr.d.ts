import { BrowserXhr } from '@angular/http';
import { ProgressService } from "./progress";
export declare class CustomBrowserXhr extends BrowserXhr {
    private service;
    constructor(service: ProgressService);
    build(): any;
}
