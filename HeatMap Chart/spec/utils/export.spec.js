define(["require", "exports", "../../src/heatmap/heatmap", "@syncfusion/ej2-base", "../../src/heatmap/index", "../../src/heatmap/index", "../../src/heatmap/index", "../../spec/common.spec", "@syncfusion/ej2-pdf-export"], function (require, exports, heatmap_1, ej2_base_1, index_1, index_2, index_3, common_spec_1, ej2_pdf_export_1) {
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
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                window.open = function () {
                    return {
                        document: { write: function () { }, close: function () { } },
                        close: function () { }, print: function () { }, focus: function () { }, moveTo: function () { }, resizeTo: function () { }
                    };
                };
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<div id='templateWrap' style='background-color:#4472c4;border-radius: 3px;'>" +
                    "<img src='../base/spec/img/img1.jpg' style='border-radius: 0px;width: 24px;height: 24px;padding: 2px;' />" +
                    "<div style='color:white;float: right;padding: 2px;line-height: 20px; text-align: center; font-family:Roboto; font-style: medium; fontp-size:14px;'><span>Print</span></div></div>";
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
                heatmap.appendTo('#container');
            });
            afterAll(function () {
                heatmap.destroy();
                ele.remove();
                ej2_base_1.remove(document.getElementById('template'));
            });
            it('export support - Canvas mode', function (done) {
                heatmap.renderingMode = 'Canvas';
                heatmap.export('JPEG', 'jpeg');
                heatmap.export('PDF', 'pdf');
                heatmap.export('PNG', 'png');
                heatmap.export('PDF', 'pdf', ej2_pdf_export_1.PdfPageOrientation.Portrait);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Export support- SVG mode', function (done) {
                heatmap.renderingMode = 'SVG';
                heatmap.export('JPEG', 'jpeg');
                heatmap.export('PDF', 'pdf');
                heatmap.export('PNG', 'png');
                heatmap.export('SVG', 'svg');
                heatmap.export('JPEG', 'jpeg', ej2_pdf_export_1.PdfPageOrientation.Portrait);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Export support for IE browser', function (done) {
                ej2_base_1.Browser.info.name = 'msie';
                ej2_base_1.Browser.info.version = '11.914.17763.0';
                heatmap.refresh();
                heatmap.export('PDF', 'pdf');
                heatmap.renderingMode = 'Canvas';
                heatmap.refresh();
                heatmap.export('PDF', 'pdf');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
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
