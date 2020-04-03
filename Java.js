 ! function(e, t) 
 {
    "function" == typeof define && define.amd ? define([], t(e)) : "object" == typeof exports ? module.exports = t(e) : e.smoothScroll = t(e)
}
("undefined" != typeof global ? global : this.window || this.global, function(e) 
{
    "use strict";
    var t, n, r, o, a = {},
        u = "querySelector" in document && "addEventListener" in e,
        c = {
            selector: "[data-scroll]",
            selectorHeader: "[data-scroll-header]",
            speed: 500,
            easing: "easeInOutCubic",
            offset: 0,
            updateURL: !0,
            callback: function() {}
},
        i = function() 
        {
            var e = {},
                t = !1,
                n = 0,
                r = arguments.length;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], n++);
            for (var o = function(n) {
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t && "[object Object]" === Object.prototype.toString.call(n[r]) ? e[r] = i(!0, e[r], n[r]) : e[r] = n[r])
                }; r > n; n++) {
                var a = arguments[n];
                o(a)
        }
            return e
        },
        s = function(e) 
        {
            return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
        },
        l = function(e, t) 
        {
            var n, r, o = t.charAt(0),
                a = "classList" in document.documentElement;
            for ("[" === o && (t = t.substr(1, t.length - 2), n = t.split("="), n.length > 1 && (r = !0, n[1] = n[1].replace(/"/g, "").replace(/'/g, ""))); e && e !== document; e = e.parentNode) {
                if ("." === o)
                    if (a) {
                        if (e.classList.contains(t.substr(1))) return e
                    } else if (new RegExp("(^|\\s)" + t.substr(1) + "(\\s|$)").test(e.className)) return e;
                if ("#" === o && e.id === t.substr(1)) return e;
                if ("[" === o && e.hasAttribute(n[0])) {
                    if (!r) return e;
                    if (e.getAttribute(n[0]) === n[1]) return e
                }
                if (e.tagName.toLowerCase() === t) return e
        }
            return null
        },
        f = function(e) 
        {
            for (var t, n = String(e), r = n.length, o = -1, a = "", u = n.charCodeAt(0); ++o < r;) {
                if (t = n.charCodeAt(o), 0 === t) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                a += t >= 1 && 31 >= t || 127 == t || 0 === o && t >= 48 && 57 >= t || 1 === o && t >= 48 && 57 >= t && 45 === u ? "\\" + t.toString(16) + " " : t >= 128 || 45 === t || 95 === t || t >= 48 && 57 >= t || t >= 65 && 90 >= t || t >= 97 && 122 >= t ? n.charAt(o) : "\\" + n.charAt(o)
        }
            return a
        },
        d = function(e, t) 
        {
            var n;
            return "easeInQuad" === e && (n = t * t), "easeOutQuad" === e && (n = t * (2 - t)), "easeInOutQuad" === e && (n = .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t), "easeInCubic" === e && (n = t * t * t), "easeOutCubic" === e && (n = --t * t * t + 1), "easeInOutCubic" === e && (n = .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e && (n = t * t * t * t), "easeOutQuart" === e && (n = 1 - --t * t * t * t), "easeInOutQuart" === e && (n = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e && (n = t * t * t * t * t), "easeOutQuint" === e && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e && (n = .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), n || t
        },
        m = function(e, t, n) 
        {
            var r = 0;
            if (e.offsetParent)
                do r += e.offsetTop, e = e.offsetParent; while (e);
            return r = r - t - n, r >= 0 ? r : 0
        },
        h = function() 
        {
            return Math.max(e.document.body.scrollHeight, e.document.documentElement.scrollHeight, e.document.body.offsetHeight, e.document.documentElement.offsetHeight, e.document.body.clientHeight, e.document.documentElement.clientHeight)
        },
        p = function(e) 
        {
            return e && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(e) : {}
        },
        g = function(t, n) 
        {
            e.history.pushState && (n || "true" === n) && e.history.pushState(null, null, [e.location.protocol, "//", e.location.host, e.location.pathname, e.location.search, t].join(""))
        },
        b = function(e) 
        {
            return null === e ? 0 : s(e) + e.offsetTop
        };

    a.animateScroll = function(t, n, a) 
    {
        var u = p(t ? t.getAttribute("data-options") : null),
            s = i(s || c, a || {}, u);
        n = "#" + f(n.substr(1));
        
        var l = "#" === n ? e.document.documentElement : e.document.querySelector(n),
            v = e.pageYOffset;
            r || (r = e.document.querySelector(s.selectorHeader)), o || (o = b(r));
        
        var y, O, S, I = m(l, o, parseInt(s.offset, 10)),
            H = I - v,
            E = h(),
            L = 0;
        
        g(n, s.updateURL);
        
        var j = function(r, o, a) 
        {
                var u = e.pageYOffset;
                (r == o || u == o || e.innerHeight + u >= E) && (clearInterval(a), l.focus(), s.callback(t, n))
        },
            w = function() {
                L += 16, O = L / parseInt(s.speed, 10), O = O > 1 ? 1 : O, S = v + H * d(s.easing, O), e.scrollTo(0, Math.floor(S)), j(S, I, y)
            },
            C = function() {
                y = setInterval(w, 16)
            };
        0 === e.pageYOffset && e.scrollTo(0, 0), C()
    };
    var v = function(e) 
    {
            var n = l(e.target, t.selector);
            n && "a" === n.tagName.toLowerCase() && (e.preventDefault(), a.animateScroll(n, n.hash, t))
        },
        y = function(e) 
        {
            n || (n = setTimeout(function() {
                n = null, o = b(r)
            }, 66))
        };
    return a.destroy = function() 
    {
        t && (e.document.removeEventListener("click", v, !1), e.removeEventListener("resize", y, !1), t = null, n = null, r = null, o = null)
    }, a.init = function(n) {
        u && (a.destroy(), t = i(c, n || {}), r = e.document.querySelector(t.selectorHeader), o = b(r), e.document.addEventListener("click", v, !1), r && e.addEventListener("resize", y, !1))
    }, a
});

    
!(function(e, t) {
    "function" == typeof define && define.amd ? define([], t(e)) : "object" == typeof exports ? module.exports = t(e) : e.gumshoe = t(e)
})("undefined" != typeof global ? global : this.window || this.global, (function(e) {
    "use strict";
    var t, n, o, r, a, c, i = {},
        l = "querySelector" in document && "addEventListener" in e && "classList" in document.createElement("_"),
        s = [],
        u = {
            selector: "[data-gumshoe] a",
            selectorHeader: "[data-gumshoe-header]",
            container: e,
            offset: 0,
            activeClass: "active",
            callback: function() {}
        },
        f = function(e, t, n) {
            if ("[object Object]" === Object.prototype.toString.call(e))
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e);
            else
                for (var r = 0, a = e.length; r < a; r++) t.call(n, e[r], r, e)
        },
        d = function() {
            var e = {},
                t = !1,
                n = 0,
                o = arguments.length;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], n++);
            for (var r = function(n) {
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t && "[object Object]" === Object.prototype.toString.call(n[o]) ? e[o] = d(!0, e[o], n[o]) : e[o] = n[o])
                }; n < o; n++) {
                var a = arguments[n];
                r(a)
            }
            return e
        },
        v = function(e) {
            return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
        },
        m = function() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
        },
        g = function(e) {
            var n = 0;
            if (e.offsetParent) {
                do n += e.offsetTop, e = e.offsetParent; while (e)
            } else n = e.offsetTop;
            return n = n - a - t.offset, n >= 0 ? n : 0
        },
        h = function(e) {
            var t = e.getBoundingClientRect();
            return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
        },
        p = function() {
            s.sort((function(e, t) {
                return e.distance > t.distance ? -1 : e.distance < t.distance ? 1 : 0
            }))
        };
    i.setDistances = function() {
        o = m(), a = r ? v(r) + g(r) : 0, f(s, (function(e) {
            e.distance = g(e.target)
        })), p()
    };
    var b = function() {
            var e = document.querySelectorAll(t.selector);
            f(e, (function(e) {
                if (e.hash) {
                    var t = document.querySelector(e.hash);
                    t && s.push({
                        nav: e,
                        target: t,
                        parent: "li" === e.parentNode.tagName.toLowerCase() ? e.parentNode : null,
                        distance: 0
                    })
                }
            }))
        },
        y = function() {
            c && (c.nav.classList.remove(t.activeClass), c.parent && c.parent.classList.remove(t.activeClass))
        },
        H = function(e) {
            y(), e.nav.classList.add(t.activeClass), e.parent && e.parent.classList.add(t.activeClass), t.callback(e), c = {
                nav: e.nav,
                parent: e.parent
            }
        };
    i.getCurrentNav = function() {
        var n = e.pageYOffset;
        if (e.innerHeight + n >= o && h(s[0].target)) return H(s[0]), s[0];
        for (var r = 0, a = s.length; r < a; r++) {
            var c = s[r];
            if (c.distance <= n) return H(c), c
        }
        y(), t.callback()
    };
    var C = function() {
        f(s, (function(e) {
            e.nav.classList.contains(t.activeClass) && (c = {
                nav: e.nav,
                parent: e.parent
            })
        }))
    };
    i.destroy = function() {
        t && (t.container.removeEventListener("resize", L, !1), t.container.removeEventListener("scroll", L, !1), s = [], t = null, n = null, o = null, r = null, a = null, c = null)
    };
    var L = function(e) {
        n || (n = setTimeout((function() {
            n = null, "scroll" === e.type && i.getCurrentNav(), "resize" === e.type && (i.setDistances(), i.getCurrentNav())
        }), 66))
    };
    return i.init = function(e) {
        l && (i.destroy(), t = d(u, e || {}), r = document.querySelector(t.selectorHeader), b(), 0 !== s.length && (C(), i.setDistances(), i.getCurrentNav(), t.container.addEventListener("resize", L, !1), t.container.addEventListener("scroll", L, !1)))
    }, i
}));




    
(function(u, r) {
    "function" === typeof define && define.amd ? define([], r) : "object" === typeof module && module.exports ? module.exports = r() : u.anime = r()
})(this, function() {
    var u = {
            duration: 1E3,
            delay: 0,
            loop: !1,
            autoplay: !0,
            direction: "normal",
            easing: "easeOutElastic",
            elasticity: 400,
            round: !1,
            begin: void 0,
            update: void 0,
            complete: void 0
        },
        r = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
        y, f = {
            arr: function(a) {
                return Array.isArray(a)
            },
            obj: function(a) {
                return -1 <
                    Object.prototype.toString.call(a).indexOf("Object")
            },
            svg: function(a) {
                return a instanceof SVGElement
            },
            dom: function(a) {
                return a.nodeType || f.svg(a)
            },
            num: function(a) {
                return !isNaN(parseInt(a))
            },
            str: function(a) {
                return "string" === typeof a
            },
            fnc: function(a) {
                return "function" === typeof a
            },
            und: function(a) {
                return "undefined" === typeof a
            },
            nul: function(a) {
                return "null" === typeof a
            },
            hex: function(a) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
            },
            rgb: function(a) {
                return /^rgb/.test(a)
            },
            hsl: function(a) {
                return /^hsl/.test(a)
            },
            col: function(a) {
                return f.hex(a) || f.rgb(a) || f.hsl(a)
            }
        },
        D = function() {
            var a = {},
                b = {
                    Sine: function(a) {
                        return 1 - Math.cos(a * Math.PI / 2)
                    },
                    Circ: function(a) {
                        return 1 - Math.sqrt(1 - a * a)
                    },
                    Elastic: function(a, b) {
                        if (0 === a || 1 === a) return a;
                        var d = 1 - Math.min(b, 998) / 1E3,
                            g = a / 1 - 1;
                        return -(Math.pow(2, 10 * g) * Math.sin(2 * (g - d / (2 * Math.PI) * Math.asin(1)) * Math.PI / d))
                    },
                    Back: function(a) {
                        return a * a * (3 * a - 2)
                    },
                    Bounce: function(a) {
                        for (var b, d = 4; a < ((b = Math.pow(2, --d)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - d) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
                    }
                };
            ["Quad",
                "Cubic", "Quart", "Quint", "Expo"
            ].forEach(function(a, e) {
                b[a] = function(a) {
                    return Math.pow(a, e + 2)
                }
            });
            Object.keys(b).forEach(function(c) {
                var e = b[c];
                a["easeIn" + c] = e;
                a["easeOut" + c] = function(a, b) {
                    return 1 - e(1 - a, b)
                };
                a["easeInOut" + c] = function(a, b) {
                    return .5 > a ? e(2 * a, b) / 2 : 1 - e(-2 * a + 2, b) / 2
                };
                a["easeOutIn" + c] = function(a, b) {
                    return .5 > a ? (1 - e(1 - 2 * a, b)) / 2 : (e(2 * a - 1, b) + 1) / 2
                }
            });
            a.linear = function(a) {
                return a
            };
            return a
        }(),
        z = function(a) {
            return f.str(a) ? a : a + ""
        },
        E = function(a) {
            return a.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        },
        F = function(a) {
            if (f.col(a)) return !1;
            try {
                return document.querySelectorAll(a)
            } catch (b) {
                return !1
            }
        },
        A = function(a) {
            return a.reduce(function(a, c) {
                return a.concat(f.arr(c) ? A(c) : c)
            }, [])
        },
        t = function(a) {
            if (f.arr(a)) return a;
            f.str(a) && (a = F(a) || a);
            return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a]
        },
        G = function(a, b) {
            return a.some(function(a) {
                return a === b
            })
        },
        R = function(a, b) {
            var c = {};
            a.forEach(function(a) {
                var d = JSON.stringify(b.map(function(b) {
                    return a[b]
                }));
                c[d] = c[d] || [];
                c[d].push(a)
            });
            return Object.keys(c).map(function(a) {
                return c[a]
            })
        },
        H = function(a) {
            return a.filter(function(a, c, e) {
                return e.indexOf(a) === c
            })
        },
        B = function(a) {
            var b = {},
                c;
            for (c in a) b[c] = a[c];
            return b
        },
        v = function(a, b) {
            for (var c in b) a[c] = f.und(a[c]) ? b[c] : a[c];
            return a
        },
        S = function(a) {
            a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(a, b, c, m) {
                return b + b + c + c + m + m
            });
            var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            a = parseInt(b[1], 16);
            var c = parseInt(b[2], 16),
                b = parseInt(b[3], 16);
            return "rgb(" + a + "," + c + "," + b + ")"
        },
        T = function(a) {
            a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);
            var b = parseInt(a[1]) / 360,
                c = parseInt(a[2]) / 100,
                e = parseInt(a[3]) / 100;
            a = function(a, b, c) {
                0 > c && (c += 1);
                1 < c && --c;
                return c < 1 / 6 ? a + 6 * (b - a) * c : .5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
            };
            if (0 == c) c = e = b = e;
            else var d = .5 > e ? e * (1 + c) : e + c - e * c,
                g = 2 * e - d,
                c = a(g, d, b + 1 / 3),
                e = a(g, d, b),
                b = a(g, d, b - 1 / 3);
            return "rgb(" + 255 * c + "," + 255 * e + "," + 255 * b + ")"
        },
        p = function(a) {
            return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(a)[2]
        },
        I = function(a, b, c) {
            return p(b) ?
                b : -1 < a.indexOf("translate") ? p(c) ? b + p(c) : b + "px" : -1 < a.indexOf("rotate") || -1 < a.indexOf("skew") ? b + "deg" : b
        },
        w = function(a, b) {
            if (b in a.style) return getComputedStyle(a).getPropertyValue(E(b)) || "0"
        },
        U = function(a, b) {
            var c = -1 < b.indexOf("scale") ? 1 : 0,
                e = a.style.transform;
            if (!e) return c;
            for (var d = /(\w+)\((.+?)\)/g, g = [], m = [], f = []; g = d.exec(e);) m.push(g[1]), f.push(g[2]);
            e = f.filter(function(a, c) {
                return m[c] === b
            });
            return e.length ? e[0] : c
        },
        J = function(a, b) {
            if (f.dom(a) && G(r, b)) return "transform";
            if (f.dom(a) && (a.getAttribute(b) ||
                    f.svg(a) && a[b])) return "attribute";
            if (f.dom(a) && "transform" !== b && w(a, b)) return "css";
            if (!f.nul(a[b]) && !f.und(a[b])) return "object"
        },
        K = function(a, b) {
            switch (J(a, b)) {
                case "transform":
                    return U(a, b);
                case "css":
                    return w(a, b);
                case "attribute":
                    return a.getAttribute(b)
            }
            return a[b] || 0
        },
        L = function(a, b, c) {
            if (f.col(b)) return b = f.rgb(b) ? b : f.hex(b) ? S(b) : f.hsl(b) ? T(b) : void 0, b;
            if (p(b)) return b;
            a = p(a.to) ? p(a.to) : p(a.from);
            !a && c && (a = p(c));
            return a ? b + a : b
        },
        M = function(a) {
            var b = /-?\d*\.?\d+/g;
            return {
                original: a,
                numbers: z(a).match(b) ?
                    z(a).match(b).map(Number) : [0],
                strings: z(a).split(b)
            }
        },
        V = function(a, b, c) {
            return b.reduce(function(b, d, g) {
                d = d ? d : c[g - 1];
                return b + a[g - 1] + d
            })
        },
        W = function(a) {
            a = a ? A(f.arr(a) ? a.map(t) : t(a)) : [];
            return a.map(function(a, c) {
                return {
                    target: a,
                    id: c
                }
            })
        },
        N = function(a, b, c, e) {
            "transform" === c ? (c = a + "(" + I(a, b.from, b.to) + ")", b = a + "(" + I(a, b.to) + ")") : (a = "css" === c ? w(e, a) : void 0, c = L(b, b.from, a), b = L(b, b.to, a));
            return {
                from: M(c),
                to: M(b)
            }
        },
        X = function(a, b) {
            var c = [];
            a.forEach(function(e, d) {
                var g = e.target;
                return b.forEach(function(b) {
                    var l =
                        J(g, b.name);
                    if (l) {
                        var q;
                        q = b.name;
                        var h = b.value,
                            h = t(f.fnc(h) ? h(g, d) : h);
                        q = {
                            from: 1 < h.length ? h[0] : K(g, q),
                            to: 1 < h.length ? h[1] : h[0]
                        };
                        h = B(b);
                        h.animatables = e;
                        h.type = l;
                        h.from = N(b.name, q, h.type, g).from;
                        h.to = N(b.name, q, h.type, g).to;
                        h.round = f.col(q.from) || h.round ? 1 : 0;
                        h.delay = (f.fnc(h.delay) ? h.delay(g, d, a.length) : h.delay) / k.speed;
                        h.duration = (f.fnc(h.duration) ? h.duration(g, d, a.length) : h.duration) / k.speed;
                        c.push(h)
                    }
                })
            });
            return c
        },
        Y = function(a, b) {
            var c = X(a, b);
            return R(c, ["name", "from", "to", "delay", "duration"]).map(function(a) {
                var b =
                    B(a[0]);
                b.animatables = a.map(function(a) {
                    return a.animatables
                });
                b.totalDuration = b.delay + b.duration;
                return b
            })
        },
        C = function(a, b) {
            a.tweens.forEach(function(c) {
                var e = c.from,
                    d = a.duration - (c.delay + c.duration);
                c.from = c.to;
                c.to = e;
                b && (c.delay = d)
            });
            a.reversed = a.reversed ? !1 : !0
        },
        Z = function(a) {
            if (a.length) return Math.max.apply(Math, a.map(function(a) {
                return a.totalDuration
            }))
        },
        O = function(a) {
            var b = [],
                c = [];
            a.tweens.forEach(function(a) {
                if ("css" === a.type || "transform" === a.type) b.push("css" === a.type ? E(a.name) : "transform"),
                    a.animatables.forEach(function(a) {
                        c.push(a.target)
                    })
            });
            return {
                properties: H(b).join(", "),
                elements: H(c)
            }
        },
        aa = function(a) {
            var b = O(a);
            b.elements.forEach(function(a) {
                a.style.willChange = b.properties
            })
        },
        ba = function(a) {
            O(a).elements.forEach(function(a) {
                a.style.removeProperty("will-change")
            })
        },
        ca = function(a, b) {
            var c = a.path,
                e = a.value * b,
                d = function(d) {
                    d = d || 0;
                    return c.getPointAtLength(1 < b ? a.value + d : e + d)
                },
                g = d(),
                f = d(-1),
                d = d(1);
            switch (a.name) {
                case "translateX":
                    return g.x;
                case "translateY":
                    return g.y;
                case "rotate":
                    return 180 *
                        Math.atan2(d.y - f.y, d.x - f.x) / Math.PI
            }
        },
        da = function(a, b) {
            var c = Math.min(Math.max(b - a.delay, 0), a.duration) / a.duration,
                e = a.to.numbers.map(function(b, e) {
                    var f = a.from.numbers[e],
                        l = D[a.easing](c, a.elasticity),
                        f = a.path ? ca(a, l) : f + l * (b - f);
                    return f = a.round ? Math.round(f * a.round) / a.round : f
                });
            return V(e, a.to.strings, a.from.strings)
        },
        P = function(a, b) {
            var c;
            a.currentTime = b;
            a.progress = b / a.duration * 100;
            for (var e = 0; e < a.tweens.length; e++) {
                var d = a.tweens[e];
                d.currentValue = da(d, b);
                for (var f = d.currentValue, m = 0; m < d.animatables.length; m++) {
                    var l =
                        d.animatables[m],
                        k = l.id,
                        l = l.target,
                        h = d.name;
                    switch (d.type) {
                        case "css":
                            l.style[h] = f;
                            break;
                        case "attribute":
                            l.setAttribute(h, f);
                            break;
                        case "object":
                            l[h] = f;
                            break;
                        case "transform":
                            c || (c = {}), c[k] || (c[k] = []), c[k].push(f)
                    }
                }
            }
            if (c)
                for (e in y || (y = (w(document.body, "transform") ? "" : "-webkit-") + "transform"), c) a.animatables[e].target.style[y] = c[e].join(" ");
            a.settings.update && a.settings.update(a)
        },
        Q = function(a) {
            var b = {};
            b.animatables = W(a.targets);
            b.settings = v(a, u);
            var c = b.settings,
                e = [],
                d;
            for (d in a)
                if (!u.hasOwnProperty(d) &&
                    "targets" !== d) {
                    var g = f.obj(a[d]) ? B(a[d]) : {
                        value: a[d]
                    };
                    g.name = d;
                    e.push(v(g, c))
                }
            b.properties = e;
            b.tweens = Y(b.animatables, b.properties);
            b.duration = Z(b.tweens) || a.duration;
            b.currentTime = 0;
            b.progress = 0;
            b.ended = !1;
            return b
        },
        n = [],
        x = 0,
        ea = function() {
            var a = function() {
                    x = requestAnimationFrame(b)
                },
                b = function(b) {
                    if (n.length) {
                        for (var e = 0; e < n.length; e++) n[e].tick(b);
                        a()
                    } else cancelAnimationFrame(x), x = 0
                };
            return a
        }(),
        k = function(a) {
            var b = Q(a),
                c = {};
            b.tick = function(a) {
                b.ended = !1;
                c.start || (c.start = a);
                c.current = Math.min(Math.max(c.last +
                    a - c.start, 0), b.duration);
                P(b, c.current);
                var d = b.settings;
                d.begin && c.current >= d.delay && (d.begin(b), d.begin = void 0);
                c.current >= b.duration && (d.loop ? (c.start = a, "alternate" === d.direction && C(b, !0), f.num(d.loop) && d.loop--) : (b.ended = !0, b.pause(), d.complete && d.complete(b)), c.last = 0)
            };
            b.seek = function(a) {
                P(b, a / 100 * b.duration)
            };
            b.pause = function() {
                ba(b);
                var a = n.indexOf(b); - 1 < a && n.splice(a, 1)
            };
            b.play = function(a) {
                b.pause();
                a && (b = v(Q(v(a, b.settings)), b));
                c.start = 0;
                c.last = b.ended ? 0 : b.currentTime;
                a = b.settings;
                "reverse" ===
                a.direction && C(b);
                "alternate" !== a.direction || a.loop || (a.loop = 1);
                aa(b);
                n.push(b);
                x || ea()
            };
            b.restart = function() {
                b.reversed && C(b);
                b.pause();
                b.seek(0);
                b.play()
            };
            b.settings.autoplay && b.play();
            return b
        };
    k.version = "1.1.1";
    k.speed = 1;
    k.list = n;
    k.remove = function(a) {
        a = A(f.arr(a) ? a.map(t) : t(a));
        for (var b = n.length - 1; 0 <= b; b--)
            for (var c = n[b], e = c.tweens, d = e.length - 1; 0 <= d; d--)
                for (var g = e[d].animatables, k = g.length - 1; 0 <= k; k--) G(a, g[k].target) && (g.splice(k, 1), g.length || e.splice(d, 1), e.length || c.pause())
    };
    k.easings = D;
    k.getValue = K;
    k.path = function(a) {
        a = f.str(a) ? F(a)[0] : a;
        return {
            path: a,
            value: a.getTotalLength()
        }
    };
    k.random = function(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a
    };
    return k
});




(function () {

    // Init variables
    var navOpen = false;
    var pageNav = document.querySelector('.page-nav');
    var navEl = document.querySelector('.page-nav nav');
    var navLinks = document.querySelectorAll('.page-nav nav a');
    var arrowLeft = document.querySelector('.nav-arrow-left');
    var arrowRight = document.querySelector('.nav-arrow-right');
    var navHeight = 40;
    var activeIndex, activeDistance, activeItem, navAnimation, navItemsAnimation;

    // Helper function to get the index of `item`
    function getIndex(item) {
        return Array.prototype.indexOf.call(item.parentNode.children, item);
    }

    // This translate the nav element to show the selected item
    function translateNav(item) {
        // If animation is defined, pause it
        if (navItemsAnimation) navItemsAnimation.pause();
        // Animate the `translateY` of `nav` to show only the current link
        navItemsAnimation = anime({
            targets: navEl,
            translateY: (item ? -activeIndex * navHeight : 0) + 'px',
            easing: 'easeOutCubic',
            duration: 500
        });
        // Update link on arrows, and disable/enable accordingly if first or last link
        updateArrows();
    }

    // Update link on arrows, and disable/enable accordingly if first or last link
    function updateArrows() {
        if (activeIndex === 0) {
            arrowLeft.classList.add('nav-arrow-disabled');
            arrowLeft.removeAttribute('href');
            arrowLeft.removeAttribute('data-scroll');
        } else {
            arrowLeft.classList.remove('nav-arrow-disabled');
            arrowLeft.setAttribute('href', navLinks[activeIndex - 1].href);
            arrowLeft.setAttribute('data-scroll', "");
        }

        if (activeIndex === navLinks.length - 1) {
            arrowRight.classList.add('nav-arrow-disabled');
            arrowRight.removeAttribute('href');
            arrowRight.removeAttribute('data-scroll');
        } else {
            arrowRight.classList.remove('nav-arrow-disabled');
            arrowRight.setAttribute('href', navLinks[activeIndex + 1].href);
            arrowRight.setAttribute('data-scroll', "");
        }
    }

    // Open the nav, showing all the links
    function openNav() {
        // Updating states
        navOpen = !navOpen;
        pageNav.classList.add('nav-open');
        // Moving the nav just like first link is active
        translateNav();
        // Animate the `height` of the nav, letting see all the links
        navAnimation = anime({
            targets: pageNav,
            height: navLinks.length * navHeight + 'px',
            easing: 'easeOutCubic',
            duration: 500
        });
    }

    // Close the nav, also showing the selected link
    function closeNav() {
        // Updating states
        navOpen = !navOpen;
        pageNav.classList.remove('nav-open');
        // Moving the nav showing only the active link
        translateNav(activeItem);
        // Animate the `height` of the nav, letting see just the active link
        navAnimation = anime({
            targets: pageNav,
            height: navHeight + 'px',
            easing: 'easeOutCubic',
            duration: 500
        });
    }

    // Init click events for each nav link
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function (e) {
            if (navOpen) {
                // Just close the `nav`
                closeNav();
            } else {
                // Prevent scrolling to the active link and instead open the `nav`
                e.preventDefault();
                e.stopPropagation();
                openNav();
            }
        });
    }

    // Detect click outside, and close the `nav`
    document.addEventListener('click', function (e) {
        if (navOpen) {
            var isClickInside = pageNav.contains(e.target);
            if (!isClickInside) {
                closeNav();
            }
        }
    });

    // Init Smooth Scroll
    smoothScroll.init({
        // This `offset` is the `height` of fixed header
        offset: -80
    });

    // Init Gumshoe
    gumshoe.init({
        // The callback is triggered after setting the active link, to show it as active in the `nav`
        callback: function (nav) {
            // Check if active link has changed
            if (activeDistance !== nav.distance) 
            {
                // Update states
                activeDistance = nav.distance;
                activeItem = nav.nav;
                activeIndex = getIndex(activeItem);
                const progressBar = document.getElementsByClassName('progress-bar')[0]
                const computedStyle = getComputedStyle(progressBar)
                const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
                progressBar.style.setProperty('--width', activeIndex * 16.2)
                // Translate `nav` to show the active link, or close it
                if (navOpen) {
                    closeNav();
                } else {
                    translateNav(activeItem);
                }       

            }
        }
    });

})();
