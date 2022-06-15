const section = document.querySelector('.section');

//#region  ---------- Generazione Cards all'avvio ------------

fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())    // json parse per trasformare i dati dal json
.then(function(data) {      // data contiene i dati fetchati dal json
    data.forEach((ele) => { // ele riporta tutti gli array presenti nella source. Per ognuno, crea div e lo popola con i dettagli (primo array, poi secondo)

        /* --------- Contenitore Card ---------- */

        let cardCont = document.createElement('div');
        cardCont.className = 'cardCont';
        section.appendChild(cardCont);
        
        /* -------------- Users div ---------------- */

        let usersDiv = document.createElement('div');
        usersDiv.className = 'usersDiv';
        section.appendChild(usersDiv);

        /* -------------- Posts div ---------------- */

        let postsDiv = document.createElement('div');
        postsDiv.className = 'postsDiv';
        section.appendChild(postsDiv);
        
        /* -------------- Image div ---------------- */

        let imgDiv = document.createElement('div');
        imgDiv.className = 'imgDiv';
        
        /* imgDiv.innerHTML = '<img src=" '+ ele.profileURL +' ">'; */ // ID DA SOSTITUIRE! creo tag img nell'html e compilo con id json dell'img
        section.appendChild(imgDiv);
        
        /* -------------- Buttons div ---------------- */

        let btnDiv = document.createElement('div');
        btnDiv.className = 'btnDiv';

        let btnComments = document.createElement('button');
        btnComments.className = 'btnComments';
        btnDiv.appendChild(btnComments);

        let btnAlbum = document.createElement('button');
        btnAlbum.className = 'btnAlbum';
        btnDiv.appendChild(btnAlbum);

        let btnToDo = document.createElement('button');
        btnToDo.className = 'btnToDo';
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
        cardCont.appendChild(postsDiv);
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