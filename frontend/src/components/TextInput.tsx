import React from 'react'

interface TextInputProps {
    labelName: String
}
const TextInput = ({labelName}: TextInputProps): React.JSX.Element => {
  return (
    <div>
        <form action="">
            <label htmlFor="">{labelName}</label>
            <input type="text" />
        </form>
    </div>
  )
}

export default TextInput
