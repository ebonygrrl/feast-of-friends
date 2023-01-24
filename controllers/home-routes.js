const router = require('express').Router();
//const { Home } = require('../controllers/');
const withAuth = require('../utils/auth');
const { Combo, Dish, Event, User } = require('../models');
const Op = require('sequelize').Op

//PDF generation food label
//Required package
const pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require("path");
const { options } = require('../utils/pdfoptions');

//HOMEPAGE
// only show welcome message on home page
router.get('/', async (req, res) => {
    const bodyClass = req.path;
    const userName = req.session.userName;
    res.render('homepage', { bodyClass, userName, loggedIn: req.session.loggedIn });
});

//SIGNUP PAGE
// sign up route
router.get('/signup', (req, res) => {
    res.render('signup');
});

//LOGIN PAGE
// // login route
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the dashboard
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('authentication', { whichPartial: function () { return 'login' } });
});


//CREATE EVENT PAGE
//create potluck route
router.get('/create', withAuth, (req, res) => {
    res.render('create-event', {loggedIn: req.session.loggedIn, userName: req.session.userName});


});

//EDIT EVENT LANDING PAGE
router.get('/edit/:id', withAuth, async (req, res) => {
    //get the event from database
    const editData = Event.findOne({
        where: { id: req.params.id },
    }).then(data => {
        const event = data.get({ plain: true });
        //check
        console.log('line 54 ', event);
        //render it to the edit page
        res.render('edit-event', { event, loggedIn: req.session.loggedIn, userName: req.session.userName });
    });
});

//LOGOUT PAGE
// logout route - WORKS!
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


//EVENT PAGE
//shows the event when user redirected to event page
//need to make sure user is member of this event
router.get('/event/:id', withAuth, async (req, res) => {
    //get event info from database

    try {
        //   get data from database
        const eventData = await Event.findOne({
            where: { id: req.params.id },
            attributes: [
                'id',
                'theme',
                'eventDate',
                'where',
                'organizer',
            ],
            include: [{
                model: Combo,
                include: [{
                    model: User,
                    attributes: ['allergy'],
                }],

            }, User],
        });
        //find dishes committed to the event
        const comboData = await Combo.findAll({
            where: { eventID: req.params.id, dishID: { [Op.ne]: null } },
            include: [{
                model: Dish,
                include: User
            }]
        });

        //find number of attendees to event
        const attendance = await Combo.count({
            where: {
                eventID: req.params.id
            },
        });

        //check is organizer of event is the currentUser
        const isOrganizer = (req.session.userID == eventData.organizer) ? true : false;

        let isAttendee = false;

        //if data is empty
        //render dashboard with no Events
        if (eventData.length == 0) {
            console.log('line 38 event-routes')
            res.redirect('/dashboard')
        } else {
            const event = eventData.get({ plain: true });

            //if combo data empty
            if (comboData.length == 0) {
                var dishes = [];
            }
            else {
                var dishes = comboData.map(dish => dish.get({ plain: true }));
            };

            console.log('line 144 in home-routes', event);

            //check if user is attendee of event
            //loop through combos

            for (let m = 0, k = event.combos.length; m < k; m++) {
                console.log('line 137 at home-routes', event.combos[m].userID);
                //if user is found in combo data then user rsvped
                if (event.combos[m].userID == req.session.userID) {
                    isAttendee = true;
                }
            };


            //ALLERGEN PROFILE
            //parse through separated by commas, allergy is a string
            //count allergen
            //initialize variables
            let eggs = 0;
            let dairy = 0;
            let peanuts = 0;
            let treeNuts = 0;
            let fish = 0;
            let shellfish = 0;
            let gluten = 0;
            let soy = 0;
            let sesame = 0;
            let noAllergy = 0;

            console.log('line 147 in home-routes');

            for (let j = 0, l = event.combos.length; j < l; j++) {
                //create temp array to go through allergens
                let allergen = event.combos[j].user.allergy;
                // console.log(event.combos[j].user.allergy);
                if (allergen) {
                    let allergenArray = allergen.split(',');
                    console.log('line 155', allergenArray);
                    //go trough array
                    for (let m = 0; m < allergenArray.length; m++) {
                        let allergenHolder = allergenArray[m].toLowerCase();
                        if (allergenHolder == 'eggs') { eggs++; };
                        if (allergenHolder == 'milk/dairy') { dairy++; };
                        if (allergenHolder == 'peanuts') { peanuts++; };
                        if (allergenHolder == 'tree nuts') { treeNuts++; };
                        if (allergenHolder == 'fish') { fish++; };
                        if (allergenHolder == 'shellfish') { shellfish++; };
                        if (allergenHolder == 'wheat') { gluten++; };
                        if (allergenHolder == 'soy') { soy++; };
                        if (allergenHolder == 'sesame') { sesame++; };
                    }
                }
                else { //null
                    console.log('line 171', allergen);
                    noAllergy++;
                };
            };

            console.log('line 176 in home-routes');

            //create array of strings to pass to handlebars
            let allergenSummary = [];
            if (eggs > 0) {
                eggs = Math.round((eggs / attendance) * 100) + '%';
                allergenSummary.push(`Eggs ${eggs} of attendee`);
            };
            if (dairy > 0) {
                dairy = Math.round((dairy / attendance) * 100) + '%';
                allergenSummary.push(`Dairy/Milk ${dairy} of attendee`);
            };
            if (peanuts > 0) {
                peanuts = Math.round((peanuts / attendance) * 100) + '%';
                allergenSummary.push(`Peanuts ${peanuts} of attendee`);
            };
            if (treeNuts > 0) {
                treeNuts = Math.round((treeNuts / attendance) * 100) + '%';
                allergenSummary.push(`Tree Nuts ${treeNuts} of attendee`);
            };
            if (fish > 0) {
                fish = Math.round((fish / attendance) * 100) + '%';
                allergenSummary.push(`Fish ${fish} of attendee`);
            };
            if (shellfish > 0) {
                shellfish = Math.round((shellfish / attendance) * 100) + '%';
                allergenSummary.push(`Shellfish ${shellfish} of attendee`);
            };
            if (gluten > 0) {
                gluten = Math.round((gluten / attendance) * 100) + '%';
                allergenSummary.push(`Gluten ${gluten} of attendee`);
            };
            if (soy > 0) {
                soy = Math.round((soy / attendance) * 100) + '%';
                allergenSummary.push(`Soy ${soy} of attendee`);
            };
            if (sesame > 0) {
                sesame = Math.round((sesame / attendance) * 100) + '%';
                allergenSummary.push(`Sesame ${sesame} of attendee`);
            };
            if (noAllergy > 0) {
                noAllergy = Math.round((noAllergy / attendance) * 100) + '%';
                allergenSummary.push(`No indicated allergy ${noAllergy} of attendee`);
            };
            console.log('line 190 allergen summary', allergenSummary);
            //POTLUCK PROFILE
            //count dishtypes from combo data
            let appetizer = 0;
            let entree = 0;
            let sides = 0;
            let dessert = 0;

            //loop through combo data and count the instances
            for (let i = 0; i < dishes.length; i++) {
                let dishType = dishes[i].dish.dishtype;
                if (dishType === 'appetizer') {
                    appetizer++;
                };
                if (dishType === 'entree') {
                    entree++;
                };
                if (dishType === 'side') {
                    sides++;
                };
                if (dishType === 'dessert') {
                    dessert++;
                };
            };

            //create array of objects to pass to handlebars
            let dishSummary = [`appetizer: ${appetizer}`, `entree: ${entree}`, `sides: ${sides}`, `dessert: ${dessert}`];

            console.log('line 196 in home-routes');

            res.render('event', { event, dishes, loggedIn: req.session.loggedIn, userName: req.session.userName, data: attendance, dishSummary, allergenSummary, isOrganizer, isAttendee });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//DASHBOARD PAGE
//route for viewing dashboard and one's own posts
router.get('/dashboard', withAuth, async (req, res) => {

    try {
        const user_id = req.session.userID;

        // user personalized dashboard
        const user = await User.findByPk(user_id, { raw: true });
        const fullName = `${user.firstName} ${user.lastName}`;
        const userInfo = {
            allergy: user.allergy,
            fdish: user.fdish
        }

        const result = await Event.findAll({
            where: { organizer: user_id },
            attributes: [
                'id',
                'theme',
                'eventDate',
                'where',
                'organizer'
            ],
            include: User,
        });

        //find data of events where user is part of
        const result2 = await Combo.findAll({
            where: { userID: user_id },
            include: [{
                model: Event,
                include: User
            }]
        });


        //if data is empty
        //render dashboard with no Events
        if (result.length == 0 && result2.length == 0) {
            console.log('line 45 dashboard-routes')
            res.render('dashboard', { loggedIn: req.session.loggedIn, userName: req.session.userName, avatar: user.avatar, name: fullName, userInfo });
        }
        //dashboard with organized potluck but not rsvped to any
        else if (result.length && result2.length == 0) {
            const event1 = result.map(event => event.get({ plain: true }));
            res.render('dashboard', { event1, loggedIn: req.session.loggedIn, userName: req.session.userName, avatar: user.avatar, name: fullName, userInfo });

        }
        //dashboard with one rsvped to potluck but not organized event
        else if (result.length == 0 && result2.length) {
            const event2 = result2.map(event => event.get({ plain: true }));
            res.render('dashboard', { event2, loggedIn: req.session.loggedIn, userName: req.session.userName, avatar: user.avatar, name: fullName, userInfo });

        } //dashboard with both organized and rsvped events
        else {
            const event1 = result.map(event => event.get({ plain: true }));
            const event2 = result2.map(event => event.get({ plain: true }));
            const view = JSON.stringify(result);
            const view2 = JSON.stringify(result2);
            //check
            console.log('line 51 at dashboardRoutes ', view, view2);

            //toDo withAut 1/13: 
            // res.render('dashboard', {events, loggedIn: req.session.loggedIn});
            res.render('dashboard', { event1, event2, loggedIn: req.session.loggedIn, userName: req.session.userName, avatar: user.avatar, name: fullName, userInfo});

            res.status(200);
        }


    } catch (err) {
        res.status(500).json(err);
    }

});

// get dish  
router.get('/dish', (req, res) => {

    res.render('authentication', { whichPartial: function () { return 'dish-form' } });
});


//PRINT PDF FOR FOOD LABEL
router.get('/download/:id', withAuth, async (req, res) => {

    const html = fs.readFileSync(path.join(__dirname, '../views/food-label-template.html'), 'utf-8');
    const filename = req.params.id + '_doc' + '.pdf';
    const eventID= req.params.id;

    console.log("LINE 394 HOME-ROUTES PDF PRINT");

    //get dishes info through combo
    const comboData = await Combo.findAll({
        where: { eventID: req.params.id, dishID: { [Op.ne]: null } },
        include: [{
            model: Dish,
            include: User
        }]
    });

    console.log("LINE 405 HOME-ROUTES PDF PRINT");

    if (comboData.length == 0) {
        var dishes = [];
    } else {
        var dishes = comboData.map(dish => dish.get({ plain: true }));
    };

    console.log("LINE 413 HOME-ROUTES PDF PRINT",dishes);
    res.render('label',{dishes, eventID, loggedIn: req.session.loggedIn, userName: req.session.userName});

});



module.exports = router;
