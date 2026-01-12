document.addEventListener('DOMContentLoaded', function() {
  tarefas = carregarTarefas();
  renderizarTarefas(tarefas);
});
document.addEventListener('submit',function (event){
  event.preventDefault(); 
  let tarefa = document.getElementById('tarefa').value;
  adicionarTarefa(tarefa);
});
function carregarTarefas(){
  tarefas = JSON.parse(localStorage.getItem('tarefas'));
  return tarefas;
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
function adicionarTarefa(tarefa){
  dados = carregarTarefas();
  const novaTarefa = {
    id: Date.now(),
    tarefa: tarefa,
    concluida: false
  }
  dados.push(novaTarefa);
  salvarTarefas(dados);
  renderizarTarefas(dados);
}

function renderizarTarefas(tarefas){
  const lista = document.getElementById("lista-tarefa");
  lista.innerHTML = "";

  tarefas.forEach((data, chave) =>{
    const li = document.createElement("li");

    li.innerHTML = `
      <label>
        <input 
          type="checkbox" 
          ${data.concluida ? "checked" : ""}
          onchange="concluirTarefa(${data.id})"
        />
        <span> 
          ${data.tarefa}
        </span>
        <button onclick="removerTarefa(${data.id})">Excluir</button>
      </label>
    `;

    lista.appendChild(li);
  });
}

function removerTarefa(id) {
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  salvarTarefas(tarefas);
  renderizarTarefas(tarefas);
}
function concluirTarefa(id) {
  tarefas = tarefas.map(tarefa => {
    if (tarefa.id === id)
      tarefa.concluida = !tarefa.concluida;
    return tarefa;
  });

  salvarTarefas(tarefas);
  renderizarTarefas(tarefas);
}
