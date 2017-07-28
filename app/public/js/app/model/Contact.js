/**
 * Define the User model
 */
Ext.define('contactlist.model.Contact', {
	
	/** Extend the default Model */
	extend: 'Ext.data.Model',

	/** Define the model's structure */
    fields: ['id', 'name', 'identification', 'email', 'phonePrimary', 'phoneSecondary', 'fax', 'mobile', 'observations', 'address', 'address', 'city', 'type', 'seller', 'term', 'priceList', 'internalContacts']

 });