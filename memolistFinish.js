//Memo
var MemoModel = Backbone.Model.extend({
    defaults: {
        _id: '',
        time: '',
        title: '',
        memoText : '',
        memoPicRawData : null
    },
    idAttribute: '_id'
});

var MemoCollection = Backbone.Collection.extend({
    model: MemoModel,
    url: 'rest/memo',

    initialize: function(){
        console.log("Memo Collection Initialize");
    }
});

/* definition for individual item view */
var MemoItemView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'row',
    /* set the template used to display this view */
    template: '#memoItemView-template',

    /* used to show the order in which these method are called */
    initialize: function(){ console.log('MemoItemView: initialize >>> ' + this.model.get('time')) },
    onRender: function(){ console.log('MemoItemView: onRender >>> ' + this.model.get('time')) },
    onShow: function(){ console.log('MemoItemView: onShow >>> ' + this.model.get('time')) }
});


var MemoCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: 'div',
    className: "rowWrap",

    /* explicitly set the childview (formerly 'itemView') used to display the models in this collection */
    childView: MemoItemView,

    initialize: function(){
        this.collection.fetch();
        console.log('MemoCollectionView: initialize') },
    onRender: function(){ console.log('MemoCollectionView: onRender') },
    onShow: function(){ console.log('MemoCollectionView: onShow') }
});

/*var memoCollection = new MemoCollection();
var timeWatch = 5000;

$('#save').click(function () {
    memoCollection.create({
        'time': ++timeWatch,
        'title': timeWatch + '_memoCollectionTest'
    }, {
        'contentType': 'application/json; charset=UTF-8',
        'type': 'POST',
        'dataType': 'json'
    });

    console.log("is save?");
});*/






//Date
var DateModel = Backbone.Model.extend({
    defaults: {
        time: ''
    },
    initialize : function(){console.log("Date Model Initialize")}
});

var DateCollection = Backbone.Collection.extend({
    model: DateModel,
    url: 'rest/memo',

    initialize : function(){console.log("Date Collection Initialize")}
});

var DateItemView = Marionette.ItemView.extend({
    tagName: 'li',

    /* set the template used to display this view */
    template: '#dateItemView-template',

    /* used to show the order in which these method are called */
    initialize: function(){ console.log('DateItemView: initialize >>> ' + this.model.get('date')) },
    onRender: function(){ console.log('DateItemView: onRender >>> ' + this.model.get('date')) },
    onShow: function(){ console.log('DateItemView: onShow >>> ' + this.model.get('date')) }
});

var DateCollectionView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'nav nav-tabs',

    /* explicitly set the childview (formerly 'itemView') used to display the models in this collection */
    childView: DateItemView,

    initialize: function(){
        this.collection.fetch();
        console.log('DateCollectionView: initialize')
    },
    onRender: function(){ console.log('DateCollectionView: onRender') },
    onShow: function(){ console.log('DateCollectionView: onShow') }
});

var memoCollection = new MemoCollection();
var memoCollectionView = new MemoCollectionView({collection: memoCollection});

var dateCollection = new DateCollection();
var dateCollectionView = new DateCollectionView({collection: dateCollection});

//LayoutView
var AppLayoutView = Backbone.Marionette.LayoutView.extend({
    el: '#main_view',

    regions: {
        'MemoRegion': ".memoRegion",
        'DateRegion': ".dateRegion"
    },
    initialize: function() {
        //Memo

        this.MemoRegion.show(memoCollectionView);

        //Date

        this.DateRegion.show(dateCollectionView);
    }
});

var layout= new AppLayoutView();
