const PlayerModel = require("./models/model");
const createPlayer = async (Name, scores) => {
  console.log("Create Product");
  let players = new PlayerModel();
  players.Name = Name;
  players.scores = scores;
  await players.save();
  return players;
};
const updatePlayer = async (_id, Name,scores) => {
  let players = await PlayerModel.findById(_id);
  players.Name = Name;
  players.scores = scores;
  await players.save();
  return players;
};
const getAllPlayer = async () => {
  let players = await PlayerModel.find();
  return players;
};
const deletePlayer = async (_id) => {
  let players = await PlayerModel.findByIdAndDelete(_id);
  return players;
};
const getPlayerById = async (_id) => {
  let players = await PlayerModel.findById(_id);
  return players;
};
module.exports.createPlayer = createPlayer;
module.exports.getAllPlayer = getAllPlayer;
module.exports.deletePlayer = deletePlayer;
module.exports.updatePlayer = updatePlayer;
module.exports.getPlayerById = getPlayerById;