const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = "mongodb+srv://Soroardi:Soroardi@cluster0.15orovi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let _db;
const  mongoConnect = (callback)=>{
  MongoClient.connect(url)
  .then((client) =>{
    console.log('mongodb connnected successfull');
    _db=client.db("airbnb");
    callback()
  })
  .catch((err)=>{
    console.log(err);
  });
};


const getdb =()=>{
  if(!_db){
    throw new Error('Database not connected')
  }
  return _db
}

exports.getdb = getdb;
exports.mongoConnect = mongoConnect;