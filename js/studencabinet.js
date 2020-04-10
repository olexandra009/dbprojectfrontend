window.jQuery = $;
window.$ = $;

/*------------------Listeners-----------------------*/
/*Left-menu navigation*/
$(document).on('click', '.ht', function () {
    removeClass();
    let htaskitem = document.getElementById('ht');
    let cabdiv = document.getElementById('mycabinet');
    htaskitem.classList.add('active');
    cabdiv.classList.add('hidden');
});

$(document).on('click', '.stcab', function () {
    removeClass();
    let cabitem = document.getElementById('stcab');
    let htdiv = document.getElementById('myhometask');
    cabitem.classList.add('active');
    htdiv.classList.add('hidden');
    getStudentInfo();
});
/*---------Month-calendar navigation--------*/
$(document).on('click', '.btn-month', function (e) {
    let identy = e.target.id;
    let month = identy.substring(1);
    let num_month = parseInt(month);
    let date = new Date();
    let year = date.getFullYear();
    if (num_month >= 9 && date.getMonth() < 5)
        year = year - 1;
    createWeek(getWeeksInMonth(num_month - 1, date.getFullYear()), num_month, year);
});
$(document).on('click', '#backtomonth', function () {
    $('#weekscal').empty();
    $('#calendar_header').empty();
    $('#calendar_header').text('Оберіть місяць:')
    document.getElementById('fstsem').classList.remove('hidden');
    document.getElementById('sndsem').classList.remove('hidden');

})
$(document).on('click', '.btn-week', function (e) {

    let year = $(this).data('year');
    let month = $(this).data('month');
    let day = $(this).data('day');
    let date = new Date(parseInt(year), parseInt(month), parseInt(day));
    // console.log(categoryId);
    let endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 6);
    createDayView(date, endDate);
})
/*-----------------*/


/*-----------------Functions--------------------*/
/*--------Creating calendar ---------*/

//return weeks numbers
function getWeeksInMonth(month, year) {
    var weeks = [],
        firstDate = new Date(year, month, 1), //the first date of month
        lastDate = new Date(year, month + 1, 0), //the last date of month
        numDays = lastDate.getDate(); //31 or 30 or 29 or 28
    var start = 1;
    var end = 7 - ((firstDate.getDay() + 6) % 7);//

    while (start <= numDays) {
        weeks.push({start: start, end: end});
        start = end + 1;
        end = end + 7;
        if (end > numDays) {
            end = end - numDays;
            weeks.push({start: start, end: end});
            break;
        }
    }
    return weeks;
}

//create week view
function createWeek(weekarray, month, year) {
    //hidden monthes
    document.getElementById('fstsem').classList.remove('hidden');
    document.getElementById('fstsem').classList.add('hidden');
    document.getElementById('sndsem').classList.remove('hidden');
    document.getElementById('sndsem').classList.add('hidden');
    $('#calendar_header').empty();
    $('#calendar_header').text('Оберіть тиждень:')
    //add html
    weekarray.forEach(week => {
        week['year'] = year;
        week['mstart'] = month;
        week['mend'] = (week['end'] < week['start']) ? month + 1 : month;
        $('#weekscal').append(_weekView(week));
    });
    $('#weekscal').append($(`<button id="backtomonth" class = 'btn my_btn btn-outline-success my-2 btn-lg btn-block'>`).text('Назад'))
}

/*------Create daily view-------*/
function createDayView(startperiod, endperiod) {
    $('#calendar_header').empty();
    $('#weekscal').empty();
    $('#dayscal').empty();
    //get ajax from server
    let testingObject = [{weekday: 'Понеділок', date: '16.04', subject: []}, {
        weekday: 'Вівторок',
        date: '17.04',
        subject: []
    }]
    testingObject.forEach(obj => $('#dayscal').append(_dairyView(obj)));

}

/*------------------------------------------*/
/*--------------Navigation------------------*/

/*remove class identification for left menu*/
function removeClass() {
    let cabitem = document.getElementById('stcab');
    let cabdiv = document.getElementById('mycabinet');

    let htaskitem = document.getElementById('ht');
    let htdiv = document.getElementById('myhometask');


    cabitem.classList.remove('active');
    htaskitem.classList.remove('active');

    htdiv.classList.remove('hidden');
    cabdiv.classList.remove('hidden');

}

/*------------------------------------------*/
/*---------------HTML building----------------*/
let _weekView = ({
                     start: start,
                     end: end,
                     mstart: mstart,
                     mend: mend,
                     year: year
                 }) => {
    if (start == end) return;
    if (start == 1) {
        let date = new Date(year, mstart - 1, start);
        console.log(date);
        if (date.getDay() != 1) {
            let lastMonth = new Date(year, mstart - 1, 0).getDate();
            console.log(lastMonth);
            let lastMonday = lastMonth - (date.getDay() - 2);
            console.log(lastMonday);
            if (date.getDay() == 0)
                lastMonday = lastMonth - 5;
            console.log(lastMonday);
            start = lastMonday;
            mstart = mstart - 1;
        }
    }
    if (mstart == 0) mstart = 12;
    if (mend == 13) mend = 1;
    if (mstart < 10) mstart = "0" + mstart;
    if (mend < 10) mend = "0" + mend;
    return $(`<button class = 'btn my_btn btn-week btn-outline-success my-2 btn-lg btn-block' data-year="${year}" data-day="${start}" data-month="${mstart}">`).text(start + '.' + mstart + '-' + end + '.' + mend);
};

let _dairyView = ({
                      weekday: weekday,
                      date: date,
                      subjects: array
                  }) => {
    let $daycontainer = $(`<div id="${weekday}" class="container day">`)
    let $dayheader = $(`<div class="table-header">`).text(weekday + " " + date);
    let $headerrow = $(`<div class="tr row"><div class="td subject">Предмет</div><div  class="td task">Домашнє завдання</div><div data-title="Оцінка" class= "td marks">Оцінка</div> <div data-title="Відвідування" class="td been">Відвідування</div> </div>`);
    $daycontainer.append($dayheader).append($headerrow);

    if (array == undefined || array.length == 0) {
        let $row = $(`<div class="tr row ">`);
        let $subj = $(`<div class="td subject">`);
        let $task = $(`<div class="td task">`);
        let $marks = $(`<div class="td marks">`);
        let $been = $(` <div class="td been">`);
        $row.append($subj).append($task).append($marks).append($been);
        $daycontainer.append($row);
        $daycontainer.append($row);
        $daycontainer.append($row);
        return $daycontainer.append($row);
    }
    let i = 1;
    array.forEach(subj => {   //можна добавити марк аррей і тоді в один стовпчик щоденника виставляти декілька оцінок
        //або зробити окреме поле для перегляду оцінок
        // subject =>> (id, name, task, mark, attend)
        let $row = $(`<div class="tr row " subject_id = '${subj.id}'>`);
        let $subj = $(`<div class="td subject">`).text(subj.name);
        let $task = $(`<div class="td task">`).text(subj.task);
        let $marks = $(`<div class="td marks">`).text(subj.mark);
        let $been = $(` <div class="td been">`).text(subj.attend);
        $row.append($subj).append($task).append($marks).append($been);
        $daycontainer.append($row);
        $daycontainer.append($row);
        $daycontainer.append($row);
    })
    return $daycontainer;
};

/*--------------------------------------------*/
//fills the info in the Мій Кабінет tab
function getStudentInfo(){
    $.ajax({
        url: "/getStudent",
        type: "GET",
        contentType: "application/json",
        success: function(student){
            $('#info_surname').html("Прізвище: " + student.surname);
            $('#info_name').html("Ім'я: " + student.student_name);
            $('#info_patronymic').html("По-батькові: " + student.patronymic);
            $('#info_birthday').html("Дата народження: " + student.birth_date.substr(0,10));
            $('#info_sex').html("Стать: " + student.sex);
            $('#info_address').html("Адреса: " + student.city + ", " + student.street + " " + student.building + "/" + student.apartment);
            $('#info_phones').html("Телефони: ");
            $('#info_privileges').html("Пільги: ");
            $('#info_studyingType').html("Тип навчання: " + student.studying_type);
        }
    });
}

window.onload = function(){ getStudentInfo(); };