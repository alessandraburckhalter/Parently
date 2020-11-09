// Create function to display chores
  // Line 13: Use form action to link chore by id (/chores/${chore.id}) while creating a post method for editing form

function displayPointsDashBoard(data){

  const html = `
  <ul class="statistics">
            <li class="statistics__entry">
              <p class="statistics__entry-description" >Current Points</p>
              <span class="statistics__entry-quantity">${data}</span>
            </li>
  </ul>`;
            const renderPoints = document.getElementById('points')
            renderPoints.innerHTML = html
            return html
} 

function getChore(chore) {
  const html = `
    <li class="project__item">
              <button class="project__link focus--box-shadow">
              <h4 class="task">${chore.name}</h4>
              </button>
              <button class="edit days add-chore" data-id="${chore.id}"> Edit </button>
              <button class="delete days add-chore" data-id="${chore.id}"> Delete </button>
              <form  style="display:none;" id="form-edit-${chore.id}">
          <div>
            <label class="days" for="name">Name</label>
            <input type="text" name="name" id="name" value="${chore.name}">
          </div>
          <div>
            <input type="checkbox" class="checkme checkbox-custom" name="mon" id="mon" ${chore.mon?'checked':""}>
            <label class="days" for="mon">Monday</label>
            <br>
           

          </div>

          <div>
            <input type="checkbox" class="checkme checkbox-custom" name="tue" id="tue" ${chore.tue?'checked':""}>
            <label class="days" for="tue">Tuesday</label>
            <br>
           

          </div>

          <div>
            <input class="checkme checkbox-custom" type="checkbox" name="wed" id="Wed" ${chore.wed?'checked':""}>
            <label class="days" for="wed">Wednesday</label>
            <br>
           

          </div>
          <div>
            <input class="checkme checkbox-custom" type="checkbox" name="thu" id="thu" ${chore.thu?'checked':""}>
            <label class="days" for="thu">Thursday</label>
            <br>
           

          </div>
          <div>
            <input class="checkme checkbox-custom" type="checkbox" name="fri" id="fri" ${chore.fri?'checked':""}>
            <label class="days" for="fri">Friday</label>
            <br>
           

          </div>
          <div>
            <input class="checkme checkbox-custom" type="checkbox" name="sat" id="sat" ${chore.sat?'checked':""}>
            <label class="days" for="fri">Saturday</label>
            <br>
           

          </div>
          <div>
            <input class="checkme checkbox-custom" type="checkbox" name="sun" id="sun" ${chore.sun?'checked':""}>
            <label class="days" for="sun">Sunday</label>
            <br>
           
            <button class="btn days add-chore save-chore" type="submit" data-id="${chore.id}">Save</button>
            
          </div>
              </form>
            </li>`;
  return html
}

const CHILD_ID = new URLSearchParams(document.location.search).get("kid")

console.log('Hello World')

// Make GET request to map over array of Chores
updateChores();

function updateChores(){
  axios.get(`/api/child/${CHILD_ID}/chores`)
  .then((response) => {
    // Store array of chores to htmlArray
    const htmlArray = response.data.map((chore) => {
      return getChore(chore)
    })
    // Join each item in array to #chores ID and join with innerHTML due to being a STRING
    const choreId = document.querySelector('#chores')
    choreId.innerHTML = htmlArray.join('')
  })
}

// Create function to display avatar
function displayAvatar(user) {
  // store response data in parameter (user)
  const html = ` <button class="profile-main__setting focus--box-shadow" type="button">
            <img class="profile-main__photo" src="${user.childImage}" alt="Profile photo" />
          </button> 
  `
  const display = document.getElementById('childImage')
  display.innerHTML = html
  return html
}

function updateAvatar(){
  axios.get(`/manage/?kid=${CHILD_ID}`)
  .then((response) => {
    return displayAvatar(response.data)
  })
}


// Create function to display first name and last name
function displayName(user) {
  // store response data in parameter (user)
  const html = `<br>
  <h2>${user.first_name} ${user.last_name} </h2>

  `;
  const display = document.getElementById('display-name')
  display.innerHTML = html
  return html
}

//Create a Prize Save and Edit Button

function displayPrize(){
  const html = `
  
  <form action="" method="post">
  <label for="name">30 Points</label>
  <input class="points" type="text" name="name" id="name" value="">
  <label for="name">40 Points</label>
  <input class="points" type="text" name="name" id="name" value="">
  <label for="name">50 Points</label>
  <input class="points" type="text" name="name" id="name" value="">
  <button class="days add-chore edit-prize"> Edit </button>
  <button class=" days add-chore save-prize"> Save </button>
  </form>
`;
const display = document.getElementById('display-prize')
display.innerHTML = html
return html
}
//todo Display Prize 
displayPrize();




// GET displayName function and render onto HTML
  // GET from API route child with the signed in child id ${id}
axios.get(`/api/child/${CHILD_ID}`)
  .then((response) => {
    // store data from api/child route into response.data
    
    // run function with parameter response.data to access first name and last name
    return displayName(response.data)
  });

  //Get avatar
axios.get(`/api/child/${CHILD_ID}`)
  .then((response) => {
    return displayAvatar(response.data)
  });

  //Get Points
  axios.get(`/api/child/${CHILD_ID}/point`)
  .then((data) => {
    console.log(data)
    return displayPointsDashBoard(data.data)
  })




// Create event listener on click to run form submits
document.addEventListener('click', (e) => {
  console.log('click')
  // if edit button is clicked
  if (e.target.classList.contains('edit')) {
    // Line 67: Create data-id for storing 
    const id = e.target.dataset.id;
    // grab element by form with specific chore id
    const editForm = document.getElementById(`form-edit-${id}`)
    
    //style display block to display list on click
    editForm.style.display = "block";
  }
  if (e.target.classList.contains('delete')) {
    e.preventDefault()
    const id = e.target.dataset.id;

    
    axios.delete(`/api/chore/${id}`, {
    }).then((res) => {
      
      updateChores();
      })
    .catch((error) => {
      console.log('Delete did not work')
    })
  }
  
  // if save button is clicked
  if (e.target.classList.contains('save-chore')){
    e.preventDefault()
    
    // Line 67: Create data-id for storing 
    const id = e.target.dataset.id;
    const editForm = document.getElementById(`form-edit-${id}`)
    
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
      axios.get(`/api/child/${CHILD_ID}/chores`)
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



