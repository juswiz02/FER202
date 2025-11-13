import React from 'react';

function App() {
  // Hàm double
  const double = (x) => x * 2;

  // Hàm isEven
  const isEven = (n) => n % 2 === 0;

  // Kết quả
  const resultDouble = double(7);
  const resultIsEven10 = isEven(10);
  const resultIsEven7 = isEven(7);

  return (
    <div>
      <h1>Kết quả:</h1>
      <p>double(7): {resultDouble}</p>         {/* Should print 14 */}
      <p>isEven(10): {resultIsEven10.toString()}</p>  {/* Should print true */}
      <p>isEven(7): {resultIsEven7.toString()}</p>    {/* Should print false */}
    </div>
  );
}

export default App;