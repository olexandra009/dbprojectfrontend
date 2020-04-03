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
});
$(document).on('click', '#back_to_cabinet', function () {
     window.location.href='./teachercabinet.html';
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

    let container = $(`<div class="container">`);

    data.forEach(student => container.append(student_list_view(student)));
    $("#content").append(container);
}
function  createDetailStudentView(id){
    //todo AJAX request for detail information by student id
    let data = {
        id: id,
        name: "Іваненко Ольга Степанівна",
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
    /*AJAX*/
    let data_subj = class_subject;
    $("#content").empty();
    data_subj.forEach(subj=>{console.log(subj);
        console.log(subject_view_maker('',subj));
        $('#content').append(subject_view_maker('', subj))});

}

function createAttendingView()
{
    let div = $(`<div id="choose_attend_period">`);
    let dataform = $(`<div class="form">`); //можливо краще форму?
    let inputdate1 = create_input_group('date', 'Дата початку', '', 'start_date');
    let inputdate2 = create_input_group('date', 'Кінцева дата', '', 'end_date');

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
    name: name,
    bday: bday,
    type: type,
    sex: sex,
    phone: array_t,
    address: address,
    p : p //пільги
}) => {
    let button = $(`<div class="btn my_btn btn-outline-success" id="back_to_st-list">`).text('Назад');
    let student_block = $(`<div>`);
    let empty_r = $(`<div class="row" style="height: 20px">`);
    let r_name = $(`<div class="row">`);
    let r_sex = $(`<div class="row">`);
    let st_name = $(`<div class="col-md-9">`).text(name);
    let t_sex = $(`<div class="col-md-4">`).text('Стать: '+sex);
   // let st_sex = $(`<div class="col-md-1">`).text(sex);
    r_name.append(st_name);
    r_sex.append(t_sex);
        //.append(st_sex);
    let r_bday =  $(`<div class="row">`);
    let t_bday =  $(`<div class="col-md-4">`).text('Дата народження:');
    let st_bday = $(`<div class="">`).text(bday);
    r_bday.append(t_bday).append(st_bday);
    let r_t_addr =   $(`<div class="row">`);
    let t_addr= $(`<div class="col-md-12">`).text('Адреса:');
    let st_addr = $(`<div class="col-md-12">`).text(address);
    r_t_addr.append(t_addr).append(st_addr);
   student_block.append(button).append(empty_r).append(r_name)
       .append(r_sex).append(r_bday).append(r_t_addr);
    if(array_t!=null&&array_t.length != 0) {
        let r_phone =  $(`<div class="row">`);
        let t_phone = $(`<div class="col-12">`).text('Телефони:');
        let st_phone = $(`<div class="col-12">`);
        array_t.forEach(ph => st_phone.append($(`<div>`).text(ph)));
        r_phone.append(t_phone).append(st_phone);
        student_block.append(r_phone);
    }
    if(p!=null&&p.length != 0) {
        let r_p =  $(`<div class="row">`);
        let t_p = $(`<div>`).text('Пільги:');
        let st_p = $(`<div>`);
        p.forEach(ph => st_p.append($(`<div>`).text(ph)));
        r_p.append(t_p).append(st_p);
        student_block.append(r_p);
    }
    let r_t =   $(`<div class="row">`);
    let t_type= $(`<div class="col-4">`).text('Тип навчання:');
    let st_type = $(`<div>`).text(type);
    r_t.append(t_type).append(st_type);
    student_block.append(r_t);
    let pers = $(`<div class="res_person" data-id = "${id}">`).text("Відповідальні особи");
    let marks = $(`<div class="st_mark" data-id = "${id}">`).text("Оцінки");
    student_block.append(pers).append(marks);
    return student_block;
};
/*------Subject-creator-----*/
let subject_view_maker =  (subj,{
    id: id,
    name: name,
    class_name: class_name, // 5-A

}) => {
    if (subj == null) subj = 'subject-btn';
    let $subject = $(`<button data-id="${id}" type="button" class="btn my_btn ${subj} btn-outline-success my-2 btn-lg btn-block">`);
    $subject.text(name+" "+class_name+" "+id);
    return $subject;

};

createMyStudentList();