/**
 * Toggle class
 *
 * @class
 */
function Toggle($element)
{
  /** @property {Toggle} self Self reference */
  var self = this;

  /** @property {string} name Name */
  var name = $element.data('toggle-name');

  /** @property {string} optionsSelector Options selector */
  var optionsSelector = '[data-toggle-' + name + ']';

  /** @property {string} optionSelectorTemplate Option selector template */
  var optionSelectorTemplate = '[data-toggle-{name}="{value}"]';

  /**
   * Fill variables into template
   *
   * @param {string} template  Template
   * @param {object} variables Variables
   *
   * @return {string} Filled template
   */
  this.fillString = function(template, variables)
  {
    $.each(variables, function(key, variable) {
      var pattern = new RegExp('{' + key + '}', 'g');

      template = template.replace(pattern, variable);
    });

    return template;
  }

  /**
   * Return type of element
   *
   * @param {jQuery} $element Element
   *
   * @return {string} Tag name or type attribute
   */
  this.typeOfElement = function($element)
  {
    var tag     = $element.prop('tagName').toLowerCase(),
        isInput = tag == 'input',
        type    = isInput
          ? $element.attr('type').toLowerCase()
          : null;

    return isInput
      ? type
      : tag;
  }

  /**
   * Get element value
   *
   * @param {jQuery} $element Element
   *
   * @return {string} Value
   */
  this.getValue = function($element)
  {
    switch (self.typeOfElement($element)) {
      case 'checkbox':
        return $element.is(':checked')
          ? 1
          : 0;
        break;

      default:
        return $element.val();
        break;
    }
  }

  /**
   * Refresh
   */
  this.refresh = function()
  {
    var value    = self.getValue($element),
        selector = self.fillString(optionSelectorTemplate, {
          'name'  : name,
          'value' : value
        });

    $(optionsSelector).hide();
    $(selector).show();
  }

  /**
   * Initialization
   */
  this.init = function()
  {
    self.refresh();
  }

  /**
   * Class constructor
   */
  self.init();

  /**
   * Change event
   */
  $(document).on('change', $element, function()
  {
    self.refresh();
  });
}
