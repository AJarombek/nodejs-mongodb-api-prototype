// Author: Andrew Jarombek
// Date: 12/28/2017

const express = require('express');

const routes = (Song) => {

    const songRouter = express.Router();

    songRouter.route('/')
        .get((req, res) => {

            Song.find().exec()
                .then((songs) => {
                    res.format({
                        'application/json': () => {
                            res.json(songs);
                        },
                        'application/xml': () => {
                            res.render('xml/songs', {songs: songs});
                        }
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send(err);
                });
        })
        .post((req, res) => {
            const song = new Song(req.body);
            console.info(song);

            song.save()
                .then(() => {
                    res.format({
                    'application/json': () => {
                        res.status(201).json(song);
                    },
                    'application/xml': () => {
                        res.status(201).render('xml/song', {song: song});
                    }
                });
            }).catch((err) => {
                res.status(500).send(err);
            });
        });

    // Middleware that will be called before handing off to the route
    songRouter.use('/:id', (req, res, next) => {
        Song.findById(req.params.id).exec()
            .then((song) => {
                if (song) {
                    req.song = song;

                    // Pass req along to the route() function
                    next();
                } else {
                    res.status(404).send('No Song Found with Given ID');
                }
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    });

    songRouter.route('/:id')
        .get((req, res) => {
            res.format({
                'application/json': () => {
                    res.json(req.song);
                },
                'application/xml': () => {
                    res.render('xml/song', {song: req.song});
                }
            });
        })
        .put((req, res) => {
            req.song.title = req.body.title;
            req.song.artist = req.body.artist;
            req.song.album = req.body.album;
            req.song.type = req.body.type;
            req.song.best_lyric = req.body.best_lyric;

            // Validate that a proper date has been entered
            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            const date = req.body.release_date;

            if (dateRegex.test(date)) {
                req.song.release_date = new Date(req.body.release_date);
            }

            req.song.save()
                .then(() => {
                    res.format({
                        'application/json': () => {
                            res.json(req.song);
                        },
                        'application/xml': () => {
                            res.render('xml/song', {song: req.song});
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        })
        .patch((req, res) => {
            if (req.body._id)
                delete req.body._id;
            if (req.body.comments)
                delete req.body.comments;

            for (let item in req.body) {
                if (item === 'release_date') {
                    req.song[item] = new Date(req.body[item]);
                } else {
                    req.song[item] = req.body[item];
                }
            }

            req.song.save()
                .then(() => {
                    res.format({
                        'application/json': () => {
                            res.json(req.song);
                        },
                        'application/xml': () => {
                            res.render('xml/song', {song: req.song});
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        })
        .delete((req, res) => {
            req.song.remove()
                .then(() => {
                    res.status(204).send();
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

    return songRouter;
};

module.exports = routes;