const chatBubble = document.getElementById('chatBubble');
const cards = document.querySelectorAll('.card-custom.card-interactive');
const btnBack = document.getElementById('btnBack');

const cutDetails = {
    'file_peito': 'Você escolheu filé de peito! Ideal para grelhados e pratos leves.',
    'coxa_sobrecoxa': 'Coxa e sobrecoxa são cortes versáteis e saborosos, ótimas para assados e frituras.',
    'frango_cubos': 'Frango em cubos são perfeitos para stir-fries, espetinhos e comidas rápidas.',
    'tulipa': 'Tulipas são populares para festas e churrascos.',
    'outro': 'Entendi, você quer outro tipo de corte. Por favor, descreva sua preferência abaixo.',
};

let selectionMade = false;

btnBack.addEventListener('click', () => {
    chatBubble.textContent = 'Ótima escolha!! E você já tem alguma preferência de corte?';
    selectionMade = false;
    cards.forEach(card => card.classList.remove('selected'));
});

function highlightCard(selectedCard) {
    cards.forEach(card => {
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
    if (cut === 'outro') {
        const userInput = prompt('Por favor, digite a sua preferência de corte:');
        if (userInput && userInput.trim().length > 0) {
            chatBubble.textContent = `Obrigado! Você escolheu: "${userInput.trim()}". Vamos considerar essa opção para você.`;
        } else {
            chatBubble.textContent = 'Você não digitou nada. Por favor, selecione uma opção acima.';
        }
        highlightCard(card);
        selectionMade = true;
        return;
    }
    chatBubble.textContent = cutDetails[cut] || 'Opção selecionada.';
    highlightCard(card);
    selectionMade = true;
}

cards.forEach(card => {
    card.addEventListener('click', () => handleCardSelect(card));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardSelect(card);
        }
    });
});