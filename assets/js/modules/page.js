import api from './api.js'
import listener from './listener.js'
import database from './database.js'

const loadClubPage = (id, position, origin)=>{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4){
            let element = document.querySelector("#main-content");
            if(xhr.status == 200){
                element.innerHTML = xhr.responseText
                if(origin ==1){ //From API
                    database.getSavedClub(id)
                    .then(data =>{
                        if (data == undefined){   
                            btnIcon.innerHTML = `favorite_border`;
                        } else {
                            btnIcon.innerHTML = `favorite`;
                        }
                    })
                    api.getDetailClub(id, position);
                }
                if(origin ==2){ //From DB
                    listener.displaySavedClub(id);
                }
                
            }else if(xhr.status== 404){
                element.innerHTML = "<h1>Page Not Found</h1>";
            }else{
                element.innerHTML = "<h1>Sorry, Page Cannot Be Accessed</h1>";
            }
        }
    }
    xhr.open('GET','/assets/src/pages/club.html', true)
    xhr.send()
}

const loadPage = (page) =>{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            let element = document.querySelector("#main-content");
            if(xhr.status == 200){
                element.innerHTML = xhr.responseText
                if(page === "home"){
                    api.getClubList();
                    window.loadClubPage = loadClubPage
                }
                if(page === "bookmark"){
                    listener.displaySavedClubList();
                    window.loadClubPage = loadClubPage
                    
                }
            }else if(xhr.status== 404){
                element.innerHTML = "<h1>Page Not Found</h1>"
            }else{
                element.innerHTML = "<h1>Sorry, Page Cannot Be Accessed</h1>"
            }
        }
    }
    xhr.open('GET',`/assets/src/pages/${page}.html`, true)
    xhr.send()
}

export default {
    loadPage,
    loadClubPage
}