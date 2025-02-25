const salaryRanges = [
    { range: [0, 16242], count: 673039 },
    { range: [16242.1, 18680], count: 720191 },
    { range: [18680.1, 19490], count: 259529 },
    { range: [19490.1, 20300], count: 254222 },
    { range: [20300.1, 21110], count: 255413 },
    { range: [21110.1, 23550], count: 725823 },
    { range: [23550.1, 24360], count: 254900 },
    { range: [24360.1, 25990], count: 634661 },
    { range: [25990.1, 27610], count: 577021 },
    { range: [27610.1, 29240], count: 643096 },
    { range: [29240.1, 30860], count: 633291 },
    { range: [30860.1, 32480], count: 641786 },
    { range: [32480.1, 34110], count: 649324 },
    { range: [34110.1, 35730], count: 679999 },
    { range: [35730.1, 37360], count: 678836 },
    { range: [37360.1, 38980], count: 646968 },
    { range: [38980.1, 40600], count: 677212 },
    { range: [40600.1, 42200], count: 655792 },
    { range: [42200.1, 43900], count: 656894 },
    { range: [43900.1, 45500], count: 638698 },
    { range: [45500.1, 47100], count: 619888 },
    { range: [47100.1, 48700], count: 574890 },
    { range: [48700.1, 55000], count: 2126931 },
    { range: [55000.1, 75000], count: 4938366 },
    { range: [75000.1, 100000], count: 3414301 },
    { range: [100000.1, 200000], count: 3779433 },
    { range: [200000.1, 400000], count: 887636 },
    { range: [400000.1, 1000000], count: 185304 },
    { range: [1000000.1, 2000000], count: 17455 },
    { range: [2000000.1, 3000000], count: 3251 },
    { range: [3000000.1, Infinity], count: 3694 },
];

function calculatePercentile() {
    const salaryInput = document.getElementById("salaryInput");
    const rawValue = salaryInput.value.replace(/\s/g, '');
    const salary = parseFloat(rawValue);

    if (!salary || salary <= 0) {
        document.getElementById("resultText").textContent = "Введите корректную зарплату!";
        document.getElementById("progress").style.width = '0%';
        document.getElementById("emojiContainer").innerHTML = '';

        // Добавляем анимацию shake и подсвечиваем поле ввода
        salaryInput.classList.add("error", "shake");
        setTimeout(() => {
            salaryInput.classList.remove("shake");
        }, 300);
        return;
    }

    let totalPeople = 0;
    let peopleBelow = 0;

    salaryRanges.forEach(range => {
        totalPeople += range.count;
        if (salary > range.range[1]) {
            peopleBelow += range.count;
        } else if (salary >= range.range[0] && salary <= range.range[1]) {
            peopleBelow += (range.count * (salary - range.range[0])) / (range.range[1] - range.range[0]);
        }
    });

    const percentile = (peopleBelow / totalPeople) * 100;
    const progressWidth = Math.min(percentile, 100);

    let emoji = '';
    if (percentile > 90) {
        emoji = '💎';
    } else if (percentile > 75) {
        emoji = '🔥';
    } else if (percentile > 50) {
        emoji = '🌟';
    } else if (percentile > 25) {
        emoji = '💼';
    } else {
        emoji = '👶';
    }

    document.getElementById("resultText").textContent = `Вы зарабатываете больше чем ${percentile.toFixed(2)}% жителей России.`;
    document.getElementById("progress").style.width = `${progressWidth}%`;

    // Применяем анимацию bounce для эмодзи
    const emojiContainer = document.getElementById("emojiContainer");
    emojiContainer.innerHTML = emoji;
    emojiContainer.classList.remove("bounce-animation");
    void emojiContainer.offsetWidth; // Перезапуск анимации
    emojiContainer.classList.add("bounce-animation");
}

function formatInput() {
    const input = document.getElementById('salaryInput');
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    input.value = value;
}
function handleEnter(event) {
    if (event.key === "Enter") calculatePercentile();
}

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById("themeToggle").innerHTML = isDark ?
        '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

function createRipple(event) {
    const btn = event.currentTarget;
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - btn.offsetLeft}px`;
    ripple.style.top = `${event.clientY - btn.offsetTop}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById("themeToggle").innerHTML = savedTheme === 'dark' ?
    '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', createRipple);
});