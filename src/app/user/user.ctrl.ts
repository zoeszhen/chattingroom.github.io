import * as angular from 'angular';

export class UserCtrl {
  public userStatusList: Object = {};
  /** @ngInject */
  constructor(public User,
              public $window) {
    this.userStatus();
  }
  //get current user status
  public userStatus():void {
    this.User.getUserStatus()
      .then((data) => {
        this.userStatusList = data;
      })
      .catch((err) => {
        //send alert if not
        this.$window.alert("No connection establish");
      });
  };
}

export const userCmp: angular.IComponentOptions = {
  template: require('./user.html'),
  controller: UserCtrl,
  controllerAs: "userVm"
};
