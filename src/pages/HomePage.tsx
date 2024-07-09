import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {ALL_PRODUCTS} from "../queires/product.ts";
import {Product} from "../interfaces/interface.ts";
import ProductCard from "../components/ProductCard.tsx";

const HomePage = () => {
    const navigator = useNavigate()
    const {data} = useQuery(ALL_PRODUCTS);

    const handleCardClick = (product: Product) => () => {
        navigator(`/product/${product?.id}`)

    };


    return (
        <div className="mt-4">
            <div className="flex flex-wrap gap-4">
                {data?.products?.map((product: Product) => (
                    <ProductCard key={product.id} product={product}
                                 onClick={handleCardClick(product)}/>
                ))}
            </div>
        </div>
    );
};


export default HomePage;
