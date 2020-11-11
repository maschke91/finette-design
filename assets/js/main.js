$(document).on('change paste keyup', 'input[name="amount"]', function() {
  var value = $(this).val();

  if (value.indexOf(',') != -1) {
    $(this)
      .val(
        value.replace(',', '.')
      )
      .change();
  }
});

/**
 * Sortable init
 */
$('[data-sortable-save]')
  .hide()
  .removeClass('d-none');

$('.js-sortable').sortable({
  animation: 150,
  onUpdate: function(e) {
    $('[data-sortable-save]').show();
  }
});

$(document).on('click', '[data-sortable-save]', function() {
  var rows = $('.js-sortable tr');

  var result = $.map(rows, function(n, i) {
    return {id : $(n).data('row-id'), order: ++i};
  });

  var href = $(this).attr('href');
  var btn = $(this);

  $.post(href, {order: JSON.stringify(result)}, function(data) {
    console.log(data);

    var modal = new Modal();

    modal.show({
      'title'   : 'Potvrzení',
      'text'    : 'Pořadí uloženo'
    });

    btn.hide();
  });

  return false;
});

/**
 * Icons fallback function
 */
var $icon = $('.svg__icon');

if ($icon.length) {
  svg4everybody();
}
/**
 * Toggle init
 */

var $elements = $('.js-toggle');

if ($elements.length) {
  $.each($elements, function() {
    new Toggle(
      $(this)
    );
  });
}

/**
 *  Select init
 */

 $(document).ready(function () {
   selectInit();
 });

 function selectInit() {
   $.each($(".js-select"), function () {

     var $el     = $(this),
         label   = $el.closest('.form__input-wrap').find('label'),
         search  = $el.is('[data-search]'),
         options = {
           // placeholder: ''
           placeholder: {
             id   : ' ',
             text : ' '
           }
         };

     if (!search) {
       options = $.extend(options, {
         minimumResultsForSearch: Infinity
       });
     }

     $el.select2(options);

     if ($el.val() == '') {
       $el
        .parent()
        .find('.select2-selection__rendered')
        .html('');
     }

     label.on('click', function (e) {
       $el.select2('open');
     });

     $el.on('select2:opening', function (e) {
       $(this).parent().addClass('select--open');
     });

     $el.on('select2:close', function (e) {
       $(this).parent().removeClass('select--open');
     });

     $el.on('select2:select', function (e) {
       console.log($(this).val());

       if ($(this).val() == '') {
         console.log('empty');
         $(this).parent().find('.select2-selection__rendered').html('');
         // console.log($(this).next('.select2-selection__rendered'));
       }
     });
   });
 }

/**
  * Confirm event
  */

$(document).on('click', '.js-confirm', function(event) {
  event.preventDefault();

  var modal = new Modal(),
  href  = $(this).attr('href');

  modal.show({
    'title'   : 'Potvrzení',
    'text'    : 'Opravdu chcete provést tuto akci?',
    'cancel'  : true,
    'confirm' : function() {
      location.href = href;
    }
  });
});

/**
  * Birth number to birth date autofill
  */

$(document).on('change', 'input[name="birth_no"]', function ()
{
  var input = $(this),
  value = input.val(),
  count = value.length,
  run   = count >= 6;

  if (run) {
    var target = $('input[name="birth_date"]:not(:disabled)'),
    number = [],
    result = '',
    today  = new Date(),
    year   = today.getFullYear().toString().substring(2),
    id     = value.substring(7, 11);

    number[0] = value.substring(0, 2);
    number[1] = value.substring(2, 4);
    number[2] = value.substring(4, 6);

    if (number[0] > year || id.length == 3) {
      number[0] = '19' + number[0];
    } else {
      number[0] = '20' + number[0];
    }

    if (number[1] >= 51 && number[1] <= 62) {
      number[1] = number[1] - 50;
    } else if (number[1] >= 21 && number[1] <= 32) {
      number[1] = number[1] - 20;
    } else if (number[1] >= 71 && number[1] <= 82) {
      number[1] = number[1] - 70;
    }

    if (number[1].toString().substring(0, 1) == '0') {
      number[1] = number[1]
      .toString()
      .substring(1, 2);
    }

    if (number[2].toString().substring(0, 1) == '0') {
      number[2] = number[2]
      .toString()
      .substring(1, 2);
    }

    if (number[1].toString().length == 1) {
      number[1] = '0' + number[1];
    }

    if (number[2].toString().length == 1) {
      number[2] = '0' + number[2];
    }

    var date  = new Date(number[0], (number[1] - 1), number[2], 0, 0, 0, 0),
    valid = date && (date.getMonth() + 1) == number[1];

    if (valid) {
      result = number
      .reverse()
      .join('.');

      target
      .val(result)
      .trigger('change');
    }
  }
});

/**
 *  Active link
 */

  function activeClass() {
    var url = window.location.pathname,
    arr = url.split('/'),
    res = '';
    //
    //
    arr.shift();
    //
    //
    $.each(arr, function (key, value) {
      res += '/' + value;
      //
      var $target = $('[href="' + res + '"]')
      //
      $target.addClass('active');
    });
  }
  $(document).ready(function (){
    activeClass();
  });

/**
  * Identity card valid to autofill (+ 10 years)
  */

$(document).on('change', 'input[name="identity_card_valid_from_date"]', function ()
{
  console.log('change id');

  var input = $(this),
  value = input.val(),
  count = value.length,
  run   = count == 10;

  if (run) {
    console.log('run');

    var target = $('input[name="identity_card_valid_to_date"]'),
    number = [],
    result = '';

    number[0] = parseInt(value.substring(0, 2));
    number[1] = parseInt(value.substring(3, 5));
    number[2] = parseInt(value.substring(6, 10)) + 10;

    console.log(number);

    var date   = new Date(number[2], (number[1] - 1), number[0], 0, 0, 0, 0),
    valid  = date && (date.getMonth() + 1) == number[1];

    console.log(date, valid);

    if (valid) {
      result = number.join('.');

      target
      .val(result)
      .trigger('change');
    }
  }
});

/**
* Form busy event
*/

$(document).on('formBusy', function (event, state, $form)
{
  console.log('formBusy', state, $form); // DEBUG

  if ($form) {
    $form.css('opacity', state
      ? '.5'
      : '1'
    );
  }
});

/**
* Datepicker init
*/

function initDatepicker() {

 var el = $('[data-toggle="datepicker"]:not(.datepicker_init)');

 el.each(function() {

    $(this).datepicker({
      autoHide: true,
      language: "cs-CZ"
    });

    $(this).on("pick.datepicker", function () {
      $(this)
      .addClass("has-value");
    });

    $(this).addClass('datepicker_init');
  });
}

/**
* Document ready call
*/

initDatepicker(); // call datepicker function
scrollToTop(); // call scroll to top button function

$(document).ajaxComplete(function() {
  initDatepicker();
  selectInit();
  fileInput();

  var $elements = $('.js-toggle');

  if ($elements.length) {
    $.each($elements, function() {
      new Toggle(
        $(this)
      );
    });
  }
	// $.each($(".js-select"), function () {
	// 	new Select($(this));
	// });
});

/**
* Overlay functions
*/

function overlayOpen() {
  $('body').addClass('overscroll-disabled');
  $('.body__overlay-wrap').fadeIn();
}
function overlayClose() {
  $('body').removeClass('overscroll-disabled');
  $('.body__overlay-wrap').fadeOut();
}

/**
 * Header button
 */
$(document).on('click', '.js-aside-button', function() {
  $(this).toggleClass("is-active");

  if ($(this).hasClass('is-active')) {
    $('.js-aside-content').addClass('menu-open');
    overlayOpen();
  } else {
    $('.js-aside-content').removeClass('menu-open');
    overlayClose();
  }
});
$(document).on('click', '.body__overlay-wrap', function(){
  $('.js-aside-content').removeClass('menu-open');
  $('.js-aside-button').removeClass('is-active');
  overlayClose();
});

/**
 * Tabs init
 */

$(document).on('click', '[data-tab]', function(){

  $('[data-tab]').removeClass('active');
  $('.tab__box-content').removeClass('active');

  var tabTarget = $(this).attr('data-tab');

  $(".tab__box-content[data-content-box='" + tabTarget + "']").addClass('active');
  $(this).addClass('active');

});

/**
 * Ripple effect
 */

$("button").click(function (e) {

  $(".ripple__element").remove();

  var posX = $(this).offset().left,
  posY = $(this).offset().top,
  buttonWidth = $(this).width() * 2,
  buttonHeight =  $(this).height();

  $(this).prepend("<span class='ripple__element'></span>");

  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;

  $(".ripple__element").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("ripple__animation");

});

/**
 * Target content and display
 */

$(document).on('click', '[data-content-next]', function() {
  $('.is-visible').fadeOut();
  $(this).addClass('button-active');

  var content = $(this).next();

  content.parent().addClass('content_open');
  content.addClass('is-visible')
         .fadeIn();
});

$(document).on('click', function(event){

 /*  var target = $('.is-visible'); */

  $target = $(event.target);

  if(!$target.closest('.content_open').length &&
  $('.content_open').is(":visible")) {
    $('.is-visible').fadeOut();
    $('button.button-active').removeClass('.button-active');
    console.log('CLosed 2');
    $('.content_open').each(function(){
      $(this).removeClass('.content_open');
      $(this).find('.is-visible').removeClass('.is-visible');
    });
  }
/*   target.each(function (){
    $(this).fadeToggle();
  }); */
});

/**
 * Scroll to top button
 */

function scrollToTop() {
  var btn = $('.js-scrollToTop');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 127) {
      btn.addClass('visible');
    } else {
      btn.removeClass('visible');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });
};

/**
 *  Thead fixed
 */

var el = $('.js-table-wrapper:not(.table_init)');

// 900 = md variable from grid.scss
if ($(window).width() > 900) {

  el.each(function() {

    $(this).stickyTableHeader({
      outsideViewportOnly: true,
      offset : {
        /* topScrolling: 127, */
        topScrolling: 127,
        scrollThrottle: 100
      }
    });

    $(this).addClass('table_init');
    /* console.log('Table init'); */

  });
}

/**
 * File input
 */
function fileInput() {
  var fileInputs = document.getElementsByClassName('js-file');
  var fileLabels = document.getElementsByClassName('js-file__label');
  var deleteButtons = document.querySelectorAll('[data-file-delete]');

  var _loop = function _loop() {
    var fileInput = fileInputs[i];
    var fileLabel = fileLabels[i];
    var deleteButton = deleteButtons[i];

    fileInput.classList.add('fileinput_init');

    fileInput.addEventListener('change', function (event) {
      var value = fileInput.value;
      var editedValue = value.replace(/^C:\\fakepath\\/i, '');

      if (!value) {
        fileInput.classList.remove('has-value');
        deleteButton.classList.remove('visible');
        fileLabel.innerHTML = 'Vyberte soubor ...';
      }

      var trimmed = value.trim();

      if (trimmed) {
        fileInput.classList.add('has-value');
        deleteButton.classList.add('visible');
        fileLabel.innerHTML = editedValue;
      }
    });
    deleteButton.addEventListener('click', function (event) {
      fileInput.value = '';
      fileInput.dispatchEvent(new Event('change'));
    });
  };

  for (var i = 0, all = fileInputs.length; i < all; i++) {
    _loop();
  }
}

fileInput();

 /**
   * Toggle class
   * @param {DOM object} element
   * @param {string} className
   */
  function toggleActive(element, className) {
    element.classList.toggle(className);
  }



function collapseMenu() {
  var collapseItems = document.getElementsByClassName('js-collapseMenuItem');

  var _loop = function _loop() {
    var element = collapseItems[i];
    var elementChildren = element.children; // array

    var link = elementChildren[0];
    var nav = elementChildren[1];
    link.addEventListener('click', function (event) {
      event.preventDefault();
      toggleActive(nav, 'navigation--visible');
      toggleActive(link, 'menu-open');
    });
  };

  for (var i = 0, all = collapseItems.length; i < all; i++) {
    _loop();
  }
}
collapseMenu();
