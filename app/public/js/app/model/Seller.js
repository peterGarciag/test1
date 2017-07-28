/**
 * Define the User model
 */
Ext.define('contactlist.model.Seller', {
    
    /** Extend the default Model */
    extend: 'Ext.data.Model',
    /** Define the model's structure */
    fields: ['id', 'name', 'lastname', 'phone','email','sendNotifications']

 });