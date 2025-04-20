import { r as o, R as X, G as A, O as Y, S as O, a as N, D as V, C as J, b as $, A as Q, V as y, I as Z, E as z, c as ee } from "./babylon.js";
(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]'))
    a(l);
  new MutationObserver((l) => {
    for (const s of l)
      if (s.type === "childList")
        for (const r of s.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && a(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const s = {};
    return l.integrity && (s.integrity = l.integrity), l.referrerPolicy && (s.referrerPolicy = l.referrerPolicy), l.crossOrigin === "use-credentials" ? s.credentials = "include" : l.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
  }
  function a(l) {
    if (l.ep)
      return;
    l.ep = !0;
    const s = n(l);
    fetch(l.href, s);
  }
})();
function te() {
  o("EXT_lights_image_based", !0, async (t) => {
    const { EXT_lights_image_based: e } = await import("./babylon.js").then((n) => n.d);
    return new e(t);
  }), o("EXT_mesh_gpu_instancing", !0, async (t) => {
    const { EXT_mesh_gpu_instancing: e } = await import("./babylon.js").then((n) => n.e);
    return new e(t);
  }), o("EXT_meshopt_compression", !0, async (t) => {
    const { EXT_meshopt_compression: e } = await import("./babylon.js").then((n) => n.f);
    return new e(t);
  }), o("EXT_texture_avif", !0, async (t) => {
    const { EXT_texture_avif: e } = await import("./babylon.js").then((n) => n.h);
    return new e(t);
  }), o("EXT_texture_webp", !0, async (t) => {
    const { EXT_texture_webp: e } = await import("./babylon.js").then((n) => n.i);
    return new e(t);
  }), o("ExtrasAsMetadata", !1, async (t) => {
    const { ExtrasAsMetadata: e } = await import("./babylon.js").then((n) => n.j);
    return new e(t);
  }), o("KHR_animation_pointer", !0, async (t) => {
    const { KHR_animation_pointer: e } = await import("./babylon.js").then((n) => n.K);
    return new e(t);
  }), o("KHR_draco_mesh_compression", !0, async (t) => {
    const { KHR_draco_mesh_compression: e } = await import("./babylon.js").then((n) => n.k);
    return new e(t);
  }), o("KHR_interactivity", !0, async (t) => {
    const { KHR_interactivity: e } = await import("./babylon.js").then((n) => n.l);
    return new e(t);
  }), o("KHR_lights_punctual", !0, async (t) => {
    const { KHR_lights: e } = await import("./babylon.js").then((n) => n.m);
    return new e(t);
  }), o("EXT_lights_ies", !0, async (t) => {
    const { EXT_lights_ies: e } = await import("./babylon.js").then((n) => n.n);
    return new e(t);
  }), o("KHR_materials_anisotropy", !0, async (t) => {
    const { KHR_materials_anisotropy: e } = await import("./babylon.js").then((n) => n.o);
    return new e(t);
  }), o("KHR_materials_clearcoat", !0, async (t) => {
    const { KHR_materials_clearcoat: e } = await import("./babylon.js").then((n) => n.p);
    return new e(t);
  }), o("KHR_materials_diffuse_transmission", !0, async (t) => {
    const { KHR_materials_diffuse_transmission: e } = await import("./babylon.js").then((n) => n.q);
    return new e(t);
  }), o("KHR_materials_dispersion", !0, async (t) => {
    const { KHR_materials_dispersion: e } = await import("./babylon.js").then((n) => n.s);
    return new e(t);
  }), o("KHR_materials_emissive_strength", !0, async (t) => {
    const { KHR_materials_emissive_strength: e } = await import("./babylon.js").then((n) => n.t);
    return new e(t);
  }), o("KHR_materials_ior", !0, async (t) => {
    const { KHR_materials_ior: e } = await import("./babylon.js").then((n) => n.u);
    return new e(t);
  }), o("KHR_materials_iridescence", !0, async (t) => {
    const { KHR_materials_iridescence: e } = await import("./babylon.js").then((n) => n.v);
    return new e(t);
  }), o("KHR_materials_pbrSpecularGlossiness", !0, async (t) => {
    const { KHR_materials_pbrSpecularGlossiness: e } = await import("./babylon.js").then((n) => n.w);
    return new e(t);
  }), o("KHR_materials_sheen", !0, async (t) => {
    const { KHR_materials_sheen: e } = await import("./babylon.js").then((n) => n.x);
    return new e(t);
  }), o("KHR_materials_specular", !0, async (t) => {
    const { KHR_materials_specular: e } = await import("./babylon.js").then((n) => n.y);
    return new e(t);
  }), o("KHR_materials_transmission", !0, async (t) => {
    const { KHR_materials_transmission: e } = await import("./babylon.js").then((n) => n.z);
    return new e(t);
  }), o("KHR_materials_unlit", !0, async (t) => {
    const { KHR_materials_unlit: e } = await import("./babylon.js").then((n) => n.B);
    return new e(t);
  }), o("KHR_materials_variants", !0, async (t) => {
    const { KHR_materials_variants: e } = await import("./babylon.js").then((n) => n.F);
    return new e(t);
  }), o("KHR_materials_volume", !0, async (t) => {
    const { KHR_materials_volume: e } = await import("./babylon.js").then((n) => n.H);
    return new e(t);
  }), o("KHR_mesh_quantization", !0, async (t) => {
    const { KHR_mesh_quantization: e } = await import("./babylon.js").then((n) => n.J);
    return new e(t);
  }), o("KHR_texture_basisu", !0, async (t) => {
    const { KHR_texture_basisu: e } = await import("./babylon.js").then((n) => n.L);
    return new e(t);
  }), o("KHR_texture_transform", !0, async (t) => {
    const { KHR_texture_transform: e } = await import("./babylon.js").then((n) => n.M);
    return new e(t);
  }), o("KHR_xmp_json_ld", !0, async (t) => {
    const { KHR_xmp_json_ld: e } = await import("./babylon.js").then((n) => n.N);
    return new e(t);
  }), o("MSFT_audio_emitter", !0, async (t) => {
    const { MSFT_audio_emitter: e } = await import("./babylon.js").then((n) => n.P);
    return new e(t);
  }), o("MSFT_lod", !0, async (t) => {
    const { MSFT_lod: e } = await import("./babylon.js").then((n) => n.Q);
    return new e(t);
  }), o("MSFT_minecraftMesh", !0, async (t) => {
    const { MSFT_minecraftMesh: e } = await import("./babylon.js").then((n) => n.T);
    return new e(t);
  }), o("MSFT_sRGBFactors", !0, async (t) => {
    const { MSFT_sRGBFactors: e } = await import("./babylon.js").then((n) => n.U);
    return new e(t);
  }), o("KHR_node_visibility", !0, async (t) => {
    const { KHR_node_visibility: e } = await import("./babylon.js").then((n) => n.W);
    return new e(t);
  }), o("KHR_node_hoverability", !0, async (t) => {
    const { KHR_node_hoverability: e } = await import("./babylon.js").then((n) => n.X);
    return new e(t);
  }), o("KHR_node_selectability", !0, async (t) => {
    const { KHR_node_selectability: e } = await import("./babylon.js").then((n) => n.Y);
    return new e(t);
  });
}
function ne() {
  X({
    ...A,
    createPlugin: async (t) => {
      const { GLTFFileLoader: e } = await import("./babylon.js").then((n) => n.g);
      return new e(t[A.name]);
    }
  }), te(), X({
    ...Y,
    createPlugin: async (t) => {
      const { OBJFileLoader: e } = await import("./babylon.js").then((n) => n.Z);
      return new e(t[Y.name]);
    }
  }), X({
    ...O,
    createPlugin: async (t) => {
      const { SPLATFileLoader: e } = await import("./babylon.js").then((n) => n._);
      return new e(t[O.name]);
    }
  }), X({
    ...N,
    createPlugin: async () => {
      const { STLFileLoader: t } = await import("./babylon.js").then((e) => e.$);
      return new t();
    }
  });
}
ne();
let u = null;
{
  let t = function() {
    u.width = a.videoWidth, u.height = a.videoHeight, u.getContext("2d").drawImage(a, 0, 0, u.width, u.height), P != null && cancelAnimationFrame(P), P = requestAnimationFrame(() => {
      t();
    });
  }, e = function(r) {
    a.srcObject = r, M != null && cancelAnimationFrame(M), M = requestAnimationFrame(() => {
      t();
    });
  }, n = function(r) {
    console.log("navigator.MediaDevices.getUserMedia error: ", r.message, r.name);
  };
  const a = document.createElement("video");
  a.setAttribute("autoplay", String(!0)), a.setAttribute("playsinline", String(!0)), document.body.appendChild(a), a.style.display = "none", u = document.createElement("canvas"), window.document.getElementById("videoScreen").appendChild(u);
  const s = {
    audio: !1,
    video: !0
  };
  navigator.mediaDevices.getUserMedia(s).then(e).catch(n);
}
const m = document.getElementById("renderCanvas");
let p = null, x = null, C = null, d, M = null, P = null;
function T() {
  M != null && cancelAnimationFrame(M), M = requestAnimationFrame(() => {
    C != null && C.activeCamera && C.render(!1, !0);
  });
}
const ie = new V(m, "Loading", "black"), D = function() {
  return new z(m, !0, {
    preserveDrawingBuffer: !0,
    stencil: !0,
    disableWebGL2Support: !1
  });
}, re = function() {
  const t = new $(p), e = new Q("Camera", -Math.PI / 2, Math.PI / 2, 10, new y(0, 0, 0), t);
  e.useFramingBehavior = !0, e.framingBehavior != null && (e.framingBehavior.framingTime = 0, e.framingBehavior.autoCorrectCameraLimitsAndSensibility = !1), Z(
    document.getElementById("splat_url").value,
    t
  ).then((f) => {
    d = f.meshes[0], p.hideLoadingUI(), T();
  });
  const n = document.getElementById("screenshotBtn");
  n != null && n.addEventListener("click", async () => {
    d && await ge(t, d, "splat.png");
  });
  const a = document.documentElement, l = document.getElementById("fullscreenBtn");
  let s = !1;
  l != null && l.addEventListener("click", async () => {
    s ? i() : r();
  });
  function r() {
    s = !0, a.requestFullscreen ? a.requestFullscreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen();
  }
  function i() {
    s = !1, document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
  }
  return t.onDispose = function() {
    m.onpointerdown = null, m.onpointermove = null, m.onpointerup = null, m.onpointercancel = null, m.onpointerout = null, m.onpointerleave = null;
  }, de(), t;
};
let F = 3, L = 0, S = 0;
function ae() {
  const t = x.pointerX - L, e = x.pointerY - S;
  switch (F) {
    case 0:
      d.position.x -= -t * 0.01, d.position.y -= e * 0.01;
      break;
    case 2:
      d.rotation.y -= t * 0.01, d.rotation.x -= e * 0.01;
      break;
    case 1:
      d.scaling.y -= e * 0.01, d.scaling.x -= e * 0.01, d.scaling.z -= e * 0.01;
      break;
  }
  L = x.pointerX, S = x.pointerY, T();
}
function oe(t) {
  switch (L = x.pointerX, S = x.pointerY, t.button) {
    case 0:
      console.log("Left button clicked."), F = 0;
      break;
    case 1:
      console.log("Middle button clicked."), F = 1;
      break;
    case 2:
      console.log("Right button clicked."), F = 2;
      break;
  }
}
function se() {
  F = 3;
}
const c = new Array();
let K = -1;
function ce(t) {
  c.push(t), c.length == 1 ? oe(t) : c.length == 3 && (L = (c[2].clientX + c[1].clientX + c[0].clientX) / 2, S = (c[2].clientY + c[1].clientY + c[0].clientY) / 2);
}
function le(t) {
  for (let e = 0; e < c.length; e++)
    if (t.pointerId == c[e].pointerId) {
      c[e] = t;
      break;
    }
  if (c.length == 1)
    ae();
  else if (c.length == 3) {
    const e = (c[2].clientX + c[1].clientX + c[0].clientX) / 2, n = (c[2].clientY + c[1].clientY + c[0].clientY) / 2, a = e - L, l = n - S;
    d.rotation.y -= a * 1e-3, d.rotation.x -= l * 1e-3, T();
  } else if (c.length == 2) {
    const e = Math.sqrt(
      Math.pow(c[1].clientX - c[0].clientX, 2) + Math.pow(c[1].clientY - c[0].clientY, 2)
    );
    K > 0 && (d.scaling.y += (e - K) * 0.01, d.scaling.x += (e - K) * 0.01, d.scaling.z += (e - K) * 0.01), T(), K = e;
  }
}
function B(t) {
  ue(t), c.length < 3 && (K = -1), c.length == 1 && se();
}
function ue(t) {
  for (let e = 0; e < c.length; e++)
    if (c[e].pointerId == t.pointerId) {
      c.splice(e, 1);
      break;
    }
}
function de() {
  m.onpointerdown = ce, m.onpointermove = le, m.onpointerup = B, m.onpointercancel = B, m.onpointerout = B, m.onpointerleave = B;
}
async function me() {
  var n;
  p = await async function() {
    try {
      return D();
    } catch {
      return console.log(
        "the available createEngine function failed. Creating the default engine instead"
      ), D();
    }
  }(), p.loadingScreen = ie, p.displayLoadingUI();
  const e = (n = p.getCreationOptions) == null ? void 0 : n.call(p);
  if (!e || e.audioEngine, !p) throw "engine should not be null.";
  x = re(), x.clearColor = new J(0, 0, 0, 0);
}
me().then(() => {
  C = x, T();
});
window.addEventListener("resize", function() {
  p == null || p.resize();
});
function he(t, e) {
  const n = t.getEngine(), a = t.activeCamera;
  if (a != null) {
    const l = a.viewport.toGlobal(n.getRenderWidth(), n.getRenderHeight()), s = e.getBoundingInfo(), r = s.boundingBox.minimumWorld, i = s.boundingBox.maximumWorld, f = [
      new y(r.x, r.y, r.z),
      new y(r.x, r.y, i.z),
      new y(r.x, i.y, r.z),
      new y(r.x, i.y, i.z),
      new y(i.x, r.y, r.z),
      new y(i.x, r.y, i.z),
      new y(i.x, i.y, r.z),
      new y(i.x, i.y, i.z)
    ];
    let b = 1 / 0, v = 1 / 0, R = -1 / 0, I = -1 / 0;
    f.forEach((w) => {
      const H = y.Project(
        w,
        a.getViewMatrix(),
        a.getProjectionMatrix(),
        l
      );
      b = Math.min(b, H.x), v = Math.min(v, H.y), R = Math.max(R, H.x), I = Math.max(I, H.y);
    });
    const _ = 4;
    return {
      x: Math.max(0, b - _),
      y: Math.max(0, v - _),
      width: Math.min(n.getRenderWidth(), R + _) - Math.max(0, b - _),
      height: Math.min(n.getRenderHeight(), I + _) - Math.max(0, v - _)
    };
  } else
    return {
      x: 0,
      y: 0,
      width: n.getRenderWidth(),
      height: n.getRenderHeight()
    };
}
async function ge(t, e, n = "splat-capture.png") {
  if (u == null)
    return;
  const a = t.getEngine(), l = t.activeCamera;
  let s = null;
  try {
    console.log("[1/4] Calculating precise splat bounds...");
    const r = he(t, e), i = {
      x: Math.max(0, Math.floor(r.x)),
      y: Math.max(0, Math.floor(r.y)),
      width: Math.min(a.getRenderWidth(), Math.ceil(r.width)),
      height: Math.min(a.getRenderHeight(), Math.ceil(r.height))
    };
    console.log("Absolute crop bounds:", i), console.log("[2/4] Creating render target..."), s = new ee(
      "splatCapture",
      { width: a.getRenderWidth(), height: a.getRenderHeight() },
      t,
      !1,
      !0,
      // Enable depth buffer
      z.TEXTURETYPE_UNSIGNED_BYTE
      // Ensure correct texture type
    ), s.renderList = [e], t.customRenderTargets.push(s), console.log("[3/4] Creating temporary canvas...");
    const f = document.createElement("canvas"), b = f.getContext("2d");
    f.width = i.width, f.height = i.height, console.log("[4/4] Rendering and cropping..."), await new Promise((v) => {
      s == null || s.onAfterRenderObservable.addOnce(async () => {
        console.log("Bounds:", i), (i.width <= 0 || i.height <= 0) && console.error("Invalid bounds dimensions!"), console.log("Active camera:", l.position);
        let R = await a.readPixels(
          i.x,
          a.getRenderHeight() - i.y - i.height,
          i.width,
          i.height
        );
        const _ = u.getContext("2d").getImageData(0, 0, u.width, u.height).data;
        console.log("W: " + u.width + ", H: " + u.height + ", 1: " + i.width + ", 2: " + i.height);
        const w = pe(R, i.width, i.height);
        for (let h = 0; h < 565; h++)
          for (let g = 0; g < 428; g++) {
            const k = w[h * i.width * 4 + g * 4], q = w[h * i.width * 4 + g * 4 + 1], U = w[h * i.width * 4 + g * 4 + 2], E = w[h * i.width * 4 + g * 4 + 3], G = _[h * u.width * 4 + g * 4], W = _[h * u.width * 4 + g * 4 + 1], j = _[h * u.width * 4 + g * 4 + 2];
            w[h * i.width * 4 + g * 4] = (G * (255 - E) + k * E) / 256, w[h * i.width * 4 + g * 4 + 1] = (W * (255 - E) + q * E) / 256, w[h * i.width * 4 + g * 4 + 2] = (j * (255 - E) + U * E) / 256, w[h * i.width * 4 + g * 4 + 3] = 255;
          }
        const H = new ImageData(
          new Uint8ClampedArray(w),
          i.width,
          i.height
        );
        b.putImageData(H, 0, 0), v(null);
      }), t.render();
    }), f.toBlob((v) => {
      const R = document.createElement("a");
      R.href = URL.createObjectURL(v), R.download = n, R.click(), console.log(`Success! Saved cropped splat as ${n}`);
    }, "image/png", 1);
  } catch (r) {
    throw console.error("CAPTURE FAILED:", r), r;
  } finally {
    if (s != null) {
      s.dispose();
      const r = t.customRenderTargets.indexOf(s);
      r > -1 && t.customRenderTargets.splice(r, 1);
    }
  }
}
function pe(t, e, n) {
  const a = new Uint8Array(t.byteLength), l = e * 4, s = new Uint8Array(t.buffer);
  for (let r = 0; r < n; r++) {
    const i = r * l, f = (n - 1 - r) * l;
    a.set(
      s.subarray(i, i + l),
      f
    );
  }
  return a;
}
