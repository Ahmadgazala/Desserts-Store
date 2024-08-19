let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let listt = document.querySelector('.listt');
let confirmOrder = document.getElementById('confirm-order')


confirmOrder.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name1: 'Waffle',
        name2: 'Waffle with Berries',
        image: 'waffle.jpg',
        price: 6.5
    },
    {
        id: 2,
        name1: 'Creme Brulee',
        name2: 'Vanilla Bean Creme Brulee',
        image: 'creme-brulee.jpg',
        price: 7.00
    },
    {
        id: 3,
        name1: 'Macaron',
        name2: 'Macaron Mix of Five',

        image: 'macaron.jpg',
        price: 8.00
    },
    {
        id: 4,
        name1: 'Tiramisu',
        name2: 'Classic Tiramisu',

        image: 'tiramisu.jpg',
        price: 5.50
    },
    {
        id: 5,
        name1: 'Baklava',
        name2: 'Pistachio Baklava',
        image: 'baklava.jpg',
        price: 4.00
    },
    {
        id: 6,
        name1: 'Pie',
        name2: 'Lemon Meringue Pie',
        image: 'meringue.jpg',
        price: 5.00
    },
    {
        id: 7,
        name1: 'Cake',
        name2: 'Red Velvet Cake',
        image: 'cake.jpg',
        price: 4.50
    },
    {
        id: 8,
        name1: 'Brownie',
        name2: 'Salted Caramel Brownie',
        image: 'brownie.jpg',
        price: 5.50
    },
    {
        id: 9,
        name1: 'Panna Cotta',
        name2: 'Vanilla Panna Cotta',

        image: 'panna-cotta.jpg',
        price: 6.5
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
          
            <div class ="contaner-image-button">
              <img src="image/${value.image}">
              
            <button onclick="addToCard(${key})" id='AddToCart'>
            <svg xmlns="http://www.w3.org/2000/svg"  width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
            Add To Card
            </button>
            </div>
            <div class="text-card">
            <div class="title1">${value.name1}</div> 
            <div class="title2">${value.name2}</div>
            <div class="price">$${value.price.toLocaleString(undefined, {

            minimumFractionDigits: 2,  // الحد الأدنى للمنازل العشرية
        })}</div>
            </div>`;
        list.appendChild(newDiv);
    })

}


initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    let hasItems = false; // متغير لتتبع وجود عناصر في العربة

    listCards.forEach((value, key) => {
        if (value != null) {
            hasItems = true; // تحديد أن هناك عناصر في العربة
            totalPrice = totalPrice + value.price;
            count = count + value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name2}
                <div>(${value.quantity} * $${(value.price / value.quantity).toFixed(2)})</div>
                </div>
                <div>$${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

    if (!hasItems) {
        listCard.innerHTML = '<p>Your cart is empty.</p>'; // عرض رسالة عند خلو العربة
        copyListCardToListt();
        removeImage(); // إزالة الصورة عند خلو العربة
    } else {
        copyListCardToListt();
    }
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        listCards[key] = null;
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }

    // التحقق مما إذا كانت العربة فارغة بعد التعديل
    if (listCards.every(item => item === null)) {
        listCards = []; // إعادة تعيين العربة
    }

    reloadCard();
}


function copyListCardToListt() {
    let listt = document.querySelector('.listt');  // اختر عنصر listt
    listt.innerHTML = ''; // افرغ محتويات listt

    listCards.forEach((value, key) => {
        if (value != null) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = `
                <div style="width:200px; font-weight: bold;">${value.name2}</div>
                <div style="width:200px; color:rgb(200, 20, 20);">
                    ${value.quantity} * 
                    <span style="padding-left:14px; padding-right:9px; color:rgb(117, 77, 5);">
                        @$${(value.price / value.quantity).toFixed(2)}
                    </span>
                    <span style="color: rgb(117, 94, 14); font-weight: bold; opacity: 0.7;">
                        $${value.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,  // الحد الأدنى للمنازل العشرية
                        })}
                    </span>
                </div>
                <hr>
            `;
            listt.appendChild(newDiv);
        }
    });

    removeImage(); // استدعاء مرة واحدة بعد انتهاء التكرار
}

function removeImage() {
    // تحديد الصورة باستخدام المعرّف
    const image = document.getElementById('cakeImg');
    const yourItem= document.getElementById('your-add-items')

    // التحقق من وجود الصورة ثم إزالتها
    if (image) {
        image.remove();
    }
    if(yourItem){
        yourItem.remove();

    }
}


function showShoppingButton() {
    const shoppingButton = document.querySelector('.shopping-button');
    if (shoppingButton) {
        shoppingButton.classList.remove('hidden-button');


    }
}

function showShoppingLabel(){
    const shoppingLabel = document.querySelector('.shopping-label');
    if(shoppingLabel){
        shoppingLabel.classList.remove('hidden-label')
    }


}

// Optional: If you want to show the button when any button on the page is clicked
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', showShoppingButton);

    button.addEventListener('click', showShoppingLabel);

    
});
document.querySelectorAll('label').forEach(button => {
    button.addEventListener('click', showShoppingButton);
});




document.querySelectorAll('#AddToCart').forEach((button) => {
    // حفظ النص الأصلي واللون الأصلي للزر
    let originalText = button.textContent;
    let originalBackgroundColor = button.style.backgroundColor;
    let originalColor = button.style.color;

    // عندما يتم تمرير المؤشر فوق الزر
    button.addEventListener('mouseover', () => {


        button.textContent = "Hovered!";
        button.style.backgroundColor = "#FF6347"; // تغيير لون الخلفية عند التمرير
        button.style.color = "#000"; // تغيير لون النص عند التمرير
    });

   
    const originalContent = button.innerHTML;

    // عندما يتم تحريك المؤشر بعيدًا عن الزر
    button.addEventListener('mouseout', () => {
        button.textContent = originalText; // إعادة النص الأصلي
        button.style.backgroundColor = originalBackgroundColor; // إعادة لون الخلفية الأصلي
        button.style.color = originalColor; // إعادة لون النص الأصلي
        button.innerHTML = originalContent;
    });
});

