document.addEventListener('DOMContentLoaded', function() {
  // Form validation
  function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim() && !field.closest('#experienceFields') && !field.closest('#fresherFields')) {
        isValid = false;
        field.style.borderColor = '#EF4444';
        
        let errorDiv = field.nextElementSibling;
        while (errorDiv && !errorDiv.classList.contains('error-message')) {
          errorDiv = errorDiv.nextElementSibling;
        }
        
        if (errorDiv && errorDiv.classList.contains('error-message')) {
          errorDiv.style.display = 'flex';
        }
      } else {
        field.style.borderColor = '';
        
        let errorDiv = field.nextElementSibling;
        while (errorDiv && !errorDiv.classList.contains('error-message')) {
          errorDiv = errorDiv.nextElementSibling;
        }
        
        if (errorDiv && errorDiv.classList.contains('error-message')) {
          errorDiv.style.display = 'none';
        }
      }
    });
    
    // Validate experience based on selection
    const isExperienced = document.getElementById('experiencedBtn').classList.contains('active');
    
    if (isExperienced) {
      // Check if at least one experience field is filled
      const experienceTitles = document.querySelectorAll('.experience-title');
      let hasExperience = false;
      
      experienceTitles.forEach(title => {
        if (title.value.trim()) hasExperience = true;
      });
      
      if (!hasExperience) {
        isValid = false;
        showToast('error', 'Please add at least one work experience or select "I\'m a fresher"');
        return isValid;
      }
    } else {
      // Check if at least one fresher field is filled
      const internshipTitles = document.querySelectorAll('.internship-title');
      const projectTitles = document.querySelectorAll('.project-title');
      let hasFresherInfo = false;
      
      internshipTitles.forEach(title => {
        if (title.value.trim()) hasFresherInfo = true;
      });
      
      projectTitles.forEach(title => {
        if (title.value.trim()) hasFresherInfo = true;
      });
      
      if (!hasFresherInfo) {
        isValid = false;
        showToast('error', 'Please add at least one internship/project or select "I have work experience"');
        return isValid;
      }
    }
    
    return isValid;
  }
  
  // Show toast notification
  function showToast(type, message) {
    const toast = document.getElementById(`${type}Toast`);
    toast.querySelector('span').textContent = message;
    toast.classList.add('visible');
    
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }
  
  // Create confetti effect
  function createConfetti() {
    const colors = ['#6366F1', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }
  
  // Image upload preview
  document.getElementById('profileImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      document.getElementById('profileImageError').textContent = 'File size must be less than 2MB';
      document.getElementById('profileImageError').style.display = 'flex';
      return;
    }
    
    const fileName = file.name;
    document.querySelector('.file-info').textContent = `Selected: ${fileName}`;
    document.getElementById('profileImageError').style.display = 'none';
    
    // Show image preview
    const reader = new FileReader();
    reader.onload = function(event) {
      const preview = document.getElementById('previewImage');
      preview.src = event.target.result;
      document.getElementById('imagePreview').style.display = 'flex';
    };
    reader.readAsDataURL(file);
  });
  
  // Remove image
  document.getElementById('removeImage').addEventListener('click', function() {
    document.getElementById('profileImage').value = '';
    document.querySelector('.file-info').textContent = 'JPG or PNG (Max 2MB, 300x300 recommended)';
    document.getElementById('imagePreview').style.display = 'none';
  });
  
  // Experience/Fresher toggle
  document.getElementById('experiencedBtn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('fresherBtn').classList.remove('active');
    document.getElementById('experienceFields').style.display = 'block';
    document.getElementById('fresherFields').style.display = 'none';
  });
  
  document.getElementById('fresherBtn').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('experiencedBtn').classList.remove('active');
    document.getElementById('experienceFields').style.display = 'none';
    document.getElementById('fresherFields').style.display = 'block';
  });
  
  // Add education field
  document.getElementById('addEducationBtn').addEventListener('click', function() {
    const container = this.previousElementSibling;
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
      <div class="field-header">
        <div class="field-title">
          <i class="fas fa-university"></i> Education #${document.querySelectorAll('.education-degree').length + 1}
        </div>
        <div class="remove-field">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <input type="text" class="education-degree" placeholder="Degree (e.g., Bachelor of Science)" required>
      <input type="text" class="education-institution" placeholder="Institution Name" required>
      <input type="text" class="education-duration" placeholder="Duration (e.g., 2015-2019)" required>
      <textarea class="education-details" placeholder="Additional details (honors, coursework, etc.)"></textarea>
    `;
    container.appendChild(newField);
    
    // Add remove functionality
    newField.querySelector('.remove-field').addEventListener('click', function() {
      newField.classList.add('removing');
      setTimeout(() => {
        newField.remove();
      }, 300);
    });
  });
  
  // Add experience field
  document.getElementById('addExperienceBtn').addEventListener('click', function() {
    const container = this.previousElementSibling;
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
      <div class="field-header">
        <div class="field-title">
          <i class="fas fa-building"></i> Experience #${document.querySelectorAll('.experience-title').length + 1}
        </div>
        <div class="remove-field">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <input type="text" class="experience-title" placeholder="Job Title">
      <input type="text" class="experience-company" placeholder="Company Name">
      <input type="text" class="experience-duration" placeholder="Duration (e.g., Jan 2020 - Present)">
      <textarea class="experience-description" placeholder="Responsibilities and achievements"></textarea>
    `;
    container.appendChild(newField);
    
    // Add remove functionality
    newField.querySelector('.remove-field').addEventListener('click', function() {
      newField.classList.add('removing');
      setTimeout(() => {
        newField.remove();
      }, 300);
    });
  });
  
  // Add fresher experience field
  document.getElementById('addFresherExperienceBtn').addEventListener('click', function() {
    const container = this.previousElementSibling;
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
      <div class="field-header">
        <div class="field-title">
          <i class="fas fa-laptop-code"></i> Additional Experience #${document.querySelectorAll('.internship-title').length + 1}
        </div>
        <div class="remove-field">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <select class="fresher-experience-type">
        <option value="internship">Internship</option>
        <option value="training">Training</option>
        <option value="project">Academic Project</option>
      </select>
      <input type="text" class="internship-title" placeholder="Title">
      <input type="text" class="internship-organization" placeholder="Organization/University">
      <input type="text" class="internship-duration" placeholder="Duration">
      <textarea class="internship-description" placeholder="Description"></textarea>
    `;
    container.appendChild(newField);
    
    // Add remove functionality
    newField.querySelector('.remove-field').addEventListener('click', function() {
      newField.classList.add('removing');
      setTimeout(() => {
        newField.remove();
      }, 300);
    });
  });
  
  // Add skill category field
  document.getElementById('addSkillBtn').addEventListener('click', function() {
    const container = this.previousElementSibling;
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
      <div class="field-header">
        <div class="field-title">
          <i class="fas fa-tags"></i> Skill Category #${document.querySelectorAll('.skill-category').length + 1}
        </div>
        <div class="remove-field">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <input type="text" class="skill-category" placeholder="Category (e.g., Programming Languages)" required>
      <textarea class="skill-items" placeholder="List skills (comma separated)" required></textarea>
    `;
    container.appendChild(newField);
    
    // Add remove functionality
    newField.querySelector('.remove-field').addEventListener('click', function() {
      newField.classList.add('removing');
      setTimeout(() => {
        newField.remove();
      }, 300);
    });
  });
  
  // Add project field
  document.getElementById('addProjectBtn').addEventListener('click', function() {
    const container = this.previousElementSibling;
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
      <div class="field-header">
        <div class="field-title">
          <i class="fas fa-star"></i> Project #${document.querySelectorAll('.project-name').length + 1}
        </div>
        <div class="remove-field">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <input type="text" class="project-name" placeholder="Project Name" required>
      <input type="text" class="project-duration" placeholder="Duration (e.g., 2020)" required>
      <textarea class="project-description" placeholder="Project description and your role" required></textarea>
      <input type="text" class="project-technologies" placeholder="Technologies used (comma separated)">
      <input type="text" class="project-link" placeholder="Project URL (optional)">
    `;
    container.appendChild(newField);
    
    // Add remove functionality
    newField.querySelector('.remove-field').addEventListener('click', function() {
      newField.classList.add('removing');
      setTimeout(() => {
        newField.remove();
      }, 300);
    });
  });
  
  // Generate Resume button
  document.getElementById('generateResumeBtn').addEventListener('click', function() {
    const spinner = document.getElementById('generateSpinner');
    const btnText = this.querySelector('span');
    
    if (validateForm()) {
      // Show loading spinner
      spinner.style.display = 'block';
      this.querySelector('i').style.display = 'none';
      if (btnText) btnText.style.display = 'inline';
      
      // Check if user is experienced or fresher
      const isExperienced = document.getElementById('experiencedBtn').classList.contains('active');
      
      // Collect all form data
      const formData = {
        personalInfo: {
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          location: document.getElementById('location').value,
          jobTitle: document.getElementById('jobTitle').value
        },
        aboutMe: {
          personalSummary: document.getElementById('personalSummary').value,
          keyStrengths: document.getElementById('keyStrengths').value,
          hobbiesInterests: document.getElementById('hobbiesInterests').value
        },
        summary: {
          objective: document.getElementById('objective').value,
          languages: document.getElementById('languages').value
        },
        education: Array.from(document.querySelectorAll('.education-degree')).map((_, index) => ({
          degree: document.querySelectorAll('.education-degree')[index].value,
          institution: document.querySelectorAll('.education-institution')[index].value,
          duration: document.querySelectorAll('.education-duration')[index].value,
          details: document.querySelectorAll('.education-details')[index].value
        })),
        experience: isExperienced ? 
          Array.from(document.querySelectorAll('.experience-title')).map((_, index) => ({
            title: document.querySelectorAll('.experience-title')[index].value,
            company: document.querySelectorAll('.experience-company')[index].value,
            duration: document.querySelectorAll('.experience-duration')[index].value,
            description: document.querySelectorAll('.experience-description')[index].value
          })) : 
          Array.from(document.querySelectorAll('.internship-title')).map((_, index) => ({
            type: document.querySelectorAll('.fresher-experience-type')[index]?.value || 'internship',
            title: document.querySelectorAll('.internship-title')[index].value,
            organization: document.querySelectorAll('.internship-organization')[index].value,
            duration: document.querySelectorAll('.internship-duration')[index].value,
            description: document.querySelectorAll('.internship-description')[index].value
          })),
        skills: Array.from(document.querySelectorAll('.skill-category')).map((_, index) => ({
          category: document.querySelectorAll('.skill-category')[index].value,
          items: document.querySelectorAll('.skill-items')[index].value.split(',').map(item => item.trim())
        })),
        projects: Array.from(document.querySelectorAll('.project-name')).map((_, index) => ({
          name: document.querySelectorAll('.project-name')[index].value,
          duration: document.querySelectorAll('.project-duration')[index].value,
          description: document.querySelectorAll('.project-description')[index].value,
          technologies: document.querySelectorAll('.project-technologies')[index].value,
          link: document.querySelectorAll('.project-link')[index].value
        })),
        isFresher: !isExperienced
      };

      // Handle image upload
      const profileImage = document.getElementById('profileImage').files[0];
      if (profileImage) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
          formData.personalInfo.profileImage = event.target.result;
          
          // Store data in localStorage with a flag
          localStorage.setItem('comingFromForm', 'true');
          localStorage.setItem("resumeData", JSON.stringify(formData));
          
          // Show success message
          spinner.style.display = 'none';
          document.getElementById('generateResumeBtn').querySelector('i').style.display = 'inline-block';
          if (btnText) btnText.style.display = 'inline';
          
          showToast('success', 'Resume generated successfully!');
          createConfetti();
          
          // Redirect to template page
          setTimeout(() => {
            window.location.href = "template.html";
          }, 1500);
        };
        
        reader.onerror = function() {
          document.getElementById("profileImageError").textContent = "Error reading image file.";
          document.getElementById("profileImageError").style.display = "flex";
          spinner.style.display = 'none';
          document.getElementById('generateResumeBtn').querySelector('i').style.display = 'inline-block';
          if (btnText) btnText.style.display = 'inline';
        };
        
        reader.readAsDataURL(profileImage);
      } else {
        // Store data in localStorage with a flag
        localStorage.setItem('comingFromForm', 'true');
        localStorage.setItem("resumeData", JSON.stringify(formData));
        
        // Show success message
        spinner.style.display = 'none';
        document.getElementById('generateResumeBtn').querySelector('i').style.display = 'inline-block';
        if (btnText) btnText.style.display = 'inline';
        
        showToast('success', 'Resume generated successfully!');
        createConfetti();
        
        // Redirect to template page
        setTimeout(() => {
          window.location.href = "template.html";
        }, 1500);
      }
    } else {
      showToast('error', 'Please fill all required fields');
      
      // Scroll to first error
      const firstError = document.querySelector('[required]:invalid');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
  
  // Scroll to top button
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});