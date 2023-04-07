import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoader = async () => {
    const loadProducts = await fetch('products.json');
    const products = await loadProducts.json();
    console.log(products);

    const storedCart = getShoppingCart();
    console.log(storedCart);
    const saveCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
        }
    }
    // const saveCart = [];

    // for (const id in storedCart) {
    //     const addedProduct = products.find(pd => pd.id === id);
    //     if (addedProduct) {
    //         const quantity = storedCart[id];
    //         addedProduct.quantity = quantity;
    //         saveCart.push(addedProduct);
    //     }
    // }

    return saveCart;
}
export default cartProductLoader;