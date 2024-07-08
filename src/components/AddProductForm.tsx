// src/components/AddProductForm.tsx

import React, {useState} from 'react';
import {Modal, Button, TextInput, Label, Select} from 'flowbite-react';
import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_PRODUCT} from "../queires/product";
import {CATEGORIES} from "../queires/categories";
import {Category} from "../interfaces/interface.ts";

interface AddProductFormProps {
    onSave: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({onSave}) => {
    const {data: categ} = useQuery(CATEGORIES);
    const [AddProduct, {data}] = useMutation(CREATE_PRODUCT, {
        onCompleted: () => {
            onSave();
        }
    });
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const form = useForm()


    const handleNextStep = () => setStep(step + 1);
    const handlePreviousStep = () => setStep(step - 1);

    const handleSave = (data: any) => {
        // onSave(newProduct);
        setShowModal(false);
        data.categoryIds = data?.categoryIds?.map((cat: string) => parseInt(cat));
        AddProduct({
            variables: {
                title: data.title,
                description: data.description,
                price: data.price,
                rent: data.rent,
                categoryIds: data.categoryIds
            }
        }).then();
        setStep(1);
    };

    const handleCancel = () => {
        setShowModal(false);
        setStep(1);
    };

    return (
        <>
            <div className="">
                <Button onClick={() => setShowModal(true)}
                        className="bg-green-500 text-white m-0">Add Product</Button>
            </div>
            <Modal show={showModal} onClose={handleCancel}>
                <form onSubmit={form.handleSubmit(handleSave)} className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                    {step === 1 && (
                        <>
                            <div className="mb-4">
                                <Label htmlFor="name"
                                       className="block text-sm font-medium text-gray-700">Product
                                    Name</Label>
                                <TextInput id="name"  {...form.register('title')} required/>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleCancel}
                                        className="mr-2 bg-red-500 text-white">Cancel</Button>
                                <Button onClick={handleNextStep}
                                        className="bg-green-500 text-white">Next</Button>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="mb-4">
                                <Label htmlFor="category"
                                       className="block text-sm font-medium text-gray-700">Category</Label>
                                <Select id="category"  {...form.register('categoryIds')} required
                                        multiple>
                                    {
                                        categ?.categories?.map((cat: Category) => <option
                                            key={cat.id}
                                            value={cat.id}>{cat.name}</option>
                                        )
                                    }
                                </Select>
                            </div>
                            <div className="flex justify-between">
                                <Button onClick={handlePreviousStep}
                                        className="bg-red-500 text-white">Previous</Button>
                                <Button onClick={handleNextStep}
                                        className="bg-green-500 text-white">Next</Button>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className="mb-4">
                                <Label htmlFor="description"
                                       className="block text-sm font-medium text-gray-700">Description</Label>
                                <TextInput id="description" {...form.register('description')}
                                           required/>
                            </div>
                            <div className="flex justify-between">
                                <Button onClick={handlePreviousStep}
                                        className="bg-red-500 text-white">Previous</Button>
                                <Button onClick={handleNextStep}
                                        className="bg-green-500 text-white">Next</Button>
                            </div>
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <div className="mb-4">
                                <Label htmlFor="price"
                                       className="block text-sm font-medium text-gray-700">Price</Label>
                                <TextInput id="price"
                                           type="number"  {...form.register('price', {valueAsNumber: true})}
                                           required/>
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="rentPerHour"
                                       className="block text-sm font-medium text-gray-700">Rent
                                    per Hour</Label>
                                <TextInput id="rentPerHour"
                                           type="number"  {...form.register('rent', {valueAsNumber: true})}
                                           required/>
                            </div>
                            <div className="flex justify-between">
                                <Button onClick={handlePreviousStep}
                                        className="bg-red-500 text-white">Previous</Button>
                                <Button type="submit"
                                        className="bg-green-500 text-white">Save</Button>
                            </div>
                        </>
                    )}
                </form>
            </Modal>
        </>
    );
};

export default AddProductForm;
