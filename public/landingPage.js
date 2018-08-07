

function getCategories(callback) {
  $.ajax({
  dataType: 'json',
  url: 'http://localhost:8080/categories',
  success: callback
});
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
      <div class="category-container">
        <a href="#">
          <h1 class="category">${category.name}</h1>
        </a>
      </div>
    </li>`
  );
}

function renderPage() {
  getCategories(twitterCategories);
}


$(renderPage);
