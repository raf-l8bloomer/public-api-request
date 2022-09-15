/*GALLERY MARKUP*/

const gallery = document.querySelector('#gallery');
const card = document.querySelector('.card')
const modal = document.querySelector('.modal-container');


const body = document.body;
const modalHTML = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>


`;

fetch('https://randomuser.me/api/?inc=picture,name,email,location&results=12')
    .then(res => res.json())
    .then(data => data.results)
    
    .then(generateCard)

function generateCard(data) {
    for (let i = 0; i < data.length; i++ ) {
    const cardHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="card-text">${data[i].email}</p>
                <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
            </div>
        </div>
        `;

        gallery.insertAdjacentHTML('beforeend', cardHTML);
    }
};

card.addEventListener('click', () => {
    console.log('it works!')
})
