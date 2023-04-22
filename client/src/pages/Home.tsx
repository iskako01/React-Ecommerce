import MainCarousel from "../components/MainCarousel";
import Subscribe from "../components/Subscribe";
import ProductList from "../components/product/ProductList";

const Home = () => {
  return (
    <div>
      <MainCarousel />
      <ProductList />
      <Subscribe />
    </div>
  );
};

export default Home;
