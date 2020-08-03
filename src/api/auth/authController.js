const formatISO = require('date-fns/formatISO');
const {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken
} = require('../../helpers/validations');
const dbQuery = require('../../db/dbQuery');
const {
  errorMessage,
  successMessage,
  status
} = require('../../helpers/status');

const signUpUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const createdOn = formatISO(new Date());
  if (
    isEmpty(email) ||
    isEmpty(firstName) ||
    isEmpty(lastName) ||
    isEmpty(password)
  ) {
    errorMessage.error =
      'Email, password, first name and last name field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.error = 'Password must be more than five(5) characters';
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
      users(email, first_name, last_name, password, created_on)
      VALUES($1, $2, $3, $4, $5)
      returning *`;

  const values = [email, firstName, lastName, hashedPassword, createdOn];

  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    const { email: responseEmail, id, first_name, last_name } = dbResponse;

    const token = generateUserToken(responseEmail, id, first_name, last_name);

    successMessage.data = {
      email: responseEmail,
      id,
      firstName: first_name,
      lastName: last_name
    };
    successMessage.data.token = token;

    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'User with that EMAIL already exist';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = `${error} Operation was not successful`;
    return res.status(status.error).send(errorMessage);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const loginUserQuery = 'SELECT * FROM users WHERE email = $1';

  try {
    const { rows } = await dbQuery.query(loginUserQuery, [email]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }

    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';
      return res.status(status.bad).send(errorMessage);
    }

    const { email: responseEmail, id, first_name, last_name } = dbResponse;

    const token = generateUserToken(responseEmail, id, first_name, last_name);

    successMessage.data = {
      email: responseEmail,
      id,
      firstName: first_name,
      lastName: last_name
    };
    successMessage.data.token = token;

    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = `${error} Operation was not successful`;
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = { signUpUser, loginUser };
