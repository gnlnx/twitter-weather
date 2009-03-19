var TwitterWeather = function() {
	var m_url = 'http://search.twitter.com/search.json?callback=?&q=';
	var m_date = ' since:2009-11-10 until:2009-11-10';
	var m_location = '&geocode=-122.703348%2C45.530318%2C15mi';
	var m_good = [
		'sun', 'sunny',
		'warm',
		'shining'
	].join( ' OR ' );
	var m_bad = [
		'rain', 'rainy',
		'wind', 'windy',
		'snow', 'snowy',
		'cold'
	].join( ' OR ' );
	var m_positive = ' :)';
	var m_negative = ' :(';
	var m_goodPositiveQuery, m_goodNegativeQuery, m_badPositiveQuery, m_badNegativeQuery;

	return {
		show: function( _zip_, _date_ ) {
			var _geocodeURL = 'http://www.geonames.org/postalCodeLookupJSON?postalcode='+_zip_+'&country=US&callback=?';
			$.getJSON( _geocodeURL, function( geocode ) {
				m_location = '&geocode=' + geocode.postalcodes[0].lat + '%2C'
					+ geocode.postalcodes[0].lng + '%2C'
					+ '15mi';
				console.info( m_location );
				m_date = ' since:' + _date_ + ' until:' + _date_;
				m_goodPositiveQuery = m_url + m_good + m_date + m_positive + m_location;
				m_goodNegativeQuery = m_url + m_good + m_date + m_negative + m_location;
				m_badPositiveQuery = m_url + m_bad + m_date + m_positive + m_location;
				m_badNegativeQuery = m_url + m_bad + m_date + m_negative + m_location;

				console.info( m_goodPositiveQuery );

				$.getJSON( m_goodPositiveQuery, function( data ) {
					//console.info( data );
					var tweets = data.results;
					for( t in tweets ) {
						$( 'dl#good-positive dd ul' ).append( '<li>' + tweets[t].text + '</li>' );
					}
				});
				$.getJSON( m_goodNegativeQuery, function( data ) {
					//console.info( data );
					var tweets = data.results;
					for( t in tweets ) {
						$( 'dl#good-negative dd ul' ).append( '<li>' + tweets[t].text + '</li>' );
					}
				});
				$.getJSON( m_badPositiveQuery, function( data ) {
					//console.info( data );
					var tweets = data.results;
					for( t in tweets ) {
						$( 'dl#bad-positive dd ul' ).append( '<li>' + tweets[t].text + '</li>' );
					}
				});
				$.getJSON( m_badNegativeQuery, function( data ) {
					//console.info( data );
					var tweets = data.results;
					for( t in tweets ) {
						$( 'dl#bad-negative dd ul' ).append( '<li>' + tweets[t].text + '</li>' );
					}
				});
			});
		}
	};
}();
