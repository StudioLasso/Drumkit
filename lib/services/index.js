'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchSongs = fetchSongs;
exports.loadAudioContext = loadAudioContext;
exports.fetchSound = fetchSound;
exports.playSound = playSound;
exports.getWebAudioTime = getWebAudioTime;
exports.waitTimer = waitTimer;
exports.initTimer = initTimer;
exports.startTimer = startTimer;
exports.stopTimer = stopTimer;

var _timerworker = require('./timerworker.js');

var _timerworker2 = _interopRequireDefault(_timerworker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('firebase');


var audioCtx = void 0,
    timer = void 0,
    tickResolve = void 0;

function fetchSongs() {
	return new Promise(function (resolve, reject) {
		var myDataRef = new Firebase('https://shining-heat-7214.firebaseio.com/songs');
		myDataRef.on("value", function (snap) {
			resolve(snap.val());
		}, function (err) {
			reject(err);
		});
	});
}

function loadAudioContext() {
	if (!audioCtx) {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
	}
}

function fetchSound(url) {
	var accesstoken = 'JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR';

	return fetch(url, {
		method: 'get',
		headers: {
			'Authorization': 'Bearer ' + accesstoken
		}
	}).then(function (r) {
		return r.arrayBuffer();
	}).then(function (buffer) {
		return new Promise(function (resolve) {
			audioCtx.decodeAudioData(buffer, function (audioBuffer) {
				resolve(audioBuffer);
			});
		});
	});
}

/**
 * Play a webAudio buffer
 * @param  {AudioBufferSourceNode} buffer
 * @param  {Number} delay  delay in seconds
 */
function playSound(buffer) {
	var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	var source = audioCtx.createBufferSource(); // creates a sound source
	source.buffer = buffer; // tell the source which sound to play
	source.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
	source.start(audioCtx.currentTime + delay);
}

function getWebAudioTime() {
	return audioCtx ? audioCtx.currentTime : 0;
}

function waitTimer() {
	return new Promise(function (resolve) {
		tickResolve = resolve;
	});
}

function initTimer() {
	timer = new Worker(_timerworker2.default);
	timer.onmessage = function (e) {
		if (e.data === 'tick' && tickResolve) {
			console.log('tick');
			tickResolve();
			tickResolve = undefined;
		}
	};
}

function startTimer() {
	if (timer) {
		console.log('startTimer');
		timer.postMessage("start");
	}
}

function stopTimer() {
	if (timer) {
		timer.postMessage('stop');
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQU9nQixVLEdBQUEsVTtRQVdBLGdCLEdBQUEsZ0I7UUFRQSxVLEdBQUEsVTtRQXdCQSxTLEdBQUEsUztRQU9BLGUsR0FBQSxlO1FBSUEsUyxHQUFBLFM7UUFNQSxTLEdBQUEsUztRQVdBLFUsR0FBQSxVO1FBT0EsUyxHQUFBLFM7O0FBcEZoQjs7Ozs7O0FBREEsUUFBUSxVQUFSOzs7QUFHQSxJQUFJLGlCQUFKO0lBQ0MsY0FERDtJQUVDLG9CQUZEOztBQUlPLFNBQVMsVUFBVCxHQUFzQjtBQUM1QixRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBTSxZQUFZLElBQUksUUFBSixDQUFhLGdEQUFiLENBQWxCO0FBQ0EsWUFBVSxFQUFWLENBQWEsT0FBYixFQUFzQixnQkFBUTtBQUM3QixXQUFRLEtBQUssR0FBTCxFQUFSO0FBQ0EsR0FGRCxFQUVHLGVBQU87QUFDVCxVQUFPLEdBQVA7QUFDQSxHQUpEO0FBS0EsRUFQTSxDQUFQO0FBUUE7O0FBRU0sU0FBUyxnQkFBVCxHQUE0QjtBQUNsQyxLQUFJLENBQUUsUUFBTixFQUFpQjs7QUFFaEIsU0FBTyxZQUFQLEdBQXNCLE9BQU8sWUFBUCxJQUF1QixPQUFPLGtCQUFwRDtBQUNBLGFBQVcsSUFBSSxZQUFKLEVBQVg7QUFDQTtBQUNEOztBQUVNLFNBQVMsVUFBVCxDQUFvQixHQUFwQixFQUF5QjtBQUMvQixLQUFNLGNBQWMsa0VBQXBCOztBQUVBLFFBQU8sTUFBTSxHQUFOLEVBQVc7QUFDakIsVUFBUSxLQURTO0FBRWpCLFdBQVM7QUFDUixnQ0FBMkI7QUFEbkI7QUFGUSxFQUFYLEVBTUwsSUFOSyxDQU1BO0FBQUEsU0FBSSxFQUFFLFdBQUYsRUFBSjtBQUFBLEVBTkEsRUFPTCxJQVBLLENBT0Esa0JBQVU7QUFDZixTQUFPLElBQUksT0FBSixDQUFZLG1CQUFXO0FBQzdCLFlBQVMsZUFBVCxDQUF5QixNQUF6QixFQUFpQyx1QkFBZTtBQUMvQyxZQUFRLFdBQVI7QUFDRyxJQUZKO0FBR0EsR0FKTSxDQUFQO0FBS0EsRUFiSyxDQUFQO0FBY0E7Ozs7Ozs7QUFPTSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBb0M7QUFBQSxLQUFULEtBQVMseURBQUgsQ0FBRzs7QUFDMUMsS0FBTSxTQUFTLFNBQVMsa0JBQVQsRUFBZixDO0FBQ0EsUUFBTyxNQUFQLEdBQWdCLE1BQWhCLEM7QUFDQSxRQUFPLE9BQVAsQ0FBZSxTQUFTLFdBQXhCLEU7QUFDQSxRQUFPLEtBQVAsQ0FBYSxTQUFTLFdBQVQsR0FBdUIsS0FBcEM7QUFDQTs7QUFFTSxTQUFTLGVBQVQsR0FBMkI7QUFDakMsUUFBTyxXQUFXLFNBQVMsV0FBcEIsR0FBa0MsQ0FBekM7QUFDQTs7QUFFTSxTQUFTLFNBQVQsR0FBcUI7QUFDM0IsUUFBTyxJQUFJLE9BQUosQ0FBWSxtQkFBVztBQUM3QixnQkFBYyxPQUFkO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRU0sU0FBUyxTQUFULEdBQXFCO0FBQzNCLFNBQVEsSUFBSSxNQUFKLHVCQUFSO0FBQ0EsT0FBTSxTQUFOLEdBQWtCLGFBQUs7QUFDdEIsTUFBSSxFQUFFLElBQUYsS0FBVyxNQUFYLElBQXFCLFdBQXpCLEVBQXNDO0FBQ3JDLFdBQVEsR0FBUixDQUFZLE1BQVo7QUFDQTtBQUNBLGlCQUFjLFNBQWQ7QUFDQTtBQUNFLEVBTko7QUFPQTs7QUFFTSxTQUFTLFVBQVQsR0FBc0I7QUFDNUIsS0FBSSxLQUFKLEVBQVc7QUFDVixVQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsUUFBTSxXQUFOLENBQWtCLE9BQWxCO0FBQ0E7QUFDRDs7QUFFTSxTQUFTLFNBQVQsR0FBcUI7QUFDM0IsS0FBSSxLQUFKLEVBQVc7QUFDVixRQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFDQTtBQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnZmlyZWJhc2UnKTtcbmltcG9ydCBXb3JrZXJCbG9iVXJsIGZyb20gJy4vdGltZXJ3b3JrZXIuanMnO1xuXG5sZXQgYXVkaW9DdHgsXG5cdHRpbWVyLFxuXHR0aWNrUmVzb2x2ZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoU29uZ3MoKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgbXlEYXRhUmVmID0gbmV3IEZpcmViYXNlKCdodHRwczovL3NoaW5pbmctaGVhdC03MjE0LmZpcmViYXNlaW8uY29tL3NvbmdzJyk7XG5cdFx0bXlEYXRhUmVmLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XG5cdFx0XHRyZXNvbHZlKHNuYXAudmFsKCkpO1xuXHRcdH0sIGVyciA9PiB7XG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9KTtcblx0fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRBdWRpb0NvbnRleHQoKSB7XG5cdGlmKCAhIGF1ZGlvQ3R4ICkge1xuXHRcdC8vIEZpeCB1cCBmb3IgcHJlZml4aW5nXG5cdFx0d2luZG93LkF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcblx0XHRhdWRpb0N0eCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hTb3VuZCh1cmwpIHtcblx0Y29uc3QgYWNjZXNzdG9rZW4gPSAnSmZuRHBBblpjUThBQUFBQUFBQUJZYnQ2WnZxNi1VMTBEZUZnemNaRWJ6N1hZWnJUdjl1Z1B1dVJsMGFpOUJGUic7XG5cblx0cmV0dXJuIGZldGNoKHVybCwge1xuXHRcdG1ldGhvZDogJ2dldCcsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjZXNzdG9rZW59YFxuXHRcdH1cblx0fSlcdFxuXHRcdC50aGVuKHI9PiByLmFycmF5QnVmZmVyKCkpXG5cdFx0LnRoZW4oYnVmZmVyID0+IHtcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdFx0YXVkaW9DdHguZGVjb2RlQXVkaW9EYXRhKGJ1ZmZlciwgYXVkaW9CdWZmZXIgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoYXVkaW9CdWZmZXIpO1xuXHRcdCAgICBcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbi8qKlxuICogUGxheSBhIHdlYkF1ZGlvIGJ1ZmZlclxuICogQHBhcmFtICB7QXVkaW9CdWZmZXJTb3VyY2VOb2RlfSBidWZmZXJcbiAqIEBwYXJhbSAge051bWJlcn0gZGVsYXkgIGRlbGF5IGluIHNlY29uZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBsYXlTb3VuZChidWZmZXIsIGRlbGF5PTApIHtcblx0Y29uc3Qgc291cmNlID0gYXVkaW9DdHguY3JlYXRlQnVmZmVyU291cmNlKCk7IFx0Ly8gY3JlYXRlcyBhIHNvdW5kIHNvdXJjZVxuXHRzb3VyY2UuYnVmZmVyID0gYnVmZmVyOyAgICAgICAgICAgICAgICAgIFx0XHQvLyB0ZWxsIHRoZSBzb3VyY2Ugd2hpY2ggc291bmQgdG8gcGxheVxuXHRzb3VyY2UuY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbik7ICAgICAgIFx0Ly8gY29ubmVjdCB0aGUgc291cmNlIHRvIHRoZSBjb250ZXh0J3MgZGVzdGluYXRpb24gKHRoZSBzcGVha2Vycylcblx0c291cmNlLnN0YXJ0KGF1ZGlvQ3R4LmN1cnJlbnRUaW1lICsgZGVsYXkpOyBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlYkF1ZGlvVGltZSgpIHtcblx0cmV0dXJuIGF1ZGlvQ3R4ID8gYXVkaW9DdHguY3VycmVudFRpbWUgOiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdFRpbWVyKCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0dGlja1Jlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUaW1lcigpIHtcblx0dGltZXIgPSBuZXcgV29ya2VyKFdvcmtlckJsb2JVcmwpO1xuXHR0aW1lci5vbm1lc3NhZ2UgPSBlID0+IHsgXG5cdFx0aWYgKGUuZGF0YSA9PT0gJ3RpY2snICYmIHRpY2tSZXNvbHZlKSB7XG5cdFx0XHRjb25zb2xlLmxvZygndGljaycpO1xuXHRcdFx0dGlja1Jlc29sdmUoKTtcblx0XHRcdHRpY2tSZXNvbHZlID0gdW5kZWZpbmVkO1xuXHRcdH1cbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRUaW1lcigpIHtcblx0aWYgKHRpbWVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ3N0YXJ0VGltZXInKTtcblx0XHR0aW1lci5wb3N0TWVzc2FnZShcInN0YXJ0XCIpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wVGltZXIoKSB7XG5cdGlmICh0aW1lcikge1xuXHRcdHRpbWVyLnBvc3RNZXNzYWdlKCdzdG9wJyk7XG5cdH1cbn0iXX0=