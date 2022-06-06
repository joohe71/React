import React, { useState } from "react";

export default function UsernameForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successed, setSuccessed] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setValue(input);
    if (!input) setError("유저명을 필수로 입력해주세요.");
    else if (input.length > 20) setError("20자 이하의 문자열을 입력해주세요.");
    else setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(error);
    if (!value) setError("유저명을 필수로 입력해주세요.");
    else if (value.length > 20) setError("20자 이하의 문자열을 입력해주세요.");
    else {
      setError("");
      setSuccessed(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="유저명을 입력하세요"
          value={value}
          onChange={handleChange}
        />

        <button type="submit">제출</button>
        {submitted && <div data-testid="error-box">{error}</div>}
      </form>

      {successed && (
        <div data-testid="success-box">유저명 생성에 성공했습니다.</div>
      )}
    </div>
  );
}
