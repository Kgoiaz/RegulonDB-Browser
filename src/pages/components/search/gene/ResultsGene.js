import React from 'react';
import { useQuery } from '@apollo/client'
import { SIM_SEARCH } from '../../apollo/Querys'
import { useHistory } from 'react-router-dom';
//import Spinner from '../../loading/Spinner'


//https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0

//const furret = 'https://dl.dropboxusercontent.com/s/pp47gwivftzav85/tenor.gif?dl=0'

const ResultsGene = ({
    search,
}) => {

    const { data, loading, error } = useQuery(SIM_SEARCH, {
        variables: { search }
    })

    // console.log("data: ",data)
    // console.log("loading",loading)
    //console.log("erroo", error)

    if (loading) {
        return (
            <div style={{}}>
                Loading...
            </div>
        );
    } else {
        if (data === undefined) {
            return (<></>)
        } else {
            return (
                <div>
                    <TabGeneResult data={data} />
                </div>
            );
        }

    }

}


function TabGeneResult(data) {
    let history = useHistory();
    const genesResult = data.data.getGenesBy
    return (
        <div style={{ width: "80%", height: "100%" }}>
            <table >
                <tbody>
                    {genesResult.map((gen) => {
                        const gene = gen.geneInfo
                        return (
                            
                                <tr key={gene.id} className="trClickable" onClick={() => {history.push("/gene/"+gene.id)}}>
                                    <td >{gene.name}</td>
                                    <td >Gene{gene.note}</td>
                                </tr>

                        )

                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ResultsGene;