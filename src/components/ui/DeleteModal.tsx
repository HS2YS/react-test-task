import React from 'react';
import { Seminar } from '../../types/seminar';
import Button from './Button';

interface DeleteModalProps {
    seminar: Seminar;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ seminar, isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay flex">
            <div className="modal-content flex">
                <h2>Подтвердите удаление</h2>
                <p>Вы уверены, что хотите удалить семинар «{seminar.title}»?</p>
                <div className="modal-actions">
                    <Button text="Удалить" onClick={onConfirm} />
                    <Button text="Отмена" onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;