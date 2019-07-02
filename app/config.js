module.exports = {
  CONSTANTS: {
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    CRYPTO_VECTOR: process.env.CRYPTO_VECTOR,
    HTTP_CODE: {
      OK: 200,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      BAD_GATEWAY: 502
    }
  }
};
