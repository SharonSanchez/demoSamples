define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Theme;
    (function (Theme) {
        Theme.heatMapTitleFont = {
            size: '15px',
            fontWeight: '500',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.titleFont = {
            size: '13px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI',
            textOverflow: 'None',
        };
        Theme.axisTitleFont = {
            size: '12px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.axisLabelFont = {
            size: '12px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.legendLabelFont = {
            size: '12px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI',
            textOverflow: 'None',
        };
        Theme.rectLabelFont = {
            size: '12px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI',
            textOverflow: 'None',
        };
        Theme.tooltipFont = {
            size: '13px',
            fontWeight: 'Normal',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI',
            textOverflow: 'None',
        };
    })(Theme = exports.Theme || (exports.Theme = {}));
    function getThemeColor(theme) {
        var style;
        switch (theme.toLowerCase()) {
            case 'highcontrastlight':
            case 'highcontrast':
                style = {
                    heatMapTitle: '#ffffff',
                    axisTitle: '#ffffff',
                    axisLabel: '#ffffff',
                    cellBorder: '#EEEEEE',
                    background: '#000000',
                    cellTextColor: '#000000',
                    toggledColor: '#000000',
                    emptyCellColor: '#EEEEEE',
                    legendLabel: '#ffffff',
                    palette: [{ 'color': '#BEE7EE' },
                        { 'color': '#85c4cf' },
                        { 'color': '#4CA1AF' }]
                };
                break;
            case 'materialdark':
            case 'fabricdark':
            case 'bootstrapdark':
                style = {
                    heatMapTitle: '#ffffff',
                    axisTitle: '#ffffff',
                    axisLabel: '#DADADA',
                    cellBorder: '#EEEEEE',
                    background: '#000000',
                    cellTextColor: '#000000',
                    toggledColor: '#000000',
                    emptyCellColor: '#EEEEEE',
                    legendLabel: '#ffffff',
                    palette: [{ 'color': '#BEE7EE' },
                        { 'color': '#85c4cf' },
                        { 'color': '#4CA1AF' }]
                };
                break;
            case 'bootstrap4':
                style = {
                    heatMapTitle: '#212529',
                    axisTitle: '#212529',
                    axisLabel: '#212529',
                    cellBorder: '#E9ECEF',
                    background: '#FFFFFF',
                    cellTextColor: '#212529',
                    toggledColor: '#ffffff',
                    emptyCellColor: '#E9ECEF',
                    legendLabel: '#212529',
                    palette: [{ 'color': '#BEE7EE' },
                        { 'color': '#85c4cf' },
                        { 'color': '#4CA1AF' }]
                };
                break;
            default:
                style = {
                    heatMapTitle: '#424242',
                    axisTitle: '#424242',
                    axisLabel: '#686868',
                    cellBorder: '#EEEEEE',
                    cellTextColor: '#000000',
                    toggledColor: '#ffffff',
                    background: '#FFFFFF',
                    emptyCellColor: '#EEEEEE',
                    legendLabel: '#353535',
                    palette: [{ 'color': '#BEE7EE' },
                        { 'color': '#85c4cf' },
                        { 'color': '#4CA1AF' }]
                };
                break;
        }
        return style;
    }
    exports.getThemeColor = getThemeColor;
});
