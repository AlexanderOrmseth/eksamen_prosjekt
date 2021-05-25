import restaurants from "../modules/RestaurantModule.js";
//import menu from "../store/Menu.js";
import Sales from "../store/Sales.js";

const dropDownBtn = document.querySelector(".button");
const dropDownMenu = document.querySelector(".dropdown");

const addSection = document.querySelector(".hide-add-section");
const selectSoldItemDropdown = document.querySelector(
  ".select-sold-item-dropdown"
);
const restaurantDiv = document.querySelector(".resturant-sales");

const greetByTime = () => {
  var dt = new Date();
  var tm = dt.getHours();
  var greeting = (tm =
    0 && tm < 6
      ? "God natt"
      : tm >= 6 && tm < 9
      ? "God morgen"
      : tm >= 9 && tm < 12
      ? "God formiddag"
      : tm >= 12 && tm < 18
      ? "God ettermiddag"
      : "God Kveld");

  return greeting;
};

const greetUser = (time) => {
  const greetDiv = document.querySelector(".greet-div");
  greetDiv.innerHTML += `
        <h3> ${greetByTime()} </h3>
     `;
};

const displayResturantsInDropDown = (() => {
  greetUser();
  const dropdownContent = document.querySelector(".dropdown-content");
  restaurants.getAll().forEach((restaurant) => {
    dropdownContent.innerHTML += `
                    <option  value=${restaurant.restaurantId} href="#" class="dropdown-item">
                ${restaurant.location}
        </option>
            `;
  });
})();

const showRestuarantInDropDown = () => {
  dropDownMenu.classList.toggle("is-active");
};

dropDownBtn.onclick = () => showRestuarantInDropDown();

const showMenuTitle = () => {
  selectSoldItemDropdown.innerHTML = "";
  menu.forEach((menuItem) => {
    selectSoldItemDropdown.innerHTML += `
    <option value=${menuItem.id} class="menu-title">${menuItem.title}</option>
    
    `;
  });
};

const showStats = (resName, allSales) => {
  let pizza = 0;
  let pizzaProfit = 0;
  let drinks = 0;
  let drinkProfit = 0;

  allSales.forEach((s) => {
    if (s.type === "pizza") {
      pizza += s.numberOfSales;
      pizzaProfit += s.price * s.numberOfSales;
    }

    if (s.type === "drink") {
      drinks += s.numberOfSales;
      drinkProfit += s.price * s.numberOfSales;
    }
  });

  let totalProfit = pizzaProfit + drinkProfit;

  restaurantDiv.innerHTML = `
        <h3>${resName}</h3>
         <p> Antall pizzaer solgt: ${pizza}  tjent ${pizzaProfit}</p>
         <p> Antall drikker solgt: ${drinks}  tjent ${drinkProfit}</p>
         <p> Total: ${totalProfit} ,- </p>
     `;
};

const showAllStats = () => {
  let allProfit = 0;
  const mostPopularDish = "";
  const leastPopularDish = "";

  const sales = Sales.allSales;

  sales.forEach((s) => {
    allProfit += s.price * s.numberOfSales;
  });

  restaurantDiv.innerHTML = `

    <h3> Total profit mellom alle resturantente: ${allProfit} .- </h3>
    
    
    `;
};

const updateStats = (item) => {
  const sales = Sales.allSales;

  const restaurantID = item.value;
  let resName = "";

  restaurants.getAll().forEach((r) => {
    if (r.restaurantId === parseInt(restaurantID)) {
      resName = r.location;
      return;
    }
  });

  if (resName === "" && sales.size > 0) {
    showAllStats();
  } else if (sales.size > 0) {
    const allSales = [];

    sales.forEach((s) => {
      if (s.restaurantID === parseInt(restaurantID)) {
        allSales.push(s);
      }
    });

    showStats(resName, allSales);
  }
};

const addToChart = (id, amt, res) => {
  menu.forEach((item) => {
    if (item.id == id) {
      Sales.addSale(item, amt, res.value);
      return;
    }
  });
};

const checkChoiceAndAddToStats = (item) => {
  addSection.className = "show-add-section";

  const addBtn = document.querySelector(".add-button");
  const menuTitles = document.querySelector(".select-sold-item-dropdown");

  addBtn.onclick = () => {
    const selectedIndex = menuTitles.options[menuTitles.selectedIndex].value;
    let amt = document.querySelector(".input");
    let amtValue = amt.value;

    if (amtValue === "") {
      amtValue = 1;
    } else {
      amtValue = parseInt(amtValue);
    }

    addToChart(selectedIndex, amtValue, item);
    updateStats(item);
    amt.value = "";
  };
};

const dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach((item) => {
  item.onclick = () => {
    showMenuTitle();
    showRestuarantInDropDown();
    updateStats(item);
    checkChoiceAndAddToStats(item);
  };
});
