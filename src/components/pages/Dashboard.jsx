import React from 'react';
import Tabbed from '../Tabbed';

export default ({ match: { path } }) => (
  <div>
    <Tabbed
      buttons={[{ path: '/one', text: 'one' }, { path: '/two', text: 'two' }]}
      title="tab shizzle"
      base={path}
    >
      <div>one</div>
      <div>two</div>
    </Tabbed>
  </div>
);
