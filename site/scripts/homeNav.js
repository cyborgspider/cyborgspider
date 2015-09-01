import $ from 'jquery';

var homeNav = function(section){
  section = $(this).data('article');
  window.location = 'work.html#'+section;
}

export default homeNav;
