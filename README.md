# VEXOR ERP

VEXOR, tekstil ve triko üretim işletmeleri için geliştirilen çok şirketli, AI-first bir ERP MVP’sidir. İlk pilot şirket TRIKOMEX Textile’dir.

## Mimari

| Katman | Konum | Teknoloji |
| --- | --- | --- |
| Web uygulaması | `velora-web` | React, Vite, TypeScript, PWA |
| API | `velora-api-v2` | NestJS, Prisma, PostgreSQL |

İşletme verileri API katmanında `companyId` ile izole edilir. Web uygulaması API’ye `/api` proxy’si üzerinden bağlanır.

## Yerelde çalıştırma

Gereksinimler:

- Node.js 20+
- PostgreSQL
- API için yapılandırılmış yerel ortam değişkenleri

İki ayrı terminal açın.

### 1. API

```powershell
cd velora-api-v2
npm install
npx prisma generate
npm run start
```

API sağlık kontrolü: `http://localhost:3001/health`

### 2. Web uygulaması

```powershell
cd velora-web
npm install
npm run dev
```

Vite terminalinde gösterilen `Local` adresini açın. Varsayılan port `5173`’tür; doluysa Vite sonraki boş portu seçer.

## Tarayıcıdan uygulama olarak kurma (PWA)

1. Chrome veya Edge’de **HTTPS** VEXOR adresini açın (Railway: `RAILWAY.md`).
2. Giriş ekranı / üst bardaki **Uygulamayı yükle** düğmesine tıklayın (veya tarayıcı menüsü).
3. Kurulum istemini onaylayın — masaüstü ikonu `standalone` PWA olarak gelir.

HTTP veya localhost dışında HTTPS şarttır. İpucu metni prompt yoksa da görünür.

## Railway HTTPS

Adımlar ve env listesi: [`RAILWAY.md`](./RAILWAY.md) · yerel Docker pilot: [`PILOT-DEPLOY.md`](./PILOT-DEPLOY.md)

## Windows .exe (Electron)

İnce kabuk — Railway web URL’sini açar (`velora-desktop/`):

```powershell
cd velora-desktop
npm install
$env:VELORA_APP_URL="https://YOUR-WEB.up.railway.app"
npm run dist:win
```

Çıktı: `velora-desktop/release/VEXOR-Setup-*.exe` (commit edilmez).

## Doğrulama

```powershell
# API
cd velora-api-v2
npx tsc --noEmit
npm test -- --runInBand

# Web
cd velora-web
npm run build
npm test -- --run
```

## Operasyon güvenliği

- Parola, JWT veya `.env` içeriğini kaynak koda ve dokümana yazmayın.
- Migration, seed veya veri silme komutlarını production ortamında açık onay olmadan çalıştırmayın.
- Finansal, stok ve sipariş işlemlerinde API hata mesajlarını kontrol edin; başarısız işlem için UI başarısı varsaymayın.

## Lisans

Bu depo özel VEXOR çalışması içindir.
