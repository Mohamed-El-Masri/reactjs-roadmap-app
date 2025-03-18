// React Learning Progress Tracker - User Guide

document.addEventListener('DOMContentLoaded', function() {
    setupUserGuide();
});

// User guide steps
const guideSteps = [
    {
        title: "مرحباً بك في خارطة تعلم React.js",
        content: "هذا التطبيق سيساعدك في تتبع رحلة تعلمك للـ React.js، من البداية وحتى المستوى المتقدم.",
        attachTo: { element: '.hero-section', position: 'bottom' }
    },
    {
        title: "تتبع تقدمك",
        content: "هنا يمكنك رؤية إحصائيات تقدمك، بما في ذلك المهارات المكتملة وساعات الدراسة والإنجازات.",
        attachTo: { element: '.stats-card', position: 'bottom' }
    },
    {
        title: "خارطة الطريق",
        content: "استعرض المراحل الخمس لإتقان React.js وحدد مستوى تقدمك في كل مهارة.",
        attachTo: { element: '#roadmap', position: 'top' }
    },
    {
        title: "تحليل التقدم",
        content: "احصل على تحليل بصري لتقدمك وقارن مستوياتك في مختلف المهارات.",
        attachTo: { element: '#progress', position: 'top' }
    },
    {
        title: "مصادر التعلم",
        content: "استفد من مجموعة مختارة من أفضل المصادر لتعلم React.js.",
        attachTo: { element: '#resources', position: 'top' }
    },
    {
        title: "هيا لنبدأ!",
        content: "انقر على زر 'ابدأ التعلم' للبدء في رحلتك أو اضغط على الإعدادات لتخصيص تجربتك.",
        attachTo: { element: '#startBtn', position: 'bottom' }
    }
];

// Setup the user guide
function setupUserGuide() {
    // Create Guide button in navbar
    addGuideButton();
    
    // Show guide automatically for first-time visitors
    const isFirstVisit = !localStorage.getItem('visitedBefore');
    if (isFirstVisit) {
        // Mark as visited
        localStorage.setItem('visitedBefore', 'true');
        
        // Show guide after a slight delay to ensure all elements are loaded
        setTimeout(startGuide, 1500);
    }
}

// Add guide button to navigation
function addGuideButton() {
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    if (!navbarNav) return;
    
    const guideButton = document.createElement('li');
    guideButton.className = 'nav-item';
    guideButton.innerHTML = '<a class="nav-link" href="#" id="guideBtn"><i class="fas fa-question-circle"></i> دليل الاستخدام</a>';
    navbarNav.appendChild(guideButton);
    
    // Add click event
    document.getElementById('guideBtn').addEventListener('click', function(e) {
        e.preventDefault();
        startGuide();
    });
}

// Start the user guide
function startGuide() {
    // Create guide overlay
    const overlay = document.createElement('div');
    overlay.id = 'guideOverlay';
    overlay.className = 'guide-overlay';
    document.body.appendChild(overlay);
    
    // Create guide container
    const guideContainer = document.createElement('div');
    guideContainer.id = 'guideContainer';
    guideContainer.className = 'guide-container';
    overlay.appendChild(guideContainer);
    
    // Add styling for guide elements
    addGuideStyles();
    
    // Start with first step
    showGuideStep(0);
}

// Add styles for the guide
function addGuideStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .guide-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.7);
            z-index: 9998;
            overflow: hidden;
        }
        
        .guide-container {
            position: absolute;
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 400px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.3);
            z-index: 9999;
            text-align: right;
        }
        
        .guide-container h3 {
            margin-top: 0;
            color: #61dafb;
            font-weight: 700;
        }
        
        .guide-container p {
            margin-bottom: 20px;
        }
        
        .guide-nav {
            display: flex;
            justify-content: space-between;
        }
        
        .guide-target {
            position: relative;
            z-index: 10000;
            box-shadow: 0 0 0 4px #61dafb;
        }
        
        body.dark-mode .guide-container {
            background-color: #2a2a2a;
            color: #e0e0e0;
        }
    `;
    document.head.appendChild(styleElement);
}

// Show a specific guide step
function showGuideStep(stepIndex) {
    if (stepIndex >= guideSteps.length) {
        // End of guide
        endGuide();
        return;
    }
    
    const step = guideSteps[stepIndex];
    const target = document.querySelector(step.attachTo.element);
    
    if (!target) {
        // Skip this step if target element doesn't exist
        showGuideStep(stepIndex + 1);
        return;
    }
    
    // Highlight target element
    target.classList.add('guide-target');
    
    // Position guide container near target
    const guideContainer = document.getElementById('guideContainer');
    guideContainer.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.content}</p>
        <div class="guide-nav">
            ${stepIndex > 0 ? '<button class="btn btn-sm btn-outline-secondary" id="guidePrevBtn">السابق</button>' : '<div></div>'}
            <button class="btn btn-sm btn-${stepIndex === guideSteps.length - 1 ? 'success' : 'primary'}" id="guideNextBtn">
                ${stepIndex === guideSteps.length - 1 ? 'إنهاء' : 'التالي'}
            </button>
        </div>
    `;
    
    // Position the guide container relative to target
    positionGuideContainer(guideContainer, target, step.attachTo.position);
    
    // Add event listeners to buttons
    if (document.getElementById('guidePrevBtn')) {
        document.getElementById('guidePrevBtn').addEventListener('click', function() {
            target.classList.remove('guide-target');
            showGuideStep(stepIndex - 1);
        });
    }
    
    document.getElementById('guideNextBtn').addEventListener('click', function() {
        target.classList.remove('guide-target');
        showGuideStep(stepIndex + 1);
    });
}

// Position the guide container relative to target
function positionGuideContainer(guide, target, position) {
    const targetRect = target.getBoundingClientRect();
    const guideRect = guide.getBoundingClientRect();
    
    // Calculate position
    let top, left;
    
    switch (position) {
        case 'top':
            top = targetRect.top - guideRect.height - 15;
            left = targetRect.left + (targetRect.width - guideRect.width) / 2;
            break;
        case 'bottom':
            top = targetRect.bottom + 15;
            left = targetRect.left + (targetRect.width - guideRect.width) / 2;
            break;
        case 'left':
            top = targetRect.top + (targetRect.height - guideRect.height) / 2;
            left = targetRect.left - guideRect.width - 15;
            break;
        case 'right':
            top = targetRect.top + (targetRect.height - guideRect.height) / 2;
            left = targetRect.right + 15;
            break;
    }
    
    // Ensure guide stays within viewport
    if (top < 10) top = 10;
    if (left < 10) left = 10;
    if (top + guideRect.height > window.innerHeight - 10) {
        top = window.innerHeight - guideRect.height - 10;
    }
    if (left + guideRect.width > window.innerWidth - 10) {
        left = window.innerWidth - guideRect.width - 10;
    }
    
    // Apply position
    guide.style.top = `${top}px`;
    guide.style.left = `${left}px`;
}

// End the guide
function endGuide() {
    const overlay = document.getElementById('guideOverlay');
    if (overlay) {
        document.body.removeChild(overlay);
        
        // Show completion message
        window.showAchievementNotification('تم إكمال الدليل!', 'أنت الآن جاهز لبدء رحلة تعلم React.js!');
    }
}