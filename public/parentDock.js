// Create function to display chores
  // Line 13: Use form action to link chore by id (/chores/${chore.id}) while creating a post method for editing form



function getChore(chore) {
  const html = `
    <li class="project__item">
              <button class="project__link focus--box-shadow">
              <h4 class="task">${chore.name}</h4>
              </button>
              <button class="edit" data-id="${chore.id}"> Edit </button>
              <form action="/chores/${chore.id}" method="post" style="display:none;" id="form-edit-${chore.id}">
          <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="${chore.name}">
          </div>
          <div>
            <input type="checkbox" name="mon" id="mon" ${chore.mon?'checked':""}>
            <label for="mon">Monday</label>
            <br>
           

          </div>

          <div>
            <input type="checkbox" name="tue" id="tue" ${chore.tue?'checked':""}>
            <label for="tue">Tuesday</label>
            <br>
           

          </div>

          <div>
            <input type="checkbox" name="wed" id="Wed" ${chore.wed?'checked':""}>
            <label for="wed">Wednesday</label>
            <br>
           

          </div>
          <div>
            <input type="checkbox" name="thu" id="thu" ${chore.thu?'checked':""}>
            <label for="thu">Thursday</label>
            <br>
           

          </div>
          <div>
            <input type="checkbox" name="fri" id="fri" ${chore.fri?'checked':""}>
            <label for="fri">Friday</label>
            <br>
           

          </div>
          <div>
            <input type="checkbox" name="sat" id="sat" ${chore.sat?'checked':""}>
            <label for="fri">Saturday</label>
            <br>
           

          </div>
          <div>
            <input type="checkbox" name="sun" id="sun" ${chore.sun?'checked':""}>
            <label for="sun">Sunday</label>
            <br>
           
            <button class="save-chore" type="submit" data-id="${chore.id}">Save</button>
            
          </div>
              </form>
            </li>`;
  return html
}

const id = new URLSearchParams(document.location.search).get("kid")

console.log('Hello World')

// Make GET request to map over array of Chores
axios.get(`/api/child/${id}/chores`)
  .then((response) => {
    // Store array of chores to htmlArray
    const htmlArray = response.data.map((chore) => {
      return getChore(chore)
    })
    // Join each item in array to #chores ID and join with innerHTML due to being a STRING
    const choreId = document.querySelector('#chores')
    choreId.innerHTML = htmlArray.join('')
  })


// Create function to display first name and last name
function displayName(user) {
  // store response data in parameter (user)
  const html = `
  <h1>${user.first_name} ${user.last_name}</h1>
  `;
  const display = document.getElementById('display-name')
  display.innerHTML = html
  return html
}

// GET displayName function and render onto HTML
  // GET from API route child with the signed in child id ${id}
axios.get(`/api/child/${id}`)
  .then((response) => {
    // store data from api/child route into response.data
    console.log(response.data)
    // run function with parameter response.data to access first name and last name
    return displayName(response.data)
  });





// Create event listener on click to run form submits
document.addEventListener('click', (e) => {
  console.log('click')
  // if edit button is clicked
  if (e.target.classList.contains('edit')) {
    // Line 67: Create data-id for storing 
    const id = e.target.dataset.id;
    // grab element by form with specific chore id
    const editForm = document.getElementById(`form-edit-${id}`)
    console.log(editForm)
    //style display block to display list on click
    editForm.style.display = "block";
  }
  // if save button is clicked
  if (e.target.classList.contains('save-chore')){
    e.preventDefault()
    // Line 67: Create data-id for storing 
    const id = e.target.dataset.id;
    const editForm = document.getElementById(`form-edit-${id}`)
    console.log(editForm)
    // style display to hide list completely
    editForm.style.display = "none"
    // PUT to create edit chore
    axios.put(`/api/chore/${id}`, {
      name: editForm.elements.name.value,
      // Create a checked to check if boolean is true or false
      mon:editForm.elements.mon.checked?true:false,
      tue:editForm.elements.tue.checked?true:false,
      wed:editForm.elements.wed.checked?true:false,
      thu:editForm.elements.thu.checked?true:false,
      fri:editForm.elements.fri.checked?true:false,
      sat:editForm.elements.sat.checked?true:false,
      sun:editForm.elements.sun.checked?true:false,
    })
    // when complete get updated list of chores
    .then((response) => {
      axios.get(`/api/child/${id}/chores`)
  .then((response) => {
    const htmlArray = response.data.map((chore) => {
      return getChore(chore)
    })
    const choreId = document.querySelector('#chores')
    choreId.innerHTML = htmlArray.join('')
  })
    })
    .catch((error) => {
      console.log('Did not work')
    })
  }
})