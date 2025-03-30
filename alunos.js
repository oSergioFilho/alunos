class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal);
    }

    isAprovado = () => this.notaFinal >= 7;

    toString = () => 
        `${this.nome}, ${this.idade} anos, Curso: ${this.curso}, Nota: ${this.notaFinal}, Status: ${this.isAprovado() ? "Aprovado" : "Reprovado"}`;
}

let alunos = [];
let editandoIndex = -1;

const form = document.getElementById("formulario-aluno");
const tabela = document.getElementById("tabela-alunos");

// Atualizar tabela com arrow function
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
                <button class="editar" data-index="${index}">Editar</button>
                <button class="excluir" data-index="${index}">Excluir</button>
            </td>
        `;
    });

    // Adiciona eventos nos botões dinamicamente
    document.querySelectorAll(".editar").forEach(btn => 
        btn.addEventListener("click", (event) => editarAluno(event.target.dataset.index))
    );

    document.querySelectorAll(".excluir").forEach(btn => 
        btn.addEventListener("click", (event) => excluirAluno(event.target.dataset.index))
    );
};

// Cadastro / Edição com função anônima
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = document.getElementById("nota").value;

    if (editandoIndex === -1) {
        alunos.push(new Aluno(nome, idade, curso, notaFinal));
        alert("Aluno cadastrado com sucesso!");
    } else {
        alunos[editandoIndex] = new Aluno(nome, idade, curso, notaFinal);
        alert("Aluno atualizado com sucesso!");
        editandoIndex = -1;
    }

    form.reset();
    atualizarTabela();
});

// Excluir aluno (Arrow Function)
const excluirAluno = (index) => {
    alunos.splice(index, 1);
    alert("Aluno excluído!");
    atualizarTabela();
};

// Editar aluno (Arrow Function)
const editarAluno = (index) => {
    const aluno = alunos[index];

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("nota").value = aluno.notaFinal;

    editandoIndex = index;
};
