db.createUser({
  user: process.env.MONGO_APP_USER || "appuser",
  pwd: process.env.MONGO_APP_PASS || "app123",
  roles: [{ role: "readWrite", db: process.env.MONGO_INITDB_DATABASE }]
});
