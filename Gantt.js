

const days = document.querySelectorAll(".content .vertical li");
const daysArray = [...days];
const inu = document.querySelectorAll("#tlabel");


$("#task").on("click", function() { 
	var color = $("#color").val();
	var taskName = $("#tlabel").val();
	var from =	$("#from").val(); 
	var to = $("#to").val();
	var attr = from + '-' + to;
	var newli = $('<li>' + taskName + '</li>')
	var filteredArray = daysArray.filter(day => day.title == from);
    var left = filteredArray[0].offsetLeft - 48;
    var filteredArray = daysArray.filter(day => day.title == to);
    var width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left - 70;
    var bottom = 970 - inu[0].offsetTop;
	newli.attr('duration', attr);
	var selectAttr = "li[duration = " + attr + "]";
	newli.appendTo('.horizontal-task');

	$(selectAttr).css('left', left);
	$(selectAttr).css('width', width);
	$(selectAttr).css('bottom', bottom);
	$(selectAttr).css({'padding': '10px 10px', 'border-radius': '10px', 'text-align': 'center'})
	$(selectAttr).css('background-color', color);
	$('.horizontal-task').append('<br>')
	});