# VEXOR ürün sitesi

Tanıtım / marketing sayfası (ERP uygulaması değil). `velora-web` ile ayrı paket.

## Yerel çalıştırma

```bash
cd velora-website
npm install
npm run dev
```

Tarayıcıda Vite’nin verdiği adres (genelde `http://localhost:5173`).

## Üretim derlemesi

```bash
npm run build
npm run preview
```

## Yapılandırma

| Değişken / sabit | Dosya | Açıklama |
| --- | --- | --- |
| `CONTACT_MAIL` | `src/App.tsx` | Demo / iletişim `mailto:` |
| `VITE_APP_URL` | `.env` (opsiyonel) | “Uygulamaya gir” butonu için ERP URL |

İsteğe bağlı `.env` örneği:

```env
VITE_APP_URL=https://app.ornek.com
```
