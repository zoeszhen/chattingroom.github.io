import * as angular from 'angular';

class historyCtrl {
  public chatHistoryList:any = [];
  public avatarColorSet :Object = {};
  public errorMsg: string;
  /** @ngInject */
  constructor(
    public User,
    public $window) {
    this.chatHistory();
  }

  public chatHistory(): void{
    //clean the chat history
    this.chatHistoryList = [];
    
    //read history from endpoint
    this.User.getChatHistory()
      .then((t) => {
        //if error sign to error
        if(t.errors !== null){
          this.errorMsg = t.error;
          return;
        }

        t.data.forEach((item) => {
          //if it not come from server, need to casting to object and rearrange
          if (item.from !== "_server") {
            let msg = JSON.parse(item.msg)

            this.chatHistoryList.push({
              timestamp: item.timestamp,
              from: msg.from,
              message: msg.message
            })
          } else {
            //otherwise push to array

            this.chatHistoryList.push(item);
          }
        });
        this._colorPicker();
      })
      .catch((err) => {
        this.$window.alert("No connection establish");
      });
  };

  //generate a random color for avatar
  private _colorPicker():void {
    let colorName = this.chatHistoryList.map(x => x.from)
      .filter((v, i, a) => a.indexOf(v) === i);
      
    //generate a random color   
    colorName.forEach((name) => {
      this.avatarColorSet[name] = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    })
  }

}

export const historyCmp: angular.IComponentOptions = {
  template: require('./history.html'),
  controller: historyCtrl,
  controllerAs: "historyVm"
};
