
//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

 function saveBookmark(e) {
   //get form values
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('siteUrl').value;

   var bookmark = {
     name: siteName,
     url: siteUrl
   }


   /*
   //local storage stuff
   localStorage.setItem('test','hello Brent');
   console.log(localStorage.getItem('test'));
   localStorage.removeItem('test');
   console.log(localStorage.getItem('test'));
   */



   // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  fetchBookmarks();


   e.preventDefault(); //this stops form from submitting

 }

function deleteBookmark(url) {
  //get bookmarksResult
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url){
      bookmarks.splice(i,1);
    }

  }
  //reset localStorage
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //refetch bookmarksResult
  fetchBookmarks();

}

function fetchBookmarks() {
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = "";

  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

     bookmarksResults.innerHTML += '<div class="well">'  +
                                    '<h3>' + name +
                                    '<a class="btn btn-default" target="_blank" href="'+url+ '"> Visit</a> ' +
                                    '<a onclick="deleteBookmark(\''+url+'\' )" class="btn btn-danger" href="#"> Delete</a> ' +
                                    '<h3>' +
                                    '<div>';

  }

}
