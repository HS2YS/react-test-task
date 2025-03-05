import React, { useState, useEffect } from 'react';
import { Seminar } from '../../types/seminar';
import Button from './Button';
import FormGroup from './form/FormGroup';

interface EditModalProps {
    seminar: Seminar;
    isOpen: boolean;
    onClose: () => void;
    onSave: (seminar: Seminar) => void;
}

const EditModal: React.FC<EditModalProps> = ({ seminar, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<Seminar>({...seminar});

    useEffect(() => {
        setFormData({...seminar});
    }, [seminar]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay flex">
            <div className="modal-content flex">
                <h2>Редактирование семинара</h2>
                <form onSubmit={handleSubmit}>
                    <FormGroup 
                        label="Название:" 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange}
                        required 
                    />
                    
                    <FormGroup 
                        label="Описание:" 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange}
                        required 
                        as="textarea"
                    />
                    
                    <FormGroup 
                        label="Дата:" 
                        id="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange}
                        required 
                    />
                    
                    <FormGroup 
                        label="Время:" 
                        id="time" 
                        name="time" 
                        value={formData.time} 
                        onChange={handleChange}
                        required 
                    />
                    
                    <FormGroup 
                        label="URL фото:" 
                        id="photo" 
                        name="photo" 
                        value={formData.photo} 
                        onChange={handleChange}
                        required 
                    />

                    <div className="modal-actions">
                        <Button text="Сохранить" onClick={() => onSave(formData)} />
                        <Button text="Отмена" onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;