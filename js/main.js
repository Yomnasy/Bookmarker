
const bookmarkNameInput = document.getElementById("bookmarkName");
const bookmarkURLInput = document.getElementById("bookmarkURL");
const submitBtn = document.getElementById("submitBtn");
const tableContent = document.getElementById("tableContent");
const errorMassg = document.querySelector(".box-info");
bookmarkURLInput.disabled = true;

let bookmarkList = JSON.parse(localStorage.getItem("bookmark")) || [];

clrInput();
display();

   function addBookmark() {
  if (isNameValid() && isUrlValid()) {
    let bookmark = {
      name: bookmarkNameInput.value,
      url: bookmarkURLInput.value,
    };
    bookmarkList.push(bookmark);
    localStorageUpdate();
    clrInput();
    
  } else {
    errorMassg.classList.toggle("d-none");
    document.getElementById("closeBtn").addEventListener("click", function () {
      errorMassg.classList.add("d-none");
    });
  }
};
function localStorageUpdate() {
  localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  display();
}
function display() {
  let str = "";
  for (let i = 0; i < bookmarkList.length; i++) {
    str += `   <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].name} </td>
        <td><button class="btn btn-warning" >
        <a  href="${
          bookmarkList[i].url.includes("https://www." || "http://www.")
            ? bookmarkList[i].url
            : "https://www." + bookmarkList[i].url
        }" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-eye"></i>visit</a></button></td>
        <td><button class="btn btn-danger" onclick="deletbookmark(${i})" ><i class="fa-solid fa-trash"></i> Delete</button></td>
      </tr>`;
  }
  tableContent.innerHTML = str;
}


   function clrInput() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";

  bookmarkURLInput.style.border = "none";
  bookmarkNameInput.style.border = "none";
  document.getElementById("nameInputWaring").classList.add("d-none");
  document.getElementById("urlInputWaring").classList.add("d-none");
     
  document.getElementById("nameInputCheck").classList.add("d-none") 
  document.getElementById("urlInputCheck").classList.add("d-none") 
  
  bookmarkURLInput.disabled = true;

};
function deletbookmark(index) {
  bookmarkList.splice(index, 1);
  localStorageUpdate();
}

function isNameValid(str = bookmarkNameInput.value) {
  let regex = /^[\w-_]{3,}$/i;
  if (regex.test(str)) {
    bookmarkURLInput.disabled = false;
    document.getElementById("nameInputCheck").classList.remove("d-none");

    document.getElementById("nameInputWaring").classList.add("d-none");

    bookmarkNameInput.style.border = "2px solid green";
    return true;
  } else {
    bookmarkURLInput.disabled = true;
    bookmarkURLInput.value = "";

    document.getElementById("nameInputWaring").classList.remove("d-none");

    document.getElementById("nameInputCheck").classList.add("d-none");

    bookmarkNameInput.style.border = "2px solid red";

    return false;
  }
}

function isUrlValid(str = bookmarkURLInput.value) {
  let regex = /^((https|http):\/\/)?(www\.)?[\w]{3,14}\.[a-z]{2,4}/i;
  if (regex.test(str)) {
    document.getElementById("urlInputCheck").classList.remove("d-none");
    document.getElementById("urlInputWaring").classList.add("d-none");
    bookmarkURLInput.style.border = "2px solid green";
    return true;
  } else {
    document.getElementById("urlInputWaring").classList.remove("d-none");
    document.getElementById("urlInputCheck").classList.add("d-none");
    bookmarkURLInput.style.border = "2px solid red";
    return false;
  }
}
