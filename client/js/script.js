const section = document.querySelector('.section');

//#region  ---------- Generazione Cards all'avvio ------------

fetch('http://localhost:3000/users')
.then(res => res.json())    // json parse per trasformare i dati dal json
.then(function(data) {      // data contiene i dati fetchati dal json
    data.forEach((ele , index) => { // ele riporta tutti gli array presenti nella source. Per ognuno, crea div e lo popola con i dettagli (primo array, poi secondo)

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

        /* -------------- Buttons div ---------------- */

        let btnDiv = document.createElement('div');
        btnDiv.className = 'btnDiv';

        let btnAlbum = document.createElement('button');
        btnAlbum.className = 'btnAlbum btn btn-dark';
        btnAlbum.innerText = 'album'
        btnDiv.appendChild(btnAlbum);

        let btnToDo = document.createElement('button');
        btnToDo.className = 'btnToDo btn btn-dark';
        btnToDo.innerText = 'todolist';
        btnDiv.appendChild(btnToDo);




        /* -------------- Image div ---------------- */

        let imgDiv = document.createElement('div');
        let img = document.createElement('img')
        imgDiv.className = 'imgDiv';
        img.src = ele.image
        imgDiv.appendChild(img)
        
        /* imgDiv.innerHTML = '<img src=" '+ ele.profileURL +' ">'; */ // ID DA SOSTITUIRE! creo tag img nell'html e compilo con id json dell'img
        section.appendChild(imgDiv);
        


        /* ----- Comments/Album/ToDoList Display ----- */

        let displayDiv = document.createElement('div');
        displayDiv.className = 'displayDiv';

        /* -------------- Posts div ---------------- */

        let btnPosts = document.createElement('div');
        btnPosts.className = 'd-inline'
        btnPosts.innerHTML = '<button class="btn btn-dark" type="button">posts</button>' 
        btnPosts.addEventListener('click',()=>{
            displayDiv.innerHTML = ''
            let num_post = index+1
            if (document.getElementsByClassName('displayDiv')[index].classList.contains('show')){
                document.getElementsByClassName('displayDiv')[index].classList.add('no-show')
                document.getElementsByClassName('displayDiv')[index].classList.remove('show')
            }else{
                document.getElementsByClassName('displayDiv')[index].classList.add('show') 
                document.getElementsByClassName('displayDiv')[index].classList.remove('no-show')
            }
            fetch('http://localhost:3000/users/'+num_post+'/posts')
            .then(res => res.json())    // json parse per trasformare i dati dal json
            .then(function(post) {
            let postsDiv = document.createElement('div');
            postsDiv.className = 'postsDiv';
            post.forEach((ele1 , ele1_index)=>{
                let titolo = document.createElement('h2')
                titolo.innerText = ele1.title
                postsDiv.appendChild(titolo)
                let testo_post = document.createElement('p')
                testo_post.innerText = ele1.body
                postsDiv.appendChild(testo_post)
                let div_commenti = document.createElement('div')
                fetch('http://localhost:3000/posts/'+(ele1_index+1)+'/comments')
                .then(res => res.json())    // json parse per trasformare i dati dal json
                .then(function(commenti) {
                    commenti.forEach((commento)=>{
                        console.log(div_commenti)
                        let titolo_commenti = document.createElement('h3')
                        titolo_commenti.innerText = commento.email
                        div_commenti.appendChild(titolo)
                        let testo_commenti = document.createElement('p')
                        testo_commenti.innerText = commento.body
                        div_commenti.appendChild(testo_post)
                    })

                })
                displayDiv.appendChild(div_commenti)
            })
            section.appendChild(postsDiv);
            displayDiv.appendChild(postsDiv);
            })     // data contiene i dati fetchati dal json
        })
        btnDiv.appendChild(btnPosts);
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
