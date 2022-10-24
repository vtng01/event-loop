const callstack = document.querySelector(".flexbox-for-call-stack")

// too add new divs
function createEvent(text) {
        console.log('processing...')
        const div = document.createElement("div")
        div.innerHTML = text
        div.className = 'events'
        callstack.appendChild(div)

}

function removeEvent() {
    const select = document.getElementsByClassName('events')
    if (select.length > 0) {
        callstack.removeChild(select[select.length - 1])
    }

}
// button to activate

const button = document.querySelector('#activate')

button.addEventListener("click", takeOrder)

// code for call stack

async function preparation(itemName, callback) {
    text1 = `preparation(${itemName}, serveOrder(Coffee))`
    createEvent(text1)
    await new Promise(resolve => setTimeout(resolve, 3000))
    removeEvent()
    await new Promise(resolve => setTimeout(resolve, 2000))
    //How long it takes to prepate itemName
    let preparationTime;
    //Using switch as I'm checking for equality instead of truthy/falsy
    switch (itemName) {
      case "Coffee":
        preparationTime = 4000;
        break;
      case "Chips":
        preparationTime = 10000;
        break;
      case "Burger":
        preparationTime = 10000;
        break;
      case "Juice":
        preparationTime = 500;
        break;
      default:
        console.log("We don't have that");
        return;
    }
    //Tell JS "This is going to take time".
    //Once time has run, serve order.
    setTimeout(async () => {
        text = `console.log("Food prepped - " + ${itemName})`
        createEvent(text)
        removeEvent()

        await callback(itemName)
    }, preparationTime)

    removeEvent()
  }


  //Take Order function
  //Params - itemName String
  //Call submitOrder function
  async function takeOrder() {
    //Waiter is still at table
    let itemName = 'Coffee'
    createEvent(`takeOrder(${itemName})`)
    await new Promise(resolve => setTimeout(resolve, 3000))
    text = `console.log(${itemName}, is that correct?)`
    createEvent(text)
    await new Promise(resolve => setTimeout(resolve, 3000))
    removeEvent()
    await new Promise(resolve => setTimeout(resolve, 3000))
    await submitOrder(itemName)

    removeEvent()

  }

  //submitOrder function
  //Params - itemName String, Pass to Prep function
  async function submitOrder(itemName) {
    createEvent(`submitOrder(${itemName})`)
    await new Promise(resolve => setTimeout(resolve, 3000))
    text = `console.log(taking ${itemName} to Kitchen)`
    //serveOrder is being passed as a callback function, no parenthesis
    //so it doesn't get called in place
    createEvent(text)
    await new Promise(resolve => setTimeout(resolve, 3000))
    removeEvent()
    await new Promise(resolve => setTimeout(resolve, 3000))

    await preparation(itemName, serveOrder)
    await new Promise(resolve => setTimeout(resolve, 3000))
    removeEvent()
  }

  //Serve function
  //Params - itemName String, take back to table
  async function serveOrder(itemName) {
    createEvent(`serveOrder(${itemName})`)
    await new Promise(resolve => setTimeout(resolve, 3000))

    text = `console.log(Serving ${itemName} to customer)`
    createEvent(text)
    await new Promise(resolve => setTimeout(resolve, 3000))
    removeEvent()
    await new Promise(resolve => setTimeout(resolve, 2000))
    removeEvent()

  }


