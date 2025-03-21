'use client'
import React from 'react'

const Product = () => {
  const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')

  const onInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }
    const onAgeChange = (e) => {
    e.preventDefault()
    setAge(e.target.value)
  }
    const onPhoneNumber = (e) => {
    e.preventDefault()
    setPhoneNumber(e.target.value)
  }

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      age,
      phoneNumber
    };

    try {

      const rawResponse = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parsedResponse = await rawResponse.json();
    } catch (e) {
      console.log(e);
    }
    setName("");
  };

  return (
<form
onSubmit={onSubmit}>
  <input
  onChange={onInputChange}
  id='name'
  value={name}
  name='name'
  type='text'
  className="border border-red-500"
  >
  </input>
   <input
  onChange={onAgeChange}
  id='age'
  value={age}
  name='age'
  type='text'
  className="border border-red-500"
  >
  </input>
   <input
  onChange={onPhoneNumber}
  id='phoneNumber'
  value={phoneNumber}
  name='phoneNumber'
  type='text'
  className="border border-red-500"
  >
  </input>
  <button type="submit">submit</button>
</form>  )
}

export default Product 