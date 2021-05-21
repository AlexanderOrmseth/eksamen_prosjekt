import sales from "../store/Sales.js";
import restaurants from '../modules/RestaurantModule.js';
import menu from "../store/Menu.js";

const dropDownBtn = document.querySelector(".button");
const dropDownMenu = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const addSection = document.querySelector(".hide-add-section");
const selectSoldItemDropdown = document.querySelector(".select-sold-item-dropdown");

const getRestaurantStates = (name) => {

    sales.forEach(sale => res.name === name)
}


const displayResturantsInDropDown = (() => {
    restaurants.getAll().forEach(restaurant => {
        dropdownContent.innerHTML += `
            <a href="#" class="dropdown-item">
        ${restaurant.location}
          </a>
            `;

    });

})();


const showRestuarantInDropDown = () => {

    dropDownMenu.classList.toggle("is-active")
}


dropDownBtn.onclick = () => showRestuarantInDropDown();



const showMenuTitle = () => {
    selectSoldItemDropdown.innerHTML = "";
    menu.forEach(menuItem => {
        selectSoldItemDropdown.innerHTML += `
    <option value=${menuItem.id} class="menu-title">${menuItem.title}</option>
    
    `;
    })

}


const checkChoiceAndAddToStats = () => {
    addSection.className = "show-add-section";

    const addBtn = document.querySelector(".add-button");
    const menuTitles = document.querySelectorAll(".menu-title");

    addBtn.onclick = () => {

        console.log(menuTitles);


    }

}



const dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach(item => {

    item.onclick = () => {
        showMenuTitle();
        showRestuarantInDropDown();
        showRestuarantStats(item)
        checkChoiceAndAddToStats();
    };

})






const showRestuarantStats = (item) => {


    const restaurantDiv = document.querySelector(".resturant-sales");
    const restaurantName = item.innerHTML.trim();


    restaurantDiv.innerHTML = `
        <h3> ${restaurantName} </h3>
        <p> Antall pizzaer solgt: 0 </p>
        <p> Antall drikker solgt: 0 </p>
        <p> total solgte varer: 0 </p>
    `;

}







/*
SHOW TOTAL SALES FOR ALL RESTURANTS
CHECK IF SALES GOAL IS MET IF ITS NOT MET SHOW DIFFERANCE
SHOW WHAT EACH RESTURANT SOLD/WEATHER OR NOT THEY MET THE GOAL

*/