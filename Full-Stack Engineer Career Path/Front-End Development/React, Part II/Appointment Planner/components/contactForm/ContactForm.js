import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <lable>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          required
          aria-label="Contact Name"
        />
        <br />
        <input
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          type="tel"
          required
          aria-label="Contact Phone Number"
          pattern="[1-9][0-9]{2}-[1-9][0-9]{2}-[0-9]{4}"
        />
        <br />
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          type="email"
          required
          aria-label="Contact Email"
        />
      </lable>
      <br/>
      <input type="submit" value="Add Contact" aria-label="Add Contact"/>
    </form>
  );
};
