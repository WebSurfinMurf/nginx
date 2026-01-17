/**
 * Agent Workflow Documentation - Interactive Features
 *
 * Provides:
 * - Level navigation with smooth scrolling
 * - Diagram animations
 * - Collapsible sections
 * - Search functionality
 * - Dark mode toggle
 */

document.addEventListener('DOMContentLoaded', function() {
    initLevelNavigation();
    initDiagramAnimations();
    initCollapsibleSections();
    initSearch();
    initDarkMode();
    initScrollProgress();
    highlightCurrentLevel();
});

// =============================================================================
// Level Navigation
// =============================================================================

function initLevelNavigation() {
    const levelCards = document.querySelectorAll('.level-card');

    levelCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add highlight effect
                targetSection.classList.add('highlight');
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 2000);
            }
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
}

// =============================================================================
// Diagram Animations
// =============================================================================

function initDiagramAnimations() {
    const diagrams = document.querySelectorAll('.workflow-diagram, .level-diagram');

    // Intersection Observer for triggering animations when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateDiagramElements(entry.target);
            }
        });
    }, { threshold: 0.3 });

    diagrams.forEach(diagram => observer.observe(diagram));
}

function animateDiagramElements(diagram) {
    // Animate arrows/paths
    const paths = diagram.querySelectorAll('path[stroke-dasharray], line[stroke-dasharray]');
    paths.forEach((path, index) => {
        const length = path.getTotalLength ? path.getTotalLength() : 100;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `drawLine 1s ease-out ${index * 0.2}s forwards`;
    });

    // Animate boxes/rects
    const rects = diagram.querySelectorAll('rect:not(.bg)');
    rects.forEach((rect, index) => {
        rect.style.opacity = '0';
        rect.style.animation = `fadeInScale 0.5s ease-out ${index * 0.1}s forwards`;
    });

    // Animate text
    const texts = diagram.querySelectorAll('text');
    texts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.animation = `fadeIn 0.3s ease-out ${0.5 + index * 0.05}s forwards`;
    });
}

// =============================================================================
// Collapsible Sections
// =============================================================================

function initCollapsibleSections() {
    const agentCards = document.querySelectorAll('.agent-card');
    const skillRows = document.querySelectorAll('.skill-row');
    const hookRows = document.querySelectorAll('.hook-row');

    // Make agent cards expandable
    agentCards.forEach(card => {
        const header = card.querySelector('.agent-header');
        const content = card.querySelector('.agent-content');

        if (header && content) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                card.classList.toggle('expanded');
                content.style.maxHeight = card.classList.contains('expanded')
                    ? content.scrollHeight + 'px'
                    : '200px';
            });
        }
    });

    // Add hover effects to table rows
    [...skillRows, ...hookRows].forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        row.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

// =============================================================================
// Search Functionality
// =============================================================================

function initSearch() {
    // Create search container if it doesn't exist
    let searchContainer = document.querySelector('.search-container');
    if (!searchContainer) {
        searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="search-input" placeholder="Search agents, skills, hooks..." />
            <div id="search-results" class="search-results"></div>
        `;

        const header = document.querySelector('header');
        if (header) {
            header.appendChild(searchContainer);
        }
    }

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    // Build search index
    const searchIndex = buildSearchIndex();

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query) ||
            item.tags.some(tag => tag.toLowerCase().includes(query))
        );

        displaySearchResults(results, searchResults);
    });

    // Close search on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.style.display = 'none';
            searchInput.value = '';
        }
    });

    // Keyboard shortcut to focus search (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

function buildSearchIndex() {
    const index = [];

    // Index agents
    document.querySelectorAll('.agent-card').forEach(card => {
        const name = card.querySelector('.agent-name')?.textContent || '';
        const desc = card.querySelector('.agent-description')?.textContent || '';
        index.push({
            type: 'agent',
            title: name,
            content: desc,
            tags: ['agent', name.toLowerCase()],
            element: card
        });
    });

    // Index skills
    document.querySelectorAll('.skill-row, tr[data-skill]').forEach(row => {
        const name = row.querySelector('td:first-child')?.textContent || '';
        const desc = row.querySelector('td:nth-child(2)')?.textContent || '';
        index.push({
            type: 'skill',
            title: name,
            content: desc,
            tags: ['skill', name.toLowerCase()],
            element: row
        });
    });

    // Index hooks
    document.querySelectorAll('.hook-row, tr[data-hook]').forEach(row => {
        const name = row.querySelector('td:first-child')?.textContent || '';
        const desc = row.querySelector('td:nth-child(2)')?.textContent || '';
        index.push({
            type: 'hook',
            title: name,
            content: desc,
            tags: ['hook', name.toLowerCase()],
            element: row
        });
    });

    // Index sections
    document.querySelectorAll('section[id]').forEach(section => {
        const title = section.querySelector('h2, h3')?.textContent || '';
        const content = section.textContent?.substring(0, 200) || '';
        index.push({
            type: 'section',
            title: title,
            content: content,
            tags: ['section', section.id],
            element: section
        });
    });

    return index;
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No results found</div>';
        container.style.display = 'block';
        return;
    }

    container.innerHTML = results.slice(0, 10).map(result => `
        <div class="search-result" data-type="${result.type}">
            <span class="result-type">${result.type}</span>
            <span class="result-title">${result.title}</span>
            <span class="result-preview">${result.content.substring(0, 80)}...</span>
        </div>
    `).join('');

    container.style.display = 'block';

    // Add click handlers
    container.querySelectorAll('.search-result').forEach((resultEl, index) => {
        resultEl.addEventListener('click', () => {
            const target = results[index].element;
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('highlight');
            setTimeout(() => target.classList.remove('highlight'), 2000);
            container.style.display = 'none';
        });
    });
}

// =============================================================================
// Dark Mode
// =============================================================================

function initDarkMode() {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.innerHTML = '<span class="sun">&#9728;</span><span class="moon">&#9790;</span>';
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(toggleBtn);

    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}

// =============================================================================
// Scroll Progress
// =============================================================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// =============================================================================
// Highlight Current Level
// =============================================================================

function highlightCurrentLevel() {
    const sections = document.querySelectorAll('section[id^="level"]');
    const navItems = document.querySelectorAll('.level-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('data-target') === id);
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// =============================================================================
// CSS Animations (injected dynamically)
// =============================================================================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes drawLine {
        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }

    @keyframes fadeInScale {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .highlight {
        animation: highlightPulse 2s ease-out;
    }

    @keyframes highlightPulse {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(0, 133, 255, 0.1); }
    }

    .search-container {
        position: relative;
        margin-left: auto;
    }

    #search-input {
        padding: 8px 16px;
        border: 1px solid var(--border-color, #ddd);
        border-radius: 20px;
        width: 250px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    #search-input:focus {
        width: 350px;
        outline: none;
        border-color: var(--primary-color, #0085ff);
        box-shadow: 0 0 0 3px rgba(0, 133, 255, 0.1);
    }

    .search-results {
        position: absolute;
        top: 100%;
        right: 0;
        width: 400px;
        max-height: 400px;
        overflow-y: auto;
        background: var(--bg-color, white);
        border: 1px solid var(--border-color, #ddd);
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: none;
        z-index: 1000;
    }

    .search-result {
        padding: 12px 16px;
        border-bottom: 1px solid var(--border-color, #eee);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .search-result:hover {
        background: var(--hover-bg, #f5f5f5);
    }

    .result-type {
        font-size: 10px;
        text-transform: uppercase;
        color: var(--primary-color, #0085ff);
        font-weight: 600;
    }

    .result-title {
        font-weight: 500;
        color: var(--text-color, #333);
    }

    .result-preview {
        font-size: 12px;
        color: var(--text-muted, #666);
    }

    .no-results {
        padding: 20px;
        text-align: center;
        color: var(--text-muted, #666);
    }

    .dark-mode-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--bg-secondary, #f0f0f0);
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: all 0.3s ease;
    }

    .dark-mode-toggle:hover {
        transform: scale(1.1);
    }

    .dark-mode-toggle .sun { display: inline; }
    .dark-mode-toggle .moon { display: none; }

    body.dark-mode .dark-mode-toggle .sun { display: none; }
    body.dark-mode .dark-mode-toggle .moon { display: inline; }

    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0085ff, #00d4aa);
        z-index: 9999;
        transition: width 0.1s ease;
    }

    /* Dark mode styles */
    body.dark-mode {
        --bg-color: #1a1a2e;
        --bg-secondary: #16213e;
        --text-color: #eee;
        --text-muted: #aaa;
        --border-color: #333;
        --hover-bg: #1f2940;
        background-color: var(--bg-color);
        color: var(--text-color);
    }

    body.dark-mode header {
        background: var(--bg-secondary);
    }

    body.dark-mode .level-card,
    body.dark-mode .agent-card,
    body.dark-mode section {
        background: var(--bg-secondary);
        border-color: var(--border-color);
    }

    body.dark-mode table {
        background: var(--bg-secondary);
    }

    body.dark-mode th {
        background: #0f3460;
    }

    body.dark-mode tr:nth-child(even) {
        background: rgba(255,255,255,0.02);
    }

    body.dark-mode .workflow-diagram rect,
    body.dark-mode .level-diagram rect {
        fill: var(--bg-secondary);
    }

    body.dark-mode .workflow-diagram text,
    body.dark-mode .level-diagram text {
        fill: var(--text-color);
    }

    /* Level card active state */
    .level-card.active {
        border-color: var(--primary-color, #0085ff);
        box-shadow: 0 0 0 3px rgba(0, 133, 255, 0.2);
    }

    /* Expanded card state */
    .agent-card.expanded .agent-content {
        max-height: none !important;
    }
`;
document.head.appendChild(styleSheet);

// =============================================================================
// Utility: Copy Code Blocks
// =============================================================================

document.querySelectorAll('pre code, .code-block').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(block.textContent);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });
    block.parentElement.style.position = 'relative';
    block.parentElement.appendChild(copyBtn);
});

// Add copy button styles
const copyBtnStyles = document.createElement('style');
copyBtnStyles.textContent = `
    .copy-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 12px;
        font-size: 12px;
        background: rgba(0,0,0,0.1);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
    }

    pre:hover .copy-btn,
    .code-block:hover .copy-btn {
        opacity: 1;
    }

    .copy-btn:hover {
        background: rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(copyBtnStyles);

console.log('Agent Workflow Documentation loaded successfully');
