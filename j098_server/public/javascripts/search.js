const bookingBtnListener = () => {
    const bookingBtns = document.getElementsByClassName('bookingBtn');
    for (let i = 0; i < bookingBtns.length;i++){
        bookingBtns[i].addEventListener('click', function() {
            let room = this.querySelector('input').value;
            let modal = document.querySelector(".reserve");
            modal.classList.remove('hidden');
            room = JSON.parse(room);
            makeReservationModal(room);
        })
    }
}

const addModalListener = () => {
    const modal = document.querySelector(".reserve");
    const overlay = modal.querySelector(".modal_overlay");
    const closeBtn = modal.querySelector("button");

    const closeModal = () => {
        modal.classList.add("hidden");
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal)
}


const makeReservationModal = (room) => {
    const reseveForm = document.querySelector('.reseveForm');
    const reserveInfo = reseveForm.querySelector('input');
    const inputValue = document.createAttribute('value');
    

    const user = document.getElementById('reserveUser');
    let searchOption = document.getElementById('searchOption');
    searchOption = JSON.parse(searchOption.value)
    const reservePost = {
        id :0,
        check_in: searchOption.check_in,
        check_out: searchOption.check_out,
        nights: room.nights,
        room_id: room.id,
        user_id: user.value,
        price: room.price
    }

    inputValue.value = JSON.stringify(reservePost);
    reserveInfo.setAttributeNode(inputValue);
    
    const data = document.getElementsByClassName('reserveDateItem');
    data[0].innerHTML = searchOption.check_in;
    data[2].innerHTML = searchOption.check_out;

    const persennel = document.querySelector('.reservePersonnel');
    persennel.innerHTML = `${searchOption.personnel}명`;

    const priceItem = document.getElementsByClassName('priceItem');
    priceItem[0].innerHTML = `₩${printComma((room.price / room.nights).toFixed(0))} x ${room.nights}박`
    priceItem[1].innerHTML = `₩${printComma(room.price)}`
    priceItem[3].innerHTML = `₩${printComma((room.price*0.1).toFixed(0))}`

    const totalItem = document.getElementsByClassName('totalItem');
    totalItem[1].innerHTML = `₩${printComma((room.price * 1.1).toFixed(0))}`
}

const printComma = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


(function init(){
    addModalListener();
    bookingBtnListener();
})()
