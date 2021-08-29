require('./database/mongoose.js');
const apis = require('./apis.js');
const apiSchema = require('./models/apisSchema.js');

const saveToDataBase = async () => {
    const apisObject = new apis();

    await apisObject.getAPIData();

    // console.log(apisObject) //Uncomment this statement to print the API catalog to the console.
    // console.log(object.categories); //Uncomment this statement to print the API details to the console.

    for (let catalog of apisObject.catalogs) {
        for (let category of apisObject.categories[catalog]) {
            let apiDocument = new apiSchema(category);

            try {
                await apiDocument.save(); //Method call to save API details to the database.
            } catch (error) {
                console.log('The document could not saved to the database.');
                return;
            }
        }
    }
    console.log('All documents saved successfully to the database.');
}

saveToDataBase();

