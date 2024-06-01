import React, { useId } from 'react';

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='relative w-full'>
            {label && <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
