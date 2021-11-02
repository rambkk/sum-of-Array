# sum-of-Array
Approaches for summing corresponding items in arrays

**rambkk - pluslab.net - looking for impossible projects**
### ((Just fun things to think about. Do drop a line to say hello and let me know what kind of project you are working on, or if help is needed))

There are several ways to get corresponding sum of arrays.\
Adding respective numbers in arrays.\
Adding arrays or adding two arrays.\
Summing arrays.

## To sum arrays, some points to be thought of:
1) Same structure: What to do with the extra item?
2) Different structure: What to do when this happens?
3) What to do with empty array item?

The correct answer depends on the objective of the program.  
(NOTE: there could be other answers)

Let's start.
```
(X being something to indicate a problem eg. null, false, some custom data, etc.)
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
a) `[3,[5,7]]`  
b) `[3,[5,7],9]`  
c) `[3,[5,7],X]`  
  
(Similar to above)  
  
Now, what if there are differences between the structure of the two arrays.  
`[1,[2,3],4]` and `[2,[3,4],[5,6]]`  
  
This can be:  
a) `[3,[5,7],4]`  
b) `[3,[5,7],[5,6]]`  
c) `[3,[5,7],X]`  

What to do when summing a blank item (array with hole) to a number or empty array to empty array?\
... something to think further
`[3,   ,[4],5,[]]` and `[2,7,5,5]`    sum =  `[5,7  ,X,10,[]]`
`[3,[9],[4],[],5]` and `[2, ,[5],[]]` sum =  `[5,[9],[9],[],5]`



Examples in Javascript are in the files in this project with all the above approaches, mostly using `null` for
flagging difference in the structures. The functions use several methods including map, reduce, shift, etc. for
adding corresponding numbers. There are some which abuses 'reduce' 🤭. 

'undefined' has to be handled with care and it's not supported by JSON (EMCA-404)

There are also some pure recursion in the Javascript example, making use of purely recursive calls without any iteration.\
These are fun 🙃




(c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net  
Please drop a line to say hello and let me know what kind of project you are working on 😄
