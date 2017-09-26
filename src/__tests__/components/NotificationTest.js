/*eslint-disable */

import { renderComponent, expect } from '../../test_helper';
import Notification from '../../components/base/Notification';

describe('Notification', () => {
    let component;

    beforeEach(() => {
        const componentState = {base: {notification: {content: 'Test notification', notificationType: 'is-success'}}}
        component = renderComponent(Notification, null, componentState);
    });

    it('shows the notification content', () => {
        expect(component).to.have.text('Test notification');
    });

    it('has the is-success CSS class', () => {
        expect(component).to.have.class('notification is-success');
    });
});

/*eslint-enable */
