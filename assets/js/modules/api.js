import database from './database.js'
import listener from './listener.js'

const urlStandings = "http://api.football-data.org/v2/competitions/2021/standings".replace(/^http:\/\//i, 'https://');
const urlDetailClub = "http://api.football-data.org/v2/teams/".replace(/^http:\/\//i, 'https://');
const token ="bec45c17a76b42c3b2bfc4820d749bce";

function status(response){
    if(response.status !== 200){
        console.log("Error : "+response.status);
        return Promise.reject(new Error(response.status));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}
function error(error) {
    console.log("Error : " +error);
    document.getElementById("content").innerHTML = `<h1>Failed to load</h1>`
}

function changeMonth(date) {
    var date = date.split("-");
    switch (date[1]) {
        case "01":
          date[1] = "Jan";
          break;
        case "02":
          date[1] = "Feb";
          break;
        case "03":
          date[1] = "Mar";
          break;
        case "04":
          date[1]= "Apr";
          break;
        case "05":
          date[1] = "May";
          break;
        case "06":
          date[1] = "Jun";
          break;
        case  "07":
          date[1] = "Jul";
          break;
        case  "08":
          date[1] = "Aug";
          break;
        case  "09":
          date[1] = "Sep";
          break;
        case  "10":
          date[1]= "Oct";
          break;
        case  "11":
          date[1] = "Sep";
          break;
        case  "12":
          date[1] = "Des";
          break;
    }
    date = `${date[2]} ${date[1]} ${date[0]}`
    return date;
}

function setClubList(data, origin){
    let clubList ="";
    let table="";
    const dataClubList =  data.standings[0].table;
    const strDate = changeMonth(data.season.startDate);
    const endDate = changeMonth(data.season.endDate);
    const aside = `<h1 class="competition-name">${data.competition.name}</h1>
                <ul class="competition-about">
                    <li><h2>${data.competition.area.name}</h2> <h3>State</h3></li>
                    <li><h2>${strDate}</h2> <h3>Start date</h3></li>
                    <li><h2>${endDate}</h2><h3>End date</h3></li>
                </ul>`
    
   dataClubList.forEach(club => {
        clubList +=
        `<tr>
        <td><img src="${club.team.crestUrl}" alt="${club.team.name}"/></td>
        <td>${club.team.name}</td>
        <td>${club.position}</td>
        <td>${club.points}</td>
        <td>${club.won}</td>
        <td><a href="#club/1/${club.position}/${club.team.id}" onclick="loadClubPage(${club.team.id},${club.position}, ${origin})">See Detail</a></td>
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
            
    document.getElementById("aside").innerHTML = aside;
    document.getElementById("content").innerHTML = table;
}

function setDetailClub (club, clubStd){
    let detailClub = "";
    let playerSquad = "";
    const btnSave = document.getElementById("btnSave");
    const btnIcon = document.getElementById("btnIcon");
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
        `<img src="${club.crestUrl}" href="${club.name}" />
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
    btnSave.addEventListener('click', ()=>{
        database.getSavedClub(club.id)
        .then(data =>{
            if (data == undefined){   
                listener.addToSavedClubList(clubStd.team.id, clubStd.team.crestUrl, clubStd.team.name, clubStd.position, clubStd.points, clubStd.won);
                listener.addToSavedClub(club.id, club.crestUrl, club.name, club.founded, club.website, club.phone, club.email, club.squad);
                btnIcon.innerHTML = `favorite`;
                M.toast({html: 'Saved', classes: 'rounded'});
            } else {
                listener.deleteSavedClubList(club.id);
                listener.deleteSavedClub(club.id);
                btnIcon.innerHTML = `favorite_border`;
                M.toast({html: 'Deleted', classes: 'rounded'});
            }
        })                    
    })
}


const getClubList = ()=>{ 
    const origin = 1; //From API
    if('caches' in window){
        caches.match(urlStandings)
        .then(response =>{
            if(response==undefined){
                fetch(urlStandings, {
                    method: "GET",
                    headers: { 
                        'X-Auth-Token': token
                }
                })
                .then(status)
                .then(json)
                .then(function(data) {
                    setClubList(data, origin)
                })
                .catch(error);
            } else {
                response.json()
                .then(data =>{
                    setClubList(data, origin)
                })
                .catch(error);
            }
        })
    } else {
        fetch(urlStandings, {
            method: "GET",
            headers: { 
                'X-Auth-Token': token
        }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            setClubList(data, origin)
        })
        .catch(error);
    }

}


const getDetailClub = (id, position)=>{
let clubStd;
if('caches' in window){
    caches.match(urlStandings)
    .then(response =>{
        if(response){
            response.json()
            .then(data =>{
                clubStd = data.standings[0].table[position-1];
                return caches.match(urlDetailClub+id)
                .then(response =>{
                    if(response==undefined){
                        fetch(urlDetailClub+id, {
                            method: "GET",
                            headers: { 
                                'X-Auth-Token': token
                            }
                        })
                        .then(status)
                        .then(json)
                        .then(function(club) {
                            setDetailClub(club, clubStd);
                        })
                        .catch(error);
                
                    } else {
                        response.json()
                        .then(function(club){
                            setDetailClub(club, clubStd);
                        })
                        .catch(error);
                    }
                })
            .catch(error);
            })
        } else {
            fetch(urlStandings, {
                method: "GET",
                headers: { 
                    'X-Auth-Token': token
            }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                clubStd = data.standings[0].table[position-1];
                return caches.match(urlDetailClub+id)
                .then(response =>{
                    if(response==undefined){
                        fetch(urlDetailClub+id, {
                            method: "GET",
                            headers: { 
                                'X-Auth-Token': token
                                }
                        })
                        .then(status)
                        .then(json)
                        .then(function(club) {
                            setDetailClub(club, clubStd);
                        })
                        .catch(error);
                            
                    } else {
                        response.json()
                        .then(function(club){
                            setDetailClub(club,clubStd);
                        })
                        .catch(error);
                    }
                })
            })
            .catch(error);
        }   
    })
    
} 
}

export default {
    getClubList,
    getDetailClub
}