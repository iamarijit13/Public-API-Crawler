const axios = require('axios');

class apis {
    token;  //To store 'Bearer Token' comming from the API request.
    tokenGeneratedTime; //To store the 'Bearer Token' generation time. 
    catalogs;   //To store API catalog (List of the 'Public APIs').
    categories; //To store the detalis of all the APIs ('Public APIs').

    constructor(token = '', catalogs = [], categories = {}) {
        this.token = token;
        this.catalogs = catalogs;
        this.categories = categories
    }

    //Wrapper Method
    getAPIData = async () => {
        await this.fetchToken();
        await this.fetchCatalog();
        await this.fetchCategories();
    }

    //Method for limiting 10 request per minute.
    wait = async (headers) => {
        const limit = headers['x-ratelimit-remaining']; //Getting remaining request limit.

        return new Promise((resolve, reject) => {
            let re = () => {
                resolve();
            };
            if (limit > 0) {  // If limit not exceeded, resolve the call immediately.
                resolve();
            } else {
                console.log('Halting until request limit regained.');
                setTimeout(re, 60000);  // If limit exceeded, wait 1 minute and then resolve the call. 
            }
        });
    }

    //Method for checking expiration of 'Bearer Token' and if expired regeneration of the 'Bearer Token'
    tokenRegenerate = async () => {
        let timeNow = Date.now();

        if (((timeNow - this.tokenGeneratedTime) / 1000) >= 295.0) { //Check if 'Bearer Token' expired then regenerate.
            await this.fetchToken();
        }
        return this.token;
    }

    //Method for fetching 'Bearer Token' from the API.
    fetchToken = async () => {
        const url = 'https://public-apis-api.herokuapp.com/api/v1/auth/token';
        try {
            const res = await axios.get(url);
            this.tokenGeneratedTime = Date.now();
            this.token = res.data.token;
            await this.wait(res.headers);
        } catch (error) {
            console.log('Fetch Token: ', new Error('Token not fetched.'));
        }
        console.log('Token Fetched.');
    }

    //Method for fetching 'API catalog' from the API. 
    fetchCatalog = async () => {
        const url = 'https://public-apis-api.herokuapp.com/api/v1/apis/categories?page=1';
        let count, page = 1;
        try {
            const res = await axios.get(url, { headers: { Authorization: `Bearer ${await this.tokenRegenerate()}` } });
            await this.wait(res.headers);
            count = res.data.count;

        } catch (error) {
            console.log('Fetch Catalog Count: ', new Error('API catalog count could not fetched.'));
            return;
        }

        do {
            let url = 'https://public-apis-api.herokuapp.com/api/v1/apis/categories?page=' + page;
            let categories;
            try {
                const res = await axios.get(url, { headers: { Authorization: `Bearer ${await this.tokenRegenerate()}` } });
                await this.wait(res.headers); //Method call to check limit for API request.
                categories = res.data.categories;
                this.catalogs = [...this.catalogs, ...categories];
            } catch (error) {
                console.log('Fetch Catalogs: ', new Error('Catalogs could not fetched.'));
                return;
            }
            page++;
            count -= categories.length;
        } while (count != 0)
        console.log('API Catalog fetched.');
    }

    //Method for fetching 'API details' from the API.
    fetchCategories = async () => {
        for (let catalog of this.catalogs) {
            const url = 'https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=1&category=' + catalog;
            this.categories[catalog] = [];
            let count, page = 1;

            try {
                const res = await axios.get(url, { headers: { Authorization: `Bearer ${await this.tokenRegenerate()}` } });
                await this.wait(res.headers);
                count = res.data.count;

            } catch (error) {
                console.log('Fetch Categories Count: ', new Error(`Count for category, '${catalog}' does not fetched.`));
                return;
            }

            do {
                let url = 'https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=' + page + '&category=' + catalog;
                let details;
                try {
                    const res = await axios.get(url, { headers: { Authorization: `Bearer ${await this.tokenRegenerate()}` } });
                    await this.wait(res.headers); //Method call to check limit for API request.
                    details = res.data.categories;
                    this.categories[catalog] = [...this.categories[catalog], ...details];
                } catch (error) {
                    console.log('Fetch Categories Details ', new Error(`Details for category ${catalog} does not fetched.`));
                }
                page++;
                count -= details.length;
            } while (count != 0);
            console.log(`API catagories fetched for API catalog, '${catalog}'.`);
        }
    }

}

module.exports = apis;