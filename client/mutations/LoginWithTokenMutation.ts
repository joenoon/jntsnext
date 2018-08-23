import { commitMutation, graphql } from 'react-relay';
import {LoginWithTokenInput, LoginWithTokenMutationResponse} from '../__generated__/LoginWithTokenMutation.graphql';

const mutation = graphql`
  mutation LoginWithTokenMutation($input: LoginWithTokenInput!) {
    loginWithToken(input: $input) {
      errors
      viewer {
        id
        email
        name
      }
    }
  }
  `;

let nextClientMutationId = 0;

export function loginWithToken(environment, input: LoginWithTokenInput, extra = {}): Promise<{response: LoginWithTokenMutationResponse; errors: any}> {
  const clientMutationId = nextClientMutationId++;
  return new Promise((resolve, reject) => {

    commitMutation(environment, {
      mutation,
      variables: {
        input: { ...input, clientMutationId },
      },
      onCompleted(response, errors) {
        resolve({response, errors});
      },
      onError(error) {
        reject(error);
      },
      ...extra,
    });

  });
}
