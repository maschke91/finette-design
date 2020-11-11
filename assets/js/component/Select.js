/**
 * Select class
 *
 * @class
 */
function Select($element) {
  /** @property {string} viewInputSelector View input selector */
  var viewInputSelector = '[data-view]'; // NOTE: can be changed

  /** @property {string} toggleInputSelector Toggle input selector */
  var toggleInputSelector = '[data-toggle]'; // NOTE: can be changed

  /** @property {string} optionsContainerSelector Options container selector */
  var optionsContainerSelector = '[data-options]'; // NOTE: can be changed

  /** @property {string} valueDataAttribute Value attribute */
  var valueDataAttribute = 'value'; // NOTE: can be changed

  /** @property {string} hasValueClass Class to be added when input has selected option */
  var hasValueClass = 'has-value'; // NOTE: can be changed

  /** @property {string} optionsSelector Options selector */
  var optionsSelector = '[data-{attribute}]';

  /** @property {string} optionSelector Option selector template */
  var optionSelector = '[data-{attribute}="{value}"]';

  /** @property {Select} self Self reference */
  var self = this;

  /** @property {jQuery} $valueInput Value input element */
  var $valueInput = $element;

  /** @property {jQuery} $container Container element */
  var $container = $element.parent();

  /** @property {jQuery} $viewInput View input element */
  var $viewInput = $container.find(viewInputSelector);

  /** @property {jQuery} $toggleInput Toggle input element */
  var $toggleInput = $container.find(toggleInputSelector);

  /** @property {jQuery} $optionsContainer Options container element */
  var $optionsContainer = $container.find(optionsContainerSelector);

  /**
   * Fill variables into string template
   *
   * @param {string} template  Template
   * @param {object} variables Variables
   *
   * @return {string} Filled template
   */
  this.fillString = function(template, variables) {
    $.each(variables, function(key, variable) {
      var pattern = new RegExp('{' + key + '}', 'g');

      template = template.replace(pattern, variable);
    });

    return template;
  }

  /** @property {jQuery} $options Options element */
  var $options = $optionsContainer.find(
    this.fillString(optionsSelector, {
      'attribute' : valueDataAttribute
    })
  );

  /**
   * Toggle options
   */
  this.toggleOptions = function() {
    $optionsContainer.toggle();
  }

  /**
   * Show options
   */
  this.showOptions = function() {
    $optionsContainer.show();
  }

  /**
   * Hide options
   */
  this.hideOptions = function() {
    $optionsContainer.hide();
  }

  /**
   * Select option
   *
   * @param {jQuery} $element Element
   */
  this.selectOption = function($element) {
    var value  = $element.data(valueDataAttribute),
        _value = value || value == '0',
        title  = _value
          ? $element.text()
          : '';

    $valueInput.val(value);

    $viewInput
      .val(title)
      .addClass(hasValueClass);

    if (_value) {
      $viewInput.addClass(hasValueClass);
    } else {
      $viewInput.removeClass(hasValueClass);
    }
  }

  /**
   * Initialization
   */
  this.refresh = function() {
    var value    = $valueInput.val(),
        selector = this.fillString(optionSelector, {
          'attribute' : valueDataAttribute,
          'value'     : value
        }),
        $option = $optionsContainer.find(selector);

    this.selectOption($option);
  }

  /**
   * Option click event
   */
  $options.on('click', function() {
    self.selectOption($(this));
  });

  /**
   * Value change event
   */
  $valueInput.on('change', function() {
    self.refresh();
  });

  /**
   * Focus event
   */
  $viewInput.on('focus', function() {
    if ($element.is(':enabled')) {
      self.showOptions();
    }
  });

  /**
   * Blur event
   */
  $viewInput.on('blur', function() {
    window.setTimeout(function() {
      self.hideOptions();
    }, 100);
  });

  /**
   * Initialization
   */
  self.refresh();
}
