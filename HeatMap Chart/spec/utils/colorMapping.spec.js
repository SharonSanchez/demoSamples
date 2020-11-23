define(["require", "exports", "@syncfusion/ej2-base", "../../src/heatmap/heatmap", "../../src/heatmap/index", "../../src/heatmap/index", "../../src/heatmap/index", "../../spec/common.spec"], function (require, exports, ej2_base_1, heatmap_1, index_1, index_2, index_3, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    heatmap_1.HeatMap.Inject(index_1.Adaptor, index_2.Legend, index_3.Tooltip);
    describe('Heatmap Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Heatmap series properties and its behavior', function () {
            var heatmap;
            var ele;
            var tempElement;
            var created;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                heatmap = new heatmap_1.HeatMap({
                    width: "100%",
                    height: "300px",
                    xAxis: {
                        title: { text: "Weekdays" },
                    },
                    yAxis: {
                        title: { text: "YAxis" },
                    },
                    dataSource: [[10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]],
                    paletteSettings: {
                        palette: [{ 'value': 100, 'color': "rgb(255, 255, 153)" },
                            { 'value': 50, 'color': "rgb(153, 255, 187)" },
                            { 'value': 20, 'color': "rgb(153, 153, 255)" },
                            { 'value': 0, 'color': "rgb(255, 159, 128)" },
                        ],
                        type: "Gradient"
                    },
                    legendSettings: {
                        visible: false
                    },
                });
            });
            afterAll(function () {
                heatmap.destroy();
                ele.remove();
            });
            it('Checking heatmap instance creation', function (done) {
                created = function (args) {
                    expect(heatmap != null).toBe(true);
                    done();
                };
                heatmap.created = created;
                heatmap.appendTo('#container');
            });
            it('Check paletteSettings type property', function () {
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == '#ffff99').toBe(true);
                heatmap.paletteSettings.type = "Fixed";
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == 'rgb(255, 255, 153)').toBe(true);
            });
            it('Check paletteSettings palette property', function () {
                heatmap.paletteSettings.palette = [{ 'value': 100, 'color': "rgb(255, 255, 153)" },
                    { 'color': "rgb(153, 255, 187)" },
                    { 'value': 20, 'color': "rgb(153, 153, 255)" },
                    { 'value': 0, 'color': "rgb(255, 159, 128)" },
                ];
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == "rgb(153, 153, 255)").toBe(true);
                heatmap.paletteSettings.type = "Gradient";
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == '#9999ff').toBe(true);
            });
            it('Check paletteSettings palette property', function () {
                heatmap.paletteSettings.palette = [{ 'value': 80, 'color': "rgb(255, 255, 153)" },
                    { 'value': 50, 'color': "rgb(153, 255, 187)" },
                    { 'value': 40, 'color': "rgb(153, 153, 255)" },
                    { 'value': 20, 'color': "rgb(255, 159, 128)" },
                ];
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == "rgb(255, 255, 153)").toBe(true);
                tempElement = document.getElementById('container_HeatMapRect_27');
                expect(tempElement.getAttribute('fill') == "rgb(255, 159, 128)").toBe(true);
                heatmap.paletteSettings.type = "Gradient";
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == "rgb(255, 255, 153)").toBe(true);
                tempElement = document.getElementById('container_HeatMapRect_27');
                expect(tempElement.getAttribute('fill') == "rgb(255, 159, 128)").toBe(true);
            });
            it('Overall color Range support', function () {
                heatmap.paletteSettings.palette = [
                    { 'startValue': 0, 'endValue': 30, 'color': "rgb(153, 255, 187)", minColor: '#ff0000', maxColor: '#00FF00' },
                    { 'startValue': 30, 'endValue': 60, 'color': "rgb(153, 153, 255)", minColor: '#0000FF', maxColor: '#008000' },
                    { 'startValue': 60, 'endValue': 80, 'color': "rgb(255, 159, 128)", minColor: '#808080', maxColor: '#ffa500' },
                ];
                heatmap.legendSettings.position = 'Top';
                heatmap.legendSettings.enableSmartLegend = false;
                heatmap.renderingMode = 'SVG';
                heatmap.paletteSettings.type = 'Gradient';
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == heatmap.paletteSettings.fillColor.maxColor).toBe(true);
                heatmap.renderingMode = 'Canvas';
                heatmap.refresh();
            });
            it('color Range support testing', function () {
                heatmap.paletteSettings.palette = [
                    { 'startValue': 15, 'endValue': 30, 'color': "rgb(255, 159, 128)", minColor: '#808080', maxColor: '#ffa500' },
                    { 'startValue': 40, 'endValue': 60, 'color': "rgb(153, 153, 255)", minColor: '#0000FF', maxColor: '#008000' },
                    { 'startValue': 70, 'endValue': 95, 'color': "rgb(153, 255, 187)", minColor: '#ff0000', maxColor: '#00FF00' },
                ];
                heatmap.renderingMode = 'SVG';
                heatmap.legendSettings.visible = true;
                heatmap.legendSettings.position = 'Top';
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == heatmap.paletteSettings.fillColor.maxColor).toBe(true);
                heatmap.renderingMode = 'Canvas';
                heatmap.legendSettings.position = 'Right';
                heatmap.refresh();
            });
            it('color Range support testing for fixed type', function () {
                heatmap.legendSettings.visible = true;
                heatmap.legendSettings.position = 'Top';
                heatmap.renderingMode = 'SVG';
                heatmap.paletteSettings.type = 'Fixed';
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == heatmap.paletteSettings.fillColor.minColor).toBe(true);
                heatmap.legendSettings.enableSmartLegend = true;
                heatmap.refresh();
                expect(tempElement.getAttribute('fill') == heatmap.paletteSettings.fillColor.minColor).toBe(true);
                heatmap.paletteSettings.palette = [
                    { 'startValue': 10, 'endValue': 30, 'color': "rgb(255, 159, 128)", minColor: '#808080', maxColor: '#ffa500' },
                    { 'startValue': 30, 'endValue': 60, 'color': "rgb(153, 153, 255)", minColor: '#0000FF', maxColor: '#008000' },
                    { 'startValue': 60, 'endValue': 100, 'color': "rgb(153, 255, 187)", minColor: '#ff0000', maxColor: '#00FF00' },
                ];
                heatmap.paletteSettings.type = 'Fixed';
                heatmap.legendSettings.position = null;
                heatmap.refresh();
                heatmap.paletteSettings.type = 'Gradient';
                heatmap.refresh();
            });
        });
        it('memory leak', function () {
            common_spec_1.profile.sample();
            var average = common_spec_1.inMB(common_spec_1.profile.averageChange);
            expect(average).toBeLessThan(10);
            var memory = common_spec_1.inMB(common_spec_1.getMemoryProfile());
            expect(memory).toBeLessThan(common_spec_1.profile.samples[0] + 0.25);
        });
    });
});
