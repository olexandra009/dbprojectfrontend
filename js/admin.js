/************************Listeners************************/
/***********Left-menu navigation*********/
$(document).on('click', '#administry', function () {
    nextMenu('administry');
    document.getElementById('admin_button').classList.remove('hidden');
    document.getElementById('content').classList.add('hidden');

});

$(document).on('click', '#subject', function () {
    nextMenu('subject');
    creatingSubjectList();

});

$(document).on('click', '#teacher', function () {
    nextMenu('teacher');
    addingTeacherView();
    filterTeacherCreating();
    creatingTeacherList();
});

$(document).on('click', '#student', function () {
    nextMenu('student');
    addingStudentView();
    filterStudentCreating();
    creatingStudentList();
});

$(document).on('click', '#class', function () {
    nextMenu('class');
    addingClassView();
});


$(document).on('click', '#parents', function () {
    nextMenu('parents');
    createParentsView();
    creatingParentsList();
});

/*******************************************/
//Змінні кнопок адміністрування (прапорці розгортки)
let tch_subj = false;
let tch_ex = false;
let cls_le = false;
//Адміністрування=> Призначити вчителя на предмет
$(document).on('click','#tch_subj', function(){
    if(tch_subj){
        $('#tch_subj_form').remove();
        tch_subj = false;
        return;
    }
    appointTeacherForTheSubject();
});

//Адміністрування=> Призначити вчителя на заміну
$(document).on('click','#tch_ex', function () {
    if(tch_ex){
        $('#tch_ex_form').remove();
        tch_ex = false;
        return;
    }
    appointSubstituteTeacher();
});
//Адміністрування=> Визначити класних керівників
$(document).on('click','#cls_le', function () {
    if(cls_le){
        $('#cls_le_form').remove();
        cls_le = false;
        return;
    }
    identifyClassroomLeaders()
});

//Змінні-прапорці для кнопок створення
let createStudent = false;
let createTeacher = false;
let createSubject = false;
let createCSubject = false;
let createClass = false;
let createPerson = false;

//Вчителі => Додати вчителя
$(document).on('click', '#add_teacher', function (){
    if(!createTeacher) {
        createFormForAddingTeacher();
        createTeacher = true;
    } else {
        $('#form_teacher').remove();
        createTeacher = false;
    }
});

$(document).on('click', ".th-list", function(){
    let id = ($(this).data("id"));
    createTeacherViewById(id);
});
//edit_teacher
$(document).on('click', "#edit_teacher", function(){
    let dat = ($(this));
    console.log("here");
    createEditTeacherViewById(dat);

});
//teacher_non клік скасувати або назад при редагуванні вчителя
$(document).on('click','#teacher_non', function () {

    let id = ($(this).data("id"));
    createTeacherViewById(id);

});

$(document).on('click','#teacher_dismiss', function () {
    // let id = ($(this).data("id"));
    //TODO dismiss teacher

});
$(document).on('click','#teacher_delete', function () {
    // let id = ($(this).data("id"));
    //TODO delete teacher

});
//TODO adequate treatment of the filter-button

// Предмети => клік на назву
$(document).on('click', '.s_btn', function () {
    //ми отримали назву предметів які треба вивести
    let subj =  $(this).data('name');
    createConcreteSubjectList(subj);
});
// Предмети => Назви предметів => Клік на конкретний предмет
$(document).on('click', '.sd_btn', function () {
    //ми отримали шифр предмету треба вивести інформацію про предмет
    //let subj =  $(this).data('id');
    createConcreteSubjectInformation();
    //TODO check if it is work
});

// Предмети => Додати групу предметів
$(document).on('click', '#add_subject', function (){
    if(!createSubject) {
        createFormForAddingSubject();
        createSubject = true;
    } else {
        $('#form_subject').remove();
        createSubject = false;
    }
});
// Предмети => Назви предметів => Конкретний предмет Додати предмет
$(document).on('click', '#add_c_subject', function () {
    if(!createCSubject) {
        createFormForAddingConcreteSubject($('#add_c_subject').attr('name'));
        createCSubject = true;
    } else {
        $('#form_c_subject').remove();
        createCSubject = false;
    }
});


//Класи => Додати клас
$(document).on('click', '#add_class', function () {
    if(createClass){
        createClass = false;
        $('#form_class').remove();
        return;
    }
    createClass = true;
    createFormForAddingClass();
});
//TODO list of classes with full view, edit, delete, maybe remove students,
// journal-marks

//Учні => Додати учня
$(document).on('click', '#add_student', function (){
    if(!createStudent) {
        createFormForAddingStudent();
        createStudent = true;
    } else {
        $('#form_student').remove();
        createStudent = false;
    }
});

$(document).on('click', '.st-list', function(){
    //TODO let editable list of student, create opportunity for delete info
    let id = ($(this).data("id"));
    createStudentViewById(id);

});
$(document).on('click', '.par-list', function(){
    //TODO let editable list of student, create opportunity for delete info
    let id = ($(this).data("id"));
    createParentDetailViewById(id);

});

$(document).on('click', '#edit_student', function(){
    createEditStudentViewById($('#edit_student'));
});

$(document).on('click', '#edit_parent', function(){
    createEditParentViewById($('#edit_parent'));
});

$(document).on('click','#student_non', function () {

    let id = ($(this).data("id"));
    createStudentViewById(id);

});
$(document).on('click','#parent_non', function () {

    let id = ($(this).data("id"));
    createParentDetailViewById(id);

});


$(document).on('click', '#add_parent', function (){
    if(!createPerson) {
        createFormForAddingParent();
        createPerson = true;
    } else {
        $('#form_add_parent').remove();
        createPerson= false;
    }
});
$(document).on('click','#parent_delete', function () {
    //todo delete parent
});

$(document).on('click','#parent_save_edit', function () {
    //todo save edited person
});
$(document).on('click','#parent_save_edit', function () {
    //todo save edited student
});
//TODO adequate treatment of the filter-button



/*****************Form-inner buttons*******************/
//Клік на плюсик до пільг
$(document).on('click', '#add_benefits', function (){
    $(this).parent().parent().after(create_input_group_with_button('text', 'Пільги', 'add_benefits'));
    $(this).parent().remove();
});
//клік на плюсик в формі телефонів
$(document).on('click', '#add_phone', function (){
    $(this).parent().parent()
        .after(create_input_group_with_button('text', 'Телефон', 'add_phone'));
    $(this).parent().remove();
});

//клік на Додати Відповідальну особу в формі додавання студентів
$(document).on('click', '#create_persons', function (){
    let div = createPersonForm();
    createWindow(div);
});
//клік на Скасувати Форма додати учня => додати відповідальну особу
$(document).on('click','#cn_add_parents', function () {
    $("#bacground_adding_parents").remove();
});

/************************Function***************************/
/*******Left-menu navigation function********/
//activate navigation element
function nextMenu(item_to_activate) {
    removeClass();
    document.getElementById(item_to_activate).classList.add('active');
}
//make sure that no classes are repeat
function removeClass() {
    document.getElementById('teacher_view').classList.remove('hidden');
    document.getElementById('teacher_view').classList.add('hidden');
    document.getElementById('student_view').classList.remove('hidden');
    document.getElementById('student_view').classList.add('hidden');
    document.getElementById('admin_button').classList.remove('hidden');
    document.getElementById('admin_button').classList.add('hidden');
    document.getElementById('parents_view').classList.remove('hidden');
    document.getElementById('parents_view').classList.add('hidden');

    document.getElementById('content').classList.remove('hidden');

    $('#content').empty();
    removing('subject');
    removing('student');
    removing('teacher');
    removing('administry');
    removing('class');
    removing('parents');
}
//remove active class from item
function removing(item) {
    $('#content').empty();
    document.getElementById(item).classList.remove('active');
}
/*************Administrator-page function ****************/
function appointTeacherForTheSubject(){
    //TODO Maybe change view for list of relevant subject and drop-down list of teachers
    // who working now. With value of relevant teacher
    //TODO Close another buttons on click
    $.ajax({
        url: "/getTeachers",
        type: "GET",
        contentType: "application/json",
        success: function(teachers){
            $.ajax({
                url: "/getSubjectInGroup",
                type: "GET",
                success: function(subjectsInGroup){
                    let subjects = subjectsInGroup.map(function(subj){
                        return subj.subject_name + " " + subj.class_id.substring(0, subj.class_id.length - 5) + "-" + 
                            subj.class_id.substring(subj.class_id.length - 5, subj.class_id.length - 4) + " " + subj.class_id.substring(subj.class_id.length - 4) + 
                            " ID: " + subj.subject_id;
                    });

                    teachers = teachers.map(function(teacher){
                        return teacher.surname + " " + teacher.teacher_name + " " + teacher.patronymic + " ID: " + teacher.tabel_number;
                    });

                    tch_subj = true;
                    let form = $('<form class="container" method="post" id="tch_subj_form" onsubmit="return checkAppointTeacherToSubj()" action="appointTeacherToSubj">');
                    let subj = create_selected_input(subjects, 'Предмет:', "type_edu", "Оберіть предмет", "subject");
                    let tch = create_selected_input(teachers, 'Вчитель:', "class_type", "Оберіть вчителя", "teacher");
                    let submit = $(`<input type="submit" class="input-group-text">`);
                    form.append(subj).append(tch).append(submit);
                    $(`#tch_subj`).after(form);
                }
            });
        }
    });
}
function checkAppointTeacherToSubj(){
    if(document.forms['tch_subj_form']['subject'].value == '') return false;
    if(document.forms['tch_subj_form']['teacher'].value == '') return false;
}

function appointSubstituteTeacher(){
    //TODO Ajax request for list of subject and list of teacher
    //TODO Close another buttons on click
    tch_ex = true;
    let form = $('<form class="container" method="post" id="tch_ex_form">');
    let subj = create_selected_input(['очна','заочна'], 'Предмет:', "type_edu", "Оберіть предмет");
    let tch = create_selected_input(['2','4'], 'Вчитель:', "class_type", "Оберіть вчителя");
    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(subj).append(tch).append(submit);
    $(`#tch_ex`).after(form);
}


function identifyClassroomLeaders(){
    // TODO send changed data to the server
    // TODO maybe change tch_list to form or change submit to button and one more
    //  listners

    $.ajax({
        url: "/getTeachers",
        type: "GET",
        contentType: "application/json",
        success: function(teachers){
            $.ajax({
                url: "/getTeacherClasses",
                type: "GET",
                contentType: "application/json",
                success: function(teacherClasses){
                    console.log(teacherClasses);
                    teacherClasses.sort(function(a,b){
                        return a.class.class_number - b.class.class_number || a.class.class_char - b.class.class_char;
                    });

                    cls_le=true;
                    let tch_list = $(`<div id="cls_le_form">`);
                    let teacher_data = teachers.map(function(teacher){
                        return teacher.surname + " " + teacher.teacher_name + " " + teacher.patronymic + " ID: " + teacher.tabel_number;
                    });
                    
                    let classPairs = teacherClasses.map(function(item){
                        if(item.teacher) {
                            return {class: item.class.class_id.substring(0, item.class.class_id.length - 5) + "-" + item.class.class_id.substring(item.class.class_id.length - 5, item.class.class_id.length - 4) + " " + item.class.class_id.substring(item.class.class_id.length - 4), 
                                   teacher: item.teacher.surname + " " + item.teacher.teacher_name + " " + item.teacher.patronymic + " ID: " + item.teacher.tabel_number}
                        } else {
                            return {class: item.class.class_id.substring(0, item.class.class_id.length - 5) + "-" + item.class.class_id.substring(item.class.class_id.length - 5, item.class.class_id.length - 4) + " " + item.class.class_id.substring(item.class.class_id.length - 4), 
                                   teacher: ''}
                        }
                    });
                    classPairs.forEach(({class: cn, teacher: tc}) =>    {
                        if(tc===undefined|| tc == null || tc === '') {
                            let input = create_selected_input(teacher_data, cn, "", "Оберіть вчителя");
                            tch_list.append(input)
                        }else{
                            let input = create_selected_input(teacher_data, cn, "", tc);
                            tch_list.append(input)
                        }
                    });
                    let submit = $(`<input type="submit" class="input-group-text">`);
                    tch_list.append(submit);
                    $('#cls_le').after(tch_list);
                }
            });
        }
    });

    //    cls_le=true;
    //    let tch_list = $(`<div id="cls_le_form">`);
    //    let teacher_data = ["Teacher1", "Teacher2", "Teacher3"]; //ajax data
    //    let classPairs  = [{'class':'5-A', 'teacher': 'Teacher1'}, //ajax data
    //                       {'class':'6-A', 'teacher': 'Teacher2'},
    //                       {'class':'7-A', 'teacher': ''}];
    //    classPairs.forEach(({class: cn, teacher: tc}) =>
    //                       {
    //        if(tc===undefined|| tc == null || tc === '') {
    //            let input = create_selected_input(teacher_data, cn, "", "Оберіть вчителя");
    //            tch_list.append(input)
    //        }else{
    //            let input = create_selected_input(teacher_data, cn, "", tc);
    //            tch_list.append(input)
    //        }
    //    });
    //    let submit = $(`<input type="submit" class="input-group-text">`);
    //    tch_list.append(submit);
    //    $('#cls_le').after(tch_list);
}
/*************Teacher-page function ****************/
//Create filter-form
function filterTeacherCreating(){
    //TODO Ajax request for existing teacher qualifications
    //TODO Add empty option
    let qualification =  $('#qw');
    let array = form_teacher_filter({qw_list:["qw1", "qw2","qw3"]});
    qualification.empty();
    array.forEach(a=>qualification.append(a));
    document.getElementById("teacher_view").classList.remove('hidden');
}
//Create teacher-list
function creatingTeacherList(){
    $.ajax({
        url: "/getTeachers",
        type: "GET",
        contentType: "application/json",
        success: function(teachers){
            let data = teachers.map(function(teacher){
                return {t_n: teacher.tabel_number, name: teacher.surname + " " + teacher.teacher_name + " " + teacher.patronymic,
                        qwl: teacher.qualification_name}
            })

            let container = $(`<div class="container">`);
            data.forEach(th => { container.append(teacher_list(th))});
            $('#content').append(container);
        }
    });
}
//create button to add teacher
function addingTeacherView(){
    let teacher_add = $('#teacher_add');
    teacher_add.empty();
    let theme = $(`<div class="cotainer teacher">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_teacher">`).text('Додати вчителя'));
    theme.append($(`<div id="add_teacher_form">`));
    teacher_add.append(theme);
}
//create form for adding teacher
function createFormForAddingTeacher(){
    let form = $('<form class="container" method="post" id="form_teacher" name="form_teacher" onsubmit="return checkAddingTeacher()" action="createTeacher">');
    let input_tabel_number = create_input_group('number', "Табельний номер","","tabel_number");
    let input_surname = create_input_group('text', "Прізвище","","last_name");
    let input_name = create_input_group('text', "Ім'я","","first_name");
    let input_second_name = create_input_group('text', "По батькові", "", "patronymic");
    let input_city = create_input_group('text','Місто','','city');
    let input_street = create_input_group('text','Вулиця','','street');
    let input_building = create_input_group('text','Будинок','','building');
    let input_apartment = create_input_group('text','Квартира','','apartment');
    let qwalification = create_input_group('text', "Кваліфікація", "", "qualification");
    let date_qwal = create_input_group('date', "Підтвердження", "", "date_qualification");
    let date_work = create_input_group('date', "Початок роботи","","date_st_w");


    form.append(input_tabel_number).append(input_surname).append(input_name).append(input_second_name).append(input_city).append(input_street).append(input_building)
        .append(input_apartment).append(qwalification).append(date_qwal).append(date_work);
    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(submit);
    $('#form_teacher').remove();
    $('#teacher_add').append(form);
}
function checkAddingTeacher(){
    if(document.forms['form_teacher']['tabel_number'].value == '') return false;
    if(document.forms['form_teacher']['last_name'].value == '') return false;
    if(document.forms['form_teacher']['first_name'].value == '') return false;
    if(document.forms['form_teacher']['patronymic'].value == '') return false;
    if(document.forms['form_teacher']['city'].value == '') return false;
    if(document.forms['form_teacher']['street'].value == '') return false;
    if(document.forms['form_teacher']['building'].value == '') return false;
    if(document.forms['form_teacher']['qualification'].value == '') return false;
    if(document.forms['form_teacher']['date_qualification'].value == '') return false;
    if(document.forms['form_teacher']['date_st_w'].value == '') return false;
}

//show information about teacher
function createTeacherViewById(id){
    $.ajax({
        url: "/getTeachers/" + id,
        type: "GET",
        contentType: "application/json",
        success: function(data){

            let div = $(`<div class="container">`); // обгортка
            let row=$(`<div class="row row_button">`);
            let back = $(` <button id="cn_add_parents" class="btn my_btn btn-outline-success" >`).text("Назад");
            let button = $(` <button id="edit_teacher" class="btn my_btn btn-outline-success" data-id="${data.tabel_number}" 
data-name="${data.teacher_name}" data-surname="${data.surname}" 
data-sec_name="${data.patronymic}" data-city="${data.city}" data-street="${data.street}" data-building="${data.building}" data-apartment="${data.apartment}" data-qualification="${data.qualification_name}" 
data-confirm="${data.last_qualification_date}" data-start="${data.work_start_date}" 
data-end="${data.end}">`).text('Редагувати');

            row.append(back);
            row.append(button);
            let tn = createInformationViewRows("Табельний номер", data.tabel_number);
            let first_name = createInformationViewRows("Ім'я", data.teacher_name);
            let second_name = createInformationViewRows("По батькові", data.patronymic);
            let last_name = createInformationViewRows("Прізвище", data.surname);
            let city = createInformationViewRows("Місто", data.city);
            let street = createInformationViewRows("Вулиця", data.street);
            let building = createInformationViewRows("Будинок", data.building);
            let apartment = createInformationViewRows("Квартира", data.apartment);
            let qualification = createInformationViewRows("Кваліфікація", data.qualification_name);
            let confirm = createInformationViewRows("Дата підтвердження", data.last_qualification_date);
            let start = createInformationViewRows("Початок роботи", data.work_start_date);
            div.append(row).append(tn).append(first_name).append(second_name).append(last_name).append(city).append(street).append(building).append(apartment).append(qualification).append(confirm).append(start);
            //TODO last date work
            let button_subject = $(`<div class="row input-group">`);
            let bs =  $(` <button id="teacher_subject_view" class="btn btn-block input-group-text" 
data-id="${data.t_n}">`).text('Предмети');
            button_subject.append(bs);
            let button_ex =  $(`<div class="row input-group">`);
            let be=  $(` <button id="teacher_ex_subject_view" class="btn btn-block input-group-text" 
data-id="${data.t_n}">`).text('Заміна');
            button_ex.append(be);
            //TODO add class
            div.append(button_subject).append(button_ex);
            let div_last=  $(`<div class="row btn-group mar">`);
            let dismiss =  $(` <button id="teacher_dismiss" class=" my_btn btn-outline-success btn" 
data-id="${data.t_n}">`).text('Звільнити');
            let delete_ =  $(` <button id="teacher_delete" class="my_btn btn-outline-success btn" 
data-id="${data.t_n}">`).text('Видалити');
            div_last.append(dismiss).append(delete_);
            div.append(div_last);
            $("#bacground_adding_parents").remove();
            createWindow(div);

        }
    });
}





function createEditTeacherViewById(a){
    let div = $(`<div class="container">`);
    $("#bacground_adding_parents").remove();
    let row=$(`<div class="row row_button">`);
    let back = $(` <button id="teacher_non" class="btn my_btn btn-outline-success" >`).text("Назад");
    let tn = create_input_group("text", "Табельний номер", a.data("id"), "t_n");
    let first_name = create_input_group("text", "Ім'я", a.data("name"), "first_name");
    let second_name = create_input_group("text", "По батькові", a.data("surname"), "second_name");
    let last_name = create_input_group("text", "Прізвище", a.data("surname"), "last_name");
    let qualification = create_input_group("text", "Кваліфікація", a.data("qualification"), "qualification");
    let confirm = create_input_group("date", "Дата підтвердження", a.data("confirm"), "confirm");
    let start = create_input_group("date", "Початок роботи", a.data("start"), "start");
    //TODO last date work
    let div_last=  $(`<div class="row btn-group mar">`);
    let dismiss =  $(` <button id="teacher_save_edit" class=" my_btn btn-outline-success btn" 
data-id="${a.data("id")}">`).text('Зберегти');
    let delete_ =  $(` <button id="teacher_non" class="my_btn btn-outline-success btn" 
data-id="${a.data("id")}">`).text('Скасувати');
    row.append(back);
    div.append(row).append(tn).append(first_name).append(second_name)
        .append(last_name).append(qualification).append(confirm).append(start);
    div_last.append(dismiss).append(delete_);
    div.append(div_last);
    createWindow(div);
}

function createInformationViewRows(label, information){
    let row = $(`<div class="row inform input-group ">`);
    let labl = $(`<span class="input-group-text">`).text(label);
    let info = $(`<span class="form-control">`).text(information);
    return row.append(labl).append(info)
}

/*************Subject-page function ****************/
//show subjects names and create adding group of subject button
function creatingSubjectList(){
    let subject_button = $(`<div id="subject_add">`);
    let subject_list = $(`<div>`);
    //button for add subject
    let theme = $(`<div class="cotainer subject">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_subject">`).text('Додати групу предметів'));
    theme.append($(`<div id="add_subject_form">`));
    subject_button.append(theme);
    //list of subject
    $.ajax({
        url: "/getSubjects",
        type: "GET",
        contentType: "application/json",
        success: function(subjects){
            subjects.forEach(subject => {
                subject_list.append(subject_name_list_view({name: subject.subject_name}));
            })
        }
    });

    //    let data = [{name: 'English'}, {name: 'Математика'}, {name: 'Алгебра'}];
    //    data.forEach(sb=> {
    //        subject_list.append(subject_name_list_view(sb))
    //    });
    $("#content").empty().append(subject_button).append(subject_list);
}
//show concrete subjects
function createConcreteSubjectList(name) {
    let subject_button = $(`<div id="subject_add">`);
    let subject_list = $(`<div>`);
    //button for add subject
    let theme = $(`<div class="cotainer c_subject">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_c_subject" name="${name}">`).text('Cтворити предмет'));
    theme.append($(`<div id="add_subject_c_form">`));
    subject_button.append(theme);
    //list of subject

    $.ajax({
        url: "/getSubjectInGroup",
        type: "GET",
        data: {subject: name},
        success: function(subjectsInGroup){
            subjectsInGroup = subjectsInGroup.filter(a => a.subject_name == name);
            console.log(subjectsInGroup);

            //            let data_subj = [{id: '5AG1', name: 'English', class_name: '5-A'},
            //                             {id: '5AG2', name: 'English', class_name: '5-A'},
            //                             {id: '5BG1', name: 'English', class_name: '5-B'}];
            subjectsInGroup.forEach(sb => {                
                let classId = sb.class_id.substring(0, sb.class_id.length-4);
                let class_letter = classId.substring(classId.length-1, classId.length);
                classId = classId.substring(0, classId.length-1);
                let class_number = classId;
                let class_name = class_number + "-" + class_letter;

                //TODO figure out what to do with group number (5AG1, 5AG2)
                subject_list.append(subject_list_view(name, {id: class_number + class_letter + "G?", class_name: class_name}))
            });
            $("#content").empty().append(subject_button).append(subject_list);
        }
    });


}
function createParentsView(){
    let student_add = $('#parent_add');
    student_add.empty();
    let theme = $(`<div class="cotainer parents">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_parent">`).text('Додати відповідальну особу'));
    theme.append($(`<div id="add_parents_form">`));
    student_add.append(theme);
    $('#parents_view').removeClass('hidden');
}
function creatingParentsList(){
    //TODO AJAX request for getting students
    let data = [{
        id: "N13404024",
        name: "Іваненко Ольга Степанівна",
    }, {
        id: "N13404025",
        name: "Петров Ігор Артемович",
    }, {
        id: "N13404026",
        name: "Яременко Анна Петрівна",
    }];
    let container = $(`<div class="container">`);
    data.forEach(th => {
        let line = $(`<div class="row par-list" data-id="${th.id}">`);
        let divname = $(`<div class="lt col-md-6 name">`).text(th.name);

        line.append(divname);
        container.append(line);});

    $('#content').append(container);
}
function createFormForAddingParent(){
    let form = $('<form class="container" id="form_add_parent"  method="post"   name="form_student" action="">');
    let input_surname = create_input_group('text', "Прізвище","","last_name");
    let input_name = create_input_group('text', "Ім'я", "", "first_name");
    let input_second_name = create_input_group('text', "По батькові", "", "patronymic");
    let city = create_input_group('text', "Місто", "", "city");
    let street = create_input_group('text', "Вулиця", "", "street");
    let building = create_input_group('text', "Будинок", "", "building");
    let apartment = create_input_group('text', "Квартира", "", "apartment");

    //TODO get phones and privileges values
    let phone = create_input_group_with_button('text', 'Телефон','add_phone');
    let workplace = create_input_group('text', "Місце роботи", "", "workplace");

    form.append(input_surname).append(input_name).append(input_second_name)
       .append(phone).append(city).append(street).append(building).append(apartment).append(workplace);

    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(submit);
    $('#form_student').remove();
    $('#parent_add').append(form);
}

function createFormForAddingSubject() {
    let form = $('<form class="container" method="post" id="form_subject" action="createSubject">');
    let input_surname = create_input_group('text', "Назва", "", "name");
    let submit = $(`<input type="submit" class="input-group-text">`);
    form.append(input_surname).append(submit);
    $('#form_subject').remove();
    $('#add_subject_form').append(form);
}
function createFormForAddingConcreteSubject(subjName){
    //TODO AJAX request for class
    let form = $('<form class="container" method="post" id="form_c_subject" action="createSubjectInGroup">');
    //hidden input just to send the subjName
    let hiddenSubjNameInput = $('<input type="text" name="subjName" style="display: none" value="' + subjName + '">');
    form.append(hiddenSubjNameInput);
    let inputBook = create_input_group('text', "Підручник", "", "book");

    $.ajax({
        url: "/getClasses",
        type: "GET",
        contentType: "application/json",
        success: function (classes) {
            //if second semester of 2020, then show classes registered in 2019, if summer or first semester of 2020 then show classes registered in 2020
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            if(month < 5)
                year--;
            classes = classes.filter(a => a.start_year == year);

            classes.sort(function(a,b){
                return a.class_number - b.class_number || a.class_char - b.class_char;
            });
            let inputClass = create_selected_input(classes.map(a => a.class_number + "-" + a.class_char), "Клас" , "", "Оберіть клас", "class");
            let submit = $(`<input type="submit" class="input-group-text">`);
            form.append(inputBook).append(inputClass).append(submit);
            $('#form_c_subject').remove();
            $('#add_subject_c_form').append(form);
        }
    });

}
function createEditSubjectInformation(s){
    //todo get all subject names and class
    $('#bacground_adding_parents').remove();
    let div = $(`<div class="container">`);

    let row=$(`<div class="row_button justify-content-between">`);
    let back = $(` <button id="cn_add_parents" class="btn my_btn btn-outline-success" >`).text("Назад");

    div.append(row.append(back));

    let subject_name = create_selected_input(['Name1', 'Name2', 'Name3'], 'Назва:', '', s.data('name'));
    let subject_id = create_input_group('text', 'Підгрупа:', s.data('id'),'');
    let start_date = create_input_group('date', 'Дата початку викладання:',  s.data('start-date'),'');
    let end_date = create_input_group('date', 'Дата закінчення викладання:',s.data('end-date'),'');
    let clas = create_selected_input(['clas1, clsa2'],'class', 'Клас:',s.data('clas'),'');
    div.append(subject_name).append(subject_id).append(clas).append(start_date).append(end_date);
    let submit = $(`<input type="submit" class="input-group-text">`).text('Зберегти');
    createWindow(div.append(submit));
};

$(document).on('click', '#edit_subject', function(){
    createEditSubjectInformation($('#edit_subject'));
});
function createConcreteSubjectInformation(id){
    //todo get subject information
    let div = $(`<div class="container">`);

    //{subject_id, subject_name, book, start_date, end_date, class, students_list[], teacher[] {teacher_id, name, start_date, end_date}}
    let s ={
        subject_id:'1212',
        subject_name:'Name1',
        book:"Book",
        start_date: new Date(),
        end_date: new Date(),
        clas: '5A',
        student: [{id:1, name: 'St'}, {id:1, name: 'St'}],
        teacher:[{id:0, name:'Teacher', s_date: new Date(), e_date: new Date()}]
    }
    let row=$(`<div class=" row row_button justify-content-between">`);
    let back = $(` <button id="cn_add_parents" class="btn my_btn btn-outline-success" >`).text("Назад");
    let button = $(` <button id="edit_subject" class="btn my_btn btn-outline-success" data-id="${s.subject_id}" data-clas="${s.clas}" 
data-name="${s.subject_name}" data-start-date="${cutData(s.start_date)}" data-end-date="${cutData(s.end_date)}" >`).text('Редагувати');

    div.append(row.append(back).append(button));

    let subject_name = createInformationViewRows( 'Назва:', s.subject_name);
    let subject_id = createInformationViewRows( 'Підгрупа:', s.subject_id,);
    let book =createInformationViewRows( 'Підручник',s.book);
    let start_date =createInformationViewRows('Дата початку викладання:',  s.start_date.toLocaleDateString(),'');
    let end_date = createInformationViewRows('Дата закінчення викладання:', s.end_date.toLocaleDateString());
    let clas = createInformationViewRows('Клас:',s.clas,'');
    div.append(subject_name).append(subject_id).append(clas).append(book).append(start_date).append(end_date);
    createWindow(div);
}
/*************Class-page function ****************/
function addingClassView(){
    // show class
    let class_list = $(`<div id="class_list">`);
    let class_button = $(`<div id="class_btn">`);
    let theme = $(`<div class="cotainer class">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_class">`).text('Додати клас'));
    theme.append($(`<div id="add_class_form">`));
    class_button.append(theme);

    $.ajax({
        url: "/getClasses",
        type: "GET",
        contentType: "application/json",
        success: function (classes) {
            classes.sort(function(a,b){
                return a.class_number - b.class_number || a.class_char - b.class_char || a.start_year - b.start_year;
            })
            console.log(classes);
            //each item in classes {class_id: "1a2019", class_number: 1, class_char: "a", start_year: 2019}
            //TODO pretty table for classes
            classes.forEach(item => {
                class_list.append("<p>" + item.class_number + " " + item.class_char + " " + item.start_year + "</p>");
            });
        }
    });

    $('#content').append(class_button).append(class_list);
}

function createFormForAddingClass(){
    let form = $('<form class="container" method="post" id="form_class" action="createClass">');
    let input_surname = create_input_group('number', "Номер", "", "number");
    let input_name = create_input_group('text', "Літера", "", "letter");
    let input_second_name = create_input_group('number', "Рік початку навчання", "2019", "start_studing");
    form.append(input_surname).append(input_name).append(input_second_name);
    let submit = $(`<input type="submit" class="input-group-text"">`);
    form.append(submit);
    $('#form_class').remove();
    $('#add_class_form').append(form);
}

/*************Student-page function ****************/
function filterStudentCreating(){
    // let array = form_student_filter({cl_list:["5-A", "5-B","6-A"]})
    // $('#sc').empty();
    // array.forEach(a=>$('#sc').append(a));
    // document.getElementById('content').classList.add('hidden');
    document.getElementById("student_view").classList.remove('hidden');

}

function creatingStudentList(){
    //TODO AJAX request for getting students
    let data = [{
        id: "N13404024",
        name: "Іваненко Ольга Степанівна",
        bday: "09.09.2005",
        type: "очна",
        class_name: "5-A"
    }, {
        id: "N13404025",
        name: "Петров Ігор Артемович",
        bday: "29.03.2005",
        type: "очна",
        class_name: "5-A"
    }, {
        id: "N13404026",
        name: "Яременко Анна Петрівна",
        bday: "31.12.2005",
        type: "очна",
        class_name: "5-A"
    }];
    let container = $(`<div class="container">`);
    data.forEach(th => { container.append(student_list(th))});
    $('#content').append(container);
}
//Button Add-student
function addingStudentView(){
    let student_add = $('#student_add');
    student_add.empty();
    let theme = $(`<div class="cotainer student">`);
    theme.append($(`<button class="btn my_btn btn-outline-success" id="add_student">`).text('Додати учня'));
    theme.append($(`<div id="add_student_form">`));
    student_add.append(theme);
}




function createFormForAddingStudent(){
    let form = $('<form class="container" method="post" onsubmit="return checkAddingStudent()" name="form_student" id="form_student" action="createStudent">');
    let input_surname = create_input_group('text', "Прізвище","","last_name");
    let input_name = create_input_group('text', "Ім'я", "", "first_name");
    let input_second_name = create_input_group('text', "По батькові", "", "patronymic");
    let birthday = create_input_group('date', "Дата народження", "", "birthday");
    let sex = create_selected_input(['ч','ж'], 'Стать', "sex_type", "Оберіть стать", "sex");
    let city = create_input_group('text', "Місто", "", "city");
    let street = create_input_group('text', "Вулиця", "", "street");
    let building = create_input_group('text', "Будинок", "", "building");
    let apartment = create_input_group('text', "Квартира", "", "apartment");
    let who = create_input_group('text', "Ким є", "", "who");

    //TODO get phones and privileges values
    let phone = create_input_group_with_button('text', 'Телефон','add_phone');
    let benefits = create_input_group_with_button('text', 'Пільги','add_benefits');
    let selectedType = create_selected_input(['очна','заочна'], 'Тип навчання', "type_edu", "Тип викладання", "studying_type");
    $.ajax({
        url: "/getClasses",
        type: "GET",
        contentType: "application/json",
        success: function (classes) {
            classes.sort(function(a,b){
                return a.class_number - b.class_number || a.class_char - b.class_char || a.start_year - b.start_year;
            })
            classes = classes.map(item => item.class_number + '-' + item.class_char + ' ' + item.start_year);

            let selectedClass = create_selected_input(classes, 'Клас', "class_type", "Оберіть клас", "class_name");

            let parents = create_selected_input_with_button(['Оберіть..'], "Відповідальні особи", "persons", "create_persons", "Додати нову", "Оберіть відповідальну особу");

            form.append(input_surname).append(input_name).append(input_second_name)
                .append(birthday).append(sex).append(phone).append(city).append(street).append(building).append(apartment).append(benefits).append(parents).append(who)
                .append(selectedType).append(selectedClass);
            let submit = $(`<input type="submit" class="input-group-text">`);
            form.append(submit);
            $('#form_student').remove();
            $('#student_add').append(form);
        }
    });
}
function checkAddingStudent(){
    if(document.forms['form_student']['last_name'].value == '') return false;
    if(document.forms['form_student']['first_name'].value == '') return false;
    if(document.forms['form_student']['patronymic'].value == '') return false;
    if(document.forms['form_student']['birthday'].value == '') return false;
    if(document.forms['form_student']['sex'].value == '') return false;
    if(document.forms['form_student']['city'].value == '') return false;
    if(document.forms['form_student']['street'].value == '') return false;
    if(document.forms['form_student']['building'].value == '') return false;
    if(document.forms['form_student']['class_name'].value == '') return false;
    //TODO відповідальні особи Not Null
}

function createParentDetailViewById(id) {
    //TODO Ajax request to get all information about student
    let data = {
        id: "N13404024",
        first_name: "Ольга",
        second_name: "Степанівна",
        last_name: "Іваненко",
        workplace: "WORK PLACE",
        address: "м. Київ, проспект Перемоги 45, кв. 11",
        phone: ["+380974004593", "+380634527612"],
    };

    let div = $(`<div class="container">`); // обгортка
    let row=$(`<div class="row row_button">`);
    let back = $(` <button id="cn_add_parents" class="btn my_btn btn-outline-success" >`).text("Назад");
    let button = $(` <button id="edit_parent" class="btn my_btn btn-outline-success" data-id="${data.id}" 
data-first_name="${data.first_name}" data-last_name="${data.last_name}" 
data-second_name="${data.second_name}" data-sex="${data.sex}" data-address = "${data.address}" data-phone =${data.phone.toString()}
data-work-place="${data.workplace}">`).text('Редагувати');

    row.append(back);
    row.append(button);
    let tn = createInformationViewRows("Персональний номер", data.id);
    let first_name = createInformationViewRows("Ім'я", data.first_name);
    let second_name = createInformationViewRows("По батькові", data.second_name);
    let last_name = createInformationViewRows("Прізвище", data.last_name);
    let address = createInformationViewRows("Адреса", data.address);
    let type = createInformationViewRows("Місце роботи", data.workplace);
    div.append(row).append(tn).append(first_name).append(second_name)
        .append(last_name).append(address)
        .append(type);
    data.phone.forEach(person=>div.append(createInformationViewRows("Телефон:", person)));
    let div_last=  $(`<div class="row btn-group mar">`);
    let delete_ =  $(` <button id="parent_delete" class="my_btn btn-outline-success btn" 
data-id="${data.t_n}">`).text('Видалити');
    div_last.append(delete_);
    div.append(div_last);
    $("#bacground_adding_parents").remove();
    createWindow(div);

}

function createStudentViewById(id) {
    //TODO Ajax request to get all information about student
    let data = {
        id: "N13404024",
        first_name: "Ольга",
        second_name: "Степанівна",
        last_name: "Іваненко",
        sex: "Жіноча",
        address: "м. Київ, проспект Перемоги 45, кв. 11",
        bday: new Date(2006, 9, 9),
        type: "очна",
        phone: ["+380974004593", "+380634527612"],
        benefits: ["benefits1", "benefits2"],
        sport_group: "Спеціальна",
        persons: [{name: 'Іваненко Степан Якович', id:'PR21334'}],
        class_name: "5-A",
        class_id : "5A2000"
    };
    let data_bday = cutData(data.bday);
    let persons =[];
    data.persons.forEach(p => persons.push(p.id));

    let div = $(`<div class="container">`); // обгортка
    let row=$(`<div class="row row_button">`);
    let back = $(` <button id="cn_add_parents" class="btn my_btn btn-outline-success" >`).text("Назад");
    let button = $(` <button id="edit_student" class="btn my_btn btn-outline-success" data-id="${data.id}" 
data-first_name="${data.first_name}" data-last_name="${data.last_name}" 
data-second_name="${data.second_name}" data-sex="${data.sex}" data-address = "${data.address}"
data-bday = "${data_bday}", data-type = "${data.type}" data-phone =${data.phone.toString()} data-group="${data.sport_group}"
data-persons =${persons} data-classid="${data.class_id}" data-benfits="${data.benefits.toString()}" data-classname="${data.class_name}">`).text('Редагувати');

    row.append(back);
    row.append(button);
    let tn = createInformationViewRows("Особова справа", data.id);
    let first_name = createInformationViewRows("Ім'я", data.first_name);
    let second_name = createInformationViewRows("По батькові", data.second_name);
    let last_name = createInformationViewRows("Прізвище", data.last_name);
    let sex = createInformationViewRows("Стать", data.sex);
    let bday = createInformationViewRows("Дата народження", data.bday.toLocaleDateString());
    let address = createInformationViewRows("Адреса", data.address);
    let type = createInformationViewRows("Тип навчання", data.type);
    let class_ = createInformationViewRows("Клас", data.class_name);
    let sport_group =  createInformationViewRows("Група фіз підготовки", data.sport_group);
    div.append(row).append(tn).append(first_name).append(second_name)
        .append(last_name).append(sex).append(bday).append(address)
        .append(type).append(class_).append(sport_group);
    data.persons.forEach(person=>div.append(createInformationViewRows("Відповідальна особа:", person.name)));
    data.phone.forEach(person=>div.append(createInformationViewRows("Телефон:", person)));
    data.benefits.forEach(person=>div.append(createInformationViewRows("Пільги:", person)));

    let button_subject = $(`<div class="row input-group">`);
    let bs =  $(` <button id="student_subject_view" class="btn btn-block input-group-text" 
data-id="${data.t_n}">`).text('Предмети');
    button_subject.append(bs);
    let button_ex =  $(`<div class="row input-group">`);
    let be=  $(` <button id="student_marks" class="btn btn-block input-group-text" 
data-id="${data.t_n}">`).text('Оцінки');
    button_ex.append(be);
    //TODO add class
    div.append(button_subject).append(button_ex);
    let div_last=  $(`<div class="row btn-group mar">`);
    let delete_ =  $(` <button id="student_delete" class="my_btn btn-outline-success btn" 
data-id="${data.t_n}">`).text('Видалити');
    div_last.append(delete_);
    div.append(div_last);
    $("#bacground_adding_parents").remove();
    createWindow(div);

}
/**  let back = $(` <button id="teacher_non" class="btn my_btn btn-outline-success" >`).text("Назад");
 let tn = create_input_group("text", "Табельний номер", a.data("id"), "t_n");
 let first_name = create_input_group("text", "Ім'я", a.data("name"), "first_name");
 let second_name = create_input_group("text", "По батькові", a.data("surname"), "second_name");
 let last_name = create_input_group("text", "Прізвище", a.data("surname"), "last_name");
 let qualification = create_input_group("text", "Кваліфікація", a.data("qualification"), "qualification");
 let confirm = create_input_group("date", "Дата підтвердження", a.data("confirm"), "confirm");
 let start = create_input_group("date", "Початок роботи", a.data("start"), "start");*/


function createEditStudentViewById(a){

    let div = $(`<div class="container">`);
    $("#bacground_adding_parents").remove();
    let row=$(`<div class="row row_button">`);
    let back = $(` <button id="student_non" class="btn my_btn btn-outline-success" >`).text("Назад");
    let tn = create_input_group("text", "Особова справа", a.data("id"), "id");
    let first_name = create_input_group("text", "Ім'я", a.data("first_name"), "first_name");
    let second_name = create_input_group("text", "По батькові", a.data("second_name"),"second_name" );
    let last_name = create_input_group("text", "Прізвище", a.data("last_name"), "last_name");
    let sex = create_input_group("text", "Стать", a.data("sex"), "sex");
    let bday = create_input_group("date", "Дата народження", a.data("bday"), "bday");
    let address = create_input_group("text", "Адреса", a.data("address"), "address");
    let type = create_input_group("text", "Тип навчання", a.data("type"), "type");
    let class_ = create_input_group("text", "Клас", a.data("classname"), "class_name");//TODO make select
    let sport_group =  create_input_group("text", "Група фіз підготовки", a.data("group"), "Group");//TODO make select

    let div_last=  $(`<div class="row btn-group mar">`);
    let dismiss =  $(` <button id="student_save_edit" class=" my_btn btn-outline-success btn" 
data-id="${a.data("id")}">`).text('Зберегти');
    let delete_ =  $(` <button id="student_non" class="my_btn btn-outline-success btn" 
data-id="${a.data("id")}">`).text('Скасувати');
    row.append(back);
    div.append(row).append(tn).append(first_name).append(second_name)
        .append(last_name).append(sex).append(bday).append(address)
        .append(type).append(class_).append(sport_group);
    let persons = (a.data("persons")).split(',');
    let phone = (a.data("phone")).split(',');
    let benefits = (a.data("benfits")).split(',');

    //TODO Change person to selected items and get names
    // add delete and new person add
    persons.forEach(person=>div.append(create_input_group("text","Відповідальна особа:", person, "person")));
    phone.forEach(person=>div.append(create_input_group("tel","Телефон:", person, "phone")));
    benefits.forEach(person=>div.append(create_input_group("text", "Пільги:", person, "benefit")));


    div_last.append(dismiss).append(delete_);
    div.append(div_last);
    createWindow(div);
}

function createEditParentViewById(a){

    let div = $(`<div class="container">`);
    $("#bacground_adding_parents").remove();
    let row=$(`<div class="row row_button">`);
    let back = $(` <button id="parent_non" class="btn my_btn btn-outline-success" >`).text("Назад");
    let tn = create_input_group("text", "Персональний номер", a.data("id"), "id");
    let first_name = create_input_group("text", "Ім'я", a.data("first_name"), "first_name");
    let second_name = create_input_group("text", "По батькові", a.data("second_name"),"second_name" );
    let last_name = create_input_group("text", "Прізвище", a.data("last_name"), "last_name");
    let workplace = create_input_group("text", "Місце роботи", a.data("workplace"), "workplace");
    let city = create_input_group("text", "Місто", a.data("address"), "address");
    let street = create_input_group("text", "Вулиця", a.data("address"), "address");
    let building = create_input_group("text", "Будинок", a.data("address"), "address");
    let  flat = create_input_group("text", "Квартира", a.data("address"), "address");
    let div_last=  $(`<div class="row btn-group mar">`);
    let dismiss =  $(` <button id="parent_save_edit" class=" my_btn btn-outline-success btn" 
data-id="${a.data("id")}">`).text('Зберегти');
    let delete_ =  $(` <button id="parent_non" class="my_btn btn-outline-success btn" 
data-id="${a.data("id")}">`).text('Скасувати');
    row.append(back);
    div.append(row).append(tn).append(first_name).append(second_name)
        .append(last_name).append(city).append(street).append(building)
        .append(flat);
    let phone = (a.data("phone")).split(',');

    //TODO Change person to selected items and get names
    // add delete and new person add
    phone.forEach(person=>div.append(create_input_group("tel","Телефон:", person, "phone")));

    div_last.append(dismiss).append(delete_);
    div.append(div_last);
    createWindow(div);
};



function createPersonForm(){
    let div = $(` <div>` );
    let input_surname = create_input_group('text', "Прізвище", "", "last_name_p");
    let input_name = create_input_group('text', "Ім'я", "", "first_name_p");
    let input_second_name = create_input_group('text', "По батькові", "", "second_name_p");
    let city = create_input_group('text', "Місто", "", "city_p");
    let street = create_input_group('text', "Вулиця", "", "street_p");
    let building = create_input_group('text', "Будинок", "", "building_p");
    let apartment = create_input_group('text', "Квартира", "", "apartment_p");
    let phone = create_input_group_with_button('text', 'Телефон','add_phone');
    let workplace = create_input_group('text', "Місце роботи", "", "workplace_p");
    div.append(input_surname).append(input_name).append(input_second_name).append(city).append(street).append(building).append(apartment)
        .append(phone).append(workplace);
    let buttons = $(`<div>`);
    let submit = $(`<input type="submit" class="input-group-text" style="display:inline-block" onclick="verifyPersonForm()">`).text("Додати");
    let cancel = $(`<button class="input-group-text" id="cn_add_parents" style="display:inline-block">`).text("Скасувати");
    buttons.append(submit).append(cancel);
    div.append(buttons);
    return div;
}
//TODO add responsible person form functionality
function verifyPersonForm(){
    console.log($('input[name="last_name_p"]').value);
    if($('input[name="last_name_p"]').value == '') {
        console.log("FALSE");
        return false;
    } else {
        console.log("TRUE");
    }
    //    if($('input[name="last_name_p"]').value == '') return false;
}
/*******************Helper function***************************/
function cutData(data){
    return data.getFullYear() + "-" + ((data.getMonth() < 10) ?
                                       ("0" + data.getMonth()) : data.getMonth()) + "-" + ((data.getDate() < 10) ?
                                                                                           ("0" + data.getDate()) : data.getDate());
}
/****************HTML-helper function***********************/
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

function create_selected_input(data, label, id, value, name="name") {
    let group =$(`<div class="input-group mb-1">`);
    let prep = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let select = $(`<select class="custom-select" id="${id}" name="${name}">`);
    select.append($(`<option value="" disabled selected>`).text(value));
    data.forEach(option=> {let opt = $(`<option value="${option}">`).text(option);
                           select.append(opt)});
    return group.append(prep.append(span)).append(select);
}

function create_input_group(input_type, label, value, name){
    let group =$(`<div class="input-group mb-1">`);
    let pregroup = $(`<div class="input-group-prepend">`);
    let span = $(`<span class="input-group-text">`).text(label);
    let input = $(`<input type="${input_type}" value = "${value}" name="${name}" class="form-control">`);
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

function createWindow(innerItem){
    let back =$(` <div class = "backgr" id="bacground_adding_parents">`);
    let form = $(` <div class="forming">`);
    $('.body').before(back.append(form.append(innerItem)));
}

/*************************HTML********************************/
let student_list = ({id: t_n,
                     name:name,
                     class_name :cls}) => {
    let line = $(`<div class="row st-list" data-id="${t_n}">`);
    let divname = $(`<div class="lt col-md-6 name">`).text(name);
    let divt_n = $(`<div class="lt  col-md-2 id">`).text(t_n);
    let divqwl = $(`<div class="lt col-md-2 bday">`).text(cls);

    line.append(divname).append(divt_n)
        .append(divqwl);
    return line;
};

let teacher_list = ({t_n: t_n,
                     name:name,
                     qwl:qwl}) => {
    let line = $(`<div class="row th-list" data-id="${t_n}">`);
    let divname = $(`<div class="lt col-md-6 name">`).text(name);
    let divt_n = $(`<div class="lt  col-md-2 id">`).text(t_n);
    let divqwl = $(`<div class="lt col-md-2 bday">`).text(qwl);

    line.append(divname).append(divt_n)
        .append(divqwl);
    return line;
};

// let form_student_filter = ({cl_list: cl})=>{
//     let array = [];
//     cl.forEach(ql=>{
//         array.push($(`<option value="${ql}">`).text(ql))})
//     return array;
// };

let form_teacher_filter = ({qw_list: qwalification_list})=>
{
    let array = [];
    qwalification_list.forEach(ql=>{
        array.push($(`<option value="${ql}">`).text(ql))});
    return array;
};

let subject_name_list_view = ({
    name: nm
}) => {
    let $subject = $(`<button data-name="${nm}" type="button" class="btn my_btn s_btn btn-outline-success my-2 btn-lg btn-block">`);
    $subject.text(nm);
    return $subject;
};

let subject_list_view = (name, {
    id: id,
    class_name: class_name,
}) => {
    let $subject = $(`<button data-id="${id}" type="button" class="btn my_btn sd_btn btn-outline-success my-2 btn-lg btn-block">`);
    $subject.text(name+" "+class_name+" "+id);
    return $subject;
};


document.getElementById('admin_button').classList.remove('hidden');
document.getElementById('content').classList.add('hidden');
