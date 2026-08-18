(function () {
  "use strict";

  /* ==============================
     DARK MODE
     ============================== */

  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  setTheme(getPreferredTheme());

  themeToggle.addEventListener("click", function () {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });

  /* ==============================
     MOBILE HAMBURGER MENU
     ============================== */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    const isActive = navMenu.classList.toggle("navbar__links--active");
    hamburger.setAttribute("aria-expanded", isActive);
  });

  /* ==============================
     CLOSE MENU ON LINK CLICK
     ============================== */

  navMenu.querySelectorAll(".navbar__link").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("navbar__links--active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ==============================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  /* ==============================
     SCROLL REVEAL ANIMATIONS
     ============================== */

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach(function (section) {
    section.classList.add("reveal");
    observer.observe(section);
  });

  document
    .querySelectorAll(".skills__category, .portfolio__card, .education__card")
    .forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });

  /* ==============================
     NAVBAR BACKGROUND ON SCROLL
     ============================== */

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 50) {
      navbar.style.background =
        html.getAttribute("data-theme") === "dark"
          ? "rgba(10, 25, 47, 0.95)"
          : "rgba(248, 249, 250, 0.95)";
    } else {
      navbar.style.background =
        html.getAttribute("data-theme") === "dark"
          ? "rgba(10, 25, 47, 0.85)"
          : "rgba(248, 249, 250, 0.85)";
    }
  });

  /* ==============================
     MULTI-LANGUAGE
     ============================== */

  var translations = {
    en: {
      "page.title": "Ahmad Hasan Ali — Backend Developer",
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.skills": "Skills",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",
      "lang.toggle": "ID",
      "hero.greeting": "Hi, my name is",
      "hero.description":
        "Software engineer with 3+ years of experience in back-end development, specializing in PHP, Laravel, Go, and PostgreSQL. Passionate about building scalable APIs, designing robust database architectures, and crafting maintainable systems.",
      "hero.downloadCv": "Download CV",
      "hero.contactMe": "Contact Me",
      "about.title": "About Me",
      "about.p1":
        "Software engineer with approximately three years of professional and internship experience in web development, with a specialization in back-end development. Highly motivated to advance my career in the back-end space, leveraging skills gained from multiple professional courses and real-world projects.",
      "about.p2":
        "Experienced in designing PostgreSQL database architectures, building and managing cross-platform APIs (Android, iOS, Web) serving thousands of registered users, implementing zero-downtime deployment strategies, and strengthening server security through hardening and mitigation configurations.",
      "about.p3":
        "Outside of software, I run a small hydroponic lettuce farm since August 2025. This hands-on experience led me to build my own farm management system — bridging the gap between code and real-world agriculture. It also gives me a deeper understanding of the domain I'm coding for.",
      "about.location": "Location:",
      "about.phone": "Phone:",
      "about.email": "Email:",
      "about.availability": "Availability:",
      "about.availabilityVal": "Open to opportunities",
      "experience.title": "Experience",
      "experience.farmer.company": "Self-Employed — Sragen, Jawa Tengah",
      "experience.farmer.description":
        "Running a small hydroponic NFT (Nutrient Film Technique) lettuce farm. Managing daily operations including PPM/pH monitoring, nutrient mixing, planting cycles, and harvest scheduling. Built my own farm management system to digitize operational recording and tracking.",
      "experience.stevor.description":
        "Designed optimal PostgreSQL database architectures to support growing application needs. Built and managed cross-platform APIs (Android, iOS, Web) serving 1,000+ registered users with 100+ active users. Implemented zero-downtime deployment and strengthened server security through hardening and attack mitigation.",
      "experience.gmp.description":
        "Developed web-based sales and inventory management platform using PHP, Laravel, and MySQL to streamline partner operations. Collaborated in cross-functional teams with modular development approach, fully responsible for Super Admin module. Delivered core product on schedule while contributing to post-launch feature development.",
      "experience.uns.description":
        "Collaborated in a two-person development team to design and build a modern, high-performance company profile website for Sekolah Vokasi Universitas Sebelas Maret within a 5-month timeframe. Built multi-tenant CMS architecture using PHP (Laravel).",
      "education.title": "Education",
      "education.degree": "Associate Expert Degree, Informatics Engineering",
      "skills.title": "Skills & Technologies",
      "skills.expert": "Expert",
      "skills.intermediate": "Intermediate",
      "leetcode.title": "LeetCode",
      "leetcode.profileLink": "View profile",
      "leetcode.total": "Solved",
      "leetcode.easy": "Easy",
      "leetcode.medium": "Medium",
      "leetcode.hard": "Hard",
      "leetcode.streak": "day streak",
      "leetcode.activeDays": "active days",
      "portfolio.title": "Featured Projects",
      "portfolio.qurban.description":
        "Offline-First Qurban Fund Ledger System for Muhammadiyah Branches (PRM). Ledger-based fund management tracking seluruh perpindahan dana dari peserta hingga LAZIS dengan dukungan offline synchronization dan audit trail.",
      "portfolio.hydro.description":
        "Farm management system I built for my own hydroponic lettuce farm. Tracks daily PPM/pH readings, nutrient and pH Down usage, tank conditions, and planting cycles. Built with Laravel 12 + Livewire 3.",
      "portfolio.stevor.description":
        "Cargo delivery service platform serving Surabaya, surrounding areas, and Jakarta. Designed database architecture and developed RESTful APIs with documentation, contributed to business flow and deployment strategy with staging/production separation, server hardening, and zero-downtime deployment.",
      "contact.title": "Get In Touch",
      "contact.intro":
        "I'm currently open to new opportunities. Whether you have a project idea, a job offer, or just want to say hi — feel free to reach out!",
      "contact.name": "Name",
      "contact.namePlaceholder": "Your name",
      "contact.email": "Email",
      "contact.emailPlaceholder": "your@email.com",
      "contact.message": "Message",
      "contact.messagePlaceholder": "Your message...",
      "contact.send": "Send Message",
      "contact.connectTitle": "Let's Connect",
      "contact.connectText":
        "Feel free to reach out through any of these platforms:",
      "footer.copyright": "\u00a9 2026 Ahmad Hasan Ali.",
    },
    id: {
      "page.title": "Ahmad Hasan Ali — Backend Developer",
      "nav.about": "Tentang",
      "nav.experience": "Pengalaman",
      "nav.skills": "Keahlian",
      "nav.portfolio": "Portofolio",
      "nav.contact": "Kontak",
      "lang.toggle": "EN",
      "hero.greeting": "Hai, nama saya",
      "hero.description":
        "Rekayasa perangkat lunak dengan pengalaman 3+ tahun di pengembangan back-end, mengkhususkan diri dalam PHP, Laravel, Go, dan PostgreSQL. Bersemangat membangun API yang skalabel, merancang arsitektur database yang kokoh, dan menciptakan sistem yang mudah dipelihara.",
      "hero.downloadCv": "Unduh CV",
      "hero.contactMe": "Hubungi Saya",
      "about.title": "Tentang Saya",
      "about.p1":
        "Rekayasa perangkat lunak dengan sekitar tiga tahun pengalaman profesional dan magang di pengembangan web, dengan spesialisasi di pengembangan back-end. Sangat termotivasi untuk memajukan karir di bidang back-end, memanfaatkan keterampilan yang diperoleh dari berbagai kursus profesional dan proyek nyata.",
      "about.p2":
        "Berpengalaman dalam merancang arsitektur database PostgreSQL, membangun dan mengelola API lintas platform (Android, iOS, Web) yang melayani ribuan pengguna terdaftar, menerapkan strategi deployment tanpa downtime, dan memperkuat keamanan server melalui konfigurasi hardening dan mitigasi.",
      "about.p3":
        "Di luar perangkat lunak, saya menjalankan peternakan selada hidroponik sejak Agustus 2025. Pengalaman langsung ini mendorong saya untuk membangun sistem manajemen peternakan sendiri — menjembatani kesenjangan antara kode dan pertanian nyata. Ini juga memberi saya pemahaman yang lebih dalam tentang domain yang saya buat kodenya.",
      "about.location": "Lokasi:",
      "about.phone": "Telepon:",
      "about.email": "Email:",
      "about.availability": "Ketersediaan:",
      "about.availabilityVal": "Terbuka untuk peluang",
      "experience.title": "Pengalaman",
      "experience.farmer.company": "Wirausaha — Sragen, Jawa Tengah",
      "experience.farmer.description":
        "Menjalankan peternakan selada hidroponik NFT (Nutrient Film Technique) skala kecil. Mengelola operasi harian termasuk pemantauan PPM/pH, pencampuran nutrisi, siklus tanam, dan jadwal panen. Membangun sistem manajemen peternakan sendiri untuk mendigitalkan pencatatan dan pelacakan operasional.",
      "experience.stevor.description":
        "Merancang arsitektur database PostgreSQL yang optimal untuk mendukung kebutuhan aplikasi yang berkembang. Membangun dan mengelola API lintas platform (Android, iOS, Web) yang melayani 1.000+ pengguna terdaftar dengan 100+ pengguna aktif. Menerapkan deployment tanpa downtime dan memperkuat keamanan server melalui hardening dan mitigasi serangan.",
      "experience.gmp.description":
        "Mengembangkan platform penjualan dan manajemen inventaris berbasis web menggunakan PHP, Laravel, dan MySQL untuk menyederhanakan operasi mitra. Berkolaborasi dalam tim lintas fungsi dengan pendekatan pengembangan modular, bertanggung jawab penuh atas modul Super Admin. Menyelesaikan produk inti tepat waktu sambil berkontribusi pada pengembangan fitur pasca-peluncuran.",
      "experience.uns.description":
        "Berkolaborasi dalam tim pengembangan dua orang untuk merancang dan membangun website profil perusahaan yang modern dan berkinerja tinggi untuk Sekolah Vokasi Universitas Sebelas Maret dalam jangka waktu 5 bulan. Membangun arsitektur CMS multi-tenant menggunakan PHP (Laravel).",
      "education.title": "Pendidikan",
      "education.degree": "Ahli Madya, Teknik Informatika",
      "skills.title": "Keahlian & Teknologi",
      "skills.expert": "Ahli",
      "skills.intermediate": "Menengah",
      "leetcode.title": "LeetCode",
      "leetcode.profileLink": "Lihat profil",
      "leetcode.total": "Terselesaikan",
      "leetcode.easy": "Mudah",
      "leetcode.medium": "Sedang",
      "leetcode.hard": "Sulit",
      "leetcode.streak": "hari streak",
      "leetcode.activeDays": "hari aktif",
      "portfolio.title": "Proyek Unggulan",
      "portfolio.qurban.description":
        "Sistem Buku Besar Dana Qurban Offline-First untuk Cabang Muhammadiyah (PRM). Manajemen dana berbasis buku besar yang melacak seluruh perpindahan dana dari peserta hingga LAZIS dengan dukungan sinkronisasi offline dan audit trail.",
      "portfolio.hydro.description":
        "Sistem manajemen peternakan yang saya bangun untuk peternakan selada hidroponik saya sendiri. Melacak pembacaan PPM/pH harian, penggunaan nutrisi dan pH Down, kondisi tangki, dan siklus tanam. Dibangun dengan Laravel 12 + Livewire 3.",
      "portfolio.stevor.description":
        "Platform layanan pengiriman barang yang melayani Surabaya, sekitarnya, dan Jakarta. Merancang arsitektur database dan mengembangkan RESTful API beserta dokumentasinya, berkontribusi pada alur bisnis dan strategi deployment dengan pemisahan staging/production, hardening server, dan deployment tanpa downtime.",
      "contact.title": "Hubungi Saya",
      "contact.intro":
        "Saat ini saya terbuka untuk peluang baru. Apakah Anda memiliki ide proyek, tawaran pekerjaan, atau hanya ingin menyapa — jangan ragu untuk menghubungi!",
      "contact.name": "Nama",
      "contact.namePlaceholder": "Nama Anda",
      "contact.email": "Email",
      "contact.emailPlaceholder": "email@anda.com",
      "contact.message": "Pesan",
      "contact.messagePlaceholder": "Pesan Anda...",
      "contact.send": "Kirim Pesan",
      "contact.connectTitle": "Mari Terhubung",
      "contact.connectText":
        "Jangan ragu untuk menghubungi melalui platform berikut:",
      "footer.copyright": "\u00a9 2026 Ahmad Hasan Ali.",
    },
  };

  var langToggle = document.getElementById("lang-toggle");
  var currentLang = localStorage.getItem("lang") || "id";
  var lastLeetCodeData = null;

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    var t = translations[lang];
    var els = document.querySelectorAll("[data-i18n]");

    els.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    var placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (t[key]) {
        el.setAttribute("placeholder", t[key]);
      }
    });

    html.setAttribute("lang", lang);
    if (lastLeetCodeData) renderLeetCodeMeta();
  }

  setLang(currentLang);

  langToggle.addEventListener("click", function () {
    setLang(currentLang === "id" ? "en" : "id");
  });

  /* ==============================
     PORTFOLIO — DATA DRIVEN
     ============================== */

  var githubSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';

  var demoSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

  function renderPortfolio() {
    fetch("data/projects.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (projects) {
        var grid = document.getElementById("portfolio__grid");
        if (!grid) return;
        grid.innerHTML = "";

        projects.forEach(function (p) {
          var tagsHtml = "";
          p.tags.forEach(function (t) {
            tagsHtml += '<span class="tag">' + t + "</span>";
          });

          var card = document.createElement("article");
          card.className = "portfolio__card";
          card.innerHTML =
            '<div class="portfolio__image">' +
            '<img src="' +
            p.image +
            '" alt="' +
            p.title +
            '" class="portfolio__image-img">' +
            "</div>" +
            '<div class="portfolio__body">' +
            '<h3 class="portfolio__title">' +
            p.title +
            "</h3>" +
            '<p class="portfolio__description" data-i18n="' +
            p.descriptionKey +
            '"></p>' +
            '<div class="portfolio__tags">' +
            tagsHtml +
            "</div>" +
            (p.showGithub !== false || p.showDemo !== false
              ? '<div class="portfolio__links">' +
              (p.showGithub !== false
                ? '<a target="_blank" rel="noopener noreferrer"  href="' +
                p.githubUrl +
                '" class="portfolio__link" aria-label="View on GitHub">' +
                githubSvg +
                "</a>"
                : "") +
              (p.showDemo !== false
                ? '<a target="_blank" rel="noopener noreferrer" href="' +
                p.demoUrl +
                '" class="portfolio__link" aria-label="View live demo">' +
                demoSvg +
                "</a>"
                : "") +
              "</div>"
              : "") +
            "</div>";

          grid.appendChild(card);
          card.classList.add("reveal");
          observer.observe(card);
        });

        setLang(currentLang);
      });
  }

  renderPortfolio();

  /* ==============================
     LEETCODE — DATA DRIVEN (fail-closed)
     ============================== */

  function isValidLeetcode(data) {
    if (!data || typeof data !== "object") return false;
    var s = data.solved;
    if (!s || typeof s !== "object") return false;
    var keys = ["all", "easy", "medium", "hard"];
    for (var i = 0; i < keys.length; i++) {
      if (typeof s[keys[i]] !== "number" || !isFinite(s[keys[i]])) return false;
    }
    return true;
  }

  function leetcodeStreakText(streak) {
    return streak > 0 ? streak + " " + translations[currentLang]["leetcode.streak"] : "";
  }

  function renderLeetCode() {
    var section = document.getElementById("leetcode");
    if (!section) return;

    fetch("data/leetcode.json")
      .then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!isValidLeetcode(data) || typeof data.username !== "string") throw new Error("invalid schema");

        document.getElementById("leetcode-username").textContent = data.username;
        var link = document.getElementById("leetcode-profile-link");
        link.href = "https://leetcode.com/u/" + data.username + "/";

        document.getElementById("leetcode-total").textContent = data.solved.all;
        document.getElementById("leetcode-easy").textContent = data.solved.easy;
        document.getElementById("leetcode-medium").textContent = data.solved.medium;
        document.getElementById("leetcode-hard").textContent = data.solved.hard;

        renderHeatmap(document.getElementById("leetcode-heatmap"), data.calendar);

        lastLeetCodeData = data;
        renderLeetCodeMeta();
        setLang(currentLang);
      })
      .catch(function () {
        section.classList.add("is-hidden");
      });
  }

  function renderLeetCodeMeta() {
    if (!lastLeetCodeData) return;
    var meta = document.getElementById("leetcode-meta");
    var texts = [];
    if (lastLeetCodeData.streak > 0)
      texts.push(leetcodeStreakText(lastLeetCodeData.streak));
    if (lastLeetCodeData.totalActiveDays > 0)
      texts.push(
        lastLeetCodeData.totalActiveDays + " " + translations[currentLang]["leetcode.activeDays"]
      );
    var fetched = document.createElement("span");
    fetched.className = "leetcode__updated";
    fetched.textContent = texts.length ? texts.join(" \u00b7 ") : "";
    meta.innerHTML = "";
    meta.appendChild(fetched);
  }

  function renderHeatmap(container, calendar) {
    if (!container) return;
    container.innerHTML = "";
    var map = calendar || {};
    var dayMs = 86400000;
    var now = new Date();
    var end = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    var start = end - 364 * dayMs;
    var counts = [];
    for (var d = 0; d < 365; d++) counts.push(0);
    for (var key in map) {
      if (!map.hasOwnProperty(key)) continue;
      var parts = key.split("-");
      if (parts.length !== 3) continue;
      var t = Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      var idx = (t - start) / dayMs;
      if (idx >= 0 && idx < 365) counts[idx] = map[key];
    }
    var max = 1;
    for (var i2 = 0; i2 < counts.length; i2++) if (counts[i2] > max) max = counts[i2];
    var grid = document.createElement("div");
    grid.className = "leetcode__heatmap-grid";
    for (var i3 = 0; i3 < counts.length; i3++) {
      var v = counts[i3];
      var level = v === 0 ? 0 : Math.min(4, Math.ceil((v / max) * 4));
      var cell = document.createElement("span");
      cell.className = "leetcode__day leetcode__day--l" + level;
      cell.setAttribute("aria-hidden", "true");
      var iso = new Date(start + i3 * dayMs).toISOString().slice(0, 10);
      cell.title = iso;
      if (v > 0) cell.title = v + " \u00b7 " + iso;
      grid.appendChild(cell);
    }
    container.appendChild(grid);
  }

  renderLeetCode();
})();
