import { useEffect, useState } from "react"
import styles from "./select.module.css"

type SelectOptions = {
    label: String,
    value: String | number
}

type SelectProps = {
    options: SelectOptions[]
    onChange: (value: SelectOptions | undefined) => void
    value?: SelectOptions
}

console.log(styles.selected)
export function Select({ value, options, onChange }: SelectProps) {
    const [isOpen, setisOpen] = useState(false)
    const [highlightedindex, setHighlightedindex] = useState(0)
    //console.log(options)
    //console.log(value)
    function clearOptions() {
        onChange(undefined)
    }

    function selectOption(option: SelectOptions) {
        if(option!==value) onChange(option)
    }

    function isOptionSelected(option: SelectOptions) {
        option === value
    }

    useEffect(()=>{
        if(isOpen) setHighlightedindex(0)
    },[isOpen])

    return <div onBlur={() => setisOpen(false)}
        onClick={() => setisOpen(prev => !prev)}
        className={styles.container}
    >

        <span className={styles.value}>{value?.label}</span>

        <button onClick={e => {
            e.stopPropagation()
            clearOptions()
            setisOpen(false)
        }} className={styles["clear-btn"]}>&times;</button>

        <div className={styles.divider}></div>

        <div className={styles.caret}></div>

        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
            {options?.map((option, index) =>
                <li
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setisOpen(false)
                    }}
                    onMouseEnter={() => setHighlightedindex(index)}
                    key={option.value} 
                    className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""}
                                 ${index === highlightedindex ? styles.highlighted : ""}`}
                >
                    {option.label}
                </li>
            )}
        </ul>

        <div ></div>
    </div>

}