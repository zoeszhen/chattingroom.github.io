import * as angular from 'angular';

import { mainModule } from './app/main.module';
import 'angular-ui-router';
import 'angular-websocket';
import 'angularjs-scroll-glue';

import routesConfig from './routes';

import {main} from './app/main';
import { chatService } from "./app/service/chat.service";
import { User } from "./app/service/user.service"

import { ngEnter } from "./app/directive/onEnter";


import '../css/index.scss';
// import 'jquery';
// import "bootstrap";

angular
	.module('app', [mainModule, 'ui.router', "ngWebSocket", 'luegg.directives'])
	.config(routesConfig)
	.service('chatService', chatService)
	.service('User', User)
	.component('app', main)
	.directive('ngEnter', ngEnter);
