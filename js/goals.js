// React Learning Progress Tracker - Goals Module

document.addEventListener('DOMContentLoaded', function() {
    setupGoalsSystem();
    checkDailyGoal();
    
    // Set up daily check for goals
    setDailyGoalChecker();
});

// Set up goals system
function setupGoalsSystem() {
    // Create goals modal HTML
    const goalsModalHTML = `
        <div class="modal fade" id="goalsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title"><i class="fas fa-bullseye me-2"></i>أهدافك اليومية</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="goalsForm">
                            <div class="mb-3">
                                <label for="studyHoursGoal" class="form-label">هدف ساعات الدراسة اليومية</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="studyHoursGoal" min="0.5" max="24" step="0.5" value="2">
                                    <span class="input-group-text">ساعة</span>
                                </div>
                                <div class="form-text">حدد عدد الساعات التي تريد دراستها يوميًا</div>
                            </div>
                            <div class="mb-3">
                                <label for="skillsGoal" class="form-label">هدف المهارات الأسبوعية</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="skillsGoal" min="1" max="20" step="1" value="3">
                                    <span class="input-group-text">مهارة</span>
                                </div>
                                <div class="form-text">حدد عدد المهارات التي تريد إتقانها أسبوعيًا</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">أيام الدراسة</label>
                                <div class="study-days">
                                    <div class="btn-group w-100" role="group">
                                        <input type="checkbox" class="btn-check" id="daySat" autocomplete="off" checked>
                                        <label class="btn btn-outline-primary" for="daySat">السبت</label>
                                        
                                        <input type="checkbox" class="btn-check" id="daySun" autocomplete="off" checked>
                                        <label class="btn btn-outline-primary" for="daySun">الأحد</label>
                                        
                                        <input type="checkbox" class="btn-check" id="dayMon" autocomplete="off" checked>
                                        <label class="btn btn-outline-primary" for="dayMon">الاثنين</label>
                                        
                                        <input type="checkbox" class="btn-check" id="dayTue" autocomplete="off" checked>
                                        <label class="btn btn-outline-primary" for="dayTue">الثلاثاء</label>
                                        
                                        <input type="checkbox" class="btn-check" id="dayWed" autocomplete="off" checked>
                                        <label class="btn btn-outline-primary" for="dayWed">الأربعاء</label>
                                        
                                        <input type="checkbox" class="btn-check" id="dayThu" autocomplete="off" checked>
                                        <label class="btn btn-outline-primary" for="dayThu">الخميس</label>
                                        
                                        <input type="checkbox" class="btn-check" id="dayFri" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="dayFri">الجمعة</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">تذكير يومي</label>
                                <div class="input-group">
                                    <input type="time" class="form-control" id="reminderTime" value="18:00">
                                    <span class="input-group-text"><i class="fas fa-bell"></i></span>
                                </div>
                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="checkbox" id="enableReminders" checked>
                                    <label class="form-check-label" for="enableReminders">
                                        تفعيل التذكير بالدراسة
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-primary" id="saveGoalsBtn">حفظ الأهداف</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', goalsModalHTML);
    
    // Add goals button to navbar
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    const goalsButton = document.createElement('li');
    goalsButton.className = 'nav-item';
    goalsButton.innerHTML = '<a class="nav-link" href="#" id="goalsBtn"><i class="fas fa-bullseye"></i> أهدافي</a>';
    navbarNav.appendChild(goalsButton);
    
    // Show goals modal when button is clicked
    document.getElementById('goalsBtn').addEventListener('click', function(e) {
        e.preventDefault();
        loadGoalsToForm();
        const goalsModal = new bootstrap.Modal(document.getElementById('goalsModal'));
        goalsModal.show();
    });
    
    // Save goals when save button is clicked
    document.getElementById('saveGoalsBtn').addEventListener('click', function() {
        saveGoals();
        bootstrap.Modal.getInstance(document.getElementById('goalsModal')).hide();
    });
    
    // Add goals stats to overview
    addGoalsStatsToOverview();
}

// Load goals from storage to form
function loadGoalsToForm() {
    const goals = JSON.parse(localStorage.getItem('reactLearningGoals')) || {
        studyHoursGoal: 2,
        skillsGoal: 3,
        studyDays: ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'],
        reminderTime: '18:00',
        enableReminders: true
    };
    
    document.getElementById('studyHoursGoal').value = goals.studyHoursGoal;
    document.getElementById('skillsGoal').value = goals.skillsGoal;
    
    // Set study days
    ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'].forEach(day => {
        document.getElementById(`day${day.charAt(0).toUpperCase() + day.slice(1)}`).checked = 
            goals.studyDays.includes(day);
    });
    
    document.getElementById('reminderTime').value = goals.reminderTime;
    document.getElementById('enableReminders').checked = goals.enableReminders;
}

// Save goals to storage
function saveGoals() {
    const studyDays = [];
    ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'].forEach(day => {
        if (document.getElementById(`day${day.charAt(0).toUpperCase() + day.slice(1)}`).checked) {
            studyDays.push(day);
        }
    });
    
    const goals = {
        studyHoursGoal: parseFloat(document.getElementById('studyHoursGoal').value),
        skillsGoal: parseInt(document.getElementById('skillsGoal').value),
        studyDays: studyDays,
        reminderTime: document.getElementById('reminderTime').value,
        enableReminders: document.getElementById('enableReminders').checked,
        lastReminderDate: new Date().toISOString().split('T')[0] // Today's date
    };
    
    localStorage.setItem('reactLearningGoals', JSON.stringify(goals));
    
    // Update UI
    updateGoalsUI();
    
    // Log activity
    if (window.logActivity) {
        window.logActivity('تم تحديث الأهداف اليومية');
    }
    
    // Show notification
    showGoalsNotification();
}

// Add goals stats to overview section
function addGoalsStatsToOverview() {
    const statsSection = document.querySelector('.stats-card').parentNode.parentNode;
    
    const goalsStatsHtml = `
        <div class="col-md-12 mt-4">
            <div class="card daily-goals-card">
                <div class="card-body">
                    <h5 class="card-title"><i class="fas fa-calendar-check me-2 text-primary"></i>أهداف اليوم</h5>
                    <div class="row g-3 mt-2">
                        <div class="col-md-4">
                            <div class="goal-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span>ساعات الدراسة</span>
                                    <span id="todayStudyHours">0 / 2</span>
                                </div>
                                <div class="progress mt-2">
                                    <div class="progress-bar" id="studyHoursProgress" role="progressbar" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="goal-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span>مهارات هذا الأسبوع</span>
                                    <span id="weeklySkills">0 / 3</span>
                                </div>
                                <div class="progress mt-2">
                                    <div class="progress-bar" id="skillsProgress" role="progressbar" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="goal-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span>أيام متتالية</span>
                                    <span id="streakDays">0 يوم</span>
                                </div>
                                <div class="streak-icons text-warning mt-2" id="streakIcons">
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    statsSection.insertAdjacentHTML('beforeend', goalsStatsHtml);
    
    updateGoalsUI();
}

// Update goals UI with current progress
function updateGoalsUI() {
    const goals = JSON.parse(localStorage.getItem('reactLearningGoals')) || {
        studyHoursGoal: 2,
        skillsGoal: 3
    };
    
    const progress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {
        studyHours: 0
    };
    
    // Get today's study hours
    const todayHours = getTodayStudyHours();
    const todayStudyHoursEl = document.getElementById('todayStudyHours');
    const studyHoursProgressEl = document.getElementById('studyHoursProgress');
    
    if (todayStudyHoursEl && studyHoursProgressEl) {
        todayStudyHoursEl.textContent = `${todayHours.toFixed(1)} / ${goals.studyHoursGoal}`;
        
        const studyProgress = Math.min((todayHours / goals.studyHoursGoal) * 100, 100);
        studyHoursProgressEl.style.width = `${studyProgress}%`;
        
        if (studyProgress >= 100) {
            studyHoursProgressEl.classList.add('bg-success');
        } else {
            studyHoursProgressEl.classList.remove('bg-success');
        }
    }
    
    // Get weekly completed skills
    const weeklySkills = getWeeklyCompletedSkills();
    const weeklySkillsEl = document.getElementById('weeklySkills');
    const skillsProgressEl = document.getElementById('skillsProgress');
    
    if (weeklySkillsEl && skillsProgressEl) {
        weeklySkillsEl.textContent = `${weeklySkills} / ${goals.skillsGoal}`;
        
        const skillsProgress = Math.min((weeklySkills / goals.skillsGoal) * 100, 100);
        skillsProgressEl.style.width = `${skillsProgress}%`;
        
        if (skillsProgress >= 100) {
            skillsProgressEl.classList.add('bg-success');
        } else {
            skillsProgressEl.classList.remove('bg-success');
        }
    }
    
    // Update streak
    updateStreak();
}

// Get today's study hours
function getTodayStudyHours() {
    const today = new Date().toISOString().split('T')[0];
    const activities = JSON.parse(localStorage.getItem('reactLearningProgress'))?.activities || [];
    
    // Sum up study session hours for today
    let todayHours = 0;
    activities.forEach(activity => {
        if (activity.date.startsWith(today) && activity.description.includes('أنهى جلسة تعلم')) {
            // Extract hours from the description (e.g., "أنهى جلسة تعلم (1.5 ساعة)")
            const match = activity.description.match(/\((\d+\.?\d*)\s+ساعة\)/);
            if (match && match[1]) {
                todayHours += parseFloat(match[1]);
            }
        }
    });
    
    return todayHours;
}

// Get weekly completed skills
function getWeeklyCompletedSkills() {
    const startOfWeek = getStartOfWeek();
    const progress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    const skills = progress.skills || {};
    
    // Count skills completed this week
    let weeklyCount = 0;
    for (const skillId in skills) {
        if (skills[skillId].completed && new Date(skills[skillId].lastUpdated) >= startOfWeek) {
            weeklyCount++;
        }
    }
    
    return weeklyCount;
}

// Get start of current week (Saturday)
function getStartOfWeek() {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const diff = day === 6 ? 0 : day + 1; // If Saturday, same day; otherwise add days to get to previous Saturday
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);
    
    return startOfWeek;
}

// Check if goal achieved today
function checkDailyGoal() {
    const goals = JSON.parse(localStorage.getItem('reactLearningGoals'));
    if (!goals) return;
    
    const today = new Date().toISOString().split('T')[0];
    const lastGoalCheck = localStorage.getItem('lastGoalCheck');
    
    // If already checked today, don't check again
    if (lastGoalCheck === today) return;
    
    const todayHours = getTodayStudyHours();
    
    // If daily goal achieved
    if (todayHours >= goals.studyHoursGoal) {
        // Update streak
        updateStreak(true);
        
        // Show achievement notification
        window.showAchievementNotification('أحسنت!', 'لقد حققت هدف الدراسة اليومي!');
        
        // Log activity
        if (window.logActivity) {
            window.logActivity('تم تحقيق هدف الدراسة اليومي');
        }
        
        // Set last check date
        localStorage.setItem('lastGoalCheck', today);
    }
    
    // Check if weekly goal achieved
    const weeklySkills = getWeeklyCompletedSkills();
    const lastWeeklyGoalCheck = localStorage.getItem('lastWeeklyGoalCheck');
    const currentWeek = getCurrentWeekNumber();
    
    if (lastWeeklyGoalCheck !== currentWeek.toString() && weeklySkills >= goals.skillsGoal) {
        // Show achievement notification
        window.showAchievementNotification('رائع!', 'لقد حققت هدف المهارات الأسبوعي!');
        
        // Log activity
        if (window.logActivity) {
            window.logActivity('تم تحقيق هدف المهارات الأسبوعي');
        }
        
        // Set last weekly check
        localStorage.setItem('lastWeeklyGoalCheck', currentWeek.toString());
    }
}

// Get current week number in the year
function getCurrentWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 604800000; // milliseconds in a week
    return Math.floor(diff / oneWeek) + 1;
}

// Update learning streak
function updateStreak(goalAchieved = false) {
    const today = new Date().toISOString().split('T')[0];
    let streak = JSON.parse(localStorage.getItem('learningStreak')) || {
        currentStreak: 0,
        lastStudyDate: null,
        highestStreak: 0
    };
    
    if (goalAchieved) {
        // If already updated today, don't increment again
        if (streak.lastStudyDate === today) return;
        
        // Check if this continues the streak (yesterday or today)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (streak.lastStudyDate === yesterdayStr || !streak.lastStudyDate) {
            streak.currentStreak++;
        } else if (streak.lastStudyDate !== today) {
            // Streak broken
            streak.currentStreak = 1;
        }
        
        // Update highest streak
        if (streak.currentStreak > streak.highestStreak) {
            streak.highestStreak = streak.currentStreak;
        }
        
        streak.lastStudyDate = today;
        
        // Save updated streak
        localStorage.setItem('learningStreak', JSON.stringify(streak));
    }
    
    // Update streak UI
    const streakDaysEl = document.getElementById('streakDays');
    const streakIconsEl = document.getElementById('streakIcons');
    
    if (streakDaysEl) {
        streakDaysEl.textContent = `${streak.currentStreak} ${streak.currentStreak === 1 ? 'يوم' : 'أيام'}`;
    }
    
    if (streakIconsEl) {
        streakIconsEl.innerHTML = '';
        
        // Show up to 7 stars
        const starsToShow = Math.min(7, streak.currentStreak);
        
        for (let i = 0; i < 7; i++) {
            if (i < starsToShow) {
                streakIconsEl.innerHTML += '<i class="fas fa-star"></i>';
            } else {
                streakIconsEl.innerHTML += '<i class="far fa-star"></i>';
            }
        }
    }
    
    // Show milestone achievements for streaks
    if (goalAchieved) {
        if (streak.currentStreak === 3) {
            window.showAchievementNotification('إنجاز!', 'أنت متواصل لمدة 3 أيام! استمر!');
        } else if (streak.currentStreak === 7) {
            window.showAchievementNotification('إنجاز رائع!', 'أسبوع كامل من التعلم المتواصل!');
        } else if (streak.currentStreak === 30) {
            window.showAchievementNotification('إنجاز استثنائي!', 'شهر كامل من التعلم المتواصل!');
        }
    }
}

// Show goals notification
function showGoalsNotification() {
    window.showAchievementNotification('تم حفظ الأهداف', 'تم تحديث أهدافك بنجاح!');
}

// Configure and show reminders
function setupReminders() {
    const goals = JSON.parse(localStorage.getItem('reactLearningGoals'));
    if (!goals || !goals.enableReminders) return;
    
    // Check if we should show a reminder now
    checkReminderTime();
    
    // Set up interval to check reminder time every minute
    setInterval(checkReminderTime, 60000);
}

// Check if it's time to show a reminder
function checkReminderTime() {
    const goals = JSON.parse(localStorage.getItem('reactLearningGoals'));
    if (!goals || !goals.enableReminders) return;
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Don't show reminder if already shown today
    if (goals.lastReminderDate === today) return;
    
    // Check if today is a study day
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const todayName = dayNames[now.getDay()];
    
    if (!goals.studyDays.includes(todayName)) return;
    
    // Check if it's reminder time
    const [reminderHour, reminderMinute] = goals.reminderTime.split(':').map(Number);
    
    if (now.getHours() === reminderHour && now.getMinutes() === reminderMinute) {
        showStudyReminder();
        
        // Update last reminder date
        goals.lastReminderDate = today;
        localStorage.setItem('reactLearningGoals', JSON.stringify(goals));
    }
}

// Show study reminder
function showStudyReminder() {
    // Only if browser supports notifications
    if (!("Notification" in window)) return;
    
    // If permission already granted
    if (Notification.permission === "granted") {
        createNotification();
    } 
    // If permission not denied, request it
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                createNotification();
            }
        });
    }
}

// Create browser notification
function createNotification() {
    const notification = new Notification("وقت الدراسة!", {
        body: "حان وقت تعلم React.js، هل أنت مستعد؟",
        icon: "/favicon.ico"
    });
    
    notification.onclick = function() {
        window.focus();
        notification.close();
    };
    
    // Also show in-app notification
    window.showAchievementNotification('تذكير', 'حان وقت دراسة React!');
}

// Call reminder setup on page load
setupReminders();

// Make functions available to main.js
window.updateGoalsUI = updateGoalsUI;
window.checkDailyGoal = checkDailyGoal;

// Set up a daily check for goals
function setDailyGoalChecker() {
    // Check if we already checked today
    const today = new Date().toISOString().split('T')[0];
    const lastGoalCheck = localStorage.getItem('lastGoalCheck');
    
    // If date changed since last check, check goals again
    if (lastGoalCheck !== today) {
        // Check if yesterday's goal was missed (streak break logic)
        checkForMissedGoals();
    }
    
    // Set up check every hour (mainly for date rollover)
    setInterval(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        const lastCheck = localStorage.getItem('lastGoalCheck');
        
        // If day changed since last check, perform a goal check
        if (currentDate !== lastCheck) {
            checkDailyGoal();
            checkForMissedGoals();
        }
    }, 3600000); // Every hour
}

// Check for missed goals (breaks streak if missed)
function checkForMissedGoals() {
    // Get streak data
    const streak = JSON.parse(localStorage.getItem('learningStreak')) || {
        currentStreak: 0,
        lastStudyDate: null,
        highestStreak: 0
    };
    
    // If no previous study day or already updated today, nothing to check
    if (!streak.lastStudyDate) return;
    
    const today = new Date();
    const lastStudyDate = new Date(streak.lastStudyDate);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Format dates to YYYY-MM-DD for comparison
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const lastStudyStr = lastStudyDate.toISOString().split('T')[0];
    
    // If last study date was NOT yesterday, and we have a streak > 0, it's broken
    if (lastStudyStr !== yesterdayStr && streak.currentStreak > 0) {
        // Check if today is a study day according to settings
        const goals = JSON.parse(localStorage.getItem('reactLearningGoals')) || {};
        const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const todayName = dayNames[today.getDay()];
        
        // If today is a scheduled study day, break the streak
        if (!goals.studyDays || goals.studyDays.includes(todayName)) {
            const oldStreak = streak.currentStreak;
            streak.currentStreak = 0; // Reset streak
            
            // Save updated streak
            localStorage.setItem('learningStreak', JSON.stringify(streak));
            
            // Update UI
            updateStreak();
            
            // Show notification about broken streak
            if (oldStreak >= 3) {
                window.showAchievementNotification('انتبه!', 
                    `تم كسر سلسلة التعلم المتواصلة (${oldStreak} أيام). حان الوقت للبدء من جديد!`);
                
                // Log activity
                if (window.logActivity) {
                    window.logActivity(`انقطعت سلسلة التعلم المتواصلة (${oldStreak} أيام)`);
                }
            }
        }
    }
}

// Add export charts functionality
function setupExportGoals() {
    // Add export button to the goals card
    const goalsCard = document.querySelector('.daily-goals-card .card-title');
    if (goalsCard) {
        const exportButton = document.createElement('button');
        exportButton.className = 'btn btn-sm btn-outline-primary float-end';
        exportButton.innerHTML = '<i class="fas fa-download me-1"></i> تصدير';
        exportButton.addEventListener('click', exportGoalsData);
        
        goalsCard.appendChild(exportButton);
    }
}

// Export goals data as JSON file
function exportGoalsData() {
    // Gather all goals-related data
    const exportData = {
        goals: JSON.parse(localStorage.getItem('reactLearningGoals')) || {},
        streak: JSON.parse(localStorage.getItem('learningStreak')) || {},
        lastCheck: localStorage.getItem('lastGoalCheck') || null,
        weeklyCheck: localStorage.getItem('lastWeeklyGoalCheck') || null,
        exportDate: new Date().toISOString()
    };
    
    // Convert to JSON string
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `react-learning-goals-export-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Show notification
    window.showAchievementNotification('تم التصدير', 'تم تصدير بيانات الأهداف بنجاح');
}

// Call setup export functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure other elements are initialized
    setTimeout(setupExportGoals, 1000);
});