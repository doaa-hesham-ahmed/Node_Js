
// C. Part3: Bonus (2 Grades): 
// How to deliver the bonus? 
// 1- Solve the problem Counter II on LeetCode 

// 2- Inside your assignment folder, create a SEPARATE FILE and name it “bonus.js” 

// 3- Copy the code that you have submitted on the website inside ”bonus.js” file


/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */

var createCounter = function(init) {
    let count = init;

    return {
        increment: function() {
            return ++count;
        },
        decrement: function() {
            return --count;
        },
        reset: function() {
            count = init;
            return count;
        }
    };
};

const counter = createCounter(5);

console.log(counter.increment()); 
console.log(counter.reset());     
console.log(counter.decrement()); 

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */