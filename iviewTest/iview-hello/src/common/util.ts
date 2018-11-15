interface Times {
    mid_str: string;
}

// 时间获取
function timerd(timer: Times): string {
    const dDate = new Date();
    const month: string = ((dDate.getMonth() + 1 ).toString());
    const date = dDate.getFullYear().toString() + timer
    + (month as string).padStart(2, '0') + timer
    + dDate.getDate().toString().padStart(2, '0');
    return date;
}

function timerD(date: Times): string {
    console.log(date.mid_str);
    return '666';
}

export {
    timerd,
    timerD,
};
