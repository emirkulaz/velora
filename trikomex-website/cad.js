(function () {
  const RULER = 40;
  const PAD = 36;
  const BASE_W = 1400;
  const BASE_H = 780;

  let overlayCanvas;
  let overlayCtx;
  let pxPerCm = 20;
  let viewScale = 1;
  let band = { x: 0, y: 0, w: 0, h: 0, lengthCm: 42, widthCm: 3 };
  let measurePreview = null;
  let designHistory = [];
  let dragStart = null;

  function $(id) {
    return document.getElementById(id);
  }

  function getSnapCm() {
    return parseFloat($("snapSize")?.value || "0.5") || 0.5;
  }

  function snapValue(cm) {
    const s = getSnapCm();
    return Math.round(cm / s) * s;
  }

  function isMeterMode() {
    const fields = $("customMeterFields");
    return fields && !fields.hidden;
  }

  function isOrtho() {
    return !!$("orthoMode")?.checked;
  }

  function isGridOn() {
    return $("gridVisible") ? !!$("gridVisible").checked : true;
  }

  function getBandDims() {
    const widthCm = Math.min(6, Math.max(0.5, parseFloat($("productWidth")?.value) || 3));
    let lengthCm;
    if (isMeterMode()) {
      lengthCm = 20;
    } else {
      const raw = ($("productLength")?.value || "42").replace(/[^\d.]/g, "");
      lengthCm = parseFloat(raw) || 42;
    }
    return { lengthCm, widthCm };
  }

  function formatCm(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
  }

  function resizeCanvases() {
    const w = Math.round(BASE_W * viewScale);
    const h = Math.round(BASE_H * viewScale);
    [productCanvas, designCanvas, overlayCanvas].forEach(function (c) {
      if (!c) return;
      const keep = c === designCanvas ? designCtx.getImageData(0, 0, c.width, c.height) : null;
      const prevW = c.width;
      const prevH = c.height;
      c.width = w;
      c.height = h;
      if (keep && c === designCanvas) {
        designCtx.putImageData(keep, 0, 0);
        if (w !== prevW || h !== prevH) {
          /* bitmap stays top-left; acceptable for zoom of workspace */
        }
      }
    });
    productCtx = productCanvas.getContext("2d");
    designCtx = designCanvas.getContext("2d");
    overlayCtx = overlayCanvas.getContext("2d");
  }

  function computeLayout() {
    if (!productCanvas) return;
    const dims = getBandDims();
    band.lengthCm = dims.lengthCm;
    band.widthCm = dims.widthCm;

    const availW = productCanvas.width - RULER - PAD * 2;
    const availH = productCanvas.height - RULER - PAD * 2;
    pxPerCm = Math.min(availW / dims.lengthCm, availH / dims.widthCm) * 0.9;
    pxPerCm = Math.max(12, Math.min(pxPerCm, 48));

    band.w = dims.lengthCm * pxPerCm;
    band.h = dims.widthCm * pxPerCm;
    band.x = RULER + (productCanvas.width - RULER - band.w) / 2;
    band.y = RULER + (productCanvas.height - RULER - band.h) / 2;

    if ($("cadScaleLabel")) {
      $("cadScaleLabel").textContent = "ÉCHELLE 1 cm = " + pxPerCm.toFixed(1) + " px";
    }
    if ($("cadBandLabel")) {
      $("cadBandLabel").textContent = isMeterMode()
        ? "SEGMENT " + formatCm(dims.lengthCm) + " × " + formatCm(dims.widthCm) + " cm · AU MÈTRE"
        : "BANDE " + formatCm(dims.lengthCm) + " × " + formatCm(dims.widthCm) + " cm";
    }
    if ($("cadSnapLabel")) {
      const s = getSnapCm();
      $("cadSnapLabel").textContent = "SNAP " + (s < 1 ? s * 10 + " mm" : s + " cm");
    }
  }

  function pxToBandCm(x, y) {
    return { x: (x - band.x) / pxPerCm, y: (y - band.y) / pxPerCm };
  }

  function bandCmToPx(cmX, cmY) {
    return { x: band.x + cmX * pxPerCm, y: band.y + cmY * pxPerCm };
  }

  function snapPx(x, y) {
    const cm = pxToBandCm(x, y);
    return bandCmToPx(snapValue(cm.x), snapValue(cm.y));
  }

  function clampToBand(x, y) {
    return {
      x: Math.max(band.x, Math.min(band.x + band.w, x)),
      y: Math.max(band.y, Math.min(band.y + band.h, y))
    };
  }

  function applyOrtho(x, y) {
    if (!isOrtho() || !drawing) return { x: x, y: y };
    const dx = Math.abs(x - startX);
    const dy = Math.abs(y - startY);
    if (dx >= dy) return { x: x, y: startY };
    return { x: startX, y: y };
  }

  function drawRulers() {
    productCtx.fillStyle = "#1a2030";
    productCtx.fillRect(0, 0, productCanvas.width, RULER);
    productCtx.fillRect(0, 0, RULER, productCanvas.height);
    productCtx.fillStyle = "#232b3d";
    productCtx.fillRect(0, 0, RULER, RULER);
    productCtx.font = "600 10px 'IBM Plex Mono', monospace";

    for (let cm = Math.floor(-((band.x - RULER) / pxPerCm)); cm <= Math.ceil((productCanvas.width - band.x) / pxPerCm); cm++) {
      const x = band.x + cm * pxPerCm;
      if (x < RULER || x > productCanvas.width) continue;
      const major = cm % 5 === 0;
      productCtx.strokeStyle = major ? "#d4b56a" : "#6f7b90";
      productCtx.beginPath();
      productCtx.moveTo(x + 0.5, RULER - (major ? 16 : 9));
      productCtx.lineTo(x + 0.5, RULER);
      productCtx.stroke();
      if (major) {
        productCtx.fillStyle = "#e8edf5";
        productCtx.fillText(String(cm), x + 3, 13);
      }
      for (let mm = 1; mm < 10; mm++) {
        const mx = x + (mm / 10) * pxPerCm;
        if (mx < RULER || mx > productCanvas.width) continue;
        productCtx.strokeStyle = "rgba(111,123,144,0.55)";
        productCtx.beginPath();
        productCtx.moveTo(mx + 0.5, RULER - (mm === 5 ? 7 : 4));
        productCtx.lineTo(mx + 0.5, RULER);
        productCtx.stroke();
      }
    }

    for (let cm = Math.floor(-((band.y - RULER) / pxPerCm)); cm <= Math.ceil((productCanvas.height - band.y) / pxPerCm); cm++) {
      const y = band.y + cm * pxPerCm;
      if (y < RULER || y > productCanvas.height) continue;
      const major = cm % 5 === 0;
      productCtx.strokeStyle = major ? "#d4b56a" : "#6f7b90";
      productCtx.beginPath();
      productCtx.moveTo(RULER - (major ? 16 : 9), y + 0.5);
      productCtx.lineTo(RULER, y + 0.5);
      productCtx.stroke();
      if (major) {
        productCtx.save();
        productCtx.fillStyle = "#e8edf5";
        productCtx.translate(12, y - 3);
        productCtx.rotate(-Math.PI / 2);
        productCtx.fillText(String(cm), 0, 0);
        productCtx.restore();
      }
    }
  }

  function drawDimLine(x1, y1, x2, y2, label, ox, oy) {
    productCtx.strokeStyle = "#d4b56a";
    productCtx.fillStyle = "#d4b56a";
    productCtx.lineWidth = 1.25;
    productCtx.beginPath();
    productCtx.moveTo(x1, y1);
    productCtx.lineTo(x2, y2);
    productCtx.stroke();

    const size = 5;
    productCtx.beginPath();
    productCtx.moveTo(x1, y1);
    productCtx.lineTo(x1 + (x2 === x1 ? -size : size), y1 + (y2 === y1 ? -size : 0));
    productCtx.moveTo(x1, y1);
    productCtx.lineTo(x1 + (x2 === x1 ? size : size), y1 + (y2 === y1 ? size : 0));
    productCtx.stroke();

    productCtx.font = "600 11px 'IBM Plex Mono', monospace";
    productCtx.fillText(label, (x1 + x2) / 2 + ox, (y1 + y2) / 2 + oy);
  }

  function drawGridBackground() {
    if (!productCanvas || !productCtx) return;
    computeLayout();

    const w = productCanvas.width;
    const h = productCanvas.height;
    productCtx.clearRect(0, 0, w, h);
    productCtx.fillStyle = "#0c111a";
    productCtx.fillRect(0, 0, w, h);
    drawRulers();

    productCtx.fillStyle = "#121926";
    productCtx.fillRect(RULER, RULER, w - RULER, h - RULER);

    productCtx.save();
    productCtx.beginPath();
    productCtx.rect(RULER, RULER, w - RULER, h - RULER);
    productCtx.clip();

    if (isGridOn()) {
      const mm = pxPerCm / 10;
      for (let x = band.x; x <= band.x + band.w + 0.01; x += mm) {
        const idx = Math.round(((x - band.x) / pxPerCm) * 10) / 10;
        const isCm = Math.abs(idx - Math.round(idx)) < 0.001;
        const is5 = isCm && Math.round(idx) % 5 === 0;
        productCtx.beginPath();
        productCtx.moveTo(x + 0.5, RULER);
        productCtx.lineTo(x + 0.5, h);
        productCtx.strokeStyle = is5
          ? "rgba(212,181,106,0.28)"
          : isCm
            ? "rgba(120,140,170,0.22)"
            : "rgba(80,95,120,0.1)";
        productCtx.stroke();
      }
      for (let y = band.y; y <= band.y + band.h + 0.01; y += mm) {
        const idx = Math.round(((y - band.y) / pxPerCm) * 10) / 10;
        const isCm = Math.abs(idx - Math.round(idx)) < 0.001;
        const is5 = isCm && Math.round(idx) % 5 === 0;
        productCtx.beginPath();
        productCtx.moveTo(RULER, y + 0.5);
        productCtx.lineTo(w, y + 0.5);
        productCtx.strokeStyle = is5
          ? "rgba(212,181,106,0.28)"
          : isCm
            ? "rgba(120,140,170,0.22)"
            : "rgba(80,95,120,0.1)";
        productCtx.stroke();
      }
    }

    productCtx.fillStyle = "#f4f1ea";
    productCtx.strokeStyle = "#d4b56a";
    productCtx.lineWidth = 2;
    productCtx.shadowColor = "rgba(0,0,0,0.35)";
    productCtx.shadowBlur = 18;
    productCtx.fillRect(band.x, band.y, band.w, band.h);
    productCtx.shadowBlur = 0;
    productCtx.strokeRect(band.x + 0.5, band.y + 0.5, band.w - 1, band.h - 1);

    productCtx.fillStyle = "#d4b56a";
    productCtx.beginPath();
    productCtx.moveTo(band.x, band.y);
    productCtx.lineTo(band.x + 10, band.y);
    productCtx.lineTo(band.x, band.y + 10);
    productCtx.closePath();
    productCtx.fill();
    productCtx.fillStyle = "#3a4558";
    productCtx.font = "600 10px 'IBM Plex Mono', monospace";
    productCtx.fillText("0,0", band.x + 12, band.y + 12);

    productCtx.fillStyle = "rgba(17,24,39,0.55)";
    productCtx.font = "600 11px Manrope, sans-serif";
    productCtx.fillText("ZONE PRODUIT · ÉCHELLE RÉELLE", band.x + 14, band.y + band.h - 12);

    drawDimLine(band.x, band.y - 18, band.x + band.w, band.y - 18, formatCm(band.lengthCm) + " cm", -16, -5);
    drawDimLine(band.x + band.w + 16, band.y, band.x + band.w + 16, band.y + band.h, formatCm(band.widthCm) + " cm", 8, 4);

    productCtx.restore();
  }

  function clearOverlay() {
    if (!overlayCtx || !overlayCanvas) return;
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  }

  function drawOverlay(cursorX, cursorY) {
    if (!overlayCtx) return;
    clearOverlay();
    overlayCtx.save();
    overlayCtx.strokeStyle = "rgba(212,181,106,0.65)";
    overlayCtx.setLineDash([3, 4]);
    overlayCtx.beginPath();
    overlayCtx.moveTo(cursorX + 0.5, RULER);
    overlayCtx.lineTo(cursorX + 0.5, overlayCanvas.height);
    overlayCtx.moveTo(RULER, cursorY + 0.5);
    overlayCtx.lineTo(overlayCanvas.width, cursorY + 0.5);
    overlayCtx.stroke();
    overlayCtx.setLineDash([]);
    overlayCtx.fillStyle = "#d4b56a";
    overlayCtx.fillRect(cursorX - 3, cursorY - 3, 6, 6);

    if (measurePreview || (drawing && dragStart && currentTool !== "brush" && currentTool !== "eraser")) {
      const a = measurePreview || { x1: startX, y1: startY, x2: cursorX, y2: cursorY };
      overlayCtx.strokeStyle = currentTool === "measure" ? "#3dd6c6" : "rgba(96,165,250,0.9)";
      overlayCtx.lineWidth = 1.4;
      overlayCtx.beginPath();
      overlayCtx.moveTo(a.x1, a.y1);
      overlayCtx.lineTo(a.x2, a.y2);
      overlayCtx.stroke();

      const dx = (a.x2 - a.x1) / pxPerCm;
      const dy = (a.y2 - a.y1) / pxPerCm;
      const len = Math.sqrt(dx * dx + dy * dy);
      const label = formatCm(len) + " cm";
      overlayCtx.fillStyle = currentTool === "measure" ? "#3dd6c6" : "#93c5fd";
      overlayCtx.font = "600 12px 'IBM Plex Mono', monospace";
      overlayCtx.fillText(label, (a.x1 + a.x2) / 2 + 10, (a.y1 + a.y2) / 2 - 10);

      if ($("cadDelta")) {
        $("cadDelta").textContent =
          "ΔX " + formatCm(dx) + "   ΔY " + formatCm(dy) + "   L " + formatCm(len);
      }
      if (currentTool === "measure" && $("cadMeasureLabel")) {
        $("cadMeasureLabel").textContent = "COTE " + label;
      }
    }

    overlayCtx.restore();
  }

  function updateCoords(x, y) {
    const cm = pxToBandCm(x, y);
    if ($("cadCoords")) {
      $("cadCoords").textContent = "X " + formatCm(cm.x) + " cm  |  Y " + formatCm(cm.y) + " cm";
    }
  }

  function setActiveToolButton(tool) {
    document.querySelectorAll(".cad-icon-btn[data-tool]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-tool") === tool);
    });
  }

  function pushHistory() {
    if (!designCtx || !designCanvas) return;
    try {
      designHistory.push(designCtx.getImageData(0, 0, designCanvas.width, designCanvas.height));
      if (designHistory.length > 40) designHistory.shift();
    } catch (_e) { /* ignore */ }
  }

  window.undoCad = function undoCad() {
    if (!designHistory.length || !designCtx) return;
    designCtx.putImageData(designHistory.pop(), 0, 0);
  };

  window.setMeasureTool = function setMeasureTool() {
    currentTool = "measure";
    setActiveToolButton("measure");
  };

  window.fitCadView = function fitCadView() {
    viewScale = 1;
    const snapshot = designCanvas ? designCtx.getImageData(0, 0, designCanvas.width, designCanvas.height) : null;
    resizeCanvases();
    if (snapshot) designCtx.putImageData(snapshot, 0, 0);
    drawGridBackground();
  };

  window.cadZoom = function cadZoom(factor) {
    viewScale = Math.max(0.7, Math.min(1.8, viewScale * factor));
    const snapshot = designCtx.getImageData(0, 0, designCanvas.width, designCanvas.height);
    resizeCanvases();
    designCtx.putImageData(snapshot, 0, 0);
    drawGridBackground();
  };

  window.exportCadPng = async function exportCadPng() {
    const blob = await createDesignImageBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const name = ($("productName")?.value || "trikomex-design").replace(/\s+/g, "-");
    link.download = name + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  window.onCadPropsChange = function onCadPropsChange() {
    const name = $("productName")?.value || "Sans titre";
    if ($("cadDocTitle")) $("cadDocTitle").textContent = name.replace(/\s+/g, "_") + ".tkx";
    if (typeof updatePreview === "function") updatePreview();
    drawGridBackground();
  };

  function pointerPos(event, isTouch) {
    const rect = designCanvas.getBoundingClientRect();
    const src = isTouch ? event.touches[0] : event;
    return {
      x: (src.clientX - rect.left) * (designCanvas.width / rect.width),
      y: (src.clientY - rect.top) * (designCanvas.height / rect.height)
    };
  }

  function preparePoint(rawX, rawY) {
    let p = clampToBand(rawX, rawY);
    p = snapPx(p.x, p.y);
    p = applyOrtho(p.x, p.y);
    p = snapPx(p.x, p.y);
    return p;
  }

  window.startDraw = function startDraw(event) {
    if (!designCtx) return;
    drawing = true;
    const raw = pointerPos(event, false);
    const pos = preparePoint(raw.x, raw.y);
    startX = pos.x;
    startY = pos.y;
    dragStart = { x: startX, y: startY };
    pushHistory();
    savedCanvas = designCtx.getImageData(0, 0, designCanvas.width, designCanvas.height);
    if (currentTool === "measure") {
      measurePreview = { x1: startX, y1: startY, x2: startX, y2: startY };
    }
  };

  window.draw = function draw(event) {
    if (!designCtx) return;
    const raw = pointerPos(event, false);
    let pos = preparePoint(raw.x, raw.y);
    updateCoords(pos.x, pos.y);

    if (!drawing) {
      drawOverlay(pos.x, pos.y);
      return;
    }

    if (currentTool === "measure") {
      measurePreview = { x1: startX, y1: startY, x2: pos.x, y2: pos.y };
      drawOverlay(pos.x, pos.y);
      return;
    }

    drawOverlay(pos.x, pos.y);
    drawToolCad(pos.x, pos.y);
  };

  window.startDrawTouch = function startDrawTouch(event) {
    event.preventDefault();
    if (!designCtx) return;
    drawing = true;
    const raw = pointerPos(event, true);
    const pos = preparePoint(raw.x, raw.y);
    startX = pos.x;
    startY = pos.y;
    dragStart = { x: startX, y: startY };
    pushHistory();
    savedCanvas = designCtx.getImageData(0, 0, designCanvas.width, designCanvas.height);
    if (currentTool === "measure") {
      measurePreview = { x1: startX, y1: startY, x2: startX, y2: startY };
    }
  };

  window.drawTouch = function drawTouch(event) {
    event.preventDefault();
    if (!drawing || !designCtx) return;
    const raw = pointerPos(event, true);
    const pos = preparePoint(raw.x, raw.y);
    updateCoords(pos.x, pos.y);
    if (currentTool === "measure") {
      measurePreview = { x1: startX, y1: startY, x2: pos.x, y2: pos.y };
      drawOverlay(pos.x, pos.y);
      return;
    }
    drawOverlay(pos.x, pos.y);
    drawToolCad(pos.x, pos.y);
  };

  function drawToolCad(x, y) {
    const brushPx = Math.max(1, Number($("brushSize")?.value || 2));
    const color = $("drawColor")?.value || "#111827";

    designCtx.save();
    designCtx.beginPath();
    designCtx.rect(band.x, band.y, band.w, band.h);
    designCtx.clip();
    designCtx.lineWidth = brushPx;
    designCtx.lineCap = "round";
    designCtx.lineJoin = "round";

    if (currentTool === "eraser") {
      designCtx.globalCompositeOperation = "destination-out";
      designCtx.beginPath();
      designCtx.arc(x, y, brushPx * 1.6, 0, Math.PI * 2);
      designCtx.fill();
      designCtx.restore();
      return;
    }

    designCtx.globalCompositeOperation = "source-over";
    designCtx.strokeStyle = color;
    designCtx.fillStyle = color;

    if (currentTool === "brush") {
      designCtx.beginPath();
      designCtx.arc(x, y, brushPx / 2, 0, Math.PI * 2);
      designCtx.fill();
      designCtx.restore();
      return;
    }

    if (savedCanvas) designCtx.putImageData(savedCanvas, 0, 0);

    if (currentTool === "line") {
      designCtx.beginPath();
      designCtx.moveTo(startX, startY);
      designCtx.lineTo(x, y);
      designCtx.stroke();
    } else if (currentTool === "rectangle") {
      designCtx.strokeRect(startX, startY, x - startX, y - startY);
    } else if (currentTool === "circle") {
      const r = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
      designCtx.beginPath();
      designCtx.arc(startX, startY, r, 0, Math.PI * 2);
      designCtx.stroke();
    }

    designCtx.restore();
  }

  window.stopDraw = function stopDraw() {
    drawing = false;
    dragStart = null;
    measurePreview = null;
    clearOverlay();
    if ($("cadMeasureLabel")) $("cadMeasureLabel").textContent = "";
    if (designCtx) {
      designCtx.globalCompositeOperation = "source-over";
      designCtx.beginPath();
    }
  };

  ["setBrush", "setEraser", "setLineTool", "setRectangleTool", "setCircleTool"].forEach(function (name) {
    const original = window[name];
    window[name] = function () {
      if (typeof original === "function") original();
      setActiveToolButton({
        setBrush: "brush",
        setEraser: "eraser",
        setLineTool: "line",
        setRectangleTool: "rectangle",
        setCircleTool: "circle"
      }[name]);
    };
  });

  window.clearCanvas = function clearCanvas() {
    pushHistory();
    if (!designCtx || !designCanvas) return;
    designCtx.clearRect(0, 0, designCanvas.width, designCanvas.height);
  };

  window.drawGridBackground = drawGridBackground;

  window.updatePreview = function updatePreviewCad() {
    const name = $("productName")?.value?.trim() || "—";
    const category = $("productCategory")?.value || "—";
    const colors = $("productColors")?.value?.trim() || "—";
    const gauge = $("productGauge")?.value || "—";
    const material = $("productMaterial")?.value || "—";
    const quantity = $("productQuantity")?.value || "—";
    const width = $("productWidth")?.value || "—";
    const meterMode = isMeterMode();
    const size = meterMode
      ? width + " cm × " + ($("productMeters")?.value || "—") + " m"
      : width + " cm × " + ($("productLength")?.value || "—");

    if ($("previewName")) $("previewName").textContent = name;
    if ($("previewCategory")) $("previewCategory").textContent = category;
    if ($("previewColors")) $("previewColors").textContent = colors;
    if ($("previewGauge")) $("previewGauge").textContent = gauge;
    if ($("previewSize")) $("previewSize").textContent = size;
    if ($("previewMaterial")) $("previewMaterial").textContent = material;
    if ($("previewQuantity")) $("previewQuantity").textContent = quantity;
    if ($("cadDocTitle")) $("cadDocTitle").textContent = (name === "—" ? "Sans_titre" : name.replace(/\s+/g, "_")) + ".tkx";

    drawGridBackground();
  };

  window.previewImage = function previewImageCad(event) {
    const file = event.target.files[0];
    if (!file || !designCtx) return;
    const img = new Image();
    img.onload = function () {
      pushHistory();
      const scale = Math.min(band.w / img.width, band.h / img.height) * 0.82;
      const x = band.x + (band.w - img.width * scale) / 2;
      const y = band.y + (band.h - img.height * scale) / 2;
      designCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
    img.src = URL.createObjectURL(file);
  };

  window.createDesignImageBlob = function createDesignImageBlobCad() {
    return new Promise(function (resolve) {
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = Math.max(1, Math.round(band.w));
      finalCanvas.height = Math.max(1, Math.round(band.h));
      const finalCtx = finalCanvas.getContext("2d");
      finalCtx.fillStyle = "#ffffff";
      finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
      finalCtx.drawImage(productCanvas, band.x, band.y, band.w, band.h, 0, 0, finalCanvas.width, finalCanvas.height);
      finalCtx.drawImage(designCanvas, band.x, band.y, band.w, band.h, 0, 0, finalCanvas.width, finalCanvas.height);
      finalCanvas.toBlob(function (blob) { resolve(blob); }, "image/png");
    });
  };

  function bindUi() {
    $("snapSize")?.addEventListener("change", drawGridBackground);
    $("gridVisible")?.addEventListener("change", drawGridBackground);
    $("orthoMode")?.addEventListener("change", function () {
      if ($("cadSnapLabel")) {
        /* keep status fresh */
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.target && /input|textarea|select/i.test(event.target.tagName)) return;
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "z") {
        event.preventDefault();
        undoCad();
        return;
      }
      if (key === "b") setBrush();
      if (key === "l") setLineTool();
      if (key === "r") setRectangleTool();
      if (key === "c") setCircleTool();
      if (key === "m") setMeasureTool();
      if (key === "e") setEraser();
      if (key === "f") fitCadView();
      if (key === "o") {
        const box = $("orthoMode");
        if (box) box.checked = !box.checked;
      }
    });
  }

  function initCad() {
    productCanvas = $("productCanvas");
    designCanvas = $("designCanvas");
    overlayCanvas = $("overlayCanvas");
    if (!productCanvas || !designCanvas || !overlayCanvas) return;

    productCtx = productCanvas.getContext("2d");
    designCtx = designCanvas.getContext("2d");
    overlayCtx = overlayCanvas.getContext("2d");

    designCanvas.addEventListener("mousedown", startDraw);
    designCanvas.addEventListener("mousemove", draw);
    designCanvas.addEventListener("mouseup", stopDraw);
    designCanvas.addEventListener("mouseleave", function () {
      stopDraw();
      clearOverlay();
    });
    designCanvas.addEventListener("touchstart", startDrawTouch, { passive: false });
    designCanvas.addEventListener("touchmove", drawTouch, { passive: false });
    designCanvas.addEventListener("touchend", stopDraw);

    bindUi();
    if (typeof onCustomCategoryChange === "function") onCustomCategoryChange();
    designHistory = [];
    designCtx.clearRect(0, 0, designCanvas.width, designCanvas.height);
    drawGridBackground();
    if (typeof updatePreview === "function") updatePreview();
    onCadPropsChange();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCad);
  } else {
    initCad();
  }
})();
