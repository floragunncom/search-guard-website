$(document).ready(function(){

    const search = instantsearch({
        indexName: 'instant_search',
        searchClient: algoliasearch(
            '2ESDTH812Y',
            '0047035979f052146a69e1d0300cd332'
        ),
        indexName: 'blogpost',
        urlSync: true,
        searchParameters: {
            facetingAfterDistinct: true,
            snippetEllipsisText: "...",
            hitsPerPage: 10
        }
    });

    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                empty: '<div class="blog-search-no-results">No results found, please refine your search.</div>',
                item(data) {
                    return formatHit(data)
                }
            }
        })
    );

    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#search-box',
            placeholder: 'Search ...'
        })
    );

    search.start();

    function formatHit(item) {
        var title = item.title;
        var description = item.description;
        var author = item.author;
        var date = item.date;

        return  `
            <div class="search-result-container">
                <div class="blogpost-headline">${title}</div>
                <div class="blogpost-info-headline">${author} || ${date}</div>                
                <div class="blogpost-paragraph">${description}</div>
            </div>
`;
    }
});


