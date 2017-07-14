(function () {
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
	
}());

$('#age-calculator').on('submit',function () {
	var from_age =  $("#from_age").val();
    var from_parts = from_age.split('-');
	var to_age = $("#to_age").val();
    var to_parts = to_age.split('-');
    
    var result_age = $("#result_age");
    
    var from_date=new Date(to_parts[0],to_parts[1], to_parts[2]);
    var to_date= new Date(from_parts[0],from_parts[1], from_parts[2]);
	
    if(from_date>=to_date){
		 var ageDifMs = from_date - to_date;
		 console.log(ageDifMs);
		 var ageDate = new Date(ageDifMs); 
		 console.log(ageDate);
		 result_age.html(Math.abs(ageDate.getUTCFullYear() - 1970)); 
    }
    else{
		 result_age.html("You are unborn"); 
    }
	 
	return false;
});


$('#form-calculator').on('submit',function () {
	var from_day=$("#from_day").val();
	var from_hour=$("#from_hour").val();
	var from_minute=$("#from_minute").val();
	var from_second=$("#from_second").val();
	
	var ops=$("#ops:checked").val();
	
	var to_day=$("#to_day").val();
	var to_hour=$("#to_hour").val();
	var to_minute=$("#to_minute").val();
	var to_second=$("#to_second").val();
	
	var result_day=$("#result_day");
	var result_hour=$("#result_hour");
	var result_minute=$("#result_minute");
	var result_second=$("#result_second");

	
	var from_time=from_day+":"+from_hour+":"+from_minute+":"+from_second;
	var to_time=to_day+":"+to_hour+":"+to_minute+":"+to_second;
	
	var total=0;
	var result="";
	var isMin=false;
	
	if(ops=="plus"){
		total = toSeconds(from_time) + toSeconds(to_time);
	}
	else if(ops=="min"){
		if(toSeconds(from_time) > toSeconds(to_time)){
			isMin=false;
			total = toSeconds(from_time) - toSeconds(to_time);
		}
		else{
			isMin=true;
			total = toSeconds(to_time) - toSeconds(from_time);
		}
	}

	result = toHHMMSS(total);

    var parts = result.split(':');
    
    if(isMin){
        result_day.html((parts[0]!=0) ? "-"+parts[0] : parts[0]);
        result_hour.html((parts[1]!=0) ? "-"+parts[1] : parts[1]);
        result_minute.html((parts[2]!=0) ? "-"+parts[2] : parts[2]);
        result_second.html((parts[3]!=0) ? "-"+parts[3] : parts[3]);
    }
    else{
        result_day.html(parts[0]);
        result_hour.html(parts[1]);
        result_minute.html(parts[2]);
        result_second.html(parts[3]);	
    }
    
	return false;
});


function toSeconds( time ) {
    var parts = time.split(':');
    return (+parts[0]) * 24 * 60 * 60 + (+parts[1]) * 60 * 60 + (+parts[2]) * 60 + (+parts[3]); 
}

function toHHMMSS(sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second parm
    var days   	= Math.floor(sec_num / 86400);
    var hours   = Math.floor((sec_num - (days * 86400)) / 3600);
    var minutes = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60);
    var seconds = sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);

    if (days   < 10 && days >= 0) {days   = "0"+days;}
    if (hours   < 10 && hours >= 0) {hours   = "0"+hours;}
    if (minutes < 10 && minutes >= 0) {minutes = "0"+minutes;}
    if (seconds < 10 && seconds >= 0) {seconds = "0"+seconds;}
    var time    = days+':'+hours+':'+minutes+':'+seconds;
    return time;
}