"use strict";

//window.setInterval(fireApi, 15000);

//var lineChart = new Chartist.Line('#chartArea', {
//    labels: [],
//    series: [[]]
//},
//{
//    low: 19.0,
//    high: 19.06,
//    showArea: true
//});

var lineChart = new Chartist.Line('#chartArea', {
    labels: [],
    series: [[]]
},
    {
        low: 0,
        showArea: true
    });

var connection = new signalR.HubConnectionBuilder().withUrl("/chartHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ValueReceiver", function (chartValue) {
    if (chartValue && !isNaN(chartValue)) {
        lineChart.data.series[0].push(chartValue);
        lineChart.update();

        console.log('Chart value entered was ' + chartValue);

        document.getElementById("valueInput").value = "";
        document.getElementById("valueInput").focus();

        console.log('Input cleared and Ready');
    }    
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var strValue = document.getElementById("valueInput").value;

    var chartValue = parseFloat(strValue);

    connection.invoke("ValueSender", chartValue).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

$('#valueInput').keypress(function (e) {
    var key = e.which;
    if (key === 13)  // the enter key code
    {
        $('#sendButton').click();
        return false;
    }
}); 




//function fireApi() {

//    $.ajax({
//        type: "GET",
//        url: "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ZAR&apikey=UKHCKPYSU94IQMAQ",
//        dataType: "json",
//        success: function (result, status, xhr) {

//            var exchRate = result["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

//            if (exchRate) {
//                var chartValue = parseFloat(exchRate);                

//                connection.invoke("ValueSender", chartValue).catch(function (err) {
//                    return console.error(err.toString());
//                });
//            }

//            document.getElementById("valueInput").value = exchRate;            
//        },
//        error: function (xhr, status, error) {
//            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
//        }
//    });
//}