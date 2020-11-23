define(["require", "exports", "@syncfusion/ej2-base", "../../src/heatmap/heatmap", "../../src/heatmap/index", "../base/event.spec", "../../spec/common.spec"], function (require, exports, ej2_base_1, heatmap_1, index_1, event_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    heatmap_1.HeatMap.Inject(index_1.Legend);
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
            var trigger = new event_spec_1.MouseEvents();
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
                    showTooltip: false,
                    renderingMode: "Auto",
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
            it('Change the width and height of heatmap', function () {
                heatmap.width = "300px",
                    heatmap.height = "400px",
                    heatmap.margin.top = 100,
                    heatmap.dataBind();
                tempElement = document.getElementById('container_svg');
                expect(tempElement.getAttribute('width') == '300' && tempElement.getAttribute('height') == '400').toBe(true);
            });
            it('Change the width and height of heatmap', function () {
                heatmap.width = "100%",
                    heatmap.height = "100%",
                    heatmap.dataBind();
                tempElement = document.getElementById('container_svg');
                expect((tempElement.getAttribute('width') == '767' || tempElement.getAttribute('width') == '769') && tempElement.getAttribute('height') == '450').toBe(true);
            });
            it('Cehck the heat map with HighContrast light theme', function () {
                heatmap.theme = "HighContrastLight",
                    heatmap.dataBind();
                tempElement = document.getElementById('container_HeatmapBorder');
                expect(tempElement.getAttribute('fill') == '#000000').toBe(true);
            });
            it('Cehck the heat map with Material dark theme', function () {
                heatmap.theme = "MaterialDark",
                    heatmap.dataBind();
                tempElement = document.getElementById('container_HeatmapBorder');
                expect(tempElement.getAttribute('fill') == '#000000').toBe(true);
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
