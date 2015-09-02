import $ from 'jquery';

import loadHash from './loadHash';
import indicateCurrentPage from './indicateCurrentPage';
import projectNavigator from './projectNavigator';

$(()=> {
  loadHash();
  indicateCurrentPage('work');

  //Project navigation
  $('#next-project').on('click', (e) => {
      e.preventDefault();
      projectNavigator('next');
    });

  $('#prev-project').on('click', (e) => {
      e.preventDefault();
      projectNavigator('prev');
    });
});
