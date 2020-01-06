const Santa = require('../data/santa');

module.exports.main = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        return res.redirect(res.locals.ROOT_PATH + '/admin/view');
    }else{
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}

module.exports.GETlogin = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        return res.redirect(res.locals.ROOT_PATH + '/admin/view');
    }else{
        msg = req.flash('msg')[0];
        return res.render('admin/login', {
            msg: msg,
            csrfToken: req.csrfToken(),
        });
    }
}

module.exports.POSTlogin = (req,res,next) => {
    const username = req.body.username.toString();
    const password = req.body.password.toString();
    const {adminCredentials} = require('../data/keys');
    if (username===adminCredentials.username && password===adminCredentials.password ){
        req.session.user = {
            username : 'admin',
            isAdmin  : true
        };
        return res.redirect(res.locals.ROOT_PATH + '/admin/view');
    }else{
        req.flash('msg', 'Invalid Credentials');
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}

module.exports.logout = (req,res,next) => {
    if(!req.session.user){
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }else{
        if(delete req.session.user){
            req.flash('msg', 'You have successfully Logged Out');
            return res.redirect(res.locals.ROOT_PATH + '/admin/login');
        }else{
            console.log(err);
            return res.redirect(res.locals.ROOT_PATH + '/admin/login');
        }
    }
}

module.exports.GETaddId = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        msg = req.flash('msg')[0];
        return res.render('admin/add-id', {
            msg: msg,
            csrfToken: req.csrfToken(),
        });
    }else{
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}

module.exports.POSTaddId = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        let id = req.body.id.toString();
        Santa.create({
            id : id, 
            name : 'N/A'
        }).then(results => {
            return res.redirect(res.locals.ROOT_PATH + '/admin/view');
        }).catch(error => {
            req.flash('msg','Error adding ID');
            return res.redirect(res.locals.ROOT_PATH + '/admin/add-id');
        })
    }else{
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}

module.exports.GETremId = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        msg = req.flash('msg')[0];
        return res.render('admin/rem-id', {
            msg: msg,
            csrfToken: req.csrfToken(),
        });
    }else{
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}

module.exports.POSTremId = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        let id = req.body.id.toString();
        if( id == 'lock'){
            return res.redirect(res.locals.ROOT_PATH + '/admin/rem-id');
        }else{
            Santa.destroy({
                where : { id : id }
            }).then(results => {
                return res.redirect(res.locals.ROOT_PATH + '/admin/view');
            }).catch(error => {
                req.flash('msg','Error removing ID');
                return res.redirect(res.locals.ROOT_PATH + '/admin/rem-id');
            })
        }
    }else{
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}

module.exports.view = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        Santa.findAll().then(results => {
            let lock = results.splice(0,1)[0];
            return res.render('admin/view',{
                lock : lock,
                data : results
            })
        }).catch( error => {
            console.log(error);
            return res.send('Error Retrieving View');
        })
    }else{
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}

module.exports.turnlock = async (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin){
        let lock = await Santa.findOne({ where : { id : 'lock'} });
        if(lock.name==='true'){
            lock.name = 'false'
        }else{
            lock.name = 'true'
        }
        await lock.save();
        return res.redirect(res.locals.ROOT_PATH + '/admin/view');
    }else{
        return res.redirect(res.locals.ROOT_PATH + '/admin/login');
    }
}
