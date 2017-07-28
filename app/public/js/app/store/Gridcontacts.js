/**
 * Define the store for the user list grid
 */
Ext.define('contactlist.store.Gridcontacts', {
	
	/** Extend the default Store */
	extend: 'Ext.data.Store',

	/** Link to a model for structure */
	model: 'contactlist.model.Contact',

	/** Set store to autoload & autsync */
	autoLoad: true,
	autoSync: true,

	/** 
	 * Set up the store's data source
	 *     NOTE: The different URLs for CRUD
	 */
	proxy : {
		type: 'ajax',
		api: {
			read 	: 'http://localhost/zend/index/get/format/json',
			update	: 'http://localhost/zend/index/edit/format/json',
			create	: 'http://localhost/zend/index/add/format/json',
			destroy	: 'http://localhost/zend/index/delete/format/json',
		},
		reader: {
			type: 'json',
			root: 'contactlist',
			successProperty: 'success'
		}
	},
	/**
	 * setup filters
	 * 
	 */
     filters: [{
         property: 'type'
     }]

});