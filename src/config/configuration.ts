export default () => ({
  database: {
    url: process.env.MONGO_URI,
    name: process.env.DATABASE_NAME
  }
})