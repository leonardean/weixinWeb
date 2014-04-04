'use strict';

app.factory("Member", function ($resource) {
  return $resource(window.restful.baseURL + '/member', {memberID: '@_id'}, {
  });
});

