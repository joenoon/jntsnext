import { commitMutation, graphql } from 'react-relay';
import {LogoutInput, LogoutMutationResponse} from '../__generated__/LogoutMutation.graphql';

const mutation = graphql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      viewer {
        id
      }
    }
  }
  `;

let nextClientMutationId = 0;

export function logout(environment, input: LogoutInput = {}, extra = {}): Promise<{response: LogoutMutationResponse; errors: any}> {
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
