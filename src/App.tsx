import { useEffect, useState } from "react"
import styles from "./App.module.css"
import { AdicionarItem } from "./components/adicionarItem/AdicionarItem"
import { ListarItens } from "./components/listarItens/ListarItens"
import { Agenda } from "./entities/Agenda"
import axios from "axios"
import { Header } from "./components/listarItens/Header"

export const baseUrl = "http://localhost:8080"

function App() {
  const [agenda, setAgenda] = useState<Agenda[]>([]);

  useEffect(() => {
    const fetchAgenda = async () => {
      const response = await axios.get(baseUrl+"/api/agenda");
      setAgenda(response.data);

      for (const appointment of response.data) {
        const now = new Date();
        const appointmentTime = new Date(appointment.data + 'T' + appointment.hora);
        const differenceInMilliseconds = appointmentTime.getTime() - now.getTime();
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
        if (differenceInMinutes <= 30) {
          alert(`Você tem um compromisso em ${differenceInMinutes.toFixed(0)} minutos!`);
        }
      }
    };
    fetchAgenda();
  }, []);

  async function handleToggleCheckbox({id, value}: {id?: number, value: boolean}) {
    const updateIsCompleted = async () => {
      await axios.put(baseUrl+"/api/agenda/iscompleted/"+id, value, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    updateIsCompleted()
    setAgenda(agenda.map(item => item.id === id ? {...item, isCompleted: value} : item));
  }

  async function handleRemoveTask(id?: number) {

    const confirm = window.confirm("Deseja apagar o comprimisso?")
    if(!confirm) {
      return
    }

    await axios.delete(baseUrl+"/api/agenda/"+id)

    setAgenda(agenda.filter(item => item.id !== id))
  }

  return (
    <div className={styles.container}>
      <AdicionarItem />
      
      <div className={styles.listContent}>
        <Header/>
        { agenda?.map( data => {
          return (
            <div className={styles.itemListContent}>
              <ListarItens 
                key={data.id}
                data={data}
                toggleCheckbox={handleToggleCheckbox}
                removeTask={handleRemoveTask}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
