const newLocal = `${process.env.SECRET_MONGODB_API_KEY}`;
module.exports = {
  MongoDB: {
    url: newLocal
  },
  NextJS: {
    env: {
      NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    }
  },
};
