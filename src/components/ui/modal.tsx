import { Button } from '@nextui-org/react';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const modal = ({ isVisible, onClose }) => {
  if (isVisible) {
    return (
      <div className="z-50 fixed inset-0 flex items-center justify-center  bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="w-[60%] flex flex-col">
          <Button
            isIconOnly
            className="self-end transition duration-300"
            onClick={() => onClose()}
          >
            <AiOutlineClose className="w-8 h-8" />
          </Button>
          <div className="bg-white p-2 rounded">HELLO</div>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default modal;
