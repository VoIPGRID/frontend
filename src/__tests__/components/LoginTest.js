/*eslint-disable */

import { renderComponent, expect } from '../../test_helper';
import Login from '../../components/base/Login';

describe('Loginpage', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Login);

    });

    it('has an email field', () => {
        expect(component.find('.input[name="email"]')).to.exist;
    });

    it('has a password field', () => {
        expect(component.find('.input[name="password"]')).to.exist;
    });

    // it('has a link to the user\'s profile', () => {
    //     expect(component.find('.header--navigation a')).to.exist;
    // });
});

/*eslint-enable */
