// Core Modules
const {ObjectId} = require ('mongodb')
const {getdb} = require('../utils/databaseUtil');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if(_id){
       this._id = _id;
    }
  }

  save() {  
    const db = getdb();

    if(this._id){
      const updateFields =  {
        houseName: this.houseName,
         price: this.price,
          location: this.location, 
          rating: this.rating, 
          photoUrl: this.photoUrl, 
          description: this.description
      }
     return db.collection('home').updateOne({_id: new ObjectId(String(this._id))}, {$set:(updateFields)});

    }

    return db.collection('home').insertOne(this).then((result)=>{
      console.log(result)
    });

  }

  static fetchAll() {
    const db = getdb();
    return db.collection('home').find().toArray();
  }

  static findById(homeId) {
     const db = getdb();
    return db.collection('home').find({_id: new ObjectId(String(homeId))}).next();

  }

  static deleteById(homeId) {
    const db = getdb();
    return db.collection('home').deleteOne({_id: new ObjectId(String(homeId))});
        
  }
};
