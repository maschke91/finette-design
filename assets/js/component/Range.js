/**
 * Range class
 *
 * @class
 */
function Range(name)
{
  /** @property {Range} self Self reference */
  var self = this;

  /** @property {string} container Container selector */
  var container = '[data-range-name="' + name + '"] ';

  /** @property {string} values Values selector*/
  var values = '[data-range-column] input';

  /** @property {string} value Value selector*/
  var value = 'input[name="' + name + '"]';

  /**
   * Refresh value
   */
  this.refresh = function()
  {
    var $elements = $(container + values),
        result    = [];

    $.each($elements, function() {
      result.push($(this).attr('name'));
    });

    $(container + value).val(result);
  }

  /**
   * Initialization
   */
  this.init = function()
  {
    self.refresh();
  }

  /**
   * Change event
   */
  $(document).on('change', container + values, function()
  {
    console.log('changed');

    self.refresh();
  });

  /**
   * Class constructor
   */
  self.init();
}
