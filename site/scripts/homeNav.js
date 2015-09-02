import $ from 'jquery';

var homeNav = function(section){
  section = $(this).data('article');
  console.log(section);
  window.location = 'work.html#'+section;
}

export default homeNav;
