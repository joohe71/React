import React, { useState } from "react";
// 필요한 모듈을 추가로 import하세요.
import {
  Routes,
  BrowserRouter,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

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
    <div>
      <h2>Home Page</h2>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
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
    <div>
      <h2>Login Page</h2>
      <LoginForm onSubmit={handleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">Back to home</Link>
          </li>

          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
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
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">Back to home</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>

      <div>{error}</div>
    </div>
  );
}

// DetailPage 페이지 컴포넌트를 구현하세요.
function UserDetailPage() {
  // email, password 정보를
  // query param 으로 받아와 저장하고, 정보를 보여주세요.

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get("email");
  const password = searchParams.get("password");

  return (
    <div>
      <h2>User Detail Page</h2>
      <p>
        <h3>User details</h3>
        <em>{email}</em>
        <br />
        <strong>{password}</strong>
      </p>
      <Link to="/login">Logout</Link>
    </div>
  );
}
