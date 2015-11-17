/// <reference path="../_app.ts" />


module app.controllers {
    'use strict';

    export class AboutController {

        private appVersion: string;


        constructor() {
            var _this = this;
            _this.appVersion = "";

            if (window.cordova) {
				//get app version
            }
        }
    }
}
