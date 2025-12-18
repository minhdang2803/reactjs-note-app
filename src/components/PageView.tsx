import React, { useRef, useState, useEffect } from "react";

interface PageViewProps {
    children: React.ReactNode[] | React.ReactNode,
    height?: String, // TailWind String
}


export default function PageView({ children, height = "h-64" }: PageViewProps) {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [pages, setPage] = useState(React.Children.toArray([]))
    const [currentPageIndex, setCurrentPageIndex] = useState(0)

    // Reload the whole component if we put the other length.
    useEffect(() => {
        setPage(React.Children.toArray(children))
    }, [pages.length])

    useEffect(() => {
        const listener = listRef.current
        if (listener == null) return;
        const onScroll = () => {
            const calculateScrollIndex = Math.round(listener.scrollLeft / listener.clientWidth)
            setCurrentPageIndex(calculateScrollIndex)

        }
        listener.addEventListener("scroll", onScroll, { passive: true })
        return () => listener.removeEventListener("scroll", onScroll)
    }, [])

    return (
        // Page Children
        <div className="flex flex-col">
            <div className={`w-full no-scrollbar overflow-x-auto snap-x snap-mandatory ${height}`} ref={listRef}>
                <div className="flex">
                    {pages.map((page, index) => (
                        <div className="snap-start flex-shrink-0 w-full" key={index}>
                            <div className="w-full h-full">
                                {page}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Page Indicator */}
            <div className="flex flex-row, justify-center items-center mt-[23px]">
                {pages.map((_, index) => (
                    < div key={index} className={`
                    bg-button-primary
                    rounded-[3px]
                    ${index % 2 == 0 ? "mx-[6px]" : ""}
                    ${currentPageIndex == index ? "w-[10px] h-[10px] bg-button-primary" : "w-[8px] h-[8px] bg-button-secondary opacity-50"}`
                    } />
                ))}
            </div>
        </div >
    )
}