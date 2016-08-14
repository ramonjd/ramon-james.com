import synth from './synthetic-dom-events'
import { root } from './'


var on = function(element, name, fn, capture) {
    return element.addEventListener(name, fn, capture || false);
};

var off = function(element, name, fn, capture) {
    return element.removeEventListener(name, fn, capture || false);
};

var once = function (element, name, fn, capture) {
    function tmp (ev) {
        off(element, name, tmp, capture);
        fn(ev);
    }
    on(element, name, tmp, capture);
};

var emit = function(element, name, opt) {
    var ev = synth(name, opt);
    element.dispatchEvent(ev);
};

// if (!root || !root.document || !root.document.addEventListener) {
//     on = function(element, name, fn) {
//         return element.attachEvent('on' + name, fn);
//     };
// }
//
// if (!root || !root.document || !root.document.removeEventListener) {
//     off = function(element, name, fn) {
//         return element.detachEvent('on' + name, fn);
//     };
// }
//
// if (!root || !root.document || !root.document.dispatchEvent) {
//     emit = function(element, name, opt) {
//         var ev = synth(name, opt);
//         return element.fireEvent('on' + ev.type, ev);
//     };
// }

const events = {
    on: on,
    off: off,
    once: once,
    emit: emit
}
export default events
