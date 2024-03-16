import { Check, Trash } from "@phosphor-icons/react"
import styles from "./ListarItens.module.css"
import { Agenda } from "../../entities/Agenda"
import { format, parse, parseISO } from "date-fns"

interface AgendaItemProps {
  data: Agenda
  toggleCheckbox: ({ id, value }: { id?: number; value: boolean }) => void
  removeTask: (id?: number) => void
}

export function ListarItens({ data, toggleCheckbox, removeTask }: AgendaItemProps) {

  function handleToggleCheckbox() {
    toggleCheckbox({ id: data.id, value: !data.isCompleted })
  }

  function handleRemoveTask(){
    removeTask(data.id)
  }

  const toggleCheckboxStyles = data.isCompleted
  ? styles['checkbox-checked']
  : styles['checkbox-unchecked']

  const toggleParagraphStyles = data.isCompleted
  ? styles['paragraph-checked']
  : ''
  
  const formattedDate = format(parseISO(data.data), "dd/MM/yyyy")
  const formattedTime = format(parse(data.hora, 'HH:mm:ss', new Date()), 'HH:mm');
  
  return(
    <div className={styles.content}>
      <label htmlFor="" onClick={handleToggleCheckbox}>
        <input type="checkbox" readOnly/>
        <span className={`${styles.checkbox} ${toggleCheckboxStyles}`} >
          {data.isCompleted && <Check size={12}/>} 
        </span>

        <p className={`${styles.paragraph} ${toggleParagraphStyles}`}>
          {data.titulo}
        </p>
        <p className={`${styles.paragraph} ${toggleParagraphStyles}`}>
          {data.local}
        </p>
        <p className={`${styles.paragraph} ${toggleParagraphStyles}`}>
          {formattedDate}
        </p>
        <p className={`${styles.paragraph} ${toggleParagraphStyles}`}>
          {formattedTime}
        </p>
      </label>

      <button onClick={handleRemoveTask}>
        <Trash size={20}/>
      </button>
    </div>
  )
}