import { useEffect, useRef } from 'react'

/** İletişim — gerçek adresi buradan güncelleyin */
const CONTACT_MAIL =
  'mailto:hello@velora.app?subject=VEXOR%20demo%20talebi&body=Merhaba%2C%20VEXOR%20hakk%C4%B1nda%20bilgi%20ve%20demo%20almak%20istiyorum.'

/** ERP uygulaması URL’i (boş bırakılırsa CTA yalnızca iletişime gider) */
const APP_URL = import.meta.env.VITE_APP_URL as string | undefined

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const nodes = root.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!nodes.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return rootRef
}

export default function App() {
  const siteRef = useReveal()

  return (
    <div className="site" ref={siteRef}>
      <header className="topbar">
        <a className="topbar__brand" href="#top" aria-label="VEXOR ana sayfa">
          <span className="topbar__mark" aria-hidden="true" />
          VEXOR
        </a>
        <nav className="topbar__nav" aria-label="Ana menü">
          <a href="#yaklasim">Yaklaşım</a>
          <a href="#sor">VEXOR&apos;a Sor</a>
          <a href="#kapsam">Kapsam</a>
          <a href="#guven">Güven</a>
          <a className="topbar__cta" href={CONTACT_MAIL}>
            Demo isteyin
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-brand">
          <div className="hero__media" role="img" aria-label="Tekstil üretim ortamı" />
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__content">
            <h1 id="hero-brand" className="hero__brand">
              VEXOR
            </h1>
            <p className="hero__headline">ERP’yi öğrenmeyin. İşinizi söyleyin.</p>
            <p className="hero__lede">
              Üretim işletmeleri için sade, AI-first operasyon platformu — ilk odak tekstil.
            </p>
            <div className="hero__actions">
              <a className="btn btn--solid" href={CONTACT_MAIL}>
                Demo isteyin
              </a>
              <a className="btn btn--ghost" href="#sor">
                Nasıl çalışır?
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="yaklasim" aria-labelledby="yaklasim-title">
          <div data-reveal>
            <p className="section__label">Yaklaşım</p>
            <h2 id="yaklasim-title" className="section__title">
              Yüzlerce ikon değil, tek net akış.
            </h2>
            <p className="section__text">
              Klasik ERP menü labirentidir. VEXOR; müşteri, stok, sipariş, üretim ve
              finansı şirket sınırlarıyla güvende tutar — arayüzü işin ritmine göre sade
              bırakır.
            </p>
          </div>
          <div className="compare" data-reveal>
            <div className="compare__col compare__col--muted">
              <h3>Klasik ERP</h3>
              <p>Modül kalabalığı, uzun eğitim, her işlem için doğru ekranı aramak.</p>
            </div>
            <div className="compare__col">
              <h3>VEXOR</h3>
              <p>
                Görev odaklı ekranlar, kritik uyarılar önde, veri değiştiren adımlarda açık
                onay.
              </p>
            </div>
          </div>
        </section>

        <section className="section--band" id="sor" aria-labelledby="sor-title">
          <div className="section__inner" data-reveal>
            <p className="section__label">Merkez</p>
            <h2 id="sor-title" className="section__title">
              VEXOR&apos;a Sor
            </h2>
            <p className="section__text">
              Doğal dilde sorun; doğru modül ve işlem kendisi belirsin. Silme, ödeme, stok
              düzeltme veya sipariş onayı gibi kritik adımlarda VEXOR önce sizden onay
              ister.
            </p>
            <ul className="ask-examples" aria-label="Örnek komutlar">
              <li>Bugünkü üretimi özetle.</li>
              <li>Stoku azalan ürünleri göster.</li>
              <li>Geciken ödemeleri listele.</li>
            </ul>
          </div>
        </section>

        <section className="section" id="kapsam" aria-labelledby="kapsam-title">
          <div data-reveal>
            <p className="section__label">Kapsam</p>
            <h2 id="kapsam-title" className="section__title">
              Pilot için sağlam omurga.
            </h2>
            <p className="section__text">
              Çok şirketli yapı. Her kayıt bir şirkete bağlıdır; şirketler birbirinin
              verisini görmez.
            </p>
          </div>
          <ul className="capabilities" data-reveal>
            <li>
              <strong>Şirket &amp; ekip</strong>
              <span>Kullanıcılar, roller, güvenli giriş</span>
            </li>
            <li>
              <strong>Müşteri &amp; talep</strong>
              <span>Görüşme kaydı, siparişe dönüşüm</span>
            </li>
            <li>
              <strong>Ürün &amp; stok</strong>
              <span>Depo bakiyeleri, hareketler</span>
            </li>
            <li>
              <strong>Sipariş &amp; üretim</strong>
              <span>Teslimat ve hat görünümü</span>
            </li>
            <li>
              <strong>Finans</strong>
              <span>Kasa, cari, bilgilendirme kurları</span>
            </li>
            <li>
              <strong>AI komut alanı</strong>
              <span>ERP soruları ve kontrollü işlem önerileri</span>
            </li>
          </ul>
        </section>

        <section className="section--band" id="guven" aria-labelledby="guven-title">
          <div className="section__inner" data-reveal>
            <p className="section__label">Güven &amp; pazar</p>
            <h2 id="guven-title" className="section__title">
              Gerçek üretim temposuna göre tasarlandı.
            </h2>
            <p className="section__text">
              İlk sektör tekstil; ilk pazar Cezayir. Operasyon dili DZD ve Africa/Algiers
              saat dilimine uygun. Arayüz şimdilik Türkçe; Fransızca, Arapça ve İngilizce
              için yapı hazır.
            </p>
            <dl className="meta-row">
              <div>
                <dt>Para birimi</dt>
                <dd>DZD</dd>
              </div>
              <div>
                <dt>Saat dilimi</dt>
                <dd>Africa/Algiers</dd>
              </div>
              <div>
                <dt>Deneyim</dt>
                <dd>Responsive web &amp; PWA</dd>
              </div>
              <div>
                <dt>İzolasyon</dt>
                <dd>companyId sınırlı veri</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section closing" id="iletisim" aria-labelledby="cta-title">
          <div data-reveal>
            <p className="section__label">Sonraki adım</p>
            <h2 id="cta-title" className="section__title">
              Üretiminizi VEXOR ile sadeleştirin.
            </h2>
            <p className="section__text">
              Demo veya pilot konuşması için yazın. Gerçek şirket veriniz izinsiz
              taşınmaz; kritik işlemler her zaman onayınızla ilerler.
            </p>
            <div className="hero__actions">
              <a className="btn btn--accent" href={CONTACT_MAIL}>
                hello@velora.app
              </a>
              {APP_URL ? (
                <a className="btn btn--outline" href={APP_URL}>
                  Uygulamaya gir
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p>
            <strong>VEXOR</strong>
            <span className="footer__sep">·</span>
            AI-first ERP
          </p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
