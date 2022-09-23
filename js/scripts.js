const gallery = document.querySelector('#gallery');
const body = document.body;
const searchContainer = document.querySelector('.search-container');

fetch('https://randomuser.me/api/?nat=us&?inc=picture,name,email,location,cell,dob&results=12')
    .then(res => res.json())
    .then(data => 
        {const profiles = data.results
    generateCard (profiles);
   
        })




//Creates a card per profile pulled from API
function generateCard(data) {
    for (let i = 0; i < data.length; i++ ) {
        const cardHTML = `
            <div class="card" data-index-number="${i}">
                <div class="card-img-container">
                    <img class="card-img" src="${data[i].picture.medium} " alt="profile picture" >
                </div>
                <div class="card-info-container" >
                    <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="card-text">${data[i].email}</p>
                    <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                </div>
            </div>
            `;
      
        gallery.insertAdjacentHTML('beforeend', cardHTML);
        
    }
//Makes all cards clickable and provides more information from profile
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', (event) => {
        const index = event.currentTarget.dataset.indexNumber;
        generateModal(data, index);
        }) 
    )
};



//Creates modal with more in-depth information from clicked profile card
function generateModal(data, index) {
    const modalHTML = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
    <img class="modal-img" src="${data[index].picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${data[index].name.first} ${data[index].name.last}</h3>
    <p class="modal-text">${data[index].email}</p>
    <p class="modal-text cap">${data[index].location.city}</p>
    <hr>
    <p class="modal-text">${data[index].phone}</p>
    <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}, ${data[index].location.city}, ${data[index].location.state} ${data[index].location.postcode}</p>
    <p class="modal-text">Birthday: ${convertDate((data[index].dob.date))}</p>
    </div>
    </div>
    `

    body.insertAdjacentHTML('beforeend', modalHTML);

    //Activates modal exit button
    const modalExit = document.querySelector('.modal-close-btn');
    modalExit.addEventListener('click', () => {
       closeModal();

    })
}

//When clicked, the whole modal is removed from the body
function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.remove();
    modalContainer.style.display = 'none';
}


//Changes long form birth date to MM/DD/YYYY format
function convertDate(birthdate){
    const birthday = new Date(birthdate);

    const month = birthday.getMonth();
    const day = birthday.getDay();
    const year = birthday.getFullYear();
    const shortDate = `${month}/${day}/${year}`;
    return shortDate;
}

//Add search bar
const searchHtml = `
    <form action="#" method="get">
     <input type="search" id="search-input" class="search-input" placeholder="Search...">
     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
     `
    searchContainer.insertAdjacentHTML('beforeend', searchHtml);

//Run search and filter cards based on name
const search = document.querySelector('.search-input');
search.addEventListener('keyup', e => {
    let searchInput = e.target.value.toLowerCase();
    let profileName = document.querySelectorAll('.card-name');
    profileName.forEach (name => {
        if (name.textContent.toLowerCase().includes(searchInput)) {
            name.parentNode.parentNode.style.display = 'block';
        } else {
            name.parentNode.parentNode.style.display = 'none';
        }
    })
})

    // if search != name, card.style.display ='none'