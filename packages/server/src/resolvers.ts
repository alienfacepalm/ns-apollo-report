export default {
  Result: {
    __resolveType(obj: any, context: any, info: any) {
      if (obj.path) return 'Path';
      if (obj.searched_data) return 'SearchedData';
      if (obj.type && obj.filename) return 'File';
      if (obj.class && obj.method) return 'Method';
      if (obj.host) return 'Host';
      return null;
    }
  },
  Query: {
    getReport: async (parent:any, args: any, context: any) => {
      return await context.data.getReport();
    }
  }
};
