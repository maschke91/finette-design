/**
 * Modal class
 *
 * @class
 */
function Modal() {
  /** @property {Select} self Self reference */
  var self = this;

  /** @property {string} openClass Modal open class */
  var openClass = 'modal-open'; // NOTE: can be changed

  /** @property {string} containerSelector Container selector */
  var containerSelector = '.modal__overlay'; // NOTE: can be changed

  /** @property {string} contentDefaultSelector Default content selector */
  var contentDefaultSelector = '.modal__content-wrap--default'; // NOTE: can be changed

  /** @property {string} contentCustomSelector Custom content selector */
  var contentCustomSelector = '.modal__content-wrap--custom'; // NOTE: can be changed

  /** @property {string} titleSelector Title selector */
  var titleSelector = '.modal__content-title'; // NOTE: can be changed

  /** @property {string} textSelector Text selector */
  var textSelector = '.modal__content-text'; // NOTE: can be changed

  /** @property {string} buttonCancelSelector Cancel button selector */
  var buttonCancelSelector = '.modal__button--cancel'; // NOTE: can be changed

  /** @property {string} buttonConfirmSelector Confirm button selector */
  var buttonConfirmSelector = '.modal__button--confirm'; // NOTE: can be changed

  /** @property {function} showFunction Show function */
  var showFunction;

  /** @property {function} closeFunction Close function */
  var closeFunction;

  /** @property {function} confirmFunction Confirm function */
  var confirmFunction;

  /** @property {function} stornoFunction Storno function */
  var stornoFunction;

  /** @property {bool} custom Whether to display custom content */
  var custom;

  /** @property {string} title Title */
  var title;

  /** @property {string} text Text */
  var text;

  /** @property {string} content Custom content */
  var content;

  /** @property {string} cancel Whether to show cancel button */
  var cancel;

  /**
   * Set close function
   *
   * @param {function} success Close function
   */
  this.setClose = function(close) {
    closeFunction = close;
  }

  /**
   * Set confirm function
   *
   * @param {function} confirm Confirm function
   */
  this.setConfirm = function(confirm) {
    confirmFunction = confirm;
  }

  /**
   * Set show function
   *
   * @param {function} show Show function
   */
  this.setShow = function(show) {
    showFunction = show;
  }

  /**
   * Set storno function
   *
   * @param {function} storno Storno function
   */
  this.setStorno = function(storno) {
    stornoFunction = storno;
  }

  /**
   * Set whether to display custom content
   *
   * @param {bool} value Value
   */
  this.setCustom = function(value) {
    custom = value;
  }

  /**
   * Set title
   *
   * @param {string} value Value
   */
  this.setTitle = function(value) {
    title = value;
  }

  /**
   * Set text
   *
   * @param {string} value Value
   */
  this.setText = function(value) {
    text = value;
  }

  /**
   * Set custom content
   *
   * @param {string} value Value
   */
  this.setContent = function(value) {
    content = value;
  }

  /**
   * Set whether to show cancel button
   *
   * @param {bool} value Value
   */
  this.setCancel = function(value) {
    cancel = value;
  }

  /**
   * Open dialog
   */
  this.open = function() {
    $(containerSelector)
      .find(contentCustomSelector)
      .hide();

    $(containerSelector)
      .find(contentDefaultSelector)
      .hide();

    if (custom) {
      $(containerSelector)
        .find(contentCustomSelector)
        .html(content)
        .show();
    } else {
      $(containerSelector)
        .find(contentDefaultSelector)
        .show();

      $(containerSelector)
        .find(titleSelector)
        .html(title);

      $(containerSelector)
        .find(textSelector)
        .html(text);

      if (cancel) {
        $(containerSelector)
          .find(buttonCancelSelector)
          .show();
      } else {
        $(containerSelector)
          .find(buttonCancelSelector)
          .hide();
      }
    }

    $(containerSelector).addClass(openClass);

    showFunction();
  }

  /**
   * CLose dialog
   */
  this.close = function() {
    $(containerSelector).removeClass(openClass);

    closeFunction();
  }

  /**
   * Show modal
   *
   * @param {object} options Options
   */
  this.show = function(config) {
    config = config || {};

    self.setShow(config.show || function() {});
    self.setClose(config.close || function() {});
    self.setConfirm(config.confirm || function() {});
    self.setStorno(config.storno || function() {});
    self.setTitle(config.title || 'Title');
    self.setText(config.text || 'Lorem ipsum dolor sit amet');
    self.setContent(config.content || '');
    self.setCustom(config.custom || false);
    self.setCancel(config.cancel || false);
    self.open();
  }

  /**
   * Cancel event
   */
  $(document)
    .off('click', buttonCancelSelector)
    .on('click', buttonCancelSelector, function(event)
  {
    event.preventDefault();

    stornoFunction();

    self.close();
  });

  /**
   * Confirm event
   */
  $(document)
    .off('click', buttonConfirmSelector)
    .on('click', buttonConfirmSelector, function(event)
  {
    event.preventDefault();

    confirmFunction();

    self.close();
  });
}
