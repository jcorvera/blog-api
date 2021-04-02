process.env.NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT: string = process.env.PORT || '8089';
export const HOST: string = process.env.HOST || 'localhost';
export const URI_MONGO_DB: string = process.env.URI_DB || 'mongodb://admin:password@127.0.0.1:27017/blog';
