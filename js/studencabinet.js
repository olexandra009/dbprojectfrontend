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
$(document).on('click','.marks', function(){
    showMarkView($(this))
});
$(document).on('click','.task', function(){
   let task= $(this).data('task');
   let div = $(`<div>`).text("Домашнє завдання: ");
    let cancel = $(`<button class="btn btn-outline-dark" type= "reset" id="cancel">`).text("Назад");
    let p = $(`<p>`).text(task);
   div.append(p).append(cancel);
   createWindow(div);
});

$(document).on('click', '#cancel', function () {
    $('#bacground_adding_parents').remove();
});
$(document).on('click', '.show_teacher', function () {
    let id = $(this).data('teacher-id');
   //todo get teacher info by teacher id
    createTeacherView(id);
});
/*-----------------Functions--------------------*/
function createTeacherView(id){
    data= {name: 'Іванова Ольга Вікторівна', phone: ['+38093939213', '+34949492112'], qualification: 'Wow'};
   let div = $(`<div>`);
    let cancel = $(`<button class="btn btn-outline-dark" type= "reset" id="cancel">`).text("Назад");
    let input_value =create_input_group('text', 'ПІБ', data.name, "", "","",true);
    let input_quality =create_input_group('text', 'Кваліфікація:', data.qualification, "", "","",true);
  div.append(cancel).append(input_value).append(input_quality);
    data.phone.forEach(p=> div.append(create_input_group('text', 'Телефони', p, '','','', true)))
 //   let input_value =create_input_group('text', 'ПІБ', data.name, "", "","","true");
    createWindow(div);
}
function showMarkView(a) {
    // todo get teacher name by id
    //  a.data('teacher-id')
    let value = (a.data('mark-value')==undefined)?'':a.data('mark-value');
    let comment = (a.data('mark-comment')==undefined)?'':a.data('mark-comment');
    let div = $(`<div>`);
    let input_value = create_input_group('number', 'Значення:', value, 'value', '','', true);
    let input_comment = create_input_group('text', 'Коментар:', comment, 'comment','','', true );
    //todo or make a-href and show info about teacher
    let div_techer =  create_input_group('text', 'Вчитель', 'тут має бути імя вчителя', '', '','', true);
    div_techer.addClass('show_teacher');
    div_techer.attr('data-teacher-id', a.data('teacher-id'));
    let div_btn = $(`<div class="btn-group">`);
    let cancel = $(`<button class="btn btn-outline-dark" type= "reset" id="cancel">`).text("Назад");
    div_btn.append(cancel);
    div.append(input_value).append(input_comment).append(div_techer).append(div_btn);
    createWindow(div);
}

function create_input_group(input_type, label, value, name, class_, checked, readonly,required){
    let group =$(`<div class="input-group mb-1">`);
    let pregroup = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let input = $(`<input type="${input_type}" value = "${value}"  name="${name}" class="form-control ${class_}">`);
    if(checked) input.attr('checked', 'true');
    if(readonly) input.attr('readonly', 'true');
    if(required) input.attr('required', 'true');
    return group.append(pregroup.append(span)).append(input);
}
function createWindow(innerItem){
    let back =$(` <div class = "backgr" id="bacground_adding_parents">`);
    let form = $(` <div class="forming" id="forming">`);
    $('.body').before(back.append(form.append(innerItem)));
}
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
    //todo get ajax from server
    // dairy marks, if it is last lesson of theme we need theme mark too, home task,

    // subject =>> (id, name, task, mark{value: , id: }, attend)
    let testingObject = [{weekday: 'Понеділок', date: '16.04.2019', subject: [{id:1,name:"Math", task:"2331+2321", mark: {value:10, id:11, teacher_id: 1, comment:'Hahaga'}, attend:''},
                                                                         {id:2,name:"English", attend:'H'},
                                                                         {id:3,name:"Sport", attend:''}]},
        {

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
                      subject: array
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
        $daycontainer.append($row.clone());
        $daycontainer.append($row.clone());
        return $daycontainer.append($row.clone());
    }
    let i = 1;
    array.forEach(subj => {
        // subject =>> (id, name, task, mark{value: , id: , teacher, comment}, attend)
        let $row = $(`<div class="tr row full_view " subject_id = '${subj.id}'>`);
        let $subj = $(`<div class="td subject">`).text(subj.name);
        let $task = $(`<div class="td task" data-task="${subj.task}">`).text(subj.task);
        let $marks;
        if(subj.mark!==undefined)
         $marks = $(`<div class="td marks" data-mark-comment="${subj.mark.comment}" data-teacher-id="${subj.mark.teacher}"
                        data-mark-id="${subj.mark.id}" data-mark-value="${subj.mark.value}"">`).text(subj.mark.value);
       else
         $marks = $(`<div class="td marks">`).text('');
        let $been = $(` <div class="td been">`).text(subj.attend);
        $row.append($subj).append($task).append($marks).append($been);
        $daycontainer.append($row);
        $daycontainer.append($row);
        $daycontainer.append($row);
    });
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