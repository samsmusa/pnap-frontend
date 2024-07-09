import React from "react";
import {Button, Modal, Datepicker, Kbd} from "flowbite-react";
import ConfirmBuy from "./ConfirmBuy";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_RENT_ITEM, PRODUCT} from "../queires/product";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {Category, Product} from "../interfaces/interface.ts";


const Buy = () => {
    const {productId} = useParams()
    const {user} = useAuth()
    const {data} = useQuery(PRODUCT(productId as string));
    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
    const [isRentModalOpen, setIsRentModalOpen] = React.useState(false); // State for RentModal


    const handleConfirmClose = () => {
        setIsConfirmModalOpen(false);
    };


    const handleRentClose = () => {
        setIsRentModalOpen(false);
    };
    return (
        <div className="max-w-md mx-auto bg-white md:max-w-2xl my-4">
            <div className="md:flex border border-black">
                <div className="w-full p-4">
                    <h2 className="text-gray-900 font-bold text-2xl mb-2">{data?.product?.name}</h2>
                    <p className="text-gray-700 font-semibold text-sm mb-1">{data?.product?.categories?.map((cat:Category) =>
                        <Kbd key={cat.id} className="mr-0.5">{cat?.name}</Kbd>)}</p>
                    <p className="text-gray-700 text-lg mb-2">Price: ${data?.product?.price}</p>
                    <p className="text-gray-700 text-lg mb-2">
                        Rent per hour: ${data?.product?.rent}
                    </p>
                    <p className="text-gray-600 text-base mb-4">{data?.product?.description}</p>
                    <p className="text-gray-600 text-base mb-4">{data?.product?.published}</p>
                    <div className="mt-4 flex justify-between gap-5">
                        <div>
                            {!user &&
                                <Link to={"/login"} className="text-red-600">you can't buy without
                                    login</Link>}
                        </div>
                        <div className="flex gap-x-4">
                            <Button disabled={!user} onClick={() => setIsConfirmModalOpen(true)}
                                    className=" bg-blue-500 text-white rounded-full">
                                Buy
                            </Button>
                            <Button disabled={!user} onClick={() => setIsRentModalOpen(true)}
                                    className=" bg-blue-500 text-white rounded-full">
                                Rent
                            </Button>
                        </div>
                    </div>


                    <ConfirmBuy
                        product={data?.product}
                        isOpen={isConfirmModalOpen}
                        onClose={handleConfirmClose}
                    />


                    <RentModal
                        product={data?.product}
                        isOpen={isRentModalOpen}
                        onClose={handleRentClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default Buy;


const RentModal = ({isOpen, onClose, handleConfirm, product}: {
    isOpen: boolean;
    onClose: ()=>void;
    handleConfirm?: ()=>void;
    product:Product;
}) => {
    const [CreateRentItem, {error}] = useMutation(CREATE_RENT_ITEM);
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState<Date | null>()
    const handleStartDate = (e:Date)=>{
        setStartDate(e)
        setEndDate(null)
    }
    const handleEndDate = (e:Date)=>{
        setEndDate(e)
    }
    const handleSubmit = ()=>{
        CreateRentItem({variables:{
            productId: Number(product.id), quantity: 2, startDate: startDate, endDate: endDate
            }}).then(()=> {
            onClose()
            handleConfirm && handleConfirm()
        })
    }
    return (
        <Modal show={isOpen} size="2xl" onClose={onClose} >
            <Modal.Header>
                <h3 className="text-lg font-semibold">Rent Details</h3>
                {error && <h3 className="text-lg font-semibold text-red-500">{error?.message}</h3>}
            </Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-2 gap-4">
                    <div className=""><p>From</p><Datepicker value={startDate?.toLocaleDateString()} onSelectedDateChanged={handleStartDate} minDate={new Date()}/></div>
                    <div className=""><p>To</p><Datepicker value={endDate?.toLocaleDateString() || ""} onSelectedDateChanged={handleEndDate} minDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}/></div>
                </div>
                <div className="mt-4 flex justify-end gap-5">
                    <Button onClick={onClose} className=" bg-red-500 text-white rounded-full">
                        Return
                    </Button>
                    <Button onClick={handleSubmit}
                            className=" bg-blue-500 text-white rounded-full">
                        Confirm
                    </Button>
                </div>

            </Modal.Body>
        </Modal>
    )
};
