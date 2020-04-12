//
let student_names = [{
    id: "N13404024",
    name: "Іваненко Ольга Степанівна",
    bday: "09.09.2005",
    type: "очна"
}, {
    id: "N13404025",
    name: "Петров Ігор Артемович",
    bday: "29.03.2005",
    type: "очна"
}, {
    id: "N13404026",
    name: "Яременко Анна Петрівна",
    bday: "31.12.2005",
    type: "очна"
}];

let dairy_data_marks = [{date: new Date(2019, 3, 23), marks:[]},
                        {date: new Date(2019, 4, 23), marks:[{id: '1', value: '10', visible:'true', teacher_id:'identyofteacher'}, {id:'2', value:'9', visible:'true'}]},
                        {date: new Date(2019, 3, 24), marks:[]},
                        {date: new Date(2019, 3, 25), marks:[{id:'3', value:'7', visible:'true'}]},
                        {date: new Date(2019, 4, 26), marks:[{id: '1', value: '12', visible:'true'}]}, ];
let special_data_marks = [{name: "To be or not to be", type: "poem", marks: [{id:'1', visible:'false', value:5, comment:"once more chance"}, {id:'2',value: 10, visible:'true' }]},
                          {name: "Test12", type: "test", marks: [{id:'1', value:'12', visible:'true'}, {id:'3', value:'6', visible: "true"}]}];

let them_marks = [{id: '1', theme: 'theme1', value: '10', visible:'false'},
                  {id: '2', theme: 'theme1', value: '8', visible:'true'},
                  {id: '3', theme: 'theme1', value: '9', visible:'true'},];

let end_marks =[{type: 'semestr1', marks:[{id:1, value: '11', visible:'true', comment:'here'},
                                          {id:2, value: '8', visible:'true', comment:'here'},
                                          {id:3, value: '8', visible:'true', comment:'here'}]},
                {type: 'dpa', marks:[{id:1, value: '11', visible:'true', comment:'here'},
                                     {id:2, value: '10', visible:'true', comment:'here'},
                                     {id:3, value: '8', visible:'true', comment:'here'}]} ];

let data_names = [{id: '1', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},
                  {id: '2', last_name: "Surname", first_name: "Name1", second_name: "Pobatkovi"},
                  {id: '3', last_name: "Surname", first_name: "Name", second_name: "Pobatkovi"},];

let class_subject = [{id: '5AG1', name: 'English', class_name:'5-A'},
                     {id: '5AG2', name: 'English', class_name: '5-A'},
                     {id: '5BG1', name: 'English', class_name:'5-B'}];

let data_attend =  [{date: new Date(2020,1,4), absent: [{student_id:"N13404024",
                                                         number_of_lessons: 1,
                                                         reason:'',
                                                         lessons: [{id:'5AG1', name:'English'}]}]},
                    {date: new Date(2020,1,5), absent: [{student_id:"N13404025",
                                                         number_of_subject: 2,
                                                         reason:'по-хворобі',
                                                         lessons: [{id:'5AG2', name:'English'},
                                                                   {id:'5AG1', name:'English'}]}]},
                    {date: new Date(2020,1,6), absent: [{student_id:"N13404025",
                                                         number_of_lessons: 2,
                                                         reason:'по-хворобі',
                                                         lessons: [{id:'5AG2', name:'English'},
                                                                   {id:'5AG1', name:'English'}]},
                                                        {student_id:"N13404026",
                                                         number_of_lessons: 1,
                                                         reason:'',
                                                         lessons: [{id:'5AG1', name:'English'}]},
                                                       ]},
                   ];

/*
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
}) ;*/



/************************Listeners************************/
let thememarkflag = false;
let endmarkflag = false;
//Left-menu navigation
$(document).on('click', '#students', function () {
    nextMenu('students');
    createMyStudentList();
});
$(document).on('click', '#marks', function () {
    nextMenu('marks');
    createSubjectView();
});
$(document).on('click', '#attend', function () {
    nextMenu('attend');
    createAttendingView();
});
$(document).on('click', '#create_attend_by_period', function () {
    //todo get period
    // ajax for information
    createAttendingViewTable();
});
$(document).on('click', '#report', function () {
    nextMenu('report');
    createMenuReportsButtons();
});
$(document).on('click', '#back_to_cabinet', function () {
    window.location.href='./mycabinet';
});
//student details
$(document).on('click', '.st-list', function () {
    let student = $(this).data('id');
    //AJAX to get info from student
    createDetailStudentView(student);

});
//back_to_st-list
$(document).on('click', '#back_to_st-list', function () {
    createMyStudentList();
});

$(document).on('click', '#cancel', function () {
    $("#bacground_adding_parents").remove();
});

$(document).on('click', 'td[data-type="attend"]', function () {
    //will work with global array
    showViewAttend($(this));
});

$(document).on('click','.subject-btn', function(){
    //TODO get themes from subject and create filtration form like in subject.js
    // then choose them get marks and give readonly marks show
    createMarksView(['theme1', 'theme2', 'theme3'],$(this).data('id') );

});
$(document).on('click', '#current_students_rating', function(){
    //todo send file with table of student and subjects and avarange mark
});
$(document).on('click', '#attend_student_report', function(){
    //todo send file with information about every student attend
    // and about all class
});

$(document).on('click', '#end_mark_report', function(){
    //todo send file with information about every student in class
    // end marks
});
$(document).on('click', '#create_marks_by_period', function(){
    //todo get theme value and subject value
    // send theme value
    createMarksByPeriod();
});
//клік на плюсик в формі телефонів
$(document).on('click', '#add_phone', function (){
    $(this).parent().parent()
        .after(create_input_group_with_button('tel', 'Телефони', 'add_phone'));
    $(this).parent().remove();
});
$(document).on('click', '#add_benefits', function (){
    $(this).parent().parent().after(create_input_group_with_button('text', 'Пільги', 'add_benefits'));
    $(this).parent().remove();
});

$(document).on('click', '#edit_st', function(){
    $('.st-info-ed').removeAttr('readonly').removeAttr('disabled');
    $('#edit_st').addClass('hidden');
    let button = $(`<button class="btn btn-outline-success my_btn"  id="save_student_change">`).text('Зберегти зміни');
    $('.student_info_list').append(button);
    let tel = create_input_group_with_button('tel', 'Телефони', 'add_phone');
    if( $('input[type="tel"]') == undefined)       $('#type_st').parent().before(benefits);
    else  $('input[type="tel"]').last().parent().after(tel);
    let benefits = create_input_group_with_button('text', 'Пільги', 'add_benefits');

    if( $('input[label="Пільги"]').length == 0)   $('#type_st').parent().after(benefits);
    else   $('input[label="Пільги"]').last().parent().after(benefits);
});
let changinggroupflag = false;

$(document).on('click', '#changing_group', function(){
    if(changinggroupflag){
        $('#changing_group_form').remove();
        changinggroupflag = !changinggroupflag;
        return;
    }
    changinggroupflag=!changinggroupflag;
    let div= $(`<div id="changing_group_form">`);
    //todo get AJAX NAME OF SUBJECT ONLY

    $.ajax({
        url: "/getSubjectsInClass",
        type: "GET",
        success: function(subjects){
            console.log(subjects);
            let class_s =[];
            subjects.forEach(st=>{class_s.push(st.subject_name)});
            console.log(class_s);
            let select = create_selected_input(class_s, 'Предмет', 'class_subject', 'Оберіть предмет', 'class_subject', '', '', true);
            let btn = $(`<button class="btn input-group-text" id="choose">`).text('Обрати');
            div.append(select).append(btn);
            $('#changing_group_div').append(div);
        }
    });

    //    let class_s =[];
    //    class_subject.forEach(st=>{class_s.push(st.name)});
    //    console.log(class_s);
    //    let select = create_selected_input(class_s, 'Предмет', 'class_subject', 'Оберіть предмет', 'class_subject', '', '', true);
    //    let btn = $(`<button class="btn input-group-text" id="choose">`).text('Обрати');
    //    div.append(select).append(btn);
    //    $('#changing_group_div').append(div);
});

$(document).on('click', '#parents', function(){
    //todo get id of person, name, and first phone.
    // create rows of persons.
});

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
$(document).on('click', 'td[data-type="dairy"], td[data-type="special"], td[data-type="end"]', function(){
    //todo check if the end mark is editable (if not let to edit comment and visible)
    if($(this).parent().attr('id') == "table_caption") return;
    showMarkView($(this));
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

$(document).on('click', '#choose', function(){
    let subj = $('#class_subject').val();
    createGroupsforStudent(subj)
});

/************************Function***************************/
function nextMenu(item_to_activate) {
    removeClass();
    document.getElementById(item_to_activate).classList.add('active');
}
function removeClass() {
    $('#content').empty();
    removing('students');
    removing('marks');
    removing('attend');
    removing('report');
}

function removing(item) {
    $('#content').empty();
    document.getElementById(item).classList.remove('active');
}
function createMyStudentList(){
    //AJAX
    $.ajax({
        url: "/getStudentsInClass",
        type: "GET",
        success: function(students){
            let data = students.map(function(s){
                return {id: s.personal_file_num, name: s.surname + ' ' + s.student_name + ' ' + s.patronymic, bday: s.birth_date.substr(0, 10), type: s.studying_type};
            })
            $('#content').empty();
            let div = $(`<div id="changing_group_div" >`);
            let form_for_changing_group = $(`<button class="btn btn-outline-success my_btn" id="changing_group">`).text("Змінити групу");
            div.append(form_for_changing_group);
            let container = $(`<div class="container">`);

            data.forEach(student => container.append(student_list_view(student)));
            $("#content").append(div).append(container);
        }
    });
    //    {
    //    id: "N13404024",
    //    name: "Іваненко Ольга Степанівна",
    //    bday: "09.09.2005",
    //    type: "очна"
    //}

    //    let data = student_names;
    //    $('#content').empty();
    //    let div = $(`<div id="changing_group_div" >`);
    //    let form_for_changing_group = $(`<button class="btn btn-outline-success my_btn" id="changing_group">`).text("Змінити групу");
    //    div.append(form_for_changing_group);
    //    let container = $(`<div class="container">`);
    //
    //    data.forEach(student => container.append(student_list_view(student)));
    //    $("#content").append(div).append(container);
}
function  createDetailStudentView(id){
    //todo AJAX request for detail information by student id
    $.ajax({
        url: "/getStudent/" + id,
        type: "GET",
        success: function(student){
            let data = {
                id: id,
                last_name: student.surname,
                first_name: student.student_name,
                second_name: student.patronymic,
                bday: student.birth_date.substr(0,10),
                type: student.studying_type,
                sex: student.sex,
                phone:   ["+38094930333", "+380964071944"],
                address: student.city + ' ' + student.street + ' ' + student.building + ' ' + student.apartment
            };
            $("#content").empty();
            let container = $(`<div class="container">`);
            container.append(student_detail_view(data));
            $("#content").append(container);
        }
    });
    //    let data = {
    //        id: id,
    //        last_name: "Іваненко",
    //        first_name: "Ольга",
    //        second_name: "Степанівна",
    //        bday: "09.09.2005",
    //        type: "очна",
    //        sex: 'Жіноча',
    //        phone:   ["+38094930333", "+380964071944"],
    //        address: "м. Київ, проспект Перемоги 43б квартира 14",
    //    };
    //    $("#content").empty();
    //    let container = $(`<div class="container">`);
    //    container.append(student_detail_view(data));
    //    $("#content").append(container);

}

function createMarksView(data, subj_id){
    let div = $(`<div id="choose_period">`);
    let dataform = $(`<div class="form">`); //можливо краще форму?
    let input=$(`<input type="hidden" name="subject_id", value="${subj_id}">`);
    dataform.append(input);
    let inputdate1 = create_selected_input(data, 'Tема:', 'theme_id_select', 'Оберіть тему', 'theme');
    let submit = $(`<input type="submit" id="create_marks_by_period" class="input-group-text">`);
    div.append(dataform.append(inputdate1).append(submit));
    let marks_view = $(`<div id="marks_view_table" class="hidden" >`);
    let btn_div = $(`<div class="btn-group">`);
    let button_ = $(`<button class="btn btn-outline-dark" id="show_marks_theme">`).text("Тематична оцінка");
    let button_end = $(`<button class="btn btn-outline-dark" id="show_end_marks">`).text("Підсумкові оцінки");
    btn_div.append(button_).append(button_end);
    marks_view.append(btn_div);
    let div_table_wrapper=$(`<div id="marks_table_wrapper" class="row">`);
    let div_first_table = $(`<div class="col-md-12"  id="fst_table">`);
    let div_first_table_caption = $(`<div class="table_header" >`).text('Звичайні оцінки');
    let div_second_table = $(`<div class="col-md-2 hidden" id="sec_table" >`);
    let div_second_table_caption = $(`<div class="table_header" >`).text('Тематична оцінка');
    let div_third_table = $(`<div class="col-md-3 hidden" id="thr_table" >`);
    let div_third_table_caption = $(`<div class="table_header" >`).text('Підсумкові оцінки');
    let table = $(`<table id='marks_'>`);
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
    $('#content').empty();
    $('#content').append(div).append(marks_view);
}
function createGroupsforStudent(subj){
    //get data of students {student_id, names, group_id}
    //get data of groups in this class of this subject
    $.ajax({
        url: "/getStudentsInClass",
        type: "GET",
        success: function(students){
            console.log(students);
            console.log(subj);
            $.ajax({
                url: "/getSubjectsForGroups/" + subj,
                type: "GET",
                success: function(subjects_in_groups){
                    console.log(subjects_in_groups);
                    let form = $(`<form method="post" action="appointStudentsToGroups">`);
                    students.forEach(st=> {
                        let input = create_selected_input(subjects_in_groups.map(s => s.group_number), st.surname + ' ' + st.student_name + ' ' + st.patronymic, '', 1, st.personal_file_num,'','','');
                        form.append(input);
                    });
                    let submit = $(`<input type="submit" class="input-group-text">`).text('Зберегти');
                    form.append(submit);
                    $('#content').empty();
                    $('#content').append(form);
                }
            });
        }
    });
    //    let form = $(`<form>`);
    //    student_names.forEach(st=> {
    //        let input = create_selected_input(['group1','group2', 'group3'], st.name, '', st.group, st.id,'','','');
    //        form.append(input);
    //    });
    //    let submit = $(`<input type="submit" class="input-group-text">`).text('Зберегти');
    //    form.append(submit);
    //    $('#content').empty();
    //    $('#content').append(form);

}
function createMarksByPeriod(){
    //TODO get the theme
    // make AJAX request
    // get the marks from server (WE NEED ONLY VISIBLE MARKS WITH TEACHER ID)
    let table = $('#marks_');
    table.empty();
    let caption = $(`<tr id="table_caption">`);
    let tr = $(`<td  data-column="-1">`).text('Прізвище');
    table.append(caption.append(tr));
    $('#marks_view_table').removeClass('hidden');

    data_names.forEach(student=> {
        let td = $(`<tr id="table-row-${student.id}" class="table-row-${student.id}">`);
        let first_tr = $(`<td  data-column="-1" class="caption_surname">`).text(student.last_name+" "+student.first_name+" "+student.second_name);
        td.append(first_tr);
        table.append(td);
    });

    let column = 0;
    //поточні оцінки
    for(let i = 0; i<dairy_data_marks.length; i++)
    {
        if(dairy_data_marks[i].marks === undefined || dairy_data_marks[i].marks.length===0)
            continue;
        let mark_cell = dairy_data_marks[i];
        let date_format = cellDate(mark_cell.date);
        let date_cell = $(`<td data-column="${column}"  data-date=${mark_cell.date} data-type="dairy">`).text(date_format);
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
            let td = $(`<td data-column="${column}" data-teacher-id="${mark.teacher_id}" data-date=${mark_cell.date} data-type="dairy" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
            row.append(td);
        }
        column++;
    }
    column++;
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
data-mark-name="${mark_cell.name}" data-teacher-id="${mark.teacher_id}" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
            row.append(td);
        }
        column++;
    }

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
        let tr = $(`<tr id="table-th-row-${st.id}" class="table-row-${st.id}">`);
        let mark= them_marks.find(el=> el.id==st.id);
        if(mark==undefined) {
            let td = $(`<td data-column="${column}" data-theme=${theme}  data-type="theme">`);
            tr.append(td);
        }else {
            let td = $(`<td data-column="${column}" data-theme=${theme} data-teacher-id="${mark.teacher_id}" data-type="theme" data-comment="${mark.comment}" data-mark-value="${mark.value}"
data-mark-visible="${mark.visible}">`).text(mark.value);
            tr.append(td);

        }
        table.append(tr);
    })
}


function createEndMarksView() {

    let table = $('#marks_end');
    let caption = $(`<tr id="table_end_caption">`);
    table.empty();
    table.append(caption);
    data_names.forEach(st=>{
        let tr = $(`<tr id="table-end-row-${st.id}" class="table-row-${st.id}">`);
        table.append(tr);
    });
    let column = 2000;
    for(let i = 0; i < end_marks.length; i++){
        let mark = end_marks[i];
        let date_cell = $(`<td data-column="${column}" data-type-mark="${mark.type}" data-type="end">`).text(mark.type);
        caption.append(date_cell);
        data_names.forEach(st=>{
            let marks= mark.marks.find(el=> el.id==st.id);
            let row = $("#table-end-row-"+st.id);

            if(marks===undefined) {
                let td = $(`<td data-column="${column}" data-mark-type="${mark.type}" data-type="end">`);
                row.append(td);
            }else{
                let td = $(`<td data-column="${column}"data-teacher-id="${mark.teacher_id}" data-mark-type="${mark.type}" data-type="end" data-mark-value="${marks.value}"
data-mark-visible="${marks.visible} data-mark-comment=" ${ marks.comment} ">`).text(marks.value);
                row.append(td);
            }
        });
        column++;


    }
    $('#thr_table').removeClass('hidden');
}

//Аналогічний вид можна використати в кабінеті учня
function showMarkView(a) {
    // todo get techer name by id
    //  a.data('teacher-id')
    let value = (a.data('mark-value')==undefined)?'':a.data('mark-value');
    let comment = (a.data('mark-comment')==undefined)?'':a.data('mark-comment');
    let div = $(`<div>`);
    let input_value = create_input_group('number', 'Значення:', value, 'value', '','', true);
    let input_comment = create_input_group('text', 'Коментар:', comment, 'comment','','', true );
    //todo or make a-href and show info about teacher
    let div_techer =  create_input_group('text', 'Вчитель', 'тут має бути імя вчителя', '', '','', true);
    let div_btn = $(`<div class="btn-group">`);
    let cancel = $(`<button class="btn btn-outline-dark" type= "reset" id="cancel">`).text("Назад");
    div_btn.append(cancel);
    div.append(input_value).append(input_comment).append(div_techer).append(div_btn);
    createWindow(div);
}

function createSubjectView(){
    let data_subj = class_subject;
    $("#content").empty();
    data_subj.forEach(subj=>{console.log(subj);
                             $('#content').append(subject_view_maker('', subj))});

}

function createAttendingView()
{
    let div = $(`<div id="choose_attend_period">`);
    let dataform = $(`<div class="form">`); //можливо краще форму?
    let inputdate1 = create_input_group('date', 'Дата початку', '', 'start_date', '','','',true);
    let inputdate2 = create_input_group('date', 'Кінцева дата', '', 'end_date','','','',true);

    let submit = $(`<input type="submit" id="create_attend_by_period" class="input-group-text">`);
    div.append(dataform.append(inputdate1).append(inputdate2).append(submit));
    let marks_view = $(`<div id="attend_view_table" class="hidden">`);
    let table = $(`<table id='attend_table'>`);
    marks_view.append(table);
    $('#content').append(div).append(marks_view);
}
//{date:, absent:[student_id:, number_of_lessons:, reason:, lessons:[id:, name:]]}
function  createAttendingViewTable(){
    let table = $('#attend_table');
    let tablecaption = $(`<tr id="caption_surnames">`);
    let caption= $(`<td>`).text('Прізвище');
    table.append(tablecaption.append(caption));
    student_names.forEach(st=> {
        let tr = $(`<tr id="table-row-${st.id}" class="table-row-${st.id}">`);
        let td = $(`<td class="caption_surname">`).text(st.name);
        tr.append(td);
        table.append(tr);
    });
    let column = 0;
    data_attend.forEach(att=>{
        let date_format = cellDate(att.date);
        let datetd = $(`<td data-column="${column}" data-date=${cutData(att.date)} data-type="attend">`).text(date_format);
        tablecaption.append(datetd);
        student_names.forEach(st=> {
            let absent = att.absent.find(el=> el.student_id==st.id);
            let row = $("#table-row-"+st.id);
            let text = 'H';
            if(absent==undefined) text='';
            let td = $(`<td data-column="${column}" data-st-id="${st.id}" data-date=${cutData(att.date)} data-attend="${text}" data-type="attend">`).text(text);
            row.append(td);
        });
        column++;
    });

    $("#attend_view_table").removeClass('hidden');
}
//{date:, absent:[student_id:, number_of_lessons:, reason:, lessons:[id:, name:]]}
function showViewAttend(a){
    let div = $(`<div>`);
    let button_back = $(`<button type="reset" id="cancel" class="btn-outline-dark btn">`).text('Назад');
    let date =a.data('date');
    let stid =a.data('st-id');
    div.append(button_back);
    let attending_caption = $(`<div class="attending_caption">`);
    let span_name = $(`<span>`).text(student_names.find(st=>st.id==stid).name);
    let span_date = $(`<span>`).text(date);
    let attending_info = $(`<div class="attending_info">`);
    attending_caption.append(span_name).append(span_date);
    let attend = (a.data('attend') == '');//'Присутній(я) на всіх уроках':'Не було на уроках: ';
    let div_attend= $(`<div class="attending">`).text(attend?'Присутній(я) на всіх уроках':'Не було на уроках:');
    let dateDate =  new Date(Date.parse(date));
    attending_info.append(div_attend);
    if(!attend) {
        let div_lesson = $(`<div>`);
        let attending = data_attend.find(att => att.date.toLocaleDateString() == dateDate.toLocaleDateString());
        console.log(attending);
        console.log(stid);
        let student_attend = attending.absent.find(st=>st.student_id==stid);
        console.log(student_attend);
        student_attend.lessons.forEach(lessons=> {
            let div_l = $(`<div class="input-group-text">`).text(lessons.name);
            div_lesson.append(div_l);}
                                      );
        let input_reason = create_input_group('text', 'Причина:', student_attend.reason, 'reason');
        let divbutt = $(`<div class="btn-group">`);
        let button_ok = $(`<button type="submit" id="sendReason" class="btn-outline-dark btn">`).text('Зберегти');
        let button_cancel = $(`<button type="reset" id="cancel" class="btn-outline-dark btn">`).text('Скасувати');
        divbutt.append(button_ok).append(button_cancel);
        attending_info.append(div_lesson).append(input_reason).append(divbutt);

    }
    div.append(attending_caption).append(attending_info);
    createWindow(div);
}


function create_selected_input(data, label, id, value, name, class_, readonly, required) {
    let group =$(`<div class="input-group mb-1">`);
    let prep = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let select = $(`<select class="custom-select ${class_}" name='${name}' id="${id}">`);
    if(readonly) select.attr('disabled', 'true');
    if(required) select.attr('required', 'true');
    select.append($(`<option value="" disabled selected>`).text(value));
    data.forEach(option=> {let opt = $(`<option value="${option}">`).text(option);
                           select.append(opt)});
    return group.append(prep.append(span)).append(select);
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
function create_input_group_num(input_type, label, value, name, class_, min, max, step, checked, readonly, required){
    let group =$(`<div class="input-group mb-1">`);
    let pregroup = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let input = $(`<input type="${input_type}"  value = "${value}" min="${min}" step="${step}" max="${max}" name="${name}" class="form-control ${class_}">`);
    if(checked) input.attr('checked', 'true');
    if(readonly) input.attr('readonly', 'true');
    if(required) input.attr('required', 'true');
    return group.append(pregroup.append(span)).append(input);
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
function createWindow(innerItem){
    let back =$(` <div class = "backgr" id="bacground_adding_parents">`);
    let form = $(` <div class="forming" id="forming">`);
    $('.body').before(back.append(form.append(innerItem)));
}
function createMenuReportsButtons(){

    let divbuttons = $('<div>');
    let row1 =$('<div class="row m-1">');
    let row2 = row1.clone();
    let row3 = row1.clone();
    let rating_button = $('<button class="btn-outline-success my_btn btn col-7" id="current_students_rating">').text('Поточний рейтинг учнів');
    row1.append(rating_button);
    let attend_button = $(`<button class="btn btn-outline-success my_btn  col-7" id="attend_student_report">` ).text('Кількість пропущених днів');
    row2.append(attend_button);
    let end_button = $(`<button class="btn btn-outline-success my_btn  col-7" id="end_mark_report">`).text('Список підсумкових оцінок');
    row3.append(end_button);
    divbuttons.append(row1).append(row2).append(row3);
    $('#content').append(divbuttons);
}

/*****************************HTML*****************************/
let  student_list_view = ({
    id: id, //номер особистої справи
    name: name,
    bday: bday,
    type: type

})=>{
    let line = $(`<div class="row st-list" data-id="${id}">`);
    let divname = $(`<div class="lt col-md-6 name">`).text(name);
    let divid = $(`<div class="lt  col-md-2 id">`).text(id);
    let divbday = $(`<div class="lt col-md-2 bday">`).text(bday);
    let dtype  = $(`<div class="lt col-md-2 type">`).text(type);
    line.append(divname).append(divid)
        .append(divbday).append(dtype);
    return line;
};
let student_detail_view =({
    id: id, //номер особистої справи
    first_name: name,
    second_name: secname,
    last_name: surname,
    bday: bday,
    type: type,
    sex: sex,
    phone: array_t,
    address: address,
    p : p //пільги
}) => {
    let student_block = $(`<div class="student_info_list">`);
    let divbuttons =  $(`<div class="justify-content-between m-2">`);
    let button = $(`<div class="btn my_btn btn-outline-success" id="back_to_st-list">`).text('Назад');
    let edit = $(`<div class="btn my_btn btn-outline-success" id="edit_st">`).text('Редагувати');
    divbuttons.append(button).append(edit);
    let input_key = create_input_group('text', 'Номер особової справи', id, 'id', 'st-info-ed','',true, true);
    student_block.append(divbuttons);
    student_block.append(input_key);
    let input_name = create_input_group('text', "Прізвище", surname, 'last_name', 'st-info-ed', '', true, true);
    let input_2name = create_input_group('text', "Ім'я", name, 'first_name', 'st-info-ed', '', true, true);
    let input_sname = create_input_group('text', "По батькові", secname, 'second_name', 'st-info-ed', '', true, true);
    let input_sex = create_selected_input(['Жіноча', 'Чоловіча'], "Стать", '', sex, 'sex',  'st-info-ed', true, true);
    let input_bday = create_input_group('data', "Дата народження", bday, 'bday', 'st-info-ed', '', true, true);
    //todo change address information
    let input_address_sity = create_input_group('text', "Місто", address, 'sity', 'st-info-ed', '', true, true);
    let input_address_street = create_input_group('text', "Вулиця", address, 'street', 'st-info-ed', '', true, true);
    let input_address_bulding = create_input_group('text', "Будинок", address, 'building', 'st-info-ed', '', true, true);
    let input_address_flat = create_input_group('text', "Квартира", address, 'flat', 'st-info-ed', '', true, false);


    student_block.append(input_name).append(input_2name).append(input_sname).append(input_sex).append(input_bday);
    student_block.append(input_address_sity).append(input_address_street).append(input_address_bulding).append(input_address_flat);
    let i = 0;
    //TODO add opportunity to add several new phones and to delete some of them
    if(array_t!=undefined&&array_t!=='')
        array_t.forEach(ph => {let in_ph = create_input_group("tel", 'Телефони', ph, 'phone'+i, 'st-info-ed','', true, false);
                               i++;
                               student_block.append(in_ph);});
    i= 0;
    if(p!=undefined&&p!=='')
        p.forEach(ph => {let in_ph = create_input_group("text", 'Пільги', ph, 'benefit'+i, 'st-info-ed','',true,true);
                         i++;
                         student_block.append(in_ph);});
    let input_type = create_selected_input(['Очна', 'Заочна'], 'Тип', 'type_st', type, 'type', 'st-info-ed', true, true);
    let buttonparents =$(`<button id="parents" class="btn my_btn btn-outline-success input-group-text">`).text('Відповідальні особи');
    student_block.append(input_type);
    student_block.append(buttonparents);
    return student_block;
};
/*------Subject-creator-----*/
let subject_view_maker =  (subj,{
    id: id,
    name: name,
    class_name: class_name, // 5-A

}) => {
    subj = 'subject-btn';
    let $subject = $(`<button data-id="${id}" type="button" class="btn my_btn ${subj} btn-outline-success my-2 btn-lg btn-block">`);
    $subject.text(name+" "+class_name+" "+id);
    return $subject;

};
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


createMyStudentList();