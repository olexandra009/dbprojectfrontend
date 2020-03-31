
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

})
//back_to_st-list
$(document).on('click', '#back_to_st-list', function () {

    createMyStudentList();

})
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
    let data = [{
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
        }]
    $('#content').empty();

    let container = $(`<div class="container">`);

    data.forEach(student => container.append(student_list_view(student)));
    $("#content").append(container);
}
function  createDetailStudentView(id){
      //AJAX
    let data = {
        id: "N13404024",
        name: "Іваненко Ольга Степанівна",
        bday: "09.09.2005",
        type: "очна",
        sex: 'Жіноча',
        phone:   ["+38094930333", "+380964071944"],
        address: "м. Київ, проспект Перемоги 43б квартира 14",
    }
    $("#content").empty();
    let container = $(`<div class="container">`);
    container.append(student_detail_view(data));
    $("#content").append(container);

}
function createSubjectView(){
    /*AJAX*/
    let data_subj = [{id: '5AG1', name: 'English', class_name:'5-A'},
        {id: '5AG2', name: 'English', class_name: '5-A'},
        {id: '5BG1', name: 'English', class_name:'5-B'}]
    $("#content").empty();
    data_subj.forEach(subj=>{console.log(subj);
        console.log(subject_view_maker('',subj))
        $('#content').append(subject_view_maker('', subj))})

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
    let button = $(`<div class="btn my_btn btn-outline-success" id="back_to_st-list">`).text('Назад')
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
}
/*------Subject-creator-----*/
let subject_view_maker =  (subj,{
    id: id,
    name: name,
    class_name: class_name, // 5-A

}) => {
    if (subj == null) subj = 'subject-btn'
    let $subject = $(`<button data-id="${id}" type="button" class="btn my_btn ${subj} btn-outline-success my-2 btn-lg btn-block">`);
    $subject.text(name+" "+class_name+" "+id);
    return $subject;

}

createMyStudentList();