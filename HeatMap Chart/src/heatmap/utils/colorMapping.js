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
define(["require", "exports", "@syncfusion/ej2-base", "../model/base", "./helper"], function (require, exports, ej2_base_1, base_1, helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PaletteSettings = (function (_super) {
        __extends(PaletteSettings, _super);
        function PaletteSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Collection([{}], base_1.PaletteCollection)
        ], PaletteSettings.prototype, "palette", void 0);
        __decorate([
            ej2_base_1.Property('Gradient')
        ], PaletteSettings.prototype, "type", void 0);
        __decorate([
            ej2_base_1.Property('')
        ], PaletteSettings.prototype, "emptyPointColor", void 0);
        __decorate([
            ej2_base_1.Property('Table')
        ], PaletteSettings.prototype, "colorGradientMode", void 0);
        __decorate([
            ej2_base_1.Complex({}, base_1.FillColor)
        ], PaletteSettings.prototype, "fillColor", void 0);
        return PaletteSettings;
    }(ej2_base_1.ChildProperty));
    exports.PaletteSettings = PaletteSettings;
    var RgbColor = (function () {
        function RgbColor(r, g, b) {
            this.R = r;
            this.G = g;
            this.B = b;
        }
        return RgbColor;
    }());
    exports.RgbColor = RgbColor;
    var CellColor = (function () {
        function CellColor(heatMap) {
            this.heatMap = heatMap;
        }
        CellColor.prototype.convertToRGB = function (value, colorMapping) {
            var previousOffset = this.heatMap.isColorRange ? colorMapping[0].startValue : colorMapping[0].value;
            var nextOffset = 0;
            var i = 0;
            var previousColor;
            var nextColor;
            if (this.heatMap.isColorRange && this.heatMap.paletteSettings.type === 'Gradient') {
                for (i = 0; i < colorMapping.length; i++) {
                    var offset = Number(colorMapping[i].endValue);
                    if (value <= offset && value >= Number(colorMapping[i].startValue)) {
                        nextOffset = offset;
                        previousColor = this.heatMap.colorCollection[i].minColor;
                        nextColor = this.heatMap.colorCollection[i].maxColor;
                        break;
                    }
                    else if (colorMapping[0].startValue !== this.heatMap.dataSourceMinValue && value < colorMapping[0].startValue) {
                        nextOffset = colorMapping[0].startValue;
                        previousOffset = this.heatMap.dataSourceMinValue;
                        previousColor = this.heatMap.paletteSettings.fillColor.minColor;
                        nextColor = this.heatMap.paletteSettings.fillColor.maxColor;
                        break;
                    }
                    else if (value > offset && value <= (i === (colorMapping.length - 1) ? this.heatMap.dataSourceMaxValue :
                        colorMapping[i + 1].startValue)) {
                        nextOffset = (i === (colorMapping.length - 1)) ? this.heatMap.dataSourceMaxValue : colorMapping[i + 1].startValue;
                        previousOffset = offset;
                        previousColor = this.heatMap.paletteSettings.fillColor.minColor;
                        nextColor = this.heatMap.paletteSettings.fillColor.maxColor;
                        break;
                    }
                    else {
                        nextOffset = offset;
                        previousOffset = offset;
                    }
                }
            }
            else {
                for (i = 1; i < colorMapping.length; i++) {
                    var offset = Number(colorMapping[i].value);
                    if (value <= offset) {
                        nextOffset = offset;
                        previousColor = this.getEqualColor(colorMapping, previousOffset);
                        nextColor = this.getEqualColor(colorMapping, nextOffset);
                        break;
                    }
                    else {
                        nextOffset = offset;
                        previousOffset = offset;
                    }
                }
            }
            var percent = 0;
            var full = (nextOffset) - previousOffset;
            percent = (value - previousOffset) / full;
            percent = isNaN(percent) ? 0 : percent;
            return this.getPercentageColor(percent, previousColor, nextColor);
        };
        CellColor.prototype.rgbToHex = function (r, g, b) {
            return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        };
        CellColor.prototype.componentToHex = function (c) {
            var hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        CellColor.prototype.getEqualColor = function (list, offset) {
            for (var i = 0; i < list.length; i++) {
                if (Number(list[i].value) === offset) {
                    var color = list[i].color;
                    if (color.indexOf('rgb') !== -1) {
                        color = this.convertToHex(color);
                    }
                    else if (color.indexOf('#') === -1) {
                        color = '#FFFFFF';
                    }
                    return color;
                }
            }
            return '#00000';
        };
        CellColor.prototype.convertToHex = function (color) {
            var itemColor = color.substr(3);
            itemColor = itemColor.split('(')[1].split(')')[0];
            var colorSplit = itemColor.split(',');
            itemColor = this.rgbToHex(parseInt(colorSplit[0], 10), parseInt(colorSplit[1], 10), parseInt(colorSplit[2], 10));
            return itemColor;
        };
        CellColor.prototype.getPercentageColor = function (percent, previous, next) {
            var nextColor = next.split('#')[1];
            var prevColor = previous.split('#')[1];
            var r = this.getPercentage(percent, parseInt(prevColor.substr(0, 2), 16), parseInt(nextColor.substr(0, 2), 16));
            var g = this.getPercentage(percent, parseInt(prevColor.substr(2, 2), 16), parseInt(nextColor.substr(2, 2), 16));
            var b = this.getPercentage(percent, parseInt(prevColor.substr(4, 2), 16), parseInt(nextColor.substr(4, 2), 16));
            return new RgbColor(r, g, b);
        };
        CellColor.prototype.getPercentage = function (percent, previous, next) {
            var full = next - previous;
            return Math.round((previous + (full * percent)));
        };
        CellColor.prototype.getColorCollection = function () {
            var heatMap = this.heatMap;
            heatMap.colorCollection = [];
            heatMap.legendColorCollection = [];
            var range;
            for (var j = 0; j < this.heatMap.paletteSettings.palette.length; j++) {
                if (this.heatMap.paletteSettings.palette[j].startValue === null || this.heatMap.paletteSettings.palette[j].endValue === null) {
                    this.heatMap.isColorRange = false;
                    break;
                }
                else {
                    this.heatMap.isColorRange = true;
                }
            }
            var minValue = heatMap.bubbleSizeWithColor ? heatMap.minColorValue : heatMap.dataSourceMinValue;
            var maxValue = heatMap.bubbleSizeWithColor ? heatMap.maxColorValue : heatMap.dataSourceMaxValue;
            heatMap.emptyPointColor = heatMap.paletteSettings.emptyPointColor ? heatMap.paletteSettings.emptyPointColor :
                heatMap.themeStyle.emptyCellColor;
            var tempcolorMapping = this.orderbyOffset(this.heatMap.isColorRange ? heatMap.paletteSettings.palette :
                heatMap.paletteSettings.palette && heatMap.paletteSettings.palette.length > 1 ?
                    heatMap.paletteSettings.palette : heatMap.themeStyle.palette);
            if (!tempcolorMapping.isCompact) {
                if (heatMap.paletteSettings.type === 'Gradient') {
                    range = (maxValue - minValue) / (tempcolorMapping.offsets.length - 1);
                }
                else {
                    range = (maxValue - minValue) / (tempcolorMapping.offsets.length);
                }
                if (tempcolorMapping.offsets.length >= 2) {
                    for (var index = 0; index < tempcolorMapping.offsets.length; index++) {
                        heatMap.colorCollection.push(new base_1.ColorCollection((Math.round(((minValue) + (index * range)) * 100) / 100), tempcolorMapping.offsets[index].color, tempcolorMapping.offsets[index].label, tempcolorMapping.offsets[index].startValue, tempcolorMapping.offsets[index].endValue, tempcolorMapping.offsets[index].minColor, tempcolorMapping.offsets[index].maxColor));
                        heatMap.legendColorCollection.push(new base_1.LegendColorCollection(Math.round(((minValue) + (index * range)) * 100) / 100, tempcolorMapping.offsets[index].color, tempcolorMapping.offsets[index].label, tempcolorMapping.offsets[index].startValue, tempcolorMapping.offsets[index].endValue, tempcolorMapping.offsets[index].minColor, tempcolorMapping.offsets[index].maxColor, false));
                    }
                }
            }
            else {
                heatMap.colorCollection = tempcolorMapping.offsets;
                heatMap.legendColorCollection = ej2_base_1.extend([], tempcolorMapping.offsets, null, true);
            }
            if (!this.heatMap.isColorRange) {
                this.updateLegendColorCollection(minValue, maxValue, tempcolorMapping);
            }
        };
        CellColor.prototype.updateLegendColorCollection = function (minValue, maxValue, tempcolorMapping) {
            if (this.heatMap.paletteSettings.type === 'Fixed' && (tempcolorMapping.isCompact || tempcolorMapping.isLabel)) {
                return;
            }
            if (Math.round(minValue * 100) / 100 < this.heatMap.legendColorCollection[0].value) {
                this.heatMap.legendColorCollection.unshift(new base_1.LegendColorCollection(Math.round(minValue * 100) / 100, this.heatMap.legendColorCollection[0].color, this.heatMap.legendColorCollection[0].label, this.heatMap.legendColorCollection[0].startValue, this.heatMap.legendColorCollection[0].endValue, this.heatMap.legendColorCollection[0].minColor, this.heatMap.legendColorCollection[0].maxColor, true));
            }
            if (Math.round(maxValue * 100) / 100 > this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].value) {
                this.heatMap.legendColorCollection.push(new base_1.LegendColorCollection(Math.round(maxValue * 100) / 100, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].color, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].label, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].startValue, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].endValue, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].minColor, this.heatMap.legendColorCollection[this.heatMap.legendColorCollection.length - 1].maxColor, true));
            }
        };
        CellColor.prototype.orderbyOffset = function (offsets) {
            var returnCollection = new helper_1.PaletterColor();
            var key = this.heatMap.isColorRange ? 'to' : 'value';
            var label = 'label';
            returnCollection.isCompact = true;
            returnCollection.isLabel = true;
            returnCollection.offsets = offsets.sort(function (a, b) {
                if (ej2_base_1.isNullOrUndefined(a[label]) && ej2_base_1.isNullOrUndefined(b[label])) {
                    returnCollection.isLabel = false;
                }
                if (!ej2_base_1.isNullOrUndefined(a[key]) && !ej2_base_1.isNullOrUndefined(b[key])) {
                    return a[key] - b[key];
                }
                else {
                    returnCollection.isCompact = false;
                    return a;
                }
            });
            if (!returnCollection.isCompact) {
                returnCollection.offsets = this.heatMap.paletteSettings.palette && this.heatMap.paletteSettings.palette.length > 1 ?
                    this.heatMap.paletteSettings.palette : this.heatMap.themeStyle.palette;
            }
            return returnCollection;
        };
        CellColor.prototype.getColorByValue = function (text) {
            var color = '';
            var rbg;
            var compareValue = 0;
            if (text.toString() !== '') {
                if (this.heatMap.cellSettings.tileType === 'Bubble' &&
                    (this.heatMap.cellSettings.bubbleType === 'Size' || this.heatMap.cellSettings.bubbleType === 'Sector')) {
                    color = this.heatMap.isColorRange ? this.heatMap.colorCollection[0].minColor : this.heatMap.colorCollection[0].color;
                }
                else if (this.heatMap.paletteSettings.type === 'Fixed') {
                    for (var y = 0; y < this.heatMap.colorCollection.length; y++) {
                        compareValue = this.heatMap.isColorRange ? this.heatMap.paletteSettings.palette[y].startValue :
                            this.heatMap.colorCollection[y + 1] ? this.heatMap.colorCollection[y + 1].value :
                                this.heatMap.colorCollection[y].value;
                        var singleValue = this.heatMap.dataSourceMinValue === this.heatMap.dataSourceMaxValue;
                        if (this.heatMap.isColorRange) {
                            var legendRange = void 0;
                            if ((text <= this.heatMap.colorCollection[y].endValue && text >= this.heatMap.colorCollection[y].startValue)) {
                                if (this.heatMap.legendVisibilityByCellType) {
                                    legendRange = this.heatMap.legendModule.legendRange;
                                }
                                color = (this.heatMap.legendVisibilityByCellType && legendRange[y] && !legendRange[y].visible) ?
                                    this.heatMap.themeStyle.toggledColor : this.heatMap.colorCollection[y].minColor;
                                break;
                            }
                            else {
                                color = this.heatMap.paletteSettings.fillColor.minColor;
                            }
                        }
                        else {
                            if ((text <= compareValue && singleValue && y === 0) || text < compareValue ||
                                (text >= compareValue && y === this.heatMap.colorCollection.length - 1)) {
                                var legendRange = void 0;
                                if (this.heatMap.legendVisibilityByCellType) {
                                    legendRange = this.heatMap.legendModule.legendRange;
                                }
                                color = (this.heatMap.legendVisibilityByCellType && legendRange[y] && !legendRange[y].visible) ?
                                    this.heatMap.themeStyle.toggledColor : this.heatMap.colorCollection[y].color;
                                break;
                            }
                        }
                    }
                }
                else {
                    if (this.heatMap.paletteSettings.colorGradientMode !== 'Table') {
                        this.getColorCollection();
                    }
                    if (text < this.heatMap.colorCollection[0].value && !this.heatMap.isColorRange) {
                        color = this.heatMap.colorCollection[0].color;
                    }
                    else if (text > this.heatMap.colorCollection[this.heatMap.colorCollection.length - 1].value &&
                        !this.heatMap.isColorRange) {
                        color = this.heatMap.colorCollection[this.heatMap.colorCollection.length - 1].color;
                    }
                    else {
                        rbg = this.convertToRGB(text, this.heatMap.colorCollection);
                        color = this.rgbToHex(rbg.R, rbg.G, rbg.B);
                    }
                }
            }
            else {
                color = this.heatMap.emptyPointColor;
            }
            return color;
        };
        return CellColor;
    }());
    exports.CellColor = CellColor;
});
