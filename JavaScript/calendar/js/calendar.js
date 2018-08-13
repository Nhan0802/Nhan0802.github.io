window.onload = init;

function init() {
    eventAssign();
    createYearList();
}

function eventAssign() {
  document.getElementById("calendar-img").onclick = function() { showCalendar(); }
	document.getElementById("pre-year").onclick = preYear;
	document.getElementById("pre-month").onclick = preMonth;
	document.getElementById("next-year").onclick = nextYear;
	document.getElementById("next-month").onclick = nextMonth;
	document.getElementById("select-month").onchange = changeCalendar;
	document.getElementById("select-year").onchange = changeCalendar;
}

function showCalendar() {
	var cal = document.getElementById("calendar");
  if (cal.style.display != "block") {
		var today = new Date();
		var month = document.getElementById("select-month");
		var year = document.getElementById("select-year");

		month.selectedIndex = today.getMonth();
		year.selectedIndex = today.getFullYear() - 1990;
		changeCalendar();
		cal.style.display = "block";
    	}
}

/*change display to 'none'

*/
function hideCalendar() {
	var cal = document.getElementById("calendar");
	cal.style.display = "none";
}

/*change calendar's content based on new month, year

*/
function changeCalendar() {
	var x     = document.getElementById("select-month");
	var y     = document.getElementById("select-year");
	var month = x.selectedIndex;
	var year  = y.selectedIndex + 1990;

	var date = new Date(year, month);
	var tmp =  new Date(year, month + 1, 0);
	var d = new Date();

	var x = tmp.getDate() - (7 - date.getDay());
	x = x/7;
	var row = Math.ceil(x) + 1; // the row of the calendar

	clear_table();
	create_table(row, 7);

	var r = 3;
	var c = date.getDay() + 1 ;
	for (var g = 0; g < tmp.getDate(); g++) {
		//refer to <td> which is created in create_table
		var tb_cell_tmp = 
		document.querySelectorAll("#tb-calendar > tbody > tr:nth-of-type(" + r + ") > td:nth-of-type(" + c + ")");
		tb_cell_tmp[0].childNodes[0].nodeValue = g + 1;

		if (c < 7) {
			c++;
		} else {
			r++;
			c = 1;
		}
	}

	if ((month == d.getMonth()) && (year == d.getFullYear())) {
		date_highlight();
	}
}

/*create <tr>, <td> in <table>, base on the inputs: row, col

*/
function create_table(row, col) {
	for (var r = 0; r < row; r++) {
		var tb_row = document.createElement("tr");

		for (var c = 0; c < col; c++) {
			var tb_cell = document.createElement("td");
			var textnode = document.createTextNode("");
			tb_cell.appendChild(textnode);

			var func_string = "";
			func_string = "show_date(" + (r + 3) + ", " + (c + 1) + ")";
			tb_cell.setAttribute("onclick", func_string); 

			tb_row.appendChild(tb_cell);
		}

		var tb = document.getElementById("tb-calendar");
		var tb_body = tb.childNodes[1];
		tb_body.appendChild(tb_row);
	}	
}

/*clear <tr> (from the third) before create new one

*/
function clear_table() {
	var tb_row_tmp = document.querySelectorAll("#tb-calendar > tbody > tr:nth-of-type(3)");
	var tb = document.getElementById("tb-calendar");
	var tb_body = tb.childNodes[1];

	while (tb_row_tmp[0]) {
		tb_body.removeChild(tb_row_tmp[0]);
		tb_row_tmp = document.querySelectorAll("#tb-calendar > tbody > tr:nth-of-type(3)");
	}
}

/*show the date in input field when user click on the table

*/

function show_date(row, col) {
	var date_box = document.getElementById("date");
	var tb_cell_tmp = 
	document.querySelectorAll("#tb-calendar > tbody > tr:nth-of-type(" + row + ") > td:nth-of-type(" + col + ")");

	var month = document.getElementById("select-month");
	var year = document.getElementById("select-year");

 	if (tb_cell_tmp[0].childNodes[0].nodeValue != "") {
		var date_string = 
		tb_cell_tmp[0].childNodes[0].nodeValue + "/" + 
		(month.selectedIndex + 1) + "/" + (year.selectedIndex + 1990);
		date_box.value = date_string;

		hideCalendar();
	}
}

/*Functions handle the event when user click on 
the pre-year, pre-month, next-year, next-month images

*/
function preYear() {
	var month = document.getElementById("select-month");
	var year = document.getElementById("select-year");

	if (year.selectedIndex > 0) {
		year.selectedIndex--;
	} else {
		year.selectedIndex = year.length - 1 ;
	}

	changeCalendar();
}

function preMonth() {
	var month = document.getElementById("select-month");
	var year = document.getElementById("select-year");

	if (month.selectedIndex > 0) {
		month.selectedIndex--;
	} else {
		month.selectedIndex = 11;

		if (year.selectedIndex > 0) {
			year.selectedIndex--;
		} else {
			year.selectedIndex = year.length - 1 ;
		}
	}

	changeCalendar();
}

function nextYear() {
	var month = document.getElementById("select-month");
	var year = document.getElementById("select-year");

	if (year.selectedIndex < year.length - 1) {
		year.selectedIndex++;
	} else {
		year.selectedIndex = 0;
	}

	changeCalendar();
}

function nextMonth() {
	var month = document.getElementById("select-month");
	var year = document.getElementById("select-year");

	if (month.selectedIndex < 11) {
		month.selectedIndex++;
	} else {
		month.selectedIndex = 0;

		if (year.selectedIndex < year.length - 1) {
			year.selectedIndex++;
		} else {
			year.selectedIndex = year.length - 1;
		}
	}

	changeCalendar();
}

/*highlight the current date

*/

function date_highlight() {
	var today = new Date();
	var first_date = new Date(today.getFullYear(), today.getMonth());

	var x = today.getDate() - (7 - first_date.getDay());

	if (x > 0) {
		x = Math.ceil(x/7) + 3;
	} else {
		x = 3;
	}

	var row = x;
	var col = today.getDay() + 1;

	var tb_cell_tmp = 
	document.querySelectorAll("#tb-calendar > tbody > tr:nth-of-type(" + row + ") > td:nth-of-type(" + col + ")");
	tb_cell_tmp[0].style.border = "solid 2px";
	tb_cell_tmp[0].style.boxSizing = "border-box";
}

function createYearList() {

	var year = document.getElementById("select-year");

	for (var g = 0; g < 50; g++) {
		var opt = document.createElement("option");
		opt.text = 1990 + g;
		opt.value = 1990 + g;
		year.options.add(opt);
	}
}
