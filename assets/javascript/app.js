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
// firebase.analytics();


// Create a variable to reference the database.
var database = firebase.database();
// Initial Values
var trainName = "";
var destination = "";
var firstDeparture = "";
var frequency = 0;
var minutesAway = null;
console.log(minutesAway);
// Capture Button Click
$("#submitbtn").on("click", function (event) {
    event.preventDefault();
    trainName = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    arrivalTime = $("#arrivalTime").val().trim();
    firstDeparture = $("#inputFirstDeparture").val().trim();
    frequency = $("#inputFrequency").val().trim();


    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstDeparture: firstDeparture,
        arrivalTime: arrivalTime,
        frequency: frequency,
        minutesAway: minutesAway
    });
    
    doMath();
    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstDeparture),
        $("<td>").text(arrivalTime),
        $("<td id='freq'>").text(frequency),
        $("<td id='minutes'>").text(minutesAway)

    );

    

    $("#trainList").append(newRow);
    
    $("#freq").text(frequency);
    $("#minutes").text(minutesAway);




});



    var doMath = function () {

    console.log(frequency);
    // var tFrequency = 3; use global variable
    //var firstDeparture = "03:30";
    var firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");
    console.log(firstDepartureConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    //difference between the times
    var diffTime = moment().diff(moment(firstDepartureConverted), "minutes");
    console.log("Difference in Times: " + diffTime);

    //Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log(remainder);

    //minute until train arrival
    var minutesAway = frequency - remainder;
    console.log("Minutes until train arrival: " + minutesAway);

    //next train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

};