// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstDeparture = null;
var arrivalTime = 0;
var frequency = 0;
var minutesAway = 0;

// Capture Button Click
$("#submitbtn").on("click", function (event) {
    event.preventDefault();

    trainName = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstDeparture = $("#inputFirstDeparture").val().trim();
    frequency = $("#inputFrequency").val().trim();


    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstDeparture: firstDeparture,
        arrivalTime: arrivalTime,
        minutesAway: minutesAway
    };


    // Uploads train data to the database
    doMath();
    database.ref().push(newTrain);
    database.ref().on("child_added", function () {

        $("#trainList").append(newRow);
    });

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(firstDeparture),
        $("<td>").text(arrivalTime),
        $("<td>").text(minutesAway)

    );



    // database.ref().push({
    //     trainName: trainName,
    //     destination: destination,
    //     frequency: frequency,
    //     firstDeparture: firstDeparture,
    //     arrivalTime: arrivalTime,
    //     minutesAway: minutesAway
    // });



    // console.log(snapshot.val());
    // console.log(snapshot.val().trainName);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().firstDeparture);
    // console.log(snapshot.val().arrivalTime);
    // console.log(snapshot.val().frequency);
    // console.log(snapshot.val().minutesAway);
});


var doMath = function () {

    console.log(frequency);

    var firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");
    console.log(firstDepartureConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    //difference between the times
    var diffTime = moment().diff(moment(firstDepartureConverted), "minutes");
    console.log("Difference in Times: " + diffTime);

    //Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log("remainder: " + remainder);

    //minute until train arrival
    minutesAway = frequency - remainder;
    console.log("Minutes until train arrival: " + minutesAway);

    //next train
    arrivalTime = moment().add(minutesAway, "minutes");
    console.log("Arrival time: " + moment(arrivalTime).format("hh:mm"));

};