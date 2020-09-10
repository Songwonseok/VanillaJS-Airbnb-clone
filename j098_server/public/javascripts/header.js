const searchTabHandler = ()=>{
    // 검색창
    const menuBtnList = document.getElementsByClassName('tab_menu_btn');
    const boxList = document.getElementsByClassName('tab_box');

    const stayBtn = document.getElementById('stayBtn');
    const experienceBtn = document.getElementById('experienceBtn');

    for (var i = 0; i < menuBtnList.length; i++) {
        menuBtnList[i].addEventListener('click', function () {
            removeOn(menuBtnList)
            this.classList.add('on');
        })
    }
    const removeOn = (list)=> {
        for (var i = 0; i < list.length; i++) {
            list[i].classList.remove('on')
        }
    }

    stayBtn.addEventListener('click', function () {
        const item = document.getElementById('stay');
        removeOn(boxList);
        item.classList.add('on');
    })

    experienceBtn.addEventListener('click', function () {
        const item = document.getElementById('experience');
        removeOn(boxList);
        item.classList.add('on');
    })

}

function dropdownHandler() {
    const dropdown = document.querySelector('.header_dropdown');
    const overlay = document.querySelector('.drop_overlay');
    const openBtn = dropdown.querySelector('.dropBtn');
    const content = dropdown.querySelector('.dropdown-content');
    const dropOn = () => {
        content.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
    const dropOff = () => {
        content.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    openBtn.addEventListener('click', dropOn);
    content.addEventListener('click', dropOff);
    overlay.addEventListener('click', dropOff);
}


function modalHandler(list) {
    // 모달창
    list.forEach(className => {
        addModalListener(className)
    });
}

const addModalListener = (className) => {
    const openBtn = document.getElementById(className + 'Btn')
    const modal = document.querySelector("." + className);
    const overlay = modal.querySelector(".modal_overlay");
    const closeBtn = modal.querySelector("button");

    const openModal = () => {
        modal.classList.remove('hidden');
    }
    const closeModal = () => {
        modal.classList.add("hidden");
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal)
    openBtn.addEventListener("click", openModal);
}

const settingMinDate = () => {
    const checkIn = document.querySelector('#checkIn');
    const today = new Date();
    checkIn.min = dateToString(today);
}

const checkInListener = () => {
    const checkIn = document.querySelector('#checkIn');
    const checkOut = document.querySelector('#checkOut');

    checkIn.addEventListener('input', function(){
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOut.min = dateToString(nextDay);
        checkOut.removeAttribute('disabled');
    })
}

const dateToString = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`
}

(function init () {
    searchTabHandler();
    dropdownHandler();
    settingMinDate();
    checkInListener();
    modalHandler(['login','signup']);
})()

