export class User{
	public url = "http://127.0.0.1:8888"

	//@ngInject
	constructor(private $http) {
	}
	//get userStatus from backend
	public getUserStatus():any {
		return this.$http.get(this.url+"/users")
			.then((response) => {
				return response.data;
			});
	}

	//get history from backend
	public getChatHistory():any {
		return this.$http.get(this.url+"/history")
			.then((response) => {
				return response.data;
			});
	}
}