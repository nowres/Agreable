console.log('INIT de: ' + Agreable_Module.name + ' vue: ' + Agreable_Module.view.name);

//var header = new Components.HeaderComponent('h1:first');

if (Agreable_Module.view.params) {
	var username = Agreable_Module.view.params.username,
		password = Agreable_Module.view.params.password;

	if(username === "admin" && password === "admin") {
		console.log('welcome');
		Agreable_Module.load('welcome');
	}
}