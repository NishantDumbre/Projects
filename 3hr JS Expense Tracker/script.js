let submitForm = document.getElementById('submitForm')
let expenseList = document.querySelector('#expenseList')
let expenseWindow = document.getElementById('expenseWindow')

submitForm.addEventListener('click', formSubmit)
expenseList.addEventListener('click', deleteItem)
expenseList.addEventListener('click', editItem)


let expense = document.getElementById('expense')
let description = document.getElementById('description')
let category = document.getElementById('category')



//Add items
function formSubmit(e) {
    e.preventDefault()

    if (expense && description) {
        let obj = {
            expense: expense.value,
            description: description.value,
            category: category.value
        }

        let time = new Date()

        localStorage.setItem(time, JSON.stringify(obj))     // Setting local storage item

        let img     // Choosing the image as per condition
        if (category.value == 'Food') {
            img = 'food.jpg'
        }
        else if (category.value == 'Travel') {
            img = 'plane.jpg'
        }
        else {
            img = 'movie.jpg'
        }

        let newChild = document.createElement('div')    // Creating div
        newChild.className = 'card col-2'
        newChild.id = time
        newChild.innerHTML = `<img src=${img} class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">₹${expense.value}</h5>
          <p class="card-text">${description.value}</p>
          <button class="btn btn-primary delete">Delete</button>
          <button class="btn btn-primary edit">Edit</button>
        </div>`
        expenseList.appendChild(newChild)

        alert('add')    // Alert message successful
    }
    else {
        alert('blank')      // Alert message if fields are blank
    }
}

//Delete items
function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
        let element = e.target.parentElement.parentElement
        localStorage.removeItem(e.target.parentElement.parentElement.id)
        expenseList.removeChild(element)
        alert('delete')     
    }
}

//Edit items
function editItem(e) {
    if (e.target.classList.contains('edit')) {

        let expense = document.getElementById('expense')
        let description = document.getElementById('description')
        let category = document.getElementById('category')


        let obj = e.target.parentElement.parentElement.id
        let values = localStorage.getItem(obj)
        values = JSON.parse(values)

        expense.value = values.expense
        description.value = values.description
        category.value = values.category

        console.log(values)
        localStorage.removeItem(e.target.parentElement.parentElement.id)
        expenseList.removeChild(e.target.parentElement.parentElement)

        alert('edit')
    }
}


function alert(type) {
    let alert = document.createElement('div')    // Creating alert
    alert.style = "margin-top:3%;padding:2%"
    alert.id = 'alert'
    if (type == 'add') {
        alert.innerHTML = `<h3 style="background-color: green ;color:white;">Added Successfully</h3>`
    }
    else if (type == 'delete') {
        alert.innerHTML = `<h3 style="background-color: yellow ;color:red;">Deleted Successfully</h3>`
    }
    else if (type == 'edit') {
        alert.innerHTML = `<h3 style="background-color: aqua ;color:black;">Ready to Edit</h3>`
    }
    else if (type == 'blank') {
        alert.innerHTML = `<h3 style="background-color: yellow;color:red;">Please fill all details</h3>`
    }

    expenseWindow.appendChild(alert)

    setTimeout(function () {    // Removing alert after 2 seconds
        expenseWindow.removeChild(alert)

    }, 2000)
}