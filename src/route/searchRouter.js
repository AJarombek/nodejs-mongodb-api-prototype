// Author: Andrew Jarombek
// Date: 12/29/2017
// Routes for the Search REST API

const express = require('express');

const routes = (Song) => {

    const searchRouter = express.Router();

    searchRouter.route('/:query')
        .get((req, res) => {

            // Perform a text search and sort based on the text score.
            // The score is calculated by the indexes placed in the database
            Song.find({ "$text": {"$search": req.params.query}})
                .select({"score": {"$meta": "textScore"}})
                .sort({"score": {"$meta": "textScore"}}).exec()
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
                    res.status(500).send(err);
                });
        });

    return searchRouter;
};

module.exports = routes;