CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    email TEXT,
    username VARCHAR(20) UNIQUE NOT NULL,
    password TEXT,
    role TEXT, 
    datecreated TIMESTAMP default now()
);

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    title TEXT,
    datecreated TIMESTAMP default now()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE priorities(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name TEXT, 
    userid INTEGER REFERENCES users(id),
    category INTEGER REFERENCES categories(id),
    datecreated TIMESTAMP default now(),
    duedate TIMESTAMP,
    priority INTEGER REFERENCES priorities(id),
    lists INTEGER REFERENCES lists(id),
    status INTEGER REFERENCES statuses(id)
);

CREATE TABLE tasks_categories (
    id SERIAL PRIMARY KEY
);