function addMap(){

var markerIcon = L.Icon.extend({
    	options: {
		    iconSize:     [30, 35], // size of the icon
		    iconAnchor:   [15, 17], // point of the icon which will correspond to marker's location
		    popupAnchor:  [0, 0], // point from which the popup should open relative to the iconAnchor
		}
	});
	
	cityicon = new markerIcon({iconUrl: 'img/marker.png'}),

    window.map = new L.Map('map',{zoom:15});
	var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/12fa93de2280446daf38f8c312293b43/116798/256/{z}/{x}/{y}.png',
	    cloudmadeAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
	    cloudmade = new L.TileLayer(cloudmadeUrl, {

	        attribution: cloudmadeAttribution
	    });
	    var calendar = new L.LatLng(0.00000, 0.00000);
			map.setView(calendar, 3).addLayer(cloudmade);
			addCityIcons();
}

var marker = 0;
var selectedCities = [];

function addCityIcons(){
	for(i=0; i<staddata.length; i+=12){
		var tempstad = staddata[i][0];
		var templand = staddata[i][1];
		var templat = staddata[i][2];
		var templong = staddata[i][3];
		var tempimg = staddata[i][7];
		marker = L.marker([templat,templong], {icon: cityicon, zIndexOffset: 100, opacity:1}).addTo(map).bindPopup("<span id=popupTekst><span id=popupTitel>" + tempstad + " (" + templand + ")</span><br><img src='" + tempimg + "'><br><a href='#' onclick=\"selectCity('" + tempstad + "');\">Selecteer <b>" + tempstad + "</b> om te vergelijken</a></span>");
	}
}

function selectCity(stad){
	if(selectedCities.length < 2){
		selectedCities.push(stad);
		$('select[id="dropdown1"]').find('option[value="' + selectedCities[0] + '"]').attr("selected",true);
		$('select[id="dropdown2"]').find('option[value="' + selectedCities[1] + '"]').attr("selected",true);
	}
	if(selectedCities.length == 2){
		var stad1 = selectedCities[0];
		var stad2 = selectedCities[1];
		if(stad1 == stad2){
			alert("Kies 2 verschillende steden");
		}
		else{
			$('select[id="dropdown1"]').find('option[value="' + stad1 + '"]').attr("selected",true);
			$('select[id="dropdown2"]').find('option[value="' + stad2 + '"]').attr("selected",true);
			$("#chart1 #charttitle").html(stad1);
			$("#chart2 #charttitle").html(stad2);
			$("#vergelijk").animate({"top":70},1000);
			setTimeout(function(){
				drawChart(stad1,chart1);
				drawChart(stad2,chart2);
			},600);
			open = true;
		}
		selectedCities = [];
	}
}