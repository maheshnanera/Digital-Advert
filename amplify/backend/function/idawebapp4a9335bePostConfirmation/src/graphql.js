const createUser = `
  mutation createUser($id: ID!, $email: AWSEmail!, $firstName:String, $lastName: String, $phoneNumber: AWSPhone) {
   createUser(input: {id: $id, email: $email, lastName: $lastName, firstName:$firstName, phoneNumber: $phoneNumber}) {
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;

const updateUser = `
mutation updateUser($email: AWSEmail, $firstName: String, $id: ID!, $lastName: String, $phoneNumber: AWSPhone) {
  updateUser(input: {id: $id, firstName: $firstName, email: $email, lastName: $lastName, phoneNumber: $phoneNumber}) {
    id
    email
    firstName
    lastName
    phoneNumber
  }
}
`;

const getUser = `
query getUser($id: ID!) {
  getUser(id: $id) {
    id
    firstName
    email
    lastName
  }
}
`;

module.exports = {
    createUser,
    updateUser,
    getUser
  };