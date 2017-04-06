import * as angular from 'angular';

class ChatCtrl {
  public msgCollection: any = [];
  public instantMsg:string = "";
  public nickName:string = "";

  /** @ngInject */
  constructor(private $http,
              public chatService) {
    this._init();
  }
  //init the controller get connected with websocket
  private _init(): void{
      this.msgCollection = this.chatService.getMsg();
  };
  
  //
  private _sendNickMsg(nick): void{
    this.chatService.sendMsg(nick);
    this.nickName = nick.replace("/nick ", "");
  }

  private _sendInstatMsg(instantMsg): void{
    //force user to input a nick name

    if(!this.nickName){
      this.msgCollection.push({
        from:"error", 
        message: "please set the nick name by command /nick nickname before chatting away"
      })
      return;
    };
    //compose the instant msg
    let instantItem = {
      "from": this.nickName,
      "message": instantMsg
    }
    //push instant msg to ws
    this.chatService.sendMsg(angular.toJson(instantItem));
    //push instant msg to convesation stream
    this.msgCollection.push(instantItem);
  } 
  //public interface for send msg
  public sendGeneralMsg(data):void{
    if (data[0]==="/") {
      this._sendNickMsg(data);
    }else{
      this._sendInstatMsg(data);
    }
    //clean msg box after sending
    this.instantMsg = "";
  }
}


export const chatCmp: angular.IComponentOptions = {
  template: require('./chat.html'),
  controller: ChatCtrl,
  controllerAs: "chatVm",
};
