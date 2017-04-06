import * as angular from 'angular';
import {main} from './main';
import { chatCmp } from "./chat/chat.ctrl"
import { historyCmp } from "./history/history.ctrl"
import { userCmp } from "./user/user.ctrl"
export const mainModule = 'mainCtrl';

angular
	.module(mainModule, [])
	.component('chatCmp', chatCmp)
	.component('historyCmp', historyCmp)	
	.component('userCmp', userCmp);
