import React from 'react';
import { useEffect, useState } from 'react';
import RegisterModalForm from './RegisterModalForm';

const RegisterModal = ({ open, close, signInOpen }) => {
  return <RegisterModalForm regOpen={open} regClose={close} signInOpen={signInOpen} />;
};
export default RegisterModal;
