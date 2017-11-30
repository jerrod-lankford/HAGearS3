// TODO Use some type of requireJs or custom stuff like settingsUI
// require ViewNetadata from /js/view/ViewMetadata.js 
$(function () {
	var viewCreator;
	
	$('#main-nav').on('click', '.nav-link', function(e) {
		var a = e.currentTarget;
		var view = a.dataset.id;
		
		if (viewCreator && view) {
			viewCreator.create(ViewMetadata[view]);
			tau.changePage('entities');
		}
		
	});
	
	HAServices.getEntities(function(data){
		viewCreator = new ViewCreator(data);
	});
	
    document.addEventListener('tizenhwkey', function onTizenhwkey(e) {
        if (e.keyName === 'back') {
            if (document.getElementsByClassName('ui-page-active')[0]
                    .id === 'main' && !tau.activePage
                    .querySelector('.ui-popup-active')) {
            	tizen.application.getCurrentApplication().exit();
            } else {
                history.back();
            }
        }
    });
});