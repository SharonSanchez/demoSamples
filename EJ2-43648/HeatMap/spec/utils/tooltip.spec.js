define(["require", "exports", "@syncfusion/ej2-base", "../../src/heatmap/heatmap", "../../src/heatmap/index", "../../src/heatmap/index", "../../src/heatmap/index", "../base/event.spec", "../../spec/common.spec"], function (require, exports, ej2_base_1, heatmap_1, index_1, index_2, index_3, event_spec_1, common_spec_1) {
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
        describe('Heatmap tooltip properties and its behavior', function () {
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
                    dataSource: [[10, "", 30, 40, 50, 60, 70, 80, 90, 100],
                        [10, 20, 30, null, 50, 60, 70, 80, 90, 100],
                        [10, 20, 30, 0, 50, 60, 70, 80, 90, 100]],
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
                    showTooltip: true,
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
            it('Check tooltip visibility for a null cell', function () {
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 220, false);
                tempElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tempElement).toBe(null);
            });
            it('Check tooltip visibility for a value exist cell', function () {
                heatmap.cellSettings.enableCellHighlighting = true;
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tempElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tempElement).not.toBe(null);
            });
            it('Check tooltip visibility for a value exist cell and move to another cell', function () {
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 60, false);
                tempElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tempElement).not.toBe(null);
            });
            it('Check tooltip visibility for a value exist cell and move to outer and come back', function () {
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 0, false);
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 60, false);
                tempElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tempElement).not.toBe(null);
            });
            it('Check tooltip template visibility', function () {
                heatmap.tooltipRender = function (args) {
                    args.content = [args.xLabel + "-" + args.yLabel + "=" + parseInt(args.value.toString()) * 10];
                };
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_1');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tempElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tempElement).not.toBe(null);
            });
            it('Check tooltip template visibility in empty text cell', function () {
                tempElement = document.getElementById('container_HeatMapRect_24');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 220, false);
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("hidden");
            });
            it('Check tooltip visibility beyond heatmap container', function () {
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseLeave(trigger.onTouchStart(tempElement, null, null, null, null, 0, 0));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("hidden");
            });
            it('Check tooltip visibility on touch', function (done) {
                tempElement = document.getElementById('container_HeatMapRect_1');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 70, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check tooltip visibility on touch', function (done) {
                tempElement = document.getElementById('container_HeatMapRect_2');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 70, 80));
                tempElement = document.getElementById('container_HeatMapRect_3');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 170, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check tooltip visibility on touch', function (done) {
                heatmap.paletteSettings.type = 'Gradient';
                heatmap.legendSettings.showGradientPointer = true;
                heatmap.legendSettings.visible = true;
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_2');
                heatmap.heatMapMouseLeave(trigger.onTouchStart(tempElement, null, null, null, null, 70, 80));
                expect(tempElement.style.visibility).toBe('');
                setTimeout(done, 1600);
            });
            it('Check tooltip visibility on touch', function (done) {
                heatmap.renderingMode = 'Canvas';
                heatmap.refresh();
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 70, 80));
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseMove(trigger.onTouchStart(tempElement, null, null, null, null, 170, 80));
                tempElement = document.getElementById('containerCelltooltipcontainer');
                expect(tempElement.style.visibility).toBe("visible");
                setTimeout(done, 1600);
            });
            it('Check tooltip visibility on touch', function (done) {
                tempElement = document.getElementById('container');
                heatmap.heatMapMouseLeave(trigger.onTouchStart(tempElement, null, null, null, null, 70, 80));
                expect(tempElement.style.visibility).toBe('');
                setTimeout(done, 1600);
            });
            it('Check tooltip template visibility while cancel it', function () {
                heatmap.tooltipRender = function (args) {
                    args.cancel = true;
                };
                heatmap.renderingMode = 'SVG';
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_1');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tempElement = document.getElementById('containerCelltooltipcontainer_svg');
                expect(tempElement).toBe(null);
            });
            it('Check tooltip Color', function () {
                heatmap.tooltipRender = function (args) {
                    args.cancel = false;
                };
                heatmap.tooltipSettings.fill = "RED";
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                expect(document.getElementById('containerCelltooltipcontainer_path').getAttribute("fill")).toBe("RED");
            });
            it('Changing tooltip color dynamically', function () {
                heatmap.tooltipSettings.fill = "Pink";
                heatmap.dataBind();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                expect(document.getElementById('containerCelltooltipcontainer_path').getAttribute("fill")).toBe("Pink");
            });
            it('Check tooltip Color', function () {
                heatmap.tooltipRender = function (args) {
                    args.cancel = false;
                };
                heatmap.tooltipSettings.fill = "RED";
                heatmap.cellSettings.border.width = 10;
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 150, 31, false);
                expect(document.getElementById('containerCelltooltipcontainer_path').getAttribute("fill")).toBe("RED");
                heatmap.cellSettings.border.width = 1;
                heatmap.refresh();
            });
            it('Check tooltip template support', function () {
                heatmap.tooltipSettings.template = "<div>${xValue}</div><div>${yValue}</div>${value}";
                heatmap.refresh();
                tempElement = document.getElementById('container_HeatMapRect_0');
                trigger.mousemoveEvent(tempElement, 0, 0, 60, 20, false);
                tempElement = document.getElementById('containerCelltooltipcontainerparent_template');
                expect(tempElement.textContent).toBe("09100");
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
