$(function () {
  var start = $(".btn");
  var name = $("#name")[0];

  start.click(function () {
    var set = encodeURI(name.value);
    if (set.length == 0){
      return false;
    }
    location.href = `/game?name=${set}`
  })
})
