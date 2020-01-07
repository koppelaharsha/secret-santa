const Santa = require('../data/santa');
const {access_code} = require('../data/keys');

module.exports.main = (req,res,next) => {
    return res.render('index');
}

module.exports.GETsetName = (req,res,next) => { 
    return res.render('main/set-name', {
        msg: req.flash('msg')[0],
        csrfToken: req.csrfToken(),
    });
}

module.exports.POSTsetName = (req,res,next) => {
    let id = req.body.id.toString();
    let name = req.body.name.toString();
    if(id==='lock'){
        req.flash('msg', 'ID does not exists');
        return res.redirect(res.locals.ROOT_PATH + '/set-name');
    }else{
        Santa.findOne({ where: { id: 'lock'}})
        .then( lock => {
            if( lock && lock.name==='true' ){
                req.flash('msg', 'Cannot Set Name');
                return res.redirect(res.locals.ROOT_PATH + '/set-name');
            }else{
                Santa.findOne({ where: { id: id } })
                .then( data => {
                    if(!data){
                        req.flash('msg', 'ID does not exists');
                        return res.redirect(res.locals.ROOT_PATH + '/set-name');
                    }else{
                        data.name = name;
                        data.save()
                        .then( data => {
                            return res.render('main/id-name',{ data })
                        });
                    }
                })
            }})
        .catch( error => {
            req.flash('msg', 'Error setting Name');
            return res.redirect(res.locals.ROOT_PATH + '/set-name');
        });
    }
}

module.exports.GETviewName = (req,res,next) => {
    return res.render('main/view-name', {
        msg: req.flash('msg')[0],
        csrfToken: req.csrfToken(),
    });
}

module.exports.POSTviewName = (req,res,next) => {
    let id = req.body.id.toString();
    Santa.findOne({ where: { id: id } })
        .then( data => {
            if(!data){
                req.flash('msg','ID does not exists');
                return res.redirect(res.locals.ROOT_PATH + '/view-name');
            }
            return res.render('main/id-name',{ data });
        })
        .catch( error => {
            req.flash('msg', 'Error setting Name');
            return res.redirect(res.locals.ROOT_PATH + '/set-name');
        });
}

module.exports.GETviewList = (req,res,next) => {
    return res.render('main/view-list-get', {
        msg: req.flash('msg')[0],
        csrfToken: req.csrfToken(),
    });
}

module.exports.POSTviewList = (req,res,next) => {
    let code = req.body.code.toString();
    if(code === access_code){
        Santa.findAll().then( results => {
            let lock = results.splice(0,1);
            return res.render('main/view-list-post',{
                data : results
            });
        }).catch(error => {
            req.flash('msg','Error Retrieving List');
            return res.redirect(res.locals.ROOT_PATH + '/view-list')
        })
    }else{
        req.flash('msg','Incorrect Access Code');
        return res.redirect(res.locals.ROOT_PATH + '/view-list');
    }
}
