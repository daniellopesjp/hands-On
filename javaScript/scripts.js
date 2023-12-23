// studentModal.open = true // funciona para abrir o dialog
// studentModal.open = false// funciona para fechar o dialog
// studentModal.setAttribute('open', true) // funciona para abrir o dialog
// studentModal.setAttribute('open', false) // não funciona para fechar o dialog
// studentModal.removeAttribute('open') funciona para fechar o dialog
// studentModal.showModal() // funciona para abrir o dialog
// studentModal.close() funciona para fechar o dialog

const baseUrl = "http://localhost:3000";

// Passo 1: Selecionar os elementos HTML necessários
const studentModal = document.querySelector("#student-modal");
const studentTable = document.querySelector("#student-table");
const studentForm = document.querySelector("#student-form");
const studentModalTitle = document.querySelector("#student-modal-title");
const saveStudentButton = document.querySelector("#save-student");

const disciplineModal = document.querySelector("#discipline-modal");
const disciplineCard = document.querySelector("#discipline-card");
const disciplineForm = document.querySelector("#discipline-form");
const disciplineModalTitle = document.querySelector("#discipline-modal-title");
const saveDisciplineButton = document.querySelector("#save-discipline");
// studentModal.showModal()
// Passo 2: Definir função para abrir o modal do estudante
const openStudentModal = () => studentModal.showModal();
const createStudent = () => {
  studentModalTitle.innerHTML = `Novo Aluno`;
  saveStudentButton.innerHTML = "Criar";
  openStudentModal();
  saveStundentData(`${baseUrl}/alunos`, "POST");
};

const openDisciplineModal = () => disciplineModal.showModal();
const createDiscipline = () => {
  disciplineModalTitle.innerHTML = `Nova Disciplina`;
  saveDisciplineButton.innerHTML = "Salvar";
  openDisciplineModal();
  saveDisciplineData(`${baseUrl}/disciplinas`, "POST");
};
// Passo 3: Definir função para fechar o modal do estudante
const closeStudentModal = () => studentModal.close();
const closeDisciplineModal = () => disciplineModal.close();
// Passo 4: Criar uma linha na tabela do estudante
const createStudentTableRow = (id, name, matricula, curso) => {
  const tableTr = document.createElement("tr");
  tableTr.innerHTML = `
    <td>${name}</td>
    <td>${matricula}</td>
    <td>${curso}</td>
    <td align="center">
      <button class="button button--danger" onclick="deleteStudentTable(${id})">Apagar</button>
      <button class="button button--success" onclick="editdStudentModal(${id})"}>Editar</button>
    </td>`;
  studentTable.appendChild(tableTr);
};

// Criar um novo card na lista de disciplinas
const createDisciplineCard = (data) => {
  const subjectList = document.querySelector(".subject-list");

  const subjectCard = document.createElement("div");
  subjectCard.classList.add("subject-card");

  const statusText = data.status === 1 ? 'Obrigatória' : 'Opcional';
  const statusClass = data.status === 1 ? 'tag--danger' : 'tag--success';

  subjectCard.innerHTML = `
    <h3 class="subject-card__title">${data.disciplina}</h3>
    <hr />
    <ul class="subject-card__list">
      <li>carga horária: ${data.horario}</li>
      <li>Professor: ${data.professor}</li>
      <li>Status <span class="tag ${parseInt(data.status) ? 'tag--danger' : 'tag--success'}">${parseInt(data.status) ? 'Obrigatória' : 'Opcional'}</span></li>
    </ul>
    <p>${data.observacao}</p>
    <div class="subject-card__actions">
      <button class="button button--danger" onclick="deleteDisciplineCard(${data.id})">Apagar</button>
      <button class="button button--success" onclick="editDisciplineCard(${data.id})">Editar</button>
    </div>
  `;

  subjectList.appendChild(subjectCard);
};


const saveStundentData = (url, method) => {
  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // capturar os dados do formulário
    const formData = new FormData(studentForm);
    // transformar os dados do formulário em um objeto
    const payload = new URLSearchParams(formData);
    fetch(url, {
      method: method,
      body: payload,
    }).catch((error) => {
      closeStudentModal();
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
  });
};

const saveDisciplineData = (url, method) => {
  disciplineForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // capturar os dados do formulário
    const formData = new FormData(disciplineForm);
    // transformar os dados do formulário em um objeto
    const payload = new URLSearchParams(formData);
    fetch(url, {
      method: method,
      body: payload,
    }).catch((error) => {
      closeDisciplineModal();
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
  });
};

// Passo 7: Abrir o modal para criar um novo aluno
// Passo 8: Excluir um aluno da tabela
const deleteStudentTable = (id) => {
  fetch(`${baseUrl}/alunos/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  });
};
const deleteDisciplineCard = (id) => {
  fetch(`${baseUrl}/disciplinas/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  });
};

// Passo 9: Abrir o modal de edição e carregar os dados do aluno
const editdStudentModal = (id) => {
  fetch(`${baseUrl}/alunos/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      const { nome, matricula, curso } = data;
      studentModalTitle.innerHTML = `Editar Aluno ${nome}`;
      document.querySelector("#nome").value = nome;
      document.querySelector("#matricula").value = matricula;
      document.querySelector("#curso").value = curso;
      saveStudentButton.innerHTML = "Salvar";
      openStudentModal();
      saveStundentData(`${baseUrl}/alunos/${id}`, "PUT");
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};

const editDisciplineCard = (id) => {
  fetch(`${baseUrl}/disciplinas/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      const { disciplina, horario, professor, status, observacao } = data;
      disciplineModalTitle.innerHTML = `Editar Disciplina ${disciplina}`;
      document.querySelector("#disciplina").value = disciplina;
      document.querySelector("#horario").value = horario;
      document.querySelector("#professor").value = professor;
      document.querySelector("#status").value = parseInt(status); // Convertendo para número
      document.querySelector("#observacao").value = observacao;
      saveDisciplineButton.innerHTML = "Salvar";
      openDisciplineModal();
      saveDisciplineData(`${baseUrl}/disciplinas/${id}`, "PUT");
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};


// Passo 10: Chamar a função para carregar dados iniciais da tabela ao carregar a página
const loadStudentTable = async () => {
  try {
    const response = await fetch("http://localhost:3000/alunos");
    const data = await response.json();
    data.forEach((student) => {
      createStudentTableRow(
        student.id,
        student.nome,
        student.matricula,
        student.curso
      );
    });
  } catch (error) {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  }
};

const loadStudentTable2 = () => {
  fetch("http://localhost:3000/alunos")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((student) => {
        // pode ser feito assim também
        // const { nome, matricula, curso } = student;
        createStudentTableRow(
          student.id,
          student.nome,
          student.matricula,
          student.curso
        );
      });
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};

loadStudentTable();

// Chamar a função para carregar dados iniciais da lista de disciplinas ao carregar a página
const loadDisciplineList = async () => {
  try {
    const response = await fetch("http://localhost:3000/disciplinas");
    const data = await response.json();
    data.forEach((discipline) => {
      createDisciplineCard(discipline);
    });
  } catch (error) {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  }
};



loadDisciplineList();
