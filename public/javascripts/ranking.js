$(function() {
  console.log("aaaa");

  $.ajax({
    type: "POST",
    url: "/ranking",
    success: (result) => {
     console.log(result);
   },
   error: (err) => {
     console.log(err);
   }
  })
})
