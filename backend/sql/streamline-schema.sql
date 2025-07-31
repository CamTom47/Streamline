CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name REQUIRED TEXT,
    last_name REQUIRED TEXT,
    email TEXT,
    username REQUIRED VARCHAR(20) UNIQUE NOT NULL,
    password REQUIRED TEXT,
    role TEXT, 
    date_created TIMESTAMP default now()
);

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    name REQUIRED TEXT,
    default BOOLEAN,
    user_id REQUIRED INTEGER REFERENCES users(id)
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    title REQUIRED TEXT,
    date_created TIMESTAMP default now(),
    user_id REQUIRED INTEGER REFERENCES users(id),
    description TEXT
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name REQUIRED TEXT,
    user_id REQUIRED INTEGER REFERENCES users(id)
);

CREATE TABLE priorities(
    id SERIAL PRIMARY KEY,
    name REQUIRED TEXT
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title REQUIRED TEXT, 
    user_id REQUIRED INTEGER REFERENCES users(id),
    category INTEGER REFERENCES categories(id),
    date_created TIMESTAMP default now(),
    due_date TIMESTAMP,
    priority INTEGER REFERENCES priorities(id),
    lists REQUIRED INTEGER REFERENCES lists(id),
    status INTEGER REFERENCES statuses(id),
    description TEXT
);

CREATE TABLE tasks_categories (
    id SERIAL PRIMARY KEY
    task_id INTEGER REFERENCES task(id),
    category_id INTEGER REFERENCES category(id)
);