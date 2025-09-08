// Template definitions
const TEMPLATES = {
  '1': { 
    name: 'Executive Tech',
    colors: {
      '--primary-color': '#4361ee',
      '--secondary-color': '#3a0ca3',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#4895ef',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #4361ee, #3a0ca3)',
      '--header-text': 'white'
    }
  },
  '2': { 
    name: '3D Tech Portfolio',
    colors: {
      '--primary-color': '#4895ef',
      '--secondary-color': '#4361ee',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#4cc9f0',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #4895ef, #4361ee)',
      '--header-text': 'white'
    }
  },
  '3': { 
    name: 'AI Developer',
    colors: {
      '--primary-color': '#3a0ca3',
      '--secondary-color': '#4cc9f0',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#f72585',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #3a0ca3, #4cc9f0)',
      '--header-text': 'white'
    }
  },
  '4': { 
    name: 'Full Stack Pro',
    colors: {
      '--primary-color': '#f72585',
      '--secondary-color': '#4361ee',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#4cc9f0',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #f72585, #4361ee)',
      '--header-text': 'white'
    }
  },
  '5': { 
    name: 'Data Scientist',
    colors: {
      '--primary-color': '#4cc9f0',
      '--secondary-color': '#4361ee',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#f72585',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #4cc9f0, #4361ee)',
      '--header-text': 'white'
    }
  },
  '6': { 
    name: 'Cyber Security',
    colors: {
      '--primary-color': '#212529',
      '--secondary-color': '#4361ee',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#f72585',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #212529, #4361ee)',
      '--header-text': 'white'
    }
  },
  '7': { 
    name: 'Blockchain Dev',
    colors: {
      '--primary-color': '#7209b7',
      '--secondary-color': '#4361ee',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#4cc9f0',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #7209b7, #4361ee)',
      '--header-text': 'white'
    }
  },
  '8': { 
    name: 'Tech Executive',
    colors: {
      '--primary-color': '#f8961e',
      '--secondary-color': '#f94144',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#4361ee',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #f8961e, #f94144)',
      '--header-text': 'white'
    }
  },
  '9': { 
    name: 'Minimalist Tech',
    colors: {
      '--primary-color': '#2ec4b6',
      '--secondary-color': '#e71d36',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#ff9f1c',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #2ec4b6, #e71d36)',
      '--header-text': 'white'
    }
  },
  '10': { 
    name: 'DevOps Engineer',
    colors: {
      '--primary-color': '#ff9f1c',
      '--secondary-color': '#2ec4b6',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#4361ee',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #ff9f1c, #2ec4b6)',
      '--header-text': 'white'
    }
  },
  '11': { 
    name: 'Dark Mode Pro',
    colors: {
      '--primary-color': '#011627',
      '--secondary-color': '#ff3366',
      '--background-color': '#121212',
      '--text-color': '#e0e0e0',
      '--accent-color': '#2ec4b6',
      '--card-bg': '#1e1e1e',
      '--border-color': '#333',
      '--header-bg': 'linear-gradient(135deg, #011627, #ff3366)',
      '--header-text': 'white'
    }
  },
  '12': { 
    name: 'UX Engineer',
    colors: {
      '--primary-color': '#20a4f3',
      '--secondary-color': '#59cd90',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#ff9f1c',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #20a4f3, #59cd90)',
      '--header-text': 'white'
    }
  },
  '13': { 
    name: 'Game Developer',
    colors: {
      '--primary-color': '#540d6e',
      '--secondary-color': '#ee4266',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#ffd23f',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #540d6e, #ee4266)',
      '--header-text': 'white'
    }
  },
  '14': { 
    name: 'Mobile Developer',
    colors: {
      '--primary-color': '#0b1354',
      '--secondary-color': '#f765a3',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#a155b9',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #0b1354, #f765a3)',
      '--header-text': 'white'
    }
  },
  '15': { 
    name: 'Cloud Architect',
    colors: {
      '--primary-color': '#114b5f',
      '--secondary-color': '#1a936f',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#88d498',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #114b5f, #1a936f)',
      '--header-text': 'white'
    }
  },
  '16': { 
    name: 'Tech Educator',
    colors: {
      '--primary-color': '#5c6bc0',
      '--secondary-color': '#26a69a',
      '--background-color': '#f8f9fa',
      '--text-color': '#212529',
      '--accent-color': '#ffa726',
      '--card-bg': 'white',
      '--border-color': '#e9ecef',
      '--header-bg': 'linear-gradient(135deg, #5c6bc0, #26a69a)',
      '--header-text': 'white'
    }
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  applyTemplateDesign();
  loadResumeData();
  setupEventListeners();
});

function applyTemplateDesign() {
  const templateNumber = localStorage.getItem('selectedTemplate') || '1';
  const template = TEMPLATES[templateNumber];
  const root = document.documentElement;
  
  for (const [property, value] of Object.entries(template.colors)) {
    root.style.setProperty(property, value);
  }
}

function loadResumeData() {
  setTimeout(() => {
    const resumeData = JSON.parse(localStorage.getItem('resumeData'));
    
    if (resumeData) {
      populateResume(resumeData);
      localStorage.removeItem('comingFromForm');
    } else {
      handleMissingResumeData();
    }
  }, 100);
}

function handleMissingResumeData() {
  const fromForm = localStorage.getItem('comingFromForm');
  if (fromForm) {
    setTimeout(() => {
      const retryData = JSON.parse(localStorage.getItem('resumeData'));
      if (retryData) {
        populateResume(retryData);
        localStorage.removeItem('comingFromForm');
      } else {
        alert('No resume data found. Please fill out the form first.');
        window.location.href = 'resume.html';
      }
    }, 500);
  } else {
    alert('No resume data found. Please fill out the form first.');
    window.location.href = 'resume.html';
  }
}

function setupEventListeners() {
  // Main buttons
  document.getElementById('generateResumeBtn').addEventListener('click', generatePDF);
  document.getElementById('changeTemplateBtn').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('returnUrl', window.location.href);
    window.location.href = 'template.html';
  });
}

function populateResume(resumeData) {
  // Personal Info
  populatePersonalInfo(resumeData.personalInfo);
  
  // About Me
  document.getElementById('about-display').textContent = 
    resumeData.aboutMe?.personalSummary || 'A brief introduction about yourself...';
  document.getElementById('strengths-display').textContent = 
    resumeData.aboutMe?.keyStrengths || 'Your key strengths...';
  
  // Professional Info
  document.getElementById('objective-display').textContent = 
    resumeData.summary?.objective || 'Your career objective...';
  
  populateSection('education-display', resumeData.education, 'degree', 'institution');
  populateSection('experience-display', resumeData.experience, 'title', 'company');
  populateSkills(resumeData.skills);
  populateProjects(resumeData.projects);
  
  // Languages
  document.getElementById('languages-display').innerHTML = 
    resumeData.summary?.languages || 'Languages you speak...';
}

function populatePersonalInfo(personalInfo) {
  document.getElementById('profile-image-display').src = personalInfo?.profileImage || '';
  document.getElementById('name-display').textContent = 
    `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim() || 'Your Name';
  document.getElementById('phone-display').textContent = personalInfo?.phone || '(123) 456-7890';
  document.getElementById('email-display').textContent = personalInfo?.email || 'email@example.com';
  document.getElementById('location-display').textContent = personalInfo?.location || 'City, Country';
}

function populateSection(sectionId, items, titleField, subtitleField) {
  const container = document.getElementById(sectionId);
  container.innerHTML = '';
  
  if (!items || items.length === 0) {
    container.textContent = 'No information specified';
    return;
  }
  
  items.forEach(item => {
    container.innerHTML += `
      <div class="item">
        <div class="item-title">
          <span>${item[titleField] || 'Untitled'}</span>
          <span class="item-date">${item.duration || ''}</span>
        </div>
        <div class="item-details">
          <p>${item[subtitleField] || ''}</p>
          ${item.description ? `<p>${item.description}</p>` : ''}
          ${item.details ? `<p>${item.details}</p>` : ''}
        </div>
      </div>
    `;
  });
}

function populateSkills(skills) {
  const container = document.getElementById('skills-display');
  container.innerHTML = '';
  
  if (!skills || skills.length === 0) {
    container.textContent = 'No skills specified';
    return;
  }
  
  skills.forEach(skillCategory => {
    container.innerHTML += `
      <div class="item">
        <div class="item-title">${skillCategory.category || 'Skills'}</div>
        <div class="skills-list">
          ${skillCategory.items?.map(skill => skill ? `<span class="skill">${skill}</span>` : '').join('')}
        </div>
      </div>
    `;
  });
}

function populateProjects(projects) {
  const container = document.getElementById('projects-display');
  container.innerHTML = '';
  
  if (!projects || projects.length === 0) {
    container.textContent = 'No projects specified';
    return;
  }
  
  projects.forEach(project => {
    container.innerHTML += `
      <div class="item">
        <div class="item-title">
          <span>${project.name || 'Project Name'}</span>
          <span class="item-date">${project.duration || ''}</span>
        </div>
        <div class="item-details">
          ${project.description ? `<p>${project.description}</p>` : ''}
          ${project.technologies ? `<div class="project-technologies">Technologies: ${project.technologies}</div>` : ''}
          ${project.link ? `
            <div class="profile-link">
              <i class="fas fa-link"></i>
              <span>${project.link}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  });
}

function generatePDF() {
  const btn = document.getElementById('generateResumeBtn');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
  btn.disabled = true;

  const resumeData = JSON.parse(localStorage.getItem('resumeData'));
  const fileName = getPdfFileName(resumeData);

  const element = document.querySelector('.resume-preview');
  
  // Store original styles
  const originalStyles = {
    margin: element.style.margin,
    padding: element.style.padding,
    boxShadow: element.style.boxShadow,
    border: element.style.border,
    borderRadius: element.style.borderRadius
  };

  // Apply print-optimized styles temporarily
  element.style.margin = '0';
  element.style.padding = '0';
  element.style.boxShadow = 'none';
  element.style.border = 'none';
  element.style.borderRadius = '0';

  const opt = {
    margin: [0, 0, 0, 0],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      scrollY: 0,
      ignoreElements: (element) => {
        return element.classList.contains('action-buttons') || 
               element.classList.contains('header') ||
               element.classList.contains('scroll-top');
      },
      logging: false,
      useCORS: true,
      allowTaint: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      hotfixes: ['px_scaling']
    },
    pagebreak: { mode: 'avoid-all' }
  };

  // Generate the PDF
  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      showToast('Resume downloaded successfully!', 'success');
    })
    .catch(err => {
      console.error('PDF generation failed:', err);
      showToast('Failed to generate PDF', 'error');
    })
    .finally(() => {
      // Restore original styles
      element.style.margin = originalStyles.margin;
      element.style.padding = originalStyles.padding;
      element.style.boxShadow = originalStyles.boxShadow;
      element.style.border = originalStyles.border;
      element.style.borderRadius = originalStyles.borderRadius;
      
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    });
}

function getPdfFileName(resumeData) {
  let fileName = resumeData ? 
    `${resumeData.personalInfo?.firstName || 'resume'}_${resumeData.personalInfo?.lastName || ''}_resume` : 
    'my_resume';
  
  return `${fileName}.pdf`.trim().replace(/\s+/g, '_');
}

function showToast(message, type) {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  
  toast.className = `toast ${type}`;
  toastMessage.textContent = message;
  toast.classList.add('visible');
  
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}