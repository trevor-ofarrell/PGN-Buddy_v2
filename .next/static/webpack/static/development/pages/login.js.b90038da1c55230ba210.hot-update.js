webpackHotUpdate("static/development/pages/login.js",{

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons */ "./node_modules/@material-ui/icons/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/next/dist/build/polyfills/fetch/index.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/oem/PGN-Buddy_v2/pages/login.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["makeStyles"])(theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  }
}));
function LoginTab() {
  const classes = useStyles();

  function handleSubmit(values, actions) {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };

    for (let key in values) {
      options.body.append(key, values[key]);
      con;
    }

    isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default()('https://localhost:5001/login', options).then(response => console.log(response)).catch(error => console.error(error));
  }

  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
    className: classes.padding,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: classes.margin,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    container: true,
    spacing: 8,
    alignItems: "flex-end",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 21
    }
  }, __jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_2__["Face"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 25
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    md: true,
    sm: true,
    xs: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    id: "username",
    label: "Username",
    type: "email",
    fullWidth: true,
    autoFocus: true,
    required: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 25
    }
  }))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    container: true,
    spacing: 8,
    alignItems: "flex-end",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 21
    }
  }, __jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_2__["Fingerprint"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 25
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    md: true,
    sm: true,
    xs: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    id: "username",
    label: "Password",
    type: "password",
    fullWidth: true,
    required: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 25
    }
  }))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    container: true,
    alignItems: "center",
    justify: "space-between",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["FormControlLabel"], {
    control: __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
      color: "primary",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 29
      }
    }),
    label: "Remember me",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 25
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    disableFocusRipple: true,
    disableRipple: true,
    style: {
      textTransform: "none"
    },
    variant: "text",
    color: "primary",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 25
    }
  }, "Forgot password ?"))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    container: true,
    justify: "center",
    style: {
      marginTop: '10px'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "outlined",
    color: "primary",
    onClick: handleSubmit(),
    style: {
      textTransform: "none"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 21
    }
  }, "Login"))));
}

/***/ })

})
//# sourceMappingURL=login.js.b90038da1c55230ba210.hot-update.js.map