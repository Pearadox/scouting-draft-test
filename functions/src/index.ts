import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Student } from "./student";

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

exports.getAllStudentsToCsv = functions.https.onRequest(
  async (req, response) => {
    let studentsArray: Student[] = [];

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
exports.getAllByTypeToCsv2 = functions.https.onRequest(
  async (req, response) => {
    const params = req.url.split("/");
    const domainType = params[1];

    let tempStudent: Student;
    let studentsArray: Student[] = [];

    console.info("getAllByTypeToCsv | 1 >> ##############################");
    await admin
      .database()
      .ref(domainType)
      .once(
        "value",
        function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const key = childSnapshot.key;
            const childData = childSnapshot.val();
            tempStudent = new Student(key, childData.name, childData.status);
            studentsArray.push(tempStudent);
            // console.info(
            //   "key>" +
            //     key +
            //     ";childData.name>" +
            //     childData.name +
            //     ";childData.status>" +
            //     childData.status
            // );
          });
        },
        function(error2) {
          console.error(error2);
        }
      );

    console.info(
      "getAllByTypeToCsv | studentsArray.length >>" + studentsArray.length
    );

    // #1 Mapping the array to an object...
    const obj = {};
    studentsArray.forEach(item => {
      obj["key"] = item.key;
      obj["name"] = item.name;
      obj["status"] = item.status;
    });

    try {
      // #2 Converting the object to JSON...
      const jsonStudents = JSON.stringify(studentsArray);
      console.log("getAllByTypeToCsv | jsonStudents >>" + jsonStudents);
      // const json2csv = require("json2csv");

      // const temp = await admin
      //   .database()
      //   .ref(domainType)
      //   .once("value");
      // const fields = ["name", "status"];
      // const opts = { fields };

      // try {
      //   console.info("getAllByTypeToCsv | csv2.0 - temp>> " + temp.val);
      //   console.info(
      //     "getAllByTypeToCsv | csv2.1 - temp.toString())>> " + temp.val.toString()
      //   );
      //   // const csv2 = json2csv.parse(temp.val, opts);

      //const csv2 = json2csv(json, { fields: ["id", "name", "status"] });

      const { Parser } = require("json2csv");

      const fields3 = ["car", "price", "color"];
      const myCars = [
        {
          car: "Audi",
          price: 40000,
          color: "blue"
        },
        {
          car: "BMW",
          price: 35000,
          color: "black"
        },
        {
          car: "Porsche",
          price: 60000,
          color: "green"
        }
      ];

      const json2csvParser3 = new Parser({ fields3 });
      const csv3 = json2csvParser3.parse(myCars);

      console.log("myCars>>>>>>>>" + myCars);
      console.log("csv3>>>>>>>>" + csv3);

      //const { Parser } = require("json2csv");
      const fields = ["key", "name", "status"];
      const json2csvParser = new Parser({ fields });
      const csv2 = json2csvParser.parse(studentsArray);
      console.log(csv2);

      console.info("getAllByTypeToCsv | studentsArray>> " + studentsArray);
      console.info("getAllByTypeToCsv | csv2>> " + csv2);
      response.setHeader(
        "Content-disposition",
        "attachment; filename=report.csv"
      );
      response.set("Content-Type", "text/csv");
      response.status(200).send(csv2);
    } catch (err) {
      console.error(err);
    }
    console.log("getAllByTypeToCsv | domainType >> " + domainType);
  }
);
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
