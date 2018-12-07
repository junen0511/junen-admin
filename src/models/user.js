import { Container } from 'unstated';
import { queryCurrent } from '@src/services/auth';

export class UserContainer extends Container {
    constructor() {
        super(...arguments);
        this.state = { currentUser: {} };
        this.fetchCurrent();
    }

    async fetchCurrent() {
        const { data } = await queryCurrent;
        this.setState({
            currentUser: data
        });
    }
}
