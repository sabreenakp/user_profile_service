
import { Handler, Request } from 'express';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import config from '../utils/config';

const identityServiceProvider = new CognitoIdentityServiceProvider({
    region: config.AWS.AWS_REGION,
});

export interface IUser {
    id: string;
    email: string;
}

export interface IAuthenticatedRequest extends Request {
    user?: IUser;
}

const authMiddleware: Handler = async (req: IAuthenticatedRequest, res, next) => {
    try {
        const token = req.headers['authorization']!;
        const rawUser = await identityServiceProvider.getUser({ AccessToken: token }).promise();
        req.user = {
            id: rawUser.UserAttributes.find((attr) => attr.Name === 'sub')?.Value!,
            email: rawUser.UserAttributes.find((attr) => attr.Name === 'email')?.Value!,
        };
        next();
    } catch (err) {
       return res.status(401).send({ message: 'Unauthorized user', status: false });
    }
};

export default authMiddleware;