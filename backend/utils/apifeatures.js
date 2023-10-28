class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? 
        {
            name: {
                $regex: this.queryStr.keyword, //regex(Regular Expression) is a operator of MongoDb to find the words that are similar to the entered one
                $options: "i" //this means Case Insensitive
            },

        }:{};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}; //this makes a copy bcs objects in js are passed by reference hence this makes actual copy
        
        //Removing some fields for category
        //--> replace category with Genre
        const removeFields = ["keyword", "page", "limit"];
        
        removeFields.forEach(key=> delete queryCopy[key]);
        
        //Price filter
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}

module.exports = ApiFeatures