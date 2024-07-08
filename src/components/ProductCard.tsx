// src/components/ProductCard.tsx
import React, {MouseEventHandler, ReactNode} from 'react';
import {Card, Button} from 'flowbite-react';

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: string;
    rentPerHour: string;
}

interface ICard {
    onClick?: (MouseEventHandler) => void;
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
            <p className="text-gray-700">Category: {product.category}</p>
            <p className="text-gray-700">Price: {product.price}</p>
            <p className="text-gray-700">Description: {product.description}</p>
            {children}

        </Card>
    );
}

export default ProductCard;
