import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Student, Match } from "./student";

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

  console.log("GetMatchData | match-data >> " + competitionId);
  return res.status(200).send(temp);
});

exports.GetMatchDataByTeamAndCompetition = functions.https.onRequest(
  async (req, res) => {
    const params = req.url.split("/");
    const competitionId = params[1];
    const TeamId = params[2];

    console.log("GetMatchDataByTeamAndCompetition | TeamId-data >> " + TeamId);

    const temp = await admin
      .database()
      .ref("match-data/".concat(competitionId))
      // .orderByKey()
      .orderByChild("team_num")
      .equalTo(TeamId)
      .once("value");

    console.log("GetMatchDataByTeamAndCompetition | TeamId-data >> " + TeamId);
    return res.status(200).send(temp);
  }
);

exports.GetMatchDataByTeamForAllCompetitions = functions.https.onRequest(
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

exports.getAllStudentsToCsv = functions.https.onRequest(
  async (req, response) => {
    const studentsArray: Student[] = [];

    await admin
      .database()
      .ref("students")
      .once(
        "value",
        function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const key = childSnapshot.key;
            const childData = childSnapshot.val();
            studentsArray.push(
              new Student(key, childData.name, childData.status)
            );
          });
        },
        function(error2) {
          console.error(error2);
        }
      );

    try {
      const { Parser } = require("json2csv");
      const csv = new Parser(["key", "name", "status"]).parse(studentsArray);
      response.setHeader(
        "Content-disposition",
        "attachment; filename=students.csv"
      );
      response.set("Content-Type", "text/csv");
      response.status(200).send(csv);
    } catch (err) {
      console.error(err);
    }
    console.log("getAllStudentsToCsv - end");
  }
);

exports.getAllMatchesToCsv = functions.https.onRequest(
  async (req, response) => {
    const matches: Match[] = [];

    await admin
      .database()
      // .ref("match-data/".concat(competitionId))
      .ref("match-data/ftcmp")
      .once(
        "value",
        function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const childData = childSnapshot.val();
            matches.push(
              new Match(
                childData.team_num,
                childData.tele_CargoLPan1,
                childData.tele_CargoLPan2,
                childData.tele_CargoLPan3,
                childData.tele_CargoRPan1,
                childData.tele_CargoRPan2,
                childData.tele_CargoRPan3
              )
            );
          });
        },
        function(error2) {
          console.error(error2);
        }
      );

    try {
      const { Parser } = require("json2csv");
      const csv = new Parser([
        "team_num",
        "tele_CargoLPan1",
        "tele_CargoLPan2",
        "tele_CargoLPan3",
        "tele_CargoRPan1",
        "tele_CargoRPan2",
        "tele_CargoRPan3",
        "CargoLPanCount",
        "CargoRPanCount"
      ]).parse(matches);
      response.setHeader(
        "Content-disposition",
        "attachment; filename=match.csv"
      );
      response.set("Content-Type", "text/csv");
      response.status(200).send(csv);
    } catch (err) {
      console.error(err);
    }
    console.log("getAllMatchesToCsv - end");
  }
);

exports.getAllMatchesWithTargetValueToCsv = functions.https.onRequest(
  async (req, response) => {
    const matches: Match[] = [];

    await admin
      .database()
      // .ref("match-data/".concat(competitionId))
      .ref("match-data/ftcmp")
      .once(
        "value",
        function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const childData = childSnapshot.val();
            matches.push(
              new Match(
                childData.team_num,
                childData.tele_CargoLPan1,
                childData.tele_CargoLPan2,
                childData.tele_CargoLPan3,
                childData.tele_CargoRPan1,
                childData.tele_CargoRPan2,
                childData.tele_CargoRPan3
              )
            );
          });
        },
        function(error2) {
          console.error(error2);
        }
      );

    try {
      const { Parser } = require("json2csv");
      const csv = new Parser([
        "team_num",
        "tele_CargoLPan1",
        "tele_CargoLPan2",
        "tele_CargoLPan3",
        "tele_CargoRPan1",
        "tele_CargoRPan2",
        "tele_CargoRPan3",
        "CargoLPanCount",
        "CargoRPanCount"
      ]).parse(matches.filter(isLargerThanTwo));
      response.setHeader(
        "Content-disposition",
        "attachment; filename=match.csv"
      );
      response.set("Content-Type", "text/csv");
      response.status(200).send(csv);
    } catch (err) {
      console.error(err);
    }
    console.log("getAllMatchesToCsv - end");
  }
);

function isLargerThanTwo(element, index, array) {
  return element.CargoLPanCount >= 2;
}

exports.getAllMatchesWithTargetValueToCsv2 = functions.https.onRequest(
  async (req, response) => {
    const params = req.url.split("/");
    const limitValue = Number(params[1]);
    const matches: Match[] = [];

    await admin
      .database()
      // .ref("match-data/".concat(competitionId))
      .ref("match-data/ftcmp")
      .once(
        "value",
        function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const childData = childSnapshot.val();
            matches.push(
              new Match(
                childData.team_num,
                childData.tele_CargoLPan1,
                childData.tele_CargoLPan2,
                childData.tele_CargoLPan3,
                childData.tele_CargoRPan1,
                childData.tele_CargoRPan2,
                childData.tele_CargoRPan3
              )
            );
          });
        },
        function(error2) {
          console.error(error2);
        }
      );

    try {
      const { Parser } = require("json2csv");
      const csv = new Parser([
        "team_num",
        "tele_CargoLPan1",
        "tele_CargoLPan2",
        "tele_CargoLPan3",
        "tele_CargoRPan1",
        "tele_CargoRPan2",
        "tele_CargoRPan3",
        "CargoLPanCount",
        "CargoRPanCount"
      ]).parse(
        matches.filter(function(e) {
          return e.CargoLPanCount >= limitValue;
        })
      );
      response.setHeader(
        "Content-disposition",
        "attachment; filename=match.csv"
      );
      response.set("Content-Type", "text/csv");
      response.status(200).send(csv);
    } catch (err) {
      console.error(err);
    }
    console.log("getAllMatchesToCsv - end");
  }
);
//TODO
// 1) find the generic approach (seems working)
// 1.a) without specifiying the propertt list
// 2) how to GetMatchDataByTeamForAllCompetitions
