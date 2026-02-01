const {ObjectId} = require("mongodb");
const {getdb} = require("../utils/databaseUtil");

module.exports = class Todo {
    constructor(tasktitle, category, priority, duedate,userid, _id) {
        this.tasktitle = tasktitle;
        this.category = category;
        this.priority = priority;
        this.duedate = duedate;
        this.userid=userid;
        if (_id) {
            this._id = _id;
        }
    }

    save() {
        const db = getdb();
        return db.collection("task").insertOne(this);
    }

  static  fetchdata() {
        const db = getdb();
        return db.collection("task").find().toArray();
    }
    static fetchbyid(id){
        const db=getdb();
        return db.collection("task").find({userid :id}).toArray();
    }

    static deleteById(id){
        const db = getdb();
        return db.collection("task").deleteOne({_id : new ObjectId(String(id))})
    }

    static findById(id) {
        const db = getdb();
        return db.collection('task').find({_id : new ObjectId(id)}).next();
    }

    static updateSave(data,id) {
            const db=getdb();
            return db.collection('task').updateOne({_id: new ObjectId(id)}, {$set: data});
    }
}