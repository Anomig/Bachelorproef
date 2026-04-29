// Plugin-config: zet de users-permissions JWT secret vanuit environment variables.
module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
})
