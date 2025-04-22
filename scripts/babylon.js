import "./modulepreload-polyfill.js";
import { r as a, R as f, G as v, O as L, S as M, a as S, D as X, C as x, E as I, b as B, A as C, V as P, I as A, H as Y, c as E, M as k, d as D, e as G } from "./babylonjs.js";
import { V as O, F as z } from "./fullscreen.js";
function U() {
  a("EXT_lights_image_based", !0, async (e) => {
    const { EXT_lights_image_based: t } = await import("./babylonjs.js").then((n) => n.f);
    return new t(e);
  }), a("EXT_mesh_gpu_instancing", !0, async (e) => {
    const { EXT_mesh_gpu_instancing: t } = await import("./babylonjs.js").then((n) => n.h);
    return new t(e);
  }), a("EXT_meshopt_compression", !0, async (e) => {
    const { EXT_meshopt_compression: t } = await import("./babylonjs.js").then((n) => n.i);
    return new t(e);
  }), a("EXT_texture_avif", !0, async (e) => {
    const { EXT_texture_avif: t } = await import("./babylonjs.js").then((n) => n.j);
    return new t(e);
  }), a("EXT_texture_webp", !0, async (e) => {
    const { EXT_texture_webp: t } = await import("./babylonjs.js").then((n) => n.k);
    return new t(e);
  }), a("ExtrasAsMetadata", !1, async (e) => {
    const { ExtrasAsMetadata: t } = await import("./babylonjs.js").then((n) => n.l);
    return new t(e);
  }), a("KHR_animation_pointer", !0, async (e) => {
    const { KHR_animation_pointer: t } = await import("./babylonjs.js").then((n) => n.K);
    return new t(e);
  }), a("KHR_draco_mesh_compression", !0, async (e) => {
    const { KHR_draco_mesh_compression: t } = await import("./babylonjs.js").then((n) => n.m);
    return new t(e);
  }), a("KHR_interactivity", !0, async (e) => {
    const { KHR_interactivity: t } = await import("./babylonjs.js").then((n) => n.n);
    return new t(e);
  }), a("KHR_lights_punctual", !0, async (e) => {
    const { KHR_lights: t } = await import("./babylonjs.js").then((n) => n.o);
    return new t(e);
  }), a("EXT_lights_ies", !0, async (e) => {
    const { EXT_lights_ies: t } = await import("./babylonjs.js").then((n) => n.p);
    return new t(e);
  }), a("KHR_materials_anisotropy", !0, async (e) => {
    const { KHR_materials_anisotropy: t } = await import("./babylonjs.js").then((n) => n.q);
    return new t(e);
  }), a("KHR_materials_clearcoat", !0, async (e) => {
    const { KHR_materials_clearcoat: t } = await import("./babylonjs.js").then((n) => n.s);
    return new t(e);
  }), a("KHR_materials_diffuse_transmission", !0, async (e) => {
    const { KHR_materials_diffuse_transmission: t } = await import("./babylonjs.js").then((n) => n.t);
    return new t(e);
  }), a("KHR_materials_dispersion", !0, async (e) => {
    const { KHR_materials_dispersion: t } = await import("./babylonjs.js").then((n) => n.u);
    return new t(e);
  }), a("KHR_materials_emissive_strength", !0, async (e) => {
    const { KHR_materials_emissive_strength: t } = await import("./babylonjs.js").then((n) => n.v);
    return new t(e);
  }), a("KHR_materials_ior", !0, async (e) => {
    const { KHR_materials_ior: t } = await import("./babylonjs.js").then((n) => n.w);
    return new t(e);
  }), a("KHR_materials_iridescence", !0, async (e) => {
    const { KHR_materials_iridescence: t } = await import("./babylonjs.js").then((n) => n.x);
    return new t(e);
  }), a("KHR_materials_pbrSpecularGlossiness", !0, async (e) => {
    const { KHR_materials_pbrSpecularGlossiness: t } = await import("./babylonjs.js").then((n) => n.y);
    return new t(e);
  }), a("KHR_materials_sheen", !0, async (e) => {
    const { KHR_materials_sheen: t } = await import("./babylonjs.js").then((n) => n.z);
    return new t(e);
  }), a("KHR_materials_specular", !0, async (e) => {
    const { KHR_materials_specular: t } = await import("./babylonjs.js").then((n) => n.B);
    return new t(e);
  }), a("KHR_materials_transmission", !0, async (e) => {
    const { KHR_materials_transmission: t } = await import("./babylonjs.js").then((n) => n.F);
    return new t(e);
  }), a("KHR_materials_unlit", !0, async (e) => {
    const { KHR_materials_unlit: t } = await import("./babylonjs.js").then((n) => n.J);
    return new t(e);
  }), a("KHR_materials_variants", !0, async (e) => {
    const { KHR_materials_variants: t } = await import("./babylonjs.js").then((n) => n.L);
    return new t(e);
  }), a("KHR_materials_volume", !0, async (e) => {
    const { KHR_materials_volume: t } = await import("./babylonjs.js").then((n) => n.N);
    return new t(e);
  }), a("KHR_mesh_quantization", !0, async (e) => {
    const { KHR_mesh_quantization: t } = await import("./babylonjs.js").then((n) => n.P);
    return new t(e);
  }), a("KHR_texture_basisu", !0, async (e) => {
    const { KHR_texture_basisu: t } = await import("./babylonjs.js").then((n) => n.Q);
    return new t(e);
  }), a("KHR_texture_transform", !0, async (e) => {
    const { KHR_texture_transform: t } = await import("./babylonjs.js").then((n) => n.T);
    return new t(e);
  }), a("KHR_xmp_json_ld", !0, async (e) => {
    const { KHR_xmp_json_ld: t } = await import("./babylonjs.js").then((n) => n.U);
    return new t(e);
  }), a("MSFT_audio_emitter", !0, async (e) => {
    const { MSFT_audio_emitter: t } = await import("./babylonjs.js").then((n) => n.W);
    return new t(e);
  }), a("MSFT_lod", !0, async (e) => {
    const { MSFT_lod: t } = await import("./babylonjs.js").then((n) => n.X);
    return new t(e);
  }), a("MSFT_minecraftMesh", !0, async (e) => {
    const { MSFT_minecraftMesh: t } = await import("./babylonjs.js").then((n) => n.Y);
    return new t(e);
  }), a("MSFT_sRGBFactors", !0, async (e) => {
    const { MSFT_sRGBFactors: t } = await import("./babylonjs.js").then((n) => n.Z);
    return new t(e);
  }), a("KHR_node_visibility", !0, async (e) => {
    const { KHR_node_visibility: t } = await import("./babylonjs.js").then((n) => n._);
    return new t(e);
  }), a("KHR_node_hoverability", !0, async (e) => {
    const { KHR_node_hoverability: t } = await import("./babylonjs.js").then((n) => n.$);
    return new t(e);
  }), a("KHR_node_selectability", !0, async (e) => {
    const { KHR_node_selectability: t } = await import("./babylonjs.js").then((n) => n.a0);
    return new t(e);
  });
}
function q() {
  f({
    ...v,
    createPlugin: async (e) => {
      const { GLTFFileLoader: t } = await import("./babylonjs.js").then((n) => n.g);
      return new t(e[v.name]);
    }
  }), U(), f({
    ...L,
    createPlugin: async (e) => {
      const { OBJFileLoader: t } = await import("./babylonjs.js").then((n) => n.a1);
      return new t(e[L.name]);
    }
  }), f({
    ...M,
    createPlugin: async (e) => {
      const { SPLATFileLoader: t } = await import("./babylonjs.js").then((n) => n.a2);
      return new t(e[M.name]);
    }
  }), f({
    ...S,
    createPlugin: async () => {
      const { STLFileLoader: e } = await import("./babylonjs.js").then((t) => t.a3);
      return new e();
    }
  });
}
q();
let g = null, m = null;
const o = document.getElementById("renderCanvas");
let i = null, l = null, u = null, s, H = null;
function K() {
  i == null || i.stopRenderLoop(), H != null && cancelAnimationFrame(H), H = requestAnimationFrame(() => {
    u != null && u.activeCamera && u.render(!1, !0);
  });
}
const j = new X(o, "Loading", "black"), b = () => new I(o, !1, {
  preserveDrawingBuffer: !0,
  stencil: !0,
  disableWebGL2Support: !1
});
function N() {
  u != null && u.activeCamera && u.render(!1, !0);
}
async function V(e, t, n) {
  e.render(!1, !0), o.toBlob((_) => {
    const c = document.createElement("a");
    c.href = URL.createObjectURL(_), c.download = "splat.png", c.click(), console.log("Success! Saved cropped splat as splat.png");
  }, "image/png", 1);
}
let R;
const J = function() {
  const e = new B(i), t = new C("Camera", -Math.PI / 2, Math.PI / 2, 10, new P(0, 0, 0), e);
  t.useFramingBehavior = !0, A(
    document.getElementById("splat_url").value,
    e
  ).then((_) => {
    s = _.meshes[0], i == null || i.hideLoadingUI(), s.position.set(0, 0, -3), s.scaling.set(1, 1, 1), s.rotation.set(0, 0, 0), m = new Y(
      "vt",
      g == null ? void 0 : g.videoCanvas,
      {
        scene: e,
        engine: i,
        samplingMode: E.TEXTURE_BILINEAR_SAMPLINGMODE,
        generateMipMaps: !1
      }
    ), window.setInterval(() => {
      m == null || m.update(), e.render();
    }, 50), R = k.CreatePlane("plane", { width: 1, height: 1 }, e), R.billboardMode = D.BILLBOARDMODE_ALL;
    const c = new G("RTT material", e);
    c.transparencyMode = 3, c.alphaMode = E.ALPHA_COMBINE, c.emissiveTexture = m, c.disableLighting = !0, R.material = c, T(), i == null || i.runRenderLoop(N);
  });
  const n = document.getElementById("screenshotBtn");
  return n != null && n.addEventListener("click", async () => {
    s && await V(e);
  }), e.onDispose = function() {
    o.onpointerdown = null, o.onpointermove = null, o.onpointerup = null, o.onpointercancel = null, o.onpointerout = null, o.onpointerleave = null;
  }, ne(), e;
};
function T() {
  const e = u == null ? void 0 : u.activeCamera, t = e.fov, n = i.getAspectRatio(e), c = 2 * e.position.length() * Math.tan(t / 2), F = c * n;
  R.scaling.set(F, c, 1);
}
let w = 3, d = 0, h = 0;
function W() {
  const e = l.pointerX - d, t = l.pointerY - h;
  switch (w) {
    case 0:
      s.position.x -= -e * 0.01, s.position.y -= t * 0.01;
      break;
    case 2:
      s.rotation.y -= e * 0.01, s.rotation.x -= t * 0.01;
      break;
    case 1:
      s.scaling.y -= t * 0.01, s.scaling.x -= t * 0.01, s.scaling.z -= t * 0.01;
      break;
  }
  d = l.pointerX, h = l.pointerY, K();
}
function Q(e) {
  switch (d = l.pointerX, h = l.pointerY, e.button) {
    case 0:
      w = 0;
      break;
    case 1:
      w = 1;
      break;
    case 2:
      w = 2;
      break;
  }
}
function Z() {
  w = 3;
}
let r = [], p = -1;
function $(e) {
  r.push(e), r.length == 1 ? Q(e) : r.length == 3 && (d = (r[2].clientX + r[1].clientX + r[0].clientX) / 2, h = (r[2].clientY + r[1].clientY + r[0].clientY) / 2);
}
function ee(e) {
  for (let t = 0; t < r.length; t++)
    if (e.pointerId == r[t].pointerId) {
      r[t] = e;
      break;
    }
  if (r.length == 1)
    W();
  else if (r.length == 3) {
    const t = (r[2].clientX + r[1].clientX + r[0].clientX) / 2, n = (r[2].clientY + r[1].clientY + r[0].clientY) / 2, _ = t - d, c = n - h;
    s.rotation.y -= _ * 1e-3, s.rotation.x -= c * 1e-3, K();
  } else if (r.length == 2) {
    const t = Math.sqrt(
      Math.pow(r[1].clientX - r[0].clientX, 2) + Math.pow(r[1].clientY - r[0].clientY, 2)
    );
    p > 0 && (s.scaling.y += (t - p) * 0.01, s.scaling.x += (t - p) * 0.01, s.scaling.z += (t - p) * 0.01), K(), p = t;
  }
}
function y(e) {
  te(e), r.length < 3 && (p = -1), r.length == 1 && Z();
}
function te(e) {
  for (let t = 0; t < r.length; t++)
    if (r[t].pointerId == e.pointerId) {
      r.splice(t, 1);
      break;
    }
}
function ne() {
  o.onpointerdown = $, o.onpointermove = ee, o.onpointerup = y, o.onpointercancel = y, o.onpointerout = y, o.onpointerleave = y;
}
async function ae() {
  i = await async function() {
    try {
      return b();
    } catch {
      return console.log(
        "the available createEngine function failed. Creating the default engine instead"
      ), b();
    }
  }(), i.loadingScreen = j, i.displayLoadingUI(), l = J(), l.autoClearDepthAndStencil = !0, l.clearColor = new x(0, 0, 0, 0);
}
ae().then(() => {
  u = l, g = new O(o), z.init();
});
window.addEventListener("resize", function() {
  i == null || i.resize(), T();
});
