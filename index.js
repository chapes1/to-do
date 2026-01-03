document.addEventListener("DOMContentLoaded", () => {
  tarefas = carregarTarefas()
  renderizarTarefas(tarefas);
});
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    let titulo = document.getElementById('titulo').value;
    adicionarTarefa(titulo);
});
function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
function carregarTarefas() {
  const dados = localStorage.getItem("tarefas");
  return dados ? JSON.parse(dados) : [];
}
function adicionarTarefa(titulo) {
  const novaTarefa = {
    id: Date.now(),
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);
  salvarTarefas(tarefas);
  window.location.reload();
}
function concluirTarefa(id) {
  tarefas = tarefas.map(tarefa => {
    if (tarefa.id === id)
      tarefa.concluida = !tarefa.concluida;
    return tarefa;
  });

  salvarTarefas(tarefas);
  window.location.reload();
}
function removerTarefa(id) {
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  salvarTarefas(tarefas);
  window.location.reload();
}
function renderizarTarefas(){
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = ""; // limpa antes de renderizar

  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.classList.add("tarefa");

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    li.innerHTML = `
      <label>
        <input 
          type="checkbox" 
          ${tarefa.concluida ? "checked" : ""}
          onchange="concluirTarefa(${tarefa.id})"
        />
        <span>${tarefa.titulo}</span>
      </label>

      <button onclick="removerTarefa(${tarefa.id})">Excluir</button>
    `;

    lista.appendChild(li);
  });
    
}
