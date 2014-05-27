$ ->
  $('.visit').attr('target','_blank')

  filterMe = (e) ->
    e.preventDefault()
    whichFilter = $(this).data 'filter'
    $(this).siblings().removeClass 'active'
    $(this).addClass 'active'
    $('#work-list li').filter(whichFilter).show()
    $('#work-list li').not(whichFilter).hide()

  $('#filter-nav').on 'click', 'a', filterMe

  currentSection = $('#work-detail').find('article:first-child')
  currentSection.addClass('active')

  assignCurrentArticle = ->
    currentSection = $('#work-detail').find('article.active')

  $('#next-project').click (e) ->
    e.preventDefault()
    assignCurrentArticle()
    currentSection.removeClass('active')
    if currentSection.next().length == 0
      currentSection = $('#work-detail').find('article:first-child')
      currentSection.addClass('active')
    else
      currentSection.next().addClass('active')

  $('#prev-project').click (e) ->
    e.preventDefault()
    assignCurrentArticle()
    currentSection.removeClass('active')
    if currentSection.prev().length == 0
      currentSection = $('#work-detail').find('article:last-child')
      currentSection.addClass('active')
    else
      currentSection.prev().addClass('active')