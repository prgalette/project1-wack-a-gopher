

const gopherHoles = [
    "hole-1",
    "hole-2",
    "hole-3",
    "hole-4",
    "hole-5",
    "hole-6"
]

const gopherClasses = [
    {
    class: 'gopher1',
    speed: 1000
    },
    {
    class: 'gopher2',
    speed: 2000
    },
    {
    class: 'gopher3',
    speed: 3000
    }
]



let gopherInterval

window.addEventListener('load', () => {

    let score = 0
    let time = 120
    let countdownId = null

    let currentScore = document.getElementById('current')

    console.log("loaded")
    
    let holeDivs = gopherHoles.map((hole) => {
        return document.getElementById(hole)
    })
    
    console.log(holeDivs)

    let gopher = document.createElement('img')
    gopher.src = 'images/gopher.png'
    // gopher.style.width = '80%'
    // gopher.style.height = '80%'
    gopher.style.zIndex = '3'
    gopher.id = 'gopher'
    gopher.addEventListener('click', () => {
        if(gopher.className === gopherClasses[2].class) {
            score += 10;
        } 
        else if (gopher.className === gopherClasses[1].class) {
            score += 20;
        }
        else if (gopher.className === gopherClasses[0].class) {
            score += 30;
        }
        
        currentScore.innerHTML = score
        console.log("CAUGHT HIM!!!!")
    })

   
    function getMinutes(minutes){
        return Math.floor(minutes / 60)
    }

    function getSeconds(seconds){
        return Math.floor(seconds % 60)
    }
    
    function countdown(time) {
        let counter = document.getElementById("timer");

        let minutes = getMinutes(time)
        let seconds = getSeconds(time)

        counter.innerHTML = `${minutes > 10 ? minutes : "0" + minutes}:${seconds > 10 ? seconds : "0" + seconds}`

    }



    let gopherSpeed

    function defineGopher() {
        let randomClassIndex = Math.floor(Math.random() * gopherClasses.length)

        gopher.className = gopherClasses[randomClassIndex].class

        gopherSpeed = gopherClasses[randomClassIndex].speed
        if (!gopherInterval) {

            gopherLoop()
        }
    }

    function gopherLoop() {
        gopherInterval = setInterval(() => {

            let randomGopherIndex = Math.floor(Math.random() * holeDivs.length)

            // let randomClassIndex = Math.floor(Math.random() * gopherClasses.length)

            // gopher.className = gopherClasses[randomClassIndex].class

            // gopherSpeed = gopherClasses[randomClassIndex].speed

            holeDivs[randomGopherIndex].appendChild(gopher)
            defineGopher()

            console.log("Speed ==>", gopherSpeed)

        }, gopherSpeed)
    }

    let beginButton = document.getElementById('begin')
    beginButton.addEventListener('click', () => {
        defineGopher()

        countdownId = setInterval(() => {
            time--
            countdown(time)
        }, 1000)
    })

    let iron = document.getElementById("iron")

    window.addEventListener("mousemove", (e) => {

        iron.style.top = e.pageY + "px"
        iron.style.left = e.pageX + "px"

    })


})
