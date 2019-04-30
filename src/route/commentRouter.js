// Author: Andrew Jarombek
// Date: 12/29/2017
// Routes for the Comment REST API

const express = require('express');

const routes = (Song) => {

    const commentRouter = express.Router();

    // Allow a user to upload a new comment to a song
    commentRouter.route('/:id')
        .post((req, res) => {

            Song.findById(req.params.id).exec()
                .then((song) => {
                    if (song) {
                        song.comments.push(req.body);

                        return song.save();
                    } else {
                        throw Error('No Song Found with Given ID');
                    }
                })
                .then((song) => {
                    res.format({
                        'application/json': () => {
                            res.json(song);
                        },
                        'application/xml': () => {
                            res.render('xml/artist', {song: song});
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

    return commentRouter;
};

module.exports = routes;