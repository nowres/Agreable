var Agreable_Router = {
	initialize: function() {
		var self = this;
		$(document).bind("pagebeforechange", function(e, data) {
			if (typeof data.toPage === "string") {
				var u = $.mobile.path.parseUrl(data.toPage);
				self._route(data.toPage);
				e.preventDefault();
			}
		});
		$('body').on('click', '[type=submit]', function() {
			var $button = $(this);
			if ($button.closest('form').length > 0) {
				var $form = $button.closest('form'),
					action = $form.attr('action');
				console.log($form.serialize());
				$form.attr('action', action + '?' + $form.serialize())
			}
		});
	},
	route: function() {
		var self = this;
		self._route(document.location.href);
	},
	_route: function(uri) {
		var self = this;
		var target = self._getRequestedTarget(uri);
		if (!target.module) {
			target.module = 'login';
		}
		Agreable_Module.load(target.module, target.view, target.params, '#' + target.module);
	},
	_getRequestedTarget: function(uri) {
		var u = $.mobile.path.parseUrl(uri),
				params = {},
				pageSelector = u.hash.slice(1).replace(/\?.*$/, ""),
				module_name = '',
				view_name = '';
		if (pageSelector.split('.').length > 1) {
			var ps = pageSelector.split('.');
			module_name = ps[0];
			view_name = ps[1];
		} else {
			module_name = pageSelector;
		}

		if (u.hash.split('?').length > 1) {
			var paramsArr = u.hash.split('?')[1].split('&');
			for (var i = 0; i < paramsArr.length; i++) {
				var psplit = paramsArr[i].split('=');
				params[psplit[0]] = psplit[1];
			}
		}

		return {
			module: module_name,
			view: view_name,
			params: params
		};
	}
}