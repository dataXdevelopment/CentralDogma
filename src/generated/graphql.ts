import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MetaCriticScrapeTask = {
  __typename?: 'MetaCriticScrapeTask';
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMetaCriticScrapeRequest?: Maybe<ScrapeRequest>;
};


export type MutationAddMetaCriticScrapeRequestArgs = {
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  scrapeLength?: Maybe<Scalars['Int']>;
  scrapeStatus?: Maybe<ScrapeRequest>;
};


export type QueryScrapeStatusArgs = {
  id: Scalars['ID'];
};

export type ScrapeRequest = {
  __typename?: 'ScrapeRequest';
  data?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  percentage?: Maybe<Scalars['Int']>;
  returnType?: Maybe<ScrapeReturnType>;
  status?: Maybe<ScrapeStatusType>;
  task?: Maybe<MetaCriticScrapeTask>;
};

export enum ScrapeReturnType {
  CSV = 'CSV',
  JSON = 'JSON'
}

export enum ScrapeStatusType {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  scrapeStatus?: Maybe<ScrapeRequest>;
};


export type SubscriptionScrapeStatusArgs = {
  id: Scalars['ID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MetaCriticScrapeTask: ResolverTypeWrapper<MetaCriticScrapeTask>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ScrapeRequest: ResolverTypeWrapper<ScrapeRequest>;
  ScrapeReturnType: ScrapeReturnType;
  ScrapeStatusType: ScrapeStatusType;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MetaCriticScrapeTask: MetaCriticScrapeTask;
  Mutation: {};
  Query: {};
  ScrapeRequest: ScrapeRequest;
  String: Scalars['String'];
  Subscription: {};
}>;

export type MetaCriticScrapeTaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MetaCriticScrapeTask'] = ResolversParentTypes['MetaCriticScrapeTask']> = ResolversObject<{
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addMetaCriticScrapeRequest?: Resolver<Maybe<ResolversTypes['ScrapeRequest']>, ParentType, ContextType, RequireFields<MutationAddMetaCriticScrapeRequestArgs, 'url'>>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  scrapeLength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  scrapeStatus?: Resolver<Maybe<ResolversTypes['ScrapeRequest']>, ParentType, ContextType, RequireFields<QueryScrapeStatusArgs, 'id'>>;
}>;

export type ScrapeRequestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ScrapeRequest'] = ResolversParentTypes['ScrapeRequest']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  returnType?: Resolver<Maybe<ResolversTypes['ScrapeReturnType']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ScrapeStatusType']>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['MetaCriticScrapeTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  scrapeStatus?: SubscriptionResolver<Maybe<ResolversTypes['ScrapeRequest']>, "scrapeStatus", ParentType, ContextType, RequireFields<SubscriptionScrapeStatusArgs, 'id'>>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  MetaCriticScrapeTask?: MetaCriticScrapeTaskResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScrapeRequest?: ScrapeRequestResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
}>;

