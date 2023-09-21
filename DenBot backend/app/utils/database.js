const ObjectId = require('mongoose').Types.ObjectId;

export const isObjectIdValid = (id) => {
    if (ObjectId.isValid(id)) return (String(new ObjectId(id)) === id) ? true : false;
    return false;
};
