'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = song;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	instruments: [],
	bpm: 0,
	time: 0,
	divisionnumber: 0,
	divisionperbeat: 0,
	beatpermeasure: 0,
	loaded: false
};

function song() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];

	var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case 'INIT_SONG':
			var _payload$song = payload.song;
			var bpm = _payload$song.bpm;
			var time = _payload$song.time;
			var beatpermeasure = _payload$song.beatpermeasure;
			var divisionperbeat = _payload$song.divisionperbeat;
			var instruments = _payload$song.instruments;
			var divisionnumber = bpm * time / 60 * divisionperbeat;

			// Deep copy array of instruments
			var songInstruments = JSON.parse(JSON.stringify(instruments));

			songInstruments.forEach(function (i) {
				i.bits = [].concat(_toConsumableArray(Array(divisionnumber).keys())).map(function (d) {
					return i.bits[d] || 0;
				});
			});

			return {
				bpm: bpm,
				time: time,
				beatpermeasure: beatpermeasure,
				divisionperbeat: divisionperbeat,
				instruments: songInstruments,
				divisionnumber: divisionnumber
			};
		case 'SOUND_LOADED':
			var buffer = payload.buffer;
			var instrument = payload.instrument;

			return _extends({}, state, {
				instruments: state.instruments.map(function (i) {
					if (i.id === instrument.id) {
						return _extends({}, i, {
							buffer: buffer
						});
					}
					return i;
				})
			});
		case 'SONG_LOADED':
			return _extends({}, state, {
				loaded: true
			});
		case 'BIT_CHANGED':
			var instrumentIndex = payload.instrumentIndex;
			var bitIndex = payload.bitIndex;

			return _extends({}, state, {
				instruments: state.instruments.map(function (ins, i) {
					if (i === instrumentIndex) {
						var newInstrument = _extends({}, ins, {
							bits: [].concat(_toConsumableArray(ins.bits))
						});
						newInstrument.bits[bitIndex] = newInstrument.bits[bitIndex] ? 0 : 1;
						return newInstrument;
					}
					return ins;
				})
			});
		case 'MEASURE_PASTED':
			var pasteIndex = payload.pasteIndex;
			var bits = payload.bits;

			var startIndex = pasteIndex * state.beatpermeasure * state.divisionperbeat;
			var endIndex = startIndex + state.beatpermeasure * state.divisionperbeat;

			return _extends({}, state, {
				instruments: state.instruments.map(function (ins, index) {
					return _extends({}, ins, {
						bits: [].concat(_toConsumableArray(ins.bits.slice(0, startIndex)), _toConsumableArray(bits[index]), _toConsumableArray(ins.bits.slice(endIndex)))
					});
				})
			});
		case 'CLEAR_MEASURE':
			var index = payload;
			return _extends({}, state, {
				instruments: state.instruments.map(function (ins) {
					var newInstrument = _extends({}, ins, {
						bits: [].concat(_toConsumableArray(ins.bits))
					});
					var divIndex = index * state.beatpermeasure * state.divisionperbeat;
					for (var i = divIndex; i < divIndex + state.beatpermeasure * state.divisionperbeat; i++) {
						newInstrument.bits[i] = 0;
					}
					return newInstrument;
				})
			});
		default:
			return state;
	}
}