

function getCategories(callback) {
  $.ajax({
  dataType: 'json',
  url: 'http://localhost:8080/categories',
  success: callback
});
}

function getSuggestedUsers(category, callback) {

  const categoryURL = `http://localhost:8080/categories/${category}`;

  $.ajax({
    dataType: 'json',
    url: categoryURL,
    success: callback
  })
}

function twitterCategories(categories) {
  console.log(categories);
  const results = categories.sort(function(a,b){

    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if(nameA < nameB) {
      return -1;
    }
    if(nameA > nameB) {
      return 1;
    }
    return 0
  }).map((category) => {
    return renderCategories(category)
  });

  console.log(results);

  $('.suggested-moods').html(results);
}

function renderCategories(category) {
  return (
    `<li>
      <div class="category-container" id="${category.slug}">
        <a href="#">
          <h1 class="category">${category.name}</h1>
        </a>
      </div>
    </li>`
  );
}

function selectCategory() {
  $('.suggested-moods').on('click','.category-container',event => {
    event.preventDefault();
    const category = $(event.currentTarget).attr('id');
    console.log(category);
    getSuggestedUsers(category,suggestedUsers);
  });
}

function suggestedUsers(users) {

  console.log(users);
  const results = users.users.sort(function(a,b){

    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if(nameA < nameB) {
      return -1;
    }
    if(nameA > nameB) {
      return 1;
    }
    return 0
  });

    console.log(results);

}

function renderSelectedUsers(user) {
  return (
    `<div class="profile-card">
      <div class="profile-card-images">
        <img class="profile-banner"src="https://pbs.twimg.com/profile_banners/22461427/1398828117" alt="twitter profile banner">
        <img class="profile-img"src="https://pbs.twimg.com/profile_images/246073324/IL2_normal.jpg" alt="twitter profile image">
      </div>
      <div class="profile-card-content">
        <a href="#"><h1>Al Yankovic</h1></a>
        <a class="twitter-username" href="#">   <span>@</span><h2>alyankovic</h2></a>
        <p>You know... the "Eat It" guy.</p>
      </div>
      <button>Get Mood</button>
    </div>`
  );
}

function renderPage() {
  getCategories(twitterCategories);
  selectCategory();
}


$(renderPage);
