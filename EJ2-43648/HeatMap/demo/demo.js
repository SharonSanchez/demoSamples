define(["require", "exports", "../../src/heatmap/index", "../../src/heatmap/index", "../../src/heatmap/index", "./dataSource"], function (require, exports, index_1, index_2, index_3, dataSource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.HeatMap.Inject(index_3.Tooltip, index_2.Legend, index_1.Adaptor);
    var ds = new dataSource_1.SampleDataSource();
    var heatmap = new index_1.HeatMap({
        // height:'790px',
        titleSettings: {
            text: 'Sales Revenue per Employee (in 1000 US$)Sales Revenue per Employee (in 1000 US$)Sales Revenue per Employee (in 1000 US$)Sales Revenue per Employee (in 1000 US$)',
            textStyle: {
                textOverflow: 'Trim',
            }
        },
        created:created,
        // margin: {bottom: 45},
        xAxis: {
            labels: ['Austria', 'China', 'France', 'Germany', 'Italy', 'Mexico', 'Spain', 'Thailand', 'UK', 'USA'],           
            border:{        
            width: 1,
            },
                // valueType:"DateTime",
                // minimum: new Date(2007,0,1),
                // intervalType:"Years",
                // labelFormat:"yyyy",
             
            multiLevelLabels: [
                {
                    border: { type: 'Rectangle',width:'2', color: '#a19d9d' },
                    textStyle: {
                        color: 'black',
                        fontWeight: 'bold'
                    },
                    categories: [
                        { start: 0, end: 2, text: 'T1', },
                        { start: 3, end: 4, text: 'T2', },
                        { start: 5, end: 7, text: 'T3', },
                        { start: 8, end: 11, text: 'T4', },
                    ]
                },
            ]
        },
        yAxis: {
            // labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            // minimum:2,
            valueType:"Numeric",
            labelFormat:"$",
                        multiLevelLabels: [
                {
                    border: { type: 'Brace', color: '#a19d9d' },
                    textStyle: {
                        color: 'black',
                        fontWeight: 'Bold'
                    },
                    categories: [
                        { start: 0, end: 2, text: 'Q1' },
                        { start: 3, end: 5, text: 'Q2' },
                    ]
                },
            ]
        },
        dataSource:ds.heatmapData,
        // dataSource: {
        //     data: ds.jsonCellData,
        //     isJsonData: true,
        //     adaptorType: 'Cell',
        //     xDataMapping: 'rowid',
        //     yDataMapping: 'columnid',
        //     valueMapping: 'value'
        // },
        //  renderingMode:"Canvas",
        paletteSettings: {
            palette: [
               { value: 0, color: '#C2E7EC' },
                { value: 10, color: '#AEDFE6' },
                { value: 20, color: '#9AD7E0' },
                { value: 25, color: '#86CFDA' },
                { value: 30, color: '#72C7D4' },
                { value: 40, color: '#5EBFCE' },
                { value: 50, color: '#4AB7C8' },
                { value: 55, color: '#36AFC2' },
                { value: 60, color: '#309DAE' },
                { value: 70, color: '#2B8C9B' },
                { value: 75, color: '#257A87' },
                { value: 80, color: '#206974' },
                { value: 85, color: '#1B5761' },
                // { value: 101, color: '#15464D' },
                // { color: '#DCD57E' },
                // { color: '#A6DC7E' },
                // { color: '#7EDCA2' },
                // { color: '#6EB5D0' }
            ],
            type:'Fixed',
        },
        cellSettings:{border:{color:'black',width:'1'},
    textStyle:{color:'black'},},
        tooltipSettings:{
            fill:'yellow',
            /* border:
            {width:'1'}, */
            textStyle:{color:'green', fontWeight :'Bold'},

        },
        allowSelection: true,
        showTooltip: true,
        legendSettings: {
            position: 'Right',
            visible: true,
            height:'123',
        },
        cellSelected:function(args){},
        cellClick:function(args){},
        load:function(args){},
        tooltipRender:function(args){
            // args.content = ['In ' + args.yLabel + ', the produced not produced ' + args.xLabel + ' produced not produced ' + args.value + ' million barrels per day'];
        },
    });
    heatmap.appendTo("#container");
    function created(){
        console.log("created");
    }
    var heatmapWidth = document.getElementById('heatmapWidth');
    heatmapWidth.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.width = heatmapWidth.value;
        }
    };
    var heatmapHeight = document.getElementById('heatmapHeight');
    heatmapHeight.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.height = heatmapHeight.value;
        }
    };
    var renderingmode = document.getElementById('renderingMode');
    renderingmode.onchange = function () {
        if (renderingmode.value === 'SVG') {
            heatmap.renderingMode = "SVG";
        }
        if (renderingmode.value === 'Canvas') {
            heatmap.renderingMode = "Canvas";
        }
    };
    var legendPosition = document.getElementById('legendPosition');
    legendPosition.onchange = function () {
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
    var labelDisplayType = document.getElementById('labelDisplay');
    labelDisplayType.onchange = function () {
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
    var alignment = document.getElementById('alignment');
    alignment.onchange = function () {
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
    var textOverflow = document.getElementById('textOverflow');
    textOverflow.onchange = function () {
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
    var legendWidth = document.getElementById('legendWidth');
    legendWidth.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.legendSettings.width = legendWidth.value;
        }
    };
    var legendHeight = document.getElementById('legendHeight');
    legendHeight.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.legendSettings.height = legendHeight.value;
        }
    };
    var labelFormat = document.getElementById('labelFormat');
    labelFormat.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.legendSettings.labelFormat = labelFormat.value;
        }
    };
    var smartLegend = document.getElementById('smartLegend');
    smartLegend.onclick = function () {
        heatmap.legendSettings.enableSmartLegend = smartLegend.checked;
    };
    var visible = document.getElementById('visible');
    visible.onclick = function () {
        heatmap.legendSettings.visible = visible.checked;
    };
    var showLabel = document.getElementById('showLabel');
    showLabel.onclick = function () {
        heatmap.legendSettings.showLabel = showLabel.checked;
    };
    var showGradientPointer = document.getElementById('showGradientPointer');
    showGradientPointer.onclick = function () {
        heatmap.legendSettings.showGradientPointer = showGradientPointer.checked;
    };
    var paletteType = document.getElementById('paletteType');
    paletteType.onchange = function () {
        if (paletteType.value === 'Gradient') {
            heatmap.paletteSettings.type = 'Gradient';
        }
        if (paletteType.value === 'Fixed') {
            heatmap.paletteSettings.type = "Fixed";
        }
    };
    var paletteCollections = document.getElementById('paletteCollections');
    paletteCollections.onchange = function () {
        if (paletteCollections.value === 'colors') {
            heatmap.paletteSettings.palette = [
                { color: '#DCD57E' },
                { color: '#A6DC7E' },
                { color: '#7EDCA2' },
                { color: '#6EB5D0' }
            ];
        }
        if (paletteCollections.value === 'colors and value') {
            heatmap.paletteSettings.palette = [
                { value: 10, color: '#DCD57E' },
                { value: 20, color: '#A6DC7E' },
                { value: 40, color: '#7EDCA2' },
                { value: 80, color: '#6EB5D0' }
            ];
        }
        if (paletteCollections.value === 'colors and label') {
            heatmap.paletteSettings.palette = [
                { color: '#DCD57E', label: 'Testing 1' },
                { color: '#A6DC7E', label: 'Testing 2' },
                { color: '#7EDCA2', label: 'Testing 3' },
                { color: '#6EB5D0', label: 'Testing 4' }
            ];
        }
        if (paletteCollections.value === 'colors, value, label') {
            heatmap.paletteSettings.palette = [
                { value: 10, color: '#DCD57E', label: 'Testing 1' },
                { value: 20, color: '#A6DC7E', label: 'Testing 2' },
                { value: 40, color: '#7EDCA2', label: 'Testing 3' },
                { value: 80, color: '#6EB5D0', label: 'Testing 4' }
            ];
        }
    };
    var emptyPoint = document.getElementById('emptyPoint');
    var emptyPointSubmit = document.getElementById('emptyPointSubmit');
    emptyPointSubmit.onclick = function () {
        heatmap.paletteSettings.emptyPointColor = emptyPoint.value;
    };
    var showLabelCell = document.getElementById('showLabelCell');
    showLabelCell.onclick = function () {
        heatmap.cellSettings.showLabel = showLabelCell.checked;
    };
    var enableCellHighlighting = document.getElementById('enableCellHighlighting');
    enableCellHighlighting.onclick = function () {
        heatmap.cellSettings.enableCellHighlighting = enableCellHighlighting.checked;
    };
    var isInversedBubbleSize = document.getElementById('isInversedBubbleSize');
    isInversedBubbleSize.onclick = function () {
        heatmap.cellSettings.isInversedBubbleSize = isInversedBubbleSize.checked;
    };
    var BubbleType = document.getElementById('BubbleType');
    BubbleType.onchange = function () {
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
    var tileType = document.getElementById('tileType');
    tileType.onchange = function () {
        if (tileType.value === 'Bubble') {
            heatmap.cellSettings.tileType = "Bubble";
        }
        if (tileType.value === 'Rect') {
            heatmap.cellSettings.tileType = "Rect";
        }
    };
    var cellFormat = document.getElementById('cellFormat');
    cellFormat.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.cellSettings.format = cellFormat.value;
        }
    };
    var xinversed = document.getElementById('x-inversed');
    xinversed.onclick = function () {
        heatmap.xAxis.isInversed = xinversed.checked;
    };
    var xopposed = document.getElementById('x-opposed');
    xopposed.onclick = function () {
        heatmap.xAxis.opposedPosition = xopposed.checked;
    };
    var intervalType = document.getElementById('x-intervalType');
    intervalType.onchange = function () {
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
    var valueType = document.getElementById('x-valueType');
    valueType.onchange = function () {
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
    var xminimum = document.getElementById('xminimum');
    xminimum.onkeydown = function (event) {
        if (event.keyCode == 13) {
            if (valueType.value == "DateTime") {
                heatmap.xAxis.minimum = new Date(xminimum.value);
            }
            else {
                heatmap.xAxis.minimum = Number(xminimum.value);
            }
        }
    };
    var xmaximum = document.getElementById('xmaximum');
    xmaximum.onkeydown = function (event) {
        if (event.keyCode == 13) {
            if (valueType.value == "DateTime") {
                heatmap.xAxis.maximum = new Date(xmaximum.value);
            }
            else {
                heatmap.xAxis.maximum = Number(xmaximum.value);
            }
        }
    };
    var xincrement = document.getElementById('xincrement');
    xincrement.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.xAxis.increment = Number(xincrement.value);
        }
    };
    var xinterval = document.getElementById('xinterval');
    xinterval.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.xAxis.interval = Number(xinterval.value);
        }
    };
    var labelIntersect = document.getElementById('labelIntersect');
    labelIntersect.onchange = function () {
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
    var rotation = document.getElementById('rotation');
    rotation.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.xAxis.labelRotation = Number(rotation.value);
        }
    };
    var yinversed = document.getElementById('y-inversed');
    yinversed.onclick = function () {
        heatmap.yAxis.isInversed = yinversed.checked;
    };
    var yopposed = document.getElementById('y-opposed');
    yopposed.onclick = function () {
        heatmap.yAxis.opposedPosition = yopposed.checked;
    };
    var yintervalType = document.getElementById('y-intervalType');
    yintervalType.onchange = function () {
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
    var yvalueType = document.getElementById('y-valueType');
    yvalueType.onchange = function () {
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
    var yminimum = document.getElementById('yminimum');
    yminimum.onkeydown = function (event) {
        if (event.keyCode == 13) {
            if (valueType.value == "DateTime") {
                heatmap.yAxis.minimum = new Date(yminimum.value);
            }
            else {
                heatmap.yAxis.minimum = Number(yminimum.value);
            }
        }
    };
    var ymaximum = document.getElementById('ymaximum');
    ymaximum.onkeydown = function (event) {
        if (event.keyCode == 13) {
            if (valueType.value == "DateTime") {
                heatmap.yAxis.maximum = new Date(ymaximum.value);
            }
            else {
                heatmap.yAxis.maximum = Number(ymaximum.value);
            }
        }
    };
    var yincrement = document.getElementById('yincrement');
    yincrement.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.yAxis.increment = Number(yincrement.value);
        }
    };
    var yinterval = document.getElementById('yinterval');
    yinterval.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.yAxis.interval = Number(yinterval.value);
        }
    };
    var Right = document.getElementById('Right');
    Right.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.margin.right = Number(Right.value);
        }
    };
    var Left = document.getElementById('Left');
    Left.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.margin.left = Number(Left.value);
        }
    };
    var Bottom = document.getElementById('Bottom');
    Bottom.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.margin.bottom = Number(Bottom.value);
        }
    };
    var Top = document.getElementById('Top');
    Top.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.margin.top = Number(Top.value);
        }
    };
    var titleText = document.getElementById('titleText');
    titleText.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.titleSettings.text = titleText.value;
        }
    };
    var titleSize = document.getElementById('titleSize');
    titleSize.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.titleSettings.textStyle.size = titleSize.value;
        }
    };
    var titleColor = document.getElementById('titleColor');
    titleColor.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.titleSettings.textStyle.color = titleColor.value;
        }
    };
    var titleFontFamily = document.getElementById('titleFontFamily');
    titleFontFamily.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.titleSettings.textStyle.fontFamily = titleFontFamily.value;
        }
    };
    var titleFontWeight = document.getElementById('titleFontWeight');
    titleFontWeight.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.titleSettings.textStyle.fontWeight = titleFontWeight.value;
        }
    };
    var titleFontStyle = document.getElementById('titleFontStyle');
    titleFontStyle.onkeydown = function (event) {
        if (event.keyCode == 13) {
            heatmap.titleSettings.textStyle.fontStyle = titleFontStyle.value;
        }
    };
    var titleTextAlignment = document.getElementById('titleTextAlignment');
    titleTextAlignment.onchange = function () {
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
    var titleTextOverflow = document.getElementById('titleTextOverflow');
    titleTextOverflow.onchange = function () {
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
});
