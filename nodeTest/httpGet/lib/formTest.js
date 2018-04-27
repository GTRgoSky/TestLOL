const formGet = require('../server/formGetServer');
const querystring = require('querystring');


/*
    url分布图：
                                href
    -----------------------------------------------------------------
                                host              path
                        --------------- ----------------------------
    http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
    -----    ---------   --------   ---- -------- ------------- -----
    protocol     auth     hostname   port pathname     search     hash
                                                    ------------
                                                        query

*/

/*
    querystring
    console.log(querystring.parse('foo=bar&baz=qux&baz=quux&corge')); == > { foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }
    console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })); ==> foo=bar&baz=qux&baz=quux&corge=
*/

