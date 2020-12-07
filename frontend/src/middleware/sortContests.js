const sortContests = (contests) => {
    if (!contests) 
        return contests;

    contests = contests.sort((a, b) => {
        if (a.date.year !== b.date.year) 
            return a.date.year -  b.date.year
        if (a.date.month !== b.date.month) 
            return a.date.month -  b.date.month
        return a.date.day -  b.date.day
    })

    return contests;
}

const hasContestEnded = (contest, date) => {
    if (contest.date.year !== date.year) 
        return contest.date.year <  date.year
    if (contest.date.month !== date.month) 
        return contest.date.month <  date.month
    return contest.date.day <  date.day
}

export {
    sortContests,
    hasContestEnded
}