import RegisterModalForm from './RegisterModalForm';
import {render,fireEvent,screen, waitFor} from '@testing-library/react';  
import userEvent from '@testing-library/user-event';

describe('Integration register form test',()=>{ 
    jest.setTimeout(10000);   
    test('Calling the onSubmit Function',async()=>{ 
        // const mockOnSubmit = jest.fn()
        const regOpen = true;
        const regClose = jest.fn;
        render(<RegisterModalForm regOpen={regOpen} regClose={regClose}/>);

        const userNameInput = screen.getByPlaceholderText('Username');
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput = screen.getByPlaceholderText("Type your password again");
        const genderInput = screen.getByLabelText("Male");
        const birthdateInput = screen.getByTestId("birthdate");
        const clientPositionIdInput = screen.getByPlaceholderText("Client Position Id");
        const agencyNameInput = screen.getByPlaceholderText("Agency Name");
        const agencyAddressInput = screen.getByPlaceholderText("Agency Address");
        const targetDate = new Date('2001-09-11');
        const targetDateStr = targetDate.toISOString().slice(0,10);
        const registerBtn = screen.getByTestId("register"); 
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.change(userNameInput,{target:{value:"sasa1234"}})            
        fireEvent.change(firstNameInput,{target:{value:"sasa"}})
        fireEvent.change(lastNameInput,{target:{value:"manusa"}})
        fireEvent.change(emailInput,{target:{value:"sasa@gmail.com"}})
        fireEvent.change(passwordInput,{target:{value:"sasa1234"}})
        fireEvent.change(confirmPasswordInput,{target:{value:"sasa1234"}})
        fireEvent.click(genderInput,{target:{value:"L"}})
        fireEvent.click(birthdateInput) 
        userEvent.type(birthdateInput,targetDateStr)
        fireEvent.change(clientPositionIdInput,{target:{value:"1"}})
        fireEvent.change(agencyNameInput,{target:{value:"PT Padepokan 79"}})
        fireEvent.change(agencyAddressInput,{target:{value:"Bandung"}}) 
        fireEvent.submit(registerBtn)
       
        expect(firstNameInput.value).not.toBe('');
        expect(lastNameInput.value).not.toBe('');
        expect(emailInput.value).not.toBe('');
        expect(passwordInput.value).not.toBe('');
        expect(confirmPasswordInput.value).not.toBe('');
    });
  

});
