
// --------------Маска телефона-------------//

window.addEventListener("DOMContentLoaded", function () {


    document.querySelectorAll('.pagecrm_input-tel').forEach(function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;

            if (pos < 3 && event.keyCode !== 8 && event.keyCode !== 46) { // Allow backspace (8) and delete (46) keys
                event.preventDefault();
            }

            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) : a;
                });

            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i);
            }

            var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
                return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");

            reg = new RegExp("^" + reg + "$");

            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
                this.value = new_value;
            }

            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        function handleDelete(event) {
            if (this.selectionStart == 0 && this.selectionEnd == this.value.length) {
                this.value = "";
            }
        }

        function handleInput(event) {
            if (this.value === "") {
                this.value = "+7 ";
            }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
        input.addEventListener("keydown", handleDelete, false);
        input.addEventListener("input", handleInput, false);

    });
});


// --------------Select стилизация-------------//

const managmentBtn = document.querySelector('.pagecrm_managment__crm-application-input.btn'),
    managmentDrag = document.querySelector('.pagecrm_managment__crm-application-daragenddrop'),
    managmentSelectItem = document.querySelectorAll('.pagecrm_managment__crm-application-daragenddrop li'),
    managmentIcon = document.querySelector('.pagecrm_managment__crm-application-select-icon');

const requestBtn = document.querySelector('.pagecrm_request__form-input.btn'),
    requestDrag = document.querySelector('.pagecrm_request__form-daragenddrop'),
    requestSelectItem = document.querySelectorAll('.pagecrm_request__form-daragenddrop li'),
    requestIcon = document.querySelector('.pagecrm_request__form-input-checked');

// Так как кнопка вместо селекта, убираем отправку и запуск тогла
managmentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    togleClass(managmentDrag, managmentIcon);
    getVallue(managmentSelectItem, managmentBtn, managmentDrag, managmentIcon)
});

managmentIcon.addEventListener('click', (e) => {
    togleClass(managmentDrag, managmentIcon);
    getVallue(managmentSelectItem, managmentBtn, managmentDrag, managmentIcon)
});


requestBtn.addEventListener('click', (e) => {
    e.preventDefault();
    togleClass(requestDrag, requestIcon);
    getVallue(requestSelectItem, requestBtn, requestDrag, requestIcon)
});

requestIcon.addEventListener('click', (e) => {
    togleClass(requestDrag, requestIcon);
    getVallue(requestSelectItem, requestBtn, requestDrag, requestIcon)
});


// Получаем значение Валуе из селекта и записываем в инпут
function getVallue(ItemSelect, btn, dragTogl, icon) {
    ItemSelect.forEach(item => {
        item.addEventListener('click', () => {
            btn.textContent = item.getAttribute('data-value');
            dragTogl.classList.add('hide');
            icon.classList.add('hide');
        })
    });
}

//Тоглим класс скрытия
function togleClass(dragTogl, iconTogl) {
    dragTogl.classList.toggle('hide');
    iconTogl.classList.toggle('hide');
}



// --------------Partners табы-------------//

const icon = document.querySelectorAll('.pagecrm_partners-li-title svg');


tabs('.pagecrm_partners-li-title', '.pagecrm_partners-li-link', false)

// Таб выпадающее вертикальный список, (класс на что нажимаем, класс выпадающее описание под кликом, если 'true' скрывает все элементы кроме нажатого)
function tabs(titleClick, tabDescr, hideAll = true) {
    const title = document.querySelectorAll(titleClick),
        descr = document.querySelectorAll(tabDescr);

    const computedStyle = window.getComputedStyle(descr[0]);

    const paddingTop = (computedStyle.paddingTop);
    const paddingBottom = (computedStyle.paddingBottom);
    const marginTop = (computedStyle.marginTop);
    const borderWidth = (computedStyle.borderWidth);



    // Записали высоту всех descr в массив
    const arr = [];
    descr.forEach(item => {
        arr.push(item.offsetHeight);
    });


    // Скрываем высоту всех Descr, устанавливаем анимацию
    for (let item of descr) {
        item.style.height = '0px';
        item.style.paddingTop = 0;
        item.style.paddingBottom = 0;
        item.style.marginTop = 0;
        item.style.borderWidth = 0;
        item.style.overflowY = 'hidden';
        item.style.transition = 'all 0.2s ease-out';
    }

    // Анимация на стрелочку 
    for (let item of icon) {
        item.style.transition = 'all 0.2s ease-out';
    }

    // Ставим активным первый элемент
    /* descr[0].style.height = arr[0] + 'px'; */

    // Событие клика на title
    title.forEach((item, i) => {
        item.addEventListener('click', () => {

            // Если высота не равно 0 то добавляем высоту из масива
            if (descr[i].style.height !== '0px') {
                descr[i].style.height = '0px';
                descr[i].style.paddingTop = 0;
                descr[i].style.paddingBottom = 0;
                descr[i].style.marginTop = 0;
                descr[i].style.borderWidth = 0;
                icon[i].style.transform = 'rotate(0deg)';

            } else {
                descr[i].style.height = arr[i] + 'px';
                icon[i].style.transform = 'rotate(-90deg)';
                descr[i].style.paddingTop = paddingTop;
                descr[i].style.paddingBottom = paddingBottom;
                descr[i].style.marginTop = marginTop;
                descr[i].style.borderWidth = borderWidth;
            }

            //Убираем высоту у всех descr
            if (hideAll) {
                for (let value of descr) {
                    if (value !== descr[i]) {
                        value.style.height = '0px';
                    }
                }
            }
        })
    });

}




// -----------------Modals----------------//


const modalForm = document.querySelector('.pagecrm_modal'),
    modalWeldone = document.querySelector('.pagecrm_modal__weldone'),
    btnTrigerModal = document.querySelectorAll('.pagecrm_cost__cart-btn'),
    subsubstrate = document.querySelector('.pagecrm_substrate'),
    mainPage = document.querySelector('.pagecrm');

//ширина скрола

// создадим элемент с прокруткой
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

const mainPageStyle = window.getComputedStyle(mainPage);
const mainPagePaddingRiht = mainPageStyle.paddingRight.slice(0, -2);
const pageNotScroll = Number(mainPagePaddingRiht) + Number(scrollWidth)


btnTrigerModal.forEach(item => {
    item.addEventListener('click', () => {
        showModal();
    })
})

window.addEventListener("click", function (event) {
    if (event.target == subsubstrate) {
        hideModal();
        closeModalWeldone();
    }
});

function showModal() {
    modalForm.style.display = 'block';
    subsubstrate.style.display = 'block';
    document.body.style.overflow = "hidden";
    mainPage.style.paddingRight = pageNotScroll + 'px';
}
function hideModal() {
    modalForm.style.display = "none";
    subsubstrate.style.display = "none";
    document.body.style.overflow = "auto";
    mainPage.style.paddingRight = mainPagePaddingRiht + 'px';
}


function closeModalWeldone() {
    modalWeldone.style.display = 'none';
    document.body.style.overflow = "auto";
    subsubstrate.style.display = "none";
    mainPage.style.paddingRight = mainPagePaddingRiht + 'px';
}
// -----------------Заполнеие модального окна и отправка----------------//


const btnModals = document.querySelector('.pagecrm_modal-btn'),
    btnCloseModal = document.querySelector('.pagecrm_modal__weldone-cross');

btnModals.addEventListener('click', (e) => {
    const inputModals = document.querySelectorAll('.pagecrm_modal-input');
    const checkbox = document.querySelector('.pagecrm_modal-input-check');

    e.preventDefault();

    let result = true;

    for (let i = 0; i < inputModals.length; i++) {
        if (inputModals[i].value.trim() === '' || inputModals[i].value.trim() === null || !checkbox.checked) {
            result = false;
        }
    }
    if (result) {
        modalWeldone.style.display = 'flex';
        modalForm.style.display = "none";
        resetValerInput();
    }

    function resetValerInput() {
        inputModals.forEach(item => {
            item.value = '';
            checkbox.checked = false;
        })
    }
})

btnCloseModal.addEventListener('click', closeModalWeldone);