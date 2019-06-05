import React from 'react';
import './TableEditions.scss';
import compliance from '../../images/checkmark-compliance.svg';
import enterprise from '../../images/checkmark-enterprise.svg';
import community from '../../images/checkmark-community.svg';

const TableEditions = () => {
  return (
    <div className="licensing-table-wrapper">
      <table className="centered highlight hide-on-med-and-down">
        <thead className="licensing-table-head">
          <tr>
            <th><div className="licensing-table-left">feature</div></th>
            <th>community edition</th>
            <th>enterprise edition</th>
            <th>Compliance edition</th>
          </tr>
        </thead>
        <tbody className="licensing-table-body">
          <tr>
            <td><div className="licensing-table-left">Nunc eu augue ullamcorper</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark"/></td>
            <td className="licensing-checkmark"><img src={enterprise} alt="checkmark"/></td>
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark"/></td>
          </tr>
          <tr>
            <td><div className="licensing-table-left">dsf sdfdsf dsf sd</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={enterprise} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark" /></td>
          </tr>
          <tr>
            <td><div className="licensing-table-left">dsfsd fdsf dsf ds</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={enterprise} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark" /></td>
          </tr>
          <tr style={{ backgroundColor: '#E8ECED'}}>
            <td><div className="licensing-table-subheadline">encryption</div></td>
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td><div className="licensing-table-left">dsf sdfds fsdf sd</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={enterprise} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark" /></td>
          </tr>
          <tr>
            <td><div className="licensing-table-left">sdfds fdsfds</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={enterprise} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark" /></td>
          </tr>
          <tr>
            <td><div className="licensing-table-left">sdfds fdsfds</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td />
            <td />
          </tr>
          <tr style={{ backgroundColor: '#E8ECED' }}>
            <td><div className="licensing-table-subheadline">authorization</div></td>
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td><div className="licensing-table-left">sdfds fdsfds</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td />
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark" /></td>
          </tr>
          <tr>
            <td><div className="licensing-table-left">sdfds fdsfds</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td />
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark" /></td>
          </tr>
          <tr>
            <td><div className="licensing-table-left">sdfds fdsfds</div></td>
            <td className="licensing-checkmark"><img src={community} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={enterprise} alt="checkmark" /></td>
            <td className="licensing-checkmark"><img src={compliance} alt="checkmark" /></td>
          </tr>
        </tbody>
      </table>
      <div className="row hide-on-large-only">
        <div className="licensing-overview-headline">Community Edition</div>
        <div className="col s12 m6 licensing-overview-content">
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">feature category</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">authentification</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
          </div>
        </div>
        <div className="col s12 m6 licensing-overview-content">
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">category</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
          </div>
        </div>
      </div>
      <div className="row hide-on-large-only">
        <div className="licensing-overview-headline">Enterprise Edition</div>
          <div className="col s12 m6 licensing-overview-content">
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">feature category</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">authentification</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
          </div>
        </div>
        <div className="col s12 m6 licensing-overview-content">
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">category</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
          </div>
        </div>
      </div>
      <div className="row hide-on-large-only">
        <div className="licensing-overview-headline">Compliance Edition</div>
        <div className="col s12 m6 licensing-overview-content">
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">feature category</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">authentification</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
          </div>
        </div>
        <div className="col s12 m6 licensing-overview-content">
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">category</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Nunc eu augue ullamcorper</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
          </div>
          <div className="licensing-overview-content-box">
            <div className="licensing-overview-content-headline">encryption</div>
            <div className="licensing-overview-content-text">Feature name lorem ipsum</div>
            <div className="licensing-overview-content-text">Augue ullamcorper</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableEditions;
