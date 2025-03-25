import { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import styled from "styled-components";

// https://raw.githubusercontent.com/CiurescuP/LogIn-Form/main/bg.jpg <- có thể xem xét bg này 
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(https://img.freepik.com/premium-vector/isometric-online-shopping-elements-background_90099-52.jpg?w=2000);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
    z-index: 1;
  }
`;

const Form = styled.form`
  width: 450px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 
    0 0 40px rgba(129, 236, 174, 0.3),
    0 15px 50px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  transform: perspective(1000px);
  
  &:hover {
    transform: perspective(1000px) translateZ(20px);
    box-shadow: 
      0 0 50px rgba(129, 236, 174, 0.4),
      0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 300;
  color: white;
  margin-bottom: 30px;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Label = styled.label`
  display: block;
  margin-top: 25px;
  font-size: 16px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  text-align: left;
  padding-left: 5px;
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-top: 10px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(129, 236, 174, 0.6);
    box-shadow: 0 0 15px rgba(129, 236, 174, 0.3);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 12px;
  font-size: 18px;
  font-weight: 500;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
  transform: perspective(500px);

  &:hover {
    transform: perspective(500px) scale(1.02) rotateX(5deg);
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SocialText = styled.p`
  font-size: 16px;
  margin-top: 25px;
  color: rgba(255, 255, 255, 0.7);
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 20px;
`;

const SocialButton = styled.button`
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
  transform: perspective(500px);

  &:hover {
    transform: perspective(500px) scale(1.1) rotateY(10deg);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Registering:", username, password);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    console.log(`Logging in with ${platform}`);
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
          disabled={isProcessing}
        />

        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isProcessing}
        />

        <Button 
          type="submit" 
          disabled={isProcessing}
        >
          {isProcessing ? 'Đang đăng ký...' : 'Register'}
        </Button>

        <SocialText>Register with a social media account</SocialText>

        <SocialIcons>
          <SocialButton 
            type="button" 
            onClick={() => handleSocialLogin('Google')}
          >
            <FaGoogle />
          </SocialButton>
          <SocialButton 
            type="button" 
            onClick={() => handleSocialLogin('Facebook')}
          >
            <FaFacebook />
          </SocialButton>
        </SocialIcons>
      </Form>
    </RegisterContainer>
  );
};

export default Register;