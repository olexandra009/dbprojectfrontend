$(document).ready(function () {
    load();
});

function load() {
    jQuery.ajax({
        //TODO send request to browser
        url: '',
        method: 'get',
        dataType: 'json',
        success: function (json) {
            let arrSum = 0;
            let leftSum = 0;
            let allSum = 0;
            json.forEach(info => {
                let arr = info.arrived;
                let lft = info.left;
                let now = info.current;
                arrSum+=arr;
                leftSum+=lft;
                allSum+=now;
                let tr = ($("<tr></tr>"));
                let classNum = ($("<th></th>")).text(info.classNum);
                let arrNum = ($("<td></td>")).text(arr);
                let lftNum = ($("<td></td>")).text(lft);
                let curNum = ($("<td></td>")).text(now);
                tr.append(classNum).append(arrNum).append(lftNum).append(curNum);
                $(".table-body").append(tr);
            });
            let tr = ($("<tr></tr>"));
            let head = ($("<th></th>")).text("Загалом");
            let arrNums = ($("<td></td>")).text(arrSum);
            let lftNums = ($("<td></td>")).text(leftSum);
            let curNums = ($("<td></td>")).text(allSum);
            tr.append(head).append(arrNums).append(lftNums).append(curNums);
            $(".table-body").append(tr);

            let today = new Date();
            let displayedDate = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
            $("#date-doc").text(displayedDate);

        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}