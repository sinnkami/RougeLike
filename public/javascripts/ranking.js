$(function() {
  console.log("aaaa");

  $.ajax({
    type: "POST",
    url: "/ranking",
    success: (result) => {
     var data = result.row;
     console.log(data);
   },
   error: (err) => {
     console.log(err);
   }
  })
})
