import { useEffect, useState } from 'react';
import SignInModalForm from './SignInModalForm'; // Pastikan Anda mengimpor komponen SignInModalForm yang sesuai

const SignInModal = ({ open, close, regOpen }) => {
  return <SignInModalForm signInOpen={open} signInClose={close} regOpen={regOpen} />;
};

export default SignInModal;
