const express = require('express');

function createRouter(db) {
const playerRoute = express.Router();

// Player model
//let Player = require('../database/model/Player');

// // Add Player
// playerRoute.route('/add-player').post((req, res, next) => {
//   Player.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// });

// Add Player SQL
playerRoute.post('/add-player', (req, res, data) => {
  db.query(
    'INSERT INTO players (firstName, lastName, email, password) VALUES (?,?,?,?)',
    [req.body.firstName, req.body.lastName, req.body.email, req.body.password],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

// // Get all Player
// playerRoute.route('/').get((req, res) => {
//   Player.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

// Get all Player SQL
playerRoute.get('/get-all-players', (req, res, next) => {
  db.query(
    'SELECT * FROM players',
    [10*(req.params.page || 0)],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// // Get single Player
// playerRoute.route('/read-player/:id').get((req, res) => {
//   Player.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

// Get single Player SQL
playerRoute.get('/get-player', (req, res, next) => {
  db.query(
    'SELECT discordName, rank, primaryRole, secondaryRole FROM players WHERE summoner=? ORDER BY rank LIMIT 10 OFFSET ?',
    [req.body.summoner, 10*(req.params.page || 0)],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});


// // Update Player
// playerRoute.route('/update-player/:id').put((req, res, next) => {
//   Player.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Player successfully updated!')
//     }
//   })
// })

// Update Player SQL
playerRoute.route('/update-player').put((req, res, next) => {
  db.query(
    'UPDATE players SET discordName=?, verifiedStatus=? WHERE email=?',
    [req.body.discordName, req.body.verifiedStatus, req.params.email],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

// // Delete Player
// playerRoute.route('/delete-player/:id').delete((req, res, next) => {
//   Player.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
  // })
// })

playerRoute.route('/delete-player/:email').delete((req, res, next) => {
  db.query(
    'DELETE FROM players WHERE email=?',
    [req.params.email],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

return playerRoute;
}
module.exports = createRouter;