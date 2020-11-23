var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "../utils/helper", "../utils/helper", "../utils/colorMapping", "../model/base", "../model/theme"], function (require, exports, ej2_base_1, helper_1, helper_2, colorMapping_1, base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CellSettings = (function (_super) {
        __extends(CellSettings, _super);
        function CellSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property(true)
        ], CellSettings.prototype, "showLabel", void 0);
        __decorate([
            ej2_base_1.Property('')
        ], CellSettings.prototype, "format", void 0);
        __decorate([
            ej2_base_1.Property(true)
        ], CellSettings.prototype, "enableCellHighlighting", void 0);
        __decorate([
            ej2_base_1.Complex({}, base_1.BubbleSize)
        ], CellSettings.prototype, "bubbleSize", void 0);
        __decorate([
            ej2_base_1.Complex({}, base_1.Border)
        ], CellSettings.prototype, "border", void 0);
        __decorate([
            ej2_base_1.Complex(theme_1.Theme.rectLabelFont, base_1.Font)
        ], CellSettings.prototype, "textStyle", void 0);
        __decorate([
            ej2_base_1.Property('Rect')
        ], CellSettings.prototype, "tileType", void 0);
        __decorate([
            ej2_base_1.Property('Color')
        ], CellSettings.prototype, "bubbleType", void 0);
        __decorate([
            ej2_base_1.Property(false)
        ], CellSettings.prototype, "isInversedBubbleSize", void 0);
        return CellSettings;
    }(ej2_base_1.ChildProperty));
    exports.CellSettings = CellSettings;
    var Series = (function () {
        function Series(heatMap) {
            this.heatMap = heatMap;
            this.drawSvgCanvas = new helper_1.DrawSvgCanvas(this.heatMap);
            this.cellColor = new colorMapping_1.CellColor(this.heatMap);
        }
        Series.prototype.renderRectSeries = function () {
            this.createSeriesGroup();
            var heatMap = this.heatMap;
            var isValueInRange = false;
            heatMap.xLength = heatMap.axisCollections[0].axisLabelSize;
            heatMap.yLength = heatMap.axisCollections[1].axisLabelSize;
            var tempX = Math.round(heatMap.initialClipRect.x * 100) / 100;
            var tempY = Math.round(heatMap.initialClipRect.y * 100) / 100;
            var dataXIndex = 0;
            var dataYIndex = 0;
            var cellSetting = heatMap.cellSettings;
            var tempWidth = Math.round(((heatMap.initialClipRect.width -
                (cellSetting.border.width / 2)) / heatMap.xLength) * 100) / 100;
            var tempHeight = Math.round(((heatMap.initialClipRect.height -
                (cellSetting.border.width / 2)) / heatMap.yLength) * 100) / 100;
            var tempVal = 0;
            var themeStyle = heatMap.themeStyle;
            var tempBorder;
            var tempRectPosition = [];
            var circleRadius;
            tempBorder = cellSetting.border;
            var borderColor;
            var displayText;
            this.rectPositionCollection = [];
            this.color = '';
            this.bubbleColorValue = [];
            if (heatMap.yAxis.opposedPosition) {
                tempX = Math.round((heatMap.initialClipRect.x + (parseFloat(tempBorder.width.toString()) / 2)) * 100) / 100;
            }
            circleRadius = this.getBubbleRadius(tempWidth, tempHeight);
            for (var x = 0; x < (heatMap.xLength * heatMap.yLength); x++) {
                if (heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.paletteSettings.type === 'Gradient') {
                    this.heatMap.dataSourceMinValue = this.heatMap.dataMin[dataYIndex];
                    this.heatMap.dataSourceMaxValue = this.heatMap.dataMax[dataYIndex];
                }
                else if (heatMap.paletteSettings.colorGradientMode === 'Row' && this.heatMap.paletteSettings.type === 'Gradient') {
                    this.heatMap.dataSourceMinValue = this.heatMap.dataMin[dataXIndex];
                    this.heatMap.dataSourceMaxValue = this.heatMap.dataMax[dataXIndex];
                }
                this.setTextAndColor(dataXIndex, dataYIndex);
                var rectPosition = new helper_1.CurrentRect(0, 0, 0, 0, 0, '', 0, 0, 0, 0, true, '', '', true);
                borderColor = tempBorder.color;
                if (this.heatMap.bubbleSizeWithColor) {
                    this.updateRectDetails(rectPosition, tempX, tempY, tempWidth, tempHeight, ej2_base_1.extend('', this.bubbleColorValue, null, true), x, dataYIndex, dataXIndex);
                }
                else {
                    this.updateRectDetails(rectPosition, tempX, tempY, tempWidth, tempHeight, this.text, x, dataYIndex, dataXIndex);
                }
                if (cellSetting.showLabel) {
                    displayText = this.getFormatedText(this.text, cellSetting.format);
                }
                else {
                    displayText = '';
                }
                rectPosition.displayText = displayText;
                if (!ej2_base_1.isNullOrUndefined(this.heatMap.cellRender)) {
                    displayText = this.cellRendering(rectPosition, displayText);
                }
                if ((heatMap.renderingMode === 'Canvas' && parseFloat(tempBorder.width.toString()) === 0) || (!borderColor &&
                    cellSetting.tileType === 'Bubble' && cellSetting.bubbleType === 'Sector')) {
                    borderColor = this.color;
                }
                if (cellSetting.tileType === 'Rect') {
                    this.renderTileCell(rectPosition, tempBorder, x, this.color, borderColor);
                    this.updateLabelVisibleStatus(tempWidth, tempHeight, displayText);
                }
                else {
                    if (cellSetting.bubbleType === 'Color') {
                        this.renderBubbleCell(rectPosition, tempBorder, x, this.color, borderColor, circleRadius);
                        this.updateLabelVisibleStatus((circleRadius * 2) - 12, (circleRadius * 2) - 6, displayText);
                    }
                    else if (!ej2_base_1.isNullOrUndefined(this.text) && (cellSetting.bubbleType === 'Size' || cellSetting.bubbleType === 'SizeAndColor')
                        && this.text.toString() !== '') {
                        if (this.heatMap.paletteSettings.colorGradientMode !== 'Table' && this.heatMap.paletteSettings.type === 'Gradient') {
                            this.heatMap.minColorValue = !isFinite(this.heatMap.minColorValue) ?
                                this.heatMap.dataSourceMinValue : this.heatMap.minColorValue;
                            this.heatMap.maxColorValue = !isFinite(this.heatMap.maxColorValue) ?
                                this.heatMap.dataSourceMaxValue : this.heatMap.maxColorValue;
                        }
                        var tempCircleRadius = this.getRadiusBypercentage(parseFloat(this.text.toString()), heatMap.dataSourceMinValue, heatMap.dataSourceMaxValue, circleRadius);
                        this.renderBubbleCell(rectPosition, tempBorder, x, this.color, borderColor, tempCircleRadius);
                        this.updateLabelVisibleStatus((tempCircleRadius * 2) - 12, (tempCircleRadius * 2) - 6, displayText);
                    }
                    else if (cellSetting.bubbleType === 'Sector' && !ej2_base_1.isNullOrUndefined(this.text) && this.text.toString() !== '') {
                        this.renderSectorCell(rectPosition, tempBorder, x.toString(), this.color, borderColor, circleRadius, this.text);
                        this.checkLabelXDisplay = false;
                        this.checkLabelYDisplay = false;
                    }
                }
                tempRectPosition.push(rectPosition);
                if (heatMap.rangeSelection && heatMap.paletteSettings.type === 'Fixed') {
                    isValueInRange = this.isCellValueInRange(dataXIndex, dataYIndex);
                    rectPosition.visible = isValueInRange;
                }
                if (cellSetting.showLabel && this.checkLabelYDisplay && this.checkLabelXDisplay) {
                    var themeCellTextStyle = cellSetting.textStyle;
                    var options = new helper_1.TextOption(heatMap.element.id + '_HeatMapRectLabels_' + x, new helper_1.TextBasic(Math.round((tempX + tempWidth / 2) * 100) / 100, Math.round((tempY + tempHeight / 2) * 100) / 100, 'middle', displayText, null, null, 'middle'), themeCellTextStyle, themeCellTextStyle.color || this.getSaturatedColor(this.color));
                    rectPosition.textId = options.id;
                    if (heatMap.rangeSelection && heatMap.paletteSettings.type === 'Fixed') {
                        options.fill = isValueInRange ? options.fill : this.heatMap.themeStyle.toggledColor;
                    }
                    if (ej2_base_1.Browser.isIE && !heatMap.enableCanvasRendering) {
                        options.dy = this.heatMap.cellSettings.tileType === 'Bubble' ? '0.5ex' : '1ex';
                    }
                    this.drawSvgCanvas.createText(options, this.containerTextObject, displayText);
                }
                if (tempVal === heatMap.xLength - 1) {
                    tempY = Math.round((tempY + tempHeight) * 100) / 100;
                    tempVal = 0;
                    dataYIndex = 0;
                    if (heatMap.yAxis.opposedPosition) {
                        tempX = Math.round((heatMap.initialClipRect.x + (parseFloat(tempBorder.width.toString()) / 2)) * 100) / 100;
                    }
                    else {
                        tempX = Math.round(heatMap.initialClipRect.x * 100) / 100;
                    }
                    this.rectPositionCollection.push(tempRectPosition);
                    tempRectPosition = [];
                    dataXIndex++;
                }
                else {
                    tempX = Math.round((tempX + tempWidth) * 100) / 100;
                    tempVal++;
                    dataYIndex++;
                }
            }
            if (!heatMap.enableCanvasRendering) {
                heatMap.svgObject.appendChild(this.containerRectObject);
                if (cellSetting.showLabel && !(cellSetting.tileType === 'Bubble' && cellSetting.bubbleType === 'Sector')) {
                    heatMap.svgObject.appendChild(this.containerTextObject);
                }
            }
        };
        Series.prototype.isCellValueInRange = function (dataXIndex, dataYIndex) {
            var isValueInRange = false;
            for (var i = 0; i < this.heatMap.toggleValue.length; i++) {
                var minValue = void 0;
                var maxValue = void 0;
                minValue = (i === 0) && !this.heatMap.isColorRange ? this.heatMap.dataSourceMinValue : this.heatMap.isColorRange ?
                    this.heatMap.toggleValue[i].startValue : this.heatMap.toggleValue[i].value;
                if (this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'SizeAndColor') {
                    maxValue = (i === this.heatMap.toggleValue.length - 1) ? this.heatMap.maxColorValue :
                        this.heatMap.toggleValue[i + 1].value - 0.01;
                }
                else {
                    maxValue = (i === this.heatMap.toggleValue.length - 1 && !this.heatMap.isColorRange) ?
                        this.heatMap.dataSourceMaxValue : this.heatMap.isColorRange ?
                        this.heatMap.toggleValue[i].endValue : this.heatMap.toggleValue[i + 1].value - 0.01;
                }
                var clonedDataSource = this.heatMap.clonedDataSource;
                var bubbleText = !ej2_base_1.isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][1]) &&
                    clonedDataSource[dataXIndex][dataYIndex][1].toString() !== '' ? clonedDataSource[dataXIndex][dataYIndex][1] : '';
                var text = parseFloat(this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'SizeAndColor' ?
                    bubbleText.toString() : this.text.toString());
                if (isNaN(text)) {
                    isValueInRange = true;
                }
                else if (!isNaN(text) && text >= minValue && text <= maxValue) {
                    if (!this.heatMap.toggleValue[i].visible) {
                        isValueInRange = false;
                        break;
                    }
                    else {
                        isValueInRange = true;
                        break;
                    }
                }
                else if (this.heatMap.isColorRange &&
                    maxValue >= this.heatMap.toggleValue[i].endValue && i === this.heatMap.toggleValue.length - 1) {
                    isValueInRange = true;
                    break;
                }
            }
            return isValueInRange;
        };
        Series.prototype.cellRendering = function (rectPosition, text) {
            var xAxis = this.heatMap.axisCollections[0];
            var yAxis = this.heatMap.axisCollections[1];
            var xLabels = xAxis.tooltipLabels;
            var yLabels = yAxis.tooltipLabels.slice().reverse();
            var yLabelValue = yAxis.labelValue.slice().reverse();
            var argData = {
                heatmap: (this.heatMap.isBlazor ? null : this.heatMap),
                cancel: false,
                name: 'cellRender',
                value: rectPosition.value,
                xLabel: xLabels[rectPosition.xIndex].toString(),
                yLabel: yLabels[rectPosition.yIndex].toString(),
                displayText: text,
                xValue: xAxis.labelValue[rectPosition.xIndex],
                yValue: yLabelValue[rectPosition.yIndex],
                cellColor: this.color
            };
            this.heatMap.trigger('cellRender', argData);
            this.color = argData.cellColor;
            return argData.displayText;
        };
        Series.prototype.setTextAndColor = function (dataXIndex, dataYIndex) {
            var cellSetting = this.heatMap.cellSettings;
            this.bubbleColorValue = [];
            var adaptData = this.heatMap.dataSourceSettings;
            var clonedDataSource = this.heatMap.clonedDataSource;
            if (this.heatMap.bubbleSizeWithColor) {
                this.text = !ej2_base_1.isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][0]) &&
                    clonedDataSource[dataXIndex][dataYIndex][0].toString() !== '' ? clonedDataSource[dataXIndex][dataYIndex][0] : '';
                this.color = !ej2_base_1.isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][1]) &&
                    clonedDataSource[dataXIndex][dataYIndex][1].toString() !== '' ?
                    this.cellColor.getColorByValue(clonedDataSource[dataXIndex][dataYIndex][1])
                    : this.heatMap.isColorValueExist ? this.heatMap.emptyPointColor : this.cellColor.getColorByValue(this.text);
                var tempBubbleCollection = new base_1.BubbleTooltipData(adaptData.isJsonData && adaptData.adaptorType === 'Cell' ? adaptData.bubbleDataMapping.size : null, this.text, 'Size');
                this.bubbleColorValue.push(tempBubbleCollection);
                this.bubbleColorValue.push({
                    mappingName: adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                        adaptData.bubbleDataMapping.color : null,
                    bubbleData: !ej2_base_1.isNullOrUndefined(clonedDataSource[dataXIndex][dataYIndex][1]) &&
                        clonedDataSource[dataXIndex][dataYIndex][1].toString() !== '' ? clonedDataSource[dataXIndex][dataYIndex][1] : '',
                    valueType: 'Color'
                });
            }
            else {
                this.text = clonedDataSource[dataXIndex][dataYIndex];
                this.color = this.cellColor.getColorByValue(this.text);
            }
        };
        Series.prototype.createSeriesGroup = function () {
            if (!this.heatMap.enableCanvasRendering) {
                this.containerRectObject = this.heatMap.renderer.createGroup({
                    id: this.heatMap.element.id + '_Container_RectGroup'
                });
                if (this.heatMap.cellSettings.showLabel &&
                    !(this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'Sector')) {
                    this.containerTextObject = this.heatMap.renderer.createGroup({ id: this.heatMap.element.id + '_Container_TextGroup', transform: 'translate( 0, 0)' });
                }
            }
        };
        Series.prototype.updateRectDetails = function (rectPosition, tempX, tempY, tempWidth, tempHeight, text, x, dataXIndex, dataYIndex) {
            rectPosition.x = tempX;
            rectPosition.y = tempY;
            rectPosition.width = tempWidth;
            rectPosition.height = tempHeight;
            rectPosition.value = text;
            rectPosition.id = this.heatMap.element.id + '_HeatMapRect_' + x;
            rectPosition.xIndex = dataXIndex;
            rectPosition.yIndex = dataYIndex;
        };
        Series.prototype.renderTileCell = function (rectPosition, tempBorder, x, color, borderColor) {
            var rect = new helper_1.RectOption(this.heatMap.element.id + '_HeatMapRect_' + x, color, tempBorder, 1, new helper_1.Rect(rectPosition.x, rectPosition.y, rectPosition.width, rectPosition.height), borderColor || this.heatMap.themeStyle.cellBorder, tempBorder.radius, tempBorder.radius);
            this.drawSvgCanvas.drawRectangle(rect, this.containerRectObject, true);
        };
        Series.prototype.getBubbleRadius = function (width, height) {
            var radius = (width / 2) - 2;
            if (height / 2 < width / 2) {
                radius = (height / 2) - 2;
            }
            return radius < 0 ? 0 : radius;
        };
        Series.prototype.renderSectorCell = function (bubblePosition, tempBorder, x, color, borderColor, circleRadius, text) {
            var curve;
            var startAngle;
            var endAngle;
            var cX;
            var cY;
            var X1;
            var Y1;
            var tempcX;
            var tempcY;
            var pathBorderWidth;
            var centerX = Math.round((bubblePosition.x + (bubblePosition.width / 2)) * 100) / 100;
            var centerY = Math.round((bubblePosition.y + (bubblePosition.height / 2)) * 100) / 100;
            var tempColor = color;
            var sectorContibution = this.getRadiusBypercentage(text, this.heatMap.dataSourceMinValue, this.heatMap.dataSourceMaxValue, 360);
            for (var y = 0; y < 2; y++) {
                pathBorderWidth = parseFloat(tempBorder.width.toString());
                if (y === 0) {
                    curve = sectorContibution >= 180 ? 1 : 0;
                    startAngle = -90;
                    if (sectorContibution === 0) {
                        endAngle = 270;
                    }
                    else {
                        endAngle = (sectorContibution - 90);
                    }
                    cX = Math.round((centerX + circleRadius * Math.cos((sectorContibution - 90) * (Math.PI / 180))) * 100) / 100;
                    cY = Math.round((centerY + circleRadius * Math.sin((sectorContibution - 90) * (Math.PI / 180))) * 100) / 100;
                    X1 = Math.round(centerX * 100) / 100;
                    Y1 = Math.round((centerY - circleRadius) * 100) / 100;
                    if (sectorContibution === 0) {
                        tempColor = this.heatMap.emptyPointColor;
                    }
                }
                else {
                    curve = sectorContibution >= 180 ? 0 : 1;
                    startAngle = endAngle;
                    endAngle = 270;
                    tempColor = this.heatMap.emptyPointColor;
                    x = x + '_Unfilled';
                    tempcX = cX;
                    tempcY = cY;
                    cX = X1;
                    cY = Y1;
                    X1 = tempcX;
                    Y1 = tempcY;
                    if (sectorContibution === 0) {
                        pathBorderWidth = 1;
                        borderColor = color;
                    }
                }
                var path = new helper_1.Path('', false, centerX, centerY, X1, Y1, cX, cY, startAngle, endAngle, circleRadius, true);
                var sector = new helper_1.PathAttributes(this.heatMap.element.id + '_HeatMapRect_' + x, path, tempColor, tempBorder, pathBorderWidth, 1, borderColor);
                this.calculateShapes(sector, path, sectorContibution, curve);
                this.drawSvgCanvas.drawPath(sector, path, this.containerRectObject);
                if (sectorContibution === 360) {
                    break;
                }
            }
        };
        Series.prototype.calculateShapes = function (options, path, sectorContibution, curve) {
            var pathString;
            var clockWise;
            switch (sectorContibution) {
                case 360:
                case 0:
                    if (sectorContibution === 0 && path.start === path.end) {
                        pathString = 'M' + ' ' + options.x + ' ' + options.y + ' ' + 'L' + ' ' + path.x + ' ' + (path.y - path.radius);
                    }
                    else {
                        pathString = !this.heatMap.enableCanvasRendering ? 'M' + ' ' + options.x + ' ' + options.y + ' ' : '';
                        pathString = pathString + 'm' + ' ' + (-path.radius) + ' ' + '0' + ' ' +
                            'a' + ' ' + path.radius + ' ' + path.radius + ' ' + '0' + ' ' + '1' + ' ' + '0' +
                            ' ' + (path.radius * 2) + ' ' + '0' + ' ' + 'a' + ' ' + path.radius +
                            ' ' + path.radius + ' ' + '0' + ' ' + '1' + ' ' + '0' +
                            ' ' + (-(path.radius * 2)) + ' ' + '0' + ' ';
                    }
                    ej2_base_1.merge(options, { 'd': pathString });
                    break;
                default:
                    pathString = 'M' + ' ' + options.x + ' ' + options.y + ' ' + 'L' + ' ' + path.x1 + ' ' + path.y1 + ' ' +
                        'A' + ' ' + path.radius + ' ' + path.radius + ' ' + '0' + ' ' + curve + ' ' + '1' + ' ' +
                        path.cx + ' ' + path.cy + ' ' + 'Z';
                    ej2_base_1.merge(options, { 'd': pathString });
                    break;
            }
        };
        Series.prototype.renderBubbleCell = function (bubblePosition, tempBorder, x, color, borderColor, circleRadius) {
            var circle = new helper_1.CircleOption(this.heatMap.element.id + '_HeatMapRect_' + x, color, tempBorder, 1, borderColor || this.heatMap.themeStyle.cellBorder, Math.round((bubblePosition.x + (bubblePosition.width / 2)) * 100) / 100, Math.round((bubblePosition.y + (bubblePosition.height / 2)) * 100) / 100, circleRadius);
            this.drawSvgCanvas.drawCircle(circle, this.containerRectObject);
        };
        Series.prototype.updateLabelVisibleStatus = function (tempWidth, tempHeight, displayText) {
            if (this.heatMap.cellSettings.showLabel) {
                this.checkLabelYDisplay = tempHeight > parseInt(this.heatMap.cellSettings.textStyle.size, 10) ? true : false;
                this.checkLabelXDisplay = tempWidth > (displayText.length *
                    (parseInt(this.heatMap.cellSettings.textStyle.size, 10) / 2)) ? true : false;
            }
        };
        Series.prototype.getRadiusBypercentage = function (text, min, max, radius) {
            var minimum = parseInt(this.heatMap.cellSettings.bubbleSize.minimum, 10);
            var maximum = parseInt(this.heatMap.cellSettings.bubbleSize.maximum, 10);
            if (minimum < 0 || minimum > 100 || isNaN(minimum)) {
                minimum = 0;
            }
            if (maximum < 0 || maximum > 100 || isNaN(maximum)) {
                maximum = 100;
            }
            var valueInPrecentage = ((text - min) /
                (max - min)) * 100;
            valueInPrecentage = isNaN(valueInPrecentage) ? 100 : valueInPrecentage;
            if ((this.heatMap.bubbleSizeWithColor ||
                (this.heatMap.cellSettings.tileType === 'Bubble' && this.heatMap.cellSettings.bubbleType === 'Size'))) {
                if (this.heatMap.cellSettings.isInversedBubbleSize) {
                    valueInPrecentage = 100 - valueInPrecentage;
                }
                valueInPrecentage = ((valueInPrecentage * (maximum - minimum)) / 100) + minimum;
            }
            radius = radius * (valueInPrecentage / 100);
            return (Math.round(radius * 100) / 100) < 0 ? 0 : (Math.round(radius * 100) / 100);
        };
        Series.prototype.getSaturatedColor = function (color) {
            var saturatedColor = color;
            saturatedColor = (saturatedColor === 'transparent') ? window.getComputedStyle(document.body, null).backgroundColor : saturatedColor;
            var rgbValue = helper_2.convertHexToColor(helper_2.colorNameToHex(saturatedColor));
            var contrast = Math.round((rgbValue.R * 299 + rgbValue.G * 587 + rgbValue.B * 114) / 1000);
            return contrast >= 128 ? 'black' : 'white';
        };
        Series.prototype.highlightSvgRect = function (tempID) {
            if (tempID.indexOf('Celltooltip') === -1) {
                if (tempID.indexOf('_HeatMapRect') !== -1) {
                    if (tempID.indexOf('_HeatMapRectLabels_') !== -1) {
                        var tempIndex = tempID.indexOf('_HeatMapRectLabels_') + 19;
                        tempID = this.heatMap.element.id + '_HeatMapRect_' + tempID.slice(tempIndex);
                    }
                    var element = document.getElementById(tempID);
                    if (this.heatMap.tempRectHoverClass !== tempID) {
                        if (this.heatMap.cellSettings.enableCellHighlighting) {
                            var oldElement = void 0;
                            if (this.heatMap.tempRectHoverClass) {
                                oldElement = document.getElementById(this.heatMap.tempRectHoverClass);
                            }
                            if (oldElement && !this.heatMap.rectSelected) {
                                oldElement.setAttribute('opacity', '1');
                            }
                            if (element && !this.heatMap.rectSelected) {
                                element.setAttribute('opacity', '0.65');
                            }
                        }
                        this.heatMap.tempRectHoverClass = tempID;
                    }
                }
                else {
                    if (this.heatMap.cellSettings.enableCellHighlighting) {
                        var oldElement = void 0;
                        if (this.heatMap.tempRectHoverClass) {
                            oldElement = document.getElementById(this.heatMap.tempRectHoverClass);
                        }
                        if (oldElement && !this.heatMap.rectSelected) {
                            oldElement.setAttribute('opacity', '1');
                            this.heatMap.tempRectHoverClass = '';
                        }
                    }
                }
            }
        };
        Series.prototype.getFormatedText = function (val, getFormat) {
            var format = getFormat;
            var isCustom = format.match('{value}') !== null;
            this.format = this.heatMap.intl.getNumberFormat({
                format: isCustom ? '' : format
            });
            var value = '';
            if (val.toString() !== '') {
                value = helper_2.formatValue(isCustom, format, val, this.format);
            }
            return value;
        };
        Series.prototype.getCurrentRect = function (x, y) {
            var currentRect;
            var firstRectDetails = [];
            firstRectDetails.push(this.heatMap.heatMapSeries.rectPositionCollection[0][0]);
            var rectX = Math.ceil((x - firstRectDetails[0].x) / firstRectDetails[0].width) <
                this.heatMap.axisCollections[0].axisLabelSize ?
                Math.ceil((x - firstRectDetails[0].x) / firstRectDetails[0].width) :
                this.heatMap.axisCollections[0].axisLabelSize;
            var rectY = Math.floor(((y - firstRectDetails[0].y) / firstRectDetails[0].height)) <
                this.heatMap.axisCollections[1].axisLabelSize ?
                Math.floor(((y - firstRectDetails[0].y) / firstRectDetails[0].height)) :
                this.heatMap.axisCollections[1].axisLabelSize - 1;
            rectX = rectX === 0 ? 1 : rectX;
            currentRect = this.heatMap.heatMapSeries.rectPositionCollection[rectY][rectX - 1];
            this.hoverXAxisLabel = this.heatMap.axisCollections[0].tooltipLabels[rectX - 1];
            this.hoverXAxisValue = this.heatMap.axisCollections[0].labelValue[rectX - 1];
            this.hoverYAxisLabel = this.heatMap.axisCollections[1].tooltipLabels[(this.heatMap.axisCollections[1].tooltipLabels.length - 1) - rectY];
            this.hoverYAxisValue = this.heatMap.axisCollections[1].labelValue[(this.heatMap.axisCollections[1].labelValue.length - 1) - rectY];
            return currentRect;
        };
        return Series;
    }());
    exports.Series = Series;
});
