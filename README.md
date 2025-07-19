# triggertoaste
A flexible, customizable notification/alert plugin using jQuery, HTML, and CSS.
# jQuery TriggerToast Plugin

A flexible, customizable notification/alert plugin using jQuery, HTML, and CSS.

## Features
- Alert types: `success`, `info`, `warning`, `error`
- Customizable options: auto-hide, click-to-hide, position, custom class, close button, breakpoints
- Positioning: global (screen corners/center) and element-relative
- Animation: customizable show/hide animations
- Responsive width via breakpoints

## Installation
1. Include jQuery:
   ```html
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   ```
2. Include the plugin files:
   ```html
   <link rel="stylesheet" href="triggerToast.css">
   <script src="triggerToast.js"></script>
   ```

## Usage
Call `$.triggerToast(options)` with your desired options.

### Basic Example
```js
$.triggerToast({
  type: 'success',
  message: 'Operation completed successfully!'
});
```

### All Options
| Option             | Type      | Default         | Description |
|--------------------|-----------|-----------------|-------------|
| `type`             | string    | 'info'          | Alert type: 'success', 'info', 'warning', 'error' |
| `message`          | string    | ''              | The message to display |
| `autoHide`         | bool      | true            | Whether to auto-hide the alert |
| `hideDelay`        | number    | 3000            | Time in ms before auto-hide |
| `clickToHide`      | bool      | true            | Whether clicking the alert hides it |
| `position`         | string/object | 'top-right'   | Position: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'center', or `{relativeTo: selector, align: 'top|bottom|left|right'}` |
| `showCloseButton`  | bool      | false (true if autoHide is false) | Show a close (X) button |
| `closeButtonHtml`  | string    | '&times;'       | Custom HTML for the close button |
| `customClass`      | string    | ''              | Custom CSS class for the alert |
| `breakpoints`      | object    | see below       | Responsive width settings |

#### Default Breakpoints
```
breakpoints: {
  sm: { max: 600, width: '100%' },
  md: { max: 900, width: '350px' },
  lg: { max: Infinity, width: '350px' }
}
```

### Special Behavior
- If `autoHide: false` and `showCloseButton` is not set, the close button will be shown by default.

### Examples
#### Auto-hide, no close button
```js
$.triggerToast({
  type: 'info',
  message: 'This will disappear automatically.',
  autoHide: true
});
```

#### Persistent alert with close button (default)
```js
$.triggerToast({
  type: 'warning',
  message: 'You must close this manually.',
  autoHide: false
  // showCloseButton will be true automatically
});
```

#### Custom close button text
```js
$.triggerToast({
  type: 'error',
  message: 'An error occurred!',
  autoHide: false,
  closeButtonHtml: 'Close'
});
```

#### Custom class and breakpoints
```js
$.triggerToast({
  type: 'success',
  message: 'Custom styled!',
  customClass: 'my-special-alert',
  breakpoints: {
    sm: { max: 500, width: '90%' },
    md: { max: 800, width: '300px' },
    lg: { max: Infinity, width: '600px' }
  }
});
```

## License
MIT Adi oleti
