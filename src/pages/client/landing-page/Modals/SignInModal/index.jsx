import { useEffect, useState } from 'react';
import SignInModalForm from './SignInModalForm'; // Pastikan Anda mengimpor komponen SignInModalForm yang sesuai

const SignInModal = (props) => {
  const { open, close } = props;
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(open);

  useEffect(() => {
    setIsSignInModalOpen(isSignInModalOpen);
  }, [isSignInModalOpen]);

  return <SignInModalForm signInOpen={isSignInModalOpen} signInClose={setIsSignInModalOpen} />;
};

export default SignInModal;
