document.addEventListener("DOMContentLoaded", () => {
  ensureAdSense();
  injectLayout();
  initializeTheme();
  initializeMobileMenu();
  // Re-initialize icons since we just added new DOM elements
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

function ensureAdSense() {
  const ADSENSE_CLIENT = "ca-pub-9710571190649081";

  const existingMeta = document.querySelector(
    'meta[name="google-adsense-account"]'
  );
  if (!existingMeta) {
    const meta = document.createElement("meta");
    meta.name = "google-adsense-account";
    meta.content = ADSENSE_CLIENT;
    document.head.appendChild(meta);
  }

  const existingScript = document.querySelector(
    'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  );
  if (existingScript) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

function injectLayout() {
  const navHTML = `
    <nav class="fixed top-0 w-full z-50 glass-nav transition-colors duration-300 border-b border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-md bg-white/70 dark:bg-black/70">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2 group">
                <picture>
                    <source srcset="logo.webp" type="image/webp">
                    <img src="logo-small.png" alt="SimpleDevTools Logo" class="w-8 h-8 group-hover:scale-105 transition-transform" width="32" height="32">
                </picture>
                <span class="font-display font-medium text-lg tracking-tight text-neutral-900 dark:text-white">SimpleDevTools</span>
            </a>

            <div class="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                <a href="/" class="hover:text-black dark:hover:text-white transition-colors">Home</a>
                <a href="/tools" class="hover:text-black dark:hover:text-white transition-colors">Tools</a>
                <a href="/how-it-works" class="hover:text-black dark:hover:text-white transition-colors">How It Works</a>

                <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-800"></div>

                <a href="https://github.com/helloimabid/" target="_blank" class="hover:text-black dark:hover:text-white transition-colors">
                    <i data-lucide="github" class="w-4 h-4"></i>
                </a>

                <button id="theme-toggle" class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white focus:outline-hidden">
                    <i data-lucide="sun" class="w-4 h-4 block dark:hidden"></i>
                    <i data-lucide="moon" class="w-4 h-4 hidden dark:block"></i>
                </button>
            </div>

            
        </div>
    </nav>
    `;

  const footerHTML = `
    <footer class="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black pt-12 pb-8 text-sm relative z-10 mt-auto">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                       <picture>
                           <source srcset="logo.webp" type="image/webp">
                           <img src="logo-small.png" alt="SimpleDevTools" class="w-8 h-8" width="32" height="32">
                       </picture>
                        <span class="font-display font-semibold tracking-tight text-neutral-900 dark:text-white">SimpleDevTools</span>
                    </div>
                    <p class="text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed">
                        Privacy-first utilities for the modern web. Built for developers, by developers.
                    </p>
                </div>

                <div>
                    <h4 class="font-medium mb-4 text-neutral-900 dark:text-white">Tools</h4>
                    <ul class="space-y-2 text-neutral-500 dark:text-neutral-400">
                        <li><a href="/json-formatter" class="hover:text-black dark:hover:text-white transition-colors">JSON Formatter</a></li>
                        <li><a href="/base64-encoder" class="hover:text-black dark:hover:text-white transition-colors">Base64 Encoder</a></li>
                        <li><a href="/hash-generator" class="hover:text-black dark:hover:text-white transition-colors">Hash Generator</a></li>
                        <li><a href="/uuid-generator" class="hover:text-black dark:hover:text-white transition-colors">UUID Generator</a></li>
                        <li><a href="/regex-tester" class="hover:text-black dark:hover:text-white transition-colors">Regex Tester</a></li>
                        <li><a href="/jwt-decoder" class="hover:text-black dark:hover:text-white transition-colors">JWT Decoder</a></li>
                        <li><a href="/image-compressor" class="hover:text-black dark:hover:text-white transition-colors">Image Compressor</a></li>
                        <li><a href="/password-strength-analyzer" class="hover:text-black dark:hover:text-white transition-colors">Password Strength Analyzer</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-medium mb-4 text-neutral-900 dark:text-white">Legal</h4>
                    <ul class="space-y-2 text-neutral-500 dark:text-neutral-400">
                        <li><a href="/privacy-policy" class="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms" class="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-medium mb-4 text-neutral-900 dark:text-white">Contact</h4>
                    <ul class="space-y-2 text-neutral-500 dark:text-neutral-400">
                        <li><a href="/contact" class="hover:text-black dark:hover:text-white transition-colors">Contact Me</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-medium mb-4 text-neutral-900 dark:text-white">Guides</h4>
                    <ul class="space-y-2 text-neutral-500 dark:text-neutral-400">
                        <li><a href="/guides" class="hover:text-black dark:hover:text-white transition-colors">All Guides</a></li>
                    </ul>
                </div>

            </div>

            <div class="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <div class="text-neutral-400 text-xs flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
                    <span>© SimpleDevTools.tech. All rights reserved.</span>
                    <span class="hidden md:inline text-neutral-300 dark:text-neutral-700">|</span>
                    <span>Developed by <a href="https://sadmanabid.vercel.app" target="_blank" class="text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 transition-colors font-medium">Sadman Abid</a></span>
                </div>
                <div class="flex items-center gap-2 mt-4 md:mt-0">
                    <div class="w-2 h-2 rounded-full bg-emerald-500 relative">
                        <div class="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span class="text-xs text-neutral-400">Systems Operational</span>
                </div>
            </div>
        </div>
    </footer>
    `;

  // Inject Nav at the start of body
  document.body.insertAdjacentHTML("afterbegin", navHTML);

  // Inject Footer at the end of body
  document.body.insertAdjacentHTML("beforeend", footerHTML);
}

function initializeTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Check initial state
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      localStorage.theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    });
  }
}

function initializeMobileMenu() {
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
      const existingBtn = document.querySelector(".md\\:hidden button");
      if (existingBtn) return existingBtn;

      // Create new button
      const nav = document.querySelector("nav .max-w-7xl");
      if (!nav) return null;

      const button = document.createElement("button");
      button.className =
        "md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors";
      button.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      button.id = "mobile-menu-button";
      button.setAttribute("aria-label", "Toggle menu");

      nav.appendChild(button);
      lucide.createIcons();

      return button;
    };

    /**
     * Create mobile menu HTML structure
     */
    const createMobileMenu = () => {
      const menu = document.createElement("div");
      menu.id = "mobile-menu";
      menu.className =
        "fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 transform translate-x-full transition-transform duration-300 ease-in-out z-50 shadow-2xl";
      menu.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div class="flex items-center gap-2">
                        <picture>
                            <source srcset="logo.webp" type="image/webp">
                            <img src="logo-small.png" alt="SimpleDevTools Logo" class="w-6 h-6" width="24" height="24">
                        </picture>
                        <span class="font-display font-medium text-lg tracking-tight">Menu</span>
                    </div>
                    <button id="menu-close" class="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Close menu">
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
                            <a href="/tools" class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group mobile-menu-link">
                                <i data-lucide="wrench" class="w-5 h-5 text-neutral-500 group-hover:text-black dark:group-hover:text-white"></i>
                                <span class="font-medium">Tools</span>
                            </a>
                        </li>
                        <li>
                            <a href="/how-it-works" class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
                                <i data-lucide="shield" class="w-5 h-5 text-neutral-500 group-hover:text-black dark:group-hover:text-white"></i>
                                <span class="font-medium">How It Works</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/helloimabid/" target="_blank" class="flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
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
      const overlayEl = document.createElement("div");
      overlayEl.id = "mobile-menu-overlay";
      overlayEl.className =
        "fixed inset-0 bg-black/50 backdrop-blur-xs opacity-0 pointer-events-none transition-opacity duration-300 z-40";
      document.body.appendChild(overlayEl);
      return overlayEl;
    };

    /**
     * Open mobile menu
     */
    const openMenu = () => {
      isOpen = true;
      document.body.style.overflow = "hidden";

      // Show overlay
      overlay.classList.remove("pointer-events-none");
      setTimeout(() => {
        overlay.classList.remove("opacity-0");
      }, 10);

      // Slide in menu
      setTimeout(() => {
        mobileMenu.classList.remove("translate-x-full");
      }, 10);

      // Update button icon
      const icon = menuButton.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", "x");
        lucide.createIcons();
      }
    };

    /**
     * Close mobile menu
     */
    const closeMenu = () => {
      isOpen = false;
      document.body.style.overflow = "";

      // Hide menu
      mobileMenu.classList.add("translate-x-full");

      // Hide overlay
      overlay.classList.add("opacity-0");
      setTimeout(() => {
        overlay.classList.add("pointer-events-none");
      }, 300);

      // Update button icon
      const icon = menuButton.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", "menu");
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
      document.documentElement.classList.toggle("dark");

      if (document.documentElement.classList.contains("dark")) {
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }

      // Reinitialize icons to update theme icons
      lucide.createIcons();
    };

    /**
     * Handle anchor link clicks (close menu on navigation)
     */
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
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
        console.error("Could not create mobile menu button");
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
      menuButton.addEventListener("click", (e) => {
        e.preventDefault();
        // console.log('Menu button clicked');
        toggleMenu();
      });

      const closeButton = document.getElementById("menu-close");
      closeButton.addEventListener("click", closeMenu);

      overlay.addEventListener("click", closeMenu);

      // Mobile theme toggle
      const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
      mobileThemeToggle.addEventListener("click", handleMobileThemeToggle);

      // Close menu when clicking anchor links
      const anchorLinks = mobileMenu.querySelectorAll(".mobile-menu-link");
      anchorLinks.forEach((link) => {
        link.addEventListener("click", handleAnchorClick);
      });

      // Close menu on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) {
          closeMenu();
        }
      });

      // Close menu on window resize to desktop size
      window.addEventListener("resize", () => {
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
      isOpen: () => isOpen,
    };
  })();
  MobileMenu.init();
}
