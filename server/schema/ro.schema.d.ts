/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';

export type Resolver<Result, Args = any> = (parent: any, args: Args, context: any, info: GraphQLResolveInfo) => Promise<Result> | Result;

/** An object with an ID */
export interface Node {
  id: string /** The id of the object. */;
}

export interface Query {
  node?: Node | null /** Fetches an object given its ID */;
  viewer: Viewer;
}

export interface Viewer extends Node {
  id: string /** The ID of an object */;
  me?: Account | null;
  name?: string | null;
  email?: string | null;
  project?: Project | null;
  myProjects: ProjectConnection;
  otherProjects: ProjectConnection;
}

export interface Account extends Node {
  id: string /** The ID of an object */;
  extid: string;
  name?: string | null;
  email?: string | null;
  user?: User | null;
}

export interface User extends Node {
  id: string /** The ID of an object */;
  name?: string | null;
  about?: string | null;
  username?: string | null;
}

export interface Project extends Node {
  id: string /** The ID of an object */;
  name?: string | null;
}
/** A connection to a list of items. */
export interface ProjectConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges?: ProjectEdge[] | null /** A list of edges. */;
  totalCount: number;
}
/** Information about pagination in a connection. */
export interface PageInfo {
  hasNextPage: boolean /** When paginating forwards, are there more items? */;
  hasPreviousPage: boolean /** When paginating backwards, are there more items? */;
  startCursor?: string | null /** When paginating backwards, the cursor to continue. */;
  endCursor?: string | null /** When paginating forwards, the cursor to continue. */;
}
/** An edge in a connection. */
export interface ProjectEdge {
  node?: Project | null /** The item at the end of the edge */;
  cursor: string /** A cursor for use in pagination */;
}

export interface Mutation {
  createProject?: CreateProjectPayload | null;
  loginWithToken?: LoginWithTokenPayload | null;
  logout?: LogoutPayload | null;
  requestCode?: RequestCodePayload | null;
  requestToken?: RequestTokenPayload | null;
}

export interface CreateProjectPayload {
  viewer: Viewer;
  project?: Project | null;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface LoginWithTokenPayload {
  viewer: Viewer;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface LogoutPayload {
  viewer: Viewer;
  clientMutationId?: string | null;
}

export interface RequestCodePayload {
  code_token?: string | null;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface RequestTokenPayload {
  auth_token?: string | null;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface CreateProjectInput {
  name: string;
  clientMutationId?: string | null;
}

export interface LoginWithTokenInput {
  auth_token: string;
  clientMutationId?: string | null;
}

export interface LogoutInput {
  clientMutationId?: string | null;
}

export interface RequestCodeInput {
  email?: string | null;
  clientMutationId?: string | null;
}

export interface RequestTokenInput {
  code_token?: string | null;
  code?: string | null;
  clientMutationId?: string | null;
}
export interface NodeQueryArgs {
  id: string /** The ID of an object */;
}
export interface ProjectViewerArgs {
  id: string;
}
export interface MyProjectsViewerArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface OtherProjectsViewerArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface CreateProjectMutationArgs {
  input: CreateProjectInput;
}
export interface LoginWithTokenMutationArgs {
  input: LoginWithTokenInput;
}
export interface LogoutMutationArgs {
  input: LogoutInput;
}
export interface RequestCodeMutationArgs {
  input: RequestCodeInput;
}
export interface RequestTokenMutationArgs {
  input: RequestTokenInput;
}

export interface QueryResolvers {
  node?: QueryNodeResolver /** Fetches an object given its ID */;
  viewer?: QueryViewerResolver;
}

export type QueryNodeResolver<R = Node | null> = Resolver<R>;
export interface QueryNodeArgs {
  id: string /** The ID of an object */;
}

export type QueryViewerResolver<R = Viewer> = Resolver<R>;
export interface ViewerResolvers {
  id?: ViewerIdResolver /** The ID of an object */;
  me?: ViewerMeResolver;
  name?: ViewerNameResolver;
  email?: ViewerEmailResolver;
  project?: ViewerProjectResolver;
  myProjects?: ViewerMyProjectsResolver;
  otherProjects?: ViewerOtherProjectsResolver;
}

export type ViewerIdResolver<R = string> = Resolver<R>;
export type ViewerMeResolver<R = Account | null> = Resolver<R>;
export type ViewerNameResolver<R = string | null> = Resolver<R>;
export type ViewerEmailResolver<R = string | null> = Resolver<R>;
export type ViewerProjectResolver<R = Project | null> = Resolver<R>;
export interface ViewerProjectArgs {
  id: string;
}

export type ViewerMyProjectsResolver<R = ProjectConnection> = Resolver<R>;
export interface ViewerMyProjectsArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}

export type ViewerOtherProjectsResolver<R = ProjectConnection> = Resolver<R>;
export interface ViewerOtherProjectsArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}

export interface AccountResolvers {
  id?: AccountIdResolver /** The ID of an object */;
  extid?: AccountExtidResolver;
  name?: AccountNameResolver;
  email?: AccountEmailResolver;
  user?: AccountUserResolver;
}

export type AccountIdResolver<R = string> = Resolver<R>;
export type AccountExtidResolver<R = string> = Resolver<R>;
export type AccountNameResolver<R = string | null> = Resolver<R>;
export type AccountEmailResolver<R = string | null> = Resolver<R>;
export type AccountUserResolver<R = User | null> = Resolver<R>;
export interface UserResolvers {
  id?: UserIdResolver /** The ID of an object */;
  name?: UserNameResolver;
  about?: UserAboutResolver;
  username?: UserUsernameResolver;
}

export type UserIdResolver<R = string> = Resolver<R>;
export type UserNameResolver<R = string | null> = Resolver<R>;
export type UserAboutResolver<R = string | null> = Resolver<R>;
export type UserUsernameResolver<R = string | null> = Resolver<R>;
export interface ProjectResolvers {
  id?: ProjectIdResolver /** The ID of an object */;
  name?: ProjectNameResolver;
}

export type ProjectIdResolver<R = string> = Resolver<R>;
export type ProjectNameResolver<R = string | null> = Resolver<R>; /** A connection to a list of items. */
export interface ProjectConnectionResolvers {
  pageInfo?: ProjectConnectionPageInfoResolver /** Information to aid in pagination. */;
  edges?: ProjectConnectionEdgesResolver /** A list of edges. */;
  totalCount?: ProjectConnectionTotalCountResolver;
}

export type ProjectConnectionPageInfoResolver<R = PageInfo> = Resolver<R>;
export type ProjectConnectionEdgesResolver<R = ProjectEdge[] | null> = Resolver<R>;
export type ProjectConnectionTotalCountResolver<R = number> = Resolver<R>; /** Information about pagination in a connection. */
export interface PageInfoResolvers {
  hasNextPage?: PageInfoHasNextPageResolver /** When paginating forwards, are there more items? */;
  hasPreviousPage?: PageInfoHasPreviousPageResolver /** When paginating backwards, are there more items? */;
  startCursor?: PageInfoStartCursorResolver /** When paginating backwards, the cursor to continue. */;
  endCursor?: PageInfoEndCursorResolver /** When paginating forwards, the cursor to continue. */;
}

export type PageInfoHasNextPageResolver<R = boolean> = Resolver<R>;
export type PageInfoHasPreviousPageResolver<R = boolean> = Resolver<R>;
export type PageInfoStartCursorResolver<R = string | null> = Resolver<R>;
export type PageInfoEndCursorResolver<R = string | null> = Resolver<R>; /** An edge in a connection. */
export interface ProjectEdgeResolvers {
  node?: ProjectEdgeNodeResolver /** The item at the end of the edge */;
  cursor?: ProjectEdgeCursorResolver /** A cursor for use in pagination */;
}

export type ProjectEdgeNodeResolver<R = Project | null> = Resolver<R>;
export type ProjectEdgeCursorResolver<R = string> = Resolver<R>;
export interface MutationResolvers {
  createProject?: MutationCreateProjectResolver;
  loginWithToken?: MutationLoginWithTokenResolver;
  logout?: MutationLogoutResolver;
  requestCode?: MutationRequestCodeResolver;
  requestToken?: MutationRequestTokenResolver;
}

export type MutationCreateProjectResolver<R = CreateProjectPayload | null> = Resolver<R>;
export interface MutationCreateProjectArgs {
  input: CreateProjectInput;
}

export type MutationLoginWithTokenResolver<R = LoginWithTokenPayload | null> = Resolver<R>;
export interface MutationLoginWithTokenArgs {
  input: LoginWithTokenInput;
}

export type MutationLogoutResolver<R = LogoutPayload | null> = Resolver<R>;
export interface MutationLogoutArgs {
  input: LogoutInput;
}

export type MutationRequestCodeResolver<R = RequestCodePayload | null> = Resolver<R>;
export interface MutationRequestCodeArgs {
  input: RequestCodeInput;
}

export type MutationRequestTokenResolver<R = RequestTokenPayload | null> = Resolver<R>;
export interface MutationRequestTokenArgs {
  input: RequestTokenInput;
}

export interface CreateProjectPayloadResolvers {
  viewer?: CreateProjectPayloadViewerResolver;
  project?: CreateProjectPayloadProjectResolver;
  errors?: CreateProjectPayloadErrorsResolver;
  clientMutationId?: CreateProjectPayloadClientMutationIdResolver;
}

export type CreateProjectPayloadViewerResolver<R = Viewer> = Resolver<R>;
export type CreateProjectPayloadProjectResolver<R = Project | null> = Resolver<R>;
export type CreateProjectPayloadErrorsResolver<R = string | null> = Resolver<R>;
export type CreateProjectPayloadClientMutationIdResolver<R = string | null> = Resolver<R>;
export interface LoginWithTokenPayloadResolvers {
  viewer?: LoginWithTokenPayloadViewerResolver;
  errors?: LoginWithTokenPayloadErrorsResolver;
  clientMutationId?: LoginWithTokenPayloadClientMutationIdResolver;
}

export type LoginWithTokenPayloadViewerResolver<R = Viewer> = Resolver<R>;
export type LoginWithTokenPayloadErrorsResolver<R = string | null> = Resolver<R>;
export type LoginWithTokenPayloadClientMutationIdResolver<R = string | null> = Resolver<R>;
export interface LogoutPayloadResolvers {
  viewer?: LogoutPayloadViewerResolver;
  clientMutationId?: LogoutPayloadClientMutationIdResolver;
}

export type LogoutPayloadViewerResolver<R = Viewer> = Resolver<R>;
export type LogoutPayloadClientMutationIdResolver<R = string | null> = Resolver<R>;
export interface RequestCodePayloadResolvers {
  code_token?: RequestCodePayloadCodeTokenResolver;
  errors?: RequestCodePayloadErrorsResolver;
  clientMutationId?: RequestCodePayloadClientMutationIdResolver;
}

export type RequestCodePayloadCodeTokenResolver<R = string | null> = Resolver<R>;
export type RequestCodePayloadErrorsResolver<R = string | null> = Resolver<R>;
export type RequestCodePayloadClientMutationIdResolver<R = string | null> = Resolver<R>;
export interface RequestTokenPayloadResolvers {
  auth_token?: RequestTokenPayloadAuthTokenResolver;
  errors?: RequestTokenPayloadErrorsResolver;
  clientMutationId?: RequestTokenPayloadClientMutationIdResolver;
}

export type RequestTokenPayloadAuthTokenResolver<R = string | null> = Resolver<R>;
export type RequestTokenPayloadErrorsResolver<R = string | null> = Resolver<R>;
export type RequestTokenPayloadClientMutationIdResolver<R = string | null> = Resolver<R>;
