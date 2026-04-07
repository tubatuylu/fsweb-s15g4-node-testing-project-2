module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './data/hobiler_dev.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  testing: {
    client: 'better-sqlite3',
    connection: {
      filename: './data/hobiler_test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
