// triggerToast.js
(function($) {
  var defaults = {
    type: 'info', // success, info, warning, error
    message: '',
    autoHide: true,
    hideDelay: 3000,
    clickToHide: true,
    position: 'top-right', // top-right, top-left, bottom-right, bottom-left, center, or {relativeTo: selector, align: 'top|bottom|left|right'}
    showAnimation: { opacity: 1, translateY: 0 },
    hideAnimation: { opacity: 0, translateY: 20 },
    animationDuration: 300,
    showCloseButton: false, // show a close (X) button
    closeButtonHtml: '&times;', // custom HTML for the close button
    customClass: '', // custom class for the alert
    breakpoints: {
      sm: { max: 600, width: '100%' },
      md: { max: 900, width: '350px' },
      lg: { max: Infinity, width: '350px' }
    }, // breakpoints for width
  };

  var activeToasts = [];

  function getContainer(position) {
    var posClass = 'triggerToast-' + (typeof position === 'string' ? position : 'top-right');
    var $container = $('.triggerToast-container.' + posClass);
    if ($container.length === 0) {
      $container = $('<div class="triggerToast-container ' + posClass + '"></div>').appendTo('body');
    }
    return $container;
  }

  function positionRelative($toast, options) {
    var $target = $(options.position.relativeTo);
    if ($target.length) {
      var offset = $target.offset();
      var align = options.position.align || 'top';
      $toast.css({ position: 'absolute', zIndex: 9999 });
      switch (align) {
        case 'top':
          $toast.css({ top: offset.top - $toast.outerHeight() - 8, left: offset.left });
          break;
        case 'bottom':
          $toast.css({ top: offset.top + $target.outerHeight() + 8, left: offset.left });
          break;
        case 'left':
          $toast.css({ top: offset.top, left: offset.left - $toast.outerWidth() - 8 });
          break;
        case 'right':
          $toast.css({ top: offset.top, left: offset.left + $target.outerWidth() + 8 });
          break;
      }
      $('body').append($toast);
    }
  }

  function removeActiveToast($toast) {
    activeToasts = activeToasts.filter(function(item) {
      return item.$toast[0] !== $toast[0];
    });
  }

  $.triggerToast = function(options) {
    var userSetShowClose = Object.prototype.hasOwnProperty.call(options, 'showCloseButton');
    options = $.extend(true, {}, defaults, options);

    // If autoHide is false and user did NOT set showCloseButton, default to true
    if (options.autoHide === false && !userSetShowClose) {
      options.showCloseButton = true;
    }

    var $toast = $('<div class="triggerToast-alert"></div>')
      .addClass(options.type)
      .html(options.message);

    // Add custom class if provided
    if (options.customClass) {
      $toast.addClass(options.customClass);
    }

    // Apply width based on breakpoints
    var winWidth = $(window).width();
    var appliedWidth = null;
    $.each(options.breakpoints, function(key, bp) {
      if (winWidth <= bp.max && appliedWidth === null) {
        appliedWidth = bp.width;
      }
    });
    if (appliedWidth) {
      $toast.css('width', appliedWidth);
    }

    // Add close button if enabled
    if (options.showCloseButton) {
      var $close = $('<span class="triggerToast-close"></span>').html(options.closeButtonHtml);
      $toast.append($close);
      $close.on('click', function(e) {
        e.stopPropagation();
        $toast.removeClass('triggerToast-show');
        setTimeout(function() { $toast.remove(); }, options.animationDuration);
      });
    }

    // Animation setup
    $toast.css({
      opacity: 0,
      transform: 'translateY(20px)'
    });

    // Positioning
    if (typeof options.position === 'object' && options.position.relativeTo) {
      positionRelative($toast, options);
    } else {
      var $container = getContainer(options.position);
      $container.append($toast);
    }

    // Show animation
    setTimeout(function() {
      $toast.addClass('triggerToast-show');
    }, 10);

    // Auto-hide
    if (options.autoHide) {
      setTimeout(function() {
        $toast.removeClass('triggerToast-show');
        setTimeout(function() { $toast.remove(); }, options.animationDuration);
      }, options.hideDelay);
    }

    // Click to hide
    if (options.clickToHide) {
      $toast.on('click', function() {
        $toast.removeClass('triggerToast-show');
        setTimeout(function() { $toast.remove(); }, options.animationDuration);
      });
    }

    activeToasts.push({ $toast: $toast, breakpoints: options.breakpoints });
  };

  $(window).on('resize', function() {
    var winWidth = $(window).width();
    activeToasts.forEach(function(item) {
      var appliedWidth = null;
      $.each(item.breakpoints, function(key, bp) {
        if (winWidth <= bp.max && appliedWidth === null) {
          appliedWidth = bp.width;
        }
      });
      if (appliedWidth) {
        item.$toast.css('width', appliedWidth);
      }
    });
  });

  // Change for all future toasts
  $.extend(true, $.triggerToast.defaults, {
    breakpoints: {
      sm: { max: 700, width: '100%' },
      md: { max: 1200, width: '400px' },
      lg: { max: Infinity, width: '500px' }
    }
  });
})(jQuery);
