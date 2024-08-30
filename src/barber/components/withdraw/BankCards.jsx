import { Input, Select, SelectItem, Spacer } from '@nextui-org/react';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const BankCards = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

//   bank

  const banks = ["BRI", "BNI", "OCBC", "Mandiri"];

  return (
    <div className='w-full justify-start items-start gap-4'>
        <div className="w-full flex justify-start items-start mb-12">
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
        </div>

        <div className="px-4">
        <Input
          type="number"
          name="number"
          placeholder="Card Number"
          label="Card Number"
          labelPlacement='outside'
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />

        <Spacer y={4} />

        <div className="flex justify-between gap-4 pb-4">
            <Input
            type="text"
            name="name"
            placeholder="Account Name"
            label="Account Name"
            labelPlacement='outside'
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />

            <Select
                label="Bank Name"
                placeholder="Select Bank"
                labelPlacement='outside'
                // disabledKeys={}
                className="max-w-xs"
                >
                
                {banks.map((bank, index) => (
                    <SelectItem key={index}>
                    {bank}
                    </SelectItem>
                ))}
                </Select>
        </div>

    </div>



    </div>
  );
}

export default BankCards;