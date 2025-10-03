const MM23_CSV = "https://www.ons.gov.uk/generator?format=csv&uri=/economy/inflationandpriceindices/timeseries/l522/mm23"

export async function get_dataset() {
	return {
		name: "Consumer Price Index",
		license: "Contains public sector information licensed under the Open Government Licence v3.0.",

	}
}