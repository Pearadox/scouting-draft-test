# scouting-draft-test

scouting draft

#tech stack#

1. firebase
2. node
3. firebase

#setup#

0. get the latest npm and node
1. npm install -g firebase-tools
1. firebase login
1. firebase init
1. npm install firebase-admin@latest firebase-functions@latest //get the latest code
   firebase deploy

https://console.firebase.google.com/u/0/project/scouting-draft-test/database/
https://console.firebase.google.com/u/0/project/scouting-draft-test/database/scouting-draft-test/data~2Fmatch-data

scouting-draft-test/data~2Fstudents
https://us-central1-scouting-draft-test.cloudfunctions.net/helloWorld
https://us-central1-scouting-draft-test.cloudfunctions.net/getStudent

https://firebase.google.com/docs/firestore/query-data/get-data

missing the package.json why it is ignored ??

[2008.02.08]

add showStudent http call

for example, target URL : https://us-central1-scouting-draft-test.cloudfunctions.net/showStudent/student/1

https://us-central1-scouting-draft-test.cloudfunctions.net/showStudents2/student

##ByType##

https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/current-match
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/devices
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/match-data
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/matches
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/rank
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/students
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/competitions
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/teams
https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/pit-data

[2008.02.09]

##GetSingleByTypeAndId##
https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/competitions/txcha
https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/teams/ftcmp
https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/match-data/ftcmp
https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/match-data/test

##GetMatchData##

//ByCompetitionIdAndMatchId
https://us-central1-scouting-draft-test.cloudfunctions.net/GetMatchData/gal/001-45

##GetMatchDataByTeamAndCompetition##
https://us-central1-scouting-draft-test.cloudfunctions.net/GetMatchDataByTeamAndCompetition/ftcmp/1255

#todo#

1. revisit the use-case in the existing app
2. webUI mockup
