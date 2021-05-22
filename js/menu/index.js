const output = document.getElementById("menu");
const modalOverlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal");

let products = [...menu];

// render menu items
const renderProducts = (arr = products) => {
  output.innerHTML = arr.map((product) => Product(product)).join("");
};

// search
const handleSearchChanged = () => {
  const searchTerm = document
    .getElementById("search")
    ?.value.trim()
    .toLowerCase();
  if (searchTerm.length > 0) {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    if (filteredProducts.length > 0) {
      renderProducts(filteredProducts);
    } else {
      output.innerHTML = `<p class="tag is-large is-warning is-light">Ingen produkt funnet med søket: <span class="bold">${searchTerm}</span></p>`;
    }
  } else {
    renderProducts();
  }
};

// Get product by id
const productById = (id) => products.find((product) => product.id == id);

// Close Modal
const closeModal = () => (modalOverlay.style.display = "none");

// Open Modal
const openModal = (del = false, id = null) => {
  modalOverlay.style.display = "block";
  const product = id && productById(id);
  // render content depending on action
  modal.innerHTML = del ? deleteModule(product) : addEditModal(product);
};

// Delete product by id
const deleteProduct = (id) => {
  products = [...products].filter((product) => product.id != id);
  closeModal();
  renderProducts();
};

const addEditProduct = (id) => {
  // get values
  const title = document.getElementById("product-title").value;
  const price = +document.getElementById("product-price").value;
  const ingredients =
    document.getElementById("product-ingredients")?.value || "";

  // simple validate
  if (title && price) {
    // Edit or Add ?
    switch (id ? true : false) {
      case true:
        // find index
        const productIndex = products.findIndex((product) => product.id == id);
        let newArray = [...products];
        // update product
        newArray[productIndex] = {
          ...newArray[productIndex],
          title,
          price,
          ingredients,
        };
        products = newArray;
        break;
      case false:
        products = [
          ...products,
          {
            id: Date.now(), // simple way of generating an id
            title,
            price,
            imgSrc: "placeholder.png",
            type: document.getElementById("product-type").value,
            ingredients,
          },
        ];
        break;
    }
    // close and re-render products
    closeModal();
    renderProducts();
  }
};

// Select change (to change product type)
const handleSelectChange = () => {
  const selectValue = document.getElementById("product-type").value;
  const ingredientsField = document.querySelector(".form-field-ingredients");
  if (selectValue === "drink") {
    ingredientsField.style.display = "none";
    document.getElementById("product-ingredients").value = "";
  } else {
    ingredientsField.style.display = "block";
  }
};

// product "component"
const Product = (product) =>
  `<div class="product card">
    <div class="card-image">
      <img alt="Bilde av ${product.type}" src='./images/menu/${
    product.imgSrc
  }' />
    </div>
    <div class="card-content">
      <h2 class="title is-4">${product.title}</h2>
      <p class="product-price"><span>pris:</span> ${product.price},- kr</p>

      ${
        product?.ingredients
          ? `
          <p class="product-ingredients">
            <span>ingredienser:</span> ${product.ingredients}
          </p>`
          : `<p class="invis">-</p>`
      }
      <div class="field is-grouped">
        <p class="control">
          <button class="button" onclick="openModal(${[
            false,
            product.id,
          ]})">Rediger</button>
        </p>
        <p class="control">
          <button class="button is-danger is-light" onclick="openModal(${[
            true,
            product.id,
          ]})">Slett</button>
        </p>
      </div>

    </div>
  </div>`;

// for deleting a product
const deleteModule = (product) =>
  `<div class="modal-content">
    <h2 class="title is-4">Vil du slette <span>${product.title}</span>?</h2>
    <div class="field field-actions is-grouped">
      <p class="control">
        <button class="button is-link is-light" onclick="closeModal()">Lukk</button>
      <p class="control">
        <button class="button is-danger" onclick="deleteProduct(${product.id})">Slett</button>
      </p>
    </div>
  </div>`;

// Used for both adding and editing product
const addEditModal = (product = null) =>
  `<div class="modal-content">
    <h2 class="title is-4">${product ? "Rediger produkt" : "Legg til"}</h2>
    <div class="form">
      <div class="field">
        <label class="label" for="product-title">Produktnavn</label>
        <div class="control">
          <input class="input" id="product-title" autocomplete="off" value="${
            product?.title || ""
          }" name="product-title" />
        </div>
      </div>
      <div class="field">
        <label class="label" for="product-price">Pris</label>
        <div class="control">
          <input class="input" autocomplete="off" id="product-price" value="${
            product?.price || ""
          }" name="product-price" />
        </div>
      </div>
      ${
        // show type only if new product
        !product
          ? `
      <div class="field">
        <label class="label" for="product-type">Type</label>
        <div class="control">
        <div class="select">
          <select onchange="handleSelectChange()" name="product-type" id="product-type">
            <option selected value="pizza">Pizza</option>
            <option value="drink">Drikke</option>
          </select>
          </div>
        </div>
      </div>`
          : ""
      }
      ${
        // show ingredients if product type is pizza
        product?.type === "pizza" || !product
          ? `
        <div class="field form-field-ingredients">
          <label class="label" for="product-ingredients">Ingredienser</label>
          <div class="control">
            <input class="input" autocomplete="off" name="product-ingredients" id="product-ingredients" value="${
              product?.ingredients || ""
            }" />
          </div>
        </div>`
          : ""
      }
      <div class="field field-actions is-grouped">
      <div class="control">
        <button class="button is-link is-light" onclick="closeModal()">Lukk</button></div><div class="control">
        <button class="button is-link" onclick="addEditProduct(${
          product?.id
        })">${product ? "Lagre endringer" : "Legg til"}</button></div>
  
    </div>
  </div>`;
