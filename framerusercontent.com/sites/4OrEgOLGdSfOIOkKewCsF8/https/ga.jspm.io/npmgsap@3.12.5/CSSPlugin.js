import {
    gsap as t,
    PropTween as e,
    _round as r,
    _ticker as i,
    _getCache as n,
    _getProperty as s,
    _renderComplexString as a,
    _colorStringFilter as o,
    _numWithUnitExp as f,
    _parseRelative as l,
    _config as p,
    _relExp as h,
    _numExp as u,
    GSCache as c,
    getUnit as g,
    _isString as d,
    _forEachName as m,
    _plugins as y,
    _checkPlugin as x,
    _replaceRandom as v,
    _colorExp as _,
    _missingPlugin as w,
    _sortPropTweensByPriority as b,
    _isUndefined as O,
    _getSetter as P
} from "./gsap-core.js";
var S, M, T, C, B, A, F, Y, z = function _windowExists() {
        return typeof window !== "undefined"
    },
    X = {},
    k = 180 / Math.PI,
    E = Math.PI / 180,
    N = Math.atan2,
    V = 1e8,
    I = /([A-Z])/g,
    R = /(left|right|width|margin|padding|x)/i,
    W = /[\s,\(]\S/,
    D = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    },
    G = function _renderCSSProp(t, e) {
        return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
    },
    j = function _renderPropWithEnd(t, e) {
        return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
    },
    q = function _renderCSSPropWithBeginning(t, e) {
        return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e)
    },
    H = function _renderRoundedCSSProp(t, e) {
        var r = e.s + e.c * t;
        e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
    },
    L = function _renderNonTweeningValue(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    },
    Z = function _renderNonTweeningValueOnlyAtEnd(t, e) {
        return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e)
    },
    U = function _setterCSSStyle(t, e, r) {
        return t.style[e] = r
    },
    $ = function _setterCSSProp(t, e, r) {
        return t.style.setProperty(e, r)
    },
    K = function _setterTransform(t, e, r) {
        return t._gsap[e] = r
    },
    J = function _setterScale(t, e, r) {
        return t._gsap.scaleX = t._gsap.scaleY = r
    },
    Q = function _setterScaleWithRender(t, e, r, i, n) {
        var s = t._gsap;
        s.scaleX = s.scaleY = r;
        s.renderTransform(n, s)
    },
    tt = function _setterTransformWithRender(t, e, r, i, n) {
        var s = t._gsap;
        s[e] = r;
        s.renderTransform(n, s)
    },
    et = "transform",
    rt = et + "Origin",
    it = function _saveStyle(t, e) {
        var r = this;
        var i = this.target,
            n = i.style,
            s = i._gsap;
        if (t in X && n) {
            this.tfm = this.tfm || {};
            if (t === "transform") return D.transform.split(",").forEach((function(t) {
                return _saveStyle.call(r, t, e)
            }));
            t = D[t] || t;
            ~t.indexOf(",") ? t.split(",").forEach((function(t) {
                return r.tfm[t] = wt(i, t)
            })) : this.tfm[t] = s.x ? s[t] : wt(i, t);
            t === rt && (this.tfm.zOrigin = s.zOrigin);
            if (this.props.indexOf(et) >= 0) return;
            if (s.svg) {
                this.svgo = i.getAttribute("data-svg-origin");
                this.props.push(rt, e, "")
            }
            t = et
        }(n || e) && this.props.push(t, e, n[t])
    },
    nt = function _removeIndependentTransforms(t) {
        if (t.translate) {
            t.removeProperty("translate");
            t.removeProperty("scale");
            t.removeProperty("rotate")
        }
    },
    st = function _revertStyle() {
        var t, e, r = this.props,
            i = this.target,
            n = i.style,
            s = i._gsap;
        for (t = 0; t < r.length; t += 3) r[t + 1] ? i[r[t]] = r[t + 2] : r[t + 2] ? n[r[t]] = r[t + 2] : n.removeProperty(r[t].substr(0, 2) === "--" ? r[t] : r[t].replace(I, "-$1").toLowerCase());
        if (this.tfm) {
            for (e in this.tfm) s[e] = this.tfm[e];
            if (s.svg) {
                s.renderTransform();
                i.setAttribute("data-svg-origin", this.svgo || "")
            }
            t = F();
            if ((!t || !t.isStart) && !n[et]) {
                nt(n);
                if (s.zOrigin && n[rt]) {
                    n[rt] += " " + s.zOrigin + "px";
                    s.zOrigin = 0;
                    s.renderTransform()
                }
                s.uncache = 1
            }
        }
    },
    at = function _getStyleSaver(e, r) {
        var i = {
            target: e,
            props: [],
            revert: st,
            save: it
        };
        e._gsap || t.core.getCache(e);
        r && r.split(",").forEach((function(t) {
            return i.save(t)
        }));
        return i
    },
    ot = function _createElement(t, e) {
        var r = M.createElementNS ? M.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : M.createElement(t);
        return r && r.style ? r : M.createElement(t)
    },
    ft = function _getComputedProperty(t, e, r) {
        var i = getComputedStyle(t);
        return i[e] || i.getPropertyValue(e.replace(I, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && _getComputedProperty(t, pt(e) || e, 1) || ""
    },
    lt = "O,Moz,ms,Ms,Webkit".split(","),
    pt = function _checkPropPrefix(t, e, r) {
        var i = e || B,
            n = i.style,
            s = 5;
        if (t in n && !r) return t;
        t = t.charAt(0).toUpperCase() + t.substr(1);
        while (s-- && !(lt[s] + t in n));
        return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? lt[s] : "") + t
    },
    ht = function _initCore() {
        if (z() && window.document) {
            S = window;
            M = S.document;
            T = M.documentElement;
            B = ot("div") || {
                style: {}
            };
            ot("div");
            et = pt(et);
            rt = et + "Origin";
            B.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
            Y = !!pt("perspective");
            F = t.core.reverting;
            C = 1
        }
    },
    ut = function _getBBoxHack(t) {
        var e, r = ot("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            i = this.parentNode,
            n = this.nextSibling,
            s = this.style.cssText;
        T.appendChild(r);
        r.appendChild(this);
        this.style.display = "block";
        if (t) try {
            e = this.getBBox();
            this._gsapBBox = this.getBBox;
            this.getBBox = _getBBoxHack
        } catch (t) {} else this._gsapBBox && (e = this._gsapBBox());
        i && (n ? i.insertBefore(this, n) : i.appendChild(this));
        T.removeChild(r);
        this.style.cssText = s;
        return e
    },
    ct = function _getAttributeFallbacks(t, e) {
        var r = e.length;
        while (r--)
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
    },
    gt = function _getBBox(t) {
        var e;
        try {
            e = t.getBBox()
        } catch (r) {
            e = ut.call(t, true)
        }
        e && (e.width || e.height) || t.getBBox === ut || (e = ut.call(t, true));
        return !e || e.width || e.x || e.y ? e : {
            x: +ct(t, ["x", "cx", "x1"]) || 0,
            y: +ct(t, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        }
    },
    dt = function _isSVG(t) {
        return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && gt(t))
    },
    mt = function _removeProperty(t, e) {
        if (e) {
            var r, i = t.style;
            e in X && e !== rt && (e = et);
            if (i.removeProperty) {
                r = e.substr(0, 2);
                r !== "ms" && e.substr(0, 6) !== "webkit" || (e = "-" + e);
                i.removeProperty(r === "--" ? e : e.replace(I, "-$1").toLowerCase())
            } else i.removeAttribute(e)
        }
    },
    yt = function _addNonTweeningPT(t, r, i, n, s, a) {
        var o = new e(t._pt, r, i, 0, 1, a ? Z : L);
        t._pt = o;
        o.b = n;
        o.e = s;
        t._props.push(i);
        return o
    },
    xt = {
        deg: 1,
        rad: 1,
        turn: 1
    },
    vt = {
        grid: 1,
        flex: 1
    },
    _t = function _convertToUnit(t, e, s, a) {
        var o, f, l, p, h = parseFloat(s) || 0,
            u = (s + "").trim().substr((h + "").length) || "px",
            c = B.style,
            g = R.test(e),
            d = t.tagName.toLowerCase() === "svg",
            m = (d ? "client" : "offset") + (g ? "Width" : "Height"),
            y = 100,
            x = a === "px",
            v = a === "%";
        if (a === u || !h || xt[a] || xt[u]) return h;
        u !== "px" && !x && (h = _convertToUnit(t, e, s, "px"));
        p = t.getCTM && dt(t);
        if ((v || u === "%") && (X[e] || ~e.indexOf("adius"))) {
            o = p ? t.getBBox()[g ? "width" : "height"] : t[m];
            return r(v ? h / o * y : h / 100 * o)
        }
        c[g ? "width" : "height"] = y + (x ? u : a);
        f = ~e.indexOf("adius") || a === "em" && t.appendChild && !d ? t : t.parentNode;
        p && (f = (t.ownerSVGElement || {}).parentNode);
        f && f !== M && f.appendChild || (f = M.body);
        l = f._gsap;
        if (l && v && l.width && g && l.time === i.time && !l.uncache) return r(h / l.width * y);
        if (!v || e !== "height" && e !== "width") {
            (v || u === "%") && !vt[ft(f, "display")] && (c.position = ft(t, "position"));
            f === t && (c.position = "static");
            f.appendChild(B);
            o = B[m];
            f.removeChild(B);
            c.position = "absolute"
        } else {
            var _ = t.style[e];
            t.style[e] = y + a;
            o = t[m];
            _ ? t.style[e] = _ : mt(t, e)
        }
        if (g && v) {
            l = n(f);
            l.time = i.time;
            l.width = f[m]
        }
        return r(x ? o * h / y : o && h ? y / o * h : 0)
    },
    wt = function _get(t, e, r, i) {
        var n;
        C || ht();
        if (e in D && e !== "transform") {
            e = D[e];
            ~e.indexOf(",") && (e = e.split(",")[0])
        }
        if (X[e] && e !== "transform") {
            n = zt(t, i);
            n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Xt(ft(t, rt)) + " " + n.zOrigin + "px"
        } else {
            n = t.style[e];
            (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) && (n = Mt[e] && Mt[e](t, e, r) || ft(t, e) || s(t, e) || (e === "opacity" ? 1 : 0))
        }
        return r && !~(n + "").trim().indexOf(" ") ? _t(t, e, n, r) + r : n
    },
    bt = function _tweenComplexCSSString(t, r, i, n) {
        if (!i || i === "none") {
            var s = pt(r, t, 1),
                u = s && ft(t, s, 1);
            if (u && u !== i) {
                r = s;
                i = u
            } else r === "borderColor" && (i = ft(t, "borderTopColor"))
        }
        var c, g, d, m, y, x, v, _, w, b, O, P, S = new e(this._pt, t.style, r, 0, 1, a),
            M = 0,
            T = 0;
        S.b = i;
        S.e = n;
        i += "";
        n += "";
        if (n === "auto") {
            x = t.style[r];
            t.style[r] = n;
            n = ft(t, r) || n;
            x ? t.style[r] = x : mt(t, r)
        }
        c = [i, n];
        o(c);
        i = c[0];
        n = c[1];
        d = i.match(f) || [];
        P = n.match(f) || [];
        if (P.length) {
            while (g = f.exec(n)) {
                v = g[0];
                w = n.substring(M, g.index);
                y ? y = (y + 1) % 5 : w.substr(-5) !== "rgba(" && w.substr(-5) !== "hsla(" || (y = 1);
                if (v !== (x = d[T++] || "")) {
                    m = parseFloat(x) || 0;
                    O = x.substr((m + "").length);
                    v.charAt(1) === "=" && (v = l(m, v) + O);
                    _ = parseFloat(v);
                    b = v.substr((_ + "").length);
                    M = f.lastIndex - b.length;
                    if (!b) {
                        b = b || p.units[r] || O;
                        if (M === n.length) {
                            n += b;
                            S.e += b
                        }
                    }
                    O !== b && (m = _t(t, r, x, b) || 0);
                    S._pt = {
                        _next: S._pt,
                        p: w || T === 1 ? w : ",",
                        s: m,
                        c: _ - m,
                        m: y && y < 4 || r === "zIndex" ? Math.round : 0
                    }
                }
            }
            S.c = M < n.length ? n.substring(M, n.length) : ""
        } else S.r = r === "display" && n === "none" ? Z : L;
        h.test(n) && (S.e = 0);
        this._pt = S;
        return S
    },
    Ot = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    },
    Pt = function _convertKeywordsToPercentages(t) {
        var e = t.split(" "),
            r = e[0],
            i = e[1] || "50%";
        if (r === "top" || r === "bottom" || i === "left" || i === "right") {
            t = r;
            r = i;
            i = t
        }
        e[0] = Ot[r] || r;
        e[1] = Ot[i] || i;
        return e.join(" ")
    },
    St = function _renderClearProps(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var r, i, n, s = e.t,
                a = s.style,
                o = e.u,
                f = s._gsap;
            if (o === "all" || o === true) {
                a.cssText = "";
                i = 1
            } else {
                o = o.split(",");
                n = o.length;
                while (--n > -1) {
                    r = o[n];
                    if (X[r]) {
                        i = 1;
                        r = r === "transformOrigin" ? rt : et
                    }
                    mt(s, r)
                }
            }
            if (i) {
                mt(s, et);
                if (f) {
                    f.svg && s.removeAttribute("transform");
                    zt(s, 1);
                    f.uncache = 1;
                    nt(a)
                }
            }
        }
    },
    Mt = {
        clearProps: function clearProps(t, r, i, n, s) {
            if (s.data !== "isFromStart") {
                var a = t._pt = new e(t._pt, r, i, 0, 0, St);
                a.u = n;
                a.pr = -10;
                a.tween = s;
                t._props.push(i);
                return 1
            }
        }
    },
    Tt = [1, 0, 0, 1, 0, 0],
    Ct = {},
    Bt = function _isNullTransform(t) {
        return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t
    },
    At = function _getComputedTransformMatrixAsArray(t) {
        var e = ft(t, et);
        return Bt(e) ? Tt : e.substr(7).match(u).map(r)
    },
    Ft = function _getMatrix(t, e) {
        var r, i, s, a, o = t._gsap || n(t),
            f = t.style,
            l = At(t);
        if (o.svg && t.getAttribute("transform")) {
            s = t.transform.baseVal.consolidate().matrix;
            l = [s.a, s.b, s.c, s.d, s.e, s.f];
            return l.join(",") === "1,0,0,1,0,0" ? Tt : l
        }
        if (l === Tt && !t.offsetParent && t !== T && !o.svg) {
            s = f.display;
            f.display = "block";
            r = t.parentNode;
            if (!r || !t.offsetParent) {
                a = 1;
                i = t.nextElementSibling;
                T.appendChild(t)
            }
            l = At(t);
            s ? f.display = s : mt(t, "display");
            a && (i ? r.insertBefore(t, i) : r ? r.appendChild(t) : T.removeChild(t))
        }
        return e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l
    },
    Yt = function _applySVGOrigin(t, e, r, i, n, s) {
        var a, o, f, l, p = t._gsap,
            h = n || Ft(t, true),
            u = p.xOrigin || 0,
            c = p.yOrigin || 0,
            g = p.xOffset || 0,
            d = p.yOffset || 0,
            m = h[0],
            y = h[1],
            x = h[2],
            v = h[3],
            _ = h[4],
            w = h[5],
            b = e.split(" "),
            O = parseFloat(b[0]) || 0,
            P = parseFloat(b[1]) || 0;
        if (r) {
            if (h !== Tt && (o = m * v - y * x)) {
                f = O * (v / o) + P * (-x / o) + (x * w - v * _) / o;
                l = O * (-y / o) + P * (m / o) - (m * w - y * _) / o;
                O = f;
                P = l
            }
        } else {
            a = gt(t);
            O = a.x + (~b[0].indexOf("%") ? O / 100 * a.width : O);
            P = a.y + (~(b[1] || b[0]).indexOf("%") ? P / 100 * a.height : P)
        }
        if (i || i !== false && p.smooth) {
            _ = O - u;
            w = P - c;
            p.xOffset = g + (_ * m + w * x) - _;
            p.yOffset = d + (_ * y + w * v) - w
        } else p.xOffset = p.yOffset = 0;
        p.xOrigin = O;
        p.yOrigin = P;
        p.smooth = !!i;
        p.origin = e;
        p.originIsAbsolute = !!r;
        t.style[rt] = "0px 0px";
        if (s) {
            yt(s, p, "xOrigin", u, O);
            yt(s, p, "yOrigin", c, P);
            yt(s, p, "xOffset", g, p.xOffset);
            yt(s, p, "yOffset", d, p.yOffset)
        }
        t.setAttribute("data-svg-origin", O + " " + P)
    },
    zt = function _parseTransform(t, e) {
        var i = t._gsap || new c(t);
        if ("x" in i && !e && !i.uncache) return i;
        var n, s, a, o, f, l, h, u, g, d, m, y, x, v, _, w, b, O, P, S, M, T, C, B, A, F, z, X, V, I, R, W, D = t.style,
            G = i.scaleX < 0,
            j = "px",
            q = "deg",
            H = getComputedStyle(t),
            L = ft(t, rt) || "0";
        n = s = a = l = h = u = g = d = m = 0;
        o = f = 1;
        i.svg = !!(t.getCTM && dt(t));
        if (H.translate) {
            H.translate === "none" && H.scale === "none" && H.rotate === "none" || (D[et] = (H.translate !== "none" ? "translate3d(" + (H.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (H.rotate !== "none" ? "rotate(" + H.rotate + ") " : "") + (H.scale !== "none" ? "scale(" + H.scale.split(" ").join(",") + ") " : "") + (H[et] !== "none" ? H[et] : ""));
            D.scale = D.rotate = D.translate = "none"
        }
        v = Ft(t, i.svg);
        if (i.svg) {
            if (i.uncache) {
                A = t.getBBox();
                L = i.xOrigin - A.x + "px " + (i.yOrigin - A.y) + "px";
                B = ""
            } else B = !e && t.getAttribute("data-svg-origin");
            Yt(t, B || L, !!B || i.originIsAbsolute, i.smooth !== false, v)
        }
        y = i.xOrigin || 0;
        x = i.yOrigin || 0;
        if (v !== Tt) {
            O = v[0];
            P = v[1];
            S = v[2];
            M = v[3];
            n = T = v[4];
            s = C = v[5];
            if (v.length === 6) {
                o = Math.sqrt(O * O + P * P);
                f = Math.sqrt(M * M + S * S);
                l = O || P ? N(P, O) * k : 0;
                g = S || M ? N(S, M) * k + l : 0;
                g && (f *= Math.abs(Math.cos(g * E)));
                if (i.svg) {
                    n -= y - (y * O + x * S);
                    s -= x - (y * P + x * M)
                }
            } else {
                W = v[6];
                I = v[7];
                z = v[8];
                X = v[9];
                V = v[10];
                R = v[11];
                n = v[12];
                s = v[13];
                a = v[14];
                _ = N(W, V);
                h = _ * k;
                if (_) {
                    w = Math.cos(-_);
                    b = Math.sin(-_);
                    B = T * w + z * b;
                    A = C * w + X * b;
                    F = W * w + V * b;
                    z = T * -b + z * w;
                    X = C * -b + X * w;
                    V = W * -b + V * w;
                    R = I * -b + R * w;
                    T = B;
                    C = A;
                    W = F
                }
                _ = N(-S, V);
                u = _ * k;
                if (_) {
                    w = Math.cos(-_);
                    b = Math.sin(-_);
                    B = O * w - z * b;
                    A = P * w - X * b;
                    F = S * w - V * b;
                    R = M * b + R * w;
                    O = B;
                    P = A;
                    S = F
                }
                _ = N(P, O);
                l = _ * k;
                if (_) {
                    w = Math.cos(_);
                    b = Math.sin(_);
                    B = O * w + P * b;
                    A = T * w + C * b;
                    P = P * w - O * b;
                    C = C * w - T * b;
                    O = B;
                    T = A
                }
                if (h && Math.abs(h) + Math.abs(l) > 359.9) {
                    h = l = 0;
                    u = 180 - u
                }
                o = r(Math.sqrt(O * O + P * P + S * S));
                f = r(Math.sqrt(C * C + W * W));
                _ = N(T, C);
                g = Math.abs(_) > 2e-4 ? _ * k : 0;
                m = R ? 1 / (R < 0 ? -R : R) : 0
            }
            if (i.svg) {
                B = t.getAttribute("transform");
                i.forceCSS = t.setAttribute("transform", "") || !Bt(ft(t, et));
                B && t.setAttribute("transform", B)
            }
        }
        if (Math.abs(g) > 90 && Math.abs(g) < 270)
            if (G) {
                o *= -1;
                g += l <= 0 ? 180 : -180;
                l += l <= 0 ? 180 : -180
            } else {
                f *= -1;
                g += g <= 0 ? 180 : -180
            }
        e = e || i.uncache;
        i.x = n - ((i.xPercent = n && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + j;
        i.y = s - ((i.yPercent = s && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-s) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + j;
        i.z = a + j;
        i.scaleX = r(o);
        i.scaleY = r(f);
        i.rotation = r(l) + q;
        i.rotationX = r(h) + q;
        i.rotationY = r(u) + q;
        i.skewX = g + q;
        i.skewY = d + q;
        i.transformPerspective = m + j;
        (i.zOrigin = parseFloat(L.split(" ")[2]) || !e && i.zOrigin || 0) && (D[rt] = Xt(L));
        i.xOffset = i.yOffset = 0;
        i.force3D = p.force3D;
        i.renderTransform = i.svg ? Wt : Y ? Rt : Et;
        i.uncache = 0;
        return i
    },
    Xt = function _firstTwoOnly(t) {
        return (t = t.split(" "))[0] + " " + t[1]
    },
    kt = function _addPxTranslate(t, e, i) {
        var n = g(e);
        return r(parseFloat(e) + parseFloat(_t(t, "x", i + "px", n))) + n
    },
    Et = function _renderNon3DTransforms(t, e) {
        e.z = "0px";
        e.rotationY = e.rotationX = "0deg";
        e.force3D = 0;
        Rt(t, e)
    },
    Nt = "0deg",
    Vt = "0px",
    It = ") ",
    Rt = function _renderCSSTransforms(t, e) {
        var r = e || this,
            i = r.xPercent,
            n = r.yPercent,
            s = r.x,
            a = r.y,
            o = r.z,
            f = r.rotation,
            l = r.rotationY,
            p = r.rotationX,
            h = r.skewX,
            u = r.skewY,
            c = r.scaleX,
            g = r.scaleY,
            d = r.transformPerspective,
            m = r.force3D,
            y = r.target,
            x = r.zOrigin,
            v = "",
            _ = m === "auto" && t && t !== 1 || m === true;
        if (x && (p !== Nt || l !== Nt)) {
            var w, b = parseFloat(l) * E,
                O = Math.sin(b),
                P = Math.cos(b);
            b = parseFloat(p) * E;
            w = Math.cos(b);
            s = kt(y, s, O * w * -x);
            a = kt(y, a, -Math.sin(b) * -x);
            o = kt(y, o, P * w * -x + x)
        }
        d !== Vt && (v += "perspective(" + d + It);
        (i || n) && (v += "translate(" + i + "%, " + n + "%) ");
        (_ || s !== Vt || a !== Vt || o !== Vt) && (v += o !== Vt || _ ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + It);
        f !== Nt && (v += "rotate(" + f + It);
        l !== Nt && (v += "rotateY(" + l + It);
        p !== Nt && (v += "rotateX(" + p + It);
        h === Nt && u === Nt || (v += "skew(" + h + ", " + u + It);
        c === 1 && g === 1 || (v += "scale(" + c + ", " + g + It);
        y.style[et] = v || "translate(0, 0)"
    },
    Wt = function _renderSVGTransforms(t, e) {
        var i, n, s, a, o, f = e || this,
            l = f.xPercent,
            p = f.yPercent,
            h = f.x,
            u = f.y,
            c = f.rotation,
            g = f.skewX,
            d = f.skewY,
            m = f.scaleX,
            y = f.scaleY,
            x = f.target,
            v = f.xOrigin,
            _ = f.yOrigin,
            w = f.xOffset,
            b = f.yOffset,
            O = f.forceCSS,
            P = parseFloat(h),
            S = parseFloat(u);
        c = parseFloat(c);
        g = parseFloat(g);
        d = parseFloat(d);
        if (d) {
            d = parseFloat(d);
            g += d;
            c += d
        }
        if (c || g) {
            c *= E;
            g *= E;
            i = Math.cos(c) * m;
            n = Math.sin(c) * m;
            s = Math.sin(c - g) * -y;
            a = Math.cos(c - g) * y;
            if (g) {
                d *= E;
                o = Math.tan(g - d);
                o = Math.sqrt(1 + o * o);
                s *= o;
                a *= o;
                if (d) {
                    o = Math.tan(d);
                    o = Math.sqrt(1 + o * o);
                    i *= o;
                    n *= o
                }
            }
            i = r(i);
            n = r(n);
            s = r(s);
            a = r(a)
        } else {
            i = m;
            a = y;
            n = s = 0
        }
        if (P && !~(h + "").indexOf("px") || S && !~(u + "").indexOf("px")) {
            P = _t(x, "x", h, "px");
            S = _t(x, "y", u, "px")
        }
        if (v || _ || w || b) {
            P = r(P + v - (v * i + _ * s) + w);
            S = r(S + _ - (v * n + _ * a) + b)
        }
        if (l || p) {
            o = x.getBBox();
            P = r(P + l / 100 * o.width);
            S = r(S + p / 100 * o.height)
        }
        o = "matrix(" + i + "," + n + "," + s + "," + a + "," + P + "," + S + ")";
        x.setAttribute("transform", o);
        O && (x.style[et] = o)
    },
    Dt = function _addRotationalPropTween(t, r, i, n, s) {
        var a, o, f = 360,
            l = d(s),
            p = parseFloat(s) * (l && ~s.indexOf("rad") ? k : 1),
            h = p - n,
            u = n + h + "deg";
        if (l) {
            a = s.split("_")[1];
            if (a === "short") {
                h %= f;
                h !== h % (f / 2) && (h += h < 0 ? f : -f)
            }
            a === "cw" && h < 0 ? h = (h + f * V) % f - ~~(h / f) * f : a === "ccw" && h > 0 && (h = (h - f * V) % f - ~~(h / f) * f)
        }
        t._pt = o = new e(t._pt, r, i, n, h, j);
        o.e = u;
        o.u = "deg";
        t._props.push(i);
        return o
    },
    Gt = function _assign(t, e) {
        for (var r in e) t[r] = e[r];
        return t
    },
    jt = function _addRawTransformPTs(t, r, i) {
        var n, s, a, o, f, l, p, h, u = Gt({}, i._gsap),
            c = "perspective,force3D,transformOrigin,svgOrigin",
            d = i.style;
        if (u.svg) {
            a = i.getAttribute("transform");
            i.setAttribute("transform", "");
            d[et] = r;
            n = zt(i, 1);
            mt(i, et);
            i.setAttribute("transform", a)
        } else {
            a = getComputedStyle(i)[et];
            d[et] = r;
            n = zt(i, 1);
            d[et] = a
        }
        for (s in X) {
            a = u[s];
            o = n[s];
            if (a !== o && c.indexOf(s) < 0) {
                p = g(a);
                h = g(o);
                f = p !== h ? _t(i, s, a, h) : parseFloat(a);
                l = parseFloat(o);
                t._pt = new e(t._pt, n, s, f, l - f, G);
                t._pt.u = h || 0;
                t._props.push(s)
            }
        }
        Gt(n, u)
    };
m("padding,margin,Width,Radius", (function(t, e) {
    var r = "Top",
        i = "Right",
        n = "Bottom",
        s = "Left",
        a = (e < 3 ? [r, i, n, s] : [r + s, r + i, n + i, n + s]).map((function(r) {
            return e < 2 ? t + r : "border" + r + t
        }));
    Mt[e > 1 ? "border" + t : t] = function(t, e, r, i, n) {
        var s, o;
        if (arguments.length < 4) {
            s = a.map((function(e) {
                return wt(t, e, r)
            }));
            o = s.join(" ");
            return o.split(s[0]).length === 5 ? s[0] : o
        }
        s = (i + "").split(" ");
        o = {};
        a.forEach((function(t, e) {
            return o[t] = s[e] = s[e] || s[(e - 1) / 2 | 0]
        }));
        t.init(e, o, n)
    }
}));
var qt = {
    name: "css",
    register: ht,
    targetTest: function targetTest(t) {
        return t.style && t.nodeType
    },
    init: function init(t, r, i, n, s) {
        var a, o, f, h, u, c, m, O, P, S, M, T, B, A, F, Y, z = this._props,
            k = t.style,
            E = i.vars.startAt;
        C || ht();
        this.styles = this.styles || at(t);
        Y = this.styles.props;
        this.tween = i;
        for (m in r)
            if (m !== "autoRound") {
                o = r[m];
                if (!y[m] || !x(m, r, i, n, t, s)) {
                    u = typeof o;
                    c = Mt[m];
                    if (u === "function") {
                        o = o.call(i, n, t, s);
                        u = typeof o
                    }
                    u === "string" && ~o.indexOf("random(") && (o = v(o));
                    if (c) c(this, t, m, o, i) && (F = 1);
                    else if (m.substr(0, 2) === "--") {
                        a = (getComputedStyle(t).getPropertyValue(m) + "").trim();
                        o += "";
                        _.lastIndex = 0;
                        if (!_.test(a)) {
                            O = g(a);
                            P = g(o)
                        }
                        P ? O !== P && (a = _t(t, m, a, P) + P) : O && (o += O);
                        this.add(k, "setProperty", a, o, n, s, 0, 0, m);
                        z.push(m);
                        Y.push(m, 0, k[m])
                    } else if (u !== "undefined") {
                        if (E && m in E) {
                            a = typeof E[m] === "function" ? E[m].call(i, n, t, s) : E[m];
                            d(a) && ~a.indexOf("random(") && (a = v(a));
                            g(a + "") || a === "auto" || (a += p.units[m] || g(wt(t, m)) || "");
                            (a + "").charAt(1) === "=" && (a = wt(t, m))
                        } else a = wt(t, m);
                        h = parseFloat(a);
                        S = u === "string" && o.charAt(1) === "=" && o.substr(0, 2);
                        S && (o = o.substr(2));
                        f = parseFloat(o);
                        if (m in D) {
                            if (m === "autoAlpha") {
                                h === 1 && wt(t, "visibility") === "hidden" && f && (h = 0);
                                Y.push("visibility", 0, k.visibility);
                                yt(this, k, "visibility", h ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)
                            }
                            if (m !== "scale" && m !== "transform") {
                                m = D[m];
                                ~m.indexOf(",") && (m = m.split(",")[0])
                            }
                        }
                        M = m in X;
                        if (M) {
                            this.styles.save(m);
                            if (!T) {
                                B = t._gsap;
                                B.renderTransform && !r.parseTransform || zt(t, r.parseTransform);
                                A = r.smoothOrigin !== false && B.smooth;
                                T = this._pt = new e(this._pt, k, et, 0, 1, B.renderTransform, B, 0, -1);
                                T.dep = 1
                            }
                            if (m === "scale") {
                                this._pt = new e(this._pt, B, "scaleY", B.scaleY, (S ? l(B.scaleY, S + f) : f) - B.scaleY || 0, G);
                                this._pt.u = 0;
                                z.push("scaleY", m);
                                m += "X"
                            } else {
                                if (m === "transformOrigin") {
                                    Y.push(rt, 0, k[rt]);
                                    o = Pt(o);
                                    if (B.svg) Yt(t, o, 0, A, 0, this);
                                    else {
                                        P = parseFloat(o.split(" ")[2]) || 0;
                                        P !== B.zOrigin && yt(this, B, "zOrigin", B.zOrigin, P);
                                        yt(this, k, m, Xt(a), Xt(o))
                                    }
                                    continue
                                }
                                if (m === "svgOrigin") {
                                    Yt(t, o, 1, A, 0, this);
                                    continue
                                }
                                if (m in Ct) {
                                    Dt(this, B, m, h, S ? l(h, S + o) : o);
                                    continue
                                }
                                if (m === "smoothOrigin") {
                                    yt(this, B, "smooth", B.smooth, o);
                                    continue
                                }
                                if (m === "force3D") {
                                    B[m] = o;
                                    continue
                                }
                                if (m === "transform") {
                                    jt(this, o, t);
                                    continue
                                }
                            }
                        } else m in k || (m = pt(m) || m);
                        if (M || (f || f === 0) && (h || h === 0) && !W.test(o) && m in k) {
                            O = (a + "").substr((h + "").length);
                            f || (f = 0);
                            P = g(o) || (m in p.units ? p.units[m] : O);
                            O !== P && (h = _t(t, m, a, P));
                            this._pt = new e(this._pt, M ? B : k, m, h, (S ? l(h, S + f) : f) - h, M || P !== "px" && m !== "zIndex" || r.autoRound === false ? G : H);
                            this._pt.u = P || 0;
                            if (O !== P && P !== "%") {
                                this._pt.b = a;
                                this._pt.r = q
                            }
                        } else if (m in k) bt.call(this, t, m, a, S ? S + o : o);
                        else if (m in t) this.add(t, m, a || t[m], S ? S + o : o, n, s);
                        else if (m !== "parseTransform") {
                            w(m, o);
                            continue
                        }
                        M || (m in k ? Y.push(m, 0, k[m]) : Y.push(m, 1, a || t[m]));
                        z.push(m)
                    }
                }
            }
        F && b(this)
    },
    render: function render(t, e) {
        if (e.tween._time || !F()) {
            var r = e._pt;
            while (r) {
                r.r(t, r.d);
                r = r._next
            }
        } else e.styles.revert()
    },
    get: wt,
    aliases: D,
    getSetter: function getSetter(t, e, r) {
        var i = D[e];
        i && i.indexOf(",") < 0 && (e = i);
        return e in X && e !== rt && (t._gsap.x || wt(t, "x")) ? r && A === r ? e === "scale" ? J : K : (A = r || {}) && (e === "scale" ? Q : tt) : t.style && !O(t.style[e]) ? U : ~e.indexOf("-") ? $ : P(t, e)
    },
    core: {
        _removeProperty: mt,
        _getMatrix: Ft
    }
};
t.utils.checkPrefix = pt;
t.core.getStyleSaver = at;
(function(t, e, r, i) {
    var n = m(t + "," + e + "," + r, (function(t) {
        X[t] = 1
    }));
    m(e, (function(t) {
        p.units[t] = "deg";
        Ct[t] = 1
    }));
    D[n[13]] = t + "," + e;
    m(i, (function(t) {
        var e = t.split(":");
        D[e[1]] = n[e[0]]
    }))
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
m("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(t) {
    p.units[t] = "px"
}));
t.registerPlugin(qt);
export {
    qt as CSSPlugin, ot as _createElement, gt as _getBBox, pt as checkPrefix, qt as
    default
};
//# sourceMappingURL=CSSPlugin.js.map