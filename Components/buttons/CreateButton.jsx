import { motion } from 'framer-motion';
import useTheme from 'next-theme';
import Link from 'next/link';

const CreateButton = ({ Icon, text, isactive, onClick, className }) => {
    const { theme } = useTheme()

  return (
    <button
      type='button'
      className={` text-[1vw] capitalize flex flex-col items-center justify-center border-[0.052vw] rounded-[1.5vw] gap-[2vh] text-center cursor-pointer font-bold bg-opacity-[0.1] hover:bg-opacity-[0.3] ${theme === "dark" ? 'border-gray-700 bg-gray-700' : 'border-gray-400 bg-gray-300'} ${className} `}
      onClick={onClick}
    >
        {Icon && typeof Icon === 'string' ? (
            <div className={`${theme === "dark" ? 'text-gray-200' : 'text-gray-600'}`}>
                <img src={Icon} alt={text} className='w-[4vw] h-[4vw] rounded-full font-bold' />
            </div>
        ) : (
            Icon && (
                <div className={`${theme === "dark" ? 'text-gray-200' : 'text-gray-600'}`}>
                    <Icon className='cursor-pointer w-[4vw] h-[4vw]' isActive={isactive} />
                </div>
            ) 
        )}
    </button>
  );
};

export default CreateButton;