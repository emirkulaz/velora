# VEXOR Project Instructions

## Product Vision

VEXOR, küçük ve orta ölçekli üretim işletmeleri için geliştirilen modern, çok şirketli ve AI-first bir ERP platformudur. İlk hedef sektör tekstil, ilk gerçek kullanıcı TRIKOMEX Textile ve ilk pazar Cezayir'dir.

VEXOR, DIA gibi yüzlerce ikon ve karmaşık menü içeren klasik ERP sistemlerini taklit etmemelidir. Kullanıcının ERP sistemini öğrenmesi yerine VEXOR kullanıcının doğal dildeki isteğini anlamalıdır.

Ana deneyim "VEXOR'a Sor" alanı etrafında kurulmalıdır. Kullanıcı şu tür komutlar verebilmelidir:

* Bugünkü üretimi özetle.
* Stoku azalan ürünleri göster.
* Ahmet Tekstil için 500 metre şerit siparişi oluştur.
* Geciken ödemeleri listele.
* Bu ay en çok satan ürünü göster.

AI, doğru ERP modülünü ve işlemini kendisi belirlemeli; veri değiştiren veya finansal sonuç doğuran işlemlerde uygulamadan önce kullanıcıdan açık onay almalıdır.

## Repository Structure

* `velora-api-v2`: NestJS, TypeScript, Prisma ve PostgreSQL backend.
* `velora-web`: Vite, React ve TypeScript frontend.

Bir görev yalnızca frontend ile ilgiliyse `velora-api-v2` dosyalarını değiştirme. Backend görevi değilse Prisma şemasına, migration dosyalarına ve `.env` dosyasına dokunma.

## MVP Scope

İlk 30 günlük MVP aşağıdaki alanlara odaklanır:

1. Şirket yönetimi
2. Kullanıcı girişi ve yetkilendirme
3. Müşteriler
4. Ürünler
5. Siparişler
6. Stok
7. Basit üretim takibi
8. Temel finans görünümü
9. AI komut alanı
10. Responsive web arayüzü

Kapsam dışı özellikleri kendiliğinden ekleme.

## UX Principles

* Arayüz sade, modern, zarif ve kurumsal olmalıdır.
* DIA benzeri ikon ve modül kalabalığı oluşturma.
* Kullanıcının en önemli bilgiye en az tıklamayla ulaşmasını sağla.
* AI komut alanını ürünün merkezinde tut.
* Kritik uyarıları ve yapılması gereken işleri öne çıkar.
* Masaüstü, tablet ve telefon ekranlarında responsive çalış.
* Kullanıcı telefondaki web tarayıcısından bütün temel işlemleri yapabilmelidir.
* TRIKOMEX örneklerinde para birimi DZD, saat dilimi Africa/Algiers olmalıdır.
* Arayüz metinleri şimdilik Türkçe olabilir; ileride Fransızca, Arapça ve İngilizce desteğine uygun yapı kur.

## Architecture Rules

* Bütün işletme verileri bir `companyId` üzerinden şirkete bağlı olmalıdır.
* Şirketler birbirlerinin verilerini kesinlikle görememelidir.
* Backend katmanları controller, service, DTO ve Prisma sorumluluklarını ayırmalıdır.
* Veri erişimi PrismaService üzerinden yapılmalıdır.
* API adreslerini bileşenlerin içine dağınık biçimde yazma; merkezi bir API katmanı kullan.
* TypeScript tip güvenliğini koru. Gereksiz `any` kullanma.
* Tekrarlanan arayüzleri yeniden kullanılabilir React bileşenlerine ayır.
* Gizli bilgileri koda yazma ve `.env` içeriğini gösterme.
* Gereksiz bağımlılık yükleme.
* Şimdilik masaüstü paketleme teknolojisi ekleme. Önce çalışan responsive web MVP'yi tamamla.

## AI Safety Rules

* AI öneri sunabilir, rapor oluşturabilir ve form hazırlayabilir.
* Silme, ödeme, stok düzeltme, sipariş onayı ve finansal kayıt gibi kritik işlemleri kullanıcı onayı olmadan gerçekleştiremez.
* AI cevabında kullandığı ERP verilerinin kaynağı ve tarihi anlaşılır olmalıdır.
* AI emin olmadığı bilgiyi gerçekmiş gibi göstermemelidir.
* Şirketler arası veri sızıntısına izin verilmemelidir.

## Development Workflow

Her görevde:

1. İlgili dosyaları önce incele.
2. Yapacağın değişikliği 3–5 maddelik kısa bir planla açıkla.
3. Yalnızca görevle ilgili dosyaları değiştir.
4. Mevcut ve alakasız kodu silme veya yeniden yazma.
5. Veritabanını sıfırlama, migration silme veya toplu dosya silme gibi yıkıcı işlemleri açık kullanıcı onayı olmadan yapma.
6. Frontend değişikliklerinden sonra `npm run build` çalıştır.
7. Backend değişikliklerinden sonra `npx tsc --noEmit` çalıştır.
8. Test başarısız olursa hatayı gizleme; nedenini ve hangi dosyada olduğunu belirt.
9. Tamamlandığında değiştirilen dosyaları ve doğrulama sonucunu kısa biçimde özetle.

## Communication

Kullanıcıya Türkçe, kısa ve anlaşılır şekilde cevap ver. Teknik terimleri gerektiğinde basit metaforlarla açıkla. Kod isimleri ve dosya isimleri İngilizce kalmalıdır. Aynı hata üzerinde gereksiz yere dönmek yerine çalışan özelliği ilerletmeye öncelik ver.
