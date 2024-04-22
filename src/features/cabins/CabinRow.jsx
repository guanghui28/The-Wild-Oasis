import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { HiDocumentDuplicate, HiTrash, HiPencilAlt } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin = {} }) {
    const { deleteCabin, isDeleting } = useDeleteCabin();
    const { createCabin, isCreating } = useCreateCabin();
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
    } = cabin;

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            description,
            image,
            discount,
        });
    }

    return (
        <Table.Row>
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId}>Toggle</Menus.Toggle>
                        <Menus.List id={cabinId}>
                            <Menus.Button
                                onClick={handleDuplicate}
                                icon={<HiDocumentDuplicate />}
                            >
                                Duplicate
                            </Menus.Button>
                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencilAlt />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name="edit">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>

                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="cabins"
                                onConfirm={() => deleteCabin(cabinId)}
                                disabled={isDeleting}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
