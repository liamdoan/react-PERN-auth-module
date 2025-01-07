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
    const strength = metConditions.filter(Boolean).length; //filter away all falsey values

    const strengthLevels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    const strengthLevel = strengthLevels[strength - 1] || "";

    return (
        <div className="password-strength-indicator">
            <div className="strength-label">{strengthLevel}</div>
            <div className="strength-bars">
                {Array.from({length: conditions.length}).map((_, index) => (
                    <div
                        key={index}
                        className={`strength-bar ${index < strength ? "active" : ""}`}
                    />
                ))}
            </div>
            <ul className="conditions-list">
                {conditions.map((condition, index) => (
                    <li
                        key={condition.name}
                        className={`condition ${metConditions[index] ? "passed" : "not-passed"}`}
                    >
                        {condition.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PasswordStrengthIndicator
