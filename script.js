document.addEventListener('DOMContentLoaded', () => {

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.querySelector('svg:first-child').classList.toggle('hidden');
    mobileMenuButton.querySelector('svg:last-child').classList.add('hidden');
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href').length > 1) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
          });
          if (mobileMenu.classList.contains('hidden') === false) {
              mobileMenu.classList.add('hidden');
              mobileMenuButton.querySelector('svg:first-child').classList.remove('hidden');
              mobileMenuButton.querySelector('svg:last-child').classList.add('hidden');
          }
      }
    });
  });

  const sections = document.querySelectorAll('section');
  const options = {
    root: null,
    threshold: 0.3,
    rootMargin: "-80px 0px 0px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });


  const lineChartCtx = document.getElementById('lineChart').getContext('2d');
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

  const barChartCtx = document.getElementById('barChart').getContext('2d');
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

  const generateSummaryButton = document.getElementById('generate-summary-button');
  const summaryModal = document.getElementById('summary-modal');
  const closeButton = document.querySelector('.close-button');
  const summaryContent = document.getElementById('summary-content');

  generateSummaryButton.addEventListener('click', async () => {
    summaryModal.style.display = 'flex';
    summaryContent.innerHTML = '<div class="loader"></div><p class="text-center mt-4">Generando resumen...</p>';

    const mainConclusions = document.getElementById('main-conclusions').innerText;
    const studyLimitations = document.getElementById('study-limitations').innerText;
    const futureResearch = document.getElementById('future-research').innerText;

    const prompt = `Dado el siguiente texto de las conclusiones, limitaciones y futuras líneas de un Trabajo de Fin de Grado sobre el impacto de las Zonas de Bajas Emisiones en la calidad del aire de Madrid, genera un resumen extendido de los puntos clave y las implicaciones principales. Enfócate en los hallazgos más importantes, las limitaciones del estudio y las recomendaciones para futuras investigaciones. El resumen debe ser conciso pero informativo y estar en español.

    Conclusiones Principales: ${mainConclusions}
    Limitaciones del Estudio: ${studyLimitations}
    Futuras Líneas de Investigación: ${futureResearch}`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        summaryContent.innerHTML = `<p>${text}</p>`;
      } else {
        summaryContent.innerHTML = '<p class="text-red-500">Error al generar el resumen. Inténtalo de nuevo más tarde.</p>';
      }
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      summaryContent.innerHTML = '<p class="text-red-500">Error de conexión. Asegúrate de estar en línea y vuelve a intentarlo.</p>';
    }
  });

  closeButton.addEventListener('click', () => {
    summaryModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === summaryModal) {
      summaryModal.style.display = 'none';
    }
  });
});