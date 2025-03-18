// React Learning Progress Tracker - Data Synchronization Module

// Handle page unload to ensure data is saved
window.addEventListener('beforeunload', function(event) {
    // Save any pending changes
    syncAllData();
});

// Periodically save data during active sessions
let syncInterval;
document.addEventListener('DOMContentLoaded', function() {
    // Set up automatic sync every 2 minutes
    syncInterval = setInterval(syncAllData, 120000);
    
    // Add sync button to the UI
    addSyncButton();
});

// Sync all data to localStorage
function syncAllData() {
    try {
        // Make sure all current state is saved
        if (window.calculateTotalProgress && typeof window.calculateTotalProgress === 'function') {
            window.calculateTotalProgress();
        }
        
        if (window.checkDailyGoal && typeof window.checkDailyGoal === 'function') {
            window.checkDailyGoal();
        }
        
        if (window.checkForCompletedPhases && typeof window.checkForCompletedPhases === 'function') {
            window.checkForCompletedPhases();
        }
        
        // Log sync activity (only occasionally) - prevent recursive call to logActivity
        const lastSync = localStorage.getItem('lastSyncTime');
        const now = new Date().getTime();
        if (!lastSync || now - parseInt(lastSync) > 3600000) { // Once per hour max
            // Don't call logActivity from here to avoid potential recursion
            // Instead, manually add a sync entry
            const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
            if (!userProgress.activities) userProgress.activities = [];
            
            userProgress.activities.unshift({
                date: new Date().toISOString(),
                description: 'مزامنة البيانات تلقائياً'
            });
            
            // Keep only last 50 activities
            if (userProgress.activities.length > 50) {
                userProgress.activities = userProgress.activities.slice(0, 50);
            }
            
            localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
            localStorage.setItem('lastSyncTime', now.toString());
        }
    } catch (error) {
        console.error('Error during data sync:', error);
    }
}

// Add sync button to the UI
function addSyncButton() {
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    if (!navbarNav) return;
    
    const syncButton = document.createElement('li');
    syncButton.className = 'nav-item';
    syncButton.innerHTML = '<a class="nav-link" href="#" id="syncBtn"><i class="fas fa-sync-alt"></i> مزامنة</a>';
    navbarNav.appendChild(syncButton);
    
    // Add click event to sync button
    document.getElementById('syncBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animate the icon when syncing
        const syncIcon = this.querySelector('i');
        syncIcon.classList.add('fa-spin');
        
        // Perform sync
        syncAllData();
        
        // Show success notification
        window.showAchievementNotification('تمت المزامنة', 'تم حفظ جميع البيانات بنجاح');
        
        // Stop animation after a delay
        setTimeout(function() {
            syncIcon.classList.remove('fa-spin');
        }, 1000);
    });
}

// Export all data as a backup file
function exportAllData() {
    const allData = {
        progress: JSON.parse(localStorage.getItem('reactLearningProgress') || '{}'),
        goals: JSON.parse(localStorage.getItem('reactLearningGoals') || '{}'),
        certificates: JSON.parse(localStorage.getItem('reactLearningCertificates') || '{}'),
        streak: JSON.parse(localStorage.getItem('learningStreak') || '{}'),
        settings: JSON.parse(localStorage.getItem('reactLearningSettings') || '{}'),
        pomodoro: JSON.parse(localStorage.getItem('pomodoroSettings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    // Create a Blob with the data
    const blob = new Blob([JSON.stringify(allData, null, 2)], {type: 'application/json'});
    
    // Create a downloadable link
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `react-learning-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Cleanup
    URL.revokeObjectURL(url);
    
    // Show notification
    window.showAchievementNotification('تم التصدير', 'تم تصدير نسخة احتياطية من جميع البيانات');
}

// Import data from backup file
function importData(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validate data structure minimally
            if (!data.progress || !data.goals) {
                throw new Error('تنسيق الملف غير صحيح');
            }
            
            // Back up current data before import (just in case)
            const currentData = {
                progress: localStorage.getItem('reactLearningProgress'),
                goals: localStorage.getItem('reactLearningGoals'),
                certificates: localStorage.getItem('reactLearningCertificates'),
                streak: localStorage.getItem('learningStreak'),
                settings: localStorage.getItem('reactLearningSettings')
            };
            
            localStorage.setItem('reactLearningBackup', JSON.stringify(currentData));
            
            // Import data
            if (data.progress) localStorage.setItem('reactLearningProgress', JSON.stringify(data.progress));
            if (data.goals) localStorage.setItem('reactLearningGoals', JSON.stringify(data.goals));
            if (data.certificates) localStorage.setItem('reactLearningCertificates', JSON.stringify(data.certificates));
            if (data.streak) localStorage.setItem('learningStreak', JSON.stringify(data.streak));
            if (data.settings) localStorage.setItem('reactLearningSettings', JSON.stringify(data.settings));
            if (data.pomodoro) localStorage.setItem('pomodoroSettings', JSON.stringify(data.pomodoro));
            
            // Show success and reload
            window.showAchievementNotification('تم الاستيراد', 'تم استيراد البيانات بنجاح! سيتم تحديث الصفحة');
            
            // Log activity
            if (window.logActivity) {
                window.logActivity('تم استيراد البيانات من نسخة احتياطية');
            }
            
            // Reload after a delay
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error importing data:', error);
            window.showAchievementNotification('خطأ', 'فشل استيراد البيانات: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}

// Add import/export functions to settings
document.addEventListener('DOMContentLoaded', function() {
    // Wait for settings modal to be ready
    setTimeout(function() {
        addBackupControls();
    }, 1000);
});

// Add backup controls to settings modal
function addBackupControls() {
    const settingsForm = document.getElementById('userSettingsForm');
    if (!settingsForm) return;
    
    const backupSection = document.createElement('div');
    backupSection.className = 'mb-3';
    backupSection.innerHTML = `
        <label class="form-label">نسخ احتياطية</label>
        <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-primary" id="exportDataBtn">
                <i class="fas fa-download me-1"></i> تصدير البيانات
            </button>
            <div class="position-relative">
                <button type="button" class="btn btn-sm btn-outline-success" id="importDataBtnLabel">
                    <i class="fas fa-upload me-1"></i> استيراد البيانات
                </button>
                <input type="file" id="importDataInput" accept=".json" class="position-absolute" 
                    style="top:0; left:0; opacity:0; width:100%; height:100%; cursor:pointer;">
            </div>
        </div>
        <div class="form-text text-muted">يمكنك تصدير نسخة احتياطية من جميع البيانات أو استيرادها لاحقًا</div>
    `;
    
    settingsForm.appendChild(backupSection);
    
    // Add event listeners
    document.getElementById('exportDataBtn').addEventListener('click', exportAllData);
    document.getElementById('importDataInput').addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            if (confirm('هل أنت متأكد من استيراد هذه البيانات؟ سيتم استبدال جميع البيانات الحالية.')) {
                importData(this.files[0]);
            }
        }
    });
}

// Expose necessary functions
window.syncAllData = syncAllData;
window.exportAllData = exportAllData;
window.importData = importData;