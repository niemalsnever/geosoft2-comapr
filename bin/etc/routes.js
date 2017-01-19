/**
 * Created by niems on 2016-12-19.
 */


    app.use(express.static('web'));

    app.post('/login', passport.authenticate('local',
        { successRedirect: '/good-login',
        failureRedirect: '/bad-login' }))


