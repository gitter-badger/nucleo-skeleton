// TODO move this file into a bower component
// either make a pull request to the original authors, either fork it and add your improvements 
// improvements: 
// - shouldDisplay (filter)
// - when (option)
QUnit.notifications = function(options) {
  "use strict";

  options         = options         || {};
  options.icons   = options.icons   || {};
  options.timeout = options.timeout || 4000;
  options.when    = options.when    || 'always';
  options.titles  = options.titles  || { passed: "Passed!", failed: "Failed!" };
  options.bodies  = options.bodies  || {
    passed: "{{passed}} of {{total}} passed",
    failed: "{{passed}} passed. {{failed}} failed."
  };

  var renderBody = function(body, details) {
    [ "passed", "failed", "total", "runtime" ].forEach(function(type) {
      body = body.replace("{{" + type + "}}", details[ type ]);
    });

    return body;
  };

  function generateQueryString(params) {
    var key,
      querystring = "?";

    params = QUnit.extend(QUnit.extend({}, QUnit.urlParams), params);

    for (key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[ key ] === undefined) {
          continue;
        }
        querystring += encodeURIComponent(key);
        if (params[ key ] !== true) {
          querystring += "=" + encodeURIComponent(params[ key ]);
        }
        querystring += "&";
      }
    }
    return location.protocol + "//" + location.host +
      location.pathname + querystring.slice(0, -1);
  }

  if (window.Notification) {
    QUnit.done(function(details) {
      var title,
          _options = {},
          notification,
          shouldDisplay = true;

      if (window.Notification && QUnit.urlParams.notifications) {
        if (details.failed === 0) {
          title = options.titles.passed;
          _options.body = renderBody(options.bodies.passed, details);
          shouldDisplay = options.when === 'failed' ? false : true;

          if (options.icons.passed) {
            _options.icon = options.icons.passed;
          }
        } else {
          title = options.titles.failed;
          _options.body = renderBody(options.bodies.failed, details);
          shouldDisplay = options.when === 'passed' ? false : true;

          if (options.icons.failed) {
            _options.icon = options.icons.failed;
          }
        }

        if(shouldDisplay){

          notification = new window.Notification(title, _options);

          setTimeout(function() {
            notification.close();
          }, options.timeout);

        }

      }
    });

    QUnit.begin(function() {
      var toolbar      = document.getElementById( "qunit-testrunner-toolbar" ),
          notification = document.createElement( "input" ),
          label        = document.createElement("label"),
          disableCheckbox = function() {
            notification.checked = false;
            notification.disabled = true;
            label.style.opacity = 0.5;
            label.title = notification.title = "Note: Notifications have been " +
              "disabled in this browser.";
          };

      notification.type = "checkbox";
      notification.id   = "qunit-notifications";

      label.innerHTML = "Notifications";
      label.for = "qunit-notifications";
      label.title = "Show notifications.";
      if (window.Notification.permission === "denied") {
        disableCheckbox();
      } else if (QUnit.urlParams.notifications) {
        notification.checked = true;
      }

      notification.addEventListener("click", function(event) {
        if (event.target.checked) {
          if (window.Notification.permission === "granted") {
            window.location = generateQueryString({ notifications: true });
          } else if (window.Notification.permission === "denied") {
            disableCheckbox();
          } else {
            window.Notification.requestPermission(function(permission) {
              if (permission === "denied") {
                disableCheckbox();
              } else {
                window.location = generateQueryString({ notifications: true });
              }
            });
          }
        } else {
          window.location = generateQueryString({ notifications: undefined });
        }
      }, false);

      toolbar.appendChild(notification);
      toolbar.appendChild(label);
   });
  }
};

QUnit.notifications({
  when:'failed'
});