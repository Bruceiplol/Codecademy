import React, { useState } from "react";

function FoodOrderForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [order, setOrder] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    alert(`Order Successful!\n\nYour order was ${order}.\n\nPlease show your confirmation number for pickup.`)
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" }>Name:</label>
      <input 
        id="name" 
        name="name" 
        value={name} 
        type="text" 
        onChange = {(e) =>  setName(e.target.value)}
      />
      <label htmlFor="phone">Phone:</label>
      <input 
        id="phone" 
        name="phone" 
        value={phone} 
        type="text" 
        onChange = {(e) => setPhone(e.target.value)}
      />
      <label htmlFor="address">Address:</label>
      <input 
        id="address"  
        name="address" 
        value={address} 
        type="text" 
        onChange = {(e) => setAddress(e.target.value)}
      />
      <label htmlFor="order">Order:</label>
      <input 
        id="order"  
        name="order" 
        value={order} 
        type="text" 
        onChange = {(e) => setOrder(e.target.value)}
      />
      <button type="submit">Submit Order </button>
    </form>
  )
}

export default FoodOrderForm;
