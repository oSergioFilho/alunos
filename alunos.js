class Aluno {
    constructor(nome, idade, curso, nota) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.nota = nota;
    }
}

// Array para armazenar os alunos
let alunos = [];
let editandoIndex = -1; // Índice do aluno que está sendo editado

// Referências dos elementos do formulário e da tabela
const form = document.getElementById("formulario-aluno");
const tabela = document.getElementById("tabela-alunos");

// Função para atualizar a tabela com os alunos cadastrados
const atualizarTabela = () => {
    tabela.innerHTML = ""; // Limpa a tabela antes de recriar as linhas

    alunos.forEach((aluno, index) => {
        let row = tabela.insertRow();

        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.nota}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;
    });
};

// Função para cadastrar ou editar aluno
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const nota = document.getElementById("nota").value;

    if (editandoIndex === -1) {
        // Cadastrar novo aluno
        alunos.push(new Aluno(nome, idade, curso, nota));
    } else {
        // Atualizar aluno existente
        alunos[editandoIndex] = new Aluno(nome, idade, curso, nota);
        editandoIndex = -1; // Reseta o modo de edição
    }

    form.reset(); // Limpa o formulário
    atualizarTabela();
});

// Função para excluir aluno
const excluirAluno = (index) => {
    alunos.splice(index, 1); // Remove do array
    atualizarTabela();
};

// Função para editar aluno
const editarAluno = (index) => {
    const aluno = alunos[index];

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("nota").value = aluno.nota;

    editandoIndex = index; // Marca qual aluno está sendo editado
};