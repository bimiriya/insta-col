$(document).ready(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('#app').show();
      $('#auth').hide();
    } else {
      $('#auth').show();
      $('#app').hide();
    }
  });

  // ajustar alto de imgs de galería
  $('#pics img').height($('img').width());

  // borde entre los bloques más pequeños del collage
  // $('#collage .hor').first().css('border-bottom', '4px dashed rgba(255, 255, 255, 0.452)');
  // asignar id a cada img dentro de la galería

  $('#gallery img').each(function(i, img) {
    $(img).attr('id', 'pic' + i++);
  });
}); // document.ready

// autenticación
$('#login').click(function() {
  var email = $('#email').val();
  var pw = $('#pw').val();
  if (email !== '' && pw !== '' && pw !== '123456' && pw.length >= 6) {
    var promise = firebase.auth().signInWithEmailAndPassword(email, pw);
    promise.catch(e => alert(e.message));
  }     
});

$('#signup').click(function() {
  var email = $('#email').val();
  var pw = $('#pw').val();
  if (email !== '' && pw !== '' && pw !== '123456' && pw.length >= 6) {
    var promise = firebase.auth().createUserWithEmailAndPassword(email, pw);
    promise.catch(e => alert(e.message));
  }
});

$('#logout').click(function() {
  firebase.auth().signOut();
})

// DnD
function drag(event) {
  event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
  event.preventDefault();
  var picID = event.dataTransfer.getData('text');
  event.target.appendChild(document.getElementById(picID));
}

function allowDrop(event) {
  event.preventDefault();
}