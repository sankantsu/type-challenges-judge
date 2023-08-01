// Code generated by sqlc-gen-ts-d1. DO NOT EDIT.
// versions:
//   sqlc v1.19.1
//   sqlc-gen-ts-d1 v0.0.0-a@254c24db5bcb2e1e16559e7f8498d7fa673ada31

export type D1Migrations = {
  id: number;
  name: string | null;
  appliedAt: number | string;
};

export type SqliteSequence = {
  name: number | string | null;
  seq: number | string | null;
};

export type Problem = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  tests: string;
  playgroundurl: string;
};

export type User = {
  userid: string;
  screenname: string;
};

export type Submission = {
  id: string;
  problemid: string;
  userid: string;
  code: string;
  codelength: number | string;
  status: string;
  createdat: string;
};

export type Judgement = {
  submissionid: string;
  status: string;
  diagnostics: string;
  createdat: string | null;
};

export type ChallengeResult = {
  id: number;
  problemid: string;
  userid: string;
  status: string;
};

