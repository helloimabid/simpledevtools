// Client-Side Router - Handles navigation without .html extensions
class SimpleRouter {
  constructor() {
    this.pages = {
      "/": "index.html",
      "/json-formatter": "json-formatter.html",
      "/privacy-policy": "privacy-policy.html",
      "/terms": "terms.html",
    };

    this.contentContainer = null;
    this.init();
  }

  init() {
    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => this.loadPage());

    // Intercept all internal link clicks
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");

      // Only handle internal links (not external, not anchors)
      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("#") &&
        href !== "/"
      ) {
        e.preventDefault();
        this.navigate(href);
      } else if (href === "/" || href === "index.html") {
        e.preventDefault();
        this.navigate("/");
      }
    });

    // Load initial page
    this.loadPage();
  }

  navigate(path) {
    // Normalize path
    if (path.endsWith(".html")) {
      path = path.replace(".html", "");
    }
    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    // Update URL without reload
    window.history.pushState({ path }, "", path);
    this.loadPage();
  }

  async loadPage() {
    const path = window.location.pathname;
    let pagePath = this.pages[path] || this.pages["/"];

    try {
      let response = await fetch(pagePath);

      // If fetch fails, try fallback to .html file
      if (!response.ok) {
        // Try fetching with .html extension as fallback
        const htmlPath = pagePath.endsWith(".html")
          ? pagePath
          : pagePath + ".html";
        response = await fetch(htmlPath);
        if (!response.ok) throw new Error("Page not found");
      }

      const html = await response.text();

      // Extract and update page content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Update title and meta
      document.title = doc.title;

      // Update meta description
      const metaDesc = doc.querySelector('meta[name="description"]');
      if (metaDesc) {
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", metaDesc.getAttribute("content"));
      }

      // Replace main content
      const newMain = doc.querySelector("main");
      const currentMain = document.querySelector("main");
      if (newMain && currentMain) {
        currentMain.innerHTML = newMain.innerHTML;
      }

      // Replace footer if present
    //   const newFooter = doc.querySelector("footer");
    //   const currentFooter = document.querySelector("footer");
    //   if (newFooter && currentFooter) {
    //     currentFooter.innerHTML = newFooter.innerHTML;
    //     // Re-attach click handlers to footer links
    //     this.attachFooterLinks();
    //   }

      // Re-initialize icons and scripts
      if (window.lucide) {
        lucide.createIcons();
      }

      // Scroll to top
      window.scrollTo(0, 0);

      // Re-attach theme toggle
      this.attachThemeToggle();
    } catch (error) {
      console.error("Error loading page:", error);
      // Fallback: reload the page normally
      window.location.href = window.location.pathname.endsWith("/")
        ? "index.html"
        : window.location.pathname + ".html";
    }
  }

  attachThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
      // Remove old listeners
      const newBtn = themeToggleBtn.cloneNode(true);
      themeToggleBtn.parentNode.replaceChild(newBtn, themeToggleBtn);

      // Add new listener
      newBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        if (document.documentElement.classList.contains("dark")) {
          localStorage.theme = "dark";
        } else {
          localStorage.theme = "light";
        }
      });
    }
  }

  attachFooterLinks() {
    const footerLinks = document.querySelectorAll("footer a");
    footerLinks.forEach((link) => {
      const href = link.getAttribute("href");

      // Only handle internal links
      if (href && !href.startsWith("http") && !href.startsWith("mailto:")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.navigate(href);
        });
      }
    });
  }
}

// Initialize router when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new SimpleRouter();
  });
} else {
  new SimpleRouter();
}
