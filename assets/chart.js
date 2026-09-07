/* ═══════════════════════════════════════════════════════════════════
   Coastal Electric — hero chart graphic.

   Draws bathymetric depth contours: the nautical chart that gives the
   company its name, doubling as current flowing left to right. Curves
   are generated from a seeded sum of sines, so the drawing is stable
   across reloads but never hand-authored path data.

   Colors are read from the stylesheet's custom properties, so the
   graphic follows light/dark like everything else on the page.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var canvas = document.getElementById('chart');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  /* deterministic PRNG (mulberry32) — same drawing every load */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function token(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  /* Build one contour line as a sum of three sines. Amplitudes and
     phases come from the seeded generator, so each band differs while
     the family stays coherent. */
  function band(random) {
    return {
      a1: 0.26 + random() * 0.5,
      a2: 0.14 + random() * 0.32,
      a3: 0.05 + random() * 0.16,
      f1: 0.9 + random() * 0.7,
      f2: 1.9 + random() * 1.3,
      f3: 3.4 + random() * 2.2,
      p1: random() * Math.PI * 2,
      p2: random() * Math.PI * 2,
      p3: random() * Math.PI * 2
    };
  }

  var BANDS = 26;
  var bands = (function () {
    var random = rng(20260906);
    var out = [];
    for (var i = 0; i < BANDS; i++) out.push(band(random));
    return out;
  })();

  function draw() {
    var rect = canvas.getBoundingClientRect();
    var w = Math.max(1, Math.round(rect.width));
    var h = Math.max(1, Math.round(rect.height));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var teal = token('--teal', '#12626F');
    var bright = token('--teal-bright', '#1B8395');
    var amber = token('--amber', '#B8801E');

    /* vertical amplitude scales with height so the family holds its
       shape from phone to ultrawide */
    var amp = h * 0.052;
    var step = h / (BANDS - 6);
    var startY = -step * 2.2;
    var segments = Math.max(48, Math.min(240, Math.round(w / 7)));

    ctx.lineCap = 'round';

    for (var i = 0; i < BANDS; i++) {
      var b = bands[i];
      var baseY = startY + i * step;

      /* depth reads darker/denser toward the bottom of the chart */
      var t = i / (BANDS - 1);
      var isCurrent = (i % 7 === 3);

      ctx.beginPath();
      for (var s = 0; s <= segments; s++) {
        var x = (s / segments) * w;
        var u = (s / segments) * Math.PI * 2;
        var y = baseY
          + Math.sin(u * b.f1 + b.p1) * amp * b.a1
          + Math.sin(u * b.f2 + b.p2) * amp * b.a2
          + Math.sin(u * b.f3 + b.p3) * amp * b.a3;
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }

      if (isCurrent) {
        ctx.strokeStyle = amber;
        ctx.globalAlpha = 0.20 + t * 0.16;
        ctx.lineWidth = 1.5;
      } else {
        ctx.strokeStyle = (i % 3 === 0) ? bright : teal;
        ctx.globalAlpha = 0.16 + t * 0.44;
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    }

    /* sounding marks — the small depth figures on a real chart, here as
       sparse dots so they read as texture rather than fake numbers */
    var random = rng(778101);
    ctx.globalAlpha = 1;
    for (var k = 0; k < 46; k++) {
      var px = random() * w;
      var py = random() * h;
      ctx.beginPath();
      ctx.arc(px, py, 1.05, 0, Math.PI * 2);
      ctx.fillStyle = bright;
      ctx.globalAlpha = 0.10 + random() * 0.22;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  var pending = null;
  function schedule() {
    if (pending) cancelAnimationFrame(pending);
    pending = requestAnimationFrame(function () { pending = null; draw(); });
  }

  draw();

  /* redraw on resize, and whenever the theme changes under us */
  window.addEventListener('resize', schedule);
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', schedule);
    else if (mq.addListener) mq.addListener(schedule);
  }
  if (window.MutationObserver) {
    new MutationObserver(schedule).observe(document.documentElement, {
      attributes: true, attributeFilter: ['data-theme']
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
})();
