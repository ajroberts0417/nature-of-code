const N0 = 100;
const K = 8000000000;
const r = 1;
const years = 37;

const dataPoints = [];
for (let t = 0; t <= years; t++) {
  let Nt = logisticGrowth(t, N0, K, r);
  dataPoints.push({x: t + 2023, y: Nt});
}

function logisticGrowth(t, N0, K, r) {
  return K / (1 + ((K - N0) / N0) * Math.exp(-r * t));
}

const ctx = document.getElementById('logisticGrowthChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: '"Golden Age" Expansion, Limited by 8 Billion People (2023-2043)',
      data: dataPoints,
      borderColor: 'rgba(255, 0, 0, 1)',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      fill: true,
      pointRadius: 0,
      tension: 0.1,
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'Years'
        },
        min: 2023,
        max: 2060,
        ticks: {
          stepSize: 5,
        },
      },
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'Golden Age Population (Billions)'
        },
        ticks: {
          callback: (value) => value / 1000000000 + 'B',
        },
      },
    },
  },
});