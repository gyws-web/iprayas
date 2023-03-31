function hovIn() {
 var areaID = $(this).attr('id');
 //alert('['+areaID+']');
  if (areaID == 'gaya') {
   $('#gayadiv').show();
  }
  if (areaID == 'samvedhna') {
   $('#samvedhnadiv').show();
  }
  if (areaID == 'iiitdm') {
   $('#iiitdmdiv').show();
  }

  if (areaID == 'rooh') {
   $('#roohdiv').show();
  }if (areaID == 'bhopal') {
   $('#bhopaldiv').show();
  }
  if (areaID == 'aaroha') {
   $('#aarohadiv').show();
  }
  if (areaID == 'sikkim') {
   $('#sikkimdiv').show();
  }
  if (areaID == 'rotaract') {
   $('#rotaractdiv').show();
  }
  if (areaID == 'ffi') {
   $('#ffidiv').show();
  }
}
function hovOut() {
  $('#gayadiv').hide();
   $('#roohdiv').hide();
    $('#aarohadiv').hide();
	 $('#bhopaldiv').hide();
	 $('#sikkimdiv').hide();
	 $('#rotaractdiv').hide();
	 $('#ffidiv').hide();
	 $('#iiitdmdiv').hide();

	 $('#samvedhnadiv').hide();

}
$('map area').hover(hovIn, hovOut);


function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("seeMore");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "see more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "see less";
    moreText.style.display = "inline";
  }
}
