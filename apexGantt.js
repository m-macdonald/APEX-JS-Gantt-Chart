async function refreshFunction(ajaxIdentifier, pageItemsToSubmit, staticID) {
    let resultingData;
    
    let result = await apex.server.plugin(
        ajaxIdentifier,
        {
            pageItems: pageItemsToSubmit
        },
        {
            refreshObject: '#' + staticID,
            success: pData => {
                resultingData = pData;
            }
        }
    )
    
    console.log(result);

    return result.row;
}

let apexGantt = {
    initialize: (staticID, apexParams, params) => {

        params.refreshFunction = () => refreshFunction(apexParams.ajaxIdentifier,apexParams.pageItemsToSubmit, staticID);

        apex.region.create(
            apexParams.regionID,
            {
                type: 'gantt',
                refresh: () => gantt.refreshData()
            }
        )

        let gantt = new Gantt(staticID, params);
    }
}