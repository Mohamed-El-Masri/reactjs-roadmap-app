// React Learning Progress Tracker - Certificates Module

document.addEventListener('DOMContentLoaded', function() {
    setupCertificateSystem();
    checkForCompletedPhases();
});

// Certificate definitions for each phase
const certificateDefinitions = {
    phase1: {
        title: "شهادة أساسيات React",
        description: "أتم بنجاح المرحلة الأولى من تعلم React وأتقن أساسيات JavaScript وReact Hooks",
        badgeIcon: "fa-solid fa-certificate",
        badgeColor: "#61dafb",
        requiredSkills: 10 // Number of skills to complete in this phase
    },
    phase2: {
        title: "شهادة بناء تطبيقات React",
        description: "أتم بنجاح المرحلة الثانية من تعلم React وأتقن React Router وإدارة النماذج والحالة",
        badgeIcon: "fa-solid fa-medal",
        badgeColor: "#7289da",
        requiredSkills: 12
    },
    phase3: {
        title: "شهادة تفاعل المستخدم في React",
        description: "أتم بنجاح المرحلة الثالثة من تعلم React وأتقن التعامل مع API والتحريكات",
        badgeIcon: "fa-solid fa-award",
        badgeColor: "#4caf50",
        requiredSkills: 12
    },
    phase4: {
        title: "شهادة تحسين تطبيقات React",
        description: "أتم بنجاح المرحلة الرابعة من تعلم React وأتقن أمان وأداء التطبيقات",
        badgeIcon: "fa-solid fa-trophy",
        badgeColor: "#ffc107",
        requiredSkills: 12
    },
    phase5: {
        title: "شهادة خبير React",
        description: "أتم بنجاح كافة مراحل تعلم React وأصبح مطور React متقدم",
        badgeIcon: "fa-solid fa-star",
        badgeColor: "#e91e63",
        requiredSkills: 8
    }
};

// Setup certificate system
function setupCertificateSystem() {
    // Create certificates section in the page
    const certificatesSection = document.createElement('section');
    certificatesSection.id = 'certificates';
    certificatesSection.className = 'py-5';
    certificatesSection.innerHTML = `
        <div class="container">
            <h2 class="text-center mb-5"><i class="fas fa-award me-2"></i>شهاداتي</h2>
            <div class="row g-4" id="certificatesContainer">
                <div class="col-12 text-center text-muted">
                    <p>قم بإكمال مراحل التعلم للحصول على شهادات</p>
                </div>
            </div>
        </div>
    `;

    // Insert before footer
    const footer = document.querySelector('footer');
    if (footer) {
        document.body.insertBefore(certificatesSection, footer);
    } else {
        document.body.appendChild(certificatesSection);
    }

    // Add a button for certificates in navbar
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    if (navbarNav) {
        const certificatesButton = document.createElement('li');
        certificatesButton.className = 'nav-item';
        certificatesButton.innerHTML = `
            <a class="nav-link" href="#certificates">
                <i class="fas fa-certificate"></i> شهاداتي
            </a>
        `;
        navbarNav.appendChild(certificatesButton);
    }

    // Create certificate modal
    const certificateModal = document.createElement('div');
    certificateModal.className = 'modal fade';
    certificateModal.id = 'certificateModal';
    certificateModal.tabIndex = '-1';
    certificateModal.setAttribute('aria-hidden', 'true');
    certificateModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">تهانينا! لقد حصلت على شهادة</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="certificateModalBody">
                    <div class="certificate-container">
                        <div class="certificate">
                            <div class="certificate-header">
                                <h2>شهادة إتمام</h2>
                            </div>
                            <div class="certificate-body">
                                <div class="certificate-icon">
                                    <i class="fas fa-certificate fa-5x"></i>
                                </div>
                                <h3 id="certificateTitle">عنوان الشهادة</h3>
                                <p>تشهد Vyrlo أن</p>
                                <h4 id="certificateUserName">اسم المتعلم</h4>
                                <p id="certificateDescription">وصف الإنجاز</p>
                                <div class="certificate-date">
                                    <p>تاريخ الإصدار: <span id="certificateDate"></span></p>
                                </div>
                            </div>
                            <div class="certificate-footer">
                                <div class="certificate-seal">
                                    <i class="fab fa-react fa-3x"></i>
                                </div>
                                <p>React.js Learning Tracker</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                    <button type="button" class="btn btn-primary" id="downloadCertificateBtn">
                        <i class="fas fa-download me-2"></i>تحميل الشهادة
                    </button>
                    <button type="button" class="btn btn-success" id="shareCertificateBtn">
                        <i class="fas fa-share-alt me-2"></i>مشاركة
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(certificateModal);

    // Add styles for certificates
    addCertificateStyles();

    // Load existing certificates
    loadCertificates();
    
    // Setup event listeners
    document.getElementById('downloadCertificateBtn').addEventListener('click', downloadCertificate);
    document.getElementById('shareCertificateBtn').addEventListener('click', shareCertificate);
}

// Add CSS for certificates
function addCertificateStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .certificate-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .certificate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .certificate-header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #eee;
        }

        .certificate-badge {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            margin-bottom: 15px;
            color: white;
            font-size: 2rem;
        }

        .certificate-body {
            padding: 20px;
            text-align: center;
        }

        .certificate-actions {
            padding: 15px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: center;
            gap: 10px;
        }

        /* Certificate Modal Styles */
        .certificate-container {
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 10px;
        }

        .certificate {
            background-color: white;
            border: 10px solid #61dafb;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
        }

        .certificate-header h2 {
            font-size: 2.5rem;
            color: #282c34;
            margin-bottom: 20px;
            font-family: 'Tajawal', sans-serif;
        }

        .certificate-icon {
            margin: 20px 0;
            color: #61dafb;
        }

        .certificate-body h3 {
            font-size: 1.8rem;
            color: #282c34;
            margin-bottom: 20px;
        }

        .certificate-body h4 {
            font-size: 1.5rem;
            color: #282c34;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .certificate-date {
            margin-top: 30px;
            font-size: 0.9rem;
        }

        .certificate-seal {
            margin: 20px 0;
            color: #61dafb;
        }

        .certificate-footer {
            margin-top: 30px;
        }

        .certificate::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            width: 150px;
            height: 150px;
            background-color: rgba(97, 218, 251, 0.1);
            border-radius: 50%;
            z-index: 0;
        }

        .certificate::after {
            content: '';
            position: absolute;
            bottom: -10px;
            right: -10px;
            width: 150px;
            height: 150px;
            background-color: rgba(97, 218, 251, 0.1);
            border-radius: 50%;
            z-index: 0;
        }
    `;
    document.head.appendChild(styleElement);
}

// Load certificates from storage
function loadCertificates() {
    const earnedCertificates = JSON.parse(localStorage.getItem('reactLearningCertificates')) || {};
    const certificatesContainer = document.getElementById('certificatesContainer');
    
    // Clear container except for the message when no certificates
    if (Object.keys(earnedCertificates).length > 0) {
        certificatesContainer.innerHTML = '';
    }
    
    // Add each earned certificate to the page
    for (const phaseId in earnedCertificates) {
        if (earnedCertificates.hasOwnProperty(phaseId) && certificateDefinitions[phaseId]) {
            const cert = earnedCertificates[phaseId];
            const certDef = certificateDefinitions[phaseId];
            
            const certificateCard = document.createElement('div');
            certificateCard.className = 'col-md-4';
            certificateCard.innerHTML = `
                <div class="certificate-card">
                    <div class="certificate-header">
                        <div class="certificate-badge" style="background-color: ${certDef.badgeColor}">
                            <i class="${certDef.badgeIcon}"></i>
                        </div>
                        <h4>${certDef.title}</h4>
                    </div>
                    <div class="certificate-body">
                        <p>${certDef.description}</p>
                        <p class="text-muted">تاريخ الإصدار: ${new Date(cert.dateEarned).toLocaleDateString('ar-SA')}</p>
                    </div>
                    <div class="certificate-actions">
                        <button class="btn btn-sm btn-primary view-certificate-btn" data-phase="${phaseId}">
                            <i class="fas fa-eye me-1"></i> عرض الشهادة
                        </button>
                    </div>
                </div>
            `;
            
            certificatesContainer.appendChild(certificateCard);
        }
    }
    
    // Add event listeners to view certificate buttons
    document.querySelectorAll('.view-certificate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const phaseId = this.getAttribute('data-phase');
            showCertificate(phaseId);
        });
    });
}

// Check for completed phases to award certificates
function checkForCompletedPhases() {
    const userProgress = JSON.parse(localStorage.getItem('reactLearningProgress')) || {};
    const earnedCertificates = JSON.parse(localStorage.getItem('reactLearningCertificates')) || {};
    let newCertificateEarned = false;
    let newPhaseId = null;
    
    // Get username from storage or use default
    const userName = localStorage.getItem('userName') || 'المتعلم';
    
    // Check each phase
    for (const phaseId in certificateDefinitions) {
        // Skip if certificate already earned
        if (earnedCertificates[phaseId]) continue;
        
        // Count completed skills in this phase
        let completedSkillsInPhase = 0;
        if (userProgress.skills) {
            for (const skillId in userProgress.skills) {
                // Check if skill belongs to this phase (simplified check - would need to map skills to phases in a real app)
                if (skillId.startsWith(phaseId) || 
                    (phaseId === 'phase1' && (skillId.startsWith('js-') || skillId.startsWith('react-') || skillId.startsWith('hook-'))) ||
                    (phaseId === 'phase2' && (skillId.startsWith('router-') || skillId.startsWith('forms-') || skillId.startsWith('state-'))) ||
                    (phaseId === 'phase3' && (skillId.startsWith('api-') || skillId.startsWith('ui-') || skillId.startsWith('anim-'))) ||
                    (phaseId === 'phase4' && (skillId.startsWith('sec-') || skillId.startsWith('perf-') || skillId.startsWith('test-'))) ||
                    (phaseId === 'phase5' && (skillId.startsWith('build-') || skillId.startsWith('adv-')))) {
                    
                    if (userProgress.skills[skillId].completed) {
                        completedSkillsInPhase++;
                    }
                }
            }
        }
        
        // Award certificate if enough skills completed
        if (completedSkillsInPhase >= certificateDefinitions[phaseId].requiredSkills) {
            earnedCertificates[phaseId] = {
                dateEarned: new Date().toISOString(),
                skills: completedSkillsInPhase
            };
            
            newCertificateEarned = true;
            newPhaseId = phaseId;
            
            // Log activity
            if (window.logActivity) {
                window.logActivity(`حصل على شهادة: ${certificateDefinitions[phaseId].title}`);
            }
        }
    }
    
    // Save earned certificates
    if (newCertificateEarned) {
        localStorage.setItem('reactLearningCertificates', JSON.stringify(earnedCertificates));
        loadCertificates(); // Refresh certificates display
        
        // Show congrats modal for the new certificate
        showCertificate(newPhaseId, userName, true);
    }
}

// Show certificate in modal
function showCertificate(phaseId, userName = null, isNew = false) {
    if (!certificateDefinitions[phaseId]) return;
    
    // Get certificate data
    const certDef = certificateDefinitions[phaseId];
    const earnedCertificates = JSON.parse(localStorage.getItem('reactLearningCertificates')) || {};
    const cert = earnedCertificates[phaseId];
    
    if (!cert) return;
    
    // Get username from parameter, storage or use default
    const name = userName || localStorage.getItem('userName') || 'المتعلم';
    
    // Set certificate content
    document.querySelector('#certificateModalBody .certificate-icon i').className = certDef.badgeIcon + ' fa-5x';
    document.querySelector('#certificateModalBody .certificate-icon i').style.color = certDef.badgeColor;
    document.getElementById('certificateTitle').textContent = certDef.title;
    document.getElementById('certificateUserName').textContent = name;
    document.getElementById('certificateDescription').textContent = certDef.description;
    document.getElementById('certificateDate').textContent = new Date(cert.dateEarned).toLocaleDateString('ar-SA');
    
    // Update modal title if it's a new certificate
    if (isNew) {
        document.querySelector('#certificateModal .modal-title').textContent = 'تهانينا! لقد حصلت على شهادة جديدة';
    } else {
        document.querySelector('#certificateModal .modal-title').textContent = 'شهادة إتمام';
    }
    
    // Store current certificate for download/share
    window.currentCertificate = {
        phaseId: phaseId,
        title: certDef.title,
        description: certDef.description,
        userName: name,
        date: new Date(cert.dateEarned).toLocaleDateString('ar-SA')
    };
    
    // Show modal
    const certificateModal = new bootstrap.Modal(document.getElementById('certificateModal'));
    certificateModal.show();
}

// Download certificate as image
function downloadCertificate() {
    if (!window.currentCertificate) return;
    
    // Use html2canvas to create an image from the certificate element
    if (window.html2canvas) {
        const certificateElement = document.querySelector('.certificate');
        
        html2canvas(certificateElement, { 
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
        }).then(canvas => {
            // Convert to image and trigger download
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `شهادة_${window.currentCertificate.title.replace(/\s+/g, '_')}.png`;
            link.click();
        });
    } else {
        // Fallback if html2canvas is not available
        alert('عفوًا، لا يمكن تحميل الشهادة. يرجى المحاولة لاحقًا.');
        
        // Dynamically load html2canvas for next time
        const script = document.createElement('script');
        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
        document.head.appendChild(script);
    }
}

// Share certificate
function shareCertificate() {
    if (!window.currentCertificate) return;
    
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: `شهادة ${window.currentCertificate.title}`,
            text: `لقد حصلت على شهادة ${window.currentCertificate.title} في رحلة تعلم React.js!`,
            // url: window.location.href
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support the Web Share API
        const shareText = `لقد حصلت على شهادة ${window.currentCertificate.title} في رحلة تعلم React.js!`;
        
        // Create a temporary textarea element to copy text to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('تم نسخ نص المشاركة إلى الحافظة');
    }
}

// Expose functions globally
window.checkForCompletedPhases = checkForCompletedPhases;