const validateEmail = (email) => {
  const regexRule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (email && regexRule.test(email));
}

const validatePhone = (phone) => {
  return (phone && phone.length === 11);
}

const validatePassword = (pass) => {
  return (pass && pass.length >= 7)
}

const validateCpf = (cpf) => {
  const regexRule = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
  return (cpf && regexRule.test(cpf))
}

module.exports = { validateEmail, validatePhone, validatePassword, validateCpf }