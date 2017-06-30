(function(f) {
	if (typeof exports === "object" && typeof module!=="undefined") {
			module.exports = f()
		}
		else if (typeof define === "function" && define.amd) {
			define([],f)
		}
		else {
			var g;
			if (typeof window !== "undefined") {
				g = window
			}
			else if (typeof global !== "undefined") {
				g = global
			}
			else if (typeof self !== "undefined") {
				g = self
			}
			else {
				g = this
			}
			g.ModCircle = f()
		}
	}
)
(function() {
	var define, module, exports;
	return (function e(t,n,r) {
		function s(o,u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = typeof require == "function" && require;
					if (!u&&a)
						return a(o,!0);
					if (i)
						return i(o,!0);
					var f = new Error("Cannot find module '"+o+"'");
					throw f.code="MODULE_NOT_FOUND", f
				}
				var l = n[o] = { exports:{} };
				t[o][0].call(l.exports, function(e) {
					var n=t[o][1][e];
					return s(n?n:e)
					}, l, l.exports, e, t, n, r)
			}
			return n[o].exports
		}
		var i = typeof require == "function" && require;
		for (var o = 0; o < r.length; o++)
			s(r[o]);return s
	})
	({
		1:[function(require,module,exports) {
			(function (process) {
				(function() {
					var e, n, r;
					"undefined" != typeof performance && null !== performance && performance.now ? module.exports = function() {
						return performance.now()
					}:
					"undefined" != typeof process && null !== process && process.hrtime ? (module.exports = function() {
						return (e()-r)/1e6
					}, n = process.hrtime, e = function() {
						var e;
						return e = n(), 1e9*e[0]+e[1]
					}, r = e()):Date.now ? (module.exports = function() {
						return Date.now()-r
					}, r = Date.now()):(module.exports = function() {
						return(new Date).getTime()-r
					}, r = (new Date).getTime())
				}).call(this);
			}).call(this, require('_process'))
		}, {"_process":2}], 2:[function(require,module,exports) {
			function runTimeout(e) {
				if (cachedSetTimeout === setTimeout)
					return setTimeout(e,0);
				try {
					return cachedSetTimeout(e,0)
				}
				catch (r) {
					try {
						return cachedSetTimeout.call(null,e,0)
					}
					catch (r) {
						return cachedSetTimeout.call(this,e,0)
					}
				}
			}
			function runClearTimeout(e) {
				if (cachedClearTimeout===clearTimeout)
					return clearTimeout(e);
				try {
					return cachedClearTimeout(e)
				}
				catch (r) {
					try {
						return cachedClearTimeout.call(null,e)
					}
					catch (r) {
						return cachedClearTimeout.call(this,e)
					}
				}
			}
			function cleanUpNextTick() {
				draining && currentQueue && (draining =! 1, currentQueue.length ? queue = currentQueue.concat(queue):queueIndex =- 1, queue.length && drainQueue())
			}
			function drainQueue() {
				if (!draining) {
					var e=runTimeout(cleanUpNextTick);
					draining =! 0;
					for (var r=queue.length; r;) {
						for (currentQueue=queue,queue=[];++queueIndex<r;)
							currentQueue && currentQueue[queueIndex].run();
						queueIndex =- 1, r = queue.length
					}
					currentQueue = null, draining =! 1, runClearTimeout(e)
				}
			}
			function Item(e,r) {
				this.fun = e, this.array = r
			}
			function noop() {
				
			}
			var process = module.exports = {
				
			}, cachedSetTimeout, cachedClearTimeout;
			!function() {
				try {
					cachedSetTimeout = setTimeout
				}
				catch (e) {
					cachedSetTimeout = function() {
						throw new Error("setTimeout is not defined")
					}
				}
				try {
					cachedClearTimeout=clearTimeout
				}
				catch (e) {
					cachedClearTimeout = function() {
						throw new Error("clearTimeout is not defined")
					}
				}
			}();
			var queue = [], draining =! 1, currentQueue, queueIndex =- 1;
			process.nextTick = function(e) {
				var r = new Array(arguments.length-1);
				if (arguments.length > 1) 
					for (var u = 1;u < arguments.length; u++)
						r[u - 1] = arguments[u];
					queue.push(new Item(e,r)), 1 !== queue.length || draining || runTimeout(drainQueue)
			}, Item.prototype.run = function() {
				this.fun.apply(null,this.array)
			}, process.title = "browser", process.browser =! 0, process.env = {
				
			}, process.argv = [], process.version = "", process.versions = {
				
			}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop,process.emit = noop, process.binding = function(e) {
				throw new Error("process.binding is not supported")
			}, process.cwd = function() {
				return"/"
			}, process.chdir = function(e) {
				throw new Error("process.chdir is not supported")
			}, process.umask = function() {
				return 0
			};
		}, {}], 3:[function(require, module, exports) {
			(function (global) {
				for (var now = require("performance-now"), root = "undefined" == typeof window ? global : window, vendors = ["moz", "webkit"], suffix = "AnimationFrame", raf = root["request" + suffix],caf = root["cancel" + suffix] || root["cancelRequest" + suffix], i = 0; !raf && i < vendors.length; i++)
					raf = root[vendors[i] + "Request" + suffix], caf = root[vendors[i] + "Cancel" + suffix] || root[vendors[i] + "CancelRequest" + suffix];
				if (!raf || !caf) {
					var last = 0, id = 0, queue = [], frameDuration = 1e3/60;
					raf = function(e) {
						if (0 === queue.length) {
							var o = now(), a = Math.max(0,frameDuration - (o - last));
							last = a + o, setTimeout(function() {
								var e = queue.slice(0);
								queue.length = 0;
								for (var o = 0; o < e.length; o++)
									if (!e[o].cancelled)
										try{
											e[o].callback(last)
										}
										catch (e) {
											setTimeout(function() {
												throw e
											}, 0)
										}
							}, Math.round(a))
						}
						return queue.push({
							handle: ++id, callback: e, cancelled: !1
						}), id
					}, caf = function(e) {
						for (var o = 0; o < queue.length; o++)
							queue[o].handle === e && (queue[o].cancelled =! 0)
					}
				}
				module.exports = function(e) {
					return raf.call(root, e)
				}, module.exports.cancel = function() {
					caf.apply(root, arguments)
				}, module.exports.polyfill = function() {
					root.requestAnimationFrame = raf, root.cancelAnimationFrame = caf
				};
			}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
		}, {"performance-now":1}], 4:[function(require, module, exports) {
			function ModCircle(t, i, a) {
				return t && "CANVAS" === t.tagName ? (this._base = 20, this.base = Number(a), this.canvas = t, this._lineCanvas = document.createElement("canvas"), this._lineCanvas.width = t.width, this._lineCanvas.height = t.height,this.clipping =! 0, this.ctx = t.getContext("2d"), this.ctx.fillStyle = "#222", this.ctx.strokeStyle='#fff', this.lineCtx = this._lineCanvas.getContext("2d"), this.lineCtx.strokeStyle='#fff', this._factor = 2, this.factor = Number(i), this._padding = 0, this.padding = .05*Math.min(t.width, t.height), this.prePaint = null, void(this.postPaint = null)) : void console.log("Failed to create ModCircle, canvas element not found")
			}
			var raf = require("raf");
			raf.polyfill(), ModCircle.prototype = {
				get _center() {
					return {
						x:this.canvas.width/2, y:this.canvas.height / 2
					}
				}, get _radius() {
					return Math.min(this.canvas.width, this.canvas.height) / 2 - this.padding
				}, _toPoint:function(t) {
					t %= this._base;
					var i = 2*Math.PI / this.base*t, a = this._center;
					return {
						x:Math.cos(i)*this._radius + a.x, y:Math.sin(i)*this._radius + a.y
					}
				}, set base(t) {
					t = Number(t), isNaN(t) || (this._base = t, this.paint())
				}, get base() {
					return this._base
				}, set factor(t) {
					t = Number(t), isNaN(t) || (this._factor = t, this.paint())
				}, get factor() {
					return this._factor
				}, set padding(t) {
					t = Number(t), isNaN(t) || (this._padding = t, this.paint())
				}, get padding() {
					return this._padding
				}, animate:function(t, i, a, n) {
					var e = this;
					if (null !== t && void 0 !== t || (t = e.base), null !== i && void 0 !== i || (i = e.factor), t = Number(t), i = Number(i), a = Number(a), isNaN(t))
						return console.log('Warning: Invalid argument for parameter "base" in call to ModCircle.animate.'), !1;
					if (isNaN(i))
						return console.log('Warning: Invalid argument for parameter "factor" in call to ModCircle.animate.'), !1;
					if (isNaN(a))
						return console.log("Warning: duration in call to ModCircle.animate is NaN."), !1;
					if (a<0)
						return console.log("Warning: ModCircle.animate called with negative duration."), !1;
					if (e._animation && e.stopAnimation(), 0 === a)
						return e.base = t, e.factor = i, !0;
					var o = e.base, s = e.factor, r = (t-o) / a, c = (i-s) / a, h = null, l = function(a) {
						h || (h = a);
						var u = a - h;
						h = a, r < 0 ? e._base = Math.max(t, e._base + r*u) : e._base = Math.min(t, e._base + r*u), c < 0 ? e._factor = Math.max(i, e._factor + c*u) : e._factor = Math.min(i, e._factor + c*u), e.paint(), e._base !== t || e._factor !== i ? e._animation = requestAnimationFrame(l) : n && (e._base = o, e._factor = s, e._animation = requestAnimationFrame(l))
					};
					return e._animation = requestAnimationFrame(l), !0
				}, paint:function() {
					var t = this._center, i = this.ctx, a = this.lineCtx, n = this._radius, e = this.canvas.height, o = this.canvas.height;
					i.clearRect(0, 0, e, o), a.clearRect(0, 0, e, o), "function" == typeof this.prePaint && this.prePaint(i), i.beginPath(), i.arc(t.x, t.y, n, 0, 2*Math.PI), i.fill(), a.save(), a.beginPath(), this.clipping ? a.arc(t.x, t.y, n, 0, 2*Math.PI) : a.rect(0, 0, e, o), a.clip(), a.beginPath();
					for (var s = Math.abs(this._base), r = 0; r < s; r++) {
						var c = this._toPoint(r), h = this._toPoint(r*this.factor);
						a.moveTo(c.x, c.y), a.lineTo(h.x, h.y)
					}
					a.stroke(), i.drawImage(a.canvas, 0, 0), a.restore(), i.stroke(), "function" == typeof this.postPaint && this.postPaint(i)
				}, stopAnimation:function() {
					cancelAnimationFrame(this._animation), this._animation = null, console.log(cancelAnimationFrame)
				}
			}, module.exports = ModCircle;
		}, {"raf" : 3}] 
	}, {
		
	}, [4])
	(4)
});