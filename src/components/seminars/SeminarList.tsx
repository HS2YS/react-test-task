import React, { useEffect, useState } from 'react';
import SeminarCard from './SeminarCard';
import { Seminar } from '../../types/seminar';
import axios from 'axios';
import EditModal from '../ui/EditModal';
import DeleteModal from '../ui/DeleteModal';

const SeminarList: React.FC = () => {
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
    
    // Отображение загрузки данных
    const Loading = () => {
        const [dots, setDots] = useState<number>(0)

        useEffect(() => {
            const interval = setInterval(() => {
                setDots((prevDots) => prevDots >= 3 ? 0 : prevDots+1);
            }, 350);
            return () => clearInterval(interval);
        }, []);

        return (
                <p className='loading'>Загрузка данных{'.'.repeat(dots)}</p>
        )
    };
    // Получение данных
    useEffect(() => {
        const fetchSeminars = async () => {
            try {
                const response = await axios.get('http://localhost:3001/seminars')
                setSeminars(response.data);
                setLoading(false);
            } catch (err) {
                setError('Данные не загружены')
                setLoading(false);
                console.error("Ошибка загрузки данных: ", err);
            }
        };
        
        fetchSeminars();
    }, []);
    // Открытие форм
    // Редактирование семинара
    const handleEdit = (seminar: Seminar) => {
        setSelectedSeminar(seminar);
        setEditModalOpen(true)
    }
    // Ужаление семинара
    const handleDelete = (seminar: Seminar) => {
        setSelectedSeminar(seminar);
        setDeleteModalOpen(true)
    }
    // Сохранение семинара
    const handleSave = async (updatedSeminar: Seminar) => {
        try {
            await axios.put(`http://localhost:3001/seminars/${updatedSeminar.id}`, updatedSeminar);
            setSeminars(seminars.map(sem => sem.id === updatedSeminar.id ? updatedSeminar : sem))
            setEditModalOpen(false)
        } catch (err) {
            console.error('Ошибка при сохранении', err)
            alert('Ошибка при сохранении');
        }
    }
    // Удаление семинара
    const handleConfirmDelete = async () => {
        if (selectedSeminar) {
            try {
                await axios.delete(`http://localhost:3001/seminars/${selectedSeminar.id}`);
                setSeminars(seminars.filter(sem => sem.id !== selectedSeminar.id))
                setDeleteModalOpen(false)
        } catch (err) {
            console.error('Ошибка при удалении', err)
            alert('Ошибка при удалении');
        }
        }
    }

    
    // Отображение данных в случаях: загрузки/ошибки загрузки/успешной загрузки данных
    return (
        <section>
            <div className='container'>
                <div className="seminar-list">
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <h2 className="error">{error}</h2>
                    ) : (
                        seminars.map(seminar => (
                            <SeminarCard 
                                key={seminar.id} 
                                seminar={seminar}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                                
                        ))
                    )}
                </div>  
            </div>

            {/* Модальное окно редактирования */}
            {editModalOpen && selectedSeminar && (
                <EditModal 
                    seminar={selectedSeminar}
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSave}
                />
            )}
            {/* Окно подтверждения удаления */}
            {deleteModalOpen && selectedSeminar && (
                <DeleteModal 
                    seminar={selectedSeminar}
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </section>
        
    );
}

export default SeminarList;
