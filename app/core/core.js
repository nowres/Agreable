/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function() {
    var initializing = false, fnTest = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function() {
    };

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                    typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                    (function(name, fn) {
                        return function() {
                            var tmp = this._super;

                            // Add a new ._super() method that is the same method
                            // but on the super-class
                            this._super = _super[name];

                            // The method only need to be bound temporarily, so we
                            // remove it when we're done executing
                            var ret = fn.apply(this, arguments);
                            this._super = tmp;

                            return ret;
                        };
                    })(name, prop[name]) :
                    prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();


var Agreable = {
    DIRS: {
        COMPONENTS: 'app/components/',
        MODULES: 'app/modules/',
        PARTS: 'app/parts/',
        SKIN: 'skin/'
    },
    rootNodeSelector: '.app',
    isNative: false,
    isInitialized: false,
    initialize: function() {
        var self = this;
        if (!self.isInitialized) {
            if (window.steroids) {
                self.isNative = true;
            }
            Agreable_Components.load();
            Agreable_Router.initialize();
            Agreable_Router.route();
			document.addEventListener("backbutton", function() { window.history.go(-1); return false;}, false);
            /*$('a').on('click', function() {
             var href = $(this).attr('href');
             if (href.length > 1 && href[0] === '#') {
             document.location.href = href;
             Agreable_Router.route();
             }
             })*/
            self.isInitialized = true;
        }
    },
    loadScript: function(url) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        if (script.readyState)
        {
            script.onreadystatechange = function() {
                if (script.readyState == "complete" || script.readyState == "loaded") {
                    script.onreadystatechange = null;
                }
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}