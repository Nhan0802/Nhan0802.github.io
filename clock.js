function time() { 
	var today = new Date(); 
	var weekday=new Array(7); 
	weekday[0]="Sunday"; 
	weekday[1]="Monday"; 
	weekday[2]="Tuesday"; 
	weekday[3]="Wednesday"; 
	weekday[4]="Thursday"; 
	weekday[5]="Friday"; 
	weekday[6]="Saturday"; 
	var day = weekday[today.getDay()]; 
	var dd = today.getDate(); 
	var mm = today.getMonth()+1; //January is 0! 
	var yyyy = today.getFullYear(); 
	var h=today.getHours(); 
	var m=today.getMinutes(); 
	var s=today.getSeconds(); 
	m=checkTime(m); 
	s=checkTime(s); 
	nowTime = h+":"+m+":"+s; 
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = day+', '+ dd+'/'+mm+'/'+yyyy; 

	tmp='<span>'+today+' | '+nowTime+'</span>'; 

	document.getElementById("clock").innerHTML=tmp; 

	clocktime=setTimeout("time()","1000","JavaScript"); 
	function checkTime(i) { 
		if (i<10) 
		{ 
			i="0" + i; 
		} 
		return i; 
	} 
}