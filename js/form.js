// https://formspree.io/legal/terms-of-service 
// 7. Your use of our services
// As a global company based in the US with operations in other countries, Formspree must comply with economic sanctions and trade restrictions, including those implemented by the Office of Foreign Assets Control (“OFAC”) of the US Department of the Treasury. You may not use the Services to enable any person (including you) to benefit any activities Formspree has identified as a prohibited business or activity (collectively, “Prohibited Businesses”). Prohibited Businesses include use of the Services in or for the benefit of a country, organization, entity, or person embargoed or blocked by any government, including those on sanctions lists identified by the United States Office of Foreign Asset Control (OFAC). You may not use Formspree to enable individuals or entities identified on sanctions lists such as OFAC’s Specially Designated Nationals (“SDN”) List or Foreign Sanctions Evaders (“FSE”) List.

// You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party’s use and enjoyment of the Site. You are responsible for paying all fees that you owe to Formspree. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site. You agree not to “crawl,” “scrape,” or “spider” any page of the Services. You agree not to interfere with or try to disrupt our Services, for example by distributing a virus or other harmful computer code.

// We love your suggestions and ideas! They can help us improve your experience and our Services. Any unsolicited ideas or other materials you submit to Formspree are considered non-confidential and non-proprietary to you. You grant us a non-exclusive, worldwide, royalty-free, irrevocable, sub- licensable, perpetual license to use and publish those ideas and materials for any purpose, without compensation to you.

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

    function error(err) {
        status.textContent = `Oops! There was a problem. Error: ${err}`;
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
                error(error);
            }
        };
        xhr.send(data);
    }
});
