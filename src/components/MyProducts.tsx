// src/components/Dashboard.tsx

import React from 'react';
import AddProductForm from './AddProductForm';
import UserOwnProductCard from '../pages/UserProductCard';
import {useQuery} from "@apollo/client";
import {USER_OWN_PRODUCTS} from "../queires/product";
import {Product} from "../interfaces/interface.ts";


const MyProducts: React.FC = () => {
    const {data: products, refetch} = useQuery(USER_OWN_PRODUCTS);
    const handleSave = () => {
        refetch()
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between my-2">
                <h2 className="text-2xl font-bold mb-4 text-center mt-8">
                    My Products List
                </h2>

                <AddProductForm onSave={handleSave}/>
            </div>
            <h1 className="text-3xl font-bold mb-8 text-center mt-5">Dashboard</h1>
            {
                products?.userProducts?.map((product: Product) => <UserOwnProductCard key={product.id} refetch={refetch}
                                                                             product={product}/>)
            }
        </div>
    );
};

export default MyProducts;
