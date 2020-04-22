$(document).ready(function () {
    getYears();
    //load();
});

function load(year) {
    jQuery.ajax({
        url: '/excellentStudents/'+year,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            json.forEach(student => {
                let tr = ($("<tr></tr>"));
                let name = ($("<td></td>")).text(student.student_name+' '+student.patronymic+' '+student.surname);
                let stClass = ($("<td></td>")).text(student.class_number+'-'+student.class_char);
                tr.append(name).append(stClass);
                $(".table-body").append(tr);
            });
            let today = new Date();
            let displayedDate = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
            $("#date-doc").text(displayedDate);

        },
        error: function (xhr) {
            //alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

function getYears(){
    jQuery.ajax({
        url: '/getYears',
        method: 'get',
        dataType: 'json',
        success: function (json) {
            $(".dropdown-menu").empty();
            json.forEach(year => {
                let tr = ($("<a class=\"dropdown-item\" href=\"#\"></tr>")).text(year.start_year+'-'+(year.start_year+1));
                $(".dropdown-menu").append(tr);
                $(document).on('click', '.dropdown-item', function () {
                   let sel = $(this).text().substring(0,4);

                   load(sel);
                });
            });

        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}