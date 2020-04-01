/*-------------------------------------------------*/
//TODO get information from server about
// - student attend this subject
// - information about subject

let data_names = [{id: '1', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},
    {id: '2', last_name: "Surname", first_name: "Name1", second_name: "Pobatkovi"},
    {id: '3', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},]



/*------------------Listeners-----------------------*/
$(document).on('click', '#subj_info', function () {
    nextMenu('subj_info');
    createThemeDiv();
    createLessonDiv();
});


$(document).on('click', '#subj_attend', function () {
    nextMenu('subj_attend');

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
        $('#form_l').remove();
        createThemeDivAdding();
        createTheme = true;
        createLesson =false;
        return;
    }
    $('#form').remove();
    createTheme = false;
});
$(document).on('click', '#add_lesson', function () {
    if(!createLesson) {
        $('#form').remove();
        createLessonDivAdding()
        createTheme = false
        createLesson = true;
        return;
    }
    $('#form_l').remove();
    createTheme = false;
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
function  createLessonDiv(){
    let theme = $(`<div class="cotainer lesson">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_lesson">`).text('Створити урок'));
    theme.append($(`<div id="add_lesson_form">`));
    $('#content').append(theme);

}
function  createThemeDiv(){
    let theme = $(`<div class="cotainer theme">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_theme">`).text('Додати тему'));
    theme.append($(`<div id="add_theme_form">`));
    $('#content').append(theme);
}

function createLessonDivAdding() {
    let form = $('<form class="container" method="post" id="form_l">');

    let input_theme = create_input_group('text', 'Тема уроку', "", "lesson-theme");
    let input_num = create_input_group('date', 'Дата проведення', "", "date")
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
let form = $('<form class="container" method="post" id="form">')
    let input_name = create_input_group('text', 'Назва', "", "theme");
    let input_num =  create_input_group('number', 'Порядковий номер', "", "theme", 1);
    let coef_sp = create_input_group('number', 'Коефіцієнт спеціальних оцінок', "", "coef-special", 0, "", 0.01)
    let coef_d =   create_input_group('number', 'Коефіцієнт поточних оцінок', "", "coef-diary", 0, "", 0.01)
    let coef_th =   create_input_group('number', 'Коефіцієнт тематичної оцінок', "", "coef-theme", 0, "", 0.01)
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
$(document).on('click', '#create_marks_by_period', function(){
    console.log('here');
   //TODO get the period
   // make AJAX request

    let dairy_data_marks = [{date: new Date(2019, 3, 23), marks:[]},
        {date: new Date(2019, 4, 23), marks:[{id: '1', value: '10', visible:'true'}, {id:'2', value:'9', visible:'true'}]},
        {date: new Date(2019, 3, 24), marks:[]},
        {date: new Date(2019, 3, 25), marks:[{id:'3', value:'7', visible:'true'}]},
        {date: new Date(2019, 4, 26), marks:[{id: '1', value: '12', visible:'true'}]}, ]
    let special_data_marks = [{name: "To be or not to be", type: "poem", marks: [{id:'1', visible:'false', value:5, comment:"once more chance"}, {id:'2',value: 10, visible:'true' }]},
        {name: "Test12", type: "test", marks: [{id:'1', value:'12', visible:'true'}, {id:'3', value:'6', visible: "true"}]}];
    let them_marks = [{id: '1', theme: 'theme1', value: '10', visible:'false'},
        {id: '2', theme: 'theme1', value: '8', visible:'true'},
        {id: '3', theme: 'theme1', value: '9', visible:'true'},];
    let table = $('#marks');
    let caption = $('#table_caption');
        data_names.forEach(student=> {
            let td = $(`<tr id="table-row-${student.id}">`);
            let first_tr = $(`<td class="caption_surname">`).text(student.last_name+" "+student.first_name+" "+student.second_name);
            td.append(first_tr);
            table.append(td);
        });

        let column = 0;
   //поточні оцінки
        for(let i = 0; i<dairy_data_marks.length; i++) //for every data-marks
        {
            if(dairy_data_marks[i].marks === undefined || dairy_data_marks[i].marks.length===0)
                continue;
            let mark_cell = dairy_data_marks[i];
            let date_format = cellDate(mark_cell.date)
            let date_cell = $(`<td data-column="${i}" data-date=${mark_cell.date} data-type="dairy">`).text(date_format);
            caption.append(date_cell);
            for(let j = 0; j<data_names.length; j++ ){
                 let id = data_names[j].id;
                 let mark= mark_cell.marks.find(el=> el.id==id);
                 let row = $("#table-row-"+id);
                 if(mark===undefined) {
                     let td = $(`<td data-column="${i}" data-date=${mark_cell.date} data-type="dairy">`);
                     row.append(td);
                     continue;
                 }
                let td = $(`<td data-column="${i}" data-date=${mark_cell.date} data-type="dairy" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
                row.append(td);
            }
            column=i;
        }
       //спеціальні оцінки
    let i;
    for(i = 0; i<special_data_marks.length; i++) //for every data-marks
    {

        let mark_cell = special_data_marks[i];
        console.log(mark_cell.name);
        let date_cell = $(`<td data-column="${i+column}" data-type="special" 
                            data-mark-work-type = ${mark_cell.type}
                            data-mark-name="${mark_cell.name}" >`).text(mark_cell.type);
        caption.append(date_cell);
        for(let j = 0; j<data_names.length; j++ ){
            let id = data_names[j].id;

            let mark= mark_cell.marks.find(el=> el.id==id);
            let row = $("#table-row-"+id);
            console.log(id +" "+ mark);

            console.log(row);
            if(mark===undefined) {

                let td = $(`<td data-column="${i+column}" data-type="special" data-mark-work-type = ${mark_cell.type} data-mark-name="${mark_cell.name}">`);
                row.append(td);
                console.log("undefined here");
                console.log(td);
                continue;
            }
            let td = $(`<td data-column="${i}"data-type="special" data-mark-work-type = ${mark_cell.type}
                            data-mark-name="${mark_cell.name}" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
            row.append(td);
        }

    }

  /*  //тематична
    for(let j = 0; j<data_names.length; j++ ){
        let id = data_names[j].id;

        let mark= them_marks.find(el=> el.id==id);
        let row = $("#table-row-"+id);
        if(mark===undefined) {
            let td = $(`<td data-column="${i+column}" data-type="theme" data-theme="${mark.theme}">`);
            row.append(td);
            console.log("undefined here");
            console.log(td);
            continue;
        }
        let td = $(`<td data-column="${i}"data-type="theme" data-theme="${mark.theme}" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
        row.append(td);*/

    //}




});

function createMarksView(){
    let div = $(`<div id="choose_period">`);
    let dataform = $(`<div class="form">`); //можливо краще форму?
    let inputdate1 = create_input_group('date', 'Дата початку', '', 'start_date');
    let inputdate2 = create_input_group('date', 'Кінцева дата', '', 'end_date');

    let submit = $(`<input type="submit" id="create_marks_by_period" class="input-group-text">`);
    div.append(dataform.append(inputdate1).append(inputdate2).append(submit));
    let marks_view = $(`<div id="marks_view_table">`);
    let div_table_wrapper=$(`<div id="marks_table_wrapper">`);
    let table = $(`<table id='marks'>`);
    let caption = $(`<tr id="table_caption">`);
    let tr = $(`<td>`).text('Прізвище');
    table.append(caption.append(tr))
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
    return data.getFullYear() + "-" + ((data.getMonth() < 10) ?
        ("0" + data.getMonth()) : data.getMonth()) + "-" + ((data.getDate() < 10) ?
        ("0" + data.getDate()) : data.getDate());
}
function cellDate(data){
    return  ((data.getDate() < 10) ?
        ("0" + data.getDate()) : data.getDate())+ "." +((data.getMonth() < 10) ?
        ("0" + data.getMonth()) : data.getMonth() );
}

/**********************HTML*******************/
let themes = ({id: id,
               name: name,
               hours: hours,
               number: num,
              coef_special: cs,
              coef_d : cd,
              coef_th: ct})=>{
    let div = $(`<div data-id = ${id} class="">`);

}


/*------To do on update--------*/

createThemeDiv();
createLessonDiv();