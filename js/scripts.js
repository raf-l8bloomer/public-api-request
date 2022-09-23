const gallery = document.querySelector('#gallery');
const body = document.body;

fetch('https://randomuser.me/api/?nat=us&?inc=picture,name,email,location,cell,dob&results=12')
    .then(res => res.json())
    .then(data => 
        {const profiles = data.results
    generateCard (profiles);
   
        })


/*GALLERY MARKUP*/

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

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', (event) => {
        const index = event.currentTarget.dataset.indexNumber;
        generateModal(data, index);
        console.log(index);
        // modalContainer.style.display = 'block';
       
        }) 
    )
};


/*MODAL MARKUP*/

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
    <p class="modal-text">Birthday: ${data[index].dob.date}</p>
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