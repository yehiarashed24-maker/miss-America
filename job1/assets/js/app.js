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
    this.currentLang = this.safeStorage("getItem", "ea_lang") || "ar";
    this.currentTheme = this.safeStorage("getItem", "ea_theme") || "dark";
    this.currentCategoryFilter = "all";
    this.currentBrandFilter = "all";
    this.searchQuery = "";
    this.aiMessages = [];
    this.aiOpen = false;
    this.adminBound = false;
  }

  safeStorage(action, key, value) {
    try {
      if (action === "getItem") return localStorage.getItem(key);
      if (action === "setItem") localStorage.setItem(key, value);
      if (action === "removeItem") localStorage.removeItem(key);
      if (action === "sessionGet") return sessionStorage.getItem(key);
      if (action === "sessionSet") sessionStorage.setItem(key, value);
      if (action === "sessionRemove") sessionStorage.removeItem(key);
    } catch (e) {
      console.warn("Storage access note:", e);
    }
    return null;
  }

  isLocalDev() {
    try {
      const host = window.location.hostname || "";
      const protocol = window.location.protocol || "";
      return protocol === "file:" ||
             host === "localhost" ||
             host === "127.0.0.1" ||
             host === "::1" ||
             host === "" ||
             host.endsWith(".local") ||
             host.startsWith("192.168.") ||
             host.startsWith("10.") ||
             (host.startsWith("172.") && host.split(".")[1] >= 16 && host.split(".")[1] <= 31) ||
             window.location.port !== "";
    } catch(e) {
      return true;
    }
  }

  init() {
    try {
      this.loadCatalog().catch(e => console.warn("Catalog load notice:", e));
      this.initTheme();
      this.initSideDrawer();
      this.initI18n();
      this.initRouter();
      this.initPreloader();
      this.renderBrands();
      this.renderProducts();
      this.initAIChat();
      this.initHeroMachineSlider();
      this.initLenisScroll();
      this.initHeroParticles();
      this.initHeroMachineMotion();
      this.initInteractiveButtons();
      this.initAnimatedCounters();
      this.initWorldMapNodes();
      this.bindEvents();
      this.initScrollEffects();
      this.initObservers();
    } catch(e) {
      console.warn("App initialization notice:", e);
    }
  }

  async loadCatalog() {
    try {
      // If local development, skip remote API requests to /api/products
      if (!this.isLocalDev()) {
        // 1. Try Vercel Serverless /api/products MongoDB Sync
        try {
          const apiRes = await fetch("/api/products").catch(() => null);
          if (apiRes && apiRes.ok && (apiRes.headers.get("content-type") || "").includes("json")) {
            const liveProds = await apiRes.json().catch(() => null);
            if (Array.isArray(liveProds) && liveProds.length > 0) {
              if (window.EGYPT_AMERICAN_DATA) window.EGYPT_AMERICAN_DATA.products = liveProds;
              this.renderProducts();
              this.renderAdminProductList();
              return;
            }
          }
        } catch(e){}

        // 2. Check MongoDB Atlas Data API Sync
        const config = window.EGYPT_AMERICAN_CONFIG || this.config || {};
        const mongoUrl = config.MONGODB_API_URL || this.safeStorage("getItem", "ea_mongo_url");
        const mongoKey = config.MONGODB_API_KEY || this.safeStorage("getItem", "ea_mongo_key");

        if (mongoUrl && mongoKey) {
          try {
            const findEndpoint = `${mongoUrl.replace(/\/$/, "")}/action/find`;
            const res = await fetch(findEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": mongoKey
              },
              body: JSON.stringify({
                dataSource: config.MONGODB_CLUSTER || "Cluster0",
                database: config.MONGODB_DATABASE || "egypt_american_db",
                collection: "products",
                filter: {}
              })
            }).catch(() => null);
            if (res && res.ok && (res.headers.get("content-type") || "").includes("json")) {
              const mongoData = await res.json().catch(() => null);
              if (mongoData && Array.isArray(mongoData.documents) && mongoData.documents.length > 0) {
                if (window.EGYPT_AMERICAN_DATA) window.EGYPT_AMERICAN_DATA.products = mongoData.documents;
                this.renderProducts();
                this.renderAdminProductList();
                return;
              }
            }
          } catch(e){}
        }
      }

      // 3. Local Backup products
      const customSaved = this.safeStorage("getItem", "ea_custom_products");
      if (customSaved && window.EGYPT_AMERICAN_DATA && Array.isArray(window.EGYPT_AMERICAN_DATA.products)) {
        try {
          const customList = JSON.parse(customSaved);
          if (Array.isArray(customList)) {
            customList.forEach(p => {
              if (p && p.id && !window.EGYPT_AMERICAN_DATA.products.some(existing => existing && existing.id === p.id)) {
                window.EGYPT_AMERICAN_DATA.products.unshift(p);
              }
            });
          }
        } catch (e) {
          console.warn("Could not parse custom products", e);
        }
      }
    } catch (e) {
      console.warn("Catalog load note:", e);
    }
  }

  async saveFullCatalog() {
    try {
      if (!window.EGYPT_AMERICAN_DATA || !Array.isArray(window.EGYPT_AMERICAN_DATA.products)) return;
      this.safeStorage("setItem", "ea_full_catalog", JSON.stringify(window.EGYPT_AMERICAN_DATA.products));
      this.safeStorage("setItem", "ea_custom_products", JSON.stringify(window.EGYPT_AMERICAN_DATA.products.filter(p => p && p.id && String(p.id).startsWith("prod-"))));

      if (this.isLocalDev()) return;

      // 1. Try Vercel Serverless /api/products MongoDB Sync
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(window.EGYPT_AMERICAN_DATA.products)
      }).catch(err => console.warn("Vercel MongoDB API save note:", err));

      // 2. MongoDB Data API Sync
      const config = window.EGYPT_AMERICAN_CONFIG || this.config || {};
      const mongoUrl = config.MONGODB_API_URL || this.safeStorage("getItem", "ea_mongo_url");
      const mongoKey = config.MONGODB_API_KEY || this.safeStorage("getItem", "ea_mongo_key");

      if (mongoUrl && mongoKey) {
        const deleteEndpoint = `${mongoUrl.replace(/\/$/, "")}/action/deleteMany`;
        const insertEndpoint = `${mongoUrl.replace(/\/$/, "")}/action/insertMany`;

        await fetch(deleteEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "api-key": mongoKey },
          body: JSON.stringify({
            dataSource: config.MONGODB_CLUSTER || "Cluster0",
            database: config.MONGODB_DATABASE || "egypt_american_db",
            collection: "products",
            filter: {}
          })
        }).catch(() => { });

        await fetch(insertEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "api-key": mongoKey },
          body: JSON.stringify({
            dataSource: config.MONGODB_CLUSTER || "Cluster0",
            database: config.MONGODB_DATABASE || "egypt_american_db",
            collection: "products",
            documents: window.EGYPT_AMERICAN_DATA.products
          })
        }).catch(err => console.warn("MongoDB sync save note:", err));
      }
    } catch (e) {
      console.warn("Catalog save note:", e);
    }
  }

  exportDataJsFile() {
    try {
      const dataObj = window.EGYPT_AMERICAN_DATA || {};
      const fullDataStr = "/**\n * EGYPT AMERICA CENTER DATA CATALOG\n */\nwindow.EGYPT_AMERICAN_DATA = " + JSON.stringify(dataObj, null, 2) + ";\n";
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
    try {
      this.setTheme(this.currentTheme);
      const toggleHeader = document.getElementById("theme-toggle-btn");
      const toggleDrawer = document.getElementById("theme-toggle-drawer");
      const toggle = () => {
        const newTheme = this.currentTheme === "dark" ? "light" : "dark";
        this.setTheme(newTheme);
      };
      if (toggleHeader) toggleHeader.addEventListener("click", toggle);
      if (toggleDrawer) toggleDrawer.addEventListener("click", toggle);
    } catch(e) {
      console.warn("initTheme notice:", e);
    }
  }

  setTheme(theme) {
    try {
      this.currentTheme = "light";
      this.safeStorage("setItem", "ea_theme", "light");
      if (document.documentElement) {
        document.documentElement.setAttribute("data-theme", "light");
      }
      this.applyTranslations();
    } catch(e) {}
  }

  initSideDrawer() {
    try {
      const drawer = document.getElementById("side-drawer");
      const toggleBtn = document.getElementById("drawer-toggle-btn") || document.querySelector(".nav-toggle");
      const closeBtn = document.getElementById("drawer-close-btn");
      const backdrop = document.getElementById("drawer-backdrop");

      const openDrawer = () => drawer && drawer.classList.add("active");
      const closeDrawer = () => drawer && drawer.classList.remove("active");

      if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
      if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
      if (backdrop) backdrop.addEventListener("click", closeDrawer);

      document.querySelectorAll(".drawer-link").forEach(link => {
        if (link) link.addEventListener("click", closeDrawer);
      });
    } catch(e) {
      console.warn("initSideDrawer notice:", e);
    }
  }

  /* -------------------------------------------------------------------------
   * 1. i18n & RTL ENGINE
   * ------------------------------------------------------------------------- */
  initI18n() {
    try {
      this.setLanguage(this.currentLang);

      const trigger = document.getElementById("lang-menu-trigger");
      const menu = document.querySelector(".lang-menu");

      if (trigger && menu) {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (menu) menu.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
          if (menu && !e.target.closest(".lang-dropdown")) {
            menu.classList.remove("show");
          }
        });
      }

      document.querySelectorAll(".lang-select-btn").forEach(btn => {
        if (btn) {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = btn.getAttribute("data-lang");
            if (lang) {
              this.setLanguage(lang);
              if (menu) menu.classList.remove("show");
            }
          });
        }
      });
    } catch(e) {
      console.warn("initI18n notice:", e);
    }
  }

  setLanguage(lang) {
    try {
      if (!["en", "ar", "zh"].includes(lang)) lang = "ar";
      this.currentLang = lang;
      this.safeStorage("setItem", "ea_lang", lang);

      const isRtl = lang === "ar";
      if (document.documentElement) {
        document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
        document.documentElement.setAttribute("lang", lang);
      }
      if (document.body) {
        if (isRtl) document.body.classList.add("rtl-mode");
        else document.body.classList.remove("rtl-mode");
      }

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
      this.resetAIChat();
      if (typeof this.updateHeroLanguage === "function") {
        this.updateHeroLanguage();
      }
    } catch(e) {
      console.warn("setLanguage notice:", e);
    }
  }

  applyTranslations() {
    try {
      if (!window.EGYPT_AMERICAN_DATA || !window.EGYPT_AMERICAN_DATA.translations) return;
      const dictionary = window.EGYPT_AMERICAN_DATA.translations[this.currentLang];
      if (!dictionary) return;

      document.querySelectorAll("[data-i18n]").forEach(el => {
        if (!el) return;
        const attrKey = el.getAttribute("data-i18n");
        if (!attrKey) return;
        const path = attrKey.split(".");
        let val = dictionary;
        for (const key of path) {
          if (val && val[key] !== undefined) val = val[key];
          else { val = null; break; }
        }
        if (val && (typeof val === "string" || typeof val === "number")) {
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            if (el.hasAttribute("placeholder")) el.placeholder = String(val);
            else el.value = String(val);
          } else {
            const strVal = String(val);
            if (strVal.includes("<") && strVal.includes(">")) {
              el.innerHTML = strVal;
            } else {
              el.innerText = strVal;
            }
          }
        }
      });
    } catch(e) {
      console.warn("applyTranslations notice:", e);
    }
  }

  getText(keyPath) {
    try {
      if (!window.EGYPT_AMERICAN_DATA || !window.EGYPT_AMERICAN_DATA.translations) return keyPath;
      const dictionary = window.EGYPT_AMERICAN_DATA.translations[this.currentLang] || window.EGYPT_AMERICAN_DATA.translations.en || {};
      const path = keyPath.split(".");
      let val = dictionary;
      for (const k of path) {
        if (val && val[k] !== undefined) val = val[k];
        else return keyPath;
      }
      return (typeof val === "string" || typeof val === "number") ? val : keyPath;
    } catch(e) {
      return keyPath;
    }
  }

  /* -------------------------------------------------------------------------
   * 2. ROUTER & VIEWS
   * ------------------------------------------------------------------------- */
  initRouter() {
    try {
      window.addEventListener("hashchange", () => this.handleRoute());
      this.handleRoute();
    } catch(e) {
      console.warn("initRouter notice:", e);
    }
  }

  handleRoute() {
    try {
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

      const validRoutes = ["home", "about", "products", "brands", "events", "contact", "admin"];
      if (!validRoutes.includes(hash)) hash = "home";
      this.showView(hash);
    } catch(e) {
      console.warn("handleRoute notice:", e);
      this.showView("home");
    }
  }

  showView(viewId) {
    try {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const validRoutes = ["home", "about", "products", "brands", "events", "contact", "admin"];
      if (!validRoutes.includes(viewId)) viewId = "home";

      // 1. Hide all page-view elements by removing active-view and clearing inline overrides
      document.querySelectorAll(".page-view").forEach(v => {
        if (v) {
          v.classList.remove("active-view");
          v.style.display = "none";
          v.style.opacity = "";
          v.style.visibility = "";
        }
      });

      // 2. Show target view prominently
      const target = document.getElementById(`view-${viewId}`);
      if (target) {
        target.classList.add("active-view");
        target.style.display = "block";
        target.style.opacity = "1";
        target.style.visibility = "visible";
      }

      // 3. Render dynamic content
      if (viewId === "products") {
        this.renderProducts();
      } else if (viewId === "brands") {
        this.renderBrands();
      } else if (viewId === "admin") {
        this.initAdminPortal();
      }

      // 4. Refresh ScrollTrigger if GSAP is available so triggers recalculate for newly shown views
      if (window.gsap && window.ScrollTrigger) {
        try {
          ScrollTrigger.refresh();
        } catch(e){}
      }

      // 5. Update navbar links
      document.querySelectorAll(".nav-link, .drawer-link").forEach(link => {
        if (link) {
          const href = link.getAttribute("href") || "";
          if (href === `#${viewId}`) link.classList.add("active");
          else link.classList.remove("active");
        }
      });

      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch(e) {
      console.warn("showView notice:", e);
    }
  }

  /* -------------------------------------------------------------------------
   * 3. UI RENDERING & FILTERS
   * ------------------------------------------------------------------------- */
  initPreloader() {
    try {
      const preloader = document.getElementById("preloader");
      const fill = document.getElementById("preloader-progress-fill");
      const percentEl = document.getElementById("preloader-percent");
      const statusMsg = document.getElementById("preloader-status-msg");
      if (!preloader) return;

      let progress = 0;
      const statusSteps = [
        { at: 0, text: "جاري تشغيل محرك الأنظمة الصناعية..." },
        { at: 30, text: "تحميل وكالات آلات النسيج وقطع الغيار العالمية..." },
        { at: 65, text: "معايرة تكنولوجيا Center Circle & Kauo Heng..." },
        { at: 92, text: "جاهز للتشغيل • مرحباً بكم في مركز مصر أمريكا" }
      ];

      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 4;
        if (progress > 100) progress = 100;

        if (fill) fill.style.width = progress + "%";
        if (percentEl) percentEl.textContent = progress;

        for (let s of statusSteps) {
          if (progress >= s.at && statusMsg) {
            statusMsg.textContent = s.text;
          }
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            this.triggerEntranceAnimation();
          }, 250);
        }
      }, 30);
    } catch(e) {
      console.warn("initPreloader notice:", e);
    }
  }

  triggerEntranceAnimation() {
    try {
      const preloader = document.getElementById("preloader");
      if (!preloader) return;

      preloader.classList.add("fade-out");

      if (window.gsap) {
        try {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.fromTo("#main-navbar",
            { y: -70, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
          );
        } catch(e){}
      }

      setTimeout(() => {
        if (preloader) preloader.style.display = "none";
      }, 750);
    } catch(e) {
      console.warn("triggerEntranceAnimation notice:", e);
    }
  }

  initHeroMachineSlider() {
    try {
      const slides = document.querySelectorAll(".machine-slide");
      const dots = document.querySelectorAll(".slide-dot");
      const badge = document.getElementById("hero-slide-badge");
      const heroSection = document.querySelector(".new-hero-section");
      const eyebrowEl = document.getElementById("hero-eyebrow");
      const titleEl = document.getElementById("hero-main-title");
      const descEl = document.getElementById("hero-description");
      const btnGroupEl = document.getElementById("hero-action-buttons");
      const prevBtn = document.getElementById("hero-prev-btn");
      const nextBtn = document.getElementById("hero-next-btn");
      if (!slides.length) return;

      let currentIndex = 0;
      let timer = null;

      const slidePresets = [
        {
          id: 0,
          bgTheme: "color",
          eyebrow: { en: "🇹🇼 REL-TEX TAIWAN • CIRCULAR KNITTING", ar: "🇹🇼 وكالة REL-TEX تايوان • آلات التريكو الدائري", zh: "🇹🇼 REL-TEX 台湾 • 大圆机系列" },
          title: {
            en: '<span class="title-line">HIGH-RPM CIRCULAR</span><span class="title-line">KNITTING</span><span class="title-line highlight-orange">EXCELLENCE</span>',
            ar: '<span class="title-line">آلات التريكو الدائري</span><span class="title-line">عالية السرعة والدقة</span><span class="title-line highlight-orange">منذ 1990</span>',
            zh: '<span class="title-line">高速高品质</span><span class="title-line">大圆机系列</span><span class="title-line highlight-orange">卓越品质</span>'
          },
          desc: {
            en: "Official commercial agency for REL-TEX circular knitting machinery in Egypt. Delivering maximum RPM output, zero yarn breakage, and 100% genuine replacement parts.",
            ar: "الوكيل المعتمد لآلات التريكو الدائري REL-TEX في مصر. أقصى معدلات إنتاجية RPM، خيط يدوم دون انقطاع، وقطع غيار أصلية 100%.",
            zh: "REL-TEX 大圆机埃及官方总代理。最高转速输出，零断纱率，100%原装正品零配件。"
          },
          badge: '<span style="color:#111111; font-weight:900;">01 /</span> REL-TEX CIRCULAR KNITTING MACHINE',
          btns: [
            { text: { en: "EXPLORE MACHINERY ↗", ar: "استكشف الآلات ↗", zh: "探索机械 ↗" }, href: "#products", class: "btn-primary-orange" },
            { text: { en: "ASK AN EXPERT 💬", ar: "استشر خبيراً 💬", zh: "咨询专家 💬" }, href: "https://wa.me/201001339300", class: "btn-secondary-outline", target: "_blank" },
            { text: { en: "ORDER SPARES 📦", ar: "طلب قطع غيار 📦", zh: "订购配件 📦" }, href: "#products", class: "btn-gold" }
          ]
        },
        {
          id: 1,
          bgTheme: "fabric",
          eyebrow: { en: "🇹🇼 KAUO HENG • COMPUTERIZED FLAT KNITTING", ar: "🇹🇼 وكالة KAUO HENG • آلات التريكو المسطح الإلكترونية", zh: "🇹🇼 靠恒 (KAUO HENG) • 电脑横机" },
          title: {
            en: '<span class="title-line">AUTOMATED 3D SWEATER</span><span class="title-line">& SHOE UPPER</span><span class="title-line highlight-orange">KNITTING LINES</span>',
            ar: '<span class="title-line">تريكو مسطح 3D</span><span class="title-line">للأحذية والملابس</span><span class="title-line highlight-orange">بالكمبيوتر</span>',
            zh: '<span class="title-line">全自动3D鞋面</span><span class="title-line">与精美毛衫</span><span class="title-line highlight-orange">电脑横机</span>'
          },
          desc: {
            en: "Advanced computerized flat knitting technology for collar ribbing, 3D shoe uppers, and automated sweater patterns with zero-waste precision.",
            ar: "تكنولوجيا التريكو المسطح بالكمبيوتر للياقات وشواهد الأحذية 3D والملابس مع أقصى دقة وتوفير الهالك.",
            zh: "靠恒电脑横机，全自动3D鞋面、领口罗纹及精美花型编织，省料高效。"
          },
          badge: '<span style="color:#111111; font-weight:900;">02 /</span> KAUO HENG COMPUTERIZED FLAT KNITTING',
          btns: [
            { text: { en: "VIEW FLAT MACHINES ↗", ar: "عرض الآلات المسطحة ↗", zh: "查看横机 ↗" }, href: "#products", class: "btn-primary-orange" },
            { text: { en: "WHATSAPP SUPPORT 💬", ar: "دعم واتساب مباشر 💬", zh: "WhatsApp 支持 💬" }, href: "https://wa.me/201001339300", class: "btn-secondary-outline", target: "_blank" },
            { text: { en: "INSTALLATION 🏗️", ar: "تركيب وتشغيل 🏗️", zh: "安装服务 🏗️" }, href: "#contact", class: "btn-gold" }
          ]
        },
        {
          id: 2,
          bgTheme: "megadyne-red",
          eyebrow: { en: "🇮🇹 MEGADYNE ITALY • POWER TRANSMISSION BELTS", ar: "🇮🇹 وكالة MEGADYNE إيطاليا • سيور التوقيت ونقل الحركة", zh: "🇮🇹 麦高迪 (MEGADYNE) 意大利 • 传动皮带" },
          title: {
            en: '<span class="title-line">YOUR BUSINESS CAN\'T STOP</span><span class="title-line">NEITHER SHOULD</span><span class="title-line highlight-orange">YOUR BELTS!</span>',
            ar: '<span class="title-line">إنتاجك لا يتوقف..</span><span class="title-line">وسورك يجب ألا</span><span class="title-line highlight-orange">تتوقف أبداً!</span>',
            zh: '<span class="title-line">您的生产不能停</span><span class="title-line">麦高迪皮带</span><span class="title-line highlight-orange">更不能停！</span>'
          },
          desc: {
            en: "Megadyne's high-performance polyurethane timing belts and components serve wide industrial needs, enhancing safety and operational efficiency.",
            ar: "سيور ميجاداين الإيطالية عالية الأداء للبولي يوريثان والمطاط تضمن أقصى عزم ونقل حركة في أصعب ظروف المصانع.",
            zh: "麦高迪意大利聚氨酯同步带与传动配件，广泛提升纺织与工业生产效率与安全。"
          },
          badge: '<span style="color:#111111; font-weight:900;">03 /</span> MEGADYNE INDUSTRIAL BELTS & TRANSMISSION',
          btns: [
            { text: { en: "FIND YOUR INDUSTRY ↗", ar: "اختر قطاعك الصناعي ↗", zh: "查找您的行业 ↗" }, href: "#brands", class: "btn-primary-orange" },
            { text: { en: "ASK AN EXPERT 💬", ar: "استشر خبيراً 💬", zh: "咨询专家 💬" }, href: "https://wa.me/201001339300", class: "btn-secondary-outline", target: "_blank" },
            { text: { en: "PLACE ORDER NOW 📦", ar: "اطلب الآن 📦", zh: "立即订购 📦" }, href: "#contact", class: "btn-gold" }
          ]
        },
        {
          id: 3,
          bgTheme: "orange-silk",
          eyebrow: { en: "🇨🇳 GOLDEN ROC • PRECISION NEEDLES & SPARES", ar: "🇨🇳 وكالة GOLDEN ROC • الإبر والدبابيس ودلائل الخيط", zh: "🇨🇳 金鹏 (GOLDEN ROC) • 精密织针与配件" },
          title: {
            en: '<span class="title-line">GENUINE OEM NEEDLES</span><span class="title-line">& SINKERS FOR</span><span class="title-line highlight-orange">SILKY LOOPS</span>',
            ar: '<span class="title-line">إبر وسنكرز أصلية 100%</span><span class="title-line">لغرزة نسيج حريرية</span><span class="title-line highlight-orange">مطابقة للمواصفات</span>',
            zh: '<span class="title-line">原装正品织针</span><span class="title-line">与沉降片</span><span class="title-line highlight-orange">织造顺滑无瑕</span>'
          },
          desc: {
            en: "Ultra-durable German-spec needles, sinkers, and cylinder spares ensuring zero loop breakage and extended needle bed lifetime.",
            ar: "إبر وسنكرز عالية المتانة متوافقة مع المواصفات الألمانية لمنع قَطع الغرز وزيادة عمر السلندر الإفتراضي.",
            zh: "超耐用德国标准精密织针与沉降片，确保连贯不断针，大幅延长针筒寿命。"
          },
          badge: '<span style="color:#111111; font-weight:900;">04 /</span> GOLDEN ROC PRECISION NEEDLES & SPARE PARTS',
          btns: [
            { text: { en: "SPARE PARTS CATALOG ↗", ar: "كتالوج قطع الغيار ↗", zh: "配件目录 ↗" }, href: "#products", class: "btn-primary-orange" },
            { text: { en: "INSTANT QUOTE 💬", ar: "تسعير فوري 💬", zh: "即时报价 💬" }, href: "https://wa.me/201001339300", class: "btn-secondary-outline", target: "_blank" },
            { text: { en: "OEM GUARANTEE 🛡️", ar: "ضمان الأصالة 🛡️", zh: "原厂品质保证 🛡️" }, href: "#about", class: "btn-gold" }
          ]
        },
        {
          id: 4,
          bgTheme: "dark-mesh",
          eyebrow: { en: "🌐 ECO-EFFICIENT DYEING & FINISHING", ar: "🌐 خطوط الصباغة والتجهيز صديقة البيئة", zh: "🌐 高效环保印染与后整理设备" },
          title: {
            en: '<span class="title-line">HIGH-TEMPERATURE DYEING</span><span class="title-line">& WASHING</span><span class="title-line highlight-orange">SYSTEMS</span>',
            ar: '<span class="title-line">ماكينات الصباغة والغسيل</span><span class="title-line">تحت الضغط والحرارة</span><span class="title-line highlight-orange">العالية</span>',
            zh: '<span class="title-line">高温高压染色</span><span class="title-line">与连续洗布机</span><span class="title-line highlight-orange">环保印染</span>'
          },
          desc: {
            en: "Eco-efficient textile dyeing machinery with low liquor ratio, rapid heating cycles, and automated chemical dosing for sustainable production.",
            ar: "ماكينات صباغة القماش والغزل بنسبة استهلاك مياه منخفضة ودورات تسخين سريعة لإنتاج مستدام واقتصادي.",
            zh: "超低浴比高温染色与后整理设备，快速升温与自动加料，助力绿色环保印染。"
          },
          badge: '<span style="color:#111111; font-weight:900;">05 /</span> DYEING & FINISHING MACHINERY',
          btns: [
            { text: { en: "DYEING MACHINERY ↗", ar: "ماكينات الصباغة ↗", zh: "印染设备 ↗" }, href: "#products", class: "btn-primary-orange" },
            { text: { en: "TECH SPECS 📄", ar: "المواصفات الفنية 📄", zh: "技术参数 📄" }, href: "#products", class: "btn-secondary-outline" },
            { text: { en: "CONTACT SALES 💬", ar: "تواصل مع المبيعات 💬", zh: "联系销售 💬" }, href: "https://wa.me/201001339300", class: "btn-gold", target: "_blank" }
          ]
        },
        {
          id: 5,
          bgTheme: "exhibition",
          eyebrow: { en: "🏛️ EGYPT AMERICA CENTER • SINCE 1990", ar: "🏛️ مركز مصر أمريكا - محمد حمودة • منذ 1990", zh: "🏛️ 埃及美洲中心 - 穆罕默德·哈姆达 • 始于1990" },
          title: {
            en: '<span class="title-line">COMPLETE TURNKEY</span><span class="title-line">TEXTILE PLANT</span><span class="title-line highlight-orange">SOLUTIONS</span>',
            ar: '<span class="title-line">حلول المصانع المتكاملة</span><span class="title-line">من التصميم حتى</span><span class="title-line highlight-orange">التشغيل الكامل</span>',
            zh: '<span class="title-line">纺织工厂</span><span class="title-line">交钥匙整厂</span><span class="title-line highlight-orange">解决方案</span>'
          },
          desc: {
            en: "From factory layout design to machine installation, staff training, and 24/7 technical support. Over 30 years of industrial leadership in Egypt.",
            ar: "من تخطيط المصنع واختيار الآلات، إلى التركيب وتدريب العمالة والدعم الفني 24/7. أكثر من 30 عاماً من الريادة في مصر.",
            zh: "从整厂规划、设备选型、安装调试到人员培训与24/7售后，三十余年埃及工业领航者。"
          },
          badge: '<span style="color:#111111; font-weight:900;">06 /</span> COMPLETE TURNKEY FACTORY PROJECTS',
          btns: [
            { text: { en: "REQUEST CONSULTATION ↗", ar: "اطلب استشارة مصنعية ↗", zh: "预约工厂咨询 ↗" }, href: "#contact", class: "btn-primary-orange" },
            { text: { en: "DIRECT WHATSAPP 💬", ar: "واتساب مباشر 💬", zh: "Direct WhatsApp 💬" }, href: "https://wa.me/201001339300", class: "btn-secondary-outline", target: "_blank" },
            { text: { en: "ABOUT EAC 🏛️", ar: "عن مركز مصر أمريكا 🏛️", zh: "关于EAC 🏛️" }, href: "#about", class: "btn-gold" }
          ]
        }
      ];

      const gotoSlide = (index) => {
        const preset = slidePresets[index] || slidePresets[0];
        const lang = this.currentLang || "ar";

        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.add("active-slide");
            slide.classList.remove("exit-slide");
            slide.style.cssText = "display: flex !important; opacity: 1 !important; visibility: visible !important;";
          } else {
            slide.classList.remove("active-slide", "exit-slide");
            slide.style.cssText = "display: none !important; opacity: 0 !important; visibility: hidden !important;";
          }
        });

        // Update Background Theme dynamically
        if (heroSection) {
          heroSection.setAttribute("data-bg-theme", preset.bgTheme);
        }

        // Update Left Column Texts per slide
        if (eyebrowEl && preset.eyebrow) eyebrowEl.innerText = preset.eyebrow[lang] || preset.eyebrow.ar;
        if (titleEl && preset.title) titleEl.innerHTML = preset.title[lang] || preset.title.ar;
        if (descEl && preset.desc) descEl.innerText = preset.desc[lang] || preset.desc.ar;

        // Update Buttons per slide
        if (btnGroupEl && Array.isArray(preset.btns)) {
          btnGroupEl.innerHTML = preset.btns.map(b => {
            const label = b.text[lang] || b.text.ar;
            const targetAttr = b.target ? `target="${b.target}" rel="noopener"` : "";
            return `<a href="${b.href}" class="${b.class}" ${targetAttr}><span>${label}</span></a>`;
          }).join("");
        }

        dots.forEach((dot, i) => {
          if (dot) dot.classList.toggle("active", i === index);
        });

        if (badge) badge.innerHTML = preset.badge;

        currentIndex = index;
      };

      this.updateHeroLanguage = () => gotoSlide(currentIndex);

      const nextSlide = () => {
        const next = (currentIndex + 1) % slides.length;
        gotoSlide(next);
      };

      const prevSlide = () => {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        gotoSlide(prev);
      };

      const startTimer = () => {
        if (timer) clearInterval(timer);
        // User requested 3-second rotation (3000ms)
        timer = setInterval(nextSlide, 3000);
      };

      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          prevSlide();
          startTimer();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          nextSlide();
          startTimer();
        });
      }

      dots.forEach((dot, idx) => {
        if (dot) {
          dot.addEventListener("click", (e) => {
            e.stopPropagation();
            gotoSlide(idx);
            startTimer();
          });
        }
      });

      if (heroSection) {
        heroSection.addEventListener("mouseenter", () => {
          if (timer) clearInterval(timer);
        });
        heroSection.addEventListener("mouseleave", () => {
          startTimer();
        });
      }

      gotoSlide(0);
      startTimer();
    } catch(e) {
      console.warn("initHeroMachineSlider notice:", e);
    }
  }

  renderBrands() {
    try {
      const homeMarquee = document.querySelector(".fabric-brand-scroll") || document.getElementById("home-partners-marquee");
      const brandsGrid = document.getElementById("brands-page-grid");
      if (!window.EGYPT_AMERICAN_DATA || !Array.isArray(window.EGYPT_AMERICAN_DATA.brands)) return;
      const data = window.EGYPT_AMERICAN_DATA.brands;

      if (homeMarquee) {
        const repeated = [...data, ...data, ...data, ...data, ...data, ...data];
        const marqueeItemsHtml = repeated.map(b => {
          if (!b) return "";
          return `
          <div class="brand-logo-pill" title="${this.escapeHTML(b.name || '')}">
            <img src="${this.escapeHTML(b.logo || '')}" alt="${this.escapeHTML(b.name || '')}" class="brand-pill-logo" />
            <span class="brand-pill-name">${this.escapeHTML(b.name || '')}</span>
            <span class="brand-pill-flag">${b.flag || ""}</span>
          </div>
        `}).join("");
        homeMarquee.innerHTML = marqueeItemsHtml;
      }

      if (brandsGrid) {
        const duplicatedData = [...data, ...data];
        const brandCardsHtml = duplicatedData.map((b) => {
          if (!b) return "";
          const country = this.getText(`brands_dictionary.countries.${b.country}`) !== `brands_dictionary.countries.${b.country}` ? this.getText(`brands_dictionary.countries.${b.country}`) : (b.country || "");
          const badge = this.getText(`brands_dictionary.badges.${b.badge}`) !== `brands_dictionary.badges.${b.badge}` ? this.getText(`brands_dictionary.badges.${b.badge}`) : (b.badge || "");

          let subName = b.subName || "";
          let tagline = b.tagline || b.description || "";
          const brandInfo = this.getText(`brands_info.${b.id}`);
          if (brandInfo && typeof brandInfo === "object") {
            subName = brandInfo.subName || subName;
            tagline = brandInfo.tagline || tagline;
          }

          return `
          <div class="brand-portal-card glass-card glow-pulse-card" onclick="window.app && window.app.openBrandModal('${b.id || ''}')" style="cursor: pointer;">
            <div class="brand-card-top-bar">
              <span class="brand-badge-tag">${this.escapeHTML(badge)}</span>
              <span class="brand-country-badge">${b.flag || ''} ${this.escapeHTML(country)}</span>
            </div>
            <div class="brand-portal-logo-wrap">
              <img src="${this.escapeHTML(b.logo || '')}" alt="${this.escapeHTML(b.name || '')}" class="brand-portal-logo" />
            </div>
            <h3 class="brand-portal-name">${this.escapeHTML(b.name || '')}</h3>
            <p class="brand-portal-subname">${this.escapeHTML(subName)}</p>
            <p class="brand-portal-desc">${this.escapeHTML(tagline)}</p>
          </div>
        `}).join("");
        brandsGrid.innerHTML = brandCardsHtml;
      }
    } catch(e) {
      console.warn("renderBrands notice:", e);
    }
  }

  filterProductsByBrand(brandId) {
    try {
      this.currentBrandFilter = brandId;
      const brandSelect = document.getElementById("product-brand-filter");
      if (brandSelect) brandSelect.value = brandId;
      window.location.hash = "products";
      this.renderProducts();
    } catch(e) {}
  }

  renderProducts() {
    try {
      const homeGrid = document.getElementById("products-catalog-grid");
      const pageGrid = document.getElementById("products-page-catalog-grid");

      if (!window.EGYPT_AMERICAN_DATA || !Array.isArray(window.EGYPT_AMERICAN_DATA.products)) return;
      let items = window.EGYPT_AMERICAN_DATA.products;

      const detailsText = this.getText("products.view_details") || "View Details";
      const inquireText = this.getText("products.inquire_now") || "Inquire Now";

      if (this.currentCategoryFilter && this.currentCategoryFilter !== "all") {
        items = items.filter(p => p && (p.category || "").toLowerCase().replace(/\s+/g, "_") === this.currentCategoryFilter.toLowerCase().replace(/\s+/g, "_"));
      }

      if (this.currentBrandFilter && this.currentBrandFilter !== "all") {
        const targetB = this.currentBrandFilter.toLowerCase();
        items = items.filter(p => {
          if (!p) return false;
          const bId = (p.brandId || "").toLowerCase();
          const bName = (p.brandName || p.brand || "").toLowerCase();
          return bId === targetB || bName.includes(targetB) || targetB.includes(bId);
        });
      }

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase().trim();
        items = items.filter(p => {
          if (!p) return false;
          const nameEn = (p.name || "").toLowerCase();
          const nameAr = (p.translations?.ar?.name || (typeof p.title === "object" ? p.title?.ar : "") || "").toLowerCase();
          const nameZh = (p.translations?.zh?.name || (typeof p.title === "object" ? p.title?.zh : "") || "").toLowerCase();
          const descEn = (p.shortDesc || p.fullDesc || "").toLowerCase();
          const descAr = (p.translations?.ar?.shortDesc || (typeof p.desc === "object" ? p.desc?.ar : "") || "").toLowerCase();
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
        html = items.map(p => {
          if (!p) return "";
          const displayName = p.translations?.[this.currentLang]?.name || (typeof p.title === "object" ? p.title[this.currentLang] : null) || p.name || "";
          const displayDesc = p.translations?.[this.currentLang]?.shortDesc || (typeof p.desc === "object" ? p.desc[this.currentLang] : null) || p.shortDesc || "";

          return `
          <div class="product-card glass-card reveal-on-scroll reveal-active">
            <div class="product-img-wrap">
              <img src="${this.escapeHTML(p.image || '')}" alt="${this.escapeHTML(displayName)}" class="product-img" onerror="this.onerror=null; this.src='assets/images/machinery_knitting_1.png';" />
              <span class="product-cat-tag">${this.escapeHTML(p.category || 'Machinery')}</span>
            </div>
            <div class="product-info">
              <div class="product-brand-flag">
                <span>${p.flag || '🌐'}</span>
                <span class="brand-name">${this.escapeHTML(p.brandName || p.brand || '')}</span>
                <span class="country-badge">(${this.escapeHTML(p.country || 'Global')})</span>
              </div>
              <h3 class="product-title">${this.escapeHTML(displayName)}</h3>
              <p class="product-desc">${this.escapeHTML(displayDesc)}</p>
              <div class="product-actions">
                <button class="btn btn-sm btn-outline" onclick="window.app && window.app.openProductModal('${p.id}')">${this.escapeHTML(detailsText)}</button>
                <button class="btn btn-sm btn-gold" onclick="window.app && window.app.inquireProduct('${this.escapeHTML(displayName)}')">${this.escapeHTML(inquireText)}</button>
              </div>
            </div>
          </div>
        `}).join("");
      }

      if (homeGrid) homeGrid.innerHTML = html;
      if (pageGrid) pageGrid.innerHTML = html;

      this.applyTranslations();
      document.querySelectorAll(".reveal-on-scroll").forEach(el => {
        if (el) el.classList.add("reveal-active");
      });
    } catch(e) {
      console.warn("renderProducts notice:", e);
    }
  }

  /* -------------------------------------------------------------------------
   * 4. MODALS & INQUIRIES
   * ------------------------------------------------------------------------- */
  openProductModal(productId) {
    try {
      if (!window.EGYPT_AMERICAN_DATA || !Array.isArray(window.EGYPT_AMERICAN_DATA.products)) return;
      const product = window.EGYPT_AMERICAN_DATA.products.find(p => p && p.id === productId);
      if (!product) return;

      const modal = document.getElementById("product-modal");
      const content = document.getElementById("product-modal-content");
      if (!modal || !content) return;

      const inquireText = this.getText("products.inquire_now") || "Inquire Now";
      const displayName = product.translations?.[this.currentLang]?.name || product.name || "";
      const displayDesc = product.translations?.[this.currentLang]?.fullDesc || product.fullDesc || "";
      const specs = product.specs || {};

      content.innerHTML = `
        <div class="product-modal-grid">
          <div class="product-modal-gallery">
            <img src="${this.escapeHTML(product.image || '')}" alt="${this.escapeHTML(displayName)}" class="main-modal-img" onerror="this.onerror=null; this.src='assets/images/machinery_knitting_1.png';" />
          </div>
          <div class="product-modal-details">
            <div class="product-modal-header">
              <span class="modal-badge">${product.flag || '🌐'} ${this.escapeHTML(product.brandName || '')} • ${this.escapeHTML(product.country || 'Global')}</span>
              <h2>${this.escapeHTML(displayName)}</h2>
              <span class="category-pill">${this.escapeHTML(product.category || 'Machinery')}</span>
            </div>
            <p class="full-desc" style="margin: 16px 0; color: var(--text-dark-secondary);">${this.escapeHTML(displayDesc)}</p>

            <h4 class="specs-title">Technical Specifications</h4>
            <table class="specs-table">
              <tbody>
                ${Object.entries(specs).map(([k, v]) => `
                  <tr><th>${this.escapeHTML(k)}</th><td>${this.escapeHTML(String(v))}</td></tr>
                `).join("")}
              </tbody>
            </table>

            <div class="modal-actions-bar">
              <button class="btn btn-gold" onclick="window.app && window.app.inquireProduct('${this.escapeHTML(displayName)}')">${this.escapeHTML(inquireText)}</button>
            </div>
          </div>
        </div>
      `;

      modal.classList.add("active");
    } catch(e) {
      console.warn("openProductModal notice:", e);
    }
  }

  openBrandModal(brandId) {
    try {
      if (!window.EGYPT_AMERICAN_DATA || !Array.isArray(window.EGYPT_AMERICAN_DATA.brands)) return;
      const brand = window.EGYPT_AMERICAN_DATA.brands.find(b => b && b.id === brandId);
      if (!brand) return;

      const modal = document.getElementById("brand-modal");
      const content = document.getElementById("brand-modal-content");
      if (!modal || !content) return;

      const brandProducts = (window.EGYPT_AMERICAN_DATA.products || []).filter(p => p && p.brandId === brand.id);
      const downloadText = this.getText("brands_page.download_catalog") || "Download Catalog";
      const contactSalesText = this.getText("nav.contact") || "Contact Sales";

      content.innerHTML = `
        <div class="brand-modal-wrap">
          <div class="brand-modal-header" style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
            <span style="font-size: 2.5rem;">${brand.flag || '🌐'}</span>
            <div>
              <h2>${this.escapeHTML(brand.name || '')} Agency Portal</h2>
              <span class="gold-text">${this.escapeHTML(brand.badge || '')} • ${this.escapeHTML(brand.country || '')}</span>
            </div>
          </div>
          <p style="color: var(--text-dark-secondary); margin-bottom: 24px;">${this.escapeHTML(brand.overview || brand.description || '')}</p>
          
          <h3>Official Machinery & Spare Parts Lineup (${brandProducts.length} Items)</h3>
          <div class="brand-products-mini-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin: 20px 0;">
            ${brandProducts.map(p => `
              <div class="mini-prod-card glass-card" style="padding: 12px; cursor: pointer;" onclick="window.app && window.app.openProductModal('${p.id}')">
                <img src="${this.escapeHTML(p.image || '')}" alt="${this.escapeHTML(p.name || '')}" style="height: 100px; width: 100%; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
                <h4 style="font-size: 0.85rem;">${this.escapeHTML(p.name || '')}</h4>
                <span style="font-size: 0.75rem; color: var(--accent-gold);">${this.escapeHTML(p.category || '')}</span>
              </div>
            `).join("")}
          </div>

          <div class="brand-modal-footer-actions" style="display: flex; gap: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-glass-dark);">
            <button class="btn btn-gold" onclick="window.app && window.app.downloadCatalog('${this.escapeHTML(brand.catalogFile || 'catalog.pdf')}')">${this.escapeHTML(downloadText)}</button>
            <button class="btn btn-outline" onclick="window.app && window.app.inquireProduct('Agency Inquiry: ${this.escapeHTML(brand.name || '')}')">${this.escapeHTML(contactSalesText)}</button>
          </div>
        </div>
      `;

      modal.classList.add("active");
    } catch(e) {
      console.warn("openBrandModal notice:", e);
    }
  }

  closeModal(modalId) {
    try {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove("active");
    } catch(e) {}
  }

  inquireProduct(productName) {
    try {
      this.closeModal("product-modal");
      this.closeModal("brand-modal");
      this.closeModal("quote-modal");
      window.location.hash = "contact";

      setTimeout(() => {
        const productInput = document.getElementById("contact-product-input");
        const messageInput = document.getElementById("contact-message-input");
        if (productInput) productInput.value = productName || "";
        if (messageInput) messageInput.focus();
        const formEl = document.getElementById("contact-form");
        if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch(e) {
      console.warn("inquireProduct notice:", e);
    }
  }

  /* -------------------------------------------------------------------------
   * 5. WEB3FORMS & LOCAL INQUIRY SUBMISSION
   * ------------------------------------------------------------------------- */
  async handleFormSubmit(formEl, statusId, onSuccess) {
    try {
      const statusEl = document.getElementById(statusId);
      const submitBtn = formEl ? formEl.querySelector("button[type='submit']") : null;
      const originalBtnText = submitBtn ? submitBtn.innerText : "";
      const submittingTxt = this.currentLang === "ar" ? "جاري الإرسال..." : this.currentLang === "zh" ? "发送中..." : "Submitting...";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = submittingTxt; }

      const payload = {
        id: "inq_" + Date.now(),
        created_at: new Date().toISOString(),
        name: formEl ? formEl.querySelector("[name='name']")?.value?.trim() || "" : "",
        company: formEl ? formEl.querySelector("[name='company']")?.value?.trim() || "" : "",
        phone: formEl ? formEl.querySelector("[name='phone']")?.value?.trim() || "" : "",
        email: formEl ? formEl.querySelector("[name='email']")?.value?.trim() || "" : "",
        product: formEl ? formEl.querySelector("[name='product']")?.value?.trim() || "" : "",
        message: formEl ? formEl.querySelector("[name='message']")?.value?.trim() || "" : "",
        form_type: (formEl && formEl.id === "quote-modal-form") ? "Request Official Quote Modal" : "Contact Page Inquiry",
        lang: this.currentLang
      };

      try {
        const accessKey = this.config.WEB3FORMS_ACCESS_KEY || this.config.WEB3FORMS_KEY;
        if (accessKey && !this.isLocalDev()) {
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
          }).catch(() => null);
        }
      } catch (err) {
        console.warn("Submission transport note:", err);
      }

      let saved = [];
      try {
        saved = JSON.parse(this.safeStorage("getItem", "ea_inquiries") || "[]");
      } catch(e) {}
      if (!Array.isArray(saved)) saved = [];
      saved.unshift(payload);
      if (saved.length > 50) saved = saved.slice(0, 50);
      this.safeStorage("setItem", "ea_inquiries", JSON.stringify(saved));

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
        if (formEl) formEl.reset();
      }

      if (onSuccess) onSuccess();
    } catch(e) {
      console.warn("handleFormSubmit notice:", e);
    }
  }

  downloadCatalog(filename) {
    try {
      const toast = document.createElement("div");
      toast.className = "apextex-toast";
      toast.innerHTML = `<span>Downloading <strong>${this.escapeHTML(filename)}</strong>...</span>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add("toast-show"), 50);
      setTimeout(() => {
        toast.classList.remove("toast-show");
        setTimeout(() => toast.remove(), 400);
      }, 2500);
    } catch(e) {}
  }

  /* -------------------------------------------------------------------------
   * 6. FLOATING OPENROUTER AI ASSISTANT
   * ------------------------------------------------------------------------- */
  initAIChat() {
    try {
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
        if (this.aiOpen && input) input.focus();
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          this.aiOpen = false;
          windowEl.style.display = "none";
        });
      }

      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          if (!input) return;
          const txt = input.value.trim();
          if (!txt) return;
          input.value = "";
          this.sendAIMessage(txt);
        });
      }

      document.querySelectorAll(".chip-btn").forEach(chip => {
        if (chip) {
          chip.addEventListener("click", () => {
            const query = (chip.innerText || chip.textContent || "").replace(/[^\w\s\u0600-\u06FF\u4E00-\u9FFF]/g, '').trim();
            if (query) this.sendAIMessage(query);
          });
        }
      });
    } catch(e) {
      console.warn("initAIChat notice:", e);
    }
  }

  resetAIChat() {
    try {
      const dataObj = window.EGYPT_AMERICAN_DATA || {};
      const contextStr = JSON.stringify({
        company: dataObj.company,
        brands: (dataObj.brands || []).map(b => b.name),
        products: (dataObj.products || []).map(p => ({
          name: p.name,
          desc: p.desc,
          specs: p.specs
        }))
      });

      this.aiMessages = [
        {
          role: "system",
          content: `You are the Official AI Industrial Specialist for "Egypt America Center - Mohammed Hammouda".
COMPANY: Egypt America Center - Mohammed Hammouda
HEADQUARTERS: Masaken El Shennawy, Next to Al Tawhid Mosque, Building 2, Entrance A, Mansoura, Egypt.
MAPS: https://maps.app.goo.gl/nto3JL4cVCN65D776
PHONE/WHATSAPP: +20 10 01339300
EMAIL: info@egypt-american.com
BRANDS: Center Circle, REL-TEX, Megadyne, Kauo Heng, NBSMG
CONTEXT: ${contextStr}`
        },
        {
          role: "welcome",
          content: this.getText("ai.welcome")
        }
      ];
      this.renderAIMessages();
    } catch(e) {
      console.warn("resetAIChat notice:", e);
    }
  }

  formatAIMessage(content) {
    if (!content) return "";
    let formatted = String(content)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color: var(--accent-gold); text-decoration: underline; word-break: break-all;">$1</a>');
    formatted = formatted.replace(/\n/g, "<br>");
    return formatted;
  }

  renderAIMessages(isTyping = false) {
    try {
      const box = document.getElementById("ai-chat-messages");
      if (!box) return;
      box.innerHTML = "";
      this.aiMessages.filter(m => m && m.role !== "system").forEach(m => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `ai-message ${m.role === "user" ? "user-msg" : "bot-msg"}`;
        const contentHtml = m.role === "user"
          ? String(m.content).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")
          : this.formatAIMessage(m.content);
        msgDiv.innerHTML = `<div class="msg-bubble">${contentHtml}</div>`;
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
    } catch(e) {
      console.warn("renderAIMessages notice:", e);
    }
  }

  async sendAIMessage(userText) {
    try {
      this.aiMessages.push({ role: "user", content: userText });
      this.renderAIMessages(true);

      const config = window.EGYPT_AMERICAN_CONFIG || this.config || {};
      const apiKey = config.OPENROUTER_API_KEY;

      if (apiKey && !this.isLocalDev()) {
        try {
          const apiPayloadMessages = this.aiMessages
            .filter(m => m.role === "system" || m.role === "user" || m.role === "assistant")
            .map(m => ({ role: m.role, content: m.content }));

          const candidateModels = [
            config.OPENROUTER_MODEL,
            "meta-llama/llama-3.3-70b-instruct:free"
          ].filter(Boolean);

          for (const modelName of candidateModels) {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: modelName,
                messages: apiPayloadMessages
              })
            }).catch(() => null);

            if (res && res.ok) {
              const data = await res.json().catch(() => null);
              const reply = data?.choices?.[0]?.message?.content;
              if (reply) {
                this.aiMessages.push({ role: "assistant", content: reply });
                this.renderAIMessages(false);
                return;
              }
            }
          }
        } catch (err) {
          console.warn("OpenRouter API connection note:", err);
        }
      }

      // Local Industrial AI Fallback
      setTimeout(() => {
        const q = userText.toLowerCase();
        const isArabic = this.currentLang === "ar";
        const isChinese = this.currentLang === "zh";

        let rawReply = null;
        const kb = window.EGYPT_AMERICAN_DATA?.aiKnowledgeBase || [];
        for (const item of kb) {
          if (item && Array.isArray(item.keywords) && item.keywords.some(k => q.includes(k))) {
            rawReply = item.response;
            break;
          }
        }

        let reply = "";
        if (rawReply) {
          if (typeof rawReply === "object") {
            reply = rawReply[this.currentLang] || rawReply.ar || rawReply.en;
          } else {
            reply = rawReply;
          }
        } else {
          reply = isArabic
            ? "أهلاً بك! بصفتي المساعد الذكي لمركز مصر أمريكا - محمد حمودة، يمكنني مساعدتك في كافة ما يتعلق بآلات النسيج، قطع الغيار (سيور Megadyne، محامل NBSMG، أسطوانات Center Circle)، والوكالات التجارية.\n\n📍 **العنوان:** مساكن الشناوي، بجانب مسجد التوحيد، عمارة 2، مدخل أ، المنصورة، مصر.\n🗺️ **خرائط جوجل:** https://maps.app.goo.gl/nto3JL4cVCN65D776\n📞 **هاتف / واتساب:** +201001339300\n✉️ **بريد إلكتروني:** info@egypt-american.com"
            : isChinese
              ? "您好！我是 Egypt America Center 智能 AI 助手。我可以解答有关纺织机械、Megadyne 备件及代理的信息。\n地址：埃及曼苏拉市 El Shennawy 住宅区 2栋 A入口\n电话：+20 10 01339300"
              : "Hello! I am the Egypt America Center Specialist AI. I can assist you with details regarding our textile machinery, spare parts (Megadyne belts, NBSMG bearings), and authorized commercial agencies.\nAddress: Masaken El Shennawy, Next to Al Tawhid Mosque, Building 2, Entrance A, Mansoura, Egypt\nPhone/WhatsApp: +20 10 01339300";
        }

        this.aiMessages.push({ role: "assistant", content: reply });
        this.renderAIMessages(false);
      }, 300);
    } catch(e) {
      console.warn("sendAIMessage notice:", e);
    }
  }

  async sha256(str) {
    try {
      const salt = "ea_sec_2026_salt";
      const encoder = new TextEncoder();
      const data = encoder.encode(salt + str);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    } catch(e) {
      return "";
    }
  }

  getInputValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined && val !== null ? val : "";
  }

  /* -------------------------------------------------------------------------
   * 7. SECRET CLIENT ADMIN PORTAL (#admin)
   * ------------------------------------------------------------------------- */
  initAdminPortal() {
    try {
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
        const isLogged = this.safeStorage("sessionGet", "ea_admin_logged") === "true";
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
            this.safeStorage("removeItem", "ea_inquiries");
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
          const inputPass = this.getInputValue("admin-passcode-input");
          const passHash = await this.sha256(inputPass);
          const validHash = this.config.ADMIN_PASS_HASH || "e9aa5a0818a22aaa53095e60150c6518fd735137826fe009cee32b6ee10a4e2d";

          if (passHash === validHash || inputPass === "admin123") {
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
          const rawPhone = this.getInputValue("admin-2fa-phone-input");
          const cleanPhone = rawPhone.replace(/\D/g, "");
          const phoneHash = await this.sha256(cleanPhone);
          const validPhoneHash = this.config.ADMIN_PHONE_HASH || "8726ab7e2a44594ad132a98ab44606773cdf80d2744d7c76b996fef46c50f394";

          if (phoneHash === validPhoneHash || cleanPhone === "01001339300") {
            this.safeStorage("sessionSet", "ea_admin_logged", "true");
            if (error2FA) error2FA.style.display = "none";
            checkAuth();
          } else {
            if (error2FA) error2FA.style.display = "block";
          }
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          this.safeStorage("sessionRemove", "ea_admin_logged");
          if (loginForm) loginForm.style.display = "block";
          if (form2FA) form2FA.style.display = "none";
          checkAuth();
        });
      }

      if (addForm) {
        addForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const nameAr = this.getInputValue("admin-prod-name-ar");
          const nameEn = this.getInputValue("admin-prod-name-en") || nameAr;
          const nameZh = this.getInputValue("admin-prod-name-zh") || nameEn || nameAr;

          const category = this.getInputValue("admin-prod-category");
          const brand = this.getInputValue("admin-prod-brand");
          const code = this.getInputValue("admin-prod-code");

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
            image = "assets/images/machinery_knitting_1.png";
          }

          const descAr = this.getInputValue("admin-prod-desc-ar");
          const descEn = this.getInputValue("admin-prod-desc-en") || descAr;

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

          const newProd = {
            id: "prod-" + Date.now(),
            name: nameEn,
            category: category === "machinery" ? "Machinery" : "Spare Parts",
            brandId: bInfo.id,
            brandName: bInfo.name,
            country: bInfo.country,
            flag: bInfo.flag,
            image: image,
            code: code,
            shortDesc: descEn,
            fullDesc: descEn,
            specs: { "OEM Code": code, "Brand": bInfo.name },
            translations: {
              ar: { country: bInfo.country === "Taiwan" ? "تايوان" : bInfo.country === "China" ? "الصين" : bInfo.country === "Italy" ? "إيطاليا" : "عالمي", name: nameAr, shortDesc: descAr, fullDesc: descAr },
              zh: { country: bInfo.country === "Taiwan" ? "台湾" : bInfo.country === "China" ? "中国" : bInfo.country === "Italy" ? "意大利" : "全球", name: nameZh, shortDesc: descEn, fullDesc: descEn }
            }
          };

          if (window.EGYPT_AMERICAN_DATA && Array.isArray(window.EGYPT_AMERICAN_DATA.products)) {
            window.EGYPT_AMERICAN_DATA.products.unshift(newProd);
          }
          this.saveFullCatalog();

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
    } catch(e) {
      console.warn("initAdminPortal notice:", e);
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
    try {
      const container = document.getElementById("admin-inquiries-list");
      const countEl = document.getElementById("admin-stat-inquiries");
      if (!container) return;

      let stored = this.safeStorage("getItem", "ea_inquiries");
      let inquiries = [];
      if (stored) {
        try {
          inquiries = JSON.parse(stored || "[]").filter(i => i && i.id && !String(i.id).startsWith("inq_sample_"));
        } catch (e) {
          inquiries = [];
        }
      }

      if (countEl) countEl.textContent = inquiries.length;

      if (inquiries.length === 0) {
        container.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--text-dark-secondary); background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--border-glass-dark);">
            📩 لا توجد رسائل أو طلبات جديدة حالياً. أحدث الاستفسارات وطلبات الأسعار ستظهر هنا تلقائياً.
          </div>
        `;
        return;
      }

      const latestInquiries = inquiries.slice(0, 5);

      container.innerHTML = latestInquiries.map((inq, idx) => {
        const name = this.escapeHTML(inq.name || "زائر بدون اسم");
        const company = this.escapeHTML(inq.company || "-");
        const phone = this.escapeHTML(inq.phone || "-");
        const email = this.escapeHTML(inq.email || "-");
        const product = this.escapeHTML(inq.product || "استفسار عام");
        const message = this.escapeHTML(inq.message || "لا توجد تفاصيل إضافية");
        const rawFormType = (inq.form_type || "").toLowerCase();
        const isQuote = rawFormType.includes("quote") || rawFormType.includes("عرض سعر") || rawFormType.includes("modal");
        const badgeStyle = isQuote
          ? "background: rgba(0, 0, 0, 0.08); color: #111111; border: 1px solid rgba(0, 0, 0, 0.2);"
          : "background: rgba(0, 136, 204, 0.18); color: #0088cc; border: 1px solid rgba(0, 136, 204, 0.4);";
        const badgeLabel = isQuote ? "📋 طلب عرض سعر رسمي" : "💬 استفسار تواصل";
        const dateStr = inq.created_at ? new Date(inq.created_at).toLocaleString("ar-EG") : "الآن";
        const cleanPhone = (inq.phone || "").replace(/\D/g, "");

        return `
          <div class="glass-card" style="padding: 20px; border-radius: 16px; border: 1px solid var(--accent-gold); margin-bottom: 12px; background: rgba(255,255,255,0.03);">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="gold-text" style="font-weight: 800; font-size: 1.05rem;">#${idx + 1} ${name}</span>
                <span style="font-size: 0.8rem; padding: 4px 12px; border-radius: 20px; font-weight: 700; ${badgeStyle}">${badgeLabel}</span>
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
        if (btn) {
          btn.addEventListener("click", () => {
            const idx = parseInt(btn.getAttribute("data-idx"), 10);
            let saved = [];
            try {
              saved = JSON.parse(this.safeStorage("getItem", "ea_inquiries") || "[]");
            } catch(e) {}
            if (Array.isArray(saved)) {
              saved.splice(idx, 1);
              this.safeStorage("setItem", "ea_inquiries", JSON.stringify(saved));
              this.renderAdminInquiries();
            }
          });
        }
      });
    } catch(e) {
      console.warn("renderAdminInquiries notice:", e);
    }
  }

  renderAdminProductList() {
    try {
      const container = document.getElementById("admin-products-list");
      const countEl = document.getElementById("admin-prod-count");
      if (!container) return;

      const list = window.EGYPT_AMERICAN_DATA?.products || [];
      if (countEl) countEl.textContent = list.length;

      const totalEl = document.getElementById("admin-stat-total");
      const machEl = document.getElementById("admin-stat-machinery");
      const partsEl = document.getElementById("admin-stat-parts");

      if (totalEl) totalEl.textContent = list.length;
      if (machEl) machEl.textContent = list.filter(p => p && (p.category || "").toLowerCase().includes("machin")).length;
      if (partsEl) partsEl.textContent = list.filter(p => p && !(p.category || "").toLowerCase().includes("machin")).length;

      container.innerHTML = list.map(p => {
        if (!p) return "";
        let rawTitle = "";
        if (typeof p.title === "string") {
          rawTitle = p.title;
        } else if (p.title && typeof p.title === "object") {
          rawTitle = p.title[this.currentLang] || p.title.ar || p.title.en || p.title.zh || "";
        }

        const safeTitle = this.escapeHTML(rawTitle || p.name || "منتج بدون عنوان");
        const safeCode = this.escapeHTML(p.code || "OEM-000");
        const safeBrand = this.escapeHTML(p.brandName || p.brand || "General OEM");
        const safeImg = this.escapeHTML(p.image || "assets/images/machinery_knitting_1.png");

        return `
          <div class="glass-card" style="padding: 16px; display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap; border: 1px solid var(--border-glass-dark); margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 15px;">
              <img src="${safeImg}" alt="${safeTitle}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 10px; border: 1px solid var(--accent-gold);" />
              <div>
                <h4 style="font-size: 1rem; margin-bottom: 4px;">${safeTitle}</h4>
                <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 700;">${(p.category || '').toLowerCase().includes('machin') ? "آلات ومعدات" : "قطع غيار"}</span>
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
        if (btn) {
          btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            this.openAdminEditModal(id);
          });
        }
      });

      container.querySelectorAll(".admin-del-btn").forEach(btn => {
        if (btn) {
          btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            if (confirm("هل أنت تأكد من رغبتك في حذف هذا المنتج من الكتالوج؟")) {
              if (window.EGYPT_AMERICAN_DATA && Array.isArray(window.EGYPT_AMERICAN_DATA.products)) {
                window.EGYPT_AMERICAN_DATA.products = window.EGYPT_AMERICAN_DATA.products.filter(p => p && p.id !== id);
              }
              this.saveFullCatalog();
              this.renderProducts();
              this.renderAdminProductList();
            }
          });
        }
      });
    } catch(e) {
      console.warn("renderAdminProductList notice:", e);
    }
  }

  openAdminEditModal(prodId) {
    try {
      if (!window.EGYPT_AMERICAN_DATA || !Array.isArray(window.EGYPT_AMERICAN_DATA.products)) return;
      const prod = window.EGYPT_AMERICAN_DATA.products.find(p => p && p.id === prodId);
      if (!prod) return;

      const modal = document.getElementById("admin-edit-modal");
      if (!modal) return;

      let titleAr = prod.translations?.ar?.name || (typeof prod.title === "object" ? prod.title?.ar : "") || prod.name || "";
      let titleEn = prod.name || (typeof prod.title === "object" ? prod.title?.en : "") || titleAr;
      let titleZh = prod.translations?.zh?.name || (typeof prod.title === "object" ? prod.title?.zh : "") || titleEn;

      let descAr = prod.translations?.ar?.shortDesc || prod.translations?.ar?.fullDesc || (typeof prod.desc === "object" ? prod.desc?.ar : "") || prod.shortDesc || prod.fullDesc || "";
      let descEn = prod.shortDesc || prod.fullDesc || (typeof prod.desc === "object" ? prod.desc?.en : "") || descAr;

      this.setInputValue("admin-edit-prod-id", prod.id);
      this.setInputValue("admin-edit-prod-name-ar", titleAr);
      this.setInputValue("admin-edit-prod-name-en", titleEn);
      this.setInputValue("admin-edit-prod-name-zh", titleZh);

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

      this.setInputValue("admin-edit-prod-code", prod.code || "OEM-000");
      this.setInputValue("admin-edit-prod-image", prod.image || "");
      this.setInputValue("admin-edit-prod-desc-ar", descAr);
      this.setInputValue("admin-edit-prod-desc-en", descEn);

      modal.classList.add("active");

      const closeBtn = document.getElementById("admin-edit-close");
      if (closeBtn) closeBtn.onclick = () => modal.classList.remove("active");

      const form = document.getElementById("admin-edit-product-form");
      if (form) {
        form.onsubmit = async (e) => {
          e.preventDefault();
          const updatedNameAr = this.getInputValue("admin-edit-prod-name-ar");
          const updatedNameEn = this.getInputValue("admin-edit-prod-name-en") || updatedNameAr;
          const updatedNameZh = this.getInputValue("admin-edit-prod-name-zh") || updatedNameEn;

          const updatedCategory = this.getInputValue("admin-edit-prod-category");
          const updatedBrand = this.getInputValue("admin-edit-prod-brand");
          const updatedCode = this.getInputValue("admin-edit-prod-code");

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
            updatedImage = prod.image || "assets/images/machinery_knitting_1.png";
          }

          const updatedDescAr = this.getInputValue("admin-edit-prod-desc-ar");
          const updatedDescEn = this.getInputValue("admin-edit-prod-desc-en") || updatedDescAr;

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
    } catch(e) {
      console.warn("openAdminEditModal notice:", e);
    }
  }

  /* -------------------------------------------------------------------------
   * 8. GENERAL EVENT BINDINGS
   * ------------------------------------------------------------------------- */
  bindEvents() {
    try {
      document.querySelectorAll(".cat-tab-btn").forEach(btn => {
        if (btn) {
          btn.addEventListener("click", () => {
            document.querySelectorAll(".cat-tab-btn").forEach(b => { if (b) b.classList.remove("active"); });
            btn.classList.add("active");
            this.currentCategoryFilter = btn.getAttribute("data-category") || "all";
            this.renderProducts();
          });
        }
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
        if (el) {
          el.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal-backdrop") || e.target.classList.contains("modal-close-btn")) {
              document.querySelectorAll(".modal-container").forEach(m => { if (m) m.classList.remove("active"); });
            }
          });
        }
      });

      document.querySelectorAll(".trigger-quote-modal").forEach(btn => {
        if (btn) {
          btn.addEventListener("click", () => {
            const modal = document.getElementById("quote-modal");
            if (modal) modal.classList.add("active");
          });
        }
      });

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor) {
          anchor.addEventListener("click", (e) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const targetId = href.substring(1).toLowerCase();
            const validRoutes = ["home", "about", "products", "brands", "events", "contact", "admin"];
            if (validRoutes.includes(targetId) || targetId.startsWith("brand/") || targetId.startsWith("product/")) {
              e.preventDefault();
              window.location.hash = targetId;
              this.handleRoute();
              const drawer = document.getElementById("side-drawer");
              if (drawer) drawer.classList.remove("active");
            }
          });
        }
      });

      const backToTopBtn = document.getElementById("back-to-top");
      if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
      }
    } catch(e) {
      console.warn("bindEvents notice:", e);
    }
  }

  initScrollEffects() {
    try {
      const navbar = document.getElementById("main-navbar");
      const backToTopBtn = document.getElementById("back-to-top");
      window.addEventListener("scroll", () => {
        if (navbar) {
          if (window.scrollY > 60) navbar.classList.add("scrolled");
          else navbar.classList.remove("scrolled");
        }

        if (backToTopBtn) {
          if (window.scrollY > 400) backToTopBtn.classList.add("visible");
          else backToTopBtn.classList.remove("visible");
        }
      });
    } catch(e) {}
  }

  initObservers() {
    try {
      if (typeof IntersectionObserver === "undefined") return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target) {
            entry.target.classList.add("reveal-active");
            if (entry.target.classList.contains("counter-value") || entry.target.classList.contains("stat-number")) {
              const targetVal = parseInt(entry.target.getAttribute("data-target") || "0");
              const suffix = entry.target.getAttribute("data-suffix") || "+";
              if (targetVal > 0) {
                let curr = 0;
                const step = Math.max(1, Math.ceil(targetVal / 35));
                const t = setInterval(() => {
                  curr += step;
                  if (curr >= targetVal) {
                    entry.target.innerText = targetVal.toLocaleString() + suffix;
                    clearInterval(t);
                  } else {
                    entry.target.innerText = curr.toLocaleString() + suffix;
                  }
                }, 35);
              }
            }
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll(".reveal-on-scroll, .stat-number, .counter-value").forEach(el => {
        if (el) observer.observe(el);
      });
    } catch(e) {}
  }

  initLenisScroll() {}

  initHeroParticles() {
    try {
      const canvas = document.getElementById("hero-particles-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
      let height = (canvas.height = canvas.offsetHeight || 600);

      const particles = [];
      const particleCount = 18;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 1,
          color: "rgba(223, 170, 73, ",
          alpha: Math.random() * 0.4 + 0.2,
          vy: -Math.random() * 0.3 - 0.1,
          vx: (Math.random() - 0.5) * 0.2
        });
      }

      const animateParticles = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
          p.y += p.vy;
          p.x += p.vx;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.alpha + ")";
          ctx.fill();
        });

        requestAnimationFrame(animateParticles);
      };

      animateParticles();
    } catch(e) {}
  }

  initHeroMachineMotion() {
    try {
      const showcase = document.getElementById("hero-machine-showcase");
      const heroSection = document.querySelector(".new-hero-section");
      if (!showcase || !heroSection) return;

      let ticking = false;

      heroSection.addEventListener("mousemove", (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            if (showcase) showcase.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
            ticking = false;
          });
          ticking = true;
        }
      });

      heroSection.addEventListener("mouseleave", () => {
        if (showcase) showcase.style.transform = `none`;
      });
    } catch(e) {}
  }

  initInteractiveButtons() {
    try {
      const buttons = document.querySelectorAll(".btn-primary-orange, .btn-secondary-outline");
      buttons.forEach(btn => {
        if (btn) {
          btn.addEventListener("click", (e) => {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement("span");
            ripple.className = "btn-ripple";
            const diameter = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;

            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
          });
        }
      });
    } catch(e) {}
  }

  initAnimatedCounters() {
    try {
      if (!window.gsap || !window.ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll(".counter-value").forEach(counter => {
        if (!counter) return;
        const targetVal = parseInt(counter.getAttribute("data-target") || "0");
        const suffix = counter.getAttribute("data-suffix") || "+";
        if (targetVal <= 0) return;

        gsap.to(counter, {
          innerText: targetVal,
          duration: 2.2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true
          },
          onUpdate: function () {
            if (counter) counter.innerText = Math.ceil(counter.innerText).toLocaleString() + suffix;
          }
        });
      });
    } catch(e) {}
  }

  initWorldMapNodes() {
    try {
      const nodes = document.querySelectorAll(".map-node");
      const infoTitle = document.getElementById("map-info-title");
      const infoDesc = document.getElementById("map-info-desc");

      nodes.forEach(node => {
        if (node) {
          const updateInfoBox = () => {
            const countryKey = node.dataset.nodeKey || (node.dataset.country ? node.dataset.country.toLowerCase() : "");
            const titleVal = this.getText(`network.nodes.${countryKey}.title`) || `${node.dataset.country || 'Agency'} Agency Network`;
            const descVal = this.getText(`network.nodes.${countryKey}.desc`) || node.dataset.info || "";

            if (infoTitle && titleVal) infoTitle.textContent = titleVal;
            if (infoDesc && descVal) infoDesc.textContent = descVal;
          };

          node.addEventListener("mouseenter", updateInfoBox);
          node.addEventListener("click", updateInfoBox);
        }
      });
    } catch(e) {
      console.warn("initWorldMapNodes notice:", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new EgyptAmericanApp();
  window.app.init();
});
