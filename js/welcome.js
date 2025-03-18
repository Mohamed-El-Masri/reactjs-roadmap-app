// React Learning Progress Tracker - Welcome Message for New Users

document.addEventListener('DOMContentLoaded', function() {
    checkForFirstVisit();
});

// Check if this is the user's first visit
function checkForFirstVisit() {
    const isFirstVisit = !localStorage.getItem('reactLearningTrackerVisited');
    
    if (isFirstVisit) {
        // Mark as visited
        localStorage.setItem('reactLearningTrackerVisited', 'true');
        
        // Show welcome modal after a slight delay
        setTimeout(showWelcomeModal, 1500);
    }
}

// Show the welcome modal to new users
function showWelcomeModal() {
    // Create welcome modal
    const welcomeModal = document.createElement('div');
    welcomeModal.className = 'modal fade';
    welcomeModal.id = 'welcomeModal';
    welcomeModal.tabIndex = '-1';
    welcomeModal.setAttribute('aria-hidden', 'true');
    welcomeModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-rocket me-2"></i>
                        مرحبًا بك في خارطة تعلم React.js
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-3">مرحباً بك في مُتتبع تقدم تعلم React! هذه الأداة ستساعدك على:</p>
                    
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check-circle text-success me-2"></i> تتبع مستوى تقدمك في مهارات React.js</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i> وضع أهداف يومية وأسبوعية للتعلم</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i> توثيق إنجازاتك والحصول على شهادات</li>
                        <li><i class="fas fa-check-circle text-success me-2"></i> الوصول لمصادر تعلم موثوقة ومفيدة</li>
                    </ul>
                    
                    <div class="alert alert-info mt-3">
                        <i class="fas fa-info-circle me-2"></i>
                        هذه الأداة تعمل بشكل كامل دون الحاجة للاتصال بالإنترنت، وتخزن بياناتك محلياً على جهازك.
                    </div>
                    
                    <div class="mb-3 mt-4">
                        <label for="welcomeUserName" class="form-label">ما هو اسمك؟</label>
                        <input type="text" class="form-control" id="welcomeUserName" placeholder="أدخل اسمك هنا">
                        <div class="form-text">سيتم استخدامه في التعامل معك داخل التطبيق</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">تخطي</button>
                    <button type="button" class="btn btn-primary" id="startJourneyBtn">
                        <i class="fas fa-play me-2"></i>
                        ابدأ رحلة التعلم
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(welcomeModal);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    modal.show();
    
    // Handle start journey button
    document.getElementById('startJourneyBtn').addEventListener('click', function() {
        const userName = document.getElementById('welcomeUserName').value.trim();
        if (userName) {
            // Save username
            localStorage.setItem('userName', userName);
            
            // Update settings
            const settings = JSON.parse(localStorage.getItem('reactLearningSettings') || '{}');
            settings.userName = userName;
            localStorage.setItem('reactLearningSettings', JSON.stringify(settings));
            
            // Show guide toast
            window.showAchievementNotification('مرحباً ' + userName, 'اضغط على زر "دليل الاستخدام" لمعرفة كيفية استخدام الموقع');
        }
        
        // Hide modal
        modal.hide();
        
        // Scroll to roadmap
        setTimeout(() => {
            document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });
}

// Export function
window.checkForFirstVisit = checkForFirstVisit;
window.showWelcomeModal = showWelcomeModal;
