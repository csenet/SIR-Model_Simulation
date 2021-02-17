let chart;

function drawChart() {
  const sampleData = run();
  var canvas = document.getElementById('stage');// グラフ化するデータ系列のサンプル
  chart = new Chart(canvas, {
    type: 'line',  //グラフの種類
    data: {
      labels: sampleData.labels,
      datasets: [{
        label: 'S',
        data: sampleData.S,
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)',
        fill: false
      }, {
        label: 'I',
        data: sampleData.I,
        borderColor: 'rgb(0, 255, 0)',
        backgroundColor: 'rgb(255, 255, 255)',
        fill: false,
      },
      {
        label: 'R',
        data: sampleData.R,
        borderColor: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(255, 255, 255)',
        fill: false
      },
      {
        label: 'N',
        data: sampleData.N,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)',
        fill: false
      }]
    },  //表示するデータ
    options: {
      plugins: {
        colorschemes: {
          scheme: 'brewer.Paired12'
        }
      },
      animation: false,
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {                            // 軸設定
        xAxes: [{
          scaleLabel: {                   // 軸ラベル
            display: true,                 // 表示設定
            labelString: '時間[t]',        // ラベル
            fontColor: "black",           // 文字の色
            fontSize: 16                  // フォントサイズ
          },
          ticks: {
            callback: function (value) { return ((value % 10) == 0) ? value : '' },
            min: 0,
            max: duration,
            stepSize: 1
          }
        }],
        yAxes: [                           // Ｙ軸設定
          {
            scaleLabel: {                  // 軸ラベル
              display: true,                 // 表示の有無
              labelString: '人数[人]',     // ラベル
              fontFamily: "sans-serif",
              fontColor: "black",             // 文字の色
              fontFamily: "sans-serif",
              fontSize: 16                   // フォントサイズ
            },
            ticks: {
              stepSize: 100
            }
          }
        ]
      }
    }
  });
}