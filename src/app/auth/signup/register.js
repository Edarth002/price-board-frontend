import axios from "axios";

const RegisterUser = async (formData) => {
  const apiurl = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
  try {
    const response = await axios.post(`${apiurl}`, formData);

    return response.data;
  } catch (err) {
    console.error(
      "Error registering user: ",
      err.response?.data || err.message
    );
    alert(
      `Error registering user: ${err.response?.data?.message || err.message}`
    );
    throw err;
  }
};

export default RegisterUser;
