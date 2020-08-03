/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = email => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = password => {
  if (password.length <= 5 || password === '') {
    return false;
  }
  return true;
};

const isEmpty = input => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  }
  return true;
};

const generateUserToken = (email, id, firstName, lastName) => {
  const token = jwt.sign(
    {
      email,
      id: id,
      first_name: firstName,
      last_name: lastName
    },
    process.env.SECRET,
    { expiresIn: '3d' }
  );

  return token;
};

module.exports = {
  isEmpty,
  isValidEmail,
  validatePassword,
  generateUserToken,
  hashPassword,
  comparePassword
};
