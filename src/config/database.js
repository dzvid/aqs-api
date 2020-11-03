/** Database configurations */
require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    underscoredAll: true,
  },
};
