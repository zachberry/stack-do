var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.get('/', function(req, res) {
	res.sendfile('public/index.html');
});

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var format = require('util').format;

// MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
// 	if(err)
// 	{
// 		throw err;
// 	}

// 	var collection = db.collection('test_insert');
// 	collection.insert({a:2}, function(err, docs) {
// 		collection.count(function(err, count) {
// 			console.log(format("count = %s", count));
// 		});

// 		collection.find().toArray(function(err, results) {
// 			console.log(results);
// 			db.close();
// 		});
// 	});
// });

//api
// get all stacks
app.get('/stack', function(req, res) {
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
		if(err)
		{
			throw err;
		}

		var collection = db.collection('stacks');
		collection.find().toArray(function(err, results) {
			res.send(results);
			db.close();
		});
	});
});

// create new stack
app.post('/stack', function(req, res) {
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
		if(err)
		{
			throw err;
		}

		var collection = db.collection('stacks');
		collection.insert({ projects:'[]' }, function(err, docs) {
			res.send(docs[0]._id);
			db.close();
		});
	});
});

// get stack xyz
app.get('/stack/:id', function(req, res) {
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
		if(err)
		{
			throw err;
		}

		var collection = db.collection('stacks');
		console.log(req.params.id);
		collection.findOne({ _id:ObjectID(req.params.id) }, function(err, doc) {
			console.log(doc);
			res.send(doc);
			db.close();
		});
		
	});
});

// update stack xyz
app.put('/stack/:id', function(req, res) {
	console.log(req.body.projects);
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
		if(err)
		{
			throw err;
		}

		var collection = db.collection('stacks');

		collection.findAndModify(
			{ _id:ObjectID(req.params.id) },
			[],
			{ projects:req.body.projects },
			{ upsert: false, 'new':true },
			function(err, doc) {
				res.send(doc);
				db.close();
			}
		);
	});
});

// delete stack xyz
app.delete('/stack/xyz', function(req, res) {

});


app.listen(3030);