export function convertToSerializableObject(leanDocument) {
    // Loop to check if properties in a lean document are toJSON or toString and convert them to only toString()
    for (const key of Object.keys(leanDocument)) {
        if (leanDocument[key].toJSON && leanDocument[key].toString) {
            leanDocument[key] = leanDocument[key].toString()
        }
    }

    return leanDocument;
}