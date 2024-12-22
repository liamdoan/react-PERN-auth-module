import "./PasswordStrengthIndicator.css";

interface PasswordStrengthIndicatorProps {
    password: string
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({password}) => {
    const conditions = [
        {
            name: "At least 6 character",
            test: password.length > 5
        },
        {
            name: "Contain 1 uppercase",
            test: /[A-Z]/.test(password)
        },
        {
            name: "Contain 1 lowercase",
            test: /[a-z]/.test(password)
        },
        {
            name: "Contain a number",
            test: /\d/.test(password)
        },
        {
            name: "Contain a special character",
            test:  /[^A-Za-z0-9]/.test(password)
        }
    ];

    const metConditions = conditions.map((condition) => condition.test);
    console.log("met condition", metConditions);
    const strength = metConditions.filter(Boolean).length; //filter away all falsey values
    console.log("strength: ", strength)

    return (
        <div>
            password strength indicator component
        </div>
    )
}

export default PasswordStrengthIndicator
