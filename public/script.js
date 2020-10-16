

function getName(userName){
    const html = `
    
    <li>${userName.first_name}</li>
    `;
    return html;
}

function getChores(chores){
    const html = `
    <li>${chores.name} </li>
    `;
    return html
}


axios.get('/api/kids')
    .then((response) => {
        const htmlArray = response.data.map((userName) => {
            return getName(userName)
        })
        const childrenId = document.querySelector('#children')
        childrenId.innerHTML= htmlArray.join('')
    })

axios.get('/api/parent')
.then((response) => {
    
    const childrenId = document.querySelector('#parent')
    childrenId.innerHTML= getName(response.data)
    
})


axios.get('/api/child/6/chores')
.then((response) => {
    const choreId = document.querySelector('.chorepost')
    choreId.innerHTML = getChores(response.data)
})

axios.post('/api/child/6/chores', {
    name: text,
})
    .then((response) => {
        const choreHtmlString = getChores(response.data)

        const choreId = document.querySelector('.chorepost')

        choreId.innerHTML += choreHtmlString;
    })
    .catch((error) => {
        const errorText = error.response.data.error || error;
        alert('Could not add chore' + errorText)
    })

