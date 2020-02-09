import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  console.log("log-test as log on 02052000");
  console.warn("log-warn as log  on 02052000");
  console.error("log-error as log tresting ");
  response.send("Hello from FRC 5414..!!!!");
});
//my-project.firebaseapp.com/event/123/
//https://scouting-draft-test.firebaseio.com/students/0
//target URL : https://us-central1-scouting-draft-test.cloudfunctions.net/showStudent/student/1
exports.showStudent = functions.https.onRequest((req, res) => {
  const params = req.url.split("/");
  const studentId = params[2];
  return admin
    .database()
    .ref("students/" + studentId)
    .once("value", snapshot => {
      const student = snapshot.val();
      res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>${student.name}</title>
                </head>
                <body>
                    <h1>Student Name : [${student.name}] - Status [${student.status}]</h1>
                </body>
            </html>`);
    })
    .catch(err => console.error("error"))
    .then(() => console.log("this will succeed"));
});

exports.showStudent2 = functions.https.onRequest((req, res) => {
  const params = req.url.split("/");
  const studentId = params[2];
  return admin
    .database()
    .ref("students/" + studentId)
    .once("value", snapshot => {
      const student = snapshot.val();
      res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>${student.name}</title>
                </head>
                <body>
                    <h1>Student Name : [${student.name}] - Status [${student.status}]</h1>
                </body>
            </html>`);
    })
    .catch(err => console.error("error"))
    .then(() => console.log("this will succeed"));
});

exports.showStudents = functions.https.onRequest((req, res) => {
  const temp = admin
    .database()
    .ref("students")
    .once("value");
  temp
    .then(snap => {
      console.info(snap.val());
      // res.send(snap.val());
    })
    .catch(() => console.error("error"));

  console.log("showStudents>>temp>>" + temp);
  return res.status(200).send("text");
});

exports.showStudents2 = functions.https.onRequest(async (req, res) => {
  const temp = await admin
    .database()
    .ref("students")
    .once("value");

  console.log("showStudents2" + temp);
  return res.status(200).send(temp);
});

exports.getAllByType = functions.https.onRequest(async (req, res) => {
  const params = req.url.split("/");
  const domainType = params[1];
  const temp = await admin
    .database()
    .ref(domainType)
    .once("value");

  console.log("getAllByType | domainType >> " + domainType);
  return res.status(200).send(temp);
});

exports.GetSingleByTypeAndId = functions.https.onRequest(async (req, res) => {
  const params = req.url.split("/");
  const domainType = params[1];
  const domainEntityId = params[2];
  const temp = await admin
    .database()
    .ref(domainType.concat("/", domainEntityId))
    .once("value");

  console.log("GetSingleByTypeAndId | domainType >> " + domainType);
  return res.status(200).send(temp);
});

//https://scouting-draft-test.firebaseio.com/match-data/ftcmp/001-2714
//https://scouting-draft-test.firebaseio.com/match-data/ftcmp/001-*
exports.GetMatchData = functions.https.onRequest(async (req, res) => {
  const params = req.url.split("/");
  const competitionId = params[1];
  const EventId = params[2];

  console.log("GetMatchData | EventId-data >> " + EventId);

  const temp = await admin
    .database()
    .ref("match-data/".concat(competitionId))
    .orderByKey()
    .startAt(EventId)
    .endAt(EventId.concat("uf8ff"))
    .once("value");

  //TODO : filter on EventId as string widecard matching
  console.log("GetMatchData | match-data >> " + competitionId);
  return res.status(200).send(temp);
});

//https://scouting-draft-test.firebaseio.com/match-data/ftcmp/001-2714
//https://scouting-draft-test.firebaseio.com/match-data/ftcmp/001-*
exports.GetMatchDataByTeamAndCompetition = functions.https.onRequest(
  async (req, res) => {
    const params = req.url.split("/");
    const competitionId = params[1];
    const TeamId = params[2];

    console.log("GetMatchDataByTeam | TeamId-data >> " + TeamId);

    const temp = await admin
      .database()
      .ref("match-data/".concat(competitionId))
      // .orderByKey()
      .orderByChild("team_num")
      .equalTo(TeamId)
      .once("value");

    //TODO : filter on EventId as string widecard matching
    console.log("GetMatchDataByTeam | TeamId-data >> " + TeamId);
    return res.status(200).send(temp);
  }
);
