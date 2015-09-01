import $ from 'jquery';

var homeFilter = function(e){
  e.preventDefault();
  let whichFilter = $(this).data('filter');
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  $('#work-list li').filter(whichFilter).show();
  $('#work-list li').not(whichFilter).hide();
}

export default homeFilter;
