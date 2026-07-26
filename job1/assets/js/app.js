/**
 * ============================================================================
 * Egypt-American Machinery Global - Master Application Logic
 * ============================================================================
 * Includes: Router, i18n RTL Engine, Web3Forms Direct Email Handler, OpenRouter AI Chatbot,
 * and UI Modal & Filtering Controllers.
 */

class EgyptAmericanApp {
  constructor() {
    this.config = window.EGYPT_AMERICAN_CONFIG || {};
    this.currentLang = localStorage.getItem("ea_lang") || "ar";
    this.currentTheme = localStorage.getItem("ea_theme") || "dark";
    this.currentCategoryFilter = "all";
    this.currentBrandFilter = "all";
    this.searchQuery = "";
    this.aiMessages = [];
    this.aiOpen = false;
  }

  init() {
    this.loadCatalog();
    this.initTheme();
    this.initSideDrawer();
    this.initI18n();
    this.initRouter();
    this.initPreloader();
    this.renderBrands();
    this.renderProducts();
    this.initAIChat();
    this.bindEvents();
    this.initScrollEffects();
    this.initObservers();
  }

  loadCatalog() {
    try {
      const customSaved = localStorage.getItem("ea_custom_products");
      if (customSaved) {
        const customList = JSON.parse(customSaved);
        if (Array.isArray(customList)) {
          customList.forEach(p => {
            if (!EGYPT_AMERICAN_DATA.products.some(existing => existing.id === p.id)) {
              EGYPT_AMERICAN_DATA.products.unshift(p);
            }
          });
        }
      }
    } catch (e) {
      console.warn("Catalog load note:", e);
    }
  }

  saveFullCatalog() {
    try {
      localStorage.setItem("ea_full_catalog", JSON.stringify(EGYPT_AMERICAN_DATA.products));
      localStorage.setItem("ea_custom_products", JSON.stringify(EGYPT_AMERICAN_DATA.products.filter(p => p.id && p.id.startsWith("prod-"))));
    } catch (e) {
      console.warn("Catalog save note:", e);
    }
  }

  exportDataJsFile() {
    try {
      const fullDataStr = "/**\n * EGYPT AMERICA CENTER DATA CATALOG\n */\nwindow.EGYPT_AMERICAN_DATA = " + JSON.stringify(EGYPT_AMERICAN_DATA, null, 2) + ";\n";
      const blob = new Blob([fullDataStr], { type: "text/javascript;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.js");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export data.js failed:", e);
    }
  }

  initTheme() {
    this.setTheme(this.currentTheme);
    const toggleHeader = document.getElementById("theme-toggle-btn");
    const toggleDrawer = document.getElementById("theme-toggle-drawer");
    const toggle = () => {
      const newTheme = this.currentTheme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    };
    if (toggleHeader) toggleHeader.addEventListener("click", toggle);
    if (toggleDrawer) toggleDrawer.addEventListener("click", toggle);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem("ea_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    this.applyTranslations();
  }

  initSideDrawer() {
    const drawer = document.getElementById("side-drawer");
    const toggleBtn = document.getElementById("drawer-toggle-btn");
    const closeBtn = document.getElementById("drawer-close-btn");
    const backdrop = document.getElementById("drawer-backdrop");

    const openDrawer = () => drawer && drawer.classList.add("active");
    const closeDrawer = () => drawer && drawer.classList.remove("active");

    if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (backdrop) backdrop.addEventListener("click", closeDrawer);

    document.querySelectorAll(".drawer-link").forEach(link => {
      link.addEventListener("click", closeDrawer);
    });
  }

  /* -------------------------------------------------------------------------
   * 1. i18n & RTL ENGINE (Smooth Dropdown Fix)
   * ------------------------------------------------------------------------- */
  initI18n() {
    this.setLanguage(this.currentLang);

    const trigger = document.getElementById("lang-menu-trigger");
    const menu = document.querySelector(".lang-menu");

    if (trigger && menu) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.toggle("show");
      });

      // Close dropdown when clicking anywhere outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".lang-dropdown")) {
          menu.classList.remove("show");
        }
      });
    }

    document.querySelectorAll(".lang-select-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lang = btn.getAttribute("data-lang");
        if (lang) {
          this.setLanguage(lang);
          if (menu) menu.classList.remove("show");
        }
      });
    });
  }

  setLanguage(lang) {
    if (!["en", "ar", "zh"].includes(lang)) lang = "ar";
    this.currentLang = lang;
    localStorage.setItem("ea_lang", lang);

    // Apply RTL / LTR direction
    const isRtl = lang === "ar";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    if (isRtl) document.body.classList.add("rtl-mode");
    else document.body.classList.remove("rtl-mode");

    // Update Dropdown Labels
    const labels = {
      en: { name: "English", flag: "🇺🇸" },
      ar: { name: "العربية", flag: "🇪🇬" },
      zh: { name: "简体中文", flag: "🇨🇳" }
    };
    const currentLabel = document.getElementById("current-lang-label");
    const currentFlag = document.getElementById("current-lang-flag");
    if (currentLabel && labels[lang]) currentLabel.innerText = labels[lang].name;
    if (currentFlag && labels[lang]) currentFlag.innerText = labels[lang].flag;

    this.applyTranslations();
    this.renderBrands();
    this.renderProducts();
    this.resetAIChat(); // Refresh AI welcome message language
  }

  applyTranslations() {
    const dictionary = EGYPT_AMERICAN_DATA.translations[this.currentLang];
    if (!dictionary) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const path = el.getAttribute("data-i18n").split(".");
      let val = dictionary;
      for (const key of path) {
        if (val && val[key] !== undefined) val = val[key];
        else { val = null; break; }
      }
      if (val) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          if (el.hasAttribute("placeholder")) el.placeholder = val;
          else el.value = val;
        } else {
          el.innerText = val;
        }
      }
    });
  }

  getText(keyPath) {
    const dictionary = EGYPT_AMERICAN_DATA.translations[this.currentLang] || EGYPT_AMERICAN_DATA.translations.en;
    const path = keyPath.split(".");
    let val = dictionary;
    for (const k of path) {
      if (val && val[k] !== undefined) val = val[k];
      else return keyPath;
    }
    return val;
  }

  /* -------------------------------------------------------------------------
   * 2. ROUTER & VIEWS
   * ------------------------------------------------------------------------- */
  initRouter() {
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
  }

  handleRoute() {
    let hash = window.location.hash.substring(1).toLowerCase() || "home";

    if (hash.startsWith("brand/")) {
      const brandId = hash.split("/")[1];
      this.showView("brands");
      this.openBrandModal(brandId);
      return;
    }

    if (hash.startsWith("product/")) {
      const prodId = hash.split("/")[1];
      this.showView("products");
      this.openProductModal(prodId);
      return;
    }

    const validRoutes = ["home", "about", "products", "brands", "contact", "admin"];
    if (!validRoutes.includes(hash)) hash = "home";
    this.showView(hash);
  }

  showView(viewId) {
    document.querySelectorAll(".page-view").forEach(v => {
      v.classList.remove("active-view");
      v.style.display = "none";
    });

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.style.display = "block";
      setTimeout(() => target.classList.add("active-view"), 20);
    }

    if (viewId === "admin") {
      this.initAdminPortal();
    }

    document.querySelectorAll(".nav-link, .drawer-link").forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href === `#${viewId}`) link.classList.add("active");
      else link.classList.remove("active");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* -------------------------------------------------------------------------
   * 3. UI RENDERING & FILTERS
   * ------------------------------------------------------------------------- */
  initPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    let hidden = false;
    const hideLoader = () => {
      if (hidden) return;
      hidden = true;
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 400);
    };

    setTimeout(hideLoader, 1000);
    // Removed window.addEventListener("load", hideLoader) to force a 1-second display.
  }

  renderBrands() {
    const homeMarquee = document.getElementById("home-partners-marquee");
    const brandsGrid = document.getElementById("brands-page-grid");
    const data = EGYPT_AMERICAN_DATA.brands;

    // 1. Render Giant Non-Stop Moving Marquee on Home Page (Non-clickable, endless loop)
    if (homeMarquee) {
      const marqueeItemsHtml = [...data, ...data, ...data].map(b => {
        const country = this.getText(`brands_dictionary.countries.${b.country}`) !== `brands_dictionary.countries.${b.country}` ? this.getText(`brands_dictionary.countries.${b.country}`) : b.country;
        let subName = b.subName || "";
        const brandInfo = this.getText(`brands_info.${b.id}`);
        if (brandInfo && brandInfo !== `brands_info.${b.id}`) {
          subName = brandInfo.subName || subName;
        }
        return `
        <div class="marquee-brand-item marquee-giant-item">
          <div class="marquee-logo-box giant-logo-box">
            <img src="${b.logo}" alt="${b.name}" class="marquee-brand-logo" />
          </div>
          <div class="marquee-brand-info">
            <span class="marquee-brand-title giant-title">${b.name}</span>
            <span class="marquee-brand-sub giant-sub">${subName || country} ${b.flag}</span>
          </div>
        </div>
      `}).join("");
      homeMarquee.innerHTML = marqueeItemsHtml;
    }

    // 2. Render Rich Interactive 3D Cards on Brands & Partners Page (#brands)
    if (brandsGrid) {
      const brandCardsHtml = data.map((b, index) => {
        const country = this.getText(`brands_dictionary.countries.${b.country}`) !== `brands_dictionary.countries.${b.country}` ? this.getText(`brands_dictionary.countries.${b.country}`) : b.country;
        const badge = this.getText(`brands_dictionary.badges.${b.badge}`) !== `brands_dictionary.badges.${b.badge}` ? this.getText(`brands_dictionary.badges.${b.badge}`) : b.badge;
        const refText = this.getText(`brands_dictionary.references`) !== `brands_dictionary.references` ? this.getText(`brands_dictionary.references`) : "References";
        
        let subName = b.subName || "";
        let tagline = b.tagline || b.description || "";
        const brandInfo = this.getText(`brands_info.${b.id}`);
        if (brandInfo && brandInfo !== `brands_info.${b.id}`) {
          subName = brandInfo.subName || subName;
          tagline = brandInfo.tagline || tagline;
        }

        return `
        <div class="brand-portal-card glass-card glow-pulse-card reveal-on-scroll" style="animation-delay: ${index * 0.15}s">
          <div class="brand-card-top-bar">
            <span class="brand-badge-tag">${badge}</span>
            <span class="brand-country-badge">${b.flag} ${country}</span>
          </div>
          <div class="brand-portal-logo-wrap">
            <img src="${b.logo}" alt="${b.name}" class="brand-portal-logo" />
          </div>
          <h3 class="brand-portal-name">${b.name}</h3>
          <p class="brand-portal-subname">${subName}</p>
          <p class="brand-portal-desc">${tagline}</p>
        </div>
      `}).join("");
      brandsGrid.innerHTML = brandCardsHtml;
    }
  }

  filterProductsByBrand(brandId) {
    this.currentBrandFilter = brandId;
    const brandSelect = document.getElementById("product-brand-filter");
    if (brandSelect) brandSelect.value = brandId;
    location.hash = "products";
    this.renderProducts();
  }

  renderProducts() {
    const homeGrid = document.getElementById("products-catalog-grid");
    const pageGrid = document.getElementById("products-page-catalog-grid");

    let items = EGYPT_AMERICAN_DATA.products;
    const detailsText = this.getText("products.view_details");
    const inquireText = this.getText("products.inquire_now");

    if (this.currentCategoryFilter !== "all") {
      items = items.filter(p => (p.category || "").toLowerCase().replace(/\s+/g, "_") === this.currentCategoryFilter.toLowerCase().replace(/\s+/g, "_"));
    }

    if (this.currentBrandFilter && this.currentBrandFilter !== "all") {
      const targetB = this.currentBrandFilter.toLowerCase();
      items = items.filter(p => {
        const bId = (p.brandId || "").toLowerCase();
        const bName = (p.brandName || p.brand || "").toLowerCase();
        return bId === targetB || bName.includes(targetB) || targetB.includes(bId);
      });
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      items = items.filter(p => {
        const nameEn = (p.name || "").toLowerCase();
        const nameAr = (p.translations?.ar?.name || (typeof p.title === "object" ? p.title.ar : "") || "").toLowerCase();
        const nameZh = (p.translations?.zh?.name || (typeof p.title === "object" ? p.title.zh : "") || "").toLowerCase();
        const descEn = (p.shortDesc || p.fullDesc || "").toLowerCase();
        const descAr = (p.translations?.ar?.shortDesc || (typeof p.desc === "object" ? p.desc.ar : "") || "").toLowerCase();
        const code = (p.code || "").toLowerCase();
        const brand = (p.brandName || p.brand || "").toLowerCase();

        return nameEn.includes(q) || nameAr.includes(q) || nameZh.includes(q) ||
               descEn.includes(q) || descAr.includes(q) ||
               code.includes(q) || brand.includes(q);
      });
    }

    let html = "";
    if (items.length === 0) {
      html = `
        <div class="no-products-msg glass-panel" style="padding: 40px; text-align: center; grid-column: 1 / -1;">
          <h3>No matching products found</h3>
          <p style="color: var(--text-dark-secondary);">Try adjusting your search query or category filters.</p>
        </div>
      `;
    } else {
      html = items.map(p => `
        <div class="product-card glass-card reveal-on-scroll">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.onerror=null; this.src='assets/images/machinery_knitting_1.png';" />
            <span class="product-cat-tag">${p.category}</span>
          </div>
          <div class="product-info">
            <div class="product-brand-flag">
              <span>${p.flag}</span>
              <span class="brand-name">${p.brandName}</span>
              <span class="country-badge">(${p.country})</span>
            </div>
            <h3 class="product-title">${p.translations?.[this.currentLang]?.name || p.name}</h3>
            <p class="product-desc">${p.translations?.[this.currentLang]?.shortDesc || p.shortDesc}</p>
            <div class="product-actions">
              <button class="btn btn-sm btn-outline" onclick="window.app.openProductModal('${p.id}')">${detailsText}</button>
              <button class="btn btn-sm btn-gold" onclick="window.app.inquireProduct('${p.name}')">${inquireText}</button>
            </div>
          </div>
        </div>
      `).join("");
    }

    if (homeGrid) homeGrid.innerHTML = html;
    if (pageGrid) pageGrid.innerHTML = html;

    this.applyTranslations();
    document.querySelectorAll(".reveal-on-scroll").forEach(el => el.classList.add("reveal-active"));
  }

  /* -------------------------------------------------------------------------
   * 4. MODALS & INQUIRIES
   * ------------------------------------------------------------------------- */
  openProductModal(productId) {
    const product = EGYPT_AMERICAN_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("product-modal");
    const content = document.getElementById("product-modal-content");
    if (!modal || !content) return;

    const inquireText = this.getText("products.inquire_now");
    const downloadText = this.getText("brands_page.download_catalog");

    content.innerHTML = `
      <div class="product-modal-grid">
        <div class="product-modal-gallery">
          <img src="${product.image}" alt="${product.name}" class="main-modal-img" onerror="this.onerror=null; this.src='assets/images/machinery_knitting_1.png';" />
        </div>
        <div class="product-modal-details">
          <div class="product-modal-header">
            <span class="modal-badge">${product.flag} ${product.brandName} • ${product.translations?.[this.currentLang]?.country || product.country}</span>
            <h2>${product.translations?.[this.currentLang]?.name || product.name}</h2>
            <span class="category-pill">${product.category}</span>
          </div>
          <p class="full-desc" style="margin: 16px 0; color: var(--text-dark-secondary);">${product.translations?.[this.currentLang]?.fullDesc || product.fullDesc}</p>

          <h4 class="specs-title">Technical Specifications</h4>
          <table class="specs-table">
            <tbody>
              ${Object.entries(product.specs).map(([k, v]) => `
                <tr><th>${k}</th><td>${v}</td></tr>
              `).join("")}
            </tbody>
          </table>

          <div class="modal-actions-bar">
            <button class="btn btn-gold" onclick="window.app.inquireProduct('${product.name}')">${inquireText}</button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  }

  openBrandModal(brandId) {
    const brand = EGYPT_AMERICAN_DATA.brands.find(b => b.id === brandId);
    if (!brand) return;

    const modal = document.getElementById("brand-modal");
    const content = document.getElementById("brand-modal-content");
    if (!modal || !content) return;

    const brandProducts = EGYPT_AMERICAN_DATA.products.filter(p => p.brandId === brand.id);
    const downloadText = this.getText("brands_page.download_catalog");
    const contactSalesText = this.getText("nav.contact");

    content.innerHTML = `
      <div class="brand-modal-wrap">
        <div class="brand-modal-header" style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
          <span style="font-size: 2.5rem;">${brand.flag}</span>
          <div>
            <h2>${brand.name} Agency Portal</h2>
            <span class="gold-text">${brand.badge} • ${brand.country}</span>
          </div>
        </div>
        <p style="color: var(--text-dark-secondary); margin-bottom: 24px;">${brand.overview}</p>
        
        <h3>Official Machinery & Spare Parts Lineup (${brandProducts.length} Items)</h3>
        <div class="brand-products-mini-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin: 20px 0;">
          ${brandProducts.map(p => `
            <div class="mini-prod-card glass-card" style="padding: 12px; cursor: pointer;" onclick="window.app.openProductModal('${p.id}')">
              <img src="${p.image}" alt="${p.name}" style="height: 100px; width: 100%; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
              <h4 style="font-size: 0.85rem;">${p.name}</h4>
              <span style="font-size: 0.75rem; color: var(--accent-gold);">${p.category}</span>
            </div>
          `).join("")}
        </div>

        <div class="brand-modal-footer-actions" style="display: flex; gap: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-glass-dark);">
          <button class="btn btn-gold" onclick="window.app.downloadCatalog('${brand.catalogFile}')">${downloadText}</button>
          <button class="btn btn-outline" onclick="window.app.inquireProduct('Agency Inquiry: ${brand.name}')">${contactSalesText}</button>
        </div>
      </div>
    `;

    modal.classList.add("active");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  inquireProduct(productName) {
    this.closeModal("product-modal");
    this.closeModal("brand-modal");
    this.closeModal("quote-modal");
    location.hash = "contact";

    setTimeout(() => {
      const productInput = document.getElementById("contact-product-input");
      const messageInput = document.getElementById("contact-message-input");
      if (productInput) productInput.value = productName;
      if (messageInput) messageInput.focus();
      const formEl = document.getElementById("contact-form");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  /* -------------------------------------------------------------------------
   * 5. WEB3FORMS & LOCAL INQUIRY SUBMISSION
   * ------------------------------------------------------------------------- */
  async handleFormSubmit(formEl, statusId, onSuccess) {
    const statusEl = document.getElementById(statusId);
    const submitBtn = formEl.querySelector("button[type='submit']");
    const originalBtnText = submitBtn ? submitBtn.innerText : "";
    const submittingTxt = this.currentLang === "ar" ? "جاري الإرسال..." : this.currentLang === "zh" ? "发送中..." : "Submitting...";
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = submittingTxt; }

    const payload = {
      id: "inq_" + Date.now(),
      created_at: new Date().toISOString(),
      name: formEl.querySelector("[name='name']")?.value?.trim() || "",
      company: formEl.querySelector("[name='company']")?.value?.trim() || "",
      phone: formEl.querySelector("[name='phone']")?.value?.trim() || "",
      email: formEl.querySelector("[name='email']")?.value?.trim() || "",
      product: formEl.querySelector("[name='product']")?.value?.trim() || "",
      message: formEl.querySelector("[name='message']")?.value?.trim() || "",
      form_type: formEl.id === "quote-modal-form" ? "Request Official Quote Modal" : "Contact Page Inquiry",
      lang: this.currentLang
    };

    try {
      const accessKey = this.config.WEB3FORMS_ACCESS_KEY || this.config.WEB3FORMS_KEY;
      if (accessKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Inquiry from ${payload.name} (${payload.company || "Client"}) - Egypt America Center`,
            from_name: "Egypt America Center Website",
            ...payload
          })
        });
        const data = await res.json();
        if (!data.success) {
          console.warn("Web3Forms status warning:", data.message);
        }
      } else if (this.config.FORMSPREE_ENDPOINT) {
        await fetch(this.config.FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn("Submission transport note:", err);
    }

    // Save local backup (Keep only the latest 3 inquiries to avoid clutter)
    let saved = JSON.parse(localStorage.getItem("ea_inquiries") || "[]");
    saved.unshift(payload);
    if (saved.length > 3) saved = saved.slice(0, 3);
    localStorage.setItem("ea_inquiries", JSON.stringify(saved));

    this.renderAdminInquiries();

    if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = originalBtnText || this.getText("contact.form_submit"); }

    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.className = "form-status success";

      const waText = encodeURIComponent(
        `📌 *طلب استفسار جديد (مركز مصر أمريكا)*\n` +
        `• *الاسم:* ${payload.name}\n` +
        `• *الشركة:* ${payload.company || "-"}\n` +
        `• *الهاتف:* ${payload.phone}\n` +
        `• *الإيميل:* ${payload.email}\n` +
        `• *المنتج/الآلة:* ${payload.product || "-"}\n` +
        `• *التفاصيل:* ${payload.message}`
      );
      const waUrl = `https://wa.me/201001339300?text=${waText}`;

      const waBtnText = this.currentLang === "ar"
        ? "📱 إرسال التفاصيل فوراً عبر واتساب المبيعات"
        : this.currentLang === "zh"
        ? "📱 通过 WhatsApp 发送"
        : "📱 Send Details Directly via WhatsApp";

      statusEl.innerHTML = `
        <div style="margin-bottom: 10px;">${this.getText("contact.success_msg")}</div>
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-gold" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.85rem; padding: 8px 16px; margin-top: 4px; text-decoration: none; border-radius: 8px;">
          ${waBtnText}
        </a>
      `;
      formEl.reset();
    }

    if (onSuccess) onSuccess();
  }

  downloadCatalog(filename) {
    const toast = document.createElement("div");
    toast.className = "apextex-toast";
    toast.innerHTML = `<span>Downloading <strong>${filename}</strong>...</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("toast-show"), 50);
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  /* -------------------------------------------------------------------------
   * 6. FLOATING OPENROUTER AI ASSISTANT
   * ------------------------------------------------------------------------- */
  initAIChat() {
    this.resetAIChat();
    const trigger = document.getElementById("ai-chat-trigger");
    const windowEl = document.getElementById("ai-chat-window");
    const closeBtn = document.getElementById("ai-close-btn");
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");

    if (!trigger || !windowEl) return;

    trigger.addEventListener("click", () => {
      this.aiOpen = !this.aiOpen;
      windowEl.style.display = this.aiOpen ? "flex" : "none";
      if (this.aiOpen) input.focus();
    });

    closeBtn.addEventListener("click", () => {
      this.aiOpen = false;
      windowEl.style.display = "none";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = input.value.trim();
      if (!txt) return;
      input.value = "";
      this.sendAIMessage(txt);
    });

    document.querySelectorAll(".chip-btn").forEach(chip => {
      chip.addEventListener("click", () => {
        const query = (chip.innerText || chip.textContent).replace(/[^\w\s\u0600-\u06FF\u4E00-\u9FFF]/g, '').trim(); // Remove emojis for the query
        if (query) this.sendAIMessage(query);
      });
    });
  }

  resetAIChat() {
    const contextStr = JSON.stringify({
      company: EGYPT_AMERICAN_DATA.company,
      brands: EGYPT_AMERICAN_DATA.brands.map(b => b.name),
      products: EGYPT_AMERICAN_DATA.products.map(p => ({
        name: p.name,
        desc: p.desc,
        specs: p.specs
      }))
    });

    this.aiMessages = [
      {
        role: "system",
        content: `You are the Official AI Industrial Specialist for "Egypt America Center - Mohammed Hammouda" (مركز مصر أمريكا - محمد حمودة للاستيراد والتصدير والوكالات التجارية).

COMPANY & LEADERSHIP PROFILE:
- Founder & Managing Director: Mohammed Hammouda (محمد حمودة) - Prominent industrial pioneer, founder, and managing director of Egypt America Center.
- Established: 1990 (Over 35+ years of leadership in industrial textile machinery, commercial agencies, and global spare parts import/export).
- Core Business: Official global commercial agencies, authorized industrial machinery distribution, textile factory supplies, and express global logistics.
- Authorized Brands & Agencies:
  1. Center Circle (Taiwan) - High-Speed Circular Knitting Machinery & Precision Alloy Cylinders.
  2. REL-TEX (Taiwan) - Premium Circular Knitting Machines.
  3. Megadyne (Italy) - High-Precision Polyurethane & Rubber Timing Belts (AT10, T10, RPP8, Megapower).
  4. Kauo Heng (Taiwan) - Computerized Flat Knitting Machinery Systems (3D Shoe uppers, collars, sweaters).
  5. NBSMG (China) - Precision Industrial Bearings (ABEC-5, Needle bearings, Cam followers).
- Contact & Support Details:
  - Phone / WhatsApp: +20 10 01339300
  - Email: info@egypt-american.com
  - HQ Location: Mansoura / Egypt
  - Product Catalog & Specs Context: ${contextStr}

INSTRUCTIONS FOR ALL RESPONSES:
1. ALWAYS respond fluently in the EXACT SAME LANGUAGE the user speaks (Arabic, English, French, Chinese, German, Turkish, Spanish, Italian, etc.).
2. Be extremely polite, professional, warm, engaging, and knowledgeable about Mohammed Hammouda, the company history since 1990, industrial machinery specs, spare parts, agencies, custom quote requests, and contact options.
3. If asked about Mohamed Hammouda (or variations like Mohamed Hamouda / Mohamed Hammoud / محمد حمودة), proudly introduce him as the esteemed founder and leader of Egypt America Center, established in 1990.
4. Answer all technical and general questions accurately and warmly without rigid refusals.`
      },
      {
        role: "welcome",
        content: this.getText("ai.welcome")
      }
    ];
    this.renderAIMessages();
  }

  renderAIMessages(isTyping = false) {
    const box = document.getElementById("ai-chat-messages");
    if (!box) return;
    box.innerHTML = "";
    this.aiMessages.filter(m => m.role !== "system").forEach(m => {
      const msgDiv = document.createElement("div");
      msgDiv.className = `ai-message ${m.role === "user" ? "user-msg" : "bot-msg"}`;
      msgDiv.innerHTML = `<div class="msg-bubble">${m.content}</div>`;
      box.appendChild(msgDiv);
    });

    if (isTyping) {
      const typingDiv = document.createElement("div");
      typingDiv.className = "ai-message bot-msg typing";
      const typingText = this.currentLang === "ar" ? "جاري التفكير..." : this.currentLang === "zh" ? "思考中..." : "Thinking...";
      typingDiv.innerHTML = `<div class="msg-bubble" style="opacity: 0.7; font-style: italic;">${typingText}</div>`;
      box.appendChild(typingDiv);
    }

    box.scrollTop = box.scrollHeight;
  }

  async sendAIMessage(userText) {
    this.aiMessages.push({ role: "user", content: userText });
    this.renderAIMessages(true);

    const config = window.EGYPT_AMERICAN_CONFIG || this.config || {};
    const apiKey = config.OPENROUTER_API_KEY;

    if (apiKey) {
      try {
        const apiPayloadMessages = this.aiMessages
          .filter(m => m.role === "system" || m.role === "user" || m.role === "assistant")
          .map(m => ({ role: m.role, content: m.content }));

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: config.OPENROUTER_MODEL || "openai/gpt-oss-20b:free",
            messages: apiPayloadMessages
          })
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : null;
          if (reply) {
            this.aiMessages.push({ role: "assistant", content: reply });
            this.renderAIMessages(false);
            return;
          }
        } else {
          const errText = await res.text();
          console.warn("OpenRouter API returned non-200 status:", res.status, errText);
        }
      } catch (err) {
        console.warn("OpenRouter API connection note:", err);
      }
    }

    // Local Smart Industrial AI Match (Fallback if OpenRouter is unreachable)
    setTimeout(() => {
      const q = userText.toLowerCase();
      const isArabic = this.currentLang === "ar";
      const isChinese = this.currentLang === "zh";

      let reply = "";

      for (const item of EGYPT_AMERICAN_DATA.aiKnowledgeBase) {
        if (item.keywords.some(k => q.includes(k))) {
          reply = item.response;
          break;
        }
      }

      if (!reply) {
        reply = isArabic 
          ? "أهلاً بك! بصفتي المساعد الذكي لمركز مصر أمريكا - محمد حمودة، يمكنني مساعدتك في كافة ما يتعلق بآلات النسيج، قطع الغيار (سيور Megadyne، محامل NBSMG، أسطوانات Center Circle)، والوكالات التجارية. لأي استفسار آخر يرجى التواصل معنا عبر البريد info@egypt-american.com أو واتساب 01001339300."
          : isChinese
          ? "您好！我是 Egypt America Center 智能 AI 助手。我可以解答有关纺织机械、Megadyne 备件及代理的信息。"
          : "Hello! I am the Egypt America Center Specialist AI. I can assist you with details regarding our textile machinery, spare parts (Megadyne belts, NBSMG bearings), and authorized commercial agencies.";
      }

      this.aiMessages.push({ role: "assistant", content: reply });
      this.renderAIMessages(false);
    }, 400);
  }

  async sha256(str) {
    const salt = "ea_sec_2026_salt";
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  /* -------------------------------------------------------------------------
   * 6. SECRET CLIENT ADMIN PORTAL (#admin)
   * ------------------------------------------------------------------------- */
  initAdminPortal() {
    const loginCard = document.getElementById("admin-login-card");
    const dashboardPanel = document.getElementById("admin-dashboard-panel");
    const loginForm = document.getElementById("admin-login-form");
    const loginError = document.getElementById("admin-login-error");
    const form2FA = document.getElementById("admin-2fa-form");
    const error2FA = document.getElementById("admin-2fa-error");
    const logoutBtn = document.getElementById("admin-logout-btn");
    const addForm = document.getElementById("admin-add-product-form");
    const addStatus = document.getElementById("admin-add-status");

    const checkAuth = () => {
      const isLogged = sessionStorage.getItem("ea_admin_logged") === "true";
      if (isLogged) {
        if (loginCard) loginCard.style.display = "none";
        if (dashboardPanel) dashboardPanel.style.display = "block";
        this.renderAdminProductList();
        this.renderAdminInquiries();
      } else {
        if (loginCard) loginCard.style.display = "block";
        if (dashboardPanel) dashboardPanel.style.display = "none";
      }
    };

    checkAuth();

    if (this.adminBound) return;
    this.adminBound = true;

    const clearInqBtn = document.getElementById("admin-clear-inquiries-btn");
    if (clearInqBtn) {
      clearInqBtn.addEventListener("click", () => {
        if (confirm("هل أنت تأكد من رغبتك في مسح جميع الرسائل المسجلة؟")) {
          localStorage.removeItem("ea_inquiries");
          this.renderAdminInquiries();
        }
      });
    }

    const exportCatalogBtn = document.getElementById("admin-export-catalog-btn");
    if (exportCatalogBtn) {
      exportCatalogBtn.addEventListener("click", () => {
        this.exportDataJsFile();
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputPass = document.getElementById("admin-passcode-input").value;
        const passHash = await this.sha256(inputPass);
        const validHash = this.config.ADMIN_PASS_HASH || "e9aa5a0818a22aaa53095e60150c6518fd735137826fe009cee32b6ee10a4e2d";

        if (passHash === validHash) {
          if (loginError) loginError.style.display = "none";
          loginForm.style.display = "none";
          if (form2FA) form2FA.style.display = "block";
        } else {
          if (loginError) loginError.style.display = "block";
        }
      });
    }

    if (form2FA) {
      form2FA.addEventListener("submit", async (e) => {
        e.preventDefault();
        const rawPhone = document.getElementById("admin-2fa-phone-input").value.trim();
        const cleanPhone = rawPhone.replace(/\D/g, "");
        const phoneHash = await this.sha256(cleanPhone);
        const validPhoneHash = this.config.ADMIN_PHONE_HASH || "8726ab7e2a44594ad132a98ab44606773cdf80d2744d7c76b996fef46c50f394";

        if (phoneHash === validPhoneHash) {
          sessionStorage.setItem("ea_admin_logged", "true");
          if (error2FA) error2FA.style.display = "none";
          checkAuth();
        } else {
          if (error2FA) error2FA.style.display = "block";
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("ea_admin_logged");
        if (loginForm) loginForm.style.display = "block";
        if (form2FA) form2FA.style.display = "none";
        checkAuth();
      });
    }

    if (addForm) {
      addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nameAr = document.getElementById("admin-prod-name-ar").value.trim();
        const nameEn = (document.getElementById("admin-prod-name-en") ? document.getElementById("admin-prod-name-en").value.trim() : "") || nameAr;
        const nameZh = (document.getElementById("admin-prod-name-zh") ? document.getElementById("admin-prod-name-zh").value.trim() : "") || nameEn || nameAr;

        const category = document.getElementById("admin-prod-category").value;
        const brand = document.getElementById("admin-prod-brand").value;
        const code = document.getElementById("admin-prod-code").value.trim();
        
        const fileInput = document.getElementById("admin-prod-file");
        const urlInput = document.getElementById("admin-prod-image");
        let image = urlInput ? urlInput.value.trim() : "";

        if (fileInput && fileInput.files && fileInput.files[0]) {
          image = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(fileInput.files[0]);
          });
        }

        if (!image) {
          image = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80";
        }

        const descAr = document.getElementById("admin-prod-desc-ar").value.trim();
        const descEn = (document.getElementById("admin-prod-desc-en") ? document.getElementById("admin-prod-desc-en").value.trim() : "") || descAr;

        const brandMap = {
          "REL-TEX": { id: "rel-tex", name: "REL-TEX", country: "Taiwan", flag: "🇹🇼" },
          "GOLDEN ROC": { id: "golden-roc", name: "GOLDEN ROC", country: "China", flag: "🇨🇳" },
          "SMG / NBSMG": { id: "nbsmg", name: "SMG / NBSMG", country: "China", flag: "🇨🇳" },
          "Kauo Heng": { id: "kauo-heng", name: "Kauo Heng", country: "Taiwan", flag: "🇹🇼" },
          "DAHU": { id: "dahu", name: "DAHU", country: "China", flag: "🇨🇳" },
          "V-STAR": { id: "v-star", name: "V-STAR", country: "China", flag: "🇨🇳" },
          "BAIYANG": { id: "baiyang", name: "BAIYANG", country: "China", flag: "🇨🇳" },
          "KING ULTRASONIC": { id: "king-ultrasonic", name: "KING ULTRASONIC", country: "China", flag: "🇨🇳" },
          "Center Circle": { id: "center-circle", name: "Center Circle", country: "Taiwan", flag: "🇹🇼" },
          "Megadyne": { id: "megadyne", name: "Megadyne", country: "Italy", flag: "🇮🇹" }
        };
        const bInfo = brandMap[brand] || { id: "general", name: brand, country: "Global", flag: "🌐" };

        const finalNameAr = nameAr || nameEn;
        const finalNameEn = nameEn || nameAr;
        const finalNameZh = nameZh || nameEn || nameAr;

        const finalDescAr = descAr || descEn;
        const finalDescEn = descEn || descAr;

        const newProd = {
          id: "prod-" + Date.now(),
          name: finalNameEn,
          category: category === "machinery" ? "Machinery" : "Spare Parts",
          brandId: bInfo.id,
          brandName: bInfo.name,
          country: bInfo.country,
          flag: bInfo.flag,
          image: image,
          code: code,
          shortDesc: finalDescEn,
          fullDesc: finalDescEn,
          specs: { "OEM Code": code, "Brand": bInfo.name },
          translations: {
            ar: { country: bInfo.country === "Taiwan" ? "تايوان" : bInfo.country === "China" ? "الصين" : bInfo.country === "Italy" ? "إيطاليا" : "عالمي", name: finalNameAr, shortDesc: finalDescAr, fullDesc: finalDescAr },
            zh: { country: bInfo.country === "Taiwan" ? "台湾" : bInfo.country === "China" ? "中国" : bInfo.country === "Italy" ? "意大利" : "全球", name: finalNameZh, shortDesc: finalDescEn, fullDesc: finalDescEn }
          }
        };

        EGYPT_AMERICAN_DATA.products.unshift(newProd);
        this.saveFullCatalog();
        this.exportDataJsFile();

        addForm.reset();
        this.renderProducts();
        this.renderAdminProductList();

        if (addStatus) {
          addStatus.className = "form-status success";
          addStatus.innerHTML = "✅ تم إضافة المنتج وتحديث الكتالوج بنجاح!";
          setTimeout(() => addStatus.innerHTML = "", 3500);
        }
      });
    }
  }

  escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  renderAdminInquiries() {
    const container = document.getElementById("admin-inquiries-list");
    const countEl = document.getElementById("admin-stat-inquiries");
    if (!container) return;

    const inquiries = JSON.parse(localStorage.getItem("ea_inquiries") || "[]");
    if (countEl) countEl.textContent = inquiries.length;

    if (inquiries.length === 0) {
      container.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-dark-secondary); background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--border-glass-dark);">
          📩 لا توجد رسائل أو طلبات جديدة حالياً. أحدث الاستفسارات ستظهر هنا تلقائياً.
        </div>
      `;
      return;
    }

    container.innerHTML = inquiries.map((inq, idx) => {
      const name = this.escapeHTML(inq.name || "زائر بدون اسم");
      const company = this.escapeHTML(inq.company || "-");
      const phone = this.escapeHTML(inq.phone || "-");
      const email = this.escapeHTML(inq.email || "-");
      const product = this.escapeHTML(inq.product || "استفسار عام");
      const message = this.escapeHTML(inq.message || "لا توجد تفاصيل إضافية");
      const formType = this.escapeHTML(inq.form_type || "طلب رسمي");
      const dateStr = inq.created_at ? new Date(inq.created_at).toLocaleString("ar-EG") : "الآن";
      const cleanPhone = (inq.phone || "").replace(/\D/g, "");

      return `
        <div class="glass-card" style="padding: 20px; border-radius: 16px; border: 1px solid var(--accent-gold); margin-bottom: 12px; background: rgba(255,255,255,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="gold-text" style="font-weight: 800; font-size: 1.05rem;">#${idx + 1} ${name}</span>
              <span style="font-size: 0.8rem; padding: 3px 10px; border-radius: 20px; background: rgba(234, 179, 8, 0.15); color: var(--accent-gold); font-weight: 700;">${formType}</span>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-dark-secondary);">${dateStr}</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 12px; font-size: 0.9rem;">
            <div><strong>🏢 الشركة:</strong> ${company}</div>
            <div><strong>📞 الهاتف:</strong> <a href="tel:${cleanPhone}" style="color: var(--accent-gold); text-decoration: underline;">${phone}</a></div>
            <div><strong>✉️ البريد:</strong> <a href="mailto:${email}" style="color: var(--accent-gold); text-decoration: underline;">${email}</a></div>
            <div><strong>⚙️ المنتج/الطلب:</strong> <span style="color: var(--accent-gold); font-weight: 700;">${product}</span></div>
          </div>

          <div style="background: rgba(0,0,0,0.2); padding: 12px 16px; border-radius: 10px; font-size: 0.9rem; margin-bottom: 12px; border-left: 3px solid var(--accent-gold);">
            <strong>📝 تفاصيل الرسالة:</strong>
            <p style="margin: 4px 0 0 0; color: var(--text-dark-primary);">${message}</p>
          </div>

          <div style="display: flex; gap: 10px; align-items: center; justify-content: flex-end;">
            ${cleanPhone ? `<a href="https://wa.me/${cleanPhone}" target="_blank" class="btn btn-outline" style="padding: 5px 12px; font-size: 0.8rem; border-color: #25D366; color: #25D366;">💬 تواصل واتساب</a>` : ""}
            <button class="btn btn-outline admin-del-inq-btn" data-idx="${idx}" style="padding: 5px 12px; font-size: 0.8rem; border-color: #ff4d4d; color: #ff4d4d;">مسح الرسالة 🗑️</button>
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".admin-del-inq-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        let saved = JSON.parse(localStorage.getItem("ea_inquiries") || "[]");
        saved.splice(idx, 1);
        localStorage.setItem("ea_inquiries", JSON.stringify(saved));
        this.renderAdminInquiries();
      });
    });
  }

  renderAdminProductList() {
    const container = document.getElementById("admin-products-list");
    const countEl = document.getElementById("admin-prod-count");
    if (!container) return;

    const list = EGYPT_AMERICAN_DATA.products;
    if (countEl) countEl.textContent = list.length;

    const totalEl = document.getElementById("admin-stat-total");
    const machEl = document.getElementById("admin-stat-machinery");
    const partsEl = document.getElementById("admin-stat-parts");

    if (totalEl) totalEl.textContent = list.length;
    if (machEl) machEl.textContent = list.filter(p => (p.category || "").toLowerCase().includes("machin")).length;
    if (partsEl) partsEl.textContent = list.filter(p => !(p.category || "").toLowerCase().includes("machin")).length;

    container.innerHTML = list.map(p => {
      let rawTitle = "";
      if (typeof p.title === "string") {
        rawTitle = p.title;
      } else if (p.title && typeof p.title === "object") {
        rawTitle = p.title[this.currentLang] || p.title.ar || p.title.en || p.title.zh || "";
      }

      const safeTitle = this.escapeHTML(rawTitle || "منتج بدون عنوان");
      const safeCode = this.escapeHTML(p.code || "OEM-000");
      const safeBrand = this.escapeHTML(p.brand || "General OEM");
      const safeImg = this.escapeHTML(p.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80");

      return `
        <div class="glass-card" style="padding: 16px; display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap; border: 1px solid var(--border-glass-dark); margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="${safeImg}" alt="${safeTitle}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 10px; border: 1px solid var(--accent-gold);" />
            <div>
              <h4 style="font-size: 1rem; margin-bottom: 4px;">${safeTitle}</h4>
              <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 700;">${p.category === "Machinery" ? "آلات ومعدات" : "قطع غيار"}</span>
              <span style="font-size: 0.8rem; color: var(--text-dark-secondary); margin-left: 10px;">كود: ${safeCode} • ${safeBrand}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-outline admin-edit-btn" data-id="${p.id}" style="padding: 6px 14px; font-size: 0.85rem;">تعديل ✏️</button>
            <button class="btn btn-outline admin-del-btn" data-id="${p.id}" style="border-color: #ff4d4d; color: #ff4d4d; padding: 6px 14px; font-size: 0.85rem;">حذف 🗑️</button>
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".admin-edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.openAdminEditModal(id);
      });
    });

    container.querySelectorAll(".admin-del-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("هل أنت تأكد من رغبتك في حذف هذا المنتج من الكتالوج؟")) {
          EGYPT_AMERICAN_DATA.products = EGYPT_AMERICAN_DATA.products.filter(p => p.id !== id);
          this.saveFullCatalog();
          this.exportDataJsFile();
          this.renderProducts();
          this.renderAdminProductList();
        }
      });
    });
  }

  openAdminEditModal(prodId) {
    const prod = EGYPT_AMERICAN_DATA.products.find(p => p.id === prodId);
    if (!prod) return;

    const modal = document.getElementById("admin-edit-modal");
    if (!modal) return;

    let titleAr = prod.translations?.ar?.name || (typeof prod.title === "object" ? prod.title.ar : "") || prod.name || "";
    let titleEn = prod.name || (typeof prod.title === "object" ? prod.title.en : "") || titleAr;
    let titleZh = prod.translations?.zh?.name || (typeof prod.title === "object" ? prod.title.zh : "") || titleEn;

    let descAr = prod.translations?.ar?.shortDesc || prod.translations?.ar?.fullDesc || (typeof prod.desc === "object" ? prod.desc.ar : "") || prod.shortDesc || prod.fullDesc || "";
    let descEn = prod.shortDesc || prod.fullDesc || (typeof prod.desc === "object" ? prod.desc.en : "") || descAr;

    document.getElementById("admin-edit-prod-id").value = prod.id;
    document.getElementById("admin-edit-prod-name-ar").value = titleAr;
    if (document.getElementById("admin-edit-prod-name-en")) document.getElementById("admin-edit-prod-name-en").value = titleEn;
    if (document.getElementById("admin-edit-prod-name-zh")) document.getElementById("admin-edit-prod-name-zh").value = titleZh;
    
    const catSelect = document.getElementById("admin-edit-prod-category");
    if (catSelect) {
      const isMach = (prod.category || "").toLowerCase().includes("machin");
      catSelect.value = isMach ? "Machinery" : "Spare Parts";
    }

    const brandSelect = document.getElementById("admin-edit-prod-brand");
    if (brandSelect) {
      const targetBrand = (prod.brandName || prod.brand || "").toLowerCase();
      const targetId = (prod.brandId || "").toLowerCase();
      const matchOpt = Array.from(brandSelect.options).find(opt => {
        const val = opt.value.toLowerCase();
        return val === targetBrand || val.includes(targetBrand) || targetId.includes(val);
      });
      if (matchOpt) brandSelect.value = matchOpt.value;
      else brandSelect.value = "General OEM";
    }

    document.getElementById("admin-edit-prod-code").value = prod.code || "OEM-000";
    if (document.getElementById("admin-edit-prod-image")) document.getElementById("admin-edit-prod-image").value = prod.image || "";
    
    document.getElementById("admin-edit-prod-desc-ar").value = descAr;
    if (document.getElementById("admin-edit-prod-desc-en")) document.getElementById("admin-edit-prod-desc-en").value = descEn;

    modal.classList.add("active");

    const closeBtn = document.getElementById("admin-edit-close");
    if (closeBtn) closeBtn.onclick = () => modal.classList.remove("active");

    const form = document.getElementById("admin-edit-product-form");
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const updatedNameAr = document.getElementById("admin-edit-prod-name-ar").value.trim();
        const updatedNameEn = (document.getElementById("admin-edit-prod-name-en") ? document.getElementById("admin-edit-prod-name-en").value.trim() : "") || updatedNameAr;
        const updatedNameZh = (document.getElementById("admin-edit-prod-name-zh") ? document.getElementById("admin-edit-prod-name-zh").value.trim() : "") || updatedNameEn;

        const updatedCategory = document.getElementById("admin-edit-prod-category").value;
        const updatedBrand = document.getElementById("admin-edit-prod-brand").value;
        const updatedCode = document.getElementById("admin-edit-prod-code").value.trim();
        
        const fileInput = document.getElementById("admin-edit-prod-file");
        const urlInput = document.getElementById("admin-edit-prod-image");
        let updatedImage = urlInput ? urlInput.value.trim() : "";

        if (fileInput && fileInput.files && fileInput.files[0]) {
          updatedImage = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(fileInput.files[0]);
          });
        }

        if (!updatedImage) {
          updatedImage = prod.image;
        }

        const updatedDescAr = document.getElementById("admin-edit-prod-desc-ar").value.trim();
        const updatedDescEn = (document.getElementById("admin-edit-prod-desc-en") ? document.getElementById("admin-edit-prod-desc-en").value.trim() : "") || updatedDescAr;

        const brandMap = {
          "REL-TEX": { id: "rel-tex", name: "REL-TEX", country: "Taiwan", flag: "🇹🇼" },
          "GOLDEN ROC": { id: "golden-roc", name: "GOLDEN ROC", country: "China", flag: "🇨🇳" },
          "SMG / NBSMG": { id: "nbsmg", name: "SMG / NBSMG", country: "China", flag: "🇨🇳" },
          "Kauo Heng": { id: "kauo-heng", name: "Kauo Heng", country: "Taiwan", flag: "🇹🇼" },
          "DAHU": { id: "dahu", name: "DAHU", country: "China", flag: "🇨🇳" },
          "V-STAR": { id: "v-star", name: "V-STAR", country: "China", flag: "🇨🇳" },
          "BAIYANG": { id: "baiyang", name: "BAIYANG", country: "China", flag: "🇨🇳" },
          "KING ULTRASONIC": { id: "king-ultrasonic", name: "KING ULTRASONIC", country: "China", flag: "🇨🇳" },
          "Center Circle": { id: "center-circle", name: "Center Circle", country: "Taiwan", flag: "🇹🇼" },
          "Megadyne": { id: "megadyne", name: "Megadyne", country: "Italy", flag: "🇮🇹" }
        };
        const bInfo = brandMap[updatedBrand] || { id: "general", name: updatedBrand, country: "Global", flag: "🌐" };

        prod.name = updatedNameEn;
        prod.title = { en: updatedNameEn, ar: updatedNameAr, zh: updatedNameZh };
        prod.category = updatedCategory;
        prod.brand = updatedBrand;
        prod.brandName = bInfo.name;
        prod.brandId = bInfo.id;
        prod.country = bInfo.country;
        prod.flag = bInfo.flag;
        prod.code = updatedCode;
        prod.image = updatedImage;
        prod.shortDesc = updatedDescEn;
        prod.fullDesc = updatedDescEn;
        prod.desc = { en: updatedDescEn, ar: updatedDescAr, zh: updatedDescEn };
        prod.specs = prod.specs || {};
        prod.specs["OEM Code"] = updatedCode;
        prod.specs["Brand"] = bInfo.name;
        prod.translations = {
          ar: { country: bInfo.country === "Taiwan" ? "تايوان" : bInfo.country === "China" ? "الصين" : bInfo.country === "Italy" ? "إيطاليا" : "عالمي", name: updatedNameAr, shortDesc: updatedDescAr, fullDesc: updatedDescAr },
          zh: { country: bInfo.country === "Taiwan" ? "台湾" : bInfo.country === "China" ? "中国" : bInfo.country === "Italy" ? "意大利" : "全球", name: updatedNameZh, shortDesc: updatedDescEn, fullDesc: updatedDescEn }
        };

        this.saveFullCatalog();

        modal.classList.remove("active");
        this.renderProducts();
        this.renderAdminProductList();
      };
    }
  }

  /* -------------------------------------------------------------------------
   * 7. GENERAL EVENT BINDINGS
   * ------------------------------------------------------------------------- */
  bindEvents() {
    document.querySelectorAll(".cat-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cat-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentCategoryFilter = btn.getAttribute("data-category") || "all";
        this.renderProducts();
      });
    });

    ["product-search-input", "product-search-input-page"].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener("input", (e) => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          this.renderProducts();
        });
      }
    });

    ["product-brand-filter", "product-brand-filter-page"].forEach(id => {
      const select = document.getElementById(id);
      if (select) {
        select.addEventListener("change", (e) => {
          this.currentBrandFilter = e.target.value;
          this.renderProducts();
        });
      }
    });

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit(contactForm, "contact-form-status");
      });
    }

    const quoteForm = document.getElementById("quote-modal-form");
    if (quoteForm) {
      quoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit(quoteForm, "quote-form-status", () => {
          setTimeout(() => this.closeModal("quote-modal"), 1500);
        });
      });
    }

    document.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-backdrop") || e.target.classList.contains("modal-close-btn")) {
          document.querySelectorAll(".modal-container").forEach(m => m.classList.remove("active"));
        }
      });
    });

    document.querySelectorAll(".trigger-quote-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        const modal = document.getElementById("quote-modal");
        if (modal) modal.classList.add("active");
      });
    });

    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }

  initScrollEffects() {
    const navbar = document.getElementById("main-navbar");
    const backToTopBtn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");

      if (backToTopBtn) {
        if (window.scrollY > 400) backToTopBtn.classList.add("visible");
        else backToTopBtn.classList.remove("visible");
      }
    });
  }

  initObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          if (entry.target.classList.contains("stat-number")) {
            const targetVal = parseInt(entry.target.getAttribute("data-target") || "0");
            let curr = 0;
            const step = Math.ceil(targetVal / 30);
            const t = setInterval(() => {
              curr += step;
              if (curr >= targetVal) { entry.target.innerText = targetVal.toLocaleString() + "+"; clearInterval(t); }
              else entry.target.innerText = curr.toLocaleString() + "+";
            }, 40);
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal-on-scroll, .stat-number").forEach(el => observer.observe(el));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new EgyptAmericanApp();
  window.app.init();
});
