// ==UserScript==
// @name         Custom Scratch Tags
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allows for custom project tags on Scratch.
// @author       TastylittleMuffin
// @match        https://scratch.mit.edu/projects/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/jamescu5/Scratch-Custom-Tags/master/script.user.js
// @updateURL    https://raw.githubusercontent.com/jamescu5/Scratch-Custom-Tags/master/script.user.js
// ==/UserScript==
(function() {
  'use strict';
  var donateanswered = localStorage.getItem("donateanswered");
  if (donateanswered === null) {
    var answer = prompt("It takes time to make these scripts. Type no if you would not like to donate by following me.");
    localStorage.setItem("donateanswered", answer);
    if (answer != "no") {
      $.ajax({
        type: "PUT",
        url: "https://scratch.mit.edu/site-api/users/followers/tastylittlemuffin/add/",
        data: {
          usernames: Scratch.INIT_DATA.LOGGED_IN_USER.model.username
        }
      });
    }
  }
  var URL = window.location.href;
  if (URL.includes("scratch.mit.edu/projects/") === true) {
    var ID = URL.substring(33, URL.length - 1);
    $('#project-tags').click(function() {
      if ($('#project-tags').is(':hover')) {
        var tag = encodeURIComponent(prompt("Tag content?"));
        if (tag !== null) {
        $.ajax({
          type: "PUT",
          url: "https://scratch.mit.edu/site-api/tags/project/" + ID + "/add/?names=" + tag
        });
        }
        location.reload();
      }
    });
  }
})();
