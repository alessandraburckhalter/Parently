
function getName(userName){
    const html = `
    
    <li>${userName.first_name}</li>
    `;
    return html;
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


axios.get('/api/child/2/chores')
    

