// Author: Andrew Jarombek
// Date: 12/29/2017

const express = require('express');

const routes = (Artist) => {

    const artistRouter = express.Router();

    artistRouter.route('/')
        .get((req, res) => {

            Artist.find().exec()
                .then((artists) => {
                    res.format({
                        'application/json': () => {
                            res.json(artists);
                        },
                        'application/xml': () => {
                            res.render('xml/artists', {artists: artists});
                        }
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send(err);
                });
        });

    artistRouter.route('/:id')
        .get((req, res) => {

            Artist.findById(req.params.id).exec()
                .then((artist) => {
                    if (artist) {
                        res.format({
                            'application/json': () => {
                                res.json(artist);
                            },
                            'application/xml': () => {
                                res.render('xml/artist', {artist: artist});
                            }
                        });
                    } else {
                        res.status(404).send('No Artist Found with Given ID');
                    }
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

    return artistRouter;
};

module.exports = routes;