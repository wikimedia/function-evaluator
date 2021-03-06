'use strict';

const utils = require( './utils.js' );
const error = require( './error.js' );

function delistify( a ) {
	if ( a.length === 0 ) {
		return {
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			}
		};
	}
	return {
		Z1K1: {
			Z1K1: 'Z9',
			Z9K1: 'Z10'
		},
		Z10K1: normalize( a[ 0 ] ),
		Z10K2: delistify( a.slice( 1 ) )
	};
}

// the input is assumed to be a well-formed ZObject, or else the behaviour is undefined
function normalize( o ) {
	if ( utils.is_string( o ) ) {
		if ( utils.is_reference( o ) ) {
			return { Z1K1: 'Z9', Z9K1: o };
		} else {
			return { Z1K1: 'Z6', Z6K1: o };
		}
	}

	if ( utils.is_array( o ) ) {
		return delistify( o );
	}

	if ( o.Z1K1 === 'Z5' &&
		( o.Z5K1.Z1K1 === error.syntax_error || o.Z5K1.Z1K1 === error.not_wellformed ) ) {
		return o;
	}

	const keys = Object.keys( o );
	const result = {};
	for ( let i = 0; i < keys.length; i++ ) {
		if ( keys[ i ] === 'Z1K1' && ( o.Z1K1 === 'Z6' || o.Z1K1 === 'Z9' ) ) {
			result.Z1K1 = o.Z1K1;
			continue;
		}
		if ( keys[ i ] === 'Z6K1' && utils.is_string( o.Z6K1 ) ) {
			result.Z6K1 = o.Z6K1;
			continue;
		}
		if ( keys[ i ] === 'Z9K1' && utils.is_string( o.Z9K1 ) ) {
			result.Z9K1 = o.Z9K1;
			continue;
		}
		if ( keys[ i ] === 'Z10K1' && !keys.includes( 'Z10K2' ) ) {
			result.Z10K2 = normalize( [ ] );
		}
		result[ keys[ i ] ] = normalize( o[ keys[ i ] ] );
	}
	return result;
}

module.exports = normalize;
