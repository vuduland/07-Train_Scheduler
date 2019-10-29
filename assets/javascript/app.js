// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOKTmXu9Dfha1X2x8lFjFglpBIC-23qow",
    authDomain: "trainscheduler-73d81.firebaseapp.com",
    databaseURL: "https://trainscheduler-73d81.firebaseio.com",
    projectId: "trainscheduler-73d81",
    storageBucket: "trainscheduler-73d81.appspot.com",
    messagingSenderId: "1050094374908",
    appId: "1:1050094374908:web:2e92f24802c82a1a2fec79",
    measurementId: "G-X1ZFXCRX4Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Create a variable to reference the database.
let database = firebase.database();

// Initial Values
let trainName = "";
let destination = "";
let firstDeparture = null;
let arrivalTime = 0;
let frequency = 0;
let minutesAway = 0;
let newRow = {};
let newTrain = {};
// Capture Button Click
$("#submitbtn").on("click", function (event) {
    event.preventDefault();

    trainName = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstDeparture = $("#inputFirstDeparture").val().trim();
    frequency = $("#inputFrequency").val().trim();

    doMath();
    // Creates local "temporary" object for holding employee data
    newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstDeparture: firstDeparture,
        arrivalTime: moment(arrivalTime).format("hh:mm"),
        minutesAway: minutesAway
    };
    // Uploads train data to the database

    database.ref().push(newTrain);
    database.ref().on('child_added', function (snapshot) {
        trainName = snapshot.val().name;
        desination = snapshot.val().destination;
        frequency = snapshot.val().frequency;
        arrivalTime = snapshot.val().arrivalTime;
        minutesAway = snapshot.val().minutesAway;

        newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(arrivalTime),
            $("<td>").text(minutesAway)
        );
        return newRow;
    });
    $("#trainList").append(newRow);



});


let doMath = function () {

    let firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");

    //difference between the times
    let diffTime = moment().diff(moment(firstDepartureConverted), "minutes");

    //Time apart (remainder)
    let remainder = diffTime % frequency;

    //minute until train arrival
    minutesAway = frequency - remainder;

    //next train
    arrivalTime = moment().add(minutesAway, "minutes");


};