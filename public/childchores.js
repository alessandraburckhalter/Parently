function getChore(chore){
    const html = `
    <li class="project__item">
              <button class="project__link focus--box-shadow">
                <h4 class="task">${chore.name}</h4>
              </button>
              <input type="checkbox" name="tue" id="tue">
              <label for="tue">Done</label> 
            </li>`;
    return html
}



console.log('Hello World')
axios.get(`/api/child/${id}/chores`)
.then((response) => {
    const htmlArray = response.data.map((chore) => {
        return getChore(chore)
    })
    const choreId = document.querySelector('#chores')
    choreId.innerHTML= htmlArray.join('')
})

axios.get(`/api/child/${id}`)
.then((response) => {
  console.log(response.data.first_name)

})

function displayName(user){
  const html = `
  <h1>${user.first_name} ${user.last_name}</h1>
  `;
  const display = document.getElementById('display-name')
  display.innerHTML = html
  return html
}

axios.get(`/api/child/${id}`)
.then((response) => {
  console.log(response.data)
   return displayName(response.data)
})