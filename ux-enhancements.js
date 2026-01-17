/**
 * SimpleDevTools - UX Enhancements
 * Keyboard shortcuts, quick switcher, recently used tools, and more
 */

(function() {
    'use strict';

    // ==========================================
    // TOOL REGISTRY
    // ==========================================
    const TOOLS = [
        { name: 'JSON Formatter', url: '/json-formatter', icon: 'braces', keywords: ['json', 'format', 'beautify', 'validate', 'minify'] },
        { name: 'Base64 Encoder', url: '/base64-encoder', icon: 'file-key', keywords: ['base64', 'encode', 'decode', 'convert'] },
        { name: 'UUID Generator', url: '/uuid-generator', icon: 'fingerprint', keywords: ['uuid', 'guid', 'generate', 'unique'] },
        { name: 'JWT Decoder', url: '/jwt-decoder', icon: 'key', keywords: ['jwt', 'token', 'decode', 'auth'] },
        { name: 'Regex Tester', url: '/regex-tester', icon: 'regex', keywords: ['regex', 'regular expression', 'pattern', 'match'] },
        { name: 'Hash Generator', url: '/hash-generator', icon: 'hash', keywords: ['hash', 'md5', 'sha256', 'sha512', 'checksum'] },
        { name: 'Image Compressor', url: '/image-compressor', icon: 'image', keywords: ['image', 'compress', 'optimize', 'resize'] },
        { name: 'Password Analyzer', url: '/password-strength-analyzer', icon: 'shield-check', keywords: ['password', 'strength', 'security'] },
        { name: 'JavaScript Formatter', url: '/javascript-formatter', icon: 'code-2', keywords: ['javascript', 'js', 'format', 'beautify'] },
        { name: 'CSS Formatter', url: '/css-formatter', icon: 'palette', keywords: ['css', 'format', 'beautify', 'style'] },
        { name: 'HTML Formatter', url: '/html-formatter', icon: 'code', keywords: ['html', 'format', 'beautify', 'markup'] },
        { name: 'SQL Formatter', url: '/sql-formatter', icon: 'database', keywords: ['sql', 'format', 'query', 'database'] },
        { name: 'Markdown Editor', url: '/markdown-editor', icon: 'file-text', keywords: ['markdown', 'md', 'editor', 'preview'] },
        { name: 'URL Encoder', url: '/url-encoder', icon: 'link', keywords: ['url', 'encode', 'decode', 'uri'] },
        { name: 'Color Picker', url: '/color-picker', icon: 'pipette', keywords: ['color', 'picker', 'hex', 'rgb', 'hsl'] },
        { name: 'Timestamp Converter', url: '/timestamp-converter', icon: 'clock', keywords: ['timestamp', 'unix', 'epoch', 'date'] },
        { name: 'Lorem Ipsum Generator', url: '/lorem-ipsum', icon: 'text', keywords: ['lorem', 'ipsum', 'placeholder', 'text'] },
        { name: 'Diff Checker', url: '/diff-checker', icon: 'git-compare', keywords: ['diff', 'compare', 'difference', 'text'] },
        { name: 'Hash Encoder', url: '/hash-encoder', icon: 'lock', keywords: ['hash', 'encode', 'md5', 'sha'] }
    ];

    // ==========================================
    // RECENTLY USED TOOLS
    // ==========================================
    const RECENT_TOOLS_KEY = 'sdt_recent_tools';
    const MAX_RECENT_TOOLS = 5;

    function getRecentTools() {
        try {
            return JSON.parse(localStorage.getItem(RECENT_TOOLS_KEY)) || [];
        } catch {
            return [];
        }
    }

    function addToRecentTools(toolUrl) {
        let recent = getRecentTools();
        // Remove if already exists
        recent = recent.filter(url => url !== toolUrl);
        // Add to beginning
        recent.unshift(toolUrl);
        // Keep only max items
        recent = recent.slice(0, MAX_RECENT_TOOLS);
        localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(recent));
    }

    // Track current page visit
    function trackCurrentTool() {
        const path = window.location.pathname;
        const tool = TOOLS.find(t => t.url === path || t.url === path.replace('.html', ''));
        if (tool) {
            addToRecentTools(tool.url);
        }
    }

    // ==========================================
    // FAVORITE TOOLS
    // ==========================================
    const FAVORITE_TOOLS_KEY = 'sdt_favorite_tools';

    function getFavoriteTools() {
        try {
            return JSON.parse(localStorage.getItem(FAVORITE_TOOLS_KEY)) || [];
        } catch {
            return [];
        }
    }

    function toggleFavoriteTool(toolUrl) {
        let favorites = getFavoriteTools();
        if (favorites.includes(toolUrl)) {
            favorites = favorites.filter(url => url !== toolUrl);
        } else {
            favorites.push(toolUrl);
        }
        localStorage.setItem(FAVORITE_TOOLS_KEY, JSON.stringify(favorites));
        return favorites.includes(toolUrl);
    }

    function isFavorite(toolUrl) {
        return getFavoriteTools().includes(toolUrl);
    }

    // ==========================================
    // QUICK TOOL SWITCHER (Cmd+K / Ctrl+K)
    // ==========================================
    let quickSwitcherOpen = false;
    let quickSwitcherElement = null;
    let selectedIndex = 0;
    let filteredTools = [];

    function createQuickSwitcher() {
        if (document.getElementById('quick-switcher')) return;

        const switcher = document.createElement('div');
        switcher.id = 'quick-switcher';
        switcher.innerHTML = `
            <div class="qs-backdrop" onclick="window.SDT.closeQuickSwitcher()"></div>
            <div class="qs-modal">
                <div class="qs-header">
                    <i data-lucide="search" class="qs-search-icon"></i>
                    <input type="text" id="qs-input" placeholder="Search tools..." autocomplete="off" />
                    <kbd class="qs-kbd">ESC</kbd>
                </div>
                <div class="qs-results" id="qs-results"></div>
                <div class="qs-footer">
                    <span><kbd>↑↓</kbd> Navigate</span>
                    <span><kbd>↵</kbd> Open</span>
                    <span><kbd>ESC</kbd> Close</span>
                </div>
            </div>
        `;
        document.body.appendChild(switcher);
        quickSwitcherElement = switcher;

        // Add styles
        if (!document.getElementById('qs-styles')) {
            const styles = document.createElement('style');
            styles.id = 'qs-styles';
            styles.textContent = `
                #quick-switcher { display: none; position: fixed; inset: 0; z-index: 9999; }
                #quick-switcher.open { display: block; }
                .qs-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); }
                .qs-modal { position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 90%; max-width: 540px; background: white; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; }
                .dark .qs-modal { background: #171717; border: 1px solid #262626; }
                .qs-header { display: flex; align-items: center; padding: 16px; border-bottom: 1px solid #e5e5e5; gap: 12px; }
                .dark .qs-header { border-color: #262626; }
                .qs-search-icon { width: 20px; height: 20px; color: #a3a3a3; flex-shrink: 0; }
                #qs-input { flex: 1; border: none; outline: none; font-size: 16px; background: transparent; color: inherit; }
                #qs-input::placeholder { color: #a3a3a3; }
                .qs-kbd { padding: 2px 6px; background: #f5f5f5; border: 1px solid #e5e5e5; border-radius: 4px; font-size: 11px; color: #737373; font-family: inherit; }
                .dark .qs-kbd { background: #262626; border-color: #404040; color: #a3a3a3; }
                .qs-results { max-height: 320px; overflow-y: auto; padding: 8px; }
                .qs-result { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; text-decoration: none; color: inherit; }
                .qs-result:hover, .qs-result.selected { background: #f5f5f5; }
                .dark .qs-result:hover, .dark .qs-result.selected { background: #262626; }
                .qs-result-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 8px; }
                .dark .qs-result-icon { background: #262626; }
                .qs-result-icon i { width: 18px; height: 18px; }
                .qs-result-info { flex: 1; }
                .qs-result-name { font-weight: 500; font-size: 14px; }
                .qs-result-url { font-size: 12px; color: #737373; }
                .qs-result-badge { font-size: 10px; padding: 2px 6px; background: #dbeafe; color: #1d4ed8; border-radius: 4px; }
                .dark .qs-result-badge { background: #1e3a5f; color: #60a5fa; }
                .qs-footer { display: flex; gap: 16px; padding: 12px 16px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #737373; }
                .dark .qs-footer { border-color: #262626; }
                .qs-footer kbd { padding: 1px 4px; background: #f5f5f5; border: 1px solid #e5e5e5; border-radius: 3px; font-size: 10px; margin-right: 4px; }
                .dark .qs-footer kbd { background: #262626; border-color: #404040; }
                .qs-empty { padding: 32px; text-align: center; color: #737373; }
                .qs-section-title { padding: 8px 12px; font-size: 11px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 0.05em; }
            `;
            document.head.appendChild(styles);
        }

        // Event listeners
        const input = document.getElementById('qs-input');
        input.addEventListener('input', (e) => renderResults(e.target.value));
        input.addEventListener('keydown', handleQuickSwitcherKeys);
    }

    function openQuickSwitcher() {
        createQuickSwitcher();
        quickSwitcherElement.classList.add('open');
        quickSwitcherOpen = true;
        selectedIndex = 0;
        document.getElementById('qs-input').value = '';
        document.getElementById('qs-input').focus();
        renderResults('');
        document.body.style.overflow = 'hidden';
        // Reinitialize lucide icons
        if (window.lucide) lucide.createIcons();
    }

    function closeQuickSwitcher() {
        if (quickSwitcherElement) {
            quickSwitcherElement.classList.remove('open');
        }
        quickSwitcherOpen = false;
        document.body.style.overflow = '';
    }

    function renderResults(query) {
        const resultsContainer = document.getElementById('qs-results');
        const recentTools = getRecentTools();
        const favoriteTools = getFavoriteTools();
        
        query = query.toLowerCase().trim();
        
        // Filter tools
        if (query) {
            filteredTools = TOOLS.filter(tool => 
                tool.name.toLowerCase().includes(query) ||
                tool.keywords.some(k => k.includes(query))
            );
        } else {
            // Show recent and favorites first when no query
            const recentToolObjects = recentTools
                .map(url => TOOLS.find(t => t.url === url))
                .filter(Boolean);
            const otherTools = TOOLS.filter(t => !recentTools.includes(t.url));
            filteredTools = [...recentToolObjects, ...otherTools];
        }

        if (filteredTools.length === 0) {
            resultsContainer.innerHTML = '<div class="qs-empty">No tools found</div>';
            return;
        }

        let html = '';
        
        // Show recent section when no query
        if (!query && recentTools.length > 0) {
            html += '<div class="qs-section-title">Recently Used</div>';
            recentTools.forEach((url, idx) => {
                const tool = TOOLS.find(t => t.url === url);
                if (tool) {
                    html += renderToolResult(tool, idx, favoriteTools.includes(tool.url), true);
                }
            });
            html += '<div class="qs-section-title">All Tools</div>';
            const startIdx = recentTools.length;
            TOOLS.filter(t => !recentTools.includes(t.url)).forEach((tool, idx) => {
                html += renderToolResult(tool, startIdx + idx, favoriteTools.includes(tool.url), false);
            });
        } else {
            filteredTools.forEach((tool, idx) => {
                html += renderToolResult(tool, idx, favoriteTools.includes(tool.url), recentTools.includes(tool.url));
            });
        }

        resultsContainer.innerHTML = html;
        selectedIndex = 0;
        updateSelection();
        
        // Reinitialize lucide icons
        if (window.lucide) lucide.createIcons();
    }

    function renderToolResult(tool, index, isFav, isRecent) {
        return `
            <a href="${tool.url}" class="qs-result" data-index="${index}">
                <div class="qs-result-icon">
                    <i data-lucide="${tool.icon}"></i>
                </div>
                <div class="qs-result-info">
                    <div class="qs-result-name">${tool.name}</div>
                    <div class="qs-result-url">${tool.url}</div>
                </div>
                ${isFav ? '<span class="qs-result-badge">★ Favorite</span>' : ''}
            </a>
        `;
    }

    function updateSelection() {
        const results = document.querySelectorAll('.qs-result');
        results.forEach((r, i) => {
            r.classList.toggle('selected', i === selectedIndex);
        });
        // Scroll into view
        const selected = results[selectedIndex];
        if (selected) {
            selected.scrollIntoView({ block: 'nearest' });
        }
    }

    function handleQuickSwitcherKeys(e) {
        const results = document.querySelectorAll('.qs-result');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
            updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            updateSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selected = results[selectedIndex];
            if (selected) {
                window.location.href = selected.href;
            }
        } else if (e.key === 'Escape') {
            closeQuickSwitcher();
        }
    }

    // ==========================================
    // KEYBOARD SHORTCUTS HELP MODAL
    // ==========================================
    let shortcutsModalOpen = false;

    function createShortcutsModal() {
        if (document.getElementById('shortcuts-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'shortcuts-modal';
        modal.innerHTML = `
            <div class="sm-backdrop" onclick="window.SDT.closeShortcutsModal()"></div>
            <div class="sm-modal">
                <div class="sm-header">
                    <h2>Keyboard Shortcuts</h2>
                    <button onclick="window.SDT.closeShortcutsModal()" class="sm-close">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div class="sm-content">
                    <div class="sm-section">
                        <h3>Navigation</h3>
                        <div class="sm-shortcut"><kbd>Ctrl</kbd> + <kbd>K</kbd><span>Quick tool switcher</span></div>
                        <div class="sm-shortcut"><kbd>?</kbd><span>Show this help</span></div>
                        <div class="sm-shortcut"><kbd>G</kbd> then <kbd>H</kbd><span>Go to Home</span></div>
                        <div class="sm-shortcut"><kbd>G</kbd> then <kbd>T</kbd><span>Go to Tools</span></div>
                    </div>
                    <div class="sm-section">
                        <h3>Tool Actions</h3>
                        <div class="sm-shortcut"><kbd>Ctrl</kbd> + <kbd>Enter</kbd><span>Format / Process</span></div>
                        <div class="sm-shortcut"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd><span>Copy output</span></div>
                        <div class="sm-shortcut"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd><span>Clear all</span></div>
                        <div class="sm-shortcut"><kbd>Ctrl</kbd> + <kbd>S</kbd><span>Download output</span></div>
                        <div class="sm-shortcut"><kbd>F11</kbd><span>Toggle fullscreen</span></div>
                    </div>
                    <div class="sm-section">
                        <h3>Editor</h3>
                        <div class="sm-shortcut"><kbd>Ctrl</kbd> + <kbd>Z</kbd><span>Undo</span></div>
                        <div class="sm-shortcut"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd><span>Redo</span></div>
                        <div class="sm-shortcut"><kbd>Tab</kbd><span>Indent</span></div>
                        <div class="sm-shortcut"><kbd>Shift</kbd> + <kbd>Tab</kbd><span>Outdent</span></div>
                    </div>
                </div>
                <div class="sm-footer">
                    <span class="sm-hint">Press <kbd>?</kbd> anytime to toggle this help</span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add styles
        if (!document.getElementById('sm-styles')) {
            const styles = document.createElement('style');
            styles.id = 'sm-styles';
            styles.textContent = `
                #shortcuts-modal { display: none; position: fixed; inset: 0; z-index: 9999; }
                #shortcuts-modal.open { display: block; }
                .sm-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); }
                .sm-modal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 500px; background: white; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; }
                .dark .sm-modal { background: #171717; border: 1px solid #262626; }
                .sm-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #e5e5e5; }
                .dark .sm-header { border-color: #262626; }
                .sm-header h2 { font-size: 18px; font-weight: 600; margin: 0; }
                .sm-close { background: none; border: none; cursor: pointer; padding: 4px; color: #737373; }
                .sm-close:hover { color: inherit; }
                .sm-close i { width: 20px; height: 20px; }
                .sm-content { padding: 16px 20px; max-height: 400px; overflow-y: auto; }
                .sm-section { margin-bottom: 20px; }
                .sm-section:last-child { margin-bottom: 0; }
                .sm-section h3 { font-size: 12px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0; }
                .sm-shortcut { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
                .dark .sm-shortcut { border-color: #262626; }
                .sm-shortcut:last-child { border-bottom: none; }
                .sm-shortcut kbd { padding: 3px 8px; background: #f5f5f5; border: 1px solid #e5e5e5; border-radius: 4px; font-size: 12px; font-family: inherit; margin-right: 4px; }
                .dark .sm-shortcut kbd { background: #262626; border-color: #404040; }
                .sm-shortcut span { color: #737373; font-size: 14px; }
                .sm-footer { padding: 12px 20px; border-top: 1px solid #e5e5e5; background: #fafafa; }
                .dark .sm-footer { border-color: #262626; background: #0a0a0a; }
                .sm-hint { font-size: 12px; color: #737373; }
                .sm-hint kbd { padding: 2px 6px; background: #e5e5e5; border-radius: 3px; }
                .dark .sm-hint kbd { background: #262626; }
            `;
            document.head.appendChild(styles);
        }

        if (window.lucide) lucide.createIcons();
    }

    function openShortcutsModal() {
        createShortcutsModal();
        document.getElementById('shortcuts-modal').classList.add('open');
        shortcutsModalOpen = true;
        document.body.style.overflow = 'hidden';
        if (window.lucide) lucide.createIcons();
    }

    function closeShortcutsModal() {
        const modal = document.getElementById('shortcuts-modal');
        if (modal) modal.classList.remove('open');
        shortcutsModalOpen = false;
        document.body.style.overflow = '';
    }

    // ==========================================
    // GLOBAL KEYBOARD SHORTCUTS
    // ==========================================
    let lastKeyTime = 0;
    let lastKey = '';

    function handleGlobalKeydown(e) {
        // Don't trigger when typing in inputs
        const isInput = e.target.matches('input, textarea, select, [contenteditable]');
        
        // Quick Switcher: Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (quickSwitcherOpen) {
                closeQuickSwitcher();
            } else {
                openQuickSwitcher();
            }
            return;
        }

        // Close modals with Escape
        if (e.key === 'Escape') {
            if (quickSwitcherOpen) {
                closeQuickSwitcher();
                return;
            }
            if (shortcutsModalOpen) {
                closeShortcutsModal();
                return;
            }
        }

        // Skip other shortcuts if in input
        if (isInput) return;

        // Help Modal: ?
        if (e.key === '?' || (e.shiftKey && e.key === '/')) {
            e.preventDefault();
            if (shortcutsModalOpen) {
                closeShortcutsModal();
            } else {
                openShortcutsModal();
            }
            return;
        }

        // G-key navigation (vim style)
        const now = Date.now();
        if (e.key === 'g' || e.key === 'G') {
            lastKey = 'g';
            lastKeyTime = now;
            return;
        }

        if (lastKey === 'g' && now - lastKeyTime < 500) {
            if (e.key === 'h' || e.key === 'H') {
                e.preventDefault();
                window.location.href = '/';
            } else if (e.key === 't' || e.key === 'T') {
                e.preventDefault();
                window.location.href = '/tools';
            }
            lastKey = '';
        }

        // Format/Process: Ctrl+Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const formatBtn = document.querySelector('[data-action="format"], #format-btn, .format-btn, button[onclick*="format"]');
            if (formatBtn) {
                e.preventDefault();
                formatBtn.click();
            }
        }

        // Copy output: Ctrl+Shift+C
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            const copyBtn = document.querySelector('[data-action="copy"], #copy-btn, .copy-btn, button[onclick*="copy"]');
            if (copyBtn) {
                e.preventDefault();
                copyBtn.click();
            }
        }

        // Clear: Ctrl+Shift+X
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'X') {
            const clearBtn = document.querySelector('[data-action="clear"], #clear-btn, .clear-btn, button[onclick*="clear"]');
            if (clearBtn) {
                e.preventDefault();
                clearBtn.click();
            }
        }

        // Download: Ctrl+S (prevent browser save dialog)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            const downloadBtn = document.querySelector('[data-action="download"], #download-btn, .download-btn, button[onclick*="download"]');
            if (downloadBtn) {
                e.preventDefault();
                downloadBtn.click();
            }
        }
    }

    // ==========================================
    // UTILITY: Copy to Clipboard with Feedback
    // ==========================================
    function copyToClipboard(text, feedbackElement) {
        navigator.clipboard.writeText(text).then(() => {
            if (feedbackElement) {
                const original = feedbackElement.innerHTML;
                feedbackElement.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
                if (window.lucide) lucide.createIcons();
                setTimeout(() => {
                    feedbackElement.innerHTML = original;
                    if (window.lucide) lucide.createIcons();
                }, 2000);
            }
        });
    }

    // ==========================================
    // FULLSCREEN MODE
    // ==========================================
    function toggleFullscreen(element) {
        if (!document.fullscreenElement) {
            (element || document.documentElement).requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // ==========================================
    // ENHANCED ACTION BUTTONS
    // ==========================================
    function enhanceActionButtons() {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const cmdKey = isMac ? '⌘' : 'Ctrl';

        // Map common button patterns to shortcuts
        const buttonEnhancements = [
            { selector: '[onclick*="copyOutput"], [onclick*="copyResult"], [id*="copy-btn"]', shortcut: `${cmdKey}+Shift+C`, label: 'Copy' },
            { selector: '[onclick*="clearAll"], [onclick*="clearInput"], [onclick*="clearFields"]', shortcut: `${cmdKey}+Shift+X`, label: 'Clear' },
            { selector: '[onclick*="downloadResult"], [onclick*="download"]', shortcut: `${cmdKey}+S`, label: 'Download' },
            { selector: '[onclick*="format"], [onclick*="beautify"], [onclick*="process"]', shortcut: `${cmdKey}+Enter`, label: 'Format' }
        ];

        buttonEnhancements.forEach(({ selector, shortcut, label }) => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(btn => {
                if (btn.dataset.shortcutEnhanced) return;
                btn.dataset.shortcutEnhanced = 'true';
                
                // Update title with shortcut
                const existingTitle = btn.getAttribute('title') || label;
                btn.setAttribute('title', `${existingTitle} (${shortcut})`);
                
                // Add kbd hint next to button text if it has text content
                const btnText = btn.querySelector('span');
                if (btnText && !btn.querySelector('.kbd-hint')) {
                    const kbd = document.createElement('kbd');
                    kbd.className = 'kbd-hint hidden sm:inline-flex ml-1.5 px-1 py-0.5 text-[9px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded';
                    kbd.textContent = shortcut;
                    btnText.parentNode.insertBefore(kbd, btnText.nextSibling);
                }
            });
        });
    }

    // ==========================================
    // VISIBLE BREADCRUMBS
    // ==========================================
    function addBreadcrumbs() {
        // Only add on tool pages (not homepage, tools list, etc.)
        const path = window.location.pathname;
        const isToolPage = path.match(/^\/(json-formatter|base64-encoder|uuid-generator|jwt-decoder|regex-tester|hash-generator|image-compressor|password-strength-analyzer|javascript-formatter|css-formatter|html-formatter|sql-formatter|markdown-editor|url-encoder|color-picker|timestamp-converter|lorem-ipsum|diff-checker)(\.html)?$/);
        
        if (!isToolPage) return;
        
        // Check if breadcrumbs already exist
        if (document.querySelector('.breadcrumb-nav')) return;

        const toolName = TOOLS.find(t => path.includes(t.url.replace('/', '')))?.name || 'Tool';
        
        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'breadcrumb-nav container mx-auto px-4 sm:px-6 lg:px-8 pt-4';
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');
        breadcrumb.innerHTML = `
            <ol class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <li>
                    <a href="/" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</a>
                </li>
                <li class="flex items-center gap-1.5">
                    <i data-lucide="chevron-right" class="w-3 h-3"></i>
                    <a href="/tools" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Tools</a>
                </li>
                <li class="flex items-center gap-1.5">
                    <i data-lucide="chevron-right" class="w-3 h-3"></i>
                    <span class="text-neutral-900 dark:text-neutral-100 font-medium">${toolName}</span>
                </li>
            </ol>
        `;

        // Insert after header/nav
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(breadcrumb, main.firstChild);
            if (window.lucide) lucide.createIcons();
        }
    }

    // ==========================================
    // FULLSCREEN TOGGLE BUTTON
    // ==========================================
    function addFullscreenButton() {
        // Only add on tool pages
        const path = window.location.pathname;
        const isToolPage = path.match(/^\/(json-formatter|base64-encoder|uuid-generator|jwt-decoder|regex-tester|hash-generator|image-compressor|password-strength-analyzer)(\.html)?$/);
        
        if (!isToolPage) return;
        if (document.querySelector('.fullscreen-toggle')) return;

        const btn = document.createElement('button');
        btn.className = 'fullscreen-toggle fixed bottom-4 right-4 z-40 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group';
        btn.setAttribute('title', 'Toggle Fullscreen (F11)');
        btn.innerHTML = '<i data-lucide="maximize" class="w-5 h-5 text-neutral-600 dark:text-neutral-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"></i>';
        btn.onclick = () => toggleFullscreen();
        
        document.body.appendChild(btn);
        if (window.lucide) lucide.createIcons();

        // Update icon on fullscreen change
        document.addEventListener('fullscreenchange', () => {
            const icon = btn.querySelector('i');
            icon.setAttribute('data-lucide', document.fullscreenElement ? 'minimize' : 'maximize');
            if (window.lucide) lucide.createIcons();
        });
    }

    // ==========================================
    // MOBILE TOUCH TARGET OPTIMIZATION
    // ==========================================
    function addMobileTouchTargets() {
        // Only apply on mobile/touch devices
        if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

        const style = document.createElement('style');
        style.textContent = `
            /* Mobile touch target optimization - minimum 44x44px */
            @media (max-width: 768px) {
                /* Ensure minimum touch target size for buttons */
                button, 
                [role="button"], 
                .btn,
                a[onclick] {
                    min-height: 44px;
                    min-width: 44px;
                }

                /* Toolbar buttons should have adequate spacing */
                [class*="flex"][class*="gap-"] button {
                    padding-top: 0.625rem;
                    padding-bottom: 0.625rem;
                }

                /* Icon-only buttons need larger click area */
                button:has(i:only-child),
                button:has(svg:only-child) {
                    padding: 0.75rem;
                }

                /* Copy/action buttons in toolbars */
                [onclick*="copy"],
                [onclick*="clear"],
                [onclick*="download"] {
                    min-height: 44px;
                    padding: 0.5rem 0.75rem;
                }

                /* Increase spacing between clickable items */
                .flex.gap-2 {
                    gap: 0.75rem;
                }

                /* Tab buttons */
                [onclick*="switch"],
                [onclick*="tab"] {
                    min-height: 40px;
                    padding: 0.5rem 1rem;
                }
            }

            /* Ensure touch targets are easily tappable on touch devices */
            @media (pointer: coarse) {
                button,
                [role="button"],
                input[type="checkbox"],
                input[type="radio"] {
                    min-height: 44px;
                    min-width: 44px;
                }

                input[type="checkbox"],
                input[type="radio"] {
                    width: 20px;
                    height: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================
    function init() {
        // Track current tool visit
        trackCurrentTool();
        
        // Set up global keyboard shortcuts
        document.addEventListener('keydown', handleGlobalKeydown);

        // Enhance action buttons with shortcut hints
        enhanceActionButtons();

        // Add visible breadcrumbs on tool pages
        addBreadcrumbs();

        // Add fullscreen toggle button
        addFullscreenButton();

        // Apply mobile touch target optimization
        addMobileTouchTargets();

        // Expose global API
        window.SDT = {
            openQuickSwitcher,
            closeQuickSwitcher,
            openShortcutsModal,
            closeShortcutsModal,
            getRecentTools,
            getFavoriteTools,
            toggleFavoriteTool,
            isFavorite,
            copyToClipboard,
            toggleFullscreen,
            enhanceActionButtons,
            TOOLS
        };

        // console.log('🛠️ SimpleDevTools UX Enhancements loaded. Press Ctrl+K to search tools, ? for shortcuts.');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
