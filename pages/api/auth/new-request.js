import { getSession } from 'next-auth/react';
import connectDB from '../../../utils/mongodb';
import RequestDB from '../../../models/request-model';
 
const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        res.send({result: 'protected'});
    }
    const request = new RequestDB({category: req.body.category, requests: req.body.requests});
    await request.save();
    res.send({result: 'success'});
}

export default connectDB(handler);