import Human from './human.js';
import JustValidate from '../node_modules/just-validate/dist/just-validate.es.js'
//Массив сотрудников
let humans = [
    new Human ('1','Игорь','Фролов','Сергеевич', '16.12.2022', '15.12.2022','+79296123372'),
    new Human ('2','Иван','Иванов','Иванович', '15.12.2022', '17.12.2022','+79296123372','fronend-developer')
]

let contactsArr = [
    {
      type: 'Телефон',
      value: '+71234567890'
    },
    {
      type: 'Email',
      value: 'abc@xyz.com'
    },
    {
      type: 'Facebook',
      value: 'https://facebook.com/vasiliy-pupkin-the-best'
    }
  ]

const $humanList = document.getElementById('studentList'),
      $humanListTHAll =  document.querySelectorAll('.studentsTable th')

let column = 'fio',
    columnDir = true,
    input = document.querySelectorAll('.form-control')

function newHumanTR(human){
  const $humanTR = document.createElement('tr'),
        $identificatTD = document.createElement('td'),
        $fioTD = document.createElement('td'),
        $dateStartTD = document.createElement('td'),
        $dateChangeTD = document.createElement('td'),
        $contactsTD = document.createElement('td'),
        $RemoveTD = document.createElement('td');

  $identificatTD.textContent = human.getIdentificat()
  $fioTD.textContent = human.getfio()
  $dateStartTD.textContent = human.getdateStart()
  $dateChangeTD.textContent = human.getdateChange()
  $contactsTD.textContent = human.getcontacts()
  $RemoveTD.textContent = human.getRemove()


  $humanTR.append($identificatTD)
  $humanTR.append($fioTD)
  $humanTR.append($dateStartTD)
  $humanTR.append($dateChangeTD)
  $humanTR.append($contactsTD)
  $humanTR.append($RemoveTD)

  return $humanTR;
}

//Сортировка массива по параметрам
function getSortHumans(prop, dir){
  const humanCopy = [...humans]
  return humanCopy.sort(function (humanA, humanB){
      if((!dir == false ? humanA[prop] < humanB[prop] : humanA[prop] > humanB[prop]))
      return -1;
  })
}
// Отррисовка
function render(){
  let humanCopy = [...humans];
  const fioVal = document.getElementById('inputFio').value

          humanCopy = getSortHumans(column, columnDir)

          if(fioVal !== '') humanCopy = filter(humanCopy, column, fioVal)

  $humanList.innerHTML = ''

  for(const human of humanCopy){
    $humanList.append(newHumanTR(human))
  }

}

$humanListTHAll.forEach(element => {
  element.addEventListener('click', function(){
      column = this.dataset.column;
      columnDir = !columnDir
      render()
  })
})

// Валидация
const validation = new JustValidate('#form', {
  errorFieldCssClass: 'is-invalid',
});

validation
  .addField('#surname', [
    {
      rule: 'minLength',
      rule: 'required',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#name', [
    {
      rule: 'minLength',
      rule: 'required',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#lastName', [
    {
      rule: 'minLength',
      rule: 'required',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])

  // Добавление в массив после валидации
  .onSuccess((validation) => {
    humans.push(new Human(
      document.getElementById('surname').value.trim(),
      document.getElementById('lastName').value.trim(),
      document.getElementById('name').value.trim(),
      
     
    ));
  
      render()
      document.getElementById('name').value = '',
      document.getElementById('surname').value = '',
      document.getElementById('lastName').value = '';
      document.getElementById('startStudy').value = '',
      document.getElementById('birthDate').value = '',
      document.getElementById('occupation').value = '' 
    console.log('Validation passes and form submitted', validation);
  });

render();


const deleteBtn = document.querySelector('.btn__delete');
deleteBtn.addEventListener('click', function(){
  humans.splice(0, 1);
})
console.log(
deleteBtn.addEventListener('click', function(){
  humans.splice(0, 1);
}))

