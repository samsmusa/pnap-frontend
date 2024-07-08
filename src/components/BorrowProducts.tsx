import React from 'react'
import ProductCard from './ProductCard';
import {useQuery} from "@apollo/client";
import {USER_BORROWED} from "../queires/product.ts";
import OwnerCard from "./OwnerCard.tsx";

const BorrowProducts = () => {
    const {data, refetch} = useQuery(USER_BORROWED);
    React.useEffect(()=>{
        refetch().then()
    }, [])
    return (

        <div>{data?.borrowedProducts?.map((product) => <ProductCard key={product.id} product={product?.product}>
            <OwnerCard owner={product?.user}/> </ProductCard>)}</div>
    )
}

export default BorrowProducts