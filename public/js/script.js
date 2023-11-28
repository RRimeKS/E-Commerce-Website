const card = document.getElementsByClassName("card");
const btnAdd = document.getElementsByClassName("btn-add");
const cartList = document.querySelector(".shopping-cart-list");
const btnCart = document.querySelector(".btn-cart");


class Product {
    constructor(image, title, price, productId) {
        this.image = image;
        this.title = title;
        this.price = price;
        this.productId = productId;
    }
}

class UI {
    addToCart(product) {
        let listItem = document.createElement("div");
        listItem.classList = "list-item";


        listItem.innerHTML = `
        <div class="row align-items-center text-white-50 mt-2">
            <input type="hidden" id="productId" name="productId" value="${product.productId}">

            <div class="col-md-3"><img src="${product.image}" class="card-img-top img-fluid"></div>

            <div class="col-md-5">
            <div class="title">${product.title}</div>
            </div>

            <div class="col-md-2">
            <div class="price" id="price">${product.price}</div>
            </div>

            <div class="col-md-2">
            <button type="button" class="btn btn-delete">
                <i class="fas fa-trash-alt text-danger"></i>
            </button>
            </div>

        </div>
        `;

        cartList.appendChild(listItem);
    }
    shoppingListCount() {
        const listItem = document.getElementsByClassName("list-item");
        const itemCount = document.getElementById("item-count");
        itemCount.innerText = listItem.length;
    }
    deleteToCart() {
        let btnDelete = document.getElementsByClassName("btn-delete");
        let self = this;
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", function () {
                this.parentElement.parentElement.parentElement.remove();
                self.shoppingListCount();
            });
        }
    }
}

for (let i = 0; i < card.length; i++) {
    btnAdd[i].addEventListener("click", function () {
        const image = card[i].getElementsByClassName("card-img-top")[0].src;
        const title = document.getElementsByClassName("card-title")[i].textContent;
        const price = card[i].getElementsByClassName("price")[0].textContent;
        const productId = document.getElementById("product-id").value

        btnAdd[i].textContent = "Sepete Eklendi";
        btnAdd[i].classList.add("disabled");

        const product = new Product(image, title, price, productId);
        const uI = new UI();

        const addToCart = uI.addToCart(product);
        const itemCount = uI.shoppingListCount();
        const deleteToCart = uI.deleteToCart();

    });

}

function cartToggle() {
    btnCart.addEventListener("click", function () {
        cartList.classList.toggle("d-none");
    });
}
cartToggle();

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}