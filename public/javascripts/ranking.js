$(function() {
  var $data = $(".ranking");

  $.ajax({
    type: "POST",
    url: "/ranking",
    success: (result) => {
     var data = result.rows;
     for (var i = 0; i < data.length; i++){
       $data.append(`<tr><td>${i+1}</td> <td>${data[i].game_name}</td> <td>${data[i].score}</td> <td>${data[i].lv}</td> <td>${data[i].maxhp}</td> <td>${data[i].attack}</td> <td>${data[i].defense}</td></tr>`);
     }
   },
   error: (err) => {
     console.log(err);
   }
  })
})
