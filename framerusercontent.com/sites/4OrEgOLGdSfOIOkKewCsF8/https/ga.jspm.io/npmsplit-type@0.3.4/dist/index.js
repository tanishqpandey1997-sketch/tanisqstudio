(function() {
    function append() {
        var e = arguments.length;
        for (var t = 0; t < e; t++) {
            var r = t < 0 || arguments.length <= t ? void 0 : arguments[t];
            1 === r.nodeType || 11 === r.nodeType ? this.appendChild(r) : this.appendChild(document.createTextNode(String(r)))
        }
    }

    function replaceChildren() {
        while (this.lastChild) this.removeChild(this.lastChild);
        arguments.length && this.append.apply(this, arguments)
    }

    function replaceWith() {
        var e = this.parentNode;
        for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
        var a = r.length;
        if (e) {
            a || e.removeChild(this);
            while (a--) {
                var i = r[a];
                "object" !== typeof i ? i = this.ownerDocument.createTextNode(i) : i.parentNode && i.parentNode.removeChild(i);
                a ? e.insertBefore(this.previousSibling, i) : e.replaceChild(i, this)
            }
        }
    }
    if ("undefined" !== typeof Element) {
        if (!Element.prototype.append) {
            Element.prototype.append = append;
            DocumentFragment.prototype.append = append
        }
        if (!Element.prototype.replaceChildren) {
            Element.prototype.replaceChildren = replaceChildren;
            DocumentFragment.prototype.replaceChildren = replaceChildren
        }
        if (!Element.prototype.replaceWith) {
            Element.prototype.replaceWith = replaceWith;
            DocumentFragment.prototype.replaceWith = replaceWith
        }
    }
})();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, t) {
    for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || false;
        n.configurable = true;
        "value" in n && (n.writable = true);
        Object.defineProperty(e, n.key, n)
    }
}

function _createClass(e, t, r) {
    t && _defineProperties(e.prototype, t);
    r && _defineProperties(e, r);
    return e
}

function _defineProperty(e, t, r) {
    t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: true,
        configurable: true,
        writable: true
    }) : e[t] = r;
    return e
}

function ownKeys(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })));
        r.push.apply(r, n)
    }
    return r
}

function _objectSpread2(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ownKeys(Object(r), true).forEach((function(t) {
            _defineProperty(e, t, r[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
        }))
    }
    return e
}

function _slicedToArray(e, t) {
    return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest()
}

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) return _arrayLikeToArray(e)
}

function _arrayWithHoles(e) {
    if (Array.isArray(e)) return e
}

function _iterableToArray(e) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
}

function _iterableToArrayLimit(e, t) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) {
        var r = [];
        var n = true;
        var a = false;
        var i = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done); n = true) {
                r.push(o.value);
                if (t && r.length === t) break
            }
        } catch (e) {
            a = true;
            i = e
        } finally {
            try {
                n || null == s.return || s.return()
            } finally {
                if (a) throw i
            }
        }
        return r
    }
}

function _unsupportedIterableToArray(e, t) {
    if (e) {
        if ("string" === typeof e) return _arrayLikeToArray(e, t);
        var r = Object.prototype.toString.call(e).slice(8, -1);
        "Object" === r && e.constructor && (r = e.constructor.name);
        return "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e, t) : void 0
    }
}

function _arrayLikeToArray(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}
/**
 * Shallow merges the properties of an object with the target object. Only
 * includes properties that exist on the target object. Non-writable properties
 * on the target object will not be over-written.
 *
 * @param {Object} target
 * @param {Object} object
 */
function extend(e, t) {
    return Object.getOwnPropertyNames(Object(e)).reduce((function(r, n) {
        var a = Object.getOwnPropertyDescriptor(Object(e), n);
        var i = Object.getOwnPropertyDescriptor(Object(t), n);
        return Object.defineProperty(r, n, i || a)
    }), {})
}
/**
 * Checks if given value is a string
 *
 * @param {any} value
 * @return {boolean} `true` if `value` is a string, else `false`
 */
function isString(e) {
    return "string" === typeof e
}

function isArray(e) {
    return Array.isArray(e)
}

function parseSettings() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    var t = extend(e);
    var r;
    void 0 !== t.types ? r = t.types : void 0 !== t.split && (r = t.split);
    void 0 !== r && (t.types = (isString(r) || isArray(r) ? String(r) : "").split(",").map((function(e) {
        return String(e).trim()
    })).filter((function(e) {
        return /((line)|(word)|(char))/i.test(e)
    })));
    (t.absolute || t.position) && (t.absolute = t.absolute || /absolute/.test(e.position));
    return t
}
/**
 * Takes a list of `types` and returns an object
 *
 * @param {string | string[]} value a comma separated list of split types
 * @return {{lines: boolean, words: boolean, chars: boolean}}
 */
function parseTypes(e) {
    var t = isString(e) || isArray(e) ? String(e) : "";
    return {
        none: !t,
        lines: /line/i.test(t),
        words: /word/i.test(t),
        chars: /char/i.test(t)
    }
}
/**
 * Returns true if `value` is a non-null object.
 * @param {any} value
 * @return {boolean}
 */
function isObject(e) {
    return null !== e && "object" === typeof e
}

function isNode(e) {
    return isObject(e) && /^(1|3|11)$/.test(e.nodeType)
}
/**
 * Checks if `value` is a valid array-like length.
 * Original source: Lodash
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3)
 * // => true
 *
 * _.isLength(Number.MIN_VALUE)
 * // => false
 *
 * _.isLength(Infinity)
 * // => false
 *
 * _.isLength('3')
 * // => false
 */
function isLength(e) {
    return "number" === typeof e && e > -1 && e % 1 === 0
}
/**
 * Checks if `value` is an array-like object
 * @param {any} value
 * @return {boolean} true if `value` is array-like`, else `false`
 * @example
 * isArrayLike(new Array())
 * // => true
 *
 * isArrayLike(document.querySelectorAll('div'))
 * // => true
 *
 * isArrayLike(document.getElementsByTagName('div'))
 * // => true
 *
 * isArrayLike(() => {})
 * // => false
 *
 * isArrayLike({foo: 'bar'})
 * // => false
 *
 * * isArrayLike(null)
 * // => false
 */
function isArrayLike(e) {
    return isObject(e) && isLength(e.length)
}
/**
 * Coerces `value` to an `Array`.
 *
 * @param {any} value
 * @return {any[]}
 * @example
 * // If `value` is any `Array`, returns original `Array`
 * let arr = [1, 2]
 * toArray(arr)
 * // => arr
 *
 * // If `value` is an `ArrayLike`, its equivalent to `Array.from(value)`
 * let nodeList = document.querySelectorAll('div')
 * toArray(nodeList)
 * // => HTMLElement[] s
 *
 * // If value is falsy, returns empty array
 * toArray(null)
 * // => []
 *
 * // For any other type of value, its equivalent to `Array.of(value)`
 * let element = document.createElement('div')
 * toArray(element)
 * // => [element]
 *
 */
function toArray(e) {
    return isArray(e) ? e : null == e ? [] : isArrayLike(e) ? Array.prototype.slice.call(e) : [e]
}
/**
 * Processes target elements for the splitType function.
 *
 * @param {any} target Can be one of the following:
 * 1. `string` - A css selector
 * 2. `HTMLElement` - A single element
 * 3. `NodeList` - A nodeList
 * 4. `Element[]` - An array of elements
 * 5. `Array<NodeList|Element[]>` - An nested array of elements
 * @returns {Element[]} A flat array HTML elements
 * @return A flat array of elements or empty array if no elements are found
 */
function getTargetElements(e) {
    var t = e;
    isString(e) && (t = /^(#[a-z]\w+)$/.test(e.trim()) ? document.getElementById(e.trim().slice(1)) : document.querySelectorAll(e));
    return toArray(t).reduce((function(e, t) {
        return [].concat(_toConsumableArray(e), _toConsumableArray(toArray(t).filter(isNode)))
    }), [])
}
var e = Object.entries;
var t = "_splittype";
var r = {};
var n = 0;
/**
 * Stores data associated with DOM elements or other objects. This is a
 * simplified version of jQuery's data method.
 *
 * @signature Data(owner)
 * @description Get the data store object for the given owner.
 * @param {Object} owner the object that data will be associated with.
 * @return {Object} the data object for given `owner`. If no data exists
 *     for the given object, creates a new data store and returns it.
 *
 * @signature Data(owner, key)
 * @description Get the value
 * @param {Object} owner
 * @param {string} key
 * @return {any} the value of the provided key. If key does not exist, returns
 *     undefined.
 *
 * @signature Data(owner, key, value)
 * @description Sets the given key/value pair in data store
 * @param {Object} owner
 * @param {string} key
 * @param {any} value
 */
function set(e, a, i) {
    if (!isObject(e)) {
        console.warn("[data.set] owner is not an object");
        return null
    }
    var o = e[t] || (e[t] = ++n);
    var s = r[o] || (r[o] = {});
    void 0 === i ? !a || Object.getPrototypeOf(a) !== Object.prototype || (r[o] = _objectSpread2(_objectSpread2({}, s), a)) : void 0 !== a && (s[a] = i);
    return i
}

function get(e, n) {
    var a = isObject(e) ? e[t] : null;
    var i = a && r[a] || {};
    return void 0 === n ? i : i[n]
}

function remove(e) {
    var n = e && e[t];
    if (n) {
        delete e[n];
        delete r[n]
    }
}

function clear() {
    Object.keys(r).forEach((function(e) {
        delete r[e]
    }))
}

function cleanup() {
    e(r).forEach((function(e) {
        var t = _slicedToArray(e, 2),
            n = t[0],
            a = t[1],
            i = a.isRoot,
            o = a.isSplit;
        if (!i || !o) {
            r[n] = null;
            delete r[n]
        }
    }))
}
/**
 * Splits a string into an array of words.
 *
 * @param {string} string
 * @param {string | RegExp} [separator = ' ']
 * @return {string[]} Array of words
 */
function toWords(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
    var r = e ? String(e) : "";
    return r.trim().replace(/\s+/g, " ").split(t)
}
var a = "\\ud800-\\udfff";
var i = "\\u0300-\\u036f\\ufe20-\\ufe23";
var o = "\\u20d0-\\u20f0";
var s = "\\ufe0e\\ufe0f";
var l = "[".concat(a, "]");
var c = "[".concat(i).concat(o, "]");
var u = "\\ud83c[\\udffb-\\udfff]";
var p = "(?:".concat(c, "|").concat(u, ")");
var f = "[^".concat(a, "]");
var d = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var h = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var y = "\\u200d";
var v = "".concat(p, "?");
var g = "[".concat(s, "]?");
var b = "(?:" + y + "(?:" + [f, d, h].join("|") + ")" + g + v + ")*";
var m = g + v + b;
var w = "(?:".concat(["".concat(f).concat(c, "?"), c, d, h, l].join("|"), "\n)");
var A = RegExp("".concat(u, "(?=").concat(u, ")|").concat(w).concat(m), "g");
var C = [y, a, i, o, s];
var S = RegExp("[".concat(C.join(""), "]"));
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(e) {
    return e.split("")
}
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(e) {
    return S.test(e)
}
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(e) {
    return e.match(A) || []
}
/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(e) {
    return hasUnicode(e) ? unicodeToArray(e) : asciiToArray(e)
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values.
 *
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(e) {
    return null == e ? "" : String(e)
}
/**
 * Splits `string` into an array of characters. If `separator` is omitted,
 * it behaves likes split.split('').
 *
 * Unlike native string.split(''), it can split strings that contain unicode
 * characters like emojis and symbols.
 *
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} [separator=''] The separator pattern to split by.
 * @returns {Array} Returns the string segments.
 * @example
 * toChars('foo');
 * // => ['f', 'o', 'o']
 *
 * toChars('foo bar');
 * // => ["f", "o", "o", " ", "b", "a", "r"]
 *
 * toChars('f😀o');
 * // => ['f', '😀', 'o']
 *
 * toChars('f-😀-o', /-/);
 * // => ['f', '😀', 'o']
 *
 */
function toChars(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    e = toString(e);
    return e && isString(e) && !t && hasUnicode(e) ? stringToArray(e) : e.split(t)
}
/**
 * Create an HTML element with the the given attributes
 *
 * attributes can include standard HTML attribute, as well as the following
 * "special" properties:
 *   - children: HTMLElement | ArrayLike<HTMLElement>
 *   - textContent: string
 *   - innerHTML: string
 *
 * @param {string} name
 * @param  {Object} [attributes]
 * @returns {HTMLElement}
 */
function createElement(e, t) {
    var r = document.createElement(e);
    if (!t) return r;
    Object.keys(t).forEach((function(e) {
        var n = t[e];
        var a = isString(n) ? n.trim() : n;
        null !== a && "" !== a && ("children" === e ? r.append.apply(r, _toConsumableArray(toArray(a))) : r.setAttribute(e, a))
    }));
    return r
}
var _ = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: false,
    tagName: "div"
};
/**
 * Splits the text content of a single TextNode into words and/or characters.
 *
 * This functions gets called for every text node inside the target element. It
 * replaces the text node with a document fragment containing the split text.
 * Returns an array of the split word and character elements from this node.
 *
 * @param {TextNode} textNode
 * @param {Object} settings
 * @return {{words: Element[], chars: Element[]}}
 */
function splitWordsAndChars(e, t) {
    t = extend(_, t);
    var r = parseTypes(t.types);
    var n = t.tagName;
    var a = e.nodeValue;
    var i = document.createDocumentFragment();
    var o = [];
    var s = [];
    /^\s/.test(a) && i.append(" ");
    o = toWords(a).reduce((function(e, a, o, l) {
        var c;
        var u;
        r.chars && (u = toChars(a).map((function(e) {
            var r = createElement(n, {
                class: "".concat(t.splitClass, " ").concat(t.charClass),
                style: "display: inline-block;",
                children: e
            });
            set(r, "isChar", true);
            s = [].concat(_toConsumableArray(s), [r]);
            return r
        })));
        if (r.words || r.lines) {
            c = createElement(n, {
                class: "".concat(t.wordClass, " ").concat(t.splitClass),
                style: "display: inline-block; ".concat(r.words && t.absolute ? "position: relative;" : ""),
                children: r.chars ? u : a
            });
            set(c, {
                isWord: true,
                isWordStart: true,
                isWordEnd: true
            });
            i.appendChild(c)
        } else u.forEach((function(e) {
            i.appendChild(e)
        }));
        o < l.length - 1 && i.append(" ");
        return r.words ? e.concat(c) : e
    }), []);
    /\s$/.test(a) && i.append(" ");
    e.replaceWith(i);
    return {
        words: o,
        chars: s
    }
}
/**
 * Splits the text content of a target element into words and/or characters.
 * The function is recursive, it will also split the text content of any child
 * elements into words/characters, while preserving the nested elements.
 *
 * @param {Node} node an HTML Element or Text Node
 * @param {Object} setting splitType settings
 */
function split(e, t) {
    var r = e.nodeType;
    var n = {
        words: [],
        chars: []
    };
    if (!/(1|3|11)/.test(r)) return n;
    if (3 === r && /\S/.test(e.nodeValue)) return splitWordsAndChars(e, t);
    var a = toArray(e.childNodes);
    if (a.length) {
        set(e, "isSplit", true);
        if (!get(e).isRoot) {
            e.style.display = "inline-block";
            e.style.position = "relative";
            var i = e.nextSibling;
            var o = e.previousSibling;
            var s = e.textContent || "";
            var l = i ? i.textContent : " ";
            var c = o ? o.textContent : " ";
            set(e, {
                isWordEnd: /\s$/.test(s) || /^\s/.test(l),
                isWordStart: /^\s/.test(s) || /\s$/.test(c)
            })
        }
    }
    return a.reduce((function(e, r) {
        var n = split(r, t),
            a = n.words,
            i = n.chars;
        return {
            words: [].concat(_toConsumableArray(e.words), _toConsumableArray(a)),
            chars: [].concat(_toConsumableArray(e.chars), _toConsumableArray(i))
        }
    }), n)
}

function getPosition(e, t, r, n) {
    if (!r.absolute) return {
        top: t ? e.offsetTop : null
    };
    var a = e.offsetParent;
    var i = _slicedToArray(n, 2),
        o = i[0],
        s = i[1];
    var l = 0;
    var c = 0;
    if (a && a !== document.body) {
        var u = a.getBoundingClientRect();
        l = u.x + o;
        c = u.y + s
    }
    var p = e.getBoundingClientRect(),
        f = p.width,
        d = p.height,
        h = p.x,
        y = p.y;
    var v = y + s - c;
    var g = h + o - l;
    return {
        width: f,
        height: d,
        top: v,
        left: g
    }
}
/**
 * Recursively "un-splits" text into words.
 * This is used when splitting text into lines but not words.
 * We initially split the text into words so we can maintain the correct line
 * breaks. Once text has been split into lines, we "un-split" the words...
 * @param {Element}
 * @return {void}
 */
function unSplitWords(e) {
    if (get(e).isWord) {
        remove(e);
        e.replaceWith.apply(e, _toConsumableArray(e.childNodes))
    } else toArray(e.children).forEach((function(e) {
        return unSplitWords(e)
    }))
}
var T = function createFragment() {
    return document.createDocumentFragment()
};

function repositionAfterSplit(e, t, r) {
    var n = parseTypes(t.types);
    var a = t.tagName;
    var i = e.getElementsByTagName("*");
    var o = [];
    var s = [];
    var l = null;
    var c;
    var u;
    var p;
    var f = [];
    var d = e.parentElement;
    var h = e.nextElementSibling;
    var y = T();
    var v = window.getComputedStyle(e);
    var g = v.textAlign;
    var b = parseFloat(v.fontSize);
    var m = .2 * b;
    if (t.absolute) {
        p = {
            left: e.offsetLeft,
            top: e.offsetTop,
            width: e.offsetWidth
        };
        u = e.offsetWidth;
        c = e.offsetHeight;
        set(e, {
            cssWidth: e.style.width,
            cssHeight: e.style.height
        })
    }
    toArray(i).forEach((function(a) {
        var i = a.parentElement === e;
        var c = getPosition(a, i, t, r),
            u = c.width,
            p = c.height,
            f = c.top,
            d = c.left;
        if (!/^br$/i.test(a.nodeName)) {
            if (n.lines && i) {
                if (null === l || f - l >= m) {
                    l = f;
                    o.push(s = [])
                }
                s.push(a)
            }
            t.absolute && set(a, {
                top: f,
                left: d,
                width: u,
                height: p
            })
        }
    }));
    d && d.removeChild(e);
    if (n.lines) {
        f = o.map((function(e) {
            var r = createElement(a, {
                class: "".concat(t.splitClass, " ").concat(t.lineClass),
                style: "display: block; text-align: ".concat(g, "; width: 100%;")
            });
            set(r, "isLine", true);
            var n = {
                height: 0,
                top: 1e4
            };
            y.appendChild(r);
            e.forEach((function(e, t, a) {
                var i = get(e),
                    o = i.isWordEnd,
                    s = i.top,
                    l = i.height;
                var c = a[t + 1];
                n.height = Math.max(n.height, l);
                n.top = Math.min(n.top, s);
                r.appendChild(e);
                o && get(c).isWordStart && r.append(" ")
            }));
            t.absolute && set(r, {
                height: n.height,
                top: n.top
            });
            return r
        }));
        n.words || unSplitWords(y);
        e.replaceChildren(y)
    }
    if (t.absolute) {
        e.style.width = "".concat(e.style.width || u, "px");
        e.style.height = "".concat(c, "px");
        toArray(i).forEach((function(e) {
            var t = get(e),
                r = t.isLine,
                n = t.top,
                a = t.left,
                i = t.width,
                o = t.height;
            var s = get(e.parentElement);
            var l = !r && s.isLine;
            e.style.top = "".concat(l ? n - s.top : n, "px");
            e.style.left = r ? "".concat(p.left, "px") : "".concat(a - (l ? p.left : 0), "px");
            e.style.height = "".concat(o, "px");
            e.style.width = r ? "".concat(p.width, "px") : "".concat(i, "px");
            e.style.position = "absolute"
        }))
    }
    d && (h ? d.insertBefore(e, h) : d.appendChild(e));
    return f
}
var O = extend(_, {});
var j = function() {
    _createClass(SplitType, null, [{
        key: "clearData",
        value: function clearData() {
            clear()
        }
    }, {
        key: "setDefaults",
        /**
         * Sets the default settings for all SplitType instances.
         * The provided object will be merged with the existing defaults objects.
         *
         * @param {Object} settings an object containing the settings to override
         * @returns {Object} the new default settings
         * @public
         * @static
         * @example
         * SplitType.setDefaults({ "position": "absolute" })
         */
        value: function setDefaults(e) {
            O = extend(O, parseSettings(e));
            return _
        }
        /**
         * Revert target elements to their original html content
         * Has no effect on that
         *
         * @param {any} elements The target elements to revert. One of:
         *  - {string} A css selector
         *  - {HTMLElement} A single element
         * -  {NodeList} A NodeList or collection
         *  - {HTMLElement[]} An array of Elements
         * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
         * @static
         */
    }, {
        key: "revert",
        value: function revert(e) {
            getTargetElements(e).forEach((function(e) {
                var t = get(e),
                    r = t.isSplit,
                    n = t.html,
                    a = t.cssWidth,
                    i = t.cssHeight;
                if (r) {
                    e.innerHTML = n;
                    e.style.width = a || "";
                    e.style.height = i || "";
                    remove(e)
                }
            }))
        }
        /**
         * Creates a new SplitType instance
         * This static method provides a way to create a `SplitType` instance without
         * using the `new` keyword.
         *
         * @param {any} target The target elements to split. One of:
         *  - {string} A css selector
         *  - {HTMLElement} A single element
         * -  {NodeList} A NodeList or collection
         *  - {HTMLElement[]} An array of Elements
         * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
         * @param {Object} [options] Settings for the SplitType instance
         * @return {SplitType} the SplitType instance
         * @static
         */
    }, {
        key: "create",
        value: function create(e, t) {
            return new SplitType(e, t)
        }
        /**
         * Creates a new `SplitType` instance
         *
         * @param {any} elements The target elements to split. One of:
         *  - {string} A css selector
         *  - {HTMLElement} A single element
         * -  {NodeList} A NodeList or collection
         *  - {HTMLElement[]} An array of Elements
         * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
         * @param {Object} [options] Settings for the SplitType instance
         */
    }, {
        key: "data",
        get: function get() {
            return r
        }
    }, {
        key: "defaults",
        get: function get() {
                return O
            }
            /**
             * Sets the default settings for all SplitType instances.
             *
             * Setting `SplitType.defaults` to an object will merge that object with the
             * existing defaults.
             *
             * @param {Object} settings an object containing the settings to override
             * @deprecated
             * @static
             * @example
             * SplitType.defaults = { "position": "absolute" }
             */
            ,
        set: function set(e) {
            O = extend(O, parseSettings(e))
        }
    }]);

    function SplitType(e, t) {
        _classCallCheck(this, SplitType);
        this.isSplit = false;
        this.settings = extend(O, parseSettings(t));
        this.elements = getTargetElements(e);
        this.split()
    }
    /**
     * Splits the text in all target elements. This method is called
     * automatically when a new SplitType instance is created. It can also be
     * called manually to re-split text with new options.
     * @param {Object} options
     * @public
     */
    _createClass(SplitType, [{
        key: "split",
        value: function split$1(e) {
            var t = this;
            this.revert();
            this.elements.forEach((function(e) {
                set(e, "html", e.innerHTML)
            }));
            this.lines = [];
            this.words = [];
            this.chars = [];
            var r = [window.pageXOffset, window.pageYOffset];
            void 0 !== e && (this.settings = extend(this.settings, parseSettings(e)));
            var n = parseTypes(this.settings.types);
            if (!n.none) {
                this.elements.forEach((function(e) {
                    set(e, "isRoot", true);
                    var r = split(e, t.settings),
                        n = r.words,
                        a = r.chars;
                    t.words = [].concat(_toConsumableArray(t.words), _toConsumableArray(n));
                    t.chars = [].concat(_toConsumableArray(t.chars), _toConsumableArray(a))
                }));
                this.elements.forEach((function(e) {
                    if (n.lines || t.settings.absolute) {
                        var a = repositionAfterSplit(e, t.settings, r);
                        t.lines = [].concat(_toConsumableArray(t.lines), _toConsumableArray(a))
                    }
                }));
                this.isSplit = true;
                window.scrollTo(r[0], r[1]);
                cleanup()
            }
        }
    }, {
        key: "revert",
        value: function revert() {
            if (this.isSplit) {
                this.lines = null;
                this.words = null;
                this.chars = null;
                this.isSplit = false
            }
            SplitType.revert(this.elements)
        }
    }]);
    return SplitType
}();
export {
    j as
    default
};

//# sourceMappingURL=index.js.map