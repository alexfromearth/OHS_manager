import mongoose from "mongoose";

async function addGame(nameUser, bomSkin, herSkin, gameScore) {
  const connectionAddress = "mongodb://localhost/Boomerang";
  mongoose.connect(connectionAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.pluralize(null);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Ошибка соединения с MongoDB"));

  const Game = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    boomerangSkin: String,
    heroSkin: String,
    score: Number,
  });

  const GameModel = mongoose.model("Games", Game);

  await GameModel.create({
    name: nameUser,
    boomerangSkin: bomSkin,
    heroSkin: herSkin,
    score: gameScore,
  });

  // db.close();
}

// addGame("name", "", "", 4);

export default addGame;
