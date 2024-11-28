/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const queries = require('./appQuery.js');

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  console.log(event);
  var email = event.request.userAttributes.email;
  var firstName = event.request.userAttributes.given_name;
  var lastName = event.request.userAttributes.family_name;
  var userId = event.userName;
  var phoneNumber = event.request.userAttributes.phone_number;
  try {
    let userResponse = await queries.getUser(userId);
    console.log(userResponse);

    if (userResponse === null) {
      let user = await queries.createUser(
        userId,
        email,
        firstName,
        lastName,
        phoneNumber
      );
      console.log('User created:', user);
    } else {
      // User exists, update the user
      let user = await queries.updateUser(
        userId,
        email,
        firstName,
        lastName,
        phoneNumber
      );
      console.log('User updated:', user);
    }
  } catch (e) {
    console.log('error::', e);
    return;
  }
  return;
};
