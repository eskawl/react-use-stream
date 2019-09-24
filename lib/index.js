"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _lodash = require("lodash");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStream = function useStream(getPage, options) {
  var defaultOptions = {
    dataLocation: 'data',
    totalRecordsLocation: 'total'
  };

  var determinedOpts = _objectSpread({}, defaultOptions, {}, options);

  var dataLocation = determinedOpts.dataLocation,
      totalRecordsLocation = determinedOpts.totalRecordsLocation;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      totalRecords = _useState2[0],
      setTotalRecords = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      rows = _useState4[0],
      setRows = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isStreaming = _useState6[0],
      setIsStreaming = _useState6[1];

  var _useState7 = (0, _react.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      isLoading = _useState8[0],
      setIsLoading = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  (0, _react.useEffect)(function () {
    var currentPage = 1;
    var totalPages = 1;

    var fetchPage =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* () {
        var response = yield getPage(currentPage);
        var pageRows = (0, _lodash.get)(response, dataLocation);
        setRows(function (prevRows) {
          return prevRows.concat(pageRows);
        });

        if (currentPage === 1) {
          var determinedTotalRecords = (0, _lodash.get)(response, totalRecordsLocation);
          setTotalRecords(determinedTotalRecords);
          totalPages = Math.ceil(determinedTotalRecords / pageRows.length);
        }
      });

      return function fetchPage() {
        return _ref.apply(this, arguments);
      };
    }();

    _asyncToGenerator(function* () {
      try {
        yield fetchPage();
        setIsLoading(false);

        while (currentPage < totalPages) {
          setIsStreaming(true);
          currentPage += 1; // eslint-disable-next-line no-await-in-loop

          yield fetchPage(currentPage);
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsStreaming(false);
      }
    })();
  }, [getPage, dataLocation, totalRecordsLocation]);
  return [rows, {
    totalRecords: totalRecords,
    isStreaming: isStreaming,
    isLoading: isLoading,
    progress: rows.length / totalRecords,
    error: error
  }];
};

var _default = useStream;
exports.default = _default;