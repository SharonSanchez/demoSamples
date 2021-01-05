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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "./utils/helper", "./utils/helper", "./utils/helper", "./model/base", "./model/theme", "./axis/axis", "./axis/axis-helpers", "./series/series", "./utils/colorMapping", "./utils/tooltip", "./datasource/twodimensional", "../heatmap/legend/legend", "./datasource/adaptor", "../heatmap/utils/export"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, ej2_svg_base_1, helper_1, helper_2, helper_3, base_1, theme_1, axis_1, axis_helpers_1, series_1, colorMapping_1, tooltip_1, twodimensional_1, legend_1, adaptor_1, export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HeatMap = (function (_super) {
        __extends(HeatMap, _super);
        function HeatMap() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.enableCanvasRendering = false;
            _this.isColorRange = false;
            _this.isCellTapHold = false;
            _this.selectedCellCount = 0;
            _this.toggleValue = [];
            _this.legendOnLoad = true;
            _this.resizing = false;
            _this.rendering = true;
            _this.horizontalGradient = _this.legendSettings.position === 'Bottom' || _this.legendSettings.position === 'Top';
            _this.multiSelection = false;
            _this.rectSelected = false;
            _this.previousSelectedCellsRect = [];
            _this.multiCellCollection = [];
            _this.selectedMultiCellCollection = [];
            _this.tempMultiCellCollection = [];
            _this.tooltipCollection = [];
            _this.isCellData = false;
            _this.isBlazor = false;
            return _this;
        }
        HeatMap.prototype.preRender = function () {
            this.initPrivateVariable();
            this.unWireEvents();
            this.wireEvents();
        };
        HeatMap.prototype.export = function (type, fileName, orientation) {
            var exportMap = new export_1.ExportUtils(this);
            exportMap.export(type, fileName, orientation);
        };
        HeatMap.prototype.initPrivateVariable = function () {
            this.renderer = new ej2_svg_base_1.SvgRenderer(this.element.id);
            this.canvasRenderer = new ej2_svg_base_1.CanvasRenderer(this.element.id);
            this.secondaryCanvasRenderer = new ej2_svg_base_1.CanvasRenderer(this.element.id + '_secondary');
            this.heatMapAxis = new axis_helpers_1.AxisHelper(this);
            this.heatMapSeries = new series_1.Series(this);
            this.drawSvgCanvas = new helper_2.DrawSvgCanvas(this);
            this.twoDimensional = new twodimensional_1.TwoDimensional(this);
            this.cellColor = new colorMapping_1.CellColor(this);
            this.tempRectHoverClass = '';
            this.tempTooltipRectId = '';
            this.setCulture();
            this.isBlazor = ej2_base_3.isBlazor();
        };
        HeatMap.prototype.setCulture = function () {
            this.intl = new ej2_base_1.Internationalization();
        };
        HeatMap.prototype.render = function () {
            this.updateBubbleHelperProperty();
            this.trigger('load', { heatmap: (this.isBlazor ? null : this) });
            this.initAxis();
            this.processInitData();
            this.setTheme();
            this.calculateMaxLength();
            this.heatMapAxis.calculateVisibleLabels();
            this.twoDimensional.processDataSource(this.completeAdaptDataSource);
            this.createSvg();
            this.cellColor.getColorCollection();
            this.calculateBounds();
            this.renderElements();
            this.appendSvgObject();
            if (this.tooltipModule) {
                this.tooltipModule.showHideTooltip(false);
            }
            this.renderComplete();
        };
        HeatMap.prototype.reRenderDatasource = function () {
            this.dataSourceMinValue = null;
            this.dataSourceMaxValue = null;
            this.processInitData();
            this.calculateMaxLength();
            this.heatMapAxis.calculateVisibleLabels();
            this.twoDimensional.processDataSource(this.completeAdaptDataSource);
            this.cellColor.getColorCollection();
            this.calculateBounds();
        };
        HeatMap.prototype.processInitData = function () {
            if (this.adaptorModule) {
                this.adaptorModule.constructDatasource(this.dataSource, this.dataSourceSettings);
            }
            else {
                this.completeAdaptDataSource = this.dataSource;
            }
        };
        HeatMap.prototype.setRenderMode = function () {
            if (this.renderingMode === 'Canvas') {
                this.enableCanvasRendering = true;
            }
            else if (this.renderingMode === 'Auto' &&
                (this.axisCollections[0].axisLabelSize * this.axisCollections[1].axisLabelSize) >= 10000) {
                this.enableCanvasRendering = true;
            }
            else {
                this.enableCanvasRendering = false;
            }
        };
        HeatMap.prototype.updateBubbleHelperProperty = function () {
            if (this.cellSettings.tileType === 'Bubble' &&
                (this.cellSettings.bubbleType === 'Size' || this.cellSettings.bubbleType === 'Sector')) {
                this.legendVisibilityByCellType = false;
            }
            else if (this.legendModule && this.legendSettings.visible) {
                this.legendVisibilityByCellType = true;
            }
            if (this.cellSettings.tileType === 'Bubble' && this.cellSettings.bubbleType === 'SizeAndColor') {
                this.bubbleSizeWithColor = true;
            }
            else {
                this.bubbleSizeWithColor = false;
            }
        };
        HeatMap.prototype.renderElements = function () {
            this.tooltipCollection = [];
            this.renderSecondaryElement();
            this.renderBorder();
            this.renderTitle();
            this.heatMapAxis.renderAxes();
            if (this.tooltipModule && this.showTooltip) {
                this.tooltipModule.tooltipObject = null;
                this.tooltipModule.createTooltipDiv(this);
            }
            this.heatMapSeries.renderRectSeries();
            if (this.legendModule && this.legendSettings.visible
                && this.legendVisibilityByCellType) {
                this.legendModule.renderLegendItems();
                if (this.paletteSettings.type === 'Fixed' && this.legendSettings.enableSmartLegend &&
                    this.legendSettings.labelDisplayType === 'None') {
                    this.legendModule.createTooltipDiv(this);
                }
            }
        };
        HeatMap.prototype.getModuleName = function () {
            return 'heatmap';
        };
        HeatMap.prototype.getPersistData = function () {
            return '';
        };
        HeatMap.prototype.onPropertyChanged = function (newProp, oldProp) {
            var renderer = false;
            var refreshBounds = false;
            var isUpdateSelection = true;
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'renderingMode':
                        this.rendering = false;
                        isUpdateSelection = false;
                        renderer = true;
                        break;
                    case 'cellSettings':
                        this.updateBubbleHelperProperty();
                        if (this.legendModule && ((newProp.cellSettings.tileType !== (oldProp.cellSettings
                            !== undefined && oldProp.cellSettings.tileType))
                            || (newProp.cellSettings.bubbleType !== oldProp.cellSettings.bubbleType))) {
                            this.legendOnLoad = true;
                            this.legendModule.updateLegendRangeCollections();
                        }
                        if (this.cellSettings.tileType === 'Bubble') {
                            isUpdateSelection = false;
                        }
                        this.reRenderDatasource();
                        refreshBounds = true;
                        break;
                    case 'showTooltip':
                        refreshBounds = true;
                        break;
                    case 'dataSource':
                    case 'dataSourceSettings':
                        this.isCellData = false;
                        this.paletteCellSelectionUpdation();
                        this.reRenderDatasource();
                        isUpdateSelection = false;
                        renderer = true;
                        break;
                    case 'titleSettings':
                    case 'width':
                    case 'height':
                    case 'margin':
                        refreshBounds = true;
                        break;
                    case 'legendSettings':
                        this.updateBubbleHelperProperty();
                        if (this.legendVisibilityByCellType && (((newProp.legendSettings.visible !==
                            (oldProp.legendSettings !== undefined && oldProp.legendSettings.visible)) ||
                            (newProp.legendSettings.enableSmartLegend !== oldProp.legendSettings.enableSmartLegend)))) {
                            this.legendOnLoad = true;
                            this.legendModule.updateLegendRangeCollections();
                        }
                        else {
                            this.legendOnLoad = false;
                        }
                        refreshBounds = true;
                        break;
                    case 'yAxis':
                    case 'xAxis':
                        this.paletteCellSelectionUpdation();
                        this.reRenderDatasource();
                        isUpdateSelection = false;
                        refreshBounds = true;
                        break;
                    case 'paletteSettings':
                        this.paletteCellSelectionUpdation();
                        this.twoDimensional.processDataSource(this.completeAdaptDataSource);
                        this.cellColor.getColorCollection();
                        this.calculateBounds();
                        renderer = true;
                        break;
                    case 'theme':
                        this.setTheme();
                        renderer = true;
                        break;
                    case 'tooltipSettings':
                        if (this.tooltipModule) {
                            this.tooltipModule.tooltipObject.fill = this.tooltipSettings.fill;
                            this.tooltipModule.tooltipObject.border = this.tooltipSettings.border;
                            this.tooltipModule.tooltipObject.textStyle = this.tooltipSettings.textStyle;
                            this.tooltipModule.tooltipObject.template = this.tooltipSettings.template;
                            this.tooltipModule.tooltipObject.refresh();
                        }
                        break;
                }
            }
            if (!refreshBounds && renderer) {
                this.createSvg();
                this.renderElements();
                this.appendSvgObject();
                this.trigger('created');
                if (!isUpdateSelection) {
                    this.clearSelection();
                }
            }
            else if (refreshBounds) {
                this.createSvg();
                this.refreshBound();
                this.appendSvgObject();
                this.trigger('created');
            }
            if (this.allowSelection && this.rectSelected) {
                if (isUpdateSelection) {
                    this.updateCellSelection();
                }
                else {
                    this.clearSelection();
                }
            }
            this.rendering = true;
        };
        HeatMap.prototype.paletteCellSelectionUpdation = function () {
            this.updateBubbleHelperProperty();
            if (this.legendVisibilityByCellType) {
                this.legendOnLoad = true;
                this.legendModule.updateLegendRangeCollections();
            }
        };
        HeatMap.prototype.createSvg = function () {
            this.removeSvg();
            this.setRenderMode();
            this.calculateSize();
            if (!this.enableCanvasRendering) {
                this.svgObject = this.renderer.createSvg({
                    id: this.element.id + '_svg',
                    width: this.availableSize.width,
                    height: this.availableSize.height
                });
                if (this.cellSettings.border.width.toString() === '0' && this.cellSettings.tileType === 'Rect') {
                    this.svgObject.setAttribute('shape-rendering', 'crispEdges');
                }
            }
            else {
                this.svgObject = this.canvasRenderer.createCanvas({
                    id: this.element.id + '_canvas',
                    width: this.availableSize.width,
                    height: this.availableSize.height
                });
                if (this.allowSelection) {
                    this.createMultiCellDiv(true);
                }
            }
        };
        HeatMap.prototype.removeSvg = function () {
            if (document.getElementById(this.element.id + '_Secondary_Element')) {
                ej2_base_2.remove(document.getElementById(this.element.id + '_Secondary_Element'));
            }
            if (document.getElementById(this.element.id + 'Celltooltipcontainer')) {
                ej2_base_2.remove(document.getElementById(this.element.id + 'Celltooltipcontainer'));
            }
            if (document.getElementById(this.element.id + 'legendLabelTooltipContainer')) {
                ej2_base_2.remove(document.getElementById(this.element.id + 'legendLabelTooltipContainer'));
            }
            if (document.getElementById(this.element.id + '_Multi_CellSelection_Canvas')) {
                ej2_base_2.remove(document.getElementById(this.element.id + '_Multi_CellSelection_Canvas'));
            }
            if (document.getElementById(this.element.id + '_CellSelection_Container')) {
                ej2_base_2.remove(document.getElementById(this.element.id + '_CellSelection_Container'));
            }
            if (this.svgObject) {
                var svgElement = document.getElementById(this.svgObject.id);
                if (svgElement) {
                    while (this.svgObject.childNodes.length) {
                        this.svgObject.removeChild(this.svgObject.firstChild);
                    }
                    ej2_base_2.remove(this.svgObject);
                }
            }
        };
        HeatMap.prototype.renderSecondaryElement = function () {
            var tooltipDiv = this.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            this.element.appendChild(tooltipDiv);
            var divElement = this.createElement('div', {
                id: this.element.id + '_CellSelection_Container',
                styles: 'position:absolute; z-index: 2 ; top:' + this.initialClipRect.y + 'px' + '; left:' + this.initialClipRect.x + 'px',
            });
            this.element.appendChild(divElement);
        };
        HeatMap.prototype.requiredModules = function () {
            var modules = [];
            if (this.showTooltip) {
                modules.push({
                    member: 'Tooltip',
                    args: [this]
                });
            }
            if (this.legendSettings) {
                modules.push({
                    member: 'Legend',
                    args: [this]
                });
            }
            if (this.dataSource) {
                modules.push({
                    member: 'Adaptor',
                    args: [this]
                });
            }
            return modules;
        };
        HeatMap.prototype.destroy = function () {
            this.unWireEvents();
            _super.prototype.destroy.call(this);
            this.element.innerHTML = '';
            this.element.classList.remove('e-heatmap');
        };
        HeatMap.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this.element.classList.add('e-heatmap');
        };
        HeatMap.prototype.appendSvgObject = function () {
            if (this.enableCanvasRendering && this.allowSelection) {
                this.createMultiCellDiv(false);
            }
            else {
                this.element.appendChild(this.svgObject);
            }
        };
        HeatMap.prototype.renderBorder = function () {
            this.border = {
                width: 0
            };
            var width = 0;
            var rect = new helper_1.RectOption(this.element.id + '_HeatmapBorder', this.themeStyle.background, this.border, 1, new helper_1.Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.drawSvgCanvas.drawRectangle(rect, this.svgObject);
        };
        HeatMap.prototype.calculateSize = function () {
            var width = helper_1.stringToNumber(this.width, this.element.offsetWidth) || this.element.offsetWidth || 600;
            var height = helper_1.stringToNumber(this.height, this.element.offsetHeight) || this.element.offsetHeight || 450;
            this.availableSize = new helper_1.Size(width, height);
            var alignElement = this.element;
            while (alignElement.parentNode) {
                if (alignElement.tagName === 'BODY') {
                    break;
                }
                var align = alignElement.align;
                if (align === 'center') {
                    var containerWidth = this.availableSize.width.toString();
                    this.element.style.width = containerWidth + 'px';
                    this.element.style.margin = '0 auto';
                    break;
                }
                alignElement = alignElement.parentElement;
            }
        };
        HeatMap.prototype.renderTitle = function () {
            if (this.titleSettings.text) {
                var titleStyle = this.titleSettings.textStyle;
                var anchor = titleStyle.textAlignment === 'Near' ? 'start' :
                    titleStyle.textAlignment === 'Far' ? 'end' : 'middle';
                this.elementSize = helper_1.measureText(this.titleCollection[0], titleStyle);
                var options = new helper_2.TextOption(this.element.id + '_HeatmapTitle', new helper_1.TextBasic(helper_2.titlePositionX(this.availableSize.width - this.margin.left - this.margin.right, this.margin.left, this.margin.right, titleStyle), this.margin.top + ((this.elementSize.height) * 3 / 4), anchor, this.titleCollection), titleStyle, titleStyle.color || this.themeStyle.heatMapTitle);
                if (this.titleCollection.length > 1) {
                    this.drawSvgCanvas.createWrapText(options, titleStyle, this.svgObject);
                }
                else {
                    this.drawSvgCanvas.createText(options, this.svgObject, this.titleCollection[0]);
                    if (this.titleCollection[0].indexOf('...') !== -1 && this.enableCanvasRendering) {
                        this.tooltipCollection.push(new helper_3.CanvasTooltip(this.titleSettings.text, new helper_1.Rect(this.margin.left, this.margin.top, this.elementSize.width, this.elementSize.height)));
                    }
                }
            }
        };
        HeatMap.prototype.titleTooltip = function (event, x, y, isTouch) {
            var targetId = event.target.id;
            if ((targetId === (this.element.id + '_HeatmapTitle')) && (event.target.textContent.indexOf('...') > -1)) {
                helper_2.showTooltip(this.titleSettings.text, x, y, this.element.offsetWidth, this.element.id + '_Title_Tooltip', helper_2.getElement(this.element.id + '_Secondary_Element'), isTouch, this);
            }
            else {
                helper_3.removeElement(this.element.id + '_Title_Tooltip');
            }
        };
        HeatMap.prototype.axisTooltip = function (event, x, y, isTouch) {
            var targetId = event.target.id;
            if ((targetId.indexOf(this.element.id + '_XAxis_Label') !== -1) ||
                (targetId.indexOf(this.element.id + '_YAxis_Label') !== -1) ||
                (targetId.indexOf(this.element.id + '_XAxis_MultiLevel') !== -1) ||
                (targetId.indexOf(this.element.id + '_YAxis_MultiLevel') !== -1)) {
                var tooltipText = helper_3.getTooltipText(this.tooltipCollection, x, y);
                if (tooltipText) {
                    helper_2.showTooltip(tooltipText, x, y, this.element.offsetWidth, this.element.id + '_axis_Tooltip', helper_2.getElement(this.element.id + '_Secondary_Element'), this.isTouch, this);
                }
                else {
                    helper_3.removeElement(this.element.id + '_axis_Tooltip');
                }
            }
            else {
                helper_3.removeElement(this.element.id + '_axis_Tooltip');
            }
        };
        HeatMap.prototype.isHeatmapRect = function (x, y) {
            var firstRectDetails = [];
            var lastRectDetails = [];
            var isRect;
            var borderBoundary = 5;
            firstRectDetails.push(this.heatMapSeries.rectPositionCollection[0][0]);
            lastRectDetails.push(this.heatMapSeries.rectPositionCollection[this.yLength - 1][this.xLength - 1]);
            if (this.cellSettings.border.width > borderBoundary && (x >= firstRectDetails[0].x && y >= firstRectDetails[0].y &&
                x <= (lastRectDetails[0].x + lastRectDetails[0].width) &&
                y <= (lastRectDetails[0].y + lastRectDetails[0].height)) && this.cellSettings.tileType === 'Rect') {
                var currentRect = this.heatMapSeries.getCurrentRect(x, y);
                var rectHeight = lastRectDetails[0].height;
                var rectWidth = lastRectDetails[0].width;
                var cellBorder = this.cellSettings.border.width / 2;
                if ((x >= (currentRect.x + cellBorder) && (y >= (currentRect.y + cellBorder)) &&
                    (x <= (currentRect.x + (rectWidth - cellBorder)) &&
                        (y <= (currentRect.y + (rectHeight - cellBorder)))))) {
                    isRect = true;
                    this.isRectBoundary = true;
                }
                else {
                    isRect = false;
                    this.isRectBoundary = false;
                }
            }
            else {
                isRect = (x >= firstRectDetails[0].x && y >= firstRectDetails[0].y &&
                    x <= (lastRectDetails[0].x + lastRectDetails[0].width) &&
                    y <= (lastRectDetails[0].y + lastRectDetails[0].height));
                this.isRectBoundary = isRect;
            }
            return isRect;
        };
        HeatMap.prototype.setTheme = function () {
            this.themeStyle = theme_1.getThemeColor(this.theme);
        };
        HeatMap.prototype.calculateBounds = function () {
            var margin = this.margin;
            var titleHeight = 0;
            var padding = (this.legendModule && this.legendSettings.position === 'Top'
                && this.legendVisibilityByCellType) || this.titleSettings.textStyle.size === '0px' ? 0 : 16;
            var left = margin.left;
            var width = this.availableSize.width - left - margin.right;
            if ((this.paletteSettings.colorGradientMode === 'Column' || this.paletteSettings.colorGradientMode === 'Row') &&
                this.paletteSettings.type === 'Gradient') {
                if (this.paletteSettings.palette.length === 0) {
                    this.legendVisibilityByCellType = false;
                }
                else {
                    for (var i = 0; i < this.paletteSettings.palette.length; i++) {
                        if (this.paletteSettings.palette[i].value !== null || '') {
                            this.legendVisibilityByCellType = true;
                        }
                        else if (this.paletteSettings.palette[i].value === null || '') {
                            this.legendVisibilityByCellType = false;
                            break;
                        }
                    }
                }
            }
            if (this.titleSettings.text) {
                this.titleCollection = helper_2.getTitle(this.titleSettings.text, this.titleSettings.textStyle, width);
                titleHeight = (helper_1.measureText(this.titleSettings.text, this.titleSettings.textStyle).height * this.titleCollection.length) +
                    padding;
            }
            var top = margin.top + titleHeight;
            this.titleRect = new helper_1.Rect(margin.left, margin.top, this.availableSize.width - margin.left - margin.right, titleHeight);
            var height = this.availableSize.height - top - margin.bottom;
            this.initialClipRect = new helper_1.Rect(left, top, width, height);
            var legendTop = this.initialClipRect.y;
            if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
                this.legendModule.calculateLegendBounds(this.initialClipRect);
            }
            this.heatMapAxis.measureAxis(this.initialClipRect);
            if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
                this.legendModule.calculateLegendSize(this.initialClipRect, legendTop);
            }
            this.heatMapAxis.calculateAxisSize(this.initialClipRect);
        };
        HeatMap.prototype.refreshBound = function () {
            this.updateBubbleHelperProperty();
            this.calculateBounds();
            this.renderElements();
        };
        HeatMap.prototype.initAxis = function () {
            var axis;
            var axes = [this.xAxis, this.yAxis];
            this.axisCollections = [];
            for (var i = 0, len = axes.length; i < len; i++) {
                axis = axes[i];
                axis.orientation = (i === 0) ? 'Horizontal' : 'Vertical';
                axis.jsonCellLabel = [];
                this.axisCollections.push(axis);
            }
        };
        HeatMap.prototype.wireEvents = function () {
            var _this = this;
            var isIE11Pointer = ej2_base_3.Browser.isPointer;
            var start = ej2_base_3.Browser.touchStartEvent;
            var stop = ej2_base_3.Browser.touchEndEvent;
            var move = ej2_base_3.Browser.touchMoveEvent;
            var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.add(this.element, ej2_base_3.Browser.isDevice ? start : 'click', this.heatMapMouseClick, this);
            ej2_base_2.EventHandler.add(this.element, start, this.heatMapMouseMove, this);
            ej2_base_2.EventHandler.add(this.element, stop, this.heatMapMouseLeave, this);
            ej2_base_2.EventHandler.add(this.element, move, this.heatMapMouseMove, this);
            ej2_base_2.EventHandler.add(this.element, cancel, this.heatMapMouseLeave, this);
            window.addEventListener((ej2_base_3.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.heatMapResize.bind(this));
            var heatmap = this;
            var touchObj = new ej2_base_2.Touch(this.element, {
                tapHold: function () {
                    heatmap.isCellTapHold = true;
                    heatmap.getDataCollection();
                    heatmap.currentRect.allowCollection = false;
                    heatmap.setCellOpacity();
                    var argData = {
                        heatmap: (_this.isBlazor ? null : heatmap),
                        cancel: false,
                        name: 'cellSelected',
                        data: heatmap.multiCellCollection
                    };
                    heatmap.trigger('cellSelected', argData);
                },
                tap: function () {
                    var isCellTap = false;
                    if (!heatmap.isCellTapHold) {
                        isCellTap = true;
                    }
                    heatmap.tooltipOnMouseMove(null, heatmap.currentRect, isCellTap);
                }
            });
            this.setStyle(this.element);
        };
        HeatMap.prototype.setStyle = function (element) {
            element.style.touchAction = 'element';
            element.style.msTouchAction = 'element';
            element.style.msContentZooming = 'none';
            element.style.msUserSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.position = 'relative';
            element.style.display = 'block';
        };
        HeatMap.prototype.print = function () {
            var exportChart = new export_1.ExportUtils(this);
            exportChart.print();
        };
        HeatMap.prototype.unWireEvents = function () {
            var isIE11Pointer = ej2_base_3.Browser.isPointer;
            var start = ej2_base_3.Browser.touchStartEvent;
            var stop = ej2_base_3.Browser.touchEndEvent;
            var move = ej2_base_3.Browser.touchMoveEvent;
            var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.remove(this.element, ej2_base_3.Browser.isDevice ? start : 'click', this.heatMapMouseClick);
            ej2_base_2.EventHandler.remove(this.element, start, this.heatMapMouseMove);
            ej2_base_2.EventHandler.remove(this.element, move, this.heatMapMouseLeave);
            ej2_base_2.EventHandler.remove(this.element, move, this.heatMapMouseMove);
            ej2_base_2.EventHandler.remove(this.element, cancel, this.heatMapMouseLeave);
            window.removeEventListener((ej2_base_3.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.heatMapResize);
        };
        HeatMap.prototype.heatMapResize = function (e) {
            var _this = this;
            this.resizing = true;
            var argData = {
                heatmap: (this.isBlazor ? null : this),
                cancel: false,
                name: 'resized',
                currentSize: new helper_1.Size(0, 0),
                previousSize: new helper_1.Size(this.availableSize.width, this.availableSize.height),
            };
            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer);
            }
            this.resizeTimer = setTimeout(function () {
                if (_this.isDestroyed) {
                    clearTimeout(_this.resizeTimer);
                    return;
                }
                _this.createSvg();
                argData.currentSize = _this.availableSize;
                _this.trigger('resized', argData);
                _this.refreshBound();
                _this.appendSvgObject();
                if (_this.allowSelection) {
                    _this.updateCellSelection();
                }
                _this.trigger('loaded', (_this.isBlazor ? null : { heatmap: _this }));
                _this.resizing = false;
            }, 500);
            return false;
        };
        HeatMap.prototype.updateCellSelection = function () {
            var wSize = this.initialClipRect.width / this.axisCollections[0].axisLabelSize;
            var hSize = this.initialClipRect.height / this.axisCollections[1].axisLabelSize;
            var x = this.initialClipRect.x;
            var y = this.initialClipRect.y;
            if (!this.enableCanvasRendering) {
                if (this.multiCellCollection.length !== 0) {
                    var containersRect = document.getElementById(this.element.id + '_Container_RectGroup');
                    var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                    for (var i = 0; i < containersRect.childNodes.length; i++) {
                        containersRect.childNodes[i].setAttribute('opacity', '0.3');
                        if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                            containerText.childNodes[i].setAttribute('opacity', '0.3');
                        }
                    }
                    for (var i = 0; i < this.multiCellCollection.length; i++) {
                        var collectionClass = this.multiCellCollection[i].cellElement;
                        var cellIndex = collectionClass.id.replace(this.element.id + '_HeatMapRect_', '');
                        var index = parseInt(cellIndex, 10);
                        containersRect.childNodes[index].setAttribute('opacity', '1');
                        if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                            var getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                            if (getText) {
                                getText.setAttribute('opacity', '1');
                            }
                            this.addSvgClass(containersRect.childNodes[index]);
                        }
                    }
                }
            }
            else if (this.enableCanvasRendering) {
                var rect = this.multiCellCollection;
                var oldCanvas = document.getElementById(this.element.id + '_canvas');
                var newCanvas = document.getElementById(this.element.id + '_secondary_canvas');
                var initialRect = this.initialClipRect;
                var rectHeight = initialRect.y + initialRect.height;
                var rectWidth = initialRect.x + initialRect.width;
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    this.multiCellCollection[i].width = rect[i].width = wSize;
                    this.multiCellCollection[i].height = rect[i].height = hSize;
                    this.multiCellCollection[i].x = rect[i].x = x + wSize * this.multiCellCollection[i].xPosition;
                    this.multiCellCollection[i].y = rect[i].y = y + hSize * this.multiCellCollection[i].yPosition;
                    var rectImage = oldCanvas.getContext('2d').getImageData(rect[i].x, rect[i].y, rect[i].width, rect[i].height);
                    newCanvas.getContext('2d').putImageData(rectImage, rect[i].x, rect[i].y);
                    oldCanvas.style.opacity = '0.3';
                }
                var topPositions = oldCanvas.getContext('2d').getImageData(0, 0, this.availableSize.width, initialRect.y);
                newCanvas.getContext('2d').putImageData(topPositions, 0, 0);
                var bottomPositions = oldCanvas.getContext('2d').getImageData(0, rectHeight, this.availableSize.width, this.availableSize.height - rectHeight);
                newCanvas.getContext('2d').putImageData(bottomPositions, 0, initialRect.y + initialRect.height);
                var rightPosition = oldCanvas.getContext('2d').
                    getImageData(rectWidth, 0, this.availableSize.width - rectWidth, this.availableSize.height);
                newCanvas.getContext('2d').putImageData(rightPosition, rectWidth, 0);
                var leftPosition = oldCanvas.getContext('2d').getImageData(0, 0, initialRect.x, this.availableSize.height);
                newCanvas.getContext('2d').putImageData(leftPosition, 0, 0);
                helper_3.removeElement(this.element.id + '_selectedCells');
            }
        };
        HeatMap.prototype.clearSVGSelection = function () {
            var rect = document.getElementById(this.element.id + '_Container_RectGroup');
            var text = document.getElementById(this.element.id + '_Container_TextGroup');
            for (var i = 0; i < rect.childNodes.length; i++) {
                var elementClassName = rect.childNodes[i].getAttribute('class');
                if (elementClassName === this.element.id + '_selected') {
                    this.removeSvgClass(rect.childNodes[i], elementClassName);
                }
                rect.childNodes[i].setAttribute('opacity', '1');
                if (this.cellSettings.showLabel && text.childNodes[i]) {
                    text.childNodes[i].setAttribute('opacity', '1');
                }
            }
        };
        HeatMap.prototype.calculateMaxLength = function () {
            var dataSource = this.completeAdaptDataSource;
            if (dataSource && dataSource.length > 0) {
                var xAxisMax = dataSource.length - 1;
                var yAxisMax = 0;
                for (var i = 0; i <= xAxisMax; i++) {
                    var length_1 = dataSource[i].length;
                    yAxisMax = yAxisMax > length_1 ? yAxisMax : length_1;
                }
                this.axisCollections[0].maxLength = xAxisMax;
                this.axisCollections[1].maxLength = yAxisMax - 1;
            }
            else {
                this.axisCollections[0].maxLength = 0;
                this.axisCollections[1].maxLength = 0;
            }
        };
        HeatMap.prototype.setMouseXY = function (pageX, pageY) {
            var rect = this.element.getBoundingClientRect();
            var svgCanvasRect;
            if (this.enableCanvasRendering) {
                svgCanvasRect = document.getElementById(this.element.id + '_canvas').getBoundingClientRect();
            }
            else {
                svgCanvasRect = document.getElementById(this.element.id + '_svg').getBoundingClientRect();
            }
            this.mouseX = (pageX - rect.left) - Math.max(svgCanvasRect.left - rect.left, 0);
            this.mouseY = (pageY - rect.top) - Math.max(svgCanvasRect.top - rect.top, 0);
        };
        HeatMap.prototype.heatMapMouseClick = function (e) {
            var pageX;
            var pageY;
            var tooltipText;
            var touchArg;
            var elementRect = this.element.getBoundingClientRect();
            if (e.type === 'touchstart') {
                this.isTouch = true;
                touchArg = e;
                pageY = touchArg.changedTouches[0].clientY;
                pageX = touchArg.changedTouches[0].clientX;
            }
            else {
                this.isTouch = false;
                pageY = e.clientY;
                pageX = e.clientX;
            }
            pageX -= elementRect.left;
            pageY -= elementRect.top;
            var isheatmapRect = this.isHeatmapRect(pageX, pageY);
            if (isheatmapRect) {
                var currentRect = this.heatMapSeries.getCurrentRect(pageX, pageY);
                this.trigger('cellClick', {
                    heatmap: (this.isBlazor ? null : this),
                    value: currentRect.value,
                    x: currentRect.x,
                    y: currentRect.y,
                    xLabel: this.heatMapSeries.hoverXAxisLabel,
                    yLabel: this.heatMapSeries.hoverYAxisLabel,
                    xValue: this.heatMapSeries.hoverXAxisValue,
                    yValue: this.heatMapSeries.hoverYAxisValue,
                    cellElement: this.enableCanvasRendering ? null : document.getElementById(currentRect.id),
                    event: e
                });
            }
            this.notify('click', e);
            if (this.paletteSettings.type !== 'Gradient' && this.legendModule
                && this.legendSettings.visible && this.legendVisibilityByCellType) {
                var page = this.legendModule.navigationCollections;
                if (page.length && pageX > page[0].x && pageX < page[0].x + page[0].width &&
                    pageY > page[0].y && pageY < page[0].y + page[0].height) {
                    this.legendModule.translatePage(this, this.legendModule.currentPage, true);
                }
                else if (page.length && pageX > page[1].x && pageX < page[1].x + page[1].width &&
                    pageY > page[1].y && pageY < page[1].y + page[1].height) {
                    this.legendModule.translatePage(this, this.legendModule.currentPage, false);
                }
                var legendRange = this.legendModule.legendRange;
                var legendTextRange = this.legendModule.legendTextRange;
                var loop = true;
                for (var i = 0; i < legendRange.length; i++) {
                    if (this.legendModule && this.legendSettings.toggleVisibility &&
                        this.legendModule.currentPage === legendRange[i].currentPage) {
                        if ((loop && (pageX >= legendRange[i].x && pageX <= legendRange[i].width + legendRange[i].x) &&
                            (pageY >= legendRange[i].y && pageY <= legendRange[i].y + legendRange[i].height) ||
                            ((this.legendSettings.showLabel && this.legendSettings.labelDisplayType !== 'None' &&
                                pageX >= legendTextRange[i].x && pageX <= legendTextRange[i].width + legendTextRange[i].x) &&
                                (pageY >= legendTextRange[i].y && pageY <= legendTextRange[i].y + legendTextRange[i].height)))) {
                            this.legendModule.legendRangeSelection(i);
                            loop = false;
                        }
                    }
                }
            }
            return false;
        };
        HeatMap.prototype.heatMapMouseMove = function (e) {
            var pageX;
            var pageY;
            var touchArg;
            var elementRect = this.element.getBoundingClientRect();
            if (e.type === 'touchmove' || e.type === 'touchstart') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                this.isTouch = false;
                pageX = e.clientX;
                pageY = e.clientY;
            }
            pageX -= elementRect.left;
            pageY -= elementRect.top;
            this.setMouseXY(pageX, pageY);
            this.mouseAction(e, pageX, pageY, touchArg, elementRect);
            return true;
        };
        HeatMap.prototype.mouseAction = function (e, pageX, pageY, touchArg, elementRect) {
            var tooltipText;
            if (e.target && e.target.id) {
                var isheatmapRect = this.isHeatmapRect(pageX, pageY);
                if (this.legendModule) {
                    if (isheatmapRect) {
                        if (this.paletteSettings.type === 'Gradient' &&
                            this.legendSettings.showGradientPointer && this.legendSettings.visible && this.legendVisibilityByCellType) {
                            this.legendModule.renderGradientPointer(e, pageX, pageY);
                        }
                    }
                    else {
                        this.legendModule.removeGradientPointer();
                    }
                    this.renderMousePointer(pageX, pageY);
                }
                var isshowTooltip = void 0;
                var currentRect = void 0;
                isshowTooltip = this.showTooltip && this.tooltipModule ? isheatmapRect : false;
                if (isheatmapRect) {
                    currentRect = this.heatMapSeries.getCurrentRect(pageX, pageY);
                    if (e.which !== 2 && e.which !== 3) {
                        isshowTooltip = this.cellSelectionOnMouseMove(e, currentRect, pageX, pageY, isshowTooltip);
                    }
                }
                this.tooltipOnMouseMove(e, currentRect, isshowTooltip, isheatmapRect);
                if (this.legendModule && this.legendSettings.visible && this.paletteSettings.type === 'Fixed' &&
                    this.legendSettings.enableSmartLegend && this.legendSettings.labelDisplayType === 'None') {
                    this.legendModule.createTooltip(pageX, pageY);
                }
                if (!this.enableCanvasRendering) {
                    if (this.titleSettings.text && this.titleSettings.textStyle.textOverflow === 'Trim') {
                        this.titleTooltip(e, pageX, pageY, this.isTouch);
                    }
                    this.axisTooltip(e, pageX, pageY, this.isTouch);
                    if (this.legendModule && this.legendSettings.visible && this.legendSettings.showLabel && this.legendVisibilityByCellType) {
                        this.legendModule.renderLegendLabelTooltip(e, pageX, pageY);
                    }
                    if (this.legendModule && this.legendSettings.visible && this.legendVisibilityByCellType) {
                        this.legendModule.renderLegendTitleTooltip(e, pageX, pageY);
                    }
                }
                else {
                    elementRect = this.element.getBoundingClientRect();
                    var tooltipRect = (this.paletteSettings.type === 'Fixed' && this.legendSettings.enableSmartLegend &&
                        this.legendSettings.labelDisplayType === 'None') ? false : true;
                    tooltipText = helper_3.getTooltipText(this.tooltipCollection, pageX, pageY) ||
                        (this.legendModule && tooltipRect && (helper_3.getTooltipText(this.legendModule.legendLabelTooltip, pageX, pageY)
                            || helper_3.getTooltipText(this.legendModule.legendTitleTooltip, pageX, pageY)));
                    if (tooltipText) {
                        helper_2.showTooltip(tooltipText, pageX, pageY, this.element.offsetWidth, this.element.id + '_canvas_Tooltip', helper_2.getElement(this.element.id + '_Secondary_Element'), this.isTouch, this);
                    }
                    else {
                        helper_3.removeElement(this.element.id + '_canvas_Tooltip');
                    }
                }
            }
            return true;
        };
        HeatMap.prototype.cellSelectionOnMouseMove = function (e, currentRect, pageX, pageY, isshowTooltip) {
            if ((this.cellSettings.tileType === 'Rect' && e.type === 'mousedown' || e.type === 'touchstart'
                || e.type === 'pointerdown') && this.allowSelection) {
                this.previousRect = currentRect;
                this.multiSelection = true;
                this.rectSelected = true;
                this.initialCellX = pageX;
                this.initialCellY = pageY;
                e.preventDefault();
            }
            if (this.cellSettings.tileType === 'Rect' && this.multiSelection && currentRect) {
                isshowTooltip = false;
                this.highlightSelectedCells(this.previousRect, currentRect, pageX, pageY, e);
            }
            return isshowTooltip;
        };
        HeatMap.prototype.tooltipOnMouseMove = function (e, currentRect, isshowTooltip, isheatmapRect) {
            var _this = this;
            if (isshowTooltip && currentRect) {
                if (this.tempTooltipRectId !== currentRect.id) {
                    if (this.showTooltip) {
                        if ((this.cellSettings.enableCellHighlighting || (this.tooltipModule && this.showTooltip))
                            && !this.enableCanvasRendering) {
                            this.heatMapSeries.highlightSvgRect(currentRect.id);
                        }
                        this.tooltipModule.renderTooltip(currentRect);
                        if (this.isTouch) {
                            if (this.tooltipTimer) {
                                window.clearTimeout(this.tooltipTimer);
                            }
                            this.tooltipTimer = setTimeout(function () {
                                _this.tooltipModule.tooltipObject.fadeOut();
                                _this.tooltipModule.isFadeout = true;
                            }, 1500);
                            if (e) {
                                if (e.type === 'touchmove') {
                                    e.preventDefault();
                                }
                            }
                        }
                    }
                    this.tempTooltipRectId = currentRect.id;
                }
            }
            else {
                if (e !== null) {
                    var borderBoundary = 5;
                    if (!isheatmapRect) {
                        if ((this.cellSettings.enableCellHighlighting || this.showTooltip) && !this.enableCanvasRendering &&
                            this.cellSettings.border.width < borderBoundary) {
                            this.heatMapSeries.highlightSvgRect(e.target.id);
                        }
                        if (this.tooltipModule && this.showTooltip) {
                            this.tooltipModule.showHideTooltip(false, true);
                        }
                    }
                    else if (!this.showTooltip && this.cellSettings.border.width > borderBoundary) {
                        this.heatMapSeries.highlightSvgRect(e.target.id);
                    }
                }
                this.tempTooltipRectId = '';
            }
        };
        HeatMap.prototype.highlightSelectedCells = function (previousRect, currentRect, pageX, pageY, e) {
            var pXIndex = previousRect.xIndex;
            var pYIndex = previousRect.yIndex;
            var cXIndex = currentRect.xIndex;
            var cYIndex = currentRect.yIndex;
            this.currentRect = currentRect;
            this.selectedCellsRect = new helper_1.Rect(0, 0, 0, 0);
            this.selectedCellsRect.x = previousRect.x > currentRect.x ? currentRect.x : previousRect.x;
            this.selectedCellsRect.y = previousRect.y > currentRect.y ? currentRect.y : previousRect.y;
            this.selectedCellsRect.width = ((previousRect.x > currentRect.x ? (pXIndex - cXIndex) :
                (cXIndex - pXIndex)) + 1) * currentRect.width;
            this.selectedCellsRect.height = ((previousRect.y > currentRect.y ? (pYIndex - cYIndex) :
                (cYIndex - pYIndex)) + 1) * currentRect.height;
            if (e.type === 'touchstart') {
                this.isCellTapHold = true;
            }
            else {
                this.isCellTapHold = false;
            }
            e.preventDefault();
            if (e.ctrlKey === false && e.type !== 'touchstart' && e.type !== 'touchmove') {
                this.removeSelectedCellsBorder();
            }
            var x = this.initialCellX > pageX ? pageX : this.initialCellX;
            var y = this.initialCellY > pageY ? pageY : this.initialCellY;
            var parentDiv = document.getElementById(this.element.id + '_CellSelection_Container');
            var svgObject = this.renderer.createSvg({
                id: this.element.id + '_CellSelection_Container_svg',
                width: this.initialClipRect.width,
                height: this.initialClipRect.height,
            });
            parentDiv.appendChild(svgObject);
            var parent = document.getElementById(this.element.id + '_CellSelection_Container_svg');
            var rect = new helper_1.Rect(x - this.initialClipRect.x, y - this.initialClipRect.y, Math.abs(pageX - this.initialCellX), Math.abs(pageY - this.initialCellY));
            var rectItems = new helper_1.RectOption(this.element.id + '_selectedCells', '#87ceeb', { color: 'transparent', width: 1 }, 1, rect, '#0000ff');
            parent.appendChild(this.renderer.drawRectangle(rectItems));
            document.getElementById(this.element.id + '_selectedCells').style.opacity = '0.5';
        };
        HeatMap.prototype.getDataCollection = function () {
            var pXIndex = this.previousRect.xIndex;
            var pYIndex = this.previousRect.yIndex;
            var cXIndex = this.currentRect.xIndex;
            var cYIndex = this.currentRect.yIndex;
            var minX = cXIndex > pXIndex ? pXIndex : cXIndex;
            var maxX = cXIndex > pXIndex ? cXIndex : pXIndex;
            var minY = cYIndex > pYIndex ? pYIndex : cYIndex;
            var maxY = cYIndex > pYIndex ? cYIndex : pYIndex;
            var tempX = minX;
            var tempY = minY;
            var cellX = this.previousRect.x;
            var cellY = this.previousRect.y;
            this.getCellCollection(this.currentRect, this.previousRect, true, tempX, tempY, maxX, maxY, minX, cellX, cellY);
            tempX = minX;
            tempY = minY;
            cellX = this.previousRect.x;
            cellY = this.previousRect.y;
            this.checkSelectedCells();
            this.getCellCollection(this.currentRect, this.previousRect, false, tempX, tempY, maxX, maxY, minX, cellX, cellY);
            this.selectedMultiCellCollection = [];
            this.canvasSelectedCells = new helper_1.Rect(0, 0, 0, 0);
            this.selectedCellCount = 0;
        };
        HeatMap.prototype.getCellCollection = function (currentRect, previousRect, singleCellData, tempX, tempY, maxX, maxY, minX, cellX, cellY) {
            var xIndex = Math.abs((currentRect.xIndex === previousRect.xIndex ?
                0 : currentRect.xIndex - previousRect.xIndex)) + 1;
            var yIndex = Math.abs((currentRect.yIndex === previousRect.yIndex ?
                0 : currentRect.yIndex - previousRect.yIndex)) + 1;
            for (var i = 0; i < (xIndex * yIndex); i++) {
                if (singleCellData) {
                    this.getSelectedCellData(cellX, cellY, true);
                }
                else {
                    this.getSelectedCellData(cellX, cellY, false);
                }
                if (tempX < maxX) {
                    cellX += currentRect.xIndex > previousRect.xIndex ? currentRect.width : -currentRect.width;
                    tempX++;
                }
                else if (tempY < maxY) {
                    cellY += currentRect.yIndex > previousRect.yIndex ? currentRect.height : -currentRect.height;
                    cellX = previousRect.x;
                    tempX = minX;
                }
            }
        };
        HeatMap.prototype.removeSelectedCellsBorder = function () {
            if (!this.enableCanvasRendering) {
                var containerRect = document.getElementById(this.element.id + '_Container_RectGroup');
                var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                for (var i = 0; i < containerRect.childNodes.length; i++) {
                    var elementClassName = containerRect.childNodes[i].getAttribute('class');
                    containerRect.childNodes[i].setAttribute('opacity', '0.3');
                    if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                        containerText.childNodes[i].setAttribute('opacity', '0.3');
                        this.removeSvgClass(containerRect.childNodes[i], elementClassName);
                    }
                }
            }
            else {
                var ctx = this.secondaryCanvasRenderer.ctx;
                for (var i = 0; i < this.previousSelectedCellsRect.length; i++) {
                    var rect = this.previousSelectedCellsRect[i];
                    ctx.save();
                    ctx.clearRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2);
                    ctx.restore();
                }
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    var rects = this.multiCellCollection[i];
                    if (this.multiCellCollection.length > 0) {
                        ctx.save();
                        ctx.clearRect(rects.x - 1, rects.y - 1, rects.width + 2, rects.height + 2);
                    }
                }
            }
            this.multiCellCollection = [];
        };
        HeatMap.prototype.highlightSelectedAreaInCanvas = function (rect) {
            if (rect.x) {
                var oldCanvas = document.getElementById(this.element.id + '_canvas');
                var newCanvas = document.getElementById(this.element.id + '_secondary_canvas');
                var initialRect = this.initialClipRect;
                var rectImage = oldCanvas.getContext('2d').getImageData(rect.x, rect.y, rect.width, rect.height);
                newCanvas.getContext('2d').putImageData(rectImage, rect.x, rect.y);
                oldCanvas.style.opacity = '0.3';
                var topPosition = oldCanvas.getContext('2d').getImageData(0, 0, this.availableSize.width, initialRect.y);
                newCanvas.getContext('2d').putImageData(topPosition, 0, 0);
                var bottomPosition = oldCanvas.getContext('2d').getImageData(0, initialRect.y + initialRect.height, this.availableSize.width, this.availableSize.height - (initialRect.y + initialRect.height));
                newCanvas.getContext('2d').putImageData(bottomPosition, 0, initialRect.y + initialRect.height);
                var rightPosition = oldCanvas.getContext('2d').getImageData(initialRect.x + initialRect.width, 0, this.availableSize.width - (initialRect.x + initialRect.width), this.availableSize.height);
                newCanvas.getContext('2d').putImageData(rightPosition, initialRect.x + initialRect.width, 0);
                var leftPosition = oldCanvas.getContext('2d').getImageData(0, 0, initialRect.x, this.availableSize.height);
                newCanvas.getContext('2d').putImageData(leftPosition, 0, 0);
            }
        };
        HeatMap.prototype.getSelectedCellData = function (cellX, cellY, cellCollection) {
            var xAxis = this.axisCollections[0];
            var yAxis = this.axisCollections[1];
            var xLabels = xAxis.tooltipLabels;
            var yLabels = yAxis.tooltipLabels.slice().reverse();
            var rectPosition = this.heatMapSeries.getCurrentRect(cellX + 1, cellY + 1);
            var currentRect = document.getElementById(rectPosition.id);
            var cellDetails = new helper_2.SelectedCellDetails(null, '', '', 0, 0, null, 0, 0, 0, 0, 0, 0);
            cellDetails.value = rectPosition.value;
            cellDetails.xLabel = xLabels[rectPosition.xIndex].toString();
            cellDetails.yLabel = yLabels[rectPosition.yIndex].toString();
            cellDetails.xValue = xAxis.labelValue[rectPosition.xIndex];
            cellDetails.yValue = yAxis.labelValue.slice().reverse()[rectPosition.yIndex];
            cellDetails.cellElement = this.enableCanvasRendering ? null : currentRect;
            cellDetails.xPosition = rectPosition.xIndex;
            cellDetails.yPosition = rectPosition.yIndex;
            cellDetails.width = this.currentRect.width;
            cellDetails.height = this.currentRect.height;
            cellDetails.x = this.currentRect.x;
            cellDetails.y = this.currentRect.y;
            this.currentRect.allowCollection = true;
            this.addSvgClass(currentRect);
            if (cellCollection) {
                this.selectedMultiCellCollection.push(cellDetails);
                this.currentRect.allowCollection = false;
            }
            else {
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    if (this.multiCellCollection[i].xPosition === cellDetails.xPosition &&
                        this.multiCellCollection[i].yPosition === cellDetails.yPosition) {
                        this.currentRect.allowCollection = false;
                        if (this.selectedCellCount === this.selectedMultiCellCollection.length) {
                            this.currentRect.allowCollection = false;
                            if (!this.enableCanvasRendering) {
                                for (var j = 0; j < this.selectedMultiCellCollection.length; j++) {
                                    var rectElement = this.selectedMultiCellCollection[j].cellElement;
                                    if (rectElement) {
                                        var index = rectElement.id.replace(this.element.id + '_HeatMapRect_', '');
                                        var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                                        var elementClassName = rectElement.getAttribute('class');
                                        rectElement.setAttribute('opacity', '0.3');
                                        var getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                                        if (getText) {
                                            getText.setAttribute('opacity', '0.3');
                                        }
                                        this.removeSvgClass(rectElement, elementClassName);
                                    }
                                }
                            }
                            else {
                                var ctx = this.secondaryCanvasRenderer.ctx;
                                var rect = this.canvasSelectedCells;
                                ctx.save();
                                ctx.clearRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2);
                                ctx.restore();
                                this.selectedCellsRect = new helper_1.Rect(0, 0, 0, 0);
                            }
                            this.multiCellCollection.splice(i, 1);
                        }
                    }
                }
            }
            if (rectPosition.visible && !ej2_base_1.isNullOrUndefined(rectPosition.value) && this.currentRect.allowCollection === true) {
                this.multiCellCollection.push(cellDetails);
            }
        };
        HeatMap.prototype.addSvgClass = function (element) {
            if (!this.enableCanvasRendering) {
                var className = this.element.id + '_selected';
                element.setAttribute('class', className);
            }
        };
        HeatMap.prototype.removeSvgClass = function (rectElement, className) {
            if (className) {
                rectElement.setAttribute('class', className.replace(className, ''));
            }
        };
        HeatMap.prototype.clearSelection = function () {
            if (!this.enableCanvasRendering && this.allowSelection) {
                this.clearSVGSelection();
            }
            if (this.enableCanvasRendering) {
                var ctx = this.secondaryCanvasRenderer.ctx;
                for (var i = 0; i < this.previousSelectedCellsRect.length; i++) {
                    ctx.save();
                    ctx.clearRect(this.previousSelectedCellsRect[i].x - 1, this.previousSelectedCellsRect[i].y - 1, this.previousSelectedCellsRect[i].width + 2, this.previousSelectedCellsRect[i].height + 2);
                    ctx.restore();
                }
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    var rects = this.multiCellCollection[i];
                    if (this.multiCellCollection.length > 0) {
                        ctx.save();
                        ctx.clearRect(rects.x - 1, rects.y - 1, rects.width + 2, rects.height + 2);
                    }
                }
                var canvas = document.getElementById(this.element.id + '_canvas');
                canvas.style.opacity = '1';
            }
            this.tempMultiCellCollection = [];
            this.multiCellCollection = [];
            this.rectSelected = false;
        };
        HeatMap.prototype.renderMousePointer = function (pageX, pageY) {
            var legendRange = this.legendModule.legendRange;
            var legendTextRange = this.legendModule.legendTextRange;
            var loop = true;
            for (var i = 0; i < legendRange.length; i++) {
                if (this.legendSettings.toggleVisibility && this.legendModule.currentPage === legendRange[i].currentPage) {
                    if ((loop && (pageX >= legendRange[i].x && pageX <= legendRange[i].width + legendRange[i].x) &&
                        (pageY >= legendRange[i].y && pageY <= legendRange[i].y + legendRange[i].height) ||
                        ((this.legendSettings.showLabel && this.legendSettings.labelDisplayType !== 'None' &&
                            pageX >= legendTextRange[i].x && pageX <= legendTextRange[i].width + legendTextRange[i].x) &&
                            (pageY >= legendTextRange[i].y && pageY <= legendTextRange[i].y + legendTextRange[i].height)))) {
                        if (this.enableCanvasRendering) {
                            document.getElementById(this.element.id + '_canvas').style.cursor = 'Pointer';
                        }
                        else {
                            document.getElementById(this.element.id + '_svg').style.cursor = 'Pointer';
                        }
                        loop = false;
                    }
                    else if (loop) {
                        if (this.enableCanvasRendering) {
                            document.getElementById(this.element.id + '_canvas').style.cursor = '';
                        }
                        else {
                            document.getElementById(this.element.id + '_svg').style.cursor = '';
                        }
                    }
                }
            }
        };
        HeatMap.prototype.heatMapMouseLeave = function (e) {
            var _this = this;
            if (e.target && e.target.id &&
                (this.cellSettings.enableCellHighlighting || (this.tooltipModule && this.showTooltip))
                && !this.enableCanvasRendering) {
                this.heatMapSeries.highlightSvgRect(this.tempTooltipRectId);
            }
            if (this.allowSelection && this.multiSelection) {
                this.multiSelection = false;
                if (e.type === 'mouseup' || e.type === 'touchend' || e.type === 'pointerup') {
                    if (e.which !== 2 && e.which !== 3) {
                        if (this.isCellTapHold === false) {
                            this.getDataCollection();
                            this.currentRect.allowCollection = false;
                            this.setCellOpacity();
                            var argData = {
                                heatmap: (this.isBlazor ? null : this),
                                cancel: false,
                                name: 'cellSelected',
                                data: this.multiCellCollection
                            };
                            this.trigger('cellSelected', argData);
                        }
                        else {
                            this.isCellTapHold = false;
                        }
                    }
                }
                else if (e.type === 'mouseleave' && (this.element.id + '_selectedCells')) {
                    helper_3.removeElement(this.element.id + '_selectedCells');
                }
            }
            if (this.tooltipModule && this.showTooltip && e.type === 'mouseleave') {
                this.tooltipModule.showHideTooltip(false);
            }
            this.tempTooltipRectId = '';
            if (this.legendModule && this.legendSettings.visible && this.legendModule.tooltipObject &&
                this.legendModule.tooltipObject.element) {
                var tooltipElement_1 = this.legendModule.tooltipObject.element.firstChild;
                if (e.type === 'mouseleave') {
                    tooltipElement_1.setAttribute('opacity', '0');
                }
                else {
                    if (this.legendTooltipTimer) {
                        window.clearTimeout(this.legendTooltipTimer);
                    }
                    this.legendTooltipTimer = setTimeout(function () {
                        tooltipElement_1.setAttribute('opacity', '0');
                    }, 1500);
                }
            }
            if (this.paletteSettings.type === 'Gradient' && this.legendModule && this.legendSettings.showGradientPointer &&
                this.legendSettings.visible && this.legendVisibilityByCellType) {
                if (e.type === 'mouseleave') {
                    this.legendModule.removeGradientPointer();
                }
                else {
                    if (this.gradientTimer) {
                        window.clearTimeout(this.gradientTimer);
                    }
                    this.gradientTimer = setTimeout(function () { _this.legendModule.removeGradientPointer(); }, 1500);
                }
            }
            if (this.enableCanvasRendering) {
                var main = document.getElementById(this.element.id + '_hoverRect_canvas');
                if (main) {
                    main.style.visibility = 'hidden';
                    this.tempRectHoverClass = '';
                }
            }
            if (this.titleSettings.text && this.titleCollection[0].indexOf('...') !== -1) {
                if (!this.enableCanvasRendering) {
                    helper_3.removeElement(this.element.id + '_Title_Tooltip');
                }
                else {
                    helper_3.removeElement(this.element.id + '_canvas_Tooltip');
                }
            }
            return true;
        };
        HeatMap.prototype.checkSelectedCells = function () {
            if (!this.enableCanvasRendering) {
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    for (var j = 0; j < this.selectedMultiCellCollection.length; j++) {
                        if (this.selectedMultiCellCollection[j].cellElement.getAttribute('id')
                            === this.multiCellCollection[i].cellElement.getAttribute('id')) {
                            this.selectedCellCount++;
                        }
                    }
                }
            }
            else {
                this.canvasSelectedCells = new helper_1.Rect(0, 0, 0, 0);
                this.canvasSelectedCells.x = this.selectedCellsRect.x;
                this.canvasSelectedCells.y = this.selectedCellsRect.y;
                this.canvasSelectedCells.width = this.selectedCellsRect.width;
                this.canvasSelectedCells.height = this.selectedCellsRect.height;
                for (var i = 0; i < this.multiCellCollection.length; i++) {
                    for (var j = 0; j < this.selectedMultiCellCollection.length; j++) {
                        if (this.selectedMultiCellCollection[j].xPosition === this.multiCellCollection[i].xPosition &&
                            this.selectedMultiCellCollection[j].yPosition === this.multiCellCollection[i].yPosition) {
                            this.selectedCellCount++;
                        }
                    }
                }
                if (this.rectSelected && this.paletteSettings.type === 'Gradient') {
                    this.legendModule.removeGradientPointer();
                }
            }
        };
        HeatMap.prototype.removeOpacity = function (containersRect, containerText) {
            for (var i = 0; i < containersRect.childNodes.length; i++) {
                containersRect.childNodes[i].setAttribute('opacity', '0.3');
                if (this.cellSettings.showLabel && containerText.childNodes[i]) {
                    containerText.childNodes[i].setAttribute('opacity', '0.3');
                }
            }
        };
        HeatMap.prototype.setCellOpacity = function () {
            if (!this.enableCanvasRendering) {
                if (this.multiCellCollection.length !== 0) {
                    this.tempMultiCellCollection.push(this.multiCellCollection);
                    var containersRect = document.getElementById(this.element.id + '_Container_RectGroup');
                    var containerText = document.getElementById(this.element.id + '_Container_TextGroup');
                    this.removeOpacity(containersRect, containerText);
                    for (var i = 0; i < this.multiCellCollection.length; i++) {
                        var collectionClasss = this.multiCellCollection[i].cellElement;
                        var index = parseInt(collectionClasss.id.replace(this.element.id + '_HeatMapRect_', ''), 10);
                        containersRect.childNodes[index].setAttribute('opacity', '1');
                        if (this.cellSettings.showLabel) {
                            var getText = document.getElementById(this.element.id + '_HeatMapRectLabels_' + index);
                            if (getText) {
                                getText.setAttribute('opacity', '1');
                            }
                        }
                    }
                }
            }
            else {
                this.previousSelectedCellsRect.push(this.selectedCellsRect);
                this.highlightSelectedAreaInCanvas(this.selectedCellsRect);
            }
            helper_3.removeElement(this.element.id + '_selectedCells');
        };
        HeatMap.prototype.createMultiCellDiv = function (onLoad) {
            if (onLoad) {
                var divElement = this.createElement('div', {
                    id: this.element.id + '_Multi_CellSelection_Canvas',
                    styles: 'position:relative'
                });
                this.element.appendChild(divElement);
                divElement.appendChild(this.svgObject);
                this.svgObject.style.position = 'absolute';
                this.svgObject.style.left = '0px';
                this.svgObject.style.top = '0px';
                this.svgObject.style.zIndex = '0';
            }
            else {
                var element = document.getElementById(this.element.id + '_Multi_CellSelection_Canvas');
                var secondaryCanvas = this.secondaryCanvasRenderer.createCanvas({
                    width: this.availableSize.width,
                    height: this.availableSize.height, x: 0, y: 0,
                    style: 'position: absolute; z-index: 1'
                });
                element.appendChild(secondaryCanvas);
            }
        };
        __decorate([
            ej2_base_1.Property(null)
        ], HeatMap.prototype, "width", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], HeatMap.prototype, "height", void 0);
        __decorate([
            ej2_base_1.Property(true)
        ], HeatMap.prototype, "showTooltip", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "tooltipRender", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "resized", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "loaded", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "cellRender", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "cellSelected", void 0);
        __decorate([
            ej2_base_1.Property('SVG')
        ], HeatMap.prototype, "renderingMode", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], HeatMap.prototype, "dataSource", void 0);
        __decorate([
            ej2_base_1.Complex({}, adaptor_1.Data)
        ], HeatMap.prototype, "dataSourceSettings", void 0);
        __decorate([
            ej2_base_1.Property('Material')
        ], HeatMap.prototype, "theme", void 0);
        __decorate([
            ej2_base_1.Property(false)
        ], HeatMap.prototype, "allowSelection", void 0);
        __decorate([
            ej2_base_1.Complex({}, base_1.Margin)
        ], HeatMap.prototype, "margin", void 0);
        __decorate([
            ej2_base_1.Complex({ text: '', textStyle: theme_1.Theme.heatMapTitleFont }, base_1.Title)
        ], HeatMap.prototype, "titleSettings", void 0);
        __decorate([
            ej2_base_1.Complex({}, axis_1.Axis)
        ], HeatMap.prototype, "xAxis", void 0);
        __decorate([
            ej2_base_1.Complex({}, legend_1.LegendSettings)
        ], HeatMap.prototype, "legendSettings", void 0);
        __decorate([
            ej2_base_1.Complex({}, colorMapping_1.PaletteSettings)
        ], HeatMap.prototype, "paletteSettings", void 0);
        __decorate([
            ej2_base_1.Complex({}, tooltip_1.TooltipSettings)
        ], HeatMap.prototype, "tooltipSettings", void 0);
        __decorate([
            ej2_base_1.Complex({}, axis_1.Axis)
        ], HeatMap.prototype, "yAxis", void 0);
        __decorate([
            ej2_base_1.Complex({}, series_1.CellSettings)
        ], HeatMap.prototype, "cellSettings", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "created", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "load", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "cellClick", void 0);
        __decorate([
            ej2_base_2.Event()
        ], HeatMap.prototype, "legendRender", void 0);
        HeatMap = __decorate([
            ej2_base_1.NotifyPropertyChanges
        ], HeatMap);
        return HeatMap;
    }(ej2_base_1.Component));
    exports.HeatMap = HeatMap;
});
