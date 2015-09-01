import $ from 'jquery';

//Current page/state indicator
var indicateCurrentPage = function(whichPage){
  $('.nav-links a').removeClass('active');
  $('.nav-links a[data-page='+whichPage+']').addClass('active')
}

export default indicateCurrentPage;
