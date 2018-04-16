/* TD04 - Fibonacci Filter

Écrivez une fonction prenant un tableau en paramètre et 
ne retournant que les nombres de ce tableau faisant partie 
de la suite de fibonacci.

Par exemple fibFilter([1,2,3,4,5]) == [1,2,3,5]

/* TD Part */

const fib = (n) => {
    return (n < 2) ?  n : fib(n-1) + fib(n -2)
}

const fibFilter = (array) => {
    var max= Math.max(...array)
    var f_array = []
    var dernier = 0
    for(var i = 0; dernier < max; i++){
        f_array.push(fib(i));
        dernier = fib(i)

    }
    return array.filter(res => f_array.includes(res))
}

/* Testing Part */
const array = [0,1,4,5,13,2,3,4,20,30,11,8,12]
console.log(fibFilter(array).toString() == [0, 1, 5, 13, 2, 3, 8].toString() ? 'TD01 :: Success' : 'TD01 :: Failed')
