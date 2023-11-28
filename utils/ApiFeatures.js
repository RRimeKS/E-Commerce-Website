class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryStringObj = { ...this.queryString };
        const excludesFields = ["page", "fields", "sort", "limit"];

        excludesFields.forEach((fields) => delete queryStringObj[fields]);

        //apply filtration using [gte, gt, lte, lt]
        let queryString = JSON.stringify(queryStringObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));

        return this;
    }

    pagination(countDocuments) {
        const page = this.queryString.page * 1;
        const limit = this.queryString.limit * 5;
        const skip = (page - 1) * 5;
        const endIndex = page * limit;

        const pagination = [
            {
                currentPage: page,
                limit: limit,
                numberOfPage: Math.ceil(countDocuments / limit)
            }
        ];
        this.mongooseQuery = this.mongooseQuery.limit(limit).skip(skip);
        this.paginationResult = pagination;
        return this;
    }

    search() {
        const key = this.queryString.keyword;
        if (key) {
            const query = {
                $or: [
                    { title: { $regex: key, $options: "i" } },
                    { description: { $regex: key, $options: "i" } }
                ]
            };
            console.log(query);
            this.mongooseQuery = this.mongooseQuery.find(query);

        }
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }
        return this;
    }
}

module.exports = ApiFeatures;