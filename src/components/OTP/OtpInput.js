import React from "react";


const OtpInput = (props) => {
    const {
        //Set the default size to 6 characters
        size = 4,
        //Default validation is digits
        validationPattern = /[0-9]{1}/,
        value,
        onChange,
        className,
        ...restProps
    } = props;

    // Create an array based on the size.
    const arr = new Array(size).fill("-");

    const handleInputChange = (
        e,
        index
    ) => {
        const elem = e.target;
        const val = e.target.value;

        // check if the value is valid
        if (!validationPattern.test(val) && val !== "") return;

        // change the value using onChange props
        const valueArr = value.split("");
        valueArr[index] = val;
        const newVal = valueArr.join("").slice(0, 4);
        onChange(newVal);

        //focus the next element if there's a value
        if (val) {
            const next = elem.nextElementSibling;
            next?.focus();
        }
    };

    const handleKeyUp = (e) => {
        const current = e.currentTarget;
        if (e.key === "ArrowLeft" || e.key === "Backspace") {
            const prev = current.previousElementSibling;
            prev?.focus();
            prev?.setSelectionRange(0, 1);
            return;
        }
        if (e.key === "ArrowRight") {
            const prev = current.nextSibling;
            prev?.focus();
            prev?.setSelectionRange(0, 1);
            return;
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const val = e.clipboardData.getData("text").substring(0, size);
        onChange(val);
    };

    return (
        <div className="flex justify-center gap-2">
            {/* Map through the array and render input components */}
            {arr.map((_, index) => {
                return (
                    <input
                        key={index}
                        {...restProps}
                        className='otp-input border bg-transparent backdrop-blur-[4px] border-[#8C8C8C] rounded-[5px] text-[14px] leading-[22px] text-white transition-[border] ease-in-out py-[12px] pl-[20px] focus:shadow-none focus:outline-none focus:border-[#C084FF] w-[42px] h-[42px] md:w-[50px] md:h-[50px] left-[833px] top-[274px]'
                        type="text"
                        inputMode="numeric"
                        pattern={validationPattern.source}
                        maxLength={4}
                        value={value.at(index) ?? ""}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyUp={handleKeyUp}
                        onPaste={handlePaste}
                    />
                );
            })}
        </div>
    );
};

export default OtpInput;