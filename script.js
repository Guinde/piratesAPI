const data = require('./listPirates.json');
const Pirate = require('./database/models/pirate.model');
const mongoose = require("mongoose");
const env = require(`./environment/development`);

const AddPiratesOnDataBase = async () => {
    const pirates = data.pirates;
    for(const p in pirates) {
        try {
            const newPirate = new Pirate({
                name: pirates[p].name,
                age : pirates[p].age, 
                status: pirates[p].status
            });
            await newPirate.save();
        } catch(e) {
            throw new Error(e.message);
        }
    }
    console.log('add list pirates success')
    process.exit(1);
}

const mongoDB = env.dbURl;
try {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Connect to the database");
  AddPiratesOnDataBase();
} catch (e) {
  console.error("Connection fail ! => " + e);
}

