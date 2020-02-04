import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  console.log("log-test as log");
  console.warn("log-warn as log");
  console.error("log-error as log");
  response.send("Hello from FRC 5414.. we are going to win!!!!");
});

export const getStudent = functions.https.onRequest((request, response) => {
  console.info("getStudent - begin");
  db.collection("scouting-draft-test")
    .doc("students")
    .get()
    .then(snapshot => {
      response.send(snapshot.data());
    })
    .catch(error => {
      response.status(500).send("something went wong!");
    });
});
