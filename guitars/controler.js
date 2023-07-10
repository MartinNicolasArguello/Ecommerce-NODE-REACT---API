const Guitar = require("./model");

const getAll = (req, res, next) => {
    Guitar.find().then((data) => {
        !data.length
            ? next()
            : res.status(200).json(data)
    }).catch(error => {
        error.status = 500
        next(error);
    })
};

const searchGuitar = async (req, res, next) => {

    try {
        // const page = parseInt(req.query.page) -1 || 0;
        // const limit = parseInt(req.query.limit) || 5;
        let type = req.query.type || null
        let brand = req.query.brand || null
        let price = req.query.price || null

        if (!type && !brand && !price) {
            res.redirect('/all')
        }

        else {

            let types
            let brands
            let prices

            type ? types = type.split(',') : types = ['electric', 'acoustic', 'semi-acoustic', 'classic']
            brand ? brands = brand.split(',') : brands = ['Fender', 'Gibson', 'Schecter', 'Jackson']
            price ? prices = price.split(',') : prices = ['a', 'b', 'c', 'd']

            console.log('TYPES', types)
            console.log('BRANDS', brands)

            const result = await Guitar.find({ type: { $in: types }, brand: { $in: brands }, priceRange: { $in: prices } })
            res.status(200).json(result);
        }

    }

    catch (error) {
        error.status = 500
        next(error);
    }


    // const { query } = req.params;
    // Guitar.find({ $text: { $search: query } }, (err, result) => {
    //     if (err) {
    //         return next()
    //     };
    //     return res.status(200).json({ result })
    // })
};

const addGuitar = async (req, res, next) => {

    const setPriceRange = (price) => {
        if (price < 599) {
            return 'a'
        }
        if (price > 599 && price < 1599) {
            return 'b'
        }
        if (price > 1599 && price < 2599) {
            return 'c'
        }
        else {
            return 'd'
        }
    }

    const newGuitar = Guitar(req.body);
    newGuitar.priceRange = setPriceRange(newGuitar.price)
    newGuitar.save((error, result) => {
        if (error) {
            error.status = 400
            next(error)
        }
        else {
            res.status(200).json(newGuitar)
        }
    })
};

const delGuitar = async (req, res, next) => {

    try {
        const guitarName = req.params.name
        const deletedGuitar = await Guitar.findOneAndDelete({ name: guitarName })
        res.status(200).json(deletedGuitar)

    }
    catch (error) {
        next(error)
    }

}


module.exports = { getAll, searchGuitar, addGuitar, delGuitar };