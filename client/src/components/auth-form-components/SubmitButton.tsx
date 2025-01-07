import React from "react"
import "./SubmitButton.css"

interface SubmitButtonProps {
    title: string,
    disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title, disabled }) => {
  return (
    <button type="submit" disabled={disabled}>
        {title}
    </button>
  )
}

export default SubmitButton