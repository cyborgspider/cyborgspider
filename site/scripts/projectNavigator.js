//Handle the left/right navigation on the page
import $ from 'jquery';
import hashChange from './hashChange';

var projectNavigator = function(direction){
  let currentSection = $('#work-detail').find('article.active'),
      nextSection = currentSection.next(),
      prevSection = currentSection.prev(),
      nextHash    = nextSection.data('article'),
      prevHash    = prevSection.data('article');

  if (direction === 'next'){
    if (!currentSection.next().length){
      nextSection = $('#work-detail').find('article:first-child');
      nextSection.addClass('active');
      hashChange(nextHash);
    } else {
      nextSection.addClass('active');
      hashChange(nextHash);
    }
  } else if (direction === 'prev') {
    if (!currentSection.prev().length){
      prevSection = $('#work-detail').find('article:last-child');
      prevSection.addClass('active');
      prevHash = prevSection.data('article');
      hashChange(prevHash);
    } else {
      prevSection.addClass('active');
      hashChange(prevHash)
    }
  }
}

export default projectNavigator;
