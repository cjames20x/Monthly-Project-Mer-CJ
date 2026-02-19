// ── LOVEMAIL ENVELOPE ──
const lovemailBtn = document.getElementById('lovemail-btn');
const lovemailOverlay = document.getElementById('lovemail-overlay');
const closeLovemail = document.getElementById('close-lovemail');

lovemailBtn.addEventListener('click', () => {
    lovemailOverlay.style.display = 'flex';
});
closeLovemail.addEventListener('click', () => {
    lovemailOverlay.style.display = 'none';
});
lovemailOverlay.addEventListener('click', (e) => {
    if (e.target === lovemailOverlay) lovemailOverlay.style.display = 'none';
});

// ── FLOATING HEARTS BACKGROUND ──
const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['❤️','💕','💗','💖','💝','🌹','✨'];

for (let i = 0; i < 20; i++) {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDuration = (6 + Math.random() * 8) + 's';
    h.style.animationDelay = (Math.random() * 4) + 's';
    h.style.fontSize = (14 + Math.random() * 16) + 'px';
    heartsBg.appendChild(h);
}

// ── GIFT DATA ──
const gifts = [
    {
        id: 'flower',
        emoji: '🌹',
        name: 'A Bouquet of Roses',
        message: (name) => `For ${name}, these roses bloom as beautifully as you do. Each petal carries a wish — that your days are always filled with warmth, color, and love.`,
        letter: (name) => `My dearest ${name},\n\nRoses are red, and so is my heart whenever I think of you. You have a way of making even ordinary moments feel extraordinary. These roses are a small token of how much you mean to me.\n\nForever yours.`
    },
    {
        id: 'letter',
        emoji: '💌',
        name: 'A Love Letter',
        message: (name) => `To ${name}, from the heart. Words have always fallen short when it comes to describing you — but these ones come close. Unfold this letter and feel every word.`,
        letter: (name) => `Dearest ${name},\n\nIf love were a song, you would be every single note. I find myself thinking of you in the quiet in-between moments — when the sun sets, when a familiar song plays, when everything is still.\n\nYou are my favorite kind of beautiful.\n\nAlways yours.`
    },
    {
        id: 'teddy',
        emoji: '🧸',
        name: 'A Teddy Bear',
        message: (name) => `For ${name} — when you can't have a real hug, let this little bear stand in. It's soft, warm, and carries every bit of love meant just for you.`,
        letter: (name) => `To ${name},\n\nI hope this teddy bear finds you on a day when you need a little extra warmth. Hold it close and know that somewhere, someone is thinking of you and wishing you nothing but happiness.\n\nWith all my heart.`
    },
    {
        id: 'chocolates',
        emoji: '🍫',
        name: 'Box of Chocolates',
        message: (name) => `For ${name} — life is sweeter with you in it. This box of chocolates is no substitute for your smile, but it's the next best thing!`,
        letter: (name) => `Dear ${name},\n\nThey say life is like a box of chocolates — but you make every single flavor sweeter. You bring joy wherever you go, and I am so lucky to know someone as wonderful as you.\n\nSweetly yours.`
    },
    {
        id: 'ring',
        emoji: '💍',
        name: 'A Promise Ring',
        message: (name) => `For ${name} — a circle with no beginning and no end, just like this love. A promise to always be there, through every season.`,
        letter: (name) => `To my dearest ${name},\n\nThis ring is more than jewelry — it's a promise. A promise to choose you, to show up for you, and to love you in all the ways you deserve to be loved.\n\nForever and always.`
    }
];

// ── STATE ──
let userName = '';
let selectedGift = null;
let currentGift = null;

// ── SCREEN MANAGER ──
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── SCREEN 1: NAME ──
document.getElementById('nameNextBtn').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) { document.getElementById('nameInput').focus(); return; }
    userName = name;
    document.getElementById('greetName').textContent = userName;
    showScreen('screen-choice');
});

document.getElementById('nameInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('nameNextBtn').click();
});

// ── SCREEN 2: CHOICE ──
document.getElementById('choiceReceive').addEventListener('click', () => {
    document.getElementById('receiveNameLabel').textContent = userName;
    revealRandomGift();
    showScreen('screen-receive');
});

document.getElementById('choiceSend').addEventListener('click', () => {
    buildGiftsGrid();
    showScreen('screen-send');
});

// ── SCREEN 3: RECEIVE ──
function revealRandomGift() {
    const gift = gifts[Math.floor(Math.random() * gifts.length)];
    currentGift = gift;
    document.getElementById('giftEmoji').textContent = gift.emoji;
    document.getElementById('giftName').textContent = gift.name;
    document.getElementById('giftMessage').textContent = gift.message(userName);
    burstConfetti();
}

function burstConfetti() {
    const burst = document.getElementById('confettiBurst');
    burst.innerHTML = '';
    const items = ['❤️','💕','✨','🌸','💖','⭐'];
    for (let i = 0; i < 15; i++) {
        const s = document.createElement('span');
        s.textContent = items[Math.floor(Math.random() * items.length)];
        s.style.cssText = `
            position: absolute;
            font-size: ${12 + Math.random() * 16}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: fadeIn 0.5s ease forwards;
            opacity: 0;
            animation-delay: ${Math.random() * 0.5}s;
            pointer-events: none;
        `;
        burst.appendChild(s);
    }
}

document.getElementById('anotherGiftBtn').addEventListener('click', revealRandomGift);

document.getElementById('receiveBack').addEventListener('click', () => showScreen('screen-choice'));

document.getElementById('openLetterBtn').addEventListener('click', () => {
    if (!currentGift) return;
    document.getElementById('letterText').textContent = currentGift.letter(userName);
    document.getElementById('letterOverlay').classList.add('open');
});

// ── SCREEN 4: SEND ──
function buildGiftsGrid() {
    const grid = document.getElementById('giftsGrid');
    grid.innerHTML = '';
    gifts.forEach(gift => {
        const card = document.createElement('div');
        card.className = 'gift-select-card';
        card.dataset.id = gift.id;
        card.innerHTML = `
            <div class="selected-badge">✓</div>
            <span class="g-emoji">${gift.emoji}</span>
            <div class="g-name">${gift.name}</div>
        `;
        card.addEventListener('click', () => {
            document.querySelectorAll('.gift-select-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedGift = gift;
        });
        grid.appendChild(card);
    });
}

document.getElementById('sendBack').addEventListener('click', () => showScreen('screen-choice'));

document.getElementById('sendGiftBtn').addEventListener('click', () => {
    const recipient = document.getElementById('recipientName').value.trim();
    const note = document.getElementById('personalNote').value.trim();
    if (!selectedGift) { alert('Please select a gift! 🎁'); return; }
    if (!recipient) { document.getElementById('recipientName').focus(); return; }

    document.getElementById('sentGiftName').textContent = selectedGift.name;
    document.getElementById('sentToName').textContent = recipient;
    document.getElementById('sentGiftEmoji').textContent = selectedGift.emoji;
    document.getElementById('sentPreviewMsg').textContent = note || selectedGift.message(recipient);
    showScreen('screen-sent');
});

// ── SCREEN 5: SENT ──
document.getElementById('sendAnotherBtn').addEventListener('click', () => {
    selectedGift = null;
    document.getElementById('recipientName').value = '';
    document.getElementById('personalNote').value = '';
    buildGiftsGrid();
    showScreen('screen-send');
});

document.getElementById('goHomeBtn').addEventListener('click', () => {
    userName = '';
    selectedGift = null;
    currentGift = null;
    document.getElementById('nameInput').value = '';
    showScreen('screen-name');
});

// ── LETTER OVERLAY ──
document.getElementById('letterClose').addEventListener('click', () => {
    document.getElementById('letterOverlay').classList.remove('open');
});

document.getElementById('letterOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('letterOverlay')) {
        document.getElementById('letterOverlay').classList.remove('open');
    }
});