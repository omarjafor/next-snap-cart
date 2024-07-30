'use client';

import { formControls, initialFormData } from "@/utils";
import { useState } from "react";
import { createNewProduct } from "@/actions";
import toast from "react-hot-toast";
import styles from './styles.module.scss';

const AddNewProduct = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        ...initialFormData, userId: user?.id
    })

    function handleButtonValid() {
        return Object.keys(formData).every(key => formData[key]?.trim() !== '')
    }

    async function addNewProduct() {
        const toastId = toast.loading('Product Adding....')
        await createNewProduct({
            ...formData, userId: user?.id, tags: formData.tags.split(', ')
        }, '/account');
        setFormData({
            ...initialFormData, userId: user?.id
        });
        setShowModal(false);
        toast.success('Product Added Successfully', { id: toastId })
    }

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}
                className={styles['button-add-product']}>
                Add New Product
            </button>
            {showModal ? (
                <>
                    <div className={styles.modal}>
                        <div className={styles['modal-content']}>
                            <div className={styles['modal-header']}>
                                <h3>Add Your New Product</h3>
                            </div>
                            <form action={addNewProduct}>
                                <div className={styles['modal-body']}>
                                    {
                                        formControls.map(item => (
                                            <div className={styles['form-group']} key={item.name}>
                                                <label>{item?.label}</label>
                                                <input
                                                    value={formData[item.name]}
                                                    onChange={(e) => setFormData({
                                                        ...formData, [e.target.name]: e.target.value
                                                    })}
                                                    type={item?.componentType}
                                                    placeholder={item?.placeholder}
                                                    name={item?.name} />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles['modal-footer']}>
                                    <button type="button" onClick={() => {
                                        setShowModal(false)
                                        setFormData({
                                            ...initialFormData, userId: user?.id
                                        });
                                    }}
                                        className={styles['button-close']}>
                                        Close
                                    </button>
                                    <button type="submit" disabled={!handleButtonValid()}
                                        className={styles['button-submit']}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles['modal-backdrop']}></div>
                </>
            ) : null}
        </>
    );
};

export default AddNewProduct;