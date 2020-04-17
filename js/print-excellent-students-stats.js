$(document).ready(function () {
    load();
});

function load() {
    jQuery.ajax({
        url: '/excellentStudents',
        method: 'get',
        dataType: 'json',
        success: function (json) {
            json.forEach(student => {
                let tr = ($("<tr></tr>"));
                let name = ($("<td></td>")).text(student.student_name+' '+student.patronymic+' '+student.surname);
                let stClass = ($("<td></td>")).text(student.class_num+'-'+student.class_char);
                tr.append(name).append(stClass);
                $(".table-body").append(tr);
            });
            let today = new Date();
            let displayedDate = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
            $("#date-doc").text(displayedDate);

        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}