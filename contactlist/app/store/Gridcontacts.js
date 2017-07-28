/**
 * Define the store for the user list grid
 */
 Ext.define('contactlist.store.Gridcontacts', {

    /** Extend the default Store */
    extend: 'Ext.data.Store',
    alias: 'store.gridcontacts',
    /** Link to a model for structure */
    model: 'contactlist.model.Contact',

    /** Set store to autoload & autsync */
    autoLoad: true,
    autoSync: true,

    /**
     * set remoteFilter
     */
     remoteFilter: true,
    /** 
     * Set up the store's data source
     *     NOTE: The different URLs for CRUD
     */
    requires: ['Ext.window.Toast'],
     proxy : {
        type: 'ajax',
        api: {
            read    : '/index/get/format/json',
            update  : '/index/edit/format/json',
            create  : '/index/add/format/json',
            destroy : '/index/delete/format/json',
        },
        reader: {
            idProperty: 'id',
            type: 'json',
            root: 'contactlist',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            allDataOptions: {
                persist: true,
                associated: true
            },
            partialDataOptions: {
                changes: false,
                critical: true,
                associated: true
            }
        },
        listeners   :{
            exception   : function(proxy, response, operation)
            {
                
                Ext.toast({
                 html: Ext.String.format("'Ups! algo salio  mal"),
                 width: 300,
                 align: 'br',
                 iconCls: 'x-fa fa-window-close error-color',
                 closeOnMouseDown : true,
                 bodyStyle:{
                      background: '#efefef',
                      padding: '10px' ,
                      fontweight: 'bold'
                 },
                 bodyBorder: false,
                 border: false,
                 header : false
                });
            }
        },
        afterRequest: function (request, success) 
        {   
            
            var action = "";
            var s = [];
            if (request._action == 'read')
            {
                // console.log("read");
                if (!request._operation.success) 
                {
                      action = "cargando";
                      s = [ 
                            "(los)" , "(s)"
                        ];
                }
            }
            else if (request._action == 'create')
            {

                if (!request._operation.success && request._operation.hasException())
                {
                     action = "creando";
                   
                }
                else {
                    var s = Ext.getCmp('gridContacts').getStore();
                    s.load();
                }
            }
            else if (request._action == 'update')
            {
               if (!request._operation.success)
               {
                     action = "actualizando";
                }
            }
            else if (request._action == 'destroy')
            {
               if (!request._operation.success && request._operation.hasException())
               {
                     action = "eliminando";
               
                }
                else {
                    var s = Ext.getCmp('gridContacts').getStore();
                    s.load();
                }
            }
            if (action !== "") {
                 Ext.toast({
                 html: Ext.String.format("'Ups! algo salio  mal {0} el{1} contacto{2}'",action,s[0],s[1]),
                 width: 300,
                 align: 'br',
                 iconCls: 'x-fa fa-window-close error-color',
                 closeOnMouseDown : true,
                 bodyStyle:{
                      background: '#efefef',
                      padding: '10px' ,
                       fontweight: 'bold'
                 },
                 bodyBorder: false,
                 header : false,
                 border: false
             });    
            }
            
        
    },
    },
    filters: [{
       property: 'type'
    }],
    scope: this
});