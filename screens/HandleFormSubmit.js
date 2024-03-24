// HandleFormSubmit.js

export const handleSignUp = async ({ email, password, fName, lName }) => {
    try {
      const userData = {
        email: email,
        password: password,
        given_name: fName,
        family_name: lName,
      };
  
      // Here you would replace this with a call to your backend's sign-up endpoint
      console.log("Preparing to submit user data:", userData);
      // Simulate an API call
      const response = await fetch('YOUR_SIGN_UP_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const signUpResponse = await response.json();
      console.log("Sign up successful with userId:", signUpResponse.userId);
  
      return signUpResponse;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };
  