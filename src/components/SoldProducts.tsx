import React from 'react'
import ProductCard from './ProductCard';
import {useQuery} from "@apollo/client";
import {USER_SOLD} from "../queires/product.ts";
import OwnerCard from "./OwnerCard.tsx";

const SoldProducts = () => {

    const {data, refetch} = useQuery(USER_SOLD);
    React.useEffect(() => {
        refetch().then()
    }, [])
    return (

        <div>{data?.soldProducts?.map((product) => <ProductCard key={product.id} product={product?.product}>
            <OwnerCard owner={product?.user}/></ProductCard>)}</div>
    )
}

export default SoldProducts