'use strict';

const evaluate = require( '../src/evaluate.js' );
const normalize = require( '../src/normalize.js' );
const canonicalize = require( '../src/canonicalize.js' );
const error = require( '../src/error.js' );

const rep = ( x ) => canonicalize( evaluate( normalize( x ) ) );

QUnit.module( 'evaluate' );

QUnit.test( 'string literal', ( assert ) => {
	assert.deepEqual(
		rep( 'test' ),
		'test',
		'string literal'
	);
} );

QUnit.test( 'call to head', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				K1: [ 'a' ]
			}
		),
		'a',
		'call to head'
	);
} );

QUnit.test( 'nested call to head', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				K1: [
					{
						Z1K1: 'Z7',
						Z7K1: 'Z31',
						K1: [ 'a' ]
					}
				]
			}
		),
		'a',
		'nested call to head'
	);
} );

QUnit.test( 'call to head using global key', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				Z31K1: [ 'a' ]
			}
		),
		'a',
		'nested call to head'
	);
} );

QUnit.test( 'call to head on empty list', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				K1: [
					{
						Z1K1: 'Z7',
						Z7K1: 'Z31',
						K1: [ ]
					}
				]
			}
		).Z5K1.Z1K1,
		error.nil,
		'nested call to head'
	);
} );

QUnit.test( 'call bad reference', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z9',
				Z9K1: 'Z48573'
			}
		).Z5K1.Z1K1,
		'Z404',
		'call bad reference'
	);
} );

QUnit.test( 'evaluate an error', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z5',
				Z5K1: {
					Z1K1: 'Z404',
					Z404K1: 'Z48573'
				}
			}
		),
		{
			Z1K1: 'Z5',
			Z5K1: {
				Z1K1: 'Z404',
				Z404K1: 'Z48573'
			}
		},
		'should stay unchanged'
	);
} );

QUnit.test( 'is a Z6', ( assert ) => {
	assert.true(
		evaluate.is(
			'Z6',
			normalize( {
				Z1K1: 'Z6',
				Z6K1: 'test'
			} )
		),
		'is a Z6'
	);
} );

QUnit.test( 'is not a Z6', ( assert ) => {
	assert.false(
		evaluate.is(
			'Z6',
			normalize( {
				Z1K1: 'Z9',
				Z9K1: 'Z6'
			} )
		),
		'is not a Z6'
	);
} );

QUnit.test( 'is not a Z1', ( assert ) => {
	assert.false(
		evaluate.is(
			'Z1',
			normalize( {
				Z1K1: 'Z6',
				Z6K1: 'test'
			} )
		),
		'is not a Z1'
	);
} );

QUnit.test( 'is a Z6 as full reference', ( assert ) => {
	assert.true(
		evaluate.is(
			'Z6',
			normalize( {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z6'
				},
				Z6K1: 'test'
			} )
		),
		'is a Z6 as full reference'
	);
} );

QUnit.test( 'is a Z6 as double nested reference', ( assert ) => {
	assert.true(
		evaluate.is(
			'Z6',
			normalize( {
				Z1K1: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z9'
					},
					Z9K1: 'Z6'
				},
				Z6K1: 'test'
			} )
		),
		'is a Z6 as double nested reference'
	);
} );

QUnit.test( 'is a Z6 with function', ( assert ) => {
	assert.true(
		evaluate.is(
			'Z6',
			normalize( {
				Z1K1: {
					Z1K1: 'Z7',
					Z7K1: 'Z31',
					Z31K1: [ 'Z6' ]
				},
				Z6K1: 'test'
			} )
		),
		'is a Z6 with function'
	);
} );

QUnit.test( 'is a Z6 as full type', ( assert ) => {
	assert.true(
		evaluate.is(
			'Z6',
			normalize( {
				Z1K1: {
					Z1K1: 'Z4',
					Z4K1: 'Z6',
					Z4K2: [
						{
							Z1K1: 'Z3',
							Z3K1: 'Z6',
							Z3K2: 'Z6K1',
							Z3K3: {
								Z1K1: 'Z12',
								Z12K1: [ ]
							}
						}
					]
				},
				Z6K1: 'test'
			} )
		),
		'is a Z6 as full type'
	);
} );

QUnit.test( 'is a Z6 as full type with reference', ( assert ) => {
	assert.true(
		evaluate.is(
			'Z6',
			normalize( {
				Z1K1: {
					Z1K1: 'Z4',
					Z4K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z6'
					},
					Z4K2: [
						{
							Z1K1: 'Z3',
							Z3K1: 'Z6',
							Z3K2: 'Z6K1',
							Z3K3: {
								Z1K1: 'Z12',
								Z12K1: [ ]
							}
						}
					]
				},
				Z6K1: 'test'
			} )
		),
		'is a Z6 as full type with reference'
	);
} );

QUnit.test( 'has Z60K1', ( assert ) => {
	assert.true(
		evaluate.has(
			'Z60', 'K1',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test'
			} )
		),
		'has Z60K1'
	);
} );

QUnit.test( 'has not Z60K2', ( assert ) => {
	assert.false(
		evaluate.has(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test'
			} )
		),
		'has not Z60K2'
	);
} );

QUnit.test( 'has Z60K2, skipped K1', ( assert ) => {
	assert.true(
		evaluate.has(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				Z60K2: 'test'
			} )
		),
		'has Z60K2'
	);
} );

QUnit.test( 'has K1', ( assert ) => {
	assert.true(
		evaluate.has(
			'Z60', 'K1',
			normalize( {
				Z1K1: 'Z60',
				K1: 'test'
			} )
		),
		'has K1'
	);
} );

QUnit.test( 'has not K2', ( assert ) => {
	assert.false(
		evaluate.has(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				K1: 'test'
			} )
		),
		'has not K2'
	);
} );

QUnit.test( 'mixed global and local, has K2', ( assert ) => {
	assert.true(
		evaluate.has(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test',
				K2: 'test'
			} )
		),
		'mixed global and local, has K2'
	);
} );

QUnit.test( 'mixed global and local, has not K3', ( assert ) => {
	assert.false(
		evaluate.has(
			'Z60', 'K3',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test',
				K2: 'test'
			} )
		),
		'mixed global and local, has not K3'
	);
} );

QUnit.test( 'reference has Z4K1', ( assert ) => {
	assert.true(
		evaluate.has(
			'Z4', 'K1',
			normalize( 'Z4' )
		),
		'reference has Z4K1'
	);
} );

QUnit.test( 'reference has not Z4K8', ( assert ) => {
	assert.false(
		evaluate.has(
			'Z4', 'K8',
			normalize( 'Z4' )
		),
		'reference has not Z4K1'
	);
} );

QUnit.test( 'function call has Z4K1', ( assert ) => {
	assert.true(
		evaluate.has(
			'Z4', 'K1',
			normalize( {
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				Z31K1: [ 'Z4', 'Z6' ]
			} )
		),
		'function call has Z4K1'
	);
} );

QUnit.test( 'get Z60K1', ( assert ) => {
	assert.deepEqual(
		evaluate.get(
			'Z60', 'K1',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test'
			} )
		),
		normalize( 'test' ),
		'get Z60K1'
	);
} );

QUnit.test( 'get Z60K2', ( assert ) => {
	assert.equal(
		evaluate.get(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test'
			} )
		).Z1K1,
		'Z5',
		'get Z60K2'
	);
} );

QUnit.test( 'get Z60K2, skipped K1', ( assert ) => {
	assert.deepEqual(
		evaluate.get(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				Z60K2: 'test'
			} )
		),
		normalize( 'test' ),
		'get Z60K2, skipped K1'
	);
} );

QUnit.test( 'get K1', ( assert ) => {
	assert.deepEqual(
		evaluate.get(
			'Z60', 'K1',
			normalize( {
				Z1K1: 'Z60',
				K1: 'test'
			} )
		),
		normalize( 'test' ),
		'get K1'
	);
} );

QUnit.test( 'get not K2', ( assert ) => {
	assert.equal(
		evaluate.get(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				K1: 'test'
			} )
		).Z1K1,
		'Z5',
		'get not K2'
	);
} );

QUnit.test( 'mixed global and local, get K2', ( assert ) => {
	assert.deepEqual(
		evaluate.get(
			'Z60', 'K2',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test',
				K2: 'test'
			} )
		),
		normalize( 'test' ),
		'mixed global and local, get K2'
	);
} );

QUnit.test( 'mixed global and local, get not K3', ( assert ) => {
	assert.equal(
		evaluate.get(
			'Z60', 'K3',
			normalize( {
				Z1K1: 'Z60',
				Z60K1: 'test',
				K2: 'test'
			} )
		).Z1K1,
		'Z5',
		'mixed global and local, get not K3'
	);
} );

QUnit.test( 'reference get Z4K1', ( assert ) => {
	assert.deepEqual(
		evaluate.get(
			'Z4', 'K1',
			normalize( 'Z4' )
		),
		normalize( 'Z4' ),
		'reference get Z4K1'
	);
} );

QUnit.test( 'reference get not Z4K8', ( assert ) => {
	assert.equal(
		evaluate.get(
			'Z4', 'K8',
			normalize( 'Z4' )
		).Z1K1,
		'Z5',
		'reference get not Z4K1'
	);
} );

QUnit.test( 'function call get Z4K1', ( assert ) => {
	assert.deepEqual(
		evaluate.get(
			'Z4', 'K1',
			normalize( {
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				Z31K1: [ 'Z4', 'Z6' ]
			} )
		),
		normalize( 'Z4' ),
		'function call get Z4K1'
	);
} );

QUnit.test( 'resolve Z101', ( assert ) => {
	assert.deepEqual(
		rep( 'Z101' ),
		'test',
		'resolve Z101'
	);
} );

QUnit.test( 'resolve Z1234434', ( assert ) => {
	assert.deepEqual(
		rep( 'Z1234434' ).Z1K1,
		'Z5',
		'resolve Z1234434'
	);
} );

QUnit.test( 'global arguments in lambda function', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: {
					Z1K1: 'Z8',
					Z8K1: [ {
						Z1K1: 'Z17',
						Z17K1: 'Z10',
						Z17K2: 'Z31K1'
					} ],
					Z8K2: 'Z1',
					Z8K3: [],
					Z8K4: [ {
						Z1K1: 'Z14',
						Z14K1: {
							Z1K1: 'Z8',
							Z8K1: [ {
								Z1K1: 'Z17',
								Z17K1: 'Z10',
								Z17K2: 'Z31K1'
							} ],
							Z8K2: 'Z1',
							Z8K3: []
						},
						Z14K4: 'B1'
					} ]
				},
				K1: [ 'a' ]
			}
		),
		'a',
		'global arguments in lambda function'
	);
} );

QUnit.test( 'local arguments in lambda function', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: {
					Z1K1: 'Z8',
					Z8K1: [ {
						Z1K1: 'Z17',
						Z17K1: 'Z10',
						Z17K2: 'K1'
					} ],
					Z8K2: 'Z1',
					Z8K3: [],
					Z8K4: [ {
						Z1K1: 'Z14',
						Z14K1: {
							Z1K1: 'Z8',
							Z8K1: [ {
								Z1K1: 'Z17',
								Z17K1: 'Z10',
								Z17K2: 'Z31K1'
							} ],
							Z8K2: 'Z1',
							Z8K3: []
						},
						Z14K4: 'B1'
					} ]
				},
				K1: [ 'a' ]
			}
		),
		'a',
		'local arguments in lambda function'
	);
} );

QUnit.test( 'global arguments in lambda function, global in call', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: {
					Z1K1: 'Z8',
					Z8K1: [ {
						Z1K1: 'Z17',
						Z17K1: 'Z10',
						Z17K2: 'Z31K1'
					} ],
					Z8K2: 'Z1',
					Z8K3: [],
					Z8K4: [ {
						Z1K1: 'Z14',
						Z14K1: {
							Z1K1: 'Z8',
							Z8K1: [ {
								Z1K1: 'Z17',
								Z17K1: 'Z10',
								Z17K2: 'Z31K1'
							} ],
							Z8K2: 'Z1',
							Z8K3: []
						},
						Z14K4: 'B1'
					} ]
				},
				Z31K1: [ 'a' ]
			}
		),
		'a',
		'global arguments in lambda function, global in call'
	);
} );

QUnit.test( 'bad builtin X1', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: {
					Z1K1: 'Z8',
					Z8K1: [ {
						Z1K1: 'Z17',
						Z17K1: 'Z10',
						Z17K2: 'K1'
					} ],
					Z8K2: 'Z1',
					Z8K3: [],
					Z8K4: [ {
						Z1K1: 'Z14',
						Z14K1: {
							Z1K1: 'Z8',
							Z8K1: [ {
								Z1K1: 'Z17',
								Z17K1: 'Z10',
								Z17K2: 'Z31K1'
							} ],
							Z8K2: 'Z1',
							Z8K3: []
						},
						Z14K4: 'X1'
					} ]
				},
				K1: [ 'a' ]
			}
		).Z5K1.Z1K1,
		error.builtin_id_error,
		'bad builtin X1'
	);
} );

QUnit.test( 'bad builtin head', ( assert ) => {
	assert.equal(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: {
					Z1K1: 'Z8',
					Z8K1: [ {
						Z1K1: 'Z17',
						Z17K1: 'Z10',
						Z17K2: 'K1'
					} ],
					Z8K2: 'Z1',
					Z8K3: [],
					Z8K4: [ {
						Z1K1: 'Z14',
						Z14K1: {
							Z1K1: 'Z8',
							Z8K1: [ {
								Z1K1: 'Z17',
								Z17K1: 'Z10',
								Z17K2: 'Z31K1'
							} ],
							Z8K2: 'Z1',
							Z8K3: []
						},
						Z14K4: 'head'
					} ]
				},
				K1: [ 'a' ]
			}
		).Z5K1.Z1K1,
		error.builtin_id_error,
		'bad builtin head'
	);
} );

QUnit.test( 'builtin does not exist', ( assert ) => {
	assert.equal(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: {
					Z1K1: 'Z8',
					Z8K1: [ {
						Z1K1: 'Z17',
						Z17K1: 'Z10',
						Z17K2: 'K1'
					} ],
					Z8K2: 'Z1',
					Z8K3: [],
					Z8K4: [ {
						Z1K1: 'Z14',
						Z14K1: {
							Z1K1: 'Z8',
							Z8K1: [ {
								Z1K1: 'Z17',
								Z17K1: 'Z10',
								Z17K2: 'Z31K1'
							} ],
							Z8K2: 'Z1',
							Z8K3: []
						},
						Z14K4: 'B12345'
					} ]
				},
				K1: [ 'a' ]
			}
		).Z5K1.Z1K1,
		error.builtin_does_not_exist,
		'builtin does not exist'
	);
} );

QUnit.test( 'competing keys', ( assert ) => {
	assert.deepEqual(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				Z31K1: [ 'a' ],
				K1: [ 'a' ]
			}
		).Z5K1.Z1K1,
		error.competing_keys,
		'competing keys'
	);
} );

QUnit.test( 'head(tail(["a", "b"]))', ( assert ) => {
	assert.equal(
		rep(
			{
				Z1K1: 'Z7',
				Z7K1: 'Z31',
				K1: [
					{
						Z1K1: 'Z7',
						Z7K1: 'Z32',
						K1: [ 'a', 'b' ]
					}
				]
			}
		),
		'b',
		'head(tail(["a", "b"]))'
	);
} );
