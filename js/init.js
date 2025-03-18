// React Learning Progress Tracker - Initialization Script
// This script runs before other scripts to set up the environment and fix common issues

document.addEventListener('DOMContentLoaded', function() {
    // Fix accordions to ensure they don't open by default
    fixAccordions();
    
    // Initialize global storage manager
    initStorageManager();
});

// Fix accordions to ensure proper collapse behavior
function fixAccordions() {
    // Find all accordion items
    const accordionItems = document.querySelectorAll('.accordion-collapse');
    
    // Make sure they are all collapsed by default 
    // except the first item in each accordion group
    accordionItems.forEach((item, index) => {
        // Get the parent accordion
        const parentAccordion = item.closest('.accordion');
        
        // If not the first item in its parent, make sure it's collapsed
        if (parentAccordion) {
            const accordionItems = parentAccordion.querySelectorAll('.accordion-collapse');
            if (accordionItems[0] !== item) {
                item.classList.remove('show');
            }
        }
    });
    
    // Add extra listener to all accordion buttons 
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            // This helps enforce correct aria attributes for accessibility
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
        });
    });
}

// Initialize storage manager to handle localStorage with fallbacks
function initStorageManager() {
    // Create a global storage manager object
    window.storageManager = {
        // Check if storage is available
        isAvailable: function() {
            try {
                const test = '__storage_test__';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        },
        
        // Get item with fallback to memory storage if localStorage fails
        getItem: function(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                return this.memoryStorage[key] || null;
            }
        },
        
        // Set item with fallback to memory storage if localStorage fails
        setItem: function(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                this.memoryStorage[key] = value;
            }
        },
        
        // Remove item with fallback to memory storage if localStorage fails
        removeItem: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                delete this.memoryStorage[key];
            }
        },
        
        // Clear all items with fallback to memory storage if localStorage fails
        clear: function() {
            try {
                localStorage.clear();
            } catch (e) {
                this.memoryStorage = {};
            }
        },
        
        // Memory storage fallback
        memoryStorage: {}
    };
    
    // Log storage availability
    if (!window.storageManager.isAvailable()) {
        console.warn('localStorage is not available. Using in-memory storage instead.');
    }
}
