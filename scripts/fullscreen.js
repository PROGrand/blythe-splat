var v = Object.defineProperty;
var h = (a, e, t) => e in a ? v(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var d = (a, e, t) => h(a, typeof e != "symbol" ? e + "" : e, t);
class f {
  constructor(e) {
    d(this, "videoCanvas");
    d(this, "renderCanvas");
    d(this, "video");
    d(this, "video_frame_id", null);
    d(this, "supports", null);
    d(this, "facingMode", "user");
    this.renderCanvas = e, this.video = document.createElement("video"), this.video.disablePictureInPicture = !0, this.video.autoplay = !0, this.video.controls = !1, this.video.playsInline = !0, document.body.appendChild(this.video), this.video.style.display = "none", this.videoCanvas = document.createElement("canvas"), window.document.getElementById("videoScreen").appendChild(this.videoCanvas), this.supports = navigator.mediaDevices.getSupportedConstraints();
    const i = {
      audio: !1,
      video: this.supports.facingMode ? {
        facingMode: this.facingMode
      } : {}
    };
    navigator.mediaDevices.getUserMedia(i).then((o) => this.handleSuccess(o)).catch((o) => this.handleError(o));
    const n = document.getElementById("facingModeButton");
    if (n != null) {
      const o = (s) => {
        s.preventDefault(), s.stopPropagation();
      };
      n.addEventListener("click", async (s) => {
        o(s), this.video.srcObject.getTracks().forEach((u) => u.stop()), this.facingMode = this.facingMode === "user" ? "environment" : "user";
        const c = {
          audio: !1,
          video: this.supports.facingMode ? {
            facingMode: { exact: this.facingMode }
          } : {}
        }, r = await navigator.mediaDevices.getUserMedia(c);
        this.video.srcObject = null, this.video.srcObject = r, this.video.play().then();
      });
    }
  }
  videoFrame() {
    let e = this.video.videoWidth, t = this.video.videoHeight, i = this.renderCanvas.width, n = this.renderCanvas.height;
    const o = e / t, s = i / n;
    let l, c;
    o < s ? (l = 0, c = (t - e / s) / 2, t = e / s) : (l = (e - t * s) / 2, c = 0, e = t * s), i = 960, n = 1280, this.videoCanvas.width = i, this.videoCanvas.height = n, this.videoCanvas.getContext("2d").drawImage(
      this.video,
      l,
      c,
      e,
      t,
      0,
      0,
      i,
      n
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
class g {
  static init() {
    const e = document.documentElement, t = document.getElementById("fullscreenBtn");
    let i = !1;
    t != null && t.addEventListener("click", async () => {
      i ? o() : n();
    });
    function n() {
      i = !0, e.requestFullscreen ? e.requestFullscreen({ navigationUI: "hide" }).then() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
    }
    function o() {
      i = !1, document.exitFullscreen ? document.exitFullscreen().then() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
    }
  }
}
export {
  g as F,
  f as V
};
