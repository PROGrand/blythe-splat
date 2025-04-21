class m {
  constructor(U = 0, Q = 0, F = 0) {
    this.x = U, this.y = Q, this.z = F;
  }
  equals(U) {
    return this.x === U.x && this.y === U.y && this.z === U.z;
  }
  add(U) {
    return typeof U == "number" ? new m(this.x + U, this.y + U, this.z + U) : new m(this.x + U.x, this.y + U.y, this.z + U.z);
  }
  subtract(U) {
    return typeof U == "number" ? new m(this.x - U, this.y - U, this.z - U) : new m(this.x - U.x, this.y - U.y, this.z - U.z);
  }
  multiply(U) {
    return typeof U == "number" ? new m(this.x * U, this.y * U, this.z * U) : U instanceof m ? new m(this.x * U.x, this.y * U.y, this.z * U.z) : new m(this.x * U.buffer[0] + this.y * U.buffer[4] + this.z * U.buffer[8] + U.buffer[12], this.x * U.buffer[1] + this.y * U.buffer[5] + this.z * U.buffer[9] + U.buffer[13], this.x * U.buffer[2] + this.y * U.buffer[6] + this.z * U.buffer[10] + U.buffer[14]);
  }
  divide(U) {
    return typeof U == "number" ? new m(this.x / U, this.y / U, this.z / U) : new m(this.x / U.x, this.y / U.y, this.z / U.z);
  }
  cross(U) {
    const Q = this.y * U.z - this.z * U.y, F = this.z * U.x - this.x * U.z, l = this.x * U.y - this.y * U.x;
    return new m(Q, F, l);
  }
  dot(U) {
    return this.x * U.x + this.y * U.y + this.z * U.z;
  }
  lerp(U, Q) {
    return new m(this.x + (U.x - this.x) * Q, this.y + (U.y - this.y) * Q, this.z + (U.z - this.z) * Q);
  }
  min(U) {
    return new m(Math.min(this.x, U.x), Math.min(this.y, U.y), Math.min(this.z, U.z));
  }
  max(U) {
    return new m(Math.max(this.x, U.x), Math.max(this.y, U.y), Math.max(this.z, U.z));
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
    return new m(this.x / U, this.y / U, this.z / U);
  }
  flat() {
    return [this.x, this.y, this.z];
  }
  clone() {
    return new m(this.x, this.y, this.z);
  }
  toString() {
    return `[${this.flat().join(", ")}]`;
  }
  static One(U = 1) {
    return new m(U, U, U);
  }
}
class y {
  constructor(U = 0, Q = 0, F = 0, l = 1) {
    this.x = U, this.y = Q, this.z = F, this.w = l;
  }
  equals(U) {
    return this.x === U.x && this.y === U.y && this.z === U.z && this.w === U.w;
  }
  normalize() {
    const U = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    return new y(this.x / U, this.y / U, this.z / U, this.w / U);
  }
  multiply(U) {
    const Q = this.w, F = this.x, l = this.y, R = this.z, d = U.w, t = U.x, V = U.y, B = U.z;
    return new y(Q * t + F * d + l * B - R * V, Q * V - F * B + l * d + R * t, Q * B + F * V - l * t + R * d, Q * d - F * t - l * V - R * B);
  }
  inverse() {
    const U = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    return new y(-this.x / U, -this.y / U, -this.z / U, this.w / U);
  }
  apply(U) {
    const Q = new y(U.x, U.y, U.z, 0), F = new y(-this.x, -this.y, -this.z, this.w), l = this.multiply(Q).multiply(F);
    return new m(l.x, l.y, l.z);
  }
  flat() {
    return [this.x, this.y, this.z, this.w];
  }
  clone() {
    return new y(this.x, this.y, this.z, this.w);
  }
  static FromEuler(U) {
    const Q = U.x / 2, F = U.y / 2, l = U.z / 2, R = Math.cos(F), d = Math.sin(F), t = Math.cos(Q), V = Math.sin(Q), B = Math.cos(l), Z = Math.sin(l);
    return new y(R * V * B + d * t * Z, d * t * B - R * V * Z, R * t * Z - d * V * B, R * t * B + d * V * Z);
  }
  toEuler() {
    const U = 2 * (this.w * this.x + this.y * this.z), Q = 1 - 2 * (this.x * this.x + this.y * this.y), F = Math.atan2(U, Q);
    let l;
    const R = 2 * (this.w * this.y - this.z * this.x);
    l = Math.abs(R) >= 1 ? Math.sign(R) * Math.PI / 2 : Math.asin(R);
    const d = 2 * (this.w * this.z + this.x * this.y), t = 1 - 2 * (this.y * this.y + this.z * this.z), V = Math.atan2(d, t);
    return new m(F, l, V);
  }
  static FromMatrix3(U) {
    const Q = U.buffer, F = Q[0] + Q[4] + Q[8];
    let l, R, d, t;
    if (F > 0) {
      const V = 0.5 / Math.sqrt(F + 1);
      t = 0.25 / V, l = (Q[7] - Q[5]) * V, R = (Q[2] - Q[6]) * V, d = (Q[3] - Q[1]) * V;
    } else if (Q[0] > Q[4] && Q[0] > Q[8]) {
      const V = 2 * Math.sqrt(1 + Q[0] - Q[4] - Q[8]);
      t = (Q[7] - Q[5]) / V, l = 0.25 * V, R = (Q[1] + Q[3]) / V, d = (Q[2] + Q[6]) / V;
    } else if (Q[4] > Q[8]) {
      const V = 2 * Math.sqrt(1 + Q[4] - Q[0] - Q[8]);
      t = (Q[2] - Q[6]) / V, l = (Q[1] + Q[3]) / V, R = 0.25 * V, d = (Q[5] + Q[7]) / V;
    } else {
      const V = 2 * Math.sqrt(1 + Q[8] - Q[0] - Q[4]);
      t = (Q[3] - Q[1]) / V, l = (Q[2] + Q[6]) / V, R = (Q[5] + Q[7]) / V, d = 0.25 * V;
    }
    return new y(l, R, d, t);
  }
  static FromAxisAngle(U, Q) {
    const F = Q / 2, l = Math.sin(F), R = Math.cos(F);
    return new y(U.x * l, U.y * l, U.z * l, R);
  }
  static LookRotation(U) {
    const Q = new m(0, 0, 1), F = Q.dot(U);
    if (Math.abs(F - -1) < 1e-6) return new y(0, 1, 0, Math.PI);
    if (Math.abs(F - 1) < 1e-6) return new y();
    const l = Math.acos(F), R = Q.cross(U).normalize();
    return y.FromAxisAngle(R, l);
  }
  toString() {
    return `[${this.flat().join(", ")}]`;
  }
}
class oU {
  constructor() {
    const U = /* @__PURE__ */ new Map();
    this.addEventListener = (Q, F) => {
      U.has(Q) || U.set(Q, /* @__PURE__ */ new Set()), U.get(Q).add(F);
    }, this.removeEventListener = (Q, F) => {
      U.has(Q) && U.get(Q).delete(F);
    }, this.hasEventListener = (Q, F) => !!U.has(Q) && U.get(Q).has(F), this.dispatchEvent = (Q) => {
      if (U.has(Q.type)) for (const F of U.get(Q.type)) F(Q);
    };
  }
}
class K {
  constructor(U = 1, Q = 0, F = 0, l = 0, R = 0, d = 1, t = 0, V = 0, B = 0, Z = 0, e = 1, b = 0, J = 0, i = 0, r = 0, p = 1) {
    this.buffer = [U, Q, F, l, R, d, t, V, B, Z, e, b, J, i, r, p];
  }
  equals(U) {
    if (this.buffer.length !== U.buffer.length) return !1;
    if (this.buffer === U.buffer) return !0;
    for (let Q = 0; Q < this.buffer.length; Q++) if (this.buffer[Q] !== U.buffer[Q]) return !1;
    return !0;
  }
  multiply(U) {
    const Q = this.buffer, F = U.buffer;
    return new K(F[0] * Q[0] + F[1] * Q[4] + F[2] * Q[8] + F[3] * Q[12], F[0] * Q[1] + F[1] * Q[5] + F[2] * Q[9] + F[3] * Q[13], F[0] * Q[2] + F[1] * Q[6] + F[2] * Q[10] + F[3] * Q[14], F[0] * Q[3] + F[1] * Q[7] + F[2] * Q[11] + F[3] * Q[15], F[4] * Q[0] + F[5] * Q[4] + F[6] * Q[8] + F[7] * Q[12], F[4] * Q[1] + F[5] * Q[5] + F[6] * Q[9] + F[7] * Q[13], F[4] * Q[2] + F[5] * Q[6] + F[6] * Q[10] + F[7] * Q[14], F[4] * Q[3] + F[5] * Q[7] + F[6] * Q[11] + F[7] * Q[15], F[8] * Q[0] + F[9] * Q[4] + F[10] * Q[8] + F[11] * Q[12], F[8] * Q[1] + F[9] * Q[5] + F[10] * Q[9] + F[11] * Q[13], F[8] * Q[2] + F[9] * Q[6] + F[10] * Q[10] + F[11] * Q[14], F[8] * Q[3] + F[9] * Q[7] + F[10] * Q[11] + F[11] * Q[15], F[12] * Q[0] + F[13] * Q[4] + F[14] * Q[8] + F[15] * Q[12], F[12] * Q[1] + F[13] * Q[5] + F[14] * Q[9] + F[15] * Q[13], F[12] * Q[2] + F[13] * Q[6] + F[14] * Q[10] + F[15] * Q[14], F[12] * Q[3] + F[13] * Q[7] + F[14] * Q[11] + F[15] * Q[15]);
  }
  clone() {
    const U = this.buffer;
    return new K(U[0], U[1], U[2], U[3], U[4], U[5], U[6], U[7], U[8], U[9], U[10], U[11], U[12], U[13], U[14], U[15]);
  }
  determinant() {
    const U = this.buffer;
    return U[12] * U[9] * U[6] * U[3] - U[8] * U[13] * U[6] * U[3] - U[12] * U[5] * U[10] * U[3] + U[4] * U[13] * U[10] * U[3] + U[8] * U[5] * U[14] * U[3] - U[4] * U[9] * U[14] * U[3] - U[12] * U[9] * U[2] * U[7] + U[8] * U[13] * U[2] * U[7] + U[12] * U[1] * U[10] * U[7] - U[0] * U[13] * U[10] * U[7] - U[8] * U[1] * U[14] * U[7] + U[0] * U[9] * U[14] * U[7] + U[12] * U[5] * U[2] * U[11] - U[4] * U[13] * U[2] * U[11] - U[12] * U[1] * U[6] * U[11] + U[0] * U[13] * U[6] * U[11] + U[4] * U[1] * U[14] * U[11] - U[0] * U[5] * U[14] * U[11] - U[8] * U[5] * U[2] * U[15] + U[4] * U[9] * U[2] * U[15] + U[8] * U[1] * U[6] * U[15] - U[0] * U[9] * U[6] * U[15] - U[4] * U[1] * U[10] * U[15] + U[0] * U[5] * U[10] * U[15];
  }
  invert() {
    const U = this.buffer, Q = this.determinant();
    if (Q === 0) throw new Error("Matrix is not invertible.");
    const F = 1 / Q;
    return new K(F * (U[5] * U[10] * U[15] - U[5] * U[11] * U[14] - U[9] * U[6] * U[15] + U[9] * U[7] * U[14] + U[13] * U[6] * U[11] - U[13] * U[7] * U[10]), F * (-U[1] * U[10] * U[15] + U[1] * U[11] * U[14] + U[9] * U[2] * U[15] - U[9] * U[3] * U[14] - U[13] * U[2] * U[11] + U[13] * U[3] * U[10]), F * (U[1] * U[6] * U[15] - U[1] * U[7] * U[14] - U[5] * U[2] * U[15] + U[5] * U[3] * U[14] + U[13] * U[2] * U[7] - U[13] * U[3] * U[6]), F * (-U[1] * U[6] * U[11] + U[1] * U[7] * U[10] + U[5] * U[2] * U[11] - U[5] * U[3] * U[10] - U[9] * U[2] * U[7] + U[9] * U[3] * U[6]), F * (-U[4] * U[10] * U[15] + U[4] * U[11] * U[14] + U[8] * U[6] * U[15] - U[8] * U[7] * U[14] - U[12] * U[6] * U[11] + U[12] * U[7] * U[10]), F * (U[0] * U[10] * U[15] - U[0] * U[11] * U[14] - U[8] * U[2] * U[15] + U[8] * U[3] * U[14] + U[12] * U[2] * U[11] - U[12] * U[3] * U[10]), F * (-U[0] * U[6] * U[15] + U[0] * U[7] * U[14] + U[4] * U[2] * U[15] - U[4] * U[3] * U[14] - U[12] * U[2] * U[7] + U[12] * U[3] * U[6]), F * (U[0] * U[6] * U[11] - U[0] * U[7] * U[10] - U[4] * U[2] * U[11] + U[4] * U[3] * U[10] + U[8] * U[2] * U[7] - U[8] * U[3] * U[6]), F * (U[4] * U[9] * U[15] - U[4] * U[11] * U[13] - U[8] * U[5] * U[15] + U[8] * U[7] * U[13] + U[12] * U[5] * U[11] - U[12] * U[7] * U[9]), F * (-U[0] * U[9] * U[15] + U[0] * U[11] * U[13] + U[8] * U[1] * U[15] - U[8] * U[3] * U[13] - U[12] * U[1] * U[11] + U[12] * U[3] * U[9]), F * (U[0] * U[5] * U[15] - U[0] * U[7] * U[13] - U[4] * U[1] * U[15] + U[4] * U[3] * U[13] + U[12] * U[1] * U[7] - U[12] * U[3] * U[5]), F * (-U[0] * U[5] * U[11] + U[0] * U[7] * U[9] + U[4] * U[1] * U[11] - U[4] * U[3] * U[9] - U[8] * U[1] * U[7] + U[8] * U[3] * U[5]), F * (-U[4] * U[9] * U[14] + U[4] * U[10] * U[13] + U[8] * U[5] * U[14] - U[8] * U[6] * U[13] - U[12] * U[5] * U[10] + U[12] * U[6] * U[9]), F * (U[0] * U[9] * U[14] - U[0] * U[10] * U[13] - U[8] * U[1] * U[14] + U[8] * U[2] * U[13] + U[12] * U[1] * U[10] - U[12] * U[2] * U[9]), F * (-U[0] * U[5] * U[14] + U[0] * U[6] * U[13] + U[4] * U[1] * U[14] - U[4] * U[2] * U[13] - U[12] * U[1] * U[6] + U[12] * U[2] * U[5]), F * (U[0] * U[5] * U[10] - U[0] * U[6] * U[9] - U[4] * U[1] * U[10] + U[4] * U[2] * U[9] + U[8] * U[1] * U[6] - U[8] * U[2] * U[5]));
  }
  static Compose(U, Q, F) {
    const l = Q.x, R = Q.y, d = Q.z, t = Q.w, V = l + l, B = R + R, Z = d + d, e = l * V, b = l * B, J = l * Z, i = R * B, r = R * Z, p = d * Z, H = t * V, x = t * B, D = t * Z, z = F.x, w = F.y, f = F.z;
    return new K((1 - (i + p)) * z, (b + D) * z, (J - x) * z, 0, (b - D) * w, (1 - (e + p)) * w, (r + H) * w, 0, (J + x) * f, (r - H) * f, (1 - (e + i)) * f, 0, U.x, U.y, U.z, 1);
  }
  toString() {
    return `[${this.buffer.join(", ")}]`;
  }
}
class zU extends Event {
  constructor(U) {
    super("objectAdded"), this.object = U;
  }
}
class MU extends Event {
  constructor(U) {
    super("objectRemoved"), this.object = U;
  }
}
class vU extends Event {
  constructor(U) {
    super("objectChanged"), this.object = U;
  }
}
class CU extends oU {
  constructor() {
    super(), this.positionChanged = !1, this.rotationChanged = !1, this.scaleChanged = !1, this._position = new m(), this._rotation = new y(), this._scale = new m(1, 1, 1), this._transform = new K(), this._changeEvent = new vU(this), this.update = () => {
    }, this.applyPosition = () => {
      this.position = new m();
    }, this.applyRotation = () => {
      this.rotation = new y();
    }, this.applyScale = () => {
      this.scale = new m(1, 1, 1);
    }, this.raiseChangeEvent = () => {
      this.dispatchEvent(this._changeEvent);
    };
  }
  _updateMatrix() {
    this._transform = K.Compose(this._position, this._rotation, this._scale);
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
    let U = new m(0, 0, 1);
    return U = this.rotation.apply(U), U;
  }
  get transform() {
    return this._transform;
  }
}
class _ {
  constructor(U = 1, Q = 0, F = 0, l = 0, R = 1, d = 0, t = 0, V = 0, B = 1) {
    this.buffer = [U, Q, F, l, R, d, t, V, B];
  }
  equals(U) {
    if (this.buffer.length !== U.buffer.length) return !1;
    if (this.buffer === U.buffer) return !0;
    for (let Q = 0; Q < this.buffer.length; Q++) if (this.buffer[Q] !== U.buffer[Q]) return !1;
    return !0;
  }
  multiply(U) {
    const Q = this.buffer, F = U.buffer;
    return new _(F[0] * Q[0] + F[3] * Q[1] + F[6] * Q[2], F[1] * Q[0] + F[4] * Q[1] + F[7] * Q[2], F[2] * Q[0] + F[5] * Q[1] + F[8] * Q[2], F[0] * Q[3] + F[3] * Q[4] + F[6] * Q[5], F[1] * Q[3] + F[4] * Q[4] + F[7] * Q[5], F[2] * Q[3] + F[5] * Q[4] + F[8] * Q[5], F[0] * Q[6] + F[3] * Q[7] + F[6] * Q[8], F[1] * Q[6] + F[4] * Q[7] + F[7] * Q[8], F[2] * Q[6] + F[5] * Q[7] + F[8] * Q[8]);
  }
  clone() {
    const U = this.buffer;
    return new _(U[0], U[1], U[2], U[3], U[4], U[5], U[6], U[7], U[8]);
  }
  static Eye(U = 1) {
    return new _(U, 0, 0, 0, U, 0, 0, 0, U);
  }
  static Diagonal(U) {
    return new _(U.x, 0, 0, 0, U.y, 0, 0, 0, U.z);
  }
  static RotationFromQuaternion(U) {
    return new _(1 - 2 * U.y * U.y - 2 * U.z * U.z, 2 * U.x * U.y - 2 * U.z * U.w, 2 * U.x * U.z + 2 * U.y * U.w, 2 * U.x * U.y + 2 * U.z * U.w, 1 - 2 * U.x * U.x - 2 * U.z * U.z, 2 * U.y * U.z - 2 * U.x * U.w, 2 * U.x * U.z - 2 * U.y * U.w, 2 * U.y * U.z + 2 * U.x * U.w, 1 - 2 * U.x * U.x - 2 * U.y * U.y);
  }
  static RotationFromEuler(U) {
    const Q = Math.cos(U.x), F = Math.sin(U.x), l = Math.cos(U.y), R = Math.sin(U.y), d = Math.cos(U.z), t = Math.sin(U.z);
    return new _(l * d + R * F * t, -l * t + R * F * d, R * Q, Q * t, Q * d, -F, -R * d + l * F * t, R * t + l * F * d, l * Q);
  }
  toString() {
    return `[${this.buffer.join(", ")}]`;
  }
}
class QU {
  constructor(U = 0, Q = null, F = null, l = null, R = null) {
    this.changed = !1, this.detached = !1, this._vertexCount = U, this._positions = Q || new Float32Array(0), this._rotations = F || new Float32Array(0), this._scales = l || new Float32Array(0), this._colors = R || new Uint8Array(0), this._selection = new Uint8Array(this.vertexCount), this.translate = (d) => {
      for (let t = 0; t < this.vertexCount; t++) this.positions[3 * t + 0] += d.x, this.positions[3 * t + 1] += d.y, this.positions[3 * t + 2] += d.z;
      this.changed = !0;
    }, this.rotate = (d) => {
      const t = _.RotationFromQuaternion(d).buffer;
      for (let V = 0; V < this.vertexCount; V++) {
        const B = this.positions[3 * V + 0], Z = this.positions[3 * V + 1], e = this.positions[3 * V + 2];
        this.positions[3 * V + 0] = t[0] * B + t[1] * Z + t[2] * e, this.positions[3 * V + 1] = t[3] * B + t[4] * Z + t[5] * e, this.positions[3 * V + 2] = t[6] * B + t[7] * Z + t[8] * e;
        const b = new y(this.rotations[4 * V + 1], this.rotations[4 * V + 2], this.rotations[4 * V + 3], this.rotations[4 * V + 0]), J = d.multiply(b);
        this.rotations[4 * V + 1] = J.x, this.rotations[4 * V + 2] = J.y, this.rotations[4 * V + 3] = J.z, this.rotations[4 * V + 0] = J.w;
      }
      this.changed = !0;
    }, this.scale = (d) => {
      for (let t = 0; t < this.vertexCount; t++) this.positions[3 * t + 0] *= d.x, this.positions[3 * t + 1] *= d.y, this.positions[3 * t + 2] *= d.z, this.scales[3 * t + 0] *= d.x, this.scales[3 * t + 1] *= d.y, this.scales[3 * t + 2] *= d.z;
      this.changed = !0;
    }, this.serialize = () => {
      const d = new Uint8Array(this.vertexCount * QU.RowLength), t = new Float32Array(d.buffer), V = new Uint8Array(d.buffer);
      for (let B = 0; B < this.vertexCount; B++) t[8 * B + 0] = this.positions[3 * B + 0], t[8 * B + 1] = this.positions[3 * B + 1], t[8 * B + 2] = this.positions[3 * B + 2], V[32 * B + 24 + 0] = this.colors[4 * B + 0], V[32 * B + 24 + 1] = this.colors[4 * B + 1], V[32 * B + 24 + 2] = this.colors[4 * B + 2], V[32 * B + 24 + 3] = this.colors[4 * B + 3], t[8 * B + 3 + 0] = this.scales[3 * B + 0], t[8 * B + 3 + 1] = this.scales[3 * B + 1], t[8 * B + 3 + 2] = this.scales[3 * B + 2], V[32 * B + 28 + 0] = 128 * this.rotations[4 * B + 0] + 128 & 255, V[32 * B + 28 + 1] = 128 * this.rotations[4 * B + 1] + 128 & 255, V[32 * B + 28 + 2] = 128 * this.rotations[4 * B + 2] + 128 & 255, V[32 * B + 28 + 3] = 128 * this.rotations[4 * B + 3] + 128 & 255;
      return d;
    }, this.reattach = (d, t, V, B, Z) => {
      console.assert(d.byteLength === 3 * this.vertexCount * 4, `Expected ${3 * this.vertexCount * 4} bytes, got ${d.byteLength} bytes`), this._positions = new Float32Array(d), this._rotations = new Float32Array(t), this._scales = new Float32Array(V), this._colors = new Uint8Array(B), this._selection = new Uint8Array(Z), this.detached = !1;
    };
  }
  static Deserialize(U) {
    const Q = U.length / QU.RowLength, F = new Float32Array(3 * Q), l = new Float32Array(4 * Q), R = new Float32Array(3 * Q), d = new Uint8Array(4 * Q), t = new Float32Array(U.buffer), V = new Uint8Array(U.buffer);
    for (let B = 0; B < Q; B++) F[3 * B + 0] = t[8 * B + 0], F[3 * B + 1] = t[8 * B + 1], F[3 * B + 2] = t[8 * B + 2], l[4 * B + 0] = (V[32 * B + 28 + 0] - 128) / 128, l[4 * B + 1] = (V[32 * B + 28 + 1] - 128) / 128, l[4 * B + 2] = (V[32 * B + 28 + 2] - 128) / 128, l[4 * B + 3] = (V[32 * B + 28 + 3] - 128) / 128, R[3 * B + 0] = t[8 * B + 3 + 0], R[3 * B + 1] = t[8 * B + 3 + 1], R[3 * B + 2] = t[8 * B + 3 + 2], d[4 * B + 0] = V[32 * B + 24 + 0], d[4 * B + 1] = V[32 * B + 24 + 1], d[4 * B + 2] = V[32 * B + 24 + 2], d[4 * B + 3] = V[32 * B + 24 + 3];
    return new QU(Q, F, l, R, d);
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
QU.RowLength = 32;
class aU {
  static SplatToPLY(U, Q) {
    let F = `ply
format binary_little_endian 1.0
`;
    F += `element vertex ${Q}
`;
    const l = ["x", "y", "z", "nx", "ny", "nz", "f_dc_0", "f_dc_1", "f_dc_2"];
    for (let i = 0; i < 45; i++) l.push(`f_rest_${i}`);
    l.push("opacity"), l.push("scale_0"), l.push("scale_1"), l.push("scale_2"), l.push("rot_0"), l.push("rot_1"), l.push("rot_2"), l.push("rot_3");
    for (const i of l) F += `property float ${i}
`;
    F += `end_header
`;
    const R = new TextEncoder().encode(F), d = 248, t = Q * d, V = new DataView(new ArrayBuffer(R.length + t));
    new Uint8Array(V.buffer).set(R, 0);
    const B = new Float32Array(U), Z = new Uint8Array(U), e = R.length, b = 220, J = 232;
    for (let i = 0; i < Q; i++) {
      const r = B[8 * i + 0], p = B[8 * i + 1], H = B[8 * i + 2], x = (Z[32 * i + 24 + 0] / 255 - 0.5) / this.SH_C0, D = (Z[32 * i + 24 + 1] / 255 - 0.5) / this.SH_C0, z = (Z[32 * i + 24 + 2] / 255 - 0.5) / this.SH_C0, w = Z[32 * i + 24 + 3] / 255, f = Math.log(w / (1 - w)), k = Math.log(B[8 * i + 3 + 0]), j = Math.log(B[8 * i + 3 + 1]), M = Math.log(B[8 * i + 3 + 2]);
      let E = new y((Z[32 * i + 28 + 1] - 128) / 128, (Z[32 * i + 28 + 2] - 128) / 128, (Z[32 * i + 28 + 3] - 128) / 128, (Z[32 * i + 28 + 0] - 128) / 128);
      E = E.normalize();
      const L = E.w, N = E.x, X = E.y, tU = E.z;
      V.setFloat32(e + d * i + 0, r, !0), V.setFloat32(e + d * i + 4, p, !0), V.setFloat32(e + d * i + 8, H, !0), V.setFloat32(e + d * i + 24 + 0, x, !0), V.setFloat32(e + d * i + 24 + 4, D, !0), V.setFloat32(e + d * i + 24 + 8, z, !0), V.setFloat32(e + d * i + 216, f, !0), V.setFloat32(e + d * i + b + 0, k, !0), V.setFloat32(e + d * i + b + 4, j, !0), V.setFloat32(e + d * i + b + 8, M, !0), V.setFloat32(e + d * i + J + 0, L, !0), V.setFloat32(e + d * i + J + 4, N, !0), V.setFloat32(e + d * i + J + 8, X, !0), V.setFloat32(e + d * i + J + 12, tU, !0);
    }
    return V.buffer;
  }
}
aU.SH_C0 = 0.28209479177387814;
class eU {
  constructor(U, Q) {
    this.min = U, this.max = Q;
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
    const U = this.min, Q = this.max;
    this.min = new m(Math.min(U.x, Q.x), Math.min(U.y, Q.y), Math.min(U.z, Q.z)), this.max = new m(Math.max(U.x, Q.x), Math.max(U.y, Q.y), Math.max(U.z, Q.z));
  }
}
class q extends CU {
  constructor(U = void 0) {
    super(), this.selectedChanged = !1, this.colorTransformChanged = !1, this._selected = !1, this._colorTransforms = [], this._colorTransformsMap = /* @__PURE__ */ new Map(), this._data = U || new QU(), this._bounds = new eU(new m(1 / 0, 1 / 0, 1 / 0), new m(-1 / 0, -1 / 0, -1 / 0)), this.recalculateBounds = () => {
      this._bounds = new eU(new m(1 / 0, 1 / 0, 1 / 0), new m(-1 / 0, -1 / 0, -1 / 0));
      for (let Q = 0; Q < this._data.vertexCount; Q++) this._bounds.expand(new m(this._data.positions[3 * Q], this._data.positions[3 * Q + 1], this._data.positions[3 * Q + 2]));
    }, this.applyPosition = () => {
      this.data.translate(this.position), this.position = new m();
    }, this.applyRotation = () => {
      this.data.rotate(this.rotation), this.rotation = new y();
    }, this.applyScale = () => {
      this.data.scale(this.scale), this.scale = new m(1, 1, 1);
    }, this.recalculateBounds();
  }
  saveToFile(U = null, Q = null) {
    if (!document) return;
    if (Q) {
      if (Q !== "splat" && Q !== "ply") throw new Error("Invalid format. Must be 'splat' or 'ply'");
    } else Q = "splat";
    if (!U) {
      const d = /* @__PURE__ */ new Date();
      U = `splat-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.${Q}`;
    }
    this.applyRotation(), this.applyScale(), this.applyPosition();
    const F = this.data.serialize();
    let l;
    if (Q === "ply") {
      const d = aU.SplatToPLY(F.buffer, this.data.vertexCount);
      l = new Blob([d], { type: "application/octet-stream" });
    } else l = new Blob([F.buffer], { type: "application/octet-stream" });
    const R = document.createElement("a");
    R.download = U, R.href = URL.createObjectURL(l), R.click();
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
    let Q = this._bounds.size();
    return Q = Q.multiply(this.scale), new eU(U.subtract(Q.divide(2)), U.add(Q.divide(2)));
  }
}
class KU {
  constructor() {
    this._fx = 1132, this._fy = 1132, this._near = 0.1, this._far = 100, this._width = 512, this._height = 512, this._projectionMatrix = new K(), this._viewMatrix = new K(), this._viewProj = new K(), this._updateProjectionMatrix = () => {
      this._projectionMatrix = new K(2 * this.fx / this.width, 0, 0, 0, 0, -2 * this.fy / this.height, 0, 0, 0, 0, this.far / (this.far - this.near), 1, 0, 0, -this.far * this.near / (this.far - this.near), 0), this._viewProj = this.projectionMatrix.multiply(this.viewMatrix);
    }, this.update = (U, Q) => {
      const F = _.RotationFromQuaternion(Q).buffer, l = U.flat();
      this._viewMatrix = new K(F[0], F[1], F[2], 0, F[3], F[4], F[5], 0, F[6], F[7], F[8], 0, -l[0] * F[0] - l[1] * F[3] - l[2] * F[6], -l[0] * F[1] - l[1] * F[4] - l[2] * F[7], -l[0] * F[2] - l[1] * F[5] - l[2] * F[8], 1), this._viewProj = this.projectionMatrix.multiply(this.viewMatrix);
    }, this.setSize = (U, Q) => {
      this._width = U, this._height = Q, this._updateProjectionMatrix();
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
class v {
  constructor(U = 0, Q = 0, F = 0, l = 0) {
    this.x = U, this.y = Q, this.z = F, this.w = l;
  }
  equals(U) {
    return this.x === U.x && this.y === U.y && this.z === U.z && this.w === U.w;
  }
  add(U) {
    return typeof U == "number" ? new v(this.x + U, this.y + U, this.z + U, this.w + U) : new v(this.x + U.x, this.y + U.y, this.z + U.z, this.w + U.w);
  }
  subtract(U) {
    return typeof U == "number" ? new v(this.x - U, this.y - U, this.z - U, this.w - U) : new v(this.x - U.x, this.y - U.y, this.z - U.z, this.w - U.w);
  }
  multiply(U) {
    return typeof U == "number" ? new v(this.x * U, this.y * U, this.z * U, this.w * U) : U instanceof v ? new v(this.x * U.x, this.y * U.y, this.z * U.z, this.w * U.w) : new v(this.x * U.buffer[0] + this.y * U.buffer[4] + this.z * U.buffer[8] + this.w * U.buffer[12], this.x * U.buffer[1] + this.y * U.buffer[5] + this.z * U.buffer[9] + this.w * U.buffer[13], this.x * U.buffer[2] + this.y * U.buffer[6] + this.z * U.buffer[10] + this.w * U.buffer[14], this.x * U.buffer[3] + this.y * U.buffer[7] + this.z * U.buffer[11] + this.w * U.buffer[15]);
  }
  dot(U) {
    return this.x * U.x + this.y * U.y + this.z * U.z + this.w * U.w;
  }
  lerp(U, Q) {
    return new v(this.x + (U.x - this.x) * Q, this.y + (U.y - this.y) * Q, this.z + (U.z - this.z) * Q, this.w + (U.w - this.w) * Q);
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  distanceTo(U) {
    return Math.sqrt((this.x - U.x) ** 2 + (this.y - U.y) ** 2 + (this.z - U.z) ** 2 + (this.w - U.w) ** 2);
  }
  normalize() {
    const U = this.magnitude();
    return new v(this.x / U, this.y / U, this.z / U, this.w / U);
  }
  flat() {
    return [this.x, this.y, this.z, this.w];
  }
  clone() {
    return new v(this.x, this.y, this.z, this.w);
  }
  toString() {
    return `[${this.flat().join(", ")}]`;
  }
}
class lF extends CU {
  constructor(U = void 0) {
    super(), this._data = U || new KU(), this._position = new m(0, 0, -5), this.update = () => {
      this.data.update(this.position, this.rotation);
    }, this.screenPointToRay = (Q, F) => {
      const l = new v(Q, F, -1, 1), R = this._data.projectionMatrix.invert(), d = l.multiply(R), t = this._data.viewMatrix.invert(), V = d.multiply(t);
      return new m(V.x / V.w, V.y / V.w, V.z / V.w).subtract(this.position).normalize();
    };
  }
  get data() {
    return this._data;
  }
}
class QF extends oU {
  constructor() {
    super(), this._objects = [], this.addObject = (U) => {
      this.objects.push(U), this.dispatchEvent(new zU(U));
    }, this.removeObject = (U) => {
      const Q = this.objects.indexOf(U);
      if (Q < 0) throw new Error("Object not found in scene");
      this.objects.splice(Q, 1), this.dispatchEvent(new MU(U));
    }, this.findObject = (U) => {
      for (const Q of this.objects) if (U(Q)) return Q;
    }, this.findObjectOfType = (U) => {
      for (const Q of this.objects) if (Q instanceof U) return Q;
    }, this.reset = () => {
      const U = this.objects.slice();
      for (const Q of U) this.removeObject(Q);
    }, this.reset();
  }
  saveToFile(U = null, Q = null) {
    if (!document) return;
    if (Q) {
      if (Q !== "splat" && Q !== "ply") throw new Error("Invalid format. Must be 'splat' or 'ply'");
    } else Q = "splat";
    if (!U) {
      const B = /* @__PURE__ */ new Date();
      U = `scene-${B.getFullYear()}-${B.getMonth() + 1}-${B.getDate()}.${Q}`;
    }
    const F = [];
    let l = 0;
    for (const B of this.objects) if (B.applyRotation(), B.applyScale(), B.applyPosition(), B instanceof q) {
      const Z = B.data.serialize();
      F.push(Z), l += B.data.vertexCount;
    }
    const R = new Uint8Array(l * QU.RowLength);
    let d, t = 0;
    for (const B of F) R.set(B, t), t += B.length;
    if (Q === "ply") {
      const B = aU.SplatToPLY(R.buffer, l);
      d = new Blob([B], { type: "application/octet-stream" });
    } else d = new Blob([R.buffer], { type: "application/octet-stream" });
    const V = document.createElement("a");
    V.download = U, V.href = URL.createObjectURL(d), V.click();
  }
  get objects() {
    return this._objects;
  }
}
async function jU(g, U) {
  const Q = await fetch(g, { mode: "cors", credentials: "omit", cache: U ? "force-cache" : "default" });
  if (Q.status != 200) throw new Error(Q.status + " Unable to load " + Q.url);
  return Q;
}
async function OU(g, U) {
  return g.headers.has("content-length") ? async function(Q, F) {
    const l = Q.body.getReader(), R = parseInt(Q.headers.get("content-length")), d = new Uint8Array(R);
    let t = 0;
    for (; ; ) {
      const { done: V, value: B } = await l.read();
      if (V) break;
      d.set(B, t), t += B.length, F == null || F(t / R);
    }
    return d;
  }(g, U) : async function(Q, F) {
    const l = Q.body.getReader(), R = [];
    let d = 0;
    for (; ; ) {
      const { done: B, value: Z } = await l.read();
      if (B) break;
      R.push(Z), d += Z.length;
    }
    const t = new Uint8Array(d);
    let V = 0;
    for (const B of R) t.set(B, V), V += B.length, F == null || F(V / d);
    return t;
  }(g, U);
}
class dF {
  static async LoadAsync(U, Q, F, l = !1) {
    const R = await jU(U, l), d = await OU(R, F);
    return this.LoadFromArrayBuffer(d, Q);
  }
  static async LoadFromFileAsync(U, Q, F) {
    const l = new FileReader();
    let R = new q();
    return l.onload = (d) => {
      R = this.LoadFromArrayBuffer(d.target.result, Q);
    }, l.onprogress = (d) => {
      F == null || F(d.loaded / d.total);
    }, l.readAsArrayBuffer(U), await new Promise((d) => {
      l.onloadend = () => {
        d();
      };
    }), R;
  }
  static LoadFromArrayBuffer(U, Q) {
    const F = new Uint8Array(U), l = QU.Deserialize(F), R = new q(l);
    return Q.addObject(R), R;
  }
}
function PU(g, U, Q) {
  var F = function(t, V) {
    var B = atob(t);
    return B;
  }(g), l = F.indexOf(`
`, 10) + 1, R = F.substring(l) + "", d = new Blob([R], { type: "application/javascript" });
  return URL.createObjectURL(d);
}
function rU(g, U, Q) {
  var F;
  return function(l) {
    return F = F || PU(g), new Worker(F, l);
  };
}
var LU = rU("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgdmFyIGxvYWRXYXNtID0gKCgpID0+IHsKICAgIAogICAgcmV0dXJuICgKICBmdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkgewoKICB2YXIgTW9kdWxlPW1vZHVsZUFyZzt2YXIgcmVhZHlQcm9taXNlUmVzb2x2ZSxyZWFkeVByb21pc2VSZWplY3Q7TW9kdWxlWyJyZWFkeSJdPW5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntyZWFkeVByb21pc2VSZXNvbHZlPXJlc29sdmU7cmVhZHlQcm9taXNlUmVqZWN0PXJlamVjdDt9KTt2YXIgbW9kdWxlT3ZlcnJpZGVzPU9iamVjdC5hc3NpZ24oe30sTW9kdWxlKTt2YXIgc2NyaXB0RGlyZWN0b3J5PSIiO2Z1bmN0aW9uIGxvY2F0ZUZpbGUocGF0aCl7aWYoTW9kdWxlWyJsb2NhdGVGaWxlIl0pe3JldHVybiBNb2R1bGVbImxvY2F0ZUZpbGUiXShwYXRoLHNjcmlwdERpcmVjdG9yeSl9cmV0dXJuIHNjcmlwdERpcmVjdG9yeStwYXRofXZhciByZWFkQmluYXJ5O3t7c2NyaXB0RGlyZWN0b3J5PXNlbGYubG9jYXRpb24uaHJlZjt9aWYoc2NyaXB0RGlyZWN0b3J5LmluZGV4T2YoImJsb2I6IikhPT0wKXtzY3JpcHREaXJlY3Rvcnk9c2NyaXB0RGlyZWN0b3J5LnN1YnN0cigwLHNjcmlwdERpcmVjdG9yeS5yZXBsYWNlKC9bPyNdLiovLCIiKS5sYXN0SW5kZXhPZigiLyIpKzEpO31lbHNlIHtzY3JpcHREaXJlY3Rvcnk9IiI7fXt7cmVhZEJpbmFyeT11cmw9Pnt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKX07fX19TW9kdWxlWyJwcmludCJdfHxjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO3ZhciBlcnI9TW9kdWxlWyJwcmludEVyciJdfHxjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihNb2R1bGUsbW9kdWxlT3ZlcnJpZGVzKTttb2R1bGVPdmVycmlkZXM9bnVsbDtpZihNb2R1bGVbImFyZ3VtZW50cyJdKU1vZHVsZVsiYXJndW1lbnRzIl07aWYoTW9kdWxlWyJ0aGlzUHJvZ3JhbSJdKU1vZHVsZVsidGhpc1Byb2dyYW0iXTtpZihNb2R1bGVbInF1aXQiXSlNb2R1bGVbInF1aXQiXTt2YXIgd2FzbUJpbmFyeTtpZihNb2R1bGVbIndhc21CaW5hcnkiXSl3YXNtQmluYXJ5PU1vZHVsZVsid2FzbUJpbmFyeSJdO2lmKHR5cGVvZiBXZWJBc3NlbWJseSE9Im9iamVjdCIpe2Fib3J0KCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkIik7fXZhciB3YXNtTWVtb3J5O3ZhciBBQk9SVD1mYWxzZTt2YXIgSEVBUDgsSEVBUFU4LEhFQVAxNixIRUFQVTE2LEhFQVAzMixIRUFQVTMyLEhFQVBGMzIsSEVBUEY2NDtmdW5jdGlvbiB1cGRhdGVNZW1vcnlWaWV3cygpe3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO01vZHVsZVsiSEVBUDgiXT1IRUFQOD1uZXcgSW50OEFycmF5KGIpO01vZHVsZVsiSEVBUDE2Il09SEVBUDE2PW5ldyBJbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUFU4Il09SEVBUFU4PW5ldyBVaW50OEFycmF5KGIpO01vZHVsZVsiSEVBUFUxNiJdPUhFQVBVMTY9bmV3IFVpbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUDMyIl09SEVBUDMyPW5ldyBJbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUFUzMiJdPUhFQVBVMzI9bmV3IFVpbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUEYzMiJdPUhFQVBGMzI9bmV3IEZsb2F0MzJBcnJheShiKTtNb2R1bGVbIkhFQVBGNjQiXT1IRUFQRjY0PW5ldyBGbG9hdDY0QXJyYXkoYik7fXZhciBfX0FUUFJFUlVOX189W107dmFyIF9fQVRJTklUX189W107dmFyIF9fQVRQT1NUUlVOX189W107ZnVuY3Rpb24gcHJlUnVuKCl7aWYoTW9kdWxlWyJwcmVSdW4iXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlUnVuIl09PSJmdW5jdGlvbiIpTW9kdWxlWyJwcmVSdW4iXT1bTW9kdWxlWyJwcmVSdW4iXV07d2hpbGUoTW9kdWxlWyJwcmVSdW4iXS5sZW5ndGgpe2FkZE9uUHJlUnVuKE1vZHVsZVsicHJlUnVuIl0uc2hpZnQoKSk7fX1jYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUFJFUlVOX18pO31mdW5jdGlvbiBpbml0UnVudGltZSgpe2NhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pO31mdW5jdGlvbiBwb3N0UnVuKCl7aWYoTW9kdWxlWyJwb3N0UnVuIl0pe2lmKHR5cGVvZiBNb2R1bGVbInBvc3RSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInBvc3RSdW4iXT1bTW9kdWxlWyJwb3N0UnVuIl1dO3doaWxlKE1vZHVsZVsicG9zdFJ1biJdLmxlbmd0aCl7YWRkT25Qb3N0UnVuKE1vZHVsZVsicG9zdFJ1biJdLnNoaWZ0KCkpO319Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBPU1RSVU5fXyk7fWZ1bmN0aW9uIGFkZE9uUHJlUnVuKGNiKXtfX0FUUFJFUlVOX18udW5zaGlmdChjYik7fWZ1bmN0aW9uIGFkZE9uSW5pdChjYil7X19BVElOSVRfXy51bnNoaWZ0KGNiKTt9ZnVuY3Rpb24gYWRkT25Qb3N0UnVuKGNiKXtfX0FUUE9TVFJVTl9fLnVuc2hpZnQoY2IpO312YXIgcnVuRGVwZW5kZW5jaWVzPTA7dmFyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2Z1bmN0aW9uIGFkZFJ1bkRlcGVuZGVuY3koaWQpe3J1bkRlcGVuZGVuY2llcysrO2lmKE1vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKXtNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXShydW5EZXBlbmRlbmNpZXMpO319ZnVuY3Rpb24gcmVtb3ZlUnVuRGVwZW5kZW5jeShpZCl7cnVuRGVwZW5kZW5jaWVzLS07aWYoTW9kdWxlWyJtb25pdG9yUnVuRGVwZW5kZW5jaWVzIl0pe01vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKHJ1bkRlcGVuZGVuY2llcyk7fWlmKHJ1bkRlcGVuZGVuY2llcz09MCl7aWYoZGVwZW5kZW5jaWVzRnVsZmlsbGVkKXt2YXIgY2FsbGJhY2s9ZGVwZW5kZW5jaWVzRnVsZmlsbGVkO2RlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2NhbGxiYWNrKCk7fX19ZnVuY3Rpb24gYWJvcnQod2hhdCl7aWYoTW9kdWxlWyJvbkFib3J0Il0pe01vZHVsZVsib25BYm9ydCJdKHdoYXQpO313aGF0PSJBYm9ydGVkKCIrd2hhdCsiKSI7ZXJyKHdoYXQpO0FCT1JUPXRydWU7d2hhdCs9Ii4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby4iO3ZhciBlPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdCk7cmVhZHlQcm9taXNlUmVqZWN0KGUpO3Rocm93IGV9dmFyIGRhdGFVUklQcmVmaXg9ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCwiO3ZhciBpc0RhdGFVUkk9ZmlsZW5hbWU9PmZpbGVuYW1lLnN0YXJ0c1dpdGgoZGF0YVVSSVByZWZpeCk7dmFyIHdhc21CaW5hcnlGaWxlO3dhc21CaW5hcnlGaWxlPSJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsQUdGemJRRUFBQUFCV2cxZ0JIOS9mMzhBWUFOL2YzOEFZQVYvZjM5L2Z3QmdCbjkvZjM5L2Z3QmdBWDhCZjJBQUFHQUNmMzhBWUFOL2YzOEJmMkFCZndCZ0IzOS9mMzkvZjM4QVlBSi9md0YvWUFSL2YzNStBR0FKZjM5L2YzOS9mMzkvQUFJOUNnRmhBV0VBQVFGaEFXSUFBZ0ZoQVdNQUFRRmhBV1FBQmdGaEFXVUFBUUZoQVdZQUNRRmhBV2NBQkFGaEFXZ0FCZ0ZoQVdrQUFBRmhBV29BQmdNWkdBY0VDQVVJQ2dVTEFRQUJDQVFGQXdNQ0FnQUFCd2NFREFRRkFYQUJFQkFGQndFQmdBS0FnQUlHQ0FGL0FVSGduUVFMQngwSEFXc0NBQUZzQUEwQmJRQWhBVzRBRndGdkFRQUJjQUFXQVhFQURna1ZBUUJCQVFzUEVDQU1GUlVmREI0WUdoME1HUnNjQ3ZCSUdIRUJBWDhnQWtVRVFDQUFLQUlFSUFFb0FnUkdEd3NnQUNBQlJnUkFRUUVQQ3dKQUlBQW9BZ1FpQWkwQUFDSUFSU0FBSUFFb0FnUWlBUzBBQUNJRFIzSU5BQU5BSUFFdEFBRWhBeUFDTFFBQklnQkZEUUVnQVVFQmFpRUJJQUpCQVdvaEFpQUFJQU5HRFFBTEN5QUFJQU5HQzA4QkFuOUIyQmtvQWdBaUFTQUFRUWRxUVhoeElnSnFJUUFDUUNBQ1FRQWdBQ0FCVFJzTkFDQUFQd0JCRUhSTEJFQWdBQkFHUlEwQkMwSFlHU0FBTmdJQUlBRVBDMEhvR1VFd05nSUFRWDhMQmdBZ0FCQU9DeWtBUWVBWlFRRTJBZ0JCNUJsQkFEWUNBQkFRUWVRWlFkd1pLQUlBTmdJQVFkd1pRZUFaTmdJQUM5SUxBUWQvQWtBZ0FFVU5BQ0FBUVFocklnSWdBRUVFYXlnQ0FDSUJRWGh4SWdCcUlRVUNRQ0FCUVFGeERRQWdBVUVEY1VVTkFTQUNJQUlvQWdBaUFXc2lBa0g4R1NnQ0FFa05BU0FBSUFGcUlRQUNRQUpBUVlBYUtBSUFJQUpIQkVBZ0FVSC9BVTBFUUNBQlFRTjJJUVFnQWlnQ0RDSUJJQUlvQWdnaUEwWUVRRUhzR1VIc0dTZ0NBRUYrSUFSM2NUWUNBQXdGQ3lBRElBRTJBZ3dnQVNBRE5nSUlEQVFMSUFJb0FoZ2hCaUFDSUFJb0Fnd2lBVWNFUUNBQ0tBSUlJZ01nQVRZQ0RDQUJJQU0yQWdnTUF3c2dBa0VVYWlJRUtBSUFJZ05GQkVBZ0FpZ0NFQ0lEUlEwQ0lBSkJFR29oQkFzRFFDQUVJUWNnQXlJQlFSUnFJZ1FvQWdBaUF3MEFJQUZCRUdvaEJDQUJLQUlRSWdNTkFBc2dCMEVBTmdJQURBSUxJQVVvQWdRaUFVRURjVUVEUncwQ1FmUVpJQUEyQWdBZ0JTQUJRWDV4TmdJRUlBSWdBRUVCY2pZQ0JDQUZJQUEyQWdBUEMwRUFJUUVMSUFaRkRRQUNRQ0FDS0FJY0lnTkJBblJCbkJ4cUlnUW9BZ0FnQWtZRVFDQUVJQUUyQWdBZ0FRMEJRZkFaUWZBWktBSUFRWDRnQTNkeE5nSUFEQUlMSUFaQkVFRVVJQVlvQWhBZ0FrWWJhaUFCTmdJQUlBRkZEUUVMSUFFZ0JqWUNHQ0FDS0FJUUlnTUVRQ0FCSUFNMkFoQWdBeUFCTmdJWUN5QUNLQUlVSWdORkRRQWdBU0FETmdJVUlBTWdBVFlDR0FzZ0FpQUZUdzBBSUFVb0FnUWlBVUVCY1VVTkFBSkFBa0FDUUFKQUlBRkJBbkZGQkVCQmhCb29BZ0FnQlVZRVFFR0VHaUFDTmdJQVFmZ1pRZmdaS0FJQUlBQnFJZ0EyQWdBZ0FpQUFRUUZ5TmdJRUlBSkJnQm9vQWdCSERRWkI5QmxCQURZQ0FFR0FHa0VBTmdJQUR3dEJnQm9vQWdBZ0JVWUVRRUdBR2lBQ05nSUFRZlFaUWZRWktBSUFJQUJxSWdBMkFnQWdBaUFBUVFGeU5nSUVJQUFnQW1vZ0FEWUNBQThMSUFGQmVIRWdBR29oQUNBQlFmOEJUUVJBSUFGQkEzWWhCQ0FGS0FJTUlnRWdCU2dDQ0NJRFJnUkFRZXdaUWV3WktBSUFRWDRnQkhkeE5nSUFEQVVMSUFNZ0FUWUNEQ0FCSUFNMkFnZ01CQXNnQlNnQ0dDRUdJQVVnQlNnQ0RDSUJSd1JBUWZ3WktBSUFHaUFGS0FJSUlnTWdBVFlDRENBQklBTTJBZ2dNQXdzZ0JVRVVhaUlFS0FJQUlnTkZCRUFnQlNnQ0VDSURSUTBDSUFWQkVHb2hCQXNEUUNBRUlRY2dBeUlCUVJScUlnUW9BZ0FpQXcwQUlBRkJFR29oQkNBQktBSVFJZ01OQUFzZ0IwRUFOZ0lBREFJTElBVWdBVUYrY1RZQ0JDQUNJQUJCQVhJMkFnUWdBQ0FDYWlBQU5nSUFEQU1MUVFBaEFRc2dCa1VOQUFKQUlBVW9BaHdpQTBFQ2RFR2NIR29pQkNnQ0FDQUZSZ1JBSUFRZ0FUWUNBQ0FCRFFGQjhCbEI4QmtvQWdCQmZpQURkM0UyQWdBTUFnc2dCa0VRUVJRZ0JpZ0NFQ0FGUmh0cUlBRTJBZ0FnQVVVTkFRc2dBU0FHTmdJWUlBVW9BaEFpQXdSQUlBRWdBellDRUNBRElBRTJBaGdMSUFVb0FoUWlBMFVOQUNBQklBTTJBaFFnQXlBQk5nSVlDeUFDSUFCQkFYSTJBZ1FnQUNBQ2FpQUFOZ0lBSUFKQmdCb29BZ0JIRFFCQjlCa2dBRFlDQUE4TElBQkIvd0ZOQkVBZ0FFRjRjVUdVR21vaEFRSi9RZXdaS0FJQUlnTkJBU0FBUVFOMmRDSUFjVVVFUUVIc0dTQUFJQU55TmdJQUlBRU1BUXNnQVNnQ0NBc2hBQ0FCSUFJMkFnZ2dBQ0FDTmdJTUlBSWdBVFlDRENBQ0lBQTJBZ2dQQzBFZklRTWdBRUgvLy84SFRRUkFJQUJCSmlBQVFRaDJaeUlCYTNaQkFYRWdBVUVCZEd0QlBtb2hBd3NnQWlBRE5nSWNJQUpDQURjQ0VDQURRUUowUVp3Y2FpRUJBa0FDUUFKQVFmQVpLQUlBSWdSQkFTQURkQ0lIY1VVRVFFSHdHU0FFSUFkeU5nSUFJQUVnQWpZQ0FDQUNJQUUyQWhnTUFRc2dBRUVaSUFOQkFYWnJRUUFnQTBFZlJ4dDBJUU1nQVNnQ0FDRUJBMEFnQVNJRUtBSUVRWGh4SUFCR0RRSWdBMEVkZGlFQklBTkJBWFFoQXlBRUlBRkJCSEZxSWdkQkVHb29BZ0FpQVEwQUN5QUhJQUkyQWhBZ0FpQUVOZ0lZQ3lBQ0lBSTJBZ3dnQWlBQ05nSUlEQUVMSUFRb0FnZ2lBQ0FDTmdJTUlBUWdBallDQ0NBQ1FRQTJBaGdnQWlBRU5nSU1JQUlnQURZQ0NBdEJqQnBCakJvb0FnQkJBV3NpQUVGL0lBQWJOZ0lBQ3dzcEFRRi9JQUVFUUNBQUlRSURRQ0FDUVFBNkFBQWdBa0VCYWlFQ0lBRkJBV3NpQVEwQUN3c2dBQXZoQXdCQmpCZEJtZ2tRQ1VHWUYwRzVDRUVCUVFBUUNFR2tGMEcwQ0VFQlFZQi9RZjhBRUFGQnZCZEJyUWhCQVVHQWYwSC9BQkFCUWJBWFFhc0lRUUZCQUVIL0FSQUJRY2dYUVlrSVFRSkJnSUIrUWYvL0FSQUJRZFFYUVlBSVFRSkJBRUgvL3dNUUFVSGdGMEdZQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCN0JkQmp3aEJCRUVBUVg4UUFVSDRGMEhYQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCaEJoQnpnaEJCRUVBUVg4UUFVR1FHRUdqQ0VLQWdJQ0FnSUNBZ0lCL1F2Ly8vLy8vLy8vLy93QVFFVUdjR0VHaUNFSUFRbjhRRVVHb0dFR2NDRUVFRUFSQnRCaEJrd2xCQ0JBRVFZUVBRZWtJRUFOQnpBOUJsdzBRQTBHVUVFRUVRZHdJRUFKQjRCQkJBa0gxQ0JBQ1Fhd1JRUVJCaEFrUUFrSElFVUcrQ0JBSFFmQVJRUUJCMGd3UUFFR1lFa0VBUWJnTkVBQkJ3QkpCQVVId0RCQUFRZWdTUVFKQm53a1FBRUdRRTBFRFFiNEpFQUJCdUJOQkJFSG1DUkFBUWVBVFFRVkJnd29RQUVHSUZFRUVRZDBORUFCQnNCUkJCVUg3RFJBQVFaZ1NRUUJCNlFvUUFFSEFFa0VCUWNnS0VBQkI2QkpCQWtHckN4QUFRWkFUUVFOQmlRc1FBRUc0RTBFRVFiRU1FQUJCNEJOQkJVR1BEQkFBUWRnVVFRaEI3Z3NRQUVHQUZVRUpRY3dMRUFCQnFCVkJCa0dwQ2hBQVFkQVZRUWRCb2c0UUFBc2NBQ0FBSUFGQkNDQUNweUFDUWlDSXB5QURweUFEUWlDSXB4QUZDeUFBQWtBZ0FDZ0NCQ0FCUncwQUlBQW9BaHhCQVVZTkFDQUFJQUkyQWh3TEM1b0JBQ0FBUVFFNkFEVUNRQ0FBS0FJRUlBSkhEUUFnQUVFQk9nQTBBa0FnQUNnQ0VDSUNSUVJBSUFCQkFUWUNKQ0FBSUFNMkFoZ2dBQ0FCTmdJUUlBTkJBVWNOQWlBQUtBSXdRUUZHRFFFTUFnc2dBU0FDUmdSQUlBQW9BaGdpQWtFQ1JnUkFJQUFnQXpZQ0dDQURJUUlMSUFBb0FqQkJBVWNOQWlBQ1FRRkdEUUVNQWdzZ0FDQUFLQUlrUVFGcU5nSWtDeUFBUVFFNkFEWUxDMTBCQVg4Z0FDZ0NFQ0lEUlFSQUlBQkJBVFlDSkNBQUlBSTJBaGdnQUNBQk5nSVFEd3NDUUNBQklBTkdCRUFnQUNnQ0dFRUNSdzBCSUFBZ0FqWUNHQThMSUFCQkFUb0FOaUFBUVFJMkFoZ2dBQ0FBS0FJa1FRRnFOZ0lrQ3dzQ0FBdTlKd0VNZnlNQVFSQnJJZ29rQUFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBZ0FFSDBBVTBFUUVIc0dTZ0NBQ0lHUVJBZ0FFRUxha0Y0Y1NBQVFRdEpHeUlGUVFOMklnQjJJZ0ZCQTNFRVFBSkFJQUZCZjNOQkFYRWdBR29pQWtFRGRDSUJRWlFhYWlJQUlBRkJuQnBxS0FJQUlnRW9BZ2dpQkVZRVFFSHNHU0FHUVg0Z0FuZHhOZ0lBREFFTElBUWdBRFlDRENBQUlBUTJBZ2dMSUFGQkNHb2hBQ0FCSUFKQkEzUWlBa0VEY2pZQ0JDQUJJQUpxSWdFZ0FTZ0NCRUVCY2pZQ0JBd1BDeUFGUWZRWktBSUFJZ2RORFFFZ0FRUkFBa0JCQWlBQWRDSUNRUUFnQW10eUlBRWdBSFJ4YUNJQlFRTjBJZ0JCbEJwcUlnSWdBRUdjR21vb0FnQWlBQ2dDQ0NJRVJnUkFRZXdaSUFaQmZpQUJkM0VpQmpZQ0FBd0JDeUFFSUFJMkFnd2dBaUFFTmdJSUN5QUFJQVZCQTNJMkFnUWdBQ0FGYWlJSUlBRkJBM1FpQVNBRmF5SUVRUUZ5TmdJRUlBQWdBV29nQkRZQ0FDQUhCRUFnQjBGNGNVR1VHbW9oQVVHQUdpZ0NBQ0VDQW44Z0JrRUJJQWRCQTNaMElnTnhSUVJBUWV3WklBTWdCbkkyQWdBZ0FRd0JDeUFCS0FJSUN5RURJQUVnQWpZQ0NDQURJQUkyQWd3Z0FpQUJOZ0lNSUFJZ0F6WUNDQXNnQUVFSWFpRUFRWUFhSUFnMkFnQkI5QmtnQkRZQ0FBd1BDMEh3R1NnQ0FDSUxSUTBCSUF0b1FRSjBRWndjYWlnQ0FDSUNLQUlFUVhoeElBVnJJUU1nQWlFQkEwQUNRQ0FCS0FJUUlnQkZCRUFnQVNnQ0ZDSUFSUTBCQ3lBQUtBSUVRWGh4SUFWcklnRWdBeUFCSUFOSklnRWJJUU1nQUNBQ0lBRWJJUUlnQUNFQkRBRUxDeUFDS0FJWUlRa2dBaUFDS0FJTUlnUkhCRUJCL0Jrb0FnQWFJQUlvQWdnaUFDQUVOZ0lNSUFRZ0FEWUNDQXdPQ3lBQ1FSUnFJZ0VvQWdBaUFFVUVRQ0FDS0FJUUlnQkZEUU1nQWtFUWFpRUJDd05BSUFFaENDQUFJZ1JCRkdvaUFTZ0NBQ0lBRFFBZ0JFRVFhaUVCSUFRb0FoQWlBQTBBQ3lBSVFRQTJBZ0FNRFF0QmZ5RUZJQUJCdjM5TERRQWdBRUVMYWlJQVFYaHhJUVZCOEJrb0FnQWlDRVVOQUVFQUlBVnJJUU1DUUFKQUFrQUNmMEVBSUFWQmdBSkpEUUFhUVI4Z0JVSC8vLzhIU3cwQUdpQUZRU1lnQUVFSWRtY2lBR3QyUVFGeElBQkJBWFJyUVQ1cUN5SUhRUUowUVp3Y2FpZ0NBQ0lCUlFSQVFRQWhBQXdCQzBFQUlRQWdCVUVaSUFkQkFYWnJRUUFnQjBFZlJ4dDBJUUlEUUFKQUlBRW9BZ1JCZUhFZ0JXc2lCaUFEVHcwQUlBRWhCQ0FHSWdNTkFFRUFJUU1nQVNFQURBTUxJQUFnQVNnQ0ZDSUdJQVlnQVNBQ1FSMTJRUVJ4YWlnQ0VDSUJSaHNnQUNBR0d5RUFJQUpCQVhRaEFpQUJEUUFMQ3lBQUlBUnlSUVJBUVFBaEJFRUNJQWQwSWdCQkFDQUFhM0lnQ0hFaUFFVU5BeUFBYUVFQ2RFR2NIR29vQWdBaEFBc2dBRVVOQVFzRFFDQUFLQUlFUVhoeElBVnJJZ0lnQTBraEFTQUNJQU1nQVJzaEF5QUFJQVFnQVJzaEJDQUFLQUlRSWdFRWZ5QUJCU0FBS0FJVUN5SUFEUUFMQ3lBRVJRMEFJQU5COUJrb0FnQWdCV3RQRFFBZ0JDZ0NHQ0VISUFRZ0JDZ0NEQ0lDUndSQVFmd1pLQUlBR2lBRUtBSUlJZ0FnQWpZQ0RDQUNJQUEyQWdnTURBc2dCRUVVYWlJQktBSUFJZ0JGQkVBZ0JDZ0NFQ0lBUlEwRElBUkJFR29oQVFzRFFDQUJJUVlnQUNJQ1FSUnFJZ0VvQWdBaUFBMEFJQUpCRUdvaEFTQUNLQUlRSWdBTkFBc2dCa0VBTmdJQURBc0xJQVZCOUJrb0FnQWlCRTBFUUVHQUdpZ0NBQ0VBQWtBZ0JDQUZheUlCUVJCUEJFQWdBQ0FGYWlJQ0lBRkJBWEkyQWdRZ0FDQUVhaUFCTmdJQUlBQWdCVUVEY2pZQ0JBd0JDeUFBSUFSQkEzSTJBZ1FnQUNBRWFpSUJJQUVvQWdSQkFYSTJBZ1JCQUNFQ1FRQWhBUXRCOUJrZ0FUWUNBRUdBR2lBQ05nSUFJQUJCQ0dvaEFBd05DeUFGUWZnWktBSUFJZ0pKQkVCQitCa2dBaUFGYXlJQk5nSUFRWVFhUVlRYUtBSUFJZ0FnQldvaUFqWUNBQ0FDSUFGQkFYSTJBZ1FnQUNBRlFRTnlOZ0lFSUFCQkNHb2hBQXdOQzBFQUlRQWdCVUV2YWlJREFuOUJ4QjBvQWdBRVFFSE1IU2dDQUF3QkMwSFFIVUovTndJQVFjZ2RRb0NnZ0lDQWdBUTNBZ0JCeEIwZ0NrRU1ha0Z3Y1VIWXF0V3FCWE0yQWdCQjJCMUJBRFlDQUVHb0hVRUFOZ0lBUVlBZ0N5SUJhaUlHUVFBZ0FXc2lDSEVpQVNBRlRRME1RYVFkS0FJQUlnUUVRRUdjSFNnQ0FDSUhJQUZxSWdrZ0IwMGdCQ0FKU1hJTkRRc0NRRUdvSFMwQUFFRUVjVVVFUUFKQUFrQUNRQUpBUVlRYUtBSUFJZ1FFUUVHc0hTRUFBMEFnQkNBQUtBSUFJZ2RQQkVBZ0J5QUFLQUlFYWlBRVN3MERDeUFBS0FJSUlnQU5BQXNMUVFBUUN5SUNRWDlHRFFNZ0FTRUdRY2dkS0FJQUlnQkJBV3NpQkNBQ2NRUkFJQUVnQW1zZ0FpQUVha0VBSUFCcmNXb2hCZ3NnQlNBR1R3MERRYVFkS0FJQUlnQUVRRUdjSFNnQ0FDSUVJQVpxSWdnZ0JFMGdBQ0FJU1hJTkJBc2dCaEFMSWdBZ0FrY05BUXdGQ3lBR0lBSnJJQWh4SWdZUUN5SUNJQUFvQWdBZ0FDZ0NCR3BHRFFFZ0FpRUFDeUFBUVg5R0RRRWdCVUV3YWlBR1RRUkFJQUFoQWd3RUMwSE1IU2dDQUNJQ0lBTWdCbXRxUVFBZ0FtdHhJZ0lRQzBGL1JnMEJJQUlnQm1vaEJpQUFJUUlNQXdzZ0FrRi9SdzBDQzBHb0hVR29IU2dDQUVFRWNqWUNBQXNnQVJBTElnSkJmMFpCQUJBTElnQkJmMFp5SUFBZ0FrMXlEUVVnQUNBQ2F5SUdJQVZCS0dwTkRRVUxRWndkUVp3ZEtBSUFJQVpxSWdBMkFnQkJvQjBvQWdBZ0FFa0VRRUdnSFNBQU5nSUFDd0pBUVlRYUtBSUFJZ01FUUVHc0hTRUFBMEFnQWlBQUtBSUFJZ0VnQUNnQ0JDSUVha1lOQWlBQUtBSUlJZ0FOQUFzTUJBdEIvQmtvQWdBaUFFRUFJQUFnQWswYlJRUkFRZndaSUFJMkFnQUxRUUFoQUVHd0hTQUdOZ0lBUWF3ZElBSTJBZ0JCakJwQmZ6WUNBRUdRR2tIRUhTZ0NBRFlDQUVHNEhVRUFOZ0lBQTBBZ0FFRURkQ0lCUVp3YWFpQUJRWlFhYWlJRU5nSUFJQUZCb0JwcUlBUTJBZ0FnQUVFQmFpSUFRU0JIRFFBTFFmZ1pJQVpCS0dzaUFFRjRJQUpyUVFkeElnRnJJZ1EyQWdCQmhCb2dBU0FDYWlJQk5nSUFJQUVnQkVFQmNqWUNCQ0FBSUFKcVFTZzJBZ1JCaUJwQjFCMG9BZ0EyQWdBTUJBc2dBaUFEVFNBQklBTkxjZzBDSUFBb0FneEJDSEVOQWlBQUlBUWdCbW8yQWdSQmhCb2dBMEY0SUFOclFRZHhJZ0JxSWdFMkFnQkIrQmxCK0Jrb0FnQWdCbW9pQWlBQWF5SUFOZ0lBSUFFZ0FFRUJjallDQkNBQ0lBTnFRU2cyQWdSQmlCcEIxQjBvQWdBMkFnQU1Bd3RCQUNFRURBb0xRUUFoQWd3SUMwSDhHU2dDQUNBQ1N3UkFRZndaSUFJMkFnQUxJQUlnQm1vaEFVR3NIU0VBQWtBQ1FBSkFBMEFnQVNBQUtBSUFSd1JBSUFBb0FnZ2lBQTBCREFJTEN5QUFMUUFNUVFoeFJRMEJDMEdzSFNFQUEwQWdBeUFBS0FJQUlnRlBCRUFnQVNBQUtBSUVhaUlFSUFOTERRTUxJQUFvQWdnaEFBd0FDd0FMSUFBZ0FqWUNBQ0FBSUFBb0FnUWdCbW8yQWdRZ0FrRjRJQUpyUVFkeGFpSUhJQVZCQTNJMkFnUWdBVUY0SUFGclFRZHhhaUlHSUFVZ0Iyb2lCV3NoQUNBRElBWkdCRUJCaEJvZ0JUWUNBRUg0R1VINEdTZ0NBQ0FBYWlJQU5nSUFJQVVnQUVFQmNqWUNCQXdJQzBHQUdpZ0NBQ0FHUmdSQVFZQWFJQVUyQWdCQjlCbEI5QmtvQWdBZ0FHb2lBRFlDQUNBRklBQkJBWEkyQWdRZ0FDQUZhaUFBTmdJQURBZ0xJQVlvQWdRaUEwRURjVUVCUncwR0lBTkJlSEVoQ1NBRFFmOEJUUVJBSUFZb0Fnd2lBU0FHS0FJSUlnSkdCRUJCN0JsQjdCa29BZ0JCZmlBRFFRTjJkM0UyQWdBTUJ3c2dBaUFCTmdJTUlBRWdBallDQ0F3R0N5QUdLQUlZSVFnZ0JpQUdLQUlNSWdKSEJFQWdCaWdDQ0NJQklBSTJBZ3dnQWlBQk5nSUlEQVVMSUFaQkZHb2lBU2dDQUNJRFJRUkFJQVlvQWhBaUEwVU5CQ0FHUVJCcUlRRUxBMEFnQVNFRUlBTWlBa0VVYWlJQktBSUFJZ01OQUNBQ1FSQnFJUUVnQWlnQ0VDSUREUUFMSUFSQkFEWUNBQXdFQzBINEdTQUdRU2hySWdCQmVDQUNhMEVIY1NJQmF5SUlOZ0lBUVlRYUlBRWdBbW9pQVRZQ0FDQUJJQWhCQVhJMkFnUWdBQ0FDYWtFb05nSUVRWWdhUWRRZEtBSUFOZ0lBSUFNZ0JFRW5JQVJyUVFkeGFrRXZheUlBSUFBZ0EwRVFha2tiSWdGQkd6WUNCQ0FCUWJRZEtRSUFOd0lRSUFGQnJCMHBBZ0EzQWdoQnRCMGdBVUVJYWpZQ0FFR3dIU0FHTmdJQVFhd2RJQUkyQWdCQnVCMUJBRFlDQUNBQlFSaHFJUUFEUUNBQVFRYzJBZ1FnQUVFSWFpRU1JQUJCQkdvaEFDQU1JQVJKRFFBTElBRWdBMFlOQUNBQklBRW9BZ1JCZm5FMkFnUWdBeUFCSUFOcklnSkJBWEkyQWdRZ0FTQUNOZ0lBSUFKQi93Rk5CRUFnQWtGNGNVR1VHbW9oQUFKL1Fld1pLQUlBSWdGQkFTQUNRUU4yZENJQ2NVVUVRRUhzR1NBQklBSnlOZ0lBSUFBTUFRc2dBQ2dDQ0FzaEFTQUFJQU0yQWdnZ0FTQUROZ0lNSUFNZ0FEWUNEQ0FESUFFMkFnZ01BUXRCSHlFQUlBSkIvLy8vQjAwRVFDQUNRU1lnQWtFSWRtY2lBR3QyUVFGeElBQkJBWFJyUVQ1cUlRQUxJQU1nQURZQ0hDQURRZ0EzQWhBZ0FFRUNkRUdjSEdvaEFRSkFBa0JCOEJrb0FnQWlCRUVCSUFCMElnWnhSUVJBUWZBWklBUWdCbkkyQWdBZ0FTQUROZ0lBREFFTElBSkJHU0FBUVFGMmEwRUFJQUJCSDBjYmRDRUFJQUVvQWdBaEJBTkFJQVFpQVNnQ0JFRjRjU0FDUmcwQ0lBQkJIWFloQkNBQVFRRjBJUUFnQVNBRVFRUnhhaUlHS0FJUUlnUU5BQXNnQmlBRE5nSVFDeUFESUFFMkFoZ2dBeUFETmdJTUlBTWdBellDQ0F3QkN5QUJLQUlJSWdBZ0F6WUNEQ0FCSUFNMkFnZ2dBMEVBTmdJWUlBTWdBVFlDRENBRElBQTJBZ2dMUWZnWktBSUFJZ0FnQlUwTkFFSDRHU0FBSUFWcklnRTJBZ0JCaEJwQmhCb29BZ0FpQUNBRmFpSUNOZ0lBSUFJZ0FVRUJjallDQkNBQUlBVkJBM0kyQWdRZ0FFRUlhaUVBREFnTFFlZ1pRVEEyQWdCQkFDRUFEQWNMUVFBaEFnc2dDRVVOQUFKQUlBWW9BaHdpQVVFQ2RFR2NIR29pQkNnQ0FDQUdSZ1JBSUFRZ0FqWUNBQ0FDRFFGQjhCbEI4QmtvQWdCQmZpQUJkM0UyQWdBTUFnc2dDRUVRUVJRZ0NDZ0NFQ0FHUmh0cUlBSTJBZ0FnQWtVTkFRc2dBaUFJTmdJWUlBWW9BaEFpQVFSQUlBSWdBVFlDRUNBQklBSTJBaGdMSUFZb0FoUWlBVVVOQUNBQ0lBRTJBaFFnQVNBQ05nSVlDeUFBSUFscUlRQWdCaUFKYWlJR0tBSUVJUU1MSUFZZ0EwRitjVFlDQkNBRklBQkJBWEkyQWdRZ0FDQUZhaUFBTmdJQUlBQkIvd0ZOQkVBZ0FFRjRjVUdVR21vaEFRSi9RZXdaS0FJQUlnSkJBU0FBUVFOMmRDSUFjVVVFUUVIc0dTQUFJQUp5TmdJQUlBRU1BUXNnQVNnQ0NBc2hBQ0FCSUFVMkFnZ2dBQ0FGTmdJTUlBVWdBVFlDRENBRklBQTJBZ2dNQVF0Qkh5RURJQUJCLy8vL0IwMEVRQ0FBUVNZZ0FFRUlkbWNpQVd0MlFRRnhJQUZCQVhSclFUNXFJUU1MSUFVZ0F6WUNIQ0FGUWdBM0FoQWdBMEVDZEVHY0hHb2hBUUpBQWtCQjhCa29BZ0FpQWtFQklBTjBJZ1J4UlFSQVFmQVpJQUlnQkhJMkFnQWdBU0FGTmdJQURBRUxJQUJCR1NBRFFRRjJhMEVBSUFOQkgwY2JkQ0VESUFFb0FnQWhBZ05BSUFJaUFTZ0NCRUY0Y1NBQVJnMENJQU5CSFhZaEFpQURRUUYwSVFNZ0FTQUNRUVJ4YWlJRUtBSVFJZ0lOQUFzZ0JDQUZOZ0lRQ3lBRklBRTJBaGdnQlNBRk5nSU1JQVVnQlRZQ0NBd0JDeUFCS0FJSUlnQWdCVFlDRENBQklBVTJBZ2dnQlVFQU5nSVlJQVVnQVRZQ0RDQUZJQUEyQWdnTElBZEJDR29oQUF3Q0N3SkFJQWRGRFFBQ1FDQUVLQUljSWdCQkFuUkJuQnhxSWdFb0FnQWdCRVlFUUNBQklBSTJBZ0FnQWcwQlFmQVpJQWhCZmlBQWQzRWlDRFlDQUF3Q0N5QUhRUkJCRkNBSEtBSVFJQVJHRzJvZ0FqWUNBQ0FDUlEwQkN5QUNJQWMyQWhnZ0JDZ0NFQ0lBQkVBZ0FpQUFOZ0lRSUFBZ0FqWUNHQXNnQkNnQ0ZDSUFSUTBBSUFJZ0FEWUNGQ0FBSUFJMkFoZ0xBa0FnQTBFUFRRUkFJQVFnQXlBRmFpSUFRUU55TmdJRUlBQWdCR29pQUNBQUtBSUVRUUZ5TmdJRURBRUxJQVFnQlVFRGNqWUNCQ0FFSUFWcUlnSWdBMEVCY2pZQ0JDQUNJQU5xSUFNMkFnQWdBMEgvQVUwRVFDQURRWGh4UVpRYWFpRUFBbjlCN0Jrb0FnQWlBVUVCSUFOQkEzWjBJZ054UlFSQVFld1pJQUVnQTNJMkFnQWdBQXdCQ3lBQUtBSUlDeUVCSUFBZ0FqWUNDQ0FCSUFJMkFnd2dBaUFBTmdJTUlBSWdBVFlDQ0F3QkMwRWZJUUFnQTBILy8vOEhUUVJBSUFOQkppQURRUWgyWnlJQWEzWkJBWEVnQUVFQmRHdEJQbW9oQUFzZ0FpQUFOZ0ljSUFKQ0FEY0NFQ0FBUVFKMFFad2NhaUVCQWtBQ1FDQUlRUUVnQUhRaUJuRkZCRUJCOEJrZ0JpQUljallDQUNBQklBSTJBZ0FNQVFzZ0EwRVpJQUJCQVhaclFRQWdBRUVmUnh0MElRQWdBU2dDQUNFRkEwQWdCU0lCS0FJRVFYaHhJQU5HRFFJZ0FFRWRkaUVHSUFCQkFYUWhBQ0FCSUFaQkJIRnFJZ1lvQWhBaUJRMEFDeUFHSUFJMkFoQUxJQUlnQVRZQ0dDQUNJQUkyQWd3Z0FpQUNOZ0lJREFFTElBRW9BZ2dpQUNBQ05nSU1JQUVnQWpZQ0NDQUNRUUEyQWhnZ0FpQUJOZ0lNSUFJZ0FEWUNDQXNnQkVFSWFpRUFEQUVMQWtBZ0NVVU5BQUpBSUFJb0Fod2lBRUVDZEVHY0hHb2lBU2dDQUNBQ1JnUkFJQUVnQkRZQ0FDQUVEUUZCOEJrZ0MwRitJQUIzY1RZQ0FBd0NDeUFKUVJCQkZDQUpLQUlRSUFKR0cyb2dCRFlDQUNBRVJRMEJDeUFFSUFrMkFoZ2dBaWdDRUNJQUJFQWdCQ0FBTmdJUUlBQWdCRFlDR0FzZ0FpZ0NGQ0lBUlEwQUlBUWdBRFlDRkNBQUlBUTJBaGdMQWtBZ0EwRVBUUVJBSUFJZ0F5QUZhaUlBUVFOeU5nSUVJQUFnQW1vaUFDQUFLQUlFUVFGeU5nSUVEQUVMSUFJZ0JVRURjallDQkNBQ0lBVnFJZ1FnQTBFQmNqWUNCQ0FESUFScUlBTTJBZ0FnQndSQUlBZEJlSEZCbEJwcUlRQkJnQm9vQWdBaEFRSi9RUUVnQjBFRGRuUWlCU0FHY1VVRVFFSHNHU0FGSUFaeU5nSUFJQUFNQVFzZ0FDZ0NDQXNoQmlBQUlBRTJBZ2dnQmlBQk5nSU1JQUVnQURZQ0RDQUJJQVkyQWdnTFFZQWFJQVEyQWdCQjlCa2dBellDQUFzZ0FrRUlhaUVBQ3lBS1FSQnFKQUFnQUFzakFRRi9RZHdaS0FJQUlnQUVRQU5BSUFBb0FnQVJCUUFnQUNnQ0JDSUFEUUFMQ3dzYUFDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFUQ3dzM0FDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFURHdzZ0FDZ0NDQ0lBSUFFZ0FpQURJQVFnQlNBQUtBSUFLQUlVRVFNQUM1RUJBQ0FBSUFFb0FnZ2dCQkFLQkVBZ0FTQUNJQU1RRWc4TEFrQWdBQ0FCS0FJQUlBUVFDa1VOQUFKQUlBSWdBU2dDRUVjRVFDQUJLQUlVSUFKSERRRUxJQU5CQVVjTkFTQUJRUUUyQWlBUEN5QUJJQUkyQWhRZ0FTQUROZ0lnSUFFZ0FTZ0NLRUVCYWpZQ0tBSkFJQUVvQWlSQkFVY05BQ0FCS0FJWVFRSkhEUUFnQVVFQk9nQTJDeUFCUVFRMkFpd0xDL0lCQUNBQUlBRW9BZ2dnQkJBS0JFQWdBU0FDSUFNUUVnOExBa0FnQUNBQktBSUFJQVFRQ2dSQUFrQWdBaUFCS0FJUVJ3UkFJQUVvQWhRZ0FrY05BUXNnQTBFQlJ3MENJQUZCQVRZQ0lBOExJQUVnQXpZQ0lBSkFJQUVvQWl4QkJFWU5BQ0FCUVFBN0FUUWdBQ2dDQ0NJQUlBRWdBaUFDUVFFZ0JDQUFLQUlBS0FJVUVRTUFJQUV0QURVRVFDQUJRUU0yQWl3Z0FTMEFORVVOQVF3REN5QUJRUVEyQWl3TElBRWdBallDRkNBQklBRW9BaWhCQVdvMkFpZ2dBU2dDSkVFQlJ3MEJJQUVvQWhoQkFrY05BU0FCUVFFNkFEWVBDeUFBS0FJSUlnQWdBU0FDSUFNZ0JDQUFLQUlBS0FJWUVRSUFDd3N4QUNBQUlBRW9BZ2hCQUJBS0JFQWdBU0FDSUFNUUZBOExJQUFvQWdnaUFDQUJJQUlnQXlBQUtBSUFLQUljRVFBQUN4Z0FJQUFnQVNnQ0NFRUFFQW9FUUNBQklBSWdBeEFVQ3d2S0F3RUZmeU1BUVVCcUlnUWtBQUovUVFFZ0FDQUJRUUFRQ2cwQUdrRUFJQUZGRFFBYUl3QkJRR29pQXlRQUlBRW9BZ0FpQlVFRWF5Z0NBQ0VHSUFWQkNHc29BZ0FoQlNBRFFnQTNBaUFnQTBJQU53SW9JQU5DQURjQ01DQURRZ0EzQURjZ0EwSUFOd0lZSUFOQkFEWUNGQ0FEUWZ3Vk5nSVFJQU1nQVRZQ0RDQURRYXdXTmdJSUlBRWdCV29oQVVFQUlRVUNRQ0FHUWF3V1FRQVFDZ1JBSUFOQkFUWUNPQ0FHSUFOQkNHb2dBU0FCUVFGQkFDQUdLQUlBS0FJVUVRTUFJQUZCQUNBREtBSWdRUUZHR3lFRkRBRUxJQVlnQTBFSWFpQUJRUUZCQUNBR0tBSUFLQUlZRVFJQUFrQUNRQ0FES0FJc0RnSUFBUUlMSUFNb0FoeEJBQ0FES0FJb1FRRkdHMEVBSUFNb0FpUkJBVVliUVFBZ0F5Z0NNRUVCUmhzaEJRd0JDeUFES0FJZ1FRRkhCRUFnQXlnQ01BMEJJQU1vQWlSQkFVY05BU0FES0FJb1FRRkhEUUVMSUFNb0FoZ2hCUXNnQTBGQWF5UUFRUUFnQlNJQlJRMEFHaUFFUVF4cVFUUVFEeG9nQkVFQk5nSTRJQVJCZnpZQ0ZDQUVJQUEyQWhBZ0JDQUJOZ0lJSUFFZ0JFRUlhaUFDS0FJQVFRRWdBU2dDQUNnQ0hCRUFBQ0FFS0FJZ0lnQkJBVVlFUUNBQ0lBUW9BaGcyQWdBTElBQkJBVVlMSVFjZ0JFRkFheVFBSUFjTENnQWdBQ0FCUVFBUUNnc0VBQ0FBQy9vRUFnWi9DbjFCLy8vLy93Y2hERUdBZ0lDQWVDRU5RWDhoQ2dOQUlBTWdDMFlFUUVFQUlRa2dDRUdBZ0JBUUR5RUFRd0QvZjBjZ0RTQU1hN0tWSVJBRFFDQURJQWxHQkVCQkFDRUpJQWRCQURZQ0FDQUFRUVJySVFCQkFDRU1RUUVoQ3dOQUlBdEJnSUFFUmtVRVFDQUhJQXRCQW5RaUFXb2dBQ0FCYWlnQ0FDQU1haUlNTmdJQUlBdEJBV29oQ3d3QkN3c0RRQ0FESUFsR1JRUkFJQWNnQlNBSlFRSjBhaWdDQUVFQ2RHb2lBQ0FBS0FJQUlnQkJBV28yQWdBZ0JpQUFRUUowYWlBSk5nSUFJQWxCQVdvaENRd0JDd3NGQW44Z0VDQUZJQWxCQW5ScUlnRW9BZ0FnREd1emxDSVBRd0FBZ0U5ZElBOURBQUFBQUdCeEJFQWdENmtNQVF0QkFBc2hDeUFCSUFzMkFnQWdBQ0FMUVFKMGFpSUJJQUVvQWdCQkFXbzJBZ0FnQ1VFQmFpRUpEQUVMQ3dVZ0JDQUxRUXhzYWlJSktnSUFJUk1nQ1NvQ0NDRVVJQWtxQWdRaEZTQUtJQUlnQzBFQ2RDSU9haWdDQUNJSlJ3UkFJQUVnQ1VIUUFHeHFJZ29xQWp3Z0FDb0NPQ0lQbENBS0tnSTRJQUFxQWlnaUVKUWdDaW9DTUNBQUtnSUlJaEdVSUFBcUFoZ2lFaUFLS2dJMGxKS1NraUVXSUFvcUFpd2dENVFnQ2lvQ0tDQVFsQ0FLS2dJZ0lCR1VJQklnQ2lvQ0pKU1NrcEloRnlBS0tnSWNJQStVSUFvcUFoZ2dFSlFnQ2lvQ0VDQVJsQ0FTSUFvcUFoU1VrcEtTSVJnZ0Npb0NEQ0FQbENBS0tnSUlJQkNVSUFvcUFnQWdFWlFnQ2lvQ0JDQVNsSktTa2lFUElBa2hDZ3NnQlNBT2FnSi9JQllnRnlBVWxDQVBJQk9VSUJVZ0dKU1NrcEpEQUFDQVJaUWlFSXREQUFBQVQxMEVRQ0FRcUF3QkMwR0FnSUNBZUFzaUNUWUNBQ0FNSUFrZ0NTQU1TaHNoRENBTklBa2dDU0FOU0JzaERTQUxRUUZxSVFzTUFRc0xDd3ZuRVFJQVFZQUlDOVlSZFc1emFXZHVaV1FnYzJodmNuUUFkVzV6YVdkdVpXUWdhVzUwQUdac2IyRjBBSFZwYm5RMk5GOTBBSFZ1YzJsbmJtVmtJR05vWVhJQVltOXZiQUJsYlhOamNtbHdkR1Z1T2pwMllXd0FkVzV6YVdkdVpXUWdiRzl1WndCemRHUTZPbmR6ZEhKcGJtY0FjM1JrT2pwemRISnBibWNBYzNSa09qcDFNVFp6ZEhKcGJtY0FjM1JrT2pwMU16SnpkSEpwYm1jQVpHOTFZbXhsQUhadmFXUUFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGMyaHZjblErQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQSFZ1YzJsbmJtVmtJSE5vYjNKMFBnQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4cGJuUStBR1Z0YzJOeWFYQjBaVzQ2T20xbGJXOXllVjkyYVdWM1BIVnVjMmxuYm1Wa0lHbHVkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhabXh2WVhRK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEhWcGJuUTRYM1ErQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQR2x1ZERoZmRENEFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGRXbHVkREUyWDNRK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEdsdWRERTJYM1ErQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQSFZwYm5RMk5GOTBQZ0JsYlhOamNtbHdkR1Z1T2pwdFpXMXZjbmxmZG1sbGR6eHBiblEyTkY5MFBnQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4MWFXNTBNekpmZEQ0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4YVc1ME16SmZkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhZMmhoY2o0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4ZFc1emFXZHVaV1FnWTJoaGNqNEFjM1JrT2pwaVlYTnBZMTl6ZEhKcGJtYzhkVzV6YVdkdVpXUWdZMmhoY2o0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4YzJsbmJtVmtJR05vWVhJK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEd4dmJtYytBR1Z0YzJOeWFYQjBaVzQ2T20xbGJXOXllVjkyYVdWM1BIVnVjMmxuYm1Wa0lHeHZibWMrQUdWdGMyTnlhWEIwWlc0Nk9tMWxiVzl5ZVY5MmFXVjNQR1J2ZFdKc1pUNEFUbE4wTTE5Zk1qRXlZbUZ6YVdOZmMzUnlhVzVuU1dOT1UxOHhNV05vWVhKZmRISmhhWFJ6U1dORlJVNVRYemxoYkd4dlkyRjBiM0pKWTBWRlJVVUFBQUFBUkF3QUFFSUhBQUJPVTNRelgxOHlNVEppWVhOcFkxOXpkSEpwYm1kSmFFNVRYekV4WTJoaGNsOTBjbUZwZEhOSmFFVkZUbE5mT1dGc2JHOWpZWFJ2Y2tsb1JVVkZSUUFBUkF3QUFJd0hBQUJPVTNRelgxOHlNVEppWVhOcFkxOXpkSEpwYm1kSmQwNVRYekV4WTJoaGNsOTBjbUZwZEhOSmQwVkZUbE5mT1dGc2JHOWpZWFJ2Y2tsM1JVVkZSUUFBUkF3QUFOUUhBQUJPVTNRelgxOHlNVEppWVhOcFkxOXpkSEpwYm1kSlJITk9VMTh4TVdOb1lYSmZkSEpoYVhSelNVUnpSVVZPVTE4NVlXeHNiMk5oZEc5eVNVUnpSVVZGUlFBQUFFUU1BQUFjQ0FBQVRsTjBNMTlmTWpFeVltRnphV05mYzNSeWFXNW5TVVJwVGxOZk1URmphR0Z5WDNSeVlXbDBjMGxFYVVWRlRsTmZPV0ZzYkc5allYUnZja2xFYVVWRlJVVUFBQUJFREFBQWFBZ0FBRTR4TUdWdGMyTnlhWEIwWlc0emRtRnNSUUFBUkF3QUFMUUlBQUJPTVRCbGJYTmpjbWx3ZEdWdU1URnRaVzF2Y25sZmRtbGxkMGxqUlVVQUFFUU1BQURRQ0FBQVRqRXdaVzF6WTNKcGNIUmxiakV4YldWdGIzSjVYM1pwWlhkSllVVkZBQUJFREFBQStBZ0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTV2hGUlFBQVJBd0FBQ0FKQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBselJVVUFBRVFNQUFCSUNRQUFUakV3WlcxelkzSnBjSFJsYmpFeGJXVnRiM0o1WDNacFpYZEpkRVZGQUFCRURBQUFjQWtBQUU0eE1HVnRjMk55YVhCMFpXNHhNVzFsYlc5eWVWOTJhV1YzU1dsRlJRQUFSQXdBQUpnSkFBQk9NVEJsYlhOamNtbHdkR1Z1TVRGdFpXMXZjbmxmZG1sbGQwbHFSVVVBQUVRTUFBREFDUUFBVGpFd1pXMXpZM0pwY0hSbGJqRXhiV1Z0YjNKNVgzWnBaWGRKYkVWRkFBQkVEQUFBNkFrQUFFNHhNR1Z0YzJOeWFYQjBaVzR4TVcxbGJXOXllVjkyYVdWM1NXMUZSUUFBUkF3QUFCQUtBQUJPTVRCbGJYTmpjbWx3ZEdWdU1URnRaVzF2Y25sZmRtbGxkMGw0UlVVQUFFUU1BQUE0Q2dBQVRqRXdaVzF6WTNKcGNIUmxiakV4YldWdGIzSjVYM1pwWlhkSmVVVkZBQUJFREFBQVlBb0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTV1pGUlFBQVJBd0FBSWdLQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBsa1JVVUFBRVFNQUFDd0NnQUFUakV3WDE5amVIaGhZbWwyTVRFMlgxOXphR2x0WDNSNWNHVmZhVzVtYjBVQUFBQUFiQXdBQU5nS0FBRFFEQUFBVGpFd1gxOWplSGhoWW1sMk1URTNYMTlqYkdGemMxOTBlWEJsWDJsdVptOUZBQUFBYkF3QUFBZ0xBQUQ4Q2dBQUFBQUFBSHdMQUFBQ0FBQUFBd0FBQUFRQUFBQUZBQUFBQmdBQUFFNHhNRjlmWTNoNFlXSnBkakV5TTE5ZlpuVnVaR0Z0Wlc1MFlXeGZkSGx3WlY5cGJtWnZSUUJzREFBQVZBc0FBUHdLQUFCMkFBQUFRQXNBQUlnTEFBQmlBQUFBUUFzQUFKUUxBQUJqQUFBQVFBc0FBS0FMQUFCb0FBQUFRQXNBQUt3TEFBQmhBQUFBUUFzQUFMZ0xBQUJ6QUFBQVFBc0FBTVFMQUFCMEFBQUFRQXNBQU5BTEFBQnBBQUFBUUFzQUFOd0xBQUJxQUFBQVFBc0FBT2dMQUFCc0FBQUFRQXNBQVBRTEFBQnRBQUFBUUFzQUFBQU1BQUI0QUFBQVFBc0FBQXdNQUFCNUFBQUFRQXNBQUJnTUFBQm1BQUFBUUFzQUFDUU1BQUJrQUFBQVFBc0FBREFNQUFBQUFBQUFMQXNBQUFJQUFBQUhBQUFBQkFBQUFBVUFBQUFJQUFBQUNRQUFBQW9BQUFBTEFBQUFBQUFBQUxRTUFBQUNBQUFBREFBQUFBUUFBQUFGQUFBQUNBQUFBQTBBQUFBT0FBQUFEd0FBQUU0eE1GOWZZM2g0WVdKcGRqRXlNRjlmYzJsZlkyeGhjM05mZEhsd1pWOXBibVp2UlFBQUFBQnNEQUFBakF3QUFDd0xBQUJUZERsMGVYQmxYMmx1Wm04QUFBQUFSQXdBQU1BTUFFSFlHUXNENEE0QiI7aWYoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpe3dhc21CaW5hcnlGaWxlPWxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpO31mdW5jdGlvbiBnZXRCaW5hcnlTeW5jKGZpbGUpe2lmKGZpbGU9PXdhc21CaW5hcnlGaWxlJiZ3YXNtQmluYXJ5KXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkod2FzbUJpbmFyeSl9dmFyIGJpbmFyeT10cnlQYXJzZUFzRGF0YVVSSShmaWxlKTtpZihiaW5hcnkpe3JldHVybiBiaW5hcnl9aWYocmVhZEJpbmFyeSl7cmV0dXJuIHJlYWRCaW5hcnkoZmlsZSl9dGhyb3cgImJvdGggYXN5bmMgYW5kIHN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkIn1mdW5jdGlvbiBnZXRCaW5hcnlQcm9taXNlKGJpbmFyeUZpbGUpe3JldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpPT5nZXRCaW5hcnlTeW5jKGJpbmFyeUZpbGUpKX1mdW5jdGlvbiBpbnN0YW50aWF0ZUFycmF5QnVmZmVyKGJpbmFyeUZpbGUsaW1wb3J0cyxyZWNlaXZlcil7cmV0dXJuIGdldEJpbmFyeVByb21pc2UoYmluYXJ5RmlsZSkudGhlbihiaW5hcnk9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJpbmFyeSxpbXBvcnRzKSkudGhlbihpbnN0YW5jZT0+aW5zdGFuY2UpLnRoZW4ocmVjZWl2ZXIscmVhc29uPT57ZXJyKGBmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiAke3JlYXNvbn1gKTthYm9ydChyZWFzb24pO30pfWZ1bmN0aW9uIGluc3RhbnRpYXRlQXN5bmMoYmluYXJ5LGJpbmFyeUZpbGUsaW1wb3J0cyxjYWxsYmFjayl7cmV0dXJuIGluc3RhbnRpYXRlQXJyYXlCdWZmZXIoYmluYXJ5RmlsZSxpbXBvcnRzLGNhbGxiYWNrKX1mdW5jdGlvbiBjcmVhdGVXYXNtKCl7dmFyIGluZm89eyJhIjp3YXNtSW1wb3J0c307ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLG1vZHVsZSl7d2FzbUV4cG9ydHM9aW5zdGFuY2UuZXhwb3J0czt3YXNtTWVtb3J5PXdhc21FeHBvcnRzWyJrIl07dXBkYXRlTWVtb3J5Vmlld3MoKTthZGRPbkluaXQod2FzbUV4cG9ydHNbImwiXSk7cmVtb3ZlUnVuRGVwZW5kZW5jeSgpO3JldHVybiB3YXNtRXhwb3J0c31hZGRSdW5EZXBlbmRlbmN5KCk7ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQocmVzdWx0KXtyZWNlaXZlSW5zdGFuY2UocmVzdWx0WyJpbnN0YW5jZSJdKTt9aWYoTW9kdWxlWyJpbnN0YW50aWF0ZVdhc20iXSl7dHJ5e3JldHVybiBNb2R1bGVbImluc3RhbnRpYXRlV2FzbSJdKGluZm8scmVjZWl2ZUluc3RhbmNlKX1jYXRjaChlKXtlcnIoYE1vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6ICR7ZX1gKTtyZWFkeVByb21pc2VSZWplY3QoZSk7fX1pbnN0YW50aWF0ZUFzeW5jKHdhc21CaW5hcnksd2FzbUJpbmFyeUZpbGUsaW5mbyxyZWNlaXZlSW5zdGFudGlhdGlvblJlc3VsdCkuY2F0Y2gocmVhZHlQcm9taXNlUmVqZWN0KTtyZXR1cm4ge319dmFyIGNhbGxSdW50aW1lQ2FsbGJhY2tzPWNhbGxiYWNrcz0+e3doaWxlKGNhbGxiYWNrcy5sZW5ndGg+MCl7Y2FsbGJhY2tzLnNoaWZ0KCkoTW9kdWxlKTt9fTtNb2R1bGVbIm5vRXhpdFJ1bnRpbWUiXXx8dHJ1ZTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfYmlnaW50PShwcmltaXRpdmVUeXBlLG5hbWUsc2l6ZSxtaW5SYW5nZSxtYXhSYW5nZSk9Pnt9O3ZhciBlbWJpbmRfaW5pdF9jaGFyQ29kZXM9KCk9Pnt2YXIgY29kZXM9bmV3IEFycmF5KDI1Nik7Zm9yKHZhciBpPTA7aTwyNTY7KytpKXtjb2Rlc1tpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpO31lbWJpbmRfY2hhckNvZGVzPWNvZGVzO307dmFyIGVtYmluZF9jaGFyQ29kZXM7dmFyIHJlYWRMYXRpbjFTdHJpbmc9cHRyPT57dmFyIHJldD0iIjt2YXIgYz1wdHI7d2hpbGUoSEVBUFU4W2NdKXtyZXQrPWVtYmluZF9jaGFyQ29kZXNbSEVBUFU4W2MrK11dO31yZXR1cm4gcmV0fTt2YXIgYXdhaXRpbmdEZXBlbmRlbmNpZXM9e307dmFyIHJlZ2lzdGVyZWRUeXBlcz17fTt2YXIgQmluZGluZ0Vycm9yO3ZhciB0aHJvd0JpbmRpbmdFcnJvcj1tZXNzYWdlPT57dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihtZXNzYWdlKX07ZnVuY3Rpb24gc2hhcmVkUmVnaXN0ZXJUeXBlKHJhd1R5cGUscmVnaXN0ZXJlZEluc3RhbmNlLG9wdGlvbnM9e30pe3ZhciBuYW1lPXJlZ2lzdGVyZWRJbnN0YW5jZS5uYW1lO2lmKCFyYXdUeXBlKXt0aHJvd0JpbmRpbmdFcnJvcihgdHlwZSAiJHtuYW1lfSIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcmApO31pZihyZWdpc3RlcmVkVHlwZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe2lmKG9wdGlvbnMuaWdub3JlRHVwbGljYXRlUmVnaXN0cmF0aW9ucyl7cmV0dXJufWVsc2Uge3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnJHtuYW1lfScgdHdpY2VgKTt9fXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXT1yZWdpc3RlcmVkSW5zdGFuY2U7aWYoYXdhaXRpbmdEZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe3ZhciBjYWxsYmFja3M9YXdhaXRpbmdEZXBlbmRlbmNpZXNbcmF3VHlwZV07ZGVsZXRlIGF3YWl0aW5nRGVwZW5kZW5jaWVzW3Jhd1R5cGVdO2NhbGxiYWNrcy5mb3JFYWNoKGNiPT5jYigpKTt9fWZ1bmN0aW9uIHJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zPXt9KXtpZighKCJhcmdQYWNrQWR2YW5jZSJpbiByZWdpc3RlcmVkSW5zdGFuY2UpKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlIil9cmV0dXJuIHNoYXJlZFJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zKX12YXIgR2VuZXJpY1dpcmVUeXBlU2l6ZT04O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9ib29sPShyYXdUeXBlLG5hbWUsdHJ1ZVZhbHVlLGZhbHNlVmFsdWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24od3Qpe3JldHVybiAhIXd0fSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIG8/dHJ1ZVZhbHVlOmZhbHNlVmFsdWV9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVThbcG9pbnRlcl0pfSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307ZnVuY3Rpb24gaGFuZGxlQWxsb2NhdG9ySW5pdCgpe09iamVjdC5hc3NpZ24oSGFuZGxlQWxsb2NhdG9yLnByb3RvdHlwZSx7Z2V0KGlkKXtyZXR1cm4gdGhpcy5hbGxvY2F0ZWRbaWRdfSxoYXMoaWQpe3JldHVybiB0aGlzLmFsbG9jYXRlZFtpZF0hPT11bmRlZmluZWR9LGFsbG9jYXRlKGhhbmRsZSl7dmFyIGlkPXRoaXMuZnJlZWxpc3QucG9wKCl8fHRoaXMuYWxsb2NhdGVkLmxlbmd0aDt0aGlzLmFsbG9jYXRlZFtpZF09aGFuZGxlO3JldHVybiBpZH0sZnJlZShpZCl7dGhpcy5hbGxvY2F0ZWRbaWRdPXVuZGVmaW5lZDt0aGlzLmZyZWVsaXN0LnB1c2goaWQpO319KTt9ZnVuY3Rpb24gSGFuZGxlQWxsb2NhdG9yKCl7dGhpcy5hbGxvY2F0ZWQ9W3VuZGVmaW5lZF07dGhpcy5mcmVlbGlzdD1bXTt9dmFyIGVtdmFsX2hhbmRsZXM9bmV3IEhhbmRsZUFsbG9jYXRvcjt2YXIgX19lbXZhbF9kZWNyZWY9aGFuZGxlPT57aWYoaGFuZGxlPj1lbXZhbF9oYW5kbGVzLnJlc2VydmVkJiYwPT09LS1lbXZhbF9oYW5kbGVzLmdldChoYW5kbGUpLnJlZmNvdW50KXtlbXZhbF9oYW5kbGVzLmZyZWUoaGFuZGxlKTt9fTt2YXIgY291bnRfZW12YWxfaGFuZGxlcz0oKT0+e3ZhciBjb3VudD0wO2Zvcih2YXIgaT1lbXZhbF9oYW5kbGVzLnJlc2VydmVkO2k8ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoOysraSl7aWYoZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWRbaV0hPT11bmRlZmluZWQpeysrY291bnQ7fX1yZXR1cm4gY291bnR9O3ZhciBpbml0X2VtdmFsPSgpPT57ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQucHVzaCh7dmFsdWU6dW5kZWZpbmVkfSx7dmFsdWU6bnVsbH0se3ZhbHVlOnRydWV9LHt2YWx1ZTpmYWxzZX0pO2VtdmFsX2hhbmRsZXMucmVzZXJ2ZWQ9ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoO01vZHVsZVsiY291bnRfZW12YWxfaGFuZGxlcyJdPWNvdW50X2VtdmFsX2hhbmRsZXM7fTt2YXIgRW12YWw9e3RvVmFsdWU6aGFuZGxlPT57aWYoIWhhbmRsZSl7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9ICIraGFuZGxlKTt9cmV0dXJuIGVtdmFsX2hhbmRsZXMuZ2V0KGhhbmRsZSkudmFsdWV9LHRvSGFuZGxlOnZhbHVlPT57c3dpdGNoKHZhbHVlKXtjYXNlIHVuZGVmaW5lZDpyZXR1cm4gMTtjYXNlIG51bGw6cmV0dXJuIDI7Y2FzZSB0cnVlOnJldHVybiAzO2Nhc2UgZmFsc2U6cmV0dXJuIDQ7ZGVmYXVsdDp7cmV0dXJuIGVtdmFsX2hhbmRsZXMuYWxsb2NhdGUoe3JlZmNvdW50OjEsdmFsdWU6dmFsdWV9KX19fX07ZnVuY3Rpb24gc2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKEhFQVAzMltwb2ludGVyPj4yXSl9dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX2VtdmFsPShyYXdUeXBlLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6aGFuZGxlPT57dmFyIHJ2PUVtdmFsLnRvVmFsdWUoaGFuZGxlKTtfX2VtdmFsX2RlY3JlZihoYW5kbGUpO3JldHVybiBydn0sInRvV2lyZVR5cGUiOihkZXN0cnVjdG9ycyx2YWx1ZSk9PkVtdmFsLnRvSGFuZGxlKHZhbHVlKSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307dmFyIGZsb2F0UmVhZFZhbHVlRnJvbVBvaW50ZXI9KG5hbWUsd2lkdGgpPT57c3dpdGNoKHdpZHRoKXtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQRjMyW3BvaW50ZXI+PjJdKX07Y2FzZSA4OnJldHVybiBmdW5jdGlvbihwb2ludGVyKXtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oSEVBUEY2NFtwb2ludGVyPj4zXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmbG9hdCB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfZmxvYXQ9KHJhd1R5cGUsbmFtZSxzaXplKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT52YWx1ZSwidG9XaXJlVHlwZSI6KGRlc3RydWN0b3JzLHZhbHVlKT0+dmFsdWUsImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6ZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNpemUpLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSk7fTt2YXIgaW50ZWdlclJlYWRWYWx1ZUZyb21Qb2ludGVyPShuYW1lLHdpZHRoLHNpZ25lZCk9Pntzd2l0Y2god2lkdGgpe2Nhc2UgMTpyZXR1cm4gc2lnbmVkP3BvaW50ZXI9PkhFQVA4W3BvaW50ZXI+PjBdOnBvaW50ZXI9PkhFQVBVOFtwb2ludGVyPj4wXTtjYXNlIDI6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMTZbcG9pbnRlcj4+MV06cG9pbnRlcj0+SEVBUFUxNltwb2ludGVyPj4xXTtjYXNlIDQ6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMzJbcG9pbnRlcj4+Ml06cG9pbnRlcj0+SEVBUFUzMltwb2ludGVyPj4yXTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgaW50ZWdlciB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcj0ocHJpbWl0aXZlVHlwZSxuYW1lLHNpemUsbWluUmFuZ2UsbWF4UmFuZ2UpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlO2lmKG1pblJhbmdlPT09MCl7dmFyIGJpdHNoaWZ0PTMyLTgqc2l6ZTtmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlPDxiaXRzaGlmdD4+PmJpdHNoaWZ0O312YXIgaXNVbnNpZ25lZFR5cGU9bmFtZS5pbmNsdWRlcygidW5zaWduZWQiKTt2YXIgY2hlY2tBc3NlcnRpb25zPSh2YWx1ZSx0b1R5cGVOYW1lKT0+e307dmFyIHRvV2lyZVR5cGU7aWYoaXNVbnNpZ25lZFR5cGUpe3RvV2lyZVR5cGU9ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2NoZWNrQXNzZXJ0aW9ucyh2YWx1ZSx0aGlzLm5hbWUpO3JldHVybiB2YWx1ZT4+PjB9O31lbHNlIHt0b1dpcmVUeXBlPWZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtjaGVja0Fzc2VydGlvbnModmFsdWUsdGhpcy5uYW1lKTtyZXR1cm4gdmFsdWV9O31yZWdpc3RlclR5cGUocHJpbWl0aXZlVHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZyb21XaXJlVHlwZSwidG9XaXJlVHlwZSI6dG9XaXJlVHlwZSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjppbnRlZ2VyUmVhZFZhbHVlRnJvbVBvaW50ZXIobmFtZSxzaXplLG1pblJhbmdlIT09MCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KTt9O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldz0ocmF3VHlwZSxkYXRhVHlwZUluZGV4LG5hbWUpPT57dmFyIHR5cGVNYXBwaW5nPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheV07dmFyIFRBPXR5cGVNYXBwaW5nW2RhdGFUeXBlSW5kZXhdO2Z1bmN0aW9uIGRlY29kZU1lbW9yeVZpZXcoaGFuZGxlKXt2YXIgc2l6ZT1IRUFQVTMyW2hhbmRsZT4+Ml07dmFyIGRhdGE9SEVBUFUzMltoYW5kbGUrND4+Ml07cmV0dXJuIG5ldyBUQShIRUFQOC5idWZmZXIsZGF0YSxzaXplKX1uYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpkZWNvZGVNZW1vcnlWaWV3LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmRlY29kZU1lbW9yeVZpZXd9LHtpZ25vcmVEdXBsaWNhdGVSZWdpc3RyYXRpb25zOnRydWV9KTt9O2Z1bmN0aW9uIHJlYWRQb2ludGVyKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVTMyW3BvaW50ZXI+PjJdKX12YXIgc3RyaW5nVG9VVEY4QXJyYXk9KHN0cixoZWFwLG91dElkeCxtYXhCeXRlc1RvV3JpdGUpPT57aWYoIShtYXhCeXRlc1RvV3JpdGU+MCkpcmV0dXJuIDA7dmFyIHN0YXJ0SWR4PW91dElkeDt2YXIgZW5kSWR4PW91dElkeCttYXhCeXRlc1RvV3JpdGUtMTtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgdT1zdHIuY2hhckNvZGVBdChpKTtpZih1Pj01NTI5NiYmdTw9NTczNDMpe3ZhciB1MT1zdHIuY2hhckNvZGVBdCgrK2kpO3U9NjU1MzYrKCh1JjEwMjMpPDwxMCl8dTEmMTAyMzt9aWYodTw9MTI3KXtpZihvdXRJZHg+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT11O31lbHNlIGlmKHU8PTIwNDcpe2lmKG91dElkeCsxPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MTkyfHU+PjY7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fWVsc2UgaWYodTw9NjU1MzUpe2lmKG91dElkeCsyPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MjI0fHU+PjEyO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzO31lbHNlIHtpZihvdXRJZHgrMz49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPTI0MHx1Pj4xODtoZWFwW291dElkeCsrXT0xMjh8dT4+MTImNjM7aGVhcFtvdXRJZHgrK109MTI4fHU+PjYmNjM7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fX1oZWFwW291dElkeF09MDtyZXR1cm4gb3V0SWR4LXN0YXJ0SWR4fTt2YXIgc3RyaW5nVG9VVEY4PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PnN0cmluZ1RvVVRGOEFycmF5KHN0cixIRUFQVTgsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk7dmFyIGxlbmd0aEJ5dGVzVVRGOD1zdHI9Pnt2YXIgbGVuPTA7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGM9c3RyLmNoYXJDb2RlQXQoaSk7aWYoYzw9MTI3KXtsZW4rKzt9ZWxzZSBpZihjPD0yMDQ3KXtsZW4rPTI7fWVsc2UgaWYoYz49NTUyOTYmJmM8PTU3MzQzKXtsZW4rPTQ7KytpO31lbHNlIHtsZW4rPTM7fX1yZXR1cm4gbGVufTt2YXIgVVRGOERlY29kZXI9dHlwZW9mIFRleHREZWNvZGVyIT0idW5kZWZpbmVkIj9uZXcgVGV4dERlY29kZXIoInV0ZjgiKTp1bmRlZmluZWQ7dmFyIFVURjhBcnJheVRvU3RyaW5nPShoZWFwT3JBcnJheSxpZHgsbWF4Qnl0ZXNUb1JlYWQpPT57dmFyIGVuZElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQ7dmFyIGVuZFB0cj1pZHg7d2hpbGUoaGVhcE9yQXJyYXlbZW5kUHRyXSYmIShlbmRQdHI+PWVuZElkeCkpKytlbmRQdHI7aWYoZW5kUHRyLWlkeD4xNiYmaGVhcE9yQXJyYXkuYnVmZmVyJiZVVEY4RGVjb2Rlcil7cmV0dXJuIFVURjhEZWNvZGVyLmRlY29kZShoZWFwT3JBcnJheS5zdWJhcnJheShpZHgsZW5kUHRyKSl9dmFyIHN0cj0iIjt3aGlsZShpZHg8ZW5kUHRyKXt2YXIgdTA9aGVhcE9yQXJyYXlbaWR4KytdO2lmKCEodTAmMTI4KSl7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHUwKTtjb250aW51ZX12YXIgdTE9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyMjQpPT0xOTIpe3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgodTAmMzEpPDw2fHUxKTtjb250aW51ZX12YXIgdTI9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyNDApPT0yMjQpe3UwPSh1MCYxNSk8PDEyfHUxPDw2fHUyO31lbHNlIHt1MD0odTAmNyk8PDE4fHUxPDwxMnx1Mjw8NnxoZWFwT3JBcnJheVtpZHgrK10mNjM7fWlmKHUwPDY1NTM2KXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodTApO31lbHNlIHt2YXIgY2g9dTAtNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9fXJldHVybiBzdHJ9O3ZhciBVVEY4VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9PnB0cj9VVEY4QXJyYXlUb1N0cmluZyhIRUFQVTgscHRyLG1heEJ5dGVzVG9SZWFkKToiIjt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZz0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTt2YXIgc3RkU3RyaW5nSXNVVEY4PW5hbWU9PT0ic3RkOjpzdHJpbmciO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSIodmFsdWUpe3ZhciBsZW5ndGg9SEVBUFUzMlt2YWx1ZT4+Ml07dmFyIHBheWxvYWQ9dmFsdWUrNDt2YXIgc3RyO2lmKHN0ZFN0cmluZ0lzVVRGOCl7dmFyIGRlY29kZVN0YXJ0UHRyPXBheWxvYWQ7Zm9yKHZhciBpPTA7aTw9bGVuZ3RoOysraSl7dmFyIGN1cnJlbnRCeXRlUHRyPXBheWxvYWQraTtpZihpPT1sZW5ndGh8fEhFQVBVOFtjdXJyZW50Qnl0ZVB0cl09PTApe3ZhciBtYXhSZWFkPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PVVURjhUb1N0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkKTtpZihzdHI9PT11bmRlZmluZWQpe3N0cj1zdHJpbmdTZWdtZW50O31lbHNlIHtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCk7c3RyKz1zdHJpbmdTZWdtZW50O31kZWNvZGVTdGFydFB0cj1jdXJyZW50Qnl0ZVB0cisxO319fWVsc2Uge3ZhciBhPW5ldyBBcnJheShsZW5ndGgpO2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7YVtpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKEhFQVBVOFtwYXlsb2FkK2ldKTt9c3RyPWEuam9pbigiIik7fV9mcmVlKHZhbHVlKTtyZXR1cm4gc3RyfSwidG9XaXJlVHlwZSIoZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpe3ZhbHVlPW5ldyBVaW50OEFycmF5KHZhbHVlKTt9dmFyIGxlbmd0aDt2YXIgdmFsdWVJc09mVHlwZVN0cmluZz10eXBlb2YgdmFsdWU9PSJzdHJpbmciO2lmKCEodmFsdWVJc09mVHlwZVN0cmluZ3x8dmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIEludDhBcnJheSkpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIHN0ZDo6c3RyaW5nIik7fWlmKHN0ZFN0cmluZ0lzVVRGOCYmdmFsdWVJc09mVHlwZVN0cmluZyl7bGVuZ3RoPWxlbmd0aEJ5dGVzVVRGOCh2YWx1ZSk7fWVsc2Uge2xlbmd0aD12YWx1ZS5sZW5ndGg7fXZhciBiYXNlPV9tYWxsb2MoNCtsZW5ndGgrMSk7dmFyIHB0cj1iYXNlKzQ7SEVBUFUzMltiYXNlPj4yXT1sZW5ndGg7aWYoc3RkU3RyaW5nSXNVVEY4JiZ2YWx1ZUlzT2ZUeXBlU3RyaW5nKXtzdHJpbmdUb1VURjgodmFsdWUscHRyLGxlbmd0aCsxKTt9ZWxzZSB7aWYodmFsdWVJc09mVHlwZVN0cmluZyl7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXt2YXIgY2hhckNvZGU9dmFsdWUuY2hhckNvZGVBdChpKTtpZihjaGFyQ29kZT4yNTUpe19mcmVlKHB0cik7dGhyb3dCaW5kaW5nRXJyb3IoIlN0cmluZyBoYXMgVVRGLTE2IGNvZGUgdW5pdHMgdGhhdCBkbyBub3QgZml0IGluIDggYml0cyIpO31IRUFQVThbcHRyK2ldPWNoYXJDb2RlO319ZWxzZSB7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXtIRUFQVThbcHRyK2ldPXZhbHVlW2ldO319fWlmKGRlc3RydWN0b3JzIT09bnVsbCl7ZGVzdHJ1Y3RvcnMucHVzaChfZnJlZSxiYXNlKTt9cmV0dXJuIGJhc2V9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOnJlYWRQb2ludGVyLGRlc3RydWN0b3JGdW5jdGlvbihwdHIpe19mcmVlKHB0cik7fX0pO307dmFyIFVURjE2RGVjb2Rlcj10eXBlb2YgVGV4dERlY29kZXIhPSJ1bmRlZmluZWQiP25ldyBUZXh0RGVjb2RlcigidXRmLTE2bGUiKTp1bmRlZmluZWQ7dmFyIFVURjE2VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgZW5kUHRyPXB0cjt2YXIgaWR4PWVuZFB0cj4+MTt2YXIgbWF4SWR4PWlkeCttYXhCeXRlc1RvUmVhZC8yO3doaWxlKCEoaWR4Pj1tYXhJZHgpJiZIRUFQVTE2W2lkeF0pKytpZHg7ZW5kUHRyPWlkeDw8MTtpZihlbmRQdHItcHRyPjMyJiZVVEYxNkRlY29kZXIpcmV0dXJuIFVURjE2RGVjb2Rlci5kZWNvZGUoSEVBUFU4LnN1YmFycmF5KHB0cixlbmRQdHIpKTt2YXIgc3RyPSIiO2Zvcih2YXIgaT0wOyEoaT49bWF4Qnl0ZXNUb1JlYWQvMik7KytpKXt2YXIgY29kZVVuaXQ9SEVBUDE2W3B0citpKjI+PjFdO2lmKGNvZGVVbml0PT0wKWJyZWFrO3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZShjb2RlVW5pdCk7fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjE2PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8MilyZXR1cm4gMDttYXhCeXRlc1RvV3JpdGUtPTI7dmFyIHN0YXJ0UHRyPW91dFB0cjt2YXIgbnVtQ2hhcnNUb1dyaXRlPW1heEJ5dGVzVG9Xcml0ZTxzdHIubGVuZ3RoKjI/bWF4Qnl0ZXNUb1dyaXRlLzI6c3RyLmxlbmd0aDtmb3IodmFyIGk9MDtpPG51bUNoYXJzVG9Xcml0ZTsrK2kpe3ZhciBjb2RlVW5pdD1zdHIuY2hhckNvZGVBdChpKTtIRUFQMTZbb3V0UHRyPj4xXT1jb2RlVW5pdDtvdXRQdHIrPTI7fUhFQVAxNltvdXRQdHI+PjFdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn07dmFyIGxlbmd0aEJ5dGVzVVRGMTY9c3RyPT5zdHIubGVuZ3RoKjI7dmFyIFVURjMyVG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgaT0wO3ZhciBzdHI9IiI7d2hpbGUoIShpPj1tYXhCeXRlc1RvUmVhZC80KSl7dmFyIHV0ZjMyPUhFQVAzMltwdHIraSo0Pj4yXTtpZih1dGYzMj09MClicmVhazsrK2k7aWYodXRmMzI+PTY1NTM2KXt2YXIgY2g9dXRmMzItNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9ZWxzZSB7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHV0ZjMyKTt9fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjMyPShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8NClyZXR1cm4gMDt2YXIgc3RhcnRQdHI9b3V0UHRyO3ZhciBlbmRQdHI9c3RhcnRQdHIrbWF4Qnl0ZXNUb1dyaXRlLTQ7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGNvZGVVbml0PXN0ci5jaGFyQ29kZUF0KGkpO2lmKGNvZGVVbml0Pj01NTI5NiYmY29kZVVuaXQ8PTU3MzQzKXt2YXIgdHJhaWxTdXJyb2dhdGU9c3RyLmNoYXJDb2RlQXQoKytpKTtjb2RlVW5pdD02NTUzNisoKGNvZGVVbml0JjEwMjMpPDwxMCl8dHJhaWxTdXJyb2dhdGUmMTAyMzt9SEVBUDMyW291dFB0cj4+Ml09Y29kZVVuaXQ7b3V0UHRyKz00O2lmKG91dFB0cis0PmVuZFB0cilicmVha31IRUFQMzJbb3V0UHRyPj4yXT0wO3JldHVybiBvdXRQdHItc3RhcnRQdHJ9O3ZhciBsZW5ndGhCeXRlc1VURjMyPXN0cj0+e3ZhciBsZW49MDtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7aWYoY29kZVVuaXQ+PTU1Mjk2JiZjb2RlVW5pdDw9NTczNDMpKytpO2xlbis9NDt9cmV0dXJuIGxlbn07dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nPShyYXdUeXBlLGNoYXJTaXplLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBkZWNvZGVTdHJpbmcsZW5jb2RlU3RyaW5nLGdldEhlYXAsbGVuZ3RoQnl0ZXNVVEYsc2hpZnQ7aWYoY2hhclNpemU9PT0yKXtkZWNvZGVTdHJpbmc9VVRGMTZUb1N0cmluZztlbmNvZGVTdHJpbmc9c3RyaW5nVG9VVEYxNjtsZW5ndGhCeXRlc1VURj1sZW5ndGhCeXRlc1VURjE2O2dldEhlYXA9KCk9PkhFQVBVMTY7c2hpZnQ9MTt9ZWxzZSBpZihjaGFyU2l6ZT09PTQpe2RlY29kZVN0cmluZz1VVEYzMlRvU3RyaW5nO2VuY29kZVN0cmluZz1zdHJpbmdUb1VURjMyO2xlbmd0aEJ5dGVzVVRGPWxlbmd0aEJ5dGVzVVRGMzI7Z2V0SGVhcD0oKT0+SEVBUFUzMjtzaGlmdD0yO31yZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT57dmFyIGxlbmd0aD1IRUFQVTMyW3ZhbHVlPj4yXTt2YXIgSEVBUD1nZXRIZWFwKCk7dmFyIHN0cjt2YXIgZGVjb2RlU3RhcnRQdHI9dmFsdWUrNDtmb3IodmFyIGk9MDtpPD1sZW5ndGg7KytpKXt2YXIgY3VycmVudEJ5dGVQdHI9dmFsdWUrNCtpKmNoYXJTaXplO2lmKGk9PWxlbmd0aHx8SEVBUFtjdXJyZW50Qnl0ZVB0cj4+c2hpZnRdPT0wKXt2YXIgbWF4UmVhZEJ5dGVzPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PWRlY29kZVN0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkQnl0ZXMpO2lmKHN0cj09PXVuZGVmaW5lZCl7c3RyPXN0cmluZ1NlZ21lbnQ7fWVsc2Uge3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKTtzdHIrPXN0cmluZ1NlZ21lbnQ7fWRlY29kZVN0YXJ0UHRyPWN1cnJlbnRCeXRlUHRyK2NoYXJTaXplO319X2ZyZWUodmFsdWUpO3JldHVybiBzdHJ9LCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsdmFsdWUpPT57aWYoISh0eXBlb2YgdmFsdWU9PSJzdHJpbmciKSl7dGhyb3dCaW5kaW5nRXJyb3IoYENhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICR7bmFtZX1gKTt9dmFyIGxlbmd0aD1sZW5ndGhCeXRlc1VURih2YWx1ZSk7dmFyIHB0cj1fbWFsbG9jKDQrbGVuZ3RoK2NoYXJTaXplKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoPj5zaGlmdDtlbmNvZGVTdHJpbmcodmFsdWUscHRyKzQsbGVuZ3RoK2NoYXJTaXplKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKTt9cmV0dXJuIHB0cn0sImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIsZGVzdHJ1Y3RvckZ1bmN0aW9uKHB0cil7X2ZyZWUocHRyKTt9fSk7fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfdm9pZD0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7aXNWb2lkOnRydWUsbmFtZTpuYW1lLCJhcmdQYWNrQWR2YW5jZSI6MCwiZnJvbVdpcmVUeXBlIjooKT0+dW5kZWZpbmVkLCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsbyk9PnVuZGVmaW5lZH0pO307dmFyIGdldEhlYXBNYXg9KCk9PjIxNDc0ODM2NDg7dmFyIGdyb3dNZW1vcnk9c2l6ZT0+e3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO3ZhciBwYWdlcz0oc2l6ZS1iLmJ5dGVMZW5ndGgrNjU1MzUpLzY1NTM2O3RyeXt3YXNtTWVtb3J5Lmdyb3cocGFnZXMpO3VwZGF0ZU1lbW9yeVZpZXdzKCk7cmV0dXJuIDF9Y2F0Y2goZSl7fX07dmFyIF9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwPXJlcXVlc3RlZFNpemU9Pnt2YXIgb2xkU2l6ZT1IRUFQVTgubGVuZ3RoO3JlcXVlc3RlZFNpemU+Pj49MDt2YXIgbWF4SGVhcFNpemU9Z2V0SGVhcE1heCgpO2lmKHJlcXVlc3RlZFNpemU+bWF4SGVhcFNpemUpe3JldHVybiBmYWxzZX12YXIgYWxpZ25VcD0oeCxtdWx0aXBsZSk9PngrKG11bHRpcGxlLXglbXVsdGlwbGUpJW11bHRpcGxlO2Zvcih2YXIgY3V0RG93bj0xO2N1dERvd248PTQ7Y3V0RG93bio9Mil7dmFyIG92ZXJHcm93bkhlYXBTaXplPW9sZFNpemUqKDErLjIvY3V0RG93bik7b3Zlckdyb3duSGVhcFNpemU9TWF0aC5taW4ob3Zlckdyb3duSGVhcFNpemUscmVxdWVzdGVkU2l6ZSsxMDA2NjMyOTYpO3ZhciBuZXdTaXplPU1hdGgubWluKG1heEhlYXBTaXplLGFsaWduVXAoTWF0aC5tYXgocmVxdWVzdGVkU2l6ZSxvdmVyR3Jvd25IZWFwU2l6ZSksNjU1MzYpKTt2YXIgcmVwbGFjZW1lbnQ9Z3Jvd01lbW9yeShuZXdTaXplKTtpZihyZXBsYWNlbWVudCl7cmV0dXJuIHRydWV9fXJldHVybiBmYWxzZX07ZW1iaW5kX2luaXRfY2hhckNvZGVzKCk7QmluZGluZ0Vycm9yPU1vZHVsZVsiQmluZGluZ0Vycm9yIl09Y2xhc3MgQmluZGluZ0Vycm9yIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IobWVzc2FnZSl7c3VwZXIobWVzc2FnZSk7dGhpcy5uYW1lPSJCaW5kaW5nRXJyb3IiO319O01vZHVsZVsiSW50ZXJuYWxFcnJvciJdPWNsYXNzIEludGVybmFsRXJyb3IgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihtZXNzYWdlKXtzdXBlcihtZXNzYWdlKTt0aGlzLm5hbWU9IkludGVybmFsRXJyb3IiO319O2hhbmRsZUFsbG9jYXRvckluaXQoKTtpbml0X2VtdmFsKCk7dmFyIHdhc21JbXBvcnRzPXtmOl9fZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludCxpOl9fZW1iaW5kX3JlZ2lzdGVyX2Jvb2wsaDpfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbCxlOl9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0LGI6X19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcixhOl9fZW1iaW5kX3JlZ2lzdGVyX21lbW9yeV92aWV3LGQ6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZyxjOl9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nLGo6X19lbWJpbmRfcmVnaXN0ZXJfdm9pZCxnOl9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwfTt2YXIgd2FzbUV4cG9ydHM9Y3JlYXRlV2FzbSgpO01vZHVsZVsiX3NvcnQiXT0oYTAsYTEsYTIsYTMsYTQsYTUsYTYsYTcsYTgpPT4oTW9kdWxlWyJfc29ydCJdPXdhc21FeHBvcnRzWyJtIl0pKGEwLGExLGEyLGEzLGE0LGE1LGE2LGE3LGE4KTtNb2R1bGVbIl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3MiXT0oKT0+KE1vZHVsZVsiX19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5ncyJdPXdhc21FeHBvcnRzWyJuIl0pKCk7dmFyIF9tYWxsb2M9TW9kdWxlWyJfbWFsbG9jIl09YTA9PihfbWFsbG9jPU1vZHVsZVsiX21hbGxvYyJdPXdhc21FeHBvcnRzWyJwIl0pKGEwKTt2YXIgX2ZyZWU9TW9kdWxlWyJfZnJlZSJdPWEwPT4oX2ZyZWU9TW9kdWxlWyJfZnJlZSJdPXdhc21FeHBvcnRzWyJxIl0pKGEwKTtmdW5jdGlvbiBpbnRBcnJheUZyb21CYXNlNjQocyl7dmFyIGRlY29kZWQ9YXRvYihzKTt2YXIgYnl0ZXM9bmV3IFVpbnQ4QXJyYXkoZGVjb2RlZC5sZW5ndGgpO2Zvcih2YXIgaT0wO2k8ZGVjb2RlZC5sZW5ndGg7KytpKXtieXRlc1tpXT1kZWNvZGVkLmNoYXJDb2RlQXQoaSk7fXJldHVybiBieXRlc31mdW5jdGlvbiB0cnlQYXJzZUFzRGF0YVVSSShmaWxlbmFtZSl7aWYoIWlzRGF0YVVSSShmaWxlbmFtZSkpe3JldHVybn1yZXR1cm4gaW50QXJyYXlGcm9tQmFzZTY0KGZpbGVuYW1lLnNsaWNlKGRhdGFVUklQcmVmaXgubGVuZ3RoKSl9dmFyIGNhbGxlZFJ1bjtkZXBlbmRlbmNpZXNGdWxmaWxsZWQ9ZnVuY3Rpb24gcnVuQ2FsbGVyKCl7aWYoIWNhbGxlZFJ1bilydW4oKTtpZighY2FsbGVkUnVuKWRlcGVuZGVuY2llc0Z1bGZpbGxlZD1ydW5DYWxsZXI7fTtmdW5jdGlvbiBydW4oKXtpZihydW5EZXBlbmRlbmNpZXM+MCl7cmV0dXJufXByZVJ1bigpO2lmKHJ1bkRlcGVuZGVuY2llcz4wKXtyZXR1cm59ZnVuY3Rpb24gZG9SdW4oKXtpZihjYWxsZWRSdW4pcmV0dXJuO2NhbGxlZFJ1bj10cnVlO01vZHVsZVsiY2FsbGVkUnVuIl09dHJ1ZTtpZihBQk9SVClyZXR1cm47aW5pdFJ1bnRpbWUoKTtyZWFkeVByb21pc2VSZXNvbHZlKE1vZHVsZSk7aWYoTW9kdWxlWyJvblJ1bnRpbWVJbml0aWFsaXplZCJdKU1vZHVsZVsib25SdW50aW1lSW5pdGlhbGl6ZWQiXSgpO3Bvc3RSdW4oKTt9aWYoTW9kdWxlWyJzZXRTdGF0dXMiXSl7TW9kdWxlWyJzZXRTdGF0dXMiXSgiUnVubmluZy4uLiIpO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7TW9kdWxlWyJzZXRTdGF0dXMiXSgiIik7fSwxKTtkb1J1bigpO30sMSk7fWVsc2Uge2RvUnVuKCk7fX1pZihNb2R1bGVbInByZUluaXQiXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlSW5pdCJdPT0iZnVuY3Rpb24iKU1vZHVsZVsicHJlSW5pdCJdPVtNb2R1bGVbInByZUluaXQiXV07d2hpbGUoTW9kdWxlWyJwcmVJbml0Il0ubGVuZ3RoPjApe01vZHVsZVsicHJlSW5pdCJdLnBvcCgpKCk7fX1ydW4oKTsKCgogICAgcmV0dXJuIG1vZHVsZUFyZy5yZWFkeQogIH0KCiAgKTsKICB9KSgpOwoKICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueQogIGxldCB3YXNtTW9kdWxlOwogIGFzeW5jIGZ1bmN0aW9uIGluaXRXYXNtKCkgewogICAgICB3YXNtTW9kdWxlID0gYXdhaXQgbG9hZFdhc20oKTsKICB9CiAgbGV0IHNvcnREYXRhOwogIGxldCB2aWV3UHJvalB0cjsKICBsZXQgdHJhbnNmb3Jtc1B0cjsKICBsZXQgdHJhbnNmb3JtSW5kaWNlc1B0cjsKICBsZXQgcG9zaXRpb25zUHRyOwogIGxldCBkZXB0aEJ1ZmZlclB0cjsKICBsZXQgZGVwdGhJbmRleFB0cjsKICBsZXQgc3RhcnRzUHRyOwogIGxldCBjb3VudHNQdHI7CiAgbGV0IGFsbG9jYXRlZFZlcnRleENvdW50ID0gMDsKICBsZXQgYWxsb2NhdGVkVHJhbnNmb3JtQ291bnQgPSAwOwogIGxldCB2aWV3UHJvaiA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpOwogIGxldCBsb2NrID0gZmFsc2U7CiAgbGV0IGFsbG9jYXRpb25QZW5kaW5nID0gZmFsc2U7CiAgbGV0IHNvcnRpbmcgPSBmYWxzZTsKICBjb25zdCBhbGxvY2F0ZUJ1ZmZlcnMgPSBhc3luYyAoKSA9PiB7CiAgICAgIGlmIChsb2NrKSB7CiAgICAgICAgICBhbGxvY2F0aW9uUGVuZGluZyA9IHRydWU7CiAgICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgbG9jayA9IHRydWU7CiAgICAgIGFsbG9jYXRpb25QZW5kaW5nID0gZmFsc2U7CiAgICAgIGlmICghd2FzbU1vZHVsZSkKICAgICAgICAgIGF3YWl0IGluaXRXYXNtKCk7CiAgICAgIGNvbnN0IHRhcmdldEFsbG9jYXRlZFZlcnRleENvdW50ID0gTWF0aC5wb3coMiwgTWF0aC5jZWlsKE1hdGgubG9nMihzb3J0RGF0YS52ZXJ0ZXhDb3VudCkpKTsKICAgICAgaWYgKGFsbG9jYXRlZFZlcnRleENvdW50IDwgdGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQpIHsKICAgICAgICAgIGlmIChhbGxvY2F0ZWRWZXJ0ZXhDb3VudCA+IDApIHsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHZpZXdQcm9qUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHRyYW5zZm9ybUluZGljZXNQdHIpOwogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUocG9zaXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKGRlcHRoQnVmZmVyUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKGRlcHRoSW5kZXhQdHIpOwogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUoc3RhcnRzUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKGNvdW50c1B0cik7CiAgICAgICAgICB9CiAgICAgICAgICBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCA9IHRhcmdldEFsbG9jYXRlZFZlcnRleENvdW50OwogICAgICAgICAgdmlld1Byb2pQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMTYgKiA0KTsKICAgICAgICAgIHRyYW5zZm9ybUluZGljZXNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIHBvc2l0aW9uc1B0ciA9IHdhc21Nb2R1bGUuX21hbGxvYygzICogYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIGRlcHRoQnVmZmVyUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBkZXB0aEluZGV4UHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBzdGFydHNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIGNvdW50c1B0ciA9IHdhc21Nb2R1bGUuX21hbGxvYyhhbGxvY2F0ZWRWZXJ0ZXhDb3VudCAqIDQpOwogICAgICB9CiAgICAgIGlmIChhbGxvY2F0ZWRUcmFuc2Zvcm1Db3VudCA8IHNvcnREYXRhLnRyYW5zZm9ybXMubGVuZ3RoKSB7CiAgICAgICAgICBpZiAoYWxsb2NhdGVkVHJhbnNmb3JtQ291bnQgPiAwKSB7CiAgICAgICAgICAgICAgd2FzbU1vZHVsZS5fZnJlZSh0cmFuc2Zvcm1zUHRyKTsKICAgICAgICAgIH0KICAgICAgICAgIGFsbG9jYXRlZFRyYW5zZm9ybUNvdW50ID0gc29ydERhdGEudHJhbnNmb3Jtcy5sZW5ndGg7CiAgICAgICAgICB0cmFuc2Zvcm1zUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKGFsbG9jYXRlZFRyYW5zZm9ybUNvdW50ICogNCk7CiAgICAgIH0KICAgICAgbG9jayA9IGZhbHNlOwogICAgICBpZiAoYWxsb2NhdGlvblBlbmRpbmcpIHsKICAgICAgICAgIGFsbG9jYXRpb25QZW5kaW5nID0gZmFsc2U7CiAgICAgICAgICBhd2FpdCBhbGxvY2F0ZUJ1ZmZlcnMoKTsKICAgICAgfQogIH07CiAgY29uc3QgcnVuU29ydCA9ICgpID0+IHsKICAgICAgaWYgKGxvY2sgfHwgYWxsb2NhdGlvblBlbmRpbmcgfHwgIXdhc21Nb2R1bGUpCiAgICAgICAgICByZXR1cm47CiAgICAgIGxvY2sgPSB0cnVlOwogICAgICB3YXNtTW9kdWxlLkhFQVBGMzIuc2V0KHNvcnREYXRhLnBvc2l0aW9ucywgcG9zaXRpb25zUHRyIC8gNCk7CiAgICAgIHdhc21Nb2R1bGUuSEVBUEYzMi5zZXQoc29ydERhdGEudHJhbnNmb3JtcywgdHJhbnNmb3Jtc1B0ciAvIDQpOwogICAgICB3YXNtTW9kdWxlLkhFQVBVMzIuc2V0KHNvcnREYXRhLnRyYW5zZm9ybUluZGljZXMsIHRyYW5zZm9ybUluZGljZXNQdHIgLyA0KTsKICAgICAgd2FzbU1vZHVsZS5IRUFQRjMyLnNldCh2aWV3UHJvaiwgdmlld1Byb2pQdHIgLyA0KTsKICAgICAgd2FzbU1vZHVsZS5fc29ydCh2aWV3UHJvalB0ciwgdHJhbnNmb3Jtc1B0ciwgdHJhbnNmb3JtSW5kaWNlc1B0ciwgc29ydERhdGEudmVydGV4Q291bnQsIHBvc2l0aW9uc1B0ciwgZGVwdGhCdWZmZXJQdHIsIGRlcHRoSW5kZXhQdHIsIHN0YXJ0c1B0ciwgY291bnRzUHRyKTsKICAgICAgY29uc3QgZGVwdGhJbmRleCA9IG5ldyBVaW50MzJBcnJheSh3YXNtTW9kdWxlLkhFQVBVMzIuYnVmZmVyLCBkZXB0aEluZGV4UHRyLCBzb3J0RGF0YS52ZXJ0ZXhDb3VudCk7CiAgICAgIGNvbnN0IGRldGFjaGVkRGVwdGhJbmRleCA9IG5ldyBVaW50MzJBcnJheShkZXB0aEluZGV4LnNsaWNlKCkuYnVmZmVyKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGRlcHRoSW5kZXg6IGRldGFjaGVkRGVwdGhJbmRleCB9LCBbZGV0YWNoZWREZXB0aEluZGV4LmJ1ZmZlcl0pOwogICAgICBsb2NrID0gZmFsc2U7CiAgfTsKICBjb25zdCB0aHJvdHRsZWRTb3J0ID0gKCkgPT4gewogICAgICBpZiAoIXNvcnRpbmcpIHsKICAgICAgICAgIHNvcnRpbmcgPSB0cnVlOwogICAgICAgICAgcnVuU29ydCgpOwogICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgICAgc29ydGluZyA9IGZhbHNlOwogICAgICAgICAgICAgIHRocm90dGxlZFNvcnQoKTsKICAgICAgICAgIH0pOwogICAgICB9CiAgfTsKICBzZWxmLm9ubWVzc2FnZSA9IChlKSA9PiB7CiAgICAgIGlmIChlLmRhdGEuc29ydERhdGEpIHsKICAgICAgICAgIC8vUmVjcmVhdGluZyB0aGUgdHlwZWQgYXJyYXlzIGV2ZXJ5IHRpbWUsIHdpbGwgY2F1c2UgZmlyZWZveCB0byBsZWFrIG1lbW9yeQogICAgICAgICAgaWYgKCFzb3J0RGF0YSkgewogICAgICAgICAgICAgIHNvcnREYXRhID0gewogICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IG5ldyBGbG9hdDMyQXJyYXkoZS5kYXRhLnNvcnREYXRhLnBvc2l0aW9ucyksCiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybXM6IG5ldyBGbG9hdDMyQXJyYXkoZS5kYXRhLnNvcnREYXRhLnRyYW5zZm9ybXMpLAogICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1JbmRpY2VzOiBuZXcgVWludDMyQXJyYXkoZS5kYXRhLnNvcnREYXRhLnRyYW5zZm9ybUluZGljZXMpLAogICAgICAgICAgICAgICAgICB2ZXJ0ZXhDb3VudDogZS5kYXRhLnNvcnREYXRhLnZlcnRleENvdW50LAogICAgICAgICAgICAgIH07CiAgICAgICAgICB9CiAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICBzb3J0RGF0YS5wb3NpdGlvbnMuc2V0KGUuZGF0YS5zb3J0RGF0YS5wb3NpdGlvbnMpOwogICAgICAgICAgICAgIHNvcnREYXRhLnRyYW5zZm9ybXMuc2V0KGUuZGF0YS5zb3J0RGF0YS50cmFuc2Zvcm1zKTsKICAgICAgICAgICAgICBzb3J0RGF0YS50cmFuc2Zvcm1JbmRpY2VzLnNldChlLmRhdGEuc29ydERhdGEudHJhbnNmb3JtSW5kaWNlcyk7CiAgICAgICAgICAgICAgc29ydERhdGEudmVydGV4Q291bnQgPSBlLmRhdGEuc29ydERhdGEudmVydGV4Q291bnQ7CiAgICAgICAgICB9CiAgICAgICAgICBhbGxvY2F0ZUJ1ZmZlcnMoKTsKICAgICAgfQogICAgICBpZiAoZS5kYXRhLnZpZXdQcm9qKSB7CiAgICAgICAgICB2aWV3UHJvaiA9IEZsb2F0MzJBcnJheS5mcm9tKGUuZGF0YS52aWV3UHJvaik7CiAgICAgICAgICB0aHJvdHRsZWRTb3J0KCk7CiAgICAgIH0KICB9OwoKfSkoKTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9U29ydFdvcmtlci5qcy5tYXAKCg==");
class _U {
  constructor(U, Q) {
    this._scene = null, this._camera = null, this._started = !1, this._initialized = !1, this._renderer = U;
    const F = U.gl;
    this._program = F.createProgram(), this._passes = Q || [];
    const l = F.createShader(F.VERTEX_SHADER);
    F.shaderSource(l, this._getVertexSource()), F.compileShader(l), F.getShaderParameter(l, F.COMPILE_STATUS) || console.error(F.getShaderInfoLog(l));
    const R = F.createShader(F.FRAGMENT_SHADER);
    F.shaderSource(R, this._getFragmentSource()), F.compileShader(R), F.getShaderParameter(R, F.COMPILE_STATUS) || console.error(F.getShaderInfoLog(R)), F.attachShader(this.program, l), F.attachShader(this.program, R), F.linkProgram(this.program), F.getProgramParameter(this.program, F.LINK_STATUS) || console.error(F.getProgramInfoLog(this.program)), this.resize = () => {
      F.useProgram(this._program), this._resize();
    }, this.initialize = () => {
      console.assert(!this._initialized, "ShaderProgram already initialized"), F.useProgram(this._program), this._initialize();
      for (const d of this.passes) d.initialize(this);
      this._initialized = !0, this._started = !0;
    }, this.render = (d, t) => {
      F.useProgram(this._program), this._scene === d && this._camera === t || (this.dispose(), this._scene = d, this._camera = t, this.initialize());
      for (const V of this.passes) V.render();
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
var qU = rU("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgdmFyIGxvYWRXYXNtID0gKCgpID0+IHsKICAgIAogICAgcmV0dXJuICgKICBmdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkgewoKICB2YXIgTW9kdWxlPW1vZHVsZUFyZzt2YXIgcmVhZHlQcm9taXNlUmVzb2x2ZSxyZWFkeVByb21pc2VSZWplY3Q7TW9kdWxlWyJyZWFkeSJdPW5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntyZWFkeVByb21pc2VSZXNvbHZlPXJlc29sdmU7cmVhZHlQcm9taXNlUmVqZWN0PXJlamVjdDt9KTt2YXIgbW9kdWxlT3ZlcnJpZGVzPU9iamVjdC5hc3NpZ24oe30sTW9kdWxlKTt2YXIgc2NyaXB0RGlyZWN0b3J5PSIiO2Z1bmN0aW9uIGxvY2F0ZUZpbGUocGF0aCl7aWYoTW9kdWxlWyJsb2NhdGVGaWxlIl0pe3JldHVybiBNb2R1bGVbImxvY2F0ZUZpbGUiXShwYXRoLHNjcmlwdERpcmVjdG9yeSl9cmV0dXJuIHNjcmlwdERpcmVjdG9yeStwYXRofXZhciByZWFkQmluYXJ5O3t7c2NyaXB0RGlyZWN0b3J5PXNlbGYubG9jYXRpb24uaHJlZjt9aWYoc2NyaXB0RGlyZWN0b3J5LmluZGV4T2YoImJsb2I6IikhPT0wKXtzY3JpcHREaXJlY3Rvcnk9c2NyaXB0RGlyZWN0b3J5LnN1YnN0cigwLHNjcmlwdERpcmVjdG9yeS5yZXBsYWNlKC9bPyNdLiovLCIiKS5sYXN0SW5kZXhPZigiLyIpKzEpO31lbHNlIHtzY3JpcHREaXJlY3Rvcnk9IiI7fXt7cmVhZEJpbmFyeT11cmw9Pnt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKX07fX19TW9kdWxlWyJwcmludCJdfHxjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO3ZhciBlcnI9TW9kdWxlWyJwcmludEVyciJdfHxjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihNb2R1bGUsbW9kdWxlT3ZlcnJpZGVzKTttb2R1bGVPdmVycmlkZXM9bnVsbDtpZihNb2R1bGVbImFyZ3VtZW50cyJdKU1vZHVsZVsiYXJndW1lbnRzIl07aWYoTW9kdWxlWyJ0aGlzUHJvZ3JhbSJdKU1vZHVsZVsidGhpc1Byb2dyYW0iXTtpZihNb2R1bGVbInF1aXQiXSlNb2R1bGVbInF1aXQiXTt2YXIgd2FzbUJpbmFyeTtpZihNb2R1bGVbIndhc21CaW5hcnkiXSl3YXNtQmluYXJ5PU1vZHVsZVsid2FzbUJpbmFyeSJdO2lmKHR5cGVvZiBXZWJBc3NlbWJseSE9Im9iamVjdCIpe2Fib3J0KCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkIik7fXZhciB3YXNtTWVtb3J5O3ZhciBBQk9SVD1mYWxzZTt2YXIgSEVBUDgsSEVBUFU4LEhFQVAxNixIRUFQVTE2LEhFQVAzMixIRUFQVTMyLEhFQVBGMzIsSEVBUEY2NDtmdW5jdGlvbiB1cGRhdGVNZW1vcnlWaWV3cygpe3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO01vZHVsZVsiSEVBUDgiXT1IRUFQOD1uZXcgSW50OEFycmF5KGIpO01vZHVsZVsiSEVBUDE2Il09SEVBUDE2PW5ldyBJbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUFU4Il09SEVBUFU4PW5ldyBVaW50OEFycmF5KGIpO01vZHVsZVsiSEVBUFUxNiJdPUhFQVBVMTY9bmV3IFVpbnQxNkFycmF5KGIpO01vZHVsZVsiSEVBUDMyIl09SEVBUDMyPW5ldyBJbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUFUzMiJdPUhFQVBVMzI9bmV3IFVpbnQzMkFycmF5KGIpO01vZHVsZVsiSEVBUEYzMiJdPUhFQVBGMzI9bmV3IEZsb2F0MzJBcnJheShiKTtNb2R1bGVbIkhFQVBGNjQiXT1IRUFQRjY0PW5ldyBGbG9hdDY0QXJyYXkoYik7fXZhciBfX0FUUFJFUlVOX189W107dmFyIF9fQVRJTklUX189W107dmFyIF9fQVRQT1NUUlVOX189W107ZnVuY3Rpb24gcHJlUnVuKCl7aWYoTW9kdWxlWyJwcmVSdW4iXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlUnVuIl09PSJmdW5jdGlvbiIpTW9kdWxlWyJwcmVSdW4iXT1bTW9kdWxlWyJwcmVSdW4iXV07d2hpbGUoTW9kdWxlWyJwcmVSdW4iXS5sZW5ndGgpe2FkZE9uUHJlUnVuKE1vZHVsZVsicHJlUnVuIl0uc2hpZnQoKSk7fX1jYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUFJFUlVOX18pO31mdW5jdGlvbiBpbml0UnVudGltZSgpe2NhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pO31mdW5jdGlvbiBwb3N0UnVuKCl7aWYoTW9kdWxlWyJwb3N0UnVuIl0pe2lmKHR5cGVvZiBNb2R1bGVbInBvc3RSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInBvc3RSdW4iXT1bTW9kdWxlWyJwb3N0UnVuIl1dO3doaWxlKE1vZHVsZVsicG9zdFJ1biJdLmxlbmd0aCl7YWRkT25Qb3N0UnVuKE1vZHVsZVsicG9zdFJ1biJdLnNoaWZ0KCkpO319Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBPU1RSVU5fXyk7fWZ1bmN0aW9uIGFkZE9uUHJlUnVuKGNiKXtfX0FUUFJFUlVOX18udW5zaGlmdChjYik7fWZ1bmN0aW9uIGFkZE9uSW5pdChjYil7X19BVElOSVRfXy51bnNoaWZ0KGNiKTt9ZnVuY3Rpb24gYWRkT25Qb3N0UnVuKGNiKXtfX0FUUE9TVFJVTl9fLnVuc2hpZnQoY2IpO312YXIgcnVuRGVwZW5kZW5jaWVzPTA7dmFyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2Z1bmN0aW9uIGFkZFJ1bkRlcGVuZGVuY3koaWQpe3J1bkRlcGVuZGVuY2llcysrO2lmKE1vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKXtNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXShydW5EZXBlbmRlbmNpZXMpO319ZnVuY3Rpb24gcmVtb3ZlUnVuRGVwZW5kZW5jeShpZCl7cnVuRGVwZW5kZW5jaWVzLS07aWYoTW9kdWxlWyJtb25pdG9yUnVuRGVwZW5kZW5jaWVzIl0pe01vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKHJ1bkRlcGVuZGVuY2llcyk7fWlmKHJ1bkRlcGVuZGVuY2llcz09MCl7aWYoZGVwZW5kZW5jaWVzRnVsZmlsbGVkKXt2YXIgY2FsbGJhY2s9ZGVwZW5kZW5jaWVzRnVsZmlsbGVkO2RlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2NhbGxiYWNrKCk7fX19ZnVuY3Rpb24gYWJvcnQod2hhdCl7aWYoTW9kdWxlWyJvbkFib3J0Il0pe01vZHVsZVsib25BYm9ydCJdKHdoYXQpO313aGF0PSJBYm9ydGVkKCIrd2hhdCsiKSI7ZXJyKHdoYXQpO0FCT1JUPXRydWU7d2hhdCs9Ii4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby4iO3ZhciBlPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdCk7cmVhZHlQcm9taXNlUmVqZWN0KGUpO3Rocm93IGV9dmFyIGRhdGFVUklQcmVmaXg9ImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCwiO3ZhciBpc0RhdGFVUkk9ZmlsZW5hbWU9PmZpbGVuYW1lLnN0YXJ0c1dpdGgoZGF0YVVSSVByZWZpeCk7dmFyIHdhc21CaW5hcnlGaWxlO3dhc21CaW5hcnlGaWxlPSJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsQUdGemJRRUFBQUFCWVE1Z0JIOS9mMzhBWUFOL2YzOEFZQVYvZjM5L2Z3QmdCbjkvZjM5L2Z3QmdBbjkvQUdBQmZ3Ri9ZQUFBWUFOL2YzOEJmMkFCZndCZ0IzOS9mMzkvZjM4QVlBSjlmUUYvWUFSL2YzNStBR0FCZlFGL1lBdC9mMzkvZjM5L2YzOS9md0FDUFFvQllRRmhBQUVCWVFGaUFBSUJZUUZqQUFFQllRRmtBQVFCWVFGbEFBRUJZUUZtQUFrQllRRm5BQVVCWVFGb0FBUUJZUUZwQUFBQllRRnFBQVFER3hvSEJRb0lCZ1FHQ3dFQUFRZ0lEQVlOQXdNQ0FnQUFCd2NGQlFRRkFYQUJFQkFGQndFQmdBS0FnQUlHQ0FGL0FVSGduUVFMQngwSEFXc0NBQUZzQUE0QmJRQVpBVzRBR0FGdkFRQUJjQUFqQVhFQUZna1ZBUUJCQVFzUEVDSU5GUlVoRFNBYUhCOE5HeDBlQ3JKUUduRUJBWDhnQWtVRVFDQUFLQUlFSUFFb0FnUkdEd3NnQUNBQlJnUkFRUUVQQ3dKQUlBQW9BZ1FpQWkwQUFDSUFSU0FBSUFFb0FnUWlBUzBBQUNJRFIzSU5BQU5BSUFFdEFBRWhBeUFDTFFBQklnQkZEUUVnQVVFQmFpRUJJQUpCQVdvaEFpQUFJQU5HRFFBTEN5QUFJQU5HQzA4QkFuOUIyQmtvQWdBaUFTQUFRUWRxUVhoeElnSnFJUUFDUUNBQ1FRQWdBQ0FCVFJzTkFDQUFQd0JCRUhSTEJFQWdBQkFHUlEwQkMwSFlHU0FBTmdJQUlBRVBDMEhvR1VFd05nSUFRWDhMRGdBZ0FCQVhJQUVRRjBFUWRISUxCZ0FnQUJBV0N5a0FRZUFaUVFFMkFnQkI1QmxCQURZQ0FCQVFRZVFaUWR3WktBSUFOZ0lBUWR3WlFlQVpOZ0lBQ3lFQUlBRUVRQU5BSUFCQkFEb0FBQ0FBUVFGcUlRQWdBVUVCYXlJQkRRQUxDd3ZoQXdCQmpCZEJtZ2tRQ1VHWUYwRzVDRUVCUVFBUUNFR2tGMEcwQ0VFQlFZQi9RZjhBRUFGQnZCZEJyUWhCQVVHQWYwSC9BQkFCUWJBWFFhc0lRUUZCQUVIL0FSQUJRY2dYUVlrSVFRSkJnSUIrUWYvL0FSQUJRZFFYUVlBSVFRSkJBRUgvL3dNUUFVSGdGMEdZQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCN0JkQmp3aEJCRUVBUVg4UUFVSDRGMEhYQ0VFRVFZQ0FnSUI0UWYvLy8vOEhFQUZCaEJoQnpnaEJCRUVBUVg4UUFVR1FHRUdqQ0VLQWdJQ0FnSUNBZ0lCL1F2Ly8vLy8vLy8vLy93QVFFVUdjR0VHaUNFSUFRbjhRRVVHb0dFR2NDRUVFRUFSQnRCaEJrd2xCQ0JBRVFZUVBRZWtJRUFOQnpBOUJsdzBRQTBHVUVFRUVRZHdJRUFKQjRCQkJBa0gxQ0JBQ1Fhd1JRUVJCaEFrUUFrSElFVUcrQ0JBSFFmQVJRUUJCMGd3UUFFR1lFa0VBUWJnTkVBQkJ3QkpCQVVId0RCQUFRZWdTUVFKQm53a1FBRUdRRTBFRFFiNEpFQUJCdUJOQkJFSG1DUkFBUWVBVFFRVkJnd29RQUVHSUZFRUVRZDBORUFCQnNCUkJCVUg3RFJBQVFaZ1NRUUJCNlFvUUFFSEFFa0VCUWNnS0VBQkI2QkpCQWtHckN4QUFRWkFUUVFOQmlRc1FBRUc0RTBFRVFiRU1FQUJCNEJOQkJVR1BEQkFBUWRnVVFRaEI3Z3NRQUVHQUZVRUpRY3dMRUFCQnFCVkJCa0dwQ2hBQVFkQVZRUWRCb2c0UUFBc2NBQ0FBSUFGQkNDQUNweUFDUWlDSXB5QURweUFEUWlDSXB4QUZDeUFBQWtBZ0FDZ0NCQ0FCUncwQUlBQW9BaHhCQVVZTkFDQUFJQUkyQWh3TEM1b0JBQ0FBUVFFNkFEVUNRQ0FBS0FJRUlBSkhEUUFnQUVFQk9nQTBBa0FnQUNnQ0VDSUNSUVJBSUFCQkFUWUNKQ0FBSUFNMkFoZ2dBQ0FCTmdJUUlBTkJBVWNOQWlBQUtBSXdRUUZHRFFFTUFnc2dBU0FDUmdSQUlBQW9BaGdpQWtFQ1JnUkFJQUFnQXpZQ0dDQURJUUlMSUFBb0FqQkJBVWNOQWlBQ1FRRkdEUUVNQWdzZ0FDQUFLQUlrUVFGcU5nSWtDeUFBUVFFNkFEWUxDMTBCQVg4Z0FDZ0NFQ0lEUlFSQUlBQkJBVFlDSkNBQUlBSTJBaGdnQUNBQk5nSVFEd3NDUUNBQklBTkdCRUFnQUNnQ0dFRUNSdzBCSUFBZ0FqWUNHQThMSUFCQkFUb0FOaUFBUVFJMkFoZ2dBQ0FBS0FJa1FRRnFOZ0lrQ3dzQ0FBdlNDd0VIZndKQUlBQkZEUUFnQUVFSWF5SUNJQUJCQkdzb0FnQWlBVUY0Y1NJQWFpRUZBa0FnQVVFQmNRMEFJQUZCQTNGRkRRRWdBaUFDS0FJQUlnRnJJZ0pCL0Jrb0FnQkpEUUVnQUNBQmFpRUFBa0FDUUVHQUdpZ0NBQ0FDUndSQUlBRkIvd0ZOQkVBZ0FVRURkaUVFSUFJb0Fnd2lBU0FDS0FJSUlnTkdCRUJCN0JsQjdCa29BZ0JCZmlBRWQzRTJBZ0FNQlFzZ0F5QUJOZ0lNSUFFZ0F6WUNDQXdFQ3lBQ0tBSVlJUVlnQWlBQ0tBSU1JZ0ZIQkVBZ0FpZ0NDQ0lESUFFMkFnd2dBU0FETmdJSURBTUxJQUpCRkdvaUJDZ0NBQ0lEUlFSQUlBSW9BaEFpQTBVTkFpQUNRUkJxSVFRTEEwQWdCQ0VISUFNaUFVRVVhaUlFS0FJQUlnTU5BQ0FCUVJCcUlRUWdBU2dDRUNJRERRQUxJQWRCQURZQ0FBd0NDeUFGS0FJRUlnRkJBM0ZCQTBjTkFrSDBHU0FBTmdJQUlBVWdBVUYrY1RZQ0JDQUNJQUJCQVhJMkFnUWdCU0FBTmdJQUR3dEJBQ0VCQ3lBR1JRMEFBa0FnQWlnQ0hDSURRUUowUVp3Y2FpSUVLQUlBSUFKR0JFQWdCQ0FCTmdJQUlBRU5BVUh3R1VId0dTZ0NBRUYrSUFOM2NUWUNBQXdDQ3lBR1FSQkJGQ0FHS0FJUUlBSkdHMm9nQVRZQ0FDQUJSUTBCQ3lBQklBWTJBaGdnQWlnQ0VDSURCRUFnQVNBRE5nSVFJQU1nQVRZQ0dBc2dBaWdDRkNJRFJRMEFJQUVnQXpZQ0ZDQURJQUUyQWhnTElBSWdCVThOQUNBRktBSUVJZ0ZCQVhGRkRRQUNRQUpBQWtBQ1FDQUJRUUp4UlFSQVFZUWFLQUlBSUFWR0JFQkJoQm9nQWpZQ0FFSDRHVUg0R1NnQ0FDQUFhaUlBTmdJQUlBSWdBRUVCY2pZQ0JDQUNRWUFhS0FJQVJ3MEdRZlFaUVFBMkFnQkJnQnBCQURZQ0FBOExRWUFhS0FJQUlBVkdCRUJCZ0JvZ0FqWUNBRUgwR1VIMEdTZ0NBQ0FBYWlJQU5nSUFJQUlnQUVFQmNqWUNCQ0FBSUFKcUlBQTJBZ0FQQ3lBQlFYaHhJQUJxSVFBZ0FVSC9BVTBFUUNBQlFRTjJJUVFnQlNnQ0RDSUJJQVVvQWdnaUEwWUVRRUhzR1VIc0dTZ0NBRUYrSUFSM2NUWUNBQXdGQ3lBRElBRTJBZ3dnQVNBRE5nSUlEQVFMSUFVb0FoZ2hCaUFGSUFVb0Fnd2lBVWNFUUVIOEdTZ0NBQm9nQlNnQ0NDSURJQUUyQWd3Z0FTQUROZ0lJREFNTElBVkJGR29pQkNnQ0FDSURSUVJBSUFVb0FoQWlBMFVOQWlBRlFSQnFJUVFMQTBBZ0JDRUhJQU1pQVVFVWFpSUVLQUlBSWdNTkFDQUJRUkJxSVFRZ0FTZ0NFQ0lERFFBTElBZEJBRFlDQUF3Q0N5QUZJQUZCZm5FMkFnUWdBaUFBUVFGeU5nSUVJQUFnQW1vZ0FEWUNBQXdEQzBFQUlRRUxJQVpGRFFBQ1FDQUZLQUljSWdOQkFuUkJuQnhxSWdRb0FnQWdCVVlFUUNBRUlBRTJBZ0FnQVEwQlFmQVpRZkFaS0FJQVFYNGdBM2R4TmdJQURBSUxJQVpCRUVFVUlBWW9BaEFnQlVZYmFpQUJOZ0lBSUFGRkRRRUxJQUVnQmpZQ0dDQUZLQUlRSWdNRVFDQUJJQU0yQWhBZ0F5QUJOZ0lZQ3lBRktBSVVJZ05GRFFBZ0FTQUROZ0lVSUFNZ0FUWUNHQXNnQWlBQVFRRnlOZ0lFSUFBZ0Ftb2dBRFlDQUNBQ1FZQWFLQUlBUncwQVFmUVpJQUEyQWdBUEN5QUFRZjhCVFFSQUlBQkJlSEZCbEJwcUlRRUNmMEhzR1NnQ0FDSURRUUVnQUVFRGRuUWlBSEZGQkVCQjdCa2dBQ0FEY2pZQ0FDQUJEQUVMSUFFb0FnZ0xJUUFnQVNBQ05nSUlJQUFnQWpZQ0RDQUNJQUUyQWd3Z0FpQUFOZ0lJRHd0Qkh5RURJQUJCLy8vL0IwMEVRQ0FBUVNZZ0FFRUlkbWNpQVd0MlFRRnhJQUZCQVhSclFUNXFJUU1MSUFJZ0F6WUNIQ0FDUWdBM0FoQWdBMEVDZEVHY0hHb2hBUUpBQWtBQ1FFSHdHU2dDQUNJRVFRRWdBM1FpQjNGRkJFQkI4QmtnQkNBSGNqWUNBQ0FCSUFJMkFnQWdBaUFCTmdJWURBRUxJQUJCR1NBRFFRRjJhMEVBSUFOQkgwY2JkQ0VESUFFb0FnQWhBUU5BSUFFaUJDZ0NCRUY0Y1NBQVJnMENJQU5CSFhZaEFTQURRUUYwSVFNZ0JDQUJRUVJ4YWlJSFFSQnFLQUlBSWdFTkFBc2dCeUFDTmdJUUlBSWdCRFlDR0FzZ0FpQUNOZ0lNSUFJZ0FqWUNDQXdCQ3lBRUtBSUlJZ0FnQWpZQ0RDQUVJQUkyQWdnZ0FrRUFOZ0lZSUFJZ0JEWUNEQ0FDSUFBMkFnZ0xRWXdhUVl3YUtBSUFRUUZySWdCQmZ5QUFHellDQUFzTGR3RUVmeUFBdkNJRVFmLy8vd054SVFFQ1FDQUVRUmQyUWY4QmNTSUNSUTBBSUFKQjhBQk5CRUFnQVVHQWdJQUVja0h4QUNBQ2EzWWhBUXdCQ3lBQ1FZMEJTd1JBUVlENEFTRURRUUFoQVF3QkN5QUNRUXAwUVlDQUIyc2hBd3NnQXlBRVFSQjJRWUNBQW5GeUlBRkJEWFp5UWYvL0EzRUxJd0VCZjBIY0dTZ0NBQ0lBQkVBRFFDQUFLQUlBRVFZQUlBQW9BZ1FpQUEwQUN3c0x2Z3NDQzM4SmZTTUFRYUFCYXlJTEpBQWdDMEV3YWtFa0VBOERRQ0FCSUExSEJFQWdBaUFOUVFOc0lneEJBbXBCQW5RaURtb3FBZ0FoRnlBQ0lBeEJBV3BCQW5RaUQyb3FBZ0FoR0NBSUlBeEJBblFpRUdvZ0FpQVFhaW9DQUNJWk9BSUFJQWdnRDJvZ0dEZ0NBQ0FJSUE1cUlCYzRBZ0FnQnlBTlFRVjBhaUlNSUJnNEFnUWdEQ0FaT0FJQUlBd2dGemdDQ0NBTVFRQTJBZ3dDUUNBQVJRUkFJQVlnRFdvdEFBQkZEUUVMSUF4QmdJQ0FDRFlDREFzZ0J5QU5RUVYwSWhGQkhISnFJQVVnRFVFQ2RDSU1RUUZ5SWhKcUxRQUFRUWgwSUFVZ0RHb3RBQUJ5SUFVZ0RFRUNjaUlUYWkwQUFFRVFkSElnQlNBTVFRTnlJZ3hxTFFBQVFSaDBjallDQUNBTElBTWdFa0VDZENJU2Fpb0NBQ0lYT0FLUUFTQUxJQU1nRTBFQ2RDSVRhaW9DQUNJWU9BS1VBU0FMSUFNZ0RFRUNkQ0lVYWlvQ0FDSVpPQUtZQVNBTElBTWdEVUVFZENJVmFpb0NBSXdpR2pnQ25BRWdDMEhnQUdvaURDQUxLZ0tZQVNJV1F3QUFBTUNVSUJhVUlBc3FBcFFCSWhaREFBQUF3SlFnRnBSREFBQ0FQNUtTT0FJQUlBd2dDeW9Da0FFaUZpQVdraUFMS2dLVUFaUWdDeW9DbUFGREFBQUF3SlFnQ3lvQ25BR1VramdDQkNBTUlBc3FBcEFCSWhZZ0ZwSWdDeW9DbUFHVUlBc3FBcFFCSWhZZ0ZwSWdDeW9DbkFHVWtqZ0NDQ0FNSUFzcUFwQUJJaFlnRnBJZ0N5b0NsQUdVSUFzcUFwZ0JJaFlnRnBJZ0N5b0NuQUdVa2pnQ0RDQU1JQXNxQXBnQkloWkRBQUFBd0pRZ0ZwUWdDeW9Da0FFaUZrTUFBQURBbENBV2xFTUFBSUEva3BJNEFoQWdEQ0FMS2dLVUFTSVdJQmFTSUFzcUFwZ0JsQ0FMS2dLUUFVTUFBQURBbENBTEtnS2NBWlNTT0FJVUlBd2dDeW9Da0FFaUZpQVdraUFMS2dLWUFaUWdDeW9DbEFGREFBQUF3SlFnQ3lvQ25BR1VramdDR0NBTUlBc3FBcFFCSWhZZ0ZwSWdDeW9DbUFHVUlBc3FBcEFCSWhZZ0ZwSWdDeW9DbkFHVWtqZ0NIQ0FNSUFzcUFwUUJJaFpEQUFBQXdKUWdGcFFnQ3lvQ2tBRWlGa01BQUFEQWxDQVdsRU1BQUlBL2twSTRBaUFnQ1NBVmFpQVhPQUlBSUFrZ0Vtb2dHRGdDQUNBSklCTnFJQms0QWdBZ0NTQVVhaUFhT0FJQUlBc2dCQ0FRYWlvQ0FDSVhPQUl3SUFzZ0JDQVBhaW9DQUNJWU9BSkFJQXNnQkNBT2Fpb0NBQ0laT0FKUUlBb2dFR29nRnpnQ0FDQUtJQTlxSUJnNEFnQWdDaUFPYWlBWk9BSUFJQXNnRENvQ0dDQUxLZ0k0bENBTUtnSUFJQXNxQWpDVUlBd3FBZ3dnQ3lvQ05KU1NramdDQUNBTElBd3FBaHdnQ3lvQ09KUWdEQ29DQkNBTEtnSXdsQ0FNS2dJUUlBc3FBalNVa3BJNEFnUWdDeUFNS2dJZ0lBc3FBamlVSUF3cUFnZ2dDeW9DTUpRZ0RDb0NGQ0FMS2dJMGxKS1NPQUlJSUFzZ0RDb0NHQ0FMS2dKRWxDQU1LZ0lBSUFzcUFqeVVJQXdxQWd3Z0N5b0NRSlNTa2pnQ0RDQUxJQXdxQWh3Z0N5b0NSSlFnRENvQ0JDQUxLZ0k4bENBTUtnSVFJQXNxQWtDVWtwSTRBaEFnQ3lBTUtnSWdJQXNxQWtTVUlBd3FBZ2dnQ3lvQ1BKUWdEQ29DRkNBTEtnSkFsSktTT0FJVUlBc2dEQ29DR0NBTEtnSlFsQ0FNS2dJQUlBc3FBa2lVSUF3cUFnd2dDeW9DVEpTU2tqZ0NHQ0FMSUF3cUFod2dDeW9DVUpRZ0RDb0NCQ0FMS2dKSWxDQU1LZ0lRSUFzcUFreVVrcEk0QWh3Z0N5QU1LZ0lnSUFzcUFsQ1VJQXdxQWdnZ0N5b0NTSlFnRENvQ0ZDQUxLZ0pNbEpLU09BSWdJQXNxQWlBaEZ5QUxLZ0lJSVJnZ0N5b0NGQ0VaSUFjZ0VVRVFjbW9nQ3lvQ0dDSWFJQnFVSUFzcUFnQWlGaUFXbENBTEtnSU1JaHNnRzVTU2trTUFBSUJBbENBYUlBc3FBaHdpSEpRZ0ZpQUxLZ0lFSWgyVUlCc2dDeW9DRUNJZWxKS1NRd0FBZ0VDVUVBdzJBZ0FnQnlBUlFSUnlhaUFhSUJlVUlCWWdHSlFnR3lBWmxKS1NRd0FBZ0VDVUlCd2dISlFnSFNBZGxDQWVJQjZVa3BKREFBQ0FRSlFRRERZQ0FDQUhJQkZCR0hKcUlCd2dGNVFnSFNBWWxDQWVJQm1Va3BKREFBQ0FRSlFnRnlBWGxDQVlJQmlVSUJrZ0daU1Nra01BQUlCQWxCQU1OZ0lBSUExQkFXb2hEUXdCQ3dzZ0MwR2dBV29rQUFzYUFDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFUQ3dzM0FDQUFJQUVvQWdnZ0JSQUtCRUFnQVNBQ0lBTWdCQkFURHdzZ0FDZ0NDQ0lBSUFFZ0FpQURJQVFnQlNBQUtBSUFLQUlVRVFNQUM1RUJBQ0FBSUFFb0FnZ2dCQkFLQkVBZ0FTQUNJQU1RRWc4TEFrQWdBQ0FCS0FJQUlBUVFDa1VOQUFKQUlBSWdBU2dDRUVjRVFDQUJLQUlVSUFKSERRRUxJQU5CQVVjTkFTQUJRUUUyQWlBUEN5QUJJQUkyQWhRZ0FTQUROZ0lnSUFFZ0FTZ0NLRUVCYWpZQ0tBSkFJQUVvQWlSQkFVY05BQ0FCS0FJWVFRSkhEUUFnQVVFQk9nQTJDeUFCUVFRMkFpd0xDL0lCQUNBQUlBRW9BZ2dnQkJBS0JFQWdBU0FDSUFNUUVnOExBa0FnQUNBQktBSUFJQVFRQ2dSQUFrQWdBaUFCS0FJUVJ3UkFJQUVvQWhRZ0FrY05BUXNnQTBFQlJ3MENJQUZCQVRZQ0lBOExJQUVnQXpZQ0lBSkFJQUVvQWl4QkJFWU5BQ0FCUVFBN0FUUWdBQ2dDQ0NJQUlBRWdBaUFDUVFFZ0JDQUFLQUlBS0FJVUVRTUFJQUV0QURVRVFDQUJRUU0yQWl3Z0FTMEFORVVOQVF3REN5QUJRUVEyQWl3TElBRWdBallDRkNBQklBRW9BaWhCQVdvMkFpZ2dBU2dDSkVFQlJ3MEJJQUVvQWhoQkFrY05BU0FCUVFFNkFEWVBDeUFBS0FJSUlnQWdBU0FDSUFNZ0JDQUFLQUlBS0FJWUVRSUFDd3N4QUNBQUlBRW9BZ2hCQUJBS0JFQWdBU0FDSUFNUUZBOExJQUFvQWdnaUFDQUJJQUlnQXlBQUtBSUFLQUljRVFBQUN4Z0FJQUFnQVNnQ0NFRUFFQW9FUUNBQklBSWdBeEFVQ3d2SkF3RUZmeU1BUVVCcUlnUWtBQUovUVFFZ0FDQUJRUUFRQ2cwQUdrRUFJQUZGRFFBYUl3QkJRR29pQXlRQUlBRW9BZ0FpQlVFRWF5Z0NBQ0VHSUFWQkNHc29BZ0FoQlNBRFFnQTNBaUFnQTBJQU53SW9JQU5DQURjQ01DQURRZ0EzQURjZ0EwSUFOd0lZSUFOQkFEWUNGQ0FEUWZ3Vk5nSVFJQU1nQVRZQ0RDQURRYXdXTmdJSUlBRWdCV29oQVVFQUlRVUNRQ0FHUWF3V1FRQVFDZ1JBSUFOQkFUWUNPQ0FHSUFOQkNHb2dBU0FCUVFGQkFDQUdLQUlBS0FJVUVRTUFJQUZCQUNBREtBSWdRUUZHR3lFRkRBRUxJQVlnQTBFSWFpQUJRUUZCQUNBR0tBSUFLQUlZRVFJQUFrQUNRQ0FES0FJc0RnSUFBUUlMSUFNb0FoeEJBQ0FES0FJb1FRRkdHMEVBSUFNb0FpUkJBVVliUVFBZ0F5Z0NNRUVCUmhzaEJRd0JDeUFES0FJZ1FRRkhCRUFnQXlnQ01BMEJJQU1vQWlSQkFVY05BU0FES0FJb1FRRkhEUUVMSUFNb0FoZ2hCUXNnQTBGQWF5UUFRUUFnQlNJQlJRMEFHaUFFUVF4cVFUUVFEeUFFUVFFMkFqZ2dCRUYvTmdJVUlBUWdBRFlDRUNBRUlBRTJBZ2dnQVNBRVFRaHFJQUlvQWdCQkFTQUJLQUlBS0FJY0VRQUFJQVFvQWlBaUFFRUJSZ1JBSUFJZ0JDZ0NHRFlDQUFzZ0FFRUJSZ3NoQnlBRVFVQnJKQUFnQndzS0FDQUFJQUZCQUJBS0N3UUFJQUFMdlNjQkRIOGpBRUVRYXlJS0pBQUNRQUpBQWtBQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFJQUJCOUFGTkJFQkI3QmtvQWdBaUJrRVFJQUJCQzJwQmVIRWdBRUVMU1JzaUJVRURkaUlBZGlJQlFRTnhCRUFDUUNBQlFYOXpRUUZ4SUFCcUlnSkJBM1FpQVVHVUdtb2lBQ0FCUVp3YWFpZ0NBQ0lCS0FJSUlnUkdCRUJCN0JrZ0JrRitJQUozY1RZQ0FBd0JDeUFFSUFBMkFnd2dBQ0FFTmdJSUN5QUJRUWhxSVFBZ0FTQUNRUU4wSWdKQkEzSTJBZ1FnQVNBQ2FpSUJJQUVvQWdSQkFYSTJBZ1FNRHdzZ0JVSDBHU2dDQUNJSFRRMEJJQUVFUUFKQVFRSWdBSFFpQWtFQUlBSnJjaUFCSUFCMGNXZ2lBVUVEZENJQVFaUWFhaUlDSUFCQm5CcHFLQUlBSWdBb0FnZ2lCRVlFUUVIc0dTQUdRWDRnQVhkeElnWTJBZ0FNQVFzZ0JDQUNOZ0lNSUFJZ0JEWUNDQXNnQUNBRlFRTnlOZ0lFSUFBZ0JXb2lDQ0FCUVFOMElnRWdCV3NpQkVFQmNqWUNCQ0FBSUFGcUlBUTJBZ0FnQndSQUlBZEJlSEZCbEJwcUlRRkJnQm9vQWdBaEFnSi9JQVpCQVNBSFFRTjJkQ0lEY1VVRVFFSHNHU0FESUFaeU5nSUFJQUVNQVFzZ0FTZ0NDQXNoQXlBQklBSTJBZ2dnQXlBQ05nSU1JQUlnQVRZQ0RDQUNJQU0yQWdnTElBQkJDR29oQUVHQUdpQUlOZ0lBUWZRWklBUTJBZ0FNRHd0QjhCa29BZ0FpQzBVTkFTQUxhRUVDZEVHY0hHb29BZ0FpQWlnQ0JFRjRjU0FGYXlFRElBSWhBUU5BQWtBZ0FTZ0NFQ0lBUlFSQUlBRW9BaFFpQUVVTkFRc2dBQ2dDQkVGNGNTQUZheUlCSUFNZ0FTQURTU0lCR3lFRElBQWdBaUFCR3lFQ0lBQWhBUXdCQ3dzZ0FpZ0NHQ0VKSUFJZ0FpZ0NEQ0lFUndSQVFmd1pLQUlBR2lBQ0tBSUlJZ0FnQkRZQ0RDQUVJQUEyQWdnTURnc2dBa0VVYWlJQktBSUFJZ0JGQkVBZ0FpZ0NFQ0lBUlEwRElBSkJFR29oQVFzRFFDQUJJUWdnQUNJRVFSUnFJZ0VvQWdBaUFBMEFJQVJCRUdvaEFTQUVLQUlRSWdBTkFBc2dDRUVBTmdJQURBMExRWDhoQlNBQVFiOS9TdzBBSUFCQkMyb2lBRUY0Y1NFRlFmQVpLQUlBSWdoRkRRQkJBQ0FGYXlFREFrQUNRQUpBQW45QkFDQUZRWUFDU1EwQUdrRWZJQVZCLy8vL0Iwc05BQm9nQlVFbUlBQkJDSFpuSWdCcmRrRUJjU0FBUVFGMGEwRSthZ3NpQjBFQ2RFR2NIR29vQWdBaUFVVUVRRUVBSVFBTUFRdEJBQ0VBSUFWQkdTQUhRUUYyYTBFQUlBZEJIMGNiZENFQ0EwQUNRQ0FCS0FJRVFYaHhJQVZySWdZZ0EwOE5BQ0FCSVFRZ0JpSUREUUJCQUNFRElBRWhBQXdEQ3lBQUlBRW9BaFFpQmlBR0lBRWdBa0VkZGtFRWNXb29BaEFpQVVZYklBQWdCaHNoQUNBQ1FRRjBJUUlnQVEwQUN3c2dBQ0FFY2tVRVFFRUFJUVJCQWlBSGRDSUFRUUFnQUd0eUlBaHhJZ0JGRFFNZ0FHaEJBblJCbkJ4cUtBSUFJUUFMSUFCRkRRRUxBMEFnQUNnQ0JFRjRjU0FGYXlJQ0lBTkpJUUVnQWlBRElBRWJJUU1nQUNBRUlBRWJJUVFnQUNnQ0VDSUJCSDhnQVFVZ0FDZ0NGQXNpQUEwQUN3c2dCRVVOQUNBRFFmUVpLQUlBSUFWclR3MEFJQVFvQWhnaEJ5QUVJQVFvQWd3aUFrY0VRRUg4R1NnQ0FCb2dCQ2dDQ0NJQUlBSTJBZ3dnQWlBQU5nSUlEQXdMSUFSQkZHb2lBU2dDQUNJQVJRUkFJQVFvQWhBaUFFVU5BeUFFUVJCcUlRRUxBMEFnQVNFR0lBQWlBa0VVYWlJQktBSUFJZ0FOQUNBQ1FSQnFJUUVnQWlnQ0VDSUFEUUFMSUFaQkFEWUNBQXdMQ3lBRlFmUVpLQUlBSWdSTkJFQkJnQm9vQWdBaEFBSkFJQVFnQldzaUFVRVFUd1JBSUFBZ0JXb2lBaUFCUVFGeU5nSUVJQUFnQkdvZ0FUWUNBQ0FBSUFWQkEzSTJBZ1FNQVFzZ0FDQUVRUU55TmdJRUlBQWdCR29pQVNBQktBSUVRUUZ5TmdJRVFRQWhBa0VBSVFFTFFmUVpJQUUyQWdCQmdCb2dBallDQUNBQVFRaHFJUUFNRFFzZ0JVSDRHU2dDQUNJQ1NRUkFRZmdaSUFJZ0JXc2lBVFlDQUVHRUdrR0VHaWdDQUNJQUlBVnFJZ0kyQWdBZ0FpQUJRUUZ5TmdJRUlBQWdCVUVEY2pZQ0JDQUFRUWhxSVFBTURRdEJBQ0VBSUFWQkwyb2lBd0ovUWNRZEtBSUFCRUJCekIwb0FnQU1BUXRCMEIxQ2Z6Y0NBRUhJSFVLQW9JQ0FnSUFFTndJQVFjUWRJQXBCREdwQmNIRkIyS3JWcWdWek5nSUFRZGdkUVFBMkFnQkJxQjFCQURZQ0FFR0FJQXNpQVdvaUJrRUFJQUZySWdoeElnRWdCVTBOREVHa0hTZ0NBQ0lFQkVCQm5CMG9BZ0FpQnlBQmFpSUpJQWROSUFRZ0NVbHlEUTBMQWtCQnFCMHRBQUJCQkhGRkJFQUNRQUpBQWtBQ1FFR0VHaWdDQUNJRUJFQkJyQjBoQUFOQUlBUWdBQ2dDQUNJSFR3UkFJQWNnQUNnQ0JHb2dCRXNOQXdzZ0FDZ0NDQ0lBRFFBTEMwRUFFQXNpQWtGL1JnMERJQUVoQmtISUhTZ0NBQ0lBUVFGcklnUWdBbkVFUUNBQklBSnJJQUlnQkdwQkFDQUFhM0ZxSVFZTElBVWdCazhOQTBHa0hTZ0NBQ0lBQkVCQm5CMG9BZ0FpQkNBR2FpSUlJQVJOSUFBZ0NFbHlEUVFMSUFZUUN5SUFJQUpIRFFFTUJRc2dCaUFDYXlBSWNTSUdFQXNpQWlBQUtBSUFJQUFvQWdScVJnMEJJQUloQUFzZ0FFRi9SZzBCSUFWQk1Hb2dCazBFUUNBQUlRSU1CQXRCekIwb0FnQWlBaUFESUFacmFrRUFJQUpyY1NJQ0VBdEJmMFlOQVNBQ0lBWnFJUVlnQUNFQ0RBTUxJQUpCZjBjTkFndEJxQjFCcUIwb0FnQkJCSEkyQWdBTElBRVFDeUlDUVg5R1FRQVFDeUlBUVg5R2NpQUFJQUpOY2cwRklBQWdBbXNpQmlBRlFTaHFUUTBGQzBHY0hVR2NIU2dDQUNBR2FpSUFOZ0lBUWFBZEtBSUFJQUJKQkVCQm9CMGdBRFlDQUFzQ1FFR0VHaWdDQUNJREJFQkJyQjBoQUFOQUlBSWdBQ2dDQUNJQklBQW9BZ1FpQkdwR0RRSWdBQ2dDQ0NJQURRQUxEQVFMUWZ3WktBSUFJZ0JCQUNBQUlBSk5HMFVFUUVIOEdTQUNOZ0lBQzBFQUlRQkJzQjBnQmpZQ0FFR3NIU0FDTmdJQVFZd2FRWDgyQWdCQmtCcEJ4QjBvQWdBMkFnQkJ1QjFCQURZQ0FBTkFJQUJCQTNRaUFVR2NHbW9nQVVHVUdtb2lCRFlDQUNBQlFhQWFhaUFFTmdJQUlBQkJBV29pQUVFZ1J3MEFDMEg0R1NBR1FTaHJJZ0JCZUNBQ2EwRUhjU0lCYXlJRU5nSUFRWVFhSUFFZ0Ftb2lBVFlDQUNBQklBUkJBWEkyQWdRZ0FDQUNha0VvTmdJRVFZZ2FRZFFkS0FJQU5nSUFEQVFMSUFJZ0EwMGdBU0FEUzNJTkFpQUFLQUlNUVFoeERRSWdBQ0FFSUFacU5nSUVRWVFhSUFOQmVDQURhMEVIY1NJQWFpSUJOZ0lBUWZnWlFmZ1pLQUlBSUFacUlnSWdBR3NpQURZQ0FDQUJJQUJCQVhJMkFnUWdBaUFEYWtFb05nSUVRWWdhUWRRZEtBSUFOZ0lBREFNTFFRQWhCQXdLQzBFQUlRSU1DQXRCL0Jrb0FnQWdBa3NFUUVIOEdTQUNOZ0lBQ3lBQ0lBWnFJUUZCckIwaEFBSkFBa0FDUUFOQUlBRWdBQ2dDQUVjRVFDQUFLQUlJSWdBTkFRd0NDd3NnQUMwQURFRUljVVVOQVF0QnJCMGhBQU5BSUFNZ0FDZ0NBQ0lCVHdSQUlBRWdBQ2dDQkdvaUJDQURTdzBEQ3lBQUtBSUlJUUFNQUFzQUN5QUFJQUkyQWdBZ0FDQUFLQUlFSUFacU5nSUVJQUpCZUNBQ2EwRUhjV29pQnlBRlFRTnlOZ0lFSUFGQmVDQUJhMEVIY1dvaUJpQUZJQWRxSWdWcklRQWdBeUFHUmdSQVFZUWFJQVUyQWdCQitCbEIrQmtvQWdBZ0FHb2lBRFlDQUNBRklBQkJBWEkyQWdRTUNBdEJnQm9vQWdBZ0JrWUVRRUdBR2lBRk5nSUFRZlFaUWZRWktBSUFJQUJxSWdBMkFnQWdCU0FBUVFGeU5nSUVJQUFnQldvZ0FEWUNBQXdJQ3lBR0tBSUVJZ05CQTNGQkFVY05CaUFEUVhoeElRa2dBMEgvQVUwRVFDQUdLQUlNSWdFZ0JpZ0NDQ0lDUmdSQVFld1pRZXdaS0FJQVFYNGdBMEVEZG5keE5nSUFEQWNMSUFJZ0FUWUNEQ0FCSUFJMkFnZ01CZ3NnQmlnQ0dDRUlJQVlnQmlnQ0RDSUNSd1JBSUFZb0FnZ2lBU0FDTmdJTUlBSWdBVFlDQ0F3RkN5QUdRUlJxSWdFb0FnQWlBMFVFUUNBR0tBSVFJZ05GRFFRZ0JrRVFhaUVCQ3dOQUlBRWhCQ0FESWdKQkZHb2lBU2dDQUNJRERRQWdBa0VRYWlFQklBSW9BaEFpQXcwQUN5QUVRUUEyQWdBTUJBdEIrQmtnQmtFb2F5SUFRWGdnQW10QkIzRWlBV3NpQ0RZQ0FFR0VHaUFCSUFKcUlnRTJBZ0FnQVNBSVFRRnlOZ0lFSUFBZ0FtcEJLRFlDQkVHSUdrSFVIU2dDQURZQ0FDQURJQVJCSnlBRWEwRUhjV3BCTDJzaUFDQUFJQU5CRUdwSkd5SUJRUnMyQWdRZ0FVRzBIU2tDQURjQ0VDQUJRYXdkS1FJQU53SUlRYlFkSUFGQkNHbzJBZ0JCc0IwZ0JqWUNBRUdzSFNBQ05nSUFRYmdkUVFBMkFnQWdBVUVZYWlFQUEwQWdBRUVITmdJRUlBQkJDR29oRENBQVFRUnFJUUFnRENBRVNRMEFDeUFCSUFOR0RRQWdBU0FCS0FJRVFYNXhOZ0lFSUFNZ0FTQURheUlDUVFGeU5nSUVJQUVnQWpZQ0FDQUNRZjhCVFFSQUlBSkJlSEZCbEJwcUlRQUNmMEhzR1NnQ0FDSUJRUUVnQWtFRGRuUWlBbkZGQkVCQjdCa2dBU0FDY2pZQ0FDQUFEQUVMSUFBb0FnZ0xJUUVnQUNBRE5nSUlJQUVnQXpZQ0RDQURJQUEyQWd3Z0F5QUJOZ0lJREFFTFFSOGhBQ0FDUWYvLy93ZE5CRUFnQWtFbUlBSkJDSFpuSWdCcmRrRUJjU0FBUVFGMGEwRSthaUVBQ3lBRElBQTJBaHdnQTBJQU53SVFJQUJCQW5SQm5CeHFJUUVDUUFKQVFmQVpLQUlBSWdSQkFTQUFkQ0lHY1VVRVFFSHdHU0FFSUFaeU5nSUFJQUVnQXpZQ0FBd0JDeUFDUVJrZ0FFRUJkbXRCQUNBQVFSOUhHM1FoQUNBQktBSUFJUVFEUUNBRUlnRW9BZ1JCZUhFZ0FrWU5BaUFBUVIxMklRUWdBRUVCZENFQUlBRWdCRUVFY1dvaUJpZ0NFQ0lFRFFBTElBWWdBellDRUFzZ0F5QUJOZ0lZSUFNZ0F6WUNEQ0FESUFNMkFnZ01BUXNnQVNnQ0NDSUFJQU0yQWd3Z0FTQUROZ0lJSUFOQkFEWUNHQ0FESUFFMkFnd2dBeUFBTmdJSUMwSDRHU2dDQUNJQUlBVk5EUUJCK0JrZ0FDQUZheUlCTmdJQVFZUWFRWVFhS0FJQUlnQWdCV29pQWpZQ0FDQUNJQUZCQVhJMkFnUWdBQ0FGUVFOeU5nSUVJQUJCQ0dvaEFBd0lDMEhvR1VFd05nSUFRUUFoQUF3SEMwRUFJUUlMSUFoRkRRQUNRQ0FHS0FJY0lnRkJBblJCbkJ4cUlnUW9BZ0FnQmtZRVFDQUVJQUkyQWdBZ0FnMEJRZkFaUWZBWktBSUFRWDRnQVhkeE5nSUFEQUlMSUFoQkVFRVVJQWdvQWhBZ0JrWWJhaUFDTmdJQUlBSkZEUUVMSUFJZ0NEWUNHQ0FHS0FJUUlnRUVRQ0FDSUFFMkFoQWdBU0FDTmdJWUN5QUdLQUlVSWdGRkRRQWdBaUFCTmdJVUlBRWdBallDR0FzZ0FDQUphaUVBSUFZZ0NXb2lCaWdDQkNFREN5QUdJQU5CZm5FMkFnUWdCU0FBUVFGeU5nSUVJQUFnQldvZ0FEWUNBQ0FBUWY4QlRRUkFJQUJCZUhGQmxCcHFJUUVDZjBIc0dTZ0NBQ0lDUVFFZ0FFRURkblFpQUhGRkJFQkI3QmtnQUNBQ2NqWUNBQ0FCREFFTElBRW9BZ2dMSVFBZ0FTQUZOZ0lJSUFBZ0JUWUNEQ0FGSUFFMkFnd2dCU0FBTmdJSURBRUxRUjhoQXlBQVFmLy8vd2ROQkVBZ0FFRW1JQUJCQ0habklnRnJka0VCY1NBQlFRRjBhMEUrYWlFREN5QUZJQU0yQWh3Z0JVSUFOd0lRSUFOQkFuUkJuQnhxSVFFQ1FBSkFRZkFaS0FJQUlnSkJBU0FEZENJRWNVVUVRRUh3R1NBQ0lBUnlOZ0lBSUFFZ0JUWUNBQXdCQ3lBQVFSa2dBMEVCZG10QkFDQURRUjlIRzNRaEF5QUJLQUlBSVFJRFFDQUNJZ0VvQWdSQmVIRWdBRVlOQWlBRFFSMTJJUUlnQTBFQmRDRURJQUVnQWtFRWNXb2lCQ2dDRUNJQ0RRQUxJQVFnQlRZQ0VBc2dCU0FCTmdJWUlBVWdCVFlDRENBRklBVTJBZ2dNQVFzZ0FTZ0NDQ0lBSUFVMkFnd2dBU0FGTmdJSUlBVkJBRFlDR0NBRklBRTJBZ3dnQlNBQU5nSUlDeUFIUVFocUlRQU1BZ3NDUUNBSFJRMEFBa0FnQkNnQ0hDSUFRUUowUVp3Y2FpSUJLQUlBSUFSR0JFQWdBU0FDTmdJQUlBSU5BVUh3R1NBSVFYNGdBSGR4SWdnMkFnQU1BZ3NnQjBFUVFSUWdCeWdDRUNBRVJodHFJQUkyQWdBZ0FrVU5BUXNnQWlBSE5nSVlJQVFvQWhBaUFBUkFJQUlnQURZQ0VDQUFJQUkyQWhnTElBUW9BaFFpQUVVTkFDQUNJQUEyQWhRZ0FDQUNOZ0lZQ3dKQUlBTkJEMDBFUUNBRUlBTWdCV29pQUVFRGNqWUNCQ0FBSUFScUlnQWdBQ2dDQkVFQmNqWUNCQXdCQ3lBRUlBVkJBM0kyQWdRZ0JDQUZhaUlDSUFOQkFYSTJBZ1FnQWlBRGFpQUROZ0lBSUFOQi93Rk5CRUFnQTBGNGNVR1VHbW9oQUFKL1Fld1pLQUlBSWdGQkFTQURRUU4yZENJRGNVVUVRRUhzR1NBQklBTnlOZ0lBSUFBTUFRc2dBQ2dDQ0FzaEFTQUFJQUkyQWdnZ0FTQUNOZ0lNSUFJZ0FEWUNEQ0FDSUFFMkFnZ01BUXRCSHlFQUlBTkIvLy8vQjAwRVFDQURRU1lnQTBFSWRtY2lBR3QyUVFGeElBQkJBWFJyUVQ1cUlRQUxJQUlnQURZQ0hDQUNRZ0EzQWhBZ0FFRUNkRUdjSEdvaEFRSkFBa0FnQ0VFQklBQjBJZ1p4UlFSQVFmQVpJQVlnQ0hJMkFnQWdBU0FDTmdJQURBRUxJQU5CR1NBQVFRRjJhMEVBSUFCQkgwY2JkQ0VBSUFFb0FnQWhCUU5BSUFVaUFTZ0NCRUY0Y1NBRFJnMENJQUJCSFhZaEJpQUFRUUYwSVFBZ0FTQUdRUVJ4YWlJR0tBSVFJZ1VOQUFzZ0JpQUNOZ0lRQ3lBQ0lBRTJBaGdnQWlBQ05nSU1JQUlnQWpZQ0NBd0JDeUFCS0FJSUlnQWdBallDRENBQklBSTJBZ2dnQWtFQU5nSVlJQUlnQVRZQ0RDQUNJQUEyQWdnTElBUkJDR29oQUF3QkN3SkFJQWxGRFFBQ1FDQUNLQUljSWdCQkFuUkJuQnhxSWdFb0FnQWdBa1lFUUNBQklBUTJBZ0FnQkEwQlFmQVpJQXRCZmlBQWQzRTJBZ0FNQWdzZ0NVRVFRUlFnQ1NnQ0VDQUNSaHRxSUFRMkFnQWdCRVVOQVFzZ0JDQUpOZ0lZSUFJb0FoQWlBQVJBSUFRZ0FEWUNFQ0FBSUFRMkFoZ0xJQUlvQWhRaUFFVU5BQ0FFSUFBMkFoUWdBQ0FFTmdJWUN3SkFJQU5CRDAwRVFDQUNJQU1nQldvaUFFRURjallDQkNBQUlBSnFJZ0FnQUNnQ0JFRUJjallDQkF3QkN5QUNJQVZCQTNJMkFnUWdBaUFGYWlJRUlBTkJBWEkyQWdRZ0F5QUVhaUFETmdJQUlBY0VRQ0FIUVhoeFFaUWFhaUVBUVlBYUtBSUFJUUVDZjBFQklBZEJBM1owSWdVZ0JuRkZCRUJCN0JrZ0JTQUdjallDQUNBQURBRUxJQUFvQWdnTElRWWdBQ0FCTmdJSUlBWWdBVFlDRENBQklBQTJBZ3dnQVNBR05nSUlDMEdBR2lBRU5nSUFRZlFaSUFNMkFnQUxJQUpCQ0dvaEFBc2dDa0VRYWlRQUlBQUxDK2NSQWdCQmdBZ0wxaEYxYm5OcFoyNWxaQ0J6YUc5eWRBQjFibk5wWjI1bFpDQnBiblFBWm14dllYUUFkV2x1ZERZMFgzUUFkVzV6YVdkdVpXUWdZMmhoY2dCaWIyOXNBR1Z0YzJOeWFYQjBaVzQ2T25aaGJBQjFibk5wWjI1bFpDQnNiMjVuQUhOMFpEbzZkM04wY21sdVp3QnpkR1E2T25OMGNtbHVad0J6ZEdRNk9uVXhObk4wY21sdVp3QnpkR1E2T25Vek1uTjBjbWx1WndCa2IzVmliR1VBZG05cFpBQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4emFHOXlkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhkVzV6YVdkdVpXUWdjMmh2Y25RK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEdsdWRENEFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGRXNXphV2R1WldRZ2FXNTBQZ0JsYlhOamNtbHdkR1Z1T2pwdFpXMXZjbmxmZG1sbGR6eG1iRzloZEQ0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4ZFdsdWREaGZkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhhVzUwT0Y5MFBnQmxiWE5qY21sd2RHVnVPanB0WlcxdmNubGZkbWxsZHp4MWFXNTBNVFpmZEQ0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4YVc1ME1UWmZkRDRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhkV2x1ZERZMFgzUStBR1Z0YzJOeWFYQjBaVzQ2T20xbGJXOXllVjkyYVdWM1BHbHVkRFkwWDNRK0FHVnRjMk55YVhCMFpXNDZPbTFsYlc5eWVWOTJhV1YzUEhWcGJuUXpNbDkwUGdCbGJYTmpjbWx3ZEdWdU9qcHRaVzF2Y25sZmRtbGxkenhwYm5Rek1sOTBQZ0JsYlhOamNtbHdkR1Z1T2pwdFpXMXZjbmxmZG1sbGR6eGphR0Z5UGdCbGJYTmpjbWx3ZEdWdU9qcHRaVzF2Y25sZmRtbGxkengxYm5OcFoyNWxaQ0JqYUdGeVBnQnpkR1E2T21KaGMybGpYM04wY21sdVp6eDFibk5wWjI1bFpDQmphR0Z5UGdCbGJYTmpjbWx3ZEdWdU9qcHRaVzF2Y25sZmRtbGxkenh6YVdkdVpXUWdZMmhoY2o0QVpXMXpZM0pwY0hSbGJqbzZiV1Z0YjNKNVgzWnBaWGM4Ykc5dVp6NEFaVzF6WTNKcGNIUmxiam82YldWdGIzSjVYM1pwWlhjOGRXNXphV2R1WldRZ2JHOXVaejRBWlcxelkzSnBjSFJsYmpvNmJXVnRiM0o1WDNacFpYYzhaRzkxWW14bFBnQk9VM1F6WDE4eU1USmlZWE5wWTE5emRISnBibWRKWTA1VFh6RXhZMmhoY2w5MGNtRnBkSE5KWTBWRlRsTmZPV0ZzYkc5allYUnZja2xqUlVWRlJRQUFBQUJFREFBQVFnY0FBRTVUZEROZlh6SXhNbUpoYzJsalgzTjBjbWx1WjBsb1RsTmZNVEZqYUdGeVgzUnlZV2wwYzBsb1JVVk9VMTg1WVd4c2IyTmhkRzl5U1doRlJVVkZBQUJFREFBQWpBY0FBRTVUZEROZlh6SXhNbUpoYzJsalgzTjBjbWx1WjBsM1RsTmZNVEZqYUdGeVgzUnlZV2wwYzBsM1JVVk9VMTg1WVd4c2IyTmhkRzl5U1hkRlJVVkZBQUJFREFBQTFBY0FBRTVUZEROZlh6SXhNbUpoYzJsalgzTjBjbWx1WjBsRWMwNVRYekV4WTJoaGNsOTBjbUZwZEhOSlJITkZSVTVUWHpsaGJHeHZZMkYwYjNKSlJITkZSVVZGQUFBQVJBd0FBQndJQUFCT1UzUXpYMTh5TVRKaVlYTnBZMTl6ZEhKcGJtZEpSR2xPVTE4eE1XTm9ZWEpmZEhKaGFYUnpTVVJwUlVWT1UxODVZV3hzYjJOaGRHOXlTVVJwUlVWRlJRQUFBRVFNQUFCb0NBQUFUakV3WlcxelkzSnBjSFJsYmpOMllXeEZBQUJFREFBQXRBZ0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTV05GUlFBQVJBd0FBTkFJQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBsaFJVVUFBRVFNQUFENENBQUFUakV3WlcxelkzSnBjSFJsYmpFeGJXVnRiM0o1WDNacFpYZEphRVZGQUFCRURBQUFJQWtBQUU0eE1HVnRjMk55YVhCMFpXNHhNVzFsYlc5eWVWOTJhV1YzU1hORlJRQUFSQXdBQUVnSkFBQk9NVEJsYlhOamNtbHdkR1Z1TVRGdFpXMXZjbmxmZG1sbGQwbDBSVVVBQUVRTUFBQndDUUFBVGpFd1pXMXpZM0pwY0hSbGJqRXhiV1Z0YjNKNVgzWnBaWGRKYVVWRkFBQkVEQUFBbUFrQUFFNHhNR1Z0YzJOeWFYQjBaVzR4TVcxbGJXOXllVjkyYVdWM1NXcEZSUUFBUkF3QUFNQUpBQUJPTVRCbGJYTmpjbWx3ZEdWdU1URnRaVzF2Y25sZmRtbGxkMGxzUlVVQUFFUU1BQURvQ1FBQVRqRXdaVzF6WTNKcGNIUmxiakV4YldWdGIzSjVYM1pwWlhkSmJVVkZBQUJFREFBQUVBb0FBRTR4TUdWdGMyTnlhWEIwWlc0eE1XMWxiVzl5ZVY5MmFXVjNTWGhGUlFBQVJBd0FBRGdLQUFCT01UQmxiWE5qY21sd2RHVnVNVEZ0WlcxdmNubGZkbWxsZDBsNVJVVUFBRVFNQUFCZ0NnQUFUakV3WlcxelkzSnBjSFJsYmpFeGJXVnRiM0o1WDNacFpYZEpaa1ZGQUFCRURBQUFpQW9BQUU0eE1HVnRjMk55YVhCMFpXNHhNVzFsYlc5eWVWOTJhV1YzU1dSRlJRQUFSQXdBQUxBS0FBQk9NVEJmWDJONGVHRmlhWFl4TVRaZlgzTm9hVzFmZEhsd1pWOXBibVp2UlFBQUFBQnNEQUFBMkFvQUFOQU1BQUJPTVRCZlgyTjRlR0ZpYVhZeE1UZGZYMk5zWVhOelgzUjVjR1ZmYVc1bWIwVUFBQUJzREFBQUNBc0FBUHdLQUFBQUFBQUFmQXNBQUFJQUFBQURBQUFBQkFBQUFBVUFBQUFHQUFBQVRqRXdYMTlqZUhoaFltbDJNVEl6WDE5bWRXNWtZVzFsYm5SaGJGOTBlWEJsWDJsdVptOUZBR3dNQUFCVUN3QUEvQW9BQUhZQUFBQkFDd0FBaUFzQUFHSUFBQUJBQ3dBQWxBc0FBR01BQUFCQUN3QUFvQXNBQUdnQUFBQkFDd0FBckFzQUFHRUFBQUJBQ3dBQXVBc0FBSE1BQUFCQUN3QUF4QXNBQUhRQUFBQkFDd0FBMEFzQUFHa0FBQUJBQ3dBQTNBc0FBR29BQUFCQUN3QUE2QXNBQUd3QUFBQkFDd0FBOUFzQUFHMEFBQUJBQ3dBQUFBd0FBSGdBQUFCQUN3QUFEQXdBQUhrQUFBQkFDd0FBR0F3QUFHWUFBQUJBQ3dBQUpBd0FBR1FBQUFCQUN3QUFNQXdBQUFBQUFBQXNDd0FBQWdBQUFBY0FBQUFFQUFBQUJRQUFBQWdBQUFBSkFBQUFDZ0FBQUFzQUFBQUFBQUFBdEF3QUFBSUFBQUFNQUFBQUJBQUFBQVVBQUFBSUFBQUFEUUFBQUE0QUFBQVBBQUFBVGpFd1gxOWplSGhoWW1sMk1USXdYMTl6YVY5amJHRnpjMTkwZVhCbFgybHVabTlGQUFBQUFHd01BQUNNREFBQUxBc0FBRk4wT1hSNWNHVmZhVzVtYndBQUFBQkVEQUFBd0F3QVFkZ1pDd1BnRGdFPSI7aWYoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpe3dhc21CaW5hcnlGaWxlPWxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpO31mdW5jdGlvbiBnZXRCaW5hcnlTeW5jKGZpbGUpe2lmKGZpbGU9PXdhc21CaW5hcnlGaWxlJiZ3YXNtQmluYXJ5KXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkod2FzbUJpbmFyeSl9dmFyIGJpbmFyeT10cnlQYXJzZUFzRGF0YVVSSShmaWxlKTtpZihiaW5hcnkpe3JldHVybiBiaW5hcnl9aWYocmVhZEJpbmFyeSl7cmV0dXJuIHJlYWRCaW5hcnkoZmlsZSl9dGhyb3cgImJvdGggYXN5bmMgYW5kIHN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkIn1mdW5jdGlvbiBnZXRCaW5hcnlQcm9taXNlKGJpbmFyeUZpbGUpe3JldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpPT5nZXRCaW5hcnlTeW5jKGJpbmFyeUZpbGUpKX1mdW5jdGlvbiBpbnN0YW50aWF0ZUFycmF5QnVmZmVyKGJpbmFyeUZpbGUsaW1wb3J0cyxyZWNlaXZlcil7cmV0dXJuIGdldEJpbmFyeVByb21pc2UoYmluYXJ5RmlsZSkudGhlbihiaW5hcnk9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJpbmFyeSxpbXBvcnRzKSkudGhlbihpbnN0YW5jZT0+aW5zdGFuY2UpLnRoZW4ocmVjZWl2ZXIscmVhc29uPT57ZXJyKGBmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiAke3JlYXNvbn1gKTthYm9ydChyZWFzb24pO30pfWZ1bmN0aW9uIGluc3RhbnRpYXRlQXN5bmMoYmluYXJ5LGJpbmFyeUZpbGUsaW1wb3J0cyxjYWxsYmFjayl7cmV0dXJuIGluc3RhbnRpYXRlQXJyYXlCdWZmZXIoYmluYXJ5RmlsZSxpbXBvcnRzLGNhbGxiYWNrKX1mdW5jdGlvbiBjcmVhdGVXYXNtKCl7dmFyIGluZm89eyJhIjp3YXNtSW1wb3J0c307ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLG1vZHVsZSl7d2FzbUV4cG9ydHM9aW5zdGFuY2UuZXhwb3J0czt3YXNtTWVtb3J5PXdhc21FeHBvcnRzWyJrIl07dXBkYXRlTWVtb3J5Vmlld3MoKTthZGRPbkluaXQod2FzbUV4cG9ydHNbImwiXSk7cmVtb3ZlUnVuRGVwZW5kZW5jeSgpO3JldHVybiB3YXNtRXhwb3J0c31hZGRSdW5EZXBlbmRlbmN5KCk7ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQocmVzdWx0KXtyZWNlaXZlSW5zdGFuY2UocmVzdWx0WyJpbnN0YW5jZSJdKTt9aWYoTW9kdWxlWyJpbnN0YW50aWF0ZVdhc20iXSl7dHJ5e3JldHVybiBNb2R1bGVbImluc3RhbnRpYXRlV2FzbSJdKGluZm8scmVjZWl2ZUluc3RhbmNlKX1jYXRjaChlKXtlcnIoYE1vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6ICR7ZX1gKTtyZWFkeVByb21pc2VSZWplY3QoZSk7fX1pbnN0YW50aWF0ZUFzeW5jKHdhc21CaW5hcnksd2FzbUJpbmFyeUZpbGUsaW5mbyxyZWNlaXZlSW5zdGFudGlhdGlvblJlc3VsdCkuY2F0Y2gocmVhZHlQcm9taXNlUmVqZWN0KTtyZXR1cm4ge319dmFyIGNhbGxSdW50aW1lQ2FsbGJhY2tzPWNhbGxiYWNrcz0+e3doaWxlKGNhbGxiYWNrcy5sZW5ndGg+MCl7Y2FsbGJhY2tzLnNoaWZ0KCkoTW9kdWxlKTt9fTtNb2R1bGVbIm5vRXhpdFJ1bnRpbWUiXXx8dHJ1ZTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfYmlnaW50PShwcmltaXRpdmVUeXBlLG5hbWUsc2l6ZSxtaW5SYW5nZSxtYXhSYW5nZSk9Pnt9O3ZhciBlbWJpbmRfaW5pdF9jaGFyQ29kZXM9KCk9Pnt2YXIgY29kZXM9bmV3IEFycmF5KDI1Nik7Zm9yKHZhciBpPTA7aTwyNTY7KytpKXtjb2Rlc1tpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpO31lbWJpbmRfY2hhckNvZGVzPWNvZGVzO307dmFyIGVtYmluZF9jaGFyQ29kZXM7dmFyIHJlYWRMYXRpbjFTdHJpbmc9cHRyPT57dmFyIHJldD0iIjt2YXIgYz1wdHI7d2hpbGUoSEVBUFU4W2NdKXtyZXQrPWVtYmluZF9jaGFyQ29kZXNbSEVBUFU4W2MrK11dO31yZXR1cm4gcmV0fTt2YXIgYXdhaXRpbmdEZXBlbmRlbmNpZXM9e307dmFyIHJlZ2lzdGVyZWRUeXBlcz17fTt2YXIgQmluZGluZ0Vycm9yO3ZhciB0aHJvd0JpbmRpbmdFcnJvcj1tZXNzYWdlPT57dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihtZXNzYWdlKX07ZnVuY3Rpb24gc2hhcmVkUmVnaXN0ZXJUeXBlKHJhd1R5cGUscmVnaXN0ZXJlZEluc3RhbmNlLG9wdGlvbnM9e30pe3ZhciBuYW1lPXJlZ2lzdGVyZWRJbnN0YW5jZS5uYW1lO2lmKCFyYXdUeXBlKXt0aHJvd0JpbmRpbmdFcnJvcihgdHlwZSAiJHtuYW1lfSIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcmApO31pZihyZWdpc3RlcmVkVHlwZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe2lmKG9wdGlvbnMuaWdub3JlRHVwbGljYXRlUmVnaXN0cmF0aW9ucyl7cmV0dXJufWVsc2Uge3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnJHtuYW1lfScgdHdpY2VgKTt9fXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXT1yZWdpc3RlcmVkSW5zdGFuY2U7aWYoYXdhaXRpbmdEZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe3ZhciBjYWxsYmFja3M9YXdhaXRpbmdEZXBlbmRlbmNpZXNbcmF3VHlwZV07ZGVsZXRlIGF3YWl0aW5nRGVwZW5kZW5jaWVzW3Jhd1R5cGVdO2NhbGxiYWNrcy5mb3JFYWNoKGNiPT5jYigpKTt9fWZ1bmN0aW9uIHJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zPXt9KXtpZighKCJhcmdQYWNrQWR2YW5jZSJpbiByZWdpc3RlcmVkSW5zdGFuY2UpKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlIil9cmV0dXJuIHNoYXJlZFJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zKX12YXIgR2VuZXJpY1dpcmVUeXBlU2l6ZT04O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9ib29sPShyYXdUeXBlLG5hbWUsdHJ1ZVZhbHVlLGZhbHNlVmFsdWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24od3Qpe3JldHVybiAhIXd0fSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIG8/dHJ1ZVZhbHVlOmZhbHNlVmFsdWV9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVThbcG9pbnRlcl0pfSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307ZnVuY3Rpb24gaGFuZGxlQWxsb2NhdG9ySW5pdCgpe09iamVjdC5hc3NpZ24oSGFuZGxlQWxsb2NhdG9yLnByb3RvdHlwZSx7Z2V0KGlkKXtyZXR1cm4gdGhpcy5hbGxvY2F0ZWRbaWRdfSxoYXMoaWQpe3JldHVybiB0aGlzLmFsbG9jYXRlZFtpZF0hPT11bmRlZmluZWR9LGFsbG9jYXRlKGhhbmRsZSl7dmFyIGlkPXRoaXMuZnJlZWxpc3QucG9wKCl8fHRoaXMuYWxsb2NhdGVkLmxlbmd0aDt0aGlzLmFsbG9jYXRlZFtpZF09aGFuZGxlO3JldHVybiBpZH0sZnJlZShpZCl7dGhpcy5hbGxvY2F0ZWRbaWRdPXVuZGVmaW5lZDt0aGlzLmZyZWVsaXN0LnB1c2goaWQpO319KTt9ZnVuY3Rpb24gSGFuZGxlQWxsb2NhdG9yKCl7dGhpcy5hbGxvY2F0ZWQ9W3VuZGVmaW5lZF07dGhpcy5mcmVlbGlzdD1bXTt9dmFyIGVtdmFsX2hhbmRsZXM9bmV3IEhhbmRsZUFsbG9jYXRvcjt2YXIgX19lbXZhbF9kZWNyZWY9aGFuZGxlPT57aWYoaGFuZGxlPj1lbXZhbF9oYW5kbGVzLnJlc2VydmVkJiYwPT09LS1lbXZhbF9oYW5kbGVzLmdldChoYW5kbGUpLnJlZmNvdW50KXtlbXZhbF9oYW5kbGVzLmZyZWUoaGFuZGxlKTt9fTt2YXIgY291bnRfZW12YWxfaGFuZGxlcz0oKT0+e3ZhciBjb3VudD0wO2Zvcih2YXIgaT1lbXZhbF9oYW5kbGVzLnJlc2VydmVkO2k8ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoOysraSl7aWYoZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWRbaV0hPT11bmRlZmluZWQpeysrY291bnQ7fX1yZXR1cm4gY291bnR9O3ZhciBpbml0X2VtdmFsPSgpPT57ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQucHVzaCh7dmFsdWU6dW5kZWZpbmVkfSx7dmFsdWU6bnVsbH0se3ZhbHVlOnRydWV9LHt2YWx1ZTpmYWxzZX0pO2VtdmFsX2hhbmRsZXMucmVzZXJ2ZWQ9ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoO01vZHVsZVsiY291bnRfZW12YWxfaGFuZGxlcyJdPWNvdW50X2VtdmFsX2hhbmRsZXM7fTt2YXIgRW12YWw9e3RvVmFsdWU6aGFuZGxlPT57aWYoIWhhbmRsZSl7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9ICIraGFuZGxlKTt9cmV0dXJuIGVtdmFsX2hhbmRsZXMuZ2V0KGhhbmRsZSkudmFsdWV9LHRvSGFuZGxlOnZhbHVlPT57c3dpdGNoKHZhbHVlKXtjYXNlIHVuZGVmaW5lZDpyZXR1cm4gMTtjYXNlIG51bGw6cmV0dXJuIDI7Y2FzZSB0cnVlOnJldHVybiAzO2Nhc2UgZmFsc2U6cmV0dXJuIDQ7ZGVmYXVsdDp7cmV0dXJuIGVtdmFsX2hhbmRsZXMuYWxsb2NhdGUoe3JlZmNvdW50OjEsdmFsdWU6dmFsdWV9KX19fX07ZnVuY3Rpb24gc2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKEhFQVAzMltwb2ludGVyPj4yXSl9dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX2VtdmFsPShyYXdUeXBlLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6aGFuZGxlPT57dmFyIHJ2PUVtdmFsLnRvVmFsdWUoaGFuZGxlKTtfX2VtdmFsX2RlY3JlZihoYW5kbGUpO3JldHVybiBydn0sInRvV2lyZVR5cGUiOihkZXN0cnVjdG9ycyx2YWx1ZSk9PkVtdmFsLnRvSGFuZGxlKHZhbHVlKSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO307dmFyIGZsb2F0UmVhZFZhbHVlRnJvbVBvaW50ZXI9KG5hbWUsd2lkdGgpPT57c3dpdGNoKHdpZHRoKXtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQRjMyW3BvaW50ZXI+PjJdKX07Y2FzZSA4OnJldHVybiBmdW5jdGlvbihwb2ludGVyKXtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oSEVBUEY2NFtwb2ludGVyPj4zXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmbG9hdCB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfZmxvYXQ9KHJhd1R5cGUsbmFtZSxzaXplKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT52YWx1ZSwidG9XaXJlVHlwZSI6KGRlc3RydWN0b3JzLHZhbHVlKT0+dmFsdWUsImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6ZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNpemUpLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSk7fTt2YXIgaW50ZWdlclJlYWRWYWx1ZUZyb21Qb2ludGVyPShuYW1lLHdpZHRoLHNpZ25lZCk9Pntzd2l0Y2god2lkdGgpe2Nhc2UgMTpyZXR1cm4gc2lnbmVkP3BvaW50ZXI9PkhFQVA4W3BvaW50ZXI+PjBdOnBvaW50ZXI9PkhFQVBVOFtwb2ludGVyPj4wXTtjYXNlIDI6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMTZbcG9pbnRlcj4+MV06cG9pbnRlcj0+SEVBUFUxNltwb2ludGVyPj4xXTtjYXNlIDQ6cmV0dXJuIHNpZ25lZD9wb2ludGVyPT5IRUFQMzJbcG9pbnRlcj4+Ml06cG9pbnRlcj0+SEVBUFUzMltwb2ludGVyPj4yXTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgaW50ZWdlciB3aWR0aCAoJHt3aWR0aH0pOiAke25hbWV9YCl9fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcj0ocHJpbWl0aXZlVHlwZSxuYW1lLHNpemUsbWluUmFuZ2UsbWF4UmFuZ2UpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlO2lmKG1pblJhbmdlPT09MCl7dmFyIGJpdHNoaWZ0PTMyLTgqc2l6ZTtmcm9tV2lyZVR5cGU9dmFsdWU9PnZhbHVlPDxiaXRzaGlmdD4+PmJpdHNoaWZ0O312YXIgaXNVbnNpZ25lZFR5cGU9bmFtZS5pbmNsdWRlcygidW5zaWduZWQiKTt2YXIgY2hlY2tBc3NlcnRpb25zPSh2YWx1ZSx0b1R5cGVOYW1lKT0+e307dmFyIHRvV2lyZVR5cGU7aWYoaXNVbnNpZ25lZFR5cGUpe3RvV2lyZVR5cGU9ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2NoZWNrQXNzZXJ0aW9ucyh2YWx1ZSx0aGlzLm5hbWUpO3JldHVybiB2YWx1ZT4+PjB9O31lbHNlIHt0b1dpcmVUeXBlPWZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtjaGVja0Fzc2VydGlvbnModmFsdWUsdGhpcy5uYW1lKTtyZXR1cm4gdmFsdWV9O31yZWdpc3RlclR5cGUocHJpbWl0aXZlVHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZyb21XaXJlVHlwZSwidG9XaXJlVHlwZSI6dG9XaXJlVHlwZSwiYXJnUGFja0FkdmFuY2UiOkdlbmVyaWNXaXJlVHlwZVNpemUsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjppbnRlZ2VyUmVhZFZhbHVlRnJvbVBvaW50ZXIobmFtZSxzaXplLG1pblJhbmdlIT09MCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KTt9O3ZhciBfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldz0ocmF3VHlwZSxkYXRhVHlwZUluZGV4LG5hbWUpPT57dmFyIHR5cGVNYXBwaW5nPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheV07dmFyIFRBPXR5cGVNYXBwaW5nW2RhdGFUeXBlSW5kZXhdO2Z1bmN0aW9uIGRlY29kZU1lbW9yeVZpZXcoaGFuZGxlKXt2YXIgc2l6ZT1IRUFQVTMyW2hhbmRsZT4+Ml07dmFyIGRhdGE9SEVBUFUzMltoYW5kbGUrND4+Ml07cmV0dXJuIG5ldyBUQShIRUFQOC5idWZmZXIsZGF0YSxzaXplKX1uYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpkZWNvZGVNZW1vcnlWaWV3LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmRlY29kZU1lbW9yeVZpZXd9LHtpZ25vcmVEdXBsaWNhdGVSZWdpc3RyYXRpb25zOnRydWV9KTt9O2Z1bmN0aW9uIHJlYWRQb2ludGVyKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQVTMyW3BvaW50ZXI+PjJdKX12YXIgc3RyaW5nVG9VVEY4QXJyYXk9KHN0cixoZWFwLG91dElkeCxtYXhCeXRlc1RvV3JpdGUpPT57aWYoIShtYXhCeXRlc1RvV3JpdGU+MCkpcmV0dXJuIDA7dmFyIHN0YXJ0SWR4PW91dElkeDt2YXIgZW5kSWR4PW91dElkeCttYXhCeXRlc1RvV3JpdGUtMTtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgdT1zdHIuY2hhckNvZGVBdChpKTtpZih1Pj01NTI5NiYmdTw9NTczNDMpe3ZhciB1MT1zdHIuY2hhckNvZGVBdCgrK2kpO3U9NjU1MzYrKCh1JjEwMjMpPDwxMCl8dTEmMTAyMzt9aWYodTw9MTI3KXtpZihvdXRJZHg+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT11O31lbHNlIGlmKHU8PTIwNDcpe2lmKG91dElkeCsxPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MTkyfHU+PjY7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fWVsc2UgaWYodTw9NjU1MzUpe2lmKG91dElkeCsyPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MjI0fHU+PjEyO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzO31lbHNlIHtpZihvdXRJZHgrMz49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPTI0MHx1Pj4xODtoZWFwW291dElkeCsrXT0xMjh8dT4+MTImNjM7aGVhcFtvdXRJZHgrK109MTI4fHU+PjYmNjM7aGVhcFtvdXRJZHgrK109MTI4fHUmNjM7fX1oZWFwW291dElkeF09MDtyZXR1cm4gb3V0SWR4LXN0YXJ0SWR4fTt2YXIgc3RyaW5nVG9VVEY4PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PnN0cmluZ1RvVVRGOEFycmF5KHN0cixIRUFQVTgsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk7dmFyIGxlbmd0aEJ5dGVzVVRGOD1zdHI9Pnt2YXIgbGVuPTA7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGM9c3RyLmNoYXJDb2RlQXQoaSk7aWYoYzw9MTI3KXtsZW4rKzt9ZWxzZSBpZihjPD0yMDQ3KXtsZW4rPTI7fWVsc2UgaWYoYz49NTUyOTYmJmM8PTU3MzQzKXtsZW4rPTQ7KytpO31lbHNlIHtsZW4rPTM7fX1yZXR1cm4gbGVufTt2YXIgVVRGOERlY29kZXI9dHlwZW9mIFRleHREZWNvZGVyIT0idW5kZWZpbmVkIj9uZXcgVGV4dERlY29kZXIoInV0ZjgiKTp1bmRlZmluZWQ7dmFyIFVURjhBcnJheVRvU3RyaW5nPShoZWFwT3JBcnJheSxpZHgsbWF4Qnl0ZXNUb1JlYWQpPT57dmFyIGVuZElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQ7dmFyIGVuZFB0cj1pZHg7d2hpbGUoaGVhcE9yQXJyYXlbZW5kUHRyXSYmIShlbmRQdHI+PWVuZElkeCkpKytlbmRQdHI7aWYoZW5kUHRyLWlkeD4xNiYmaGVhcE9yQXJyYXkuYnVmZmVyJiZVVEY4RGVjb2Rlcil7cmV0dXJuIFVURjhEZWNvZGVyLmRlY29kZShoZWFwT3JBcnJheS5zdWJhcnJheShpZHgsZW5kUHRyKSl9dmFyIHN0cj0iIjt3aGlsZShpZHg8ZW5kUHRyKXt2YXIgdTA9aGVhcE9yQXJyYXlbaWR4KytdO2lmKCEodTAmMTI4KSl7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHUwKTtjb250aW51ZX12YXIgdTE9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyMjQpPT0xOTIpe3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgodTAmMzEpPDw2fHUxKTtjb250aW51ZX12YXIgdTI9aGVhcE9yQXJyYXlbaWR4KytdJjYzO2lmKCh1MCYyNDApPT0yMjQpe3UwPSh1MCYxNSk8PDEyfHUxPDw2fHUyO31lbHNlIHt1MD0odTAmNyk8PDE4fHUxPDwxMnx1Mjw8NnxoZWFwT3JBcnJheVtpZHgrK10mNjM7fWlmKHUwPDY1NTM2KXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodTApO31lbHNlIHt2YXIgY2g9dTAtNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9fXJldHVybiBzdHJ9O3ZhciBVVEY4VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9PnB0cj9VVEY4QXJyYXlUb1N0cmluZyhIRUFQVTgscHRyLG1heEJ5dGVzVG9SZWFkKToiIjt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZz0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTt2YXIgc3RkU3RyaW5nSXNVVEY4PW5hbWU9PT0ic3RkOjpzdHJpbmciO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSIodmFsdWUpe3ZhciBsZW5ndGg9SEVBUFUzMlt2YWx1ZT4+Ml07dmFyIHBheWxvYWQ9dmFsdWUrNDt2YXIgc3RyO2lmKHN0ZFN0cmluZ0lzVVRGOCl7dmFyIGRlY29kZVN0YXJ0UHRyPXBheWxvYWQ7Zm9yKHZhciBpPTA7aTw9bGVuZ3RoOysraSl7dmFyIGN1cnJlbnRCeXRlUHRyPXBheWxvYWQraTtpZihpPT1sZW5ndGh8fEhFQVBVOFtjdXJyZW50Qnl0ZVB0cl09PTApe3ZhciBtYXhSZWFkPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PVVURjhUb1N0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkKTtpZihzdHI9PT11bmRlZmluZWQpe3N0cj1zdHJpbmdTZWdtZW50O31lbHNlIHtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCk7c3RyKz1zdHJpbmdTZWdtZW50O31kZWNvZGVTdGFydFB0cj1jdXJyZW50Qnl0ZVB0cisxO319fWVsc2Uge3ZhciBhPW5ldyBBcnJheShsZW5ndGgpO2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7YVtpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKEhFQVBVOFtwYXlsb2FkK2ldKTt9c3RyPWEuam9pbigiIik7fV9mcmVlKHZhbHVlKTtyZXR1cm4gc3RyfSwidG9XaXJlVHlwZSIoZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpe3ZhbHVlPW5ldyBVaW50OEFycmF5KHZhbHVlKTt9dmFyIGxlbmd0aDt2YXIgdmFsdWVJc09mVHlwZVN0cmluZz10eXBlb2YgdmFsdWU9PSJzdHJpbmciO2lmKCEodmFsdWVJc09mVHlwZVN0cmluZ3x8dmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIEludDhBcnJheSkpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIHN0ZDo6c3RyaW5nIik7fWlmKHN0ZFN0cmluZ0lzVVRGOCYmdmFsdWVJc09mVHlwZVN0cmluZyl7bGVuZ3RoPWxlbmd0aEJ5dGVzVVRGOCh2YWx1ZSk7fWVsc2Uge2xlbmd0aD12YWx1ZS5sZW5ndGg7fXZhciBiYXNlPV9tYWxsb2MoNCtsZW5ndGgrMSk7dmFyIHB0cj1iYXNlKzQ7SEVBUFUzMltiYXNlPj4yXT1sZW5ndGg7aWYoc3RkU3RyaW5nSXNVVEY4JiZ2YWx1ZUlzT2ZUeXBlU3RyaW5nKXtzdHJpbmdUb1VURjgodmFsdWUscHRyLGxlbmd0aCsxKTt9ZWxzZSB7aWYodmFsdWVJc09mVHlwZVN0cmluZyl7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXt2YXIgY2hhckNvZGU9dmFsdWUuY2hhckNvZGVBdChpKTtpZihjaGFyQ29kZT4yNTUpe19mcmVlKHB0cik7dGhyb3dCaW5kaW5nRXJyb3IoIlN0cmluZyBoYXMgVVRGLTE2IGNvZGUgdW5pdHMgdGhhdCBkbyBub3QgZml0IGluIDggYml0cyIpO31IRUFQVThbcHRyK2ldPWNoYXJDb2RlO319ZWxzZSB7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXtIRUFQVThbcHRyK2ldPXZhbHVlW2ldO319fWlmKGRlc3RydWN0b3JzIT09bnVsbCl7ZGVzdHJ1Y3RvcnMucHVzaChfZnJlZSxiYXNlKTt9cmV0dXJuIGJhc2V9LCJhcmdQYWNrQWR2YW5jZSI6R2VuZXJpY1dpcmVUeXBlU2l6ZSwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOnJlYWRQb2ludGVyLGRlc3RydWN0b3JGdW5jdGlvbihwdHIpe19mcmVlKHB0cik7fX0pO307dmFyIFVURjE2RGVjb2Rlcj10eXBlb2YgVGV4dERlY29kZXIhPSJ1bmRlZmluZWQiP25ldyBUZXh0RGVjb2RlcigidXRmLTE2bGUiKTp1bmRlZmluZWQ7dmFyIFVURjE2VG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgZW5kUHRyPXB0cjt2YXIgaWR4PWVuZFB0cj4+MTt2YXIgbWF4SWR4PWlkeCttYXhCeXRlc1RvUmVhZC8yO3doaWxlKCEoaWR4Pj1tYXhJZHgpJiZIRUFQVTE2W2lkeF0pKytpZHg7ZW5kUHRyPWlkeDw8MTtpZihlbmRQdHItcHRyPjMyJiZVVEYxNkRlY29kZXIpcmV0dXJuIFVURjE2RGVjb2Rlci5kZWNvZGUoSEVBUFU4LnN1YmFycmF5KHB0cixlbmRQdHIpKTt2YXIgc3RyPSIiO2Zvcih2YXIgaT0wOyEoaT49bWF4Qnl0ZXNUb1JlYWQvMik7KytpKXt2YXIgY29kZVVuaXQ9SEVBUDE2W3B0citpKjI+PjFdO2lmKGNvZGVVbml0PT0wKWJyZWFrO3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZShjb2RlVW5pdCk7fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjE2PShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8MilyZXR1cm4gMDttYXhCeXRlc1RvV3JpdGUtPTI7dmFyIHN0YXJ0UHRyPW91dFB0cjt2YXIgbnVtQ2hhcnNUb1dyaXRlPW1heEJ5dGVzVG9Xcml0ZTxzdHIubGVuZ3RoKjI/bWF4Qnl0ZXNUb1dyaXRlLzI6c3RyLmxlbmd0aDtmb3IodmFyIGk9MDtpPG51bUNoYXJzVG9Xcml0ZTsrK2kpe3ZhciBjb2RlVW5pdD1zdHIuY2hhckNvZGVBdChpKTtIRUFQMTZbb3V0UHRyPj4xXT1jb2RlVW5pdDtvdXRQdHIrPTI7fUhFQVAxNltvdXRQdHI+PjFdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn07dmFyIGxlbmd0aEJ5dGVzVVRGMTY9c3RyPT5zdHIubGVuZ3RoKjI7dmFyIFVURjMyVG9TdHJpbmc9KHB0cixtYXhCeXRlc1RvUmVhZCk9Pnt2YXIgaT0wO3ZhciBzdHI9IiI7d2hpbGUoIShpPj1tYXhCeXRlc1RvUmVhZC80KSl7dmFyIHV0ZjMyPUhFQVAzMltwdHIraSo0Pj4yXTtpZih1dGYzMj09MClicmVhazsrK2k7aWYodXRmMzI+PTY1NTM2KXt2YXIgY2g9dXRmMzItNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKTt9ZWxzZSB7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHV0ZjMyKTt9fXJldHVybiBzdHJ9O3ZhciBzdHJpbmdUb1VURjMyPShzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSk9PntpZihtYXhCeXRlc1RvV3JpdGU9PT11bmRlZmluZWQpe21heEJ5dGVzVG9Xcml0ZT0yMTQ3NDgzNjQ3O31pZihtYXhCeXRlc1RvV3JpdGU8NClyZXR1cm4gMDt2YXIgc3RhcnRQdHI9b3V0UHRyO3ZhciBlbmRQdHI9c3RhcnRQdHIrbWF4Qnl0ZXNUb1dyaXRlLTQ7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGNvZGVVbml0PXN0ci5jaGFyQ29kZUF0KGkpO2lmKGNvZGVVbml0Pj01NTI5NiYmY29kZVVuaXQ8PTU3MzQzKXt2YXIgdHJhaWxTdXJyb2dhdGU9c3RyLmNoYXJDb2RlQXQoKytpKTtjb2RlVW5pdD02NTUzNisoKGNvZGVVbml0JjEwMjMpPDwxMCl8dHJhaWxTdXJyb2dhdGUmMTAyMzt9SEVBUDMyW291dFB0cj4+Ml09Y29kZVVuaXQ7b3V0UHRyKz00O2lmKG91dFB0cis0PmVuZFB0cilicmVha31IRUFQMzJbb3V0UHRyPj4yXT0wO3JldHVybiBvdXRQdHItc3RhcnRQdHJ9O3ZhciBsZW5ndGhCeXRlc1VURjMyPXN0cj0+e3ZhciBsZW49MDtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7aWYoY29kZVVuaXQ+PTU1Mjk2JiZjb2RlVW5pdDw9NTczNDMpKytpO2xlbis9NDt9cmV0dXJuIGxlbn07dmFyIF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nPShyYXdUeXBlLGNoYXJTaXplLG5hbWUpPT57bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBkZWNvZGVTdHJpbmcsZW5jb2RlU3RyaW5nLGdldEhlYXAsbGVuZ3RoQnl0ZXNVVEYsc2hpZnQ7aWYoY2hhclNpemU9PT0yKXtkZWNvZGVTdHJpbmc9VVRGMTZUb1N0cmluZztlbmNvZGVTdHJpbmc9c3RyaW5nVG9VVEYxNjtsZW5ndGhCeXRlc1VURj1sZW5ndGhCeXRlc1VURjE2O2dldEhlYXA9KCk9PkhFQVBVMTY7c2hpZnQ9MTt9ZWxzZSBpZihjaGFyU2l6ZT09PTQpe2RlY29kZVN0cmluZz1VVEYzMlRvU3RyaW5nO2VuY29kZVN0cmluZz1zdHJpbmdUb1VURjMyO2xlbmd0aEJ5dGVzVVRGPWxlbmd0aEJ5dGVzVVRGMzI7Z2V0SGVhcD0oKT0+SEVBUFUzMjtzaGlmdD0yO31yZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOnZhbHVlPT57dmFyIGxlbmd0aD1IRUFQVTMyW3ZhbHVlPj4yXTt2YXIgSEVBUD1nZXRIZWFwKCk7dmFyIHN0cjt2YXIgZGVjb2RlU3RhcnRQdHI9dmFsdWUrNDtmb3IodmFyIGk9MDtpPD1sZW5ndGg7KytpKXt2YXIgY3VycmVudEJ5dGVQdHI9dmFsdWUrNCtpKmNoYXJTaXplO2lmKGk9PWxlbmd0aHx8SEVBUFtjdXJyZW50Qnl0ZVB0cj4+c2hpZnRdPT0wKXt2YXIgbWF4UmVhZEJ5dGVzPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PWRlY29kZVN0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkQnl0ZXMpO2lmKHN0cj09PXVuZGVmaW5lZCl7c3RyPXN0cmluZ1NlZ21lbnQ7fWVsc2Uge3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKTtzdHIrPXN0cmluZ1NlZ21lbnQ7fWRlY29kZVN0YXJ0UHRyPWN1cnJlbnRCeXRlUHRyK2NoYXJTaXplO319X2ZyZWUodmFsdWUpO3JldHVybiBzdHJ9LCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsdmFsdWUpPT57aWYoISh0eXBlb2YgdmFsdWU9PSJzdHJpbmciKSl7dGhyb3dCaW5kaW5nRXJyb3IoYENhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICR7bmFtZX1gKTt9dmFyIGxlbmd0aD1sZW5ndGhCeXRlc1VURih2YWx1ZSk7dmFyIHB0cj1fbWFsbG9jKDQrbGVuZ3RoK2NoYXJTaXplKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoPj5zaGlmdDtlbmNvZGVTdHJpbmcodmFsdWUscHRyKzQsbGVuZ3RoK2NoYXJTaXplKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKTt9cmV0dXJuIHB0cn0sImFyZ1BhY2tBZHZhbmNlIjpHZW5lcmljV2lyZVR5cGVTaXplLCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIsZGVzdHJ1Y3RvckZ1bmN0aW9uKHB0cil7X2ZyZWUocHRyKTt9fSk7fTt2YXIgX19lbWJpbmRfcmVnaXN0ZXJfdm9pZD0ocmF3VHlwZSxuYW1lKT0+e25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7aXNWb2lkOnRydWUsbmFtZTpuYW1lLCJhcmdQYWNrQWR2YW5jZSI6MCwiZnJvbVdpcmVUeXBlIjooKT0+dW5kZWZpbmVkLCJ0b1dpcmVUeXBlIjooZGVzdHJ1Y3RvcnMsbyk9PnVuZGVmaW5lZH0pO307dmFyIGdldEhlYXBNYXg9KCk9PjIxNDc0ODM2NDg7dmFyIGdyb3dNZW1vcnk9c2l6ZT0+e3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO3ZhciBwYWdlcz0oc2l6ZS1iLmJ5dGVMZW5ndGgrNjU1MzUpLzY1NTM2O3RyeXt3YXNtTWVtb3J5Lmdyb3cocGFnZXMpO3VwZGF0ZU1lbW9yeVZpZXdzKCk7cmV0dXJuIDF9Y2F0Y2goZSl7fX07dmFyIF9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwPXJlcXVlc3RlZFNpemU9Pnt2YXIgb2xkU2l6ZT1IRUFQVTgubGVuZ3RoO3JlcXVlc3RlZFNpemU+Pj49MDt2YXIgbWF4SGVhcFNpemU9Z2V0SGVhcE1heCgpO2lmKHJlcXVlc3RlZFNpemU+bWF4SGVhcFNpemUpe3JldHVybiBmYWxzZX12YXIgYWxpZ25VcD0oeCxtdWx0aXBsZSk9PngrKG11bHRpcGxlLXglbXVsdGlwbGUpJW11bHRpcGxlO2Zvcih2YXIgY3V0RG93bj0xO2N1dERvd248PTQ7Y3V0RG93bio9Mil7dmFyIG92ZXJHcm93bkhlYXBTaXplPW9sZFNpemUqKDErLjIvY3V0RG93bik7b3Zlckdyb3duSGVhcFNpemU9TWF0aC5taW4ob3Zlckdyb3duSGVhcFNpemUscmVxdWVzdGVkU2l6ZSsxMDA2NjMyOTYpO3ZhciBuZXdTaXplPU1hdGgubWluKG1heEhlYXBTaXplLGFsaWduVXAoTWF0aC5tYXgocmVxdWVzdGVkU2l6ZSxvdmVyR3Jvd25IZWFwU2l6ZSksNjU1MzYpKTt2YXIgcmVwbGFjZW1lbnQ9Z3Jvd01lbW9yeShuZXdTaXplKTtpZihyZXBsYWNlbWVudCl7cmV0dXJuIHRydWV9fXJldHVybiBmYWxzZX07ZW1iaW5kX2luaXRfY2hhckNvZGVzKCk7QmluZGluZ0Vycm9yPU1vZHVsZVsiQmluZGluZ0Vycm9yIl09Y2xhc3MgQmluZGluZ0Vycm9yIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IobWVzc2FnZSl7c3VwZXIobWVzc2FnZSk7dGhpcy5uYW1lPSJCaW5kaW5nRXJyb3IiO319O01vZHVsZVsiSW50ZXJuYWxFcnJvciJdPWNsYXNzIEludGVybmFsRXJyb3IgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihtZXNzYWdlKXtzdXBlcihtZXNzYWdlKTt0aGlzLm5hbWU9IkludGVybmFsRXJyb3IiO319O2hhbmRsZUFsbG9jYXRvckluaXQoKTtpbml0X2VtdmFsKCk7dmFyIHdhc21JbXBvcnRzPXtmOl9fZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludCxpOl9fZW1iaW5kX3JlZ2lzdGVyX2Jvb2wsaDpfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbCxlOl9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0LGI6X19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcixhOl9fZW1iaW5kX3JlZ2lzdGVyX21lbW9yeV92aWV3LGQ6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZyxjOl9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nLGo6X19lbWJpbmRfcmVnaXN0ZXJfdm9pZCxnOl9lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwfTt2YXIgd2FzbUV4cG9ydHM9Y3JlYXRlV2FzbSgpO01vZHVsZVsiX3BhY2siXT0oYTAsYTEsYTIsYTMsYTQsYTUsYTYsYTcsYTgsYTksYTEwKT0+KE1vZHVsZVsiX3BhY2siXT13YXNtRXhwb3J0c1sibSJdKShhMCxhMSxhMixhMyxhNCxhNSxhNixhNyxhOCxhOSxhMTApO01vZHVsZVsiX19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5ncyJdPSgpPT4oTW9kdWxlWyJfX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzIl09d2FzbUV4cG9ydHNbIm4iXSkoKTt2YXIgX21hbGxvYz1Nb2R1bGVbIl9tYWxsb2MiXT1hMD0+KF9tYWxsb2M9TW9kdWxlWyJfbWFsbG9jIl09d2FzbUV4cG9ydHNbInAiXSkoYTApO3ZhciBfZnJlZT1Nb2R1bGVbIl9mcmVlIl09YTA9PihfZnJlZT1Nb2R1bGVbIl9mcmVlIl09d2FzbUV4cG9ydHNbInEiXSkoYTApO2Z1bmN0aW9uIGludEFycmF5RnJvbUJhc2U2NChzKXt2YXIgZGVjb2RlZD1hdG9iKHMpO3ZhciBieXRlcz1uZXcgVWludDhBcnJheShkZWNvZGVkLmxlbmd0aCk7Zm9yKHZhciBpPTA7aTxkZWNvZGVkLmxlbmd0aDsrK2kpe2J5dGVzW2ldPWRlY29kZWQuY2hhckNvZGVBdChpKTt9cmV0dXJuIGJ5dGVzfWZ1bmN0aW9uIHRyeVBhcnNlQXNEYXRhVVJJKGZpbGVuYW1lKXtpZighaXNEYXRhVVJJKGZpbGVuYW1lKSl7cmV0dXJufXJldHVybiBpbnRBcnJheUZyb21CYXNlNjQoZmlsZW5hbWUuc2xpY2UoZGF0YVVSSVByZWZpeC5sZW5ndGgpKX12YXIgY2FsbGVkUnVuO2RlcGVuZGVuY2llc0Z1bGZpbGxlZD1mdW5jdGlvbiBydW5DYWxsZXIoKXtpZighY2FsbGVkUnVuKXJ1bigpO2lmKCFjYWxsZWRSdW4pZGVwZW5kZW5jaWVzRnVsZmlsbGVkPXJ1bkNhbGxlcjt9O2Z1bmN0aW9uIHJ1bigpe2lmKHJ1bkRlcGVuZGVuY2llcz4wKXtyZXR1cm59cHJlUnVuKCk7aWYocnVuRGVwZW5kZW5jaWVzPjApe3JldHVybn1mdW5jdGlvbiBkb1J1bigpe2lmKGNhbGxlZFJ1bilyZXR1cm47Y2FsbGVkUnVuPXRydWU7TW9kdWxlWyJjYWxsZWRSdW4iXT10cnVlO2lmKEFCT1JUKXJldHVybjtpbml0UnVudGltZSgpO3JlYWR5UHJvbWlzZVJlc29sdmUoTW9kdWxlKTtpZihNb2R1bGVbIm9uUnVudGltZUluaXRpYWxpemVkIl0pTW9kdWxlWyJvblJ1bnRpbWVJbml0aWFsaXplZCJdKCk7cG9zdFJ1bigpO31pZihNb2R1bGVbInNldFN0YXR1cyJdKXtNb2R1bGVbInNldFN0YXR1cyJdKCJSdW5uaW5nLi4uIik7c2V0VGltZW91dChmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtNb2R1bGVbInNldFN0YXR1cyJdKCIiKTt9LDEpO2RvUnVuKCk7fSwxKTt9ZWxzZSB7ZG9SdW4oKTt9fWlmKE1vZHVsZVsicHJlSW5pdCJdKXtpZih0eXBlb2YgTW9kdWxlWyJwcmVJbml0Il09PSJmdW5jdGlvbiIpTW9kdWxlWyJwcmVJbml0Il09W01vZHVsZVsicHJlSW5pdCJdXTt3aGlsZShNb2R1bGVbInByZUluaXQiXS5sZW5ndGg+MCl7TW9kdWxlWyJwcmVJbml0Il0ucG9wKCkoKTt9fXJ1bigpOwoKCiAgICByZXR1cm4gbW9kdWxlQXJnLnJlYWR5CiAgfQoKICApOwogIH0pKCk7CgogIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55CiAgbGV0IHdhc21Nb2R1bGU7CiAgYXN5bmMgZnVuY3Rpb24gaW5pdFdhc20oKSB7CiAgICAgIHdhc21Nb2R1bGUgPSBhd2FpdCBsb2FkV2FzbSgpOwogIH0KICBsZXQgYWxsb2NhdGVkVmVydGV4Q291bnQgPSAwOwogIGNvbnN0IHVwZGF0ZVF1ZXVlID0gbmV3IEFycmF5KCk7CiAgbGV0IHJ1bm5pbmcgPSBmYWxzZTsKICBsZXQgbG9hZGluZyA9IGZhbHNlOwogIGxldCBwb3NpdGlvbnNQdHI7CiAgbGV0IHJvdGF0aW9uc1B0cjsKICBsZXQgc2NhbGVzUHRyOwogIGxldCBjb2xvcnNQdHI7CiAgbGV0IHNlbGVjdGlvblB0cjsKICBsZXQgZGF0YVB0cjsKICBsZXQgd29ybGRQb3NpdGlvbnNQdHI7CiAgbGV0IHdvcmxkUm90YXRpb25zUHRyOwogIGxldCB3b3JsZFNjYWxlc1B0cjsKICBjb25zdCBwYWNrID0gYXN5bmMgKHNwbGF0KSA9PiB7CiAgICAgIHdoaWxlIChsb2FkaW5nKSB7CiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAwKSk7CiAgICAgIH0KICAgICAgaWYgKCF3YXNtTW9kdWxlKSB7CiAgICAgICAgICBsb2FkaW5nID0gdHJ1ZTsKICAgICAgICAgIGF3YWl0IGluaXRXYXNtKCk7CiAgICAgICAgICBsb2FkaW5nID0gZmFsc2U7CiAgICAgIH0KICAgICAgY29uc3QgdGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQgPSBNYXRoLnBvdygyLCBNYXRoLmNlaWwoTWF0aC5sb2cyKHNwbGF0LnZlcnRleENvdW50KSkpOwogICAgICBpZiAodGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQgPiBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCkgewogICAgICAgICAgaWYgKGFsbG9jYXRlZFZlcnRleENvdW50ID4gMCkgewogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUocG9zaXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHJvdGF0aW9uc1B0cik7CiAgICAgICAgICAgICAgd2FzbU1vZHVsZS5fZnJlZShzY2FsZXNQdHIpOwogICAgICAgICAgICAgIHdhc21Nb2R1bGUuX2ZyZWUoY29sb3JzUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHNlbGVjdGlvblB0cik7CiAgICAgICAgICAgICAgd2FzbU1vZHVsZS5fZnJlZShkYXRhUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHdvcmxkUG9zaXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHdvcmxkUm90YXRpb25zUHRyKTsKICAgICAgICAgICAgICB3YXNtTW9kdWxlLl9mcmVlKHdvcmxkU2NhbGVzUHRyKTsKICAgICAgICAgIH0KICAgICAgICAgIGFsbG9jYXRlZFZlcnRleENvdW50ID0gdGFyZ2V0QWxsb2NhdGVkVmVydGV4Q291bnQ7CiAgICAgICAgICBwb3NpdGlvbnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMyAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICByb3RhdGlvbnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoNCAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBzY2FsZXNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMyAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICBjb2xvcnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoNCAqIGFsbG9jYXRlZFZlcnRleENvdW50KTsKICAgICAgICAgIHNlbGVjdGlvblB0ciA9IHdhc21Nb2R1bGUuX21hbGxvYyhhbGxvY2F0ZWRWZXJ0ZXhDb3VudCk7CiAgICAgICAgICBkYXRhUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKDggKiBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCAqIDQpOwogICAgICAgICAgd29ybGRQb3NpdGlvbnNQdHIgPSB3YXNtTW9kdWxlLl9tYWxsb2MoMyAqIGFsbG9jYXRlZFZlcnRleENvdW50ICogNCk7CiAgICAgICAgICB3b3JsZFJvdGF0aW9uc1B0ciA9IHdhc21Nb2R1bGUuX21hbGxvYyg0ICogYWxsb2NhdGVkVmVydGV4Q291bnQgKiA0KTsKICAgICAgICAgIHdvcmxkU2NhbGVzUHRyID0gd2FzbU1vZHVsZS5fbWFsbG9jKDMgKiBhbGxvY2F0ZWRWZXJ0ZXhDb3VudCAqIDQpOwogICAgICB9CiAgICAgIHdhc21Nb2R1bGUuSEVBUEYzMi5zZXQoc3BsYXQucG9zaXRpb25zLCBwb3NpdGlvbnNQdHIgLyA0KTsKICAgICAgd2FzbU1vZHVsZS5IRUFQRjMyLnNldChzcGxhdC5yb3RhdGlvbnMsIHJvdGF0aW9uc1B0ciAvIDQpOwogICAgICB3YXNtTW9kdWxlLkhFQVBGMzIuc2V0KHNwbGF0LnNjYWxlcywgc2NhbGVzUHRyIC8gNCk7CiAgICAgIHdhc21Nb2R1bGUuSEVBUFU4LnNldChzcGxhdC5jb2xvcnMsIGNvbG9yc1B0cik7CiAgICAgIHdhc21Nb2R1bGUuSEVBUFU4LnNldChzcGxhdC5zZWxlY3Rpb24sIHNlbGVjdGlvblB0cik7CiAgICAgIHdhc21Nb2R1bGUuX3BhY2soc3BsYXQuc2VsZWN0ZWQsIHNwbGF0LnZlcnRleENvdW50LCBwb3NpdGlvbnNQdHIsIHJvdGF0aW9uc1B0ciwgc2NhbGVzUHRyLCBjb2xvcnNQdHIsIHNlbGVjdGlvblB0ciwgZGF0YVB0ciwgd29ybGRQb3NpdGlvbnNQdHIsIHdvcmxkUm90YXRpb25zUHRyLCB3b3JsZFNjYWxlc1B0cik7CiAgICAgIGNvbnN0IG91dERhdGEgPSBuZXcgVWludDMyQXJyYXkod2FzbU1vZHVsZS5IRUFQVTMyLmJ1ZmZlciwgZGF0YVB0ciwgc3BsYXQudmVydGV4Q291bnQgKiA4KTsKICAgICAgY29uc3QgZGV0YWNoZWREYXRhID0gbmV3IFVpbnQzMkFycmF5KG91dERhdGEuc2xpY2UoKS5idWZmZXIpOwogICAgICBjb25zdCB3b3JsZFBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkod2FzbU1vZHVsZS5IRUFQRjMyLmJ1ZmZlciwgd29ybGRQb3NpdGlvbnNQdHIsIHNwbGF0LnZlcnRleENvdW50ICogMyk7CiAgICAgIGNvbnN0IGRldGFjaGVkV29ybGRQb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHdvcmxkUG9zaXRpb25zLnNsaWNlKCkuYnVmZmVyKTsKICAgICAgY29uc3Qgd29ybGRSb3RhdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHdhc21Nb2R1bGUuSEVBUEYzMi5idWZmZXIsIHdvcmxkUm90YXRpb25zUHRyLCBzcGxhdC52ZXJ0ZXhDb3VudCAqIDQpOwogICAgICBjb25zdCBkZXRhY2hlZFdvcmxkUm90YXRpb25zID0gbmV3IEZsb2F0MzJBcnJheSh3b3JsZFJvdGF0aW9ucy5zbGljZSgpLmJ1ZmZlcik7CiAgICAgIGNvbnN0IHdvcmxkU2NhbGVzID0gbmV3IEZsb2F0MzJBcnJheSh3YXNtTW9kdWxlLkhFQVBGMzIuYnVmZmVyLCB3b3JsZFNjYWxlc1B0ciwgc3BsYXQudmVydGV4Q291bnQgKiAzKTsKICAgICAgY29uc3QgZGV0YWNoZWRXb3JsZFNjYWxlcyA9IG5ldyBGbG9hdDMyQXJyYXkod29ybGRTY2FsZXMuc2xpY2UoKS5idWZmZXIpOwogICAgICBjb25zdCByZXNwb25zZSA9IHsKICAgICAgICAgIGRhdGE6IGRldGFjaGVkRGF0YSwKICAgICAgICAgIHdvcmxkUG9zaXRpb25zOiBkZXRhY2hlZFdvcmxkUG9zaXRpb25zLAogICAgICAgICAgd29ybGRSb3RhdGlvbnM6IGRldGFjaGVkV29ybGRSb3RhdGlvbnMsCiAgICAgICAgICB3b3JsZFNjYWxlczogZGV0YWNoZWRXb3JsZFNjYWxlcywKICAgICAgICAgIG9mZnNldDogc3BsYXQub2Zmc2V0LAogICAgICAgICAgdmVydGV4Q291bnQ6IHNwbGF0LnZlcnRleENvdW50LAogICAgICAgICAgcG9zaXRpb25zOiBzcGxhdC5wb3NpdGlvbnMuYnVmZmVyLAogICAgICAgICAgcm90YXRpb25zOiBzcGxhdC5yb3RhdGlvbnMuYnVmZmVyLAogICAgICAgICAgc2NhbGVzOiBzcGxhdC5zY2FsZXMuYnVmZmVyLAogICAgICAgICAgY29sb3JzOiBzcGxhdC5jb2xvcnMuYnVmZmVyLAogICAgICAgICAgc2VsZWN0aW9uOiBzcGxhdC5zZWxlY3Rpb24uYnVmZmVyLAogICAgICB9OwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgcmVzcG9uc2U6IHJlc3BvbnNlIH0sIFsKICAgICAgICAgIHJlc3BvbnNlLmRhdGEuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2Uud29ybGRQb3NpdGlvbnMuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2Uud29ybGRSb3RhdGlvbnMuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2Uud29ybGRTY2FsZXMuYnVmZmVyLAogICAgICAgICAgcmVzcG9uc2UucG9zaXRpb25zLAogICAgICAgICAgcmVzcG9uc2Uucm90YXRpb25zLAogICAgICAgICAgcmVzcG9uc2Uuc2NhbGVzLAogICAgICAgICAgcmVzcG9uc2UuY29sb3JzLAogICAgICAgICAgcmVzcG9uc2Uuc2VsZWN0aW9uLAogICAgICBdKTsKICAgICAgcnVubmluZyA9IGZhbHNlOwogIH07CiAgY29uc3QgcGFja1Rocm90dGxlZCA9ICgpID0+IHsKICAgICAgaWYgKHVwZGF0ZVF1ZXVlLmxlbmd0aCA9PT0gMCkKICAgICAgICAgIHJldHVybjsKICAgICAgaWYgKCFydW5uaW5nKSB7CiAgICAgICAgICBydW5uaW5nID0gdHJ1ZTsKICAgICAgICAgIGNvbnN0IHNwbGF0ID0gdXBkYXRlUXVldWUuc2hpZnQoKTsKICAgICAgICAgIHBhY2soc3BsYXQpOwogICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlOwogICAgICAgICAgICAgIHBhY2tUaHJvdHRsZWQoKTsKICAgICAgICAgIH0sIDApOwogICAgICB9CiAgfTsKICBzZWxmLm9ubWVzc2FnZSA9IChlKSA9PiB7CiAgICAgIGlmIChlLmRhdGEuc3BsYXQpIHsKICAgICAgICAgIGNvbnN0IHNwbGF0ID0gZS5kYXRhLnNwbGF0OwogICAgICAgICAgZm9yIChjb25zdCBbaW5kZXgsIGV4aXN0aW5nXSBvZiB1cGRhdGVRdWV1ZS5lbnRyaWVzKCkpIHsKICAgICAgICAgICAgICBpZiAoZXhpc3Rpbmcub2Zmc2V0ID09PSBzcGxhdC5vZmZzZXQpIHsKICAgICAgICAgICAgICAgICAgdXBkYXRlUXVldWVbaW5kZXhdID0gc3BsYXQ7CiAgICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgICB1cGRhdGVRdWV1ZS5wdXNoKHNwbGF0KTsKICAgICAgICAgIHBhY2tUaHJvdHRsZWQoKTsKICAgICAgfQogIH07Cgp9KSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD1EYXRhV29ya2VyLmpzLm1hcAoK"), $U = function(g = {}) {
  var U, Q, F = g;
  F.ready = new Promise((A, n) => {
    U = A, Q = n;
  });
  var l, R = Object.assign({}, F), d = "";
  d = (d = self.location.href).indexOf("blob:") !== 0 ? d.substr(0, d.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", l = (A) => {
    var n = new XMLHttpRequest();
    return n.open("GET", A, !1), n.responseType = "arraybuffer", n.send(null), new Uint8Array(n.response);
  }, F.print || console.log.bind(console);
  var t, V, B = F.printErr || console.error.bind(console);
  Object.assign(F, R), R = null, F.arguments && F.arguments, F.thisProgram && F.thisProgram, F.quit && F.quit, F.wasmBinary && (t = F.wasmBinary), typeof WebAssembly != "object" && M("no native wasm support detected");
  var Z, e, b, J, i, r, p, H, x = !1;
  function D() {
    var A = V.buffer;
    F.HEAP8 = Z = new Int8Array(A), F.HEAP16 = b = new Int16Array(A), F.HEAPU8 = e = new Uint8Array(A), F.HEAPU16 = J = new Uint16Array(A), F.HEAP32 = i = new Int32Array(A), F.HEAPU32 = r = new Uint32Array(A), F.HEAPF32 = p = new Float32Array(A), F.HEAPF64 = H = new Float64Array(A);
  }
  var z = [], w = [], f = [], k = 0, j = null;
  function M(A) {
    F.onAbort && F.onAbort(A), B(A = "Aborted(" + A + ")"), x = !0, A += ". Build with -sASSERTIONS for more info.";
    var n = new WebAssembly.RuntimeError(A);
    throw Q(n), n;
  }
  var E, L, N = "data:application/octet-stream;base64,", X = (A) => A.startsWith(N);
  function tU(A) {
    if (A == E && t) return new Uint8Array(t);
    var n = function(a) {
      if (X(a)) return function(W) {
        for (var c = atob(W), s = new Uint8Array(c.length), h = 0; h < c.length; ++h) s[h] = c.charCodeAt(h);
        return s;
      }(a.slice(N.length));
    }(A);
    if (n) return n;
    if (l) return l(A);
    throw "both async and sync fetching of the wasm failed";
  }
  function BU(A, n, a) {
    return function(W) {
      return Promise.resolve().then(() => tU(W));
    }(A).then((W) => WebAssembly.instantiate(W, n)).then((W) => W).then(a, (W) => {
      B(`failed to asynchronously prepare wasm: ${W}`), M(W);
    });
  }
  X(E = "data:application/octet-stream;base64,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aWduZWQgc2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgaW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxmbG9hdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDY0X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDY0X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPgBzdGQ6OmJhc2ljX3N0cmluZzx1bnNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZG91YmxlPgBOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQAAAABEDAAAQgcAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAABEDAAAjAcAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUVFAABEDAAA1AcAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEc05TXzExY2hhcl90cmFpdHNJRHNFRU5TXzlhbGxvY2F0b3JJRHNFRUVFAAAARAwAABwIAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRGlOU18xMWNoYXJfdHJhaXRzSURpRUVOU185YWxsb2NhdG9ySURpRUVFRQAAAEQMAABoCAAATjEwZW1zY3JpcHRlbjN2YWxFAABEDAAAtAgAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQAARAwAANAIAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lhRUUAAEQMAAD4CAAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaEVFAABEDAAAIAkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQAARAwAAEgJAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUAAEQMAABwCQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaUVFAABEDAAAmAkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWpFRQAARAwAAMAJAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lsRUUAAEQMAADoCQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbUVFAABEDAAAEAoAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXhFRQAARAwAADgKAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l5RUUAAEQMAABgCgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZkVFAABEDAAAiAoAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWRFRQAARAwAALAKAABOMTBfX2N4eGFiaXYxMTZfX3NoaW1fdHlwZV9pbmZvRQAAAABsDAAA2AoAANAMAABOMTBfX2N4eGFiaXYxMTdfX2NsYXNzX3R5cGVfaW5mb0UAAABsDAAACAsAAPwKAAAAAAAAfAsAAAIAAAADAAAABAAAAAUAAAAGAAAATjEwX19jeHhhYml2MTIzX19mdW5kYW1lbnRhbF90eXBlX2luZm9FAGwMAABUCwAA/AoAAHYAAABACwAAiAsAAGIAAABACwAAlAsAAGMAAABACwAAoAsAAGgAAABACwAArAsAAGEAAABACwAAuAsAAHMAAABACwAAxAsAAHQAAABACwAA0AsAAGkAAABACwAA3AsAAGoAAABACwAA6AsAAGwAAABACwAA9AsAAG0AAABACwAAAAwAAHgAAABACwAADAwAAHkAAABACwAAGAwAAGYAAABACwAAJAwAAGQAAABACwAAMAwAAAAAAAAsCwAAAgAAAAcAAAAEAAAABQAAAAgAAAAJAAAACgAAAAsAAAAAAAAAtAwAAAIAAAAMAAAABAAAAAUAAAAIAAAADQAAAA4AAAAPAAAATjEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm9FAAAAAGwMAACMDAAALAsAAFN0OXR5cGVfaW5mbwAAAABEDAAAwAwAQdgZCwPgDgE=") || (L = E, E = F.locateFile ? F.locateFile(L, d) : d + L);
  var VU = (A) => {
    for (; A.length > 0; ) A.shift()(F);
  };
  F.noExitRuntime;
  var cU, iU, $ = (A) => {
    for (var n = "", a = A; e[a]; ) n += cU[e[a++]];
    return n;
  }, RU = {}, sU = {}, AU = (A) => {
    throw new iU(A);
  };
  function UU(A, n, a = {}) {
    if (!("argPackAdvance" in n)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    return function(W, c, s = {}) {
      var h = c.name;
      if (W || AU(`type "${h}" must have a positive integer typeid pointer`), sU.hasOwnProperty(W)) {
        if (s.ignoreDuplicateRegistrations) return;
        AU(`Cannot register type '${h}' twice`);
      }
      if (sU[W] = c, RU.hasOwnProperty(W)) {
        var o = RU[W];
        delete RU[W], o.forEach((I) => I());
      }
    }(A, n, a);
  }
  function hU() {
    this.allocated = [void 0], this.freelist = [];
  }
  var O = new hU(), GU = () => {
    for (var A = 0, n = O.reserved; n < O.allocated.length; ++n) O.allocated[n] !== void 0 && ++A;
    return A;
  }, XU = (A) => (A || AU("Cannot use deleted val. handle = " + A), O.get(A).value), EU = (A) => {
    switch (A) {
      case void 0:
        return 1;
      case null:
        return 2;
      case !0:
        return 3;
      case !1:
        return 4;
      default:
        return O.allocate({ refcount: 1, value: A });
    }
  };
  function IU(A) {
    return this.fromWireType(i[A >> 2]);
  }
  var SU = (A, n) => {
    switch (n) {
      case 4:
        return function(a) {
          return this.fromWireType(p[a >> 2]);
        };
      case 8:
        return function(a) {
          return this.fromWireType(H[a >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${n}): ${A}`);
    }
  }, pU = (A, n, a) => {
    switch (n) {
      case 1:
        return a ? (W) => Z[W >> 0] : (W) => e[W >> 0];
      case 2:
        return a ? (W) => b[W >> 1] : (W) => J[W >> 1];
      case 4:
        return a ? (W) => i[W >> 2] : (W) => r[W >> 2];
      default:
        throw new TypeError(`invalid integer width (${n}): ${A}`);
    }
  };
  function YU(A) {
    return this.fromWireType(r[A >> 2]);
  }
  var JU = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, yU = (A, n) => A ? ((a, W, c) => {
    for (var s = W + c, h = W; a[h] && !(h >= s); ) ++h;
    if (h - W > 16 && a.buffer && JU) return JU.decode(a.subarray(W, h));
    for (var o = ""; W < h; ) {
      var I = a[W++];
      if (128 & I) {
        var C = 63 & a[W++];
        if ((224 & I) != 192) {
          var T = 63 & a[W++];
          if ((I = (240 & I) == 224 ? (15 & I) << 12 | C << 6 | T : (7 & I) << 18 | C << 12 | T << 6 | 63 & a[W++]) < 65536) o += String.fromCharCode(I);
          else {
            var Y = I - 65536;
            o += String.fromCharCode(55296 | Y >> 10, 56320 | 1023 & Y);
          }
        } else o += String.fromCharCode((31 & I) << 6 | C);
      } else o += String.fromCharCode(I);
    }
    return o;
  })(e, A, n) : "", mU = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, kU = (A, n) => {
    for (var a = A, W = a >> 1, c = W + n / 2; !(W >= c) && J[W]; ) ++W;
    if ((a = W << 1) - A > 32 && mU) return mU.decode(e.subarray(A, a));
    for (var s = "", h = 0; !(h >= n / 2); ++h) {
      var o = b[A + 2 * h >> 1];
      if (o == 0) break;
      s += String.fromCharCode(o);
    }
    return s;
  }, TU = (A, n, a) => {
    if (a === void 0 && (a = 2147483647), a < 2) return 0;
    for (var W = n, c = (a -= 2) < 2 * A.length ? a / 2 : A.length, s = 0; s < c; ++s) {
      var h = A.charCodeAt(s);
      b[n >> 1] = h, n += 2;
    }
    return b[n >> 1] = 0, n - W;
  }, uU = (A) => 2 * A.length, HU = (A, n) => {
    for (var a = 0, W = ""; !(a >= n / 4); ) {
      var c = i[A + 4 * a >> 2];
      if (c == 0) break;
      if (++a, c >= 65536) {
        var s = c - 65536;
        W += String.fromCharCode(55296 | s >> 10, 56320 | 1023 & s);
      } else W += String.fromCharCode(c);
    }
    return W;
  }, xU = (A, n, a) => {
    if (a === void 0 && (a = 2147483647), a < 4) return 0;
    for (var W = n, c = W + a - 4, s = 0; s < A.length; ++s) {
      var h = A.charCodeAt(s);
      if (h >= 55296 && h <= 57343 && (h = 65536 + ((1023 & h) << 10) | 1023 & A.charCodeAt(++s)), i[n >> 2] = h, (n += 4) + 4 > c) break;
    }
    return i[n >> 2] = 0, n - W;
  }, DU = (A) => {
    for (var n = 0, a = 0; a < A.length; ++a) {
      var W = A.charCodeAt(a);
      W >= 55296 && W <= 57343 && ++a, n += 4;
    }
    return n;
  }, fU = (A) => {
    var n = (A - V.buffer.byteLength + 65535) / 65536;
    try {
      return V.grow(n), D(), 1;
    } catch {
    }
  };
  (() => {
    for (var A = new Array(256), n = 0; n < 256; ++n) A[n] = String.fromCharCode(n);
    cU = A;
  })(), iU = F.BindingError = class extends Error {
    constructor(A) {
      super(A), this.name = "BindingError";
    }
  }, F.InternalError = class extends Error {
    constructor(A) {
      super(A), this.name = "InternalError";
    }
  }, Object.assign(hU.prototype, { get(A) {
    return this.allocated[A];
  }, has(A) {
    return this.allocated[A] !== void 0;
  }, allocate(A) {
    var n = this.freelist.pop() || this.allocated.length;
    return this.allocated[n] = A, n;
  }, free(A) {
    this.allocated[A] = void 0, this.freelist.push(A);
  } }), O.allocated.push({ value: void 0 }, { value: null }, { value: !0 }, { value: !1 }), O.reserved = O.allocated.length, F.count_emval_handles = GU;
  var wU = { f: (A, n, a, W, c) => {
  }, i: (A, n, a, W) => {
    UU(A, { name: n = $(n), fromWireType: function(c) {
      return !!c;
    }, toWireType: function(c, s) {
      return s ? a : W;
    }, argPackAdvance: 8, readValueFromPointer: function(c) {
      return this.fromWireType(e[c]);
    }, destructorFunction: null });
  }, h: (A, n) => {
    UU(A, { name: n = $(n), fromWireType: (a) => {
      var W = XU(a);
      return ((c) => {
        c >= O.reserved && --O.get(c).refcount == 0 && O.free(c);
      })(a), W;
    }, toWireType: (a, W) => EU(W), argPackAdvance: 8, readValueFromPointer: IU, destructorFunction: null });
  }, e: (A, n, a) => {
    UU(A, { name: n = $(n), fromWireType: (W) => W, toWireType: (W, c) => c, argPackAdvance: 8, readValueFromPointer: SU(n, a), destructorFunction: null });
  }, b: (A, n, a, W, c) => {
    n = $(n);
    var s = (I) => I;
    if (W === 0) {
      var h = 32 - 8 * a;
      s = (I) => I << h >>> h;
    }
    var o = n.includes("unsigned");
    UU(A, { name: n, fromWireType: s, toWireType: o ? function(I, C) {
      return this.name, C >>> 0;
    } : function(I, C) {
      return this.name, C;
    }, argPackAdvance: 8, readValueFromPointer: pU(n, a, W !== 0), destructorFunction: null });
  }, a: (A, n, a) => {
    var W = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][n];
    function c(s) {
      var h = r[s >> 2], o = r[s + 4 >> 2];
      return new W(Z.buffer, o, h);
    }
    UU(A, { name: a = $(a), fromWireType: c, argPackAdvance: 8, readValueFromPointer: c }, { ignoreDuplicateRegistrations: !0 });
  }, d: (A, n) => {
    var a = (n = $(n)) === "std::string";
    UU(A, { name: n, fromWireType(W) {
      var c, s = r[W >> 2], h = W + 4;
      if (a) for (var o = h, I = 0; I <= s; ++I) {
        var C = h + I;
        if (I == s || e[C] == 0) {
          var T = yU(o, C - o);
          c === void 0 ? c = T : (c += "\0", c += T), o = C + 1;
        }
      }
      else {
        var Y = new Array(s);
        for (I = 0; I < s; ++I) Y[I] = String.fromCharCode(e[h + I]);
        c = Y.join("");
      }
      return lU(W), c;
    }, toWireType(W, c) {
      var s;
      c instanceof ArrayBuffer && (c = new Uint8Array(c));
      var h = typeof c == "string";
      h || c instanceof Uint8Array || c instanceof Uint8ClampedArray || c instanceof Int8Array || AU("Cannot pass non-string to std::string"), s = a && h ? ((Y) => {
        for (var S = 0, G = 0; G < Y.length; ++G) {
          var P = Y.charCodeAt(G);
          P <= 127 ? S++ : P <= 2047 ? S += 2 : P >= 55296 && P <= 57343 ? (S += 4, ++G) : S += 3;
        }
        return S;
      })(c) : c.length;
      var o = WU(4 + s + 1), I = o + 4;
      if (r[o >> 2] = s, a && h) ((Y, S, G, P) => {
        if (!(P > 0)) return 0;
        for (var dU = G + P - 1, nU = 0; nU < Y.length; ++nU) {
          var u = Y.charCodeAt(nU);
          if (u >= 55296 && u <= 57343 && (u = 65536 + ((1023 & u) << 10) | 1023 & Y.charCodeAt(++nU)), u <= 127) {
            if (G >= dU) break;
            S[G++] = u;
          } else if (u <= 2047) {
            if (G + 1 >= dU) break;
            S[G++] = 192 | u >> 6, S[G++] = 128 | 63 & u;
          } else if (u <= 65535) {
            if (G + 2 >= dU) break;
            S[G++] = 224 | u >> 12, S[G++] = 128 | u >> 6 & 63, S[G++] = 128 | 63 & u;
          } else {
            if (G + 3 >= dU) break;
            S[G++] = 240 | u >> 18, S[G++] = 128 | u >> 12 & 63, S[G++] = 128 | u >> 6 & 63, S[G++] = 128 | 63 & u;
          }
        }
        S[G] = 0;
      })(c, e, I, s + 1);
      else if (h) for (var C = 0; C < s; ++C) {
        var T = c.charCodeAt(C);
        T > 255 && (lU(I), AU("String has UTF-16 code units that do not fit in 8 bits")), e[I + C] = T;
      }
      else for (C = 0; C < s; ++C) e[I + C] = c[C];
      return W !== null && W.push(lU, o), o;
    }, argPackAdvance: 8, readValueFromPointer: YU, destructorFunction(W) {
      lU(W);
    } });
  }, c: (A, n, a) => {
    var W, c, s, h, o;
    a = $(a), n === 2 ? (W = kU, c = TU, h = uU, s = () => J, o = 1) : n === 4 && (W = HU, c = xU, h = DU, s = () => r, o = 2), UU(A, { name: a, fromWireType: (I) => {
      for (var C, T = r[I >> 2], Y = s(), S = I + 4, G = 0; G <= T; ++G) {
        var P = I + 4 + G * n;
        if (G == T || Y[P >> o] == 0) {
          var dU = W(S, P - S);
          C === void 0 ? C = dU : (C += "\0", C += dU), S = P + n;
        }
      }
      return lU(I), C;
    }, toWireType: (I, C) => {
      typeof C != "string" && AU(`Cannot pass non-string to C++ string type ${a}`);
      var T = h(C), Y = WU(4 + T + n);
      return r[Y >> 2] = T >> o, c(C, Y + 4, T + n), I !== null && I.push(lU, Y), Y;
    }, argPackAdvance: 8, readValueFromPointer: IU, destructorFunction(I) {
      lU(I);
    } });
  }, j: (A, n) => {
    UU(A, { isVoid: !0, name: n = $(n), argPackAdvance: 0, fromWireType: () => {
    }, toWireType: (a, W) => {
    } });
  }, g: (A) => {
    var n = e.length, a = 2147483648;
    if ((A >>>= 0) > a) return !1;
    for (var W, c, s = 1; s <= 4; s *= 2) {
      var h = n * (1 + 0.2 / s);
      h = Math.min(h, A + 100663296);
      var o = Math.min(a, (W = Math.max(A, h)) + ((c = 65536) - W % c) % c);
      if (fU(o)) return !0;
    }
    return !1;
  } }, FU = function() {
    var A, n, a, W = { a: wU };
    function c(s, h) {
      var o;
      return FU = s.exports, V = FU.k, D(), o = FU.l, w.unshift(o), function(I) {
        if (k--, F.monitorRunDependencies && F.monitorRunDependencies(k), k == 0 && j) {
          var C = j;
          j = null, C();
        }
      }(), FU;
    }
    if (k++, F.monitorRunDependencies && F.monitorRunDependencies(k), F.instantiateWasm) try {
      return F.instantiateWasm(W, c);
    } catch (s) {
      B(`Module.instantiateWasm callback failed with error: ${s}`), Q(s);
    }
    return (A = E, n = W, a = function(s) {
      c(s.instance);
    }, BU(A, n, a)).catch(Q), {};
  }();
  F._pack = (A, n, a, W, c, s, h, o, I, C, T) => (F._pack = FU.m)(A, n, a, W, c, s, h, o, I, C, T), F.__embind_initialize_bindings = () => (F.__embind_initialize_bindings = FU.n)();
  var ZU, WU = F._malloc = (A) => (WU = F._malloc = FU.p)(A), lU = F._free = (A) => (lU = F._free = FU.q)(A);
  function bU() {
    function A() {
      ZU || (ZU = !0, F.calledRun = !0, x || (VU(w), U(F), F.onRuntimeInitialized && F.onRuntimeInitialized(), function() {
        if (F.postRun) for (typeof F.postRun == "function" && (F.postRun = [F.postRun]); F.postRun.length; ) n = F.postRun.shift(), f.unshift(n);
        var n;
        VU(f);
      }()));
    }
    k > 0 || (function() {
      if (F.preRun) for (typeof F.preRun == "function" && (F.preRun = [F.preRun]); F.preRun.length; ) n = F.preRun.shift(), z.unshift(n);
      var n;
      VU(z);
    }(), k > 0 || (F.setStatus ? (F.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        F.setStatus("");
      }, 1), A();
    }, 1)) : A()));
  }
  if (j = function A() {
    ZU || bU(), ZU || (j = A);
  }, F.preInit) for (typeof F.preInit == "function" && (F.preInit = [F.preInit]); F.preInit.length > 0; ) F.preInit.pop()();
  return bU(), g.ready;
};
class UF {
  constructor(U) {
    this.dataChanged = !1, this.transformsChanged = !1, this.colorTransformsChanged = !1, this._updating = /* @__PURE__ */ new Set(), this._dirty = /* @__PURE__ */ new Set();
    let Q = 0, F = 0;
    this._splatIndices = /* @__PURE__ */ new Map(), this._offsets = /* @__PURE__ */ new Map();
    const l = /* @__PURE__ */ new Map();
    for (const Z of U.objects) Z instanceof q && (this._splatIndices.set(Z, F), this._offsets.set(Z, Q), l.set(Q, Z), Q += Z.data.vertexCount, F++);
    this._vertexCount = Q, this._width = 2048, this._height = Math.ceil(2 * this.vertexCount / this.width), this._data = new Uint32Array(this.width * this.height * 4), this._transformsWidth = 5, this._transformsHeight = l.size, this._transforms = new Float32Array(this._transformsWidth * this._transformsHeight * 4), this._transformIndicesWidth = 1024, this._transformIndicesHeight = Math.ceil(this.vertexCount / this._transformIndicesWidth), this._transformIndices = new Uint32Array(this._transformIndicesWidth * this._transformIndicesHeight), this._colorTransformsWidth = 4, this._colorTransformsHeight = 64, this._colorTransforms = new Float32Array(this._colorTransformsWidth * this._colorTransformsHeight * 4), this._colorTransforms.fill(0), this._colorTransforms[0] = 1, this._colorTransforms[5] = 1, this._colorTransforms[10] = 1, this._colorTransforms[15] = 1, this._colorTransformIndicesWidth = 1024, this._colorTransformIndicesHeight = Math.ceil(this.vertexCount / this._colorTransformIndicesWidth), this._colorTransformIndices = new Uint32Array(this._colorTransformIndicesWidth * this._colorTransformIndicesHeight), this.colorTransformIndices.fill(0), this._positions = new Float32Array(3 * this.vertexCount), this._rotations = new Float32Array(4 * this.vertexCount), this._scales = new Float32Array(3 * this.vertexCount), this._worker = new qU();
    const R = (Z) => {
      const e = this._splatIndices.get(Z);
      this._transforms.set(Z.transform.buffer, 20 * e), this._transforms[20 * e + 16] = Z.selected ? 1 : 0, Z.positionChanged = !1, Z.rotationChanged = !1, Z.scaleChanged = !1, Z.selectedChanged = !1, this.transformsChanged = !0;
    }, d = () => {
      let Z = !1;
      for (const J of this._splatIndices.keys()) if (J.colorTransformChanged) {
        Z = !0;
        break;
      }
      if (!Z) return;
      const e = [new K()];
      this._colorTransformIndices.fill(0);
      let b = 1;
      for (const J of this._splatIndices.keys()) {
        const i = this._offsets.get(J);
        for (const r of J.colorTransforms) e.includes(r) || (e.push(r), b++);
        for (const r of J.colorTransformsMap.keys()) {
          const p = J.colorTransformsMap.get(r);
          this._colorTransformIndices[r + i] = p + b - 1;
        }
        J.colorTransformChanged = !1;
      }
      for (let J = 0; J < e.length; J++) {
        const i = e[J];
        this._colorTransforms.set(i.buffer, 16 * J);
      }
      this.colorTransformsChanged = !0;
    };
    let t;
    this._worker.onmessage = (Z) => {
      if (Z.data.response) {
        const e = Z.data.response, b = l.get(e.offset);
        R(b), d();
        const J = this._splatIndices.get(b);
        for (let i = 0; i < b.data.vertexCount; i++) this._transformIndices[e.offset + i] = J;
        this._data.set(e.data, 8 * e.offset), b.data.reattach(e.positions, e.rotations, e.scales, e.colors, e.selection), this._positions.set(e.worldPositions, 3 * e.offset), this._rotations.set(e.worldRotations, 4 * e.offset), this._scales.set(e.worldScales, 3 * e.offset), this._updating.delete(b), b.selectedChanged = !1, this.dataChanged = !0;
      }
    }, async function() {
      t = await $U();
    }();
    const V = (Z) => {
      if (!t) return void async function() {
        for (; !t; ) await new Promise((E) => setTimeout(E, 0));
      }().then(() => {
        V(Z);
      });
      R(Z);
      const e = t._malloc(3 * Z.data.vertexCount * 4), b = t._malloc(4 * Z.data.vertexCount * 4), J = t._malloc(3 * Z.data.vertexCount * 4), i = t._malloc(4 * Z.data.vertexCount), r = t._malloc(Z.data.vertexCount), p = t._malloc(8 * Z.data.vertexCount * 4), H = t._malloc(3 * Z.data.vertexCount * 4), x = t._malloc(4 * Z.data.vertexCount * 4), D = t._malloc(3 * Z.data.vertexCount * 4);
      t.HEAPF32.set(Z.data.positions, e / 4), t.HEAPF32.set(Z.data.rotations, b / 4), t.HEAPF32.set(Z.data.scales, J / 4), t.HEAPU8.set(Z.data.colors, i), t.HEAPU8.set(Z.data.selection, r), t._pack(Z.selected, Z.data.vertexCount, e, b, J, i, r, p, H, x, D);
      const z = new Uint32Array(t.HEAPU32.buffer, p, 8 * Z.data.vertexCount), w = new Float32Array(t.HEAPF32.buffer, H, 3 * Z.data.vertexCount), f = new Float32Array(t.HEAPF32.buffer, x, 4 * Z.data.vertexCount), k = new Float32Array(t.HEAPF32.buffer, D, 3 * Z.data.vertexCount), j = this._splatIndices.get(Z), M = this._offsets.get(Z);
      for (let E = 0; E < Z.data.vertexCount; E++) this._transformIndices[M + E] = j;
      this._data.set(z, 8 * M), this._positions.set(w, 3 * M), this._rotations.set(f, 4 * M), this._scales.set(k, 3 * M), t._free(e), t._free(b), t._free(J), t._free(i), t._free(r), t._free(p), t._free(H), t._free(x), t._free(D), this.dataChanged = !0, this.colorTransformsChanged = !0;
    }, B = (Z) => {
      if ((Z.positionChanged || Z.rotationChanged || Z.scaleChanged || Z.selectedChanged) && R(Z), Z.colorTransformChanged && d(), !Z.data.changed || Z.data.detached) return;
      const e = { position: new Float32Array(Z.position.flat()), rotation: new Float32Array(Z.rotation.flat()), scale: new Float32Array(Z.scale.flat()), selected: Z.selected, vertexCount: Z.data.vertexCount, positions: Z.data.positions, rotations: Z.data.rotations, scales: Z.data.scales, colors: Z.data.colors, selection: Z.data.selection, offset: this._offsets.get(Z) };
      this._worker.postMessage({ splat: e }, [e.position.buffer, e.rotation.buffer, e.scale.buffer, e.positions.buffer, e.rotations.buffer, e.scales.buffer, e.colors.buffer, e.selection.buffer]), this._updating.add(Z), Z.data.detached = !0;
    };
    this.getSplat = (Z) => {
      let e = null;
      for (const [b, J] of this._offsets) {
        if (!(Z >= J)) break;
        e = b;
      }
      return e;
    }, this.getLocalIndex = (Z, e) => e - this._offsets.get(Z), this.markDirty = (Z) => {
      this._dirty.add(Z);
    }, this.rebuild = () => {
      for (const Z of this._dirty) B(Z);
      this._dirty.clear();
    }, this.dispose = () => {
      this._worker.terminate();
    };
    for (const Z of this._splatIndices.keys()) V(Z);
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
class gU {
  constructor(U = 0, Q = 0, F = 0, l = 255) {
    this.r = U, this.g = Q, this.b = F, this.a = l;
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
class NU extends _U {
  constructor(U, Q) {
    super(U, Q), this._outlineThickness = 10, this._outlineColor = new gU(255, 165, 0, 255), this._renderData = null, this._depthIndex = new Uint32Array(), this._splatTexture = null, this._worker = null;
    const F = U.canvas, l = U.gl;
    let R, d, t, V, B, Z, e, b, J, i, r, p, H, x, D, z, w, f, k;
    this._resize = () => {
      this._camera && (this._camera.data.setSize(F.width, F.height), this._camera.update(), R = l.getUniformLocation(this.program, "projection"), l.uniformMatrix4fv(R, !1, this._camera.data.projectionMatrix.buffer), d = l.getUniformLocation(this.program, "viewport"), l.uniform2fv(d, new Float32Array([F.width, F.height])));
    };
    const j = () => {
      this._worker = new LU(), this._worker.onmessage = (N) => {
        if (N.data.depthIndex) {
          const { depthIndex: X } = N.data;
          this._depthIndex = X, l.bindBuffer(l.ARRAY_BUFFER, k), l.bufferData(l.ARRAY_BUFFER, X, l.STATIC_DRAW);
        }
      };
    };
    this._initialize = () => {
      if (this._scene && this._camera) {
        this._resize(), this._scene.addEventListener("objectAdded", M), this._scene.addEventListener("objectRemoved", E);
        for (const N of this._scene.objects) N instanceof q && N.addEventListener("objectChanged", L);
        this._renderData = new UF(this._scene), t = l.getUniformLocation(this.program, "focal"), l.uniform2fv(t, new Float32Array([this._camera.data.fx, this._camera.data.fy])), V = l.getUniformLocation(this.program, "view"), l.uniformMatrix4fv(V, !1, this._camera.data.viewMatrix.buffer), i = l.getUniformLocation(this.program, "outlineThickness"), l.uniform1f(i, this.outlineThickness), r = l.getUniformLocation(this.program, "outlineColor"), l.uniform4fv(r, new Float32Array(this.outlineColor.flatNorm())), this._splatTexture = l.createTexture(), B = l.getUniformLocation(this.program, "u_texture"), l.uniform1i(B, 0), x = l.createTexture(), Z = l.getUniformLocation(this.program, "u_transforms"), l.uniform1i(Z, 1), D = l.createTexture(), e = l.getUniformLocation(this.program, "u_transformIndices"), l.uniform1i(e, 2), z = l.createTexture(), b = l.getUniformLocation(this.program, "u_colorTransforms"), l.uniform1i(b, 3), w = l.createTexture(), J = l.getUniformLocation(this.program, "u_colorTransformIndices"), l.uniform1i(J, 4), f = l.createBuffer(), l.bindBuffer(l.ARRAY_BUFFER, f), l.bufferData(l.ARRAY_BUFFER, new Float32Array([-2, -2, 2, -2, 2, 2, -2, 2]), l.STATIC_DRAW), p = l.getAttribLocation(this.program, "position"), l.enableVertexAttribArray(p), l.vertexAttribPointer(p, 2, l.FLOAT, !1, 0, 0), k = l.createBuffer(), H = l.getAttribLocation(this.program, "index"), l.enableVertexAttribArray(H), l.bindBuffer(l.ARRAY_BUFFER, k), j();
      } else console.error("Cannot render without scene and camera");
    };
    const M = (N) => {
      const X = N;
      X.object instanceof q && X.object.addEventListener("objectChanged", L), this.dispose();
    }, E = (N) => {
      const X = N;
      X.object instanceof q && X.object.removeEventListener("objectChanged", L), this.dispose();
    }, L = (N) => {
      const X = N;
      X.object instanceof q && this._renderData && this._renderData.markDirty(X.object);
    };
    this._render = () => {
      var N, X;
      if (this._scene && this._camera && this.renderData) {
        if (this.renderData.needsRebuild && this.renderData.rebuild(), this.renderData.dataChanged || this.renderData.transformsChanged || this.renderData.colorTransformsChanged) {
          this.renderData.dataChanged && (l.activeTexture(l.TEXTURE0), l.bindTexture(l.TEXTURE_2D, this.splatTexture), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA32UI, this.renderData.width, this.renderData.height, 0, l.RGBA_INTEGER, l.UNSIGNED_INT, this.renderData.data)), this.renderData.transformsChanged && (l.activeTexture(l.TEXTURE1), l.bindTexture(l.TEXTURE_2D, x), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA32F, this.renderData.transformsWidth, this.renderData.transformsHeight, 0, l.RGBA, l.FLOAT, this.renderData.transforms), l.activeTexture(l.TEXTURE2), l.bindTexture(l.TEXTURE_2D, D), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.R32UI, this.renderData.transformIndicesWidth, this.renderData.transformIndicesHeight, 0, l.RED_INTEGER, l.UNSIGNED_INT, this.renderData.transformIndices)), this.renderData.colorTransformsChanged && (l.activeTexture(l.TEXTURE3), l.bindTexture(l.TEXTURE_2D, z), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA32F, this.renderData.colorTransformsWidth, this.renderData.colorTransformsHeight, 0, l.RGBA, l.FLOAT, this.renderData.colorTransforms), l.activeTexture(l.TEXTURE4), l.bindTexture(l.TEXTURE_2D, w), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST), l.texImage2D(l.TEXTURE_2D, 0, l.R32UI, this.renderData.colorTransformIndicesWidth, this.renderData.colorTransformIndicesHeight, 0, l.RED_INTEGER, l.UNSIGNED_INT, this.renderData.colorTransformIndices));
          const tU = new Float32Array(this.renderData.positions.slice().buffer), BU = new Float32Array(this.renderData.transforms.slice().buffer), VU = new Uint32Array(this.renderData.transformIndices.slice().buffer);
          (N = this._worker) === null || N === void 0 || N.postMessage({ sortData: { positions: tU, transforms: BU, transformIndices: VU, vertexCount: this.renderData.vertexCount } }, [tU.buffer, BU.buffer, VU.buffer]), this.renderData.dataChanged = !1, this.renderData.transformsChanged = !1, this.renderData.colorTransformsChanged = !1;
        }
        this._camera.update(), (X = this._worker) === null || X === void 0 || X.postMessage({ viewProj: this._camera.data.viewProj.buffer }), l.viewport(0, 0, F.width, F.height), l.clearColor(0, 0, 0, 0), l.clear(l.COLOR_BUFFER_BIT), l.disable(l.DEPTH_TEST), l.enable(l.BLEND), l.blendFuncSeparate(l.ONE_MINUS_DST_ALPHA, l.ONE, l.ONE_MINUS_DST_ALPHA, l.ONE), l.blendEquationSeparate(l.FUNC_ADD, l.FUNC_ADD), l.uniformMatrix4fv(R, !1, this._camera.data.projectionMatrix.buffer), l.uniformMatrix4fv(V, !1, this._camera.data.viewMatrix.buffer), l.bindBuffer(l.ARRAY_BUFFER, f), l.vertexAttribPointer(p, 2, l.FLOAT, !1, 0, 0), l.bindBuffer(l.ARRAY_BUFFER, k), l.bufferData(l.ARRAY_BUFFER, this.depthIndex, l.STATIC_DRAW), l.vertexAttribIPointer(H, 1, l.INT, 0, 0), l.vertexAttribDivisor(H, 1), l.drawArraysInstanced(l.TRIANGLE_FAN, 0, 4, this.renderData.vertexCount);
      } else console.error("Cannot render without scene and camera");
    }, this._dispose = () => {
      var N;
      if (this._scene && this._camera && this.renderData) {
        this._scene.removeEventListener("objectAdded", M), this._scene.removeEventListener("objectRemoved", E);
        for (const X of this._scene.objects) X instanceof q && X.removeEventListener("objectChanged", L);
        (N = this._worker) === null || N === void 0 || N.terminate(), this.renderData.dispose(), l.deleteTexture(this.splatTexture), l.deleteTexture(x), l.deleteTexture(D), l.deleteBuffer(k), l.deleteBuffer(f);
      } else console.error("Cannot dispose without scene and camera");
    }, this._setOutlineThickness = (N) => {
      this._outlineThickness = N, this._initialized && l.uniform1f(i, N);
    }, this._setOutlineColor = (N) => {
      this._outlineColor = N, this._initialized && l.uniform4fv(r, new Float32Array(N.flatNorm()));
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
class FF {
  constructor(U = 1) {
    let Q, F, l, R, d = 0, t = !1;
    this.initialize = (V) => {
      if (!(V instanceof NU)) throw new Error("FadeInPass requires a RenderProgram");
      d = V.started ? 1 : 0, t = !0, Q = V, F = V.renderer.gl, l = F.getUniformLocation(Q.program, "useDepthFade"), F.uniform1i(l, 1), R = F.getUniformLocation(Q.program, "depthFade"), F.uniform1f(R, d);
    }, this.render = () => {
      var V;
      t && !(!((V = Q.renderData) === null || V === void 0) && V.updating) && (F.useProgram(Q.program), d = Math.min(d + 0.01 * U, 1), d >= 1 && (t = !1, F.uniform1i(l, 0)), F.uniform1f(R, d));
    };
  }
  dispose() {
  }
}
class tF {
  constructor(U = null, Q = null) {
    this._backgroundColor = new gU();
    const F = U || document.createElement("canvas");
    U || (F.style.display = "block", F.style.boxSizing = "border-box", F.style.width = "100%", F.style.height = "100%", F.style.margin = "0", F.style.padding = "0", document.body.appendChild(F)), F.style.background = this._backgroundColor.toHexString(), this._canvas = F, this._gl = F.getContext("webgl2", { antialias: !1 });
    const l = Q || [];
    Q || l.push(new FF()), this._renderProgram = new NU(this, l);
    const R = [this._renderProgram];
    this.resize = () => {
      const d = F.clientWidth, t = F.clientHeight;
      F.width === d && F.height === t || this.setSize(d, t);
    }, this.setSize = (d, t) => {
      F.width = d, F.height = t, this._gl.viewport(0, 0, F.width, F.height);
      for (const V of R) V.resize();
    }, this.render = (d, t) => {
      for (const V of R) V.render(d, t);
    }, this.dispose = () => {
      for (const d of R) d.dispose();
    }, this.addProgram = (d) => {
      R.push(d);
    }, this.removeProgram = (d) => {
      const t = R.indexOf(d);
      if (t < 0) throw new Error("Program not found");
      R.splice(t, 1);
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
export {
  gU as E,
  QF as W,
  tF as Y,
  y as l,
  dF as m,
  lF as o,
  m as t
};
