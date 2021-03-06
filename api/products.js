const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fs = require('fs');
const Sequelize = require('sequelize');

// Importing Operators from Sequelize
const Op = Sequelize.Op;

// Load Input Validation
const validateProductInput = require('../validations/product');

// Multer configration
const multer = require('multer');

//stategy for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //null if for err
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Only jpeg ,png or jpg are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 7, //7mb
    },
    fileFilter: fileFilter,
}).single('image');

//Get list of the products
router.get('/', (req, res) => {
    const {
        ageFrom,
        ageTo,
        weightFrom,
        weightTo,
        location,
        breed,
        pageNumber,
    } = req.query;
    let limit = 3; // number of products per page
    let offset = 0;
    Product.findAndCountAll({
        where: {
            dateOfBirth: {
                [Op.lt]: ageFrom || new Date().toISOString(),
                [Op.gt]: ageTo || new Date(-8640000000000000),
            },
            weight: {
                [Op.between]: [
                    weightFrom || 0,
                    weightTo || Number.MAX_SAFE_INTEGER,
                ],
            },
            location: {
                [Op.like]: `${location || ''}%`,
            },
            breed: {
                [Op.like]: `%${breed || ''}%`,
            },
        },
    }).then(data => {
        //Pagination logic
        let firstPageBox;
        let lastPageBox;
        let currentPage = +pageNumber ? +pageNumber : +1; // page number
        let lastPage = Math.ceil(data.count / limit); // count how many lastPage will the website have
        let hasNextPage = limit * currentPage < data.count;
        let hasPreviousPage = currentPage > 1;
        let nextPage = currentPage + 1;
        let previousPage = currentPage - 1;
        // condition rendering of the first page
        if (currentPage !== 1 && previousPage !== 1) {
            firstPageBox = true;
        } else {
            firstPageBox = false;
        }
        // condition rendering of the last page
        if (currentPage !== lastPage && nextPage !== lastPage) {
            lastPageBox = true;
        } else {
            lastPageBox = false;
        }
        offset = limit * (currentPage - 1);
        Product.findAll({
            where: {
                dateOfBirth: {
                    [Op.lt]: ageFrom || new Date().toISOString(),
                    [Op.gt]: ageTo || new Date(-8640000000000000),
                },
                weight: {
                    [Op.between]: [
                        weightFrom || 0,
                        weightTo || Number.MAX_SAFE_INTEGER,
                    ],
                },
                location: {
                    [Op.like]: `${location || ''}%`,
                },
                breed: {
                    [Op.like]: `%${breed || ''}%`,
                },
            },
            limit,
            offset,
        })
            .then(products => {
                res.json({
                    data: products,
                    currentPage: currentPage,
                    lastPage: lastPage,
                    hasNextPage: hasNextPage,
                    hasPreviousPage: hasPreviousPage,
                    nextPage: nextPage,
                    previousPage: previousPage,
                    firstPageBox: firstPageBox,
                    lastPageBox: lastPageBox,
                    ageFrom: ageFrom,
                    ageTo: ageTo,
                    weightFrom: weightFrom,
                    weightTo: weightTo,
                    location: location,
                    breed: breed,
                });
            })
            .catch(err => {
                res.status(404).json(err);
            });
    });
});

//Add a new product
router.post('/', (req, res, err) => {
    upload(req, res, err => {
        //check if the uploaded photo meets the requirements
        if (err) {
            const errors = {};
            errors.image = err.message;
            res.status(400).json(errors);
            return;
        } else {
            //check validations of the input
            const {errors, isValid} = validateProductInput(req.body);
            if (!isValid) {
                /*since multer uploades the photo immediately if it has no error , here we make
                 sure that the photo is only uploaded when there are no other input errors ,
                 otherwise we delete the uploaded photo */
                const picture = req.file ? req.file.path : '';
                if (picture.length !== 0) {
                    fs.unlinkSync(`uploads/${picture.slice(8)}`);
                }
                return res.status(400).json(errors);
            }
            //when the form passes all the checks , create a new product
            const {
                weight,
                dateOfBirth,
                sex,
                breed,
                location,
                description,
            } = req.body;
            const image = req.file ? req.file.path : '';

            Product.create({
                weight,
                dateOfBirth,
                sex,
                image,
                breed,
                location,
                description,
            })
                .then(product => res.status(200).json(product))
                .catch(err => res.status(400).json(err));
        }
    });
});

//Update a product
router.put('/', (req, res) => {
    upload(req, res, err => {
        //check if the uploaded photo meets the requirements
        if (err) {
            const errors = {};
            errors.image = err.message;
            res.status(400).json(errors);
            return;
        } else {
            //check validations for the input
            const {errors, isValid} = validateProductInput(req.body);
            if (!isValid) {
                /*since multer uploades the photo immediately if it has no error , here we make
                 sure that the photo is only uploaded when there are no other input errors ,
                 otherwise we delete the uploaded photo */
                const picture = req.file ? req.file.path : '';
                if (picture.length !== 0) {
                    fs.unlinkSync(`uploads/${picture.slice(8)}`);
                }
                return res.status(400).json(errors);
            }
            //when the form passes all the checks ,  proceed into updating the product
            const {
                id,
                weight,
                dateOfBirth,
                sex,
                breed,
                location,
                description,
            } = req.body;
            const image = req.file ? req.file.path : '';

            if (image.length !== 0) {
                //delete the prev picture from databse before updating the new pic
                Product.find({where: {id}}).then(project =>
                    fs.unlinkSync(`uploads/${project.image.slice(8)}`),
                );
            }
            Product.find({where: {id}})
                .then(project => {
                    // check if new image exists and update accordingly
                    if (image.length !== 0) {
                        project
                            .update({
                                weight,
                                dateOfBirth,
                                sex,
                                image,
                                breed,
                                location,
                                description,
                            })
                            .then(product => res.status(200).json(product))
                            .catch(err => res.status(400).json(err));
                    } else {
                        project
                            .update({
                                weight,
                                dateOfBirth,
                                sex,
                                breed,
                                location,
                                description,
                            })
                            .then(product => res.status(200).json(product))
                            .catch(err => res.status(400).json(err));
                    }
                })
                .catch(err => res.status(400).json(err));
        }
    });
});
// });

//Delete a product
router.delete('/', (req, res) => {
    const {id} = req.body;
    //delete the picture from databse before deleting the product
    Product.find({where: {id}}).then(project =>
        fs.unlinkSync(`uploads/${project.image.slice(8)}`),
    );
    Product.destroy({where: {id}})
        .then(() => res.status(200).json('product has been deleted'))
        .catch(err => res.status(404).json(err));
});

module.exports = router;
