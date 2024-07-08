import React from "react";
import {Button, Modal, Datepicker, Kbd} from "flowbite-react";
import ConfirmBuy from "./ConfirmBuy";
import {useQuery} from "@apollo/client";
import {PRODUCT} from "../queires/product";


const Buy = () => {

    const {loading, error, data} = useQuery(PRODUCT(1));
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
                    <p className="text-gray-700 font-semibold text-sm mb-1">{data?.product?.categories?.map((cat) =>
                        <Kbd className="mr-0.5">{cat?.name}</Kbd>)}</p>
                    <p className="text-gray-700 text-lg mb-2">Price: ${data?.product?.price}</p>
                    <p className="text-gray-700 text-lg mb-2">
                        Rent per hour: ${data?.product?.rent}
                    </p>
                    <p className="text-gray-600 text-base mb-4">{data?.product?.description}</p>
                    <div className="mt-4 flex justify-end gap-5">
                        <Button onClick={() => setIsConfirmModalOpen(true)}
                                className=" bg-blue-500 text-white rounded-full">
                            Buy
                        </Button>
                        <Button onClick={() => setIsRentModalOpen(true)}
                                className=" bg-blue-500 text-white rounded-full">
                            Rent
                        </Button>
                    </div>


                    <ConfirmBuy
                        isOpen={isConfirmModalOpen}
                        onClose={handleConfirmClose}
                    />


                    <RentModal
                        isOpen={isRentModalOpen}
                        onClose={handleRentClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default Buy;


const RentModal = ({isOpen, onClose, handleConfirm}: {
    isOpen: any,
    onClose: any,
    handleConfirm?: any
}) => (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
        <Modal.Header>
            <h3 className="text-lg font-semibold">Rent Details</h3>
        </Modal.Header>
        <Modal.Body>
            <div className="grid grid-cols-2 gap-4">
                <div className=""><p>From</p><Datepicker/></div>
                <div className=""><p>To</p><Datepicker/></div>
            </div>
            <div className="mt-4 flex justify-end gap-5">
                <Button onClick={onClose} className=" bg-red-500 text-white rounded-full">
                    Return
                </Button>
                <Button onClick={handleConfirm} className=" bg-blue-500 text-white rounded-full">
                    Confirm
                </Button>
            </div>

        </Modal.Body>
    </Modal>
);
