define(["require", "exports", "../../src/heatmap/index", "../../src/heatmap/index", "../../src/heatmap/index", "./dataSource"], function (require, exports, index_1, index_2, index_3, dataSource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.HeatMap.Inject(index_3.Tooltip, index_2.Legend, index_1.Adaptor);
var jsonCellData = [
 
 
  [73],
  [93]
 
];
var heatmap = new index_1.HeatMap({
  titleSettings: {
    text: "Most Visited Destinations by International Tourist Arrivals",
    textStyle: {
      size: "15px",
      fontWeight: "800",
      fontFamily: "Times New Roman"
    }
  },
  xAxis: {
    labels: [
      "Austria",
      "China",
     
     
    ],
    title: {
      text: "X Axis Title",
      textStyle: {
        size: "15px",
        fontFamily: "Times New Roman",
        fontWeight: "800"
      }
    },
    textStyle: {
      size: "15px",
      fontFamily: "Times New Roman",
      fontWeight: "800"
    }
  },
  yAxis: {
    labels: ["2010"],
    title: {
      text: "Y Axis Title",
      textStyle: {
        size: "15px",
        fontFamily: "Times New Roman",
        fontWeight: "800"
      }
    },
    textStyle: {
      size: "15px",
      fontFamily: "Times New Roman",
      fontWeight: "800"
    }
  },
  dataSource: jsonCellData,
  
  cellSettings: {
    textStyle: {
      size: "15px",
      fontFamily: "Times New Roman",
      fontWeight: "800"
    },
    border: {
      radius: 4,
      width: 1,
      color: "white"
    },
    showLabel: true,
    format: "{value} M"
  },

  paletteSettings: {
    palette: [
      { color: "#DCD57E" },
      { color: "#A6DC7E" },
      { color: "#7EDCA2" },
      { color: "#6EB5D0" }
    ]
  },
  created:created
  // legendSettings: {
  //   textStyle: {
  //     size: "15px",
  //     fontFamily: "Times New Roman",
  //     fontWeight: "800"
  //   }
  // }
});
heatmap.appendTo("#container");
function created(){
  console.log("created");
}
});
