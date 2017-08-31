/*eslint-disable */

import { renderComponent, expect } from '../test_helper';
import Header from '../../src/components/base/Header';

describe('Header', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Header);

    });

    it('shows the logo', () => {
        expect(component.find('.header--logo')).to.exist;
    });

    it('has a link to the user\'s profile', () => {
        expect(component.find('.header--navigation a')).to.exist;
    });
});

/*eslint-enable */
