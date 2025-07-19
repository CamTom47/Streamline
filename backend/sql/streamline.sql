\echo 'Delete and recreate streamline database? '
\prompt 'Press Enter to continue or Ctrl+C to cancel... '

DROP DATABASE streamline;
CREATE DATABASE streamline;

\connect streamline;

\i streamline-schema.sql
\i streamline-seed.sql

\echo 'Delete and recreate streamline_test database?'
\prompt 'Press Enter to continue or Ctrl+C to cancel...'

DROP DATABASE streamline_test;
CREATE DATABASE streamline_test;

\connect streamline_test;

\i streamline-schema.sql

