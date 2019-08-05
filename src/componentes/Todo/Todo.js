import React from 'react';

import Botao from '../Botao/Botao';

import Tarefa from '../Tarefa/Tarefa'

import './Todo.css';



class Todo extends React.Component {
    state ={
        tarefas:[]
    }

    componentDidMount = () => {
       // alert("opa")
        this.listarTarefas();
    }

    listarTarefas = () =>{
        let tarefasLocal = localStorage.getItem("tarefas");
        if(tarefasLocal === null) {
            localStorage.setItem("tarefas",JSON.stringify([]));
        }else{
            this.setState({tarefas: JSON.parse(tarefasLocal)})
        }
    }
    adicionarTarefa =(event) =>{
        event.preventDefault();
       let novaTarefa = event.target.firstElementChild.value;
       if(novaTarefa === ""){
           return alert('Opa não pode adicionar ')
       }
       let tarefasLocal = localStorage.getItem("tarefas");
       let arrayTarefas = JSON.parse(tarefasLocal);
       arrayTarefas.push({
           titulo:novaTarefa,
           status:"Fazendo"
       });

       localStorage.setItem("tarefas",JSON.stringify(arrayTarefas));
       this.setState({tarefas: arrayTarefas})
    }
    removerTarefas =()=>{
        localStorage.setItem("tarefas",JSON.stringify([]));
        this.setState({tarefas:[]})
    }
    atulizarTarefa =(index) =>{
        let tarefasLocal = localStorage.getItem("tarefas");
        let arrayTarefas = JSON.parse(tarefasLocal);
        let statusTarefa = arrayTarefas[index].status;
       if( statusTarefa === "Fazendo"){
           arrayTarefas[index].status ="Feito"
       }else{
        arrayTarefas[index].status ="Fazendo"
       }
       localStorage.setItem("tarefas",JSON.stringify(arrayTarefas));
       this.setState({tarefas: arrayTarefas})
    }
    render() {
        return (
            <div>
            <form onSubmit={this.adicionarTarefa}>
                
                    <input placeholder="Digite sua tarefa" />
                    <Botao
                        classe="add"
                        titulo="Adicionar"
                        tipo="submit"
                      
                    />
                </form>
                <Botao
                    classe="removeAll"
                    titulo="Remover todas as tarefas"
                    tipo="button"
                    aoClicar={this.removerTarefas}
                />
                {
                    this.state.tarefas.map((tarefa, index) =>{
                        return(
                            <Tarefa
                            key={index}
                            tituloTarefa={tarefa.titulo}
                            tituloStatus={tarefa.status}
                            classeStatus={tarefa.status}
                            aoClicar={() =>this.atulizarTarefa(index)}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default Todo;