/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type LoginWithTokenInput = {
    readonly auth_token: string;
    readonly clientMutationId?: string | null;
};
export type LoginWithTokenMutationVariables = {
    readonly input: LoginWithTokenInput;
};
export type LoginWithTokenMutationResponse = {
    readonly loginWithToken: ({
        readonly errors: string | null;
        readonly viewer: {
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
        };
    }) | null;
};



/*
mutation LoginWithTokenMutation(
  $input: LoginWithTokenInput!
) {
  loginWithToken(input: $input) {
    errors
    viewer {
      id
      email
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "LoginWithTokenInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "loginWithToken",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "LoginWithTokenInput!"
      }
    ],
    "concreteType": "LoginWithTokenPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "errors",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "LoginWithTokenMutation",
  "id": null,
  "text": "mutation LoginWithTokenMutation(\n  $input: LoginWithTokenInput!\n) {\n  loginWithToken(input: $input) {\n    errors\n    viewer {\n      id\n      email\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "LoginWithTokenMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "LoginWithTokenMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'b1c06723fa4f6a83461590e7d7539f62';
export default node;
