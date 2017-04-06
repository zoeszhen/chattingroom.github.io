import * as angular from 'angular';

const _promise = {
	response: undefined,
	then: function(successCallback, errorCallback) {
		if (angular.isFunction(successCallback)) {
			successCallback(this.response);
		}
		return _promise;
	},
	"catch": function(catchCallback) {
		catchCallback();
		return _promise;
	},
	"finally": function(finalCallback) {
		finalCallback();
		return _promise;
	}
};

export function UserMock() {
	return {
				getUserStatus: function() {
					return angular.copy(_promise);
				},
				getChatHistory: function() {
					return angular.copy(_promise);
				}
			}
}
