
module.exports = (req,res,next) => {
    res.locals.ROOT_PATH = req.app.locals.ROOT_PATH;
    next();
}
