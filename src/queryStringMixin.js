export default {
  methods: {
    queryStringAssign(query = {}) {
      this.defaultQuery = JSON.parse(JSON.stringify(query));
      const newQuery = {};

      for (let key in query) {
        const value = this.$route.query[key];
        if (query[key].type === Number) newQuery[key] = Number(value);
        else if (value) newQuery[key] = value;
      }

      return newQuery;
    },
    queryStringReplace(query = {}) {
      const newQuery = { ...this.$route.query, ...query };

      if (this.defaultQuery) {
        for (let key in newQuery) {
          if (this.defaultQuery[key].type === Number) newQuery[key] = Number(newQuery[key]);
        }
      }

      this.$router.replace({ query: newQuery });

      return newQuery;
    },
  },
};
