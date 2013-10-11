(function() {
  $(function() {
    var filterMe;
    $('.visit').attr('target', '_blank');
    filterMe = function(e) {
      var whichFilter;
      e.preventDefault();
      whichFilter = $(this).data('filter');
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      $('#work-list li').filter(whichFilter).show();
      return $('#work-list li').not(whichFilter).hide();
    };
    return $('#filter-nav').on('click', 'a', filterMe);
  });

}).call(this);
