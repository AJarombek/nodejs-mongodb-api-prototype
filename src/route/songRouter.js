const express = require('express');

const routes = (Song) => {

    const songRouter = express.Router();

    songRouter.route('/')
        .get((req, res) => {

            Song.find((err, songs) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                } else {
                    console.info(songs);
                    res.json(songs);
                }
            });
        })
        .post((req, res) => {
            const song = new Song(req.body);
            console.info(song);

            song.save();
            res.status(201).send(song);
        });

    // Middleware that will be called before handing off to the route
    songRouter.use('/:id', (req, res, next) => {
        Song.findById(req.params.id, (err, song) => {
            if (err) {
                res.status(500).send(err);
            } else if (song) {
                req.song = song;

                // Pass req along to the route() function
                next();
            } else {
                res.status(404).send('No Song Found with Given ID');
            }
        });
    });

    songRouter.route('/:id')
        .get((req, res) => {
            res.json(req.song);
        })
        .put((req, res) => {
            req.song.title = req.body.title;
            req.song.artist = req.body.artist;
            req.song.album = req.body.album;
            req.song.type = req.body.type;
            req.song.release_date = new Date(req.body.release_date);
            req.song.best_lyric = req.body.best_lyric;
            req.song.save();
            res.json(req.song);
        });

    return songRouter;
};

module.exports = routes;