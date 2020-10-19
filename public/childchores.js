// Create function to grab chore and display in H4 tag
function getChore(chore) {
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


