interface MongooseOption {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  useCreateIndex: boolean;
  poolSize: number;
  socketTimeoutMS: number;
  useFindAndModify: boolean;
}

export const mongooseOptions: MongooseOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 10,
  socketTimeoutMS: 45000,
  useFindAndModify: false
};
