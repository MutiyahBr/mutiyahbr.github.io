import database from './database.js'
import allPage from './page.js'

const displaySavedClub = (id) =>{
    database.getSavedClub(id)
    .then(club =>{
        let detailClub = "";
        let playerSquad = "";
        const btnIcon = document.getElementById("btnIcon");
        const btnSave = document.getElementById("btnSave");
        const content = document.getElementById("content");

        club.squad.forEach(squad=>{
        playerSquad += 
                    `<tr>
                        <td>${squad.id}</td>
                        <td>${squad.name}</td>
                        <td>${squad.position}</td>
                    </tr>`
                });
        
        detailClub =
                    `<img src="${club.logo}" href="${club.name}" />
                    <div class="club-detail">
                        <h1>${club.name}</h1>
                        <h2>${club.founded}</h2>
                        <ul>
                            <li>Website<p>${club.website}</p></li>
                            <li>Phone<p>${club.phone}</p></li>
                            <li>Email<p>${club.email}</p></li>
                        </ul>
                    </div>
                    <h2>Squad</h2>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Player</th>
                            <th>Position</th>
                        </tr>
                        ${playerSquad}
                    </table>`

            content.innerHTML = detailClub;
            btnIcon.innerHTML = `favorite`
            btnSave.addEventListener('click', ()=>{
                deleteSavedClubList(club.id);
                deleteSavedClub(club.id);
                btnIcon.innerHTML = `favorite_border` 
                M.toast({html: 'Deleted', classes: 'rounded'});
            })
    })
}

const displaySavedClubList = ()=>{
    const origin =2; //From DB
    database.getSavedClubList()
    .then(data => {
        var clubList ="";
        var table=""
        data.forEach(club => {
            clubList +=
            `<tr>
                <td><img src="${club.logo}" alt="${club.name}"/></td>
                <td>${club.name}</td>
                <td>${club.position}</td>
                <td>${club.points}</td>
                <td>${club.win}</td>
                <td><a href="#club/2/${club.position}/${club.id}" onclick="loadClubPage(${club.id},${club.position}, ${origin})">See Detail</a></td>
            </tr>`
        });
        table =`<table>
                    <tr>
                        <th></th>
                        <th>Club</th>
                        <th>Position</th>
                        <th>Points</th>
                        <th>Win</th>
                        <th></th>
                    </tr>
                    ${clubList}
                </table>`

        document.getElementById("content").innerHTML = table;
    })
}

const addToSavedClub = (id, logo, name, founded, website, phone, email, squad)=>{
    database.addClub({id,logo,name, founded, website, phone, email, squad});
}

const deleteSavedClub = (id) =>{
    database.deleteClub(id)
}

const addToSavedClubList = (id, logo, name, position, points, win)=>{
    database.addClubList({id, logo, name, position, points, win});
}

const deleteSavedClubList = (id)=>{
    database.deleteClubList(id)
    allPage.loadPage("bookmark");
}

export default {
    displaySavedClub,
    displaySavedClubList,
    addToSavedClub,
    deleteSavedClub,
    addToSavedClubList,
    deleteSavedClubList
}
