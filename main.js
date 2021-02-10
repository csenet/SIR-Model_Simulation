

const N = 1000  //日本の人口
const R0 = 3.2; //gammmaの期間に一人から感染する人
const gammma = 0.1; //かかる期間
const beta = R0 * gammma/N;

let sampleData = {labels:[],S:[],I:[],R:[]};

let S = N; // まだ感染していない人
let I = 1; // 感染している人
let R = 0; // 回復した人 + 死んだ人

for(let t=0;t<200;t++){
  S = S - beta * S * I;
  I = I + beta * S * I - gammma * I;
  R = R + gammma * I;
  const Rt = beta * S / gammma;//感染力
  sampleData.labels.push(t);
  sampleData.S.push(S);
  sampleData.I.push(I);
  sampleData.R.push(R);
}

console.log(sampleData);

var canvas = document.getElementById('stage');// グラフ化するデータ系列のサンプル

var chart = new Chart(canvas, {
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
      fill:false
    }]
  },  //表示するデータ
  options: {
    plugins: {
        colorschemes: {
            scheme: 'brewer.Paired12'
        }
    },
    animation:false,
    elements: {
      point:{
      radius: 0
      }
    },
    scales: {                          // 軸設定
      xAxes: [                           // Ｘ軸設定
          {
              scaleLabel: {                 // 軸ラベル
                  display: true,                // 表示設定
                  labelString: '時間[t]',    // ラベル
                  fontColor: "black",             // 文字の色
                  fontSize: 16                  // フォントサイズ
              }
          }
      ],
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
                stepSize:100
              }
          }
      ]
  }
}
});
