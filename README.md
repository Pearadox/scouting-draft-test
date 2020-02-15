# scouting-draft-test

[[_TOC_]]

## Scouting Draft - Use Cases

Scouting Draft Web Api handles

- get all for all entities (type :
  students,
  devices,
  competitions,
  rank,
  pit-data,
  matches,
  maatch-data,
  current-match)

- get single for all entities
- get single match result for specific competition and match
- get all match result for specific team in specfic competition
- [future] filter by given param (for example, HAB Level >= 2)
- [future] filter by given param (for example, anels/balls during SS (Auto), Cargo-Ship panels/balls during SS, Rocket scoring during SS)

## Tech-stacks

- firebase real-time database
- node
- firebase functions

## Installation

### For dev machine

- Recommended: just the latest node and npm, then open in PowerShell:

  ```powershell
  npm install -g firebase-tools
  firebase login
  firebase init
  npm install firebase-admin@latest firebase-functions@latest //get the latest code
  firebase deploy
  ```

- for testing purpose, recommended to create your own firebase project:

  ```powershell
  1) create new firebase

  2) export the data (as json .~10mb) from existing team DB -> pearadox-2019 https://console.firebase.google.com/u/0/project/pearadox-2019/database/pearadox-2019/data~2F

  3) for iinstance, I created my own instance called "scouting-draft-test"
  https://console.firebase.google.com/u/0/project/scouting-draft-test/database

  ```

## Sample Api example - for beginner

- Root Page : https://console.firebase.google.com/u/0/project/scouting-draft-test/overview
- RealTime DB: https://console.firebase.google.com/u/0/project/scouting-draft-test/database/scouting-draft-test/data~2Fmatch-data
- (for beginner) helloworld : https://us-central1-scouting-draft-test.cloudfunctions.net/helloWorld
- (for beginner) Get Single Student : https://us-central1-scouting-draft-test.cloudfunctions.net/getStudent

## Sample Api example - getAllByType()

- this will return all the reords by given type

  ```powershell

      GET /getAllByType/{EntityType}

  ```

- Root Page : https://console.firebase.google.com/u/0/project/scouting-draft-test/overview
- RealTime DB: https://console.firebase.google.com/u/0/project/scouting-draft-test/database/

- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/current-match
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/devices
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/match-data
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/matches
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/rank
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/students
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/competitions
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/teams
- https://us-central1-scouting-draft-test.cloudfunctions.net/getAllByType/pit-data

## Sample Api example - GetSingleByTypeAndId()

- this will return a single reord by given type and id

  ```powershell

      GET /GetSingleByTypeAndId/{EntityType}/{EntityId}

  ```

- Root Page : https://console.firebase.google.com/u/0/project/scouting-draft-test/overview
- RealTime DB: https://console.firebase.google.com/u/0/project/scouting-draft-test/database/

- https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/competitions/txcha
- https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/teams/ftcmp
- https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/match-data/ftcmp
- https://us-central1-scouting-draft-test.cloudfunctions.net/GetSingleByTypeAndId/match-data/test

## Sample Api example - GetMatchData()

- this will return all match reord (~6 matches in 2019) by given competition {Competition-Id} and event-Id {match-id-prefix} (\*)
- (\*) : it is doing the string matching as wide-card for any match name matching as prefix.

  ```powershell

      GET /GetSingleByTypeAndId/{EntityType}/{EntityId}

  ```

- Root Page : https://console.firebase.google.com/u/0/project/scouting-draft-test/overview
- RealTime DB: https://console.firebase.google.com/u/0/project/scouting-draft-test/database/
- https://us-central1-scouting-draft-test.cloudfunctions.net/GetMatchData/gal/001-45

## Sample Api example - GetMatchDataByTeamAndCompetition()

- this will return all match reord for a given team and in a given competition {Competition-Id}

  ```powershell

      GET /GetMatchDataByTeamAndCompetition/{Competition-Id}/{TeamId}

  ```

- Root Page : https://console.firebase.google.com/u/0/project/scouting-draft-test/overview
- RealTime DB: https://console.firebase.google.com/u/0/project/scouting-draft-test/database/
- https://us-central1-scouting-draft-test.cloudfunctions.net/GetMatchDataByTeamAndCompetition/ftcmp/1255

## TODO

- revisit the use-case in the existing app
- webUI mockup

## [Junk-below]

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
