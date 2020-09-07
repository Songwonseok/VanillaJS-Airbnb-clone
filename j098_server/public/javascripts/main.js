window.onload = () => {
    const menuBtnList = document.getElementsByClassName('tab_menu_btn');
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
        const context = document.getElementById('stay');
        
    })

}

function removeOn(menuBtnList){
    for (var i = 0; i < menuBtnList.length; i++) {
        menuBtnList[i].classList.remove('on')
    }    
}

