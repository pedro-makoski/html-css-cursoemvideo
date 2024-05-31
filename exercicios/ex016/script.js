const LinksInternos = document.querySelectorAll('header nav ul a[href^="#"]')

LinksInternos.forEach(item => 
    item.addEventListener('click', scrolltoidonclick)
)

function scrolltoidonclick(event) {
    event.preventDefault()
    const element = event.target
    const id = element.getAttribute('href')
    const to = document.querySelector(id).offsetTop

    window.scroll({
        top: to - 80,
        behavior: "smooth"
    })
}