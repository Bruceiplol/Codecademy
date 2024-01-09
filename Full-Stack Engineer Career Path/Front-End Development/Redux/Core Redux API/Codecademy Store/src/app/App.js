import React from 'react';

import { SearchTerm } from '../features/searchTerm/SearchTerm.js';
import { Inventory } from '../features/inventory/Inventory.js';
import { CurrencyFilter } from '../features/currencyFilter/CurrencyFilter.js';
// Import the Cart component here.
import { Cart } from '../features/cart/Cart'
// Render the Cart component below <Inventory />
export const App = (props) => {

  const { state, dispatch } = props;

  return (
    <div>
      <CurrencyFilter
        currencyFilter={state.currencyFilter}
        dispatch={dispatch}
      />
      <SearchTerm
          searchTerm = {state.searchTerm}
          dispatch = {dispatch}
      />
      <Inventory
        inventory={state.inventory}
        currencyFilter={state.currencyFilter}
        dispatch={dispatch}
      />
      <Cart 
        cart = {state.cart}
        currencyFilter = {state.currencyFilter}
        dispatch = {dispatch}
      />
    </div>
  );
};
