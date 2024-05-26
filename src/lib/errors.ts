const INTERNAL_SERVER_ERROR = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"></meta>
    <title>Internal Server Error</title>
  </head>
  <body>
    <h1>Internal Server Error</h1>
    <p>We couldn't process your request, please try again later</p>
  </body>
</html>
`;

type ResponseLike<R extends Response> = new (body?: BodyInit | null, init?: ResponseInit) => R;

/**
 * Generate an internal server error response
 */
export const internalServerError = <R extends Response>(responseClass: ResponseLike<R>): R =>
  new responseClass(INTERNAL_SERVER_ERROR, { status: 500, headers: { 'Content-Type': 'text/html;charset=utf-8' } });
