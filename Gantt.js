function getDaysInMonth(month, year) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  month -= 1;
  var m = months[month];
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date).getDate() + ' ' + m);
    date.setDate(date.getDate() +1);
  }
  return days;
}
$('#subMonth').on('click', function() {
	$('.vertical').html('');
	var month_year = $('#month').val();
	var myArr = month_year.split('-');
	myArr = myArr.map(function(el){
	return parseInt(el)});
	var year = myArr[0];
	var month = myArr[1];
	var daysElement = getDaysInMonth(month, year);
	for(var i = 0; i < daysElement.length; i++) {
		var newli = $('<li>' + daysElement[i] +'</li>')
		var day = daysElement[i].split(" ");
		day = day[0];
		if(day.length === 1) 
		day = '0' + day;
		var attr = month_year + '-' + day;
		newli.attr('day', attr);
		newli.appendTo('.vertical');
	}
	var minDay = month_year + '-0' + daysElement[0].split(" ")[0];
	var maxDay = month_year + '-' + daysElement[daysElement.length - 1].split(" ")[0];
	$('#from').attr('min', minDay);
	$('#from').attr('max', maxDay);
	$('#to').attr('max', maxDay);
})

$("#from").change(function() {
	var min = $("#from").val();
    $('#to').attr('min', min);
})
function limitText(field, maxChar){
	$(field).attr('maxlength',maxChar);
}
$("#to").change(function(){
	if($("#from").val() == $('#to').val())
		limitText('#tlabel', 4)
	else
		$('#tlabel').attr('maxlength', 15)
})



$("#task").on("click", function() {
	if($("#tlabel").val() == '')
		return alert('Enter a Task!')
	else if( $("#from").val() == '' || $("#to").val() == '')
		return alert('Enter dates!')
	else if(parseInt($("#to").val().split('-')[2]) - parseInt($("#from").val().split('-')[2]) < 0)
		return alert('Wrong Dates!')
	const days = document.querySelectorAll(".content .vertical li");
	const daysArray = [...days];
	const taskSubmit = document.querySelectorAll("#tlabel");
	var color = $("#color").val();
	var taskName = $("#tlabel").val();
	var from =	$("#from").val();
	var to = $("#to").val();
	var attr = from + '--' + to;
	var newli = $('<li>' + taskName + '</li>')
	var filteredArray = daysArray.filter(el => el.attributes.day.value == from);
	var left = filteredArray[0].offsetLeft - 48;
 	var filteredArray = daysArray.filter(el => el.attributes.day.value == to);
 	var width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left - 71;
 	var bottom = 1000 - taskSubmit[0].offsetTop;
	newli.attr('duration', attr);
	var selectAttr = "li[duration = " + attr + "]";
	newli.appendTo('.horizontal-task');
	
	$(selectAttr).css('left', left);
	$(selectAttr).css('width', width);
	$(selectAttr).css('bottom', bottom);
	$(selectAttr).css({'padding': '10px 10px', 'border-radius': '10px', 'text-align': 'center'})
	$(selectAttr).css('background-color', color);
	$('.horizontal-task').append('<br>')
})