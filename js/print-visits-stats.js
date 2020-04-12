$(document).ready(function () {
    load();
});

function load(){
    jQuery.ajax({
        //TODO send request to browser
        url: '',
        method: 'get',
        dataType: 'json',
        success: function(json){
            let allLessons = json.allLesoons;
            let allMissed = json.allMissed;
            let illMissed = json.illMissed;
            let missedPercent = (allMissed/allLessons).toFixed(2);
            let illMissedPercent = (illMissed/allMissed).toFixed(2);
            let allLessonsNum = ($("<td colspan=\"2\"></td>").text(allLessons));
            let allMissedNum = ($("<td></td>")).text(allMissed);
            let allMissedPer = ($("<td></td>")).text(missedPercent);
            let illMissedNum = ($("<td></td>")).text(illMissed);
            let illMissedPer = ($("<td></td>")).text(illMissedPercent);

            $("#all-lessons").append(allLessonsNum);
            $("#all-missed").append(allMissedNum).append(allMissedPer);
            $("#ill-missed").append(illMissedNum).append(illMissedPer);
            let today = new Date();
            let displayedDate = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
            $("#date-doc").text(displayedDate);

        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}