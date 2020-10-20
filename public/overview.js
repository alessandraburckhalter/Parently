// Create function  to display kid name and create href to link to Parent Dock for that child 
function getKid(kid){
    const html = `<div class="col-12 ">
    <main  class="wrapper"  >
    <aside class="aside project">
        <section class="section">

          <div class="profile-main">
            <button
              class="profile-main__setting focus--box-shadow"
              type="button"
            >
              <img
                class="profile-main__photo"
                src="./images/child-profile.jpg"
                alt="Profile photo"
              />
            </button><br>
            
    <br><a href="/manage?kid=${kid.id}">
    ${kid.first_name}
    </a>  </div>
    </section>
  </aside> </main>
  </div>`
    ;
    return html
}

// Create function to display Parent full name
function getParent(user){
    const html = `
    <h1> <br>Welcome, ${user.first_name} ${user.last_name} !</h1><br>
    <p class="welcome"> This is your overview page. Please select a child below to manage their chores.</p>` 
    const display = document.getElementById('parent')
    display.innerHTML = html
    return html
}

// GET data from API route folder for parent data
axios.get('/api/parent')
    .then((response) => {
        console.log(response.data)
        getParent(response.data)
    })


// Get route from API folder to display kid information
axios.get('/api/kids')
.then((response) => {
    console.log(response)
    const htmlArray = response.data.map((kid) => {
        return getKid(kid)
    })
    const kidsId = document.querySelector('#kids')
    kidsId.innerHTML= htmlArray.join('')
})



