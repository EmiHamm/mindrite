webpackJsonp([2],{

/***/ "./public/static/scripts/admin.js":
/*!****************************************!*\
  !*** ./public/static/scripts/admin.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = admin;

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function admin() {
    async function checkAdmin() {
        var token = window.localStorage.getItem('token');
        try {
            var response = _axios2.default.get('/checkAdmin', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.success) {
                return;
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async function getMessages() {}
}

/***/ })

},["./public/static/scripts/admin.js"]);
//# sourceMappingURL=admin.js.map