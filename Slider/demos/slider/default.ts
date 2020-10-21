import { Slider, SliderType } from '../../src/slider/slider';
import { Button } from '@syncfusion/ej2-buttons';


     // Initialize Slider component
    let defaultObj: Slider = new Slider({
        // Set the value for slider
        value: 30
    });
    defaultObj.appendTo('#default');

    // Initialize Slider component
    let minRangeObj: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set the type to render MinRange slider
        type: 'MinRange'
    });
    minRangeObj.appendTo('#minrange');

    // Initialize Slider component
    let rangeObj: Slider = new Slider({
        // Set the initial range values for slider
        value: [30, 70],
        // Set the type to render range slider
        type: 'Range'
    });
    rangeObj.appendTo('#range');