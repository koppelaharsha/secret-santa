
module.exports = (req,res,next) => {
    res.locals.ROOT_PATH = req.app.locals.ROOT_PATH;
    res.setHeader('Content-Security-Policy', "script-src 'self' https://cdnjs.cloudflare.com");
    next();
}
