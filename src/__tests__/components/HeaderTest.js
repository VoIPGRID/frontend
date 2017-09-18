/*eslint-disable */

import { renderComponent, expect } from '../../test_helper';
import Header from '../../components/base/Header';

describe('Header', () => {
    let component;

    beforeEach(() => {
        const componentState = {base: {auth: {user: {authenticated: true}}}}
        component = renderComponent(Header, null, componentState);
    });

    it('shows the logo', () => {
        expect(component.find('.header--logo')).to.exist;
    });

    it('has a link to the user\'s profile', () => {
        expect(component.find('.header--navigation a')).to.exist;
    });
});

/*eslint-enable */
