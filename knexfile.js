// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'codequester'
    },
    debug: true,
    pool: {
      min:1,
      max:1
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DB_key,
    migrations: {
      tableName: 'knex_migrations'
    },
    pool: {
      min: 1,
      max: 1
    }
  }

};
