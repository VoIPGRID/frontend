/*eslint-disable */

import { expect } from '../test_helper';

import {
    LOGOUT_USER,
    logoutUser,
} from '../../src/actions/BaseActions';

describe('BaseActions', () => {
    describe('logoutUser', () => {
        it('has the correct type', () => {
            const action = logoutUser();
            expect(action.type).to.equal(LOGOUT_USER);
        });
    });
});

/*eslint-enable */
