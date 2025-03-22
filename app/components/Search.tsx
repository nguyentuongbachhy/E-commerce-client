import { useEffect, useRef } from "react"
import { icons } from "~/utils/icons"

const { FiSearch } = icons

interface expandedState {
    isExpanded: boolean,
    isDesktop: boolean,
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setIsDesktop: React.Dispatch<React.SetStateAction<boolean>>
}

function Search({ isExpanded, isDesktop, setIsExpanded, setIsDesktop }: expandedState) {
    const inputRef = useRef<HTMLInputElement>(null)

    // Handle screen size changes
    useEffect(() => {
        const checkScreenSize = () => {
            const desktop = window.innerWidth > 768
            setIsDesktop(desktop)
            // On desktop, search is always expanded
            setIsExpanded(desktop)
        }

        // Check on mount and window resize
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    // Toggle search expansion on mobile
    const toggleSearch = () => {
        if (!isDesktop) {
            const newState = !isExpanded
            setIsExpanded(newState)

            // Focus input when expanded
            if (newState && inputRef.current) {
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus()
                    }
                }, 100)
            }
        }
    }

    return (
        <div className="relative">
            {/* Container that maintains icon position */}
            <div className="flex justify-end">
                {/* Search input with animation */}
                <div
                    className={`
                        flex items-center text-gray-800 bg-gray-100 rounded-sm overflow-hidden
                        transition-all duration-300 ease-in-out
                        ${isDesktop ? 'w-full' : isExpanded ? 'w-64' : 'w-10'}
                    `}
                >
                    {/* Input field that shows/hides */}
                    <div
                        className={`
                            transition-all duration-300 ease-in-out
                            ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0 p-0'}
                        `}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            className="outline-none bg-transparent px-3 py-2 w-full"
                            placeholder="What are you looking for?"
                        />
                    </div>

                    {/* Search icon as anchor point */}
                    <div
                        className="cursor-pointer items-center justify-center flex h-10 w-10 "
                        onClick={toggleSearch}
                    >
                        <FiSearch size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search