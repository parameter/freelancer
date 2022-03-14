import { getSession } from 'next-auth/react';
import connectDB from '../../utils/mongodb';
import RequestDB from '../../models/request-model';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        res.send({result: 'protected'});
    }
    const requests = await RequestDB.find({ category: { $in: req.query.categories } });
    res.send({result: 'success', requests: requests});
}

export default connectDB(handler);