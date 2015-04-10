jQuery(document).ready(function($) {
	init();
});

function init () {
	$.bmdata = {};
	load_systems();
	load_stations();
}

$("#current_system").submit(function(e) {
	e.preventDefault();

	var start_system = $("#start_system").val();
	var radius = 25; // $("#ly_radius").val();

	if(check_system(start_system))
	{
		console.log("Cur system: " + start_system);
		console.log("Radius: " + radius);
		var systems = [];
		systems = get_systems_within_radius(start_system, radius);
	}
	else
	{
		console.log(start_system + " doesn't exist");
		//Add feedback to user
	}
});

function get_systems_within_radius (current_system, radius) {
	var current_system_data = [];
	var systems_within_radius = {};

	current_system_data = getObjects($.bmdata.systems, 'name', current_system);
	$.each($.bmdata.systems, function(index, system) {

		if( is_system_within_radius(current_system_data[0], system, radius) )
		{
			$(systems_within_radius).push(system);
		}
	});
	console.log("Systems within radius: " + systems_within_radius.length);
	console.log(systems_within_radius);
}
function is_system_within_radius (cur_system, system, radius) {
	vector = Math.sqrt( Math.pow((system.x - cur_system.x), 2) + Math.pow((system.y - cur_system.y), 2) + Math.pow((system.z - cur_system.z), 2));
	if(radius > vector && system.id != cur_system.id)
	{
		console.log(system);
		console.log(vector);
		return true;
	}
	return false;
}
function load_systems() {
	$.bmdata = { systems:[] };
	$.getJSON('assets/systems.json', function (data) {
		$.bmdata.systems = data
	});
}
function load_stations() {
	$.bmdata = { stations:[] };
	$.getJSON('assets/stations_lite.json', function (data) {
		$.bmdata.stations = data
	});
}
function check_system (system_name) {
	if (getObjects($.bmdata.systems, 'name', system_name).length > 0){
		return true;
	}
	return false;
}
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}