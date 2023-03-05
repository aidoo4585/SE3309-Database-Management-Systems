//Set Css html
let css = ` <!-- Bootstrap css -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<link rel="stylesheet" href="style.css">`;

//Set base Scripts in html
let script = `
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
`;

//Set header html
let pgHeader = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 shrink-to-fit=no">
    <title>Postal Service</title>
    
    ${css}    
    ${script}
</head>`;

//Set footer html
let pgFooter = `
<footer style="position: fixed; bottom: 0px; left: 0px; right: 0px; margin-bottom: 0px;">
    <div class="bg-light py-4">
        <div class="container text-center">
          <p class="text-muted mb-0 py-2">© <script>document.write(new Date().getFullYear())</script> Post Service All rights reserved.</p>
        </div>
      </div>
</footer>
`;

//Navbar with input title html
function navbar(navtitle) {
  let markup = `
    <nav class="navbar navbar-dark bg-primary">
    <a class="navbar-brand" href="/">Postal Service</a>
    <h1 class="navbar-brand" style="position: absolute; left: 50%; transform: translatex(-50%); color:white">${navtitle}</h1>
    <a href="/quit" id="quit">Quit</a>
    </nav>
    </br>`;
  return markup;
}

//Dynamic Html header that sets title
function header(content) {
  let markup = `
  <h4 class = "mx-4" style="color:black";>${content}</h4>
  `;

  return markup;
}

//Btn with input title
function btn(btnTitle) {
  let markup = `
<button type="submit" class="btn btn-primary my-3" >${btnTitle}</button>`;
  return markup;
}

//Btn to open modal
function btnToModal(btnTitle) {
  let markup = `
    <button type="button" class="btn btn-primary my-3" data-toggle="modal" data-target="#exampleModal">${btnTitle}</button>`;
  return markup;
}
//Popup modal used for confirm pages
function popUpModal(modalTitle, modalMessage, confimBtnMessage) {
  let markup = `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${modalTitle}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <p>${modalMessage}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">${confimBtnMessage}</button>
      </div>
    </div>
  </div>
</div>
`;

  return markup;
}

//Creates starting part of table html, takes string column names
function tblHeaders(...strings) {
  let tblHeaders = "";

  for (let i = 0; i < strings.length; i++) {
    tblHeaders = tblHeaders + "<th>" + strings[i] + "</th>";
  }

  let markup = `
    <table class="table table-striped w-75">
    <thead>
      <tr>
        ${tblHeaders} 
      <tr>
    </thead>`;

  return markup;
}
module.exports = {
  pgHeader,
  header,
  navbar,
  css,
  pgFooter,
  btn,
  tblHeaders,
  popUpModal,
  btnToModal,
};
