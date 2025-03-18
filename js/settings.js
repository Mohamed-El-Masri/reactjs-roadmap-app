// React Learning Progress Tracker - User Settings Module

document.addEventListener('DOMContentLoaded', function() {
    setupUserSettings();
    loadSettings();
});

// Setup User Settings
function setupUserSettings() {
    // Set up the settings button click handler
    document.getElementById('userSettingsBtn').addEventListener('click', function() {
        loadSettingsToForm();
        const userSettingsModal = new bootstrap.Modal(document.getElementById('userSettingsModal'));
        userSettingsModal.show();
    });
    
    // Save settings when the save button is clicked
    document.getElementById('saveSettingsBtn').addEventListener('click', function() {
        saveSettings();
        bootstrap.Modal.getInstance(document.getElementById('userSettingsModal')).hide();
    });
    
    // Reset data button handler
    document.getElementById('resetDataBtn').addEventListener('click', function() {
        if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط جميع بياناتك؟ لا يمكن التراجع عن هذه العملية.')) {
            resetAllData();
            bootstrap.Modal.getInstance(document.getElementById('userSettingsModal')).hide();
            showResetConfirmation();
        }
    });
    
    // Add dark mode toggle
    setupDarkMode();
}

// Load settings from localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('reactLearningSettings')) || {};
    
    // Apply theme
    if (settings.theme === 'dark') {
        document.body.classList.add('dark-mode');
        addDarkModeStylesheet();
    }
    
    // Apply notifications if supported
    if (settings.notifications && "Notification" in window) {
        if (Notification.permission === "granted") {
            // We're already good
        } else if (Notification.permission !== "denied") {
            // Request permission
            Notification.requestPermission();
        }
    }
}

// Load settings to the form
function loadSettingsToForm() {
    const settings = JSON.parse(localStorage.getItem('reactLearningSettings')) || {
        userName: '',
        theme: 'light',
        notifications: true,
        useLocalStorage: true
    };
    
    // Set name
    document.getElementById('userName').value = settings.userName || '';
    
    // Set theme
    if (settings.theme === 'dark') {
        document.getElementById('themeDark').checked = true;
    } else {
        document.getElementById('themeLight').checked = true;
    }
    
    // Set notifications
    document.getElementById('notificationsEnabled').checked = settings.notifications !== false;
    
    // Set storage preference
    document.getElementById('useLocalStorage').checked = settings.useLocalStorage !== false;
}

// Save settings to localStorage
function saveSettings() {
    const userName = document.getElementById('userName').value;
    const theme = document.querySelector('input[name="theme"]:checked')?.value || 'light';
    const notifications = document.getElementById('notificationsEnabled').checked;
    const useLocalStorage = document.getElementById('useLocalStorage').checked;
    
    const settings = {
        userName: userName,
        theme: theme,
        notifications: notifications,
        useLocalStorage: useLocalStorage,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('reactLearningSettings', JSON.stringify(settings));
    
    // Also store userName separately for easy access
    localStorage.setItem('userName', userName);
    
    // Apply theme immediately
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        addDarkModeStylesheet();
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Handle notifications
    if (notifications && "Notification" in window) {
        if (Notification.permission === "granted") {
            // We're good
        } else if (Notification.permission !== "denied") {
            // Request permission
            Notification.requestPermission();
        }
    }
    
    // Log activity
    if (window.logActivity) {
        window.logActivity('تم تحديث الإعدادات');
    }
    
    // Show notification
    window.showAchievementNotification('تم الحفظ', 'تم حفظ إعداداتك بنجاح');
}

// Reset all application data
function resetAllData() {
    // Backup settings first
    const settings = JSON.parse(localStorage.getItem('reactLearningSettings'));
    
    // Clear all data
    localStorage.removeItem('reactLearningProgress');
    localStorage.removeItem('reactLearningGoals');
    localStorage.removeItem('reactLearningCertificates');
    localStorage.removeItem('learningStreak');
    
    // Keep only settings
    localStorage.setItem('reactLearningSettings', JSON.stringify(settings));
    
    // Log activity
    if (window.logActivity) {
        window.logActivity('تم إعادة ضبط جميع البيانات');
    }
}

// Show reset confirmation
function showResetConfirmation() {
    // Create alert message
    const alertMessage = document.createElement('div');
    alertMessage.className = 'alert alert-success alert-dismissible fade show fixed-top m-3';
    alertMessage.role = 'alert';
    alertMessage.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>تم إعادة الضبط!</strong> تم مسح جميع بياناتك بنجاح. سيتم تحديث الصفحة الآن.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertMessage);
    
    // Reload page after 3 seconds
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}

// Add dark mode stylesheet if not already added
function addDarkModeStylesheet() {
    if (!document.getElementById('darkModeStylesheet')) {
        const link = document.createElement('link');
        link.id = 'darkModeStylesheet';
        link.rel = 'stylesheet';
        link.href = 'css/dark-mode.css';
        document.head.appendChild(link);
    }
}

// Setup dark mode toggle
function setupDarkMode() {
    // Set up event listeners for the radio buttons
    document.getElementById('themeLight').addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('dark-mode');
        }
    });
    
    document.getElementById('themeDark').addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            addDarkModeStylesheet();
        }
    });
}

// Expose functions to global scope
window.setupUserSettings = setupUserSettings;
window.loadSettings = loadSettings;
window.resetAllData = resetAllData;
