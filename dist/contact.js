webpackJsonp([0],{

/***/ "./public/static/scripts/contact.js":
/*!******************************************!*\
  !*** ./public/static/scripts/contact.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _notifications = __webpack_require__(/*! ./notifications */ "./public/static/scripts/notifications.js");

var _notifications2 = _interopRequireDefault(_notifications);

var _validator = __webpack_require__(/*! ./validator */ "./public/static/scripts/validator.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function contact() {
    var formWrappers = document.querySelectorAll('.input-wrapper');
    var formInputs = document.querySelectorAll('.form-input');
    var submitButton = document.getElementById('contact-submit');
    var successContent = document.getElementById('contact-success');
    var failureContent = document.getElementById('failure-content');
    var errorContent = document.getElementById('error-content');
    var contactScroll = document.getElementById('contact-scroller');
    var contactContainer = document.getElementById('contact-container');
    var contactState = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    function createNotification(content, timeout, type) {
        return new _notifications2.default({
            content: content,
            timeout: timeout,
            type: type
        });
    }

    function updateState(node) {
        var name = node.name,
            value = node.value;

        contactState[name] = value;
    }

    function resetForm() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = formInputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var input = _step.value;

                input.value = '';
                input.classList.remove('valid');
                input.classList.remove('blank');
                input.classList.remove('invalid');
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    (0, _validator.onBlur)(formInputs, updateState);

    async function sendMessage() {
        if (submitButton.classList.contains('form-valid')) {
            submitButton.classList.add('loading');

            try {
                var response = await _axios2.default.post('/contact', contactState, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    createNotification(sucessContent, 2000, 'success');

                    var success = new Event('message-sent');
                    window.setTimeout(function () {
                        submitButton.classList.remove('loading');
                        window.dispatchEvent(success);
                        submitButton.classList.remove('form-valid');
                        resetForm();
                    }, 700);
                } else {
                    createNotification(failureContent, 2000, 'failure');

                    var failure = new Event('message-failed');
                    submitButton.classList.remove('loading');
                    window.dispatchEvent(failure);
                }
            } catch (err) {
                createNotification(errorContent, 2000, 'error');

                var error = new Event('message-error');
                window.dispatchEvent(error);
            }
        }
    }

    var smoothScroll = function () {
        var timer = void 0;
        var start = void 0;
        var factor = void 0;

        return function (target) {
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

            var offset = window.pageYOffset;
            var delta = target - window.pageYOffset;
            start = Date.now();
            factor = 0;

            if (timer) {
                clearInterval(timer);
            }

            function step() {
                var y = void 0;
                factor = (Date.now() - start) / duration;

                if (factor >= 1) {
                    clearInterval(timer);
                    factor = 1;
                }

                y = factor * delta + offset;
                window.scrollBy(0, y - window.pageYOffset);
            }

            timer = setInterval(step, 10);
            return timer;
        };
    }();

    submitButton.addEventListener('click', resetForm);
    contactScroll.addEventListener('click', function () {
        smoothScroll(contactContainer.offsetTop);
    });
})();

/***/ }),

/***/ "./public/static/scripts/notifications.js":
/*!************************************************!*\
  !*** ./public/static/scripts/notifications.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notifications = function () {
    function notifications(options) {
        _classCallCheck(this, notifications);

        this.settings = {
            container: null,
            notification: null,
            timeout: 0,
            type: 'alert',
            content: "",
            posX: 'right',
            posY: 'bottom'
        };

        this.count = 0;
        this._applySettings(options);
        this.open = this._open.bind(this);
        this.close = this._close.bind(this);
    }

    _createClass(notifications, [{
        key: '_applySettings',
        value: function _applySettings(options) {
            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                for (var i in options) {
                    if (options.hasOwnProperty(i)) {
                        this.settings[i] = options[i];
                    }
                }
            }
        }
    }, {
        key: '_buildOut',
        value: function _buildOut() {
            var _container = document.createElement('div');
            var _contentHolder = document.createElement('div');
            var _content;

            _container.className = 'notification-container';
            _contentHolder.className = 'notification';

            this.settings.container = _container;
            this.settings.container.style.position = "fixed";

            if (this.settings.content === "string") {
                _content = this.settings.content;
            } else {
                _content = this.settings.content.innerHTML;
            }

            this._checkOptions(_contentHolder);

            _contentHolder.innerHTML = _content;
            this.settings.container.appendChild(_contentHolder);
            document.body.appendChild(this.settings.container);
        }
    }, {
        key: '_checkOptions',
        value: function _checkOptions(item) {
            switch (this.settings.type) {
                case "success":
                    item.classList.add('success');
                    break;
                case "danger":
                    item.classList.add('danger');
                    break;
                case "warning":
                    item.classList.add('warning');
                    break;
                default:
                    item.classList.add('alert');
            }

            switch (this.settings.posX) {
                case "right":
                    this.settings.container.style.right = 20 + "px";
                    break;
                case "left":
                    this.settings.container.style.left = 20 + "px";
                    break;
                default:
                    this.settings.container.style.right = 20 + "px";
            }

            switch (this.settings.posY) {
                case "top":
                    this.settings.container.style.top = 20 + "px";
                    break;
                case "bottom":
                    this.settings.container.style.bottom = 20 + "px";
                    break;
                default:
                    this.settings.container.style.bottom = 20 + "px";
            }
        }
    }, {
        key: '_open',
        value: function _open() {
            var _this = this;

            var notifyId = "notification-" + this.count;
            this._buildOut.call(this);

            setTimeout(function () {
                _this.settings.container.classList.add('shown');
                _this.settings.container.setAttribute('id', notifyId);
            }, 100);

            if (this.settings.timeout > 0) {
                setTimeout(function () {
                    _this.close(notifyId);
                }, this.settings.timeout);
            }

            this.count += 1;

            return notifyId;
        }
    }, {
        key: '_close',
        value: function _close(notificationId) {
            var notification = document.getElementById(notificationId);

            if (notification) {
                notification.classList.remove('shown');

                setTimeout(function () {
                    notification.parentNode.removeChild(notification);
                }, 600);

                return true;
            } else {
                return false;
            }
        }
    }]);

    return notifications;
}();

exports.default = notifications;

/***/ }),

/***/ "./public/static/scripts/validator.js":
/*!********************************************!*\
  !*** ./public/static/scripts/validator.js ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onBlur = onBlur;
var formWrapper = document.querySelectorAll('.input-wrapper');
var submitButton = document.getElementById('.contact-submit');

function onBlur(nodes, callback) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var node = _step.value;

            node.addEventListener('blur', function () {
                inputBlur(node, callback);
            });
        };

        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function validateEmail(node) {
    var value = node.value;
    var atpos = value.indexOf('@');
    var dotpos = value.lastIndexOf('.');

    if (atpos < 1 || dotpos - atpos < 2) {
        if (node.parentNode.classList.contains('blank')) {
            node.parentNode.classList.remove('blank');
        }

        node.parentNode.classList.add('invalid');
    } else {
        if (node.parentNode.classList.contains('blank')) {
            node.parentNode.classList.remove('blank');
        }

        if (node.parentNode.classList.contains('invalid')) {
            node.parentNode.classList.remove('invalid');
        }

        node.parentNode.classList.add('valid');
    }
}

function validatePhone(node) {
    var phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var parent = node.parentNode;

    if (node.value.match(phoneRe)) {
        if (parent.classList.contains('invalid')) {
            parent.classList.remove('invalid');
            parent.classList.add('valid');
        }

        parent.classList.add('valid');
    } else {
        if (parent.classList.contains('valid')) {
            parent.classList.remove('valid');
            parent.classList.add('invalid');
        }

        parent.classList.add('invalid');
    }
}

function inputBlur(node, callback) {
    var formContent = node.value;
    var parent = node.parentNode;

    if (formContent == '') {
        parent.classList.add('blank');
    }

    if (parent.classList.contains('form-email')) {
        validateEmail(node);
    }

    if (parent.classList.contains('form-phone')) {
        validatePhone(node);
    }

    if (formContent !== '' && !parent.classList.contains('form-email') && !parent.classList.contains('form-phone')) {
        if (parent.classList.contains('blank')) {
            parent.classList.remove('blank');
        }

        parent.classList.add('valid');
    }

    if (typeof callback === 'function') {
        callback(node);
    }

    checkValidForm();
}

function checkValidForm() {
    var length = formWrapper.length;
    var valid = 0;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = formWrapper[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var wrapper = _step2.value;

            if (wrapper.classList.contains('valid')) {
                valid++;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    if (valid === length) {
        submitButton.classList.add('form-valid');
    }
}

/***/ })

},["./public/static/scripts/contact.js"]);
//# sourceMappingURL=contact.js.map