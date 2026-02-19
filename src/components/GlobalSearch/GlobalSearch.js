import React from 'react';
import {Highlight, Hits, Index, InstantSearch, Menu, SearchBox, Snippet} from 'react-instantsearch';
import { Badge } from '../Badge/Badge';
import { ensureTrailingSlash } from '../../utils/urlUtils';
import 'font-awesome/css/font-awesome.min.css';
import classNames from 'classnames';

const SEARCH_GUARD_DOCS_URL = 'https://docs.search-guard.com';
const SEARCH_GUARD_DOCS_SEARCH_INDEX = 'latest';
const SEARCH_GUARD_BLOG_SEARCH_INDEX = 'blogposts';
const DEFAULT_SEARCH_INDEX = SEARCH_GUARD_DOCS_SEARCH_INDEX;
const INDEX_BADGE_BG_COLOR = '#F4E37D';
const INDEX_BADGE_TEXT_COLOR = '#000000';
const BADGE_MARGIN_BIG = 10;
const BADGE_MARGIN_SMALL = 4;

const DocsHit = ({ hit }) => ( 
    <a id={hit.objectID} target="_blank" rel='noopener noreferrer' href={new URL(`${SEARCH_GUARD_DOCS_URL}/${SEARCH_GUARD_DOCS_SEARCH_INDEX}/${hit.url}${hit.css_selector}`)} className='div-search-text'>
        <div className="globalsearchresult-item">      
            <div className='globalsearchresult-title-group'>
                <Badge text={SEARCH_INDEXES_COMPONENT_MAP[SEARCH_GUARD_DOCS_SEARCH_INDEX].label} bgColor={SEARCH_INDEXES_COMPONENT_MAP[SEARCH_GUARD_DOCS_SEARCH_INDEX].bgColor} textColor={SEARCH_INDEXES_COMPONENT_MAP[SEARCH_GUARD_DOCS_SEARCH_INDEX].textColor}/>                
                <div className="globalsearchresult-title">
                    <Highlight attribute="text" hit={hit} classNames={{root: 'truncate-to-num-lines'}} />
                </div>
            </div>
            <div className="globalsearchresult-content">
                <Highlight attribute="text_all" hit={hit} classNames={{root: 'truncate-to-num-lines'}} />
            </div>
        </div>
    </a>
);


const BlogHit = ({ hit }) => (
    <a id={hit.objectID} href={`/blog/${ensureTrailingSlash(hit.slug)}`} className='div-search-text'>
        <div className="globalsearchresult-item">
            <div className='globalsearchresult-title-group'>
                <Badge text={SEARCH_INDEXES_COMPONENT_MAP[SEARCH_GUARD_BLOG_SEARCH_INDEX].label} bgColor={SEARCH_INDEXES_COMPONENT_MAP[SEARCH_GUARD_BLOG_SEARCH_INDEX].bgColor} textColor={SEARCH_INDEXES_COMPONENT_MAP[SEARCH_GUARD_BLOG_SEARCH_INDEX].textColor}/>    
                <div className="globalsearchresult-title">
                    <Highlight attribute="title" hit={hit} classNames={{root: 'truncate-to-num-lines'}} />
                </div>
            </div>
            <div className="globalsearchresult-author">
                <Highlight attribute="unique_hierarchy" hit={hit} classNames={{root: 'truncate-to-num-lines'}} />
                Published: {hit.published}
            </div>
            <div className="globalsearchresult-content">
                <Snippet attribute="text_all" hit={hit} classNames={{root: 'truncate-to-num-lines'}}/>
            </div>
        </div>
    </a>
);

const SEARCH_INDEXES_COMPONENT_MAP = {
    [SEARCH_GUARD_DOCS_SEARCH_INDEX]: {component: DocsHit, facets: ['category_name'], textColor: '#000000', bgColor: "#00ff55", label: 'Docs'},
    [SEARCH_GUARD_BLOG_SEARCH_INDEX]: {component: BlogHit, facets: ['tags'], textColor: '#ffdddd', bgColor: "#161313", label: 'Blog'},
}

// Menu component to toggle indexes
const IndexMenu = ({ activeIndex, setActiveIndex  }) => {
    return (
        <div className='div-search-index-menu '>
            {Object.entries(SEARCH_INDEXES_COMPONENT_MAP).map(([index, component]) => (
                <label key={index} style={{ marginRight: '15px' }}>
                    <input
                        checked={index === activeIndex}
                        name="index"
                        onChange={() => setActiveIndex(index)}
                        type="radio"
                        value={index}
                    />
                    <Badge 
                        style={{marginLeft: BADGE_MARGIN_BIG}} 
                        text={component.label} 
                        bgColor={INDEX_BADGE_BG_COLOR}
                        textColor={INDEX_BADGE_TEXT_COLOR}
                    />
                </label>
            ))}
        </div>
    );
};

export const GlobalSearch = ({ searchClient, opened, className }) => {
    const [activeIndex, setActiveIndex] = React.useState(DEFAULT_SEARCH_INDEX); // State to track active index 

    const transformHitItems = React.useCallback(
        ( _, { results }) => {
            if (results.query === '') return [];
            return results.hits;
        }, 
        []
    );
  
    const transformMenuItems = React.useCallback(
        (items, search) => {
            if (search.results.query === '') return [];
            return items.map((item) => ({
                ...item,
                count: 
                    <Badge style={{marginLeft: BADGE_MARGIN_SMALL}} 
                        text={item.count} 
                        bgColor={INDEX_BADGE_BG_COLOR}
                        textColor={INDEX_BADGE_TEXT_COLOR}
                    />,
                })
            );
        }, 
        []
    );
  
    const submitIconComponent = React.useCallback(() => null, []);
    
    return (
        <div className={classNames(
                'div-search-text div-search', 
                { 
                    'div-search-expand-animation':  opened,
                    'div-search-collapse-animation': !opened,
                },
                className
            )}>
            <InstantSearch 
                indexName={activeIndex} 
                searchClient={searchClient}
                future={{
                    preserveSharedStateOnUnmount: true,
                }}
            >
                <SearchBox
                    autoFocus
                    placeholder='Type to search eg. in Blog or Docs'
                    classNames={{
                        reset: 'div-search-button-close', 
                        input: 'div-search-text', 
                        form: 'div-search-form div-search-text',
                    }}
                    submitIconComponent={submitIconComponent}
                />              
                <IndexMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                <Index indexName={activeIndex}>
                <Menu 
                    attribute={SEARCH_INDEXES_COMPONENT_MAP[activeIndex].facets[0]} // for each facet menu?
                    transformItems={transformMenuItems} 
                />
                <Hits className='div-search-text' 
                    classNames={{
                        list: 'div-search-text', 
                        item: 'div-search-text',
                    }}
                    hitComponent={SEARCH_INDEXES_COMPONENT_MAP[activeIndex].component} 
                    transformItems={transformHitItems}
                />
                </Index>         
            </InstantSearch>              
        </div>
    )
}
