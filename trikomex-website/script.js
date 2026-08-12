const WHATSAPP_NUMBER = "213556440795";
const WHATSAPP_DEFAULT_TEXT =
  "Bonjour TRIKOMEX, je souhaite obtenir des informations concernant une production textile personnalisée.";

const PRODUCTS = [
  {
    id: "bandes-col",
    image: "rubans1.png",
    images: ["rubans1.png", "rubans2.png", "rubans3.png"],
    href: "#contact",
    i18nKey: "bandes"
  },
  {
    id: "rubans",
    image: "bandes3.png",
    images: ["bandes1.png", "bandes2.png", "bandes3.png", "bandes4.png", "bandes5.png", "bandes6.png"],
    href: "#contact",
    i18nKey: "rubans"
  },
  {
    id: "echarpes",
    image: "echarpes1.png",
    images: ["echarpes1.png", "echarpes2.png", "echarpes3.png", "echarpes4.png", "echarpes5.png"],
    href: "#contact",
    i18nKey: "echarpes"
  },
  {
    id: "bonnets",
    image: "bonnet1.png",
    images: ["bonnet1.png", "bonnet2.png", "bonnet3.png", "bonnet4.png", "bonnet5.png", "bonnet6.png"],
    href: "#contact",
    i18nKey: "bonnets"
  },
  {
    id: "pulls",
    image: "kazak1.png",
    images: ["kazak1.png", "kazak2.png", "kazak3.png", "kazak4.png", "kazak5.png", "kazak6.png"],
    href: "#contact",
    i18nKey: "pulls"
  },
  {
    id: "chaussures",
    image: "ayakkabi1.png",
    images: ["ayakkabi1.png", "ayakkabi2.png", "ayakkabi3.png", "ayakkabi4.png", "ayakkabi5.png"],
    href: "#contact",
    i18nKey: "chaussures"
  },
  {
    id: "sur-mesure",
    image: "DesignSoftware.png",
    images: ["DesignSoftware.png", "bandes4.png", "echarpes2.png"],
    href: "custom-product.html",
    i18nKey: "custom"
  }
];

const GALLERY = [
  { src: "bandes3.png", alt: "Ruban textile" },
  { src: "bandes4.png", alt: "Ruban textile" },
  { src: "bandes5.png", alt: "Ruban textile" },
  { src: "bandes6.png", alt: "Ruban textile" },
  { src: "bonnet1.png", alt: "Bonnet" },
  { src: "bonnet2.png", alt: "Bonnet" },
  { src: "bonnet3.png", alt: "Bonnet" },
  { src: "bonnet4.png", alt: "Bonnet" },
  { src: "echarpes1.png", alt: "Écharpe" },
  { src: "echarpes2.png", alt: "Écharpe" },
  { src: "echarpes3.png", alt: "Écharpe" },
  { src: "echarpes4.png", alt: "Écharpe" },
  { src: "kazak1.png", alt: "Pull" },
  { src: "kazak2.png", alt: "Pull" },
  { src: "kazak3.png", alt: "Pull" },
  { src: "kazak4.png", alt: "Pull" },
  { src: "ayakkabi1.png", alt: "Tissu pour chaussure" },
  { src: "ayakkabi2.png", alt: "Tissu pour chaussure" },
  { src: "ayakkabi3.png", alt: "Tissu pour chaussure" },
  { src: "rubans1.png", alt: "Bande de col" },
  { src: "rubans2.png", alt: "Bande de col" },
  { src: "livraisonphoto.png", alt: "Livraison TRIKOMEX" }
];

const TRANSLATIONS = {
  fr: {
    dir: "ltr",
    "nav.home": "Accueil",
    "nav.products": "Produits",
    "nav.materials": "Matières",
    "nav.production": "Production",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.quote": "Demander un devis",
    "nav.custom": "Créer",
    "hero.title": "Fabrication textile sur mesure en Algérie",
    "hero.lead": "Atelier de fabrication textile en coton et polyester — bandes de col, rubans et solutions sur mesure.",
    "materials.title": "Nous produisons le tissu",
    "materials.subtitle": "TRIKOMEX fabrique vos textiles en coton et en polyester, selon vos couleurs et vos besoins techniques.",
    "materials.cotton.title": "Coton",
    "materials.cotton.text": "Souple, confortable et adapté aux pièces textiles quotidiennes. Idéal pour bandes, cols et accessoires.",
    "materials.poly.title": "Polyester",
    "materials.poly.text": "Résistant, stable en couleur et durable pour la production en série et les usages professionnels.",
    "materials.custom.title": "Sur mesure",
    "materials.custom.text": "Choisissez coton, polyester ou la combinaison adaptée à votre modèle, jauge et largeur.",
    "materials.mix.title": "Coton / Polyester",
    "hero.ctaProducts": "Découvrir nos produits",
    "hero.ctaQuote": "Créer mon produit",
    "config.title": "Créez votre produit TRIKOMEX",
    "config.subtitle": "Choisissez le type, la largeur, la jauge et la longueur. Les bandes se vendent au mètre.",
    "config.type": "Type de produit",
    "config.typeCol": "Bande de col / yaka",
    "config.typeBande": "Bande textile (au mètre)",
    "config.typePants": "Bande pour pantalon",
    "config.width": "Largeur (eni) — max. 6 cm",
    "config.gauge": "Jauge",
    "config.collarLength": "Longueur yaka",
    "config.meters": "Longueur (mètres)",
    "config.colors": "Couleurs",
    "config.material": "Matière",
    "config.qty": "Quantité",
    "config.note": "Notes / motif",
    "config.priceNote": "Prix au mètre: à confirmer avec TRIKOMEX",
    "config.submit": "Envoyer sur WhatsApp",
    "config.design": "Ouvrir l’atelier cm/mm",
    "config.rulesTitle": "Règles de fabrication",
    "config.rule1": "Largeur (eni) maximum: 6 cm",
    "config.rule2": "Jauge disponible: DDD-9 ou DDD-11",
    "config.rule3": "Yaka / col: longueurs 39 cm ou 42 cm",
    "config.rule4": "Bandes textiles: vente au mètre",
    "config.rule5": "Matières: coton, polyester ou mixte",
    "trust.1": "Coton & polyester",
    "trust.2": "Prototypes personnalisés",
    "trust.3": "Production en série",
    "trust.4": "Livraison rapide",
    "products.title": "Nos solutions textiles",
    "products.subtitle": "Des produits développés selon vos couleurs, dimensions et besoins de production.",
    "products.see": "Voir le produit",
    "products.quoteLink": "Demander un devis",
    "products.bandes.name": "Bandes de col",
    "products.bandes.desc": "Bandes de col adaptées à vos coloris, largeurs et volumes de production.",
    "products.rubans.name": "Rubans textiles",
    "products.rubans.desc": "Rubans textiles pour finitions, marquage et usages professionnels.",
    "products.echarpes.name": "Écharpes",
    "products.echarpes.desc": "Écharpes développées selon vos matières, motifs et dimensions.",
    "products.bonnets.name": "Bonnets",
    "products.bonnets.desc": "Bonnets et accessoires tricotés pour marques et professionnels.",
    "products.pulls.name": "Pulls",
    "products.pulls.desc": "Pulls et pièces maille conçus selon votre cahier des charges.",
    "products.chaussures.name": "Tissus pour chaussures",
    "products.chaussures.desc": "Tissus techniques destinés à la fabrication de chaussures.",
    "products.custom.name": "Produits textiles sur mesure",
    "products.custom.desc": "Développement complet selon vos couleurs, dimensions et exigences techniques.",
    "production.title": "De l’idée à la production",
    "production.subtitle": "Un atelier structuré pour transformer votre demande en production textile maîtrisée.",
    "process.1.title": "Analyse de votre demande",
    "process.1.desc": "Nous étudions votre besoin, votre usage et vos contraintes techniques.",
    "process.2.title": "Choix des couleurs et dimensions",
    "process.2.desc": "Vos références couleur et mesures sont définies avec précision.",
    "process.3.title": "Création du prototype",
    "process.3.desc": "Un échantillon peut être préparé pour valider le rendu final.",
    "process.4.title": "Validation du client",
    "process.4.desc": "Vous validez le prototype avant le lancement de la production.",
    "process.5.title": "Production en série",
    "process.5.desc": "Nous fabriquons vos articles avec une attention constante à la qualité.",
    "process.6.title": "Livraison",
    "process.6.desc": "Votre commande est préparée et expédiée dans les meilleurs délais.",
    "custom.title": "Votre modèle, notre savoir-faire",
    "custom.text": "Nous développons vos produits textiles selon vos couleurs, dimensions, motifs et exigences techniques. Un prototype peut être préparé avant le lancement de la production en série.",
    "custom.cta": "Parler de mon projet",
    "custom.design": "Créer un design",
    "about.title": "À propos",
    "about.text": "TRIKOMEX est un atelier de fabrication textile basé en Algérie, spécialisé dans le tissage étroit. Nous produisons nos tissus en coton et en polyester: bandes de col, rubans textiles, écharpes, bonnets, pulls et solutions personnalisées pour les professionnels. De la création du prototype à la production en série, nous accordons une attention particulière à la qualité, à la précision des couleurs et au respect des délais.",
    "about.v1": "Production de tissu en coton et polyester",
    "about.v2": "Précision des couleurs et des dimensions",
    "about.v3": "Accompagnement professionnel B2B",
    "collection.title": "TRIKOMEX Collection",
    "collection.subtitle": "Une sélection de nos créations et finitions textiles.",
    "contact.title": "Un projet textile à réaliser ?",
    "contact.subtitle": "Présentez-nous votre modèle, vos dimensions, vos couleurs, la matière (coton ou polyester) et la quantité souhaitée.",
    "contact.role1": "Gérant Associé",
    "contact.role2": "Gérante Associée",
    "contact.whatsapp": "Écrire sur WhatsApp",
    "form.note": "Votre demande est enregistrée dans notre base SQLite. Vous pourrez ensuite ouvrir WhatsApp pour un suivi rapide.",
    "form.name": "Nom / Entreprise",
    "form.phone": "Téléphone",
    "form.email": "E-mail",
    "form.product": "Type de produit",
    "form.productPlaceholder": "Sélectionner",
    "form.qty": "Quantité estimée",
    "form.dims": "Dimensions",
    "form.message": "Message",
    "form.file": "Fichier ou modèle (optionnel)",
    "form.fileHelp": "Image ou PDF (max 8 Mo). Le fichier est enregistré avec votre demande.",
    "form.submit": "Enregistrer la demande",
    "form.sending": "Enregistrement…",
    "form.success": "Demande enregistrée. Ouverture de WhatsApp…",
    "form.error": "Impossible d’enregistrer la demande. Vérifiez que le serveur SQL est démarré.",
    "form.serverMissing": "Serveur SQLite indisponible. Démarrez avec npm start, ou continuez via WhatsApp.",
    "footer.blurb": "Atelier de fabrication textile en Algérie — coton, polyester, tissage étroit et solutions sur mesure.",
    "footer.made": "Fabriqué en Algérie",
    "footer.menu": "Menu",
    "footer.products": "Produits",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés."
  },
  ar: {
    dir: "rtl",
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.materials": "المواد",
    "nav.production": "الإنتاج",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.quote": "طلب عرض سعر",
    "nav.custom": "إنشاء",
    "hero.title": "تصنيع منسوجات حسب الطلب في الجزائر",
    "hero.lead": "ورشة تصنيع منسوجات من القطن والبوليستر — أشرطة ياقات وأشرطة وحلول حسب الطلب.",
    "materials.title": "نحن ننتج القماش",
    "materials.subtitle": "تريكومكس تصنع منسوجاتكم من القطن والبوليستر وفق ألوانكم واحتياجاتكم التقنية.",
    "materials.cotton.title": "قطن",
    "materials.cotton.text": "ناعم ومريح ومناسب للمنتجات اليومية. مثالي للأشرطة والياقات والإكسسوارات.",
    "materials.poly.title": "بوليستر",
    "materials.poly.text": "متين وثابت اللون وملائم للإنتاج بالجملة والاستخدام المهني.",
    "materials.custom.title": "حسب الطلب",
    "materials.custom.text": "اختاروا قطناً أو بوليستر أو مزيجاً يناسب نموذجكم وعياركم وعرضكم.",
    "materials.mix.title": "قطن / بوليستر",
    "hero.ctaProducts": "اكتشف منتجاتنا",
    "hero.ctaQuote": "أنشئ منتجي",
    "config.title": "أنشئ منتجك مع تريكومكس",
    "config.subtitle": "اختر النوع والعرض والعيار والطول. تُباع الأشرطة بالمتر.",
    "config.type": "نوع المنتج",
    "config.typeCol": "شريط ياقة",
    "config.typeBande": "شريط نسيجي (بالمتر)",
    "config.typePants": "شريط للبنطلون",
    "config.width": "العرض — بحد أقصى 6 سم",
    "config.gauge": "العيار",
    "config.collarLength": "طول الياقة",
    "config.meters": "الطول (بالمتر)",
    "config.colors": "الألوان",
    "config.material": "المادة",
    "config.qty": "الكمية",
    "config.note": "ملاحظات / نقش",
    "config.priceNote": "سعر المتر: يُؤكد مع تريكومكس",
    "config.submit": "إرسال عبر واتساب",
    "config.design": "فتح ورشة السنتيمتر",
    "config.rulesTitle": "قواعد التصنيع",
    "config.rule1": "العرض الأقصى: 6 سم",
    "config.rule2": "العيار المتاح: DDD-9 أو DDD-11",
    "config.rule3": "الياقة: طول 39 سم أو 42 سم",
    "config.rule4": "الأشرطة النسيجية: تُباع بالمتر",
    "config.rule5": "المواد: قطن، بوليستر أو مزيج",
    "trust.1": "قطن وبوليستر",
    "trust.2": "نماذج أولية مخصصة",
    "trust.3": "إنتاج بالجملة",
    "trust.4": "تسليم سريع",
    "products.title": "حلولنا النسيجية",
    "products.subtitle": "منتجات تُطوَّر وفق ألوانكم وأبعادكم واحتياجات إنتاجكم.",
    "products.see": "عرض المنتج",
    "products.quoteLink": "طلب عرض سعر",
    "products.bandes.name": "أشرطة الياقات",
    "products.bandes.desc": "أشرطة ياقات بمقاسات وألوان وكميات تناسب إنتاجكم.",
    "products.rubans.name": "أشرطة نسيجية",
    "products.rubans.desc": "أشرطة نسيجية للتشطيبات والوسم والاستخدام المهني.",
    "products.echarpes.name": "أوشحة",
    "products.echarpes.desc": "أوشحة مطوَّرة حسب المواد والزخارف والأبعاد المطلوبة.",
    "products.bonnets.name": "قبعات",
    "products.bonnets.desc": "قبعات وإكسسوارات محبوكة للعلامات والمحترفين.",
    "products.pulls.name": "سترات",
    "products.pulls.desc": "سترات وقطع محبوكة وفق دفتر الشروط الخاص بكم.",
    "products.chaussures.name": "أقمشة للأحذية",
    "products.chaussures.desc": "أقمشة تقنية مخصصة لصناعة الأحذية.",
    "products.custom.name": "منتجات نسيجية حسب الطلب",
    "products.custom.desc": "تطوير كامل وفق ألوانكم وأبعادكم ومتطلباتكم التقنية.",
    "production.title": "من الفكرة إلى الإنتاج",
    "production.subtitle": "ورشة منظمة لتحويل طلبكم إلى إنتاج نسيجي مضبوط.",
    "process.1.title": "تحليل طلبكم",
    "process.1.desc": "ندرس حاجتكم واستخدامكم والقيود التقنية.",
    "process.2.title": "اختيار الألوان والأبعاد",
    "process.2.desc": "تُحدَّد مراجع الألوان والمقاسات بدقة.",
    "process.3.title": "إنشاء النموذج الأولي",
    "process.3.desc": "يمكن إعداد عينة للتحقق من النتيجة النهائية.",
    "process.4.title": "مصادقة العميل",
    "process.4.desc": "تصادقون على النموذج قبل بدء الإنتاج.",
    "process.5.title": "الإنتاج بالجملة",
    "process.5.desc": "نصنع منتجاتكم مع اهتمام دائم بالجودة.",
    "process.6.title": "التسليم",
    "process.6.desc": "يتم تجهيز طلبكم وشحنه في أفضل الآجال.",
    "custom.title": "تصميمكم، خبرتنا",
    "custom.text": "نطوّر منتجاتكم النسيجية وفق ألوانكم وأبعادكم وزخارفكم ومتطلباتكم التقنية. يمكن إعداد نموذج أولي قبل إطلاق الإنتاج بالجملة.",
    "custom.cta": "نتحدث عن مشروعي",
    "custom.design": "إنشاء تصميم",
    "about.title": "من نحن",
    "about.text": "تريكومكس ورشة تصنيع منسوجات مقرها الجزائر، متخصصة في النسيج الضيق. ننتج أقمشتنا من القطن والبوليستر: أشرطة الياقات والأشرطة النسيجية والأوشحة والقبعات والسترات والحلول المخصصة للمحترفين. من النموذج الأولي إلى الإنتاج بالجملة نهتم بالجودة ودقة الألوان واحترام المواعيد.",
    "about.v1": "إنتاج قماش من القطن والبوليستر",
    "about.v2": "دقة الألوان والأبعاد",
    "about.v3": "مواكبة مهنية للشركات",
    "collection.title": "مجموعة تريكومكس",
    "collection.subtitle": "اختيار من إبداعاتنا وتشطيباتنا النسيجية.",
    "contact.title": "هل لديكم مشروع نسيجي؟",
    "contact.subtitle": "قدّموا لنا نموذجكم وأبعادكم وألوانكم والمادة (قطن أو بوليستر) والكمية المطلوبة.",
    "contact.role1": "المسير الشريك",
    "contact.role2": "المسيرة الشريكة",
    "contact.whatsapp": "التواصل عبر واتساب",
    "form.note": "يُحفظ طلبكم في قاعدة SQLite. يمكنكم بعدها فتح واتساب للمتابعة السريعة.",
    "form.name": "الاسم / الشركة",
    "form.phone": "الهاتف",
    "form.email": "البريد الإلكتروني",
    "form.product": "نوع المنتج",
    "form.productPlaceholder": "اختر",
    "form.qty": "الكمية التقديرية",
    "form.dims": "الأبعاد",
    "form.message": "الرسالة",
    "form.file": "ملف أو نموذج (اختياري)",
    "form.fileHelp": "صورة أو PDF (بحد أقصى 8 ميغابايت). يُحفظ الملف مع الطلب.",
    "form.submit": "حفظ الطلب",
    "form.sending": "جارٍ الحفظ…",
    "form.success": "تم حفظ الطلب. جارٍ فتح واتساب…",
    "form.error": "تعذّر حفظ الطلب. تأكدوا من تشغيل خادم SQL.",
    "form.serverMissing": "خادم SQLite غير متاح. شغّلوا npm start أو تابعوا عبر واتساب.",
    "footer.blurb": "ورشة تصنيع منسوجات في الجزائر — قطن، بوليستر، نسيج ضيق وحلول حسب الطلب.",
    "footer.made": "صُنع في الجزائر",
    "footer.menu": "القائمة",
    "footer.products": "المنتجات",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة."
  },
  tr: {
    dir: "ltr",
    "nav.home": "Ana Sayfa",
    "nav.products": "Ürünler",
    "nav.materials": "Kumaş",
    "nav.production": "Üretim",
    "nav.about": "Hakkımızda",
    "nav.contact": "İletişim",
    "nav.quote": "Teklif iste",
    "nav.custom": "Oluştur",
    "hero.title": "Cezayir’de özel tekstil üretimi",
    "hero.lead": "Pamuk ve polyester kumaş üretim atölyesi — yaka bantları, şeritler ve özel çözümler.",
    "materials.title": "Kumaşı biz üretiyoruz",
    "materials.subtitle": "TRIKOMEX pamuk ve polyester ile tekstillerinizi renk ve teknik ihtiyacınıza göre üretir.",
    "materials.cotton.title": "Pamuk",
    "materials.cotton.text": "Yumuşak, konforlu ve günlük tekstil parçaları için uygun. Bant, yaka ve aksesuarlar için ideal.",
    "materials.poly.title": "Polyester",
    "materials.poly.text": "Dayanıklı, renk tutarlı ve seri üretim ile profesyonel kullanım için güçlü.",
    "materials.custom.title": "Özel üretim",
    "materials.custom.text": "Modelinize, jüje ve ene göre pamuk, polyester veya karışım seçebilirsiniz.",
    "materials.mix.title": "Pamuk / Polyester",
    "hero.ctaProducts": "Ürünlerimizi keşfedin",
    "hero.ctaQuote": "Ürünümü oluştur",
    "config.title": "TRIKOMEX ürününüzü oluşturun",
    "config.subtitle": "Tip, en, jüj ve boy seçin. Bantlar metre ile satılır.",
    "config.type": "Ürün tipi",
    "config.typeCol": "Yaka bandı",
    "config.typeBande": "Tekstil bant (metre)",
    "config.typePants": "Pantolon bandı",
    "config.width": "En — en fazla 6 cm",
    "config.gauge": "Jauge (DDD)",
    "config.collarLength": "Yaka boyu",
    "config.meters": "Uzunluk (metre)",
    "config.colors": "Renkler",
    "config.material": "Kumaş",
    "config.qty": "Adet",
    "config.note": "Not / desen",
    "config.priceNote": "Metre fiyatı: TRIKOMEX ile teyit edilecek",
    "config.submit": "WhatsApp’tan gönder",
    "config.design": "cm/mm atölyeyi aç",
    "config.rulesTitle": "Üretim kuralları",
    "config.rule1": "En maksimum: 6 cm",
    "config.rule2": "Jauge: DDD-9 veya DDD-11",
    "config.rule3": "Yaka boyları: 39 cm veya 42 cm",
    "config.rule4": "Tekstil bantlar: metre ile satış",
    "config.rule5": "Kumaş: pamuk, polyester veya karışım",
    "trust.1": "Pamuk & polyester",
    "trust.2": "Özel prototipler",
    "trust.3": "Seri üretim",
    "trust.4": "Hızlı teslimat",
    "products.title": "Tekstil çözümlerimiz",
    "products.subtitle": "Renk, ölçü ve üretim ihtiyaçlarınıza göre geliştirilen ürünler.",
    "products.see": "Ürünü gör",
    "products.quoteLink": "Teklif iste",
    "products.bandes.name": "Yaka bantları",
    "products.bandes.desc": "Renk, genişlik ve üretim hacminize uygun yaka bantları.",
    "products.rubans.name": "Tekstil şeritler",
    "products.rubans.desc": "Apare, işaretleme ve profesyonel kullanımlar için tekstil şeritler.",
    "products.echarpes.name": "Atkılar",
    "products.echarpes.desc": "Malzeme, desen ve ölçülerinize göre geliştirilen atkılar.",
    "products.bonnets.name": "Bereler",
    "products.bonnets.desc": "Markalar ve profesyoneller için örgü bere ve aksesuarlar.",
    "products.pulls.name": "Kazaklar",
    "products.pulls.desc": "Şartnamenize göre tasarlanan kazak ve örgü parçalar.",
    "products.chaussures.name": "Ayakkabı kumaşları",
    "products.chaussures.desc": "Ayakkabı üretimi için teknik kumaşlar.",
    "products.custom.name": "Özel tekstil ürünleri",
    "products.custom.desc": "Renk, ölçü ve teknik gereksinimlerinize göre tam geliştirme.",
    "production.title": "Fikirden üretime",
    "production.subtitle": "Talebinizi kontrollü tekstil üretimine dönüştüren yapılandırılmış bir atölye.",
    "process.1.title": "Talebinizin analizi",
    "process.1.desc": "İhtiyacınızı, kullanımınızı ve teknik kısıtlarınızı inceleriz.",
    "process.2.title": "Renk ve ölçü seçimi",
    "process.2.desc": "Renk referanslarınız ve ölçüleriniz netleştirilir.",
    "process.3.title": "Prototip oluşturma",
    "process.3.desc": "Son görünümü doğrulamak için numune hazırlanabilir.",
    "process.4.title": "Müşteri onayı",
    "process.4.desc": "Üretim başlamadan önce prototipi onaylarsınız.",
    "process.5.title": "Seri üretim",
    "process.5.desc": "Ürünlerinizi sürekli kalite kontrolüyle üretiriz.",
    "process.6.title": "Teslimat",
    "process.6.desc": "Siparişiniz hazırlanır ve en kısa sürede sevk edilir.",
    "custom.title": "Sizin modeliniz, bizim uzmanlığımız",
    "custom.text": "Tekstil ürünlerinizi renk, ölçü, desen ve teknik gereksinimlerinize göre geliştiriyoruz. Seri üretim öncesinde prototip hazırlanabilir.",
    "custom.cta": "Projemden bahsedelim",
    "custom.design": "Tasarım oluştur",
    "about.title": "Hakkımızda",
    "about.text": "TRIKOMEX, Cezayir merkezli, dar dokuma konusunda uzmanlaşmış bir tekstil üretim atölyesidir. Kumaşlarımızı pamuk ve polyesterden üretiyoruz: yaka bantları, tekstil şeritler, atkılar, bereler, kazaklar ve profesyoneller için özel çözümler. Prototipten seri üretime kadar kaliteye, renk doğruluğuna ve teslim sürelerine önem veriyoruz.",
    "about.v1": "Pamuk ve polyester kumaş üretimi",
    "about.v2": "Renk ve ölçü hassasiyeti",
    "about.v3": "Profesyonel B2B destek",
    "collection.title": "TRIKOMEX Koleksiyon",
    "collection.subtitle": "Tekstil üretimlerimizden ve finisajlarımızdan bir seçki.",
    "contact.title": "Gerçekleştirilecek bir tekstil projeniz mi var?",
    "contact.subtitle": "Modelinizi, ölçülerinizi, renklerinizi, kumaş türünü (pamuk veya polyester) ve miktarı paylaşın.",
    "contact.role1": "Ortak Yönetici",
    "contact.role2": "Ortak Yönetici",
    "contact.whatsapp": "WhatsApp’tan yazın",
    "form.note": "Talebiniz SQLite veritabanına kaydedilir. Ardından hızlı takip için WhatsApp açılabilir.",
    "form.name": "Ad / Şirket",
    "form.phone": "Telefon",
    "form.email": "E-posta",
    "form.product": "Ürün tipi",
    "form.productPlaceholder": "Seçiniz",
    "form.qty": "Tahmini miktar",
    "form.dims": "Ölçüler",
    "form.message": "Mesaj",
    "form.file": "Dosya veya model (isteğe bağlı)",
    "form.fileHelp": "Görsel veya PDF (en fazla 8 MB). Dosya taleple birlikte kaydedilir.",
    "form.submit": "Talebi kaydet",
    "form.sending": "Kaydediliyor…",
    "form.success": "Talep kaydedildi. WhatsApp açılıyor…",
    "form.error": "Talep kaydedilemedi. SQL sunucusunun çalıştığını kontrol edin.",
    "form.serverMissing": "SQLite sunucusu yok. npm start ile başlatın veya WhatsApp ile devam edin.",
    "footer.blurb": "Cezayir’de pamuk ve polyester kumaş üreten, dar dokuma ve özel çözüm odaklı atölye.",
    "footer.made": "Cezayir’de üretilmiştir",
    "footer.menu": "Menü",
    "footer.products": "Ürünler",
    "footer.contact": "İletişim",
    "footer.rights": "Tüm hakları saklıdır."
  },
  en: {
    dir: "ltr",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.materials": "Materials",
    "nav.production": "Production",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.quote": "Request a quote",
    "nav.custom": "Create",
    "hero.title": "Custom textile manufacturing in Algeria",
    "hero.lead": "Cotton and polyester textile manufacturing — collar bands, ribbons and custom solutions.",
    "materials.title": "We produce the fabric",
    "materials.subtitle": "TRIKOMEX manufactures your textiles in cotton and polyester, matched to your colors and technical needs.",
    "materials.cotton.title": "Cotton",
    "materials.cotton.text": "Soft, comfortable and suited to everyday textile pieces. Ideal for bands, collars and accessories.",
    "materials.poly.title": "Polyester",
    "materials.poly.text": "Strong, color-stable and durable for series production and professional use.",
    "materials.custom.title": "Custom",
    "materials.custom.text": "Choose cotton, polyester or a blend suited to your model, gauge and width.",
    "materials.mix.title": "Cotton / Polyester",
    "hero.ctaProducts": "Discover our products",
    "hero.ctaQuote": "Create my product",
    "config.title": "Create your TRIKOMEX product",
    "config.subtitle": "Choose type, width, gauge and length. Bands are sold by the meter.",
    "config.type": "Product type",
    "config.typeCol": "Collar band",
    "config.typeBande": "Textile band (per meter)",
    "config.typePants": "Trouser band",
    "config.width": "Width — max. 6 cm",
    "config.gauge": "Gauge",
    "config.collarLength": "Collar length",
    "config.meters": "Length (meters)",
    "config.colors": "Colors",
    "config.material": "Material",
    "config.qty": "Quantity",
    "config.note": "Notes / pattern",
    "config.priceNote": "Price per meter: to be confirmed with TRIKOMEX",
    "config.submit": "Send on WhatsApp",
    "config.design": "Open cm/mm atelier",
    "config.rulesTitle": "Production rules",
    "config.rule1": "Maximum width: 6 cm",
    "config.rule2": "Available gauge: DDD-9 or DDD-11",
    "config.rule3": "Collar lengths: 39 cm or 42 cm",
    "config.rule4": "Textile bands: sold by the meter",
    "config.rule5": "Materials: cotton, polyester or blend",
    "trust.1": "Cotton & polyester",
    "trust.2": "Custom prototypes",
    "trust.3": "Series production",
    "trust.4": "Fast delivery",
    "products.title": "Our textile solutions",
    "products.subtitle": "Products developed to match your colors, dimensions and production needs.",
    "products.see": "View product",
    "products.quoteLink": "Request a quote",
    "products.bandes.name": "Collar bands",
    "products.bandes.desc": "Collar bands tailored to your colors, widths and production volumes.",
    "products.rubans.name": "Textile ribbons",
    "products.rubans.desc": "Textile ribbons for finishing, marking and professional applications.",
    "products.echarpes.name": "Scarves",
    "products.echarpes.desc": "Scarves developed around your materials, patterns and dimensions.",
    "products.bonnets.name": "Beanies",
    "products.bonnets.desc": "Knitted beanies and accessories for brands and professionals.",
    "products.pulls.name": "Sweaters",
    "products.pulls.desc": "Sweaters and knit pieces designed to your specifications.",
    "products.chaussures.name": "Shoe fabrics",
    "products.chaussures.desc": "Technical fabrics intended for footwear manufacturing.",
    "products.custom.name": "Custom textile products",
    "products.custom.desc": "Full development based on your colors, dimensions and technical requirements.",
    "production.title": "From idea to production",
    "production.subtitle": "A structured workshop that turns your request into controlled textile production.",
    "process.1.title": "Request analysis",
    "process.1.desc": "We review your need, intended use and technical constraints.",
    "process.2.title": "Color and dimension selection",
    "process.2.desc": "Your color references and measurements are defined with precision.",
    "process.3.title": "Prototype creation",
    "process.3.desc": "A sample can be prepared to validate the final result.",
    "process.4.title": "Client validation",
    "process.4.desc": "You approve the prototype before production starts.",
    "process.5.title": "Series production",
    "process.5.desc": "We manufacture your items with consistent quality control.",
    "process.6.title": "Delivery",
    "process.6.desc": "Your order is prepared and shipped as quickly as possible.",
    "custom.title": "Your model, our expertise",
    "custom.text": "We develop your textile products according to your colors, dimensions, patterns and technical requirements. A prototype can be prepared before series production begins.",
    "custom.cta": "Discuss my project",
    "custom.design": "Create a design",
    "about.title": "About us",
    "about.text": "TRIKOMEX is a textile manufacturing workshop based in Algeria, specialized in narrow weaving. We produce our fabrics in cotton and polyester: collar bands, textile ribbons, scarves, beanies, sweaters and customized solutions for professionals. From prototype to series production, we focus on quality, color accuracy and lead times.",
    "about.v1": "Cotton and polyester fabric production",
    "about.v2": "Accurate colors and dimensions",
    "about.v3": "Professional B2B support",
    "collection.title": "TRIKOMEX Collection",
    "collection.subtitle": "A selection of our textile creations and finishes.",
    "contact.title": "A textile project to bring to life?",
    "contact.subtitle": "Share your model, dimensions, colors, material (cotton or polyester) and desired quantity.",
    "contact.role1": "Managing Partner",
    "contact.role2": "Managing Partner",
    "contact.whatsapp": "Message on WhatsApp",
    "form.note": "Your request is saved in our SQLite database. You can then open WhatsApp for a quick follow-up.",
    "form.name": "Name / Company",
    "form.phone": "Phone",
    "form.email": "Email",
    "form.product": "Product type",
    "form.productPlaceholder": "Select",
    "form.qty": "Estimated quantity",
    "form.dims": "Dimensions",
    "form.message": "Message",
    "form.file": "File or sample (optional)",
    "form.fileHelp": "Image or PDF (max 8 MB). The file is stored with your request.",
    "form.submit": "Save request",
    "form.sending": "Saving…",
    "form.success": "Request saved. Opening WhatsApp…",
    "form.error": "Could not save the request. Make sure the SQL server is running.",
    "form.serverMissing": "SQLite server unavailable. Run npm start, or continue via WhatsApp.",
    "footer.blurb": "Textile manufacturing workshop in Algeria — cotton, polyester, narrow weaving and custom solutions.",
    "footer.made": "Made in Algeria",
    "footer.menu": "Menu",
    "footer.products": "Products",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved."
  }
};

let currentLang = "fr";

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
    TRANSLATIONS.fr[key] ||
    key;
}

function safeText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function applyTranslations(lang) {
  if (!TRANSLATIONS[lang]) return;

  currentLang = lang;
  const pack = TRANSLATIONS[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = pack.dir || "ltr";

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.getAttribute("data-i18n");
    if (pack[key]) el.textContent = pack[key];
  });

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    const active = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  renderProducts();
  updateProductSelectOptions();
}

function setFrench() { applyTranslations("fr"); }
function setArabic() { applyTranslations("ar"); }
function setTurkish() { applyTranslations("tr"); }
function setEnglish() { applyTranslations("en"); }

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(function (product) {
    const name = t("products." + product.i18nKey + ".name");
    const desc = t("products." + product.i18nKey + ".desc");

    return (
      '<article class="product-card reveal">' +
        '<div class="product-card-media">' +
          '<img src="' + product.image + '" alt="' + name + '" loading="lazy" width="480" height="360">' +
        "</div>" +
        '<div class="product-card-body">' +
          "<h3>" + name + "</h3>" +
          "<p>" + desc + "</p>" +
          '<button type="button" class="product-link" data-product-id="' + product.id + '">' +
            t("products.see") +
          "</button>" +
        "</div>" +
      "</article>"
    );
  }).join("");

  grid.querySelectorAll("[data-product-id]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openProductModal(btn.getAttribute("data-product-id"));
    });
  });

  observeReveals();
}

function updateProductSelectOptions() {
  const select = document.getElementById("quoteProduct");
  if (!select) return;

  const current = select.value;
  const options = [
    { value: "", key: "form.productPlaceholder" },
    { value: "Bandes de col", key: "products.bandes.name" },
    { value: "Rubans textiles", key: "products.rubans.name" },
    { value: "Écharpes", key: "products.echarpes.name" },
    { value: "Bonnets", key: "products.bonnets.name" },
    { value: "Pulls", key: "products.pulls.name" },
    { value: "Tissus pour chaussures", key: "products.chaussures.name" },
    { value: "Sur mesure", key: "products.custom.name" }
  ];

  select.innerHTML = options.map(function (opt) {
    return '<option value="' + opt.value + '">' + t(opt.key) + "</option>";
  }).join("");

  select.value = current;
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  grid.innerHTML = GALLERY.map(function (item, index) {
    return (
      '<button type="button" class="gallery-item reveal" data-gallery-index="' + index + '">' +
        '<img src="' + item.src + '" alt="' + item.alt + '" loading="lazy">' +
      "</button>"
    );
  }).join("");

  grid.querySelectorAll("[data-gallery-index]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const index = Number(btn.getAttribute("data-gallery-index"));
      openLightbox(GALLERY[index].src, GALLERY[index].alt);
    });
  });
}

function openLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightboxImage");
  if (!lightbox || !image) return;

  image.src = src;
  image.alt = alt || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightboxImage");
  if (!lightbox) return;

  lightbox.hidden = true;
  if (image) image.src = "";
  document.body.style.overflow = "";
}

function openProductModal(productId) {
  const product = PRODUCTS.find(function (item) { return item.id === productId; });
  const modal = document.getElementById("productModal");
  if (!product || !modal) return;

  const name = t("products." + product.i18nKey + ".name");
  const desc = t("products." + product.i18nKey + ".desc");

  safeText("productModalTitle", name);
  safeText("productModalDesc", desc);

  const gallery = document.getElementById("productModalGallery");
  if (gallery) {
    gallery.innerHTML = product.images.map(function (src) {
      return '<img src="' + src + '" alt="' + name + '" loading="lazy">';
    }).join("");

    gallery.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("click", function () {
        openLightbox(img.src, img.alt);
      });
    });
  }

  const cta = document.getElementById("productModalCta");
  if (cta) {
    cta.href = product.href;
    cta.textContent = product.href.indexOf("custom-product") !== -1
      ? t("custom.design")
      : t("products.quoteLink");
    cta.addEventListener("click", closeProductModal, { once: true });
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function setupHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupMenu() {
  const toggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("menuClose");
  const mobileNav = document.getElementById("mobileNav");
  const sideMenu = document.getElementById("sideMenu");
  const menuBtn = document.querySelector(".menu-btn");
  const closeMenuBtn = document.querySelector(".close-menu");

  function openMobile() {
    if (!mobileNav || !toggle) return;
    mobileNav.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMobile() {
    if (!mobileNav || !toggle) return;
    mobileNav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggle) toggle.addEventListener("click", openMobile);
  if (closeBtn) closeBtn.addEventListener("click", closeMobile);

  if (mobileNav) {
    mobileNav.addEventListener("click", function (event) {
      if (event.target === mobileNav) closeMobile();
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobile);
    });
  }

  if (menuBtn && sideMenu) {
    menuBtn.addEventListener("click", function () {
      sideMenu.classList.add("active");
    });
  }

  if (closeMenuBtn && sideMenu) {
    closeMenuBtn.addEventListener("click", function () {
      sideMenu.classList.remove("active");
    });
  }
}

function setupLanguageSwitch() {
  document.querySelectorAll(".lang-btn[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTranslations(btn.getAttribute("data-lang"));
    });
  });
}

function buildWhatsAppText(fields) {
  let text =
    WHATSAPP_DEFAULT_TEXT + "\n\n" +
    "Nom / Entreprise: " + fields.name + "\n" +
    "Téléphone: " + fields.phone + "\n" +
    "E-mail: " + fields.email + "\n" +
    "Type de produit: " + fields.product + "\n" +
    "Quantité estimée: " + (fields.qty || "-") + "\n" +
    "Dimensions: " + (fields.dims || "-") + "\n" +
    "Message: " + (fields.message || "-");

  if (fields.fileName) {
    text += "\nFichier: " + fields.fileName;
  }

  return text;
}

function openWhatsAppWithFields(fields) {
  const url =
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(buildWhatsAppText(fields));
  window.open(url, "_blank", "noopener,noreferrer");
}

function setQuoteFeedback(type, message) {
  const feedback = document.getElementById("quoteFeedback");
  if (!feedback) return;

  feedback.hidden = false;
  feedback.classList.remove("is-success", "is-error");
  feedback.classList.add(type === "success" ? "is-success" : "is-error");
  feedback.textContent = message;
}

function setupQuoteForm() {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const submitBtn = document.getElementById("quoteSubmit");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("quoteName")?.value.trim() || "";
    const phone = document.getElementById("quotePhone")?.value.trim() || "";
    const email = document.getElementById("quoteEmail")?.value.trim() || "";
    const product = document.getElementById("quoteProduct")?.value || "";
    const qty = document.getElementById("quoteQty")?.value.trim() || "";
    const dims = document.getElementById("quoteDims")?.value.trim() || "";
    const message = document.getElementById("quoteMessage")?.value.trim() || "";
    const fileInput = document.getElementById("quoteFile");
    const file = fileInput && fileInput.files[0] ? fileInput.files[0] : null;

    if (!name || !phone || !email || !product) {
      form.reportValidity();
      return;
    }

    const fields = {
      name,
      phone,
      email,
      product,
      qty,
      dims,
      message,
      fileName: file ? file.name : ""
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("product", product);
    formData.append("quantity", qty);
    formData.append("dimensions", dims);
    formData.append("message", message);
    if (file) formData.append("file", file);

    const originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = t("form.sending");
    }

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        body: formData
      });

      let data = null;
      try {
        data = await response.json();
      } catch (_err) {
        data = null;
      }

      if (!response.ok || !data || !data.ok) {
        throw new Error((data && data.error) || "save_failed");
      }

      setQuoteFeedback("success", t("form.success"));
      form.reset();
      openWhatsAppWithFields(fields);
    } catch (error) {
      console.error(error);
      const offline = error instanceof TypeError;
      setQuoteFeedback("error", offline ? t("form.serverMissing") : t("form.error"));
      openWhatsAppWithFields(fields);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel || t("form.submit");
      }
    }
  });
}

function setupLightboxControls() {
  const closeBtn = document.getElementById("lightboxClose");
  const lightbox = document.getElementById("lightbox");
  const productClose = document.getElementById("productModalClose");
  const productModal = document.getElementById("productModal");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  if (productClose) productClose.addEventListener("click", closeProductModal);
  if (productModal) {
    productModal.addEventListener("click", function (event) {
      if (event.target === productModal) closeProductModal();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
      closeProductModal();
    }
  });
}

function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { observer.observe(el); });
}

function setupRevealTargets() {
  document.querySelectorAll(
    ".section-head, .trust-item, .material-card, .process-timeline li, .person-card, .configurator-form, .configurator-aside, .about-grid > *"
  ).forEach(function (el) {
    el.classList.add("reveal");
  });
  observeReveals();
}

function goToProducts() {
  const productsSection = document.getElementById("productsSection") || document.getElementById("produits");
  const sideMenu = document.getElementById("sideMenu");
  const mobileNav = document.getElementById("mobileNav");

  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (sideMenu) sideMenu.classList.remove("active");
  if (mobileNav) {
    mobileNav.hidden = true;
    document.body.style.overflow = "";
  }
}

function goToCollection() {
  const collectionSection = document.getElementById("collectionSection") || document.getElementById("collection");
  const sideMenu = document.getElementById("sideMenu");

  if (collectionSection) {
    collectionSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (sideMenu) sideMenu.classList.remove("active");
}

function openProductFromMenu(productName) {
  const map = {
    bandes: "rubans",
    rubans: "bandes-col",
    echarpes: "echarpes",
    bonnet: "bonnets",
    kazaklar: "pulls"
  };

  goToProducts();

  setTimeout(function () {
    const id = map[productName] || productName;
    const btn = document.querySelector('[data-product-id="' + id + '"]');
    if (btn) btn.click();
  }, 400);
}

/* Legacy product buttons support */
function setupProducts() {
  const productImages = {
    bandes: ["bandes1.png", "bandes2.png", "bandes3.png", "bandes4.png", "bandes5.png", "bandes6.png"],
    rubans: ["rubans1.png", "rubans2.png", "rubans3.png"],
    echarpes: ["echarpes1.png", "echarpes2.png", "echarpes3.png", "echarpes4.png", "echarpes5.png"],
    bonnet: ["bonnet1.png", "bonnet2.png", "bonnet3.png", "bonnet4.png", "bonnet5.png", "bonnet6.png"],
    kazaklar: ["kazak1.png", "kazak2.png", "kazak3.png", "kazak4.png", "kazak5.png", "kazak6.png"]
  };

  const buttons = document.querySelectorAll(".product-btn");
  const container = document.getElementById("productImageContainer");
  if (!buttons.length || !container) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const product = btn.getAttribute("data-name");
      container.innerHTML = "";

      if (!productImages[product]) {
        container.innerHTML = "<p>Photos not found.</p>";
        return;
      }

      productImages[product].forEach(function (imgSrc) {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = product;
        img.loading = "lazy";
        img.style.width = "200px";
        img.style.margin = "10px";
        img.style.borderRadius = "8px";
        container.appendChild(img);
      });
    });
  });
}

/* Custom product design tools (shared with cad.js) */
var productCanvas;
var productCtx;
var designCanvas;
var designCtx;
var drawing = false;
var currentTool = "brush";
var startX = 0;
var startY = 0;
var savedCanvas = null;

function setupDesignProgram() {
  productCanvas = document.getElementById("productCanvas");
  designCanvas = document.getElementById("designCanvas");
  if (!productCanvas || !designCanvas) return;

  // CAD workspace (custom-product.html) is handled by cad.js
  if (document.getElementById("overlayCanvas")) return;

  productCtx = productCanvas.getContext("2d");
  designCtx = designCanvas.getContext("2d");

  drawGridBackground();
  clearDrawingLayer();

  designCanvas.addEventListener("mousedown", startDraw);
  designCanvas.addEventListener("mousemove", draw);
  designCanvas.addEventListener("mouseup", stopDraw);
  designCanvas.addEventListener("mouseleave", stopDraw);
  designCanvas.addEventListener("touchstart", startDrawTouch, { passive: false });
  designCanvas.addEventListener("touchmove", drawTouch, { passive: false });
  designCanvas.addEventListener("touchend", stopDraw);
}

function drawGridBackground() {
  if (!productCanvas || !productCtx) return;

  const w = productCanvas.width;
  const h = productCanvas.height;

  productCtx.clearRect(0, 0, w, h);
  productCtx.fillStyle = "#ffffff";
  productCtx.fillRect(0, 0, w, h);

  const cell = 5;
  const cmCell = 10;
  const cmSize = cell * cmCell;

  productCtx.save();

  for (let x = 0; x <= w; x += cell) {
    productCtx.beginPath();
    productCtx.moveTo(x, 0);
    productCtx.lineTo(x, h);
    productCtx.strokeStyle = "rgba(15, 23, 42, 0.07)";
    productCtx.lineWidth = 0.5;
    productCtx.stroke();
  }

  for (let y = 0; y <= h; y += cell) {
    productCtx.beginPath();
    productCtx.moveTo(0, y);
    productCtx.lineTo(w, y);
    productCtx.strokeStyle = "rgba(15, 23, 42, 0.07)";
    productCtx.lineWidth = 0.5;
    productCtx.stroke();
  }

  for (let x = 0; x <= w; x += cmSize) {
    productCtx.beginPath();
    productCtx.moveTo(x, 0);
    productCtx.lineTo(x, h);
    productCtx.strokeStyle = "rgba(196, 163, 90, 0.35)";
    productCtx.lineWidth = 1.1;
    productCtx.stroke();
  }

  for (let y = 0; y <= h; y += cmSize) {
    productCtx.beginPath();
    productCtx.moveTo(0, y);
    productCtx.lineTo(w, y);
    productCtx.strokeStyle = "rgba(196, 163, 90, 0.35)";
    productCtx.lineWidth = 1.1;
    productCtx.stroke();
  }

  productCtx.fillStyle = "rgba(0,0,0,0.55)";
  productCtx.font = "10px Manrope, sans-serif";

  for (let x = cmSize; x <= w; x += cmSize) {
    productCtx.fillText(x / cmSize + " cm", x + 3, 12);
  }

  for (let y = cmSize; y <= h; y += cmSize) {
    productCtx.fillText(y / cmSize + " cm", 4, y - 4);
  }

  productCtx.restore();
}

function clampProductWidth() {
  const input = document.getElementById("productWidth") || document.getElementById("configWidth");
  if (!input) return;

  let value = parseFloat(input.value);
  if (Number.isNaN(value)) return;
  if (value > 6) value = 6;
  if (value < 0.5) value = 0.5;
  input.value = String(value);
}

function isMeterCategory(category) {
  return /bande textile|au mètre|metre|meter|pantalon/i.test(category || "");
}

function onCustomCategoryChange() {
  const category = document.getElementById("productCategory")?.value || "";
  const collarFields = document.getElementById("customCollarFields");
  const meterFields = document.getElementById("customMeterFields");
  const meterMode = isMeterCategory(category) && !/col|yaka/i.test(category);

  if (collarFields) collarFields.hidden = meterMode;
  if (meterFields) meterFields.hidden = !meterMode;
}

function updatePreview() {
  const name = document.getElementById("productName")?.value || "";
  const category = document.getElementById("productCategory")?.value || "";
  const colors = document.getElementById("productColors")?.value || "";
  const gauge = document.getElementById("productGauge")?.value || "";
  const length = document.getElementById("productLength")?.value || "";
  const meters = document.getElementById("productMeters")?.value || "";
  const width = document.getElementById("productWidth")?.value || "";
  const material = document.getElementById("productMaterial")?.value || "";
  const quantity = document.getElementById("productQuantity")?.value || "";
  const meterMode = document.getElementById("customMeterFields") &&
    !document.getElementById("customMeterFields").hidden;

  const sizeLabel = meterMode
    ? (width || "-") + " cm × " + (meters || "-") + " m"
    : (width || "-") + " cm × " + (length || "-");

  safeText("previewName", name || "Nom du produit");
  safeText("previewCategory", "Catégorie: " + (category || "-"));
  safeText("previewColors", "Couleurs: " + (colors || "-"));
  safeText("previewGauge", "Jauge: " + (gauge || "-"));
  safeText("previewThickness", "Jauge: " + (gauge || "-"));
  safeText("previewSize", "Taille: " + sizeLabel);
  safeText("previewMaterial", "Matière: " + (material || "-"));
  safeText("previewQuantity", "Quantité: " + (quantity || "-"));

  drawGridBackground();
}

function updateConfiguratorUI() {
  const type = document.getElementById("configType")?.value || "col";
  const collarWrap = document.getElementById("configCollarLengthWrap");
  const metersWrap = document.getElementById("configMetersWrap");
  const width = document.getElementById("configWidth")?.value || "3";
  const gauge = document.getElementById("configGauge")?.value || "DDD-9";
  const collarLength = document.getElementById("configCollarLength")?.value || "42";
  const meters = document.getElementById("configMeters")?.value || "10";
  const strip = document.getElementById("configStripPreview");
  const stripLabel = document.getElementById("configStripLabel");
  const summary = document.getElementById("configSummary");

  const meterMode = type === "bande" || type === "pantalon";

  if (collarWrap) collarWrap.hidden = meterMode;
  if (metersWrap) metersWrap.hidden = !meterMode;

  const widthNum = Math.min(6, Math.max(0.5, parseFloat(width) || 3));
  if (strip) {
    strip.style.width = (35 + widthNum * 8) + "%";
    strip.style.height = (16 + widthNum * 3) + "px";
  }

  const sizeText = meterMode
    ? widthNum + " cm × " + meters + " m · " + gauge
    : widthNum + " cm × " + collarLength + " cm · " + gauge;

  if (stripLabel) stripLabel.textContent = sizeText;
  if (summary) {
    const typeLabel = type === "col"
      ? t("config.typeCol")
      : type === "pantalon"
        ? t("config.typePants")
        : t("config.typeBande");
    summary.textContent = typeLabel + " — " + sizeText +
      (meterMode ? " — " + t("config.priceNote") : "");
  }
}

function setupConfigurator() {
  const form = document.getElementById("productConfigurator");
  if (!form) return;

  ["configType", "configWidth", "configGauge", "configCollarLength", "configMeters", "configQty", "configColors", "configMaterial"]
    .forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", function () {
        if (id === "configWidth") clampProductWidth();
        updateConfiguratorUI();
      });
      el.addEventListener("change", updateConfiguratorUI);
    });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clampProductWidth();

    const type = document.getElementById("configType")?.value || "col";
    const width = document.getElementById("configWidth")?.value || "";
    const gauge = document.getElementById("configGauge")?.value || "";
    const collarLength = document.getElementById("configCollarLength")?.value || "";
    const meters = document.getElementById("configMeters")?.value || "";
    const colors = document.getElementById("configColors")?.value || "";
    const material = document.getElementById("configMaterial")?.value || "Polyester";
    const qty = document.getElementById("configQty")?.value || "";
    const note = document.getElementById("configNote")?.value || "";
    const meterMode = type === "bande" || type === "pantalon";

    if (!width || parseFloat(width) > 6) {
      alert("Largeur (eni) maximum: 6 cm");
      return;
    }

    const typeLabel = type === "col"
      ? "Bande de col / yaka"
      : type === "pantalon"
        ? "Bande pour pantalon"
        : "Bande textile (au mètre)";

    const lengthLine = meterMode
      ? "Longueur: " + meters + " m (vente au mètre)\nPrix au mètre: à confirmer"
      : "Longueur yaka: " + collarLength + " cm";

    const message =
      WHATSAPP_DEFAULT_TEXT + "\n\n" +
      "Type: " + typeLabel + "\n" +
      "Matière: " + material + "\n" +
      "Largeur (eni): " + width + " cm\n" +
      "Jauge: " + gauge + "\n" +
      lengthLine + "\n" +
      "Couleurs: " + (colors || "-") + "\n" +
      "Quantité: " + (qty || "-") + "\n" +
      "Notes: " + (note || "-");

    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer"
    );
  });

  updateConfiguratorUI();
}

function getMousePos(event) {
  const rect = designCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (designCanvas.width / rect.width),
    y: (event.clientY - rect.top) * (designCanvas.height / rect.height)
  };
}

function getTouchPos(event) {
  const rect = designCanvas.getBoundingClientRect();
  const touch = event.touches[0];
  return {
    x: (touch.clientX - rect.left) * (designCanvas.width / rect.width),
    y: (touch.clientY - rect.top) * (designCanvas.height / rect.height)
  };
}

function startDraw(event) {
  if (!designCanvas || !designCtx) return;
  drawing = true;
  const pos = getMousePos(event);
  startX = pos.x;
  startY = pos.y;
  savedCanvas = designCtx.getImageData(0, 0, designCanvas.width, designCanvas.height);
  designCtx.beginPath();
  designCtx.moveTo(startX, startY);
}

function draw(event) {
  if (!drawing || !designCanvas || !designCtx) return;
  const pos = getMousePos(event);
  drawTool(pos.x, pos.y);
}

function startDrawTouch(event) {
  event.preventDefault();
  if (!designCanvas || !designCtx) return;
  drawing = true;
  const pos = getTouchPos(event);
  startX = pos.x;
  startY = pos.y;
  savedCanvas = designCtx.getImageData(0, 0, designCanvas.width, designCanvas.height);
  designCtx.beginPath();
  designCtx.moveTo(startX, startY);
}

function drawTouch(event) {
  event.preventDefault();
  if (!drawing || !designCanvas || !designCtx) return;
  const pos = getTouchPos(event);
  drawTool(pos.x, pos.y);
}

function drawTool(x, y) {
  const cell = 5;
  x = Math.round(x / cell) * cell;
  y = Math.round(y / cell) * cell;

  designCtx.lineWidth = document.getElementById("brushSize")?.value || 6;
  designCtx.lineCap = "square";
  designCtx.lineJoin = "miter";

  if (currentTool === "eraser") {
    designCtx.globalCompositeOperation = "destination-out";
    designCtx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    designCtx.globalCompositeOperation = "source-over";
    designCtx.strokeStyle = document.getElementById("drawColor")?.value || "#000000";
    designCtx.fillStyle = document.getElementById("drawColor")?.value || "#000000";
  }

  if (currentTool === "brush") {
    designCtx.fillRect(x, y, cell, cell);
    return;
  }

  if (currentTool === "eraser") {
    designCtx.clearRect(x - cell, y - cell, cell * 3, cell * 3);
    return;
  }

  designCtx.globalCompositeOperation = "source-over";

  if (savedCanvas) {
    designCtx.putImageData(savedCanvas, 0, 0);
  }

  if (currentTool === "line") drawPixelLine(startX, startY, x, y, cell);
  if (currentTool === "rectangle") drawPixelRectangle(startX, startY, x, y, cell);
  if (currentTool === "circle") drawPixelCircle(startX, startY, x, y, cell);
}

function stopDraw() {
  drawing = false;
  if (designCtx) {
    designCtx.globalCompositeOperation = "source-over";
    designCtx.beginPath();
  }
}

function fillPixelCell(x, y, cell) {
  const px = Math.round(x / cell) * cell;
  const py = Math.round(y / cell) * cell;
  designCtx.fillRect(px, py, cell, cell);
}

function drawPixelLine(x0, y0, x1, y1, cell) {
  x0 = Math.round(x0 / cell);
  y0 = Math.round(y0 / cell);
  x1 = Math.round(x1 / cell);
  y1 = Math.round(y1 / cell);

  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    designCtx.fillRect(x0 * cell, y0 * cell, cell, cell);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
}

function drawPixelRectangle(x0, y0, x1, y1, cell) {
  const left = Math.min(x0, x1);
  const right = Math.max(x0, x1);
  const top = Math.min(y0, y1);
  const bottom = Math.max(y0, y1);

  drawPixelLine(left, top, right, top, cell);
  drawPixelLine(right, top, right, bottom, cell);
  drawPixelLine(right, bottom, left, bottom, cell);
  drawPixelLine(left, bottom, left, top, cell);
}

function drawPixelCircle(x0, y0, x1, y1, cell) {
  const radius = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
  const steps = Math.max(16, Math.floor((2 * Math.PI * radius) / cell));

  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const x = x0 + Math.cos(angle) * radius;
    const y = y0 + Math.sin(angle) * radius;
    fillPixelCell(x, y, cell);
  }
}

function setBrush() { currentTool = "brush"; }
function setEraser() { currentTool = "eraser"; }
function setLineTool() { currentTool = "line"; }
function setRectangleTool() { currentTool = "rectangle"; }
function setCircleTool() { currentTool = "circle"; }

function clearCanvas() { clearDrawingLayer(); }

function clearDrawingLayer() {
  if (!designCtx || !designCanvas) return;
  designCtx.clearRect(0, 0, designCanvas.width, designCanvas.height);
}

function previewImage(event) {
  const file = event.target.files[0];
  if (!file || !designCanvas || !designCtx) return;

  const img = new Image();
  img.onload = function () {
    const scale = Math.min(
      designCanvas.width / img.width,
      designCanvas.height / img.height
    );
    const x = designCanvas.width / 2 - (img.width * scale) / 2;
    const y = designCanvas.height / 2 - (img.height * scale) / 2;
    designCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };
  img.src = URL.createObjectURL(file);
}

async function sendCustomProductWhatsApp() {
  clampProductWidth();

  const productName = document.getElementById("productName")?.value || "";
  const productCategory = document.getElementById("productCategory")?.value || "";
  const productColors = document.getElementById("productColors")?.value || "";
  const productGauge = document.getElementById("productGauge")?.value || "";
  const productLength = document.getElementById("productLength")?.value || "";
  const productMeters = document.getElementById("productMeters")?.value || "";
  const productWidth = document.getElementById("productWidth")?.value || "";
  const productMaterial = document.getElementById("productMaterial")?.value || "";
  const productQuantity = document.getElementById("productQuantity")?.value || "";
  const productDescription = document.getElementById("productDescription")?.value || "";
  const meterMode = document.getElementById("customMeterFields") &&
    !document.getElementById("customMeterFields").hidden;

  if (productWidth && parseFloat(productWidth) > 6) {
    alert("Largeur (eni) maximum: 6 cm");
    return;
  }

  const lengthLine = meterMode
    ? "Longueur: " + productMeters + " m (vente au mètre)\nPrix au mètre: à confirmer"
    : "Longueur yaka: " + productLength;

  const message =
    "Bonjour TRIKOMEX,\n\n" +
    "Je veux créer un produit personnalisé.\n\n" +
    "Nom du produit: " + productName + "\n" +
    "Catégorie: " + productCategory + "\n" +
    "Couleurs: " + productColors + "\n" +
    "Jauge: " + productGauge + "\n" +
    "Largeur (eni): " + productWidth + " cm\n" +
    lengthLine + "\n" +
    "Matière: " + productMaterial + "\n" +
    "Quantité: " + productQuantity + "\n" +
    "Description: " + productDescription + "\n\n" +
    "Voici mon design personnalisé.";

  const imageBlob = await createDesignImageBlob();
  const file = new File([imageBlob], "trikomex-design.png", { type: "image/png" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      title: "TRIKOMEX Design",
      text: message,
      files: [file]
    });
  } else {
    downloadDesignImage(imageBlob);
    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer"
    );
  }
}

function createDesignImageBlob() {
  return new Promise(function (resolve) {
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = productCanvas.width;
    finalCanvas.height = productCanvas.height;
    const finalCtx = finalCanvas.getContext("2d");

    finalCtx.fillStyle = "#ffffff";
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    finalCtx.drawImage(productCanvas, 0, 0);
    finalCtx.drawImage(designCanvas, 0, 0);

    finalCanvas.toBlob(function (blob) {
      resolve(blob);
    }, "image/png");
  });
}

function downloadDesignImage(blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "trikomex-design.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function () {
  setupHeader();
  setupMenu();
  setupLanguageSwitch();
  setupQuoteForm();
  setupLightboxControls();
  setupProducts();
  setupConfigurator();
  setupDesignProgram();
  onCustomCategoryChange();
  updatePreview();
  renderProducts();
  renderGallery();
  setupRevealTargets();
  applyTranslations(currentLang);
  updateConfiguratorUI();
});
