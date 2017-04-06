import { UserCtrl } from "./user.ctrl";
import * as angular from 'angular';
import { UserMock } from "../_test/service.mock";
import * as sinon from "sinon";
import 'angular-mocks';

describe("Unit:UserCtrl", () => {
	// var User;
	var $ctrl;
	var $controller
	var User;
	var $rootScope, $q, $window;

	beforeEach(angular.mock.inject((_$window_,_$q_, _$rootScope_, $compile: ng.ICompileService, $controller:ng.IControllerService) => {
		$rootScope = _$rootScope_;
		$q = _$q_;
		$window = _$window_;
		$ctrl = $controller(UserCtrl, {
			User: UserMock(),
			$window: $window
		})
		
	}));

	describe("actions",()=>{
		it("should get user status when backend success resolve",()=>{
			let UserSpy = sinon.stub($ctrl.User, "getUserStatus");
			UserSpy.returns($q.when({"man":"online"}));
			$ctrl.userStatus();
			$rootScope.$digest();
			expect(angular.toJson($ctrl.userStatusList)).toBe(angular.toJson({ "man": "online" }));
		});

		it("should not get user status when backend returns error", () => {
			let UserSpy = sinon.stub($ctrl.User, "getUserStatus");
			let alertSpy = sinon.spy($window, "alert");
			UserSpy.returns($q.reject());
			$ctrl.userStatus();
			$rootScope.$digest();
			expect(alertSpy.called).toBe(true);
		});
	})

});