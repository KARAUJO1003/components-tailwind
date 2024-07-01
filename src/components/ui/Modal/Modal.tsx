'use client'

import React, { HTMLAttributes, createContext, useContext, useState } from 'react';
import { ModalContext, useModal } from './modal-context';


export const Modal: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
      <div >{children}</div>
    </ModalContext.Provider>
  );
};

export const ModalContainer : React.FC<HTMLAttributes<HTMLDivElement>> = ({ children })  => {
    const { isModalOpen, toggleModal } = useModal();
  
    return (
      <div className={`inset-0 fixed flex items-center justify-center transition-colors bg-black/0 ${isModalOpen ? 'visible bg-black/20 backdrop-blur-sm' : 'invisible' }`}>

      <div
        id="static-modal"
        className={`${isModalOpen ? 'flex flex-col  scale-100 opacity-100' : ' scale-125 opacity-0'} transition-all shadow-2xl justify-between top-0 left-0 min-w-80 min-h-72 bg-zinc-200 p-6 rounded-lg border `}
        >
        {children}
        <button onClick={toggleModal} className='bg-red-400 rounded-md px-4 h-8 text-white'>Close</button>
      </div>
        </div>
    );
};

export const ModalTrigger: React.FC<HTMLAttributes<HTMLButtonElement>> = ({...props})  => {
  const { toggleModal } = useModal();

  return (
    <button {...props} className='bg-blue-500 rounded-md px-4 h-8 text-white' onClick={toggleModal}/>
  );
};
