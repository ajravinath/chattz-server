const {
  status,
  successMessage,
  errorMessage
} = require('../../helpers/status');
const userService = require('../../service/userService');
const getUserById = async (request, response) => {
  const userId = request.params.userId;

  try {
    const user = await userService.findUserById(userId);

    if (!user) {
      errorMessage.error = 'User with this email does not exist';
      return response.status(status.notfound).send(errorMessage);
    }

    const { email, id, first_name, last_name } = user;

    successMessage.data = {
      email,
      id,
      firstName: first_name,
      lastName: last_name
    };

    return response.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = `${error} Operation was not successful`;
    return response.status(status.error).send(errorMessage);
  }
};

module.exports = { getUserById };
