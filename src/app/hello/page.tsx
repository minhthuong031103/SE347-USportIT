import React from 'react';

const numbers = [1, 2, 3, 4, 5];

const NumberList = () => {
  return <NumberList2 name="John" />;
};

const NumberList2 = ({ name }) => {
  return <div>Hello, {name}</div>;
};

export default NumberList;
