// Create function  to display kid name and create href to link to Parent Dock for that child 
function getKid(kid){
    const html = `
 
   <main  class="wrapper"  >
    <aside class="aside project">
        <section class="section">

          <div class="profile-main">
         
            <a href=" /manage?kid=${kid.id}"
              class="profile-main__setting focus--box-shadow"
              type="button"
           id = "image" > <img src=${kid.childImage} />.

            </a><br>
            <br>  <a class = "FirstName" href="/manage?kid=${kid.id}"> 
            ${kid.first_name}
            </a>
     </div>
    </section>
  </aside> </main>
  
  `
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

// function picture(kidPic){
//       const html = `
//       <img
//       class="profile-main__photo"
//       src="${kidPic}"
//       alt="Profile photo"
//     />
//     `
//     const renderImg = document.querySelector('#image')
//     renderImg.innerHTML = html
//     return html
//     }
//     axios.get(`https://api.generated.photos/api/v1/faces?api_key=J_C9-VcbPJmDUutJhxZYzQ&age=child&per_page=${Math.floor(Math.random()* 20)}`)
//     .then((response) => {
//       let image = response.data.faces[0].urls[3]['256']
//       let card = document.querySelector('#image')
//       card.innerHTML += (`  <img
//       class="profile-main__photo"
//       src="${image}"
//       alt="Profile photo"
//     />`)

//       let kidPic = response.data.faces[0].urls[3]
//       console.log(kidPic)
//       return kidPic
//     })

   
