'use client';

import css from './RentalForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useFormik } from 'formik';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';

import { bookCar } from '@/lib/api/apiFunc';
import Modal from '../Modal/Modal';

interface RentalFormProps {
  carId: string;
}

export default function RentalForm({ carId }: RentalFormProps) {
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDateInvalid, setIsDateInvalid] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [nameError, setNameError] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isCommentInvalid, setIsCommentInvalid] = useState(false);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    formik.handleChange(event);
    const value = event.target.value;
    if (value === '') {
      setNameError('This field is required');
      setIsNameInvalid(true);
    } else if (value.length < 3) {
      setNameError('Must be at least 3 characters.');
      setIsNameInvalid(true);
    } else if (value.length > 30) {
      setNameError('Maximum 30 characters.');
      setIsNameInvalid(true);
    } else {
      setIsNameInvalid(false);
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    formik.handleChange(event);
    const value = event.target.value;
    if (!value.includes('@')) {
      setEmailError('This should be a valid email.');
      setIsEmailInvalid(true);
    } else if (value.length > 30) {
      setEmailError('Maximum 30 characters.');
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }
  }

  function handleDateChange(date: Date | null) {
  setSelectedDate(date);

  if (!date) {
    setIsDateInvalid(false);
    return;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  setIsDateInvalid(selected < tomorrow);

  formik.setFieldValue('date', date);
}

  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    formik.handleChange(event);
    setIsCommentInvalid(event.target.value.length > 500);
  }

  const formik = useFormik({
    initialValues: { name: '', email: '', date: null, comment: '' },
    onSubmit: async values => {
      setHasSubmitError(false);
      const hasNameError = values.name.length < 3 || values.name.length > 30;
      const hasEmailError = !values.email.includes('@') || values.email.length > 30;
      const hasCommentError = values.comment.length > 500;

      if (hasNameError || hasEmailError || hasCommentError) return;

      try {
        const res = await bookCar(
          { name: values.name, email: values.email, comment: values.comment },
          carId
        );
        setModalMessage(res.message);
        setHasSubmitError(false);
        setIsModalOpen(true);
        const form = document.querySelector('.rentalForm') as HTMLFormElement;
        form?.reset();
        setSelectedDate(null);
      } catch {
        setHasSubmitError(true);
        setModalMessage('We apologize. There was an error sending your request.');
        setIsModalOpen(true);
      }
    },
  });

  return (
    <div className={css.formBox}>
      <p className={css.formTitle}>Book your car now</p>
      <p className={css.formSubtitle}>Stay connected! We are always ready to help you.</p>
      <form
        className={clsx('rentalForm', css.form)}
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className={css.inputBox}>
          <input
            className={clsx(css.input, isNameInvalid && css.inputInvalid)}
            name="name"
            type="text"
            placeholder="Name*"
            required
            onChange={handleNameChange}
          />
          {isNameInvalid && (
            <span className={css.errorMessage}>{nameError}</span>
          )}
        </div>

        <div className={css.inputBox}>
          <input
            className={clsx(css.input, isEmailInvalid && css.inputInvalid)}
            name="email"
            type="text"
            placeholder="Email*"
            required
            onChange={handleEmailChange}
          />
          {isEmailInvalid && (
            <span className={css.errorMessage}>{emailError}</span>
          )}
        </div>

        <div className={css.inputBox}>
          <DatePicker
            placeholderText="Booking date"
            selected={selectedDate}
            onChange={handleDateChange}
            wrapperClassName={css.input}
            className={clsx(css.input, isDateInvalid && css.inputInvalid)}
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
          />
          {isDateInvalid && (
            <span className={css.errorMessage}>
              The date must be no earlier than tomorrow.
            </span>
          )}
        </div>

        <div className={css.inputBox}>
          <textarea
            className={clsx(css.input, css.comment, isCommentInvalid && css.inputInvalid)}
            name="comment"
            placeholder="Comment"
            onChange={handleCommentChange}
          />
          {isCommentInvalid && (
            <span className={css.errorMessage}>Maximum 500 characters.</span>
          )}
        </div>

        <button className={css.submitBtn} type="submit">
          Send
        </button>
      </form>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className={hasSubmitError ? css.modalError : css.modalSuccess}>
            {modalMessage}
          </p>
        </Modal>
      )}
    </div>
  );
}
