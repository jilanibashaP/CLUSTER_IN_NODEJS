const BIG_INT = 1_000_000_00;
let count = 0;
let time = new Date().getTime();
for (let i = 0; i < BIG_INT; i++) {
    // do nothing
    count += i;
}


console.log(`Time taken is ${new Date().getTime() - time} ms`);
console.log(`Count is ${count}`);