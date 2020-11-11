/**
 * Form class
 *
 * @class
 */
function Form(name, success, fail, ready)
{
  /** @property {Form} self Self reference */
  var self = this;

  /** @property {Form} $self Form element */
  var $self;

  /** @property {bool} busy State of form */
  var busy = false;

  /** @property {string} container Form selector */
  var container = 'form[data-name="' + name + '"] ';

  /** @property {string} messages Validation messages selector */
  var messages = '[data-validate]';

  /** @property {string} message Validation message selector */
  var messagesInput = '[data-invalid-{name}]';

  /** @property {string} message Validation message selector */
  var message = '[data-invalid-{name}="{type}"]';

  /** @property {string} messageFirst First validation message selector */
  var messageFirst = messages + ':visible:first';

  /** @property {string} inputsAll All inputs selector */
  var inputsAll = ':input[{attribute}]';

  /** @property {string} inputs Inputs selector */
  var inputs = inputsAll + ':not(:disabled)';

  /** @property {string} input Input selector */
  var input = ':input[{attribute}="{value}"]';

  /** @property {string} inputChecked Checked input selector */
  var inputChecked = input + ':checked';

  /** @property {string} failClass Input fail class name */
  var failClass = 'bad-value';

  /** @property {string} valueClass Input with value class name */
  var valueClass = 'has-value';

  /** @property {string} attribute Input key attribute */
  var attribute = 'name';

  /** @property {string} endpoint Endpoint attribute */
  var endpoint = 'action';

  /** @property {FormData} files Files array */
  var formData = new FormData();

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
      let pattern = new RegExp('{' + key + '}', 'g');

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
    let tag     = $element.prop('tagName').toLowerCase(),
        isInput = tag == 'input',
        type    = isInput
          ? $element.attr('type').toLowerCase()
          : null;

    return isInput
      ? type
      : tag;
  }

  /**
   * Slide to first validation message
   */
  this.slideToMessage = function()
  {
    let $element = $(messageFirst);

    if ($element.length) {
      $('html, body').animate({
        scrollTop: $element.offset().top - 140
      }, 500);
    }
  }

  /**
   * Set button action state
   *
   * @param {bool} state State
   */
  this.action = function(state)
  {
    let $input = self.input('submit'),
        value  = $input.attr(state
          ? 'data-value-action'
          : 'data-value-default'
        ),
        disable = state
          ? 'disabled'
          : false;

    $input
      .attr('disabled', disable)
      .val(value);
  }

  /**
   * Set form busy state
   *
   * @param {bool} state State
   */
  this.busy = function(state)
  {
    busy = state;

    self.action(state);

    $(document).trigger('formBusy', [state, $self]);
  }

  /**
   * Return input element
   *
   * If name "submit" is given, submit button is returned instead
   *
   * @param {string} name Input name
   *
   * @return {jQuery} Input
   */
  this.input = function(name)
  {
    let isSubmit = name == 'submit',
        selector = this.fillString(input, {
          'attribute' : isSubmit
            ? 'type'
            : attribute,
          'value' : isSubmit
            ? 'submit'
            : name
    });

    return $(container + selector);
  }

  /**
   * Set input as invalid
   *
   * @param {string} name  Input name
   * @param {bool}   state State
   *
   * @return {Form} Self reference
   */
  this.invalid = function(name, state)
  {
    $input = self.input(name);

    if (state) {
      $input.addClass(failClass);
    } else {
      $input.removeClass(failClass);
    }

    return self;
  }

  /**
   * Focus input
   *
   * @param {string} name Input name
   *
   * @return {Form} Self reference
   */
  this.focus = function(name)
  {
    self
      .input(name)
      .focus();

    return self;
  }

  /**
   * Reset input
   *
   * @param {string} name Input name
   *
   * @return {Form} Self reference
   */
  this.reset = function(name)
  {
    self
      .input(name)
      .val('')
      .change();

    return self;
  }

  /**
   * Reset form
   *
   * @return {Form} Self reference
   */
  this.resetForm = function()
  {
    $(container)[0].reset();
    // $self[0].reset();

    let selector = self.fillString(inputsAll, {
      'attribute' : attribute
    });

    $(container + selector).change();

    return self;
  }

  /**
   * Disable input
   *
   * @param {string} name  Input name
   * @param {bool}   state State
   *
   * @return {Form} Self reference
   */
  this.disable = function(name, state)
  {
    let $input   = self.input(name),
        actual   = $input.attr('disabled'),
        previous = $input.attr('data-disabled') || false,
        disabled = state
          ? 'disabled'
          : false;

    $input
      .attr('data-disabled', state
        ? actual
        : null)
      .attr('disabled', state
        ? disabled
        : previous);

    return self;
  }

  /**
   * Disable form
   *
   * @param {bool} state State
   *
   * @return {Form} Self reference
   */
  this.disableForm = function(state)
  {
    let selector  = this.fillString(inputsAll, {
          'attribute' : attribute
        }),
        $elements = $(container + selector);

    $.each($elements, function() {
      self.disable(
        $(this).attr(attribute),
        state
      );
    });

    return self.disable('submit', state);
  }

  /**
   * Check input value
   */
  this.checkValue = function($element)
  {
    let name  = $element.attr(attribute),
        value = $element.val(),
        type  = self.typeOfElement($element),
        skip  = [
          'radio',
          'checkbox'
        ],
        check = $.inArray(type, skip) == -1;

    if (check) {
      if (value) {
        $element.addClass(valueClass);

        self.invalid(name, false);
        self.hideMessage(name);
      } else {
        $element.removeClass(valueClass);
      }
    }
  }

  /**
   * Check all inputs value
   */
  this.checkValues = function()
  {
    let selector  = this.fillString(inputsAll, {
          'attribute' : attribute
        }),
        $elements = $(container + selector);

    $.each($elements, function() {
      self.checkValue($(this));
    });
  }

  /**
   * Hide messages
   *
   * @param {string} name Input name
   */
  this.hideMessage = function(name)
  {
    let selector = this.fillString(messagesInput, {
      'name' : name
    });

    $(container + selector).fadeOut();
  }

  /**
   * Hide all messages
   */
  this.hideMessages = function()
  {
    $(container + messages).hide();
  }

  /**
   * Show message
   *
   * @param {string} name Input name
   * @param {string} type Message name
   */
  this.showMessage = function(name, type)
  {
    let selector = this.fillString(message, {
      'name' : name,
      'type' : type
    });

    $(container + selector).fadeIn();
  }

  /**
   * Show messages
   *
   * @param {string} data Form validation results in JSON
   */
  this.showMessages = function(data)
  {
    $.each(data.result, function(name, states) {
      $.each(states, function(state, value) {
        if (!value) {
          self.invalid(name, true);
          self.showMessage(name, state);

          return false;
        }
      });
    });

    self.slideToMessage();
  }

  /**
   * Get form values
   *
   * @return {object} Input names and values
   */
  this.getValues = function()
  {
    let result    = {},
        selector  = this.fillString(inputs, {
          'attribute' : attribute
        }),
        $elements = $(container + selector);

    $.each($elements, function() {
      let $element = $(this),
          name     = $element.attr(attribute),
          value    = null,
          selector = '';

      switch (self.typeOfElement($element)) {
        case 'checkbox':
          selector = self.fillString(inputChecked, {
            'attribute' : attribute,
            'value'     : name
          });

          value = $.map($(container + selector), function(current) {
            let value = $(current).val();

            return value == 'on'
              ? 1
              : value;
          }).join(',');
          break;

        case 'radio':
          selector = self.fillString(inputChecked, {
            'attribute' : attribute,
            'value'     : name
          });

          value = $(container + selector).attr('value');
          break;

        case 'file':
          formData.append(name, $element.prop('files')[0]);
          // no break

        default:
          value = $element.val();
          break;
      }

      result[name] = value;
    });

    console.log(result); // DEBUG

    return result;
  }

  /**
   * Set form values
   *
   * @param {object} data Form values
   */
  this.setValues = function(data)
  {
    let result    = {},
        selector  = this.fillString(inputs, {
          'attribute' : attribute
        }),
        $elements = $(container + selector);

    $.each($elements, function() {
      let $element = $(this),
          name     = $element.attr(attribute);

      switch (self.typeOfElement($element)) {
        case 'checkbox':
          $element.prop('checked', data[name]
            ? 'checked'
            : false
          );
          break;

        case 'radio':
          let selector = self.fillString(inputChecked, {
                'attribute' : attribute,
                'value'     : name
              }),
              $checked = $(container + selector);

          $checked.prop('checked', data[name]
            ? 'checked'
            : false
          );
          break;

        default:
          $element.val(data[name]);
          break;
      }

      $element.trigger('change');
    });
  }

  /**
   * Validate form
   */
  this.validateForm = function()
  {
    self.focus('submit');
    self.busy(true);

    let target = $(container).attr(endpoint);

    $.each(self.getValues(), function(key, value) {
      formData.append(key, value);
    });

    // $.post(target, this.getValues(), function(data) {
    $.ajax({
      'url'         : target,
      'data'        : formData, // $.extend(formData, this.getValues()),
      'contentType' : false,
      'processData' : false,
      'type'        : 'POST',
      'success'     : function(data)
    {
      console.log(data); // DEBUG

      self.busy(false);

      try {
        data = $.parseJSON(data);
      } catch (e) {
        data.status = false;
      }

      if (data.status) {
        if (success) {
          success(self, $self, data.response);
        }
      } else {
        if (data.redirect) {
          location.href = data.redirect;
        }

        self.showMessages(data);

        if (fail) {
          fail(self);
        }
      }
    }});
    // });
  }

  /**
   * Initialization
   */
  this.init = function()
  {
    self.hideMessages();
    self.checkValues();

    if (ready) {
      ready(self);
    }
  }

  /**
   * Form submit event
   */
  $(document)
    .off('submit', container)
    .on('submit', container, function(event)
  {
    event.preventDefault();

    $self = $(this);

    if (!busy) {
      self.hideMessages();
      self.validateForm();
    }
  });

  /**
   * Input change event
   */
  $(document).on(
    'change paste keyup',
    self.fillString(container + inputsAll, {
      'attribute' : attribute
    }), function()
  {
    console.log('event!!!');
    self.checkValue($(this));
  });

  /**
   * Class constructor
   */
  self.init();
}
