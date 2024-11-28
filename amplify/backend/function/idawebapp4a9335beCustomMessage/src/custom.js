/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  console.log(event);
  const name = event.request.userAttributes.given_name;
  const code = event.request.codeParameter;

  if (
    event.triggerSource === 'CustomMessage_SignUp' ||
    event.triggerSource === 'CustomMessage_ResendCode'
  ) {
    event.response.emailSubject = `iDigital Advert - Let's confirm your account!`;
    event.response.emailMessage = `Hi ${name}, Welcome to iDigital Advert.\n Continue signing up for iDigital Advert by entering the code: ${code}.`;
  } else if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject =
      'iDigital Advert - Reset password confirmation code';
    event.response.emailMessage = `Hi ${name}, Here is your reset password confirmation code: ${code}`;
  }
  console.log(event);
  return event;
};
