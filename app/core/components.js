var Components = {};

var Agreable_Components = {
    load: function() {
        $.ajax(Agreable.DIRS.COMPONENTS + 'list.json', {
            dataType: 'json',
            success: function(data) {
                for(var i = 0; i < data.components.length; i++) {
                    var name = data.components[i];
                    console.log('Loading component: ' + name);
                    $.ajax(Agreable.DIRS.COMPONENTS + name + '/js/component.js', {
                        success: function(data) {
                            eval(data);
                        },
                        error: function() {
                            console.log('Failed to load component: ' + name);
                            alert('Failed to load component: ' + name);
                        }
                    });
                }
            },
            error: function() {
                alert('error');
            }
        })
    }
}

var Agreable_Component = Class.extend({
    render: function() {}
});