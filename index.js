// index.js
const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const {
  createPlayer,
  getAllPlayer,
  deletePlayer,
  updatePlayer,
  getPlayerById,
} = require("./operations");
app.use(express.json());

mongoose
  .connect("mongodb+srv://habibaume2424:mJ45rnkVpLKFKTdW@cluster0.akee9qv.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connection to MongoDB created");
  })
  .catch((err) => {
    console.log("Error Connecting");
    console.log(err);
  });

// Create a new player
app.post("/players", async (req, res) => {
  try {
    const { Name, scores } = req.body;
    const newPlayer = await createPlayer(Name, scores);
    res.json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all players
app.get("/players", async (req, res) => {
  try {
    const allPlayers = await getAllPlayer();
    res.json(allPlayers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a player by ID
app.get("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await getPlayerById(id);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a player by ID
app.put("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, scores } = req.body;
    const updatedPlayer = await updatePlayer(id, Name, scores);
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a player by ID
app.delete("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlayer = await deletePlayer(id);
    res.json(deletedPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});