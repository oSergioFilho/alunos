class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal);
    }

    // Método que verifica se o aluno foi aprovado
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Método que retorna os dados do aluno formatados
    toString() {
        return `${this.nome}, ${this.idade} anos, Curso: ${this.curso}, Nota: ${this.notaFinal}, Status: ${this.isAprovado() ? "Aprovado" : "Reprovado"}`;
    }
}

let alunos = [];
let editandoIndex = -1;

const form = document.getElementById("formulario-aluno");
const tabela = document.getElementById("tabela-alunos");

// Atualiza a tabela de alunos no HTML
const atualizarTabela = () => {
    tabela.innerHTML = ""; 

    alunos.forEach((aluno, index) => {
        let row = tabela.insertRow();
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal} (${aluno.isAprovado() ? "✅ Aprovado" : "❌ Reprovado"})</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;
    });
};

// Cadastrar ou atualizar aluno
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = document.getElementById("nota").value;

    if (editandoIndex === -1) {
        alunos.push(new Aluno(nome, idade, curso, notaFinal));
    } else {
        alunos[editandoIndex] = new Aluno(nome, idade, curso, notaFinal);
        editandoIndex = -1;
    }

    form.reset();
    atualizarTabela();
});

// Excluir aluno
const excluirAluno = (index) => {
    alunos.splice(index, 1);
    atualizarTabela();
};

// Editar aluno
const editarAluno = (index) => {
    const aluno = alunos[index];

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("nota").value = aluno.notaFinal;

    editandoIndex = index;
};
