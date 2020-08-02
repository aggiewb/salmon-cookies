window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const form = document.querySelector('form');
    const button = document.querySelector('input[type="submit"]');
    const status = document.getElementById('form-submit-status');

    function success() {
        form.reset();
        status.textContent = "Thanks! We'll be getting back to you in 24-48 hours.";
        button.style.display = 'none';
    }

    function error() {
        status.textContent = 'Oops! There was a problem.';
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });

    function ajax(method, url, data, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                success();
            } else {
                error();
            }
        };
        xhr.send(data);
    }
});
