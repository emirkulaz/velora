const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

/**
 * Production shell: loads hosted VEXOR web (Railway HTTPS).
 * Priority: process.env.VELORA_APP_URL → baked app-config.cjs → app-url.local
 */
function resolveAppUrl() {
  const fromEnv = (process.env.VELORA_APP_URL || '').trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')

  try {
    const baked = require('./app-config.cjs')
    const fromBake = (baked.VELORA_APP_URL || '').trim()
    if (fromBake) return fromBake.replace(/\/$/, '')
  } catch {
    /* not generated yet */
  }

  try {
    const fs = require('fs')
    const local = path.join(__dirname, 'app-url.local')
    if (fs.existsSync(local)) {
      const line = fs.readFileSync(local, 'utf8').trim().split(/\r?\n/)[0]
      if (line) return line.replace(/\/$/, '')
    }
  } catch {
    /* ignore */
  }

  return ''
}

function createWindow() {
  const appUrl = resolveAppUrl()

  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    title: 'VEXOR',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)
    return { action: 'deny' }
  })

  if (!appUrl) {
    const help = encodeURIComponent(
      'VELORA_APP_URL tanımlı değil. Railway web HTTPS adresini ayarlayıp yeniden paketleyin.',
    )
    void win.loadURL(
      `data:text/html;charset=utf-8,` +
        `<!doctype html><html lang="tr"><body style="font-family:Segoe UI,sans-serif;padding:48px;background:#1a2332;color:#e2e8f0">` +
        `<h1 style="margin:0 0 12px">VEXOR</h1>` +
        `<p>Masaüstü kabuğu, barındırılan web adresine bağlanır.</p>` +
        `<pre style="background:#0f172a;padding:16px;border-radius:8px">set VELORA_APP_URL=https://YOUR-WEB.up.railway.app\nnpm run dist:win</pre>` +
        `<p style="opacity:.7">${help}</p></body></html>`,
    )
    return
  }

  void win.loadURL(appUrl)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
