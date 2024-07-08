import {useState} from "react";
import {Card, Button, Modal, Kbd} from "flowbite-react";
import EditProductForm from "../components/EditProductForm";
import {Product, UserOwnProductsData} from "../interfaces/interface.ts";
import {useMutation} from "@apollo/client";
import {DELETE_PRODUCT, USER_OWN_PRODUCTS} from "../queires/product.ts";


const UserOwnProductCard = ({product, refetch}: { product: Product, refetch: () => void }) => {
    const [DeleteProduct] = useMutation<{ deleteProduct: { id: number } }, {
        id: number
    }>(DELETE_PRODUCT, {
        update: (cache, {data}) => {
            if (!data) return;

            const existingProducts = cache.readQuery<UserOwnProductsData>({query: USER_OWN_PRODUCTS});

            if (existingProducts) {
                const updatedProducts = existingProducts.userProducts.filter(p => p.id !== data.deleteProduct.id);

                cache.writeQuery<UserOwnProductsData>({
                    query: USER_OWN_PRODUCTS,
                    data: {userProducts: updatedProducts},
                });
            }
        },
        onCompleted: () => {
            refetch();
        },
    });

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
        null
    );
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDeleteClick = (productId: number) => {
        setProductIdToDelete(productId);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (productIdToDelete !== null) {
            // onDelete(productIdToDelete);
            DeleteProduct({
                variables: {
                    id: product.id
                }
            })
            setShowConfirmation(false);
            setProductIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setProductIdToDelete(null);
    };

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        refetch()
        setShowEditModal(false);
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
    };

    return (
        <div className="my-1.5">
            <div className="grid grid-cols-1 gap-6">
                <Card
                    key={product?.id}
                    className="relative p-4 bg-white shadow-md rounded-lg"
                >
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{product?.title}</h3>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleEditClick()}
                                className="bg-blue-500 text-white"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => handleDeleteClick(product?.id)}
                                className="bg-red-500 text-white"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                    <p className="text-gray-700">Category: {product?.categories?.map((cat) => <Kbd
                        className="ml-1">{cat?.name}</Kbd>)}</p>
                    <p className="text-gray-700">Price: {product?.price}</p>
                    <p className="text-gray-700">Description: {product?.description}</p>
                </Card>
            </div>

            {/* Confirmation Modal */}
            <Modal show={showConfirmation} onClose={handleCancelDelete}>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                    <p className="text-gray-700 mb-4">
                        Are you sure you want to delete this product?
                    </p>
                    <div className="flex justify-end">
                        <Button
                            onClick={handleCancelDelete}
                            className="mr-2 bg-green-400 text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="red"
                            className="bg-red-500 text-white"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Edit Modal */}

            <Modal show={showEditModal} onClose={handleCancelEdit}>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                    <EditProductForm
                        product={product}
                        onSave={handleSaveEdit}
                        onCancel={handleCancelEdit}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default UserOwnProductCard;
