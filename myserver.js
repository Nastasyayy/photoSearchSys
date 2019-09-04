const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const obj = require("mongodb");
const multer = require('multer');
const fs = require('fs');
const test = require('./func/build/Release/testserver.node');

var upload = multer({ dest: '/home/nastya/Документы/TryServer/photos' });

const app = express();
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
let dbClient;

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("eventsdb").collection("events");
    app.locals.collectionPic = client.db("eventsdb").collection("pictures");
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/event", function (request, response) {

    console.log(request.body);
    if (!request.body) return response.sendStatus(400);
    const collection = request.app.locals.collection;
    let event = request.body;
    collection.insertOne(event, function (err, docsInserted) {
        if (err) return console.log(err);
        let resID = docsInserted.insertedId;
        if (response.send(resID)) return console.log(resID);
    });
});
app.delete("/event", function (request, response) {

    const collection = request.app.locals.collection;
    const colPic = request.app.locals.collectionPic;
    let delID = request.body.id;
    let condelID = JSON.stringify({ delID });
    console.log(delID);
    try {
        collection.findOneAndDelete({ _id: new obj.ObjectID(delID) });
        colPic.deleteMany({ parentID: new obj.ObjectID(delID) });//findAllAndDelete({_id: new obj.ObjectID(delID)});
    } catch (e) {
        console.log(e)
    }
    response.json(condelID);
});

app.post("/event/:id/info", function (request, response) {

    let getID = request.body.id;
    const collection = request.app.locals.collection;
    try {
        var cursor = collection.find({ _id: new obj.ObjectID(getID) }).toArray(function (err, results) {
            response.json(results);//console.log(results);
        });
    } catch (e) {
        console.log(e)
    }
});

app.post('/event/photos/upload', upload.array('myImages'), (req, res) => {

    const files = req.files;
    let parent_id = req.query.parent_id;
    console.log(parent_id);
    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    const collection = req.app.locals.collectionPic;
    collection.insertMany(files, (err, results) => {

        if (err) return console.log(err);
        console.log('saved to database');

        res.send(results.insertedIds);
    });
    for (var i = 0; i < files.length; i++) {
        const buffer = fs.readFileSync(files[i].path);
        var result = JSON.parse(buffer);
        console.log(result);
        let myID = files[i]._id;

        collection.updateOne({ _id: myID }, { $set: { description: result } });
        collection.updateOne({ _id: myID }, { $set: { parentID: obj.ObjectID(parent_id) } });
        app.locals.collectionPic.find({ _id: obj.ObjectID(myID) }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    };
});

app.post('/event/:id/photos', (request, response) => {

    let eventID = request.body.id;
    const colPic = request.app.locals.collectionPic;
    try {
        colPic.find({ parentID: obj.ObjectID(eventID) }).toArray(function (err, results) {
            response.json(results);
        });
    } catch (e) {
        console.log(e)
    }
});

app.post('/search', upload.single('myTrack'), function (req, res, next) {

    let myFile = req.file.path;
    let mystartTime = req.body.startTime;
    let myeventID = req.body.eventID;
    const collect = req.app.locals.collectionPic;
    try {
        collect.find({ parentID: new obj.ObjectID(myeventID) }, { 'fields': { 'description.tags.CreateDate': 1, 'path': 1, 'GPSLatitude': 1, 'GPSLongitude': 1 } }).toArray(function (err, results) {
            var arr = [];
            for (var i = 4; i < results.length; i++) {
                let myPath = results[i].path;
                let mygW = String(results[i].GPSLatitude); //'61.0365';
                let mygL = String(results[i].GPSLongitude); //'30.1355';
                let myTime = String(results[i].description.tags.CreateDate);
                var tmp = new test.NapiPod();
                let answ = tmp.photoCheck(myFile, mystartTime, mygW, mygL, myTime);
                arr[i] = [answ, myPath];
                console.log(answ);
                module.exports = test;
            };
            var pu = JSON.stringify(arr);
            console.log(pu);
            res.send(pu);
        });
    } catch (e) {
        console.log(e)
    }
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
