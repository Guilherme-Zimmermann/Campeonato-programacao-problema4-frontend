import { PlusCircle } from '@phosphor-icons/react'
import styles from './Button.module.css'

export function Button( {onClick}: React.DOMAttributes<HTMLButtonElement> ) {
    return (
        <button className={styles.content} onClick={onClick}>
            Criar
            <PlusCircle size={20}/>
        </button>
    )
}