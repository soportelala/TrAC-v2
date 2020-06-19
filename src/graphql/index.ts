import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, any>;
};

export type AuthResult = {
  error?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type BandColor = {
  color: Scalars["String"];
  max: Scalars["Float"];
  min: Scalars["Float"];
};

export type Course = {
  bandColors: Array<BandColor>;
  code: Scalars["String"];
  credits: Array<Credit>;
  flow: Array<Course>;
  historicalDistribution: Array<DistributionValue>;
  /** Course-Semester-Curriculum-Program ID */
  id: Scalars["Int"];
  mention: Scalars["String"];
  name: Scalars["String"];
  requisites: Array<Course>;
};

export type Credit = {
  label: Scalars["String"];
  value: Scalars["Int"];
};

export type Curriculum = {
  id: Scalars["String"];
  semesters: Array<Semester>;
};

export type DistributionValue = {
  label: Scalars["String"];
  value: Scalars["Int"];
};

export type Dropout = {
  active: Scalars["Boolean"];
  explanation?: Maybe<Scalars["String"]>;
  model_accuracy?: Maybe<Scalars["Float"]>;
  prob_dropout?: Maybe<Scalars["Float"]>;
};

export type FeedbackAnswer = {
  answer: Scalars["String"];
  question: FeedbackQuestion;
};

export type FeedbackAnswerInput = {
  form: Scalars["Int"];
  questions: Array<FeedbackAnswerQuestionInput>;
};

export type FeedbackAnswerQuestionInput = {
  answer: Scalars["String"];
  question: Scalars["Int"];
};

export type FeedbackForm = {
  id: Scalars["Int"];
  name: Scalars["String"];
  priority: Scalars["Int"];
  questions: Array<FeedbackQuestion>;
};

export type FeedbackQuestion = {
  id: Scalars["Int"];
  options: Array<FeedbackQuestionOption>;
  priority: Scalars["Int"];
  question: Scalars["String"];
  type: FeedbackQuestionType;
};

export type FeedbackQuestionOption = {
  text: Scalars["String"];
  value: Scalars["Int"];
};

export type FeedbackQuestionOptionInput = {
  text: Scalars["String"];
  value: Scalars["Int"];
};

/** Type of question in a feedback form */
export enum FeedbackQuestionType {
  MultipleAnswer = "MultipleAnswer",
  OpenText = "OpenText",
  SingleAnswer = "SingleAnswer",
}

export type FeedbackResult = {
  answers: Array<FeedbackAnswer>;
  form: FeedbackForm;
  timestamp: Scalars["DateTime"];
  user: User;
};

export type IndirectTakeCourse = {
  course: Course;
  requisitesUnmet: Array<Scalars["String"]>;
};

export type LockedUserResult = {
  mailResult: Scalars["JSONObject"];
  users: Array<User>;
};

export type MultipleLockedUserResult = {
  mailResults: Array<Scalars["JSONObject"]>;
  users: Array<User>;
};

export type Mutation = {
  addUsersPrograms: Array<User>;
  answerFeedbackForm: Scalars["Boolean"];
  deleteUser: Array<User>;
  directTakeCourses: Array<Course>;
  editConfig: Scalars["JSONObject"];
  feedbackResultsCsv: Scalars["String"];
  indirectTakeCourses: Array<IndirectTakeCourse>;
  lockMailUser: LockedUserResult;
  login: AuthResult;
  logout: Scalars["Boolean"];
  mailAllLockedUsers: Array<Scalars["JSONObject"]>;
  performanceLoadAdvices: Array<PerformanceByLoad>;
  program: Program;
  resetDataLoadersCache: Scalars["Int"];
  resetPersistence: Scalars["Int"];
  setPersistenceValue: Persistence;
  student?: Maybe<Student>;
  track: Scalars["Boolean"];
  unlock: AuthResult;
  updateUserPrograms: Array<User>;
  upsertUsers: Array<User>;
};

export type MutationAddUsersProgramsArgs = {
  user_programs: Array<UserProgram>;
};

export type MutationAnswerFeedbackFormArgs = {
  answer: FeedbackAnswerInput;
};

export type MutationDeleteUserArgs = {
  email: Scalars["EmailAddress"];
};

export type MutationDirectTakeCoursesArgs = {
  program_id?: Maybe<Scalars["String"]>;
  student_id?: Maybe<Scalars["String"]>;
};

export type MutationEditConfigArgs = {
  name: Scalars["String"];
  value: Scalars["String"];
};

export type MutationIndirectTakeCoursesArgs = {
  program_id?: Maybe<Scalars["String"]>;
  student_id?: Maybe<Scalars["String"]>;
};

export type MutationLockMailUserArgs = {
  email: Scalars["EmailAddress"];
};

export type MutationLoginArgs = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
};

export type MutationPerformanceLoadAdvicesArgs = {
  program_id?: Maybe<Scalars["String"]>;
  student_id?: Maybe<Scalars["String"]>;
};

export type MutationProgramArgs = {
  id?: Maybe<Scalars["String"]>;
  student_id?: Maybe<Scalars["String"]>;
};

export type MutationResetPersistenceArgs = {
  user: Scalars["String"];
};

export type MutationSetPersistenceValueArgs = {
  data: Scalars["JSONObject"];
  key: Scalars["String"];
};

export type MutationStudentArgs = {
  program_id?: Maybe<Scalars["String"]>;
  student_id?: Maybe<Scalars["String"]>;
};

export type MutationTrackArgs = {
  data: Scalars["String"];
  datetime_client: Scalars["DateTime"];
};

export type MutationUnlockArgs = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
  unlockKey: Scalars["String"];
};

export type MutationUpdateUserProgramsArgs = {
  userPrograms: UpdateUserPrograms;
};

export type MutationUpsertUsersArgs = {
  users: Array<UpsertedUser>;
};

export type PerformanceByLoad = {
  adviceParagraph: Scalars["String"];
  adviceTitle: Scalars["String"];
  clusterLabel: Scalars["String"];
  failRateHigh: Scalars["Int"];
  failRateLow: Scalars["Int"];
  failRateMid: Scalars["Int"];
  id: Scalars["Int"];
  isStudentCluster: Scalars["Boolean"];
  loadUnit: PerformanceLoadUnit;
  lowerBoundary: Scalars["Float"];
  upperBoundary: Scalars["Float"];
};

/** Unit used to distinguish load in the foreplan */
export enum PerformanceLoadUnit {
  Credits = "Credits",
}

export type Persistence = {
  data: Scalars["JSONObject"];
  key: Scalars["String"];
  timestamp: Scalars["DateTime"];
  user: Scalars["String"];
};

export type Program = {
  active: Scalars["Boolean"];
  curriculums: Array<Curriculum>;
  desc: Scalars["String"];
  id: Scalars["String"];
  lastGPA: Scalars["Float"];
  name: Scalars["String"];
};

export type Query = {
  config: Scalars["JSONObject"];
  currentUser?: Maybe<AuthResult>;
  feedbackResults: Array<FeedbackResult>;
  getPersistenceValue?: Maybe<Persistence>;
  myPrograms: Array<Program>;
  programs: Array<Program>;
  students: Array<Student>;
  unansweredForm?: Maybe<FeedbackForm>;
  userPersistences: Array<Persistence>;
  users: Array<User>;
};

export type QueryFeedbackResultsArgs = {
  user_ids?: Maybe<Array<Scalars["String"]>>;
};

export type QueryGetPersistenceValueArgs = {
  key: Scalars["String"];
};

export type QueryStudentsArgs = {
  last_n_years?: Maybe<Scalars["Int"]>;
  program_id: Scalars["String"];
};

export type QueryUserPersistencesArgs = {
  user: Scalars["String"];
};

export type Semester = {
  courses: Array<Course>;
  id: Scalars["Int"];
};

/** Possible states of a taken course */
export enum StateCourse {
  Canceled = "Canceled",
  Current = "Current",
  Failed = "Failed",
  Passed = "Passed",
  Pending = "Pending",
}

export type Student = {
  curriculums: Array<Scalars["String"]>;
  dropout?: Maybe<Dropout>;
  id: Scalars["ID"];
  mention: Scalars["String"];
  name: Scalars["String"];
  programs: Array<Program>;
  progress: Scalars["Float"];
  start_year: Scalars["Int"];
  state: Scalars["String"];
  terms: Array<Term>;
};

export type TakenCourse = {
  bandColors: Array<BandColor>;
  code: Scalars["String"];
  currentDistribution: Array<DistributionValue>;
  equiv: Scalars["String"];
  grade: Scalars["Float"];
  id: Scalars["Int"];
  name: Scalars["String"];
  parallelGroup: Scalars["Int"];
  registration: Scalars["String"];
  state: StateCourse;
};

export type Term = {
  comments: Scalars["String"];
  cumulated_grade: Scalars["Float"];
  id: Scalars["Int"];
  program_grade: Scalars["Float"];
  semestral_grade: Scalars["Float"];
  situation: Scalars["String"];
  student_id: Scalars["String"];
  takenCourses: Array<TakenCourse>;
  term: TermType;
  year: Scalars["Int"];
};

/** Possible states of a term, first semester, second semester or anual */
export enum TermType {
  Anual = "Anual",
  First = "First",
  Second = "Second",
}

export type Track = {
  app_id: Scalars["String"];
  data: Scalars["String"];
  datetime: Scalars["DateTime"];
  datetime_client: Scalars["DateTime"];
  id: Scalars["Int"];
  user_id: Scalars["String"];
};

export type UpdateUserPrograms = {
  email: Scalars["EmailAddress"];
  oldPrograms: Array<Scalars["String"]>;
  programs: Array<Scalars["String"]>;
};

export type UpsertedUser = {
  config?: Maybe<Scalars["JSONObject"]>;
  email: Scalars["EmailAddress"];
  locked?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  oldEmail?: Maybe<Scalars["EmailAddress"]>;
  student_id?: Maybe<Scalars["String"]>;
  tries?: Maybe<Scalars["Int"]>;
  type?: Maybe<UserType>;
};

export type User = {
  admin: Scalars["Boolean"];
  config: Scalars["JSONObject"];
  email: Scalars["EmailAddress"];
  locked: Scalars["Boolean"];
  name: Scalars["String"];
  programs: Array<Program>;
  student_id: Scalars["String"];
  tries: Scalars["Int"];
  type: UserType;
  unlockKey: Scalars["String"];
};

export type UserProgram = {
  email: Scalars["EmailAddress"];
  program: Scalars["String"];
};

/** Possible options of an user type */
export enum UserType {
  Director = "Director",
  Student = "Student",
}

export type UserAdminFragmentFragment = Pick<
  User,
  "email" | "name" | "tries" | "type" | "student_id" | "config" | "locked"
> & { programs: Array<Pick<Program, "id">> };

export type AllUsersAdminQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersAdminQuery = { users: Array<UserAdminFragmentFragment> };

export type AllProgramsAdminQueryVariables = Exact<{ [key: string]: never }>;

export type AllProgramsAdminQuery = { programs: Array<Pick<Program, "id">> };

export type AddUsersProgramsAdminMutationVariables = Exact<{
  user_programs: Array<UserProgram>;
}>;

export type AddUsersProgramsAdminMutation = {
  addUsersPrograms: Array<UserAdminFragmentFragment>;
};

export type UpdateUserProgramsAdminMutationVariables = Exact<{
  userPrograms: UpdateUserPrograms;
}>;

export type UpdateUserProgramsAdminMutation = {
  updateUserPrograms: Array<UserAdminFragmentFragment>;
};

export type UpsertUsersAdminMutationVariables = Exact<{
  users: Array<UpsertedUser>;
}>;

export type UpsertUsersAdminMutation = {
  upsertUsers: Array<UserAdminFragmentFragment>;
};

export type DeleteUserAdminMutationVariables = Exact<{
  email: Scalars["EmailAddress"];
}>;

export type DeleteUserAdminMutation = {
  deleteUser: Array<UserAdminFragmentFragment>;
};

export type LockMailUserAdminMutationVariables = Exact<{
  email: Scalars["EmailAddress"];
}>;

export type LockMailUserAdminMutation = {
  lockMailUser: Pick<LockedUserResult, "mailResult"> & {
    users: Array<UserAdminFragmentFragment>;
  };
};

export type MailAllLockedUsersAdminMutationVariables = Exact<{
  [key: string]: never;
}>;

export type MailAllLockedUsersAdminMutation = Pick<
  Mutation,
  "mailAllLockedUsers"
>;

export type EditConfigAdminMutationVariables = Exact<{
  name: Scalars["String"];
  value: Scalars["String"];
}>;

export type EditConfigAdminMutation = Pick<Mutation, "editConfig">;

export type UserPersistencesAdminQueryVariables = Exact<{
  user: Scalars["String"];
}>;

export type UserPersistencesAdminQuery = {
  userPersistences: Array<Pick<Persistence, "key" | "data" | "timestamp">>;
};

export type ResetPersistenceAdminMutationVariables = Exact<{
  user: Scalars["String"];
}>;

export type ResetPersistenceAdminMutation = Pick<Mutation, "resetPersistence">;

export type ResetDataLoadersCacheAdminMutationVariables = Exact<{
  [key: string]: never;
}>;

export type ResetDataLoadersCacheAdminMutation = Pick<
  Mutation,
  "resetDataLoadersCache"
>;

export type FeedbackResultsCsvAdminMutationVariables = Exact<{
  [key: string]: never;
}>;

export type FeedbackResultsCsvAdminMutation = Pick<
  Mutation,
  "feedbackResultsCsv"
>;

export type FeedbackResultsAdminQueryVariables = Exact<{
  user_ids?: Maybe<Array<Scalars["String"]>>;
}>;

export type FeedbackResultsAdminQuery = {
  feedbackResults: Array<
    Pick<FeedbackResult, "timestamp"> & {
      user: Pick<User, "email">;
      form: Pick<FeedbackForm, "name">;
      answers: Array<
        Pick<FeedbackAnswer, "answer"> & {
          question: Pick<FeedbackQuestion, "question" | "type"> & {
            options: Array<Pick<FeedbackQuestionOption, "text" | "value">>;
          };
        }
      >;
    }
  >;
};

export type UserFragmentFragment = Pick<
  User,
  "email" | "name" | "admin" | "type" | "config" | "student_id"
>;

export type LoginMutationVariables = Exact<{
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  login: Pick<AuthResult, "error"> & { user?: Maybe<UserFragmentFragment> };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  currentUser?: Maybe<{ user?: Maybe<UserFragmentFragment> }>;
};

export type UnlockMutationVariables = Exact<{
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
  unlockKey: Scalars["String"];
}>;

export type UnlockMutation = {
  unlock: Pick<AuthResult, "error"> & { user?: Maybe<UserFragmentFragment> };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = Pick<Mutation, "logout">;

export type SearchProgramMutationVariables = Exact<{
  id?: Maybe<Scalars["String"]>;
  student_id?: Maybe<Scalars["String"]>;
}>;

export type SearchProgramMutation = {
  program: Pick<Program, "id" | "name" | "desc" | "active"> & {
    curriculums: Array<
      Pick<Curriculum, "id"> & {
        semesters: Array<
          Pick<Semester, "id"> & {
            courses: Array<
              Pick<Course, "code" | "name" | "mention"> & {
                credits: Array<Pick<Credit, "label" | "value">>;
                flow: Array<Pick<Course, "code">>;
                requisites: Array<Pick<Course, "code">>;
                historicalDistribution: Array<
                  Pick<DistributionValue, "label" | "value">
                >;
                bandColors: Array<Pick<BandColor, "min" | "max" | "color">>;
              }
            >;
          }
        >;
      }
    >;
  };
};

export type SearchStudentMutationVariables = Exact<{
  student_id?: Maybe<Scalars["String"]>;
  program_id?: Maybe<Scalars["String"]>;
}>;

export type SearchStudentMutation = {
  student?: Maybe<
    Pick<Student, "id" | "curriculums" | "start_year" | "mention"> & {
      programs: Array<Pick<Program, "id" | "name">>;
      terms: Array<
        Pick<
          Term,
          | "id"
          | "student_id"
          | "year"
          | "term"
          | "situation"
          | "semestral_grade"
          | "cumulated_grade"
          | "program_grade"
          | "comments"
        > & {
          takenCourses: Array<
            Pick<
              TakenCourse,
              | "id"
              | "code"
              | "equiv"
              | "name"
              | "registration"
              | "grade"
              | "state"
              | "parallelGroup"
            > & {
              currentDistribution: Array<
                Pick<DistributionValue, "label" | "value">
              >;
              bandColors: Array<Pick<BandColor, "min" | "max" | "color">>;
            }
          >;
        }
      >;
      dropout?: Maybe<
        Pick<Dropout, "prob_dropout" | "model_accuracy" | "active">
      >;
    }
  >;
};

export type MyProgramsQueryVariables = Exact<{ [key: string]: never }>;

export type MyProgramsQuery = {
  myPrograms: Array<Pick<Program, "id" | "name">>;
};

export type TrackMutationVariables = Exact<{
  data: Scalars["String"];
  datetime_client: Scalars["DateTime"];
}>;

export type TrackMutation = Pick<Mutation, "track">;

export type ConfigQueryVariables = Exact<{ [key: string]: never }>;

export type ConfigQuery = Pick<Query, "config">;

export type StudentsListQueryVariables = Exact<{
  program_id: Scalars["String"];
}>;

export type StudentsListQuery = {
  students: Array<
    Pick<Student, "id" | "progress" | "start_year"> & {
      dropout?: Maybe<Pick<Dropout, "prob_dropout" | "explanation">>;
    }
  >;
};

export type PerformanceLoadAdvicesMutationVariables = Exact<{
  student_id?: Maybe<Scalars["String"]>;
  program_id?: Maybe<Scalars["String"]>;
}>;

export type PerformanceLoadAdvicesMutation = {
  performanceLoadAdvices: Array<
    Pick<
      PerformanceByLoad,
      | "id"
      | "loadUnit"
      | "lowerBoundary"
      | "upperBoundary"
      | "failRateLow"
      | "failRateMid"
      | "failRateHigh"
      | "adviceTitle"
      | "adviceParagraph"
      | "clusterLabel"
      | "isStudentCluster"
    >
  >;
};

export type DirectTakeCoursesMutationVariables = Exact<{
  student_id?: Maybe<Scalars["String"]>;
  program_id?: Maybe<Scalars["String"]>;
}>;

export type DirectTakeCoursesMutation = {
  directTakeCourses: Array<Pick<Course, "id" | "code">>;
};

export type IndirectTakeCoursesMutationVariables = Exact<{
  student_id?: Maybe<Scalars["String"]>;
  program_id?: Maybe<Scalars["String"]>;
}>;

export type IndirectTakeCoursesMutation = {
  indirectTakeCourses: Array<
    Pick<IndirectTakeCourse, "requisitesUnmet"> & {
      course: Pick<Course, "id" | "code">;
    }
  >;
};

export type GetPersistenceValueQueryVariables = Exact<{
  key: Scalars["String"];
}>;

export type GetPersistenceValueQuery = {
  getPersistenceValue?: Maybe<Pick<Persistence, "key" | "data">>;
};

export type SetPersistenceValueMutationVariables = Exact<{
  key: Scalars["String"];
  data: Scalars["JSONObject"];
}>;

export type SetPersistenceValueMutation = {
  setPersistenceValue: { __typename: "Persistence" };
};

export type UnansweredFormQueryVariables = Exact<{ [key: string]: never }>;

export type UnansweredFormQuery = {
  unansweredForm?: Maybe<
    Pick<FeedbackForm, "id" | "name" | "priority"> & {
      questions: Array<
        Pick<FeedbackQuestion, "id" | "question" | "type" | "priority"> & {
          options: Array<Pick<FeedbackQuestionOption, "text" | "value">>;
        }
      >;
    }
  >;
};

export type AnswerFeedbackFormMutationVariables = Exact<{
  answer: FeedbackAnswerInput;
}>;

export type AnswerFeedbackFormMutation = Pick<Mutation, "answerFeedbackForm">;

export const UserAdminFragmentFragmentDoc = gql`
  fragment UserAdminFragment on User {
    email
    name
    tries
    type
    student_id
    config
    locked
    programs {
      id
    }
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    email
    name
    admin
    type
    config
    student_id
  }
`;
export const AllUsersAdminDocument = gql`
  query allUsersAdmin {
    users {
      ...UserAdminFragment
    }
  }
  ${UserAdminFragmentFragmentDoc}
`;

/**
 * __useAllUsersAdminQuery__
 *
 * To run a query within a React component, call `useAllUsersAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersAdminQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllUsersAdminQuery,
    AllUsersAdminQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AllUsersAdminQuery,
    AllUsersAdminQueryVariables
  >(AllUsersAdminDocument, baseOptions);
}
export function useAllUsersAdminLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllUsersAdminQuery,
    AllUsersAdminQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AllUsersAdminQuery,
    AllUsersAdminQueryVariables
  >(AllUsersAdminDocument, baseOptions);
}
export type AllUsersAdminQueryHookResult = ReturnType<
  typeof useAllUsersAdminQuery
>;
export type AllUsersAdminLazyQueryHookResult = ReturnType<
  typeof useAllUsersAdminLazyQuery
>;
export type AllUsersAdminQueryResult = ApolloReactCommon.QueryResult<
  AllUsersAdminQuery,
  AllUsersAdminQueryVariables
>;
export const AllProgramsAdminDocument = gql`
  query allProgramsAdmin {
    programs {
      id
    }
  }
`;

/**
 * __useAllProgramsAdminQuery__
 *
 * To run a query within a React component, call `useAllProgramsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProgramsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProgramsAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProgramsAdminQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllProgramsAdminQuery,
    AllProgramsAdminQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AllProgramsAdminQuery,
    AllProgramsAdminQueryVariables
  >(AllProgramsAdminDocument, baseOptions);
}
export function useAllProgramsAdminLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllProgramsAdminQuery,
    AllProgramsAdminQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AllProgramsAdminQuery,
    AllProgramsAdminQueryVariables
  >(AllProgramsAdminDocument, baseOptions);
}
export type AllProgramsAdminQueryHookResult = ReturnType<
  typeof useAllProgramsAdminQuery
>;
export type AllProgramsAdminLazyQueryHookResult = ReturnType<
  typeof useAllProgramsAdminLazyQuery
>;
export type AllProgramsAdminQueryResult = ApolloReactCommon.QueryResult<
  AllProgramsAdminQuery,
  AllProgramsAdminQueryVariables
>;
export const AddUsersProgramsAdminDocument = gql`
  mutation addUsersProgramsAdmin($user_programs: [UserProgram!]!) {
    addUsersPrograms(user_programs: $user_programs) {
      ...UserAdminFragment
    }
  }
  ${UserAdminFragmentFragmentDoc}
`;
export type AddUsersProgramsAdminMutationFn = ApolloReactCommon.MutationFunction<
  AddUsersProgramsAdminMutation,
  AddUsersProgramsAdminMutationVariables
>;

/**
 * __useAddUsersProgramsAdminMutation__
 *
 * To run a mutation, you first call `useAddUsersProgramsAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersProgramsAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersProgramsAdminMutation, { data, loading, error }] = useAddUsersProgramsAdminMutation({
 *   variables: {
 *      user_programs: // value for 'user_programs'
 *   },
 * });
 */
export function useAddUsersProgramsAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddUsersProgramsAdminMutation,
    AddUsersProgramsAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddUsersProgramsAdminMutation,
    AddUsersProgramsAdminMutationVariables
  >(AddUsersProgramsAdminDocument, baseOptions);
}
export type AddUsersProgramsAdminMutationHookResult = ReturnType<
  typeof useAddUsersProgramsAdminMutation
>;
export type AddUsersProgramsAdminMutationResult = ApolloReactCommon.MutationResult<
  AddUsersProgramsAdminMutation
>;
export type AddUsersProgramsAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddUsersProgramsAdminMutation,
  AddUsersProgramsAdminMutationVariables
>;
export const UpdateUserProgramsAdminDocument = gql`
  mutation updateUserProgramsAdmin($userPrograms: UpdateUserPrograms!) {
    updateUserPrograms(userPrograms: $userPrograms) {
      ...UserAdminFragment
    }
  }
  ${UserAdminFragmentFragmentDoc}
`;
export type UpdateUserProgramsAdminMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserProgramsAdminMutation,
  UpdateUserProgramsAdminMutationVariables
>;

/**
 * __useUpdateUserProgramsAdminMutation__
 *
 * To run a mutation, you first call `useUpdateUserProgramsAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProgramsAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProgramsAdminMutation, { data, loading, error }] = useUpdateUserProgramsAdminMutation({
 *   variables: {
 *      userPrograms: // value for 'userPrograms'
 *   },
 * });
 */
export function useUpdateUserProgramsAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserProgramsAdminMutation,
    UpdateUserProgramsAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateUserProgramsAdminMutation,
    UpdateUserProgramsAdminMutationVariables
  >(UpdateUserProgramsAdminDocument, baseOptions);
}
export type UpdateUserProgramsAdminMutationHookResult = ReturnType<
  typeof useUpdateUserProgramsAdminMutation
>;
export type UpdateUserProgramsAdminMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserProgramsAdminMutation
>;
export type UpdateUserProgramsAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserProgramsAdminMutation,
  UpdateUserProgramsAdminMutationVariables
>;
export const UpsertUsersAdminDocument = gql`
  mutation upsertUsersAdmin($users: [UpsertedUser!]!) {
    upsertUsers(users: $users) {
      ...UserAdminFragment
    }
  }
  ${UserAdminFragmentFragmentDoc}
`;
export type UpsertUsersAdminMutationFn = ApolloReactCommon.MutationFunction<
  UpsertUsersAdminMutation,
  UpsertUsersAdminMutationVariables
>;

/**
 * __useUpsertUsersAdminMutation__
 *
 * To run a mutation, you first call `useUpsertUsersAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUsersAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUsersAdminMutation, { data, loading, error }] = useUpsertUsersAdminMutation({
 *   variables: {
 *      users: // value for 'users'
 *   },
 * });
 */
export function useUpsertUsersAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertUsersAdminMutation,
    UpsertUsersAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpsertUsersAdminMutation,
    UpsertUsersAdminMutationVariables
  >(UpsertUsersAdminDocument, baseOptions);
}
export type UpsertUsersAdminMutationHookResult = ReturnType<
  typeof useUpsertUsersAdminMutation
>;
export type UpsertUsersAdminMutationResult = ApolloReactCommon.MutationResult<
  UpsertUsersAdminMutation
>;
export type UpsertUsersAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertUsersAdminMutation,
  UpsertUsersAdminMutationVariables
>;
export const DeleteUserAdminDocument = gql`
  mutation deleteUserAdmin($email: EmailAddress!) {
    deleteUser(email: $email) {
      ...UserAdminFragment
    }
  }
  ${UserAdminFragmentFragmentDoc}
`;
export type DeleteUserAdminMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUserAdminMutation,
  DeleteUserAdminMutationVariables
>;

/**
 * __useDeleteUserAdminMutation__
 *
 * To run a mutation, you first call `useDeleteUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAdminMutation, { data, loading, error }] = useDeleteUserAdminMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeleteUserAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteUserAdminMutation,
    DeleteUserAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteUserAdminMutation,
    DeleteUserAdminMutationVariables
  >(DeleteUserAdminDocument, baseOptions);
}
export type DeleteUserAdminMutationHookResult = ReturnType<
  typeof useDeleteUserAdminMutation
>;
export type DeleteUserAdminMutationResult = ApolloReactCommon.MutationResult<
  DeleteUserAdminMutation
>;
export type DeleteUserAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserAdminMutation,
  DeleteUserAdminMutationVariables
>;
export const LockMailUserAdminDocument = gql`
  mutation lockMailUserAdmin($email: EmailAddress!) {
    lockMailUser(email: $email) {
      mailResult
      users {
        ...UserAdminFragment
      }
    }
  }
  ${UserAdminFragmentFragmentDoc}
`;
export type LockMailUserAdminMutationFn = ApolloReactCommon.MutationFunction<
  LockMailUserAdminMutation,
  LockMailUserAdminMutationVariables
>;

/**
 * __useLockMailUserAdminMutation__
 *
 * To run a mutation, you first call `useLockMailUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLockMailUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lockMailUserAdminMutation, { data, loading, error }] = useLockMailUserAdminMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLockMailUserAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LockMailUserAdminMutation,
    LockMailUserAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LockMailUserAdminMutation,
    LockMailUserAdminMutationVariables
  >(LockMailUserAdminDocument, baseOptions);
}
export type LockMailUserAdminMutationHookResult = ReturnType<
  typeof useLockMailUserAdminMutation
>;
export type LockMailUserAdminMutationResult = ApolloReactCommon.MutationResult<
  LockMailUserAdminMutation
>;
export type LockMailUserAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LockMailUserAdminMutation,
  LockMailUserAdminMutationVariables
>;
export const MailAllLockedUsersAdminDocument = gql`
  mutation mailAllLockedUsersAdmin {
    mailAllLockedUsers
  }
`;
export type MailAllLockedUsersAdminMutationFn = ApolloReactCommon.MutationFunction<
  MailAllLockedUsersAdminMutation,
  MailAllLockedUsersAdminMutationVariables
>;

/**
 * __useMailAllLockedUsersAdminMutation__
 *
 * To run a mutation, you first call `useMailAllLockedUsersAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMailAllLockedUsersAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mailAllLockedUsersAdminMutation, { data, loading, error }] = useMailAllLockedUsersAdminMutation({
 *   variables: {
 *   },
 * });
 */
export function useMailAllLockedUsersAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MailAllLockedUsersAdminMutation,
    MailAllLockedUsersAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    MailAllLockedUsersAdminMutation,
    MailAllLockedUsersAdminMutationVariables
  >(MailAllLockedUsersAdminDocument, baseOptions);
}
export type MailAllLockedUsersAdminMutationHookResult = ReturnType<
  typeof useMailAllLockedUsersAdminMutation
>;
export type MailAllLockedUsersAdminMutationResult = ApolloReactCommon.MutationResult<
  MailAllLockedUsersAdminMutation
>;
export type MailAllLockedUsersAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MailAllLockedUsersAdminMutation,
  MailAllLockedUsersAdminMutationVariables
>;
export const EditConfigAdminDocument = gql`
  mutation editConfigAdmin($name: String!, $value: String!) {
    editConfig(name: $name, value: $value)
  }
`;
export type EditConfigAdminMutationFn = ApolloReactCommon.MutationFunction<
  EditConfigAdminMutation,
  EditConfigAdminMutationVariables
>;

/**
 * __useEditConfigAdminMutation__
 *
 * To run a mutation, you first call `useEditConfigAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditConfigAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editConfigAdminMutation, { data, loading, error }] = useEditConfigAdminMutation({
 *   variables: {
 *      name: // value for 'name'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useEditConfigAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditConfigAdminMutation,
    EditConfigAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    EditConfigAdminMutation,
    EditConfigAdminMutationVariables
  >(EditConfigAdminDocument, baseOptions);
}
export type EditConfigAdminMutationHookResult = ReturnType<
  typeof useEditConfigAdminMutation
>;
export type EditConfigAdminMutationResult = ApolloReactCommon.MutationResult<
  EditConfigAdminMutation
>;
export type EditConfigAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditConfigAdminMutation,
  EditConfigAdminMutationVariables
>;
export const UserPersistencesAdminDocument = gql`
  query userPersistencesAdmin($user: String!) {
    userPersistences(user: $user) {
      key
      data
      timestamp
    }
  }
`;

/**
 * __useUserPersistencesAdminQuery__
 *
 * To run a query within a React component, call `useUserPersistencesAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPersistencesAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPersistencesAdminQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUserPersistencesAdminQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserPersistencesAdminQuery,
    UserPersistencesAdminQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    UserPersistencesAdminQuery,
    UserPersistencesAdminQueryVariables
  >(UserPersistencesAdminDocument, baseOptions);
}
export function useUserPersistencesAdminLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserPersistencesAdminQuery,
    UserPersistencesAdminQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    UserPersistencesAdminQuery,
    UserPersistencesAdminQueryVariables
  >(UserPersistencesAdminDocument, baseOptions);
}
export type UserPersistencesAdminQueryHookResult = ReturnType<
  typeof useUserPersistencesAdminQuery
>;
export type UserPersistencesAdminLazyQueryHookResult = ReturnType<
  typeof useUserPersistencesAdminLazyQuery
>;
export type UserPersistencesAdminQueryResult = ApolloReactCommon.QueryResult<
  UserPersistencesAdminQuery,
  UserPersistencesAdminQueryVariables
>;
export const ResetPersistenceAdminDocument = gql`
  mutation resetPersistenceAdmin($user: String!) {
    resetPersistence(user: $user)
  }
`;
export type ResetPersistenceAdminMutationFn = ApolloReactCommon.MutationFunction<
  ResetPersistenceAdminMutation,
  ResetPersistenceAdminMutationVariables
>;

/**
 * __useResetPersistenceAdminMutation__
 *
 * To run a mutation, you first call `useResetPersistenceAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPersistenceAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPersistenceAdminMutation, { data, loading, error }] = useResetPersistenceAdminMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useResetPersistenceAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPersistenceAdminMutation,
    ResetPersistenceAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ResetPersistenceAdminMutation,
    ResetPersistenceAdminMutationVariables
  >(ResetPersistenceAdminDocument, baseOptions);
}
export type ResetPersistenceAdminMutationHookResult = ReturnType<
  typeof useResetPersistenceAdminMutation
>;
export type ResetPersistenceAdminMutationResult = ApolloReactCommon.MutationResult<
  ResetPersistenceAdminMutation
>;
export type ResetPersistenceAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPersistenceAdminMutation,
  ResetPersistenceAdminMutationVariables
>;
export const ResetDataLoadersCacheAdminDocument = gql`
  mutation resetDataLoadersCacheAdmin {
    resetDataLoadersCache
  }
`;
export type ResetDataLoadersCacheAdminMutationFn = ApolloReactCommon.MutationFunction<
  ResetDataLoadersCacheAdminMutation,
  ResetDataLoadersCacheAdminMutationVariables
>;

/**
 * __useResetDataLoadersCacheAdminMutation__
 *
 * To run a mutation, you first call `useResetDataLoadersCacheAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetDataLoadersCacheAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetDataLoadersCacheAdminMutation, { data, loading, error }] = useResetDataLoadersCacheAdminMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetDataLoadersCacheAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetDataLoadersCacheAdminMutation,
    ResetDataLoadersCacheAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ResetDataLoadersCacheAdminMutation,
    ResetDataLoadersCacheAdminMutationVariables
  >(ResetDataLoadersCacheAdminDocument, baseOptions);
}
export type ResetDataLoadersCacheAdminMutationHookResult = ReturnType<
  typeof useResetDataLoadersCacheAdminMutation
>;
export type ResetDataLoadersCacheAdminMutationResult = ApolloReactCommon.MutationResult<
  ResetDataLoadersCacheAdminMutation
>;
export type ResetDataLoadersCacheAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetDataLoadersCacheAdminMutation,
  ResetDataLoadersCacheAdminMutationVariables
>;
export const FeedbackResultsCsvAdminDocument = gql`
  mutation feedbackResultsCsvAdmin {
    feedbackResultsCsv
  }
`;
export type FeedbackResultsCsvAdminMutationFn = ApolloReactCommon.MutationFunction<
  FeedbackResultsCsvAdminMutation,
  FeedbackResultsCsvAdminMutationVariables
>;

/**
 * __useFeedbackResultsCsvAdminMutation__
 *
 * To run a mutation, you first call `useFeedbackResultsCsvAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeedbackResultsCsvAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feedbackResultsCsvAdminMutation, { data, loading, error }] = useFeedbackResultsCsvAdminMutation({
 *   variables: {
 *   },
 * });
 */
export function useFeedbackResultsCsvAdminMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    FeedbackResultsCsvAdminMutation,
    FeedbackResultsCsvAdminMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    FeedbackResultsCsvAdminMutation,
    FeedbackResultsCsvAdminMutationVariables
  >(FeedbackResultsCsvAdminDocument, baseOptions);
}
export type FeedbackResultsCsvAdminMutationHookResult = ReturnType<
  typeof useFeedbackResultsCsvAdminMutation
>;
export type FeedbackResultsCsvAdminMutationResult = ApolloReactCommon.MutationResult<
  FeedbackResultsCsvAdminMutation
>;
export type FeedbackResultsCsvAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<
  FeedbackResultsCsvAdminMutation,
  FeedbackResultsCsvAdminMutationVariables
>;
export const FeedbackResultsAdminDocument = gql`
  query feedbackResultsAdmin($user_ids: [String!]) {
    feedbackResults(user_ids: $user_ids) {
      user {
        email
      }
      form {
        name
      }
      answers {
        answer
        question {
          question
          type
          options {
            text
            value
          }
        }
      }
      timestamp
    }
  }
`;

/**
 * __useFeedbackResultsAdminQuery__
 *
 * To run a query within a React component, call `useFeedbackResultsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedbackResultsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedbackResultsAdminQuery({
 *   variables: {
 *      user_ids: // value for 'user_ids'
 *   },
 * });
 */
export function useFeedbackResultsAdminQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FeedbackResultsAdminQuery,
    FeedbackResultsAdminQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FeedbackResultsAdminQuery,
    FeedbackResultsAdminQueryVariables
  >(FeedbackResultsAdminDocument, baseOptions);
}
export function useFeedbackResultsAdminLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FeedbackResultsAdminQuery,
    FeedbackResultsAdminQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FeedbackResultsAdminQuery,
    FeedbackResultsAdminQueryVariables
  >(FeedbackResultsAdminDocument, baseOptions);
}
export type FeedbackResultsAdminQueryHookResult = ReturnType<
  typeof useFeedbackResultsAdminQuery
>;
export type FeedbackResultsAdminLazyQueryHookResult = ReturnType<
  typeof useFeedbackResultsAdminLazyQuery
>;
export type FeedbackResultsAdminQueryResult = ApolloReactCommon.QueryResult<
  FeedbackResultsAdminQuery,
  FeedbackResultsAdminQueryVariables
>;
export const LoginDocument = gql`
  mutation login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...UserFragment
      }
      error
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >(CurrentUserDocument, baseOptions);
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const UnlockDocument = gql`
  mutation unlock(
    $email: EmailAddress!
    $password: String!
    $unlockKey: String!
  ) {
    unlock(email: $email, password: $password, unlockKey: $unlockKey) {
      user {
        ...UserFragment
      }
      error
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type UnlockMutationFn = ApolloReactCommon.MutationFunction<
  UnlockMutation,
  UnlockMutationVariables
>;

/**
 * __useUnlockMutation__
 *
 * To run a mutation, you first call `useUnlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlockMutation, { data, loading, error }] = useUnlockMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      unlockKey: // value for 'unlockKey'
 *   },
 * });
 */
export function useUnlockMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UnlockMutation,
    UnlockMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<UnlockMutation, UnlockMutationVariables>(
    UnlockDocument,
    baseOptions
  );
}
export type UnlockMutationHookResult = ReturnType<typeof useUnlockMutation>;
export type UnlockMutationResult = ApolloReactCommon.MutationResult<
  UnlockMutation
>;
export type UnlockMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UnlockMutation,
  UnlockMutationVariables
>;
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const SearchProgramDocument = gql`
  mutation searchProgram($id: String, $student_id: String) {
    program(id: $id, student_id: $student_id) {
      id
      name
      desc
      active
      curriculums {
        id
        semesters {
          id
          courses {
            code
            name
            credits {
              label
              value
            }
            mention
            flow {
              code
            }
            requisites {
              code
            }
            historicalDistribution {
              label
              value
            }
            bandColors {
              min
              max
              color
            }
          }
        }
      }
    }
  }
`;
export type SearchProgramMutationFn = ApolloReactCommon.MutationFunction<
  SearchProgramMutation,
  SearchProgramMutationVariables
>;

/**
 * __useSearchProgramMutation__
 *
 * To run a mutation, you first call `useSearchProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchProgramMutation, { data, loading, error }] = useSearchProgramMutation({
 *   variables: {
 *      id: // value for 'id'
 *      student_id: // value for 'student_id'
 *   },
 * });
 */
export function useSearchProgramMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SearchProgramMutation,
    SearchProgramMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SearchProgramMutation,
    SearchProgramMutationVariables
  >(SearchProgramDocument, baseOptions);
}
export type SearchProgramMutationHookResult = ReturnType<
  typeof useSearchProgramMutation
>;
export type SearchProgramMutationResult = ApolloReactCommon.MutationResult<
  SearchProgramMutation
>;
export type SearchProgramMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SearchProgramMutation,
  SearchProgramMutationVariables
>;
export const SearchStudentDocument = gql`
  mutation searchStudent($student_id: String, $program_id: String) {
    student(student_id: $student_id, program_id: $program_id) {
      id
      programs {
        id
        name
      }
      curriculums
      start_year
      mention
      terms {
        id
        student_id
        year
        term
        situation
        semestral_grade
        cumulated_grade
        program_grade
        comments
        takenCourses {
          id
          code
          equiv
          name
          registration
          grade
          state
          parallelGroup
          currentDistribution {
            label
            value
          }
          bandColors {
            min
            max
            color
          }
        }
      }
      dropout {
        prob_dropout
        model_accuracy
        active
      }
    }
  }
`;
export type SearchStudentMutationFn = ApolloReactCommon.MutationFunction<
  SearchStudentMutation,
  SearchStudentMutationVariables
>;

/**
 * __useSearchStudentMutation__
 *
 * To run a mutation, you first call `useSearchStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchStudentMutation, { data, loading, error }] = useSearchStudentMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      program_id: // value for 'program_id'
 *   },
 * });
 */
export function useSearchStudentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SearchStudentMutation,
    SearchStudentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SearchStudentMutation,
    SearchStudentMutationVariables
  >(SearchStudentDocument, baseOptions);
}
export type SearchStudentMutationHookResult = ReturnType<
  typeof useSearchStudentMutation
>;
export type SearchStudentMutationResult = ApolloReactCommon.MutationResult<
  SearchStudentMutation
>;
export type SearchStudentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SearchStudentMutation,
  SearchStudentMutationVariables
>;
export const MyProgramsDocument = gql`
  query myPrograms {
    myPrograms {
      id
      name
    }
  }
`;

/**
 * __useMyProgramsQuery__
 *
 * To run a query within a React component, call `useMyProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProgramsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MyProgramsQuery,
    MyProgramsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<MyProgramsQuery, MyProgramsQueryVariables>(
    MyProgramsDocument,
    baseOptions
  );
}
export function useMyProgramsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MyProgramsQuery,
    MyProgramsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    MyProgramsQuery,
    MyProgramsQueryVariables
  >(MyProgramsDocument, baseOptions);
}
export type MyProgramsQueryHookResult = ReturnType<typeof useMyProgramsQuery>;
export type MyProgramsLazyQueryHookResult = ReturnType<
  typeof useMyProgramsLazyQuery
>;
export type MyProgramsQueryResult = ApolloReactCommon.QueryResult<
  MyProgramsQuery,
  MyProgramsQueryVariables
>;
export const TrackDocument = gql`
  mutation track($data: String!, $datetime_client: DateTime!) {
    track(data: $data, datetime_client: $datetime_client)
  }
`;
export type TrackMutationFn = ApolloReactCommon.MutationFunction<
  TrackMutation,
  TrackMutationVariables
>;

/**
 * __useTrackMutation__
 *
 * To run a mutation, you first call `useTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackMutation, { data, loading, error }] = useTrackMutation({
 *   variables: {
 *      data: // value for 'data'
 *      datetime_client: // value for 'datetime_client'
 *   },
 * });
 */
export function useTrackMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TrackMutation,
    TrackMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<TrackMutation, TrackMutationVariables>(
    TrackDocument,
    baseOptions
  );
}
export type TrackMutationHookResult = ReturnType<typeof useTrackMutation>;
export type TrackMutationResult = ApolloReactCommon.MutationResult<
  TrackMutation
>;
export type TrackMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TrackMutation,
  TrackMutationVariables
>;
export const ConfigDocument = gql`
  query config {
    config
  }
`;

/**
 * __useConfigQuery__
 *
 * To run a query within a React component, call `useConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ConfigQuery,
    ConfigQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ConfigQuery, ConfigQueryVariables>(
    ConfigDocument,
    baseOptions
  );
}
export function useConfigLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ConfigQuery,
    ConfigQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ConfigQuery, ConfigQueryVariables>(
    ConfigDocument,
    baseOptions
  );
}
export type ConfigQueryHookResult = ReturnType<typeof useConfigQuery>;
export type ConfigLazyQueryHookResult = ReturnType<typeof useConfigLazyQuery>;
export type ConfigQueryResult = ApolloReactCommon.QueryResult<
  ConfigQuery,
  ConfigQueryVariables
>;
export const StudentsListDocument = gql`
  query studentsList($program_id: String!) {
    students(program_id: $program_id) {
      id
      progress
      start_year
      dropout {
        prob_dropout
        explanation
      }
    }
  }
`;

/**
 * __useStudentsListQuery__
 *
 * To run a query within a React component, call `useStudentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsListQuery({
 *   variables: {
 *      program_id: // value for 'program_id'
 *   },
 * });
 */
export function useStudentsListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    StudentsListQuery,
    StudentsListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    StudentsListQuery,
    StudentsListQueryVariables
  >(StudentsListDocument, baseOptions);
}
export function useStudentsListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    StudentsListQuery,
    StudentsListQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    StudentsListQuery,
    StudentsListQueryVariables
  >(StudentsListDocument, baseOptions);
}
export type StudentsListQueryHookResult = ReturnType<
  typeof useStudentsListQuery
>;
export type StudentsListLazyQueryHookResult = ReturnType<
  typeof useStudentsListLazyQuery
>;
export type StudentsListQueryResult = ApolloReactCommon.QueryResult<
  StudentsListQuery,
  StudentsListQueryVariables
>;
export const PerformanceLoadAdvicesDocument = gql`
  mutation performanceLoadAdvices($student_id: String, $program_id: String) {
    performanceLoadAdvices(student_id: $student_id, program_id: $program_id) {
      id
      loadUnit
      lowerBoundary
      upperBoundary
      failRateLow
      failRateMid
      failRateHigh
      adviceTitle
      adviceParagraph
      clusterLabel
      isStudentCluster
    }
  }
`;
export type PerformanceLoadAdvicesMutationFn = ApolloReactCommon.MutationFunction<
  PerformanceLoadAdvicesMutation,
  PerformanceLoadAdvicesMutationVariables
>;

/**
 * __usePerformanceLoadAdvicesMutation__
 *
 * To run a mutation, you first call `usePerformanceLoadAdvicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformanceLoadAdvicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performanceLoadAdvicesMutation, { data, loading, error }] = usePerformanceLoadAdvicesMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      program_id: // value for 'program_id'
 *   },
 * });
 */
export function usePerformanceLoadAdvicesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PerformanceLoadAdvicesMutation,
    PerformanceLoadAdvicesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PerformanceLoadAdvicesMutation,
    PerformanceLoadAdvicesMutationVariables
  >(PerformanceLoadAdvicesDocument, baseOptions);
}
export type PerformanceLoadAdvicesMutationHookResult = ReturnType<
  typeof usePerformanceLoadAdvicesMutation
>;
export type PerformanceLoadAdvicesMutationResult = ApolloReactCommon.MutationResult<
  PerformanceLoadAdvicesMutation
>;
export type PerformanceLoadAdvicesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PerformanceLoadAdvicesMutation,
  PerformanceLoadAdvicesMutationVariables
>;
export const DirectTakeCoursesDocument = gql`
  mutation directTakeCourses($student_id: String, $program_id: String) {
    directTakeCourses(student_id: $student_id, program_id: $program_id) {
      id
      code
    }
  }
`;
export type DirectTakeCoursesMutationFn = ApolloReactCommon.MutationFunction<
  DirectTakeCoursesMutation,
  DirectTakeCoursesMutationVariables
>;

/**
 * __useDirectTakeCoursesMutation__
 *
 * To run a mutation, you first call `useDirectTakeCoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDirectTakeCoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [directTakeCoursesMutation, { data, loading, error }] = useDirectTakeCoursesMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      program_id: // value for 'program_id'
 *   },
 * });
 */
export function useDirectTakeCoursesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DirectTakeCoursesMutation,
    DirectTakeCoursesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DirectTakeCoursesMutation,
    DirectTakeCoursesMutationVariables
  >(DirectTakeCoursesDocument, baseOptions);
}
export type DirectTakeCoursesMutationHookResult = ReturnType<
  typeof useDirectTakeCoursesMutation
>;
export type DirectTakeCoursesMutationResult = ApolloReactCommon.MutationResult<
  DirectTakeCoursesMutation
>;
export type DirectTakeCoursesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DirectTakeCoursesMutation,
  DirectTakeCoursesMutationVariables
>;
export const IndirectTakeCoursesDocument = gql`
  mutation indirectTakeCourses($student_id: String, $program_id: String) {
    indirectTakeCourses(student_id: $student_id, program_id: $program_id) {
      course {
        id
        code
      }
      requisitesUnmet
    }
  }
`;
export type IndirectTakeCoursesMutationFn = ApolloReactCommon.MutationFunction<
  IndirectTakeCoursesMutation,
  IndirectTakeCoursesMutationVariables
>;

/**
 * __useIndirectTakeCoursesMutation__
 *
 * To run a mutation, you first call `useIndirectTakeCoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIndirectTakeCoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [indirectTakeCoursesMutation, { data, loading, error }] = useIndirectTakeCoursesMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      program_id: // value for 'program_id'
 *   },
 * });
 */
export function useIndirectTakeCoursesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    IndirectTakeCoursesMutation,
    IndirectTakeCoursesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    IndirectTakeCoursesMutation,
    IndirectTakeCoursesMutationVariables
  >(IndirectTakeCoursesDocument, baseOptions);
}
export type IndirectTakeCoursesMutationHookResult = ReturnType<
  typeof useIndirectTakeCoursesMutation
>;
export type IndirectTakeCoursesMutationResult = ApolloReactCommon.MutationResult<
  IndirectTakeCoursesMutation
>;
export type IndirectTakeCoursesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  IndirectTakeCoursesMutation,
  IndirectTakeCoursesMutationVariables
>;
export const GetPersistenceValueDocument = gql`
  query getPersistenceValue($key: String!) {
    getPersistenceValue(key: $key) {
      key
      data
    }
  }
`;

/**
 * __useGetPersistenceValueQuery__
 *
 * To run a query within a React component, call `useGetPersistenceValueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersistenceValueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersistenceValueQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetPersistenceValueQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPersistenceValueQuery,
    GetPersistenceValueQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPersistenceValueQuery,
    GetPersistenceValueQueryVariables
  >(GetPersistenceValueDocument, baseOptions);
}
export function useGetPersistenceValueLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPersistenceValueQuery,
    GetPersistenceValueQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPersistenceValueQuery,
    GetPersistenceValueQueryVariables
  >(GetPersistenceValueDocument, baseOptions);
}
export type GetPersistenceValueQueryHookResult = ReturnType<
  typeof useGetPersistenceValueQuery
>;
export type GetPersistenceValueLazyQueryHookResult = ReturnType<
  typeof useGetPersistenceValueLazyQuery
>;
export type GetPersistenceValueQueryResult = ApolloReactCommon.QueryResult<
  GetPersistenceValueQuery,
  GetPersistenceValueQueryVariables
>;
export const SetPersistenceValueDocument = gql`
  mutation setPersistenceValue($key: String!, $data: JSONObject!) {
    setPersistenceValue(key: $key, data: $data) {
      __typename
    }
  }
`;
export type SetPersistenceValueMutationFn = ApolloReactCommon.MutationFunction<
  SetPersistenceValueMutation,
  SetPersistenceValueMutationVariables
>;

/**
 * __useSetPersistenceValueMutation__
 *
 * To run a mutation, you first call `useSetPersistenceValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPersistenceValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPersistenceValueMutation, { data, loading, error }] = useSetPersistenceValueMutation({
 *   variables: {
 *      key: // value for 'key'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetPersistenceValueMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetPersistenceValueMutation,
    SetPersistenceValueMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SetPersistenceValueMutation,
    SetPersistenceValueMutationVariables
  >(SetPersistenceValueDocument, baseOptions);
}
export type SetPersistenceValueMutationHookResult = ReturnType<
  typeof useSetPersistenceValueMutation
>;
export type SetPersistenceValueMutationResult = ApolloReactCommon.MutationResult<
  SetPersistenceValueMutation
>;
export type SetPersistenceValueMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetPersistenceValueMutation,
  SetPersistenceValueMutationVariables
>;
export const UnansweredFormDocument = gql`
  query unansweredForm {
    unansweredForm {
      id
      name
      priority
      questions {
        id
        question
        type
        priority
        options {
          text
          value
        }
      }
    }
  }
`;

/**
 * __useUnansweredFormQuery__
 *
 * To run a query within a React component, call `useUnansweredFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnansweredFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnansweredFormQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnansweredFormQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UnansweredFormQuery,
    UnansweredFormQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    UnansweredFormQuery,
    UnansweredFormQueryVariables
  >(UnansweredFormDocument, baseOptions);
}
export function useUnansweredFormLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UnansweredFormQuery,
    UnansweredFormQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    UnansweredFormQuery,
    UnansweredFormQueryVariables
  >(UnansweredFormDocument, baseOptions);
}
export type UnansweredFormQueryHookResult = ReturnType<
  typeof useUnansweredFormQuery
>;
export type UnansweredFormLazyQueryHookResult = ReturnType<
  typeof useUnansweredFormLazyQuery
>;
export type UnansweredFormQueryResult = ApolloReactCommon.QueryResult<
  UnansweredFormQuery,
  UnansweredFormQueryVariables
>;
export const AnswerFeedbackFormDocument = gql`
  mutation answerFeedbackForm($answer: FeedbackAnswerInput!) {
    answerFeedbackForm(answer: $answer)
  }
`;
export type AnswerFeedbackFormMutationFn = ApolloReactCommon.MutationFunction<
  AnswerFeedbackFormMutation,
  AnswerFeedbackFormMutationVariables
>;

/**
 * __useAnswerFeedbackFormMutation__
 *
 * To run a mutation, you first call `useAnswerFeedbackFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerFeedbackFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerFeedbackFormMutation, { data, loading, error }] = useAnswerFeedbackFormMutation({
 *   variables: {
 *      answer: // value for 'answer'
 *   },
 * });
 */
export function useAnswerFeedbackFormMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AnswerFeedbackFormMutation,
    AnswerFeedbackFormMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AnswerFeedbackFormMutation,
    AnswerFeedbackFormMutationVariables
  >(AnswerFeedbackFormDocument, baseOptions);
}
export type AnswerFeedbackFormMutationHookResult = ReturnType<
  typeof useAnswerFeedbackFormMutation
>;
export type AnswerFeedbackFormMutationResult = ApolloReactCommon.MutationResult<
  AnswerFeedbackFormMutation
>;
export type AnswerFeedbackFormMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AnswerFeedbackFormMutation,
  AnswerFeedbackFormMutationVariables
>;