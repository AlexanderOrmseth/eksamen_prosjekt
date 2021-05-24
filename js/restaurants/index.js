//Oppretter variabler og henter ut de elementene som trenger en funksjon
const tabs = document.querySelectorAll('.tabs li');
const tabContent = document.querySelectorAll('#tab-content > div');

//Oppretter funksjon for tab-barene
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active');
        
        //Oppretter funksjon 
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