const {
    executeQuery,
    executeMutation,
  } = require('/opt/nodejs/appQueryHelper.js');
  const queries = require('./graphql.js');
  
  async function createUser(id, email,  firstName, lastName, phoneNumber) {
    const user = await executeMutation(queries.createUser, {
      id: id,
      email: email,
      firstName : firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    });
    if (user.errors) {
      return user;
    }
    return user.data.createUser;
  }
  
  async function updateUser(id, email,  firstName, lastName, phoneNumber) {
    const user = await executeMutation(queries.updateUser, {
      id: id,
      email: email,
      firstName : firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    });
    if (user.errors) {
      return user;
    }
    return user.data.updateUser;
  }

  async function getUser(id) {
    const getUserResponse = await executeQuery(queries.getUser, {
      id: id,
    });
    if (getUserResponse.errors) {
      return user;
    }
    return getUserResponse.data.getUser;
  }

  module.exports = {
    createUser,
    updateUser,
    getUser
  };