function getChore(chore){
    const html = `
    <li class="project__item">
              <button class="project__link focus--box-shadow">
                <h4 class="task">${chore.name}</h4>
              </button>
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

axios.get(`/api/child/${id}`)
.then((response) => {
  console.log(response.data.first_name)

})