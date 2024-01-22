const form = document.getElementById("form");
const username = document.getElementById("username");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const dateBirth = document.getElementById("dateBirth");
const modal = document.getElementById("modal");
const password = document.getElementById("password");
let ageNumberValue = 0;
let items = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  var usernameValue = username.value;
  var emailValue = email.value;
  var phoneValue = phone.value;
  var messageValue = message.value;
  var passwordValue = password.value;
  var dateBirthValue = dateBirth.value;
  var nameValue = name.value;

  if (nameValue === "") {
    setErrorFor(name, "O nome completo do usuario é obrigatório.");
  } else {
    setSuccessFor(name);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "O email é invalido.");
  } else {
    setSuccessFor(email);
  }

  if (phoneValue === "") {
    setErrorFor(phone, "O telefone é obrigatório.");
  } else if (checkPhone(phoneValue)) {
    setErrorFor(phone, "O telefone é invalido.");
  } else {
    setSuccessFor(phone);
  }

  if (dateBirthValue === "") {
    setErrorFor(dateBirth, "A data nascimento é obrigatória.");
  } else if (!validDate(dateBirthValue)) {
    setErrorFor(dateBirth, "data nascimento é invalida.");
  } else {
    setSuccessFor(dateBirth);
  }

  if (messageValue === "") {
    setErrorFor(message, "A mensagem é obrigatória.");
  } else if (messageValue.length > 140) {
    setErrorFor(message, "A mensagem ultrapassa o limite de 140 caracteres.");
  } else {
    setSuccessFor(message);
  }

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuario é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else if (passwordValue.length > 10) {
    setErrorFor(password, "A senha ultrapassa o limite de 10 caracteres.");
  } else {
    setSuccessFor(password);
  }

  const formControls = form.querySelectorAll(".form-control");

  var obj = {
    username: usernameValue,
    email: emailValue,
    phone: phoneValue,
    message: messageValue,
    password: passwordValue,
    dateBirth: dateBirthValue,
    name: nameValue,
    ageNumber: ageNumberValue,
  };

  items.push(obj);

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    gerar(items.name)
    form.classList.add("blur");
    modal.classList.add("active");
  }
}

function gerar(name) {
  let lista = document.querySelector('#lista');
  lista.appendChild(name)
};

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function closeModal() {
  modal.classList.remove("active");
  form.classList.remove("blur");
  clearFields();
}

function clearFields() {
  username.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";
  password.value = "";
  dateBirth.value = "";
  name.value = "";
  ageNumberValue = 0;
}

function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

  var el = document.getElementById("openEye");
  el.classList.toggle("fa-eye-slash");
  el.classList.toggle("fa-eye");
}

function validDate(date) {
  var dateBirth = new Date(date);
  dateBirth.setHours(dateBirth.getHours() + 4);
  var datetimeNow = new Date();
  var datetimePast = new Date("1900-01-01");
  datetimePast.setHours(datetimePast.getHours() + 4);
  ageNumberValue = datetimeNow.getFullYear() - dateBirth.getFullYear();

  if (dateBirth >= datetimeNow || dateBirth < datetimePast) {
    return false;
  } else {
    return true;
  }
}

function checkPhone(phone) {
  return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phone);
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
