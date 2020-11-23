define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MouseEvents = (function () {
        function MouseEvents() {
        }
        MouseEvents.prototype.mousemoveEvent = function (element, sx, sy, cx, cy, isCtrlKey) {
            var mousemove = document.createEvent('MouseEvent');
            mousemove.initMouseEvent('mousemove', true, false, window, 1, sx, sy, cx, cy, isCtrlKey, false, true, false, 0, null);
            element.dispatchEvent(mousemove);
        };
        MouseEvents.prototype.clickEvent = function (element, sx, sy, cx, cy) {
            var click = document.createEvent('MouseEvent');
            click.initMouseEvent('click', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.onTouchStart = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchstart',
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ],
                preventDefault: function () {
                }
            };
        };
        MouseEvents.prototype.onTouchEnd = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchend',
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ],
                preventDefault: function () {
                }
            };
        };
        return MouseEvents;
    }());
    exports.MouseEvents = MouseEvents;
});
