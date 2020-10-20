


// Create function to grab chore and display in H4 tag
function getChore(chore) {
  //todo On Page loads check if chores are completed

  const html = `
    <li class="project__item">
              <button class="project__link focus--box-shadow">
                <h4 class="task">${chore.name}</h4>
              </button>
              <input type="checkbox" name="tue" id="tue" class="checkbox" data-id="${chore.id}" ${chore.Points.length?'checked':""}>
              
              <label for="tue">Done</label> 
            </li>`;
  return html
}

// Create function that stores Points to dashboard
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





// GET to display what day of the week it is
// Whatever day of the week it is it will only display the chores for that day
axios.get(`/api/child/${id}/chores`)
  .then((response) => {
    // create var for new Date() method
    let today = new Date();
    // set fullWeekDay var to display full name of the weekday
    let fullWeekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // create var to store weekday as it is represented in the chore Table
    let weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    // store day in date getDay method
    let day = weekday[today.getDay()];
    // store full day name in getDay method
    let fullDay = fullWeekDay[today.getDay()];
    // map through chores and if a chore is stored on that day return it
    const htmlArray = response.data.map((chore) => {
      if (chore[day]) {
        return getChore(chore)

      }
    })
    // render chore information onto page
    const renderDay = document.querySelector('#day')
    renderDay.innerHTML = fullDay
    const choreId = document.querySelector('#chores')
    choreId.innerHTML = htmlArray.join('')
  })

// Axios to check child data and make sure route is connected
axios.get(`/api/child/${id}`)
  .then((response) => {
    console.log(response.data.first_name)

  })

// create function to display user name
function displayName(user) {
  const html = `
  <h1>${user.first_name} ${user.last_name}</h1>
  `;
  const display = document.getElementById('display-name')
  display.innerHTML = html
  return html
}

// Add child first name and ;ast name onto page with displayName() function
axios.get(`/api/child/${id}`)
  .then((response) => {
    console.log(response.data)
    return displayName(response.data)
  })


const checkbox = document.querySelector('.checkbox')
// Event Listener for checkbox
document.addEventListener('change', (e) => {

  //When clicked mark as checked and disabled
  if(e.target.classList.contains('checkbox')){
    if (e.target.checked){
      console.log('clicked')
      //Send req to server to create new (point) for chore
      const choreId = e.target.dataset.id
      axios
        .post(`/api/chore/${choreId}/point`)
        .then((result) => {
          console.log('Point Added')
        })
  } else {
      console.log('Not clicked')
      e.target.checked = true
    }
  }
})

// Create route from api for points
axios.get(`/api/child/${id}/point`)
  .then((data) => {
    console.log(data)
    // Run display point function onto html
    return displayPointsDashBoard(data.data)
  })


