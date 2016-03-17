/*ignore jslint start*/
// classie
(function(e) {
    "use strict";
    function t(e) {
        return new RegExp("(^|\\s+)" + e + "(\\s+|$)")
    }
    function s(e, t) {
        var s = n(e, t) ? i : r;
        s(e, t)
    }
    var n, r, i;
    if ("classList" in document.documentElement) {
        n = function(e, t) {
            return e.classList.contains(t)
        };
        r = function(e, t) {
            e.classList.add(t)
        };
        i = function(e, t) {
            e.classList.remove(t)
        }
    } else {
        n = function(e, n) {
            return t(n).test(e.className)
        };
        r = function(e, t) {
            if (!n(e, t)) {
                e.className = e.className + " " + t
            }
        };
        i = function(e, n) {
            e.className = e.className.replace(t(n), " ")
        }
    }
    var o = {
        hasClass: n,
        addClass: r,
        removeClass: i,
        toggleClass: s,
        has: n,
        add: r,
        remove: i,
        toggle: s
    };
    if (typeof define === "function" && define.amd) {
        define(o)
    } else {
        e.classie = o
    }
})(window);
//cssParser

function CSSScanner(e) {
    this.init(e)
}
function CSSParser(e) {
    this.mToken = null;
    this.mLookAhead = null;
    this.mScanner = new CSSScanner(e);
    this.mPreserveWS = true;
    this.mPreserveComments = true;
    this.mPreservedTokens = [];
    this.mError = null
}
function jscsspToken(e, t, n) {
    this.type = e;
    this.value = t;
    this.unit = n
}
function jscsspStylesheet() {
    this.cssRules = [];
    this.variables = {}
}
function jscsspCharsetRule() {
    this.type = kJscsspCHARSET_RULE;
    this.encoding = null;
    this.parsedCssText = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspErrorRule(e) {
    this.error = e ? e : "INVALID";
    this.type = kJscsspUNKNOWN_RULE;
    this.parsedCssText = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspComment() {
    this.type = kJscsspCOMMENT;
    this.parsedCssText = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspWhitespace() {
    this.type = kJscsspWHITE_SPACE;
    this.parsedCssText = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspImportRule() {
    this.type = kJscsspIMPORT_RULE;
    this.parsedCssText = null;
    this.href = null;
    this.media = [];
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspNamespaceRule() {
    this.type = kJscsspNAMESPACE_RULE;
    this.parsedCssText = null;
    this.prefix = null;
    this.url = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspDeclaration() {
    this.type = kJscsspSTYLE_DECLARATION;
    this.property = null;
    this.values = [];
    this.valueText = null;
    this.priority = null;
    this.parsedCssText = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspFontFaceRule() {
    this.type = kJscsspFONT_FACE_RULE;
    this.parsedCssText = null;
    this.descriptors = [];
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspKeyframesRule() {
    this.type = kJscsspKEYFRAMES_RULE;
    this.parsedCssText = null;
    this.cssRules = [];
    this.name = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspKeyframeRule() {
    this.type = kJscsspKEYFRAME_RULE;
    this.parsedCssText = null;
    this.declarations = [];
    this.keyText = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspMediaRule() {
    this.type = kJscsspMEDIA_RULE;
    this.parsedCssText = null;
    this.cssRules = [];
    this.media = [];
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspStyleRule() {
    this.type = kJscsspSTYLE_RULE;
    this.parsedCssText = null;
    this.declarations = [];
    this.mSelectorText = null;
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspPageRule() {
    this.type = kJscsspPAGE_RULE;
    this.parsedCssText = null;
    this.pageSelector = null;
    this.declarations = [];
    this.parentStyleSheet = null;
    this.parentRule = null
}
function jscsspVariablesRule() {
    this.type = kJscsspVARIABLES_RULE;
    this.parsedCssText = null;
    this.declarations = [];
    this.parentStyleSheet = null;
    this.parentRule = null;
    this.media = null
}
function jscsspVariable(e, t) {
    this.value = "";
    this.type = e;
    this.name = null;
    this.parentRule = null;
    this.parentStyleSheet = t
}
function ParseURL(e) {
    var t = {};
    t.protocol = "";
    t.user = "";
    t.password = "";
    t.host = "";
    t.port = "";
    t.path = "";
    t.query = "";
    var n = "PROTOCOL";
    var r = 0;
    var i = false;
    while (r < e.length) {
        if (n == "PROTOCOL") {
            if (e.charAt(r) == ":") {
                n = "AFTER_PROTOCOL";
                r++
            } else if (e.charAt(r) == "/" && t.protocol.length() == 0) {
                n = PATH
            } else {
                t.protocol += e.charAt(r++)
            }
        } else if (n == "AFTER_PROTOCOL") {
            if (e.charAt(r) == "/") {
                if (!i) {
                    i = true
                } else {
                    i = false;
                    n = "USER"
                }
                r++
            } else {
                throw new ParseException("Protocol shell be separated with 2 slashes")
            }
        } else if (n == "USER") {
            if (e.charAt(r) == "/") {
                t.host = t.user;
                t.user = "";
                n = "PATH"
            } else if (e.charAt(r) == "?") {
                t.host = t.user;
                t.user = "";
                n = "QUERY";
                r++
            } else if (e.charAt(r) == ":") {
                n = "PASSWORD";
                r++
            } else if (e.charAt(r) == "@") {
                n = "HOST";
                r++
            } else {
                t.user += e.charAt(r++)
            }
        } else if (n == "PASSWORD") {
            if (e.charAt(r) == "/") {
                t.host = t.user;
                t.port = t.password;
                t.user = "";
                t.password = "";
                n = "PATH"
            } else if (e.charAt(r) == "?") {
                t.host = t.user;
                t.port = t.password;
                t.user = "";
                t.password = "";
                n = "QUERY";
                r++
            } else if (e.charAt(r) == "@") {
                n = "HOST";
                r++
            } else {
                t.password += e.charAt(r++)
            }
        } else if (n == "HOST") {
            if (e.charAt(r) == "/") {
                n = "PATH"
            } else if (e.charAt(r) == ":") {
                n = "PORT";
                r++
            } else if (e.charAt(r) == "?") {
                n = "QUERY";
                r++
            } else {
                t.host += e.charAt(r++)
            }
        } else if (n == "PORT") {
            if (e.charAt(r) == "/") {
                n = "PATH"
            } else if (e.charAt(r) == "?") {
                n = "QUERY";
                r++
            } else {
                t.port += e.charAt(r++)
            }
        } else if (n == "PATH") {
            if (e.charAt(r) == "?") {
                n = "QUERY";
                r++
            } else {
                t.path += e.charAt(r++)
            }
        } else if (n == "QUERY") {
            t.query += e.charAt(r++)
        }
    }
    if (n == "PROTOCOL") {
        t.host = t.protocol;
        t.protocol = "http"
    } else if (n == "AFTER_PROTOCOL") {
        throw new ParseException("Invalid url")
    } else if (n == "USER") {
        t.host = t.user;
        t.user = ""
    } else if (n == "PASSWORD") {
        t.host = t.user;
        t.port = t.password;
        t.user = "";
        t.password = ""
    }
    return t
}
function ParseException(e) {
    this.description = e
}
function CountLF(e) {
    var t = e.match(/\n/g);
    return t ? t.length + 1 : 1
}
function FilterLinearGradientForOutput(e, t) {
    if (t == "generic") return e.substr(5);
    if (t == "webkit") return e.replace(/\-moz\-/g, "-webkit-");
    if (t != "webkit20110101") return "";
    var n = CssInspector.parseBackgroundImages(e)[0];
    var r = false;
    var i = "-webkit-gradient(linear, ";
    var s = "position" in n.value ? n.value.position.toLowerCase() : "";
    var o = "angle" in n.value ? n.value.angle.toLowerCase() : "";
    if (o) {
        var u = o.match(/^([0-9\-\.\\+]+)([a-z]*)/);
        var o = parseFloat(u[1]);
        var a = u[2];
        switch (a) {
        case "grad":
            o = o * 90 / 100;
            break;
        case "rad":
            o = o * 180 / Math.PI;
            break;
        default:
            break
        }
        while (o < 0) o += 360;
        while (o >= 360) o -= 360
    }
    var f = [];
    var l = [];
    if (s != "") {
        if (s == "center") s = "center center";
        f = s.split(" ");
        if (o == "" && o != 0) {
            switch (f[0]) {
            case "left":
                l.push("right");
                break;
            case "center":
                l.push("center");
                break;
            case "right":
                l.push("left");
                break;
            default:
                {
                    var u = f[0].match(/^([0-9\-\.\\+]+)([a-z]*)/);
                    var c = parseFloat(u[0]);
                    var a = u[1];
                    if (a == "%") {
                        l.push(100 - c + "%")
                    } else r = true
                }
                break
            }
            if (!r) switch (f[1]) {
            case "top":
                l.push("bottom");
                break;
            case "center":
                l.push("center");
                break;
            case "bottom":
                l.push("top");
                break;
            default:
                {
                    var u = f[1].match(/^([0-9\-\.\\+]+)([a-z]*)/);
                    var c = parseFloat(u[0]);
                    var a = u[1];
                    if (a == "%") {
                        l.push(100 - c + "%")
                    } else r = true
                }
                break
            }
        } else {
            switch (o) {
            case 0:
                l.push("right");
                l.push(f[1]);
                break;
            case 90:
                l.push(f[0]);
                l.push("top");
                break;
            case 180:
                l.push("left");
                l.push(f[1]);
                break;
            case 270:
                l.push(f[0]);
                l.push("bottom");
                break;
            default:
                r = true;
                break
            }
        }
    } else {
        if (o == "") o = 270;
        switch (o) {
        case 0:
            f = ["left", "center"];
            l = ["right", "center"];
            break;
        case 90:
            f = ["center", "bottom"];
            l = ["center", "top"];
            break;
        case 180:
            f = ["right", "center"];
            l = ["left", "center"];
            break;
        case 270:
            f = ["center", "top"];
            l = ["center", "bottom"];
            break;
        default:
            r = true;
            break
        }
    }
    if (r) return "";
    i += f.join(" ") + ", " + l.join(" ");
    if (!n.value.stops[0].position) n.value.stops[0].position = "0%";
    if (!n.value.stops[n.value.stops.length - 1].position) n.value.stops[n.value.stops.length - 1].position = "100%";
    var h = 0;
    for (var p = 0; p < n.value.stops.length && !r; p++) {
        var d = n.value.stops[p];
        if (d.position) {
            if (d.position.indexOf("%") == -1) {
                r = true;
                break
            }
        } else {
            var v = p + 1;
            while (v < n.value.stops.length && !n.value.stops[v].position) v++;
            var m = parseFloat(n.value.stops[v].position) - h;
            for (var g = p; g < v; g++) {
                n.value.stops[g].position = h + m * (g - p + 1) / (v - p + 1) + "%"
            }
        }
        h = parseFloat(d.position);
        i += ", color-stop(" + parseFloat(h) / 100 + ", " + d.color + ")"
    }
    if (r) return "";
    return i + ")"
}
function FilterRadialGradientForOutput(e, t) {
    if (t == "generic") return e.substr(5);
    else if (t == "webkit") return e.replace(/\-moz\-/g, "-webkit-");
    else if (t != "webkit20110101") return "";
    var n = CssInspector.parseBackgroundImages(e)[0];
    var r = "shape" in n.value ? n.value.shape : "";
    var i = "size" in n.value ? n.value.size : "";
    if (r != "circle" || i != "farthest-corner" && i != "cover") return "";
    if (n.value.stops.length < 2 || !("position" in n.value.stops[0]) || !n.value.stops[n.value.stops.length - 1].position || !("position" in n.value.stops[0]) || !n.value.stops[n.value.stops.length - 1].position) return "";
    for (var s = 0; s < n.value.stops.length; s++) {
        var o = n.value.stops[s];
        if ("position" in o && o.position && o.position.indexOf("px") == -1) return ""
    }
    var u = "-webkit-gradient(radial, ";
    var a = "position" in n.value ? n.value.position : "center center";
    u += a + ", " + parseFloat(n.value.stops[0].position) + ", ";
    u += a + ", " + parseFloat(n.value.stops[n.value.stops.length - 1].position);
    var f = parseFloat(n.value.stops[0].position);
    for (var s = 0; s < n.value.stops.length; s++) {
        var o = n.value.stops[s];
        if (!("position" in o) || !o.position) {
            var l = s + 1;
            while (l < n.value.stops.length && !n.value.stops[l].position) l++;
            var c = parseFloat(n.value.stops[l].position) - f;
            for (var h = s; h < l; h++) {
                n.value.stops[h].position = f + c * (h - s + 1) / (l - s + 1) + "px"
            }
        }
        f = parseFloat(o.position);
        var p = (f - parseFloat(n.value.stops[0].position)) / (parseFloat(n.value.stops[n.value.stops.length - 1].position) - parseFloat(n.value.stops[0].position));
        u += ", color-stop(" + p + ", " + o.color + ")"
    }
    u += ")";
    return u
}
function FilterRepeatingGradientForOutput(e, t) {
    if (t == "generic") return e.substr(5);
    else if (t == "webkit") return e.replace(/\-moz\-/g, "-webkit-");
    return ""
}
var kCHARSET_RULE_MISSING_SEMICOLON = "Missing semicolon at the end of @charset rule";
var kCHARSET_RULE_CHARSET_IS_STRING = "The charset in the @charset rule should be a string";
var kCHARSET_RULE_MISSING_WS = "Missing mandatory whitespace after @charset";
var kIMPORT_RULE_MISSING_URL = "Missing URL in @import rule";
var kURL_EOF = "Unexpected end of stylesheet";
var kURL_WS_INSIDE = "Multiple tokens inside a url() notation";
var kVARIABLES_RULE_POSITION = "@variables rule invalid at this position in the stylesheet";
var kIMPORT_RULE_POSITION = "@import rule invalid at this position in the stylesheet";
var kNAMESPACE_RULE_POSITION = "@namespace rule invalid at this position in the stylesheet";
var kCHARSET_RULE_CHARSET_SOF = "@charset rule invalid at this position in the stylesheet";
var kUNKNOWN_AT_RULE = "Unknow @-rule";
var kENGINES = ["webkit", "presto", "trident", "generic"];
var kCSS_VENDOR_VALUES = {
    "-moz-box": {
        webkit: "-webkit-box",
        presto: "",
        trident: "",
        generic: "box"
    },
    "-moz-inline-box": {
        webkit: "-webkit-inline-box",
        presto: "",
        trident: "",
        generic: "inline-box"
    },
    "-moz-initial": {
        webkit: "",
        presto: "",
        trident: "",
        generic: "initial"
    },
    "-moz-linear-gradient": {
        webkit20110101: FilterLinearGradientForOutput,
        webkit: FilterLinearGradientForOutput,
        presto: "",
        trident: "",
        generic: FilterLinearGradientForOutput
    },
    "-moz-radial-gradient": {
        webkit20110101: FilterRadialGradientForOutput,
        webkit: FilterRadialGradientForOutput,
        presto: "",
        trident: "",
        generic: FilterRadialGradientForOutput
    },
    "-moz-repeating-linear-gradient": {
        webkit20110101: "",
        webkit: FilterRepeatingGradientForOutput,
        presto: "",
        trident: "",
        generic: FilterRepeatingGradientForOutput
    },
    "-moz-repeating-radial-gradient": {
        webkit20110101: "",
        webkit: FilterRepeatingGradientForOutput,
        presto: "",
        trident: "",
        generic: FilterRepeatingGradientForOutput
    }
};

var kCSS_PREFIXED_VALUE = [{
    gecko: "-moz-box",
    webkit: "-moz-box",
    presto: "",
    trident: "",
    generic: "box"
}];
var CssInspector = {
    mVENDOR_PREFIXES: null,
    kEXPORTS_FOR_GECKO: true,
    kEXPORTS_FOR_WEBKIT: true,
    kEXPORTS_FOR_PRESTO: true,
    kEXPORTS_FOR_TRIDENT: true,
    cleanPrefixes: function() {
        this.mVENDOR_PREFIXES = null
    },
    prefixesForProperty: function(e) {
        if (!this.mVENDOR_PREFIXES) {
            this.mVENDOR_PREFIXES = {};
            for (var t = 0; t < kCSS_VENDOR_PREFIXES.properties.length; t++) {
                var n = kCSS_VENDOR_PREFIXES.properties[t];
                if (n.gecko && (n.webkit || n.presto || n.trident)) {
                    var r = {};
                    if (this.kEXPORTS_FOR_GECKO) r[n.gecko] = true;
                    if (this.kEXPORTS_FOR_WEBKIT && n.webkit) r[n.webkit] = true;
                    if (this.kEXPORTS_FOR_PRESTO && n.presto) r[n.presto] = true;
                    if (this.kEXPORTS_FOR_TRIDENT && n.trident) r[n.trident] = true;
                    this.mVENDOR_PREFIXES[n.gecko] = [];
                    for (var i in r) this.mVENDOR_PREFIXES[n.gecko].push(i)
                }
            }
        }
        if (e in this.mVENDOR_PREFIXES) return this.mVENDOR_PREFIXES[e].sort();
        return null
    },
    parseColorStop: function(e, t) {
        var n = e.parseColor(t);
        var r = "";
        if (!n) return null;
        t = e.getToken(true, true);
        if (t.isPercentage() || t.isDimensionOfUnit("cm") || t.isDimensionOfUnit("mm") || t.isDimensionOfUnit("in") || t.isDimensionOfUnit("pc") || t.isDimensionOfUnit("px") || t.isDimensionOfUnit("em") || t.isDimensionOfUnit("ex") || t.isDimensionOfUnit("pt")) {
            r = t.value;
            t = e.getToken(true, true)
        }
        return {
            color: n,
            position: r
        }
    },
    parseGradient: function(e, t) {
        var n = false;
        var r = {
            isRepeating: false
        };
        if (t.isNotNull()) {
            if (t.isFunction("-moz-linear-gradient(") || t.isFunction("-moz-radial-gradient(") || t.isFunction("-moz-repeating-linear-gradient(") || t.isFunction("-moz-repeating-radial-gradient(")) {
                if (t.isFunction("-moz-radial-gradient(") || t.isFunction("-moz-repeating-radial-gradient(")) {
                    r.isRadial = true
                }
                if (t.isFunction("-moz-repeating-linear-gradient(") || t.isFunction("-moz-repeating-radial-gradient(")) {
                    r.isRepeating = true
                }
                t = e.getToken(true, true);
                var i = false;
                var s = false;
                var o = false;
                if (t.isAngle()) {
                    r.angle = t.value;
                    i = true;
                    o = true;
                    t = e.getToken(true, true)
                }
                if (t.isLength() || t.isIdent("top") || t.isIdent("center") || t.isIdent("bottom") || t.isIdent("left") || t.isIdent("right")) {
                    i = true;
                    if (t.isLength() || t.isIdent("left") || t.isIdent("right")) {
                        s = true
                    }
                    r.position = t.value;
                    t = e.getToken(true, true)
                }
                if (i) {
                    if (!o && t.isAngle()) {
                        r.angle = t.value;
                        o = true;
                        t = e.getToken(true, true)
                    } else if (t.isLength() || s && (t.isIdent("top") || t.isIdent("center") || t.isIdent("bottom")) || !s && (t.isLength() || t.isIdent("top") || t.isIdent("center") || t.isIdent("bottom") || t.isIdent("left") || t.isIdent("right"))) {
                        r.position = "position" in r ? r.position + " " : "";
                        r.position += t.value;
                        t = e.getToken(true, true)
                    }
                    if (!o && t.isAngle()) {
                        r.angle = t.value;
                        o = true;
                        t = e.getToken(true, true)
                    }
                    if (!t.isSymbol(",")) return null;
                    t = e.getToken(true, true)
                }
                if (r.isRadial) {
                    if (t.isIdent("circle") || t.isIdent("ellipse")) {
                        r.shape = t.value;
                        t = e.getToken(true, true)
                    }
                    if (t.isIdent("closest-side") || t.isIdent("closest-corner") || t.isIdent("farthest-side") || t.isIdent("farthest-corner") || t.isIdent("contain") || t.isIdent("cover")) {
                        r.size = t.value;
                        t = e.getToken(true, true)
                    }
                    if (!("shape" in r) && (t.isIdent("circle") || t.isIdent("ellipse"))) {
                        r.shape = t.value;
                        t = e.getToken(true, true)
                    }
                    if (("shape" in r || "size" in r) && !t.isSymbol(",")) return null;
                    else if ("shape" in r || "size" in r) t = e.getToken(true, true)
                }
                var u = this.parseColorStop(e, t);
                if (!u) return null;
                t = e.currentToken();
                if (!t.isSymbol(",")) return null;
                t = e.getToken(true, true);
                var a = this.parseColorStop(e, t);
                if (!a) return null;
                t = e.currentToken();
                if (t.isSymbol(",")) {
                    t = e.getToken(true, true)
                }
                r.stops = [u, a];
                while (!t.isSymbol(")")) {
                    var f = this.parseColorStop(e, t);
                    if (!f) return null;
                    t = e.currentToken();
                    if (!t.isSymbol(")") && !t.isSymbol(",")) return null;
                    if (t.isSymbol(",")) t = e.getToken(true, true);
                    r.stops.push(f)
                }
                return r
            }
        }
        return null
    },
    parseBoxShadows: function(e) {
        var t = new CSSParser;
        t._init();
        t.mPreserveWS = false;
        t.mPreserveComments = false;
        t.mPreservedTokens = [];
        t.mScanner.init(e);
        var n = [];
        var r = t.getToken(true, true);
        var i = "",
            s = "0px",
            o = "0px",
            u = "0px",
            a = "0px";
        var f = false;
        while (r.isNotNull()) {
            if (r.isIdent("none")) {
                n.push({
                    none: true
                });
                r = t.getToken(true, true)
            } else {
                if (r.isIdent("inset")) {
                    f = true;
                    r = t.getToken(true, true)
                }
                if (r.isPercentage() || r.isDimensionOfUnit("cm") || r.isDimensionOfUnit("mm") || r.isDimensionOfUnit("in") || r.isDimensionOfUnit("pc") || r.isDimensionOfUnit("px") || r.isDimensionOfUnit("em") || r.isDimensionOfUnit("ex") || r.isDimensionOfUnit("pt")) {
                    var o = r.value;
                    r = t.getToken(true, true)
                } else return [];
                if (!f && r.isIdent("inset")) {
                    f = true;
                    r = t.getToken(true, true)
                }
                if (r.isPercentage() || r.isDimensionOfUnit("cm") || r.isDimensionOfUnit("mm") || r.isDimensionOfUnit("in") || r.isDimensionOfUnit("pc") || r.isDimensionOfUnit("px") || r.isDimensionOfUnit("em") || r.isDimensionOfUnit("ex") || r.isDimensionOfUnit("pt")) {
                    var o = r.value;
                    r = t.getToken(true, true)
                } else return [];
                if (!f && r.isIdent("inset")) {
                    f = true;
                    r = t.getToken(true, true)
                }
                if (r.isPercentage() || r.isDimensionOfUnit("cm") || r.isDimensionOfUnit("mm") || r.isDimensionOfUnit("in") || r.isDimensionOfUnit("pc") || r.isDimensionOfUnit("px") || r.isDimensionOfUnit("em") || r.isDimensionOfUnit("ex") || r.isDimensionOfUnit("pt")) {
                    var s = r.value;
                    r = t.getToken(true, true)
                }
                if (!f && r.isIdent("inset")) {
                    f = true;
                    r = t.getToken(true, true)
                }
                if (r.isPercentage() || r.isDimensionOfUnit("cm") || r.isDimensionOfUnit("mm") || r.isDimensionOfUnit("in") || r.isDimensionOfUnit("pc") || r.isDimensionOfUnit("px") || r.isDimensionOfUnit("em") || r.isDimensionOfUnit("ex") || r.isDimensionOfUnit("pt")) {
                    var a = r.value;
                    r = t.getToken(true, true)
                }
                if (!f && r.isIdent("inset")) {
                    f = true;
                    r = t.getToken(true, true)
                }
                if (r.isFunction("rgb(") || r.isFunction("rgba(") || r.isFunction("hsl(") || r.isFunction("hsla(") || r.isSymbol("#") || r.isIdent()) {
                    var i = t.parseColor(r);
                    r = t.getToken(true, true)
                }
                if (!f && r.isIdent("inset")) {
                    f = true;
                    r = t.getToken(true, true)
                }
                n.push({
                    none: false,
                    color: i,
                    offsetX: o,
                    offsetY: u,
                    blurRadius: s,
                    spreadRadius: a
                });
                if (r.isSymbol(",")) {
                    f = false;
                    i = "";
                    s = "0px";
                    a = "0px";
                    o = "0px";
                    u = "0px";
                    r = t.getToken(true, true)
                } else if (!r.isNotNull()) return n;
                else return []
            }
        }
        return n
    },
    parseTextShadows: function(e) {
        var t = new CSSParser;
        t._init();
        t.mPreserveWS = false;
        t.mPreserveComments = false;
        t.mPreservedTokens = [];
        t.mScanner.init(e);
        var n = [];
        var r = t.getToken(true, true);
        var i = "",
            s = "0px",
            o = "0px",
            u = "0px";
        while (r.isNotNull()) {
            if (r.isIdent("none")) {
                n.push({
                    none: true
                });
                r = t.getToken(true, true)
            } else {
                if (r.isFunction("rgb(") || r.isFunction("rgba(") || r.isFunction("hsl(") || r.isFunction("hsla(") || r.isSymbol("#") || r.isIdent()) {
                    var i = t.parseColor(r);
                    r = t.getToken(true, true)
                }
                if (r.isPercentage() || r.isDimensionOfUnit("cm") || r.isDimensionOfUnit("mm") || r.isDimensionOfUnit("in") || r.isDimensionOfUnit("pc") || r.isDimensionOfUnit("px") || r.isDimensionOfUnit("em") || r.isDimensionOfUnit("ex") || r.isDimensionOfUnit("pt")) {
                    var o = r.value;
                    r = t.getToken(true, true)
                } else return [];
                if (r.isPercentage() || r.isDimensionOfUnit("cm") || r.isDimensionOfUnit("mm") || r.isDimensionOfUnit("in") || r.isDimensionOfUnit("pc") || r.isDimensionOfUnit("px") || r.isDimensionOfUnit("em") || r.isDimensionOfUnit("ex") || r.isDimensionOfUnit("pt")) {
                    var u = r.value;
                    r = t.getToken(true, true)
                } else return [];
                if (r.isPercentage() || r.isDimensionOfUnit("cm") || r.isDimensionOfUnit("mm") || r.isDimensionOfUnit("in") || r.isDimensionOfUnit("pc") || r.isDimensionOfUnit("px") || r.isDimensionOfUnit("em") || r.isDimensionOfUnit("ex") || r.isDimensionOfUnit("pt")) {
                    var s = r.value;
                    r = t.getToken(true, true)
                }
                if (!i && (r.isFunction("rgb(") || r.isFunction("rgba(") || r.isFunction("hsl(") || r.isFunction("hsla(") || r.isSymbol("#") || r.isIdent())) {
                    var i = t.parseColor(r);
                    r = t.getToken(true, true)
                }
                n.push({
                    none: false,
                    color: i,
                    offsetX: o,
                    offsetY: u,
                    blurRadius: s
                });
                if (r.isSymbol(",")) {
                    i = "";
                    s = "0px";
                    o = "0px";
                    u = "0px";
                    r = t.getToken(true, true)
                } else if (!r.isNotNull()) return n;
                else return []
            }
        }
        return n
    },
    parseBackgroundImages: function(e) {
        var t = new CSSParser;
        t._init();
        t.mPreserveWS = false;
        t.mPreserveComments = false;
        t.mPreservedTokens = [];
        t.mScanner.init(e);
        var n = [];
        var r = t.getToken(true, true);
        while (r.isNotNull()) {
            if (r.isFunction("url(")) {
                r = t.getToken(true, true);
                var i = t.parseURL(r);
                n.push({
                    type: "image",
                    value: "url(" + i
                });
                r = t.getToken(true, true)
            } else if (r.isFunction("-moz-linear-gradient(") || r.isFunction("-moz-radial-gradient(") || r.isFunction("-moz-repeating-linear-gradient(") || r.isFunction("-moz-repeating-radial-gradient(")) {
                var s = this.parseGradient(t, r);
                n.push({
                    type: s.isRadial ? "radial-gradient" : "linear-gradient",
                    value: s
                });
                r = t.getToken(true, true)
            } else return null;
            if (r.isSymbol(",")) {
                r = t.getToken(true, true);
                if (!r.isNotNull()) return null
            }
        }
        return n
    },
    serializeGradient: function(e) {
        var t = e.isRadial ? e.isRepeating ? "-moz-repeating-radial-gradient(" : "-moz-radial-gradient(" : e.isRepeating ? "-moz-repeating-linear-gradient(" : "-moz-linear-gradient(";
        if (e.angle || e.position) t += (e.angle ? e.angle + " " : "") + (e.position ? e.position : "") + ", ";
        if (e.isRadial && (e.shape || e.size)) t += (e.shape ? e.shape : "") + " " + (e.size ? e.size : "") + ", ";
        for (var n = 0; n < e.stops.length; n++) {
            var r = e.stops[n];
            t += r.color + (r.position ? " " + r.position : "");
            if (n != e.stops.length - 1) t += ", "
        }
        t += ")";
        return t
    },
    parseBorderImage: function(e) {
        var t = new CSSParser;
        t._init();
        t.mPreserveWS = false;
        t.mPreserveComments = false;
        t.mPreservedTokens = [];
        t.mScanner.init(e);
        var n = {
            url: "",
            offsets: [],
            widths: [],
            sizes: []
        };
        var r = t.getToken(true, true);
        if (r.isFunction("url(")) {
            r = t.getToken(true, true);
            var i = t.parseURL(r);
            if (i) {
                n.url = i.substr(0, i.length - 1).trim();
                if (n.url[0] == '"' && n.url[n.url.length - 1] == '"' || n.url[0] == "'" && n.url[n.url.length - 1] == "'") n.url = n.url.substr(1, n.url.length - 2)
            } else return null
        } else return null;
        r = t.getToken(true, true);
        if (r.isNumber() || r.isPercentage()) n.offsets.push(r.value);
        else return null;
        var s;
        for (s = 0; s < 3; s++) {
            r = t.getToken(true, true);
            if (r.isNumber() || r.isPercentage()) n.offsets.push(r.value);
            else break
        }
        if (s == 3) r = t.getToken(true, true);
        if (r.isSymbol("/")) {
            r = t.getToken(true, true);
            if (r.isDimension() || r.isNumber("0") || r.isIdent() && r.value in t.kBORDER_WIDTH_NAMES) n.widths.push(r.value);
            else return null;
            for (var s = 0; s < 3; s++) {
                r = t.getToken(true, true);
                if (r.isDimension() || r.isNumber("0") || r.isIdent() && r.value in t.kBORDER_WIDTH_NAMES) n.widths.push(r.value);
                else break
            }
            if (s == 3) r = t.getToken(true, true)
        }
        for (var s = 0; s < 2; s++) {
            if (r.isIdent("stretch") || r.isIdent("repeat") || r.isIdent("round")) n.sizes.push(r.value);
            else if (!r.isNotNull()) return n;
            else return null;
            r = t.getToken(true, true)
        }
        if (!r.isNotNull()) return n;
        return null
    },
    parseMediaQuery: function(e) {
        var t = {
            width: true,
            "min-width": true,
            "max-width": true,
            height: true,
            "min-height": true,
            "max-height": true,
            "device-width": true,
            "min-device-width": true,
            "max-device-width": true,
            "device-height": true,
            "min-device-height": true,
            "max-device-height": true,
            orientation: true,
            "aspect-ratio": true,
            "min-aspect-ratio": true,
            "max-aspect-ratio": true,
            "device-aspect-ratio": true,
            "min-device-aspect-ratio": true,
            "max-device-aspect-ratio": true,
            color: true,
            "min-color": true,
            "max-color": true,
            "color-index": true,
            "min-color-index": true,
            "max-color-index": true,
            monochrome: true,
            "min-monochrome": true,
            "max-monochrome": true,
            resolution: true,
            "min-resolution": true,
            "max-resolution": true,
            scan: true,
            grid: true
        };
        var n = new CSSParser;
        n._init();
        n.mPreserveWS = false;
        n.mPreserveComments = false;
        n.mPreservedTokens = [];
        n.mScanner.init(e);
        var r = {
            amplifier: "",
            medium: "",
            constraints: []
        };
        var i = n.getToken(true, true);
        if (i.isIdent("all") || i.isIdent("aural") || i.isIdent("braille") || i.isIdent("handheld") || i.isIdent("print") || i.isIdent("projection") || i.isIdent("screen") || i.isIdent("tty") || i.isIdent("tv")) {
            r.medium = i.value;
            i = n.getToken(true, true)
        } else if (i.isIdent("not") || i.isIdent("only")) {
            r.amplifier = i.value;
            i = n.getToken(true, true);
            if (i.isIdent("all") || i.isIdent("aural") || i.isIdent("braille") || i.isIdent("handheld") || i.isIdent("print") || i.isIdent("projection") || i.isIdent("screen") || i.isIdent("tty") || i.isIdent("tv")) {
                r.medium = i.value;
                i = n.getToken(true, true)
            } else return null
        }
        if (r.medium) {
            if (!i.isNotNull()) return r;
            if (i.isIdent("and")) {
                i = n.getToken(true, true)
            } else return null
        }
        while (i.isSymbol("(")) {
            i = n.getToken(true, true);
            if (i.isIdent() && i.value in t) {
                var s = i.value;
                i = n.getToken(true, true);
                if (i.isSymbol(":")) {
                    i = n.getToken(true, true);
                    var o = [];
                    while (!i.isSymbol(")")) {
                        o.push(i.value);
                        i = n.getToken(true, true)
                    }
                    if (i.isSymbol(")")) {
                        r.constraints.push({
                            constraint: s,
                            value: o
                        });
                        i = n.getToken(true, true);
                        if (i.isNotNull()) {
                            if (i.isIdent("and")) {
                                i = n.getToken(true, true)
                            } else return null
                        } else return r
                    } else return null
                } else if (i.isSymbol(")")) {
                    r.constraints.push({
                        constraint: s,
                        value: null
                    });
                    i = n.getToken(true, true);
                    if (i.isNotNull()) {
                        if (i.isIdent("and")) {
                            i = n.getToken(true, true)
                        } else return null
                    } else return r
                } else return null
            } else return null
        }
        return r
    }
};
var CSS_ESCAPE = "\\";
var IS_HEX_DIGIT = 1;
var START_IDENT = 2;
var IS_IDENT = 4;
var IS_WHITESPACE = 8;
var W = IS_WHITESPACE;
var I = IS_IDENT;
var S = START_IDENT;
var SI = IS_IDENT | START_IDENT;
var XI = IS_IDENT | IS_HEX_DIGIT;
var XSI = IS_IDENT | START_IDENT | IS_HEX_DIGIT;
CSSScanner.prototype = {
    kLexTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, W, W, 0, W, W, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, W, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, I, 0, 0, XI, XI, XI, XI, XI, XI, XI, XI, XI, XI, 0, 0, 0, 0, 0, 0, 0, XSI, XSI, XSI, XSI, XSI, XSI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, 0, S, 0, 0, SI, 0, XSI, XSI, XSI, XSI, XSI, XSI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI],
    kHexValues: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    },
    mString: "",
    mPos: 0,
    mPreservedPos: [],
    init: function(e) {
        this.mString = e;
        this.mPos = 0;
        this.mPreservedPos = []
    },
    getCurrentPos: function() {
        return this.mPos
    },
    getAlreadyScanned: function() {
        return this.mString.substr(0, this.mPos)
    },
    preserveState: function() {
        this.mPreservedPos.push(this.mPos)
    },
    restoreState: function() {
        if (this.mPreservedPos.length) {
            this.mPos = this.mPreservedPos.pop()
        }
    },
    forgetState: function() {
        if (this.mPreservedPos.length) {
            this.mPreservedPos.pop()
        }
    },
    read: function() {
        if (this.mPos < this.mString.length) return this.mString.charAt(this.mPos++);
        return -1
    },
    peek: function() {
        if (this.mPos < this.mString.length) return this.mString.charAt(this.mPos);
        return -1
    },
    isHexDigit: function(e) {
        var t = e.charCodeAt(0);
        return t < 256 && (this.kLexTable[t] & IS_HEX_DIGIT) != 0
    },
    isIdentStart: function(e) {
        var t = e.charCodeAt(0);
        return t >= 256 || (this.kLexTable[t] & START_IDENT) != 0
    },
    startsWithIdent: function(e, t) {
        var n = e.charCodeAt(0);
        return this.isIdentStart(e) || e == "-" && this.isIdentStart(t)
    },
    isIdent: function(e) {
        var t = e.charCodeAt(0);
        return t >= 256 || (this.kLexTable[t] & IS_IDENT) != 0
    },
    isSymbol: function(e) {
        var t = e.charCodeAt(0);
        return (this.kLexTable[t] & IS_IDENT) != 1
    },
    pushback: function() {
        this.mPos--
    },
    nextHexValue: function() {
        var e = this.read();
        if (e == -1 || !this.isHexDigit(e)) return new jscsspToken(jscsspToken.NULL_TYPE, null);
        var t = e;
        e = this.read();
        while (e != -1 && this.isHexDigit(e)) {
            t += e;
            e = this.read()
        }
        if (e != -1) this.pushback();
        return new jscsspToken(jscsspToken.HEX_TYPE, t)
    },
    gatherEscape: function() {
        var e = this.peek();
        if (e == -1) return "";
        if (this.isHexDigit(e)) {
            var t = 0;
            for (var n = 0; n < 6; n++) {
                e = this.read();
                if (this.isHexDigit(e)) t = t * 16 + this.kHexValues[e.toLowerCase()];
                else if (!this.isHexDigit(e) && !this.isWhiteSpace(e)) {
                    this.pushback();
                    break
                } else break
            }
            if (n == 6) {
                e = this.peek();
                if (this.isWhiteSpace(e)) this.read()
            }
            return String.fromCharCode(t)
        }
        e = this.read();
        if (e != "\n") return e;
        return ""
    },
    gatherIdent: function(e) {
        var t = "";
        if (e == CSS_ESCAPE) t += this.gatherEscape();
        else t += e;
        e = this.read();
        if (!this.mMediaQueryMode) {
            while (e != -1 && (this.isIdent(e) || e == CSS_ESCAPE)) {
                if (e == CSS_ESCAPE) t += this.gatherEscape();
                else t += e;
                e = this.read()
            }
        } else {
            while (e != -1 && e != "{" && e != ",") {
                t += e;
                e = this.read()
            }
        }
        if (e != -1) this.pushback();
        this.mMediaQueryMode = false;
        return t
    },
    parseIdent: function(e) {
        var t = this.gatherIdent(e);
        var n = this.peek();
        if (n == "(") {
            t += this.read();
            return new jscsspToken(jscsspToken.FUNCTION_TYPE, t)
        }
        return new jscsspToken(jscsspToken.IDENT_TYPE, t)
    },
    isDigit: function(e) {
        return e >= "0" && e <= "9"
    },
    parseComment: function(e) {
        var t = e;
        while ((e = this.read()) != -1) {
            t += e;
            if (e == "*") {
                e = this.read();
                if (e == -1) break;
                if (e == "/") {
                    t += e;
                    break
                }
                this.pushback()
            }
        }
        return new jscsspToken(jscsspToken.COMMENT_TYPE, t)
    },
    parseNumber: function(e) {
        var t = e;
        var n = false;
        while ((e = this.read()) != -1) {
            if (e == ".") {
                if (n) break;
                else {
                    t += e;
                    n = true
                }
            } else if (this.isDigit(e)) t += e;
            else break
        }
        if (e != -1 && this.startsWithIdent(e, this.peek())) {
            var r = this.gatherIdent(e);
            t += r;
            return new jscsspToken(jscsspToken.DIMENSION_TYPE, t, r)
        } else if (e == "%") {
            t += "%";
            return new jscsspToken(jscsspToken.PERCENTAGE_TYPE, t)
        } else if (e != -1) this.pushback();
        return new jscsspToken(jscsspToken.NUMBER_TYPE, t)
    },
    parseString: function(e) {
        var t = e;
        var n = e;
        var r;
        while ((r = this.read()) != -1) {
            if (r == e && n != CSS_ESCAPE) {
                t += r;
                break
            } else if (r == CSS_ESCAPE) {
                r = this.peek();
                if (r == -1) break;
                else if (r == "\n" || r == "\r" || r == "\f") {
                    d = r;
                    r = this.read();
                    if (d == "\r") {
                        r = this.peek();
                        if (r == "\n") r = this.read()
                    }
                } else {
                    t += this.gatherEscape();
                    r = this.peek()
                }
            } else if (r == "\n" || r == "\r" || r == "\f") {
                break
            } else t += r;
            n = r
        }
        return new jscsspToken(jscsspToken.STRING_TYPE, t)
    },
    isWhiteSpace: function(e) {
        var t = e.charCodeAt(0);
        return t < 256 && (this.kLexTable[t] & IS_WHITESPACE) != 0
    },
    eatWhiteSpace: function(e) {
        var t = e;
        while ((e = this.read()) != -1) {
            if (!this.isWhiteSpace(e)) break;
            t += e
        }
        if (e != -1) this.pushback();
        return t
    },
    parseAtKeyword: function(e) {
        return new jscsspToken(jscsspToken.ATRULE_TYPE, this.gatherIdent(e))
    },
    nextToken: function() {
        var e = this.read();
        if (e == -1) return new jscsspToken(jscsspToken.NULL_TYPE, null);
        if (this.startsWithIdent(e, this.peek())) return this.parseIdent(e);
        if (e == "@") {
            var t = this.read();
            if (t != -1) {
                var n = this.peek();
                this.pushback();
                if (this.startsWithIdent(t, n)) return this.parseAtKeyword(e)
            }
        }
        if (e == "." || e == "+" || e == "-") {
            var t = this.peek();
            if (this.isDigit(t)) return this.parseNumber(e);
            else if (t == "." && e != ".") {
                firstChar = this.read();
                var r = this.peek();
                this.pushback();
                if (this.isDigit(r)) return this.parseNumber(e)
            }
        }
        if (this.isDigit(e)) {
            return this.parseNumber(e)
        }
        if (e == "'" || e == '"') return this.parseString(e);
        if (this.isWhiteSpace(e)) {
            var i = this.eatWhiteSpace(e);
            return new jscsspToken(jscsspToken.WHITESPACE_TYPE, i)
        }
        if (e == "|" || e == "~" || e == "^" || e == "$" || e == "*") {
            var t = this.read();
            if (t == "=") {
                switch (e) {
                case "~":
                    return new jscsspToken(jscsspToken.INCLUDES_TYPE, "~=");
                case "|":
                    return new jscsspToken(jscsspToken.DASHMATCH_TYPE, "|=");
                case "^":
                    return new jscsspToken(jscsspToken.BEGINSMATCH_TYPE, "^=");
                case "$":
                    return new jscsspToken(jscsspToken.ENDSMATCH_TYPE, "$=");
                case "*":
                    return new jscsspToken(jscsspToken.CONTAINSMATCH_TYPE, "*=");
                default:
                    break
                }
            } else if (t != -1) this.pushback()
        }
        if (e == "/" && this.peek() == "*") return this.parseComment(e);
        return new jscsspToken(jscsspToken.SYMBOL_TYPE, e)
    }
};
CSSParser.prototype = {
    _init: function() {
        this.mToken = null;
        this.mLookAhead = null;
        this.mMediaQueryMode = false
    },
    kINHERIT: "inherit",
    kBORDER_WIDTH_NAMES: {
        thin: true,
        medium: true,
        thick: true
    },
    kBORDER_STYLE_NAMES: {
        none: true,
        hidden: true,
        dotted: true,
        dashed: true,
        solid: true,
        "double": true,
        groove: true,
        ridge: true,
        inset: true,
        outset: true
    },
    kCOLOR_NAMES: {
        transparent: true,
        black: true,
        silver: true,
        gray: true,
        white: true,
        maroon: true,
        red: true,
        purple: true,
        fuchsia: true,
        green: true,
        lime: true,
        olive: true,
        yellow: true,
        navy: true,
        blue: true,
        teal: true,
        aqua: true,
        aliceblue: true,
        antiquewhite: true,
        aqua: true,
        aquamarine: true,
        azure: true,
        beige: true,
        bisque: true,
        black: true,
        blanchedalmond: true,
        blue: true,
        blueviolet: true,
        brown: true,
        burlywood: true,
        cadetblue: true,
        chartreuse: true,
        chocolate: true,
        coral: true,
        cornflowerblue: true,
        cornsilk: true,
        crimson: true,
        cyan: true,
        darkblue: true,
        darkcyan: true,
        darkgoldenrod: true,
        darkgray: true,
        darkgreen: true,
        darkgrey: true,
        darkkhaki: true,
        darkmagenta: true,
        darkolivegreen: true,
        darkorange: true,
        darkorchid: true,
        darkred: true,
        darksalmon: true,
        darkseagreen: true,
        darkslateblue: true,
        darkslategray: true,
        darkslategrey: true,
        darkturquoise: true,
        darkviolet: true,
        deeppink: true,
        deepskyblue: true,
        dimgray: true,
        dimgrey: true,
        dodgerblue: true,
        firebrick: true,
        floralwhite: true,
        forestgreen: true,
        fuchsia: true,
        gainsboro: true,
        ghostwhite: true,
        gold: true,
        goldenrod: true,
        gray: true,
        green: true,
        greenyellow: true,
        grey: true,
        honeydew: true,
        hotpink: true,
        indianred: true,
        indigo: true,
        ivory: true,
        khaki: true,
        lavender: true,
        lavenderblush: true,
        lawngreen: true,
        lemonchiffon: true,
        lightblue: true,
        lightcoral: true,
        lightcyan: true,
        lightgoldenrodyellow: true,
        lightgray: true,
        lightgreen: true,
        lightgrey: true,
        lightpink: true,
        lightsalmon: true,
        lightseagreen: true,
        lightskyblue: true,
        lightslategray: true,
        lightslategrey: true,
        lightsteelblue: true,
        lightyellow: true,
        lime: true,
        limegreen: true,
        linen: true,
        magenta: true,
        maroon: true,
        mediumaquamarine: true,
        mediumblue: true,
        mediumorchid: true,
        mediumpurple: true,
        mediumseagreen: true,
        mediumslateblue: true,
        mediumspringgreen: true,
        mediumturquoise: true,
        mediumvioletred: true,
        midnightblue: true,
        mintcream: true,
        mistyrose: true,
        moccasin: true,
        navajowhite: true,
        navy: true,
        oldlace: true,
        olive: true,
        olivedrab: true,
        orange: true,
        orangered: true,
        orchid: true,
        palegoldenrod: true,
        palegreen: true,
        paleturquoise: true,
        palevioletred: true,
        papayawhip: true,
        peachpuff: true,
        peru: true,
        pink: true,
        plum: true,
        powderblue: true,
        purple: true,
        red: true,
        rosybrown: true,
        royalblue: true,
        saddlebrown: true,
        salmon: true,
        sandybrown: true,
        seagreen: true,
        seashell: true,
        sienna: true,
        silver: true,
        skyblue: true,
        slateblue: true,
        slategray: true,
        slategrey: true,
        snow: true,
        springgreen: true,
        steelblue: true,
        tan: true,
        teal: true,
        thistle: true,
        tomato: true,
        turquoise: true,
        violet: true,
        wheat: true,
        white: true,
        whitesmoke: true,
        yellow: true,
        yellowgreen: true,
        activeborder: true,
        activecaption: true,
        appworkspace: true,
        background: true,
        buttonface: true,
        buttonhighlight: true,
        buttonshadow: true,
        buttontext: true,
        captiontext: true,
        graytext: true,
        highlight: true,
        highlighttext: true,
        inactiveborder: true,
        inactivecaption: true,
        inactivecaptiontext: true,
        infobackground: true,
        infotext: true,
        menu: true,
        menutext: true,
        scrollbar: true,
        threeddarkshadow: true,
        threedface: true,
        threedhighlight: true,
        threedlightshadow: true,
        threedshadow: true,
        window: true,
        windowframe: true,
        windowtext: true
    },
    kLIST_STYLE_TYPE_NAMES: {
        decimal: true,
        "decimal-leading-zero": true,
        "lower-roman": true,
        "upper-roman": true,
        georgian: true,
        armenian: true,
        "lower-latin": true,
        "lower-alpha": true,
        "upper-latin": true,
        "upper-alpha": true,
        "lower-greek": true,
        disc: true,
        circle: true,
        square: true,
        none: true,
        box: true,
        check: true,
        diamond: true,
        hyphen: true,
        "lower-armenian": true,
        "cjk-ideographic": true,
        "ethiopic-numeric": true,
        hebrew: true,
        "japanese-formal": true,
        "japanese-informal": true,
        "simp-chinese-formal": true,
        "simp-chinese-informal": true,
        syriac: true,
        tamil: true,
        "trad-chinese-formal": true,
        "trad-chinese-informal": true,
        "upper-armenian": true,
        "arabic-indic": true,
        binary: true,
        bengali: true,
        cambodian: true,
        khmer: true,
        devanagari: true,
        gujarati: true,
        gurmukhi: true,
        kannada: true,
        "lower-hexadecimal": true,
        lao: true,
        malayalam: true,
        mongolian: true,
        myanmar: true,
        octal: true,
        oriya: true,
        persian: true,
        urdu: true,
        telugu: true,
        tibetan: true,
        "upper-hexadecimal": true,
        afar: true,
        "ethiopic-halehame-aa-et": true,
        "ethiopic-halehame-am-et": true,
        "amharic-abegede": true,
        "ehiopic-abegede-am-et": true,
        "cjk-earthly-branch": true,
        "cjk-heavenly-stem": true,
        ethiopic: true,
        "ethiopic-abegede": true,
        "ethiopic-abegede-gez": true,
        "hangul-consonant": true,
        hangul: true,
        "hiragana-iroha": true,
        hiragana: true,
        "katakana-iroha": true,
        katakana: true,
        "lower-norwegian": true,
        oromo: true,
        "ethiopic-halehame-om-et": true,
        sidama: true,
        "ethiopic-halehame-sid-et": true,
        somali: true,
        "ethiopic-halehame-so-et": true,
        tigre: true,
        "ethiopic-halehame-tig": true,
        "tigrinya-er-abegede": true,
        "ethiopic-abegede-ti-er": true,
        "tigrinya-et": true,
        "ethiopic-halehame-ti-et": true,
        "upper-greek": true,
        asterisks: true,
        footnotes: true,
        "circled-decimal": true,
        "circled-lower-latin": true,
        "circled-upper-latin": true,
        "dotted-decimal": true,
        "double-circled-decimal": true,
        "filled-circled-decimal": true,
        "parenthesised-decimal": true,
        "parenthesised-lower-latin": true
    },
    reportError: function(e) {
        this.mError = e
    },
    consumeError: function() {
        var e = this.mError;
        this.mError = null;
        return e
    },
    currentToken: function() {
        return this.mToken
    },
    getHexValue: function() {
        this.mToken = this.mScanner.nextHexValue();
        return this.mToken
    },
    getToken: function(e, t) {
        if (this.mLookAhead) {
            this.mToken = this.mLookAhead;
            this.mLookAhead = null;
            return this.mToken
        }
        this.mToken = this.mScanner.nextToken();
        while (this.mToken && (e && this.mToken.isWhiteSpace() || t && this.mToken.isComment())) this.mToken = this.mScanner.nextToken();
        return this.mToken
    },
    lookAhead: function(e, t) {
        var n = this.mToken;
        this.mScanner.preserveState();
        var r = this.getToken(e, t);
        this.mScanner.restoreState();
        this.mToken = n;
        return r
    },
    ungetToken: function() {
        this.mLookAhead = this.mToken
    },
    addUnknownAtRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = [];
        var i = this.getToken(false, false);
        while (i.isNotNull()) {
            t += i.value;
            if (i.isSymbol(";") && !r.length) break;
            else if (i.isSymbol("{") || i.isSymbol("(") || i.isSymbol("[") || i.type == "function") {
                r.push(i.isFunction() ? "(" : i.value)
            } else if (i.isSymbol("}") || i.isSymbol(")") || i.isSymbol("]")) {
                if (r.length) {
                    var s = r[r.length - 1];
                    if (i.isSymbol("}") && s == "{" || i.isSymbol(")") && s == "(" || i.isSymbol("]") && s == "[") {
                        r.pop();
                        if (!r.length && i.isSymbol("}")) break
                    }
                }
            }
            i = this.getToken(false, false)
        }
        this.addUnknownRule(e, t, n)
    },
    addUnknownRule: function(e, t, n) {
        var r = this.consumeError();
        var i = new jscsspErrorRule(r);
        i.currentLine = n;
        i.parsedCssText = t;
        i.parentStyleSheet = e;
        e.cssRules.push(i)
    },
    addWhitespace: function(e, t) {
        var n = new jscsspWhitespace;
        n.parsedCssText = t;
        n.parentStyleSheet = e;
        e.cssRules.push(n)
    },
    addComment: function(e, t) {
        var n = new jscsspComment;
        n.parsedCssText = t;
        n.parentStyleSheet = e;
        e.cssRules.push(n)
    },
    parseCharsetRule: function(e, t) {
        var n = e.value;
        var r = this.getToken(false, false);
        n += r.value;
        if (r.isWhiteSpace(" ")) {
            r = this.getToken(false, false);
            n += r.value;
            if (r.isString()) {
                var i = r.value;
                r = this.getToken(false, false);
                n += r.value;
                if (r.isSymbol(";")) {
                    var s = new jscsspCharsetRule;
                    s.encoding = i;
                    s.parsedCssText = n;
                    s.parentStyleSheet = t;
                    t.cssRules.push(s);
                    return true
                } else this.reportError(kCHARSET_RULE_MISSING_SEMICOLON)
            } else this.reportError(kCHARSET_RULE_CHARSET_IS_STRING)
        } else this.reportError(kCHARSET_RULE_MISSING_WS);
        this.addUnknownAtRule(t, n);
        return false
    },
    parseImportRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = e.value;
        this.preserveState();
        var i = this.getToken(true, true);
        var s = [];
        var o = "";
        if (i.isString()) {
            o = i.value;
            r += " " + o
        } else if (i.isFunction("url(")) {
            i = this.getToken(true, true);
            var u = this.parseURL(i);
            if (u) {
                o = "url(" + u;
                r += " " + o
            }
        } else this.reportError(kIMPORT_RULE_MISSING_URL);
        if (o) {
            i = this.getToken(true, true);
            while (i.isIdent()) {
                r += " " + i.value;
                s.push(i.value);
                i = this.getToken(true, true);
                if (!i) break;
                if (i.isSymbol(",")) {
                    r += ","
                } else if (i.isSymbol(";")) {
                    break
                } else break;
                i = this.getToken(true, true)
            }
            if (!s.length) {
                s.push("all")
            }
            if (i.isSymbol(";")) {
                r += ";";
                this.forgetState();
                var a = new jscsspImportRule;
                a.currentLine = n;
                a.parsedCssText = r;
                a.href = o;
                a.media = s;
                a.parentStyleSheet = t;
                t.cssRules.push(a);
                return true
            }
        }
        this.restoreState();
        this.addUnknownAtRule(t, "@import");
        return false
    },
    parseVariablesRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = e.value;
        var i = [];
        var s = false;
        this.preserveState();
        e = this.getToken(true, true);
        var o = [];
        var u = false;
        while (e.isNotNull()) {
            if (e.isIdent()) {
                u = true;
                r += " " + e.value;
                o.push(e.value);
                e = this.getToken(true, true);
                if (e.isSymbol(",")) {
                    r += ","
                } else {
                    if (e.isSymbol("{")) this.ungetToken();
                    else {
                        e.type = jscsspToken.NULL_TYPE;
                        break
                    }
                }
            } else if (e.isSymbol("{")) break;
            else if (u) {
                e.type = jscsspToken.NULL_TYPE;
                break
            }
            e = this.getToken(true, true)
        }
        if (e.isSymbol("{")) {
            r += " {";
            e = this.getToken(true, true);
            while (true) {
                if (!e.isNotNull()) {
                    s = true;
                    break
                }
                if (e.isSymbol("}")) {
                    r += "}";
                    s = true;
                    break
                } else {
                    var a = this.parseDeclaration(e, i, true, false, t);
                    r += (a && i.length ? " " : "") + a
                }
                e = this.getToken(true, false)
            }
        }
        if (s) {
            this.forgetState();
            var f = new jscsspVariablesRule;
            f.currentLine = n;
            f.parsedCssText = r;
            f.declarations = i;
            f.media = o;
            f.parentStyleSheet = t;
            t.cssRules.push(f);
            return true
        }
        this.restoreState();
        return false
    },
    parseNamespaceRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = e.value;
        var i = false;
        this.preserveState();
        var s = this.getToken(true, true);
        if (s.isNotNull()) {
            var o = "";
            var u = "";
            if (s.isIdent()) {
                o = s.value;
                r += " " + o;
                s = this.getToken(true, true)
            }
            if (s) {
                var a = false;
                if (s.isString()) {
                    a = true;
                    u = s.value;
                    r += " " + u
                } else if (s.isFunction("url(")) {
                    s = this.getToken(true, true);
                    var f = this.parseURL(s);
                    if (f) {
                        u += "url(" + f;
                        a = true;
                        r += " " + f
                    }
                }
            }
            if (a) {
                s = this.getToken(true, true);
                if (s.isSymbol(";")) {
                    r += ";";
                    this.forgetState();
                    var l = new jscsspNamespaceRule;
                    l.currentLine = n;
                    l.parsedCssText = r;
                    l.prefix = o;
                    l.url = u;
                    l.parentStyleSheet = t;
                    t.cssRules.push(l);
                    return true
                }
            }
        }
        this.restoreState();
        this.addUnknownAtRule(t, "@namespace");
        return false
    },
    parseFontFaceRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = e.value;
        var i = false;
        var s = [];
        this.preserveState();
        var o = this.getToken(true, true);
        if (o.isNotNull()) {
            if (o.isSymbol("{")) {
                r += " " + o.value;
                var o = this.getToken(true, false);
                while (true) {
                    if (o.isSymbol("}")) {
                        r += "}";
                        i = true;
                        break
                    } else {
                        var u = this.parseDeclaration(o, s, false, false, t);
                        r += (u && s.length ? " " : "") + u
                    }
                    o = this.getToken(true, false)
                }
            }
        }
        if (i) {
            this.forgetState();
            var a = new jscsspFontFaceRule;
            a.currentLine = n;
            a.parsedCssText = r;
            a.descriptors = s;
            a.parentStyleSheet = t;
            t.cssRules.push(a);
            return true
        }
        this.restoreState();
        return false
    },
    parsePageRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = e.value;
        var i = false;
        var s = [];
        this.preserveState();
        var o = this.getToken(true, true);
        var u = "";
        if (o.isSymbol(":") || o.isIdent()) {
            if (o.isSymbol(":")) {
                u = ":";
                o = this.getToken(false, false)
            }
            if (o.isIdent()) {
                u += o.value;
                r += " " + u;
                o = this.getToken(true, true)
            }
        }
        if (o.isNotNull()) {
            if (o.isSymbol("{")) {
                r += " " + o.value;
                var o = this.getToken(true, false);
                while (true) {
                    if (o.isSymbol("}")) {
                        r += "}";
                        i = true;
                        break
                    } else {
                        var a = this.parseDeclaration(o, s, true, true, t);
                        r += (a && s.length ? " " : "") + a
                    }
                    o = this.getToken(true, false)
                }
            }
        }
        if (i) {
            this.forgetState();
            var f = new jscsspPageRule;
            f.currentLine = n;
            f.parsedCssText = r;
            f.pageSelector = u;
            f.declarations = s;
            f.parentStyleSheet = t;
            t.cssRules.push(f);
            return true
        }
        this.restoreState();
        return false
    },
    parseDefaultPropertyValue: function(e, t, n, r, i) {
        var s = "";
        var o = [];
        var u = false;
        var a = [];
        while (e.isNotNull()) {
            if ((e.isSymbol(";") || e.isSymbol("}") || e.isSymbol("!")) && !o.length) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            }
            if (e.isIdent(this.kINHERIT)) {
                if (a.length) {
                    return ""
                } else {
                    s = this.kINHERIT;
                    var f = new jscsspVariable(kJscsspINHERIT_VALUE, i);
                    a.push(f);
                    e = this.getToken(true, true);
                    break
                }
            } else if (e.isSymbol("{") || e.isSymbol("(") || e.isSymbol("[")) {
                o.push(e.value)
            } else if (e.isSymbol("}") || e.isSymbol("]")) {
                if (o.length) {
                    var l = o[o.length - 1];
                    if (e.isSymbol("}") && l == "{" || e.isSymbol(")") && l == "(" || e.isSymbol("]") && l == "[") {
                        o.pop()
                    }
                }
            }
            if (e.isFunction()) {
                if (e.isFunction("var(")) {
                    e = this.getToken(true, true);
                    if (e.isIdent()) {
                        var c = e.value;
                        e = this.getToken(true, true);
                        if (e.isSymbol(")")) {
                            var f = new jscsspVariable(kJscsspVARIABLE_VALUE, i);
                            s += "var(" + c + ")";
                            f.name = c;
                            a.push(f)
                        } else return ""
                    } else return ""
                } else {
                    var h = e.value;
                    e = this.getToken(false, true);
                    var p = this.parseFunctionArgument(e);
                    if (p) {
                        s += h + p;
                        var f = new jscsspVariable(kJscsspPRIMITIVE_VALUE, i);
                        f.value = h + p;
                        a.push(f)
                    } else return ""
                }
            } else if (e.isSymbol("#")) {
                var d = this.parseColor(e);
                if (d) {
                    s += d;
                    var f = new jscsspVariable(kJscsspPRIMITIVE_VALUE, i);
                    f.value = d;
                    a.push(f)
                } else return ""
            } else if (!e.isWhiteSpace() && !e.isSymbol(",")) {
                var f = new jscsspVariable(kJscsspPRIMITIVE_VALUE, i);
                f.value = e.value;
                a.push(f);
                s += e.value
            } else s += e.value;
            e = this.getToken(false, true)
        }
        if (a.length && s) {
            this.forgetState();
            t.push(this._createJscsspDeclarationFromValuesArray(r, a, s));
            return s
        }
        return ""
    },
    parseMarginOrPaddingShorthand: function(e, t, n, r) {
        var i = null;
        var s = null;
        var o = null;
        var u = null;
        var a = [];
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!a.length && e.isIdent(this.kINHERIT)) {
                a.push(e.value);
                e = this.getToken(true, true);
                break
            } else if (e.isDimension() || e.isNumber("0") || e.isPercentage() || e.isIdent("auto")) {
                a.push(e.value)
            } else return "";
            e = this.getToken(true, true)
        }
        var f = a.length;
        switch (f) {
        case 1:
            i = a[0];
            s = i;
            o = i;
            u = i;
            break;
        case 2:
            i = a[0];
            s = i;
            o = a[1];
            u = o;
            break;
        case 3:
            i = a[0];
            o = a[1];
            u = o;
            s = a[2];
            break;
        case 4:
            i = a[0];
            u = a[1];
            s = a[2];
            o = a[3];
            break;
        default:
            return ""
        }
        this.forgetState();
        t.push(this._createJscsspDeclarationFromValue(r + "-top", i));
        t.push(this._createJscsspDeclarationFromValue(r + "-right", u));
        t.push(this._createJscsspDeclarationFromValue(r + "-bottom", s));
        t.push(this._createJscsspDeclarationFromValue(r + "-left", o));
        return i + " " + u + " " + s + " " + o
    },
    parseBorderColorShorthand: function(e, t, n) {
        var r = null;
        var i = null;
        var s = null;
        var o = null;
        var u = [];
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!u.length && e.isIdent(this.kINHERIT)) {
                u.push(e.value);
                e = this.getToken(true, true);
                break
            } else {
                var a = this.parseColor(e);
                if (a) u.push(a);
                else return ""
            }
            e = this.getToken(true, true)
        }
        var f = u.length;
        switch (f) {
        case 1:
            r = u[0];
            i = r;
            s = r;
            o = r;
            break;
        case 2:
            r = u[0];
            i = r;
            s = u[1];
            o = s;
            break;
        case 3:
            r = u[0];
            s = u[1];
            o = s;
            i = u[2];
            break;
        case 4:
            r = u[0];
            o = u[1];
            i = u[2];
            s = u[3];
            break;
        default:
            return ""
        }
        this.forgetState();
        t.push(this._createJscsspDeclarationFromValue("border-top-color", r));
        t.push(this._createJscsspDeclarationFromValue("border-right-color", o));
        t.push(this._createJscsspDeclarationFromValue("border-bottom-color", i));
        t.push(this._createJscsspDeclarationFromValue("border-left-color", s));
        return r + " " + o + " " + i + " " + s
    },
    parseCueShorthand: function(e, t, n) {
        var r = "";
        var i = "";
        var s = [];
        var s = [];
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!s.length && e.isIdent(this.kINHERIT)) {
                s.push(e.value)
            } else if (e.isIdent("none")) s.push(e.value);
            else if (e.isFunction("url(")) {
                var e = this.getToken(true, true);
                var o = this.parseURL(e);
                if (o) s.push("url(" + o);
                else return ""
            } else return "";
            e = this.getToken(true, true)
        }
        var u = s.length;
        switch (u) {
        case 1:
            r = s[0];
            i = r;
            break;
        case 2:
            r = s[0];
            i = s[1];
            break;
        default:
            return ""
        }
        this.forgetState();
        aDecl.push(this._createJscsspDeclarationFromValue("cue-before", r));
        aDecl.push(this._createJscsspDeclarationFromValue("cue-after", i));
        return r + " " + i
    },
    parsePauseShorthand: function(e, t, n) {
        var r = "";
        var i = "";
        var s = [];
        var s = [];
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!s.length && e.isIdent(this.kINHERIT)) {
                s.push(e.value)
            } else if (e.isDimensionOfUnit("ms") || e.isDimensionOfUnit("s") || e.isPercentage() || e.isNumber("0")) s.push(e.value);
            else return "";
            e = this.getToken(true, true)
        }
        var o = s.length;
        switch (o) {
        case 1:
            r = s[0];
            i = r;
            break;
        case 2:
            r = s[0];
            i = s[1];
            break;
        default:
            return ""
        }
        this.forgetState();
        aDecl.push(this._createJscsspDeclarationFromValue("pause-before", r));
        aDecl.push(this._createJscsspDeclarationFromValue("pause-after", i));
        return r + " " + i
    },
    parseBorderWidthShorthand: function(e, t, n) {
        var r = null;
        var i = null;
        var s = null;
        var o = null;
        var u = [];
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!u.length && e.isIdent(this.kINHERIT)) {
                u.push(e.value)
            } else if (e.isDimension() || e.isNumber("0") || e.isIdent() && e.value in this.kBORDER_WIDTH_NAMES) {
                u.push(e.value)
            } else return "";
            e = this.getToken(true, true)
        }
        var a = u.length;
        switch (a) {
        case 1:
            r = u[0];
            i = r;
            s = r;
            o = r;
            break;
        case 2:
            r = u[0];
            i = r;
            s = u[1];
            o = s;
            break;
        case 3:
            r = u[0];
            s = u[1];
            o = s;
            i = u[2];
            break;
        case 4:
            r = u[0];
            o = u[1];
            i = u[2];
            s = u[3];
            break;
        default:
            return ""
        }
        this.forgetState();
        t.push(this._createJscsspDeclarationFromValue("border-top-width", r));
        t.push(this._createJscsspDeclarationFromValue("border-right-width", o));
        t.push(this._createJscsspDeclarationFromValue("border-bottom-width", i));
        t.push(this._createJscsspDeclarationFromValue("border-left-width", s));
        return r + " " + o + " " + i + " " + s
    },
    parseBorderStyleShorthand: function(e, t, n) {
        var r = null;
        var i = null;
        var s = null;
        var o = null;
        var u = [];
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!u.length && e.isIdent(this.kINHERIT)) {
                u.push(e.value)
            } else if (e.isIdent() && e.value in this.kBORDER_STYLE_NAMES) {
                u.push(e.value)
            } else return "";
            e = this.getToken(true, true)
        }
        var a = u.length;
        switch (a) {
        case 1:
            r = u[0];
            i = r;
            s = r;
            o = r;
            break;
        case 2:
            r = u[0];
            i = r;
            s = u[1];
            o = s;
            break;
        case 3:
            r = u[0];
            s = u[1];
            o = s;
            i = u[2];
            break;
        case 4:
            r = u[0];
            o = u[1];
            i = u[2];
            s = u[3];
            break;
        default:
            return ""
        }
        this.forgetState();
        t.push(this._createJscsspDeclarationFromValue("border-top-style", r));
        t.push(this._createJscsspDeclarationFromValue("border-right-style", o));
        t.push(this._createJscsspDeclarationFromValue("border-bottom-style", i));
        t.push(this._createJscsspDeclarationFromValue("border-left-style", s));
        return r + " " + o + " " + i + " " + s
    },
    parseBorderEdgeOrOutlineShorthand: function(e, t, n, r) {
        function a(e, t, n, r, i, s) {
            t.push(e._createJscsspDeclarationFromValue(n + "-width", r));
            t.push(e._createJscsspDeclarationFromValue(n + "-style", i));
            t.push(e._createJscsspDeclarationFromValue(n + "-color", s))
        }
        var i = null;
        var s = null;
        var o = null;
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!i && !s && !o && e.isIdent(this.kINHERIT)) {
                i = this.kINHERIT;
                s = this.kINHERIT;
                o = this.kINHERIT
            } else if (!i && (e.isDimension() || e.isIdent() && e.value in this.kBORDER_WIDTH_NAMES || e.isNumber("0"))) {
                i = e.value
            } else if (!s && e.isIdent() && e.value in this.kBORDER_STYLE_NAMES) {
                s = e.value
            } else {
                var u = r == "outline" && e.isIdent("invert") ? "invert" : this.parseColor(e);
                if (!o && u) o = u;
                else return ""
            }
            e = this.getToken(true, true)
        }
        this.forgetState();
        i = i ? i : "medium";
        s = s ? s : "none";
        o = o ? o : "-moz-initial";
        if (r == "border") {
            a(this, t, "border-top", i, s, o);
            a(this, t, "border-right", i, s, o);
            a(this, t, "border-bottom", i, s, o);
            a(this, t, "border-left", i, s, o)
        } else a(this, t, r, i, s, o);
        return i + " " + s + " " + o
    },
    parseBackgroundShorthand: function(e, t, n) {
        var r = {
            left: true,
            right: true
        };
        var i = {
            top: true,
            bottom: true
        };
        var s = {
            left: true,
            right: true,
            top: true,
            bottom: true,
            center: true
        };
        var o = null;
        var u = null;
        var a = null;
        var f = null;
        var l = null;
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!o && !u && !a && !f && !l && e.isIdent(this.kINHERIT)) {
                o = this.kINHERIT;
                u = this.kINHERIT;
                a = this.kINHERIT;
                f = this.kINHERIT;
                l = this.kINHERIT
            } else {
                if (!a && (e.isIdent("scroll") || e.isIdent("fixed"))) {
                    a = e.value
                } else if (!l && (e.isIdent() && e.value in s || e.isDimension() || e.isNumber("0") || e.isPercentage())) {
                    l = e.value;
                    e = this.getToken(true, true);
                    if (e.isDimension() || e.isNumber("0") || e.isPercentage()) {
                        l += " " + e.value
                    } else if (e.isIdent() && e.value in s) {
                        if (l in r && e.value in r || l in i && e.value in i) return "";
                        l += " " + e.value
                    } else {
                        this.ungetToken();
                        l += " center"
                    }
                } else if (!u && (e.isIdent("repeat") || e.isIdent("repeat-x") || e.isIdent("repeat-y") || e.isIdent("no-repeat"))) {
                    u = e.value
                } else if (!f && (e.isFunction("url(") || e.isIdent("none"))) {
                    f = e.value;
                    if (e.isFunction("url(")) {
                        e = this.getToken(true, true);
                        var c = this.parseURL(e);
                        if (c) f += c;
                        else return ""
                    }
                } else if (!f && (e.isFunction("-moz-linear-gradient(") || e.isFunction("-moz-radial-gradient(") || e.isFunction("-moz-repeating-linear-gradient(") || e.isFunction("-moz-repeating-radial-gradient("))) {
                    var h = CssInspector.parseGradient(this, e);
                    if (h) f = CssInspector.serializeGradient(h);
                    else return ""
                } else {
                    var p = this.parseColor(e);
                    if (!o && p) o = p;
                    else return ""
                }
            }
            e = this.getToken(true, true)
        }
        this.forgetState();
        o = o ? o : "transparent";
        f = f ? f : "none";
        u = u ? u : "repeat";
        a = a ? a : "scroll";
        l = l ? l : "top left";
        t.push(this._createJscsspDeclarationFromValue("background-color", o));
        t.push(this._createJscsspDeclarationFromValue("background-image", f));
        t.push(this._createJscsspDeclarationFromValue("background-repeat", u));
        t.push(this._createJscsspDeclarationFromValue("background-attachment", a));
        t.push(this._createJscsspDeclarationFromValue("background-position", l));
        return o + " " + f + " " + u + " " + a + " " + l
    },
    parseListStyleShorthand: function(e, t, n) {
        var r = {
            inside: true,
            outside: true
        };
        var i = null;
        var s = null;
        var o = null;
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!i && !s && !o && e.isIdent(this.kINHERIT)) {
                i = this.kINHERIT;
                s = this.kINHERIT;
                o = this.kINHERIT
            } else if (!i && e.isIdent() && e.value in this.kLIST_STYLE_TYPE_NAMES) {
                i = e.value
            } else if (!s && e.isIdent() && e.value in r) {
                s = e.value
            } else if (!o && e.isFunction("url")) {
                e = this.getToken(true, true);
                var u = this.parseURL(e);
                if (u) {
                    o = "url(" + u
                } else return ""
            } else if (!e.isIdent("none")) return "";
            e = this.getToken(true, true)
        }
        this.forgetState();
        i = i ? i : "none";
        o = o ? o : "none";
        s = s ? s : "outside";
        t.push(this._createJscsspDeclarationFromValue("list-style-type", i));
        t.push(this._createJscsspDeclarationFromValue("list-style-position", s));
        t.push(this._createJscsspDeclarationFromValue("list-style-image", o));
        return i + " " + s + " " + o
    },
    parseFontShorthand: function(e, t, n) {
        var r = {
            italic: true,
            oblique: true
        };
        var i = {
            "small-caps": true
        };
        var s = {
            bold: true,
            bolder: true,
            lighter: true,
            100: true,
            200: true,
            300: true,
            400: true,
            500: true,
            600: true,
            700: true,
            800: true,
            900: true
        };
        var o = {
            "xx-small": true,
            "x-small": true,
            small: true,
            medium: true,
            large: true,
            "x-large": true,
            "xx-large": true,
            larger: true,
            smaller: true
        };
        var u = {
            caption: true,
            icon: true,
            menu: true,
            "message-box": true,
            "small-caption": true,
            "status-bar": true
        };
        var a = {
            serif: true,
            "sans-serif": true,
            cursive: true,
            fantasy: true,
            monospace: true
        };
        var f = null;
        var l = null;
        var c = null;
        var h = null;
        var p = null;
        var d = "";
        var v = null;
        var m = [];
        var g = 0;
        while (true) {
            if (!e.isNotNull()) break;
            if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                if (e.isSymbol("}")) this.ungetToken();
                break
            } else if (!f && !l && !c && !h && !p && !d && !v && e.isIdent(this.kINHERIT)) {
                f = this.kINHERIT;
                l = this.kINHERIT;
                c = this.kINHERIT;
                h = this.kINHERIT;
                p = this.kINHERIT;
                d = this.kINHERIT;
                v = this.kINHERIT
            } else {
                if (!v && e.isIdent() && e.value in u) {
                    v = e.value;
                    break
                } else {
                    if (!f && e.isIdent() && e.value in r) {
                        f = e.value
                    } else if (!l && e.isIdent() && e.value in i) {
                        l = e.value
                    } else if (!c && (e.isIdent() || e.isNumber()) && e.value in s) {
                        c = e.value
                    } else if (!h && (e.isIdent() && e.value in o || e.isDimension() || e.isPercentage())) {
                        h = e.value;
                        var e = this.getToken(false, false);
                        if (e.isSymbol("/")) {
                            e = this.getToken(false, false);
                            if (!p && (e.isDimension() || e.isNumber() || e.isPercentage())) {
                                p = e.value
                            } else return ""
                        } else this.ungetToken()
                    } else if (e.isIdent("normal")) {
                        g++;
                        if (g > 3) return ""
                    } else if (!d && (e.isString() || e.isIdent())) {
                        var y = false;
                        while (true) {
                            if (!e.isNotNull()) break;
                            else if (e.isSymbol(";") || n && e.isSymbol("!") || e.isSymbol("}")) {
                                this.ungetToken();
                                break
                            } else if (e.isIdent() && e.value in a) {
                                var b = new jscsspVariable(kJscsspPRIMITIVE_VALUE, null);
                                b.value = e.value;
                                m.push(b);
                                d += e.value;
                                break
                            } else if (e.isString() || e.isIdent()) {
                                var b = new jscsspVariable(kJscsspPRIMITIVE_VALUE, null);
                                b.value = e.value;
                                m.push(b);
                                d += e.value;
                                y = false
                            } else if (!y && e.isSymbol(",")) {
                                d += ", ";
                                y = true
                            } else return "";
                            e = this.getToken(true, true)
                        }
                    } else {
                        return ""
                    }
                }
            }
            e = this.getToken(true, true)
        }
        this.forgetState();
        if (v) {
            t.push(this._createJscsspDeclarationFromValue("font", v));
            return v
        }
        f = f ? f : "normal";
        l = l ? l : "normal";
        c = c ? c : "normal";
        h = h ? h : "medium";
        p = p ? p : "normal";
        d = d ? d : "-moz-initial";
        t.push(this._createJscsspDeclarationFromValue("font-style", f));
        t.push(this._createJscsspDeclarationFromValue("font-variant", l));
        t.push(this._createJscsspDeclarationFromValue("font-weight", c));
        t.push(this._createJscsspDeclarationFromValue("font-size", h));
        t.push(this._createJscsspDeclarationFromValue("line-height", p));
        t.push(this._createJscsspDeclarationFromValuesArray("font-family", m, d));
        return f + " " + l + " " + c + " " + h + "/" + p + " " + d
    },
    _createJscsspDeclaration: function(e, t) {
        var n = new jscsspDeclaration;
        n.property = e;
        n.value = this.trim11(t);
        n.parsedCssText = e + ": " + t + ";";
        return n
    },
    _createJscsspDeclarationFromValue: function(e, t) {
        var n = new jscsspDeclaration;
        n.property = e;
        var r = new jscsspVariable(kJscsspPRIMITIVE_VALUE, null);
        r.value = t;
        n.values = [r];
        n.valueText = t;
        n.parsedCssText = e + ": " + t + ";";
        return n
    },
    _createJscsspDeclarationFromValuesArray: function(e, t, n) {
        var r = new jscsspDeclaration;
        r.property = e;
        r.values = t;
        r.valueText = n;
        r.parsedCssText = e + ": " + n + ";";
        return r
    },
    parseURL: function(e) {
        var t = "";
        if (e.isString()) {
            t += e.value;
            e = this.getToken(true, true)
        } else while (true) {
            if (!e.isNotNull()) {
                this.reportError(kURL_EOF);
                return ""
            }
            if (e.isWhiteSpace()) {
                nextToken = this.lookAhead(true, true);
                if (!nextToken.isSymbol(")")) {
                    this.reportError(kURL_WS_INSIDE);
                    e = this.currentToken();
                    break
                }
            }
            if (e.isSymbol(")")) {
                break
            }
            t += e.value;
            e = this.getToken(false, false)
        }
        if (e.isSymbol(")")) {
            return t + ")"
        }
        return ""
    },
    parseFunctionArgument: function(e) {
        var t = "";
        if (e.isString()) {
            t += e.value;
            e = this.getToken(true, true)
        } else {
            var n = 1;
            while (true) {
                if (!e.isNotNull()) return "";
                if (e.isFunction() || e.isSymbol("(")) n++;
                if (e.isSymbol(")")) {
                    n--;
                    if (!n) break
                }
                t += e.value;
                e = this.getToken(false, false)
            }
        }
        if (e.isSymbol(")")) return t + ")";
        return ""
    },
    parseColor: function(e) {
        var t = "";
        if (e.isFunction("rgb(") || e.isFunction("rgba(")) {
            t = e.value;
            var n = e.isFunction("rgba(");
            e = this.getToken(true, true);
            if (!e.isNumber() && !e.isPercentage()) return "";
            t += e.value;
            e = this.getToken(true, true);
            if (!e.isSymbol(",")) return "";
            t += ", ";
            e = this.getToken(true, true);
            if (!e.isNumber() && !e.isPercentage()) return "";
            t += e.value;
            e = this.getToken(true, true);
            if (!e.isSymbol(",")) return "";
            t += ", ";
            e = this.getToken(true, true);
            if (!e.isNumber() && !e.isPercentage()) return "";
            t += e.value;
            if (n) {
                e = this.getToken(true, true);
                if (!e.isSymbol(",")) return "";
                t += ", ";
                e = this.getToken(true, true);
                if (!e.isNumber()) return "";
                t += e.value
            }
            e = this.getToken(true, true);
            if (!e.isSymbol(")")) return "";
            t += e.value
        } else if (e.isFunction("hsl(") || e.isFunction("hsla(")) {
            t = e.value;
            var r = e.isFunction("hsla(");
            e = this.getToken(true, true);
            if (!e.isNumber()) return "";
            t += e.value;
            e = this.getToken(true, true);
            if (!e.isSymbol(",")) return "";
            t += ", ";
            e = this.getToken(true, true);
            if (!e.isPercentage()) return "";
            t += e.value;
            e = this.getToken(true, true);
            if (!e.isSymbol(",")) return "";
            t += ", ";
            e = this.getToken(true, true);
            if (!e.isPercentage()) return "";
            t += e.value;
            if (r) {
                e = this.getToken(true, true);
                if (!e.isSymbol(",")) return "";
                t += ", ";
                e = this.getToken(true, true);
                if (!e.isNumber()) return "";
                t += e.value
            }
            e = this.getToken(true, true);
            if (!e.isSymbol(")")) return "";
            t += e.value
        } else if (e.isIdent() && e.value in this.kCOLOR_NAMES) t = e.value;
        else if (e.isSymbol("#")) {
            e = this.getHexValue();
            if (!e.isHex()) return "";
            var i = e.value.length;
            if (i != 3 && i != 6) return "";
            if (e.value.match(/[a-fA-F0-9]/g).length != i) return "";
            t = "#" + e.value
        }
        return t
    },
    parseDeclaration: function(e, t, n, r, i) {
        this.preserveState();
        var s = [];
        if (e.isIdent()) {
            var o = e.value.toLowerCase();
            var u = this.getToken(true, true);
            if (u.isSymbol(":")) {
                var u = this.getToken(true, true);
                var a = "";
                var f = [];
                if (r) switch (o) {
                case "background":
                    a = this.parseBackgroundShorthand(u, f, n);
                    break;
                case "margin":
                case "padding":
                    a = this.parseMarginOrPaddingShorthand(u, f, n, o);
                    break;
                case "border-color":
                    a = this.parseBorderColorShorthand(u, f, n);
                    break;
                case "border-style":
                    a = this.parseBorderStyleShorthand(u, f, n);
                    break;
                case "border-width":
                    a = this.parseBorderWidthShorthand(u, f, n);
                    break;
                case "border-top":
                case "border-right":
                case "border-bottom":
                case "border-left":
                case "border":
                case "outline":
                    a = this.parseBorderEdgeOrOutlineShorthand(u, f, n, o);
                    break;
                case "cue":
                    a = this.parseCueShorthand(u, f, n);
                    break;
                case "pause":
                    a = this.parsePauseShorthand(u, f, n);
                    break;
                case "font":
                    a = this.parseFontShorthand(u, f, n);
                    break;
                case "list-style":
                    a = this.parseListStyleShorthand(u, f, n);
                    break;
                default:
                    a = this.parseDefaultPropertyValue(u, f, n, o, i);
                    break
                } else a = this.parseDefaultPropertyValue(u, f, n, o, i);
                u = this.currentToken();
                if (a) {
                    var l = false;
                    if (u.isSymbol("!")) {
                        u = this.getToken(true, true);
                        if (u.isIdent("important")) {
                            l = true;
                            u = this.getToken(true, true);
                            if (u.isSymbol(";") || u.isSymbol("}")) {
                                if (u.isSymbol("}")) this.ungetToken()
                            } else return ""
                        } else return ""
                    } else if (u.isNotNull() && !u.isSymbol(";") && !u.isSymbol("}")) return "";
                    for (var c = 0; c < f.length; c++) {
                        f[c].priority = l;
                        t.push(f[c])
                    }
                    return o + ": " + a + ";"
                }
            }
        } else if (e.isComment()) {
            if (this.mPreserveComments) {
                this.forgetState();
                var h = new jscsspComment;
                h.parsedCssText = e.value;
                t.push(h)
            }
            return e.value
        }
        this.restoreState();
        var p = e.value;
        s = [];
        var u = this.getToken(false, false);
        while (u.isNotNull()) {
            p += u.value;
            if ((u.isSymbol(";") || u.isSymbol("}")) && !s.length) {
                if (u.isSymbol("}")) this.ungetToken();
                break
            } else if (u.isSymbol("{") || u.isSymbol("(") || u.isSymbol("[") || u.isFunction()) {
                s.push(u.isFunction() ? "(" : u.value)
            } else if (u.isSymbol("}") || u.isSymbol(")") || u.isSymbol("]")) {
                if (s.length) {
                    var d = s[s.length - 1];
                    if (u.isSymbol("}") && d == "{" || u.isSymbol(")") && d == "(" || u.isSymbol("]") && d == "[") {
                        s.pop()
                    }
                }
            }
            u = this.getToken(false, false)
        }
        return ""
    },
    parseKeyframesRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = e.value;
        var i = false;
        var s = new jscsspKeyframesRule;
        s.currentLine = n;
        this.preserveState();
        var o = this.getToken(true, true);
        var u = false;
        while (o.isNotNull()) {
            if (o.isIdent()) {
                u = true;
                r += " " + o.value;
                s.name = o.value;
                o = this.getToken(true, true);
                if (o.isSymbol("{")) this.ungetToken();
                else {
                    o.type = jscsspToken.NULL_TYPE;
                    break
                }
            } else if (o.isSymbol("{")) {
                if (!u) {
                    o.type = jscsspToken.NULL_TYPE
                }
                break
            } else {
                o.type = jscsspToken.NULL_TYPE;
                break
            }
            o = this.getToken(true, true)
        }
        if (o.isSymbol("{") && s.name) {
            r += " { ";
            o = this.getToken(true, false);
            while (o.isNotNull()) {
                if (o.isComment() && this.mPreserveComments) {
                    r += " " + o.value;
                    var a = new jscsspComment;
                    a.parsedCssText = o.value;
                    s.cssRules.push(a)
                } else if (o.isSymbol("}")) {
                    i = true;
                    break
                } else {
                    var f = this.parseKeyframeRule(o, s, true);
                    if (f) r += f
                }
                o = this.getToken(true, false)
            }
        }
        if (i) {
            this.forgetState();
            s.currentLine = n;
            s.parsedCssText = r;
            t.cssRules.push(s);
            return true
        }
        this.restoreState();
        return false
    },
    parseKeyframeRule: function(e, t) {
        var n = CountLF(this.mScanner.getAlreadyScanned());
        this.preserveState();
        var r = e;
        var i = "";
        while (r.isNotNull()) {
            if (r.isIdent() || r.isPercentage()) {
                if (r.isIdent() && !r.isIdent("from") && !r.isIdent("to")) {
                    i = "";
                    break
                }
                i += r.value;
                r = this.getToken(true, true);
                if (r.isSymbol("{")) {
                    this.ungetToken();
                    break
                } else if (r.isSymbol(",")) {
                    i += ", "
                } else {
                    i = "";
                    break
                }
            } else {
                i = "";
                break
            }
            r = this.getToken(true, true)
        }
        var s = false;
        var o = [];
        if (i) {
            var u = i;
            r = this.getToken(true, true);
            if (r.isSymbol("{")) {
                u += " { ";
                r = this.getToken(true, false);
                while (true) {
                    if (!r.isNotNull()) {
                        s = true;
                        break
                    }
                    if (r.isSymbol("}")) {
                        u += "}";
                        s = true;
                        break
                    } else {
                        var a = this.parseDeclaration(r, o, true, true, t);
                        u += (a && o.length ? " " : "") + a
                    }
                    r = this.getToken(true, false)
                }
            }
        } else {} if (s) {
            var f = new jscsspKeyframeRule;
            f.currentLine = n;
            f.parsedCssText = u;
            f.declarations = o;
            f.keyText = i;
            f.parentRule = t;
            t.cssRules.push(f);
            return u
        }
        this.restoreState();
        u = this.currentToken().value;
        this.addUnknownAtRule(t, u);
        return ""
    },
    parseMediaRule: function(e, t) {
        this.mScanner.mMediaQueryMode = true;
        var n = CountLF(this.mScanner.getAlreadyScanned());
        var r = e.value;
        var i = false;
        var s = new jscsspMediaRule;
        s.currentLine = n;
        this.preserveState();
        var o = this.getToken(true, true);
        var u = false;
        while (o.isNotNull()) {
            if (o.isIdent()) {
                u = true;
                r += " " + o.value;
                s.media.push(o.value);
                o = this.getToken(true, true);
                if (o.isSymbol(",")) {
                    r += ","
                } else {
                    if (o.isSymbol("{")) this.ungetToken();
                    else {
                        o.type = jscsspToken.NULL_TYPE;
                        break
                    }
                }
            } else if (o.isSymbol("{")) break;
            else if (u) {
                o.type = jscsspToken.NULL_TYPE;
                break
            }
            o = this.getToken(true, true)
        }
        if (o.isSymbol("{") && s.media.length) {
            r += " { ";
            o = this.getToken(true, false);
            while (o.isNotNull()) {
                if (o.isComment() && this.mPreserveComments) {
                    r += " " + o.value;
                    var a = new jscsspComment;
                    a.parsedCssText = o.value;
                    s.cssRules.push(a)
                } else if (o.isSymbol("}")) {
                    i = true;
                    break
                } else {
                    var f = this.parseStyleRule(o, s, true);
                    if (f) r += f
                }
                o = this.getToken(true, false)
            }
        }
        if (i) {
            this.forgetState();
            s.parsedCssText = r;
            t.cssRules.push(s);
            return true
        }
        this.restoreState();
        return false
    },
    trim11: function(e) {
        e = e.replace(/^\s+/, "");
        for (var t = e.length - 1; t >= 0; t--) {
            if (/\S/.test(e.charAt(t))) {
                e = e.substring(0, t + 1);
                break
            }
        }
        return e
    },
    parseStyleRule: function(e, t, n) {
        var r = CountLF(this.mScanner.getAlreadyScanned());
        this.preserveState();
        var i = this.parseSelector(e, false);
        var s = false;
        var o = [];
        if (i) {
            i = this.trim11(i.selector);
            var u = i;
            var a = this.getToken(true, true);
            if (a.isSymbol("{")) {
                u += " { ";
                var a = this.getToken(true, false);
                while (true) {
                    if (!a.isNotNull()) {
                        s = true;
                        break
                    }
                    if (a.isSymbol("}")) {
                        u += "}";
                        s = true;
                        break
                    } else {
                        var f = this.parseDeclaration(a, o, true, true, t);
                        u += (f && o.length ? " " : "") + f
                    }
                    a = this.getToken(true, false)
                }
            }
        } else {} if (s) {
            var l = new jscsspStyleRule;
            l.currentLine = r;
            l.parsedCssText = u;
            l.declarations = o;
            l.mSelectorText = i;
            if (n) l.parentRule = t;
            else l.parentStyleSheet = t;
            t.cssRules.push(l);
            return u
        }
        this.restoreState();
        u = this.currentToken().value;
        this.addUnknownAtRule(t, u);
        return ""
    },
    parseSelector: function(e, t) {
        var n = "";
        var r = {
            a: 0,
            b: 0,
            c: 0,
            d: 0
        };
        var i = true;
        var s = e;
        var o = false;
        var u = false;
        while (true) {
            if (!s.isNotNull()) {
                if (t) return {
                    selector: n,
                    specificity: r
                };
                return ""
            }
            if (!t && s.isSymbol("{")) {
                o = !u;
                if (o) this.ungetToken();
                break
            }
            if (s.isSymbol(",")) {
                n += s.value;
                i = true;
                u = false;
                s = this.getToken(false, true);
                continue
            } else if (!u && (s.isWhiteSpace() || s.isSymbol(">") || s.isSymbol("+") || s.isSymbol("~"))) {
                if (s.isWhiteSpace()) {
                    n += " ";
                    var a = this.lookAhead(true, true);
                    if (!a.isNotNull()) {
                        if (t) return {
                            selector: n,
                            specificity: r
                        };
                        return ""
                    }
                    if (a.isSymbol(">") || a.isSymbol("+") || a.isSymbol("~")) {
                        s = this.getToken(true, true);
                        n += s.value + " ";
                        u = true
                    }
                } else {
                    n += s.value;
                    u = true
                }
                i = true;
                s = this.getToken(true, true);
                continue
            } else {
                var f = this.parseSimpleSelector(s, i, true);
                if (!f) break;
                n += f.selector;
                r.b += f.specificity.b;
                r.c += f.specificity.c;
                r.d += f.specificity.d;
                i = false;
                u = false
            }
            s = this.getToken(false, true)
        }
        if (o) {
            return {
                selector: n,
                specificity: r
            }
        }
        return ""
    },
    isPseudoElement: function(e) {
        switch (e) {
        case "first-letter":
        case "first-line":
        case "before":
        case "after":
        case "marker":
            return true;
            break;
        default:
            return false;
            break
        }
    },
    parseSimpleSelector: function(e, t, n) {
        var r = "";
        var i = {
            a: 0,
            b: 0,
            c: 0,
            d: 0
        };
        if (t && (e.isSymbol("*") || e.isSymbol("|") || e.isIdent())) {
            if (e.isSymbol("*") || e.isIdent()) {
                r += e.value;
                var s = e.isIdent();
                e = this.getToken(false, true);
                if (e.isSymbol("|")) {
                    r += e.value;
                    e = this.getToken(false, true);
                    if (e.isIdent() || e.isSymbol("*")) {
                        r += e.value;
                        if (e.isIdent()) i.d++
                    } else return null
                } else {
                    this.ungetToken();
                    if (s) i.d++
                }
            } else if (e.isSymbol("|")) {
                r += e.value;
                e = this.getToken(false, true);
                if (e.isIdent() || e.isSymbol("*")) {
                    r += e.value;
                    if (e.isIdent()) i.d++
                } else return null
            }
        } else if (e.isSymbol(".") || e.isSymbol("#")) {
            var o = e.isSymbol(".");
            r += e.value;
            e = this.getToken(false, true);
            if (e.isIdent()) {
                r += e.value;
                if (o) i.c++;
                else i.b++
            } else return null
        } else if (e.isSymbol(":")) {
            r += e.value;
            e = this.getToken(false, true);
            if (e.isSymbol(":")) {
                r += e.value;
                e = this.getToken(false, true)
            }
            if (e.isIdent()) {
                r += e.value;
                if (this.isPseudoElement(e.value)) i.d++;
                else i.c++
            } else if (e.isFunction()) {
                r += e.value;
                if (e.isFunction(":not(")) {
                    if (!n) return null;
                    e = this.getToken(true, true);
                    var u = this.parseSimpleSelector(e, t, false);
                    if (!u) return null;
                    else {
                        r += u.selector;
                        e = this.getToken(true, true);
                        if (e.isSymbol(")")) r += ")";
                        else return null
                    }
                    i.c++
                } else {
                    while (true) {
                        e = this.getToken(false, true);
                        if (e.isSymbol(")")) {
                            r += ")";
                            break
                        } else r += e.value
                    }
                    i.c++
                }
            } else return null
        } else if (e.isSymbol("[")) {
            r += "[";
            e = this.getToken(true, true);
            if (e.isIdent() || e.isSymbol("*")) {
                r += e.value;
                var a = this.getToken(true, true);
                if (e.isSymbol("|")) {
                    r += "|";
                    e = this.getToken(true, true);
                    if (e.isIdent()) r += e.value;
                    else return null
                } else this.ungetToken()
            } else if (e.isSymbol("|")) {
                r += "|";
                e = this.getToken(true, true);
                if (e.isIdent()) r += e.value;
                else return null
            } else return null;
            e = this.getToken(true, true);
            if (e.isIncludes() || e.isDashmatch() || e.isBeginsmatch() || e.isEndsmatch() || e.isContainsmatch() || e.isSymbol("=")) {
                r += e.value;
                e = this.getToken(true, true);
                if (e.isString() || e.isIdent()) {
                    r += e.value;
                    e = this.getToken(true, true)
                } else return null;
                if (e.isSymbol("]")) {
                    r += e.value;
                    i.c++
                } else return null
            } else if (e.isSymbol("]")) {
                r += e.value;
                i.c++
            } else return null
        } else if (e.isWhiteSpace()) {
            var f = this.lookAhead(true, true);
            if (f.isSymbol("{")) return ""
        }
        if (r) return {
            selector: r,
            specificity: i
        };
        return null
    },
    preserveState: function() {
        this.mPreservedTokens.push(this.currentToken());
        this.mScanner.preserveState()
    },
    restoreState: function() {
        if (this.mPreservedTokens.length) {
            this.mScanner.restoreState();
            this.mToken = this.mPreservedTokens.pop()
        }
    },
    forgetState: function() {
        if (this.mPreservedTokens.length) {
            this.mScanner.forgetState();
            this.mPreservedTokens.pop()
        }
    },
    parse: function(e, t, n) {
        if (!e) return null;
        this.mPreserveWS = t;
        this.mPreserveComments = n;
        this.mPreservedTokens = [];
        this.mScanner.init(e);
        var r = new jscsspStylesheet;
        var i = this.getToken(false, false);
        if (!i.isNotNull()) return;
        if (i.isAtRule("@charset")) {
            this.parseCharsetRule(i, r);
            i = this.getToken(false, false)
        }
        var s = false;
        var o = false;
        var u = false;
        while (true) {
            if (!i.isNotNull()) break;
            if (i.isWhiteSpace()) {
                if (t) this.addWhitespace(r, i.value)
            } else if (i.isComment()) {
                if (this.mPreserveComments) this.addComment(r, i.value)
            } else if (i.isAtRule()) {
                if (i.isAtRule("@variables")) {
                    if (!o && !s) this.parseVariablesRule(i, r);
                    else {
                        this.reportError(kVARIABLES_RULE_POSITION);
                        this.addUnknownAtRule(r, i.value)
                    }
                } else if (i.isAtRule("@import")) {
                    if (!s && !u) o = this.parseImportRule(i, r);
                    else {
                        this.reportError(kIMPORT_RULE_POSITION);
                        this.addUnknownAtRule(r, i.value)
                    }
                } else if (i.isAtRule("@namespace")) {
                    if (!s) u = this.parseNamespaceRule(i, r);
                    else {
                        this.reportError(kNAMESPACE_RULE_POSITION);
                        this.addUnknownAtRule(r, i.value)
                    }
                } else if (i.isAtRule("@font-face")) {
                    if (this.parseFontFaceRule(i, r)) s = true;
                    else this.addUnknownAtRule(r, i.value)
                } else if (i.isAtRule("@page")) {
                    if (this.parsePageRule(i, r)) s = true;
                    else this.addUnknownAtRule(r, i.value)
                } else if (i.isAtRule("@media")) {
                    if (this.parseMediaRule(i, r)) s = true;
                    else this.addUnknownAtRule(r, i.value)
                } else if (i.isAtRule("@keyframes")) {
                    if (!this.parseKeyframesRule(i, r)) this.addUnknownAtRule(r, i.value)
                } else if (i.isAtRule("@charset")) {
                    this.reportError(kCHARSET_RULE_CHARSET_SOF);
                    this.addUnknownAtRule(r, i.value)
                } else {
                    this.reportError(kUNKNOWN_AT_RULE);
                    this.addUnknownAtRule(r, i.value)
                }
            } else {
                var a = this.parseStyleRule(i, r, false);
                if (a) s = true
            }
            i = this.getToken(false)
        }
        return r
    }
};
jscsspToken.NULL_TYPE = 0;
jscsspToken.WHITESPACE_TYPE = 1;
jscsspToken.STRING_TYPE = 2;
jscsspToken.COMMENT_TYPE = 3;
jscsspToken.NUMBER_TYPE = 4;
jscsspToken.IDENT_TYPE = 5;
jscsspToken.FUNCTION_TYPE = 6;
jscsspToken.ATRULE_TYPE = 7;
jscsspToken.INCLUDES_TYPE = 8;
jscsspToken.DASHMATCH_TYPE = 9;
jscsspToken.BEGINSMATCH_TYPE = 10;
jscsspToken.ENDSMATCH_TYPE = 11;
jscsspToken.CONTAINSMATCH_TYPE = 12;
jscsspToken.SYMBOL_TYPE = 13;
jscsspToken.DIMENSION_TYPE = 14;
jscsspToken.PERCENTAGE_TYPE = 15;
jscsspToken.HEX_TYPE = 16;
jscsspToken.prototype = {
    isNotNull: function() {
        return this.type
    },
    _isOfType: function(e, t) {
        return this.type == e && (!t || this.value.toLowerCase() == t)
    },
    isWhiteSpace: function(e) {
        return this._isOfType(jscsspToken.WHITESPACE_TYPE, e)
    },
    isString: function() {
        return this._isOfType(jscsspToken.STRING_TYPE)
    },
    isComment: function() {
        return this._isOfType(jscsspToken.COMMENT_TYPE)
    },
    isNumber: function(e) {
        return this._isOfType(jscsspToken.NUMBER_TYPE, e)
    },
    isSymbol: function(e) {
        return this._isOfType(jscsspToken.SYMBOL_TYPE, e)
    },
    isIdent: function(e) {
        return this._isOfType(jscsspToken.IDENT_TYPE, e)
    },
    isFunction: function(e) {
        return this._isOfType(jscsspToken.FUNCTION_TYPE, e)
    },
    isAtRule: function(e) {
        return this._isOfType(jscsspToken.ATRULE_TYPE, e)
    },
    isIncludes: function() {
        return this._isOfType(jscsspToken.INCLUDES_TYPE)
    },
    isDashmatch: function() {
        return this._isOfType(jscsspToken.DASHMATCH_TYPE)
    },
    isBeginsmatch: function() {
        return this._isOfType(jscsspToken.BEGINSMATCH_TYPE)
    },
    isEndsmatch: function() {
        return this._isOfType(jscsspToken.ENDSMATCH_TYPE)
    },
    isContainsmatch: function() {
        return this._isOfType(jscsspToken.CONTAINSMATCH_TYPE)
    },
    isSymbol: function(e) {
        return this._isOfType(jscsspToken.SYMBOL_TYPE, e)
    },
    isDimension: function() {
        return this._isOfType(jscsspToken.DIMENSION_TYPE)
    },
    isPercentage: function() {
        return this._isOfType(jscsspToken.PERCENTAGE_TYPE)
    },
    isHex: function() {
        return this._isOfType(jscsspToken.HEX_TYPE)
    },
    isDimensionOfUnit: function(e) {
        return this.isDimension() && this.unit == e
    },
    isLength: function() {
        return this.isPercentage() || this.isDimensionOfUnit("cm") || this.isDimensionOfUnit("mm") || this.isDimensionOfUnit("in") || this.isDimensionOfUnit("pc") || this.isDimensionOfUnit("px") || this.isDimensionOfUnit("em") || this.isDimensionOfUnit("ex") || this.isDimensionOfUnit("pt")
    },
    isAngle: function() {
        return this.isDimensionOfUnit("deg") || this.isDimensionOfUnit("rad") || this.isDimensionOfUnit("grad")
    }
};
var kJscsspUNKNOWN_RULE = 0;
var kJscsspSTYLE_RULE = 1;
var kJscsspCHARSET_RULE = 2;
var kJscsspIMPORT_RULE = 3;
var kJscsspMEDIA_RULE = 4;
var kJscsspFONT_FACE_RULE = 5;
var kJscsspPAGE_RULE = 6;
var kJscsspKEYFRAMES_RULE = 7;
var kJscsspKEYFRAME_RULE = 8;
var kJscsspNAMESPACE_RULE = 100;
var kJscsspCOMMENT = 101;
var kJscsspWHITE_SPACE = 102;
var kJscsspVARIABLES_RULE = 200;
var kJscsspSTYLE_DECLARATION = 1e3;
var gTABS = "";
jscsspStylesheet.prototype = {
    insertRule: function(e, t) {
        try {
            this.cssRules.splice(t, 1, e)
        } catch (n) {}
    },
    deleteRule: function(e) {
        try {
            this.cssRules.splice(e)
        } catch (t) {}
    },
    cssText: function() {
        var e = "";
        for (var t = 0; t < this.cssRules.length; t++) e += this.cssRules[t].cssText() + "\n";
        return e
    },
    resolveVariables: function(e) {
        function t(e, t) {
            for (var n = 0; n < e.length; n++) if (t == e[n]) return true;
            return false
        }
        for (var n = 0; n < this.cssRules.length; n++) {
            var r = this.cssRules[n];
            if (r.type == kJscsspSTYLE_RULE || r.type == kJscsspIMPORT_RULE) break;
            else if (r.type == kJscsspVARIABLES_RULE && (!r.media.length || t(r.media, e))) {
                for (var i = 0; i < r.declarations.length; i++) {
                    var s = "";
                    for (var o = 0; o < r.declarations[i].values.length; o++) s += (o ? " " : "") + r.declarations[i].values[o].value;
                    this.variables[r.declarations[i].property] = s
                }
            }
        }
    }
};
jscsspCharsetRule.prototype = {
    cssText: function() {
        return "@charset " + this.encoding + ";"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(false, false);
        if (r.isAtRule("@charset")) {
            if (n.parseCharsetRule(r, t)) {
                var i = t.cssRules[0];
                this.encoding = i.encoding;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspErrorRule.prototype = {
    cssText: function() {
        return this.parsedCssText
    }
};
jscsspComment.prototype = {
    cssText: function() {
        return this.parsedCssText
    },
    setCssText: function(e) {
        var t = new CSSParser(e);
        var n = t.getToken(true, false);
        if (n.isComment()) this.parsedCssText = n.value;
        else throw DOMException.SYNTAX_ERR
    }
};
jscsspWhitespace.prototype = {
    cssText: function() {
        return this.parsedCssText
    }
};
jscsspImportRule.prototype = {
    cssText: function() {
        var e = this.media.join(", ");
        return "@import " + this.href + (e && e != "all" ? e + " " : "") + ";"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (r.isAtRule("@import")) {
            if (n.parseImportRule(r, t)) {
                var i = t.cssRules[0];
                this.href = i.href;
                this.media = i.media;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspNamespaceRule.prototype = {
    cssText: function() {
        return "@namespace " + (this.prefix ? this.prefix + " " : "") + this.url + ";"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (r.isAtRule("@namespace")) {
            if (n.parseNamespaceRule(r, t)) {
                var i = t.cssRules[0];
                this.url = i.url;
                this.prefix = i.prefix;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspDeclaration.prototype = {
    kCOMMA_SEPARATED: {
        cursor: true,
        "font-family": true,
        "voice-family": true,
        "background-image": true
    },
    kUNMODIFIED_COMMA_SEPARATED_PROPERTIES: {
        "text-shadow": true,
        "box-shadow": true,
        "-moz-transition": true,
        "-moz-transition-property": true,
        "-moz-transition-duration": true,
        "-moz-transition-timing-function": true,
        "-moz-transition-delay": true
    },
    cssText: function() {
        var e = CssInspector.prefixesForProperty(this.property);
        if (this.property in this.kUNMODIFIED_COMMA_SEPARATED_PROPERTIES) {
            if (e) {
                var t = "";
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    t += (n ? gTABS : "") + r + ": ";
                    t += this.valueText + (this.priority ? " !important" : "") + ";";
                    t += e.length > 1 && n != e.length - 1 ? "\n" : ""
                }
                return t
            }
            return this.property + ": " + this.valueText + (this.priority ? " !important" : "") + ";"
        }
        if (e) {
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                t += (n ? gTABS : "") + r + ": ";
                var i = r in this.kCOMMA_SEPARATED ? ", " : " ";
                for (var s = 0; s < this.values.length; s++) if (this.values[s].cssText() != null) t += (s ? i : "") + this.values[s].cssText();
                else return null;
                t += (this.priority ? " !important" : "") + ";" + (e.length > 1 && n != e.length - 1 ? "\n" : "")
            }
            return t
        }
        var t = this.property + ": ";
        var i = this.property in this.kCOMMA_SEPARATED ? ", " : " ";
        var o = {
            webkit: false,
            presto: false,
            trident: false,
            generic: false
        };
        for (var s = 0; s < this.values.length; s++) {
            var u = this.values[s].cssText();
            if (u != null) {
                var a = u.indexOf("(");
                var f = u;
                if (a != -1) f = u.substr(0, a);
                if (f in kCSS_VENDOR_VALUES) {
                    for (var l in kCSS_VENDOR_VALUES[f]) {
                        o[l] = o[l] || kCSS_VENDOR_VALUES[f][l] != ""
                    }
                }
                t += (s ? i : "") + u
            } else return null
        }
        t += (this.priority ? " !important" : "") + ";";
        for (var l in o) {
            if (o[l]) {
                var c = "\n" + gTABS + this.property + ": ";
                for (var s = 0; s < this.values.length; s++) {
                    var u = this.values[s].cssText();
                    if (u != null) {
                        var a = u.indexOf("(");
                        var f = u;
                        if (a != -1) f = u.substr(0, a);
                        if (f in kCSS_VENDOR_VALUES) {
                            functor = kCSS_VENDOR_VALUES[f][l];
                            if (functor) {
                                u = typeof functor == "string" ? functor : functor(u, l);
                                if (!u) {
                                    c = null;
                                    break
                                }
                            }
                        }
                        c += (s ? i : "") + u
                    } else return null
                }
                if (c) t += c + ";";
                else t += "\n" + gTABS + "/* Impossible to translate property " + this.property + " for " + l + " */"
            }
        }
        return t
    },
    setCssText: function(e) {
        var t = [];
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (n.parseDeclaration(r, t, true, true, null) && t.length && t[0].type == kJscsspSTYLE_DECLARATION) {
            var i = t.cssRules[0];
            this.property = i.property;
            this.value = i.value;
            this.priority = i.priority;
            this.parsedCssText = newRule.parsedCssText;
            return
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspFontFaceRule.prototype = {
    cssText: function() {
        var e = gTABS + "@font-face {\n";
        var t = gTABS;
        gTABS += "  ";
        for (var n = 0; n < this.descriptors.length; n++) e += gTABS + this.descriptors[n].cssText() + "\n";
        gTABS = t;
        return e + gTABS + "}"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (r.isAtRule("@font-face")) {
            if (n.parseFontFaceRule(r, t)) {
                var i = t.cssRules[0];
                this.descriptors = i.descriptors;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspKeyframesRule.prototype = {
    cssText: function() {
        var e = gTABS + "@keyframes " + this.name + " {\n";
        var t = gTABS;
        gTABS += "  ";
        for (var n = 0; n < this.cssRules.length; n++) e += gTABS + this.cssRules[n].cssText() + "\n";
        gTABS = t;
        e += gTABS + "}\n";
        return e
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (r.isAtRule("@keyframes")) {
            if (n.parseKeyframesRule(r, t)) {
                var i = t.cssRules[0];
                this.cssRules = i.cssRules;
                this.name = i.name;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspKeyframeRule.prototype = {
    cssText: function() {
        var e = this.keyText + " {\n";
        var t = gTABS;
        gTABS += "  ";
        for (var n = 0; n < this.declarations.length; n++) {
            var r = this.declarations[n].cssText();
            if (r) e += gTABS + this.declarations[n].cssText() + "\n"
        }
        gTABS = t;
        return e + gTABS + "}"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (!r.isNotNull()) {
            if (n.parseKeyframeRule(r, t, false)) {
                var i = t.cssRules[0];
                this.keyText = i.keyText;
                this.declarations = i.declarations;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspMediaRule.prototype = {
    cssText: function() {
        var e = gTABS + "@media " + this.media.join(", ") + " {\n";
        var t = gTABS;
        gTABS += "  ";
        for (var n = 0; n < this.cssRules.length; n++) e += gTABS + this.cssRules[n].cssText() + "\n";
        gTABS = t;
        return e + gTABS + "}"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (r.isAtRule("@media")) {
            if (n.parseMediaRule(r, t)) {
                var i = t.cssRules[0];
                this.cssRules = i.cssRules;
                this.media = i.media;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspStyleRule.prototype = {
    cssText: function() {
        var e = this.mSelectorText + " {\n";
        var t = gTABS;
        gTABS += "  ";
        for (var n = 0; n < this.declarations.length; n++) {
            var r = this.declarations[n].cssText();
            if (r) e += gTABS + this.declarations[n].cssText() + "\n"
        }
        gTABS = t;
        return e + gTABS + "}"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (!r.isNotNull()) {
            if (n.parseStyleRule(r, t, false)) {
                var i = t.cssRules[0];
                this.mSelectorText = i.mSelectorText;
                this.declarations = i.declarations;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    },
    selectorText: function() {
        return this.mSelectorText
    },
    setSelectorText: function(e) {
        var t = new CSSParser(e);
        var n = t.getToken(true, true);
        if (!n.isNotNull()) {
            var r = t.parseSelector(n, true);
            if (r) {
                this.mSelectorText = r.selector;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspPageRule.prototype = {
    cssText: function() {
        var e = gTABS + "@page " + (this.pageSelector ? this.pageSelector + " " : "") + "{\n";
        var t = gTABS;
        gTABS += "  ";
        for (var n = 0; n < this.declarations.length; n++) e += gTABS + this.declarations[n].cssText() + "\n";
        gTABS = t;
        return e + gTABS + "}"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (r.isAtRule("@page")) {
            if (n.parsePageRule(r, t)) {
                var i = t.cssRules[0];
                this.pageSelector = i.pageSelector;
                this.declarations = i.declarations;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
jscsspVariablesRule.prototype = {
    cssText: function() {
        var e = gTABS + "@variables " + (this.media.length ? this.media.join(", ") + " " : "") + "{\n";
        var t = gTABS;
        gTABS += "  ";
        for (var n = 0; n < this.declarations.length; n++) e += gTABS + this.declarations[n].cssText() + "\n";
        gTABS = t;
        return e + gTABS + "}"
    },
    setCssText: function(e) {
        var t = {
            cssRules: []
        };
        var n = new CSSParser(e);
        var r = n.getToken(true, true);
        if (r.isAtRule("@variables")) {
            if (n.parseVariablesRule(r, t)) {
                var i = t.cssRules[0];
                this.declarations = i.declarations;
                this.parsedCssText = i.parsedCssText;
                return
            }
        }
        throw DOMException.SYNTAX_ERR
    }
};
var kJscsspINHERIT_VALUE = 0;
var kJscsspPRIMITIVE_VALUE = 1;
var kJscsspVARIABLE_VALUE = 4;
jscsspVariable.prototype = {
    cssText: function() {
        if (this.type == kJscsspVARIABLE_VALUE) return this.resolveVariable(this.name, this.parentRule, this.parentStyleSheet);
        else return this.value
    },
    setCssText: function(e) {
        if (this.type == kJscsspVARIABLE_VALUE) throw DOMException.SYNTAX_ERR;
        else this.value = e
    },
    resolveVariable: function(e, t, n) {
        if (e.toLowerCase() in n.variables) return n.variables[e.toLowerCase()];
        return null
    }
};

// scrolto
(function(d) {
    var k = d.scrollTo = function(a, i, e) {
            d(window).scrollTo(a, i, e)
        };
    k.defaults = {
        axis: 'xy',
        duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1
    };
    k.window = function(a) {
        return d(window)._scrollable()
    };
    d.fn._scrollable = function() {
        return this.map(function() {
            var a = this,
                i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!i) return a;
            var e = (a.contentWindow || a).document || a.ownerDocument || a;
            return d.browser.safari || e.compatMode == 'BackCompat' ? e.body : e.documentElement
        })
    };
    d.fn.scrollTo = function(n, j, b) {
        if (typeof j == 'object') {
            b = j;
            j = 0
        }
        if (typeof b == 'function') b = {
            onAfter: b
        };
        if (n == 'max') n = 9e9;
        b = d.extend({}, k.defaults, b);
        j = j || b.speed || b.duration;
        b.queue = b.queue && b.axis.length > 1;
        if (b.queue) j /= 2;
        b.offset = p(b.offset);
        b.over = p(b.over);
        return this._scrollable().each(function() {
            var q = this,
                r = d(q),
                f = n,
                s, g = {},
                u = r.is('html,body');
            switch (typeof f) {
            case 'number':
            case 'string':
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                    f = p(f);
                    break
                }
                f = d(f, this);
            case 'object':
                if (f.is || f.style) s = (f = d(f)).offset()
            }
            d.each(b.axis.split(''), function(a, i) {
                var e = i == 'x' ? 'Left' : 'Top',
                    h = e.toLowerCase(),
                    c = 'scroll' + e,
                    l = q[c],
                    m = k.max(q, i);
                if (s) {
                    g[c] = s[h] + (u ? 0 : l - r.offset()[h]);
                    if (b.margin) {
                        g[c] -= parseInt(f.css('margin' + e)) || 0;
                        g[c] -= parseInt(f.css('border' + e + 'Width')) || 0
                    }
                    g[c] += b.offset[h] || 0;
                    if (b.over[h]) g[c] += f[i == 'x' ? 'width' : 'height']() * b.over[h]
                } else {
                    var o = f[h];
                    g[c] = o.slice && o.slice(-1) == '%' ? parseFloat(o) / 100 * m : o
                }
                if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m);
                if (!a && b.queue) {
                    if (l != g[c]) t(b.onAfterFirst);
                    delete g[c]
                }
            });
            t(b.onAfter);
            function t(a) {
                r.animate(g, j, b.easing, a &&
                function() {
                    a.call(this, n, b)
                })
            }
        }).end()
    };
    k.max = function(a, i) {
        var e = i == 'x' ? 'Width' : 'Height',
            h = 'scroll' + e;
        if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()]();
        var c = 'client' + e,
            l = a.ownerDocument.documentElement,
            m = a.ownerDocument.body;
        return Math.max(l[h], m[h]) - Math.min(l[c], m[c])
    };
    function p(a) {
        return typeof a == 'object' ? a : {
            top: a,
            left: a
        }
    }
})(jQuery);
// keyboard
(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define(b)
    } else {
        a.KeyboardJS = b()
    }
})(this, function() {
    function o(a) {
        if (b[a]) {
            c = b[a]
        }
    }
    function n(a, c) {
        b[a] = c
    }
    function m() {
        return d
    }
    function l(a) {
        if (a === "all") {
            f = [];
            return
        }
        a = a.replace(/\s/g, "").split(",");
        for (var b = f.length; b > -1; b -= 1) {
            if (f[b]) {
                var c = f[b];
                for (var d = 0; d < c.length; d += 1) {
                    var e = c[d],
                        g = false;
                    for (var h = 0; h < e.keys.length; h += 1) {
                        var i = e.keys[h];
                        for (var j = 0; j < a.length; j += 1) {
                            var k = a[j];
                            if (k === i) {
                                g = true;
                                break
                            }
                        }
                        if (g) {
                            break
                        }
                    }
                    if (g) {
                        f[b].splice(d, 1);
                        d -= 1;
                        if (f[b].length < 1) {
                            delete f[b]
                        }
                    }
                }
            }
        }
    }
    function k(a, b, c, d, e) {
        function f() {
            if (typeof h === "function") {
                h()
            }
            if (typeof i === "function") {
                i()
            }
            if (typeof k === "function") {
                k()
            }
            if (typeof l === "function") {
                l()
            }
            if (typeof m === "function") {
                clearInterval(m)
            }
        }
        var g = [0, 0];
        if (typeof e !== "function") {
            return false
        }
        var h = j(a, function() {
            if (g[0] === 0) {
                g[0] = -1
            }
        }, function() {
            g[0] = 0
        }).clear;
        var i = j(b, function() {
            if (g[0] === 0) {
                g[0] = 1
            }
        }, function() {
            g[0] = 0
        }).clear;
        var k = j(c, function() {
            if (g[1] === 0) {
                g[1] = -1
            }
        }, function() {
            g[1] = 0
        }).clear;
        var l = j(d, function() {
            if (g[1] === 0) {
                g[1] = 1
            }
        }, function() {
            g[1] = 0
        }).clear;
        var m = setInterval(function() {
            if (g[0] === 0 && g[1] === 0) {
                return
            }
            e(g)
        }, 1);
        return {
            clear: f
        }
    }
    function j(a, b, c) {
        function d() {
            if (h && h.length) {
                var a = f[h.length];
                if (a.indexOf(i) > -1) {
                    var b = f[h.length].indexOf(i);
                    f[h.length].splice(b, 1)
                }
            }
        }
        var e = a.toLowerCase().replace(/\s/g, "").split(",");
        for (var g = 0; g < e.length; g += 1) {
            var h = e[g].split("+");
            if (h.length) {
                if (!f[h.length]) {
                    f[h.length] = []
                }
                var i = {
                    callback: b,
                    endCallback: c,
                    keyCombo: e[g],
                    keys: h
                };
                f[h.length].push(i)
            }
        }
        return {
            clear: d
        }
    }
    function i(a) {
        var b = g();
        var c;
        for (var d in e) {
            if (e.hasOwnProperty(d)) {
                var f = e[d],
                    h = false;
                for (var i = 0; i < b.length; i += 1) {
                    var j = b[i].keyCombo;
                    if (j === d) {
                        h = true;
                        break
                    }
                }
                if (!h) {
                    if (typeof f.endCallback === "function") {
                        if (!f.endCallback(a, f.keys, f.keyCombo)) {
                            c = false
                        }
                    }
                    delete e[d]
                }
            }
        }
        return c
    }
    function h(a) {
        if (d < 1) {
            return true
        }
        var b = g(),
            c = [],
            f;
        for (var h = 0; h < b.length; h += 1) {
            var i = b[h],
                j = false;
            for (var k = 0; k < i.keys.length; k += 1) {
                var l = i.keys[k];
                if (c.indexOf(l) > -1) {
                    j = true;
                    break
                }
            }
            if (!j) {
                if (typeof i.callback === "function") {
                    if (!i.callback(a, i.keys, i.keyCombo)) {
                        f = false
                    }
                }
                if (!e[i.keyCombo]) {
                    e[i.keyCombo] = i
                }
                for (var k = 0; k < i.keys.length; k += 1) {
                    var l = i.keys[k];
                    if (c.indexOf(l) < 0) {
                        c.push(l)
                    }
                }
            }
        }
        if (c.length) {
            return false
        }
        return f
    }
    function g() {
        var a = [];
        for (var b = f.length; b > -1; b -= 1) {
            if (f[b]) {
                var c = f[b];
                for (var e = 0; e < c.length; e += 1) {
                    var g = c[e],
                        h = true;
                    for (var i = 0; i < g.keys.length; i += 1) {
                        var j = g.keys[i];
                        if (d.indexOf(j) < 0) {
                            h = false
                        }
                    }
                    if (h) {
                        a.push(g)
                    }
                }
            }
        }
        return a
    }
    function a(a, b, c) {
        if (a.addEventListener) {
            a.addEventListener(b, c, false)
        } else {
            a.attachEvent("on" + b, function(b) {
                return c.call(a, b)
            })
        }
    }[].indexOf || (Array.prototype.indexOf = function(a, b, c) {
        for (c = this.length, b = (c + ~~b) % c; b < c && (!(b in this) || this[b] !== a); b++);
        return b ^ c ? b : -1
    });
    var b = {
        us: {
            backspace: 8,
            tab: 9,
            enter: 13,
            shift: 16,
            ctrl: 17,
            alt: 18,
            pause: 19,
            "break": 19,
            capslock: 20,
            escape: 27,
            esc: 27,
            space: 32,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            insert: 45,
            "delete": 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            meta: 91,
            command: 91,
            windows: 91,
            win: 91,
            _91: 92,
            select: 93,
            num0: 96,
            num1: 97,
            num2: 98,
            num3: 99,
            num4: 100,
            num5: 101,
            num6: 102,
            num7: 103,
            num8: 104,
            num9: 105,
            multiply: 106,
            add: 107,
            subtract: 109,
            decimal: 110,
            divide: 111,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            numlock: 144,
            num: 144,
            scrolllock: 145,
            scroll: 145,
            semicolon: 186,
            equal: 187,
            equalsign: 187,
            comma: 188,
            dash: 189,
            period: 190,
            slash: 191,
            forwardslash: 191,
            graveaccent: 192,
            openbracket: 219,
            backslash: 220,
            closebracket: 221,
            singlequote: 222
        }
    };
    var c = b["us"],
        d = [],
        e = {},
        f = [];
    a(document, "keydown", function(a) {
        for (var b in c) {
            if (c.hasOwnProperty(b) && a.keyCode === c[b]) {
                if (d.indexOf(b) < 0) {
                    d.push(b)
                }
            }
        }
        return h(a)
    });
    a(document, "keyup", function(a) {
        for (var b in c) {
            if (c.hasOwnProperty(b) && a.keyCode === c[b]) {
                var e = d.indexOf(b);
                if (e > -1) {
                    d.splice(e, 1)
                }
            }
        }
        return i(a)
    });
    return {
        bind: {
            key: j,
            axis: k
        },
        activeKeys: m,
        unbind: {
            key: l
        },
        locale: {
            add: n,
            set: o
        }
    }
});
// active
var lastId, topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight(),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function() {
        var e = $($(this).attr("href"));
        if (e.length) {
            return e
        }
    });
menuItems.click(function(e) {
    var t = $(this).attr("href"),
        n = t === "#" ? 0 : $(t).offset().top - topMenuHeight + 1;
    $("html, body").stop().animate({
        scrollTop: n
    }, 300);
    e.preventDefault()
});
$(window).scroll(function() {
    var e = $(this).scrollTop() + topMenuHeight;
    var t = scrollItems.map(function() {
        if ($(this).offset().top < e) return this
    });
    t = t[t.length - 1];
    var n = t && t.length ? t[0].id : "";
    if (lastId !== n) {
        lastId = n;
        menuItems.parent().removeClass("active").end().filter("[href=#" + n + "]").parent().addClass("active")
    }
});
//waypoints 
(function() {
    var t = [].indexOf ||
    function(t) {
        for (var e = 0, n = this.length; e < n; e++) {
            if (e in this && this[e] === t) return e
        }
        return -1
    }, e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, c, a, h, d, p, y, v, w, g, m;
        i = n(r);
        a = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        c = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                this.element[u] = this.id;
                c[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || a)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (a && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete c[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = this.element[w]) != null ? o : [];
                i.push(this.id);
                this.element[w] = i
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = t[w];
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = c[i[0][u]];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke.call(this, "disable")
            },
            enable: function() {
                return d._invoke.call(this, "enable")
            },
            destroy: function() {
                return d._invoke.call(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t) {
                this.each(function() {
                    var e;
                    e = l.getWaypointsByElement(this);
                    return n.each(e, function(e, n) {
                        n[t]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(c, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = c[n(t)[0][u]]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = c[n(t)[0][u]];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);
// jquery ui
(function(e, t) {
    function i(t, i) {
        var s, a, o, r = t.nodeName.toLowerCase();
        return "area" === r ? (s = t.parentNode, a = s.name, t.href && a && "map" === s.nodeName.toLowerCase() ? (o = e("img[usemap=#" + a + "]")[0], !! o && n(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || i : i) && n(t)
    }
    function n(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    var s = 0,
        a = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        focus: function(t) {
            return function(i, n) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), n && n.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        scrollParent: function() {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length) for (var n, s, a = e(this[0]); a.length && a[0] !== document;) {
                if (n = a.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(a.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                a = a.parent()
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++s)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                a.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, n) {
            return !!e.data(t, n[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var n = e.attr(t, "tabindex"),
                s = isNaN(n);
            return (s || n >= 0) && i(t, !s)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, n) {
        function s(t, i, n, s) {
            return e.each(a, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var a = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
            o = n.toLowerCase(),
            r = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn["inner" + n] = function(i) {
            return i === t ? r["inner" + n].call(this) : this.each(function() {
                e(this).css(o, s(this, i) + "px")
            })
        }, e.fn["outer" + n] = function(t, i) {
            return "number" != typeof t ? r["outer" + n].call(this, t) : this.each(function() {
                e(this).css(o, s(this, t, !0, i) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function(t, i, n) {
                var s, a = e.ui[t].prototype;
                for (s in n) a.plugins[s] = a.plugins[s] || [], a.plugins[s].push([i, n[s]])
            },
            call: function(e, t, i) {
                var n, s = e.plugins[t];
                if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (n = 0; s.length > n; n++) e.options[s[n][0]] && s[n][1].apply(e.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow")) return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                s = !1;
            return t[n] > 0 ? !0 : (t[n] = 1, s = t[n] > 0, t[n] = 0, s)
        }
    })
})(jQuery);
(function(t, e) {
    var i = 0,
        s = Array.prototype.slice,
        n = t.cleanData;
    t.cleanData = function(e) {
        for (var i, s = 0; null != (i = e[s]); s++) try {
            t(i).triggerHandler("remove")
        } catch (o) {}
        n(e)
    }, t.widget = function(i, s, n) {
        var o, a, r, h, l = {},
            c = i.split(".")[0];
        i = i.split(".")[1], o = c + "-" + i, n || (n = s, s = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
            return !!t.data(e, o)
        }, t[c] = t[c] || {}, a = t[c][i], r = t[c][i] = function(t, i) {
            return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new r(t, i)
        }, t.extend(r, a, {
            version: n.version,
            _proto: t.extend({}, n),
            _childConstructors: []
        }), h = new s, h.options = t.widget.extend({}, h.options), t.each(n, function(i, n) {
            return t.isFunction(n) ? (l[i] = function() {
                var t = function() {
                        return s.prototype[i].apply(this, arguments)
                    },
                    e = function(t) {
                        return s.prototype[i].apply(this, t)
                    };
                return function() {
                    var i, s = this._super,
                        o = this._superApply;
                    return this._super = t, this._superApply = e, i = n.apply(this, arguments), this._super = s, this._superApply = o, i
                }
            }(), e) : (l[i] = n, e)
        }), r.prototype = t.widget.extend(h, {
            widgetEventPrefix: a ? h.widgetEventPrefix : i
        }, l, {
            constructor: r,
            namespace: c,
            widgetName: i,
            widgetFullName: o
        }), a ? (t.each(a._childConstructors, function(e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, r, i._proto)
        }), delete a._childConstructors) : s._childConstructors.push(r), t.widget.bridge(i, r)
    }, t.widget.extend = function(i) {
        for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++) for (n in a[r]) o = a[r][n], a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
        return i
    }, t.widget.bridge = function(i, n) {
        var o = n.prototype.widgetFullName || i;
        t.fn[i] = function(a) {
            var r = "string" == typeof a,
                h = s.call(arguments, 1),
                l = this;
            return a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a, r ? this.each(function() {
                var s, n = t.data(this, o);
                return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : e) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + a + "'")
            }) : this.each(function() {
                var e = t.data(this, o);
                e ? e.option(a || {})._init() : t.data(this, o, new n(a, this))
            }), l
        }
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, s) {
            s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(t) {
                    t.target === s && this.destroy()
                }
            }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(i, s) {
            var n, o, a, r = i;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof i) if (r = {}, n = i.split("."), i = n.shift(), n.length) {
                for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; n.length - 1 > a; a++) o[n[a]] = o[n[a]] || {}, o = o[n[a]];
                if (i = n.pop(), s === e) return o[i] === e ? null : o[i];
                o[i] = s
            } else {
                if (s === e) return this.options[i] === e ? null : this.options[i];
                r[i] = s
            }
            return this._setOptions(r), this
        },
        _setOptions: function(t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, s, n) {
            var o, a = this;
            "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = o = t(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, o = this.widget()), t.each(n, function(n, r) {
                function h() {
                    return i || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e
                }
                "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/),
                    c = l[1] + a.eventNamespace,
                    u = l[2];
                u ? o.delegate(u, c, h) : s.bind(c, h)
            })
        },
        _off: function(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? s[t] : t).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(s, n, o) {
            "string" == typeof n && (n = {
                effect: n
            });
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = {
                duration: n
            }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
                t(this)[e](), o && o.call(s[0]), i()
            })
        }
    })
})(jQuery);
(function(t) {
    var e = !1;
    t(document).mouseup(function() {
        e = !1
    }), t.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!e) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var s = this,
                    n = 1 === i.which,
                    a = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return s._mouseMove(t)
                }, this._mouseUpDelegate = function(t) {
                    return s._mouseUp(t)
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
            }
        },
        _mouseMove: function(e) {
            return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function(e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
})(jQuery);
(function(t) {
    function e(t) {
        return parseInt(t, 10) || 0
    }
    function i(t) {
        return !isNaN(parseInt(t, 10))
    }
    t.widget("ui.resizable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var e, i, s, n, a, o = this,
                r = this.options;
            if (this.element.addClass("ui-resizable"), t.extend(this, {
                _aspectRatio: !! r.aspectRatio,
                aspectRatio: r.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++) s = t.trim(e[i]), a = "ui-resizable-" + s, n = t("<div class='ui-resizable-handle " + a + "'></div>"), n.css({
                zIndex: r.zIndex
            }), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
            this._renderAxis = function(e) {
                var i, s, n, a;
                e = e || this.element;
                for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = t(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, a), this._proportionallyResize()), t(this.handles[i]).length
            }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : "se")
            }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                r.disabled || (t(this).removeClass("ui-resizable-autohide"), o._handles.show())
            }).mouseleave(function() {
                r.disabled || o.resizing || (t(this).addClass("ui-resizable-autohide"), o._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var e, i = function(e) {
                    t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _mouseCapture: function(e) {
            var i, s, n = !1;
            for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
            return !this.options.disabled && n
        },
        _mouseStart: function(i) {
            var s, n, a, o = this.options,
                r = this.element.position(),
                h = this.element;
            return this.resizing = !0, /absolute/.test(h.css("position")) ? h.css({
                position: "absolute",
                top: h.css("top"),
                left: h.css("left")
            }) : h.is(".ui-draggable") && h.css({
                position: "absolute",
                top: r.top,
                left: r.left
            }), this._renderProxy(), s = e(this.helper.css("left")), n = e(this.helper.css("top")), o.containment && (s += t(o.containment).scrollLeft() || 0, n += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: s,
                top: n
            }, this.size = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            } : {
                width: h.width(),
                height: h.height()
            }, this.originalSize = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            } : {
                width: h.width(),
                height: h.height()
            }, this.originalPosition = {
                left: s,
                top: n
            }, this.sizeDiff = {
                width: h.outerWidth() - h.width(),
                height: h.outerHeight() - h.height()
            }, this.originalMousePosition = {
                left: i.pageX,
                top: i.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, a = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === a ? this.axis + "-resize" : a), h.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
        },
        _mouseDrag: function(e) {
            var i, s = this.helper,
                n = {},
                a = this.originalMousePosition,
                o = this.axis,
                r = this.position.top,
                h = this.position.left,
                l = this.size.width,
                c = this.size.height,
                u = e.pageX - a.left || 0,
                d = e.pageY - a.top || 0,
                p = this._change[o];
            return p ? (i = p.apply(this, [e, u, d]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== r && (n.top = this.position.top + "px"), this.position.left !== h && (n.left = this.position.left + "px"), this.size.width !== l && (n.width = this.size.width + "px"), this.size.height !== c && (n.height = this.size.height + "px"), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || this._trigger("resize", e, this.ui()), !1) : !1
        },
        _mouseStop: function(e) {
            this.resizing = !1;
            var i, s, n, a, o, r, h, l = this.options,
                c = this;
            return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && t.ui.hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, a = s ? 0 : c.sizeDiff.width, o = {
                width: c.helper.width() - a,
                height: c.helper.height() - n
            }, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, h = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(o, {
                top: h,
                left: r
            })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(t) {
            var e, s, n, a, o, r = this.options;
            o = {
                minWidth: i(r.minWidth) ? r.minWidth : 0,
                maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0,
                minHeight: i(r.minHeight) ? r.minHeight : 0,
                maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, s = o.maxHeight * this.aspectRatio, a = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), n > o.minHeight && (o.minHeight = n), o.maxWidth > s && (o.maxWidth = s), o.maxHeight > a && (o.maxHeight = a)), this._vBoundaries = o
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), i(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var e = this.position,
                s = this.size,
                n = this.axis;
            return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (s.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (s.height - t.height), t.left = e.left + (s.width - t.width)), t
        },
        _respectSize: function(t) {
            var e = this._vBoundaries,
                s = this.axis,
                n = i(t.width) && e.maxWidth && e.maxWidth < t.width,
                a = i(t.height) && e.maxHeight && e.maxHeight < t.height,
                o = i(t.width) && e.minWidth && e.minWidth > t.width,
                r = i(t.height) && e.minHeight && e.minHeight > t.height,
                h = this.originalPosition.left + this.originalSize.width,
                l = this.position.top + this.size.height,
                c = /sw|nw|w/.test(s),
                u = /nw|ne|n/.test(s);
            return o && (t.width = e.minWidth), r && (t.height = e.minHeight), n && (t.width = e.maxWidth), a && (t.height = e.maxHeight), o && c && (t.left = h - e.minWidth), n && c && (t.left = h - e.maxWidth), r && u && (t.top = l - e.minHeight), a && u && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var t, e, i, s, n, a = this.helper || this.element;
                for (t = 0; this._proportionallyResizeElements.length > t; t++) {
                    if (n = this._proportionallyResizeElements[t], !this.borderDif) for (this.borderDif = [], i = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], e = 0; i.length > e; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(s[e], 10) || 0);
                    n.css({
                        height: a.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: a.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function() {
            var e = this.element,
                i = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e) {
                var i = this.originalSize,
                    s = this.originalPosition;
                return {
                    left: s.left + e,
                    width: i.width - e
                }
            },
            n: function(t, e, i) {
                var s = this.originalSize,
                    n = this.originalPosition;
                return {
                    top: n.top + i,
                    height: s.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            sw: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            },
            ne: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            nw: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }
        },
        _propagate: function(e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = t(this).data("ui-resizable"),
                s = i.options,
                n = i._proportionallyResizeElements,
                a = n.length && /textarea/i.test(n[0].nodeName),
                o = a && t.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
                r = a ? 0 : i.sizeDiff.width,
                h = {
                    width: i.size.width - r,
                    height: i.size.height - o
                },
                l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(h, c && l ? {
                top: c,
                left: l
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var s = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    n && n.length && t(n[0]).css({
                        width: s.width,
                        height: s.height
                    }), i._updateCache(s), i._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function() {
            var i, s, n, a, o, r, h, l = t(this).data("ui-resizable"),
                c = l.options,
                u = l.element,
                d = c.containment,
                p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
            p && (l.containerElement = t(p), /document/.test(d) || d === document ? (l.containerOffset = {
                left: 0,
                top: 0
            }, l.containerPosition = {
                left: 0,
                top: 0
            }, l.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (i = t(p), s = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
                s[t] = e(i.css("padding" + n))
            }), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {
                height: i.innerHeight() - s[3],
                width: i.innerWidth() - s[1]
            }, n = l.containerOffset, a = l.containerSize.height, o = l.containerSize.width, r = t.ui.hasScroll(p, "left") ? p.scrollWidth : o, h = t.ui.hasScroll(p) ? p.scrollHeight : a, l.parentData = {
                element: p,
                left: n.left,
                top: n.top,
                width: r,
                height: h
            }))
        },
        resize: function(e) {
            var i, s, n, a, o = t(this).data("ui-resizable"),
                r = o.options,
                h = o.containerOffset,
                l = o.position,
                c = o._aspectRatio || e.shiftKey,
                u = {
                    top: 0,
                    left: 0
                },
                d = o.containerElement;
            d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - u.left), c && (o.size.height = o.size.width / o.aspectRatio), o.position.left = r.helper ? h.left : 0), l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), c && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? h.top : 0), o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top, i = Math.abs((o._helper ? o.offset.left - u.left : o.offset.left - u.left) + o.sizeDiff.width), s = Math.abs((o._helper ? o.offset.top - u.top : o.offset.top - h.top) + o.sizeDiff.height), n = o.containerElement.get(0) === o.element.parent().get(0), a = /relative|absolute/.test(o.containerElement.css("position")), n && a && (i -= o.parentData.left), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, c && (o.size.height = o.size.width / o.aspectRatio)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, c && (o.size.width = o.size.height * o.aspectRatio))
        },
        stop: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = e.containerOffset,
                n = e.containerPosition,
                a = e.containerElement,
                o = t(e.helper),
                r = o.offset(),
                h = o.outerWidth() - e.sizeDiff.width,
                l = o.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(a.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: h,
                height: l
            }), e._helper && !i.animate && /static/.test(a.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: h,
                height: l
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = function(e) {
                    t(e).each(function() {
                        var e = t(this);
                        e.data("ui-resizable-alsoresize", {
                            width: parseInt(e.width(), 10),
                            height: parseInt(e.height(), 10),
                            left: parseInt(e.css("left"), 10),
                            top: parseInt(e.css("top"), 10)
                        })
                    })
                };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                s(t)
            })
        },
        resize: function(e, i) {
            var s = t(this).data("ui-resizable"),
                n = s.options,
                a = s.originalSize,
                o = s.originalPosition,
                r = {
                    height: s.size.height - a.height || 0,
                    width: s.size.width - a.width || 0,
                    top: s.position.top - o.top || 0,
                    left: s.position.left - o.left || 0
                },
                h = function(e, s) {
                    t(e).each(function() {
                        var e = t(this),
                            n = t(this).data("ui-resizable-alsoresize"),
                            a = {},
                            o = s && s.length ? s : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        t.each(o, function(t, e) {
                            var i = (n[e] || 0) + (r[e] || 0);
                            i && i >= 0 && (a[e] = i || null)
                        }), e.css(a)
                    })
                };
            "object" != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : t.each(n.alsoResize, function(t, e) {
                h(t, e)
            })
        },
        stop: function() {
            t(this).removeData("resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = e.size;
            e.ghost = e.originalElement.clone(), e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: s.height,
                width: s.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
        },
        resize: function() {
            var e = t(this).data("ui-resizable");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            })
        },
        stop: function() {
            var e = t(this).data("ui-resizable");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = e.size,
                n = e.originalSize,
                a = e.originalPosition,
                o = e.axis,
                r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                h = r[0] || 1,
                l = r[1] || 1,
                c = Math.round((s.width - n.width) / h) * h,
                u = Math.round((s.height - n.height) / l) * l,
                d = n.width + c,
                p = n.height + u,
                f = i.maxWidth && d > i.maxWidth,
                g = i.maxHeight && p > i.maxHeight,
                m = i.minWidth && i.minWidth > d,
                v = i.minHeight && i.minHeight > p;
            i.grid = r, m && (d += h), v && (p += l), f && (d -= h), g && (p -= l), /^(se|s|e)$/.test(o) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.top = a.top - u) : /^(sw)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.left = a.left - c) : (e.size.width = d, e.size.height = p, e.position.top = a.top - u, e.position.left = a.left - c)
        }
    })
})(jQuery);
// scripts
(function() {
    function e() {
        wh = $(window).height();
        ww = $(window).width()
    }
    e();
    $(window).resize(function() {
        e()
    });
    $(".gauche").resizable({
        handles: {
            e: "#handle"
        }
    })
})();
$(document).ready(function() {
    if ($(window).width() >= 700) {
        (function(e, t, n, r) {
            t = e.documentElement;
            n = "className";
            r = "replace";
            t[n] = t[n][r]("info_no", "info_yes");
            if (e.compatMode != "CSS1Compat") t[n] = t[n][r]("i-ua_css_standart", "i-ua_css_quirks")
        })(document);
        function e(e) {
            var t = $(window).scrollTop();
            var n = t + $(window).height();
            var r = $(e).offset().top;
            return r <= n && r >= t
        }
        $(window).scroll(function() {
            $(".info").each(function(t) {
                if (e(this)) {
                    $(this).removeClass("slideRight")
                }
            })
        });
        $("#typo").waypoint(function(e) {
            if (e == "down") {
                $("#app-container").css("fill", "#e0e0e0")
            } else {
                $("#app-container").css("fill", "#fff")
            }
        }, {
            offset: 800
        });
        $("#video").waypoint(function(e) {
            if (e == "down") {
                $("#app-container").css("fill", "fff")
            } else {
                $("#app-container").css("fill", "#e0e0e0")
            }
        }, {
            offset: 800
        });
        $("#typo").waypoint(function(e) {
            if (e == "top") {
                $("#phone").css("opacity", "0")
            } else {
                $("#phone").css("opacity", "1")
            }
        }, {
            offset: 800
        });
        setTimeout(function() {
            $("#iphone-video video").get(0).play()
        }, 0);
        $("#typo").waypoint(function(e) {
            if (e == "down") {
                $("#iphone-video1").css({
                    position: "fixed",
                    opacity: "1"
                });
                setTimeout(function() {
                    $("#iphone-video1 video").get(0).play()
                }, 2e3)
            } else {
                $("#iphone-video1").css({
                    position: "relative",
                    opacity: "0",
                    "-webkit-transition": "none"
                })
            }
        }, {
            offset: 800
        });
        $("#subscribers-waypoint").waypoint(function(e) {
            if (e == "down") {
                $("#iphone-video2").css({
                    position: "fixed",
                    opacity: "1"
                });
                setTimeout(function() {
                    $("#iphone-video2 video").get(0).play()
                }, 1e3)
            } else {
                $("#iphone-video2").css({
                    position: "relative",
                    opacity: "0"
                })
            }
        }, {
            offset: 800
        });
       $("#scheduled-waypoint").waypoint(function(e) {
            if (e == "down") {
                $("#iphone-video3").css({
                    position: "fixed",
                    opacity: "1"
                });
                setTimeout(function() {
                    $("#iphone-video3 video").get(0).play()
                }, 1e3)
            } else {
                $("#iphone-video3").css({
                    position: "relative",
                    opacity: "0"
                })
            }
        }, {
            offset: 800
        });
   
        var t = 1;
        setTimeout(function() {
            $(".md-modal").removeClass("md-show")
        }, 150);
        setTimeout(function() {
            $(".md-modal").removeClass("md-show")
        }, 300);
        setTimeout(function() {
            $(".md-modal").removeClass("md-show")
        }, 1000);
        console.log("ready");
        KeyboardJS.bind.key("down", function(e) {
            t++;
            console.log("key down, going to", t);
            $(document).scrollTo($("ul.key li:nth-child(" + t + ")"), 800);
            e.stopImmediatePropagation();
            e.preventDefault()
        });
        KeyboardJS.bind.key("up", function(e) {
            t--;
            console.log("key up, going to", t);
            $(document).scrollTo($("ul.key li:nth-child(" + t + ")"), 800);
            e.stopImmediatePropagation();
            e.preventDefault()
        });
        $(".md-trigger").click(function() {
            $(".md-modal").addClass("md-show")
        });
        $(".md-modal").click(function() {
            $(this).removeClass("md-show")
        })
    }
})
/*ignore jslint end*/