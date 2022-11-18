




window.onload = function(){

    let  list = document.getElementById('lista')
    let  testua = document.getElementById('sarrera')
    let ezabatubotoia = document.getElementById('Ezabatu')
    let igobotoia = document.getElementById('Igo')
    let jetsibotoia = document.getElementById('Jetsi')
    errepasatu()

    document.addEventListener("keydown", e => {
        console.log(e)
        if(e.key == "Enter"){
            e.preventDefault()
            if(testua.value !="" && document.activeElement === testua){
               
                testuagehitu(testua.value)
                errepasatu()
            }
        }
    })


    function testuagehitu(param){
        if(localStorage.getItem('atazak')){
            let li = localStorage.getItem('atazak')
            li = JSON.parse(li)
            li.push({'text':param})
            localStorage.setItem('atazak',JSON.stringify(li))
        }else{
            localStorage.setItem('atazak','[' + JSON.stringify({'text':param}) + ']')
            
        }
    }

    function errepasatu(){
        list.innerHTML = ""
        if(localStorage.getItem('atazak')){
            for ( let i = 0 ; i <  JSON.parse(localStorage.getItem('atazak')).length; i++){
                let li = document.createElement("li")
                li.innerText = JSON.parse(localStorage.getItem('atazak'))[i].text
                list.appendChild(li)
            }
        }
    }
    
    ezabatubotoia.addEventListener("click", e => {
        localStorage.clear()
        errepasatu()
    })

    let BASE = ''
    if(document.location.hostname != 'localhost'){
        BASE = '/'+ document.location.pathname.split('/')[1]
    }


    igobotoia.onclick = function(){
        console.log("igobotoia")
         fetch(`${BASE}/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json" 
            },
            body: localStorage.getItem('atazak') ? localStorage.getItem('atazak') : '[]'
            
        }).then(a => {
            console.log(localStorage.getItem('atazak'))
            localStorage.clear()
            errepasatu()
         })
    }

    jetsibotoia.addEventListener("click", e => {
        fetch(`${BASE}/a`)
        .then(res => res.json())
        .then(a => {for(let i = 0; i < a.length; i++) {
            testuagehitu(a[i].text)
            errepasatu()
        }})
    })    

}