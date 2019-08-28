var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '172.17.0.3',
  user     : 'root',
  password : 'root'
});

connection.connect();

var app = express();
app.use(express.json());
app.use('/', express.static('public'));

app.post('/data', function (req, res) {
	var fecha=req.body.fecha.substring( 0, req.body.fecha.indexOf('T') );
	
	var sql="SELECT "+ 
		"	DATE_FORMAT(insert_date, '%Y-%m-%d') AS d, "+
		"	AVG(price) as p1 "+
		"FROM youtube.renfe "+

		"WHERE start_date >= '"+fecha+" 00:00:00' AND start_date <= '"+fecha+" 23:59:59' AND "+
		"	origin='BARCELONA' AND "+
		"	destination='MADRID' AND "+
		"	price<>'' "+
		"GROUP BY DATE_FORMAT(insert_date, '%Y-%m-%d') "+
		"ORDER BY insert_date DESC";

	connection.query(sql, function(err, rows, fields) {
		
		var datos={
			labels: [],
			datasets: [
				{
					label: 'Media',
					data: [],
					fill: false,
					backgroundColor: '#2f4860',
					borderColor: '#2f4860'
				}
				]
			};

		for ( var i=0; i<rows.length; i++ ) {
			datos.labels.push( rows[i].d );
			datos.datasets[0].data.push( rows[i].p1 );
			}

  		res.send( datos );
		});	
	});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



