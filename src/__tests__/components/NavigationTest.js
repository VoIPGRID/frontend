/*eslint-disable */

import { renderComponent, expect } from '../../test_helper';
import Navigation from '../../components/base/Navigation';

describe('Navigation', () => {
    let component;

    beforeEach(() => {
        const componentState = {base: {auth: {user: {authenticated: true}}}}
        component = renderComponent(Navigation, null, componentState);

    });

    it('shows the primary navigation list', () => {
        expect(component.find('.navigation--list')).to.exist;
    });

    it('shows the secondary navigation list', () => {
        expect(component.find('.navigation--list-bottom')).to.exist;
    });
});

/*eslint-enable */
