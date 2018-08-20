$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyADG7V_vSHwL39zs5XKzgEN3nZj85hpnPQ",
        authDomain: "traindb-5a80d.firebaseapp.com",
        databaseURL: "https://traindb-5a80d.firebaseio.com",
        projectId: "traindb-5a80d",
        storageBucket: "traindb-5a80d.appspot.com",
        messagingSenderId: "501267940253"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //---------------------------------------------------------------------------
    var givenFirstTrainTime = "09..00";
    var givenFrequencyTrain = "00:15";

    var t = moment(givenFirstTrainTime, 'HH:mm');
    var t2 = moment('09:00', 'HH:mm'); //this is converted into a moment object
    var t3 = moment.duration(givenFirstTrainTime, 'hours');
    var t4 = moment.duration(givenFrequencyTrain, 'hours');

    console.log(moment.duration(t3 + t4).humanize() + ' between trains');

    var pruebaTiempo = moment(t3).add(15, 'minutes').format("hh:mm");

    console.log(pruebaTiempo);


    //---------------------------------------------------------------------------



    //---------------------------------------------------------------------------

    database.ref().on("child_added", function (childsnapshot) {
        var dbTrainName = childsnapshot.val().trainName;
        var dbDestination = childsnapshot.val().destination;
        var dbFirstTrainTime = childsnapshot.val().firstTrainName;
        var dbFrequency = childsnapshot.val().frequency;

        var currentTime = moment();

        $("#trainData").append(`<tr>
        <th scope="row">${dbTrainName}</th>
        <td>${dbDestination}</td>
        <td>${dbFirstTrainTime}</td>
        <td>${dbFrequency}</td>
        <td>${currentTime}</td>
        </tr>`)
    })

    $("#submitbtn").click(function () {
        event.preventDefault();
        var newTrainName = $("#trainName").val().trim();
        console.log(newTrainName);
        var newDestination = $("#destination").val().trim();
        console.log(newDestination)
        var newFirstTrainTime = $("#firstTrainTime").val().trim();
        console.log(newFirstTrainTime)
        var newFrequency = $("#frequency").val().trim();
        console.log(newFrequency);

        //This is sending data to firebase
        database.ref().push({
            trainName: newTrainName,
            destination: newDestination,
            firstTrainName: newFirstTrainTime,
            frequency: newFrequency
        })

        $(".form-control").val("");
    })

});