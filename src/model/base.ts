import { Api } from './api';
export class Base extends Api {
    constructor( http, private taxonomy ) {
        super( http );
    }
}