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
                return a.map((v,k) => !Array.isArray(v)?v+(b[k]??0):sumArrayRec_v1(v,(b[k]??)));
}

/* sum of correponding values of multidimensional arrays 
 * the two array dimensions can be different
 * using the first array dimension for output array dimension
 * NOTE: ignoring extra item in b, 
 * NOTE: using 0 for b if corresponding value in b does not exist
 * NOTE: using 0 for b if corresponding value in b is an array 
 */
function sumArrayRec_v2(a,b) {
                return a.map((v,k) => !Array.isArray(v)?v+(Array.isArray(b[k])?0:b[k]??0):sumArrayRec_v2(v,b[k]));
}
