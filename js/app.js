//marcos pereda

function mostrarSpinner()
{
try {
	SpinnerDialog.show();

}
catch(err)
{

}
}


function esconderSpinner()
{
	
	try {
	SpinnerDialog.hide();
}
catch(err) 
{

}
}


function myAlert(msg, callback,tittle,buttonText ) {
	//não funciona quando rodamos direto no browser, por isso o try catch
	//implements mobile alert box ( somente 1 botão)
	//plugin cordova-plugin-dialogs
	//https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/
	//method alert

//antes do alerta sempre esoncer o spinner, se tiver
esconderSpinner();

try {
	navigator.notification.alert(
    							msg,  // message
							    callback,         // funcao a ser chamada quando pressiona o ok
							    tittle,            // title
							    buttonText                  // buttonName
);


}
catch(err) {
    alert(msg);
}

}

function capitalize(input){
	return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
}

function getCodResponsavel(){
	if(localStorage.getItem('logins') != null && localStorage.getItem('logins') != ''){

		var xLogin = JSON.parse(localStorage.getItem('logins'));
    	for(x in xLogin){
    		if(xLogin[x]['tipo'] == 'responsavel'){
    			return xLogin[x]['cod_responsavel'];
    		}
    	}
    }
}


function getNomeResponsavel(){
	if(localStorage.getItem('logins') != null && localStorage.getItem('logins') != ''){

		var xLogin = JSON.parse(localStorage.getItem('logins'));
    	for(x in xLogin){
    		if(xLogin[x]['tipo'] == 'responsavel'){
    			return xLogin[x]['nome'];
    		}
    	}
    }
}


function getPerfilTipo(){
	if(localStorage.getItem('logins') != null && localStorage.getItem('logins') != ''){

		var xLogin = JSON.parse(localStorage.getItem('logins'));
    	for(x in xLogin){
    		if(xLogin[x]['tipo'] == 'responsavel'){
    			return xLogin[x]['tipo'];
    		}
    	}
    }
}


function removeAnotacaoSac(sacsLoop, cod_sac, cod_anotacao){
	var i = sacsLoop.length;
	while (i--) {
		if(sacsLoop[i].cod_sac == cod_sac){			
			var y = sacsLoop[i].anotacoes.length;
			while (y--) {
				if(sacsLoop[i].anotacoes[y].cod_anotacao == cod_anotacao){
					sacsLoop[i].anotacoes.splice(y, 1);
				}
			}
		}
	}
	return sacsLoop;
}


//isCPF? So...Cast CPF xD
function sanitizeLogin(login){					
	if(login == null){	
		return '';
	}

	var auxValidate = login.replace(/[^0-9]/g,'');
	if(auxValidate.length == 11){

		var returnLogin = '';				
		returnLogin += auxValidate.substr(0, 3) + '.';
		returnLogin += auxValidate.substr(3, 3) + '.';
		returnLogin += auxValidate.substr(6, 3) + '-';
		returnLogin += auxValidate.substr(9, 2);			
		
		return returnLogin;
	} 
	
	return login;
}

angular.module('inschool', ['ngAnimate', 'ngRoute', 'vesparny.fancyModal', 'Login', 'Aluno'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		// $locationProvider.html5Mode(true);
		
		/*
		$routeProvider
		.when('/', {
			 templateUrl: 'views/index.html'
		})
		.otherwise({redirectTo: '/'})
		;
		*/
	}])
	.filter('capitalize', function() {
	    return function(input){
	    	return capitalize(input);	
	    }
	})
	.filter('capitalizeFirstWord', function() {
	    return function(input) {	    	
	    	if(input != null){	    		
	    		var nomes = input.split(' ');
	    		if(nomes.length > 1){
	    			input = nomes[0];
	    			return capitalize(input);
	    		} else {
	    			return capitalize(input);
	    		}	    		
	    	}
	    	
	    }
	})
	.filter('castLoginTipo', function() {
	    return function(tipo){
	    	if(tipo == '')return '';

	    	var auxtipo = tipo.toLowerCase();
	    	switch(tipo){
	    		case 'responsavel':
	    			auxtipo = 'Responsável';
	    		break;
	    	}

	    	return capitalize(auxtipo);	
	    }
	})	
	.filter('trustHTML', function($sce) {
	    return function(input){	    		    	
	    	return $sce.trustAsHtml(input);
	    }
	})
	.filter('previewText', function() {
	    return function(text){
	    	//Strip Tags.
	    	//Movido para o WebService
	    	//text = text ? String(text).replace(/<[^>]+>/gm, '') : '';

	    	if(text.length == 0) return '';
	    	return capitalize(text.substring(0, 90)) + '...';
	    }
	})
	.filter('makeSureSite', function() {
	    return function(site_url){	    	
	    	if(site_url == '') return '';

	    	if(site_url.indexOf('http') !== -1){
				return site_url;
			}
			//Se não adiciona
			return 'http://' + site_url;
		}
	})

	.run(function($location){		
		//Run Just OneTime
		if(localStorage.getItem('modulos') != null && localStorage.getItem('modulos') != ''){
			$location.path('/aluno/logado');
			return false;
		}
	})

;



angular.module('Login', [])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
		$routeProvider
		.when('/', {
			 templateUrl: 'views/login/escola-choose.html'
			,controller: 'LoginController'			
			,controllerAs: 'Login'
		})
		.when('/logar/', {
			 templateUrl: 'views/login/logar.html'
			,controller: 'LoginController'			
			,controllerAs: 'Login'
		})
/*		.when('/sobre/', {			 
			 templateUrl: 'views/sobre.html'
			//,controller: 'SobreController'			
			//,controllerAs: 'Login'
		})
*/		.when('/logout/', {			 
			 template: ''
			,controller: 'LogoutController'			
		})
		.when('/logout_escola/', {			 
			 template: ''
			,controller: 'LogoutEscolaController'			
		})
		;
		//$httpProvider.interceptors.push('authInterceptor');

	}])
	.service('LoginService', LoginService)
	.controller('LoginController', ['LoginService', '$location', LoginController])
	.controller('LogoutController', ['LoginService', '$location', LogoutController])
	.controller('LogoutEscolaController', ['LoginService', '$location', LogoutEscolaController])
;

angular.module('Aluno', [])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
		$routeProvider
		.when('/aluno/logado', {			 
			 templateUrl: 'views/aluno/logado.html'
			,controller: 'AlunoController'			
			,controllerAs: 'Aluno'
		})
		.when('/detalhesRecado/:param1',{
			templateUrl: 'views/modulos/recado/detailRecado.html'
			,controller: 'detalhesRecadoController'
			,controllerAs: 'detalhesRecadoController'
		})
		.when('/detalhesSac/:param1',{
			templateUrl: 'views/modulos/sac/detailSac.html'
			,controller: 'detalhesSacController'
			,controllerAs: 'detalhesSacController'
		})
		.when('/detalhesHw/:param1',{
			templateUrl: 'views/modulos/trabalhos/detailHomeWork.html'
			,controller: 'detalhesHwController'
			,controllerAs: 'detalhesHwController'
		})
		.when('/novoSac/:param1',{
			templateUrl: 'views/modulos/sac/newSac.html'
			,controller: 'novoSacController'
			,controllerAs: 'novoSacController'
		})
		;

		//$httpProvider.interceptors.push('authInterceptor');

	}])
	.service('AlunoService', AlunoService)
	.service('SacService', SacService)
	.service('HomeWkService', HomeWkService)	
	.controller('AlunoController', ['AlunoService', 'SacService', 'HomeWkService', '$location', '$fancyModal','$rootScope', AlunoController])	
	.controller('detalhesRecadoController', ['AlunoService', 'SacService', '$location','$rootScope','$scope','$routeParams', detalhesRecadoController])	
	.controller('detalhesSacController', ['AlunoService', 'SacService', '$location','$rootScope','$scope','$routeParams', detalhesSacController])
	.controller('novoSacController', ['AlunoService', 'SacService', '$location','$rootScope','$scope','$routeParams', novoSacController])
	.controller('detalhesHwController', ['$location','$rootScope','$scope','$routeParams', detalhesHwController])
	//.factory('authInterceptor',  authInterceptor)	
;



function authInterceptor($q, $location){	
	///console.log('Intercept On!');

   return {
        request: function(config) {

            config.headers = config.headers || {};

            //config.headers.Authorization = 'TOKEN_GO_HERE';

            if (localStorage.getItem('logins')) {
            	var xLogin = JSON.parse(localStorage.getItem('logins'));
            	//console.log('xLogin', xLogin);

            	for(x in xLogin){
            		if(xLogin[x]['tipo'] == 'responsavel'){
            			//console.log(xLogin[x]);
            			config.headers.Authorization = xLogin[x]['cli'] + ':' + xLogin[x]['cod_responsavel'] + ':' + xLogin[x]['tipo'] + ':' + xLogin[x]['token'];
            		}
            	}
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
                //  Redirect user to login page / signup Page.
                $location.path('/');
            }
            return response || $q.when(response);
        }
    };	
}



function LogoutController(LoginService, $location){
//remover somente os dados de login do responsavel
//manter os dados de conexao da escola
//id 
//	localStorage.removeItem('cli');
//	localStorage.removeItem('url_escola');
	localStorage.removeItem('logins');
	localStorage.removeItem('modulos');
	localStorage.removeItem('dados_escolas');
	localStorage.removeItem('alunosResponsavel');
	localStorage.removeItem('recadosAlunos');

$location.path('/logar');

//	$location.path('/');
}

function LogoutEscolaController(LoginService, $location){
//remover somente os dados de login do responsavel
//manter os dados de conexao da escola
//id 
	localStorage.removeItem('cli');
	localStorage.removeItem('url_escola');
/*	localStorage.removeItem('logins');
	localStorage.removeItem('modulos');
	localStorage.removeItem('dados_escolas');
	localStorage.removeItem('alunosResponsavel');
	localStorage.removeItem('recadosAlunos');
*/
//$location.path('/logar');

$location.path('/');

}

function LoginController(LoginService, $location){
	var vm = this;	

	//vm.inDev = true;
	vm.inDev = globalInDev;

	vm.inFree = globalInFree;

	vm.doTestLogin = doTestLogin;
	
	function doTestLogin(){		


		var user = {
			 login: "322.692.688-81"
			,senha: "3226"
			,test: true
		};
		vm.doLogin(user);
	}

	vm.doFreeLogin = doFreeLogin;
	function doFreeLogin(){		

		var user = {
			 login: "1111"
			,senha: "1111"
			,test: true
		};
		vm.doLogin(user);
	}
	
	if(localStorage.getItem('url_escola') != null){
		vm.url_escola = localStorage.getItem('url_escola');
	} else {
		vm.url_escola = '';
	}

	vm.getEscola = getEscola;
	function getEscola(cod_escola){

		if(cod_escola == null){		
			esconderSpinner();	
			return false;
		}

		LoginService.getEscola(cod_escola)
			
		.success(function(json){

			if(!json.status){
				myAlert( 'Escola não encontrada','','','OK' );
				return false;
			}

			//Armazena arrays de clientes
			localStorage.setItem('cli', JSON.stringify(json.data.clis));
			localStorage.setItem('url_escola', json.data.url_escola);

			//Redireciona para a pagina
			esconderSpinner();	
			$location.path('/logar');
			
		})
		.error(function(err){
				myAlert( 'Problemas com a conexão, por favor tente novamente','','','OK' );

				function t() {}
			console.log('Erro: ', err);
		});
	}

	
	//Mock-Escola-cod
	vm.getEscolaTest = getEscolaTest;
	function getEscolaTest(){
		//doce infancia teste
		var cod_escola = {cod_escola : '1000'};
		getEscola(cod_escola);
	}

	vm.getEscolaFree = getEscolaFree;
	function getEscolaFree(){
		//sisalufree to use with freelancer
		var cod_escola = {cod_escola : '9999'};
		getEscola(cod_escola);
	}
	

	if(localStorage.getItem('cli') == null || localStorage.getItem('cli') == ''){
		$location.path('/');
		return false;
	}

	vm.doLogin = doLogin;
	function doLogin(user){
		console.log(user);
		user.login = sanitizeLogin(user.login);
		console.log('after Sanitize', user);

		//Se não tem o cli, redireciona pro login.
		if(localStorage.getItem('cli') == null || localStorage.getItem('cli') == ''){
			$location.path('/logar');
			esconderSpinner();
			return false;
		}
		
		user.cli = JSON.parse(localStorage.getItem('cli'));

		LoginService.doLogin(user)
		.success(function(json){
			//console.log(json);
			
			if(!json.status){
				
				myAlert( 'Login incorreto','','','OK' );
				return false;
			}

						
			//Refaz os cli, de acordo com os alunos ativos
			localStorage.setItem('cli', JSON.stringify(json.clis));

			localStorage.setItem('logins', JSON.stringify(json.logins));
			localStorage.setItem('modulos', JSON.stringify(json.modulos));
			localStorage.setItem('dados_escolas', JSON.stringify(json.dados_escolas));

			//Registra o cel
			//LoginService.registerDevice(user);
			//alert ('login ' + my_registryid);
			//sendRegistrationId(my_registryid);
			//Redireciona para a pagina
			$location.path('/aluno/logado');
			esconderSpinner();
		})
		.error(function(err){
			myAlert( 'Problemas com a conexão, por favor tente novamente','','','OK' );

		});
	}

}

function detalhesSacController(AlunoService, SacService, $location,$rootScope,$scope,$routeParams){
	$scope.title = $routeParams.param1;
	$scope.backlist = backlist;
	function backlist(){
		my_global_currenttab = 1;
		$rootScope.tabindex = 4;
		$location.path('/aluno/logado');
	}
	$rootScope.tabindex = 4;
}
function detalhesHwController($location,$rootScope,$scope,$routeParams){
	$scope.title = $routeParams.param1;
	$scope.backlist = backlist;
	function backlist(){
		my_global_currenttab = 1;
		$rootScope.tabindex = 5;
		$location.path('/aluno/logado');
	}
	$rootScope.tabindex = 5;
}
function detalhesRecadoController(AlunoService, SacService, $location,$rootScope,$scope,$routeParams){
	$scope.title = $routeParams.param1;
	$scope.backlist = backlist;
	function backlist(){
		my_global_currenttab = 1;
		$location.path('/aluno/logado');
	}
	$rootScope.tabindex = 1;
}

function novoSacController(AlunoService, SacService, $location,$rootScope,$scope,$routeParams){
	$scope.title = $routeParams.param1;
	$scope.backlist = backlist;
	function backlist(){
		my_global_currenttab = 1;
		$location.path('/aluno/logado');
	}
	$rootScope.tabindex = 4;
}
function AlunoController(AlunoService, SacService, HomeWkService, $location, $fancyModal, $rootScope){
	var vm = this;
	vm.url_escola = localStorage.getItem('url_escola');
	vm.logins = JSON.parse(localStorage.getItem('logins'));
	console.log('tabindex => ' + $rootScope.tabindex);
	if(!$rootScope.tabindex)
	$rootScope.tabindex = 1;
	else{
		vm.tabindex = $rootScope.tabindex;
	}
	vm.isResponsavel = function(){		
		for(x in vm.logins){
			if(vm.logins[x]['tipo'] == 'responsavel'){				
				return true;
			}
		}		
		return false;
	};

	
	vm.alunosResponsavel = {};

	//Prepara dados do Request....
	var auxRequestAlunos = [];
	//console.log(vm.logins);
	for(x in vm.logins){
		//console.log(vm.logins[x]);
		if(vm.logins[x].tipo != null && vm.logins[x].tipo == 'responsavel'){
			//auxRequestAlunos[vm.logins.cli] = 
			auxRequestAlunos.push({
				 'cli' 			  : vm.logins[x].cli
				,'cod_responsavel': vm.logins[x].cod_responsavel
			});
		}
	}

	AlunoService.getAlunosResponsavel(auxRequestAlunos)
		.then(function successCallback(response) {
			var json = response.data;
			localStorage.setItem('alunosResponsavel', JSON.stringify(json));			
			vm.alunosResponsavel = json;			 
			getAllRecados();
		
		}, function errorCallback(response) {
			if(localStorage.getItem('alunosResponsavel') != null){
				vm.alunosResponsavel = JSON.parse(localStorage.getItem('alunosResponsavel'));
				getAllRecados();
			}
		
		})
	;
	
	vm.modulos = {};
	vm.modulos = JSON.parse(localStorage.getItem('modulos'));
	
	if(localStorage.getItem('modulos') == null || localStorage.getItem('modulos') == ''){
		$location.path('/logar');
		return false;
	}

	//window.isLogado = true;

	vm.dados_escolas = {};
	vm.dados_escolas = JSON.parse(localStorage.getItem('dados_escolas'));
	var auxCli = JSON.parse(localStorage.getItem('cli'));
	var cliAtual = auxCli[0];

	vm.registerIdView = localStorage.getItem('registrationId');		
	
	/*if(localStorage.getItem('registrationId') != null){

		
		
		var registerParams = {
			 cli : cliAtual
			,registrationId: localStorage.getItem('registrationId')
			,cod_responsavel: getCodResponsavel()
		};

		AlunoService.registerDeviceServer(registerParams)
			.then(function successCallback(response){
	



			}
			,function errorCallback(err) {
			});

	}
*/

    if(localStorage.getItem('platform_name') != null){
        vm.platformView = localStorage.getItem('platform_name');        

        var registerParams = {
             cli : cliAtual
            ,cod_responsavel: getCodResponsavel()
            ,plataforma: localStorage.getItem('platform_name')
        };

        AlunoService.userDeviceDetail(registerParams)
            .then(function successCallback(response){
            }
            ,function errorCallback(err) {
            });
    }


	vm.setTab = function($event,newTab){
      vm.tab = newTab;

	  $event.stopPropagation();
    };
	vm.isSet = function(tabNum){
      return vm.tab === tabNum;
    };
    




	function getAllRecados(){
		auxRequestRecados = [];	
		
		console.log('dados->', vm.alunosResponsavel);
		for(x in vm.alunosResponsavel){
			auxRequestRecados.push({
				 rm  : vm.alunosResponsavel[x]['rm']
				,cli : vm.alunosResponsavel[x]['cli']
				,cod_responsavel : getCodResponsavel()
				//,perfil : getCodResponsavel()
			});
		}
		vm.notificacoes = {};
		AlunoService.allRecados(auxRequestRecados)
			.then(function successCallback(response) {
				esconderSpinner();
				var json = response.data;

				localStorage.setItem('recadosAlunos', JSON.stringify(json));

				vm.notificacoes = json;
				vm.qtdNotificacoes = vm.notificacoes.length;				
			
			}, function errorCallback(response) {
				esconderSpinner();
				if(localStorage.getItem('recadosAlunos') != null){
					vm.notificacoes = JSON.parse(localStorage.getItem('recadosAlunos'));
					vm.recados = vm.notificacoes.length;					
				}
			
			})
		;

		vm.sacDados = {};

		SacService.getSacDados({
			 aberto_perfil  : 'responsavel'
			,cli 			: vm.alunosResponsavel[x]['cli']
			,aberto_por  	: getCodResponsavel()
		}).then(function successCallback(response) {

			//'data' é utilizado no datatables do site tmb xD
			var json = response.data.dados;	
			//console.log('sac Dados ->',  json);

			localStorage.setItem('sacDados', JSON.stringify(json));

			vm.sacDados = json;
			vm.qtdSacs = vm.sacDados.length;
			//console.log(vm.qtdSacs);

		}, function errorCallback(response) {			
			
			if(localStorage.getItem('sacDados') != null){
				vm.sacDados = JSON.parse(localStorage.getItem('sacDados'));
				vm.qtdSacs = vm.sacDados.length;					
			}		
		});

		vm.homeworkDados = {};
		const last_hash ="";
		if(localStorage.getItem('last_hash')!= null){
			last_hash = localStorage.getItem('last_hash');
		}
		HomeWkService.allHomeWorks({
			cod_responsavel  : getCodResponsavel()
			,ano_letivo 			: '2018'
			,v  	: '1.0',
			last_hash: last_hash
		}).then(function successCallback(response) {
			console.log(response);
			var json = response.data.data;
			localStorage.setItem('homeWorkDados', JSON.stringify(json));
			localStorage.setItem('last_hash',response.data.metadata.last_hash);
			
			vm.homeworkDados = json;
			vm.qtdHomeworks = vm.homeworkDados.length;
		}, function errorCallback(response) {			
			if(localStorage.getItem('homeWorkDados') != null){
				vm.homeworkDados = JSON.parse(localStorage.getItem('homeWorkDados'));
				vm.qtdHomeworks = vm.homeworkDados.length;					
			}		
		});
		esconderSpinner();
	}

	
	vm.novoSac = {};
	vm.novoSac = novoSac;
	function novoSac(){		

		my_global_currenttab = 101;
		$location.path('/novoSac/SAC');
		$rootScope.enviarNovoSac = function(dados) {
			
			var formNovoSac = dados;


			formNovoSac.cli = JSON.parse(localStorage.getItem('cli'))[0];
			formNovoSac.cod_sac = '0';//Novo

			//Arrumar isto
			formNovoSac.aberto_nome = getNomeResponsavel();//Novo x
			formNovoSac.aberto_perfil = getPerfilTipo();//Novo
			formNovoSac.aberto_por = getCodResponsavel();//Novo


			if(formNovoSac.file_unico != null){
				formNovoSac.arquivos = [];
				formNovoSac.arquivos.push(formNovoSac.file_unico);
			}


			
			SacService.saveNovoSac(formNovoSac).then(function successCallback(response) {
				var json = response.data;

				
				SacService.getSacByCodSac({
						cli          : formNovoSac.cli
					,cod_sac      : json.cod_sac
					//,cod_anotacao : json.cod_anotacao
				}).then(function successCallback(response) {
					var sacAux = response.data.dados[0];
					//console.log(sacAux);
					vm.sacDados.unshift(sacAux);
					localStorage.setItem('sacDados', JSON.stringify(vm.sacDados));
					$location.path('/aluno/logado');

					// $fancyModal.close();
				}, function errorCallback(response) {	

				
				});							
				
			}, function errorCallback(response) {
				
			});					
		};				

		var cliSac = JSON.parse(localStorage.getItem('cli'));
		SacService.getSacFilas(cliSac).then(function successCallback(response) {						
				//console.log(response.data.dados);
				$rootScope.sacFilas = response.data.dados;
			}, function errorCallback(response) {			
			
			})
		;

		var auxDoAux = {
				cli: JSON.parse(localStorage.getItem('cli'))[0]
			,cod_responsavel : getCodResponsavel()
		};

		SacService.getAlunosDoResponsavel(auxDoAux).then(function successCallback(response) {						
				$rootScope.sacFilhos = response.data;
			}, function errorCallback(response) {						
			
			})
		;	

		SacService.getSacCategorias(cliSac).then(function successCallback(response) {						
				//console.log(response.data.dados);
				$rootScope.sacCategorias = response.data.dados;
			}, function errorCallback(response) {			
			
			})
		;
		

		// $fancyModal.open({ 
		// 	 templateUrl: 'views/modulos/sac/newSac.html'
		// 	,controller: ['$scope', 'SacService', function($scope, SacService) {				

		// 		$scope.enviarNovoSac = function(dados) {

		// 			var formNovoSac = dados;


		// 			formNovoSac.cli = JSON.parse(localStorage.getItem('cli'))[0];
		// 			formNovoSac.cod_sac = '0';//Novo

		// 			//Arrumar isto
		// 			formNovoSac.aberto_nome = getNomeResponsavel();//Novo x
		// 			formNovoSac.aberto_perfil = getPerfilTipo();//Novo
		// 			formNovoSac.aberto_por = getCodResponsavel();//Novo


		// 			if(formNovoSac.file_unico != null){
		// 				formNovoSac.arquivos = [];
		// 				formNovoSac.arquivos.push(formNovoSac.file_unico);
		// 			}


					
		// 			SacService.saveNovoSac(formNovoSac).then(function successCallback(response) {
		// 				var json = response.data;

						
		// 				SacService.getSacByCodSac({
		// 					 cli          : formNovoSac.cli
		// 					,cod_sac      : json.cod_sac
		// 					//,cod_anotacao : json.cod_anotacao
		// 				}).then(function successCallback(response) {
		// 					var sacAux = response.data.dados[0];
		// 					//console.log(sacAux);
		// 					vm.sacDados.unshift(sacAux);
		// 					localStorage.setItem('sacDados', JSON.stringify(vm.sacDados));


		// 					$fancyModal.close();
		// 				}, function errorCallback(response) {	

						
		// 				});							
						
		// 			}, function errorCallback(response) {
						
		// 			});					
		// 		};				

		// 		var cliSac = JSON.parse(localStorage.getItem('cli'));
		// 		SacService.getSacFilas(cliSac).then(function successCallback(response) {						
		// 				//console.log(response.data.dados);
		// 				$scope.sacFilas = response.data.dados;
		// 			}, function errorCallback(response) {			
					
		// 			})
		// 		;

		// 		var auxDoAux = {
		// 			 cli: JSON.parse(localStorage.getItem('cli'))[0]
		// 			,cod_responsavel : getCodResponsavel()
		// 		};

		// 		SacService.getAlunosDoResponsavel(auxDoAux).then(function successCallback(response) {						
		// 				$scope.sacFilhos = response.data;
		// 			}, function errorCallback(response) {						
					
		// 			})
		// 		;	

		// 		SacService.getSacCategorias(cliSac).then(function successCallback(response) {						
		// 				//console.log(response.data.dados);
		// 				$scope.sacCategorias = response.data.dados;
		// 			}, function errorCallback(response) {			
					
		// 			})
		// 		;
		// 	}]			
		// });
	};

	vm.recadoSelecionado = {};
	vm.detalhesRecado = detalhesRecado;
	function detalhesRecado(recado){

		my_global_currenttab = 101;

		if(recado.lido_status != 1){
			AlunoService.confirmarRecado({
				 cod_alerta : recado.cod_alerta
				,valor 		: recado.valor
				,cli 		: recado.cli
				,tipo_op	: 'lido'  //Ou checado
			})
			.then(function successCallback(response) {		

				var json = response.data;
				//console.log('success', response);			
				//console.log(vm.notificacoes);
				for(x in vm.notificacoes){
					if(vm.notificacoes[x]['cod_recado'] == recado.cod_recado){						
						vm.notificacoes[x]['lido_status'] = 1;
						//vm.notificacoes[x]['lido_em'] = json.time_stamp;
					}
				}

			}, function errorCallback(response) {
				console.log('response', response);
			});
		}

		//console.log(recado);

		vm.recadoSelecionado = recado;
		$rootScope.recadoSelecionado = recado;
		$rootScope.recado = recado;
		$location.path('/detalhesRecado/' + 'Recados');
		// $fancyModal.open({
		// 	 templateUrl: 'views/modulos/recado/detailRecado.html' 			
	    //     ,controller: ['$scope', function($scope) {
	    //     	$scope.recado = recado;
	    //     	$scope.confirmarRecado = function(){
	    //     		AlunoService.confirmarRecado({
		// 				 cod_alerta : recado.cod_alerta
		// 				,valor 		: recado.valor
		// 				,cli 		: recado.cli
		// 				,tipo_op	: 'checado'  //Ou lido
		// 			})
		// 			.then(function successCallback(response) {								
		// 				var json = response.data;

		// 				for(x in vm.notificacoes){
		// 					if(vm.notificacoes[x]['cod_recado'] == recado.cod_recado){
		// 						vm.notificacoes[x]['checado_status'] = 1;
		// 						vm.notificacoes[x]['checado_em'] = json.time_stamp;
		// 					}
		// 				}

		// 			}, function errorCallback(response) {
		// 				console.log('response', response);
		// 			});
		// 		}
				
		// 	}]			
		// });
		$rootScope.confirmarRecado = function(){
			AlunoService.confirmarRecado({
					cod_alerta : recado.cod_alerta
				,valor 		: recado.valor
				,cli 		: recado.cli
				,tipo_op	: 'checado'  //Ou lido
			})
			.then(function successCallback(response) {								
				var json = response.data;
	
				for(x in vm.notificacoes){
					if(vm.notificacoes[x]['cod_recado'] == recado.cod_recado){
						vm.notificacoes[x]['checado_status'] = 1;
						vm.notificacoes[x]['checado_em'] = json.time_stamp;
					}
				}
	
			}, function errorCallback(response) {
				console.log('response', response);
			});
		}
	};

	vm.sacSelecionado = {};
	vm.detalhesHw = detalhesHw;
	function detalhesHw(homework){
		my_global_currenttab = 101;
		$location.path('/detalhesHw/HOMEWORK');
		$rootScope.hw = homework;
	}

	vm.detalhesSac = detalhesSac;

	function detalhesSac(sac){

		my_global_currenttab = 101;

		vm.sacSelecionado = sac;
		//console.log(vm.sacSelecionado);
		$location.path('/detalhesSac/SAC');
		$rootScope.sac = sac;				
		$rootScope.encerrarSac = function(cod_sac){

			if(confirm('Deseja realmente encerrar o chamado?')){
				var auxRequest = {
					 cli : sac.cli						
					,cod_sac : cod_sac
					,fechado_perfil : 'responsavel'
					,fechado_por : getCodResponsavel()
					,isMeta 	:true
				};

				SacService.encerrarSac(auxRequest)
					.then(function successCallback(response) {
						var json = response.data;
						
						if(json.success){									

							for(i in vm.sacDados){
								if(vm.sacDados[i]['cod_sac'] == cod_sac) {		
									vm.sacDados[i]['status_nome'] = 'Fechado';						
									vm.sacDados.splice(i, 1);
								}
							}

							// $fancyModal.close();

						}
						
						
					}, function errorCallback(response) {
						//Nothing todo
						console.log('Errorresponse', response);
					})
				;					
			}
		};


		$rootScope.removerSacAnotacao = function(anotacao){
			//console.log(sac.cli);
			//console.log(anotacao);

			var auxRequest = {
				 cli : sac.cli
				,cod_anotacao : anotacao.cod_anotacao
				,cod_sac : anotacao.cod_sac //Ajuda na volta
				,excluido_perfil : 'responsavel'
				,excluido_por : getCodResponsavel()
				,isMeta 	:true
			};

			SacService.removerSacAnotacao(auxRequest)
				.then(function successCallback(response) {
					var myResponse = response.data;
					
					if(myResponse.success){

						//Remove a anotação do Model/View
						vm.sacDados = removeAnotacaoSac(vm.sacDados, myResponse.cod_sac, myResponse.cod_anotacao);

						//Persiste Local
						localStorage.setItem('sacDados', JSON.stringify(vm.sacDados));

					}
				}, function errorCallback(response) {
					//Nothing todo
					console.log('Errorresponse', response);
				})
			;					

		};
		$rootScope.adicionarNovaAnotacao = function(dados){
			console.log('Adicionando SAC');
			//console.log(dados);
			//console.log('scope.sac ->', $scope.sac.cod_sac);

			var formNovaAnotacao = {};
			formNovaAnotacao = dados;

			formNovaAnotacao.cli = JSON.parse(localStorage.getItem('cli'))[0];

			//cod_sac != 0, Add anotação
			formNovaAnotacao.cod_sac =  $rootScope.sac.cod_sac;

			formNovaAnotacao.aberto_nome = getNomeResponsavel();//Novo x
			formNovaAnotacao.aberto_perfil = getPerfilTipo();//Novo
			formNovaAnotacao.aberto_por = getCodResponsavel();//Novo

			if(formNovaAnotacao.file_unico != null){
				formNovaAnotacao.arquivos = [];
				formNovaAnotacao.arquivos.push(formNovaAnotacao.file_unico);
			}
			console.log(formNovaAnotacao);

			SacService.saveNovoSac(formNovaAnotacao).then(function successCallback(response) {
				var json = response.data;
				
				SacService.getSacByCodSac({
					 cli          : formNovaAnotacao.cli
					,cod_sac      : json.cod_sac
					//,cod_anotacao : json.cod_anotacao
				}).then(function successCallback(response) {
					
					var sacAux = response.data.dados[0];

					//Atualiza a VIEW do FancyBox
					$rootScope.sac = sacAux;

					//Atualiza a VM da memoria
					for(i in vm.sacDados){						
						if(vm.sacDados[i]['cod_sac'] == sacAux.cod_sac) {
							vm.sacDados[i] = sacAux;									
						}
					}
					//Salva no LocalStorage 
					localStorage.setItem('sacDados', JSON.stringify(vm.sacDados));

					//console.log($rootScope) ; //.dados.anotacao = '';
					//$rootScope.anotacao = '';
					dados.anotacao = '';
				}, function errorCallback(response) {	

				
				});							
				
			}, function errorCallback(response) {			
				
			});
							
		}		
		// $fancyModal.open({
		// 	 templateUrl: 'views/modulos/sac/detailSac.html'
		// 	,controller: ['$scope', function($scope) {				
		// 		$scope.sac = sac;				
		// 		$scope.encerrarSac = function(cod_sac){

		// 			if(confirm('Deseja realmente excluir?')){
		// 				var auxRequest = {
		// 					 cli : sac.cli						
		// 					,cod_sac : cod_sac
		// 					,fechado_perfil : 'responsavel'
		// 					,fechado_por : getCodResponsavel()
		// 					,isMeta 	:true
		// 				};

		// 				SacService.encerrarSac(auxRequest)
		// 					.then(function successCallback(response) {
		// 						var json = response.data;
								
		// 						if(json.success){									

		// 							for(i in vm.sacDados){
		// 								if(vm.sacDados[i]['cod_sac'] == cod_sac) {																				
		// 									vm.sacDados.splice(i, 1);
		// 								}
		// 							}

		// 							$fancyModal.close();

		// 						}
								
								
		// 					}, function errorCallback(response) {
		// 						//Nothing todo
		// 						console.log('Errorresponse', response);
		// 					})
		// 				;					
		// 			}
		// 		};


		// 		$scope.removerSacAnotacao = function(anotacao){
		// 			//console.log(sac.cli);
		// 			//console.log(anotacao);

		// 			var auxRequest = {
		// 				 cli : sac.cli
		// 				,cod_anotacao : anotacao.cod_anotacao
		// 				,cod_sac : anotacao.cod_sac //Ajuda na volta
		// 				,excluido_perfil : 'responsavel'
		// 				,excluido_por : getCodResponsavel()
		// 				,isMeta 	:true
		// 			};

		// 			SacService.removerSacAnotacao(auxRequest)
		// 				.then(function successCallback(response) {
		// 					var myResponse = response.data;
							
		// 					if(myResponse.success){

		// 						//Remove a anotação do Model/View
		// 						vm.sacDados = removeAnotacaoSac(vm.sacDados, myResponse.cod_sac, myResponse.cod_anotacao);

		// 						//Persiste Local
		// 						localStorage.setItem('sacDados', JSON.stringify(vm.sacDados));

		// 					}
		// 				}, function errorCallback(response) {
		// 					//Nothing todo
		// 					console.log('Errorresponse', response);
		// 				})
		// 			;					

		// 		};

		// 		$scope.adicionarNovaAnotacao = function(dados){
		// 			console.log('Adicionando SAC');
		// 			//console.log(dados);
		// 			//console.log('scope.sac ->', $scope.sac.cod_sac);

		// 			var formNovaAnotacao = {};
		// 			formNovaAnotacao = dados;

		// 			formNovaAnotacao.cli = JSON.parse(localStorage.getItem('cli'))[0];

		// 			//cod_sac != 0, Add anotação
		// 			formNovaAnotacao.cod_sac = $scope.sac.cod_sac;

		// 			formNovaAnotacao.aberto_nome = getNomeResponsavel();//Novo x
		// 			formNovaAnotacao.aberto_perfil = getPerfilTipo();//Novo
		// 			formNovaAnotacao.aberto_por = getCodResponsavel();//Novo

		// 			if(formNovaAnotacao.file_unico != null){
		// 				formNovaAnotacao.arquivos = [];
		// 				formNovaAnotacao.arquivos.push(formNovaAnotacao.file_unico);
		// 			}
		// 			console.log(formNovaAnotacao);

		// 			SacService.saveNovoSac(formNovaAnotacao).then(function successCallback(response) {
		// 				var json = response.data;
						
		// 				SacService.getSacByCodSac({
		// 					 cli          : formNovaAnotacao.cli
		// 					,cod_sac      : json.cod_sac
		// 					//,cod_anotacao : json.cod_anotacao
		// 				}).then(function successCallback(response) {
							
		// 					var sacAux = response.data.dados[0];

		// 					//Atualiza a VIEW do FancyBox
		// 					$scope.sac = sacAux;

		// 					//Atualiza a VM da memoria
		// 					for(i in vm.sacDados){						
		// 						if(vm.sacDados[i]['cod_sac'] == sacAux.cod_sac) {
		// 							vm.sacDados[i] = sacAux;									
		// 						}
		// 					}
		// 					//Salva no LocalStorage 
		// 					localStorage.setItem('sacDados', JSON.stringify(vm.sacDados));

		// 					$scope.dados.anotacao = '';
							
		// 				}, function errorCallback(response) {	

						
		// 				});							
						
		// 			}, function errorCallback(response) {			
						
		// 			});
									
		// 		}				
		// 	}]			
		// });
		
		
	};


	vm.sendRegistrationId = sendRegistrationId;

	function sendRegistrationId(strRegistrationId){

	//	localStorage.setItem('registrationId', strRegistrationId);


		
		if(strRegistrationId != null &  localStorage.getItem('cli') != null ){

			var auxCli = JSON.parse(localStorage.getItem('cli'));
			var cliAtual = auxCli[0];

			
			var registerParams = {
				 cli : cliAtual
				,registrationId: strRegistrationId
				,cod_responsavel: getCodResponsavel()
			};

			AlunoService.registerDeviceServer(registerParams)
				.then(function successCallback(response){
	
				localStorage.setItem('registrationId', registerParams.registrationId);		

	
				}
				,function errorCallback(err) {
				});

		}

	}



	//Função de apoio ao Cordova, executar ela sempre que tiver o evento onResume 
	vm.controllerAlunoResume = controllerAlunoResume;
	function controllerAlunoResume(){
		getAllRecados();		
	}



	//Função de apoio ao Cordova, Caso ocorra o botão 'BACK' no Android
	vm.closeModal = closeModal;
	function closeModal(){
		my_global_currenttab = 1;
		try {
		$fancyModal.close();
	}
	catch (err){ alert (err);}	
	}
}



function SacService($http){	

	this.encerrarSac = function(dados){		
		const url 		= base_url + 'sac_encerrar';		
		const method 	= 'POST';
		const request 	= {
			 url	 : url
			,method  : method
			,data  : dados
		};
		return $http(request);
	};
	
	this.getSacFilas = function(cli){		
		const url 		= base_url + 'sac_fila' + '/' + cli ;		
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method			
		};
		return $http(request);
	};


	this.removerSacAnotacao = function(dados){

		const url 		= base_url + 'sac_anotacao'
		const method 	= 'DELETE';
		const request 	= {
			 url	: url
			,method : method
			,data	: dados
			//,params: dados 
			,headers: {
		        'Content-type': 'application/json;charset=utf-8'
		    }
		};
		
		return $http(request);
	};


	this.getSacByCodSac = function(dados){

		//console.log(dados);
		const url 		= base_url + 'sac_por_perfil/'
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method
			,params : dados
		};

		return $http(request);
	};

	this.getSacCategorias = function(cli){		
		const url 		= base_url + 'sac_categoria' + '/' + cli ;		
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method			
		};
		return $http(request);
	};


	this.getAlunosDoResponsavel = function(dados){
		const url 		= base_url + 'alunos_do_responsavel' ;		
		const method 	= 'GET';
		const request 	= {
			 url	 : url
			,method  : method
			,params  : dados
		};
		return $http(request);
	};

	///sac_por_perfil
	///?dados=%7B"aberto_por":"18942","cli":"cabrini","aberto_perfil":"responsavel"%7D&isMeta=true
	this.getSacDados = function(dados){

		console.log(dados);
		const url 		= base_url + 'sac_por_perfil/'
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method
			,params : {
				 isMeta : true
				,dados : dados
			}
		};

		return $http(request);
	};


	this.saveNovoSac = function(dados){
		const url 		= base_url + 'sac' ;		
		const method 	= 'POST';
		const request 	= {
			 url	 : url
			,method  : method
			,data  : dados
		};
		return $http(request);
	};

}

function HomeWkService($http){

	///sac_por_perfil
	///?dados=%7B"aberto_por":"18942","cli":"cabrini","aberto_perfil":"responsavel"%7D&isMeta=true
	this.allHomeWorks = function(dados){
		//console.log(customHeaders);
		//dados.Authorization = customPost.Authorization;
		const cod_responsavel = dados.cod_responsavel;
		const ano_letivo = dados.ano_letivo;
		const v = dados.v;
		const last_hash = dados.last_hash;

		mostrarSpinner();
		const url 		= base_url + 'v2/free/licao-de-casa/licoes'
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method
			,params : {
				cod_responsavel : cod_responsavel,
				ano_letivo : ano_letivo,
				v: v
			}
		};

		return $http(request);

	};
}

function AlunoService($http){

	var customHeaders = {};
	var customPost = {};
	if (localStorage.getItem('logins')) {
    	var xLogin = JSON.parse(localStorage.getItem('logins'));

    	for(x in xLogin){
    		if(xLogin[x]['tipo'] == 'responsavel'){    			
    			customHeaders.Authorization = xLogin[x]['cli'] + ':' + xLogin[x]['cod_responsavel'] + ':' + xLogin[x]['tipo'] + ':' + xLogin[x]['token'];
    			customPost.Authorization = xLogin[x]['cli'] + ':' + xLogin[x]['cod_responsavel'] + ':' + xLogin[x]['tipo'] + ':' + xLogin[x]['token'];
    		}
    	}
    }	
	
	this.registerDeviceServer = function(data){
		const method 	= 'POST';
		const request 	= {
			 url	: base_url + 'register_device'
			,method : method
			,data	: data
		};
		return $http(request);
	};

    
    this.userDeviceDetail = function(data){
        const method     = 'POST';
        const request     = {
             url    : base_url + 'device_details'
            ,method : method
            ,data    : data
        };

        return $http(request);
    };


	this.add = function(user){
		const method 	= 'POST';
		const request 	= {
			 url	: base_url + 'aluno/'
			,method : method
			,data	: user
		};		
		return $http(request);
	};

	
	this.list = function(){
		const url 		= base_url + 'aluno/'; 
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method
		};
		return $http(request);
	};
	
	this.listBy = function(id){
		const url 		= base_url + 'aluno/' + id;
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method
		};
		
		return $http(request);
	};

	this.allRecados = function(dados){
		//console.log(customHeaders);
		//dados.Authorization = customPost.Authorization;
		mostrarSpinner();
		const url 		= base_url + 'all_recados'
		const method 	= 'POST';
		const request 	= {
			 url	: url
			,method : method
			,data	: dados
		};
		return $http(request);

	};


	this.confirmarRecado = function(dados){

		const url 		= base_url + 'confirmar_recado'
		const method 	= 'POST';
		const request 	= {
			 url	: url
			,method : method
			,data	: dados
		};
		
		return $http(request);
	};	

	this.getAlunosResponsavel = function(dados){
		//console.log('getAlunosResponsavel sent:', dados);
		const url 		= base_url + 'responsavel/alunos';		
		const method 	= 'POST';
		const request 	= {
			 url	: url
			,method : method
			,data	: dados
		};
		return $http(request);
	};
}

function LoginService($http){
 	//$http.defaults.headers.common['Authorization'] = 'TOKEZINN';
	this.testeHeader = function(){

		var data = {
			cod_escola : '8894'
		};

		//console.log(data);

		//const url 		= base_url + 'escola/';		
		//const url 		= 'http://localhost/header.php';
		//const url 		= 'https://inwork.com.br/header.php';
		const url 		= 'https://inschool.com.br/header.php';
		
		const method 	= 'POST';
		const request 	= {
			 url		: url
			,method 	: method
			,data		: data			
			/*
			,headers: {
				'Authorization' : 'TOKEZINNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
				,'Content-Type'  : 'application/json; charset=utf-8'
				,'Access-Control-Request-Headers'  : 'Content-Type'
			}
			*/
		};
		return $http(request);
	};

	this.getEscola = function(cod_escola){

		mostrarSpinner();

		const url 		= base_url + 'escola/';
		const method 	= 'POST';
		const request 	= {
			 url		: url
			,method 	: method
			,data		: cod_escola
		};
		return $http(request);

	};

	this.doLogin = function(user){
		mostrarSpinner();
		const url 		= base_url + 'logar/'
		const method 	= 'POST';
		const request 	= {
			 url	: url
			,method : method
			,data	: user
		};
		
		return $http(request);
	};
}