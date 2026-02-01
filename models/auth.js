const {ObjectId} = require("mongodb");
const {getdb} = require("../utils/databaseUtil");

module.exports = class User {
    constructor(fname, lname, email, password, _id){
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        if (_id){
            this._id = _id;
        }
    }

     userSave() {
        const userdb = getdb();
        return userdb.collection("user").insertOne(this);
    }

    static async findByEmail(email) {
        try{
            const finddb = getdb();
            return await finddb.collection("user").findOne({email: email});
        } catch(err) {
            console.log("error in find by email", err);
            throw err;
        }
    }

    static async getuseridbyemail(email) {
        const db = getdb();

        const user = await db.collection("user").findOne(
            { email: email },
            { _id: 1 }
        );
        console.log("DB result:", user);
        return user ? user._id : null;
    }

static async updatePasswordByUserId(password, id) {
    const db = getdb();

    const result = await db.collection("user").updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: password } }
    );

    return result.modifiedCount === 1;
}
}