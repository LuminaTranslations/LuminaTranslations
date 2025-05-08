document.getElementById('toggle-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

const novels = [
    {
        title: "Moonlit Devotion",
        views: 1200,
        synopsis: "A witch and a werewolf bound by fate and ancient prophecies.",
        image: "https://via.placeholder.com/300x400",
        chapters: [
            { title: "Chapter 1: Awakening", locked: false },
            { title: "Chapter 2: The Pact", locked: true },
            { title: "Chapter 3: Blood Moon", locked: true }
        ]
    },
    {
        title: "Crimson Destiny",
        views: 850,
        synopsis: "A hunter falls for the creature he's sworn to destroy.",
        image: "https://via.placeholder.com/300x400",
        chapters: [
            { title: "Chapter 1: Encounter", locked: false },
            { title: "Chapter 2: Temptation", locked: true }
        ]
    }
];

const grid = document.getElementById('novel-grid');

novels.forEach(novel => {
    const card = document.createElement('div');
    card.className = 'novel-card';
    card.innerHTML = `
        <img src="${novel.image}" alt="${novel.title}">
        <h2>${novel.title}</h2>
        <p><strong>Views:</strong> ${novel.views}</p>
        <p>${novel.synopsis}</p>
        <div>
            <h4>Chapters</h4>
            ${novel.chapters.map(ch => `
                <div class="chapter ${ch.locked ? 'locked' : ''}" onclick="${ch.locked ? 'showPopup()' : ''}">
                    <span>${ch.title}</span>
                    ${ch.locked ? '<span class="lock-icon">🔒</span>' : ''}
                </div>
            `).join('')}
        </div>
    `;
    grid.appendChild(card);
});

function showPopup() {
    document.getElementById('popup').classList.remove('hidden');
}

document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
});

// Show login/register modal
document.querySelector('nav a[href="#Login"]').addEventListener('click', () => {
    showForm('login');
    document.getElementById('auth-modal').classList.remove('hidden');
});

document.querySelector('nav a[href="#Register"]').addEventListener('click', () => {
    showForm('register');
    document.getElementById('auth-modal').classList.remove('hidden');
});

document.getElementById('close-auth').addEventListener('click', () => {
    document.getElementById('auth-modal').classList.add('hidden');
});

function showForm(type) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById(type + '-form').classList.remove('hidden');
}

// Login with backend
document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('https://lumina-backend.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Logged in successfully as ' + data.username);
            document.getElementById('auth-modal').classList.add('hidden');
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (err) {
        alert('Error connecting to server');
    }
});

// Register with backend
document.getElementById('register-form').addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const res = await fetch('https://lumina-backend.onrender.com/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Registered successfully');
            document.getElementById('auth-modal').classList.add('hidden');
        } else {
            alert(data.error || 'Registration failed');
        }
    } catch (err) {
        alert('Error connecting to server');
    }
});
