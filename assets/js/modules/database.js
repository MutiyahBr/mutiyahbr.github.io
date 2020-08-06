let dbPromise = idb.open('football', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('club')) {
      upgradeDb.createObjectStore('club');
    }
    if (!upgradeDb.objectStoreNames.contains('clubList')) {
        upgradeDb.createObjectStore('clubList');
      }
  });

const addClub =({id,logo,name,founded, website, phone, email, squad})=>{
    dbPromise
    .then(db=>{
        let tx =db.transaction('club', 'readwrite');
        let store = tx.objectStore('club');
        let item = {
            id: id,
            logo: logo,
            name: name,
            founded: founded,
            website: website,
            phone: phone,
            email: email,
            squad: squad
        };
        store.put(item, id);
        return tx.complete;
    })
    .then(()=>console.log('Saved'))
    .catch(()=> console.log('Failed to save'))
}


const deleteClub = (id) => {
    dbPromise
    .then(db=>{
        let tx =db.transaction('club', 'readwrite');
        let store = tx.objectStore('club');
        store.delete(id)
        return tx.complete
    })
    .then(()=> console.log('Club deleted'))
}

const getSavedClub = (id) =>{
    return dbPromise
    .then(db =>{
        let tx =db.transaction('club','readonly')
        let store =tx.objectStore('club')

        return store.get(id)
    })
    .then(data => data)
}

const addClubList =({id,logo,name,position,points, win})=>{
    dbPromise
    .then(db=>{
        let tx =db.transaction('clubList', 'readwrite');
        let store = tx.objectStore('clubList');
        let item = {
            id: id,
            logo: logo,
            name: name,
            position: position,
            points: points,
            win: win
        };
        store.put(item, id);
        return tx.complete;
    })
    .then(()=>console.log('Saved'))
    .catch(()=> console.log('Failed to save'))
}

const deleteClubList = (id) => {
    dbPromise
    .then(db=>{
        let tx =db.transaction('clubList', 'readwrite');
        let store = tx.objectStore('clubList');
        store.delete(id)
        return tx.complete
    })
    .then(()=> console.log('Club deleted'))
}

const getSavedClubList = ()=>{
    return dbPromise
    .then(db=>{
        let tx =db.transaction('clubList','readonly')
        let store =tx.objectStore('clubList')

        return store.getAll()
    })
    .then(data => data)
}


export default {
    addClub,
    deleteClub,
    getSavedClub,
    addClubList,
    deleteClubList,
    getSavedClubList
}

