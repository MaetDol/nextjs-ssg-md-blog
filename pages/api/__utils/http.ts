import { NextApiRequest, NextApiResponse } from 'next';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
/**
 * method와 일치하는 요청일 경우에만 handler 를 실행합니다
 */
export function validateMethod(
  method: Method | Method[],
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  const methods = ([] as Method[]).concat(method);
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (methods.some((method) => method === req.method))
      return handler(req, res);

    res.status(405).send('Invalid method');
  };
}
