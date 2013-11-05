var Agreable_Module = {
    name: '',
    view: {
        name: '',
        params: []
    },
    mainContainer: '.app',
    pageContainer: null,
    load: function(module_name, view_name, params) {
        var self = this;
        self.name = module_name;
        self.view.name = view_name;
        self.view.params = params;

        $.ajax(Agreable.DIRS.MODULES + module_name + '/js/config.json', {
            dataType: 'json',
            success: function(data) {
                var target_view = view_name;

                if (!target_view) {
                    self.view.name = target_view = data.default_view;
                }

                self.loadView(target_view, params);
            }
        })
    },
    loadView: function(view, params) {
        var self = this,
                module_name = self.name,
                html_path = Agreable.DIRS.MODULES + module_name + '/html/' + view + '.html';
        /*var webView = new steroids.views.WebView(html_path);
        steroids.layers.push(steroids.view);
        steroids.view.navigationBar.show('test');*/
        $.ajax(html_path, {
            success: function(html) {
                var $newPage = $('<div data-url=' + module_name + '.' + view + ' >' + html + '</div>');
                $('body').append($newPage);
                self.pageContainer = $newPage.page();
                $.mobile.changePage($newPage);

                Agreable.loadScript(Agreable.DIRS.MODULES + module_name + '/js/init.js');
                Agreable.loadScript(Agreable.DIRS.MODULES + module_name + '/js/' + view + '.js');
                //self.refresh();
            },
            error: function() {
                $(self.mainContainer).html('404');
            }
        });
    },
    refresh: function() {
        $(Agreable_Module.pageContainer).trigger('pagecreate');
    }
}