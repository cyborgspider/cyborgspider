$(function(){
  $('.visit').attr('target','_blank');

  function filterMe(){
    var whichFilter = $(this).data('filter');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('#work-list li').filter(whichFilter).show();
    $('#work-list li').not(whichFilter).hide();

  }

  $('#filter-nav').on('click', 'a', filterMe);


});