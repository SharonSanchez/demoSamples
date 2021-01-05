define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TwoDimensional = (function () {
        function TwoDimensional(heatMap) {
            this.heatMap = heatMap;
        }
        TwoDimensional.prototype.processDataSource = function (dataSource) {
            var tempCloneData = ej2_base_1.extend([], dataSource, null, true);
            this.heatMap.clonedDataSource = [];
            this.completeDataSource = [];
            var axis = this.heatMap.axisCollections;
            var dataLength = axis[0].maxLength + 1;
            var labelLength = axis[0].axisLabelSize + (axis[0].min > 0 ? axis[0].min : 0);
            var xLength = dataLength > labelLength ? dataLength : labelLength;
            var minVal;
            var maxVal;
            dataLength = axis[1].maxLength + 1;
            labelLength = axis[1].axisLabelSize + (axis[1].min > 0 ? axis[1].min : 0);
            var yLength = dataLength > labelLength ? dataLength : labelLength;
            var tempVariable;
            var cloneDataIndex = 0;
            var minMaxDatasource = [];
            this.tempSizeArray = [];
            this.tempColorArray = [];
            this.heatMap.minColorValue = null;
            this.heatMap.maxColorValue = null;
            this.heatMap.dataMax = [];
            this.heatMap.dataMin = [];
            if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && xLength < yLength) {
                xLength = yLength;
            }
            for (var z = axis[1].valueType === 'Category' ? axis[1].min : 0; z < (this.heatMap.paletteSettings.colorGradientMode === 'Column' ? xLength : yLength); z++) {
                var tempIndex = axis[0].valueType === 'Category' ? axis[0].min : 0;
                this.completeDataSource.push([]);
                while (tempIndex < xLength) {
                    if (tempIndex >= axis[0].min && tempIndex <= axis[0].max) {
                        this.processDataArray(tempCloneData, tempIndex, z, cloneDataIndex);
                    }
                    tempIndex++;
                }
                if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.paletteSettings.type === 'Gradient') {
                    tempVariable = ej2_base_1.extend([], tempCloneData[cloneDataIndex], null, true);
                    for (var i = 0; i < tempVariable.length; i++) {
                        if (typeof (tempVariable[i]) === 'object' && (tempVariable[i]) !== null || undefined || '') {
                            tempVariable[i] = tempVariable[i][0];
                        }
                    }
                }
                else {
                    tempVariable = ej2_base_1.extend([], this.completeDataSource[cloneDataIndex], null, true);
                }
                var minMaxVal = this.getMinMaxValue(minVal, maxVal, tempVariable);
                if ((this.heatMap.paletteSettings.colorGradientMode === 'Column' ||
                    this.heatMap.paletteSettings.colorGradientMode === 'Row') && this.heatMap.paletteSettings.type === 'Gradient') {
                    this.heatMap.dataMax[z] = minMaxVal[1];
                    this.heatMap.dataMin[z] = minMaxVal[0];
                }
                minVal = minMaxVal[0];
                maxVal = minMaxVal[1];
                if (this.heatMap.xAxis.isInversed) {
                    this.completeDataSource[cloneDataIndex] = this.completeDataSource[cloneDataIndex].reverse();
                }
                if (z >= this.heatMap.axisCollections[1].min && z <= this.heatMap.axisCollections[1].max) {
                    minMaxDatasource.push(this.completeDataSource[cloneDataIndex]);
                }
                cloneDataIndex++;
            }
            if (this.heatMap.paletteSettings.colorGradientMode === 'Row' && !this.heatMap.yAxis.isInversed &&
                this.heatMap.paletteSettings.type === 'Gradient') {
                this.heatMap.dataMax = this.heatMap.dataMax.reverse();
                this.heatMap.dataMin = this.heatMap.dataMin.reverse();
            }
            if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.xAxis.isInversed &&
                this.heatMap.paletteSettings.type === 'Gradient') {
                this.heatMap.dataMax = this.heatMap.dataMax.reverse();
                this.heatMap.dataMin = this.heatMap.dataMin.reverse();
            }
            if (!this.heatMap.yAxis.isInversed) {
                this.completeDataSource.reverse();
                minMaxDatasource.reverse();
            }
            this.heatMap.clonedDataSource = minMaxDatasource;
            this.heatMap.dataSourceMinValue = ej2_base_1.isNullOrUndefined(minVal) ? 0 : parseFloat(minVal.toString());
            this.heatMap.dataSourceMaxValue = ej2_base_1.isNullOrUndefined(maxVal) ? 0 : parseFloat(maxVal.toString());
            this.heatMap.isColorValueExist = ej2_base_1.isNullOrUndefined(this.heatMap.minColorValue) ? false : true;
            this.heatMap.minColorValue = ej2_base_1.isNullOrUndefined(this.heatMap.minColorValue) ?
                this.heatMap.dataSourceMinValue : parseFloat(this.heatMap.minColorValue.toString());
            this.heatMap.maxColorValue = ej2_base_1.isNullOrUndefined(this.heatMap.maxColorValue) ?
                this.heatMap.dataSourceMaxValue : parseFloat(this.heatMap.maxColorValue.toString());
        };
        TwoDimensional.prototype.processDataArray = function (tempCloneData, tempIndex, z, cloneDataIndex) {
            if (this.heatMap.bubbleSizeWithColor) {
                if (tempCloneData[tempIndex] && !ej2_base_1.isNullOrUndefined(tempCloneData[tempIndex][z])
                    && typeof (tempCloneData[tempIndex][z]) === 'object') {
                    var internalArray = tempCloneData[tempIndex][z];
                    for (var tempx = 0; tempx < internalArray.length; tempx++) {
                        if (ej2_base_1.isNullOrUndefined(internalArray[tempx]) || isNaN(internalArray[tempx])) {
                            internalArray[tempx] = '';
                        }
                        if (tempx === 0) {
                            this.tempSizeArray.push(internalArray[tempx]);
                        }
                        else if (tempx === 1) {
                            this.tempColorArray.push(internalArray[tempx]);
                            break;
                        }
                    }
                    this.completeDataSource[cloneDataIndex].push(internalArray);
                }
                else {
                    if (!ej2_base_1.isNullOrUndefined(tempCloneData[tempIndex]) && (tempCloneData[tempIndex][z] ||
                        (tempCloneData[tempIndex][z] === 0 &&
                            tempCloneData[tempIndex][z].toString() !== ''))) {
                        this.completeDataSource[cloneDataIndex].push([tempCloneData[tempIndex][z]]);
                        this.tempSizeArray.push(tempCloneData[tempIndex][z]);
                    }
                    else {
                        this.completeDataSource[cloneDataIndex].push('');
                    }
                }
            }
            else {
                if (tempCloneData[tempIndex] && (tempCloneData[tempIndex][z] ||
                    (tempCloneData[tempIndex][z] === 0 &&
                        tempCloneData[tempIndex][z].toString() !== ''))) {
                    if (typeof (tempCloneData[tempIndex][z]) === 'object') {
                        if (tempCloneData[tempIndex][z].length > 0 && !ej2_base_1.isNullOrUndefined(tempCloneData[tempIndex][z][0])) {
                            this.completeDataSource[cloneDataIndex].push(tempCloneData[tempIndex][z][0]);
                        }
                        else {
                            this.completeDataSource[cloneDataIndex].push('');
                        }
                    }
                    else {
                        this.completeDataSource[cloneDataIndex].push(tempCloneData[tempIndex][z]);
                    }
                }
                else {
                    this.completeDataSource[cloneDataIndex].push('');
                }
            }
        };
        TwoDimensional.prototype.getMinMaxValue = function (minVal, maxVal, tempVariable) {
            var minMaxValue = [];
            if (this.heatMap.bubbleSizeWithColor) {
                if (this.heatMap.paletteSettings.colorGradientMode === 'Column' && this.heatMap.paletteSettings.type === 'Gradient') {
                    this.tempSizeArray = tempVariable;
                }
                minMaxValue.push(this.getMinValue(minVal, this.tempSizeArray));
                minMaxValue.push(this.getMaxValue(maxVal, this.tempSizeArray));
                this.heatMap.minColorValue = this.getMinValue(this.heatMap.minColorValue, this.tempColorArray);
                this.heatMap.maxColorValue = this.getMaxValue(this.heatMap.maxColorValue, this.tempColorArray);
            }
            else {
                minMaxValue.push(this.getMinValue(minVal, tempVariable));
                minMaxValue.push(this.getMaxValue(maxVal, tempVariable));
            }
            return minMaxValue;
        };
        TwoDimensional.prototype.getMinValue = function (minVal, tempVariable) {
            if (ej2_base_1.isNullOrUndefined(minVal)) {
                minVal = this.performSort(tempVariable);
            }
            else if (this.performSort(tempVariable) < minVal) {
                minVal = this.performSort(tempVariable);
            }
            else if ((this.heatMap.paletteSettings.colorGradientMode === 'Row' ||
                this.heatMap.paletteSettings.colorGradientMode === 'Column') && this.heatMap.paletteSettings.type === 'Gradient') {
                minVal = this.performSort(tempVariable);
            }
            return !ej2_base_1.isNullOrUndefined(minVal) ? parseFloat(minVal.toString()) : minVal;
        };
        TwoDimensional.prototype.getMaxValue = function (maxVal, tempVariable) {
            if (ej2_base_1.isNullOrUndefined(maxVal) && tempVariable.length > 0) {
                maxVal = Math.max.apply(Math, tempVariable);
            }
            else if (Math.max.apply(Math, tempVariable) > maxVal) {
                maxVal = Math.max.apply(Math, tempVariable);
            }
            else if ((this.heatMap.paletteSettings.colorGradientMode === 'Row' ||
                this.heatMap.paletteSettings.colorGradientMode === 'Column') && this.heatMap.paletteSettings.type === 'Gradient') {
                maxVal = Math.max.apply(Math, tempVariable);
            }
            return !ej2_base_1.isNullOrUndefined(maxVal) ? parseFloat(maxVal.toString()) : maxVal;
        };
        TwoDimensional.prototype.performSort = function (tempVariable) {
            return tempVariable.sort(function (a, b) { return a - b; }).filter(this.checkmin)[0];
        };
        TwoDimensional.prototype.checkmin = function (val) {
            return !ej2_base_1.isNullOrUndefined(val) && val.toString() !== '';
        };
        return TwoDimensional;
    }());
    exports.TwoDimensional = TwoDimensional;
});
