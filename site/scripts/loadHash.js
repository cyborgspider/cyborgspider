import $ from 'jquery';

//We don't use real pages, we use hidden articles. This checks the hash in the URL field and turns on the appropriate article
var loadHash = function(){
  let hashLocation = window.location.hash.substr(1);
  let currentSection = '';
  if (!hashLocation){
    console.log(hashLocation === '');
    currentSection = $('#work-detail').find('article:first-child');
    currentSection.addClass('active');
  } else {
    currentSection = $('#work-detail').find('article[data-article="'+hashLocation+'"]');
    currentSection.siblings().removeClass('active');
    currentSection.addClass('active');
  }
}

export default loadHash;
