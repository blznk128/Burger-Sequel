var db = require("../models");
var Burger = db.Burger;

module.exports = function(app) {
    app.get("/", function(req, res) {
        var object = {};
        Burger.findAll({
            where: {
                devoured: false
            }
        }).then(function(result) {
            object.uneatenBurgers = result;
            return;
        }).then(function() {
            return Burger.findAll({
                where: {
                    devoured: true
                }
            });
        }).then(function(result) {
            object.eatenBurgers = result;
            return;
        }).then(function() {
            res.render('index', {
                uneatenBurgers: object.uneatenBurgers,
                eatenBurgers: object.eatenBurgers
            });
        });
    });

    app.get('/api/burgers', function(req, res) {
        Burger.findAll({}).then(function(result) {
            res.json(result);
        });
    });

    app.post('/', function(req, res) {
        var newBurger = req.body.burger;

        if (newBurger === '') {
            res.redirect('/');
            return
        }

        Burger.create({
            burger_name: newBurger
        }).then(function() {
            res.redirect('/')
        });
    });

    app.get('/api/burgers/:id', function(req, res) {
        Burger.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        });
    });

    app.put('/:id', function(req,res) {
        Burger.update({
            devoured: true
        }, {
            where: {
                id: req.params.id
            }
        }).then(function() {
            res.redirect('/')
        });
    });
};