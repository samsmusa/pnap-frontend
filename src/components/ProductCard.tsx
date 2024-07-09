// src/components/ProductCard.tsx
import React, {ReactNode} from 'react';
import {Card, Kbd} from 'flowbite-react';
import {Category, Product} from "../interfaces/interface.ts";


interface ICard {
    onClick?: () => void;
    product: Product;
    children?: ReactNode;
}

const ProductCard: React.FC<ICard> = ({product, onClick, children}) => {
    return (
        <Card onClick={onClick} key={product.id}
              className="relative p-4 bg-white shadow-md rounded-lg my-2 w-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{product.title}</h3>
            </div>
            <p className="text-gray-700 font-semibold text-sm mb-1">{product?.categories?.map((cat: Category) =>
                <Kbd key={cat.id} className="mr-0.5">{cat?.name}</Kbd>)}</p>
            <p className="text-gray-700">Price: {product.price}</p>
            <p className="text-gray-700">Description: {product.description}</p>
            {children}

        </Card>
    );
}

export default ProductCard;
