
Ext.define('contactlist.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'contactlist.store.Gridcontacts'
    ],
    store: {
        type: 'gridcontacts'
    },
    multiSelect: true,
    width: '100%',
    header: false,
    columns: [

        { text: 'Id',  dataIndex: 'id' , hidden:true ,  hideable: false,        sortable: false},
        { text: 'Nombre',  dataIndex: 'name', hideable: false , 
        filter: {
            type: 'string',
        }},
        { text: 'Nit',  dataIndex: 'identification', sortable: true,
            filter: {
            type: 'string',
        } },
        { text: 'Telefono 1',  dataIndex: 'phonePrimary', sortable: true,
            filter: {
            type: 'string',
        }
         },
        { text: 'Observaciones',  dataIndex: 'observations' , width:300 , sortable: true,
            filter: {
            type: 'string',
        }, flex:1},
        {
            xtype:'actioncolumn',
            width:150,
            text: 'Acciones',

            items: [{
                iconCls: 'x-fa fa-eye ver',
                tooltip: 'Ver',
                minWidth: 20,
                handler: function(grid, rowIndex, colIndex) {
                    // var rec = grid.getStore().getAt(rowIndex);
                    // var widget = Ext.widget('contactEdit');
                    // widget.down('form').loadRecord(rec);
                }
            },{
                iconCls: 'x-fa fa-pencil-square-o editar',
                tooltip: 'Editar',
                minWidth: 20,
                handler: function(grid, rowIndex, colIndex) {
                       var rec = grid.getStore().getAt(rowIndex);
                    var widget = Ext.widget('contactEdit');
                    // console.log(rec);
                    widget.down('form').loadRecord(rec);
                }
            },{
                iconCls: 'x-fa fa-trash eliminar',
                tooltip: 'Eliminar',
                minWidth: 20,
                handler: function(grid, rowIndex, colIndex) {
                      Ext.MessageBox.confirm('Eliminar', 'esta seguro?', function(btn){
                       if(btn === 'yes'){
                           var rec = grid.getStore().getAt(rowIndex);
                            grid.getStore().remove(rec);
                       }
                       
                     });
                }
            }]
        }
    ],
    tbar: [{
            text: 'Nuevo contacto',
            iconCls: 'x-fa fa-plus',
            handler : function() {
               alert("crear nuevoi");
            }
        },{
            text: 'ver todos',
            iconCls: '',
            handler : function(btn) {
               
               var store = btn.up('grid').getStore();
                store.load({params: { 'type': ''}});
            }
        },{
            text: 'ver clientes',
            iconCls: '',
            handler : function(btn) {
                 var store = btn.up('grid').getStore();
                store.load({params: { 'type': 'client'}});
            }
        },{
            text: 'ver proveedores',
            iconCls: '',
            handler : function(btn) {
                 var store = btn.up('grid').getStore();
                store.load({params: { 'type': 'provider'}});
            }
        }],
      bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
