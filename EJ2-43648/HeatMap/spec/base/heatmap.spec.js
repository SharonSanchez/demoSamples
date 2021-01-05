define(["require", "exports", "@syncfusion/ej2-base", "../../src/heatmap/heatmap", "../../src/heatmap/index", "../../src/heatmap/index", "../../src/heatmap/index", "./event.spec", "../../spec/common.spec"], function (require, exports, ej2_base_1, heatmap_1, index_1, index_2, index_3, event_spec_1, common_spec_1) {
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
        describe('Heatmap direct properties and its behavior', function () {
            var heatmap;
            var ele;
            var text;
            var created;
            var data = [
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5],
            ];
            var trigger = new event_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                heatmap = new heatmap_1.HeatMap({
                    dataSource: data,
                    legendSettings: {
                        visible: false
                    }
                });
            });
            afterAll(function () {
                heatmap.destroy();
            });
            it('Checking module name', function () {
                expect(heatmap.getModuleName()).toBe('heatmap');
            });
            it('Checking heatmap instance creation', function (done) {
                created = function (args) {
                    expect(heatmap != null).toBe(true);
                    done();
                };
                heatmap.created = created;
                heatmap.appendTo('#container');
            });
            it('Checking with  title', function () {
                heatmap.titleSettings.text = "Heat Map";
                heatmap.refresh();
                text = document.getElementById('container_HeatmapTitle');
                expect(text.textContent == 'Heat Map').toBe(true);
                expect(text.getAttribute('x') == '383.5' || text.getAttribute('y') == '22.75' || text.getAttribute('x') == '379').toBe(true);
            });
            it('Check title with text alignment', function () {
                heatmap.titleSettings.text = "Heat Map";
                heatmap.titleSettings.textStyle.textAlignment = "Far";
                heatmap.refresh();
                text = document.getElementById('container_HeatmapTitle');
                expect(text.textContent == 'Heat Map').toBe(true);
                expect(text.getAttribute('x') == '757' || text.getAttribute('x') == '759' || text.getAttribute('y') == '25' || text.getAttribute('y') == '22.75').toBe(true);
            });
            it('Check title with text alignment', function () {
                heatmap.titleSettings.text = "Heat Map";
                heatmap.titleSettings.textStyle.textAlignment = "Near";
                heatmap.refresh();
                text = document.getElementById('container_HeatmapTitle');
                expect(text.textContent == 'Heat Map').toBe(true);
                expect(text.getAttribute('x') == '10' && (text.getAttribute('y') == '25' || text.getAttribute('y') == '22.75')).toBe(true);
            });
            it('Check the heat map with out title', function () {
                heatmap.titleSettings.text = "";
                heatmap.dataBind();
                text = document.getElementById('container_HeatmapTitle');
                expect(text == undefined).toBe(true);
            });
            it('Check title with text wrap', function () {
                heatmap.titleSettings.text = "A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. The user defined data should be plotted against the horizontal and vertical labels to a grid like UI with color varying for each data value";
                heatmap.titleSettings.textStyle.textOverflow = "Wrap";
                heatmap.refresh();
                text = document.getElementById('container_HeatmapTitle1');
                expect(text.getAttribute('x') == '10' && (text.getAttribute('y') == '45' || text.getAttribute('y') == '39.75')).toBe(true);
            });
            it('Check title with text wrap in canvas', function () {
                heatmap.titleSettings.text = "A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. The user defined data should be plotted against the horizontal and vertical labels to a grid like UI with color varying for each data value";
                heatmap.titleSettings.textStyle.textOverflow = "Wrap";
                heatmap.renderingMode = "Canvas";
                heatmap.refresh();
                expect(heatmap.tooltipCollection.length == 0).toBe(true);
            });
            it('Check heat map with empty data source', function () {
                heatmap.dataSource = [];
                heatmap.renderingMode = "SVG";
                heatmap.refresh();
                expect(heatmap.axisCollections[0].maxLength == 0 && heatmap.axisCollections[1].maxLength == 0).toBe(true);
            });
            it('Check heat map with different legnth data', function () {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.refresh();
                expect(heatmap.axisCollections[0].maxLength == 2 && heatmap.axisCollections[1].maxLength == 3).toBe(true);
            });
            it('Check cellClick client side event', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.cellClick = function (args) {
                    expect(args.value == 7).toBe(true);
                    done();
                };
                heatmap.refresh();
                var element = document.getElementById("container_HeatMapRect_1");
                var region = element.getBoundingClientRect();
                trigger.clickEvent(element, 0, 0, region.left + 10, region.top + 10);
            });
            it('Check cellClick client side event', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.cellClick = function (args) {
                    expect(args.value == 7).toBe(true);
                    done();
                };
                heatmap.refresh();
                var element = document.getElementById("container_HeatMapRect_1");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseClick(trigger.onTouchStart(element, null, null, null, null, region.left + 10, region.top + 10));
            });
            it('Check title tool tip', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.renderingMode = "SVG";
                heatmap.titleSettings.text = "A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.";
                heatmap.titleSettings.textStyle.textOverflow = "Trim";
                heatmap.refresh();
                var element = document.getElementById("container_HeatmapTitle");
                var region = element.getBoundingClientRect();
                trigger.mousemoveEvent(element, 0, 0, region.left + 10, region.top + 5, false);
                var tooltipElement = document.getElementById("container_Title_Tooltip");
                expect(tooltipElement.textContent == 'A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.').toBe(true);
                trigger.mousemoveEvent(element, 0, 0, region.left + 15, region.top + 5, false);
                element = document.getElementById("container_Title_Tooltip");
                expect(tooltipElement.textContent == 'A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.').toBe(true);
                done();
            });
            it('Check title tool tip in touch', function (done) {
                heatmap.titleSettings.textStyle.textOverflow = "Trim";
                heatmap.refresh();
                var element = document.getElementById("container_HeatmapTitle");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 10, region.top + 5));
                var tooltipElement = document.getElementById("container_Title_Tooltip");
                expect(tooltipElement.textContent == 'A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.').toBe(true);
                setTimeout(done, 1600);
            });
            it('Check title tool tip without trim', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.titleSettings.text = "A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.";
                heatmap.titleSettings.textStyle.textOverflow = "None";
                heatmap.refresh();
                var element = document.getElementById("container_HeatmapTitle");
                var region = element.getBoundingClientRect();
                trigger.mousemoveEvent(element, 0, 0, region.left + 10, region.top + 5, false);
                element = document.getElementById("container_Title_Tooltip");
                expect(element == null).toBe(true);
                done();
            });
            it('Check title tool tip remove when title not trimmed', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.titleSettings.text = "Heat map";
                heatmap.titleSettings.textStyle.textOverflow = "Trim";
                heatmap.refresh();
                var element = document.getElementById("container_HeatmapTitle");
                var region = element.getBoundingClientRect();
                trigger.mousemoveEvent(element, 0, 0, region.left + 10, region.top + 5, false);
                element = document.getElementById("container_Title_Tooltip");
                expect(element == null).toBe(true);
                done();
            });
            it('Checking heatmap instance creation - canvas', function (done) {
                ej2_base_1.remove(heatmap.svgObject);
                created = function (args) {
                    expect(heatmap != null).toBe(true);
                    done();
                };
                heatmap.renderingMode = "Canvas";
                heatmap.created = created;
                heatmap.dataBind();
            });
            it('Check title tool tip', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.renderingMode = "Canvas";
                heatmap.allowSelection = true;
                heatmap.titleSettings.text = "A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.";
                heatmap.titleSettings.textStyle.textOverflow = "Trim";
                heatmap.titleSettings.textStyle.size = '15';
                heatmap.titleSettings.textStyle.fontWeight = 'regular';
                heatmap.yAxis.title.text = "yAxis";
                heatmap.refresh();
                var element = document.getElementById("container_canvas");
                trigger.mousemoveEvent(element, 0, 0, 28, 27, false);
                element = document.getElementById("container_canvas_Tooltip");
                expect(element.textContent == 'A heat map is a graphical representation of data where the values contained in a matrix are represented as colors. A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.').toBe(true);
                done();
            });
            it('Check title tooltip remove', function () {
                var tempElement = document.getElementById('container');
                heatmap.heatMapMouseLeave(trigger.onTouchStart(tempElement, null, null, null, null, 0, 0));
                var element = document.getElementById('container_canvas_Tooltip');
                expect(element == null).toBe(true);
            });
            it('Check title tooltip remove in SVG', function () {
                heatmap.renderingMode = "SVG";
                heatmap.dataBind();
                var tempElement = document.getElementById('container');
                heatmap.heatMapMouseLeave(trigger.onTouchStart(tempElement, null, null, null, null, 0, 0));
                var element = document.getElementById('container_Title_Tooltip');
                expect(element == null).toBe(true);
            });
            it('Multi Cell Selection in SVG', function () {
                heatmap.dataSource = [
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                ];
                heatmap.allowSelection = true;
                heatmap.multiSelection = true;
                heatmap.refresh();
                var element = document.getElementById("container_HeatMapRect_3");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 5, region.top + 5));
                trigger.mousemoveEvent(element, 0, 0, region.left + 50, region.top + 50, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, region.left + 50, region.top + 50));
                expect(heatmap.tempMultiCellCollection[0].length).toBe(1);
                heatmap.clearSelection();
            });
            it('check heatmap cell Selection resize action', function (done) {
                heatmap.refresh();
                var element = document.getElementById("container_HeatMapRect_13");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 5, region.top + 5));
                trigger.mousemoveEvent(element, 0, 0, region.left - 100, region.top - 100, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, region.left - 100, region.top - 100));
                heatmap.heatMapResize(event);
                expect(heatmap.tempMultiCellCollection[0].length).toBe(6);
                setTimeout(done, 1600);
            });
            it('check selected cell color change after changing palette colors', function () {
                heatmap.paletteSettings.palette = [{ color: '#9892BB' },
                    { color: '#2B8C9B' },
                    { color: '#257A87' },
                    { color: '#206974' }];
                heatmap.dataBind();
                expect(heatmap.tempMultiCellCollection[0].length).toBe(6);
            });
            it('check heatmap resize action without selection', function (done) {
                heatmap.refresh();
                heatmap.clearSelection();
                heatmap.heatMapResize(event);
                expect(heatmap.multiCellCollection.length).toBe(0);
                setTimeout(done, 1600);
            });
            it('Multi Cell Selection in SVG', function () {
                var element = document.getElementById("container_HeatMapRect_13");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 5, region.top + 5));
                trigger.mousemoveEvent(element, 0, 0, region.left - 100, region.top - 100, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, region.left - 100, region.top - 100));
                expect(heatmap.tempMultiCellCollection[0].length).toBe(6);
            });
            it('Multi Cell Selection in SVG using ctrl key', function () {
                heatmap.refresh();
                var element = document.getElementById("container_HeatMapRect_16");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 5, region.top + 5));
                trigger.mousemoveEvent(element, 0, 0, region.left - 100, region.top - 100, true);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, region.left - 100, region.top - 100));
                var eleme = document.getElementById("container_HeatMapRect_24");
                var regi = eleme.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(eleme, null, null, null, null, regi.left + 5, regi.top + 5));
                trigger.mousemoveEvent(eleme, 0, 0, regi.left - 100, regi.top - 100, true);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(eleme, null, null, null, null, regi.left - 100, regi.top - 100));
                expect(heatmap.multiCellCollection.length).toBe(17);
            });
            it('Multi Cell deSelection in SVG using ctrl key', function () {
                heatmap.clearSelection();
                heatmap.refresh();
                var element = document.getElementById("container_HeatMapRect_16");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 5, region.top + 5));
                trigger.mousemoveEvent(element, 0, 0, region.left - 100, region.top - 100, true);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, region.left - 100, region.top - 100));
                var eleme = document.getElementById("container_HeatMapRect_11");
                var regi = eleme.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(eleme, null, null, null, null, regi.left + 5, regi.top + 5));
                trigger.mousemoveEvent(eleme, 0, 0, regi.left + 5, regi.top + 5, true);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(eleme, null, null, null, null, regi.left + 5, regi.top + 5));
                expect(heatmap.multiCellCollection.length).toBe(5);
            });
            it('Multi Cell deSelection in SVG using ctrl key', function () {
                heatmap.clearSelection();
                heatmap.refresh();
                var element = document.getElementById("container_HeatMapRect_16");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 5, region.top + 5));
                trigger.mousemoveEvent(element, 0, 0, region.left - 100, region.top - 100, true);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, region.left - 100, region.top - 100));
                var eleme = document.getElementById("container_HeatMapRect_16");
                var regi = eleme.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, regi.left + 5, regi.top + 5));
                trigger.mousemoveEvent(element, 0, 0, regi.left - 100, regi.top - 100, true);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, regi.left - 100, regi.top - 100));
                expect(heatmap.multiCellCollection.length).toBe(0);
            });
            it('Multi Cell Selection in SVG Tap', function () {
                heatmap.showTooltip = true;
                var element = document.getElementById("container_HeatMapRect_13");
                var region = element.getBoundingClientRect();
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, region.left + 5, region.top + 5));
                trigger.mousemoveEvent(element, 0, 0, region.left - 100, region.top - 100, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, region.left - 100, region.top - 100));
                expect(element.style.visibility).toBe("");
            });
            it('Multi Cell deSelection in Canvas', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                ];
                heatmap.renderingMode = 'Canvas';
                heatmap.allowSelection = true;
                heatmap.legendSettings.visible = true;
                heatmap.dataBind();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 200, 200, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 200, 200));
                trigger.mousemoveEvent(element, 0, 0, 250, 250, false);
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 150, 150));
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 250, 250));
                expect((heatmap.multiCellCollection.length == 1) || (heatmap.multiCellCollection.length == 3));
                heatmap.heatMapResize(event);
                heatmap.clearSelection();
                setTimeout(done, 1600);
            });
            it('Multi Cell Selection in Canvas', function () {
                heatmap.dataSource = [
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                ];
                heatmap.heatMapResize(event);
                heatmap.renderingMode = 'Canvas';
                heatmap.heatMapResize(event);
                heatmap.allowSelection = true;
                heatmap.legendSettings.visible = true;
                heatmap.dataBind();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 200, 200, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 200, 200));
                expect((heatmap.multiCellCollection.length == 0) || (heatmap.multiCellCollection.length == 2));
                heatmap.heatMapResize(event);
                heatmap.clearSelection();
            });
            it('Multi Cell deSelection in Canvas', function () {
                heatmap.dataSource = [
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                ];
                heatmap.heatMapResize(event);
                heatmap.renderingMode = 'Canvas';
                heatmap.heatMapResize(event);
                heatmap.allowSelection = true;
                heatmap.legendSettings.visible = true;
                heatmap.dataBind();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 200, 200, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 200, 200));
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 200, 200, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 200, 200));
                expect((heatmap.multiCellCollection.length == 0) || (heatmap.multiCellCollection.length == 1));
                heatmap.heatMapResize(event);
                heatmap.clearSelection();
            });
            it('Multi Cell deSSelection in Canvas', function () {
                heatmap.dataSource = [
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                ];
                heatmap.heatMapResize(event);
                heatmap.renderingMode = 'Canvas';
                heatmap.heatMapResize(event);
                heatmap.allowSelection = true;
                heatmap.legendSettings.visible = true;
                heatmap.dataBind();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 240, 240, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 240, 240));
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 225, 225, true);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 300, 300));
                expect((heatmap.multiCellCollection.length == 0) || (heatmap.multiCellCollection.length == 3));
                heatmap.heatMapResize(event);
                heatmap.clearSelection();
            });
            it('Multi Cell Selection in Canvas', function () {
                heatmap.dataSource = [
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                ];
                heatmap.renderingMode = 'Canvas';
                heatmap.allowSelection = true;
                heatmap.legendSettings.visible = true;
                heatmap.dataBind();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 200, 200, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 200, 200));
                trigger.mousemoveEvent(element, 0, 0, 300, 300, false);
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 300, 300));
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 300, 300));
                expect((heatmap.multiCellCollection.length == 3) || (heatmap.multiCellCollection.length == 5));
                heatmap.clearSelection();
            });
            it('Multi Cell Selection in Canvas', function () {
                heatmap.dataSource = [
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                ];
                heatmap.renderingMode = 'Canvas';
                heatmap.allowSelection = true;
                heatmap.legendSettings.visible = true;
                heatmap.dataBind();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 100, 100));
                trigger.mousemoveEvent(element, 0, 0, 200, 200, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 200, 200));
                expect(heatmap.selectedCellsRect.x == 52 && heatmap.selectedCellsRect.width == 258.2);
                heatmap.clearSelection();
            });
            it('Multi Cell Selection in Canvas with paging element', function () {
                heatmap.height = '500px';
                heatmap.width = '1000px';
                heatmap.paletteSettings.type = 'Fixed';
                heatmap.legendSettings.visible = true;
                heatmap.legendSettings.height = "30%";
                heatmap.paletteSettings.palette = [
                    { color: '#309DAE' },
                    { color: '#2B8C9B' },
                    { color: '#257A87' },
                    { color: '#206974' },
                    { color: '#1B5761' },
                    { color: '#15464D' },
                    { color: '#000000' }
                ];
                heatmap.refresh();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 150, 150));
                trigger.mousemoveEvent(element, 0, 0, 250, 250, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 250, 250));
                trigger.clickEvent(element, 0, 0, 985, 312);
                expect(heatmap.selectedCellsRect.x == 52 && heatmap.selectedCellsRect.width == 258.2);
                heatmap.clearSelection();
            });
            it('Multi Cell Selection in Canvas with paging element in horizontal direction', function () {
                heatmap.legendSettings.position = "Bottom";
                heatmap.legendSettings.width = "110px";
                heatmap.legendSettings.height = "";
                heatmap.refresh();
                var element = document.getElementById("container_canvas");
                heatmap.heatMapMouseMove(trigger.onTouchStart(element, null, null, null, null, 150, 150));
                trigger.mousemoveEvent(element, 0, 0, 250, 250, false);
                heatmap.heatMapMouseLeave(trigger.onTouchEnd(element, null, null, null, null, 250, 250));
                trigger.clickEvent(element, 0, 0, 570, 485);
                expect(heatmap.selectedCellsRect.x == 52 && heatmap.selectedCellsRect.width == 258.2);
                heatmap.clearSelection();
            });
            it('Check title tool tip', function (done) {
                heatmap.legendSettings.position = "Right";
                heatmap.legendSettings.width = "";
                heatmap.height = '';
                heatmap.width = '';
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.renderingMode = "Canvas";
                heatmap.legendSettings.visible = false;
                heatmap.titleSettings.text = "A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.A heat map is a graphical representation of data where the values contained in a matrix are represented as colors.";
                heatmap.titleSettings.textStyle.textOverflow = "Trim";
                heatmap.yAxis.title.text = "yAxis";
                heatmap.refresh();
                var element = document.getElementById("container_canvas");
                trigger.mousemoveEvent(element, 0, 0, 28, 57, false);
                element = document.getElementById("container_canvas_Tooltip");
                expect(element == null).toBe(true);
                done();
            });
            it('Check axis label tool tip', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.renderingMode = "SVG";
                heatmap.titleSettings.text = "";
                heatmap.titleSettings.textStyle.textOverflow = "Trim";
                heatmap.yAxis.title.text = "yAxis";
                heatmap.xAxis.labels = ["This my new testing for heat map axis labels This my new testing for heat map axis labels", "testing1", "testing2"];
                heatmap.xAxis.textStyle.textOverflow = "Trim";
                heatmap.refresh();
                var element = document.getElementById("container_XAxis_Label0");
                var region = element.getBoundingClientRect();
                trigger.mousemoveEvent(element, 0, 0, region.left + 5, region.top + 5, false);
                element = document.getElementById("container_axis_Tooltip");
                expect(element.textContent == "This my new testing for heat map axis labels This my new testing for heat map axis labels").toBe(true);
                done();
            });
            it('check with empty data source', function (done) {
                heatmap.dataSource = [];
                heatmap.titleSettings.text = "";
                heatmap.yAxis.title.text = "yAxis";
                heatmap.xAxis.labels = ["testing", "testing1", "testing2"];
                heatmap.xAxis.textStyle.textOverflow = "Trim";
                heatmap.paletteSettings.palette = [];
                heatmap.paletteSettings.type = "Gradient";
                heatmap.legendSettings.visible = true;
                heatmap.refresh();
                expect(heatmap.dataSourceMinValue == 0).toBe(true);
                done();
            });
            it('check getPersistData returns value', function () {
                var returnString = heatmap.getPersistData();
                expect(returnString).toBe("");
                heatmap.paletteSettings.type = "Gradient";
                heatmap.dataBind();
                expect(heatmap.dataSourceMinValue == 0).toBe(true);
            });
            it('check heatmap resize action', function (done) {
                heatmap.heatMapResize(event);
                expect(heatmap.dataSourceMinValue == 0).toBe(true);
                setTimeout(done, 1600);
            });
            it('check heatmap resize action', function (done) {
                heatmap.heatMapResize(event);
                heatmap.isDestroyed = true;
                expect(heatmap.dataSourceMinValue == 0).toBe(true);
                setTimeout(done, 1600);
            });
            it('check heatmap resize action', function (done) {
                heatmap.heatMapResize(event);
                heatmap.heatMapResize(event);
                expect(heatmap.dataSourceMinValue == 0).toBe(true);
                setTimeout(done, 1600);
            });
            it('check heatmap resize action', function (done) {
                heatmap.heatMapResize(event);
                expect(heatmap.dataSourceMinValue == 0).toBe(true);
                setTimeout(done, 1600);
            });
            it('Check legend tooltip visibility', function (done) {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.paletteSettings.type = 'Fixed';
                heatmap.legendSettings.enableSmartLegend = true;
                heatmap.legendSettings.labelDisplayType = 'None';
                heatmap.dataBind();
                var element = document.getElementById("container_Smart_Legend1");
                var region = element.getBoundingClientRect();
                trigger.mousemoveEvent(element, 5, 5, region.left + 5, region.top + 5, false);
                heatmap.heatMapMouseLeave(trigger.onTouchStart(element, null, null, null, null, 0, 0));
                var tooltip = document.getElementById('containerlegendLabelTooltipContainer');
                setTimeout(done, 1600);
                expect(tooltip.style.visibility).toBe("visible");
            });
            it('Check heat map with minimum height and width', function () {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.height = "50px";
                heatmap.width = "50px";
                heatmap.paletteSettings.type = 'Gradient';
                heatmap.legendSettings.visible = true;
                heatmap.legendSettings.position = "Right";
                heatmap.dataBind();
                expect((heatmap.initialClipRect.height === 4 || heatmap.initialClipRect.height === 5) && (heatmap.initialClipRect.width === -62 || heatmap.initialClipRect.width === -61)).toBe(true);
            });
            it('Check heat map with minimum height and width', function () {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.height = "50px";
                heatmap.width = "50px";
                heatmap.paletteSettings.type = 'Gradient';
                heatmap.legendSettings.height = '';
                heatmap.legendSettings.visible = true;
                heatmap.legendSettings.position = "Bottom";
                heatmap.titleSettings.text = "";
                heatmap.dataBind();
                expect((heatmap.initialClipRect.height === -54 || heatmap.initialClipRect.height === -52) && (heatmap.initialClipRect.width === -12 || heatmap.initialClipRect.width === -11)).toBe(true);
            });
            it('Check heat map with minimum height and width', function () {
                heatmap.dataSource = [
                    [1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9],
                ];
                heatmap.height = "20px";
                heatmap.width = "20px";
                heatmap.paletteSettings.type = 'Gradient';
                heatmap.legendSettings.visible = true;
                heatmap.legendSettings.position = "Right";
                heatmap.titleSettings.text = "Testing";
                heatmap.theme = "Bootstrap4";
                heatmap.dataBind();
                expect((heatmap.initialClipRect.height === -62 || heatmap.initialClipRect.height === -58) && (heatmap.initialClipRect.width === -92 || heatmap.initialClipRect.width === -91)).toBe(true);
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
