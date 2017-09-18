/*eslint-disable */

import { expect } from '../../test_helper';

import {
    LOGOUT_USER,
    logoutUser,
} from '../../actions/BaseActions';

describe('BaseActions', () => {
    describe('logoutUser', () => {
        it('has the correct type', () => {
            const action = logoutUser();
            action.then((res) => expect(res.type).to.equal(LOGOUT_USER));
        });
    });
});

/*eslint-enable */
