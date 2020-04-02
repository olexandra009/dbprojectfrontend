/*-------------------------------------------------*/
//TODO get information from server about
// - student attend this subject
// - information about subject

let data_names = [{id: '1', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},
    {id: '2', last_name: "Surname", first_name: "Name1", second_name: "Pobatkovi"},
    {id: '3', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},];

let theme_names = [{id: '112314',name:"Name of the first theme" , number:'1', hours:'10', coef_special: 0.3, coef_diary: 0.01, coef_theme: 0.5},
    {id: '112214', name:"Name of the second theme" ,number:'2', hours:'11', coef_special: 0.3, coef_diary: 0.01, coef_theme: 0.5},
    {id: '112514', name:"Name of the third theme" ,number:'3', hours:'6', coef_special: 0.3, coef_diary: 0.01, coef_theme: 0.5}];

let lesson_names = [{id: '242145', theme: 'Theme of lesson 1', date: new Date(2020, 4, 5),hometask: 'write esse'},
    {id: '24234',theme: 'Theme of lesson 2',date: new Date(2020, 4, 6),},
    {id: '24234',theme: 'Theme of lesson 3',date: new Date(2020, 4, 7),}];

let dairy_data_marks = [{date: new Date(2019, 3, 23), marks:[]},
    {date: new Date(2019, 4, 23), marks:[{id: '1', value: '10', visible:'true'}, {id:'2', value:'9', visible:'true'}]},
    {date: new Date(2019, 3, 24), marks:[]},
    {date: new Date(2019, 3, 25), marks:[{id:'3', value:'7', visible:'true'}]},
    {date: new Date(2019, 4, 26), marks:[{id: '1', value: '12', visible:'true'}]}, ];
let special_data_marks = [{name: "To be or not to be", type: "poem", marks: [{id:'1', visible:'false', value:5, comment:"once more chance"}, {id:'2',value: 10, visible:'true' }]},
    {name: "Test12", type: "test", marks: [{id:'1', value:'12', visible:'true'}, {id:'3', value:'6', visible: "true"}]}];

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





$(document).on('mouseenter', 'td', function () {
    let id = $(this).data('column');
    let query = "td[data-column="+id+"]";
    $(query).addClass('hovered');
    $(this).parent().addClass('hovered');

    $(this).addClass('thovered');
}) ;
$(document).on('mouseleave', 'td', function () {
    let id = $(this).data('column');
    let query = "td[data-column="+id+"]";
    $(query).removeClass('hovered');
    $(this).parent().removeClass('hovered');
    $(this).removeClass('thovered');
}) ;
/*------------------Listeners-----------------------*/
$(document).on('click', '#subj_info', function () {
    nextMenu('subj_info');
    createThemeDiv();
  //  createLessonDiv();
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
    window.location.href='./teachercabinet.html';
});
let createLesson =false;
let createTheme = false;

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
        createLessonDivAdding();
        createLesson=true;
        return;
    }
    $('#form_l').remove();
    createLesson = false;
});
$(document).on('click', '.theme_list', function (e) {
    if(e.target.type === "submit")return;
    //TODO view Theme
    let id= $(this).data('id');
    createViewLessonsFromThemeById(id);
});



$(document).on('click', '.edit_theme', function () {
     createEditionThemeView($(this));
});
$(document).on('click', '.delete_theme', function () {
   //todo delete theme
});
$(document).on('click', '.edit_lesson', function () {
    createEditionLessonView($(this));
});
$(document).on('click', '.delete_lesson', function () {
    //todo delete theme
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
        //send to server that there values of attend-dates
        createNewAttendColumn(date);
        $("#bacground_adding_parents").remove();
    }
);

$(document).on('click', '#add_new_column_mark', function(){
    let data = ["Спеціальні оцінки", "Поточні оцінки"];
   let input=   create_selected_input(data, "Тип", "select_type_of_marks", "Оберіть тип оцінки");
    let div = $(`<div>`);
    div.append(input);
    createWindow(div);
});
$(document).on('click', "#create_column_mark", function () {
    if($(this).data('mark') === undefined) {
        let type = document.getElementsByName('marks_work_type')[0].value;
        let name = document.getElementsByName('marks_name')[0].value;
        createNewSpecialMarkColumn(type, name);
        $("#bacground_adding_parents").remove();
        return;
    }
    let date = document.getElementsByName('date_mark')[0].valueAsDate;
    createNewDairyMarkColumn(date);
    $("#bacground_adding_parents").remove();
})

function createSpecialMarks() {
  let div = $(`<div id="special_mark_creating">`);
  let input_name = create_input_group('text', 'Назва', '', 'marks_name');
  let input_worktype = create_input_group('text', 'Тип роботи', '', 'marks_work_type');
    let btn_div= $(`<div class="btn-group">`);
    let cancel  = $(`<button class="btn btn-outline-dark" id="cancel">`).text('Скасувати');
    let submit = $(`<button class="btn btn-outline-dark" id="create_column_mark">`).text('Створити');

    btn_div.append(submit).append(cancel);
  div.append(input_name).append(input_worktype).append(btn_div);
  return div;
}

function createDiaryMarks() {
    let div = $(`<div id="diary_mark_creating">`);
   let input_date = create_input_group('date', 'Дата:', '', 'date_mark');
    let btn_div= $(`<div class="btn-group">`);
    let cancel  = $(`<button class="btn btn-outline-dark" id="cancel">`).text('Скасувати');
   let submit  = $(`<button class="btn btn-outline-dark" id ="create_column_mark" data-mark="diary">`).text('Створити');
    btn_div.append(submit).append(cancel);
    div.append(input_date).append(btn_div);
    return div;
}

$(document).on('change', '#select_type_of_marks', function(){
    $(`#special_mark_creating`).remove();
    $(`#diary_mark_creating`).remove();
  if($(this).children("option:selected").val() == 'Спеціальні оцінки')
      $(`#forming`).append(createSpecialMarks());
  else
      $(`#forming`).append(createDiaryMarks());

});
$(document).on('click', '#create_attend_by_period', function () {
    createAttendByPeriod();
});
$(document).on('click', '#create_marks_by_period', function(){
    //todo get theme value
    // send theme value
    createMarksByPeriod();
});
$(document).on('click', 'td[data-type="attend"]', function(){

    if($(this).parent().attr('id') === "table_caption"){
        //todo show asking delete
        return;
    }
    if( $(this).text() !=='H') {
        //todo send to server date id and subject
        // wait for answer and add id of cell to id
        $(this).text('H');
    } else {
        //todo send to server date id and subject
        // wait for answer of succsefull change
        $(this).text('');
    }

} );

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
function  createLessonDiv(id){
    let content =   $('#content');
    let theme = $(`<div class="cotainer lesson">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_lesson">`).text('Створити урок'));
    theme.append($(`<div id="add_lesson_form">`));
    content.append(theme);
    let them_view = $(`<div id="lesson_view">`);

    //todo ajax lessons by theme id
    lesson_names.forEach(l=>them_view.append(lessons(l)));
    content.append(them_view);
}
function  createThemeDiv(){
    let content =   $('#content');
    let theme = $(`<div class="cotainer theme">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_theme">`).text('Додати тему'));
    theme.append($(`<div id="add_theme_form">`));
    content.append(theme);
    let them_view = $(`<div id="theme_view">`);
    theme_names.forEach(the=> them_view.append(themes(the)));
    content.append(them_view);

}

function createLessonDivAdding() {
    let form = $('<form class="container" method="post" id="form_l">');

    let input_theme = create_input_group('text', 'Тема уроку', "", "lesson-theme");
    let input_num = create_input_group('date', 'Дата проведення', "", "date");
    let input_hometask =  create_input_group('text', 'Домашнє завдання', "", "lesson-theme");
    form.append(input_theme);
    form.append(input_num);
    form.append(input_hometask);
    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(submit);
    $('#form_l').remove();
    $('#add_lesson_form').append(form);
}
function createThemeDivAdding(){
let form = $('<form class="container" method="post" id="form">');
    let input_name = create_input_group('text', 'Назва', "", "theme");
    let input_num =  create_input_group('number', 'Порядковий номер', "", "theme", 1);
    let coef_sp = create_input_group('number', 'Коефіцієнт спеціальних оцінок', "", "coef-special", 0, "", 0.01);
    let coef_d =   create_input_group('number', 'Коефіцієнт поточних оцінок', "", "coef-diary", 0, "", 0.01);
    let coef_th =   create_input_group('number', 'Коефіцієнт тематичної оцінок', "", "coef-theme", 0, "", 0.01);
    form.append(input_name);
    form.append(input_num);
    form.append(coef_sp);
    form.append(coef_d);
    form.append(coef_th);
    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(submit);
    $('#form').remove();
    $('#add_theme_form').append(form);

}
/*<button data-id="${id}" data-name="${name}" data-hours="${hours}"  data-number="${number}"
data-coef_special="${cs}" data-coefdiary="${cd}", data-coef_theme="${ct}" class="btn btn-outline-success my_btn edit_theme">`).text('Редагувати');
  */
function createEditionThemeView(a) {
    let back = $(` <button id="back" type="reset" class="btn my_btn btn-outline-success" >`).text("Назад");
    let form = $('<form class="container" method="post" id="form_them_edit">');
    let input_name = create_input_group('text', 'Назва', a.data('name'), "theme");
    let input_num =  create_input_group('number', 'Порядковий номер', a.data('number'), "theme", 1);
    let coef_sp = create_input_group('number', 'Коефіцієнт спеціальних оцінок',  a.data('coef_special'), "coef-special", 0, "", 0.01);
    let coef_d =   create_input_group('number', 'Коефіцієнт поточних оцінок', a.data('coefdiary'), "coef-diary", 0, "", 0.01);
    let coef_th =   create_input_group('number', 'Коефіцієнт тематичної оцінок', a.data('coef_theme'), "coef-theme", 0, "", 0.01);
    form.append(back).append(input_name);
    form.append(input_num);
    form.append(coef_sp);
    form.append(coef_d);
    form.append(coef_th);
    let submit = $(`<input type="submit" class="input-group-text">`);

    form.append(submit);
    createWindow(form)
}
function createEditionLessonView(a) {
    let back = $(` <button id="back" class="btn my_btn btn-outline-success" >`).text("Назад");

    let form = $('<form class="container" method="post" id="form_them_edit">');
    let input_name = create_input_group('text', 'Тема: ', a.data('theme'), "theme");
    let input_num =  create_input_group('date', 'Дата проведення:', a.data('date'), "date");
    let coef_sp = create_input_group('text', 'Домашнє завдання: ',  (a.data('hometask')==='undefined')?"":a.data('hometask'), "hometask");
    form.append(back).append(input_name);
    form.append(input_num);
    form.append(coef_sp);
    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(submit);
    createWindow(form);
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
        let row = $("#table-row-"+st.id);
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
        let row = $("#table-row-"+st.id);
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
        let row = $("#table-row-"+st.id);
        let td = $(`<td data-column="${start}" data-date="${cutData(date)}" data-type="dairy">`)
        row.append(td);
    })
}
function createAttendByPeriod(){
    let table = $('#attend');
    table.empty();
    let capt = $(`<tr id="table_caption">`);
    let tr = $(`<td>`).text('Прізвище');
    table.append(capt.append(tr));

    data_names.forEach(student=> {
        let td = $(`<tr id="table-row-${student.id}">`);
        let first_tr = $(`<td class="caption_surname">`).text(student.last_name+" "+student.first_name+" "+student.second_name);
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
            let id = data_names[j].id;
            let mark= mark_cell.n_attend_id.find(el=> el==id);
            let row = $("#table-row-"+id);

            if(mark===undefined) {
                let td = $(`<td data-column="${i}" data-date=${cutData(mark_cell.date)} data-type="attend">`);
                row.append(td);
                continue;
            }
            let td = $(`<td data-column="${i}" data-date=${cutData(mark_cell.date)} data-type="attend" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text('H');
            row.append(td);
        }
    }
    $('#attend_view_table').removeClass('hidden');
}


function createMarksByPeriod(){
    //TODO get the period
    // make AJAX request


    let table = $('#marks');
    $('#marks_view_table').removeClass('hidden');
    let caption = $('#table_caption');
    data_names.forEach(student=> {
        let td = $(`<tr id="table-row-${student.id}">`);
        let first_tr = $(`<td class="caption_surname">`).text(student.last_name+" "+student.first_name+" "+student.second_name);
        td.append(first_tr);
        table.append(td);
    });

    let column = 0;
    //поточні оцінки
    for(let i = 0; i<dairy_data_marks.length; i++)
    {
        console.log(column);
        console.log(dairy_data_marks[i].marks);
        if(dairy_data_marks[i].marks === undefined || dairy_data_marks[i].marks.length===0)
            continue;
        let mark_cell = dairy_data_marks[i];
        let date_format = cellDate(mark_cell.date);
        let date_cell = $(`<td data-column="${column}" data-date=${mark_cell.date} data-type="dairy">`).text(date_format);
        caption.append(date_cell);
        for(let j = 0; j<data_names.length; j++ ){
            let id = data_names[j].id;
            let mark= mark_cell.marks.find(el=> el.id==id);
            let row = $("#table-row-"+id);
            if(mark===undefined) {
                let td = $(`<td data-column="${column}" data-date=${mark_cell.date} data-type="dairy">`);
                row.append(td);
                continue;
            }
            let td = $(`<td data-column="${column}" data-date=${mark_cell.date} data-type="dairy" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
            row.append(td);
        }
        column++;
    }
    column++;
    console.log("before marks"+column);
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
            let id = data_names[j].id;

            let mark= mark_cell.marks.find(el=> el.id==id);
            let row = $("#table-row-"+id);

            if(mark===undefined) {

                let td = $(`<td data-column="${column}" data-type="special" data-mark-work-type = ${mark_cell.type} data-mark-name="${mark_cell.name}">`);
                row.append(td);
                continue;
            }
            let td = $(`<td data-column="${column}" data-type="special" data-mark-work-type = ${mark_cell.type}
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
    let dataform = $(`<div class="form">`); //можливо краще форму?
    let inputdate1 = create_selected_input(['theme1', 'theme2', 'theme3'], 'Tема:', '', 'Оберіть тему', 'theme');

    let submit = $(`<input type="submit" id="create_marks_by_period" class="input-group-text">`);
    div.append(dataform.append(inputdate1).append(submit));
    let marks_view = $(`<div id="marks_view_table" class="hidden" >`);
    let button = $(`<button class="btn btn-outline-dark" id="add_new_column_mark">`).text("Додати стовпчик");
    marks_view.append(button);
    let div_table_wrapper=$(`<div id="marks_table_wrapper">`);
    let table = $(`<table id='marks' >`);
    let caption = $(`<tr id="table_caption">`);
    let tr = $(`<td>`).text('Прізвище');
    table.append(caption.append(tr));
    marks_view.append(div_table_wrapper.append(table));
    $('#content').append(div).append(marks_view);
}
//TODO add more arguments for specificating
function create_selected_input_with_button(data, label, id, btn_id, btn_tx, value){
    let group =$(`<div class="input-group  mb-1">`);
    let prep = $(`<div class="input-group-prepend ">`);
    let span = $(`<span class="input-group-text ">`).text(label);
    let select = $(`<select class="custom-select" id="${id}">`);
    select.append($(`<option value="" disabled selected>`).text(value));
    data.forEach(option=> {let opt = $(`<option value="${option}">`).text(option);
        select.append(opt)});
    let append= $(`<div class="input-group-append">`);
    let button=$(`<button class="btn btn-outline-secondary" type="button" id="${btn_id}">`).text(btn_tx);
    prep.append(span);
    append.append(button);
    return group.append(prep).append(select).append(append);
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

function create_input_group(input_type, label, value, name, min, max, step){
    let group =$(`<div class="input-group mb-1">`);
    let pregroup = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let input = $(`<input type="${input_type}" value = "${value}" min="${min}" step="${step}" max="${max}" name="${name}" class="form-control">`);
    return group.append(pregroup.append(span)).append(input);
}

function create_input_group_with_button(input_type, label_name, button_id){
    let group = $(`<div class="input-group mb-1">`);
    let prepend = $(`<div class="input-group-prepend">`);
    let label = $(`<span class="input-group-text">`).text(label_name);

    let input = $(`<input type="${input_type}" class="form-control">`);

    let append= $(`<div class="input-group-append">`);
    let button=$(`<button class="btn btn-outline-secondary" type="button" id="${button_id}">`).text("+");
    return group.append(prepend.append(label))
        .append(input).append(append.append(button));
}
/*******************Helper function***************************/
function cutData(data){
    return data.getFullYear() + "-" + ((data.getMonth()+1 < 10) ?
        ("0" + (data.getMonth()+1)) : (data.getMonth()+1)) + "-" + ((data.getDate() < 10) ?
        ("0" + data.getDate()) : data.getDate());
}
function cellDate(data){
    return  ((data.getDate() < 10) ?
        ("0" + data.getDate()) : data.getDate())+ "." +(((data.getMonth()+1) < 10) ?
        ("0" + (data.getMonth()+1)) : (data.getMonth()+1) );
}

/**********************HTML*******************/
let lessons = ({
    id: id,
    theme: theme,
    date: date,
    hometask: ht
})=>{
    let div = $(`<div data-id = ${id} class="lesson_list">`);
    let header = $(` <div class="header">`);
    let button_edit = $(`<button data-id="${id}" data-theme="${theme}" data-date="${cutData(date)}" data-hometask="${ht}" class="btn btn-outline-success my_btn edit_lesson">`).text('Редагувати');
    let button_delete = $(`<button data-id="${id}" class="btn btn-outline-dark delete_lesson">`).text('Видалити');
    let span = $(`<span>`).text(theme);
    let btn_div = $(`<div class="btn-group">`).append(button_edit).append(button_delete);
    header.append(span).append(btn_div);
    div.append(header);
    let information = $(` <div class="information">`);
    let div_data = $(` <div>`).text('Дата проведення: '+date.toLocaleDateString());
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
data-coef_special="${cs}" data-coefdiary="${cd}", data-coef_theme="${ct}" class="btn btn-outline-success my_btn edit_theme">`).text('Редагувати');
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