const RegisterUser = async () => {
  const formData = {
    email: "",
    username: "",
    password: "",
  };
  try {
    const response = await fetch(
      "https://product-price-board.onrender.com/openapi.json/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = response.json();

    return data;
  } catch (err) {
    alert("User could not be created because: ", err);
    console.error("User could not be created because: ", err);
  }
};

export default RegisterUser;
