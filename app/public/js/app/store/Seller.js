Ext.define('contactlist.store.Combo', {
    extend   : 'Ext.data.Store',
    fields : ['val','txt'],
    autoLoad : false,
    proxy : {
        type : 'ajax',
        api : {
            read : 'url_for_your_ajax_request'
        },
        reader : {
            type : 'json',
            root : 'data',
            successProperty : 'success'
        }
    }
});