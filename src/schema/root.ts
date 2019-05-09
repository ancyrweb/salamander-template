export default `
  directive @authenticated on FIELD | FIELD_DEFINITION
  directive @requireRole(role: String) on FIELD | FIELD_DEFINITION
  scalar DateTime
`;
