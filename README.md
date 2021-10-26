# sum-of-Array
Approaches for summing corresponding items in arrays

**rambkk - pluslab.net - looking for impossible projects**
### ((Just fun things to think about. Do drop a line to say hello and let me know what kind of project you are working on, or if help is needed))

There are several ways to get corresponding sum of arrays.

## To sum arrays, some points to be thought of:
1) Same structure: What to do with the extra item?
2) Different structure: What to do when this happens?

The correct answer depends on the objective of the program.  
(NOTE: there could be other answers)

Let's start.
```
(X being something to indicate a problem eg. null, undefined, some custom data, etc.)
```



## One dimension array
`[1,2,3]` and `[2,3,4]` -- sum = `[3,5,7]` 


With extra item:
`[1,2,3]` and `[2,3,4,9]` -- OR -- `[1,2,3,9]` and `[2,3,4]` -- both can be  
a) `[3,5,7]`   
b) `[3,5,7,9]`  
c) `[3,5,7,X]`  


## Multi dimension array
`[1,[2,3],4]` and `[2,[3,4],5]` -- sum = `[3,[5,7],9]`  
  
With extra item  
`[1,[2,3]]` and `[2,[3,4],9]` -- OR -- `[1,[2,3],9]` and `[2,[3,4]]` -- both can be  
a) `[1,[5,7]]`  
b) `[1,[5,7],9]`  
c) `[1,[5,7],X]`  
  
(Similar to above)  
  
Now, what if there are differences between the structure of the two arrays.  
`[1,[2,3],4]` and `[2,[3,4],[5,6]]`  
  
This can be:  
a) `[1,[5,7],4]`  
b) `[1,[5,7],[5,6]]`  
c) `[1,[5,7],X]`  
  
  
(c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net  
Please drop a line to say hello and let me know what kind of project you are working on 😄
