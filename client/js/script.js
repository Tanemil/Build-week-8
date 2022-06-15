const section = document.querySelector('.section');

//#region  ---------- Generazione Cards all'avvio ------------

fetch('http://localhost:3000/users')
.then(res => res.json())    // json parse per trasformare i dati dal json
<<<<<<< HEAD
.then(function(data) {      // data contiene i dati fetchati dall'url o json file
    data.forEach((ele) => { // ele riporta tutti gli array presenti nella source. Per ognuno, crea div e lo popola con i dettagli (primo array, poi secondo)
=======
.then(function(data) {      // data contiene i dati fetchati dal json
    data.forEach((ele , index) => { // ele riporta tutti gli array presenti nella source. Per ognuno, crea div e lo popola con i dettagli (primo array, poi secondo)
>>>>>>> 0bda5771d0d1e870f9f258fb9860fdf76cb5fa0d

        /* card{
            div.users{

            }
            div.posts{

            }
            div.img{

            }
            div.buttons{

            }
            div.display{
                allo schicciare dei bottoni, appare la finestra con
                contenuto commenti, album, todolist a seconda
                del bottone.
            }
        } */
        
        /* --------- Contenitore Card ---------- */

        let cardCont = document.createElement('div');
        cardCont.className = 'cardCont';
        section.appendChild(cardCont);
        
        /* -------------- Users div ---------------- */

        let usersDiv = document.createElement('div');
        usersDiv.className = 'usersDiv';
        usersDiv.innerHTML = `${ele.name}${'<br>'}${ele.email}${'<br>'}${ele.phone}${'<br>'}${ele.website}${'<br>'}${ele.address.street}${'<br>'}${ele.address.city}${'<br>'}`
        section.appendChild(usersDiv);

        /* -------------- Posts div ---------------- */

        fetch('http://localhost:3000/users/'+(++index)+'/posts')
        .then(res => res.json())    // json parse per trasformare i dati dal json
        .then(function(post) {
            let postsDiv = document.createElement('div');
            postsDiv.className = 'postsDiv';
            post.forEach((ele1)=>{
                let titolo = document.createElement('h2')
                titolo.innerText = ele1.title
                postsDiv.appendChild(titolo)
                let testo_post = document.createElement('p')
                testo_post.innerText = ele1.body
                postsDiv.appendChild(testo_post)
            })
            section.appendChild(postsDiv);

            cardCont.appendChild(postsDiv);
        })     // data contiene i dati fetchati dal json

        /* -------------- Image div ---------------- */

        let imgDiv = document.createElement('div');
        let img = document.createElement('img')
        imgDiv.className = 'imgDiv';
        img.src = ele.image
        imgDiv.appendChild(img)
        
        /* imgDiv.innerHTML = '<img src=" '+ ele.profileURL +' ">'; */ // ID DA SOSTITUIRE! creo tag img nell'html e compilo con id json dell'img
        section.appendChild(imgDiv);
        
        /* -------------- Buttons div ---------------- */

        let btnDiv = document.createElement('div');
        btnDiv.className = 'btnDiv';

        let btnComments = document.createElement('button');
        btnComments.className = 'btnComments btn btn-dark';
        btnComments.innerText = 'post'
        btnDiv.appendChild(btnComments);

        let btnAlbum = document.createElement('button');
        btnAlbum.className = 'btnAlbum btn btn-dark';
        btnAlbum.innerText = 'album'
        btnDiv.appendChild(btnAlbum);

        let btnToDo = document.createElement('button');
        btnToDo.className = 'btnToDo btn btn-dark';
        btnToDo.innerText = 'todolist';
        btnDiv.appendChild(btnToDo);

        /* ----- Comments/Album/ToDoList Display ----- */

        let displayDiv = document.createElement('div');
        displayDiv.className = 'displayDiv';

        let displayComments = document.createElement('div');
        displayComments.className = 'displayComments';
        displayDiv.appendChild(displayComments);

        let displayAlbum = document.createElement('div');
        displayAlbum.className = 'displayAlbum';
        displayDiv.appendChild(displayAlbum);

        let displayToDo = document.createElement('div');
        displayToDo.className = 'displayToDo';
        displayDiv.appendChild(displayToDo);

        /* -------------- Arrows Div ----------------- */

        let arrowsDiv = document.createElement('div');
        arrowsDiv.className = 'arrowsDiv';

        /* ----- Appendo tutti gli elem. a cardCont ----- */

        cardCont.appendChild(usersDiv);
        cardCont.appendChild(imgDiv);
        cardCont.appendChild(btnDiv);
        cardCont.appendChild(displayDiv);
        cardCont.appendChild(arrowsDiv);


/*         let nameP = document.createElement('p');                // creo p per ogni elemento da inserire
        nameP.innerHTML = `${'<b>Name:</b>'} ${ele.firstName}`; // accedo agli elementi cont nel json
        info.appendChild(nameP);

        let surnameP = document.createElement('p');
        surnameP.innerHTML = `${'<b>Last Name:</b>'} ${ele.lastName}`;
        info.appendChild(surnameP); */

    });
})

//#endregion
/* 
users[
    post[
        commenti
    ]
    album[
        photos
    ]
    todos
]
 */
