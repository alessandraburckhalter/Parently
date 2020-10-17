

function getName(userName){
    const html = `
    
    <li>${userName.first_name}</li>
    `;
    return html;
}

function getChores(chore){
    const html = `
    <li class="project__item">
              <button class="project__link focus--box-shadow">
                <h4 class="task">${chore.name}</h4>
              </button>
            </li>`;
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


axios.get('/api/child/chores')
.then((response) => {
    const htmlArray = response.data.map((chore) => {
        return getChore(chore)
    })
    const choreId = document.querySelector('#chores')
    choreId.innerHTML= htmlArray.join('')
})

axios.post('/api/child/chores', {
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

