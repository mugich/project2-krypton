const express = require("express");
const db = require("../models");

const router = express.Router();

// === HTML Routes ===
// Root Route
router.get("/", (req, res) => {
  res.render("index");
})

// View sign up form
router.get("/signup", (req, res) => {
  res.render("sign-up");
});

// View login form
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/api/signup", function(req, res) {
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function() {
     res.status(200).end();
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});
// View new game form
router.get("/games/new", (req, res) => {
  res.render("new-game");
});

// Add new game to database
router.post("/api/games/new", (req, res) => {
  console.log(req.body);
  // db.Game.create((req.body)
  //   .then((createdGame) => {
  //     res.json(createdGame);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).end();
  //   }))
  db.Game.create({
    gameTitle: req.body.gameTitle,
    playerAge: req.body.playerAge,
    published: req.body.published,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    minPlayTime: req.body.minPlayTime,
    maxPlayTime: req.body.maxPlayTime,
    gameDescription: req.body.gameDescription
  }, {
    fields: [
      "gameTitle", "playerAge", "published", "minPlayers", "maxPlayers",
      "minPlayTime", "maxPlayTime", "gameDescription"
    ]
  })
})
// === API Routes ===
// Route to render all trains to a page
router.get("/games", (req, res) => {
  db.Game.findAll()
    .then((allGames) => {
      res.render("all-games", { games: allGames });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});



module.exports = router;