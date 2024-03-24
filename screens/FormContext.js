// FormContext.js
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  
  const handleFormSubmit = async () => {
    console.log('Submitting form with data:', formData);
    // Placeholder for form submission logic
    // This could be an API call to your backend
    try {
      // Simulate an API call
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("Form submission successful", result);
      // Handle success, e.g., navigate or show a success message
    } catch (error) {
      console.error("Error during form submission:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, handleFormSubmit }}>
      {children}
    </FormContext.Provider>
  );
};
