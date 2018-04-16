/* TD03 

Le but de cet exercice est de créer fonction retournant une Promise 
qui après trois secondes retournera le nombre 42 dans son 'then'.

*/

/* TD Part */

function waitThreeSecondsAndSend42InTheThen() {
    var promise = new Promise( (resolve, result) => {
        setTimeout(() => { resolve(42)}, 3000);
    });
    return promise;

}

/* Testing part */
var startTime = Number(new Date())

function callback(returnedValue) {
    var timeShift = parseInt((Number(new Date()) - startTime) / 1000)

    if (timeShift === 3 &&
        returnedValue === 42) {
        console.log('TD03 :: Passed')
    } else {
        console.log('TD03 :: Failed')
    }
}

waitThreeSecondsAndSend42InTheThen()
    .then(callback)
    .catch(error => console.error(error))
console.log(waitThreeSecondsAndSend42InTheThen())