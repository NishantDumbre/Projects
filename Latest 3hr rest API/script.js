let placeOrder = document.getElementById('placeOrder')
let food = document.getElementById('food')
let price = document.getElementById('price')
let table = document.getElementById('table')

let list1 = document.getElementById('list1')
let list2 = document.getElementById('list2')
let list3 = document.getElementById('list3')
let orderSection = document.getElementById('orderSection')


placeOrder.addEventListener('click', orderSubmit)
orderSection.addEventListener('click',deleteOrder)
window.addEventListener('DOMContentLoaded',()=>{
    commonInstance().get('')
        .then(x =>{
            for(data of x.data){
                orderCreate(data)
            }
        })
})


function commonInstance() {
    return axios.create({
        baseURL: 'https://crudcrud.com/api/d5d0d0c6f46345cca2ecc6bf1e130d9a/orders'
    })
}


function orderSubmit(e) {
    e.preventDefault()

    if (food.value && price.value) {
        let obj = {
            food: food.value,
            price: price.value,
            table: table.value
        }

        commonInstance().post('', obj)
            .then(order => {
                orderCreate(order.data)
            })
        food.value = ""
        price.value = ""
    }
    else {
        alert('please palce proper order')
    }
}


function orderCreate(obj) {
    let mainDiv
    if (obj.table == 'table1') {
        mainDiv = list1
    }
    else if (obj.table == 'table2') {
        mainDiv = list2
    }
    else {
        mainDiv = list3
    }

    let newOrder = document.createElement('li')
    newOrder.className = 'list-group-item'
    newOrder.id = obj._id
    newOrder.innerHTML = `<span>${obj.food} + ${obj.price}</span> <button class="delete-item btn btn-danger">Cancel Order</button>`
    mainDiv.appendChild(newOrder)
}

function deleteOrder(e) {
    if (e.target.classList.contains('delete-item')) {
        let element = e.target.parentElement
        commonInstance().delete(`/${element.id}`)
            .then(() => element.remove())
    }
}

