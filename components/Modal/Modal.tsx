'use client';

import css from './Modal.module.css';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {
  function handleBackdropClick(ev: React.MouseEvent) {
    if (ev.target !== ev.currentTarget) return;
    onClose();
  }

  useEffect(() => {
    function handleKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
        <button className={css.closeBtn} type="button" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
