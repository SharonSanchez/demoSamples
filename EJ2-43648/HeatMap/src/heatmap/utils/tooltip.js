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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "../model/base", "../model/theme"], function (require, exports, ej2_base_1, ej2_svg_base_1, base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TooltipSettings = (function (_super) {
        __extends(TooltipSettings, _super);
        function TooltipSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('')
        ], TooltipSettings.prototype, "template", void 0);
        __decorate([
            ej2_base_1.Property('')
        ], TooltipSettings.prototype, "fill", void 0);
        __decorate([
            ej2_base_1.Complex({}, base_1.TooltipBorder)
        ], TooltipSettings.prototype, "border", void 0);
        __decorate([
            ej2_base_1.Complex(theme_1.Theme.tooltipFont, base_1.Font)
        ], TooltipSettings.prototype, "textStyle", void 0);
        return TooltipSettings;
    }(ej2_base_1.ChildProperty));
    exports.TooltipSettings = TooltipSettings;
    var Tooltip = (function () {
        function Tooltip(heatMap) {
            this.isFirst = true;
            this.isFadeout = false;
            this.heatMap = heatMap;
        }
        Tooltip.prototype.getModuleName = function () {
            return 'Tooltip';
        };
        Tooltip.prototype.showHideTooltip = function (isShow, isFadeout) {
            var ele = document.getElementById(this.heatMap.element.id + 'Celltooltipcontainer');
            if (!isShow) {
                if (ele && ele.style.visibility !== 'hidden') {
                    if (this.tooltipObject && isFadeout && this.heatMap.isRectBoundary) {
                        this.tooltipObject.fadeOut();
                    }
                    else {
                        if (this.tooltipObject && this.tooltipObject.element) {
                            var tooltipElement = this.tooltipObject.element.firstChild;
                            tooltipElement.setAttribute('opacity', '0');
                        }
                    }
                    ele.style.visibility = 'hidden';
                }
                this.isFadeout = true;
            }
            else {
                ele.style.visibility = 'visible';
            }
        };
        Tooltip.prototype.destroy = function (heatMap) {
        };
        ;
        Tooltip.prototype.createTooltip = function (currentRect, x, y, tempTooltipText) {
            var offset = null;
            var element = ej2_base_1.select('#' + this.heatMap.element.id + 'Celltooltipcontainer');
            if (this.heatMap.cellSettings.showLabel && this.heatMap.heatMapSeries.checkLabelXDisplay &&
                this.heatMap.heatMapSeries.checkLabelYDisplay) {
                offset = parseInt(this.heatMap.cellSettings.textStyle.size, 10) / 2;
            }
            this.tooltipObject = new ej2_svg_base_1.Tooltip({
                enableAnimation: false,
                offset: offset,
                location: { x: x, y: y },
                availableSize: this.heatMap.availableSize,
                data: {
                    xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                    yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                    value: currentRect.value,
                    xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                        this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                    yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                        this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null,
                },
                theme: this.heatMap.theme,
                content: tempTooltipText,
                fill: this.heatMap.tooltipSettings.fill,
                template: this.heatMap.tooltipSettings.template === '' ? null : this.heatMap.tooltipSettings.template,
                border: {
                    width: this.heatMap.tooltipSettings.border.width,
                    color: this.heatMap.tooltipSettings.border.color
                },
                textStyle: {
                    size: this.heatMap.tooltipSettings.textStyle.size,
                    fontWeight: this.heatMap.tooltipSettings.textStyle.fontWeight.toLowerCase(),
                    color: this.heatMap.tooltipSettings.textStyle.color,
                    fontStyle: this.heatMap.tooltipSettings.textStyle.fontStyle.toLowerCase(),
                    fontFamily: this.heatMap.tooltipSettings.textStyle.fontFamily
                },
                areaBounds: {
                    height: this.heatMap.initialClipRect.height + this.heatMap.initialClipRect.y,
                    width: this.heatMap.initialClipRect.width, x: this.heatMap.initialClipRect.x
                },
            }, element);
        };
        Tooltip.prototype.createTooltipDiv = function (heatMap) {
            var position = 'absolute';
            var top = heatMap.enableCanvasRendering && heatMap.allowSelection ? heatMap.availableSize.height : 0;
            var element2 = ej2_base_1.createElement('div', {
                id: this.heatMap.element.id + 'Celltooltipcontainer',
                styles: 'position:' + position + '; z-index: 3;top:-' + top + 'px'
            });
            this.heatMap.element.appendChild(ej2_base_1.createElement('div', {
                id: this.heatMap.element.id + 'Celltooltipparent',
                styles: 'position:relative'
            })
                .appendChild(element2));
        };
        Tooltip.prototype.getTooltipContent = function (currentRect, hetmapSeries) {
            var value;
            var content;
            var heatMap = this.heatMap;
            var adaptData = this.heatMap.dataSourceSettings;
            if (heatMap.bubbleSizeWithColor) {
                var xAxis = heatMap.xAxis.title && heatMap.xAxis.title.text !== '' ? heatMap.xAxis.title.text : 'X-Axis';
                var yAxis = heatMap.yAxis.title && heatMap.yAxis.title.text !== '' ? heatMap.yAxis.title.text : 'Y-Axis';
                var value1 = adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                    adaptData.bubbleDataMapping.size : 'Value 1';
                var value2 = adaptData.isJsonData && adaptData.adaptorType === 'Cell' ?
                    adaptData.bubbleDataMapping.color : 'Value 2';
                value = hetmapSeries.getFormatedText(currentRect.value[0].bubbleData, this.heatMap.cellSettings.format);
                content = [xAxis + ' : ' + hetmapSeries.hoverXAxisLabel + '<br/>'
                        + yAxis + ' : ' + hetmapSeries.hoverYAxisLabel + '<br/>'
                        + value1 + ' : ' + value + '<br/>'
                        + value2 + ' : '
                        + hetmapSeries.getFormatedText(currentRect.value[1].bubbleData, this.heatMap.cellSettings.format)];
            }
            else {
                value = currentRect.value;
                content = [hetmapSeries.hoverXAxisLabel + ' | ' + hetmapSeries.hoverYAxisLabel + ' : ' +
                        hetmapSeries.getFormatedText(value, this.heatMap.cellSettings.format)];
            }
            return content;
        };
        Tooltip.prototype.renderTooltip = function (currentRect) {
            var _this = this;
            var hetmapSeries = this.heatMap.heatMapSeries;
            var tempTooltipText = [''];
            var showTooltip = this.heatMap.bubbleSizeWithColor ?
                !ej2_base_1.isNullOrUndefined(currentRect.value) && !ej2_base_1.isNullOrUndefined(currentRect.value[0].bubbleData)
                    && currentRect.value[0].bubbleData.toString() !== '' ? true : false
                : ej2_base_1.isNullOrUndefined(currentRect.value) || (!ej2_base_1.isNullOrUndefined(currentRect.value) &&
                    currentRect.value.toString() === '') ? false : true;
            if (!showTooltip) {
                this.showHideTooltip(false, false);
                if (!currentRect.visible) {
                    this.showHideTooltip(false, false);
                }
            }
            else {
                if (!ej2_base_1.isNullOrUndefined(this.heatMap.tooltipRender)) {
                    var content = this.getTooltipContent(currentRect, hetmapSeries);
                    var argData = {
                        heatmap: (this.heatMap.isBlazor ? null : this.heatMap),
                        cancel: false,
                        name: 'tooltipRender',
                        value: currentRect.value,
                        xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                        yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                        xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                            this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                        yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                            this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null,
                        content: content
                    };
                    this.heatMap.trigger('tooltipRender', argData, function (observedArgs) {
                        if (!observedArgs.cancel) {
                            tempTooltipText = observedArgs.content;
                            _this.tooltipCallback(currentRect, tempTooltipText);
                        }
                        else {
                            if (_this.tooltipObject) {
                                _this.showHideTooltip(false);
                            }
                        }
                    });
                }
                else {
                    tempTooltipText = this.getTooltipContent(currentRect, hetmapSeries);
                    this.tooltipCallback(currentRect, tempTooltipText);
                }
            }
        };
        Tooltip.prototype.tooltipCallback = function (currentRect, tempTooltipText) {
            if (!this.tooltipObject) {
                this.createTooltip(currentRect, currentRect.x + (currentRect.width / 2), currentRect.y + (currentRect.height / 2), tempTooltipText);
            }
            else {
                this.tooltipObject.content = tempTooltipText;
                this.tooltipObject.data = {
                    xValue: this.heatMap.heatMapSeries.hoverXAxisValue,
                    yValue: this.heatMap.heatMapSeries.hoverYAxisValue,
                    xLabel: this.heatMap.heatMapSeries.hoverXAxisLabel ?
                        this.heatMap.heatMapSeries.hoverXAxisLabel.toString() : null,
                    yLabel: this.heatMap.heatMapSeries.hoverYAxisLabel ?
                        this.heatMap.heatMapSeries.hoverYAxisLabel.toString() : null,
                    value: currentRect.value,
                };
            }
            this.showHideTooltip(true);
            this.tooltipObject.enableAnimation = (this.isFirst || this.isFadeout) ? false : true;
            this.isFirst = (this.isFirst) ? false : this.isFirst;
            this.isFadeout = (this.isFadeout) ? false : this.isFadeout;
            this.tooltipObject.location.x = currentRect.x + (currentRect.width / 2);
            this.tooltipObject.location.y = currentRect.y + (currentRect.height / 2);
            if (!currentRect.visible) {
                this.showHideTooltip(false, false);
            }
        };
        return Tooltip;
    }());
    exports.Tooltip = Tooltip;
});
