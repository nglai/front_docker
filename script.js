const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sIdade = document.querySelector('#m-idade')
const sNota1 = document.querySelector('#m-nota1')
const sNota2 = document.querySelector('#m-nota2')
const sProfessor = document.querySelector('#m-professor')
const sNclasse = document.querySelector('#m-nclasse')
const btnSalvar = document.querySelector('#btnSalvar')



function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      cadastrar()
    }
    
}

function cadastrar() {
    fetch("https://crud-alunos.onrender.com/alunos",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                nome: sNome.value,
                idade: sIdade.value,
                nota_primeiro_semestre: sNota1.value,
                nota_segundo_semestre: sNota2.value,
                nome_do_professor: sProfessor.value,
                numero_da_classe: sNclasse.value
            })
            .then(res => console.log(res))
            .catch(res => console.log(res))
        }
    )
}

async function loadItens() {
    const response = await fetch("https://crud-alunos.onrender.com/alunos")
    const data = await response.json()
    tbody.innerHTML = ""
    data.map((item) => {insertItem(item)})
}

function insertItem(item) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.idade}</td>
      <td>${item.nota_primeiro_semestre}</td>
      <td>${item.nota_segundo_semestre}</td>
      <td>${item.nota_nome_do_professor}</td>
      <td>${item.nota_numero_da_classe}</td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
    e.preventDefault();
    modal.classList.remove('active')
    loadItens()
  }