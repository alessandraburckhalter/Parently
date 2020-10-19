// function getKid(kid){
//     const html = `
//     <h1> Hello ${parent.first_name} ${parent.last_name} <h1>
//     <option value="name">${kid.first_name} ${kid.last_name}</option>`;
//     return html





// }
function getKid(kid){
    const html = `
    <a href="/manage?kid=${kid.id}" style="color:black;">
    ${kid.first_name}
    </a> <br><br>`;
    return html
}


function getParent(user){
    const html = `
    <h1> Hello ${user.first_name} ${user.last_name} </h1>` 
    const display = document.getElementById('parent')
    display.innerHTML = html
    return html
}

axios.get('/api/parent')
    .then((response) => {
        console.log(response.data)
        getParent(response.data)
    })


axios.get('/api/kids')
.then((response) => {
    console.log(response)
    const htmlArray = response.data.map((kid) => {
        return getKid(kid)
    })
    const kidsId = document.querySelector('#kids')
    kidsId.innerHTML= htmlArray.join('')
})



