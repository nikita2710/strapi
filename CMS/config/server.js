module.exports = ({ env }) => ({
  host: env('HOST', '127.0.0.1'),
  port: env.int('PORT', 4040),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '3701ca9238532c00743c87c9f6236a0f'),
    },
  },
});
