// Event listener for when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded",() => {
const navLinks = document.querySelectorAll("nav a"); 
  
navLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);
  
  if (targetElement) { 
  targetElement.scrollIntoView({ behavior: "smooth", });
  }
}
}) 
// API endpoint for fetching dictionary data
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const result = document.getElementById("result")
const btn = document.getElementById("search-btn")
// Add a click event listener to the search button
btn.addEventListener("click", (e) => {
    e.preventDefault()
    let input = document.getElementById("search-input").value
    // Fetch data from the dictionary API based on the user input
    fetch(`${url}${input}`)
    .then(res => res.json())
    .then(data => {
    // Display the retrieved data in the result section of the page
    result.innerHTML = `
    <div class="word">
    <h3>${input}</h3>
    </div>
    <div class="details">
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p>/${data[0].phonetic}/</p>
    </div>
    <p class="word-meaning">
    ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">
    ${data[0].meanings[0].definitions[0].example || ""}
    </p>
    `
    })
    // Display an error message if the word is not found
    .catch(() => {
        result.innerHTML = `<h3 class="error">Sorry! couldn't find the word you are looking for</h3>`
    })
});

// Add a listener for the comments form submission
document.getElementById('comments-form').addEventListener('submit', function (e) {
e.preventDefault();

// Get the user's comment
const comment = document.getElementById('comment-input').value;

// Display the comment in the comments list
displayComment(comment)

postComment(comment);;
});
// Function to display a new comment in the comments list
function displayComment(comment) {
  const commentsList = document.getElementById('comments-list');
  const commentElement = document.createElement('p');
  commentElement.textContent = comment;
  commentsList.appendChild(commentElement);

// Clear the input field after submitting the comment
document.getElementById('comment-input').value = '';
}

 //Function to fetch existing comments from the database
function fetchComments() {
  fetch('http://localhost:3000/comments')
      .then(response => response.json())
      .then(data => {
          const commentsList = document.getElementById('comments-list');
          commentsList.innerHTML = ''; // Clear existing comments
          data.forEach(comment => {
           displayComment(comment.comment);
          });
      })
      .catch(error => console.error('Error fetching comments:', error));
}
// Function to send a new comment to the database
function postComment(comment) {
  fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
  })
      .then(response => response.json())
      .then(data => {
          displayComment(data.comment); // Display the new comment
          document.getElementById('comment-input').value = ''; // Clear the input field
      })
      .catch(error => console.error('Error posting comment:', error));
}
//Modal sign up form
let modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


