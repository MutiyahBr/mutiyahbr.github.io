import allPage from './page.js'

const init = () => {
    const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav);
}

const loadNav = () => {
    init()
    
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 || xhr.status !== 200) return

        document.querySelectorAll('.topnav, .sidenav')
        .forEach(element => {
            element.innerHTML = xhr.responseText
        })

        document.querySelectorAll('.topnav a, .sidenav a')
        .forEach(element => {
            element.addEventListener('click',event => {
                const sideNav = document.querySelector('.sidenav')
                M.Sidenav.getInstance(sideNav).close()

                const path = event.target.getAttribute('href').substr(1)
                allPage.loadPage(path)
            })
        })
    }
    xhr.open('GET','./nav.html',true)
    xhr.send()
}

export default loadNav