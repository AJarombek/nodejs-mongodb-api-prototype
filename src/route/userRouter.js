// Author: Andrew Jarombek
// Date: 12/29/2017

const express = require('express');

const routes = (User) => {

    const userRouter = express.Router();

    userRouter.route('/')
        .get((req, res) => {

            User.find().exec()
                .then((users) => {
                    res.format({
                        'application/json': () => {
                            res.json(users);
                        },
                        'application/xml': () => {
                            res.render('xml/users', {users: users});
                        }
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send(err);
                });
        });

    userRouter.route('/:id')
        .get((req, res) => {

            User.findById(req.params.id).exec()
                .then((user) => {
                    if (user) {
                        res.format({
                            'application/json': () => {
                                res.json(user);
                            },
                            'application/xml': () => {
                                res.render('xml/user', {user: user});
                            }
                        });
                    } else {
                        res.status(404).send('No User Found with Given ID');
                    }
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

    return userRouter;
};

module.exports = routes;