class MainCtl{
	//init value of user tab
	public currentTab: string = "Chatting";
	constructor() {
	}
	//sign the userTab
	public handleTab(tab:string):void{
		this.currentTab = tab;
	}
}

export const main: angular.IComponentOptions = {
  template: require('./main.html'),
  controller: MainCtl,
  controllerAs: "mainVm"
};
