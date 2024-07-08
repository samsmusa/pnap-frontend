// src/components/EditProductForm.tsx

import React from 'react';
import {Button, Select, TextInput} from 'flowbite-react';
import {Category, Product, ProductForm, UserOwnProductsData} from "../interfaces/interface.ts";
import {useMutation, useQuery} from "@apollo/client";
import {CATEGORIES} from "../queires/categories.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {UPDATE_PRODUCT, USER_OWN_PRODUCTS} from "../queires/product.ts"; // Adjust with your UI library components

interface EditProductFormProps {
    product: Product;
    onSave: () => void;
    onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({product, onSave, onCancel}) => {
    const {data: categ} = useQuery(CATEGORIES);
    const [UpdateProduct] = useMutation(UPDATE_PRODUCT, {
        update: (cache, {data: {updateProduct}}) => {
            const existingProducts = cache.readQuery<UserOwnProductsData>({query: USER_OWN_PRODUCTS});

            // Here, modify the cache data as needed
            const updatedProducts = existingProducts?.userProducts?.map(product =>
                product.id === updateProduct.id ? updateProduct : product
            );

            cache.writeQuery({
                query: USER_OWN_PRODUCTS,
                data: {userOwnProducts: updatedProducts}
            });
        },
        onCompleted: () => {
            onSave();
        }
    });
    const form = useForm<ProductForm>({
        defaultValues: {
            title: product.title,
            description: product.description,
            price: product.price,
            rent: product.rent,
            categoryIds: product.categories?.map((e: Category) => e.id) || [],
            published: product.published,

        }
    });


    const handleSubmit: SubmitHandler<ProductForm> = data => {
        UpdateProduct({
            variables: {
                id: product.id,
                title: data.title,
                description: data.description,
                price: data.price,
                rent: data.rent,
                categoryIds: data.categoryIds?.map(cat => parseInt(cat as unknown as string)),
                published: product.published,

            },
        }).then();
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Title
                </label>
                <TextInput
                    id="name"
                    {...form.register('title', {required: true})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <Select id="category"
                        {...form.register('categoryIds')} required
                        multiple>
                    {
                        categ?.categories?.map((cat: Category) => <option
                            selected={product?.categories?.map((e) => e.id)?.includes(cat.id)}
                            key={cat.id}
                            value={cat.id}>{cat.name}</option>
                        )
                    }
                </Select>
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <TextInput
                    id="price"
                    {...form.register('price', {valueAsNumber: true})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <TextInput
                    id="rent"
                    {...form.register('rent', {valueAsNumber: true})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    {...form.register('description')}
                    rows={4}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit" className="bg-green-500 text-white">
                    Save
                </Button>
                <Button onClick={onCancel} className="bg-red-500 text-white ml-2">
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default EditProductForm;
