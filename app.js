const loadData = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data))
    .catch((error) => console.log(error));
  isSpnning(true);
};

// data display

const displayData = (data) => {
  //   const cards container
  const cardsContainer = document.getElementById("cards");

  data.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("col");
    // console.log(data);
    div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">
                  This is a longer card with supporting 
                </p>
            </div>
            <button class='btn btn-primary' data-bs-toggle="modal"
            data-bs-target="#userModal" onclick="showPost(${data.id})">Show Post</button>
            
            <button class='btn btn-primary mt-2' data-bs-toggle="modal"
            data-bs-target="#userModal" onclick="showComment(${data.id})">Show Commnet</button>
            
            <p class="text-center text-dark fw-bold">Address</p>
            <div class="card-footer">

                <address>
                    Street : ${data.address.street}
                    City : ${data.address.city}
                    Zipcode : ${data.address.zipcode} 
                    Contact : ${data.phone}
                </address>
            </div>

        </div>

`;
    cardsContainer.appendChild(div);
  });
  isSpnning(false);
};

// button for show posts

const showPost = (userId) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${userId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => postDisplay(data));
  isSpnning(true);
};

const postDisplay = (user) => {
  const title = document.getElementById("title");
  title.innerText = `${user.title}`;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  modalBody.innerHTML = `
  <p>${user.body}</p>
  
  `;
  isSpnning(false);
};

// comment display and loading

const showComment = (id) => {
  const url = `https://jsonplaceholder.typicode.com/comments/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayComment(data));
  isSpnning(true);
};

const displayComment = (comment) => {
  const title = document.getElementById("title");
  title.innerText = `${comment.name}`;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  modalBody.innerHTML = `
  <p>${comment.body}</p>
  
  `;
  isSpnning(false);
};

function isSpnning(ans) {
  const spinner = document.getElementById("spinner");
  if (ans) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}

loadData();
