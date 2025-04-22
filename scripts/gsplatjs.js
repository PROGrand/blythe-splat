class b {
  constructor(U = 0, t = 0, F = 0) {
    this.x = U, this.y = t, this.z = F;
  }
  equals(U) {
    return this.x === U.x && this.y === U.y && this.z === U.z;
  }
  add(U) {
    return typeof U == "number" ? new b(this.x + U, this.y + U, this.z + U) : new b(this.x + U.x, this.y + U.y, this.z + U.z);
  }
  subtract(U) {
    return typeof U == "number" ? new b(this.x - U, this.y - U, this.z - U) : new b(this.x - U.x, this.y - U.y, this.z - U.z);
  }
  multiply(U) {
    return typeof U == "number" ? new b(this.x * U, this.y * U, this.z * U) : U instanceof b ? new b(this.x * U.x, this.y * U.y, this.z * U.z) : new b(this.x * U.buffer[0] + this.y * U.buffer[4] + this.z * U.buffer[8] + U.buffer[12], this.x * U.buffer[1] + this.y * U.buffer[5] + this.z * U.buffer[9] + U.buffer[13], this.x * U.buffer[2] + this.y * U.buffer[6] + this.z * U.buffer[10] + U.buffer[14]);
  }
  divide(U) {
    return typeof U == "number" ? new b(this.x / U, this.y / U, this.z / U) : new b(this.x / U.x, this.y / U.y, this.z / U.z);
  }
  cross(U) {
    const t = this.y * U.z - this.z * U.y, F = this.z * U.x - this.x * U.z, l = this.x * U.y - this.y * U.x;
    return new b(t, F, l);
  }
  dot(U) {
    return this.x * U.x + this.y * U.y + this.z * U.z;
  }
  lerp(U, t) {
    return new b(this.x + (U.x - this.x) * t, this.y + (U.y - this.y) * t, this.z + (U.z - this.z) * t);
  }
  min(U) {
    return new b(Math.min(this.x, U.x), Math.min(this.y, U.y), Math.min(this.z, U.z));
  }
  max(U) {
    return new b(Math.max(this.x, U.x), Math.max(this.y, U.y), Math.max(this.z, U.z));
  }
  getComponent(U) {
    switch (U) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error(`Invalid component index: ${U}`);
    }
  }
  minComponent() {
    return this.x < this.y && this.x < this.z ? 0 : this.y < this.z ? 1 : 2;
  }
  maxComponent() {
    return this.x > this.y && this.x > this.z ? 0 : this.y > this.z ? 1 : 2;
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  distanceTo(U) {
    return Math.sqrt((this.x - U.x) ** 2 + (this.y - U.y) ** 2 + (this.z - U.z) ** 2);
  }
  normalize() {
    const U = this.magnitude();
    return new b(this.x / U, this.y / U, this.z / U);
  }
  flat() {
    return [this.x, this.y, this.z];
  }
  clone() {
    return new b(this.x, this.y, this.z);
  }
  toString() {
    return `[${this.flat().join(", ")}]`;
  }
  static One(U = 1) {
    return new b(U, U, U);
  }
}
class j {
  constructor(U = 0, t = 0, F = 0, l = 1) {
    this.x = U, this.y = t, this.z = F, this.w = l;
  }
  equals(U) {
    return this.x === U.x && this.y === U.y && this.z === U.z && this.w === U.w;
  }
  normalize() {
    const U = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    return new j(this.x / U, this.y / U, this.z / U, this.w / U);
  }
  multiply(U) {
    const t = this.w, F = this.x, l = this.y, V = this.z, d = U.w, Q = U.x, n = U.y, e = U.z;
    return new j(t * Q + F * d + l * e - V * n, t * n - F * e + l * d + V * Q, t * e + F * n - l * Q + V * d, t * d - F * Q - l * n - V * e);
  }
  inverse() {
    const U = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    return new j(-this.x / U, -this.y / U, -this.z / U, this.w / U);
  }
  apply(U) {
    const t = new j(U.x, U.y, U.z, 0), F = new j(-this.x, -this.y, -this.z, this.w), l = this.multiply(t).multiply(F);
    return new b(l.x, l.y, l.z);
  }
  flat() {
    return [this.x, this.y, this.z, this.w];
  }
  clone() {
    return new j(this.x, this.y, this.z, this.w);
  }
  static FromEuler(U) {
    const t = U.x / 2, F = U.y / 2, l = U.z / 2, V = Math.cos(F), d = Math.sin(F), Q = Math.cos(t), n = Math.sin(t), e = Math.cos(l), A = Math.sin(l);
    return new j(V * n * e + d * Q * A, d * Q * e - V * n * A, V * Q * A - d * n * e, V * Q * e + d * n * A);
  }
  toEuler() {
    const U = 2 * (this.w * this.x + this.y * this.z), t = 1 - 2 * (this.x * this.x + this.y * this.y), F = Math.atan2(U, t);
    let l;
    const V = 2 * (this.w * this.y - this.z * this.x);
    l = Math.abs(V) >= 1 ? Math.sign(V) * Math.PI / 2 : Math.asin(V);
    const d = 2 * (this.w * this.z + this.x * this.y), Q = 1 - 2 * (this.y * this.y + this.z * this.z), n = Math.atan2(d, Q);
    return new b(F, l, n);
  }
  static FromMatrix3(U) {
    const t = U.buffer, F = t[0] + t[4] + t[8];
    let l, V, d, Q;
    if (F > 0) {
      const n = 0.5 / Math.sqrt(F + 1);
      Q = 0.25 / n, l = (t[7] - t[5]) * n, V = (t[2] - t[6]) * n, d = (t[3] - t[1]) * n;
    } else if (t[0] > t[4] && t[0] > t[8]) {
      const n = 2 * Math.sqrt(1 + t[0] - t[4] - t[8]);
      Q = (t[7] - t[5]) / n, l = 0.25 * n, V = (t[1] + t[3]) / n, d = (t[2] + t[6]) / n;
    } else if (t[4] > t[8]) {
      const n = 2 * Math.sqrt(1 + t[4] - t[0] - t[8]);
      Q = (t[2] - t[6]) / n, l = (t[1] + t[3]) / n, V = 0.25 * n, d = (t[5] + t[7]) / n;
    } else {
      const n = 2 * Math.sqrt(1 + t[8] - t[0] - t[4]);
      Q = (t[3] - t[1]) / n, l = (t[2] + t[6]) / n, V = (t[5] + t[7]) / n, d = 0.25 * n;
    }
    return new j(l, V, d, Q);
  }
  static FromAxisAngle(U, t) {
    const F = t / 2, l = Math.sin(F), V = Math.cos(F);
    return new j(U.x * l, U.y * l, U.z * l, V);
  }
  static LookRotation(U) {
    const t = new b(0, 0, 1), F = t.dot(U);
    if (Math.abs(F - -1) < 1e-6) return new j(0, 1, 0, Math.PI);
    if (Math.abs(F - 1) < 1e-6) return new j();
    const l = Math.acos(F), V = t.cross(U).normalize();
    return j.FromAxisAngle(V, l);
  }
  toString() {
    return `[${this.flat().join(", ")}]`;
  }
}
class GU {
  constructor() {
    const U = /* @__PURE__ */ new Map();
    this.addEventListener = (t, F) => {
      U.has(t) || U.set(t, /* @__PURE__ */ new Set()), U.get(t).add(F);
    }, this.removeEventListener = (t, F) => {
      U.has(t) && U.get(t).delete(F);
    }, this.hasEventListener = (t, F) => !!U.has(t) && U.get(t).has(F), this.dispatchEvent = (t) => {
      if (U.has(t.type)) for (const F of U.get(t.type)) F(t);
    };
  }
}
class UU {
  constructor(U = 1, t = 0, F = 0, l = 0, V = 0, d = 1, Q = 0, n = 0, e = 0, A = 0, a = 1, h = 0, o = 0, c = 0, I = 0, g = 1) {
    this.buffer = [U, t, F, l, V, d, Q, n, e, A, a, h, o, c, I, g];
  }
  equals(U) {
    if (this.buffer.length !== U.buffer.length) return !1;
    if (this.buffer === U.buffer) return !0;
    for (let t = 0; t < this.buffer.length; t++) if (this.buffer[t] !== U.buffer[t]) return !1;
    return !0;
  }
  multiply(U) {
    const t = this.buffer, F = U.buffer;
    return new UU(F[0] * t[0] + F[1] * t[4] + F[2] * t[8] + F[3] * t[12], F[0] * t[1] + F[1] * t[5] + F[2] * t[9] + F[3] * t[13], F[0] * t[2] + F[1] * t[6] + F[2] * t[10] + F[3] * t[14], F[0] * t[3] + F[1] * t[7] + F[2] * t[11] + F[3] * t[15], F[4] * t[0] + F[5] * t[4] + F[6] * t[8] + F[7] * t[12], F[4] * t[1] + F[5] * t[5] + F[6] * t[9] + F[7] * t[13], F[4] * t[2] + F[5] * t[6] + F[6] * t[10] + F[7] * t[14], F[4] * t[3] + F[5] * t[7] + F[6] * t[11] + F[7] * t[15], F[8] * t[0] + F[9] * t[4] + F[10] * t[8] + F[11] * t[12], F[8] * t[1] + F[9] * t[5] + F[10] * t[9] + F[11] * t[13], F[8] * t[2] + F[9] * t[6] + F[10] * t[10] + F[11] * t[14], F[8] * t[3] + F[9] * t[7] + F[10] * t[11] + F[11] * t[15], F[12] * t[0] + F[13] * t[4] + F[14] * t[8] + F[15] * t[12], F[12] * t[1] + F[13] * t[5] + F[14] * t[9] + F[15] * t[13], F[12] * t[2] + F[13] * t[6] + F[14] * t[10] + F[15] * t[14], F[12] * t[3] + F[13] * t[7] + F[14] * t[11] + F[15] * t[15]);
  }
  clone() {
    const U = this.buffer;
    return new UU(U[0], U[1], U[2], U[3], U[4], U[5], U[6], U[7], U[8], U[9], U[10], U[11], U[12], U[13], U[14], U[15]);
  }
  determinant() {
    const U = this.buffer;
    return U[12] * U[9] * U[6] * U[3] - U[8] * U[13] * U[6] * U[3] - U[12] * U[5] * U[10] * U[3] + U[4] * U[13] * U[10] * U[3] + U[8] * U[5] * U[14] * U[3] - U[4] * U[9] * U[14] * U[3] - U[12] * U[9] * U[2] * U[7] + U[8] * U[13] * U[2] * U[7] + U[12] * U[1] * U[10] * U[7] - U[0] * U[13] * U[10] * U[7] - U[8] * U[1] * U[14] * U[7] + U[0] * U[9] * U[14] * U[7] + U[12] * U[5] * U[2] * U[11] - U[4] * U[13] * U[2] * U[11] - U[12] * U[1] * U[6] * U[11] + U[0] * U[13] * U[6] * U[11] + U[4] * U[1] * U[14] * U[11] - U[0] * U[5] * U[14] * U[11] - U[8] * U[5] * U[2] * U[15] + U[4] * U[9] * U[2] * U[15] + U[8] * U[1] * U[6] * U[15] - U[0] * U[9] * U[6] * U[15] - U[4] * U[1] * U[10] * U[15] + U[0] * U[5] * U[10] * U[15];
  }
  invert() {
    const U = this.buffer, t = this.determinant();
    if (t === 0) throw new Error("Matrix is not invertible.");
    const F = 1 / t;
    return new UU(F * (U[5] * U[10] * U[15] - U[5] * U[11] * U[14] - U[9] * U[6] * U[15] + U[9] * U[7] * U[14] + U[13] * U[6] * U[11] - U[13] * U[7] * U[10]), F * (-U[1] * U[10] * U[15] + U[1] * U[11] * U[14] + U[9] * U[2] * U[15] - U[9] * U[3] * U[14] - U[13] * U[2] * U[11] + U[13] * U[3] * U[10]), F * (U[1] * U[6] * U[15] - U[1] * U[7] * U[14] - U[5] * U[2] * U[15] + U[5] * U[3] * U[14] + U[13] * U[2] * U[7] - U[13] * U[3] * U[6]), F * (-U[1] * U[6] * U[11] + U[1] * U[7] * U[10] + U[5] * U[2] * U[11] - U[5] * U[3] * U[10] - U[9] * U[2] * U[7] + U[9] * U[3] * U[6]), F * (-U[4] * U[10] * U[15] + U[4] * U[11] * U[14] + U[8] * U[6] * U[15] - U[8] * U[7] * U[14] - U[12] * U[6] * U[11] + U[12] * U[7] * U[10]), F * (U[0] * U[10] * U[15] - U[0] * U[11] * U[14] - U[8] * U[2] * U[15] + U[8] * U[3] * U[14] + U[12] * U[2] * U[11] - U[12] * U[3] * U[10]), F * (-U[0] * U[6] * U[15] + U[0] * U[7] * U[14] + U[4] * U[2] * U[15] - U[4] * U[3] * U[14] - U[12] * U[2] * U[7] + U[12] * U[3] * U[6]), F * (U[0] * U[6] * U[11] - U[0] * U[7] * U[10] - U[4] * U[2] * U[11] + U[4] * U[3] * U[10] + U[8] * U[2] * U[7] - U[8] * U[3] * U[6]), F * (U[4] * U[9] * U[15] - U[4] * U[11] * U[13] - U[8] * U[5] * U[15] + U[8] * U[7] * U[13] + U[12] * U[5] * U[11] - U[12] * U[7] * U[9]), F * (-U[0] * U[9] * U[15] + U[0] * U[11] * U[13] + U[8] * U[1] * U[15] - U[8] * U[3] * U[13] - U[12] * U[1] * U[11] + U[12] * U[3] * U[9]), F * (U[0] * U[5] * U[15] - U[0] * U[7] * U[13] - U[4] * U[1] * U[15] + U[4] * U[3] * U[13] + U[12] * U[1] * U[7] - U[12] * U[3] * U[5]), F * (-U[0] * U[5] * U[11] + U[0] * U[7] * U[9] + U[4] * U[1] * U[11] - U[4] * U[3] * U[9] - U[8] * U[1] * U[7] + U[8] * U[3] * U[5]), F * (-U[4] * U[9] * U[14] + U[4] * U[10] * U[13] + U[8] * U[5] * U[14] - U[8] * U[6] * U[13] - U[12] * U[5] * U[10] + U[12] * U[6] * U[9]), F * (U[0] * U[9] * U[14] - U[0] * U[10] * U[13] - U[8] * U[1] * U[14] + U[8] * U[2] * U[13] + U[12] * U[1] * U[10] - U[12] * U[2] * U[9]), F * (-U[0] * U[5] * U[14] + U[0] * U[6] * U[13] + U[4] * U[1] * U[14] - U[4] * U[2] * U[13] - U[12] * U[1] * U[6] + U[12] * U[2] * U[5]), F * (U[0] * U[5] * U[10] - U[0] * U[6] * U[9] - U[4] * U[1] * U[10] + U[4] * U[2] * U[9] + U[8] * U[1] * U[6] - U[8] * U[2] * U[5]));
  }
  static Compose(U, t, F) {
    const l = t.x, V = t.y, d = t.z, Q = t.w, n = l + l, e = V + V, A = d + d, a = l * n, h = l * e, o = l * A, c = V * e, I = V * A, g = d * A, y = Q * n, J = Q * e, u = Q * A, N = F.x, E = F.y, w = F.z;
    return new UU((1 - (c + g)) * N, (h + u) * N, (o - J) * N, 0, (h - u) * E, (1 - (a + g)) * E, (I + y) * E, 0, (o + J) * w, (I - y) * w, (1 - (a + c)) * w, 0, U.x, U.y, U.z, 1);
  }
  toString() {
    return `[${this.buffer.join(", ")}]`;
  }
}
class OU extends Event {
  constructor(U) {
    super("objectAdded"), this.object = U;
  }
}
class LU extends Event {
  constructor(U) {
    super("objectRemoved"), this.object = U;
  }
}
class PU extends Event {
  constructor(U) {
    super("objectChanged"), this.object = U;
  }
}
class mU extends GU {
  constructor() {
    super(), this.positionChanged = !1, this.rotationChanged = !1, this.scaleChanged = !1, this._position = new b(), this._rotation = new j(), this._scale = new b(1, 1, 1), this._transform = new UU(), this._changeEvent = new PU(this), this.update = () => {
    }, this.applyPosition = () => {
      this.position = new b();
    }, this.applyRotation = () => {
      this.rotation = new j();
    }, this.applyScale = () => {
      this.scale = new b(1, 1, 1);
    }, this.raiseChangeEvent = () => {
      this.dispatchEvent(this._changeEvent);
    };
  }
  _updateMatrix() {
    this._transform = UU.Compose(this._position, this._rotation, this._scale);
  }
  get position() {
    return this._position;
  }
  set position(U) {
    this._position.equals(U) || (this._position = U, this.positionChanged = !0, this._updateMatrix(), this.dispatchEvent(this._changeEvent));
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(U) {
    this._rotation.equals(U) || (this._rotation = U, this.rotationChanged = !0, this._updateMatrix(), this.dispatchEvent(this._changeEvent));
  }
  get scale() {
    return this._scale;
  }
  set scale(U) {
    this._scale.equals(U) || (this._scale = U, this.scaleChanged = !0, this._updateMatrix(), this.dispatchEvent(this._changeEvent));
  }
  get forward() {
    let U = new b(0, 0, 1);
    return U = this.rotation.apply(U), U;
  }
  get transform() {
    return this._transform;
  }
}
class QU {
  constructor(U = 1, t = 0, F = 0, l = 0, V = 1, d = 0, Q = 0, n = 0, e = 1) {
    this.buffer = [U, t, F, l, V, d, Q, n, e];
  }
  equals(U) {
    if (this.buffer.length !== U.buffer.length) return !1;
    if (this.buffer === U.buffer) return !0;
    for (let t = 0; t < this.buffer.length; t++) if (this.buffer[t] !== U.buffer[t]) return !1;
    return !0;
  }
  multiply(U) {
    const t = this.buffer, F = U.buffer;
    return new QU(F[0] * t[0] + F[3] * t[1] + F[6] * t[2], F[1] * t[0] + F[4] * t[1] + F[7] * t[2], F[2] * t[0] + F[5] * t[1] + F[8] * t[2], F[0] * t[3] + F[3] * t[4] + F[6] * t[5], F[1] * t[3] + F[4] * t[4] + F[7] * t[5], F[2] * t[3] + F[5] * t[4] + F[8] * t[5], F[0] * t[6] + F[3] * t[7] + F[6] * t[8], F[1] * t[6] + F[4] * t[7] + F[7] * t[8], F[2] * t[6] + F[5] * t[7] + F[8] * t[8]);
  }
  clone() {
    const U = this.buffer;
    return new QU(U[0], U[1], U[2], U[3], U[4], U[5], U[6], U[7], U[8]);
  }
  static Eye(U = 1) {
    return new QU(U, 0, 0, 0, U, 0, 0, 0, U);
  }
  static Diagonal(U) {
    return new QU(U.x, 0, 0, 0, U.y, 0, 0, 0, U.z);
  }
  static RotationFromQuaternion(U) {
    return new QU(1 - 2 * U.y * U.y - 2 * U.z * U.z, 2 * U.x * U.y - 2 * U.z * U.w, 2 * U.x * U.z + 2 * U.y * U.w, 2 * U.x * U.y + 2 * U.z * U.w, 1 - 2 * U.x * U.x - 2 * U.z * U.z, 2 * U.y * U.z - 2 * U.x * U.w, 2 * U.x * U.z - 2 * U.y * U.w, 2 * U.y * U.z + 2 * U.x * U.w, 1 - 2 * U.x * U.x - 2 * U.y * U.y);
  }
  static RotationFromEuler(U) {
    const t = Math.cos(U.x), F = Math.sin(U.x), l = Math.cos(U.y), V = Math.sin(U.y), d = Math.cos(U.z), Q = Math.sin(U.z);
    return new QU(l * d + V * F * Q, -l * Q + V * F * d, V * t, t * Q, t * d, -F, -V * d + l * F * Q, V * Q + l * F * d, l * t);
  }
  toString() {
    return `[${this.buffer.join(", ")}]`;
  }
}
class aU {
  constructor(U = 0, t = null, F = null, l = null, V = null) {
    this.changed = !1, this.detached = !1, this._vertexCount = U, this._positions = t || new Float32Array(0), this._rotations = F || new Float32Array(0), this._scales = l || new Float32Array(0), this._colors = V || new Uint8Array(0), this._selection = new Uint8Array(this.vertexCount), this.translate = (d) => {
      for (let Q = 0; Q < this.vertexCount; Q++) this.positions[3 * Q + 0] += d.x, this.positions[3 * Q + 1] += d.y, this.positions[3 * Q + 2] += d.z;
      this.changed = !0;
    }, this.rotate = (d) => {
      const Q = QU.RotationFromQuaternion(d).buffer;
      for (let n = 0; n < this.vertexCount; n++) {
        const e = this.positions[3 * n + 0], A = this.positions[3 * n + 1], a = this.positions[3 * n + 2];
        this.positions[3 * n + 0] = Q[0] * e + Q[1] * A + Q[2] * a, this.positions[3 * n + 1] = Q[3] * e + Q[4] * A + Q[5] * a, this.positions[3 * n + 2] = Q[6] * e + Q[7] * A + Q[8] * a;
        const h = new j(this.rotations[4 * n + 1], this.rotations[4 * n + 2], this.rotations[4 * n + 3], this.rotations[4 * n + 0]), o = d.multiply(h);
        this.rotations[4 * n + 1] = o.x, this.rotations[4 * n + 2] = o.y, this.rotations[4 * n + 3] = o.z, this.rotations[4 * n + 0] = o.w;
      }
      this.changed = !0;
    }, this.scale = (d) => {
      for (let Q = 0; Q < this.vertexCount; Q++) this.positions[3 * Q + 0] *= d.x, this.positions[3 * Q + 1] *= d.y, this.positions[3 * Q + 2] *= d.z, this.scales[3 * Q + 0] *= d.x, this.scales[3 * Q + 1] *= d.y, this.scales[3 * Q + 2] *= d.z;
      this.changed = !0;
    }, this.serialize = () => {
      const d = new Uint8Array(this.vertexCount * aU.RowLength), Q = new Float32Array(d.buffer), n = new Uint8Array(d.buffer);
      for (let e = 0; e < this.vertexCount; e++) Q[8 * e + 0] = this.positions[3 * e + 0], Q[8 * e + 1] = this.positions[3 * e + 1], Q[8 * e + 2] = this.positions[3 * e + 2], n[32 * e + 24 + 0] = this.colors[4 * e + 0], n[32 * e + 24 + 1] = this.colors[4 * e + 1], n[32 * e + 24 + 2] = this.colors[4 * e + 2], n[32 * e + 24 + 3] = this.colors[4 * e + 3], Q[8 * e + 3 + 0] = this.scales[3 * e + 0], Q[8 * e + 3 + 1] = this.scales[3 * e + 1], Q[8 * e + 3 + 2] = this.scales[3 * e + 2], n[32 * e + 28 + 0] = 128 * this.rotations[4 * e + 0] + 128 & 255, n[32 * e + 28 + 1] = 128 * this.rotations[4 * e + 1] + 128 & 255, n[32 * e + 28 + 2] = 128 * this.rotations[4 * e + 2] + 128 & 255, n[32 * e + 28 + 3] = 128 * this.rotations[4 * e + 3] + 128 & 255;
      return d;
    }, this.reattach = (d, Q, n, e, A) => {
      console.assert(d.byteLength === 3 * this.vertexCount * 4, `Expected ${3 * this.vertexCount * 4} bytes, got ${d.byteLength} bytes`), this._positions = new Float32Array(d), this._rotations = new Float32Array(Q), this._scales = new Float32Array(n), this._colors = new Uint8Array(e), this._selection = new Uint8Array(A), this.detached = !1;
    };
  }
  static Deserialize(U) {
    const t = U.length / aU.RowLength, F = new Float32Array(3 * t), l = new Float32Array(4 * t), V = new Float32Array(3 * t), d = new Uint8Array(4 * t), Q = new Float32Array(U.buffer), n = new Uint8Array(U.buffer);
    for (let e = 0; e < t; e++) F[3 * e + 0] = Q[8 * e + 0], F[3 * e + 1] = Q[8 * e + 1], F[3 * e + 2] = Q[8 * e + 2], l[4 * e + 0] = (n[32 * e + 28 + 0] - 128) / 128, l[4 * e + 1] = (n[32 * e + 28 + 1] - 128) / 128, l[4 * e + 2] = (n[32 * e + 28 + 2] - 128) / 128, l[4 * e + 3] = (n[32 * e + 28 + 3] - 128) / 128, V[3 * e + 0] = Q[8 * e + 3 + 0], V[3 * e + 1] = Q[8 * e + 3 + 1], V[3 * e + 2] = Q[8 * e + 3 + 2], d[4 * e + 0] = n[32 * e + 24 + 0], d[4 * e + 1] = n[32 * e + 24 + 1], d[4 * e + 2] = n[32 * e + 24 + 2], d[4 * e + 3] = n[32 * e + 24 + 3];
    return new aU(t, F, l, V, d);
  }
  get vertexCount() {
    return this._vertexCount;
  }
  get positions() {
    return this._positions;
  }
  get rotations() {
    return this._rotations;
  }
  get scales() {
    return this._scales;
  }
  get colors() {
    return this._colors;
  }
  get selection() {
    return this._selection;
  }
}
aU.RowLength = 32;
class hU {
  constructor(U, t, F, l, V) {
    this._vertexCount = U, this._positions = t, this._data = F, this._width = l, this._height = V, this.serialize = () => new Uint8Array(this._data.buffer);
  }
  static Deserialize(U, t, F) {
    const l = new Uint32Array(U.buffer), V = new Float32Array(U.buffer), d = Math.floor(V.byteLength / this.RowLength), Q = new Float32Array(3 * d);
    for (let n = 0; n < d; n++) Q[3 * n + 0] = V[16 * n + 0], Q[3 * n + 1] = V[16 * n + 1], Q[3 * n + 2] = V[16 * n + 2], Q[3 * n + 0] = V[16 * n + 3];
    return new hU(d, Q, l, t, F);
  }
  get vertexCount() {
    return this._vertexCount;
  }
  get positions() {
    return this._positions;
  }
  get data() {
    return this._data;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
}
hU.RowLength = 64;
class JU {
  static SplatToPLY(U, t) {
    let F = `ply
format binary_little_endian 1.0
`;
    F += `element vertex ${t}
`;
    const l = ["x", "y", "z", "nx", "ny", "nz", "f_dc_0", "f_dc_1", "f_dc_2"];
    for (let c = 0; c < 45; c++) l.push(`f_rest_${c}`);
    l.push("opacity"), l.push("scale_0"), l.push("scale_1"), l.push("scale_2"), l.push("rot_0"), l.push("rot_1"), l.push("rot_2"), l.push("rot_3");
    for (const c of l) F += `property float ${c}
`;
    F += `end_header
`;
    const V = new TextEncoder().encode(F), d = 248, Q = t * d, n = new DataView(new ArrayBuffer(V.length + Q));
    new Uint8Array(n.buffer).set(V, 0);
    const e = new Float32Array(U), A = new Uint8Array(U), a = V.length, h = 220, o = 232;
    for (let c = 0; c < t; c++) {
      const I = e[8 * c + 0], g = e[8 * c + 1], y = e[8 * c + 2], J = (A[32 * c + 24 + 0] / 255 - 0.5) / this.SH_C0, u = (A[32 * c + 24 + 1] / 255 - 0.5) / this.SH_C0, N = (A[32 * c + 24 + 2] / 255 - 0.5) / this.SH_C0, E = A[32 * c + 24 + 3] / 255, w = Math.log(E / (1 - E)), x = Math.log(e[8 * c + 3 + 0]), $ = Math.log(e[8 * c + 3 + 1]), q = Math.log(e[8 * c + 3 + 2]);
      let f = new j((A[32 * c + 28 + 1] - 128) / 128, (A[32 * c + 28 + 2] - 128) / 128, (A[32 * c + 28 + 3] - 128) / 128, (A[32 * c + 28 + 0] - 128) / 128);
      f = f.normalize();
      const lU = f.w, S = f.x, k = f.y, dU = f.z;
      n.setFloat32(a + d * c + 0, I, !0), n.setFloat32(a + d * c + 4, g, !0), n.setFloat32(a + d * c + 8, y, !0), n.setFloat32(a + d * c + 24 + 0, J, !0), n.setFloat32(a + d * c + 24 + 4, u, !0), n.setFloat32(a + d * c + 24 + 8, N, !0), n.setFloat32(a + d * c + 216, w, !0), n.setFloat32(a + d * c + h + 0, x, !0), n.setFloat32(a + d * c + h + 4, $, !0), n.setFloat32(a + d * c + h + 8, q, !0), n.setFloat32(a + d * c + o + 0, lU, !0), n.setFloat32(a + d * c + o + 4, S, !0), n.setFloat32(a + d * c + o + 8, k, !0), n.setFloat32(a + d * c + o + 12, dU, !0);
    }
    return n.buffer;
  }
}
JU.SH_C0 = 0.28209479177387814;
class IU {
  constructor(U, t) {
    this.min = U, this.max = t;
  }
  contains(U) {
    return U.x >= this.min.x && U.x <= this.max.x && U.y >= this.min.y && U.y <= this.max.y && U.z >= this.min.z && U.z <= this.max.z;
  }
  intersects(U) {
    return this.max.x >= U.min.x && this.min.x <= U.max.x && this.max.y >= U.min.y && this.min.y <= U.max.y && this.max.z >= U.min.z && this.min.z <= U.max.z;
  }
  size() {
    return this.max.subtract(this.min);
  }
  center() {
    return this.min.add(this.max).divide(2);
  }
  expand(U) {
    this.min = this.min.min(U), this.max = this.max.max(U);
  }
  permute() {
    const U = this.min, t = this.max;
    this.min = new b(Math.min(U.x, t.x), Math.min(U.y, t.y), Math.min(U.z, t.z)), this.max = new b(Math.max(U.x, t.x), Math.max(U.y, t.y), Math.max(U.z, t.z));
  }
}
class VU extends mU {
  constructor(U = void 0) {
    super(), this.selectedChanged = !1, this.colorTransformChanged = !1, this._selected = !1, this._colorTransforms = [], this._colorTransformsMap = /* @__PURE__ */ new Map(), this._data = U || new aU(), this._bounds = new IU(new b(1 / 0, 1 / 0, 1 / 0), new b(-1 / 0, -1 / 0, -1 / 0)), this.recalculateBounds = () => {
      this._bounds = new IU(new b(1 / 0, 1 / 0, 1 / 0), new b(-1 / 0, -1 / 0, -1 / 0));
      for (let t = 0; t < this._data.vertexCount; t++) this._bounds.expand(new b(this._data.positions[3 * t], this._data.positions[3 * t + 1], this._data.positions[3 * t + 2]));
    }, this.applyPosition = () => {
      this.data.translate(this.position), this.position = new b();
    }, this.applyRotation = () => {
      this.data.rotate(this.rotation), this.rotation = new j();
    }, this.applyScale = () => {
      this.data.scale(this.scale), this.scale = new b(1, 1, 1);
    }, this.recalculateBounds();
  }
  saveToFile(U = null, t = null) {
    if (!document) return;
    if (t) {
      if (t !== "splat" && t !== "ply") throw new Error("Invalid format. Must be 'splat' or 'ply'");
    } else t = "splat";
    if (!U) {
      const d = /* @__PURE__ */ new Date();
      U = `splat-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.${t}`;
    }
    this.applyRotation(), this.applyScale(), this.applyPosition();
    const F = this.data.serialize();
    let l;
    if (t === "ply") {
      const d = JU.SplatToPLY(F.buffer, this.data.vertexCount);
      l = new Blob([d], { type: "application/octet-stream" });
    } else l = new Blob([F.buffer], { type: "application/octet-stream" });
    const V = document.createElement("a");
    V.download = U, V.href = URL.createObjectURL(l), V.click();
  }
  get data() {
    return this._data;
  }
  get selected() {
    return this._selected;
  }
  set selected(U) {
    this._selected !== U && (this._selected = U, this.selectedChanged = !0, this.dispatchEvent(this._changeEvent));
  }
  get colorTransforms() {
    return this._colorTransforms;
  }
  get colorTransformsMap() {
    return this._colorTransformsMap;
  }
  get bounds() {
    let U = this._bounds.center();
    U = U.add(this.position);
    let t = this._bounds.size();
    return t = t.multiply(this.scale), new IU(U.subtract(t.divide(2)), U.add(t.divide(2)));
  }
}
class sU extends mU {
  constructor(U) {
    super(), this._data = U;
  }
  get data() {
    return this._data;
  }
}
class _U {
  constructor() {
    this._fx = 1132, this._fy = 1132, this._near = 0.1, this._far = 100, this._width = 512, this._height = 512, this._projectionMatrix = new UU(), this._viewMatrix = new UU(), this._viewProj = new UU(), this._updateProjectionMatrix = () => {
      this._projectionMatrix = new UU(2 * this.fx / this.width, 0, 0, 0, 0, -2 * this.fy / this.height, 0, 0, 0, 0, this.far / (this.far - this.near), 1, 0, 0, -this.far * this.near / (this.far - this.near), 0), this._viewProj = this.projectionMatrix.multiply(this.viewMatrix);
    }, this.update = (U, t) => {
      const F = QU.RotationFromQuaternion(t).buffer, l = U.flat();
      this._viewMatrix = new UU(F[0], F[1], F[2], 0, F[3], F[4], F[5], 0, F[6], F[7], F[8], 0, -l[0] * F[0] - l[1] * F[3] - l[2] * F[6], -l[0] * F[1] - l[1] * F[4] - l[2] * F[7], -l[0] * F[2] - l[1] * F[5] - l[2] * F[8], 1), this._viewProj = this.projectionMatrix.multiply(this.viewMatrix);
    }, this.setSize = (U, t) => {
      this._width = U, this._height = t, this._updateProjectionMatrix();
    };
  }
  get fx() {
    return this._fx;
  }
  set fx(U) {
    this._fx !== U && (this._fx = U, this._updateProjectionMatrix());
  }
  get fy() {
    return this._fy;
  }
  set fy(U) {
    this._fy !== U && (this._fy = U, this._updateProjectionMatrix());
  }
  get near() {
    return this._near;
  }
  set near(U) {
    this._near !== U && (this._near = U, this._updateProjectionMatrix());
  }
  get far() {
    return this._far;
  }
  set far(U) {
    this._far !== U && (this._far = U, this._updateProjectionMatrix());
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get projectionMatrix() {
    return this._projectionMatrix;
  }
  get viewMatrix() {
    return this._viewMatrix;
  }
  get viewProj() {
    return this._viewProj;
  }
}
class tU {
  constructor(U = 0, t = 0, F = 0, l = 0) {
    this.x = U, this.y = t, this.z = F, this.w = l;
  }
  equals(U) {
    return this.x === U.x && this.y === U.y && this.z === U.z && this.w === U.w;
  }
  add(U) {
    return typeof U == "number" ? new tU(this.x + U, this.y + U, this.z + U, this.w + U) : new tU(this.x + U.x, this.y + U.y, this.z + U.z, this.w + U.w);
  }
  subtract(U) {
    return typeof U == "number" ? new tU(this.x - U, this.y - U, this.z - U, this.w - U) : new tU(this.x - U.x, this.y - U.y, this.z - U.z, this.w - U.w);
  }
  multiply(U) {
    return typeof U == "number" ? new tU(this.x * U, this.y * U, this.z * U, this.w * U) : U instanceof tU ? new tU(this.x * U.x, this.y * U.y, this.z * U.z, this.w * U.w) : new tU(this.x * U.buffer[0] + this.y * U.buffer[4] + this.z * U.buffer[8] + this.w * U.buffer[12], this.x * U.buffer[1] + this.y * U.buffer[5] + this.z * U.buffer[9] + this.w * U.buffer[13], this.x * U.buffer[2] + this.y * U.buffer[6] + this.z * U.buffer[10] + this.w * U.buffer[14], this.x * U.buffer[3] + this.y * U.buffer[7] + this.z * U.buffer[11] + this.w * U.buffer[15]);
  }
  dot(U) {
    return this.x * U.x + this.y * U.y + this.z * U.z + this.w * U.w;
  }
  lerp(U, t) {
    return new tU(this.x + (U.x - this.x) * t, this.y + (U.y - this.y) * t, this.z + (U.z - this.z) * t, this.w + (U.w - this.w) * t);
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  distanceTo(U) {
    return Math.sqrt((this.x - U.x) ** 2 + (this.y - U.y) ** 2 + (this.z - U.z) ** 2 + (this.w - U.w) ** 2);
  }
  normalize() {
    const U = this.magnitude();
    return new tU(this.x / U, this.y / U, this.z / U, this.w / U);
  }
  flat() {
    return [this.x, this.y, this.z, this.w];
  }
  clone() {
    return new tU(this.x, this.y, this.z, this.w);
  }
  toString() {
    return `[${this.flat().join(", ")}]`;
  }
}
class Ql extends mU {
  constructor(U = void 0) {
    super(), this._data = U || new _U(), this._position = new b(0, 0, -5), this.update = () => {
      this.data.update(this.position, this.rotation);
    }, this.screenPointToRay = (t, F) => {
      const l = new tU(t, F, -1, 1), V = this._data.projectionMatrix.invert(), d = l.multiply(V), Q = this._data.viewMatrix.invert(), n = d.multiply(Q);
      return new b(n.x / n.w, n.y / n.w, n.z / n.w).subtract(this.position).normalize();
    };
  }
  get data() {
    return this._data;
  }
}
class nl extends GU {
  constructor() {
    super(), this._objects = [], this.addObject = (U) => {
      this.objects.push(U), this.dispatchEvent(new OU(U));
    }, this.removeObject = (U) => {
      const t = this.objects.indexOf(U);
      if (t < 0) throw new Error("Object not found in scene");
      this.objects.splice(t, 1), this.dispatchEvent(new LU(U));
    }, this.findObject = (U) => {
      for (const t of this.objects) if (U(t)) return t;
    }, this.findObjectOfType = (U) => {
      for (const t of this.objects) if (t instanceof U) return t;
    }, this.reset = () => {
      const U = this.objects.slice();
      for (const t of U) this.removeObject(t);
    }, this.reset();
  }
  saveToFile(U = null, t = null) {
    if (!document) return;
    if (t) {
      if (t !== "splat" && t !== "ply") throw new Error("Invalid format. Must be 'splat' or 'ply'");
    } else t = "splat";
    if (!U) {
      const e = /* @__PURE__ */ new Date();
      U = `scene-${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}.${t}`;
    }
    const F = [];
    let l = 0;
    for (const e of this.objects) if (e.applyRotation(), e.applyScale(), e.applyPosition(), e instanceof VU) {
      const A = e.data.serialize();
      F.push(A), l += e.data.vertexCount;
    }
    const V = new Uint8Array(l * aU.RowLength);
    let d, Q = 0;
    for (const e of F) V.set(e, Q), Q += e.length;
    if (t === "ply") {
      const e = JU.SplatToPLY(V.buffer, l);
      d = new Blob([e], { type: "application/octet-stream" });
    } else d = new Blob([V.buffer], { type: "application/octet-stream" });
    const n = document.createElement("a");
    n.download = U, n.href = URL.createObjectURL(d), n.click();
  }
  get objects() {
    return this._objects;
  }
}
async function XU(p, U) {
  const t = await fetch(p, { mode: "cors", credentials: "omit", cache: U ? "force-cache" : "default" });
  if (t.status != 200) throw new Error(t.status + " Unable to load " + t.url);
  return t;
}
async function pU(p, U) {
  return p.headers.has("content-length") ? async function(t, F) {
    const l = t.body.getReader(), V = parseInt(t.headers.get("content-length")), d = new Uint8Array(V);
    let Q = 0;
    for (; ; ) {
      const { done: n, value: e } = await l.read();
      if (n) break;
      d.set(e, Q), Q += e.length, F == null || F(Q / V);
    }
    return d;
  }(p, U) : async function(t, F) {
    const l = t.body.getReader(), V = [];
    let d = 0;
    for (; ; ) {
      const { done: e, value: A } = await l.read();
      if (e) break;
      V.push(A), d += A.length;
    }
    const Q = new Uint8Array(d);
    let n = 0;
    for (const e of V) Q.set(e, n), n += e.length, F == null || F(n / d);
    return Q;
  }(p, U);
}
class dl {
  static async LoadAsync(U, t, F, l = !1) {
    const V = await XU(U, l), d = await pU(V, F);
    return this.LoadFromArrayBuffer(d, t);
  }
  static async LoadFromFileAsync(U, t, F) {
    const l = new FileReader();
    let V = new VU();
    return l.onload = (d) => {
      V = this.LoadFromArrayBuffer(d.target.result, t);
    }, l.onprogress = (d) => {
      F == null || F(d.loaded / d.total);
    }, l.readAsArrayBuffer(U), await new Promise((d) => {
      l.onloadend = () => {
        d();
      };
    }), V;
  }
  static LoadFromArrayBuffer(U, t) {
    const F = new Uint8Array(U), l = aU.Deserialize(F), V = new VU(l);
    return t.addObject(V), V;
  }
}
class el {
  static async LoadAsync(U, t, F, l, V = !1) {
    const d = await XU(U, V), Q = await pU(d, l);
    return this._ParseSplatvBuffer(Q.buffer, t, F);
  }
  static async LoadFromFileAsync(U, t, F, l) {
    const V = new FileReader();
    let d = null;
    if (V.onload = (Q) => {
      d = this._ParseSplatvBuffer(Q.target.result, t, F);
    }, V.onprogress = (Q) => {
      l == null || l(Q.loaded / Q.total);
    }, V.readAsArrayBuffer(U), await new Promise((Q) => {
      V.onloadend = () => {
        Q();
      };
    }), !d) throw new Error("Failed to load splatv file");
    return d;
  }
  static _ParseSplatvBuffer(U, t, F) {
    let l = null;
    const V = (h, o, c) => {
      if (h.type === "magic") {
        const I = new Int32Array(o.buffer);
        if (I[0] !== 26443) throw new Error("Invalid splatv file");
        c.push({ size: I[1], type: "chunks" });
      } else if (h.type === "chunks") {
        const I = JSON.parse(new TextDecoder("utf-8").decode(o));
        if (I.length == 0) throw new Error("Invalid splatv file");
        I.length > 1 && console.warn("Splatv file contains more than one chunk, only the first one will be loaded");
        const g = I[0], y = g.cameras;
        if (F && y && y.length) {
          const J = y[0], u = new b(J.position[0], J.position[1], J.position[2]), N = j.FromMatrix3(new QU(J.rotation[0][0], J.rotation[0][1], J.rotation[0][2], J.rotation[1][0], J.rotation[1][1], J.rotation[1][2], J.rotation[2][0], J.rotation[2][1], J.rotation[2][2]));
          F.position = u, F.rotation = N;
        }
        c.push(g);
      } else if (h.type === "splat") {
        const I = hU.Deserialize(o, h.texwidth, h.texheight), g = new sU(I);
        t.addObject(g), l = g;
      }
    }, d = new Uint8Array(U), Q = [{ size: 8, type: "magic", texwidth: 0, texheight: 0 }];
    let n = Q.shift(), e = new Uint8Array(n.size), A = 0, a = 0;
    for (; n; ) {
      for (; A < n.size; ) {
        const h = Math.min(n.size - A, d.length - a);
        e.set(d.subarray(a, a + h), A), A += h, a += h;
      }
      if (V(n, e, Q), l) return l;
      n = Q.shift(), n && (e = new Uint8Array(n.size), A = 0);
    }
    throw new Error("Invalid splatv file");
  }
}
function qU(p, U, t) {
  var F = function(Q, n) {
    var e = atob(Q);
    return e;
  }(p), l = F.indexOf(`
`, 10) + 1, V = F.substring(l) + "", d = new Blob([V], { type: "application/javascript" });
  return URL.createObjectURL(d);
}
function EU(p, U, t) {
  var F;
  return function(l) {
    return F = F || qU(p), new Worker(F, l);
  };
}
var $U = EU("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgdmFyIGxvYWRXYXNtID0gKCgpID0+IHsKICAgIAogICAgcmV0dXJuICgKICBmdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkgewoKICB2YXIgTW9kdWxlPW1vZHVsZUFyZzt2YXIgcmVhZHlQcm9taXNlUmVzb2x2ZSxyZWFkeVByb21pc2VSZWplY3Q7TW9kdWxlWyJyZWFkeSJdPW5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntyZWFkeVByb21pc2VSZXNvbHZlPXJlc29sdmU7cmVhZHlQcm9taXNlUmVqZWN0PXJlamVjdDt9KTt2YXIgbW9kdWxlT3ZlcnJpZGVzPU9iamVjdC5hc3NpZ24oe30sTW9kdWxlKTt2YXIgc2NyaXB0RGlyZWN0b3J5PSIiO2Z1bmN0aW9uIGxvY2F0ZUZpbGUocGF0aCl7aWYoTW9kdWxlWyJsb2NhdGVGaWxlIl0pe3JldHVybiBNb2R1bGVbImxvY2F0ZUZpbGUiXShwYXRoLHNjcmlwdERpcmVjdG9yeSl9cmV0dXJuIHNjcmlwdERpcmVjdG9yeStwYXRofXZhciByZWFkQmluYXJ5O3t7c2NyaXB0RGlyZWN0b3J5PXNlbGYubG9jYXRpb24uaHJlZjt9aWYoc2NyaXB0RGlyZWN0b3J5LmluZGV4T2YoImJsb2I6IikhPT0wKXtzY3JpcHREaXJlY3Rvcnk9c2NyaXB0RGlyZWN0b3J5LnN1YnN0cigwLHNjcmlwdERpcmVjdG9yeS5yZXBsYWNlKC9bPyNdLiovLCIiKS5sYXN0SW5kZXhPZigiLyIpKzEpO31lbHNlIHtzY3JpcHREaXJlY3Rvcnk9IiI7fXt7cmVhZEJpbmFyeT11cmw9Pnt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKX07fX19TW9kdWxlWyJwcmludCJdfHxjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO3ZhciBlcnI9TW9kdWxlWyJwcmludEVyciJdfHxjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihNb2R1bGUsbW9kdWxlT3ZlcnJpZGVzKTttb2R1bGVPdmVycmlkZXM9bnVsbDtpZihNb2R1bGVbImFyZ3VtZW50cyJdKU1vZHVsZVsiYXJndW1lbnRzIl07aWYoTW9kdWxlWyJ0aGlzUHJvZ3JhbSJdKU1vZHVsZVsidGhpc1Byb2dyYW0iXTtpZihNb2R1bGVbInF1aXQiXSlNb2R1bGVbInF1aXQiXTt2YXIgd2FzbUJpbmFyeTtpZihNb2R1bGVbIndhc21CaW5hcnkiXSl3YXNtQmluYXJ5PU1vZHVsZVsid2FzbUJpbmFyeSJdO2lmKHR5cGVvZiBXZWJBc3NlbWJseSE9Im9iamVjdCIpe2Fib3J0KCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkIik7fXZhciB3YXNtTWVtb3J5O3ZhciBBQk9SVD1mYWxzZTt2YXIgSEVBUDgsSEVBUFU4LEhFQVAxNixIRUFQVTE2LEhFQVAzMixIRUFQVTMyLEhFQVBGMzIsSEVBUEY2NDtmdW5jdGlvbiB1cGRhdGVNZW1vcnlWaWV3cygpe3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO01vZHVsZVsiSEVBUDgiXT1IRUFQOD1uZXcgSW50OEFycmF5KGIpO01vZHVsZVsiSEVBUDE2Il09SEVBUDE2PW5ldyBJbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUFU4Il09SEVBUFU4PW5ldyBVaW50OEFycmF5KGIpO01vZHVsZVsiSEVBUFUxNiJdPUhFQVBVMTY9bmV3IFVpbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUDMyIl09SEVBUDMyPW5ldyBJbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUFUzMiJdPUhFQVBVMzI9bmV3IFVpbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUEYzMiJdPUhFQVBGMzI9bmV3IEZsb2F0MzJBcnJheShiKTtNb2R1bGVbIkhFQVBGNjQiXT1IRUFQRjY0PW5ldyBGbG9hdDY0QXJyYXkoYik7fXZhciBfX0FUUFJFUlVOX189W107dmFyIF9fQVRJTklUX189W107dmFyIF9fQVRQT1NUUlVOX189W107ZnVuY3Rpb24gcHJlUnVuKCl7aWYoTW9kdWxlWyJwcmVSdW4iXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlUnVuIl09PSJmdW5jdGlvbiIpTW9kdWxlWyJwcmVSdW4iXT1bTW9kdWxlWyJwcmVSdW4iXV07d2hpbGUoTW9kdWxlWyJwcmVSdW4iXS5sZW5ndGgpe2FkZE9uUHJlUnVuKE1vZHVsZVsicHJlUnVuIl0uc2hpZnQoKSk7fX1jYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUFJFUlVOX18pO31mdW5jdGlvbiBpbml0UnVudGltZSgpe2NhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pO31mdW5jdGlvbiBwb3N0UnVuKCl7aWYoTW9kdWxlWyJwb3N0UnVuIl0pe2lmKHR5cGVvZiBNb2R1bGVbInBvc3RSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInBvc3RSdW4iXT1bTW9kdWxlWyJwb3N0UnVuIl1dO3doaWxlKE1vZHVsZVsicG9zdFJ1biJdLmxlbmd0aCl7YWRkT25Qb3N0UnVuKE1vZHVsZVsicG9zdFJ1biJdLnNoaWZ0KCkpO319Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBPU1RSVU5fXyk7fWZ1bmN0aW9uIGFkZE9uUHJlUnVuKGNiKXtfX0FUUFJFUlVOX18udW5zaGlmdChjYik7fWZ1bmN0aW9uIGFkZE9uSW5pdChjYil7X19BVElOSVRfXy51bnNoaWZ0KGNiKTt9ZnVuY3Rpb24gYWRkT25Qb3N0UnVuKGNiKXtfX0FUUE9TVFJVTl9fLnVuc2hpZnQoY2IpO312YXIgcnVuRGVwZW5kZW5jaWVzPTA7dmFyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2Z1bmN0aW9uIGFkZFJ1bkRlcGVuZGVuY3koaWQpe3J1bkRlcGVuZGVuY2llcysrO2lmKE1vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKXtNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXShydW5EZXBlbmRlbmNpZXMpO319ZnVuY3Rpb24gcmVtb3ZlUnVuRGVwZW5kZW5jeShpZCl7cnVuRGVwZW5kZW5jaWVzLS07aWYoTW9kdWxlWyJtb25pdG9yUnVuRGVwZW5kZW5jaWVzIl0pe01vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKHJ1bkRlcGVuZGVuY2llcyk7fWlmKHJ1bkRlcGVuZGVuY2llcz09MCl7aWYoZGVwZW5kZW5jaWVzRnVsZmlsbGVkKXt2YXIgY2FsbGJhY2s9ZGVwZW5kZW5jaWVzRnVsZmlsbGVkO2RlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2NhbGxiYWNrKCk7fX19ZnVuY3Rpb24gYWJvcnQod2hhdCl7aWYoTW9kdWxlWyJvbkFib3J0Il0pe01vZHVsZVsib25BYm9ydCJdKHdoYXQpO313aGF0PSJBYm9ydGVkKCIrd2hhdCsiKSI7ZXJyKHdoYXQpO0FCT1JUPXRydWU7d2hhdCs9Ii4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby4iO3ZhciBlPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdCk7cmVhZHlQcm9taXNlUmVqZWN0KGUpO3Rocm93IGV9dmFyIGRhdGFVUklQcmVmaXg9ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCwiO3ZhciBpc0RhdGFVUkk9ZmlsZW5hbWU9PmZpbGVuYW1lLnN0YXJ0c1dpdGgoZGF0YVVSSVByZWZpeCk7dmFyIHdhc21CaW5hcnlGaWxlO3dhc21CaW5hcnlGaWxlPSJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsQUdGemJRRUFBQUFCV2cxZ0JIOS9mMzhBWUFOL2YzOEFZQVYvZjM5L2Z3QmdCbjkvZjM5L2Z3QmdBWDhCZjJBQUFHQUNmMzhBWUFOL2YzOEJmMkFCZndCZ0IzOS9mMzkvZjM4QVlBSi9md0YvWUFSL2YzNStBR0FKZjM5L2YzOS9mMzkvQUFJOUNnRmhBV0VBQVFGaEFXSUFBZ0ZoQVdNQUFRRmhBV1FBQmdGaEFXVUFBUUZoQVdZQUNRRmhBV2NBQkFGaEFXZ0FCZ0ZoQVdrQUFBRmhBV29BQmdNWkdBY0VDQVVJQ2dVTEFRQUJDQVFGQXdNQ0FnQUFCd2NFREFRRkFYQUJFQkFGQndFQmdBS0FnQUlHQ0FGL0FVSGduUVFMQngwSEFXc0NBQUZzQUEwQmJRQWhBVzRBRndGdkFRQUJjQUFXQVhFQURna1ZBUUJCQVFzUEVDQU1GUlVmREI0WUdoME1HUnNjQ3ZCSUdIRUJBWDhnQWtVRVFDQUFLQUlFSUFFb0FnUkdEd3NnQUNBQlJnUkFRUUVQQ3dKQUlBQW9BZ1FpQWkwQUFDSUFSU0FBSUFFb0FnUWlBUzBBQUNJRFIzSU5BQU5BSUFFdEFBRWhBeUFDTFFBQklnQkZEUUVnQVVFQmFpRUJJQUpCQVdvaEFpQUFJQU5HRFFBTEN5QUFJQU5HQzA4QkFuOUIyQmtvQWdBaUFTQUFRUWRxUVhoeElnSnFJUUFDUUNBQ1FRQWdBQ0FCVFJzTkFDQUFQd0JCRUhSTEJFQWdBQkFHUlEwQkMwSFlHU0FBTmdJQUlBRVBDMEhvR1VFd05nSUFRWDhMQmdBZ0FCQU9DeWtBUWVBWlFRRTJBZ0JCNUJsQkFEWUNBQkFRUWVRWlFkd1pLQUlBTmdJQVFkd1pRZUFaTmdJQUM5SUxBUWQvQWtBZ0FFVU5BQ0FBUVFocklnSWdBRUVFYXlnQ0FDSUJRWGh4SWdCcUlRVUNRQ0FCUVFGeERRQWdBVUVEY1VVTkFTQUNJQUlvQWdBaUFXc2lBa0g4R1NnQ0FFa05BU0FBSUFGcUlRQUNRQUpBUVlBYUtBSUFJQUpIQkVBZ0FVSC9BVTBFUUNBQlFRTjJJUVFnQWlnQ0RDSUJJQUlvQWdnaUEwWUVRRUhzR1VIc0dTZ0NBRUYrSUFSM2NUWUNBQXdGQ3lBRElBRTJBZ3dnQVNBRE5nSUlEQVFMSUFJb0FoZ2hCaUFDSUFJb0Fnd2lBVWNFUUNBQ0tBSUlJZ01nQVRZQ0RDQUJJQU0yQWdnTUF3c2dBa0VVYWlJRUtBSUFJZ05GQkVBZ0FpZ0NFQ0lEUlEwQ0lBSkJFR29oQkFzRFFDQUVJUWNnQXlJQlFSUnFJZ1FvQWdBaUF3MEFJQUZCRUdvaEJDQUJLQUlRSWdNTkFBc2dCMEVBTmdJQURBSUxJQVVvQWdRaUFVRURjVUVEUncwQ1FmUVpJQUEyQWdBZ0JTQUJRWDV4TmdJRUlBSWdBRUVCY2pZQ0JDQUZJQUEyQWdBUEMwRUFJUUVMSUFaRkRRQUNRQ0FDS0FJY0lnTkJBblJCbkJ4cUlnUW9BZ0FnQWtZRVFDQUVJQUUyQWdBZ0FRMEJRZkFaUWZBWktBSUFRWDRnQTNkeE5nSUFEQUlMSUFaQkVFRVVJQVlvQWhBZ0FrWWJhaUFCTmdJQUlBRkZEUUVMSUFFZ0JqWUNHQ0FDS0FJUUlnTUVRQ0FCSUFNMkFoQWdBeUFCTmdJWUN5QUNLQUlVSWdORkRRQWdBU0FETmdJVUlBTWdBVFlDR0FzZ0FpQUZUdzBBSUFVb0FnUWlBVUVCY1VVTkFBSkFBa0FDUUFKQUlBRkJBbkZGQkVCQmhCb29BZ0FnQlVZRVFFR0VHaUFDTmdJQVFmZ1pRZmdaS0FJQUlBQnFJZ0EyQWdBZ0FpQUFRUUZ5TmdJRUlBSkJnQm9vQWdCSERRWkI5QmxCQURZQ0FFR0FHa0VBTmdJQUR3dEJnQm9vQWdBZ0JVWUVRRUdBR2lBQ05nSUFRZlFaUWZRWktBSUFJQUJxSWdBMkFnQWdBaUFBUVFGeU5nSUVJQUFnQW1vZ0FEWUNBQThMSUFGQmVIRWdBR29oQUNBQlFmOEJUUVJBSUFGQkEzWWhCQ0FGS0FJTUlnRWdCU2dDQ0NJRFJnUkFRZXdaUWV3WktBSUFRWDRnQkhkeE5nSUFEQVVMSUFNZ0FUWUNEQ0FCSUFNMkFnZ01CQXNnQlNnQ0dDRUdJQVVnQlNnQ0RDSUJSd1JBUWZ3WktBSUFHaUFGS0FJSUlnTWdBVFlDRENBQklBTTJBZ2dNQXdzZ0JVRVVhaUlFS0FJQUlnTkZCRUFnQlNnQ0VDSURSUTBDSUFWQkVHb2hCQXNEUUNBRUlRY2dBeUlCUVJScUlnUW9BZ0FpQXcwQUlBRkJFR29oQkNBQktBSVFJZ01OQUFzZ0IwRUFOZ0lBREFJTElBVWdBVUYrY1RZQ0JDQUNJQUJCQVhJMkFnUWdBQ0FDYWlBQU5nSUFEQU1MUVFBaEFRc2dCa1VOQUFKQUlBVW9BaHdpQTBFQ2RFR2NIR29pQkNnQ0FDQUZSZ1JBSUFRZ0FUWUNBQ0FCRFFGQjhCbEI4QmtvQWdCQmZpQURkM0UyQWdBTUFnc2dCa0VRUVJRZ0JpZ0NFQ0FGUmh0cUlBRTJBZ0FnQVVVTkFRc2dBU0FHTmdJWUlBVW9BaEFpQXdSQUlBRWdBellDRUNBRElBRTJBaGdMSUFVb0FoUWlBMFVOQUNBQklBTTJBaFFnQXlBQk5nSVlDeUFDSUFCQkFYSTJBZ1FnQUNBQ2FpQUFOZ0lBSUFKQmdCb29BZ0JIRFFCQjlCa2dBRFlDQUE4TElBQkIvd0ZOQkVBZ0FFRjRjVUdVR21vaEFRSi9RZXdaS0FJQUlnTkJBU0FBUVFOMmRDSUFjVVVFUUVIc0dTQUFJQU55TmdJQUlBRU1BUXNnQVNnQ0NBc2hBQ0FCSUFJMkFnZ2dBQ0FDTmdJTUlBSWdBVFlDRENBQ0lBQTJBZ2dQQzBFZklRTWdBRUgvLy84SFRRUkFJQUJCSmlBQVFRaDJaeUlCYTNaQkFYRWdBVUVCZEd0QlBtb2hBd3NnQWlBRE5nSWNJQUpDQURjQ0VDQURRUUowUVp3Y2FpRUJBa0FDUUFKQVFmQVpLQUlBSWdSQkFTQURkQ0lIY1VVRVFFSHdHU0FFSUFkeU5nSUFJQUVnQWpZQ0FDQUNJQUUyQWhnTUFRc2dBRUVaSUFOQkFYWnJRUUFnQTBFZlJ4dDBJUU1nQVNnQ0FDRUJBMEFnQVNJRUtBSUVRWGh4SUFCR0RRSWdBMEVkZGlFQklBTkJBWFFoQXlBRUlBRkJCSEZxSWdkQkVHb29BZ0FpQVEwQUN5QUhJQUkyQWhBZ0FpQUVOZ0lZQ3lBQ0lBSTJBZ3dnQWlBQ05nSUlEQUVMSUFRb0FnZ2lBQ0FDTmdJTUlBUWdBallDQ0NBQ1FRQTJBaGdnQWlBRU5nSU1JQUlnQURZQ0NBdEJqQnBCakJvb0FnQkJBV3NpQUVGL0lBQWJOZ0lBQ3dzcEFRRi9JQUVFUUNBQUlRSURRQ0FDUVFBNkFBQWdBa0VCYWlFQ0lBRkJBV3NpQVEwQUN3c2dBQXZoQXdCQmpCZEJtZ2tRQ1VHWUYwRzVDRUVCUVFBUUNFR2tGMEcwQ0VFQlFZQi9RZjhBRUFGQnZCZEJyUWhCQVVHQWYwSC9BQkFCUWJBWFFhc0lRUUZCQUVIL0FSQUJRY2dYUVlrSVFRSkJnSUIrUWYvL0FSQUJRZFFYUVlBSVFRSkJBRUgvL3dNUUFVSGdGMEdZQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCN0JkQmp3aEJCRUVBUVg4UUFVSDRGMEhYQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCaEJoQnpnaEJCRUVBUVg4UUFVR1FHRUdqQ0VLQWdJQ0FnSUNBZ0lCL1F2Ly8vLy8vLy8vLy93QVFFVUdjR0VHaUNFSUFRbjhRRVVHb0dFR2NDRUVFRUFSQnRCaEJrd2xCQ0JBRVFZUVBRZWtJRUFOQnpBOUJsdzBRQTBHVUVFRUVRZHdJRUFKQjRCQkJBa0gxQ0JBQ1Fhd1JRUVJCaEFrUUFrSElFVUcrQ0JBSFFmQVJRUUJCMGd3UUFFR1lFa0VBUWJnTkVBQkJ3QkpCQVVId0RCQUFRZWdTUVFKQm53a1FBRUdRRTBFRFFiNEpFQUJCdUJOQkJFSG1DUkFBUWVBVFFRVkJnd29RQUVHSUZFRUVRZDBORUFCQnNCUkJCVUg3RFJBQVFaZ1NRUUJCNlFvUUFFSEFFa0VCUWNnS0VBQkI2QkpCQWtHckN4QUFRWkFUUVFOQmlRc1FBRUc0RTBFRVFiRU1FQUJCNEJOQkJVR1BEQkFBUWRnVVFRaEI3Z3NRQUVHQUZVRUpRY3dMRUFCQnFCVkJCa0dwQ2hBQVFkQVZRUWRCb2c0UUFBc2NBQ0FBSUFGQkNDQUNweUFDUWlDSXB5QURweUFEUWlDSXB4QUZDeUFBQWtBZ0FDZ0NCQ0FCUncwQUlBQW9BaHhCQVVZTkFDQUFJQUkyQWh3TEM1b0JBQ0FBUVFFNkFEVUNRQ0FBS0FJRUlBSkhEUUFnQUVFQk9nQTBBa0FnQUNnQ0VDSUNSUVJBSUFCQkFUWUNKQ0FBSUFNMkFoZ2dBQ0FCTmdJUUlBTkJBVWNOQWlBQUtBSXdRUUZHRFFFTUFnc2dBU0FDUmdSQUlBQW9BaGdpQWtFQ1JnUkFJQUFnQXpZQ0dDQURJUUlMSUFBb0FqQkJBVWNOQWlBQ1FRRkdEUUVNQWdzZ0FDQUFLQUlrUVFGcU5nSWtDeUFBUVFFNkFEWUxDMTBCQVg4Z0FDZ0NFQ0lEUlFSQUlBQkJBVFlDSkNBQUlBSTJBaGdnQUNBQk5nSVFEd3NDUUNBQklBTkdCRUFnQUNnQ0dFRUNSdzBCSUFBZ0FqWUNHQThMSUFCQkFUb0FOaUFBUVFJMkFoZ2dBQ0FBS0FJa1FRRnFOZ0lrQ3dzQ0FBdTlKd0VNZnlNQVFSQnJJZ29rQUFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBZ0FFSDBBVTBFUUVIc0dTZ0NBQ0lHUVJBZ0FFRUxha0Y0Y1NBQVFRdEpHeUlGUVFOMklnQjJJZ0ZCQTNFRVFBSkFJQUZCZjNOQkFYRWdBR29pQWtFRGRDSUJRWlFhYWlJQUlBRkJuQnBxS0FJQUlnRW9BZ2dpQkVZRVFFSHNHU0FHUVg0Z0FuZHhOZ0lBREFFTElBUWdBRFlDRENBQUlBUTJBZ2dMSUFGQkNHb2hBQ0FCSUFKQkEzUWlBa0VEY2pZQ0JDQUJJQUpxSWdFZ0FTZ0NCRUVCY2pZQ0JBd1BDeUFGUWZRWktBSUFJZ2RORFFFZ0FRUkFBa0JCQWlBQWRDSUNRUUFnQW10eUlBRWdBSFJ4YUNJQlFRTjBJZ0JCbEJwcUlnSWdBRUdjR21vb0FnQWlBQ2dDQ0NJRVJnUkFRZXdaSUFaQmZpQUJkM0VpQmpZQ0FBd0JDeUFFSUFJMkFnd2dBaUFFTmdJSUN5QUFJQVZCQTNJMkFnUWdBQ0FGYWlJSUlBRkJBM1FpQVNBRmF5SUVRUUZ5TmdJRUlBQWdBV29nQkRZQ0FDQUhCRUFnQjBGNGNVR1VHbW9oQVVHQUdpZ0NBQ0VDQW44Z0JrRUJJQWRCQTNaMElnTnhSUVJBUWV3WklBTWdCbkkyQWdBZ0FRd0JDeUFCS0FJSUN5RURJQUVnQWpZQ0NDQURJQUkyQWd3Z0FpQUJOZ0lNSUFJZ0F6WUNDQXNnQUVFSWFpRUFRWUFhSUFnMkFnQkI5QmtnQkRZQ0FBd1BDMEh3R1NnQ0FDSUxSUTBCSUF0b1FRSjBRWndjYWlnQ0FDSUNLQUlFUVhoeElBVnJJUU1nQWlFQkEwQUNRQ0FCS0FJUUlnQkZCRUFnQVNnQ0ZDSUFSUTBCQ3lBQUtBSUVRWGh4SUFWcklnRWdBeUFCSUFOSklnRWJJUU1nQUNBQ0lBRWJJUUlnQUNFQkRBRUxDeUFDS0FJWUlRa2dBaUFDS0FJTUlnUkhCRUJCL0Jrb0FnQWFJQUlvQWdnaUFDQUVOZ0lNSUFRZ0FEWUNDQXdPQ3lBQ1FSUnFJZ0VvQWdBaUFFVUVRQ0FDS0FJUUlnQkZEUU1nQWtFUWFpRUJDd05BSUFFaENDQUFJZ1JCRkdvaUFTZ0NBQ0lBRFFBZ0JFRVFhaUVCSUFRb0FoQWlBQTBBQ3lBSVFRQTJBZ0FNRFF0QmZ5RUZJQUJCdjM5TERRQWdBRUVMYWlJQVFYaHhJUVZCOEJrb0FnQWlDRVVOQUVFQUlBVnJJUU1DUUFKQUFrQUNmMEVBSUFWQmdBSkpEUUFhUVI4Z0JVSC8vLzhIU3cwQUdpQUZRU1lnQUVFSWRtY2lBR3QyUVFGeElBQkJBWFJyUVQ1cUN5SUhRUUowUVp3Y2FpZ0NBQ0lCUlFSQVFRQWhBQXdCQzBFQUlRQWdCVUVaSUFkQkFYWnJRUUFnQjBFZlJ4dDBJUUlEUUFKQUlBRW9BZ1JCZUhFZ0JXc2lCaUFEVHcwQUlBRWhCQ0FHSWdNTkFFRUFJUU1nQVNFQURBTUxJQUFnQVNnQ0ZDSUdJQVlnQVNBQ1FSMTJRUVJ4YWlnQ0VDSUJSaHNnQUNBR0d5RUFJQUpCQVhRaEFpQUJEUUFMQ3lBQUlBUnlSUVJBUVFBaEJFRUNJQWQwSWdCQkFDQUFhM0lnQ0hFaUFFVU5BeUFBYUVFQ2RFR2NIR29vQWdBaEFBc2dBRVVOQVFzRFFDQUFLQUlFUVhoeElBVnJJZ0lnQTBraEFTQUNJQU1nQVJzaEF5QUFJQVFnQVJzaEJDQUFLQUlRSWdFRWZ5QUJCU0FBS0FJVUN5SUFEUUFMQ3lBRVJRMEFJQU5COUJrb0FnQWdCV3RQRFFBZ0JDZ0NHQ0VISUFRZ0JDZ0NEQ0lDUndSQVFmd1pLQUlBR2lBRUtBSUlJZ0FnQWpZQ0RDQUNJQUEyQWdnTURBc2dCRUVVYWlJQktBSUFJZ0JGQkVBZ0JDZ0NFQ0lBUlEwRElBUkJFR29oQVFzRFFDQUJJUVlnQUNJQ1FSUnFJZ0VvQWdBaUFBMEFJQUpCRUdvaEFTQUNLQUlRSWdBTkFBc2dCa0VBTmdJQURBc0xJQVZCOUJrb0FnQWlCRTBFUUVHQUdpZ0NBQ0VBQWtBZ0JDQUZheUlCUVJCUEJFQWdBQ0FGYWlJQ0lBRkJBWEkyQWdRZ0FDQUVhaUFCTmdJQUlBQWdCVUVEY2pZQ0JBd0JDeUFBSUFSQkEzSTJBZ1FnQUNBRWFpSUJJQUVvQWdSQkFYSTJBZ1JCQUNFQ1FRQWhBUXRCOUJrZ0FUWUNBRUdBR2lBQ05nSUFJQUJCQ0dvaEFBd05DeUFGUWZnWktBSUFJZ0pKQkVCQitCa2dBaUFGYXlJQk5nSUFRWVFhUVlRYUtBSUFJZ0FnQldvaUFqWUNBQ0FDSUFGQkFYSTJBZ1FnQUNBRlFRTnlOZ0lFSUFCQkNHb2hBQXdOQzBFQUlRQWdCVUV2YWlJREFuOUJ4QjBvQWdBRVFFSE1IU2dDQUF3QkMwSFFIVUovTndJQVFjZ2RRb0NnZ0lDQWdBUTNBZ0JCeEIwZ0NrRU1ha0Z3Y1VIWXF0V3FCWE0yQWdCQjJCMUJBRFlDQUVHb0hVRUFOZ0lBUVlBZ0N5SUJhaUlHUVFBZ0FXc2lDSEVpQVNBRlRRME1RYVFkS0FJQUlnUUVRRUdjSFNnQ0FDSUhJQUZxSWdrZ0IwMGdCQ0FKU1hJTkRRc0NRRUdvSFMwQUFFRUVjVVVFUUFKQUFrQUNRQUpBUVlRYUtBSUFJZ1FFUUVHc0hTRUFBMEFnQkNBQUtBSUFJZ2RQQkVBZ0J5QUFLQUlFYWlBRVN3MERDeUFBS0FJSUlnQU5BQXNMUVFBUUN5SUNRWDlHRFFNZ0FTRUdRY2dkS0FJQUlnQkJBV3NpQkNBQ2NRUkFJQUVnQW1zZ0FpQUVha0VBSUFCcmNXb2hCZ3NnQlNBR1R3MERRYVFkS0FJQUlnQUVRRUdjSFNnQ0FDSUVJQVpxSWdnZ0JFMGdBQ0FJU1hJTkJBc2dCaEFMSWdBZ0FrY05BUXdGQ3lBR0lBSnJJQWh4SWdZUUN5SUNJQUFvQWdBZ0FDZ0NCR3BHRFFFZ0FpRUFDeUFBUVg5R0RRRWdCVUV3YWlBR1RRUkFJQUFoQWd3RUMwSE1IU2dDQUNJQ0lBTWdCbXRxUVFBZ0FtdHhJZ0lRQzBGL1JnMEJJQUlnQm1vaEJpQUFJUUlNQXdzZ0FrRi9SdzBDQzBHb0hVR29IU2dDQUVFRWNqWUNBQXNnQVJBTElnSkJmMFpCQUJBTElnQkJmMFp5SUFBZ0FrMXlEUVVnQUNBQ2F5SUdJQVZCS0dwTkRRVUxRWndkUVp3ZEtBSUFJQVpxSWdBMkFnQkJvQjBvQWdBZ0FFa0VRRUdnSFNBQU5nSUFDd0pBUVlRYUtBSUFJZ01FUUVHc0hTRUFBMEFnQWlBQUtBSUFJZ0VnQUNnQ0JDSUVha1lOQWlBQUtBSUlJZ0FOQUFzTUJBdEIvQmtvQWdBaUFFRUFJQUFnQWswYlJRUkFRZndaSUFJMkFnQUxRUUFoQUVHd0hTQUdOZ0lBUWF3ZElBSTJBZ0JCakJwQmZ6WUNBRUdRR2tIRUhTZ0NBRFlDQUVHNEhVRUFOZ0lBQTBBZ0FFRURkQ0lCUVp3YWFpQUJRWlFhYWlJRU5nSUFJQUZCb0JwcUlBUTJBZ0FnQUVFQmFpSUFRU0JIRFFBTFFmZ1pJQVpCS0dzaUFFRjRJQUpyUVFkeElnRnJJZ1EyQWdCQmhCb2dBU0FDYWlJQk5nSUFJQUVnQkVFQmNqWUNCQ0FBSUFKcVFTZzJBZ1JCaUJwQjFCMG9BZ0EyQWdBTUJBc2dBaUFEVFNBQklBTkxjZzBDSUFBb0FneEJDSEVOQWlBQUlBUWdCbW8yQWdSQmhCb2dBMEY0SUFOclFRZHhJZ0JxSWdFMkFnQkIrQmxCK0Jrb0FnQWdCbW9pQWlBQWF5SUFOZ0lBSUFFZ0FFRUJjallDQkNBQ0lBTnFRU2cyQWdSQmlCcEIxQjBvQWdBMkFnQU1Bd3RCQUNFRURBb0xRUUFoQWd3SUMwSDhHU2dDQUNBQ1N3UkFRZndaSUFJMkFnQUxJQUlnQm1vaEFVR3NIU0VBQWtBQ1FBSkFBMEFnQVNBQUtBSUFSd1JBSUFBb0FnZ2lBQTBCREFJTEN5QUFMUUFNUVFoeFJRMEJDMEdzSFNFQUEwQWdBeUFBS0FJQUlnRlBCRUFnQVNBQUtBSUVhaUlFSUFOTERRTUxJQUFvQWdnaEFBd0FDd0FMSUFBZ0FqWUNBQ0FBSUFBb0FnUWdCbW8yQWdRZ0FrRjRJQUpyUVFkeGFpSUhJQVZCQTNJMkFnUWdBVUY0SUFGclFRZHhhaUlHSUFVZ0Iyb2lCV3NoQUNBRElBWkdCRUJCaEJvZ0JUWUNBRUg0R1VINEdTZ0NBQ0FBYWlJQU5nSUFJQVVnQUVFQmNqWUNCQXdJQzBHQUdpZ0NBQ0FHUmdSQVFZQWFJQVUyQWdCQjlCbEI5QmtvQWdBZ0FHb2lBRFlDQUNBRklBQkJBWEkyQWdRZ0FDQUZhaUFBTmdJQURBZ0xJQVlvQWdRaUEwRURjVUVCUncwR0lBTkJlSEVoQ1NBRFFmOEJUUVJBSUFZb0Fnd2lBU0FHS0FJSUlnSkdCRUJCN0JsQjdCa29BZ0JCZmlBRFFRTjJkM0UyQWdBTUJ3c2dBaUFCTmdJTUlBRWdBallDQ0F3R0N5QUdLQUlZSVFnZ0JpQUdLQUlNSWdKSEJFQWdCaWdDQ0NJQklBSTJBZ3dnQWlBQk5nSUlEQVVMSUFaQkZHb2lBU2dDQUNJRFJRUkFJQVlvQWhBaUEwVU5CQ0FHUVJCcUlRRUxBMEFnQVNFRUlBTWlBa0VVYWlJQktBSUFJZ01OQUNBQ1FSQnFJUUVnQWlnQ0VDSUREUUFMSUFSQkFEWUNBQXdFQzBINEdTQUdRU2hySWdCQmVDQUNhMEVIY1NJQmF5SUlOZ0lBUVlRYUlBRWdBbW9pQVRZQ0FDQUJJQWhCQVhJMkFnUWdBQ0FDYWtFb05nSUVRWWdhUWRRZEtBSUFOZ0lBSUFNZ0JFRW5JQVJyUVFkeGFrRXZheUlBSUFBZ0EwRVFha2tiSWdGQkd6WUNCQ0FCUWJRZEtRSUFOd0lRSUFGQnJCMHBBZ0EzQWdoQnRCMGdBVUVJYWpZQ0FFR3dIU0FHTmdJQVFhd2RJQUkyQWdCQnVCMUJBRFlDQUNBQlFSaHFJUUFEUUNBQVFRYzJBZ1FnQUVFSWFpRU1JQUJCQkdvaEFDQU1JQVJKRFFBTElBRWdBMFlOQUNBQklBRW9BZ1JCZm5FMkFnUWdBeUFCSUFOcklnSkJBWEkyQWdRZ0FTQUNOZ0lBSUFKQi93Rk5CRUFnQWtGNGNVR1VHbW9oQUFKL1Fld1pLQUlBSWdGQkFTQUNRUU4yZENJQ2NVVUVRRUhzR1NBQklBSnlOZ0lBSUFBTUFRc2dBQ2dDQ0FzaEFTQUFJQU0yQWdnZ0FTQUROZ0lNSUFNZ0FEWUNEQ0FESUFFMkFnZ01BUXRCSHlFQUlBSkIvLy8vQjAwRVFDQUNRU1lnQWtFSWRtY2lBR3QyUVFGeElBQkJBWFJyUVQ1cUlRQUxJQU1nQURZQ0hDQURRZ0EzQWhBZ0FFRUNkRUdjSEdvaEFRSkFBa0JCOEJrb0FnQWlCRUVCSUFCMElnWnhSUVJBUWZBWklBUWdCbkkyQWdBZ0FTQUROZ0lBREFFTElBSkJHU0FBUVFGMmEwRUFJQUJCSDBjYmRDRUFJQUVvQWdBaEJBTkFJQVFpQVNnQ0JFRjRjU0FDUmcwQ0lBQkJIWFloQkNBQVFRRjBJUUFnQVNBRVFRUnhhaUlHS0FJUUlnUU5BQXNnQmlBRE5nSVFDeUFESUFFMkFoZ2dBeUFETmdJTUlBTWdBellDQ0F3QkN5QUJLQUlJSWdBZ0F6WUNEQ0FCSUFNMkFnZ2dBMEVBTmdJWUlBTWdBVFlDRENBRElBQTJBZ2dMUWZnWktBSUFJZ0FnQlUwTkFFSDRHU0FBSUFWcklnRTJBZ0JCaEJwQmhCb29BZ0FpQUNBRmFpSUNOZ0lBSUFJZ0FVRUJjallDQkNBQUlBVkJBM0kyQWdRZ0FFRUlhaUVBREFnTFFlZ1pRVEEyQWdCQkFDRUFEQWNMUVFBaEFnc2dDRVVOQUFKQUlBWW9BaHdpQVVFQ2RFR2NIR29pQkNnQ0FDQUdSZ1JBSUFRZ0FqWUNBQ0FDRFFGQjhCbEI4QmtvQWdCQmZpQUJkM0UyQWdBTUFnc2dDRUVRUVJRZ0NDZ0NFQ0FHUmh0cUlBSTJBZ0FnQWtVTkFRc2dBaUFJTmdJWUlBWW9BaEFpQVFSQUlBSWdBVFlDRUNBQklBSTJBaGdMSUFZb0FoUWlBVVVOQUNBQ0lBRTJBaFFnQVNBQ05nSVlDeUFBSUFscUlRQWdCaUFKYWlJR0tBSUVJUU1MSUFZZ0EwRitjVFlDQkNBRklBQkJBWEkyQWdRZ0FDQUZhaUFBTmdJQUlBQkIvd0ZOQkVBZ0FFRjRjVUdVR21vaEFRSi9RZXdaS0FJQUlnSkJBU0FBUVFOMmRDSUFjVVVFUUVIc0dTQUFJQUp5TmdJQUlBRU1BUXNnQVNnQ0NBc2hBQ0FCSUFVMkFnZ2dBQ0FGTmdJTUlBVWdBVFlDRENBRklBQTJBZ2dNQVF0Qkh5RURJQUJCLy8vL0IwMEVRQ0FBUVNZZ0FFRUlkbWNpQVd0MlFRRnhJQUZCQVhSclFUNXFJUU1MSUFVZ0F6WUNIQ0FGUWdBM0FoQWdBMEVDZEVHY0hHb2hBUUpBQWtCQjhCa29BZ0FpQWtFQklBTjBJZ1J4UlFSQVFmQVpJQUlnQkhJMkFnQWdBU0FGTmdJQURBRUxJQUJCR1NBRFFRRjJhMEVBSUFOQkgwY2JkQ0VESUFFb0FnQWhBZ05BSUFJaUFTZ0NCRUY0Y1NBQVJnMENJQU5CSFhZaEFpQURRUUYwSVFNZ0FTQUNRUVJ4YWlJRUtBSVFJZ0lOQUFzZ0JDQUZOZ0lRQ3lBRklBRTJBaGdnQlNBRk5nSU1JQVVnQlRZQ0NBd0JDeUFCS0FJSUlnQWdCVFlDRENBQklBVTJBZ2dnQlVFQU5nSVlJQVVnQVRZQ0RDQUZJQUEyQWdnTElBZEJDR29oQUF3Q0N3SkFJQWRGRFFBQ1FDQUVLQUljSWdCQkFuUkJuQnhxSWdFb0FnQWdCRVlFUUNBQklBSTJBZ0FnQWcwQlFmQVpJQWhCZmlBQWQzRWlDRFlDQUF3Q0N5QUhRUkJCRkNBSEtBSVFJQVJHRzJvZ0FqWUNBQ0FDUlEwQkN5QUNJQWMyQWhnZ0JDZ0NFQ0lBQkVBZ0FpQUFOZ0lRSUFBZ0FqWUNHQXNnQkNnQ0ZDSUFSUTBBSUFJZ0FEWUNGQ0FBSUFJMkFoZ0xBa0FnQTBFUFRRUkFJQVFnQXlBRmFpSUFRUU55TmdJRUlBQWdCR29pQUNBQUtBSUVRUUZ5TmdJRURBRUxJQVFnQlVFRGNqWUNCQ0FFSUFWcUlnSWdBMEVCY2pZQ0JDQUNJQU5xSUFNMkFnQWdBMEgvQVUwRVFDQURRWGh4UVpRYWFpRUFBbjlCN0Jrb0FnQWlBVUVCSUFOQkEzWjBJZ054UlFSQVFld1pJQUVnQTNJMkFnQWdBQXdCQ3lBQUtBSUlDeUVCSUFBZ0FqWUNDQ0FCSUFJMkFnd2dBaUFBTmdJTUlBSWdBVFlDQ0F3QkMwRWZJUUFnQTBILy8vOEhUUVJBSUFOQkppQURRUWgyWnlJQWEzWkJBWEVnQUVFQmRHdEJQbW9oQUFzZ0FpQUFOZ0ljSUFKQ0FEY0NFQ0FBUVFKMFFad2NhaUVCQWtBQ1FDQUlRUUVnQUhRaUJuRkZCRUJCOEJrZ0JpQUljallDQUNBQklBSTJBZ0FNQVFzZ0EwRVpJQUJCQVhaclFRQWdBRUVmUnh0MElRQWdBU2dDQUNFRkEwQWdCU0lCS0FJRVFYaHhJQU5HRFFJZ0FFRWRkaUVHSUFCQkFYUWhBQ0FCSUFaQkJIRnFJZ1lvQWhBaUJRMEFDeUFHSUFJMkFoQUxJQUlnQVRZQ0dDQUNJQUkyQWd3Z0FpQUNOZ0lJREFFTElBRW9BZ2dpQUNBQ05nSU1JQUVnQWpZQ0NDQUNRUUEyQWhnZ0FpQUJOZ0lNSUFJZ0FEWUNDQXNnQkVFSWFpRUFEQUVMQWtBZ0NVVU5BQUpBSUFJb0Fod2lBRUVDZEVHY0hHb2lBU2dDQUNBQ1JnUkFJQUVnQkRZQ0FDQUVEUUZCOEJrZ0MwRitJQUIzY1RZQ0FBd0NDeUFKUVJCQkZDQUpLQUlRSUFKR0cyb2dCRFlDQUNBRVJRMEJDeUFFSUFrMkFoZ2dBaWdDRUNJQUJFQWdCQ0FBTmdJUUlBQWdCRFlDR0FzZ0FpZ0NGQ0lBUlEwQUlBUWdBRFlDRkNBQUlBUTJBaGdMQWtBZ0EwRVBUUVJBSUFJZ0F5QUZhaUlBUVFOeU5nSUVJQUFnQW1vaUFDQUFLQUlFUVFGeU5nSUVEQUVMSUFJZ0JVRURjallDQkNBQ0lBVnFJZ1FnQTBFQmNqWUNCQ0FESUFScUlBTTJBZ0FnQndSQUlBZEJlSEZCbEJwcUlRQkJnQm9vQWdBaEFRSi9RUUVnQjBFRGRuUWlCU0FHY1VVRVFFSHNHU0FGSUFaeU5nSUFJQUFNQVFzZ0FDZ0NDQXNoQmlBQUlBRTJBZ2dnQmlBQk5nSU1JQUVnQURZQ0RDQUJJQVkyQWdnTFFZQWFJQVEyQWdCQjlCa2dBellDQUFzZ0FrRUlhaUVBQ3lBS1FSQnFKQUFnQUFzakFRRi9RZHdaS0FJQUlnQUVRQU5BSUFBb0FnQVJCUUFnQUNnQ0JDSUFEUUFMQ3dzYUFDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFUQ3dzM0FDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFURHdzZ0FDZ0NDQ0lBSUFFZ0FpQURJQVFnQlNBQUtBSUFLQUlVRVFNQUM1RUJBQ0FBSUFFb0FnZ2dCQkFLQkVBZ0FTQUNJQU1RRWc4TEFrQWdBQ0FCS0FJQUlBUVFDa1VOQUFKQUlBSWdBU2dDRUVjRVFDQUJLQUlVSUFKSERRRUxJQU5CQVVjTkFTQUJRUUUyQWlBUEN5QUJJQUkyQWhRZ0FTQUROZ0lnSUFFZ0FTZ0NLRUVCYWpZQ0tBSkFJQUVvQWlSQkFVY05BQ0FCS0FJWVFRSkhEUUFnQVVFQk9nQTJDeUFCUVFRMkFpd0xDL0lCQUNBQUlBRW9BZ2dnQkJBS0JFQWdBU0FDSUFNUUVnOExBa0FnQUNBQktBSUFJQVFRQ2dSQUFrQWdBaUFCS0FJUVJ3UkFJQUVvQWhRZ0FrY05BUXNnQTBFQlJ3MENJQUZCQVRZQ0lBOExJQUVnQXpZQ0lBSkFJQUVvQWl4QkJFWU5BQ0FCUVFBN0FUUWdBQ2dDQ0NJQUlBRWdBaUFDUVFFZ0JDQUFLQUlBS0FJVUVRTUFJQUV0QURVRVFDQUJRUU0yQWl3Z0FTMEFORVVOQVF3REN5QUJRUVEyQWl3TElBRWdBallDRkNBQklBRW9BaWhCQVdvMkFpZ2dBU2dDSkVFQlJ3MEJJQUVvQWhoQkFrY05BU0FCUVFFNkFEWVBDeUFBS0FJSUlnQWdBU0FDSUFNZ0JDQUFLQUlBS0FJWUVRSUFDd3N4QUNBQUlBRW9BZ2hCQUJBS0JFQWdBU0FDSUFNUUZBOExJQUFvQWdnaUFDQUJJQUlnQXlBQUtBSUFLQUljRVFBQUN4Z0FJQUFnQVNnQ0NFRUFFQW9FUUNBQklBSWdBeEFVQ3d2S0F3RUZmeU1BUVVCcUlnUWtBQUovUVFFZ0FDQUJRUUFRQ2cwQUdrRUFJQUZGRFFBYUl3QkJRR29pQXlRQUlBRW9BZ0FpQlVFRWF5Z0NBQ0VHSUFWQkNHc29BZ0FoQlNBRFFnQTNBaUFnQTBJQU53SW9JQU5DQURjQ01DQURRZ0EzQURjZ0EwSUFOd0lZSUFOQkFEWUNGQ0FEUWZ3Vk5nSVFJQU1nQVRZQ0RDQURRYXdXTmdJSUlBRWdCV29oQVVFQUlRVUNRQ0FHUWF3V1FRQVFDZ1JBSUFOQkFUWUNPQ0FHSUFOQkNHb2dBU0FCUVFGQkFDQUdLQUlBS0FJVUVRTUFJQUZCQUNBREtBSWdRUUZHR3lFRkRBRUxJQVlnQTBFSWFpQUJRUUZCQUNBR0tBSUFLQUlZRVFJQUFrQUNRQ0FES0FJc0RnSUFBUUlMSUFNb0FoeEJBQ0FES0FJb1FRRkdHMEVBSUFNb0FpUkJBVVliUVFBZ0F5Z0NNRUVCUmhzaEJRd0JDeUFES0FJZ1FRRkhCRUFnQXlnQ01BMEJJQU1vQWlSQkFVY05BU0FES0FJb1FRRkhEUUVMSUFNb0FoZ2hCUXNnQTBGQWF5UUFRUUFnQlNJQlJRMEFHaUFFUVF4cVFUUVFEeG9nQkVFQk5nSTRJQVJCZnpZQ0ZDQUVJQUEyQWhBZ0JDQUJOZ0lJSUFFZ0JFRUlhaUFDS0FJQVFRRWdBU2dDQUNnQ0hCRUFBQ0FFS0FJZ0lnQkJBVVlFUUNBQ0lBUW9BaGcyQWdBTElBQkJBVVlMSVFjZ0JFRkFheVFBSUFjTENnQWdBQ0FCUVFBUUNnc0VBQ0FBQy9vRUFnWi9DbjFCLy8vLy93Y2hERUdBZ0lDQWVDRU5RWDhoQ2dOQUlBTWdDMFlFUUVFQUlRa2dDRUdBZ0JBUUR5RUFRd0QvZjBjZ0RTQU1hN0tWSVJBRFFDQURJQWxHQkVCQkFDRUpJQWRCQURZQ0FDQUFRUVJySVFCQkFDRU1RUUVoQ3dOQUlBdEJnSUFFUmtVRVFDQUhJQXRCQW5RaUFXb2dBQ0FCYWlnQ0FDQU1haUlNTmdJQUlBdEJBV29oQ3d3QkN3c0RRQ0FESUFsR1JRUkFJQWNnQlNBSlFRSjBhaWdDQUVFQ2RHb2lBQ0FBS0FJQUlnQkJBV28yQWdBZ0JpQUFRUUowYWlBSk5nSUFJQWxCQVdvaENRd0JDd3NGQW44Z0VDQUZJQWxCQW5ScUlnRW9BZ0FnREd1emxDSVBRd0FBZ0U5ZElBOURBQUFBQUdCeEJFQWdENmtNQVF0QkFBc2hDeUFCSUFzMkFnQWdBQ0FMUVFKMGFpSUJJQUVvQWdCQkFXbzJBZ0FnQ1VFQmFpRUpEQUVMQ3dVZ0JDQUxRUXhzYWlJSktnSUFJUk1nQ1NvQ0NDRVVJQWtxQWdRaEZTQUtJQUlnQzBFQ2RDSU9haWdDQUNJSlJ3UkFJQUVnQ1VIUUFHeHFJZ29xQWp3Z0FDb0NPQ0lQbENBS0tnSTRJQUFxQWlnaUVKUWdDaW9DTUNBQUtnSUlJaEdVSUFBcUFoZ2lFaUFLS2dJMGxKS1NraUVXSUFvcUFpd2dENVFnQ2lvQ0tDQVFsQ0FLS2dJZ0lCR1VJQklnQ2lvQ0pKU1NrcEloRnlBS0tnSWNJQStVSUFvcUFoZ2dFSlFnQ2lvQ0VDQVJsQ0FTSUFvcUFoU1VrcEtTSVJnZ0Npb0NEQ0FQbENBS0tnSUlJQkNVSUFvcUFnQWdFWlFnQ2lvQ0JDQVNsSktTa2lFUElBa2hDZ3NnQlNBT2FnSi9JQllnRnlBVWxDQVBJQk9VSUJVZ0dKU1NrcEpEQUFDQVJaUWlFSXREQUFBQVQxMEVRQ0FRcUF3QkMwR0FnSUNBZUFzaUNUWUNBQ0FNSUFrZ0NTQU1TaHNoRENBTklBa2dDU0FOU0JzaERTQUxRUUZxSVFzTUFRc0xDd3ZuRVFJQVFZQUlDOVlSZFc1emFXZHVaV1FnYzJodmNuUUFkVzV6YVdkdVpXUWdhVzUwQUdac2IyRjBBSFZwYm5RMk5GOTBBSFZ1YzJsbmJtVmtJR05vWVhJQVltOXZiQUJsYlhOamNtbHdkR1Z1T2pwMllXd0FkVzV6YVdkdVpXUWdiRzl1WndCemRHUTZPbmR6ZEhKcGJtY0FjM1JrT2pwemRISnBibWNBYzNSa09qcDFNVFp6ZEhKcGJtY0FjM1JrT2pwMU16SnpkSEpwYm1jQVpHOTFZbXhsQUhadmFXUUFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGMyaHZjblErQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQSFZ1YzJsbmJtVmtJSE5vYjNKMFBnQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4cGJuUStBR1Z0YzJOeWFYQjBaVzQ2T20xbGJXOXllVjkyYVdWM1BIVnVjMmxuYm1Wa0lHbHVkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhabXh2WVhRK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEhWcGJuUTRYM1ErQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQR2x1ZERoZmRENEFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGRXbHVkREUyWDNRK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEdsdWRERTJYM1ErQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQSFZwYm5RMk5GOTBQZ0JsYlhOamNtbHdkR1Z1T2pwdFpXMXZjbmxmZG1sbGR6eHBiblEyTkY5MFBnQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4MWFXNTBNekpmZEQ0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4YVc1ME16SmZkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhZMmhoY2o0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4ZFc1emFXZHVaV1FnWTJoaGNqNEFjM1JrT2pwaVlYTnBZMTl6ZEhKcGJtYzhkVzV6YVdkdVpXUWdZMmhoY2o0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4YzJsbmJtVmtJR05vWVhJK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEd4dmJtYytBR1Z0YzJOeWFYQjBaVzQ2T20xbGJXOXllVjkyYVdWM1BIVnVjMmxuYm1Wa0lHeHZibWMrQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQR1J2ZFdKc1pUNEFUbE4wTTE5Zk1qRXlZbUZ6YVdOZmMzUnlhVzVuU1dOT1UxOHhNV05vWVhKZmRISmhhWFJ6U1dORlJVNVRYemxoYkd4dlkyRjBiM0pKWTBWRlJVVUFBQUFBUkF3QUFFSUhBQUJPVTNRelgxOHlNVEppWVhOcFkxOXpkSEpwYm1kSmFFNVRYekV4WTJoaGNsOTBjbUZwZEhOSmFFVkZUbE5mT1dGc2JHOWpZWFJ2Y2tsb1JVVkZSUUFBUkF3QUFJd0hBQUJPVTNRelgxOHlNVEppWVhOcFkxOXpkSEpwYm1kSmQwNVRYekV4WTJoaGNsOTBjbUZwZEhOSmQwVkZUbE5mT1dGc2JHOWpZWFJ2Y2tsM1JVVkZSUUFBUkF3QUFOUUhBQUJPVTNRelgxOHlNVEppWVhOcFkxOXpkSEpwYm1kSlJITk9VMTh4TVdOb1lYSmZkSEpoYVhSelNVUnpSVVZPVTE4NVlXeHNiMk5oZEc5eVNVUnpSVVZGUlFBQUFFUU1BQUFjQ0FBQVRsTjBNMTlmTWpFeVltRnphV05mYzNSeWFXNW5TVVJwVGxOZk1URmphR0Z5WDNSeVlXbDBjMGxFYVVWRlRsTmZPV0ZzYkc5allYUnZja2xFYVVWRlJVVUFBQUJFREFBQWFBZ0FBRTR4TUdWdGMyTnlhWEIwWlc0emRtRnNSUUFBUkF3QUFMUUlBQUJPTVRCbGJYTmpjbWx3ZEdWdU1URnRaVzF2Y25sZmRtbGxkMGxqUlVVQUFFUU1BQURRQ0FBQVRqRXdaVzF6WTNKcGNIUmxiakV4YldWdGIzSjVYM1pwWlhkSllVVkZBQUJFREFBQStBZ0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTV2hGUlFBQVJBd0FBQ0FKQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBselJVVUFBRVFNQUFCSUNRQUFUakV3WlcxelkzSnBjSFJsYmpFeGJXVnRiM0o1WDNacFpYZEpkRVZGQUFCRURBQUFjQWtBQUU0eE1HVnRjMk55YVhCMFpXNHhNVzFsYlc5eWVWOTJhV1YzU1dsRlJRQUFSQXdBQUpnSkFBQk9NVEJsYlhOamNtbHdkR1Z1TVRGdFpXMXZjbmxmZG1sbGQwbHFSVVVBQUVRTUFBREFDUUFBVGpFd1pXMXpZM0pwY0hSbGJqRXhiV1Z0YjNKNVgzWnBaWGRKYkVWRkFBQkVEQUFBNkFrQUFFNHhNR1Z0YzJOeWFYQjBaVzR4TVcxbGJXOXllVjkyYVdWM1NXMUZSUUFBUkF3QUFCQUtBQUJPTVRCbGJYTmpjbWx3ZEdWdU1URnRaVzF2Y25sZmRtbGxkMGw0UlVVQUFFUU1BQUE0Q2dBQVRqRXdaVzF6WTNKcGNIUmxiakV4YldWdGIzSjVYM1pwWlhkSmVVVkZBQUJFREFBQVlBb0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTV1pGUlFBQVJBd0FBSWdLQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBsa1JVVUFBRVFNQUFDd0NnQUFUakV3WDE5amVIaGhZbWwyTVRFMlgxOXphR2x0WDNSNWNHVmZhVzVtYjBVQUFBQUFiQXdBQU5nS0FBRFFEQUFBVGpFd1gxOWplSGhoWW1sMk1URTNYMTlqYkdGemMxOTBlWEJsWDJsdVptOUZBQUFBYkF3QUFBZ0xBQUQ4Q2dBQUFBQUFBSHdMQUFBQ0FBQUFBd0FBQUFRQUFBQUZBQUFBQmdBQUFFNHhNRjlmWTNoNFlXSnBkakV5TTE5ZlpuVnVaR0Z0Wlc1MFlXeGZkSGx3WlY5cGJtWnZSUUJzREFBQVZBc0FBUHdLQUFCMkFBQUFRQXNBQUlnTEFBQmlBQUFBUUFzQUFKUUxBQUJqQUFBQVFBc0FBS0FMQUFCb0FBQUFRQXNBQUt3TEFBQmhBQUFBUUFzQUFMZ0xBQUJ6QUFBQVFBc0FBTVFMQUFCMEFBQUFRQXNBQU5BTEFBQnBBQUFBUUFzQUFOd0xBQUJxQUFBQVFBc0FBT2dMQUFCc0FBQUFRQXNBQVBRTEFBQnRBQUFBUUFzQUFBQU1BQUI0QUFBQVFBc0FBQXdNQUFCNUFBQUFRQXNBQUJnTUFBQm1BQUFBUUFzQUFDUU1BQUJrQUFBQVFBc0FBREFNQUFBQUFBQUFMQXNBQUFJQUFBQUhBQUFBQkFBQUFBVUFBQUFJQUFBQUNRQUFBQW9BQUFBTEFBQUFBQUFBQUxRTUFBQUNBQUFBREFBQUFBUUFBQUFGQUFBQUNBQUFBQTBBQUFBT0FBQUFEd0FBQUU0eE1GOWZZM2g0WVdKcGRqRXlNRjlmYzJsZlkyeGhjM05mZEhsd1pWOXBibVp2UlFBQUFBQnNEQUFBakF3QUFDd0xBQUJUZERsMGVYQmxYMmx1Wm04QUFBQUFSQXdBQU1BTUFFSFlHUXNENEE0QiI7aWYoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpe3dhc21CaW5hcnlGaWxlPWxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpO31mdW5jdGlvbiBnZXRCaW5hcnlTeW5jKGZpbGUpe2lmKGZpbGU9PXdhc21CaW5hcnlGaWxlJiZ3YXNtQmluYXJ5KXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkod2FzbUJpbmFyeSl9dmFyIGJpbmFyeT10cnlQYXJzZUFzRGF0YVVSSShmaWxlKTtpZihiaW5hcnkpe3JldHVybiBiaW5hcnl9aWYocmVhZEJpbmFyeSl7cmV0dXJuIHJlYWRCaW5hcnkoZmlsZSl9dGhyb3cgImJvdGggYXN5bmMgYW5kIHN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkIn1mdW5jdGlvbiBnZXRCaW5hcnlQcm9taXNlKGJpbmFyeUZpbGUpe3JldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpPT5nZXRCaW5hcnlTeW5jKGJpbmFyeUZpbGUpKX1mdW5jdGlvbiBpbnN0YW50aWF0ZUFycmF5QnVmZmVyKGJpbmFyeUZpbGUsaW1wb3J0cyxyZWNlaXZlcil7cmV0dXJuIGdldEJpbmFyeVByb21pc2UoYmluYXJ5RmlsZSkudGhlbihiaW5hcnk9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJpbmFyeSxpbXBvcnRzKSkudGhlbihpbnN0YW5jZT0+aW5zdGFuY2UpLnRoZW4ocmVjZWl2ZXIscmVhc29uPT57ZXJyKGBmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiAke3JlYXNvbn1gKTthYm9ydChyZWFzb24pO30pfWZ1bmN0aW9uIGluc3RhbnRpYXRlQXN5bmMoYmluYXJ5LGJpbmFyeUZpbGUsaW1wb3J0cyxjYWxsYmFjayl7cmV0dXJuIGluc3RhbnRpYXRlQXJyYXlCdWZmZXIoYmluYXJ5RmlsZSxpbXBvcnRzLGNhbGxiYWNrKX1mdW5jdGlvbiBjcmVhdGVXYXNtKCl7dmFyIGluZm89eyJhIjp3YXNtSW1wb3J0c307ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLG1vZHVsZSl7d2FzbUV4cG9ydHM9aW5zdGFuY2UuZXhwb3J0czt3YXNtTWVtb3J5PXdhc21FeHBvcnRzWyJrIl07dXBkYXRlTWVtb3J5Vmlld3MoKTthZGRPbkluaXQod2FzbUV4cG9ydHNbImwiXSk7cmVtb3ZlUnVuRGVwZW5kZW5jeSgpO3JldHVybiB3YXNtRXhwb3J0c31hZGRSdW5EZXBlbmRlbmN5KCk7ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQocmVzdWx0KXtyZWNlaXZlSW5zdGFuY2UocmVzdWx0WyJpbnN0YW5jZSJdKTt9aWYoTW9kdWxlWyJpbnN0YW50aWF0ZVdhc20iXSl7dHJ5e3JldHVybiBNb2R1bGVbImluc3RhbnRpYXRlV2FzbSJdKGluZm8scmVjZWl2ZUluc3RhbmNlKX1jYXRjaChlKXtlcnIoYE1vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6ICR7ZX1gKTtyZWFkeVByb21pc2VSZWplY3QoZSk7fX1pbnN0YW50aWF0ZUFzeW5jKHdhc21CaW5hcnksd2FzbUJpbmFyeUZpbGUsaW5mbyxyZWNlaXZlSW5zdGFudGlhdGlvblJlc3VsdCkuY2F0Y2gocmVhZHlQcm9taXNlUmVqZWN0KTtyZXR1cm4ge319dmFyIGNhbGxSdW50aW1lQ2FsbGJhY2tzPWNhbGxiYWNrcz0+e3doaWxlKGNhbGxiYWNrcy5sZW5ndGg+MCl7Y2FsbGJhY2tzLnNoaWZ0KCkoTW9kdWxlKTt9fTtNb2R1bGVbIm5vRXhpdFJ1bnRpbWUiXXx8dHJ1ZTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfYmlnaW50PShwcmltaXRpdmVUeXBlLG5hbWUsc2l6ZSxtaW5SYW5nZSxtYXhSYW5nZSk9Pnt9O3ZhciBlbWJpbmRfaW5pdF9jaGFyQ29kZXM9KCk9Pnt2YXIgY29kZXM9bmV3IEFycmF5KDI1Nik7Zm9yKHZhciBpPTA7aTwyNTY7KytpKXtjb2Rlc1tpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpO31lbWJpbmRfY2hhckNvZGVzPWNvZGVzO307dmFyIGVtYmluZF9jaGFyQ29kZXM7dmFyIHJlYWRMYXRpbjFTdHJpbmc9cHRyPT57dmFyIHJldD0iIjt2YXIgYz1wdHI7d2hpbGUoSEVBUFU4W2NdKXtyZXQrPWVtYmluZF9jaGFyQ29kZXNbSEVBUFU4W2MrK11dO31yZXR1cm4gcmV0fTt2YXIgYXdhaXRpbmdEZXBlbmRlbmNpZXM9e307dmFyIHJlZ2lzdGVyZWRUeXBlcz17fTt2YXIgQmluZGluZ0Vycm9yO3ZhciB0aHJvd0JpbmRpbmdFcnJvcj1tZXNzYWdlPT57dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihtZXNzYWdlKX07ZnVuY3Rpb24gc2hhcmVkUmVnaXN0ZXJUeXBlKHJhd1R5cGUscmVnaXN0ZXJlZEluc3RhbmNlLG9wdGlvbnM9e30pe3ZhciBuYW1lPXJlZ2lzdGVyZWRJbnN0YW5jZS5uYW1lO2lmKCFyYXdUeXBlKXt0aHJvd0JpbmRpbmdFcnJvcihgdHlwZSAiJHtuYW1lfSIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcmApO31pZihyZWdpc3RlcmVkVHlwZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe2lmKG9wdGlvbnMuaWdub3JlRHVwbGljYXRlUmVnaXN0cmF0aW9ucyl7cmV0dXJufWVsc2Uge3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnJHtuYW1lfScgdHdpY2VgKTt9fXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXT1yZWdpc3RlcmVkSW5zdGFuY2U7aWYoYXdhaXRpbmdEZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe3ZhciBjYWxsYmFja3M9YXdhaXRpbmdEZXBlbmRlbmNpZXNbcmF3VHlwZV07ZGVsZXRlIGF3YWl0aW5nRGVwZW5kZW5jaWVzW3Jhd1R5cGVdO2NhbGxiYWNrcy5mb3JFYWNoKGNiPT5jYigpKTt9fWZ1bmN0aW9uIHJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zPXt9KXtpZighKCJhcmdQYWNrQWR2YW5jZSJpbiByZWdpc3RlcmVkSW5zdGFuY2UpKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlIil9cmV0dXJuIHNoYXJlZFJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zKX12YXIgR2VuZXJpY1dpcmVUeXBlU2l6ZT04O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9ib29sPShyYXdUeXBlLG5hbWUsdHJ1ZVZhbHVlLGZhbHNlVmFsdWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24od3Qpe3JldHVybiAhIXd0fSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIG8/dHJ1ZVZhbHVlOmZhbHNlVmFsdWV9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVThbcG9pbnRlcl0pfSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307ZnVuY3Rpb24gaGFuZGxlQWxsb2NhdG9ySW5pdCgpe09iamVjdC5hc3NpZ24oSGFuZGxlQWxsb2NhdG9yLnByb3RvdHlwZSx7Z2V0KGlkKXtyZXR1cm4gdGhpcy5hbGxvY2F0ZWRbaWRdfSxoYXMoaWQpe3JldHVybiB0aGlzLmFsbG9jYXRlZFtpZF0hPT11bmRlZmluZWR9LGFsbG9jYXRlKGhhbmRsZSl7dmFyIGlkPXRoaXMuZnJlZWxpc3QucG9wKCl8fHRoaXMuYWxsb2NhdGVkLmxlbmd0aDt0aGlzLmFsbG9jYXRlZFtpZF09aGFuZGxlO3JldHVybiBpZH0sZnJlZShpZCl7dGhpcy5hbGxvY2F0ZWRbaWRdPXVuZGVmaW5lZDt0aGlzLmZyZWVsaXN0LnB1c2goaWQpO319KTt9ZnVuY3Rpb24gSGFuZGxlQWxsb2NhdG9yKCl7dGhpcy5hbGxvY2F0ZWQ9W3VuZGVmaW5lZF07dGhpcy5mcmVlbGlzdD1bXTt9dmFyIGVtdmFsX2hhbmRsZXM9bmV3IEhhbmRsZUFsbG9jYXRvcjt2YXIgX19lbXZhbF9kZWNyZWY9aGFuZGxlPT57aWYoaGFuZGxlPj1lbXZhbF9oYW5kbGVzLnJlc2VydmVkJiYwPT09LS1lbXZhbF9oYW5kbGVzLmdldChoYW5kbGUpLnJlZmNvdW50KXtlbXZhbF9oYW5kbGVzLmZyZWUoaGFuZGxlKTt9fTt2YXIgY291bnRfZW12YWxfaGFuZGxlcz0oKT0+e3ZhciBjb3VudD0wO2Zvcih2YXIgaT1lbXZhbF9oYW5kbGVzLnJlc2VydmVkO2k8ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoOysraSl7aWYoZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWRbaV0hPT11bmRlZmluZWQpeysrY291bnQ7fX1yZXR1cm4gY291bnR9O3ZhciBpbml0X2VtdmFsPSgpPT57ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQucHVzaCh7dmFsdWU6dW5kZWZpbmVkfSx7dmFsdWU6bnVsbH0se3ZhbHVlOnRydWV9LHt2YWx1ZTpmYWxzZX0pO2VtdmFsX2hhbmRsZXMucmVzZXJ2ZWQ9ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoO01vZHVsZVsiY291bnRfZW12YWxfaGFuZGxlcyJdPWNvdW50X2VtdmFsX2hhbmRsZXM7fTt2YXIgRW12YWw9e3RvVmFsdWU6aGFuZGxlPT57aWYoIWhhbmRsZSl7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9ICIraGFuZGxlKTt9cmV0dXJuIGVtdmFsX2hhbmRsZXMuZ2V0KGhhbmRsZSkudmFsdWV9LHRvSGFuZGxlOnZhbHVlPT57c3dpdGNoKHZhbHVlKXtjYXNlIHVuZGVmaW5lZDpyZXR1cm4gMTtjYXNlIG51bGw6cmV0dXJuIDI7Y2FzZSB0cnVlOnJldHVybiAzO2Nhc2UgZmFsc2U6cmV0dXJuIDQ7ZGVmYXVsdDp7cmV0dXJuIGVtdmFsX2hhbmRsZXMuYWxsb2NhdGUoe3JlZmNvdW50OjEsdmFsdWU6dmFsdWV9KX19fX07ZnVuY3Rpb24gc2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKEhFQVAzMltwb2ludGVyPj4yXSl9dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX2VtdmFsPShyYXdUeXBlLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6aGFuZGxlPT57dmFyIHJ2PUVtdmFsLnRvVmFsdWUoaGFuZGxlKTtfX2VtdmFsX2RlY3JlZihoYW5kbGUpO3JldHVybiBydn0sInRvV2lyZVR5cGUiOihkZXN0cnVjdG9ycyx2YWx1ZSk9PkVtdmFsLnRvSGFuZGxlKHZhbHVlKSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307dmFyIGZsb2F0UmVhZFZhbHVlRnJvbVBvaW50ZXI9KG5hbWUsd2lkdGgpPT57c3dpdGNoKHdpZHRoKXtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQRjMyW3BvaW50ZXI+PjJdKX07Y2FzZSA4OnJldHVybiBmdW5jdGlvbihwb2ludGVyKXtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oSEVBUEY2NFtwb2ludGVyPj4zXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmbG9hdCB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfZmxvYXQ9KHJhd1R5cGUsbmFtZSxzaXplKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT52YWx1ZSwidG9XaXJlVHlwZSI6KGRlc3RydWN0b3JzLHZhbHVlKT0+dmFsdWUsImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6ZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNpemUpLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSk7fTt2YXIgaW50ZWdlclJlYWRWYWx1ZUZyb21Qb2ludGVyPShuYW1lLHdpZHRoLHNpZ25lZCk9Pntzd2l0Y2god2lkdGgpe2Nhc2UgMTpyZXR1cm4gc2lnbmVkP3BvaW50ZXI9PkhFQVA4W3BvaW50ZXI+PjBdOnBvaW50ZXI9PkhFQVBVOFtwb2ludGVyPj4wXTtjYXNlIDI6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMTZbcG9pbnRlcj4+MV06cG9pbnRlcj0+SEVBUFUxNltwb2ludGVyPj4xXTtjYXNlIDQ6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMzJbcG9pbnRlcj4+Ml06cG9pbnRlcj0+SEVBUFUzMltwb2ludGVyPj4yXTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgaW50ZWdlciB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcj0ocHJpbWl0aXZlVHlwZSxuYW1lLHNpemUsbWluUmFuZ2UsbWF4UmFuZ2UpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlO2lmKG1pblJhbmdlPT09MCl7dmFyIGJpdHNoaWZ0PTMyLTgqc2l6ZTtmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlPDxiaXRzaGlmdD4+PmJpdHNoaWZ0O312YXIgaXNVbnNpZ25lZFR5cGU9bmFtZS5pbmNsdWRlcygidW5zaWduZWQiKTt2YXIgY2hlY2tBc3NlcnRpb25zPSh2YWx1ZSx0b1R5cGVOYW1lKT0+e307dmFyIHRvV2lyZVR5cGU7aWYoaXNVbnNpZ25lZFR5cGUpe3RvV2lyZVR5cGU9ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2NoZWNrQXNzZXJ0aW9ucyh2YWx1ZSx0aGlzLm5hbWUpO3JldHVybiB2YWx1ZT4+PjB9O31lbHNlIHt0b1dpcmVUeXBlPWZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtjaGVja0Fzc2VydGlvbnModmFsdWUsdGhpcy5uYW1lKTtyZXR1cm4gdmFsdWV9O31yZWdpc3RlclR5cGUocHJpbWl0aXZlVHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZyb21XaXJlVHlwZSwidG9XaXJlVHlwZSI6dG9XaXJlVHlwZSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjppbnRlZ2VyUmVhZFZhbHVlRnJvbVBvaW50ZXIobmFtZSxzaXplLG1pblJhbmdlIT09MCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KTt9O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldz0ocmF3VHlwZSxkYXRhVHlwZUluZGV4LG5hbWUpPT57dmFyIHR5cGVNYXBwaW5nPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheV07dmFyIFRBPXR5cGVNYXBwaW5nW2RhdGFUeXBlSW5kZXhdO2Z1bmN0aW9uIGRlY29kZU1lbW9yeVZpZXcoaGFuZGxlKXt2YXIgc2l6ZT1IRUFQVTMyW2hhbmRsZT4+Ml07dmFyIGRhdGE9SEVBUFUzMltoYW5kbGUrND4+Ml07cmV0dXJuIG5ldyBUQShIRUFQOC5idWZmZXIsZGF0YSxzaXplKX1uYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpkZWNvZGVNZW1vcnlWaWV3LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmRlY29kZU1lbW9yeVZpZXd9LHtpZ25vcmVEdXBsaWNhdGVSZWdpc3RyYXRpb25zOnRydWV9KTt9O2Z1bmN0aW9uIHJlYWRQb2ludGVyKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVTMyW3BvaW50ZXI+PjJdKX12YXIgc3RyaW5nVG9VVEY4QXJyYXk9KHN0cixoZWFwLG91dElkeCxtYXhCeXRlc1RvV3JpdGUpPT57aWYoIShtYXhCeXRlc1RvV3JpdGU+MCkpcmV0dXJuIDA7dmFyIHN0YXJ0SWR4PW91dElkeDt2YXIgZW5kSWR4PW91dElkeCttYXhCeXRlc1RvV3JpdGUtMTtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgdT1zdHIuY2hhckNvZGVBdChpKTtpZih1Pj01NTI5NiYmdTw9NTczNDMpe3ZhciB1MT1zdHIuY2hhckNvZGVBdCgrK2kpO3U9NjU1MzYrKCh1JjEwMjMpPDwxMCl8dTEmMTAyMzt9aWYodTw9MTI3KXtpZihvdXRJZHg+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT11O31lbHNlIGlmKHU8PTIwNDcpe2lmKG91dElkeCsxPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MTkyfHU+PjY7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fWVsc2UgaWYodTw9NjU1MzUpe2lmKG91dElkeCsyPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MjI0fHU+PjEyO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzO31lbHNlIHtpZihvdXRJZHgrMz49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPTI0MHx1Pj4xODtoZWFwW291dElkeCsrXT0xMjh8dT4+MTImNjM7aGVhcFtvdXRJZHgrK109MTI4fHU+PjYmNjM7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fX1oZWFwW291dElkeF09MDtyZXR1cm4gb3V0SWR4LXN0YXJ0SWR4fTt2YXIgc3RyaW5nVG9VVEY4PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PnN0cmluZ1RvVVRGOEFycmF5KHN0cixIRUFQVTgsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk7dmFyIGxlbmd0aEJ5dGVzVVRGOD1zdHI9Pnt2YXIgbGVuPTA7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGM9c3RyLmNoYXJDb2RlQXQoaSk7aWYoYzw9MTI3KXtsZW4rKzt9ZWxzZSBpZihjPD0yMDQ3KXtsZW4rPTI7fWVsc2UgaWYoYz49NTUyOTYmJmM8PTU3MzQzKXtsZW4rPTQ7KytpO31lbHNlIHtsZW4rPTM7fX1yZXR1cm4gbGVufTt2YXIgVVRGOERlY29kZXI9dHlwZW9mIFRleHREZWNvZGVyIT0idW5kZWZpbmVkIj9uZXcgVGV4dERlY29kZXIoInV0ZjgiKTp1bmRlZmluZWQ7dmFyIFVURjhBcnJheVRvU3RyaW5nPShoZWFwT3JBcnJheSxpZHgsbWF4Qnl0ZXNUb1JlYWQpPT57dmFyIGVuZElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQ7dmFyIGVuZFB0cj1pZHg7d2hpbGUoaGVhcE9yQXJyYXlbZW5kUHRyXSYmIShlbmRQdHI+PWVuZElkeCkpKytlbmRQdHI7aWYoZW5kUHRyLWlkeD4xNiYmaGVhcE9yQXJyYXkuYnVmZmVyJiZVVEY4RGVjb2Rlcil7cmV0dXJuIFVURjhEZWNvZGVyLmRlY29kZShoZWFwT3JBcnJheS5zdWJhcnJheShpZHgsZW5kUHRyKSl9dmFyIHN0cj0iIjt3aGlsZShpZHg8ZW5kUHRyKXt2YXIgdTA9aGVhcE9yQXJyYXlbaWR4KytdO2lmKCEodTAmMTI4KSl7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHUwKTtjb250aW51ZX12YXIgdTE9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyMjQpPT0xOTIpe3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgodTAmMzEpPDw2fHUxKTtjb250aW51ZX12YXIgdTI9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyNDApPT0yMjQpe3UwPSh1MCYxNSk8PDEyfHUxPDw2fHUyO31lbHNlIHt1MD0odTAmNyk8PDE4fHUxPDwxMnx1Mjw8NnxoZWFwT3JBcnJheVtpZHgrK10mNjM7fWlmKHUwPDY1NTM2KXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodTApO31lbHNlIHt2YXIgY2g9dTAtNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9fXJldHVybiBzdHJ9O3ZhciBVVEY4VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9PnB0cj9VVEY4QXJyYXlUb1N0cmluZyhIRUFQVTgscHRyLG1heEJ5dGVzVG9SZWFkKToiIjt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZz0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTt2YXIgc3RkU3RyaW5nSXNVVEY4PW5hbWU9PT0ic3RkOjpzdHJpbmciO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSIodmFsdWUpe3ZhciBsZW5ndGg9SEVBUFUzMlt2YWx1ZT4+Ml07dmFyIHBheWxvYWQ9dmFsdWUrNDt2YXIgc3RyO2lmKHN0ZFN0cmluZ0lzVVRGOCl7dmFyIGRlY29kZVN0YXJ0UHRyPXBheWxvYWQ7Zm9yKHZhciBpPTA7aTw9bGVuZ3RoOysraSl7dmFyIGN1cnJlbnRCeXRlUHRyPXBheWxvYWQraTtpZihpPT1sZW5ndGh8fEhFQVBVOFtjdXJyZW50Qnl0ZVB0cl09PTApe3ZhciBtYXhSZWFkPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PVVURjhUb1N0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkKTtpZihzdHI9PT11bmRlZmluZWQpe3N0cj1zdHJpbmdTZWdtZW50O31lbHNlIHtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCk7c3RyKz1zdHJpbmdTZWdtZW50O31kZWNvZGVTdGFydFB0cj1jdXJyZW50Qnl0ZVB0cisxO319fWVsc2Uge3ZhciBhPW5ldyBBcnJheShsZW5ndGgpO2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7YVtpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKEhFQVBVOFtwYXlsb2FkK2ldKTt9c3RyPWEuam9pbigiIik7fV9mcmVlKHZhbHVlKTtyZXR1cm4gc3RyfSwidG9XaXJlVHlwZSIoZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpe3ZhbHVlPW5ldyBVaW50OEFycmF5KHZhbHVlKTt9dmFyIGxlbmd0aDt2YXIgdmFsdWVJc09mVHlwZVN0cmluZz10eXBlb2YgdmFsdWU9PSJzdHJpbmciO2lmKCEodmFsdWVJc09mVHlwZVN0cmluZ3x8dmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIEludDhBcnJheSkpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIHN0ZDo6c3RyaW5nIik7fWlmKHN0ZFN0cmluZ0lzVVRGOCYmdmFsdWVJc09mVHlwZVN0cmluZyl7bGVuZ3RoPWxlbmd0aEJ5dGVzVVRGOCh2YWx1ZSk7fWVsc2Uge2xlbmd0aD12YWx1ZS5sZW5ndGg7fXZhciBiYXNlPV9tYWxsb2MoNCtsZW5ndGgrMSk7dmFyIHB0cj1iYXNlKzQ7SEVBUFUzMltiYXNlPj4yXT1sZW5ndGg7aWYoc3RkU3RyaW5nSXNVVEY4JiZ2YWx1ZUlzT2ZUeXBlU3RyaW5nKXtzdHJpbmdUb1VURjgodmFsdWUscHRyLGxlbmd0aCsxKTt9ZWxzZSB7aWYodmFsdWVJc09mVHlwZVN0cmluZyl7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXt2YXIgY2hhckNvZGU9dmFsdWUuY2hhckNvZGVBdChpKTtpZihjaGFyQ29kZT4yNTUpe19mcmVlKHB0cik7dGhyb3dCaW5kaW5nRXJyb3IoIlN0cmluZyBoYXMgVVRGLTE2IGNvZGUgdW5pdHMgdGhhdCBkbyBub3QgZml0IGluIDggYml0cyIpO31IRUFQVThbcHRyK2ldPWNoYXJDb2RlO319ZWxzZSB7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXtIRUFQVThbcHRyK2ldPXZhbHVlW2ldO319fWlmKGRlc3RydWN0b3JzIT09bnVsbCl7ZGVzdHJ1Y3RvcnMucHVzaChfZnJlZSxiYXNlKTt9cmV0dXJuIGJhc2V9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOnJlYWRQb2ludGVyLGRlc3RydWN0b3JGdW5jdGlvbihwdHIpe19mcmVlKHB0cik7fX0pO307dmFyIFVURjE2RGVjb2Rlcj10eXBlb2YgVGV4dERlY29kZXIhPSJ1bmRlZmluZWQiP25ldyBUZXh0RGVjb2RlcigidXRmLTE2bGUiKTp1bmRlZmluZWQ7dmFyIFVURjE2VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgZW5kUHRyPXB0cjt2YXIgaWR4PWVuZFB0cj4+MTt2YXIgbWF4SWR4PWlkeCttYXhCeXRlc1RvUmVhZC8yO3doaWxlKCEoaWR4Pj1tYXhJZHgpJiZIRUFQVTE2W2lkeF0pKytpZHg7ZW5kUHRyPWlkeDw8MTtpZihlbmRQdHItcHRyPjMyJiZVVEYxNkRlY29kZXIpcmV0dXJuIFVURjE2RGVjb2Rlci5kZWNvZGUoSEVBUFU4LnN1YmFycmF5KHB0cixlbmRQdHIpKTt2YXIgc3RyPSIiO2Zvcih2YXIgaT0wOyEoaT49bWF4Qnl0ZXNUb1JlYWQvMik7KytpKXt2YXIgY29kZVVuaXQ9SEVBUDE2W3B0citpKjI+PjFdO2lmKGNvZGVVbml0PT0wKWJyZWFrO3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZShjb2RlVW5pdCk7fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjE2PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8MilyZXR1cm4gMDttYXhCeXRlc1RvV3JpdGUtPTI7dmFyIHN0YXJ0UHRyPW91dFB0cjt2YXIgbnVtQ2hhcnNUb1dyaXRlPW1heEJ5dGVzVG9Xcml0ZTxzdHIubGVuZ3RoKjI/bWF4Qnl0ZXNUb1dyaXRlLzI6c3RyLmxlbmd0aDtmb3IodmFyIGk9MDtpPG51bUNoYXJzVG9Xcml0ZTsrK2kpe3ZhciBjb2RlVW5pdD1zdHIuY2hhckNvZGVBdChpKTtIRUFQMTZbb3V0UHRyPj4xXT1jb2RlVW5pdDtvdXRQdHIrPTI7fUhFQVAxNltvdXRQdHI+PjFdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn07dmFyIGxlbmd0aEJ5dGVzVVRGMTY9c3RyPT5zdHIubGVuZ3RoKjI7dmFyIFVURjMyVG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgaT0wO3ZhciBzdHI9IiI7d2hpbGUoIShpPj1tYXhCeXRlc1RvUmVhZC80KSl7dmFyIHV0ZjMyPUhFQVAzMltwdHIraSo0Pj4yXTtpZih1dGYzMj09MClicmVhazsrK2k7aWYodXRmMzI+PTY1NTM2KXt2YXIgY2g9dXRmMzItNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9ZWxzZSB7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHV0ZjMyKTt9fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjMyPShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8NClyZXR1cm4gMDt2YXIgc3RhcnRQdHI9b3V0UHRyO3ZhciBlbmRQdHI9c3RhcnRQdHIrbWF4Qnl0ZXNUb1dyaXRlLTQ7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGNvZGVVbml0PXN0ci5jaGFyQ29kZUF0KGkpO2lmKGNvZGVVbml0Pj01NTI5NiYmY29kZVVuaXQ8PTU3MzQzKXt2YXIgdHJhaWxTdXJyb2dhdGU9c3RyLmNoYXJDb2RlQXQoKytpKTtjb2RlVW5pdD02NTUzNisoKGNvZGVVbml0JjEwMjMpPDwxMCl8dHJhaWxTdXJyb2dhdGUmMTAyMzt9SEVBUDMyW291dFB0cj4+Ml09Y29kZVVuaXQ7b3V0UHRyKz00O2lmKG91dFB0cis0PmVuZFB0cilicmVha31IRUFQMzJbb3V0UHRyPj4yXT0wO3JldHVybiBvdXRQdHItc3RhcnRQdHJ9O3ZhciBsZW5ndGhCeXRlc1VURjMyPXN0cj0+e3ZhciBsZW49MDtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7aWYoY29kZVVuaXQ+PTU1Mjk2JiZjb2RlVW5pdDw9NTczNDMpKytpO2xlbis9NDt9cmV0dXJuIGxlbn07dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nPShyYXdUeXBlLGNoYXJTaXplLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBkZWNvZGVTdHJpbmcsZW5jb2RlU3RyaW5nLGdldEhlYXAsbGVuZ3RoQnl0ZXNVVEYsc2hpZnQ7aWYoY2hhclNpemU9PT0yKXtkZWNvZGVTdHJpbmc9VVRGMTZUb1N0cmluZztlbmNvZGVTdHJpbmc9c3RyaW5nVG9VVEYxNjtsZW5ndGhCeXRlc1VURj1sZW5ndGhCeXRlc1VURjE2O2dldEhlYXA9KCk9PkhFQVBVMTY7c2hpZnQ9MTt9ZWxzZSBpZihjaGFyU2l6ZT09PTQpe2RlY29kZVN0cmluZz1VVEYzMlRvU3RyaW5nO2VuY29kZVN0cmluZz1zdHJpbmdUb1VURjMyO2xlbmd0aEJ5dGVzVVRGPWxlbmd0aEJ5dGVzVVRGMzI7Z2V0SGVhcD0oKT0+SEVBUFUzMjtzaGlmdD0yO31yZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT57dmFyIGxlbmd0aD1IRUFQVTMyW3ZhbHVlPj4yXTt2YXIgSEVBUD1nZXRIZWFwKCk7dmFyIHN0cjt2YXIgZGVjb2RlU3RhcnRQdHI9dmFsdWUrNDtmb3IodmFyIGk9MDtpPD1sZW5ndGg7KytpKXt2YXIgY3VycmVudEJ5dGVQdHI9dmFsdWUrNCtpKmNoYXJTaXplO2lmKGk9PWxlbmd0aHx8SEVBUFtjdXJyZW50Qnl0ZVB0cj4+c2hpZnRdPT0wKXt2YXIgbWF4UmVhZEJ5dGVzPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PWRlY29kZVN0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkQnl0ZXMpO2lmKHN0cj09PXVuZGVmaW5lZCl7c3RyPXN0cmluZ1NlZ21lbnQ7fWVsc2Uge3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKTtzdHIrPXN0cmluZ1NlZ21lbnQ7fWRlY29kZVN0YXJ0UHRyPWN1cnJlbnRCeXRlUHRyK2NoYXJTaXplO319X2ZyZWUodmFsdWUpO3JldHVybiBzdHJ9LCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsdmFsdWUpPT57aWYoISh0eXBlb2YgdmFsdWU9PSJzdHJpbmciKSl7dGhyb3dCaW5kaW5nRXJyb3IoYENhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICR7bmFtZX1gKTt9dmFyIGxlbmd0aD1sZW5ndGhCeXRlc1VURih2YWx1ZSk7dmFyIHB0cj1fbWFsbG9jKDQrbGVuZ3RoK2NoYXJTaXplKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoPj5zaGlmdDtlbmNvZGVTdHJpbmcodmFsdWUscHRyKzQsbGVuZ3RoK2NoYXJTaXplKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKTt9cmV0dXJuIHB0cn0sImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIsZGVzdHJ1Y3RvckZ1bmN0aW9uKHB0cil7X2ZyZWUocHRyKTt9fSk7fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfdm9pZD0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7aXNWb2lkOnRydWUsbmFtZTpuYW1lLCJhcmdQYWNrQWR2YW5jZSI6MCwiZnJvbVdpcmVUeXBlIjooKT0+dW5kZWZpbmVkLCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsbyk9PnVuZGVmaW5lZH0pO307dmFyIGdldEhlYXBNYXg9KCk9PjIxNDc0ODM2NDg7dmFyIGdyb3dNZW1vcnk9c2l6ZT0+e3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO3ZhciBwYWdlcz0oc2l6ZS1iLmJ5dGVMZW5ndGgrNjU1MzUpLzY1NTM2O3RyeXt3YXNtTWVtb3J5Lmdyb3cocGFnZXMpO3VwZGF0ZU1lbW9yeVZpZXdzKCk7cmV0dXJuIDF9Y2F0Y2goZSl7fX07dmFyIF9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwPXJlcXVlc3RlZFNpemU9Pnt2YXIgb2xkU2l6ZT1IRUFQVTgubGVuZ3RoO3JlcXVlc3RlZFNpemU+Pj49MDt2YXIgbWF4SGVhcFNpemU9Z2V0SGVhcE1heCgpO2lmKHJlcXVlc3RlZFNpemU+bWF4SGVhcFNpemUpe3JldHVybiBmYWxzZX12YXIgYWxpZ25VcD0oeCxtdWx0aXBsZSk9PngrKG11bHRpcGxlLXglbXVsdGlwbGUpJW11bHRpcGxlO2Zvcih2YXIgY3V0RG93bj0xO2N1dERvd248PTQ7Y3V0RG93bio9Mil7dmFyIG92ZXJHcm93bkhlYXBTaXplPW9sZFNpemUqKDErLjIvY3V0RG93bik7b3Zlckdyb3duSGVhcFNpemU9TWF0aC5taW4ob3Zlckdyb3duSGVhcFNpemUscmVxdWVzdGVkU2l6ZSsxMDA2NjMyOTYpO3ZhciBuZXdTaXplPU1hdGgubWluKG1heEhlYXBTaXplLGFsaWduVXAoTWF0aC5tYXgocmVxdWVzdGVkU2l6ZSxvdmVyR3Jvd25IZWFwU2l6ZSksNjU1MzYpKTt2YXIgcmVwbGFjZW1lbnQ9Z3Jvd01lbW9yeShuZXdTaXplKTtpZihyZXBsYWNlbWVudCl7cmV0dXJuIHRydWV9fXJldHVybiBmYWxzZX07ZW1iaW5kX2luaXRfY2hhckNvZGVzKCk7QmluZGluZ0Vycm9yPU1vZHVsZVsiQmluZGluZ0Vycm9yIl09Y2xhc3MgQmluZGluZ0Vycm9yIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IobWVzc2FnZSl7c3VwZXIobWVzc2FnZSk7dGhpcy5uYW1lPSJCaW5kaW5nRXJyb3IiO319O01vZHVsZVsiSW50ZXJuYWxFcnJvciJdPWNsYXNzIEludGVybmFsRXJyb3IgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihtZXNzYWdlKXtzdXBlcihtZXNzYWdlKTt0aGlzLm5hbWU9IkludGVybmFsRXJyb3IiO319O2hhbmRsZUFsbG9jYXRvckluaXQoKTtpbml0X2VtdmFsKCk7dmFyIHdhc21JbXBvcnRzPXtmOl9fZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludCxpOl9fZW1iaW5kX3JlZ2lzdGVyX2Jvb2wsaDpfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbCxlOl9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0LGI6X19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcixhOl9fZW1iaW5kX3JlZ2lzdGVyX21lbW9yeV92aWV3LGQ6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZyxjOl9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nLGo6X19lbWJpbmRfcmVnaXN0ZXJfdm9pZCxnOl9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwfTt2YXIgd2FzbUV4cG9ydHM9Y3JlYXRlV2FzbSgpO01vZHVsZVsiX3NvcnQiXT0oYTAsYTEsYTIsYTMsYTQsYTUsYTYsYTcsYTgpPT4oTW9kdWxlWyJfc29ydCJdPXdhc21FeHBvcnRzWyJtIl0pKGEwLGExLGEyLGEzLGE0LGE1LGE2LGE3LGE4KTtNb2R1bGVbIl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3MiXT0oKT0+KE1vZHVsZVsiX19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5ncyJdPXdhc21FeHBvcnRzWyJuIl0pKCk7dmFyIF9tYWxsb2M9TW9kdWxlWyJfbWFsbG9jIl09YTA9PihfbWFsbG9jPU1vZHVsZVsiX21hbGxvYyJdPXdhc21FeHBvcnRzWyJwIl0pKGEwKTt2YXIgX2ZyZWU9TW9kdWxlWyJfZnJlZSJdPWEwPT4oX2ZyZWU9TW9kdWxlWyJfZnJlZSJdPXdhc21FeHBvcnRzWyJxIl0pKGEwKTtmdW5jdGlvbiBpbnRBcnJheUZyb21CYXNlNjQocyl7dmFyIGRlY29kZWQ9YXRvYihzKTt2YXIgYnl0ZXM9bmV3IFVpbnQ4QXJyYXkoZGVjb2RlZC5sZW5ndGgpO2Zvcih2YXIgaT0wO2k8ZGVjb2RlZC5sZW5ndGg7KytpKXtieXRlc1tpXT1kZWNvZGVkLmNoYXJDb2RlQXQoaSk7fXJldHVybiBieXRlc31mdW5jdGlvbiB0cnlQYXJzZUFzRGF0YVVSSShmaWxlbmFtZSl7aWYoIWlzRGF0YVVSSShmaWxlbmFtZSkpe3JldHVybn1yZXR1cm4gaW50QXJyYXlGcm9tQmFzZTY0KGZpbGVuYW1lLnNsaWNlKGRhdGFVUklQcmVmaXgubGVuZ3RoKSl9dmFyIGNhbGxlZFJ1bjtkZXBlbmRlbmNpZXNGdWxmaWxsZWQ9ZnVuY3Rpb24gcnVuQ2FsbGVyKCl7aWYoIWNhbGxlZFJ1bilydW4oKTtpZighY2FsbGVkUnVuKWRlcGVuZGVuY2llc0Z1bGZpbGxlZD1ydW5DYWxsZXI7fTtmdW5jdGlvbiBydW4oKXtpZihydW5EZXBlbmRlbmNpZXM+MCl7cmV0dXJufXByZVJ1bigpO2lmKHJ1bkRlcGVuZGVuY2llcz4wKXtyZXR1cm59ZnVuY3Rpb24gZG9SdW4oKXtpZihjYWxsZWRSdW4pcmV0dXJuO2NhbGxlZFJ1bj10cnVlO01vZHVsZVsiY2FsbGVkUnVuIl09dHJ1ZTtpZihBQk9SVClyZXR1cm47aW5pdFJ1bnRpbWUoKTtyZWFkeVByb21pc2VSZXNvbHZlKE1vZHVsZSk7aWYoTW9kdWxlWyJvblJ1bnRpbWVJbml0aWFsaXplZCJdKU1vZHVsZVsib25SdW50aW1lSW5pdGlhbGl6ZWQiXSgpO3Bvc3RSdW4oKTt9aWYoTW9kdWxlWyJzZXRTdGF0dXMiXSl7TW9kdWxlWyJzZXRTdGF0dXMiXSgiUnVubmluZy4uLiIpO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7TW9kdWxlWyJzZXRTdGF0dXMiXSgiIik7fSwxKTtkb1J1bigpO30sMSk7fWVsc2Uge2RvUnVuKCk7fX1pZihNb2R1bGVbInByZUluaXQiXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlSW5pdCJdPT0iZnVuY3Rpb24iKU1vZHVsZVsicHJlSW5pdCJdPVtNb2R1bGVbInByZUluaXQiXV07d2hpbGUoTW9kdWxlWyJwcmVJbml0Il0ubGVuZ3RoPjApe01vZHVsZVsicHJlSW5pdCJdLnBvcCgpKCk7fX1ydW4oKTsKCgogICAgcmV0dXJuIG1vZHVsZUFyZy5yZWFkeQogIH0KCiAgKTsKICB9KSgpOwoKICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueQogIGxldCB3YXNtTW9kdWxlOwogIGFzeW5jIGZ1bmN0aW9uIGluaXRXYXNtKCkgewogICAgICB3YXNtTW9kdWxlID0gYXdhaXQgbG9hZFdhc20oKTsKICB9CiAgbGV0IHNvcnREYXRhOwogIGxldCB2aWV3UHJvalB0cjsKICBsZXQgdHJhbnNmb3Jtc1B0cjsKICBsZXQgdHJhbnNmb3JtSW5kaWNlc1B0cjsKICBsZXQgcG9zaXRpb25zUHRyOwogIGxldCBkZXB0aEJ1ZmZlclB0cjsKICBsZXQgZGVwdGhJbmRleFB0cjsKICBsZXQgc3RhcnRzUHRyOwogIGxldCBjb3VudHNQdHI7CiAgbGV0IGFsbG9jYXRlZFZlcnRleENvdW50ID0gMDsKICBsZXQgYWxsb2NhdGVkVHJhbnNmb3JtQ291bnQgPSAwOwogIGxldCB2aWV3UHJvaiA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpOwogIGxldCBsb2NrID0gZmFsc2U7CiAgbGV0IGFsbG9jYXRpb25QZW5kaW5nID0gZmFsc2U7CiAgbGV0IHNvcnRpbmcgPSBmYWxzZTsKICBjb25zdCBhbGxvY2F0ZUJ1ZmZlcnMgPSBhc3luYyAoKSA9PiB7CiAgICAgIGlmIChsb2NrKSB7CiAgICAgICAgICBhbGxvY2F0aW9uUGVuZGluZyA9IHRydWU7CiAgICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgbG9jayA9IHRydWU7CiAgICAgIGFsbG9jYXRpb25QZW5kaW5nID0gZmFsc2U7CiAgICAgIGlmICghd2FzbU1vZHVsZSkKICAgICAgICAgIGF3YWl0IGluaXRXYXNtKCk7CiAgICAgIGNvbnN0IHRhcmdldEFsbG9jYXRlZFZlcnRleENvdW50ID0gTWF0aC5wb3coMiwgTWF0aC5jZWlsKE1hdGgubG9nMihzb3J0RGF0YS52ZXJ0ZXhDb3VudCkpKTsKICAgICAgaWYgKGFsbG9jYXRlZFZlcnRleENvdW50IDwgdGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQpIHsKICAgICAgICAgIGlmIChhbGxvY2F0ZWRWZXJ0ZXhDb3VudCA+IDApIHsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHZpZXdQcm9qUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHRyYW5zZm9ybUluZGljZXNQdHIpOwogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUocG9zaXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKGRlcHRoQnVmZmVyUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKGRlcHRoSW5kZXhQdHIpOwogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUoc3RhcnRzUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKGNvdW50c1B0cik7CiAgICAgICAgICB9CiAgICAgICAgICBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCA9IHRhcmdldEFsbG9jYXRlZFZlcnRleENvdW50OwogICAgICAgICAgdmlld1Byb2pQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMTYgKiA0KTsKICAgICAgICAgIHRyYW5zZm9ybUluZGljZXNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIHBvc2l0aW9uc1B0ciA9IHdhc21Nb2R1bGUuX21hbGxvYygzICogYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIGRlcHRoQnVmZmVyUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBkZXB0aEluZGV4UHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBzdGFydHNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIGNvdW50c1B0ciA9IHdhc21Nb2R1bGUuX21hbGxvYyhhbGxvY2F0ZWRWZXJ0ZXhDb3VudCAqIDQpOwogICAgICB9CiAgICAgIGlmIChhbGxvY2F0ZWRUcmFuc2Zvcm1Db3VudCA8IHNvcnREYXRhLnRyYW5zZm9ybXMubGVuZ3RoKSB7CiAgICAgICAgICBpZiAoYWxsb2NhdGVkVHJhbnNmb3JtQ291bnQgPiAwKSB7CiAgICAgICAgICAgICAgd2FzbU1vZHVsZS5fZnJlZSh0cmFuc2Zvcm1zUHRyKTsKICAgICAgICAgIH0KICAgICAgICAgIGFsbG9jYXRlZFRyYW5zZm9ybUNvdW50ID0gc29ydERhdGEudHJhbnNmb3Jtcy5sZW5ndGg7CiAgICAgICAgICB0cmFuc2Zvcm1zUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKGFsbG9jYXRlZFRyYW5zZm9ybUNvdW50ICogNCk7CiAgICAgIH0KICAgICAgbG9jayA9IGZhbHNlOwogICAgICBpZiAoYWxsb2NhdGlvblBlbmRpbmcpIHsKICAgICAgICAgIGFsbG9jYXRpb25QZW5kaW5nID0gZmFsc2U7CiAgICAgICAgICBhd2FpdCBhbGxvY2F0ZUJ1ZmZlcnMoKTsKICAgICAgfQogIH07CiAgY29uc3QgcnVuU29ydCA9ICgpID0+IHsKICAgICAgaWYgKGxvY2sgfHwgYWxsb2NhdGlvblBlbmRpbmcgfHwgIXdhc21Nb2R1bGUpCiAgICAgICAgICByZXR1cm47CiAgICAgIGxvY2sgPSB0cnVlOwogICAgICB3YXNtTW9kdWxlLkhFQVBGMzIuc2V0KHNvcnREYXRhLnBvc2l0aW9ucywgcG9zaXRpb25zUHRyIC8gNCk7CiAgICAgIHdhc21Nb2R1bGUuSEVBUEYzMi5zZXQoc29ydERhdGEudHJhbnNmb3JtcywgdHJhbnNmb3Jtc1B0ciAvIDQpOwogICAgICB3YXNtTW9kdWxlLkhFQVBVMzIuc2V0KHNvcnREYXRhLnRyYW5zZm9ybUluZGljZXMsIHRyYW5zZm9ybUluZGljZXNQdHIgLyA0KTsKICAgICAgd2FzbU1vZHVsZS5IRUFQRjMyLnNldCh2aWV3UHJvaiwgdmlld1Byb2pQdHIgLyA0KTsKICAgICAgd2FzbU1vZHVsZS5fc29ydCh2aWV3UHJvalB0ciwgdHJhbnNmb3Jtc1B0ciwgdHJhbnNmb3JtSW5kaWNlc1B0ciwgc29ydERhdGEudmVydGV4Q291bnQsIHBvc2l0aW9uc1B0ciwgZGVwdGhCdWZmZXJQdHIsIGRlcHRoSW5kZXhQdHIsIHN0YXJ0c1B0ciwgY291bnRzUHRyKTsKICAgICAgY29uc3QgZGVwdGhJbmRleCA9IG5ldyBVaW50MzJBcnJheSh3YXNtTW9kdWxlLkhFQVBVMzIuYnVmZmVyLCBkZXB0aEluZGV4UHRyLCBzb3J0RGF0YS52ZXJ0ZXhDb3VudCk7CiAgICAgIGNvbnN0IGRldGFjaGVkRGVwdGhJbmRleCA9IG5ldyBVaW50MzJBcnJheShkZXB0aEluZGV4LnNsaWNlKCkuYnVmZmVyKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGRlcHRoSW5kZXg6IGRldGFjaGVkRGVwdGhJbmRleCB9LCBbZGV0YWNoZWREZXB0aEluZGV4LmJ1ZmZlcl0pOwogICAgICBsb2NrID0gZmFsc2U7CiAgfTsKICBjb25zdCB0aHJvdHRsZWRTb3J0ID0gKCkgPT4gewogICAgICBpZiAoIXNvcnRpbmcpIHsKICAgICAgICAgIHNvcnRpbmcgPSB0cnVlOwogICAgICAgICAgcnVuU29ydCgpOwogICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgICAgc29ydGluZyA9IGZhbHNlOwogICAgICAgICAgICAgIHRocm90dGxlZFNvcnQoKTsKICAgICAgICAgIH0pOwogICAgICB9CiAgfTsKICBzZWxmLm9ubWVzc2FnZSA9IChlKSA9PiB7CiAgICAgIGlmIChlLmRhdGEuc29ydERhdGEpIHsKICAgICAgICAgIC8vUmVjcmVhdGluZyB0aGUgdHlwZWQgYXJyYXlzIGV2ZXJ5IHRpbWUsIHdpbGwgY2F1c2UgZmlyZWZveCB0byBsZWFrIG1lbW9yeQogICAgICAgICAgaWYgKCFzb3J0RGF0YSkgewogICAgICAgICAgICAgIHNvcnREYXRhID0gewogICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IG5ldyBGbG9hdDMyQXJyYXkoZS5kYXRhLnNvcnREYXRhLnBvc2l0aW9ucyksCiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybXM6IG5ldyBGbG9hdDMyQXJyYXkoZS5kYXRhLnNvcnREYXRhLnRyYW5zZm9ybXMpLAogICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1JbmRpY2VzOiBuZXcgVWludDMyQXJyYXkoZS5kYXRhLnNvcnREYXRhLnRyYW5zZm9ybUluZGljZXMpLAogICAgICAgICAgICAgICAgICB2ZXJ0ZXhDb3VudDogZS5kYXRhLnNvcnREYXRhLnZlcnRleENvdW50LAogICAgICAgICAgICAgIH07CiAgICAgICAgICB9CiAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICBzb3J0RGF0YS5wb3NpdGlvbnMuc2V0KGUuZGF0YS5zb3J0RGF0YS5wb3NpdGlvbnMpOwogICAgICAgICAgICAgIHNvcnREYXRhLnRyYW5zZm9ybXMuc2V0KGUuZGF0YS5zb3J0RGF0YS50cmFuc2Zvcm1zKTsKICAgICAgICAgICAgICBzb3J0RGF0YS50cmFuc2Zvcm1JbmRpY2VzLnNldChlLmRhdGEuc29ydERhdGEudHJhbnNmb3JtSW5kaWNlcyk7CiAgICAgICAgICAgICAgc29ydERhdGEudmVydGV4Q291bnQgPSBlLmRhdGEuc29ydERhdGEudmVydGV4Q291bnQ7CiAgICAgICAgICB9CiAgICAgICAgICBhbGxvY2F0ZUJ1ZmZlcnMoKTsKICAgICAgfQogICAgICBpZiAoZS5kYXRhLnZpZXdQcm9qKSB7CiAgICAgICAgICB2aWV3UHJvaiA9IEZsb2F0MzJBcnJheS5mcm9tKGUuZGF0YS52aWV3UHJvaik7CiAgICAgICAgICB0aHJvdHRsZWRTb3J0KCk7CiAgICAgIH0KICB9OwoKfSkoKTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9U29ydFdvcmtlci5qcy5tYXAKCg==");
class yU {
  constructor(U, t) {
    this._scene = null, this._camera = null, this._started = !1, this._initialized = !1, this._renderer = U;
    const F = U.gl;
    this._program = F.createProgram(), this._passes = t || [];
    const l = F.createShader(F.VERTEX_SHADER);
    F.shaderSource(l, this._getVertexSource()), F.compileShader(l), F.getShaderParameter(l, F.COMPILE_STATUS) || console.error(F.getShaderInfoLog(l));
    const V = F.createShader(F.FRAGMENT_SHADER);
    F.shaderSource(V, this._getFragmentSource()), F.compileShader(V), F.getShaderParameter(V, F.COMPILE_STATUS) || console.error(F.getShaderInfoLog(V)), F.attachShader(this.program, l), F.attachShader(this.program, V), F.linkProgram(this.program), F.getProgramParameter(this.program, F.LINK_STATUS) || console.error(F.getProgramInfoLog(this.program)), this.resize = () => {
      F.useProgram(this._program), this._resize();
    }, this.initialize = () => {
      console.assert(!this._initialized, "ShaderProgram already initialized"), F.useProgram(this._program), this._initialize();
      for (const d of this.passes) d.initialize(this);
      this._initialized = !0, this._started = !0;
    }, this.render = (d, Q) => {
      F.useProgram(this._program), this._scene === d && this._camera === Q || (this.dispose(), this._scene = d, this._camera = Q, this.initialize());
      for (const n of this.passes) n.render();
      this._render();
    }, this.dispose = () => {
      if (this._initialized) {
        F.useProgram(this._program);
        for (const d of this.passes) d.dispose();
        this._dispose(), this._scene = null, this._camera = null, this._initialized = !1;
      }
    };
  }
  get renderer() {
    return this._renderer;
  }
  get scene() {
    return this._scene;
  }
  get camera() {
    return this._camera;
  }
  get program() {
    return this._program;
  }
  get passes() {
    return this._passes;
  }
  get started() {
    return this._started;
  }
}
var Ul = EU("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgdmFyIGxvYWRXYXNtID0gKCgpID0+IHsKICAgIAogICAgcmV0dXJuICgKICBmdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkgewoKICB2YXIgTW9kdWxlPW1vZHVsZUFyZzt2YXIgcmVhZHlQcm9taXNlUmVzb2x2ZSxyZWFkeVByb21pc2VSZWplY3Q7TW9kdWxlWyJyZWFkeSJdPW5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntyZWFkeVByb21pc2VSZXNvbHZlPXJlc29sdmU7cmVhZHlQcm9taXNlUmVqZWN0PXJlamVjdDt9KTt2YXIgbW9kdWxlT3ZlcnJpZGVzPU9iamVjdC5hc3NpZ24oe30sTW9kdWxlKTt2YXIgc2NyaXB0RGlyZWN0b3J5PSIiO2Z1bmN0aW9uIGxvY2F0ZUZpbGUocGF0aCl7aWYoTW9kdWxlWyJsb2NhdGVGaWxlIl0pe3JldHVybiBNb2R1bGVbImxvY2F0ZUZpbGUiXShwYXRoLHNjcmlwdERpcmVjdG9yeSl9cmV0dXJuIHNjcmlwdERpcmVjdG9yeStwYXRofXZhciByZWFkQmluYXJ5O3t7c2NyaXB0RGlyZWN0b3J5PXNlbGYubG9jYXRpb24uaHJlZjt9aWYoc2NyaXB0RGlyZWN0b3J5LmluZGV4T2YoImJsb2I6IikhPT0wKXtzY3JpcHREaXJlY3Rvcnk9c2NyaXB0RGlyZWN0b3J5LnN1YnN0cigwLHNjcmlwdERpcmVjdG9yeS5yZXBsYWNlKC9bPyNdLiovLCIiKS5sYXN0SW5kZXhPZigiLyIpKzEpO31lbHNlIHtzY3JpcHREaXJlY3Rvcnk9IiI7fXt7cmVhZEJpbmFyeT11cmw9Pnt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKX07fX19TW9kdWxlWyJwcmludCJdfHxjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO3ZhciBlcnI9TW9kdWxlWyJwcmludEVyciJdfHxjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihNb2R1bGUsbW9kdWxlT3ZlcnJpZGVzKTttb2R1bGVPdmVycmlkZXM9bnVsbDtpZihNb2R1bGVbImFyZ3VtZW50cyJdKU1vZHVsZVsiYXJndW1lbnRzIl07aWYoTW9kdWxlWyJ0aGlzUHJvZ3JhbSJdKU1vZHVsZVsidGhpc1Byb2dyYW0iXTtpZihNb2R1bGVbInF1aXQiXSlNb2R1bGVbInF1aXQiXTt2YXIgd2FzbUJpbmFyeTtpZihNb2R1bGVbIndhc21CaW5hcnkiXSl3YXNtQmluYXJ5PU1vZHVsZVsid2FzbUJpbmFyeSJdO2lmKHR5cGVvZiBXZWJBc3NlbWJseSE9Im9iamVjdCIpe2Fib3J0KCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkIik7fXZhciB3YXNtTWVtb3J5O3ZhciBBQk9SVD1mYWxzZTt2YXIgSEVBUDgsSEVBUFU4LEhFQVAxNixIRUFQVTE2LEhFQVAzMixIRUFQVTMyLEhFQVBGMzIsSEVBUEY2NDtmdW5jdGlvbiB1cGRhdGVNZW1vcnlWaWV3cygpe3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO01vZHVsZVsiSEVBUDgiXT1IRUFQOD1uZXcgSW50OEFycmF5KGIpO01vZHVsZVsiSEVBUDE2Il09SEVBUDE2PW5ldyBJbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUFU4Il09SEVBUFU4PW5ldyBVaW50OEFycmF5KGIpO01vZHVsZVsiSEVBUFUxNiJdPUhFQVBVMTY9bmV3IFVpbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUDMyIl09SEVBUDMyPW5ldyBJbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUFUzMiJdPUhFQVBVMzI9bmV3IFVpbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUEYzMiJdPUhFQVBGMzI9bmV3IEZsb2F0MzJBcnJheShiKTtNb2R1bGVbIkhFQVBGNjQiXT1IRUFQRjY0PW5ldyBGbG9hdDY0QXJyYXkoYik7fXZhciBfX0FUUFJFUlVOX189W107dmFyIF9fQVRJTklUX189W107dmFyIF9fQVRQT1NUUlVOX189W107ZnVuY3Rpb24gcHJlUnVuKCl7aWYoTW9kdWxlWyJwcmVSdW4iXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlUnVuIl09PSJmdW5jdGlvbiIpTW9kdWxlWyJwcmVSdW4iXT1bTW9kdWxlWyJwcmVSdW4iXV07d2hpbGUoTW9kdWxlWyJwcmVSdW4iXS5sZW5ndGgpe2FkZE9uUHJlUnVuKE1vZHVsZVsicHJlUnVuIl0uc2hpZnQoKSk7fX1jYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUFJFUlVOX18pO31mdW5jdGlvbiBpbml0UnVudGltZSgpe2NhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pO31mdW5jdGlvbiBwb3N0UnVuKCl7aWYoTW9kdWxlWyJwb3N0UnVuIl0pe2lmKHR5cGVvZiBNb2R1bGVbInBvc3RSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInBvc3RSdW4iXT1bTW9kdWxlWyJwb3N0UnVuIl1dO3doaWxlKE1vZHVsZVsicG9zdFJ1biJdLmxlbmd0aCl7YWRkT25Qb3N0UnVuKE1vZHVsZVsicG9zdFJ1biJdLnNoaWZ0KCkpO319Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBPU1RSVU5fXyk7fWZ1bmN0aW9uIGFkZE9uUHJlUnVuKGNiKXtfX0FUUFJFUlVOX18udW5zaGlmdChjYik7fWZ1bmN0aW9uIGFkZE9uSW5pdChjYil7X19BVElOSVRfXy51bnNoaWZ0KGNiKTt9ZnVuY3Rpb24gYWRkT25Qb3N0UnVuKGNiKXtfX0FUUE9TVFJVTl9fLnVuc2hpZnQoY2IpO312YXIgcnVuRGVwZW5kZW5jaWVzPTA7dmFyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2Z1bmN0aW9uIGFkZFJ1bkRlcGVuZGVuY3koaWQpe3J1bkRlcGVuZGVuY2llcysrO2lmKE1vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKXtNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXShydW5EZXBlbmRlbmNpZXMpO319ZnVuY3Rpb24gcmVtb3ZlUnVuRGVwZW5kZW5jeShpZCl7cnVuRGVwZW5kZW5jaWVzLS07aWYoTW9kdWxlWyJtb25pdG9yUnVuRGVwZW5kZW5jaWVzIl0pe01vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKHJ1bkRlcGVuZGVuY2llcyk7fWlmKHJ1bkRlcGVuZGVuY2llcz09MCl7aWYoZGVwZW5kZW5jaWVzRnVsZmlsbGVkKXt2YXIgY2FsbGJhY2s9ZGVwZW5kZW5jaWVzRnVsZmlsbGVkO2RlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2NhbGxiYWNrKCk7fX19ZnVuY3Rpb24gYWJvcnQod2hhdCl7aWYoTW9kdWxlWyJvbkFib3J0Il0pe01vZHVsZVsib25BYm9ydCJdKHdoYXQpO313aGF0PSJBYm9ydGVkKCIrd2hhdCsiKSI7ZXJyKHdoYXQpO0FCT1JUPXRydWU7d2hhdCs9Ii4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby4iO3ZhciBlPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdCk7cmVhZHlQcm9taXNlUmVqZWN0KGUpO3Rocm93IGV9dmFyIGRhdGFVUklQcmVmaXg9ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCwiO3ZhciBpc0RhdGFVUkk9ZmlsZW5hbWU9PmZpbGVuYW1lLnN0YXJ0c1dpdGgoZGF0YVVSSVByZWZpeCk7dmFyIHdhc21CaW5hcnlGaWxlO3dhc21CaW5hcnlGaWxlPSJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsQUdGemJRRUFBQUFCWVE1Z0JIOS9mMzhBWUFOL2YzOEFZQVYvZjM5L2Z3QmdCbjkvZjM5L2Z3QmdBbjkvQUdBQmZ3Ri9ZQUFBWUFOL2YzOEJmMkFCZndCZ0IzOS9mMzkvZjM4QVlBSjlmUUYvWUFSL2YzNStBR0FCZlFGL1lBdC9mMzkvZjM5L2YzOS9md0FDUFFvQllRRmhBQUVCWVFGaUFBSUJZUUZqQUFFQllRRmtBQVFCWVFGbEFBRUJZUUZtQUFrQllRRm5BQVVCWVFGb0FBUUJZUUZwQUFBQllRRnFBQVFER3hvSEJRb0lCZ1FHQ3dFQUFRZ0lEQVlOQXdNQ0FnQUFCd2NGQlFRRkFYQUJFQkFGQndFQmdBS0FnQUlHQ0FGL0FVSGduUVFMQngwSEFXc0NBQUZzQUE0QmJRQVpBVzRBR0FGdkFRQUJjQUFqQVhFQUZna1ZBUUJCQVFzUEVDSU5GUlVoRFNBYUhCOE5HeDBlQ3JKUUduRUJBWDhnQWtVRVFDQUFLQUlFSUFFb0FnUkdEd3NnQUNBQlJnUkFRUUVQQ3dKQUlBQW9BZ1FpQWkwQUFDSUFSU0FBSUFFb0FnUWlBUzBBQUNJRFIzSU5BQU5BSUFFdEFBRWhBeUFDTFFBQklnQkZEUUVnQVVFQmFpRUJJQUpCQVdvaEFpQUFJQU5HRFFBTEN5QUFJQU5HQzA4QkFuOUIyQmtvQWdBaUFTQUFRUWRxUVhoeElnSnFJUUFDUUNBQ1FRQWdBQ0FCVFJzTkFDQUFQd0JCRUhSTEJFQWdBQkFHUlEwQkMwSFlHU0FBTmdJQUlBRVBDMEhvR1VFd05nSUFRWDhMRGdBZ0FCQVhJQUVRRjBFUWRISUxCZ0FnQUJBV0N5a0FRZUFaUVFFMkFnQkI1QmxCQURZQ0FCQVFRZVFaUWR3WktBSUFOZ0lBUWR3WlFlQVpOZ0lBQ3lFQUlBRUVRQU5BSUFCQkFEb0FBQ0FBUVFGcUlRQWdBVUVCYXlJQkRRQUxDd3ZoQXdCQmpCZEJtZ2tRQ1VHWUYwRzVDRUVCUVFBUUNFR2tGMEcwQ0VFQlFZQi9RZjhBRUFGQnZCZEJyUWhCQVVHQWYwSC9BQkFCUWJBWFFhc0lRUUZCQUVIL0FSQUJRY2dYUVlrSVFRSkJnSUIrUWYvL0FSQUJRZFFYUVlBSVFRSkJBRUgvL3dNUUFVSGdGMEdZQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCN0JkQmp3aEJCRUVBUVg4UUFVSDRGMEhYQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCaEJoQnpnaEJCRUVBUVg4UUFVR1FHRUdqQ0VLQWdJQ0FnSUNBZ0lCL1F2Ly8vLy8vLy8vLy93QVFFVUdjR0VHaUNFSUFRbjhRRVVHb0dFR2NDRUVFRUFSQnRCaEJrd2xCQ0JBRVFZUVBRZWtJRUFOQnpBOUJsdzBRQTBHVUVFRUVRZHdJRUFKQjRCQkJBa0gxQ0JBQ1Fhd1JRUVJCaEFrUUFrSElFVUcrQ0JBSFFmQVJRUUJCMGd3UUFFR1lFa0VBUWJnTkVBQkJ3QkpCQVVId0RCQUFRZWdTUVFKQm53a1FBRUdRRTBFRFFiNEpFQUJCdUJOQkJFSG1DUkFBUWVBVFFRVkJnd29RQUVHSUZFRUVRZDBORUFCQnNCUkJCVUg3RFJBQVFaZ1NRUUJCNlFvUUFFSEFFa0VCUWNnS0VBQkI2QkpCQWtHckN4QUFRWkFUUVFOQmlRc1FBRUc0RTBFRVFiRU1FQUJCNEJOQkJVR1BEQkFBUWRnVVFRaEI3Z3NRQUVHQUZVRUpRY3dMRUFCQnFCVkJCa0dwQ2hBQVFkQVZRUWRCb2c0UUFBc2NBQ0FBSUFGQkNDQUNweUFDUWlDSXB5QURweUFEUWlDSXB4QUZDeUFBQWtBZ0FDZ0NCQ0FCUncwQUlBQW9BaHhCQVVZTkFDQUFJQUkyQWh3TEM1b0JBQ0FBUVFFNkFEVUNRQ0FBS0FJRUlBSkhEUUFnQUVFQk9nQTBBa0FnQUNnQ0VDSUNSUVJBSUFCQkFUWUNKQ0FBSUFNMkFoZ2dBQ0FCTmdJUUlBTkJBVWNOQWlBQUtBSXdRUUZHRFFFTUFnc2dBU0FDUmdSQUlBQW9BaGdpQWtFQ1JnUkFJQUFnQXpZQ0dDQURJUUlMSUFBb0FqQkJBVWNOQWlBQ1FRRkdEUUVNQWdzZ0FDQUFLQUlrUVFGcU5nSWtDeUFBUVFFNkFEWUxDMTBCQVg4Z0FDZ0NFQ0lEUlFSQUlBQkJBVFlDSkNBQUlBSTJBaGdnQUNBQk5nSVFEd3NDUUNBQklBTkdCRUFnQUNnQ0dFRUNSdzBCSUFBZ0FqWUNHQThMSUFCQkFUb0FOaUFBUVFJMkFoZ2dBQ0FBS0FJa1FRRnFOZ0lrQ3dzQ0FBdlNDd0VIZndKQUlBQkZEUUFnQUVFSWF5SUNJQUJCQkdzb0FnQWlBVUY0Y1NJQWFpRUZBa0FnQVVFQmNRMEFJQUZCQTNGRkRRRWdBaUFDS0FJQUlnRnJJZ0pCL0Jrb0FnQkpEUUVnQUNBQmFpRUFBa0FDUUVHQUdpZ0NBQ0FDUndSQUlBRkIvd0ZOQkVBZ0FVRURkaUVFSUFJb0Fnd2lBU0FDS0FJSUlnTkdCRUJCN0JsQjdCa29BZ0JCZmlBRWQzRTJBZ0FNQlFzZ0F5QUJOZ0lNSUFFZ0F6WUNDQXdFQ3lBQ0tBSVlJUVlnQWlBQ0tBSU1JZ0ZIQkVBZ0FpZ0NDQ0lESUFFMkFnd2dBU0FETmdJSURBTUxJQUpCRkdvaUJDZ0NBQ0lEUlFSQUlBSW9BaEFpQTBVTkFpQUNRUkJxSVFRTEEwQWdCQ0VISUFNaUFVRVVhaUlFS0FJQUlnTU5BQ0FCUVJCcUlRUWdBU2dDRUNJRERRQUxJQWRCQURZQ0FBd0NDeUFGS0FJRUlnRkJBM0ZCQTBjTkFrSDBHU0FBTmdJQUlBVWdBVUYrY1RZQ0JDQUNJQUJCQVhJMkFnUWdCU0FBTmdJQUR3dEJBQ0VCQ3lBR1JRMEFBa0FnQWlnQ0hDSURRUUowUVp3Y2FpSUVLQUlBSUFKR0JFQWdCQ0FCTmdJQUlBRU5BVUh3R1VId0dTZ0NBRUYrSUFOM2NUWUNBQXdDQ3lBR1FSQkJGQ0FHS0FJUUlBSkdHMm9nQVRZQ0FDQUJSUTBCQ3lBQklBWTJBaGdnQWlnQ0VDSURCRUFnQVNBRE5nSVFJQU1nQVRZQ0dBc2dBaWdDRkNJRFJRMEFJQUVnQXpZQ0ZDQURJQUUyQWhnTElBSWdCVThOQUNBRktBSUVJZ0ZCQVhGRkRRQUNRQUpBQWtBQ1FDQUJRUUp4UlFSQVFZUWFLQUlBSUFWR0JFQkJoQm9nQWpZQ0FFSDRHVUg0R1NnQ0FDQUFhaUlBTmdJQUlBSWdBRUVCY2pZQ0JDQUNRWUFhS0FJQVJ3MEdRZlFaUVFBMkFnQkJnQnBCQURZQ0FBOExRWUFhS0FJQUlBVkdCRUJCZ0JvZ0FqWUNBRUgwR1VIMEdTZ0NBQ0FBYWlJQU5nSUFJQUlnQUVFQmNqWUNCQ0FBSUFKcUlBQTJBZ0FQQ3lBQlFYaHhJQUJxSVFBZ0FVSC9BVTBFUUNBQlFRTjJJUVFnQlNnQ0RDSUJJQVVvQWdnaUEwWUVRRUhzR1VIc0dTZ0NBRUYrSUFSM2NUWUNBQXdGQ3lBRElBRTJBZ3dnQVNBRE5nSUlEQVFMSUFVb0FoZ2hCaUFGSUFVb0Fnd2lBVWNFUUVIOEdTZ0NBQm9nQlNnQ0NDSURJQUUyQWd3Z0FTQUROZ0lJREFNTElBVkJGR29pQkNnQ0FDSURSUVJBSUFVb0FoQWlBMFVOQWlBRlFSQnFJUVFMQTBBZ0JDRUhJQU1pQVVFVWFpSUVLQUlBSWdNTkFDQUJRUkJxSVFRZ0FTZ0NFQ0lERFFBTElBZEJBRFlDQUF3Q0N5QUZJQUZCZm5FMkFnUWdBaUFBUVFGeU5nSUVJQUFnQW1vZ0FEWUNBQXdEQzBFQUlRRUxJQVpGRFFBQ1FDQUZLQUljSWdOQkFuUkJuQnhxSWdRb0FnQWdCVVlFUUNBRUlBRTJBZ0FnQVEwQlFmQVpRZkFaS0FJQVFYNGdBM2R4TmdJQURBSUxJQVpCRUVFVUlBWW9BaEFnQlVZYmFpQUJOZ0lBSUFGRkRRRUxJQUVnQmpZQ0dDQUZLQUlRSWdNRVFDQUJJQU0yQWhBZ0F5QUJOZ0lZQ3lBRktBSVVJZ05GRFFBZ0FTQUROZ0lVSUFNZ0FUWUNHQXNnQWlBQVFRRnlOZ0lFSUFBZ0Ftb2dBRFlDQUNBQ1FZQWFLQUlBUncwQVFmUVpJQUEyQWdBUEN5QUFRZjhCVFFSQUlBQkJlSEZCbEJwcUlRRUNmMEhzR1NnQ0FDSURRUUVnQUVFRGRuUWlBSEZGQkVCQjdCa2dBQ0FEY2pZQ0FDQUJEQUVMSUFFb0FnZ0xJUUFnQVNBQ05nSUlJQUFnQWpZQ0RDQUNJQUUyQWd3Z0FpQUFOZ0lJRHd0Qkh5RURJQUJCLy8vL0IwMEVRQ0FBUVNZZ0FFRUlkbWNpQVd0MlFRRnhJQUZCQVhSclFUNXFJUU1MSUFJZ0F6WUNIQ0FDUWdBM0FoQWdBMEVDZEVHY0hHb2hBUUpBQWtBQ1FFSHdHU2dDQUNJRVFRRWdBM1FpQjNGRkJFQkI4QmtnQkNBSGNqWUNBQ0FCSUFJMkFnQWdBaUFCTmdJWURBRUxJQUJCR1NBRFFRRjJhMEVBSUFOQkgwY2JkQ0VESUFFb0FnQWhBUU5BSUFFaUJDZ0NCRUY0Y1NBQVJnMENJQU5CSFhZaEFTQURRUUYwSVFNZ0JDQUJRUVJ4YWlJSFFSQnFLQUlBSWdFTkFBc2dCeUFDTmdJUUlBSWdCRFlDR0FzZ0FpQUNOZ0lNSUFJZ0FqWUNDQXdCQ3lBRUtBSUlJZ0FnQWpZQ0RDQUVJQUkyQWdnZ0FrRUFOZ0lZSUFJZ0JEWUNEQ0FDSUFBMkFnZ0xRWXdhUVl3YUtBSUFRUUZySWdCQmZ5QUFHellDQUFzTGR3RUVmeUFBdkNJRVFmLy8vd054SVFFQ1FDQUVRUmQyUWY4QmNTSUNSUTBBSUFKQjhBQk5CRUFnQVVHQWdJQUVja0h4QUNBQ2EzWWhBUXdCQ3lBQ1FZMEJTd1JBUVlENEFTRURRUUFoQVF3QkN5QUNRUXAwUVlDQUIyc2hBd3NnQXlBRVFSQjJRWUNBQW5GeUlBRkJEWFp5UWYvL0EzRUxJd0VCZjBIY0dTZ0NBQ0lBQkVBRFFDQUFLQUlBRVFZQUlBQW9BZ1FpQUEwQUN3c0x2Z3NDQzM4SmZTTUFRYUFCYXlJTEpBQWdDMEV3YWtFa0VBOERRQ0FCSUExSEJFQWdBaUFOUVFOc0lneEJBbXBCQW5RaURtb3FBZ0FoRnlBQ0lBeEJBV3BCQW5RaUQyb3FBZ0FoR0NBSUlBeEJBblFpRUdvZ0FpQVFhaW9DQUNJWk9BSUFJQWdnRDJvZ0dEZ0NBQ0FJSUE1cUlCYzRBZ0FnQnlBTlFRVjBhaUlNSUJnNEFnUWdEQ0FaT0FJQUlBd2dGemdDQ0NBTVFRQTJBZ3dDUUNBQVJRUkFJQVlnRFdvdEFBQkZEUUVMSUF4QmdJQ0FDRFlDREFzZ0J5QU5RUVYwSWhGQkhISnFJQVVnRFVFQ2RDSU1RUUZ5SWhKcUxRQUFRUWgwSUFVZ0RHb3RBQUJ5SUFVZ0RFRUNjaUlUYWkwQUFFRVFkSElnQlNBTVFRTnlJZ3hxTFFBQVFSaDBjallDQUNBTElBTWdFa0VDZENJU2Fpb0NBQ0lYT0FLUUFTQUxJQU1nRTBFQ2RDSVRhaW9DQUNJWU9BS1VBU0FMSUFNZ0RFRUNkQ0lVYWlvQ0FDSVpPQUtZQVNBTElBTWdEVUVFZENJVmFpb0NBSXdpR2pnQ25BRWdDMEhnQUdvaURDQUxLZ0tZQVNJV1F3QUFBTUNVSUJhVUlBc3FBcFFCSWhaREFBQUF3SlFnRnBSREFBQ0FQNUtTT0FJQUlBd2dDeW9Da0FFaUZpQVdraUFMS2dLVUFaUWdDeW9DbUFGREFBQUF3SlFnQ3lvQ25BR1VramdDQkNBTUlBc3FBcEFCSWhZZ0ZwSWdDeW9DbUFHVUlBc3FBcFFCSWhZZ0ZwSWdDeW9DbkFHVWtqZ0NDQ0FNSUFzcUFwQUJJaFlnRnBJZ0N5b0NsQUdVSUFzcUFwZ0JJaFlnRnBJZ0N5b0NuQUdVa2pnQ0RDQU1JQXNxQXBnQkloWkRBQUFBd0pRZ0ZwUWdDeW9Da0FFaUZrTUFBQURBbENBV2xFTUFBSUEva3BJNEFoQWdEQ0FMS2dLVUFTSVdJQmFTSUFzcUFwZ0JsQ0FMS2dLUUFVTUFBQURBbENBTEtnS2NBWlNTT0FJVUlBd2dDeW9Da0FFaUZpQVdraUFMS2dLWUFaUWdDeW9DbEFGREFBQUF3SlFnQ3lvQ25BR1VramdDR0NBTUlBc3FBcFFCSWhZZ0ZwSWdDeW9DbUFHVUlBc3FBcEFCSWhZZ0ZwSWdDeW9DbkFHVWtqZ0NIQ0FNSUFzcUFwUUJJaFpEQUFBQXdKUWdGcFFnQ3lvQ2tBRWlGa01BQUFEQWxDQVdsRU1BQUlBL2twSTRBaUFnQ1NBVmFpQVhPQUlBSUFrZ0Vtb2dHRGdDQUNBSklCTnFJQms0QWdBZ0NTQVVhaUFhT0FJQUlBc2dCQ0FRYWlvQ0FDSVhPQUl3SUFzZ0JDQVBhaW9DQUNJWU9BSkFJQXNnQkNBT2Fpb0NBQ0laT0FKUUlBb2dFR29nRnpnQ0FDQUtJQTlxSUJnNEFnQWdDaUFPYWlBWk9BSUFJQXNnRENvQ0dDQUxLZ0k0bENBTUtnSUFJQXNxQWpDVUlBd3FBZ3dnQ3lvQ05KU1NramdDQUNBTElBd3FBaHdnQ3lvQ09KUWdEQ29DQkNBTEtnSXdsQ0FNS2dJUUlBc3FBalNVa3BJNEFnUWdDeUFNS2dJZ0lBc3FBamlVSUF3cUFnZ2dDeW9DTUpRZ0RDb0NGQ0FMS2dJMGxKS1NPQUlJSUFzZ0RDb0NHQ0FMS2dKRWxDQU1LZ0lBSUFzcUFqeVVJQXdxQWd3Z0N5b0NRSlNTa2pnQ0RDQUxJQXdxQWh3Z0N5b0NSSlFnRENvQ0JDQUxLZ0k4bENBTUtnSVFJQXNxQWtDVWtwSTRBaEFnQ3lBTUtnSWdJQXNxQWtTVUlBd3FBZ2dnQ3lvQ1BKUWdEQ29DRkNBTEtnSkFsSktTT0FJVUlBc2dEQ29DR0NBTEtnSlFsQ0FNS2dJQUlBc3FBa2lVSUF3cUFnd2dDeW9DVEpTU2tqZ0NHQ0FMSUF3cUFod2dDeW9DVUpRZ0RDb0NCQ0FMS2dKSWxDQU1LZ0lRSUFzcUFreVVrcEk0QWh3Z0N5QU1LZ0lnSUFzcUFsQ1VJQXdxQWdnZ0N5b0NTSlFnRENvQ0ZDQUxLZ0pNbEpLU09BSWdJQXNxQWlBaEZ5QUxLZ0lJSVJnZ0N5b0NGQ0VaSUFjZ0VVRVFjbW9nQ3lvQ0dDSWFJQnFVSUFzcUFnQWlGaUFXbENBTEtnSU1JaHNnRzVTU2trTUFBSUJBbENBYUlBc3FBaHdpSEpRZ0ZpQUxLZ0lFSWgyVUlCc2dDeW9DRUNJZWxKS1NRd0FBZ0VDVUVBdzJBZ0FnQnlBUlFSUnlhaUFhSUJlVUlCWWdHSlFnR3lBWmxKS1NRd0FBZ0VDVUlCd2dISlFnSFNBZGxDQWVJQjZVa3BKREFBQ0FRSlFRRERZQ0FDQUhJQkZCR0hKcUlCd2dGNVFnSFNBWWxDQWVJQm1Va3BKREFBQ0FRSlFnRnlBWGxDQVlJQmlVSUJrZ0daU1Nra01BQUlCQWxCQU1OZ0lBSUExQkFXb2hEUXdCQ3dzZ0MwR2dBV29rQUFzYUFDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFUQ3dzM0FDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFURHdzZ0FDZ0NDQ0lBSUFFZ0FpQURJQVFnQlNBQUtBSUFLQUlVRVFNQUM1RUJBQ0FBSUFFb0FnZ2dCQkFLQkVBZ0FTQUNJQU1RRWc4TEFrQWdBQ0FCS0FJQUlBUVFDa1VOQUFKQUlBSWdBU2dDRUVjRVFDQUJLQUlVSUFKSERRRUxJQU5CQVVjTkFTQUJRUUUyQWlBUEN5QUJJQUkyQWhRZ0FTQUROZ0lnSUFFZ0FTZ0NLRUVCYWpZQ0tBSkFJQUVvQWlSQkFVY05BQ0FCS0FJWVFRSkhEUUFnQVVFQk9nQTJDeUFCUVFRMkFpd0xDL0lCQUNBQUlBRW9BZ2dnQkJBS0JFQWdBU0FDSUFNUUVnOExBa0FnQUNBQktBSUFJQVFRQ2dSQUFrQWdBaUFCS0FJUVJ3UkFJQUVvQWhRZ0FrY05BUXNnQTBFQlJ3MENJQUZCQVRZQ0lBOExJQUVnQXpZQ0lBSkFJQUVvQWl4QkJFWU5BQ0FCUVFBN0FUUWdBQ2dDQ0NJQUlBRWdBaUFDUVFFZ0JDQUFLQUlBS0FJVUVRTUFJQUV0QURVRVFDQUJRUU0yQWl3Z0FTMEFORVVOQVF3REN5QUJRUVEyQWl3TElBRWdBallDRkNBQklBRW9BaWhCQVdvMkFpZ2dBU2dDSkVFQlJ3MEJJQUVvQWhoQkFrY05BU0FCUVFFNkFEWVBDeUFBS0FJSUlnQWdBU0FDSUFNZ0JDQUFLQUlBS0FJWUVRSUFDd3N4QUNBQUlBRW9BZ2hCQUJBS0JFQWdBU0FDSUFNUUZBOExJQUFvQWdnaUFDQUJJQUlnQXlBQUtBSUFLQUljRVFBQUN4Z0FJQUFnQVNnQ0NFRUFFQW9FUUNBQklBSWdBeEFVQ3d2SkF3RUZmeU1BUVVCcUlnUWtBQUovUVFFZ0FDQUJRUUFRQ2cwQUdrRUFJQUZGRFFBYUl3QkJRR29pQXlRQUlBRW9BZ0FpQlVFRWF5Z0NBQ0VHSUFWQkNHc29BZ0FoQlNBRFFnQTNBaUFnQTBJQU53SW9JQU5DQURjQ01DQURRZ0EzQURjZ0EwSUFOd0lZSUFOQkFEWUNGQ0FEUWZ3Vk5nSVFJQU1nQVRZQ0RDQURRYXdXTmdJSUlBRWdCV29oQVVFQUlRVUNRQ0FHUWF3V1FRQVFDZ1JBSUFOQkFUWUNPQ0FHSUFOQkNHb2dBU0FCUVFGQkFDQUdLQUlBS0FJVUVRTUFJQUZCQUNBREtBSWdRUUZHR3lFRkRBRUxJQVlnQTBFSWFpQUJRUUZCQUNBR0tBSUFLQUlZRVFJQUFrQUNRQ0FES0FJc0RnSUFBUUlMSUFNb0FoeEJBQ0FES0FJb1FRRkdHMEVBSUFNb0FpUkJBVVliUVFBZ0F5Z0NNRUVCUmhzaEJRd0JDeUFES0FJZ1FRRkhCRUFnQXlnQ01BMEJJQU1vQWlSQkFVY05BU0FES0FJb1FRRkhEUUVMSUFNb0FoZ2hCUXNnQTBGQWF5UUFRUUFnQlNJQlJRMEFHaUFFUVF4cVFUUVFEeUFFUVFFMkFqZ2dCRUYvTmdJVUlBUWdBRFlDRUNBRUlBRTJBZ2dnQVNBRVFRaHFJQUlvQWdCQkFTQUJLQUlBS0FJY0VRQUFJQVFvQWlBaUFFRUJSZ1JBSUFJZ0JDZ0NHRFlDQUFzZ0FFRUJSZ3NoQnlBRVFVQnJKQUFnQndzS0FDQUFJQUZCQUJBS0N3UUFJQUFMdlNjQkRIOGpBRUVRYXlJS0pBQUNRQUpBQWtBQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFJQUJCOUFGTkJFQkI3QmtvQWdBaUJrRVFJQUJCQzJwQmVIRWdBRUVMU1JzaUJVRURkaUlBZGlJQlFRTnhCRUFDUUNBQlFYOXpRUUZ4SUFCcUlnSkJBM1FpQVVHVUdtb2lBQ0FCUVp3YWFpZ0NBQ0lCS0FJSUlnUkdCRUJCN0JrZ0JrRitJQUozY1RZQ0FBd0JDeUFFSUFBMkFnd2dBQ0FFTmdJSUN5QUJRUWhxSVFBZ0FTQUNRUU4wSWdKQkEzSTJBZ1FnQVNBQ2FpSUJJQUVvQWdSQkFYSTJBZ1FNRHdzZ0JVSDBHU2dDQUNJSFRRMEJJQUVFUUFKQVFRSWdBSFFpQWtFQUlBSnJjaUFCSUFCMGNXZ2lBVUVEZENJQVFaUWFhaUlDSUFCQm5CcHFLQUlBSWdBb0FnZ2lCRVlFUUVIc0dTQUdRWDRnQVhkeElnWTJBZ0FNQVFzZ0JDQUNOZ0lNSUFJZ0JEWUNDQXNnQUNBRlFRTnlOZ0lFSUFBZ0JXb2lDQ0FCUVFOMElnRWdCV3NpQkVFQmNqWUNCQ0FBSUFGcUlBUTJBZ0FnQndSQUlBZEJlSEZCbEJwcUlRRkJnQm9vQWdBaEFnSi9JQVpCQVNBSFFRTjJkQ0lEY1VVRVFFSHNHU0FESUFaeU5nSUFJQUVNQVFzZ0FTZ0NDQXNoQXlBQklBSTJBZ2dnQXlBQ05nSU1JQUlnQVRZQ0RDQUNJQU0yQWdnTElBQkJDR29oQUVHQUdpQUlOZ0lBUWZRWklBUTJBZ0FNRHd0QjhCa29BZ0FpQzBVTkFTQUxhRUVDZEVHY0hHb29BZ0FpQWlnQ0JFRjRjU0FGYXlFRElBSWhBUU5BQWtBZ0FTZ0NFQ0lBUlFSQUlBRW9BaFFpQUVVTkFRc2dBQ2dDQkVGNGNTQUZheUlCSUFNZ0FTQURTU0lCR3lFRElBQWdBaUFCR3lFQ0lBQWhBUXdCQ3dzZ0FpZ0NHQ0VKSUFJZ0FpZ0NEQ0lFUndSQVFmd1pLQUlBR2lBQ0tBSUlJZ0FnQkRZQ0RDQUVJQUEyQWdnTURnc2dBa0VVYWlJQktBSUFJZ0JGQkVBZ0FpZ0NFQ0lBUlEwRElBSkJFR29oQVFzRFFDQUJJUWdnQUNJRVFSUnFJZ0VvQWdBaUFBMEFJQVJCRUdvaEFTQUVLQUlRSWdBTkFBc2dDRUVBTmdJQURBMExRWDhoQlNBQVFiOS9TdzBBSUFCQkMyb2lBRUY0Y1NFRlFmQVpLQUlBSWdoRkRRQkJBQ0FGYXlFREFrQUNRQUpBQW45QkFDQUZRWUFDU1EwQUdrRWZJQVZCLy8vL0Iwc05BQm9nQlVFbUlBQkJDSFpuSWdCcmRrRUJjU0FBUVFGMGEwRSthZ3NpQjBFQ2RFR2NIR29vQWdBaUFVVUVRRUVBSVFBTUFRdEJBQ0VBSUFWQkdTQUhRUUYyYTBFQUlBZEJIMGNiZENFQ0EwQUNRQ0FCS0FJRVFYaHhJQVZySWdZZ0EwOE5BQ0FCSVFRZ0JpSUREUUJCQUNFRElBRWhBQXdEQ3lBQUlBRW9BaFFpQmlBR0lBRWdBa0VkZGtFRWNXb29BaEFpQVVZYklBQWdCaHNoQUNBQ1FRRjBJUUlnQVEwQUN3c2dBQ0FFY2tVRVFFRUFJUVJCQWlBSGRDSUFRUUFnQUd0eUlBaHhJZ0JGRFFNZ0FHaEJBblJCbkJ4cUtBSUFJUUFMSUFCRkRRRUxBMEFnQUNnQ0JFRjRjU0FGYXlJQ0lBTkpJUUVnQWlBRElBRWJJUU1nQUNBRUlBRWJJUVFnQUNnQ0VDSUJCSDhnQVFVZ0FDZ0NGQXNpQUEwQUN3c2dCRVVOQUNBRFFmUVpLQUlBSUFWclR3MEFJQVFvQWhnaEJ5QUVJQVFvQWd3aUFrY0VRRUg4R1NnQ0FCb2dCQ2dDQ0NJQUlBSTJBZ3dnQWlBQU5nSUlEQXdMSUFSQkZHb2lBU2dDQUNJQVJRUkFJQVFvQWhBaUFFVU5BeUFFUVJCcUlRRUxBMEFnQVNFR0lBQWlBa0VVYWlJQktBSUFJZ0FOQUNBQ1FSQnFJUUVnQWlnQ0VDSUFEUUFMSUFaQkFEWUNBQXdMQ3lBRlFmUVpLQUlBSWdSTkJFQkJnQm9vQWdBaEFBSkFJQVFnQldzaUFVRVFUd1JBSUFBZ0JXb2lBaUFCUVFGeU5nSUVJQUFnQkdvZ0FUWUNBQ0FBSUFWQkEzSTJBZ1FNQVFzZ0FDQUVRUU55TmdJRUlBQWdCR29pQVNBQktBSUVRUUZ5TmdJRVFRQWhBa0VBSVFFTFFmUVpJQUUyQWdCQmdCb2dBallDQUNBQVFRaHFJUUFNRFFzZ0JVSDRHU2dDQUNJQ1NRUkFRZmdaSUFJZ0JXc2lBVFlDQUVHRUdrR0VHaWdDQUNJQUlBVnFJZ0kyQWdBZ0FpQUJRUUZ5TmdJRUlBQWdCVUVEY2pZQ0JDQUFRUWhxSVFBTURRdEJBQ0VBSUFWQkwyb2lBd0ovUWNRZEtBSUFCRUJCekIwb0FnQU1BUXRCMEIxQ2Z6Y0NBRUhJSFVLQW9JQ0FnSUFFTndJQVFjUWRJQXBCREdwQmNIRkIyS3JWcWdWek5nSUFRZGdkUVFBMkFnQkJxQjFCQURZQ0FFR0FJQXNpQVdvaUJrRUFJQUZySWdoeElnRWdCVTBOREVHa0hTZ0NBQ0lFQkVCQm5CMG9BZ0FpQnlBQmFpSUpJQWROSUFRZ0NVbHlEUTBMQWtCQnFCMHRBQUJCQkhGRkJFQUNRQUpBQWtBQ1FFR0VHaWdDQUNJRUJFQkJyQjBoQUFOQUlBUWdBQ2dDQUNJSFR3UkFJQWNnQUNnQ0JHb2dCRXNOQXdzZ0FDZ0NDQ0lBRFFBTEMwRUFFQXNpQWtGL1JnMERJQUVoQmtISUhTZ0NBQ0lBUVFGcklnUWdBbkVFUUNBQklBSnJJQUlnQkdwQkFDQUFhM0ZxSVFZTElBVWdCazhOQTBHa0hTZ0NBQ0lBQkVCQm5CMG9BZ0FpQkNBR2FpSUlJQVJOSUFBZ0NFbHlEUVFMSUFZUUN5SUFJQUpIRFFFTUJRc2dCaUFDYXlBSWNTSUdFQXNpQWlBQUtBSUFJQUFvQWdScVJnMEJJQUloQUFzZ0FFRi9SZzBCSUFWQk1Hb2dCazBFUUNBQUlRSU1CQXRCekIwb0FnQWlBaUFESUFacmFrRUFJQUpyY1NJQ0VBdEJmMFlOQVNBQ0lBWnFJUVlnQUNFQ0RBTUxJQUpCZjBjTkFndEJxQjFCcUIwb0FnQkJCSEkyQWdBTElBRVFDeUlDUVg5R1FRQVFDeUlBUVg5R2NpQUFJQUpOY2cwRklBQWdBbXNpQmlBRlFTaHFUUTBGQzBHY0hVR2NIU2dDQUNBR2FpSUFOZ0lBUWFBZEtBSUFJQUJKQkVCQm9CMGdBRFlDQUFzQ1FFR0VHaWdDQUNJREJFQkJyQjBoQUFOQUlBSWdBQ2dDQUNJQklBQW9BZ1FpQkdwR0RRSWdBQ2dDQ0NJQURRQUxEQVFMUWZ3WktBSUFJZ0JCQUNBQUlBSk5HMFVFUUVIOEdTQUNOZ0lBQzBFQUlRQkJzQjBnQmpZQ0FFR3NIU0FDTmdJQVFZd2FRWDgyQWdCQmtCcEJ4QjBvQWdBMkFnQkJ1QjFCQURZQ0FBTkFJQUJCQTNRaUFVR2NHbW9nQVVHVUdtb2lCRFlDQUNBQlFhQWFhaUFFTmdJQUlBQkJBV29pQUVFZ1J3MEFDMEg0R1NBR1FTaHJJZ0JCZUNBQ2EwRUhjU0lCYXlJRU5nSUFRWVFhSUFFZ0Ftb2lBVFlDQUNBQklBUkJBWEkyQWdRZ0FDQUNha0VvTmdJRVFZZ2FRZFFkS0FJQU5nSUFEQVFMSUFJZ0EwMGdBU0FEUzNJTkFpQUFLQUlNUVFoeERRSWdBQ0FFSUFacU5nSUVRWVFhSUFOQmVDQURhMEVIY1NJQWFpSUJOZ0lBUWZnWlFmZ1pLQUlBSUFacUlnSWdBR3NpQURZQ0FDQUJJQUJCQVhJMkFnUWdBaUFEYWtFb05nSUVRWWdhUWRRZEtBSUFOZ0lBREFNTFFRQWhCQXdLQzBFQUlRSU1DQXRCL0Jrb0FnQWdBa3NFUUVIOEdTQUNOZ0lBQ3lBQ0lBWnFJUUZCckIwaEFBSkFBa0FDUUFOQUlBRWdBQ2dDQUVjRVFDQUFLQUlJSWdBTkFRd0NDd3NnQUMwQURFRUljVVVOQVF0QnJCMGhBQU5BSUFNZ0FDZ0NBQ0lCVHdSQUlBRWdBQ2dDQkdvaUJDQURTdzBEQ3lBQUtBSUlJUUFNQUFzQUN5QUFJQUkyQWdBZ0FDQUFLQUlFSUFacU5nSUVJQUpCZUNBQ2EwRUhjV29pQnlBRlFRTnlOZ0lFSUFGQmVDQUJhMEVIY1dvaUJpQUZJQWRxSWdWcklRQWdBeUFHUmdSQVFZUWFJQVUyQWdCQitCbEIrQmtvQWdBZ0FHb2lBRFlDQUNBRklBQkJBWEkyQWdRTUNBdEJnQm9vQWdBZ0JrWUVRRUdBR2lBRk5nSUFRZlFaUWZRWktBSUFJQUJxSWdBMkFnQWdCU0FBUVFGeU5nSUVJQUFnQldvZ0FEWUNBQXdJQ3lBR0tBSUVJZ05CQTNGQkFVY05CaUFEUVhoeElRa2dBMEgvQVUwRVFDQUdLQUlNSWdFZ0JpZ0NDQ0lDUmdSQVFld1pRZXdaS0FJQVFYNGdBMEVEZG5keE5nSUFEQWNMSUFJZ0FUWUNEQ0FCSUFJMkFnZ01CZ3NnQmlnQ0dDRUlJQVlnQmlnQ0RDSUNSd1JBSUFZb0FnZ2lBU0FDTmdJTUlBSWdBVFlDQ0F3RkN5QUdRUlJxSWdFb0FnQWlBMFVFUUNBR0tBSVFJZ05GRFFRZ0JrRVFhaUVCQ3dOQUlBRWhCQ0FESWdKQkZHb2lBU2dDQUNJRERRQWdBa0VRYWlFQklBSW9BaEFpQXcwQUN5QUVRUUEyQWdBTUJBdEIrQmtnQmtFb2F5SUFRWGdnQW10QkIzRWlBV3NpQ0RZQ0FFR0VHaUFCSUFKcUlnRTJBZ0FnQVNBSVFRRnlOZ0lFSUFBZ0FtcEJLRFlDQkVHSUdrSFVIU2dDQURZQ0FDQURJQVJCSnlBRWEwRUhjV3BCTDJzaUFDQUFJQU5CRUdwSkd5SUJRUnMyQWdRZ0FVRzBIU2tDQURjQ0VDQUJRYXdkS1FJQU53SUlRYlFkSUFGQkNHbzJBZ0JCc0IwZ0JqWUNBRUdzSFNBQ05nSUFRYmdkUVFBMkFnQWdBVUVZYWlFQUEwQWdBRUVITmdJRUlBQkJDR29oRENBQVFRUnFJUUFnRENBRVNRMEFDeUFCSUFOR0RRQWdBU0FCS0FJRVFYNXhOZ0lFSUFNZ0FTQURheUlDUVFGeU5nSUVJQUVnQWpZQ0FDQUNRZjhCVFFSQUlBSkJlSEZCbEJwcUlRQUNmMEhzR1NnQ0FDSUJRUUVnQWtFRGRuUWlBbkZGQkVCQjdCa2dBU0FDY2pZQ0FDQUFEQUVMSUFBb0FnZ0xJUUVnQUNBRE5nSUlJQUVnQXpZQ0RDQURJQUEyQWd3Z0F5QUJOZ0lJREFFTFFSOGhBQ0FDUWYvLy93ZE5CRUFnQWtFbUlBSkJDSFpuSWdCcmRrRUJjU0FBUVFGMGEwRSthaUVBQ3lBRElBQTJBaHdnQTBJQU53SVFJQUJCQW5SQm5CeHFJUUVDUUFKQVFmQVpLQUlBSWdSQkFTQUFkQ0lHY1VVRVFFSHdHU0FFSUFaeU5nSUFJQUVnQXpZQ0FBd0JDeUFDUVJrZ0FFRUJkbXRCQUNBQVFSOUhHM1FoQUNBQktBSUFJUVFEUUNBRUlnRW9BZ1JCZUhFZ0FrWU5BaUFBUVIxMklRUWdBRUVCZENFQUlBRWdCRUVFY1dvaUJpZ0NFQ0lFRFFBTElBWWdBellDRUFzZ0F5QUJOZ0lZSUFNZ0F6WUNEQ0FESUFNMkFnZ01BUXNnQVNnQ0NDSUFJQU0yQWd3Z0FTQUROZ0lJSUFOQkFEWUNHQ0FESUFFMkFnd2dBeUFBTmdJSUMwSDRHU2dDQUNJQUlBVk5EUUJCK0JrZ0FDQUZheUlCTmdJQVFZUWFRWVFhS0FJQUlnQWdCV29pQWpZQ0FDQUNJQUZCQVhJMkFnUWdBQ0FGUVFOeU5nSUVJQUJCQ0dvaEFBd0lDMEhvR1VFd05nSUFRUUFoQUF3SEMwRUFJUUlMSUFoRkRRQUNRQ0FHS0FJY0lnRkJBblJCbkJ4cUlnUW9BZ0FnQmtZRVFDQUVJQUkyQWdBZ0FnMEJRZkFaUWZBWktBSUFRWDRnQVhkeE5nSUFEQUlMSUFoQkVFRVVJQWdvQWhBZ0JrWWJhaUFDTmdJQUlBSkZEUUVMSUFJZ0NEWUNHQ0FHS0FJUUlnRUVRQ0FDSUFFMkFoQWdBU0FDTmdJWUN5QUdLQUlVSWdGRkRRQWdBaUFCTmdJVUlBRWdBallDR0FzZ0FDQUphaUVBSUFZZ0NXb2lCaWdDQkNFREN5QUdJQU5CZm5FMkFnUWdCU0FBUVFGeU5nSUVJQUFnQldvZ0FEWUNBQ0FBUWY4QlRRUkFJQUJCZUhGQmxCcHFJUUVDZjBIc0dTZ0NBQ0lDUVFFZ0FFRURkblFpQUhGRkJFQkI3QmtnQUNBQ2NqWUNBQ0FCREFFTElBRW9BZ2dMSVFBZ0FTQUZOZ0lJSUFBZ0JUWUNEQ0FGSUFFMkFnd2dCU0FBTmdJSURBRUxRUjhoQXlBQVFmLy8vd2ROQkVBZ0FFRW1JQUJCQ0habklnRnJka0VCY1NBQlFRRjBhMEUrYWlFREN5QUZJQU0yQWh3Z0JVSUFOd0lRSUFOQkFuUkJuQnhxSVFFQ1FBSkFRZkFaS0FJQUlnSkJBU0FEZENJRWNVVUVRRUh3R1NBQ0lBUnlOZ0lBSUFFZ0JUWUNBQXdCQ3lBQVFSa2dBMEVCZG10QkFDQURRUjlIRzNRaEF5QUJLQUlBSVFJRFFDQUNJZ0VvQWdSQmVIRWdBRVlOQWlBRFFSMTJJUUlnQTBFQmRDRURJQUVnQWtFRWNXb2lCQ2dDRUNJQ0RRQUxJQVFnQlRZQ0VBc2dCU0FCTmdJWUlBVWdCVFlDRENBRklBVTJBZ2dNQVFzZ0FTZ0NDQ0lBSUFVMkFnd2dBU0FGTmdJSUlBVkJBRFlDR0NBRklBRTJBZ3dnQlNBQU5nSUlDeUFIUVFocUlRQU1BZ3NDUUNBSFJRMEFBa0FnQkNnQ0hDSUFRUUowUVp3Y2FpSUJLQUlBSUFSR0JFQWdBU0FDTmdJQUlBSU5BVUh3R1NBSVFYNGdBSGR4SWdnMkFnQU1BZ3NnQjBFUVFSUWdCeWdDRUNBRVJodHFJQUkyQWdBZ0FrVU5BUXNnQWlBSE5nSVlJQVFvQWhBaUFBUkFJQUlnQURZQ0VDQUFJQUkyQWhnTElBUW9BaFFpQUVVTkFDQUNJQUEyQWhRZ0FDQUNOZ0lZQ3dKQUlBTkJEMDBFUUNBRUlBTWdCV29pQUVFRGNqWUNCQ0FBSUFScUlnQWdBQ2dDQkVFQmNqWUNCQXdCQ3lBRUlBVkJBM0kyQWdRZ0JDQUZhaUlDSUFOQkFYSTJBZ1FnQWlBRGFpQUROZ0lBSUFOQi93Rk5CRUFnQTBGNGNVR1VHbW9oQUFKL1Fld1pLQUlBSWdGQkFTQURRUU4yZENJRGNVVUVRRUhzR1NBQklBTnlOZ0lBSUFBTUFRc2dBQ2dDQ0FzaEFTQUFJQUkyQWdnZ0FTQUNOZ0lNSUFJZ0FEWUNEQ0FDSUFFMkFnZ01BUXRCSHlFQUlBTkIvLy8vQjAwRVFDQURRU1lnQTBFSWRtY2lBR3QyUVFGeElBQkJBWFJyUVQ1cUlRQUxJQUlnQURZQ0hDQUNRZ0EzQWhBZ0FFRUNkRUdjSEdvaEFRSkFBa0FnQ0VFQklBQjBJZ1p4UlFSQVFmQVpJQVlnQ0hJMkFnQWdBU0FDTmdJQURBRUxJQU5CR1NBQVFRRjJhMEVBSUFCQkgwY2JkQ0VBSUFFb0FnQWhCUU5BSUFVaUFTZ0NCRUY0Y1NBRFJnMENJQUJCSFhZaEJpQUFRUUYwSVFBZ0FTQUdRUVJ4YWlJR0tBSVFJZ1VOQUFzZ0JpQUNOZ0lRQ3lBQ0lBRTJBaGdnQWlBQ05nSU1JQUlnQWpZQ0NBd0JDeUFCS0FJSUlnQWdBallDRENBQklBSTJBZ2dnQWtFQU5nSVlJQUlnQVRZQ0RDQUNJQUEyQWdnTElBUkJDR29oQUF3QkN3SkFJQWxGRFFBQ1FDQUNLQUljSWdCQkFuUkJuQnhxSWdFb0FnQWdBa1lFUUNBQklBUTJBZ0FnQkEwQlFmQVpJQXRCZmlBQWQzRTJBZ0FNQWdzZ0NVRVFRUlFnQ1NnQ0VDQUNSaHRxSUFRMkFnQWdCRVVOQVFzZ0JDQUpOZ0lZSUFJb0FoQWlBQVJBSUFRZ0FEWUNFQ0FBSUFRMkFoZ0xJQUlvQWhRaUFFVU5BQ0FFSUFBMkFoUWdBQ0FFTmdJWUN3SkFJQU5CRDAwRVFDQUNJQU1nQldvaUFFRURjallDQkNBQUlBSnFJZ0FnQUNnQ0JFRUJjallDQkF3QkN5QUNJQVZCQTNJMkFnUWdBaUFGYWlJRUlBTkJBWEkyQWdRZ0F5QUVhaUFETmdJQUlBY0VRQ0FIUVhoeFFaUWFhaUVBUVlBYUtBSUFJUUVDZjBFQklBZEJBM1owSWdVZ0JuRkZCRUJCN0JrZ0JTQUdjallDQUNBQURBRUxJQUFvQWdnTElRWWdBQ0FCTmdJSUlBWWdBVFlDRENBQklBQTJBZ3dnQVNBR05nSUlDMEdBR2lBRU5nSUFRZlFaSUFNMkFnQUxJQUpCQ0dvaEFBc2dDa0VRYWlRQUlBQUxDK2NSQWdCQmdBZ0wxaEYxYm5OcFoyNWxaQ0J6YUc5eWRBQjFibk5wWjI1bFpDQnBiblFBWm14dllYUUFkV2x1ZERZMFgzUUFkVzV6YVdkdVpXUWdZMmhoY2dCaWIyOXNBR1Z0YzJOeWFYQjBaVzQ2T25aaGJBQjFibk5wWjI1bFpDQnNiMjVuQUhOMFpEbzZkM04wY21sdVp3QnpkR1E2T25OMGNtbHVad0J6ZEdRNk9uVXhObk4wY21sdVp3QnpkR1E2T25Vek1uTjBjbWx1WndCa2IzVmliR1VBZG05cFpBQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4emFHOXlkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhkVzV6YVdkdVpXUWdjMmh2Y25RK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEdsdWRENEFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGRXNXphV2R1WldRZ2FXNTBQZ0JsYlhOamNtbHdkR1Z1T2pwdFpXMXZjbmxmZG1sbGR6eG1iRzloZEQ0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4ZFdsdWREaGZkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhhVzUwT0Y5MFBnQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4MWFXNTBNVFpmZEQ0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4YVc1ME1UWmZkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhkV2x1ZERZMFgzUStBR1Z0YzJOeWFYQjBaVzQ2T20xbGJXOXllVjkyYVdWM1BHbHVkRFkwWDNRK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEhWcGJuUXpNbDkwUGdCbGJYTmpjbWx3ZEdWdU9qcHRaVzF2Y25sZmRtbGxkenhwYm5Rek1sOTBQZ0JsYlhOamNtbHdkR1Z1T2pwdFpXMXZjbmxmZG1sbGR6eGphR0Z5UGdCbGJYTmpjbWx3ZEdWdU9qcHRaVzF2Y25sZmRtbGxkengxYm5OcFoyNWxaQ0JqYUdGeVBnQnpkR1E2T21KaGMybGpYM04wY21sdVp6eDFibk5wWjI1bFpDQmphR0Z5UGdCbGJYTmpjbWx3ZEdWdU9qcHRaVzF2Y25sZmRtbGxkenh6YVdkdVpXUWdZMmhoY2o0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4Ykc5dVp6NEFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGRXNXphV2R1WldRZ2JHOXVaejRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhaRzkxWW14bFBnQk9VM1F6WDE4eU1USmlZWE5wWTE5emRISnBibWRKWTA1VFh6RXhZMmhoY2w5MGNtRnBkSE5KWTBWRlRsTmZPV0ZzYkc5allYUnZja2xqUlVWRlJRQUFBQUJFREFBQVFnY0FBRTVUZEROZlh6SXhNbUpoYzJsalgzTjBjbWx1WjBsb1RsTmZNVEZqYUdGeVgzUnlZV2wwYzBsb1JVVk9VMTg1WVd4c2IyTmhkRzl5U1doRlJVVkZBQUJFREFBQWpBY0FBRTVUZEROZlh6SXhNbUpoYzJsalgzTjBjbWx1WjBsM1RsTmZNVEZqYUdGeVgzUnlZV2wwYzBsM1JVVk9VMTg1WVd4c2IyTmhkRzl5U1hkRlJVVkZBQUJFREFBQTFBY0FBRTVUZEROZlh6SXhNbUpoYzJsalgzTjBjbWx1WjBsRWMwNVRYekV4WTJoaGNsOTBjbUZwZEhOSlJITkZSVTVUWHpsaGJHeHZZMkYwYjNKSlJITkZSVVZGQUFBQVJBd0FBQndJQUFCT1UzUXpYMTh5TVRKaVlYTnBZMTl6ZEhKcGJtZEpSR2xPVTE4eE1XTm9ZWEpmZEhKaGFYUnpTVVJwUlVWT1UxODVZV3hzYjJOaGRHOXlTVVJwUlVWRlJRQUFBRVFNQUFCb0NBQUFUakV3WlcxelkzSnBjSFJsYmpOMllXeEZBQUJFREFBQXRBZ0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTV05GUlFBQVJBd0FBTkFJQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBsaFJVVUFBRVFNQUFENENBQUFUakV3WlcxelkzSnBjSFJsYmpFeGJXVnRiM0o1WDNacFpYZEphRVZGQUFCRURBQUFJQWtBQUU0eE1HVnRjMk55YVhCMFpXNHhNVzFsYlc5eWVWOTJhV1YzU1hORlJRQUFSQXdBQUVnSkFBQk9NVEJsYlhOamNtbHdkR1Z1TVRGdFpXMXZjbmxmZG1sbGQwbDBSVVVBQUVRTUFBQndDUUFBVGpFd1pXMXpZM0pwY0hSbGJqRXhiV1Z0YjNKNVgzWnBaWGRKYVVWRkFBQkVEQUFBbUFrQUFFNHhNR1Z0YzJOeWFYQjBaVzR4TVcxbGJXOXllVjkyYVdWM1NXcEZSUUFBUkF3QUFNQUpBQUJPTVRCbGJYTmpjbWx3ZEdWdU1URnRaVzF2Y25sZmRtbGxkMGxzUlVVQUFFUU1BQURvQ1FBQVRqRXdaVzF6WTNKcGNIUmxiakV4YldWdGIzSjVYM1pwWlhkSmJVVkZBQUJFREFBQUVBb0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTWGhGUlFBQVJBd0FBRGdLQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBsNVJVVUFBRVFNQUFCZ0NnQUFUakV3WlcxelkzSnBjSFJsYmpFeGJXVnRiM0o1WDNacFpYZEpaa1ZGQUFCRURBQUFpQW9BQUU0eE1HVnRjMk55YVhCMFpXNHhNVzFsYlc5eWVWOTJhV1YzU1dSRlJRQUFSQXdBQUxBS0FBQk9NVEJmWDJONGVHRmlhWFl4TVRaZlgzTm9hVzFmZEhsd1pWOXBibVp2UlFBQUFBQnNEQUFBMkFvQUFOQU1BQUJPTVRCZlgyTjRlR0ZpYVhZeE1UZGZYMk5zWVhOelgzUjVjR1ZmYVc1bWIwVUFBQUJzREFBQUNBc0FBUHdLQUFBQUFBQUFmQXNBQUFJQUFBQURBQUFBQkFBQUFBVUFBQUFHQUFBQVRqRXdYMTlqZUhoaFltbDJNVEl6WDE5bWRXNWtZVzFsYm5SaGJGOTBlWEJsWDJsdVptOUZBR3dNQUFCVUN3QUEvQW9BQUhZQUFBQkFDd0FBaUFzQUFHSUFBQUJBQ3dBQWxBc0FBR01BQUFCQUN3QUFvQXNBQUdnQUFBQkFDd0FBckFzQUFHRUFBQUJBQ3dBQXVBc0FBSE1BQUFCQUN3QUF4QXNBQUhRQUFBQkFDd0FBMEFzQUFHa0FBQUJBQ3dBQTNBc0FBR29BQUFCQUN3QUE2QXNBQUd3QUFBQkFDd0FBOUFzQUFHMEFBQUJBQ3dBQUFBd0FBSGdBQUFCQUN3QUFEQXdBQUhrQUFBQkFDd0FBR0F3QUFHWUFBQUJBQ3dBQUpBd0FBR1FBQUFCQUN3QUFNQXdBQUFBQUFBQXNDd0FBQWdBQUFBY0FBQUFFQUFBQUJRQUFBQWdBQUFBSkFBQUFDZ0FBQUFzQUFBQUFBQUFBdEF3QUFBSUFBQUFNQUFBQUJBQUFBQVVBQUFBSUFBQUFEUUFBQUE0QUFBQVBBQUFBVGpFd1gxOWplSGhoWW1sMk1USXdYMTl6YVY5amJHRnpjMTkwZVhCbFgybHVabTlGQUFBQUFHd01BQUNNREFBQUxBc0FBRk4wT1hSNWNHVmZhVzVtYndBQUFBQkVEQUFBd0F3QVFkZ1pDd1BnRGdFPSI7aWYoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpe3dhc21CaW5hcnlGaWxlPWxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpO31mdW5jdGlvbiBnZXRCaW5hcnlTeW5jKGZpbGUpe2lmKGZpbGU9PXdhc21CaW5hcnlGaWxlJiZ3YXNtQmluYXJ5KXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkod2FzbUJpbmFyeSl9dmFyIGJpbmFyeT10cnlQYXJzZUFzRGF0YVVSSShmaWxlKTtpZihiaW5hcnkpe3JldHVybiBiaW5hcnl9aWYocmVhZEJpbmFyeSl7cmV0dXJuIHJlYWRCaW5hcnkoZmlsZSl9dGhyb3cgImJvdGggYXN5bmMgYW5kIHN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkIn1mdW5jdGlvbiBnZXRCaW5hcnlQcm9taXNlKGJpbmFyeUZpbGUpe3JldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpPT5nZXRCaW5hcnlTeW5jKGJpbmFyeUZpbGUpKX1mdW5jdGlvbiBpbnN0YW50aWF0ZUFycmF5QnVmZmVyKGJpbmFyeUZpbGUsaW1wb3J0cyxyZWNlaXZlcil7cmV0dXJuIGdldEJpbmFyeVByb21pc2UoYmluYXJ5RmlsZSkudGhlbihiaW5hcnk9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJpbmFyeSxpbXBvcnRzKSkudGhlbihpbnN0YW5jZT0+aW5zdGFuY2UpLnRoZW4ocmVjZWl2ZXIscmVhc29uPT57ZXJyKGBmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiAke3JlYXNvbn1gKTthYm9ydChyZWFzb24pO30pfWZ1bmN0aW9uIGluc3RhbnRpYXRlQXN5bmMoYmluYXJ5LGJpbmFyeUZpbGUsaW1wb3J0cyxjYWxsYmFjayl7cmV0dXJuIGluc3RhbnRpYXRlQXJyYXlCdWZmZXIoYmluYXJ5RmlsZSxpbXBvcnRzLGNhbGxiYWNrKX1mdW5jdGlvbiBjcmVhdGVXYXNtKCl7dmFyIGluZm89eyJhIjp3YXNtSW1wb3J0c307ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLG1vZHVsZSl7d2FzbUV4cG9ydHM9aW5zdGFuY2UuZXhwb3J0czt3YXNtTWVtb3J5PXdhc21FeHBvcnRzWyJrIl07dXBkYXRlTWVtb3J5Vmlld3MoKTthZGRPbkluaXQod2FzbUV4cG9ydHNbImwiXSk7cmVtb3ZlUnVuRGVwZW5kZW5jeSgpO3JldHVybiB3YXNtRXhwb3J0c31hZGRSdW5EZXBlbmRlbmN5KCk7ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQocmVzdWx0KXtyZWNlaXZlSW5zdGFuY2UocmVzdWx0WyJpbnN0YW5jZSJdKTt9aWYoTW9kdWxlWyJpbnN0YW50aWF0ZVdhc20iXSl7dHJ5e3JldHVybiBNb2R1bGVbImluc3RhbnRpYXRlV2FzbSJdKGluZm8scmVjZWl2ZUluc3RhbmNlKX1jYXRjaChlKXtlcnIoYE1vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6ICR7ZX1gKTtyZWFkeVByb21pc2VSZWplY3QoZSk7fX1pbnN0YW50aWF0ZUFzeW5jKHdhc21CaW5hcnksd2FzbUJpbmFyeUZpbGUsaW5mbyxyZWNlaXZlSW5zdGFudGlhdGlvblJlc3VsdCkuY2F0Y2gocmVhZHlQcm9taXNlUmVqZWN0KTtyZXR1cm4ge319dmFyIGNhbGxSdW50aW1lQ2FsbGJhY2tzPWNhbGxiYWNrcz0+e3doaWxlKGNhbGxiYWNrcy5sZW5ndGg+MCl7Y2FsbGJhY2tzLnNoaWZ0KCkoTW9kdWxlKTt9fTtNb2R1bGVbIm5vRXhpdFJ1bnRpbWUiXXx8dHJ1ZTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfYmlnaW50PShwcmltaXRpdmVUeXBlLG5hbWUsc2l6ZSxtaW5SYW5nZSxtYXhSYW5nZSk9Pnt9O3ZhciBlbWJpbmRfaW5pdF9jaGFyQ29kZXM9KCk9Pnt2YXIgY29kZXM9bmV3IEFycmF5KDI1Nik7Zm9yKHZhciBpPTA7aTwyNTY7KytpKXtjb2Rlc1tpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpO31lbWJpbmRfY2hhckNvZGVzPWNvZGVzO307dmFyIGVtYmluZF9jaGFyQ29kZXM7dmFyIHJlYWRMYXRpbjFTdHJpbmc9cHRyPT57dmFyIHJldD0iIjt2YXIgYz1wdHI7d2hpbGUoSEVBUFU4W2NdKXtyZXQrPWVtYmluZF9jaGFyQ29kZXNbSEVBUFU4W2MrK11dO31yZXR1cm4gcmV0fTt2YXIgYXdhaXRpbmdEZXBlbmRlbmNpZXM9e307dmFyIHJlZ2lzdGVyZWRUeXBlcz17fTt2YXIgQmluZGluZ0Vycm9yO3ZhciB0aHJvd0JpbmRpbmdFcnJvcj1tZXNzYWdlPT57dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihtZXNzYWdlKX07ZnVuY3Rpb24gc2hhcmVkUmVnaXN0ZXJUeXBlKHJhd1R5cGUscmVnaXN0ZXJlZEluc3RhbmNlLG9wdGlvbnM9e30pe3ZhciBuYW1lPXJlZ2lzdGVyZWRJbnN0YW5jZS5uYW1lO2lmKCFyYXdUeXBlKXt0aHJvd0JpbmRpbmdFcnJvcihgdHlwZSAiJHtuYW1lfSIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcmApO31pZihyZWdpc3RlcmVkVHlwZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe2lmKG9wdGlvbnMuaWdub3JlRHVwbGljYXRlUmVnaXN0cmF0aW9ucyl7cmV0dXJufWVsc2Uge3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnJHtuYW1lfScgdHdpY2VgKTt9fXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXT1yZWdpc3RlcmVkSW5zdGFuY2U7aWYoYXdhaXRpbmdEZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe3ZhciBjYWxsYmFja3M9YXdhaXRpbmdEZXBlbmRlbmNpZXNbcmF3VHlwZV07ZGVsZXRlIGF3YWl0aW5nRGVwZW5kZW5jaWVzW3Jhd1R5cGVdO2NhbGxiYWNrcy5mb3JFYWNoKGNiPT5jYigpKTt9fWZ1bmN0aW9uIHJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zPXt9KXtpZighKCJhcmdQYWNrQWR2YW5jZSJpbiByZWdpc3RlcmVkSW5zdGFuY2UpKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlIil9cmV0dXJuIHNoYXJlZFJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zKX12YXIgR2VuZXJpY1dpcmVUeXBlU2l6ZT04O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9ib29sPShyYXdUeXBlLG5hbWUsdHJ1ZVZhbHVlLGZhbHNlVmFsdWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24od3Qpe3JldHVybiAhIXd0fSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIG8/dHJ1ZVZhbHVlOmZhbHNlVmFsdWV9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVThbcG9pbnRlcl0pfSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307ZnVuY3Rpb24gaGFuZGxlQWxsb2NhdG9ySW5pdCgpe09iamVjdC5hc3NpZ24oSGFuZGxlQWxsb2NhdG9yLnByb3RvdHlwZSx7Z2V0KGlkKXtyZXR1cm4gdGhpcy5hbGxvY2F0ZWRbaWRdfSxoYXMoaWQpe3JldHVybiB0aGlzLmFsbG9jYXRlZFtpZF0hPT11bmRlZmluZWR9LGFsbG9jYXRlKGhhbmRsZSl7dmFyIGlkPXRoaXMuZnJlZWxpc3QucG9wKCl8fHRoaXMuYWxsb2NhdGVkLmxlbmd0aDt0aGlzLmFsbG9jYXRlZFtpZF09aGFuZGxlO3JldHVybiBpZH0sZnJlZShpZCl7dGhpcy5hbGxvY2F0ZWRbaWRdPXVuZGVmaW5lZDt0aGlzLmZyZWVsaXN0LnB1c2goaWQpO319KTt9ZnVuY3Rpb24gSGFuZGxlQWxsb2NhdG9yKCl7dGhpcy5hbGxvY2F0ZWQ9W3VuZGVmaW5lZF07dGhpcy5mcmVlbGlzdD1bXTt9dmFyIGVtdmFsX2hhbmRsZXM9bmV3IEhhbmRsZUFsbG9jYXRvcjt2YXIgX19lbXZhbF9kZWNyZWY9aGFuZGxlPT57aWYoaGFuZGxlPj1lbXZhbF9oYW5kbGVzLnJlc2VydmVkJiYwPT09LS1lbXZhbF9oYW5kbGVzLmdldChoYW5kbGUpLnJlZmNvdW50KXtlbXZhbF9oYW5kbGVzLmZyZWUoaGFuZGxlKTt9fTt2YXIgY291bnRfZW12YWxfaGFuZGxlcz0oKT0+e3ZhciBjb3VudD0wO2Zvcih2YXIgaT1lbXZhbF9oYW5kbGVzLnJlc2VydmVkO2k8ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoOysraSl7aWYoZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWRbaV0hPT11bmRlZmluZWQpeysrY291bnQ7fX1yZXR1cm4gY291bnR9O3ZhciBpbml0X2VtdmFsPSgpPT57ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQucHVzaCh7dmFsdWU6dW5kZWZpbmVkfSx7dmFsdWU6bnVsbH0se3ZhbHVlOnRydWV9LHt2YWx1ZTpmYWxzZX0pO2VtdmFsX2hhbmRsZXMucmVzZXJ2ZWQ9ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoO01vZHVsZVsiY291bnRfZW12YWxfaGFuZGxlcyJdPWNvdW50X2VtdmFsX2hhbmRsZXM7fTt2YXIgRW12YWw9e3RvVmFsdWU6aGFuZGxlPT57aWYoIWhhbmRsZSl7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9ICIraGFuZGxlKTt9cmV0dXJuIGVtdmFsX2hhbmRsZXMuZ2V0KGhhbmRsZSkudmFsdWV9LHRvSGFuZGxlOnZhbHVlPT57c3dpdGNoKHZhbHVlKXtjYXNlIHVuZGVmaW5lZDpyZXR1cm4gMTtjYXNlIG51bGw6cmV0dXJuIDI7Y2FzZSB0cnVlOnJldHVybiAzO2Nhc2UgZmFsc2U6cmV0dXJuIDQ7ZGVmYXVsdDp7cmV0dXJuIGVtdmFsX2hhbmRsZXMuYWxsb2NhdGUoe3JlZmNvdW50OjEsdmFsdWU6dmFsdWV9KX19fX07ZnVuY3Rpb24gc2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKEhFQVAzMltwb2ludGVyPj4yXSl9dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX2VtdmFsPShyYXdUeXBlLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6aGFuZGxlPT57dmFyIHJ2PUVtdmFsLnRvVmFsdWUoaGFuZGxlKTtfX2VtdmFsX2RlY3JlZihoYW5kbGUpO3JldHVybiBydn0sInRvV2lyZVR5cGUiOihkZXN0cnVjdG9ycyx2YWx1ZSk9PkVtdmFsLnRvSGFuZGxlKHZhbHVlKSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307dmFyIGZsb2F0UmVhZFZhbHVlRnJvbVBvaW50ZXI9KG5hbWUsd2lkdGgpPT57c3dpdGNoKHdpZHRoKXtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQRjMyW3BvaW50ZXI+PjJdKX07Y2FzZSA4OnJldHVybiBmdW5jdGlvbihwb2ludGVyKXtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oSEVBUEY2NFtwb2ludGVyPj4zXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmbG9hdCB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfZmxvYXQ9KHJhd1R5cGUsbmFtZSxzaXplKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT52YWx1ZSwidG9XaXJlVHlwZSI6KGRlc3RydWN0b3JzLHZhbHVlKT0+dmFsdWUsImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6ZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNpemUpLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSk7fTt2YXIgaW50ZWdlclJlYWRWYWx1ZUZyb21Qb2ludGVyPShuYW1lLHdpZHRoLHNpZ25lZCk9Pntzd2l0Y2god2lkdGgpe2Nhc2UgMTpyZXR1cm4gc2lnbmVkP3BvaW50ZXI9PkhFQVA4W3BvaW50ZXI+PjBdOnBvaW50ZXI9PkhFQVBVOFtwb2ludGVyPj4wXTtjYXNlIDI6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMTZbcG9pbnRlcj4+MV06cG9pbnRlcj0+SEVBUFUxNltwb2ludGVyPj4xXTtjYXNlIDQ6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMzJbcG9pbnRlcj4+Ml06cG9pbnRlcj0+SEVBUFUzMltwb2ludGVyPj4yXTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgaW50ZWdlciB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcj0ocHJpbWl0aXZlVHlwZSxuYW1lLHNpemUsbWluUmFuZ2UsbWF4UmFuZ2UpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlO2lmKG1pblJhbmdlPT09MCl7dmFyIGJpdHNoaWZ0PTMyLTgqc2l6ZTtmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlPDxiaXRzaGlmdD4+PmJpdHNoaWZ0O312YXIgaXNVbnNpZ25lZFR5cGU9bmFtZS5pbmNsdWRlcygidW5zaWduZWQiKTt2YXIgY2hlY2tBc3NlcnRpb25zPSh2YWx1ZSx0b1R5cGVOYW1lKT0+e307dmFyIHRvV2lyZVR5cGU7aWYoaXNVbnNpZ25lZFR5cGUpe3RvV2lyZVR5cGU9ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2NoZWNrQXNzZXJ0aW9ucyh2YWx1ZSx0aGlzLm5hbWUpO3JldHVybiB2YWx1ZT4+PjB9O31lbHNlIHt0b1dpcmVUeXBlPWZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtjaGVja0Fzc2VydGlvbnModmFsdWUsdGhpcy5uYW1lKTtyZXR1cm4gdmFsdWV9O31yZWdpc3RlclR5cGUocHJpbWl0aXZlVHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZyb21XaXJlVHlwZSwidG9XaXJlVHlwZSI6dG9XaXJlVHlwZSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjppbnRlZ2VyUmVhZFZhbHVlRnJvbVBvaW50ZXIobmFtZSxzaXplLG1pblJhbmdlIT09MCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KTt9O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldz0ocmF3VHlwZSxkYXRhVHlwZUluZGV4LG5hbWUpPT57dmFyIHR5cGVNYXBwaW5nPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheV07dmFyIFRBPXR5cGVNYXBwaW5nW2RhdGFUeXBlSW5kZXhdO2Z1bmN0aW9uIGRlY29kZU1lbW9yeVZpZXcoaGFuZGxlKXt2YXIgc2l6ZT1IRUFQVTMyW2hhbmRsZT4+Ml07dmFyIGRhdGE9SEVBUFUzMltoYW5kbGUrND4+Ml07cmV0dXJuIG5ldyBUQShIRUFQOC5idWZmZXIsZGF0YSxzaXplKX1uYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpkZWNvZGVNZW1vcnlWaWV3LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmRlY29kZU1lbW9yeVZpZXd9LHtpZ25vcmVEdXBsaWNhdGVSZWdpc3RyYXRpb25zOnRydWV9KTt9O2Z1bmN0aW9uIHJlYWRQb2ludGVyKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVTMyW3BvaW50ZXI+PjJdKX12YXIgc3RyaW5nVG9VVEY4QXJyYXk9KHN0cixoZWFwLG91dElkeCxtYXhCeXRlc1RvV3JpdGUpPT57aWYoIShtYXhCeXRlc1RvV3JpdGU+MCkpcmV0dXJuIDA7dmFyIHN0YXJ0SWR4PW91dElkeDt2YXIgZW5kSWR4PW91dElkeCttYXhCeXRlc1RvV3JpdGUtMTtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgdT1zdHIuY2hhckNvZGVBdChpKTtpZih1Pj01NTI5NiYmdTw9NTczNDMpe3ZhciB1MT1zdHIuY2hhckNvZGVBdCgrK2kpO3U9NjU1MzYrKCh1JjEwMjMpPDwxMCl8dTEmMTAyMzt9aWYodTw9MTI3KXtpZihvdXRJZHg+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT11O31lbHNlIGlmKHU8PTIwNDcpe2lmKG91dElkeCsxPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MTkyfHU+PjY7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fWVsc2UgaWYodTw9NjU1MzUpe2lmKG91dElkeCsyPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MjI0fHU+PjEyO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzO31lbHNlIHtpZihvdXRJZHgrMz49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPTI0MHx1Pj4xODtoZWFwW291dElkeCsrXT0xMjh8dT4+MTImNjM7aGVhcFtvdXRJZHgrK109MTI4fHU+PjYmNjM7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fX1oZWFwW291dElkeF09MDtyZXR1cm4gb3V0SWR4LXN0YXJ0SWR4fTt2YXIgc3RyaW5nVG9VVEY4PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PnN0cmluZ1RvVVRGOEFycmF5KHN0cixIRUFQVTgsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk7dmFyIGxlbmd0aEJ5dGVzVVRGOD1zdHI9Pnt2YXIgbGVuPTA7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGM9c3RyLmNoYXJDb2RlQXQoaSk7aWYoYzw9MTI3KXtsZW4rKzt9ZWxzZSBpZihjPD0yMDQ3KXtsZW4rPTI7fWVsc2UgaWYoYz49NTUyOTYmJmM8PTU3MzQzKXtsZW4rPTQ7KytpO31lbHNlIHtsZW4rPTM7fX1yZXR1cm4gbGVufTt2YXIgVVRGOERlY29kZXI9dHlwZW9mIFRleHREZWNvZGVyIT0idW5kZWZpbmVkIj9uZXcgVGV4dERlY29kZXIoInV0ZjgiKTp1bmRlZmluZWQ7dmFyIFVURjhBcnJheVRvU3RyaW5nPShoZWFwT3JBcnJheSxpZHgsbWF4Qnl0ZXNUb1JlYWQpPT57dmFyIGVuZElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQ7dmFyIGVuZFB0cj1pZHg7d2hpbGUoaGVhcE9yQXJyYXlbZW5kUHRyXSYmIShlbmRQdHI+PWVuZElkeCkpKytlbmRQdHI7aWYoZW5kUHRyLWlkeD4xNiYmaGVhcE9yQXJyYXkuYnVmZmVyJiZVVEY4RGVjb2Rlcil7cmV0dXJuIFVURjhEZWNvZGVyLmRlY29kZShoZWFwT3JBcnJheS5zdWJhcnJheShpZHgsZW5kUHRyKSl9dmFyIHN0cj0iIjt3aGlsZShpZHg8ZW5kUHRyKXt2YXIgdTA9aGVhcE9yQXJyYXlbaWR4KytdO2lmKCEodTAmMTI4KSl7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHUwKTtjb250aW51ZX12YXIgdTE9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyMjQpPT0xOTIpe3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgodTAmMzEpPDw2fHUxKTtjb250aW51ZX12YXIgdTI9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyNDApPT0yMjQpe3UwPSh1MCYxNSk8PDEyfHUxPDw2fHUyO31lbHNlIHt1MD0odTAmNyk8PDE4fHUxPDwxMnx1Mjw8NnxoZWFwT3JBcnJheVtpZHgrK10mNjM7fWlmKHUwPDY1NTM2KXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodTApO31lbHNlIHt2YXIgY2g9dTAtNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9fXJldHVybiBzdHJ9O3ZhciBVVEY4VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9PnB0cj9VVEY4QXJyYXlUb1N0cmluZyhIRUFQVTgscHRyLG1heEJ5dGVzVG9SZWFkKToiIjt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZz0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTt2YXIgc3RkU3RyaW5nSXNVVEY4PW5hbWU9PT0ic3RkOjpzdHJpbmciO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSIodmFsdWUpe3ZhciBsZW5ndGg9SEVBUFUzMlt2YWx1ZT4+Ml07dmFyIHBheWxvYWQ9dmFsdWUrNDt2YXIgc3RyO2lmKHN0ZFN0cmluZ0lzVVRGOCl7dmFyIGRlY29kZVN0YXJ0UHRyPXBheWxvYWQ7Zm9yKHZhciBpPTA7aTw9bGVuZ3RoOysraSl7dmFyIGN1cnJlbnRCeXRlUHRyPXBheWxvYWQraTtpZihpPT1sZW5ndGh8fEhFQVBVOFtjdXJyZW50Qnl0ZVB0cl09PTApe3ZhciBtYXhSZWFkPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PVVURjhUb1N0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkKTtpZihzdHI9PT11bmRlZmluZWQpe3N0cj1zdHJpbmdTZWdtZW50O31lbHNlIHtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCk7c3RyKz1zdHJpbmdTZWdtZW50O31kZWNvZGVTdGFydFB0cj1jdXJyZW50Qnl0ZVB0cisxO319fWVsc2Uge3ZhciBhPW5ldyBBcnJheShsZW5ndGgpO2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7YVtpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKEhFQVBVOFtwYXlsb2FkK2ldKTt9c3RyPWEuam9pbigiIik7fV9mcmVlKHZhbHVlKTtyZXR1cm4gc3RyfSwidG9XaXJlVHlwZSIoZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpe3ZhbHVlPW5ldyBVaW50OEFycmF5KHZhbHVlKTt9dmFyIGxlbmd0aDt2YXIgdmFsdWVJc09mVHlwZVN0cmluZz10eXBlb2YgdmFsdWU9PSJzdHJpbmciO2lmKCEodmFsdWVJc09mVHlwZVN0cmluZ3x8dmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIEludDhBcnJheSkpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIHN0ZDo6c3RyaW5nIik7fWlmKHN0ZFN0cmluZ0lzVVRGOCYmdmFsdWVJc09mVHlwZVN0cmluZyl7bGVuZ3RoPWxlbmd0aEJ5dGVzVVRGOCh2YWx1ZSk7fWVsc2Uge2xlbmd0aD12YWx1ZS5sZW5ndGg7fXZhciBiYXNlPV9tYWxsb2MoNCtsZW5ndGgrMSk7dmFyIHB0cj1iYXNlKzQ7SEVBUFUzMltiYXNlPj4yXT1sZW5ndGg7aWYoc3RkU3RyaW5nSXNVVEY4JiZ2YWx1ZUlzT2ZUeXBlU3RyaW5nKXtzdHJpbmdUb1VURjgodmFsdWUscHRyLGxlbmd0aCsxKTt9ZWxzZSB7aWYodmFsdWVJc09mVHlwZVN0cmluZyl7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXt2YXIgY2hhckNvZGU9dmFsdWUuY2hhckNvZGVBdChpKTtpZihjaGFyQ29kZT4yNTUpe19mcmVlKHB0cik7dGhyb3dCaW5kaW5nRXJyb3IoIlN0cmluZyBoYXMgVVRGLTE2IGNvZGUgdW5pdHMgdGhhdCBkbyBub3QgZml0IGluIDggYml0cyIpO31IRUFQVThbcHRyK2ldPWNoYXJDb2RlO319ZWxzZSB7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXtIRUFQVThbcHRyK2ldPXZhbHVlW2ldO319fWlmKGRlc3RydWN0b3JzIT09bnVsbCl7ZGVzdHJ1Y3RvcnMucHVzaChfZnJlZSxiYXNlKTt9cmV0dXJuIGJhc2V9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOnJlYWRQb2ludGVyLGRlc3RydWN0b3JGdW5jdGlvbihwdHIpe19mcmVlKHB0cik7fX0pO307dmFyIFVURjE2RGVjb2Rlcj10eXBlb2YgVGV4dERlY29kZXIhPSJ1bmRlZmluZWQiP25ldyBUZXh0RGVjb2RlcigidXRmLTE2bGUiKTp1bmRlZmluZWQ7dmFyIFVURjE2VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgZW5kUHRyPXB0cjt2YXIgaWR4PWVuZFB0cj4+MTt2YXIgbWF4SWR4PWlkeCttYXhCeXRlc1RvUmVhZC8yO3doaWxlKCEoaWR4Pj1tYXhJZHgpJiZIRUFQVTE2W2lkeF0pKytpZHg7ZW5kUHRyPWlkeDw8MTtpZihlbmRQdHItcHRyPjMyJiZVVEYxNkRlY29kZXIpcmV0dXJuIFVURjE2RGVjb2Rlci5kZWNvZGUoSEVBUFU4LnN1YmFycmF5KHB0cixlbmRQdHIpKTt2YXIgc3RyPSIiO2Zvcih2YXIgaT0wOyEoaT49bWF4Qnl0ZXNUb1JlYWQvMik7KytpKXt2YXIgY29kZVVuaXQ9SEVBUDE2W3B0citpKjI+PjFdO2lmKGNvZGVVbml0PT0wKWJyZWFrO3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZShjb2RlVW5pdCk7fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjE2PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8MilyZXR1cm4gMDttYXhCeXRlc1RvV3JpdGUtPTI7dmFyIHN0YXJ0UHRyPW91dFB0cjt2YXIgbnVtQ2hhcnNUb1dyaXRlPW1heEJ5dGVzVG9Xcml0ZTxzdHIubGVuZ3RoKjI/bWF4Qnl0ZXNUb1dyaXRlLzI6c3RyLmxlbmd0aDtmb3IodmFyIGk9MDtpPG51bUNoYXJzVG9Xcml0ZTsrK2kpe3ZhciBjb2RlVW5pdD1zdHIuY2hhckNvZGVBdChpKTtIRUFQMTZbb3V0UHRyPj4xXT1jb2RlVW5pdDtvdXRQdHIrPTI7fUhFQVAxNltvdXRQdHI+PjFdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn07dmFyIGxlbmd0aEJ5dGVzVVRGMTY9c3RyPT5zdHIubGVuZ3RoKjI7dmFyIFVURjMyVG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgaT0wO3ZhciBzdHI9IiI7d2hpbGUoIShpPj1tYXhCeXRlc1RvUmVhZC80KSl7dmFyIHV0ZjMyPUhFQVAzMltwdHIraSo0Pj4yXTtpZih1dGYzMj09MClicmVhazsrK2k7aWYodXRmMzI+PTY1NTM2KXt2YXIgY2g9dXRmMzItNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9ZWxzZSB7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHV0ZjMyKTt9fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjMyPShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8NClyZXR1cm4gMDt2YXIgc3RhcnRQdHI9b3V0UHRyO3ZhciBlbmRQdHI9c3RhcnRQdHIrbWF4Qnl0ZXNUb1dyaXRlLTQ7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGNvZGVVbml0PXN0ci5jaGFyQ29kZUF0KGkpO2lmKGNvZGVVbml0Pj01NTI5NiYmY29kZVVuaXQ8PTU3MzQzKXt2YXIgdHJhaWxTdXJyb2dhdGU9c3RyLmNoYXJDb2RlQXQoKytpKTtjb2RlVW5pdD02NTUzNisoKGNvZGVVbml0JjEwMjMpPDwxMCl8dHJhaWxTdXJyb2dhdGUmMTAyMzt9SEVBUDMyW291dFB0cj4+Ml09Y29kZVVuaXQ7b3V0UHRyKz00O2lmKG91dFB0cis0PmVuZFB0cilicmVha31IRUFQMzJbb3V0UHRyPj4yXT0wO3JldHVybiBvdXRQdHItc3RhcnRQdHJ9O3ZhciBsZW5ndGhCeXRlc1VURjMyPXN0cj0+e3ZhciBsZW49MDtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7aWYoY29kZVVuaXQ+PTU1Mjk2JiZjb2RlVW5pdDw9NTczNDMpKytpO2xlbis9NDt9cmV0dXJuIGxlbn07dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nPShyYXdUeXBlLGNoYXJTaXplLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBkZWNvZGVTdHJpbmcsZW5jb2RlU3RyaW5nLGdldEhlYXAsbGVuZ3RoQnl0ZXNVVEYsc2hpZnQ7aWYoY2hhclNpemU9PT0yKXtkZWNvZGVTdHJpbmc9VVRGMTZUb1N0cmluZztlbmNvZGVTdHJpbmc9c3RyaW5nVG9VVEYxNjtsZW5ndGhCeXRlc1VURj1sZW5ndGhCeXRlc1VURjE2O2dldEhlYXA9KCk9PkhFQVBVMTY7c2hpZnQ9MTt9ZWxzZSBpZihjaGFyU2l6ZT09PTQpe2RlY29kZVN0cmluZz1VVEYzMlRvU3RyaW5nO2VuY29kZVN0cmluZz1zdHJpbmdUb1VURjMyO2xlbmd0aEJ5dGVzVVRGPWxlbmd0aEJ5dGVzVVRGMzI7Z2V0SGVhcD0oKT0+SEVBUFUzMjtzaGlmdD0yO31yZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT57dmFyIGxlbmd0aD1IRUFQVTMyW3ZhbHVlPj4yXTt2YXIgSEVBUD1nZXRIZWFwKCk7dmFyIHN0cjt2YXIgZGVjb2RlU3RhcnRQdHI9dmFsdWUrNDtmb3IodmFyIGk9MDtpPD1sZW5ndGg7KytpKXt2YXIgY3VycmVudEJ5dGVQdHI9dmFsdWUrNCtpKmNoYXJTaXplO2lmKGk9PWxlbmd0aHx8SEVBUFtjdXJyZW50Qnl0ZVB0cj4+c2hpZnRdPT0wKXt2YXIgbWF4UmVhZEJ5dGVzPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PWRlY29kZVN0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkQnl0ZXMpO2lmKHN0cj09PXVuZGVmaW5lZCl7c3RyPXN0cmluZ1NlZ21lbnQ7fWVsc2Uge3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKTtzdHIrPXN0cmluZ1NlZ21lbnQ7fWRlY29kZVN0YXJ0UHRyPWN1cnJlbnRCeXRlUHRyK2NoYXJTaXplO319X2ZyZWUodmFsdWUpO3JldHVybiBzdHJ9LCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsdmFsdWUpPT57aWYoISh0eXBlb2YgdmFsdWU9PSJzdHJpbmciKSl7dGhyb3dCaW5kaW5nRXJyb3IoYENhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICR7bmFtZX1gKTt9dmFyIGxlbmd0aD1sZW5ndGhCeXRlc1VURih2YWx1ZSk7dmFyIHB0cj1fbWFsbG9jKDQrbGVuZ3RoK2NoYXJTaXplKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoPj5zaGlmdDtlbmNvZGVTdHJpbmcodmFsdWUscHRyKzQsbGVuZ3RoK2NoYXJTaXplKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKTt9cmV0dXJuIHB0cn0sImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIsZGVzdHJ1Y3RvckZ1bmN0aW9uKHB0cil7X2ZyZWUocHRyKTt9fSk7fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfdm9pZD0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7aXNWb2lkOnRydWUsbmFtZTpuYW1lLCJhcmdQYWNrQWR2YW5jZSI6MCwiZnJvbVdpcmVUeXBlIjooKT0+dW5kZWZpbmVkLCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsbyk9PnVuZGVmaW5lZH0pO307dmFyIGdldEhlYXBNYXg9KCk9PjIxNDc0ODM2NDg7dmFyIGdyb3dNZW1vcnk9c2l6ZT0+e3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO3ZhciBwYWdlcz0oc2l6ZS1iLmJ5dGVMZW5ndGgrNjU1MzUpLzY1NTM2O3RyeXt3YXNtTWVtb3J5Lmdyb3cocGFnZXMpO3VwZGF0ZU1lbW9yeVZpZXdzKCk7cmV0dXJuIDF9Y2F0Y2goZSl7fX07dmFyIF9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwPXJlcXVlc3RlZFNpemU9Pnt2YXIgb2xkU2l6ZT1IRUFQVTgubGVuZ3RoO3JlcXVlc3RlZFNpemU+Pj49MDt2YXIgbWF4SGVhcFNpemU9Z2V0SGVhcE1heCgpO2lmKHJlcXVlc3RlZFNpemU+bWF4SGVhcFNpemUpe3JldHVybiBmYWxzZX12YXIgYWxpZ25VcD0oeCxtdWx0aXBsZSk9PngrKG11bHRpcGxlLXglbXVsdGlwbGUpJW11bHRpcGxlO2Zvcih2YXIgY3V0RG93bj0xO2N1dERvd248PTQ7Y3V0RG93bio9Mil7dmFyIG92ZXJHcm93bkhlYXBTaXplPW9sZFNpemUqKDErLjIvY3V0RG93bik7b3Zlckdyb3duSGVhcFNpemU9TWF0aC5taW4ob3Zlckdyb3duSGVhcFNpemUscmVxdWVzdGVkU2l6ZSsxMDA2NjMyOTYpO3ZhciBuZXdTaXplPU1hdGgubWluKG1heEhlYXBTaXplLGFsaWduVXAoTWF0aC5tYXgocmVxdWVzdGVkU2l6ZSxvdmVyR3Jvd25IZWFwU2l6ZSksNjU1MzYpKTt2YXIgcmVwbGFjZW1lbnQ9Z3Jvd01lbW9yeShuZXdTaXplKTtpZihyZXBsYWNlbWVudCl7cmV0dXJuIHRydWV9fXJldHVybiBmYWxzZX07ZW1iaW5kX2luaXRfY2hhckNvZGVzKCk7QmluZGluZ0Vycm9yPU1vZHVsZVsiQmluZGluZ0Vycm9yIl09Y2xhc3MgQmluZGluZ0Vycm9yIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IobWVzc2FnZSl7c3VwZXIobWVzc2FnZSk7dGhpcy5uYW1lPSJCaW5kaW5nRXJyb3IiO319O01vZHVsZVsiSW50ZXJuYWxFcnJvciJdPWNsYXNzIEludGVybmFsRXJyb3IgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihtZXNzYWdlKXtzdXBlcihtZXNzYWdlKTt0aGlzLm5hbWU9IkludGVybmFsRXJyb3IiO319O2hhbmRsZUFsbG9jYXRvckluaXQoKTtpbml0X2VtdmFsKCk7dmFyIHdhc21JbXBvcnRzPXtmOl9fZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludCxpOl9fZW1iaW5kX3JlZ2lzdGVyX2Jvb2wsaDpfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbCxlOl9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0LGI6X19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcixhOl9fZW1iaW5kX3JlZ2lzdGVyX21lbW9yeV92aWV3LGQ6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZyxjOl9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nLGo6X19lbWJpbmRfcmVnaXN0ZXJfdm9pZCxnOl9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwfTt2YXIgd2FzbUV4cG9ydHM9Y3JlYXRlV2FzbSgpO01vZHVsZVsiX3BhY2siXT0oYTAsYTEsYTIsYTMsYTQsYTUsYTYsYTcsYTgsYTksYTEwKT0+KE1vZHVsZVsiX3BhY2siXT13YXNtRXhwb3J0c1sibSJdKShhMCxhMSxhMixhMyxhNCxhNSxhNixhNyxhOCxhOSxhMTApO01vZHVsZVsiX19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5ncyJdPSgpPT4oTW9kdWxlWyJfX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzIl09d2FzbUV4cG9ydHNbIm4iXSkoKTt2YXIgX21hbGxvYz1Nb2R1bGVbIl9tYWxsb2MiXT1hMD0+KF9tYWxsb2M9TW9kdWxlWyJfbWFsbG9jIl09d2FzbUV4cG9ydHNbInAiXSkoYTApO3ZhciBfZnJlZT1Nb2R1bGVbIl9mcmVlIl09YTA9PihfZnJlZT1Nb2R1bGVbIl9mcmVlIl09d2FzbUV4cG9ydHNbInEiXSkoYTApO2Z1bmN0aW9uIGludEFycmF5RnJvbUJhc2U2NChzKXt2YXIgZGVjb2RlZD1hdG9iKHMpO3ZhciBieXRlcz1uZXcgVWludDhBcnJheShkZWNvZGVkLmxlbmd0aCk7Zm9yKHZhciBpPTA7aTxkZWNvZGVkLmxlbmd0aDsrK2kpe2J5dGVzW2ldPWRlY29kZWQuY2hhckNvZGVBdChpKTt9cmV0dXJuIGJ5dGVzfWZ1bmN0aW9uIHRyeVBhcnNlQXNEYXRhVVJJKGZpbGVuYW1lKXtpZighaXNEYXRhVVJJKGZpbGVuYW1lKSl7cmV0dXJufXJldHVybiBpbnRBcnJheUZyb21CYXNlNjQoZmlsZW5hbWUuc2xpY2UoZGF0YVVSSVByZWZpeC5sZW5ndGgpKX12YXIgY2FsbGVkUnVuO2RlcGVuZGVuY2llc0Z1bGZpbGxlZD1mdW5jdGlvbiBydW5DYWxsZXIoKXtpZighY2FsbGVkUnVuKXJ1bigpO2lmKCFjYWxsZWRSdW4pZGVwZW5kZW5jaWVzRnVsZmlsbGVkPXJ1bkNhbGxlcjt9O2Z1bmN0aW9uIHJ1bigpe2lmKHJ1bkRlcGVuZGVuY2llcz4wKXtyZXR1cm59cHJlUnVuKCk7aWYocnVuRGVwZW5kZW5jaWVzPjApe3JldHVybn1mdW5jdGlvbiBkb1J1bigpe2lmKGNhbGxlZFJ1bilyZXR1cm47Y2FsbGVkUnVuPXRydWU7TW9kdWxlWyJjYWxsZWRSdW4iXT10cnVlO2lmKEFCT1JUKXJldHVybjtpbml0UnVudGltZSgpO3JlYWR5UHJvbWlzZVJlc29sdmUoTW9kdWxlKTtpZihNb2R1bGVbIm9uUnVudGltZUluaXRpYWxpemVkIl0pTW9kdWxlWyJvblJ1bnRpbWVJbml0aWFsaXplZCJdKCk7cG9zdFJ1bigpO31pZihNb2R1bGVbInNldFN0YXR1cyJdKXtNb2R1bGVbInNldFN0YXR1cyJdKCJSdW5uaW5nLi4uIik7c2V0VGltZW91dChmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtNb2R1bGVbInNldFN0YXR1cyJdKCIiKTt9LDEpO2RvUnVuKCk7fSwxKTt9ZWxzZSB7ZG9SdW4oKTt9fWlmKE1vZHVsZVsicHJlSW5pdCJdKXtpZih0eXBlb2YgTW9kdWxlWyJwcmVJbml0Il09PSJmdW5jdGlvbiIpTW9kdWxlWyJwcmVJbml0Il09W01vZHVsZVsicHJlSW5pdCJdXTt3aGlsZShNb2R1bGVbInByZUluaXQiXS5sZW5ndGg+MCl7TW9kdWxlWyJwcmVJbml0Il0ucG9wKCkoKTt9fXJ1bigpOwoKCiAgICByZXR1cm4gbW9kdWxlQXJnLnJlYWR5CiAgfQoKICApOwogIH0pKCk7CgogIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55CiAgbGV0IHdhc21Nb2R1bGU7CiAgYXN5bmMgZnVuY3Rpb24gaW5pdFdhc20oKSB7CiAgICAgIHdhc21Nb2R1bGUgPSBhd2FpdCBsb2FkV2FzbSgpOwogIH0KICBsZXQgYWxsb2NhdGVkVmVydGV4Q291bnQgPSAwOwogIGNvbnN0IHVwZGF0ZVF1ZXVlID0gbmV3IEFycmF5KCk7CiAgbGV0IHJ1bm5pbmcgPSBmYWxzZTsKICBsZXQgbG9hZGluZyA9IGZhbHNlOwogIGxldCBwb3NpdGlvbnNQdHI7CiAgbGV0IHJvdGF0aW9uc1B0cjsKICBsZXQgc2NhbGVzUHRyOwogIGxldCBjb2xvcnNQdHI7CiAgbGV0IHNlbGVjdGlvblB0cjsKICBsZXQgZGF0YVB0cjsKICBsZXQgd29ybGRQb3NpdGlvbnNQdHI7CiAgbGV0IHdvcmxkUm90YXRpb25zUHRyOwogIGxldCB3b3JsZFNjYWxlc1B0cjsKICBjb25zdCBwYWNrID0gYXN5bmMgKHNwbGF0KSA9PiB7CiAgICAgIHdoaWxlIChsb2FkaW5nKSB7CiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAwKSk7CiAgICAgIH0KICAgICAgaWYgKCF3YXNtTW9kdWxlKSB7CiAgICAgICAgICBsb2FkaW5nID0gdHJ1ZTsKICAgICAgICAgIGF3YWl0IGluaXRXYXNtKCk7CiAgICAgICAgICBsb2FkaW5nID0gZmFsc2U7CiAgICAgIH0KICAgICAgY29uc3QgdGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQgPSBNYXRoLnBvdygyLCBNYXRoLmNlaWwoTWF0aC5sb2cyKHNwbGF0LnZlcnRleENvdW50KSkpOwogICAgICBpZiAodGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQgPiBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCkgewogICAgICAgICAgaWYgKGFsbG9jYXRlZFZlcnRleENvdW50ID4gMCkgewogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUocG9zaXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHJvdGF0aW9uc1B0cik7CiAgICAgICAgICAgICAgd2FzbU1vZHVsZS5fZnJlZShzY2FsZXNQdHIpOwogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUoY29sb3JzUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHNlbGVjdGlvblB0cik7CiAgICAgICAgICAgICAgd2FzbU1vZHVsZS5fZnJlZShkYXRhUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHdvcmxkUG9zaXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHdvcmxkUm90YXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHdvcmxkU2NhbGVzUHRyKTsKICAgICAgICAgIH0KICAgICAgICAgIGFsbG9jYXRlZFZlcnRleENvdW50ID0gdGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQ7CiAgICAgICAgICBwb3NpdGlvbnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMyAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICByb3RhdGlvbnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoNCAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBzY2FsZXNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMyAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBjb2xvcnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoNCAqIGFsbG9jYXRlZFZlcnRleENvdW50KTsKICAgICAgICAgIHNlbGVjdGlvblB0ciA9IHdhc21Nb2R1bGUuX21hbGxvYyhhbGxvY2F0ZWRWZXJ0ZXhDb3VudCk7CiAgICAgICAgICBkYXRhUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKDggKiBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCAqIDQpOwogICAgICAgICAgd29ybGRQb3NpdGlvbnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMyAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICB3b3JsZFJvdGF0aW9uc1B0ciA9IHdhc21Nb2R1bGUuX21hbGxvYyg0ICogYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIHdvcmxkU2NhbGVzUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKDMgKiBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCAqIDQpOwogICAgICB9CiAgICAgIHdhc21Nb2R1bGUuSEVBUEYzMi5zZXQoc3BsYXQucG9zaXRpb25zLCBwb3NpdGlvbnNQdHIgLyA0KTsKICAgICAgd2FzbU1vZHVsZS5IRUFQRjMyLnNldChzcGxhdC5yb3RhdGlvbnMsIHJvdGF0aW9uc1B0ciAvIDQpOwogICAgICB3YXNtTW9kdWxlLkhFQVBGMzIuc2V0KHNwbGF0LnNjYWxlcywgc2NhbGVzUHRyIC8gNCk7CiAgICAgIHdhc21Nb2R1bGUuSEVBUFU4LnNldChzcGxhdC5jb2xvcnMsIGNvbG9yc1B0cik7CiAgICAgIHdhc21Nb2R1bGUuSEVBUFU4LnNldChzcGxhdC5zZWxlY3Rpb24sIHNlbGVjdGlvblB0cik7CiAgICAgIHdhc21Nb2R1bGUuX3BhY2soc3BsYXQuc2VsZWN0ZWQsIHNwbGF0LnZlcnRleENvdW50LCBwb3NpdGlvbnNQdHIsIHJvdGF0aW9uc1B0ciwgc2NhbGVzUHRyLCBjb2xvcnNQdHIsIHNlbGVjdGlvblB0ciwgZGF0YVB0ciwgd29ybGRQb3NpdGlvbnNQdHIsIHdvcmxkUm90YXRpb25zUHRyLCB3b3JsZFNjYWxlc1B0cik7CiAgICAgIGNvbnN0IG91dERhdGEgPSBuZXcgVWludDMyQXJyYXkod2FzbU1vZHVsZS5IRUFQVTMyLmJ1ZmZlciwgZGF0YVB0ciwgc3BsYXQudmVydGV4Q291bnQgKiA4KTsKICAgICAgY29uc3QgZGV0YWNoZWREYXRhID0gbmV3IFVpbnQzMkFycmF5KG91dERhdGEuc2xpY2UoKS5idWZmZXIpOwogICAgICBjb25zdCB3b3JsZFBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkod2FzbU1vZHVsZS5IRUFQRjMyLmJ1ZmZlciwgd29ybGRQb3NpdGlvbnNQdHIsIHNwbGF0LnZlcnRleENvdW50ICogMyk7CiAgICAgIGNvbnN0IGRldGFjaGVkV29ybGRQb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHdvcmxkUG9zaXRpb25zLnNsaWNlKCkuYnVmZmVyKTsKICAgICAgY29uc3Qgd29ybGRSb3RhdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHdhc21Nb2R1bGUuSEVBUEYzMi5idWZmZXIsIHdvcmxkUm90YXRpb25zUHRyLCBzcGxhdC52ZXJ0ZXhDb3VudCAqIDQpOwogICAgICBjb25zdCBkZXRhY2hlZFdvcmxkUm90YXRpb25zID0gbmV3IEZsb2F0MzJBcnJheSh3b3JsZFJvdGF0aW9ucy5zbGljZSgpLmJ1ZmZlcik7CiAgICAgIGNvbnN0IHdvcmxkU2NhbGVzID0gbmV3IEZsb2F0MzJBcnJheSh3YXNtTW9kdWxlLkhFQVBGMzIuYnVmZmVyLCB3b3JsZFNjYWxlc1B0ciwgc3BsYXQudmVydGV4Q291bnQgKiAzKTsKICAgICAgY29uc3QgZGV0YWNoZWRXb3JsZFNjYWxlcyA9IG5ldyBGbG9hdDMyQXJyYXkod29ybGRTY2FsZXMuc2xpY2UoKS5idWZmZXIpOwogICAgICBjb25zdCByZXNwb25zZSA9IHsKICAgICAgICAgIGRhdGE6IGRldGFjaGVkRGF0YSwKICAgICAgICAgIHdvcmxkUG9zaXRpb25zOiBkZXRhY2hlZFdvcmxkUG9zaXRpb25zLAogICAgICAgICAgd29ybGRSb3RhdGlvbnM6IGRldGFjaGVkV29ybGRSb3RhdGlvbnMsCiAgICAgICAgICB3b3JsZFNjYWxlczogZGV0YWNoZWRXb3JsZFNjYWxlcywKICAgICAgICAgIG9mZnNldDogc3BsYXQub2Zmc2V0LAogICAgICAgICAgdmVydGV4Q291bnQ6IHNwbGF0LnZlcnRleENvdW50LAogICAgICAgICAgcG9zaXRpb25zOiBzcGxhdC5wb3NpdGlvbnMuYnVmZmVyLAogICAgICAgICAgcm90YXRpb25zOiBzcGxhdC5yb3RhdGlvbnMuYnVmZmVyLAogICAgICAgICAgc2NhbGVzOiBzcGxhdC5zY2FsZXMuYnVmZmVyLAogICAgICAgICAgY29sb3JzOiBzcGxhdC5jb2xvcnMuYnVmZmVyLAogICAgICAgICAgc2VsZWN0aW9uOiBzcGxhdC5zZWxlY3Rpb24uYnVmZmVyLAogICAgICB9OwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgcmVzcG9uc2U6IHJlc3BvbnNlIH0sIFsKICAgICAgICAgIHJlc3BvbnNlLmRhdGEuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2Uud29ybGRQb3NpdGlvbnMuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2Uud29ybGRSb3RhdGlvbnMuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2Uud29ybGRTY2FsZXMuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2UucG9zaXRpb25zLAogICAgICAgICAgcmVzcG9uc2Uucm90YXRpb25zLAogICAgICAgICAgcmVzcG9uc2Uuc2NhbGVzLAogICAgICAgICAgcmVzcG9uc2UuY29sb3JzLAogICAgICAgICAgcmVzcG9uc2Uuc2VsZWN0aW9uLAogICAgICBdKTsKICAgICAgcnVubmluZyA9IGZhbHNlOwogIH07CiAgY29uc3QgcGFja1Rocm90dGxlZCA9ICgpID0+IHsKICAgICAgaWYgKHVwZGF0ZVF1ZXVlLmxlbmd0aCA9PT0gMCkKICAgICAgICAgIHJldHVybjsKICAgICAgaWYgKCFydW5uaW5nKSB7CiAgICAgICAgICBydW5uaW5nID0gdHJ1ZTsKICAgICAgICAgIGNvbnN0IHNwbGF0ID0gdXBkYXRlUXVldWUuc2hpZnQoKTsKICAgICAgICAgIHBhY2soc3BsYXQpOwogICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlOwogICAgICAgICAgICAgIHBhY2tUaHJvdHRsZWQoKTsKICAgICAgICAgIH0sIDApOwogICAgICB9CiAgfTsKICBzZWxmLm9ubWVzc2FnZSA9IChlKSA9PiB7CiAgICAgIGlmIChlLmRhdGEuc3BsYXQpIHsKICAgICAgICAgIGNvbnN0IHNwbGF0ID0gZS5kYXRhLnNwbGF0OwogICAgICAgICAgZm9yIChjb25zdCBbaW5kZXgsIGV4aXN0aW5nXSBvZiB1cGRhdGVRdWV1ZS5lbnRyaWVzKCkpIHsKICAgICAgICAgICAgICBpZiAoZXhpc3Rpbmcub2Zmc2V0ID09PSBzcGxhdC5vZmZzZXQpIHsKICAgICAgICAgICAgICAgICAgdXBkYXRlUXVldWVbaW5kZXhdID0gc3BsYXQ7CiAgICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgICB1cGRhdGVRdWV1ZS5wdXNoKHNwbGF0KTsKICAgICAgICAgIHBhY2tUaHJvdHRsZWQoKTsKICAgICAgfQogIH07Cgp9KSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD1EYXRhV29ya2VyLmpzLm1hcAoK"), ll = function(p = {}) {
  var U, t, F = p;
  F.ready = new Promise((B, Z) => {
    U = B, t = Z;
  });
  var l, V = Object.assign({}, F), d = "";
  d = (d = self.location.href).indexOf("blob:") !== 0 ? d.substr(0, d.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", l = (B) => {
    var Z = new XMLHttpRequest();
    return Z.open("GET", B, !1), Z.responseType = "arraybuffer", Z.send(null), new Uint8Array(Z.response);
  }, F.print || console.log.bind(console);
  var Q, n, e = F.printErr || console.error.bind(console);
  Object.assign(F, V), V = null, F.arguments && F.arguments, F.thisProgram && F.thisProgram, F.quit && F.quit, F.wasmBinary && (Q = F.wasmBinary), typeof WebAssembly != "object" && q("no native wasm support detected");
  var A, a, h, o, c, I, g, y, J = !1;
  function u() {
    var B = n.buffer;
    F.HEAP8 = A = new Int8Array(B), F.HEAP16 = h = new Int16Array(B), F.HEAPU8 = a = new Uint8Array(B), F.HEAPU16 = o = new Uint16Array(B), F.HEAP32 = c = new Int32Array(B), F.HEAPU32 = I = new Uint32Array(B), F.HEAPF32 = g = new Float32Array(B), F.HEAPF64 = y = new Float64Array(B);
  }
  var N = [], E = [], w = [], x = 0, $ = null;
  function q(B) {
    F.onAbort && F.onAbort(B), e(B = "Aborted(" + B + ")"), J = !0, B += ". Build with -sASSERTIONS for more info.";
    var Z = new WebAssembly.RuntimeError(B);
    throw t(Z), Z;
  }
  var f, lU, S = "data:application/octet-stream;base64,", k = (B) => B.startsWith(S);
  function dU(B) {
    if (B == f && Q) return new Uint8Array(Q);
    var Z = function(i) {
      if (k(i)) return function(R) {
        for (var W = atob(R), r = new Uint8Array(W.length), m = 0; m < W.length; ++m) r[m] = W.charCodeAt(m);
        return r;
      }(i.slice(S.length));
    }(B);
    if (Z) return Z;
    if (l) return l(B);
    throw "both async and sync fetching of the wasm failed";
  }
  function K(B, Z, i) {
    return function(R) {
      return Promise.resolve().then(() => dU(R));
    }(B).then((R) => WebAssembly.instantiate(R, Z)).then((R) => R).then(i, (R) => {
      e(`failed to asynchronously prepare wasm: ${R}`), q(R);
    });
  }
  k(f = "data:application/octet-stream;base64,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aWduZWQgc2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgaW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxmbG9hdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDY0X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDY0X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPgBzdGQ6OmJhc2ljX3N0cmluZzx1bnNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZG91YmxlPgBOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQAAAABEDAAAQgcAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAABEDAAAjAcAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUVFAABEDAAA1AcAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEc05TXzExY2hhcl90cmFpdHNJRHNFRU5TXzlhbGxvY2F0b3JJRHNFRUVFAAAARAwAABwIAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRGlOU18xMWNoYXJfdHJhaXRzSURpRUVOU185YWxsb2NhdG9ySURpRUVFRQAAAEQMAABoCAAATjEwZW1zY3JpcHRlbjN2YWxFAABEDAAAtAgAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQAARAwAANAIAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lhRUUAAEQMAAD4CAAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaEVFAABEDAAAIAkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQAARAwAAEgJAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUAAEQMAABwCQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaUVFAABEDAAAmAkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWpFRQAARAwAAMAJAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lsRUUAAEQMAADoCQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbUVFAABEDAAAEAoAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXhFRQAARAwAADgKAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l5RUUAAEQMAABgCgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZkVFAABEDAAAiAoAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWRFRQAARAwAALAKAABOMTBfX2N4eGFiaXYxMTZfX3NoaW1fdHlwZV9pbmZvRQAAAABsDAAA2AoAANAMAABOMTBfX2N4eGFiaXYxMTdfX2NsYXNzX3R5cGVfaW5mb0UAAABsDAAACAsAAPwKAAAAAAAAfAsAAAIAAAADAAAABAAAAAUAAAAGAAAATjEwX19jeHhhYml2MTIzX19mdW5kYW1lbnRhbF90eXBlX2luZm9FAGwMAABUCwAA/AoAAHYAAABACwAAiAsAAGIAAABACwAAlAsAAGMAAABACwAAoAsAAGgAAABACwAArAsAAGEAAABACwAAuAsAAHMAAABACwAAxAsAAHQAAABACwAA0AsAAGkAAABACwAA3AsAAGoAAABACwAA6AsAAGwAAABACwAA9AsAAG0AAABACwAAAAwAAHgAAABACwAADAwAAHkAAABACwAAGAwAAGYAAABACwAAJAwAAGQAAABACwAAMAwAAAAAAAAsCwAAAgAAAAcAAAAEAAAABQAAAAgAAAAJAAAACgAAAAsAAAAAAAAAtAwAAAIAAAAMAAAABAAAAAUAAAAIAAAADQAAAA4AAAAPAAAATjEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm9FAAAAAGwMAACMDAAALAsAAFN0OXR5cGVfaW5mbwAAAABEDAAAwAwAQdgZCwPgDgE=") || (lU = f, f = F.locateFile ? F.locateFile(lU, d) : d + lU);
  var s = (B) => {
    for (; B.length > 0; ) B.shift()(F);
  };
  F.noExitRuntime;
  var Y, D, T = (B) => {
    for (var Z = "", i = B; a[i]; ) Z += Y[a[i++]];
    return Z;
  }, eU = {}, AU = {}, v = (B) => {
    throw new D(B);
  };
  function L(B, Z, i = {}) {
    if (!("argPackAdvance" in Z)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    return function(R, W, r = {}) {
      var m = W.name;
      if (R || v(`type "${m}" must have a positive integer typeid pointer`), AU.hasOwnProperty(R)) {
        if (r.ignoreDuplicateRegistrations) return;
        v(`Cannot register type '${m}' twice`);
      }
      if (AU[R] = W, eU.hasOwnProperty(R)) {
        var G = eU[R];
        delete eU[R], G.forEach((C) => C());
      }
    }(B, Z, i);
  }
  function FU() {
    this.allocated = [void 0], this.freelist = [];
  }
  var z = new FU(), iU = () => {
    for (var B = 0, Z = z.reserved; Z < z.allocated.length; ++Z) z.allocated[Z] !== void 0 && ++B;
    return B;
  }, oU = (B) => (B || v("Cannot use deleted val. handle = " + B), z.get(B).value), uU = (B) => {
    switch (B) {
      case void 0:
        return 1;
      case null:
        return 2;
      case !0:
        return 3;
      case !1:
        return 4;
      default:
        return z.allocate({ refcount: 1, value: B });
    }
  };
  function bU(B) {
    return this.fromWireType(c[B >> 2]);
  }
  var kU = (B, Z) => {
    switch (Z) {
      case 4:
        return function(i) {
          return this.fromWireType(g[i >> 2]);
        };
      case 8:
        return function(i) {
          return this.fromWireType(y[i >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${Z}): ${B}`);
    }
  }, TU = (B, Z, i) => {
    switch (Z) {
      case 1:
        return i ? (R) => A[R >> 0] : (R) => a[R >> 0];
      case 2:
        return i ? (R) => h[R >> 1] : (R) => o[R >> 1];
      case 4:
        return i ? (R) => c[R >> 2] : (R) => I[R >> 2];
      default:
        throw new TypeError(`invalid integer width (${Z}): ${B}`);
    }
  };
  function HU(B) {
    return this.fromWireType(I[B >> 2]);
  }
  var CU = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, xU = (B, Z) => B ? ((i, R, W) => {
    for (var r = R + W, m = R; i[m] && !(m >= r); ) ++m;
    if (m - R > 16 && i.buffer && CU) return CU.decode(i.subarray(R, m));
    for (var G = ""; R < m; ) {
      var C = i[R++];
      if (128 & C) {
        var X = 63 & i[R++];
        if ((224 & C) != 192) {
          var P = 63 & i[R++];
          if ((C = (240 & C) == 224 ? (15 & C) << 12 | X << 6 | P : (7 & C) << 18 | X << 12 | P << 6 | 63 & i[R++]) < 65536) G += String.fromCharCode(C);
          else {
            var O = C - 65536;
            G += String.fromCharCode(55296 | O >> 10, 56320 | 1023 & O);
          }
        } else G += String.fromCharCode((31 & C) << 6 | X);
      } else G += String.fromCharCode(C);
    }
    return G;
  })(a, B, Z) : "", gU = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, fU = (B, Z) => {
    for (var i = B, R = i >> 1, W = R + Z / 2; !(R >= W) && o[R]; ) ++R;
    if ((i = R << 1) - B > 32 && gU) return gU.decode(a.subarray(B, i));
    for (var r = "", m = 0; !(m >= Z / 2); ++m) {
      var G = h[B + 2 * m >> 1];
      if (G == 0) break;
      r += String.fromCharCode(G);
    }
    return r;
  }, DU = (B, Z, i) => {
    if (i === void 0 && (i = 2147483647), i < 2) return 0;
    for (var R = Z, W = (i -= 2) < 2 * B.length ? i / 2 : B.length, r = 0; r < W; ++r) {
      var m = B.charCodeAt(r);
      h[Z >> 1] = m, Z += 2;
    }
    return h[Z >> 1] = 0, Z - R;
  }, wU = (B) => 2 * B.length, vU = (B, Z) => {
    for (var i = 0, R = ""; !(i >= Z / 4); ) {
      var W = c[B + 4 * i >> 2];
      if (W == 0) break;
      if (++i, W >= 65536) {
        var r = W - 65536;
        R += String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r);
      } else R += String.fromCharCode(W);
    }
    return R;
  }, zU = (B, Z, i) => {
    if (i === void 0 && (i = 2147483647), i < 4) return 0;
    for (var R = Z, W = R + i - 4, r = 0; r < B.length; ++r) {
      var m = B.charCodeAt(r);
      if (m >= 55296 && m <= 57343 && (m = 65536 + ((1023 & m) << 10) | 1023 & B.charCodeAt(++r)), c[Z >> 2] = m, (Z += 4) + 4 > W) break;
    }
    return c[Z >> 2] = 0, Z - R;
  }, MU = (B) => {
    for (var Z = 0, i = 0; i < B.length; ++i) {
      var R = B.charCodeAt(i);
      R >= 55296 && R <= 57343 && ++i, Z += 4;
    }
    return Z;
  }, KU = (B) => {
    var Z = (B - n.buffer.byteLength + 65535) / 65536;
    try {
      return n.grow(Z), u(), 1;
    } catch {
    }
  };
  (() => {
    for (var B = new Array(256), Z = 0; Z < 256; ++Z) B[Z] = String.fromCharCode(Z);
    Y = B;
  })(), D = F.BindingError = class extends Error {
    constructor(B) {
      super(B), this.name = "BindingError";
    }
  }, F.InternalError = class extends Error {
    constructor(B) {
      super(B), this.name = "InternalError";
    }
  }, Object.assign(FU.prototype, { get(B) {
    return this.allocated[B];
  }, has(B) {
    return this.allocated[B] !== void 0;
  }, allocate(B) {
    var Z = this.freelist.pop() || this.allocated.length;
    return this.allocated[Z] = B, Z;
  }, free(B) {
    this.allocated[B] = void 0, this.freelist.push(B);
  } }), z.allocated.push({ value: void 0 }, { value: null }, { value: !0 }, { value: !1 }), z.reserved = z.allocated.length, F.count_emval_handles = iU;
  var jU = { f: (B, Z, i, R, W) => {
  }, i: (B, Z, i, R) => {
    L(B, { name: Z = T(Z), fromWireType: function(W) {
      return !!W;
    }, toWireType: function(W, r) {
      return r ? i : R;
    }, argPackAdvance: 8, readValueFromPointer: function(W) {
      return this.fromWireType(a[W]);
    }, destructorFunction: null });
  }, h: (B, Z) => {
    L(B, { name: Z = T(Z), fromWireType: (i) => {
      var R = oU(i);
      return ((W) => {
        W >= z.reserved && --z.get(W).refcount == 0 && z.free(W);
      })(i), R;
    }, toWireType: (i, R) => uU(R), argPackAdvance: 8, readValueFromPointer: bU, destructorFunction: null });
  }, e: (B, Z, i) => {
    L(B, { name: Z = T(Z), fromWireType: (R) => R, toWireType: (R, W) => W, argPackAdvance: 8, readValueFromPointer: kU(Z, i), destructorFunction: null });
  }, b: (B, Z, i, R, W) => {
    Z = T(Z);
    var r = (C) => C;
    if (R === 0) {
      var m = 32 - 8 * i;
      r = (C) => C << m >>> m;
    }
    var G = Z.includes("unsigned");
    L(B, { name: Z, fromWireType: r, toWireType: G ? function(C, X) {
      return this.name, X >>> 0;
    } : function(C, X) {
      return this.name, X;
    }, argPackAdvance: 8, readValueFromPointer: TU(Z, i, R !== 0), destructorFunction: null });
  }, a: (B, Z, i) => {
    var R = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][Z];
    function W(r) {
      var m = I[r >> 2], G = I[r + 4 >> 2];
      return new R(A.buffer, G, m);
    }
    L(B, { name: i = T(i), fromWireType: W, argPackAdvance: 8, readValueFromPointer: W }, { ignoreDuplicateRegistrations: !0 });
  }, d: (B, Z) => {
    var i = (Z = T(Z)) === "std::string";
    L(B, { name: Z, fromWireType(R) {
      var W, r = I[R >> 2], m = R + 4;
      if (i) for (var G = m, C = 0; C <= r; ++C) {
        var X = m + C;
        if (C == r || a[X] == 0) {
          var P = xU(G, X - G);
          W === void 0 ? W = P : (W += "\0", W += P), G = X + 1;
        }
      }
      else {
        var O = new Array(r);
        for (C = 0; C < r; ++C) O[C] = String.fromCharCode(a[m + C]);
        W = O.join("");
      }
      return ZU(R), W;
    }, toWireType(R, W) {
      var r;
      W instanceof ArrayBuffer && (W = new Uint8Array(W));
      var m = typeof W == "string";
      m || W instanceof Uint8Array || W instanceof Uint8ClampedArray || W instanceof Int8Array || v("Cannot pass non-string to std::string"), r = i && m ? ((O) => {
        for (var M = 0, H = 0; H < O.length; ++H) {
          var nU = O.charCodeAt(H);
          nU <= 127 ? M++ : nU <= 2047 ? M += 2 : nU >= 55296 && nU <= 57343 ? (M += 4, ++H) : M += 3;
        }
        return M;
      })(W) : W.length;
      var G = rU(4 + r + 1), C = G + 4;
      if (I[G >> 2] = r, i && m) ((O, M, H, nU) => {
        if (!(nU > 0)) return 0;
        for (var RU = H + nU - 1, WU = 0; WU < O.length; ++WU) {
          var _ = O.charCodeAt(WU);
          if (_ >= 55296 && _ <= 57343 && (_ = 65536 + ((1023 & _) << 10) | 1023 & O.charCodeAt(++WU)), _ <= 127) {
            if (H >= RU) break;
            M[H++] = _;
          } else if (_ <= 2047) {
            if (H + 1 >= RU) break;
            M[H++] = 192 | _ >> 6, M[H++] = 128 | 63 & _;
          } else if (_ <= 65535) {
            if (H + 2 >= RU) break;
            M[H++] = 224 | _ >> 12, M[H++] = 128 | _ >> 6 & 63, M[H++] = 128 | 63 & _;
          } else {
            if (H + 3 >= RU) break;
            M[H++] = 240 | _ >> 18, M[H++] = 128 | _ >> 12 & 63, M[H++] = 128 | _ >> 6 & 63, M[H++] = 128 | 63 & _;
          }
        }
        M[H] = 0;
      })(W, a, C, r + 1);
      else if (m) for (var X = 0; X < r; ++X) {
        var P = W.charCodeAt(X);
        P > 255 && (ZU(C), v("String has UTF-16 code units that do not fit in 8 bits")), a[C + X] = P;
      }
      else for (X = 0; X < r; ++X) a[C + X] = W[X];
      return R !== null && R.push(ZU, G), G;
    }, argPackAdvance: 8, readValueFromPointer: HU, destructorFunction(R) {
      ZU(R);
    } });
  }, c: (B, Z, i) => {
    var R, W, r, m, G;
    i = T(i), Z === 2 ? (R = fU, W = DU, m = wU, r = () => o, G = 1) : Z === 4 && (R = vU, W = zU, m = MU, r = () => I, G = 2), L(B, { name: i, fromWireType: (C) => {
      for (var X, P = I[C >> 2], O = r(), M = C + 4, H = 0; H <= P; ++H) {
        var nU = C + 4 + H * Z;
        if (H == P || O[nU >> G] == 0) {
          var RU = R(M, nU - M);
          X === void 0 ? X = RU : (X += "\0", X += RU), M = nU + Z;
        }
      }
      return ZU(C), X;
    }, toWireType: (C, X) => {
      typeof X != "string" && v(`Cannot pass non-string to C++ string type ${i}`);
      var P = m(X), O = rU(4 + P + Z);
      return I[O >> 2] = P >> G, W(X, O + 4, P + Z), C !== null && C.push(ZU, O), O;
    }, argPackAdvance: 8, readValueFromPointer: bU, destructorFunction(C) {
      ZU(C);
    } });
  }, j: (B, Z) => {
    L(B, { isVoid: !0, name: Z = T(Z), argPackAdvance: 0, fromWireType: () => {
    }, toWireType: (i, R) => {
    } });
  }, g: (B) => {
    var Z = a.length, i = 2147483648;
    if ((B >>>= 0) > i) return !1;
    for (var R, W, r = 1; r <= 4; r *= 2) {
      var m = Z * (1 + 0.2 / r);
      m = Math.min(m, B + 100663296);
      var G = Math.min(i, (R = Math.max(B, m)) + ((W = 65536) - R % W) % W);
      if (KU(G)) return !0;
    }
    return !1;
  } }, BU = function() {
    var B, Z, i, R = { a: jU };
    function W(r, m) {
      var G;
      return BU = r.exports, n = BU.k, u(), G = BU.l, E.unshift(G), function(C) {
        if (x--, F.monitorRunDependencies && F.monitorRunDependencies(x), x == 0 && $) {
          var X = $;
          $ = null, X();
        }
      }(), BU;
    }
    if (x++, F.monitorRunDependencies && F.monitorRunDependencies(x), F.instantiateWasm) try {
      return F.instantiateWasm(R, W);
    } catch (r) {
      e(`Module.instantiateWasm callback failed with error: ${r}`), t(r);
    }
    return (B = f, Z = R, i = function(r) {
      W(r.instance);
    }, K(B, Z, i)).catch(t), {};
  }();
  F._pack = (B, Z, i, R, W, r, m, G, C, X, P) => (F._pack = BU.m)(B, Z, i, R, W, r, m, G, C, X, P), F.__embind_initialize_bindings = () => (F.__embind_initialize_bindings = BU.n)();
  var cU, rU = F._malloc = (B) => (rU = F._malloc = BU.p)(B), ZU = F._free = (B) => (ZU = F._free = BU.q)(B);
  function NU() {
    function B() {
      cU || (cU = !0, F.calledRun = !0, J || (s(E), U(F), F.onRuntimeInitialized && F.onRuntimeInitialized(), function() {
        if (F.postRun) for (typeof F.postRun == "function" && (F.postRun = [F.postRun]); F.postRun.length; ) Z = F.postRun.shift(), w.unshift(Z);
        var Z;
        s(w);
      }()));
    }
    x > 0 || (function() {
      if (F.preRun) for (typeof F.preRun == "function" && (F.preRun = [F.preRun]); F.preRun.length; ) Z = F.preRun.shift(), N.unshift(Z);
      var Z;
      s(N);
    }(), x > 0 || (F.setStatus ? (F.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        F.setStatus("");
      }, 1), B();
    }, 1)) : B()));
  }
  if ($ = function B() {
    cU || NU(), cU || ($ = B);
  }, F.preInit) for (typeof F.preInit == "function" && (F.preInit = [F.preInit]); F.preInit.length > 0; ) F.preInit.pop()();
  return NU(), p.ready;
};
class Fl {
  constructor(U) {
    this.dataChanged = !1, this.transformsChanged = !1, this.colorTransformsChanged = !1, this._updating = /* @__PURE__ */ new Set(), this._dirty = /* @__PURE__ */ new Set();
    let t = 0, F = 0;
    this._splatIndices = /* @__PURE__ */ new Map(), this._offsets = /* @__PURE__ */ new Map();
    const l = /* @__PURE__ */ new Map();
    for (const A of U.objects) A instanceof VU && (this._splatIndices.set(A, F), this._offsets.set(A, t), l.set(t, A), t += A.data.vertexCount, F++);
    this._vertexCount = t, this._width = 2048, this._height = Math.ceil(2 * this.vertexCount / this.width), this._data = new Uint32Array(this.width * this.height * 4), this._transformsWidth = 5, this._transformsHeight = l.size, this._transforms = new Float32Array(this._transformsWidth * this._transformsHeight * 4), this._transformIndicesWidth = 1024, this._transformIndicesHeight = Math.ceil(this.vertexCount / this._transformIndicesWidth), this._transformIndices = new Uint32Array(this._transformIndicesWidth * this._transformIndicesHeight), this._colorTransformsWidth = 4, this._colorTransformsHeight = 64, this._colorTransforms = new Float32Array(this._colorTransformsWidth * this._colorTransformsHeight * 4), this._colorTransforms.fill(0), this._colorTransforms[0] = 1, this._colorTransforms[5] = 1, this._colorTransforms[10] = 1, this._colorTransforms[15] = 1, this._colorTransformIndicesWidth = 1024, this._colorTransformIndicesHeight = Math.ceil(this.vertexCount / this._colorTransformIndicesWidth), this._colorTransformIndices = new Uint32Array(this._colorTransformIndicesWidth * this._colorTransformIndicesHeight), this.colorTransformIndices.fill(0), this._positions = new Float32Array(3 * this.vertexCount), this._rotations = new Float32Array(4 * this.vertexCount), this._scales = new Float32Array(3 * this.vertexCount), this._worker = new Ul();
    const V = (A) => {
      const a = this._splatIndices.get(A);
      this._transforms.set(A.transform.buffer, 20 * a), this._transforms[20 * a + 16] = A.selected ? 1 : 0, A.positionChanged = !1, A.rotationChanged = !1, A.scaleChanged = !1, A.selectedChanged = !1, this.transformsChanged = !0;
    }, d = () => {
      let A = !1;
      for (const o of this._splatIndices.keys()) if (o.colorTransformChanged) {
        A = !0;
        break;
      }
      if (!A) return;
      const a = [new UU()];
      this._colorTransformIndices.fill(0);
      let h = 1;
      for (const o of this._splatIndices.keys()) {
        const c = this._offsets.get(o);
        for (const I of o.colorTransforms) a.includes(I) || (a.push(I), h++);
        for (const I of o.colorTransformsMap.keys()) {
          const g = o.colorTransformsMap.get(I);
          this._colorTransformIndices[I + c] = g + h - 1;
        }
        o.colorTransformChanged = !1;
      }
      for (let o = 0; o < a.length; o++) {
        const c = a[o];
        this._colorTransforms.set(c.buffer, 16 * o);
      }
      this.colorTransformsChanged = !0;
    };
    let Q;
    this._worker.onmessage = (A) => {
      if (A.data.response) {
        const a = A.data.response, h = l.get(a.offset);
        V(h), d();
        const o = this._splatIndices.get(h);
        for (let c = 0; c < h.data.vertexCount; c++) this._transformIndices[a.offset + c] = o;
        this._data.set(a.data, 8 * a.offset), h.data.reattach(a.positions, a.rotations, a.scales, a.colors, a.selection), this._positions.set(a.worldPositions, 3 * a.offset), this._rotations.set(a.worldRotations, 4 * a.offset), this._scales.set(a.worldScales, 3 * a.offset), this._updating.delete(h), h.selectedChanged = !1, this.dataChanged = !0;
      }
    }, async function() {
      Q = await ll();
    }();
    const n = (A) => {
      if (!Q) return void async function() {
        for (; !Q; ) await new Promise((f) => setTimeout(f, 0));
      }().then(() => {
        n(A);
      });
      V(A);
      const a = Q._malloc(3 * A.data.vertexCount * 4), h = Q._malloc(4 * A.data.vertexCount * 4), o = Q._malloc(3 * A.data.vertexCount * 4), c = Q._malloc(4 * A.data.vertexCount), I = Q._malloc(A.data.vertexCount), g = Q._malloc(8 * A.data.vertexCount * 4), y = Q._malloc(3 * A.data.vertexCount * 4), J = Q._malloc(4 * A.data.vertexCount * 4), u = Q._malloc(3 * A.data.vertexCount * 4);
      Q.HEAPF32.set(A.data.positions, a / 4), Q.HEAPF32.set(A.data.rotations, h / 4), Q.HEAPF32.set(A.data.scales, o / 4), Q.HEAPU8.set(A.data.colors, c), Q.HEAPU8.set(A.data.selection, I), Q._pack(A.selected, A.data.vertexCount, a, h, o, c, I, g, y, J, u);
      const N = new Uint32Array(Q.HEAPU32.buffer, g, 8 * A.data.vertexCount), E = new Float32Array(Q.HEAPF32.buffer, y, 3 * A.data.vertexCount), w = new Float32Array(Q.HEAPF32.buffer, J, 4 * A.data.vertexCount), x = new Float32Array(Q.HEAPF32.buffer, u, 3 * A.data.vertexCount), $ = this._splatIndices.get(A), q = this._offsets.get(A);
      for (let f = 0; f < A.data.vertexCount; f++) this._transformIndices[q + f] = $;
      this._data.set(N, 8 * q), this._positions.set(E, 3 * q), this._rotations.set(w, 4 * q), this._scales.set(x, 3 * q), Q._free(a), Q._free(h), Q._free(o), Q._free(c), Q._free(I), Q._free(g), Q._free(y), Q._free(J), Q._free(u), this.dataChanged = !0, this.colorTransformsChanged = !0;
    }, e = (A) => {
      if ((A.positionChanged || A.rotationChanged || A.scaleChanged || A.selectedChanged) && V(A), A.colorTransformChanged && d(), !A.data.changed || A.data.detached) return;
      const a = { position: new Float32Array(A.position.flat()), rotation: new Float32Array(A.rotation.flat()), scale: new Float32Array(A.scale.flat()), selected: A.selected, vertexCount: A.data.vertexCount, positions: A.data.positions, rotations: A.data.rotations, scales: A.data.scales, colors: A.data.colors, selection: A.data.selection, offset: this._offsets.get(A) };
      this._worker.postMessage({ splat: a }, [a.position.buffer, a.rotation.buffer, a.scale.buffer, a.positions.buffer, a.rotations.buffer, a.scales.buffer, a.colors.buffer, a.selection.buffer]), this._updating.add(A), A.data.detached = !0;
    };
    this.getSplat = (A) => {
      let a = null;
      for (const [h, o] of this._offsets) {
        if (!(A >= o)) break;
        a = h;
      }
      return a;
    }, this.getLocalIndex = (A, a) => a - this._offsets.get(A), this.markDirty = (A) => {
      this._dirty.add(A);
    }, this.rebuild = () => {
      for (const A of this._dirty) e(A);
      this._dirty.clear();
    }, this.dispose = () => {
      this._worker.terminate();
    };
    for (const A of this._splatIndices.keys()) n(A);
    d();
  }
  get offsets() {
    return this._offsets;
  }
  get data() {
    return this._data;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get transforms() {
    return this._transforms;
  }
  get transformsWidth() {
    return this._transformsWidth;
  }
  get transformsHeight() {
    return this._transformsHeight;
  }
  get transformIndices() {
    return this._transformIndices;
  }
  get transformIndicesWidth() {
    return this._transformIndicesWidth;
  }
  get transformIndicesHeight() {
    return this._transformIndicesHeight;
  }
  get colorTransforms() {
    return this._colorTransforms;
  }
  get colorTransformsWidth() {
    return this._colorTransformsWidth;
  }
  get colorTransformsHeight() {
    return this._colorTransformsHeight;
  }
  get colorTransformIndices() {
    return this._colorTransformIndices;
  }
  get colorTransformIndicesWidth() {
    return this._colorTransformIndicesWidth;
  }
  get colorTransformIndicesHeight() {
    return this._colorTransformIndicesHeight;
  }
  get positions() {
    return this._positions;
  }
  get rotations() {
    return this._rotations;
  }
  get scales() {
    return this._scales;
  }
  get vertexCount() {
    return this._vertexCount;
  }
  get needsRebuild() {
    return this._dirty.size > 0;
  }
  get updating() {
    return this._updating.size > 0;
  }
}
class SU {
  constructor(U = 0, t = 0, F = 0, l = 255) {
    this.r = U, this.g = t, this.b = F, this.a = l;
  }
  flat() {
    return [this.r, this.g, this.b, this.a];
  }
  flatNorm() {
    return [this.r / 255, this.g / 255, this.b / 255, this.a / 255];
  }
  toHexString() {
    return "#" + this.flat().map((U) => U.toString(16).padStart(2, "0")).join("");
  }
  toString() {
    return `[${this.flat().join(", ")}]`;
  }
}
class YU extends yU {
  constructor(U, t) {
    super(U, t), this._outlineThickness = 10, this._outlineColor = new SU(255, 165, 0, 255), this._renderData = null, this._depthIndex = new Uint32Array(), this._splatTexture = null, this._worker = null;
    const F = U.canvas, l = U.gl;
    let V, d, Q, n, e, A, a, h, o, c, I, g, y, J, u, N, E, w, x;
    this._resize = () => {
      this._camera && (this._camera.data.setSize(F.width, F.height), this._camera.update(), V = l.getUniformLocation(this.program, "projection"), l.uniformMatrix4fv(V, !1, this._camera.data.projectionMatrix.buffer), d = l.getUniformLocation(this.program, "viewport"), l.uniform2fv(d, new Float32Array([F.width, F.height])));
    };
    const $ = () => {
      this._worker = new $U(), this._worker.onmessage = (S) => {
        if (S.data.depthIndex) {
          const { depthIndex: k } = S.data;
          this._depthIndex = k, l.bindBuffer(l.ARRAY_BUFFER, x), l.bufferData(l.ARRAY_BUFFER, k, l.STATIC_DRAW);
        }
      };
    };
    this._initialize = () => {
      if (this._scene && this._camera) {
        this._resize(), this._scene.addEventListener("objectAdded", q), this._scene.addEventListener("objectRemoved", f);
        for (const S of this._scene.objects) S instanceof VU && S.addEventListener("objectChanged", lU);
        this._renderData = new Fl(this._scene), Q = l.getUniformLocation(this.program, "focal"), l.uniform2fv(Q, new Float32Array([this._camera.data.fx, this._camera.data.fy])), n = l.getUniformLocation(this.program, "view"), l.uniformMatrix4fv(n, !1, this._camera.data.viewMatrix.buffer), c = l.getUniformLocation(this.program, "outlineThickness"), l.uniform1f(c, this.outlineThickness), I = l.getUniformLocation(this.program, "outlineColor"), l.uniform4fv(I, new Float32Array(this.outlineColor.flatNorm())), this._splatTexture = l.createTexture(), e = l.getUniformLocation(this.program, "u_texture"), l.uniform1i(e, 0), J = l.createTexture(), A = l.getUniformLocation(this.program, "u_transforms"), l.uniform1i(A, 1), u = l.createTexture(), a = l.getUniformLocation(this.program, "u_transformIndices"), l.uniform1i(a, 2), N = l.createTexture(), h = l.getUniformLocation(this.program, "u_colorTransforms"), l.uniform1i(h, 3), E = l.createTexture(), o = l.getUniformLocation(this.program, "u_colorTransformIndices"), l.uniform1i(o, 4), w = l.createBuffer(), l.bindBuffer(l.ARRAY_BUFFER, w), l.bufferData(l.ARRAY_BUFFER, new Float32Array([-2, -2, 2, -2, 2, 2, -2, 2]), l.STATIC_DRAW), g = l.getAttribLocation(this.program, "position"), l.enableVertexAttribArray(g), l.vertexAttribPointer(g, 2, l.FLOAT, !1, 0, 0), x = l.createBuffer(), y = l.getAttribLocation(this.program, "index"), l.enableVertexAttribArray(y), l.bindBuffer(l.ARRAY_BUFFER, x), $();
      } else console.error("Cannot render without scene and camera");
    };
    const q = (S) => {
      const k = S;
      k.object instanceof VU && k.object.addEventListener("objectChanged", lU), this.dispose();
    }, f = (S) => {
      const k = S;
      k.object instanceof VU && k.object.removeEventListener("objectChanged", lU), this.dispose();
    }, lU = (S) => {
      const k = S;
      k.object instanceof VU && this._renderData && this._renderData.markDirty(k.object);
    };
    this._render = () => {
      var S, k;
      if (this._scene && this._camera && this.renderData) {
        if (this.renderData.needsRebuild && this.renderData.rebuild(), this.renderData.dataChanged || this.renderData.transformsChanged || this.renderData.colorTransformsChanged) {
          this.renderData.dataChanged && (l.activeTexture(l.TEXTURE0), l.bindTexture(l.TEXTURE_2D, this.splatTexture), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA32UI, this.renderData.width, this.renderData.height, 0, l.RGBA_INTEGER, l.UNSIGNED_INT, this.renderData.data)), this.renderData.transformsChanged && (l.activeTexture(l.TEXTURE1), l.bindTexture(l.TEXTURE_2D, J), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA32F, this.renderData.transformsWidth, this.renderData.transformsHeight, 0, l.RGBA, l.FLOAT, this.renderData.transforms), l.activeTexture(l.TEXTURE2), l.bindTexture(l.TEXTURE_2D, u), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.R32UI, this.renderData.transformIndicesWidth, this.renderData.transformIndicesHeight, 0, l.RED_INTEGER, l.UNSIGNED_INT, this.renderData.transformIndices)), this.renderData.colorTransformsChanged && (l.activeTexture(l.TEXTURE3), l.bindTexture(l.TEXTURE_2D, N), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA32F, this.renderData.colorTransformsWidth, this.renderData.colorTransformsHeight, 0, l.RGBA, l.FLOAT, this.renderData.colorTransforms), l.activeTexture(l.TEXTURE4), l.bindTexture(l.TEXTURE_2D, E), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.R32UI, this.renderData.colorTransformIndicesWidth, this.renderData.colorTransformIndicesHeight, 0, l.RED_INTEGER, l.UNSIGNED_INT, this.renderData.colorTransformIndices));
          const dU = new Float32Array(this.renderData.positions.slice().buffer), K = new Float32Array(this.renderData.transforms.slice().buffer), s = new Uint32Array(this.renderData.transformIndices.slice().buffer);
          (S = this._worker) === null || S === void 0 || S.postMessage({ sortData: { positions: dU, transforms: K, transformIndices: s, vertexCount: this.renderData.vertexCount } }, [dU.buffer, K.buffer, s.buffer]), this.renderData.dataChanged = !1, this.renderData.transformsChanged = !1, this.renderData.colorTransformsChanged = !1;
        }
        this._camera.update(), (k = this._worker) === null || k === void 0 || k.postMessage({ viewProj: this._camera.data.viewProj.buffer }), l.viewport(0, 0, F.width, F.height), l.clearColor(0, 0, 0, 0), l.clear(l.COLOR_BUFFER_BIT), l.disable(l.DEPTH_TEST), l.enable(l.BLEND), l.blendFuncSeparate(l.ONE_MINUS_DST_ALPHA, l.ONE, l.ONE_MINUS_DST_ALPHA, l.ONE), l.blendEquationSeparate(l.FUNC_ADD, l.FUNC_ADD), l.uniformMatrix4fv(V, !1, this._camera.data.projectionMatrix.buffer), l.uniformMatrix4fv(n, !1, this._camera.data.viewMatrix.buffer), l.bindBuffer(l.ARRAY_BUFFER, w), l.vertexAttribPointer(g, 2, l.FLOAT, !1, 0, 0), l.bindBuffer(l.ARRAY_BUFFER, x), l.bufferData(l.ARRAY_BUFFER, this.depthIndex, l.STATIC_DRAW), l.vertexAttribIPointer(y, 1, l.INT, 0, 0), l.vertexAttribDivisor(y, 1), l.drawArraysInstanced(l.TRIANGLE_FAN, 0, 4, this.renderData.vertexCount);
      } else console.error("Cannot render without scene and camera");
    }, this._dispose = () => {
      var S;
      if (this._scene && this._camera && this.renderData) {
        this._scene.removeEventListener("objectAdded", q), this._scene.removeEventListener("objectRemoved", f);
        for (const k of this._scene.objects) k instanceof VU && k.removeEventListener("objectChanged", lU);
        (S = this._worker) === null || S === void 0 || S.terminate(), this.renderData.dispose(), l.deleteTexture(this.splatTexture), l.deleteTexture(J), l.deleteTexture(u), l.deleteBuffer(x), l.deleteBuffer(w);
      } else console.error("Cannot dispose without scene and camera");
    }, this._setOutlineThickness = (S) => {
      this._outlineThickness = S, this._initialized && l.uniform1f(c, S);
    }, this._setOutlineColor = (S) => {
      this._outlineColor = S, this._initialized && l.uniform4fv(I, new Float32Array(S.flatNorm()));
    };
  }
  get renderData() {
    return this._renderData;
  }
  get depthIndex() {
    return this._depthIndex;
  }
  get splatTexture() {
    return this._splatTexture;
  }
  get outlineThickness() {
    return this._outlineThickness;
  }
  set outlineThickness(U) {
    this._setOutlineThickness(U);
  }
  get outlineColor() {
    return this._outlineColor;
  }
  set outlineColor(U) {
    this._setOutlineColor(U);
  }
  get worker() {
    return this._worker;
  }
  _getVertexSource() {
    return `#version 300 es
precision highp float;
precision highp int;

uniform highp usampler2D u_texture;
uniform highp sampler2D u_transforms;
uniform highp usampler2D u_transformIndices;
uniform highp sampler2D u_colorTransforms;
uniform highp usampler2D u_colorTransformIndices;
uniform mat4 projection, view;
uniform vec2 focal;
uniform vec2 viewport;

uniform bool useDepthFade;
uniform float depthFade;

in vec2 position;
in int index;

out vec4 vColor;
out vec2 vPosition;
out float vSize;
out float vSelected;

void main () {
    uvec4 cen = texelFetch(u_texture, ivec2((uint(index) & 0x3ffu) << 1, uint(index) >> 10), 0);
    float selected = float((cen.w >> 24) & 0xffu);

    uint transformIndex = texelFetch(u_transformIndices, ivec2(uint(index) & 0x3ffu, uint(index) >> 10), 0).x;
    mat4 transform = mat4(
        texelFetch(u_transforms, ivec2(0, transformIndex), 0),
        texelFetch(u_transforms, ivec2(1, transformIndex), 0),
        texelFetch(u_transforms, ivec2(2, transformIndex), 0),
        texelFetch(u_transforms, ivec2(3, transformIndex), 0)
    );

    if (selected < 0.5) {
        selected = texelFetch(u_transforms, ivec2(4, transformIndex), 0).x;
    }

    mat4 viewTransform = view * transform;

    vec4 cam = viewTransform * vec4(uintBitsToFloat(cen.xyz), 1);
    vec4 pos2d = projection * cam;

    float clip = 1.2 * pos2d.w;
    if (pos2d.z < -pos2d.w || pos2d.z > pos2d.w || pos2d.x < -clip || pos2d.x > clip || pos2d.y < -clip || pos2d.y > clip) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
    }

    uvec4 cov = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 1) | 1u, uint(index) >> 10), 0);
    vec2 u1 = unpackHalf2x16(cov.x), u2 = unpackHalf2x16(cov.y), u3 = unpackHalf2x16(cov.z);
    mat3 Vrk = mat3(u1.x, u1.y, u2.x, u1.y, u2.y, u3.x, u2.x, u3.x, u3.y);

    mat3 J = mat3(
        focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z), 
        0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z), 
        0., 0., 0.
    );

    mat3 T = transpose(mat3(viewTransform)) * J;
    mat3 cov2d = transpose(T) * Vrk * T;

    //ref: https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu#L110-L111
    cov2d[0][0] += 0.3;
    cov2d[1][1] += 0.3;

    float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
    float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
    float lambda1 = mid + radius, lambda2 = mid - radius;

    if (lambda2 < 0.0) return;
    vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);

    uint colorTransformIndex = texelFetch(u_colorTransformIndices, ivec2(uint(index) & 0x3ffu, uint(index) >> 10), 0).x;
    mat4 colorTransform = mat4(
        texelFetch(u_colorTransforms, ivec2(0, colorTransformIndex), 0),
        texelFetch(u_colorTransforms, ivec2(1, colorTransformIndex), 0),
        texelFetch(u_colorTransforms, ivec2(2, colorTransformIndex), 0),
        texelFetch(u_colorTransforms, ivec2(3, colorTransformIndex), 0)
    );

    vec4 color = vec4((cov.w) & 0xffu, (cov.w >> 8) & 0xffu, (cov.w >> 16) & 0xffu, (cov.w >> 24) & 0xffu) / 255.0;
    vColor = colorTransform * color;

    vPosition = position;
    vSize = length(majorAxis);
    vSelected = selected;

    float scalingFactor = 1.0;

    if (useDepthFade) {
        float depthNorm = (pos2d.z / pos2d.w + 1.0) / 2.0;
        float near = 0.1; float far = 100.0;
        float normalizedDepth = (2.0 * near) / (far + near - depthNorm * (far - near));
        float start = max(normalizedDepth - 0.1, 0.0);
        float end = min(normalizedDepth + 0.1, 1.0);
        scalingFactor = clamp((depthFade - start) / (end - start), 0.0, 1.0);
    }

    vec2 vCenter = vec2(pos2d) / pos2d.w;
    gl_Position = vec4(
        vCenter 
        + position.x * majorAxis * scalingFactor / viewport
        + position.y * minorAxis * scalingFactor / viewport, 0.0, 1.0);
}
`;
  }
  _getFragmentSource() {
    return `#version 300 es
precision highp float;

uniform float outlineThickness;
uniform vec4 outlineColor;

in vec4 vColor;
in vec2 vPosition;
in float vSize;
in float vSelected;

out vec4 fragColor;

void main () {
    float A = -dot(vPosition, vPosition);

    if (A < -4.0) discard;

    if (vSelected < 0.5) {
        float B = exp(A) * vColor.a;
        fragColor = vec4(B * vColor.rgb, B);
        return;
    }

    float outlineThreshold = -4.0 + (outlineThickness / vSize);

    if (A < outlineThreshold) {
        fragColor = outlineColor;
    } 
    else {
        float B = exp(A) * vColor.a;
        fragColor = vec4(B * vColor.rgb, B);
    }
}
`;
  }
}
class tl {
  constructor(U = 1) {
    let t, F, l, V, d = 0, Q = !1;
    this.initialize = (n) => {
      if (!(n instanceof YU)) throw new Error("FadeInPass requires a RenderProgram");
      d = n.started ? 1 : 0, Q = !0, t = n, F = n.renderer.gl, l = F.getUniformLocation(t.program, "useDepthFade"), F.uniform1i(l, 1), V = F.getUniformLocation(t.program, "depthFade"), F.uniform1f(V, d);
    }, this.render = () => {
      var n;
      Q && !(!((n = t.renderData) === null || n === void 0) && n.updating) && (F.useProgram(t.program), d = Math.min(d + 0.01 * U, 1), d >= 1 && (Q = !1, F.uniform1i(l, 0)), F.uniform1f(V, d));
    };
  }
  dispose() {
  }
}
class Al {
  constructor(U = null, t = null) {
    this._backgroundColor = new SU();
    const F = U || document.createElement("canvas");
    U || (F.style.display = "block", F.style.boxSizing = "border-box", F.style.width = "100%", F.style.height = "100%", F.style.margin = "0", F.style.padding = "0", document.body.appendChild(F)), F.style.background = this._backgroundColor.toHexString(), this._canvas = F, this._gl = F.getContext("webgl2", { antialias: !1 });
    const l = t || [];
    t || l.push(new tl()), this._renderProgram = new YU(this, l);
    const V = [this._renderProgram];
    this.resize = () => {
      const d = F.clientWidth, Q = F.clientHeight;
      F.width === d && F.height === Q || this.setSize(d, Q);
    }, this.setSize = (d, Q) => {
      F.width = d, F.height = Q, this._gl.viewport(0, 0, F.width, F.height);
      for (const n of V) n.resize();
    }, this.render = (d, Q) => {
      for (const n of V) n.render(d, Q);
    }, this.dispose = () => {
      for (const d of V) d.dispose();
    }, this.addProgram = (d) => {
      V.push(d);
    }, this.removeProgram = (d) => {
      const Q = V.indexOf(d);
      if (Q < 0) throw new Error("Program not found");
      V.splice(Q, 1);
    }, this.resize();
  }
  get canvas() {
    return this._canvas;
  }
  get gl() {
    return this._gl;
  }
  get renderProgram() {
    return this._renderProgram;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(U) {
    this._backgroundColor = U, this._canvas.style.background = U.toHexString();
  }
}
class Vl {
  constructor(U, t, F = 0.5, l = 0.5, V = 5, d = !0, Q = new b()) {
    this.minAngle = -90, this.maxAngle = 90, this.minZoom = 0.1, this.maxZoom = 30, this.orbitSpeed = 1, this.panSpeed = 1, this.zoomSpeed = 1, this.dampening = 0.12, this.setCameraTarget = () => {
    };
    let n = Q.clone(), e = n.clone(), A = F, a = l, h = V, o = !1, c = !1, I = 0, g = 0, y = 0;
    const J = {};
    let u = !1;
    U.addEventListener("objectChanged", () => {
      if (u) return;
      const s = U.rotation.toEuler();
      A = -s.y, a = -s.x;
      const Y = U.position.x - h * Math.sin(A) * Math.cos(a), D = U.position.y + h * Math.sin(a), T = U.position.z + h * Math.cos(A) * Math.cos(a);
      e = new b(Y, D, T);
    }), this.setCameraTarget = (s) => {
      const Y = s.x - U.position.x, D = s.y - U.position.y, T = s.z - U.position.z;
      h = Math.sqrt(Y * Y + D * D + T * T), a = Math.atan2(D, Math.sqrt(Y * Y + T * T)), A = -Math.atan2(Y, T), e = new b(s.x, s.y, s.z);
    };
    const N = () => 0.1 + 0.9 * (h - this.minZoom) / (this.maxZoom - this.minZoom), E = (s) => {
      J[s.code] = !0, s.code === "ArrowUp" && (J.KeyW = !0), s.code === "ArrowDown" && (J.KeyS = !0), s.code === "ArrowLeft" && (J.KeyA = !0), s.code === "ArrowRight" && (J.KeyD = !0);
    }, w = (s) => {
      J[s.code] = !1, s.code === "ArrowUp" && (J.KeyW = !1), s.code === "ArrowDown" && (J.KeyS = !1), s.code === "ArrowLeft" && (J.KeyA = !1), s.code === "ArrowRight" && (J.KeyD = !1);
    }, x = (s) => {
      K(s), o = !0, c = s.button === 2, g = s.clientX, y = s.clientY, window.addEventListener("mouseup", $);
    }, $ = (s) => {
      K(s), o = !1, c = !1, window.removeEventListener("mouseup", $);
    }, q = (s) => {
      if (K(s), !o || !U) return;
      const Y = s.clientX - g, D = s.clientY - y;
      if (c) {
        const T = N(), eU = -Y * this.panSpeed * 0.01 * T, AU = -D * this.panSpeed * 0.01 * T, v = QU.RotationFromQuaternion(U.rotation).buffer, L = new b(v[0], v[3], v[6]), FU = new b(v[1], v[4], v[7]);
        e = e.add(L.multiply(eU)), e = e.add(FU.multiply(AU));
      } else A -= Y * this.orbitSpeed * 3e-3, a += D * this.orbitSpeed * 3e-3, a = Math.min(Math.max(a, this.minAngle * Math.PI / 180), this.maxAngle * Math.PI / 180);
      g = s.clientX, y = s.clientY;
    }, f = (s) => {
      K(s);
      const Y = N();
      h += s.deltaY * this.zoomSpeed * 0.025 * Y, h = Math.min(Math.max(h, this.minZoom), this.maxZoom);
    }, lU = (s) => {
      if (K(s), s.touches.length === 1) o = !0, c = !1, g = s.touches[0].clientX, y = s.touches[0].clientY, I = 0;
      else if (s.touches.length === 2) {
        o = !0, c = !0, g = (s.touches[0].clientX + s.touches[1].clientX) / 2, y = (s.touches[0].clientY + s.touches[1].clientY) / 2;
        const Y = s.touches[0].clientX - s.touches[1].clientX, D = s.touches[0].clientY - s.touches[1].clientY;
        I = Math.sqrt(Y * Y + D * D);
      }
    }, S = (s) => {
      K(s), o = !1, c = !1;
    }, k = (s) => {
      if (K(s), o && U) if (c) {
        const Y = N(), D = s.touches[0].clientX - s.touches[1].clientX, T = s.touches[0].clientY - s.touches[1].clientY, eU = Math.sqrt(D * D + T * T);
        h += (I - eU) * this.zoomSpeed * 0.1 * Y, h = Math.min(Math.max(h, this.minZoom), this.maxZoom), I = eU;
        const AU = (s.touches[0].clientX + s.touches[1].clientX) / 2, v = (s.touches[0].clientY + s.touches[1].clientY) / 2, L = AU - g, FU = v - y, z = QU.RotationFromQuaternion(U.rotation).buffer, iU = new b(z[0], z[3], z[6]), oU = new b(z[1], z[4], z[7]);
        e = e.add(iU.multiply(-L * this.panSpeed * 0.025 * Y)), e = e.add(oU.multiply(-FU * this.panSpeed * 0.025 * Y)), g = AU, y = v;
      } else {
        const Y = s.touches[0].clientX - g, D = s.touches[0].clientY - y;
        A -= Y * this.orbitSpeed * 3e-3, a += D * this.orbitSpeed * 3e-3, a = Math.min(Math.max(a, this.minAngle * Math.PI / 180), this.maxAngle * Math.PI / 180), g = s.touches[0].clientX, y = s.touches[0].clientY;
      }
    }, dU = (s, Y, D) => (1 - D) * s + D * Y;
    this.update = () => {
      u = !0, F = dU(F, A, this.dampening), l = dU(l, a, this.dampening), V = dU(V, h, this.dampening), n = n.lerp(e, this.dampening);
      const s = n.x + V * Math.sin(F) * Math.cos(l), Y = n.y - V * Math.sin(l), D = n.z - V * Math.cos(F) * Math.cos(l);
      U.position = new b(s, Y, D);
      const T = n.subtract(U.position).normalize(), eU = Math.asin(-T.y), AU = Math.atan2(T.x, T.z);
      U.rotation = j.FromEuler(new b(eU, AU, 0));
      const v = 0.025, L = 0.01, FU = QU.RotationFromQuaternion(U.rotation).buffer, z = new b(-FU[2], -FU[5], -FU[8]), iU = new b(FU[0], FU[3], FU[6]);
      J.KeyS && (e = e.add(z.multiply(v))), J.KeyW && (e = e.subtract(z.multiply(v))), J.KeyA && (e = e.subtract(iU.multiply(v))), J.KeyD && (e = e.add(iU.multiply(v))), J.KeyE && (A += L), J.KeyQ && (A -= L), J.KeyR && (a += L), J.KeyF && (a -= L), u = !1;
    };
    const K = (s) => {
      s.preventDefault(), s.stopPropagation();
    };
    this.dispose = () => {
      t.removeEventListener("dragenter", K), t.removeEventListener("dragover", K), t.removeEventListener("dragleave", K), t.removeEventListener("contextmenu", K), t.removeEventListener("mousedown", x), t.removeEventListener("mousemove", q), t.removeEventListener("wheel", f), t.removeEventListener("touchstart", lU), t.removeEventListener("touchend", S), t.removeEventListener("touchmove", k), d && (window.removeEventListener("keydown", E), window.removeEventListener("keyup", w));
    }, d && (window.addEventListener("keydown", E), window.addEventListener("keyup", w)), t.addEventListener("dragenter", K), t.addEventListener("dragover", K), t.addEventListener("dragleave", K), t.addEventListener("contextmenu", K), t.addEventListener("mousedown", x), t.addEventListener("mousemove", q), t.addEventListener("wheel", f), t.addEventListener("touchstart", lU), t.addEventListener("touchend", S), t.addEventListener("touchmove", k), this.update();
  }
}
class Bl extends yU {
  constructor(U, t = []) {
    super(U, t), this._renderData = null, this._depthIndex = new Uint32Array(), this._splatTexture = null;
    const F = U.canvas, l = U.gl;
    let V, d, Q, n, e, A, a, h, o, c, I;
    this._resize = () => {
      this._camera && (this._camera.data.setSize(F.width, F.height), this._camera.update(), d = l.getUniformLocation(this.program, "projection"), l.uniformMatrix4fv(d, !1, this._camera.data.projectionMatrix.buffer), Q = l.getUniformLocation(this.program, "viewport"), l.uniform2fv(Q, new Float32Array([F.width, F.height])));
    };
    const g = () => {
      U.renderProgram.worker !== null ? (V = U.renderProgram.worker, V.onmessage = (N) => {
        if (N.data.depthIndex) {
          const { depthIndex: E } = N.data;
          this._depthIndex = E, l.bindBuffer(l.ARRAY_BUFFER, I), l.bufferData(l.ARRAY_BUFFER, E, l.STATIC_DRAW);
        }
      }) : console.error("Render program is not initialized. Cannot render without worker");
    };
    this._initialize = () => {
      if (!this._scene || !this._camera) return void console.error("Cannot render without scene and camera");
      this._resize(), this._scene.addEventListener("objectAdded", y), this._scene.addEventListener("objectRemoved", J);
      for (const x of this._scene.objects) x instanceof sU && (this._renderData === null ? (this._renderData = x.data, x.addEventListener("objectChanged", u)) : console.warn("Multiple Splatv objects are not currently supported"));
      if (this._renderData === null) return void console.error("Cannot render without Splatv object");
      n = l.getUniformLocation(this.program, "focal"), l.uniform2fv(n, new Float32Array([this._camera.data.fx, this._camera.data.fy])), e = l.getUniformLocation(this.program, "view"), l.uniformMatrix4fv(e, !1, this._camera.data.viewMatrix.buffer), this._splatTexture = l.createTexture(), A = l.getUniformLocation(this.program, "u_texture"), l.uniform1i(A, 0), a = l.getUniformLocation(this.program, "time"), l.uniform1f(a, Math.sin(Date.now() / 1e3) / 2 + 0.5), c = l.createBuffer(), l.bindBuffer(l.ARRAY_BUFFER, c), l.bufferData(l.ARRAY_BUFFER, new Float32Array([-2, -2, 2, -2, 2, 2, -2, 2]), l.STATIC_DRAW), h = l.getAttribLocation(this.program, "position"), l.enableVertexAttribArray(h), l.vertexAttribPointer(h, 2, l.FLOAT, !1, 0, 0), I = l.createBuffer(), o = l.getAttribLocation(this.program, "index"), l.enableVertexAttribArray(o), l.bindBuffer(l.ARRAY_BUFFER, I), g(), l.activeTexture(l.TEXTURE0), l.bindTexture(l.TEXTURE_2D, this._splatTexture), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA32UI, this._renderData.width, this._renderData.height, 0, l.RGBA_INTEGER, l.UNSIGNED_INT, this._renderData.data);
      const N = this._renderData.positions, E = new Float32Array(new UU().buffer), w = new Uint32Array(this._renderData.vertexCount);
      w.fill(0), V.postMessage({ sortData: { positions: N, transforms: E, transformIndices: w, vertexCount: this._renderData.vertexCount } }, [N.buffer, E.buffer, w.buffer]);
    };
    const y = (N) => {
      const E = N;
      E.object instanceof sU && (this._renderData === null ? (this._renderData = E.object.data, E.object.addEventListener("objectChanged", u)) : console.warn("Splatv not supported by default RenderProgram. Use VideoRenderProgram instead.")), this.dispose();
    }, J = (N) => {
      const E = N;
      E.object instanceof sU && this._renderData === E.object.data && (this._renderData = null, E.object.removeEventListener("objectChanged", u)), this.dispose();
    }, u = (N) => {
      const E = N;
      E.object instanceof sU && this._renderData === E.object.data && this.dispose();
    };
    this._render = () => {
      this._scene && this._camera ? this._renderData ? (this._camera.update(), V.postMessage({ viewProj: this._camera.data.viewProj.buffer }), l.viewport(0, 0, F.width, F.height), l.clearColor(0, 0, 0, 0), l.clear(l.COLOR_BUFFER_BIT), l.disable(l.DEPTH_TEST), l.enable(l.BLEND), l.blendFuncSeparate(l.ONE_MINUS_DST_ALPHA, l.ONE, l.ONE_MINUS_DST_ALPHA, l.ONE), l.blendEquationSeparate(l.FUNC_ADD, l.FUNC_ADD), l.uniformMatrix4fv(d, !1, this._camera.data.projectionMatrix.buffer), l.uniformMatrix4fv(e, !1, this._camera.data.viewMatrix.buffer), l.uniform1f(a, Math.sin(Date.now() / 1e3) / 2 + 0.5), l.bindBuffer(l.ARRAY_BUFFER, c), l.vertexAttribPointer(h, 2, l.FLOAT, !1, 0, 0), l.bindBuffer(l.ARRAY_BUFFER, I), l.bufferData(l.ARRAY_BUFFER, this._depthIndex, l.STATIC_DRAW), l.vertexAttribIPointer(o, 1, l.INT, 0, 0), l.vertexAttribDivisor(o, 1), l.drawArraysInstanced(l.TRIANGLE_FAN, 0, 4, this._renderData.vertexCount)) : console.warn("Cannot render without Splatv object") : console.error("Cannot render without scene and camera");
    }, this._dispose = () => {
      if (this._scene && this._camera) {
        this._scene.removeEventListener("objectAdded", y), this._scene.removeEventListener("objectRemoved", J);
        for (const N of this._scene.objects) N instanceof sU && this._renderData === N.data && (this._renderData = null, N.removeEventListener("objectChanged", u));
        V == null || V.terminate(), l.deleteTexture(this._splatTexture), l.deleteBuffer(I), l.deleteBuffer(c);
      } else console.error("Cannot dispose without scene and camera");
    };
  }
  get renderData() {
    return this._renderData;
  }
  _getVertexSource() {
    return `#version 300 es
precision highp float;
precision highp int;
  
uniform highp usampler2D u_texture;
uniform mat4 projection, view;
uniform vec2 focal;
uniform vec2 viewport;
uniform float time;
  
in vec2 position;
in int index;
  
out vec4 vColor;
out vec2 vPosition;
  
void main () {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);

    uvec4 motion1 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2) | 3u, uint(index) >> 10), 0);
    vec2 trbf = unpackHalf2x16(motion1.w);
    float dt = time - trbf.x;

    float topacity = exp(-1.0 * pow(dt / trbf.y, 2.0));
    if(topacity < 0.02) return;

    uvec4 motion0 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2) | 2u, uint(index) >> 10), 0);
    uvec4 static0 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2), uint(index) >> 10), 0);

    vec2 m0 = unpackHalf2x16(motion0.x), m1 = unpackHalf2x16(motion0.y), m2 = unpackHalf2x16(motion0.z), 
         m3 = unpackHalf2x16(motion0.w), m4 = unpackHalf2x16(motion1.x); 
      
    vec4 trot = vec4(unpackHalf2x16(motion1.y).xy, unpackHalf2x16(motion1.z).xy) * dt;
    vec3 tpos = (vec3(m0.xy, m1.x) * dt + vec3(m1.y, m2.xy) * dt*dt + vec3(m3.xy, m4.x) * dt*dt*dt);
      
    vec4 cam = view * vec4(uintBitsToFloat(static0.xyz) + tpos, 1);
    vec4 pos = projection * cam;
  
    float clip = 1.2 * pos.w;
    if (pos.z < -clip || pos.x < -clip || pos.x > clip || pos.y < -clip || pos.y > clip) return;
    uvec4 static1 = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 2) | 1u, uint(index) >> 10), 0);

    vec4 rot = vec4(unpackHalf2x16(static0.w).xy, unpackHalf2x16(static1.x).xy) + trot;
    vec3 scale = vec3(unpackHalf2x16(static1.y).xy, unpackHalf2x16(static1.z).x);
    rot /= sqrt(dot(rot, rot));
  
    mat3 S = mat3(scale.x, 0.0, 0.0, 0.0, scale.y, 0.0, 0.0, 0.0, scale.z);
    mat3 R = mat3(
        1.0 - 2.0 * (rot.z * rot.z + rot.w * rot.w), 2.0 * (rot.y * rot.z - rot.x * rot.w), 2.0 * (rot.y * rot.w + rot.x * rot.z),
        2.0 * (rot.y * rot.z + rot.x * rot.w), 1.0 - 2.0 * (rot.y * rot.y + rot.w * rot.w), 2.0 * (rot.z * rot.w - rot.x * rot.y),
        2.0 * (rot.y * rot.w - rot.x * rot.z), 2.0 * (rot.z * rot.w + rot.x * rot.y), 1.0 - 2.0 * (rot.y * rot.y + rot.z * rot.z));
    mat3 M = S * R;
    mat3 Vrk = 4.0 * transpose(M) * M;
    mat3 J = mat3(
        focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z), 
        0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z), 
        0., 0., 0.
    );
  
    mat3 T = transpose(mat3(view)) * J;
    mat3 cov2d = transpose(T) * Vrk * T;
  
    float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
    float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
    float lambda1 = mid + radius, lambda2 = mid - radius;
  
    if(lambda2 < 0.0) return;
    vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
      
    uint rgba = static1.w;
    vColor = 
        clamp(pos.z/pos.w+1.0, 0.0, 1.0) * 
        vec4(1.0, 1.0, 1.0, topacity) *
        vec4(
            (rgba) & 0xffu, 
            (rgba >> 8) & 0xffu, 
            (rgba >> 16) & 0xffu, 
            (rgba >> 24) & 0xffu) / 255.0;

    vec2 vCenter = vec2(pos) / pos.w;
    gl_Position = vec4(
        vCenter 
        + position.x * majorAxis / viewport 
        + position.y * minorAxis / viewport, 0.0, 1.0);

    vPosition = position;
}
`;
  }
  _getFragmentSource() {
    return `#version 300 es
precision highp float;
  
in vec4 vColor;
in vec2 vPosition;

out vec4 fragColor;

void main () {
    float A = -dot(vPosition, vPosition);
    if (A < -4.0) discard;
    float B = exp(A) * vColor.a;
    fragColor = vec4(B * vColor.rgb, B);
}
`;
  }
}
export {
  SU as E,
  el as J,
  nl as W,
  Al as Y,
  j as l,
  dl as m,
  Ql as o,
  b as t,
  Vl as u,
  Bl as x
};
