/**
 * Mobile Menu Module
 * Handles hamburger menu functionality for mobile navigation
 */

const MobileMenu = (() => {
    // Private variables
    let isOpen = false;
    let menuButton = null;
    let mobileMenu = null;
    let overlay = null;

    /**
     * Create mobile menu button if it doesn't exist
     */
    const createMenuButton = () => {
        // Check if button already exists
        const existingBtn = document.querySelector('.md\\:hidden button');
        if (existingBtn) return existingBtn;

        // Create new button
        const nav = document.querySelector('nav .max-w-7xl');
        if (!nav) return null;

        const button = document.createElement('button');
        button.className = 'md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors';
        button.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        button.id = 'mobile-menu-button';
        
        nav.appendChild(button);
        lucide.createIcons();
        
        return button;
    };

    /**
     * Create mobile menu HTML structure
     */
    const createMobileMenu = () => {
        const menu = document.createElement('div');
        menu.id = 'mobile-menu';
        menu.className = 'fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 transform translate-x-full transition-transform duration-300 ease-in-out z-50 shadow-2xl';
        menu.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div class="flex items-center gap-2">
                        <img src="logo.png" alt="SimpleDevTools Logo" class="w-6 h-6">
                        <span class="font-display font-medium text-lg tracking-tight">Menu</span>
                    </div>
                    <button id="menu-close" class="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Navigation Links -->
                <nav class="flex-1 overflow-y-auto p-6">
                    <ul class="space-y-2">
                        <li>
                            <a href="/" class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
                                <i data-lucide="home" class="w-5 h-5 text-neutral-500 group-hover:text-black dark:group-hover:text-white"></i>
                                <span class="font-medium">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#tools" class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group mobile-menu-link">
                                <i data-lucide="wrench" class="w-5 h-5 text-neutral-500 group-hover:text-black dark:group-hover:text-white"></i>
                                <span class="font-medium">Tools</span>
                            </a>
                        </li>
                        <li>
                            <a href="/privacy-policy" class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
                                <i data-lucide="shield" class="w-5 h-5 text-neutral-500 group-hover:text-black dark:group-hover:text-white"></i>
                                <span class="font-medium">Privacy Policy</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com" target="_blank" class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
                                <i data-lucide="github" class="w-5 h-5 text-neutral-500 group-hover:text-black dark:group-hover:text-white"></i>
                                <span class="font-medium">GitHub</span>
                            </a>
                        </li>
                    </ul>

                    <!-- Theme Toggle in Menu -->
                    <div class="mt-8 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium">Theme</span>
                        </div>
                        <button id="mobile-theme-toggle" class="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                            <span class="flex items-center gap-2">
                                <i data-lucide="sun" class="w-4 h-4 block dark:hidden"></i>
                                <i data-lucide="moon" class="w-4 h-4 hidden dark:block"></i>
                                <span class="text-sm">
                                    <span class="dark:hidden">Light Mode</span>
                                    <span class="hidden dark:inline">Dark Mode</span>
                                </span>
                            </span>
                            <i data-lucide="chevron-right" class="w-4 h-4 text-neutral-400"></i>
                        </button>
                    </div>
                </nav>

                <!-- Footer -->
                <div class="p-6 border-t border-neutral-200 dark:border-neutral-800">
                    <p class="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                        © SimpleDevTools.tech
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(menu);
        return menu;
    };

    /**
     * Create overlay element
     */
    const createOverlay = () => {
        const overlayEl = document.createElement('div');
        overlayEl.id = 'mobile-menu-overlay';
        overlayEl.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 z-40';
        document.body.appendChild(overlayEl);
        return overlayEl;
    };

    /**
     * Open mobile menu
     */
    const openMenu = () => {
        isOpen = true;
        document.body.style.overflow = 'hidden';
        
        // Show overlay
        overlay.classList.remove('pointer-events-none');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
        }, 10);

        // Slide in menu
        setTimeout(() => {
            mobileMenu.classList.remove('translate-x-full');
        }, 10);

        // Update button icon
        const icon = menuButton.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'x');
            lucide.createIcons();
        }
    };

    /**
     * Close mobile menu
     */
    const closeMenu = () => {
        isOpen = false;
        document.body.style.overflow = '';
        
        // Hide menu
        mobileMenu.classList.add('translate-x-full');
        
        // Hide overlay
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            overlay.classList.add('pointer-events-none');
        }, 300);

        // Update button icon
        const icon = menuButton.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    };

    /**
     * Toggle menu state
     */
    const toggleMenu = () => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    /**
     * Handle theme toggle in mobile menu
     */
    const handleMobileThemeToggle = () => {
        document.documentElement.classList.toggle('dark');
        
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }

        // Reinitialize icons to update theme icons
        lucide.createIcons();
    };

    /**
     * Handle anchor link clicks (close menu on navigation)
     */
    const handleAnchorClick = (e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            closeMenu();
        }
    };

    /**
     * Initialize mobile menu
     */
    const init = () => {
        // Create or get hamburger button
        menuButton = createMenuButton();
        
        if (!menuButton) {
            console.error('Could not create mobile menu button');
            return;
        }

        // console.log('Mobile menu button created/found:', menuButton);

        // Create menu and overlay
        mobileMenu = createMobileMenu();
        overlay = createOverlay();

        // console.log('Mobile menu created:', mobileMenu);
        // console.log('Overlay created:', overlay);

        // Initialize Lucide icons for the new menu
        lucide.createIcons();

        // Event listeners
        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            // console.log('Menu button clicked');
            toggleMenu();
        });
        
        const closeButton = document.getElementById('menu-close');
        closeButton.addEventListener('click', closeMenu);
        
        overlay.addEventListener('click', closeMenu);

        // Mobile theme toggle
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        mobileThemeToggle.addEventListener('click', handleMobileThemeToggle);

        // Close menu when clicking anchor links
        const anchorLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
        anchorLinks.forEach(link => {
            link.addEventListener('click', handleAnchorClick);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        });

        // Close menu on window resize to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && isOpen) {
                closeMenu();
            }
        });

        // console.log('Mobile menu initialized successfully');
    };

    // Public API
    return {
        init,
        open: openMenu,
        close: closeMenu,
        toggle: toggleMenu,
        isOpen: () => isOpen
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // console.log('DOM loaded, initializing mobile menu...');
        MobileMenu.init();
    });
} else {
    // console.log('DOM already loaded, initializing mobile menu...');
    MobileMenu.init();
}

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenu;
}