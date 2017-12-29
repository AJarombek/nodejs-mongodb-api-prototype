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
                    res.format({
                        'application/json': () => {
                            res.json(songs);
                        },
                        'application/xml': () => {
                            res.write('<songs>\n');

                            songs.forEach((song) => {
                                let comments = "";
                                song.comments.forEach((comment) => {
                                    comments = `
                                        ${comments}
                                        <comment>
                                            <username>${comment.username}</username>
                                            <date>${comment.date}</date>
                                            <content>${comment.content}</content>
                                        </comment>
                                    `;
                                });

                                res.write(`
                                    <entry>
                                        <title>${song.title}</title>
                                        <artist>${song.artist}</artist>
                                        <album>${song.album}</album>
                                        <type>${song.type}</type>
                                        <release_date>${song.release_date}</release_date>
                                        <best_lyric>${song.best_lyric}</best_lyric>
                                        <comments>${comments}</comments>
                                    </entry>
                                `);
                            });
                            res.end('</songs>');
                        }
                    });
                }
            });
        })
        .post((req, res) => {
            const song = new Song(req.body);
            console.info(song);

            song.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).json(song);
                }
            });
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
            req.song.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.song);
                }
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

            req.song.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.song);
                }
            })
        })
        .delete((req, res) => {
            req.song.remove((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Song Removed');
                }
            })
        });

    return songRouter;
};

module.exports = routes;