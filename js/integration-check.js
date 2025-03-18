// React Learning Progress Tracker - Integration Check Script
// This script ensures all components are loaded correctly and integrates them properly

// Wait until all scripts are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if all required scripts are loaded
    setTimeout(verifyScriptsLoaded, 500);
});

// Verify all required scripts are loaded
function verifyScriptsLoaded() {
    const requiredFunctions = [
        { name: 'initStorageManager', script: 'init.js' },
        { name: 'calculateTotalProgress', script: 'main.js' },
        { name: 'populateSkillsData', script: 'progress.js' },
        { name: 'setupGoalsSystem', script: 'goals.js' },
        { name: 'setupPomodoroTimer', script: 'pomodoro.js' },
        { name: 'setupCertificateSystem', script: 'certificates.js' },
        { name: 'setupUserSettings', script: 'settings.js' },
        { name: 'syncAllData', script: 'sync.js' }
    ];
    
    console.log('🔍 التحقق من تحميل جميع الملفات...');
    
    let allLoaded = true;
    let missingScripts = [];
    
    requiredFunctions.forEach(func => {
        if (typeof window[func.name] !== 'function') {
            allLoaded = false;
            missingScripts.push(func.script);
            console.error(`❌ خطأ: الدالة ${func.name} من الملف ${func.script} غير متوفرة`);
        }
    });
    
    if (allLoaded) {
        console.log('✅ تم تحميل جميع المكونات بنجاح');
        initializeApplication();
    } else {
        console.error(`❌ فشل التحميل: الملفات التالية لم يتم تحميلها بشكل صحيح: ${missingScripts.join(', ')}`);
        showErrorMessage(missingScripts);
    }
}

// Initialize all components in the correct order
function initializeApplication() {
    // 1. Setup global functions and fallbacks
    if (typeof window.showAchievementNotification !== 'function') {
        window.showAchievementNotification = function(title, message) {
            console.log(`[إشعار] ${title}: ${message}`);
            
            // Create a simple notification if missing
            if (document.querySelector('.achievement-notification')) return;
            
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
        };
    }
    
    // 2. Log application start
    console.log('🚀 تطبيق تتبع تعلم React يعمل الآن');
    
    // 3. Initial data sync check
    if (window.syncAllData) {
        window.syncAllData();
    }
    
    // 4. Check for achievements and certificates after data is loaded
    if (window.checkForCompletedPhases) {
        setTimeout(window.checkForCompletedPhases, 1000);
    }
    
    // 5. Show welcome message
    const userName = localStorage.getItem('userName') || 'المتعلم';
    showWelcomeMessage(userName);
}

// Show welcome message to the user
function showWelcomeMessage(userName) {
    // Get visit count
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    
    // Different messages based on visit count
    if (visitCount === 1) {
        window.showAchievementNotification(`مرحباً ${userName}!`, 'مرحباً بك في رحلة تعلم React، أبدأ بالنقر على "أبدأ التعلم"');
    } else {
        // Calculate streak
        const streak = JSON.parse(localStorage.getItem('learningStreak')) || { currentStreak: 0 };
        
        if (streak.currentStreak > 0) {
            window.showAchievementNotification(`أهلاً ${userName}!`, `أنت مستمر في التعلم منذ ${streak.currentStreak} يوم! استمر في العمل الجيد!`);
        } else {
            window.showAchievementNotification(`أهلاً ${userName}!`, 'مرحباً بعودتك! اليوم هو يوم جديد للتعلم!');
        }
    }
}

// Show error message if scripts failed to load
function showErrorMessage(missingScripts) {
    const container = document.createElement('div');
    container.className = 'alert alert-danger m-3';
    container.role = 'alert';
    container.innerHTML = `
        <h4 class="alert-heading"><i class="fas fa-exclamation-triangle me-2"></i>خطأ في تحميل التطبيق</h4>
        <p>تعذر تحميل بعض المكونات الضرورية. يرجى تحديث الصفحة أو التحقق من اتصالك بالإنترنت.</p>
        <hr>
        <p class="mb-0">ملفات مفقودة: ${missingScripts.join(', ')}</p>
    `;
    
    // Insert at the top of the body
    document.body.insertBefore(container, document.body.firstChild);
}

// Expose functions globally
window.verifyScriptsLoaded = verifyScriptsLoaded;
window.initializeApplication = initializeApplication;
