

function getChore(chore){
    const html = `
    <li class="project__item">
              <button class="project__link focus--box-shadow">
              <h4 class="task">${chore.name}</h4>
              </button>
              <button class="edit"> Edit </button>
            </li>`;
    return html
}

const id = new URLSearchParams(document.location.search).get("kid")

console.log('Hello World')
axios.get(`/api/child/${id}/chores`)
.then((response) => {
    const htmlArray = response.data.map((chore) => {
        return getChore(chore)
    })
    const choreId = document.querySelector('#chores')
    choreId.innerHTML= htmlArray.join('')
})



function displayName(user){
  const html = `
  <h1>${user.first_name} ${user.last_name} </h1>

  `;
  const display = document.getElementById('display-name')
  display.innerHTML = html
  return html
}

axios.get(`/api/child/${id}`)
.then((response) => {
  console.log(response.data)
   return displayName(response.data)
});

function editChore(){
  const choreField = document.querySelector('.task')
  axios.put(`/api/child/${id}`,{
    name: chore.value,
  })
    .then((response) => {
      choreField.value = response.data.name
    })
    .catch((error) => {
      const errorText = error.response.data.name || error;
  
      alert('could not update todo:' + errorText)
    })

}

const addForm = document.querySelector('.edit')

document.addEventListener('click', (e) => {
  console.log('click')
  if (e.target.classList.contains('.task')){
    const id = e.target.dataset.name;
    editChore(id)
  }
})