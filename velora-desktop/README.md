# VEXOR Desktop (Electron)

İnce Windows kabuğu: pencere, Railway’deki **HTTPS web** URL’sini açar. API Railway’de kalır; `.exe` içinde veritabanı veya secret yoktur.

## Gereksinimler

- Node.js 20+
- Windows (NSIS `.exe` için)
- Çalışan VEXOR Web HTTPS adresi (`RAILWAY.md`)

## Kurulum

```powershell
cd C:\Users\kanar\Desktop\Velora\velora-desktop
npm install
```

İkon: `build/icon.png` (repoda `velora-web/public/pwa-512.png` kopyası).

## Geliştirme

```powershell
$env:VELORA_APP_URL="https://YOUR-WEB.up.railway.app"
npm start
```

## Windows kurulum dosyası (.exe)

```powershell
cd C:\Users\kanar\Desktop\Velora\velora-desktop
$env:VELORA_APP_URL="https://YOUR-WEB.up.railway.app"
npm run dist:win
```

Çıktı (git’e ekleme):

- `release/VEXOR-Setup-1.0.0.exe` — NSIS kurucu
- `release/win-unpacked/` — taşınabilir klasör

`VELORA_APP_URL` paketleme sırasında `app-config.cjs` içine yazılır (yalnızca public URL).

## Notlar

- Büyük `release/` ve `node_modules/` commit edilmez (`.gitignore`).
- URL değişince `dist:win` yeniden çalıştır.
- PWA alternatifi: tarayıcıda HTTPS aç → **Uygulamayı yükle**.
