// --------------------------------------------------------------------
// Tela 1
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const clientName = document.getElementById('clientName');
  const clientCep = document.getElementById('clientCep');
  const btnNext1 = document.getElementById('btnNext1');
  const btnBack2 = document.getElementById('btnBack1');

  if (btnBack1) {
    btnBack1.disabled = false;
    btnBack1.addEventListener('click', () => {
      window.location.href = "index.html";
    });
  }

  function validateInputs() {
    if (clientName.value.trim() !== '' && clientCep.value.trim() !== '') {
      btnNext1.disabled = false;
    } else {
      btnNext1.disabled = true;
    }
  }

  clientName.addEventListener('input', validateInputs);
  clientCep.addEventListener('input', validateInputs);

  btnNext1.addEventListener('click', () => {
    const name = clientName.value.trim();
    const cep = clientCep.value.trim();

    if (!name || !cep) return;

    console.log('Nome do cliente:', name);
    console.log('CEP do cliente:', cep);

  });
});


// -------------------------------------------------------------------- 
// Tela 2
// ------------------------------------------------------------------ 
document.addEventListener('DOMContentLoaded', () => {
  const occasionCards = document.querySelectorAll('#occasionSelection .card-interactive');
  const btnNext2 = document.getElementById('btnNext2');
  const btnBack2 = document.getElementById('btnBack2');

  let selectedOccasion = null;
  if (btnBack2) {
    btnBack2.disabled = false;
  }

  occasionCards.forEach(card => {
    card.addEventListener('click', () => {
      occasionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedOccasion = card.getAttribute('data-occasion');
      btnNext2.disabled = false;
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  btnNext2.addEventListener('click', () => {
    if (!selectedOccasion) return;
    console.log('Ocasião selecionada:', selectedOccasion);
  });

  const btnBack3 = document.getElementById('btnBack3');
  if (btnBack3) {
    btnBack3.disabled = false;
  }
});


// --------------------------------------------------------------------
// Tela 3
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const meatTypes = document.querySelectorAll('#meatTypeSelection .card-interactive');
  const chatBubble3 = document.getElementById('chatBubble3');
  const btnNext3 = document.getElementById('btnNext3');

  btnNext3.disabled = true;

  function clearSelection(container) {
    container.querySelectorAll('.card-interactive.selected').forEach(card => {
      card.classList.remove('selected');
    });
  }

  meatTypes.forEach(card => {
    card.addEventListener('click', () => {
      clearSelection(document.getElementById('meatTypeSelection'));
      card.classList.add('selected');
      const meat = card.getAttribute('data-meat');

      if (meat === 'outro') {
        const userInput = prompt('Por favor, digite a sua preferência de tipo de carne:');
        if (userInput && userInput.trim().length > 0) {
          chatBubble3.textContent = `Obrigado! Você escolheu: "${userInput.trim()}". Vamos considerar essa opção para você.`;
          btnNext3.disabled = false;
        } else {
          chatBubble3.textContent = 'Você não digitou nada. Por favor, selecione uma opção acima.';
          card.classList.remove('selected');
          btnNext3.disabled = true;
        }
        return;
      }

      chatBubble3.textContent = `Ótima escolha!! Você selecionou carne ${card.textContent.trim().toLowerCase()}. Clique em continuar para prosseguir.`;
      btnNext3.disabled = false;
    });
  });
});


// --------------------------------------------------------------------
// Tela 4
// ------------------------------------------------------------------
let selectedCut = null;

const chatBubble4 = document.getElementById('chatBubble4');
const cutCards = document.querySelectorAll('#cutSelection .card-interactive');
const btnNext4 = document.getElementById('btnNext4');
const btnBack4 = document.getElementById('btnBack4');

btnNext4.disabled = true;

// Função para destacar card
function highlightCard(selectedCard) {
  cutCards.forEach(card => {
    if (card === selectedCard) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });
}

function handleCardSelect(card) {
  const cut = card.dataset.item;
  if (!cut) return;

  selectedCut = cut;

  if (cut === 'outro') {
    const userInput = prompt('Por favor, digite a sua preferência de corte:');
    if (userInput && userInput.trim().length > 0) {
      chatBubble4.textContent = `Obrigado! Você escolheu: "${userInput.trim()}". Vamos considerar essa opção para você.`;
      highlightCard(card);
      btnNext4.disabled = false;
    } else {
      chatBubble4.textContent = 'Você não digitou nada. Por favor, selecione uma opção acima.';
      card.classList.remove('selected');
      btnNext4.disabled = true;
    }
    return;
  }

  chatBubble4.textContent = cutDetails[cut] || 'Opção selecionada.';
  highlightCard(card);
  btnNext4.disabled = false;
}

cutCards.forEach(card => {
  card.addEventListener('click', () => handleCardSelect(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardSelect(card);
    }
  });
});

btnBack4.addEventListener('click', () => {
  chatBubble4.textContent = 'Ótima escolha!! E você já tem alguma preferência de corte?';

  if (selectedCut) {
    const previouslySelected = [...cutCards].find(card => card.dataset.item === selectedCut);
    if (previouslySelected) {
      highlightCard(previouslySelected);
      chatBubble4.textContent = cutDetails[selectedCut] || 'Opção selecionada.';
      btnNext4.disabled = false;
      return;
    }
  }

  cutCards.forEach(card => card.classList.remove('selected'));
  btnNext4.disabled = true;
});

const cutDetails = {
  'file_peito': 'Você escolheu filé de peito! Ideal para grelhados e pratos leves.',
  'coxa_sobrecoxa': 'Coxa e sobrecoxa são cortes versáteis e saborosos, ótimas para assados e frituras.',
  'frango_cubos': 'Frango em cubos são perfeitos para stir-fries, espetinhos e comidas rápidas.',
  'tulipa': 'Tulipas são populares para festas e churrascos.',
  'outro': 'Entendi, você quer outro tipo de corte. Por favor, descreva sua preferência abaixo.',
};


// --------------------------------------------------------------------
// Tela 5
// ------------------------------------------------------------------