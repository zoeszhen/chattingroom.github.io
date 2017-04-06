import * as angular from 'angular';
export class chatService {
	public dataStream: any;
	//@ngInject
	constructor(public $websocket) {
		//estabish a connection with WS
		this.dataStream = $websocket('ws://127.0.0.1:8888')
	}
	//listen and get the msg 
	public getMsg(){

		let collection = [];

		this.dataStream.onMessage((message) => {
			let mssageObj = message.data;
			//if it is not greeting data then go through transfer it as object
			if (collection.length > 0) {
				mssageObj = JSON.parse(message.data);
				// if it is not from _server go further transfer
				if (mssageObj.from !== "_server") {
					// transfer the message into object
					mssageObj = JSON.parse(mssageObj.message);
				}
			}
			collection.push(mssageObj);
		});

		return collection;
	}
	//send msg
	public sendMsg(msg){
		//cast msg to JSON
		this.dataStream.send(msg);
	}
}
