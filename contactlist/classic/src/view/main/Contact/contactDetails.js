Ext.define('contactlist.view.main.Contact.contactEdit', {

    /** Extend default Window */
    extend: 'Ext.window.Window',
    id: 'editWin',
    /** Give window a title, alias, layout and tell it to show on create */

    alias: 'widget.contactEdit',
    
    autoShow: true,
    modal: false,
    width: '100%',
    height: '100%',
    layout: 'fit',
    resizable: true,
    draggable: false,
    requires: [
        'contactlist.store.SellerCmb',
        'contactlist.store.TermCmb',
        'contactlist.store.PriceListCmb'
    ],
    activeEdit: false,
     
    /** Initialize the component */
    initComponent: function() {
        if (!this._record) {
            this._record = Ext.create('contactlist.model.Contact');
        }
        var c = this._record.internalContacts();
        var readonly = this.activeEdit;
        console.log(c);
        /**
         * grid para gestionar los contactos internos
         */
        var nestedGrid = Ext.create('Ext.grid.Panel', {
            store: c,
            readonly:readonly,
            header: false,
            with: '100%',
            height: '100%',
            layout: 'fit',
            listeners: {
                beforeedit:function(){
                   
                    return this.readonly;
                },
                edit:  function (editor, edit) {
                        var grid =  Ext.getCmp('nestedGrid');
                        var form = Ext.getCmp('newData').getForm(),
                        store = grid.getStore(), 
                        values, model;
                        if (form.isValid()) {
                            values = form.getValues();
                            model = Ext.create('contactlist.model.InternalContact', values);
                            store.add(model);
                            form.reset();
                        }
                }
            },
            id: 'nestedGrid',
            title: 'Personas asociadas',
            columns: [{
                    dataIndex: "name",
                    text: 'Nombre',
                    width: '10%',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Apellido',
                    width: '10%',
                    dataIndex: "lastName",
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Email',
                    width: '10%',
                    dataIndex: "email",
                    flex: 1,
                    editor: {
                           
                             validator: function(value, _this) {
                                        btn = Ext.getCmp('editBtn');
                                        if (value != "") {
                                            if (value.length !== 0) {
                                                if (/^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/.test(value)) {
                                                    btn.enable(true);
                                                } else {
                                                    btn.disable(true);
                                                }
                                            }
                                        } else {
                                            btn.enable(true);

                                        }
                                        return true;
                                    },
                                vtype: 'email'
                    }
                },
                {
                    text: 'Telefono',
                    width: '10%',
                    dataIndex: "phone",
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Celular',
                    width: '10%',
                    dataIndex: "mobile",
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Enviar factura',
                    width: '10%',

                    dataIndex: "sendNotifications",
                    flex: 1,
                    editor: {
                        xtype: 'checkbox'
                    }
                },
                {
                  
                    xtype:'actioncolumn',
                    width:150,
                    text: 'Acciones',

                    items: [{
                        iconCls: 'x-fa fa-trash eliminar',
                        tooltip: 'Eliminar',
                        minWidth: 20,
                        handler: function(grid, rowIndex, colIndex) {
                             var rec = grid.getStore().getAt(rowIndex);
                            grid.getStore().remove(rec);

                        }
                    }
                ]
                
                }
            ],
            plugins: [{
                ptype: 'rowediting',
                clicksToEdit: 1
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                hidden:!this.readonly,
                items: [{
                    xtype: 'form',
                    id:'newData',
                    hidden: !this.readonly,
                    columnWidth: 0.7,
                    reference: 'interal',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign : 'top',
                        labelWidth: 35,
                        margin: '0 10',
                        flex: 1,
                        xtype: 'textfield',
                        allowBlank: true
                    },
                    items: [{
                             fieldLabel: 'Nombres',
                            name: "name",
                            
                            
                        },
                        {
                             fieldLabel: 'Apellidos',
                            name: "lastName",
                            

                        },
                        {
                            
                            name: "email",
                             validator: function(value, _this) {
                                        btn = Ext.getCmp('editBtn');
                                        if (value != "") {
                                            if (value.length !== 0) {
                                                if (/^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/.test(value)) {
                                                    btn.enable(true);
                                                } else {
                                                    btn.disable(true);
                                                }
                                            }
                                        } else {
                                            btn.enable(true);

                                        }
                                        return true;
                                    },
                                  fieldLabel: 'Email',   
                                vtype: 'email'
                        },
                        {
                            
                            fieldLabel: 'Teléfono',
                            name: "phone",
                        },
                        {
                            
                            fieldLabel: 'Celular',
                            name: "mobile",

                        },
                        {
                            
                            fieldLabel: 'enviar Factura',
                            name: "sendNotifications",
                            xtype: 'checkbox'
                        }
                    ]
                }, {
                    columnWidth: 0.3,
                    align: 'left',
                    xtype: 'button',
                     iconCls: 'x-fa fa-plus ver',
                    tooltip: 'Asociar persona',
                    handler: function(){
                        var grid =  Ext.getCmp('nestedGrid');
                        var form = Ext.getCmp('newData').form,
                       store = grid.getStore(), 
                        values, model;
                        if (form.isValid()) {
                            values = form.getValues();
                            model = Ext.create('contactlist.model.InternalContact', values);
                            store.add(model);
                            form.reset();
                        }
                    }
                }]
            }],

        });

        var sellerStore = Ext.create('contactlist.store.SellerCmb');
        var termStore = Ext.create('contactlist.store.TermCmb');
        var pricelistStore = Ext.create('contactlist.store.PriceListCmb');


        this.items = [{
            xtype: 'panel',
            layout: 'vbox',
            height: '100%',
            width: '100%',
            items: [{
                xtype: 'panel',
                layout: 'fit',
                rowHeight: 1,
                height: '70%',
                title: 'Datos del contacto',
                width: '100%',
                collapsible: true,
                id: 'paneluno',
                listeners:{
                    expand: function (p, eOpts ){
                        Ext.getCmp('paneldos').collapse();
                    },
                    collapse: function (p, eOpts ){
                        Ext.getCmp('paneldos').expand();
                    }
                },
                items: [{
                    /** Define the form */
                            /**
                        * formulario par la edicion y creacion de un comntacto
         */
                    xtype: 'form',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                            xtype: 'fieldset',
                            columnWidth: 0.3,
                            height: '100%',
                            collapsible: false,
                            flex: 1,
                            id: "formEdit",
                            defaultType: 'textfield',
                            defaults: { anchor: '100%' },
                            layout: 'anchor',
                            items: [{
                                    xtype: 'textfield',
                                    name: 'name',
                                    readOnly: !this.activeEdit,
                                    fieldLabel: 'Nombre *',
                                    allowBlank: false,
                                    maxLength: 90,
                                    validator: function(value) {
                                        btn = Ext.getCmp('editBtn');

                                        if (value.length > 0 && value.length <= 90) {
                                            btn.enable(true);
                                        } else {
                                            btn.disable(true);
                                        }
                                        return true;
                                    }
                                },
                                {
                                    name: 'identification',
                                    readOnly: !this.activeEdit,
                                    xtype: 'textfield',
                                    fieldLabel: 'Nit',
                                    maxLength: 45,

                                    validator: function(value) {
                                        btn = Ext.getCmp('editBtn');
                                        btn.enable(true);
                                        if (value.length !== 0) {
                                            if (value.length > 0 && value.length <= 45) {
                                                btn.enable(true);
                                            } else {
                                                btn.disable(true);
                                            }
                                        }
                                        return true;
                                    }
                                },
                                {
                                    vtype: 'email',
                                    name: 'email',
                                    readOnly: !this.activeEdit,
                                    fieldLabel: 'Email',
                                    maxLength: 100,
                                    validator: function(value, _this) {
                                        btn = Ext.getCmp('editBtn');
                                        if (value != "") {
                                            if (value.length !== 0) {
                                                if (/^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/.test(value)) {
                                                    btn.enable(true);
                                                } else {
                                                    btn.disable(true);
                                                }
                                            }
                                        } else {
                                            btn.enable(true);

                                        }
                                        return true;
                                    }
                                },
                                {
                                    fieldLabel: 'Telefono 1',
                                    name: 'phonePrimary',
                                    readOnly: !this.activeEdit,
                                    xtype: 'textfield',
                                    maxLength: 45,
                                    validator: function(value) {
                                        btn = Ext.getCmp('editBtn');
                                        btn.enable(true);
                                        if (value.length !== 0) {
                                            if (value.length > 0 && value.length <= 45) {
                                                btn.enable(true);
                                            } else {
                                                btn.disable(true);
                                            }
                                        }
                                        return true;
                                    }
                                },
                                {
                                    fieldLabel: 'Telefono 2',
                                    name: 'phoneSecondary',
                                    readOnly: !this.activeEdit,
                                    xtype: 'textfield',
                                    maxLength: 45,
                                    validator: function(value) {
                                        btn = Ext.getCmp('editBtn');
                                        btn.enable(true);
                                        if (value.length !== 0) {
                                            if (value.length > 0 && value.length <= 45) {
                                                btn.enable(true);
                                            } else {
                                                btn.disable(true);
                                            }
                                        }
                                        return true;
                                    }
                                },
                                {
                                    fieldLabel: 'Fax',
                                    name: 'fax',
                                    readOnly: !this.activeEdit,
                                    xtype: 'textfield',
                                    maxLength: 45,
                                    validator: function(value) {
                                        btn = Ext.getCmp('editBtn');
                                        btn.enable(true);
                                        if (value.length !== 0) {
                                            if (value.length > 0 && value.length <= 45) {
                                                btn.enable(true);
                                            } else {
                                                btn.disable(true);
                                            }
                                        }
                                        return true;
                                    }
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Tipo',
                                    defaultType: 'checkboxfield',
                                    name: 'type',
                                    readOnly: !this.activeEdit,
                                    items: [{
                                        boxLabel: 'Cliente',
                                        name: 'type',
                                        inputValue: 'client',
                                        id: 'checkbox1'
                                    }, {
                                        boxLabel: 'Proveedor',
                                        name: 'type',
                                        inputValue: 'provider',
                                        id: 'checkbox2'
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            columnWidth: 0.5,
                            flex: 1,
                            height: '100%',
                            defaults: { anchor: '100%' },
                            collapsed: false, // fieldset initially collapsed
                            layout: 'anchor',
                            items: [{
                                    fieldLabel: 'Direccion',
                                    name: 'addr',
                                    readOnly: !this.activeEdit,
                                    xtype: 'textfield'
                                },
                                {
                                    fieldLabel: 'Ciudad',
                                    name: 'city',
                                    readOnly: !this.activeEdit,
                                    xtype: 'textfield',

                                },
                                {
                                    fieldLabel: 'Observaciones',
                                    name: 'observations',
                                    readOnly: !this.activeEdit,
                                    xtype: 'textareafield',
                                    maxLength: 500
                                },

                                {
                                    fieldLabel: 'Terminos de pago',
                                    name: 'term',
                                    readOnly: !this.activeEdit,
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

                                                    if (!combo.getValue()) {
                                                        return;
                                                    }
                                                    if (operation.success) {
                                                        combo.setValue(combo.getValue().id ? combo.getValue().id : combo.getValue());

                                                    }

                                                }
                                            });
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Lista de precios',
                                    name: 'priceList',
                                    readOnly: !this.activeEdit,
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

                                                    if (!combo.getValue()) {
                                                        return;
                                                    }
                                                    if (operation.success) {
                                                        combo.setValue(combo.getValue().id ? combo.getValue().id : combo.getValue());

                                                    }

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
                                    readOnly: !this.activeEdit,
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
                                                    if (!combo.getValue()) {
                                                        return;
                                                    }
                                                    if (operation.success) {
                                                        combo.setValue(combo.getValue().id ? combo.getValue().id : combo.getValue());

                                                    }

                                                }
                                            });
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    bodyPadding: 5
                }]
            }, {
                xtype: 'panel',
                layout: 'fit',
                height: '100%',
                width: '100%',
                title: 'personas asociadas',
                collapsible: true,
                collapsed: false,
                id: 'paneldos',
                listeners:{
                    expand: function (p, eOpts ){
                        Ext.getCmp('paneluno').collapse();
                    },
                    collapse: function (p, eOpts ){
                        Ext.getCmp('paneluno').expand();
                    }
                },
                items: [
                    nestedGrid
                ]
            }]
        }];

        /** Set up window buttons */
        this.buttons = [{
                text: 'Guardar',
                action: 'save',
                id: 'editBtn',
                hidden: !this.activeEdit,
                handler: this.saveContact,
                scope: this
            }, {
                text: 'Editar',
                hidden: this.activeEdit,
                id: 'activateBtn',
                scope: this,
                handler: this.activate
            },
            {
                text: 'Cerrar',
                scope: this,
                handler: this.close
            }
        ];
        this.callParent(arguments);
    },

    /* activa el modo de edicion desde la vista de detalles*/
    activate: function() {
        var currentWin = this;
        form = currentWin.down('form');
        record = this._record;
        currentWin.close();
        var widget = Ext.widget('contactEdit', {
            activeEdit: true,
            title: 'Editar Contacto'
        });
        widget.down('form').loadRecord(record);
    },

    /** almacena o edita el contacto */
    saveContact: function() {

        var currentWin = this,
            form = currentWin.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        if (!form.isValid) {
            return;
        }
        var nested  = Ext.getCmp('nestedGrid').getStore();
        var internalcontacts = nested.getData();
        
        /** .-.  */
            for (key in values) {
                var value = values[key];
                if (value === "") {
                    values[key] = null;
                }
            }
            
            
            values.address = {
                address: values.addr,
                city: values.city
            };
            delete values.city;
            delete values.addr;
            console.dir(values);
        /****  **/
        if (this.new) {
            values.internalContacts = [];
            for (var i = 0; i < internalcontacts.items.length; i++) {
                var _iteracion =internalcontacts.items[i].data;
                values.internalContacts.push(_iteracion);
            }
            var data = Ext.create('contactlist.model.Contact', values);
            var s = Ext.getCmp('gridContacts').getStore();
            console.log(data);
            s.add(data);
        } else {
            record.set(values);
        }
        currentWin.close();

    }
});