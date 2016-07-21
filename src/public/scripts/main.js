(function () {
  'use strict';

  window.onload = function (event) {
    document.querySelector('.nav-toggle').onclick = function (event) {
      document.querySelector('.nav-menu').classList.toggle('is-active');
    };

    var submitStaircaseFormButton = document.getElementById('submit');

    if (submitStaircaseFormButton) {
      submitStaircaseFormButton.onclick = function (event) {
        event.preventDefault();
        var request = new XMLHttpRequest();

        if (!request) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
        }

        request.onload = function () {
          if (request.status === 200) {
            console.log(JSON.parse(request.response).message);
          } else {
            console.log(request.statusText);
          }
        };

        request.onerror = function (error) {
          alert(error);
        };

        request.open('POST', '/staircase');
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify({
          color: document.getElementById('color').value,
          animationMode: document.getElementById('animation').value,
          workMode: document.getElementById('mode').value
        }));

      }
    }
  }
})();
