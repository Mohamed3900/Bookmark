let nameInput = document.getElementById("name")
let urlInput = document.getElementById("url")
let bookmarkList = [];
let globalI;

if (localStorage.getItem("bm") != null) {
    bookmarkList = JSON.parse(localStorage.getItem("bm"))
    displayData()
} else {
    bookmarkList = []
}

function addBookmark() {
    let bookmark = {
        name: nameInput.value,
        url: urlInput.value
    }
    bookmarkList.push(bookmark)
    localStorage.setItem("bm", JSON.stringify(bookmarkList))
    displayData()
    clearForm()
}

function displayData() {
    let temp = ""
    for (let i = 0; i < bookmarkList.length; i++) {
        temp += `
        <div class="content row justify-content-between w-75 m-auto my-2">
            <div class="siteData d-flex w-50">
                <div class="image">
                    <img src="${bookmarkList[i].url}/favicon.ico" class="w-100" alt="">
                </div>
                <h2>${bookmarkList[i].name}</h2>
            </div>
            <div class="ancor">
                <a href="${bookmarkList[i].url}" class="btn btn-primary py-2 px-3" target="_blank">Visit</a>
                <button class="btn btn-warning py-2 px-3" id="edit" onclick="editBookmark(${i})">Change Data</button>
                <button class="btn btn-danger py-2 px-3" onclick="deleteBookmark(${i})">Delete</button>
            </div>
        </div>  `
    }
    document.getElementById("dataContainer").innerHTML = temp
}

function clearForm() {
    nameInput.value = " "
    urlInput.value = " "
}

function deleteBookmark(x) {
    bookmarkList.splice(x, 1)
    localStorage.setItem("bm", JSON.stringify(bookmarkList))
    displayData()
}

function editBookmark(x) {
    nameInput.value = bookmarkList[x].name
    urlInput.value = bookmarkList[x].url
    document.getElementById("submit").style.display = "none"
    document.getElementById("submitEdit").style.display = "inline-block"
    document.getElementById("cancel").style.display = "inline-block"
    globalI = x;
}

function edit() {
    bookmarkList[globalI].name = nameInput.value
    bookmarkList[globalI].url = urlInput.value
    localStorage.setItem("bm", JSON.stringify(bookmarkList))
    displayData()
    document.getElementById("submit").style.display = "inline-block"
    document.getElementById("submitEdit").style.display = "none"
    document.getElementById("cancel").style.display = "none"
    clearForm()
}

function cancel() {
    document.getElementById("submit").style.display = "inline-block"
    document.getElementById("submitEdit").style.display = "none"
    document.getElementById("cancel").style.display = "none"
    clearForm();

}