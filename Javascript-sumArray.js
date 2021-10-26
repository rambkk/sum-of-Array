/* Javascript sum of Arrays
 * using ideas from https://github.com/rambkk/sum-of-Array
 *
 * sumArrays (version 0.11 - initial release)
 * 
 * (c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net
 * Please drop a line to say hello and let me know what kind of project you are working on :-)
 */

/* Adding linear arrays with same number of items 
 * NOTE: ignoring extra item in b, NaN if corresponding value does not exist 
 */
function sumArrayLinear_v1(a,b) {
                return a.map((v,k) => v+b[k]);
}
/* 
 * sumArrayLinear_v1([1,2,3],[2,3,4]) => [ 3, 5, 7 ] 
 * sumArrayLinear_v1([1,2,3,4],[2,3,4]) => [ 3, 5, 7, NaN ]
 * sumArrayLinear_v1([1,2,3],[2,3,4,5]) => [ 3, 5, 7 ]
 *
 * Now adjusting this function to retain the value of Array A even if the corresponding value does not exist in Array B
 * NOTE: ignoring extra item in b, using 0 for non-existing corresponding value in b
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
 * NOTE: if the corresponding value does not exist, assume it is 0
 * NOTE: the fill(0) is needed otherwise map does not work for unassigned array
 * NOTE: _ is a variable, which will not be used
 */
function sumArrayLinear_v3(a,b) {
                return Array(Math.max(a.length,b.length)).fill(0).map((_,k) => (a[k]??0)+(b[k]??0));
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
 */

/* All the above functionalities are usable for dealing with multi-dimensional arrays 
 * by extending the function or using recursion 
 */

/* Using simple iteration for 2-dimension
 * Adding linear arrays OR 2-dimension array with same number of items (ignoring extra items in b) 
 * NOTE: ignoring extra item in b, using 0 for non-existing corresponding value in b
 */
function sumArrayLinear2d(a,b) {
                return a.map((v,k) => Array.isArray(v)?v.map((w,j) =>w+(b[k][j]??0)):v+(b[k]??0));
}
/* 
 * sumArrayLinear2d( [1,2] , [2,3,4] ) => [ 3, 5 ] 
 * sumArrayLinear2d( [1,2,3,[4,5],6,7] , [2,3,4,[5,6],7] ) => [ 3, 5, 7, [ 9, 11 ], 13, 7 ]
 */


/* Sum of correponding values of multidimensional arrays with same structure
 * using recursion (doing the same when finding an array an an item)
 * NOTE: ignoring extra item in b, using 0 for non-existing corresponding value in b
 * NOTE: output will be incorrect if the structures are different
 */
function sumArrayRec_v1(a,b) {
                return a.map((v,k) => !Array.isArray(v)?v+(b[k]??0):sumArrayRec_v1(v,(b[k]??0)));
}
/* sumArrayRec_v1( [1,2,[3,4,5],6] , [2,3,[4,5]] )       => [ 3, 5, [ 7, 9, 5 ], 6 ]
 * sumArrayRec_v1( [1,2,[3,4,5],6] , [2,3,[4,5],6,7,8] ) => [ 3, 5, [ 7, 9, 5 ], 12 ]
 * sumArrayRec_v1( [1,2,3]         , [2,3,[4,5]])        => [ 3, 5, "34,5" ]
 * sumArrayRec_v1( [1,2,[3,4],5]   , [2,3,4])            => [ 3, 5, [ 3, 4 ], 5 ]
 */

/* sum of correponding values of multidimensional arrays 
 * the two array dimensions can be different
 * using the first array dimension for output array dimension
 * NOTE: ignoring extra item in b 
 * NOTE: using 0 for b if corresponding value in b does not exist
 * NOTE: using 0 for b if corresponding value in b is an array 
 * NOTE: using value in a if a is array and b is a value
 */
function sumArrayRec_v2(a,b) {
                return a.map((v,k) => !Array.isArray(v)?v+(Array.isArray(b[k])?0:b[k]??0):sumArrayRec_v2(v,b[k]));
}

/* sumArrayRec_v2( [1,2,3]         , [2,3,[4,5]] )       => [ 3, 5, 3 ]
 * sumArrayRec_v2( [1,2,[3,4],5]   , [2,3,4,5] )         => [ 3, 5, [ 3, 4 ], 10 ]
 */

/* Making sum of 2 multi-dimentional arrays with same dimension by not ignoring any item
 * The result will be the biggest length of the 2 arrays with largest of each corresponding sub-arrays
 *
 * NOTE: output will be incorrect if the structures are different
 * NOTE: using 0 for b if corresponding value does not exist
*/
/* These sumArrayBig_v* do the same thing, just using different syntax */
function sumArrayBig_v1(a,b) {
  if(!Array.isArray(b)) return a;
  [a,b]=a.length>b.length?[a,b]:[b,a];
  return a.map((v,k) => !Array.isArray(v)?v+(b[k]??0):addArray(v,b[k]));
}
function sumArrayBig_v2(a,b) {
  return Array.isArray(b) ?(a.length>b.length?a:b).map((v,k) => Array.isArray(v)?addArray(v,(a.length>b.length?b:a)[k]):v+((a.length>b.length?b:a)[k]??0)):a;
}
function sumArrayBig_v3(a,b) {
  return Array.isArray(b) && ([a,b]=a.length>b.length?[a,b]:[b,a])?a.map((v,k) => Array.isArray(v)?addArray(v,b[k]):v+(b[k]??0)):a;
}
/* sumArrayBig_v1( [1,2,[3,4],5,[1]]   , [2,3,[4],5,[6,7,8],[5,6]] )  => [ 3, 5, [ 7, 4 ] , 10, [ 7, 7, 8 ], [ 5, 6 ]  ]
 * sumArrayBig_v2( [1,2,[3,4],5,[1]]   , [2,3,[4],5,[6,7,8],[5,6]] )  => [ 3, 5, [ 7, 4 ] , 10, [ 7, 7, 8 ], [ 5, 6 ]  ]
 * sumArrayBig_v3( [1,2,[3,4],5,[1]]   , [2,3,[4],5,[6,7,8],[5,6]] )  => [ 3, 5, [ 7, 4 ] , 10, [ 7, 7, 8 ], [ 5, 6 ]  ]
 */





