$(document).ready(function () {

    var SERVER_URL = "http://localhost:5095/getData";



    $(".show_date").datepicker({
        format: "yyyy-mm-dd"
    });

    $("#show_year").datepicker({
        format: " yyyy",
        viewMode: "years",
        minViewMode: "years"
    });

    $('#search_btn').click(function () {
        var year = $('#show_year').val();
        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();
        var customer_level = "shan_pro";
        var interval = "daily";


        $("#customer_level").children().each(function () {
            if($(this).attr("active")=="active"){
                customer_level = $(this).attr('id');
            }
        });
        $("#interval").children().each(function () {
            if($(this).attr("active")=="active"){
                interval = $(this).attr('id');
            }
        });


        SERVER_URL = SERVER_URL+'?year=' +year + '&start_date=' + start_date + '&end_date=' + end_date+'&interval='+interval+'&customer_level='+customer_level;
        console.log(SERVER_URL)
        injectData();

    });
    $('.dropdown-item').click(function (e) {
        e.preventDefault();
        console.log($(this).parent().attr('id')=='interval')
        $(this).attr("active", "active");
        $(this).siblings().attr("active",null);
        if($(this).attr('customer')) $('#dropdownMenu2').innerHTML=""+$(this).attr('id');
        if($(this).attr('interval')) $('#dropdownMenu').innerHTML=""+$(this).attr('id');
    });





function injectData(){
    $.get(SERVER_URL, function (record) {
        record = record.data;
        console.log(record)
        if (record !== null && !record.yearly) {
            var date = record.map(function (rec) {
                return rec.ccu_date;
            });
            var value = record.map(function (rec) {
                return rec.count;
            });
            // if (record !== null && record.yearly) {
            //     var date = record.map(function (rec) {
            //         return rec.MON;
            //     });
            //     var value = record.map(function (rec) {
            //         return rec.count;
            //     });
    


            var ctx = document.getElementById("mychart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: date,
                    datasets: [{
                        label: 'All Shan CCU Data',
                        data: value,
                        backgroundColor: [
                        ],
                        borderColor: [
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        }
    });}

});