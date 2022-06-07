import { screen, render, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsernameForm from "./UsernameForm";

describe("유저명 폼을 렌더링합니다.", () => {
  test("유저명 폼에는 input이 있습니다.", () => {
    // render(<UsernameForm />);

    // // input을 찾고, placeholder가 제대로 들어있는지 확인합니다.
    // // screen.getByRole을 이용합니다.
    // const input = screen.getByRole("textbox");
    // expect(input).toBeInTheDocument();
    // expect(input).toHaveAttribute("placeholder", "유저명을 입력하세요");

    const { getByRole } = render(<UsernameForm />);

    // input을 찾고, placeholder가 제대로 들어있는지 확인합니다.
    // screen.getByRole을 이용합니다.
    const input = getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "유저명을 입력하세요");
  });

  test("유저명 폼에는 button이 있습니다.", () => {
    render(<UsernameForm />);

    // 제출 버튼이 제대로 렌더링되는지 확인합니다.
    // screen.getByRole을 이용합니다.
    const button = screen.getByRole("button", { name: "제출" });
    expect(button).toBeInTheDocument();
  });
});

describe("유저명 폼을 검증합니다.", () => {
  test("빈 인풋 제출시, 화면에 오류를 보여줍니다.", () => {
    render(<UsernameForm />);

    // 먼저 인풋이 빈 값을 가지는지 확인합니다.
    // toHaveValue matcher를 이용합니다.
    // 버튼을 클릭합니다.
    // userEvent.click을 이용합니다.
    // "유저명을 필수로 입력해주세요." 란 에러 메시지가 보이는지 확인합니다.
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    const button = screen.getByRole("button", {
      name: "제출",
    });
    userEvent.click(button);
    const errorBox = screen.getByText("유저명을 필수로 입력해주세요.");
    expect(errorBox).toBeInTheDocument();
  });

  test("21자 이상의 문자열 입력시, 화면에 오류를 보여줍니다.", () => {
    render(<UsernameForm />);

    // 먼저 인풋이 빈 값을 가지는지 확인합니다.
    // toHaveValue matcher를 이용합니다.
    // 인풋에 21자 이상의 문자를 입력합니다.
    // userEvent.type을 이용합니다.
    // 제출 버튼을 클릭합니다.
    // userEvent.click을 이용합니다.
    // "20자 이하의 문자열을 입력해주세요." 란 에러 메시지가 보이는지 확인합니다.
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    userEvent.type(input, "1234512345123451234512");
    const button = screen.getByRole("button", { name: "제출" });
    userEvent.click(button);
    expect(
      screen.getByText("20자 이하의 문자열을 입력해주세요.")
    ).toBeInTheDocument();
  });

  test("21자 이상의 문자열을 입력했으나 제출하지 않으면, 에러가 보이지 않습니다.", () => {
    render(<UsernameForm />);
    // 먼저 인풋이 빈 값을 가지는지 확인합니다.
    // toHaveValue matcher를 이용합니다.
    // 인풋에 21자 이상의 문자를 입력합니다.
    // "20자 이하의 문자열을 입력해주세요." 란 에러 메시지가 보이지 않는지 확인합니다.
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    userEvent.type(input, "1234512345123451234512");
    expect(
      screen.queryByText("20자 이하의 문자열을 입력해주세요.")
    ).not.toBeInTheDocument();
  });

  test("21자 이상의 문자열 입력시 에러를 보여주며, 1글자를 지우면 에러가 사라집니다.", () => {
    render(<UsernameForm />);

    // 먼저 인풋이 빈 값을 가지는지 확인합니다.
    // 에러 메시지가 보이지 않는지 확인합니다.
    const errorMessage = "20자 이하의 문자열을 입력해주세요.";
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    // 인풋에 21자 이상의 문자를 입력합니다.
    // 제출 버튼을 클릭합니다.
    userEvent.type(input, "123451234512345123451");
    const button = screen.getByRole("button", { name: "제출" });
    userEvent.click(button);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    userEvent.type(input, "{backspace}");
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    // "20자 이하의 문자열을 입력해주세요." 란 에러 메시지가 보이는지 확인합니다.
    // "{backspace}" 를 인풋에 입력합니다.
    // userEvent.type을 이용합니다.
    // "20자 이하의 문자열을 입력해주세요." 란 에러 메시지가 보이지 않는지 확인합니다.
  });

  test("성공적으로 폼을 제출시 성공 메시지를 보여줍니다.", () => {
    render(<UsernameForm />);

    // 먼저 인풋이 빈 값을 가지는지 확인합니다.
    // 에러 메시지가 보이지 않는지 확인합니다.
    // 성공 메시지가 보이지 않는지 확인합니다.
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    expect(screen.queryByTestId("error-box")).not.toBeInTheDocument();
    expect(screen.queryByTestId("success-box")).not.toBeInTheDocument();

    // 정상적인 Username을 입력합니다.
    // 제출 버튼을 클릭합니다.
    userEvent.type(input, "정상입니다.");
    const button = screen.getByRole("button", { name: "제출" });
    userEvent.click(button);

    // "유저명 생성에 성공했습니다." 라는 성공메시지가 보이는지 확인합니다.
    expect(screen.getByText("유저명 생성에 성공했습니다.")).toBeInTheDocument();
  });
});
