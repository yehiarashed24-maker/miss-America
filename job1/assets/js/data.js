/**
 * ============================================================================
 * EGYPT AMERICA CENTER - MOHAMMED HAMMOUDA (SINCE 1990)
 * Master Data Store & Configuration Catalog
 * ============================================================================
 * 
 * 📌 EASY EDITING QUICK INDEX (دليل التعديل السريع):
 * ----------------------------------------------------------------------------
 *  SECTION 1: COMPANY INFORMATION (معلومات الشركة والاتصال) -------- Line ~25
 *  SECTION 2: BRAND AGENCIES & PARTNERS (الوكالات والشركاء) --------- Line ~45
 *  SECTION 3: PRODUCTS & MACHINERY CATALOG (كتالوج المنتجات) ------- Line ~180
 *  SECTION 4: WEBSITE TRANSLATIONS (i18n) (نصوص الترجمة) --------- Line ~700
 * ============================================================================
 */

window.EGYPT_AMERICAN_DATA = {

  /* ==========================================================================
   * SECTION 1: COMPANY INFORMATION (معلومات الشركة والاتصال)
   * ========================================================================== */
  company: {
    name: "Egypt America Center - Mohammed Hammouda",
    nameAr: "مركز مصر أمريكا - محمد حمودة",
    tagline: "Imp./Exp. & Commercial Agencies • للاستيراد والتصدير والوكالات التجارية (منذ 1990)",
    logo: "assets/images/logo.png",
    established: 1990,
    headquarters: "Masaken El Shennawy, Next to Al Tawhid Mosque, Building 2, Entrance A, Mansoura, Egypt",
    hotline: "+20 10 01339300",
    whatsapp: "+20 10 01339300",
    email: "info@egypt-american.com"
  },

  /* ==========================================================================
   * SECTION 2: BRAND AGENCIES & PARTNERS (الوكالات التجارية والشركاء الدوليين)
   * ========================================================================== */
  brands: [
    {
      id: "rel-tex",
      name: "REL-TEX",
      subName: "Circular Knitting Machines",
      country: "Taiwan",
      flag: "🇹🇼",
      badge: "Official Agency",
      logo: "assets/images/partners/rel-tex.svg",
      tagline: "High-Speed Circular Knitting Machines & Automation",
      description: "REL-TEX delivers innovative circular knitting machines, electronic yarn feeders, and high-tensile accessories.",
      overview: "REL-TEX specializes in single and double jersey circular knitting machinery trusted globally.",
      productsCount: 24,
      catalogFile: "REL_TEX_Machinery_Catalog.pdf",
      featuredProducts: ["REL-TEX High Speed Circular Knitting", "REL-TEX MPF 201 Yarn Feeder"]
    },
    {
      id: "golden-roc",
      name: "GOLDEN ROC",
      subName: "Knitting Needles & Spares",
      country: "China",
      flag: "🇨🇳",
      badge: "Official Needle Agency",
      logo: "assets/images/partners/golden-roc.svg",
      tagline: "Precision Industrial Knitting Needles & Sinkers",
      description: "GOLDEN ROC produces high-durability needles, sinkers, and selectors for circular and flat knitting machines.",
      overview: "GOLDEN ROC is recognized globally for micron-precision alloy steel needles engineered for zero thread breakage.",
      productsCount: 45,
      catalogFile: "Golden_Roc_Needles_Catalog.pdf",
      featuredProducts: ["Golden Roc Circular Knitting Needles", "Precision Latch Needles & Sinkers"]
    },
    {
      id: "nbsmg",
      name: "SMG / NBSMG",
      subName: "Circular Knitting Parts",
      country: "China",
      flag: "🇨🇳",
      badge: "Authorized Agency",
      logo: "assets/images/partners/smg.svg",
      tagline: "Precision Circular Knitting Parts & Bearings",
      description: "NBSMG / SMG delivers chrome steel ball bearings, cylinders, needle beds, and drive parts for circular machinery.",
      overview: "SMG components undergo 100% laser inspection for quiet operation and long service life under high RPM.",
      productsCount: 65,
      catalogFile: "SMG_Circular_Parts_Catalog.pdf",
      featuredProducts: ["SMG High-Speed Cam Follower", "Precision Spindle Ball Bearing"]
    },
    {
      id: "kauo-heng",
      name: "KAUO HENG",
      subName: "Flat Knitting Machines",
      country: "Taiwan",
      flag: "🇹🇼",
      badge: "Official Agency",
      logo: "assets/images/partners/kauo-heng.svg",
      tagline: "Computerized Flat Knitting Machinery Leaders",
      description: "Kauo Heng Precision Machinery is Taiwan's premier builder of computerized flat knitting machines.",
      overview: "Kauo Heng flat knitting systems feature multi-gauge tech and 3D shoe upper knitting capability.",
      productsCount: 18,
      catalogFile: "Kauo_Heng_Flat_Knitting.pdf",
      featuredProducts: ["Kauo Heng ADF-530 Flat Knitting", "Kauo Heng 3D Shoe Upper Machine"]
    },
    {
      id: "dahu",
      name: "DAHU",
      subName: "Crochet Machinery",
      country: "Taiwan",
      flag: "🇹🇼",
      badge: "Authorized Partner",
      logo: "assets/images/partners/dahu.svg",
      tagline: "High-Speed Automatic Crochet Machines",
      description: "DAHU manufactures high-speed computerized crochet machines for laces, elastic bands, and technical trimmings.",
      overview: "DAHU is Taiwan's leading brand for high-efficiency crochet knitting and narrow fabric weaving equipment.",
      productsCount: 16,
      catalogFile: "DAHU_Crochet_Machine_Catalog.pdf",
      featuredProducts: ["DAHU High Speed Crochet Machine", "DAHU Elastic Tape Weaving System"]
    },
    {
      id: "v-star",
      name: "V-STAR",
      subName: "Machinery Industry",
      country: "Taiwan",
      flag: "🇹🇼",
      badge: "Authorized Agency",
      logo: "assets/images/partners/v-star.svg",
      tagline: "Industrial Textile Machinery & Components",
      description: "V-STAR delivers high-performance textile finishing and automated processing machinery.",
      overview: "V-STAR machinery combines durable structural steel with precision Japanese electronic controls.",
      productsCount: 20,
      catalogFile: "V_Star_Textile_Machinery.pdf",
      featuredProducts: ["V-Star Fabric Inspection Machine", "V-Star Automatic Winder"]
    },
    {
      id: "baiyang",
      name: "BAIYANG",
      subName: "Machinery Industry",
      country: "China",
      flag: "🇨🇳",
      badge: "Official Agency",
      logo: "assets/images/partners/baiyang.svg",
      tagline: "Heavy-Duty Circular Knitting Machinery",
      description: "BAIYANG specializes in double jersey jacquard circular knitting machinery and large-diameter frames.",
      overview: "BAIYANG machines produce flawless fleece, interlock, and rib knit fabrics at high RPM.",
      productsCount: 15,
      catalogFile: "Baiyang_Machinery_Catalog.pdf",
      featuredProducts: ["Baiyang Double Jersey Jacquard", "Baiyang Single Jersey High-Speed"]
    },
    {
      id: "king-ultrasonic",
      name: "KING ULTRASONIC",
      subName: "Ultrasonic Systems",
      country: "Taiwan",
      flag: "🇹🇼",
      badge: "Official Agency",
      logo: "assets/images/partners/king-ultrasonic.svg",
      tagline: "Ultrasonic Textile Cutting & Slitting Machinery",
      description: "KING ULTRASONIC is the innovator in ultrasonic fabric cutting, slitting, and non-woven welding machinery.",
      overview: "KING ULTRASONIC provides clean, burr-free ultrasonic edge sealing for technical textiles and synthetic fabrics.",
      productsCount: 12,
      catalogFile: "King_Ultrasonic_Textile_Catalog.pdf",
      featuredProducts: ["King Ultrasonic Fabric Cutter", "King Ultrasonic Edge Sealer"]
    },
    {
      id: "center-circle",
      name: "CENTER CIRCLE",
      subName: "Knitting Machinery",
      country: "Taiwan",
      flag: "🇹🇼",
      badge: "Official Agency",
      logo: "assets/images/partners/center-circle.png",
      tagline: "High-Precision Circular Knitting Machinery & Cylinders",
      description: "Center Circle is a world-renowned manufacturer of circular knitting machines and precision cylinders.",
      overview: "Established in Taiwan, Center Circle is famous for micron-level precision manufacturing.",
      productsCount: 14,
      catalogFile: "Center_Circle_Catalog.pdf",
      featuredProducts: ["CC-3.2 Single Jersey Machine", "Center Circle Alloy Cylinder"]
    },
    {
      id: "megadyne",
      name: "MEGADYNE",
      subName: "Industrial Belts",
      country: "Italy",
      flag: "🇮🇹",
      badge: "Authorized Agency",
      logo: "assets/images/partners/megadyne.png",
      tagline: "World-Class Polyurethane & Rubber Timing Belts",
      description: "Megadyne Group (Italy) is the global leader in polyurethane and rubber timing belts.",
      overview: "Megadyne manufactures top-tier endless polyurethane timing belts for industrial textile machinery.",
      productsCount: 85,
      catalogFile: "Megadyne_Textile_Belts.pdf",
      featuredProducts: ["Megadyne Megapower Timing Belt", "Megadyne Seamless AT10 Belt"]
    },
    {
      id: "muller",
      name: "MULLER",
      subName: "Textile Systems",
      country: "Germany",
      flag: "🇩🇪",
      badge: "Authorized Agency",
      logo: "assets/images/partners/muller.svg",
      tagline: "Advanced Textile Machinery & Factory Systems",
      description: "Muller delivers dependable textile machinery systems and production support for modern mills.",
      overview: "Muller completes Egypt America Center's international partner lineup with premium European textile engineering.",
      productsCount: 10,
      catalogFile: "Muller_Textile_Systems.pdf",
      featuredProducts: ["Muller Textile Production System", "Muller Precision Factory Solution"]
    }
  ],

  /* ==========================================================================
   * SECTION 3: PRODUCTS & MACHINERY CATALOG (كتالوج المنتجات وقطع الغيار)
   * ========================================================================== */
  products: [
    {
          "id": "prod-rel-double-jersey-1",
          "name": "Double Jersey/Interlock/Rib Circular Knitting Machine",
          "category": "Machinery",
          "brandId": "rel-tex",
          "brandName": "REL-TEX",
          "country": "Taiwan",
          "flag": "🇹🇼",
          "image": "assets/images/reltex/prod3.png",
          "translations": {
                "ar": {
                      "country": "تايوان",
                      "name": "ماكينة تريكو دائرية دبل جيرسي/إنترلوك/ريب",
                      "shortDesc": "ماكينة تريكو دائرية عالية الأداء لإنتاج أقمشة الدبل جيرسي والإنترلوك والريب.",
                      "fullDesc": "تم تصميم هذه الماكينة الدائرية متعددة الاستخدامات لتحقيق جودة إنتاج استثنائية في أقمشة الدبل جيرسي والإنترلوك والريب. تتميز بالتحكم الدقيق في الإبر، والثبات الميكانيكي القوي، والتشغيل عالي السرعة، مما يجعلها مثالية لصناعة النسيج الحديثة."
                },
                "zh": {
                      "country": "台湾",
                      "name": "双面/互锁/罗纹大圆机",
                      "shortDesc": "高性能双面、互锁及罗纹大圆机。",
                      "fullDesc": "这款多功能大圆机专为生产高品质双面、互锁及罗纹面料而设计。它具有精确的织针控制、坚固的机械稳定性以及高速运转特性，是现代纺织制造的理想选择。"
                }
          },
          "shortDesc": "High-performance circular knitting machine for double jersey, interlock, and rib structures.",
          "fullDesc": "This versatile circular knitting machine is engineered for exceptional production quality in double jersey, interlock, and rib fabrics. It features precise needle control, robust mechanical stability, and high-speed operation, making it ideal for modern textile manufacturing.",
          "specs": {
                "Type": "Double Jersey Series"
          }
    },
    {
          "id": "prod-rel-double-jersey-2",
          "name": "High Density Pile Circular Knitting Machine",
          "category": "Machinery",
          "brandId": "rel-tex",
          "brandName": "REL-TEX",
          "country": "Taiwan",
          "flag": "🇹🇼",
          "image": "assets/images/reltex/prod4.png",
          "translations": {
                "ar": {
                      "country": "تايوان",
                      "name": "ماكينة تريكو دائرية لإنتاج الوبر عالي الكثافة",
                      "shortDesc": "ماكينة متطورة مصممة لإنتاج أقمشة الوبر الفاخرة عالية الكثافة.",
                      "fullDesc": "تم هندسة هذه الماكينة لإنتاج أقمشة وبرية فائقة الكثافة، مما يوفر نعومة وتناسقاً فائقين. تدمج تقنية المزامنة المتقدمة لضمان حلقات وبر خالية من العيوب، ومناسبة للملابس الفاخرة والمنسوجات المنزلية والمنسوجات الصناعية المتخصصة."
                },
                "zh": {
                      "country": "台湾",
                      "name": "高密度毛圈大圆机",
                      "shortDesc": "专为生产优质高密度毛圈织物而设计的高级机器。",
                      "fullDesc": "该机器专为生产超高密度毛圈织物而设计，提供卓越的柔软度与一致性。集成先进的沉降片与织针同步技术，确保完美的毛圈，非常适合高档服装、家纺及特殊工业织物。"
                }
          },
          "shortDesc": "Advanced machine designed for producing premium high-density pile fabrics.",
          "fullDesc": "Engineered for the production of ultra-dense pile fabrics, this machine delivers superior plushness and consistency. It integrates advanced sinker and needle synchronization to ensure flawless pile loops, suitable for luxury apparel, home textiles, and specialized industrial fabrics.",
          "specs": {
                "Type": "Double Jersey Series"
          }
    },
    {
          "id": "prod-rel-double-jersey-3",
          "name": "Interlock Double Jersey Open Width Circular Knitting Machine",
          "category": "Machinery",
          "brandId": "rel-tex",
          "brandName": "REL-TEX",
          "country": "Taiwan",
          "flag": "🇹🇼",
          "image": "assets/images/reltex/prod1.png",
          "translations": {
                "ar": {
                      "country": "تايوان",
                      "name": "ماكينة تريكو دائرية إنترلوك دبل جيرسي (عرض مفتوح)",
                      "shortDesc": "ماكينة تريكو دائرية بعرض مفتوح محسنة لأقمشة الإنترلوك الخالية من التجاعيد.",
                      "fullDesc": "مصممة للتخلص من التجاعيد المركزية، تقوم هذه الماكينة (عرض مفتوح) بقطع ولف القماش فور حياكته. توفر تحكماً استثنائياً في شد القماش، مما يضمن كثافة غرز موحدة عبر العرض بالكامل، مثالية للأزياء الراقية والمواد الممزوجة بالسباندكس."
                },
                "zh": {
                      "country": "台湾",
                      "name": "互锁双面开幅大圆机",
                      "shortDesc": "专为无折痕互锁面料优化的开幅大圆机。",
                      "fullDesc": "为消除中心折痕而设计，这台开幅双面机在编织后立即切割并卷取织物。提供出色的织物张力控制，确保整个幅宽的线圈密度均匀，完美适用于高端时尚及氨纶混纺材料。"
                }
          },
          "shortDesc": "Open-width circular knitting machine optimized for crease-free interlock fabrics.",
          "fullDesc": "Designed to eliminate center creases, this open-width double jersey machine cuts and rolls the fabric instantly upon knitting. It provides exceptional fabric tension control, ensuring uniform stitch density across the entire width, perfect for high-end fashion and spandex-blended materials.",
          "specs": {
                "Type": "Double Jersey Series"
          }
    },
    {
          "id": "prod-rel-double-jersey-4",
          "name": "High Pile Circular Knitting Machine",
          "category": "Machinery",
          "brandId": "rel-tex",
          "brandName": "REL-TEX",
          "country": "Taiwan",
          "flag": "🇹🇼",
          "image": "assets/images/reltex/prod2.png",
          "translations": {
                "ar": {
                      "country": "تايوان",
                      "name": "ماكينة تريكو دائرية لإنتاج الوبر العالي",
                      "shortDesc": "ماكينة متخصصة في صناعة الأقمشة الوبرية العميقة والضخمة.",
                      "fullDesc": "تم تصميم هذه الماكينة خصيصاً للتعامل مع الألياف الصناعية الطويلة، لإنتاج أقمشة وبرية عميقة وناعمة (الفرو الصناعي). مزودة بأنظمة دقيقة لتغذية الألياف، تقلل من التساقط وتزيد من حجم القماش، مما يجعلها المعيار الصناعي للملابس الشتوية."
                },
                "zh": {
                      "country": "台湾",
                      "name": "长毛绒大圆机",
                      "shortDesc": "专业制造深厚丰满毛圈织物的大圆机。",
                      "fullDesc": "本机专为处理长合成纤维打造，可生产深厚、柔软的毛圈织物（人造毛皮）。配备精密纤维喂入系统，最大限度减少掉毛并提升织物丰满度，是冬装和长毛绒材料的行业标杆。"
                }
          },
          "shortDesc": "Specialized circular knitting machine for crafting deep and voluminous pile fabrics.",
          "fullDesc": "This machine is specifically built to handle long synthetic fibers, producing deep, soft, and voluminous pile fabrics (faux fur). Equipped with precision fiber-feeding systems, it minimizes shedding and maximizes fabric volume, making it the industry standard for winter wear and plush materials.",
          "specs": {
                "Type": "Double Jersey Series"
          }
    },
    {
          "id": "prod-rel-double-jersey-5",
          "name": "Velour Shearing Circular Knitting Machine",
          "category": "Machinery",
          "brandId": "rel-tex",
          "brandName": "REL-TEX",
          "country": "Taiwan",
          "flag": "🇹🇼",
          "image": "assets/images/reltex/prod5.png",
          "translations": {
                "ar": {
                      "country": "تايوان",
                      "name": "ماكينة تريكو دائرية لإنتاج القطيفة",
                      "shortDesc": "ماكينة حياكة دقيقة مصممة لإنتاج أقمشة القطيفة خالية من العيوب.",
                      "fullDesc": "مصممة لإنتاج أقمشة القطيفة عالية الجودة، تتميز هذه الماكينة بآليات تشكيل حلقات متخصصة تسمح بالقص المنتظم. يضمن تكوين الأسطوانة والقرص المستقر ارتفاعاً ثابتاً للحلقات، مما يؤدي إلى تشطيبات قطيفة ناعمة وفاخرة استثنائية."
                },
                "zh": {
                      "country": "台湾",
                      "name": "剪绒/天鹅绒大圆机",
                      "shortDesc": "专为完美天鹅绒和毛巾布生产而设计的精密大圆机。",
                      "fullDesc": "专为高品质天鹅绒织物量身定制，该机器采用特殊的成圈机构，便于均匀剪绒。其稳定的针筒与针盘配置确保毛圈高度一致，经过后期处理可产生异常光滑奢华的天鹅绒饰面。"
                }
          },
          "shortDesc": "Precision knitting machine designed for flawless velour and terry cloth production.",
          "fullDesc": "Tailored for high-quality velour and terry fabrics, this machine features specialized loop-forming mechanisms that allow for uniform shearing. Its stable cylinder and dial configuration ensures consistent loop height, resulting in exceptionally smooth and luxurious velour finishes after processing.",
          "specs": {
                "Type": "Double Jersey Series"
          }
    },
    {
          "id": "prod-nbsmg-part-1",
          "name": "TPF20-T11 Positive Yarn Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part1.png",
          "shortDesc": "High-precision positive yarn feeder designed for high-speed circular knitting machines.",
          "fullDesc": "The TPF20-T11 is an industrial-grade positive yarn feeder ensuring uniform yarn tension and smooth feeding, reducing thread breakage in high-speed circular knitting operations.",
          "specs": {
                "Model": "TPF20-T11",
                "Application": "Circular Knitting Machine",
                "Type": "Positive Yarn Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "جهاز تغذية الخيط التلقائي TPF20-T11",
                      "shortDesc": "جهاز تغذية خيط أوتوماتيكي عالي الدقة لماكينات التريكو الدائرية عالية السرعة.",
                      "fullDesc": "جهاز TPF20-T11 يضمن شد خيط منتظم وتغذية سلسة لتفادي انقطاع الخيط أثناء التشغيل عالي السرعة."
                },
                "zh": {
                      "country": "中国",
                      "name": "TPF20-T11 正向送纱器",
                      "shortDesc": "专为高速大圆机设计的高精度正向送纱器。",
                      "fullDesc": "TPF20-T11 是工业级正向送纱器，确保纱线张力均匀，送纱顺畅，有效减少高速编织中的断纱现象。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-2",
          "name": "CPF20-T21S Storage Yarn Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part2.png",
          "shortDesc": "Advanced storage yarn feeder with automatic sensor for smooth tension control.",
          "fullDesc": "Designed for complex knitting patterns, the CPF20-T21S provides precise yarn accumulation and tension stabilization for uninterrupted production.",
          "specs": {
                "Model": "CPF20-T21S",
                "Application": "Circular Knitting Machine",
                "Type": "Storage Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي خيط تخزيني CPF20-T21S",
                      "shortDesc": "مغذي خيط تخزيني متطور مع مستشعر أوتوماتيكي للتحكم بالشد.",
                      "fullDesc": "تم تصميمه لنقشات التريكو المعقدة حيث يحافظ على استقرار شد الخيط وتجميعه بدقة لضمان إنتاج بدون توقف."
                },
                "zh": {
                      "country": "中国",
                      "name": "CPF20-T21S 储纱器",
                      "shortDesc": "带自动传感器的先进储纱器，精确控制纱线张力。",
                      "fullDesc": "专为复杂编织花型设计，CPF20-T21S 可实现精准的纱线积累和张力稳定，保障无间断生产。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-3",
          "name": "SER20-TD Electronic Feeder System",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part3.png",
          "shortDesc": "Electronic yarn feeder unit with heavy-duty mounting bracket.",
          "fullDesc": "The SER20-TD features electronic response sensors and a durable frame to maintain optimal yarn delivery across all cylinder speeds.",
          "specs": {
                "Model": "SER20-TD",
                "Application": "Circular Knitting Machine",
                "Type": "Electronic Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "نظام المغذي الإلكتروني SER20-TD",
                      "shortDesc": "وحدة تغذية خيط إلكترونية مزودة بحامل تثبيت قوي للخدمة الشاقة.",
                      "fullDesc": "يتميز SER20-TD بمستشعرات استجابة إلكترونية وهيكل متين للحفاظ على إمداد الخيط المثالي عبر جميع السرعات."
                },
                "zh": {
                      "country": "中国",
                      "name": "SER20-TD 电子送纱系统",
                      "shortDesc": "配备重型安装支架的电子送纱单元。",
                      "fullDesc": "SER20-TD 具备电子响应传感器和耐用机架，可在所有针筒转速下保持最佳送纱状态。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-4",
          "name": "SER20-TE Electronic Yarn Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part4.png",
          "shortDesc": "Compact electronic feeder for ultra-fine gauge knitting machines.",
          "fullDesc": "Specially engineered for delicate yarns, the SER20-TE offers micro-adjustment controls and ultra-low friction guidance.",
          "specs": {
                "Model": "SER20-TE",
                "Application": "Fine Gauge Knitting Machine",
                "Type": "Electronic Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي خيط إلكتروني SER20-TE",
                      "shortDesc": "مغذي إلكتروني مدمج لماكينات التريكو دقيقة النمرة.",
                      "fullDesc": "مصمم خصيصاً للخيوط الدقيقة، يوفر SER20-TE أدوات تحكم دقيقة وتوجيه خيط منخفض الاحتكاك للغاية."
                },
                "zh": {
                      "country": "中国",
                      "name": "SER20-TE 电子送纱器",
                      "shortDesc": "适用于超细针距大圆机的紧凑型电子送纱器。",
                      "fullDesc": "专为精细纱线打造，SER20-TE 提供微调控制和极低摩擦的导纱体验。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-5",
          "name": "SER20-T5 (DAG) Multi-Feeder Bar",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part5.png",
          "shortDesc": "Multi-feeder bar system with DAG anti-static ceramic guides.",
          "fullDesc": "The SER20-T5 (DAG) assembly houses multiple feeder points on a single reinforced bar, incorporating ceramic anti-wear guides for synthetic yarns.",
          "specs": {
                "Model": "SER20-T5 (DAG)",
                "Application": "Circular Knitting Machine",
                "Type": "Multi-Feeder Bar"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "قضيب تغذية متعدد SER20-T5 (DAG)",
                      "shortDesc": "نظام قضيب تغذية متعدد مع موجهات سيراميك مقاومة للاستاتيكية.",
                      "fullDesc": "تجمع وحدة SER20-T5 (DAG) نقاط تغذية متعددة على قضيب مقوى واحد مع أدلة سيراميكية مانعة للتآكل."
                },
                "zh": {
                      "country": "中国",
                      "name": "SER20-T5 (DAG) 多孔送纱架",
                      "shortDesc": "带 DAG 防静电陶瓷导纱器的多孔送纱架系统。",
                      "fullDesc": "SER20-T5 (DAG) 组件在单个强化支架上集成多个送纱点，配备防磨损陶瓷导纱件，适合合成纤维纱线。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-6",
          "name": "CPF20-T11 With Fixed Bracket",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part6.png",
          "shortDesc": "Storage feeder complete with rigid fixed mounting bracket.",
          "fullDesc": "Pre-assembled with an extended steel bracket, the CPF20-T11 offers vibration-resistant installation directly on circular machine rings.",
          "specs": {
                "Model": "CPF20-T11-FB",
                "Application": "Circular Knitting Machine",
                "Type": "Feeder with Bracket"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي CPF20-T11 مع حامل تثبيت صلب",
                      "shortDesc": "مغذي تخزيني مكتمل بحامل تثبيت فولاذي ممتد ومقاوم للاهتزاز.",
                      "fullDesc": "مجمع مسبقاً مع حامل فولاذي ممتد لتثبيت قوي ومقاوم للاهتزاز مباشرة على حلقة ماكينة التريكو الدائرية."
                },
                "zh": {
                      "country": "中国",
                      "name": "CPF20-T11 带固定支架送纱器",
                      "shortDesc": "配备刚性固定安装支架的完整储纱器。",
                      "fullDesc": "预装延伸钢支架，CPF20-T11 可直接在圆机大盘环上提供抗震稳定安装。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-7",
          "name": "CPFK20-T11 Jacquard Yarn Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part7.png",
          "shortDesc": "Specialized feeder unit for Jacquard and pattern circular machines.",
          "fullDesc": "Features fast dynamic tension adjustment for rapid color changes and Jacquard needle selection cycles.",
          "specs": {
                "Model": "CPFK20-T11",
                "Application": "Jacquard Circular Machine",
                "Type": "Jacquard Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي خيط الجاكار CPFK20-T11",
                      "shortDesc": "وحدة تغذية متخصصة لماكينات الجاكار والنقش الدائرية.",
                      "fullDesc": "تتميز بتعديل شد ديناميكي سريع لدعم التغيرات السريعة في الألوان ودورات اختيار إبر الجاكار."
                },
                "zh": {
                      "country": "中国",
                      "name": "CPFK20-T11 提花送纱器",
                      "shortDesc": "专用于提花和花型大圆机的特殊送纱单元。",
                      "fullDesc": "具备快速动态张力调节功能，专为快速换色及提花选针循环而优化。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-8",
          "name": "SER5-T5 Feeder Assembly",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part8.png",
          "shortDesc": "5-position feeder assembly for specialized elastomeric yarns.",
          "fullDesc": "Designed to handle spandex and elastomeric yarns without tension spikes or excessive friction.",
          "specs": {
                "Model": "SER5-T5",
                "Application": "Elastomeric Knitting",
                "Type": "Feeder Assembly"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مجموعة تغذية الخيط SER5-T5",
                      "shortDesc": "تجميعة تغذية خيط ذات 5 مواضع مخصصة لخيوط الإيلاستين والسباندكس.",
                      "fullDesc": "مصممة للتعامل مع خيوط السباندكس والمرنة بدون ارتفاع مفاجئ في الشد أو احتكاك زائد."
                },
                "zh": {
                      "country": "中国",
                      "name": "SER5-T5 送纱器组件",
                      "shortDesc": "适用于特殊弹性纱线的 5 位送纱器组件。",
                      "fullDesc": "专为处理氨纶和弹性纱线设计，防止张力突变和过度摩擦。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-9",
          "name": "SER3-T5 Compact Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part9.png",
          "shortDesc": "3-position compact yarn feeder for tight space installations.",
          "fullDesc": "The SER3-T5 is a space-saving feeder ideal for high-density feeder placement on specialized circular knitting rings.",
          "specs": {
                "Model": "SER3-T5",
                "Application": "Circular Knitting Machine",
                "Type": "Compact Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي خيط مدمج SER3-T5",
                      "shortDesc": "مغذي خيط مدمج 3 مواضع للتركيب في المساحات الضيقة.",
                      "fullDesc": "وحدة SER3-T5 توفر المساحة وهي مثالية لتوزيع المغذيات بكثافة عالية على حلقات ماكينات التريكو."
                },
                "zh": {
                      "country": "中国",
                      "name": "SER3-T5 紧凑型送纱器",
                      "shortDesc": "适合狭小空间安装的 3 位紧凑型送纱器。",
                      "fullDesc": "SER3-T5 节省空间，非常适合在大圆机发纱环上进行高密度送纱器布置。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-10",
          "name": "CPF20-T8A Storage Yarn Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part10.png",
          "shortDesc": "Storage yarn feeder with automatic optical stop motion sensor.",
          "fullDesc": "Integrates a sensitive optical yarn break sensor to stop the machine instantly in case of thread depletion or knot obstruction.",
          "specs": {
                "Model": "CPF20-T8A",
                "Application": "Circular Knitting Machine",
                "Type": "Storage Feeder with Stop Motion"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي خيط تخزيني CPF20-T8A",
                      "shortDesc": "مغذي خيط تخزيني مزود بمستشعر إيقاف بصرية أوتوماتيكي.",
                      "fullDesc": "دمج مستشعر انقطاع الخيط البصري الحساس لإيقاف الماكينة فوراً عند نفاد الخيط أو انسداد العقد."
                },
                "zh": {
                      "country": "中国",
                      "name": "CPF20-T8A 储纱器",
                      "shortDesc": "集成自动光电自停传感器的储纱器。",
                      "fullDesc": "集成敏锐的光电断纱传感器，在纱线耗尽或结头卡阻时立即停机保护。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-11",
          "name": "CPF20-T8 Standard Storage Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part11.png",
          "shortDesc": "Industry-standard reliable storage yarn feeder unit.",
          "fullDesc": "Proven global bestseller offering high durability, low power consumption, and consistent yarn spooling.",
          "specs": {
                "Model": "CPF20-T8",
                "Application": "Standard Circular Knitting",
                "Type": "Storage Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي خيط تخزيني قياسي CPF20-T8",
                      "shortDesc": "وحدة تغذية خيط تخزينية قياسية موثوقة وعالية التحمل.",
                      "fullDesc": "المنتج الأكثر مبيعاً عالمياً يقدم متانة عالية، واستهلاكاً منخفضاً للطاقة، ولف خيط منتظم."
                },
                "zh": {
                      "country": "中国",
                      "name": "CPF20-T8 标准储纱器",
                      "shortDesc": "符合行业标准的可靠储纱器单元。",
                      "fullDesc": "经受市场检验的畅销型号，具备高耐用性、低功耗及持续稳定的卷纱性能。"
                }
          }
    },
    {
          "id": "prod-nbsmg-part-12",
          "name": "CPF20-T11 Precision Storage Feeder",
          "category": "Spare Parts",
          "brandId": "nbsmg",
          "brandName": "SMG / NBSMG",
          "country": "China",
          "flag": "🇨🇳",
          "image": "assets/images/nbsmg/part12.png",
          "shortDesc": "Precision storage yarn feeder for high-speed continuous knitting.",
          "fullDesc": "The CPF20-T11 delivers smooth yarn winding with active friction control, ideal for cotton, polyester, and blended yarns.",
          "specs": {
                "Model": "CPF20-T11",
                "Application": "High-Speed Circular Machine",
                "Type": "Storage Feeder"
          },
          "translations": {
                "ar": {
                      "country": "الصين",
                      "name": "مغذي خيط تخزيني دقيق CPF20-T11",
                      "shortDesc": "مغذي خيط تخزيني دقيق للتريكو المستمر عالي السرعة.",
                      "fullDesc": "يوفر CPF20-T11 لف خيط سلس مع تحكم نشط بالاحتكاك، مثالي للقطن والبوليستر والخيوط المخلوطة."
                },
                "zh": {
                      "country": "中国",
                      "name": "CPF20-T11 精密储纱器",
                      "shortDesc": "适用于高速连续编织的精密储纱器。",
                      "fullDesc": "CPF20-T11 提供出色的顺滑卷纱与主动摩擦控制，是棉、涤及混纺纱线的理想选择。"
                }
          }
    }
  ],

  /* ==========================================================================
   * SECTION 4: WEBSITE TRANSLATIONS (نصوص ومجموعات الترجمة للعربية والإنجليزية والصينية)
   * ========================================================================== */
  translations: {
    en: {
      nav: { brand: "Egypt America Center", sub: "Mohammed Hammouda", home: "Home", about: "About Us", products: "Products", brands: "Brands & Partners", events: "Events & Exhibitions", contact: "Contact Us", request_quote: "Request Quote" },
      events: {
        badge: "EXHIBITIONS & EVENTS",
        title: "International Exhibitions & Factory Events",
        subtitle: "Explore Egypt America Center's participation in global textile trade fairs, live machine demonstrations, and client factory inaugurations.",
        btn_all: "EXPLORE ALL EVENTS & EXHIBITIONS",
        page_title: "Events, Fairs & Video Gallery",
        page_subtitle: "Welcome to the official Egypt America Center events portal. Browse photo galleries, watch high-definition machine video demos, and explore our global exhibition history.",
        item1_tag: "PHOTO GALLERY",
        item1_date: "October 2025 • Milan Exhibition Centre",
        item1_title: "ITMA Global Textile Machinery Fair",
        item1_desc: "Photo coverage from EAC's official pavilion showcasing REL-TEX circular & Kauo Heng flat machinery.",
        item2_tag: "VIDEO DEMO",
        item2_date: "Live Demo • Mansoura Showroom",
        item2_title: "Kauo Heng 3D Flat Knitting Machine Demo",
        item2_desc: "High-definition video demonstration of 3D shoe upper and automated sweater knitting speed.",
        item3_tag: "EXHIBITION BOOTH",
        item3_date: "March 2025 • CICC Cairo",
        item3_title: "Cairo Fashion & Tex Expo Pavilion",
        item3_desc: "Egypt America Center pavilion showcasing Megadyne drive belts, Golden Roc needles, and spare parts.",
        item4_tag: "FACTORY VIDEO",
        item4_date: "Client Inauguration • El Mahalla El Kubra",
        item4_title: "Turnkey Factory Line Inauguration",
        item4_desc: "Video highlights of complete circular knitting line installation, alignment, and staff training by EAC engineers."
      },
      new_hero: {
        eyebrow: "POWERING TEXTILE ENGINEERING",
        title_line1: "ENGINEERING",
        title_line2: "EXCELLENCE",
        title_line3: "SINCE 1990",
        desc: "Egypt's leading supplier of textile machinery, complete factory solutions, and original spare parts. We deliver comprehensive support for uninterrupted production.",
        btn_explore: "EXPLORE MACHINERY",
        btn_brands: "DISCOVER BRANDS",
        stat_years: "YEARS OF EXPERIENCE",
        stat_partners: "GLOBAL PARTNERS",
        stat_machines: "MACHINES DELIVERED",
        stat_countries: "COUNTRIES SERVED",
        spy_welcome: "WELCOME",
        spy_machinery: "MACHINERY",
        spy_brands: "BRANDS",
        spy_partners: "PARTNERS",
        spy_contact: "CONTACT",
        agencies_title: "OUR OFFICIAL AUTHORIZED INTERNATIONAL AGENCIES"
      },
      cap_1_title: "30+ Years Experience",
      cap_1_desc: "Pioneering textile machinery imports and manufacturing solutions in Egypt since 1990.",
      cap_2_title: "Premium Global Brands",
      cap_2_desc: "Exclusive agent for world-leading brands like Rel-Tex, Golden Roc, Shima Seiki, and more.",
      cap_3_title: "24/7 Technical Support",
      cap_3_desc: "Uninterrupted production with our dedicated maintenance team and genuine spare parts.",
      universe: {
        title: "THE TEXTILE UNIVERSE",
        sub_partners: "11 GLOBAL PARTNERS",
        sub_trusted: "ONE TRUSTED PARTNER",
        desc: "From circular knitting to finishing and spare parts. Experience our complete range of machinery tailored for the highest global production standards.",
        btn_explore: "EXPLORE ALL BRANDS",
        stat1: "35+ Years of Excellence",
        stat2: "11 GLOBAL BRANDS",
        stat3: "COMPLETE SOLUTIONS",
        stat4: "ORIGINAL QUALITY",
        stat5: "GLOBAL SUPPORT"
      },
      hero: { badge: "Egypt America Center - Mohammed Hammouda • Since 1990", title_1: "EGYPT AMERICA CENTER", title_2: "MOHAMMED HAMMOUDA", description: "Imp./Exp. & Commercial Agencies - Leading distributor & agency for high-speed circular knitting machines, flat knitting, timing belts, and precision bearings.", cta_machinery: "Explore Machinery", cta_parts: "Browse Spare Parts" },
      stats: { years: "Years Excellence (Since 1990)", countries: "Export Countries", brands: "Official Agencies", parts: "Spare Parts In Stock", oem: "Genuine OEM Parts" },
      intro: { badge: "Company Background", title: "Empowering Industrial Manufacturing", subtitle: "Egypt America Center - Mohammed Hammouda represents world-class engineering from Taiwan, Italy, and international machinery leaders.", card1_title: "Certified OEM Quality", card1_desc: "100% authentic spare parts direct from official brand manufacturers.", card2_title: "24/7 Global Logistics", card2_desc: "Express worldwide dispatch for critical textile factory spares.", card3_title: "Turnkey Installation", card3_desc: "Expert engineering team for machine calibration and staff training." },
      partners: { badge: "Official Distribution Agencies", title: "World-Class Brand Partners", subtitle: "We are proud to be the exclusive authorized distributor for leading international manufacturers.", marquee_title: "✧ OUR WORLD-CLASS INTERNATIONAL AGENCIES ✧" },
      products: { badge: "Machinery & Components Catalog", title: "High-Performance Textile Solutions", subtitle: "Discover our comprehensive range of high-efficiency machinery and original spare parts.", cat_all: "All Products", cat_machinery: "Machinery", cat_spare_parts: "Spare Parts", search_placeholder: "Search by name, model or OEM code...", view_details: "View Specifications", inquire_now: "Inquire" },
      why: { badge: "Engineering Advantage", title: "Why Factories Trust Egypt America Center", reason1_title: "Unmatched Precision", reason1_desc: "Micron-level accuracy cylinders and high-durability needles.", reason2_title: "Comprehensive Inventory", reason2_desc: "Over 15,000 active spare part references ready for immediate shipping.", reason3_title: "Direct OEM Warranty", reason3_desc: "Full manufacturer backing and genuine factory certified replacement parts.", reason4_title: "Dedicated Technical Support", reason4_desc: "On-site and remote engineering support tailored to your plant operating needs." },
      about: { badge: "Our Heritage & Leadership", title: "About Egypt America Center - Mohammed Hammouda", subtitle: "Bridging international engineering excellence with global textile production since 1990.", story_title: "Our Journey & Heritage", story_text: "Egypt America Center - Mohammed Hammouda was established in 1990 to bring international industrial standards and premier machinery brands to global markets.", vision_title: "Our Vision", vision_text: "To pioneer smart, eco-efficient textile machinery distribution with zero-downtime logistics support worldwide.", mission_title: "Our Mission", mission_text: "Delivering genuine, high-precision industrial solutions that maximize machinery longevity and output efficiency.", gallery_title: "Facilities & Warehouse Gallery" },
      cta: { title: "Ready to Upgrade Your Textile Manufacturing Facility?", desc: "Consult with our international engineers today for custom machine configurations or express spare parts dispatch.", btn: "Contact Sales Team", whatsapp: "WhatsApp Direct" },
      network: { badge: "Global Supply & Agency Network", title: "Global Agency Network <span style=\"color: #D32F2F;\">• Egypt Middle East Hub</span>", desc: "Our authorized international commercial agencies from Taiwan, Italy, China, and Germany connect directly to our headquarters in Mansoura, Egypt, delivering express logistics and genuine OEM spare parts.", pin_hq: "🇪🇬 Headquarters (Egypt)", pin_taiwan: "🇹🇼 Taiwan (Center Circle)", pin_italy: "🇮🇹 Italy (Megadyne Belts)", pin_china: "🇨🇳 China (NBSMG & SMG)", pin_germany: "🇩🇪 Germany (German Spares)", pin_japan: "🇯🇵 Japan (Industrial Electronics)", info_title: "Egypt America Center - Mansoura, Egypt (Headquarters)", info_desc: "Direct supply chain and technical support hub for textile machinery and genuine spare parts across Egypt and the Middle East.", nodes: { egypt: { title: "Egypt America Center - Mansoura, Egypt (Headquarters)", desc: "Direct supply chain and technical support hub for textile machinery and genuine spare parts across Egypt and the Middle East." }, china: { title: "China Agency Network (NBSMG & SMG)", desc: "NBSMG & SMG Agencies (China) - Official manufacturer for precision bearings and electronic yarn storage feeders for textile machinery." }, taiwan: { title: "Taiwan Agency Network (Center Circle & Kauo Heng)", desc: "Center Circle & Kauo Heng Agencies (Taiwan) - Authorized manufacturer of high-speed circular knitting machines and computerized flat knitting systems." }, italy: { title: "Italy Agency Network (Megadyne Belts)", desc: "Megadyne Agency (Italy) - Authorized distributor for premium polyurethane and rubber industrial timing belts." }, germany: { title: "German Technology Network (German Spares)", desc: "German Technology Partnerships - Micron-precision textile needles, sinkers, and heavy-duty alloy components." }, japan: { title: "Japan Technology Network (Industrial Electronics)", desc: "Japan Technology Systems - Certified industrial inverters and digital control panels for textile machinery." } } },
      brands_page: { badge: "Official Authorized Represented Brands", title: "Our International Agencies", subtitle: "Click any partner brand to explore specialized machinery catalogs, technical resources, and dedicated sales teams.", view_brand: "View Brand Portal", explore_products: "Explore Brand Products", download_catalog: "Download Catalog PDF" },
      contact: { badge: "Get In Touch", title: "Contact Sales & Support", subtitle: "Have a machinery inquiry or urgent spare parts requirement? Speak with our multi-lingual specialists.", address_title: "Headquarters Address", address_val: "Masaken El Shennawy, Next to Al Tawhid Mosque, Building 2, Entrance A, Mansoura, Egypt", phone_title: "Phone & Hotline", phone_val: "+20 10 01339300", whatsapp_title: "Instant WhatsApp Support", whatsapp_val: "+20 10 01339300", email_title: "Official Email", email_val: "info@egypt-american.com", hours_title: "Business Hours", hours_val: "Mon - Sat: 08:00 - 18:00 (UTC+2)", form_name: "Full Name", form_company: "Company Name", form_phone: "Phone Number", form_email: "Corporate Email Address", form_product: "Product Needed / Inquiry Type", form_message: "Detailed Message / Specifications", form_submit: "Send Official Inquiry", success_msg: "Thank you! Your inquiry has been logged and sent to Egypt America Center sales team." },
      brands_dictionary: { countries: { "Taiwan": "Taiwan", "China": "China", "Italy": "Italy" }, badges: { "Official Agency": "Official Agency", "Authorized Agency": "Authorized Agency", "Authorized Partner": "Authorized Partner", "Official Needle Agency": "Official Needle Agency" }, references: "References" },
      ai: { title: "Egypt America Center AI Assistant", status: "Online • Industrial Specialist", placeholder: "Ask about machinery specs, timing belts, brands, or shipping...", welcome: "Welcome! I am the Egypt America Center - Mohammed Hammouda Intelligent AI Assistant. How can I assist you with textile machinery, Megadyne belts, Kauo Heng flat knitting, or spare parts today?", chip1: "Textile Machinery ⚙️", chip2: "Megadyne Belts 🧵", chip3: "Contact Us 📞" },
      theme: { label: "Theme Mode", dark: "🌙 Dark", light: "☀️ Light" },
      footer: { tagline: "Egypt America Center - Mohammed Hammouda • Imp./Exp. & Commercial Agencies (Since 1990).", quick_links: "Quick Navigation", brand_agencies: "Brand Agencies", contact_info: "Global Support", copyright: "© 2026 Egypt America Center - Mohammed Hammouda. All Rights Reserved." },
      admin: { title: "Product Management Portal", login_subtitle: "Secure Client Login with 2-Factor Authentication (2FA)", step1: "Step 1: Admin Passcode", pass_placeholder: "Enter Passcode", step1_btn: "Proceed to 2FA 🔑", step2: "Step 2: Authorized Mobile Number (2FA)", step2_btn: "Verify Identity & Access Portal 🔐", hub_title: "Product Control Hub | Admin Portal", hub_subtitle: "Manage, edit, and publish live machinery and spare parts in seconds", logout: "Logout 🚪", stat_total: "Total Products", stat_machinery: "Machinery", stat_parts: "Spare Parts", stat_sec: "Security Status (2FA)", sec_active: "Active & Secured", add_title: "➕ Add New Product to Catalog", name_ar: "Arabic Title 🇪🇬", name_en: "English Title 🇺🇸", name_zh: "Chinese Title 🇨🇳", category: "Category", cat_mach: "Machinery", cat_parts: "Spare Parts", brand: "Brand Agency", code: "Model OEM Code", file_upload: "🖼️ Direct File Upload from Device", url_upload: "Or Direct Image URL", desc_ar: "Arabic Description 🇪🇬", desc_en: "English Description 🇺🇸", save_btn: "Save & Publish Product Live 🚀", current_prods: "📋 Currently Published Products", edit_prod: "Edit ✏️", del_prod: "Delete 🗑️" }
    },
    ar: {
      nav: { brand: "مركز مصر أمريكا", sub: "محمد حمودة", home: "الرئيسية", about: "من نحن", products: "المنتجات", brands: "الوكالات والشركاء", events: "الفعاليات والمعارض", contact: "اتصل بنا", request_quote: "طلب عرض سعر" },
      events: {
        badge: "المعارض والفعاليات",
        title: "المعارض الدولية والفعاليات الصناعية",
        subtitle: "استكشف مشاركات مركز مصر أمريكا في المعارض التجارية الدولية للنسيج، والعروض التوضيحية الحية للآلات، وافتتاحات مصانع العملاء.",
        btn_all: "استكشف جميع الفعاليات والمعارض",
        page_title: "معرض الفعاليات والصور والفيديوهات",
        page_subtitle: "مرحباً بكم في البوابة الرسمية لفعاليات ومعارض مركز مصر أمريكا. تصفح ألبومات الصور، شاهد فيديوهات تجربة الآلات عالية الدقة، واكتشف تاريخ مشاركاتنا الدولية.",
        item1_tag: "معرض الصور",
        item1_date: "أكتوبر 2025 • مركز ميلانو للمعارض",
        item1_title: "معرض ITMA الدولي لآلات النسيج",
        item1_desc: "تغطية مصورة لمشاركة مركز مصر أمريكا في المعرض الدولي لآلات التريكو الدائرية والفلات.",
        item2_tag: "فيديو حي",
        item2_date: "عرض حي • صالة عرض المنصورة",
        item2_title: "عرض حي لماكينات كاو هينغ 3D الفلات",
        item2_desc: "فيديو عالي الدقة يوضح سرعة وإنتاجية ماكينات التريكو المحوسبة وإنتاج الياقات والأحذية.",
        item3_tag: "جناح المعرض",
        item3_date: "مارس 2025 • مركز القاهرة الدولي للمؤتمرات",
        item3_title: "معرض كايرو فاشون آند تكس الدولي",
        item3_desc: "جناح مركز مصر أمريكا لاستعراض سيور Megadyne وإبر Golden Roc وقطع الغيار الأصلية.",
        item4_tag: "فيديو تشغيل مصنع",
        item4_date: "افتتاح مصنع • المحلة الكبرى",
        item4_title: "افتتاح خط إنتاج كامل لآلات التريكو",
        item4_desc: "تغطية فيديو لتجهيز وتشغيل مصنع تريكو دائرية بالكامل تحت إشراف مهندسي مصر أمريكا."
      },
      new_hero: {
        eyebrow: "تمكين هندسة النسيج",
        title_line1: "التميز",
        title_line2: "الهندسي",
        title_line3: "منذ 1990",
        desc: "المورد والوكيل المعتمد الأول في مصر لآلات النسيج، الحلول المصنعية المتكاملة، وقطع الغيار الأصلية لدعم الإنتاج دون توقف.",
        btn_explore: "استكشف الآلات",
        btn_brands: "اكتشف الوكالات",
        stat_years: "عاماً من الخبرة والتميز",
        stat_partners: "وكالة وشريك عالمي",
        stat_machines: "آلة ومعدّة مُسلّمة",
        stat_countries: "دولة للتصدير والخدمة",
        spy_welcome: "مرحباً بكم",
        spy_machinery: "الآلات",
        spy_brands: "الوكالات",
        spy_partners: "الشركاء",
        spy_contact: "اتصل بنا",
        agencies_title: "وكالاتنا التجارية الدولية المعتمدة"
      },
      cap_1_title: "خبرة أكثر من ٣٠ عاماً",
      cap_1_desc: "رواد في استيراد آلات النسيج وتوفير حلول التصنيع المتكاملة في مصر منذ عام ١٩٩٠.",
      cap_2_title: "علامات تجارية عالمية متميزة",
      cap_2_desc: "الوكيل المعتمد والحصري لأكبر العلامات التجارية مثل Rel-Tex و Golden Roc وغيرها.",
      cap_3_title: "دعم فني على مدار الساعة",
      cap_3_desc: "نضمن استمرارية إنتاجك بفضل فريق الصيانة المتخصص وقطع الغيار الأصلية المتاحة دائماً.",
      universe: {
        title: "عالم آلات النسيج",
        sub_partners: "11 وكالة وشريك عالمي",
        sub_trusted: "شريكك الموثوق الأوّل",
        desc: "من التريكو الدائري إلى التجهيز والسيور الفاخرة وقطع الغيار. اكتشف مجموعتنا الكاملة من الآلات المصممة لأعلى المعايير العالمية.",
        btn_explore: "استكشف جميع الوكالات",
        stat1: "أكثر من 35 عاماً من التميز",
        stat2: "11 وكالة عالمية معتمدة",
        stat3: "حلول صناعية متكاملة",
        stat4: "قطع غيار أصليّة 100%",
        stat5: "دعم فني ولوجستي شامل"
      },
      hero: { badge: "مركز مصر أمريكا - محمد حمودة • منذ 1990", title_1: "مركز مصر أمريكا", title_2: "محمد حمودة", description: "للاستيراد والتصدير والوكالات التجارية - المورد الدولي والوكيل المعتمد لآلات التريكو الدائرية عالية السرعة، وأنظمة التريكو المسطحة المحوسبة، وسيور التوقيت الفاخرة، والمحامل الصناعية الدقيقة.", cta_machinery: "استكشف الآلات", cta_parts: "تصفح قطع الغيار" },
      stats: { years: "عاماً من التميز (منذ 1990)", countries: "دولة للتصدير", brands: "وكالات عالمية رسمية", parts: "قطعة غيار متوفرة بالمخازن", oem: "قطع غيار أصليّة معتمدة" },
      intro: { badge: "نبذة عن الشركة", title: "تمكين صناعة النسيج بأعلى معايير الجودة العالمية", subtitle: "يمثل مركز مصر أمريكا - محمد حمودة أرقى الشركات المصنعة من تايوان وإيطاليا وقادة التكنولوجيا العالمية.", card1_title: "جودة أصيلة معتمدة", card1_desc: "قطع غيار أصليّة 100% مباشرة من المصانع العالمية المعتمدة.", card2_title: "شحن ولوجستيات 24/7", card2_desc: "شحن سريع عالمي لقطع الغيار الحساسة لضمان استمرار خطوط الإنتاج.", card3_title: "تركيب ومعايرة شاملة", card3_desc: "فريق هندسي متخصص لمعايرة الآلات وتدريب الكوادر الفنية." },
      partners: { badge: "وكالات التوزيع الرسمية", title: "شركاء العلامات التجارية العالمية", subtitle: "نفخر بكوننا الموزع المعتمد والحصري لأبرز المصنعين الدوليين.", marquee_title: "✧ وكالاتنا التجارية الدولية المعتمدة ✧" },
      products: { badge: "كتالوج الآلات والمكونات", title: "حلول النسيج عالية الأداء", subtitle: "اكتشف مجموعتنا الشاملة من الآلات عالية الكفاءة وقطع الغيار الأصلية.", cat_all: "جميع المنتجات", cat_machinery: "الآلات والمعدات", cat_spare_parts: "قطع الغيار", search_placeholder: "ابحث باسم المنتج، الموديل أو كود OEM...", view_details: "عرض المواصفات", inquire_now: "طلب استفسار" },
      why: { badge: "الميزة الهندسيّة", title: "لماذا تثق المصانع في مركز مصر أمريكا - محمد حمودة", reason1_title: "دقة متناهية متفوقة", reason1_desc: "أسطوانات دقيقة بمستوى الميكرون وإبر تريكو عالية التحمل.", reason2_title: "مخزون ضخم متكامل", reason2_desc: "أكثر من 15,000 كود قطعة غيار جاهزة للشحن الفوري.", reason3_title: "ضمان المصنع المباشر", reason3_desc: "دعم كامل من المصنع واستبدال بأجزاء معتمدة رسمياً.", reason4_title: "دعم فني متخصص", reason4_desc: "خدمات هندسية ميدانية وعن بُعد مصممة لمتطلبات تشغيل مصنعك." },
      about: { badge: "عراقتنا وريادتنا", title: "عن مركز مصر أمريكا - محمد حمودة", subtitle: "ربط التميز الهندسي الدولي بإنتاج النسيج والوكالات التجارية منذ عام 1990.", story_title: "مسيرتنا وعراقتنا", story_text: "تأسست شركة مركز مصر أمريكا - محمد حمودة عام 1990 لتقديم أرقى المعايير الهندسيّة واستيراد أفضل آلات النسيج والقطع الأصلية والوكالات التجارية.", vision_title: "رؤيتنا", vision_text: "الريادة في توزيع آلات النسيج الذكية والموفرة للطاقة مع دعم لوجستي يضمن صفر توقف للإنتاج عالمياً.", mission_title: "رسالتنا", mission_text: "تقديم حلول صناعية أصيلة عالية الدقة تزيد من العمر الافتراضي للآلات وكفاءة الإنتاج.", gallery_title: "معرض منشآتنا والمستودعات" },
      cta: { title: "هل أنت جاهز لتحديث وتطوير منشأتك الصناعية للنسيج؟", desc: "تواصل مع مهندسينا الدوليين اليوم للحصول على أحدث تكوينات الآلات أو شحن قطع الغيار الفوري.", btn: "تواصل مع فريق المبيعات", whatsapp: "واتساب مباشر" },
      network: { badge: "شبكة التوريد والوكالات العالمية", title: "شبكة الوكالات العالمية <span style=\"color: #D32F2F;\">• مصر مركز الشرق الأوسط</span>", desc: "تتصل وكالاتنا التجارية العالمية المعتمدة من تايوان وإيطاليا والصين وألمانيا بمركزنا الرئيسي في المنصورة، مصر لتوفير أسرع دعم لوجستي وقطع غيار أصلية.", pin_hq: "🇪🇬 المقر الرئيسي (مصر)", pin_taiwan: "🇹🇼 تايوان (Center Circle)", pin_italy: "🇮🇹 إيطاليا (Megadyne Belts)", pin_china: "🇨🇳 الصين (NBSMG & SMG)", pin_germany: "🇩🇪 ألمانيا (German Spares)", pin_japan: "🇯🇵 اليابان (Industrial Electronics)", info_title: "مركز مصر أمريكا - المنصورة، مصر (المقر الرئيسي)", info_desc: "شريان التوريد والدعم الفني المباشر لآلات النسيج وقطع الغيار الأصلية في مصر والشرق الأوسط.", nodes: { egypt: { title: "مركز مصر أمريكا - المنصورة، مصر (المقر الرئيسي)", desc: "شريان التوريد والدعم الفني المباشر لآلات النسيج وقطع الغيار الأصلية في مصر والشرق الأوسط." }, china: { title: "شبكة وكالات الصين (NBSMG & SMG)", desc: "وكالات NBSMG & SMG (الصين) - المصنع الرسمي للمحامل الدقيقة ومغذيات الخيوط الإلكترونية لآلات النسيج." }, taiwan: { title: "شبكة وكالات تايوان (Center Circle & Kauo Heng)", desc: "وكالات Center Circle & Kauo Heng (تايوان) - المصنع المعتمد لآلات التريكو الدائرية عالية السرعة وأنظمة التريكو المسطحة." }, italy: { title: "شبكة وكالة إيطاليا (Megadyne Belts)", desc: "وكالة Megadyne (إيطاليا) - الموزع المعتمد لسيور التوقيت البولي يوريثان والمطاط الصناعي الفاخر." }, germany: { title: "شبكة التكنولوجيا الألمانية (German Spares)", desc: "شراكات التكنولوجيا الألمانية - إبر وغرز النسيج عالية الدقة ومكونات السبائك فائقة التحمل." }, japan: { title: "شبكة التكنولوجيا اليابانية (Industrial Electronics)", desc: "أنظمة التكنولوجيا اليابانية - الإنفرترات الصناعية والشاشات الرقمية المعتمدة لآلات النسيج." } } },
      brands_page: { badge: "العلامات التجارية الممثلة رسمياً", title: "وكالاتنا الدولية", subtitle: "انقر على أي علامة تجارية لاستكشاف كتالوجات الآلات المتخصصة والموارد الفنية وفرق المبيعات.", view_brand: "عرض بوابة العلامة التجارية", explore_products: "استكشف منتجات العلامة", download_catalog: "تحميل الكتالوج PDF" },
      contact: { badge: "تواصل معنا", title: "تواصل مع فريق مركز مصر أمريكا - محمد حمودة", subtitle: "هل لديك استفسار عن آلة أو احتياج عاجل لقطع غيار؟ تحدث مع متخصصينا.", address_title: "عنوان المقر الرئيسي", address_val: "مساكن الشناوي بجانب مسجد التوحيد عمارة ٢ مدخل أ ، المنصورة، مصر", phone_title: "الهاتف والخط الساخن", phone_val: "+20 10 01339300", whatsapp_title: "دعم واتساب الفوري", whatsapp_val: "+20 10 01339300", email_title: "البريد الإلكتروني الرسمي", email_val: "info@egypt-american.com", hours_title: "ساعات العمل", hours_val: "الإثنين - السبت: 08:00 - 18:00 (توقيت القاهرة +2)", form_name: "الاسم الكامل", form_company: "اسم الشركة", form_phone: "رقم الهاتف", form_email: "البريد الإلكتروني للشركة", form_product: "المنتج المطلوب / نوع الاستفسار", form_message: "تفاصيل الرسالة / المواصفات", form_submit: "إرسال الاستفسار الرسمي", success_msg: "شكراً لك! تم تسجيل استفسارك وإرساله إلى فريق مبيعات مركز مصر أمريكا - محمد حمودة." },
      brands_dictionary: { countries: { "Taiwan": "تايوان", "China": "الصين", "Italy": "إيطاليا" }, badges: { "Official Agency": "الوكالة الرسمية", "Authorized Agency": "وكالة معتمدة", "Authorized Partner": "شريك معتمد", "Official Needle Agency": "الوكالة الرسمية للإبر" }, references: "منتج وموديل" },
      brands_info: {
        "rel-tex": { subName: "آلات التريكو الدائرية", tagline: "آلات تريكو دائرية عالية السرعة وأتمتة" },
        "golden-roc": { subName: "إبر تريكو وقطع غيار", tagline: "إبر تريكو وبلاتين صناعية دقيقة" },
        "nbsmg": { subName: "قطع غيار التريكو الدائرية", tagline: "قطع غيار ومحامل دقيقة لآلات التريكو" },
        "kauo-heng": { subName: "آلات التريكو المسطحة", tagline: "أنظمة التريكو المسطحة المحوسبة الرائدة" },
        "dahu": { subName: "آلات الكروشيه", tagline: "آلات كروشيه أوتوماتيكية عالية السرعة" },
        "v-star": { subName: "الآلات الصناعية", tagline: "آلات ومكونات النسيج الصناعية" },
        "baiyang": { subName: "الآلات الصناعية", tagline: "آلات التريكو الدائرية للخدمة الشاقة" },
        "king-ultrasonic": { subName: "أنظمة الموجات فوق الصوتية", tagline: "آلات قص ولحام النسيج بالموجات فوق الصوتية" },
        "center-circle": { subName: "آلات التريكو", tagline: "آلات تريكو دائرية وأسطوانات عالية الدقة" },
        "megadyne": { subName: "السيور الصناعية", tagline: "سيور توقيت صناعية من البولي يوريثان والمطاط" }
      },
      ai: { title: "مساعد مركز مصر أمريكا الذكي", status: "متصل • متخصص الصناعة والوكالات", placeholder: "اسأل عن مواصفات الآلات، سيور Megadyne، أو الشحن...", welcome: "مرحباً بك! أنا المساعد الذكي لمركز مصر أمريكا - محمد حمودة. كيف يمكنني مساعدتك اليوم بخصوص آلات النسيج، سيور Megadyne، آلات كاو هينغ أو قطع الغيار والوكالات؟", chip1: "آلات التريكو ⚙️", chip2: "سيور Megadyne 🧵", chip3: "اتصل بنا 📞" },
      theme: { label: "مظهر الموقع", dark: "🌙 داكن", light: "☀️ فاتح" },
      footer: { tagline: "مركز مصر أمريكا - محمد حمودة للاستيراد والتصدير والوكالات التجارية (منذ 1990).", quick_links: "روابط سريعة", brand_agencies: "الوكالات والعلامات التجارية", contact_info: "معلومات الاتصال", copyright: "© 2026 مركز مصر أمريكا - محمد حمودة. جميع الحقوق محفوظة." },
      admin: { title: "لوحة تحكم إدارة المنتجات", login_subtitle: "تسجيل الدخول الآمن بخاصية التحقق الثنائي (2FA)", step1: "الخطوة 1: كلمة السر", pass_placeholder: "أدخل كلمة السر", step1_btn: "المتابعة للتحقق الثنائي 🔑", step2: "الخطوة 2: رقم الموبايل المصرح به (2FA)", step2_btn: "تأكيد الهوية ودخول اللوحة 🔐", hub_title: "لوحة تحكم إدارة المنتجات | Admin Portal", hub_subtitle: "إدارة وحفظ وتعديل المنتجات الحية أوفلاين/أونلاين بثوان معدودة", logout: "تسجيل الخروج 🚪", stat_total: "إجمالي المنتجات", stat_machinery: "آلات ومعدات", stat_parts: "قطع غيار ومحامل", stat_sec: "حالة الأمان (2FA)", sec_active: "نشط وحصين", add_title: "➕ إضافة منتج جديد للكتالوج", name_ar: "اسم المنتج بالعربي 🇪🇬", name_en: "English Title 🇺🇸", name_zh: "中文名称 🇨🇳", category: "الفئة (Category)", cat_mach: "آلات ومعدات (Machinery)", cat_parts: "قطع غيار (Spare Parts)", brand: "الوكالة / الشركة (Brand)", code: "كود الموديل أو OEM Code", file_upload: "🖼️ ارفع صورة من جهازك مباشرة", url_upload: "أو ضع رابط صورة أونلاين", desc_ar: "الوصف بالعربي 🇪🇬", desc_en: "English Description 🇺🇸", save_btn: "حفظ ونشر المنتج فوراً 🚀", current_prods: "📋 المنتجات المعروضة حالياً", edit_prod: "تعديل ✏️", del_prod: "حذف 🗑️" }
    },
    zh: {
      nav: { brand: "Egypt America Center", sub: "Mohammed Hammouda", home: "首页", about: "关于我们", products: "产品中心", brands: "品牌代理", events: "展会动态", contact: "联系我们", request_quote: "索取报价" },
      events: {
        badge: "展会与活动",
        title: "国际展会与工厂活动",
        subtitle: "探索 Egypt America Center 参与的全球纺织机械展会、现场设备演示及客户工厂投产仪式。",
        btn_all: "浏览所有活动与展会",
        page_title: "活动、展会与视频画廊",
        page_subtitle: "欢迎访问 Egypt America Center 官方活动门户。浏览活动图集，观看高清机械演示视频，了解我们的全球展会历史。",
        item1_tag: "图片画廊",
        item1_date: "2025年10月 • 米兰国际展览中心",
        item1_title: "ITMA 全球纺织机械展",
        item1_desc: "EAC 官方展位现场实况，展示 REL-TEX 大圆机与 Kauo Heng 电脑横机。",
        item2_tag: "现场演示",
        item2_date: "现场演示 • 曼苏拉展厅",
        item2_title: "Kauo Heng 3D 电脑横机演示",
        item2_desc: "高清视频展示 3D 鞋面与自动化毛衫编织的高速高效性能。",
        item3_tag: "展会展位",
        item3_date: "2025年3月 • 开罗 CICC",
        item3_title: "开罗 Fashion & Tex 展会展位",
        item3_desc: "Egypt America Center 展位展示 Megadyne 传动带、Golden Roc 织针及原厂配件。",
        item4_tag: "工厂视频",
        item4_date: "客户投产仪式 • 埃尔马哈拉埃尔库布拉",
        item4_title: "整厂交钥匙生产线投产",
        item4_desc: "视频记录由 EAC 工程师完成的完整大圆机生产线安装、调试与人员培训。"
      },
      new_hero: {
        eyebrow: "赋能纺织工程",
        title_line1: "卓越工程",
        title_line2: "精益求精",
        title_line3: "始于 1990",
        desc: "埃及领先的纺织机械、整厂解决方案及原厂零配件供应商，为您提供全方位的持续生产保障。",
        btn_explore: "浏览纺织机械",
        btn_brands: "探索合作品牌",
        stat_years: "年行业卓越经验",
        stat_partners: "全球顶尖合作伙伴",
        stat_machines: "台已交付纺织机械",
        stat_countries: "服务国家/地区",
        spy_welcome: "欢迎",
        spy_machinery: "纺织机械",
        spy_brands: "品牌代理",
        spy_partners: "合作伙伴",
        spy_contact: "联系我们",
        agencies_title: "我们官方授权的国际商业代理品牌"
      },
      cap_1_title: "30多年经验",
      cap_1_desc: "自1990年以来，一直致力于埃及纺织机械进口和制造解决方案的先驱。",
      cap_2_title: "全球优质品牌",
      cap_2_desc: "Rel-Tex、Golden Roc等世界领先品牌的独家代理商。",
      cap_3_title: "24/7技术支持",
      cap_3_desc: "通过我们专业的维护团队和原装零配件，确保您的生产不间断。",
      universe: {
        title: "纺织机械宇宙",
        sub_partners: "11 全球合作伙伴",
        sub_trusted: "值得信赖的唯一伙伴",
        desc: "从大圆机、电脑横机到后整理设备与原厂备件，体验为全球最高生产标准定制的完整机械产品线。",
        btn_explore: "探索所有品牌",
        stat1: "35+ 年卓越历程",
        stat2: "11 全球授权品牌",
        stat3: "整厂解决方案",
        stat4: "100% 原厂品质",
        stat5: "全球技术支持"
      },
      hero: { badge: "埃及美洲中心 - 穆罕默德·哈مودة • 始于1990", title_1: "EGYPT AMERICA CENTER", title_2: "MOHAMMED HAMMOUDA", description: "进出口与商业代理 - 全球领先的高速大圆机、电脑横机系统、高品质同步带及工业精密轴承国际供应商。", cta_machinery: "浏览纺织机械", cta_parts: "查找零部件" },
      stats: { years: "年行业经验 (始于1990)", countries: "出口国家与地区", brands: "国际品牌代理", parts: "现货零配件库存", oem: "原装正品零配件" },
      intro: { badge: "企业概况", title: "赋能全球纺织制造与精密工程", subtitle: "Egypt America Center - Mohammed Hammouda 代表来自台湾、意大利及中国精工制造的顶尖纺织装备。", card1_title: "100% 原厂品质认证", card1_desc: "直接引自官方合作工厂的正品备件与设备。", card2_title: "24/7 全球物流响应", card2_desc: "关键零配件全球快速发货，保障工厂持续生产。", card3_title: "整机安装与调试", card3_desc: "资深工程师团队提供现场安装、技术培训与维护服务。" },
      partners: { badge: "官方授权代理", title: "全球知名合作品牌", subtitle: "我们荣幸成为国际领先纺织机械与工业零部件制造商的授权代理商。", marquee_title: "✧ 全球顶级授权合作机构 ✧" },
      products: { badge: "机械与零部件目录", title: "高性能纺织工业解决方案", subtitle: "探索我们全面涵盖的高效率纺织机械及原厂精密零配件系列。", cat_all: "全部产品", cat_machinery: "纺织机械", cat_spare_parts: "工业零部件", search_placeholder: "按产品名称、型号或OEM编号搜索...", view_details: "查看技术参数", inquire_now: "在线询价" },
      why: { badge: "技术与精工优势", title: "为什么工厂信任 Egypt America Center", reason1_title: "微米级精准度", reason1_desc: "微米级精密的针筒与高耐磨针织件。", reason2_title: "庞大的零部件现货", reason2_desc: "超过15,000种常用备件型号，即订即发。", reason3_title: "原厂官方质保", reason3_desc: "获得品牌原厂直接质保与正品零配件支持。", reason4_title: "专业工程技术支持", reason4_desc: "提供远程与现场技术指导，确保设备最大产能。" },
      about: { badge: "传统与领导力", title: "关于 Egypt America Center - Mohammed Hammouda", subtitle: "自1990年起致力于连接国际顶尖工程制造与全球纺织生产。", story_title: "我们的发展历程", story_text: "Egypt America Center 成立于1990年，致力于引入国际顶级纺织装备与配件品牌。", vision_title: "企业愿景", vision_text: "打造智能化、绿色高效的纺织机械分销网络，实现全球售后无缝对接。", mission_title: "企业使命", mission_text: "提供原装高精度的工业解决方案，延长设备寿命并提升生产效率。", gallery_title: "厂区与仓储风采" },
      cta: { title: "准备升级您的纺织制造工厂吗？", desc: "立即咨询我们的国际工程师，获取定制机械配置或急件发货。", btn: "联系销售团队", whatsapp: "WhatsApp 直连" },
      network: { badge: "全球代理与代销网络", title: "全球代理网络 <span style=\"color: #D32F2F;\">• 埃及中东枢纽</span>", desc: "我们来自台湾、意大利、中国和德国的授权代理直接连接至埃及曼苏拉总部，为您提供极速物流与原厂正品备件。", pin_hq: "🇪🇬 总部 (埃及)", pin_taiwan: "🇹🇼 台湾 (Center Circle)", pin_italy: "🇮🇹 意大利 (Megadyne Belts)", pin_china: "🇨🇳 中国 (NBSMG & SMG)", pin_germany: "🇩🇪 德国 (德国精工)", pin_japan: "🇯🇵 日本 (工业电子)", info_title: "Egypt America Center - 埃及曼苏拉 (总部)", info_desc: "涵盖埃及及整个中东地区的纺织机械与原厂正品零部件直供与技术支持枢纽。", nodes: { egypt: { title: "Egypt America Center - 埃及曼苏拉 (总部)", desc: "涵盖埃及及整个中东地区的纺织机械与原厂正品零部件直供与技术支持枢纽。" }, china: { title: "中国代理网络 (NBSMG & SMG)", desc: "NBSMG & SMG 代理 (中国) - 纺织机械精密轴承与电子储纬器官方制造商。" }, taiwan: { title: "台湾代理网络 (Center Circle & Kauo Heng)", desc: "Center Circle & Kauo Heng 代理 (台湾) - 授权高速大圆机与电脑横机系统制造商。" }, italy: { title: "意大利代理网络 (Megadyne 同步带)", desc: "Megadyne 代理 (意大利) - 高品质聚氨酯与橡胶工业同步带授权分销商。" }, germany: { title: "德国精工技术网络 (德国配件)", desc: "德国精工合作 - 微米级高精度织针、沉降片及高耐磨合金零部件。" }, japan: { title: "日本电子与自动化网络 (工业电子)", desc: "日本自动化系统 - 纺织机械专用工业变频器与数控面板。" } } },
      brands_page: { badge: "官方授权代理品牌", title: "国际合作代理商", subtitle: "点击任意品牌查看专用机械目录、技术文档及销售团队。", view_brand: "进入品牌专区", explore_products: "浏览品牌产品", download_catalog: "下载PDF手册" },
      contact: { badge: "联系我们", title: "联系销售与技术团队", subtitle: "需要设备询价或紧急备件？我们的多语种专家随时为您解答。", address_title: "总部地址", address_val: "埃及曼苏拉市，Al Tawhid 清真寺旁，El Shennawy 住宅区，2栋，A入口", phone_title: "电话与服务热线", phone_val: "+20 10 01339300", whatsapp_title: "WhatsApp 线上即时沟通", whatsapp_val: "+20 10 01339300", email_title: "官方邮箱", email_val: "info@egypt-american.com", hours_title: "工作时间", hours_val: "周一至周六: 08:00 - 18:00 (UTC+2)", form_name: "您的姓名", form_company: "公司名称", form_phone: "联系电话", form_email: "电子邮箱", form_product: "所需产品 / 咨询类型", form_message: "详细需求描述 / 规格参数", form_submit: "提交官方询价", success_msg: "感谢您的咨询！您的需求已成功记录并已转交 Egypt America Center 销售团队。" },
      brands_dictionary: { countries: { "Taiwan": "台湾", "China": "中国", "Italy": "意大利" }, badges: { "Official Agency": "官方代理", "Authorized Agency": "授权代理", "Authorized Partner": "授权合作伙伴", "Official Needle Agency": "官方织针代理" }, references: "相关产品" },
      brands_info: {
        "rel-tex": { subName: "大圆机", tagline: "高速大圆机与自动化设备" },
        "golden-roc": { subName: "织针与配件", tagline: "高精度工业织针与沉降片" },
        "nbsmg": { subName: "圆机配件", tagline: "精密圆机配件与轴承" },
        "kauo-heng": { subName: "电脑横机", tagline: "电脑横机系统领导品牌" },
        "dahu": { subName: "钩编机", tagline: "高速自动钩编机械" },
        "v-star": { subName: "工业机械", tagline: "工业纺织机械及组件" },
        "baiyang": { subName: "工业机械", tagline: "重型大圆机设备" },
        "king-ultrasonic": { subName: "超声波系统", tagline: "超声波纺织分切与焊接机械" },
        "center-circle": { subName: "针织机械", tagline: "高精度大圆机与针筒" },
        "megadyne": { subName: "工业皮带", tagline: "世界级聚氨酯与橡胶同步带" }
      },
      ai: { title: "Egypt America Center AI 智能助手", status: "在线 • 纺机工业专家", placeholder: "咨询设备参数、Megadyne同步带、品牌或运输...", welcome: "您好！我是 Egypt America Center - Mohammed Hammouda 智能助手。今天有什么可以为您效劳？您可以咨询大圆机、Megadyne同步带、高亨横机或零配件信息。", chip1: "纺织机械 ⚙️", chip2: "Megadyne 传动带 🧵", chip3: "联系我们 📞" },
      theme: { label: "主题模式", dark: "🌙 暗黑", light: "☀️ 明亮" },
      footer: { tagline: "Egypt America Center - Mohammed Hammouda • 授权工业纺织机械与零部件分销商 (始于1990)。", quick_links: "快速导航", brand_agencies: "代理品牌", contact_info: "联系方式", copyright: "© 2026 Egypt America Center - Mohammed Hammouda. 版权所有." },
      admin: { title: "产品管理控制台", login_subtitle: "双重身份验证 (2FA) 安全登录", step1: "第一步：管理密码", pass_placeholder: "请输入密码", step1_btn: "继续 2FA 验证 🔑", step2: "第二步：授权手机号码 (2FA)", step2_btn: "验证身份并进入控制台 🔐", hub_title: "产品管理控制中心 | Admin Portal", hub_subtitle: "实时管理、编辑并发布纺织机械及零配件目录", logout: "安全退出 🚪", stat_total: "产品总数", stat_machinery: "纺织机械", stat_parts: "零配件与轴承", stat_sec: "安全状态 (2FA)", sec_active: "已保护", add_title: "➕ 添加新产品到目录", name_ar: "阿拉伯语名称 🇪🇬", name_en: "英文名称 🇺🇸", name_zh: "中文名称 🇨🇳", category: "产品分类", cat_mach: "纺织机械", cat_parts: "工业零部件", brand: "代理品牌", code: "型号/OEM编号", file_upload: "🖼️ 从设备直接上传图片", url_upload: "或填写图片URL", desc_ar: "阿拉伯语描述 🇪🇬", desc_en: "英文描述 🇺🇸", save_btn: "立即保存并发布 🚀", current_prods: "📋 当前在线产品列表", edit_prod: "编辑 ✏️", del_prod: "删除 🗑️" }
    }
  },

  // Knowledge base for local AI Assistant responses
  aiKnowledgeBase: [
    {
      keywords: ["location", "address", "where", "map", "maps", "مكان", "مكانكم", "فين", "المنصورة", "عنوان", "عنوانكم", "الموقع", "موقعكم", "ازاي اوصل", "شارع", "مسجد", "مساكن", "التوحيد", "الشناوي", "地址", "位置"],
      response: {
        ar: "يقع مقر **مركز مصر أمريكا - محمد حمودة** في العنوان التالي:\n📍 **مساكن الشناوي، بجانب مسجد التوحيد، عمارة 2، مدخل أ، المنصورة، مصر.**\n\n🗺️ **رابط الموقع المباشر على Google Maps:**\nhttps://maps.app.goo.gl/nto3JL4cVCN65D776\n\n📱 **هاتف / واتساب المبيعات:** +201001339300\n✉️ **البريد الإلكتروني الرسمي:** info@egypt-american.com",
        en: "Egypt America Center - Mohammed Hammouda Headquarters is located at:\n📍 **Masaken El Shennawy, Next to Al Tawhid Mosque, Building 2, Entrance A, Mansoura, Egypt.**\n\n🗺️ **Google Maps Location Link:**\nhttps://maps.app.goo.gl/nto3JL4cVCN65D776\n\n📱 **Phone / WhatsApp:** +20 10 01339300\n✉️ **Official Email:** info@egypt-american.com",
        zh: "Egypt America Center - 穆罕默德·哈مودة 总部地址：\n📍 **埃及曼苏拉市，Al Tawhid 清真寺旁，El Shennawy 住宅区，2栋，A入口。**\n\n🗺️ **Google 地图导航：**\nhttps://maps.app.goo.gl/nto3JL4cVCN65D776\n\n📱 **电话 / WhatsApp：** +20 10 01339300\n✉️ **官方邮箱：** info@egypt-american.com"
      }
    },
    {
      keywords: ["egypt", "american", "america", "center", "hammouda", "hamouda", "hammoud", "مصر", "أمريكا", "حمودة", "محمد", "مركز", "شركة", "عن", "من هو", "تاريخ", "تأسس", "mohamed", "mohammed"],
      response: {
        ar: "تأسس **مركز مصر أمريكا - محمد حمودة** عام 1990 بمدينة المنصورة، ويترأسه **الأستاذ محمد حمودة**.\nنحن الوكيل التجاري والموزع المعتمد لأبرز العلامات التجارية العالمية في آلات النسيج وقطع الغيار الأصلية من تايوان وإيطاليا والصين (Center Circle, Megadyne, Kauo Heng, NBSMG, REL-TEX).\n\n📍 **المقر الرئيسي:** مساكن الشناوي، بجانب مسجد التوحيد، عمارة 2، مدخل أ، المنصورة، مصر.\n📞 **المبيعات والدعم:** +201001339300",
        en: "Established in 1990, **Egypt America Center - Mohammed Hammouda** is led by founder Mr. Mohammed Hammouda. We are the authorized global commercial agency for leading international textile machinery and spare parts manufacturers (Center Circle, Megadyne, Kauo Heng, NBSMG, REL-TEX).\n\n📍 **HQ Address:** Masaken El Shennawy, Next to Al Tawhid Mosque, Building 2, Entrance A, Mansoura, Egypt.\n📞 **Sales & Hotline:** +20 10 01339300",
        zh: "Egypt America Center 由创始人 Mohammed Hammouda 先生于 1990 年建立，是 Center Circle、Megadyne、Kauo Heng、NBSMG 和 REL-TEX 等知名品牌的官方授权代理商。"
      }
    },
    {
      keywords: ["brand", "brands", "distributor", "official", "agency", "وكيل", "وكالات", "علامة", "علامات", "شركاء", "品牌", "代理"],
      response: {
        ar: "نفخر في **مركز مصر أمريكا - محمد حمودة** بكوننا الوكيل المعتمد والموزع الرسمي للشركات العالمية التالية:\n\n1. 🇹🇼 **Center Circle (تايوان):** آلات التريكو الدائرية والأسطوانات عالية الدقة.\n2. 🇹🇼 **REL-TEX (تايوان):** آلات التريكو الدائرية عالية السرعة.\n3. 🇮🇹 **Megadyne (إيطاليا):** سيور التوقيت الصناعية الفاخرة (Polyurethane & Rubber Belts).\n4. 🇹🇼 **Kauo Heng (تايوان):** آلات التريكو المسطحة المحوسبة (Collar & 3D Shoe Upper Machines).\n5. 🇨🇳 **NBSMG (الصين):** المحامل الصناعية الدقيقة ورمان البلي (Precision Bearings).\n\n📞 للاستفسارات: +201001339300",
        en: "Egypt America Center - Mohammed Hammouda is the official authorized global commercial agency for:\n1. 🇹🇼 **Center Circle (Taiwan):** High-speed circular knitting machines & alloy cylinders.\n2. 🇹🇼 **REL-TEX (Taiwan):** High-speed circular knitting machinery.\n3. 🇮🇹 **Megadyne (Italy):** Polyurethane & rubber timing belts.\n4. 🇹🇼 **Kauo Heng (Taiwan):** Computerized flat knitting machine systems.\n5. 🇨🇳 **NBSMG (China):** Precision industrial bearings.\n\n📞 Inquiry Hotline: +20 10 01339300",
        zh: "我们是 Center Circle (台湾)、REL-TEX (台湾)、Megadyne (意大利)、Kauo Heng (台湾) 及 NBSMG (中国) 的官方授权分销与商业代理机构。"
      }
    },
    {
      keywords: ["megadyne", "belt", "timing belt", "conveyor", "سيور", "حزام", "ميغاداين", "ميجاداين", "سير", "同步带", "皮带"],
      response: {
        ar: "نوفر سيور توقيت صناعية أصليّة 100% من شركة **Megadyne الإيطالية** المصنعة من البولي يوريثان والمطاط (طرازات AT10, T10, RPP8, Megapower) المخصصة للتحمل العالي وتطبيقات آلات النسيج والتشغيل الصناعي.\n\n📞 اطلب العرض الفوري عبر الواتساب: +201001339300",
        en: "We supply 100% genuine Megadyne (Italy) timing belts, polyurethane Megapower belts, and rubber drive belts (AT10, T10, RPP8) engineered specifically for high-torque textile machinery.",
        zh: "我们提供 100% 原装意大利 Megadyne 工业同步带、聚氨酯 Megapower 带及高耐磨橡胶传动带。"
      }
    },
    {
      keywords: ["kauo heng", "flat knitting", "collar", "shoe upper", "تريكو مسطح", "كاو هينغ", "جاكار", "ياقات", "横机", "高亨"],
      response: {
        ar: "آلات التريكو المسطحة المحوسبة من **Kauo Heng (تايوان)** ممتازة في إنتاج الياقات النسيجية، الأقمشة المحبوكة، وأوجه الأحذية ثلاثية الأبعاد (3D Shoe Uppers) بأعلى دقة وسرعة تشغيلية.",
        en: "Kauo Heng (Taiwan) computerized flat knitting machines excel in high-speed sweater panel, collar trim, and 3D shoe upper production.",
        zh: "台湾高亨 (Kauo Heng) 电脑横机非常适合高速生产领口、毛衫面料及 3D 鞋面。"
      }
    },
    {
      keywords: ["center circle", "circular knitting", "cylinder", "تريكو دائرية", "سنتر سيركل", "سلندر", "أسطوانة", "大圆机", "针筒"],
      response: {
        ar: "تتميز **Center Circle (تايوان)** بإنتاج آلات التريكو الدائرية عالية السرعة، بالإضافة إلى الأسطوانات والسلندرات المصنوعة من السبايك عالية المتانة بمقاسات من 18G حتى 36G.",
        en: "Center Circle (Taiwan) offers premier high-speed circular knitting machines and precision alloy cylinders (18G to 36G gauges).",
        zh: "Center Circle (台湾) 专注于高速单双面大圆机及 18G-36G 精密针筒。"
      }
    },
    {
      keywords: ["nbsmg", "bearing", "bearings", "محامل", "رمان بلي", "رولمان", "轴承"],
      response: {
        ar: "نوفر محامل ورمان بلي دقيق (ABEC-5, Needle bearings, Cam followers) من شركة **NBSMG** المخصصة للسرعات العالية ومقاومة الإجهاد الصناعي في مصانع الغزل والنسيج.",
        en: "NBSMG supplies high-precision ABEC-5 ball bearings, needle bearings, cam followers, and linear guide blocks for high-RPM textile machine shafts.",
        zh: "NBSMG 提供用于高转速纺织机械的 ABEC-5 精密轴承、滚针轴承及凸轮随动件。"
      }
    },
    {
      keywords: ["shipping", "delivery", "logistics", "export", "شحن", "توصيل", "استيراد", "تصدير", "运输", "物流"],
      response: {
        ar: "نقدم خدمات الشحن الجوي والبحري السريع عالمياً، مع إمكانية التوصيل الفوري لقطع الغيار الحساسة خلال 24 ساعة من مستودعاتنا بالمنصورة لضمان عدم توقف خطوط الإنتاج.",
        en: "We offer express air freight and ocean container shipping worldwide. Critical spare parts are dispatched within 24 hours from our fulfillment hub.",
        zh: "我们提供全球航空与海运服务，关键零配件可在 24 小时内快速发货。"
      }
    },
    {
      keywords: ["contact", "quote", "sales", "phone", "email", "whatsapp", "اتصال", "تواصل", "سعر", "استفسار", "هاتف", "واتساب", "إيميل", "联系", "报价"],
      response: {
        ar: "يمكنك التواصل المباشر مع فريق مبيعات **مركز مصر أمريكا - محمد حمودة**:\n\n📱 **هاتف / واتساب:** +201001339300\n✉️ **بريد إلكتروني:** info@egypt-american.com\n📍 **العنوان:** مساكن الشناوي، بجانب مسجد التوحيد، عمارة 2، مدخل أ، المنصورة، مصر.",
        en: "You can reach Egypt-American sales team at:\n📱 **Phone / WhatsApp:** +20 10 01339300\n✉️ **Email:** info@egypt-american.com\n📍 **Address:** Masaken El Shennawy, Next to Al Tawhid Mosque, Building 2, Entrance A, Mansoura, Egypt.",
        zh: "欢迎联系 Egypt-American 销售团队：\n📱 **电话 / WhatsApp：** +20 10 01339300\n✉️ **邮箱：** info@egypt-american.com\n📍 **地址：** 埃及曼苏拉市 El Shennawy 住宅区 2栋 A入口"
      }
    }
  ]
};

if (typeof window !== "undefined") {
  window.EGYPT_AMERICAN_DATA = EGYPT_AMERICAN_DATA;
}
