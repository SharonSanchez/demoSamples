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
define(["require", "exports", "@syncfusion/ej2-base", "./theme"], function (require, exports, ej2_base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Font = (function (_super) {
        __extends(Font, _super);
        function Font() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('16px')
        ], Font.prototype, "size", void 0);
        __decorate([
            ej2_base_1.Property('')
        ], Font.prototype, "color", void 0);
        __decorate([
            ej2_base_1.Property('Segoe UI')
        ], Font.prototype, "fontFamily", void 0);
        __decorate([
            ej2_base_1.Property('Normal')
        ], Font.prototype, "fontWeight", void 0);
        __decorate([
            ej2_base_1.Property('Normal')
        ], Font.prototype, "fontStyle", void 0);
        __decorate([
            ej2_base_1.Property('Center')
        ], Font.prototype, "textAlignment", void 0);
        __decorate([
            ej2_base_1.Property('Trim')
        ], Font.prototype, "textOverflow", void 0);
        return Font;
    }(ej2_base_1.ChildProperty));
    exports.Font = Font;
    var Margin = (function (_super) {
        __extends(Margin, _super);
        function Margin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property(10)
        ], Margin.prototype, "left", void 0);
        __decorate([
            ej2_base_1.Property(10)
        ], Margin.prototype, "right", void 0);
        __decorate([
            ej2_base_1.Property(10)
        ], Margin.prototype, "top", void 0);
        __decorate([
            ej2_base_1.Property(10)
        ], Margin.prototype, "bottom", void 0);
        return Margin;
    }(ej2_base_1.ChildProperty));
    exports.Margin = Margin;
    var Border = (function (_super) {
        __extends(Border, _super);
        function Border() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('')
        ], Border.prototype, "color", void 0);
        __decorate([
            ej2_base_1.Property(1)
        ], Border.prototype, "width", void 0);
        __decorate([
            ej2_base_1.Property('')
        ], Border.prototype, "radius", void 0);
        return Border;
    }(ej2_base_1.ChildProperty));
    exports.Border = Border;
    var TooltipBorder = (function (_super) {
        __extends(TooltipBorder, _super);
        function TooltipBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('')
        ], TooltipBorder.prototype, "color", void 0);
        __decorate([
            ej2_base_1.Property(0)
        ], TooltipBorder.prototype, "width", void 0);
        return TooltipBorder;
    }(ej2_base_1.ChildProperty));
    exports.TooltipBorder = TooltipBorder;
    var BubbleData = (function (_super) {
        __extends(BubbleData, _super);
        function BubbleData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property(null)
        ], BubbleData.prototype, "size", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], BubbleData.prototype, "color", void 0);
        return BubbleData;
    }(ej2_base_1.ChildProperty));
    exports.BubbleData = BubbleData;
    var Title = (function (_super) {
        __extends(Title, _super);
        function Title() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('')
        ], Title.prototype, "text", void 0);
        __decorate([
            ej2_base_1.Complex({}, Font)
        ], Title.prototype, "textStyle", void 0);
        return Title;
    }(ej2_base_1.ChildProperty));
    exports.Title = Title;
    var FillColor = (function (_super) {
        __extends(FillColor, _super);
        function FillColor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('#eeeeee')
        ], FillColor.prototype, "minColor", void 0);
        __decorate([
            ej2_base_1.Property('#eeeeee')
        ], FillColor.prototype, "maxColor", void 0);
        return FillColor;
    }(ej2_base_1.ChildProperty));
    exports.FillColor = FillColor;
    var PaletteCollection = (function (_super) {
        __extends(PaletteCollection, _super);
        function PaletteCollection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property(null)
        ], PaletteCollection.prototype, "value", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], PaletteCollection.prototype, "color", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], PaletteCollection.prototype, "label", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], PaletteCollection.prototype, "startValue", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], PaletteCollection.prototype, "endValue", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], PaletteCollection.prototype, "minColor", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], PaletteCollection.prototype, "maxColor", void 0);
        return PaletteCollection;
    }(ej2_base_1.ChildProperty));
    exports.PaletteCollection = PaletteCollection;
    var AxisLabelBorder = (function (_super) {
        __extends(AxisLabelBorder, _super);
        function AxisLabelBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('#b5b5b5')
        ], AxisLabelBorder.prototype, "color", void 0);
        __decorate([
            ej2_base_1.Property(1)
        ], AxisLabelBorder.prototype, "width", void 0);
        __decorate([
            ej2_base_1.Property('Rectangle')
        ], AxisLabelBorder.prototype, "type", void 0);
        return AxisLabelBorder;
    }(ej2_base_1.ChildProperty));
    exports.AxisLabelBorder = AxisLabelBorder;
    var BubbleSize = (function (_super) {
        __extends(BubbleSize, _super);
        function BubbleSize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('0%')
        ], BubbleSize.prototype, "minimum", void 0);
        __decorate([
            ej2_base_1.Property('100%')
        ], BubbleSize.prototype, "maximum", void 0);
        return BubbleSize;
    }(ej2_base_1.ChildProperty));
    exports.BubbleSize = BubbleSize;
    var MultiLevelCategories = (function (_super) {
        __extends(MultiLevelCategories, _super);
        function MultiLevelCategories() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property(null)
        ], MultiLevelCategories.prototype, "start", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], MultiLevelCategories.prototype, "end", void 0);
        __decorate([
            ej2_base_1.Property('')
        ], MultiLevelCategories.prototype, "text", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], MultiLevelCategories.prototype, "maximumTextWidth", void 0);
        return MultiLevelCategories;
    }(ej2_base_1.ChildProperty));
    exports.MultiLevelCategories = MultiLevelCategories;
    var MultiLevelLabels = (function (_super) {
        __extends(MultiLevelLabels, _super);
        function MultiLevelLabels() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property('Center')
        ], MultiLevelLabels.prototype, "alignment", void 0);
        __decorate([
            ej2_base_1.Property('Wrap')
        ], MultiLevelLabels.prototype, "overflow", void 0);
        __decorate([
            ej2_base_1.Complex(theme_1.Theme.axisLabelFont, Font)
        ], MultiLevelLabels.prototype, "textStyle", void 0);
        __decorate([
            ej2_base_1.Complex({ color: '#b5b5b5', width: 1, type: 'Rectangle' }, AxisLabelBorder)
        ], MultiLevelLabels.prototype, "border", void 0);
        __decorate([
            ej2_base_1.Collection([], MultiLevelCategories)
        ], MultiLevelLabels.prototype, "categories", void 0);
        return MultiLevelLabels;
    }(ej2_base_1.ChildProperty));
    exports.MultiLevelLabels = MultiLevelLabels;
    var ColorCollection = (function () {
        function ColorCollection(value, color, label, startValue, endValue, minColor, maxColor) {
            this.value = value;
            this.color = color;
            this.label = label;
            this.startValue = startValue;
            this.endValue = endValue;
            this.minColor = minColor;
            this.maxColor = maxColor;
        }
        return ColorCollection;
    }());
    exports.ColorCollection = ColorCollection;
    var BubbleTooltipData = (function () {
        function BubbleTooltipData(mappingName, bubbleData, valueType) {
            this.mappingName = mappingName;
            this.bubbleData = bubbleData;
            this.valueType = valueType;
        }
        return BubbleTooltipData;
    }());
    exports.BubbleTooltipData = BubbleTooltipData;
    var LegendColorCollection = (function () {
        function LegendColorCollection(value, color, label, startValue, endValue, minColor, maxColor, isHidden) {
            this.value = value;
            this.color = color;
            this.label = label;
            this.startValue = startValue;
            this.endValue = endValue;
            this.minColor = minColor;
            this.maxColor = maxColor;
            this.isHidden = isHidden;
        }
        return LegendColorCollection;
    }());
    exports.LegendColorCollection = LegendColorCollection;
    var MultipleRow = (function () {
        function MultipleRow(start, end, index, label, row) {
            this.index = 1;
            this.row = 1;
            this.start = start;
            this.end = end;
            this.index = index;
            this.label = label;
            this.row = row;
        }
        return MultipleRow;
    }());
    exports.MultipleRow = MultipleRow;
});
