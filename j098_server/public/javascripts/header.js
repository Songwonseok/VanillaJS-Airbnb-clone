window.onload = () => {
    // 검색창
    const menuBtnList = document.getElementsByClassName('tab_menu_btn');
    const boxList = document.getElementsByClassName('tab_box');

    const stayBtn = document.getElementById('stayBtn');
    const experienceBtn = document.getElementById('experienceBtn');
    const onlineBtn = document.getElementById('onlineBtn');

    for (var i = 0; i < menuBtnList.length; i++) {
        menuBtnList[i].addEventListener('click', function(){
            removeOn(menuBtnList)
            this.classList.add('on');
        })
    }

    stayBtn.addEventListener('click', function(){
        const item = document.getElementById('stay');
        removeOn(boxList);
        item.classList.add('on');
    })

    experienceBtn.addEventListener('click', function () {
        const item = document.getElementById('experience');
        removeOn(boxList);
        item.classList.add('on');
    })

    onlineBtn.addEventListener('click', function () {
        const item = document.getElementById('online');
        removeOn(boxList);
        item.classList.add('on');
    })

    // 모달창
    const loginBtn = document.getElementById('loginBtn');
    const login = document.querySelector(".login");
    const loginOverlay = login.querySelector(".modal_overlay");
    const loginCloseBtn = login.querySelector("button");

    const signupBtn = document.getElementById('signupBtn');
    const signup = document.querySelector(".signup");
    const signupOverlay = signup.querySelector(".modal_overlay");
    const signupCloseBtn = signup.querySelector("button");

    

    const openLogin = () => {
        login.classList.remove('hidden');
    }
    const closeLogin = () => {
        login.classList.add("hidden");
    }

    const openSignup = () => {
        signup.classList.remove('hidden');
    }

    const closeSignup = () => {
        signup.classList.add("hidden");
    }

    loginCloseBtn.addEventListener("click", closeLogin);
    loginOverlay.addEventListener("click", closeLogin)
    loginBtn.addEventListener("click", openLogin);

    signupCloseBtn.addEventListener("click", closeSignup);
    signupOverlay.addEventListener("click", closeSignup);
    signupBtn.addEventListener("click", openSignup);;

}

function removeOn(list){
    for (var i = 0; i < list.length; i++) {
        list[i].classList.remove('on')
    }    
}

