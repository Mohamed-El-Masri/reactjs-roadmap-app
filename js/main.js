// React Learning Progress Tracker - Main JavaScript

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// DOM Elements
const totalProgressBar = document.getElementById('totalProgressBar');
const progressText = document.getElementById('progressText');
const completedSkillsElement = document.getElementById('completedSkills');
const inProgressSkillsElement = document.getElementById('inProgressSkills');
const studyHoursElement = document.getElementById('studyHours');
const achievementsElement = document.getElementById('achievements');
const startBtn = document.getElementById('startBtn');
const activityTimeline = document.getElementById('activityTimeline');

// Initialize Charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadUserProgress();
    setupEventListeners();
});

// Initialize Charts
function initializeCharts() {
    // Progress by Phase Chart
    const phaseCtx = document.getElementById('phasesProgressChart').getContext('2d');
    window.phasesChart = new Chart(phaseCtx, {
        type: 'bar',
        data: {
            labels: ['التأسيس', 'البناء', 'التفاعل', 'التحسين', 'النشر'],
            datasets: [{
                label: 'نسبة الإكمال',
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(97, 218, 251, 0.7)', // React blue
                    'rgba(114, 137, 218, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(233, 30, 99, 0.7)'
                ],
                borderColor: [
                    'rgba(97, 218, 251, 1)',
                    'rgba(114, 137, 218, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(233, 30, 99, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Skills Radar Chart
    const skillsCtx = document.getElementById('skillsRadarChart').getContext('2d');
    window.skillsChart = new Chart(skillsCtx, {
        type: 'radar',
        data: {
            labels: ['JavaScript', 'React', 'Router', 'Forms', 'State Mgmt', 'API', 'UI', 'Performance'],
            datasets: [{
                label: 'مستوى المهارة',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(97, 218, 251, 0.2)',
                borderColor: 'rgba(97, 218, 251, 1)',
                pointBackgroundColor: 'rgba(97, 218, 251, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(97, 218, 251, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false,
                        stepSize: 20
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Load user progress from localStorage
function loadUserProgress() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {
        totalProgress: 0,
        completedSkills: 0,
        inProgressSkills: 0,
        studyHours: 0,
        achievements: 0,
        phaseProgress: [0, 0, 0, 0, 0],
        skillsLevels: [0, 0, 0, 0, 0, 0, 0, 0],
        activities: [],
        lastStudySession: null
    };

    // Update UI with loaded progress
    updateProgressUI(userProgress);

    // Add skill checkboxes event listeners
    document.querySelectorAll('.form-check-input[data-skill]').forEach(checkbox => {
        const skillId = checkbox.getAttribute('data-skill');
        const savedSkill = userProgress.skills ? userProgress.skills[skillId] : null;
        
        if (savedSkill && savedSkill.completed) {
            checkbox.checked = true;
            const skillItem = document.getElementById(`skill-${skillId}`);
            if (skillItem) {
                updateSkillProgress(skillItem, 100);
            }
        }
        
        checkbox.addEventListener('change', function() {
            const skillItem = document.getElementById(`skill-${skillId}`);
            if (this.checked) {
                updateSkillProgress(skillItem, 100);
                logActivity(`أكملت مهارة: ${skillItem.querySelector('h5').textContent}`);
                updateSkillInStorage(skillId, 100, true);
            } else {
                updateSkillProgress(skillItem, 0);
                updateSkillInStorage(skillId, 0, false);
            }
            calculateTotalProgress();
        });
    });

    // Set up progress level buttons (25%, 50%, 75%, 100%)
    setupProgressButtons();
}

// Update skill progress in the UI
function updateSkillProgress(skillItem, progress) {
    if (!skillItem) return;
    
    const progressBar = skillItem.querySelector('.progress-bar');
    const progressText = skillItem.querySelector('.progress-text');
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    
    // Remove all progress level classes
    skillItem.classList.remove('progress-level-0', 'progress-level-25', 'progress-level-50', 'progress-level-75', 'progress-level-100');
    
    // Add appropriate progress level class
    if (progress === 0) skillItem.classList.add('progress-level-0');
    else if (progress <= 25) skillItem.classList.add('progress-level-25');
    else if (progress <= 50) skillItem.classList.add('progress-level-50');
    else if (progress <= 75) skillItem.classList.add('progress-level-75');
    else skillItem.classList.add('progress-level-100');
}

// Set up progress level buttons
function setupProgressButtons() {
    // Add this later if needed
}

// Update skill in localStorage
function updateSkillInStorage(skillId, progress, completed) {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {
        totalProgress: 0,
        completedSkills: 0,
        inProgressSkills: 0,
        studyHours: 0, 
        achievements: 0,
        phaseProgress: [0, 0, 0, 0, 0],
        skillsLevels: [0, 0, 0, 0, 0, 0, 0, 0],
        activities: [],
        skills: {},
        lastStudySession: null
    };
    
    if (!userProgress.skills) userProgress.skills = {};
    
    userProgress.skills[skillId] = {
        progress: progress,
        completed: completed,
        lastUpdated: new Date().toISOString()
    };
    
    // Update counts
    userProgress.completedSkills = Object.values(userProgress.skills).filter(s => s.completed).length;
    userProgress.inProgressSkills = Object.values(userProgress.skills).filter(s => s.progress > 0 && !s.completed).length;
    
    // Calculate total progress (average of all skills)
    const allSkills = Object.values(userProgress.skills);
    if (allSkills.length > 0) {
        userProgress.totalProgress = Math.round(
            allSkills.reduce((sum, skill) => sum + skill.progress, 0) / allSkills.length
        );
    }
    
    // Update phase progress (simplified for now)
    // In a real app, we would map skills to phases and calculate phase progress
    
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    updateProgressUI(userProgress);
}

// Update UI with progress data
function updateProgressUI(progressData) {
    // Update main progress bar
    totalProgressBar.style.width = `${progressData.totalProgress}%`;
    progressText.textContent = `${progressData.totalProgress}% مكتمل`;
    
    // Update stats
    completedSkillsElement.textContent = progressData.completedSkills;
    inProgressSkillsElement.textContent = progressData.inProgressSkills;
    studyHoursElement.textContent = progressData.studyHours;
    achievementsElement.textContent = progressData.achievements;
    
    // Update charts if they exist
    if (window.phasesChart) {
        window.phasesChart.data.datasets[0].data = progressData.phaseProgress;
        window.phasesChart.update();
    }
    
    if (window.skillsChart) {
        window.skillsChart.data.datasets[0].data = progressData.skillsLevels;
        window.skillsChart.update();
    }
    
    // Update activity timeline
    updateActivityTimeline(progressData.activities);
    
    // Update achievement badges (if any)
    checkAchievements(progressData);
}

// Log user activity
function logActivity(description) {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {
        activities: []
    };
    
    const activity = {
        date: new Date().toISOString(),
        description: description
    };
    
    userProgress.activities = userProgress.activities || [];
    userProgress.activities.unshift(activity); // Add to beginning
    
    // Keep only last 20 activities
    if (userProgress.activities.length > 20) {
        userProgress.activities = userProgress.activities.slice(0, 20);
    }
    
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    updateActivityTimeline(userProgress.activities);
}

// Update activity timeline display
function updateActivityTimeline(activities) {
    if (!activities || activities.length === 0) {
        activityTimeline.innerHTML = '<p class="text-center text-muted">لم تسجل أي نشاط بعد</p>';
        return;
    }
    
    activityTimeline.innerHTML = '';
    activities.forEach(activity => {
        const date = new Date(activity.date);
        const formattedDate = new Intl.DateTimeFormat('ar-SA', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="d-flex justify-content-between">
                <strong>${activity.description}</strong>
                <span class="activity-date">${formattedDate}</span>
            </div>
        `;
        activityTimeline.appendChild(activityItem);
    });
}

// Check for achievements
function checkAchievements(progressData) {
    let newAchievements = 0;
    
    // First skill completed
    if (progressData.completedSkills >= 1 && !progressData.achievement_first_skill) {
        progressData.achievement_first_skill = true;
        newAchievements++;
        showAchievementNotification('إنجاز مقفل!', 'أكملت أول مهارة. أحسنت!');
    }
    
    // 5 skills completed
    if (progressData.completedSkills >= 5 && !progressData.achievement_five_skills) {
        progressData.achievement_five_skills = true;
        newAchievements++;
        showAchievementNotification('إنجاز مقفل!', 'أكملت 5 مهارات. رائع!');
    }
    
    // 10 study hours
    if (progressData.studyHours >= 10 && !progressData.achievement_ten_hours) {
        progressData.achievement_ten_hours = true;
        newAchievements++;
        showAchievementNotification('إنجاز مقفل!', 'درست لمدة 10 ساعات. استمر!');
    }
    
    // Update achievement count
    progressData.achievements = (progressData.achievements || 0) + newAchievements;
    
    // Save updated achievements
    if (newAchievements > 0) {
        localStorage.setItem('reactLearningProgress', JSON.stringify(progressData));
    }
}

// Show achievement notification
function showAchievementNotification(title, message) {
    // Create a toast-like notification
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-content">
            <i class="fas fa-trophy text-warning"></i>
            <div>
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Animate out after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Calculate total progress across all skills
function calculateTotalProgress() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    const skills = userProgress.skills || {};
    
    const skillValues = Object.values(skills);
    if (skillValues.length === 0) {
        userProgress.totalProgress = 0;
    } else {
        userProgress.totalProgress = Math.round(
            skillValues.reduce((sum, skill) => sum + skill.progress, 0) / skillValues.length
        );
    }
    
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    // Update UI
    totalProgressBar.style.width = `${userProgress.totalProgress}%`;
    progressText.textContent = `${userProgress.totalProgress}% مكتمل`;
    
    return userProgress.totalProgress;
}

// Set up event listeners
function setupEventListeners() {
    // Start button event
    startBtn.addEventListener('click', function() {
        // Scroll to roadmap section
        document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' });
        
        // Log activity
        logActivity('بدأ جلسة تعلم جديدة');
        
        // Start study timer
        startStudyTimer();
    });
}

// Study timer functionality
let studyTimerInterval;
let studyStartTime;

function startStudyTimer() {
    if (studyTimerInterval) {
        // Timer already running, don't start again
        return;
    }
    
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    userProgress.lastStudySession = new Date().toISOString();
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    studyStartTime = new Date();
    
    // Update button to show timer
    startBtn.innerHTML = '<i class="fas fa-clock me-2"></i> جاري التعلم...';
    startBtn.classList.remove('btn-primary');
    startBtn.classList.add('btn-success');
    
    // Set up timer to update every minute
    studyTimerInterval = setInterval(updateStudyTimer, 60000); // every minute
    
    // Add end session button
    const endBtn = document.createElement('button');
    endBtn.className = 'btn btn-outline-danger btn-lg ms-2';
    endBtn.innerHTML = '<i class="fas fa-stop me-2"></i> إنهاء الجلسة';
    endBtn.addEventListener('click', endStudySession);
    
    startBtn.parentNode.appendChild(endBtn);
}

function updateStudyTimer() {
    const now = new Date();
    const elapsedMinutes = Math.floor((now - studyStartTime) / (1000 * 60));
    
    // Update button text
    startBtn.innerHTML = `<i class="fas fa-clock me-2"></i> جاري التعلم (${elapsedMinutes} دقيقة)`;
}

function endStudySession() {
    if (!studyTimerInterval) return;
    
    clearInterval(studyTimerInterval);
    studyTimerInterval = null;
    
    // Calculate study duration
    const now = new Date();
    const elapsedHours = (now - studyStartTime) / (1000 * 60 * 60);
    const roundedHours = Math.round(elapsedHours * 10) / 10; // round to 1 decimal place
    
    // Update user progress
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    userProgress.studyHours = (userProgress.studyHours || 0) + roundedHours;
    userProgress.lastStudySession = null;
    
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    // Reset button
    startBtn.innerHTML = '<i class="fas fa-play me-2"></i> ابدأ التعلم';
    startBtn.classList.remove('btn-success');
    startBtn.classList.add('btn-primary');
    
    // Remove end session button
    const endBtn = startBtn.parentNode.querySelector('.btn-outline-danger');
    if (endBtn) endBtn.remove();
    
    // Update UI
    updateProgressUI(userProgress);
    
    // Log activity
    logActivity(`أنهى جلسة تعلم (${roundedHours} ساعة)`);
    
    // Show notification
    showAchievementNotification('أحسنت!', `لقد درست لمدة ${roundedHours} ساعة. استمر في التقدم!`);
    
    // Check for achievements
    checkAchievements(userProgress);
}

// Check if there was an ongoing session when the page was closed
function checkForOngoingSession() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    if (userProgress.lastStudySession) {
        const lastSessionTime = new Date(userProgress.lastStudySession);
        const now = new Date();
        
        // If last session was within 6 hours, consider it an ongoing session
        if (now - lastSessionTime < 6 * 60 * 60 * 1000) {
            studyStartTime = lastSessionTime;
            startStudyTimer();
        } else {
            // Session expired, reset it
            userProgress.lastStudySession = null;
            localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
        }
    }
}

// Call when page loads
checkForOngoingSession();

// React Learning Progress Tracker - Main Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize progress tracking
    initProgressTracking();
    
    // Add start button functionality
    document.getElementById('startBtn').addEventListener('click', function() {
        scrollToRoadmap();
        logActivity('بدأ جلسة تعلم جديدة');
    });
    
    // Setup global notification system
    setupNotifications();
});

// Initialize progress tracking system
function initProgressTracking() {
    // Load progress data from localStorage
    let progress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    
    // Initialize if first time
    if (!progress.skills) {
        progress.skills = {};
    }
    if (!progress.activities) {
        progress.activities = [];
    }
    
    // Setup skill checkboxes
    document.querySelectorAll('.form-check-input[data-skill]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const skillId = this.dataset.skill;
            const isCompleted = this.checked;
            
            // Update progress
            updateSkillInStorage(skillId, isCompleted ? 100 : 0, isCompleted);
            
            // Update UI
            updateSkillProgress(this.closest('.skill-item'), isCompleted ? 100 : 0);
            
            // Log activity
            const skillName = this.closest('.skill-item').querySelector('h5').textContent;
            if (isCompleted) {
                logActivity(`أكمل مهارة: ${skillName}`);
            } else {
                logActivity(`أعاد تعيين مهارة: ${skillName}`);
            }
            
            // Calculate total progress
            calculateTotalProgress();
            
            // Check for completed phases
            checkForCompletedPhases();
        });
    });
    
    // Calculate initial progress
    calculateTotalProgress();
    
    // Update activity timeline
    updateActivityTimeline();
    
    // Setup charts if they exist
    setupCharts();
}

// Update skill progress in UI
function updateSkillProgress(skillItem, progress) {
    if (!skillItem) return;
    
    const progressBar = skillItem.querySelector('.progress-bar');
    const progressText = skillItem.querySelector('.progress-text');
    const checkbox = skillItem.querySelector('.form-check-input');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${progress}%`;
    }
    
    if (checkbox) {
        checkbox.checked = progress === 100;
    }
    
    // Update progress class
    skillItem.classList.remove('progress-level-0', 'progress-level-25', 'progress-level-50', 'progress-level-75', 'progress-level-100');
    
    if (progress === 0) skillItem.classList.add('progress-level-0');
    else if (progress <= 25) skillItem.classList.add('progress-level-25');
    else if (progress <= 50) skillItem.classList.add('progress-level-50');
    else if (progress <= 75) skillItem.classList.add('progress-level-75');
    else skillItem.classList.add('progress-level-100');
}

// Update skill in localStorage
function updateSkillInStorage(skillId, progress, completed) {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {
        skills: {},
        activities: []
    };
    
    userProgress.skills[skillId] = {
        progress: progress,
        completed: completed,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    // Update stats
    updateStats();
}

// Log user activity
function logActivity(description) {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {
        skills: {},
        activities: []
    };
    
    if (!userProgress.activities) {
        userProgress.activities = [];
    }
    
    userProgress.activities.unshift({
        date: new Date().toISOString(),
        description: description
    });
    
    // Keep only last 50 activities
    if (userProgress.activities.length > 50) {
        userProgress.activities = userProgress.activities.slice(0, 50);
    }
    
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    // Update UI
    updateActivityTimeline();
}

// Update activity timeline
function updateActivityTimeline() {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;
    
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    const activities = userProgress.activities || [];
    
    if (activities.length === 0) {
        timeline.innerHTML = '<p class="text-center text-muted">لم تسجل أي نشاط بعد</p>';
        return;
    }
    
    // Clear timeline
    timeline.innerHTML = '';
    
    // Add activities
    activities.forEach((activity, index) => {
        const date = new Date(activity.date);
        const formattedDate = `${date.toLocaleDateString('ar-SA')} ${date.toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'})}`;
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <p class="mb-1">${activity.description}</p>
            <small class="activity-date">${formattedDate}</small>
        `;
        
        timeline.appendChild(activityItem);
    });
}

// Calculate total progress across all skills
function calculateTotalProgress() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    const skills = userProgress.skills || {};
    
    let totalProgress = 0;
    let totalSkills = 0;
    let completedSkills = 0;
    let inProgressSkills = 0;
    
    // Calculate based on available skills in the DOM
    document.querySelectorAll('.skill-item').forEach(item => {
        totalSkills++;
        
        const skillId = item.id.replace('skill-', '');
        const skillData = skills[skillId];
        
        if (skillData) {
            totalProgress += skillData.progress;
            
            if (skillData.completed) {
                completedSkills++;
            } else if (skillData.progress > 0) {
                inProgressSkills++;
            }
        }
    });
    
    // Calculate average progress
    let averageProgress = 0;
    if (totalSkills > 0) {
        averageProgress = Math.round(totalProgress / totalSkills);
    }
    
    // Update UI
    const progressBar = document.getElementById('totalProgressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${averageProgress}%`;
        progressBar.setAttribute('aria-valuenow', averageProgress);
    }
    
    if (progressText) {
        progressText.textContent = `${averageProgress}% مكتمل`;
    }
    
    // Store for later use
    userProgress.totalProgress = averageProgress;
    userProgress.totalSkills = totalSkills;
    userProgress.completedSkills = completedSkills;
    userProgress.inProgressSkills = inProgressSkills;
    
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    // Update stats
    updateStats();
    
    return averageProgress;
}

// Update stats counters
function updateStats() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    
    // Update completed skills counter
    const completedSkillsEl = document.getElementById('completedSkills');
    if (completedSkillsEl) {
        completedSkillsEl.textContent = userProgress.completedSkills || 0;
    }
    
    // Update in-progress skills counter
    const inProgressSkillsEl = document.getElementById('inProgressSkills');
    if (inProgressSkillsEl) {
        inProgressSkillsEl.textContent = userProgress.inProgressSkills || 0;
    }
    
    // Update achievements counter
    const achievementsEl = document.getElementById('achievements');
    if (achievementsEl) {
        const certificates = JSON.parse(localStorage.getItem('reactLearningCertificates')) || [];
        achievementsEl.textContent = certificates.length;
    }
    
    // Update study hours counter
    const studyHoursEl = document.getElementById('studyHours');
    if (studyHoursEl) {
        const totalHours = calculateTotalStudyHours();
        studyHoursEl.textContent = totalHours.toFixed(1);
    }
}

// Calculate total study hours
function calculateTotalStudyHours() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    const activities = userProgress.activities || [];
    
    let totalHours = 0;
    
    activities.forEach(activity => {
        // Extract hours from activity description (e.g., "أنهى جلسة تعلم (1.5 ساعة)")
        const match = activity.description.match(/\((\d+\.?\d*)\s+ساعة\)/);
        if (match && match[1]) {
            totalHours += parseFloat(match[1]);
        }
    });
    
    return totalHours;
}

// Set up charts
function setupCharts() {
    const phasesContext = document.getElementById('phasesProgressChart');
    const skillsContext = document.getElementById('skillsRadarChart');
    
    // Destroy existing chart instances if they exist
    if (window.phasesChart) {
        window.phasesChart.destroy();
    }
    
    if (window.skillsChart) {
        window.skillsChart.destroy();
    }
    
    if (phasesContext) {
        // Phase progress chart (Bar chart)
        window.phasesChart = new Chart(phasesContext, {
            type: 'bar',
            data: {
                labels: ['التأسيس', 'البناء', 'التفاعل', 'التحسين', 'النشر'],
                datasets: [{
                    label: 'التقدم %',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(97, 218, 251, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(97, 218, 251, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    if (skillsContext) {
        // Skills radar chart
        window.skillsChart = new Chart(skillsContext, {
            type: 'radar',
            data: {
                labels: [
                    'JavaScript',
                    'React',
                    'Router',
                    'Forms',
                    'State Management',
                    'API',
                    'UI',
                    'Performance'
                ],
                datasets: [{
                    label: 'مستوى المهارات',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: true,
                    backgroundColor: 'rgba(97, 218, 251, 0.2)',
                    borderColor: 'rgb(97, 218, 251)',
                    pointBackgroundColor: 'rgb(97, 218, 251)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(97, 218, 251)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Load data from storage and update charts
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    
    if (window.phasesChart && userProgress.phaseProgress) {
        window.phasesChart.data.datasets[0].data = userProgress.phaseProgress;
        window.phasesChart.update();
    }
    
    if (window.skillsChart && userProgress.skillsLevels) {
        window.skillsChart.data.datasets[0].data = userProgress.skillsLevels;
        window.skillsChart.update();
    }
}

// Check for completed phases and award certificates
function checkForCompletedPhases() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    const skills = userProgress.skills || {};
    
    // Get all certificates
    const certificates = JSON.parse(localStorage.getItem('reactLearningCertificates')) || [];
    let certificatesAwarded = false;
    
    // Check Phase 1 completion
    if (!hasCertificate(certificates, 'phase1') && isPhaseCompleted(skills, 'phase1')) {
        certificates.push({
            id: 'phase1',
            name: 'إتقان أساسيات React.js',
            date: new Date().toISOString(),
            description: 'أتم بنجاح المرحلة الأولى: التأسيس من مسار تعلم React.js'
        });
        certificatesAwarded = true;
    }
    
    // Check Phase 2 completion
    if (!hasCertificate(certificates, 'phase2') && isPhaseCompleted(skills, 'phase2')) {
        certificates.push({
            id: 'phase2',
            name: 'مطور React متوسط',
            date: new Date().toISOString(),
            description: 'أتم بنجاح المرحلة الثانية: البناء من مسار تعلم React.js'
        });
        certificatesAwarded = true;
    }
    
    // Check Phase 3 completion
    if (!hasCertificate(certificates, 'phase3') && isPhaseCompleted(skills, 'phase3')) {
        certificates.push({
            id: 'phase3',
            name: 'مطور واجهات تفاعلية React',
            date: new Date().toISOString(),
            description: 'أتم بنجاح المرحلة الثالثة: التفاعل من مسار تعلم React.js'
        });
        certificatesAwarded = true;
    }
    
    // Check Phase 4 completion
    if (!hasCertificate(certificates, 'phase4') && isPhaseCompleted(skills, 'phase4')) {
        certificates.push({
            id: 'phase4',
            name: 'مطور React محترف',
            date: new Date().toISOString(),
            description: 'أتم بنجاح المرحلة الرابعة: التحسين من مسار تعلم React.js'
        });
        certificatesAwarded = true;
    }
    
    // Check Phase 5 completion
    if (!hasCertificate(certificates, 'phase5') && isPhaseCompleted(skills, 'phase5')) {
        certificates.push({
            id: 'phase5',
            name: 'خبير React.js',
            date: new Date().toISOString(),
            description: 'أتم بنجاح جميع مراحل مسار تعلم React.js'
        });
        certificatesAwarded = true;
    }
    
    // Save certificates
    if (certificatesAwarded) {
        localStorage.setItem('reactLearningCertificates', JSON.stringify(certificates));
        
        // Show notification
        window.showAchievementNotification('تهانينا!', 'لقد حصلت على شهادة جديدة! يمكنك عرضها من قائمة الإنجازات.');
        
        // Update stats
        updateStats();
    }
}

// Check if a certificate already exists
function hasCertificate(certificates, id) {
    return certificates.some(cert => cert.id === id);
}

// Check if a phase is completed
function isPhaseCompleted(skills, phaseId) {
    // This is a simplified check - in real app would need to
    // match skills to phases more carefully
    switch(phaseId) {
        case 'phase1':
            return isSkillGroupCompleted(skills, ['js-', 'react-', 'hook-'], 0.8);
        case 'phase2':
            return isSkillGroupCompleted(skills, ['router-', 'forms-', 'state-'], 0.8);
        case 'phase3':
            return isSkillGroupCompleted(skills, ['api-', 'ui-', 'anim-'], 0.8);
        case 'phase4':
            return isSkillGroupCompleted(skills, ['sec-', 'perf-', 'test-'], 0.8);
        case 'phase5':
            return isSkillGroupCompleted(skills, ['build-', 'adv-', 'deploy-'], 0.8);
        default:
            return false;
    }
}

// Check if a skill group is completed
function isSkillGroupCompleted(skills, prefixes, completionThreshold) {
    let totalSkills = 0;
    let completedSkills = 0;
    
    for (const skillId in skills) {
        if (prefixes.some(prefix => skillId.startsWith(prefix))) {
            totalSkills++;
            if (skills[skillId].completed) {
                completedSkills++;
            }
        }
    }
    
    // If no skills found in this group, return false
    if (totalSkills === 0) return false;
    
    // Return true if completion ratio meets the threshold
    return completedSkills / totalSkills >= completionThreshold;
}

// Set up notification system
function setupNotifications() {
    // Create global notification function
    window.showAchievementNotification = function(title, message) {
        console.log(`[نجاح] ${title}: ${message}`);
        
        // Create a toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast
        const toastId = `toast-${Date.now()}`;
        const toastElement = document.createElement('div');
        toastElement.className = 'toast';
        toastElement.id = toastId;
        toastElement.setAttribute('role', 'alert');
        toastElement.setAttribute('aria-live', 'assertive');
        toastElement.setAttribute('aria-atomic', 'true');
        toastElement.innerHTML = `
            <div class="achievement-notification">
                <div class="achievement-content">
                    <i class="fas fa-trophy text-warning"></i>
                    <div>
                        <h5>${title}</h5>
                        <p>${message}</p>
                    </div>
                </div>
            </div>
        `;
        
        toastContainer.appendChild(toastElement);
        
        // Show toast
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    };
}

// إضافة دالة التمرير إلى قسم خارطة الطريق
function scrollToRoadmap() {
    const roadmapSection = document.getElementById('roadmap');
    if (roadmapSection) {
        roadmapSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', scrollToRoadmap);
    }
});