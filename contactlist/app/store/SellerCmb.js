Ext.define('contactlist.store.SellerCmb', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    alias: 'store.sellercmb',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            read: 'http://localhost/zend/index/get-seller/format/json'
        },
        reader: {
            type: 'json',
            root: 'sellerList',
            successProperty: 'success'
        },
        listeners: {
            exception: function(proxy, response, operation) {

                Ext.toast({
                    html: Ext.String.format("'Ups! algo salio  mal"),
                    width: 300,
                    align: 'br',
                    iconCls: 'x-fa fa-window-close error-color',
                    closeOnMouseDown: true,
                    bodyStyle: {
                        background: '#efefef',
                        padding: '10px',
                        fontweight: 'bold'
                    },
                    bodyBorder: false,
                    border: false,
                    header: false
                });
            }
        },
        afterRequest: function(request, success) {
            var action = "";
            var s = [];
            if (request._action == 'read') {
                console.log("read");
                if (!request._operation.success) {
                    action = "cargando";

                }
            }
            if (action !== "") {
                Ext.toast({
                    html: Ext.String.format("'Ups! algo salio  mal {0} los valores para el combo'", action),
                    width: 300,
                    align: 'br',
                    iconCls: 'x-fa fa-window-close error-color',
                    closeOnMouseDown: true,
                    bodyStyle: {
                        background: '#efefef',
                        padding: '10px',
                        fontweight: 'bold'
                    },
                    bodyBorder: false,
                    header: false,
                    border: false
                });
            }

        }
    }
});