// React Learning Progress Tracker - Complete Skills Data

// Complete skills data structure for all phases
const completeSkillsData = {
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
                {id: "forms-basic", name: "النماذج الأساسية", description: "التعامل مع الإدخال وإرسال النماذج"},
                {id: "forms-rhf", name: "React Hook Form", description: "إدارة النماذج المعقدة"},
                {id: "forms-validation", name: "التحقق من صحة البيانات", description: "Yup أو Zod"},
                {id: "forms-errors", name: "معالجة الأخطاء", description: "عرض رسائل الخطأ"}
            ]
        },
        stateManagement: {
            name: "إدارة الحالة العامة",
            priority: 3,
            skills: [
                {id: "state-context", name: "Context API", description: "للمشاريع البسيطة والمتوسطة"},
                {id: "state-redux", name: "Redux Toolkit", description: "للمشاريع المعقدة"},
                {id: "state-zustand", name: "Zustand", description: "كبديل أخف وأبسط"},
                {id: "state-recoil", name: "Recoil", description: "إدارة حالة متقدمة من Facebook"}
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
                {id: "ui-styling", name: "CSS Modules / Styled Components", description: "تنسيق المكونات بشكل معزول"},
                {id: "ui-responsive", name: "التصميم المتجاوب", description: "Mobile-first design"},
                {id: "ui-theme", name: "دعم الوضع المظلم", description: "نظام themes"}
            ]
        },
        animation: {
            name: "التحريكات والتأثيرات",
            priority: 2,
            skills: [
                {id: "anim-css", name: "CSS Transitions الأساسية", description: "تأثيرات انتقالية بسيطة"},
                {id: "anim-group", name: "React Transition Group", description: "تحريكات عند إضافة وإزالة العناصر"},
                {id: "anim-framer", name: "Framer Motion", description: "تحريكات متقدمة"},
                {id: "anim-spring", name: "React Spring", description: "تحريكات طبيعية تحاكي الفيزياء"}
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
                {id: "sec-xss", name: "حماية من XSS", description: "تطهير المدخلات وحماية المخرجات"}
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
        },
        deployment: {
            name: "النشر والاستضافة",
            priority: 3,
            skills: [
                {id: "deploy-static", name: "استضافة المواقع الثابتة", description: "Netlify, Vercel, GitHub Pages"},
                {id: "deploy-ci", name: "CI/CD", description: "GitHub Actions, Jenkins"},
                {id: "deploy-docker", name: "Docker", description: "containerization للنشر"},
                {id: "deploy-monitor", name: "مراقبة الأداء", description: "Google Analytics, Sentry"}
            ]
        }
    }
};

// Add additional utilities to assist the progress tracking

// Get all skills as a flat array
function getAllSkills() {
    const allSkills = [];
    
    // For each phase
    for (const phaseId in completeSkillsData) {
        const phase = completeSkillsData[phaseId];
        
        // For each module in phase
        for (const moduleId in phase) {
            const module = phase[moduleId];
            
            // Add all skills from this module
            module.skills.forEach(skill => {
                allSkills.push({
                    id: skill.id,
                    name: skill.name,
                    description: skill.description,
                    module: module.name,
                    moduleId: moduleId,
                    phase: phaseId,
                    priority: module.priority
                });
            });
        }
    }
    
    return allSkills;
}

// Count total skills per phase
function getSkillsCountByPhase() {
    const counts = {};
    
    for (const phaseId in completeSkillsData) {
        let count = 0;
        const phase = completeSkillsData[phaseId];
        
        for (const moduleId in phase) {
            count += phase[moduleId].skills.length;
        }
        
        counts[phaseId] = count;
    }
    
    return counts;
}

// Export for use in other modules
window.completeSkillsData = completeSkillsData;
window.getAllSkills = getAllSkills;
window.getSkillsCountByPhase = getSkillsCountByPhase;
