function getDaysInMonth(month, year) { //get names of months 
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  month -= 1;
  var m = months[month];
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date).getDate() + ' ' + m);
    date.setDate(date.getDate() +1);
  }
  return days; //return an array with all days and month name [1 Apr , 2 Apr.....]
}

function limitText(field, maxChar) {	//limit field characters
	$(field).attr('maxlength',maxChar);
}


//-----------------------------------------------------------------------------------------------
$('#subMonth').on('click', function() {
	$('.vertical').html(''); //clear html
	$('.horizontal-task').html(''); //clear html;
	var month_year = $('#month').val(); //get the month value
	var myArr = month_year.split('-');	//split year and month
	myArr = myArr.map(function(el){		//map each element from string to number
	return parseInt(el)});
	var year = myArr[0]; 				//get year
	var month = myArr[1];				//get Month
	var daysElement = getDaysInMonth(month, year); //get days & month array
	for(var i = 0; i < daysElement.length; i++) {	//loop in the array and create li elements
		var newli = $('<li>' + daysElement[i] +'</li>')	//create li element with text of element
		var day = daysElement[i].split(" ");			//split to get the day
		day = day[0];				
		if(day.length === 1)							//if length is 1 add 0 so it's 01
		day = '0' + day;
		var attr = month_year + '-' + day;				//create attr called day with day-month-year
		newli.attr('day', attr);						//each li will have unique attr val
		newli.appendTo('.vertical');					//append it to vertical container	
	}
	var minDay = month_year + '-0' + daysElement[0].split(" ")[0];	//minDay first day in a month
	var maxDay = month_year + '-' + daysElement[daysElement.length - 1].split(" ")[0]; //Last day
	$('#from').attr('min', minDay);	//adjust from datepicket min attr to minDay
	$('#from').attr('max', maxDay);	//adjust from datepicket max attr to maxDay
	$('#to').attr('max', maxDay);	//adjust to datepicket max attr to maxDay so it's only within this month
	$('.content .vertical').css({'border-radius': '14px', 'border-bottom-style': 'solid', 'border-bottom-color': 'grey', 'border-top-style': 'solid', 'border-top-color': '#C6C3C1'}) //style the border
})


$("#from").change(function() { //if from is selected adjust to so it's after it
	var min = $("#from").val();	//min attr of To will start from min of from
    $('#to').attr('min', min);
})


$("#to").change(function(){
	if($("#from").val() == $('#to').val())	//only one day possibility was taken ito account!
		limitText('#tlabel', 4)
	else
		$('#tlabel').attr('maxlength', 20)	//however taskname shouldn't exceed 20characters
})


$("#task").on("click", function() {//submit task
	 if($('.vertical').html() === '')
		return alert('Submit month first!')
	else if($("#tlabel").val() == '')	//check for empty values
		return alert('Enter a Task!')
	else if( $("#from").val() == '' || $("#to").val() == '')
		return alert('Enter dates!')
	else if(parseInt($("#to").val().split('-')[2]) - parseInt($("#from").val().split('-')[2]) < 0)
		return alert('Wrong Dates!')	//Or wrong dates
	const days = document.querySelectorAll(".content .vertical li");//get all month days in array
	const daysArray = [...days];	//create a clone
	const fromlabel = document.querySelectorAll("#from");//select tlabel to ajust the placement of tasks according to it
	var color = $("#color").val(); //get color value "team name"
	var taskName = $("#tlabel").val();	//taskName
	var from =	$("#from").val();	//from date
	var to = $("#to").val();	//to date
	var attr = from + taskName.split(" ").join("") + to //create unique attr for each task
	var newul = $('<div><ul><li>' + taskName + '</li></ul></div>');	//div container, ul to control progress, li to hold text
	newul.attr('duration', attr);//add attr;
	$(newul).appendTo('.horizontal-task');
	var filteredArray = daysArray.filter(el => el.attributes.day.value == from);//filter array using from
	var left = filteredArray[0].offsetLeft - 8; //left placement of task "8 for adjustment"
 	var filteredArray = daysArray.filter(el => el.attributes.day.value == to);	//filter array using to
 	var width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left - 10;	//calulate width of task
 	var bottom = fromlabel[0].offsetTop + 670;	//scaling with help of from label	
 	var selectAttrdiv = "div[duration = " + attr + "]";	//Define selectors
	var selectAttrul = "div[duration = " + attr + "] ul";
	var selectAttrli = "div[duration = " + attr + "] ul li";
	$(selectAttrdiv).css({'left': left,'width': width, 'bottom': bottom, 'background-color': color, 'filter': 'brightness(130%)','padding': '0px', 'border-radius': '10px'}) //div css
	$(selectAttrul).css ({ 'width': '0px', 'padding': '10px 0px 10px 0','background-color':color, 'filter': 'brightness(80%)', 'border-radius': '10px', 'text-align': 'center'}) //ul css
	$(selectAttrli).css({'color':'black','text-align': 'center', 'display': 'inline-block', 'width': width}) //li css
});

$('.horizontal-task').on('click', function(){//Adding progress percentage
	var x = event.target.parentNode; //get parent node of clicked item
	var percent = prompt("Please enter prgress", "0%"); //promote enter percentage
	if(!(parseInt(percent.split('%')[0]) <= 100 && parseInt(percent.split('%')[0]) > 0)) {//if it's not a valid input
		while(!(parseInt(percent.split('%')[0]) <= 100 && parseInt(percent.split('%')[0]) > 0)){ //use while loop to promote input again
			percent = prompt("Please enter prgress", "0%");
				if(parseInt(percent.split('%')[0]) <= 100 && parseInt(percent.split('%')[0]) > 0)//if it's valid
					break;	//break the loop
		}
	}
	$(x).css('width', percent)//modify the parent element (ul) width with percentage
})