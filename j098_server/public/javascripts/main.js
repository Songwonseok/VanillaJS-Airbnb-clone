window.onload = () => {
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

}

function removeOn(list){
    for (var i = 0; i < list.length; i++) {
        list[i].classList.remove('on')
    }    
}

