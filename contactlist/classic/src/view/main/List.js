
Ext.define('contactlist.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    id: "gridContacts",
    requires: [
        'contactlist.store.Gridcontacts',
        'Ext.selection.CheckboxModel'
    ],
    selected: true,
    store: {
        type: 'gridcontacts'
    },
    
    initComponent: function(){
        this.selModel = new Ext.selection.CheckboxModel({
          checkOnly: true
        });
        this.callParent(arguments);

    },
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
                    var s = grid.getStore();
                    
                    var rec = s.getAt(rowIndex);

                    rec.data.addr = rec.data.address.address;
                    rec.data.city = rec.data.address.city;
                    var widget = Ext.widget('contactEdit',{
                        activeEdit : false,
                            title: 'Ver contacto',
                        _record: rec
                    });

                    widget.down('form').loadRecord(rec);
                }
            },{
                iconCls: 'x-fa fa-pencil-square-o editar',
                tooltip: 'Editar',
                minWidth: 20,
                handler: function(grid, rowIndex, colIndex) {
                    var s = grid.getStore();
                    
                    var rec = s.getAt(rowIndex);

                    rec.data.addr = rec.data.address.address;
                    rec.data.city = rec.data.address.city;

                    var widget = Ext.widget('contactEdit',{
                        activeEdit : true,
                            title: 'Editar contacto',
                            _record: rec
                    });
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
    listeners: {
        selectionchange: function (view, selections, options) {
            
            this.selectiotext = Ext.String.format("eliminar {0} Contactos",selections.length);
            btndelete= Ext.getCmp("deleteAllBtn");
            btnclean = Ext.getCmp("cleanSelBtn");
            if (selections.length > 1) {
                btndelete.setText(this.selectiotext);
                btndelete.setVisible(true);
                btnclean.setVisible(true);

            }
            else {
                btndelete.setVisible(false);
                btnclean.setVisible(false);
            }
        }
    },
    tbar: [{
            text: 'Nuevo contacto',
            iconCls: 'x-fa fa-plus',
            handler : function() {
                                   
                    var s = Ext.getCmp('gridContacts').getStore();
                
                    var widget = Ext.widget('contactEdit',{
                        activeEdit : true,
                            title: 'Nuevo contacto',
                            new : true

                    });
                    
            },
            scope: this
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
    },
     dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
             {
            xtype: 'button',
            scale: 'small',
            id: 'deleteAllBtn',
            hidden: true,
            handler: function (btn) {
                    var grid = btn.up('grid'),
                    store = grid.getStore()
                    ,selection = grid.getSelectionModel().getSelection();
                    store.remove(selection);
                }
            },
            {
            xtype: 'button',
            text: 'Limpiar seleccion',
            id: 'cleanSelBtn',
            hidden: true,
            scale: 'small',
            handler: function (btn) {
                    var grid = btn.up('grid');
                    grid.getSelectionModel().deselectAll();
                }
            }]
    }]
});
