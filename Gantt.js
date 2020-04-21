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
	var attr = from + taskName.split(" ").join("") + to 
	var newul = $('<div><ul><li>' + taskName + '</li></ul></div>');
	newul.attr('duration', attr);
	$(newul).appendTo('.horizontal-task');
	var selectAttrdiv = "div[duration = " + attr + "]";
	var selectAttrul = "div[duration = " + attr + "] ul";
	var selectAttrli = "div[duration = " + attr + "] ul li";
	$(selectAttrli).attr('duration', attr);
	$(selectAttrul).attr('duration', attr);
	var filteredArray = daysArray.filter(el => el.attributes.day.value == from);
	var left = filteredArray[0].offsetLeft - 8;
 	var filteredArray = daysArray.filter(el => el.attributes.day.value == to);
 	var width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left - 10;
 	var bottom = 1000 - taskSubmit[0].offsetTop;
 	var wli = width * 0.5 
	$(selectAttrdiv).css({'left': left,'width': width, 'bottom': bottom, 'background-color': color, 'filter': 'brightness(120%)','padding': '0px', 'border-radius': '10px'})
	$(selectAttrul).css ({ 'width': '0px', 'padding': '10px 0px 10px 0','background-color':color, 'filter': 'brightness(80%)', 'border-radius': '10px', 'text-align': 'center'})
	$(selectAttrli).css({'text-align': 'center', 'display': 'inline-block', 'width': width})
})

$('.horizontal-task').on('click', function(){
	var x = event.target.parentNode
	var percent;
	percent = prompt("Please enter prgress", "0%");
	if(!(parseInt(percent.split('%')[0]) <= 100 && parseInt(percent.split('%')[0]) > 0)) {
		while(!(parseInt(percent.split('%')[0]) <= 100 && parseInt(percent.split('%')[0]) > 0)){
			percent = prompt("Please enter prgress", "0%");
				if(parseInt(percent.split('%')[0]) <= 100 && parseInt(percent.split('%')[0]) > 0)
					break;
		}
	}
	$(x).css('width', percent)
})