import React from 'react';
import { translate } from 'react-i18next';
import Tabbed from '../Tabbed';

const Dialplans = ({ match: { path } }) => (
  <div>
    <Tabbed
      buttons={[
        { path: '/fsdfa', text: 'fsdfa' },
        { path: '/dsgaf', text: 'sdasg' }
      ]}
      title="tab shizzle"
      base={path}
    >
      <div>one</div>
      <div>two</div>
    </Tabbed>
  </div>
);

export default translate(['shared', 'nav'])(Dialplans);
