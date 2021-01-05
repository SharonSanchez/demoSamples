import { HeatMap, Adaptor, ITooltipEventArgs } from '../../src/heatmap/index';
import { Legend,ILegendRenderEventArgs } from '../../src/heatmap/index';
import { Tooltip } from '../../src/heatmap/index';
import { SampleDataSource } from './dataSource';
import { EmitType } from '@syncfusion/ej2-base';

HeatMap.Inject(Tooltip, Legend, Adaptor);
/**
 * Sample for Line serie
 */
// let legendRender: EmitType<ILegendRenderEventArgs> = (args: ILegendRenderEventArgs): void => {
    
//         // args.text = 'legend';
//         // args.cancel = true;
//         if (args.text == '50' || args.text == '33.33'||args.text == '40' || args.text == '80') {
//             args.cancel=true;
//             args.text="legend"
//         }
// };

let ds: SampleDataSource = new SampleDataSource();
let heatmap: HeatMap = new HeatMap({
    titleSettings: {
        text: 'Sales Revenue per Employee (in 1000 US$)',
    },
    xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
    },
    yAxis: {

        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    dataSource: ds.heatmapData,
    paletteSettings: {
        palette: [
            { color: '#DCD57E' },
            { color: '#A6DC7E' },
            { color: '#7EDCA2' },
            { color: '#C06C84' },
            { color: '#355C7D' },
            { color: '#6EB5D0' }

                            // { color: '#DCD57E',value:0 },
                // { color: '#A6DC7E', value:20 },
                // { color: '#7EDCA2', value:40 },
                // { color: '#C06C84', value:60 },
                // { color: '#355C7D' , value:80},
                // { color: '#6EB5D0' , value:100}
        ],
    },
    allowSelection:true,
    showTooltip: true,
    rowMinMax:true,
    // legendRender: legendRender,
    legendSettings: {
        render :true,
        position: 'Right',
        visible:true
    },
    // cellSettings: {
    //     bubbleSize: {
    //         minimum: '50%',
    //         maximum: '80%',
    //     },
    //     border: {
    //         width: 1
    //     },
    //     showLabel: true,
    //     tileType: 'Bubble',
    //     bubbleType: 'Size'
    // },
});
heatmap.appendTo("#1container");
document.getElementById('clearSelection').onclick = () => {
heatmap.clearSelection();}
let heatmapWidth: HTMLSelectElement = document.getElementById('heatmapWidth') as HTMLSelectElement;
heatmapWidth.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.width = heatmapWidth.value;
    }
};
// let tabl: any = document.getElementById('tablewise');
// tabl.onclick = () => {
//     heatmap.paletteSettings.colorGradientMode = 'Table';
//     heatmap.refresh();
// };
// let column: any = document.getElementById('col');
// column.onclick = () => {
//     heatmap.paletteSettings.colorGradientMode = 'Column';
// };
// let row: any = document.getElementById('row');
// row.onclick = () => {
//     heatmap.paletteSettings.colorGradientMode = 'Row';
// };

let heatmapHeight: HTMLSelectElement = document.getElementById('heatmapHeight') as HTMLSelectElement;
heatmapHeight.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.height = heatmapHeight.value;
    }
};


let renderingmode: HTMLSelectElement = document.getElementById('renderingMode') as HTMLSelectElement;
renderingmode.onchange = () => {
    if (renderingmode.value === 'SVG') {
        heatmap.renderingMode = "SVG";
    }
    if (renderingmode.value === 'Canvas') {
        heatmap.renderingMode = "Canvas";
    }
};
let colormode: HTMLSelectElement = document.getElementById('Colormode') as HTMLSelectElement;
colormode.onchange = () => {
    if (colormode.value === 'Table') {
        heatmap.paletteSettings.colorGradientMode = 'Table';
        heatmap.refresh();    }
    if (colormode.value === 'Column') {
        heatmap.paletteSettings.colorGradientMode = 'Column';
        heatmap.refresh();    }
    if (colormode.value === 'Row') {
        heatmap.paletteSettings.colorGradientMode = 'Row';
        heatmap.refresh();    }
};

let legendPosition: HTMLSelectElement = document.getElementById('legendPosition') as HTMLSelectElement;
legendPosition.onchange = () => {
    if (legendPosition.value === 'Right') {
        heatmap.legendSettings.position = "Right";
    }
    if (legendPosition.value === 'Left') {
        heatmap.legendSettings.position = "Left";
    }
    if (legendPosition.value === 'Bottom') {
        heatmap.legendSettings.position = "Bottom";
    }
    if (legendPosition.value === 'Top') {
        heatmap.legendSettings.position = "Top";
    }
};

let labelDisplayType: HTMLSelectElement = document.getElementById('labelDisplay') as HTMLSelectElement;
labelDisplayType.onchange = () => {
    if (labelDisplayType.value === 'All') {
        heatmap.legendSettings.labelDisplayType = "All";
    }
    if (labelDisplayType.value === 'Edge') {
        heatmap.legendSettings.labelDisplayType = "Edge";
    }
    if (labelDisplayType.value === 'None') {
        heatmap.legendSettings.labelDisplayType = "None";
    }
};

let alignment: HTMLSelectElement = document.getElementById('alignment') as HTMLSelectElement;
alignment.onchange = () => {
    if (alignment.value === 'Far') {
        heatmap.legendSettings.alignment = "Far";
    }
    if (alignment.value === 'Near') {
        heatmap.legendSettings.alignment = "Near";
    }
    if (alignment.value === 'Center') {
        heatmap.legendSettings.alignment = "Center";
    }
};

let textOverflow: HTMLSelectElement = document.getElementById('textOverflow') as HTMLSelectElement;
textOverflow.onchange = () => {
    if (textOverflow.value === 'None') {
        heatmap.legendSettings.textStyle.textOverflow = "None";
    }
    if (textOverflow.value === 'Trim') {
        heatmap.legendSettings.textStyle.textOverflow = "Trim";
    }
    if (textOverflow.value === 'Wrap') {
        heatmap.legendSettings.textStyle.textOverflow = "Wrap";
    }
};


let legendWidth: HTMLSelectElement = document.getElementById('legendWidth') as HTMLSelectElement;
legendWidth.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.legendSettings.width = legendWidth.value;
    }
};

let legendHeight: HTMLSelectElement = document.getElementById('legendHeight') as HTMLSelectElement;
legendHeight.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.legendSettings.height = legendHeight.value;
    }
};


let labelFormat: HTMLSelectElement = document.getElementById('labelFormat') as HTMLSelectElement;
labelFormat.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.legendSettings.labelFormat = legendHeight.value;
    }
};

let smartLegend: any = document.getElementById('smartLegend');
smartLegend.onclick = () => {
    heatmap.legendSettings.enableSmartLegend = smartLegend.checked;
};
let visible: any = document.getElementById('visible');
visible.onclick = () => {
    heatmap.legendSettings.visible = visible.checked;
};
let showLabel: any = document.getElementById('showLabel');
showLabel.onclick = () => {
    heatmap.legendSettings.showLabel = showLabel.checked;
};
let showGradientPointer: any = document.getElementById('showGradientPointer');
showGradientPointer.onclick = () => {
    heatmap.legendSettings.showGradientPointer = showGradientPointer.checked;
};


let paletteType: HTMLSelectElement = document.getElementById('paletteType') as HTMLSelectElement;
paletteType.onchange = () => {
    if (paletteType.value === 'Gradient') {
        heatmap.paletteSettings.type = 'Gradient';
    }
    if (paletteType.value === 'Fixed') {
        heatmap.paletteSettings.type = "Fixed";
    }
};

let paletteCollections: HTMLSelectElement = document.getElementById('paletteCollections') as HTMLSelectElement;
paletteCollections.onchange = () => {
    if (paletteCollections.value === 'colors') {
        heatmap.paletteSettings.palette = [
            { color: '#DCD57E' },
            { color: '#A6DC7E' },
            { color: '#7EDCA2' },
            { color: '#6EB5D0' }
        ]
    }
    if (paletteCollections.value === 'colors and value') {
        heatmap.paletteSettings.palette = [
            { color: '#DCD57E', value:0 },
            { color: '#A6DC7E', value:20 },
            { color: '#7EDCA2' , value:40},
            { color: '#C06C84' , value:60},
            { color: '#355C7D' , value:80},
            { color: '#6EB5D0' , value:100}
        ]
    }
    if (paletteCollections.value === 'colors and label') {
        heatmap.paletteSettings.palette = [
            { color: '#DCD57E', label: 'Testing 1' },
            { color: '#A6DC7E', label: 'Testing 2' },
            { color: '#7EDCA2', label: 'Testing 3' },
            { color: '#6EB5D0', label: 'Testing 4' }
        ]
    }
    if (paletteCollections.value === 'colors, value, label') {
        heatmap.paletteSettings.palette = [
            { value: 10, color: '#DCD57E', label: 'Testing 1' },
            { value: 20, color: '#A6DC7E', label: 'Testing 2' },
            { value: 40, color: '#7EDCA2', label: 'Testing 3' },
            { value: 80, color: '#6EB5D0', label: 'Testing 4' }
        ]
    }
};

let emptyPoint: HTMLSelectElement = document.getElementById('emptyPoint') as HTMLSelectElement;
let emptyPointSubmit: HTMLSelectElement = document.getElementById('emptyPointSubmit') as HTMLSelectElement;
emptyPointSubmit.onclick = () => {
    heatmap.paletteSettings.emptyPointColor = emptyPoint.value;
};

let showLabelCell: any = document.getElementById('showLabelCell');
showLabelCell.onclick = () => {
    heatmap.cellSettings.showLabel = showLabelCell.checked;
};

let enableCellHighlighting: any = document.getElementById('enableCellHighlighting');
enableCellHighlighting.onclick = () => {
    heatmap.cellSettings.enableCellHighlighting = enableCellHighlighting.checked;
};

let isInversedBubbleSize: any = document.getElementById('isInversedBubbleSize');
isInversedBubbleSize.onclick = () => {
    heatmap.cellSettings.isInversedBubbleSize = isInversedBubbleSize.checked;
};

let BubbleType: HTMLSelectElement = document.getElementById('BubbleType') as HTMLSelectElement;
BubbleType.onchange = () => {
    if (BubbleType.value === 'Color') {
        heatmap.cellSettings.bubbleType = "Color";
    }
    if (BubbleType.value === 'Size') {
        heatmap.cellSettings.bubbleType = "Size";
    }
    if (BubbleType.value === 'SizeAndColor') {
        heatmap.cellSettings.bubbleType = "SizeAndColor";
    }
    if (BubbleType.value === 'Sector') {
        heatmap.cellSettings.bubbleType = "Sector";
    }
};

let tileType: HTMLSelectElement = document.getElementById('tileType') as HTMLSelectElement;
tileType.onchange = () => {
    if (tileType.value === 'Bubble') {
        heatmap.cellSettings.tileType = "Bubble";
    }
    if (tileType.value === 'Rect') {
        heatmap.cellSettings.tileType = "Rect";
    }
};


let cellFormat: HTMLSelectElement = document.getElementById('cellFormat') as HTMLSelectElement;
cellFormat.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.cellSettings.format = cellFormat.value;
    }
};
let minimum : HTMLSelectElement = document.getElementById('minimum') as HTMLSelectElement;
minimum.onkeydown = function (event){
    if(event.keyCode == 13)
    {
    heatmap.cellSettings.bubbleSize.minimum = minimum.value;
}
};
let maximum : HTMLSelectElement = document.getElementById('maximum') as HTMLSelectElement;
maximum.onkeydown = function (event){
    if(event.keyCode == 13)
    {
    heatmap.cellSettings.bubbleSize.maximum = maximum.value;
}
};

let xinversed: any = document.getElementById('x-inversed');
xinversed.onclick = () => {
    heatmap.xAxis.isInversed = xinversed.checked;
};
let xopposed: any = document.getElementById('x-opposed');
xopposed.onclick = () => {
    heatmap.xAxis.opposedPosition = xopposed.checked;
};

let intervalType: HTMLSelectElement = document.getElementById('x-intervalType') as HTMLSelectElement;
intervalType.onchange = () => {
    if (intervalType.value === 'Years') {
        heatmap.xAxis.intervalType = "Years";
        heatmap.xAxis.labelFormat = 'yyyy';
    }
    if (intervalType.value === 'Months') {
        heatmap.xAxis.intervalType = "Months";
    }
    if (intervalType.value === 'Days') {
        heatmap.xAxis.intervalType = "Days";
    }
    if (intervalType.value === 'Hours') {
        heatmap.xAxis.intervalType = "Hours";
    }
    else {
        heatmap.xAxis.intervalType = "Minutes";
    }
};

let valueType: HTMLSelectElement = document.getElementById('x-valueType') as HTMLSelectElement;
valueType.onchange = () => {
    if (valueType.value === 'DateTime') {
        heatmap.xAxis = {
            minimum: new Date(2017, 0, 1),
            intervalType: 'Months',
            valueType: 'DateTime',
        };
    }
    else if (valueType.value === 'Numeric') {
        heatmap.xAxis = {
            minimum: null,
            maximum: null,
            showLabelOn: "None",
            intervalType: null,
            valueType: "Numeric",
            labelFormat: ""
        };
    }
    else {
        heatmap.xAxis.labels = ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven',
            'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'];
        heatmap.xAxis = {
            minimum: null,
            maximum: null,
            showLabelOn: "None",
            intervalType: null,
            valueType: "Category",
            labelFormat: ""
        };
    }
};


let xminimum: HTMLSelectElement = document.getElementById('xminimum') as HTMLSelectElement;
xminimum.onkeydown = function (event) {
    if (event.keyCode == 13) {
        if (valueType.value == "DateTime") {
            heatmap.xAxis.minimum = new Date(xminimum.value);
        } else {
            heatmap.xAxis.minimum = Number(xminimum.value);
        }
    }
};

let xmaximum: HTMLSelectElement = document.getElementById('xmaximum') as HTMLSelectElement;
xmaximum.onkeydown = function (event) {
    if (event.keyCode == 13) {
        if (valueType.value == "DateTime") {
            heatmap.xAxis.maximum = new Date(xmaximum.value);
        } else {
            heatmap.xAxis.maximum = Number(xmaximum.value);
        }
    }
};

let xincrement: HTMLSelectElement = document.getElementById('xincrement') as HTMLSelectElement;
xincrement.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.xAxis.increment = Number(xincrement.value);
    }
};


let xinterval: HTMLSelectElement = document.getElementById('xinterval') as HTMLSelectElement;
xinterval.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.xAxis.interval = Number(xinterval.value);

    }
};


let labelIntersect: HTMLSelectElement = document.getElementById('labelIntersect') as HTMLSelectElement;
labelIntersect.onchange = () => {
    if (labelIntersect.value === 'Rotate45') {
        heatmap.xAxis.labelIntersectAction = "Rotate45";
    }
    if (labelIntersect.value === 'Trim') {
        heatmap.xAxis.labelIntersectAction = "Trim";
    }
    else {
        heatmap.yAxis.labelIntersectAction = "None";
    }
};

let rotation: HTMLSelectElement = document.getElementById('rotation') as HTMLSelectElement;
rotation.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.xAxis.labelRotation = Number(rotation.value);

    }
};

let yinversed: any = document.getElementById('y-inversed');
yinversed.onclick = () => {
    heatmap.yAxis.isInversed = yinversed.checked;
};
let yopposed: any = document.getElementById('y-opposed');
yopposed.onclick = () => {
    heatmap.yAxis.opposedPosition = yopposed.checked;
};
let yintervalType: HTMLSelectElement = document.getElementById('y-intervalType') as HTMLSelectElement;
yintervalType.onchange = () => {
    if (yintervalType.value === 'Years') {
        heatmap.yAxis.intervalType = "Years";
    }
    if (yintervalType.value === 'Months') {
        heatmap.yAxis.intervalType = "Months";
    }
    if (yintervalType.value === 'Days') {
        heatmap.yAxis.intervalType = "Days";
    }
    if (yintervalType.value === 'Hours') {
        heatmap.yAxis.intervalType = "Hours";
    }
    else {
        heatmap.yAxis.intervalType = "Minutes";
    }
};

let yvalueType: HTMLSelectElement = document.getElementById('y-valueType') as HTMLSelectElement;
yvalueType.onchange = () => {
    if (yvalueType.value === 'DateTime') {
        heatmap.yAxis = {
            minimum: new Date(2017, 0, 1),
            intervalType: 'Months',
            valueType: 'DateTime',
        };
    }
    else if (yvalueType.value === 'Numeric') {
        heatmap.yAxis = {
            minimum: null,
            maximum: null,
            showLabelOn: "None",
            intervalType: null,
            valueType: "Numeric",
            labelFormat: ""
        };
    }
    else {
        heatmap.yAxis.labels = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        heatmap.yAxis = {
            minimum: null,
            maximum: null,
            showLabelOn: "None",
            intervalType: null,
            valueType: "Category",
            labelFormat: ""
        };
    }
};

let yminimum: HTMLSelectElement = document.getElementById('yminimum') as HTMLSelectElement;
yminimum.onkeydown = function (event) {
    if (event.keyCode == 13) {
        if (valueType.value == "DateTime") {
            heatmap.yAxis.minimum = new Date(yminimum.value);
        } else {
            heatmap.yAxis.minimum = Number(yminimum.value);
        }
    }
};

let ymaximum: HTMLSelectElement = document.getElementById('ymaximum') as HTMLSelectElement;
ymaximum.onkeydown = function (event) {
    if (event.keyCode == 13) {
        if (valueType.value == "DateTime") {
            heatmap.yAxis.maximum = new Date(ymaximum.value);
        } else {
            heatmap.yAxis.maximum = Number(ymaximum.value);
        }
    }
};

let yincrement: HTMLSelectElement = document.getElementById('yincrement') as HTMLSelectElement;
yincrement.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.yAxis.increment = Number(yincrement.value);

    }
};


let yinterval: HTMLSelectElement = document.getElementById('yinterval') as HTMLSelectElement;
yinterval.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.yAxis.interval = Number(yinterval.value);

    }
};
let Right: HTMLSelectElement = document.getElementById('Right') as HTMLSelectElement;
Right.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.margin.right = Number(Right.value);
    }
};
let Left: HTMLSelectElement = document.getElementById('Left') as HTMLSelectElement;
Left.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.margin.left = Number(Left.value);
    }
};

let Bottom: HTMLSelectElement = document.getElementById('Bottom') as HTMLSelectElement;
Bottom.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.margin.bottom = Number(Bottom.value);
    }
};
let Top: HTMLSelectElement = document.getElementById('Top') as HTMLSelectElement;
Top.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.margin.top = Number(Top.value);
    }
};

let titleText: HTMLSelectElement = document.getElementById('titleText') as HTMLSelectElement;
titleText.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.titleSettings.text = titleText.value;
    }
};

let titleSize: HTMLSelectElement = document.getElementById('titleSize') as HTMLSelectElement;
titleSize.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.titleSettings.textStyle.size = titleSize.value;
    }
};

let titleColor: HTMLSelectElement = document.getElementById('titleColor') as HTMLSelectElement;
titleColor.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.titleSettings.textStyle.color = titleColor.value;
    }
};


let titleFontFamily: HTMLSelectElement = document.getElementById('titleFontFamily') as HTMLSelectElement;
titleFontFamily.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.titleSettings.textStyle.fontFamily = titleFontFamily.value;
    }
};

let titleFontWeight: HTMLSelectElement = document.getElementById('titleFontWeight') as HTMLSelectElement;
titleFontWeight.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.titleSettings.textStyle.fontWeight = titleFontWeight.value;
    }
};

let titleFontStyle: HTMLSelectElement = document.getElementById('titleFontStyle') as HTMLSelectElement;
titleFontStyle.onkeydown = function (event) {
    if (event.keyCode == 13) {
        heatmap.titleSettings.textStyle.fontStyle = titleFontStyle.value;
    }
};

let titleTextAlignment: HTMLSelectElement = document.getElementById('titleTextAlignment') as HTMLSelectElement;
titleTextAlignment.onchange = () => {
    if (titleTextAlignment.value === 'Far') {
        heatmap.titleSettings.textStyle.textAlignment = "Far";
    }
    if (titleTextAlignment.value === 'Near') {
        heatmap.titleSettings.textStyle.textAlignment = "Near";
    }
    if (titleTextAlignment.value === 'Center') {
        heatmap.titleSettings.textStyle.textAlignment = "Center";
    }
};

let titleTextOverflow: HTMLSelectElement = document.getElementById('titleTextOverflow') as HTMLSelectElement;
titleTextOverflow.onchange = () => {
    if (titleTextOverflow.value === 'None') {
        heatmap.titleSettings.textStyle.textOverflow = "None";
    }
    if (titleTextOverflow.value === 'Trim') {
        heatmap.titleSettings.textStyle.textOverflow = "Trim";
    }
    if (titleTextOverflow.value === 'Wrap') {
        heatmap.titleSettings.textStyle.textOverflow = "Wrap";
    }
};
