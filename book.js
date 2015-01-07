


/* create a new instance of the Marionette app */
var app = new Backbone.Marionette.Application();

/* add the initial region which will contain the app */
app.addRegions({
    /* reference to container element in the HTML file */
    appRegion: '#AppBase'
});

/* define a module to keep the code modular */
app.module('App', function(module, App, Backbone, Marionette, $, _) {

    /* definition for book model, with default example of data structure */
    module.BookModel =  Backbone.Model.extend({
        defaults: {
            title: '',
            authorFirst: '',
            authorLsat: ''
        }
    });

    /* definition for book collection */
    module.BookCollection =  Backbone.Collection.extend({
        /* set model type used for this collection */
        model: module.BookModel
    });


    /* definition for individual item view */
    module.BookItemView =  Marionette.ItemView.extend({
        tagName: 'li',

        template: '#itemView-template'
    });

    /* definition for collection view */
    module.BookCollectionView =  Marionette.CollectionView.extend({
        tagName: 'ul',

        childView: module.BookItemView

    });

    module.AppLayoutView =  Marionette.LayoutView.extend({
        tagName: 'div',

        id: 'appContainer',

        template: '#layout-template',

        regions: {
            'RegionOne' : '#regionOne'
        },

        onRender: function() {
            /* create an array of books using anonymouse objects;
             the objects have the same structure as in the 'defaults'
             attribute of the module.BookModel definition */
            var bookArray = [];
            bookArray.push({title: 'Wolf',authorLast: 'Harrison', authorFirst: 'Jim'});
            bookArray.push({title: 'The Theory and Practice of Rivers', authorLast: 'Snyder', authorFirst: 'Gary'});
            bookArray.push({title: 'Weather Central',authorLast: 'Kooser', authorFirst: 'Ted'});
            bookArray.push({title: 'Losing Season',authorLast: 'Ridl', authorFirst: 'Jack'});
            bookArray.push({title: 'Mornings Like This',authorLast: 'Dillard', authorFirst: 'Annie'});

            var bookCollection = new module.BookCollection(bookArray);

            var bookCollectionView = new module.BookCollectionView({collection: bookCollection});

            this.RegionOne.show(bookCollectionView);
        }

    });

    module.addInitializer(function() {
        var layout = new module.AppLayoutView();
        app.appRegion.show(layout);
    });

});



$(document).ready(function() {app.start();});

