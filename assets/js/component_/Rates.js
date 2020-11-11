/**
 * Rates class
 *
 * @class
 */
function Rates(name)
{
  /** @property {Rates} self Self reference */
  var self = this;

  /** @property {string} container Container selector */
  var container = '[data-rates-name="' + name + '"] ';

  /** @property {string} checkboxes Checkboxes selector */
  var checkboxes = 'input[type="checkbox"]';

  /** @property {string} checkboxesChecked Checked checkboxes selector */
  var checkboxesChecked = checkboxes + ':checked';

  /** @property {string} row Row selector*/
  var row = '[data-rates-row]';

  /** @property {string} values Values selector*/
  var values = '[data-rates-column] input';

  /** @property {string} value Value selector*/
  var value = 'input[name="' + name + '"]';

  /** @property {string} buttonCheck Check button selector*/
  var buttonCheck = '[data-rates-button="check"]';

  /** @property {string} buttonUncheck Uncheck button selector*/
  var buttonUncheck = '[data-rates-button="uncheck"]';

  /**
   * Refresh value
   */
  this.refresh = function()
  {
    let $elements = $(container + checkboxesChecked),
        result    = [];

    $.each($elements, function() {
      let $row    = $(this).closest(row),
          $values = $row.find(values);

      $.each($values, function() {
        result.push($(this).attr('name'));
      });
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
  $(document).on('change', container + checkboxes, function()
  {
    self.refresh();
  });

  /**
   * Check button click event
   */
  $(document).on('click', container + buttonCheck, function(event)
  {
    event.preventDefault();

    $(container + checkboxes).attr('checked', 'checked');

    self.refresh();
  });

  /**
   * Uncheck button click event
   */
  $(document).on('click', container + buttonUncheck, function(event)
  {
    event.preventDefault();

    $(container + checkboxes).attr('checked', false);

    self.refresh();
  });

  /**
   * Class constructor
   */
  self.init();
}
