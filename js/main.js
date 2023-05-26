// ! Global

let sitName = document.querySelector("#siteName");
let sitUrl = document.querySelector("#siteUrl");
let addBtn = document.querySelector("#btnAdd");
let updateBtn = document.querySelector("#btnUpdate");
let searchBook = document.querySelector("#searchBook");
let alertName = document.querySelector("#alertName");
let alertUrl = document.querySelector("#alertUrl");


let cartona = [];
let updateIndex =0;
// ! Event

if (getLocal() !== null) {
    cartona = getLocal();
    displayBook();
}



addBtn.addEventListener("click", function () {
addBook();
});

searchBook.oninput = function () {
    search();
};




// ! Function

function addBook() {

    if (nameValid() === true & urlValid() === true) {
        
let Book = {
    name: sitName.value,
    Url: sitUrl.value,
};

cartona.push(Book);


displayBook();
setLocal();
nameValid();
urlValid();
resetForm();
    }
}

function displayBook() {

let bookData = "";

var term = searchBook.value.toLowerCase(); 

for (let i = 0;  i < cartona.length; i++) {

if (cartona[i].name.toLocaleLowerCase().includes(term)) {
        bookData +=
    
        `    <tr>
            <td>${cartona[i].name.toLowerCase().replaceAll(term,`<span class="bg-info">${term}</span>`)}</td>
            <td>
    
            <p class="small text-truncate" style="max-width: 300px;">${cartona[i].Url}</p>
    
            </td>
            <td>
            <div class="hstack gap-3 justify-content-center">
                <a href="${cartona[i].Url}" target="_blank" class="btn btn-outline-dark">
                    <i class="fa-regular fa-eye"></i>
                </a>
                <button class="btn btn-outline-warning" onclick = 'setData(${i})'>
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="btn btn-outline-danger" onclick  = 'deleteRow(${i})'>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            </td>
        </tr>   `;
    
    }
    
}

document.querySelector('#tableBody').innerHTML=bookData;

}


function setLocal () {
    localStorage.setItem('BookAll',JSON.stringify(cartona));
}

function getLocal() {
    return JSON.parse(localStorage.getItem('BookAll'));
}

function resetForm() {
    sitName.value = "";
    sitUrl.value = "";
}

function deleteRow(index) {

    cartona.splice(index,1);
    setLocal();
    displayBook();


}

function update() {

    let Book = {
        name: sitName.value,
        Url: sitUrl.value,
    };
    
    cartona.splice(updateIndex,1,Book);

    setLocal();
    displayBook();
    resetForm();

    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}

function setData(index) {
    updateIndex = index;
    
    sitName.value = cartona.at(index).name;
    sitUrl.value = cartona.at(index).Url;

    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');

}

function search() {
    displayBook();
}

function nameValid() {
    if(sitName.value === ""){
        alertName.classList.remove('d-none');
        return false;
    }else{
        alertName.classList.add('d-none');
        return true;
    }
}


function urlValid() {
    if(sitUrl.value === ""){
        alertUrl.classList.remove('d-none');
        return false;
    }else{
        alertUrl.classList.add('d-none');
        return true;
    }
}

