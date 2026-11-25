// 1. Navigation Tabs Switch Karne Ka Logic
function openSection(sectionId, clickedBtn) {
    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(sec => sec.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');
    if (clickedBtn) clickedBtn.classList.add('active');
}

// 2. Family Members Tabs Switch Karne Ka Logic
function openFamilyMember(memberId, clickedBtn) {
    const members = document.querySelectorAll('.fam-member-card');
    members.forEach(m => m.classList.remove('active-fam'));

    const famBtns = document.querySelectorAll('.fam-tab-btn');
    famBtns.forEach(b => b.classList.remove('active'));

    document.getElementById(memberId).classList.add('active-fam');
    clickedBtn.classList.add('active');
}

// 3. Dark / Light Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeBtn.textContent = '☀️ Light Mode';
    } else {
        themeBtn.textContent = '🌙 Dark Mode';
    }
});

// 4. Live Clock & Greeting
function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').textContent = now.toLocaleTimeString();
    
    const hour = now.getHours();
    let greet = "Welcome to Aditya's World!";
    if (hour < 12) greet = "Good Morning, Aditya! ☀️";
    else if (hour < 18) greet = "Good Afternoon, Aditya! 🌤️";
    else greet = "Good Evening, Aditya! 🌙";
    
    document.getElementById('greeting').textContent = greet;
}
setInterval(updateClock, 1000);
updateClock();

// 5. To-Do List (LocalStorage)
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('adityaTasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleTask(${index})" style="cursor:pointer;">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    localStorage.setItem('adityaTasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    renderTasks();
}

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

renderTasks();

// 6. Focus Timer (25 Minutes)
let timeLeft = 25 * 60;
let timerInterval = null;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up! 25 minute focus complete hua! 🎉");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = 25 * 60;
    updateTimerDisplay();
}