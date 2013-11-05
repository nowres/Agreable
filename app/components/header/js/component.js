Components.HeaderComponent = Agreable_Component.extend({
    init: function(elt) {
        var $elt = Agreable_Module.pageContainer.find(elt);
        if (window.steroids) {
            $elt.hide();
            steroids.view.navigationBar.show($elt.text());
        } else {
            $elt.wrap('<div data-role=header></div>');
            Agreable_Module.refresh();
        }
    }
});