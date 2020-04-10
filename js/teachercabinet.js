//Tasks
// - add checking if teacher has a class
//
//
//
/*------------------Listeners-----------------------*/
//Left-menu navigation
$(document).on('click', '#t_cab', function () {
    nextMenu('t_cab');
    document.getElementById('mycabinet').classList.remove('hidden');
    document.getElementById('content').classList.add('hidden');
    getTeacherInfo();
});


$(document).on('click', '#my_class', function () {
    nextMenu('my_class');
    window.location.href = './myclass'
    //go to another page with class
});

$(document).on('click', '#my_subject', function () {
    nextMenu('my_subject');
    createSubjectView();
});
$(document).on('click', '#ex_subject', function () {
    nextMenu('ex_subject');
    createExSubjectView();
});

function openSubject(id){
    window.location.href = './subject?id=' + id;
}

// subject-button
//$(document).on('click', '.subject-btn', function() {
//    //goto page with subject
//    window.location.href = './subject.html'
//
//});
/*------------------------------------------------------*/
/************************Function***************************/
/*-----Left-menu navigating-----*/
function nextMenu(item_to_activate) {
    removeClass();
    document.getElementById(item_to_activate).classList.add('active');
    document.getElementById('mycabinet').classList.add('hidden');
}
function removeClass() {
    $('#content').empty();
    removing('t_cab', 'mycabinet');
    removing('my_class', 'content');
    removing('my_subject', 'content');
    removing('ex_subject', 'content');
}

function removing(item, div) {

    document.getElementById(item).classList.remove('active');
    if(document.getElementById(div) != null)
        document.getElementById(div).classList.remove('hidden');
}
/*------------------------AJAX--------------------------------*/
function createSubjectView(){
    /*AJAX*/
    
    $.ajax({
        url: "/getTeacherSubjects",
        type: "GET",
        contentType: "application/json",
        success: function(subjects){
            console.log(subjects);
            subjects.forEach(subj=>{$('#content').append(subject_view_maker('', subj))});
        }
    });
    
//    let data_subj = [{id: '5AG1', name: 'English', class_name:'5-A'},
//                     {id: '5AG2', name: 'English', class_name: '5-A'},
//                     {id: '5BG1', name: 'English', class_name:'5-B'}]
//
//    data_subj.forEach(subj=>{$('#content').append(subject_view_maker('', subj))})
}

function createExSubjectView(){
    /*AJAX*/
    let data_subj = [{id: '6AG1', name: 'English', class_name:'6-A'},
                     {id: '6AG2', name: 'English', class_name: '6-A'},
                     {id: '6BG1', name: 'English', class_name:'6-B'}]

    data_subj.forEach(subj=>{$('#content').append(subject_view_maker('ex-subj', subj))})
}

//fills the info in the Мій Кабінет tab
function getTeacherInfo(){
    $.ajax({
        url: "/getTeacher",
        type: "GET",
        contentType: "application/json",
        success: function(teacher){
            $('#info_surname').html("Прізвище: " + teacher.surname);
            $('#info_name').html("Ім'я: " + teacher.teacher_name);
            $('#info_patronymic').html("По-батькові: " + teacher.patronymic);
            $('#info_birthday').html("Дата початку роботи: " + teacher.work_start_date.substr(0,10));
            $('#info_address').html("Адреса: " + teacher.city + ", " + teacher.street + " " + teacher.building + "/" + teacher.apartment);
            $('#info_phones').html("Телефони: ");
        }
    });
}
/*****************************HTML*****************************/
/*------Subject-creator-----*/
let subject_view_maker =  (subj,{
    subject_id: id,
    subject_name: name,
    class_id: class_id, // 5-A

}) => {
    if (subj == null||subj.length == 0) {subj = 'subject-btn'}
    let $subject = $(`<button data-id="${id}" type="button" class="btn my_btn ${subj} btn-outline-success my-2 btn-lg btn-block" onclick="openSubject(${id})">`);
    $subject.text(name+" "+class_id.substring(0,class_id.length-5) + '-' + class_id.substring(class_id.length - 5, class_id.length - 4));
    return $subject;

}

window.onload = function(){ getTeacherInfo(); };