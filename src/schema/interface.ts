export default `
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
  
  type DeleteResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;
