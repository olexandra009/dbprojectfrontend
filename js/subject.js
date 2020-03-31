/*------------------Listeners-----------------------*/
//Left-menu navigation
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

});

$(document).on('click', '#back_to_cabinet', function () {
    window.location.href='./teachercabinet.html';
});
$(document).on('click', '#add_theme', function () {
     createThemeDivAdding();

});
$(document).on('click', '#add_lesson', function () {
    createLessonDivAdding()
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
    let form = $('<form class="container" method="post" id="form_l">')
    let input_theme = $('<input name="name" type="text" class="col-md-6 col-xl-8">')
    let input_num = $(`<input name="date" type="date" class="col-md-6 col-xl-8">`)
    let input_hometask =  $('<input name="home_task" type="text" class="col-md-6 col-xl-8">')
    form.append($(`<div class='row'>`)
        .append($(`<label class="col-md-5 col-xl-3">`).text("Тема:"))
        .append(input_theme));
    form.append($(`<div class='row'>`)
        .append($(`<label class="col-md-5 col-xl-3">`).text("Дата"))
        .append(input_num));
    form.append($(`<div class='row'>`)
        .append($(`<label class="col-md-5 col-xl-3">`).text("Домашнє завдання"))
        .append(input_hometask));
    let submit = $(`<input type="submit">`);
    form.append(submit);
    $('#form_l').remove();
    $('#add_lesson_form').append(form);
}
function createThemeDivAdding(){
/*    let divbg = $(`<div class = "bgdark">`);
    let upwindow = $(`<div class= "container">`);
    $('body').append(divbg);
    $('body').append(upwindow);*/
let form = $('<form class="container" method="post" id="form">')
    let input_name = $('<input name="name" type="text" class="col-md-6 col-xl-8">')
    let input_num = $(`<input name="number" type="number" min="1" class="col-md-6 col-xl-8">`)
    let coef_sp = $(`<input name="coef_special"type="number" min="0" step="0.01" class="col-md-6 col-xl-8">`)
    let coef_d = $(`<input name="coef_d" type="number" min="0" step="0.01" class="col-md-6 col-xl-8">`)
    let coef_th =  $(`<input name="coef_th" type="number" min="0" step="0.01" class="col-md-6 col-xl-8">`)
    form.append($(`<div class='row'>`)
        .append($(`<label class="col-md-5 col-xl-3">`).text("Назва"))
        .append(input_name));
    form.append($(`<div class='row'>`)
        .append($(`<label class="col-md-5 col-xl-3">`).text("Порядковий номер"))
        .append(input_num));
    let fieldset = $(`<fieldset>`).append($(`<legend>`).text('Коефіцієнти'));
    fieldset.append($(`<div class='row'>`)
        .append($(`<label class="col-md-5 col-xl-3">`).text("Спеціальних оцінок:"))
        .append(coef_sp));
    fieldset.append($(`<div class='row'>`)
        .append($(`<label class=" col-md-5 col-xl-3">`).text("Поточних оцінок"))
        .append(coef_d));
    fieldset.append($(`<div class='row'>`)
        .append($(`<label class="col-md-5 col-xl-3">`).text("Тематичної оцінки"))
        .append(coef_th));
    let submit = $(`<input type="submit">`);
    form.append(fieldset).append(submit);
    $('#form').remove();
    $('#add_theme_form').append(form);

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

createThemeDiv();
createLessonDiv();