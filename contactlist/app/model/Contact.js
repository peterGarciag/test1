

Ext.define('contactlist.model.Contact', {
    
    /** Extend the default Model */
    extend: 'Ext.data.Model',

    /** Define the model's structure */
    fields: [
        { name:'id', type:'int'},
        { name:'name', type:'string'},
        { name:'identification', type:'string'},
        { name:'email', type:'string'},
        { name:'phonePrimary', type:'string'},
        { name:'phoneSecondary', type:'string'},
        { name:'fax', type:'string'},
        { name:'mobile', type:'string'},
        { name:'observations', type:'string'},
        { name:'address', type:'auto' ,  },
        { name:'type', type:'auto' },
        { name:'seller', type:'auto' },
        { name:'term', type:'auto'  },
        { name:'priceList', type:'auto' }
    ],
    idProperty: 'id',
    hasMany: [{
        model: 'contactlist.model.InternalContact',
        name: 'internalContacts',
        associationKey: 'internalContacts'
    }]
 });

Ext.define('contactlist.model.InternalContact', {
    
    /** Extend the default Model */
    extend: 'Ext.data.Model',
    /** Define the model's structure */
     belongsTo: 'contactlist.model.Contact',
    fields: [
        { name:'id', type:'int'},
        { name: "name"  },
        { name: "lastName" },
        { name: "email"  },
        { name: "phone"},
        { name: "mobile" },
        { name: "sendNotifications" }


    ]

 });