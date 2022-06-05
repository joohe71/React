import React, { useState } from "react";

function SimpleToggle() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow((prev) => !prev);
  return (
    <div>
      {!show && <div>유저 정보를 보려면 버튼을 누르세요.</div>}
      {show && (
        <ul>
          <li>Email - test@test.com</li>
          <li>Address - 서울시 강남구</li>
        </ul>
      )}
      <button onClick={handleClick}>
        {!show ? "유저정보 보기" : "유저정보 가리기"}
      </button>
    </div>
  );
}

export default SimpleToggle;
