import axios from 'axios';
import Noty from 'noty';
import moment from 'moment';
import { initAdmin } from './admin';
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')
// AXIOS
function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        // console.log(res);
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type:'success',
            timeout: 1000,
            text:"Item Added to cart",
            progressBar:false
        }).show();
    }).catch(err => {
        new Noty({
          type: "error",
          timeout: 1000,
          text: "Something went wrong",
          progressBar: false,
        }).show();
    });
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // let pizza = btn.dataset.pizza
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
        // console.log(pizza);
    })
})

const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}
// Change Order Status
let statuses = document.querySelectorAll(".status_line");
// console.log(statuses)
let hinp = document.querySelector("#hiddenInput");
let order = hinp ? hinp.value : null;
order = JSON.parse(order)
let time = document.createElement('small')

// console.log(order);
function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    //Login of dynamically changing status 
    let stepCompleted = true;
    statuses.forEach((status)=>{
        let dataProp = status.dataset.status;
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            time.innerText 
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }
    })

}
updateStatus(order);

// Socket 
let socket = io()
initAdmin(socket)
//Join
if(order){
    socket.emit('join',`order_${order._id}`)
}
// Data will look like - order_ksandjbfsabcwjebdjasb
let adminAreaPath = window.location.pathname
// console.log(adminAreaPath) 
if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}

socket.on("orderUpdated",(data)=>{
    const updatedOrder = {...order}//copying an object order
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    // console.log(data);
    updateStatus(updatedOrder)
    new Noty({
      type: "success",
      timeout: 1000,
      text: "Order Status  Updated",
      progressBar: false,
    }).show();
});



