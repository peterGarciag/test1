Ext.define('contactlist.view.main.Contact.contactEdit', {

    /** Extend default Window */
    extend: 'Ext.form.Panel',
    xtype: 'editContact',
    /** Give window a title, alias, layout and tell it to show on create */
    title: 'Edit User',
    alias: 'widget.contactEdit',
    layout: 'anchor',
    autoShow: true,
    modal: false,
    width: 550,
    requires: [
        'contactlist.store.SellerCmb',
        'contactlist.store.TermCmb',
        'contactlist.store.PriceListCmb'
    ],

    /** Initialize the component */
    initComponent: function() {
        var sellerStore = Ext.create('contactlist.store.SellerCmb');
        var termStore = Ext.create('contactlist.store.TermCmb');
        var pricelistStore = Ext.create('contactlist.store.PriceListCmb');
        this.items = [{
            /** Define the form */
            xtype: 'form',
            items: [{
                    
                    xtype: 'fieldset',
                    columnWidth: 0.5,
                    collapsible: false,
                    defaultType: 'textfield',
                    defaults: { anchor: '100%' },
                    layout: 'anchor',
                    items: [{
                            xtype: 'textfield',
                            name: 'name',
                            fieldLabel: 'Nombre',
                            allowBlank: false,
                            validator: function(value) {
                                if (Ext.getCmp('editBtn')) {
                                    if (value.length > 0) {
                                        Ext.getCmp('editBtn').enable(true);
                                    } else {
                                        Ext.getCmp('editBtn').disable(true);
                                    }
                                }
                                return true;
                            }
                        },
                        {
                            name: 'identification',
                            xtype: 'textfield',
                            fieldLabel: 'Nit',

                        },
                        {
                            vtype: 'email',
                            name: 'email',
                            fieldLabel: 'Email',
                            validator: function(value,_this) {
                                if (Ext.getCmp('editBtn')) {
                                    if ( /^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/.test(value)) {
                                        Ext.getCmp('editBtn').enable(true);
                                    } else {
                                        Ext.getCmp('editBtn').disable(true);
                                    }
                                }
                                return true;
                            }
                        },
                        {
                            fieldLabel: 'Telefono 1',
                            name: 'phonePrimary',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: 'Telefono 2',
                            name: 'phoneSecondary',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: 'Fax',
                            name: 'fax',
                            xtype: 'textfield'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    columnWidth: 0.5,
                    defaults: { anchor: '100%' },
                    collapsed: false, // fieldset initially collapsed
                    layout: 'anchor',
                    items: [{
                            fieldLabel: 'Direccion',
                            name: 'addr',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: 'Ciudad',
                            name: 'city',
                            xtype: 'textfield',
                            listeners: {
                                afterrender: function(a,b) { 
                                 var r = a.up('form').getForm().data;
                                 console.dir(r);
                                // textfield.setValue(r.addres.city);
                            }
                          }
                        },
                        {
                            fieldLabel: 'Observaciones',
                            name: 'observations',
                            xtype: 'textfield'
                        },

                        {
                            fieldLabel: 'Terminos de pago',
                            name: 'term',
                            xtype: 'combo',
                            emptyText: '--seleccione--',
                            store: termStore,
                            queryMode: 'remote',
                            valueField: 'id',
                            displayField: 'name',
                            listeners: {
                                afterrender: function(combo, eOpts) { 
                                 
                                var store = combo.getStore();
                                store.load({
                                    scope: this,
                                    callback: function(records, operation) {
                                        
                                        if (operation.success) {
                                            combo.setValue(combo.getValue().id);
                                        }
                                        
                                        combo.forceSelection = true;
                                    }
                                });
                            }
                          }
                        },
                        {
                            fieldLabel: 'Lista de precios',
                            name: 'priceList',
                            xtype: 'combobox',
                            emptyText: '--seleccione--',
                            store: pricelistStore,
                            queryMode: 'remote',
                            valueField: 'id',
                            listeners: {
                                afterrender: function(combo, eOpts) { 
                                
                                var store = combo.getStore();
                                store.load({
                                    scope: this,
                                    callback: function(records, operation) {
                                     
                                        if (operation.success) {
                                            combo.setValue(combo.getValue().id);
                                        }
                                        
                                        combo.forceSelection = true;
                                    }
                                });
                            }
                            
                            },
                            displayField: 'name',
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Vendedor',
                            name: 'seller',
                            emptyText: '--seleccione--',
                            store: sellerStore,
                            queryMode: 'remote',
                            valueField: 'id',
                            displayField: 'name',
                             listeners: {
                                afterrender: function(combo, eOpts) { 
                                  
                                var store = combo.getStore();
                                store.load({
                                    scope: this,
                                    callback: function(records, operation) {
                                     
                                        if (operation.success) {
                                            combo.setValue(combo.getValue().id);
                                        }
                                        
                                        combo.forceSelection = true;
                                    }
                                });
                            }
                          }
                        }
                    ]
                }
            ],
            bodyPadding: 5
        }];

        /** Set up window buttons */
        this.buttons = [{
                text: 'Guardar',
                action: 'save',
                id: 'editBtn',
                handler: function() {
                    var currentWin = this.up('window'),
                        form = currentWin.down('form'),
                        record = form.getRecord(),
                        values = form.getValues();
                    values.address = {
                        addres: values.addr,
                        city: values.city
                    };
                    delete values.city;
                    delete values.addr;

                    console.log(values);
                    // record.set(values);
                    currentWin.close();
                }
            },
            {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }

});