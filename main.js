
let N = 1000  //人工
let beta = 0.1 / N;//感染率
let gammma = 0.05; //回復率
let duration = 1000;

function run() {
  // オイラー法
  let data = { labels: [], S: [], I: [], R: [] };

  let S = N; // 未感染者(Susceptibles)
  let I = 1; // 感染者(Infectious)
  let R = 0; // 回復者(Removed)

  data.S.push(S);
  data.I.push(I);
  data.R.push(R);
  //alert(gammma / beta);
  let isTop = false;
  let dS_temp;
  for (let t = 0; t < duration; t++) {
    const dS = - beta * S * I;
    const dI = beta * S * I - gammma * I;
    S += dS;
    I += dI;
    if (data.I[t] < data.I[t - 1] && !isTop) {
      data.top = S;
      data.realTop = gammma / beta;
      isTop = true;
    }
    R = Math.abs(N - (S + I));
    const R0 = N * beta / gammma; //基本再生産数
    data.labels.push(t);
    data.S.push(S);
    data.I.push(I);
    data.R.push(R);
  }
  console.log(data);
  return data;
}

let chart;

function drawChart() {
  const sampleData = run();
  $('#output').text((sampleData.top).toFixed(2) + "/" + (sampleData.realTop).toFixed(2));
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
drawChart();

$('#beta-val').text("beta=" + (beta * N).toFixed(2));
$('#gamma-val').text("gamma=" + gammma.toFixed(2));
$('#duration-val').text("duration=" + duration.toFixed(2));


$('#beta').on('input', () => {
  beta = $('#beta').val() / N;
  $('#beta-val').text("beta=" + (beta * N).toFixed(2));
  update();
});

$('#gamma').on('input', () => {
  gammma = Number($('#gamma').val());
  $('#gamma-val').text("gamma=" + gammma.toFixed(2));
  update();
});

$('#duration').on('input', () => {
  duration = Number($('#duration').val());
  $('#duration-val').text("duration=" + duration.toFixed(2));
  update();
});
