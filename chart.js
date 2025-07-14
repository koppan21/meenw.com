// Line chart: evolución temporal (mW) simulada
const lineChart = new Chart(document.getElementById('lineChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: ['00s', '10s', '20s', '30s', '40s', '50s', '60s'],
    datasets: [{
      label: 'Consumo (mW)',
      data: [3100, 3200, 3300, 3500, 3450, 3400, 3250],
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        title: { display: true, text: 'mW' }
      }
    }
  }
});

// Bar chart: comparativa entre páginas
const barChart = new Chart(document.getElementById('barChart').getContext('2d'), {
  type: 'bar',
  data: {
    labels: ['Wikipedia', 'YouTube', 'Twitter', 'GitHub'],
    datasets: [{
      label: 'Consumo medio (mW)',
      data: [3100, 4300, 3900, 3450],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(139, 92, 246, 0.6)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'mW' }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});
