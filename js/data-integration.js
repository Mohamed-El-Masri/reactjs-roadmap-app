// React Learning Progress Tracker - Data Integration Module
// This module ensures data consistency across components

document.addEventListener('DOMContentLoaded', function() {
    setupDataIntegration();
});

// Setup Data Integration
function setupDataIntegration() {
    // Ensure all required data structures exist
    initializeDataStructures();
    
    // Set up periodic data integrity checks
    setInterval(validateDataIntegrity, 300000); // Every 5 minutes
    
    // Perform initial data check
    setTimeout(validateDataIntegrity, 5000); // Wait 5 seconds after page load
    
    // Observe for UI updates to ensure data consistency
    observeUIChanges();
    
    // Add version metadata to help with future schema updates
    addVersionMetadata();
}

// Initialize All Required Data Structures
function initializeDataStructures() {
    // Progress data
    if (!localStorage.getItem('reactLearningProgress')) {
        localStorage.setItem('reactLearningProgress', JSON.stringify({
            skills: {},
            activities: [],
            totalProgress: 0,
            completedSkills: 0,
            inProgressSkills: 0,
            studyHours: 0,
            phaseProgress: [0, 0, 0, 0, 0],
            skillsLevels: [0, 0, 0, 0, 0, 0, 0, 0],
            lastUpdated: new Date().toISOString()
        }));
    }
    
    // Goals data
    if (!localStorage.getItem('reactLearningGoals')) {
        localStorage.setItem('reactLearningGoals', JSON.stringify({
            studyHoursGoal: 2,
            skillsGoal: 3,
            studyDays: ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'],
            reminderTime: '18:00',
            enableReminders: true,
            lastReminderDate: new Date().toISOString().split('T')[0]
        }));
    }
    
    // Streak data
    if (!localStorage.getItem('learningStreak')) {
        localStorage.setItem('learningStreak', JSON.stringify({
            currentStreak: 0,
            highestStreak: 0,
            lastStudyDate: null
        }));
    }
    
    // Settings data
    if (!localStorage.getItem('reactLearningSettings')) {
        localStorage.setItem('reactLearningSettings', JSON.stringify({
            userName: '',
            theme: 'light',
            notifications: true,
            useLocalStorage: true
        }));
    }
    
    // Certificates data
    if (!localStorage.getItem('reactLearningCertificates')) {
        localStorage.setItem('reactLearningCertificates', JSON.stringify({}));
    }
    
    // Pomodoro settings
    if (!localStorage.getItem('pomodoroSettings')) {
        localStorage.setItem('pomodoroSettings', JSON.stringify({
            focusTime: 25,
            breakTime: 5,
            longBreakTime: 15,
            sessionsBeforeLongBreak: 4,
            autoStartBreaks: true,
            autoStartPomodoros: true,
            showNotifications: true,
            playAlarmSound: true,
            completedSessions: 0
        }));
    }
}

// Validate Data Integrity
function validateDataIntegrity() {
    // Check progress data
    const progress = JSON.parse(localStorage.getItem('reactLearningProgress') || '{}');
    let progressModified = false;
    
    // Ensure progress has all required fields
    if (!progress.skills) {
        progress.skills = {};
        progressModified = true;
    }
    
    if (!progress.activities) {
        progress.activities = [];
        progressModified = true;
    }
    
    if (progress.phaseProgress === undefined) {
        progress.phaseProgress = [0, 0, 0, 0, 0];
        progressModified = true;
    }
    
    if (progress.skillsLevels === undefined) {
        progress.skillsLevels = [0, 0, 0, 0, 0, 0, 0, 0];
        progressModified = true;
    }
    
    // Validate activities array
    if (progress.activities && Array.isArray(progress.activities)) {
        // Ensure each activity has required fields
        for (let i = 0; i < progress.activities.length; i++) {
            if (!progress.activities[i].date || !progress.activities[i].description) {
                // Remove invalid activity
                progress.activities.splice(i, 1);
                i--;
                progressModified = true;
            }
        }
    }
    
    // Save any changes
    if (progressModified) {
        progress.lastUpdated = new Date().toISOString();
        localStorage.setItem('reactLearningProgress', JSON.stringify(progress));
        console.log('Data integrity fixed: Progress data structure updated');
    }
    
    // Check other data structures similarly
    validateGoalsData();
    validateStreakData();
    validateCertificatesData();
}

// Validate Goals Data
function validateGoalsData() {
    const goals = JSON.parse(localStorage.getItem('reactLearningGoals') || '{}');
    let goalsModified = false;
    
    // Validate study days
    if (!goals.studyDays || !Array.isArray(goals.studyDays)) {
        goals.studyDays = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];
        goalsModified = true;
    }
    
    // Ensure hours goal is a number
    if (typeof goals.studyHoursGoal !== 'number' || isNaN(goals.studyHoursGoal)) {
        goals.studyHoursGoal = 2;
        goalsModified = true;
    }
    
    // Ensure skills goal is a number
    if (typeof goals.skillsGoal !== 'number' || isNaN(goals.skillsGoal)) {
        goals.skillsGoal = 3;
        goalsModified = true;
    }
    
    // Save if modified
    if (goalsModified) {
        localStorage.setItem('reactLearningGoals', JSON.stringify(goals));
        console.log('Data integrity fixed: Goals data structure updated');
    }
}

// Validate Streak Data
function validateStreakData() {
    const streak = JSON.parse(localStorage.getItem('learningStreak') || '{}');
    let streakModified = false;
    
    // Ensure currentStreak is a number
    if (typeof streak.currentStreak !== 'number' || isNaN(streak.currentStreak)) {
        streak.currentStreak = 0;
        streakModified = true;
    }
    
    // Ensure highestStreak is a number
    if (typeof streak.highestStreak !== 'number' || isNaN(streak.highestStreak)) {
        streak.highestStreak = 0;
        streakModified = true;
    }
    
    // Save if modified
    if (streakModified) {
        localStorage.setItem('learningStreak', JSON.stringify(streak));
        console.log('Data integrity fixed: Streak data structure updated');
    }
}

// Validate Certificates Data
function validateCertificatesData() {
    const certificates = JSON.parse(localStorage.getItem('reactLearningCertificates') || '{}');
    
    // If certificates is not an object, reset it
    if (typeof certificates !== 'object' || Array.isArray(certificates)) {
        localStorage.setItem('reactLearningCertificates', JSON.stringify({}));
        console.log('Data integrity fixed: Certificates data reset due to invalid format');
    }
}

// Observe UI Changes
function observeUIChanges() {
    // Create an observer for the stats section
    const statsObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                // If stats are updated, make sure total progress is consistent
                syncProgressData();
            }
        });
    });
    
    // Observe stats cards
    const statsCards = document.querySelectorAll('.stats-card');
    if (statsCards.length) {
        statsCards.forEach(card => {
            statsObserver.observe(card, { childList: true, subtree: true });
        });
    }
    
    // Also set up listeners for skill changes
    document.querySelectorAll('.form-check-input[data-skill]').forEach(checkbox => {
        checkbox.addEventListener('change', syncProgressData);
    });
}

// Sync Progress Data across components
function syncProgressData() {
    // Get all data
    const progress = JSON.parse(localStorage.getItem('reactLearningProgress') || '{}');
    
    // Count completed and in-progress skills
    let completedCount = 0;
    let inProgressCount = 0;
    const skills = progress.skills || {};
    
    Object.values(skills).forEach(skill => {
        if (skill.completed) {
            completedCount++;
        } else if (skill.progress > 0) {
            inProgressCount++;
        }
    });
    
    // Update totals
    progress.completedSkills = completedCount;
    progress.inProgressSkills = inProgressCount;
    
    // Save updates
    progress.lastUpdated = new Date().toISOString();
    localStorage.setItem('reactLearningProgress', JSON.stringify(progress));
}

// Add Version Metadata
function addVersionMetadata() {
    // Add version info to help with future updates
    localStorage.setItem('reactLearningTrackerVersion', JSON.stringify({
        version: "1.0.0",
        schemaVersion: "1.0",
        lastUpdated: new Date().toISOString()
    }));
}

// Export functions
window.syncProgressData = syncProgressData;
window.validateDataIntegrity = validateDataIntegrity;
window.setupDataIntegration = setupDataIntegration;
