function good(obj, res) {
    res.send({
        success: 1,
        res: obj,
    });
}

function bad(err, res) {
    const obj = {
        success: 0,
        res: err,
    };

    if (obj.res.errors) {
        obj.res.messages = [];

        for (const i in obj.res.errors) {
            obj.res.messages.push(obj.res.errors[i].message);
        }

        obj.res.message = obj.res.messages[0];
    }
    res.send(obj);
};

module.exports = {
    good,
    bad,
};
