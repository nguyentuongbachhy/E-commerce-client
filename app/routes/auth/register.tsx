import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import styled from "styled-components";

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(https://raw.githubusercontent.com/CiurescuP/LogIn-Form/main/bg.jpg);
  background-size: cover;
  background-position: center;
`;

const Form = styled.form`
  width: 450px;
  background-color: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(5px);
  padding: 20px;
  border-radius: 17px;
  box-shadow: 0 0 40px rgba(129, 236, 174, 0.6);
  text-align: center;
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 600;
  color: white;
`;

const Label = styled.label`
  display: block;
  margin-top: 30px;
  font-size: 25px;
  font-weight: 800;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.22);
  border: 2px solid #38363654;
  border-radius: 5px;
  color: white;
  &:hover {
    background: #434343;
  }
  &:focus {
    background: #434343;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: rgba(0, 0, 0, 0.22);
  border: 2px solid #38363654;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #629677;
  }
  &:focus {
    box-shadow: 0px 0px 4px 2px rgba(103, 110, 103, 0.71);
  }
`;

const SocialText = styled.p`
  font-size: 18px;
  margin-top: 15px;
  color: white;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 10px;
  border-radius: 50%;
  background: transparent;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.5);
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", username, password);
  };

  return (
    <RegisterContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Register Here</Title>

        <Label>Username</Label>
        <Input
          type="text"
          placeholder="Email or Phone"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">Register</Button>

        <SocialText>Register with a social media account</SocialText>

        <SocialIcons>
          <SocialButton>
            <FaFacebook />
          </SocialButton>
          <SocialButton>
            <FaTwitter />
          </SocialButton>
          <SocialButton>
            <FaInstagram />
          </SocialButton>
        </SocialIcons>
      </Form>
    </RegisterContainer>
  );
};

export default Register;
