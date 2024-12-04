var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/leaflet/dist/leaflet-src.js
var require_leaflet_src = __commonJS({
  "node_modules/leaflet/dist/leaflet-src.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.leaflet = {}));
    })(exports, function(exports2) {
      "use strict";
      var version = "1.9.4";
      function extend(dest) {
        var i, j, len, src;
        for (j = 1, len = arguments.length; j < len; j++) {
          src = arguments[j];
          for (i in src) {
            dest[i] = src[i];
          }
        }
        return dest;
      }
      var create$2 = Object.create || /* @__PURE__ */ function() {
        function F() {
        }
        return function(proto) {
          F.prototype = proto;
          return new F();
        };
      }();
      function bind(fn, obj) {
        var slice = Array.prototype.slice;
        if (fn.bind) {
          return fn.bind.apply(fn, slice.call(arguments, 1));
        }
        var args = slice.call(arguments, 2);
        return function() {
          return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
      }
      var lastId = 0;
      function stamp(obj) {
        if (!("_leaflet_id" in obj)) {
          obj["_leaflet_id"] = ++lastId;
        }
        return obj._leaflet_id;
      }
      function throttle(fn, time, context) {
        var lock, args, wrapperFn, later;
        later = function() {
          lock = false;
          if (args) {
            wrapperFn.apply(context, args);
            args = false;
          }
        };
        wrapperFn = function() {
          if (lock) {
            args = arguments;
          } else {
            fn.apply(context, arguments);
            setTimeout(later, time);
            lock = true;
          }
        };
        return wrapperFn;
      }
      function wrapNum(x, range, includeMax) {
        var max = range[1], min = range[0], d = max - min;
        return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
      }
      function falseFn() {
        return false;
      }
      function formatNum(num, precision) {
        if (precision === false) {
          return num;
        }
        var pow = Math.pow(10, precision === void 0 ? 6 : precision);
        return Math.round(num * pow) / pow;
      }
      function trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
      }
      function splitWords(str) {
        return trim(str).split(/\s+/);
      }
      function setOptions(obj, options) {
        if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
          obj.options = obj.options ? create$2(obj.options) : {};
        }
        for (var i in options) {
          obj.options[i] = options[i];
        }
        return obj.options;
      }
      function getParamString(obj, existingUrl, uppercase) {
        var params = [];
        for (var i in obj) {
          params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
        }
        return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
      }
      var templateRe = /\{ *([\w_ -]+) *\}/g;
      function template(str, data) {
        return str.replace(templateRe, function(str2, key) {
          var value = data[key];
          if (value === void 0) {
            throw new Error("No value provided for variable " + str2);
          } else if (typeof value === "function") {
            value = value(data);
          }
          return value;
        });
      }
      var isArray = Array.isArray || function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
      function indexOf(array, el) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === el) {
            return i;
          }
        }
        return -1;
      }
      var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function getPrefixed(name) {
        return window["webkit" + name] || window["moz" + name] || window["ms" + name];
      }
      var lastTime = 0;
      function timeoutDefer(fn) {
        var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
        lastTime = time + timeToCall;
        return window.setTimeout(fn, timeToCall);
      }
      var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
      var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
        window.clearTimeout(id);
      };
      function requestAnimFrame(fn, context, immediate) {
        if (immediate && requestFn === timeoutDefer) {
          fn.call(context);
        } else {
          return requestFn.call(window, bind(fn, context));
        }
      }
      function cancelAnimFrame(id) {
        if (id) {
          cancelFn.call(window, id);
        }
      }
      var Util = {
        __proto__: null,
        extend,
        create: create$2,
        bind,
        get lastId() {
          return lastId;
        },
        stamp,
        throttle,
        wrapNum,
        falseFn,
        formatNum,
        trim,
        splitWords,
        setOptions,
        getParamString,
        template,
        isArray,
        indexOf,
        emptyImageUrl,
        requestFn,
        cancelFn,
        requestAnimFrame,
        cancelAnimFrame
      };
      function Class() {
      }
      Class.extend = function(props) {
        var NewClass = function() {
          setOptions(this);
          if (this.initialize) {
            this.initialize.apply(this, arguments);
          }
          this.callInitHooks();
        };
        var parentProto = NewClass.__super__ = this.prototype;
        var proto = create$2(parentProto);
        proto.constructor = NewClass;
        NewClass.prototype = proto;
        for (var i in this) {
          if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") {
            NewClass[i] = this[i];
          }
        }
        if (props.statics) {
          extend(NewClass, props.statics);
        }
        if (props.includes) {
          checkDeprecatedMixinEvents(props.includes);
          extend.apply(null, [proto].concat(props.includes));
        }
        extend(proto, props);
        delete proto.statics;
        delete proto.includes;
        if (proto.options) {
          proto.options = parentProto.options ? create$2(parentProto.options) : {};
          extend(proto.options, props.options);
        }
        proto._initHooks = [];
        proto.callInitHooks = function() {
          if (this._initHooksCalled) {
            return;
          }
          if (parentProto.callInitHooks) {
            parentProto.callInitHooks.call(this);
          }
          this._initHooksCalled = true;
          for (var i2 = 0, len = proto._initHooks.length; i2 < len; i2++) {
            proto._initHooks[i2].call(this);
          }
        };
        return NewClass;
      };
      Class.include = function(props) {
        var parentOptions = this.prototype.options;
        extend(this.prototype, props);
        if (props.options) {
          this.prototype.options = parentOptions;
          this.mergeOptions(props.options);
        }
        return this;
      };
      Class.mergeOptions = function(options) {
        extend(this.prototype.options, options);
        return this;
      };
      Class.addInitHook = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        var init = typeof fn === "function" ? fn : function() {
          this[fn].apply(this, args);
        };
        this.prototype._initHooks = this.prototype._initHooks || [];
        this.prototype._initHooks.push(init);
        return this;
      };
      function checkDeprecatedMixinEvents(includes) {
        if (typeof L === "undefined" || !L || !L.Mixin) {
          return;
        }
        includes = isArray(includes) ? includes : [includes];
        for (var i = 0; i < includes.length; i++) {
          if (includes[i] === L.Mixin.Events) {
            console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
          }
        }
      }
      var Events = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              this._on(type, types[type], fn);
            }
          } else {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
              this._on(types[i], fn, context);
            }
          }
          return this;
        },
        /* @method off(type: String, fn?: Function, context?: Object): this
         * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
         *
         * @alternative
         * @method off(eventMap: Object): this
         * Removes a set of type/listener pairs.
         *
         * @alternative
         * @method off: this
         * Removes all listeners to all events on the object. This includes implicitly attached events.
         */
        off: function(types, fn, context) {
          if (!arguments.length) {
            delete this._events;
          } else if (typeof types === "object") {
            for (var type in types) {
              this._off(type, types[type], fn);
            }
          } else {
            types = splitWords(types);
            var removeAll = arguments.length === 1;
            for (var i = 0, len = types.length; i < len; i++) {
              if (removeAll) {
                this._off(types[i]);
              } else {
                this._off(types[i], fn, context);
              }
            }
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(type, fn, context, _once) {
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          if (this._listens(type, fn, context) !== false) {
            return;
          }
          if (context === this) {
            context = void 0;
          }
          var newListener = { fn, ctx: context };
          if (_once) {
            newListener.once = true;
          }
          this._events = this._events || {};
          this._events[type] = this._events[type] || [];
          this._events[type].push(newListener);
        },
        _off: function(type, fn, context) {
          var listeners, i, len;
          if (!this._events) {
            return;
          }
          listeners = this._events[type];
          if (!listeners) {
            return;
          }
          if (arguments.length === 1) {
            if (this._firingCount) {
              for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].fn = falseFn;
              }
            }
            delete this._events[type];
            return;
          }
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          var index2 = this._listens(type, fn, context);
          if (index2 !== false) {
            var listener = listeners[index2];
            if (this._firingCount) {
              listener.fn = falseFn;
              this._events[type] = listeners = listeners.slice();
            }
            listeners.splice(index2, 1);
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(type, data, propagate) {
          if (!this.listens(type, propagate)) {
            return this;
          }
          var event = extend({}, data, {
            type,
            target: this,
            sourceTarget: data && data.sourceTarget || this
          });
          if (this._events) {
            var listeners = this._events[type];
            if (listeners) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var i = 0, len = listeners.length; i < len; i++) {
                var l = listeners[i];
                var fn = l.fn;
                if (l.once) {
                  this.off(type, fn, l.ctx);
                }
                fn.call(l.ctx || this, event);
              }
              this._firingCount--;
            }
          }
          if (propagate) {
            this._propagateEvent(event);
          }
          return this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(type, fn, context, propagate) {
          if (typeof type !== "string") {
            console.warn('"string" type argument expected');
          }
          var _fn = fn;
          if (typeof fn !== "function") {
            propagate = !!fn;
            _fn = void 0;
            context = void 0;
          }
          var listeners = this._events && this._events[type];
          if (listeners && listeners.length) {
            if (this._listens(type, _fn, context) !== false) {
              return true;
            }
          }
          if (propagate) {
            for (var id in this._eventParents) {
              if (this._eventParents[id].listens(type, fn, context, propagate)) {
                return true;
              }
            }
          }
          return false;
        },
        // returns the index (number) or false
        _listens: function(type, fn, context) {
          if (!this._events) {
            return false;
          }
          var listeners = this._events[type] || [];
          if (!fn) {
            return !!listeners.length;
          }
          if (context === this) {
            context = void 0;
          }
          for (var i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i].fn === fn && listeners[i].ctx === context) {
              return i;
            }
          }
          return false;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              this._on(type, types[type], fn, true);
            }
          } else {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
              this._on(types[i], fn, context, true);
            }
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(obj) {
          this._eventParents = this._eventParents || {};
          this._eventParents[stamp(obj)] = obj;
          return this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(obj) {
          if (this._eventParents) {
            delete this._eventParents[stamp(obj)];
          }
          return this;
        },
        _propagateEvent: function(e) {
          for (var id in this._eventParents) {
            this._eventParents[id].fire(e.type, extend({
              layer: e.target,
              propagatedFrom: e.target
            }, e), true);
          }
        }
      };
      Events.addEventListener = Events.on;
      Events.removeEventListener = Events.clearAllEventListeners = Events.off;
      Events.addOneTimeEventListener = Events.once;
      Events.fireEvent = Events.fire;
      Events.hasEventListeners = Events.listens;
      var Evented = Class.extend(Events);
      function Point(x, y, round) {
        this.x = round ? Math.round(x) : x;
        this.y = round ? Math.round(y) : y;
      }
      var trunc = Math.trunc || function(v) {
        return v > 0 ? Math.floor(v) : Math.ceil(v);
      };
      Point.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new Point(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(point) {
          return this.clone()._add(toPoint(point));
        },
        _add: function(point) {
          this.x += point.x;
          this.y += point.y;
          return this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(point) {
          return this.clone()._subtract(toPoint(point));
        },
        _subtract: function(point) {
          this.x -= point.x;
          this.y -= point.y;
          return this;
        },
        // @method divideBy(num: Number): Point
        // Returns the result of division of the current point by the given number.
        divideBy: function(num) {
          return this.clone()._divideBy(num);
        },
        _divideBy: function(num) {
          this.x /= num;
          this.y /= num;
          return this;
        },
        // @method multiplyBy(num: Number): Point
        // Returns the result of multiplication of the current point by the given number.
        multiplyBy: function(num) {
          return this.clone()._multiplyBy(num);
        },
        _multiplyBy: function(num) {
          this.x *= num;
          this.y *= num;
          return this;
        },
        // @method scaleBy(scale: Point): Point
        // Multiply each coordinate of the current point by each coordinate of
        // `scale`. In linear algebra terms, multiply the point by the
        // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
        // defined by `scale`.
        scaleBy: function(point) {
          return new Point(this.x * point.x, this.y * point.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(point) {
          return new Point(this.x / point.x, this.y / point.y);
        },
        // @method round(): Point
        // Returns a copy of the current point with rounded coordinates.
        round: function() {
          return this.clone()._round();
        },
        _round: function() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        },
        // @method floor(): Point
        // Returns a copy of the current point with floored coordinates (rounded down).
        floor: function() {
          return this.clone()._floor();
        },
        _floor: function() {
          this.x = Math.floor(this.x);
          this.y = Math.floor(this.y);
          return this;
        },
        // @method ceil(): Point
        // Returns a copy of the current point with ceiled coordinates (rounded up).
        ceil: function() {
          return this.clone()._ceil();
        },
        _ceil: function() {
          this.x = Math.ceil(this.x);
          this.y = Math.ceil(this.y);
          return this;
        },
        // @method trunc(): Point
        // Returns a copy of the current point with truncated coordinates (rounded towards zero).
        trunc: function() {
          return this.clone()._trunc();
        },
        _trunc: function() {
          this.x = trunc(this.x);
          this.y = trunc(this.y);
          return this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(point) {
          point = toPoint(point);
          var x = point.x - this.x, y = point.y - this.y;
          return Math.sqrt(x * x + y * y);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(point) {
          point = toPoint(point);
          return point.x === this.x && point.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(point) {
          point = toPoint(point);
          return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
        }
      };
      function toPoint(x, y, round) {
        if (x instanceof Point) {
          return x;
        }
        if (isArray(x)) {
          return new Point(x[0], x[1]);
        }
        if (x === void 0 || x === null) {
          return x;
        }
        if (typeof x === "object" && "x" in x && "y" in x) {
          return new Point(x.x, x.y);
        }
        return new Point(x, y, round);
      }
      function Bounds(a, b) {
        if (!a) {
          return;
        }
        var points = b ? [a, b] : a;
        for (var i = 0, len = points.length; i < len; i++) {
          this.extend(points[i]);
        }
      }
      Bounds.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var min2, max2;
          if (!obj) {
            return this;
          }
          if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) {
            min2 = max2 = toPoint(obj);
          } else {
            obj = toBounds(obj);
            min2 = obj.min;
            max2 = obj.max;
            if (!min2 || !max2) {
              return this;
            }
          }
          if (!this.min && !this.max) {
            this.min = min2.clone();
            this.max = max2.clone();
          } else {
            this.min.x = Math.min(min2.x, this.min.x);
            this.max.x = Math.max(max2.x, this.max.x);
            this.min.y = Math.min(min2.y, this.min.y);
            this.max.y = Math.max(max2.y, this.max.y);
          }
          return this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(round) {
          return toPoint(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            round
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return toPoint(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return toPoint(this.max.x, this.min.y);
        },
        // @method getTopLeft(): Point
        // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
        getTopLeft: function() {
          return this.min;
        },
        // @method getBottomRight(): Point
        // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
        getBottomRight: function() {
          return this.max;
        },
        // @method getSize(): Point
        // Returns the size of the given bounds
        getSize: function() {
          return this.max.subtract(this.min);
        },
        // @method contains(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains(point: Point): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          var min, max;
          if (typeof obj[0] === "number" || obj instanceof Point) {
            obj = toPoint(obj);
          } else {
            obj = toBounds(obj);
          }
          if (obj instanceof Bounds) {
            min = obj.min;
            max = obj.max;
          } else {
            min = max = obj;
          }
          return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toBounds(bounds);
          var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
          return xIntersects && yIntersects;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toBounds(bounds);
          var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
          return xOverlaps && yOverlaps;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this.min && this.max);
        },
        // @method pad(bufferRatio: Number): Bounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
          return toBounds(
            toPoint(min.x - heightBuffer, min.y - widthBuffer),
            toPoint(max.x + heightBuffer, max.y + widthBuffer)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(bounds) {
          if (!bounds) {
            return false;
          }
          bounds = toBounds(bounds);
          return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
        }
      };
      function toBounds(a, b) {
        if (!a || a instanceof Bounds) {
          return a;
        }
        return new Bounds(a, b);
      }
      function LatLngBounds(corner1, corner2) {
        if (!corner1) {
          return;
        }
        var latlngs = corner2 ? [corner1, corner2] : corner1;
        for (var i = 0, len = latlngs.length; i < len; i++) {
          this.extend(latlngs[i]);
        }
      }
      LatLngBounds.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var sw = this._southWest, ne = this._northEast, sw2, ne2;
          if (obj instanceof LatLng2) {
            sw2 = obj;
            ne2 = obj;
          } else if (obj instanceof LatLngBounds) {
            sw2 = obj._southWest;
            ne2 = obj._northEast;
            if (!sw2 || !ne2) {
              return this;
            }
          } else {
            return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
          }
          if (!sw && !ne) {
            this._southWest = new LatLng2(sw2.lat, sw2.lng);
            this._northEast = new LatLng2(ne2.lat, ne2.lng);
          } else {
            sw.lat = Math.min(sw2.lat, sw.lat);
            sw.lng = Math.min(sw2.lng, sw.lng);
            ne.lat = Math.max(ne2.lat, ne.lat);
            ne.lng = Math.max(ne2.lng, ne.lng);
          }
          return this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
          return new LatLngBounds(
            new LatLng2(sw.lat - heightBuffer, sw.lng - widthBuffer),
            new LatLng2(ne.lat + heightBuffer, ne.lng + widthBuffer)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new LatLng2(
            (this._southWest.lat + this._northEast.lat) / 2,
            (this._southWest.lng + this._northEast.lng) / 2
          );
        },
        // @method getSouthWest(): LatLng
        // Returns the south-west point of the bounds.
        getSouthWest: function() {
          return this._southWest;
        },
        // @method getNorthEast(): LatLng
        // Returns the north-east point of the bounds.
        getNorthEast: function() {
          return this._northEast;
        },
        // @method getNorthWest(): LatLng
        // Returns the north-west point of the bounds.
        getNorthWest: function() {
          return new LatLng2(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new LatLng2(this.getSouth(), this.getEast());
        },
        // @method getWest(): Number
        // Returns the west longitude of the bounds
        getWest: function() {
          return this._southWest.lng;
        },
        // @method getSouth(): Number
        // Returns the south latitude of the bounds
        getSouth: function() {
          return this._southWest.lat;
        },
        // @method getEast(): Number
        // Returns the east longitude of the bounds
        getEast: function() {
          return this._northEast.lng;
        },
        // @method getNorth(): Number
        // Returns the north latitude of the bounds
        getNorth: function() {
          return this._northEast.lat;
        },
        // @method contains(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains (latlng: LatLng): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          if (typeof obj[0] === "number" || obj instanceof LatLng2 || "lat" in obj) {
            obj = toLatLng(obj);
          } else {
            obj = toLatLngBounds(obj);
          }
          var sw = this._southWest, ne = this._northEast, sw2, ne2;
          if (obj instanceof LatLngBounds) {
            sw2 = obj.getSouthWest();
            ne2 = obj.getNorthEast();
          } else {
            sw2 = ne2 = obj;
          }
          return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
          return latIntersects && lngIntersects;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
          return latOverlaps && lngOverlaps;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(bounds, maxMargin) {
          if (!bounds) {
            return false;
          }
          bounds = toLatLngBounds(bounds);
          return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function toLatLngBounds(a, b) {
        if (a instanceof LatLngBounds) {
          return a;
        }
        return new LatLngBounds(a, b);
      }
      function LatLng2(lat, lng, alt) {
        if (isNaN(lat) || isNaN(lng)) {
          throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
        }
        this.lat = +lat;
        this.lng = +lng;
        if (alt !== void 0) {
          this.alt = +alt;
        }
      }
      LatLng2.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(obj, maxMargin) {
          if (!obj) {
            return false;
          }
          obj = toLatLng(obj);
          var margin = Math.max(
            Math.abs(this.lat - obj.lat),
            Math.abs(this.lng - obj.lng)
          );
          return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(precision) {
          return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(other) {
          return Earth.distance(this, toLatLng(other));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Earth.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(sizeInMeters) {
          var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
          return toLatLngBounds(
            [this.lat - latAccuracy, this.lng - lngAccuracy],
            [this.lat + latAccuracy, this.lng + lngAccuracy]
          );
        },
        clone: function() {
          return new LatLng2(this.lat, this.lng, this.alt);
        }
      };
      function toLatLng(a, b, c) {
        if (a instanceof LatLng2) {
          return a;
        }
        if (isArray(a) && typeof a[0] !== "object") {
          if (a.length === 3) {
            return new LatLng2(a[0], a[1], a[2]);
          }
          if (a.length === 2) {
            return new LatLng2(a[0], a[1]);
          }
          return null;
        }
        if (a === void 0 || a === null) {
          return a;
        }
        if (typeof a === "object" && "lat" in a) {
          return new LatLng2(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
        }
        if (b === void 0) {
          return null;
        }
        return new LatLng2(a, b, c);
      }
      var CRS = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(latlng, zoom2) {
          var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
          return this.transformation._transform(projectedPoint, scale2);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(point, zoom2) {
          var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
          return this.projection.unproject(untransformedPoint);
        },
        // @method project(latlng: LatLng): Point
        // Projects geographical coordinates into coordinates in units accepted for
        // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
        project: function(latlng) {
          return this.projection.project(latlng);
        },
        // @method unproject(point: Point): LatLng
        // Given a projected coordinate returns the corresponding LatLng.
        // The inverse of `project`.
        unproject: function(point) {
          return this.projection.unproject(point);
        },
        // @method scale(zoom: Number): Number
        // Returns the scale used when transforming projected coordinates into
        // pixel coordinates for a particular zoom. For example, it returns
        // `256 * 2^zoom` for Mercator-based CRS.
        scale: function(zoom2) {
          return 256 * Math.pow(2, zoom2);
        },
        // @method zoom(scale: Number): Number
        // Inverse of `scale()`, returns the zoom level corresponding to a scale
        // factor of `scale`.
        zoom: function(scale2) {
          return Math.log(scale2 / 256) / Math.LN2;
        },
        // @method getProjectedBounds(zoom: Number): Bounds
        // Returns the projection's bounds scaled and transformed for the provided `zoom`.
        getProjectedBounds: function(zoom2) {
          if (this.infinite) {
            return null;
          }
          var b = this.projection.bounds, s = this.scale(zoom2), min = this.transformation.transform(b.min, s), max = this.transformation.transform(b.max, s);
          return new Bounds(min, max);
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates.
        // @property code: String
        // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
        //
        // @property wrapLng: Number[]
        // An array of two numbers defining whether the longitude (horizontal) coordinate
        // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
        // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
        //
        // @property wrapLat: Number[]
        // Like `wrapLng`, but for the latitude (vertical) axis.
        // wrapLng: [min, max],
        // wrapLat: [min, max],
        // @property infinite: Boolean
        // If true, the coordinate space will be unbounded (infinite in both axes)
        infinite: false,
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where lat and lng has been wrapped according to the
        // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
        wrapLatLng: function(latlng) {
          var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
          return new LatLng2(lat, lng, alt);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(bounds) {
          var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
          if (latShift === 0 && lngShift === 0) {
            return bounds;
          }
          var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng2(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng2(ne.lat - latShift, ne.lng - lngShift);
          return new LatLngBounds(newSw, newNe);
        }
      };
      var Earth = extend({}, CRS, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(latlng1, latlng2) {
          var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return this.R * c;
        }
      });
      var earthRadius = 6378137;
      var SphericalMercator = {
        R: earthRadius,
        MAX_LATITUDE: 85.0511287798,
        project: function(latlng) {
          var d = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
          return new Point(
            this.R * latlng.lng * d,
            this.R * Math.log((1 + sin) / (1 - sin)) / 2
          );
        },
        unproject: function(point) {
          var d = 180 / Math.PI;
          return new LatLng2(
            (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d,
            point.x * d / this.R
          );
        },
        bounds: function() {
          var d = earthRadius * Math.PI;
          return new Bounds([-d, -d], [d, d]);
        }()
      };
      function Transformation(a, b, c, d) {
        if (isArray(a)) {
          this._a = a[0];
          this._b = a[1];
          this._c = a[2];
          this._d = a[3];
          return;
        }
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
      }
      Transformation.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function(point, scale2) {
          return this._transform(point.clone(), scale2);
        },
        // destructive transform (faster)
        _transform: function(point, scale2) {
          scale2 = scale2 || 1;
          point.x = scale2 * (this._a * point.x + this._b);
          point.y = scale2 * (this._c * point.y + this._d);
          return point;
        },
        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function(point, scale2) {
          scale2 = scale2 || 1;
          return new Point(
            (point.x / scale2 - this._b) / this._a,
            (point.y / scale2 - this._d) / this._c
          );
        }
      };
      function toTransformation(a, b, c, d) {
        return new Transformation(a, b, c, d);
      }
      var EPSG3857 = extend({}, Earth, {
        code: "EPSG:3857",
        projection: SphericalMercator,
        transformation: function() {
          var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        }()
      });
      var EPSG900913 = extend({}, EPSG3857, {
        code: "EPSG:900913"
      });
      function svgCreate(name) {
        return document.createElementNS("http://www.w3.org/2000/svg", name);
      }
      function pointsToPath(rings, closed) {
        var str = "", i, j, len, len2, points, p;
        for (i = 0, len = rings.length; i < len; i++) {
          points = rings[i];
          for (j = 0, len2 = points.length; j < len2; j++) {
            p = points[j];
            str += (j ? "L" : "M") + p.x + " " + p.y;
          }
          str += closed ? Browser.svg ? "z" : "x" : "";
        }
        return str || "M0 0";
      }
      var style = document.documentElement.style;
      var ie = "ActiveXObject" in window;
      var ielt9 = ie && !document.addEventListener;
      var edge = "msLaunchUri" in navigator && !("documentMode" in document);
      var webkit = userAgentContains("webkit");
      var android = userAgentContains("android");
      var android23 = userAgentContains("android 2") || userAgentContains("android 3");
      var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
      var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
      var opera = !!window.opera;
      var chrome = !edge && userAgentContains("chrome");
      var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
      var safari = !chrome && userAgentContains("safari");
      var phantom = userAgentContains("phantom");
      var opera12 = "OTransition" in style;
      var win = navigator.platform.indexOf("Win") === 0;
      var ie3d = ie && "transition" in style;
      var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
      var gecko3d = "MozPerspective" in style;
      var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
      var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
      var mobileWebkit = mobile && webkit;
      var mobileWebkit3d = mobile && webkit3d;
      var msPointer = !window.PointerEvent && window.MSPointerEvent;
      var pointer = !!(window.PointerEvent || msPointer);
      var touchNative = "ontouchstart" in window || !!window.TouchEvent;
      var touch = !window.L_NO_TOUCH && (touchNative || pointer);
      var mobileOpera = mobile && opera;
      var mobileGecko = mobile && gecko;
      var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
      var passiveEvents = function() {
        var supportsPassiveOption = false;
        try {
          var opts = Object.defineProperty({}, "passive", {
            get: function() {
              supportsPassiveOption = true;
            }
          });
          window.addEventListener("testPassiveEventSupport", falseFn, opts);
          window.removeEventListener("testPassiveEventSupport", falseFn, opts);
        } catch (e) {
        }
        return supportsPassiveOption;
      }();
      var canvas$1 = function() {
        return !!document.createElement("canvas").getContext;
      }();
      var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
      var inlineSvg = !!svg$1 && function() {
        var div = document.createElement("div");
        div.innerHTML = "<svg/>";
        return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      }();
      var vml = !svg$1 && function() {
        try {
          var div = document.createElement("div");
          div.innerHTML = '<v:shape adj="1"/>';
          var shape = div.firstChild;
          shape.style.behavior = "url(#default#VML)";
          return shape && typeof shape.adj === "object";
        } catch (e) {
          return false;
        }
      }();
      var mac = navigator.platform.indexOf("Mac") === 0;
      var linux = navigator.platform.indexOf("Linux") === 0;
      function userAgentContains(str) {
        return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
      }
      var Browser = {
        ie,
        ielt9,
        edge,
        webkit,
        android,
        android23,
        androidStock,
        opera,
        chrome,
        gecko,
        safari,
        phantom,
        opera12,
        win,
        ie3d,
        webkit3d,
        gecko3d,
        any3d,
        mobile,
        mobileWebkit,
        mobileWebkit3d,
        msPointer,
        pointer,
        touch,
        touchNative,
        mobileOpera,
        mobileGecko,
        retina,
        passiveEvents,
        canvas: canvas$1,
        svg: svg$1,
        vml,
        inlineSvg,
        mac,
        linux
      };
      var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
      var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
      var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
      var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
      var pEvent = {
        touchstart: POINTER_DOWN,
        touchmove: POINTER_MOVE,
        touchend: POINTER_UP,
        touchcancel: POINTER_CANCEL
      };
      var handle = {
        touchstart: _onPointerStart,
        touchmove: _handlePointer,
        touchend: _handlePointer,
        touchcancel: _handlePointer
      };
      var _pointers = {};
      var _pointerDocListener = false;
      function addPointerListener(obj, type, handler) {
        if (type === "touchstart") {
          _addPointerDocListener();
        }
        if (!handle[type]) {
          console.warn("wrong event specified:", type);
          return falseFn;
        }
        handler = handle[type].bind(this, handler);
        obj.addEventListener(pEvent[type], handler, false);
        return handler;
      }
      function removePointerListener(obj, type, handler) {
        if (!pEvent[type]) {
          console.warn("wrong event specified:", type);
          return;
        }
        obj.removeEventListener(pEvent[type], handler, false);
      }
      function _globalPointerDown(e) {
        _pointers[e.pointerId] = e;
      }
      function _globalPointerMove(e) {
        if (_pointers[e.pointerId]) {
          _pointers[e.pointerId] = e;
        }
      }
      function _globalPointerUp(e) {
        delete _pointers[e.pointerId];
      }
      function _addPointerDocListener() {
        if (!_pointerDocListener) {
          document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
          document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
          document.addEventListener(POINTER_UP, _globalPointerUp, true);
          document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
          _pointerDocListener = true;
        }
      }
      function _handlePointer(handler, e) {
        if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          return;
        }
        e.touches = [];
        for (var i in _pointers) {
          e.touches.push(_pointers[i]);
        }
        e.changedTouches = [e];
        handler(e);
      }
      function _onPointerStart(handler, e) {
        if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
          preventDefault(e);
        }
        _handlePointer(handler, e);
      }
      function makeDblclick(event) {
        var newEvent = {}, prop, i;
        for (i in event) {
          prop = event[i];
          newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
        }
        event = newEvent;
        newEvent.type = "dblclick";
        newEvent.detail = 2;
        newEvent.isTrusted = false;
        newEvent._simulated = true;
        return newEvent;
      }
      var delay = 200;
      function addDoubleTapListener(obj, handler) {
        obj.addEventListener("dblclick", handler);
        var last = 0, detail;
        function simDblclick(e) {
          if (e.detail !== 1) {
            detail = e.detail;
            return;
          }
          if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
            return;
          }
          var path = getPropagationPath(e);
          if (path.some(function(el) {
            return el instanceof HTMLLabelElement && el.attributes.for;
          }) && !path.some(function(el) {
            return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
          })) {
            return;
          }
          var now = Date.now();
          if (now - last <= delay) {
            detail++;
            if (detail === 2) {
              handler(makeDblclick(e));
            }
          } else {
            detail = 1;
          }
          last = now;
        }
        obj.addEventListener("click", simDblclick);
        return {
          dblclick: handler,
          simDblclick
        };
      }
      function removeDoubleTapListener(obj, handlers) {
        obj.removeEventListener("dblclick", handlers.dblclick);
        obj.removeEventListener("click", handlers.simDblclick);
      }
      var TRANSFORM = testProp(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      );
      var TRANSITION = testProp(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      );
      var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
      function get(id) {
        return typeof id === "string" ? document.getElementById(id) : id;
      }
      function getStyle(el, style2) {
        var value = el.style[style2] || el.currentStyle && el.currentStyle[style2];
        if ((!value || value === "auto") && document.defaultView) {
          var css = document.defaultView.getComputedStyle(el, null);
          value = css ? css[style2] : null;
        }
        return value === "auto" ? null : value;
      }
      function create$1(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className || "";
        if (container) {
          container.appendChild(el);
        }
        return el;
      }
      function remove(el) {
        var parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
      }
      function empty(el) {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      }
      function toFront(el) {
        var parent = el.parentNode;
        if (parent && parent.lastChild !== el) {
          parent.appendChild(el);
        }
      }
      function toBack(el) {
        var parent = el.parentNode;
        if (parent && parent.firstChild !== el) {
          parent.insertBefore(el, parent.firstChild);
        }
      }
      function hasClass(el, name) {
        if (el.classList !== void 0) {
          return el.classList.contains(name);
        }
        var className = getClass(el);
        return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
      }
      function addClass(el, name) {
        if (el.classList !== void 0) {
          var classes = splitWords(name);
          for (var i = 0, len = classes.length; i < len; i++) {
            el.classList.add(classes[i]);
          }
        } else if (!hasClass(el, name)) {
          var className = getClass(el);
          setClass(el, (className ? className + " " : "") + name);
        }
      }
      function removeClass(el, name) {
        if (el.classList !== void 0) {
          el.classList.remove(name);
        } else {
          setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
        }
      }
      function setClass(el, name) {
        if (el.className.baseVal === void 0) {
          el.className = name;
        } else {
          el.className.baseVal = name;
        }
      }
      function getClass(el) {
        if (el.correspondingElement) {
          el = el.correspondingElement;
        }
        return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
      }
      function setOpacity(el, value) {
        if ("opacity" in el.style) {
          el.style.opacity = value;
        } else if ("filter" in el.style) {
          _setOpacityIE(el, value);
        }
      }
      function _setOpacityIE(el, value) {
        var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
        try {
          filter = el.filters.item(filterName);
        } catch (e) {
          if (value === 1) {
            return;
          }
        }
        value = Math.round(value * 100);
        if (filter) {
          filter.Enabled = value !== 100;
          filter.Opacity = value;
        } else {
          el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
        }
      }
      function testProp(props) {
        var style2 = document.documentElement.style;
        for (var i = 0; i < props.length; i++) {
          if (props[i] in style2) {
            return props[i];
          }
        }
        return false;
      }
      function setTransform(el, offset, scale2) {
        var pos = offset || new Point(0, 0);
        el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
      }
      function setPosition(el, point) {
        el._leaflet_pos = point;
        if (Browser.any3d) {
          setTransform(el, point);
        } else {
          el.style.left = point.x + "px";
          el.style.top = point.y + "px";
        }
      }
      function getPosition(el) {
        return el._leaflet_pos || new Point(0, 0);
      }
      var disableTextSelection;
      var enableTextSelection;
      var _userSelect;
      if ("onselectstart" in document) {
        disableTextSelection = function() {
          on(window, "selectstart", preventDefault);
        };
        enableTextSelection = function() {
          off(window, "selectstart", preventDefault);
        };
      } else {
        var userSelectProperty = testProp(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        disableTextSelection = function() {
          if (userSelectProperty) {
            var style2 = document.documentElement.style;
            _userSelect = style2[userSelectProperty];
            style2[userSelectProperty] = "none";
          }
        };
        enableTextSelection = function() {
          if (userSelectProperty) {
            document.documentElement.style[userSelectProperty] = _userSelect;
            _userSelect = void 0;
          }
        };
      }
      function disableImageDrag() {
        on(window, "dragstart", preventDefault);
      }
      function enableImageDrag() {
        off(window, "dragstart", preventDefault);
      }
      var _outlineElement, _outlineStyle;
      function preventOutline(element) {
        while (element.tabIndex === -1) {
          element = element.parentNode;
        }
        if (!element.style) {
          return;
        }
        restoreOutline();
        _outlineElement = element;
        _outlineStyle = element.style.outlineStyle;
        element.style.outlineStyle = "none";
        on(window, "keydown", restoreOutline);
      }
      function restoreOutline() {
        if (!_outlineElement) {
          return;
        }
        _outlineElement.style.outlineStyle = _outlineStyle;
        _outlineElement = void 0;
        _outlineStyle = void 0;
        off(window, "keydown", restoreOutline);
      }
      function getSizedParentNode(element) {
        do {
          element = element.parentNode;
        } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
        return element;
      }
      function getScale(element) {
        var rect = element.getBoundingClientRect();
        return {
          x: rect.width / element.offsetWidth || 1,
          y: rect.height / element.offsetHeight || 1,
          boundingClientRect: rect
        };
      }
      var DomUtil = {
        __proto__: null,
        TRANSFORM,
        TRANSITION,
        TRANSITION_END,
        get,
        getStyle,
        create: create$1,
        remove,
        empty,
        toFront,
        toBack,
        hasClass,
        addClass,
        removeClass,
        setClass,
        getClass,
        setOpacity,
        testProp,
        setTransform,
        setPosition,
        getPosition,
        get disableTextSelection() {
          return disableTextSelection;
        },
        get enableTextSelection() {
          return enableTextSelection;
        },
        disableImageDrag,
        enableImageDrag,
        preventOutline,
        restoreOutline,
        getSizedParentNode,
        getScale
      };
      function on(obj, types, fn, context) {
        if (types && typeof types === "object") {
          for (var type in types) {
            addOne(obj, type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          for (var i = 0, len = types.length; i < len; i++) {
            addOne(obj, types[i], fn, context);
          }
        }
        return this;
      }
      var eventsKey = "_leaflet_events";
      function off(obj, types, fn, context) {
        if (arguments.length === 1) {
          batchRemove(obj);
          delete obj[eventsKey];
        } else if (types && typeof types === "object") {
          for (var type in types) {
            removeOne(obj, type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          if (arguments.length === 2) {
            batchRemove(obj, function(type2) {
              return indexOf(types, type2) !== -1;
            });
          } else {
            for (var i = 0, len = types.length; i < len; i++) {
              removeOne(obj, types[i], fn, context);
            }
          }
        }
        return this;
      }
      function batchRemove(obj, filterFn) {
        for (var id in obj[eventsKey]) {
          var type = id.split(/\d/)[0];
          if (!filterFn || filterFn(type)) {
            removeOne(obj, type, null, null, id);
          }
        }
      }
      var mouseSubst = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function addOne(obj, type, fn, context) {
        var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
        if (obj[eventsKey] && obj[eventsKey][id]) {
          return this;
        }
        var handler = function(e) {
          return fn.call(context || obj, e || window.event);
        };
        var originalHandler = handler;
        if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
          handler = addPointerListener(obj, type, handler);
        } else if (Browser.touch && type === "dblclick") {
          handler = addDoubleTapListener(obj, handler);
        } else if ("addEventListener" in obj) {
          if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
            obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? { passive: false } : false);
          } else if (type === "mouseenter" || type === "mouseleave") {
            handler = function(e) {
              e = e || window.event;
              if (isExternalTarget(obj, e)) {
                originalHandler(e);
              }
            };
            obj.addEventListener(mouseSubst[type], handler, false);
          } else {
            obj.addEventListener(type, originalHandler, false);
          }
        } else {
          obj.attachEvent("on" + type, handler);
        }
        obj[eventsKey] = obj[eventsKey] || {};
        obj[eventsKey][id] = handler;
      }
      function removeOne(obj, type, fn, context, id) {
        id = id || type + stamp(fn) + (context ? "_" + stamp(context) : "");
        var handler = obj[eventsKey] && obj[eventsKey][id];
        if (!handler) {
          return this;
        }
        if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
          removePointerListener(obj, type, handler);
        } else if (Browser.touch && type === "dblclick") {
          removeDoubleTapListener(obj, handler);
        } else if ("removeEventListener" in obj) {
          obj.removeEventListener(mouseSubst[type] || type, handler, false);
        } else {
          obj.detachEvent("on" + type, handler);
        }
        obj[eventsKey][id] = null;
      }
      function stopPropagation(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else if (e.originalEvent) {
          e.originalEvent._stopped = true;
        } else {
          e.cancelBubble = true;
        }
        return this;
      }
      function disableScrollPropagation(el) {
        addOne(el, "wheel", stopPropagation);
        return this;
      }
      function disableClickPropagation(el) {
        on(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
        el["_leaflet_disable_click"] = true;
        return this;
      }
      function preventDefault(e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        return this;
      }
      function stop(e) {
        preventDefault(e);
        stopPropagation(e);
        return this;
      }
      function getPropagationPath(ev) {
        if (ev.composedPath) {
          return ev.composedPath();
        }
        var path = [];
        var el = ev.target;
        while (el) {
          path.push(el);
          el = el.parentNode;
        }
        return path;
      }
      function getMousePosition(e, container) {
        if (!container) {
          return new Point(e.clientX, e.clientY);
        }
        var scale2 = getScale(container), offset = scale2.boundingClientRect;
        return new Point(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (e.clientX - offset.left) / scale2.x - container.clientLeft,
          (e.clientY - offset.top) / scale2.y - container.clientTop
        );
      }
      var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function getWheelDelta(e) {
        return Browser.edge ? e.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor : (
            // Pixels
            e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : (
              // Lines
              e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : (
                // Pages
                e.deltaX || e.deltaZ ? 0 : (
                  // Skip horizontal/depth wheel events
                  e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : (
                    // Legacy IE pixels
                    e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : (
                      // Legacy Moz lines
                      e.detail ? e.detail / -32765 * 60 : (
                        // Legacy Moz pages
                        0
                      )
                    )
                  )
                )
              )
            )
          )
        );
      }
      function isExternalTarget(el, e) {
        var related = e.relatedTarget;
        if (!related) {
          return true;
        }
        try {
          while (related && related !== el) {
            related = related.parentNode;
          }
        } catch (err) {
          return false;
        }
        return related !== el;
      }
      var DomEvent = {
        __proto__: null,
        on,
        off,
        stopPropagation,
        disableScrollPropagation,
        disableClickPropagation,
        preventDefault,
        stop,
        getPropagationPath,
        getMousePosition,
        getWheelDelta,
        isExternalTarget,
        addListener: on,
        removeListener: off
      };
      var PosAnimation = Evented.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(el, newPos, duration, easeLinearity) {
          this.stop();
          this._el = el;
          this._inProgress = true;
          this._duration = duration || 0.25;
          this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
          this._startPos = getPosition(el);
          this._offset = newPos.subtract(this._startPos);
          this._startTime = +/* @__PURE__ */ new Date();
          this.fire("start");
          this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          if (!this._inProgress) {
            return;
          }
          this._step(true);
          this._complete();
        },
        _animate: function() {
          this._animId = requestAnimFrame(this._animate, this);
          this._step();
        },
        _step: function(round) {
          var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
          if (elapsed < duration) {
            this._runFrame(this._easeOut(elapsed / duration), round);
          } else {
            this._runFrame(1);
            this._complete();
          }
        },
        _runFrame: function(progress, round) {
          var pos = this._startPos.add(this._offset.multiplyBy(progress));
          if (round) {
            pos._round();
          }
          setPosition(this._el, pos);
          this.fire("step");
        },
        _complete: function() {
          cancelAnimFrame(this._animId);
          this._inProgress = false;
          this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      });
      var Map2 = Evented.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: EPSG3857,
          // @option center: LatLng = undefined
          // Initial geographic center of the map
          center: void 0,
          // @option zoom: Number = undefined
          // Initial map zoom level
          zoom: void 0,
          // @option minZoom: Number = *
          // Minimum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the lowest of their `minZoom` options will be used instead.
          minZoom: void 0,
          // @option maxZoom: Number = *
          // Maximum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the highest of their `maxZoom` options will be used instead.
          maxZoom: void 0,
          // @option layers: Layer[] = []
          // Array of layers that will be added to the map initially
          layers: [],
          // @option maxBounds: LatLngBounds = null
          // When this option is set, the map restricts the view to the given
          // geographical bounds, bouncing the user back if the user tries to pan
          // outside the view. To set the restriction dynamically, use
          // [`setMaxBounds`](#map-setmaxbounds) method.
          maxBounds: void 0,
          // @option renderer: Renderer = *
          // The default method for drawing vector layers on the map. `L.SVG`
          // or `L.Canvas` by default depending on browser support.
          renderer: void 0,
          // @section Animation Options
          // @option zoomAnimation: Boolean = true
          // Whether the map zoom animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          zoomAnimation: true,
          // @option zoomAnimationThreshold: Number = 4
          // Won't animate zoom if the zoom difference exceeds this value.
          zoomAnimationThreshold: 4,
          // @option fadeAnimation: Boolean = true
          // Whether the tile fade animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          fadeAnimation: true,
          // @option markerZoomAnimation: Boolean = true
          // Whether markers animate their zoom with the zoom animation, if disabled
          // they will disappear for the length of the animation. By default it's
          // enabled in all browsers that support CSS3 Transitions except Android.
          markerZoomAnimation: true,
          // @option transform3DLimit: Number = 2^23
          // Defines the maximum size of a CSS translation transform. The default
          // value should not be changed unless a web browser positions layers in
          // the wrong place after doing a large `panBy`.
          transform3DLimit: 8388608,
          // Precision limit of a 32-bit float
          // @section Interaction Options
          // @option zoomSnap: Number = 1
          // Forces the map's zoom level to always be a multiple of this, particularly
          // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
          // By default, the zoom level snaps to the nearest integer; lower values
          // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
          // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
          zoomSnap: 1,
          // @option zoomDelta: Number = 1
          // Controls how much the map's zoom level will change after a
          // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
          // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
          // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
          zoomDelta: 1,
          // @option trackResize: Boolean = true
          // Whether the map automatically handles browser window resize to update itself.
          trackResize: true
        },
        initialize: function(id, options) {
          options = setOptions(this, options);
          this._handlers = [];
          this._layers = {};
          this._zoomBoundLayers = {};
          this._sizeChanged = true;
          this._initContainer(id);
          this._initLayout();
          this._onResize = bind(this._onResize, this);
          this._initEvents();
          if (options.maxBounds) {
            this.setMaxBounds(options.maxBounds);
          }
          if (options.zoom !== void 0) {
            this._zoom = this._limitZoom(options.zoom);
          }
          if (options.center && options.zoom !== void 0) {
            this.setView(toLatLng(options.center), options.zoom, { reset: true });
          }
          this.callInitHooks();
          this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
          if (this._zoomAnimated) {
            this._createAnimProxy();
            on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
          }
          this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(center, zoom2, options) {
          zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
          center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
          options = options || {};
          this._stop();
          if (this._loaded && !options.reset && options !== true) {
            if (options.animate !== void 0) {
              options.zoom = extend({ animate: options.animate }, options.zoom);
              options.pan = extend({ animate: options.animate, duration: options.duration }, options.pan);
            }
            var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
            if (moved) {
              clearTimeout(this._sizeTimer);
              return this;
            }
          }
          this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
          return this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(zoom2, options) {
          if (!this._loaded) {
            this._zoom = zoom2;
            return this;
          }
          return this.setView(this.getCenter(), zoom2, { zoom: options });
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom + delta, options);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom - delta, options);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(latlng, zoom2, options) {
          var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
          return this.setView(newCenter, zoom2, { zoom: options });
        },
        _getBoundsCenterZoom: function(bounds, options) {
          options = options || {};
          bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
          zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
          if (zoom2 === Infinity) {
            return {
              center: bounds.getCenter(),
              zoom: zoom2
            };
          }
          var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
          return {
            center,
            zoom: zoom2
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(bounds, options) {
          bounds = toLatLngBounds(bounds);
          if (!bounds.isValid()) {
            throw new Error("Bounds are not valid.");
          }
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.setView(target.center, target.zoom, options);
        },
        // @method fitWorld(options?: fitBounds options): this
        // Sets a map view that mostly contains the whole world with the maximum
        // zoom level possible.
        fitWorld: function(options) {
          return this.fitBounds([[-90, -180], [90, 180]], options);
        },
        // @method panTo(latlng: LatLng, options?: Pan options): this
        // Pans the map to a given center.
        panTo: function(center, options) {
          return this.setView(center, this._zoom, { pan: options });
        },
        // @method panBy(offset: Point, options?: Pan options): this
        // Pans the map by a given number of pixels (animated).
        panBy: function(offset, options) {
          offset = toPoint(offset).round();
          options = options || {};
          if (!offset.x && !offset.y) {
            return this.fire("moveend");
          }
          if (options.animate !== true && !this.getSize().contains(offset)) {
            this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
            return this;
          }
          if (!this._panAnim) {
            this._panAnim = new PosAnimation();
            this._panAnim.on({
              "step": this._onPanTransitionStep,
              "end": this._onPanTransitionEnd
            }, this);
          }
          if (!options.noMoveStart) {
            this.fire("movestart");
          }
          if (options.animate !== false) {
            addClass(this._mapPane, "leaflet-pan-anim");
            var newPos = this._getMapPanePos().subtract(offset).round();
            this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
          } else {
            this._rawPanBy(offset);
            this.fire("move").fire("moveend");
          }
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(targetCenter, targetZoom, options) {
          options = options || {};
          if (options.animate === false || !Browser.any3d) {
            return this.setView(targetCenter, targetZoom, options);
          }
          this._stop();
          var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
          targetCenter = toLatLng(targetCenter);
          targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
          var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
          function r(i) {
            var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1, sq = Math.sqrt(b * b + 1) - b;
            var log = sq < 1e-9 ? -18 : Math.log(sq);
            return log;
          }
          function sinh(n) {
            return (Math.exp(n) - Math.exp(-n)) / 2;
          }
          function cosh(n) {
            return (Math.exp(n) + Math.exp(-n)) / 2;
          }
          function tanh(n) {
            return sinh(n) / cosh(n);
          }
          var r0 = r(0);
          function w(s) {
            return w0 * (cosh(r0) / cosh(r0 + rho * s));
          }
          function u(s) {
            return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2;
          }
          function easeOut(t) {
            return 1 - Math.pow(1 - t, 1.5);
          }
          var start = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
          function frame() {
            var t = (Date.now() - start) / duration, s = easeOut(t) * S;
            if (t <= 1) {
              this._flyToFrame = requestAnimFrame(frame, this);
              this._move(
                this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
                this.getScaleZoom(w0 / w(s), startZoom),
                { flyTo: true }
              );
            } else {
              this._move(targetCenter, targetZoom)._moveEnd(true);
            }
          }
          this._moveStart(true, options.noMoveStart);
          frame.call(this);
          return this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(bounds, options) {
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.flyTo(target.center, target.zoom, options);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(bounds) {
          bounds = toLatLngBounds(bounds);
          if (this.listens("moveend", this._panInsideMaxBounds)) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (!bounds.isValid()) {
            this.options.maxBounds = null;
            return this;
          }
          this.options.maxBounds = bounds;
          if (this._loaded) {
            this._panInsideMaxBounds();
          }
          return this.on("moveend", this._panInsideMaxBounds);
        },
        // @method setMinZoom(zoom: Number): this
        // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
        setMinZoom: function(zoom2) {
          var oldZoom = this.options.minZoom;
          this.options.minZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() < this.options.minZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method setMaxZoom(zoom: Number): this
        // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
        setMaxZoom: function(zoom2) {
          var oldZoom = this.options.maxZoom;
          this.options.maxZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() > this.options.maxZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
        // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
        panInsideBounds: function(bounds, options) {
          this._enforcingBounds = true;
          var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
          if (!center.equals(newCenter)) {
            this.panTo(newCenter, options);
          }
          this._enforcingBounds = false;
          return this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(latlng, options) {
          options = options || {};
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
          if (!paddedBounds.contains(pixelPoint)) {
            this._enforcingBounds = true;
            var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
            var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
            pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
            pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
            this.panTo(this.unproject(pixelCenter), options);
            this._enforcingBounds = false;
          }
          return this;
        },
        // @method invalidateSize(options: Zoom/pan options): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default. If `options.pan` is `false`, panning will not occur.
        // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
        // that it doesn't happen often even if the method is called many
        // times in a row.
        // @alternative
        // @method invalidateSize(animate: Boolean): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default.
        invalidateSize: function(options) {
          if (!this._loaded) {
            return this;
          }
          options = extend({
            animate: false,
            pan: true
          }, options === true ? { animate: true } : options);
          var oldSize = this.getSize();
          this._sizeChanged = true;
          this._lastCenter = null;
          var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
          if (!offset.x && !offset.y) {
            return this;
          }
          if (options.animate && options.pan) {
            this.panBy(offset);
          } else {
            if (options.pan) {
              this._rawPanBy(offset);
            }
            this.fire("move");
            if (options.debounceMoveend) {
              clearTimeout(this._sizeTimer);
              this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
            } else {
              this.fire("moveend");
            }
          }
          return this.fire("resize", {
            oldSize,
            newSize
          });
        },
        // @section Methods for modifying map state
        // @method stop(): this
        // Stops the currently running `panTo` or `flyTo` animation, if any.
        stop: function() {
          this.setZoom(this._limitZoom(this._zoom));
          if (!this.options.zoomSnap) {
            this.fire("viewreset");
          }
          return this._stop();
        },
        // @section Geolocation methods
        // @method locate(options?: Locate options): this
        // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
        // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
        // and optionally sets the map view to the user's location with respect to
        // detection accuracy (or to the world view if geolocation failed).
        // Note that, if your page doesn't use HTTPS, this method will fail in
        // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
        // See `Locate options` for more details.
        locate: function(options) {
          options = this._locateOptions = extend({
            timeout: 1e4,
            watch: false
            // setView: false
            // maxZoom: <Number>
            // maximumAge: 0
            // enableHighAccuracy: false
          }, options);
          if (!("geolocation" in navigator)) {
            this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            });
            return this;
          }
          var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
          if (options.watch) {
            this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
          } else {
            navigator.geolocation.getCurrentPosition(onResponse, onError, options);
          }
          return this;
        },
        // @method stopLocate(): this
        // Stops watching location previously initiated by `map.locate({watch: true})`
        // and aborts resetting the map view if map.locate was called with
        // `{setView: true}`.
        stopLocate: function() {
          if (navigator.geolocation && navigator.geolocation.clearWatch) {
            navigator.geolocation.clearWatch(this._locationWatchId);
          }
          if (this._locateOptions) {
            this._locateOptions.setView = false;
          }
          return this;
        },
        _handleGeolocationError: function(error) {
          if (!this._container._leaflet_id) {
            return;
          }
          var c = error.code, message = error.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
          if (this._locateOptions.setView && !this._loaded) {
            this.fitWorld();
          }
          this.fire("locationerror", {
            code: c,
            message: "Geolocation error: " + message + "."
          });
        },
        _handleGeolocationResponse: function(pos) {
          if (!this._container._leaflet_id) {
            return;
          }
          var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng2(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
          if (options.setView) {
            var zoom2 = this.getBoundsZoom(bounds);
            this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
          }
          var data = {
            latlng,
            bounds,
            timestamp: pos.timestamp
          };
          for (var i in pos.coords) {
            if (typeof pos.coords[i] === "number") {
              data[i] = pos.coords[i];
            }
          }
          this.fire("locationfound", data);
        },
        // TODO Appropriate docs section?
        // @section Other Methods
        // @method addHandler(name: String, HandlerClass: Function): this
        // Adds a new `Handler` to the map, given its name and constructor function.
        addHandler: function(name, HandlerClass) {
          if (!HandlerClass) {
            return this;
          }
          var handler = this[name] = new HandlerClass(this);
          this._handlers.push(handler);
          if (this.options[name]) {
            handler.enable();
          }
          return this;
        },
        // @method remove(): this
        // Destroys the map and clears all related event listeners.
        remove: function() {
          this._initEvents(true);
          if (this.options.maxBounds) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (this._containerId !== this._container._leaflet_id) {
            throw new Error("Map container is being reused by another instance");
          }
          try {
            delete this._container._leaflet_id;
            delete this._containerId;
          } catch (e) {
            this._container._leaflet_id = void 0;
            this._containerId = void 0;
          }
          if (this._locationWatchId !== void 0) {
            this.stopLocate();
          }
          this._stop();
          remove(this._mapPane);
          if (this._clearControlPos) {
            this._clearControlPos();
          }
          if (this._resizeRequest) {
            cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = null;
          }
          this._clearHandlers();
          if (this._loaded) {
            this.fire("unload");
          }
          var i;
          for (i in this._layers) {
            this._layers[i].remove();
          }
          for (i in this._panes) {
            remove(this._panes[i]);
          }
          this._layers = [];
          this._panes = [];
          delete this._mapPane;
          delete this._renderer;
          return this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(name, container) {
          var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
          if (name) {
            this._panes[name] = pane;
          }
          return pane;
        },
        // @section Methods for Getting Map State
        // @method getCenter(): LatLng
        // Returns the geographical center of the map view
        getCenter: function() {
          this._checkIfLoaded();
          if (this._lastCenter && !this._moved()) {
            return this._lastCenter.clone();
          }
          return this.layerPointToLatLng(this._getCenterLayerPoint());
        },
        // @method getZoom(): Number
        // Returns the current zoom level of the map view
        getZoom: function() {
          return this._zoom;
        },
        // @method getBounds(): LatLngBounds
        // Returns the geographical bounds visible in the current map view
        getBounds: function() {
          var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
          return new LatLngBounds(sw, ne);
        },
        // @method getMinZoom(): Number
        // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
        getMinZoom: function() {
          return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
        },
        // @method getMaxZoom(): Number
        // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
        getMaxZoom: function() {
          return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
        },
        // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
        // Returns the maximum zoom level on which the given bounds fit to the map
        // view in its entirety. If `inside` (optional) is set to `true`, the method
        // instead returns the minimum zoom level on which the map view fits into
        // the given bounds in its entirety.
        getBoundsZoom: function(bounds, inside, padding) {
          bounds = toLatLngBounds(bounds);
          padding = toPoint(padding || [0, 0]);
          var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
          zoom2 = this.getScaleZoom(scale2, zoom2);
          if (snap) {
            zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
            zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
          }
          return Math.max(min, Math.min(max, zoom2));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          if (!this._size || this._sizeChanged) {
            this._size = new Point(
              this._container.clientWidth || 0,
              this._container.clientHeight || 0
            );
            this._sizeChanged = false;
          }
          return this._size.clone();
        },
        // @method getPixelBounds(): Bounds
        // Returns the bounds of the current map view in projected pixel
        // coordinates (sometimes useful in layer and overlay implementations).
        getPixelBounds: function(center, zoom2) {
          var topLeftPoint = this._getTopLeftPoint(center, zoom2);
          return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
        },
        // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
        // the map pane? "left point of the map layer" can be confusing, specially
        // since there can be negative offsets.
        // @method getPixelOrigin(): Point
        // Returns the projected pixel coordinates of the top left point of
        // the map layer (useful in custom layer and overlay implementations).
        getPixelOrigin: function() {
          this._checkIfLoaded();
          return this._pixelOrigin;
        },
        // @method getPixelWorldBounds(zoom?: Number): Bounds
        // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
        // If `zoom` is omitted, the map's current zoom level is used.
        getPixelWorldBounds: function(zoom2) {
          return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
        },
        // @section Other Methods
        // @method getPane(pane: String|HTMLElement): HTMLElement
        // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
        getPane: function(pane) {
          return typeof pane === "string" ? this._panes[pane] : pane;
        },
        // @method getPanes(): Object
        // Returns a plain object containing the names of all [panes](#map-pane) as keys and
        // the panes as values.
        getPanes: function() {
          return this._panes;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the map.
        getContainer: function() {
          return this._container;
        },
        // @section Conversion Methods
        // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
        // Returns the scale factor to be applied to a map transition from zoom level
        // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
        getZoomScale: function(toZoom, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          return crs.scale(toZoom) / crs.scale(fromZoom);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(scale2, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
          return isNaN(zoom2) ? Infinity : zoom2;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(latlng, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(point, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.pointToLatLng(toPoint(point), zoom2);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(point) {
          var projectedPoint = toPoint(point).add(this.getPixelOrigin());
          return this.unproject(projectedPoint);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(latlng) {
          var projectedPoint = this.project(toLatLng(latlng))._round();
          return projectedPoint._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(latlng) {
          return this.options.crs.wrapLatLng(toLatLng(latlng));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(latlng) {
          return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(latlng1, latlng2) {
          return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(point) {
          return toPoint(point).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(point) {
          return toPoint(point).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(point) {
          var layerPoint = this.containerPointToLayerPoint(toPoint(point));
          return this.layerPointToLatLng(layerPoint);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(latlng) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(e) {
          return getMousePosition(e, this._container);
        },
        // @method mouseEventToLayerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to
        // the [origin pixel](#map-getpixelorigin) where the event took place.
        mouseEventToLayerPoint: function(e) {
          return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
        },
        // @method mouseEventToLatLng(ev: MouseEvent): LatLng
        // Given a MouseEvent object, returns geographical coordinate where the
        // event took place.
        mouseEventToLatLng: function(e) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
        },
        // map initialization methods
        _initContainer: function(id) {
          var container = this._container = get(id);
          if (!container) {
            throw new Error("Map container not found.");
          } else if (container._leaflet_id) {
            throw new Error("Map container is already initialized.");
          }
          on(container, "scroll", this._onScroll, this);
          this._containerId = stamp(container);
        },
        _initLayout: function() {
          var container = this._container;
          this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
          addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var position = getStyle(container, "position");
          if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") {
            container.style.position = "relative";
          }
          this._initPanes();
          if (this._initControlPos) {
            this._initControlPos();
          }
        },
        _initPanes: function() {
          var panes = this._panes = {};
          this._paneRenderers = {};
          this._mapPane = this.createPane("mapPane", this._container);
          setPosition(this._mapPane, new Point(0, 0));
          this.createPane("tilePane");
          this.createPane("overlayPane");
          this.createPane("shadowPane");
          this.createPane("markerPane");
          this.createPane("tooltipPane");
          this.createPane("popupPane");
          if (!this.options.markerZoomAnimation) {
            addClass(panes.markerPane, "leaflet-zoom-hide");
            addClass(panes.shadowPane, "leaflet-zoom-hide");
          }
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(center, zoom2, noMoveStart) {
          setPosition(this._mapPane, new Point(0, 0));
          var loading = !this._loaded;
          this._loaded = true;
          zoom2 = this._limitZoom(zoom2);
          this.fire("viewprereset");
          var zoomChanged = this._zoom !== zoom2;
          this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
          this.fire("viewreset");
          if (loading) {
            this.fire("load");
          }
        },
        _moveStart: function(zoomChanged, noMoveStart) {
          if (zoomChanged) {
            this.fire("zoomstart");
          }
          if (!noMoveStart) {
            this.fire("movestart");
          }
          return this;
        },
        _move: function(center, zoom2, data, supressEvent) {
          if (zoom2 === void 0) {
            zoom2 = this._zoom;
          }
          var zoomChanged = this._zoom !== zoom2;
          this._zoom = zoom2;
          this._lastCenter = center;
          this._pixelOrigin = this._getNewPixelOrigin(center);
          if (!supressEvent) {
            if (zoomChanged || data && data.pinch) {
              this.fire("zoom", data);
            }
            this.fire("move", data);
          } else if (data && data.pinch) {
            this.fire("zoom", data);
          }
          return this;
        },
        _moveEnd: function(zoomChanged) {
          if (zoomChanged) {
            this.fire("zoomend");
          }
          return this.fire("moveend");
        },
        _stop: function() {
          cancelAnimFrame(this._flyToFrame);
          if (this._panAnim) {
            this._panAnim.stop();
          }
          return this;
        },
        _rawPanBy: function(offset) {
          setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
        },
        _getZoomSpan: function() {
          return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function() {
          if (!this._enforcingBounds) {
            this.panInsideBounds(this.options.maxBounds);
          }
        },
        _checkIfLoaded: function() {
          if (!this._loaded) {
            throw new Error("Set map center and zoom first.");
          }
        },
        // DOM event handling
        // @section Interaction events
        _initEvents: function(remove2) {
          this._targets = {};
          this._targets[stamp(this._container)] = this;
          var onOff = remove2 ? off : on;
          onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
          if (this.options.trackResize) {
            onOff(window, "resize", this._onResize, this);
          }
          if (Browser.any3d && this.options.transform3DLimit) {
            (remove2 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
          }
        },
        _onResize: function() {
          cancelAnimFrame(this._resizeRequest);
          this._resizeRequest = requestAnimFrame(
            function() {
              this.invalidateSize({ debounceMoveend: true });
            },
            this
          );
        },
        _onScroll: function() {
          this._container.scrollTop = 0;
          this._container.scrollLeft = 0;
        },
        _onMoveEnd: function() {
          var pos = this._getMapPanePos();
          if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
            this._resetView(this.getCenter(), this.getZoom());
          }
        },
        _findEventTargets: function(e, type) {
          var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e.target || e.srcElement, dragging = false;
          while (src) {
            target = this._targets[stamp(src)];
            if (target && (type === "click" || type === "preclick") && this._draggableMoved(target)) {
              dragging = true;
              break;
            }
            if (target && target.listens(type, true)) {
              if (isHover && !isExternalTarget(src, e)) {
                break;
              }
              targets.push(target);
              if (isHover) {
                break;
              }
            }
            if (src === this._container) {
              break;
            }
            src = src.parentNode;
          }
          if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
            targets = [this];
          }
          return targets;
        },
        _isClickDisabled: function(el) {
          while (el && el !== this._container) {
            if (el["_leaflet_disable_click"]) {
              return true;
            }
            el = el.parentNode;
          }
        },
        _handleDOMEvent: function(e) {
          var el = e.target || e.srcElement;
          if (!this._loaded || el["_leaflet_disable_events"] || e.type === "click" && this._isClickDisabled(el)) {
            return;
          }
          var type = e.type;
          if (type === "mousedown") {
            preventOutline(el);
          }
          this._fireDOMEvent(e, type);
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(e, type, canvasTargets) {
          if (e.type === "click") {
            var synth = extend({}, e);
            synth.type = "preclick";
            this._fireDOMEvent(synth, synth.type, canvasTargets);
          }
          var targets = this._findEventTargets(e, type);
          if (canvasTargets) {
            var filtered = [];
            for (var i = 0; i < canvasTargets.length; i++) {
              if (canvasTargets[i].listens(type, true)) {
                filtered.push(canvasTargets[i]);
              }
            }
            targets = filtered.concat(targets);
          }
          if (!targets.length) {
            return;
          }
          if (type === "contextmenu") {
            preventDefault(e);
          }
          var target = targets[0];
          var data = {
            originalEvent: e
          };
          if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
            var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
            data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
            data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
            data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
          }
          for (i = 0; i < targets.length; i++) {
            targets[i].fire(type, data, true);
            if (data.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1) {
              return;
            }
          }
        },
        _draggableMoved: function(obj) {
          obj = obj.dragging && obj.dragging.enabled() ? obj : this;
          return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
          for (var i = 0, len = this._handlers.length; i < len; i++) {
            this._handlers[i].disable();
          }
        },
        // @section Other Methods
        // @method whenReady(fn: Function, context?: Object): this
        // Runs the given function `fn` when the map gets initialized with
        // a view (center and zoom) and at least one layer, or immediately
        // if it's already initialized, optionally passing a function context.
        whenReady: function(callback, context) {
          if (this._loaded) {
            callback.call(context || this, { target: this });
          } else {
            this.on("load", callback, context);
          }
          return this;
        },
        // private methods for getting map state
        _getMapPanePos: function() {
          return getPosition(this._mapPane) || new Point(0, 0);
        },
        _moved: function() {
          var pos = this._getMapPanePos();
          return pos && !pos.equals([0, 0]);
        },
        _getTopLeftPoint: function(center, zoom2) {
          var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
          return pixelOrigin.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(center, zoom2) {
          var viewHalf = this.getSize()._divideBy(2);
          return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(latlng, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return this.project(latlng, zoom2)._subtract(topLeft);
        },
        _latLngBoundsToNewLayerBounds: function(latLngBounds2, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return toBounds([
            this.project(latLngBounds2.getSouthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds2.getNorthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds2.getSouthEast(), zoom2)._subtract(topLeft),
            this.project(latLngBounds2.getNorthEast(), zoom2)._subtract(topLeft)
          ]);
        },
        // layer point of the current center
        _getCenterLayerPoint: function() {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        // offset of the specified place to the current center in pixels
        _getCenterOffset: function(latlng) {
          return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
        },
        // adjust center for view to get inside bounds
        _limitCenter: function(center, zoom2, bounds) {
          if (!bounds) {
            return center;
          }
          var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
          if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
            return center;
          }
          return this.unproject(centerPoint.add(offset), zoom2);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(offset, bounds) {
          if (!bounds) {
            return offset;
          }
          var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
          return offset.add(this._getBoundsOffset(newBounds, bounds));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
          var projectedMaxBounds = toBounds(
            this.project(maxBounds.getNorthEast(), zoom2),
            this.project(maxBounds.getSouthWest(), zoom2)
          ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
          return new Point(dx, dy);
        },
        _rebound: function(left, right) {
          return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
        },
        _limitZoom: function(zoom2) {
          var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
          if (snap) {
            zoom2 = Math.round(zoom2 / snap) * snap;
          }
          return Math.max(min, Math.min(max, zoom2));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          removeClass(this._mapPane, "leaflet-pan-anim");
          this.fire("moveend");
        },
        _tryAnimatedPan: function(center, options) {
          var offset = this._getCenterOffset(center)._trunc();
          if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
            return false;
          }
          this.panBy(offset, options);
          return true;
        },
        _createAnimProxy: function() {
          var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(proxy);
          this.on("zoomanim", function(e) {
            var prop = TRANSFORM, transform = this._proxy.style[prop];
            setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
            if (transform === this._proxy.style[prop] && this._animatingZoom) {
              this._onZoomTransitionEnd();
            }
          }, this);
          this.on("load moveend", this._animMoveEnd, this);
          this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          remove(this._proxy);
          this.off("load moveend", this._animMoveEnd, this);
          delete this._proxy;
        },
        _animMoveEnd: function() {
          var c = this.getCenter(), z = this.getZoom();
          setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
        },
        _catchTransitionEnd: function(e) {
          if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) {
            this._onZoomTransitionEnd();
          }
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(center, zoom2, options) {
          if (this._animatingZoom) {
            return true;
          }
          options = options || {};
          if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
            return false;
          }
          var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
          if (options.animate !== true && !this.getSize().contains(offset)) {
            return false;
          }
          requestAnimFrame(function() {
            this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
          }, this);
          return true;
        },
        _animateZoom: function(center, zoom2, startAnim, noUpdate) {
          if (!this._mapPane) {
            return;
          }
          if (startAnim) {
            this._animatingZoom = true;
            this._animateToCenter = center;
            this._animateToZoom = zoom2;
            addClass(this._mapPane, "leaflet-zoom-anim");
          }
          this.fire("zoomanim", {
            center,
            zoom: zoom2,
            noUpdate
          });
          if (!this._tempFireZoomEvent) {
            this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
          }
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          setTimeout(bind(this._onZoomTransitionEnd, this), 250);
        },
        _onZoomTransitionEnd: function() {
          if (!this._animatingZoom) {
            return;
          }
          if (this._mapPane) {
            removeClass(this._mapPane, "leaflet-zoom-anim");
          }
          this._animatingZoom = false;
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          if (this._tempFireZoomEvent) {
            this.fire("zoom");
          }
          delete this._tempFireZoomEvent;
          this.fire("move");
          this._moveEnd(true);
        }
      });
      function createMap(id, options) {
        return new Map2(id, options);
      }
      var Control = Class.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        /* @section
         * Classes extending L.Control will inherit the following methods:
         *
         * @method getPosition: string
         * Returns the position of the control.
         */
        getPosition: function() {
          return this.options.position;
        },
        // @method setPosition(position: string): this
        // Sets the position of the control.
        setPosition: function(position) {
          var map3 = this._map;
          if (map3) {
            map3.removeControl(this);
          }
          this.options.position = position;
          if (map3) {
            map3.addControl(this);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTMLElement that contains the control.
        getContainer: function() {
          return this._container;
        },
        // @method addTo(map: Map): this
        // Adds the control to the given map.
        addTo: function(map3) {
          this.remove();
          this._map = map3;
          var container = this._container = this.onAdd(map3), pos = this.getPosition(), corner = map3._controlCorners[pos];
          addClass(container, "leaflet-control");
          if (pos.indexOf("bottom") !== -1) {
            corner.insertBefore(container, corner.firstChild);
          } else {
            corner.appendChild(container);
          }
          this._map.on("unload", this.remove, this);
          return this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          if (!this._map) {
            return this;
          }
          remove(this._container);
          if (this.onRemove) {
            this.onRemove(this._map);
          }
          this._map.off("unload", this.remove, this);
          this._map = null;
          return this;
        },
        _refocusOnMap: function(e) {
          if (this._map && e && e.screenX > 0 && e.screenY > 0) {
            this._map.getContainer().focus();
          }
        }
      });
      var control = function(options) {
        return new Control(options);
      };
      Map2.include({
        // @method addControl(control: Control): this
        // Adds the given control to the map
        addControl: function(control2) {
          control2.addTo(this);
          return this;
        },
        // @method removeControl(control: Control): this
        // Removes the given control from the map
        removeControl: function(control2) {
          control2.remove();
          return this;
        },
        _initControlPos: function() {
          var corners = this._controlCorners = {}, l = "leaflet-", container = this._controlContainer = create$1("div", l + "control-container", this._container);
          function createCorner(vSide, hSide) {
            var className = l + vSide + " " + l + hSide;
            corners[vSide + hSide] = create$1("div", className, container);
          }
          createCorner("top", "left");
          createCorner("top", "right");
          createCorner("bottom", "left");
          createCorner("bottom", "right");
        },
        _clearControlPos: function() {
          for (var i in this._controlCorners) {
            remove(this._controlCorners[i]);
          }
          remove(this._controlContainer);
          delete this._controlCorners;
          delete this._controlContainer;
        }
      });
      var Layers = Control.extend({
        // @section
        // @aka Control.Layers options
        options: {
          // @option collapsed: Boolean = true
          // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
          collapsed: true,
          position: "topright",
          // @option autoZIndex: Boolean = true
          // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
          autoZIndex: true,
          // @option hideSingleBase: Boolean = false
          // If `true`, the base layers in the control will be hidden when there is only one.
          hideSingleBase: false,
          // @option sortLayers: Boolean = false
          // Whether to sort the layers. When `false`, layers will keep the order
          // in which they were added to the control.
          sortLayers: false,
          // @option sortFunction: Function = *
          // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
          // that will be used for sorting the layers, when `sortLayers` is `true`.
          // The function receives both the `L.Layer` instances and their names, as in
          // `sortFunction(layerA, layerB, nameA, nameB)`.
          // By default, it sorts layers alphabetically by their name.
          sortFunction: function(layerA, layerB, nameA, nameB) {
            return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
          }
        },
        initialize: function(baseLayers, overlays, options) {
          setOptions(this, options);
          this._layerControlInputs = [];
          this._layers = [];
          this._lastZIndex = 0;
          this._handlingClick = false;
          this._preventClick = false;
          for (var i in baseLayers) {
            this._addLayer(baseLayers[i], i);
          }
          for (i in overlays) {
            this._addLayer(overlays[i], i, true);
          }
        },
        onAdd: function(map3) {
          this._initLayout();
          this._update();
          this._map = map3;
          map3.on("zoomend", this._checkDisabledLayers, this);
          for (var i = 0; i < this._layers.length; i++) {
            this._layers[i].layer.on("add remove", this._onLayerChange, this);
          }
          return this._container;
        },
        addTo: function(map3) {
          Control.prototype.addTo.call(this, map3);
          return this._expandIfNotCollapsed();
        },
        onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var i = 0; i < this._layers.length; i++) {
            this._layers[i].layer.off("add remove", this._onLayerChange, this);
          }
        },
        // @method addBaseLayer(layer: Layer, name: String): this
        // Adds a base layer (radio button entry) with the given name to the control.
        addBaseLayer: function(layer, name) {
          this._addLayer(layer, name);
          return this._map ? this._update() : this;
        },
        // @method addOverlay(layer: Layer, name: String): this
        // Adds an overlay (checkbox entry) with the given name to the control.
        addOverlay: function(layer, name) {
          this._addLayer(layer, name, true);
          return this._map ? this._update() : this;
        },
        // @method removeLayer(layer: Layer): this
        // Remove the given layer from the control.
        removeLayer: function(layer) {
          layer.off("add remove", this._onLayerChange, this);
          var obj = this._getLayer(stamp(layer));
          if (obj) {
            this._layers.splice(this._layers.indexOf(obj), 1);
          }
          return this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          addClass(this._container, "leaflet-control-layers-expanded");
          this._section.style.height = null;
          var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
          if (acceptableHeight < this._section.clientHeight) {
            addClass(this._section, "leaflet-control-layers-scrollbar");
            this._section.style.height = acceptableHeight + "px";
          } else {
            removeClass(this._section, "leaflet-control-layers-scrollbar");
          }
          this._checkDisabledLayers();
          return this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          removeClass(this._container, "leaflet-control-layers-expanded");
          return this;
        },
        _initLayout: function() {
          var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
          container.setAttribute("aria-haspopup", true);
          disableClickPropagation(container);
          disableScrollPropagation(container);
          var section = this._section = create$1("section", className + "-list");
          if (collapsed) {
            this._map.on("click", this.collapse, this);
            on(container, {
              mouseenter: this._expandSafely,
              mouseleave: this.collapse
            }, this);
          }
          var link = this._layersLink = create$1("a", className + "-toggle", container);
          link.href = "#";
          link.title = "Layers";
          link.setAttribute("role", "button");
          on(link, {
            keydown: function(e) {
              if (e.keyCode === 13) {
                this._expandSafely();
              }
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(e) {
              preventDefault(e);
              this._expandSafely();
            }
          }, this);
          if (!collapsed) {
            this.expand();
          }
          this._baseLayersList = create$1("div", className + "-base", section);
          this._separator = create$1("div", className + "-separator", section);
          this._overlaysList = create$1("div", className + "-overlays", section);
          container.appendChild(section);
        },
        _getLayer: function(id) {
          for (var i = 0; i < this._layers.length; i++) {
            if (this._layers[i] && stamp(this._layers[i].layer) === id) {
              return this._layers[i];
            }
          }
        },
        _addLayer: function(layer, name, overlay) {
          if (this._map) {
            layer.on("add remove", this._onLayerChange, this);
          }
          this._layers.push({
            layer,
            name,
            overlay
          });
          if (this.options.sortLayers) {
            this._layers.sort(bind(function(a, b) {
              return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
            }, this));
          }
          if (this.options.autoZIndex && layer.setZIndex) {
            this._lastZIndex++;
            layer.setZIndex(this._lastZIndex);
          }
          this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container) {
            return this;
          }
          empty(this._baseLayersList);
          empty(this._overlaysList);
          this._layerControlInputs = [];
          var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
          for (i = 0; i < this._layers.length; i++) {
            obj = this._layers[i];
            this._addItem(obj);
            overlaysPresent = overlaysPresent || obj.overlay;
            baseLayersPresent = baseLayersPresent || !obj.overlay;
            baseLayersCount += !obj.overlay ? 1 : 0;
          }
          if (this.options.hideSingleBase) {
            baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
            this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
          }
          this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
          return this;
        },
        _onLayerChange: function(e) {
          if (!this._handlingClick) {
            this._update();
          }
          var obj = this._getLayer(stamp(e.target));
          var type = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
          if (type) {
            this._map.fire(type, obj);
          }
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(name, checked) {
          var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
          var radioFragment = document.createElement("div");
          radioFragment.innerHTML = radioHtml;
          return radioFragment.firstChild;
        },
        _addItem: function(obj) {
          var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
          if (obj.overlay) {
            input = document.createElement("input");
            input.type = "checkbox";
            input.className = "leaflet-control-layers-selector";
            input.defaultChecked = checked;
          } else {
            input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
          }
          this._layerControlInputs.push(input);
          input.layerId = stamp(obj.layer);
          on(input, "click", this._onInputClick, this);
          var name = document.createElement("span");
          name.innerHTML = " " + obj.name;
          var holder = document.createElement("span");
          label.appendChild(holder);
          holder.appendChild(input);
          holder.appendChild(name);
          var container = obj.overlay ? this._overlaysList : this._baseLayersList;
          container.appendChild(label);
          this._checkDisabledLayers();
          return label;
        },
        _onInputClick: function() {
          if (this._preventClick) {
            return;
          }
          var inputs = this._layerControlInputs, input, layer;
          var addedLayers = [], removedLayers = [];
          this._handlingClick = true;
          for (var i = inputs.length - 1; i >= 0; i--) {
            input = inputs[i];
            layer = this._getLayer(input.layerId).layer;
            if (input.checked) {
              addedLayers.push(layer);
            } else if (!input.checked) {
              removedLayers.push(layer);
            }
          }
          for (i = 0; i < removedLayers.length; i++) {
            if (this._map.hasLayer(removedLayers[i])) {
              this._map.removeLayer(removedLayers[i]);
            }
          }
          for (i = 0; i < addedLayers.length; i++) {
            if (!this._map.hasLayer(addedLayers[i])) {
              this._map.addLayer(addedLayers[i]);
            }
          }
          this._handlingClick = false;
          this._refocusOnMap();
        },
        _checkDisabledLayers: function() {
          var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
          for (var i = inputs.length - 1; i >= 0; i--) {
            input = inputs[i];
            layer = this._getLayer(input.layerId).layer;
            input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
          }
        },
        _expandIfNotCollapsed: function() {
          if (this._map && !this.options.collapsed) {
            this.expand();
          }
          return this;
        },
        _expandSafely: function() {
          var section = this._section;
          this._preventClick = true;
          on(section, "click", preventDefault);
          this.expand();
          var that = this;
          setTimeout(function() {
            off(section, "click", preventDefault);
            that._preventClick = false;
          });
        }
      });
      var layers = function(baseLayers, overlays, options) {
        return new Layers(baseLayers, overlays, options);
      };
      var Zoom = Control.extend({
        // @section
        // @aka Control.Zoom options
        options: {
          position: "topleft",
          // @option zoomInText: String = '<span aria-hidden="true">+</span>'
          // The text set on the 'zoom in' button.
          zoomInText: '<span aria-hidden="true">+</span>',
          // @option zoomInTitle: String = 'Zoom in'
          // The title set on the 'zoom in' button.
          zoomInTitle: "Zoom in",
          // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
          // The text set on the 'zoom out' button.
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          // @option zoomOutTitle: String = 'Zoom out'
          // The title set on the 'zoom out' button.
          zoomOutTitle: "Zoom out"
        },
        onAdd: function(map3) {
          var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
          this._zoomInButton = this._createButton(
            options.zoomInText,
            options.zoomInTitle,
            zoomName + "-in",
            container,
            this._zoomIn
          );
          this._zoomOutButton = this._createButton(
            options.zoomOutText,
            options.zoomOutTitle,
            zoomName + "-out",
            container,
            this._zoomOut
          );
          this._updateDisabled();
          map3.on("zoomend zoomlevelschange", this._updateDisabled, this);
          return container;
        },
        onRemove: function(map3) {
          map3.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function() {
          this._disabled = true;
          this._updateDisabled();
          return this;
        },
        enable: function() {
          this._disabled = false;
          this._updateDisabled();
          return this;
        },
        _zoomIn: function(e) {
          if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
            this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
          }
        },
        _zoomOut: function(e) {
          if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
            this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
          }
        },
        _createButton: function(html, title, className, container, fn) {
          var link = create$1("a", className, container);
          link.innerHTML = html;
          link.href = "#";
          link.title = title;
          link.setAttribute("role", "button");
          link.setAttribute("aria-label", title);
          disableClickPropagation(link);
          on(link, "click", stop);
          on(link, "click", fn, this);
          on(link, "click", this._refocusOnMap, this);
          return link;
        },
        _updateDisabled: function() {
          var map3 = this._map, className = "leaflet-disabled";
          removeClass(this._zoomInButton, className);
          removeClass(this._zoomOutButton, className);
          this._zoomInButton.setAttribute("aria-disabled", "false");
          this._zoomOutButton.setAttribute("aria-disabled", "false");
          if (this._disabled || map3._zoom === map3.getMinZoom()) {
            addClass(this._zoomOutButton, className);
            this._zoomOutButton.setAttribute("aria-disabled", "true");
          }
          if (this._disabled || map3._zoom === map3.getMaxZoom()) {
            addClass(this._zoomInButton, className);
            this._zoomInButton.setAttribute("aria-disabled", "true");
          }
        }
      });
      Map2.mergeOptions({
        zoomControl: true
      });
      Map2.addInitHook(function() {
        if (this.options.zoomControl) {
          this.zoomControl = new Zoom();
          this.addControl(this.zoomControl);
        }
      });
      var zoom = function(options) {
        return new Zoom(options);
      };
      var Scale = Control.extend({
        // @section
        // @aka Control.Scale options
        options: {
          position: "bottomleft",
          // @option maxWidth: Number = 100
          // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
          maxWidth: 100,
          // @option metric: Boolean = True
          // Whether to show the metric scale line (m/km).
          metric: true,
          // @option imperial: Boolean = True
          // Whether to show the imperial scale line (mi/ft).
          imperial: true
          // @option updateWhenIdle: Boolean = false
          // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
        },
        onAdd: function(map3) {
          var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
          this._addScales(options, className + "-line", container);
          map3.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
          map3.whenReady(this._update, this);
          return container;
        },
        onRemove: function(map3) {
          map3.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(options, className, container) {
          if (options.metric) {
            this._mScale = create$1("div", className, container);
          }
          if (options.imperial) {
            this._iScale = create$1("div", className, container);
          }
        },
        _update: function() {
          var map3 = this._map, y = map3.getSize().y / 2;
          var maxMeters = map3.distance(
            map3.containerPointToLatLng([0, y]),
            map3.containerPointToLatLng([this.options.maxWidth, y])
          );
          this._updateScales(maxMeters);
        },
        _updateScales: function(maxMeters) {
          if (this.options.metric && maxMeters) {
            this._updateMetric(maxMeters);
          }
          if (this.options.imperial && maxMeters) {
            this._updateImperial(maxMeters);
          }
        },
        _updateMetric: function(maxMeters) {
          var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
          this._updateScale(this._mScale, label, meters / maxMeters);
        },
        _updateImperial: function(maxMeters) {
          var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
          if (maxFeet > 5280) {
            maxMiles = maxFeet / 5280;
            miles = this._getRoundNum(maxMiles);
            this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
          } else {
            feet = this._getRoundNum(maxFeet);
            this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
          }
        },
        _updateScale: function(scale2, text, ratio) {
          scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
          scale2.innerHTML = text;
        },
        _getRoundNum: function(num) {
          var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
          d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
          return pow10 * d;
        }
      });
      var scale = function(options) {
        return new Scale(options);
      };
      var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
      var Attribution = Control.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
        },
        initialize: function(options) {
          setOptions(this, options);
          this._attributions = {};
        },
        onAdd: function(map3) {
          map3.attributionControl = this;
          this._container = create$1("div", "leaflet-control-attribution");
          disableClickPropagation(this._container);
          for (var i in map3._layers) {
            if (map3._layers[i].getAttribution) {
              this.addAttribution(map3._layers[i].getAttribution());
            }
          }
          this._update();
          map3.on("layeradd", this._addAttribution, this);
          return this._container;
        },
        onRemove: function(map3) {
          map3.off("layeradd", this._addAttribution, this);
        },
        _addAttribution: function(ev) {
          if (ev.layer.getAttribution) {
            this.addAttribution(ev.layer.getAttribution());
            ev.layer.once("remove", function() {
              this.removeAttribution(ev.layer.getAttribution());
            }, this);
          }
        },
        // @method setPrefix(prefix: String|false): this
        // The HTML text shown before the attributions. Pass `false` to disable.
        setPrefix: function(prefix) {
          this.options.prefix = prefix;
          this._update();
          return this;
        },
        // @method addAttribution(text: String): this
        // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
        addAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (!this._attributions[text]) {
            this._attributions[text] = 0;
          }
          this._attributions[text]++;
          this._update();
          return this;
        },
        // @method removeAttribution(text: String): this
        // Removes an attribution text.
        removeAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (this._attributions[text]) {
            this._attributions[text]--;
            this._update();
          }
          return this;
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          var attribs = [];
          for (var i in this._attributions) {
            if (this._attributions[i]) {
              attribs.push(i);
            }
          }
          var prefixAndAttribs = [];
          if (this.options.prefix) {
            prefixAndAttribs.push(this.options.prefix);
          }
          if (attribs.length) {
            prefixAndAttribs.push(attribs.join(", "));
          }
          this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
        }
      });
      Map2.mergeOptions({
        attributionControl: true
      });
      Map2.addInitHook(function() {
        if (this.options.attributionControl) {
          new Attribution().addTo(this);
        }
      });
      var attribution = function(options) {
        return new Attribution(options);
      };
      Control.Layers = Layers;
      Control.Zoom = Zoom;
      Control.Scale = Scale;
      Control.Attribution = Attribution;
      control.layers = layers;
      control.zoom = zoom;
      control.scale = scale;
      control.attribution = attribution;
      var Handler = Class.extend({
        initialize: function(map3) {
          this._map = map3;
        },
        // @method enable(): this
        // Enables the handler
        enable: function() {
          if (this._enabled) {
            return this;
          }
          this._enabled = true;
          this.addHooks();
          return this;
        },
        // @method disable(): this
        // Disables the handler
        disable: function() {
          if (!this._enabled) {
            return this;
          }
          this._enabled = false;
          this.removeHooks();
          return this;
        },
        // @method enabled(): Boolean
        // Returns `true` if the handler is enabled
        enabled: function() {
          return !!this._enabled;
        }
        // @section Extension methods
        // Classes inheriting from `Handler` must implement the two following methods:
        // @method addHooks()
        // Called when the handler is enabled, should add event hooks.
        // @method removeHooks()
        // Called when the handler is disabled, should remove the event hooks added previously.
      });
      Handler.addTo = function(map3, name) {
        map3.addHandler(name, this);
        return this;
      };
      var Mixin = { Events };
      var START = Browser.touch ? "touchstart mousedown" : "mousedown";
      var Draggable = Evented.extend({
        options: {
          // @section
          // @aka Draggable options
          // @option clickTolerance: Number = 3
          // The max number of pixels a user can shift the mouse pointer during a click
          // for it to be considered a valid click (as opposed to a mouse drag).
          clickTolerance: 3
        },
        // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
        // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
        initialize: function(element, dragStartTarget, preventOutline2, options) {
          setOptions(this, options);
          this._element = element;
          this._dragStartTarget = dragStartTarget || element;
          this._preventOutline = preventOutline2;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          if (this._enabled) {
            return;
          }
          on(this._dragStartTarget, START, this._onDown, this);
          this._enabled = true;
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          if (!this._enabled) {
            return;
          }
          if (Draggable._dragging === this) {
            this.finishDrag(true);
          }
          off(this._dragStartTarget, START, this._onDown, this);
          this._enabled = false;
          this._moved = false;
        },
        _onDown: function(e) {
          if (!this._enabled) {
            return;
          }
          this._moved = false;
          if (hasClass(this._element, "leaflet-zoom-anim")) {
            return;
          }
          if (e.touches && e.touches.length !== 1) {
            if (Draggable._dragging === this) {
              this.finishDrag();
            }
            return;
          }
          if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) {
            return;
          }
          Draggable._dragging = this;
          if (this._preventOutline) {
            preventOutline(this._element);
          }
          disableImageDrag();
          disableTextSelection();
          if (this._moving) {
            return;
          }
          this.fire("down");
          var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
          this._startPoint = new Point(first.clientX, first.clientY);
          this._startPos = getPosition(this._element);
          this._parentScale = getScale(sizedParent);
          var mouseevent = e.type === "mousedown";
          on(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
          on(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
        },
        _onMove: function(e) {
          if (!this._enabled) {
            return;
          }
          if (e.touches && e.touches.length > 1) {
            this._moved = true;
            return;
          }
          var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
          if (!offset.x && !offset.y) {
            return;
          }
          if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
            return;
          }
          offset.x /= this._parentScale.x;
          offset.y /= this._parentScale.y;
          preventDefault(e);
          if (!this._moved) {
            this.fire("dragstart");
            this._moved = true;
            addClass(document.body, "leaflet-dragging");
            this._lastTarget = e.target || e.srcElement;
            if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
              this._lastTarget = this._lastTarget.correspondingUseElement;
            }
            addClass(this._lastTarget, "leaflet-drag-target");
          }
          this._newPos = this._startPos.add(offset);
          this._moving = true;
          this._lastEvent = e;
          this._updatePosition();
        },
        _updatePosition: function() {
          var e = { originalEvent: this._lastEvent };
          this.fire("predrag", e);
          setPosition(this._element, this._newPos);
          this.fire("drag", e);
        },
        _onUp: function() {
          if (!this._enabled) {
            return;
          }
          this.finishDrag();
        },
        finishDrag: function(noInertia) {
          removeClass(document.body, "leaflet-dragging");
          if (this._lastTarget) {
            removeClass(this._lastTarget, "leaflet-drag-target");
            this._lastTarget = null;
          }
          off(document, "mousemove touchmove", this._onMove, this);
          off(document, "mouseup touchend touchcancel", this._onUp, this);
          enableImageDrag();
          enableTextSelection();
          var fireDragend = this._moved && this._moving;
          this._moving = false;
          Draggable._dragging = false;
          if (fireDragend) {
            this.fire("dragend", {
              noInertia,
              distance: this._newPos.distanceTo(this._startPos)
            });
          }
        }
      });
      function clipPolygon(points, bounds, round) {
        var clippedPoints, edges = [1, 4, 2, 8], i, j, k, a, b, len, edge2, p;
        for (i = 0, len = points.length; i < len; i++) {
          points[i]._code = _getBitCode(points[i], bounds);
        }
        for (k = 0; k < 4; k++) {
          edge2 = edges[k];
          clippedPoints = [];
          for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
            a = points[i];
            b = points[j];
            if (!(a._code & edge2)) {
              if (b._code & edge2) {
                p = _getEdgeIntersection(b, a, edge2, bounds, round);
                p._code = _getBitCode(p, bounds);
                clippedPoints.push(p);
              }
              clippedPoints.push(a);
            } else if (!(b._code & edge2)) {
              p = _getEdgeIntersection(b, a, edge2, bounds, round);
              p._code = _getBitCode(p, bounds);
              clippedPoints.push(p);
            }
          }
          points = clippedPoints;
        }
        return points;
      }
      function polygonCenter(latlngs, crs) {
        var i, j, p1, p2, f, area, x, y, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i = 0; i < len; i++) {
          var latlng = toLatLng(latlngs[i]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        area = x = y = 0;
        for (i = 0, j = len - 1; i < len; j = i++) {
          p1 = points[i];
          p2 = points[j];
          f = p1.y * p2.x - p2.y * p1.x;
          x += (p1.x + p2.x) * f;
          y += (p1.y + p2.y) * f;
          area += f * 3;
        }
        if (area === 0) {
          center = points[0];
        } else {
          center = [x / area, y / area];
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      function centroid(coords) {
        var latSum = 0;
        var lngSum = 0;
        var len = 0;
        for (var i = 0; i < coords.length; i++) {
          var latlng = toLatLng(coords[i]);
          latSum += latlng.lat;
          lngSum += latlng.lng;
          len++;
        }
        return toLatLng([latSum / len, lngSum / len]);
      }
      var PolyUtil = {
        __proto__: null,
        clipPolygon,
        polygonCenter,
        centroid
      };
      function simplify(points, tolerance) {
        if (!tolerance || !points.length) {
          return points.slice();
        }
        var sqTolerance = tolerance * tolerance;
        points = _reducePoints(points, sqTolerance);
        points = _simplifyDP(points, sqTolerance);
        return points;
      }
      function pointToSegmentDistance(p, p1, p2) {
        return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
      }
      function closestPointOnSegment(p, p1, p2) {
        return _sqClosestPointOnSegment(p, p1, p2);
      }
      function _simplifyDP(points, sqTolerance) {
        var len = points.length, ArrayConstructor = typeof Uint8Array !== "undefined" ? Uint8Array : Array, markers = new ArrayConstructor(len);
        markers[0] = markers[len - 1] = 1;
        _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
        var i, newPoints = [];
        for (i = 0; i < len; i++) {
          if (markers[i]) {
            newPoints.push(points[i]);
          }
        }
        return newPoints;
      }
      function _simplifyDPStep(points, markers, sqTolerance, first, last) {
        var maxSqDist = 0, index2, i, sqDist;
        for (i = first + 1; i <= last - 1; i++) {
          sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
          if (sqDist > maxSqDist) {
            index2 = i;
            maxSqDist = sqDist;
          }
        }
        if (maxSqDist > sqTolerance) {
          markers[index2] = 1;
          _simplifyDPStep(points, markers, sqTolerance, first, index2);
          _simplifyDPStep(points, markers, sqTolerance, index2, last);
        }
      }
      function _reducePoints(points, sqTolerance) {
        var reducedPoints = [points[0]];
        for (var i = 1, prev = 0, len = points.length; i < len; i++) {
          if (_sqDist(points[i], points[prev]) > sqTolerance) {
            reducedPoints.push(points[i]);
            prev = i;
          }
        }
        if (prev < len - 1) {
          reducedPoints.push(points[len - 1]);
        }
        return reducedPoints;
      }
      var _lastCode;
      function clipSegment(a, b, bounds, useLastCode, round) {
        var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
        _lastCode = codeB;
        while (true) {
          if (!(codeA | codeB)) {
            return [a, b];
          }
          if (codeA & codeB) {
            return false;
          }
          codeOut = codeA || codeB;
          p = _getEdgeIntersection(a, b, codeOut, bounds, round);
          newCode = _getBitCode(p, bounds);
          if (codeOut === codeA) {
            a = p;
            codeA = newCode;
          } else {
            b = p;
            codeB = newCode;
          }
        }
      }
      function _getEdgeIntersection(a, b, code, bounds, round) {
        var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x, y;
        if (code & 8) {
          x = a.x + dx * (max.y - a.y) / dy;
          y = max.y;
        } else if (code & 4) {
          x = a.x + dx * (min.y - a.y) / dy;
          y = min.y;
        } else if (code & 2) {
          x = max.x;
          y = a.y + dy * (max.x - a.x) / dx;
        } else if (code & 1) {
          x = min.x;
          y = a.y + dy * (min.x - a.x) / dx;
        }
        return new Point(x, y, round);
      }
      function _getBitCode(p, bounds) {
        var code = 0;
        if (p.x < bounds.min.x) {
          code |= 1;
        } else if (p.x > bounds.max.x) {
          code |= 2;
        }
        if (p.y < bounds.min.y) {
          code |= 4;
        } else if (p.y > bounds.max.y) {
          code |= 8;
        }
        return code;
      }
      function _sqDist(p1, p2) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        return dx * dx + dy * dy;
      }
      function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
        var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y, dot = dx * dx + dy * dy, t;
        if (dot > 0) {
          t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
          if (t > 1) {
            x = p2.x;
            y = p2.y;
          } else if (t > 0) {
            x += dx * t;
            y += dy * t;
          }
        }
        dx = p.x - x;
        dy = p.y - y;
        return sqDist ? dx * dx + dy * dy : new Point(x, y);
      }
      function isFlat(latlngs) {
        return !isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
      }
      function _flat(latlngs) {
        console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
        return isFlat(latlngs);
      }
      function polylineCenter(latlngs, crs) {
        var i, halfDist, segDist, dist, p1, p2, ratio, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i = 0; i < len; i++) {
          var latlng = toLatLng(latlngs[i]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        for (i = 0, halfDist = 0; i < len - 1; i++) {
          halfDist += points[i].distanceTo(points[i + 1]) / 2;
        }
        if (halfDist === 0) {
          center = points[0];
        } else {
          for (i = 0, dist = 0; i < len - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            segDist = p1.distanceTo(p2);
            dist += segDist;
            if (dist > halfDist) {
              ratio = (dist - halfDist) / segDist;
              center = [
                p2.x - ratio * (p2.x - p1.x),
                p2.y - ratio * (p2.y - p1.y)
              ];
              break;
            }
          }
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      var LineUtil = {
        __proto__: null,
        simplify,
        pointToSegmentDistance,
        closestPointOnSegment,
        clipSegment,
        _getEdgeIntersection,
        _getBitCode,
        _sqClosestPointOnSegment,
        isFlat,
        _flat,
        polylineCenter
      };
      var LonLat = {
        project: function(latlng) {
          return new Point(latlng.lng, latlng.lat);
        },
        unproject: function(point) {
          return new LatLng2(point.y, point.x);
        },
        bounds: new Bounds([-180, -90], [180, 90])
      };
      var Mercator = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(latlng) {
          var d = Math.PI / 180, r = this.R, y = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
          var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
          y = -r * Math.log(Math.max(ts, 1e-10));
          return new Point(latlng.lng * d * r, y);
        },
        unproject: function(point) {
          var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
          for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
            con = e * Math.sin(phi);
            con = Math.pow((1 - con) / (1 + con), e / 2);
            dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
            phi += dphi;
          }
          return new LatLng2(phi * d, point.x * d / r);
        }
      };
      var index = {
        __proto__: null,
        LonLat,
        Mercator,
        SphericalMercator
      };
      var EPSG3395 = extend({}, Earth, {
        code: "EPSG:3395",
        projection: Mercator,
        transformation: function() {
          var scale2 = 0.5 / (Math.PI * Mercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        }()
      });
      var EPSG4326 = extend({}, Earth, {
        code: "EPSG:4326",
        projection: LonLat,
        transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
      });
      var Simple = extend({}, CRS, {
        projection: LonLat,
        transformation: toTransformation(1, 0, -1, 0),
        scale: function(zoom2) {
          return Math.pow(2, zoom2);
        },
        zoom: function(scale2) {
          return Math.log(scale2) / Math.LN2;
        },
        distance: function(latlng1, latlng2) {
          var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
          return Math.sqrt(dx * dx + dy * dy);
        },
        infinite: true
      });
      CRS.Earth = Earth;
      CRS.EPSG3395 = EPSG3395;
      CRS.EPSG3857 = EPSG3857;
      CRS.EPSG900913 = EPSG900913;
      CRS.EPSG4326 = EPSG4326;
      CRS.Simple = Simple;
      var Layer = Evented.extend({
        // Classes extending `L.Layer` will inherit the following options:
        options: {
          // @option pane: String = 'overlayPane'
          // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
          pane: "overlayPane",
          // @option attribution: String = null
          // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
          attribution: null,
          bubblingMouseEvents: true
        },
        /* @section
         * Classes extending `L.Layer` will inherit the following methods:
         *
         * @method addTo(map: Map|LayerGroup): this
         * Adds the layer to the given map or layer group.
         */
        addTo: function(map3) {
          map3.addLayer(this);
          return this;
        },
        // @method remove: this
        // Removes the layer from the map it is currently active on.
        remove: function() {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        // @method removeFrom(map: Map): this
        // Removes the layer from the given map
        //
        // @alternative
        // @method removeFrom(group: LayerGroup): this
        // Removes the layer from the given `LayerGroup`
        removeFrom: function(obj) {
          if (obj) {
            obj.removeLayer(this);
          }
          return this;
        },
        // @method getPane(name? : String): HTMLElement
        // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
        getPane: function(name) {
          return this._map.getPane(name ? this.options[name] || name : this.options.pane);
        },
        addInteractiveTarget: function(targetEl) {
          this._map._targets[stamp(targetEl)] = this;
          return this;
        },
        removeInteractiveTarget: function(targetEl) {
          delete this._map._targets[stamp(targetEl)];
          return this;
        },
        // @method getAttribution: String
        // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
        getAttribution: function() {
          return this.options.attribution;
        },
        _layerAdd: function(e) {
          var map3 = e.target;
          if (!map3.hasLayer(this)) {
            return;
          }
          this._map = map3;
          this._zoomAnimated = map3._zoomAnimated;
          if (this.getEvents) {
            var events = this.getEvents();
            map3.on(events, this);
            this.once("remove", function() {
              map3.off(events, this);
            }, this);
          }
          this.onAdd(map3);
          this.fire("add");
          map3.fire("layeradd", { layer: this });
        }
      });
      Map2.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(layer) {
          if (!layer._layerAdd) {
            throw new Error("The provided object is not a Layer.");
          }
          var id = stamp(layer);
          if (this._layers[id]) {
            return this;
          }
          this._layers[id] = layer;
          layer._mapToAdd = this;
          if (layer.beforeAdd) {
            layer.beforeAdd(this);
          }
          this.whenReady(layer._layerAdd, layer);
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(layer) {
          var id = stamp(layer);
          if (!this._layers[id]) {
            return this;
          }
          if (this._loaded) {
            layer.onRemove(this);
          }
          delete this._layers[id];
          if (this._loaded) {
            this.fire("layerremove", { layer });
            layer.fire("remove");
          }
          layer._map = layer._mapToAdd = null;
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(layer) {
          return stamp(layer) in this._layers;
        },
        /* @method eachLayer(fn: Function, context?: Object): this
         * Iterates over the layers of the map, optionally specifying context of the iterator function.
         * ```
         * map.eachLayer(function(layer){
         *     layer.bindPopup('Hello');
         * });
         * ```
         */
        eachLayer: function(method, context) {
          for (var i in this._layers) {
            method.call(context, this._layers[i]);
          }
          return this;
        },
        _addLayers: function(layers2) {
          layers2 = layers2 ? isArray(layers2) ? layers2 : [layers2] : [];
          for (var i = 0, len = layers2.length; i < len; i++) {
            this.addLayer(layers2[i]);
          }
        },
        _addZoomLimit: function(layer) {
          if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
            this._zoomBoundLayers[stamp(layer)] = layer;
            this._updateZoomLevels();
          }
        },
        _removeZoomLimit: function(layer) {
          var id = stamp(layer);
          if (this._zoomBoundLayers[id]) {
            delete this._zoomBoundLayers[id];
            this._updateZoomLevels();
          }
        },
        _updateZoomLevels: function() {
          var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
          for (var i in this._zoomBoundLayers) {
            var options = this._zoomBoundLayers[i].options;
            minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
            maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
          }
          this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
          this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
          if (oldZoomSpan !== this._getZoomSpan()) {
            this.fire("zoomlevelschange");
          }
          if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
            this.setZoom(this._layersMaxZoom);
          }
          if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
            this.setZoom(this._layersMinZoom);
          }
        }
      });
      var LayerGroup = Layer.extend({
        initialize: function(layers2, options) {
          setOptions(this, options);
          this._layers = {};
          var i, len;
          if (layers2) {
            for (i = 0, len = layers2.length; i < len; i++) {
              this.addLayer(layers2[i]);
            }
          }
        },
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the group.
        addLayer: function(layer) {
          var id = this.getLayerId(layer);
          this._layers[id] = layer;
          if (this._map) {
            this._map.addLayer(layer);
          }
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the group.
        // @alternative
        // @method removeLayer(id: Number): this
        // Removes the layer with the given internal ID from the group.
        removeLayer: function(layer) {
          var id = layer in this._layers ? layer : this.getLayerId(layer);
          if (this._map && this._layers[id]) {
            this._map.removeLayer(this._layers[id]);
          }
          delete this._layers[id];
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the group.
        // @alternative
        // @method hasLayer(id: Number): Boolean
        // Returns `true` if the given internal ID is currently added to the group.
        hasLayer: function(layer) {
          var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
          return layerId in this._layers;
        },
        // @method clearLayers(): this
        // Removes all the layers from the group.
        clearLayers: function() {
          return this.eachLayer(this.removeLayer, this);
        },
        // @method invoke(methodName: String, …): this
        // Calls `methodName` on every layer contained in this group, passing any
        // additional parameters. Has no effect if the layers contained do not
        // implement `methodName`.
        invoke: function(methodName) {
          var args = Array.prototype.slice.call(arguments, 1), i, layer;
          for (i in this._layers) {
            layer = this._layers[i];
            if (layer[methodName]) {
              layer[methodName].apply(layer, args);
            }
          }
          return this;
        },
        onAdd: function(map3) {
          this.eachLayer(map3.addLayer, map3);
        },
        onRemove: function(map3) {
          this.eachLayer(map3.removeLayer, map3);
        },
        // @method eachLayer(fn: Function, context?: Object): this
        // Iterates over the layers of the group, optionally specifying context of the iterator function.
        // ```js
        // group.eachLayer(function (layer) {
        // 	layer.bindPopup('Hello');
        // });
        // ```
        eachLayer: function(method, context) {
          for (var i in this._layers) {
            method.call(context, this._layers[i]);
          }
          return this;
        },
        // @method getLayer(id: Number): Layer
        // Returns the layer with the given internal ID.
        getLayer: function(id) {
          return this._layers[id];
        },
        // @method getLayers(): Layer[]
        // Returns an array of all the layers added to the group.
        getLayers: function() {
          var layers2 = [];
          this.eachLayer(layers2.push, layers2);
          return layers2;
        },
        // @method setZIndex(zIndex: Number): this
        // Calls `setZIndex` on every layer contained in this group, passing the z-index.
        setZIndex: function(zIndex) {
          return this.invoke("setZIndex", zIndex);
        },
        // @method getLayerId(layer: Layer): Number
        // Returns the internal ID for a layer
        getLayerId: function(layer) {
          return stamp(layer);
        }
      });
      var layerGroup = function(layers2, options) {
        return new LayerGroup(layers2, options);
      };
      var FeatureGroup2 = LayerGroup.extend({
        addLayer: function(layer) {
          if (this.hasLayer(layer)) {
            return this;
          }
          layer.addEventParent(this);
          LayerGroup.prototype.addLayer.call(this, layer);
          return this.fire("layeradd", { layer });
        },
        removeLayer: function(layer) {
          if (!this.hasLayer(layer)) {
            return this;
          }
          if (layer in this._layers) {
            layer = this._layers[layer];
          }
          layer.removeEventParent(this);
          LayerGroup.prototype.removeLayer.call(this, layer);
          return this.fire("layerremove", { layer });
        },
        // @method setStyle(style: Path options): this
        // Sets the given path options to each layer of the group that has a `setStyle` method.
        setStyle: function(style2) {
          return this.invoke("setStyle", style2);
        },
        // @method bringToFront(): this
        // Brings the layer group to the top of all other layers
        bringToFront: function() {
          return this.invoke("bringToFront");
        },
        // @method bringToBack(): this
        // Brings the layer group to the back of all other layers
        bringToBack: function() {
          return this.invoke("bringToBack");
        },
        // @method getBounds(): LatLngBounds
        // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
        getBounds: function() {
          var bounds = new LatLngBounds();
          for (var id in this._layers) {
            var layer = this._layers[id];
            bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
          }
          return bounds;
        }
      });
      var featureGroup = function(layers2, options) {
        return new FeatureGroup2(layers2, options);
      };
      var Icon = Class.extend({
        /* @section
         * @aka Icon options
         *
         * @option iconUrl: String = null
         * **(required)** The URL to the icon image (absolute or relative to your script path).
         *
         * @option iconRetinaUrl: String = null
         * The URL to a retina sized version of the icon image (absolute or relative to your
         * script path). Used for Retina screen devices.
         *
         * @option iconSize: Point = null
         * Size of the icon image in pixels.
         *
         * @option iconAnchor: Point = null
         * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
         * will be aligned so that this point is at the marker's geographical location. Centered
         * by default if size is specified, also can be set in CSS with negative margins.
         *
         * @option popupAnchor: Point = [0, 0]
         * The coordinates of the point from which popups will "open", relative to the icon anchor.
         *
         * @option tooltipAnchor: Point = [0, 0]
         * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
         *
         * @option shadowUrl: String = null
         * The URL to the icon shadow image. If not specified, no shadow image will be created.
         *
         * @option shadowRetinaUrl: String = null
         *
         * @option shadowSize: Point = null
         * Size of the shadow image in pixels.
         *
         * @option shadowAnchor: Point = null
         * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
         * as iconAnchor if not specified).
         *
         * @option className: String = ''
         * A custom class name to assign to both icon and shadow images. Empty by default.
         */
        options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        // @method createIcon(oldIcon?: HTMLElement): HTMLElement
        // Called internally when the icon has to be shown, returns a `<img>` HTML element
        // styled according to the options.
        createIcon: function(oldIcon) {
          return this._createIcon("icon", oldIcon);
        },
        // @method createShadow(oldIcon?: HTMLElement): HTMLElement
        // As `createIcon`, but for the shadow beneath it.
        createShadow: function(oldIcon) {
          return this._createIcon("shadow", oldIcon);
        },
        _createIcon: function(name, oldIcon) {
          var src = this._getIconUrl(name);
          if (!src) {
            if (name === "icon") {
              throw new Error("iconUrl not set in Icon options (see the docs).");
            }
            return null;
          }
          var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
          this._setIconStyles(img, name);
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          return img;
        },
        _setIconStyles: function(img, name) {
          var options = this.options;
          var sizeOption = options[name + "Size"];
          if (typeof sizeOption === "number") {
            sizeOption = [sizeOption, sizeOption];
          }
          var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
          img.className = "leaflet-marker-" + name + " " + (options.className || "");
          if (anchor) {
            img.style.marginLeft = -anchor.x + "px";
            img.style.marginTop = -anchor.y + "px";
          }
          if (size) {
            img.style.width = size.x + "px";
            img.style.height = size.y + "px";
          }
        },
        _createImg: function(src, el) {
          el = el || document.createElement("img");
          el.src = src;
          return el;
        },
        _getIconUrl: function(name) {
          return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
        }
      });
      function icon(options) {
        return new Icon(options);
      }
      var IconDefault = Icon.extend({
        options: {
          iconUrl: "marker-icon.png",
          iconRetinaUrl: "marker-icon-2x.png",
          shadowUrl: "marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        },
        _getIconUrl: function(name) {
          if (typeof IconDefault.imagePath !== "string") {
            IconDefault.imagePath = this._detectIconPath();
          }
          return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
        },
        _stripUrl: function(path) {
          var strip = function(str, re, idx) {
            var match = re.exec(str);
            return match && match[idx];
          };
          path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
          return path && strip(path, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var el = create$1("div", "leaflet-default-icon-path", document.body);
          var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
          document.body.removeChild(el);
          path = this._stripUrl(path);
          if (path) {
            return path;
          }
          var link = document.querySelector('link[href$="leaflet.css"]');
          if (!link) {
            return "";
          }
          return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
        }
      });
      var MarkerDrag = Handler.extend({
        initialize: function(marker3) {
          this._marker = marker3;
        },
        addHooks: function() {
          var icon2 = this._marker._icon;
          if (!this._draggable) {
            this._draggable = new Draggable(icon2, icon2, true);
          }
          this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable();
          addClass(icon2, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable();
          if (this._marker._icon) {
            removeClass(this._marker._icon, "leaflet-marker-draggable");
          }
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(e) {
          var marker3 = this._marker, map3 = marker3._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker3._icon), bounds = map3.getPixelBounds(), origin = map3.getPixelOrigin();
          var panBounds = toBounds(
            bounds.min._subtract(origin).add(padding),
            bounds.max._subtract(origin).subtract(padding)
          );
          if (!panBounds.contains(iconPos)) {
            var movement = toPoint(
              (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
              (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
            ).multiplyBy(speed);
            map3.panBy(movement, { animate: false });
            this._draggable._newPos._add(movement);
            this._draggable._startPos._add(movement);
            setPosition(marker3._icon, this._draggable._newPos);
            this._onDrag(e);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng();
          this._marker.closePopup && this._marker.closePopup();
          this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(e) {
          if (this._marker.options.autoPan) {
            cancelAnimFrame(this._panRequest);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
          }
        },
        _onDrag: function(e) {
          var marker3 = this._marker, shadow = marker3._shadow, iconPos = getPosition(marker3._icon), latlng = marker3._map.layerPointToLatLng(iconPos);
          if (shadow) {
            setPosition(shadow, iconPos);
          }
          marker3._latlng = latlng;
          e.latlng = latlng;
          e.oldLatLng = this._oldLatLng;
          marker3.fire("move", e).fire("drag", e);
        },
        _onDragEnd: function(e) {
          cancelAnimFrame(this._panRequest);
          delete this._oldLatLng;
          this._marker.fire("moveend").fire("dragend", e);
        }
      });
      var Marker = Layer.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new IconDefault(),
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option keyboard: Boolean = true
          // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
          keyboard: true,
          // @option title: String = ''
          // Text for the browser tooltip that appear on marker hover (no tooltip by default).
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          title: "",
          // @option alt: String = 'Marker'
          // Text for the `alt` attribute of the icon image.
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          alt: "Marker",
          // @option zIndexOffset: Number = 0
          // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
          zIndexOffset: 0,
          // @option opacity: Number = 1.0
          // The opacity of the marker.
          opacity: 1,
          // @option riseOnHover: Boolean = false
          // If `true`, the marker will get on top of others when you hover the mouse over it.
          riseOnHover: false,
          // @option riseOffset: Number = 250
          // The z-index offset used for the `riseOnHover` feature.
          riseOffset: 250,
          // @option pane: String = 'markerPane'
          // `Map pane` where the markers icon will be added.
          pane: "markerPane",
          // @option shadowPane: String = 'shadowPane'
          // `Map pane` where the markers shadow will be added.
          shadowPane: "shadowPane",
          // @option bubblingMouseEvents: Boolean = false
          // When `true`, a mouse event on this marker will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: false,
          // @option autoPanOnFocus: Boolean = true
          // When `true`, the map will pan whenever the marker is focused (via
          // e.g. pressing `tab` on the keyboard) to ensure the marker is
          // visible within the map's bounds
          autoPanOnFocus: true,
          // @section Draggable marker options
          // @option draggable: Boolean = false
          // Whether the marker is draggable with mouse/touch or not.
          draggable: false,
          // @option autoPan: Boolean = false
          // Whether to pan the map when dragging this marker near its edge or not.
          autoPan: false,
          // @option autoPanPadding: Point = Point(50, 50)
          // Distance (in pixels to the left/right and to the top/bottom) of the
          // map edge to start panning the map.
          autoPanPadding: [50, 50],
          // @option autoPanSpeed: Number = 10
          // Number of pixels the map should pan by.
          autoPanSpeed: 10
        },
        /* @section
         *
         * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
         */
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
        },
        onAdd: function(map3) {
          this._zoomAnimated = this._zoomAnimated && map3.options.markerZoomAnimation;
          if (this._zoomAnimated) {
            map3.on("zoomanim", this._animateZoom, this);
          }
          this._initIcon();
          this.update();
        },
        onRemove: function(map3) {
          if (this.dragging && this.dragging.enabled()) {
            this.options.draggable = true;
            this.dragging.removeHooks();
          }
          delete this.dragging;
          if (this._zoomAnimated) {
            map3.off("zoomanim", this._animateZoom, this);
          }
          this._removeIcon();
          this._removeShadow();
        },
        getEvents: function() {
          return {
            zoom: this.update,
            viewreset: this.update
          };
        },
        // @method getLatLng: LatLng
        // Returns the current geographical position of the marker.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Changes the marker position to the given point.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.update();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method setZIndexOffset(offset: Number): this
        // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
        setZIndexOffset: function(offset) {
          this.options.zIndexOffset = offset;
          return this.update();
        },
        // @method getIcon: Icon
        // Returns the current icon used by the marker
        getIcon: function() {
          return this.options.icon;
        },
        // @method setIcon(icon: Icon): this
        // Changes the marker icon.
        setIcon: function(icon2) {
          this.options.icon = icon2;
          if (this._map) {
            this._initIcon();
            this.update();
          }
          if (this._popup) {
            this.bindPopup(this._popup, this._popup.options);
          }
          return this;
        },
        getElement: function() {
          return this._icon;
        },
        update: function() {
          if (this._icon && this._map) {
            var pos = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(pos);
          }
          return this;
        },
        _initIcon: function() {
          var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          var icon2 = options.icon.createIcon(this._icon), addIcon = false;
          if (icon2 !== this._icon) {
            if (this._icon) {
              this._removeIcon();
            }
            addIcon = true;
            if (options.title) {
              icon2.title = options.title;
            }
            if (icon2.tagName === "IMG") {
              icon2.alt = options.alt || "";
            }
          }
          addClass(icon2, classToAdd);
          if (options.keyboard) {
            icon2.tabIndex = "0";
            icon2.setAttribute("role", "button");
          }
          this._icon = icon2;
          if (options.riseOnHover) {
            this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            on(icon2, "focus", this._panOnFocus, this);
          }
          var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
          if (newShadow !== this._shadow) {
            this._removeShadow();
            addShadow = true;
          }
          if (newShadow) {
            addClass(newShadow, classToAdd);
            newShadow.alt = "";
          }
          this._shadow = newShadow;
          if (options.opacity < 1) {
            this._updateOpacity();
          }
          if (addIcon) {
            this.getPane().appendChild(this._icon);
          }
          this._initInteraction();
          if (newShadow && addShadow) {
            this.getPane(options.shadowPane).appendChild(this._shadow);
          }
        },
        _removeIcon: function() {
          if (this.options.riseOnHover) {
            this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            off(this._icon, "focus", this._panOnFocus, this);
          }
          remove(this._icon);
          this.removeInteractiveTarget(this._icon);
          this._icon = null;
        },
        _removeShadow: function() {
          if (this._shadow) {
            remove(this._shadow);
          }
          this._shadow = null;
        },
        _setPos: function(pos) {
          if (this._icon) {
            setPosition(this._icon, pos);
          }
          if (this._shadow) {
            setPosition(this._shadow, pos);
          }
          this._zIndex = pos.y + this.options.zIndexOffset;
          this._resetZIndex();
        },
        _updateZIndex: function(offset) {
          if (this._icon) {
            this._icon.style.zIndex = this._zIndex + offset;
          }
        },
        _animateZoom: function(opt) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
          this._setPos(pos);
        },
        _initInteraction: function() {
          if (!this.options.interactive) {
            return;
          }
          addClass(this._icon, "leaflet-interactive");
          this.addInteractiveTarget(this._icon);
          if (MarkerDrag) {
            var draggable = this.options.draggable;
            if (this.dragging) {
              draggable = this.dragging.enabled();
              this.dragging.disable();
            }
            this.dragging = new MarkerDrag(this);
            if (draggable) {
              this.dragging.enable();
            }
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._map) {
            this._updateOpacity();
          }
          return this;
        },
        _updateOpacity: function() {
          var opacity = this.options.opacity;
          if (this._icon) {
            setOpacity(this._icon, opacity);
          }
          if (this._shadow) {
            setOpacity(this._shadow, opacity);
          }
        },
        _bringToFront: function() {
          this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function() {
          this._updateZIndex(0);
        },
        _panOnFocus: function() {
          var map3 = this._map;
          if (!map3) {
            return;
          }
          var iconOpts = this.options.icon.options;
          var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
          var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
          map3.panInside(this._latlng, {
            paddingTopLeft: anchor,
            paddingBottomRight: size.subtract(anchor)
          });
        },
        _getPopupAnchor: function() {
          return this.options.icon.options.popupAnchor;
        },
        _getTooltipAnchor: function() {
          return this.options.icon.options.tooltipAnchor;
        }
      });
      function marker2(latlng, options) {
        return new Marker(latlng, options);
      }
      var Path = Layer.extend({
        // @section
        // @aka Path options
        options: {
          // @option stroke: Boolean = true
          // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
          stroke: true,
          // @option color: String = '#3388ff'
          // Stroke color
          color: "#3388ff",
          // @option weight: Number = 3
          // Stroke width in pixels
          weight: 3,
          // @option opacity: Number = 1.0
          // Stroke opacity
          opacity: 1,
          // @option lineCap: String= 'round'
          // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
          lineCap: "round",
          // @option lineJoin: String = 'round'
          // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
          lineJoin: "round",
          // @option dashArray: String = null
          // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashArray: null,
          // @option dashOffset: String = null
          // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashOffset: null,
          // @option fill: Boolean = depends
          // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
          fill: false,
          // @option fillColor: String = *
          // Fill color. Defaults to the value of the [`color`](#path-color) option
          fillColor: null,
          // @option fillOpacity: Number = 0.2
          // Fill opacity.
          fillOpacity: 0.2,
          // @option fillRule: String = 'evenodd'
          // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
          fillRule: "evenodd",
          // className: '',
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option bubblingMouseEvents: Boolean = true
          // When `true`, a mouse event on this path will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: true
        },
        beforeAdd: function(map3) {
          this._renderer = map3.getRenderer(this);
        },
        onAdd: function() {
          this._renderer._initPath(this);
          this._reset();
          this._renderer._addPath(this);
        },
        onRemove: function() {
          this._renderer._removePath(this);
        },
        // @method redraw(): this
        // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
        redraw: function() {
          if (this._map) {
            this._renderer._updatePath(this);
          }
          return this;
        },
        // @method setStyle(style: Path options): this
        // Changes the appearance of a Path based on the options in the `Path options` object.
        setStyle: function(style2) {
          setOptions(this, style2);
          if (this._renderer) {
            this._renderer._updateStyle(this);
            if (this.options.stroke && style2 && Object.prototype.hasOwnProperty.call(style2, "weight")) {
              this._updateBounds();
            }
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all path layers.
        bringToFront: function() {
          if (this._renderer) {
            this._renderer._bringToFront(this);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all path layers.
        bringToBack: function() {
          if (this._renderer) {
            this._renderer._bringToBack(this);
          }
          return this;
        },
        getElement: function() {
          return this._path;
        },
        _reset: function() {
          this._project();
          this._update();
        },
        _clickTolerance: function() {
          return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
        }
      });
      var CircleMarker = Path.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: true,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.redraw();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method getLatLng(): LatLng
        // Returns the current geographical position of the circle marker
        getLatLng: function() {
          return this._latlng;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle marker. Units are in pixels.
        setRadius: function(radius) {
          this.options.radius = this._radius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of the circle
        getRadius: function() {
          return this._radius;
        },
        setStyle: function(options) {
          var radius = options && options.radius || this._radius;
          Path.prototype.setStyle.call(this, options);
          this.setRadius(radius);
          return this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng);
          this._updateBounds();
        },
        _updateBounds: function() {
          var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
          this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
        },
        _update: function() {
          if (this._map) {
            this._updatePath();
          }
        },
        _updatePath: function() {
          this._renderer._updateCircle(this);
        },
        _empty: function() {
          return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p) {
          return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
        }
      });
      function circleMarker2(latlng, options) {
        return new CircleMarker(latlng, options);
      }
      var Circle = CircleMarker.extend({
        initialize: function(latlng, options, legacyOptions) {
          if (typeof options === "number") {
            options = extend({}, legacyOptions, { radius: options });
          }
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          if (isNaN(this.options.radius)) {
            throw new Error("Circle radius cannot be NaN");
          }
          this._mRadius = this.options.radius;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle. Units are in meters.
        setRadius: function(radius) {
          this._mRadius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of a circle. Units are in meters.
        getRadius: function() {
          return this._mRadius;
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          var half = [this._radius, this._radiusY || this._radius];
          return new LatLngBounds(
            this._map.layerPointToLatLng(this._point.subtract(half)),
            this._map.layerPointToLatLng(this._point.add(half))
          );
        },
        setStyle: Path.prototype.setStyle,
        _project: function() {
          var lng = this._latlng.lng, lat = this._latlng.lat, map3 = this._map, crs = map3.options.crs;
          if (crs.distance === Earth.distance) {
            var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map3.project([lat + latR, lng]), bottom = map3.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map3.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
            if (isNaN(lngR) || lngR === 0) {
              lngR = latR / Math.cos(Math.PI / 180 * lat);
            }
            this._point = p.subtract(map3.getPixelOrigin());
            this._radius = isNaN(lngR) ? 0 : p.x - map3.project([lat2, lng - lngR]).x;
            this._radiusY = p.y - top.y;
          } else {
            var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = map3.latLngToLayerPoint(this._latlng);
            this._radius = this._point.x - map3.latLngToLayerPoint(latlng2).x;
          }
          this._updateBounds();
        }
      });
      function circle2(latlng, options, legacyOptions) {
        return new Circle(latlng, options, legacyOptions);
      }
      var Polyline = Path.extend({
        // @section
        // @aka Polyline options
        options: {
          // @option smoothFactor: Number = 1.0
          // How much to simplify the polyline on each zoom level. More means
          // better performance and smoother look, and less means more accurate representation.
          smoothFactor: 1,
          // @option noClip: Boolean = false
          // Disable polyline clipping.
          noClip: false
        },
        initialize: function(latlngs, options) {
          setOptions(this, options);
          this._setLatLngs(latlngs);
        },
        // @method getLatLngs(): LatLng[]
        // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
        getLatLngs: function() {
          return this._latlngs;
        },
        // @method setLatLngs(latlngs: LatLng[]): this
        // Replaces all the points in the polyline with the given array of geographical points.
        setLatLngs: function(latlngs) {
          this._setLatLngs(latlngs);
          return this.redraw();
        },
        // @method isEmpty(): Boolean
        // Returns `true` if the Polyline has no LatLngs.
        isEmpty: function() {
          return !this._latlngs.length;
        },
        // @method closestLayerPoint(p: Point): Point
        // Returns the point closest to `p` on the Polyline.
        closestLayerPoint: function(p) {
          var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
          for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
            var points = this._parts[j];
            for (var i = 1, len = points.length; i < len; i++) {
              p1 = points[i - 1];
              p2 = points[i];
              var sqDist = closest(p, p1, p2, true);
              if (sqDist < minDistance) {
                minDistance = sqDist;
                minPoint = closest(p, p1, p2);
              }
            }
          }
          if (minPoint) {
            minPoint.distance = Math.sqrt(minDistance);
          }
          return minPoint;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polylineCenter(this._defaultShape(), this._map.options.crs);
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          return this._bounds;
        },
        // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
        // Adds a given point to the polyline. By default, adds to the first ring of
        // the polyline in case of a multi-polyline, but can be overridden by passing
        // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
        addLatLng: function(latlng, latlngs) {
          latlngs = latlngs || this._defaultShape();
          latlng = toLatLng(latlng);
          latlngs.push(latlng);
          this._bounds.extend(latlng);
          return this.redraw();
        },
        _setLatLngs: function(latlngs) {
          this._bounds = new LatLngBounds();
          this._latlngs = this._convertLatLngs(latlngs);
        },
        _defaultShape: function() {
          return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(latlngs) {
          var result = [], flat = isFlat(latlngs);
          for (var i = 0, len = latlngs.length; i < len; i++) {
            if (flat) {
              result[i] = toLatLng(latlngs[i]);
              this._bounds.extend(result[i]);
            } else {
              result[i] = this._convertLatLngs(latlngs[i]);
            }
          }
          return result;
        },
        _project: function() {
          var pxBounds = new Bounds();
          this._rings = [];
          this._projectLatlngs(this._latlngs, this._rings, pxBounds);
          if (this._bounds.isValid() && pxBounds.isValid()) {
            this._rawPxBounds = pxBounds;
            this._updateBounds();
          }
        },
        _updateBounds: function() {
          var w = this._clickTolerance(), p = new Point(w, w);
          if (!this._rawPxBounds) {
            return;
          }
          this._pxBounds = new Bounds([
            this._rawPxBounds.min.subtract(p),
            this._rawPxBounds.max.add(p)
          ]);
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(latlngs, result, projectedBounds) {
          var flat = latlngs[0] instanceof LatLng2, len = latlngs.length, i, ring;
          if (flat) {
            ring = [];
            for (i = 0; i < len; i++) {
              ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
              projectedBounds.extend(ring[i]);
            }
            result.push(ring);
          } else {
            for (i = 0; i < len; i++) {
              this._projectLatlngs(latlngs[i], result, projectedBounds);
            }
          }
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var bounds = this._renderer._bounds;
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var parts = this._parts, i, j, k, len, len2, segment, points;
          for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
            points = this._rings[i];
            for (j = 0, len2 = points.length; j < len2 - 1; j++) {
              segment = clipSegment(points[j], points[j + 1], bounds, j, true);
              if (!segment) {
                continue;
              }
              parts[k] = parts[k] || [];
              parts[k].push(segment[0]);
              if (segment[1] !== points[j + 1] || j === len2 - 2) {
                parts[k].push(segment[1]);
                k++;
              }
            }
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          var parts = this._parts, tolerance = this.options.smoothFactor;
          for (var i = 0, len = parts.length; i < len; i++) {
            parts[i] = simplify(parts[i], tolerance);
          }
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          this._clipPoints();
          this._simplifyPoints();
          this._updatePath();
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p, closed) {
          var i, j, k, len, len2, part, w = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(p)) {
            return false;
          }
          for (i = 0, len = this._parts.length; i < len; i++) {
            part = this._parts[i];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              if (!closed && j === 0) {
                continue;
              }
              if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
                return true;
              }
            }
          }
          return false;
        }
      });
      function polyline(latlngs, options) {
        return new Polyline(latlngs, options);
      }
      Polyline._flat = _flat;
      var Polygon = Polyline.extend({
        options: {
          fill: true
        },
        isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polygonCenter(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(latlngs) {
          var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
          if (len >= 2 && result[0] instanceof LatLng2 && result[0].equals(result[len - 1])) {
            result.pop();
          }
          return result;
        },
        _setLatLngs: function(latlngs) {
          Polyline.prototype._setLatLngs.call(this, latlngs);
          if (isFlat(this._latlngs)) {
            this._latlngs = [this._latlngs];
          }
        },
        _defaultShape: function() {
          return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
          bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
            clipped = clipPolygon(this._rings[i], bounds, true);
            if (clipped.length) {
              this._parts.push(clipped);
            }
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, true);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p) {
          var inside = false, part, p1, p2, i, j, k, len, len2;
          if (!this._pxBounds || !this._pxBounds.contains(p)) {
            return false;
          }
          for (i = 0, len = this._parts.length; i < len; i++) {
            part = this._parts[i];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              p1 = part[j];
              p2 = part[k];
              if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
                inside = !inside;
              }
            }
          }
          return inside || Polyline.prototype._containsPoint.call(this, p, true);
        }
      });
      function polygon(latlngs, options) {
        return new Polygon(latlngs, options);
      }
      var GeoJSON = FeatureGroup2.extend({
        /* @section
         * @aka GeoJSON options
         *
         * @option pointToLayer: Function = *
         * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
         * called when data is added, passing the GeoJSON point feature and its `LatLng`.
         * The default is to spawn a default `Marker`:
         * ```js
         * function(geoJsonPoint, latlng) {
         * 	return L.marker(latlng);
         * }
         * ```
         *
         * @option style: Function = *
         * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
         * called internally when data is added.
         * The default value is to not override any defaults:
         * ```js
         * function (geoJsonFeature) {
         * 	return {}
         * }
         * ```
         *
         * @option onEachFeature: Function = *
         * A `Function` that will be called once for each created `Feature`, after it has
         * been created and styled. Useful for attaching events and popups to features.
         * The default is to do nothing with the newly created layers:
         * ```js
         * function (feature, layer) {}
         * ```
         *
         * @option filter: Function = *
         * A `Function` that will be used to decide whether to include a feature or not.
         * The default is to include all features:
         * ```js
         * function (geoJsonFeature) {
         * 	return true;
         * }
         * ```
         * Note: dynamically changing the `filter` option will have effect only on newly
         * added data. It will _not_ re-evaluate already included features.
         *
         * @option coordsToLatLng: Function = *
         * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
         * The default is the `coordsToLatLng` static method.
         *
         * @option markersInheritOptions: Boolean = false
         * Whether default Markers for "Point" type Features inherit from group options.
         */
        initialize: function(geojson, options) {
          setOptions(this, options);
          this._layers = {};
          if (geojson) {
            this.addData(geojson);
          }
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(geojson) {
          var features = isArray(geojson) ? geojson : geojson.features, i, len, feature;
          if (features) {
            for (i = 0, len = features.length; i < len; i++) {
              feature = features[i];
              if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                this.addData(feature);
              }
            }
            return this;
          }
          var options = this.options;
          if (options.filter && !options.filter(geojson)) {
            return this;
          }
          var layer = geometryToLayer(geojson, options);
          if (!layer) {
            return this;
          }
          layer.feature = asFeature(geojson);
          layer.defaultOptions = layer.options;
          this.resetStyle(layer);
          if (options.onEachFeature) {
            options.onEachFeature(geojson, layer);
          }
          return this.addLayer(layer);
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(layer) {
          if (layer === void 0) {
            return this.eachLayer(this.resetStyle, this);
          }
          layer.options = extend({}, layer.defaultOptions);
          this._setLayerStyle(layer, this.options.style);
          return this;
        },
        // @method setStyle( <Function> style ): this
        // Changes styles of GeoJSON vector layers with the given style function.
        setStyle: function(style2) {
          return this.eachLayer(function(layer) {
            this._setLayerStyle(layer, style2);
          }, this);
        },
        _setLayerStyle: function(layer, style2) {
          if (layer.setStyle) {
            if (typeof style2 === "function") {
              style2 = style2(layer.feature);
            }
            layer.setStyle(style2);
          }
        }
      });
      function geometryToLayer(geojson, options) {
        var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
        if (!coords && !geometry) {
          return null;
        }
        switch (geometry.type) {
          case "Point":
            latlng = _coordsToLatLng(coords);
            return _pointToLayer(pointToLayer, geojson, latlng, options);
          case "MultiPoint":
            for (i = 0, len = coords.length; i < len; i++) {
              latlng = _coordsToLatLng(coords[i]);
              layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
            }
            return new FeatureGroup2(layers2);
          case "LineString":
          case "MultiLineString":
            latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
            return new Polyline(latlngs, options);
          case "Polygon":
          case "MultiPolygon":
            latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
            return new Polygon(latlngs, options);
          case "GeometryCollection":
            for (i = 0, len = geometry.geometries.length; i < len; i++) {
              var geoLayer = geometryToLayer({
                geometry: geometry.geometries[i],
                type: "Feature",
                properties: geojson.properties
              }, options);
              if (geoLayer) {
                layers2.push(geoLayer);
              }
            }
            return new FeatureGroup2(layers2);
          case "FeatureCollection":
            for (i = 0, len = geometry.features.length; i < len; i++) {
              var featureLayer = geometryToLayer(geometry.features[i], options);
              if (featureLayer) {
                layers2.push(featureLayer);
              }
            }
            return new FeatureGroup2(layers2);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
        return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
      }
      function coordsToLatLng(coords) {
        return new LatLng2(coords[1], coords[0], coords[2]);
      }
      function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
        var latlngs = [];
        for (var i = 0, len = coords.length, latlng; i < len; i++) {
          latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
          latlngs.push(latlng);
        }
        return latlngs;
      }
      function latLngToCoords(latlng, precision) {
        latlng = toLatLng(latlng);
        return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
      }
      function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
        var coords = [];
        for (var i = 0, len = latlngs.length; i < len; i++) {
          coords.push(levelsDeep ? latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
        }
        if (!levelsDeep && closed && coords.length > 0) {
          coords.push(coords[0].slice());
        }
        return coords;
      }
      function getFeature(layer, newGeometry) {
        return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
      }
      function asFeature(geojson) {
        if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
          return geojson;
        }
        return {
          type: "Feature",
          properties: {},
          geometry: geojson
        };
      }
      var PointToGeoJSON = {
        toGeoJSON: function(precision) {
          return getFeature(this, {
            type: "Point",
            coordinates: latLngToCoords(this.getLatLng(), precision)
          });
        }
      };
      Marker.include(PointToGeoJSON);
      Circle.include(PointToGeoJSON);
      CircleMarker.include(PointToGeoJSON);
      Polyline.include({
        toGeoJSON: function(precision) {
          var multi = !isFlat(this._latlngs);
          var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "LineString",
            coordinates: coords
          });
        }
      });
      Polygon.include({
        toGeoJSON: function(precision) {
          var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
          var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
          if (!holes) {
            coords = [coords];
          }
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "Polygon",
            coordinates: coords
          });
        }
      });
      LayerGroup.include({
        toMultiPoint: function(precision) {
          var coords = [];
          this.eachLayer(function(layer) {
            coords.push(layer.toGeoJSON(precision).geometry.coordinates);
          });
          return getFeature(this, {
            type: "MultiPoint",
            coordinates: coords
          });
        },
        // @method toGeoJSON(precision?: Number|false): Object
        // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
        // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
        toGeoJSON: function(precision) {
          var type = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (type === "MultiPoint") {
            return this.toMultiPoint(precision);
          }
          var isGeometryCollection = type === "GeometryCollection", jsons = [];
          this.eachLayer(function(layer) {
            if (layer.toGeoJSON) {
              var json = layer.toGeoJSON(precision);
              if (isGeometryCollection) {
                jsons.push(json.geometry);
              } else {
                var feature = asFeature(json);
                if (feature.type === "FeatureCollection") {
                  jsons.push.apply(jsons, feature.features);
                } else {
                  jsons.push(feature);
                }
              }
            }
          });
          if (isGeometryCollection) {
            return getFeature(this, {
              geometries: jsons,
              type: "GeometryCollection"
            });
          }
          return {
            type: "FeatureCollection",
            features: jsons
          };
        }
      });
      function geoJSON2(geojson, options) {
        return new GeoJSON(geojson, options);
      }
      var geoJson = geoJSON2;
      var ImageOverlay = Layer.extend({
        // @section
        // @aka ImageOverlay options
        options: {
          // @option opacity: Number = 1.0
          // The opacity of the image overlay.
          opacity: 1,
          // @option alt: String = ''
          // Text for the `alt` attribute of the image (useful for accessibility).
          alt: "",
          // @option interactive: Boolean = false
          // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
          interactive: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the image.
          // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option errorOverlayUrl: String = ''
          // URL to the overlay image to show in place of the overlay that failed to load.
          errorOverlayUrl: "",
          // @option zIndex: Number = 1
          // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
          zIndex: 1,
          // @option className: String = ''
          // A custom class name to assign to the image. Empty by default.
          className: ""
        },
        initialize: function(url, bounds, options) {
          this._url = url;
          this._bounds = toLatLngBounds(bounds);
          setOptions(this, options);
        },
        onAdd: function() {
          if (!this._image) {
            this._initImage();
            if (this.options.opacity < 1) {
              this._updateOpacity();
            }
          }
          if (this.options.interactive) {
            addClass(this._image, "leaflet-interactive");
            this.addInteractiveTarget(this._image);
          }
          this.getPane().appendChild(this._image);
          this._reset();
        },
        onRemove: function() {
          remove(this._image);
          if (this.options.interactive) {
            this.removeInteractiveTarget(this._image);
          }
        },
        // @method setOpacity(opacity: Number): this
        // Sets the opacity of the overlay.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._image) {
            this._updateOpacity();
          }
          return this;
        },
        setStyle: function(styleOpts) {
          if (styleOpts.opacity) {
            this.setOpacity(styleOpts.opacity);
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all overlays.
        bringToFront: function() {
          if (this._map) {
            toFront(this._image);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          if (this._map) {
            toBack(this._image);
          }
          return this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(url) {
          this._url = url;
          if (this._image) {
            this._image.src = url;
          }
          return this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(bounds) {
          this._bounds = toLatLngBounds(bounds);
          if (this._map) {
            this._reset();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            zoom: this._reset,
            viewreset: this._reset
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method setZIndex(value: Number): this
        // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
        setZIndex: function(value) {
          this.options.zIndex = value;
          this._updateZIndex();
          return this;
        },
        // @method getBounds(): LatLngBounds
        // Get the bounds that this ImageOverlay covers
        getBounds: function() {
          return this._bounds;
        },
        // @method getElement(): HTMLElement
        // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
        // used by this overlay.
        getElement: function() {
          return this._image;
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "IMG";
          var img = this._image = wasElementSupplied ? this._url : create$1("img");
          addClass(img, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(img, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(img, this.options.className);
          }
          img.onselectstart = falseFn;
          img.onmousemove = falseFn;
          img.onload = bind(this.fire, this, "load");
          img.onerror = bind(this._overlayOnError, this, "error");
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (this.options.zIndex) {
            this._updateZIndex();
          }
          if (wasElementSupplied) {
            this._url = img.src;
            return;
          }
          img.src = this._url;
          img.alt = this.options.alt;
        },
        _animateZoom: function(e) {
          var scale2 = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
          setTransform(this._image, offset, scale2);
        },
        _reset: function() {
          var image = this._image, bounds = new Bounds(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), size = bounds.getSize();
          setPosition(image, bounds.min);
          image.style.width = size.x + "px";
          image.style.height = size.y + "px";
        },
        _updateOpacity: function() {
          setOpacity(this._image, this.options.opacity);
        },
        _updateZIndex: function() {
          if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._image.style.zIndex = this.options.zIndex;
          }
        },
        _overlayOnError: function() {
          this.fire("error");
          var errorUrl = this.options.errorOverlayUrl;
          if (errorUrl && this._url !== errorUrl) {
            this._url = errorUrl;
            this._image.src = errorUrl;
          }
        },
        // @method getCenter(): LatLng
        // Returns the center of the ImageOverlay.
        getCenter: function() {
          return this._bounds.getCenter();
        }
      });
      var imageOverlay = function(url, bounds, options) {
        return new ImageOverlay(url, bounds, options);
      };
      var VideoOverlay = ImageOverlay.extend({
        // @section
        // @aka VideoOverlay options
        options: {
          // @option autoplay: Boolean = true
          // Whether the video starts playing automatically when loaded.
          // On some browsers autoplay will only work with `muted: true`
          autoplay: true,
          // @option loop: Boolean = true
          // Whether the video will loop back to the beginning when played.
          loop: true,
          // @option keepAspectRatio: Boolean = true
          // Whether the video will save aspect ratio after the projection.
          // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
          keepAspectRatio: true,
          // @option muted: Boolean = false
          // Whether the video starts on mute when loaded.
          muted: false,
          // @option playsInline: Boolean = true
          // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
          playsInline: true
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "VIDEO";
          var vid = this._image = wasElementSupplied ? this._url : create$1("video");
          addClass(vid, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(vid, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(vid, this.options.className);
          }
          vid.onselectstart = falseFn;
          vid.onmousemove = falseFn;
          vid.onloadeddata = bind(this.fire, this, "load");
          if (wasElementSupplied) {
            var sourceElements = vid.getElementsByTagName("source");
            var sources = [];
            for (var j = 0; j < sourceElements.length; j++) {
              sources.push(sourceElements[j].src);
            }
            this._url = sourceElements.length > 0 ? sources : [vid.src];
            return;
          }
          if (!isArray(this._url)) {
            this._url = [this._url];
          }
          if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
            vid.style["objectFit"] = "fill";
          }
          vid.autoplay = !!this.options.autoplay;
          vid.loop = !!this.options.loop;
          vid.muted = !!this.options.muted;
          vid.playsInline = !!this.options.playsInline;
          for (var i = 0; i < this._url.length; i++) {
            var source = create$1("source");
            source.src = this._url[i];
            vid.appendChild(source);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function videoOverlay(video, bounds, options) {
        return new VideoOverlay(video, bounds, options);
      }
      var SVGOverlay = ImageOverlay.extend({
        _initImage: function() {
          var el = this._image = this._url;
          addClass(el, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(el, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(el, this.options.className);
          }
          el.onselectstart = falseFn;
          el.onmousemove = falseFn;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function svgOverlay(el, bounds, options) {
        return new SVGOverlay(el, bounds, options);
      }
      var DivOverlay = Layer.extend({
        // @section
        // @aka DivOverlay options
        options: {
          // @option interactive: Boolean = false
          // If true, the popup/tooltip will listen to the mouse events.
          interactive: false,
          // @option offset: Point = Point(0, 0)
          // The offset of the overlay position.
          offset: [0, 0],
          // @option className: String = ''
          // A custom CSS class name to assign to the overlay.
          className: "",
          // @option pane: String = undefined
          // `Map pane` where the overlay will be added.
          pane: void 0,
          // @option content: String|HTMLElement|Function = ''
          // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
          // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
          content: ""
        },
        initialize: function(options, source) {
          if (options && (options instanceof LatLng2 || isArray(options))) {
            this._latlng = toLatLng(options);
            setOptions(this, source);
          } else {
            setOptions(this, options);
            this._source = source;
          }
          if (this.options.content) {
            this._content = this.options.content;
          }
        },
        // @method openOn(map: Map): this
        // Adds the overlay to the map.
        // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
        openOn: function(map3) {
          map3 = arguments.length ? map3 : this._source._map;
          if (!map3.hasLayer(this)) {
            map3.addLayer(this);
          }
          return this;
        },
        // @method close(): this
        // Closes the overlay.
        // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
        // and `layer.closePopup()`/`.closeTooltip()`.
        close: function() {
          if (this._map) {
            this._map.removeLayer(this);
          }
          return this;
        },
        // @method toggle(layer?: Layer): this
        // Opens or closes the overlay bound to layer depending on its current state.
        // Argument may be omitted only for overlay bound to layer.
        // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
        toggle: function(layer) {
          if (this._map) {
            this.close();
          } else {
            if (arguments.length) {
              this._source = layer;
            } else {
              layer = this._source;
            }
            this._prepareOpen();
            this.openOn(layer._map);
          }
          return this;
        },
        onAdd: function(map3) {
          this._zoomAnimated = map3._zoomAnimated;
          if (!this._container) {
            this._initLayout();
          }
          if (map3._fadeAnimated) {
            setOpacity(this._container, 0);
          }
          clearTimeout(this._removeTimeout);
          this.getPane().appendChild(this._container);
          this.update();
          if (map3._fadeAnimated) {
            setOpacity(this._container, 1);
          }
          this.bringToFront();
          if (this.options.interactive) {
            addClass(this._container, "leaflet-interactive");
            this.addInteractiveTarget(this._container);
          }
        },
        onRemove: function(map3) {
          if (map3._fadeAnimated) {
            setOpacity(this._container, 0);
            this._removeTimeout = setTimeout(bind(remove, void 0, this._container), 200);
          } else {
            remove(this._container);
          }
          if (this.options.interactive) {
            removeClass(this._container, "leaflet-interactive");
            this.removeInteractiveTarget(this._container);
          }
        },
        // @namespace DivOverlay
        // @method getLatLng: LatLng
        // Returns the geographical point of the overlay.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Sets the geographical point where the overlay will open.
        setLatLng: function(latlng) {
          this._latlng = toLatLng(latlng);
          if (this._map) {
            this._updatePosition();
            this._adjustPan();
          }
          return this;
        },
        // @method getContent: String|HTMLElement
        // Returns the content of the overlay.
        getContent: function() {
          return this._content;
        },
        // @method setContent(htmlContent: String|HTMLElement|Function): this
        // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
        // The function should return a `String` or `HTMLElement` to be used in the overlay.
        setContent: function(content) {
          this._content = content;
          this.update();
          return this;
        },
        // @method getElement: String|HTMLElement
        // Returns the HTML container of the overlay.
        getElement: function() {
          return this._container;
        },
        // @method update: null
        // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
        update: function() {
          if (!this._map) {
            return;
          }
          this._container.style.visibility = "hidden";
          this._updateContent();
          this._updateLayout();
          this._updatePosition();
          this._container.style.visibility = "";
          this._adjustPan();
        },
        getEvents: function() {
          var events = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method isOpen: Boolean
        // Returns `true` when the overlay is visible on the map.
        isOpen: function() {
          return !!this._map && this._map.hasLayer(this);
        },
        // @method bringToFront: this
        // Brings this overlay in front of other overlays (in the same map pane).
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
          }
          return this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(latlng) {
          var source = this._source;
          if (!source._map) {
            return false;
          }
          if (source instanceof FeatureGroup2) {
            source = null;
            var layers2 = this._source._layers;
            for (var id in layers2) {
              if (layers2[id]._map) {
                source = layers2[id];
                break;
              }
            }
            if (!source) {
              return false;
            }
            this._source = source;
          }
          if (!latlng) {
            if (source.getCenter) {
              latlng = source.getCenter();
            } else if (source.getLatLng) {
              latlng = source.getLatLng();
            } else if (source.getBounds) {
              latlng = source.getBounds().getCenter();
            } else {
              throw new Error("Unable to get source layer LatLng.");
            }
          }
          this.setLatLng(latlng);
          if (this._map) {
            this.update();
          }
          return true;
        },
        _updateContent: function() {
          if (!this._content) {
            return;
          }
          var node = this._contentNode;
          var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
          if (typeof content === "string") {
            node.innerHTML = content;
          } else {
            while (node.hasChildNodes()) {
              node.removeChild(node.firstChild);
            }
            node.appendChild(content);
          }
          this.fire("contentupdate");
        },
        _updatePosition: function() {
          if (!this._map) {
            return;
          }
          var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (this._zoomAnimated) {
            setPosition(this._container, pos.add(anchor));
          } else {
            offset = offset.add(pos).add(anchor);
          }
          var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
          this._container.style.bottom = bottom + "px";
          this._container.style.left = left + "px";
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      Map2.include({
        _initOverlay: function(OverlayClass, content, latlng, options) {
          var overlay = content;
          if (!(overlay instanceof OverlayClass)) {
            overlay = new OverlayClass(options).setContent(content);
          }
          if (latlng) {
            overlay.setLatLng(latlng);
          }
          return overlay;
        }
      });
      Layer.include({
        _initOverlay: function(OverlayClass, old, content, options) {
          var overlay = content;
          if (overlay instanceof OverlayClass) {
            setOptions(overlay, options);
            overlay._source = this;
          } else {
            overlay = old && !options ? old : new OverlayClass(options, this);
            overlay.setContent(content);
          }
          return overlay;
        }
      });
      var Popup = DivOverlay.extend({
        // @section
        // @aka Popup options
        options: {
          // @option pane: String = 'popupPane'
          // `Map pane` where the popup will be added.
          pane: "popupPane",
          // @option offset: Point = Point(0, 7)
          // The offset of the popup position.
          offset: [0, 7],
          // @option maxWidth: Number = 300
          // Max width of the popup, in pixels.
          maxWidth: 300,
          // @option minWidth: Number = 50
          // Min width of the popup, in pixels.
          minWidth: 50,
          // @option maxHeight: Number = null
          // If set, creates a scrollable container of the given height
          // inside a popup if its content exceeds it.
          // The scrollable container can be styled using the
          // `leaflet-popup-scrolled` CSS class selector.
          maxHeight: null,
          // @option autoPan: Boolean = true
          // Set it to `false` if you don't want the map to do panning animation
          // to fit the opened popup.
          autoPan: true,
          // @option autoPanPaddingTopLeft: Point = null
          // The margin between the popup and the top left corner of the map
          // view after autopanning was performed.
          autoPanPaddingTopLeft: null,
          // @option autoPanPaddingBottomRight: Point = null
          // The margin between the popup and the bottom right corner of the map
          // view after autopanning was performed.
          autoPanPaddingBottomRight: null,
          // @option autoPanPadding: Point = Point(5, 5)
          // Equivalent of setting both top left and bottom right autopan padding to the same value.
          autoPanPadding: [5, 5],
          // @option keepInView: Boolean = false
          // Set it to `true` if you want to prevent users from panning the popup
          // off of the screen while it is open.
          keepInView: false,
          // @option closeButton: Boolean = true
          // Controls the presence of a close button in the popup.
          closeButton: true,
          // @option autoClose: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the popup closing when another popup is opened.
          autoClose: true,
          // @option closeOnEscapeKey: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the ESC key for closing of the popup.
          closeOnEscapeKey: true,
          // @option closeOnClick: Boolean = *
          // Set it if you want to override the default behavior of the popup closing when user clicks
          // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
          // @option className: String = ''
          // A custom CSS class name to assign to the popup.
          className: ""
        },
        // @namespace Popup
        // @method openOn(map: Map): this
        // Alternative to `map.openPopup(popup)`.
        // Adds the popup to the map and closes the previous one.
        openOn: function(map3) {
          map3 = arguments.length ? map3 : this._source._map;
          if (!map3.hasLayer(this) && map3._popup && map3._popup.options.autoClose) {
            map3.removeLayer(map3._popup);
          }
          map3._popup = this;
          return DivOverlay.prototype.openOn.call(this, map3);
        },
        onAdd: function(map3) {
          DivOverlay.prototype.onAdd.call(this, map3);
          map3.fire("popupopen", { popup: this });
          if (this._source) {
            this._source.fire("popupopen", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.on("preclick", stopPropagation);
            }
          }
        },
        onRemove: function(map3) {
          DivOverlay.prototype.onRemove.call(this, map3);
          map3.fire("popupclose", { popup: this });
          if (this._source) {
            this._source.fire("popupclose", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.off("preclick", stopPropagation);
            }
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
            events.preclick = this.close;
          }
          if (this.options.keepInView) {
            events.moveend = this._adjustPan;
          }
          return events;
        },
        _initLayout: function() {
          var prefix = "leaflet-popup", container = this._container = create$1(
            "div",
            prefix + " " + (this.options.className || "") + " leaflet-zoom-animated"
          );
          var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
          this._contentNode = create$1("div", prefix + "-content", wrapper);
          disableClickPropagation(container);
          disableScrollPropagation(this._contentNode);
          on(container, "contextmenu", stopPropagation);
          this._tipContainer = create$1("div", prefix + "-tip-container", container);
          this._tip = create$1("div", prefix + "-tip", this._tipContainer);
          if (this.options.closeButton) {
            var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
            closeButton.setAttribute("role", "button");
            closeButton.setAttribute("aria-label", "Close popup");
            closeButton.href = "#close";
            closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
            on(closeButton, "click", function(ev) {
              preventDefault(ev);
              this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var container = this._contentNode, style2 = container.style;
          style2.width = "";
          style2.whiteSpace = "nowrap";
          var width = container.offsetWidth;
          width = Math.min(width, this.options.maxWidth);
          width = Math.max(width, this.options.minWidth);
          style2.width = width + 1 + "px";
          style2.whiteSpace = "";
          style2.height = "";
          var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
          if (maxHeight && height > maxHeight) {
            style2.height = maxHeight + "px";
            addClass(container, scrolledClass);
          } else {
            removeClass(container, scrolledClass);
          }
          this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(e) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
          setPosition(this._container, pos.add(anchor));
        },
        _adjustPan: function() {
          if (!this.options.autoPan) {
            return;
          }
          if (this._map._panAnim) {
            this._map._panAnim.stop();
          }
          if (this._autopanning) {
            this._autopanning = false;
            return;
          }
          var map3 = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
          layerPos._add(getPosition(this._container));
          var containerPos = map3.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map3.getSize(), dx = 0, dy = 0;
          if (containerPos.x + containerWidth + paddingBR.x > size.x) {
            dx = containerPos.x + containerWidth - size.x + paddingBR.x;
          }
          if (containerPos.x - dx - paddingTL.x < 0) {
            dx = containerPos.x - paddingTL.x;
          }
          if (containerPos.y + containerHeight + paddingBR.y > size.y) {
            dy = containerPos.y + containerHeight - size.y + paddingBR.y;
          }
          if (containerPos.y - dy - paddingTL.y < 0) {
            dy = containerPos.y - paddingTL.y;
          }
          if (dx || dy) {
            if (this.options.keepInView) {
              this._autopanning = true;
            }
            map3.fire("autopanstart").panBy([dx, dy]);
          }
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      });
      var popup = function(options, source) {
        return new Popup(options, source);
      };
      Map2.mergeOptions({
        closePopupOnClick: true
      });
      Map2.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(popup2, latlng, options) {
          this._initOverlay(Popup, popup2, latlng, options).openOn(this);
          return this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(popup2) {
          popup2 = arguments.length ? popup2 : this._popup;
          if (popup2) {
            popup2.close();
          }
          return this;
        }
      });
      Layer.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(content, options) {
          this._popup = this._initOverlay(Popup, this._popup, content, options);
          if (!this._popupHandlersAdded) {
            this.on({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = true;
          }
          return this;
        },
        // @method unbindPopup(): this
        // Removes the popup previously bound with `bindPopup`.
        unbindPopup: function() {
          if (this._popup) {
            this.off({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = false;
            this._popup = null;
          }
          return this;
        },
        // @method openPopup(latlng?: LatLng): this
        // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
        openPopup: function(latlng) {
          if (this._popup) {
            if (!(this instanceof FeatureGroup2)) {
              this._popup._source = this;
            }
            if (this._popup._prepareOpen(latlng || this._latlng)) {
              this._popup.openOn(this._map);
            }
          }
          return this;
        },
        // @method closePopup(): this
        // Closes the popup bound to this layer if it is open.
        closePopup: function() {
          if (this._popup) {
            this._popup.close();
          }
          return this;
        },
        // @method togglePopup(): this
        // Opens or closes the popup bound to this layer depending on its current state.
        togglePopup: function() {
          if (this._popup) {
            this._popup.toggle(this);
          }
          return this;
        },
        // @method isPopupOpen(): boolean
        // Returns `true` if the popup bound to this layer is currently open.
        isPopupOpen: function() {
          return this._popup ? this._popup.isOpen() : false;
        },
        // @method setPopupContent(content: String|HTMLElement|Popup): this
        // Sets the content of the popup bound to this layer.
        setPopupContent: function(content) {
          if (this._popup) {
            this._popup.setContent(content);
          }
          return this;
        },
        // @method getPopup(): Popup
        // Returns the popup bound to this layer.
        getPopup: function() {
          return this._popup;
        },
        _openPopup: function(e) {
          if (!this._popup || !this._map) {
            return;
          }
          stop(e);
          var target = e.layer || e.target;
          if (this._popup._source === target && !(target instanceof Path)) {
            if (this._map.hasLayer(this._popup)) {
              this.closePopup();
            } else {
              this.openPopup(e.latlng);
            }
            return;
          }
          this._popup._source = target;
          this.openPopup(e.latlng);
        },
        _movePopup: function(e) {
          this._popup.setLatLng(e.latlng);
        },
        _onKeyPress: function(e) {
          if (e.originalEvent.keyCode === 13) {
            this._openPopup(e);
          }
        }
      });
      var Tooltip = DivOverlay.extend({
        // @section
        // @aka Tooltip options
        options: {
          // @option pane: String = 'tooltipPane'
          // `Map pane` where the tooltip will be added.
          pane: "tooltipPane",
          // @option offset: Point = Point(0, 0)
          // Optional offset of the tooltip position.
          offset: [0, 0],
          // @option direction: String = 'auto'
          // Direction where to open the tooltip. Possible values are: `right`, `left`,
          // `top`, `bottom`, `center`, `auto`.
          // `auto` will dynamically switch between `right` and `left` according to the tooltip
          // position on the map.
          direction: "auto",
          // @option permanent: Boolean = false
          // Whether to open the tooltip permanently or only on mouseover.
          permanent: false,
          // @option sticky: Boolean = false
          // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
          sticky: false,
          // @option opacity: Number = 0.9
          // Tooltip container opacity.
          opacity: 0.9
        },
        onAdd: function(map3) {
          DivOverlay.prototype.onAdd.call(this, map3);
          this.setOpacity(this.options.opacity);
          map3.fire("tooltipopen", { tooltip: this });
          if (this._source) {
            this.addEventParent(this._source);
            this._source.fire("tooltipopen", { tooltip: this }, true);
          }
        },
        onRemove: function(map3) {
          DivOverlay.prototype.onRemove.call(this, map3);
          map3.fire("tooltipclose", { tooltip: this });
          if (this._source) {
            this.removeEventParent(this._source);
            this._source.fire("tooltipclose", { tooltip: this }, true);
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (!this.options.permanent) {
            events.preclick = this.close;
          }
          return events;
        },
        _initLayout: function() {
          var prefix = "leaflet-tooltip", className = prefix + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = create$1("div", className);
          this._container.setAttribute("role", "tooltip");
          this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(pos) {
          var subX, subY, map3 = this._map, container = this._container, centerPoint = map3.latLngToContainerPoint(map3.getCenter()), tooltipPoint = map3.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (direction === "top") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight;
          } else if (direction === "bottom") {
            subX = tooltipWidth / 2;
            subY = 0;
          } else if (direction === "center") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight / 2;
          } else if (direction === "right") {
            subX = 0;
            subY = tooltipHeight / 2;
          } else if (direction === "left") {
            subX = tooltipWidth;
            subY = tooltipHeight / 2;
          } else if (tooltipPoint.x < centerPoint.x) {
            direction = "right";
            subX = 0;
            subY = tooltipHeight / 2;
          } else {
            direction = "left";
            subX = tooltipWidth + (offset.x + anchor.x) * 2;
            subY = tooltipHeight / 2;
          }
          pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
          removeClass(container, "leaflet-tooltip-right");
          removeClass(container, "leaflet-tooltip-left");
          removeClass(container, "leaflet-tooltip-top");
          removeClass(container, "leaflet-tooltip-bottom");
          addClass(container, "leaflet-tooltip-" + direction);
          setPosition(container, pos);
        },
        _updatePosition: function() {
          var pos = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(pos);
        },
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._container) {
            setOpacity(this._container, opacity);
          }
        },
        _animateZoom: function(e) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
          this._setPosition(pos);
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      });
      var tooltip = function(options, source) {
        return new Tooltip(options, source);
      };
      Map2.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(tooltip2, latlng, options) {
          this._initOverlay(Tooltip, tooltip2, latlng, options).openOn(this);
          return this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(tooltip2) {
          tooltip2.close();
          return this;
        }
      });
      Layer.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(content, options) {
          if (this._tooltip && this.isTooltipOpen()) {
            this.unbindTooltip();
          }
          this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
          this._initTooltipInteractions();
          if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
            this.openTooltip();
          }
          return this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          if (this._tooltip) {
            this._initTooltipInteractions(true);
            this.closeTooltip();
            this._tooltip = null;
          }
          return this;
        },
        _initTooltipInteractions: function(remove2) {
          if (!remove2 && this._tooltipHandlersAdded) {
            return;
          }
          var onOff = remove2 ? "off" : "on", events = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          if (!this._tooltip.options.permanent) {
            events.mouseover = this._openTooltip;
            events.mouseout = this.closeTooltip;
            events.click = this._openTooltip;
            if (this._map) {
              this._addFocusListeners();
            } else {
              events.add = this._addFocusListeners;
            }
          } else {
            events.add = this._openTooltip;
          }
          if (this._tooltip.options.sticky) {
            events.mousemove = this._moveTooltip;
          }
          this[onOff](events);
          this._tooltipHandlersAdded = !remove2;
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(latlng) {
          if (this._tooltip) {
            if (!(this instanceof FeatureGroup2)) {
              this._tooltip._source = this;
            }
            if (this._tooltip._prepareOpen(latlng)) {
              this._tooltip.openOn(this._map);
              if (this.getElement) {
                this._setAriaDescribedByOnLayer(this);
              } else if (this.eachLayer) {
                this.eachLayer(this._setAriaDescribedByOnLayer, this);
              }
            }
          }
          return this;
        },
        // @method closeTooltip(): this
        // Closes the tooltip bound to this layer if it is open.
        closeTooltip: function() {
          if (this._tooltip) {
            return this._tooltip.close();
          }
        },
        // @method toggleTooltip(): this
        // Opens or closes the tooltip bound to this layer depending on its current state.
        toggleTooltip: function() {
          if (this._tooltip) {
            this._tooltip.toggle(this);
          }
          return this;
        },
        // @method isTooltipOpen(): boolean
        // Returns `true` if the tooltip bound to this layer is currently open.
        isTooltipOpen: function() {
          return this._tooltip.isOpen();
        },
        // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
        // Sets the content of the tooltip bound to this layer.
        setTooltipContent: function(content) {
          if (this._tooltip) {
            this._tooltip.setContent(content);
          }
          return this;
        },
        // @method getTooltip(): Tooltip
        // Returns the tooltip bound to this layer.
        getTooltip: function() {
          return this._tooltip;
        },
        _addFocusListeners: function() {
          if (this.getElement) {
            this._addFocusListenersOnLayer(this);
          } else if (this.eachLayer) {
            this.eachLayer(this._addFocusListenersOnLayer, this);
          }
        },
        _addFocusListenersOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            on(el, "focus", function() {
              this._tooltip._source = layer;
              this.openTooltip();
            }, this);
            on(el, "blur", this.closeTooltip, this);
          }
        },
        _setAriaDescribedByOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            el.setAttribute("aria-describedby", this._tooltip._container.id);
          }
        },
        _openTooltip: function(e) {
          if (!this._tooltip || !this._map) {
            return;
          }
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = true;
            var that = this;
            this._map.once("moveend", function() {
              that._openOnceFlag = false;
              that._openTooltip(e);
            });
            return;
          }
          this._tooltip._source = e.layer || e.target;
          this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
        },
        _moveTooltip: function(e) {
          var latlng = e.latlng, containerPoint, layerPoint;
          if (this._tooltip.options.sticky && e.originalEvent) {
            containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
            layerPoint = this._map.containerPointToLayerPoint(containerPoint);
            latlng = this._map.layerPointToLatLng(layerPoint);
          }
          this._tooltip.setLatLng(latlng);
        }
      });
      var DivIcon = Icon.extend({
        options: {
          // @section
          // @aka DivIcon options
          iconSize: [12, 12],
          // also can be set through CSS
          // iconAnchor: (Point),
          // popupAnchor: (Point),
          // @option html: String|HTMLElement = ''
          // Custom HTML code to put inside the div element, empty by default. Alternatively,
          // an instance of `HTMLElement`.
          html: false,
          // @option bgPos: Point = [0, 0]
          // Optional relative position of the background, in pixels
          bgPos: null,
          className: "leaflet-div-icon"
        },
        createIcon: function(oldIcon) {
          var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
          if (options.html instanceof Element) {
            empty(div);
            div.appendChild(options.html);
          } else {
            div.innerHTML = options.html !== false ? options.html : "";
          }
          if (options.bgPos) {
            var bgPos = toPoint(options.bgPos);
            div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
          }
          this._setIconStyles(div, "icon");
          return div;
        },
        createShadow: function() {
          return null;
        }
      });
      function divIcon2(options) {
        return new DivIcon(options);
      }
      Icon.Default = IconDefault;
      var GridLayer = Layer.extend({
        // @section
        // @aka GridLayer options
        options: {
          // @option tileSize: Number|Point = 256
          // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
          tileSize: 256,
          // @option opacity: Number = 1.0
          // Opacity of the tiles. Can be used in the `createTile()` function.
          opacity: 1,
          // @option updateWhenIdle: Boolean = (depends)
          // Load new tiles only when panning ends.
          // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
          // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
          // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
          updateWhenIdle: Browser.mobile,
          // @option updateWhenZooming: Boolean = true
          // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
          updateWhenZooming: true,
          // @option updateInterval: Number = 200
          // Tiles will not update more than once every `updateInterval` milliseconds when panning.
          updateInterval: 200,
          // @option zIndex: Number = 1
          // The explicit zIndex of the tile layer.
          zIndex: 1,
          // @option bounds: LatLngBounds = undefined
          // If set, tiles will only be loaded inside the set `LatLngBounds`.
          bounds: null,
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = undefined
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: void 0,
          // @option maxNativeZoom: Number = undefined
          // Maximum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
          // from `maxNativeZoom` level and auto-scaled.
          maxNativeZoom: void 0,
          // @option minNativeZoom: Number = undefined
          // Minimum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
          // from `minNativeZoom` level and auto-scaled.
          minNativeZoom: void 0,
          // @option noWrap: Boolean = false
          // Whether the layer is wrapped around the antimeridian. If `true`, the
          // GridLayer will only be displayed once at low zoom levels. Has no
          // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
          // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
          // tiles outside the CRS limits.
          noWrap: false,
          // @option pane: String = 'tilePane'
          // `Map pane` where the grid layer will be added.
          pane: "tilePane",
          // @option className: String = ''
          // A custom class name to assign to the tile layer. Empty by default.
          className: "",
          // @option keepBuffer: Number = 2
          // When panning the map, keep this many rows and columns of tiles before unloading them.
          keepBuffer: 2
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        onAdd: function() {
          this._initContainer();
          this._levels = {};
          this._tiles = {};
          this._resetView();
        },
        beforeAdd: function(map3) {
          map3._addZoomLimit(this);
        },
        onRemove: function(map3) {
          this._removeAllTiles();
          remove(this._container);
          map3._removeZoomLimit(this);
          this._container = null;
          this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
            this._setAutoZIndex(Math.max);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
            this._setAutoZIndex(Math.min);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the tiles for this layer.
        getContainer: function() {
          return this._container;
        },
        // @method setOpacity(opacity: Number): this
        // Changes the [opacity](#gridlayer-opacity) of the grid layer.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          this._updateOpacity();
          return this;
        },
        // @method setZIndex(zIndex: Number): this
        // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
        setZIndex: function(zIndex) {
          this.options.zIndex = zIndex;
          this._updateZIndex();
          return this;
        },
        // @method isLoading: Boolean
        // Returns `true` if any tile in the grid layer has not finished loading.
        isLoading: function() {
          return this._loading;
        },
        // @method redraw: this
        // Causes the layer to clear all the tiles and request them again.
        redraw: function() {
          if (this._map) {
            this._removeAllTiles();
            var tileZoom = this._clampZoom(this._map.getZoom());
            if (tileZoom !== this._tileZoom) {
              this._tileZoom = tileZoom;
              this._updateLevels();
            }
            this._update();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
          };
          if (!this.options.updateWhenIdle) {
            if (!this._onMove) {
              this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
            }
            events.move = this._onMove;
          }
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @section Extension methods
        // Layers extending `GridLayer` shall reimplement the following method.
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, must be overridden by classes extending `GridLayer`.
        // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
        // is specified, it must be called when the tile has finished loading and drawing.
        createTile: function() {
          return document.createElement("div");
        },
        // @section
        // @method getTileSize: Point
        // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
        getTileSize: function() {
          var s = this.options.tileSize;
          return s instanceof Point ? s : new Point(s, s);
        },
        _updateZIndex: function() {
          if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._container.style.zIndex = this.options.zIndex;
          }
        },
        _setAutoZIndex: function(compare) {
          var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
          for (var i = 0, len = layers2.length, zIndex; i < len; i++) {
            zIndex = layers2[i].style.zIndex;
            if (layers2[i] !== this._container && zIndex) {
              edgeZIndex = compare(edgeZIndex, +zIndex);
            }
          }
          if (isFinite(edgeZIndex)) {
            this.options.zIndex = edgeZIndex + compare(-1, 1);
            this._updateZIndex();
          }
        },
        _updateOpacity: function() {
          if (!this._map) {
            return;
          }
          if (Browser.ielt9) {
            return;
          }
          setOpacity(this._container, this.options.opacity);
          var now = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
          for (var key in this._tiles) {
            var tile = this._tiles[key];
            if (!tile.current || !tile.loaded) {
              continue;
            }
            var fade = Math.min(1, (now - tile.loaded) / 200);
            setOpacity(tile.el, fade);
            if (fade < 1) {
              nextFrame = true;
            } else {
              if (tile.active) {
                willPrune = true;
              } else {
                this._onOpaqueTile(tile);
              }
              tile.active = true;
            }
          }
          if (willPrune && !this._noPrune) {
            this._pruneTiles();
          }
          if (nextFrame) {
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          }
        },
        _onOpaqueTile: falseFn,
        _initContainer: function() {
          if (this._container) {
            return;
          }
          this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
          this._updateZIndex();
          if (this.options.opacity < 1) {
            this._updateOpacity();
          }
          this.getPane().appendChild(this._container);
        },
        _updateLevels: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
          if (zoom2 === void 0) {
            return void 0;
          }
          for (var z in this._levels) {
            z = Number(z);
            if (this._levels[z].el.children.length || z === zoom2) {
              this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
              this._onUpdateLevel(z);
            } else {
              remove(this._levels[z].el);
              this._removeTilesAtZoom(z);
              this._onRemoveLevel(z);
              delete this._levels[z];
            }
          }
          var level = this._levels[zoom2], map3 = this._map;
          if (!level) {
            level = this._levels[zoom2] = {};
            level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
            level.el.style.zIndex = maxZoom;
            level.origin = map3.project(map3.unproject(map3.getPixelOrigin()), zoom2).round();
            level.zoom = zoom2;
            this._setZoomTransform(level, map3.getCenter(), map3.getZoom());
            falseFn(level.el.offsetWidth);
            this._onCreateLevel(level);
          }
          this._level = level;
          return level;
        },
        _onUpdateLevel: falseFn,
        _onRemoveLevel: falseFn,
        _onCreateLevel: falseFn,
        _pruneTiles: function() {
          if (!this._map) {
            return;
          }
          var key, tile;
          var zoom2 = this._map.getZoom();
          if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            tile.retain = tile.current;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            if (tile.current && !tile.active) {
              var coords = tile.coords;
              if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
              }
            }
          }
          for (key in this._tiles) {
            if (!this._tiles[key].retain) {
              this._removeTile(key);
            }
          }
        },
        _removeTilesAtZoom: function(zoom2) {
          for (var key in this._tiles) {
            if (this._tiles[key].coords.z !== zoom2) {
              continue;
            }
            this._removeTile(key);
          }
        },
        _removeAllTiles: function() {
          for (var key in this._tiles) {
            this._removeTile(key);
          }
        },
        _invalidateAll: function() {
          for (var z in this._levels) {
            remove(this._levels[z].el);
            this._onRemoveLevel(Number(z));
            delete this._levels[z];
          }
          this._removeAllTiles();
          this._tileZoom = void 0;
        },
        _retainParent: function(x, y, z, minZoom) {
          var x2 = Math.floor(x / 2), y2 = Math.floor(y / 2), z2 = z - 1, coords2 = new Point(+x2, +y2);
          coords2.z = +z2;
          var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
          if (tile && tile.active) {
            tile.retain = true;
            return true;
          } else if (tile && tile.loaded) {
            tile.retain = true;
          }
          if (z2 > minZoom) {
            return this._retainParent(x2, y2, z2, minZoom);
          }
          return false;
        },
        _retainChildren: function(x, y, z, maxZoom) {
          for (var i = 2 * x; i < 2 * x + 2; i++) {
            for (var j = 2 * y; j < 2 * y + 2; j++) {
              var coords = new Point(i, j);
              coords.z = z + 1;
              var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
              if (tile && tile.active) {
                tile.retain = true;
                continue;
              } else if (tile && tile.loaded) {
                tile.retain = true;
              }
              if (z + 1 < maxZoom) {
                this._retainChildren(i, j, z + 1, maxZoom);
              }
            }
          }
        },
        _resetView: function(e) {
          var animating = e && (e.pinch || e.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
        },
        _animateZoom: function(e) {
          this._setView(e.center, e.zoom, true, e.noUpdate);
        },
        _clampZoom: function(zoom2) {
          var options = this.options;
          if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
            return options.minNativeZoom;
          }
          if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
            return options.maxNativeZoom;
          }
          return zoom2;
        },
        _setView: function(center, zoom2, noPrune, noUpdate) {
          var tileZoom = Math.round(zoom2);
          if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
            tileZoom = void 0;
          } else {
            tileZoom = this._clampZoom(tileZoom);
          }
          var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
          if (!noUpdate || tileZoomChanged) {
            this._tileZoom = tileZoom;
            if (this._abortLoading) {
              this._abortLoading();
            }
            this._updateLevels();
            this._resetGrid();
            if (tileZoom !== void 0) {
              this._update(center);
            }
            if (!noPrune) {
              this._pruneTiles();
            }
            this._noPrune = !!noPrune;
          }
          this._setZoomTransforms(center, zoom2);
        },
        _setZoomTransforms: function(center, zoom2) {
          for (var i in this._levels) {
            this._setZoomTransform(this._levels[i], center, zoom2);
          }
        },
        _setZoomTransform: function(level, center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
          if (Browser.any3d) {
            setTransform(level.el, translate, scale2);
          } else {
            setPosition(level.el, translate);
          }
        },
        _resetGrid: function() {
          var map3 = this._map, crs = map3.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
          var bounds = this._map.getPixelWorldBounds(this._tileZoom);
          if (bounds) {
            this._globalTileRange = this._pxBoundsToTileRange(bounds);
          }
          this._wrapX = crs.wrapLng && !this.options.noWrap && [
            Math.floor(map3.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
            Math.ceil(map3.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
          ];
          this._wrapY = crs.wrapLat && !this.options.noWrap && [
            Math.floor(map3.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
            Math.ceil(map3.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
          ];
        },
        _onMoveEnd: function() {
          if (!this._map || this._map._animatingZoom) {
            return;
          }
          this._update();
        },
        _getTiledPixelBounds: function(center) {
          var map3 = this._map, mapZoom = map3._animatingZoom ? Math.max(map3._animateToZoom, map3.getZoom()) : map3.getZoom(), scale2 = map3.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map3.project(center, this._tileZoom).floor(), halfSize = map3.getSize().divideBy(scale2 * 2);
          return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(center) {
          var map3 = this._map;
          if (!map3) {
            return;
          }
          var zoom2 = this._clampZoom(map3.getZoom());
          if (center === void 0) {
            center = map3.getCenter();
          }
          if (this._tileZoom === void 0) {
            return;
          }
          var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
            tileRange.getBottomLeft().subtract([margin, -margin]),
            tileRange.getTopRight().add([margin, -margin])
          );
          if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
            throw new Error("Attempted to load an infinite number of tiles");
          }
          for (var key in this._tiles) {
            var c = this._tiles[key].coords;
            if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
              this._tiles[key].current = false;
            }
          }
          if (Math.abs(zoom2 - this._tileZoom) > 1) {
            this._setView(center, zoom2);
            return;
          }
          for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
            for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
              var coords = new Point(i, j);
              coords.z = this._tileZoom;
              if (!this._isValidTile(coords)) {
                continue;
              }
              var tile = this._tiles[this._tileCoordsToKey(coords)];
              if (tile) {
                tile.current = true;
              } else {
                queue.push(coords);
              }
            }
          }
          queue.sort(function(a, b) {
            return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
          });
          if (queue.length !== 0) {
            if (!this._loading) {
              this._loading = true;
              this.fire("loading");
            }
            var fragment = document.createDocumentFragment();
            for (i = 0; i < queue.length; i++) {
              this._addTile(queue[i], fragment);
            }
            this._level.el.appendChild(fragment);
          }
        },
        _isValidTile: function(coords) {
          var crs = this._map.options.crs;
          if (!crs.infinite) {
            var bounds = this._globalTileRange;
            if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
              return false;
            }
          }
          if (!this.options.bounds) {
            return true;
          }
          var tileBounds = this._tileCoordsToBounds(coords);
          return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
        },
        _keyToBounds: function(key) {
          return this._tileCoordsToBounds(this._keyToTileCoords(key));
        },
        _tileCoordsToNwSe: function(coords) {
          var map3 = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map3.unproject(nwPoint, coords.z), se = map3.unproject(sePoint, coords.z);
          return [nw, se];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(coords) {
          var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
          if (!this.options.noWrap) {
            bounds = this._map.wrapLatLngBounds(bounds);
          }
          return bounds;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(coords) {
          return coords.x + ":" + coords.y + ":" + coords.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(key) {
          var k = key.split(":"), coords = new Point(+k[0], +k[1]);
          coords.z = +k[2];
          return coords;
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          remove(tile.el);
          delete this._tiles[key];
          this.fire("tileunload", {
            tile: tile.el,
            coords: this._keyToTileCoords(key)
          });
        },
        _initTile: function(tile) {
          addClass(tile, "leaflet-tile");
          var tileSize = this.getTileSize();
          tile.style.width = tileSize.x + "px";
          tile.style.height = tileSize.y + "px";
          tile.onselectstart = falseFn;
          tile.onmousemove = falseFn;
          if (Browser.ielt9 && this.options.opacity < 1) {
            setOpacity(tile, this.options.opacity);
          }
        },
        _addTile: function(coords, container) {
          var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
          var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
          this._initTile(tile);
          if (this.createTile.length < 2) {
            requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
          }
          setPosition(tile, tilePos);
          this._tiles[key] = {
            el: tile,
            coords,
            current: true
          };
          container.appendChild(tile);
          this.fire("tileloadstart", {
            tile,
            coords
          });
        },
        _tileReady: function(coords, err, tile) {
          if (err) {
            this.fire("tileerror", {
              error: err,
              tile,
              coords
            });
          }
          var key = this._tileCoordsToKey(coords);
          tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.loaded = +/* @__PURE__ */ new Date();
          if (this._map._fadeAnimated) {
            setOpacity(tile.el, 0);
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          } else {
            tile.active = true;
            this._pruneTiles();
          }
          if (!err) {
            addClass(tile.el, "leaflet-tile-loaded");
            this.fire("tileload", {
              tile: tile.el,
              coords
            });
          }
          if (this._noTilesToLoad()) {
            this._loading = false;
            this.fire("load");
            if (Browser.ielt9 || !this._map._fadeAnimated) {
              requestAnimFrame(this._pruneTiles, this);
            } else {
              setTimeout(bind(this._pruneTiles, this), 250);
            }
          }
        },
        _getTilePos: function(coords) {
          return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(coords) {
          var newCoords = new Point(
            this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
            this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
          );
          newCoords.z = coords.z;
          return newCoords;
        },
        _pxBoundsToTileRange: function(bounds) {
          var tileSize = this.getTileSize();
          return new Bounds(
            bounds.min.unscaleBy(tileSize).floor(),
            bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function() {
          for (var key in this._tiles) {
            if (!this._tiles[key].loaded) {
              return false;
            }
          }
          return true;
        }
      });
      function gridLayer(options) {
        return new GridLayer(options);
      }
      var TileLayer = GridLayer.extend({
        // @section
        // @aka TileLayer options
        options: {
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = 18
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: 18,
          // @option subdomains: String|String[] = 'abc'
          // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
          subdomains: "abc",
          // @option errorTileUrl: String = ''
          // URL to the tile image to show in place of the tile that failed to load.
          errorTileUrl: "",
          // @option zoomOffset: Number = 0
          // The zoom number used in tile URLs will be offset with this value.
          zoomOffset: 0,
          // @option tms: Boolean = false
          // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
          tms: false,
          // @option zoomReverse: Boolean = false
          // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
          zoomReverse: false,
          // @option detectRetina: Boolean = false
          // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
          detectRetina: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option referrerPolicy: Boolean|String = false
          // Whether the referrerPolicy attribute will be added to the tiles.
          // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
          // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
          // (e.g. to validate an API token).
          // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
          referrerPolicy: false
        },
        initialize: function(url, options) {
          this._url = url;
          options = setOptions(this, options);
          if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
            options.tileSize = Math.floor(options.tileSize / 2);
            if (!options.zoomReverse) {
              options.zoomOffset++;
              options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
            } else {
              options.zoomOffset--;
              options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
            }
            options.minZoom = Math.max(0, options.minZoom);
          } else if (!options.zoomReverse) {
            options.maxZoom = Math.max(options.minZoom, options.maxZoom);
          } else {
            options.minZoom = Math.min(options.maxZoom, options.minZoom);
          }
          if (typeof options.subdomains === "string") {
            options.subdomains = options.subdomains.split("");
          }
          this.on("tileunload", this._onTileRemove);
        },
        // @method setUrl(url: String, noRedraw?: Boolean): this
        // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
        // If the URL does not change, the layer will not be redrawn unless
        // the noRedraw parameter is set to false.
        setUrl: function(url, noRedraw) {
          if (this._url === url && noRedraw === void 0) {
            noRedraw = true;
          }
          this._url = url;
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        },
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
        // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
        // callback is called when the tile has been loaded.
        createTile: function(coords, done) {
          var tile = document.createElement("img");
          on(tile, "load", bind(this._tileOnLoad, this, done, tile));
          on(tile, "error", bind(this._tileOnError, this, done, tile));
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (typeof this.options.referrerPolicy === "string") {
            tile.referrerPolicy = this.options.referrerPolicy;
          }
          tile.alt = "";
          tile.src = this.getTileUrl(coords);
          return tile;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(coords) {
          var data = {
            r: Browser.retina ? "@2x" : "",
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
              data["y"] = invertedY;
            }
            data["-y"] = invertedY;
          }
          return template(this._url, extend(data, this.options));
        },
        _tileOnLoad: function(done, tile) {
          if (Browser.ielt9) {
            setTimeout(bind(done, this, null, tile), 0);
          } else {
            done(null, tile);
          }
        },
        _tileOnError: function(done, tile, e) {
          var errorUrl = this.options.errorTileUrl;
          if (errorUrl && tile.getAttribute("src") !== errorUrl) {
            tile.src = errorUrl;
          }
          done(e, tile);
        },
        _onTileRemove: function(e) {
          e.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
          if (zoomReverse) {
            zoom2 = maxZoom - zoom2;
          }
          return zoom2 + zoomOffset;
        },
        _getSubdomain: function(tilePoint) {
          var index2 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
          return this.options.subdomains[index2];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var i, tile;
          for (i in this._tiles) {
            if (this._tiles[i].coords.z !== this._tileZoom) {
              tile = this._tiles[i].el;
              tile.onload = falseFn;
              tile.onerror = falseFn;
              if (!tile.complete) {
                tile.src = emptyImageUrl;
                var coords = this._tiles[i].coords;
                remove(tile);
                delete this._tiles[i];
                this.fire("tileabort", {
                  tile,
                  coords
                });
              }
            }
          }
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.el.setAttribute("src", emptyImageUrl);
          return GridLayer.prototype._removeTile.call(this, key);
        },
        _tileReady: function(coords, err, tile) {
          if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
            return;
          }
          return GridLayer.prototype._tileReady.call(this, coords, err, tile);
        }
      });
      function tileLayer2(url, options) {
        return new TileLayer(url, options);
      }
      var TileLayerWMS = TileLayer.extend({
        // @section
        // @aka TileLayer.WMS options
        // If any custom options not documented here are used, they will be sent to the
        // WMS server as extra parameters in each request URL. This can be useful for
        // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
        defaultWmsParams: {
          service: "WMS",
          request: "GetMap",
          // @option layers: String = ''
          // **(required)** Comma-separated list of WMS layers to show.
          layers: "",
          // @option styles: String = ''
          // Comma-separated list of WMS styles.
          styles: "",
          // @option format: String = 'image/jpeg'
          // WMS image format (use `'image/png'` for layers with transparency).
          format: "image/jpeg",
          // @option transparent: Boolean = false
          // If `true`, the WMS service will return images with transparency.
          transparent: false,
          // @option version: String = '1.1.1'
          // Version of the WMS service to use
          version: "1.1.1"
        },
        options: {
          // @option crs: CRS = null
          // Coordinate Reference System to use for the WMS requests, defaults to
          // map CRS. Don't change this if you're not sure what it means.
          crs: null,
          // @option uppercase: Boolean = false
          // If `true`, WMS request parameter keys will be uppercase.
          uppercase: false
        },
        initialize: function(url, options) {
          this._url = url;
          var wmsParams = extend({}, this.defaultWmsParams);
          for (var i in options) {
            if (!(i in this.options)) {
              wmsParams[i] = options[i];
            }
          }
          options = setOptions(this, options);
          var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
          var tileSize = this.getTileSize();
          wmsParams.width = tileSize.x * realRetina;
          wmsParams.height = tileSize.y * realRetina;
          this.wmsParams = wmsParams;
        },
        onAdd: function(map3) {
          this._crs = this.options.crs || map3.options.crs;
          this._wmsVersion = parseFloat(this.wmsParams.version);
          var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[projectionKey] = this._crs.code;
          TileLayer.prototype.onAdd.call(this, map3);
        },
        getTileUrl: function(coords) {
          var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
          return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(params, noRedraw) {
          extend(this.wmsParams, params);
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        }
      });
      function tileLayerWMS(url, options) {
        return new TileLayerWMS(url, options);
      }
      TileLayer.WMS = TileLayerWMS;
      tileLayer2.wms = tileLayerWMS;
      var Renderer = Layer.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(options) {
          setOptions(this, options);
          stamp(this);
          this._layers = this._layers || {};
        },
        onAdd: function() {
          if (!this._container) {
            this._initContainer();
            addClass(this._container, "leaflet-zoom-animated");
          }
          this.getPane().appendChild(this._container);
          this._update();
          this.on("update", this._updatePaths, this);
        },
        onRemove: function() {
          this.off("update", this._updatePaths, this);
          this._destroyContainer();
        },
        getEvents: function() {
          var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
          }
          return events;
        },
        _onAnimZoom: function(ev) {
          this._updateTransform(ev.center, ev.zoom);
        },
        _onZoom: function() {
          this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function(center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
          if (Browser.any3d) {
            setTransform(this._container, topLeftOffset, scale2);
          } else {
            setPosition(this._container, topLeftOffset);
          }
        },
        _reset: function() {
          this._update();
          this._updateTransform(this._center, this._zoom);
          for (var id in this._layers) {
            this._layers[id]._reset();
          }
        },
        _onZoomEnd: function() {
          for (var id in this._layers) {
            this._layers[id]._project();
          }
        },
        _updatePaths: function() {
          for (var id in this._layers) {
            this._layers[id]._update();
          }
        },
        _update: function() {
          var p = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
          this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
          this._center = this._map.getCenter();
          this._zoom = this._map.getZoom();
        }
      });
      var Canvas = Renderer.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var events = Renderer.prototype.getEvents.call(this);
          events.viewprereset = this._onViewPreReset;
          return events;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = true;
        },
        onAdd: function() {
          Renderer.prototype.onAdd.call(this);
          this._draw();
        },
        _initContainer: function() {
          var container = this._container = document.createElement("canvas");
          on(container, "mousemove", this._onMouseMove, this);
          on(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
          on(container, "mouseout", this._handleMouseOut, this);
          container["_leaflet_disable_events"] = true;
          this._ctx = container.getContext("2d");
        },
        _destroyContainer: function() {
          cancelAnimFrame(this._redrawRequest);
          delete this._ctx;
          remove(this._container);
          off(this._container);
          delete this._container;
        },
        _updatePaths: function() {
          if (this._postponeUpdatePaths) {
            return;
          }
          var layer;
          this._redrawBounds = null;
          for (var id in this._layers) {
            layer = this._layers[id];
            layer._update();
          }
          this._redraw();
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b = this._bounds, container = this._container, size = b.getSize(), m = Browser.retina ? 2 : 1;
          setPosition(container, b.min);
          container.width = m * size.x;
          container.height = m * size.y;
          container.style.width = size.x + "px";
          container.style.height = size.y + "px";
          if (Browser.retina) {
            this._ctx.scale(2, 2);
          }
          this._ctx.translate(-b.min.x, -b.min.y);
          this.fire("update");
        },
        _reset: function() {
          Renderer.prototype._reset.call(this);
          if (this._postponeUpdatePaths) {
            this._postponeUpdatePaths = false;
            this._updatePaths();
          }
        },
        _initPath: function(layer) {
          this._updateDashArray(layer);
          this._layers[stamp(layer)] = layer;
          var order = layer._order = {
            layer,
            prev: this._drawLast,
            next: null
          };
          if (this._drawLast) {
            this._drawLast.next = order;
          }
          this._drawLast = order;
          this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(layer) {
          this._requestRedraw(layer);
        },
        _removePath: function(layer) {
          var order = layer._order;
          var next = order.next;
          var prev = order.prev;
          if (next) {
            next.prev = prev;
          } else {
            this._drawLast = prev;
          }
          if (prev) {
            prev.next = next;
          } else {
            this._drawFirst = next;
          }
          delete layer._order;
          delete this._layers[stamp(layer)];
          this._requestRedraw(layer);
        },
        _updatePath: function(layer) {
          this._extendRedrawBounds(layer);
          layer._project();
          layer._update();
          this._requestRedraw(layer);
        },
        _updateStyle: function(layer) {
          this._updateDashArray(layer);
          this._requestRedraw(layer);
        },
        _updateDashArray: function(layer) {
          if (typeof layer.options.dashArray === "string") {
            var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
            for (i = 0; i < parts.length; i++) {
              dashValue = Number(parts[i]);
              if (isNaN(dashValue)) {
                return;
              }
              dashArray.push(dashValue);
            }
            layer.options._dashArray = dashArray;
          } else {
            layer.options._dashArray = layer.options.dashArray;
          }
        },
        _requestRedraw: function(layer) {
          if (!this._map) {
            return;
          }
          this._extendRedrawBounds(layer);
          this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
        },
        _extendRedrawBounds: function(layer) {
          if (layer._pxBounds) {
            var padding = (layer.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new Bounds();
            this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
            this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
          }
        },
        _redraw: function() {
          this._redrawRequest = null;
          if (this._redrawBounds) {
            this._redrawBounds.min._floor();
            this._redrawBounds.max._ceil();
          }
          this._clear();
          this._draw();
          this._redrawBounds = null;
        },
        _clear: function() {
          var bounds = this._redrawBounds;
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
          } else {
            this._ctx.save();
            this._ctx.setTransform(1, 0, 0, 1, 0, 0);
            this._ctx.clearRect(0, 0, this._container.width, this._container.height);
            this._ctx.restore();
          }
        },
        _draw: function() {
          var layer, bounds = this._redrawBounds;
          this._ctx.save();
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.beginPath();
            this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
            this._ctx.clip();
          }
          this._drawing = true;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
              layer._updatePath();
            }
          }
          this._drawing = false;
          this._ctx.restore();
        },
        _updatePoly: function(layer, closed) {
          if (!this._drawing) {
            return;
          }
          var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
          if (!len) {
            return;
          }
          ctx.beginPath();
          for (i = 0; i < len; i++) {
            for (j = 0, len2 = parts[i].length; j < len2; j++) {
              p = parts[i][j];
              ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
            }
            if (closed) {
              ctx.closePath();
            }
          }
          this._fillStroke(ctx, layer);
        },
        _updateCircle: function(layer) {
          if (!this._drawing || layer._empty()) {
            return;
          }
          var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
          if (s !== 1) {
            ctx.save();
            ctx.scale(1, s);
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
          if (s !== 1) {
            ctx.restore();
          }
          this._fillStroke(ctx, layer);
        },
        _fillStroke: function(ctx, layer) {
          var options = layer.options;
          if (options.fill) {
            ctx.globalAlpha = options.fillOpacity;
            ctx.fillStyle = options.fillColor || options.color;
            ctx.fill(options.fillRule || "evenodd");
          }
          if (options.stroke && options.weight !== 0) {
            if (ctx.setLineDash) {
              ctx.setLineDash(layer.options && layer.options._dashArray || []);
            }
            ctx.globalAlpha = options.opacity;
            ctx.lineWidth = options.weight;
            ctx.strokeStyle = options.color;
            ctx.lineCap = options.lineCap;
            ctx.lineJoin = options.lineJoin;
            ctx.stroke();
          }
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(e) {
          var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              if (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(layer)) {
                clickedLayer = layer;
              }
            }
          }
          this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
        },
        _onMouseMove: function(e) {
          if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
            return;
          }
          var point = this._map.mouseEventToLayerPoint(e);
          this._handleMouseHover(e, point);
        },
        _handleMouseOut: function(e) {
          var layer = this._hoveredLayer;
          if (layer) {
            removeClass(this._container, "leaflet-interactive");
            this._fireEvent([layer], e, "mouseout");
            this._hoveredLayer = null;
            this._mouseHoverThrottled = false;
          }
        },
        _handleMouseHover: function(e, point) {
          if (this._mouseHoverThrottled) {
            return;
          }
          var layer, candidateHoveredLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              candidateHoveredLayer = layer;
            }
          }
          if (candidateHoveredLayer !== this._hoveredLayer) {
            this._handleMouseOut(e);
            if (candidateHoveredLayer) {
              addClass(this._container, "leaflet-interactive");
              this._fireEvent([candidateHoveredLayer], e, "mouseover");
              this._hoveredLayer = candidateHoveredLayer;
            }
          }
          this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);
          this._mouseHoverThrottled = true;
          setTimeout(bind(function() {
            this._mouseHoverThrottled = false;
          }, this), 32);
        },
        _fireEvent: function(layers2, e, type) {
          this._map._fireDOMEvent(e, type || e.type, layers2);
        },
        _bringToFront: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next = order.next;
          var prev = order.prev;
          if (next) {
            next.prev = prev;
          } else {
            return;
          }
          if (prev) {
            prev.next = next;
          } else if (next) {
            this._drawFirst = next;
          }
          order.prev = this._drawLast;
          this._drawLast.next = order;
          order.next = null;
          this._drawLast = order;
          this._requestRedraw(layer);
        },
        _bringToBack: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next = order.next;
          var prev = order.prev;
          if (prev) {
            prev.next = next;
          } else {
            return;
          }
          if (next) {
            next.prev = prev;
          } else if (prev) {
            this._drawLast = prev;
          }
          order.prev = null;
          order.next = this._drawFirst;
          this._drawFirst.prev = order;
          this._drawFirst = order;
          this._requestRedraw(layer);
        }
      });
      function canvas(options) {
        return Browser.canvas ? new Canvas(options) : null;
      }
      var vmlCreate = function() {
        try {
          document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
          return function(name) {
            return document.createElement("<lvml:" + name + ' class="lvml">');
          };
        } catch (e) {
        }
        return function(name) {
          return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      }();
      var vmlMixin = {
        _initContainer: function() {
          this._container = create$1("div", "leaflet-vml-container");
        },
        _update: function() {
          if (this._map._animatingZoom) {
            return;
          }
          Renderer.prototype._update.call(this);
          this.fire("update");
        },
        _initPath: function(layer) {
          var container = layer._container = vmlCreate("shape");
          addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
          container.coordsize = "1 1";
          layer._path = vmlCreate("path");
          container.appendChild(layer._path);
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          var container = layer._container;
          this._container.appendChild(container);
          if (layer.options.interactive) {
            layer.addInteractiveTarget(container);
          }
        },
        _removePath: function(layer) {
          var container = layer._container;
          remove(container);
          layer.removeInteractiveTarget(container);
          delete this._layers[stamp(layer)];
        },
        _updateStyle: function(layer) {
          var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
          container.stroked = !!options.stroke;
          container.filled = !!options.fill;
          if (options.stroke) {
            if (!stroke) {
              stroke = layer._stroke = vmlCreate("stroke");
            }
            container.appendChild(stroke);
            stroke.weight = options.weight + "px";
            stroke.color = options.color;
            stroke.opacity = options.opacity;
            if (options.dashArray) {
              stroke.dashStyle = isArray(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
            } else {
              stroke.dashStyle = "";
            }
            stroke.endcap = options.lineCap.replace("butt", "flat");
            stroke.joinstyle = options.lineJoin;
          } else if (stroke) {
            container.removeChild(stroke);
            layer._stroke = null;
          }
          if (options.fill) {
            if (!fill) {
              fill = layer._fill = vmlCreate("fill");
            }
            container.appendChild(fill);
            fill.color = options.fillColor || options.color;
            fill.opacity = options.fillOpacity;
          } else if (fill) {
            container.removeChild(fill);
            layer._fill = null;
          }
        },
        _updateCircle: function(layer) {
          var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
          this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
        },
        _setPath: function(layer, path) {
          layer._path.v = path;
        },
        _bringToFront: function(layer) {
          toFront(layer._container);
        },
        _bringToBack: function(layer) {
          toBack(layer._container);
        }
      };
      var create = Browser.vml ? vmlCreate : svgCreate;
      var SVG = Renderer.extend({
        _initContainer: function() {
          this._container = create("svg");
          this._container.setAttribute("pointer-events", "none");
          this._rootGroup = create("g");
          this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          remove(this._container);
          off(this._container);
          delete this._container;
          delete this._rootGroup;
          delete this._svgSize;
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b = this._bounds, size = b.getSize(), container = this._container;
          if (!this._svgSize || !this._svgSize.equals(size)) {
            this._svgSize = size;
            container.setAttribute("width", size.x);
            container.setAttribute("height", size.y);
          }
          setPosition(container, b.min);
          container.setAttribute("viewBox", [b.min.x, b.min.y, size.x, size.y].join(" "));
          this.fire("update");
        },
        // methods below are called by vector layers implementations
        _initPath: function(layer) {
          var path = layer._path = create("path");
          if (layer.options.className) {
            addClass(path, layer.options.className);
          }
          if (layer.options.interactive) {
            addClass(path, "leaflet-interactive");
          }
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          if (!this._rootGroup) {
            this._initContainer();
          }
          this._rootGroup.appendChild(layer._path);
          layer.addInteractiveTarget(layer._path);
        },
        _removePath: function(layer) {
          remove(layer._path);
          layer.removeInteractiveTarget(layer._path);
          delete this._layers[stamp(layer)];
        },
        _updatePath: function(layer) {
          layer._project();
          layer._update();
        },
        _updateStyle: function(layer) {
          var path = layer._path, options = layer.options;
          if (!path) {
            return;
          }
          if (options.stroke) {
            path.setAttribute("stroke", options.color);
            path.setAttribute("stroke-opacity", options.opacity);
            path.setAttribute("stroke-width", options.weight);
            path.setAttribute("stroke-linecap", options.lineCap);
            path.setAttribute("stroke-linejoin", options.lineJoin);
            if (options.dashArray) {
              path.setAttribute("stroke-dasharray", options.dashArray);
            } else {
              path.removeAttribute("stroke-dasharray");
            }
            if (options.dashOffset) {
              path.setAttribute("stroke-dashoffset", options.dashOffset);
            } else {
              path.removeAttribute("stroke-dashoffset");
            }
          } else {
            path.setAttribute("stroke", "none");
          }
          if (options.fill) {
            path.setAttribute("fill", options.fillColor || options.color);
            path.setAttribute("fill-opacity", options.fillOpacity);
            path.setAttribute("fill-rule", options.fillRule || "evenodd");
          } else {
            path.setAttribute("fill", "none");
          }
        },
        _updatePoly: function(layer, closed) {
          this._setPath(layer, pointsToPath(layer._parts, closed));
        },
        _updateCircle: function(layer) {
          var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
          var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
          this._setPath(layer, d);
        },
        _setPath: function(layer, path) {
          layer._path.setAttribute("d", path);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(layer) {
          toFront(layer._path);
        },
        _bringToBack: function(layer) {
          toBack(layer._path);
        }
      });
      if (Browser.vml) {
        SVG.include(vmlMixin);
      }
      function svg(options) {
        return Browser.svg || Browser.vml ? new SVG(options) : null;
      }
      Map2.include({
        // @namespace Map; @method getRenderer(layer: Path): Renderer
        // Returns the instance of `Renderer` that should be used to render the given
        // `Path`. It will ensure that the `renderer` options of the map and paths
        // are respected, and that the renderers do exist on the map.
        getRenderer: function(layer) {
          var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
          if (!renderer) {
            renderer = this._renderer = this._createRenderer();
          }
          if (!this.hasLayer(renderer)) {
            this.addLayer(renderer);
          }
          return renderer;
        },
        _getPaneRenderer: function(name) {
          if (name === "overlayPane" || name === void 0) {
            return false;
          }
          var renderer = this._paneRenderers[name];
          if (renderer === void 0) {
            renderer = this._createRenderer({ pane: name });
            this._paneRenderers[name] = renderer;
          }
          return renderer;
        },
        _createRenderer: function(options) {
          return this.options.preferCanvas && canvas(options) || svg(options);
        }
      });
      var Rectangle = Polygon.extend({
        initialize: function(latLngBounds2, options) {
          Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds2), options);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(latLngBounds2) {
          return this.setLatLngs(this._boundsToLatLngs(latLngBounds2));
        },
        _boundsToLatLngs: function(latLngBounds2) {
          latLngBounds2 = toLatLngBounds(latLngBounds2);
          return [
            latLngBounds2.getSouthWest(),
            latLngBounds2.getNorthWest(),
            latLngBounds2.getNorthEast(),
            latLngBounds2.getSouthEast()
          ];
        }
      });
      function rectangle(latLngBounds2, options) {
        return new Rectangle(latLngBounds2, options);
      }
      SVG.create = create;
      SVG.pointsToPath = pointsToPath;
      GeoJSON.geometryToLayer = geometryToLayer;
      GeoJSON.coordsToLatLng = coordsToLatLng;
      GeoJSON.coordsToLatLngs = coordsToLatLngs;
      GeoJSON.latLngToCoords = latLngToCoords;
      GeoJSON.latLngsToCoords = latLngsToCoords;
      GeoJSON.getFeature = getFeature;
      GeoJSON.asFeature = asFeature;
      Map2.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: true
      });
      var BoxZoom = Handler.extend({
        initialize: function(map3) {
          this._map = map3;
          this._container = map3._container;
          this._pane = map3._panes.overlayPane;
          this._resetStateTimeout = 0;
          map3.on("unload", this._destroy, this);
        },
        addHooks: function() {
          on(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          off(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          remove(this._pane);
          delete this._pane;
        },
        _resetState: function() {
          this._resetStateTimeout = 0;
          this._moved = false;
        },
        _clearDeferredResetState: function() {
          if (this._resetStateTimeout !== 0) {
            clearTimeout(this._resetStateTimeout);
            this._resetStateTimeout = 0;
          }
        },
        _onMouseDown: function(e) {
          if (!e.shiftKey || e.which !== 1 && e.button !== 1) {
            return false;
          }
          this._clearDeferredResetState();
          this._resetState();
          disableTextSelection();
          disableImageDrag();
          this._startPoint = this._map.mouseEventToContainerPoint(e);
          on(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(e) {
          if (!this._moved) {
            this._moved = true;
            this._box = create$1("div", "leaflet-zoom-box", this._container);
            addClass(this._container, "leaflet-crosshair");
            this._map.fire("boxzoomstart");
          }
          this._point = this._map.mouseEventToContainerPoint(e);
          var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
          setPosition(this._box, bounds.min);
          this._box.style.width = size.x + "px";
          this._box.style.height = size.y + "px";
        },
        _finish: function() {
          if (this._moved) {
            remove(this._box);
            removeClass(this._container, "leaflet-crosshair");
          }
          enableTextSelection();
          enableImageDrag();
          off(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(e) {
          if (e.which !== 1 && e.button !== 1) {
            return;
          }
          this._finish();
          if (!this._moved) {
            return;
          }
          this._clearDeferredResetState();
          this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
          var bounds = new LatLngBounds(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
        },
        _onKeyDown: function(e) {
          if (e.keyCode === 27) {
            this._finish();
            this._clearDeferredResetState();
            this._resetState();
          }
        }
      });
      Map2.addInitHook("addHandler", "boxZoom", BoxZoom);
      Map2.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: true
      });
      var DoubleClickZoom = Handler.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(e) {
          var map3 = this._map, oldZoom = map3.getZoom(), delta = map3.options.zoomDelta, zoom2 = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
          if (map3.options.doubleClickZoom === "center") {
            map3.setZoom(zoom2);
          } else {
            map3.setZoomAround(e.containerPoint, zoom2);
          }
        }
      });
      Map2.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
      Map2.mergeOptions({
        // @option dragging: Boolean = true
        // Whether the map is draggable with mouse/touch or not.
        dragging: true,
        // @section Panning Inertia Options
        // @option inertia: Boolean = *
        // If enabled, panning of the map will have an inertia effect where
        // the map builds momentum while dragging and continues moving in
        // the same direction for some time. Feels especially nice on touch
        // devices. Enabled by default.
        inertia: true,
        // @option inertiaDeceleration: Number = 3000
        // The rate with which the inertial movement slows down, in pixels/second².
        inertiaDeceleration: 3400,
        // px/s^2
        // @option inertiaMaxSpeed: Number = Infinity
        // Max speed of the inertial movement, in pixels/second.
        inertiaMaxSpeed: Infinity,
        // px/s
        // @option easeLinearity: Number = 0.2
        easeLinearity: 0.2,
        // TODO refactor, move to CRS
        // @option worldCopyJump: Boolean = false
        // With this option enabled, the map tracks when you pan to another "copy"
        // of the world and seamlessly jumps to the original one so that all overlays
        // like markers and vector layers are still visible.
        worldCopyJump: false,
        // @option maxBoundsViscosity: Number = 0.0
        // If `maxBounds` is set, this option will control how solid the bounds
        // are when dragging the map around. The default value of `0.0` allows the
        // user to drag outside the bounds at normal speed, higher values will
        // slow down map dragging outside bounds, and `1.0` makes the bounds fully
        // solid, preventing the user from dragging outside the bounds.
        maxBoundsViscosity: 0
      });
      var Drag = Handler.extend({
        addHooks: function() {
          if (!this._draggable) {
            var map3 = this._map;
            this._draggable = new Draggable(map3._mapPane, map3._container);
            this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this);
            this._draggable.on("predrag", this._onPreDragLimit, this);
            if (map3.options.worldCopyJump) {
              this._draggable.on("predrag", this._onPreDragWrap, this);
              map3.on("zoomend", this._onZoomEnd, this);
              map3.whenReady(this._onZoomEnd, this);
            }
          }
          addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
          this._draggable.enable();
          this._positions = [];
          this._times = [];
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-grab");
          removeClass(this._map._container, "leaflet-touch-drag");
          this._draggable.disable();
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        moving: function() {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function() {
          var map3 = this._map;
          map3._stop();
          if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var bounds = toLatLngBounds(this._map.options.maxBounds);
            this._offsetLimit = toBounds(
              this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            );
            this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
          } else {
            this._offsetLimit = null;
          }
          map3.fire("movestart").fire("dragstart");
          if (map3.options.inertia) {
            this._positions = [];
            this._times = [];
          }
        },
        _onDrag: function(e) {
          if (this._map.options.inertia) {
            var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(pos);
            this._times.push(time);
            this._prunePositions(time);
          }
          this._map.fire("move", e).fire("drag", e);
        },
        _prunePositions: function(time) {
          while (this._positions.length > 1 && time - this._times[0] > 50) {
            this._positions.shift();
            this._times.shift();
          }
        },
        _onZoomEnd: function() {
          var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
          this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(value, threshold) {
          return value - (value - threshold) * this._viscosity;
        },
        _onPreDragLimit: function() {
          if (!this._viscosity || !this._offsetLimit) {
            return;
          }
          var offset = this._draggable._newPos.subtract(this._draggable._startPos);
          var limit = this._offsetLimit;
          if (offset.x < limit.min.x) {
            offset.x = this._viscousLimit(offset.x, limit.min.x);
          }
          if (offset.y < limit.min.y) {
            offset.y = this._viscousLimit(offset.y, limit.min.y);
          }
          if (offset.x > limit.max.x) {
            offset.x = this._viscousLimit(offset.x, limit.max.x);
          }
          if (offset.y > limit.max.y) {
            offset.y = this._viscousLimit(offset.y, limit.max.y);
          }
          this._draggable._newPos = this._draggable._startPos.add(offset);
        },
        _onPreDragWrap: function() {
          var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x = this._draggable._newPos.x, newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
          this._draggable._absPos = this._draggable._newPos.clone();
          this._draggable._newPos.x = newX;
        },
        _onDragEnd: function(e) {
          var map3 = this._map, options = map3.options, noInertia = !options.inertia || e.noInertia || this._times.length < 2;
          map3.fire("dragend", e);
          if (noInertia) {
            map3.fire("moveend");
          } else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
            if (!offset.x && !offset.y) {
              map3.fire("moveend");
            } else {
              offset = map3._limitOffset(offset, map3.options.maxBounds);
              requestAnimFrame(function() {
                map3.panBy(offset, {
                  duration: decelerationDuration,
                  easeLinearity: ease,
                  noMoveStart: true,
                  animate: true
                });
              });
            }
          }
        }
      });
      Map2.addInitHook("addHandler", "dragging", Drag);
      Map2.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: true,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var Keyboard = Handler.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
        },
        initialize: function(map3) {
          this._map = map3;
          this._setPanDelta(map3.options.keyboardPanDelta);
          this._setZoomDelta(map3.options.zoomDelta);
        },
        addHooks: function() {
          var container = this._map._container;
          if (container.tabIndex <= 0) {
            container.tabIndex = "0";
          }
          on(container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks();
          off(this._map._container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.off({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        _onMouseDown: function() {
          if (this._focused) {
            return;
          }
          var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
          this._map._container.focus();
          window.scrollTo(left, top);
        },
        _onFocus: function() {
          this._focused = true;
          this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = false;
          this._map.fire("blur");
        },
        _setPanDelta: function(panDelta) {
          var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
          for (i = 0, len = codes.left.length; i < len; i++) {
            keys[codes.left[i]] = [-1 * panDelta, 0];
          }
          for (i = 0, len = codes.right.length; i < len; i++) {
            keys[codes.right[i]] = [panDelta, 0];
          }
          for (i = 0, len = codes.down.length; i < len; i++) {
            keys[codes.down[i]] = [0, panDelta];
          }
          for (i = 0, len = codes.up.length; i < len; i++) {
            keys[codes.up[i]] = [0, -1 * panDelta];
          }
        },
        _setZoomDelta: function(zoomDelta) {
          var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
          for (i = 0, len = codes.zoomIn.length; i < len; i++) {
            keys[codes.zoomIn[i]] = zoomDelta;
          }
          for (i = 0, len = codes.zoomOut.length; i < len; i++) {
            keys[codes.zoomOut[i]] = -zoomDelta;
          }
        },
        _addHooks: function() {
          on(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          off(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(e) {
          if (e.altKey || e.ctrlKey || e.metaKey) {
            return;
          }
          var key = e.keyCode, map3 = this._map, offset;
          if (key in this._panKeys) {
            if (!map3._panAnim || !map3._panAnim._inProgress) {
              offset = this._panKeys[key];
              if (e.shiftKey) {
                offset = toPoint(offset).multiplyBy(3);
              }
              if (map3.options.maxBounds) {
                offset = map3._limitOffset(toPoint(offset), map3.options.maxBounds);
              }
              if (map3.options.worldCopyJump) {
                var newLatLng = map3.wrapLatLng(map3.unproject(map3.project(map3.getCenter()).add(offset)));
                map3.panTo(newLatLng);
              } else {
                map3.panBy(offset);
              }
            }
          } else if (key in this._zoomKeys) {
            map3.setZoom(map3.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
          } else if (key === 27 && map3._popup && map3._popup.options.closeOnEscapeKey) {
            map3.closePopup();
          } else {
            return;
          }
          stop(e);
        }
      });
      Map2.addInitHook("addHandler", "keyboard", Keyboard);
      Map2.mergeOptions({
        // @section Mouse wheel options
        // @option scrollWheelZoom: Boolean|String = true
        // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
        // it will zoom to the center of the view regardless of where the mouse was.
        scrollWheelZoom: true,
        // @option wheelDebounceTime: Number = 40
        // Limits the rate at which a wheel can fire (in milliseconds). By default
        // user can't zoom via wheel more often than once per 40 ms.
        wheelDebounceTime: 40,
        // @option wheelPxPerZoomLevel: Number = 60
        // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
        // mean a change of one full zoom level. Smaller values will make wheel-zooming
        // faster (and vice versa).
        wheelPxPerZoomLevel: 60
      });
      var ScrollWheelZoom = Handler.extend({
        addHooks: function() {
          on(this._map._container, "wheel", this._onWheelScroll, this);
          this._delta = 0;
        },
        removeHooks: function() {
          off(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(e) {
          var delta = getWheelDelta(e);
          var debounce = this._map.options.wheelDebounceTime;
          this._delta += delta;
          this._lastMousePos = this._map.mouseEventToContainerPoint(e);
          if (!this._startTime) {
            this._startTime = +/* @__PURE__ */ new Date();
          }
          var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer);
          this._timer = setTimeout(bind(this._performZoom, this), left);
          stop(e);
        },
        _performZoom: function() {
          var map3 = this._map, zoom2 = map3.getZoom(), snap = this._map.options.zoomSnap || 0;
          map3._stop();
          var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map3._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
          this._delta = 0;
          this._startTime = null;
          if (!delta) {
            return;
          }
          if (map3.options.scrollWheelZoom === "center") {
            map3.setZoom(zoom2 + delta);
          } else {
            map3.setZoomAround(this._lastMousePos, zoom2 + delta);
          }
        }
      });
      Map2.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
      var tapHoldDelay = 600;
      Map2.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var TapHold = Handler.extend({
        addHooks: function() {
          on(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          off(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(e) {
          clearTimeout(this._holdTimeout);
          if (e.touches.length !== 1) {
            return;
          }
          var first = e.touches[0];
          this._startPos = this._newPos = new Point(first.clientX, first.clientY);
          this._holdTimeout = setTimeout(bind(function() {
            this._cancel();
            if (!this._isTapValid()) {
              return;
            }
            on(document, "touchend", preventDefault);
            on(document, "touchend touchcancel", this._cancelClickPrevent);
            this._simulateEvent("contextmenu", first);
          }, this), tapHoldDelay);
          on(document, "touchend touchcancel contextmenu", this._cancel, this);
          on(document, "touchmove", this._onMove, this);
        },
        _cancelClickPrevent: function cancelClickPrevent() {
          off(document, "touchend", preventDefault);
          off(document, "touchend touchcancel", cancelClickPrevent);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout);
          off(document, "touchend touchcancel contextmenu", this._cancel, this);
          off(document, "touchmove", this._onMove, this);
        },
        _onMove: function(e) {
          var first = e.touches[0];
          this._newPos = new Point(first.clientX, first.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(type, e) {
          var simulatedEvent = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            // detail: 1,
            screenX: e.screenX,
            screenY: e.screenY,
            clientX: e.clientX,
            clientY: e.clientY
            // button: 2,
            // buttons: 2
          });
          simulatedEvent._simulated = true;
          e.target.dispatchEvent(simulatedEvent);
        }
      });
      Map2.addInitHook("addHandler", "tapHold", TapHold);
      Map2.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: Browser.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: true
      });
      var TouchZoom = Handler.extend({
        addHooks: function() {
          addClass(this._map._container, "leaflet-touch-zoom");
          on(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-touch-zoom");
          off(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(e) {
          var map3 = this._map;
          if (!e.touches || e.touches.length !== 2 || map3._animatingZoom || this._zooming) {
            return;
          }
          var p1 = map3.mouseEventToContainerPoint(e.touches[0]), p2 = map3.mouseEventToContainerPoint(e.touches[1]);
          this._centerPoint = map3.getSize()._divideBy(2);
          this._startLatLng = map3.containerPointToLatLng(this._centerPoint);
          if (map3.options.touchZoom !== "center") {
            this._pinchStartLatLng = map3.containerPointToLatLng(p1.add(p2)._divideBy(2));
          }
          this._startDist = p1.distanceTo(p2);
          this._startZoom = map3.getZoom();
          this._moved = false;
          this._zooming = true;
          map3._stop();
          on(document, "touchmove", this._onTouchMove, this);
          on(document, "touchend touchcancel", this._onTouchEnd, this);
          preventDefault(e);
        },
        _onTouchMove: function(e) {
          if (!e.touches || e.touches.length !== 2 || !this._zooming) {
            return;
          }
          var map3 = this._map, p1 = map3.mouseEventToContainerPoint(e.touches[0]), p2 = map3.mouseEventToContainerPoint(e.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
          this._zoom = map3.getScaleZoom(scale2, this._startZoom);
          if (!map3.options.bounceAtZoomLimits && (this._zoom < map3.getMinZoom() && scale2 < 1 || this._zoom > map3.getMaxZoom() && scale2 > 1)) {
            this._zoom = map3._limitZoom(this._zoom);
          }
          if (map3.options.touchZoom === "center") {
            this._center = this._startLatLng;
            if (scale2 === 1) {
              return;
            }
          } else {
            var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
            if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
              return;
            }
            this._center = map3.unproject(map3.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
          }
          if (!this._moved) {
            map3._moveStart(true, false);
            this._moved = true;
          }
          cancelAnimFrame(this._animRequest);
          var moveFn = bind(map3._move, map3, this._center, this._zoom, { pinch: true, round: false }, void 0);
          this._animRequest = requestAnimFrame(moveFn, this, true);
          preventDefault(e);
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = false;
            return;
          }
          this._zooming = false;
          cancelAnimFrame(this._animRequest);
          off(document, "touchmove", this._onTouchMove, this);
          off(document, "touchend touchcancel", this._onTouchEnd, this);
          if (this._map.options.zoomAnimation) {
            this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
          } else {
            this._map._resetView(this._center, this._map._limitZoom(this._zoom));
          }
        }
      });
      Map2.addInitHook("addHandler", "touchZoom", TouchZoom);
      Map2.BoxZoom = BoxZoom;
      Map2.DoubleClickZoom = DoubleClickZoom;
      Map2.Drag = Drag;
      Map2.Keyboard = Keyboard;
      Map2.ScrollWheelZoom = ScrollWheelZoom;
      Map2.TapHold = TapHold;
      Map2.TouchZoom = TouchZoom;
      exports2.Bounds = Bounds;
      exports2.Browser = Browser;
      exports2.CRS = CRS;
      exports2.Canvas = Canvas;
      exports2.Circle = Circle;
      exports2.CircleMarker = CircleMarker;
      exports2.Class = Class;
      exports2.Control = Control;
      exports2.DivIcon = DivIcon;
      exports2.DivOverlay = DivOverlay;
      exports2.DomEvent = DomEvent;
      exports2.DomUtil = DomUtil;
      exports2.Draggable = Draggable;
      exports2.Evented = Evented;
      exports2.FeatureGroup = FeatureGroup2;
      exports2.GeoJSON = GeoJSON;
      exports2.GridLayer = GridLayer;
      exports2.Handler = Handler;
      exports2.Icon = Icon;
      exports2.ImageOverlay = ImageOverlay;
      exports2.LatLng = LatLng2;
      exports2.LatLngBounds = LatLngBounds;
      exports2.Layer = Layer;
      exports2.LayerGroup = LayerGroup;
      exports2.LineUtil = LineUtil;
      exports2.Map = Map2;
      exports2.Marker = Marker;
      exports2.Mixin = Mixin;
      exports2.Path = Path;
      exports2.Point = Point;
      exports2.PolyUtil = PolyUtil;
      exports2.Polygon = Polygon;
      exports2.Polyline = Polyline;
      exports2.Popup = Popup;
      exports2.PosAnimation = PosAnimation;
      exports2.Projection = index;
      exports2.Rectangle = Rectangle;
      exports2.Renderer = Renderer;
      exports2.SVG = SVG;
      exports2.SVGOverlay = SVGOverlay;
      exports2.TileLayer = TileLayer;
      exports2.Tooltip = Tooltip;
      exports2.Transformation = Transformation;
      exports2.Util = Util;
      exports2.VideoOverlay = VideoOverlay;
      exports2.bind = bind;
      exports2.bounds = toBounds;
      exports2.canvas = canvas;
      exports2.circle = circle2;
      exports2.circleMarker = circleMarker2;
      exports2.control = control;
      exports2.divIcon = divIcon2;
      exports2.extend = extend;
      exports2.featureGroup = featureGroup;
      exports2.geoJSON = geoJSON2;
      exports2.geoJson = geoJson;
      exports2.gridLayer = gridLayer;
      exports2.icon = icon;
      exports2.imageOverlay = imageOverlay;
      exports2.latLng = toLatLng;
      exports2.latLngBounds = toLatLngBounds;
      exports2.layerGroup = layerGroup;
      exports2.map = createMap;
      exports2.marker = marker2;
      exports2.point = toPoint;
      exports2.polygon = polygon;
      exports2.polyline = polyline;
      exports2.popup = popup;
      exports2.rectangle = rectangle;
      exports2.setOptions = setOptions;
      exports2.stamp = stamp;
      exports2.svg = svg;
      exports2.svgOverlay = svgOverlay;
      exports2.tileLayer = tileLayer2;
      exports2.tooltip = tooltip;
      exports2.transformation = toTransformation;
      exports2.version = version;
      exports2.videoOverlay = videoOverlay;
      var oldL = window.L;
      exports2.noConflict = function() {
        window.L = oldL;
        return this;
      };
      window.L = exports2;
    });
  }
});

// resources/js/index.js
var LF = __toESM(require_leaflet_src(), 1);

// node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js
L.Control.Fullscreen = L.Control.extend({
  options: {
    position: "topleft",
    title: {
      "false": "View Fullscreen",
      "true": "Exit Fullscreen"
    }
  },
  onAdd: function(map3) {
    var container = L.DomUtil.create("div", "leaflet-control-fullscreen leaflet-bar leaflet-control");
    this.link = L.DomUtil.create("a", "leaflet-control-fullscreen-button leaflet-bar-part", container);
    this.link.href = "#";
    this._map = map3;
    this._map.on("fullscreenchange", this._toggleTitle, this);
    this._toggleTitle();
    L.DomEvent.on(this.link, "click", this._click, this);
    return container;
  },
  _click: function(e) {
    L.DomEvent.stopPropagation(e);
    L.DomEvent.preventDefault(e);
    this._map.toggleFullscreen(this.options);
  },
  _toggleTitle: function() {
    this.link.title = this.options.title[this._map.isFullscreen()];
  }
});
L.Map.include({
  isFullscreen: function() {
    return this._isFullscreen || false;
  },
  toggleFullscreen: function(options) {
    var container = this.getContainer();
    if (this.isFullscreen()) {
      if (options && options.pseudoFullscreen) {
        this._disablePseudoFullscreen(container);
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else {
        this._disablePseudoFullscreen(container);
      }
    } else {
      if (options && options.pseudoFullscreen) {
        this._enablePseudoFullscreen(container);
      } else if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else {
        this._enablePseudoFullscreen(container);
      }
    }
  },
  _enablePseudoFullscreen: function(container) {
    L.DomUtil.addClass(container, "leaflet-pseudo-fullscreen");
    this._setFullscreen(true);
    this.fire("fullscreenchange");
  },
  _disablePseudoFullscreen: function(container) {
    L.DomUtil.removeClass(container, "leaflet-pseudo-fullscreen");
    this._setFullscreen(false);
    this.fire("fullscreenchange");
  },
  _setFullscreen: function(fullscreen) {
    this._isFullscreen = fullscreen;
    var container = this.getContainer();
    if (fullscreen) {
      L.DomUtil.addClass(container, "leaflet-fullscreen-on");
    } else {
      L.DomUtil.removeClass(container, "leaflet-fullscreen-on");
    }
    this.invalidateSize();
  },
  _onFullscreenChange: function(e) {
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    if (fullscreenElement === this.getContainer() && !this._isFullscreen) {
      this._setFullscreen(true);
      this.fire("fullscreenchange");
    } else if (fullscreenElement !== this.getContainer() && this._isFullscreen) {
      this._setFullscreen(false);
      this.fire("fullscreenchange");
    }
  }
});
L.Map.mergeOptions({
  fullscreenControl: false
});
L.Map.addInitHook(function() {
  if (this.options.fullscreenControl) {
    this.fullscreenControl = new L.Control.Fullscreen(this.options.fullscreenControl);
    this.addControl(this.fullscreenControl);
  }
  var fullscreenchange;
  if ("onfullscreenchange" in document) {
    fullscreenchange = "fullscreenchange";
  } else if ("onmozfullscreenchange" in document) {
    fullscreenchange = "mozfullscreenchange";
  } else if ("onwebkitfullscreenchange" in document) {
    fullscreenchange = "webkitfullscreenchange";
  } else if ("onmsfullscreenchange" in document) {
    fullscreenchange = "MSFullscreenChange";
  }
  if (fullscreenchange) {
    var onFullscreenChange = L.bind(this._onFullscreenChange, this);
    this.whenReady(function() {
      L.DomEvent.on(document, fullscreenchange, onFullscreenChange);
    });
    this.on("unload", function() {
      L.DomEvent.off(document, fullscreenchange, onFullscreenChange);
    });
  }
});
L.control.fullscreen = function(options) {
  return new L.Control.Fullscreen(options);
};

// node_modules/@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.js
(() => {
  var _a2, _b;
  var Wl = Object.create;
  var lr = Object.defineProperty;
  var Ql = Object.getOwnPropertyDescriptor;
  var th = Object.getOwnPropertyNames;
  var eh = Object.getPrototypeOf, ih = Object.prototype.hasOwnProperty;
  var S = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
  var rh = (t, e, i, r) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let n of th(e))
        !ih.call(t, n) && n !== i && lr(t, n, { get: () => e[n], enumerable: !(r = Ql(e, n)) || r.enumerable });
    return t;
  };
  var xt = (t, e, i) => (i = t != null ? Wl(eh(t)) : {}, rh(e || !t || !t.__esModule ? lr(i, "default", { value: t, enumerable: true }) : i, t));
  var cr = S((w_, ur) => {
    function sh() {
      this.__data__ = [], this.size = 0;
    }
    ur.exports = sh;
  });
  var he = S((C_, pr) => {
    function ah(t, e) {
      return t === e || t !== t && e !== e;
    }
    pr.exports = ah;
  });
  var ue = S((E_, fr) => {
    var oh = he();
    function lh(t, e) {
      for (var i = t.length; i--; )
        if (oh(t[i][0], e))
          return i;
      return -1;
    }
    fr.exports = lh;
  });
  var gr = S((P_, dr) => {
    var hh = ue(), uh = Array.prototype, ch = uh.splice;
    function ph(t) {
      var e = this.__data__, i = hh(e, t);
      if (i < 0)
        return false;
      var r = e.length - 1;
      return i == r ? e.pop() : ch.call(e, i, 1), --this.size, true;
    }
    dr.exports = ph;
  });
  var _r = S((S_, mr) => {
    var fh = ue();
    function dh(t) {
      var e = this.__data__, i = fh(e, t);
      return i < 0 ? void 0 : e[i][1];
    }
    mr.exports = dh;
  });
  var Lr = S((B_, yr) => {
    var gh = ue();
    function mh(t) {
      return gh(this.__data__, t) > -1;
    }
    yr.exports = mh;
  });
  var vr = S((T_, br) => {
    var _h = ue();
    function yh(t, e) {
      var i = this.__data__, r = _h(i, t);
      return r < 0 ? (++this.size, i.push([t, e])) : i[r][1] = e, this;
    }
    br.exports = yh;
  });
  var ce = S((R_, kr) => {
    var Lh = cr(), bh = gr(), vh = _r(), kh = Lr(), Mh = vr();
    function Kt(t) {
      var e = -1, i = t == null ? 0 : t.length;
      for (this.clear(); ++e < i; ) {
        var r = t[e];
        this.set(r[0], r[1]);
      }
    }
    Kt.prototype.clear = Lh;
    Kt.prototype.delete = bh;
    Kt.prototype.get = vh;
    Kt.prototype.has = kh;
    Kt.prototype.set = Mh;
    kr.exports = Kt;
  });
  var xr = S((D_, Mr) => {
    var xh = ce();
    function wh() {
      this.__data__ = new xh(), this.size = 0;
    }
    Mr.exports = wh;
  });
  var Cr = S((O_, wr) => {
    function Ch(t) {
      var e = this.__data__, i = e.delete(t);
      return this.size = e.size, i;
    }
    wr.exports = Ch;
  });
  var Pr = S((A_, Er) => {
    function Eh(t) {
      return this.__data__.get(t);
    }
    Er.exports = Eh;
  });
  var Br = S((I_, Sr) => {
    function Ph(t) {
      return this.__data__.has(t);
    }
    Sr.exports = Ph;
  });
  var oi = S((G_, Tr) => {
    var Sh = typeof global == "object" && global && global.Object === Object && global;
    Tr.exports = Sh;
  });
  var Gt = S((q_, Rr) => {
    var Bh = oi(), Th = typeof self == "object" && self && self.Object === Object && self, Rh = Bh || Th || Function("return this")();
    Rr.exports = Rh;
  });
  var Oe = S((N_, Dr) => {
    var Dh = Gt(), Oh = Dh.Symbol;
    Dr.exports = Oh;
  });
  var Gr = S((z_, Ir) => {
    var Or = Oe(), Ar = Object.prototype, Ah = Ar.hasOwnProperty, Ih = Ar.toString, pe = Or ? Or.toStringTag : void 0;
    function Gh(t) {
      var e = Ah.call(t, pe), i = t[pe];
      try {
        t[pe] = void 0;
        var r = true;
      } catch {
      }
      var n = Ih.call(t);
      return r && (e ? t[pe] = i : delete t[pe]), n;
    }
    Ir.exports = Gh;
  });
  var Nr = S((F_, qr) => {
    var qh = Object.prototype, Nh = qh.toString;
    function zh(t) {
      return Nh.call(t);
    }
    qr.exports = zh;
  });
  var Ht = S((V_, Vr) => {
    var zr = Oe(), Fh = Gr(), Vh = Nr(), Uh = "[object Null]", jh = "[object Undefined]", Fr = zr ? zr.toStringTag : void 0;
    function Kh(t) {
      return t == null ? t === void 0 ? jh : Uh : Fr && Fr in Object(t) ? Fh(t) : Vh(t);
    }
    Vr.exports = Kh;
  });
  var Bt = S((U_, Ur) => {
    function Hh(t) {
      var e = typeof t;
      return t != null && (e == "object" || e == "function");
    }
    Ur.exports = Hh;
  });
  var Ae = S((j_, jr) => {
    var Xh = Ht(), Yh = Bt(), Jh = "[object AsyncFunction]", $h = "[object Function]", Zh = "[object GeneratorFunction]", Wh = "[object Proxy]";
    function Qh(t) {
      if (!Yh(t))
        return false;
      var e = Xh(t);
      return e == $h || e == Zh || e == Jh || e == Wh;
    }
    jr.exports = Qh;
  });
  var Hr = S((K_, Kr) => {
    var tu = Gt(), eu = tu["__core-js_shared__"];
    Kr.exports = eu;
  });
  var Jr = S((H_, Yr) => {
    var li = Hr(), Xr = function() {
      var t = /[^.]+$/.exec(li && li.keys && li.keys.IE_PROTO || "");
      return t ? "Symbol(src)_1." + t : "";
    }();
    function iu(t) {
      return !!Xr && Xr in t;
    }
    Yr.exports = iu;
  });
  var Zr = S((X_, $r) => {
    var ru = Function.prototype, nu = ru.toString;
    function su(t) {
      if (t != null) {
        try {
          return nu.call(t);
        } catch {
        }
        try {
          return t + "";
        } catch {
        }
      }
      return "";
    }
    $r.exports = su;
  });
  var Qr = S((Y_, Wr) => {
    var au = Ae(), ou = Jr(), lu = Bt(), hu = Zr(), uu = /[\\^$.*+?()[\]{}|]/g, cu = /^\[object .+?Constructor\]$/, pu = Function.prototype, fu = Object.prototype, du = pu.toString, gu = fu.hasOwnProperty, mu = RegExp("^" + du.call(gu).replace(uu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function _u(t) {
      if (!lu(t) || ou(t))
        return false;
      var e = au(t) ? mu : cu;
      return e.test(hu(t));
    }
    Wr.exports = _u;
  });
  var en = S((J_, tn) => {
    function yu(t, e) {
      return t?.[e];
    }
    tn.exports = yu;
  });
  var Ie = S(($_, rn) => {
    var Lu = Qr(), bu = en();
    function vu(t, e) {
      var i = bu(t, e);
      return Lu(i) ? i : void 0;
    }
    rn.exports = vu;
  });
  var hi = S((Z_, nn) => {
    var ku = Ie(), Mu = Gt(), xu = ku(Mu, "Map");
    nn.exports = xu;
  });
  var fe = S((W_, sn) => {
    var wu = Ie(), Cu = wu(Object, "create");
    sn.exports = Cu;
  });
  var ln = S((Q_, on) => {
    var an = fe();
    function Eu() {
      this.__data__ = an ? an(null) : {}, this.size = 0;
    }
    on.exports = Eu;
  });
  var un = S((ty, hn) => {
    function Pu(t) {
      var e = this.has(t) && delete this.__data__[t];
      return this.size -= e ? 1 : 0, e;
    }
    hn.exports = Pu;
  });
  var pn = S((ey, cn) => {
    var Su = fe(), Bu = "__lodash_hash_undefined__", Tu = Object.prototype, Ru = Tu.hasOwnProperty;
    function Du(t) {
      var e = this.__data__;
      if (Su) {
        var i = e[t];
        return i === Bu ? void 0 : i;
      }
      return Ru.call(e, t) ? e[t] : void 0;
    }
    cn.exports = Du;
  });
  var dn = S((iy, fn) => {
    var Ou = fe(), Au = Object.prototype, Iu = Au.hasOwnProperty;
    function Gu(t) {
      var e = this.__data__;
      return Ou ? e[t] !== void 0 : Iu.call(e, t);
    }
    fn.exports = Gu;
  });
  var mn = S((ry, gn) => {
    var qu = fe(), Nu = "__lodash_hash_undefined__";
    function zu(t, e) {
      var i = this.__data__;
      return this.size += this.has(t) ? 0 : 1, i[t] = qu && e === void 0 ? Nu : e, this;
    }
    gn.exports = zu;
  });
  var yn = S((ny, _n) => {
    var Fu = ln(), Vu = un(), Uu = pn(), ju = dn(), Ku = mn();
    function Xt(t) {
      var e = -1, i = t == null ? 0 : t.length;
      for (this.clear(); ++e < i; ) {
        var r = t[e];
        this.set(r[0], r[1]);
      }
    }
    Xt.prototype.clear = Fu;
    Xt.prototype.delete = Vu;
    Xt.prototype.get = Uu;
    Xt.prototype.has = ju;
    Xt.prototype.set = Ku;
    _n.exports = Xt;
  });
  var vn = S((sy, bn) => {
    var Ln = yn(), Hu = ce(), Xu = hi();
    function Yu() {
      this.size = 0, this.__data__ = { hash: new Ln(), map: new (Xu || Hu)(), string: new Ln() };
    }
    bn.exports = Yu;
  });
  var Mn = S((ay, kn) => {
    function Ju(t) {
      var e = typeof t;
      return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
    }
    kn.exports = Ju;
  });
  var de = S((oy, xn) => {
    var $u = Mn();
    function Zu(t, e) {
      var i = t.__data__;
      return $u(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
    }
    xn.exports = Zu;
  });
  var Cn = S((ly, wn) => {
    var Wu = de();
    function Qu(t) {
      var e = Wu(this, t).delete(t);
      return this.size -= e ? 1 : 0, e;
    }
    wn.exports = Qu;
  });
  var Pn = S((hy, En) => {
    var tc = de();
    function ec(t) {
      return tc(this, t).get(t);
    }
    En.exports = ec;
  });
  var Bn = S((uy, Sn) => {
    var ic = de();
    function rc(t) {
      return ic(this, t).has(t);
    }
    Sn.exports = rc;
  });
  var Rn = S((cy, Tn) => {
    var nc = de();
    function sc(t, e) {
      var i = nc(this, t), r = i.size;
      return i.set(t, e), this.size += i.size == r ? 0 : 1, this;
    }
    Tn.exports = sc;
  });
  var ui = S((py, Dn) => {
    var ac = vn(), oc = Cn(), lc = Pn(), hc = Bn(), uc = Rn();
    function Yt(t) {
      var e = -1, i = t == null ? 0 : t.length;
      for (this.clear(); ++e < i; ) {
        var r = t[e];
        this.set(r[0], r[1]);
      }
    }
    Yt.prototype.clear = ac;
    Yt.prototype.delete = oc;
    Yt.prototype.get = lc;
    Yt.prototype.has = hc;
    Yt.prototype.set = uc;
    Dn.exports = Yt;
  });
  var An = S((fy, On) => {
    var cc = ce(), pc = hi(), fc = ui(), dc = 200;
    function gc(t, e) {
      var i = this.__data__;
      if (i instanceof cc) {
        var r = i.__data__;
        if (!pc || r.length < dc - 1)
          return r.push([t, e]), this.size = ++i.size, this;
        i = this.__data__ = new fc(r);
      }
      return i.set(t, e), this.size = i.size, this;
    }
    On.exports = gc;
  });
  var Gn = S((dy, In) => {
    var mc = ce(), _c = xr(), yc = Cr(), Lc = Pr(), bc = Br(), vc = An();
    function Jt(t) {
      var e = this.__data__ = new mc(t);
      this.size = e.size;
    }
    Jt.prototype.clear = _c;
    Jt.prototype.delete = yc;
    Jt.prototype.get = Lc;
    Jt.prototype.has = bc;
    Jt.prototype.set = vc;
    In.exports = Jt;
  });
  var ci = S((gy, qn) => {
    var kc = Ie(), Mc = function() {
      try {
        var t = kc(Object, "defineProperty");
        return t({}, "", {}), t;
      } catch {
      }
    }();
    qn.exports = Mc;
  });
  var Ge = S((my, zn) => {
    var Nn = ci();
    function xc(t, e, i) {
      e == "__proto__" && Nn ? Nn(t, e, { configurable: true, enumerable: true, value: i, writable: true }) : t[e] = i;
    }
    zn.exports = xc;
  });
  var pi = S((_y, Fn) => {
    var wc = Ge(), Cc = he();
    function Ec(t, e, i) {
      (i !== void 0 && !Cc(t[e], i) || i === void 0 && !(e in t)) && wc(t, e, i);
    }
    Fn.exports = Ec;
  });
  var Un = S((yy, Vn) => {
    function Pc(t) {
      return function(e, i, r) {
        for (var n = -1, s = Object(e), a = r(e), o = a.length; o--; ) {
          var l = a[t ? o : ++n];
          if (i(s[l], l, s) === false)
            break;
        }
        return e;
      };
    }
    Vn.exports = Pc;
  });
  var Kn = S((Ly, jn) => {
    var Sc = Un(), Bc = Sc();
    jn.exports = Bc;
  });
  var $n = S((ge, $t) => {
    var Tc = Gt(), Jn = typeof ge == "object" && ge && !ge.nodeType && ge, Hn = Jn && typeof $t == "object" && $t && !$t.nodeType && $t, Rc = Hn && Hn.exports === Jn, Xn = Rc ? Tc.Buffer : void 0, Yn = Xn ? Xn.allocUnsafe : void 0;
    function Dc(t, e) {
      if (e)
        return t.slice();
      var i = t.length, r = Yn ? Yn(i) : new t.constructor(i);
      return t.copy(r), r;
    }
    $t.exports = Dc;
  });
  var Wn = S((by, Zn) => {
    var Oc = Gt(), Ac = Oc.Uint8Array;
    Zn.exports = Ac;
  });
  var es = S((vy, ts) => {
    var Qn = Wn();
    function Ic(t) {
      var e = new t.constructor(t.byteLength);
      return new Qn(e).set(new Qn(t)), e;
    }
    ts.exports = Ic;
  });
  var rs = S((ky, is) => {
    var Gc = es();
    function qc(t, e) {
      var i = e ? Gc(t.buffer) : t.buffer;
      return new t.constructor(i, t.byteOffset, t.length);
    }
    is.exports = qc;
  });
  var ss = S((My, ns) => {
    function Nc(t, e) {
      var i = -1, r = t.length;
      for (e || (e = Array(r)); ++i < r; )
        e[i] = t[i];
      return e;
    }
    ns.exports = Nc;
  });
  var ls = S((xy, os) => {
    var zc = Bt(), as = Object.create, Fc = /* @__PURE__ */ function() {
      function t() {
      }
      return function(e) {
        if (!zc(e))
          return {};
        if (as)
          return as(e);
        t.prototype = e;
        var i = new t();
        return t.prototype = void 0, i;
      };
    }();
    os.exports = Fc;
  });
  var us = S((wy, hs) => {
    function Vc(t, e) {
      return function(i) {
        return t(e(i));
      };
    }
    hs.exports = Vc;
  });
  var fi = S((Cy, cs) => {
    var Uc = us(), jc = Uc(Object.getPrototypeOf, Object);
    cs.exports = jc;
  });
  var di = S((Ey, ps) => {
    var Kc = Object.prototype;
    function Hc(t) {
      var e = t && t.constructor, i = typeof e == "function" && e.prototype || Kc;
      return t === i;
    }
    ps.exports = Hc;
  });
  var ds = S((Py, fs) => {
    var Xc = ls(), Yc = fi(), Jc = di();
    function $c(t) {
      return typeof t.constructor == "function" && !Jc(t) ? Xc(Yc(t)) : {};
    }
    fs.exports = $c;
  });
  var qt = S((Sy, gs) => {
    function Zc(t) {
      return t != null && typeof t == "object";
    }
    gs.exports = Zc;
  });
  var _s = S((By, ms) => {
    var Wc = Ht(), Qc = qt(), tp = "[object Arguments]";
    function ep(t) {
      return Qc(t) && Wc(t) == tp;
    }
    ms.exports = ep;
  });
  var gi = S((Ty, bs) => {
    var ys = _s(), ip = qt(), Ls = Object.prototype, rp = Ls.hasOwnProperty, np = Ls.propertyIsEnumerable, sp = ys(/* @__PURE__ */ function() {
      return arguments;
    }()) ? ys : function(t) {
      return ip(t) && rp.call(t, "callee") && !np.call(t, "callee");
    };
    bs.exports = sp;
  });
  var Zt = S((Ry, vs) => {
    var ap = Array.isArray;
    vs.exports = ap;
  });
  var mi = S((Dy, ks) => {
    var op = 9007199254740991;
    function lp(t) {
      return typeof t == "number" && t > -1 && t % 1 == 0 && t <= op;
    }
    ks.exports = lp;
  });
  var qe = S((Oy, Ms) => {
    var hp = Ae(), up = mi();
    function cp(t) {
      return t != null && up(t.length) && !hp(t);
    }
    Ms.exports = cp;
  });
  var ws = S((Ay, xs) => {
    var pp = qe(), fp = qt();
    function dp(t) {
      return fp(t) && pp(t);
    }
    xs.exports = dp;
  });
  var Es = S((Iy, Cs) => {
    function gp() {
      return false;
    }
    Cs.exports = gp;
  });
  var _i = S((me, Wt) => {
    var mp = Gt(), _p = Es(), Bs = typeof me == "object" && me && !me.nodeType && me, Ps = Bs && typeof Wt == "object" && Wt && !Wt.nodeType && Wt, yp = Ps && Ps.exports === Bs, Ss = yp ? mp.Buffer : void 0, Lp = Ss ? Ss.isBuffer : void 0, bp = Lp || _p;
    Wt.exports = bp;
  });
  var Ds = S((Gy, Rs) => {
    var vp = Ht(), kp = fi(), Mp = qt(), xp = "[object Object]", wp = Function.prototype, Cp = Object.prototype, Ts = wp.toString, Ep = Cp.hasOwnProperty, Pp = Ts.call(Object);
    function Sp(t) {
      if (!Mp(t) || vp(t) != xp)
        return false;
      var e = kp(t);
      if (e === null)
        return true;
      var i = Ep.call(e, "constructor") && e.constructor;
      return typeof i == "function" && i instanceof i && Ts.call(i) == Pp;
    }
    Rs.exports = Sp;
  });
  var As = S((qy, Os) => {
    var Bp = Ht(), Tp = mi(), Rp = qt(), Dp = "[object Arguments]", Op = "[object Array]", Ap = "[object Boolean]", Ip = "[object Date]", Gp = "[object Error]", qp = "[object Function]", Np = "[object Map]", zp = "[object Number]", Fp = "[object Object]", Vp = "[object RegExp]", Up = "[object Set]", jp = "[object String]", Kp = "[object WeakMap]", Hp = "[object ArrayBuffer]", Xp = "[object DataView]", Yp = "[object Float32Array]", Jp = "[object Float64Array]", $p = "[object Int8Array]", Zp = "[object Int16Array]", Wp = "[object Int32Array]", Qp = "[object Uint8Array]", tf = "[object Uint8ClampedArray]", ef = "[object Uint16Array]", rf = "[object Uint32Array]", Y = {};
    Y[Yp] = Y[Jp] = Y[$p] = Y[Zp] = Y[Wp] = Y[Qp] = Y[tf] = Y[ef] = Y[rf] = true;
    Y[Dp] = Y[Op] = Y[Hp] = Y[Ap] = Y[Xp] = Y[Ip] = Y[Gp] = Y[qp] = Y[Np] = Y[zp] = Y[Fp] = Y[Vp] = Y[Up] = Y[jp] = Y[Kp] = false;
    function nf(t) {
      return Rp(t) && Tp(t.length) && !!Y[Bp(t)];
    }
    Os.exports = nf;
  });
  var Gs = S((Ny, Is) => {
    function sf(t) {
      return function(e) {
        return t(e);
      };
    }
    Is.exports = sf;
  });
  var Ns = S((_e, Qt) => {
    var af = oi(), qs = typeof _e == "object" && _e && !_e.nodeType && _e, ye = qs && typeof Qt == "object" && Qt && !Qt.nodeType && Qt, of = ye && ye.exports === qs, yi = of && af.process, lf = function() {
      try {
        var t = ye && ye.require && ye.require("util").types;
        return t || yi && yi.binding && yi.binding("util");
      } catch {
      }
    }();
    Qt.exports = lf;
  });
  var Li = S((zy, Vs) => {
    var hf = As(), uf = Gs(), zs = Ns(), Fs = zs && zs.isTypedArray, cf = Fs ? uf(Fs) : hf;
    Vs.exports = cf;
  });
  var bi = S((Fy, Us) => {
    function pf(t, e) {
      if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
        return t[e];
    }
    Us.exports = pf;
  });
  var Ks = S((Vy, js) => {
    var ff = Ge(), df = he(), gf = Object.prototype, mf = gf.hasOwnProperty;
    function _f(t, e, i) {
      var r = t[e];
      (!(mf.call(t, e) && df(r, i)) || i === void 0 && !(e in t)) && ff(t, e, i);
    }
    js.exports = _f;
  });
  var Xs = S((Uy, Hs) => {
    var yf = Ks(), Lf = Ge();
    function bf(t, e, i, r) {
      var n = !i;
      i || (i = {});
      for (var s = -1, a = e.length; ++s < a; ) {
        var o = e[s], l = r ? r(i[o], t[o], o, i, t) : void 0;
        l === void 0 && (l = t[o]), n ? Lf(i, o, l) : yf(i, o, l);
      }
      return i;
    }
    Hs.exports = bf;
  });
  var Js = S((jy, Ys) => {
    function vf(t, e) {
      for (var i = -1, r = Array(t); ++i < t; )
        r[i] = e(i);
      return r;
    }
    Ys.exports = vf;
  });
  var vi = S((Ky, $s) => {
    var kf = 9007199254740991, Mf = /^(?:0|[1-9]\d*)$/;
    function xf(t, e) {
      var i = typeof t;
      return e = e ?? kf, !!e && (i == "number" || i != "symbol" && Mf.test(t)) && t > -1 && t % 1 == 0 && t < e;
    }
    $s.exports = xf;
  });
  var Ws = S((Hy, Zs) => {
    var wf = Js(), Cf = gi(), Ef = Zt(), Pf = _i(), Sf = vi(), Bf = Li(), Tf = Object.prototype, Rf = Tf.hasOwnProperty;
    function Df(t, e) {
      var i = Ef(t), r = !i && Cf(t), n = !i && !r && Pf(t), s = !i && !r && !n && Bf(t), a = i || r || n || s, o = a ? wf(t.length, String) : [], l = o.length;
      for (var u in t)
        (e || Rf.call(t, u)) && !(a && (u == "length" || n && (u == "offset" || u == "parent") || s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || Sf(u, l))) && o.push(u);
      return o;
    }
    Zs.exports = Df;
  });
  var ta = S((Xy, Qs) => {
    function Of(t) {
      var e = [];
      if (t != null)
        for (var i in Object(t))
          e.push(i);
      return e;
    }
    Qs.exports = Of;
  });
  var ia = S((Yy, ea) => {
    var Af = Bt(), If = di(), Gf = ta(), qf = Object.prototype, Nf = qf.hasOwnProperty;
    function zf(t) {
      if (!Af(t))
        return Gf(t);
      var e = If(t), i = [];
      for (var r in t)
        r == "constructor" && (e || !Nf.call(t, r)) || i.push(r);
      return i;
    }
    ea.exports = zf;
  });
  var ki = S((Jy, ra) => {
    var Ff = Ws(), Vf = ia(), Uf = qe();
    function jf(t) {
      return Uf(t) ? Ff(t, true) : Vf(t);
    }
    ra.exports = jf;
  });
  var sa = S(($y, na) => {
    var Kf = Xs(), Hf = ki();
    function Xf(t) {
      return Kf(t, Hf(t));
    }
    na.exports = Xf;
  });
  var ca = S((Zy, ua) => {
    var aa = pi(), Yf = $n(), Jf = rs(), $f = ss(), Zf = ds(), oa = gi(), la = Zt(), Wf = ws(), Qf = _i(), td = Ae(), ed = Bt(), id = Ds(), rd = Li(), ha = bi(), nd = sa();
    function sd(t, e, i, r, n, s, a) {
      var o = ha(t, i), l = ha(e, i), u = a.get(l);
      if (u) {
        aa(t, i, u);
        return;
      }
      var f = s ? s(o, l, i + "", t, e, a) : void 0, d = f === void 0;
      if (d) {
        var P = la(l), E = !P && Qf(l), T = !P && !E && rd(l);
        f = l, P || E || T ? la(o) ? f = o : Wf(o) ? f = $f(o) : E ? (d = false, f = Yf(l, true)) : T ? (d = false, f = Jf(l, true)) : f = [] : id(l) || oa(l) ? (f = o, oa(o) ? f = nd(o) : (!ed(o) || td(o)) && (f = Zf(l))) : d = false;
      }
      d && (a.set(l, f), n(f, l, r, s, a), a.delete(l)), aa(t, i, f);
    }
    ua.exports = sd;
  });
  var da = S((Wy, fa) => {
    var ad = Gn(), od = pi(), ld = Kn(), hd = ca(), ud = Bt(), cd = ki(), pd = bi();
    function pa(t, e, i, r, n) {
      t !== e && ld(e, function(s, a) {
        if (n || (n = new ad()), ud(s))
          hd(t, e, a, i, pa, r, n);
        else {
          var o = r ? r(pd(t, a), s, a + "", t, e, n) : void 0;
          o === void 0 && (o = s), od(t, a, o);
        }
      }, cd);
    }
    fa.exports = pa;
  });
  var Mi = S((Qy, ga) => {
    function fd(t) {
      return t;
    }
    ga.exports = fd;
  });
  var _a = S((tL, ma) => {
    function dd(t, e, i) {
      switch (i.length) {
        case 0:
          return t.call(e);
        case 1:
          return t.call(e, i[0]);
        case 2:
          return t.call(e, i[0], i[1]);
        case 3:
          return t.call(e, i[0], i[1], i[2]);
      }
      return t.apply(e, i);
    }
    ma.exports = dd;
  });
  var ba = S((eL, La) => {
    var gd = _a(), ya = Math.max;
    function md(t, e, i) {
      return e = ya(e === void 0 ? t.length - 1 : e, 0), function() {
        for (var r = arguments, n = -1, s = ya(r.length - e, 0), a = Array(s); ++n < s; )
          a[n] = r[e + n];
        n = -1;
        for (var o = Array(e + 1); ++n < e; )
          o[n] = r[n];
        return o[e] = i(a), gd(t, this, o);
      };
    }
    La.exports = md;
  });
  var ka = S((iL, va) => {
    function _d(t) {
      return function() {
        return t;
      };
    }
    va.exports = _d;
  });
  var wa = S((rL, xa) => {
    var yd = ka(), Ma = ci(), Ld = Mi(), bd = Ma ? function(t, e) {
      return Ma(t, "toString", { configurable: true, enumerable: false, value: yd(e), writable: true });
    } : Ld;
    xa.exports = bd;
  });
  var Ea = S((nL, Ca) => {
    var vd = 800, kd = 16, Md = Date.now;
    function xd(t) {
      var e = 0, i = 0;
      return function() {
        var r = Md(), n = kd - (r - i);
        if (i = r, n > 0) {
          if (++e >= vd)
            return arguments[0];
        } else
          e = 0;
        return t.apply(void 0, arguments);
      };
    }
    Ca.exports = xd;
  });
  var Sa = S((sL, Pa) => {
    var wd = wa(), Cd = Ea(), Ed = Cd(wd);
    Pa.exports = Ed;
  });
  var Ta = S((aL, Ba) => {
    var Pd = Mi(), Sd = ba(), Bd = Sa();
    function Td(t, e) {
      return Bd(Sd(t, e, Pd), t + "");
    }
    Ba.exports = Td;
  });
  var Da = S((oL, Ra) => {
    var Rd = he(), Dd = qe(), Od = vi(), Ad = Bt();
    function Id(t, e, i) {
      if (!Ad(i))
        return false;
      var r = typeof e;
      return (r == "number" ? Dd(i) && Od(e, i.length) : r == "string" && e in i) ? Rd(i[e], t) : false;
    }
    Ra.exports = Id;
  });
  var Aa = S((lL, Oa) => {
    var Gd = Ta(), qd = Da();
    function Nd(t) {
      return Gd(function(e, i) {
        var r = -1, n = i.length, s = n > 1 ? i[n - 1] : void 0, a = n > 2 ? i[2] : void 0;
        for (s = t.length > 3 && typeof s == "function" ? (n--, s) : void 0, a && qd(i[0], i[1], a) && (s = n < 3 ? void 0 : s, n = 1), e = Object(e); ++r < n; ) {
          var o = i[r];
          o && t(e, o, r, s);
        }
        return e;
      });
    }
    Oa.exports = Nd;
  });
  var Ne = S((hL, Ia) => {
    var zd = da(), Fd = Aa(), Vd = Fd(function(t, e, i) {
      zd(t, e, i);
    });
    Ia.exports = Vd;
  });
  var ze = S((_b2, _o) => {
    var kg = Ht(), Mg = qt(), xg = "[object Symbol]";
    function wg(t) {
      return typeof t == "symbol" || Mg(t) && kg(t) == xg;
    }
    _o.exports = wg;
  });
  var Lo = S((yb, yo) => {
    var Cg = Zt(), Eg = ze(), Pg = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Sg = /^\w*$/;
    function Bg(t, e) {
      if (Cg(t))
        return false;
      var i = typeof t;
      return i == "number" || i == "symbol" || i == "boolean" || t == null || Eg(t) ? true : Sg.test(t) || !Pg.test(t) || e != null && t in Object(e);
    }
    yo.exports = Bg;
  });
  var ko = S((Lb, vo) => {
    var bo = ui(), Tg = "Expected a function";
    function xi(t, e) {
      if (typeof t != "function" || e != null && typeof e != "function")
        throw new TypeError(Tg);
      var i = function() {
        var r = arguments, n = e ? e.apply(this, r) : r[0], s = i.cache;
        if (s.has(n))
          return s.get(n);
        var a = t.apply(this, r);
        return i.cache = s.set(n, a) || s, a;
      };
      return i.cache = new (xi.Cache || bo)(), i;
    }
    xi.Cache = bo;
    vo.exports = xi;
  });
  var xo = S((bb, Mo) => {
    var Rg = ko(), Dg = 500;
    function Og(t) {
      var e = Rg(t, function(r) {
        return i.size === Dg && i.clear(), r;
      }), i = e.cache;
      return e;
    }
    Mo.exports = Og;
  });
  var Co = S((vb, wo) => {
    var Ag = xo(), Ig = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Gg = /\\(\\)?/g, qg = Ag(function(t) {
      var e = [];
      return t.charCodeAt(0) === 46 && e.push(""), t.replace(Ig, function(i, r, n, s) {
        e.push(n ? s.replace(Gg, "$1") : r || i);
      }), e;
    });
    wo.exports = qg;
  });
  var Po = S((kb, Eo) => {
    function Ng(t, e) {
      for (var i = -1, r = t == null ? 0 : t.length, n = Array(r); ++i < r; )
        n[i] = e(t[i], i, t);
      return n;
    }
    Eo.exports = Ng;
  });
  var Oo = S((Mb, Do) => {
    var So = Oe(), zg = Po(), Fg = Zt(), Vg = ze(), Ug = 1 / 0, Bo = So ? So.prototype : void 0, To = Bo ? Bo.toString : void 0;
    function Ro(t) {
      if (typeof t == "string")
        return t;
      if (Fg(t))
        return zg(t, Ro) + "";
      if (Vg(t))
        return To ? To.call(t) : "";
      var e = t + "";
      return e == "0" && 1 / t == -Ug ? "-0" : e;
    }
    Do.exports = Ro;
  });
  var Io = S((xb, Ao) => {
    var jg = Oo();
    function Kg(t) {
      return t == null ? "" : jg(t);
    }
    Ao.exports = Kg;
  });
  var qo = S((wb, Go) => {
    var Hg = Zt(), Xg = Lo(), Yg = Co(), Jg = Io();
    function $g(t, e) {
      return Hg(t) ? t : Xg(t, e) ? [t] : Yg(Jg(t));
    }
    Go.exports = $g;
  });
  var zo = S((Cb, No) => {
    var Zg = ze(), Wg = 1 / 0;
    function Qg(t) {
      if (typeof t == "string" || Zg(t))
        return t;
      var e = t + "";
      return e == "0" && 1 / t == -Wg ? "-0" : e;
    }
    No.exports = Qg;
  });
  var Vo = S((Eb, Fo) => {
    var tm = qo(), em = zo();
    function im(t, e) {
      e = tm(e, t);
      for (var i = 0, r = e.length; t != null && i < r; )
        t = t[em(e[i++])];
      return i && i == r ? t : void 0;
    }
    Fo.exports = im;
  });
  var Le = S((Pb, Uo) => {
    var rm = Vo();
    function nm(t, e, i) {
      var r = t == null ? void 0 : rm(t, e);
      return r === void 0 ? i : r;
    }
    Uo.exports = nm;
  });
  var Qo = S((Ti, Ri) => {
    (function(t, e) {
      typeof Ti == "object" && typeof Ri < "u" ? Ri.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = t || self).RBush = e();
    })(Ti, function() {
      "use strict";
      function t(_, x, b, R, D) {
        (function O(A, q, h, c, p) {
          for (; c > h; ) {
            if (c - h > 600) {
              var y = c - h + 1, g = q - h + 1, k = Math.log(y), C = 0.5 * Math.exp(2 * k / 3), m = 0.5 * Math.sqrt(k * C * (y - C) / y) * (g - y / 2 < 0 ? -1 : 1), v = Math.max(h, Math.floor(q - g * C / y + m)), w = Math.min(c, Math.floor(q + (y - g) * C / y + m));
              O(A, q, v, w, p);
            }
            var M = A[q], B = h, I = c;
            for (e(A, h, q), p(A[c], M) > 0 && e(A, h, c); B < I; ) {
              for (e(A, B, I), B++, I--; p(A[B], M) < 0; )
                B++;
              for (; p(A[I], M) > 0; )
                I--;
            }
            p(A[h], M) === 0 ? e(A, h, I) : e(A, ++I, c), I <= q && (h = I + 1), q <= I && (c = I - 1);
          }
        })(_, x, b || 0, R || _.length - 1, D || i);
      }
      function e(_, x, b) {
        var R = _[x];
        _[x] = _[b], _[b] = R;
      }
      function i(_, x) {
        return _ < x ? -1 : _ > x ? 1 : 0;
      }
      var r = function(_) {
        _ === void 0 && (_ = 9), this._maxEntries = Math.max(4, _), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
      };
      function n(_, x, b) {
        if (!b)
          return x.indexOf(_);
        for (var R = 0; R < x.length; R++)
          if (b(_, x[R]))
            return R;
        return -1;
      }
      function s(_, x) {
        a(_, 0, _.children.length, x, _);
      }
      function a(_, x, b, R, D) {
        D || (D = T(null)), D.minX = 1 / 0, D.minY = 1 / 0, D.maxX = -1 / 0, D.maxY = -1 / 0;
        for (var O = x; O < b; O++) {
          var A = _.children[O];
          o(D, _.leaf ? R(A) : A);
        }
        return D;
      }
      function o(_, x) {
        return _.minX = Math.min(_.minX, x.minX), _.minY = Math.min(_.minY, x.minY), _.maxX = Math.max(_.maxX, x.maxX), _.maxY = Math.max(_.maxY, x.maxY), _;
      }
      function l(_, x) {
        return _.minX - x.minX;
      }
      function u(_, x) {
        return _.minY - x.minY;
      }
      function f(_) {
        return (_.maxX - _.minX) * (_.maxY - _.minY);
      }
      function d(_) {
        return _.maxX - _.minX + (_.maxY - _.minY);
      }
      function P(_, x) {
        return _.minX <= x.minX && _.minY <= x.minY && x.maxX <= _.maxX && x.maxY <= _.maxY;
      }
      function E(_, x) {
        return x.minX <= _.maxX && x.minY <= _.maxY && x.maxX >= _.minX && x.maxY >= _.minY;
      }
      function T(_) {
        return { children: _, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }
      function G(_, x, b, R, D) {
        for (var O = [x, b]; O.length; )
          if (!((b = O.pop()) - (x = O.pop()) <= R)) {
            var A = x + Math.ceil((b - x) / R / 2) * R;
            t(_, A, x, b, D), O.push(x, A, A, b);
          }
      }
      return r.prototype.all = function() {
        return this._all(this.data, []);
      }, r.prototype.search = function(_) {
        var x = this.data, b = [];
        if (!E(_, x))
          return b;
        for (var R = this.toBBox, D = []; x; ) {
          for (var O = 0; O < x.children.length; O++) {
            var A = x.children[O], q = x.leaf ? R(A) : A;
            E(_, q) && (x.leaf ? b.push(A) : P(_, q) ? this._all(A, b) : D.push(A));
          }
          x = D.pop();
        }
        return b;
      }, r.prototype.collides = function(_) {
        var x = this.data;
        if (!E(_, x))
          return false;
        for (var b = []; x; ) {
          for (var R = 0; R < x.children.length; R++) {
            var D = x.children[R], O = x.leaf ? this.toBBox(D) : D;
            if (E(_, O)) {
              if (x.leaf || P(_, O))
                return true;
              b.push(D);
            }
          }
          x = b.pop();
        }
        return false;
      }, r.prototype.load = function(_) {
        if (!_ || !_.length)
          return this;
        if (_.length < this._minEntries) {
          for (var x = 0; x < _.length; x++)
            this.insert(_[x]);
          return this;
        }
        var b = this._build(_.slice(), 0, _.length - 1, 0);
        if (this.data.children.length)
          if (this.data.height === b.height)
            this._splitRoot(this.data, b);
          else {
            if (this.data.height < b.height) {
              var R = this.data;
              this.data = b, b = R;
            }
            this._insert(b, this.data.height - b.height - 1, true);
          }
        else
          this.data = b;
        return this;
      }, r.prototype.insert = function(_) {
        return _ && this._insert(_, this.data.height - 1), this;
      }, r.prototype.clear = function() {
        return this.data = T([]), this;
      }, r.prototype.remove = function(_, x) {
        if (!_)
          return this;
        for (var b, R, D, O = this.data, A = this.toBBox(_), q = [], h = []; O || q.length; ) {
          if (O || (O = q.pop(), R = q[q.length - 1], b = h.pop(), D = true), O.leaf) {
            var c = n(_, O.children, x);
            if (c !== -1)
              return O.children.splice(c, 1), q.push(O), this._condense(q), this;
          }
          D || O.leaf || !P(O, A) ? R ? (b++, O = R.children[b], D = false) : O = null : (q.push(O), h.push(b), b = 0, R = O, O = O.children[0]);
        }
        return this;
      }, r.prototype.toBBox = function(_) {
        return _;
      }, r.prototype.compareMinX = function(_, x) {
        return _.minX - x.minX;
      }, r.prototype.compareMinY = function(_, x) {
        return _.minY - x.minY;
      }, r.prototype.toJSON = function() {
        return this.data;
      }, r.prototype.fromJSON = function(_) {
        return this.data = _, this;
      }, r.prototype._all = function(_, x) {
        for (var b = []; _; )
          _.leaf ? x.push.apply(x, _.children) : b.push.apply(b, _.children), _ = b.pop();
        return x;
      }, r.prototype._build = function(_, x, b, R) {
        var D, O = b - x + 1, A = this._maxEntries;
        if (O <= A)
          return s(D = T(_.slice(x, b + 1)), this.toBBox), D;
        R || (R = Math.ceil(Math.log(O) / Math.log(A)), A = Math.ceil(O / Math.pow(A, R - 1))), (D = T([])).leaf = false, D.height = R;
        var q = Math.ceil(O / A), h = q * Math.ceil(Math.sqrt(A));
        G(_, x, b, h, this.compareMinX);
        for (var c = x; c <= b; c += h) {
          var p = Math.min(c + h - 1, b);
          G(_, c, p, q, this.compareMinY);
          for (var y = c; y <= p; y += q) {
            var g = Math.min(y + q - 1, p);
            D.children.push(this._build(_, y, g, R - 1));
          }
        }
        return s(D, this.toBBox), D;
      }, r.prototype._chooseSubtree = function(_, x, b, R) {
        for (; R.push(x), !x.leaf && R.length - 1 !== b; ) {
          for (var D = 1 / 0, O = 1 / 0, A = void 0, q = 0; q < x.children.length; q++) {
            var h = x.children[q], c = f(h), p = (y = _, g = h, (Math.max(g.maxX, y.maxX) - Math.min(g.minX, y.minX)) * (Math.max(g.maxY, y.maxY) - Math.min(g.minY, y.minY)) - c);
            p < O ? (O = p, D = c < D ? c : D, A = h) : p === O && c < D && (D = c, A = h);
          }
          x = A || x.children[0];
        }
        var y, g;
        return x;
      }, r.prototype._insert = function(_, x, b) {
        var R = b ? _ : this.toBBox(_), D = [], O = this._chooseSubtree(R, this.data, x, D);
        for (O.children.push(_), o(O, R); x >= 0 && D[x].children.length > this._maxEntries; )
          this._split(D, x), x--;
        this._adjustParentBBoxes(R, D, x);
      }, r.prototype._split = function(_, x) {
        var b = _[x], R = b.children.length, D = this._minEntries;
        this._chooseSplitAxis(b, D, R);
        var O = this._chooseSplitIndex(b, D, R), A = T(b.children.splice(O, b.children.length - O));
        A.height = b.height, A.leaf = b.leaf, s(b, this.toBBox), s(A, this.toBBox), x ? _[x - 1].children.push(A) : this._splitRoot(b, A);
      }, r.prototype._splitRoot = function(_, x) {
        this.data = T([_, x]), this.data.height = _.height + 1, this.data.leaf = false, s(this.data, this.toBBox);
      }, r.prototype._chooseSplitIndex = function(_, x, b) {
        for (var R, D, O, A, q, h, c, p = 1 / 0, y = 1 / 0, g = x; g <= b - x; g++) {
          var k = a(_, 0, g, this.toBBox), C = a(_, g, b, this.toBBox), m = (D = k, O = C, A = void 0, q = void 0, h = void 0, c = void 0, A = Math.max(D.minX, O.minX), q = Math.max(D.minY, O.minY), h = Math.min(D.maxX, O.maxX), c = Math.min(D.maxY, O.maxY), Math.max(0, h - A) * Math.max(0, c - q)), v = f(k) + f(C);
          m < p ? (p = m, R = g, y = v < y ? v : y) : m === p && v < y && (y = v, R = g);
        }
        return R || b - x;
      }, r.prototype._chooseSplitAxis = function(_, x, b) {
        var R = _.leaf ? this.compareMinX : l, D = _.leaf ? this.compareMinY : u;
        this._allDistMargin(_, x, b, R) < this._allDistMargin(_, x, b, D) && _.children.sort(R);
      }, r.prototype._allDistMargin = function(_, x, b, R) {
        _.children.sort(R);
        for (var D = this.toBBox, O = a(_, 0, x, D), A = a(_, b - x, b, D), q = d(O) + d(A), h = x; h < b - x; h++) {
          var c = _.children[h];
          o(O, _.leaf ? D(c) : c), q += d(O);
        }
        for (var p = b - x - 1; p >= x; p--) {
          var y = _.children[p];
          o(A, _.leaf ? D(y) : y), q += d(A);
        }
        return q;
      }, r.prototype._adjustParentBBoxes = function(_, x, b) {
        for (var R = b; R >= 0; R--)
          o(x[R], _);
      }, r.prototype._condense = function(_) {
        for (var x = _.length - 1, b = void 0; x >= 0; x--)
          _[x].children.length === 0 ? x > 0 ? (b = _[x - 1].children).splice(b.indexOf(_[x]), 1) : this.clear() : s(_[x], this.toBBox);
      }, r;
    });
  });
  var Gi = S((z) => {
    "use strict";
    Object.defineProperty(z, "__esModule", { value: true });
    z.earthRadius = 63710088e-1;
    z.factors = { centimeters: z.earthRadius * 100, centimetres: z.earthRadius * 100, degrees: z.earthRadius / 111325, feet: z.earthRadius * 3.28084, inches: z.earthRadius * 39.37, kilometers: z.earthRadius / 1e3, kilometres: z.earthRadius / 1e3, meters: z.earthRadius, metres: z.earthRadius, miles: z.earthRadius / 1609.344, millimeters: z.earthRadius * 1e3, millimetres: z.earthRadius * 1e3, nauticalmiles: z.earthRadius / 1852, radians: 1, yards: z.earthRadius * 1.0936 };
    z.unitsFactors = { centimeters: 100, centimetres: 100, degrees: 1 / 111325, feet: 3.28084, inches: 39.37, kilometers: 1 / 1e3, kilometres: 1 / 1e3, meters: 1, metres: 1, miles: 1 / 1609.344, millimeters: 1e3, millimetres: 1e3, nauticalmiles: 1 / 1852, radians: 1 / z.earthRadius, yards: 1.0936133 };
    z.areaFactors = { acres: 247105e-9, centimeters: 1e4, centimetres: 1e4, feet: 10.763910417, hectares: 1e-4, inches: 1550.003100006, kilometers: 1e-6, kilometres: 1e-6, meters: 1, metres: 1, miles: 386e-9, millimeters: 1e6, millimetres: 1e6, yards: 1.195990046 };
    function Ot(t, e, i) {
      i === void 0 && (i = {});
      var r = { type: "Feature" };
      return (i.id === 0 || i.id) && (r.id = i.id), i.bbox && (r.bbox = i.bbox), r.properties = e || {}, r.geometry = t, r;
    }
    z.feature = Ot;
    function ym(t, e, i) {
      switch (i === void 0 && (i = {}), t) {
        case "Point":
          return Di(e).geometry;
        case "LineString":
          return Ai(e).geometry;
        case "Polygon":
          return Oi(e).geometry;
        case "MultiPoint":
          return el(e).geometry;
        case "MultiLineString":
          return tl(e).geometry;
        case "MultiPolygon":
          return il(e).geometry;
        default:
          throw new Error(t + " is invalid");
      }
    }
    z.geometry = ym;
    function Di(t, e, i) {
      if (i === void 0 && (i = {}), !t)
        throw new Error("coordinates is required");
      if (!Array.isArray(t))
        throw new Error("coordinates must be an Array");
      if (t.length < 2)
        throw new Error("coordinates must be at least 2 numbers long");
      if (!Ve(t[0]) || !Ve(t[1]))
        throw new Error("coordinates must contain numbers");
      var r = { type: "Point", coordinates: t };
      return Ot(r, e, i);
    }
    z.point = Di;
    function Lm(t, e, i) {
      return i === void 0 && (i = {}), Ue(t.map(function(r) {
        return Di(r, e);
      }), i);
    }
    z.points = Lm;
    function Oi(t, e, i) {
      i === void 0 && (i = {});
      for (var r = 0, n = t; r < n.length; r++) {
        var s = n[r];
        if (s.length < 4)
          throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        for (var a = 0; a < s[s.length - 1].length; a++)
          if (s[s.length - 1][a] !== s[0][a])
            throw new Error("First and last Position are not equivalent.");
      }
      var o = { type: "Polygon", coordinates: t };
      return Ot(o, e, i);
    }
    z.polygon = Oi;
    function bm(t, e, i) {
      return i === void 0 && (i = {}), Ue(t.map(function(r) {
        return Oi(r, e);
      }), i);
    }
    z.polygons = bm;
    function Ai(t, e, i) {
      if (i === void 0 && (i = {}), t.length < 2)
        throw new Error("coordinates must be an array of two or more positions");
      var r = { type: "LineString", coordinates: t };
      return Ot(r, e, i);
    }
    z.lineString = Ai;
    function vm(t, e, i) {
      return i === void 0 && (i = {}), Ue(t.map(function(r) {
        return Ai(r, e);
      }), i);
    }
    z.lineStrings = vm;
    function Ue(t, e) {
      e === void 0 && (e = {});
      var i = { type: "FeatureCollection" };
      return e.id && (i.id = e.id), e.bbox && (i.bbox = e.bbox), i.features = t, i;
    }
    z.featureCollection = Ue;
    function tl(t, e, i) {
      i === void 0 && (i = {});
      var r = { type: "MultiLineString", coordinates: t };
      return Ot(r, e, i);
    }
    z.multiLineString = tl;
    function el(t, e, i) {
      i === void 0 && (i = {});
      var r = { type: "MultiPoint", coordinates: t };
      return Ot(r, e, i);
    }
    z.multiPoint = el;
    function il(t, e, i) {
      i === void 0 && (i = {});
      var r = { type: "MultiPolygon", coordinates: t };
      return Ot(r, e, i);
    }
    z.multiPolygon = il;
    function km(t, e, i) {
      i === void 0 && (i = {});
      var r = { type: "GeometryCollection", geometries: t };
      return Ot(r, e, i);
    }
    z.geometryCollection = km;
    function Mm(t, e) {
      if (e === void 0 && (e = 0), e && !(e >= 0))
        throw new Error("precision must be a positive number");
      var i = Math.pow(10, e || 0);
      return Math.round(t * i) / i;
    }
    z.round = Mm;
    function rl(t, e) {
      e === void 0 && (e = "kilometers");
      var i = z.factors[e];
      if (!i)
        throw new Error(e + " units is invalid");
      return t * i;
    }
    z.radiansToLength = rl;
    function Ii(t, e) {
      e === void 0 && (e = "kilometers");
      var i = z.factors[e];
      if (!i)
        throw new Error(e + " units is invalid");
      return t / i;
    }
    z.lengthToRadians = Ii;
    function xm(t, e) {
      return nl(Ii(t, e));
    }
    z.lengthToDegrees = xm;
    function wm(t) {
      var e = t % 360;
      return e < 0 && (e += 360), e;
    }
    z.bearingToAzimuth = wm;
    function nl(t) {
      var e = t % (2 * Math.PI);
      return e * 180 / Math.PI;
    }
    z.radiansToDegrees = nl;
    function Cm(t) {
      var e = t % 360;
      return e * Math.PI / 180;
    }
    z.degreesToRadians = Cm;
    function Em(t, e, i) {
      if (e === void 0 && (e = "kilometers"), i === void 0 && (i = "kilometers"), !(t >= 0))
        throw new Error("length must be a positive number");
      return rl(Ii(t, e), i);
    }
    z.convertLength = Em;
    function Pm(t, e, i) {
      if (e === void 0 && (e = "meters"), i === void 0 && (i = "kilometers"), !(t >= 0))
        throw new Error("area must be a positive number");
      var r = z.areaFactors[e];
      if (!r)
        throw new Error("invalid original units");
      var n = z.areaFactors[i];
      if (!n)
        throw new Error("invalid final units");
      return t / r * n;
    }
    z.convertArea = Pm;
    function Ve(t) {
      return !isNaN(t) && t !== null && !Array.isArray(t);
    }
    z.isNumber = Ve;
    function Sm(t) {
      return !!t && t.constructor === Object;
    }
    z.isObject = Sm;
    function Bm(t) {
      if (!t)
        throw new Error("bbox is required");
      if (!Array.isArray(t))
        throw new Error("bbox must be an Array");
      if (t.length !== 4 && t.length !== 6)
        throw new Error("bbox must be an Array of 4 or 6 numbers");
      t.forEach(function(e) {
        if (!Ve(e))
          throw new Error("bbox must only contain numbers");
      });
    }
    z.validateBBox = Bm;
    function Tm(t) {
      if (!t)
        throw new Error("id is required");
      if (["string", "number"].indexOf(typeof t) === -1)
        throw new Error("id must be a number or a string");
    }
    z.validateId = Tm;
  });
  var Ni = S((Q) => {
    "use strict";
    Object.defineProperty(Q, "__esModule", { value: true });
    var nt = Gi();
    function Ce(t, e, i) {
      if (t !== null)
        for (var r, n, s, a, o, l, u, f = 0, d = 0, P, E = t.type, T = E === "FeatureCollection", G = E === "Feature", _ = T ? t.features.length : 1, x = 0; x < _; x++) {
          u = T ? t.features[x].geometry : G ? t.geometry : t, P = u ? u.type === "GeometryCollection" : false, o = P ? u.geometries.length : 1;
          for (var b = 0; b < o; b++) {
            var R = 0, D = 0;
            if (a = P ? u.geometries[b] : u, a !== null) {
              l = a.coordinates;
              var O = a.type;
              switch (f = i && (O === "Polygon" || O === "MultiPolygon") ? 1 : 0, O) {
                case null:
                  break;
                case "Point":
                  if (e(l, d, x, R, D) === false)
                    return false;
                  d++, R++;
                  break;
                case "LineString":
                case "MultiPoint":
                  for (r = 0; r < l.length; r++) {
                    if (e(l[r], d, x, R, D) === false)
                      return false;
                    d++, O === "MultiPoint" && R++;
                  }
                  O === "LineString" && R++;
                  break;
                case "Polygon":
                case "MultiLineString":
                  for (r = 0; r < l.length; r++) {
                    for (n = 0; n < l[r].length - f; n++) {
                      if (e(l[r][n], d, x, R, D) === false)
                        return false;
                      d++;
                    }
                    O === "MultiLineString" && R++, O === "Polygon" && D++;
                  }
                  O === "Polygon" && R++;
                  break;
                case "MultiPolygon":
                  for (r = 0; r < l.length; r++) {
                    for (D = 0, n = 0; n < l[r].length; n++) {
                      for (s = 0; s < l[r][n].length - f; s++) {
                        if (e(l[r][n][s], d, x, R, D) === false)
                          return false;
                        d++;
                      }
                      D++;
                    }
                    R++;
                  }
                  break;
                case "GeometryCollection":
                  for (r = 0; r < a.geometries.length; r++)
                    if (Ce(a.geometries[r], e, i) === false)
                      return false;
                  break;
                default:
                  throw new Error("Unknown Geometry Type");
              }
            }
          }
        }
    }
    function Rm(t, e, i, r) {
      var n = i;
      return Ce(t, function(s, a, o, l, u) {
        a === 0 && i === void 0 ? n = s : n = e(n, s, a, o, l, u);
      }, r), n;
    }
    function sl(t, e) {
      var i;
      switch (t.type) {
        case "FeatureCollection":
          for (i = 0; i < t.features.length && e(t.features[i].properties, i) !== false; i++)
            ;
          break;
        case "Feature":
          e(t.properties, 0);
          break;
      }
    }
    function Dm(t, e, i) {
      var r = i;
      return sl(t, function(n, s) {
        s === 0 && i === void 0 ? r = n : r = e(r, n, s);
      }), r;
    }
    function al(t, e) {
      if (t.type === "Feature")
        e(t, 0);
      else if (t.type === "FeatureCollection")
        for (var i = 0; i < t.features.length && e(t.features[i], i) !== false; i++)
          ;
    }
    function Om(t, e, i) {
      var r = i;
      return al(t, function(n, s) {
        s === 0 && i === void 0 ? r = n : r = e(r, n, s);
      }), r;
    }
    function Am(t) {
      var e = [];
      return Ce(t, function(i) {
        e.push(i);
      }), e;
    }
    function qi(t, e) {
      var i, r, n, s, a, o, l, u, f, d, P = 0, E = t.type === "FeatureCollection", T = t.type === "Feature", G = E ? t.features.length : 1;
      for (i = 0; i < G; i++) {
        for (o = E ? t.features[i].geometry : T ? t.geometry : t, u = E ? t.features[i].properties : T ? t.properties : {}, f = E ? t.features[i].bbox : T ? t.bbox : void 0, d = E ? t.features[i].id : T ? t.id : void 0, l = o ? o.type === "GeometryCollection" : false, a = l ? o.geometries.length : 1, n = 0; n < a; n++) {
          if (s = l ? o.geometries[n] : o, s === null) {
            if (e(null, P, u, f, d) === false)
              return false;
            continue;
          }
          switch (s.type) {
            case "Point":
            case "LineString":
            case "MultiPoint":
            case "Polygon":
            case "MultiLineString":
            case "MultiPolygon": {
              if (e(s, P, u, f, d) === false)
                return false;
              break;
            }
            case "GeometryCollection": {
              for (r = 0; r < s.geometries.length; r++)
                if (e(s.geometries[r], P, u, f, d) === false)
                  return false;
              break;
            }
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
        P++;
      }
    }
    function Im(t, e, i) {
      var r = i;
      return qi(t, function(n, s, a, o, l) {
        s === 0 && i === void 0 ? r = n : r = e(r, n, s, a, o, l);
      }), r;
    }
    function je(t, e) {
      qi(t, function(i, r, n, s, a) {
        var o = i === null ? null : i.type;
        switch (o) {
          case null:
          case "Point":
          case "LineString":
          case "Polygon":
            return e(nt.feature(i, n, { bbox: s, id: a }), r, 0) === false ? false : void 0;
        }
        var l;
        switch (o) {
          case "MultiPoint":
            l = "Point";
            break;
          case "MultiLineString":
            l = "LineString";
            break;
          case "MultiPolygon":
            l = "Polygon";
            break;
        }
        for (var u = 0; u < i.coordinates.length; u++) {
          var f = i.coordinates[u], d = { type: l, coordinates: f };
          if (e(nt.feature(d, n), r, u) === false)
            return false;
        }
      });
    }
    function Gm(t, e, i) {
      var r = i;
      return je(t, function(n, s, a) {
        s === 0 && a === 0 && i === void 0 ? r = n : r = e(r, n, s, a);
      }), r;
    }
    function ol(t, e) {
      je(t, function(i, r, n) {
        var s = 0;
        if (i.geometry) {
          var a = i.geometry.type;
          if (!(a === "Point" || a === "MultiPoint")) {
            var o, l = 0, u = 0, f = 0;
            if (Ce(i, function(d, P, E, T, G) {
              if (o === void 0 || r > l || T > u || G > f) {
                o = d, l = r, u = T, f = G, s = 0;
                return;
              }
              var _ = nt.lineString([o, d], i.properties);
              if (e(_, r, n, G, s) === false)
                return false;
              s++, o = d;
            }) === false)
              return false;
          }
        }
      });
    }
    function qm(t, e, i) {
      var r = i, n = false;
      return ol(t, function(s, a, o, l, u) {
        n === false && i === void 0 ? r = s : r = e(r, s, a, o, l, u), n = true;
      }), r;
    }
    function ll(t, e) {
      if (!t)
        throw new Error("geojson is required");
      je(t, function(i, r, n) {
        if (i.geometry !== null) {
          var s = i.geometry.type, a = i.geometry.coordinates;
          switch (s) {
            case "LineString":
              if (e(i, r, n, 0, 0) === false)
                return false;
              break;
            case "Polygon":
              for (var o = 0; o < a.length; o++)
                if (e(nt.lineString(a[o], i.properties), r, n, o) === false)
                  return false;
              break;
          }
        }
      });
    }
    function Nm(t, e, i) {
      var r = i;
      return ll(t, function(n, s, a, o) {
        s === 0 && i === void 0 ? r = n : r = e(r, n, s, a, o);
      }), r;
    }
    function zm(t, e) {
      if (e = e || {}, !nt.isObject(e))
        throw new Error("options is invalid");
      var i = e.featureIndex || 0, r = e.multiFeatureIndex || 0, n = e.geometryIndex || 0, s = e.segmentIndex || 0, a = e.properties, o;
      switch (t.type) {
        case "FeatureCollection":
          i < 0 && (i = t.features.length + i), a = a || t.features[i].properties, o = t.features[i].geometry;
          break;
        case "Feature":
          a = a || t.properties, o = t.geometry;
          break;
        case "Point":
        case "MultiPoint":
          return null;
        case "LineString":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon":
          o = t;
          break;
        default:
          throw new Error("geojson is invalid");
      }
      if (o === null)
        return null;
      var l = o.coordinates;
      switch (o.type) {
        case "Point":
        case "MultiPoint":
          return null;
        case "LineString":
          return s < 0 && (s = l.length + s - 1), nt.lineString([l[s], l[s + 1]], a, e);
        case "Polygon":
          return n < 0 && (n = l.length + n), s < 0 && (s = l[n].length + s - 1), nt.lineString([l[n][s], l[n][s + 1]], a, e);
        case "MultiLineString":
          return r < 0 && (r = l.length + r), s < 0 && (s = l[r].length + s - 1), nt.lineString([l[r][s], l[r][s + 1]], a, e);
        case "MultiPolygon":
          return r < 0 && (r = l.length + r), n < 0 && (n = l[r].length + n), s < 0 && (s = l[r][n].length - s - 1), nt.lineString([l[r][n][s], l[r][n][s + 1]], a, e);
      }
      throw new Error("geojson is invalid");
    }
    function Fm(t, e) {
      if (e = e || {}, !nt.isObject(e))
        throw new Error("options is invalid");
      var i = e.featureIndex || 0, r = e.multiFeatureIndex || 0, n = e.geometryIndex || 0, s = e.coordIndex || 0, a = e.properties, o;
      switch (t.type) {
        case "FeatureCollection":
          i < 0 && (i = t.features.length + i), a = a || t.features[i].properties, o = t.features[i].geometry;
          break;
        case "Feature":
          a = a || t.properties, o = t.geometry;
          break;
        case "Point":
        case "MultiPoint":
          return null;
        case "LineString":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon":
          o = t;
          break;
        default:
          throw new Error("geojson is invalid");
      }
      if (o === null)
        return null;
      var l = o.coordinates;
      switch (o.type) {
        case "Point":
          return nt.point(l, a, e);
        case "MultiPoint":
          return r < 0 && (r = l.length + r), nt.point(l[r], a, e);
        case "LineString":
          return s < 0 && (s = l.length + s), nt.point(l[s], a, e);
        case "Polygon":
          return n < 0 && (n = l.length + n), s < 0 && (s = l[n].length + s), nt.point(l[n][s], a, e);
        case "MultiLineString":
          return r < 0 && (r = l.length + r), s < 0 && (s = l[r].length + s), nt.point(l[r][s], a, e);
        case "MultiPolygon":
          return r < 0 && (r = l.length + r), n < 0 && (n = l[r].length + n), s < 0 && (s = l[r][n].length - s), nt.point(l[r][n][s], a, e);
      }
      throw new Error("geojson is invalid");
    }
    Q.coordAll = Am;
    Q.coordEach = Ce;
    Q.coordReduce = Rm;
    Q.featureEach = al;
    Q.featureReduce = Om;
    Q.findPoint = Fm;
    Q.findSegment = zm;
    Q.flattenEach = je;
    Q.flattenReduce = Gm;
    Q.geomEach = qi;
    Q.geomReduce = Im;
    Q.lineEach = ll;
    Q.lineReduce = Nm;
    Q.propEach = sl;
    Q.propReduce = Dm;
    Q.segmentEach = ol;
    Q.segmentReduce = qm;
  });
  var hl = S((Fi) => {
    "use strict";
    Object.defineProperty(Fi, "__esModule", { value: true });
    var Vm = Ni();
    function zi(t) {
      var e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
      return Vm.coordEach(t, function(i) {
        e[0] > i[0] && (e[0] = i[0]), e[1] > i[1] && (e[1] = i[1]), e[2] < i[0] && (e[2] = i[0]), e[3] < i[1] && (e[3] = i[1]);
      }), e;
    }
    zi.default = zi;
    Fi.default = zi;
  });
  var Ui = S((Ev, Vi) => {
    var kt = Qo(), cl = Gi(), pl = Ni(), re = hl().default, Um = pl.featureEach, wv = pl.coordEach, Cv = cl.polygon, ul = cl.featureCollection;
    function fl(t) {
      var e = new kt(t);
      return e.insert = function(i) {
        if (i.type !== "Feature")
          throw new Error("invalid feature");
        return i.bbox = i.bbox ? i.bbox : re(i), kt.prototype.insert.call(this, i);
      }, e.load = function(i) {
        var r = [];
        return Array.isArray(i) ? i.forEach(function(n) {
          if (n.type !== "Feature")
            throw new Error("invalid features");
          n.bbox = n.bbox ? n.bbox : re(n), r.push(n);
        }) : Um(i, function(n) {
          if (n.type !== "Feature")
            throw new Error("invalid features");
          n.bbox = n.bbox ? n.bbox : re(n), r.push(n);
        }), kt.prototype.load.call(this, r);
      }, e.remove = function(i, r) {
        if (i.type !== "Feature")
          throw new Error("invalid feature");
        return i.bbox = i.bbox ? i.bbox : re(i), kt.prototype.remove.call(this, i, r);
      }, e.clear = function() {
        return kt.prototype.clear.call(this);
      }, e.search = function(i) {
        var r = kt.prototype.search.call(this, this.toBBox(i));
        return ul(r);
      }, e.collides = function(i) {
        return kt.prototype.collides.call(this, this.toBBox(i));
      }, e.all = function() {
        var i = kt.prototype.all.call(this);
        return ul(i);
      }, e.toJSON = function() {
        return kt.prototype.toJSON.call(this);
      }, e.fromJSON = function(i) {
        return kt.prototype.fromJSON.call(this, i);
      }, e.toBBox = function(i) {
        var r;
        if (i.bbox)
          r = i.bbox;
        else if (Array.isArray(i) && i.length === 4)
          r = i;
        else if (Array.isArray(i) && i.length === 6)
          r = [i[0], i[1], i[3], i[4]];
        else if (i.type === "Feature")
          r = re(i);
        else if (i.type === "FeatureCollection")
          r = re(i);
        else
          throw new Error("invalid geojson");
        return { minX: r[0], minY: r[1], maxX: r[2], maxY: r[3] };
      }, e;
    }
    Vi.exports = fl;
    Vi.exports.default = fl;
  });
  Array.prototype.findIndex = Array.prototype.findIndex || function(t) {
    if (this === null)
      throw new TypeError("Array.prototype.findIndex called on null or undefined");
    if (typeof t != "function")
      throw new TypeError("callback must be a function");
    for (var e = Object(this), i = e.length >>> 0, r = arguments[1], n = 0; n < i; n++)
      if (t.call(r, e[n], n, e))
        return n;
    return -1;
  };
  Array.prototype.find = Array.prototype.find || function(t) {
    if (this === null)
      throw new TypeError("Array.prototype.find called on null or undefined");
    if (typeof t != "function")
      throw new TypeError("callback must be a function");
    for (var e = Object(this), i = e.length >>> 0, r = arguments[1], n = 0; n < i; n++) {
      var s = e[n];
      if (t.call(r, s, n, e))
        return s;
    }
  };
  typeof Object.assign != "function" && (Object.assign = function(t) {
    "use strict";
    if (t == null)
      throw new TypeError("Cannot convert undefined or null to object");
    t = Object(t);
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      if (i != null)
        for (var r in i)
          Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
    }
    return t;
  });
  (function(t) {
    t.forEach(function(e) {
      e.hasOwnProperty("remove") || Object.defineProperty(e, "remove", { configurable: true, enumerable: true, writable: true, value: function() {
        this.parentNode.removeChild(this);
      } });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
  Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function(t, e) {
    if (this == null)
      throw new TypeError('"this" is null or not defined');
    var i = Object(this), r = i.length >>> 0;
    if (r === 0)
      return false;
    var n = e | 0, s = Math.max(n >= 0 ? n : r - Math.abs(n), 0);
    function a(o, l) {
      return o === l || typeof o == "number" && typeof l == "number" && isNaN(o) && isNaN(l);
    }
    for (; s < r; ) {
      if (a(i[s], t))
        return true;
      s++;
    }
    return false;
  } });
  var hr = { name: "@geoman-io/leaflet-geoman-free", version: "2.17.0", description: "A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0", keywords: ["leaflet", "geoman", "polygon management", "geometry editing", "map data", "map overlay", "polygon", "geojson", "leaflet-draw", "data-field-geojson", "ui-leaflet-draw"], files: ["dist"], main: "dist/leaflet-geoman.js", types: "dist/leaflet-geoman.d.ts", dependencies: { "@turf/boolean-contains": "^6.5.0", "@turf/kinks": "^6.5.0", "@turf/line-intersect": "^6.5.0", "@turf/line-split": "^6.5.0", lodash: "4.17.21", "polyclip-ts": "^0.16.5" }, devDependencies: { "@types/leaflet": "^1.7.9", "cross-env": "^7.0.3", cypress: "6.9.1", "cypress-wait-until": "1.7.1", esbuild: "^0.20.0", eslint: "8.56.0", "eslint-config-airbnb-base": "15.0.0", "eslint-config-prettier": "9.1.0", "eslint-plugin-cypress": "2.15.1", "eslint-plugin-import": "2.29.1", husky: "^9.0.7", leaflet: "1.9.3", "lint-staged": "^15.2.1", prettier: "3.2.4", "prosthetic-hand": "1.3.1", "ts-node": "^10.9.2" }, peerDependencies: { leaflet: "^1.2.0" }, scripts: { start: "pnpm run dev", dev: "cross-env DEV=true ts-node bundle.mjs", build: "ts-node bundle.mjs", test: "cypress run", cypress: "cypress open", prepare: "pnpm run build && husky", "eslint-check": "eslint --print-config . | eslint-config-prettier-check", eslint: 'eslint "{src,cypress,demo}/**/*.js" --fix ', prettier: 'prettier --write "{src,cypress,demo}/**/*.{js,css}" --log-level=warn', lint: "pnpm run eslint && pnpm run prettier" }, repository: { type: "git", url: "git://github.com/geoman-io/leaflet-geoman.git" }, author: { name: "Geoman.io", email: "sales@geoman.io", url: "http://geoman.io" }, license: "MIT", bugs: { url: "https://github.com/geoman-io/leaflet-geoman/issues" }, homepage: "https://geoman.io", prettier: { trailingComma: "es5", tabWidth: 2, semi: true, singleQuote: true }, "lint-staged": { "*.js": 'eslint "{src,cypress,demo}/**/*.js" --fix', "*.{js,css,md}": 'prettier --write "{src,cypress,demo}/**/*.{js,css}"' } };
  var Pi = xt(Ne());
  var Ga = { tooltips: { placeMarker: "Click to place marker", firstVertex: "Click to place first vertex", continueLine: "Click to continue drawing", finishLine: "Click any existing marker to finish", finishPoly: "Click first marker to finish", finishRect: "Click to finish", startCircle: "Click to place circle center", finishCircle: "Click to finish circle", placeCircleMarker: "Click to place circle marker", placeText: "Click to place text", selectFirstLayerFor: "Select first layer for {action}", selectSecondLayerFor: "Select second layer for {action}" }, actions: { finish: "Finish", cancel: "Cancel", removeLastVertex: "Remove Last Vertex" }, buttonTitles: { drawMarkerButton: "Draw Marker", drawPolyButton: "Draw Polygons", drawLineButton: "Draw Polyline", drawCircleButton: "Draw Circle", drawRectButton: "Draw Rectangle", editButton: "Edit Layers", dragButton: "Drag Layers", cutButton: "Cut Layers", deleteButton: "Remove Layers", drawCircleMarkerButton: "Draw Circle Marker", snappingButton: "Snap dragged marker to other layers and vertices", pinningButton: "Pin shared vertices together", rotateButton: "Rotate Layers", drawTextButton: "Draw Text", scaleButton: "Scale Layers", autoTracingButton: "Auto trace Line", snapGuidesButton: "Show SnapGuides", unionButton: "Union layers", differenceButton: "Subtract layers" }, measurements: { totalLength: "Length", segmentLength: "Segment length", area: "Area", radius: "Radius", perimeter: "Perimeter", height: "Height", width: "Width", coordinates: "Position", coordinatesMarker: "Position Marker" } };
  var qa = { tooltips: { placeMarker: "Platziere den Marker mit Klick", firstVertex: "Platziere den ersten Marker mit Klick", continueLine: "Klicke, um weiter zu zeichnen", finishLine: "Beende mit Klick auf existierenden Marker", finishPoly: "Beende mit Klick auf ersten Marker", finishRect: "Beende mit Klick", startCircle: "Platziere das Kreiszentrum mit Klick", finishCircle: "Beende den Kreis mit Klick", placeCircleMarker: "Platziere den Kreismarker mit Klick", placeText: "Platziere den Text mit Klick" }, actions: { finish: "Beenden", cancel: "Abbrechen", removeLastVertex: "Letzten Vertex l\xF6schen" }, buttonTitles: { drawMarkerButton: "Marker zeichnen", drawPolyButton: "Polygon zeichnen", drawLineButton: "Polyline zeichnen", drawCircleButton: "Kreis zeichnen", drawRectButton: "Rechteck zeichnen", editButton: "Layer editieren", dragButton: "Layer bewegen", cutButton: "Layer schneiden", deleteButton: "Layer l\xF6schen", drawCircleMarkerButton: "Kreismarker zeichnen", snappingButton: "Bewegter Layer an andere Layer oder Vertexe einhacken", pinningButton: "Vertexe an der gleichen Position verkn\xFCpfen", rotateButton: "Layer drehen", drawTextButton: "Text zeichnen", scaleButton: "Layer skalieren", autoTracingButton: "Linie automatisch nachzeichen" }, measurements: { totalLength: "L\xE4nge", segmentLength: "Segment L\xE4nge", area: "Fl\xE4che", radius: "Radius", perimeter: "Umfang", height: "H\xF6he", width: "Breite", coordinates: "Position", coordinatesMarker: "Position Marker" } };
  var Na = { tooltips: { placeMarker: "Clicca per posizionare un Marker", firstVertex: "Clicca per posizionare il primo vertice", continueLine: "Clicca per continuare a disegnare", finishLine: "Clicca qualsiasi marker esistente per terminare", finishPoly: "Clicca il primo marker per terminare", finishRect: "Clicca per terminare", startCircle: "Clicca per posizionare il punto centrale del cerchio", finishCircle: "Clicca per terminare il cerchio", placeCircleMarker: "Clicca per posizionare un Marker del cherchio" }, actions: { finish: "Termina", cancel: "Annulla", removeLastVertex: "Rimuovi l'ultimo vertice" }, buttonTitles: { drawMarkerButton: "Disegna Marker", drawPolyButton: "Disegna Poligoni", drawLineButton: "Disegna Polilinea", drawCircleButton: "Disegna Cerchio", drawRectButton: "Disegna Rettangolo", editButton: "Modifica Livelli", dragButton: "Sposta Livelli", cutButton: "Ritaglia Livelli", deleteButton: "Elimina Livelli", drawCircleMarkerButton: "Disegna Marker del Cerchio", snappingButton: "Snap ha trascinato il pennarello su altri strati e vertici", pinningButton: "Pin condiviso vertici insieme", rotateButton: "Ruota livello" } };
  var za = { tooltips: { placeMarker: "Klik untuk menempatkan marker", firstVertex: "Klik untuk menempatkan vertex pertama", continueLine: "Klik untuk meneruskan digitasi", finishLine: "Klik pada sembarang marker yang ada untuk mengakhiri", finishPoly: "Klik marker pertama untuk mengakhiri", finishRect: "Klik untuk mengakhiri", startCircle: "Klik untuk menempatkan titik pusat lingkaran", finishCircle: "Klik untuk mengakhiri lingkaran", placeCircleMarker: "Klik untuk menempatkan penanda lingkarann" }, actions: { finish: "Selesai", cancel: "Batal", removeLastVertex: "Hilangkan Vertex Terakhir" }, buttonTitles: { drawMarkerButton: "Digitasi Marker", drawPolyButton: "Digitasi Polygon", drawLineButton: "Digitasi Polyline", drawCircleButton: "Digitasi Lingkaran", drawRectButton: "Digitasi Segi Empat", editButton: "Edit Layer", dragButton: "Geser Layer", cutButton: "Potong Layer", deleteButton: "Hilangkan Layer", drawCircleMarkerButton: "Digitasi Penanda Lingkaran", snappingButton: "Jepretkan penanda yang ditarik ke lapisan dan simpul lain", pinningButton: "Sematkan simpul bersama bersama", rotateButton: "Putar lapisan" } };
  var Fa = { tooltips: { placeMarker: "Adaug\u0103 un punct", firstVertex: "Apas\u0103 aici pentru a ad\u0103uga primul Vertex", continueLine: "Apas\u0103 aici pentru a continua desenul", finishLine: "Apas\u0103 pe orice obiect pentru a finisa desenul", finishPoly: "Apas\u0103 pe primul obiect pentru a finisa", finishRect: "Apas\u0103 pentru a finisa", startCircle: "Apas\u0103 pentru a desena un cerc", finishCircle: "Apas\u0103 pentru a finisa un cerc", placeCircleMarker: "Adaug\u0103 un punct" }, actions: { finish: "Termin\u0103", cancel: "Anuleaz\u0103", removeLastVertex: "\u0218terge ultimul Vertex" }, buttonTitles: { drawMarkerButton: "Adaug\u0103 o bulin\u0103", drawPolyButton: "Deseneaz\u0103 un poligon", drawLineButton: "Deseneaz\u0103 o linie", drawCircleButton: "Deseneaz\u0103 un cerc", drawRectButton: "Deseneaz\u0103 un dreptunghi", editButton: "Editeaz\u0103 straturile", dragButton: "Mut\u0103 straturile", cutButton: "Taie straturile", deleteButton: "\u0218terge straturile", drawCircleMarkerButton: "Deseneaz\u0103 marcatorul cercului", snappingButton: "Fixa\u021Bi marcatorul glisat pe alte straturi \u0219i v\xE2rfuri", pinningButton: "Fixa\u021Bi v\xE2rfurile partajate \xEEmpreun\u0103", rotateButton: "Roti\u021Bi stratul" } };
  var Va = { tooltips: { placeMarker: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440", firstVertex: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043F\u0435\u0440\u0432\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442", continueLine: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435", finishLine: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F", finishPoly: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E \u0442\u043E\u0447\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C", finishRect: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C", startCircle: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0446\u0435\u043D\u0442\u0440 \u043A\u0440\u0443\u0433\u0430", finishCircle: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0440\u0430\u0434\u0438\u0443\u0441", placeCircleMarker: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0440" }, actions: { finish: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C", cancel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C", removeLastVertex: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435" }, buttonTitles: { drawMarkerButton: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440", drawPolyButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u043B\u0438\u0433\u043E\u043D", drawLineButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043A\u0440\u0438\u0432\u0443\u044E", drawCircleButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043A\u0440\u0443\u0433", drawRectButton: "\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A", editButton: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043B\u043E\u0439", dragButton: "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0441\u043B\u043E\u0439", cutButton: "\u0412\u044B\u0440\u0435\u0437\u0430\u0442\u044C \u0441\u043B\u043E\u0439", deleteButton: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043B\u043E\u0439", drawCircleMarkerButton: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0440", snappingButton: "\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u043A \u0434\u0440\u0443\u0433\u0438\u043C \u0441\u043B\u043E\u044F\u043C \u0438 \u0432\u0435\u0440\u0448\u0438\u043D\u0430\u043C", pinningButton: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u043E\u0431\u0449\u0438\u0435 \u0442\u043E\u0447\u043A\u0438 \u0432\u043C\u0435\u0441\u0442\u0435", rotateButton: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u0441\u043B\u043E\u044F" } };
  var Ua = { tooltips: { placeMarker: "Presiona para colocar un marcador", firstVertex: "Presiona para colocar el primer v\xE9rtice", continueLine: "Presiona para continuar dibujando", finishLine: "Presiona cualquier marcador existente para finalizar", finishPoly: "Presiona el primer marcador para finalizar", finishRect: "Presiona para finalizar", startCircle: "Presiona para colocar el centro del c\xEDrculo", finishCircle: "Presiona para finalizar el c\xEDrculo", placeCircleMarker: "Presiona para colocar un marcador de c\xEDrculo" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Eliminar \xFAltimo v\xE9rtice" }, buttonTitles: { drawMarkerButton: "Dibujar Marcador", drawPolyButton: "Dibujar Pol\xEDgono", drawLineButton: "Dibujar L\xEDnea", drawCircleButton: "Dibujar C\xEDrculo", drawRectButton: "Dibujar Rect\xE1ngulo", editButton: "Editar Capas", dragButton: "Arrastrar Capas", cutButton: "Cortar Capas", deleteButton: "Eliminar Capas", drawCircleMarkerButton: "Dibujar Marcador de C\xEDrculo", snappingButton: "El marcador de Snap arrastrado a otras capas y v\xE9rtices", pinningButton: "Fijar juntos los v\xE9rtices compartidos", rotateButton: "Rotar capa" } };
  var ja = { tooltips: { placeMarker: "Klik om een marker te plaatsen", firstVertex: "Klik om het eerste punt te plaatsen", continueLine: "Klik om te blijven tekenen", finishLine: "Klik op een bestaand punt om te be\xEBindigen", finishPoly: "Klik op het eerst punt om te be\xEBindigen", finishRect: "Klik om te be\xEBindigen", startCircle: "Klik om het middelpunt te plaatsen", finishCircle: "Klik om de cirkel te be\xEBindigen", placeCircleMarker: "Klik om een marker te plaatsen" }, actions: { finish: "Bewaar", cancel: "Annuleer", removeLastVertex: "Verwijder laatste punt" }, buttonTitles: { drawMarkerButton: "Plaats Marker", drawPolyButton: "Teken een vlak", drawLineButton: "Teken een lijn", drawCircleButton: "Teken een cirkel", drawRectButton: "Teken een vierkant", editButton: "Bewerk", dragButton: "Verplaats", cutButton: "Knip", deleteButton: "Verwijder", drawCircleMarkerButton: "Plaats Marker", snappingButton: "Snap gesleepte marker naar andere lagen en hoekpunten", pinningButton: "Speld gedeelde hoekpunten samen", rotateButton: "Laag roteren" } };
  var Ka = { tooltips: { placeMarker: "Cliquez pour placer un marqueur", firstVertex: "Cliquez pour placer le premier sommet", continueLine: "Cliquez pour continuer \xE0 dessiner", finishLine: "Cliquez sur n'importe quel marqueur pour terminer", finishPoly: "Cliquez sur le premier marqueur pour terminer", finishRect: "Cliquez pour terminer", startCircle: "Cliquez pour placer le centre du cercle", finishCircle: "Cliquez pour finir le cercle", placeCircleMarker: "Cliquez pour placer le marqueur circulaire" }, actions: { finish: "Terminer", cancel: "Annuler", removeLastVertex: "Retirer le dernier sommet" }, buttonTitles: { drawMarkerButton: "Placer des marqueurs", drawPolyButton: "Dessiner des polygones", drawLineButton: "Dessiner des polylignes", drawCircleButton: "Dessiner un cercle", drawRectButton: "Dessiner un rectangle", editButton: "\xC9diter des calques", dragButton: "D\xE9placer des calques", cutButton: "Couper des calques", deleteButton: "Supprimer des calques", drawCircleMarkerButton: "Dessiner un marqueur circulaire", snappingButton: "Glisser le marqueur vers d'autres couches et sommets", pinningButton: "\xC9pingler ensemble les sommets partag\xE9s", rotateButton: "Tourner des calques" } };
  var Ha = { tooltips: { placeMarker: "\u5355\u51FB\u653E\u7F6E\u6807\u8BB0", firstVertex: "\u5355\u51FB\u653E\u7F6E\u9996\u4E2A\u9876\u70B9", continueLine: "\u5355\u51FB\u7EE7\u7EED\u7ED8\u5236", finishLine: "\u5355\u51FB\u4EFB\u4F55\u5B58\u5728\u7684\u6807\u8BB0\u4EE5\u5B8C\u6210", finishPoly: "\u5355\u51FB\u7B2C\u4E00\u4E2A\u6807\u8BB0\u4EE5\u5B8C\u6210", finishRect: "\u5355\u51FB\u5B8C\u6210", startCircle: "\u5355\u51FB\u653E\u7F6E\u5706\u5FC3", finishCircle: "\u5355\u51FB\u5B8C\u6210\u5706\u5F62", placeCircleMarker: "\u70B9\u51FB\u653E\u7F6E\u5706\u5F62\u6807\u8BB0" }, actions: { finish: "\u5B8C\u6210", cancel: "\u53D6\u6D88", removeLastVertex: "\u79FB\u9664\u6700\u540E\u7684\u9876\u70B9" }, buttonTitles: { drawMarkerButton: "\u7ED8\u5236\u6807\u8BB0", drawPolyButton: "\u7ED8\u5236\u591A\u8FB9\u5F62", drawLineButton: "\u7ED8\u5236\u7EBF\u6BB5", drawCircleButton: "\u7ED8\u5236\u5706\u5F62", drawRectButton: "\u7ED8\u5236\u957F\u65B9\u5F62", editButton: "\u7F16\u8F91\u56FE\u5C42", dragButton: "\u62D6\u62FD\u56FE\u5C42", cutButton: "\u526A\u5207\u56FE\u5C42", deleteButton: "\u5220\u9664\u56FE\u5C42", drawCircleMarkerButton: "\u753B\u5706\u5708\u6807\u8BB0", snappingButton: "\u5C06\u62D6\u52A8\u7684\u6807\u8BB0\u6355\u6349\u5230\u5176\u4ED6\u56FE\u5C42\u548C\u9876\u70B9", pinningButton: "\u5C06\u5171\u4EAB\u9876\u70B9\u56FA\u5B9A\u5728\u4E00\u8D77", rotateButton: "\u65CB\u8F6C\u56FE\u5C42" } };
  var Xa = { tooltips: { placeMarker: "\u55AE\u64CA\u653E\u7F6E\u6A19\u8A18", firstVertex: "\u55AE\u64CA\u653E\u7F6E\u7B2C\u4E00\u500B\u9802\u9EDE", continueLine: "\u55AE\u64CA\u7E7C\u7E8C\u7E6A\u88FD", finishLine: "\u55AE\u64CA\u4EFB\u4F55\u5B58\u5728\u7684\u6A19\u8A18\u4EE5\u5B8C\u6210", finishPoly: "\u55AE\u64CA\u7B2C\u4E00\u500B\u6A19\u8A18\u4EE5\u5B8C\u6210", finishRect: "\u55AE\u64CA\u5B8C\u6210", startCircle: "\u55AE\u64CA\u653E\u7F6E\u5713\u5FC3", finishCircle: "\u55AE\u64CA\u5B8C\u6210\u5713\u5F62", placeCircleMarker: "\u9EDE\u64CA\u653E\u7F6E\u5713\u5F62\u6A19\u8A18" }, actions: { finish: "\u5B8C\u6210", cancel: "\u53D6\u6D88", removeLastVertex: "\u79FB\u9664\u6700\u5F8C\u4E00\u500B\u9802\u9EDE" }, buttonTitles: { drawMarkerButton: "\u653E\u7F6E\u6A19\u8A18", drawPolyButton: "\u7E6A\u88FD\u591A\u908A\u5F62", drawLineButton: "\u7E6A\u88FD\u7DDA\u6BB5", drawCircleButton: "\u7E6A\u88FD\u5713\u5F62", drawRectButton: "\u7E6A\u88FD\u65B9\u5F62", editButton: "\u7DE8\u8F2F\u5716\u5F62", dragButton: "\u79FB\u52D5\u5716\u5F62", cutButton: "\u88C1\u5207\u5716\u5F62", deleteButton: "\u522A\u9664\u5716\u5F62", drawCircleMarkerButton: "\u756B\u5713\u5708\u6A19\u8A18", snappingButton: "\u5C07\u62D6\u52D5\u7684\u6A19\u8A18\u5C0D\u9F4A\u5230\u5176\u4ED6\u5716\u5C64\u548C\u9802\u9EDE", pinningButton: "\u5C07\u5171\u4EAB\u9802\u9EDE\u56FA\u5B9A\u5728\u4E00\u8D77", rotateButton: "\u65CB\u8F49\u5716\u5F62" } };
  var Ya = { tooltips: { placeMarker: "Clique para posicionar o marcador", firstVertex: "Clique para posicionar o primeiro v\xE9rtice", continueLine: "Clique para continuar desenhando", finishLine: "Clique em qualquer marcador existente para finalizar", finishPoly: "Clique no primeiro marcador para finalizar", finishRect: "Clique para finalizar", startCircle: "Clique para posicionar o centro do c\xEDrculo", finishCircle: "Clique para finalizar o c\xEDrculo", placeCircleMarker: "Clique para posicionar o marcador circular", placeText: "Clique para inserir texto" }, actions: { finish: "Finalizar", cancel: "Cancelar", removeLastVertex: "Remover \xFAltimo v\xE9rtice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Pol\xEDgonos", drawLineButton: "Desenhar Linha Poligonal", drawCircleButton: "Desenhar C\xEDrculo", drawRectButton: "Desenhar Ret\xE2ngulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Recortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de C\xEDrculo", snappingButton: "Ajustar marcador arrastado a outras camadas e v\xE9rtices", pinningButton: "Unir v\xE9rtices compartilhados", rotateButton: "Rotacionar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Redimensionar Camadas", autoTracingButton: "Tra\xE7ado Autom\xE1tico de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "\xC1rea", radius: "Raio", perimeter: "Per\xEDmetro", height: "Altura", width: "Largura", coordinates: "Posi\xE7\xE3o", coordinatesMarker: "Marcador de Posi\xE7\xE3o" } };
  var Ja = { tooltips: { placeMarker: "Clique para colocar marcador", firstVertex: "Clique para colocar primeiro v\xE9rtice", continueLine: "Clique para continuar a desenhar", finishLine: "Clique num marcador existente para terminar", finishPoly: "Clique no primeiro marcador para terminar", finishRect: "Clique para terminar", startCircle: "Clique para colocar o centro do c\xEDrculo", finishCircle: "Clique para terminar o c\xEDrculo", placeCircleMarker: "Clique para colocar marcador de c\xEDrculo", placeText: "Clique para colocar texto" }, actions: { finish: "Terminar", cancel: "Cancelar", removeLastVertex: "Remover \xDAltimo V\xE9rtice" }, buttonTitles: { drawMarkerButton: "Desenhar Marcador", drawPolyButton: "Desenhar Pol\xEDgonos", drawLineButton: "Desenhar Polilinha", drawCircleButton: "Desenhar C\xEDrculo", drawRectButton: "Desenhar Ret\xE2ngulo", editButton: "Editar Camadas", dragButton: "Arrastar Camadas", cutButton: "Cortar Camadas", deleteButton: "Remover Camadas", drawCircleMarkerButton: "Desenhar Marcador de C\xEDrculo", snappingButton: "Ajustar marcador arrastado a outras camadas e v\xE9rtices", pinningButton: "Unir v\xE9rtices partilhados", rotateButton: "Rodar Camadas", drawTextButton: "Desenhar Texto", scaleButton: "Escalar Camadas", autoTracingButton: "Tra\xE7ado Autom\xE1tico de Linha" }, measurements: { totalLength: "Comprimento", segmentLength: "Comprimento do Segmento", area: "\xC1rea", radius: "Raio", perimeter: "Per\xEDmetro", height: "Altura", width: "Largura", coordinates: "Posi\xE7\xE3o", coordinatesMarker: "Marcador de Posi\xE7\xE3o" } };
  var $a = { tooltips: { placeMarker: "Kliknij, aby umie\u015Bci\u0107 znacznik", firstVertex: "Kliknij, aby umie\u015Bci\u0107 pierwszy wierzcho\u0142ek", continueLine: "Kliknij, aby kontynuowa\u0107 rysowanie", finishLine: "Kliknij dowolny istniej\u0105cy znacznik, aby zako\u0144czy\u0107", finishPoly: "Kliknij pierwszy znacznik, aby zako\u0144czy\u0107", finishRect: "Kliknij, aby zako\u0144czy\u0107", startCircle: "Kliknij, aby umie\u015Bci\u0107 \u015Brodek okr\u0119gu", finishCircle: "Kliknij, aby zako\u0144czy\u0107 okr\u0105g", placeCircleMarker: "Kliknij, aby umie\u015Bci\u0107 znacznik okr\u0119gu", placeText: "Kliknij, aby umie\u015Bci\u0107 tekst" }, actions: { finish: "Zako\u0144cz", cancel: "Anuluj", removeLastVertex: "Usu\u0144 ostatni wierzcho\u0142ek" }, buttonTitles: { drawMarkerButton: "Rysuj znacznik", drawPolyButton: "Rysuj wielok\u0105t", drawLineButton: "Rysuj lini\u0119", drawCircleButton: "Rysuj okr\u0105g", drawRectButton: "Rysuj prostok\u0105t", editButton: "Edytuj warstwy", dragButton: "Przeci\u0105gnij warstwy", cutButton: "Wytnij warstwy", deleteButton: "Usu\u0144 warstwy", drawCircleMarkerButton: "Rysuj znacznik okr\u0105g\u0142y", snappingButton: "Przyci\u0105gnij przenoszony znacznik do innych warstw i wierzcho\u0142k\xF3w", pinningButton: "Przypnij wsp\xF3lne wierzcho\u0142ki razem", rotateButton: "Obr\xF3\u0107 warstwy", drawTextButton: "Rysuj tekst", scaleButton: "Skaluj warstwy", autoTracingButton: "Automatyczne \u015Bledzenie linii" }, measurements: { totalLength: "D\u0142ugo\u015B\u0107", segmentLength: "D\u0142ugo\u015B\u0107 odcinka", area: "Obszar", radius: "Promie\u0144", perimeter: "Obw\xF3d", height: "Wysoko\u015B\u0107", width: "Szeroko\u015B\u0107", coordinates: "Pozycja", coordinatesMarker: "Znacznik pozycji" } };
  var Za = { tooltips: { placeMarker: "Klicka f\xF6r att placera mark\xF6r", firstVertex: "Klicka f\xF6r att placera f\xF6rsta h\xF6rnet", continueLine: "Klicka f\xF6r att forts\xE4tta rita", finishLine: "Klicka p\xE5 en existerande punkt f\xF6r att slutf\xF6ra", finishPoly: "Klicka p\xE5 den f\xF6rsta punkten f\xF6r att slutf\xF6ra", finishRect: "Klicka f\xF6r att slutf\xF6ra", startCircle: "Klicka f\xF6r att placera cirkelns centrum", finishCircle: "Klicka f\xF6r att slutf\xF6ra cirkeln", placeCircleMarker: "Klicka f\xF6r att placera cirkelmark\xF6r" }, actions: { finish: "Slutf\xF6r", cancel: "Avbryt", removeLastVertex: "Ta bort sista h\xF6rnet" }, buttonTitles: { drawMarkerButton: "Rita Mark\xF6r", drawPolyButton: "Rita Polygoner", drawLineButton: "Rita Linje", drawCircleButton: "Rita Cirkel", drawRectButton: "Rita Rektangel", editButton: "Redigera Lager", dragButton: "Dra Lager", cutButton: "Klipp i Lager", deleteButton: "Ta bort Lager", drawCircleMarkerButton: "Rita Cirkelmark\xF6r", snappingButton: "Sn\xE4pp dra mark\xF6ren till andra lager och h\xF6rn", pinningButton: "F\xE4st delade h\xF6rn tillsammans", rotateButton: "Rotera lagret" } };
  var Wa = { tooltips: { placeMarker: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7", firstVertex: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03C0\u03C1\u03CE\u03C4\u03BF \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF", continueLine: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03B5\u03C4\u03B5 \u03BD\u03B1 \u03C3\u03C7\u03B5\u03B4\u03B9\u03AC\u03B6\u03B5\u03C4\u03B5", finishLine: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03C3\u03B5 \u03BF\u03C0\u03BF\u03B9\u03BF\u03BD\u03B4\u03AE\u03C0\u03BF\u03C4\u03B5 \u03C5\u03C0\u03AC\u03C1\u03C7\u03BF\u03BD \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03C9\u03B8\u03B5\u03AF", finishPoly: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03C3\u03C4\u03BF \u03C0\u03C1\u03CE\u03C4\u03BF \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03C3\u03B5\u03C4\u03B5", finishRect: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03C3\u03B5\u03C4\u03B5", startCircle: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03BA\u03AD\u03BD\u03C4\u03C1\u03BF \u039A\u03CD\u03BA\u03BB\u03BF\u03C5", finishCircle: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD \u039A\u03CD\u03BA\u03BB\u03BF", placeCircleMarker: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u039A\u03C5\u03BA\u03BB\u03B9\u03BA\u03CC \u0394\u03B5\u03AF\u03BA\u03C4\u03B7" }, actions: { finish: "\u03A4\u03AD\u03BB\u03BF\u03C2", cancel: "\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7", removeLastVertex: "\u039A\u03B1\u03C4\u03AC\u03C1\u03B3\u03B7\u03C3\u03B7 \u03C4\u03B5\u03BB\u03B5\u03C5\u03C4\u03B1\u03AF\u03BF\u03C5 \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF\u03C5" }, buttonTitles: { drawMarkerButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7", drawPolyButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u03A0\u03BF\u03BB\u03C5\u03B3\u03CE\u03BD\u03BF\u03C5", drawLineButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u0393\u03C1\u03B1\u03BC\u03BC\u03AE\u03C2", drawCircleButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039A\u03CD\u03BA\u03BB\u03BF\u03C5", drawRectButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039F\u03C1\u03B8\u03BF\u03B3\u03C9\u03BD\u03AF\u03BF\u03C5", editButton: "\u0395\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD", dragButton: "\u039C\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD", cutButton: "\u0391\u03C0\u03BF\u03BA\u03BF\u03C0\u03AE \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD", deleteButton: "\u039A\u03B1\u03C4\u03AC\u03C1\u03B3\u03B7\u03C3\u03B7 \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD", drawCircleMarkerButton: "\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039A\u03C5\u03BA\u03BB\u03B9\u03BA\u03BF\u03CD \u0394\u03B5\u03AF\u03BA\u03C4\u03B7", snappingButton: "\u03A0\u03C1\u03BF\u03C3\u03BA\u03CC\u03BB\u03BB\u03B7\u03C3\u03B7 \u03C4\u03BF\u03C5 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7 \u03BC\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC\u03C2 \u03C3\u03B5 \u03AC\u03BB\u03BB\u03B1 \u0395\u03C0\u03AF\u03C0\u03B5\u03B4\u03B1 \u03BA\u03B1\u03B9 \u039A\u03BF\u03C1\u03C5\u03C6\u03AD\u03C2", pinningButton: "\u03A0\u03B5\u03C1\u03B9\u03BA\u03BF\u03C0\u03AE \u03BA\u03BF\u03B9\u03BD\u03CE\u03BD \u03BA\u03BF\u03C1\u03C5\u03C6\u03CE\u03BD \u03BC\u03B1\u03B6\u03AF", rotateButton: "\u03A0\u03B5\u03C1\u03B9\u03C3\u03C4\u03C1\u03AD\u03C8\u03C4\u03B5 \u03C4\u03BF \u03C3\u03C4\u03C1\u03CE\u03BC\u03B1" } };
  var Qa = { tooltips: { placeMarker: "Kattintson a jel\xF6l\u0151 elhelyez\xE9s\xE9hez", firstVertex: "Kattintson az els\u0151 pont elhelyez\xE9s\xE9hez", continueLine: "Kattintson a k\xF6vetkez\u0151 pont elhelyez\xE9s\xE9hez", finishLine: "A befejez\xE9shez kattintson egy megl\xE9v\u0151 pontra", finishPoly: "A befejez\xE9shez kattintson az els\u0151 pontra", finishRect: "Kattintson a befejez\xE9shez", startCircle: "Kattintson a k\xF6r k\xF6z\xE9ppontj\xE1nak elhelyez\xE9s\xE9hez", finishCircle: "Kattintson a k\xF6r befejez\xE9s\xE9hez", placeCircleMarker: "Kattintson a k\xF6rjel\xF6l\u0151 elhelyez\xE9s\xE9hez" }, actions: { finish: "Befejez\xE9s", cancel: "M\xE9gse", removeLastVertex: "Utols\xF3 pont elt\xE1vol\xEDt\xE1sa" }, buttonTitles: { drawMarkerButton: "Jel\xF6l\u0151 rajzol\xE1sa", drawPolyButton: "Poligon rajzol\xE1sa", drawLineButton: "Vonal rajzol\xE1sa", drawCircleButton: "K\xF6r rajzol\xE1sa", drawRectButton: "N\xE9gyzet rajzol\xE1sa", editButton: "Elemek szerkeszt\xE9se", dragButton: "Elemek mozgat\xE1sa", cutButton: "Elemek v\xE1g\xE1sa", deleteButton: "Elemek t\xF6rl\xE9se", drawCircleMarkerButton: "K\xF6r jel\xF6l\u0151 rajzol\xE1sa", snappingButton: "Kapcsolja a jel\xF6lt\u0151t m\xE1sik elemhez vagy ponthoz", pinningButton: "K\xF6z\xF6s pontok \xF6sszek\xF6t\xE9se", rotateButton: "F\xF3lia elforgat\xE1sa" } };
  var to = { tooltips: { placeMarker: "Tryk for at placere en mark\xF8r", firstVertex: "Tryk for at placere det f\xF8rste punkt", continueLine: "Tryk for at forts\xE6tte linjen", finishLine: "Tryk p\xE5 et eksisterende punkt for at afslutte", finishPoly: "Tryk p\xE5 det f\xF8rste punkt for at afslutte", finishRect: "Tryk for at afslutte", startCircle: "Tryk for at placere cirklens center", finishCircle: "Tryk for at afslutte cirklen", placeCircleMarker: "Tryk for at placere en cirkelmark\xF8r" }, actions: { finish: "Afslut", cancel: "Afbryd", removeLastVertex: "Fjern sidste punkt" }, buttonTitles: { drawMarkerButton: "Placer mark\xF8r", drawPolyButton: "Tegn polygon", drawLineButton: "Tegn linje", drawCircleButton: "Tegn cirkel", drawRectButton: "Tegn firkant", editButton: "Rediger", dragButton: "Tr\xE6k", cutButton: "Klip", deleteButton: "Fjern", drawCircleMarkerButton: "Tegn cirkelmark\xF8r", snappingButton: "Fastg\xF8r trukket mark\xF8r til andre elementer", pinningButton: "Sammenl\xE6g delte elementer", rotateButton: "Roter laget" } };
  var eo = { tooltips: { placeMarker: "Klikk for \xE5 plassere punkt", firstVertex: "Klikk for \xE5 plassere f\xF8rste punkt", continueLine: "Klikk for \xE5 tegne videre", finishLine: "Klikk p\xE5 et eksisterende punkt for \xE5 fullf\xF8re", finishPoly: "Klikk f\xF8rste punkt for \xE5 fullf\xF8re", finishRect: "Klikk for \xE5 fullf\xF8re", startCircle: "Klikk for \xE5 sette sirkel midtpunkt", finishCircle: "Klikk for \xE5 fullf\xF8re sirkel", placeCircleMarker: "Klikk for \xE5 plassere sirkel", placeText: "Klikk for \xE5 plassere tekst" }, actions: { finish: "Fullf\xF8r", cancel: "Kanseller", removeLastVertex: "Fjern forrige punkt" }, buttonTitles: { drawMarkerButton: "Tegn punkt", drawPolyButton: "Tegn flate", drawLineButton: "Tegn linje", drawCircleButton: "Tegn sirkel", drawRectButton: "Tegn rektangel", editButton: "Rediger objekter", dragButton: "Dra objekter", cutButton: "Kutt objekter", deleteButton: "Fjern objekter", drawCircleMarkerButton: "Tegn sirkel-punkt", snappingButton: "Fest dratt punkt til andre objekter og punkt", pinningButton: "Pin delte punkter sammen", rotateButton: "Rot\xE9r objekter", drawTextButton: "Tegn tekst", scaleButton: "Skal\xE9r objekter", autoTracingButton: "Automatisk sporing av linje" }, measurements: { totalLength: "Lengde", segmentLength: "Segmentlengde", area: "Omr\xE5de", radius: "Radius", perimeter: "Omriss", height: "H\xF8yde", width: "Bredde", coordinates: "Posisjon", coordinatesMarker: "Posisjonsmark\xF8r" } };
  var io = { tooltips: { placeMarker: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u062C\u0627\u0646\u0645\u0627\u06CC\u06CC \u0646\u0634\u0627\u0646", firstVertex: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0627\u0648\u0644\u06CC\u0646 \u0631\u0623\u0633", continueLine: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0627\u062F\u0627\u0645\u0647 \u0631\u0633\u0645", finishLine: "\u06A9\u0644\u06CC\u06A9 \u0631\u0648\u06CC \u0647\u0631 \u0646\u0634\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646", finishPoly: "\u06A9\u0644\u06CC\u06A9 \u0631\u0648\u06CC \u0627\u0648\u0644\u06CC\u0646 \u0646\u0634\u0627\u0646 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646", finishRect: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646", startCircle: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0645\u0631\u06A9\u0632 \u062F\u0627\u06CC\u0631\u0647", finishCircle: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u0645 \u062F\u0627\u06CC\u0631\u0647", placeCircleMarker: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0646\u0634\u0627\u0646 \u062F\u0627\u06CC\u0631\u0647", placeText: "\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0646\u0648\u0634\u062A\u0646 \u0645\u062A\u0646" }, actions: { finish: "\u067E\u0627\u06CC\u0627\u0646", cancel: "\u0644\u0641\u0648", removeLastVertex: "\u062D\u0630\u0641 \u0622\u062E\u0631\u06CC\u0646 \u0631\u0623\u0633" }, buttonTitles: { drawMarkerButton: "\u062F\u0631\u062C \u0646\u0634\u0627\u0646", drawPolyButton: "\u0631\u0633\u0645 \u0686\u0646\u062F\u0636\u0644\u0639\u06CC", drawLineButton: "\u0631\u0633\u0645 \u062E\u0637", drawCircleButton: "\u0631\u0633\u0645 \u062F\u0627\u06CC\u0631\u0647", drawRectButton: "\u0631\u0633\u0645 \u0686\u0647\u0627\u0631\u0636\u0644\u0639\u06CC", editButton: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627", dragButton: "\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0644\u0627\u06CC\u0647\u200C\u0647\u0627", cutButton: "\u0628\u0631\u0634 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627", deleteButton: "\u062D\u0630\u0641 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627", drawCircleMarkerButton: "\u0631\u0633\u0645 \u0646\u0634\u0627\u0646 \u062F\u0627\u06CC\u0631\u0647", snappingButton: "\u0646\u0634\u0627\u0646\u06AF\u0631 \u0631\u0627 \u0628\u0647 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627 \u0648 \u0631\u0626\u0648\u0633 \u062F\u06CC\u06AF\u0631 \u0628\u06A9\u0634\u06CC\u062F", pinningButton: "\u0631\u0626\u0648\u0633 \u0645\u0634\u062A\u0631\u06A9 \u0631\u0627 \u0628\u0627 \u0647\u0645 \u067E\u06CC\u0646 \u06A9\u0646\u06CC\u062F", rotateButton: "\u0686\u0631\u062E\u0634 \u0644\u0627\u06CC\u0647", drawTextButton: "\u0631\u0633\u0645 \u0645\u062A\u0646", scaleButton: "\u0645\u0642\u06CC\u0627\u0633\u200C\u06AF\u0630\u0627\u0631\u06CC", autoTracingButton: "\u0631\u062F\u06CC\u0627\u0628 \u062E\u0648\u062F\u06A9\u0627\u0631" }, measurements: { totalLength: "\u0637\u0648\u0644", segmentLength: "\u0637\u0648\u0644 \u0628\u062E\u0634", area: "\u0646\u0627\u062D\u06CC\u0647", radius: "\u0634\u0639\u0627\u0639", perimeter: "\u0645\u062D\u06CC\u0637", height: "\u0627\u0631\u062A\u0641\u0627\u0639", width: "\u0639\u0631\u0636", coordinates: "\u0645\u0648\u0642\u0639\u06CC\u062A", coordinatesMarker: "\u0645\u0648\u0642\u0639\u06CC\u062A \u0646\u0634\u0627\u0646" } };
  var ro = { tooltips: { placeMarker: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440", firstVertex: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043F\u0435\u0440\u0448\u0443 \u0432\u0435\u0440\u0448\u0438\u043D\u0443", continueLine: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438 \u043C\u0430\u043B\u044E\u0432\u0430\u0442\u0438", finishLine: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0439 \u0456\u0441\u043D\u0443\u044E\u0447\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F", finishPoly: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0435\u0440\u0448\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438", finishRect: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438", startCircle: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0434\u043E\u0434\u0430\u0442\u0438 \u0446\u0435\u043D\u0442\u0440 \u043A\u043E\u043B\u0430", finishCircle: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438 \u043A\u043E\u043B\u043E", placeCircleMarker: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440" }, actions: { finish: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438", cancel: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438", removeLastVertex: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044E \u0432\u0435\u0440\u0448\u0438\u043D\u0443" }, buttonTitles: { drawMarkerButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440", drawPolyButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043F\u043E\u043B\u0456\u0433\u043E\u043D", drawLineButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u0440\u0438\u0432\u0443", drawCircleButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u043E\u043B\u043E", drawRectButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043F\u0440\u044F\u043C\u043E\u043A\u0443\u0442\u043D\u0438\u043A", editButton: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0448\u0430\u0440\u0438", dragButton: "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0448\u0430\u0440\u0438", cutButton: "\u0412\u0438\u0440\u0456\u0437\u0430\u0442\u0438 \u0448\u0430\u0440\u0438", deleteButton: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0448\u0430\u0440\u0438", drawCircleMarkerButton: "\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440", snappingButton: "\u041F\u0440\u0438\u0432\u2019\u044F\u0437\u0430\u0442\u0438 \u043F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0443\u0442\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043E \u0456\u043D\u0448\u0438\u0445 \u0448\u0430\u0440\u0456\u0432 \u0442\u0430 \u0432\u0435\u0440\u0448\u0438\u043D", pinningButton: "\u0417\u0432'\u044F\u0437\u0430\u0442\u0438 \u0441\u043F\u0456\u043B\u044C\u043D\u0456 \u0432\u0435\u0440\u0448\u0438\u043D\u0438 \u0440\u0430\u0437\u043E\u043C", rotateButton: "\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u0448\u0430\u0440" } };
  var no = { tooltips: { placeMarker: "\u0130\u015Faret\xE7i yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n", firstVertex: "\u0130lk tepe noktas\u0131n\u0131 yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n", continueLine: "\xC7izime devam etmek i\xE7in t\u0131klay\u0131n", finishLine: "Bitirmek i\xE7in mevcut herhangi bir i\u015Faret\xE7iyi t\u0131klay\u0131n", finishPoly: "Bitirmek i\xE7in ilk i\u015Faret\xE7iyi t\u0131klay\u0131n", finishRect: "Bitirmek i\xE7in t\u0131klay\u0131n", startCircle: "Daire merkezine yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n", finishCircle: "Daireyi bitirmek i\xE7in t\u0131klay\u0131n", placeCircleMarker: "Daire i\u015Faret\xE7isi yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n" }, actions: { finish: "Bitir", cancel: "\u0130ptal", removeLastVertex: "Son k\xF6\u015Feyi kald\u0131r" }, buttonTitles: { drawMarkerButton: "\xC7izim \u0130\u015Faret\xE7isi", drawPolyButton: "\xC7okgenler \xE7iz", drawLineButton: "\xC7oklu \xE7izgi \xE7iz", drawCircleButton: "\xC7ember \xE7iz", drawRectButton: "Dikd\xF6rtgen \xE7iz", editButton: "Katmanlar\u0131 d\xFCzenle", dragButton: "Katmanlar\u0131 s\xFCr\xFCkle", cutButton: "Katmanlar\u0131 kes", deleteButton: "Katmanlar\u0131 kald\u0131r", drawCircleMarkerButton: "Daire i\u015Faret\xE7isi \xE7iz", snappingButton: "S\xFCr\xFCklenen i\u015Faret\xE7iyi di\u011Fer katmanlara ve k\xF6\u015Felere yap\u0131\u015Ft\u0131r", pinningButton: "Payla\u015F\u0131lan k\xF6\u015Feleri birbirine sabitle", rotateButton: "Katman\u0131 d\xF6nd\xFCr" } };
  var so = { tooltips: { placeMarker: "Kliknut\xEDm vytvo\u0159\xEDte zna\u010Dku", firstVertex: "Kliknut\xEDm vytvo\u0159\xEDte prvn\xED objekt", continueLine: "Kliknut\xEDm pokra\u010Dujte v kreslen\xED", finishLine: "Kliknut\xED na libovolnou existuj\xEDc\xED zna\u010Dku pro dokon\u010Den\xED", finishPoly: "Vyberte prvn\xED bod pro dokon\u010Den\xED", finishRect: "Klikn\u011Bte pro dokon\u010Den\xED", startCircle: "Kliknut\xEDm p\u0159idejte st\u0159ed kruhu", finishCircle: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0440\u0430\u0434\u0438\u0443\u0441", placeCircleMarker: "Kliknut\xEDm nastavte polom\u011Br" }, actions: { finish: "Dokon\u010Dit", cancel: "Zru\u0161it", removeLastVertex: "Zru\u0161it posledn\xED akci" }, buttonTitles: { drawMarkerButton: "P\u0159idat zna\u010Dku", drawPolyButton: "Nakreslit polygon", drawLineButton: "Nakreslit k\u0159ivku", drawCircleButton: "Nakreslit kruh", drawRectButton: "Nakreslit obd\xE9ln\xEDk", editButton: "Upravit vrstvu", dragButton: "P\u0159eneste vrstvu", cutButton: "Vyjmout vrstvu", deleteButton: "Smazat vrstvu", drawCircleMarkerButton: "P\u0159idat kruhovou zna\u010Dku", snappingButton: "Nav\xE1zat ta\u017Enou zna\u010Dku k dal\u0161\xEDm vrstv\xE1m a vrchol\u016Fm", pinningButton: "Spojit spole\u010Dn\xE9 body dohromady", rotateButton: "Oto\u010Dte vrstvu" } };
  var ao = { tooltips: { placeMarker: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30DE\u30FC\u30AB\u30FC\u3092\u914D\u7F6E", firstVertex: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u6700\u521D\u306E\u9802\u70B9\u3092\u914D\u7F6E", continueLine: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u63CF\u753B\u3092\u7D9A\u3051\u308B", finishLine: "\u4EFB\u610F\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86", finishPoly: "\u6700\u521D\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86", finishRect: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86", startCircle: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u306E\u4E2D\u5FC3\u3092\u914D\u7F6E", finishCircle: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u306E\u63CF\u753B\u3092\u7D42\u4E86", placeCircleMarker: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u30DE\u30FC\u30AB\u30FC\u3092\u914D\u7F6E", placeText: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30C6\u30AD\u30B9\u30C8\u3092\u914D\u7F6E" }, actions: { finish: "\u7D42\u4E86", cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB", removeLastVertex: "\u6700\u5F8C\u306E\u9802\u70B9\u3092\u524A\u9664" }, buttonTitles: { drawMarkerButton: "\u30DE\u30FC\u30AB\u30FC\u3092\u63CF\u753B", drawPolyButton: "\u30DD\u30EA\u30B4\u30F3\u3092\u63CF\u753B", drawLineButton: "\u6298\u308C\u7DDA\u3092\u63CF\u753B", drawCircleButton: "\u5186\u3092\u63CF\u753B", drawRectButton: "\u77E9\u5F62\u3092\u63CF\u753B", editButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u7DE8\u96C6", dragButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u30C9\u30E9\u30C3\u30B0", cutButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u5207\u308A\u53D6\u308A", deleteButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u524A\u9664", drawCircleMarkerButton: "\u5186\u30DE\u30FC\u30AB\u30FC\u3092\u63CF\u753B", snappingButton: "\u30C9\u30E9\u30C3\u30B0\u3057\u305F\u30DE\u30FC\u30AB\u30FC\u3092\u4ED6\u306E\u30EC\u30A4\u30E4\u30FC\u3084\u9802\u70B9\u306B\u30B9\u30CA\u30C3\u30D7\u3059\u308B", pinningButton: "\u5171\u6709\u3059\u308B\u9802\u70B9\u3092\u540C\u6642\u306B\u52D5\u304B\u3059", rotateButton: "\u30EC\u30A4\u30E4\u30FC\u3092\u56DE\u8EE2", drawTextButton: "\u30C6\u30AD\u30B9\u30C8\u3092\u63CF\u753B" } };
  var oo = { tooltips: { placeMarker: "Klikkaa asettaaksesi merkin", firstVertex: "Klikkaa asettaakseni ensimm\xE4isen osuuden", continueLine: "Klikkaa jatkaaksesi piirt\xE4mist\xE4", finishLine: "Klikkaa olemassa olevaa merkki\xE4 lopettaaksesi", finishPoly: "Klikkaa ensimm\xE4ist\xE4 merkki\xE4 lopettaaksesi", finishRect: "Klikkaa lopettaaksesi", startCircle: "Klikkaa asettaaksesi ympyr\xE4n keskipisteen", finishCircle: "Klikkaa lopettaaksesi ympyr\xE4n", placeCircleMarker: "Klikkaa asettaaksesi ympyr\xE4merkin", placeText: "Klikkaa asettaaksesi tekstin" }, actions: { finish: "Valmis", cancel: "Peruuta", removeLastVertex: "Poista viimeinen osuus" }, buttonTitles: { drawMarkerButton: "Piirr\xE4 merkkej\xE4", drawPolyButton: "Piirr\xE4 monikulmioita", drawLineButton: "Piirr\xE4 viivoja", drawCircleButton: "Piirr\xE4 ympyr\xE4", drawRectButton: "Piirr\xE4 neliskulmioita", editButton: "Muokkaa", dragButton: "Siirr\xE4", cutButton: "Leikkaa", deleteButton: "Poista", drawCircleMarkerButton: "Piirr\xE4 ympyr\xE4merkki", snappingButton: "Kiinnit\xE4 siirrett\xE4v\xE4 merkki toisiin muotoihin", pinningButton: "Kiinnit\xE4 jaetut muodot yhteen", rotateButton: "K\xE4\xE4nn\xE4", drawTextButton: "Piirr\xE4 teksti\xE4" } };
  var lo = { tooltips: { placeMarker: "\uB9C8\uCEE4 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694", firstVertex: "\uCCAB\uBC88\uC9F8 \uAF2D\uC9C0\uC810 \uC704\uCE58\uC744 \uD074\uB9AD\uD558\uC138\uC694", continueLine: "\uACC4\uC18D \uADF8\uB9AC\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694", finishLine: "\uB05D\uB0B4\uB824\uBA74 \uAE30\uC874 \uB9C8\uCEE4\uB97C \uD074\uB9AD\uD558\uC138\uC694", finishPoly: "\uB05D\uB0B4\uB824\uBA74 \uCC98\uC74C \uB9C8\uCEE4\uB97C \uD074\uB9AD\uD558\uC138\uC694", finishRect: "\uB05D\uB0B4\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694", startCircle: "\uC6D0\uC758 \uC911\uC2EC\uC774 \uB420 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694", finishCircle: "\uC6D0\uC744 \uB05D\uB0B4\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694", placeCircleMarker: "\uC6D0 \uB9C8\uCEE4 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694", placeText: "\uD14D\uC2A4\uD2B8 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694" }, actions: { finish: "\uB05D\uB0B4\uAE30", cancel: "\uCDE8\uC18C", removeLastVertex: "\uB9C8\uC9C0\uB9C9 \uAF2D\uC9C0\uC810 \uC81C\uAC70" }, buttonTitles: { drawMarkerButton: "\uB9C8\uCEE4 \uADF8\uB9AC\uAE30", drawPolyButton: "\uB2E4\uAC01\uD615 \uADF8\uB9AC\uAE30", drawLineButton: "\uB2E4\uAC01\uC120 \uADF8\uB9AC\uAE30", drawCircleButton: "\uC6D0 \uADF8\uB9AC\uAE30", drawRectButton: "\uC9C1\uC0AC\uAC01\uD615 \uADF8\uB9AC\uAE30", editButton: "\uB808\uC774\uC5B4 \uD3B8\uC9D1\uD558\uAE30", dragButton: "\uB808\uC774\uC5B4 \uB04C\uAE30", cutButton: "\uB808\uC774\uC5B4 \uC790\uB974\uAE30", deleteButton: "\uB808\uC774\uC5B4 \uC81C\uAC70\uD558\uAE30", drawCircleMarkerButton: "\uC6D0 \uB9C8\uCEE4 \uADF8\uB9AC\uAE30", snappingButton: "\uC7A1\uC544\uB048 \uB9C8\uCEE4\uB97C \uB2E4\uB978 \uB808\uC774\uC5B4 \uBC0F \uAF2D\uC9C0\uC810\uC5D0 \uB4E4\uB7EC\uBD99\uAC8C \uD558\uAE30", pinningButton: "\uACF5\uC720 \uAF2D\uC9C0\uC810\uC744 \uD568\uAED8 \uCC0D\uAE30", rotateButton: "\uB808\uC774\uC5B4 \uD68C\uC804\uD558\uAE30", drawTextButton: "\uD14D\uC2A4\uD2B8 \uADF8\uB9AC\uAE30" } };
  var ho = { tooltips: { placeMarker: "\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", firstVertex: "\u0411\u0438\u0440\u0438\u043D\u0447\u0438 \u0447\u043E\u043A\u0443\u043D\u0443 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443\u043D\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", continueLine: "\u0421\u04AF\u0440\u04E9\u0442 \u0442\u0430\u0440\u0442\u0443\u0443\u043D\u0443 \u0443\u043B\u0430\u043D\u0442\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", finishLine: "\u0410\u044F\u043A\u0442\u043E\u043E \u04AF\u0447\u04AF\u043D \u0443\u0447\u0443\u0440\u0434\u0430\u0433\u044B \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", finishPoly: "\u0411\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", finishRect: "\u0411\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", startCircle: "\u0410\u0439\u043B\u0430\u043D\u0430\u043D\u044B\u043D \u0431\u043E\u0440\u0431\u043E\u0440\u0443\u043D \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443\u043D\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", finishCircle: "\u0410\u0439\u043B\u0430\u043D\u0430\u043D\u044B \u0431\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", placeCircleMarker: "\u0422\u0435\u0433\u0435\u0440\u0435\u043A \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437", placeText: "\u0422\u0435\u043A\u0441\u0442\u0442\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437" }, actions: { finish: "\u0410\u044F\u0433\u044B", cancel: "\u0416\u043E\u043A \u043A\u044B\u043B\u0443\u0443", removeLastVertex: "\u0410\u043A\u044B\u0440\u043A\u044B \u0447\u043E\u043A\u0443\u043D\u0443 \u04E9\u0447\u04AF\u0440\u04AF\u04AF" }, buttonTitles: { drawMarkerButton: "\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0447\u0438\u0437\u0443\u0443", drawPolyButton: "\u041F\u043E\u043B\u0438\u0433\u043E\u043D \u0447\u0438\u0437\u0443\u0443", drawLineButton: "\u041F\u043E\u043B\u0438\u043B\u0438\u043D\u0438\u044F \u0447\u0438\u0437\u0443\u0443", drawCircleButton: "\u0414\u0430\u0439\u044B\u043D\u0434\u044B \u0447\u0438\u0437\u0443\u0443", drawRectButton: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A \u0447\u0438\u0437\u0443\u0443", editButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443 \u0442\u04AF\u0437\u04E9\u0442\u04AF\u04AF", dragButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443 \u043A\u0430\u0440\u0430\u043F \u0441\u04AF\u0439\u043B\u04E9\u04AF", cutButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u0431\u0430\u0448\u044B\u043D \u043A\u0435\u0441\u04AF\u04AF", deleteButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u0447\u04AF\u0440\u04AF\u04AF", drawCircleMarkerButton: "\u0414\u0430\u0439\u044B\u043D\u0434\u044B \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0447\u0438\u0437\u0443\u0443", snappingButton: "\u0411\u0430\u0448\u043A\u0430 \u0441\u043B\u043E\u043E\u043F\u0442\u043E\u0440\u0434\u0443\u043D \u0436\u0430\u043D\u0430 \u0432\u0435\u0440\u0442\u0435\u043A\u0441\u0442\u0435\u0440\u0434\u0438\u043D \u0430\u0440\u0430\u0441\u044B\u043D\u0430 \u0447\u0435\u043A\u0438\u043B\u0434\u04E9\u04E9", pinningButton: "\u0411\u04E9\u043B\u04AF\u0448\u043A\u04E9\u043D \u0432\u0435\u0440\u0442\u0435\u043A\u0441\u0442\u0435\u0440\u0434\u0438 \u0431\u0438\u0440\u0433\u0435 \u0442\u0443\u0442\u0443\u0448\u0442\u0443\u0440\u0443\u0443", rotateButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u0437\u0433\u04E9\u0440\u0442\u04AF\u04AF", drawTextButton: "\u0422\u0435\u043A\u0441\u0442 \u0447\u0438\u0437\u0443\u0443", scaleButton: "\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u043B\u0447\u04E9\u043C\u04AF\u043D \u04E9\u0437\u0433\u04E9\u0440\u0442\u04AF\u04AF", autoTracingButton: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0442\u044B\u043A \u0442\u0438\u0437\u043C\u0435\u0433\u0438 \u0447\u0438\u0437\u0443\u0443" }, measurements: { totalLength: "\u0423\u0437\u0443\u043D\u0434\u0443\u043A", segmentLength: "\u0421\u0435\u0433\u043C\u0435\u043D\u0442 \u0443\u0437\u0443\u043D\u0434\u0443\u0433\u0443", area: "\u0410\u0439\u043C\u0430\u043A", radius: "\u0420\u0430\u0434\u0438\u0443\u0441", perimeter: "\u041F\u0435\u0440\u0438\u043C\u0435\u0442\u0440", height: "\u0414\u0438\u0430\u043C\u0435\u0442\u0440", width: "\u041A\u0435\u043D\u0447\u0438\u043B\u0438\u043A", coordinates: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0442\u0430\u0440", coordinatesMarker: "\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438\u043D \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0442\u0430\u0440\u044B" } };
  var Nt = { en: Ga, de: qa, it: Na, id: za, ro: Fa, ru: Va, es: Ua, nl: ja, fr: Ka, pt_br: Ya, pt_pt: Ja, zh: Ha, zh_tw: Xa, pl: $a, sv: Za, el: Wa, hu: Qa, da: to, no: eo, fa: io, ua: ro, tr: no, cz: so, ja: ao, fi: oo, ko: lo, ky: ho };
  var mg = { _globalEditModeEnabled: false, enableGlobalEditMode(t) {
    let e = { ...t };
    this._globalEditModeEnabled = true, this.Toolbar.toggleButton("editMode", this.globalEditModeEnabled()), L.PM.Utils.findLayers(this.map).forEach((r) => {
      this._isRelevantForEdit(r) && r.pm.enable(e);
    }), this.throttledReInitEdit || (this.throttledReInitEdit = L.Util.throttle(this.handleLayerAdditionInGlobalEditMode, 100, this)), this._addedLayersEdit = {}, this.map.on("layeradd", this._layerAddedEdit, this), this.map.on("layeradd", this.throttledReInitEdit, this), this._fireGlobalEditModeToggled(true);
  }, disableGlobalEditMode() {
    this._globalEditModeEnabled = false, L.PM.Utils.findLayers(this.map).forEach((e) => {
      e.pm.disable();
    }), this.map.off("layeradd", this._layerAddedEdit, this), this.map.off("layeradd", this.throttledReInitEdit, this), this.Toolbar.toggleButton("editMode", this.globalEditModeEnabled()), this._fireGlobalEditModeToggled(false);
  }, globalEditEnabled() {
    return this.globalEditModeEnabled();
  }, globalEditModeEnabled() {
    return this._globalEditModeEnabled;
  }, toggleGlobalEditMode(t = this.globalOptions) {
    this.globalEditModeEnabled() ? this.disableGlobalEditMode() : this.enableGlobalEditMode(t);
  }, handleLayerAdditionInGlobalEditMode() {
    let t = this._addedLayersEdit;
    if (this._addedLayersEdit = {}, this.globalEditModeEnabled())
      for (let e in t) {
        let i = t[e];
        this._isRelevantForEdit(i) && i.pm.enable({ ...this.globalOptions });
      }
  }, _layerAddedEdit({ layer: t }) {
    this._addedLayersEdit[L.stamp(t)] = t;
  }, _isRelevantForEdit(t) {
    return t.pm && !(t instanceof L.LayerGroup) && (!L.PM.optIn && !t.options.pmIgnore || L.PM.optIn && t.options.pmIgnore === false) && !t._pmTempLayer && t.pm.options.allowEditing;
  } }, uo = mg;
  var _g = { _globalDragModeEnabled: false, enableGlobalDragMode() {
    let t = L.PM.Utils.findLayers(this.map);
    this._globalDragModeEnabled = true, this._addedLayersDrag = {}, t.forEach((e) => {
      this._isRelevantForDrag(e) && e.pm.enableLayerDrag();
    }), this.throttledReInitDrag || (this.throttledReInitDrag = L.Util.throttle(this.reinitGlobalDragMode, 100, this)), this.map.on("layeradd", this._layerAddedDrag, this), this.map.on("layeradd", this.throttledReInitDrag, this), this.Toolbar.toggleButton("dragMode", this.globalDragModeEnabled()), this._fireGlobalDragModeToggled(true);
  }, disableGlobalDragMode() {
    let t = L.PM.Utils.findLayers(this.map);
    this._globalDragModeEnabled = false, t.forEach((e) => {
      e.pm.disableLayerDrag();
    }), this.map.off("layeradd", this._layerAddedDrag, this), this.map.off("layeradd", this.throttledReInitDrag, this), this.Toolbar.toggleButton("dragMode", this.globalDragModeEnabled()), this._fireGlobalDragModeToggled(false);
  }, globalDragModeEnabled() {
    return !!this._globalDragModeEnabled;
  }, toggleGlobalDragMode() {
    this.globalDragModeEnabled() ? this.disableGlobalDragMode() : this.enableGlobalDragMode();
  }, reinitGlobalDragMode() {
    let t = this._addedLayersDrag;
    if (this._addedLayersDrag = {}, this.globalDragModeEnabled())
      for (let e in t) {
        let i = t[e];
        this._isRelevantForDrag(i) && i.pm.enableLayerDrag();
      }
  }, _layerAddedDrag({ layer: t }) {
    this._addedLayersDrag[L.stamp(t)] = t;
  }, _isRelevantForDrag(t) {
    return t.pm && !(t instanceof L.LayerGroup) && (!L.PM.optIn && !t.options.pmIgnore || L.PM.optIn && t.options.pmIgnore === false) && !t._pmTempLayer && t.pm.options.draggable;
  } }, co = _g;
  var yg = { _globalRemovalModeEnabled: false, enableGlobalRemovalMode() {
    this._globalRemovalModeEnabled = true, this.map.eachLayer((t) => {
      this._isRelevantForRemoval(t) && (t.pm.enabled() && t.pm.disable(), t.on("click", this.removeLayer, this));
    }), this.throttledReInitRemoval || (this.throttledReInitRemoval = L.Util.throttle(this.handleLayerAdditionInGlobalRemovalMode, 100, this)), this._addedLayersRemoval = {}, this.map.on("layeradd", this._layerAddedRemoval, this), this.map.on("layeradd", this.throttledReInitRemoval, this), this.Toolbar.toggleButton("removalMode", this.globalRemovalModeEnabled()), this._fireGlobalRemovalModeToggled(true);
  }, disableGlobalRemovalMode() {
    this._globalRemovalModeEnabled = false, this.map.eachLayer((t) => {
      t.off("click", this.removeLayer, this);
    }), this.map.off("layeradd", this._layerAddedRemoval, this), this.map.off("layeradd", this.throttledReInitRemoval, this), this.Toolbar.toggleButton("removalMode", this.globalRemovalModeEnabled()), this._fireGlobalRemovalModeToggled(false);
  }, globalRemovalEnabled() {
    return this.globalRemovalModeEnabled();
  }, globalRemovalModeEnabled() {
    return !!this._globalRemovalModeEnabled;
  }, toggleGlobalRemovalMode() {
    this.globalRemovalModeEnabled() ? this.disableGlobalRemovalMode() : this.enableGlobalRemovalMode();
  }, removeLayer(t) {
    let e = t.target;
    this._isRelevantForRemoval(e) && !e.pm.dragging() && (e.removeFrom(this.map.pm._getContainingLayer()), e.remove(), e instanceof L.LayerGroup ? (this._fireRemoveLayerGroup(e), this._fireRemoveLayerGroup(this.map, e)) : (e.pm._fireRemove(e), e.pm._fireRemove(this.map, e)));
  }, _isRelevantForRemoval(t) {
    return t.pm && !(t instanceof L.LayerGroup) && (!L.PM.optIn && !t.options.pmIgnore || L.PM.optIn && t.options.pmIgnore === false) && !t._pmTempLayer && t.pm.options.allowRemoval;
  }, handleLayerAdditionInGlobalRemovalMode() {
    let t = this._addedLayersRemoval;
    if (this._addedLayersRemoval = {}, this.globalRemovalModeEnabled())
      for (let e in t) {
        let i = t[e];
        this._isRelevantForRemoval(i) && (i.pm.enabled() && i.pm.disable(), i.on("click", this.removeLayer, this));
      }
  }, _layerAddedRemoval({ layer: t }) {
    this._addedLayersRemoval[L.stamp(t)] = t;
  } }, po = yg;
  var Lg = { _globalRotateModeEnabled: false, enableGlobalRotateMode() {
    this._globalRotateModeEnabled = true, L.PM.Utils.findLayers(this.map).filter((e) => e instanceof L.Polyline).forEach((e) => {
      this._isRelevantForRotate(e) && e.pm.enableRotate();
    }), this.throttledReInitRotate || (this.throttledReInitRotate = L.Util.throttle(this.handleLayerAdditionInGlobalRotateMode, 100, this)), this._addedLayersRotate = {}, this.map.on("layeradd", this._layerAddedRotate, this), this.map.on("layeradd", this.throttledReInitRotate, this), this.Toolbar.toggleButton("rotateMode", this.globalRotateModeEnabled()), this._fireGlobalRotateModeToggled();
  }, disableGlobalRotateMode() {
    this._globalRotateModeEnabled = false, L.PM.Utils.findLayers(this.map).filter((e) => e instanceof L.Polyline).forEach((e) => {
      e.pm.disableRotate();
    }), this.map.off("layeradd", this._layerAddedRotate, this), this.map.off("layeradd", this.throttledReInitRotate, this), this.Toolbar.toggleButton("rotateMode", this.globalRotateModeEnabled()), this._fireGlobalRotateModeToggled();
  }, globalRotateModeEnabled() {
    return !!this._globalRotateModeEnabled;
  }, toggleGlobalRotateMode() {
    this.globalRotateModeEnabled() ? this.disableGlobalRotateMode() : this.enableGlobalRotateMode();
  }, _isRelevantForRotate(t) {
    return t.pm && t instanceof L.Polyline && !(t instanceof L.LayerGroup) && (!L.PM.optIn && !t.options.pmIgnore || L.PM.optIn && t.options.pmIgnore === false) && !t._pmTempLayer && t.pm.options.allowRotation;
  }, handleLayerAdditionInGlobalRotateMode() {
    let t = this._addedLayersRotate;
    if (this._addedLayersRotate = {}, this.globalRotateModeEnabled())
      for (let e in t) {
        let i = t[e];
        this._isRelevantForRemoval(i) && i.pm.enableRotate();
      }
  }, _layerAddedRotate({ layer: t }) {
    this._addedLayersRotate[L.stamp(t)] = t;
  } }, fo = Lg;
  var go = xt(Ne()), bg = { _fireDrawStart(t = "Draw", e = {}) {
    this.__fire(this._map, "pm:drawstart", { shape: this._shape, workingLayer: this._layer }, t, e);
  }, _fireDrawEnd(t = "Draw", e = {}) {
    this.__fire(this._map, "pm:drawend", { shape: this._shape }, t, e);
  }, _fireCreate(t, e = "Draw", i = {}) {
    this.__fire(this._map, "pm:create", { shape: this._shape, marker: t, layer: t }, e, i);
  }, _fireCenterPlaced(t = "Draw", e = {}) {
    let i = t === "Draw" ? this._layer : void 0, r = t !== "Draw" ? this._layer : void 0;
    this.__fire(this._layer, "pm:centerplaced", { shape: this._shape, workingLayer: i, layer: r, latlng: this._layer.getLatLng() }, t, e);
  }, _fireCut(t, e, i, r = "Draw", n = {}) {
    this.__fire(t, "pm:cut", { shape: this._shape, layer: e, originalLayer: i }, r, n);
  }, _fireEdit(t = this._layer, e = "Edit", i = {}) {
    this.__fire(t, "pm:edit", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireEnable(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:enable", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireDisable(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:disable", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireUpdate(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:update", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireMarkerDragStart(t, e = void 0, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:markerdragstart", { layer: this._layer, markerEvent: t, shape: this.getShape(), indexPath: e }, i, r);
  }, _fireMarkerDrag(t, e = void 0, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:markerdrag", { layer: this._layer, markerEvent: t, shape: this.getShape(), indexPath: e }, i, r);
  }, _fireMarkerDragEnd(t, e = void 0, i = void 0, r = "Edit", n = {}) {
    this.__fire(this._layer, "pm:markerdragend", { layer: this._layer, markerEvent: t, shape: this.getShape(), indexPath: e, intersectionReset: i }, r, n);
  }, _fireDragStart(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:dragstart", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireDrag(t, e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:drag", { ...t, shape: this.getShape() }, e, i);
  }, _fireDragEnd(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:dragend", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireDragEnable(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:dragenable", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireDragDisable(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:dragdisable", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireRemove(t, e = t, i = "Edit", r = {}) {
    this.__fire(t, "pm:remove", { layer: e, shape: this.getShape() }, i, r);
  }, _fireVertexAdded(t, e, i, r = "Edit", n = {}) {
    this.__fire(this._layer, "pm:vertexadded", { layer: this._layer, workingLayer: this._layer, marker: t, indexPath: e, latlng: i, shape: this.getShape() }, r, n);
  }, _fireVertexRemoved(t, e, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:vertexremoved", { layer: this._layer, marker: t, indexPath: e, shape: this.getShape() }, i, r);
  }, _fireVertexClick(t, e, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:vertexclick", { layer: this._layer, markerEvent: t, indexPath: e, shape: this.getShape() }, i, r);
  }, _fireIntersect(t, e = this._layer, i = "Edit", r = {}) {
    this.__fire(e, "pm:intersect", { layer: this._layer, intersection: t, shape: this.getShape() }, i, r);
  }, _fireLayerReset(t, e, i = "Edit", r = {}) {
    this.__fire(this._layer, "pm:layerreset", { layer: this._layer, markerEvent: t, indexPath: e, shape: this.getShape() }, i, r);
  }, _fireChange(t, e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:change", { layer: this._layer, latlngs: t, shape: this.getShape() }, e, i);
  }, _fireTextChange(t, e = "Edit", i = {}) {
    this.__fire(this._layer, "pm:textchange", { layer: this._layer, text: t, shape: this.getShape() }, e, i);
  }, _fireTextFocus(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:textfocus", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireTextBlur(t = "Edit", e = {}) {
    this.__fire(this._layer, "pm:textblur", { layer: this._layer, shape: this.getShape() }, t, e);
  }, _fireSnapDrag(t, e, i = "Snapping", r = {}) {
    this.__fire(t, "pm:snapdrag", e, i, r);
  }, _fireSnap(t, e, i = "Snapping", r = {}) {
    this.__fire(t, "pm:snap", e, i, r);
  }, _fireUnsnap(t, e, i = "Snapping", r = {}) {
    this.__fire(t, "pm:unsnap", e, i, r);
  }, _fireRotationEnable(t, e, i = "Rotation", r = {}) {
    this.__fire(t, "pm:rotateenable", { layer: this._layer, helpLayer: this._rotatePoly, shape: this.getShape() }, i, r);
  }, _fireRotationDisable(t, e = "Rotation", i = {}) {
    this.__fire(t, "pm:rotatedisable", { layer: this._layer, shape: this.getShape() }, e, i);
  }, _fireRotationStart(t, e, i = "Rotation", r = {}) {
    this.__fire(t, "pm:rotatestart", { layer: this._rotationLayer, helpLayer: this._layer, startAngle: this._startAngle, originLatLngs: e }, i, r);
  }, _fireRotation(t, e, i, r = this._rotationLayer, n = "Rotation", s = {}) {
    this.__fire(t, "pm:rotate", { layer: r, helpLayer: this._layer, startAngle: this._startAngle, angle: r.pm.getAngle(), angleDiff: e, oldLatLngs: i, newLatLngs: r.getLatLngs() }, n, s);
  }, _fireRotationEnd(t, e, i, r = "Rotation", n = {}) {
    this.__fire(t, "pm:rotateend", { layer: this._rotationLayer, helpLayer: this._layer, startAngle: e, angle: this._rotationLayer.pm.getAngle(), originLatLngs: i, newLatLngs: this._rotationLayer.getLatLngs() }, r, n);
  }, _fireActionClick(t, e, i, r = "Toolbar", n = {}) {
    this.__fire(this._map, "pm:actionclick", { text: t.text, action: t, btnName: e, button: i }, r, n);
  }, _fireButtonClick(t, e, i = "Toolbar", r = {}) {
    this.__fire(this._map, "pm:buttonclick", { btnName: t, button: e }, i, r);
  }, _fireLangChange(t, e, i, r, n = "Global", s = {}) {
    this.__fire(this.map, "pm:langchange", { oldLang: t, activeLang: e, fallback: i, translations: r }, n, s);
  }, _fireGlobalDragModeToggled(t, e = "Global", i = {}) {
    this.__fire(this.map, "pm:globaldragmodetoggled", { enabled: t, map: this.map }, e, i);
  }, _fireGlobalEditModeToggled(t, e = "Global", i = {}) {
    this.__fire(this.map, "pm:globaleditmodetoggled", { enabled: t, map: this.map }, e, i);
  }, _fireGlobalRemovalModeToggled(t, e = "Global", i = {}) {
    this.__fire(this.map, "pm:globalremovalmodetoggled", { enabled: t, map: this.map }, e, i);
  }, _fireGlobalCutModeToggled(t = "Global", e = {}) {
    this.__fire(this._map, "pm:globalcutmodetoggled", { enabled: !!this._enabled, map: this._map }, t, e);
  }, _fireGlobalDrawModeToggled(t = "Global", e = {}) {
    this.__fire(this._map, "pm:globaldrawmodetoggled", { enabled: this._enabled, shape: this._shape, map: this._map }, t, e);
  }, _fireGlobalRotateModeToggled(t = "Global", e = {}) {
    this.__fire(this.map, "pm:globalrotatemodetoggled", { enabled: this.globalRotateModeEnabled(), map: this.map }, t, e);
  }, _fireRemoveLayerGroup(t, e = t, i = "Edit", r = {}) {
    this.__fire(t, "pm:remove", { layer: e, shape: void 0 }, i, r);
  }, _fireKeyeventEvent(t, e, i, r = "Global", n = {}) {
    this.__fire(this.map, "pm:keyevent", { event: t, eventType: e, focusOn: i }, r, n);
  }, __fire(t, e, i, r, n = {}) {
    i = (0, go.default)(i, n, { source: r }), L.PM.Utils._fireEvent(t, e, i);
  } }, Tt = bg;
  var vg = () => ({ _lastEvents: { keydown: void 0, keyup: void 0, current: void 0 }, _initKeyListener(t) {
    this.map = t, L.DomEvent.on(document, "keydown keyup", this._onKeyListener, this), L.DomEvent.on(window, "blur", this._onBlur, this), t.once("unload", this._unbindKeyListenerEvents, this);
  }, _unbindKeyListenerEvents() {
    L.DomEvent.off(document, "keydown keyup", this._onKeyListener, this), L.DomEvent.off(window, "blur", this._onBlur, this);
  }, _onKeyListener(t) {
    let e = "document";
    this.map.getContainer().contains(t.target) && (e = "map");
    let i = { event: t, eventType: t.type, focusOn: e };
    this._lastEvents[t.type] = i, this._lastEvents.current = i, this.map.pm._fireKeyeventEvent(t, t.type, e);
  }, _onBlur(t) {
    t.altKey = false;
    let e = { event: t, eventType: t.type, focusOn: "document" };
    this._lastEvents[t.type] = e, this._lastEvents.current = e;
  }, getLastKeyEvent(t = "current") {
    return this._lastEvents[t];
  }, isShiftKeyPressed() {
    return this._lastEvents.current?.event.shiftKey;
  }, isAltKeyPressed() {
    return this._lastEvents.current?.event.altKey;
  }, isCtrlKeyPressed() {
    return this._lastEvents.current?.event.ctrlKey;
  }, isMetaKeyPressed() {
    return this._lastEvents.current?.event.metaKey;
  }, getPressedKey() {
    return this._lastEvents.current?.event.key;
  } }), mo = vg;
  var wi = xt(Le());
  function V(t) {
    let e = L.PM.activeLang;
    return (0, wi.default)(Nt[e], t) || (0, wi.default)(Nt.en, t) || t;
  }
  function be(t) {
    for (let e = 0; e < t.length; e += 1) {
      let i = t[e];
      if (Array.isArray(i)) {
        if (be(i))
          return true;
      } else if (i != null && i !== "")
        return true;
    }
    return false;
  }
  function ve(t) {
    return t.reduce((e, i) => {
      if (i.length !== 0) {
        let r = Array.isArray(i) ? ve(i) : i;
        Array.isArray(r) ? r.length !== 0 && e.push(r) : e.push(r);
      }
      return e;
    }, []);
  }
  function sm(t, e, i) {
    let r = { a: L.CRS.Earth.R, b: 63567523142e-4, f: 0.0033528106647474805 }, { a: n, b: s, f: a } = r, o = t.lng, l = t.lat, u = i, f = Math.PI, d = e * f / 180, P = Math.sin(d), E = Math.cos(d), T = (1 - a) * Math.tan(l * f / 180), G = 1 / Math.sqrt(1 + T * T), _ = T * G, x = Math.atan2(T, E), b = G * P, R = 1 - b * b, D = R * (n * n - s * s) / (s * s), O = 1 + D / 16384 * (4096 + D * (-768 + D * (320 - 175 * D))), A = D / 1024 * (256 + D * (-128 + D * (74 - 47 * D))), q = u / (s * O), h = 2 * Math.PI, c, p, y;
    for (; Math.abs(q - h) > 1e-12; ) {
      c = Math.cos(2 * x + q), p = Math.sin(q), y = Math.cos(q);
      let B = A * p * (c + A / 4 * (y * (-1 + 2 * c * c) - A / 6 * c * (-3 + 4 * p * p) * (-3 + 4 * c * c)));
      h = q, q = u / (s * O) + B;
    }
    let g = _ * p - G * y * E, k = Math.atan2(_ * y + G * p * E, (1 - a) * Math.sqrt(b * b + g * g)), C = Math.atan2(p * P, G * y - _ * p * E), m = a / 16 * R * (4 + a * (4 - 3 * R)), v = C - (1 - m) * a * b * (q + m * p * (c + m * y * (-1 + 2 * c * c))), w = o + v * 180 / f, M = k * 180 / f;
    return L.latLng(w, M);
  }
  function Ci(t, e, i, r, n = true) {
    let s, a, o, l = [];
    for (let u = 0; u < i; u += 1) {
      if (n)
        s = u * 360 / i + r, a = sm(t, s, e), o = L.latLng(a.lng, a.lat);
      else {
        let f = t.lat + Math.cos(2 * u * Math.PI / i) * e, d = t.lng + Math.sin(2 * u * Math.PI / i) * e;
        o = L.latLng(f, d);
      }
      l.push(o);
    }
    return l;
  }
  function am(t, e, i) {
    e = (e + 360) % 360;
    let r = Math.PI / 180, n = 180 / Math.PI, { R: s } = L.CRS.Earth, a = t.lng * r, o = t.lat * r, l = e * r, u = Math.sin(o), f = Math.cos(o), d = Math.cos(i / s), P = Math.sin(i / s), E = Math.asin(u * d + f * P * Math.cos(l)), T = a + Math.atan2(Math.sin(l) * P * f, d - u * Math.sin(E));
    T *= n;
    let G = T - 360, _ = T < -180 ? T + 360 : T;
    return T = T > 180 ? G : _, L.latLng([E * n, T]);
  }
  function ke(t, e, i) {
    let r = t.latLngToContainerPoint(e), n = t.latLngToContainerPoint(i), s = Math.atan2(n.y - r.y, n.x - r.x) * 180 / Math.PI + 90;
    return s += s < 0 ? 360 : 0, s;
  }
  function te(t, e, i, r) {
    let n = ke(t, e, i);
    return am(e, n, r);
  }
  function jo(t, e, i = "asc") {
    if (!e || Object.keys(e).length === 0)
      return (l, u) => l - u;
    let r = Object.keys(e), n, s = r.length - 1, a = {};
    for (; s >= 0; )
      n = r[s], a[n.toLowerCase()] = e[n], s -= 1;
    function o(l) {
      if (l instanceof L.Marker)
        return "Marker";
      if (l instanceof L.Circle)
        return "Circle";
      if (l instanceof L.CircleMarker)
        return "CircleMarker";
      if (l instanceof L.Rectangle)
        return "Rectangle";
      if (l instanceof L.Polygon)
        return "Polygon";
      if (l instanceof L.Polyline)
        return "Line";
    }
    return (l, u) => {
      let f, d;
      if (t === "instanceofShape") {
        if (f = o(l.layer).toLowerCase(), d = o(u.layer).toLowerCase(), !f || !d)
          return 0;
      } else {
        if (!l.hasOwnProperty(t) || !u.hasOwnProperty(t))
          return 0;
        f = l[t].toLowerCase(), d = u[t].toLowerCase();
      }
      let P = f in a ? a[f] : Number.MAX_SAFE_INTEGER, E = d in a ? a[d] : Number.MAX_SAFE_INTEGER, T = 0;
      return P < E ? T = -1 : P > E && (T = 1), i === "desc" ? T * -1 : T;
    };
  }
  function vt(t, e = t.getLatLngs()) {
    return t instanceof L.Polygon ? L.polygon(e).getLatLngs() : L.polyline(e).getLatLngs();
  }
  function Ei(t, e) {
    if (e.options.crs?.projection?.MAX_LATITUDE) {
      let i = e.options.crs?.projection?.MAX_LATITUDE;
      t.lat = Math.max(Math.min(i, t.lat), -i);
    }
    return t;
  }
  function Rt(t) {
    return t.options.renderer || t._map && (t._map._getPaneRenderer(t.options.pane) || t._map.options.renderer || t._map._renderer) || t._renderer;
  }
  var om = L.Class.extend({ includes: [uo, co, po, fo, Tt], initialize(t) {
    this.map = t, this.Draw = new L.PM.Draw(t), this.Toolbar = new L.PM.Toolbar(t), this.Keyboard = mo(), this.globalOptions = { snappable: true, layerGroup: void 0, snappingOrder: ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], panes: { vertexPane: "markerPane", layerPane: "overlayPane", markerPane: "markerPane" }, draggable: true }, this.Keyboard._initKeyListener(t);
  }, setLang(t = "en", e, i = "en") {
    let r = L.PM.activeLang;
    e && (Nt[t] = (0, Pi.default)(Nt[i], e)), L.PM.activeLang = t, this.map.pm.Toolbar.reinit(), this._fireLangChange(r, t, i, Nt[t]);
  }, addControls(t) {
    this.Toolbar.addControls(t);
  }, removeControls() {
    this.Toolbar.removeControls();
  }, toggleControls() {
    this.Toolbar.toggleControls();
  }, controlsVisible() {
    return this.Toolbar.isVisible;
  }, enableDraw(t = "Polygon", e) {
    t === "Poly" && (t = "Polygon"), this.Draw.enable(t, e);
  }, disableDraw(t = "Polygon") {
    t === "Poly" && (t = "Polygon"), this.Draw.disable(t);
  }, setPathOptions(t, e = {}) {
    let i = e.ignoreShapes || [], r = e.merge || false;
    this.map.pm.Draw.shapes.forEach((n) => {
      i.indexOf(n) === -1 && this.map.pm.Draw[n].setPathOptions(t, r);
    });
  }, getGlobalOptions() {
    return this.globalOptions;
  }, setGlobalOptions(t) {
    let e = (0, Pi.default)(this.globalOptions, t);
    e.editable && (e.resizeableCircleMarker = e.editable, delete e.editable);
    let i = false;
    this.map.pm.Draw.CircleMarker.enabled() && !!this.map.pm.Draw.CircleMarker.options.resizeableCircleMarker != !!e.resizeableCircleMarker && (this.map.pm.Draw.CircleMarker.disable(), i = true);
    let r = false;
    this.map.pm.Draw.Circle.enabled() && !!this.map.pm.Draw.Circle.options.resizableCircle != !!e.resizableCircle && (this.map.pm.Draw.Circle.disable(), r = true), this.map.pm.Draw.shapes.forEach((s) => {
      this.map.pm.Draw[s].setOptions(e);
    }), i && this.map.pm.Draw.CircleMarker.enable(), r && this.map.pm.Draw.Circle.enable(), L.PM.Utils.findLayers(this.map).forEach((s) => {
      s.pm.setOptions(e);
    }), this.map.fire("pm:globaloptionschanged"), this.globalOptions = e, this.applyGlobalOptions();
  }, applyGlobalOptions() {
    L.PM.Utils.findLayers(this.map).forEach((e) => {
      e.pm.enabled() && e.pm.applyOptions();
    });
  }, globalDrawModeEnabled() {
    return !!this.Draw.getActiveShape();
  }, globalCutModeEnabled() {
    return !!this.Draw.Cut.enabled();
  }, enableGlobalCutMode(t) {
    return this.Draw.Cut.enable(t);
  }, toggleGlobalCutMode(t) {
    return this.Draw.Cut.toggle(t);
  }, disableGlobalCutMode() {
    return this.Draw.Cut.disable();
  }, getGeomanLayers(t = false) {
    let e = L.PM.Utils.findLayers(this.map);
    if (!t)
      return e;
    let i = L.featureGroup();
    return i._pmTempLayer = true, e.forEach((r) => {
      i.addLayer(r);
    }), i;
  }, getGeomanDrawLayers(t = false) {
    let e = L.PM.Utils.findLayers(this.map).filter((r) => r._drawnByGeoman === true);
    if (!t)
      return e;
    let i = L.featureGroup();
    return i._pmTempLayer = true, e.forEach((r) => {
      i.addLayer(r);
    }), i;
  }, _getContainingLayer() {
    return this.globalOptions.layerGroup && this.globalOptions.layerGroup instanceof L.LayerGroup ? this.globalOptions.layerGroup : this.map;
  }, _isCRSSimple() {
    return this.map.options.crs === L.CRS.Simple;
  }, _touchEventCounter: 0, _addTouchEvents(t) {
    this._touchEventCounter === 0 && (L.DomEvent.on(t, "touchmove", this._canvasTouchMove, this), L.DomEvent.on(t, "touchstart touchend touchcancel", this._canvasTouchClick, this)), this._touchEventCounter += 1;
  }, _removeTouchEvents(t) {
    this._touchEventCounter === 1 && (L.DomEvent.off(t, "touchmove", this._canvasTouchMove, this), L.DomEvent.off(t, "touchstart touchend touchcancel", this._canvasTouchClick, this)), this._touchEventCounter = this._touchEventCounter <= 1 ? 0 : this._touchEventCounter - 1;
  }, _canvasTouchMove(t) {
    Rt(this.map)._onMouseMove(this._createMouseEvent("mousemove", t));
  }, _canvasTouchClick(t) {
    let e = "";
    t.type === "touchstart" || t.type === "pointerdown" ? e = "mousedown" : (t.type === "touchend" || t.type === "pointerup" || t.type === "touchcancel" || t.type === "pointercancel") && (e = "mouseup"), e && Rt(this.map)._onClick(this._createMouseEvent(e, t));
  }, _createMouseEvent(t, e) {
    let i, r = e.touches[0] || e.changedTouches[0];
    try {
      i = new MouseEvent(t, { bubbles: e.bubbles, cancelable: e.cancelable, view: e.view, detail: r.detail, screenX: r.screenX, screenY: r.screenY, clientX: r.clientX, clientY: r.clientY, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey, metaKey: e.metaKey, button: e.button, relatedTarget: e.relatedTarget });
    } catch {
      i = document.createEvent("MouseEvents"), i.initMouseEvent(t, e.bubbles, e.cancelable, e.view, r.detail, r.screenX, r.screenY, r.clientX, r.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
    }
    return i;
  } }), Ko = om;
  var lm = L.Control.extend({ includes: [Tt], options: { position: "topleft", disableByOtherButtons: true }, initialize(t) {
    this._button = L.Util.extend({}, this.options, t);
  }, onAdd(t) {
    return this._map = t, this._map.pm.Toolbar.options.oneBlock ? this._container = this._map.pm.Toolbar._createContainer(this.options.position) : this._button.tool === "edit" ? this._container = this._map.pm.Toolbar.editContainer : this._button.tool === "options" ? this._container = this._map.pm.Toolbar.optionsContainer : this._button.tool === "custom" ? this._container = this._map.pm.Toolbar.customContainer : this._container = this._map.pm.Toolbar.drawContainer, this._renderButton(), this._container;
  }, _renderButton() {
    let t = this.buttonsDomNode;
    this.buttonsDomNode = this._makeButton(this._button), t ? t.replaceWith(this.buttonsDomNode) : this._container.appendChild(this.buttonsDomNode);
  }, onRemove() {
    return this.buttonsDomNode.remove(), this._container;
  }, getText() {
    return this._button.text;
  }, getIconUrl() {
    return this._button.iconUrl;
  }, destroy() {
    this._button = {}, this._update();
  }, toggle(t) {
    return typeof t == "boolean" ? this._button.toggleStatus = t : this._button.toggleStatus = !this._button.toggleStatus, this._applyStyleClasses(), this._button.toggleStatus;
  }, toggled() {
    return this._button.toggleStatus;
  }, onCreate() {
    this.toggle(false);
  }, disable() {
    this.toggle(false), this._button.disabled = true, this._updateDisabled();
  }, enable() {
    this._button.disabled = false, this._updateDisabled();
  }, _triggerClick(t) {
    t && t.preventDefault(), !this._button.disabled && (this._button.onClick(t, { button: this, event: t }), this._clicked(t), this._button.afterClick(t, { button: this, event: t }));
  }, _makeButton(t) {
    let e = this.options.position.indexOf("right") > -1 ? "pos-right" : "", i = L.DomUtil.create("div", `button-container  ${e}`, this._container);
    t.title && i.setAttribute("title", t.title);
    let r = L.DomUtil.create("a", "leaflet-buttons-control-button", i);
    r.setAttribute("role", "button"), r.setAttribute("tabindex", "0"), r.href = "#";
    let n = L.DomUtil.create("div", `leaflet-pm-actions-container ${e}`, i), s = t.actions, a = { cancel: { text: V("actions.cancel"), title: V("actions.cancel"), onClick() {
      this._triggerClick();
    } }, finishMode: { text: V("actions.finish"), title: V("actions.finish"), onClick() {
      this._triggerClick();
    } }, removeLastVertex: { text: V("actions.removeLastVertex"), title: V("actions.removeLastVertex"), onClick() {
      this._map.pm.Draw[t.jsClass]._removeLastVertex();
    } }, finish: { text: V("actions.finish"), title: V("actions.finish"), onClick(l) {
      this._map.pm.Draw[t.jsClass]._finishShape(l);
    } } };
    s.forEach((l) => {
      let u = typeof l == "string" ? l : l.name, f;
      if (a[u])
        f = a[u];
      else if (l.text)
        f = l;
      else
        return;
      let d = L.DomUtil.create("a", `leaflet-pm-action ${e} action-${u}`, n);
      if (d.setAttribute("role", "button"), d.setAttribute("tabindex", "0"), d.href = "#", f.title && (d.title = f.title), d.innerHTML = f.text, L.DomEvent.disableClickPropagation(d), L.DomEvent.on(d, "click", L.DomEvent.stop), !t.disabled && f.onClick) {
        let P = (E) => {
          E.preventDefault();
          let T = "", { buttons: G } = this._map.pm.Toolbar;
          for (let _ in G)
            if (G[_]._button === t) {
              T = _;
              break;
            }
          this._fireActionClick(f, T, t);
        };
        L.DomEvent.addListener(d, "click", P, this), L.DomEvent.addListener(d, "click", f.onClick, this);
      }
    }), t.toggleStatus && L.DomUtil.addClass(i, "active");
    let o = L.DomUtil.create("div", "control-icon", r);
    return t.iconUrl && o.setAttribute("src", t.iconUrl), t.className && L.DomUtil.addClass(o, t.className), L.DomEvent.disableClickPropagation(r), L.DomEvent.on(r, "click", L.DomEvent.stop), t.disabled || (L.DomEvent.addListener(r, "click", this._onBtnClick, this), L.DomEvent.addListener(r, "click", this._triggerClick, this)), t.disabled && (L.DomUtil.addClass(r, "pm-disabled"), r.setAttribute("aria-disabled", "true")), i;
  }, _applyStyleClasses() {
    this._container && (!this._button.toggleStatus || this._button.cssToggle === false ? (L.DomUtil.removeClass(this.buttonsDomNode, "active"), L.DomUtil.removeClass(this._container, "activeChild")) : (L.DomUtil.addClass(this.buttonsDomNode, "active"), L.DomUtil.addClass(this._container, "activeChild")));
  }, _onBtnClick() {
    if (this._button.disabled)
      return;
    this._button.disableOtherButtons && this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
    let t = "", { buttons: e } = this._map.pm.Toolbar;
    for (let i in e)
      if (e[i]._button === this._button) {
        t = i;
        break;
      }
    this._fireButtonClick(t, this._button);
  }, _clicked() {
    this._button.doToggle && this.toggle();
  }, _updateDisabled() {
    if (!this._container)
      return;
    let t = "pm-disabled", e = this.buttonsDomNode.children[0];
    this._button.disabled ? (L.DomUtil.addClass(e, t), e.setAttribute("aria-disabled", "true")) : (L.DomUtil.removeClass(e, t), e.setAttribute("aria-disabled", "false"));
  } }), Ho = lm;
  L.Control.PMButton = Ho;
  var hm = L.Class.extend({ options: { drawMarker: true, drawRectangle: true, drawPolyline: true, drawPolygon: true, drawCircle: true, drawCircleMarker: true, drawText: true, editMode: true, dragMode: true, cutPolygon: true, removalMode: true, rotateMode: true, snappingOption: true, drawControls: true, editControls: true, optionsControls: true, customControls: true, oneBlock: false, position: "topleft", positions: { draw: "", edit: "", options: "", custom: "" } }, customButtons: [], initialize(t) {
    this.customButtons = [], this.options.positions = { draw: "", edit: "", options: "", custom: "" }, this.init(t);
  }, reinit() {
    let t = this.isVisible;
    this.removeControls(), this._defineButtons(), t && this.addControls();
  }, init(t) {
    this.map = t, this.buttons = {}, this.isVisible = false, this.drawContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control"), this.editContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control"), this.optionsContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control"), this.customContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-custom leaflet-bar leaflet-control"), this._defineButtons();
  }, _createContainer(t) {
    let e = `${t}Container`;
    return this[e] || (this[e] = L.DomUtil.create("div", `leaflet-pm-toolbar leaflet-pm-${t} leaflet-bar leaflet-control`)), this[e];
  }, getButtons() {
    return this.buttons;
  }, addControls(t = this.options) {
    typeof t.editPolygon < "u" && (t.editMode = t.editPolygon), typeof t.deleteLayer < "u" && (t.removalMode = t.deleteLayer), L.Util.setOptions(this, t), this.applyIconStyle(), this.isVisible = true, this._showHideButtons();
  }, applyIconStyle() {
    let t = this.getButtons(), e = { geomanIcons: { drawMarker: "control-icon leaflet-pm-icon-marker", drawPolyline: "control-icon leaflet-pm-icon-polyline", drawRectangle: "control-icon leaflet-pm-icon-rectangle", drawPolygon: "control-icon leaflet-pm-icon-polygon", drawCircle: "control-icon leaflet-pm-icon-circle", drawCircleMarker: "control-icon leaflet-pm-icon-circle-marker", editMode: "control-icon leaflet-pm-icon-edit", dragMode: "control-icon leaflet-pm-icon-drag", cutPolygon: "control-icon leaflet-pm-icon-cut", removalMode: "control-icon leaflet-pm-icon-delete", drawText: "control-icon leaflet-pm-icon-text" } };
    for (let i in t) {
      let r = t[i];
      L.Util.setOptions(r, { className: e.geomanIcons[i] });
    }
  }, removeControls() {
    let t = this.getButtons();
    for (let e in t)
      t[e].remove();
    this.isVisible = false;
  }, toggleControls(t = this.options) {
    this.isVisible ? this.removeControls() : this.addControls(t);
  }, _addButton(t, e) {
    return this.buttons[t] = e, this.options[t] = !!this.options[t] || false, this.buttons[t];
  }, triggerClickOnToggledButtons(t) {
    for (let e in this.buttons) {
      let i = this.buttons[e];
      i._button.disableByOtherButtons && i !== t && i.toggled() && i._triggerClick();
    }
  }, toggleButton(t, e, i = true) {
    return t === "editPolygon" && (t = "editMode"), t === "deleteLayer" && (t = "removalMode"), i && this.triggerClickOnToggledButtons(this.buttons[t]), this.buttons[t] ? this.buttons[t].toggle(e) : false;
  }, _defineButtons() {
    let t = { className: "control-icon leaflet-pm-icon-marker", title: V("buttonTitles.drawMarkerButton"), jsClass: "Marker", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, actions: ["cancel"] }, e = { title: V("buttonTitles.drawPolyButton"), className: "control-icon leaflet-pm-icon-polygon", jsClass: "Polygon", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, i = { className: "control-icon leaflet-pm-icon-polyline", title: V("buttonTitles.drawLineButton"), jsClass: "Line", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, actions: ["finish", "removeLastVertex", "cancel"] }, r = { title: V("buttonTitles.drawCircleButton"), className: "control-icon leaflet-pm-icon-circle", jsClass: "Circle", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, actions: ["cancel"] }, n = { title: V("buttonTitles.drawCircleMarkerButton"), className: "control-icon leaflet-pm-icon-circle-marker", jsClass: "CircleMarker", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, actions: ["cancel"] }, s = { title: V("buttonTitles.drawRectButton"), className: "control-icon leaflet-pm-icon-rectangle", jsClass: "Rectangle", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, actions: ["cancel"] }, a = { title: V("buttonTitles.editButton"), className: "control-icon leaflet-pm-icon-edit", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalEditMode();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, tool: "edit", actions: ["finishMode"] }, o = { title: V("buttonTitles.dragButton"), className: "control-icon leaflet-pm-icon-drag", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalDragMode();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, tool: "edit", actions: ["finishMode"] }, l = { title: V("buttonTitles.cutButton"), className: "control-icon leaflet-pm-icon-cut", jsClass: "Cut", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle({ snappable: true, cursorMarker: true, allowSelfIntersection: false });
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, tool: "edit", actions: ["finish", "removeLastVertex", "cancel"] }, u = { title: V("buttonTitles.deleteButton"), className: "control-icon leaflet-pm-icon-delete", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRemovalMode();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, tool: "edit", actions: ["finishMode"] }, f = { title: V("buttonTitles.rotateButton"), className: "control-icon leaflet-pm-icon-rotate", onClick: () => {
    }, afterClick: () => {
      this.map.pm.toggleGlobalRotateMode();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, tool: "edit", actions: ["finishMode"] }, d = { className: "control-icon leaflet-pm-icon-text", title: V("buttonTitles.drawTextButton"), jsClass: "Text", onClick: () => {
    }, afterClick: (P, E) => {
      this.map.pm.Draw[E.button._button.jsClass].toggle();
    }, doToggle: true, toggleStatus: false, disableOtherButtons: true, position: this.options.position, actions: ["cancel"] };
    this._addButton("drawMarker", new L.Control.PMButton(t)), this._addButton("drawPolyline", new L.Control.PMButton(i)), this._addButton("drawRectangle", new L.Control.PMButton(s)), this._addButton("drawPolygon", new L.Control.PMButton(e)), this._addButton("drawCircle", new L.Control.PMButton(r)), this._addButton("drawCircleMarker", new L.Control.PMButton(n)), this._addButton("drawText", new L.Control.PMButton(d)), this._addButton("editMode", new L.Control.PMButton(a)), this._addButton("dragMode", new L.Control.PMButton(o)), this._addButton("cutPolygon", new L.Control.PMButton(l)), this._addButton("removalMode", new L.Control.PMButton(u)), this._addButton("rotateMode", new L.Control.PMButton(f));
  }, _showHideButtons() {
    if (!this.isVisible)
      return;
    this.removeControls(), this.isVisible = true;
    let t = this.getButtons(), e = [];
    this.options.drawControls === false && (e = e.concat(Object.keys(t).filter((i) => !t[i]._button.tool))), this.options.editControls === false && (e = e.concat(Object.keys(t).filter((i) => t[i]._button.tool === "edit"))), this.options.optionsControls === false && (e = e.concat(Object.keys(t).filter((i) => t[i]._button.tool === "options"))), this.options.customControls === false && (e = e.concat(Object.keys(t).filter((i) => t[i]._button.tool === "custom")));
    for (let i in t)
      if (this.options[i] && e.indexOf(i) === -1) {
        let r = t[i]._button.tool;
        r || (r = "draw"), t[i].setPosition(this._getBtnPosition(r)), t[i].addTo(this.map);
      }
  }, _getBtnPosition(t) {
    return this.options.positions && this.options.positions[t] ? this.options.positions[t] : this.options.position;
  }, setBlockPosition(t, e) {
    this.options.positions[t] = e, this._showHideButtons(), this.changeControlOrder();
  }, getBlockPositions() {
    return this.options.positions;
  }, copyDrawControl(t, e) {
    if (e)
      typeof e != "object" && (e = { name: e });
    else
      throw new TypeError("Button has no name");
    let i = this._btnNameMapping(t);
    if (!e.name)
      throw new TypeError("Button has no name");
    if (this.buttons[e.name])
      throw new TypeError("Button with this name already exists");
    let r = this.map.pm.Draw.createNewDrawInstance(e.name, i);
    e = { ...this.buttons[i]._button, ...e };
    let s = this.createCustomControl(e);
    return { drawInstance: r, control: s };
  }, createCustomControl(t) {
    if (!t.name)
      throw new TypeError("Button has no name");
    if (this.buttons[t.name])
      throw new TypeError("Button with this name already exists");
    t.onClick || (t.onClick = () => {
    }), t.afterClick || (t.afterClick = () => {
    }), t.toggle !== false && (t.toggle = true), t.block && (t.block = t.block.toLowerCase()), (!t.block || t.block === "draw") && (t.block = ""), t.className ? t.className.indexOf("control-icon") === -1 && (t.className = `control-icon ${t.className}`) : t.className = "control-icon";
    let e = { tool: t.block, className: t.className, title: t.title || "", jsClass: t.name, onClick: t.onClick, afterClick: t.afterClick, doToggle: t.toggle, toggleStatus: false, disableOtherButtons: t.disableOtherButtons ?? true, disableByOtherButtons: t.disableByOtherButtons ?? true, cssToggle: t.toggle, position: this.options.position, actions: t.actions || [], disabled: !!t.disabled };
    this.options[t.name] !== false && (this.options[t.name] = true);
    let i = this._addButton(t.name, new L.Control.PMButton(e));
    return this.changeControlOrder(), i;
  }, controlExists(t) {
    return !!this.getButton(t);
  }, getButton(t) {
    return this.getButtons()[t];
  }, getButtonsInBlock(t) {
    let e = {};
    if (t)
      for (let i in this.getButtons()) {
        let r = this.getButtons()[i];
        (r._button.tool === t || t === "draw" && !r._button.tool) && (e[i] = r);
      }
    return e;
  }, changeControlOrder(t = []) {
    let e = this._shapeMapping(), i = [];
    t.forEach((u) => {
      e[u] ? i.push(e[u]) : i.push(u);
    });
    let r = this.getButtons(), n = {};
    i.forEach((u) => {
      r[u] && (n[u] = r[u]);
    }), Object.keys(r).filter((u) => !r[u]._button.tool).forEach((u) => {
      i.indexOf(u) === -1 && (n[u] = r[u]);
    }), Object.keys(r).filter((u) => r[u]._button.tool === "edit").forEach((u) => {
      i.indexOf(u) === -1 && (n[u] = r[u]);
    }), Object.keys(r).filter((u) => r[u]._button.tool === "options").forEach((u) => {
      i.indexOf(u) === -1 && (n[u] = r[u]);
    }), Object.keys(r).filter((u) => r[u]._button.tool === "custom").forEach((u) => {
      i.indexOf(u) === -1 && (n[u] = r[u]);
    }), Object.keys(r).forEach((u) => {
      i.indexOf(u) === -1 && (n[u] = r[u]);
    }), this.map.pm.Toolbar.buttons = n, this._showHideButtons();
  }, getControlOrder() {
    let t = this.getButtons(), e = [];
    for (let i in t)
      e.push(i);
    return e;
  }, changeActionsOfControl(t, e) {
    let i = this._btnNameMapping(t);
    if (!i)
      throw new TypeError("No name passed");
    if (!e)
      throw new TypeError("No actions passed");
    if (!this.buttons[i])
      throw new TypeError("Button with this name not exists");
    this.buttons[i]._button.actions = e, this.changeControlOrder();
  }, setButtonDisabled(t, e) {
    let i = this._btnNameMapping(t);
    e ? this.buttons[i].disable() : this.buttons[i].enable();
  }, _shapeMapping() {
    return { Marker: "drawMarker", Circle: "drawCircle", Polygon: "drawPolygon", Rectangle: "drawRectangle", Polyline: "drawPolyline", Line: "drawPolyline", CircleMarker: "drawCircleMarker", Edit: "editMode", Drag: "dragMode", Cut: "cutPolygon", Removal: "removalMode", Rotate: "rotateMode", Text: "drawText" };
  }, _btnNameMapping(t) {
    let e = this._shapeMapping();
    return e[t] ? e[t] : t;
  } }), Xo = hm;
  var Yo = xt(Ne());
  var um = { _initSnappableMarkers() {
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, this._assignEvents(this._markers), this._layer.off("pm:dragstart", this._unsnap, this), this._layer.on("pm:dragstart", this._unsnap, this);
  }, _disableSnapping() {
    this._layer.off("pm:dragstart", this._unsnap, this);
  }, _assignEvents(t) {
    t.forEach((e) => {
      if (Array.isArray(e)) {
        this._assignEvents(e);
        return;
      }
      e.off("drag", this._handleSnapping, this), e.on("drag", this._handleSnapping, this), e.off("dragend", this._cleanupSnapping, this), e.on("dragend", this._cleanupSnapping, this);
    });
  }, _cleanupSnapping(t) {
    if (t) {
      let e = t.target;
      e._snapped = false;
    }
    delete this._snapList, this.throttledList && (this._map.off("layeradd", this.throttledList, this), this.throttledList = void 0), this._map.off("layerremove", this._handleSnapLayerRemoval, this), this.debugIndicatorLines && this.debugIndicatorLines.forEach((e) => {
      e.remove();
    });
  }, _handleThrottleSnapping() {
    this.throttledList && this._createSnapList();
  }, _handleSnapping(t) {
    let e = t.target;
    if (e._snapped = false, this.throttledList || (this.throttledList = L.Util.throttle(this._handleThrottleSnapping, 100, this)), t?.originalEvent?.altKey || this._map?.pm?.Keyboard.isAltKeyPressed() || (this._snapList === void 0 && (this._createSnapList(), this._map.off("layeradd", this.throttledList, this), this._map.on("layeradd", this.throttledList, this)), this._snapList.length <= 0))
      return false;
    let i = this._calcClosestLayer(e.getLatLng(), this._snapList);
    if (Object.keys(i).length === 0)
      return false;
    let r = i.layer instanceof L.Marker || i.layer instanceof L.CircleMarker || !this.options.snapSegment, n;
    r ? n = i.latlng : n = this._checkPrioritiySnapping(i);
    let s = this.options.snapDistance, a = { marker: e, shape: this._shape, snapLatLng: n, segment: i.segment, layer: this._layer, workingLayer: this._layer, layerInteractedWith: i.layer, distance: i.distance };
    if (this._fireSnapDrag(a.marker, a), this._fireSnapDrag(this._layer, a), i.distance < s) {
      e._orgLatLng = e.getLatLng(), e.setLatLng(n), e._snapped = true, e._snapInfo = a;
      let o = () => {
        this._snapLatLng = n, this._fireSnap(e, a), this._fireSnap(this._layer, a);
      }, l = this._snapLatLng || {}, u = n || {};
      (l.lat !== u.lat || l.lng !== u.lng) && o();
    } else
      this._snapLatLng && (this._unsnap(a), e._snapped = false, e._snapInfo = void 0, this._fireUnsnap(a.marker, a), this._fireUnsnap(this._layer, a));
    return true;
  }, _createSnapList() {
    let t = [], e = [], i = this._map;
    i.off("layerremove", this._handleSnapLayerRemoval, this), i.on("layerremove", this._handleSnapLayerRemoval, this), i.eachLayer((r) => {
      if ((r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.CircleMarker || r instanceof L.ImageOverlay) && r.options.snapIgnore !== true) {
        if (r.options.snapIgnore === void 0 && (!L.PM.optIn && r.options.pmIgnore === true || L.PM.optIn && r.options.pmIgnore !== false))
          return;
        (r instanceof L.Circle || r instanceof L.CircleMarker) && r.pm && r.pm._hiddenPolyCircle ? t.push(r.pm._hiddenPolyCircle) : r instanceof L.ImageOverlay && (r = L.rectangle(r.getBounds())), t.push(r);
        let n = L.polyline([], { color: "red", pmIgnore: true });
        n._pmTempLayer = true, e.push(n), (r instanceof L.Circle || r instanceof L.CircleMarker) && e.push(n);
      }
    }), t = t.filter((r) => this._layer !== r), t = t.filter((r) => r._latlng || r._latlngs && be(r._latlngs)), t = t.filter((r) => !r._pmTempLayer), this._otherSnapLayers ? (this._otherSnapLayers.forEach(() => {
      let r = L.polyline([], { color: "red", pmIgnore: true });
      r._pmTempLayer = true, e.push(r);
    }), this._snapList = t.concat(this._otherSnapLayers)) : this._snapList = t, this.debugIndicatorLines = e;
  }, _handleSnapLayerRemoval({ layer: t }) {
    if (!t._leaflet_id)
      return;
    let e = this._snapList.findIndex((i) => i._leaflet_id === t._leaflet_id);
    e > -1 && this._snapList.splice(e, 1);
  }, _calcClosestLayer(t, e) {
    return this._calcClosestLayers(t, e, 1)[0];
  }, _calcClosestLayers(t, e, i = 1) {
    let r = [], n = {};
    e.forEach((a, o) => {
      if (a._parentCopy && a._parentCopy === this._layer)
        return;
      let l = this._calcLayerDistances(t, a);
      if (l.distance = Math.floor(l.distance), this.debugIndicatorLines) {
        if (!this.debugIndicatorLines[o]) {
          let u = L.polyline([], { color: "red", pmIgnore: true });
          u._pmTempLayer = true, this.debugIndicatorLines[o] = u;
        }
        this.debugIndicatorLines[o].setLatLngs([t, l.latlng]);
      }
      i === 1 && (n.distance === void 0 || l.distance - 5 <= n.distance) ? (l.distance + 5 < n.distance && (r = []), n = l, n.layer = a, r.push(n)) : i !== 1 && (n = {}, n = l, n.layer = a, r.push(n));
    }), i !== 1 && (r = r.sort((a, o) => a.distance - o.distance)), i === -1 && (i = r.length);
    let s = this._getClosestLayerByPriority(r, i);
    return L.Util.isArray(s) ? s : [s];
  }, _calcLayerDistances(t, e) {
    let i = this._map, r = e instanceof L.Marker || e instanceof L.CircleMarker, n = e instanceof L.Polygon, s = t;
    if (r) {
      let a = e.getLatLng();
      return { latlng: { ...a }, distance: this._getDistance(i, a, s) };
    }
    return this._calcLatLngDistances(s, e.getLatLngs(), i, n);
  }, _calcLatLngDistances(t, e, i, r = false) {
    let n, s, a, o = (l) => {
      l.forEach((u, f) => {
        if (Array.isArray(u)) {
          o(u);
          return;
        }
        if (this.options.snapSegment) {
          let d = u, P;
          r ? P = f + 1 === l.length ? 0 : f + 1 : P = f + 1 === l.length ? void 0 : f + 1;
          let E = l[P];
          if (E) {
            let T = this._getDistanceToSegment(i, t, d, E);
            (s === void 0 || T < s) && (s = T, a = [d, E]);
          }
        } else {
          let d = this._getDistance(i, t, u);
          (s === void 0 || d < s) && (s = d, n = u);
        }
      });
    };
    return o(e), this.options.snapSegment ? { latlng: { ...this._getClosestPointOnSegment(i, t, a[0], a[1]) }, segment: a, distance: s } : { latlng: n, distance: s };
  }, _getClosestLayerByPriority(t, e = 1) {
    t = t.sort((a, o) => a._leaflet_id - o._leaflet_id);
    let i = ["Marker", "CircleMarker", "Circle", "Line", "Polygon", "Rectangle"], r = this._map.pm.globalOptions.snappingOrder || [], n = 0, s = {};
    return r.concat(i).forEach((a) => {
      s[a] || (n += 1, s[a] = n);
    }), t.sort(jo("instanceofShape", s)), e === 1 ? t[0] || {} : t.slice(0, e);
  }, _checkPrioritiySnapping(t) {
    let e = this._map, i = t.segment[0], r = t.segment[1], n = t.latlng, s = this._getDistance(e, i, n), a = this._getDistance(e, r, n), o = s < a ? i : r, l = s < a ? s : a;
    if (this.options.snapMiddle) {
      let d = L.PM.Utils.calcMiddleLatLng(e, i, r), P = this._getDistance(e, d, n);
      P < s && P < a && (o = d, l = P);
    }
    let u = this.options.snapDistance, f;
    return l < u ? f = o : f = n, { ...f };
  }, _unsnap() {
    delete this._snapLatLng;
  }, _getClosestPointOnSegment(t, e, i, r) {
    let n = t.getMaxZoom();
    n === 1 / 0 && (n = t.getZoom());
    let s = t.project(e, n), a = t.project(i, n), o = t.project(r, n), l = L.LineUtil.closestPointOnSegment(s, a, o);
    return t.unproject(l, n);
  }, _getDistanceToSegment(t, e, i, r) {
    let n = t.latLngToLayerPoint(e), s = t.latLngToLayerPoint(i), a = t.latLngToLayerPoint(r);
    return L.LineUtil.pointToSegmentDistance(n, s, a);
  }, _getDistance(t, e, i) {
    return t.latLngToLayerPoint(e).distanceTo(t.latLngToLayerPoint(i));
  } }, Fe = um;
  var cm = L.Class.extend({ includes: [Fe, Tt], options: { snappable: true, snapDistance: 20, snapMiddle: false, allowSelfIntersection: true, tooltips: true, templineStyle: {}, hintlineStyle: { color: "#3388ff", dashArray: "5,5" }, pathOptions: null, cursorMarker: true, finishOn: null, markerStyle: { draggable: true, icon: L.icon() }, hideMiddleMarkers: false, minRadiusCircle: null, maxRadiusCircle: null, minRadiusCircleMarker: null, maxRadiusCircleMarker: null, resizeableCircleMarker: false, resizableCircle: true, markerEditable: true, continueDrawing: false, snapSegment: true, requireSnapToFinish: false, rectangleAngle: 0 }, setOptions(t) {
    L.Util.setOptions(this, t), this.setStyle(this.options);
  }, setStyle() {
  }, getOptions() {
    return this.options;
  }, initialize(t) {
    let e = new L.Icon.Default();
    e.options.tooltipAnchor = [0, 0], this.options.markerStyle.icon = e, this._map = t, this.shapes = ["Marker", "CircleMarker", "Line", "Polygon", "Rectangle", "Circle", "Cut", "Text"], this.shapes.forEach((i) => {
      this[i] = new L.PM.Draw[i](this._map);
    }), this.Marker.setOptions({ continueDrawing: true }), this.CircleMarker.setOptions({ continueDrawing: true });
  }, setPathOptions(t, e = false) {
    e ? this.options.pathOptions = (0, Yo.default)(this.options.pathOptions, t) : this.options.pathOptions = t;
  }, getShapes() {
    return this.shapes;
  }, getShape() {
    return this._shape;
  }, enable(t, e) {
    if (!t)
      throw new Error(`Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(",")}`);
    this.disable(), this[t].enable(e);
  }, disable() {
    this.shapes.forEach((t) => {
      this[t].disable();
    });
  }, addControls() {
    this.shapes.forEach((t) => {
      this[t].addButton();
    });
  }, getActiveShape() {
    let t;
    return this.shapes.forEach((e) => {
      this[e]._enabled && (t = e);
    }), t;
  }, _setGlobalDrawMode() {
    this._shape === "Cut" ? this._fireGlobalCutModeToggled() : this._fireGlobalDrawModeToggled();
    let t = [];
    this._map.eachLayer((e) => {
      (e instanceof L.Polyline || e instanceof L.Marker || e instanceof L.Circle || e instanceof L.CircleMarker || e instanceof L.ImageOverlay) && (e._pmTempLayer || t.push(e));
    }), this._enabled ? t.forEach((e) => {
      L.PM.Utils.disablePopup(e);
    }) : t.forEach((e) => {
      L.PM.Utils.enablePopup(e);
    });
  }, createNewDrawInstance(t, e) {
    let i = this._getShapeFromBtnName(e);
    if (this[t])
      throw new TypeError("Draw Type already exists");
    if (!L.PM.Draw[i])
      throw new TypeError(`There is no class L.PM.Draw.${i}`);
    return this[t] = new L.PM.Draw[i](this._map), this[t].toolbarButtonName = t, this[t]._shape = t, this.shapes.push(t), this[e] && this[t].setOptions(this[e].options), this[t].setOptions(this[t].options), this[t];
  }, _getShapeFromBtnName(t) {
    let e = { drawMarker: "Marker", drawCircle: "Circle", drawPolygon: "Polygon", drawPolyline: "Line", drawRectangle: "Rectangle", drawCircleMarker: "CircleMarker", editMode: "Edit", dragMode: "Drag", cutPolygon: "Cut", removalMode: "Removal", rotateMode: "Rotate", drawText: "Text" };
    return e[t] ? e[t] : this[t] ? this[t]._shape : t;
  }, _finishLayer(t) {
    t.pm && (t.pm.setOptions(this.options), t.pm._shape = this._shape, t.pm._map = this._map), this._addDrawnLayerProp(t);
  }, _addDrawnLayerProp(t) {
    t._drawnByGeoman = true;
  }, _setPane(t, e) {
    e === "layerPane" ? t.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.layerPane || "overlayPane" : e === "vertexPane" ? t.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.vertexPane || "markerPane" : e === "markerPane" && (t.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.markerPane || "markerPane");
  }, _isFirstLayer() {
    return (this._map || this._layer._map).pm.getGeomanLayers().length === 0;
  } }), X = cm;
  X.Marker = X.extend({ initialize(t) {
    this._map = t, this._shape = "Marker", this.toolbarButtonName = "drawMarker";
  }, enable(t) {
    L.Util.setOptions(this, t), this._enabled = true, this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._hintMarker = L.marker(this._map.getCenter(), this.options.markerStyle), this._setPane(this._hintMarker, "markerPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this.options.tooltips && this._hintMarker.bindTooltip(V("tooltips.placeMarker"), { permanent: true, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this.options.markerEditable && this._map.eachLayer((e) => {
      this.isRelevantMarker(e) && e.pm.enable();
    }), this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._createMarker, this), this._hintMarker.remove(), this._map.off("mousemove", this._syncHintMarker, this), this._map.eachLayer((t) => {
      this.isRelevantMarker(t) && t.pm.disable();
    }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, isRelevantMarker(t) {
    return t instanceof L.Marker && t.pm && !t._pmTempLayer && !t.pm._initTextMarker;
  }, _syncHintMarker(t) {
    if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
      let e = t;
      e.target = this._hintMarker, this._handleSnapping(e);
    }
    this._fireChange(this._hintMarker.getLatLng(), "Draw");
  }, _createMarker(t) {
    if (!t.latlng || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer())
      return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._hintMarker.getLatLng(), i = new L.Marker(e, this.options.markerStyle);
    this._setPane(i, "markerPane"), this._finishLayer(i), i.pm || (i.options.draggable = false), i.addTo(this._map.pm._getContainingLayer()), i.pm && this.options.markerEditable ? i.pm.enable() : i.dragging && i.dragging.disable(), this._fireCreate(i), this._cleanupSnapping(), this.options.continueDrawing || this.disable();
  }, setStyle() {
    this.options.markerStyle?.icon && this._hintMarker?.setIcon(this.options.markerStyle.icon);
  } });
  var at = 63710088e-1, Jo = { centimeters: at * 100, centimetres: at * 100, degrees: at / 111325, feet: at * 3.28084, inches: at * 39.37, kilometers: at / 1e3, kilometres: at / 1e3, meters: at, metres: at, miles: at / 1609.344, millimeters: at * 1e3, millimetres: at * 1e3, nauticalmiles: at / 1852, radians: 1, yards: at * 1.0936 }, Qb = { centimeters: 100, centimetres: 100, degrees: 1 / 111325, feet: 3.28084, inches: 39.37, kilometers: 1 / 1e3, kilometres: 1 / 1e3, meters: 1, metres: 1, miles: 1 / 1609.344, millimeters: 1e3, millimetres: 1e3, nauticalmiles: 1 / 1852, radians: 1 / at, yards: 1.0936133 };
  function Dt(t, e, i) {
    i === void 0 && (i = {});
    var r = { type: "Feature" };
    return (i.id === 0 || i.id) && (r.id = i.id), i.bbox && (r.bbox = i.bbox), r.properties = e || {}, r.geometry = t, r;
  }
  function _t(t, e, i) {
    if (i === void 0 && (i = {}), !t)
      throw new Error("coordinates is required");
    if (!Array.isArray(t))
      throw new Error("coordinates must be an Array");
    if (t.length < 2)
      throw new Error("coordinates must be at least 2 numbers long");
    if (!Si(t[0]) || !Si(t[1]))
      throw new Error("coordinates must contain numbers");
    var r = { type: "Point", coordinates: t };
    return Dt(r, e, i);
  }
  function wt(t, e, i) {
    if (i === void 0 && (i = {}), t.length < 2)
      throw new Error("coordinates must be an array of two or more positions");
    var r = { type: "LineString", coordinates: t };
    return Dt(r, e, i);
  }
  function yt(t, e) {
    e === void 0 && (e = {});
    var i = { type: "FeatureCollection" };
    return e.id && (i.id = e.id), e.bbox && (i.bbox = e.bbox), i.features = t, i;
  }
  function $o(t, e) {
    e === void 0 && (e = "kilometers");
    var i = Jo[e];
    if (!i)
      throw new Error(e + " units is invalid");
    return t * i;
  }
  function Zo(t, e) {
    e === void 0 && (e = "kilometers");
    var i = Jo[e];
    if (!i)
      throw new Error(e + " units is invalid");
    return t / i;
  }
  function Me(t) {
    var e = t % (2 * Math.PI);
    return e * 180 / Math.PI;
  }
  function lt(t) {
    var e = t % 360;
    return e * Math.PI / 180;
  }
  function Si(t) {
    return !isNaN(t) && t !== null && !Array.isArray(t);
  }
  function zt(t) {
    var e, i, r = { type: "FeatureCollection", features: [] };
    if (t.type === "Feature" ? i = t.geometry : i = t, i.type === "LineString")
      e = [i.coordinates];
    else if (i.type === "MultiLineString")
      e = i.coordinates;
    else if (i.type === "MultiPolygon")
      e = [].concat.apply([], i.coordinates);
    else if (i.type === "Polygon")
      e = i.coordinates;
    else
      throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");
    return e.forEach(function(n) {
      e.forEach(function(s) {
        for (var a = 0; a < n.length - 1; a++)
          for (var o = a; o < s.length - 1; o++)
            if (!(n === s && (Math.abs(a - o) === 1 || a === 0 && o === n.length - 2 && n[a][0] === n[n.length - 1][0] && n[a][1] === n[n.length - 1][1]))) {
              var l = pm(n[a][0], n[a][1], n[a + 1][0], n[a + 1][1], s[o][0], s[o][1], s[o + 1][0], s[o + 1][1]);
              l && r.features.push(_t([l[0], l[1]]));
            }
      });
    }), r;
  }
  function pm(t, e, i, r, n, s, a, o) {
    var l, u, f, d, P, E = { x: null, y: null, onLine1: false, onLine2: false };
    return l = (o - s) * (i - t) - (a - n) * (r - e), l === 0 ? E.x !== null && E.y !== null ? E : false : (u = e - s, f = t - n, d = (a - n) * u - (o - s) * f, P = (i - t) * u - (r - e) * f, u = d / l, f = P / l, E.x = t + u * (i - t), E.y = e + u * (r - e), u >= 0 && u <= 1 && (E.onLine1 = true), f >= 0 && f <= 1 && (E.onLine2 = true), E.onLine1 && E.onLine2 ? [E.x, E.y] : false);
  }
  X.Line = X.extend({ initialize(t) {
    this._map = t, this._shape = "Line", this.toolbarButtonName = "drawPolyline", this._doesSelfIntersect = false;
  }, enable(t) {
    L.Util.setOptions(this, t), this._enabled = true, this._markers = [], this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = true, this._layerGroup.addTo(this._map), this._layer = L.polyline([], { ...this.options.templineStyle, pmIgnore: false }), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = true, this._layerGroup.addLayer(this._layer), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = true, this._layerGroup.addLayer(this._hintline), this._hintMarker = L.marker(this._map.getCenter(), { interactive: false, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(V("tooltips.firstVertex"), { permanent: true, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._createVertex, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.on(this.options.finishOn, this._finishShape, this), this.options.finishOn === "dblclick" && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled, this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()), this._map.on("mousemove", this._syncHintMarker, this), this._hintMarker.on("move", this._syncHintLine, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._otherSnapLayers = [], this.isRed = false, this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._createVertex, this), this._map.off("mousemove", this._syncHintMarker, this), this.options.finishOn && this.options.finishOn !== "snap" && this._map.off(this.options.finishOn, this._finishShape, this), this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.enable(), this._map.removeLayer(this._layerGroup), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, _syncHintLine() {
    let t = this._layer.getLatLngs();
    if (t.length > 0) {
      let e = t[t.length - 1];
      this._hintline.setLatLngs([e, this._hintMarker.getLatLng()]);
    }
  }, _syncHintMarker(t) {
    if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
      let i = t;
      i.target = this._hintMarker, this._handleSnapping(i);
    }
    this.options.allowSelfIntersection || this._handleSelfIntersection(true, this._hintMarker.getLatLng());
    let e = this._layer._defaultShape().slice();
    e.push(this._hintMarker.getLatLng()), this._change(e);
  }, hasSelfIntersection() {
    return zt(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersection(t, e) {
    let i = L.polyline(this._layer.getLatLngs());
    t && (e || (e = this._hintMarker.getLatLng()), i.addLatLng(e));
    let r = zt(i.toGeoJSON(15));
    this._doesSelfIntersect = r.features.length > 0, this._doesSelfIntersect ? this.isRed || (this.isRed = true, this._hintline.setStyle({ color: "#f00000ff" }), this._fireIntersect(r, this._map, "Draw")) : this._hintline.isEmpty() || (this.isRed = false, this._hintline.setStyle(this.options.hintlineStyle));
  }, _createVertex(t) {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(true, t.latlng), this._doesSelfIntersect))
      return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._hintMarker.getLatLng(), i = this._layer.getLatLngs(), r = i[i.length - 1];
    if (e.equals(i[0]) || i.length > 0 && e.equals(r)) {
      this._finishShape();
      return;
    }
    this._layer._latlngInfo = this._layer._latlngInfo || [], this._layer._latlngInfo.push({ latlng: e, snapInfo: this._hintMarker._snapInfo }), this._layer.addLatLng(e);
    let n = this._createMarker(e);
    this._setTooltipText(), this._setHintLineAfterNewVertex(e), this._fireVertexAdded(n, void 0, e, "Draw"), this._change(this._layer.getLatLngs()), this.options.finishOn === "snap" && this._hintMarker._snapped && this._finishShape(t);
  }, _setHintLineAfterNewVertex(t) {
    this._hintline.setLatLngs([t, t]);
  }, _removeLastVertex() {
    let t = this._markers;
    if (t.length <= 1) {
      this.disable();
      return;
    }
    let e = this._layer.getLatLngs(), i = t[t.length - 1], { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(t, i);
    t.pop(), this._layerGroup.removeLayer(i);
    let n = t[t.length - 1], s = e.indexOf(n.getLatLng());
    e = e.slice(0, s + 1), this._layer.setLatLngs(e), this._layer._latlngInfo.pop(), this._syncHintLine(), this._setTooltipText(), this._fireVertexRemoved(i, r, "Draw"), this._change(this._layer.getLatLngs());
  }, _finishShape() {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(false), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer())
      return;
    let t = this._layer.getLatLngs();
    if (t.length <= 1)
      return;
    let e = L.polyline(t, this.options.pathOptions);
    this._setPane(e, "layerPane"), this._finishLayer(e), e.addTo(this._map.pm._getContainingLayer()), this._fireCreate(e), this.options.snappable && this._cleanupSnapping(), this.disable(), this.options.continueDrawing && this.enable();
  }, _createMarker(t) {
    let e = new L.Marker(t, { draggable: false, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(e, "vertexPane"), e._pmTempLayer = true, this._layerGroup.addLayer(e), this._markers.push(e), e.on("click", this._finishShape, this), e;
  }, _setTooltipText() {
    let { length: t } = this._layer.getLatLngs().flat(), e = "";
    t <= 1 ? e = V("tooltips.continueLine") : e = V("tooltips.finishLine"), this._hintMarker.setTooltipContent(e);
  }, _change(t) {
    this._fireChange(t, "Draw");
  }, setStyle() {
    this._layer?.setStyle(this.options.templineStyle), this._hintline?.setStyle(this.options.hintlineStyle);
  } });
  X.Polygon = X.Line.extend({ initialize(t) {
    this._map = t, this._shape = "Polygon", this.toolbarButtonName = "drawPolygon";
  }, enable(t) {
    L.PM.Draw.Line.prototype.enable.call(this, t), this._layer.pm._shape = "Polygon";
  }, _createMarker(t) {
    let e = new L.Marker(t, { draggable: false, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(e, "vertexPane"), e._pmTempLayer = true, this._layerGroup.addLayer(e), this._markers.push(e), this._layer.getLatLngs().flat().length === 1 ? (e.on("click", this._finishShape, this), this._tempSnapLayerIndex = this._otherSnapLayers.push(e) - 1, this.options.snappable && this._cleanupSnapping()) : e.on("click", () => 1), e;
  }, _setTooltipText() {
    let { length: t } = this._layer.getLatLngs().flat(), e = "";
    t <= 2 ? e = V("tooltips.continueLine") : e = V("tooltips.finishPoly"), this._hintMarker.setTooltipContent(e);
  }, _finishShape() {
    if (!this.options.allowSelfIntersection && (this._handleSelfIntersection(true, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer())
      return;
    let t = this._layer.getLatLngs();
    if (t.length <= 2)
      return;
    let e = L.polygon(t, this.options.pathOptions);
    this._setPane(e, "layerPane"), this._finishLayer(e), e.addTo(this._map.pm._getContainingLayer()), this._fireCreate(e), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex, this.disable(), this.options.continueDrawing && this.enable();
  } });
  X.Rectangle = X.extend({ initialize(t) {
    this._map = t, this._shape = "Rectangle", this.toolbarButtonName = "drawRectangle";
  }, enable(t) {
    if (L.Util.setOptions(this, t), this._enabled = true, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = true, this._layerGroup.addTo(this._map), this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = true, this._startMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon rect-start-marker" }), draggable: false, zIndexOffset: -100, opacity: this.options.cursorMarker ? 1 : 0 }), this._setPane(this._startMarker, "vertexPane"), this._startMarker._pmTempLayer = true, this._layerGroup.addLayer(this._startMarker), this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 150, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(V("tooltips.firstVertex"), { permanent: true, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this.options.cursorMarker) {
      this._styleMarkers = [];
      for (let e = 0; e < 2; e += 1) {
        let i = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon rect-style-marker" }), draggable: false, zIndexOffset: 100 });
        this._setPane(i, "vertexPane"), i._pmTempLayer = true, this._layerGroup.addLayer(i), this._styleMarkers.push(i);
      }
    }
    this._map.getContainer().classList.add("geoman-draw-cursor"), this._map.on("click", this._placeStartingMarkers, this), this._map.on("mousemove", this._syncHintMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._otherSnapLayers = [], this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("click", this._finishShape, this), this._map.off("click", this._placeStartingMarkers, this), this._map.off("mousemove", this._syncHintMarker, this), this._map.removeLayer(this._layerGroup), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, _placeStartingMarkers(t) {
    this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._hintMarker.getLatLng();
    L.DomUtil.addClass(this._startMarker._icon, "visible"), this._startMarker.setLatLng(e), this.options.cursorMarker && this._styleMarkers && this._styleMarkers.forEach((i) => {
      L.DomUtil.addClass(i._icon, "visible"), i.setLatLng(e);
    }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._hintMarker.setTooltipContent(V("tooltips.finishRect")), this._setRectangleOrigin();
  }, _setRectangleOrigin() {
    let t = this._startMarker.getLatLng();
    t && (this._layerGroup.addLayer(this._layer), this._layer.setLatLngs([t, t]), this._hintMarker.on("move", this._syncRectangleSize, this));
  }, _syncHintMarker(t) {
    if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
      let i = t;
      i.target = this._hintMarker, this._handleSnapping(i);
    }
    let e = this._layerGroup && this._layerGroup.hasLayer(this._layer) ? this._layer.getLatLngs() : [this._hintMarker.getLatLng()];
    this._fireChange(e, "Draw");
  }, _syncRectangleSize() {
    let t = Ei(this._startMarker.getLatLng(), this._map), e = Ei(this._hintMarker.getLatLng(), this._map), i = L.PM.Utils._getRotatedRectangle(t, e, this.options.rectangleAngle || 0, this._map);
    if (this._layer.setLatLngs(i), this.options.cursorMarker && this._styleMarkers) {
      let r = [];
      i.forEach((n) => {
        !n.equals(t, 1e-8) && !n.equals(e, 1e-8) && r.push(n);
      }), r.forEach((n, s) => {
        try {
          this._styleMarkers[s].setLatLng(n);
        } catch {
        }
      });
    }
  }, _findCorners() {
    let t = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(t[0], t[2], this.options.rectangleAngle || 0, this._map);
  }, _finishShape(t) {
    this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._hintMarker.getLatLng(), i = this._startMarker.getLatLng();
    if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer() || i.equals(e))
      return;
    let r = L.rectangle([i, e], this.options.pathOptions);
    if (this.options.rectangleAngle) {
      let n = L.PM.Utils._getRotatedRectangle(i, e, this.options.rectangleAngle || 0, this._map);
      r.setLatLngs(n), r.pm && r.pm._setAngle(this.options.rectangleAngle || 0);
    }
    this._setPane(r, "layerPane"), this._finishLayer(r), r.addTo(this._map.pm._getContainingLayer()), this._fireCreate(r), this.disable(), this.options.continueDrawing && this.enable();
  }, setStyle() {
    this._layer?.setStyle(this.options.pathOptions);
  } });
  X.CircleMarker = X.extend({ initialize(t) {
    this._map = t, this._shape = "CircleMarker", this.toolbarButtonName = "drawCircleMarker", this._layerIsDragging = false, this._BaseCircleClass = L.CircleMarker, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._defaultRadius = 10;
  }, enable(t) {
    if (L.Util.setOptions(this, t), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), this._enabled = true, this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._map.getContainer().classList.add("geoman-draw-cursor"), this.options[this._editableOption]) {
      let e = {};
      L.extend(e, this.options.templineStyle), e.radius = 0, this._layerGroup = new L.FeatureGroup(), this._layerGroup._pmTempLayer = true, this._layerGroup.addTo(this._map), this._layer = new this._BaseCircleClass(this._map.getCenter(), e), this._setPane(this._layer, "layerPane"), this._layer._pmTempLayer = true, this._centerMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "marker-icon" }), draggable: false, zIndexOffset: 100 }), this._setPane(this._centerMarker, "vertexPane"), this._centerMarker._pmTempLayer = true, this._hintMarker = L.marker(this._map.getCenter(), { zIndexOffset: 110, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(V("tooltips.startCircle"), { permanent: true, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._hintline = L.polyline([], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = true, this._layerGroup.addLayer(this._hintline), this._map.on("click", this._placeCenterMarker, this);
    } else
      this._map.on("click", this._createMarker, this), this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), { radius: this._defaultRadius, ...this.options.templineStyle }), this._setPane(this._hintMarker, "layerPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this.options.tooltips && this._hintMarker.bindTooltip(V("tooltips.placeCircleMarker"), { permanent: true, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip();
    this._map.on("mousemove", this._syncHintMarker, this), this._extendingEnable(), this._otherSnapLayers = [], this._fireDrawStart(), this._setGlobalDrawMode();
  }, _extendingEnable() {
    !this.options[this._editableOption] && this.options.markerEditable && this._map.eachLayer((t) => {
      this.isRelevantMarker(t) && t.pm.enable();
    }), this._layer.bringToBack();
  }, disable() {
    this._enabled && (this._enabled = false, this._map.getContainer().classList.remove("geoman-draw-cursor"), this.options[this._editableOption] ? (this._map.off("click", this._finishShape, this), this._map.off("click", this._placeCenterMarker, this), this._map.removeLayer(this._layerGroup)) : (this._map.off("click", this._createMarker, this), this._extendingDisable(), this._hintMarker.remove()), this._map.off("mousemove", this._syncHintMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, _extendingDisable() {
    this._map.eachLayer((t) => {
      this.isRelevantMarker(t) && t.pm.disable();
    });
  }, enabled() {
    return this._enabled;
  }, toggle(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, _placeCenterMarker(t) {
    this._layerGroup.addLayer(this._layer), this._layerGroup.addLayer(this._centerMarker), this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._hintMarker.getLatLng();
    this._layerGroup.addLayer(this._layer), this._centerMarker.setLatLng(e), this._map.off("click", this._placeCenterMarker, this), this._map.on("click", this._finishShape, this), this._placeCircleCenter();
  }, _placeCircleCenter() {
    let t = this._centerMarker.getLatLng();
    t && (this._layer.setLatLng(t), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this), this._hintMarker.setTooltipContent(V("tooltips.finishCircle")), this._fireCenterPlaced(), this._fireChange(this._layer.getLatLng(), "Draw"));
  }, _syncHintLine() {
    let t = this._centerMarker.getLatLng(), e = this._getNewDestinationOfHintMarker();
    this._hintline.setLatLngs([t, e]);
  }, _syncCircleRadius() {
    let t = this._centerMarker.getLatLng(), e = this._hintMarker.getLatLng(), i = this._distanceCalculation(t, e);
    this.options[this._minRadiusOption] && i < this.options[this._minRadiusOption] ? this._layer.setRadius(this.options[this._minRadiusOption]) : this.options[this._maxRadiusOption] && i > this.options[this._maxRadiusOption] ? this._layer.setRadius(this.options[this._maxRadiusOption]) : this._layer.setRadius(i);
  }, _syncHintMarker(t) {
    if (this._hintMarker.setLatLng(t.latlng), this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker()), this.options.snappable) {
      let i = t;
      i.target = this._hintMarker, this._handleSnapping(i);
    }
    this._handleHintMarkerSnapping();
    let e = this._layerGroup && this._layerGroup.hasLayer(this._centerMarker) ? this._centerMarker.getLatLng() : this._hintMarker.getLatLng();
    this._fireChange(e, "Draw");
  }, isRelevantMarker(t) {
    return t instanceof L.CircleMarker && !(t instanceof L.Circle) && t.pm && !t._pmTempLayer;
  }, _createMarker(t) {
    if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer() || !t.latlng || this._layerIsDragging)
      return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._hintMarker.getLatLng(), i = new this._BaseCircleClass(e, { radius: this._defaultRadius, ...this.options.pathOptions });
    this._setPane(i, "layerPane"), this._finishLayer(i), i.addTo(this._map.pm._getContainingLayer()), this._extendingCreateMarker(i), this._fireCreate(i), this._cleanupSnapping(), this.options.continueDrawing || this.disable();
  }, _extendingCreateMarker(t) {
    t.pm && this.options.markerEditable && t.pm.enable();
  }, _finishShape(t) {
    if (this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer())
      return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._centerMarker.getLatLng(), i = this._defaultRadius;
    if (this.options[this._editableOption]) {
      let s = this._hintMarker.getLatLng();
      i = this._distanceCalculation(e, s), this.options[this._minRadiusOption] && i < this.options[this._minRadiusOption] ? i = this.options[this._minRadiusOption] : this.options[this._maxRadiusOption] && i > this.options[this._maxRadiusOption] && (i = this.options[this._maxRadiusOption]);
    }
    let r = { ...this.options.pathOptions, radius: i }, n = new this._BaseCircleClass(e, r);
    this._setPane(n, "layerPane"), this._finishLayer(n), n.addTo(this._map.pm._getContainingLayer()), n.pm && n.pm._updateHiddenPolyCircle(), this._fireCreate(n), this.disable(), this.options.continueDrawing && this.enable();
  }, _getNewDestinationOfHintMarker() {
    let t = this._hintMarker.getLatLng();
    if (this.options[this._editableOption]) {
      if (!this._layerGroup.hasLayer(this._centerMarker))
        return t;
      let e = this._centerMarker.getLatLng(), i = this._distanceCalculation(e, t);
      this.options[this._minRadiusOption] && i < this.options[this._minRadiusOption] ? t = te(this._map, e, t, this._getMinDistanceInMeter()) : this.options[this._maxRadiusOption] && i > this.options[this._maxRadiusOption] && (t = te(this._map, e, t, this._getMaxDistanceInMeter()));
    }
    return t;
  }, _getMinDistanceInMeter() {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._minRadiusOption], this._map, this._centerMarker.getLatLng());
  }, _getMaxDistanceInMeter() {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._maxRadiusOption], this._map, this._centerMarker.getLatLng());
  }, _handleHintMarkerSnapping() {
    if (this.options[this._editableOption]) {
      if (this._hintMarker._snapped) {
        let t = this._centerMarker.getLatLng(), e = this._hintMarker.getLatLng(), i = this._distanceCalculation(t, e);
        this._layerGroup.hasLayer(this._centerMarker) && (this.options[this._minRadiusOption] && i < this.options[this._minRadiusOption] ? this._hintMarker.setLatLng(this._hintMarker._orgLatLng) : this.options[this._maxRadiusOption] && i > this.options[this._maxRadiusOption] && this._hintMarker.setLatLng(this._hintMarker._orgLatLng));
      }
      this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());
    }
  }, setStyle() {
    let t = {};
    L.extend(t, this.options.templineStyle), this.options[this._editableOption] && (t.radius = 0), this._layer?.setStyle(t), this._hintline?.setStyle(this.options.hintlineStyle);
  }, _distanceCalculation(t, e) {
    return this._map.project(t).distanceTo(this._map.project(e));
  } });
  X.Circle = X.CircleMarker.extend({ initialize(t) {
    this._map = t, this._shape = "Circle", this.toolbarButtonName = "drawCircle", this._BaseCircleClass = L.Circle, this._minRadiusOption = "minRadiusCircle", this._maxRadiusOption = "maxRadiusCircle", this._editableOption = "resizableCircle", this._defaultRadius = 100;
  }, _extendingEnable() {
  }, _extendingDisable() {
  }, _extendingCreateMarker() {
  }, isRelevantMarker() {
  }, _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  }, _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  }, _distanceCalculation(t, e) {
    return this._map.distance(t, e);
  } });
  function rt(t) {
    if (!t)
      throw new Error("coord is required");
    if (!Array.isArray(t)) {
      if (t.type === "Feature" && t.geometry !== null && t.geometry.type === "Point")
        return t.geometry.coordinates;
      if (t.type === "Point")
        return t.coordinates;
    }
    if (Array.isArray(t) && t.length >= 2 && !Array.isArray(t[0]) && !Array.isArray(t[1]))
      return t;
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
  }
  function ot(t) {
    if (Array.isArray(t))
      return t;
    if (t.type === "Feature") {
      if (t.geometry !== null)
        return t.geometry.coordinates;
    } else if (t.coordinates)
      return t.coordinates;
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
  }
  function ee(t) {
    return t.type === "Feature" ? t.geometry : t;
  }
  function Bi(t, e) {
    return t.type === "FeatureCollection" ? "FeatureCollection" : t.type === "GeometryCollection" ? "GeometryCollection" : t.type === "Feature" && t.geometry !== null ? t.geometry.type : t.type;
  }
  function xe(t, e, i) {
    if (t !== null)
      for (var r, n, s, a, o, l, u, f = 0, d = 0, P, E = t.type, T = E === "FeatureCollection", G = E === "Feature", _ = T ? t.features.length : 1, x = 0; x < _; x++) {
        u = T ? t.features[x].geometry : G ? t.geometry : t, P = u ? u.type === "GeometryCollection" : false, o = P ? u.geometries.length : 1;
        for (var b = 0; b < o; b++) {
          var R = 0, D = 0;
          if (a = P ? u.geometries[b] : u, a !== null) {
            l = a.coordinates;
            var O = a.type;
            switch (f = i && (O === "Polygon" || O === "MultiPolygon") ? 1 : 0, O) {
              case null:
                break;
              case "Point":
                if (e(l, d, x, R, D) === false)
                  return false;
                d++, R++;
                break;
              case "LineString":
              case "MultiPoint":
                for (r = 0; r < l.length; r++) {
                  if (e(l[r], d, x, R, D) === false)
                    return false;
                  d++, O === "MultiPoint" && R++;
                }
                O === "LineString" && R++;
                break;
              case "Polygon":
              case "MultiLineString":
                for (r = 0; r < l.length; r++) {
                  for (n = 0; n < l[r].length - f; n++) {
                    if (e(l[r][n], d, x, R, D) === false)
                      return false;
                    d++;
                  }
                  O === "MultiLineString" && R++, O === "Polygon" && D++;
                }
                O === "Polygon" && R++;
                break;
              case "MultiPolygon":
                for (r = 0; r < l.length; r++) {
                  for (D = 0, n = 0; n < l[r].length; n++) {
                    for (s = 0; s < l[r][n].length - f; s++) {
                      if (e(l[r][n][s], d, x, R, D) === false)
                        return false;
                      d++;
                    }
                    D++;
                  }
                  R++;
                }
                break;
              case "GeometryCollection":
                for (r = 0; r < a.geometries.length; r++)
                  if (xe(a.geometries[r], e, i) === false)
                    return false;
                break;
              default:
                throw new Error("Unknown Geometry Type");
            }
          }
        }
      }
  }
  function Ft(t, e) {
    if (t.type === "Feature")
      e(t, 0);
    else if (t.type === "FeatureCollection")
      for (var i = 0; i < t.features.length && e(t.features[i], i) !== false; i++)
        ;
  }
  function Wo(t, e, i) {
    var r = i;
    return Ft(t, function(n, s) {
      s === 0 && i === void 0 ? r = n : r = e(r, n, s);
    }), r;
  }
  function fm(t, e) {
    var i, r, n, s, a, o, l, u, f, d, P = 0, E = t.type === "FeatureCollection", T = t.type === "Feature", G = E ? t.features.length : 1;
    for (i = 0; i < G; i++) {
      for (o = E ? t.features[i].geometry : T ? t.geometry : t, u = E ? t.features[i].properties : T ? t.properties : {}, f = E ? t.features[i].bbox : T ? t.bbox : void 0, d = E ? t.features[i].id : T ? t.id : void 0, l = o ? o.type === "GeometryCollection" : false, a = l ? o.geometries.length : 1, n = 0; n < a; n++) {
        if (s = l ? o.geometries[n] : o, s === null) {
          if (e(null, P, u, f, d) === false)
            return false;
          continue;
        }
        switch (s.type) {
          case "Point":
          case "LineString":
          case "MultiPoint":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon": {
            if (e(s, P, u, f, d) === false)
              return false;
            break;
          }
          case "GeometryCollection": {
            for (r = 0; r < s.geometries.length; r++)
              if (e(s.geometries[r], P, u, f, d) === false)
                return false;
            break;
          }
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
      P++;
    }
  }
  function ie(t, e) {
    fm(t, function(i, r, n, s, a) {
      var o = i === null ? null : i.type;
      switch (o) {
        case null:
        case "Point":
        case "LineString":
        case "Polygon":
          return e(Dt(i, n, { bbox: s, id: a }), r, 0) === false ? false : void 0;
      }
      var l;
      switch (o) {
        case "MultiPoint":
          l = "Point";
          break;
        case "MultiLineString":
          l = "LineString";
          break;
        case "MultiPolygon":
          l = "Polygon";
          break;
      }
      for (var u = 0; u < i.coordinates.length; u++) {
        var f = i.coordinates[u], d = { type: l, coordinates: f };
        if (e(Dt(d, n), r, u) === false)
          return false;
      }
    });
  }
  function dm(t) {
    if (!t)
      throw new Error("geojson is required");
    var e = [];
    return ie(t, function(i) {
      gm(i, e);
    }), yt(e);
  }
  function gm(t, e) {
    var i = [], r = t.geometry;
    if (r !== null) {
      switch (r.type) {
        case "Polygon":
          i = ot(r);
          break;
        case "LineString":
          i = [ot(r)];
      }
      i.forEach(function(n) {
        var s = mm(n, t.properties);
        s.forEach(function(a) {
          a.id = e.length, e.push(a);
        });
      });
    }
  }
  function mm(t, e) {
    var i = [];
    return t.reduce(function(r, n) {
      var s = wt([r, n], e);
      return s.bbox = _m(r, n), i.push(s), n;
    }), i;
  }
  function _m(t, e) {
    var i = t[0], r = t[1], n = e[0], s = e[1], a = i < n ? i : n, o = r < s ? r : s, l = i > n ? i : n, u = r > s ? r : s;
    return [a, o, l, u];
  }
  var we = dm;
  var gl = xt(Ui(), 1);
  function jm(t, e) {
    var i = {}, r = [];
    if (t.type === "LineString" && (t = Dt(t)), e.type === "LineString" && (e = Dt(e)), t.type === "Feature" && e.type === "Feature" && t.geometry !== null && e.geometry !== null && t.geometry.type === "LineString" && e.geometry.type === "LineString" && t.geometry.coordinates.length === 2 && e.geometry.coordinates.length === 2) {
      var n = dl(t, e);
      return n && r.push(n), yt(r);
    }
    var s = (0, gl.default)();
    return s.load(we(e)), Ft(we(t), function(a) {
      Ft(s.search(a), function(o) {
        var l = dl(a, o);
        if (l) {
          var u = ot(l).join(",");
          i[u] || (i[u] = true, r.push(l));
        }
      });
    }), yt(r);
  }
  function dl(t, e) {
    var i = ot(t), r = ot(e);
    if (i.length !== 2)
      throw new Error("<intersects> line1 must only contain 2 coordinates");
    if (r.length !== 2)
      throw new Error("<intersects> line2 must only contain 2 coordinates");
    var n = i[0][0], s = i[0][1], a = i[1][0], o = i[1][1], l = r[0][0], u = r[0][1], f = r[1][0], d = r[1][1], P = (d - u) * (a - n) - (f - l) * (o - s), E = (f - l) * (s - u) - (d - u) * (n - l), T = (a - n) * (s - u) - (o - s) * (n - l);
    if (P === 0)
      return null;
    var G = E / P, _ = T / P;
    if (G >= 0 && G <= 1 && _ >= 0 && _ <= 1) {
      var x = n + G * (a - n), b = s + G * (o - s);
      return _t([x, b]);
    }
    return null;
  }
  var pt = jm;
  var Xi = xt(Ui(), 1);
  function Km(t, e, i) {
    i === void 0 && (i = {});
    var r = rt(t), n = rt(e), s = lt(n[1] - r[1]), a = lt(n[0] - r[0]), o = lt(r[1]), l = lt(n[1]), u = Math.pow(Math.sin(s / 2), 2) + Math.pow(Math.sin(a / 2), 2) * Math.cos(o) * Math.cos(l);
    return $o(2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u)), i.units);
  }
  var Ct = Km;
  function Hm(t) {
    var e = t[0], i = t[1], r = t[2], n = t[3], s = Ct(t.slice(0, 2), [r, i]), a = Ct(t.slice(0, 2), [e, n]);
    if (s >= a) {
      var o = (i + n) / 2;
      return [e, o - (r - e) / 2, r, o + (r - e) / 2];
    } else {
      var l = (e + r) / 2;
      return [l - (n - i) / 2, i, l + (n - i) / 2, n];
    }
  }
  var ml = Hm;
  function ji(t) {
    var e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return xe(t, function(i) {
      e[0] > i[0] && (e[0] = i[0]), e[1] > i[1] && (e[1] = i[1]), e[2] < i[0] && (e[2] = i[0]), e[3] < i[1] && (e[3] = i[1]);
    }), e;
  }
  ji.default = ji;
  var Vt = ji;
  function Xm(t, e) {
    e === void 0 && (e = {});
    var i = e.precision, r = e.coordinates, n = e.mutate;
    if (i = i == null || isNaN(i) ? 6 : i, r = r == null || isNaN(r) ? 3 : r, !t)
      throw new Error("<geojson> is required");
    if (typeof i != "number")
      throw new Error("<precision> must be a number");
    if (typeof r != "number")
      throw new Error("<coordinates> must be a number");
    (n === false || n === void 0) && (t = JSON.parse(JSON.stringify(t)));
    var s = Math.pow(10, i);
    return xe(t, function(a) {
      Ym(a, s, r);
    }), t;
  }
  function Ym(t, e, i) {
    t.length > i && t.splice(i, t.length);
    for (var r = 0; r < t.length; r++)
      t[r] = Math.round(t[r] * e) / e;
    return t;
  }
  var _l = Xm;
  function Ke(t, e, i) {
    if (i === void 0 && (i = {}), i.final === true)
      return Jm(t, e);
    var r = rt(t), n = rt(e), s = lt(r[0]), a = lt(n[0]), o = lt(r[1]), l = lt(n[1]), u = Math.sin(a - s) * Math.cos(l), f = Math.cos(o) * Math.sin(l) - Math.sin(o) * Math.cos(l) * Math.cos(a - s);
    return Me(Math.atan2(u, f));
  }
  function Jm(t, e) {
    var i = Ke(e, t);
    return i = (i + 180) % 360, i;
  }
  function He(t, e, i, r) {
    r === void 0 && (r = {});
    var n = rt(t), s = lt(n[0]), a = lt(n[1]), o = lt(i), l = Zo(e, r.units), u = Math.asin(Math.sin(a) * Math.cos(l) + Math.cos(a) * Math.sin(l) * Math.cos(o)), f = s + Math.atan2(Math.sin(o) * Math.sin(l) * Math.cos(a), Math.cos(l) - Math.sin(a) * Math.sin(u)), d = Me(f), P = Me(u);
    return _t([d, P], r.properties);
  }
  function $m(t, e, i) {
    i === void 0 && (i = {});
    var r = _t([1 / 0, 1 / 0], { dist: 1 / 0 }), n = 0;
    return ie(t, function(s) {
      for (var a = ot(s), o = 0; o < a.length - 1; o++) {
        var l = _t(a[o]);
        l.properties.dist = Ct(e, l, i);
        var u = _t(a[o + 1]);
        u.properties.dist = Ct(e, u, i);
        var f = Ct(l, u, i), d = Math.max(l.properties.dist, u.properties.dist), P = Ke(l, u), E = He(e, d, P + 90, i), T = He(e, d, P - 90, i), G = pt(wt([E.geometry.coordinates, T.geometry.coordinates]), wt([l.geometry.coordinates, u.geometry.coordinates])), _ = null;
        G.features.length > 0 && (_ = G.features[0], _.properties.dist = Ct(e, _, i), _.properties.location = n + Ct(l, _, i)), l.properties.dist < r.properties.dist && (r = l, r.properties.index = o, r.properties.location = n), u.properties.dist < r.properties.dist && (r = u, r.properties.index = o + 1, r.properties.location = n + f), _ && _.properties.dist < r.properties.dist && (r = _, r.properties.index = o), n += f;
      }
    }), r;
  }
  var yl = $m;
  function Zm(t, e) {
    if (!t)
      throw new Error("line is required");
    if (!e)
      throw new Error("splitter is required");
    var i = Bi(t), r = Bi(e);
    if (i !== "LineString")
      throw new Error("line must be LineString");
    if (r === "FeatureCollection")
      throw new Error("splitter cannot be a FeatureCollection");
    if (r === "GeometryCollection")
      throw new Error("splitter cannot be a GeometryCollection");
    var n = _l(e, { precision: 7 });
    switch (r) {
      case "Point":
        return Hi(t, n);
      case "MultiPoint":
        return Ll(t, n);
      case "LineString":
      case "MultiLineString":
      case "Polygon":
      case "MultiPolygon":
        return Ll(t, pt(t, n));
    }
  }
  function Ll(t, e) {
    var i = [], r = (0, Xi.default)();
    return ie(e, function(n) {
      if (i.forEach(function(o, l) {
        o.id = l;
      }), !i.length)
        i = Hi(t, n).features, i.forEach(function(o) {
          o.bbox || (o.bbox = ml(Vt(o)));
        }), r.load(yt(i));
      else {
        var s = r.search(n);
        if (s.features.length) {
          var a = bl(n, s);
          i = i.filter(function(o) {
            return o.id !== a.id;
          }), r.remove(a), Ft(Hi(a, n), function(o) {
            i.push(o), r.insert(o);
          });
        }
      }
    }), yt(i);
  }
  function Hi(t, e) {
    var i = [], r = ot(t)[0], n = ot(t)[t.geometry.coordinates.length - 1];
    if (Ki(r, rt(e)) || Ki(n, rt(e)))
      return yt([t]);
    var s = (0, Xi.default)(), a = we(t);
    s.load(a);
    var o = s.search(e);
    if (!o.features.length)
      return yt([t]);
    var l = bl(e, o), u = [r], f = Wo(a, function(d, P, E) {
      var T = ot(P)[1], G = rt(e);
      return E === l.id ? (d.push(G), i.push(wt(d)), Ki(G, T) ? [G] : [G, T]) : (d.push(T), d);
    }, u);
    return f.length > 1 && i.push(wt(f)), yt(i);
  }
  function bl(t, e) {
    if (!e.features.length)
      throw new Error("lines must contain features");
    if (e.features.length === 1)
      return e.features[0];
    var i, r = 1 / 0;
    return Ft(e, function(n) {
      var s = yl(n, t), a = s.properties.dist;
      a < r && (i = n, r = a);
    }), i;
  }
  function Ki(t, e) {
    return t[0] === e[0] && t[1] === e[1];
  }
  var vl = Zm;
  function ne(t, e, i) {
    if (i === void 0 && (i = {}), !t)
      throw new Error("point is required");
    if (!e)
      throw new Error("polygon is required");
    var r = rt(t), n = ee(e), s = n.type, a = e.bbox, o = n.coordinates;
    if (a && Wm(r, a) === false)
      return false;
    s === "Polygon" && (o = [o]);
    for (var l = false, u = 0; u < o.length && !l; u++)
      if (kl(r, o[u][0], i.ignoreBoundary)) {
        for (var f = false, d = 1; d < o[u].length && !f; )
          kl(r, o[u][d], !i.ignoreBoundary) && (f = true), d++;
        f || (l = true);
      }
    return l;
  }
  function kl(t, e, i) {
    var r = false;
    e[0][0] === e[e.length - 1][0] && e[0][1] === e[e.length - 1][1] && (e = e.slice(0, e.length - 1));
    for (var n = 0, s = e.length - 1; n < e.length; s = n++) {
      var a = e[n][0], o = e[n][1], l = e[s][0], u = e[s][1], f = t[1] * (a - l) + o * (l - t[0]) + u * (t[0] - a) === 0 && (a - t[0]) * (l - t[0]) <= 0 && (o - t[1]) * (u - t[1]) <= 0;
      if (f)
        return !i;
      var d = o > t[1] != u > t[1] && t[0] < (l - a) * (t[1] - o) / (u - o) + a;
      d && (r = !r);
    }
    return r;
  }
  function Wm(t, e) {
    return e[0] <= t[0] && e[1] <= t[1] && e[2] >= t[0] && e[3] >= t[1];
  }
  function Qm(t, e, i) {
    i === void 0 && (i = {});
    for (var r = rt(t), n = ot(e), s = 0; s < n.length - 1; s++) {
      var a = false;
      if (i.ignoreEndVertices && (s === 0 && (a = "start"), s === n.length - 2 && (a = "end"), s === 0 && s + 1 === n.length - 1 && (a = "both")), t_(n[s], n[s + 1], r, a, typeof i.epsilon > "u" ? null : i.epsilon))
        return true;
    }
    return false;
  }
  function t_(t, e, i, r, n) {
    var s = i[0], a = i[1], o = t[0], l = t[1], u = e[0], f = e[1], d = i[0] - o, P = i[1] - l, E = u - o, T = f - l, G = d * T - P * E;
    if (n !== null) {
      if (Math.abs(G) > n)
        return false;
    } else if (G !== 0)
      return false;
    if (r) {
      if (r === "start")
        return Math.abs(E) >= Math.abs(T) ? E > 0 ? o < s && s <= u : u <= s && s < o : T > 0 ? l < a && a <= f : f <= a && a < l;
      if (r === "end")
        return Math.abs(E) >= Math.abs(T) ? E > 0 ? o <= s && s < u : u < s && s <= o : T > 0 ? l <= a && a < f : f < a && a <= l;
      if (r === "both")
        return Math.abs(E) >= Math.abs(T) ? E > 0 ? o < s && s < u : u < s && s < o : T > 0 ? l < a && a < f : f < a && a < l;
    } else
      return Math.abs(E) >= Math.abs(T) ? E > 0 ? o <= s && s <= u : u <= s && s <= o : T > 0 ? l <= a && a <= f : f <= a && a <= l;
    return false;
  }
  var se = Qm;
  function Yi(t, e) {
    var i = ee(t), r = ee(e), n = i.type, s = r.type, a = i.coordinates, o = r.coordinates;
    switch (n) {
      case "Point":
        switch (s) {
          case "Point":
            return Ji(a, o);
          default:
            throw new Error("feature2 " + s + " geometry not supported");
        }
      case "MultiPoint":
        switch (s) {
          case "Point":
            return e_(i, r);
          case "MultiPoint":
            return i_(i, r);
          default:
            throw new Error("feature2 " + s + " geometry not supported");
        }
      case "LineString":
        switch (s) {
          case "Point":
            return se(r, i, { ignoreEndVertices: true });
          case "LineString":
            return s_(i, r);
          case "MultiPoint":
            return r_(i, r);
          default:
            throw new Error("feature2 " + s + " geometry not supported");
        }
      case "Polygon":
        switch (s) {
          case "Point":
            return ne(r, i, { ignoreBoundary: true });
          case "LineString":
            return a_(i, r);
          case "Polygon":
            return o_(i, r);
          case "MultiPoint":
            return n_(i, r);
          default:
            throw new Error("feature2 " + s + " geometry not supported");
        }
      default:
        throw new Error("feature1 " + n + " geometry not supported");
    }
  }
  function e_(t, e) {
    var i, r = false;
    for (i = 0; i < t.coordinates.length; i++)
      if (Ji(t.coordinates[i], e.coordinates)) {
        r = true;
        break;
      }
    return r;
  }
  function i_(t, e) {
    for (var i = 0, r = e.coordinates; i < r.length; i++) {
      for (var n = r[i], s = false, a = 0, o = t.coordinates; a < o.length; a++) {
        var l = o[a];
        if (Ji(n, l)) {
          s = true;
          break;
        }
      }
      if (!s)
        return false;
    }
    return true;
  }
  function r_(t, e) {
    for (var i = false, r = 0, n = e.coordinates; r < n.length; r++) {
      var s = n[r];
      if (se(s, t, { ignoreEndVertices: true }) && (i = true), !se(s, t))
        return false;
    }
    return !!i;
  }
  function n_(t, e) {
    for (var i = 0, r = e.coordinates; i < r.length; i++) {
      var n = r[i];
      if (!ne(n, t, { ignoreBoundary: true }))
        return false;
    }
    return true;
  }
  function s_(t, e) {
    for (var i = false, r = 0, n = e.coordinates; r < n.length; r++) {
      var s = n[r];
      if (se({ type: "Point", coordinates: s }, t, { ignoreEndVertices: true }) && (i = true), !se({ type: "Point", coordinates: s }, t, { ignoreEndVertices: false }))
        return false;
    }
    return i;
  }
  function a_(t, e) {
    var i = false, r = 0, n = Vt(t), s = Vt(e);
    if (!Ml(n, s))
      return false;
    for (r; r < e.coordinates.length - 1; r++) {
      var a = l_(e.coordinates[r], e.coordinates[r + 1]);
      if (ne({ type: "Point", coordinates: a }, t, { ignoreBoundary: true })) {
        i = true;
        break;
      }
    }
    return i;
  }
  function o_(t, e) {
    if (t.type === "Feature" && t.geometry === null || e.type === "Feature" && e.geometry === null)
      return false;
    var i = Vt(t), r = Vt(e);
    if (!Ml(i, r))
      return false;
    for (var n = ee(e).coordinates, s = 0, a = n; s < a.length; s++)
      for (var o = a[s], l = 0, u = o; l < u.length; l++) {
        var f = u[l];
        if (!ne(f, t))
          return false;
      }
    return true;
  }
  function Ml(t, e) {
    return !(t[0] > e[0] || t[2] < e[2] || t[1] > e[1] || t[3] < e[3]);
  }
  function Ji(t, e) {
    return t[0] === e[0] && t[1] === e[1];
  }
  function l_(t, e) {
    return [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2];
  }
  var Kl = xt(Le());
  var Xe = (t) => () => t;
  var Ee = (t) => {
    let e = t ? (i, r) => r.minus(i).abs().isLessThanOrEqualTo(t) : Xe(false);
    return (i, r) => e(i, r) ? 0 : i.comparedTo(r);
  };
  function xl(t) {
    let e = t ? (i, r, n, s, a) => i.exponentiatedBy(2).isLessThanOrEqualTo(s.minus(r).exponentiatedBy(2).plus(a.minus(n).exponentiatedBy(2)).times(t)) : Xe(false);
    return (i, r, n) => {
      let s = i.x, a = i.y, o = n.x, l = n.y, u = a.minus(l).times(r.x.minus(o)).minus(s.minus(o).times(r.y.minus(l)));
      return e(u, s, a, o, l) ? 0 : u.comparedTo(0);
    };
  }
  var h_ = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, $i = Math.ceil, dt = Math.floor, ht = "[BigNumber Error] ", wl = ht + "Number primitive has more than 15 significant digits: ", Lt = 1e14, F = 14, Zi = 9007199254740991, Wi = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], At = 1e7, tt = 1e9;
  function Cl(t) {
    var e, i, r, n = b.prototype = { constructor: b, toString: null, valueOf: null }, s = new b(1), a = 20, o = 4, l = -7, u = 21, f = -1e7, d = 1e7, P = false, E = 1, T = 0, G = { prefix: "", groupSize: 3, secondaryGroupSize: 0, groupSeparator: ",", decimalSeparator: ".", fractionGroupSize: 0, fractionGroupSeparator: "\xA0", suffix: "" }, _ = "0123456789abcdefghijklmnopqrstuvwxyz", x = true;
    function b(h, c) {
      var p, y, g, k, C, m, v, w, M = this;
      if (!(M instanceof b))
        return new b(h, c);
      if (c == null) {
        if (h && h._isBigNumber === true) {
          M.s = h.s, !h.c || h.e > d ? M.c = M.e = null : h.e < f ? M.c = [M.e = 0] : (M.e = h.e, M.c = h.c.slice());
          return;
        }
        if ((m = typeof h == "number") && h * 0 == 0) {
          if (M.s = 1 / h < 0 ? (h = -h, -1) : 1, h === ~~h) {
            for (k = 0, C = h; C >= 10; C /= 10, k++)
              ;
            k > d ? M.c = M.e = null : (M.e = k, M.c = [h]);
            return;
          }
          w = String(h);
        } else {
          if (!h_.test(w = String(h)))
            return r(M, w, m);
          M.s = w.charCodeAt(0) == 45 ? (w = w.slice(1), -1) : 1;
        }
        (k = w.indexOf(".")) > -1 && (w = w.replace(".", "")), (C = w.search(/e/i)) > 0 ? (k < 0 && (k = C), k += +w.slice(C + 1), w = w.substring(0, C)) : k < 0 && (k = w.length);
      } else {
        if (J(c, 2, _.length, "Base"), c == 10 && x)
          return M = new b(h), A(M, a + M.e + 1, o);
        if (w = String(h), m = typeof h == "number") {
          if (h * 0 != 0)
            return r(M, w, m, c);
          if (M.s = 1 / h < 0 ? (w = w.slice(1), -1) : 1, b.DEBUG && w.replace(/^0\.0*|\./, "").length > 15)
            throw Error(wl + h);
        } else
          M.s = w.charCodeAt(0) === 45 ? (w = w.slice(1), -1) : 1;
        for (p = _.slice(0, c), k = C = 0, v = w.length; C < v; C++)
          if (p.indexOf(y = w.charAt(C)) < 0) {
            if (y == ".") {
              if (C > k) {
                k = v;
                continue;
              }
            } else if (!g && (w == w.toUpperCase() && (w = w.toLowerCase()) || w == w.toLowerCase() && (w = w.toUpperCase()))) {
              g = true, C = -1, k = 0;
              continue;
            }
            return r(M, String(h), m, c);
          }
        m = false, w = i(w, c, 10, M.s), (k = w.indexOf(".")) > -1 ? w = w.replace(".", "") : k = w.length;
      }
      for (C = 0; w.charCodeAt(C) === 48; C++)
        ;
      for (v = w.length; w.charCodeAt(--v) === 48; )
        ;
      if (w = w.slice(C, ++v)) {
        if (v -= C, m && b.DEBUG && v > 15 && (h > Zi || h !== dt(h)))
          throw Error(wl + M.s * h);
        if ((k = k - C - 1) > d)
          M.c = M.e = null;
        else if (k < f)
          M.c = [M.e = 0];
        else {
          if (M.e = k, M.c = [], C = (k + 1) % F, k < 0 && (C += F), C < v) {
            for (C && M.c.push(+w.slice(0, C)), v -= F; C < v; )
              M.c.push(+w.slice(C, C += F));
            C = F - (w = w.slice(C)).length;
          } else
            C -= v;
          for (; C--; w += "0")
            ;
          M.c.push(+w);
        }
      } else
        M.c = [M.e = 0];
    }
    b.clone = Cl, b.ROUND_UP = 0, b.ROUND_DOWN = 1, b.ROUND_CEIL = 2, b.ROUND_FLOOR = 3, b.ROUND_HALF_UP = 4, b.ROUND_HALF_DOWN = 5, b.ROUND_HALF_EVEN = 6, b.ROUND_HALF_CEIL = 7, b.ROUND_HALF_FLOOR = 8, b.EUCLID = 9, b.config = b.set = function(h) {
      var c, p;
      if (h != null)
        if (typeof h == "object") {
          if (h.hasOwnProperty(c = "DECIMAL_PLACES") && (p = h[c], J(p, 0, tt, c), a = p), h.hasOwnProperty(c = "ROUNDING_MODE") && (p = h[c], J(p, 0, 8, c), o = p), h.hasOwnProperty(c = "EXPONENTIAL_AT") && (p = h[c], p && p.pop ? (J(p[0], -tt, 0, c), J(p[1], 0, tt, c), l = p[0], u = p[1]) : (J(p, -tt, tt, c), l = -(u = p < 0 ? -p : p))), h.hasOwnProperty(c = "RANGE"))
            if (p = h[c], p && p.pop)
              J(p[0], -tt, -1, c), J(p[1], 1, tt, c), f = p[0], d = p[1];
            else if (J(p, -tt, tt, c), p)
              f = -(d = p < 0 ? -p : p);
            else
              throw Error(ht + c + " cannot be zero: " + p);
          if (h.hasOwnProperty(c = "CRYPTO"))
            if (p = h[c], p === !!p)
              if (p)
                if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                  P = p;
                else
                  throw P = !p, Error(ht + "crypto unavailable");
              else
                P = p;
            else
              throw Error(ht + c + " not true or false: " + p);
          if (h.hasOwnProperty(c = "MODULO_MODE") && (p = h[c], J(p, 0, 9, c), E = p), h.hasOwnProperty(c = "POW_PRECISION") && (p = h[c], J(p, 0, tt, c), T = p), h.hasOwnProperty(c = "FORMAT"))
            if (p = h[c], typeof p == "object")
              G = p;
            else
              throw Error(ht + c + " not an object: " + p);
          if (h.hasOwnProperty(c = "ALPHABET"))
            if (p = h[c], typeof p == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(p))
              x = p.slice(0, 10) == "0123456789", _ = p;
            else
              throw Error(ht + c + " invalid: " + p);
        } else
          throw Error(ht + "Object expected: " + h);
      return { DECIMAL_PLACES: a, ROUNDING_MODE: o, EXPONENTIAL_AT: [l, u], RANGE: [f, d], CRYPTO: P, MODULO_MODE: E, POW_PRECISION: T, FORMAT: G, ALPHABET: _ };
    }, b.isBigNumber = function(h) {
      if (!h || h._isBigNumber !== true)
        return false;
      if (!b.DEBUG)
        return true;
      var c, p, y = h.c, g = h.e, k = h.s;
      t:
        if ({}.toString.call(y) == "[object Array]") {
          if ((k === 1 || k === -1) && g >= -tt && g <= tt && g === dt(g)) {
            if (y[0] === 0) {
              if (g === 0 && y.length === 1)
                return true;
              break t;
            }
            if (c = (g + 1) % F, c < 1 && (c += F), String(y[0]).length == c) {
              for (c = 0; c < y.length; c++)
                if (p = y[c], p < 0 || p >= Lt || p !== dt(p))
                  break t;
              if (p !== 0)
                return true;
            }
          }
        } else if (y === null && g === null && (k === null || k === 1 || k === -1))
          return true;
      throw Error(ht + "Invalid BigNumber: " + h);
    }, b.maximum = b.max = function() {
      return D(arguments, -1);
    }, b.minimum = b.min = function() {
      return D(arguments, 1);
    }, b.random = function() {
      var h = 9007199254740992, c = Math.random() * h & 2097151 ? function() {
        return dt(Math.random() * h);
      } : function() {
        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
      };
      return function(p) {
        var y, g, k, C, m, v = 0, w = [], M = new b(s);
        if (p == null ? p = a : J(p, 0, tt), C = $i(p / F), P)
          if (crypto.getRandomValues) {
            for (y = crypto.getRandomValues(new Uint32Array(C *= 2)); v < C; )
              m = y[v] * 131072 + (y[v + 1] >>> 11), m >= 9e15 ? (g = crypto.getRandomValues(new Uint32Array(2)), y[v] = g[0], y[v + 1] = g[1]) : (w.push(m % 1e14), v += 2);
            v = C / 2;
          } else if (crypto.randomBytes) {
            for (y = crypto.randomBytes(C *= 7); v < C; )
              m = (y[v] & 31) * 281474976710656 + y[v + 1] * 1099511627776 + y[v + 2] * 4294967296 + y[v + 3] * 16777216 + (y[v + 4] << 16) + (y[v + 5] << 8) + y[v + 6], m >= 9e15 ? crypto.randomBytes(7).copy(y, v) : (w.push(m % 1e14), v += 7);
            v = C / 7;
          } else
            throw P = false, Error(ht + "crypto unavailable");
        if (!P)
          for (; v < C; )
            m = c(), m < 9e15 && (w[v++] = m % 1e14);
        for (C = w[--v], p %= F, C && p && (m = Wi[F - p], w[v] = dt(C / m) * m); w[v] === 0; w.pop(), v--)
          ;
        if (v < 0)
          w = [k = 0];
        else {
          for (k = -1; w[0] === 0; w.splice(0, 1), k -= F)
            ;
          for (v = 1, m = w[0]; m >= 10; m /= 10, v++)
            ;
          v < F && (k -= F - v);
        }
        return M.e = k, M.c = w, M;
      };
    }(), b.sum = function() {
      for (var h = 1, c = arguments, p = new b(c[0]); h < c.length; )
        p = p.plus(c[h++]);
      return p;
    }, i = /* @__PURE__ */ function() {
      var h = "0123456789";
      function c(p, y, g, k) {
        for (var C, m = [0], v, w = 0, M = p.length; w < M; ) {
          for (v = m.length; v--; m[v] *= y)
            ;
          for (m[0] += k.indexOf(p.charAt(w++)), C = 0; C < m.length; C++)
            m[C] > g - 1 && (m[C + 1] == null && (m[C + 1] = 0), m[C + 1] += m[C] / g | 0, m[C] %= g);
        }
        return m.reverse();
      }
      return function(p, y, g, k, C) {
        var m, v, w, M, B, I, N, j, $ = p.indexOf("."), W = a, U = o;
        for ($ >= 0 && (M = T, T = 0, p = p.replace(".", ""), j = new b(y), I = j.pow(p.length - $), T = M, j.c = c(Et(ft(I.c), I.e, "0"), 10, g, h), j.e = j.c.length), N = c(p, y, g, C ? (m = _, h) : (m = h, _)), w = M = N.length; N[--M] == 0; N.pop())
          ;
        if (!N[0])
          return m.charAt(0);
        if ($ < 0 ? --w : (I.c = N, I.e = w, I.s = k, I = e(I, j, W, U, g), N = I.c, B = I.r, w = I.e), v = w + W + 1, $ = N[v], M = g / 2, B = B || v < 0 || N[v + 1] != null, B = U < 4 ? ($ != null || B) && (U == 0 || U == (I.s < 0 ? 3 : 2)) : $ > M || $ == M && (U == 4 || B || U == 6 && N[v - 1] & 1 || U == (I.s < 0 ? 8 : 7)), v < 1 || !N[0])
          p = B ? Et(m.charAt(1), -W, m.charAt(0)) : m.charAt(0);
        else {
          if (N.length = v, B)
            for (--g; ++N[--v] > g; )
              N[v] = 0, v || (++w, N = [1].concat(N));
          for (M = N.length; !N[--M]; )
            ;
          for ($ = 0, p = ""; $ <= M; p += m.charAt(N[$++]))
            ;
          p = Et(p, w, m.charAt(0));
        }
        return p;
      };
    }(), e = /* @__PURE__ */ function() {
      function h(y, g, k) {
        var C, m, v, w, M = 0, B = y.length, I = g % At, N = g / At | 0;
        for (y = y.slice(); B--; )
          v = y[B] % At, w = y[B] / At | 0, C = N * v + w * I, m = I * v + C % At * At + M, M = (m / k | 0) + (C / At | 0) + N * w, y[B] = m % k;
        return M && (y = [M].concat(y)), y;
      }
      function c(y, g, k, C) {
        var m, v;
        if (k != C)
          v = k > C ? 1 : -1;
        else
          for (m = v = 0; m < k; m++)
            if (y[m] != g[m]) {
              v = y[m] > g[m] ? 1 : -1;
              break;
            }
        return v;
      }
      function p(y, g, k, C) {
        for (var m = 0; k--; )
          y[k] -= m, m = y[k] < g[k] ? 1 : 0, y[k] = m * C + y[k] - g[k];
        for (; !y[0] && y.length > 1; y.splice(0, 1))
          ;
      }
      return function(y, g, k, C, m) {
        var v, w, M, B, I, N, j, $, W, U, K, it, De, si, ai, bt, le, ct = y.s == g.s ? 1 : -1, st = y.c, Z = g.c;
        if (!st || !st[0] || !Z || !Z[0])
          return new b(!y.s || !g.s || (st ? Z && st[0] == Z[0] : !Z) ? NaN : st && st[0] == 0 || !Z ? ct * 0 : ct / 0);
        for ($ = new b(ct), W = $.c = [], w = y.e - g.e, ct = k + w + 1, m || (m = Lt, w = gt(y.e / F) - gt(g.e / F), ct = ct / F | 0), M = 0; Z[M] == (st[M] || 0); M++)
          ;
        if (Z[M] > (st[M] || 0) && w--, ct < 0)
          W.push(1), B = true;
        else {
          for (si = st.length, bt = Z.length, M = 0, ct += 2, I = dt(m / (Z[0] + 1)), I > 1 && (Z = h(Z, I, m), st = h(st, I, m), bt = Z.length, si = st.length), De = bt, U = st.slice(0, bt), K = U.length; K < bt; U[K++] = 0)
            ;
          le = Z.slice(), le = [0].concat(le), ai = Z[0], Z[1] >= m / 2 && ai++;
          do {
            if (I = 0, v = c(Z, U, bt, K), v < 0) {
              if (it = U[0], bt != K && (it = it * m + (U[1] || 0)), I = dt(it / ai), I > 1)
                for (I >= m && (I = m - 1), N = h(Z, I, m), j = N.length, K = U.length; c(N, U, j, K) == 1; )
                  I--, p(N, bt < j ? le : Z, j, m), j = N.length, v = 1;
              else
                I == 0 && (v = I = 1), N = Z.slice(), j = N.length;
              if (j < K && (N = [0].concat(N)), p(U, N, K, m), K = U.length, v == -1)
                for (; c(Z, U, bt, K) < 1; )
                  I++, p(U, bt < K ? le : Z, K, m), K = U.length;
            } else
              v === 0 && (I++, U = [0]);
            W[M++] = I, U[0] ? U[K++] = st[De] || 0 : (U = [st[De]], K = 1);
          } while ((De++ < si || U[0] != null) && ct--);
          B = U[0] != null, W[0] || W.splice(0, 1);
        }
        if (m == Lt) {
          for (M = 1, ct = W[0]; ct >= 10; ct /= 10, M++)
            ;
          A($, k + ($.e = M + w * F - 1) + 1, C, B);
        } else
          $.e = w, $.r = +B;
        return $;
      };
    }();
    function R(h, c, p, y) {
      var g, k, C, m, v;
      if (p == null ? p = o : J(p, 0, 8), !h.c)
        return h.toString();
      if (g = h.c[0], C = h.e, c == null)
        v = ft(h.c), v = y == 1 || y == 2 && (C <= l || C >= u) ? Je(v, C) : Et(v, C, "0");
      else if (h = A(new b(h), c, p), k = h.e, v = ft(h.c), m = v.length, y == 1 || y == 2 && (c <= k || k <= l)) {
        for (; m < c; v += "0", m++)
          ;
        v = Je(v, k);
      } else if (c -= C, v = Et(v, k, "0"), k + 1 > m) {
        if (--c > 0)
          for (v += "."; c--; v += "0")
            ;
      } else if (c += k - m, c > 0)
        for (k + 1 == m && (v += "."); c--; v += "0")
          ;
      return h.s < 0 && g ? "-" + v : v;
    }
    function D(h, c) {
      for (var p, y, g = 1, k = new b(h[0]); g < h.length; g++)
        y = new b(h[g]), (!y.s || (p = Ut(k, y)) === c || p === 0 && k.s === c) && (k = y);
      return k;
    }
    function O(h, c, p) {
      for (var y = 1, g = c.length; !c[--g]; c.pop())
        ;
      for (g = c[0]; g >= 10; g /= 10, y++)
        ;
      return (p = y + p * F - 1) > d ? h.c = h.e = null : p < f ? h.c = [h.e = 0] : (h.e = p, h.c = c), h;
    }
    r = /* @__PURE__ */ function() {
      var h = /^(-?)0([xbo])(?=\w[\w.]*$)/i, c = /^([^.]+)\.$/, p = /^\.([^.]+)$/, y = /^-?(Infinity|NaN)$/, g = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function(k, C, m, v) {
        var w, M = m ? C : C.replace(g, "");
        if (y.test(M))
          k.s = isNaN(M) ? null : M < 0 ? -1 : 1;
        else {
          if (!m && (M = M.replace(h, function(B, I, N) {
            return w = (N = N.toLowerCase()) == "x" ? 16 : N == "b" ? 2 : 8, !v || v == w ? I : B;
          }), v && (w = v, M = M.replace(c, "$1").replace(p, "0.$1")), C != M))
            return new b(M, w);
          if (b.DEBUG)
            throw Error(ht + "Not a" + (v ? " base " + v : "") + " number: " + C);
          k.s = null;
        }
        k.c = k.e = null;
      };
    }();
    function A(h, c, p, y) {
      var g, k, C, m, v, w, M, B = h.c, I = Wi;
      if (B) {
        t: {
          for (g = 1, m = B[0]; m >= 10; m /= 10, g++)
            ;
          if (k = c - g, k < 0)
            k += F, C = c, v = B[w = 0], M = dt(v / I[g - C - 1] % 10);
          else if (w = $i((k + 1) / F), w >= B.length)
            if (y) {
              for (; B.length <= w; B.push(0))
                ;
              v = M = 0, g = 1, k %= F, C = k - F + 1;
            } else
              break t;
          else {
            for (v = m = B[w], g = 1; m >= 10; m /= 10, g++)
              ;
            k %= F, C = k - F + g, M = C < 0 ? 0 : dt(v / I[g - C - 1] % 10);
          }
          if (y = y || c < 0 || B[w + 1] != null || (C < 0 ? v : v % I[g - C - 1]), y = p < 4 ? (M || y) && (p == 0 || p == (h.s < 0 ? 3 : 2)) : M > 5 || M == 5 && (p == 4 || y || p == 6 && (k > 0 ? C > 0 ? v / I[g - C] : 0 : B[w - 1]) % 10 & 1 || p == (h.s < 0 ? 8 : 7)), c < 1 || !B[0])
            return B.length = 0, y ? (c -= h.e + 1, B[0] = I[(F - c % F) % F], h.e = -c || 0) : B[0] = h.e = 0, h;
          if (k == 0 ? (B.length = w, m = 1, w--) : (B.length = w + 1, m = I[F - k], B[w] = C > 0 ? dt(v / I[g - C] % I[C]) * m : 0), y)
            for (; ; )
              if (w == 0) {
                for (k = 1, C = B[0]; C >= 10; C /= 10, k++)
                  ;
                for (C = B[0] += m, m = 1; C >= 10; C /= 10, m++)
                  ;
                k != m && (h.e++, B[0] == Lt && (B[0] = 1));
                break;
              } else {
                if (B[w] += m, B[w] != Lt)
                  break;
                B[w--] = 0, m = 1;
              }
          for (k = B.length; B[--k] === 0; B.pop())
            ;
        }
        h.e > d ? h.c = h.e = null : h.e < f && (h.c = [h.e = 0]);
      }
      return h;
    }
    function q(h) {
      var c, p = h.e;
      return p === null ? h.toString() : (c = ft(h.c), c = p <= l || p >= u ? Je(c, p) : Et(c, p, "0"), h.s < 0 ? "-" + c : c);
    }
    return n.absoluteValue = n.abs = function() {
      var h = new b(this);
      return h.s < 0 && (h.s = 1), h;
    }, n.comparedTo = function(h, c) {
      return Ut(this, new b(h, c));
    }, n.decimalPlaces = n.dp = function(h, c) {
      var p, y, g, k = this;
      if (h != null)
        return J(h, 0, tt), c == null ? c = o : J(c, 0, 8), A(new b(k), h + k.e + 1, c);
      if (!(p = k.c))
        return null;
      if (y = ((g = p.length - 1) - gt(this.e / F)) * F, g = p[g])
        for (; g % 10 == 0; g /= 10, y--)
          ;
      return y < 0 && (y = 0), y;
    }, n.dividedBy = n.div = function(h, c) {
      return e(this, new b(h, c), a, o);
    }, n.dividedToIntegerBy = n.idiv = function(h, c) {
      return e(this, new b(h, c), 0, 1);
    }, n.exponentiatedBy = n.pow = function(h, c) {
      var p, y, g, k, C, m, v, w, M, B = this;
      if (h = new b(h), h.c && !h.isInteger())
        throw Error(ht + "Exponent not an integer: " + q(h));
      if (c != null && (c = new b(c)), m = h.e > 14, !B.c || !B.c[0] || B.c[0] == 1 && !B.e && B.c.length == 1 || !h.c || !h.c[0])
        return M = new b(Math.pow(+q(B), m ? h.s * (2 - Ye(h)) : +q(h))), c ? M.mod(c) : M;
      if (v = h.s < 0, c) {
        if (c.c ? !c.c[0] : !c.s)
          return new b(NaN);
        y = !v && B.isInteger() && c.isInteger(), y && (B = B.mod(c));
      } else {
        if (h.e > 9 && (B.e > 0 || B.e < -1 || (B.e == 0 ? B.c[0] > 1 || m && B.c[1] >= 24e7 : B.c[0] < 8e13 || m && B.c[0] <= 9999975e7)))
          return k = B.s < 0 && Ye(h) ? -0 : 0, B.e > -1 && (k = 1 / k), new b(v ? 1 / k : k);
        T && (k = $i(T / F + 2));
      }
      for (m ? (p = new b(0.5), v && (h.s = 1), w = Ye(h)) : (g = Math.abs(+q(h)), w = g % 2), M = new b(s); ; ) {
        if (w) {
          if (M = M.times(B), !M.c)
            break;
          k ? M.c.length > k && (M.c.length = k) : y && (M = M.mod(c));
        }
        if (g) {
          if (g = dt(g / 2), g === 0)
            break;
          w = g % 2;
        } else if (h = h.times(p), A(h, h.e + 1, 1), h.e > 14)
          w = Ye(h);
        else {
          if (g = +q(h), g === 0)
            break;
          w = g % 2;
        }
        B = B.times(B), k ? B.c && B.c.length > k && (B.c.length = k) : y && (B = B.mod(c));
      }
      return y ? M : (v && (M = s.div(M)), c ? M.mod(c) : k ? A(M, T, o, C) : M);
    }, n.integerValue = function(h) {
      var c = new b(this);
      return h == null ? h = o : J(h, 0, 8), A(c, c.e + 1, h);
    }, n.isEqualTo = n.eq = function(h, c) {
      return Ut(this, new b(h, c)) === 0;
    }, n.isFinite = function() {
      return !!this.c;
    }, n.isGreaterThan = n.gt = function(h, c) {
      return Ut(this, new b(h, c)) > 0;
    }, n.isGreaterThanOrEqualTo = n.gte = function(h, c) {
      return (c = Ut(this, new b(h, c))) === 1 || c === 0;
    }, n.isInteger = function() {
      return !!this.c && gt(this.e / F) > this.c.length - 2;
    }, n.isLessThan = n.lt = function(h, c) {
      return Ut(this, new b(h, c)) < 0;
    }, n.isLessThanOrEqualTo = n.lte = function(h, c) {
      return (c = Ut(this, new b(h, c))) === -1 || c === 0;
    }, n.isNaN = function() {
      return !this.s;
    }, n.isNegative = function() {
      return this.s < 0;
    }, n.isPositive = function() {
      return this.s > 0;
    }, n.isZero = function() {
      return !!this.c && this.c[0] == 0;
    }, n.minus = function(h, c) {
      var p, y, g, k, C = this, m = C.s;
      if (h = new b(h, c), c = h.s, !m || !c)
        return new b(NaN);
      if (m != c)
        return h.s = -c, C.plus(h);
      var v = C.e / F, w = h.e / F, M = C.c, B = h.c;
      if (!v || !w) {
        if (!M || !B)
          return M ? (h.s = -c, h) : new b(B ? C : NaN);
        if (!M[0] || !B[0])
          return B[0] ? (h.s = -c, h) : new b(M[0] ? C : o == 3 ? -0 : 0);
      }
      if (v = gt(v), w = gt(w), M = M.slice(), m = v - w) {
        for ((k = m < 0) ? (m = -m, g = M) : (w = v, g = B), g.reverse(), c = m; c--; g.push(0))
          ;
        g.reverse();
      } else
        for (y = (k = (m = M.length) < (c = B.length)) ? m : c, m = c = 0; c < y; c++)
          if (M[c] != B[c]) {
            k = M[c] < B[c];
            break;
          }
      if (k && (g = M, M = B, B = g, h.s = -h.s), c = (y = B.length) - (p = M.length), c > 0)
        for (; c--; M[p++] = 0)
          ;
      for (c = Lt - 1; y > m; ) {
        if (M[--y] < B[y]) {
          for (p = y; p && !M[--p]; M[p] = c)
            ;
          --M[p], M[y] += Lt;
        }
        M[y] -= B[y];
      }
      for (; M[0] == 0; M.splice(0, 1), --w)
        ;
      return M[0] ? O(h, M, w) : (h.s = o == 3 ? -1 : 1, h.c = [h.e = 0], h);
    }, n.modulo = n.mod = function(h, c) {
      var p, y, g = this;
      return h = new b(h, c), !g.c || !h.s || h.c && !h.c[0] ? new b(NaN) : !h.c || g.c && !g.c[0] ? new b(g) : (E == 9 ? (y = h.s, h.s = 1, p = e(g, h, 0, 3), h.s = y, p.s *= y) : p = e(g, h, 0, E), h = g.minus(p.times(h)), !h.c[0] && E == 1 && (h.s = g.s), h);
    }, n.multipliedBy = n.times = function(h, c) {
      var p, y, g, k, C, m, v, w, M, B, I, N, j, $, W, U = this, K = U.c, it = (h = new b(h, c)).c;
      if (!K || !it || !K[0] || !it[0])
        return !U.s || !h.s || K && !K[0] && !it || it && !it[0] && !K ? h.c = h.e = h.s = null : (h.s *= U.s, !K || !it ? h.c = h.e = null : (h.c = [0], h.e = 0)), h;
      for (y = gt(U.e / F) + gt(h.e / F), h.s *= U.s, v = K.length, B = it.length, v < B && (j = K, K = it, it = j, g = v, v = B, B = g), g = v + B, j = []; g--; j.push(0))
        ;
      for ($ = Lt, W = At, g = B; --g >= 0; ) {
        for (p = 0, I = it[g] % W, N = it[g] / W | 0, C = v, k = g + C; k > g; )
          w = K[--C] % W, M = K[C] / W | 0, m = N * w + M * I, w = I * w + m % W * W + j[k] + p, p = (w / $ | 0) + (m / W | 0) + N * M, j[k--] = w % $;
        j[k] = p;
      }
      return p ? ++y : j.splice(0, 1), O(h, j, y);
    }, n.negated = function() {
      var h = new b(this);
      return h.s = -h.s || null, h;
    }, n.plus = function(h, c) {
      var p, y = this, g = y.s;
      if (h = new b(h, c), c = h.s, !g || !c)
        return new b(NaN);
      if (g != c)
        return h.s = -c, y.minus(h);
      var k = y.e / F, C = h.e / F, m = y.c, v = h.c;
      if (!k || !C) {
        if (!m || !v)
          return new b(g / 0);
        if (!m[0] || !v[0])
          return v[0] ? h : new b(m[0] ? y : g * 0);
      }
      if (k = gt(k), C = gt(C), m = m.slice(), g = k - C) {
        for (g > 0 ? (C = k, p = v) : (g = -g, p = m), p.reverse(); g--; p.push(0))
          ;
        p.reverse();
      }
      for (g = m.length, c = v.length, g - c < 0 && (p = v, v = m, m = p, c = g), g = 0; c; )
        g = (m[--c] = m[c] + v[c] + g) / Lt | 0, m[c] = Lt === m[c] ? 0 : m[c] % Lt;
      return g && (m = [g].concat(m), ++C), O(h, m, C);
    }, n.precision = n.sd = function(h, c) {
      var p, y, g, k = this;
      if (h != null && h !== !!h)
        return J(h, 1, tt), c == null ? c = o : J(c, 0, 8), A(new b(k), h, c);
      if (!(p = k.c))
        return null;
      if (g = p.length - 1, y = g * F + 1, g = p[g]) {
        for (; g % 10 == 0; g /= 10, y--)
          ;
        for (g = p[0]; g >= 10; g /= 10, y++)
          ;
      }
      return h && k.e + 1 > y && (y = k.e + 1), y;
    }, n.shiftedBy = function(h) {
      return J(h, -Zi, Zi), this.times("1e" + h);
    }, n.squareRoot = n.sqrt = function() {
      var h, c, p, y, g, k = this, C = k.c, m = k.s, v = k.e, w = a + 4, M = new b("0.5");
      if (m !== 1 || !C || !C[0])
        return new b(!m || m < 0 && (!C || C[0]) ? NaN : C ? k : 1 / 0);
      if (m = Math.sqrt(+q(k)), m == 0 || m == 1 / 0 ? (c = ft(C), (c.length + v) % 2 == 0 && (c += "0"), m = Math.sqrt(+c), v = gt((v + 1) / 2) - (v < 0 || v % 2), m == 1 / 0 ? c = "5e" + v : (c = m.toExponential(), c = c.slice(0, c.indexOf("e") + 1) + v), p = new b(c)) : p = new b(m + ""), p.c[0]) {
        for (v = p.e, m = v + w, m < 3 && (m = 0); ; )
          if (g = p, p = M.times(g.plus(e(k, g, w, 1))), ft(g.c).slice(0, m) === (c = ft(p.c)).slice(0, m))
            if (p.e < v && --m, c = c.slice(m - 3, m + 1), c == "9999" || !y && c == "4999") {
              if (!y && (A(g, g.e + a + 2, 0), g.times(g).eq(k))) {
                p = g;
                break;
              }
              w += 4, m += 4, y = 1;
            } else {
              (!+c || !+c.slice(1) && c.charAt(0) == "5") && (A(p, p.e + a + 2, 1), h = !p.times(p).eq(k));
              break;
            }
      }
      return A(p, p.e + a + 1, o, h);
    }, n.toExponential = function(h, c) {
      return h != null && (J(h, 0, tt), h++), R(this, h, c, 1);
    }, n.toFixed = function(h, c) {
      return h != null && (J(h, 0, tt), h = h + this.e + 1), R(this, h, c);
    }, n.toFormat = function(h, c, p) {
      var y, g = this;
      if (p == null)
        h != null && c && typeof c == "object" ? (p = c, c = null) : h && typeof h == "object" ? (p = h, h = c = null) : p = G;
      else if (typeof p != "object")
        throw Error(ht + "Argument not an object: " + p);
      if (y = g.toFixed(h, c), g.c) {
        var k, C = y.split("."), m = +p.groupSize, v = +p.secondaryGroupSize, w = p.groupSeparator || "", M = C[0], B = C[1], I = g.s < 0, N = I ? M.slice(1) : M, j = N.length;
        if (v && (k = m, m = v, v = k, j -= k), m > 0 && j > 0) {
          for (k = j % m || m, M = N.substr(0, k); k < j; k += m)
            M += w + N.substr(k, m);
          v > 0 && (M += w + N.slice(k)), I && (M = "-" + M);
        }
        y = B ? M + (p.decimalSeparator || "") + ((v = +p.fractionGroupSize) ? B.replace(new RegExp("\\d{" + v + "}\\B", "g"), "$&" + (p.fractionGroupSeparator || "")) : B) : M;
      }
      return (p.prefix || "") + y + (p.suffix || "");
    }, n.toFraction = function(h) {
      var c, p, y, g, k, C, m, v, w, M, B, I, N = this, j = N.c;
      if (h != null && (m = new b(h), !m.isInteger() && (m.c || m.s !== 1) || m.lt(s)))
        throw Error(ht + "Argument " + (m.isInteger() ? "out of range: " : "not an integer: ") + q(m));
      if (!j)
        return new b(N);
      for (c = new b(s), w = p = new b(s), y = v = new b(s), I = ft(j), k = c.e = I.length - N.e - 1, c.c[0] = Wi[(C = k % F) < 0 ? F + C : C], h = !h || m.comparedTo(c) > 0 ? k > 0 ? c : w : m, C = d, d = 1 / 0, m = new b(I), v.c[0] = 0; M = e(m, c, 0, 1), g = p.plus(M.times(y)), g.comparedTo(h) != 1; )
        p = y, y = g, w = v.plus(M.times(g = w)), v = g, c = m.minus(M.times(g = c)), m = g;
      return g = e(h.minus(p), y, 0, 1), v = v.plus(g.times(w)), p = p.plus(g.times(y)), v.s = w.s = N.s, k = k * 2, B = e(w, y, k, o).minus(N).abs().comparedTo(e(v, p, k, o).minus(N).abs()) < 1 ? [w, y] : [v, p], d = C, B;
    }, n.toNumber = function() {
      return +q(this);
    }, n.toPrecision = function(h, c) {
      return h != null && J(h, 1, tt), R(this, h, c, 2);
    }, n.toString = function(h) {
      var c, p = this, y = p.s, g = p.e;
      return g === null ? y ? (c = "Infinity", y < 0 && (c = "-" + c)) : c = "NaN" : (h == null ? c = g <= l || g >= u ? Je(ft(p.c), g) : Et(ft(p.c), g, "0") : h === 10 && x ? (p = A(new b(p), a + g + 1, o), c = Et(ft(p.c), p.e, "0")) : (J(h, 2, _.length, "Base"), c = i(Et(ft(p.c), g, "0"), 10, h, y, true)), y < 0 && p.c[0] && (c = "-" + c)), c;
    }, n.valueOf = n.toJSON = function() {
      return q(this);
    }, n._isBigNumber = true, n[Symbol.toStringTag] = "BigNumber", n[Symbol.for("nodejs.util.inspect.custom")] = n.valueOf, t != null && b.set(t), b;
  }
  function gt(t) {
    var e = t | 0;
    return t > 0 || t === e ? e : e - 1;
  }
  function ft(t) {
    for (var e, i, r = 1, n = t.length, s = t[0] + ""; r < n; ) {
      for (e = t[r++] + "", i = F - e.length; i--; e = "0" + e)
        ;
      s += e;
    }
    for (n = s.length; s.charCodeAt(--n) === 48; )
      ;
    return s.slice(0, n + 1 || 1);
  }
  function Ut(t, e) {
    var i, r, n = t.c, s = e.c, a = t.s, o = e.s, l = t.e, u = e.e;
    if (!a || !o)
      return null;
    if (i = n && !n[0], r = s && !s[0], i || r)
      return i ? r ? 0 : -o : a;
    if (a != o)
      return a;
    if (i = a < 0, r = l == u, !n || !s)
      return r ? 0 : !n ^ i ? 1 : -1;
    if (!r)
      return l > u ^ i ? 1 : -1;
    for (o = (l = n.length) < (u = s.length) ? l : u, a = 0; a < o; a++)
      if (n[a] != s[a])
        return n[a] > s[a] ^ i ? 1 : -1;
    return l == u ? 0 : l > u ^ i ? 1 : -1;
  }
  function J(t, e, i, r) {
    if (t < e || t > i || t !== dt(t))
      throw Error(ht + (r || "Argument") + (typeof t == "number" ? t < e || t > i ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(t));
  }
  function Ye(t) {
    var e = t.c.length - 1;
    return gt(t.e / F) == e && t.c[e] % 2 != 0;
  }
  function Je(t, e) {
    return (t.length > 1 ? t.charAt(0) + "." + t.slice(1) : t) + (e < 0 ? "e" : "e+") + e;
  }
  function Et(t, e, i) {
    var r, n;
    if (e < 0) {
      for (n = i + "."; ++e; n += i)
        ;
      t = n + t;
    } else if (r = t.length, ++e > r) {
      for (n = i, e -= r; --e; n += i)
        ;
      t += n;
    } else
      e < r && (t = t.slice(0, e) + "." + t.slice(e));
    return t;
  }
  var u_ = Cl(), mt = u_;
  var Qi = class {
    constructor(e) {
      __publicField(this, "key");
      __publicField(this, "left", null);
      __publicField(this, "right", null);
      this.key = e;
    }
  }, jt = class extends Qi {
    constructor(e) {
      super(e);
    }
  };
  var tr = class {
    constructor() {
      __publicField(this, "size", 0);
      __publicField(this, "modificationCount", 0);
      __publicField(this, "splayCount", 0);
    }
    splay(e) {
      let i = this.root;
      if (i == null)
        return this.compare(e, e), -1;
      let r = null, n = null, s = null, a = null, o = i, l = this.compare, u;
      for (; ; )
        if (u = l(o.key, e), u > 0) {
          let f = o.left;
          if (f == null || (u = l(f.key, e), u > 0 && (o.left = f.right, f.right = o, o = f, f = o.left, f == null)))
            break;
          r == null ? n = o : r.left = o, r = o, o = f;
        } else if (u < 0) {
          let f = o.right;
          if (f == null || (u = l(f.key, e), u < 0 && (o.right = f.left, f.left = o, o = f, f = o.right, f == null)))
            break;
          s == null ? a = o : s.right = o, s = o, o = f;
        } else
          break;
      return s != null && (s.right = o.left, o.left = a), r != null && (r.left = o.right, o.right = n), this.root !== o && (this.root = o, this.splayCount++), u;
    }
    splayMin(e) {
      let i = e, r = i.left;
      for (; r != null; ) {
        let n = r;
        i.left = n.right, n.right = i, i = n, r = i.left;
      }
      return i;
    }
    splayMax(e) {
      let i = e, r = i.right;
      for (; r != null; ) {
        let n = r;
        i.right = n.left, n.left = i, i = n, r = i.right;
      }
      return i;
    }
    _delete(e) {
      if (this.root == null || this.splay(e) != 0)
        return null;
      let r = this.root, n = r, s = r.left;
      if (this.size--, s == null)
        this.root = r.right;
      else {
        let a = r.right;
        r = this.splayMax(s), r.right = a, this.root = r;
      }
      return this.modificationCount++, n;
    }
    addNewRoot(e, i) {
      this.size++, this.modificationCount++;
      let r = this.root;
      if (r == null) {
        this.root = e;
        return;
      }
      i < 0 ? (e.left = r, e.right = r.right, r.right = null) : (e.right = r, e.left = r.left, r.left = null), this.root = e;
    }
    _first() {
      let e = this.root;
      return e == null ? null : (this.root = this.splayMin(e), this.root);
    }
    _last() {
      let e = this.root;
      return e == null ? null : (this.root = this.splayMax(e), this.root);
    }
    clear() {
      this.root = null, this.size = 0, this.modificationCount++;
    }
    has(e) {
      return this.validKey(e) && this.splay(e) == 0;
    }
    defaultCompare() {
      return (e, i) => e < i ? -1 : e > i ? 1 : 0;
    }
    wrap() {
      return { getRoot: () => this.root, setRoot: (e) => {
        this.root = e;
      }, getSize: () => this.size, getModificationCount: () => this.modificationCount, getSplayCount: () => this.splayCount, setSplayCount: (e) => {
        this.splayCount = e;
      }, splay: (e) => this.splay(e), has: (e) => this.has(e) };
    }
  };
  var Pt = (_b = class extends tr {
    constructor(e, i) {
      super();
      __publicField(this, "root", null);
      __publicField(this, "compare");
      __publicField(this, "validKey");
      __publicField(this, _a2, "[object Set]");
      this.compare = e ?? this.defaultCompare(), this.validKey = i ?? ((r) => r != null && r != null);
    }
    delete(e) {
      return this.validKey(e) ? this._delete(e) != null : false;
    }
    deleteAll(e) {
      for (let i of e)
        this.delete(i);
    }
    forEach(e) {
      let i = this[Symbol.iterator](), r;
      for (; r = i.next(), !r.done; )
        e(r.value, r.value, this);
    }
    add(e) {
      let i = this.splay(e);
      return i != 0 && this.addNewRoot(new jt(e), i), this;
    }
    addAndReturn(e) {
      let i = this.splay(e);
      return i != 0 && this.addNewRoot(new jt(e), i), this.root.key;
    }
    addAll(e) {
      for (let i of e)
        this.add(i);
    }
    isEmpty() {
      return this.root == null;
    }
    isNotEmpty() {
      return this.root != null;
    }
    single() {
      if (this.size == 0)
        throw "Bad state: No element";
      if (this.size > 1)
        throw "Bad state: Too many element";
      return this.root.key;
    }
    first() {
      if (this.size == 0)
        throw "Bad state: No element";
      return this._first().key;
    }
    last() {
      if (this.size == 0)
        throw "Bad state: No element";
      return this._last().key;
    }
    lastBefore(e) {
      if (e == null)
        throw "Invalid arguments(s)";
      if (this.root == null)
        return null;
      if (this.splay(e) < 0)
        return this.root.key;
      let r = this.root.left;
      if (r == null)
        return null;
      let n = r.right;
      for (; n != null; )
        r = n, n = r.right;
      return r.key;
    }
    firstAfter(e) {
      if (e == null)
        throw "Invalid arguments(s)";
      if (this.root == null)
        return null;
      if (this.splay(e) > 0)
        return this.root.key;
      let r = this.root.right;
      if (r == null)
        return null;
      let n = r.left;
      for (; n != null; )
        r = n, n = r.left;
      return r.key;
    }
    retainAll(e) {
      let i = new _b(this.compare, this.validKey), r = this.modificationCount;
      for (let n of e) {
        if (r != this.modificationCount)
          throw "Concurrent modification during iteration.";
        this.validKey(n) && this.splay(n) == 0 && i.add(this.root.key);
      }
      i.size != this.size && (this.root = i.root, this.size = i.size, this.modificationCount++);
    }
    lookup(e) {
      return !this.validKey(e) || this.splay(e) != 0 ? null : this.root.key;
    }
    intersection(e) {
      let i = new _b(this.compare, this.validKey);
      for (let r of this)
        e.has(r) && i.add(r);
      return i;
    }
    difference(e) {
      let i = new _b(this.compare, this.validKey);
      for (let r of this)
        e.has(r) || i.add(r);
      return i;
    }
    union(e) {
      let i = this.clone();
      return i.addAll(e), i;
    }
    clone() {
      let e = new _b(this.compare, this.validKey);
      return e.size = this.size, e.root = this.copyNode(this.root), e;
    }
    copyNode(e) {
      if (e == null)
        return null;
      function i(n, s) {
        let a, o;
        do {
          if (a = n.left, o = n.right, a != null) {
            let l = new jt(a.key);
            s.left = l, i(a, l);
          }
          if (o != null) {
            let l = new jt(o.key);
            s.right = l, n = o, s = l;
          }
        } while (o != null);
      }
      let r = new jt(e.key);
      return i(e, r), r;
    }
    toSet() {
      return this.clone();
    }
    entries() {
      return new ir(this.wrap());
    }
    keys() {
      return this[Symbol.iterator]();
    }
    values() {
      return this[Symbol.iterator]();
    }
    [Symbol.iterator]() {
      return new er(this.wrap());
    }
  }, _a2 = Symbol.toStringTag, _b), $e = class {
    constructor(e) {
      __publicField(this, "tree");
      __publicField(this, "path", new Array());
      __publicField(this, "modificationCount", null);
      __publicField(this, "splayCount");
      this.tree = e, this.splayCount = e.getSplayCount();
    }
    [Symbol.iterator]() {
      return this;
    }
    next() {
      return this.moveNext() ? { done: false, value: this.current() } : { done: true, value: null };
    }
    current() {
      if (!this.path.length)
        return null;
      let e = this.path[this.path.length - 1];
      return this.getValue(e);
    }
    rebuildPath(e) {
      this.path.splice(0, this.path.length), this.tree.splay(e), this.path.push(this.tree.getRoot()), this.splayCount = this.tree.getSplayCount();
    }
    findLeftMostDescendent(e) {
      for (; e != null; )
        this.path.push(e), e = e.left;
    }
    moveNext() {
      if (this.modificationCount != this.tree.getModificationCount()) {
        if (this.modificationCount == null) {
          this.modificationCount = this.tree.getModificationCount();
          let r = this.tree.getRoot();
          for (; r != null; )
            this.path.push(r), r = r.left;
          return this.path.length > 0;
        }
        throw "Concurrent modification during iteration.";
      }
      if (!this.path.length)
        return false;
      this.splayCount != this.tree.getSplayCount() && this.rebuildPath(this.path[this.path.length - 1].key);
      let e = this.path[this.path.length - 1], i = e.right;
      if (i != null) {
        for (; i != null; )
          this.path.push(i), i = i.left;
        return true;
      }
      for (this.path.pop(); this.path.length && this.path[this.path.length - 1].right === e; )
        e = this.path.pop();
      return this.path.length > 0;
    }
  }, er = class extends $e {
    getValue(e) {
      return e.key;
    }
  }, ir = class extends $e {
    getValue(e) {
      return [e.key, e.key];
    }
  };
  var El = (t) => t;
  var Pl = (t) => {
    if (t) {
      let e = new Pt(Ee(t)), i = new Pt(Ee(t)), r = (s, a) => a.addAndReturn(s), n = (s) => ({ x: r(s.x, e), y: r(s.y, i) });
      return n({ x: new mt(0), y: new mt(0) }), n;
    }
    return El;
  };
  var rr = (t) => ({ set: (e) => {
    ut = rr(e);
  }, reset: () => rr(t), compare: Ee(t), snap: Pl(t), orient: xl(t) }), ut = rr();
  var ae = (t, e) => t.ll.x.isLessThanOrEqualTo(e.x) && e.x.isLessThanOrEqualTo(t.ur.x) && t.ll.y.isLessThanOrEqualTo(e.y) && e.y.isLessThanOrEqualTo(t.ur.y), Pe = (t, e) => {
    if (e.ur.x.isLessThan(t.ll.x) || t.ur.x.isLessThan(e.ll.x) || e.ur.y.isLessThan(t.ll.y) || t.ur.y.isLessThan(e.ll.y))
      return null;
    let i = t.ll.x.isLessThan(e.ll.x) ? e.ll.x : t.ll.x, r = t.ur.x.isLessThan(e.ur.x) ? t.ur.x : e.ur.x, n = t.ll.y.isLessThan(e.ll.y) ? e.ll.y : t.ll.y, s = t.ur.y.isLessThan(e.ur.y) ? t.ur.y : e.ur.y;
    return { ll: { x: i, y: n }, ur: { x: r, y: s } };
  };
  var Ze = (t, e) => t.x.times(e.y).minus(t.y.times(e.x)), Tl = (t, e) => t.x.times(e.x).plus(t.y.times(e.y)), We = (t) => Tl(t, t).sqrt(), Rl = (t, e, i) => {
    let r = { x: e.x.minus(t.x), y: e.y.minus(t.y) }, n = { x: i.x.minus(t.x), y: i.y.minus(t.y) };
    return Ze(n, r).div(We(n)).div(We(r));
  }, Dl = (t, e, i) => {
    let r = { x: e.x.minus(t.x), y: e.y.minus(t.y) }, n = { x: i.x.minus(t.x), y: i.y.minus(t.y) };
    return Tl(n, r).div(We(n)).div(We(r));
  }, Sl = (t, e, i) => e.y.isZero() ? null : { x: t.x.plus(e.x.div(e.y).times(i.minus(t.y))), y: i }, Bl = (t, e, i) => e.x.isZero() ? null : { x: i, y: t.y.plus(e.y.div(e.x).times(i.minus(t.x))) }, Ol = (t, e, i, r) => {
    if (e.x.isZero())
      return Bl(i, r, t.x);
    if (r.x.isZero())
      return Bl(t, e, i.x);
    if (e.y.isZero())
      return Sl(i, r, t.y);
    if (r.y.isZero())
      return Sl(t, e, i.y);
    let n = Ze(e, r);
    if (n.isZero())
      return null;
    let s = { x: i.x.minus(t.x), y: i.y.minus(t.y) }, a = Ze(s, e).div(n), o = Ze(s, r).div(n), l = t.x.plus(o.times(e.x)), u = i.x.plus(a.times(r.x)), f = t.y.plus(o.times(e.y)), d = i.y.plus(a.times(r.y)), P = l.plus(u).div(2), E = f.plus(d).div(2);
    return { x: P, y: E };
  };
  var et = class t {
    constructor(e, i) {
      __publicField(this, "point");
      __publicField(this, "isLeft");
      __publicField(this, "segment");
      __publicField(this, "otherSE");
      __publicField(this, "consumedBy");
      e.events === void 0 ? e.events = [this] : e.events.push(this), this.point = e, this.isLeft = i;
    }
    static compare(e, i) {
      let r = t.comparePoints(e.point, i.point);
      return r !== 0 ? r : (e.point !== i.point && e.link(i), e.isLeft !== i.isLeft ? e.isLeft ? 1 : -1 : Mt.compare(e.segment, i.segment));
    }
    static comparePoints(e, i) {
      return e.x.isLessThan(i.x) ? -1 : e.x.isGreaterThan(i.x) ? 1 : e.y.isLessThan(i.y) ? -1 : e.y.isGreaterThan(i.y) ? 1 : 0;
    }
    link(e) {
      if (e.point === this.point)
        throw new Error("Tried to link already linked events");
      let i = e.point.events;
      for (let r = 0, n = i.length; r < n; r++) {
        let s = i[r];
        this.point.events.push(s), s.point = this.point;
      }
      this.checkForConsuming();
    }
    checkForConsuming() {
      let e = this.point.events.length;
      for (let i = 0; i < e; i++) {
        let r = this.point.events[i];
        if (r.segment.consumedBy === void 0)
          for (let n = i + 1; n < e; n++) {
            let s = this.point.events[n];
            s.consumedBy === void 0 && r.otherSE.point.events === s.otherSE.point.events && r.segment.consume(s.segment);
          }
      }
    }
    getAvailableLinkedEvents() {
      let e = [];
      for (let i = 0, r = this.point.events.length; i < r; i++) {
        let n = this.point.events[i];
        n !== this && !n.segment.ringOut && n.segment.isInResult() && e.push(n);
      }
      return e;
    }
    getLeftmostComparator(e) {
      let i = /* @__PURE__ */ new Map(), r = (n) => {
        let s = n.otherSE;
        i.set(n, { sine: Rl(this.point, e.point, s.point), cosine: Dl(this.point, e.point, s.point) });
      };
      return (n, s) => {
        i.has(n) || r(n), i.has(s) || r(s);
        let { sine: a, cosine: o } = i.get(n), { sine: l, cosine: u } = i.get(s);
        return a.isGreaterThanOrEqualTo(0) && l.isGreaterThanOrEqualTo(0) ? o.isLessThan(u) ? 1 : o.isGreaterThan(u) ? -1 : 0 : a.isLessThan(0) && l.isLessThan(0) ? o.isLessThan(u) ? -1 : o.isGreaterThan(u) ? 1 : 0 : l.isLessThan(a) ? -1 : l.isGreaterThan(a) ? 1 : 0;
      };
    }
  };
  var c_ = 0, Mt = class t {
    constructor(e, i, r, n) {
      __publicField(this, "id");
      __publicField(this, "leftSE");
      __publicField(this, "rightSE");
      __publicField(this, "rings");
      __publicField(this, "windings");
      __publicField(this, "ringOut");
      __publicField(this, "consumedBy");
      __publicField(this, "prev");
      __publicField(this, "_prevInResult");
      __publicField(this, "_beforeState");
      __publicField(this, "_afterState");
      __publicField(this, "_isInResult");
      this.id = ++c_, this.leftSE = e, e.segment = this, e.otherSE = i, this.rightSE = i, i.segment = this, i.otherSE = e, this.rings = r, this.windings = n;
    }
    static compare(e, i) {
      let r = e.leftSE.point.x, n = i.leftSE.point.x, s = e.rightSE.point.x, a = i.rightSE.point.x;
      if (a.isLessThan(r))
        return 1;
      if (s.isLessThan(n))
        return -1;
      let o = e.leftSE.point.y, l = i.leftSE.point.y, u = e.rightSE.point.y, f = i.rightSE.point.y;
      if (r.isLessThan(n)) {
        if (l.isLessThan(o) && l.isLessThan(u))
          return 1;
        if (l.isGreaterThan(o) && l.isGreaterThan(u))
          return -1;
        let d = e.comparePoint(i.leftSE.point);
        if (d < 0)
          return 1;
        if (d > 0)
          return -1;
        let P = i.comparePoint(e.rightSE.point);
        return P !== 0 ? P : -1;
      }
      if (r.isGreaterThan(n)) {
        if (o.isLessThan(l) && o.isLessThan(f))
          return -1;
        if (o.isGreaterThan(l) && o.isGreaterThan(f))
          return 1;
        let d = i.comparePoint(e.leftSE.point);
        if (d !== 0)
          return d;
        let P = e.comparePoint(i.rightSE.point);
        return P < 0 ? 1 : P > 0 ? -1 : 1;
      }
      if (o.isLessThan(l))
        return -1;
      if (o.isGreaterThan(l))
        return 1;
      if (s.isLessThan(a)) {
        let d = i.comparePoint(e.rightSE.point);
        if (d !== 0)
          return d;
      }
      if (s.isGreaterThan(a)) {
        let d = e.comparePoint(i.rightSE.point);
        if (d < 0)
          return 1;
        if (d > 0)
          return -1;
      }
      if (!s.eq(a)) {
        let d = u.minus(o), P = s.minus(r), E = f.minus(l), T = a.minus(n);
        if (d.isGreaterThan(P) && E.isLessThan(T))
          return 1;
        if (d.isLessThan(P) && E.isGreaterThan(T))
          return -1;
      }
      return s.isGreaterThan(a) ? 1 : s.isLessThan(a) || u.isLessThan(f) ? -1 : u.isGreaterThan(f) ? 1 : e.id < i.id ? -1 : e.id > i.id ? 1 : 0;
    }
    static fromRing(e, i, r) {
      let n, s, a, o = et.comparePoints(e, i);
      if (o < 0)
        n = e, s = i, a = 1;
      else if (o > 0)
        n = i, s = e, a = -1;
      else
        throw new Error(`Tried to create degenerate segment at [${e.x}, ${e.y}]`);
      let l = new et(n, true), u = new et(s, false);
      return new t(l, u, [r], [a]);
    }
    replaceRightSE(e) {
      this.rightSE = e, this.rightSE.segment = this, this.rightSE.otherSE = this.leftSE, this.leftSE.otherSE = this.rightSE;
    }
    bbox() {
      let e = this.leftSE.point.y, i = this.rightSE.point.y;
      return { ll: { x: this.leftSE.point.x, y: e.isLessThan(i) ? e : i }, ur: { x: this.rightSE.point.x, y: e.isGreaterThan(i) ? e : i } };
    }
    vector() {
      return { x: this.rightSE.point.x.minus(this.leftSE.point.x), y: this.rightSE.point.y.minus(this.leftSE.point.y) };
    }
    isAnEndpoint(e) {
      return e.x.eq(this.leftSE.point.x) && e.y.eq(this.leftSE.point.y) || e.x.eq(this.rightSE.point.x) && e.y.eq(this.rightSE.point.y);
    }
    comparePoint(e) {
      return ut.orient(this.leftSE.point, e, this.rightSE.point);
    }
    getIntersection(e) {
      let i = this.bbox(), r = e.bbox(), n = Pe(i, r);
      if (n === null)
        return null;
      let s = this.leftSE.point, a = this.rightSE.point, o = e.leftSE.point, l = e.rightSE.point, u = ae(i, o) && this.comparePoint(o) === 0, f = ae(r, s) && e.comparePoint(s) === 0, d = ae(i, l) && this.comparePoint(l) === 0, P = ae(r, a) && e.comparePoint(a) === 0;
      if (f && u)
        return P && !d ? a : !P && d ? l : null;
      if (f)
        return d && s.x.eq(l.x) && s.y.eq(l.y) ? null : s;
      if (u)
        return P && a.x.eq(o.x) && a.y.eq(o.y) ? null : o;
      if (P && d)
        return null;
      if (P)
        return a;
      if (d)
        return l;
      let E = Ol(s, this.vector(), o, e.vector());
      return E === null || !ae(n, E) ? null : ut.snap(E);
    }
    split(e) {
      let i = [], r = e.events !== void 0, n = new et(e, true), s = new et(e, false), a = this.rightSE;
      this.replaceRightSE(s), i.push(s), i.push(n);
      let o = new t(n, a, this.rings.slice(), this.windings.slice());
      return et.comparePoints(o.leftSE.point, o.rightSE.point) > 0 && o.swapEvents(), et.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), r && (n.checkForConsuming(), s.checkForConsuming()), i;
    }
    swapEvents() {
      let e = this.rightSE;
      this.rightSE = this.leftSE, this.leftSE = e, this.leftSE.isLeft = true, this.rightSE.isLeft = false;
      for (let i = 0, r = this.windings.length; i < r; i++)
        this.windings[i] *= -1;
    }
    consume(e) {
      let i = this, r = e;
      for (; i.consumedBy; )
        i = i.consumedBy;
      for (; r.consumedBy; )
        r = r.consumedBy;
      let n = t.compare(i, r);
      if (n !== 0) {
        if (n > 0) {
          let s = i;
          i = r, r = s;
        }
        if (i.prev === r) {
          let s = i;
          i = r, r = s;
        }
        for (let s = 0, a = r.rings.length; s < a; s++) {
          let o = r.rings[s], l = r.windings[s], u = i.rings.indexOf(o);
          u === -1 ? (i.rings.push(o), i.windings.push(l)) : i.windings[u] += l;
        }
        r.rings = null, r.windings = null, r.consumedBy = i, r.leftSE.consumedBy = i.leftSE, r.rightSE.consumedBy = i.rightSE;
      }
    }
    prevInResult() {
      return this._prevInResult !== void 0 ? this._prevInResult : (this.prev ? this.prev.isInResult() ? this._prevInResult = this.prev : this._prevInResult = this.prev.prevInResult() : this._prevInResult = null, this._prevInResult);
    }
    beforeState() {
      if (this._beforeState !== void 0)
        return this._beforeState;
      if (!this.prev)
        this._beforeState = { rings: [], windings: [], multiPolys: [] };
      else {
        let e = this.prev.consumedBy || this.prev;
        this._beforeState = e.afterState();
      }
      return this._beforeState;
    }
    afterState() {
      if (this._afterState !== void 0)
        return this._afterState;
      let e = this.beforeState();
      this._afterState = { rings: e.rings.slice(0), windings: e.windings.slice(0), multiPolys: [] };
      let i = this._afterState.rings, r = this._afterState.windings, n = this._afterState.multiPolys;
      for (let o = 0, l = this.rings.length; o < l; o++) {
        let u = this.rings[o], f = this.windings[o], d = i.indexOf(u);
        d === -1 ? (i.push(u), r.push(f)) : r[d] += f;
      }
      let s = [], a = [];
      for (let o = 0, l = i.length; o < l; o++) {
        if (r[o] === 0)
          continue;
        let u = i[o], f = u.poly;
        if (a.indexOf(f) === -1)
          if (u.isExterior)
            s.push(f);
          else {
            a.indexOf(f) === -1 && a.push(f);
            let d = s.indexOf(u.poly);
            d !== -1 && s.splice(d, 1);
          }
      }
      for (let o = 0, l = s.length; o < l; o++) {
        let u = s[o].multiPoly;
        n.indexOf(u) === -1 && n.push(u);
      }
      return this._afterState;
    }
    isInResult() {
      if (this.consumedBy)
        return false;
      if (this._isInResult !== void 0)
        return this._isInResult;
      let e = this.beforeState().multiPolys, i = this.afterState().multiPolys;
      switch (oe.type) {
        case "union": {
          let r = e.length === 0, n = i.length === 0;
          this._isInResult = r !== n;
          break;
        }
        case "intersection": {
          let r, n;
          e.length < i.length ? (r = e.length, n = i.length) : (r = i.length, n = e.length), this._isInResult = n === oe.numMultiPolys && r < n;
          break;
        }
        case "xor": {
          let r = Math.abs(e.length - i.length);
          this._isInResult = r % 2 === 1;
          break;
        }
        case "difference": {
          let r = (n) => n.length === 1 && n[0].isSubject;
          this._isInResult = r(e) !== r(i);
          break;
        }
      }
      return this._isInResult;
    }
  };
  var Qe = class {
    constructor(e, i, r) {
      __publicField(this, "poly");
      __publicField(this, "isExterior");
      __publicField(this, "segments");
      __publicField(this, "bbox");
      if (!Array.isArray(e) || e.length === 0)
        throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      if (this.poly = i, this.isExterior = r, this.segments = [], typeof e[0][0] != "number" || typeof e[0][1] != "number")
        throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      let n = ut.snap({ x: new mt(e[0][0]), y: new mt(e[0][1]) });
      this.bbox = { ll: { x: n.x, y: n.y }, ur: { x: n.x, y: n.y } };
      let s = n;
      for (let a = 1, o = e.length; a < o; a++) {
        if (typeof e[a][0] != "number" || typeof e[a][1] != "number")
          throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        let l = ut.snap({ x: new mt(e[a][0]), y: new mt(e[a][1]) });
        l.x.eq(s.x) && l.y.eq(s.y) || (this.segments.push(Mt.fromRing(s, l, this)), l.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = l.x), l.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = l.y), l.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = l.x), l.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = l.y), s = l);
      }
      (!n.x.eq(s.x) || !n.y.eq(s.y)) && this.segments.push(Mt.fromRing(s, n, this));
    }
    getSweepEvents() {
      let e = [];
      for (let i = 0, r = this.segments.length; i < r; i++) {
        let n = this.segments[i];
        e.push(n.leftSE), e.push(n.rightSE);
      }
      return e;
    }
  }, nr = class {
    constructor(e, i) {
      __publicField(this, "multiPoly");
      __publicField(this, "exteriorRing");
      __publicField(this, "interiorRings");
      __publicField(this, "bbox");
      if (!Array.isArray(e))
        throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      this.exteriorRing = new Qe(e[0], this, true), this.bbox = { ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y }, ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y } }, this.interiorRings = [];
      for (let r = 1, n = e.length; r < n; r++) {
        let s = new Qe(e[r], this, false);
        s.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = s.bbox.ll.x), s.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = s.bbox.ll.y), s.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = s.bbox.ur.x), s.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = s.bbox.ur.y), this.interiorRings.push(s);
      }
      this.multiPoly = i;
    }
    getSweepEvents() {
      let e = this.exteriorRing.getSweepEvents();
      for (let i = 0, r = this.interiorRings.length; i < r; i++) {
        let n = this.interiorRings[i].getSweepEvents();
        for (let s = 0, a = n.length; s < a; s++)
          e.push(n[s]);
      }
      return e;
    }
  }, Se = class {
    constructor(e, i) {
      __publicField(this, "isSubject");
      __publicField(this, "polys");
      __publicField(this, "bbox");
      if (!Array.isArray(e))
        throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
      try {
        typeof e[0][0][0] == "number" && (e = [e]);
      } catch {
      }
      this.polys = [], this.bbox = { ll: { x: new mt(Number.POSITIVE_INFINITY), y: new mt(Number.POSITIVE_INFINITY) }, ur: { x: new mt(Number.NEGATIVE_INFINITY), y: new mt(Number.NEGATIVE_INFINITY) } };
      for (let r = 0, n = e.length; r < n; r++) {
        let s = new nr(e[r], this);
        s.bbox.ll.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = s.bbox.ll.x), s.bbox.ll.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = s.bbox.ll.y), s.bbox.ur.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = s.bbox.ur.x), s.bbox.ur.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = s.bbox.ur.y), this.polys.push(s);
      }
      this.isSubject = i;
    }
    getSweepEvents() {
      let e = [];
      for (let i = 0, r = this.polys.length; i < r; i++) {
        let n = this.polys[i].getSweepEvents();
        for (let s = 0, a = n.length; s < a; s++)
          e.push(n[s]);
      }
      return e;
    }
  };
  var ti = class t {
    constructor(e) {
      __publicField(this, "events");
      __publicField(this, "poly");
      __publicField(this, "_isExteriorRing");
      __publicField(this, "_enclosingRing");
      this.events = e;
      for (let i = 0, r = e.length; i < r; i++)
        e[i].segment.ringOut = this;
      this.poly = null;
    }
    static factory(e) {
      let i = [];
      for (let r = 0, n = e.length; r < n; r++) {
        let s = e[r];
        if (!s.isInResult() || s.ringOut)
          continue;
        let a = null, o = s.leftSE, l = s.rightSE, u = [o], f = o.point, d = [];
        for (; a = o, o = l, u.push(o), o.point !== f; )
          for (; ; ) {
            let P = o.getAvailableLinkedEvents();
            if (P.length === 0) {
              let G = u[0].point, _ = u[u.length - 1].point;
              throw new Error(`Unable to complete output ring starting at [${G.x}, ${G.y}]. Last matching segment found ends at [${_.x}, ${_.y}].`);
            }
            if (P.length === 1) {
              l = P[0].otherSE;
              break;
            }
            let E = null;
            for (let G = 0, _ = d.length; G < _; G++)
              if (d[G].point === o.point) {
                E = G;
                break;
              }
            if (E !== null) {
              let G = d.splice(E)[0], _ = u.splice(G.index);
              _.unshift(_[0].otherSE), i.push(new t(_.reverse()));
              continue;
            }
            d.push({ index: u.length, point: o.point });
            let T = o.getLeftmostComparator(a);
            l = P.sort(T)[0].otherSE;
            break;
          }
        i.push(new t(u));
      }
      return i;
    }
    getGeom() {
      let e = this.events[0].point, i = [e];
      for (let u = 1, f = this.events.length - 1; u < f; u++) {
        let d = this.events[u].point, P = this.events[u + 1].point;
        ut.orient(d, e, P) !== 0 && (i.push(d), e = d);
      }
      if (i.length === 1)
        return null;
      let r = i[0], n = i[1];
      ut.orient(r, e, n) === 0 && i.shift(), i.push(i[0]);
      let s = this.isExteriorRing() ? 1 : -1, a = this.isExteriorRing() ? 0 : i.length - 1, o = this.isExteriorRing() ? i.length : -1, l = [];
      for (let u = a; u != o; u += s)
        l.push([i[u].x.toNumber(), i[u].y.toNumber()]);
      return l;
    }
    isExteriorRing() {
      if (this._isExteriorRing === void 0) {
        let e = this.enclosingRing();
        this._isExteriorRing = e ? !e.isExteriorRing() : true;
      }
      return this._isExteriorRing;
    }
    enclosingRing() {
      return this._enclosingRing === void 0 && (this._enclosingRing = this._calcEnclosingRing()), this._enclosingRing;
    }
    _calcEnclosingRing() {
      let e = this.events[0];
      for (let n = 1, s = this.events.length; n < s; n++) {
        let a = this.events[n];
        et.compare(e, a) > 0 && (e = a);
      }
      let i = e.segment.prevInResult(), r = i ? i.prevInResult() : null;
      for (; ; ) {
        if (!i)
          return null;
        if (!r)
          return i.ringOut;
        if (r.ringOut !== i.ringOut)
          return r.ringOut?.enclosingRing() !== i.ringOut ? i.ringOut : i.ringOut?.enclosingRing();
        i = r.prevInResult(), r = i ? i.prevInResult() : null;
      }
    }
  }, ei = class {
    constructor(e) {
      __publicField(this, "exteriorRing");
      __publicField(this, "interiorRings");
      this.exteriorRing = e, e.poly = this, this.interiorRings = [];
    }
    addInterior(e) {
      this.interiorRings.push(e), e.poly = this;
    }
    getGeom() {
      let e = this.exteriorRing.getGeom();
      if (e === null)
        return null;
      let i = [e];
      for (let r = 0, n = this.interiorRings.length; r < n; r++) {
        let s = this.interiorRings[r].getGeom();
        s !== null && i.push(s);
      }
      return i;
    }
  }, ii = class {
    constructor(e) {
      __publicField(this, "rings");
      __publicField(this, "polys");
      this.rings = e, this.polys = this._composePolys(e);
    }
    getGeom() {
      let e = [];
      for (let i = 0, r = this.polys.length; i < r; i++) {
        let n = this.polys[i].getGeom();
        n !== null && e.push(n);
      }
      return e;
    }
    _composePolys(e) {
      let i = [];
      for (let r = 0, n = e.length; r < n; r++) {
        let s = e[r];
        if (!s.poly)
          if (s.isExteriorRing())
            i.push(new ei(s));
          else {
            let a = s.enclosingRing();
            a?.poly || i.push(new ei(a)), a?.poly?.addInterior(s);
          }
      }
      return i;
    }
  };
  var Be = class {
    constructor(e, i = Mt.compare) {
      __publicField(this, "queue");
      __publicField(this, "tree");
      __publicField(this, "segments");
      this.queue = e, this.tree = new Pt(i), this.segments = [];
    }
    process(e) {
      let i = e.segment, r = [];
      if (e.consumedBy)
        return e.isLeft ? this.queue.delete(e.otherSE) : this.tree.delete(i), r;
      e.isLeft && this.tree.add(i);
      let n = i, s = i;
      do
        n = this.tree.lastBefore(n);
      while (n != null && n.consumedBy != null);
      do
        s = this.tree.firstAfter(s);
      while (s != null && s.consumedBy != null);
      if (e.isLeft) {
        let a = null;
        if (n) {
          let l = n.getIntersection(i);
          if (l !== null && (i.isAnEndpoint(l) || (a = l), !n.isAnEndpoint(l))) {
            let u = this._splitSafely(n, l);
            for (let f = 0, d = u.length; f < d; f++)
              r.push(u[f]);
          }
        }
        let o = null;
        if (s) {
          let l = s.getIntersection(i);
          if (l !== null && (i.isAnEndpoint(l) || (o = l), !s.isAnEndpoint(l))) {
            let u = this._splitSafely(s, l);
            for (let f = 0, d = u.length; f < d; f++)
              r.push(u[f]);
          }
        }
        if (a !== null || o !== null) {
          let l = null;
          a === null ? l = o : o === null ? l = a : l = et.comparePoints(a, o) <= 0 ? a : o, this.queue.delete(i.rightSE), r.push(i.rightSE);
          let u = i.split(l);
          for (let f = 0, d = u.length; f < d; f++)
            r.push(u[f]);
        }
        r.length > 0 ? (this.tree.delete(i), r.push(e)) : (this.segments.push(i), i.prev = n);
      } else {
        if (n && s) {
          let a = n.getIntersection(s);
          if (a !== null) {
            if (!n.isAnEndpoint(a)) {
              let o = this._splitSafely(n, a);
              for (let l = 0, u = o.length; l < u; l++)
                r.push(o[l]);
            }
            if (!s.isAnEndpoint(a)) {
              let o = this._splitSafely(s, a);
              for (let l = 0, u = o.length; l < u; l++)
                r.push(o[l]);
            }
          }
        }
        this.tree.delete(i);
      }
      return r;
    }
    _splitSafely(e, i) {
      this.tree.delete(e);
      let r = e.rightSE;
      this.queue.delete(r);
      let n = e.split(i);
      return n.push(r), e.consumedBy === void 0 && this.tree.add(e), n;
    }
  };
  var sr = class {
    constructor() {
      __publicField(this, "type");
      __publicField(this, "numMultiPolys");
    }
    run(e, i, r) {
      Te.type = e;
      let n = [new Se(i, true)];
      for (let f = 0, d = r.length; f < d; f++)
        n.push(new Se(r[f], false));
      if (Te.numMultiPolys = n.length, Te.type === "difference") {
        let f = n[0], d = 1;
        for (; d < n.length; )
          Pe(n[d].bbox, f.bbox) !== null ? d++ : n.splice(d, 1);
      }
      if (Te.type === "intersection")
        for (let f = 0, d = n.length; f < d; f++) {
          let P = n[f];
          for (let E = f + 1, T = n.length; E < T; E++)
            if (Pe(P.bbox, n[E].bbox) === null)
              return [];
        }
      let s = new Pt(et.compare);
      for (let f = 0, d = n.length; f < d; f++) {
        let P = n[f].getSweepEvents();
        for (let E = 0, T = P.length; E < T; E++)
          s.add(P[E]);
      }
      let a = new Be(s), o = null;
      for (s.size != 0 && (o = s.first(), s.delete(o)); o; ) {
        let f = a.process(o);
        for (let d = 0, P = f.length; d < P; d++) {
          let E = f[d];
          E.consumedBy === void 0 && s.add(E);
        }
        s.size != 0 ? (o = s.first(), s.delete(o)) : o = null;
      }
      ut.reset();
      let l = ti.factory(a.segments);
      return new ii(l).getGeom();
    }
  }, Te = new sr(), oe = Te;
  var Al = (t, ...e) => oe.run("intersection", t, e);
  var Il = (t, ...e) => oe.run("difference", t, e), pM = ut.set;
  function ni(t) {
    let e = { type: "Feature" };
    return e.geometry = t, e;
  }
  function ri(t) {
    return t.type === "Feature" ? t.geometry : t;
  }
  function Gl(t) {
    return t && t.geometry && t.geometry.coordinates ? t.geometry.coordinates : t;
  }
  function g_(t) {
    return ni({ type: "LineString", coordinates: t });
  }
  function m_(t) {
    return ni({ type: "MultiLineString", coordinates: t });
  }
  function ql(t) {
    return ni({ type: "Polygon", coordinates: t });
  }
  function Nl(t) {
    return ni({ type: "MultiPolygon", coordinates: t });
  }
  function zl(t, e) {
    let i = ri(t), r = ri(e), n = Al(i.coordinates, r.coordinates);
    return n.length === 0 ? null : n.length === 1 ? ql(n[0]) : Nl(n);
  }
  function Fl(t, e) {
    let i = ri(t), r = ri(e), n = Il(i.coordinates, r.coordinates);
    return n.length === 0 ? null : n.length === 1 ? ql(n[0]) : Nl(n);
  }
  function Vl(t) {
    return Array.isArray(t) ? 1 + Vl(t[0]) : -1;
  }
  function Ul(t) {
    t instanceof L.Polyline && (t = t.toGeoJSON(15));
    let e = Gl(t), i = Vl(e), r = [];
    return i > 1 ? e.forEach((n) => {
      r.push(g_(n));
    }) : r.push(t), r;
  }
  function jl(t) {
    let e = [];
    return t.eachLayer((i) => {
      e.push(Gl(i.toGeoJSON(15)));
    }), m_(e);
  }
  X.Cut = X.Polygon.extend({ initialize(t) {
    this._map = t, this._shape = "Cut", this.toolbarButtonName = "cutPolygon";
  }, _finishShape() {
    if (this._editedLayers = [], !this.options.allowSelfIntersection && (this._handleSelfIntersection(true, this._layer.getLatLngs()[0]), this._doesSelfIntersect) || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer())
      return;
    let t = this._layer.getLatLngs();
    if (t.length <= 2)
      return;
    let e = L.polygon(t, this.options.pathOptions);
    e._latlngInfos = this._layer._latlngInfo, this.cut(e), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex, this._editedLayers.forEach(({ layer: i, originalLayer: r }) => {
      this._fireCut(r, i, r), this._fireCut(this._map, i, r), r.pm._fireEdit();
    }), this._editedLayers = [], this.disable(), this.options.continueDrawing && this.enable();
  }, cut(t) {
    let e = this._map._layers, i = t._latlngInfos || [];
    Object.keys(e).map((n) => e[n]).filter((n) => n.pm).filter((n) => !n._pmTempLayer).filter((n) => !L.PM.optIn && !n.options.pmIgnore || L.PM.optIn && n.options.pmIgnore === false).filter((n) => n instanceof L.Polyline).filter((n) => n !== t).filter((n) => n.pm.options.allowCutting).filter((n) => this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0 ? this.options.layersToCut.indexOf(n) > -1 : true).filter((n) => !this._layerGroup.hasLayer(n)).filter((n) => {
      try {
        let s = !!pt(t.toGeoJSON(15), n.toGeoJSON(15)).features.length > 0;
        return s || n instanceof L.Polyline && !(n instanceof L.Polygon) ? s : !!zl(t.toGeoJSON(15), n.toGeoJSON(15));
      } catch {
        return n instanceof L.Polygon && console.error("You can't cut polygons with self-intersections"), false;
      }
    }).forEach((n) => {
      let s;
      if (n instanceof L.Polygon) {
        s = L.polygon(n.getLatLngs());
        let u = s.getLatLngs();
        i.forEach((f) => {
          if (f && f.snapInfo) {
            let { latlng: d } = f, P = this._calcClosestLayer(d, [s]);
            if (P && P.segment && P.distance < this.options.snapDistance) {
              let { segment: E } = P;
              if (E && E.length === 2) {
                let { indexPath: T, parentPath: G, newIndex: _ } = L.PM.Utils._getIndexFromSegment(u, E);
                (T.length > 1 ? (0, Kl.default)(u, G) : u).splice(_, 0, d);
              }
            }
          }
        });
      } else
        s = n;
      let a = this._cutLayer(t, s), o = L.geoJSON(a, n.options);
      o.getLayers().length === 1 && ([o] = o.getLayers()), this._setPane(o, "layerPane");
      let l = o.addTo(this._map.pm._getContainingLayer());
      if (l.pm.enable(n.pm.options), l.pm.disable(), n._pmTempLayer = true, t._pmTempLayer = true, n.remove(), n.removeFrom(this._map.pm._getContainingLayer()), t.remove(), t.removeFrom(this._map.pm._getContainingLayer()), l.getLayers && l.getLayers().length === 0 && this._map.pm.removeLayer({ target: l }), l instanceof L.LayerGroup ? (l.eachLayer((u) => {
        this._addDrawnLayerProp(u);
      }), this._addDrawnLayerProp(l)) : this._addDrawnLayerProp(l), this.options.layersToCut && L.Util.isArray(this.options.layersToCut) && this.options.layersToCut.length > 0) {
        let u = this.options.layersToCut.indexOf(n);
        u > -1 && this.options.layersToCut.splice(u, 1);
      }
      this._editedLayers.push({ layer: l, originalLayer: n });
    });
  }, _cutLayer(t, e) {
    let i = L.geoJSON(), r;
    if (e instanceof L.Polygon)
      r = Fl(e.toGeoJSON(15), t.toGeoJSON(15));
    else {
      let n = Ul(e);
      n.forEach((s) => {
        let a = vl(s, t.toGeoJSON(15)), o;
        a && a.features.length > 0 ? o = L.geoJSON(a) : o = L.geoJSON(s), o.getLayers().forEach((l) => {
          Yi(t.toGeoJSON(15), l.toGeoJSON(15)) || l.addTo(i);
        });
      }), n.length > 1 ? r = jl(i) : r = i.toGeoJSON(15);
    }
    return r;
  }, _change: L.Util.falseFn });
  X.Text = X.extend({ initialize(t) {
    this._map = t, this._shape = "Text", this.toolbarButtonName = "drawText";
  }, enable(t) {
    L.Util.setOptions(this, t), this._enabled = true, this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true), this._hintMarker = L.marker(this._map.getCenter(), { interactive: false, zIndexOffset: 100, icon: L.divIcon({ className: "marker-icon cursor-marker" }) }), this._setPane(this._hintMarker, "vertexPane"), this._hintMarker._pmTempLayer = true, this._hintMarker.addTo(this._map), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this.options.tooltips && this._hintMarker.bindTooltip(V("tooltips.placeText"), { permanent: true, offset: L.point(0, 10), direction: "bottom", opacity: 0.8 }).openTooltip(), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this._map.getContainer().classList.add("geoman-draw-cursor"), this._fireDrawStart(), this._setGlobalDrawMode();
  }, disable() {
    this._enabled && (this._enabled = false, this._map.off("click", this._createMarker, this), this._hintMarker?.remove(), this._map.getContainer().classList.remove("geoman-draw-cursor"), this._map.off("mousemove", this._syncHintMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false), this.options.snappable && this._cleanupSnapping(), this._fireDrawEnd(), this._setGlobalDrawMode());
  }, enabled() {
    return this._enabled;
  }, toggle(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, _syncHintMarker(t) {
    if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
      let e = t;
      e.target = this._hintMarker, this._handleSnapping(e);
    }
  }, _createMarker(t) {
    if (!t.latlng || this.options.requireSnapToFinish && !this._hintMarker._snapped && !this._isFirstLayer())
      return;
    this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
    let e = this._hintMarker.getLatLng();
    if (this.textArea = this._createTextArea(), this.options.textOptions?.className) {
      let n = this.options.textOptions.className.split(" ");
      this.textArea.classList.add(...n);
    }
    let i = this._createTextIcon(this.textArea), r = new L.Marker(e, { textMarker: true, _textMarkerOverPM: true, icon: i });
    if (this._setPane(r, "markerPane"), this._finishLayer(r), r.pm || (r.options.draggable = false), r.addTo(this._map.pm._getContainingLayer()), r.pm) {
      r.pm.textArea = this.textArea, L.setOptions(r.pm, { removeIfEmpty: this.options.textOptions?.removeIfEmpty ?? true });
      let n = this.options.textOptions?.focusAfterDraw ?? true;
      r.pm._createTextMarker(n), this.options.textOptions?.text && r.pm.setText(this.options.textOptions.text);
    }
    this._fireCreate(r), this._cleanupSnapping(), this.disable(), this.options.continueDrawing && this.enable();
  }, _createTextArea() {
    let t = document.createElement("textarea");
    return t.readOnly = true, t.classList.add("pm-textarea", "pm-disabled"), t;
  }, _createTextIcon(t) {
    return L.divIcon({ className: "pm-text-marker", html: t });
  } });
  var __ = { enableLayerDrag() {
    if (!this.options.draggable || !this._layer._map)
      return;
    this.disable(), this._layerDragEnabled = true, this._map || (this._map = this._layer._map), (this._layer instanceof L.Marker || this._layer instanceof L.ImageOverlay) && L.DomEvent.on(this._getDOMElem(), "dragstart", this._stopDOMImageDrag), this._layer.dragging && this._layer.dragging.disable(), this._tempDragCoord = null, Rt(this._layer) instanceof L.Canvas ? (this._layer.on("mouseout", this.removeDraggingClass, this), this._layer.on("mouseover", this.addDraggingClass, this)) : this.addDraggingClass(), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = true;
    let t = this._getDOMElem();
    t && (Rt(this._layer) instanceof L.Canvas ? (this._layer.on("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._addTouchEvents(t)) : L.DomEvent.on(t, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._fireDragEnable();
  }, disableLayerDrag() {
    this._layerDragEnabled = false, Rt(this._layer) instanceof L.Canvas ? (this._layer.off("mouseout", this.removeDraggingClass, this), this._layer.off("mouseover", this.addDraggingClass, this)) : this.removeDraggingClass(), this._originalMapDragState && this._dragging && this._map.dragging.enable(), this._safeToCacheDragState = false, this._layer.dragging && this._layer.dragging.disable();
    let t = this._getDOMElem();
    t && (Rt(this._layer) instanceof L.Canvas ? (this._layer.off("touchstart mousedown", this._dragMixinOnMouseDown, this), this._map.pm._removeTouchEvents(t)) : L.DomEvent.off(t, "touchstart mousedown", this._simulateMouseDownEvent, this)), this._layerDragged && this._fireUpdate(), this._layerDragged = false, this._fireDragDisable();
  }, dragging() {
    return this._dragging;
  }, layerDragEnabled() {
    return !!this._layerDragEnabled;
  }, _simulateMouseDownEvent(t) {
    let e = t.touches ? t.touches[0] : t, i = { originalEvent: e, target: this._layer };
    return i.containerPoint = this._map.mouseEventToContainerPoint(e), i.latlng = this._map.containerPointToLatLng(i.containerPoint), this._dragMixinOnMouseDown(i), false;
  }, _simulateMouseMoveEvent(t) {
    let e = t.touches ? t.touches[0] : t, i = { originalEvent: e, target: this._layer };
    return i.containerPoint = this._map.mouseEventToContainerPoint(e), i.latlng = this._map.containerPointToLatLng(i.containerPoint), this._dragMixinOnMouseMove(i), false;
  }, _simulateMouseUpEvent(t) {
    let i = { originalEvent: t.touches ? t.touches[0] : t, target: this._layer };
    return t.type.indexOf("touch") === -1 && (i.containerPoint = this._map.mouseEventToContainerPoint(t), i.latlng = this._map.containerPointToLatLng(i.containerPoint)), this._dragMixinOnMouseUp(i), false;
  }, _dragMixinOnMouseDown(t) {
    if (t.originalEvent.button > 0)
      return;
    this._overwriteEventIfItComesFromMarker(t);
    let e = t._fromLayerSync, i = this._syncLayers("_dragMixinOnMouseDown", t);
    if (this._layer instanceof L.Marker && (this.options.snappable && !e && !i ? this._initSnappableMarkers() : this._disableSnapping()), this._layer instanceof L.CircleMarker) {
      let r = "resizeableCircleMarker";
      this._layer instanceof L.Circle && (r = "resizableCircle"), this.options.snappable && !e && !i ? this._layer.pm.options[r] || this._initSnappableMarkersDrag() : this._layer.pm.options[r] ? this._layer.pm._disableSnapping() : this._layer.pm._disableSnappingDrag();
    }
    this._safeToCacheDragState && (this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = false), this._tempDragCoord = t.latlng, L.DomEvent.on(this._map.getContainer(), "touchend mouseup", this._simulateMouseUpEvent, this), L.DomEvent.on(this._map.getContainer(), "touchmove mousemove", this._simulateMouseMoveEvent, this);
  }, _dragMixinOnMouseMove(t) {
    this._overwriteEventIfItComesFromMarker(t);
    let e = this._getDOMElem();
    this._syncLayers("_dragMixinOnMouseMove", t), this._dragging || (this._dragging = true, L.DomUtil.addClass(e, "leaflet-pm-dragging"), this._layer instanceof L.Marker || this._layer.bringToFront(), this._originalMapDragState && this._map.dragging.disable(), this._fireDragStart()), this._tempDragCoord || (this._tempDragCoord = t.latlng), this._onLayerDrag(t), this._layer instanceof L.CircleMarker && this._layer.pm._updateHiddenPolyCircle();
  }, _dragMixinOnMouseUp(t) {
    let e = this._getDOMElem();
    return this._syncLayers("_dragMixinOnMouseUp", t), this._originalMapDragState && this._map.dragging.enable(), this._safeToCacheDragState = true, L.DomEvent.off(this._map.getContainer(), "touchmove mousemove", this._simulateMouseMoveEvent, this), L.DomEvent.off(this._map.getContainer(), "touchend mouseup", this._simulateMouseUpEvent, this), this._dragging ? (this._layer instanceof L.CircleMarker && this._layer.pm._updateHiddenPolyCircle(), this._layerDragged = true, window.setTimeout(() => {
      this._dragging = false, e && L.DomUtil.removeClass(e, "leaflet-pm-dragging"), this._fireDragEnd(), this._fireEdit(), this._layerEdited = true;
    }, 10), true) : false;
  }, _onLayerDrag(t) {
    let { latlng: e } = t, i = { lat: e.lat - this._tempDragCoord.lat, lng: e.lng - this._tempDragCoord.lng }, r = (n) => n.map((s) => {
      if (Array.isArray(s))
        return r(s);
      let a = { lat: s.lat + i.lat, lng: s.lng + i.lng };
      return (s.alt || s.alt === 0) && (a.alt = s.alt), a;
    });
    if (this._layer instanceof L.Circle && this._layer.options.resizableCircle || this._layer instanceof L.CircleMarker && this._layer.options.resizeableCircleMarker) {
      let n = r([this._layer.getLatLng()]);
      this._layer.setLatLng(n[0]), this._fireChange(this._layer.getLatLng(), "Edit");
    } else if (this._layer instanceof L.CircleMarker || this._layer instanceof L.Marker) {
      let n = this._layer.getLatLng();
      this._layer._snapped && (n = this._layer._orgLatLng);
      let s = r([n]);
      this._layer.setLatLng(s[0]), this._fireChange(this._layer.getLatLng(), "Edit");
    } else if (this._layer instanceof L.ImageOverlay) {
      let n = r([this._layer.getBounds().getNorthWest(), this._layer.getBounds().getSouthEast()]);
      this._layer.setBounds(n), this._fireChange(this._layer.getBounds(), "Edit");
    } else {
      let n = r(this._layer.getLatLngs());
      this._layer.setLatLngs(n), this._fireChange(this._layer.getLatLngs(), "Edit");
    }
    this._tempDragCoord = e, t.layer = this._layer, this._fireDrag(t);
  }, addDraggingClass() {
    let t = this._getDOMElem();
    t && L.DomUtil.addClass(t, "leaflet-pm-draggable");
  }, removeDraggingClass() {
    let t = this._getDOMElem();
    t && L.DomUtil.removeClass(t, "leaflet-pm-draggable");
  }, _getDOMElem() {
    let t = null;
    return this._layer._path ? t = this._layer._path : this._layer._renderer && this._layer._renderer._container ? t = this._layer._renderer._container : this._layer._image ? t = this._layer._image : this._layer._icon && (t = this._layer._icon), t;
  }, _overwriteEventIfItComesFromMarker(t) {
    t.target.getLatLng && (!t.target._radius || t.target._radius <= 10) && (t.containerPoint = this._map.mouseEventToContainerPoint(t.originalEvent), t.latlng = this._map.containerPointToLatLng(t.containerPoint));
  }, _syncLayers(t, e) {
    if (this.enabled())
      return false;
    if (!e._fromLayerSync && this._layer === e.target && this.options.syncLayersOnDrag) {
      e._fromLayerSync = true;
      let i = [];
      if (L.Util.isArray(this.options.syncLayersOnDrag))
        i = this.options.syncLayersOnDrag, this.options.syncLayersOnDrag.forEach((r) => {
          r instanceof L.LayerGroup && (i = i.concat(r.pm.getLayers(true)));
        });
      else if (this.options.syncLayersOnDrag === true && this._parentLayerGroup)
        for (let r in this._parentLayerGroup) {
          let n = this._parentLayerGroup[r];
          n.pm && (i = n.pm.getLayers(true));
        }
      return L.Util.isArray(i) && i.length > 0 && (i = i.filter((r) => !!r.pm).filter((r) => !!r.pm.options.draggable), i.forEach((r) => {
        r !== this._layer && r.pm[t] && (r._snapped = false, r.pm[t](e));
      })), i.length > 0;
    }
    return false;
  }, _stopDOMImageDrag(t) {
    return t.preventDefault(), false;
  } }, Hl = __;
  var Xl = xt(Le());
  function y_(t, e, i, r) {
    return i.unproject(e.transform(i.project(t, r)), r);
  }
  function ar(t, e, i) {
    let r = i.getMaxZoom();
    if (r === 1 / 0 && (r = i.getZoom()), L.Util.isArray(t)) {
      let n = [];
      return t.forEach((s) => {
        n.push(ar(s, e, i));
      }), n;
    }
    return t instanceof L.LatLng ? y_(t, e, i, r) : null;
  }
  function It(t, e) {
    e instanceof L.Layer && (e = e.getLatLng());
    let i = t.getMaxZoom();
    return i === 1 / 0 && (i = t.getZoom()), t.project(e, i);
  }
  function Re(t, e) {
    let i = t.getMaxZoom();
    return i === 1 / 0 && (i = t.getZoom()), t.unproject(e, i);
  }
  var L_ = { _onRotateStart(t) {
    this._preventRenderingMarkers(true), this._rotationOriginLatLng = this._getRotationCenter().clone(), this._rotationOriginPoint = It(this._map, this._rotationOriginLatLng), this._rotationStartPoint = It(this._map, t.target.getLatLng()), this._initialRotateLatLng = vt(this._layer), this._startAngle = this.getAngle();
    let e = vt(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._fireRotationStart(this._rotationLayer, e), this._fireRotationStart(this._map, e);
  }, _onRotate(t) {
    let e = It(this._map, t.target.getLatLng()), i = this._rotationStartPoint, r = this._rotationOriginPoint, n = Math.atan2(e.y - r.y, e.x - r.x) - Math.atan2(i.y - r.y, i.x - r.x);
    this._layer.setLatLngs(this._rotateLayer(n, this._initialRotateLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let s = this;
    function a(f, d = [], P = -1) {
      if (P > -1 && d.push(P), L.Util.isArray(f[0]))
        f.forEach((E, T) => a(E, d.slice(), T));
      else {
        let E = (0, Xl.default)(s._markers, d);
        f.forEach((T, G) => {
          E[G].setLatLng(T);
        });
      }
    }
    a(this._layer.getLatLngs());
    let o = vt(this._rotationLayer);
    this._rotationLayer.setLatLngs(this._rotateLayer(n, this._rotationLayer.pm._rotateOrgLatLng, this._rotationOriginLatLng, L.PM.Matrix.init(), this._map));
    let l = n * 180 / Math.PI;
    l = l < 0 ? l + 360 : l;
    let u = l + this._startAngle;
    this._setAngle(u), this._rotationLayer.pm._setAngle(u), this._fireRotation(this._rotationLayer, l, o), this._fireRotation(this._map, l, o), this._rotationLayer.pm._fireChange(this._rotationLayer.getLatLngs(), "Rotation");
  }, _onRotateEnd() {
    let t = this._startAngle;
    delete this._rotationOriginLatLng, delete this._rotationOriginPoint, delete this._rotationStartPoint, delete this._initialRotateLatLng, delete this._startAngle;
    let e = vt(this._rotationLayer, this._rotationLayer.pm._rotateOrgLatLng);
    this._rotationLayer.pm._rotateOrgLatLng = vt(this._rotationLayer), this._fireRotationEnd(this._rotationLayer, t, e), this._fireRotationEnd(this._map, t, e), this._rotationLayer.pm._fireEdit(this._rotationLayer, "Rotation"), this._preventRenderingMarkers(false), this._layerRotated = true;
  }, _rotateLayer(t, e, i, r, n) {
    let s = It(n, i);
    return this._matrix = r.clone().rotate(t, s).flip(), ar(e, this._matrix, n);
  }, _setAngle(t) {
    t = t < 0 ? t + 360 : t, this._angle = t % 360;
  }, _getRotationCenter() {
    if (this._rotationCenter)
      return this._rotationCenter;
    let t = L.polygon(this._layer.getLatLngs(), { stroke: false, fill: false, pmIgnore: true }).addTo(this._layer._map), e = t.getCenter();
    return t.removeFrom(this._layer._map), e;
  }, enableRotate() {
    if (!this.options.allowRotation) {
      this.disableRotate();
      return;
    }
    this.rotateEnabled() && this.disableRotate(), this._layer instanceof L.Rectangle && this._angle === void 0 && this.setInitAngle(ke(this._layer._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let t = { fill: false, stroke: false, pmIgnore: false, snapIgnore: true };
    this._rotatePoly = L.polygon(this._layer.getLatLngs(), t), this._rotatePoly._pmTempLayer = true, this._rotatePoly.addTo(this._layer._map), this._rotatePoly.pm._setAngle(this.getAngle()), this._rotatePoly.pm.setRotationCenter(this.getRotationCenter()), this._rotatePoly.pm.setOptions(this._layer._map.pm.getGlobalOptions()), this._rotatePoly.pm.setOptions({ rotate: true, snappable: false, hideMiddleMarkers: true }), this._rotatePoly.pm._rotationLayer = this._layer, this._rotatePoly.pm.enable(), this._rotateOrgLatLng = vt(this._layer), this._rotateEnabled = true, this._layer.on("remove", this.disableRotate, this), this._fireRotationEnable(this._layer), this._fireRotationEnable(this._layer._map);
  }, disableRotate() {
    this.rotateEnabled() && (this._rotatePoly.pm._layerRotated && this._fireUpdate(), this._rotatePoly.pm._layerRotated = false, this._rotatePoly.pm.disable(), this._rotatePoly.remove(), this._rotatePoly.pm.setOptions({ rotate: false }), this._rotatePoly = void 0, this._rotateOrgLatLng = void 0, this._layer.off("remove", this.disableRotate, this), this._rotateEnabled = false, this._fireRotationDisable(this._layer), this._fireRotationDisable(this._layer._map));
  }, rotateEnabled() {
    return !!this._rotateEnabled;
  }, rotateLayer(t) {
    let e = this.getAngle(), i = this._layer.getLatLngs(), r = t * (Math.PI / 180);
    this._layer.setLatLngs(this._rotateLayer(r, this._layer.getLatLngs(), this._getRotationCenter(), L.PM.Matrix.init(), this._layer._map)), this._rotateOrgLatLng = L.polygon(this._layer.getLatLngs()).getLatLngs(), this._setAngle(this.getAngle() + t), this.rotateEnabled() && this._rotatePoly && this._rotatePoly.pm.enabled() && (this._rotatePoly.setLatLngs(this._rotateLayer(r, this._rotatePoly.getLatLngs(), this._getRotationCenter(), L.PM.Matrix.init(), this._rotatePoly._map)), this._rotatePoly.pm._initMarkers());
    let n = this.getAngle() - e;
    n = n < 0 ? n + 360 : n, this._startAngle = e, this._fireRotation(this._layer, n, i, this._layer), this._fireRotation(this._map || this._layer._map, n, i, this._layer), delete this._startAngle, this._fireChange(this._layer.getLatLngs(), "Rotation");
  }, rotateLayerToAngle(t) {
    let e = t - this.getAngle();
    this.rotateLayer(e);
  }, getAngle() {
    return this._angle || 0;
  }, setInitAngle(t) {
    this._setAngle(t);
  }, getRotationCenter() {
    return this._getRotationCenter();
  }, setRotationCenter(t) {
    this._rotationCenter = t, this._rotatePoly && this._rotatePoly.pm.setRotationCenter(t);
  } }, Yl = L_;
  var b_ = L.Class.extend({ includes: [Hl, Fe, Yl, Tt], options: { snappable: true, snapDistance: 20, allowSelfIntersection: true, allowSelfIntersectionEdit: false, preventMarkerRemoval: false, removeLayerBelowMinVertexCount: true, limitMarkersToCount: -1, hideMiddleMarkers: false, snapSegment: true, syncLayersOnDrag: false, draggable: true, allowEditing: true, allowRemoval: true, allowCutting: true, allowRotation: true, addVertexOn: "click", removeVertexOn: "contextmenu", removeVertexValidation: void 0, addVertexValidation: void 0, moveVertexValidation: void 0, resizeableCircleMarker: false, resizableCircle: true }, setOptions(t) {
    L.Util.setOptions(this, t);
  }, getOptions() {
    return this.options;
  }, applyOptions() {
  }, isPolygon() {
    return this._layer instanceof L.Polygon;
  }, getShape() {
    return this._shape;
  }, _setPane(t, e) {
    e === "layerPane" ? t.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.layerPane || "overlayPane" : e === "vertexPane" ? t.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.vertexPane || "markerPane" : e === "markerPane" && (t.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.markerPane || "markerPane");
  }, remove() {
    (this._map || this._layer._map).pm.removeLayer({ target: this._layer });
  }, _vertexValidation(t, e) {
    let i = e.target, r = { layer: this._layer, marker: i, event: e }, n = "";
    return t === "move" ? n = "moveVertexValidation" : t === "add" ? n = "addVertexValidation" : t === "remove" && (n = "removeVertexValidation"), this.options[n] && typeof this.options[n] == "function" && !this.options[n](r) ? (t === "move" && (i._cancelDragEventChain = i.getLatLng()), false) : (i._cancelDragEventChain = null, true);
  }, _vertexValidationDrag(t) {
    return t._cancelDragEventChain ? (t._latlng = t._cancelDragEventChain, t.update(), false) : true;
  }, _vertexValidationDragEnd(t) {
    return t._cancelDragEventChain ? (t._cancelDragEventChain = null, false) : true;
  } }), H = b_;
  H.LayerGroup = L.Class.extend({ initialize(t) {
    this._layerGroup = t, this._layers = this.getLayers(), this._getMap(), this._layers.forEach((r) => this._initLayer(r));
    let e = (r) => {
      if (r.layer._pmTempLayer)
        return;
      this._layers = this.getLayers();
      let n = this._layers.filter((s) => !s.pm._parentLayerGroup || !(this._layerGroup._leaflet_id in s.pm._parentLayerGroup));
      n.forEach((s) => {
        this._initLayer(s);
      }), n.length > 0 && this._getMap() && this._getMap().pm.globalEditModeEnabled() && this.enabled() && this.enable(this.getOptions());
    };
    this._layerGroup.on("layeradd", L.Util.throttle(e, 100, this), this), this._layerGroup.on("layerremove", (r) => {
      this._removeLayerFromGroup(r.target);
    }, this);
    let i = (r) => {
      r.target._pmTempLayer || (this._layers = this.getLayers());
    };
    this._layerGroup.on("layerremove", L.Util.throttle(i, 100, this), this);
  }, enable(t, e = []) {
    e.length === 0 && (this._layers = this.getLayers()), this._options = t, this._layers.forEach((i) => {
      i instanceof L.LayerGroup ? e.indexOf(i._leaflet_id) === -1 && (e.push(i._leaflet_id), i.pm.enable(t, e)) : i.pm.enable(t);
    });
  }, disable(t = []) {
    t.length === 0 && (this._layers = this.getLayers()), this._layers.forEach((e) => {
      e instanceof L.LayerGroup ? t.indexOf(e._leaflet_id) === -1 && (t.push(e._leaflet_id), e.pm.disable(t)) : e.pm.disable();
    });
  }, enabled(t = []) {
    return t.length === 0 && (this._layers = this.getLayers()), !!this._layers.find((i) => i instanceof L.LayerGroup ? t.indexOf(i._leaflet_id) === -1 ? (t.push(i._leaflet_id), i.pm.enabled(t)) : false : i.pm.enabled());
  }, toggleEdit(t, e = []) {
    e.length === 0 && (this._layers = this.getLayers()), this._options = t, this._layers.forEach((i) => {
      i instanceof L.LayerGroup ? e.indexOf(i._leaflet_id) === -1 && (e.push(i._leaflet_id), i.pm.toggleEdit(t, e)) : i.pm.toggleEdit(t);
    });
  }, _initLayer(t) {
    let e = L.Util.stamp(this._layerGroup);
    t.pm._parentLayerGroup || (t.pm._parentLayerGroup = {}), t.pm._parentLayerGroup[e] = this._layerGroup;
  }, _removeLayerFromGroup(t) {
    if (t.pm && t.pm._layerGroup) {
      let e = L.Util.stamp(this._layerGroup);
      delete t.pm._layerGroup[e];
    }
  }, dragging() {
    return this._layers = this.getLayers(), this._layers ? !!this._layers.find((e) => e.pm.dragging()) : false;
  }, getOptions() {
    return this.options;
  }, _getMap() {
    return this._map || this._layers.find((t) => !!t._map)?._map || null;
  }, getLayers(t = false, e = true, i = true, r = []) {
    let n = [];
    return t ? this._layerGroup.getLayers().forEach((s) => {
      n.push(s), s instanceof L.LayerGroup && r.indexOf(s._leaflet_id) === -1 && (r.push(s._leaflet_id), n = n.concat(s.pm.getLayers(true, true, true, r)));
    }) : n = this._layerGroup.getLayers(), i && (n = n.filter((s) => !(s instanceof L.LayerGroup))), e && (n = n.filter((s) => !!s.pm), n = n.filter((s) => !s._pmTempLayer), n = n.filter((s) => !L.PM.optIn && !s.options.pmIgnore || L.PM.optIn && s.options.pmIgnore === false)), n;
  }, setOptions(t, e = []) {
    e.length === 0 && (this._layers = this.getLayers()), this.options = t, this._layers.forEach((i) => {
      i.pm && (i instanceof L.LayerGroup ? e.indexOf(i._leaflet_id) === -1 && (e.push(i._leaflet_id), i.pm.setOptions(t, e)) : i.pm.setOptions(t));
    });
  } });
  H.Marker = H.extend({ _shape: "Marker", initialize(t) {
    this._layer = t, this._enabled = false, this._layer.on("dragend", this._onDragEnd, this);
  }, enable(t = { draggable: true }) {
    if (L.Util.setOptions(this, t), !this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }
    this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._layer.on("remove", this.disable, this), this._enabled = true, this._fireEnable();
  }, disable() {
    this.enabled() && (this.disableLayerDrag(), this._layer.off("remove", this.disable, this), this._layer.off("contextmenu", this._removeMarker, this), this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable(), this._enabled = false);
  }, enabled() {
    return this._enabled;
  }, toggleEdit(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(), this.options.draggable ? this.enableLayerDrag() : this.disableLayerDrag(), this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this);
  }, _removeMarker(t) {
    let e = t.target;
    e.remove(), this._fireRemove(e), this._fireRemove(this._map, e);
  }, _onDragEnd() {
    this._fireEdit(), this._layerEdited = true;
  }, _initSnappableMarkers() {
    let t = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, t.off("pm:drag", this._handleSnapping, this), t.on("pm:drag", this._handleSnapping, this), t.off("pm:dragend", this._cleanupSnapping, this), t.on("pm:dragend", this._cleanupSnapping, this), t.off("pm:dragstart", this._unsnap, this), t.on("pm:dragstart", this._unsnap, this);
  }, _disableSnapping() {
    let t = this._layer;
    t.off("pm:drag", this._handleSnapping, this), t.off("pm:dragend", this._cleanupSnapping, this), t.off("pm:dragstart", this._unsnap, this);
  } });
  var St = xt(Le());
  var v_ = { filterMarkerGroup() {
    this.markerCache = [], this.createCache(), this._layer.on("pm:edit", this.createCache, this), this.applyLimitFilters({}), this.throttledApplyLimitFilters || (this.throttledApplyLimitFilters = L.Util.throttle(this.applyLimitFilters, 100, this)), this._layer.on("pm:disable", this._removeMarkerLimitEvents, this), this._layer.on("remove", this._removeMarkerLimitEvents, this), this.options.limitMarkersToCount > -1 && (this._layer.on("pm:vertexremoved", this._initMarkers, this), this._map.on("mousemove", this.throttledApplyLimitFilters, this));
  }, _removeMarkerLimitEvents() {
    this._map.off("mousemove", this.throttledApplyLimitFilters, this), this._layer.off("pm:edit", this.createCache, this), this._layer.off("pm:disable", this._removeMarkerLimitEvents, this), this._layer.off("pm:vertexremoved", this._initMarkers, this);
  }, createCache() {
    let t = [...this._markerGroup.getLayers(), ...this.markerCache];
    this.markerCache = t.filter((e, i, r) => r.indexOf(e) === i);
  }, _removeFromCache(t) {
    let e = this.markerCache.indexOf(t);
    e > -1 && this.markerCache.splice(e, 1);
  }, renderLimits(t) {
    this.markerCache.forEach((e) => {
      t.includes(e) ? this._markerGroup.addLayer(e) : this._markerGroup.removeLayer(e);
    });
  }, applyLimitFilters({ latlng: t = { lat: 0, lng: 0 } }) {
    if (this._preventRenderMarkers)
      return;
    let i = [...this._filterClosestMarkers(t)];
    this.renderLimits(i);
  }, _filterClosestMarkers(t) {
    let e = [...this.markerCache], i = this.options.limitMarkersToCount;
    return i === -1 ? e : (e.sort((n, s) => {
      let a = n._latlng.distanceTo(t), o = s._latlng.distanceTo(t);
      return a - o;
    }), e.filter((n, s) => i > -1 ? s < i : true));
  }, _preventRenderMarkers: false, _preventRenderingMarkers(t) {
    this._preventRenderMarkers = !!t;
  } }, Jl = v_;
  H.Line = H.extend({ includes: [Jl], _shape: "Line", initialize(t) {
    this._layer = t, this._enabled = false;
  }, enable(t) {
    if (L.Util.setOptions(this, t), this._map = this._layer._map, !!this._map) {
      if (!this.options.allowEditing) {
        this.disable();
        return;
      }
      this.enabled() && this.disable(), this._enabled = true, this._initMarkers(), this.applyOptions(), this._layer.on("remove", this.disable, this), this.options.allowSelfIntersection || this._layer.on("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this), this.options.allowSelfIntersection ? this.cachedColor = void 0 : (this._layer.options.color !== "#f00000ff" ? (this.cachedColor = this._layer.options.color, this.isRed = false) : this.isRed = true, this._handleLayerStyle()), this._fireEnable();
    }
  }, disable() {
    if (!this.enabled() || this._dragging)
      return;
    this._enabled = false, this._markerGroup.clearLayers(), this._markerGroup.removeFrom(this._map), this._layer.off("remove", this.disable, this), this.options.allowSelfIntersection || this._layer.off("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this);
    let t = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(t, "leaflet-pm-draggable"), this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable();
  }, enabled() {
    return this._enabled;
  }, toggleEdit(t) {
    return this.enabled() ? this.disable() : this.enable(t), this.enabled();
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping();
  }, _initMarkers() {
    let t = this._map, e = this._layer.getLatLngs();
    this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = true;
    let i = (r) => {
      if (Array.isArray(r[0]))
        return r.map(i, this);
      let n = r.map(this._createMarker, this);
      return this.options.hideMiddleMarkers !== true && r.map((s, a) => {
        let o = this.isPolygon() ? (a + 1) % r.length : a + 1;
        return this._createMiddleMarker(n[a], n[o]);
      }), n;
    };
    this._markers = i(e), this.filterMarkerGroup(), t.addLayer(this._markerGroup);
  }, _createMarker(t) {
    let e = new L.Marker(t, { draggable: true, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(e, "vertexPane"), e._pmTempLayer = true, this.options.rotate ? (e.on("dragstart", this._onRotateStart, this), e.on("drag", this._onRotate, this), e.on("dragend", this._onRotateEnd, this)) : (e.on("click", this._onVertexClick, this), e.on("dragstart", this._onMarkerDragStart, this), e.on("move", this._onMarkerDrag, this), e.on("dragend", this._onMarkerDragEnd, this), this.options.preventMarkerRemoval || e.on(this.options.removeVertexOn, this._removeMarker, this)), this._markerGroup.addLayer(e), e;
  }, _createMiddleMarker(t, e) {
    if (!t || !e)
      return false;
    let i = L.PM.Utils.calcMiddleLatLng(this._map, t.getLatLng(), e.getLatLng()), r = this._createMarker(i), n = L.divIcon({ className: "marker-icon marker-icon-middle" });
    return r.setIcon(n), r.leftM = t, r.rightM = e, t._middleMarkerNext = r, e._middleMarkerPrev = r, r.on(this.options.addVertexOn, this._onMiddleMarkerClick, this), r.on("movestart", this._onMiddleMarkerMoveStart, this), r;
  }, _onMiddleMarkerClick(t) {
    let e = t.target;
    if (!this._vertexValidation("add", t))
      return;
    let i = L.divIcon({ className: "marker-icon" });
    e.setIcon(i), this._addMarker(e, e.leftM, e.rightM);
  }, _onMiddleMarkerMoveStart(t) {
    let e = t.target;
    if (e.on("moveend", this._onMiddleMarkerMoveEnd, this), !this._vertexValidation("add", t)) {
      e.on("move", this._onMiddleMarkerMovePrevent, this);
      return;
    }
    e._dragging = true, this._addMarker(e, e.leftM, e.rightM);
  }, _onMiddleMarkerMovePrevent(t) {
    let e = t.target;
    this._vertexValidationDrag(e);
  }, _onMiddleMarkerMoveEnd(t) {
    let e = t.target;
    if (e.off("move", this._onMiddleMarkerMovePrevent, this), e.off("moveend", this._onMiddleMarkerMoveEnd, this), !this._vertexValidationDragEnd(e))
      return;
    let i = L.divIcon({ className: "marker-icon" });
    e.setIcon(i), setTimeout(() => {
      delete e._dragging;
    }, 100);
  }, _addMarker(t, e, i) {
    t.off("movestart", this._onMiddleMarkerMoveStart, this), t.off(this.options.addVertexOn, this._onMiddleMarkerClick, this);
    let r = t.getLatLng(), n = this._layer._latlngs;
    delete t.leftM, delete t.rightM;
    let { indexPath: s, index: a, parentPath: o } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), l = s.length > 1 ? (0, St.default)(n, o) : n, u = s.length > 1 ? (0, St.default)(this._markers, o) : this._markers;
    l.splice(a + 1, 0, r), u.splice(a + 1, 0, t), this._layer.setLatLngs(n), this.options.hideMiddleMarkers !== true && (this._createMiddleMarker(e, t), this._createMiddleMarker(t, i)), this._fireEdit(), this._layerEdited = true, this._fireChange(this._layer.getLatLngs(), "Edit"), this._fireVertexAdded(t, L.PM.Utils.findDeepMarkerIndex(this._markers, t).indexPath, r), this.options.snappable && this._initSnappableMarkers();
  }, hasSelfIntersection() {
    return zt(this._layer.toGeoJSON(15)).features.length > 0;
  }, _handleSelfIntersectionOnVertexRemoval() {
    this._handleLayerStyle(true) && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers());
  }, _handleLayerStyle(t) {
    let e = this._layer, i, r;
    if (this.options.allowSelfIntersection ? i = false : (r = zt(this._layer.toGeoJSON(15)), i = r.features.length > 0), i) {
      if (!this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._updateDisabledMarkerStyle(this._markers, true), this.isRed)
        return i;
      t ? this._flashLayer() : (e.setStyle({ color: "#f00000ff" }), this.isRed = true), this._fireIntersect(r);
    } else
      e.setStyle({ color: this.cachedColor }), this.isRed = false, !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._updateDisabledMarkerStyle(this._markers, false);
    return i;
  }, _flashLayer() {
    this.cachedColor || (this.cachedColor = this._layer.options.color), this._layer.setStyle({ color: "#f00000ff" }), this.isRed = true, window.setTimeout(() => {
      this._layer.setStyle({ color: this.cachedColor }), this.isRed = false;
    }, 200);
  }, _updateDisabledMarkerStyle(t, e) {
    t.forEach((i) => {
      Array.isArray(i) ? this._updateDisabledMarkerStyle(i, e) : i._icon && (e && !this._checkMarkerAllowedToDrag(i) ? L.DomUtil.addClass(i._icon, "vertexmarker-disabled") : L.DomUtil.removeClass(i._icon, "vertexmarker-disabled"));
    });
  }, _removeMarker(t) {
    let e = t.target;
    if (!this._vertexValidation("remove", t))
      return;
    this.options.allowSelfIntersection || (this._coordsBeforeEdit = vt(this._layer, this._layer.getLatLngs()));
    let i = this._layer.getLatLngs(), { indexPath: r, index: n, parentPath: s } = L.PM.Utils.findDeepMarkerIndex(this._markers, e);
    if (!r)
      return;
    let a = r.length > 1 ? (0, St.default)(i, s) : i, o = r.length > 1 ? (0, St.default)(this._markers, s) : this._markers;
    if (!this.options.removeLayerBelowMinVertexCount && (a.length <= 2 || this.isPolygon() && a.length <= 3)) {
      this._flashLayer();
      return;
    }
    a.splice(n, 1), this._layer.setLatLngs(i), this.isPolygon() && a.length <= 2 && a.splice(0, a.length);
    let l = false;
    if (a.length <= 1 && (a.splice(0, a.length), s.length > 1 && r.length > 1 && (i = ve(i)), this._layer.setLatLngs(i), this._initMarkers(), l = true), be(i) || this._layer.remove(), i = ve(i), this._layer.setLatLngs(i), this._markers = ve(this._markers), !l && (o = r.length > 1 ? (0, St.default)(this._markers, s) : this._markers, e._middleMarkerPrev && (this._markerGroup.removeLayer(e._middleMarkerPrev), this._removeFromCache(e._middleMarkerPrev)), e._middleMarkerNext && (this._markerGroup.removeLayer(e._middleMarkerNext), this._removeFromCache(e._middleMarkerNext)), this._markerGroup.removeLayer(e), this._removeFromCache(e), o)) {
      let u, f;
      if (this.isPolygon() ? (u = (n + 1) % o.length, f = (n + (o.length - 1)) % o.length) : (f = n - 1 < 0 ? void 0 : n - 1, u = n + 1 >= o.length ? void 0 : n + 1), u !== f) {
        let d = o[f], P = o[u];
        this.options.hideMiddleMarkers !== true && this._createMiddleMarker(d, P);
      }
      o.splice(n, 1);
    }
    this._fireEdit(), this._layerEdited = true, this._fireVertexRemoved(e, r), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, updatePolygonCoordsFromMarkerDrag(t) {
    let e = this._layer.getLatLngs(), i = t.getLatLng(), { indexPath: r, index: n, parentPath: s } = L.PM.Utils.findDeepMarkerIndex(this._markers, t);
    (r.length > 1 ? (0, St.default)(e, s) : e).splice(n, 1, i), this._layer.setLatLngs(e);
  }, _getNeighborMarkers(t) {
    let { indexPath: e, index: i, parentPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, t), n = e.length > 1 ? (0, St.default)(this._markers, r) : this._markers, s = (i + 1) % n.length, a = (i + (n.length - 1)) % n.length, o = n[a], l = n[s];
    return { prevMarker: o, nextMarker: l };
  }, _checkMarkerAllowedToDrag(t) {
    let { prevMarker: e, nextMarker: i } = this._getNeighborMarkers(t), r = L.polyline([e.getLatLng(), t.getLatLng()]), n = L.polyline([t.getLatLng(), i.getLatLng()]), s = pt(this._layer.toGeoJSON(15), r.toGeoJSON(15)).features.length, a = pt(this._layer.toGeoJSON(15), n.toGeoJSON(15)).features.length;
    return t.getLatLng() === this._markers[0][0].getLatLng() ? a += 1 : t.getLatLng() === this._markers[0][this._markers[0].length - 1].getLatLng() && (s += 1), !(s <= 2 && a <= 2);
  }, _onMarkerDragStart(t) {
    let e = t.target;
    if (this.cachedColor || (this.cachedColor = this._layer.options.color), !this._vertexValidation("move", t))
      return;
    let { indexPath: i } = L.PM.Utils.findDeepMarkerIndex(this._markers, e);
    this._fireMarkerDragStart(t, i), this.options.allowSelfIntersection || (this._coordsBeforeEdit = vt(this._layer, this._layer.getLatLngs())), !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() ? this._markerAllowedToDrag = this._checkMarkerAllowedToDrag(e) : this._markerAllowedToDrag = null;
  }, _onMarkerDrag(t) {
    let e = t.target;
    if (!this._vertexValidationDrag(e))
      return;
    let { indexPath: i, index: r, parentPath: n } = L.PM.Utils.findDeepMarkerIndex(this._markers, e);
    if (!i)
      return;
    if (!this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this.hasSelfIntersection() && this._markerAllowedToDrag === false) {
      this._layer.setLatLngs(this._coordsBeforeEdit), this._initMarkers(), this._handleLayerStyle();
      return;
    }
    this.updatePolygonCoordsFromMarkerDrag(e);
    let s = i.length > 1 ? (0, St.default)(this._markers, n) : this._markers, a = (r + 1) % s.length, o = (r + (s.length - 1)) % s.length, l = e.getLatLng(), u = s[o].getLatLng(), f = s[a].getLatLng();
    if (e._middleMarkerNext) {
      let d = L.PM.Utils.calcMiddleLatLng(this._map, l, f);
      e._middleMarkerNext.setLatLng(d);
    }
    if (e._middleMarkerPrev) {
      let d = L.PM.Utils.calcMiddleLatLng(this._map, l, u);
      e._middleMarkerPrev.setLatLng(d);
    }
    this.options.allowSelfIntersection || this._handleLayerStyle(), this._fireMarkerDrag(t, i), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _onMarkerDragEnd(t) {
    let e = t.target;
    if (!this._vertexValidationDragEnd(e))
      return;
    let { indexPath: i } = L.PM.Utils.findDeepMarkerIndex(this._markers, e), r = this.hasSelfIntersection();
    r && this.options.allowSelfIntersectionEdit && this._markerAllowedToDrag && (r = false);
    let n = !this.options.allowSelfIntersection && r;
    if (this._fireMarkerDragEnd(t, i, n), n) {
      this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers(), this.options.snappable && this._initSnappableMarkers(), this._handleLayerStyle(), this._fireLayerReset(t, i);
      return;
    }
    !this.options.allowSelfIntersection && this.options.allowSelfIntersectionEdit && this._handleLayerStyle(), this._fireEdit(), this._layerEdited = true, this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _onVertexClick(t) {
    let e = t.target;
    if (e._dragging)
      return;
    let { indexPath: i } = L.PM.Utils.findDeepMarkerIndex(this._markers, e);
    this._fireVertexClick(t, i);
  } });
  H.Polygon = H.Line.extend({ _shape: "Polygon", _checkMarkerAllowedToDrag(t) {
    let { prevMarker: e, nextMarker: i } = this._getNeighborMarkers(t), r = L.polyline([e.getLatLng(), t.getLatLng()]), n = L.polyline([t.getLatLng(), i.getLatLng()]), s = pt(this._layer.toGeoJSON(15), r.toGeoJSON(15)).features.length, a = pt(this._layer.toGeoJSON(15), n.toGeoJSON(15)).features.length;
    return !(s <= 2 && a <= 2);
  } });
  H.Rectangle = H.Polygon.extend({ _shape: "Rectangle", _initMarkers() {
    let t = this._map, e = this._findCorners();
    this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.FeatureGroup(), this._markerGroup._pmTempLayer = true, t.addLayer(this._markerGroup), this._markers = [], this._markers[0] = e.map(this._createMarker, this), [this._cornerMarkers] = this._markers, this._layer.getLatLngs()[0].forEach((i, r) => {
      let n = this._cornerMarkers.find((s) => s._index === r);
      n && n.setLatLng(i);
    });
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(), this._addMarkerEvents();
  }, _createMarker(t, e) {
    let i = new L.Marker(t, { draggable: true, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(i, "vertexPane"), i._origLatLng = t, i._index = e, i._pmTempLayer = true, i.on("click", this._onVertexClick, this), this._markerGroup.addLayer(i), i;
  }, _addMarkerEvents() {
    this._markers[0].forEach((t) => {
      t.on("dragstart", this._onMarkerDragStart, this), t.on("drag", this._onMarkerDrag, this), t.on("dragend", this._onMarkerDragEnd, this), this.options.preventMarkerRemoval || t.on("contextmenu", this._removeMarker, this);
    });
  }, _removeMarker() {
    return null;
  }, _onMarkerDragStart(t) {
    if (!this._vertexValidation("move", t))
      return;
    let e = t.target, i = this._cornerMarkers;
    e._oppositeCornerLatLng = i.find((n) => n._index === (e._index + 2) % 4).getLatLng(), e._snapped = false;
    let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, e);
    this._fireMarkerDragStart(t, r);
  }, _onMarkerDrag(t) {
    let e = t.target;
    if (!this._vertexValidationDrag(e) || e._index === void 0)
      return;
    this._adjustRectangleForMarkerMove(e);
    let { indexPath: i } = L.PM.Utils.findDeepMarkerIndex(this._markers, e);
    this._fireMarkerDrag(t, i), this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _onMarkerDragEnd(t) {
    let e = t.target;
    if (!this._vertexValidationDragEnd(e))
      return;
    this._cornerMarkers.forEach((r) => {
      delete r._oppositeCornerLatLng;
    });
    let { indexPath: i } = L.PM.Utils.findDeepMarkerIndex(this._markers, e);
    this._fireMarkerDragEnd(t, i), this._fireEdit(), this._layerEdited = true, this._fireChange(this._layer.getLatLngs(), "Edit");
  }, _adjustRectangleForMarkerMove(t) {
    L.extend(t._origLatLng, t._latlng);
    let e = L.PM.Utils._getRotatedRectangle(t.getLatLng(), t._oppositeCornerLatLng, this.getAngle(), this._map);
    this._layer.setLatLngs(e), this._adjustAllMarkers(), this._layer.redraw();
  }, _adjustAllMarkers() {
    let t = this._layer.getLatLngs()[0];
    t && t.length !== 4 && t.length > 0 ? (t.forEach((i, r) => {
      this._cornerMarkers[r].setLatLng(i);
    }), this._cornerMarkers.slice(t.length).forEach((i) => {
      i.setLatLng(t[0]);
    })) : !t || !t.length ? console.error("The layer has no LatLngs") : this._cornerMarkers.forEach((e) => {
      e.setLatLng(t[e._index]);
    });
  }, _findCorners() {
    this._angle === void 0 && this.setInitAngle(ke(this._map, this._layer.getLatLngs()[0][0], this._layer.getLatLngs()[0][1]) || 0);
    let t = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(t[0], t[2], this.getAngle(), this._map || this);
  } });
  H.CircleMarker = H.extend({ _shape: "CircleMarker", initialize(t) {
    this._layer = t, this._enabled = false, this._minRadiusOption = "minRadiusCircleMarker", this._maxRadiusOption = "maxRadiusCircleMarker", this._editableOption = "resizeableCircleMarker", this._updateHiddenPolyCircle();
  }, enable(t = { draggable: true, snappable: true }) {
    if (L.Util.setOptions(this, t), this.options.editable && (this.options.resizeableCircleMarker = this.options.editable, delete this.options.editable), !this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }
    this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._layer.on("remove", this.disable, this), this._enabled = true, this._extendingEnable(), this._updateHiddenPolyCircle(), this._fireEnable();
  }, _extendingEnable() {
    this._layer.on("pm:dragstart", this._onDragStart, this), this._layer.on("pm:drag", this._onMarkerDrag, this), this._layer.on("pm:dragend", this._onMarkerDragEnd, this);
  }, disable() {
    this.dragging() || (this._map || (this._map = this._layer._map), this._map && this.enabled() && (this.layerDragEnabled() && this.disableLayerDrag(), this.options[this._editableOption] ? (this._helperLayers && this._helperLayers.clearLayers(), this._map.off("move", this._syncMarkers, this), this._outerMarker.off("drag", this._handleOuterMarkerSnapping, this)) : this._map.off("move", this._updateHiddenPolyCircle, this), this._extendingDisable(), this._layer.off("remove", this.disable, this), this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable(), this._enabled = false));
  }, _extendingDisable() {
    this._layer.off("contextmenu", this._removeMarker, this);
  }, enabled() {
    return this._enabled;
  }, toggleEdit(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, applyOptions() {
    this.options[this._editableOption] ? (this._initMarkers(), this._map.on("move", this._syncMarkers, this), this.options.snappable ? (this._initSnappableMarkers(), this._outerMarker.on("drag", this._handleOuterMarkerSnapping, this), this._outerMarker.on("move", this._syncHintLine, this), this._outerMarker.on("move", this._syncCircleRadius, this), this._centerMarker.on("move", this._moveCircle, this)) : this._disableSnapping()) : (this.options.draggable && this.enableLayerDrag(), this._map.on("move", this._updateHiddenPolyCircle, this), this.options.snappable ? this._initSnappableMarkersDrag() : this._disableSnappingDrag()), this._extendingApplyOptions();
  }, _extendingApplyOptions() {
    this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this);
  }, _initMarkers() {
    let t = this._map;
    this._helperLayers && this._helperLayers.clearLayers(), this._helperLayers = new L.FeatureGroup(), this._helperLayers._pmTempLayer = true, this._helperLayers.addTo(t);
    let e = this._layer.getLatLng(), i = this._layer._radius, r = this._getLatLngOnCircle(e, i);
    this._centerMarker = this._createCenterMarker(e), this._outerMarker = this._createOuterMarker(r), this._markers = [this._centerMarker, this._outerMarker], this._createHintLine(this._centerMarker, this._outerMarker);
  }, _getLatLngOnCircle(t, e) {
    let i = this._map.project(t), r = L.point(i.x + e, i.y);
    return this._map.unproject(r);
  }, _createHintLine(t, e) {
    let i = t.getLatLng(), r = e.getLatLng();
    this._hintline = L.polyline([i, r], this.options.hintlineStyle), this._setPane(this._hintline, "layerPane"), this._hintline._pmTempLayer = true, this._helperLayers.addLayer(this._hintline);
  }, _createCenterMarker(t) {
    let e = this._createMarker(t);
    return this.options.draggable ? L.DomUtil.addClass(e._icon, "leaflet-pm-draggable") : e.dragging.disable(), e;
  }, _createOuterMarker(t) {
    let e = this._createMarker(t);
    return e.on("drag", this._resizeCircle, this), e;
  }, _createMarker(t) {
    let e = new L.Marker(t, { draggable: true, icon: L.divIcon({ className: "marker-icon" }) });
    return this._setPane(e, "vertexPane"), e._origLatLng = t, e._pmTempLayer = true, e.on("dragstart", this._onMarkerDragStart, this), e.on("drag", this._onMarkerDrag, this), e.on("dragend", this._onMarkerDragEnd, this), e.on("click", this._onVertexClick, this), this._helperLayers.addLayer(e), e;
  }, _moveCircle(t) {
    if (t.target._cancelDragEventChain)
      return;
    let i = this._centerMarker.getLatLng();
    this._layer.setLatLng(i);
    let r = this._layer._radius, n = this._getLatLngOnCircle(i, r);
    this._outerMarker._latlng = n, this._outerMarker.update(), this._syncHintLine(), this._updateHiddenPolyCircle(), this._fireCenterPlaced("Edit"), this._fireChange(this._layer.getLatLng(), "Edit");
  }, _syncMarkers() {
    let t = this._layer.getLatLng(), e = this._layer._radius, i = this._getLatLngOnCircle(t, e);
    this._outerMarker.setLatLng(i), this._centerMarker.setLatLng(t), this._syncHintLine(), this._updateHiddenPolyCircle();
  }, _resizeCircle() {
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker()), this._syncHintLine(), this._syncCircleRadius();
  }, _syncCircleRadius() {
    let t = this._centerMarker.getLatLng(), e = this._outerMarker.getLatLng(), i = this._distanceCalculation(t, e);
    this.options[this._minRadiusOption] && i < this.options[this._minRadiusOption] ? this._layer.setRadius(this.options[this._minRadiusOption]) : this.options[this._maxRadiusOption] && i > this.options[this._maxRadiusOption] ? this._layer.setRadius(this.options[this._maxRadiusOption]) : this._layer.setRadius(i), this._updateHiddenPolyCircle(), this._fireChange(this._layer.getLatLng(), "Edit");
  }, _syncHintLine() {
    let t = this._centerMarker.getLatLng(), e = this._outerMarker.getLatLng();
    this._hintline.setLatLngs([t, e]);
  }, _removeMarker() {
    this.options[this._editableOption] && this.disable(), this._layer.remove(), this._fireRemove(this._layer), this._fireRemove(this._map, this._layer);
  }, _onDragStart() {
    this._map.pm.Draw.CircleMarker._layerIsDragging = true;
  }, _onMarkerDragStart(t) {
    this._vertexValidation("move", t) && this._fireMarkerDragStart(t);
  }, _onMarkerDrag(t) {
    let e = t.target;
    e instanceof L.Marker && !this._vertexValidationDrag(e) || this._fireMarkerDrag(t);
  }, _onMarkerDragEnd(t) {
    this._extedingMarkerDragEnd();
    let e = t.target;
    this._vertexValidationDragEnd(e) && (this.options[this._editableOption] && (this._fireEdit(), this._layerEdited = true), this._fireMarkerDragEnd(t));
  }, _extedingMarkerDragEnd() {
    this._map.pm.Draw.CircleMarker._layerIsDragging = false;
  }, _initSnappableMarkersDrag() {
    let t = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, t.off("pm:drag", this._handleSnapping, this), t.on("pm:drag", this._handleSnapping, this), t.off("pm:dragend", this._cleanupSnapping, this), t.on("pm:dragend", this._cleanupSnapping, this), t.off("pm:dragstart", this._unsnap, this), t.on("pm:dragstart", this._unsnap, this);
  }, _disableSnappingDrag() {
    let t = this._layer;
    t.off("pm:drag", this._handleSnapping, this), t.off("pm:dragend", this._cleanupSnapping, this), t.off("pm:dragstart", this._unsnap, this);
  }, _updateHiddenPolyCircle() {
    let t = this._layer._map || this._map;
    if (t) {
      let e = L.PM.Utils.pxRadiusToMeterRadius(this._layer.getRadius(), t, this._layer.getLatLng()), i = L.circle(this._layer.getLatLng(), this._layer.options);
      i.setRadius(e);
      let r = t && t.pm._isCRSSimple();
      this._hiddenPolyCircle ? this._hiddenPolyCircle.setLatLngs(L.PM.Utils.circleToPolygon(i, 200, !r).getLatLngs()) : this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(i, 200, !r), this._hiddenPolyCircle._parentCopy || (this._hiddenPolyCircle._parentCopy = this._layer);
    }
  }, _getNewDestinationOfOuterMarker() {
    let t = this._centerMarker.getLatLng(), e = this._outerMarker.getLatLng(), i = this._distanceCalculation(t, e);
    return this.options[this._minRadiusOption] && i < this.options[this._minRadiusOption] ? e = te(this._map, t, e, this._getMinDistanceInMeter(t)) : this.options[this._maxRadiusOption] && i > this.options[this._maxRadiusOption] && (e = te(this._map, t, e, this._getMaxDistanceInMeter(t))), e;
  }, _handleOuterMarkerSnapping() {
    if (this._outerMarker._snapped) {
      let t = this._centerMarker.getLatLng(), e = this._outerMarker.getLatLng(), i = this._distanceCalculation(t, e);
      this.options[this._minRadiusOption] && i < this.options[this._minRadiusOption] ? this._outerMarker.setLatLng(this._outerMarker._orgLatLng) : this.options[this._maxRadiusOption] && i > this.options[this._maxRadiusOption] && this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
    }
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
  }, _distanceCalculation(t, e) {
    return this._map.project(t).distanceTo(this._map.project(e));
  }, _getMinDistanceInMeter(t) {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._minRadiusOption], this._map, t);
  }, _getMaxDistanceInMeter(t) {
    return L.PM.Utils.pxRadiusToMeterRadius(this.options[this._maxRadiusOption], this._map, t);
  }, _onVertexClick(t) {
    t.target._dragging || this._fireVertexClick(t, void 0);
  } });
  H.Circle = H.CircleMarker.extend({ _shape: "Circle", initialize(t) {
    this._layer = t, this._enabled = false, this._minRadiusOption = "minRadiusCircle", this._maxRadiusOption = "maxRadiusCircle", this._editableOption = "resizableCircle", this._updateHiddenPolyCircle();
  }, enable(t) {
    L.PM.Edit.CircleMarker.prototype.enable.call(this, t || {});
  }, _extendingEnable() {
  }, _extendingDisable() {
    this._layer.off("remove", this.disable, this);
    let t = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(t, "leaflet-pm-draggable");
  }, _extendingApplyOptions() {
  }, _syncMarkers() {
  }, _removeMarker() {
  }, _onDragStart() {
  }, _extedingMarkerDragEnd() {
  }, _updateHiddenPolyCircle() {
    let t = this._map && this._map.pm._isCRSSimple();
    this._hiddenPolyCircle ? this._hiddenPolyCircle.setLatLngs(L.PM.Utils.circleToPolygon(this._layer, 200, !t).getLatLngs()) : this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(this._layer, 200, !t), this._hiddenPolyCircle._parentCopy || (this._hiddenPolyCircle._parentCopy = this._layer);
  }, _distanceCalculation(t, e) {
    return this._map.distance(t, e);
  }, _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  }, _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  }, _onVertexClick(t) {
    t.target._dragging || this._fireVertexClick(t, void 0);
  } });
  H.ImageOverlay = H.extend({ _shape: "ImageOverlay", initialize(t) {
    this._layer = t, this._enabled = false;
  }, toggleEdit(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, enabled() {
    return this._enabled;
  }, enable(t = { draggable: true, snappable: true }) {
    if (L.Util.setOptions(this, t), this._map = this._layer._map, !!this._map) {
      if (!this.options.allowEditing) {
        this.disable();
        return;
      }
      this.enabled() || this.disable(), this.enableLayerDrag(), this._layer.on("remove", this.disable, this), this._enabled = true, this._otherSnapLayers = this._findCorners(), this._fireEnable();
    }
  }, disable() {
    this._dragging || (this._map || (this._map = this._layer._map), this.disableLayerDrag(), this._layer.off("remove", this.disable, this), this.enabled() || (this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable()), this._enabled = false);
  }, _findCorners() {
    let t = this._layer.getBounds(), e = t.getNorthWest(), i = t.getNorthEast(), r = t.getSouthEast(), n = t.getSouthWest();
    return [e, i, r, n];
  } });
  H.Text = H.extend({ _shape: "Text", initialize(t) {
    this._layer = t, this._enabled = false;
  }, enable(t) {
    if (L.Util.setOptions(this, t), !!this.textArea) {
      if (!this.options.allowEditing || !this._layer._map) {
        this.disable();
        return;
      }
      this._map = this._layer._map, this.enabled() && this.disable(), this.applyOptions(), this._safeToCacheDragState = true, this._focusChange(), this.textArea.readOnly = false, this.textArea.classList.remove("pm-disabled"), this._layer.on("remove", this.disable, this), L.DomEvent.on(this.textArea, "input", this._autoResize, this), L.DomEvent.on(this.textArea, "focus", this._focusChange, this), L.DomEvent.on(this.textArea, "blur", this._focusChange, this), this._layer.on("dblclick", L.DomEvent.stop), L.DomEvent.off(this.textArea, "mousedown", this._preventTextSelection), this._enabled = true, this._fireEnable();
    }
  }, disable() {
    if (!this.enabled())
      return;
    this._layer.off("remove", this.disable, this), L.DomEvent.off(this.textArea, "input", this._autoResize, this), L.DomEvent.off(this.textArea, "focus", this._focusChange, this), L.DomEvent.off(this.textArea, "blur", this._focusChange, this), L.DomEvent.off(document, "click", this._documentClick, this), this._focusChange(), this.textArea.readOnly = true, this.textArea.classList.add("pm-disabled");
    let t = document.activeElement;
    this.textArea.focus(), this.textArea.selectionStart = 0, this.textArea.selectionEnd = 0, L.DomEvent.on(this.textArea, "mousedown", this._preventTextSelection), t.focus(), this._disableOnBlurActive = false, this._layerEdited && this._fireUpdate(), this._layerEdited = false, this._fireDisable(), this._enabled = false;
  }, enabled() {
    return this._enabled;
  }, toggleEdit(t) {
    this.enabled() ? this.disable() : this.enable(t);
  }, applyOptions() {
    this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping();
  }, _initSnappableMarkers() {
    let t = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30, this.options.snapSegment = this.options.snapSegment === void 0 ? true : this.options.snapSegment, t.off("pm:drag", this._handleSnapping, this), t.on("pm:drag", this._handleSnapping, this), t.off("pm:dragend", this._cleanupSnapping, this), t.on("pm:dragend", this._cleanupSnapping, this), t.off("pm:dragstart", this._unsnap, this), t.on("pm:dragstart", this._unsnap, this);
  }, _disableSnapping() {
    let t = this._layer;
    t.off("pm:drag", this._handleSnapping, this), t.off("pm:dragend", this._cleanupSnapping, this), t.off("pm:dragstart", this._unsnap, this);
  }, _autoResize() {
    this.textArea.style.height = "1px", this.textArea.style.width = "1px";
    let t = this.textArea.scrollHeight > 21 ? this.textArea.scrollHeight : 21, e = this.textArea.scrollWidth > 16 ? this.textArea.scrollWidth : 16;
    this.textArea.style.height = `${t}px`, this.textArea.style.width = `${e}px`, this._layer.options.text = this.getText(), this._fireTextChange(this.getText());
  }, _disableOnBlur() {
    this._disableOnBlurActive = true, setTimeout(() => {
      this.enabled() && L.DomEvent.on(document, "click", this._documentClick, this);
    }, 100);
  }, _documentClick(t) {
    t.target !== this.textArea && (this.disable(), !this.getText() && this.options.removeIfEmpty && this.remove());
  }, _focusChange(t = {}) {
    let e = this._hasFocus;
    this._hasFocus = t.type === "focus", !e != !this._hasFocus && (this._hasFocus ? (this._applyFocus(), this._focusText = this.getText(), this._fireTextFocus()) : (this._removeFocus(), this._fireTextBlur(), this._focusText !== this.getText() && (this._fireEdit(), this._layerEdited = true)));
  }, _applyFocus() {
    this.textArea.classList.add("pm-hasfocus"), this._map.dragging && (this._safeToCacheDragState && (this._originalMapDragState = this._map.dragging._enabled, this._safeToCacheDragState = false), this._map.dragging.disable());
  }, _removeFocus() {
    this._map.dragging && (this._originalMapDragState && this._map.dragging.enable(), this._safeToCacheDragState = true), this.textArea.classList.remove("pm-hasfocus");
  }, focus() {
    if (!this.enabled())
      throw new TypeError("Layer is not enabled");
    this.textArea.focus();
  }, blur() {
    if (!this.enabled())
      throw new TypeError("Layer is not enabled");
    this.textArea.blur(), this._disableOnBlurActive && this.disable();
  }, hasFocus() {
    return this._hasFocus;
  }, getElement() {
    return this.textArea;
  }, setText(t) {
    this.textArea.value = t, this._autoResize();
  }, getText() {
    return this.textArea.value;
  }, _initTextMarker() {
    if (this.textArea = L.PM.Draw.Text.prototype._createTextArea.call(this), this.options.className) {
      let e = this.options.className.split(" ");
      this.textArea.classList.add(...e);
    }
    let t = L.PM.Draw.Text.prototype._createTextIcon.call(this, this.textArea);
    this._layer.setIcon(t), this._layer.once("add", this._createTextMarker, this);
  }, _createTextMarker(t = false) {
    this._layer.off("add", this._createTextMarker, this), this._layer.getElement().tabIndex = -1, this.textArea.wrap = "off", this.textArea.style.overflow = "hidden", this.textArea.style.height = L.DomUtil.getStyle(this.textArea, "font-size"), this.textArea.style.width = "1px", this._layer.options.text && this.setText(this._layer.options.text), this._autoResize(), t === true && (this.enable(), this.focus(), this._disableOnBlur());
  }, _preventTextSelection(t) {
    t.preventDefault();
  } });
  var or = function(e, i, r, n, s, a) {
    this._matrix = [e, i, r, n, s, a];
  };
  or.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0);
  or.prototype = { transform(t) {
    return this._transform(t.clone());
  }, _transform(t) {
    let e = this._matrix, { x: i, y: r } = t;
    return t.x = e[0] * i + e[1] * r + e[4], t.y = e[2] * i + e[3] * r + e[5], t;
  }, untransform(t) {
    let e = this._matrix;
    return new L.Point((t.x / e[0] - e[4]) / e[0], (t.y / e[2] - e[5]) / e[2]);
  }, clone() {
    let t = this._matrix;
    return new L.PM.Matrix(t[0], t[1], t[2], t[3], t[4], t[5]);
  }, translate(t) {
    if (t === void 0)
      return new L.Point(this._matrix[4], this._matrix[5]);
    let e, i;
    return typeof t == "number" ? (e = t, i = t) : (e = t.x, i = t.y), this._add(1, 0, 0, 1, e, i);
  }, scale(t, e) {
    if (t === void 0)
      return new L.Point(this._matrix[0], this._matrix[3]);
    let i, r;
    return e = e || L.point(0, 0), typeof t == "number" ? (i = t, r = t) : (i = t.x, r = t.y), this._add(i, 0, 0, r, e.x, e.y)._add(1, 0, 0, 1, -e.x, -e.y);
  }, rotate(t, e) {
    let i = Math.cos(t), r = Math.sin(t);
    return e = e || new L.Point(0, 0), this._add(i, r, -r, i, e.x, e.y)._add(1, 0, 0, 1, -e.x, -e.y);
  }, flip() {
    return this._matrix[1] *= -1, this._matrix[2] *= -1, this;
  }, _add(t, e, i, r, n, s) {
    let a = [[], [], []], o = this._matrix, l = [[o[0], o[2], o[4]], [o[1], o[3], o[5]], [0, 0, 1]], u = [[t, i, n], [e, r, s], [0, 0, 1]], f;
    t && t instanceof L.PM.Matrix && (o = t._matrix, u = [[o[0], o[2], o[4]], [o[1], o[3], o[5]], [0, 0, 1]]);
    for (let d = 0; d < 3; d += 1)
      for (let P = 0; P < 3; P += 1) {
        f = 0;
        for (let E = 0; E < 3; E += 1)
          f += l[d][E] * u[E][P];
        a[d][P] = f;
      }
    return this._matrix = [a[0][0], a[1][0], a[0][1], a[1][1], a[0][2], a[1][2]], this;
  } };
  var $l = or;
  var k_ = { calcMiddleLatLng(t, e, i) {
    let r = t.project(e), n = t.project(i);
    return t.unproject(r._add(n)._divideBy(2));
  }, findLayers(t) {
    let e = [];
    return t.eachLayer((i) => {
      (i instanceof L.Polyline || i instanceof L.Marker || i instanceof L.Circle || i instanceof L.CircleMarker || i instanceof L.ImageOverlay) && e.push(i);
    }), e = e.filter((i) => !!i.pm), e = e.filter((i) => !i._pmTempLayer), e = e.filter((i) => !L.PM.optIn && !i.options.pmIgnore || L.PM.optIn && i.options.pmIgnore === false), e;
  }, circleToPolygon(t, e = 60, i = true) {
    let r = t.getLatLng(), n = t.getRadius(), s = Ci(r, n, e, 0, i), a = [];
    for (let o = 0; o < s.length; o += 1) {
      let l = [s[o].lat, s[o].lng];
      a.push(l);
    }
    return L.polygon(a, t.options);
  }, disablePopup(t) {
    t.getPopup() && (t._tempPopupCopy = t.getPopup(), t.unbindPopup());
  }, enablePopup(t) {
    t._tempPopupCopy && (t.bindPopup(t._tempPopupCopy), delete t._tempPopupCopy);
  }, _fireEvent(t, e, i, r = false) {
    t.fire(e, i, r);
    let { groups: n } = this.getAllParentGroups(t);
    n.forEach((s) => {
      s.fire(e, i, r);
    });
  }, getAllParentGroups(t) {
    let e = [], i = [], r = (n) => {
      for (let s in n._eventParents)
        if (e.indexOf(s) === -1) {
          e.push(s);
          let a = n._eventParents[s];
          i.push(a), r(a);
        }
    };
    return !t._pmLastGroupFetch || !t._pmLastGroupFetch.time || (/* @__PURE__ */ new Date()).getTime() - t._pmLastGroupFetch.time > 1e3 ? (r(t), t._pmLastGroupFetch = { time: (/* @__PURE__ */ new Date()).getTime(), groups: i, groupIds: e }, { groupIds: e, groups: i }) : { groups: t._pmLastGroupFetch.groups, groupIds: t._pmLastGroupFetch.groupIds };
  }, createGeodesicPolygon: Ci, getTranslation: V, findDeepCoordIndex(t, e, i = true) {
    let r, n = (a) => (o, l) => {
      let u = a.concat(l);
      if (i) {
        if (o.lat && o.lat === e.lat && o.lng === e.lng)
          return r = u, true;
      } else if (o.lat && L.latLng(o).equals(e))
        return r = u, true;
      return Array.isArray(o) && o.some(n(u));
    };
    t.some(n([]));
    let s = {};
    return r && (s = { indexPath: r, index: r[r.length - 1], parentPath: r.slice(0, r.length - 1) }), s;
  }, findDeepMarkerIndex(t, e) {
    let i, r = (s) => (a, o) => {
      let l = s.concat(o);
      return a._leaflet_id === e._leaflet_id ? (i = l, true) : Array.isArray(a) && a.some(r(l));
    };
    t.some(r([]));
    let n = {};
    return i && (n = { indexPath: i, index: i[i.length - 1], parentPath: i.slice(0, i.length - 1) }), n;
  }, _getIndexFromSegment(t, e) {
    if (e && e.length === 2) {
      let i = this.findDeepCoordIndex(t, e[0]), r = this.findDeepCoordIndex(t, e[1]), n = Math.max(i.index, r.index);
      return (i.index === 0 || r.index === 0) && n !== 1 && (n += 1), { indexA: i, indexB: r, newIndex: n, indexPath: i.indexPath, parentPath: i.parentPath };
    }
    return null;
  }, _getRotatedRectangle(t, e, i, r) {
    let n = It(r, t), s = It(r, e), a = i * Math.PI / 180, o = Math.cos(a), l = Math.sin(a), u = (s.x - n.x) * o + (s.y - n.y) * l, f = (s.y - n.y) * o - (s.x - n.x) * l, d = u * o + n.x, P = u * l + n.y, E = -f * l + n.x, T = f * o + n.y, G = Re(r, n), _ = Re(r, { x: d, y: P }), x = Re(r, s), b = Re(r, { x: E, y: T });
    return [G, _, x, b];
  }, pxRadiusToMeterRadius(t, e, i) {
    let r = e.project(i), n = L.point(r.x + t, r.y);
    return e.distance(e.unproject(n), i);
  } }, Zl = k_;
  L.PM = L.PM || { version: hr.version, Map: Ko, Toolbar: Xo, Draw: X, Edit: H, Utils: Zl, Matrix: $l, activeLang: "en", optIn: false, initialize(t) {
    this.addInitHooks(t);
  }, setOptIn(t) {
    this.optIn = !!t;
  }, addInitHooks() {
    function t() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Map(this)) : this.options.pmIgnore || (this.pm = new L.PM.Map(this)), this.pm && this.pm.setGlobalOptions({});
    }
    L.Map.addInitHook(t);
    function e() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.LayerGroup(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.LayerGroup(this));
    }
    L.LayerGroup.addInitHook(e);
    function i() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.options.textMarker ? (this.pm = new L.PM.Edit.Text(this), this.options._textMarkerOverPM || this.pm._initTextMarker(), delete this.options._textMarkerOverPM) : this.pm = new L.PM.Edit.Marker(this)) : this.options.pmIgnore || (this.options.textMarker ? (this.pm = new L.PM.Edit.Text(this), this.options._textMarkerOverPM || this.pm._initTextMarker(), delete this.options._textMarkerOverPM) : this.pm = new L.PM.Edit.Marker(this));
    }
    L.Marker.addInitHook(i);
    function r() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.CircleMarker(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.CircleMarker(this));
    }
    L.CircleMarker.addInitHook(r);
    function n() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Line(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this));
    }
    L.Polyline.addInitHook(n);
    function s() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Polygon(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this));
    }
    L.Polygon.addInitHook(s);
    function a() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Rectangle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Rectangle(this));
    }
    L.Rectangle.addInitHook(a);
    function o() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.Circle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this));
    }
    L.Circle.addInitHook(o);
    function l() {
      this.pm = void 0, L.PM.optIn ? this.options.pmIgnore === false && (this.pm = new L.PM.Edit.ImageOverlay(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.ImageOverlay(this));
    }
    L.ImageOverlay.addInitHook(l);
  }, reInitLayer(t) {
    t instanceof L.LayerGroup && t.eachLayer((e) => {
      this.reInitLayer(e);
    }), t.pm || L.PM.optIn && t.options.pmIgnore !== false || t.options.pmIgnore || (t instanceof L.Map ? t.pm = new L.PM.Map(t) : t instanceof L.Marker ? t.options.textMarker ? (t.pm = new L.PM.Edit.Text(t), t.pm._initTextMarker(), t.pm._createTextMarker(false)) : t.pm = new L.PM.Edit.Marker(t) : t instanceof L.Circle ? t.pm = new L.PM.Edit.Circle(t) : t instanceof L.CircleMarker ? t.pm = new L.PM.Edit.CircleMarker(t) : t instanceof L.Rectangle ? t.pm = new L.PM.Edit.Rectangle(t) : t instanceof L.Polygon ? t.pm = new L.PM.Edit.Polygon(t) : t instanceof L.Polyline ? t.pm = new L.PM.Edit.Line(t) : t instanceof L.LayerGroup ? t.pm = new L.PM.Edit.LayerGroup(t) : t instanceof L.ImageOverlay && (t.pm = new L.PM.Edit.ImageOverlay(t)));
  } };
  L.version === "1.7.1" && L.Canvas.include({ _onClick(t) {
    let e = this._map.mouseEventToLayerPoint(t), i, r;
    for (let n = this._drawFirst; n; n = n.next)
      i = n.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (r = i);
    r && (L.DomEvent.fakeStop(t), this._fireEvent([r], t));
  } });
  L.PM.initialize();
})();

// resources/js/index.js
document.addEventListener("DOMContentLoaded", () => {
  const mapPicker = ($wire, config, state) => {
    return {
      map: null,
      tile: null,
      marker: null,
      rangeCircle: null,
      drawItems: null,
      rangeSelectField: null,
      formRestorationHiddenInput: null,
      createMap: function(el) {
        const that = this;
        this.map = LF.map(el, config.controls);
        if (config.bounds) {
          let southWest = LF.latLng(config.bounds.sw.lat, config.bounds.sw.lng);
          let northEast = LF.latLng(config.bounds.ne.lat, config.bounds.ne.lng);
          let bounds = LF.latLngBounds(southWest, northEast);
          this.map.setMaxBounds(bounds);
          this.map.fitBounds(bounds);
          this.map.on("drag", function() {
            map.panInsideBounds(bounds, { animate: false });
          });
        }
        this.map.on("load", () => {
          setTimeout(() => this.map.invalidateSize(true), 0);
          if (config.showMarker) {
            if (!config.clickable) {
              this.marker.setLatLng(this.map.getCenter());
            }
          }
        });
        if (!config.draggable) {
          this.map.dragging.disable();
        }
        if (config.clickable) {
          this.map.on("click", function(e) {
            that.setCoordinates(e.latlng);
          });
        }
        this.tile = LF.tileLayer(config.tilesUrl, {
          attribution: config.attribution,
          minZoom: config.minZoom,
          maxZoom: config.maxZoom,
          tileSize: config.tileSize,
          zoomOffset: config.zoomOffset,
          detectRetina: config.detectRetina
        }).addTo(this.map);
        if (config.showMarker) {
          const markerColor = config.markerColor || "#3b82f6";
          const svgIcon = LF.divIcon({
            html: `<svg xmlns="http://www.w3.org/2000/svg" class="map-icon" fill="${markerColor}" width="36" height="36" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>`,
            className: "",
            iconSize: [36, 36],
            iconAnchor: [18, 36]
          });
          this.marker = LF.marker(this.getCoordinates(), {
            icon: svgIcon,
            draggable: false,
            autoPan: true
          }).addTo(this.map);
          this.setMarkerRange();
          if (!config.clickable) {
            this.map.on("move", () => this.setCoordinates(this.map.getCenter()));
          }
        }
        if (!config.clickable) {
          this.map.on("moveend", () => setTimeout(() => this.updateLocation(), 500));
        }
        this.map.on("locationfound", function() {
          that.map.setZoom(config.controls.zoom);
        });
        let location = this.getCoordinates();
        if (!location.lat && !location.lng) {
          this.map.locate({
            setView: true,
            maxZoom: config.controls.maxZoom,
            enableHighAccuracy: true,
            watch: false
          });
        } else {
          this.map.setView(new LF.LatLng(location.lat, location.lng));
        }
        if (config.showMyLocationButton) {
          this.addLocationButton();
        }
        if (config.liveLocation.send && config.liveLocation.realtime) {
          setInterval(() => {
            this.fetchCurrentLocation();
          }, config.liveLocation.miliseconds);
        }
        this.map.on("zoomend", function(event) {
          that.setFormRestorationState(false, that.map.getZoom());
        });
        if (config.geoMan.show) {
          this.map.pm.addControls({
            position: config.geoMan.position,
            drawCircleMarker: config.geoMan.drawCircleMarker,
            rotateMode: config.geoMan.rotateMode,
            drawMarker: config.geoMan.drawMarker,
            drawPolygon: config.geoMan.drawPolygon,
            drawPolyline: config.geoMan.drawPolyline,
            drawCircle: config.geoMan.drawCircle,
            editMode: config.geoMan.editMode,
            dragMode: config.geoMan.dragMode,
            cutPolygon: config.geoMan.cutPolygon,
            editPolygon: config.geoMan.editPolygon,
            deleteLayer: config.geoMan.deleteLayer
          });
          this.drawItems = new LF.FeatureGroup().addTo(this.map);
          this.map.on("pm:create", (e) => {
            if (e.layer && e.layer.pm) {
              e.layer.pm.enable();
              this.drawItems.addLayer(e.layer);
              this.updateGeoJson();
            }
          });
          this.map.on("pm:edit", () => {
            this.updateGeoJson();
          });
          this.map.on("pm:remove", (e) => {
            try {
              this.drawItems.removeLayer(e.layer);
              this.updateGeoJson();
            } catch (error) {
              console.error("Error during removal of layer:", error);
            }
          });
          const existingGeoJson = this.getGeoJson();
          if (existingGeoJson) {
            this.drawItems = LF.geoJSON(existingGeoJson, {
              pointToLayer: (feature, latlng) => {
                return LF.circleMarker(latlng, {
                  radius: 15,
                  color: "#3388ff",
                  fillColor: "#3388ff",
                  fillOpacity: 0.6
                });
              },
              style: function(feature) {
                if (feature.geometry.type === "Polygon") {
                  return {
                    color: config.geoMan.color || "#3388ff",
                    fillColor: config.geoMan.filledColor || "blue",
                    weight: 2,
                    fillOpacity: 0.4
                  };
                }
              },
              onEachFeature: (feature, layer) => {
                if (feature.geometry.type === "Polygon") {
                  layer.bindPopup("Polygon Area");
                } else if (feature.geometry.type === "Point") {
                  layer.bindPopup("Point Location");
                }
                if (config.geoMan.editable) {
                  if (feature.geometry.type === "Polygon") {
                    layer.pm.enable({
                      allowSelfIntersection: false
                    });
                  } else if (feature.geometry.type === "Point") {
                    layer.pm.enable({
                      draggable: true
                    });
                  }
                }
                layer.on("pm:edit", () => {
                  this.updateGeoJson();
                });
              }
            }).addTo(this.map);
            if (config.geoMan.editable) {
              this.drawItems.eachLayer((layer) => {
                layer.pm.enable({
                  allowSelfIntersection: false
                });
              });
            }
            this.map.fitBounds(this.drawItems.getBounds());
          }
        }
      },
      initFormRestoration: function() {
        this.formRestorationHiddenInput = document.getElementById(config.statePath + "_fmrest");
        window.addEventListener("pageshow", (event) => {
          let restoredState = this.getFormRestorationState();
          if (restoredState) {
            let coords = new LF.LatLng(restoredState.lat, restoredState.lng);
            config.zoom = restoredState.zoom;
            config.controls.zoom = restoredState.zoom;
            this.setCoordinates(coords);
          }
        });
      },
      setFormRestorationState: function(coords, zoom) {
        if (!coords) {
          coords = this.getFormRestorationState();
          if (!coords) {
            coords = this.getCoordinates();
          }
        }
        if (this.map) {
          if (!zoom) {
            coords.zoom = this.map.getZoom();
          } else {
            coords.zoom = zoom;
          }
        }
        this.formRestorationHiddenInput.value = JSON.stringify(coords);
      },
      getFormRestorationState: function() {
        if (this.formRestorationHiddenInput.value)
          return JSON.parse(this.formRestorationHiddenInput.value);
        return false;
      },
      updateGeoJson: function() {
        try {
          const geoJsonData = this.drawItems.toGeoJSON();
          if (typeof geoJsonData !== "object") {
            console.error("GeoJSON data is not an object:", geoJsonData);
            return;
          }
          $wire.set(config.statePath, {
            ...$wire.get(config.statePath),
            geojson: geoJsonData
          }, true);
        } catch (error) {
          console.error("Error updating GeoJSON:", error);
        }
      },
      getGeoJson: function() {
        const state2 = $wire.get(config.statePath) ?? {};
        return state2.geojson;
      },
      updateLocation: function() {
        let oldCoordinates = this.getCoordinates();
        let currentCoordinates = this.map.getCenter();
        if (config.clickable)
          currentCoordinates = this.marker.getLatLng();
        if (oldCoordinates.lng !== currentCoordinates.lng || oldCoordinates.lat !== currentCoordinates.lat) {
          this.setCoordinates(currentCoordinates);
        }
      },
      removeMap: function(el) {
        if (this.marker) {
          this.marker.remove();
          this.marker = null;
        }
        this.tile.remove();
        this.tile = null;
        this.map.off();
        this.map.remove();
        this.map = null;
      },
      getCoordinates: function() {
        let location = $wire.get(config.statePath) ?? {};
        const hasValidCoordinates = location.hasOwnProperty("lat") && location.hasOwnProperty("lng") && location.lat !== null && location.lng !== null;
        if (!hasValidCoordinates) {
          location = {
            lat: config.default.lat,
            lng: config.default.lng
          };
        }
        return location;
      },
      setCoordinates: function(coords) {
        this.setFormRestorationState(coords);
        $wire.set(config.statePath, {
          ...$wire.get(config.statePath),
          lat: coords.lat,
          lng: coords.lng
        }, false);
        if (config.liveLocation.send) {
          $wire.$refresh();
        }
        this.updateMarker();
        return coords;
      },
      attach: function(el) {
        this.createMap(el);
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              if (!this.map)
                this.createMap(el);
            } else {
              this.removeMap(el);
            }
          });
        }, {
          root: null,
          rootMargin: "0px",
          threshold: 1
        });
        observer.observe(el);
      },
      fetchCurrentLocation: function() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const currentPosition = new LF.LatLng(position.coords.latitude, position.coords.longitude);
            await this.map.flyTo(currentPosition);
            this.updateLocation();
            this.updateMarker();
          }, (error) => {
            console.error("Error fetching current location:", error);
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      },
      addLocationButton: function() {
        const locationButton = document.createElement("button");
        locationButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 0C8.25 0 5 3.25 5 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.75-3.25-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-5c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z"/></svg>';
        locationButton.type = "button";
        locationButton.classList.add("map-location-button");
        locationButton.onclick = () => this.fetchCurrentLocation();
        this.map.getContainer().appendChild(locationButton);
      },
      setMarkerRange: function() {
        if (config.clickable && !this.marker)
          return;
        if (!this.rangeSelectField)
          return;
        distance = parseInt(this.rangeSelectField.value || 0);
        if (this.rangeCircle) {
          this.rangeCircle.setLatLng(this.getCoordinates()).setRadius(distance);
        } else {
          this.rangeCircle = LF.circle(this.getCoordinates(), {
            color: "blue",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: distance
            // The radius in meters
          }).addTo(this.map);
        }
      },
      init: function() {
        this.$wire = $wire;
        this.config = config;
        this.state = state;
        this.rangeSelectField = document.getElementById(config.rangeSelectField);
        this.initFormRestoration();
        let that = this;
        if (this.rangeSelectField) {
          this.rangeSelectField.addEventListener("change", function() {
            that.updateMarker();
          });
        }
        $wire.on("refreshMap", this.refreshMap.bind(this));
      },
      updateMarker: function() {
        if (config.showMarker && this.marker) {
          this.marker.setLatLng(this.getCoordinates());
          this.setMarkerRange();
          setTimeout(() => this.updateLocation(), 500);
        }
      },
      refreshMap: function() {
        this.map.flyTo(this.getCoordinates());
        this.updateMarker();
      }
    };
  };
  window.mapPicker = mapPicker;
  window.dispatchEvent(new CustomEvent("map-script-loaded"));
});
/*! Bundled license information:

leaflet/dist/leaflet-src.js:
  (* @preserve
   * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
   * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
   *)
*/