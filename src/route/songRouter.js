// Author: Andrew Jarombek
// Date: 12/28/2017
// Routes for the Song REST API

const express = require('express');

const routes = (Song, Artist) => {

    const songRouter = express.Router();

    songRouter.route('/')
        .get((req, res) => {

            // Get all songs in the collection
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

            // Add a new song to the collection.
            song.save()
                .then(() => {

                    // If the song has an album specified, we also want to add the album and song to
                    // the artist document
                    if (song.album) {
                        Artist.findOne({'name': song.artist}).exec()
                            .then((artist) => {
                                if (!artist) {
                                    artist = new Artist();
                                    artist.name = song.artist;
                                    artist.albums = [];
                                }

                                // Check through all the artists albums for matches.  If a match is found, add
                                // the new song to this existing album
                                let albumExists = false;
                                artist.albums.forEach((album) => {

                                    if (album.title === song.album) {

                                        album.songs.push({'name': song.title, 'song_id': song._id});
                                        albumExists = true;
                                    }
                                });

                                if (!albumExists) {
                                    artist.albums.push({
                                        'title': song.album,
                                        'songs': [
                                            {'name': song.title, 'song_id': song._id}
                                        ]
                                    })
                                }

                                console.info("\n" + artist.albums);

                                return artist.save()
                            }).then(() => {
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

                    } else {
                        res.format({
                            'application/json': () => {
                                res.status(201).json(song);
                            },
                            'application/xml': () => {
                                res.status(201).render('xml/song', {song: song});
                            }
                        });
                    }

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
            // Get a single song document
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
            // Change all the fields in an existing document and update
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
            // Update only the properties specified in the http body to a document
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
            // Delete a single document
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