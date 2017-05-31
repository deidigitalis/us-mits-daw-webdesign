'use strict';

/*global $ app:true*/

/**
 * Index controller
 */
function indexController() {
  var controller = this;

  controller.title = 'Don Quijote';
  controller.backgroundImage = 'Quijote_Grandville';
  controller.noChapters = 10;

  /**
   * Set all the jquery selectors
   */
  var setSelectors = function () {
    controller.selectNotification = $('#selectNotification');
    controller.bookTitle = $('#bookTitle');
    controller.bookBody = $('#bookBody');
    controller.bookFrame = $('#bookFrame');
    controller.chapterHeader = $('#chapterHeader');
    controller.chapterTitle = $('#chapterTitle');
    controller.chapterNumber = $('#chapterNumber');
    controller.chapterList = $('#chapterList');
  };

  /**
   * Initializes the book title for reseting the page to an initial state
   */
  var initializeBookTitle = function () {
    controller.bookTitle
      .html(controller.title)
      .click({}, controller.resetContent);
  };

  /**
   * Initializes the main menu with the chapter entries
   */
  var initializeMenu = function () {
    for (var index = 0; index < controller.noChapters; index++) {
      var chapterNumber = index + 1;
      var chapterName = 'Cap&iacute;tulo ' + chapterNumber;

      var a = $('<a/>')
        .html(chapterName)
        .click({ number: chapterNumber, name: chapterName }, controller.onSelectChapter);

      var li = $('<li/>')
        .append(a);

      controller.chapterList.append(li);
    }
  };

  /**
   * Initializes the controller, this is 1st function to be called
   */
  controller.onInit = function () {
    setSelectors();
    initializeBookTitle();
    initializeMenu();
    controller.resetContent();
  };

  /**
   * Changes the elements of the DOM for reseting the page to an initial state
   */
  controller.resetContent = function () {
    controller.selectNotification.show();
    controller.chapterHeader.hide();
    controller.bookFrame.hide();
    controller.bookBody.empty();
  }

  /**
   * Event called when the user changes the chapter in the menu
   */
  controller.onSelectChapter = function (event) {
    var data = event.data;

    controller.resetContent();

    controller.chapterNumber.html(data.number);

    var book = app.book['quijote'];

    if (book) {
      var chapterFilter = book.filter(function (valuePair) {
        return valuePair.key === data.number;
      });

      if (chapterFilter.length === 1) {
        controller.chapterTitle.html(chapterFilter[0].title);

        var paragraphs = chapterFilter[0].value;
        paragraphs.forEach(function (paragraph) {
          var p = $('<p/>').html(paragraph);
          controller.bookBody.append(p);
        });

        controller.bookFrame.show();
        controller.selectNotification.hide();
      } else {
        controller.chapterTitle.html('');
        controller.selectNotification.show();
      }

      controller.chapterHeader.show();
    }
  };
}