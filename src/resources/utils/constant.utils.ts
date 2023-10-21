import cors from "cors";

const allowedOrigins = ['http://localhost:3000', "https://resolutio.ai"];
export const corsOptions: cors.CorsOptions = {
    //origin: allowedOrigins
    origin: "*"
};

//Status Codes
export const BAD_REQUEST = 400;
export const OK = 200;
export const CREATED = 201;
export const NOT_FOUND = 404;
export const UNAUTHORIZED = 401;
export const INTERNAL_SERVER_ERROR = 500;
export const SERVICE_UNAVAILABLE = 503;
export const PERMANENT_REDIRECT = 301;
export const TEMPORARY_REDIRECT = 301;

//Numbers
export const ONE = 1;
export const MINUSONE = -1;
export const TWO = 2;
export const ZERO = 0;
export const HUNDRED = 100;
export const BEARER = "bearer";