// React Learning Progress Tracker - Progress Module

// Skills data structure from README
const skillsData = {
    // Phase 1: Foundation
    phase1: {
        javascript: {
            name: "أساسيات JavaScript",
            priority: 5,
            skills: [
                {id: "js-basic", name: "المفاهيم الأساسية", description: "المتغيرات، المصفوفات، الكائنات، الدوال"},
                {id: "js-advanced", name: "المفاهيم المتقدمة", description: "Promises, Async/Await, Destructuring"},
                {id: "js-es6", name: "ES6+", description: "Arrow functions, Template literals, Spread operator"}
            ]
        },
        reactBasics: {
            name: "أساسيات React",
            priority: 5,
            skills: [
                {id: "react-components", name: "Components", description: "البنية الأساسية + أنماط تقسيم المكونات"},
                {id: "react-jsx", name: "JSX", description: "قواعد كتابة JSX + تحويل HTML إلى JSX"},
                {id: "react-props", name: "Props", description: "تمرير البيانات + PropTypes"},
                {id: "react-state", name: "State", description: "إدارة حالة المكون + useState"}
            ]
        },
        hooks: {
            name: "React Hooks الأساسية",
            priority: 4,
            skills: [
                {id: "hook-usestate", name: "useState", description: "إدارة الحالة المحلية"},
                {id: "hook-useeffect", name: "useEffect", description: "مع تركيز على تنظيف الآثار الجانبية"},
                {id: "hook-useref", name: "useRef", description: "للوصول المباشر للعناصر"},
                {id: "hook-usecontext", name: "useContext", description: "للحالة المشتركة البسيطة"}
            ]
        }
    },
    
    // Phase 2: Building
    phase2: {
        router: {
            name: "التوجيه - React Router",
            priority: 4,
            skills: [
                {id: "router-setup", name: "إعداد Router", description: "BrowserRouter, Routes, Route"},
                {id: "router-params", name: "المسارات الديناميكية", description: "useParams"},
                {id: "router-nested", name: "التوجيه المتداخل", description: "Outlet"},
                {id: "router-protected", name: "المسارات المحمية", description: "حماية الصفحات الخاصة"}
            ]
        },
        forms: {
            name: "إدارة النماذج",
            priority: 4,
            skills: [
                {id: "forms-rhf", name: "React Hook Form", description: "إدارة النماذج المعقدة"},
                {id: "forms-validation", name: "التحقق من صحة البيانات", description: "Yup أو Zod"},
                {id: "forms-errors", name: "معالجة الأخطاء", description: "عرض رسائل الخطأ"},
                {id: "forms-loading", name: "التعامل مع التحميل", description: "حالات التحميل"}
            ]
        },
        stateManagement: {
            name: "إدارة الحالة العامة",
            priority: 3,
            skills: [
                {id: "state-context", name: "Context API", description: "للمشاريع البسيطة والمتوسطة"},
                {id: "state-redux", name: "Redux Toolkit", description: "للمشاريع المعقدة"},
                {id: "state-zustand", name: "Zustand", description: "كبديل أخف وأبسط"},
                {id: "state-compare", name: "مقارنة الحلول", description: "فهم متى تستخدم كل حل"}
            ]
        }
    },
    
    // Phase 3: Interaction
    phase3: {
        api: {
            name: "التعامل مع API",
            priority: 4,
            skills: [
                {id: "api-fetch", name: "Fetch API و Axios", description: "أساسيات التعامل مع REST"},
                {id: "api-query", name: "React Query", description: "تخزين مؤقت والتحسين"},
                {id: "api-errors", name: "تعامل مع الأخطاء", description: "معالجة استجابات الخادم"},
                {id: "api-loading", name: "معالجة حالات التحميل", description: "skeletons و loaders"}
            ]
        },
        ui: {
            name: "واجهة المستخدم متقدمة",
            priority: 3,
            skills: [
                {id: "ui-libraries", name: "مكتبات UI", description: "Material-UI أو Chakra UI"},
                {id: "ui-styling", name: "CSS Modules أو Styled Components", description: ""},
                {id: "ui-responsive", name: "التصميم المتجاوب", description: "Mobile-first design"},
                {id: "ui-theme", name: "دعم الوضع المظلم", description: "نظام themes"}
            ]
        },
        animation: {
            name: "التحريكات والتأثيرات",
            priority: 2,
            skills: [
                {id: "anim-css", name: "CSS Transitions الأساسية", description: ""},
                {id: "anim-group", name: "React Transition Group", description: ""},
                {id: "anim-framer", name: "Framer Motion", description: "تحريكات متقدمة"},
                {id: "anim-perf", name: "أداء التحريكات", description: "تحسين الأداء"}
            ]
        }
    },
    
    // Phase 4: Optimization
    phase4: {
        security: {
            name: "أمان وتوثيق",
            priority: 4,
            skills: [
                {id: "sec-jwt", name: "JWT Authentication", description: "تخزين وتجديد التوكن"},
                {id: "sec-oauth", name: "OAuth", description: "تكامل مع مواقع خارجية"},
                {id: "sec-routes", name: "حماية المسارات", description: "تحقق من الصلاحيات"},
                {id: "sec-cors", name: "التعامل مع الـ CORS", description: "فهم قضايا الأمان"}
            ]
        },
        performance: {
            name: "تحسين الأداء",
            priority: 3,
            skills: [
                {id: "perf-memo", name: "React.memo", description: "منع إعادة العرض غير المطلوبة"},
                {id: "perf-hooks", name: "useCallback و useMemo", description: "تخزين مؤقت للدوال والقيم"},
                {id: "perf-split", name: "Code splitting", description: "تحميل المكونات عند الطلب"},
                {id: "perf-lazy", name: "Lazy Loading", description: "للصور والمكونات الثقيلة"}
            ]
        },
        testing: {
            name: "الاختبار",
            priority: 2,
            skills: [
                {id: "test-jest", name: "Jest", description: "اختبارات الوحدة"},
                {id: "test-rtl", name: "React Testing Library", description: "اختبار المكونات"},
                {id: "test-msw", name: "Mock Service Worker", description: "محاكاة الطلبات"},
                {id: "test-cypress", name: "Cypress", description: "اختبارات E2E"}
            ]
        }
    },
    
    // Phase 5: Deployment & Production
    phase5: {
        build: {
            name: "بناء للإنتاج",
            priority: 3,
            skills: [
                {id: "build-webpack", name: "Webpack", description: "تكوين البناء الأمثل"},
                {id: "build-bundle", name: "تحليل الحزم", description: "تحديد وحل المشكلات"},
                {id: "build-perf", name: "تحسين الأداء", description: "Lighthouse score"},
                {id: "build-seo", name: "SEO للتطبيقات", description: "React Helmet"}
            ]
        },
        advanced: {
            name: "مهارات متقدمة",
            priority: 2,
            skills: [
                {id: "adv-hooks", name: "Custom Hooks", description: "بناء hooks خاصة"},
                {id: "adv-typescript", name: "TypeScript", description: "إضافة أنواع البيانات"},
                {id: "adv-ssr", name: "Server-Side Rendering", description: "Next.js"},
                {id: "adv-graphql", name: "GraphQL", description: "Apollo Client"}
            ]
        }
    }
};

// Initialize skills data
document.addEventListener('DOMContentLoaded', function() {
    populateSkillsData();
    setupSkillFilters();
    setupSkillSearch();
    setupProgressLevelButtons();
    
    // Update skill progress buttons for better UX
    updateProgressButtonsVisibility();
});

// Populate all skills from the data
function populateSkillsData() {
    // Phase 1: Foundation
    populatePhaseSkills('phase1', skillsData.phase1);
    
    // Phase 2: Building
    populatePhaseSkills('phase2', skillsData.phase2);
    
    // Phase 3: Interaction
    populatePhaseSkills('phase3', skillsData.phase3);
    
    // Phase 4: Optimization
    populatePhaseSkills('phase4', skillsData.phase4);
    
    // Phase 5: Deployment & Production
    populatePhaseSkills('phase5', skillsData.phase5);
    
    // After populating all skills, load saved progress
    loadSavedSkillProgress();
}

// Load saved skill progress from localStorage
function loadSavedSkillProgress() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    if (!userProgress.skills) return;
    
    // For each saved skill, update the UI
    Object.keys(userProgress.skills).forEach(skillId => {
        const skillData = userProgress.skills[skillId];
        const skillElement = document.getElementById(`skill-${skillId}`);
        
        if (skillElement) {
            // Update progress bar and text
            const progressBar = skillElement.querySelector('.progress-bar');
            const progressText = skillElement.querySelector('.progress-text');
            if (progressBar && progressText) {
                progressBar.style.width = `${skillData.progress}%`;
                progressText.textContent = `${skillData.progress}%`;
            }
            
            // Update checkbox
            const checkbox = skillElement.querySelector('.form-check-input');
            if (checkbox) {
                checkbox.checked = skillData.completed;
            }
            
            // Add appropriate progress class
            skillElement.classList.remove('progress-level-0', 'progress-level-25', 'progress-level-50', 'progress-level-75', 'progress-level-100');
            
            // Add progress level class
            if (skillData.progress === 0) skillElement.classList.add('progress-level-0');
            else if (skillData.progress <= 25) skillElement.classList.add('progress-level-25');
            else if (skillData.progress <= 50) skillElement.classList.add('progress-level-50');
            else if (skillData.progress <= 75) skillElement.classList.add('progress-level-75');
            else skillElement.classList.add('progress-level-100');
        }
    });
    
    // Calculate phase progress and update charts
    calculatePhaseProgress();
}

// Calculate and update phase progress
function calculatePhaseProgress() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    if (!userProgress.skills) return;
    
    const phaseProgress = [0, 0, 0, 0, 0]; // For the 5 phases
    const skillLevels = [0, 0, 0, 0, 0, 0, 0, 0]; // For the 8 skill categories
    
    // Map skills to their respective phases and categories
    const skillPhaseMapping = {
        'js': 0, // JavaScript - Phase 1 - Category 0
        'react': 0, // React - Phase 1 - Category 1
        'hook': 0, // Hooks - Phase 1
        'router': 1, // Router - Phase 2 - Category 2
        'forms': 1, // Forms - Phase 2 - Category 3
        'state': 1, // State Management - Phase 2 - Category 4
        'api': 2, // API - Phase 3 - Category 5
        'ui': 2, // UI - Phase 3 - Category 6
        'anim': 2, // Animation - Phase 3
        'sec': 3, // Security - Phase 4
        'perf': 3, // Performance - Phase 4 - Category 7
        'test': 3, // Testing - Phase 4
        'build': 4, // Build - Phase 5
        'adv': 4 // Advanced - Phase 5
    };
    
    // Map skills to skill categories for the radar chart
    const skillCategoryMapping = {
        'js': 0, // JavaScript
        'react': 1, // React
        'router': 2, // Router
        'forms': 3, // Forms
        'state': 4, // State Management
        'api': 5, // API
        'ui': 6, // UI
        'perf': 7 // Performance
    };
    
    // Count skills and progress for each phase
    const phaseSkillCounts = [0, 0, 0, 0, 0];
    const phaseSkillSums = [0, 0, 0, 0, 0];
    
    // Count skills and progress for each category
    const categorySkillCounts = [0, 0, 0, 0, 0, 0, 0, 0];
    const categorySkillSums = [0, 0, 0, 0, 0, 0, 0, 0];
    
    // Process all skills
    Object.keys(userProgress.skills).forEach(skillId => {
        const skill = userProgress.skills[skillId];
        
        // Find which phase this skill belongs to
        let phaseIndex = -1;
        for (const prefix in skillPhaseMapping) {
            if (skillId.startsWith(prefix)) {
                phaseIndex = skillPhaseMapping[prefix];
                break;
            }
        }
        
        // If we found a valid phase, add the skill's progress
        if (phaseIndex >= 0) {
            phaseSkillCounts[phaseIndex]++;
            phaseSkillSums[phaseIndex] += skill.progress;
        }
        
        // Find which category this skill belongs to (for radar chart)
        let categoryIndex = -1;
        for (const prefix in skillCategoryMapping) {
            if (skillId.startsWith(prefix)) {
                categoryIndex = skillCategoryMapping[prefix];
                break;
            }
        }
        
        // If we found a valid category, add the skill's progress
        if (categoryIndex >= 0) {
            categorySkillCounts[categoryIndex]++;
            categorySkillSums[categoryIndex] += skill.progress;
        }
    });
    
    // Calculate average progress for each phase
    for (let i = 0; i < 5; i++) {
        if (phaseSkillCounts[i] > 0) {
            phaseProgress[i] = Math.round(phaseSkillSums[i] / phaseSkillCounts[i]);
        }
    }
    
    // Calculate average progress for each category
    for (let i = 0; i < 8; i++) {
        if (categorySkillCounts[i] > 0) {
            skillLevels[i] = Math.round(categorySkillSums[i] / categorySkillCounts[i]);
        }
    }
    
    // Save the calculated progress
    userProgress.phaseProgress = phaseProgress;
    userProgress.skillsLevels = skillLevels;
    localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    
    // Update the charts
    if (window.phasesChart) {
        window.phasesChart.data.datasets[0].data = phaseProgress;
        window.phasesChart.update();
    }
    
    if (window.skillsChart) {
        window.skillsChart.data.datasets[0].data = skillLevels;
        window.skillsChart.update();
    }
}

// Populate skills for a specific phase
function populatePhaseSkills(phaseId, phaseData) {
    const phaseElement = document.getElementById(phaseId);
    if (!phaseElement) return;
    
    const accordionId = `accordion${phaseId.charAt(0).toUpperCase() + phaseId.slice(1)}`;
    
    // تحقق مما إذا كان الأكورديون موجودًا بالفعل
    let accordionElement = document.getElementById(accordionId);
    
    // إذا كان الأكورديون موجودًا بالفعل وهو المرحلة الأولى، قم فقط بإضافة المستمعين وتجنب إعادة الإنشاء
    if (accordionElement && phaseId === 'phase1') {
        // فقط إضافة مستمعي الأحداث للمرحلة الأولى بدلاً من إعادة إنشاء العناصر
        setupExistingPhaseOneListeners();
        return;
    }
    
    // إنشاء الأكورديون إذا لم يكن موجودًا
    accordionElement = accordionElement || document.createElement('div');
    accordionElement.className = 'accordion';
    accordionElement.id = accordionId;
    
    // إنشاء عناصر الأكورديون لكل وحدة في المرحلة
    let index = 0;
    for (const moduleKey in phaseData) {
        const module = phaseData[moduleKey];
        const moduleId = `collapse${moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1)}`;
        
        // Create module item
        const moduleItem = document.createElement('div');
        moduleItem.className = 'accordion-item';
        
        // Create module header
        const starRating = '⭐'.repeat(module.priority);
        const priorityText = getPriorityText(module.priority);
        
        moduleItem.innerHTML = `
            <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${moduleId}">
                    <div class="d-flex align-items-center justify-content-between w-100">
                        <span><i class="${getModuleIcon(moduleKey)} me-2"></i> ${module.name}</span>
                        <span class="badge bg-primary ms-2">${priorityText} ${starRating}</span>
                    </div>
                </button>
            </h3>
            <div id="${moduleId}" class="accordion-collapse collapse">
                <div class="accordion-body"></div>
            </div>
        `;
        
        accordionElement.appendChild(moduleItem);
        
        // Add skills to the module
        const moduleBody = moduleItem.querySelector('.accordion-body');
        module.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item mb-4';
            skillItem.id = `skill-${skill.id}`;
            
            skillItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5>${skill.name}</h5>
                    <div class="progress-tracker d-flex align-items-center">
                        <div class="progress-buttons me-2">
                            <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="25">25%</button>
                            <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="50">50%</button>
                            <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="75">75%</button>
                            <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="100">100%</button>
                        </div>
                        <span class="progress-text">0%</span>
                        <div class="form-check form-switch ms-2">
                            <input class="form-check-input" type="checkbox" role="switch" data-skill="${skill.id}">
                        </div>
                    </div>
                </div>
                ${skill.description ? `<p>${skill.description}</p>` : ''}
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
            `;
            
            moduleBody.appendChild(skillItem);
        });
        
        index++;
    }
    
    phaseElement.appendChild(accordionElement);
}

// إضافة مستمعي الأحداث للعناصر الموجودة في المرحلة الأولى
function setupExistingPhaseOneListeners() {
    // إضافة مستمعي أحداث للمهارات الموجودة في HTML
    const jsSkills = ['js-basic', 'js-advanced', 'js-es6'];
    const reactSkills = ['react-components', 'react-jsx', 'react-props', 'react-state'];
    const hookSkills = ['hook-usestate', 'hook-useeffect', 'hook-useref', 'hook-usecontext'];
    
    // دمج جميع المهارات في مصفوفة واحدة
    const allPhaseOneSkills = [...jsSkills, ...reactSkills, ...hookSkills];
    
    // إضافة مستمعي الأحداث لكل مهارة
    allPhaseOneSkills.forEach(skillId => {
        const skillElement = document.getElementById(`skill-${skillId}`);
        if (skillElement) {
            // إضافة تفعيل مستمعي الأحداث للتحقق والأزرار هنا
            setupSkillListeners(skillElement, skillId);
        }
    });
    
    console.log('تم إعداد مستمعي الأحداث للمرحلة الأولى بنجاح');
}

// إعداد مستمعي الأحداث لمهارة محددة
function setupSkillListeners(skillElement, skillId) {
    // إضافة مستمع حدث للتحقق
    const checkbox = skillElement.querySelector('.form-check-input');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            const isCompleted = this.checked;
            updateSkillInStorage(skillId, isCompleted ? 100 : 0, isCompleted);
            
            // تحديث شريط التقدم وفقًا للحالة
            const progressBar = skillElement.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = isCompleted ? '100%' : '0%';
            }
            
            // تحديث النص
            const progressText = skillElement.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = isCompleted ? '100%' : '0%';
            }
            
            // تسجيل النشاط
            const skillName = skillElement.querySelector('h5').textContent;
            window.logActivity(isCompleted ? `أكمل مهارة: ${skillName}` : `أعاد تعيين مهارة: ${skillName}`);
            
            // حساب التقدم الكلي
            if (window.calculateTotalProgress) {
                window.calculateTotalProgress();
            }
        });
    }
    
    // إعداد أزرار التقدم إذا كانت موجودة
    const progressButtons = skillElement.querySelectorAll('.progress-btn');
    if (progressButtons.length > 0) {
        progressButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const progress = parseInt(this.getAttribute('data-progress'));
                updateSkillProgress(skillElement, progress);
                updateSkillInStorage(skillId, progress, progress === 100);
                
                // تسجيل النشاط
                const skillName = skillElement.querySelector('h5').textContent;
                window.logActivity(`تحديث تقدم ${skillName} إلى ${progress}%`);
            });
        });
    }
}

// Get icon for a module based on its key
function getModuleIcon(moduleKey) {
    const icons = {
        javascript: 'fab fa-js-square text-warning',
        reactBasics: 'fab fa-react text-info',
        hooks: 'fas fa-code text-success',
        router: 'fas fa-route text-primary',
        forms: 'fas fa-clipboard-list text-danger',
        stateManagement: 'fas fa-database text-info',
        api: 'fas fa-cloud text-primary',
        ui: 'fas fa-paint-brush text-success',
        animation: 'fas fa-film text-warning',
        security: 'fas fa-shield-alt text-danger',
        performance: 'fas fa-tachometer-alt text-success',
        testing: 'fas fa-vial text-info',
        build: 'fas fa-hammer text-warning',
        advanced: 'fas fa-graduation-cap text-primary'
    };
    
    return icons[moduleKey] || 'fas fa-code';
}

// Get priority text based on priority level (1-5)
function getPriorityText(priority) {
    const priorities = [
        'أولوية منخفضة جداً',
        'أولوية منخفضة',
        'أولوية متوسطة',
        'أولوية عالية',
        'أولوية قصوى'
    ];
    
    return priorities[priority - 1] || 'أولوية متوسطة';
}

// Set up skill filters
function setupSkillFilters() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'skill-filters mb-4';
    filterContainer.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-auto">
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-primary active" data-filter="all">الكل</button>
                    <button type="button" class="btn btn-outline-primary" data-filter="completed">المكتملة</button>
                    <button type="button" class="btn btn-outline-primary" data-filter="in-progress">قيد التقدم</button>
                    <button type="button" class="btn btn-outline-primary" data-filter="not-started">لم تبدأ بعد</button>
                </div>
            </div>
            <div class="col-md-auto">
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary" data-sort="priority">ترتيب حسب الأولوية</button>
                    <button type="button" class="btn btn-outline-secondary" data-sort="progress">ترتيب حسب التقدم</button>
                </div>
            </div>
        </div>
    `;
    
    const roadmapSection = document.getElementById('roadmap');
    const tabsContainer = roadmapSection.querySelector('.tab-content').previousElementSibling;
    tabsContainer.parentNode.insertBefore(filterContainer, tabsContainer.nextSibling);
    
    // Add event listeners for filters
    filterContainer.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterContainer.querySelectorAll('[data-filter]').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterSkills(filter);
        });
    });
    
    // Add event listeners for sorting
    filterContainer.querySelectorAll('[data-sort]').forEach(button => {
        button.addEventListener('click', function() {
            const sort = this.getAttribute('data-sort');
            sortSkills(sort);
        });
    });
}

// Filter skills based on progress status
function filterSkills(filter) {
    const allSkillItems = document.querySelectorAll('.skill-item');
    
    allSkillItems.forEach(skillItem => {
        const progressText = skillItem.querySelector('.progress-text').textContent;
        const progress = parseInt(progressText);
        
        switch (filter) {
            case 'completed':
                skillItem.style.display = progress === 100 ? '' : 'none';
                break;
            case 'in-progress':
                skillItem.style.display = (progress > 0 && progress < 100) ? '' : 'none';
                break;
            case 'not-started':
                skillItem.style.display = progress === 0 ? '' : 'none';
                break;
            case 'all':
            default:
                skillItem.style.display = '';
                break;
        }
    });
}

// Sort skills based on priority or progress
function sortSkills(sort) {
    // Implementation will depend on the structure and requirements
    // This is a simplified version
    const phases = document.querySelectorAll('.tab-pane');
    
    phases.forEach(phase => {
        const modules = phase.querySelectorAll('.accordion-item');
        
        modules.forEach(module => {
            const skills = Array.from(module.querySelectorAll('.skill-item'));
            const skillsContainer = module.querySelector('.accordion-body');
            
            if (sort === 'priority') {
                // Sort by priority - using the data from our skillsData object
                // For simplification, just reorder based on their current order
                // In a real app, you'd need to map these to actual priority values
            } else if (sort === 'progress') {
                // Sort by progress
                skills.sort((a, b) => {
                    const progressA = parseInt(a.querySelector('.progress-text').textContent);
                    const progressB = parseInt(b.querySelector('.progress-text').textContent);
                    return progressB - progressA; // Descending order
                });
                
                // Reappend in new order
                skills.forEach(skill => {
                    skillsContainer.appendChild(skill);
                });
            }
        });
    });
}

// Setup skill search functionality
function setupSkillSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'skill-search mb-4';
    searchContainer.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                    <input type="text" class="form-control" id="skillSearchInput" placeholder="ابحث عن مهارة...">
                </div>
            </div>
        </div>
    `;
    
    const roadmapSection = document.getElementById('roadmap');
    const headingElement = roadmapSection.querySelector('h2');
    headingElement.parentNode.insertBefore(searchContainer, headingElement.nextSibling);
    
    // Add event listener for search input
    const searchInput = document.getElementById('skillSearchInput');
    searchInput.addEventListener('input', function() {
        searchSkills(this.value.trim().toLowerCase());
    });
}

// Search skills by name or description
function searchSkills(query) {
    const allSkillItems = document.querySelectorAll('.skill-item');
    
    if (!query) {
        // If query is empty, show all skills
        allSkillItems.forEach(item => {
            item.style.display = '';
        });
        return;
    }
    
    allSkillItems.forEach(skillItem => {
        const skillName = skillItem.querySelector('h5').textContent.toLowerCase();
        const skillDescription = skillItem.querySelector('p') 
            ? skillItem.querySelector('p').textContent.toLowerCase() 
            : '';
        
        if (skillName.includes(query) || skillDescription.includes(query)) {
            skillItem.style.display = '';
        } else {
            skillItem.style.display = 'none';
        }
    });
}

// Setup progress level buttons
function setupProgressLevelButtons() {
    // Add event listeners to all progress buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('progress-btn')) {
            const progress = parseInt(event.target.getAttribute('data-progress'));
            const skillItem = event.target.closest('.skill-item');
            const skillId = skillItem.id.replace('skill-', '');
            
            // Update UI
            updateSkillProgress(skillItem, progress);
            
            // Update storage
            updateSkillInStorage(skillId, progress, progress === 100);
            
            // Log activity
            const skillName = skillItem.querySelector('h5').textContent;
            logActivity(`تحديث تقدم ${skillName} إلى ${progress}%`);
        }
    });
}

// Update skill progress in the UI (delegate to main.js)
function updateSkillProgress(skillItem, progress) {
    if (typeof window.updateSkillUI === 'function') { // تغيير اسم الدالة لتجنب الاستدعاء المتكرر
        window.updateSkillUI(skillItem, progress);
    } else {
        // Fallback if the main function isn't available
        const progressBar = skillItem.querySelector('.progress-bar');
        const progressText = skillItem.querySelector('.progress-text');
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${progress}%`;
        
        // Update checkbox
        const checkbox = skillItem.querySelector('.form-check-input');
        if (checkbox) checkbox.checked = progress === 100;
        
        // Update progress class
        skillItem.classList.remove('progress-level-0', 'progress-level-25', 'progress-level-50', 'progress-level-75', 'progress-level-100');
        
        // إضافة صنف مستوى التقدم المناسب
        if (progress === 0) skillItem.classList.add('progress-level-0');
        else if (progress <= 25) skillItem.classList.add('progress-level-25');
        else if (progress <= 50) skillItem.classList.add('progress-level-50');
        else if (progress <= 75) skillItem.classList.add('progress-level-75');
        else skillItem.classList.add('progress-level-100');
    }
}

// Update skill in localStorage (delegate to main.js)
function updateSkillInStorage(skillId, progress, completed) {
    if (typeof window.updateSkillInStorage === 'function') {
        window.updateSkillInStorage(skillId, progress, completed);
    } else {
        // Fallback if the main function isn't available
        const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {
            skills: {}
        };
        
        userProgress.skills[skillId] = {
            progress: progress,
            completed: completed,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('reactLearningProgress', JSON.stringify(userProgress));
    }
}

// Log user activity safely (prevent infinite recursion)
function logActivity(description) {
    // Check if we're already in a logging operation to avoid recursion
    if (window._isLogging) {
        console.warn('Avoiding recursive logging call:', description);
        return;
    }
    
    // Set logging flag
    window._isLogging = true;
    
    try {
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
        
        // Update UI if available but don't call logActivity again
        const timeline = document.getElementById('activityTimeline');
        if (timeline) {
            updateActivityTimelineUi(userProgress.activities);
        }
    } catch (error) {
        console.error('Error logging activity:', error);
    } finally {
        // Reset logging flag
        window._isLogging = false;
    }
}

// Separate function for updating timeline UI to avoid recursion
function updateActivityTimelineUi(activities) {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;
    
    if (activities.length === 0) {
        timeline.innerHTML = '<p class="text-center text-muted">لم تسجل أي نشاط بعد</p>';
        return;
    }
    
    // Clear timeline
    timeline.innerHTML = '';
    
    // Add activities
    activities.slice(0, 20).forEach((activity, index) => {
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

// Update the original function to use the safe version
window.logActivity = logActivity;

// Make necessary functions available to main.js
window.populateSkillsData = populateSkillsData;
window.filterSkills = filterSkills;
window.sortSkills = sortSkills;
window.searchSkills = searchSkills;

// Update progress buttons visibility for better UX
function updateProgressButtonsVisibility() {
    // Add hover effect to all skill items to show progress buttons only on hover
    const style = document.createElement('style');
    style.textContent = `
        .skill-item .progress-buttons {
            display: none;
            transition: opacity 0.2s ease;
        }
        
        .skill-item:hover .progress-buttons {
            display: inline-block;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Set up progress buttons on all skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        const progressTracker = item.querySelector('.progress-tracker');
        if (!progressTracker) return;
        
        // Create progress buttons container if it doesn't exist
        let progressButtons = item.querySelector('.progress-buttons');
        if (!progressButtons) {
            progressButtons = document.createElement('div');
            progressButtons.className = 'progress-buttons me-2';
            
            // Add progress buttons
            progressButtons.innerHTML = `
                <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="25">25%</button>
                <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="50">50%</button>
                <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="75">75%</button>
                <button class="btn btn-sm btn-outline-secondary progress-btn" data-progress="100">100%</button>
            `;
            
            // Insert before the progress text
            const progressText = item.querySelector('.progress-text');
            if (progressText) {
                progressTracker.insertBefore(progressButtons, progressText);
            }
        }
    });
}

// تحديث النافذة للإشارة إلى الوظيفة بالاسم الصحيح
window.updateSkillUI = function(skillItem, progress) {
    const progressBar = skillItem.querySelector('.progress-bar');
    const progressText = skillItem.querySelector('.progress-text');
    
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `${progress}%`;
    
    // Update checkbox
    const checkbox = skillItem.querySelector('.form-check-input');
    if (checkbox) checkbox.checked = progress === 100;
    
    // Update progress class
    skillItem.classList.remove('progress-level-0', 'progress-level-25', 'progress-level-50', 'progress-level-75', 'progress-level-100');
    
    if (progress === 0) skillItem.classList.add('progress-level-0');
    else if (progress <= 25) skillItem.classList.add('progress-level-25');
    else if (progress <= 50) skillItem.classList.add('progress-level-50');
    else if (progress <= 75) skillItem.classList.add('progress-level-75');
    else skillItem.classList.add('progress-level-100');
};