var TwitterWeather = function() {
	var _url = 'http://search.twitter.com/search.json?callback=?&q=';
	var _date = ' since:2009-11-10 until:2009-11-10';
	var _location = '&geocode=-122.703348%2C45.530318%2C15mi';
	var _good = [
		'sun', 'sunny',
		'warm'
	].join( ' OR ' );
	var _bad = [
		'rain', 'rainy',
		'wind', 'windy',
		'snow', 'snowy',
		'cold'
	].join( ' OR ' );
	var _positive = ' :)';
	var _negative = ' :(';
	var _goodPositiveQuery, _goodNegativeQuery, _badPositiveQuery, _badNegativeQuery;

	return {
		show: function( _zip_, _date_ ) {
			var _geocodeURL = 'http://www.geonames.org/postalCodeLookupJSON?postalcode='+_zip_+'&country=US&callback=?';
			$.getJSON( _geocodeURL, function( geocode ) {
				_location = '&geocode=' + geocode.postalcodes[0].lat + '%2C'
					+ geocode.postalcodes[0].lng + '%2C'
					+ '15mi';
				console.info( _location );
				_date = ' since:' + _date_ + ' until:' + _date_;
				_goodPositiveQuery = _url + _good + _date + _positive + _location;
				_goodNegativeQuery = _url + _good + _date + _negative + _location;
				_badPositiveQuery = _url + _bad + _date + _positive + _location;
				_badNegativeQuery = _url + _bad + _date + _negative + _location;

				console.info( _goodPositiveQuery );

				$.getJSON( _goodPositiveQuery, function( data ) {
					console.info( data );
				});
			});
		}
	};
}();
