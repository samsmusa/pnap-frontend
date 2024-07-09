import {Button, Modal} from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import {Product} from "../interfaces/interface.ts";
import {useMutation} from "@apollo/client";
import {CREATE_ORDER} from "../queires/product.ts";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    quantity?: number;
}

const ConfirmBuy = ({isOpen, onClose, product, quantity = 2}: IProps) => {
    const [CreateOrder, {error}] = useMutation(CREATE_ORDER);
    const handleConfirm = () => {
        CreateOrder({
            variables: {
                productId: Number(product.id),
                quantity: quantity
            }
        }).then(onClose);
    }
    return (
        <Modal show={isOpen} size="md" onClose={onClose} popup>
            <Modal.Header/>
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle
                        className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                    <h3 className="mb-5 text-lg font-normal text-red-500 ">
                        {error?.message}
                    </h3>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to Buy this product?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="success" onClick={handleConfirm}>
                            Yes, I'm sure
                        </Button>
                        <Button color="gray" onClick={onClose}>
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmBuy;
