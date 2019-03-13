// const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data) {
    let errors = {};

    //in order to validate anything , it has to be in string format

    IsNumeric = input => {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return RE.test(input);
    };

    data.age = !isEmpty(data.age) ? data.age : '';
    data.weight = !isEmpty(data.weight) ? data.weight : '';
    data.sex = !isEmpty(data.sex) ? data.sex : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.breed = !isEmpty(data.breed) ? data.breed : '';

    if (isEmpty(data.age)) {
        errors.age = 'Age field is required';
    }
    if (!IsNumeric(data.weight)) {
        errors.weight = 'Weight field must be a number';
    }
    if (isEmpty(data.weight)) {
        errors.weight = 'Weight field is required';
    }
    if (isEmpty(data.sex)) {
        errors.sex = 'Sex field is required';
    }
    if (isEmpty(data.location)) {
        errors.location = 'Location field is required';
    }
    if (isEmpty(data.breed)) {
        errors.breed = 'Breed field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
