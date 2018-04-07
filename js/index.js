var my_global_currenttab; 
var my_global_lasttab; 
var my_registryid;
var my_global_version;
var my_global_sqliteDB;
$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
});
    
//Mais eventos em: http://cordova.apache.org/docs/en/6.x/cordova/events/events.html
function onDeviceReady() {    
	//create the sqlite database and create table with empty datas
	//open database and create table
	my_global_sqliteDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
	//create table
	my_global_sqliteDB.transaction(function(transaction) {
		transaction.executeSql('CREATE TABLE IF NOT EXISTS localstorage (id integer primary key, recadosAlunos text, sacDados text, homeWorkDados text)', [],
		function(tx, result) {
			console.log("Table created successfully");
			//initialize database
			// var initialQuery = "DELETE FROM localstorage";
			// transaction.executeSql(initialQuery, []
			// , function(tx, result) {
			// 	console.log('table deleted initialized');
			// },
			// function(error){
			// 	console.log('Error occurred');
			// });
			transaction.executeSql('SELECT * FROM localstorage', [], function (tx, results) {
				
					var length = results.rows.length;
					if(length == 0){
						var rA = localStorage.getItem('recadosAlunos');
						var sD = localStorage.getItem('sacDados');
						var hd = localStorage.getItem('homeWorkDados');
	
						var executeQuery = "INSERT INTO localstorage (recadosAlunos, sacDados , homeWorkDados) VALUES (?,?,?)";
						transaction.executeSql(executeQuery, [rA,sD,hd]
						, function(tx, result) {
							console.log('table initialized');
						},
						function(error){
							console.log('Error occurred');
						});
					}
				
			}, null);
			
		},
		function(error) {
			console.log("Error occurred while creating the table.");
		});
	});
	
		try
		{
			document.addEventListener("backbutton", onBackKeyDown, false);
			document.addEventListener("resume", onResume, false);    
			my_global_version = "1.0.6";
			my_global_currenttab = 1;
			console.log(device.cordova);

			console.log(navigator.notification);

			localStorage.setItem('platform_name', device.platform);    

				
			//Notification	
			var app = this;	
			app.push = PushNotification.init({
				"android": {			 
					"senderID": SENDER_ID			              
					,"icon": "icon_android_push"
					,"iconColor": "#ff6600"			 
				},
				"ios": {
				"sound": true,
				"vibration": true,
				"badge": true,
				"clearBadge": true
				},
				"windows": {}
			});


			app.push.on('registration', function(data) {

		//alert ('on registration' + data.registrationId);
		//		var oldRegId = localStorage.getItem('registrationId');

				my_registryid = data.registrationId;

		//alert ('on registration my_registryid : ' + my_registryid);

				SaveRegistrationId(data.registrationId);


		/*		if (oldRegId !== data.registrationId) {
					// Save new registration ID
					localStorage.setItem('registrationId', data.registrationId);		

				}	
		*/
				//angular.element($('#mvc')).scope().Aluno.registerIdView = data.registrationId;
				
			
				});

			app.push.on('error', function(e) {
				console.log("push error = " + e.message);
		//		alert("push error = " + e.message);
			});
			
			app.push.on('notification', function(data) {		
				app.push.finish(function() {			 

					angular.element($('#mvc')).scope().Aluno.controllerAlunoResume();
					//Force to show data
					console.log('notification-app-push-success');
				}, function() {
					console.log('notification-app-push-error');
				});
			});

			//angular.element($('#mvc')).scope().Aluno.platformView = device.platform;    

		
			//End - Notification
		}
		catch(err) {

		}
	}

	function SaveRegistrationId(strRegistrationId){    
		try
		{
			angular.element($('#mvc')).scope().Aluno.sendRegistrationId(strRegistrationId);
		}
		catch(err) {

		}
	}

function onResume(){   
	//alert ('on resume '); 
 
    //Se já estiver logado, força o reload dos recados
	try 
	{
		if(localStorage.getItem('modulos') != null && localStorage.getItem('modulos') != ''){   
			angular.element($('#mvc')).scope().Aluno.controllerAlunoResume();
		}


		//var oldRegId = localStorage.getItem('registrationId');
	//		alert ('on resume old local storage ' + oldRegId);
		//if (oldRegId !== my_registryid || oldRegId == null) {
			if(my_registryid != null && my_registryid != ''){ 
			//	alert('vai gravar no on resume ' + my_registryid);
				SaveRegistrationId(my_registryid);
			}	
		//}
	}
	catch(err) {

	}
}

function onBackKeyDown() {
	
try {

	// se estiver no principal, minimiza
	if ( my_global_currenttab == 1 ) { 
		window.plugins.appMinimize.minimize();
	} 
	else
	{
		//se for uma modal, fecha a modal
		if ( my_global_currenttab >= 100) { 
			//angular.element($('#mvc')).scope().Aluno.closeModal();
			angular.element($('#mvc')).scope().backlist();
			angular.element($('#mvc')).scope().$apply();
    	}
    	else
    	{
    		//vai para o primeiro tab

    	}
    }
  }
  catch(err) {

}
    return false;
}
function debug(){
	// var $body = angular.element(document.body);   // 1
	// var $rootScope = $body.scope().$root;
	// $rootScope.tabindex = 4;
try{

	angular.element($('#mvc')).scope().backlist();
	angular.element($('#mvc')).scope().$apply();
}
catch(err) {

}

}
