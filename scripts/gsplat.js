var E = Object.defineProperty;
var M = (t, e, s) => e in t ? E(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var l = (t, e, s) => M(t, typeof e != "symbol" ? e + "" : e, s);
import { Y, W as I, o as X, E as R, m as k, l as _, t as y } from "./gsplat2.js";
(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
    a(o);
  new MutationObserver((o) => {
    for (const r of o)
      if (r.type === "childList")
        for (const c of r.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && a(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const r = {};
    return o.integrity && (r.integrity = o.integrity), o.referrerPolicy && (r.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? r.credentials = "include" : o.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
  }
  function a(o) {
    if (o.ep)
      return;
    o.ep = !0;
    const r = s(o);
    fetch(o.href, r);
  }
})();
let d = null;
class P {
  constructor(e) {
    l(this, "videoCanvas");
    l(this, "renderCanvas");
    l(this, "video");
    l(this, "video_frame_id", null);
    l(this, "supports", null);
    l(this, "facingMode", "user");
    this.renderCanvas = e, this.video = document.createElement("video"), this.video.disablePictureInPicture = !0, this.video.autoplay = !0, this.video.controls = !1, this.video.playsInline = !0, document.body.appendChild(this.video), this.video.style.display = "none", this.videoCanvas = document.createElement("canvas"), window.document.getElementById("videoScreen").appendChild(this.videoCanvas), this.supports = navigator.mediaDevices.getSupportedConstraints();
    const a = {
      audio: !1,
      video: this.supports.facingMode ? {
        facingMode: this.facingMode
      } : {}
    };
    navigator.mediaDevices.getUserMedia(a).then((o) => this.handleSuccess(o)).catch((o) => this.handleError(o));
  }
  videoFrame() {
    let e = this.video.videoWidth, s = this.video.videoHeight, a = this.renderCanvas.width, o = this.renderCanvas.height;
    const r = e / s, c = a / o;
    let f = 0, F = 0;
    r < c ? (f = 0, F = (s - e / c) / 2, s = e / c) : (f = (e - s * c) / 2, F = 0, e = s * c), a = 960, o = 1280, this.videoCanvas.width = a, this.videoCanvas.height = o, this.videoCanvas.getContext("2d").drawImage(
      this.video,
      f,
      F,
      e,
      s,
      0,
      0,
      a,
      o
    ), this.video_frame_id != null && cancelAnimationFrame(this.video_frame_id), setTimeout(() => {
      this.video_frame_id = requestAnimationFrame(() => {
        this.videoFrame();
      });
    }, 50);
  }
  handleSuccess(e) {
    this.video.srcObject = e, this.video_frame_id != null && cancelAnimationFrame(this.video_frame_id), this.video_frame_id = requestAnimationFrame(() => {
      this.videoFrame();
    });
  }
  handleError(e) {
    console.log("navigator.MediaDevices.getUserMedia error: ", e.message, e.name, e.stack);
  }
}
class n {
  static async init() {
    this.renderCanvas = document.getElementById("canvas"), this.splatRenderer = new Y(this.renderCanvas), this.splatScene = new I(), this.splatCamera = new X(), this.splatRenderer.backgroundColor = new R(0, 0, 0, 0);
    const e = document.getElementById("splat_url").value, s = document.getElementById("progress-indicator");
    this.splat = await k.LoadAsync(e, this.splatScene, (c) => s.value = c * 100), this.originalRotation = this.splat.rotation, document.getElementById("progress-dialog").close();
    const o = () => {
      this.splatRenderer.setSize(window.innerWidth, window.innerHeight);
    }, r = () => {
      this.splat_frame_id != null && cancelAnimationFrame(this.splat_frame_id), this.renderFrame(), setTimeout(() => {
        this.splat_frame_id = requestAnimationFrame(r);
      }, 100);
    };
    o(), window.addEventListener("resize", o), requestAnimationFrame(r);
  }
  static renderFrame() {
    this.splatRenderer.render(this.splatScene, this.splatCamera);
  }
}
l(n, "splatRenderer"), l(n, "splatScene"), l(n, "splatCamera"), l(n, "splat"), l(n, "originalRotation"), l(n, "splat_frame_id", null);
class b {
  static init() {
    const e = document.getElementById("fullscreenBtn");
    e != null && e.addEventListener("click", async (a) => {
      u(a), this.fs ? this.closeFullscreen() : this.openFullscreen();
    });
    const s = document.getElementById("facingModeButton");
    s != null && s.addEventListener("click", async (a) => {
      u(a), d.video.srcObject.getTracks().forEach((f) => f.stop()), d.facingMode = d.facingMode === "user" ? "environment" : "user";
      const r = {
        audio: !1,
        video: d.supports.facingMode ? {
          facingMode: { exact: d.facingMode }
        } : {}
      }, c = await navigator.mediaDevices.getUserMedia(r);
      d.video.srcObject = null, d.video.srcObject = c, d.video.play().then();
    });
  }
  // @ts-ignore
  static openFullscreen() {
    const e = document.getElementById("viewElement");
    this.fs = !0, e.requestFullscreen ? e.requestFullscreen().then() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
  }
  /* Close fullscreen */
  // @ts-ignore
  static closeFullscreen() {
    this.fs = !1, document.exitFullscreen ? document.exitFullscreen().then() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
  }
}
l(b, "fs", !1);
let h = 3, v = 0, g = 0, w = 0, C = 0;
function D(t) {
  const e = t.clientX - w, s = t.clientY - C;
  switch (h) {
    case 0:
      n.splat.position = n.splat.position.add(new y(e * 0.01, s * 0.01, 0)), console.log("position", n.splat.position);
      break;
    case 2:
      n.splat.rotation = n.originalRotation.multiply(
        new _(
          (g - t.clientY) * 5e-3,
          (v - t.clientX) * 5e-3,
          0,
          1
        )
      ).normalize();
      break;
    case 1:
      n.splat.scale = n.splat.scale.add(
        new y(-s * 0.01, -s * 0.01, -s * 0.01)
      );
      break;
  }
  w = t.clientX, C = t.clientY, n.renderFrame();
}
function q(t) {
  switch (t.button) {
    case 0:
      h = 0;
      break;
    case 1:
      h = 1;
      break;
    case 2:
      h = 2;
      break;
  }
}
function B() {
  n.originalRotation = n.splat.rotation, h = 3;
}
let i = [], p = -1;
function A(t) {
  console.log("pointerdown_handler", t), i.push(t), i.length == 1 ? (v = w = t.clientX, g = C = t.clientY, q(t)) : i.length == 3 && (v = w = (i[2].clientX + i[1].clientX + i[0].clientX) / 2, g = C = (i[2].clientY + i[1].clientY + i[0].clientY) / 2), u(t);
}
function O(t) {
  for (let e = 0; e < i.length; e++)
    if (t.pointerId == i[e].pointerId) {
      i[e] = t;
      break;
    }
  if (i.length == 1)
    D(i[0]);
  else if (i.length == 3) {
    const e = (i[2].clientX + i[1].clientX + i[0].clientX) / 2, s = (i[2].clientY + i[1].clientY + i[0].clientY) / 2;
    n.splat.rotation = n.originalRotation.multiply(
      new _(
        (g - s) * 5e-3,
        (v - e) * 5e-3,
        0,
        1
      )
    ).normalize(), n.renderFrame();
  } else if (i.length == 2) {
    const e = Math.sqrt(
      Math.pow(i[1].clientX - i[0].clientX, 2) + Math.pow(i[1].clientY - i[0].clientY, 2)
    );
    if (p > 0) {
      const s = (e - p) * 5e-3;
      n.splat.scale = n.splat.scale.add(
        new y(s, s, s)
      );
    }
    n.renderFrame(), p = e;
  }
  u(t);
}
function m(t) {
  x(t), i.length < 3 && (p = -1), i.length == 0 && B(), u(t);
}
function x(t) {
  for (let e = 0; e < i.length; e++)
    if (i[e].pointerId == t.pointerId) {
      i.splice(e, 1);
      break;
    }
}
const u = (t) => {
  t.preventDefault(), t.stopPropagation();
};
function L() {
  n.renderCanvas.onpointerdown = A, n.renderCanvas.onpointermove = O, n.renderCanvas.onpointerup = m, n.renderCanvas.onpointercancel = m, n.renderCanvas.onpointerout = m, n.renderCanvas.onpointerleave = m, n.renderCanvas.oncontextmenu = u, n.renderCanvas.ondragover = u, n.renderCanvas.ondragenter = u, n.renderCanvas.ondragleave = u;
}
async function S() {
  await n.init(), d = new P(n.renderCanvas), b.init(), L();
}
S().then();
