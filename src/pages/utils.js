export const setMessageFn = (setter, obj) => {
    setter(obj);
    setTimeout(() => {
        setter({});
    }, 2000);
};

// export const getTokenAmount = (value) => {
//     const bgint = BigInt(String(value)) / BigInt(1E18);
//     return ('' + bgint) - 0;
// };
// console.log(BigInt('976446822376159650986687657226') / BigInt('10000000000000000'));