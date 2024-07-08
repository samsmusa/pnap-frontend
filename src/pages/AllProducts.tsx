import React from "react";
import ProductCard from "../components/ProductCard";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {ALL_PRODUCTS} from "../queires/product";

const AllProducts = () => {
    const navigator = useNavigate()
    const { loading, error, data } = useQuery(ALL_PRODUCTS);
    console.log(data, loading, error)
    // const data = React.useMemo(() => {
    //     return Array(10)
    //         .fill(1)
    //         .map((p, index) => ({
    //             id: index,
    //             name: `Product ${index + 1}`,
    //             description: `Description for Product ${index + 1}`,
    //             category: "Category",
    //             price: `${(index + 1) * 10}`,
    //             rentPerHour: `${(index + 1) * 2}`,
    //         }));
    // }, []);

    const handleCardClick = (product) => (event) => {
        // setSelectedProduct(product);
        // setIsBuyModalOpen(true);
        console.log('product');
        navigator(`/product/${product?.id}`)

    };


    return (
        <div className="mt-4">
            <div className="flex flex-wrap gap-4">
                {data?.products?.map((product) => (
                    <ProductCard key={product.id} product={product}
                                 onClick={handleCardClick(product)}/>
                ))}
            </div>
        </div>
    );
};


export default AllProducts;
