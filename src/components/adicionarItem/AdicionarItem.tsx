import { useState } from "react"
import styles from "./AdicionarItem.module.css"
import { Button } from "./Button"
import { Header } from "./Header"
import { Agenda } from "../../entities/Agenda"
import axios from "axios"
import { baseUrl } from "../../App"
import { format, parse } from "date-fns"

export function AdicionarItem() {
  const [ titulo, setTitulo ] = useState('')
  const [ local, setLocal ] = useState('')
  const [ data, setData ] = useState('')
  const [ hora, setHora ] = useState('')

  async function handleNewItem(e: React.FormEvent) {
    e.preventDefault()

    const parseDate = parse(data, 'dd/MM/yyyy', new Date())
    const formattedDate = format(parseDate, 'yyyy-MM-dd')
    
    const newItem: Agenda = {
      titulo: titulo, 
      local: local,
      data: formattedDate,
      hora: hora,
      isCompleted: false
    }

    await axios.post(baseUrl+"/api/agenda", newItem)
    .then( () => {
      alert("Compromisso adicionado com sucesso")
      window.location.reload()
    })
  }
  
  return (
    <div className={styles.container}>
      <Header />
      <form className={styles.inputContent}>

        <div className={styles.inputItem}>
          <input 
            type="text"
            placeholder="Título"
            required
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
          />
        </div>
        <div className={styles.inputItem}>
          <input
            type="text"
            placeholder="Local"
            required
            onChange={(e) => setLocal(e.target.value)}
            value={local}
          />
        </div>
        <div className={styles.inputItem}>
          <input
            type="text"
            placeholder="Data"
            required
            onChange={(e) => setData(e.target.value)}
            value={data}
          />
        </div>
        <div className={styles.inputItem}>
          <input
            type="text"
            placeholder="Hora"
            required
            onChange={(e) => setHora(e.target.value)}
            value={hora}
          />
        </div>
        <Button 
          onClick={handleNewItem}
        />
      </form>
    </div>
  )
}