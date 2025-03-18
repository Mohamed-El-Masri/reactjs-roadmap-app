// React Learning Progress Tracker - Pomodoro Timer Module

document.addEventListener('DOMContentLoaded', function() {
    setupPomodoroTimer();
});

// Pomodoro timer variables
let pomodoroState = 'stopped'; // stopped, focus, break
let pomodoroTimer = null;
let pomodoroMinutes = 25;
let pomodoroSeconds = 0;
let pomodoroInterval = null;
let pomodoroCompletedSessions = 0;

// Setup Pomodoro Timer
function setupPomodoroTimer() {
    // Create pomodoro timer UI
    const pomodoroContainer = createPomodoroUI();
    document.body.appendChild(pomodoroContainer);
    
    // Add pomodoro button to navbar
    addPomodoroNavButton();
    
    // Setup event listeners
    setupPomodoroEvents();
    
    // Load saved settings
    loadPomodoroSettings();
}

// Create Pomodoro UI
function createPomodoroUI() {
    const pomodoroContainer = document.createElement('div');
    pomodoroContainer.id = 'pomodoroContainer';
    pomodoroContainer.className = 'pomodoro-container';
    pomodoroContainer.innerHTML = `
        <div class="pomodoro-panel">
            <div class="pomodoro-header">
                <h4>
                    <i class="fas fa-clock me-2"></i>
                    <span id="pomodoroTitle">مؤقت بومودورو</span>
                </h4>
                <div class="pomodoro-controls">
                    <button class="btn btn-sm btn-outline-secondary" id="pomodoroSettingsBtn">
                        <i class="fas fa-cog"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-1" id="pomodoroCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="pomodoro-body">
                <div class="pomodoro-timer">
                    <div id="pomodoroTime">25:00</div>
                    <div class="pomodoro-status" id="pomodoroStatus">جاهز للبدء</div>
                </div>
                <div class="pomodoro-actions mt-3">
                    <button class="btn btn-primary" id="pomodoroStartBtn">
                        <i class="fas fa-play me-1"></i> ابدأ
                    </button>
                    <button class="btn btn-warning d-none" id="pomodoroPauseBtn">
                        <i class="fas fa-pause me-1"></i> توقف مؤقت
                    </button>
                    <button class="btn btn-success d-none" id="pomodoroResumeBtn">
                        <i class="fas fa-play me-1"></i> استكمال
                    </button>
                    <button class="btn btn-danger d-none" id="pomodoroStopBtn">
                        <i class="fas fa-stop me-1"></i> إنهاء
                    </button>
                    <button class="btn btn-secondary" id="pomodoroSkipBtn">
                        <i class="fas fa-step-forward me-1"></i> تخطي
                    </button>
                </div>
                <div class="pomodoro-stats mt-3">
                    <span class="badge bg-success me-2" id="pomodoroSessionCount">0 جلسة</span>
                    <span class="text-muted">تركيز: <span id="pomodoroFocusTime">25</span> دقيقة | راحة: <span id="pomodoroBreakTime">5</span> دقيقة</span>
                </div>
            </div>
        </div>
        
        <!-- Pomodoro Settings Modal -->
        <div class="modal fade" id="pomodoroSettingsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-cog me-2"></i>إعدادات البومودورو</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="focusTimeInput" class="form-label">وقت التركيز (بالدقائق)</label>
                            <input type="number" class="form-control" id="focusTimeInput" min="1" max="60" value="25">
                        </div>
                        <div class="mb-3">
                            <label for="breakTimeInput" class="form-label">وقت الراحة (بالدقائق)</label>
                            <input type="number" class="form-control" id="breakTimeInput" min="1" max="30" value="5">
                        </div>
                        <div class="mb-3">
                            <label for="longBreakTimeInput" class="form-label">وقت الراحة الطويلة (بالدقائق)</label>
                            <input type="number" class="form-control" id="longBreakTimeInput" min="5" max="60" value="15">
                        </div>
                        <div class="mb-3">
                            <label for="sessionCountInput" class="form-label">عدد الجلسات قبل الراحة الطويلة</label>
                            <input type="number" class="form-control" id="sessionCountInput" min="1" max="10" value="4">
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="autoStartBreaks" checked>
                            <label class="form-check-label" for="autoStartBreaks">
                                البدء تلقائيًا في فترات الراحة
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="autoStartPomodoros" checked>
                            <label class="form-check-label" for="autoStartPomodoros">
                                البدء تلقائيًا في جلسات التركيز
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="showNotifications" checked>
                            <label class="form-check-label" for="showNotifications">
                                عرض إشعارات
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="playAlarmSound" checked>
                            <label class="form-check-label" for="playAlarmSound">
                                تشغيل صوت التنبيه
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-primary" id="savePomodoroSettingsBtn">حفظ</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .pomodoro-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            width: 320px;
            display: none;
        }
        
        .pomodoro-panel {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        
        .pomodoro-header {
            background-color: #282c34;
            color: white;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .pomodoro-header h4 {
            margin: 0;
            font-size: 1.1rem;
        }
        
        .pomodoro-body {
            padding: 20px;
            text-align: center;
        }
        
        .pomodoro-timer #pomodoroTime {
            font-size: 3rem;
            font-weight: 700;
            color: #282c34;
            line-height: 1;
            margin-bottom: 10px;
        }
        
        .pomodoro-status {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 15px;
        }
        
        .pomodoro-actions {
            display: flex;
            justify-content: center;
            gap: 10px;
        }
        
        .pomodoro-stats {
            font-size: 0.85rem;
        }
        
        .show-pomodoro {
            display: block;
        }
        
        /* Custom color for focus mode */
        .pomodoro-focus #pomodoroTime {
            color: #198754; /* green */
        }
        
        /* Custom color for break mode */
        .pomodoro-break #pomodoroTime {
            color: #0d6efd; /* blue */
        }
    `;
    document.head.appendChild(style);
    
    return pomodoroContainer;
}

// Add Pomodoro button to navigation
function addPomodoroNavButton() {
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    if (!navbarNav) return;
    
    const pomodoroButton = document.createElement('li');
    pomodoroButton.className = 'nav-item';
    pomodoroButton.innerHTML = `
        <a class="nav-link" href="#" id="pomodoroNavBtn">
            <i class="fas fa-clock"></i> بومودورو
        </a>
    `;
    navbarNav.appendChild(pomodoroButton);
    
    // Add click event
    document.getElementById('pomodoroNavBtn').addEventListener('click', function(e) {
        e.preventDefault();
        togglePomodoroPanel();
    });
}

// Setup Pomodoro Events
function setupPomodoroEvents() {
    // Toggle visibility
    document.getElementById('pomodoroCloseBtn').addEventListener('click', () => {
        document.getElementById('pomodoroContainer').classList.remove('show-pomodoro');
    });
    
    // Start timer
    document.getElementById('pomodoroStartBtn').addEventListener('click', startPomodoroTimer);
    
    // Pause timer
    document.getElementById('pomodoroPauseBtn').addEventListener('click', pausePomodoroTimer);
    
    // Resume timer
    document.getElementById('pomodoroResumeBtn').addEventListener('click', resumePomodoroTimer);
    
    // Stop timer
    document.getElementById('pomodoroStopBtn').addEventListener('click', stopPomodoroTimer);
    
    // Skip current session
    document.getElementById('pomodoroSkipBtn').addEventListener('click', skipPomodoroSession);
    
    // Settings button
    document.getElementById('pomodoroSettingsBtn').addEventListener('click', () => {
        const pomodoroSettingsModal = new bootstrap.Modal(document.getElementById('pomodoroSettingsModal'));
        pomodoroSettingsModal.show();
    });
    
    // Save settings
    document.getElementById('savePomodoroSettingsBtn').addEventListener('click', () => {
        savePomodoroSettings();
        bootstrap.Modal.getInstance(document.getElementById('pomodoroSettingsModal')).hide();
    });
}

// Toggle Pomodoro Panel
function togglePomodoroPanel() {
    const pomodoroContainer = document.getElementById('pomodoroContainer');
    pomodoroContainer.classList.toggle('show-pomodoro');
}

// Start Pomodoro Timer
function startPomodoroTimer() {
    // Set up the pomodoro state
    pomodoroState = 'focus';
    pomodoroMinutes = parseInt(document.getElementById('pomodoroFocusTime').textContent);
    pomodoroSeconds = 0;
    
    // Update UI
    updatePomodoroUI();
    const pomodoroPanel = document.querySelector('.pomodoro-panel');
    pomodoroPanel.className = 'pomodoro-panel pomodoro-focus';
    
    // Update buttons
    document.getElementById('pomodoroStartBtn').classList.add('d-none');
    document.getElementById('pomodoroPauseBtn').classList.remove('d-none');
    document.getElementById('pomodoroStopBtn').classList.remove('d-none');
    
    // Start the interval
    pomodoroInterval = setInterval(updatePomodoroTimer, 1000);
    
    // Show notification
    showPomodoroNotification('بدأت جلسة التركيز', 'وقت للتركيز على مهمتك!');
}

// Update Pomodoro Timer (called every second)
function updatePomodoroTimer() {
    // Decrease time
    if (pomodoroSeconds === 0) {
        if (pomodoroMinutes === 0) {
            // Timer completed
            clearInterval(pomodoroInterval);
            pomodoroCompleted();
            return;
        }
        pomodoroMinutes--;
        pomodoroSeconds = 59;
    } else {
        pomodoroSeconds--;
    }
    
    // Update UI
    updatePomodoroUI();
}

// Update Pomodoro UI
function updatePomodoroUI() {
    const timeDisplay = document.getElementById('pomodoroTime');
    const statusDisplay = document.getElementById('pomodoroStatus');
    
    // Format time
    const formattedMinutes = pomodoroMinutes < 10 ? '0' + pomodoroMinutes : pomodoroMinutes;
    const formattedSeconds = pomodoroSeconds < 10 ? '0' + pomodoroSeconds : pomodoroSeconds;
    timeDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    
    // Update status text
    if (pomodoroState === 'focus') {
        statusDisplay.textContent = 'وقت التركيز';
    } else if (pomodoroState === 'break') {
        statusDisplay.textContent = 'وقت الراحة';
    } else if (pomodoroState === 'longBreak') {
        statusDisplay.textContent = 'وقت الراحة الطويلة';
    } else {
        statusDisplay.textContent = 'جاهز للبدء';
    }
}

// Pause Pomodoro Timer
function pausePomodoroTimer() {
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }
    
    // Update buttons
    document.getElementById('pomodoroPauseBtn').classList.add('d-none');
    document.getElementById('pomodoroResumeBtn').classList.remove('d-none');
    
    // Update status
    document.getElementById('pomodoroStatus').textContent = 'تم إيقاف المؤقت مؤقتًا';
}

// Resume Pomodoro Timer
function resumePomodoroTimer() {
    // Resume interval
    pomodoroInterval = setInterval(updatePomodoroTimer, 1000);
    
    // Update buttons
    document.getElementById('pomodoroResumeBtn').classList.add('d-none');
    document.getElementById('pomodoroPauseBtn').classList.remove('d-none');
    
    // Update status
    if (pomodoroState === 'focus') {
        document.getElementById('pomodoroStatus').textContent = 'وقت التركيز';
    } else {
        document.getElementById('pomodoroStatus').textContent = 'وقت الراحة';
    }
}

// Stop Pomodoro Timer
function stopPomodoroTimer() {
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }
    
    // Reset state
    pomodoroState = 'stopped';
    
    // Update UI
    const pomodoroPanel = document.querySelector('.pomodoro-panel');
    pomodoroPanel.className = 'pomodoro-panel';
    
    // Reset timer display
    pomodoroMinutes = parseInt(document.getElementById('pomodoroFocusTime').textContent);
    pomodoroSeconds = 0;
    updatePomodoroUI();
    
    // Update buttons
    document.getElementById('pomodoroStartBtn').classList.remove('d-none');
    document.getElementById('pomodoroPauseBtn').classList.add('d-none');
    document.getElementById('pomodoroResumeBtn').classList.add('d-none');
    document.getElementById('pomodoroStopBtn').classList.add('d-none');
    
    // Update status
    document.getElementById('pomodoroStatus').textContent = 'جاهز للبدء';
}

// Skip current session
function skipPomodoroSession() {
    // Clear current interval if running
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }
    
    // If we're in focus mode, switch to break
    if (pomodoroState === 'focus') {
        pomodoroCompleted();
    } 
    // If we're in break mode, switch to focus
    else if (pomodoroState === 'break' || pomodoroState === 'longBreak') {
        startNextPomodoro();
    } 
    // If we're stopped, just start a focus session
    else {
        startPomodoroTimer();
    }
}

// Pomodoro session completed
function pomodoroCompleted() {
    // Play sound if enabled
    if (document.getElementById('playAlarmSound').checked) {
        playAlarmSound();
    }
    
    // If completing a focus session
    if (pomodoroState === 'focus') {
        // Increment completed sessions
        pomodoroCompletedSessions++;
        
        // Update session counter
        document.getElementById('pomodoroSessionCount').textContent = `${pomodoroCompletedSessions} جلسة`;
        
        // Log activity
        if (window.logActivity) {
            window.logActivity('أكمل جلسة بومودورو');
        }
        
        // Check if we need a long break
        const sessionsBeforeLongBreak = parseInt(document.getElementById('sessionCountInput').value) || 4;
        
        if (pomodoroCompletedSessions % sessionsBeforeLongBreak === 0) {
            startLongBreak();
        } else {
            startBreak();
        }
    } 
    // If completing a break
    else if (pomodoroState === 'break' || pomodoroState === 'longBreak') {
        startNextPomodoro();
    }
}

// Start a break session
function startBreak() {
    // Show notification
    showPomodoroNotification('انتهى وقت التركيز', 'حان وقت استراحة قصيرة!');
    
    // Set up break state
    pomodoroState = 'break';
    pomodoroMinutes = parseInt(document.getElementById('pomodoroBreakTime').textContent);
    pomodoroSeconds = 0;
    
    // Update UI
    updatePomodoroUI();
    const pomodoroPanel = document.querySelector('.pomodoro-panel');
    pomodoroPanel.className = 'pomodoro-panel pomodoro-break';
    
    // Start the interval if auto-start is enabled
    if (document.getElementById('autoStartBreaks').checked) {
        pomodoroInterval = setInterval(updatePomodoroTimer, 1000);
    } else {
        // Show start button
        document.getElementById('pomodoroStartBtn').classList.remove('d-none');
        document.getElementById('pomodoroPauseBtn').classList.add('d-none');
        document.getElementById('pomodoroStopBtn').classList.remove('d-none');
    }
}

// Start a long break
function startLongBreak() {
    // Show notification
    showPomodoroNotification('جلسات متعددة مكتملة', 'حان وقت استراحة طويلة!');
    
    // Set up long break state
    pomodoroState = 'longBreak';
    pomodoroMinutes = parseInt(document.getElementById('longBreakTimeInput').value) || 15;
    pomodoroSeconds = 0;
    
    // Update UI
    updatePomodoroUI();
    const pomodoroPanel = document.querySelector('.pomodoro-panel');
    pomodoroPanel.className = 'pomodoro-panel pomodoro-break';
    
    // Start the interval if auto-start is enabled
    if (document.getElementById('autoStartBreaks').checked) {
        pomodoroInterval = setInterval(updatePomodoroTimer, 1000);
    } else {
        // Show start button
        document.getElementById('pomodoroStartBtn').classList.remove('d-none');
        document.getElementById('pomodoroPauseBtn').classList.add('d-none');
        document.getElementById('pomodoroStopBtn').classList.remove('d-none');
    }
}

// Start next pomodoro session
function startNextPomodoro() {
    // Show notification
    showPomodoroNotification('انتهت الراحة', 'حان الوقت للعودة إلى العمل!');
    
    // Set up focus state
    pomodoroState = 'focus';
    pomodoroMinutes = parseInt(document.getElementById('pomodoroFocusTime').textContent);
    pomodoroSeconds = 0;
    
    // Update UI
    updatePomodoroUI();
    const pomodoroPanel = document.querySelector('.pomodoro-panel');
    pomodoroPanel.className = 'pomodoro-panel pomodoro-focus';
    
    // Start the interval if auto-start is enabled
    if (document.getElementById('autoStartPomodoros').checked) {
        pomodoroInterval = setInterval(updatePomodoroTimer, 1000);
    } else {
        // Show start button
        document.getElementById('pomodoroStartBtn').classList.remove('d-none');
        document.getElementById('pomodoroPauseBtn').classList.add('d-none');
        document.getElementById('pomodoroStopBtn').classList.remove('d-none');
    }
}

// Play alarm sound
function playAlarmSound() {
    const audio = new Audio('assets/sounds/alarm.mp3');
    audio.play();
}

// Show browser notification
function showPomodoroNotification(title, message) {
    // Check if notifications are enabled in settings
    if (!document.getElementById('showNotifications').checked) return;
    
    // Show in-app notification
    if (window.showAchievementNotification) {
        window.showAchievementNotification(title, message);
    }
    
    // Show browser notification if supported and allowed
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

// Load saved Pomodoro settings
function loadPomodoroSettings() {
    const settings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {};
    
    // Load focus time
    if (settings.focusTime) {
        document.getElementById('pomodoroFocusTime').textContent = settings.focusTime;
        document.getElementById('focusTimeInput').value = settings.focusTime;
    }
    
    // Load break time
    if (settings.breakTime) {
        document.getElementById('pomodoroBreakTime').textContent = settings.breakTime;
        document.getElementById('breakTimeInput').value = settings.breakTime;
    }
    
    // Load long break time
    if (settings.longBreakTime) {
        document.getElementById('longBreakTimeInput').value = settings.longBreakTime;
    }
    
    // Load sessions before long break
    if (settings.sessionsBeforeLongBreak) {
        document.getElementById('sessionCountInput').value = settings.sessionsBeforeLongBreak;
    }
    
    // Load auto-start preferences
    if (settings.hasOwnProperty('autoStartBreaks')) {
        document.getElementById('autoStartBreaks').checked = settings.autoStartBreaks;
    }
    
    if (settings.hasOwnProperty('autoStartPomodoros')) {
        document.getElementById('autoStartPomodoros').checked = settings.autoStartPomodoros;
    }
    
    // Load notification preference
    if (settings.hasOwnProperty('showNotifications')) {
        document.getElementById('showNotifications').checked = settings.showNotifications;
        
        // Request permission for notifications if enabled
        if (settings.showNotifications && "Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }
    
    // Load sound preference
    if (settings.hasOwnProperty('playAlarmSound')) {
        document.getElementById('playAlarmSound').checked = settings.playAlarmSound;
    }
    
    // Load completed sessions count
    if (settings.completedSessions) {
        pomodoroCompletedSessions = settings.completedSessions;
        document.getElementById('pomodoroSessionCount').textContent = `${pomodoroCompletedSessions} جلسة`;
    }
}

// Save Pomodoro settings
function savePomodoroSettings() {
    // Get all settings from form
    const settings = {
        focusTime: parseInt(document.getElementById('focusTimeInput').value),
        breakTime: parseInt(document.getElementById('breakTimeInput').value),
        longBreakTime: parseInt(document.getElementById('longBreakTimeInput').value),
        sessionsBeforeLongBreak: parseInt(document.getElementById('sessionCountInput').value),
        autoStartBreaks: document.getElementById('autoStartBreaks').checked,
        autoStartPomodoros: document.getElementById('autoStartPomodoros').checked,
        showNotifications: document.getElementById('showNotifications').checked,
        playAlarmSound: document.getElementById('playAlarmSound').checked,
        completedSessions: pomodoroCompletedSessions,
        lastUpdated: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    
    // Update displayed times
    document.getElementById('pomodoroFocusTime').textContent = settings.focusTime;
    document.getElementById('pomodoroBreakTime').textContent = settings.breakTime;
    
    // If timer is stopped, update the display time too
    if (pomodoroState === 'stopped') {
        pomodoroMinutes = settings.focusTime;
        pomodoroSeconds = 0;
        updatePomodoroUI();
    }
    
    // Request notification permission if needed
    if (settings.showNotifications && "Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
    
    // Show confirmation
    window.showAchievementNotification('تم حفظ الإعدادات', 'تم تحديث إعدادات تقنية بومودورو');
    
    // Log activity
    if (window.logActivity) {
        window.logActivity('قام بتحديث إعدادات بومودورو');
    }
}

// Reset Pomodoro statistics
function resetPomodoroStats() {
    pomodoroCompletedSessions = 0;
    document.getElementById('pomodoroSessionCount').textContent = '0 جلسة';
    
    // Update in settings
    const settings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {};
    settings.completedSessions = 0;
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    
    // Show confirmation
    window.showAchievementNotification('تم إعادة الضبط', 'تم إعادة ضبط إحصائيات بومودورو');
}

// Use Pomodoro Timer to track study sessions
function trackStudySessionWithPomodoro(minutes) {
    // Convert minutes to hours
    const hours = minutes / 60;
    
    // Log study activity
    if (window.logActivity) {
        window.logActivity(`أكمل جلسة دراسة باستخدام بومودورو (${hours.toFixed(1)} ساعة)`);
    }
    
    // Update study hours
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    userProgress.studyHours = (userProgress.studyHours || 0) + hours;
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    // Update stats display
    if (document.getElementById('studyHours')) {
        document.getElementById('studyHours').textContent = userProgress.studyHours.toFixed(1);
    }
    
    // Check daily goal
    if (window.checkDailyGoal) {
        window.checkDailyGoal();
    }
}

// Add a Reset Stats button to Pomodoro settings
document.addEventListener('DOMContentLoaded', function() {
    const modalFooter = document.querySelector('#pomodoroSettingsModal .modal-footer');
    if (modalFooter) {
        const resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.className = 'btn btn-outline-danger me-auto';
        resetButton.innerHTML = '<i class="fas fa-trash-alt me-1"></i> إعادة ضبط الإحصائيات';
        resetButton.addEventListener('click', resetPomodoroStats);
        
        // Insert at the beginning of the modal footer
        modalFooter.insertBefore(resetButton, modalFooter.firstChild);
    }
});

// Expose functions
window.setupPomodoroTimer = setupPomodoroTimer;
window.togglePomodoroPanel = togglePomodoroPanel;
window.savePomodoroSettings = savePomodoroSettings;
window.resetPomodoroStats = resetPomodoroStats;