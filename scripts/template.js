document.addEventListener('DOMContentLoaded', function() {
    const selectButtons = document.querySelectorAll('.select-btn');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');
    const templateCards = document.querySelectorAll('.template-card');
    
    // Initialize animations
    initAnimations();
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Template selection
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateCard = this.closest('.template-card');
            const templateId = templateCard.getAttribute('data-template');
            
            // Add loading state
            const btnText = this.querySelector('.btn-text');
            const originalText = btnText.textContent;
            btnText.textContent = 'Applying...';
            this.style.pointerEvents = 'none';
            
            // Add loading icon
            const icon = this.querySelector('i');
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-spinner', 'fa-spin');
            
            // Disable all buttons during loading
            selectButtons.forEach(btn => {
                btn.disabled = true;
            });
            
            // Save selected template and redirect
            setTimeout(() => {
                localStorage.setItem('selectedTemplate', templateId);
                window.location.href = 'resume-preview.html';
            }, 1000);
        });
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterTemplates(filter);
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        templateCards.forEach(card => {
            const name = card.querySelector('.template-name').textContent.toLowerCase();
            const description = card.querySelector('.template-description').textContent.toLowerCase();
            const features = Array.from(card.querySelectorAll('.template-features li')).map(li => li.textContent.toLowerCase());
            
            const matches = name.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          features.some(feature => feature.includes(searchTerm));
            
            card.style.display = matches ? 'block' : 'none';
        });
        
        // Show empty state if no results
        const visibleCards = document.querySelectorAll('.template-card[style="display: block"]');
        if (visibleCards.length === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
        }
    });
    
    function initAnimations() {
        // Initialize cards with staggered animation
        templateCards.forEach((card, index) => {
            card.style.animationDelay = `${0.5 + (index * 0.1)}s`;
        });
    }
    
    function filterTemplates(filter) {
        let hasVisibleCards = false;
        
        templateCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else if (filter === 'popular' && card.hasAttribute('data-popular')) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else if (filter === 'new' && card.hasAttribute('data-new')) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else if (card.hasAttribute(`data-${filter}`)) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!hasVisibleCards) {
            showEmptyState();
        } else {
            hideEmptyState();
        }
    }
    
    function showEmptyState() {
        let emptyState = document.querySelector('.empty-state');
        
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <h3>No templates found</h3>
                <p>We couldn't find any templates matching your criteria. Try adjusting your filters or search term.</p>
                <button class="reset-filters">Reset all filters</button>
            `;
            
            const templatesGrid = document.querySelector('.templates-grid');
            templatesGrid.appendChild(emptyState);
            
            // Add click handler for reset button
            emptyState.querySelector('.reset-filters').addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
                searchInput.value = '';
                filterTemplates('all');
            });
        }
    }
    
    function hideEmptyState() {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
    }
});

