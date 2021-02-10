
let N = 1000  //日本の人口
let R0 = 3.2; //gammmaの期間に一人から感染する人
let gammma = 0.1; //かかる期間
let duration = 200;

function run() {
  const beta = R0 * gammma / N;

  let data = { labels: [], S: [], I: [], R: [] };

  let S = N; // まだ感染していない人
  let I = 1; // 感染している人
  let R = 0; // 回復した人 + 死んだ人

  for (let t = 0; t < duration; t++) {
    S = S - beta * S * I;
    I = I + beta * S * I - gammma * I;
    R = R + gammma * I;
    const Rt = beta * S / gammma;//感染力
    data.labels.push(t);
    data.S.push(S);
    data.I.push(I);
    data.R.push(R);
  }
  return data;
}

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
      scales: {                          // 軸設定
        xAxes: [{
          scaleLabel: {                 // 軸ラベル
            display: true,                // 表示設定
            labelString: '時間[t]',    // ラベル
            fontColor: "black",             // 文字の色
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

function update() {
  if (chart) {
    chart.destroy();
  }
  drawChart();
}

document.getElementById('btn').onclick = function () {
  update();
}

drawChart();
$('#R0-val').text("R0=" + R0);
$('#gamma-val').text("gamma=" + gammma);
$('#duration-val').text("duration=" + duration);


$('#R0').on('input', () => {
  R0 = $('#R0').val();
  $('#R0-val').text("R0=" + R0);
  update();
});

$('#gamma').on('input', () => {
  gammma = $('#gamma').val();
  $('#gamma-val').text("gamma=" + gammma);
  update();
});

$('#duration').on('input', () => {
  duration = $('#duration').val();
  $('#duration-val').text("duration=" + duration);
  update();
});
