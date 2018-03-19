$(document).ready(function() {

	var lastfontAw = '';
	

	// $(document).on('click', '#burger-menu-top', function(){
	// 	$('.tabs-principal li').removeClass('active');
	// });

	$(document).on('click', '.modulos_secundarios', function(){
		
		var modHref = $(this).attr('href');
		var fontAwClasses = $(this).find('i').attr('class');

		if(lastfontAw == fontAwClasses){
			//$('a[href="#recados"]').tab('show');
			$('ul#menu-modulos li').removeClass('active');
		}


		$('#modulo_secundario a').attr('href', modHref);
		$('#modulo_secundario a').removeClass().addClass(fontAwClasses);
		$('#modulo_secundario').addClass('active').show();

		//Fix a Bug
		if(lastfontAw == fontAwClasses){
			//Marcos - 17/01/2018 a linha abaixo estava comentada antes de dar problema no git, não sei se deve ficar comentada ou nao
			//$('a[href="'+ modHref +'"]').tab('show');

			//others
			$(".tab-pane").each(function(){
				$(this).removeClass('active');
				$(this).removeClass('in');
			});
			$(''+ modHref +'').addClass('active');
			$(''+ modHref +'').addClass('in');
		}

		lastfontAw = fontAwClasses;
	
	});
});