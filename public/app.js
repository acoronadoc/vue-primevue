
var rURL="/data";

var app = new Vue({
	el: "#app",
	components: {
		'p-calendar': calendar,
		'p-chart': chart,
		},
	data: {
		loading: true,
		fecha: "",
		datos: {}
		},
	methods: {
		loadData: function() {
			call({ fecha: this.fecha }, function(p) {
				app.$data.datos=p;
				});
			}
		}
	});

function call(data, callback) {
	app.$data.loading=true;

	fetch( rURL, {
		  method: 'POST', 
    		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify( data )
		} ).then(function(response) {
			response.json().then(function(p) {
				app.$data.loading=false;
				callback( p );
	        	});
	    });	

	}

app.$data.loading=false;


