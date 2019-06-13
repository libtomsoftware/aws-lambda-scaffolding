const CONFIG = require("./config");
const STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;
const allowedOrigins = [
  "http://footy.local:3000",
  "http://localhost:3000",
  "http://localhost:3001"
];

function addHeaders(response, origin) {
  response.headers = {
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Credentials": "true"
  };

  if (allowedOrigins.includes(origin)) {
    console.error(
      `Origin ${origin} allowed, adding Access-Control-Allow-Origin to response headers...`
    );
    response.headers = Object.assign({}, response.headers, {
      "Access-Control-Allow-Origin": origin
    });
  } else {
    console.error(
      `Origin ${origin} not allowed, hence Access-Control-Allow-Origin not added to response headers...`
    );
  }
}

class Responder {
  rejectUnauthorized(response, origin) {
    response.statusCode = STATUS_CODE.UNAUTHORIZED;

    addHeaders(response, origin);

    response.send({
      error: "Unauthorized"
    });
  }

  rejectBadGateway(response, origin) {
    response.statusCode = STATUS_CODE.BAD_GATEWAY;

    addHeaders(response, origin);

    response.send({
      error: "Bad gateway"
    });
  }

  rejectConflict(response, origin) {
    response.statusCode = STATUS_CODE.CONFLICT;

    addHeaders(response, origin);

    response.send({
      error: "conflict"
    });
  }

  rejectNotFound(response, origin) {
    response.statusCode = STATUS_CODE.NOT_FOUND;

    addHeaders(response, origin);

    response.send({
      error: "Not found"
    });
  }

  rejectBadRequest(response, origin) {
    response.statusCode = STATUS_CODE.BAD_REQUEST;

    addHeaders(response, origin);

    response.send({
      error: "Bad request"
    });
  }

  reject(response, origin, statusCode) {
    response.statusCode = statusCode;

    addHeaders(response, origin);

    response.send();
  }

  send(response, origin, data, statusCode) {
    response.statusCode = statusCode || 200;

    addHeaders(response, origin);

    response.send(data);
  }
}

module.exports = new Responder();
