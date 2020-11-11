/**
 * Prompt class
 *
 * @class
 */
function Prompt(name, html, $input, success, open, close)
{
  /** @property {Prompt} self Self reference */
  var self = this;

  /** @property {jQuery} $content Content element */
  var $content = $(html);

  /** @property {Form} form Verify form instance */
  var form;

  /** @property {string} buttonClose Close button selector */
  var buttonClose = '[data-prompt="' + name + '"] [data-prompt="close"]';

  /**
   * Initialize form
   */
  this.initForm = function()
  {
    self.form = new Form(name,
      function (self, $self, data) {
        console.log(self, $self, data); // DEBUG

        if (success) {
          success(data);
        }
      }, function (self) {
        self
          .reset('code')
          .focus('code');
      }, function (self) {
        self.focus('code');
      }
    );
  }

  /**
   * Append content
   */
  this.appendContent = function()
  {
    $input
      .closest('form')
      .after($content);

    $content
      .hide()
      .fadeIn('slow');
  }

  /**
   * Remove content
   */
  this.removeContent = function()
  {
    $content.remove();
  }

  /**
   * Position content to input
   */
  this.positionContent = function()
  {
    var $target = $input.parent()
        target  = {
          'offset' : $target.offset(),
          'size'   : {
            'width'  : $target.outerWidth(),
            'height' : $target.outerHeight(true)
          }
        },
        content = {
          'size' : {
            'height' : $content.outerHeight()
          }
        };

    $content.css({
      'top' : target.offset.top
        + target.size.height
        / 2
        - content.size.height
        / 2
        + 'px',
      'left' : target.offset.left
        + target.size.width
        + 'px'
    });
  }

  /**
   * Initialization
   */
  this.init = function()
  {
    if (open) {
      open();
    }

    self.appendContent();
    self.positionContent();
    self.initForm();
  }

  /**
   * Close event
   */
  $(document).on('click', buttonClose, function(event)
  {
    event.preventDefault();

    if (close) {
      close();
    }

    self.removeContent();
  });

  /**
   * Class constructor
   */
  self.init();
}
