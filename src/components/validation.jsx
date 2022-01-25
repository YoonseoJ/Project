import { hash } from 'bcryptjs';

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const NAME_REGEX = /^[a-z]+$/i;
const PASSWORD_REGEX = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;
// resource: https://stackoverflow.com/questions/2811031/decimal-or-numeric-values-in-regular-expression-validation
const POSITIVE_FRACTION_NUMBER_REGEX = /^(0|[1-9]\d*)(\.\d+)?$/;
const POSITIVE_NUMBER_REGEX = /^(0|[1-9]\d*)$/;

export function isValidEmail(email) {
    return EMAIL_REGEX.test(email);
};

export function isValidAge(age) {
    return Number.isInteger(age) && age >= 0 && age <= 150;
};

export function isValidName(name) { 
    return NAME_REGEX.test(name);
}

export function isValidPassword(password) {
    return PASSWORD_REGEX.test(password);
}

export function isValidPositiveFractionNumber(number) {
    return POSITIVE_FRACTION_NUMBER_REGEX.test(number)
}

export function isValidPositiveNumber(number) {
    return POSITIVE_NUMBER_REGEX.test(number)
}

export async function hashPassword(password) {
    const pw = await hash(password, 12);
    console.log("pass::: ", pw)
    return pw;
}

// validate error
export function ValidateError(variableName, message) {
    const error = `VALIDATE ERROR: [${variableName}] ${message}`
    // res.status(422).json({ message: `VALIDATE ERROR: [${variableName}] ${message}` });
    
    return error;
}