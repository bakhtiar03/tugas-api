exports.getUser = (req, res, next) => {
    res.send({
        message: 'ini respon api',
        nama: 'rifai',
        asal:'tegal'
    });
};