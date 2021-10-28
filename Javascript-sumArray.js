/* Javascript sum of Arrays
 * using ideas from https://github.com/rambkk/sum-of-Array
 *
 * sumArrays (version 0.11 - initial release)
 * 
 * Requirement: might require Javascript ES6
 * 
 * (c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net
 * Please drop a line to say hello and let me know what kind of project you are working on :-)
 */
/* Using: reduce, map, shift, iteration, recursion
 * summing linear arrays: 2 of same size, 2 of different sizes, multiple of different sizes
 * summing multi dimension arrays: 2 of same size, 2 of different sizes, multiple of different sizes, 
 * with difference in structures returning null
 *
 */
 
 
/* Adding linear arrays with same number of items 
 * NOTE: ignoring extra item in 'b', NaN if corresponding value does not exist 
 */
function sumArrayLinear_v1(a,b) {
                return a.map((v,k) => v+b[k]);
}
/* 
 * sumArrayLinear_v1([1,2,3],[2,3,4]) => [ 3, 5, 7 ] 
 * sumArrayLinear_v1([1,2,3,4],[2,3,4]) => [ 3, 5, 7, NaN ]
 * sumArrayLinear_v1([1,2,3],[2,3,4,5]) => [ 3, 5, 7 ]
 *
 * Now adjusting this function to retain the items of 'a' even if the corresponding value does not exist in 'b'
 * NOTE: ignoring extra item in 'b', 
 * NOTE: using 0 for non-existing corresponding value in 'b'
 */
function sumArrayLinear_v2(a,b) {
                return a.map((v,k) => v+(b[k]??0));
}
/*
 * sumArrayLinear_v2([1,2,3,4],[2,3,4]) => [ 3, 5, 7, 4 ]
 * 
 * Sum two linear arrays, final size should be the size of the bigger array
 * Using dummy Array created with the greater length of the 2 arrays for map
 * map using only key value not the value of dummy Array
 *
 * NOTE: if the corresponding value does not exist, use 0 when adding
 * NOTE: the fill() - filling array with 'undefined' is needed otherwise map does not work for unassigned array
 * NOTE: _ is a variable, which will not be used
 */
function sumArrayLinear_v3(a,b) {
                return Array(Math.max(a.length,b.length)).fill().map((_,k) => (a[k]??0)+(b[k]??0));
}
/*
 * sumArrayLinear_v3([1,2],[2,3,4]) => [ 3, 5, 4 ]
 * sumArrayLinear_v3([1,2,3],[2,3]) => [ 3, 5, 3 ]
 *
 * sumArrayLinear_v4 is similar to sumArrayLinear_v3, the array for map is filled with 'undefined' items
 */
function sumArrayLinear_v4(a,b) {
                return [...new Array(Math.max(a.length,b.length))].map((_,k) => (a[k]??0)+(b[k]??0));
}
/*
 * sumArrayLinear_v4([1,2],[2,3,4]) => [ 3, 5, 4 ]
 * sumArrayLinear_v4([1,2,3],[2,3]) => [ 3, 5, 3 ]
 * 
 * Sum linear arrays using recursion and shift()
 * NOTE: can work on many arrays (more than 2)
 * NOTE: if the corresponding value does not exist, use 0 when adding
 */
function sumArrayShift_v1(...arrays) { 
        return arrays.flat().length?[arrays.reduce((c,v) => c+(v.shift()??0),0),...sumArrayShift_v1(...arrays)]:[];
}
/* sumArrayLinear_v5( [1,2]  , [2,3,4], [5,6,7,8] ) => [ 8, 11, 11, 8 ]
 * sumArrayLinear_v5( [1,2,3], [2,3], [1] ) => [ 4, 5, 3 ]
 *
 * Extending this to cover multi dimension arrays with same structure
 *
 * NOTE: arrays can have different sizes but must be same structure
 * NOTE: works on 2 arrays
 * NOTE: if the corresponding value does not exist, use 0 when adding
 */
function sumArrayShift_v20(a,b) {
       return ((Array.isArray(a) && a.length)||(Array.isArray(b) && b.length)) && ((a??=[]) && (b??=[])) ?
                [sumArrays(a.shift(),b.shift()),...sumArrayShift_v20(a,b)]:(a??0)+(b??0);
}
/*
 * Arrays can have different sizes, but must have same structure
 */
function sumArrayShift_v30(...arrays) {
        return arrays.flat(Infinity).length ?
                                        [arrays.reduce((c,v,i,a) =>
                                                Array.isArray(c) || (Array.isArray(v[0]) && (c=[])) ?
                                                        c.push(v.shift()??0) && i==a.length-1?SumArrayShift_v30(...c):c
                                                :
                                                Number.isFinite(v[0])?(c??0)+(v.shift()??0):c
                                        ,null)
                                        ,...addArrays(...arrays)] :
                                        [];
}

/* Extending further to return null when the structures do not match */
function sumArrayShift_v40(...arrays) {
        return arrays.flat(Infinity).length ?
                                [arrays.filter(w => w.length).reduce((c,v,i,a) =>
                                                Array.isArray(v[0]) && (Array.isArray(c) || (c===undefined && (c=[]))) ?
                                                        c.push(v.shift()??0) && i==a.length-1 ?
                                                                                                                sumArrayShift_v40(...c) :
                                                                                                                c
                                                :
                                                Number.isFinite(v[0]) && (Number.isFinite(c)||c===undefined) ?
                                                                                                                (c??0)+(v.shift()??0) :
                                                                                                                v.shift()&&false||null
                                ,undefined)
                                ,...addArrays(...arrays)] :
                                [];
}

/* Proper shift() without reduce hack like above 
 * NOTE: arrays can have different sizes but must be same structure
 * NOTE: works on 2 arrays
 * NOTE: if the corresponding value does not exist, use 0 when adding
 * NOTE: null when corresponding item types do not match
 */
function sumArrayShift_v50(...arrays) {
       return arrays.reduce((a,b) =>
                typeof a==='undefined' || typeof b==='undefined'  ?
                        a??b??[] :
                                (Array.isArray(a) && Array.isArray(b)) && (a.length || b.length) ?
                                        [sumArrays(a.shift(),b.shift()),...sumArrayShift_v50(a,b)??[]] :
                                        Number.isFinite(a)&&Number.isFinite(b) ?
                                                a+b :
                                                null
       )
}







/* Using simple iteration for 2-dimension
 * Adding linear arrays OR 2-dimension array with same number of items (ignoring extra items in b) 
 * NOTE: ignoring extra item in b, using 0 for non-existing corresponding value in b
 */
function sumArray2d(a,b) {
                return a.map((v,k) => Array.isArray(v)?v.map((w,j) =>w+(b[k][j]??0)):v+(b[k]??0));
}
/* 
 * sumArray2d( [1,2] , [2,3,4] ) => [ 3, 5 ] 
 * sumArray2d( [1,2,3,[4,5],6,7] , [2,3,4,[5,6],7] ) => [ 3, 5, 7, [ 9, 11 ], 13, 7 ]
 */


/* Sum of correponding values of multidimensional arrays with same 
 * using recursion (doing the same when finding an array an an item)
 * NOTE: ignoring extra item in 'b'
 * NOTE: using 0 for non-existing corresponding value in 'b'
 * NOTE: output will be incorrect if the structures are different
 */
function sumArrayRec_v1(a,b) {
                return a.map((v,k) => !Array.isArray(v)?v+(b[k]??0):sumArrayRec_v1(v,(b[k]??0)));
}
/* sumArrayRec_v1( [1,2,[3,4,5],6] , [2,3,[4,5]] )       => [ 3, 5, [ 7, 9, 5 ], 6 ]
 * sumArrayRec_v1( [1,2,[3,4,5],6] , [2,3,[4,5],6,7,8] ) => [ 3, 5, [ 7, 9, 5 ], 12 ]
 * sumArrayRec_v1( [1,2,3]         , [2,3,[4,5]] )       => [ 3, 5, "34,5" ]
 * sumArrayRec_v1( [1,2,[3,4],5]   , [2,3,4] )           => [ 3, 5, [ 3, 4 ], 5 ]
 */

/* Sum of correponding values of multidimensional arrays 
 * the two array structures can be different
 * using the first array dimension for output array dimension
 * NOTE: ignoring extra item in 'b' 
 * NOTE: using 0 for 'b' if corresponding value in b does not exist
 * NOTE: using 0 for 'b' if corresponding value in b is an array 
 * NOTE: using value in 'a' if 'a' is array and b has value
 */
function sumArrayRec_v2(a,b) {
                return a.map((v,k) => !Array.isArray(v)?v+(Array.isArray(b[k])?0:b[k]??0):sumArrayRec_v2(v,b[k]));
}

/* sumArrayRec_v2( [1,2,3]         , [2,3,[4,5]] )       => [ 3, 5, 3 ]
 * sumArrayRec_v2( [1,2,[3,4],5]   , [2,3,4,5] )         => [ 3, 5, [ 3, 4 ], 10 ]
 */

/* Making sum of multi-dimentional arrays with same structure by not ignoring any item
 * The result will be the biggest length of the 2 arrays with largest of each corresponding sub-arrays
 *
 * NOTE: output will be incorrect if the structures are different
 * NOTE: using 0 for 'b' if corresponding value does not exist
*/
/* 
 *These sumArrayBig_v* do the same thing, just using different syntax 
 */
function sumArrayBig_v1(a,b) {
  if(!Array.isArray(b)) return a;
  [a,b]=a.length>b.length?[a,b]:[b,a];
  return a.map((v,k) => !Array.isArray(v)?v+(b[k]??0):sumArrayBig_v1(v,b[k]));
}
function sumArrayBig_v2(a,b) {
  return Array.isArray(b) ?(a.length>b.length?a:b).map((v,k) => Array.isArray(v)?sumArrayBig_v2(v,(a.length>b.length?b:a)[k]):v+((a.length>b.length?b:a)[k]??0)):a;
}
function sumArrayBig_v3(a,b) {
  return Array.isArray(b) && ([a,b]=a.length>b.length?[a,b]:[b,a])?a.map((v,k) => Array.isArray(v)?sumArrayBig_v3(v,b[k]):v+(b[k]??0)):a;
}
/* sumArrayBig_v1( [1,2,[3,4],5,[1]]   , [2,3,[4],5,[6,7,8],[5,6]] )  => [ 3, 5, [ 7, 4 ] , 10, [ 7, 7, 8 ], [ 5, 6 ]  ]
 * sumArrayBig_v2( [1,2,[3,4],5,[1]]   , [2,3,[4],5,[6,7,8],[5,6]] )  => [ 3, 5, [ 7, 4 ] , 10, [ 7, 7, 8 ], [ 5, 6 ]  ]
 * sumArrayBig_v3( [1,2,[3,4],5,[1]]   , [2,3,[4],5,[6,7,8],[5,6]] )  => [ 3, 5, [ 7, 4 ] , 10, [ 7, 7, 8 ], [ 5, 6 ]  ]
 */


/* Making sum of multi-dimensional array with same structure, the number of items can be different
 * null item if corresponding item types do not match 
 * (different structures, eg. a number in 'a' corresponds with an array in 'b') 
 *
 * - if 'b' is undefined, return 'a'
 * - if are not arrays then return 'a'+'b'
 * - if both 'a' and 'b' are arrays then 
 * - - assign 'a' to be the longer array 'b' the shorter array
 * - - do map and run the function (recursion) for each (sub-array) item
 * - else return null (when types of 'a' and 'b' do not match) 
 */
function sumArrayBig_v4(a,b) {
return typeof a === 'undefined' || typeof b === 'undefined' ?
                                a??b :
                                Array.isArray(a) && Array.isArray(b) ?
                                        ([a,b]=a.length>b.length?[a,b]:[b,a])[0].map((v,k) => sumArrayBig_v4(a[k],b[k])) :
                                        Number.isFinite(a) && Number.isFinite(b) ?
                                                a+b :
                                                null
}
/* sumArrayBig_v4( [1] , 0 )                                             => null
 * sumArrayBig_v4( [1,2,3,4]                    , [5,6,7] )              => [ 6, 8, 10, 4 ]
 * sumArrayBig_v4( [1,2,[3,4],[8,9,10]]         , [5,6,7] )              => [ 6, 8, null, [ 8, 9, 10 ] ]
 * sumArrayBig_v4( [1,[2,3],[10,11],[13,14],15] , [5,6,    [7,8,9],12] ) => [ 6, null, [ 17, 19, 9 ], null, 15 ] 
 * sumArrayBig_v4( [null]                       , [1] )                  => [ null ]
 *
 *
 *This can sum many arrays (more than 2)
*/
function sumArrays_v4(...arrays) {
return  arrays.reduce((a,b)=>
        typeof a === 'undefined' || typeof b === 'undefined' ?
                                a??b :
                                Array.isArray(a) && Array.isArray(b) ?
                                        ([a,b]=a.length>b.length?[a,b]:[b,a])[0].map((v,k) => sumArrays_v4(a[k],b[k])) :
                                        Number.isFinite(a) && Number.isFinite(b) ?
                                                a+b :
                                                null
        )
}

/* or simply: */
function sumArrays_v4(...arrays) {
return arrays.reduce((a,b)=>typeof a==='undefined'||typeof b==='undefined'?a??b:Array.isArray(a)&&Array.isArray(b)?([a,b]=a.length>b.length?[a,b]:[b,a])[0].map((v,k)=>sumArrays_v4(a[k],b[k])):Number.isFinite(a)&&Number.isFinite(b)?a+b:null);
}
/* sumArrays_v5( [1,2]       , [3,4]       , [5,6] )                     => [ 9, 12]
 * sumArrays_v5( [1,[2],3]   , [4,5,6,7]   , [[8],9] )                   => [ null, null, 9, 7 ]
 * sumArrays_v5( [1,[1,2],3] , [2,[],[],4] , [3,[1,[5,5],3],1,1,[1,2]] ) => [ 6, [ 2, null, 3 ], null, 5, [ 1, 2 ] ]
 */

/* MAINLY REDUCE */
/* Adding two linear arrays
 * NOTE: if the corresponding value does not exist, use 0 when adding
 */
function sumArrays(a,b) {
        return b.reduce((c,v,k) => (c[k]=(c[k]??0)+v)&&false||c,a);
}

/* Multiple linear arrays
 * NOTE: can work on many arrays (more than 2)
 * NOTE: if the corresponding value does not exist, use 0 when adding
*/
function sumArrays(...arrays) {
        return arrays.reduce((d,w) => w.reduce((c,v,k) => (c[k]=(c[k]??0)+v)&&false||c,d));
}

/* Adding 2 multi dimension arrays, both must have same structure
 * NOTE: if the corresponding value does not exist, use 0 when adding
 */
function sumArrays(a,b) {
        return b.reduce((c,v,k) => (c[k]=Array.isArray(v)?sumArrays((c[k]??[]),v):(c[k]??0)+v)&&false||c,a);
}

/* Adding many multi dimension arrays, all must have same structure
 * NOTE: if the corresponding value does not exist, use 0 when adding
 */
function sumArrays(...arrays) {
        return arrays.reduce((d,w) => w.reduce((c,v,k) => (c[k]=Array.isArray(v)?sumArrays((c[k]??[]),v):(c[k]??0)+v)&&false||c,d));
}




