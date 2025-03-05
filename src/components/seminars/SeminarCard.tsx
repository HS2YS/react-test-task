import React from 'react';
import { Seminar } from '../../types/seminar';
import Button from '../ui/Button';

interface SeminarCardProps {
    seminar: Seminar;
    onEdit: (seminar: Seminar) => void;
    onDelete: (seminar: Seminar) => void;
}

const SeminarCard: React.FC<SeminarCardProps> = ({ seminar, onEdit, onDelete }) => {
    return (
        <div className="seminar-card flex">
            <div className="seminar-content flex">
                <h3>{seminar.title}</h3>
                <p>{seminar.description}</p>
                <div className="seminar-info flex">
                    <span>Дата: {seminar.date}</span>
                    <span>Время: {seminar.time}</span>
                </div>
                <div className="seminar-actions flex">
                    <Button 
                        onClick={() => onEdit(seminar)} 
                        text='Редактировать'
                    />
                    <Button
                        onClick={() => onDelete(seminar)}
                        text='Удалить'
                    />
                </div>
            </div>
            <img src={seminar.photo} alt={seminar.title} />
        </div>
    )
}



export default SeminarCard