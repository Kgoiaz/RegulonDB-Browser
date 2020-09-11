import { gql } from 'apollo-boost';

// Gene Info


export default class GeneQuerys {
  constructor(id) {
    this.id = id
    this.advancedSearchID = '[gene.id]'
  }

  queryGetMetadata(){
    return gql`
    {
      __type(name:"Gene"){
        name
        description
        fields{
          name
          description
        }
      }
    }
    `
  }

  querySearch(search, limit = 10, page = 0) {
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
    `
  }

  queryGetGeneById(id = '') {
    const advancedSearch = `${id}${this.advancedSearchID}`
    //console.log(advancedSearch)
    return gql`
    {
      getGenesBy(limit: 1, page: 0, advancedSearch: "${advancedSearch}") {
        data {
          gene {
            name
          }
          products {
            name
          }
          growthConditions {
            effect
          }
        }
        pagination {
        totalResults
      }
      }
      
    }
    `
  }

  queryInfo(id) {
    const advancedSearch = `${id}[gene.id]`
    return gql`
    query getGene($advancedSearch: String!){
      getGenesBy(limit:1 page: 0 advancedSearch:${advancedSearch})
        {
          data{
            gene{
              id
              name
              synonyms
              leftEndPosition
              rightEndPosition
              centisomePosition
              strand
              sequence
              gcContent
              note
              type
            }
            products{
              id
              name
            }
          }
        }
      
      }
    `
  }


}

// Gene EvidenceReferences
export class EvidenceReferences {
  constructor(id) {
    this.advancedSearch = `${id}[gene.id]`
    this.query = GENE_ER
  }
}

const GENE_ER = gql`
query getGeneEvidence($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
      data{
        gene{
          id
          evidenceReferences{
            evidenceName
            evidenceCode
            evidenceType
            referenceURL
            referenceCitation
            referenceId
          }
        }
      }
    }
  
  }
`

// Gene Operon Info

export class OperonInfo {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[gene.id]`
    this.query = GENE_OPERON
  }
}

const GENE_OPERON = gql`
query getGeneOperon($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
      data{
        regulation{
        operon{
          id
          name
          arrangement{
            regulator{
              id
              name
              type
            }
            promoter{
              id
              name
            }
            transcriptionUnit{
              id
              name
            }
          }
        }
      }
      }
    }
  
  }
`


//Gene Regulators Info

export class RegulatorInfo {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[gene.id]`
    this.query = GENE_REGULATOR
  }
}
const GENE_REGULATOR = gql`
query getGeneRegulator($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
      data{
        regulation{
          regulators{
          id
          name
          type
        }
      }
      }
    }
  
  }
`

//Gene ContextInfo

export class ContextInfo {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[gene.id]`
    this.query = GENE_CONTEXT
  }
}
const GENE_CONTEXT = gql`
query getGeneContext($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      regulation {
        context {
          type
          name
          leftEndPosition
          rightEndPosition
          strand
          note
          evidenceReferences {
            evidenceName
            evidenceCode
            evidenceType
            referenceId
            referenceURL
            referenceCitation
          }
        }
      }
    }
  }
}
`

// Gene ShineDalgarno Info

export class ShineDalgarno {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[gene.id]`
    this.query = GENE_SHINEDALGARNO
  }
}
const GENE_SHINEDALGARNO = gql`
query getGeneShineDalgarno($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      shineDalgarno{
          distanceToGene
          leftEndPosition
          rightEndPosition
          sequence
          note
        }
    }
  }
}
`

//Gene Products Info

export class GeneProducts {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[gene.id]`
    this.query = GENE_PRODUCTS
  }
}
const GENE_PRODUCTS = gql`
query getGeneProducts($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      products {
        name
        synonyms
        regulatorId
        sequence
        isoelectricPoint
        molecularWeight
        cellularLocation
        anticodon
        note
        type
        motifs {
          leftEndPosition
          rightEndPosition
          sequence
          description
          type
          note
        }
        externalCrossReferences {
          id
          name
          url
        }
        evidenceReferences {
          evidenceName
          evidenceCode
          evidenceType
          referenceId
          referenceURL
          referenceCitation
        }
      }
    }
  }
}
`

//GEne Esternal Data Bases

export class ExternalDataBases {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[gene.id]`
    this.query = GENE_EXTERNAL
  }
}
const GENE_EXTERNAL = gql`
query getGeneExternal($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      gene{
        id
        externalCrossReferences{
          name
          url
        }
      }
    }
  }
}
`

export class GrowthConditions {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[gene.id]`
    this.query = GENE_GROWTHCONDITIONS
  }
}
const GENE_GROWTHCONDITIONS = gql`
query getGrowthConditions($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      growthConditions {
        controlCondition
        experimentalCondition
        effect
      }
    }
  }
}
`