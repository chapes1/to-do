document.addEventListener('DOMContentLoaded', ()=>{
  const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));

  if(tarefasArmazenadas){
    tarefasArmazenadas.forEach((tarefa)=>tarefas.push(tarefa))
    updateStatus();
    updateListaTarefas(); 
  }

});
let tarefas = [];

const salvarTarefas = () => {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
const verificacaoErro = () => {
  const titulo = document.getElementById('tarefa').value.trim();
  if(tarefas.filter(tarefa => (tarefa.titulo == titulo)).length > 0){
    Erro('Tarefa já está cadastrada')
    return false
  }
  if(titulo == ''){
    Erro('Tarefa está em branco, preencha ela');
    return false
  }
  return true
}
const Erro = (msg) => {
  document.getElementById('erro').innerHTML = msg;
  setInterval(()=>{
    document.getElementById('erro').innerHTML = '';
  }, 5000);
}
const AddTarefa = () => {
  Erro('')
  const tarefa = document.getElementById('tarefa');
  const titulo = tarefa.value.trim();

  if(tarefa){
    tarefas.push({ titulo: titulo, concluida: false });
    tarefa.value = '';
    updateStatus();
    updateListaTarefas(); 
    salvarTarefas();
  }
}   

const toggleTarefaCompleta = (index) => {
  tarefas[index].concluida = !tarefas[index].concluida;
  updateStatus();
  updateListaTarefas();
  salvarTarefas();
}
const removerTarefa = (index) => {
  tarefas.splice(index, 1);
  updateStatus();
  updateListaTarefas();
  salvarTarefas();
}

const updateStatus = () => {
  const tarefasCompletas = tarefas.filter(tarefa => tarefa.concluida).length;
  const totalTarefa = tarefas.length;
  const progresso = (tarefasCompletas / totalTarefa) * 100;
  const barraProgress = document.getElementById('progresso');

  barraProgress.style.width = `${progresso}%`;

  document.getElementById('numeros').innerHTML = `${tarefasCompletas} / ${totalTarefa}`;

  if(tarefas.length && tarefasCompletas == totalTarefa)
    parabens()
}

const updateListaTarefas = () => {
  const lista_tarefa = document.getElementById('lista-tarefa')
  lista_tarefa.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');    
    li.innerHTML = `
      <div class="item">
        <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">
          <input type="checkbox" class="checkbox"
          ${tarefa.concluida ? 'checked' : ''}
          >
          <p>${tarefa.titulo}</p>
        </div>
        <div class="icons">
          <i class="fa fa-trash" onclick='removerTarefa(${index})' aria-hidden="true"></i>
        </div>
      </div>
    `
    li.addEventListener("change", () => toggleTarefaCompleta(index));
    lista_tarefa.append(li);
  });
} 
const parabens = () =>{
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
  };

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
  });
}

document.getElementById('adicionar_tarefa').addEventListener('click', function(e){
  e.preventDefault();
  if(verificacaoErro())
    AddTarefa();
});

