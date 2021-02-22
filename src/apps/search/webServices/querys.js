import { gql } from "apollo-boost";

export const querySearch = (search, limit = 10, page = 0) => {
    return gql`
    {
        getGenesBy(limit:${limit} page:${page} search:"${search}")
        {
          data {
          gene {
              id
              name
              synonyms
              note   
            }
            products{
              name
              id
            }
        }
        pagination{
          totalResults
        }
        }
      }
    `;
  }