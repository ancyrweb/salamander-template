export default `
  type Token {
    value: String!
    expire: DateTime
  }
  
  type RegisterResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }  
  
  input RegisterInput {
    emailAddress: String!
    password: String!
    name: String!
    profilePicture: String
  } 
  
  type CreateTokenResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    token: Token
    refreshToken: Token
    user: User
  }
  
  input CreateTokenFromCredentialsInput {
    emailAddress: String!
    password: String!
  }  
  
  type Query {
    getUser: User
  }
  
  type Mutation {
    register(input: RegisterInput): RegisterResponse
    createTokenFromCredentials(input: CreateTokenFromCredentialsInput): CreateTokenResponse
  }
`;
