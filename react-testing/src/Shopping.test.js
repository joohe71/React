import { screen, render } from "@testing-library/react";
import Shopping from "./Shopping";
import userEvent from "@testing-library/user-event";

const mockCarts = [
  {
    id: 1,
    name: "강아지 신발 사이즈 xs",
    price: 14000,
    discount: 0.1,
    quantity: 1,
    image: "https://via.placeholder.com/150.png",
  },

  {
    id: 2,
    name: "베이비 물티슈 200매",
    price: 2000,
    discount: 0.2,
    quantity: 10,
    image: "https://via.placeholder.com/150.png",
  },

  {
    id: 3,
    name: "강아지 사료 4kg",
    price: 40000,
    discount: 0.3,
    quantity: 3,
    image: "https://via.placeholder.com/150.png",
  },
];

describe("ShoppingCart 컴포넌트를 렌더링합니다.", () => {
  test("헤더가 있습니다.", () => {
    render(<Shopping carts={mockCarts} />);

    // screen.getByRole을 이용해 헤더를 찾습니다.
    // 헤더가 화면에 있는지 테스트합니다.
    const header = screen.getByRole("heading", { name: "쇼핑 목록" });
    expect(header).toBeInTheDocument();
  });

  test("아이템 3개를 보여줍니다.", () => {
    render(<Shopping carts={mockCarts} />);

    // screen.getAllByRole을 이용해 모든 리스트 아이템을 찾습니다.
    // 모두 총 3개인지 체크합니다.
    const lis = screen.getAllByRole("listitem");
    expect(lis.length).toBe(3);
  });

  test("아이템의 이미지를 노출합니다.", () => {
    render(<Shopping carts={mockCarts} />);

    // screen.getByAltText를 이용해 "강아지 사료 4kg"란 텍스트로 이미지를 찾으세요.
    // 이미지의 src attribute가 mockCarts의 데이터와 같은지 체크하세요.
    // toHaveAttribute를 이용하세요.
    const image = screen.getByAltText("강아지 사료 4kg");
    expect(image).toHaveAttribute("src", mockCarts[2].image);
  });
});

describe("계산된 값을 노출합니다.", () => {
  test("할인된 값을 보여줍니다.", () => {
    render(<Shopping carts={mockCarts} />);

    // screen.getAllByText를 이용해, 모든 상품 가격을 찾으세요.
    // 상품 가격에 할인가가 반영되었는지 체크하세요.
    // 상품 가격 - (price - price * discount) * quantity
    // toHaveTextContent를 이용하세요.
    const { price, discount, quantity } = mockCarts[0];
    const discountPrice = price * (1 - discount) * quantity;
    const prices = screen.getAllByText(/상품 가격 :/);
    expect(prices[0]).toHaveTextContent(`상품 가격 : ${discountPrice}원`);
  });

  test("총 가격을 보여줍니다.", () => {
    render(<Shopping carts={mockCarts} />);

    // 직접 mockCarts의 totalPrice를 계산해보세요.
    // 총 가격 - 모든 카트 상품 가격의 합
    // screen.getByText를 이용해, 총 가격이 제대로 표시되는지 체크하세요.

    const totalPrice = mockCarts
      .map((item) => item.price * (1 - item.discount) * item.quantity)
      .reduce((acc, cur) => acc + cur, 0);
    expect(screen.getByText(`총 가격 : ${totalPrice}원`)).toBeInTheDocument();
  });
});
