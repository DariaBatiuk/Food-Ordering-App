import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
} from "../../stores/menu/ProductsSlice";
import ProductDetailCard from "../../components/ProductDetailCard";
import { Tabs } from "../../components/Tabs";
import { addToCart } from "../../stores/cart/cartSlice";

export const Menu = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [activeTab, setActiveTab] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onAddProduct = (product) => {
    console.debug({ product })
    dispatch(addToCart(product))
  };

  const onTabSwitch = (newActiveTab) => {
    setActiveTab(newActiveTab);
    let categories = products.items.map((product) => product.name.name);
    let index = categories.findIndex(category => newActiveTab === category);
    console.log(index)
    if (index > -1) {
      setActiveTabIndex(index);
    } else {
      setActiveTabIndex(0);
    }
  }

  return (
    <div className="bg-white ">
      {
        products.status !== "fulfilled" ? (
          <div>Loading...</div>
        ) : (
          <div className="menu-wrapper">

            <div className="menu-item flex flex-row">
              {
                products.items &&
                <Tabs
                  list={products.items.map((product) => product.name.name)}
                  activeTab={activeTab}
                  onTabSwitch={onTabSwitch}
                />
              }
            </div>

            <div className="flex flex-row mx-3">
              {products.items &&
                products.items[activeTabIndex].products.map((product, index) => {
                  return <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct} />;
                })}
            </div>

          </div>
        )}
    </div>
  )
};



export default Menu;
