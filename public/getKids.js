// function getKid(kid){
//     const html = `
//     <h1> Hello ${parent.first_name} ${parent.last_name} <h1>
//     <option value="name">${kid.first_name} ${kid.last_name}</option>`;
//     return html
// }

axios.get('/api/kids')
.then((response) => {
    console.log(response)
    const htmlArray = response.data.map((kid) => {
        return getKid(kid)
    })
    const kidsId = document.querySelector('#kids')
    kidsId.innerHTML= htmlArray.join('')
})


function getKid(kid){
    const html = `
    <h1> Hello ${parent.first_name} ${parent.last_name} </h1>
    <a href="/manage?kid=${kid.id}" target="_blank">
    ${kid.first_name}
    </a>`;
    return html
}