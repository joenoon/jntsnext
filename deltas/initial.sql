\set ON_ERROR_STOP

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

create extension if not exists pgcrypto;

create table users (
  id uuid not null primary key,
  extid uuid not null,
  email text not null,
  name text,
  username text,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create index on users (created_at);
create index on users (updated_at);
create index on users (deleted_at);
create unique index on users (extid);
create unique index on users (username);
create unique index on users (email);

create table email_verifications (
  id uuid not null primary key,
  email text not null,
  code text not null,
  fails integer not null,
  user_id uuid references users (id) on update cascade on delete cascade,
  auth_token uuid not null unique,
  verified_at timestamp with time zone,
  used_at timestamp with time zone,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create index on email_verifications (created_at);
create index on email_verifications (updated_at);
create index on email_verifications (deleted_at);
create index on email_verifications (auth_token);

create table projects (
  id uuid not null primary key,
  user_id uuid not null references users (id) on update cascade on delete cascade,
  name text not null,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create index on projects (created_at);
create index on projects (updated_at);
create index on projects (deleted_at);
create index on projects (user_id);
