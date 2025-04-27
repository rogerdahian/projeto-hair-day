import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Date atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual no input e a data minima 
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  event.preventDefault()
  
  try {
    // Recuperando o nome do cliente
    const name = clientName.value.trim()
    

    if(!name) {
      return ("Informe o nome do cliente!")
    }

    //  Recupera o horario selecionado.
    const hourSelected = document.querySelector(".hour-selected")
    
    if(!hourSelected){
      return alert("Selecione a hora.")
    }

    // Recupera somente a hora.
    const [hour] = hourSelected.innerText.split(":")
    
    // Insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour")
    
    // Gera um ID
    const id = new Date().getTime()
    
    // Faz o agendamento
    await scheduleNew({
      id, 
      name,
      when,
    })
   
    // Recarrega os agendamentos
    await schedulesDay()

    // Limpa o imput de nome do cliente.
    clientName.value = ""
    
  } catch (error) {
    alert("Não foi possíivel realizar o agendamento.")
    console.log(error)
  }
}