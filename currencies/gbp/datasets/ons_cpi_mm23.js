// const MM23_CSV = "https://www.ons.gov.uk/generator?format=csv&uri=/economy/inflationandpriceindices/timeseries/l522/mm23"
const MM23_CSV = "./currencies/gbp/datasets/series-041025.csv"

function month_number(month_str) {
	switch (month_str) {
		case "JAN": return 0;
		case "FEB": return 1;
		case "MAR": return 2;
		case "APR": return 3;
		case "MAY": return 4;
		case "JUN": return 5;
		case "JUL": return 6;
		case "AUG": return 7;
		case "SEP": return 8;
		case "OCT": return 9;
		case "NOV": return 10;
		case "DEC": return 11;
	}
	return NaN;
}

function month_midpoint(year, month) {
	let start_month = new Date(year, month).getTime() / 100000;
	let end_month = new Date(year, month + 1).getTime() / 100000;
	let mid_month = (start_month + end_month) / 2;
	return mid_month;
}

async function parse_dataset() {
	let data = await fetch(MM23_CSV);
	let csv = await data.text();
	let lines = csv.split("\n");

	var data_points = [];
	for (let line of lines) {
		let [key, value] = line.split(",");
		if (key == "" || value == "") continue;
		if (key.length != 10) continue;
		let year = Number(key.substring(1, 5));
		let month = month_number(key.substring(6, 9));
		let mid_month = month_midpoint(year, month);
		let index = Number(value.substring(1, value.length - 1)) / 100;
		data_points.push({ time: mid_month, index: index });
	}

	return data_points;
}

export async function get_dataset() {
	return {
		name: "Consumer Price Index",
		link: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/l522/mm23",
		license: "Contains public sector information licensed under the Open Government Licence v3.0.",
		data: await parse_dataset()
	}
}