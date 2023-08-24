import React from 'react';
import { useEffect, useState } from 'react';
import RegisterModalForm from './RegisterModalForm'; 

const RegisterModal=(props)=>{
    const {open,close}=props;
    const [isRegModalOpen,setIsRegModalOpen] = useState(open);

    useEffect(()=>{
        setIsRegModalOpen(isRegModalOpen) 
    },[isRegModalOpen])

    return(    
      <RegisterModalForm regOpen={isRegModalOpen} regClose={setIsRegModalOpen} />    
    )
}
export default RegisterModal