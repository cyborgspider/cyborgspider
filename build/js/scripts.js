var loadHash;

loadHash = function() {
  var currentSection, hashLocation;
  hashLocation = window.location.hash.substr(1);
  if (hashLocation === '') {
    currentSection = $('#work-detail').find('article:first-child');
    return currentSection.addClass('active');
  } else {
    currentSection = $('#work-detail').find('article[data-article=' + hashLocation + ']');
    currentSection.siblings().removeClass('active');
    return currentSection.addClass('active');
  }
};

$(function() {
  var filterMe, hashChange, projectNavigator;
  loadHash();
  $('.visit').attr('target', '_blank');
  $('.nav-btn').on('click', function() {
    return $('body').toggleClass('open');
  });
  filterMe = function(e) {
    var whichFilter;
    e.preventDefault();
    whichFilter = $(this).data('filter');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('#work-list li').filter(whichFilter).show();
    return $('#work-list li').not(whichFilter).hide();
  };
  $('#filter-nav').on('click', 'a', filterMe);
  hashChange = function(section) {
    window.location.hash = section;
    return window.scrollTo(0, 0);
  };
  projectNavigator = function(direction) {
    var currentSection, nextHash, nextSection, prevHash, prevSection;
    currentSection = $('#work-detail').find('article.active');
    nextSection = currentSection.next();
    prevSection = currentSection.prev();
    nextHash = nextSection.data('article');
    prevHash = prevSection.data('article');
    currentSection.removeClass('active');
    if (direction === 'next') {
      if (currentSection.next().length === 0) {
        nextSection = $('#work-detail').find('article:first-child');
        nextHash = nextSection.data('article');
        nextSection.addClass('active');
        hashChange(nextHash);
      } else {
        nextSection.addClass('active');
        hashChange(nextHash);
      }
    }
    if (direction === 'prev') {
      if (currentSection.prev().length === 0) {
        prevSection = $('#work-detail').find('article:last-child');
        prevSection.addClass('active');
        prevHash = prevSection.data('article');
        return hashChange(prevHash);
      } else {
        prevSection.addClass('active');
        return hashChange(prevHash);
      }
    }
  };
  $('#next-project').click(function(e) {
    e.preventDefault();
    return projectNavigator('next');
  });
  return $('#prev-project').click(function(e) {
    e.preventDefault();
    return projectNavigator('prev');
  });
});
