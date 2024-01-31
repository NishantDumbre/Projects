let submitForm = document.getElementById('submitForm')
let expenseList = document.querySelector('#expenseList')
let expenseWindow = document.getElementById('expenseWindow')

submitForm.addEventListener('click', formSubmit)
expenseList.addEventListener('click', deleteItem)
expenseList.addEventListener('click', editItem)


let expense = document.getElementById('expense')
let description = document.getElementById('description')
let category = document.getElementById('category')


function commonInstance() {
    return axios.create({
        baseURL: 'https://crudcrud.com/api/17edb47c90a746ef83fbb6582f7a6363/myExpenses'
    })
}


function showExpensesOnScreen(obj) {
    let img     // Choosing the image as per condition
    if (obj.category == 'Food') img = 'food.jpg'
    else if (obj.category == 'Travel') img = 'plane.jpg'
    else img = 'movie.jpg'

    let newChild = document.createElement('div')    // Creating div
    newChild.className = 'card col-2'
    newChild.id = obj._id
    newChild.innerHTML = `<img src=${img} class="card-img-top" alt="">
<div class="card-body">
  <h5 class="card-title">₹${obj.expense}</h5>
  <p class="card-text">${obj.description}</p>
  <button class="btn btn-primary delete">Delete</button>
  <button class="btn btn-primary edit">Edit</button>
</div>`
    expenseList.appendChild(newChild)
}


//Add items
function formSubmit(e) {
    e.preventDefault()

    if (expense && description) {
        let obj = {
            expense: expense.value,
            description: description.value,
            category: category.value
        }

        let stringObj = JSON.stringify(obj)

        commonInstance().post('', stringObj, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((result) => {
                localStorage.setItem(result.data._id, stringObj)
                showExpensesOnScreen(result.data)
                alert('add')    // Alert message successful
            })
            .catch((err) => errorHandling(err))
    }
    else {
        alert('blank')      // Alert message if fields are blank
    }
}

//Delete items
function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
        let element = e.target.parentElement.parentElement
        let id = e.target.parentElement.parentElement.id
        console.log(id)
        commonInstance().delete(`/${id}`)
            .then(res => {
                localStorage.removeItem(id)
                expenseList.removeChild(element)
                alert('delete')
            })
    }
}

//Edit items
function editItem(e) {
    if (e.target.classList.contains('edit')) {

        let obj = e.target.parentElement.parentElement
        let values = localStorage.getItem(obj.id)
        console.log(obj.id)
        values = JSON.parse(values)

        expense.value = values.expense
        description.value = values.description
        category.value = values.category

        console.log(values)
        commonInstance().put(`/${obj.id}`, {
    "expense": values.expense,
    "description": values.description,
    "category": values.category
}, {
    headers: {
        'Content-Type': 'application/json'
    }
})
            .then(res => {
                localStorage.removeItem(obj.id)
                expenseList.removeChild(obj)
                alert('delete')
            })

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

function errorHandling(err) {
    if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
        if (err.response.status === 404) {
            alert('Error 404 Page not found')
        }
    }
    else if (err.request) {
        console.log(err.request)
    }
    else {
        console.log(err.message)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    commonInstance().get('')
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                showExpensesOnScreen(res.data[i])
            }
        })
})