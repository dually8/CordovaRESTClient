/// <reference path="../_app.ts" />

module app.controllers {
    "use strict";

    export class RestController {

        public methods: string[];
        public currentMethod: string;
        public url: string;
        public response: string;

        public parameters: app.models.IURLParam[];
        public paramModal: ionic.modal.IonicModalController;
        public newParam: app.models.IURLParam;

        public headers: app.models.IHeader[];
        public headerModal: ionic.modal.IonicModalController;
        public newHeader: app.models.IHeader;

        public basicAuth: app.models.IBasicAuth;
        public basicAuthModal: ionic.modal.IonicModalController;

        constructor(
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private $ionicModal: ionic.modal.IonicModalService) {
            this.init();
        }

        public sendRequest(): void {

            var newURL: string = this.url;

            if (this.parameters.length > 0) {
                newURL += "?";
                this.parameters.forEach((param: models.IURLParam, index: number, array: models.IURLParam[]) => {
                    if (index !== 0) {
                        newURL += "&";
                    }
                    newURL += param.key;
                    newURL += "=";
                    newURL += param.value;
                });
            }

            var config: ng.IRequestConfig = {
                method: this.currentMethod,
                url: newURL
            };
            this.$http(config).then((promiseValue: ng.IHttpPromiseCallbackArg<{}>) => {
                this.response = this.prettyJSONString(promiseValue);
            },
                (error: any) => {
                    this.response = this.prettyJSONString(error);
                })
                .catch((error: any) => {
                    this.response = this.prettyJSONString(error);
                });

        }

        // URL Params
        public addParam(): void {
            this.newParam = {
                key: undefined,
                value: undefined
            };
            this.paramModal.show();
        }

        public removeParam(param: models.IURLParam): void {
            var index: number = this.parameters.indexOf(param);
            this.parameters.splice(index, 1);
        }

        public cancelParam(): void {
            this.paramModal.hide();
        }

        public saveParam(): void {
            this.parameters.push(this.newParam);
            this.paramModal.hide();
        }

        //Headers
        public addHeader(): void {
            this.newHeader = {
                name: undefined,
                value: undefined
            };
            this.headerModal.show();
        }

        public removeHeader(header: models.IHeader): void {
            var index: number = this.headers.indexOf(header);
            this.headers.splice(index, 1);
        }

        public cancelHeader(): void {
            this.headerModal.hide();
        }

        public saveHeader(): void {
            this.headers.push(this.newHeader);
            this.headerModal.hide();
        }

        //Basic Auth
        public addBasicAuth(): void {
            this.basicAuthModal.show();
        }

        public cancelBasicAuth(): void {
            this.basicAuth = {
                username: undefined,
                password: undefined
            };
            this.basicAuthModal.hide();
        }

        public saveBasicAuth(): void {
            this.basicAuthModal.hide();
        }

        private prettyJSONString(str: any): string {
            return JSON.stringify(str, null, 2);
        }

        private createModals(): void {
            this.$ionicModal.fromTemplateUrl("add-param.html", {
                scope: this.$scope,
                animation: "slide-in-up"
            }).then((modal: ionic.modal.IonicModalController) => {
                this.paramModal = modal;
            });

            this.$ionicModal.fromTemplateUrl("add-header.html", {
                scope: this.$scope,
                animation: "slide-in-up"
            }).then((modal: ionic.modal.IonicModalController) => {
                this.headerModal = modal;
            });

            this.$ionicModal.fromTemplateUrl("basic-auth.html", {
                scope: this.$scope,
                animation: "slide-in-up"
            }).then((modal: ionic.modal.IonicModalController) => {
                this.basicAuthModal = modal;
            });
        }

        private init(): void {
            this.methods = [
                "GET",
                "PUT",
                "POST"
            ];
            this.currentMethod = this.methods[0];

            this.newParam = {
                key: undefined,
                value: undefined
            };
            this.parameters = [];

            this.newHeader = {
                name: undefined,
                value: undefined
            };
            this.headers = [];

            this.basicAuth = undefined;

            this.createModals();
        }
    }
}
