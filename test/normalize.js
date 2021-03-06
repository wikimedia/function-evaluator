'use strict';

const normalize = require( '../src/normalize.js' );

QUnit.module( 'normalize' );

QUnit.test( 'simple string', ( assert ) => {
	assert.deepEqual( normalize( 'ab' ), { Z1K1: 'Z6', Z6K1: 'ab' }, 'simple string' );
} );

QUnit.test( 'simple reference', ( assert ) => {
	assert.deepEqual( normalize( 'Z4' ), { Z1K1: 'Z9', Z9K1: 'Z4' }, 'simple reference' );
} );

QUnit.test( 'list with empty string', ( assert ) => {
	assert.deepEqual( normalize( [ '' ] ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: '' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } }, 'list with empty string' );
} );

QUnit.test( 'list with two empty strings', ( assert ) => {
	assert.deepEqual( normalize( [ '', '' ] ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: '' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: '' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } }, 'list with two empty strings' );
} );

QUnit.test( 'list with ordered strings', ( assert ) => {
	assert.deepEqual( normalize( [ 'a', 'b' ] ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'b' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } }, 'list with ordered strings' );
} );

QUnit.test( 'list with unordered strings', ( assert ) => {
	assert.deepEqual( normalize( [ 'b', 'a' ] ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'b' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } }, 'list with unordered strings' );
} );

QUnit.test( 'list with lists', ( assert ) => {
	assert.deepEqual(
		normalize( [ [ ], [ [ ] ], [ ] ] ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				},
				Z10K1: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					},
					Z10K1: {
						Z1K1: {
							Z1K1: 'Z9',
							Z9K1: 'Z10'
						}
					},
					Z10K2: {
						Z1K1: {
							Z1K1: 'Z9',
							Z9K1: 'Z10'
						}
					}
				},
				Z10K2: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					},
					Z10K1: {
						Z1K1: {
							Z1K1: 'Z9',
							Z9K1: 'Z10'
						}
					},
					Z10K2: {
						Z1K1: {
							Z1K1: 'Z9',
							Z9K1: 'Z10'
						}
					}
				}
			}
		}, 'list with lists' );
} );

QUnit.test( 'empty string', ( assert ) => {
	assert.deepEqual( normalize( '' ), { Z1K1: 'Z6', Z6K1: '' }, 'empty string' );
} );

QUnit.test( 'string unordered', ( assert ) => {
	assert.deepEqual( normalize( 'ba' ), { Z1K1: 'Z6', Z6K1: 'ba' }, 'string unordered' );
} );

QUnit.test( 'untrimmed string left', ( assert ) => {
	assert.deepEqual( normalize( ' a' ), { Z1K1: 'Z6', Z6K1: ' a' }, 'untrimmed string left' );
} );

QUnit.test( 'untrimmed string right', ( assert ) => {
	assert.deepEqual( normalize( 'a ' ), { Z1K1: 'Z6', Z6K1: 'a ' }, 'untrimmed string right' );
} );

QUnit.test( 'untrimmed string left two', ( assert ) => {
	assert.deepEqual( normalize( '  a' ), { Z1K1: 'Z6', Z6K1: '  a' }, 'untrimmed string left two' );
} );

QUnit.test( 'untrimmed string both', ( assert ) => {
	assert.deepEqual( normalize( ' a ' ), { Z1K1: 'Z6', Z6K1: ' a ' }, 'untrimmed string both' );
} );

QUnit.test( 'empty record', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z1' } ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z1' } }, 'empty record' );
} );

QUnit.test( 'simple record', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z60', Z60K1: 'a' } ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z60' }, Z60K1: { Z1K1: 'Z6', Z6K1: 'a' } }, 'simple record' );
} );

QUnit.test( 'escaped string', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z6', Z6K1: 'Z6' } ), { Z1K1: 'Z6', Z6K1: 'Z6' }, 'escaped string' );
} );

QUnit.test( 'unneccessary escaped string', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z6', Z6K1: 'Z' } ), { Z1K1: 'Z6', Z6K1: 'Z' }, 'unneccessary escaped string' );
} );

QUnit.test( 'escaped string QID', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z6', Z6K1: 'Q42' } ), { Z1K1: 'Z6', Z6K1: 'Q42' }, 'escaped string QID' );
} );

QUnit.test( 'unneccessary escaped string key', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z6', Z6K1: 'Z1K1' } ), { Z1K1: 'Z6', Z6K1: 'Z1K1' }, 'unneccessary escaped string key' );
} );

QUnit.test( 'unneccessary escaped string key with whitespace', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z6', Z6K1: ' Z1' } ), { Z1K1: 'Z6', Z6K1: ' Z1' }, 'unneccessary escaped string key with whitespace' );
} );

QUnit.test( 'unneccessary double escaped string', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z6', Z6K1: { Z1K1: 'Z6', Z6K1: 'Z' } } ), { Z1K1: 'Z6', Z6K1: { Z1K1: 'Z6', Z6K1: 'Z' } }, 'unneccessary double escaped string' );
} );

QUnit.test( 'string with wrong key', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z6', Z6K2: 'Z' } ), { Z1K1: 'Z6', Z6K2: { Z1K1: 'Z6', Z6K1: 'Z' } }, 'string with wrong key' );
} );

QUnit.test( 'array with escaped string', ( assert ) => {
	assert.deepEqual(
		normalize( [ { Z1K1: 'Z6', Z6K1: 'Z6' }, { Z1K1: 'Z6', Z6K1: 'Z' } ] ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: 'Z6',
				Z6K1: 'Z6'
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				},
				Z10K1: {
					Z1K1: 'Z6',
					Z6K1: 'Z'
				},
				Z10K2: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					}
				}
			}
		},
		'array with escaped string' );
} );

QUnit.test( 'object with escaped string', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z2', Z2K2: { Z1K1: 'Z6', Z6K1: 'Z6' } } ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z2'
			},
			Z2K2: {
				Z1K1: 'Z6',
				Z6K1: 'Z6'
			}
		},
		'object with escaped string' );
} );

QUnit.test( 'object with unneccessarily escaped string', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z2', Z2K2: { Z1K1: 'Z6', Z6K1: 'Z' } } ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z2'
			},
			Z2K2: {
				Z1K1: 'Z6',
				Z6K1: 'Z'
			}
		},
		'object with unneccessarily escaped string' );
} );

QUnit.test( 'explicit reference', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z2', Z2K2: { Z1K1: 'Z9', Z9K1: 'Z1' } } ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z2'
			},
			Z2K2: {
				Z1K1: 'Z9',
				Z9K1: 'Z1'
			}
		},
		'explicit reference' );
} );

QUnit.test( 'implicit reference', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z2', Z2K2: 'Z1' } ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z2'
			},
			Z2K2: {
				Z1K1: 'Z9',
				Z9K1: 'Z1'
			}
		},
		'implicit reference' );
} );

QUnit.test( 'explicit QID reference', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z2', Z2K2: { Z1K1: 'Z9', Z9K1: 'Q96807071' } } ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z2'
			},
			Z2K2: {
				Z1K1: 'Z9',
				Z9K1: 'Q96807071'
			}
		},
		'explicit QID reference' );
} );

QUnit.test( 'empty list', ( assert ) => {
	assert.deepEqual( normalize( [ ] ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } }, 'empty list' );
} );

QUnit.test( 'empty list as object', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z10' } ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } }, 'empty list as object' );
} );

QUnit.test( 'single string in list as array', ( assert ) => {
	assert.deepEqual( normalize( [ 'a' ] ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } }, 'single string in list as array' );
} );

QUnit.test( 'single string in list as object', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z10', Z10K1: 'a' } ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } }, 'single string in list as object' );
} );

QUnit.test( 'single string in list as object, tail empty array', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z10', Z10K1: 'a', Z10K2: [ ] } ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } }, 'single string in list as object, tail empty array' );
} );

QUnit.test( 'single string in list as object, tail object', ( assert ) => {
	assert.deepEqual( normalize( { Z1K1: 'Z10', Z10K1: 'a', Z10K2: { Z1K1: 'Z10' } } ), { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } }, 'single string in list as object, tail object' );
} );

QUnit.test( 'two strings in list as array', ( assert ) => {
	assert.deepEqual(
		normalize( [ 'a', 'b' ] ),
		{ Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'b' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } },
		'two strings in list as array'
	);
} );

QUnit.test( 'two strings in list as object, tail as array', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z10', Z10K1: 'a', Z10K2: [ 'b' ] } ),
		{ Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'b' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } },
		'two strings in list as object, tail as array'
	);
} );

QUnit.test( 'two strings in list as ZObject, all tails ZObject', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z10', Z10K1: 'a', Z10K2: { Z1K1: 'Z10', Z10K1: 'b', Z10K2: { Z1K1: 'Z10' } } } ),
		{ Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'b' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } },
		'two strings in list as ZObject, all tails ZObject'
	);
} );

QUnit.test( 'two strings in list as ZObject, tails mixed', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z10', Z10K1: 'a', Z10K2: { Z1K1: 'Z10', Z10K1: 'b', Z10K2: [] } } ),
		{ Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'b' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } },
		'two strings in list as ZObject, tails mixed'
	);
} );

QUnit.test( 'two strings in list as ZObject, no tail in tail', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z10', Z10K1: 'a', Z10K2: { Z1K1: 'Z10', Z10K1: 'b' } } ),
		{ Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'a' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' }, Z10K1: { Z1K1: 'Z6', Z6K1: 'b' }, Z10K2: { Z1K1: { Z1K1: 'Z9', Z9K1: 'Z10' } } } },
		'two strings in list as ZObject, no tail in tail'
	);
} );

QUnit.test( 'list in list', ( assert ) => {
	assert.deepEqual(
		normalize( [ [ ] ] ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			}
		},
		'list in list'
	);
} );

QUnit.test( 'lists in list', ( assert ) => {
	assert.deepEqual(
		normalize( [ [ ], [ ] ] ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				},
				Z10K1: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					}
				},
				Z10K2: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					}
				}
			}
		},
		'list in list'
	);
} );

QUnit.test( 'empty object in list', ( assert ) => {
	assert.deepEqual(
		normalize( [ { Z1K1: 'Z10' } ] ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			}
		},
		'list in list'
	);
} );

QUnit.test( 'empty objects in list', ( assert ) => {
	assert.deepEqual(
		normalize( [ { Z1K1: 'Z10' }, { Z1K1: 'Z10' } ] ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				},
				Z10K1: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					}
				},
				Z10K2: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					}
				}
			}
		},
		'empty objects in list'
	);
} );

QUnit.test( 'empty ZObjects in list, all ZObjects', ( assert ) => {
	assert.deepEqual(
		normalize( {
			Z1K1: 'Z10',
			Z10K1: {
				Z1K1: 'Z10'

			},
			Z10K2: {
				Z1K1: 'Z10',
				Z10K1: {
					Z1K1: 'Z10'
				},
				Z10K2: {
					Z1K1: 'Z10'

				}
			}
		} ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				},
				Z10K1: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					}
				},
				Z10K2: {
					Z1K1: {
						Z1K1: 'Z9',
						Z9K1: 'Z10'
					}
				}
			}
		},
		'empty ZObjects in list, all ZObjects'
	);
} );

QUnit.test( 'object in list', ( assert ) => {
	assert.deepEqual(
		normalize( { Z1K1: 'Z10', Z10K1: { Z1K1: 'Z6', Z6K1: 'Z1' }, Z10K2: { Z1K1: 'Z10' } } ),
		{
			Z1K1: {
				Z1K1: 'Z9',
				Z9K1: 'Z10'
			},
			Z10K1: {
				Z1K1: 'Z6',
				Z6K1: 'Z1'
			},
			Z10K2: {
				Z1K1: {
					Z1K1: 'Z9',
					Z9K1: 'Z10'
				}
			}
		},
		'object in list'
	);
} );
