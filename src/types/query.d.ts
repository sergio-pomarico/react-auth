type MutationError = {
  error: Error;
  variables: unknown;
  context: unknown;
  mutation: Mutation<unknown, unknown, unknown>;
};

type QuerryError = {
  error: Error;
  query: Query<unknown, unknown, unknown>;
};
