// Create function  to display kid name and create href to link to Parent Dock for that child 
function getKid(kid){
    const html = `
    <a href="/manage?kid=${kid.id}" style="color:black;">
    ${kid.first_name}
    </a> <br><br>`;
    return html
}

// Create function to display Parent full name
function getParent(user){
    const html = `
    <h1> Hello ${user.first_name} ${user.last_name} </h1>` 
    const display = document.getElementById('parent')
    display.innerHTML = html
    return html
}

// GET data from API route folder for parent data
axios.get('/api/parent')
    .then((response) => {
        console.log(response.data)
        getParent(response.data)
    })


// Get route from API folder to display kid information
axios.get('/api/kids')
.then((response) => {
    console.log(response)
    const htmlArray = response.data.map((kid) => {
        return getKid(kid)
    })
    const kidsId = document.querySelector('#kids')
    kidsId.innerHTML= htmlArray.join('')
})



