const Shopping = ({ carts }) => {
  const totalPrice = carts
    .map((item) => item.price * (1 - item.discount) * item.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div>
      <h2>쇼핑 목록</h2>

      <ul>
        {carts.map((item) => {
          const discountPrice =
            item.price * (1 - item.discount) * item.quantity;
          return (
            <li key={item.id}>
              <div>
                <img src={item.image} alt={item.name} />
              </div>

              <div>
                <div>개수 : {item.quantity}</div>
                <p>상품 가격 : {discountPrice}원</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div>총 가격 : {totalPrice}원</div>
    </div>
  );
};

export default Shopping;
