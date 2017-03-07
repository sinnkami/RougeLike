$(function () {
  var start = $(".btn");
  var name = $("#name")[0];

  start.click(function () {
    var set = encodeURI(name.value);
    location.href = `/game?name=${set}`
  })
})
