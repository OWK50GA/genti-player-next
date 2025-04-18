import OtpInput from "./OtpInput";

const OtpForm = ({ otp, setOtp }) => {
    return (
        <form
            className="otp-form"
        >
            <div className="otp-wrapper">
                <OtpInput
                    value={otp}
                    onChange={(val) => {
                        setOtp(val);
                    }}
                />
            </div>
        </form>
    );
};

export default OtpForm;