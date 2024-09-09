import React from 'react';
import { useForm } from 'react-hook-form';

const TaskForm = ({ onSubmit, defaultValues = {}, isEdit = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Название</label>
        <input
          {...register('title', { required: 'Название обязательно' })}
          placeholder="Введите название"
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label>Описание</label>
        <input
          {...register('description', { minLength: { value: 10, message: 'Минимум 10 символов' } })}
          placeholder="Введите описание (опционально)"
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <button type="submit">{isEdit ? 'Сохранить изменения' : 'Добавить задачу'}</button>
    </form>
  );
};

export default TaskForm;
