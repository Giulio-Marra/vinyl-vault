import React from "react";
import RegisterForm from "../features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="authPageContainer">
      <div className="loginImageContainer">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDsEZoyPbOsj4R8ymtzgeAszi61FAE0WQ6dWrhlBQDU4fYAogZrx6_hnsuKCOMi2x8XBYuxuQma6XIk_QipU3A_DZFOTAC_Jgj-w0UOm1V-DZeAb63FzibzW0I-4FH3qxkTByaP9F_AMhdzIQ-F1Z7dxLT0KysGZMMPKpaCxevy3JzPXTVvUYmxm1mFO6rDZerNJP2XVAGCrwCT2YqoZ6qVKQHUIjv4KfwbrATLfkPRVyzoEjrkMmsDB7SsSf0hcX-_GM3X9KndlD9"
          alt=""
          className="imageLogin"
        />
        <div className="containerTextLoginImage">
          <h1>Spin it Again.</h1>
          <p>
            Your collection is waiting. Dive back into the crates and discover
            your next favorite sound.
          </p>
        </div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
