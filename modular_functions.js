var Mongo = require('mongodb');
var Twit = require('twit');

var Db = Mongo.Db;
var Server = Mongo.Server;
var MongoClient = Mongo.MongoClient;

var address = "localhost";
var port = "27017";
var database = process.env.DB_DATABASE || "nodejs" ||"Twitter"; 
var mydata;

var response;
var collections;
var query;

var server = new Server(address, port, {auto_reconnect: true});
var db = new Db(database, server);
var T = new Twit({
    consumer_key:         'GzM2G202zP4Lo04kAFoP4TmEa'
  , consumer_secret:      'aJBOMYk96ZUUriLtvhP0ecAuGmw9pN38xdj69iGaq8OZpk8R1f'
  , access_token:         '738778154458873857-p07JICMlD6NjtSOmOgamQrJYvTC6R2I'
  , access_token_secret:  'E163HSitSwcZ3VDaqZqQuQ2Wviw0QqZULKsSH2655gRU1'
});


open_db = db.open(function(err, db){
	if (err) {
		console.log("Database acılmadı" + err);
	} else {
		collections = db.collection("Tweets");
	}
});

write_db = function(err, db){
		for(i=0; i<mydata.length; i++){
			collections.insert({
				Name: mydata[i].user.name,
				Tweets: mydata[i].text,
				Date: mydata[i].created_at,
				Location: mydata[i].user.location		
			});
		}	
	}

homepage = function (req, res){
	res.render('homepage', {foo: "Twitter Arama Sayfası"});
}

get_data = function (err, data, response){
	if (err){
		
		
		this.render('homepage', {foo: "Twitter Arama Sayfası"});
	} else {
		mydata = data.statuses;
		
		this.render("tweets/Twitter", {tweets: mydata, requesting:query  });
		MongoClient.connect("mongodb://" + address + ":" + port + "/" + database, write_db); 
	}
}

get_tweets = function (req, res){
	query = req.query.search;
	
	var display_data = get_data.bind(res);
	T.get('search/tweets', { q: query, count:100 }, display_data );
}

read = function(err, db){
	if(err){
		console.log("Database açılmadı" + err);
	}
	else {
		
		var PARSE_JSON = parse_json.bind(this);
		collections.find().toArray(PARSE_JSON);
	}
} 

parse_json = function(err, document){
	if(err){
		console.log("veri bulunamadı" + err);
	}
	else if(document){
		this.render('display/db_tweets', { tweets: document, requesting: query });
	}
}

display_tweets = function(req, res){
	
	var read_db = read.bind(res);
	MongoClient.connect("mongodb://" + address + ":" + port + "/" + database,read_db);
	
	
}

exports.homepage=homepage;
exports.get_tweets=get_tweets;
exports.display_tweets = display_tweets;
