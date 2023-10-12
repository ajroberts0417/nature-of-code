const EC50 = 50; // Half maximal effective concentration
const Max = 1; // Maximum response
const n = 1; // Hill coefficient

const dataPoints = [];
for (let dose = 0; dose <= 100; dose++) {
  let response = sigmoidResponse(dose, EC50, Max, n);
  dataPoints.push({ x: dose, y: response });
}

function sigmoidResponse(dose, EC50, Max, n) {
  return Max / (1 + Math.pow(EC50 / dose, n));
}

const ctx = document.getElementById('sigmoidDoseResponseChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Dose-Response Curve',
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
          text: 'Dose'
        },
        min: 0,
        max: 100,
      },
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'Response'
        },
        min: 0,
        max: 1,
      },
    },
  },
});
