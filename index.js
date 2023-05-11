import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-50886-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


// javascript
const str = document.getElementById("input-field")
const button = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-el")


onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
    var itemsArray = Object.values(snapshot.val())
    var itemsId = Object.keys(snapshot.val())
    clearShoppingList()
    
        for(let i=0; i<itemsArray.length; i++){
        // shoppingListEl.innerHTML += `<li>${itemsArray[i]}</li>`
        var li = document.createElement("li")
        
        li.textContent = itemsArray[i]
        
        shoppingListEl.appendChild(li);
        
        li.addEventListener("click",function(){
            var deleteItemFromDatabase = ref(database,`shoppingList/${itemsId[i]}`)
            remove(deleteItemFromDatabase)
        })
        shoppingListEl.append(li);
        
    }
    }else{
        shoppingListEl.innerHTML = "No items here"
    }
})


function clearShoppingList(){
    shoppingListEl.innerHTML= "";
}

button.addEventListener("click",function(){
    let string = str.value
    
    // console.log(string+" is added to the Firebase Database")
    if(string === ""){
        document.getElementById("error-msg").textContent = "Please enter a value before adding";
    } else {
        push(shoppingListInDB, string)
        clearInputField()
        document.getElementById("error-msg").textContent = ""; // Clear the error message
    }
    // addItemToList()
    // shoppingListEl.innerHTML += `<li>${string}</li>`
})

function clearInputField(){
    str.value = ""
}

// function addItemToList(){
//     let string = str.value
//     shoppingListEl.innerHTML += `<li>${string}</li>`
// }

function display(){
    // var dis = str.value
    // console.log(dis)
    console.log(str.value)
}
