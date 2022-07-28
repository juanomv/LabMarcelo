const admin = require("firebase-admin");

const serviceAccount = require("./marcelo-spinola-lb-caf68-firebase-adminsdk-jkfdl-69930643f5.json");

module.exports = firebaseAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
