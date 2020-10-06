import React from 'react';
import {render, act} from '@testing-library/react';
import { useToggle } from './hooks';

function setup(...args) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useToggle(...args))
    
    return null;
  }

  render(<TestComponent />)
  
  return returnVal;
}

describe('hooks', () => {
    describe('useToggle', () => {
        it('should create with initial value', () => {
            const data = setup(true);

            expect(data[0]).toBeTruthy();
        });

        it('should change value', () => {
            const data = setup(true);
            
            act(() => {
                data[1]();
            });

            expect(data[0]).toBeFalsy();
        });
    });
});
