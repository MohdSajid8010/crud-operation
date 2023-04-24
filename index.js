let nameEl = document.getElementById("name");
let professionEl = document.getElementById("profession");
let ageEl = document.getElementById("age");
let formEl = document.getElementById("form");
let errorEl = document.getElementById("error");
let succesEl = document.getElementById("succes");
let captionEl = document.getElementById("caption");




formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (chechForValidation()) {
        addEmployee();
    } else {
        return;
    }
})

function chechForValidation() {
    if (nameEl.value == "" || professionEl.value == "" || ageEl.value == "") {
        errorEl.style.display = "block";
        succesEl.style.display = "none";

        return false;

    } else {
        succesEl.style.display = "block";
        errorEl.style.display = "none";

        return true;
    }
}


let arr = [];
let no_of_emp = 1;//arr.length + 1
function addEmployee() {
    arr.push({
        id: no_of_emp,
        name: nameEl.value,
        profession: professionEl.value,
        age: ageEl.value
    })

    no_of_emp++;
    localStorage.setItem("arr", JSON.stringify(arr));

    console.log(arr);
    resetInput();
    showEmployee();
}

function resetInput() {
    nameEl.value = "";
    professionEl.value = "";
    ageEl.value = "";
}


let empContainerEl = document.getElementsByClassName("employee-container")[0];

function showEmployee() {
    empContainerEl.innerHTML = "";

    arr.forEach((obj, i) => {
        empContainerEl.innerHTML += `   <div class="employee" id=${i}>
    <div class="employee-detail">
        <div>${i + 1}</div>
        <div>Name:${obj["name"]}</div>
        <div>Profession: ${obj["profession"]}</div>
        <div>Age:${obj["age"]}</div>
    </div>
    <button class="detBtn" onclick="delEmploy(this)">del user</button>
</div>`
    })

    if (arr.length == 0) {
        no_of_emp = 1;
        captionEl.style.display = "block";
    } else {
        captionEl.style.display = "none";
    }

}



function delEmploy(e) {
    console.log(e, e.parentElement, e.parentElement.id);
    e.parentElement.remove();

    arr.forEach((obj, i) => {
        if (e.parentElement.id == i) {
            arr.splice(i, 1);
        }
    })
    // let i = e.parentElement.id
    // arr.splice(i, 1);
    console.log(arr);

    localStorage.setItem("arr", JSON.stringify(arr));

    errorEl.style.display = "none";
    succesEl.style.display = "none";

    showEmployee();
}





(() => {
    arr = JSON.parse(localStorage.getItem("arr")) || [];
    console.log(arr);

    showEmployee();
})()