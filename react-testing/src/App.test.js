import { screen, render } from "@testing-library/react";
import SimpleToggle from "./App";

describe("앱을 렌더링합니다.", () => {
  test("버튼이 있습니다.", () => {
    render(<SimpleToggle />);
    // "유저정보 보기" 버튼을 찾습니다.
    // screen.getByRole을 이용합니다.
    // 버튼이 존재하는지 체크합니다.
    // toBeInTheDocument matcher를 이용합니다.

    const button = screen.getByRole("button", { name: "유저정보 보기" });
    expect(button).toBeInTheDocument();
  });

  test("버튼을 누르지 않았을 시, 유저 정보 안내문이 보입니다.", () => {
    render(<SimpleToggle />);
    // 텍스트를 찾습니다.
    // 텍스트 - "유저 정보를 보려면 버튼을 누르세요."
    // screen.getByText를 이용합니다.
    // 텍스트가 존재하는지 체크합니다.
  });
});

describe("토글 기능을 테스트합니다.", () => {
  test("버튼을 눌렀을 시, 유저 정보가 보입니다.", () => {
    render(<SimpleToggle />);

    // 텍스트를 찾습니다.
    // 텍스트 - "유저 정보를 보려면 버튼을 누르세요."
    // 텍스트가 존재하는지 체크합니다.

    // Toggle 버튼을 찾습니다.
    // 버튼을 클릭합니다.
    // 위에서 찾은 텍스트가 보이지 않는지 체크합니다.
    // screen.queryByText를 이용합니다.

    // 이메일 정보를 찾습니다.
    // 이메일 정보 - "Email - elice@elicer.com"
    // screen.getByText를 이용합니다.
    // 이메일 정보가 문서에 존재하는지 체크합니다.

    // 주소 정보를 찾습니다.
    // 주소 정보 - "Address - 서울시 강남구 테헤란로 401"
    // screen.getByText를 이용합니다.
    // 주소 정보가 문서에 존재하는지 체크합니다.

    // 버튼의 텍스트가 "유저정보 가리기" 로 바뀌는지 체크합니다.
    // toHaveTextContent matcher를 이용합니다.
  });

  test("버튼을 두번 누르면, 유저 정보가 보이지 않습니다.", () => {
    render(<SimpleToggle />);

    // 버튼을 찾습니다.
    // 버튼을 클릭합니다.
    // userEvent.click을 이용합니다.
    // 이메일 정보가 문서에 있는지 체크합니다.

    // Toggle 버튼을 클릭합니다.
    // 이메일 정보가 문서에서 사라졌는지 체크합니다.
    // screen.queryByText를 이용합니다.
  });
});
