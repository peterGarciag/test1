/**
 * Define default application
 */
Ext.application({

    /** Give the app a name */
	name: 'contactlist',
	
    /** Define the base folder */
	appFolder: './js/app',

    /** Autoload these controllers */
	controllers: [
		'Index'
	],

    /** Launch the application */
	launch: function() {
		console.log('asdasdasd"');


		Ext.create('Ext.container.Viewport', {

            layout: 'border',
            items: [
                {
                	xtype : 'gridcontacts',
                	region: 'center'
                },

            ]
        });
	}

});