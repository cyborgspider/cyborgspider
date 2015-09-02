import $ from 'jquery';
import loadHash from './loadHash';
import indicateCurrentPage from './indicateCurrentPage';
import hashChange from './hashChange';
import homeNav from './homeNav';
import homeFilter from './homeFilter';

$(()=> {
//Add blank attributes to all links with the class of "visit"
$('.visit').attr('target','_blank');

//Toggle the menu button (only appears on less than 768px)
$('.nav-btn').on('click', () => $('body').toggleClass('open'));

//Once the link is chosen on the dropdown, close it. Hmm, seems like a better way to manage this
$('.nav-links').on('click', 'a', () =>{
    $('body').removeClass('open');
    let page = $(this).data('page');
    indicateCurrentPage(page);
  });

//Go home on logo click
$('#logo').on('click', () => window.location = './');

//Home filtering
$('#filter-nav').on('click', 'a', homeFilter);
$('#work-list').on('click', 'li', homeNav);

});
