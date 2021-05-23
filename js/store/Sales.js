const Sales = (() => {
    let allSales = new Map();

    const addSale = (sale, amt, id) => {

        const key = parseInt(sale.id) + parseInt(id);
        if (allSales.get(key) !== undefined) {
            allSales.get(key).numberOfSales += parseInt(amt);
            return;
        }

        allSales.set(key, {
            restaurantID: parseInt(id),
            title: sale.title,
            id: sale.id,
            type: sale.type,
            numberOfSales: amt,
            price: sale.price
        });



    }


    return {
        allSales,
        addSale
    }


})();


export default Sales;