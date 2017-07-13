webpackJsonp([0],{

/***/ "./public/static/scripts/login.js":
/*!****************************************!*\
  !*** ./public/static/scripts/login.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = login;

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _notifications = __webpack_require__(/*! ./notifications */ "./public/static/scripts/notifications.js");

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login() {
    var formWrapper = document.querySelectorAll('.form-wrapper');
    var formInputs = document.querySelectorAll('.form-wrapper input');
    var passwordInput = document.getElementById('password');
    var submitButton = document.getElementById('login-submit');
    var loginState = {
        email: '',
        password: ''
    };

    async function login() {
        if (submitButton.classList.includes('form-valid')) {
            submitButton.classList.add('loading');

            try {
                var response = await _axios2.default.post('/login', loginState, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    submitButton.classList.remove('loading');
                    window.localStorage.setItem('token', response.data.res.token);
                    window.localStorage.setItem('user', JSON.stringify(response.data.res.user));
                    window.location.href = '/admin';
                } else {
                    var failure = new Event('login-failure');
                    submitButton.classList.remove('loading');
                    window.dispatchEvent(failure);
                }
            } catch (err) {
                var error = new Event('login-error');
                submitButton.classList.remove('loading');
                window.dispatchEvent(error);
            }
        } else {
            var formErrors = new Event('invalid-form');
            window.dispatchEvent(formErrors);
        }
    }

    function showPassword() {
        passwordInput.type = "text";
    }

    function hidePassword() {
        passwordInput.type = "password";
    }
}

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

/***/ })

},["./public/static/scripts/login.js"]);
//# sourceMappingURL=login.js.map