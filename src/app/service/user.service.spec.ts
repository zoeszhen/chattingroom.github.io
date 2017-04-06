import { User } from "./user.service";
import * as angular from 'angular';
import * as sinon from "sinon";
import 'angular-mocks';

describe("Service:UserService", () => {
	//vars 
	var $service;
	var $controller
	var $rootScope, $q, $httpBackend;

	beforeEach(angular.mock.inject((_$http_, _$q_, _$rootScope_, $controller, _$httpBackend_) => {
		$rootScope = _$rootScope_;
		$q = _$q_;
		$httpBackend = _$httpBackend_;
		$service = $controller(User, {
			$http: _$http_
		})
	}));

	describe("actions", () => {
		it("should get user status with correct endpoint",()=>{
			// prepare
			let result;
			function runRequest() {
				$service
					.getUserStatus()
					.then((data) => {
						result = data;
					});
				$httpBackend.flush();
				$rootScope.$digest();
			}

			let responseData = [{"test":"online"}];

			$httpBackend
				.expectGET('http://127.0.0.1:8888/users')
				.respond(200, responseData);

			// run
			runRequest();

			// test
			expect(angular.toJson(result)).toBe(angular.toJson(responseData));
		});

		it("should get user status with correct endpoint", () => {
			// prepare
			let result;
			function runRequest() {
				$service
					.getChatHistory()
					.then((data) => {
						result = data;
					});
				$httpBackend.flush();
				$rootScope.$digest();
			}

			let responseData = [{ "test": "online","msg": "hello world","timestamp":"023309090"}];

			$httpBackend
				.expectGET('http://127.0.0.1:8888/history')
				.respond(200, responseData);

			// run
			runRequest();

			// test
			expect(angular.toJson(result)).toBe(angular.toJson(responseData));
		});
	})
})
