import { r as i, R as v, G as L, O as T, S, a as z, D, C as U, b as G, A as W, V as _, I as j, E as C, c as q } from "./babylon.js";
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]'))
    o(c);
  new MutationObserver((c) => {
    for (const s of c)
      if (s.type === "childList")
        for (const r of s.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && o(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(c) {
    const s = {};
    return c.integrity && (s.integrity = c.integrity), c.referrerPolicy && (s.referrerPolicy = c.referrerPolicy), c.crossOrigin === "use-credentials" ? s.credentials = "include" : c.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
  }
  function o(c) {
    if (c.ep)
      return;
    c.ep = !0;
    const s = n(c);
    fetch(c.href, s);
  }
})();
function N() {
  i("EXT_lights_image_based", !0, async (e) => {
    const { EXT_lights_image_based: t } = await import("./babylon.js").then((n) => n.d);
    return new t(e);
  }), i("EXT_mesh_gpu_instancing", !0, async (e) => {
    const { EXT_mesh_gpu_instancing: t } = await import("./babylon.js").then((n) => n.e);
    return new t(e);
  }), i("EXT_meshopt_compression", !0, async (e) => {
    const { EXT_meshopt_compression: t } = await import("./babylon.js").then((n) => n.f);
    return new t(e);
  }), i("EXT_texture_avif", !0, async (e) => {
    const { EXT_texture_avif: t } = await import("./babylon.js").then((n) => n.h);
    return new t(e);
  }), i("EXT_texture_webp", !0, async (e) => {
    const { EXT_texture_webp: t } = await import("./babylon.js").then((n) => n.i);
    return new t(e);
  }), i("ExtrasAsMetadata", !1, async (e) => {
    const { ExtrasAsMetadata: t } = await import("./babylon.js").then((n) => n.j);
    return new t(e);
  }), i("KHR_animation_pointer", !0, async (e) => {
    const { KHR_animation_pointer: t } = await import("./babylon.js").then((n) => n.K);
    return new t(e);
  }), i("KHR_draco_mesh_compression", !0, async (e) => {
    const { KHR_draco_mesh_compression: t } = await import("./babylon.js").then((n) => n.k);
    return new t(e);
  }), i("KHR_interactivity", !0, async (e) => {
    const { KHR_interactivity: t } = await import("./babylon.js").then((n) => n.l);
    return new t(e);
  }), i("KHR_lights_punctual", !0, async (e) => {
    const { KHR_lights: t } = await import("./babylon.js").then((n) => n.m);
    return new t(e);
  }), i("EXT_lights_ies", !0, async (e) => {
    const { EXT_lights_ies: t } = await import("./babylon.js").then((n) => n.n);
    return new t(e);
  }), i("KHR_materials_anisotropy", !0, async (e) => {
    const { KHR_materials_anisotropy: t } = await import("./babylon.js").then((n) => n.o);
    return new t(e);
  }), i("KHR_materials_clearcoat", !0, async (e) => {
    const { KHR_materials_clearcoat: t } = await import("./babylon.js").then((n) => n.p);
    return new t(e);
  }), i("KHR_materials_diffuse_transmission", !0, async (e) => {
    const { KHR_materials_diffuse_transmission: t } = await import("./babylon.js").then((n) => n.q);
    return new t(e);
  }), i("KHR_materials_dispersion", !0, async (e) => {
    const { KHR_materials_dispersion: t } = await import("./babylon.js").then((n) => n.s);
    return new t(e);
  }), i("KHR_materials_emissive_strength", !0, async (e) => {
    const { KHR_materials_emissive_strength: t } = await import("./babylon.js").then((n) => n.t);
    return new t(e);
  }), i("KHR_materials_ior", !0, async (e) => {
    const { KHR_materials_ior: t } = await import("./babylon.js").then((n) => n.u);
    return new t(e);
  }), i("KHR_materials_iridescence", !0, async (e) => {
    const { KHR_materials_iridescence: t } = await import("./babylon.js").then((n) => n.v);
    return new t(e);
  }), i("KHR_materials_pbrSpecularGlossiness", !0, async (e) => {
    const { KHR_materials_pbrSpecularGlossiness: t } = await import("./babylon.js").then((n) => n.w);
    return new t(e);
  }), i("KHR_materials_sheen", !0, async (e) => {
    const { KHR_materials_sheen: t } = await import("./babylon.js").then((n) => n.x);
    return new t(e);
  }), i("KHR_materials_specular", !0, async (e) => {
    const { KHR_materials_specular: t } = await import("./babylon.js").then((n) => n.y);
    return new t(e);
  }), i("KHR_materials_transmission", !0, async (e) => {
    const { KHR_materials_transmission: t } = await import("./babylon.js").then((n) => n.z);
    return new t(e);
  }), i("KHR_materials_unlit", !0, async (e) => {
    const { KHR_materials_unlit: t } = await import("./babylon.js").then((n) => n.B);
    return new t(e);
  }), i("KHR_materials_variants", !0, async (e) => {
    const { KHR_materials_variants: t } = await import("./babylon.js").then((n) => n.F);
    return new t(e);
  }), i("KHR_materials_volume", !0, async (e) => {
    const { KHR_materials_volume: t } = await import("./babylon.js").then((n) => n.H);
    return new t(e);
  }), i("KHR_mesh_quantization", !0, async (e) => {
    const { KHR_mesh_quantization: t } = await import("./babylon.js").then((n) => n.J);
    return new t(e);
  }), i("KHR_texture_basisu", !0, async (e) => {
    const { KHR_texture_basisu: t } = await import("./babylon.js").then((n) => n.L);
    return new t(e);
  }), i("KHR_texture_transform", !0, async (e) => {
    const { KHR_texture_transform: t } = await import("./babylon.js").then((n) => n.M);
    return new t(e);
  }), i("KHR_xmp_json_ld", !0, async (e) => {
    const { KHR_xmp_json_ld: t } = await import("./babylon.js").then((n) => n.N);
    return new t(e);
  }), i("MSFT_audio_emitter", !0, async (e) => {
    const { MSFT_audio_emitter: t } = await import("./babylon.js").then((n) => n.P);
    return new t(e);
  }), i("MSFT_lod", !0, async (e) => {
    const { MSFT_lod: t } = await import("./babylon.js").then((n) => n.Q);
    return new t(e);
  }), i("MSFT_minecraftMesh", !0, async (e) => {
    const { MSFT_minecraftMesh: t } = await import("./babylon.js").then((n) => n.T);
    return new t(e);
  }), i("MSFT_sRGBFactors", !0, async (e) => {
    const { MSFT_sRGBFactors: t } = await import("./babylon.js").then((n) => n.U);
    return new t(e);
  }), i("KHR_node_visibility", !0, async (e) => {
    const { KHR_node_visibility: t } = await import("./babylon.js").then((n) => n.W);
    return new t(e);
  }), i("KHR_node_hoverability", !0, async (e) => {
    const { KHR_node_hoverability: t } = await import("./babylon.js").then((n) => n.X);
    return new t(e);
  }), i("KHR_node_selectability", !0, async (e) => {
    const { KHR_node_selectability: t } = await import("./babylon.js").then((n) => n.Y);
    return new t(e);
  });
}
function Y() {
  v({
    ...L,
    createPlugin: async (e) => {
      const { GLTFFileLoader: t } = await import("./babylon.js").then((n) => n.g);
      return new t(e[L.name]);
    }
  }), N(), v({
    ...T,
    createPlugin: async (e) => {
      const { OBJFileLoader: t } = await import("./babylon.js").then((n) => n.Z);
      return new t(e[T.name]);
    }
  }), v({
    ...S,
    createPlugin: async (e) => {
      const { SPLATFileLoader: t } = await import("./babylon.js").then((n) => n._);
      return new t(e[S.name]);
    }
  }), v({
    ...z,
    createPlugin: async () => {
      const { STLFileLoader: e } = await import("./babylon.js").then((t) => t.$);
      return new e();
    }
  });
}
Y();
let l = null;
{
  let e = function() {
    l.width = o.videoWidth, l.height = o.videoHeight, l.getContext("2d").drawImage(o, 0, 0, l.width, l.height), requestAnimationFrame(() => {
      e();
    });
  }, t = function(r) {
    o.srcObject = r, requestAnimationFrame(() => {
      e();
    });
  }, n = function(r) {
    console.log("navigator.MediaDevices.getUserMedia error: ", r.message, r.name);
  };
  const o = document.createElement("video");
  o.setAttribute("autoplay", String(!0)), o.setAttribute("playsinline", String(!0)), document.body.appendChild(o), o.style.display = "none", l = document.createElement("canvas"), window.document.getElementById("videoScreen").appendChild(l);
  const s = {
    audio: !1,
    video: !0
  };
  navigator.mediaDevices.getUserMedia(s).then(t).catch(n);
}
const M = document.getElementById("renderCanvas");
let m = null, b = null, K = null, E;
const V = function(e, t) {
  e.runRenderLoop(function() {
    K != null && K.activeCamera && K.render();
  });
}, J = new D(M, "Loading", "black"), F = function() {
  return new C(M, !0, {
    preserveDrawingBuffer: !0,
    stencil: !0,
    disableWebGL2Support: !1
  });
}, Z = function() {
  const e = new G(m), t = new W(
    "camera",
    0,
    1,
    10,
    _.Zero(),
    e
  );
  t.wheelPrecision = 10, t.inertia = 0, t.pinchPrecision = 100, t.lowerRadiusLimit = 3, t.upperRadiusLimit = 20, t.attachControl(M, !0), j(
    document.getElementById("splat_url").value,
    e
  ).then((o) => {
    E = o.meshes[0], m.hideLoadingUI();
  });
  const n = document.getElementById("screenshotBtn");
  return n != null && n.addEventListener("click", async () => {
    E && await k(e, E, "splat.png");
  }), e;
};
async function $() {
  var n;
  m = await async function() {
    try {
      return F();
    } catch {
      return console.log(
        "the available createEngine function failed. Creating the default engine instead"
      ), F();
    }
  }(), m.loadingScreen = J, m.displayLoadingUI();
  const t = (n = m.getCreationOptions) == null ? void 0 : n.call(m);
  if (!t || t.audioEngine, !m) throw "engine should not be null.";
  V(m), b = Z(), b.clearColor = new U(0, 0, 0, 0);
}
$().then(() => {
  K = b;
});
window.addEventListener("resize", function() {
  m == null || m.resize();
});
function Q(e, t) {
  const n = e.getEngine(), o = e.activeCamera;
  if (o != null) {
    const c = o.viewport.toGlobal(n.getRenderWidth(), n.getRenderHeight()), s = t.getBoundingInfo(), r = s.boundingBox.minimumWorld, a = s.boundingBox.maximumWorld, p = [
      new _(r.x, r.y, r.z),
      new _(r.x, r.y, a.z),
      new _(r.x, a.y, r.z),
      new _(r.x, a.y, a.z),
      new _(a.x, r.y, r.z),
      new _(a.x, r.y, a.z),
      new _(a.x, a.y, r.z),
      new _(a.x, a.y, a.z)
    ];
    let f = 1 / 0, y = 1 / 0, g = -1 / 0, H = -1 / 0;
    p.forEach((h) => {
      const R = _.Project(
        h,
        o.getViewMatrix(),
        o.getProjectionMatrix(),
        c
      );
      f = Math.min(f, R.x), y = Math.min(y, R.y), g = Math.max(g, R.x), H = Math.max(H, R.y);
    });
    const w = 4;
    return {
      x: Math.max(0, f - w),
      y: Math.max(0, y - w),
      width: Math.min(n.getRenderWidth(), g + w) - Math.max(0, f - w),
      height: Math.min(n.getRenderHeight(), H + w) - Math.max(0, y - w)
    };
  } else
    return {
      x: 0,
      y: 0,
      width: n.getRenderWidth(),
      height: n.getRenderHeight()
    };
}
async function k(e, t, n = "splat-capture.png") {
  if (l == null)
    return;
  const o = e.getEngine(), c = e.activeCamera;
  let s = null;
  try {
    console.log("[1/4] Calculating precise splat bounds...");
    const r = Q(e, t), a = {
      x: Math.max(0, Math.floor(r.x)),
      y: Math.max(0, Math.floor(r.y)),
      width: Math.min(o.getRenderWidth(), Math.ceil(r.width)),
      height: Math.min(o.getRenderHeight(), Math.ceil(r.height))
    };
    console.log("Absolute crop bounds:", a), console.log("[2/4] Creating render target..."), s = new q(
      "splatCapture",
      { width: o.getRenderWidth(), height: o.getRenderHeight() },
      e,
      !1,
      !0,
      // Enable depth buffer
      C.TEXTURETYPE_UNSIGNED_BYTE
      // Ensure correct texture type
    ), s.renderList = [t], e.customRenderTargets.push(s), console.log("[3/4] Creating temporary canvas...");
    const p = document.createElement("canvas"), f = p.getContext("2d");
    p.width = a.width, p.height = a.height, console.log("[4/4] Rendering and cropping..."), await new Promise((y) => {
      s == null || s.onAfterRenderObservable.addOnce(async () => {
        console.log("Bounds:", a), (a.width <= 0 || a.height <= 0) && console.error("Invalid bounds dimensions!"), console.log("Active camera:", c.position);
        let g = await o.readPixels(
          a.x,
          o.getRenderHeight() - a.y - a.height,
          a.width,
          a.height
        );
        const w = l.getContext("2d").getImageData(0, 0, l.width, l.height).data;
        console.log("W: " + l.width + ", H: " + l.height + ", 1: " + a.width + ", 2: " + a.height);
        const h = ee(g, a.width, a.height);
        for (let u = 0; u < 565; u++)
          for (let d = 0; d < 428; d++) {
            const I = h[u * a.width * 4 + d * 4], B = h[u * a.width * 4 + d * 4 + 1], P = h[u * a.width * 4 + d * 4 + 2], x = h[u * a.width * 4 + d * 4 + 3], A = w[u * l.width * 4 + d * 4], O = w[u * l.width * 4 + d * 4 + 1], X = w[u * l.width * 4 + d * 4 + 2];
            h[u * a.width * 4 + d * 4] = (A * (255 - x) + I * x) / 256, h[u * a.width * 4 + d * 4 + 1] = (O * (255 - x) + B * x) / 256, h[u * a.width * 4 + d * 4 + 2] = (X * (255 - x) + P * x) / 256, h[u * a.width * 4 + d * 4 + 3] = 255;
          }
        const R = new ImageData(
          new Uint8ClampedArray(h),
          a.width,
          a.height
        );
        f.putImageData(R, 0, 0), y(null);
      }), e.render();
    }), p.toBlob((y) => {
      const g = document.createElement("a");
      g.href = URL.createObjectURL(y), g.download = n, g.click(), console.log(`Success! Saved cropped splat as ${n}`);
    }, "image/png", 1);
  } catch (r) {
    throw console.error("CAPTURE FAILED:", r), r;
  } finally {
    if (s != null) {
      s.dispose();
      const r = e.customRenderTargets.indexOf(s);
      r > -1 && e.customRenderTargets.splice(r, 1);
    }
  }
}
function ee(e, t, n) {
  const o = new Uint8Array(e.byteLength), c = t * 4, s = new Uint8Array(e.buffer);
  for (let r = 0; r < n; r++) {
    const a = r * c, p = (n - 1 - r) * c;
    o.set(
      s.subarray(a, a + c),
      p
    );
  }
  return o;
}
