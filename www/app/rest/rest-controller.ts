/// <reference path="../_app.ts" />

module app.controllers {
    'use strict';

    export class RestController {

        public methods: string[];
        public currentMethod: string;
        public url: string;
        public response: any;
        
        constructor(private $http: ng.IHttpService) {
            this.methods = [
                "GET",
                "PUT",
                "POST"
            ];
        }
        
        public sendRequest(): void {
            
            var config: ng.IRequestConfig = {
                method: this.currentMethod,
                url: this.url
            };
            this.$http(config).then((promiseValue: ng.IHttpPromiseCallbackArg<{}>) => {
                this.response = JSON.stringify(promiseValue);
            },
            (error: any) => {
                this.response = JSON.stringify(error);
            })
            .catch((error: any) => {
                this.response = JSON.stringify(error);
            });
            
        }
    }
}
