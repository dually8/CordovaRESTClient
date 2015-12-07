/// <reference path="../_app.ts" />


module app.models {
    "use strict";

    export interface IURLParam {
        key: any;
        value: any;
    }

    export interface IHeader {
        name: any;
        value: any;
    }

    export interface IBasicAuth {
        username: string;
        password: string;
    }
}