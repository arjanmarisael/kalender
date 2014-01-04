var stad1 = "";
var stad2 = "";
var chart1 = "myChart1";
var chart2 = "myChart2";
var open = false;

var steden = [];
var maanden = [];
var tijden = [];

var stapdata = 0;
var lengtedata = 11;
var data = [];

$(document).ready(function(){

	for(i=0;i<=11;i++){
		var tempmaand = staddata[i][4];
		maanden.push(tempmaand);
	}

	for(n=0;n<=24;n++){
		var temptijden = [];
		for(i=stapdata;i<=lengtedata;i++){
			var tempzonsopkomst = staddata[i][5];
			var tempzonsondergang = staddata[i][6];
			temptijden.push([tempzonsopkomst,tempzonsondergang]);
		}
		tijden.push(temptijden);
		lengtedata += 12;
		stapdata = lengtedata - 11;
	}

	var temp = 0;
	for(i=0;i<staddata.length; i+=12){
		var tempstad = staddata[i][0];
		var templand = staddata[i][1];
		$("#dropdown1").append('<option value="'+ tempstad +'">'+ tempstad +' ('+ templand + ')</option>');
		$("#dropdown2").append('<option value="'+ tempstad +'">'+ tempstad +' ('+ templand + ')</option>');
		steden.push([tempstad, maanden, tijden[temp]]);
		temp +=1;
	}
	

	$("#dropdown1").change(function() {
		stad1 = $("#dropdown1 option:selected").val();
		$("#chart1 #charttitle").html(stad1);
		if(open == true){
			drawChart(stad1,chart1);
		}
	});
	
	$("#dropdown2").change(function() {
		stad2 = $("#dropdown2 option:selected").val();
		$("#chart2 #charttitle").html(stad2);
		if(open == true){
			drawChart(stad2,chart2);
		}
	});
});

function drawChart(stad,chart){
	var ctx = $("#"+ chart).get(0).getContext("2d");
	var myNewChart = new Chart(ctx);
	var dataZonsopkomst = [];
	var dataZonsondergang = [];

	for(i=0;i<steden.length;i++){
		if(stad == steden[i][0]){
			for(n=0;n<12;n++){
				dataZonsopkomst.push(steden[i][2][n][0]);
				dataZonsondergang.push(steden[i][2][n][1]);
			}
		}
	}
	var data = {
		labels : ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus", "September","Oktober","November","December"],
		datasets : [
			{
				fillColor : "rgba(29, 29, 27, 1)",
				strokeColor : "rgba(255,102,0,0.5)",
				pointColor : "rgba(255,90,0,0.5)",
				pointStrokeColor : "#fff",
				data : [1,1,1,1,1,1,1,1,1,1,1,1]
			},
			{
				fillColor : "rgba(255, 94, 0, 1)",
				strokeColor : "rgba(255,102,0,0.9)",
				pointColor : "rgba(250,90,0,0.9)",
				pointStrokeColor : "#fff",
				data : dataZonsondergang
			},
			{
				fillColor : "rgba(29, 29, 27, 1)",
				strokeColor : "rgba(255,102,0,0.9)",
				pointColor : "rgba(255,90,0,0.9)",
				pointStrokeColor : "#fff",
				data : dataZonsopkomst
			}
			
		]
	}

	var options = {
					
		//Boolean - If we show the scale above the chart data			
		scaleOverlay : true,
		
		//Boolean - If we want to override with a hard coded scale
		scaleOverride : true,
		
		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		//scaleSteps : 10,
		scaleSteps: 0.10,
		//Number - The value jump in the hard coded scale
		//scaleStepWidth : 8600,
		scaleStepWidth : 10,
		//Number - The centre starting value
		scaleStartValue : 0,
		
		//Boolean - Whether to show lines for each scale point
		scaleShowLine : true,

		//String - Colour of the scale line	
		scaleLineColor : "rgba(0,0,0,.1)",
		
		//Number - Pixel width of the scale line	
		scaleLineWidth : 1,

		//Boolean - Whether to show labels on the scale	
		scaleShowLabels : true,
		
		//Interpolated JS string - can access value
		scaleLabel : "<%=value%>",
		
		//String - Scale label font declaration for the scale label
		scaleFontFamily : "'Arial'",
		
		//Number - Scale label font size in pixels	
		scaleFontSize : 12,
		
		//String - Scale label font weight style	
		scaleFontStyle : "normal",
		
		//String - Scale label font colour	
		scaleFontColor : "#666",
		
		//Boolean - Show a backdrop to the scale label
		scaleShowLabelBackdrop : true,
		
		//String - The colour of the label backdrop	
		scaleBackdropColor : "rgba(255,255,255,0.8)",
		
		//Number - The backdrop padding above & below the label in pixels
		scaleBackdropPaddingY : 2,
		
		//Number - The backdrop padding to the side of the label in pixels	
		scaleBackdropPaddingX : 2,
		
		//Boolean - Whether we show the angle lines out of the radar
		angleShowLineOut : true,
		
		//String - Colour of the angle line
		angleLineColor : "rgba(0,0,0,.1)",
		
		//Number - Pixel width of the angle line
		angleLineWidth : 1,			
		
		//String - Point label font declaration
		pointLabelFontFamily : "'Arial'",
		
		//String - Point label font weight
		pointLabelFontStyle : "normal",
		
		//Number - Point label font size in pixels	
		pointLabelFontSize : 12,
		
		//String - Point label font colour	
		pointLabelFontColor : "#666",
		
		//Boolean - Whether to show a dot for each point
		pointDot : true,
		
		//Number - Radius of each point dot in pixels
		pointDotRadius : 3,
		
		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,
		
		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,
		
		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,
		
		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,
		
		//Boolean - Whether to animate the chart
		animation : true,

		//Number - Number of animation steps
		animationSteps : 60,
		
		//String - Animation easing effect
		animationEasing : "easeOutQuart",

		//Function - Fires when the animation is complete
		onAnimationComplete : null
		
	}

	new Chart(ctx).Radar(data, options);
}