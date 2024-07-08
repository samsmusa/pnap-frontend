import ProductCard from './ProductCard';
import {useQuery} from "@apollo/client";
import {USER_BOUGHT} from "../queires/product.ts";
import OwnerCard from "./OwnerCard.tsx";
import React from "react";

const BoughtProducts = () => {
    const {data, refetch} = useQuery(USER_BOUGHT);
    React.useEffect(()=>{
        refetch().then()
    }, [])
    return (
        <div>{data?.boughtProducts?.map((product: any) => <ProductCard key={product.id} product={product?.product}><OwnerCard
            owner={product?.user}/></ProductCard>)}</div>
    )
}

export default BoughtProducts