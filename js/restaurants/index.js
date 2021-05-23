// tabs
const tabs = document.querySelectorAll('.tabs li');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const tabContent = document.querySelectorAll('#tab-content > div');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active');

        searchButton.onclick = function() {
            searchInput.classList.toggle('active')
            
        }

       

        const target = tab.dataset.target
        tabContent.forEach(content => {
            if (content.getAttribute('id') == target) {
                content.classList.remove('is-hidden');
            } else {
                content.classList.add('is-hidden');
            }
        })
    })
})