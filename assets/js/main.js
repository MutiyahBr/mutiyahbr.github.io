import loadNav from './modules/nav.js'
import allPage from './modules/page.js'
import register from './modules/register.js';

register.registration();
register.notification();

document.addEventListener('DOMContentLoaded', ()=>{
    var page = window.location.hash.substr(1);
    loadNav();
    if(page ===""){
        page = "home";
        allPage.loadPage(page);
    }
    if(page === "home" || page === "bookmark"){
        allPage.loadPage(page);
    }
   if(window.location.hash.substr(1,4)=== "club"){
       const path = window.location.hash.split("/");
       const id = parseInt(path[3])
       const position = path[2]
       const origin = path[1]
       allPage.loadClubPage(id, position, origin);
   }
    
})