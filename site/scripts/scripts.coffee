#We don't use real pages, we use hidden articles. This checks the hash in the URL field and turns on the appropriate article
loadHash = ->
  hashLocation = window.location.hash.substr(1)
  if hashLocation is ''
    currentSection = $('#work-detail').find('article:first-child')
    currentSection.addClass('active')
  else
    currentSection = $('#work-detail').find('article[data-article='+hashLocation+']')
    currentSection.siblings().removeClass('active')
    currentSection.addClass('active')

#Current page indicator
indicateCurrentPage = (whichPage) ->
  $('.nav-links a').removeClass('active')
  $('.nav-links a[data-page='+whichPage+']').addClass('active')

#Handle navigation for homepage (we've ditched standard HTML and are using DHTML)
homeNav = (section) ->
  section = $(this).data 'article'
  window.location = 'work.html#'+section

#Homepage filtering
filterMe = (e) ->
  e.preventDefault()
  whichFilter = $(this).data 'filter'
  $(this).siblings().removeClass 'active'
  $(this).addClass 'active'
  $('#work-list li').filter(whichFilter).show()
  $('#work-list li').not(whichFilter).hide()

#Jump back to top of page and change URL per article read
hashChange = (section) ->
  window.location.hash = section
  window.scrollTo(0,0)

#Handle the left and right buttons on the work page
projectNavigator = (direction) ->
  currentSection = $('#work-detail').find('article.active')
  nextSection = currentSection.next()
  prevSection = currentSection.prev()
  nextHash = nextSection.data('article')
  prevHash = prevSection.data('article')
  currentSection.removeClass('active')

  if direction is 'next'
    #when you've reached the end of the line, go back to the beginning article
    if currentSection.next().length == 0
      nextSection = $('#work-detail').find('article:first-child')
      nextHash = nextSection.data('article')
      nextSection.addClass('active')
      hashChange(nextHash)
    else
      nextSection.addClass('active')
      hashChange(nextHash)

  if direction is 'prev'
    #when you're at the beginning of the line, and a user presses Previous, go backwards
    if currentSection.prev().length == 0
      prevSection = $('#work-detail').find('article:last-child')
      prevSection.addClass('active')
      prevHash = prevSection.data('article')
      hashChange(prevHash)
    #otherwise, go in Previous order as expected
    else
      prevSection.addClass('active')
      hashChange(prevHash)

$ ->

  #Make all VISIT Links external
  $('.visit').attr('target','_blank')

  #Toggle the menu button (only appears on less than 768px)
  $('.nav-btn').on 'click', ->
    $('body').toggleClass 'open'

  #Once the link is chosen on the dropdown, close it. Hmm, seems like a better way to manage this
  $('.nav-links').on 'click', 'a', ->
    $('body').removeClass 'open'
    page = $(@).data 'page'
    indicateCurrentPage(page)

  #Go home on logo click
  $('#logo').on 'click', ->
    window.location = './'

  $('#filter-nav').on 'click', 'a', filterMe

  $('#work-list').on 'click', 'li', homeNav

  $('#next-project').click (e) ->
    e.preventDefault()
    projectNavigator('next')

  $('#prev-project').click (e) ->
    e.preventDefault()
    projectNavigator('prev')

