import React, { useState } from 'react'


interface ChatWithPopupProps {
    isOpened: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>

}

function ChatWithPopup({ isOpened, setIsOpened }: ChatWithPopupProps) {
    const [inputValue, setInputValue] = useState('')

    return (
        <div>ChatWithPopup</div>
    )
}

export default ChatWithPopup