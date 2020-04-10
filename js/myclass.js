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
    console.log('here');
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
    createSubjectMarksView($(this).data('id'));
    //TODO get themes from subject and create filtration form like in subject.js
    // then choose them get marks and give readonly marks show

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
$(document).on('click', '#edit_st', function(){
    $('.st-info-ed').removeAttr('readonly').removeAttr('disabled');
    $('#edit_st').addClass('hidden');
    let button = $(`<button class="btn btn-outline-success my_btn"  id="save_student_change">`).text('Зберегти зміни');
    $('.student_info_list').append(button);

});
let changinggroupflag = false;

$(document).on('click', '#changing_group', function(){
    if(changinggroupflag){
        $('#changing_group_form').remove();
        changinggroupflag = !changinggroupflag;
        return;
    };
    changinggroupflag=!changinggroupflag;
    let div= $(`<div id="changing_group_form">`);
    //todo get AJAX NAME OF SUBJECT ONLY
    let class_s =[];
    class_subject.forEach(st=>{class_s.push(st.name)})
    console.log(class_s);
    let select = create_selected_input(class_s, 'Предмет', 'class_subject', 'Оберіть предмет', 'class_subject', '', '', true);
    let btn = $(`<button class="btn input-group-text" id="choose">`).text('Обрати');
    div.append(select).append(btn);
    $('#changing_group_div').append(div);
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
    let data = student_names;
    $('#content').empty();
    let div = $(`<div id="changing_group_div" >`);
    let form_for_changing_group = $(`<button class="btn btn-outline-success my_btn" id="changing_group">`).text("Змінити групу");
    div.append(form_for_changing_group);
    let container = $(`<div class="container">`);

    data.forEach(student => container.append(student_list_view(student)));
    $("#content").append(div).append(container);
}
function  createDetailStudentView(id){
    //todo AJAX request for detail information by student id
    let data = {
        id: id,
        last_name: "Іваненко",
        first_name: "Ольга",
        second_name: "Степанівна",
        bday: "09.09.2005",
        type: "очна",
        sex: 'Жіноча',
        phone:   ["+38094930333", "+380964071944"],
        address: "м. Київ, проспект Перемоги 43б квартира 14",
    };
    $("#content").empty();
    let container = $(`<div class="container">`);
    container.append(student_detail_view(data));
    $("#content").append(container);

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

function createSubjectMarksView(id) {

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
let student_list_view = ({
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
    let buttonparents =$(`<button class="btn my_btn btn-outline-success input-group-text">`).text('Відповідальні особи');
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

createMyStudentList();