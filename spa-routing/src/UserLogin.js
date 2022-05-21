import React, { useState } from "react";
// 필요한 모듈을 추가로 import하세요.
import {
  Routes,
  BrowserRouter,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PageLayout from "./PageLayout";

const users = [];
export default function UserLogin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/detail" element={<UserDetailPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// HomePage 페이지 컴포넌트를 구현하세요.
function HomePage() {
  // Link 컴포넌트를 추가하세요.
  return (
    <PageLayout
      heading="Welcome to Home Page"
      links={[{ to: "/login", text: "Login" }]}
    />
  );
}

// LoginPage 페이지 컴포넌트를 구현하세요.
function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = (formData) => {
    const { email, password } = formData;
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser)
      return navigate(`/detail?email=${email}&password=${password}`);
    else alert("등록된 이메일이 아닙니다. 회원가입해주세요.");
  };
  return (
    <>
      <PageLayout
        heading="Login Page"
        links={[
          { to: "/", text: "Back to home" },
          { to: "/Register", text: "Register" },
        ]}
      />
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = (formData) => {
    const { email } = formData;
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      return setError("이미 등록된 이메일입니다.");
    }

    users.push(formData);
    navigate("/login");
  };

  return (
    <>
      <PageLayout
        heading="Register Page"
        links={[
          { to: "/", text: "Back to home" },
          { to: "/login", text: "Login" },
        ]}
      />

      <RegisterForm onSubmit={handleSubmit} />

      <div>{error}</div>
    </>
  );
}

// DetailPage 페이지 컴포넌트를 구현하세요.
function UserDetailPage() {
  // email, password 정보를
  // query param 으로 받아와 저장하고, 정보를 보여주세요.

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get("email");
  // const password = searchParams.get("password");

  return (
    <>
      <PageLayout
        heading="User Details"
        links={[{ to: "/login", text: "Logout" }]}
      />
      <div>
        <em>{email}</em>
      </div>
    </>
  );
}
