validateUpdates = (updates) => {
    const allowedUpdates = ['firstName', 'lastName', 'age', 'gender'];
    const updateKeys = Object.keys(updates);
    return !updateKeys.every((key) => allowedUpdates.includes(key));
}

exports.validateUpdates = validateUpdates;