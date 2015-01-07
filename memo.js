/* create a new instance of the Marionette app */
var memoCollection;
var memoCollectionView;
var dateCollection;
var dateCollectionView;

var app = new Backbone.Marionette.Application();

/* add the initial region which will contain the app */
app.addRegions({
    /* reference to container element in the HTML file */
    appRegion: '.wrap'
});

/* define a module to keep the code modular */
app.module('App', function(module, App, Backbone, Marionette, $, _){

    //Memo Data Backbone, Marionette
    /* definition for book model, with default example of data structure */
    module.MemoModel = Backbone.Model.extend({
       defaults: {
           _id: '',
           time: '',
           title: '',
           memoText : '',
           memoPicRawData : null
       },
        idAttribute: "_id"
        //initialize : function(){console.log("Memo Model Initialize");}
    });

    /* definition for book collection */
    module.MemoCollection = Backbone.Collection.extend({
        model: module.MemoModel,
        url: 'rest/memo',

        initialize: function(){
            console.log("Memo Collection Initialize")
        }
    });

    /* definition for individual item view */
    module.MemoItemView = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'textWrap',
        /* set the template used to display this view */
        template: '#memoItemView-template',

        /* used to show the order in which these method are called */
        initialize: function(){ console.log('MemoItemView: initialize >>> ' + this.model.get('time')) },
        onRender: function(){ console.log('MemoItemView: onRender >>> ' + this.model.get('time')) },
        onShow: function(){ console.log('MemoItemView: onShow >>> ' + this.model.get('time')) }
    });

    /* definition for collection view */
    module.MemoCollectionView = Marionette.CollectionView.extend({
        tagName: 'div',
        id: "memoFrame",

        /* explicitly set the childview (formerly 'itemView') used to display the models in this collection */
        childView: module.MemoItemView,

        initialize: function(){
            this.collection.fetch();
            console.log('MemoCollectionView: initialize') },
        onRender: function(){ console.log('MemoCollectionView: onRender') },
        onShow: function(){ console.log('MemoCollectionView: onShow') }
    });

    //Date Data Backbone, Marionette
    module.DateModel = Backbone.Model.extend({
        defaults: {
            date: '',
            i : ''
        },
        initialize : function(){console.log("Date Model Initialize")}
    });

    module.DateCollection = Backbone.Collection.extend({
        model: module.DateModel,
        url: 'rest/memo',

        initialize : function(){console.log("Date Collection Initialize")}
    });

    module.DateItemView = Marionette.ItemView.extend({
        tagName: 'li',

        /* set the template used to display this view */
        template: '#dateItemView-template',

        /* used to show the order in which these method are called */
        initialize: function(){ console.log('DateItemView: initialize >>> ' + this.model.get('date')) },
        onRender: function(){ console.log('DateItemView: onRender >>> ' + this.model.get('date')) },
        onShow: function(){ console.log('DateItemView: onShow >>> ' + this.model.get('date')) }
    });

    module.DateCollectionView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'nav nav-tabs nav-stacked',
        /* explicitly set the childview (formerly 'itemView') used to display the models in this collection */
        childView: module.DateItemView,

        initialize: function(){
            this.collection.fetch();
            console.log('DateCollectionView: initialize')
        },
        onRender: function(){ console.log('DateCollectionView: onRender') },
        onShow: function(){ console.log('DateCollectionView: onShow') }
    });


    //WriteItemView
    module.WriteItemView = Marionette.ItemView.extend({
        template: '#writeItemView-template'
    });

    //LayoutView
    /* define a view; in this case a 'LayoutView' (formerly 'Layout') */
    module.AppLayoutView = Marionette.LayoutView.extend({
        tagName: 'div',
        id: 'Container',

        template: '#layout-template',

        //Container안에 사용할 div들
        regions: {
            'MemoRegion' : '.main',
            'DateRegion' : '.date'
        },

        initialize: function() {console.log("main layout: initialize");},

        onRender: function() {
            console.log('main layout: onRender');

            //memo정보들을 model로 collection을 만듬
            memoCollection = new module.MemoCollection();
            //memoCollectionView에서 memoCollection사용
            memoCollectionView = new module.MemoCollectionView({collection: memoCollection});
            //MemoRegion에 memocollectionview를 보여준다
            this.MemoRegion.show(memoCollectionView);

            //date정보를 model로 collection을 만듬
            dateCollection = new module.DateCollection();
            //dateCollectionView에서 dateCollection을 사용
            dateCollectionView = new module.DateCollectionView({collection: dateCollection});
            //DateRegion에 dateCollectionView를 보여준다.
            this.DateRegion.show(dateCollectionView);

        }
    });

    module.addInitializer(function() {
        var layout = new module.AppLayoutView();
        //appRegion으로 지정한 곳에 layout(layoutView)을 나타낸다.
        app.appRegion.show(layout);
    });

});

$(document).ready(function() {app.start();});