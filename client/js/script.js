const section = document.querySelector('.section');

//#region 

var btnCheckbox = document.querySelector('input[name=theme]');

btnCheckbox.addEventListener('change', function() {
   if(this.checked) {
      document.documentElement.setAttribute('select-theme', 'dark');
   } else {
      document.documentElement.setAttribute('select-theme', 'light');
   }
});

//#endregion

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
        cardCont.className = 'container cardCont';
        section.appendChild(cardCont);
        
        /* -------------- Users div ---------------- */

        let usersDiv = document.createElement('div');
        usersDiv.className = 'usersDiv';
        usersDiv.innerHTML = `${'<span id="user_name">'+ele.name+'</span>'}${'<span>'+ele.email+'</span>'}${'<span>'+ele.phone+'</span>'}
                              ${'<span>'+ele.website+'</span>'}${'<span>'+ele.address.street+'</span>'}${'<span>'+ele.address.city+'</span>'}`
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
                    let btnComments = document.createElement('div');
                    btnComments.innerHTML = '<button class="btn btn-dark" type="button">comments</button>' 
                    postsDiv.appendChild(btnComments)
                    let div_commenti = document.createElement('div')
                    div_commenti.className = 'div_commenti'
                    postsDiv.appendChild(div_commenti)
                    btnComments.addEventListener('click',()=>{
                        div_commenti.innerHTML = ''
                        if (document.getElementsByClassName('postsDiv')[index].getElementsByClassName('div_commenti')[ele1_index].classList.contains('show')){
                            document.getElementsByClassName('postsDiv')[index].getElementsByClassName('div_commenti')[ele1_index].classList.add('no-show')
                            document.getElementsByClassName('postsDiv')[index].getElementsByClassName('div_commenti')[ele1_index].classList.remove('show')
                        }else{
                            document.getElementsByClassName('postsDiv')[index].getElementsByClassName('div_commenti')[ele1_index].classList.add('show') 
                            document.getElementsByClassName('postsDiv')[index].getElementsByClassName('div_commenti')[ele1_index].classList.remove('no-show')
                        }
                        fetch('http://localhost:3000/posts/'+(ele1_index+1+index)+'/comments')
                        .then(res => res.json())    // json parse per trasformare i dati dal json
                        .then(function(commenti) {
                            commenti.forEach((commento)=>{
                                let titolo_commenti = document.createElement('h3')
                                titolo_commenti.innerText = commento.email
                                div_commenti.appendChild(titolo_commenti)
                                let testo_commenti = document.createElement('p')
                                testo_commenti.innerText = commento.body
                                div_commenti.appendChild(testo_commenti)
                            })

                        })
                    })

                    displayDiv.appendChild(postsDiv);
                    
                })
            })     // data contiene i dati fetchati dal json
        })
        btnDiv.appendChild(btnPosts);

        /* -------------- Todos ----------------- */

        btnToDo.addEventListener('click',()=>{
            displayDiv.innerHTML = ''
            if (document.getElementsByClassName('displayDiv')[index].classList.contains('show')){
                document.getElementsByClassName('displayDiv')[index].classList.add('no-show')
                document.getElementsByClassName('displayDiv')[index].classList.remove('show')
            }else{
                document.getElementsByClassName('displayDiv')[index].classList.add('show') 
                document.getElementsByClassName('displayDiv')[index].classList.remove('no-show')
            }

            fetch('http://localhost:3000/users/'+(index+1)+'/todos')
            .then(res => res.json())    // json parse per trasformare i dati dal json
            .then(function(todos) {

                todos.forEach((ele_todos, todos_index)=>{
                    let div_todos = document.createElement('div')
                    let todos_title = document.createElement('h3')
                    todos_title.className = 'd-inline'
                    let checkbox = document.createElement('input')
                    checkbox.type = 'checkbox'
                    checkbox.checked = ele_todos.completed
                    checkbox.className = 'd-inline'
                    checkbox.addEventListener('change',()=>{
                        if (checkbox.checked){
                            fetch('http://localhost:3000/todos/'+(todos_index+1), {
                                method: 'PUT',
                                body: JSON.stringify({
                                    userId: index+1,
                                    id: todos_index+1,
                                    title: ele_todos.title,
                                    completed: true
                                }),
                                headers: {
                                    'Content-type': 'application/json',
                                },
                                })
                                .then((response) => response.json())
                                .then((json) => console.log(json));
                        }else{
                            fetch('http://localhost:3000/todos/'+(todos_index+1), {
                                method: 'PUT',
                                body: JSON.stringify({
                                    userId: index+1,
                                    id: todos_index+1,
                                    title: ele_todos.title,
                                    completed: false
                                }),
                                headers: {
                                    'Content-type': 'application/json',
                                },
                                })
                                .then((response) => response.json())
                                .then((json) => console.log(json));
                        }
                    })
                    todos_title.innerText = ele_todos.title
                    div_todos.appendChild(todos_title)
                    div_todos.appendChild(checkbox)
                    displayDiv.appendChild(div_todos)
                })
            })
        })

        /* -------------- Albums ----------------- */

        btnAlbum.addEventListener('click',()=>{
            displayDiv.innerHTML = ''
            if (document.getElementsByClassName('displayDiv')[index].classList.contains('show')){
                document.getElementsByClassName('displayDiv')[index].classList.add('no-show')
                document.getElementsByClassName('displayDiv')[index].classList.remove('show')
            }else{
                document.getElementsByClassName('displayDiv')[index].classList.add('show') 
                document.getElementsByClassName('displayDiv')[index].classList.remove('no-show')
            }

            fetch('http://localhost:3000/users/'+(index+1)+'/albums')
            .then(res => res.json())    // json parse per trasformare i dati dal json
            .then(function(albums) {
                albums.forEach((album_element , album_index)=>{
                    let container_albums = document.createElement('div')
                    let container_photos = document.createElement('div')
                    let title_album = document.createElement('h3')
                    let button_album = document.createElement('div');
                    container_photos.className = 'div_photos'
                    button_album.innerHTML = '<button class="btn btn-dark" type="button">photos</button>' 
                    title_album.innerText = album_element.title
                    container_albums.appendChild(title_album)
                    container_albums.appendChild(button_album)
                    displayDiv.appendChild(container_albums)
                    displayDiv.appendChild(container_photos)

                    button_album.addEventListener('click',()=>{
                        container_photos.innerHTML = ''
                        console.log(document.getElementsByClassName('displayDiv')[index].getElementsByClassName('div_photos')[album_index])
                        if (document.getElementsByClassName('displayDiv')[index].getElementsByClassName('div_photos')[album_index].classList.contains('show')){
                            document.getElementsByClassName('displayDiv')[index].getElementsByClassName('div_photos')[album_index].classList.add('no-show')
                            document.getElementsByClassName('displayDiv')[index].getElementsByClassName('div_photos')[album_index].classList.remove('show')
                        }else{
                            document.getElementsByClassName('displayDiv')[index].getElementsByClassName('div_photos')[album_index].classList.add('show') 
                            document.getElementsByClassName('displayDiv')[index].getElementsByClassName('div_photos')[album_index].classList.remove('no-show')
                        }
                        fetch('http://localhost:3000/albums/'+(album_index+1+index)+'/photos')
                        .then(res => res.json())    // json parse per trasformare i dati dal json
                        .then(function(photos) {
                            photos.forEach((photo)=>{
                                let photo_img = document.createElement('img')
                                photo_img.src = photo.url
                                container_photos.appendChild(photo_img)
                            })
                        })
                    })
                })

            })
        })


        /* -------------- Arrows Div ----------------- */

        let arrowsDiv = document.createElement('div');
        arrowsDiv.className = 'arrowsDiv';

        /* ----- Appendo tutti gli elem. a cardCont ----- */

        cardCont.appendChild(usersDiv);
        cardCont.appendChild(imgDiv);
        cardCont.appendChild(btnDiv);
        cardCont.appendChild(displayDiv);
        cardCont.appendChild(arrowsDiv);

    });
})

//#endregion
