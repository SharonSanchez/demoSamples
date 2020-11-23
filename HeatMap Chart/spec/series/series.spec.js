define(["require", "exports", "@syncfusion/ej2-base", "../../src/heatmap/heatmap", "../../src/heatmap/index", "../base/event.spec", "../../spec/common.spec"], function (require, exports, ej2_base_1, heatmap_1, index_1, event_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    heatmap_1.HeatMap.Inject(index_1.Adaptor);
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
            var tooltipElement;
            var created;
            var trigger = new event_spec_1.MouseEvents();
            var adaptorData = {};
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
                        type: "Fixed"
                    },
                    legendSettings: {
                        visible: false
                    },
                });
            });
            afterAll(function () {
                heatmap.destroy();
            });
            it('Checking heatmap instance creation', function (done) {
                created = function (args) {
                    expect(heatmap != null).toBe(true);
                    done();
                };
                heatmap.created = created;
                heatmap.appendTo('#container');
            });
            it('Change the xAxis in oposit position', function () {
                heatmap.cellSettings.border.width = 2;
                heatmap.cellSettings.border.radius = 2;
                heatmap.yAxis.opposedPosition = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('x') == '11' || tempElement.getAttribute('y') == '10').toBe(true);
            });
            it('Check enableCellHighlighting property', function () {
                heatmap.cellSettings.enableCellHighlighting = false;
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRectLabels_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 5, 5, false);
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('opacity')).toBe("1");
            });
            it('Check enableCellHighlighting property', function () {
                heatmap.cellSettings.enableCellHighlighting = true;
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRectLabels_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 5, 5, false);
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('opacity')).toBe("0.65");
            });
            it('Check format property', function () {
                heatmap.cellSettings.format = "{value}$";
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRectLabels_0');
                expect(tempElement.innerHTML == '100$').toBe(true);
            });
            it('Check showlable property', function () {
                heatmap.cellSettings.showLabel = false;
                heatmap.cellSettings.border.width = 0;
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRectLabels_0');
                expect(tempElement).toBe(null);
            });
            it('Check cell color for a particular cell', function () {
                heatmap.cellSettings.showLabel = true;
                heatmap.cellRender = function (args) {
                    if (args.xLabel == '0' && args.yLabel == '9') {
                        args.cellColor = '#898b2b';
                    }
                };
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('fill') == '#898b2b').toBe(true);
            });
            it('Check enableCanvasRendering property', function () {
                heatmap.renderingMode = "Canvas";
                heatmap.emptyPointColor = "blue";
                heatmap.dataBind();
                tempElement = document.getElementById('container_canvas');
                expect(tempElement).not.toBe(null);
            });
            it('Check bubble type heatmap', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.height = '100%';
                heatmap.showTooltip = true;
                heatmap.dataSource = [[10, 20, 30, 40],
                    [10, 20, 30, 40],
                    [10, 20, 30, 40]];
                heatmap.cellSettings.showLabel = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 0, 20, false);
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                expect(tempElement.getAttribute('opacity')).toBe("0.65");
                tooltipElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tooltipElement).not.toBe(null);
                setTimeout(done, 1600);
            });
            it('Check bubble(size) type heatmap', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Size";
                heatmap.showTooltip = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 0, 20, false);
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tooltipElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tooltipElement).not.toBe(null);
                setTimeout(done, 1600);
            });
            it('Check minimum size option for bubble(size) type heatmap', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Size";
                heatmap.cellSettings.bubbleSize.minimum = "50%";
                heatmap.showTooltip = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('r') == "45.25" || tempElement.getAttribute('r') == "45.5");
                setTimeout(done, 1600);
            });
            it('Check maximum size option for bubble(size) type heatmap', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Size";
                heatmap.cellSettings.bubbleSize.maximum = "80%";
                heatmap.showTooltip = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('r') == "36.2" || tempElement.getAttribute('r') == "36.4");
                setTimeout(done, 1600);
            });
            it('Check minimum size(minimum value) option for bubble(size) type heatmap', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Size";
                heatmap.cellSettings.bubbleSize.minimum = "0%";
                heatmap.showTooltip = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('r') == "45.25" || tempElement.getAttribute('r') == "45.5");
                setTimeout(done, 1600);
            });
            it('Check maximum size(maximum value) option for bubble(size) type heatmap', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Size";
                heatmap.cellSettings.bubbleSize.maximum = "100%";
                heatmap.showTooltip = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                expect(tempElement.getAttribute('r') == "36.2" || tempElement.getAttribute('r') == "36.4");
                setTimeout(done, 1600);
            });
            it('Check bubble(sector) type heatmap', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Sector";
                heatmap.showTooltip = true;
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 0, 20, false);
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tooltipElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tooltipElement).not.toBe(null);
                tempElement = document.getElementById('container_HeatMapRectLabels_0');
                expect(tempElement).toBe(null);
                setTimeout(done, 1600);
            });
            it('Check bubble(sector) type heatmap in Canvas mode', function (done) {
                heatmap.renderingMode = "Canvas";
                heatmap.dataBind();
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 0, 80));
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 50, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check bubble(size) type heatmap in Canvas mode', function (done) {
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Size";
                heatmap.cellSettings.border.width = 1;
                heatmap.cellSettings.border.color = 'red';
                heatmap.dataBind();
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 0, 80));
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 50, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check bubble(size) type heatmap in Canvas mode', function (done) {
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Size";
                heatmap.cellSettings.border.width = 1;
                heatmap.cellSettings.border.color = 'red';
                heatmap.dataBind();
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 0, 80));
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 50, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check bubble(color) type heatmap in Canvas mode', function (done) {
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "Color";
                heatmap.dataBind();
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 0, 80));
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 50, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check SizeAndColor type heatmap in Canvas mode', function (done) {
                heatmap.cellSettings.tileType = "Bubble";
                heatmap.cellSettings.bubbleType = "SizeAndColor";
                heatmap.dataSource = [
                    [[0, 320], [40, 360]],
                    [[80, 240, 40], [120, 280]],
                    [['', 240], [120, '']],
                    [[160, 160], [200, 200]],
                    [[160, null], ['', '']],
                    [[240, 80], [280, 120]],
                    [[null, 240], 120],
                    [[320, 40], [360, 0]],
                    [[null, null], [360, 0]]
                ];
                heatmap.refresh();
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 0, 80));
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 50, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check SizeAndColor type heatmap in Canvas mode', function (done) {
                heatmap.renderingMode = "SVG";
                heatmap.paletteSettings.type = 'Gradient';
                heatmap.legendSettings.showGradientPointer = true;
                heatmap.legendSettings.visible = true;
                heatmap.refresh();
                tempElement = document.getElementById('container');
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 0, 20, false);
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tooltipElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tooltipElement).not.toBe(null);
                tempElement = document.getElementById('container_HeatMapRectLabels_0');
                expect(tempElement).toBe(null);
                setTimeout(done, 1600);
            });
            it('Check SizeAndColor type heatmap in cell dataSource with Json Cell dataSource', function (done) {
                var jsonCellData = [
                    {
                        "rowid": "TestX1",
                        "columnid": "Jan",
                        "value": "21",
                        "Men": "21",
                        "Women": "11"
                    },
                    {
                        "rowid": "Moutain",
                        "columnid": "Feb",
                        "value": "24",
                        "Men": null,
                        "Women": "41"
                    },
                    {
                        "rowid": "Moutain",
                        "columnid": "TestY2",
                        "value": "24",
                        "Men": "41",
                        "Women": "28"
                    },
                    {
                        "rowid": "TestX2",
                        "columnid": "Mar",
                        "value": "25"
                    },
                    {
                        "rowid": "Pacific",
                        "columnid": "Apr",
                        "value": "27",
                        "Men": "81",
                        "Women": "14"
                    },
                    {
                        "rowid": "Pacific",
                        "columnid": "TestY1",
                        "value": "27",
                        "Men": "",
                        "Women": null
                    },
                    {
                        "rowid": "TestX3",
                        "columnid": "May",
                        "value": "32",
                        "Men": "",
                        "Women": "19"
                    },
                    {
                        "rowid": "TestX3",
                        "columnid": "Jun",
                        "value": "34"
                    },
                    {
                        "rowid": "TestX1",
                        "columnid": "Jun",
                        "value": "34",
                        "Men": "50",
                        "Women": "13"
                    }
                ];
                adaptorData = {
                    isJsonData: true,
                    adaptorType: "Cell",
                    xDataMapping: "rowid",
                    yDataMapping: "columnid",
                    valueMapping: "value",
                    bubbleDataMapping: { size: 'Men', color: 'Women' }
                };
                heatmap.xAxis.labels = ['TestX1', 'Pacific', 'TestX2', 'Moutain', 'TestX3'];
                heatmap.yAxis.labels = ['TestY1', 'Jan', 'Feb', 'Mar', 'TestY2', 'Apr', 'May', 'Jun', 'TestY3'];
                heatmap.dataSource = jsonCellData;
                heatmap.dataSourceSettings = adaptorData;
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 0, 20, false);
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tooltipElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tooltipElement).not.toBe(null);
                expect(heatmap.tooltipModule.tooltipObject.content[0]).toBe("Weekdays : TestX1<br/>YAxis : Jun<br/>Men : 50$<br/>Women : 13$");
                setTimeout(done, 1600);
            });
            it('Checking cell rendering event', function (done) {
                heatmap.cellSettings = {
                    format: '',
                    bubbleType: 'Size',
                },
                    heatmap.cellRender = function (args) {
                        if (args.value >= 30) {
                            args.displayText = 'test';
                        }
                    },
                    heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRectLabels_0');
                expect(tempElement.textContent).toBe("test");
                done();
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
