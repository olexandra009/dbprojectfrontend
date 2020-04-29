//to parse url params (currently only subject ID)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const subjectID=urlParams.get('id');
/*-------------------------------------------------*/
//TODO get information from server about
// - student attend this subject
// - information about subject
// TODO add id to marks and attend cell to make them editable


let data_names = [{id: '1', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},
                  {id: '2', last_name: "Surname", first_name: "Name1", second_name: "Pobatkovi"},
                  {id: '3', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},];



let special_data_marks = [{name: "To be or not to be", type: "poem", marks: [{id:'1', visible:'false', mark_id: '0', value:5, comment:"once more chance"}, {id:'2',value: 10,mark_id: '0', visible:'true' }]},
                          {name: "Test12", type: "test", marks: [{id:'1', value:'12',mark_id: '0', visible:'true'}, {id:'3', value:'6',mark_id: '0', visible: "true"}]}];

let them_marks = [{id: '1', theme: 'theme1', value: '10', visible:'false'},
                  {id: '2', theme: 'theme1', value: '8', visible:'true'},
                  {id: '3', theme: 'theme1', value: '9', visible:'true'},];

let attend = [
    {date: new Date(2019, 4, 23), n_attend_id : []},
    {date: new Date(2019, 4, 24), n_attend_id : [1]},
    {date: new Date(2019, 4, 25), n_attend_id : [3]},
    {date: new Date(2019, 4, 26), n_attend_id : [2,3]},
    {date: new Date(2019, 4, 27), n_attend_id: [1,3]},
    {date: new Date(2019, 4, 28), n_attend_id : [3]}
];

let end_marks =[{type: 'semestr1', marks:[{id:1, value: '11', visible:'true', comment:'here'},
                                          {id:2, value: '8', visible:'true', comment:'here'},
                                          {id:3, value: '8', visible:'true', comment:'here'}]},
                {type: 'dpa', marks:[{id:1, value: '11', visible:'true', comment:'here'},
                                     {id:2, value: '10', visible:'true', comment:'here'},
                                     {id:3, value: '8', visible:'true', comment:'here'}]} ];

getNamesOfStudentOfThisSubject();




function getNamesOfStudentOfThisSubject(){
    $.ajax({
        url: "/getStudentsBySubject/"+subjectID,
        type: "GET",
        success: function(students){
            data_names = students;
            console.log(students);
        }
    });
};


/******Check is it is when we get info subject exchange*****/
//TODO THIS FLAG SHOW WHAT IS THIS SUBJECT
let exchangeSubject = false;


/*
/*----hover in mark and attend table can throw exception but everything work ----*/

$(document).on('mouseenter', 'td', function () {

    let id = $(this).data('column');
    let query = "td[data-column="+id+"]";
    $(query).addClass('hovered');
    $("."+( $($(this).parent()).attr('class').split(/\s+/)[[0]])).removeClass('hovered').addClass('hovered');
    $(this).addClass('thovered');
}) ;
$(document).on('mouseleave', 'td', function () {
    let id = $(this).data('column');
    let query = "td[data-column="+id+"]";
    $(query).removeClass('hovered');
    $("."+( $($(this).parent()).attr('class').split(/\s+/)[[0]])).removeClass('hovered');

    $(this).removeClass('thovered');
}) ;
/*------------------Listeners-----------------------*/
//flags for buttons
let createLesson =false;
let createTheme = false;
let thememarkflag = false;
let endmarkflag = false;

$(document).on('click', '#subj_info', function () {
    //TODO add information about subject name
    nextMenu('subj_info');
    createThemeDiv();
});

$(document).on('click', '#subj_attend', function () {
    nextMenu('subj_attend');
    createPeriodForm();
});

$(document).on('click', '#subj_marks', function () {
    nextMenu('subj_marks');
    createMarksView();
});

$(document).on('click', '#back_to_cabinet', function () {
    window.location.href='./mycabinet';
});


$(document).on('click', '#add_theme', function () {
    if(!createTheme){
        createThemeDivAdding();
        createTheme = true;
        return;
    }
    $('#form').remove();
    createTheme = false;
});
$(document).on('click', '#add_lesson', function () {
    if(!createLesson) {
        let id = $(this).data('id');
        createLessonDivAdding(id);
        createLesson=true;
        return;
    }
    $('#form_l').remove();
    createLesson = false;
});

$(document).on('click', '.theme_list', function (e) {
    if(e.target.type === "submit")return;
    let id = $(this).data('id');
    createViewLessonsFromThemeById(id);
});

$(document).on('click', '.edit_theme', function () {
    createEditionThemeView($(this));
});
$(document).on('click', '.delete_theme', function () {
    $.ajax({
        url: "/deleteTopic",
        type: "DELETE",        
        data: {topic_id: $(this).data('id'), subject_id: urlParams.get('id')},
        success: function(res){
            location.reload();
        }
    });
});
$(document).on('click', '.edit_lesson', function () {
    createEditionLessonView($(this));
});
$(document).on('click', '.delete_lesson', function () {
    $.ajax({
        url: "/deleteLesson",
        type: "DELETE",        
        data: {lesson_id: $(this).data('id'), subject_id: urlParams.get('id')},
        success: function(res){
            createViewLessonsFromThemeById("" + res[0].topic_id);
        }
    });
});
$(document).on('click', '#back, #cancel', function(){
    $("#bacground_adding_parents").remove()
});

$(document).on('click', '#add_attend_column', function(){
    let input_date = create_input_group('date', 'Дата:', '', 'date_creating');
    let button_ok = $(`<button class="btn btn-outline-dark" id="ok">`).text('Створити');
    let button_cancel = $(`<button class="btn btn-outline-dark" id="cancel">`).text('Скасувати');
    let div = $(`<div>`);
    let btn_div = $(`<div class="btn-group">`);
    btn_div.append(button_ok).append(button_cancel);
    div.append(input_date).append(btn_div);
    createWindow(div);
});
$(document).on('click', '#ok', function(){
    let date =  document.getElementsByName('date_creating')[0].valueAsDate;
    //todo send to server that there values of attend-dates
    createNewAttendColumn(date);
    $("#bacground_adding_parents").remove();
}
              );

$(document).on('click', '#add_new_column_mark', function(){
    let data = ["Спеціальні оцінки", "Поточні оцінки", "Підсумкові"];
    let input=   create_selected_input(data, "Тип", "select_type_of_marks", "Оберіть тип оцінки");
    let div = $(`<div>`);
    div.append(input);
    createWindow(div);
});

$(document).on('click', "#create_column_mark", function () {
    if($(this).data('mark-special') != undefined) {
        let type = document.getElementsByName('marks_work_type')[0].value;
        let name = document.getElementsByName('marks_name')[0].value;
        createNewSpecialMarkColumn(type, name);
        $("#bacground_adding_parents").remove();
        return;
    }
    else if($(this).data('mark-diary') != undefined) {
        let date = document.getElementsByName('date_mark')[0].valueAsDate;
        createNewDairyMarkColumn(date);
    } else{
        let date = document.getElementsByName('marks_type')[0].value;
        createNewEndMarkColumn(date);
    }
    // noinspection JSJQueryEfficiency
    $("#bacground_adding_parents").remove();
});


$(document).on('change', '#select_type_of_marks', function(){
    $(`#special_mark_creating`).remove();
    $(`#diary_mark_creating`).remove();
    $('#end_mark_creating').remove();
    if($(this).children("option:selected").val() == 'Спеціальні оцінки')
        $(`#forming`).append(createSpecialMarks());
    else if($(this).children("option:selected").val() == 'Поточні оцінки')
        $(`#forming`).append(createDiaryMarks());
    else
        $(`#forming`).append(createEndMarks());

});
$(document).on('click', '#create_attend_by_period', function () {
    createAttendByPeriod();
});
$(document).on('click', '#create_marks_by_period', function(){
    //todo get theme value
    // send theme value
    let topic = $('#theme_id_select').val();
    if(topic)
        createMarksByPeriod(topic);
});
function last(array) {
    return array[array.length - 1];
}
$(document).on('click', 'tr#table_caption > td[data-type="dairy"]', function(){
    //todo show asking delete
});

$(document).on('click', 'tr#table_caption > td[data-type="special"]', function(){
    //todo show asking delete
    // rename and change type
});
$(document).on('click', 'tr#table_caption > td[data-type="end"]', function(){
    //todo (if it is not semestr or year)
    // show asking delete and edit name
});


$(document).on('click', 'td[data-type="dairy"], td[data-type="special"], td[data-type="end"]', function(){
    //todo check if the end mark is editable (if not let to edit comment and visible)
    if($(this).parent().attr('id') == "table_caption") return;
    showMarkEditView($(this));
});
$(document).on('click', 'td[data-type="theme"]', function(){
    //todo check if the end mark is editable (if not let to edit comment and visible)
    if($(this).parent().attr('id') == "table_caption") return;
    showMarkPartEditView($(this));
});

$(document).on('click', 'td[data-type="attend"]', function(){
    if($(this).parent().attr('id') == "table_caption"){
        //todo show asking delete
        return;
    }
    if( $(this).text() !=='H') {
        //todo send to server date id and subject
        // wait for answer and add id of cell to id
        $(this).text('H');
    } else {
        //todo send to server date id and subject
        // wait for answer of successful change
        $(this).text('');
    }

} );

$(document).on('click', '#show_marks_theme', function () {
    let theme= $('#theme_id_select').children("option:selected").val();
    $('#fst_table').removeClass('col-md-10').removeClass('col-md-8').removeClass('col-md-12').removeClass('col-md-6');
    if(endmarkflag && thememarkflag){
        $('#fst_table').addClass('col-md-8');
        $('#sec_table').removeClass('hidden').addClass('hidden');
    }else if(endmarkflag && !thememarkflag){
        $('#fst_table').addClass('col-md-6');
        createThemeMarksView(theme);
        $('#sec_table').removeClass('hidden');
    }else if(!endmarkflag && thememarkflag){
        $('#fst_table').addClass('col-md-12');
        $('#sec_table').removeClass('hidden').addClass('hidden');
    } else {
        $('#fst_table').addClass('col-md-10');
        createThemeMarksView(theme);
        $('#sec_table').removeClass('hidden');
    }
    thememarkflag = !thememarkflag;
});


$(document).on('click', '#show_end_marks', function () {
    $('#fst_table').removeClass('col-md-6').removeClass('col-md-8').removeClass('col-md-10').removeClass('col-md-12');
    if(endmarkflag && thememarkflag){
        $('#fst_table').addClass('col-md-10');
        $('#thr_table').removeClass('hidden').addClass('hidden');
    }else if(endmarkflag && !thememarkflag){
        $('#fst_table').addClass('col-md-12');
        $('#thr_table').removeClass('hidden').addClass('hidden');
    }else if(!endmarkflag && !thememarkflag){
        $('#fst_table').addClass('col-md-8');
        createEndMarksView();
    } else {
        $('#fst_table').addClass('col-md-6');
        createEndMarksView();
    }
    endmarkflag = !endmarkflag;
});

$(document).on('click', '#mark_edition', function(){
    //todo save or edit marks.
    let mark_id = $(this).data('mark-id'); //if undefined saved mark
    let mark_comment = document.getElementsByName('comment')[0].value;
    let mark_value = document.getElementsByName('value')[0].value;
    let mark_visible = document.getElementsByName('comment')[0].checked;
    let student = $(this).data('student');
    console.log(student);
    if(mark_id!=undefined) {//send edit}
    }
    switch ($(this).data('type')) {
        case "dairy":
            let date =  $(this).data('date');
            //send Diary
            console.log(date);
            break;
        case "special":
            let worktype = $(this).data('mark-work-type');
            let name = $(this).data('mark-name');
            //send Special
            console.log(name);
            console.log(worktype);
            break;
        case "end":
            let mtype =  $(this).data('mark-type');
            console.log(mtype);
            break;
        case "theme":
            let theme = $(`#theme_id_select`).value();
            console.log(theme);
            break;
        default:
            console.err("ERROR");
            break;
    }

});

/************************Function***************************/
/*-----Left-menu navigating-----*/
function nextMenu(item_to_activate) {
    removeClass();
    document.getElementById(item_to_activate).classList.add('active');
}
function removeClass() {
    $('#content').empty();
    removing('subj_info', '');
    removing('subj_marks', '');
    removing('subj_attend', '');
}

function removing(item, div) {
    document.getElementById(item).classList.remove('active');
    if(document.getElementById(div) != null)
        document.getElementById(div).classList.remove('hidden');
}
/*------------------------------------------*/


function createSpecialMarks() {
    let div = $(`<div id="special_mark_creating">`);
    let input_name = create_input_group('text', 'Назва', '', 'marks_name');
    let input_worktype = create_input_group('text', 'Тип роботи', '', 'marks_work_type');
    let btn_div= $(`<div class="btn-group">`);
    let cancel  = $(`<button class="btn btn-outline-dark" id="cancel">`).text('Скасувати');
    let submit = $(`<button class="btn btn-outline-dark" id="create_column_mark" data-mark-special="special">`).text('Створити');
    btn_div.append(submit).append(cancel);
    div.append(input_name).append(input_worktype).append(btn_div);
    return div;
}

function createDiaryMarks() {
    let div = $(`<div id="diary_mark_creating">`);
    let input_date = create_input_group('date', 'Дата:', '', 'date_mark');
    let btn_div= $(`<div class="btn-group">`);
    let cancel  = $(`<button class="btn btn-outline-dark" id="cancel">`).text('Скасувати');
    let submit  = $(`<button class="btn btn-outline-dark" id ="create_column_mark" data-mark-diary="diary">`).text('Створити');
    btn_div.append(submit).append(cancel);
    div.append(input_date).append(btn_div);
    return div;
}

function createEndMarks() {
    let div = $(`<div id="end_mark_creating">`);
    let btn_div= $(`<div class="btn-group">`);
    let input_type = create_input_group('text', 'Тип:', '', 'marks_type');
    let cancel  = $(`<button class="btn btn-outline-dark" id="cancel">`).text('Скасувати');
    let submit  = $(`<button class="btn btn-outline-dark" id ="create_column_mark" data-mark-end="end">`).text('Створити');
    btn_div.append(submit).append(cancel);
    div.append(input_type).append(btn_div);
    return div;
}
function  createLessonDiv(id){
    let content =   $('#content');
    let theme = $(`<div class="cotainer lesson">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" data-id="${id}" id="add_lesson">`).text('Створити урок'));
    theme.append($(`<div id="add_lesson_form">`));
    content.append(theme);
    let them_view = $(`<div id="lesson_view">`);
    $.ajax({
        url: "/getLessons",
        type: "GET",
        data: {subject_id: urlParams.get('id'), topic_id: id},
        success: function(lessons){
            lessons = lessons.map(function(l){
                return {id: l.lesson_id, theme: l.lesson_topic, date: l.lesson_date.substr(0,10), hometask: l.homework};
            });
            lessons.forEach(l=>them_view.append(appendLessons(l)));
            content.append(them_view);
            if(exchangeSubject){
                $('#add_lesson').remove();
                $('.edit_lesson').remove();
                $('.delete_lesson').remove();
            }
        }
    });
}
function  createThemeDiv(){
    let content = $('#content');
    let theme = $(`<div class="cotainer theme">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_theme">`).text('Додати тему'));
    theme.append($(`<div id="add_theme_form">`));
    content.append(theme);
    let them_view = $(`<div id="theme_view">`);

    $.ajax({
        url: "/getTopics",
        type: "GET",
        data: {id: urlParams.get('id')},
        success: function(topics){
            topics = topics.map(function(t){
                return {id: t.topic_id, name: t.topic_name, number: t.topic_number, hours: 0, coef_special: t.coef_sm, coef_diary: t.coef_rm, coef_theme: t.coef_tm}
            });
            topics.forEach(the => them_view.append(themes(the)));
            content.append(them_view);
            if(exchangeSubject){
                $('#add_theme').remove();
                $('.edit_theme').remove();
                $('.delete_theme').remove();
            }
        }
    });

    //    theme_names.forEach(the => them_view.append(themes(the)));
    //    content.append(them_view);
    //    if(exchangeSubject){
    //        $('#add_theme').remove();
    //        $('.edit_theme').remove();
    //        $('.delete_theme').remove();
    //    }

}

function createLessonDivAdding(id) {
    let destination = $('<iframe name="formDestination" hidden></iframe>');
    $('#add_lesson_form').append(destination);
    let form = $('<form class="container" method="post" id="form_l" action="createLesson" target="formDestination" onsubmit="return checkLessonAdding()">');
    //todo ajax lessons themes
    let input_theme = create_input_group('text', 'Тема уроку', "", "lesson_topic");
    let input_num = create_input_group('date', 'Дата проведення', "", "lesson_date");
    let input_hometask =  create_input_group('text', 'Домашнє завдання', "", "homework");
    //hidden input to send topic id
    let topic_id = $('<input type="number" hidden name="topic_id" value="' + id + '">');
    form.append(input_theme);
    form.append(input_num);
    form.append(input_hometask);
    form.append(topic_id);
    let submit = $(`<input type="submit" class="input-group-text" value="Зберегти">`);
    form.append(submit);
    $('#form_l').remove();
    $('#add_lesson_form').append(form);
}
function checkLessonAdding(){
    if(document.forms['form_l']['lesson_topic'].value == '') return false;
    if(document.forms['form_l']['lesson_date'].value == '') return false;
    setTimeout(function(){
        createViewLessonsFromThemeById(document.forms['form_l']['topic_id'].value);
    }, 100);
}
function createThemeDivAdding(){
    let form = $('<form class="container" method="POST" id="form" action="createTopic">');
    let input_name = create_input_group('text', 'Назва', "", "topic_name");
    let input_num =  create_input_group('number', 'Порядковий номер', 1, "topic_number", 1);
    let coef_sp = create_input_group('number', 'Коефіцієнт спеціальних оцінок', 0.1, "coef_special", 0, "", 0.01);
    let coef_d =   create_input_group('number', 'Коефіцієнт поточних оцінок', 0.05, "coef_diary", 0, "", 0.01);
    let coef_th =   create_input_group('number', 'Коефіцієнт тематичної оцінок', 0.5, "coef_theme", 0, "", 0.01);
    //hidden input for subject ID
    let subj_id = $('<input type="number" hidden name="subject_id" value="' + urlParams.get('id') + '">');
    form.append(input_name);
    form.append(input_num);
    form.append(coef_sp);
    form.append(coef_d);
    form.append(coef_th);
    form.append(subj_id);
    let submit = $(`<input type="submit" class="input-group-text" value="Зберегти">`);
    form.append(submit);
    $('#form').remove();
    $('#add_theme_form').append(form);

}
function createEditionThemeView(a) {
    let back = $(` <button id="back" type="reset" class="btn my_btn btn-outline-success" >`).text("Назад");
    let form = $('<form class="container" method="post" id="form_them_edit" action="editTopic">');
    let input_name = create_input_group('text', 'Назва', a.data('name'), "topic_name");
    let input_num =  create_input_group('number', 'Порядковий номер', a.data('number'), "topic_number", 1);
    let coef_sp = create_input_group('number', 'Коефіцієнт спеціальних оцінок',  a.data('coef_special'), "coef_special", 0, "", 0.01);
    let coef_d =   create_input_group('number', 'Коефіцієнт поточних оцінок', a.data('coefdiary'), "coef_diary", 0, "", 0.01);
    let coef_th =   create_input_group('number', 'Коефіцієнт тематичної оцінок', a.data('coef_theme'), "coef_theme", 0, "", 0.01);
    //hidden input for subject ID
    let subj_id = $('<input type="number" hidden name="subject_id" value="' + urlParams.get('id') + '">');
    //hidden input for topic ID
    let topic_id = $('<input type="number" hidden name="topic_id" value="' + a.data('id') + '">');
    form.append(back).append(input_name);
    form.append(input_num);
    form.append(coef_sp);
    form.append(coef_d);
    form.append(coef_th);
    form.append(subj_id);
    form.append(topic_id);
    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(submit);
    createWindow(form)
}
function createEditionLessonView(a) {
    let destination = $('<iframe name="lessonEditingDestination" hidden></iframe>');
    a.append(destination);
    let back = $(` <button id="back" class="btn my_btn btn-outline-success" >`).text("Назад");
    let form = $('<form class="container" method="post" id="form_them_edit" action="editLesson" target="lessonEditingDestination" onsubmit="return checkLessonEditing()">');
    let input_name = create_input_group('text', 'Тема: ', a.data('theme'), "lesson_topic");
    let input_num =  create_input_group('date', 'Дата проведення:', a.data('date'), "lesson_date");
    let coef_sp = create_input_group('text', 'Домашнє завдання: ',  (a.data('hometask')==='undefined')?"":a.data('hometask'), "homework");
    //hidden input for lesson ID
    let lesson_id = $('<input type="number" hidden name="lesson_id" value="' + a.data('id') + '">');
    form.append(back).append(input_name);
    form.append(input_num);
    form.append(coef_sp);
    form.append(lesson_id);
    let submit = $(`<input type="submit" class="input-group-text" value='Зберегти'>`);
    form.append(submit);
    createWindow(form);
}
function checkLessonEditing(){
    if(document.forms['form_them_edit']['lesson_topic'].value == '') return false;
    if(document.forms['form_them_edit']['lesson_date'].value == '') return false;
    setTimeout(function(){
        $.ajax({
            url: "/getLesson/" + document.forms['form_them_edit']['lesson_id'].value,
            type: "GET",
            success: function(res){
                createViewLessonsFromThemeById(res.topic_id);
            }
        });
        //        createViewLessonsFromThemeById(document.forms['form_them_edit']['topic_id'].value);
    }, 100);
}
function createViewLessonsFromThemeById(id){
    //todo ajax to get lessons
    $('#content').empty();
    createLessonDiv(id);
}
function createWindow(innerItem){
    let back =$(` <div class = "backgr" id="bacground_adding_parents">`);
    let form = $(` <div class="forming" id="forming">`);
    $('.body').before(back.append(form.append(innerItem)));
}

function createNewAttendColumn(date){
    let table_caption = $('#table_caption');
    let start =$(table_caption.children()[table_caption.children().length-1]).data('column')+1;
    let t = $(`<td data-column="${start}" data-date="${cutData(date)}" data-type="attend">`).text(cellDate(date));
    table_caption.append(t);
    data_names.forEach(st => {
        let row = $("#table-row-"+st.personal_file_num);
        let td = $(`<td data-column="${start}" data-date="${cutData(date)}" data-type="attend">`);
        row.append(td);
    })
}
function createNewSpecialMarkColumn(type, name){
    let table_caption = $('#table_caption');
    let start =$(table_caption.children()[table_caption.children().length-1]).data('column')+1;
    let t = $(`<td data-column="${start}" data-work-type="${type}" data-type="special" data-mark-name="${name}">`).text(type);
    table_caption.append(t);
    data_names.forEach(st => {
        let row = $("#table-row-"+st.personal_file_num);
        let td = $(`<td data-column="${start}" data-work-type="${type}" data-type="special" data-mark-name="${name}">`);
        row.append(td);
    })
}
function createNewDairyMarkColumn(date){
    let table_caption = $('#table_caption');
    let start =$(table_caption.children()[table_caption.children().length-1]).data('column')+1;
    let t = $(`<td data-column="${start}" data-date="${cutData(date)}" data-type="dairy">`).text(cellDate(date));
    table_caption.append(t);
    data_names.forEach(st => {
        let row = $("#table-row-"+st.personal_file_num);
        let td = $(`<td data-column="${start}" data-date="${cutData(date)}" data-type="dairy">`);
        row.append(td);
    });
}
function createNewEndMarkColumn(type){
    let table_caption = $('#table_end_caption');
    let start =$(table_caption.children()[table_caption.children().length-1]).data('column')+1;
    let t = $(`<td data-column="${start}" data-type-mark="${type}" data-type="end">`).text(type);
    table_caption.append(t);
    data_names.forEach(st => {
        let row = $("#table-end-row-"+st.personal_file_num);
        let td = $(`<td data-column="${start}"  data-type-mark="${type}" data-type="end">`);
        row.append(td);
    });
}

function showMarkPartEditView(a) {
    let value = (a.data('mark-value')==undefined)?'':a.data('mark-value');
    let comment = (a.data('mark-comment')==undefined)?'':a.data('mark-comment');
    let visible = (a.data('mark-visible')==true);
    let div = $(`<div id="markview">`);
    //maybe make in form
    let input_value = create_input_group('number', 'Значення:', value, 'value', '1', '12', '1', '', true);
    let input_comment = create_input_group('text', 'Коментар:', comment, 'comment');
    let input_visible = create_input_group('checkbox', 'Видимість', '', 'visible', '','','',visible);
    let div_btn = $(`<div class="btn-group">`);
    let confirm = $(`<button class="btn btn-outline-dark" data-student="${a.parent().data('student')}" data-mark-id="${a.data('mark-id')}" id="mark_edition">`).text('Зберегти');
    let cancel = $(`<button class="btn btn-outline-dark" type= "reset" id="cancel">`).text("Скасувати");
    div_btn.append(confirm).append(cancel);
    div.append(input_value).append(input_comment).append(input_visible).append(div_btn);
    createWindow(div);
}



function showMarkEditView(a) {
    let type = a.data('type');
    let mark_type = (a.data('mark-type')==undefined)?'':a.data('mark-type');
    let mark_name = (a.data('mark-work-type')==undefined)?'':a.data('mark-work-type');
    let value = (a.data('mark-value')==undefined)?'':a.data('mark-value');
    let comment = (a.data('mark-comment')==undefined)?'':a.data('mark-comment');
    let visible = (a.data('mark-visible')==true);
    let div = $(`<div id="mark_edition_div">`);
    //maybe make in form
    let input_value = create_input_group('number', 'Значення:', value, 'value', '1', '12', '1');
    let input_comment = create_input_group('text', 'Коментар:', comment, 'comment');
    let input_visible = create_input_group('checkbox', 'Видимість', '', 'visible', '','','',visible);
    let div_btn = $(`<div class="btn-group">`);
    let confirm = $(`<button class="btn btn-outline-dark" data-date="${a.data('date')}" data-mark-work-type="${a.data('mark-work-type')}"
                    data-mark-name="${a.data('mark-name')}" data-student="${a.parent().data('student')}"  data-mark-type="${mark_type}" data-type="${type}" data-work-type="${mark_name}" data-mark-id="${a.data('mark-id')}" id="mark_edition">`).text('Зберегти');
    let cancel = $(`<button class="btn btn-outline-dark" type= "reset" id="cancel">`).text("Скасувати");
    div_btn.append(confirm).append(cancel);
    div.append(input_value).append(input_comment).append(input_visible).append(div_btn);
    createWindow(div);
}

function createAttendByPeriod(){
    let table = $('#attend');
    table.empty();
    let capt = $(`<tr id="table_caption">`);
    let tr = $(`<td data-column="-1">`).text('Прізвище');
    table.append(capt.append(tr));

    data_names.forEach(student=> {
        let td = $(`<tr id="table-row-${st.personal_file_num}"  class="table-row-${st.personal_file_num}">`);
        let first_tr = $(`<td  data-column="-1" class="caption_surname">`).text(student.surname+" "+student.student_name+" "+student.patronymic);
        td.append(first_tr);
        table.append(td);
    });

    for(let i = 0; i<attend.length; i++) //for every data-marks
    {
        let mark_cell = attend[i];
        let date_format = cellDate(mark_cell.date);
        let date_cell = $(`<td data-column="${i}" data-date=${cutData(mark_cell.date)} data-type="attend">`).text(date_format);
        capt.append(date_cell);
        for(let j = 0; j<data_names.length; j++ ){
            let id = data_names[j].personal_file_num;
            let mark= mark_cell.n_attend_id.find(el=> el==id);
            let row = $("#table-row-"+id);

            if(mark===undefined) {
                let td = $(`<td data-column="${i}" data-date=${cutData(mark_cell.date)} data-type="attend">`);
                row.append(td);
                continue;
            }
            let td = $(`<td data-column="${i}" data-date=${cutData(mark_cell.date)} data-type="attend">`).text('H');
            row.append(td);
        }
    }
    $('#attend_view_table').removeClass('hidden');
}


function createEndMarksView() {

    let table = $('#marks_end');
    let caption = $(`<tr id="table_end_caption">`);
    table.empty();
    table.append(caption);
    data_names.forEach(st=>{
        let tr = $(`<tr id="table-end-row-${st.personal_file_num}" data-student="${st.personal_file_num}"  class="table-row-${st.personal_file_num}">`);
        table.append(tr);
    });
    let column = 2000;
    for(let i = 0; i < end_marks.length; i++){
        let mark = end_marks[i];
        let date_cell = $(`<td data-column="${column}"  data-type-mark="${mark.type}" data-type="end">`).text(mark.type);
        caption.append(date_cell);
        data_names.forEach(st=>{
            let marks= mark.marks.find(el=> el.id==st.id);
            let row = $("#table-end-row-"+st.personal_file_num);

            if(marks===undefined) {
                let td = $(`<td data-column="${column}" data-mark-type="${mark.type}" data-type="end">`);
                row.append(td);
            }else{
                let td = $(`<td data-column="${column}" data-mark-id="${mark.id}" data-mark-type="${mark.type}" data-type="end" data-mark-value="${marks.value}"
data-mark-visible="${marks.visible}" data-mark-comment=" ${ marks.comment} ">`).text(marks.value);
                row.append(td);
            }
        });
        column++;


    }
    $('#thr_table').removeClass('hidden');
}
function  createThemeMarksView(theme){
    let table = $('#marks_theme');
    table.empty();
    let caption = $(`<tr id="table_theme_caption">`);
    table.append(caption);

    let column = 1000;
    let date_cell = $(`<td data-column="${column}" data-type="theme">`).text(theme);
    caption.append(date_cell);

    data_names.forEach(st=>{
        let tr = $(`<tr id="table-th-row-${st.personal_file_num}" data-student="${st.personal_file_num}" class="table-row-${st.personal_file_num}">`);
        let mark= them_marks.find(el=> el.id==st.id);
        if(mark==undefined) {
            let td = $(`<td data-column="${column}" data-theme=${theme}  data-type="theme">`);
            tr.append(td);
        }else {
            let td = $(`<td data-column="${column}" data-theme=${theme} data-mark-id =${mark.id} data-type="theme" data-comment="${mark.comment}" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
            tr.append(td);

        }
        table.append(tr);
    })
}

function createMarksByPeriod(topic_id){
    //TODO get the theme
    // make AJAX request
    
    console.log(topic_id);
    
    $.ajax({
        url: "/getStudentsByTopic/" + topic_id,
        type: "GET",
        success: function(students){
            console.log('HERE');
            console.log(students);
        }
    });

    let table = $('#marks');
    table.empty();
    let caption = $(`<tr id="table_caption">`);
    let tr = $(`<td  data-column="-1">`).text('Прізвище');
    table.append(caption.append(tr));
    $('#marks_view_table').removeClass('hidden');

    data_names.forEach(student=> {
        let td = $(`<tr id="table-row-${student.personal_file_num}" data-student="${student.personal_file_num}"  class="table-row-${student.personal_file_num}">`);
        let first_tr = $(`<td data-column="-1" class="caption_surname">`).text(student.surname+" "+student.student_name+" "+student.patronymic);
        td.append(first_tr);
        table.append(td);
    });

    let column = 0;
    //поточні оцінки

    $.ajax({
        url: "/getDairyMarks/" + topic_id,
        type: "GET",
        success: function(result){
            console.log(result);
            let dairy_data_marks = result;
            for(let i = 0; i < dairy_data_marks.length; i++)
            {
                if(dairy_data_marks[i].marks === undefined || dairy_data_marks[i].marks.length===0)
                    continue;
                let mark_cell = dairy_data_marks[i];
                let date_format = cellDate(mark_cell.date);
                let date_cell = $(`<td data-column="${column}" data-date=${cutData(mark_cell.date)} data-type="dairy">`).text(date_format);
                caption.append(date_cell);
                for(let j = 0; j<data_names.length; j++ ){
                    let id = data_names[j].personal_file_num;
                    let mark= mark_cell.marks.find(el=> el.id==id);
                    let row = $("#table-row-"+id);
                    if(mark===undefined) {
                        let td = $(`<td data-column="${column}" data-date=${cutData(mark_cell.date)} data-type="dairy">`);
                        row.append(td);
                        continue;
                    }
                    let td = $(`<td data-column="${column}" data-mark-id=${mark.id} data-date=${cutData(mark_cell.date)} data-type="dairy" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
                    row.append(td);
                }
                column++;
            }
            column++;
        }
    });

    //спеціальні оцінки
    let i;
    for(i = 0; i<special_data_marks.length; i++) //for every data-marks
    {

        let mark_cell = special_data_marks[i];
        let date_cell = $(`<td data-column="${column}" data-type="special" 
data-mark-work-type = ${mark_cell.type}
data-mark-name="${mark_cell.name}" >`).text(mark_cell.type);
        caption.append(date_cell);
        for(let j = 0; j<data_names.length; j++ ){
            let id = data_names[j].personal_file_num;

            let mark= mark_cell.marks.find(el=> el.id==id);
            let row = $("#table-row-"+id);

            if(mark===undefined) {

                let td = $(`<td data-column="${column}" data-type="special" data-mark-work-type = ${mark_cell.type} data-mark-name="${mark_cell.name}">`);
                row.append(td);
                continue;
            }
            let td = $(`<td data-column="${column}" data-mark-id="${mark.id}" data-type="special" data-mark-work-type = ${mark_cell.type}
data-mark-name="${mark_cell.name}" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
            row.append(td);
        }
        column++;
    }

}


function createPeriodForm() {
    let div = $(`<div id="choose_attend_period">`);
    let dataform = $(`<div class="form">`); //можливо краще форму?
    let inputdate1 = create_input_group('date', 'Дата початку', '', 'start_date');
    let inputdate2 = create_input_group('date', 'Кінцева дата', '', 'end_date');

    let submit = $(`<input type="submit" id="create_attend_by_period" class="input-group-text">`);
    div.append(dataform.append(inputdate1).append(inputdate2).append(submit));
    let marks_view = $(`<div id="attend_view_table" class="hidden">`);
    let button = $(`<button class="btn-outline-dark btn" id="add_attend_column">`).text("Додати стовпчик");
    let table = $(`<table id='attend' >`);
    marks_view.append(button).append(table);
    $('#content').append(div).append(marks_view);
}



function createMarksView(){
    let div = $(`<div id="choose_period">`);
    let dataform = $(`<div class="form">`);

    $.ajax({
        url: "/getTopics",
        type: "GET",
        data: {id: urlParams.get('id')},
        success: function(topics){
            console.log(topics);

            let inputdate1 = create_selected_input_o(topics.map(t => {return {name: t.topic_name, id: t.topic_id}}), 'Tема:', 'theme_id_select', 'Оберіть тему', 'theme');

            let submit = $(`<input type="submit" id="create_marks_by_period" class="input-group-text" value="Обрати">`);
            div.append(dataform.append(inputdate1).append(submit));
            let marks_view = $(`<div id="marks_view_table" class="hidden" >`);
            let btn_div = $(`<div class="btn-group">`);
            let button = $(`<button class="btn btn-outline-dark" id="add_new_column_mark">`).text("Додати стовпчик");
            let button_ = $(`<button class="btn btn-outline-dark" id="show_marks_theme">`).text("Тематична оцінка");
            let button_end = $(`<button class="btn btn-outline-dark" id="show_end_marks">`).text("Підсумкові оцінки");
            btn_div.append(button).append(button_).append(button_end);
            marks_view.append(btn_div);
            let div_table_wrapper=$(`<div id="marks_table_wrapper" class="row">`);
            let div_first_table = $(`<div class="col-md-12"  id="fst_table">`);
            let div_first_table_caption = $(`<div class="table_header" >`).text('Звичайні оцінки');
            let div_second_table = $(`<div class="col-md-2 hidden" id="sec_table" >`);
            let div_second_table_caption = $(`<div class="table_header" >`).text('Тематична оцінка');
            let div_third_table = $(`<div class="col-md-3 hidden" id="thr_table" >`);
            let div_third_table_caption = $(`<div class="table_header" >`).text('Підсумкові оцінки');
            let table = $(`<table id='marks'>`);
            let table_theme = $(`<table id='marks_theme' >`);
            let table_end = $(`<table id='marks_end'>`);
            div_first_table.append(div_first_table_caption);
            div_first_table.append(table);
            div_second_table.append(div_second_table_caption);
            div_second_table.append(table_theme);
            div_third_table.append(div_third_table_caption);
            div_third_table.append(table_end);
            div_table_wrapper.append(div_first_table).append(div_second_table).append(div_third_table);
            marks_view.append(div_table_wrapper);
            $('#content').append(div).append(marks_view);
        }
    });
}
//TODO add more arguments for specificating
//data[{name:name, id:id}]
function create_selected_input_o(data, label, id, value, name = "name") {
    let group = $(`<div class="input-group mb-1">`);
    let prep = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let select = $(`<select class="custom-select" id="${id}" name="${name}">`);
    select.append($(`<option value="" disabled selected>`).text(value));
    data.forEach(option => {
        let opt = $(`<option value="${option.id}">`).text(option.name);
        select.append(opt)
    });
    return group.append(prep.append(span)).append(select);
}

function create_selected_input(data, label, id, value) {
    let group =$(`<div class="input-group mb-1">`);
    let prep = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let select = $(`<select class="custom-select" id="${id}">`);
    select.append($(`<option value="" disabled selected>`).text(value));
    data.forEach(option=> {let opt = $(`<option value="${option}">`).text(option);
                           select.append(opt)});
    return group.append(prep.append(span)).append(select);
}

function create_input_group(input_type, label, value, name, min, max, step, checked, readonly){
    let group =$(`<div class="input-group mb-1">`);
    let pregroup = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let input = $(`<input type="${input_type}" value = "${value}" min="${min}" step="${step}" max="${max}" name="${name}" class="form-control">`);
    if(checked) input.attr('checked', 'true');
    if(readonly) input.attr('readonly', 'true');
    return group.append(pregroup.append(span)).append(input);
}
/*******************Helper function***************************/
function cutData(d){
    let data = new Date(d);
    return data.getFullYear() + "-" + ((data.getMonth()+1 < 10) ?
                                       ("0" + (data.getMonth()+1)) : (data.getMonth()+1)) + "-" + ((data.getDate() < 10) ?
                                                                                                   ("0" + data.getDate()) : data.getDate());
}
function cellDate(d){
    let data = new Date(d);
    return  ((data.getDate() < 10) ?
             ("0" + data.getDate()) : data.getDate())+ "." +(((data.getMonth()+1) < 10) ?
                                                             ("0" + (data.getMonth()+1)) : (data.getMonth()+1) );
}

/**********************HTML*******************/
let appendLessons = ({
    id: id,
    theme: theme,
    date: date,
    hometask: ht
})=>{
    let div = $(`<div data-id = ${id} class="lesson_list">`);
    let header = $(` <div class="header">`);
    let button_edit = $(`<button data-id="${id}" data-theme="${theme}" data-date="${date}" data-hometask="${ht}" class="btn btn-outline-success my_btn edit_lesson">`).text('Редагувати');
    let button_delete = $(`<button data-id="${id}" class="btn btn-outline-dark delete_lesson">`).text('Видалити');
    let span = $(`<span>`).text(theme);
    let btn_div = $(`<div class="btn-group">`).append(button_edit).append(button_delete);
    header.append(span).append(btn_div);
    div.append(header);
    let information = $(` <div class="information">`);
    let div_data = $(` <div>`).text('Дата проведення: '+date);
    information.append(div_data);
    if(ht !== undefined && ht.length!==0) {
        let div_hours = $(` <div>`).text('Домашнє завдання: ' + ht);
        information.append(div_hours);
    }

    div.append(information);
    return div;

};
let themes = ({id: id,
               name: name,
               hours: hours,
               number: number,
               coef_special: cs,
               coef_diary : cd,
               coef_theme: ct})=>{
    let div = $(`<div data-id = ${id} class="theme_list">`);
    let header = $(` <div class="header">`);
    let button_edit = $(`<button data-id="${id}" data-name="${name}" data-hours="${hours}"  data-number="${number}" 
    data-coef_special="${cs}" data-coefdiary="${cd}" data-coef_theme="${ct}" class="btn btn-outline-success my_btn edit_theme">`).text('Редагувати');
    let button_delete = $(`<button data-id="${id}" class="btn btn-outline-dark delete_theme">`).text('Видалити');
    let span = $(`<span>`).text(name);
    let btn_div = $(`<div class="btn-group">`).append(button_edit).append(button_delete);
    header.append(span).append(btn_div);
    div.append(header);

    let information = $(` <div class="information">`);
    let div_number = $(` <div>`).text('Порядковий номер: '+number);
    let div_hours = $(` <div>`).text('Кількість годин: '+hours);
    let div_coeficients = $(` <div>`).text('Коефіцієнти оцінок: спеціальні: '+cs+", поточні: "+cd+", тематична: "+ct);

    information.append(div_number).append(div_hours).append(div_coeficients);

    div.append(information);
    return div;
};


/*------To do on update--------*/

createThemeDiv();
//createLessonDiv();