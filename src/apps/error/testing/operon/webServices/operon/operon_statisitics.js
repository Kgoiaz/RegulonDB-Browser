import React, { useEffect } from 'react';
import { gql } from "apollo-boost";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

export function query(id_operon) {
    return gql`{
      getOperonBy(search:"${id_operon}")
      {
        data{
            _id
            operon{
                id
                name
                statistics{
                    genes
                    promoters
                    transcriptionUnit
                }
            }
        }
        pagination {
            totalResults
        }
      }
    }`
}

const GetStatistics = ({
    id_operon = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(query(id_operon))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            if (data.getOperonBy.pagination.totalResults === 1) {
                try {
                    resoultsData(data.getOperonBy.data[0].operon.statistics)
                    status('done')
                } catch (error) {
                    status('error')
                    console.log(error)
                }
            } else {
                resoultsData({})
                status('not found')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export default GetStatistics;