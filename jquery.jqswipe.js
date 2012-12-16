/**
	jqswipe
	@version:		1.2.0
	@author:		Julien Loutre <julien.loutre@gmail.com>
*/
(function($){
 	$.fn.extend({
 		jqswipe: function() {
			var plugin_namespace = "jqswipe";
			
			
			var pluginClass = function() {};
			
			
			
			pluginClass.prototype.init = function (options) {
				try {
					
					var scope = this;
					
					this.options = $.extend({
						threshold:	50,
						immediate:	true
					},options);
					
					this.listen();
					
				} catch (err) {
					this.error(err);
				}
			};
			
			pluginClass.prototype.listen = function () {
				try {
					
					var scope = this;
					
					var x, y, x2, y2;
					
					this.element.bind("touchstart", function(e) {
						x = e.originalEvent.pageX;
						y = e.originalEvent.pageY;
					});
					this.element.bind("touchmove", function(e) {
						x2 = e.originalEvent.pageX;
						y2 = e.originalEvent.pageY;
						scope.update((x2-x),(y2-y), true);
					});
					this.element.bind("touchend", function(e) {
						scope.update((x2-x),(y2-y), false);
					});
					
				} catch (err) {
					this.error(err);
				}
			};
			
			pluginClass.prototype.update = function (x, y, isMoving) {
				try {
					
					var scope = this;
					
					if (isMoving && this.options.immediate && x > this.options.threshold) {
						this.options.swipeRight(x);
					}
					if (isMoving && this.options.immediate && x < 0-this.options.threshold) {
						this.options.swipeLeft(x);
					}
					if (isMoving && this.options.immediate && y > this.options.threshold) {
						this.options.swipeBottom(x);
					}
					if (isMoving && this.options.immediate && y < 0-this.options.threshold) {
						this.options.swipeTop(x);
					}
					if (!isMoving && !this.options.immediate && x > this.options.threshold) {
						this.options.swipeRight(x);
					}
					if (!isMoving && !this.options.immediate && x < 0-this.options.threshold) {
						this.options.swipeLeft(x);
					}
					if (!isMoving && !this.options.immediate && y > this.options.threshold) {
						this.options.swipeBottom(x);
					}
					if (!isMoving && !this.options.immediate && y < 0-this.options.threshold) {
						this.options.swipeTop(x);
					}
					
				} catch (err) {
					this.error(err);
				}
			};
			
			
			
			pluginClass.prototype.__init = function (element) {
				try {
					this.element = element;
				} catch (err) {
					this.error(err);
				}
			};
			// centralized error handler
			pluginClass.prototype.error = function (e) {
				if (console && console.info) {
					console.info("error on "+plugin_namespace+":",e);
				}
			};
			// Centralized routing function
			pluginClass.prototype.execute = function (fn, options) {
				try {
					if (typeof(this[fn]) == "function") {
						var output = this[fn].apply(this, [options]);
					} else {
						this.error("'"+fn.toString()+"()' is not a function");
					}
				} catch (err) {
					this.error(err);
				}
			};
			
			// process
			var fn;
			var options;
			if (arguments.length == 0) {
				fn = "init";
				options = {};
			} else if (arguments.length == 1 && typeof(arguments[0]) == 'object') {
				fn = "init";
				options = $.extend({},arguments[0]);
			} else {
				fn = arguments[0];
				options = arguments[1];
			}
			$.each(this, function(idx, item) {
				// if the plugin does not yet exist, let's create it.
				if ($(item).data(plugin_namespace) == null) {
					$(item).data(plugin_namespace, new pluginClass());
					$(item).data(plugin_namespace).__init($(item));
				}
				$(item).data(plugin_namespace).execute(fn, options);
			});
			return this;
    	}
	});
	
})(jQuery);

