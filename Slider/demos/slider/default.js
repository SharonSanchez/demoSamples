define(["require", "exports", "../../src/slider/slider"], function (require, exports, slider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Initialize Slider component
    var defaultObj = new slider_1.Slider({
        // Set the value for slider
        value: 30
    });
    defaultObj.appendTo('#default');
    // Initialize Slider component
    var minRangeObj = new slider_1.Slider({
        // Set the value for slider
        value: 30,
        // Set the type to render MinRange slider
        type: 'MinRange'
    });
    minRangeObj.appendTo('#minrange');
    // Initialize Slider component
    var rangeObj = new slider_1.Slider({
        // Set the initial range values for slider
        value: [30, 70],
        // Set the type to render range slider
        type: 'Range'
    });
    rangeObj.appendTo('#range');
});
