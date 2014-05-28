loadHash = ->
  hashLocation = window.location.hash.substr(1)
  if hashLocation is ''
    currentSection = $('#work-detail').find('article:first-child')
    currentSection.addClass('active')
  else
    currentSection = $('#work-detail').find('article[data-article='+hashLocation+']')
    currentSection.siblings().removeClass('active')
    currentSection.addClass('active')

$ ->
  loadHash()

  $('.visit').attr('target','_blank')

  filterMe = (e) ->
    e.preventDefault()
    whichFilter = $(this).data 'filter'
    $(this).siblings().removeClass 'active'
    $(this).addClass 'active'
    $('#work-list li').filter(whichFilter).show()
    $('#work-list li').not(whichFilter).hide()

  $('#filter-nav').on 'click', 'a', filterMe

  hashChange = (section) ->
    window.location.hash = section
    window.scrollTo(0,0)

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

  $('#next-project').click (e) ->
    e.preventDefault()
    projectNavigator('next')

  $('#prev-project').click (e) ->
    e.preventDefault()
    projectNavigator('prev')