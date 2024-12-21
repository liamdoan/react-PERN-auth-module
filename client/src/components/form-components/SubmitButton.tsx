import React from "react"
import "./SubmitButton.css"

interface SubmitButtonProps {
    title: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
  return (
    <button type="submit">
        {title}
    </button>
  )
}

export default SubmitButton