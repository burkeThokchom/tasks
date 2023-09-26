const tasksRepo = require('../tasks.repository');

module.exports = async (params) => {
    try{
        const { page, items } = params;
        const search = params.search || null;
        const filter = params.filter;
        const queryParams = {
            page,
            items,
            filter,
            search,
        };
       const result =  await tasksRepo.getAll(queryParams);
       return { pageMeta: { totalItems: result.count, page: +page, items: +items }, data: result.rows};
    }
    catch(error){
        throw new Error(error?.message || 'Error in fetching tasks.')
    }


};
