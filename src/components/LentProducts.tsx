import React from 'react'
import ProductCard from './ProductCard';
import {useQuery} from "@apollo/client";
import {USER_LENT} from "../queires/product.ts";
import OwnerCard from "./OwnerCard.tsx";

const LentProducts = () => {
    const {data, refetch} = useQuery(USER_LENT);
    React.useEffect(() => {
        refetch().then()
    }, [])
    return (

        <div>{data?.lentProducts?.map((product) => <ProductCard key={product.id}
                                                                product={product?.product}>
            <OwnerCard owner={product?.user}/>
        </ProductCard>)}</div>
    )
}

export default LentProducts