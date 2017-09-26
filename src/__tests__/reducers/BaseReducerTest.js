import { expect } from '../../test_helper';

import baseReducer from '../../reducers/BaseReducer';

import {
    LOGIN_USER,
    SEND_NOTIFICATION,
    HIDE_NOTIFICATION
} from '../../actions/BaseActions';

describe('Base Reducer', () => {

    it('handles action with unknown type', () => {
        expect(baseReducer([], {})).to.eql([]);
    });

    it('handles action of type LOGIN_USER', () => {
        const result = {
            "data": {
                "user": {
                    "authenticated": true,
                }
            }
        };

        const action = { type: LOGIN_USER, 'payload': result}

        expect(baseReducer([], action)).to.eql({auth: result.data});
    });

    it('handles action of type SEND_NOTIFICATION', () => {
        const result = {
            "notificationType": 'success',
            "content": "Succesful notification",
        };

        const action = { type: SEND_NOTIFICATION, 'payload': result}

        expect(baseReducer([], action)).to.eql({notification: result});
    });

    it('handles action of type HIDE_NOTIFICATION', () => {
        const action = { type: HIDE_NOTIFICATION }

        expect(baseReducer([], action)).to.eql({notification: null});
    });
});
