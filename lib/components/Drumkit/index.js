'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

var _InstrumentBitsList = require('../InstrumentBitsList');

var _InstrumentBitsList2 = _interopRequireDefault(_InstrumentBitsList);

var _InstrumentInfos = require('../InstrumentInfos');

var _InstrumentInfos2 = _interopRequireDefault(_InstrumentInfos);

var _CurrentBit = require('../CurrentBit');

var _CurrentBit2 = _interopRequireDefault(_CurrentBit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var s = {
	container: {
		display: 'flex',
		position: 'relative'
	},
	instruments: {
		width: '1000px',
		overflowX: 'auto',
		overflowY: 'hidden',
		position: 'relative'
	},

	leftContent: {}
};

var timeWidth = 6200;

var DrumKit = function (_React$Component) {
	_inherits(DrumKit, _React$Component);

	function DrumKit() {
		_classCallCheck(this, DrumKit);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(DrumKit).apply(this, arguments));
	}

	_createClass(DrumKit, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.dispatch(actions.initDrumkit({ id: 0 }));
		}
	}, {
		key: 'render',
		value: function render() {
			var timeStyle = {
				width: timeWidth
			};

			return _react2.default.createElement(
				'div',
				{ style: s.container },
				_react2.default.createElement(
					'div',
					{ style: s.leftContent },
					_react2.default.createElement(_InstrumentInfos2.default, null)
				),
				_react2.default.createElement(
					'div',
					{ style: s.instruments, id: 'rightPanel' },
					_react2.default.createElement(
						'div',
						{ style: timeStyle },
						_react2.default.createElement(_CurrentBit2.default, { timeWidth: timeWidth }),
						_react2.default.createElement(_InstrumentBitsList2.default, { timeWidth: timeWidth })
					)
				)
			);
		}
	}], [{
		key: 'getBitsOffset',
		value: function getBitsOffset() {
			var el = document.getElementById('rightPanel');
			return el && el.offsetLeft;
		}
	}]);

	return DrumKit;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)()(DrumKit);